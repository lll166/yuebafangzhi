# index.html emoji → SVG 图标改造规格

## 1. 目标与范围

把首页 `index.html` 中**界面级 emoji**替换为共享库 `moon-icons.js` 的 SVG 图标，并保证 21 套皮肤下图标颜色都随皮肤自动适配。

### 纳入范围
1. 顶栏：月巴标题 🐰、图鉴 📖、成就 🏆、玩法 ❓、静音 🔊、低耗 🔋、提交 🎨、语言 🌐、离线 ⚠️。
2. 状态栏：时间 🕐、季节 🌿、天气 ☀️/🌦️/🌧️/⛈️/🌨️、加成 💼、番茄钟 🍅、事件 ✨、万圣 🎃、图钉 📌。
3. 底部 dock：图鉴 📗、番茄 🍅、任务 ✅、统计 📊、商店 🛒、旅行 🧳、百巴箱 🎁、幸存者 ⚔️。
4. 场景操作条：新木头 🪵、存档槽 🎰、快熟 🍅、返回。
5. 弹层标题：`openModal()` 传入标题开头的 emoji 自动转成图标（书/商店/任务/统计/成就/旅行/图鉴/信件等）。
6. Toast 开头的 emoji 自动转图标。
7. 皮肤选择器：**21 款皮肤各自一枚专属 SVG**，4 个分组各一枚分组图标；图标颜色按各皮肤背景单独指定以保证对比度。
8. 所有静态 `data-i18n` 标签开头的 emoji 在填充语言时剥离，由前置的 SVG 承担视觉标识。

### 不纳入范围（保留原 emoji）
- 旅行信件正文 `TV_LETTERS`、月巴描述、物品名/特产名、剧情对话、翻译文案中间的装饰性 emoji。
- 这些属于叙事文本，替换会改变阅读节奏且需要上百枚一次性图标；若后续需要再单独扩展。

## 2. 图标库改造：`moon-icons.js`

### 2.1 新增第六套主题 `INDEX_ICONS`
- 定义位置：`TETRIS_ICONS` 之后。
- 组成：`Object.assign({}, TETRIS_ICONS, { ...index 专属图标... })`，复用 trophy / close / check / help / lock / star / sparkle / flame / crown / coin / tomato / target / calendar / medal / leaf / bolt / swirl / pause / brick 等。
- **全部使用 `currentColor`**（描边或填充），这样同一套图标能自动适配 21 套皮肤的文字色/主色。
- 统一规格：`viewBox="0 0 16 16"`，主体线条 `stroke-width` 1.3–1.6，13px 下可辨认。

### 2.2 新增图标清单（index 专属，约 46 枚）

| 名称 | 用途 | 图形要点 |
|---|---|---|
| `rabbit` | 首页标题月巴 | 两只长耳 + 圆头 + 小眼 |
| `book` | 图鉴 | 摊开双页书 |
| `chart` | 统计 | 三根柱 + 基线 |
| `cart` | 商店 | 购物车 + 两轮 |
| `case` | 旅行/加成 | 手提箱 + 提手 |
| `gift` | 百巴箱 | 礼盒 + 丝带 |
| `swords` | 幸存者 | 交叉双剑 |
| `palette` | 提交/默认皮肤 | 调色盘 + 拇指孔 + 色点 |
| `globe` | 语言 | 圆 + 经线 + 纬线 |
| `sound` | 静音按钮 | 喇叭 + 两道声波 |
| `warn` | 离线/容量 | 三角 + 感叹号 |
| `clock` | 时间 | 圆 + 时针分针 |
| `sun` | 夏天/晴天 | 圆 + 八向光芒 |
| `cloud` | 多云 | 云朵轮廓 |
| `rain` | 下雨 | 云 + 雨滴 |
| `storm` | 雷雨 | 云 + 闪电 |
| `snow` | 冬天/下雪 | 六角雪花 |
| `pin` | 图钉/标记 | 地图针 + 内圆 |
| `pumpkin` | 万圣 | 南瓜 + 瓜棱 + 蒂 |
| `home` | 小屋 | 屋身 + 屋顶 + 门 |
| `sofa` | 家具 | 沙发轮廓 + 坐垫 |
| `shop` | 面包店 | 店面 + 遮阳篷 |
| `bag` | 背包/商店袋 | 提袋 + 提手 |
| `tag` | 标签 | 吊牌 + 圆孔 |
| `slot` | 存档槽 | 老虎机机身 + 摇杆 |
| `mail` | 信箱/信件 | 信封 + 折线 |
| `door` | 传送门 | 门框 + 门把手 |
| `map` | 旅行地图 | 折叠地图 + 路线 |
| `journal` | 旅行手记 | 笔记本 + 书签 |
| `dove` | 自由飞行 | 飞鸟轮廓 |
| `wing` | 飞行 | 单翼羽毛 |
| `boom` | 爆炸/惊吓 | 放射爆裂形 |
| `cards` | 翻牌游戏 | 两张叠牌 |
| `scroll` | 旅行记录 | 卷轴 |
| `chat` | 对话 | 对话气泡 |
| `gamepad` | 游戏盒 | 手柄 + 十字键 |
| `trash` | 清理 | 垃圾桶 |
| `gear` | 设置 | 齿轮 |
| `sprout` | 春天 | 双叶幼苗 + 茎 |
| `leafFall` | 秋天 | 单片落叶 + 叶脉 |
| `pine` | 森林边缘/森林分组 | 三角松树 + 树干 |
| `cottage` | 世外桃源 | 小木屋 + 烟囱 |
| `crystal` | 上古秘境 | 水晶球/棱形晶体 |
| `pixel` | 枯寂幻境 | 方块像素小怪物 |
| `houses` | 小镇/小镇分组 | 并排两栋小房 |
| `lantern` | 月光夜市 | 灯笼 + 提梁 |
| `newmoon` | 无月之夜 | 新月缺口圆 |
| `sailboat` | 海港 | 帆船 + 船身 |
| `palm` | 海岛 | 棕榈树 + 沙滩线 |
| `column` | 沉海遗城 | 断裂石柱 |
| `mermaid` | 人鱼之海 | 鱼尾 + 鳞纹 |
| `galaxy` | 极光/星空 | 旋涡星系 |
| `ruins` | 遗迹 | 破拱门 |
| `ice` | 冰湖 | 冰晶方块 |
| `wave` | 大海分组 | 三道浪 |
| `lock`/`check`/`trophy` 等 | 沿用 | 复用 `TETRIS_ICONS` |

### 2.3 对外 API
- `themeOf('index')` 返回 `INDEX_ICONS`。
- 新增 `indexNames: Object.keys(INDEX_ICONS)`。
- 文件头注释补充 `MoonIcons.icon('rabbit','only','index')` 用法。

## 3. 页面改造：`index.html`

### 3.1 接入
- 在主内联脚本之前加入 `<script src="moon-icons.js"></script>`。
- 新增页面级辅助：
  ```js
  function mico(n,cls){ return MoonIcons.icon(n, cls||'only', 'index'); }
  function paintMI(root){ MoonIcons.paintIcons(root||document, 'index'); }
  ```
- 新增 emoji 映射与剥离：
  ```js
  var LEMOJI = { '🐰':'rabbit','📖':'book','📗':'book','🏆':'trophy','❓':'help',
    '🔊':'sound','🔇':'mute','🔋':'bolt','🎨':'palette','🌐':'globe','⚠️':'warn',
    '🕐':'clock','🌿':'leaf','☀️':'sun','🌦️':'cloud','🌧️':'rain','⛈️':'storm',
    '🌨️':'snow','❄️':'snow','💼':'case','🍅':'tomato','✨':'sparkle','🎃':'pumpkin',
    '📌':'pin','✅':'check','📊':'chart','🛒':'shop','🧳':'case','🎁':'gift',
    '⚔️':'swords','🪵':'leaf','🎰':'slot','🌙':'newmoon','🚪':'door','💌':'mail',
    '📜':'scroll','💬':'chat','🃏':'cards','🏅':'medal','📅':'calendar','🕹️':'gamepad' };
  function stripEmo(s){ return String(s).replace(/^[\u{1F300}-\u{1FAFF}\u2600-\u27BF\uFE0F\u200D]+\s*/u,''); }
  function emoName(s){ var m=String(s).match(/^([\u{1F300}-\u{1FAFF}\u2600-\u27BF\uFE0F\u200D]+)\s*/u);
    return m ? LEMOJI[m[1].replace(/\uFE0F|\u200D/g,'')]||'' : ''; }
  ```

### 3.2 CSS
新增：
```css
#brandMark .ico{width:15px;height:15px;vertical-align:-2px}
.iconbtn .ico{width:13px;height:13px}
#dock .ico{width:19px;height:19px}
#statusbar .ico{width:11px;height:11px}
#scene .ico{width:14px;height:14px}
.skin .sw .ico{width:26px;height:26px;opacity:.95}
.skingrp__title .ico{width:13px;height:13px}
#mtIco .ico{width:17px;height:17px}
```
`.skin .sw` 内图标颜色由 `style="color:<icCol>"` 指定，不继承皮肤文字色（避免深底深字看不清）。

### 3.3 静态骨架
- 标题：`<div class="brand" ...>放置<span>月巴</span> 🐰</div>` → 去掉 emoji，另加 `<span id="brandMark" class="ico only" data-ico="rabbit"></span>`。
- 顶栏按钮：🐰之外全部改为 `data-ico` 前置图标（`book/trophy/help/sound/bolt/palette/globe`），文案保留；静音按钮同时保留 `#muteOn` 状态逻辑。
- 底部 dock：`<b>emoji</b>` 改为 `<span class="ico only" data-ico="...">`，`<small data-i18n>` 不动。
- 场景操作条：🪵/🎰/🍅 改为 `data-ico="leaf/slot/tomato"`。
- 启动时调用 `paintMI()`。

### 3.4 `data-i18n` 填充
- 统一在填充函数中使用 `stripEmo($t(key))`，避免“SVG + 原 emoji”重复。
- 需同步检查使用 `textContent` 填充的 `[data-i18n]` 节点；`data-i18n-html` 保持不变。

### 3.5 动态状态
- `updateStatus()` 中时间/季节/天气/加成/番茄钟/事件/万圣/图钉全部改为 `mico(name) + 文本`。
- `updateHeader()`/`updateSceneBar()`/`updateDock()` 中出现的 emoji 同样替换。
- 天气映射：晴→`sun`，多云→`cloud`，雨→`rain`，雷雨→`storm`，雪→`snow`；季节映射：春→`sprout`，夏→`sun`，秋→`leafFall`，冬→`snow`。

### 3.6 弹层标题与 Toast
- `openModal(title)`：先用 `emoName(raw)` 取图标，再 `title=stripEmo($t(raw))`；把 SVG 写入标题左侧新增的 `#mtIco`。
- `toast(msg, sub)`：若 `msg` 开头有 emoji，剥离并在气泡内前置对应 SVG（用 `MoonIcons.svg` 包 `<i class="ico only">`）。
- 若映射缺失，保留原文 emoji，不影响功能。

### 3.7 皮肤面板（重点）

#### 数据：`SKINS` 每条新增 `ic`（可选 `icCol`）
| id | 名称 | ic | icCol |
|---|---|---|---|
| default | 默认 | palette | `var(--purple2)` |
| spring | 春 | sprout | `#4f8f43` |
| summer | 夏 | sun | `#3f7fbd` |
| autumn | 秋 | leafFall | `#b05f26` |
| winter | 冬 | snow | `#5f6d80` |
| forestedge | 森林边缘 | pine | `#2f6b4f` |
| fairy | 世外桃源 | cottage | `#8a5a33` |
| ancient | 上古秘境 | crystal | `#6ef0b0` |
| cursed | 枯寂幻境 | pixel | `#8fe36a` |
| townentry | 小镇入口 | houses | `#ffe6cf` |
| moonmarket | 月光夜市 | lantern | `#ffcf6b` |
| moonless | 无月之夜 | newmoon | `#e05a4c` |
| dreamink | 番茄之梦 | swirl | `#d76aa8` |
| seaharbor | 海港 | sailboat | `#177f99` |
| islandbay | 海岛假日 | palm | `#4e6a55` |
| sunkcity | 沉海遗城 | column | `#82241c` |
| mermaidsea | 人鱼之海 | mermaid | `#2a8fa8` |
| aurora | 极光海岸 | galaxy | `#7f8a9a` |
| relic | 遗迹 | ruins | `#5b4f36` |
| icelake | 冰湖 | ice | `#3a5a7a` |
| court | 失落王庭 | crown | `#b8c0cc` |

> 其余皮肤默认取 `s.vars.purple2`；`townentry` 必须用 `#ffe6cf`（深红字在红底上对比不足）。
> 如 `SKINS` 条目已有 `ic`/`icCol` 字段则覆盖，无则新增。

#### 分组：`SKIN_GROUPS` 新增 `ic`
- 森林 → `pine`
- 小镇 → `houses`
- 大海 → `wave`
- 雪地 → `snow`

#### 渲染：`skinBarHTML()` / 皮肤卡片
- 原 `s.emoji` 改为：
  ```js
  '<div class="sw" style="color:' + (s.icCol || s.vars.purple2) + '">' +
    MoonIcons.svg(s.ic, 'index') + '</div>'
  ```
  若结构为 `<div class="sw">emoji</div>`，直接把文本替换为裸 SVG，**不要包 `.ico`**，避免 1.15em 限制；尺寸交给 `.skin .sw svg{width:26px;height:26px}`。
- 分组标题原 emoji 改为 `data-ico` 或直接 `MoonIcons.svg(g.ic,'index')`。
- 皮肤名中的 emoji 前缀（如 `🎨 默认`）去掉，显示为纯文字；翻译键不变。

### 3.8 其它 UI 位置
- 图鉴/商店/任务/统计等弹层内的分类标题：保留 emoji 或改为 `mico()`，按实际渲染函数逐一替换（至少覆盖标题行）。
- 图鉴收集的进度条/分组标题若含 emoji，同步替换为 `mico()`。

## 4. 验证

1. Node 语法校验：抽取 `moon-icons.js` 与 `index.html` 全部内联脚本，`new Function` 检查通过。
2. 图标名校验：沙箱加载 `moon-icons.js`，断言 `indexNames` 包含第 2.2 节全部名称；扫描 `index.html` 中所有 `data-ico`/`mico('...')` 名称均存在。
3. emoji 残留扫描：只检查 UI 区域（顶栏、状态栏、dock、场景条、皮肤面板、弹层标题、toast），不应再有 emoji；叙事文本区域允许保留并在报告中列出。
4. 视觉验收：Edge `--headless=new` 截图
   - 默认皮肤首页（顶栏/状态栏/dock/场景条）
   - 深色皮肤（`court` 或 `moonless`）首页
   - 皮肤面板展开后的 21 枚卡片
   检查 13px/19px/26px 下图形可辨认、深浅底均可见。
5. 交互回归：切语言、开关静音、切换皮肤、打开图鉴/成就/商店、触发 toast，确认图标不被文案覆盖。
6. 清理所有临时预览 HTML、截图、校验脚本。

## 5. 风险与回退
- 图标通过 `currentColor` 适配所有皮肤；若某皮肤主色与背景对比不足（已知 `townentry`），用 `icCol` 覆盖。
- `data-i18n` 填充统一剥离开头 emoji 可能影响少数以 emoji 开头的正文标签；仅剥离开头，正文中间 emoji 不动。
- `openModal`/`toast` 映射缺失时保留原 emoji，保证不出现空白图标。
- 全部改动集中在 `moon-icons.js` 与 `index.html`，不新增运行时依赖。
