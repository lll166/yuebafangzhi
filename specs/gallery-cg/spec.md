# Spec — 图鉴新增「画廊」第三页（CG 收藏）

## 1. 需求（用户原话）
> 在图鉴中，新增一列画廊（和第一图鉴，第二图鉴保持并列），点开画廊后显示缩略图，点击图片会显示图片和图片下的文案。显示解锁时间。画廊中的图片都有解锁条件。（记得给所有皮肤匹配）

已确认设定（不再追问）：
- 画廊内容 = 全新 CG，图片为外链，**由用户之后自填**；本期 **不放任何 CG 条目**（`GALLERY` 空），只搭好数据结构 + 空态。
- 解锁条件 = **每条目各自独立**（示例：一条需集齐「雪地」四张地图全部信件 + 特产）。
- 点击后的文案 = **新写专属画廊文案**（写在数据数组里，由用户填）。
- 解锁时间 = 新增存档字段记录首次解锁时间戳；**老存档在本次功能上线前就已达成的显示「—」**。
- 画廊 tab = **常驻**，与第一/第二图鉴三 tab 并列，不设解锁门槛。
- 皮肤匹配 = 画廊 UI 全部走皮肤令牌，21 套皮肤（5 基础 + 16 地图）自动适配，深色皮肤文字可读。

## 2. 唯一改动文件
`d:\小工具\月巴放置\index.html`（单文件、零依赖、ES5 风格、localStorage 存档）

## 3. 现状（已读实的插入点）
| 位置 | 内容 |
|---|---|
| L231-235 | 图鉴 CSS：`.book` 网格、`.booktabs`、`.btab` / `.btab.on` / `.btab.lock` |
| L1241-1263 | 皮肤区 CSS：`.skinbar` `.skin-sec` `.skins` `.skin` `.skingrp*` |
| L3031-3058 | 深色皮肤语义色覆盖块（6 套深色皮肤，`html:is([data-skin=…])`） |
| L3325 | `<div id="fdOverlay"></div>`（弹窗内的悬浮层容器，openFatDetail 填充 innerHTML 并加 `.show`） |
| L3997-4005 | `skinDestProgress(destId)` → `{cards:{got,all},specs:{got,all}}` |
| L4007-4028 | `skinUnlockInfo(s)`：dests 分支 = 信件+特产，moonbas 分支 = 主题月巴，need 分支 = 数量 |
| L4085 | `/* ---------------- 全局状态 ---------------- */` 之前 = 新增画廊 JS 的落点 |
| L4090-4106 | `defaultState()`（`skins:{unlocked:[],active:null}` 等） |
| L4120-4140 | `load()`：`S=Object.assign(defaultState(),d)` → 深合并 pomo → `return true`；失败分支 `S=defaultState()` |
| L5086 | `closeModal()`（已调用 `closeFatDetail()`） |
| L5088 | `let dexPage=1;` |
| L5182-5214 | `bookRowsHTML(list)` |
| L5299-5335 | `openFatDetail(id)` / `closeFatDetail()` — 悬浮层模板（本次照抄该模式） |
| L5263-5289 | `openBook()`：tabs 两枚 + `skinBarHTML(dexPage)` + `.book`；`switchDexPage(p)` |
| L4538-4574 | `doHarvest(...)` 结尾 `return {id,…}` |
| L7406 | `openTravel()`（单行函数） |
| L4467 | `debugUnlockAll()`（本次**不改**：CG 不参与调试解锁） |

**皮肤覆盖实况**：基础 5 套（default/spring/summer/autumn/winter）用令牌走通用 `.btab`；16 套地图皮肤有各自的 `html[data-skin=X] .btab` 覆盖。故新 tab 只要沿用 `.btab` 类即自动适配全部 21 套（无需逐皮肤新增）。画廊新类（`.galcard` 等）全部用 `var(--panel/--panel2/--line/--text/--dim/--purple2/--good/--danger/--bg/--bg2)`，深色皮肤自动可读。

## 4. 数据设计

### 4.1 `GALLERY` 数组（本期为空）
```js
const GALLERY=[];   // 用户后续往里加条目即可
/* 条目结构：
   { id:'cg_snow_01',            // 唯一 id（存档键，勿改）
     name:'雪原的初雪',           // 卡片与详情标题
     img:'https://…外链图片…',    // 可留空，留空显示 🖼 占位
     text:'图片下方的一段专属文案…', // 新写的画廊文案
     cond:{ dests:['snow','ruins','ice','empire'] } }   // 解锁条件
   cond 复用皮肤同一套判定：
     - dests:[目的地id…]        → 集齐这些地图的全部信件 + 全部特产
     - moonbas:['m2_xxx',…]     → 额外要求这些月巴已收获（colCount>0）
     - moonbaLabel:'雪地月巴'   → moonbas 的显示名，缺省「主题月巴」
   雪地四图 id = snow / ruins / ice / empire
*/
```

### 4.2 存档字段
- `S.galFirst = { [cgId]: 时间戳 }`
  - 数值 = 首次解锁时间戳（ms）
  - `0` = 本次功能上线前的旧存档里就已达成（时间未知）→ 界面上显示 `—`
  - 键不存在 = 未解锁（卡片显示 🔒）
- `defaultState()` 增加 `galFirst:{},`
- `galInitLegacy()`：读档后执行一次，把「读档时已满足条件但无时间戳」的条目写为 `0`（不伪造时间）。仅在有存档分支调用，避免新号副作用（`tvFresh()` 会创建 `S.travel`）。

### 4.3 判定函数（复用，不另造一套）
- 抽出 `unlockCondParts(u)`，把 `skinUnlockInfo` 内的 dests/moonbas 组装逻辑提取为共享函数（行为完全等价，skinUnlockInfo 的 dests 分支改为调用它）。
- `galInfo(e)` → `{met, parts}`；`galCondText(info)` → `'雪地 信件 12/15 · 雪地 特产 6/7 · …'`
- `galUnlocked(id)` → `S.galFirst[id]!=null`
- `galSync(force)`：3 秒节流；对未记录且已满足条件的条目写入 `now()`，有变更才 `save()`。

## 5. UI 设计

### 5.1 第三个 tab
`openBook()` 的 `tabs` 增加：
`<button class="btab ${dexPage===3?'on':''}" onclick="switchDexPage(3)">🖼 画廊</button>`
- `dexPage===3` 时：`galSync(true)` → 直接渲染画廊（弹窗标题 `🖼 画廊 {已解锁}/{总数}`），**跳过** `skinBarHTML` 与 `bookRowsHTML`，`return`。

### 5.2 缩略图网格（`.book` 网格内）
- 已解锁：`<img>` 缩略图（`loading="lazy" decoding="async"`）+ 名称 + `✓ 已解锁 · {fmtDT(t)}`（`0` 显示 `—`）；点击 → `openGalDetail`。
- 未解锁：🔒 占位 + `???` + 一行条件摘要（首项 + `等 N 项`）；点击 → `openGalLock`。
- `GALLERY` 为空：整行空态 `.gal-empty`「🖼 画廊还空着 / 新的画面正在路上，敬请期待…」。

### 5.3 悬浮层（照抄 `fdOverlay` 模式，新增 `#galOverlay`）
- `openGalDetail(id)`：大图 + 图下文案 + 「🔓 解锁条件」进度行 + 右下角「🕒 解锁于 {fmtDT|—}」。
- `openGalLock(id)`：标题 `🔒 {name}` + 完整条件进度行（未达成红色 `N/M`）+ 提示「达成条件后自动解锁」；**不展示图片**。
- `closeGalDetail()`：移除 `.show` 并清空 innerHTML。
- 新增 `<div id="galOverlay"></div>` 紧跟 `#fdOverlay`；`closeModal()` 追加 `closeGalDetail()`；`openBook()` 开头追加 `closeGalDetail()`（切 tab 时清残留）。

### 5.4 新增 CSS（插在 `.btab.lock` 之后，全部走令牌）
`.gal-empty` / `.galcard` / `.galpic`（`aspect-ratio:4/3`）/ `.galnm` / `.galst` / `.galcard.locked` / `#galOverlay`(+`.show`、`.gal-back`、`.gal-card`、`.gal-head`、`.gal-big`、`.gal-text`、`.gal-time`、`.gal-cond`、`.gal-cond-h`、`.gal-cond-row`+`.lb/.ok/.no`)
- `.ok` 用 `var(--good)`、`.no` 用 `var(--danger)`（6 套深色皮肤的 `--good/--danger` 已是亮色，无需再进 L3031 覆盖块）。

## 6. 解锁时间记录点（`galSync` 调用位置）
1. `openBook()` 进入画廊时 `galSync(true)`（强制）。
2. `doHarvest()` 结束处 `galSync()`（节流 3s，覆盖「主题月巴」类条件；`GALLERY` 为空时直接 return）。
3. `openTravel()` 末尾 `galSync(true)`（覆盖信件/特产在旅行结算后到账）。

## 7. 不改动
- `debugUnlockAll()`（调试解锁不碰画廊）。
- 图鉴第一/第二页的结构、排序、皮肤区渲染。
- 存档兼容：`Object.assign(defaultState(), d)` 自动补 `galFirst`，无需迁移代码。

## 8. 验证
1. 静态校验（约定：`node -e`、外层 PowerShell 双引号、JS 内只用单引号、路径正斜杠、JS 内禁 `$` 与反引号）→ 期望输出 `scripts 1 bad 0`。
2. 关键词扫描：`GALLERY` / `galSync` / `galOverlay` / `galFirst` 均已出现；无遗留 `TODO`。
3. 浏览器手测（可选）：开图鉴 → 第三个 tab 可点 → 空态文案显示 → 5 套基础 + 6 套深色皮肤下文字可读（切皮肤看画廊）。
4. 老存档：新增 CG 后若条件已满足，卡片已解锁但时间显示 `—`。

## 9. 交付
只改 `index.html`；不新增其他产物（本 spec/tasks 属规划件，放在 `specs/gallery-cg/`）。
