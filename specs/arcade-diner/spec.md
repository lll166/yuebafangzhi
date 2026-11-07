# 月巴食堂 M3 成长系统 · 实施规格

> 状态：待确认
> 上游文档：[plan.md](file:///d:/小工具/月巴放置/specs/arcade-diner/plan.md)（M3 范围 695–707、5.2–5.10）
> 目标文件：`d:\小工具\月巴放置\diner.html`（单文件、零依赖）
> 存档键：`yueba-diner-v1`（不写主存档 `idle-yueba-save-v2`）

## 一、已核实现状

- `DAY_SECONDS=90`、`SPAWN_END=78`、客流间隔 6 / 5.5 / 7，与 plan.md 5.2 的 90 秒节奏一致，**不改**。
- `SEATS` 仍是 `const` 固定 4 座；`TABLES` 不存在；`syncLayout()` 已写好但尚未调用。
- 准备页四个面板（菜单 / 员工 / 店面 / 名册）已重写，按钮已带 `data-act`，但**没有事件委托**，点击无反应。
- 数据表已落地：`SHOP_LV`、`TABLE_ADD`、`SEAT_ADD`、`DECORS`、`EXP_REQ`、`TARGET_POOL`、`ACHS`、`ACH_KEY`。
- 存档读写已重构：`defaultSave / normStaff / mergeSave`，字段含 `shop / menu / dishes / unlocked / decor / staff / daily / ach`。
- 模拟层尚未接入 M3 加成：满意度仍用 `(S.shop.decor||0)*2`（应改为格纹桌布 +2），无员工经验、无单品销量、无客单价加成、无稀有客人加成。
- `settleRun()` 尚未处理每日目标、研发自动解锁、番茄生活升级、成就。
- 场景尚未按番茄生活等级变化。

## 二、实施决定

### 2.1 可变布局（餐桌 / 座位）

**改动**

1. `diner.html` 中 `const SEATS=[4 个固定坐标]` 改为：
   ```js
   let TABLES=[];
   let SEATS=[];
   ```
2. `syncLayout()` 保持现有算法：Lv1 用 `BASE_TABLES / BASE_SEATS`，Lv2–Lv5 逐级拼接 `TABLE_ADD[i] / SEAT_ADD[i]`，最终 `SEATS=seats.slice(0,info.seats)`。
3. 调用点：`init()` 开头、`clearSave()` 之后、扩店成功后、`nextDay()`。
4. `drawStool(g,x)` 改为 `drawStool(g,x,y)`：
   - 座面 `y-4`，凳腿 `y+2`；默认 `y=200` 兼容旧调用。
5. `buildBg()` 改为遍历绘制：
   ```js
   TABLES.forEach(function(t){ drawTable(g,t.x,t.y,t.w||32); });
   SEATS.forEach(function(s){ drawStool(g,s.x,s.y); });
   ```
6. `mergeSave()` 读档后按 `SHOP_LV` 归一化店等级与容量，避免旧档/脏档出现桌椅数量不一致。

**不改**：`TABLE_ADD` 的坐标值（后排 y=154/164、前排 y=222/232）保持现有设计，Lv1 视觉不变。

### 2.2 准备页事件委托

在 `bindEvents()` 中为 `#vPrep` 添加一次点击委托，向上查找 `data-act`，分发：

| `data-act` | 行为 | 约束 |
| --- | --- | --- |
| `menuToggle` | 在售则下架；否则上架 | 至少保留 1 道；槽位未满；菜已解锁 |
| `research` | 扣 `star*60` 立即解锁 | `S.star >= d.star`；账本足够；未解锁 |
| `hire` | 扣 `20+10*r`，加入员工 | 员工位未满；账本足够；未重复招募 |
| `train` | 扣 `30*cur`，属性 +1 | 属性 `spd/aff/vit`；`cur < staffCap(lv)` |
| `expand` | 扣下级费用，升店 | `S.star >= next.star`；账本足够；未满级 |
| `decor` | 扣费用，永久购买 | 未拥有；账本足够 |

每个操作完成后统一：`save()` → `renderPrep()` → `renderHud()`；失败用 `toast(t('noTomato') / t('staffFull') / ...)`；成功用现有 `researchOk / expandOk / hire / bought` 文案。

扩店额外：`syncLayout()`；若画布已初始化则 `buildBg()`。

### 2.3 模拟层接入

| 位置 | 改动 |
| --- | --- |
| `patienceFor(r)` | 有暖色吊灯 `decorOn('lamp')` 时 `+2s` |
| `pickGuestBanny()` | 有木招牌时稀有客人（`r>=4`）权重 ×1.1 |
| `serveGuest(w)` | 满意度装修项改为 `decorOn('cloth')?2:0`（替代按装修件数 ×2） |
| `serveGuest(w)` | 客单价倍率：木招牌 ×1.05、番茄生活 Lv4 ×1.05，可叠乘；用小费与总价统一按调整后的售价计算 |
| `serveGuest(w)` | 常客（`rosterSeen[id].n>=5`）小费 ×1.1 |
| `serveGuest(w)` | 成功上菜：`addStaffExp(w.s,1)`；`BIZ.sales[g.dish]=(BIZ.sales[g.dish]||0)+1` |
| `resetBiz()` | 初始化 `BIZ.sales={}` |
| `repGain()` / `leaveAngry()` | 口碑上限统一走 `repMax()`，写入后 `clampRep()` |

### 2.4 打烊结算

`settleRun()` 顺序：

1. `autoUnlockEligible()`：按**当天开始时的星级**（`S.star` 在一天内不变）自动解锁已够门槛的菜；当天刚升星解锁的菜留到次日准备页可研发。
2. 计算营业额 / 成本 / 工资 / 净利，更新 `S.tomato`、`S.total`。
3. 番茄生活等级：先取 `prevLife`，更新 `S.total` 后取 `newLife`；若提升，`toast(t('lifeUp',{name:t('life'+newLife)}))` 并 `buildBg()` 刷新场景。
4. 每日目标：用 `BIZ.sales / served / income / bestCombo / lost` 逐项 `targetHit`；新完成的自动发奖（🍅 + 口碑），标记 `done/claimed`，最后 `toast(t('goalToast',{n}))`。
5. 装修三件齐全：口碑 +1（受 `repMax` 限制）。
6. 星级：阈值 `20/40/60/80/95`，升星 `toast(t('starUp',{n}))`，不弹礼花（M4 再做）。
7. `checkAch({income:gross,lost,served})`。
8. `save()` → `setView('settle')`。

`nextDay()`：`rollDaily(true)` 重置明日目标 → `syncLayout()` → 存档 → 准备页。

### 2.5 番茄生活场景

新增 `drawTomatoHome(g)`，在 `buildBg()` 家具之后绘制，位置 `x=160,y=96,w=72,h=62`（窗与灶之间的墙面壁龛）：

- 外层纸色画框 + 墨线；内部一条地面线；
- Lv1 纸箱：`ink2` 箱体 + 折线；
- Lv2 阁楼小窝：毯子色块 + 台灯 + 低功耗关闭的暖光；
- Lv3 有窗的房间：内窗 + 街景剪影；
- Lv4 带阳台的家：栏杆 + 花盆（`ok` 色）；
- Lv5 屋顶花园：深色夜空 + 星点 + 屋顶植物。
- 所有等级都画一只 `accent` 色番茄小像（8×8 + 两个纸色眼睛）。

### 2.6 不改的东西

- 不改 `index.html`、不解除 `hidden:true`、不接 `DEX_GAME`。
- 不改 90 秒节奏、不动 M2 的客人/厨房/服务员状态机。
- 不新增货币、不做库存、不做自由摆放。

## 三、验收（对应 plan M3）

1. **Lv1→Lv2 扩店**：账本 ≥120、星级 ≥1 时点击扩店，扣 120，`SEATS.length` 4→6，场景新增中后排桌，存档重开仍为 Lv2。
2. **雇员保持**：招募后员工出现在准备页；重开后仍在，且不在候选列表重复出现。
3. **菜单保持**：上架/下架后重开仍是该菜单；槽位上限随店等级变化。
4. **星级门槛**：口碑 20/40/60/80/95 分别结算为 1–5 星；未达门槛无法扩店/研发。
5. **番茄生活**：累计营业额跨 600/2500/7000/15000 时结算提示升级，场景壁龛变化；Lv2 耐心 +5%、Lv4 客单价 +5%、Lv5 速度 +8% 生效。
6. **每日目标 / 成就**：结算后目标完成并发奖；成就网格点亮。
7. **回归**：控制台无报错；完整一天可结算并进入下一天；每 5s 自动存档。

## 四、验证方式

- 语法：`node` 提取 `<script>` 后 `new vm.Script` 检查。
- 冒烟：jsdom + Canvas 打桩，临时脚本放 `C:\Users\Administrator\AppData\Local\Temp`。
  - 新档：`S.tomato=200; S.star=1;` 执行扩店 → 断言 `S.shop.lv===2 && SEATS.length===6`；
  - 招募 → `save()` → 重新 `loadSave()` → 断言员工仍在；
  - 菜单切换 → 重新载入断言菜单一致；
  - `S.total=15000` → `lifeLv()===5` 且 `buildBg()` 不抛错。
- 手动：双击 `diner.html`，走一遍准备页 → 营业 → 结算 → 次日。
