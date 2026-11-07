# 竖屏（手机）适配 Spec

状态：待确认
范围：仅 `survivor.html`（单文件游戏）；沿用 `plan.md` L25/L317 与 `plan3.md` L447 的验收条目。

## 目标
390×844 等竖屏手机上：首页可用、局内可玩、HUD/遗物条/武器条/宝箱卡/摇杆互不遮挡，横屏行为不回归。

## 现状问题（已用 390×844 headless 截图确认）
1. 首页 `.panel` 作为 flex item，`min-width:auto` 导致内容把面板撑出视口右侧，装备/角色/关卡卡被裁切。
2. `view.s = Math.min(cw/W, ch/H)` 在竖屏把 1280×720 世界缩成屏幕中部 390×219 的横向带，上下大黑边，角色过小不可玩。
3. `#rotatehint`（"建议横屏游玩"）在竖屏覆盖 HUD 统计区，已与新需求冲突。
4. `.relicbar`（bottom 37）与 `.wpnbar`（bottom 78）各自绝对定位；竖屏 390 宽 8 个遗物会换行成两排，直接压住武器条。
5. 宝箱 `.chestLayer` 底部 padding 58px，竖屏下 92vw 宽的面板会盖住底部两条。

## 决策
### A. 竖屏视口：cover 缩放 + 横向相机跟随
- `resize()`：`view.portrait = ch > cw`。
  - 横屏保持 `s = min(cw/W, ch/H)`、居中 letterbox（零回归）。
  - 竖屏 `s = max(cw/W, ch/H)`；因竖屏时 `s = ch/H`，画面纵向正好铺满，可见世界宽 `cw*H/ch ≈ 333`（390×844），不会出现黑边。
- 新增 `updateViewCamera()`：竖屏在每帧 `render()` 设置 `view.ox/oy`，相机中心跟随 `G.player`，并按可见世界宽高 clamp 到 `[0,W]×[0,H]`；`vw>=W` / `vh>=H` 时对应轴固定居中。
- `screenToWorld()` 继续使用 `view.ox/oy`（相机值每帧更新，指针事件使用上一帧值即可）。

### B. 触控摇杆改为屏幕空间
相机跟随后若摇杆仍存世界坐标，手指不动时 `世界点 - 起点` 会持续累加玩家位移，产生"松手仍持续移动"的反馈错误。改为：
- `onPointerDown/Move`：`G.joy.ox/oy/x/y` 直接存 `clientX/clientY`。
- 移动（L3357-3361）：`jx = (joy.x-joy.ox)/view.s`，其余判定/归一化不变。
- `fire()` 兜底方向（L2854）只取方向，无需改动。
- 摇杆绘制（L4307-4319）：用 `screenToWorld(joy.ox,joy.oy)` 得世界基座，旋钮偏移 = 屏幕偏移/`view.s`，半径仍 48 世界单位。

### C. HUD / 底部栏
- 删除 `#rotatehint` 元素、CSS（L399-405）与四语言 `rotate` 键（L856/949/1042/1135）。
- HTML 把 `#relicBar`、`#wpnBar` 包进 `.botbar`（遗物在下、武器在上）；`.botbar` 绝对定位 `left:14px; bottom:36px+safe`，`flex-direction:column; gap:4px; align-items:flex-start; max-width:calc(100vw - 28px)`；两个子条改为 `position:static; max-width:100%`，自动向上生长不重叠。
- 竖屏媒体查询（`orientation:portrait and max-width:720px`）：`.chestLayer` 底部 padding 提到 `112px+safe`，`.chestPanel` 宽 `min(360px,94vw)`。
- 现有 `max-width:720px` 规则保留（hpbox/计时/统计换行），不改动横屏。

### D. 首页面板溢出
- `.panel` 加 `min-width:0`。
- `.lo-body` 改 `minmax(0,1fr) 118px minmax(0,1fr)`；`≤520px` 时中间列 92px 同样用 `minmax(0,1fr)`。

## 非目标
- 不改世界尺寸、敌人/武器数值、关卡配色与遗物系统。
- 不为竖屏新增独立 HUD 皮肤；沿用青色全息风格。
- 不做横屏行为变更（除摇杆坐标实现细节，其手感等价）。

## 验收
1. 390×844 首页：面板完整落在视口内，可上下滚动，无横向裁切。
2. 390×844 局内：画面铺满全屏无黑边；角色约 42px；拖动屏幕可移动，松手立即停止；走到世界左右边缘相机停止跟随。
3. HUD：HP/计时/统计/暂停按钮不重叠；无"建议横屏"提示。
4. 底部：遗物条（≤8 件）与武器条上下堆叠、不遮挡；宝箱三选一面板位于两条之上。
5. 暂停页（`#btnPause`）：遗物加成、Lv 与点阵在 390 宽下排版正常。
6. 横屏 844×390 与桌面 16:9：与改动前截图一致（letterbox、HUD、摇杆基座位置不变）。

## 验证方式
本地 `node _gbsim/serve.js`（8971）+ Edge headless 390×844 截图（首页/局内/暂停/宝箱），临时包装页用完即删。
