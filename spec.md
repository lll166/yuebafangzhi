# 旅行页图标居中修正

## 目标
修正「放置月巴」旅行页及旅行弹层内图标（信件封蜡、商店特产、门铃、信件页签等）视觉不居中的问题。

## 现状与根因
- 图标库 `moon-icons.js` 的基础样式给 `.ico`（非 `.only`）加了 `margin-right:.3em`，用于图标后跟文字的排版间距。
- 旅行弹层里的图标大量来自 emoji 替换（`emoSwap`），生成的是 `.ico`（不是 `.ico.only`），因此继承了这个右边距。
- 当图标单独摆在被 `display:flex;justify-content:center` 居中的容器（如 `.ltr-seal` 信件封蜡圆章、`.tv-door` 门铃圆钮）或 `text-align:center` 的卡片（`.sh-ic` 特产图标）里时，右边距会计入盒子宽度，图标整体向左侧偏移约 0.15em。
- 现有规则只有 `#travel .ico,#toast .ico,#modalTitle .ico,.tv-modal .ico{vertical-align:middle}`（只解决垂直对齐）与 `#travel .tv-btn .ico{margin-right:0}`（只覆盖底部导航）。

## 改动方案
文件：`index.html`

在现有旅行图标对齐规则之后新增一条针对「居中容器内图标」的归零规则：

```css
/* 旅行页 / 旅行弹层：单独摆在圆形徽章、封蜡、居中卡片里的图标，去掉基础样式自带的
   右边距，否则会被整体推偏（信件封蜡、商店特产、门铃徽章、信件页签等） */
#travel .tv-door .ico,#travel .tv-door-paw .ico,
.tv-modal .ltr-seal .ico,.tv-modal .sh-ic .ico,
.tv-modal .tv-jr-chip .ico,.tv-modal .btab .ico{margin-right:0}
```

不修改 `moon-icons.js` 的全局 `.ico` 规则，避免影响其他页面「图标 + 文字」的既有间距。

## 验收标准
1. 旅行页右下角信箱按钮、门铃圆钮中的图标在圆内水平/垂直居中（左右留白均等）。
2. 图鉴「信件」页签与信纸封蜡圆章内的图标居中。
3. 商店/特产卡片顶部图标在其卡片中居中。
4. 非居中场景（图标后紧跟文字，如 `.tv-btn`、图鉴正文段落）的间距不变。

## 验证方式
用一份临时副本页（改写 `SAVE_KEY`、注入脚本补满 85 种图鉴并调用 `openTravel()` / 信件弹层）通过 Edge headless 截图，确认上述位置图标居中；验证后删除临时文件。
