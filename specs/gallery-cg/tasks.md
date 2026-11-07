# Tasks — 图鉴「画廊」第三页（全部完成）

- [x] T1 新增画廊 CSS（走皮肤令牌）：`.gal-empty/.galcard/.galpic/.galnm/.galst/.galcard.locked` + `#galOverlay` 全套，插在 `.btab.lock` 之后
- [x] T2 新增 `<div id="galOverlay"></div>`（紧跟 `#fdOverlay`）
- [x] T3 抽出 `unlockCondParts(u)`，`skinUnlockInfo` 的 dests 分支改为复用（行为等价，判定只存一份）
- [x] T4 新增 `GALLERY=[]` + `galById/galInfo/galCondText/galCondRowsHTML/galUnlocked/galSync/galInitLegacy/galTimeText/galGridHTML/openGalDetail/openGalLock/closeGalDetail`
- [x] T5 `defaultState()` 增 `galFirst:{}`；`load()` 有存档分支调用 `galInitLegacy()`
- [x] T6 `openBook()` 增第三个 tab「🖼 画廊」+ `dexPage===3` 分支（`galSync(true)`、标题 `🖼 画廊 got/total`、渲染 `galGridHTML()`、跳过皮肤区与书页、开头 `closeGalDetail()`）
- [x] T7 悬浮层 `openGalDetail / openGalLock / closeGalDetail`（大图 + 图下文案 + 条件进度 + 解锁时间；未解锁不露图）
- [x] T8 `closeModal()` 追加 `closeGalDetail()`；`dexPage` 注释补 3=画廊
- [x] T9 `doHarvest()` 结尾 `galSync()`（3s 节流）、`openTravel()` 末尾 `galSync(true)`
- [x] T10 静态校验 + 关键词扫描 + 更新 project_memory.md

## 验证结果
- 静态解析：`node -e` 逐 `<script>` 块 `new Function()` → **`scripts 1 bad 0`**（通过）
- 关键词扫描：`GALLERY / galSync / galOverlay / galFirst / galInitLegacy / unlockCondParts` 共 56 处命中，均已落地
- 皮肤适配：画廊未新增逐皮肤 CSS，全部走 `var(--*)` 令牌 + 沿用 `.btab`（21 套皮肤中 16 套地图皮肤的 `.btab` 覆盖自动生效）；`.ok`/`.no` 用 `var(--good)`/`var(--danger)`，6 套深色皮肤令牌本身即亮色，无需进深色覆盖块

## 后续（用户自行）
往 `GALLERY` 里加条目（id / name / img 外链 / text 文案 / cond），例如需集齐雪地四图信件+特产的条目：
`{id:'cg_01', name:'雪原的初雪', img:'https://…', text:'…', cond:{dests:['snow','ruins','ice','empire']}}`
