# index.html emoji → SVG 图标 · 任务清单

## T1 图标库新增 index 主题
- [x] 在 `moon-icons.js` 的 `TETRIS_ICONS` 后新增 `INDEX_ICONS = Object.assign({}, TETRIS_ICONS, {...})`。
- [x] 按 `spec.md` 2.2 节实现 index 专属图标（rabbit/book/chart/cart/case/gift/swords/palette/globe/sound/warn/clock/sun/cloud/rain/storm/snow/pin/pumpkin/home/sofa/shop/bag/tag/slot/mail/door/map/journal/dove/wing/boom/cards/scroll/chat/gamepad/trash/gear/sprout/leafFall/pine/cottage/crystal/pixel/houses/lantern/newmoon/sailboat/palm/column/mermaid/galaxy/ruins/ice/wave）。
- [x] `themeOf()` 增加 `if(theme==='index') return INDEX_ICONS;`。
- [x] API 增加 `index:INDEX_ICONS`、`indexNames:Object.keys(INDEX_ICONS)`；文件头注释补充 index 用法。
- [x] 所有新图标使用 `currentColor`。

## T2 index.html 接入与基础辅助
- [x] 主脚本前加入 `<script src="moon-icons.js"></script>`。
- [x] 新增 `mico()`、`paintMI()`、`stripEmo()`、`emoName()`、`LEMOJI` 映射。
- [x] 启动时调用 `paintMI()`（放在 boot / 首次渲染之后）。
- [x] 新增 `.ico` 尺寸覆盖 CSS（顶栏 13、dock 19、状态 11、场景 14、皮肤 26、分组 13、弹层标题 17）。

## T3 静态骨架替换
- [x] 标题 `🐰` → `#brandMark` + `data-ico="rabbit"`；保持 `放置<span>月巴</span>` 的 i18n。
- [x] 顶栏按钮：图鉴 `book`、成就 `trophy`、玩法 `help`、静音 `sound`、低耗 `bolt`、提交 `palette`、语言 `globe`、离线 `warn`。
- [x] dock：图鉴 `book`、番茄 `tomato`、任务 `check`、统计 `chart`、商店 `cart`、旅行 `case`、百巴箱 `gift`、幸存者 `swords`。
- [x] 场景操作条：新木头 `leaf`、存档槽 `slot`、快熟 `tomato`。
- [x] 保留各按钮原有 id、事件、文案与徽标位置。

## T4 文案与动态 UI
- [x] `applyStaticI18n` 的 `data-i18n`/`data-i18n-html` 填充支持 `noemo` / `noemo-all` 标记，仅对已加 SVG 前缀的标签剥离 emoji，避免旅行/剧情文案被误删。
- [x] `updateStatus()`：时间 `clock`、季节 `sprout/sun/leafFall/snow`、天气 `sun/cloud/rain/storm/snow`、加成 `case`、番茄钟 `tomato`、事件 `sparkle`、万圣 `pumpkin`、图钉 `pin`。
- [x] `updateHeader()` / `updateSceneBar()` / dock 更新函数中的 emoji 替换。
- [x] `openModal(title)`：取 `emoName(title)`，标题剥 emoji，图标写入 `#mtIco`。
- [x] `toast(msg,sub)`：开头 emoji 剥离并前置 SVG；无映射时保留原文。
- [x] 图鉴/商店/任务/统计/成就/旅行弹层标题行其余 emoji 替换。

## T5 皮肤图标（21 套 + 4 分组）
- [x] `SKINS` 每条新增 `ic`，按 spec 3.7 表补 `icCol`（至少 `townentry:#ffe6cf`）。
- [x] `SKIN_GROUPS` 补 `ic`：森林 `pine`、小镇 `houses`、大海 `wave`、雪地 `snow`。
- [x] `skinBarHTML()` 卡片 `.sw` 内改为裸 `MoonIcons.svg(s.ic,'index')`，颜色 `style="color:<icCol||purple2>"`。
- [x] 分组标题 emoji 改为 SVG。
- [x] 皮肤名去掉 emoji 前缀（保留翻译键）。
- [x] 确认 21 枚图标在浅底（默认/小镇/遗迹/冰湖）与深底（上古/无月/王庭）均可见。

## T6 验证与清理
- [x] Node `new Function` 校验 `moon-icons.js` 与 index 全部内联脚本语法。
- [x] 沙箱加载库，断言 21 个皮肤 `ic` + 4 分组 `ic` 都存在；扫描页面引用的图标名 `missing:none`。
- [x] UI 区域 emoji 扫描，确认顶栏/状态栏/dock/场景条/皮肤面板/弹层标题无残留。
- [x] Edge headless 截图：默认皮肤、深色皮肤、皮肤面板；目视检查可辨认与对比度。
- [x] 回归：切语言、切皮肤、静音、打开图鉴/成就/商店、触发 toast。
- [x] 删除临时预览文件、截图、校验脚本。
