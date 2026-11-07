# 旅行的月巴放置不归来 — 排查与修复 Spec

状态：**待确认**。确认后按 `travel-idle-return-tasks.md` 执行。
范围：只修「旅行计时 / 离线补差 / 冷启动结算」，不改旅行时长、概率、奖励数值、UI 布局，也不改其它防作弊逻辑。

## 一、用户问题

放置（不玩手机、页面切后台/息屏）时，旅行的月巴长时间不回来。

## 二、代码事实（index.html）

- 旅行推进只发生在页面运行时的 `tick()` → `travelTick()` → `travelSettleIf()` → `tvTripAdvance()`（L14318、L13946-L13947）。
- `offlineSettle()`（L14576-L14608）只补种/结算作物，**不处理旅行**。
- `tvTripAdvance()`（L12643-L12661）两条路径：
  - 页内路径：`_tvPerfKey===frog.depart` 时用 `performance.now()` 差值（L12651-L12653）；
  - 首次/读档路径：用 `now()-frog.syncAt` 补离线，但受两道闸门限制（L12654-L12657）。
- 闸门一：`_netCalibDone` 为 false 时直接 return（L12646）；
- 闸门二：`_offlineGapOK` 为 false 时把 gap 归零（L12656，赋值见 L13716，初始值 true 见 L13659）。
- `frog.syncAt` 没有未来时间钳制；同类计时器 `harvestT/eventT/nextVisit` 已有（L12756-L12759）。
- 旧档迁移（重建 `dur/elapsed/syncAt`）被 `_netCalibDone` 挡住（L12730-L12748）。
- 基础时长 20–100 分钟，再 ±10 分钟随机、装备 `time` 最多 ×1.5，单趟可到约 165 分钟；界面没有剩余时间提示。

## 三、根因（按影响排序）

1. **页内路径永不回退墙钟（主因）**：本趟出发后 `_tvPerfKey` 一旦匹配，`dt` 只取 `performance.now()` 差值。手机息屏/后台被冻结时，部分浏览器冻结期间 `performance.now()` 不走，恢复后 `dt≈0`，整段放置时间被丢弃；`syncAt` 也不会回到冻结前，之后没有第二次补差机会。
2. **离线补差只发生一次且有闸门**：读档后第一次推进若因校时未完成（最长 8 秒）或基准跳变（>10 分钟）被跳过，`syncAt` 会被刷新为当前时刻，离线时长永久丢失。
3. **冷启动不结算旅行**：`offlineSettle()` 不碰旅行，只等 `tick`；只打开几秒就关掉时，旧档迁移与结算都不会发生。
4. **`syncAt` 可能停在未来**：改系统时间/校时回拨后 `now()-syncAt` 长期为 0，表现为卡死不回来。
5. **感知因素**：单趟最长约 165 分钟且无剩余时间提示，容易被当成「永远不回来」。

## 四、修复方案

### F1 页内推进接受墙钟补差（核心）

文件：`index.html`，函数 `tvTripAdvance()`（L12643-L12661）。

改为：

```js
function tvTripAdvance(){
  const t=tvFresh(), f=t.frog;
  if(!f||f.status!=='away'||!(f.dur>0))return;
  if(!isFinite(f.elapsed)||f.elapsed<0)f.elapsed=0;
  const hasPerf=(typeof performance!=='undefined'&&performance&&performance.now);
  const p=hasPerf?performance.now():0;
  const wall=now();
  /* syncAt 是「上次推进到的墙钟时刻」：被校时/改时间推到未来时先收回，否则补差会长期为 0 */
  if(!isFinite(f.syncAt)||f.syncAt<0||f.syncAt>wall+10*60000)f.syncAt=wall;
  let gap=Math.max(0,wall-f.syncAt);        // 只增不减，回拨不前进
  if(!_offlineGapOK)gap=0;                  // 基准大幅跳变：本段不补离线
  let dt;
  if(hasPerf&&_tvPerfKey===f.depart){
    const perfDt=Math.max(0,p-_tvPerfBase);
    _tvPerfBase=p;
    /* 息屏/切后台时 performance.now() 可能被冻结：用墙钟补差兜底。
       elapsed 仍封顶 dur，因此最多只结束当前这一趟，不会连带下一趟。 */
    dt=Math.max(perfDt,gap);
  }else{
    if(!_netCalibDone)return;               // 首次读档：等校时判定离线时长是否可信
    dt=gap;
    _tvPerfKey=f.depart; _tvPerfBase=p;
  }
  f.elapsed=Math.min(f.dur,f.elapsed+dt);
  f.syncAt=now();
}
```

### F2 `frog.syncAt` 未来时间钳制

已包含在 F1：`syncAt` 缺失、非法或超前当前时间 10 分钟以上时重置为 `now()`，与 L12756-L12759 的处理口径一致。

### F3 冷启动/切回页面立即结算旅行

文件：`index.html`，函数 `offlineSettle()`（L14576）。

在函数体最前面加：

```js
  travelSettleIf();   // 冷启动/切回页面：先把旅行补差并结算，不只依赖 tick
```

这样 `maybeOfflineSettle()` 校时完成后即结算旅行，不必等 `tick`；短时间打开也能结算。

### F4 旧档迁移不再等校时

文件：`index.html`，函数 `tvFresh()`（L12730）。

把：

```js
if(t.frog.status==='away'&&_netCalibDone){
```

改成：

```js
if(t.frog.status==='away'){
```

理由：`NET_OFF` 在读档时已从存档恢复（L8330），迁移用的都是同一时间坐标；现有 `_depOK`、`_max` 保守边界不变，`elapsed` 仍封顶 `dur`。避免「只开几秒就关、旧档永远不迁移」。

## 五、非目标（本次不做）

- 不加旅行剩余时间/倒计时 UI（可另开需求）。
- 不改 `_offlineGapOK` 的 10 分钟阈值与 `shiftTimeBasis` 逻辑。
- 不改 `S.clock` 受保护单调时钟、奖励、时长、概率。

## 六、风险与取舍

- `dt=Math.max(perfDt,gap)` 后，页内手动把系统时间往前拨，会立即补上这段差值。但该能力原本就存在（关页改时间再打开即可走 `gap` 路径），且 `elapsed` 封顶 `dur`，最多提前结束当前这一趟，不会连锁完成后续旅程。若要求更严格，可后续加「仅 visibilitychange 恢复时启用墙钟兜底」。
- F4 让迁移提前到校时前执行；若设备时钟极端错误，`dur` 仍会被 `_max` 约束为合理值，最坏是按正常时长重新计时，不会提前结束。

## 七、验收步骤

1. **长离线**：控制台把 `S.travel.frog` 置为 `{status:'away',dur:600000,elapsed:0,syncAt:Date.now()-1200000,...}` 后刷新，应在 8 秒内弹出「🎉 旅行归来」。
2. **后台冻结**：出发后切到后台 2 分钟再回来，`frog.elapsed` 应增加约 2 分钟（旧版可能为 0）。
3. **时钟回拨**：把 `frog.syncAt` 设为 `Date.now()+30*60000` 后刷新，`syncAt` 应被重置为当前时刻，旅行按秒表继续，不卡死也不瞬间完成。
4. **旧档迁移**：导入 `yueba-save-2026-10-24-fixed.json`（无 `dur/elapsed/syncAt`），刷新后 `dur/elapsed` 应被重建，`elapsed` 反映已离线时长。
5. **回归**：新出发旅程仍按 `dur` 结束；幸运护身符时长倍率不变；把系统时间前拨 1 小时后刷新，最多只完成当前这一趟。
6. **语法**：`node --check` 不适用于内联 HTML，改为浏览器控制台无报错 + 页面正常加载。
