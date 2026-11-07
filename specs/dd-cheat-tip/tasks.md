# 任务拆解 · 出千换牌提示错位修复

> 对应规格：[spec.md](./spec.md)
> 全部改动落在 `index.html`，仅 CSS，无 JS 逻辑变更。

## 任务

- [x] T1 手机端 toast 抬高手牌上方
  - 文件：`index.html`
  - 位置：`@media (max-width:560px)` 块内（约 L1121-1135）
  - 追加：`#ddgame.show~#toast{bottom:40%;}`
  - 完成判据：375×667 / 360×640 下斗月巴内 toast 底部边界高于手牌顶。

- [x] T2 中央区允许内部滚动、不被挤压
  - 文件：`index.html`
  - 位置：`#ddgame .dd-center`（L928-929）
  - 改动：`flex:1` → `flex:1 0 auto`
  - 完成判据：短屏加出公示条后，中央内容不向上溢出、不与座位卡重叠。

- [x] T3 公示条窄屏换行兜底
  - 文件：`index.html`
  - 位置：`#ddgame .dd-cheat-row` / `.dd-cheat-cards`（L952-953）
  - 改动：行加 `justify-content:center;flex-wrap:wrap;row-gap:4px;max-width:100%;text-align:center;`；
    卡组加 `flex:0 0 auto;`
  - 完成判据：320px 宽下整行要么单行完整、要么换行后仍按顺序阅读，无压缩变形。

- [x] T4 验证
  - `node --check` 抽取后的内联脚本
  - 临时副本注入公示条 + toast，Edge headless 截图 375×667、320×568、1280×800
  - 删除临时文件

- [x] T5 追加：手机矮屏 `.dd-cheat{order:-1}`，公示排在底牌前（实施中发现的必要补充）

- [x] T6 多语言检查与修复
  - 补 `.mid` 译文缺失的 `</span>`（en/ja/ko）
  - `#toast` 加 `width:max-content`，避免英/日/韩长句被半屏宽度压成多行
  - zh/en/ja/ko × 375、en/ja × 320 截图验证

## 风险与回滚

- 风险低：三处均为布局属性，不影响游戏逻辑与存档。
- 若桌面端出现偏移，回退 T2 的 `flex` 值即可；T1、T3 有媒体查询/换行兜底，不影响桌面。
