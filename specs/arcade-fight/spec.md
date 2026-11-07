# 月巴拳：战败后换月巴 + 技能图标居中

## 目标

1. 战败结算页新增「换月巴」入口：输掉一场后可以重新从本组 10 只月巴（+常驻番茄）中选人，并从第 1 关重开。
2. 修复技能按钮内 SVG 图标靠左、未居中。
3. 组切换规则保持不变：本组 10 只固定，只有通关组 Boss 后才换下一组；存档在通关时已包含新组，不再出现「刷新页面偶发换组」。

## 规则确认（用户已确认）

- 游戏：`fight.html`（月巴拳）。
- 通关组 Boss（第 7 关）后可以换月巴 → 现状已满足：`groupClear()` 生成新组 → 通关页 → 进入下一组 → 选角。
- 输掉后也可以换月巴 → 新增。
- 进度处理：换月巴后**重置到第 1 关**。
- 组固定：战败换人只在本组 10 只内重选，不重抽组。

## 实现方案

### 1. 技能图标居中（`fight.html` 约 278 行）

`.pbtn` 当前只有固定宽高，SVG 为 `display:block` 且无内边距/弹性布局，导致靠左。

```css
.pbtn{display:flex;align-items:center;justify-content:center;padding:0;...}
```

保留现有 `.pbtn svg{display:block;width:30px;height:30px}` 与桌面端尺寸覆盖；番茄/超必杀按钮同规则生效。

### 2. 战败结算页新增「换月巴」按钮

- HTML（`#scrEnd`，约 431 行）：在「续关再战」与「放弃本轮」之间插入
  `<button class="btn ghost big" id="btnChange">换月巴重开</button>`。
- `renderEnd()`（约 3121 行）：`$('btnChange').textContent = T('changeBtn');`。
- 新函数（放在 `giveUp()` 附近）：

```js
function changeAfterLoss(){
  finishRun(false);      // 记录败场、结算得分
  SFX.click();
  startRun();            // 同组重置：state='select'，之后选人从第 1 关开始
}
```

说明：`startRun()` → `ensureGroup()`（沿用本组）+ `resetRun()`（关卡/续关/增益/得分重置）+ 选角页；`selectFighter()` 内 `G.stage=1; startStage(1)`，满足「重置到第 1 关」。
`finishRun(false)` 保证本局成绩与败场正常入账，`resetRun()` 再把 `runFinished` 复位。

- 事件绑定（约 3288 行）：`$('btnChange').addEventListener('click', function(){ changeAfterLoss(); });`
- 按钮常显（输掉即出现），与「续关再战」（无续关次数时隐藏）并存。

### 3. i18n

四种语言各加一条 `changeBtn`，挨着 `continueBtn`：

| key | zh | en | ja | ko |
|---|---|---|---|---|
| changeBtn | 换月巴重开 | Change Banny | バニーを変更して再開 | 버니 교체 후 재시작 |

`endSub` 保留原文案（「这一组不会换，随时回来再打」），不改。

### 4. 组存档一致性

复核：`groupClear()` 中 `newGroup()`（1949 行）先于 `finishRun(true)`（1952 行），`finishRun` 内含 `saveNow()`，所以新组已落盘，无需额外改动。

## 影响文件

- `d:\小工具\月巴放置\fight.html`（唯一改动文件）

## 验证

1. 静态检查：`.pbtn` 为 flex 居中；`#btnChange` 存在且有事件绑定；`T('changeBtn')` 四语言齐全。
2. 无头 Edge + CDP（沿用临时脚本思路）：
   - 截战斗画面确认 4 个技能图标在按钮正中。
   - 注入 `G.state='end';G.endInfo={canContinue:true};showScreen('end');renderEnd();` 截图确认「换月巴重开」按钮显示。
   - 点击 `#btnChange`，断言 `G.state==='select'`、`G.stage===1`、选角网格显示本组 10 只 + 番茄。
3. 回归：通关页「进入下一组」仍可用；续关仍保持原角色与当前关卡。

## 非目标

- 不新增战败重抽整组功能。
- 不改 7 关/三局两胜/续关次数等既有规则。
- 不改技能键显隐设置。
