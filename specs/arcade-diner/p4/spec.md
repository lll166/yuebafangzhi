# P4 规格：横向滑动世界 + 店 8/9 级 + 菜单搭配核心系统

- 目标文件：`d:\小工具\月巴放置\diner.html`（单文件、零依赖）
- 关联文档：`../p4-p6-plan.md`（长线路线图）、`tasks.md`（执行清单）
- 状态：待实现（本规格不含代码，实施时按条目落地并逐项验收）

## 0. 一句话目标

把 480×270 的固定单屏改造成 **960×270 的世界 + 可左右拖动镜头**，让 Lv8/Lv9 的 12/15 张桌子（24/30 座）放得下；同时新增 **菜单搭配（搭配/开发）** 核心系统：24 组菜谱组合，玩家自行试搭，发现后长期生效，搭错只给当天小额数值加成，每天只能开发一次。

## 1. 现状锚点（实施时先确认，行号为当前版本）

| 位置 | 函数/常量 | 行 |
|---|---|---|
| 场景常量 | `STEP` `SPAWN_END` `TABLES` `SEATS` | 1782–1790 |
| 等级数据 | `SHOP_LV` `BASE_TABLES` `BASE_SEATS` `SHOP_TABLES` | 686–716 |
| 布局 | `layoutFor` `syncLayout` | 1232 / 1239 |
| 画布 | `initCanvas` `buildBg` `paintCast` `paint` `startRun` | 2299 / 2418 / 2747 / 2772 / 2806 |
| 公式 | `patienceFor` `waiterSpeed` `spawnInterval` `serveGuest` | 1830 / 1875 / 1935 / 2184 |
| 界面 | `paneMenuHTML` `paneShopHTML` `renderPrep` `showTab` `onPrepClick` | 1443 / 1563 / 1649 / 1713 / 3260 |
| 存档 | `defaultSave` `mergeSave` | 818 / 848 |
| 结算/日切 | `settle` 星级阈值 `nextDay` | 2939 / 2957 |

## 2. 功能 A：横向滑动镜头

### 2.1 常量与状态
```js
const WORLD_W=960, VIEW_W=480, WORLD_H=270;
let camX=0, camTarget=0;      // 每次 startRun 归零；不写入存档
```
- `camX` 夹取 `0..WORLD_W-VIEW_W`（即 0..480）。
- 拖拽/按钮只改 `camTarget`；`paint()` 每帧 `camX += (camTarget-camX)*0.35`，实现平滑。

### 2.2 背景缓存
- `initCanvas()` 中 BGC 尺寸由 `480×270` 改为 `WORLD_W×WORLD_H`。
- `buildBg()` 绘制范围扩到 960：
  - 墙面（0..172）、地平线、地板透视带按现有画法横向延伸到 960，保持分段纹理连续；
  - **0..480 像素与现在完全一致**（禁止改动左半屏，避免既有截图/测试回归）；
  - 右翼新增：第二扇窗，窗框 `668..772`，中梃 `x=720`，窗台 `664..776`；窗台两侧对称陶盆；
  - 右翼第二盏吊灯，灯轴 `x=720.5`，尺寸与现有灯完全一致（灯杆/灯罩/光晕三段坐标整体 +457）；
  - 右翼不放门、不放灶台、不放吧台（后厨仍只在左半屏）。

### 2.3 绘制
- `paint()`：`ctx.drawImage(BGC, camX,0,VIEW_W,WORLD_H, 0,0,VIEW_W,WORLD_H)` 替代整图贴图；随后 `save()` + `translate(-camX,0)`（与现有震屏位移叠加）绘制所有世界实体，结束 `restore()`。
- `paintCast(ox)`：内部整体 `translate(-camX*CAST_SCALE,0)`，保证头像层与主画布同步；`save/restore` 成对。
- 世界坐标的点击换算：`worldX = clientX * (VIEW_W/rect.width) + camX`。

### 2.4 输入
- CSS：`#dnCanvas{ touch-action:pan-y }`（保留纵向翻页，允许横向手势）。
- `.stagebox` 绑定 pointerdown/move/up（Pointer Events，天然兼容鼠标与触摸）：
  - 起手记录 `startX/startCamX/moved=false`；
  - 移动超过 6 CSS px 记 `moved=true`，`camTarget = startCamX - dxWorld`；
  - 结束若 `moved` 则 80ms 内抑制一次 canvas click（避免拖动后误触打气）。
- 左右边缘箭头：`.stagebox` 内两个绝对定位按钮 `#camL/#camR`（`‹`/`›`），`camX<=2` 时隐藏左、`>=478` 时隐藏右；点击 `camTarget ∓= 240`。
- 滚轮横向：`wheel` 且 `|deltaX|>|deltaY|` 时 `camTarget += deltaX`（桌面端便利，可不拦截页面滚动）。
- `startRun()` 重置 `camX=camTarget=0`；`nextDay()` 回到准备页时同样归零。

### 2.5 验收
- `WORLD_W===960`；拖到最右后 `camX===480`，再拖不越界。
- 拖拽后不触发 `cheerAt`；单击仍能打气。
- Lv1 左半屏画面与改动前逐像素一致（截图对比）。
- 960 世界右翼窗/灯左右对称（中轴 720），无接缝。

## 3. 功能 B：店 8/9 级与右翼桌椅

### 3.1 等级数据（`SHOP_LV` 追加）
| lv | seats | tables | stoves | staffSlots | menuSlots | cost | star | name |
|---|---|---|---|---|---|---|---|---|
| 8 | 24 | 12 | 4 | 5 | 7 | 22000 | 7 | `shopName8` |
| 9 | 30 | 15 | 4 | 5 | 7 | 38000 | 8 | `shopName9` |

- `seats = tables*2`，与 `syncLayout` 的 2 座/桌一致，不会被截断。
- 星级门槛可达：结算阈值数组末位 `198`（8★），Lv8 需 7★、Lv9 需 8★。
- `paneShopHTML` 以 `SHOP_LV.length` 判满级，追加后自动变成“9 级满级”，无需改逻辑；需替换硬编码“7 级/7级满级”文案（4 语言）。
- 周目标 `weekTargets` 按等级线性放大，Lv8/9 自动提高，不另调。

### 3.2 右翼布局（`SHOP_TABLES` 追加第 8、9 项）
- Lv8 = Lv7 的 9 张 + 中排 3 张：`{608,190} {704,190} {800,190}`
- Lv9 = Lv8 的 12 张 + 前排 3 张：`{608,222} {704,222} {800,222}`
- 桌宽 32、凳子 `cx±26`：右翼中心 `624/720/816`，最右凳缘 842，距世界右界 118px，安全。
- 中排中心 720 与右翼窗轴、吊灯轴重合，形成对称构图。

### 3.3 联动
- `layoutFor(lv)`：按 `SHOP_TABLES[lv-1]` 生成桌子，座位由 `seatPairFor` 推导（与现有实现一致）。
- 寻路/等位/上菜全部使用世界坐标，镜头只影响绘制，**模拟层不改**。
- 新增 `shopName8/9` 四语言名称；`shop7` 成就保留，不再新增等级成就。

### 3.4 验收
- Lv8：`TABLES.length===12`、`SEATS.length===24`；Lv9：15/30。
- Lv1–9 全等级桌椅互不重叠（复用 `dn_layout_check2` 的 clash 判定，输出空数组）。
- Lv9 左右拖动可看到全部 15 桌，无桌腿被裁。
- 升级到 Lv8/9 扣款、星级校验、满级文案正确（4 语言）。

## 4. 功能 C：菜单搭配（搭配 / 开发）

### 4.1 数据
```js
const SETS=[
  {id:'s1', need:['soup','rice'],           fx:{price:1.06}},
  ...
];
```
- 共 **24 组**：12 组成对 + 12 组三连；`need` 为 DISHES 的 id 子集，组内不重复，组间 id 唯一。
- `fx` 键与含义：
  | 键 | 含义 | 叠加方式 |
  |---|---|---|
  | `price` | 售价倍率 | 相乘 |
  | `tip` | 小费倍率 | 相乘 |
  | `patience` | 耐心倍率 | 相乘 |
  | `speed` | 服务员速度倍率 | 相乘 |
  | `cook` | 出餐进度倍率 | 相乘 |
  | `spawn` | 客流间隔倍率（<1 客人更多） | 相乘 |
  | `sat` | 满意度加值（点） | 相加 |
- 建议数值（实施以此为准）：

| # | 组合 | 效果 |
|---|---|---|
| 1 | soup + rice | price 1.06 |
| 2 | ice + tart | sat +8 |
| 3 | pasta + tart | price 1.07 |
| 4 | tea + tart | patience 1.08 |
| 5 | hotpot + ice | sat +15 |
| 6 | hotpot + tea | patience 1.10 |
| 7 | whole + noodle | price 1.08 |
| 8 | pudding + tea | sat +10, tip 1.10 |
| 9 | noodle + omelet | cook 1.08 |
| 10 | roast + hotpot | price 1.10 |
| 11 | seafood + ice | price 1.09 |
| 12 | feast + whole | sat +18 |
| 13 | soup + rice + noodle | price 1.08 |
| 14 | ice + tart + pudding | sat +14 |
| 15 | pasta + tart + tea | price 1.10 |
| 16 | hotpot + ice + tea | patience 1.12 |
| 17 | whole + noodle + omelet | cook 1.12 |
| 18 | roast + hotpot + seafood | price 1.12 |
| 19 | feast + whole + seafood | sat +22 |
| 20 | soup + pudding + tea | tip 1.15 |
| 21 | rice + omelet + roast | price 1.09 |
| 22 | pasta + noodle + seafood | spawn 0.95 |
| 23 | tart + pudding + ice | sat +16 |
| 24 | hotpot + roast + feast | price 1.15 |

### 4.2 状态（存档字段）
```js
sets:    {},    // {setId: discoveredDay} 已发现组合，永久
setDev:  0,     // 最近一次开发的 day；S.setDev===S.day 表示今日已开发
setFlat: null,  // 当日“错误搭配”小额加成 {day, price:1.03, sat:2}；跨天失效
setLast: null   // 最近一次开发结果 {day, id|null, flat:bool}，用于界面回显
```
- `defaultSave()` 增加上述字段；`mergeSave()` 校验：`sets` 仅保留存在于 `SETS` 的键、值转整数；`setDev/setLast/setFlat.day` 转整数；非法值回落默认。

### 4.3 规则
- **生效条件**：组合 `need` 的每道菜都在当前 `S.menu` 中，且已发现 → 生效（可多组同时生效）。
- **开发**（每店每天一次）：
  1. `S.setDev===S.day` → 拒绝，提示“今天已经开发过了”；
  2. `S.menu.length<2` → 拒绝，提示“至少放两道菜”；
  3. 在 `SETS` 中按数组顺序找**第一组**「未发现且 need 全在当前菜单」的组合 → 发现它，`S.sets[id]=S.day`，`S.setLast={day,id,flat:false}`；若菜单里已有多组可发现，仍只发现一组（每天一次）；
  4. 找不到 → 不惩罚，`S.setFlat={day:S.day,price:1.03,sat:2}`，`S.setLast={day,id:null,flat:true}`；
  5. 无论成功失败都 `S.setDev=S.day`，并 `save()`。
- **错误搭配**：仅当日 `price×1.03`、`sat+2`，无任何负面效果，次日自动失效。
- **提示**：界面固定显示一条未发现组合的线索——`"还差 n 道菜：含「菜名」"`，索引 `(S.day*7 + S.seed) % 未发现数`，确定性、不写存档。
- 与既有 `BIZ.combo`（连击）**命名隔离**，不复用。

### 4.4 效果聚合
```js
function setFx(){
  const out={price:1,tip:1,patience:1,speed:1,cook:1,spawn:1,sat:0};
  // 已发现 ∩ 全在 S.menu → 相乘/相加
  // 若 S.setFlat 且 day===S.day → price*=1.03, sat+=2
  return out;
}
```
接入点（每处一行乘法/加法，不改变原公式结构）：
- `patienceFor`：返回值 × `setFx().patience`
- `waiterSpeed`：`sp` × `setFx().speed`
- `spawnInterval`：`k` × `setFx().spawn`
- 出餐进度（`o.done += dt*(stove?1.1:1)` 处）：× `setFx().cook`
- `serveGuest`：`priceMul` × `setFx().price`；`sat` + `setFx().sat`；`tip` × `setFx().tip`

### 4.5 界面
- 顶部页签新增第 5 个：`data-tab="combo"`，文案 `tabCombo`（搭配 / Sets / 組み合わせ / 조합）；`paneCombo` 容器；`showTab` 映射补 `combo`；`renderPrep` 渲染 `paneCombo`。
- `paneCombo` 结构：
  1. 标题 + 进度 `已发现 x/24`；
  2. 开发按钮：可用 → “开发今日搭配”；`S.setDev===S.day` → 禁用且显示“今天已开发”；菜单 <2 道 → 禁用并提示；
  3. 上次结果行：发现组合（列出菜名 + 效果）/ 未搭出（“+3% 售价，+2 满意度，仅今天”）；
  4. 生效中组合列表（`need` 全在菜单且已发现）：菜名串 + 效果；
  5. 未发现线索一行；
  6. 已发现组合网格（每组显示菜名；效果文本）。
- 组合显示名 = 菜名用 ` + ` 连接（沿用 `t(dishKey)`，不新增 24×4 条名称文案）。
- 新增 i18n 键（4 语言）：`tabCombo` `comboTitle` `comboProgress` `comboDev` `comboDevDone` `comboNeedTwo` `comboLastFound` `comboLastFlat` `comboActiveOn` `comboActiveNone` `comboHint` `comboEmpty`，以及效果标签 `fxPrice` `fxSat` `fxPatience` `fxSpeed` `fxCook` `fxSpawn` `fxTip`。
- `data-act` 新增 `setDev`，在 `onPrepClick` 分发到 `actSetDev()`；`actSetDev()` 仅改状态 + `renderPrep()`，不切视图。

### 4.6 验收
- 菜单 `['soup','rice']` → 开发一次得 s1；同日再点无效；`nextDay()` 后可再次开发。
- 菜单 `['tea']`（不足 2 道）→ 按钮禁用，不消耗当天次数。
- 菜单无任何完整组合（如 `['tea','pudding']` 以外的孤立组合）→ 走 flat 分支，`setFlat.price=1.03`，售价实际 ×1.03，次日失效。
- 已发现组合把菜换下菜单 → 立即不生效；换回 → 恢复。
- 存档写入后刷新页面：`sets/setDev/setFlat/setLast` 完整保留；越界数据被 `mergeSave` 清洗。
- 四语言切换（`?lang=en/ja/ko`）下页签、按钮、结果、效果标签均无缺字。
- `selftest()`：`DISHES.length===14`、`SETS.length===24`、组合菜 id 全部存在、id 唯一、`need` 至少 2 道。

## 5. 回归与测试

### 5.1 新增临时脚本（放在 `C:\Users\Administrator\AppData\Local\Temp\`，不进仓库）
`dn_p4_smoke.js`（puppeteer-core + Edge headless）：
1. 镜头：`WORLD_W=960`；`camX` 夹取；模拟 pointer 拖动 200px 后 `camX` 变化且 click 被抑制；
2. 等级：`S.shop.lv=8/9` → `syncLayout()`+`buildBg()` → 12/15 桌、24/30 座、clash 为空；
3. 组合：上述 4.6 全部分支 + `setFx()` 数值断言；
4. 存档：`save()`→`loadSave()` 字段一致；
5. 界面：`paneCombo` 含开发按钮与进度；点击 `data-act="setDev"` 后当日禁用；
6. 截图：`dn_p4_lv9_l.png`（camX=0）、`dn_p4_lv9_r.png`（camX=480）、`dn_p4_combo_zh.png`。

### 5.2 既有脚本
- `dn_p1_save.js`：满级断言由 7 级改 9 级。
- `dn_p2_smoke.js` / `dn_p3_smoke.js` / `dn_m4_smoke.js` / `dn_p1_queue.js` / `dn_layout_check2.js` / `dn_live_walk.js`：全部保持通过。
- `dn_layout_check2.js` 等级循环扩到 1..9。

### 5.3 人工验收
- 桌面鼠标拖动、移动端触摸滑动（DevTools 触摸模拟）均顺滑；拖动不误触打气。
- Lv9 右翼窗、吊灯、桌椅对称；左右两屏接缝无错位。
- 搭配页四语言截图逐项核对。

## 6. 明确不做（本次范围外）

- 不做镜头自动跟随、不做缩放、不做纵向滚动。
- 不做组合图鉴的独立成就/奖励（留给 P4-2 扩容）。
- 不改后厨、员工位、菜单位数量（仍为 4/5/7）。
- 不改 `BIZ.combo` 连击规则。
