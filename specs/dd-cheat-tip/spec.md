# 斗月巴 · 手机端出千换牌提示错位修复

> 状态：**已实施**（2026-10-21）。实施时对两处细节做了调整，见第二节改动 1、改动 4。
> 触发反馈：「斗月巴在手机屏幕上出现出千月巴的时候。被出千月巴换的牌的提示，有一点奇怪，是错位的。」
> 目标文件：`index.html`（单文件，无构建）

---

## 一、现象与根因

出千月巴出千后，同一信息有**两个**展示位：

| 展示位 | 实现 | 位置 |
|---|---|---|
| ① 常驻公示条 `.dd-cheat` | `ddCheatHTML()`（L15347-15356），挂在 `#ddCenterPanels`（L15394） | 牌桌中央 `.dd-center` 内 |
| ② 开局 toast | L14424 `ddHost.toast(...)` → 全局 `toast()`（L7651） | 全局 `#toast`，`bottom:106px`（L661） |

已确认的两处布局缺陷：

### 1. toast 压在手牌上（主因）

`#toast` 固定在 `bottom:106px`。手机端（`@media (max-width:560px)`）手牌折成两行，
自底向上依次为：操作区 `.dd-actions`（约 44px）+ 手牌 `.dd-hand`（两行 56px + 间距，约 150px）
+ 我方出牌区 `.dd-myplay`（约 30px），合计约 220px。
`bottom:106px` 正好落在**手牌中间**，深色胶囊浮在牌面上 → 视觉上就是「错位」。
这条 toast 的副标题正是「它用 X 换走了你的 Y」，即用户说的「被换的牌的提示」。

### 2. 中央公示条会被挤压（次因）

`#ddgame .dd-center{flex:1;...;justify-content:center}`（L928-929）作为 `.dd-scroll`
（`overflow-y:auto`，L780-781）的 flex 子项，默认 `flex-shrink:1` 且 `flex-basis:0`。
出千后中央多出一条约 70px 的公示条，短屏上中央区被压到低于内容高度，
`justify-content:center` 使内容**上下对称溢出**：向上的部分无法滚动到 → 被裁切/与
2 号座位卡重叠，看起来就是公示条「错位」。

`.dd-cheat-row`（L952）是单行 `flex`，窄屏（≤380px，卡牌 34px 宽）下总宽接近可用宽度，
没有换行兜底，文字会被压缩变形。

---

## 二、改动方案（只改 CSS，不动 JS）

### 改动 1：手机端把斗月巴里的 toast 挪离手牌

在 `@media (max-width:560px)`（L1121-1135）内追加：

```css
/* 斗月巴开着时，toast 不能压在手牌上（手牌折两行约 150px 高）：挪到顶栏位置 */
#ddgame.show~#toast{bottom:auto;top:calc(env(safe-area-inset-top,0px) + 6px);}
```

- 依据：`#ddgame`（L3407）与 `#toast`（L3501）是同级兄弟，`#ddgame` 在前，兄弟选择器成立。
- **实施调整**：原计划的 `bottom:40%` 在实机截图里正好落在中央文本/底牌/公示区上，
  会把刚出现的公示条整条盖住（手机屏幕中部没有空白可用），因此改为顶部通知位。
  手机端 toast 短暂盖住顶栏文字与图标（`pointer-events:none`，不挡点击），不遮挡任何牌。

### 改动 2：中央区不再被压缩

L928 改为：

```css
#ddgame .dd-center{flex:1 0 auto;display:flex;flex-direction:column;align-items:center;justify-content:center;gap:6px;
  font-size:13px;color:var(--dim);font-weight:700;text-align:center;padding:6px;}
```

- `1 0 auto`：空间够时照常纵向居中；空间不够时保持内容高度，由 `.dd-scroll` 滚动，
  不再出现「向上溢出被裁」。
- 与 L778-781 的注释（矮屏本区上下滚动、手牌常驻）一致。

### 改动 3：公示条窄屏可换行

L952-953 改为：

```css
#ddgame .dd-cheat-row{display:flex;align-items:center;justify-content:center;flex-wrap:wrap;
  gap:5px;row-gap:4px;max-width:100%;font-size:10px;color:var(--dim);font-weight:800;text-align:center;}
#ddgame .dd-cheat-cards{display:flex;gap:4px;align-items:center;flex:0 0 auto;}
```

- 卡牌不参与收缩，文字放不下时整段换行，保持「它用 / 牌 / 换走了你的 / 牌」的阅读顺序。

### 改动 4（实施时追加）：手机矮屏优先露出公示条

在 `@media (max-width:560px)` 内追加：

```css
#ddgame .dd-cheat{order:-1;}
```

- 原因：375×667 实测中央可视高度约 115px，「中央文本 + 底牌 + 出千公示」约 190px，
  必然裁掉一条。公示是刚发生、需要立刻知道的信息，底牌是被动信息（且已知、已并入地主手牌），
  所以让公示排在底牌之前，底牌由 `.dd-scroll` 下拉查看。
- 桌面端（>560px）顺序不变：底牌在上、公示在下。

---

## 三、不做的事

- 不改 `ddCheatHTML()` 的文案与结构，不改出千逻辑、存档、i18n 文案键。
- 不改桌面端（>560px）的任何视觉。
- 不删除 toast（它在桌面端位置合理，且与公示条分工：一次强提示 + 常驻可回看）。
- 不改 `.dd-scroll` 的滚动行为、不加自动滚动（矮屏用户自行下拉）。

---

## 四、验收标准

1. 375×667 与 360×640 下开局触发出千：
   - 「🃏 出千月巴出千了！」toast 出现在顶部通知位，**不覆盖手牌、不遮挡操作按钮、不盖住公示条**。
   - 中央公示条（🃏 出千月巴出千了 / 它用 X 换走了你的 Y）完整可见，不与 2 号座位卡重叠。
   - 底牌排在公示之后，可下拉查看。
2. 320×568 窄屏：`.dd-cheat-row` 允许换行，文字与两张 mini 牌不错行、不溢出；
   中央区极矮时公示条可能位于下方，靠 toast 与下拉兜底。
3. 桌面端（≥1024 宽）截图与改动前一致：toast 仍在底部 106px，中央区仍居中，底牌在上、公示在下。
4. 主页面（未开斗月巴）toast 位置不变。

---

## 五、验证结果

1. 静态：抽取内联脚本 `node --check` → OK syntax。
2. 视觉：临时副本（`%TEMP%`，用 iframe 精确模拟 320/375/390 宽度）截图确认：
   - 375×667：toast 居中于顶部；公示条完整；底牌其后；手牌与按钮无遮挡。
   - 320×568：toast 居中于顶部；公示条位于可视区下方，需下拉（该尺寸本就依赖滚动）。
   - 1280×800：与改动前一致，toast 仍在底部，底牌/公示顺序与位置不变。
3. 回归：`.dd-center` 改为 `flex:1 0 auto` 后，空间充足时仍纵向居中。

---

## 六、多语言检查（2026-10-21 追加）

检查范围：出千公示条 `ddCheatHTML()` 的三个 `$t` 片段、开局 toast 的两个片段、
底牌标题、牌名（含大小王）、牌型/座位等相邻文案。

### 发现并修复

1. **译文漏闭合标签**：`'<span class="mid">换走了你的</span>'`（L5541）的 en/ja/ko
   值都少了 `</span>`，非中文时第二张牌会被解析进 `.mid` 里，`dd-cheat-row` 少一个
   flex 子项 → 换行与间距错乱（正是「错位」在多语言下的复现）。已补齐三种语言的 `</span>`。
2. **toast 长句被压窄**：`#toast` 为 `position:fixed;left:50%`，默认 shrink-to-fit 的可用
   宽度只有半屏（375 下约 187px），英/日/韩句子被压成 3–4 行。加 `width:max-content`，
   由已有 `max-width:80vw` 限宽（L661-666）。

### 验证结果

| 语言 | 375×667 公示条 | toast | 320×568 |
|---|---|---|---|
| 中文 | 单行完整 | 2 行 | 公示条在下方（原有滚动） |
| English | 单行完整 | 2 行 | toast 完整，公布条靠下拉 |
| 日本語 | 单行完整 | 2 行 | toast 完整，公布条靠下拉 |
| 한국어 | 单行完整 | 2 行 | 同英文 |

- 各语言译文均未溢出面板；极窄时由 `flex-wrap:wrap` 兜底换行，顺序保持
  「它用 / 牌 / 换走了你的 / 牌」。
- 其余相关键（`🃏 本局底牌`、`大王`/`小王`、`它用 `、` 换走了你的 `）翻译齐全，无需改动。

