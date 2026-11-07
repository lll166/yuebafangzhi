# 竖屏适配 Tasks

对应 Spec：`spec-mobile-portrait.md`
全部改动文件：`d:\小工具\月巴放置\survivor.html`

## T1 视口与相机
- [x] `resize()`（L1559-1571）：加 `view.portrait = ch > cw`；竖屏用 `max(cw/W, ch/H)` 并初始化 `ox/oy`（世界居中）；横屏保持原公式。
- [x] 新增 `updateViewCamera()`：读 `G.player`，按可见世界宽高 clamp，竖屏仅该分支写 `view.ox/oy`。
- [x] `render()`（L4253-4259）：`setTransform` 前调用 `updateViewCamera()`。
- [x] 确认 `screenToWorld()` 无需改动、菜单态（`G.state==='menu'`）相机取世界中心。

## T2 摇杆屏幕空间
- [x] `onPointerDown/onPointerMove`（L2360-2375）：存 `clientX/clientY` 原值。
- [x] 移动逻辑（L3357-3361）：`jx=(joy.x-joy.ox)/view.s`、`jy` 同理，阈值 8 与 `max(48,jl)` 保持世界单位。
- [x] 摇杆绘制（L4307-4319）：基座用 `screenToWorld(joy.ox,joy.oy)`，旋钮 = 基座 + `(dx/view.s, dy/view.s)` 截断到 48。

## T3 底部栏合并
- [x] HUD HTML（L478-480）：包 `.botbar`，顺序 `#relicBar` → `#wpnBar`。
- [x] CSS（L320-336）：`.botbar` 定位/纵向 flex/最大宽；`.relicbar`、`.wpnbar` 去绝对定位，按视口宽度换行。
- [x] 竖屏媒体查询内调整 `.chestLayer` padding-bottom 与 `.chestPanel` 宽度。

## T4 竖屏提示移除
- [x] 删除 `#rotatehint` div（L488）、CSS 块（L399-405）及 `@media` 显示规则。
- [x] 删除 `T.zh/en/ja/ko` 的 `rotate` 键（L856/949/1042/1135）。

## T5 首页面板防溢出
- [x] `.panel`（L92）加 `min-width:0`。
- [x] `.lo-body`（L125）与 `≤520px` 版本（L150）改 `minmax(0,1fr)`。

## T6 验证
- [x] 启动 `node _gbsim/serve.js`（8971），Edge headless 390×844 截图：首页、局内（含遗物/武器条）、暂停页。
- [x] 截图确认：无横向裁切、无黑边、两栏不重叠、宝箱面板不压底部栏（宝箱面板底部 padding 112 > 底栏高度约 104）。
- [x] 横屏 844×390 截图对比，确认 letterbox/HUD/底栏无回归。
- [x] 删除 `_tmp_mobile.html`、`_tmp_land.html`、`_tmp_diag.html` 等临时文件，停止本地服务。
