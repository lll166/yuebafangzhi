# i18n P5 系统说明长文 —— 实施方案（待批准）

上级文档：`plan.md`（第三节 P5 条目）。本文件把 P5 细化到「可直接施工」的粒度。
目标文件：`index.html`（单文件，约 970KB）。

## 一、范围与真实条目数

计划里 P5 写的是「帮助文档、斗月巴规则、飞行/旅行玩法说明、成就描述」。实际盘点后**共约 120 条说明文本**（× 3 语 ≈ 360 译句）：

| 分组 | 数据源 / 位置 | 条数 | 形式 |
|---|---|---|---|
| 帮助文档 | `openHelp()` line 6819–6869 | **36** | 模板串内静态中文（含 `<b>`、`${}` 动态插值） |
| 斗月巴规则 | `ddRulesHTML()` line 12376–12387 | **10** | `+` 拼接串（含 `&lt;` 实体） |
| 成就描述 | `ACHS[].d` line 10752–10792 | **40** | 数据对象字段 |
| 成就弹窗脚注 | line 10835 | 1 | 静态串 |
| 旅行地图描述 | `TV_DESTS[].desc` line 8442–8456 | **13**（16 图中 3 图无 desc） | 数据对象字段 |
| 旅行商店道具说明 | `tvShopHTML()` line 9878 内 `list` 数组 | 9（便当 4 + 道具 5） | 局部数组串 |
| 皮肤栏说明 | line 4119 / 4135 | 2 | 模板串 |
| 日历 / 统计图例 | line 7411 / 8009（另见 8214/8215） | 2–4 | 模板串 |
| 画廊空态 | line 4199 | 1 | 模板串 |
| 旅行庭院 / 室内空态 | line 9033 / 9301 | 2 | 模板串 |
| 飞行说明 / 排行榜空态 | line 10302 / 10594 / 10235 | 3 | 模板串 / innerHTML |
| **合计** | | **≈ 120 条** | |

### 1.1 帮助文档（36 条）细分

line 6823–6868 共 14 个 `<div class="sec">` + 各段正文：

- 顶部开发警告 1 条
- 段标题 14 条（🎯 目标 / 🌱 生长与收获 / 🏡 场地 / 🍅 番茄钟 / 🕰️ 时间与天气 / 🗓️ 稀有月巴 / 🧳 旅行 / 🪽 飞行小游戏 / ✅ 任务·待办 / 📗 图鉴与皮肤 / 💫 天降事件 / ⚙️ 其他 / 💾 存档备份 / ⚠️ 重置存档）
- 正文段 12 条（目标 / 生长 / 场地 / 番茄钟 / 时间 / 稀有 / 旅行 / 飞行 / 任务 / 图鉴 / 天降 / 其他；「存档备份」「重置存档」无正文）
- 备份内容计数行 1 条（**含 4 处动态插值**）
- 手机用户提示 1 条
- 按钮 6 条（📋 复制存档 / 💾 导出文件 / 📥 粘贴导入 / 📂 导入文件 / ✅ 确认导入（覆盖当前存档）/ 🗑️ 重置全部存档）
- textarea placeholder 1 条（粘贴存档 JSON 到此处…）

**关键点**：这些行**全部是 plain 中文，未 `$t()` 包裹**；且正文行内嵌 `<b>` 与 `${Object.keys(S.collection).length}` 等动态值，不能整段硬编码。

### 1.2 明确不做（留给后续阶段）

- **P6**：`TV_LETTERS` 57 封信（及其内部字段）
- **P7**：月巴互动台词（6530–6617）、庭院/室内事件（8858–8995）、访客八卦 / 信使台词（8713–8793）、信件安慰（9617–9635）、飞行死亡/胜利台词（10073–10106）、番茄钟提示（7003–7257）、好运收获 / 旅行 toast（9099 / 9102 / 9124 / 9669 / 9715 / 9810–9939）、离线产出说明（10678 / 10710）、`FG_LEVELS[].name`、`DD_DIFFS[].name`、访客动物名
- 皮肤名 / 主题 / 分组 / 特产 / 月巴名 / 商店道具：**P3 已完成**

### 1.3 顺带修正的 2 处数据错字（在 P5 覆盖范围内）

1. `ACHS.g2`（line 10791）`d:'累计赚取 100,000,00 金币'` → `100,000,000`（少写一位数字）
2. `TV_DESTS.island.desc`（line 8446）`…靠上一座亮着灯火的小岛—。` → 「`小岛。`」（多一个破折号）
   - 注：该 desc **当前不在任何界面渲染**（`TV_DESTS[].desc` 只在旅行商店 `tvShopHTML()` 显示，且仅筛 `need==='charm'` 的 4 张图），属潜伏数据；修正为防扩散（见 §3.4）。

## 二、键名方案

按「**说明类入 `I18N_MISC`（语义 key）／专名衍生描述入 `I18N_BANNY`（`_desc` 后缀）**」分两表，字段统一用 `d`：

### 2.1 `I18N_MISC`（line 5411，此前为空表；注释已写明「事件/台词/系统说明：键为语义 key」）

前缀化语义 key，避免与条目 id 冲突：

| 分组 | 键格式 | 例 |
|---|---|---|
| 帮助文档 | `help_<slug>` | `help_goal`、`help_grow`、`help_save_count` |
| 斗月巴规则 | `dd_<slug>` | `dd_rank`、`dd_combo`、`dd_refresh` |
| 成就脚注 | `ach_footnote` | |
| 旅行商店道具说明 | `tvshop_<键>_desc` | `tvshop_food1_desc`、`tvshop_charm_desc` |
| 飞行说明 | `fly_<slug>` | `fly_freemode`、`fly_lb_empty`、`fly_locked` |
| 日历 / 图例 / 空态 | `ui_<slug>` | `ui_cal_legend`、`ui_gal_empty`、`ui_tv_empty` |

表结构（沿用 `$tn` 口径的 `{en,ja,ko}`）：

```js
const I18N_MISC={
  help_goal:{d:{en:'…',ja:'…',ko:'…'}},
  dd_rank:{d:{en:'…',ja:'…',ko:'…'}},
};
```

### 2.2 `I18N_BANNY`（与 P3 同表，字段 `d`；与同名域的 P3 条目靠后缀区分）

| 分组 | 键格式 | 例 |
|---|---|---|
| 成就描述 | `ach_<id>_desc` | `ach_h1_desc` |
| 旅行地图描述 | `dest_<id>_desc` | `dest_fairy_desc` |
| 便当说明 | `food_<键>_desc` | `food_food1_desc` |
| 旅行道具说明 | `tvi_<键>_desc` | `tvi_charm_desc` |

> 先例：P3 已用 `skin_<id>_theme` 后缀承载「同名域不同字段」，此处 `_desc` 同理。

### 2.3 新增取值助手 `$tm()`（`I18N_MISC` + 参数替换）

帮助文档备份计数行等需动态插值，`$t` / `$tf` 只服务于 `I18N_UI`，故加一个 MISC 版：

```js
/* 系统说明：值取 I18N_MISC，支持 {k} 参数替换；缺译文回退中文原串 */
function $tm(k, fb, params){
  let s=$tn(I18N_MISC, k, 'd', fb);
  if(params){ for(const p in params) s=s.split('{'+p+'}').join(params[p]); }
  return s;
}
```

放置位置：`$sp()`（line 5440）附近。

## 三、施工方式

### 3.1 帮助文档 `openHelp()`（模板串逐段包裹）

模板串内每段中文 → `${$tm('help_x','中文…')}`；含 `<b>` 的原样保留在译文串内。

动态行改参数化：

```js
<div style="…">${$tm('help_save_count',
  '📦 备份内容：图鉴 {dex} 种 · 场地 {zon}/{ztot} · 🍅 打卡 {pomo} 条 · 任务 {task} 条 · 番茄钟设置',
  {dex:Object.keys(S.collection).length, zon:S.zones.filter(z=>z.bought).length,
   ztot:ZONES.length, pomo:S.pomo.history.length, task:(S.tasks||[]).length})}</div>
```

按钮 / placeholder 用 `${$t('…')}`（短标签入 `I18N_UI`，可复用）或 `${$tm('ui_…')}`（施工时按是否已存在于 `I18N_UI` 决定）。

**重绘**：`openHelp()` 改为 `openModal('❓ 玩法说明', html, ()=>openHelp())` —— 复用既有 `openModal._rebuild` 机制，切语言时弹层自动重建。

### 3.2 斗月巴规则 `ddRulesHTML()`（拼接串逐段包裹）

每段 → `'<p><b>'+$tm('dd_rank','牌面大小')+'</b>：…'`（`&lt;` 实体照留）。

**重绘**：规则层走 `ddShowLayer('ddRuleLayer')`（`classList.toggle('show')`，line 12100）**不经过 `openModal`**，故须在 `i18nRelabel()`（line 5471）内补钩子：

```js
if($('ddRuleLayer') && $('ddRuleLayer').classList.contains('show')){
  const b=$('ddRuleBox'); if(b) b.innerHTML=ddRulesHTML();
}
```

### 3.3 成就描述 `ACHS[].d`（就地本地化，渲染处零改动）

`localizeData()`（line 5445）**新增一行**：

```js
for(const x of ACHS) heal(x,'_zhD','d','ach_'+x.id+'_desc','d');
```

`openAch()` 的 `esc(a.d)`（line 10832）自动生效。**成就弹窗重绘**：`openAch()` 改为 `openModal(title, html, ()=>openAch())`。

### 3.4 旅行地图描述 `TV_DESTS[].desc`（就地本地化，渲染处零改动）

`localizeData()` **新增一行**：

```js
for(const x of TV_DESTS) heal(x,'_zhDesc','desc','dest_'+x.id+'_desc','d');
```

渲染点 `tvShopHTML()`（line 9878）的 `(x.desc||'')` 自动生效。**旅行商店重绘**：`tvShop()` 改为 `openModal(title, tvShopHTML(), ()=>tvShop())`。

> 渲染面提示：`TV_DESTS[].desc` 目前**只在旅行商店 `tvShopHTML()`（line 9878）显示**，且该处仅筛 `need==='charm'` 的 4 张图（雪山 / 遗迹 / 冰湖 / 失落王庭）。其余 9 张图（含 3 张本就无 desc 的 forest/sea/town）的 desc **暂不显示**；`heal` 后无 desc 项仍为 `undefined`，行为不变。

### 3.5 旅行商店道具说明（局部数组串 → 直接 `$tm`）

line 9878 内 `const list=[…]` 的第 5 项（说明串）改为 `$tm('tvshop_food1_desc','…')` 等；便当 / 道具各 4 / 5 条。

### 3.6 皮肤栏 / 图例 / 空态（模板串单行替换）

- `skinBarHTML()` line 4119 / 4135：`${$t('🗺 地图皮肤')} <small>（${$t('集齐对应地图的信件与特产解锁，点击领取·切换')}）</small>`（随图鉴弹窗重建，P3 已挂）
- 日历图例 line 7411 / 8009、画廊空态 line 4199、旅行空态 line 9033 / 9301、飞行说明 line 10302 / 10594 / 10235：单行 `${$t('…')}` 或 `$tm('ui_…')`

## 四、翻译口径（照 `plan.md` 第四节）

- **语气**：说明类为 UI/文档文体 → 日文**敬体**（です・ます）、韩文**해요체**；不带叙事常体。
- **保留格式**：`<b>`、`<br>`、`&lt;` 等标签 / 实体原样保留；数字与千分位、R1~R6 原样不译。
- **术语一致**：沿用 `I18N_GLOSSARY`（月巴 Banny / バニー / 버니，番茄 Tomato，金币 Coin，图鉴 Codex，旅行 Travel，飞行 Flight，成就 Achievement，番茄钟 Pomodoro…）。
- **引号**：en / ko 用 `"…"`，ja 用「」（延续 P4 定稿）。
- 长文允许逐句意译，但**不删信息、不加内容**；已定稿的专名（皮肤名、地图名、成就名）在说明中出现时须与 P3 译文一致。

## 五、重绘钩子汇总（`i18nRelabel()` / `openModal._rebuild`）

| 弹层 / 视图 | 重绘方式 |
|---|---|
| 帮助文档（`openModal`） | 传 rebuild `()=>openHelp()` |
| 成就（`openModal`） | 传 rebuild `()=>openAch()` |
| 旅行商店（`openModal`） | 传 rebuild `()=>tvShop()` |
| 斗月巴规则（`ddShowLayer`，非 modal） | `i18nRelabel()` 内补 `ddRuleBox.innerHTML=ddRulesHTML()` |
| 图鉴 / 皮肤栏 | 已由 P3 图鉴弹窗 rebuild 覆盖 |
| 日历 / 画廊 / 飞行排行榜 | 打开时重建即可；若常驻则补钩子（施工时确认） |

## 六、验证

1. **静态解析**：逐 `<script>` `new Function` → 期望 `scripts 1 bad 0`。
2. **重复键**：脚本统计 `I18N_MISC` 与 `I18N_BANNY` 键 → 各表重复 = 0；两表无交叉重名。
3. **完整性**：`$tm` 引用的每个 key 在 `I18N_MISC` 命中；`ach_*_desc`（40）、`dest_*_desc`（13）en/ja/ko 三语全非空。
4. **浏览器四语回归**（中 / en / ja / ko）：帮助文档、斗月巴规则、成就列表、旅行商店、图鉴皮肤栏、日历图例、画廊 / 旅行空态、飞行说明 —— 确认随语言变化，日 / 韩无溢出 / 截断 / 豆腐块。
5. **存档兼容**：切语言后 `ACHS[].d`、`TV_DESTS[].desc` 回切中文能自愈（`_zhD` / `_zhDesc` 备份），存档结构不变。

## 七、需批准事项

1. **范围**（§一）：纳入清单 11 组 ≈ 120 条；其中 **旅行商店道具说明 9 条、飞行说明 3 条、各类空态 / 图例 5–7 条**为计划未明列、建议纳入项，请确认。【纳入计划】
2. **键方案**（§二）：说明类入 `I18N_MISC`（语义 key、字段 `d`）；成就 / 地图 / 便当 / 道具描述入 `I18N_BANNY`（`_desc` 后缀）。
3. **新增 `$tm()` 助手**（`I18N_MISC` + `{k}` 参数替换）。
4. **2 处数据错字**（§1.3）是否顺带修正：`ACHS.g2` 的 `100,000,00`、`TV_DESTS.island.desc` 的「小岛—。」

产出清单：`index.html`（`I18N_MISC` 表 + `$tm()` + `localizeData()` 两行 + `openHelp`/`ddRulesHTML`/`openAch`/`tvShop`/`skinBarHTML`/空态等替换 + 规则重绘钩子）、`specs/i18n/p5-strings.md`（批注用）、`tasks.md`（P5 勾选）。
