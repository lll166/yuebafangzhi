# i18n P7 事件与彩蛋 —— 实施方案（待批准）

上级文档：`plan.md`（第三节 P7 条目）。本文件把 P7 细化到「可直接施工」的粒度。
目标文件：`index.html`（单文件）。

## 一、范围与真实条目数（**远超计划的「92 + 48」**）

计划 P7 写「图鉴随机事件 92 / 庭院互动 / 室内 48 / 斗月巴台词 / 飞行死亡 26 + 胜利 / 番茄机彩蛋」。实测盘点后，P7 是**整个项目最大的一批**：

### A. 数据型事件（有确切条数）

| 分组 | 数据源 | 条数 | 汉字 | 占位符 |
|---|---|---|---|---|
| 图鉴随机事件 | `DEX_EVENTS` line 6919 | 88 | 2,102 | `{name}` |
| 庭院事件 | `TV_YARD_EVENTS` line ~9250 | 88 | 1,400 | `{n}` |
| 室内事件 | `TV_HOME_EVENTS` line 9337 | 48 | 753 | `{n}` |
| 重复信安慰 | `TV_PITY_LINES` | 20 | 401 | — |
| 飞行失败台词 | `FG_QUOTES` line 10469 | 26 | 354 | — |
| 飞行胜利台词 | `FG_WIN_QUOTES` line 10499 | 6 | 74 | — |
| 飞行关卡名 | `FG_LEVELS[].name` line 10508 | 10 | 22 | — |
| 访客名 | `TV_FRIENDS[].n` line 9102 | 81 | 241 | — |
| 访客八卦 | `TV_FRIENDS[].t` | 81 | 3,370 | — |
| 斗月巴难度 | `DD_DIFFS[].name` / `.lv` line 11721 | 3 + 3 | 18 | — |
| 斗月巴评级 | `DD_GRADE_TIER` line 12817 | 5 | 20 | — |
| **小计** | | **351 条** | **8,755** | |

> 说明：`TV_FRIENDS[].like` 是**特产中文名（存档键）**，与 `rare`（信件 id）一样**不译**；访客名与八卦才是翻译对象。

### B. 台词与界面文案（无稳定 id，按函数实测上限）

| 分组 | 位置 | 字符串数 | 汉字 |
|---|---|---|---|
| 斗月巴界面 / 结算 / 战绩 | `ddStatsHTML`、`ddShowResult`、`ddRenderActions`、`ddRecRowHTML`、`ddRenderCenter`、`ddRecListHTML`、`ddRevealHTML`、`ddSparkHTML`、`ddCheatHTML`、`ddHistoryHTML`、`ddHistTabsHTML`、`ddBottomHTML`、`ddStart`、`ddBid`、`ddRenderBetLimit`、`ddRenderSeats`、`ddFinishBid`、`ddRenderMyPlay`、`ddRenderAll`、`ddPlayerPlay`、`ddPlayerHint`、`ddPlayerPass`、`ddBarHTML`、`ddRenderCheatHint`、`ddQuit`、`ddExit`、`ddRestore`、`ddRenderDiff`、`ddName`、`ddCardHTML`；牌型名 `ddTypeName` | ≈190 | ≈2,900 |
| 金币对赌（番茄机） | `openGamble`、`gambleBetHTML`、`gambleChooseHTML`、`gamblePickHTML`、`gambleLoseHTML`、`gambleFinalHTML`、`gambleRollingHTML`、`gambleCrossNote`、`gambleRender`、`gambleRoll`、`gamblePick`、`gambleCashOut` | ≈35 | ≈2,240 |
| 抢番茄小游戏 | `tvStealGameHTML`、`tvStealResolve`、`tvStealOpen`、`tvStealDecline`、`tvStealAccept`、`tsDraw` | ≈27 | ≈700 |
| 口令彩蛋 | `openCode4099`、`openCode1001`、`claimCode4099`、`claimCode1001` | ≈26 | ≈1,300 |
| 番茄钟提示 / 报表 | `pomoReport`、`renderPomoModal`、`pomoStop`、`openPomo`、`pomoAddPreset`、`openPomoStats`、`pomoEditRecord`、`pomoSaveRecord`、`pomoDelRecord`、`pomoTaskSelChange`、`pomoBgIdleChange`、`pushPiP`、`updatePipoButton`、`openPomoPiP`、`setFocusMin`、`setGoal` | ≈60 | ≈400 |
| 各类 toast / 短提示 | `tvGo`、`tvBuy`、`tvFeed`、`tvPack`、`tvUnpack`、`tvTurnAway`、`tvDoorOpen`、`buyAccel`、`buyWood`、`upgradeSlots`、`buyItem`、`setWeather`、`useFast`、`useSkin`、`importSave`、`importSaveFile`、`exportSave`、`exportSaveFile`、`toggleLowPower`、`taskAdd`、`taskDel`、`taskEdit`、`openDex2Celebrate`、`debugUnlockAll` | ≈120 | ≈700 |
| 短枚举 | `SEASON_NAME`、`W_NAMES`、`periodOf`、`timeSlotDist`、`condText`（天气名）、`TASK_CATS`、`renderPomoCalendar`、`taskCalHTML`、`trendLastNDays`、`statCalGrid`、`mdKey`、`recordExtremes`、`taskHabitSubToggle` | ≈70 | ≈250 |
| **小计** | | **≈530** | **≈8,500** |

### C. 明确不做（留 P8 收口或本就非文案）

- `SPECIAL_EMOJI` 的键（特产中文名，查表用，不展示）
- `TV_FRIENDS[].like` / `rare`（存档键 / 信件 id）
- `I18N_LANGS` 的语言名（`中文 / English / 日本語 / 한국어` 按惯例保持原文）
- `tvShopHTML` 里 `list` 数组的中文兜底（已被 P5 换成 `TV_FOODS/TV_ITEMS.n`，不展示）

### D. 顺带修正

盘点中发现 2 处中文原串疑似错字，随本批核对后修正（若确认）：
- `TV_HOME_EVENTS` 中「{n}把番茄当皮球滚来滚去」等条目需逐条核对是否有漏字
- 其余在施工中随译随查（沿用 P4/P6 做法，发现即修并记录）

## 二、键名方案（**不新建表，全部走「中文原文作键」**）

P7 的内容是「散句」，没有 `id`。两种方案：

| 方案 | 做法 | 评价 |
|---|---|---|
| ✗ 索引键 | `dex_ev_0`…`dex_ev_87` | 数组一旦插删条目全部错位，维护风险高 |
| ✓ **中文原文作键** | `$t(DEX_EVENTS[i])` | 零索引维护、天然回退、与既有 `$t()` 通道一致；键很长但无所谓 |

**采用「中文原文作键」，值统一放 `I18N_UI`**（该表本就是「中文原文 → {en,ja,ko}」的通用映射，`$t` 缺条目时原样返回中文）。`I18N_MISC` 仍只承载 P5 那类「系统说明」语义键，不混入散句。

短标签（如 `小王 / 大王`、`简单 / 中等 / 困难`、`S 神级`）同样进 `I18N_UI`。

占位符：`{name}`（图鉴事件）、`{n}`（庭院 / 室内事件）照旧保留，渲染时用 `String.replace` 替换，与现行为一致。

## 三、施工方式

### 3.1 事件数组（只在「取用点」包一层 `$t()`）

| 位置 | 现状 | 改法 |
|---|---|---|
| `openDexEvent` line 10365 | `DEX_EVENTS[Math.floor(Math.random()*DEX_EVENTS.length)]` | 取到后 `$t(...)` |
| `tvYardEvent` line 9433 | `tpl=TV_YARD_EVENTS[...]` | 取到后 `$t(tpl)` |
| 室内事件取用点 | `TV_HOME_EVENTS[...]` | 同上 |
| 重复信安慰 | `TV_PITY_LINES[...]` | 同上 |
| 飞行失败 / 胜利 | `FG_QUOTES[...]` / `FG_WIN_QUOTES[...]` | 同上 |

即：**数组本身不动**（保持中文源），只在渲染那一刻过 `$t()`。这样文件中文字仍是唯一事实源，中文档行为零变化。

### 3.2 其他渲染点

- 访客名 / 八卦：`tvFriendModal` 的 `f.n` / `f.t` → `$t(f.n)` / `$t(f.t)`（仅此一处展示）
- 飞行关卡名：`fgLvInfo` / `fgShowOver` / `fgRenderLv` 等取 `L.name` 处 → `$t(L.name)`
- 斗月巴难度 / 评级 / 牌名 / 牌型名：取用处 `$t(...)`
- 各类 toast：`toast('…')` 内部**已自动 `$t()`**（P2 起），因此这些串**只要进 `I18N_UI` 即自动生效**，渲染处零改动——这是本批最大的省力点
- `openModal(title)` 同理已自动 `$t()`

### 3.3 重绘

- 斗月巴 / 赌局 / 抢番茄 / 飞行：多为全屏层或 canvas 覆盖层，切语言时若正打开，按既有 `openModal._rebuild` / 该层自身的重绘入口处理（施工时逐个确认，沿用 P5 补 `ddRuleBox` 的做法）
- toast / 事件为瞬时文本，无需重绘

## 四、翻译口径

- **语体**：事件与台词是叙事 / 抒情文体 → 日文**常体**、韩文**한다체**；UI 提示与 toast → 日文**敬体**、韩文**해요체**（与 P2/P5 一致）。
- **月巴 / 番茄 / 金币 / 图鉴 / 旅行 / 场地 / 特产 / 幸運收穫** 等一律照 `I18N_GLOSSARY`。
- **斗月巴术语**（沿用 P5 已定稿）：牌面大小 3<4<…<A<2<小王<大王；牌型 单张/对子/三张/三带一/三带二/顺子/连对/飞机/四带二/炸弹/王炸。`小王/大王` = small/big Joker · 小ジョーカー/大ジョーカー · 작은/큰 조커。
- **飞行关卡名**：意译且保持 2–4 字风格 → 初见 First Flight / 微风 Breeze / 云上 Above the Clouds / 穿林 Through the Woods / 逆风 Headwind / 星夜 Starry Night / 险峰 Steep Peaks / 雷雨 Thunderstorm / 极夜 Polar Night / 月巴之王 Banny King（日 / 韩按同义对应）。
- **引号**：en / ko `"…"`，ja「」；嵌套 en/ko `'…'`、ja『』。
- **拟声**：照各语言惯用（P6 已定）。
- **不改信息、不加内容**；`{n}` / `{name}` 一律保留。

## 五、分批施工计划（8 批，每批先静态校验再继续）

| 批次 | 内容 | 条数 | 汉字 |
|---|---|---|---|
| P7.1 | 图鉴随机事件 `DEX_EVENTS` | 88 | 2,102 |
| P7.2 | 庭院事件 `TV_YARD_EVENTS` | 88 | 1,400 |
| P7.3 | 室内事件 `TV_HOME_EVENTS` + 重复信安慰 `TV_PITY_LINES` | 68 | 1,154 |
| P7.4 | 访客名 + 八卦 `TV_FRIENDS` | 162 | 3,611 |
| P7.5 | 飞行：失败 26 + 胜利 6 + 关卡名 10 | 42 | 450 |
| P7.6 | 斗月巴：难度 / 评级 / 牌名 / 牌型 / 界面与结算文案 | ≈190 | ≈2,900 |
| P7.7 | 番茄机：金币对赌 + 抢番茄小游戏 | ≈62 | ≈2,940 |
| P7.8 | 口令彩蛋 + 番茄钟提示报表 + toast 与短枚举 | ≈276 | ≈2,650 |
| **合计** | | **≈976** | **≈17,200** |

> 说明：B 组的条数是「字符串个数」上限，实际含少量已由 `openModal` / `toast` 自动翻译的标题（会在施工时剔除，不重复入表）。

## 六、验证

1. **静态解析**：逐 `<script>` `new Function` → `scripts 1 bad 0`。
2. **键完整性**：`I18N_UI` 键重复 = 0；本批新增键的 en/ja/ko 三语非空。
3. **覆盖率**：施工后重跑盘点脚本，确认 A 组 351 条全部命中、B 组无遗漏（残留未包裹 CJK 行数应降到白名单内）。
4. **真实渲染**（无头 Edge 注入，沿用 P5/P6 做法）：
   - 图鉴事件（js / ko / en）正文与 `{name}` 替换
   - 庭院 / 室内事件、访客弹层（名 + 八卦）、重复信安慰
   - 飞行：关卡名、失败台词、胜利弹窗
   - 斗月巴：难度选择、开局、结算、战绩页、牌型名
   - 赌局 / 抢番茄 / 口令 / 番茄钟 / 主要 toast
   - 检查日韩无溢出、截断、豆腐块
5. **存档兼容**：事件与台词不写存档，切语言不影响进度（`TV_FRIENDS.like`、`rare` 保持中文键）。

## 七、需批准事项

1. **范围**：A 组 351 条为计划明列项（图鉴 / 庭院 / 室内 / 飞行 / 访客 / 难度），**建议全部纳入**；B 组 ≈530 条（斗月巴界面文案、金币对赌、抢番茄、口令彩蛋、番茄钟提示、各类 toast、短枚举）为计划未明列，**请确认是否一并纳入 P7**。若拆出，P7 只做 A 组，B 组另立 P7b。
2. **键方案**：不新建表，事件与台词统一用**中文原文作键**放进 `I18N_UI`（零索引错位风险，`toast()` / `openModal()` 自动生效无需改渲染点）。
3. **数组改动方式**：数组本身保持中文不动，只在取用点 `$t()` 包裹。
4. **工作量提示**：本批 ≈976 条 / ≈17,200 汉字，约为 P6（216 条 / 9,935 字）的 **1.7 倍**；按 8 批推进，每批完成后我会先做静态校验再继续。

产出清单：`index.html`（`I18N_UI` 增补 + 各事件/台词取用点 `$t()`）、`specs/i18n/p7-strings.md`（批注用）、`tasks.md`（P7 勾选）。
