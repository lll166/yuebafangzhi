# 月巴蛋 M5 · 四语言 / 低功耗 / 音效 / 接入收尾 · 技术规格

> 对应计划书：`specs/arcade-tamago/plan.md` §8、§10、§11 及 M5 验收清单
> 改动文件：仅 `tamago.html`
> 不改动：`index.html`（`GB_GAMES` 中 `tamago` 卡片保持 `hidden:true`；不加百巴箱写回/金币/图鉴回写）

## 0. 前置结论（已核实）

| 项 | 现状 |
| --- | --- |
| 父页卡片 | `index.html` L14901 `{id:'tamago', ..., hidden:true}` |
| 父页桥 | L15099 `yueba-tamago-ready` → L15108 回 `yueba-tamago-roster`（list/yard/tomato/muted/lowPower/lang） |
| iframe 入口 | `gbFrameOpen()` L15033 自动追加 `?lang=`；`gbFrameClose()` L15039 卸载 |
| 子页桥 | `tamago.html` L570 变量；L587 收消息；L572 `sendReady()` |
| 未使用 | `LANG`/`MUTED` 未参与任何文案或音频；`LOW` 仅用于 L2159 待机 tick |
| 回归约束 | `%TEMP%\tamago-m4-test.js` 直接引用全局 `TAUNT_OPEN/TAUNT_KNOCK/TAUNT_IGNORE/TAUNT_LEAVE/TAUNT_TOMATO/TAUNT_SICK/TAUNT_CRIT/TAUNT_DEATH` 并断言中文原文；默认语言必须仍为 `zh` 且中文逐字不变 |

## 1. 四语言（i18n）

### 1.1 数据与函数

在 `SAMPLES` 之后（原 `STAGE_LABEL` 位置，L197）新增：

- `I18N = {zh:{...}, en:{...}, ja:{...}, ko:{...}}`：扁平键表，占位符用 `{name}`/`{n}`/`{gap}`/`{time}`/`{need}`/`{i}`/`{hp}`/`{bond}`/`{taunt}`/`{cause}`/`{age}`/`{stage}`/`{h}`/`{m}`/`{c}`。
- `normLang(v)`：取前两位小写，命中 `zh/en/ja/ko` 才返回，否则 `zh`；`zh-*` 归 `zh`。
- `t(key, params)`：`I18N[LANG]` → 回退 `I18N.zh` → 回退 key；按 params 替换 `{k}`。
- `stageLabel(stage)`：映射 `stage_egg/stage_baby/stage_grow/stage_adult`，兜底 `stage_baby`。
- `sampleName(id)`：`sample_xiaoyue/sample_xian/sample_chi`。
- 删除 `const STAGE_LABEL`；所有引用改 `stageLabel()`。

`LANG` 初始化（L570）：

```js
const qlang=(location.search.match(/[?&]lang=([^&]+)/)||[])[1]||'';
let ROSTER=null, YARD=[], TOMATO=0, LANG=normLang(decodeURIComponent(qlang||'zh')),
    MUTED=false, LOW=matchMedia('(prefers-reduced-motion: reduce)').matches;
```

消息处理（L587）在赋值后追加：

```js
LANG=normLang(d.lang||LANG);
applyLangDom(); buildSwatches(); localizeEggs(); applyLowPower(); restartIdle();
```

`localizeEggs()`：仅当 `state.sampleMode` 为真时，把蛋/宠物的 `name` 换成 `sampleName()`，避免覆盖父页下发的本地化名。

### 1.2 台词表

`TAUNTS`（四语言，按计划 §6.4）：

- `open[10]`、`knock[3]`、`ignore[3]`、`leave[3]`
- `tomato`、`sick`、`crit`、`death` 各 1 条
- 中文与现有原文逐字一致（含「」）
- 保留全局兼容别名（指向 `TAUNTS.zh`）：`TAUNT_OPEN/TAUNT_KNOCK/TAUNT_IGNORE/TAUNT_LEAVE/TAUNT_TOMATO/TAUNT_SICK/TAUNT_CRIT/TAUNT_DEATH`
- 新函数：`tauntList(kind)`、`tauntOne(kind)`（数组随机 / 字符串直取）
- 代码内所有取台词处改为 `tauntOne('open')`、`tauntList('knock')[idx]` 等；`vis.line===TAUNT_TOMATO` 在 zh 下仍成立

气泡与宠物的短回应（四语言）：

| 键 | zh 原文 |
| --- | --- |
| `pet_quiet` | 「……」 |
| `pet_turn` | 「？」（扭头） |
| `pet_hop` | 「！」（跳了一下） |
| `pet_watch` | 「！」（还在看它） |
| `pet_relief` | 「……」（松了口气） |
| `pet_shrug` | 「……」（装作不在意） |
| `pet_lean` | 「……」（靠过来一点） |

英文/日文/韩文台词控制在气泡两行内（约 ≤64 拉丁字符/行），中文 ≤22 字/行。

### 1.3 UI 文案键（必须全部落地）

分组列出（每项都要有 zh/en/ja/ko 四值，zh 与现有文案逐字一致）：

- 静态：`title`、`hint`、`ariaDevice`、`ariaLcd`、`ariaShell`、`keyA`、`keyB`、`keyC`、`keySelect`、`keyConfirm`、`keyCancel`
- 主题：`theme_teal`、`theme_sakura`、`theme_purple`、`theme_midnight`、`theme_cream`、`theme_tomato`
- 阶段/状态：`stage_*`、`sick_ok`、`sick_sick`、`sick_crit`、`sample_*`
- 喂食：`feed_cookie`、`feed_grain`、`feed_tomato`、`feedPrompt`、`eatCookie`、`eatGrain`、`tomatoRefuse`
- 时间：`unit_min`、`unit_sec`、`unit_hour`、`unit_day`、`sep`
- 连接/孵化：`connecting`、`demoEggs`、`eggPrompt`、`hatchTailDup`、`hatchTailDemo`、`boot`
- 成长/离线：`growMsg`、`adultMsg`、`offlineMsg`
- 行动：`asleepSay`、`lightOff`、`lightOn`、`waitSec`、`cleanDone`、`cleanAlready`、`petWait`
- 医疗：`medNoSick`、`medMore`、`medSecond`、`medCured`、`rescuePress`、`rescueLine`、`rescueDone`
- 死因/归档：`cause_hunger`、`cause_dirty`、`cause_neglect`、`grDemo`、`grNeed`、`grAdult`、`grBond`、`grCure`
- 小游戏：`playSick`、`playWait`、`playStart`、`playRound`、`playHit`、`playMiss`、`playNoCatch`、`playGood`、`playBad`、`playHint`、`playEndGood`、`playEndBad`、`playCancel`
- 结束卡：`endArchiving`、`endDead`、`endGrad`
- 状态/相册：`statusGrad`、`statusAlbum`、`albumEmpty`、`albumGrad`、`albumDead`、`albumLine1`、`albumLineGrad`、`albumLineDead`、`albumBack`、`sleepLine`、`critLine`、`petStat`、`sickSuffix`
- 标签：`lbl_bond`、`lbl_hp`、`lbl_food`、`lbl_mood`、`lbl_clean`
- 访客：`visitorHint`、`nobody`、`visitorLeft`、`yardBanny`

### 1.4 替换点（精确）

| 位置 | 改动 |
| --- | --- |
| L161 `#hint` | 启动时 `applyLangDom()` 写入 `t('hint')` |
| L150–152 按键 `<small>` | `applyLangDom()` 写 `keySelect/keyConfirm/keyCancel` + aria |
| L173–180 `THEMES.name` | 展示统一 `t('theme_'+id)`（`applyTheme`、`buildSwatches`） |
| L856–860 `FEED` | 删除 `label`，显示用 `t('feed_'+item.key)` |
| L1280 `fmtGap` / L1480 `fmtAge` | 用 `unit_*` 拼接 |
| L1222–1223 成长提示 | `growMsg` / `adultMsg` |
| L1302 离线提示 | `offlineMsg` |
| L1332–1473 行动/医疗反馈 | 对应键 |
| L1476–1514 死因/归档 | `cause_*` / `gr*` |
| L1895–1986 小游戏 | `play*` |
| L2024–2103 `updateText` | `end*` / `status*` / `album*` / `feedPrompt` / `sleepLine` / `critLine` / `petStat` / `eggPrompt` / `demoEggs` / `connecting` |
| L2199–2202 孵化文字 | `hatchTail*` + `stageLabel('baby')` |
| L1740/L1805 访客 | `nobody` / `visitorLeft` |
| L1607 无名庭院月巴 | `t('yardBanny')` |

`applyLangDom()` 放在 `applyTheme` 前（L2108 附近），负责：`document.documentElement.lang`、`document.title`、设备/画布/色板 aria、三个按键 aria 与小字、`#hint`。`applyTheme()` 内 `$('shellName').textContent=t('theme_'+t.id)`。

## 2. 低功耗（LOW）

### 2.1 CSS（`</style>` 前追加）

```css
body.low #screenWrap.shake{animation:none;}
body.low #visitor .vbArt,body.low #visitor .vb.walk .vbArt,
body.low #visitor .vb.pop .vbArt,body.low #visitor .vb.hop .vbArt{animation:none;}
body.low #screenWrap,body.low #lcdText,body.low #bubble{transition:none;}
```

### 2.2 JS

- `applyLowPower()`：`document.body.classList.toggle('low',LOW)`；启动、收到 roster、`visibilitychange` 时调用。
- `drawEggsScreen()` L950：选择框闪烁改为 `if(LOW||frame%4<2)`。
- `drawPetScreen()` L987–991：`LOW` 时 `shx=0`；L1006 汗滴 `if(LOW||frame%4<2)`。
- `drawHatch()` L1149–1153：`LOW` 时跳过整屏反色闪（该段保持空白）。
- `drawEndScreen()` L1110–1118：`dead` 且 `LOW` → 宠物显示到 260ms，之后直接 `theme.ink` 全屏；不画心形中间帧。
- `startAnim()` L1328：重绘间隔 `LOW?120:50`。
- `screenShake()` L1410：`LOW` 直接 return。
- `restartIdle()` 保持 `LOW?500:320`；`LOW` 变更后重启。

## 3. 音效（WebAudio，无外部资源）

### 3.1 模块（放在 `bindKeys()` 之前）

```js
let audioCtx=null, audioMaster=null, audioLive=0;
function audioReady(){...}   // 首次用户手势创建/恢复，MUTED 时返回 null
function note(c,f0,f1,dur,type,vol,delay){...} // 计数 audioLive，ended 释放
function sfx(kind){ if(MUTED) return; const c=audioReady(); if(!c||audioLive>=2) return; ... }
```

- 主增益 0.28；只用 `square` / `triangle`；并发 ≤2。
- `beforeunload` / `pagehide`：`audioCtx.close()` 并置 null。
- 首次 `pointerdown`（`{once:true}` 捕获阶段）解锁音频上下文。
- 未连接/静音时 `sfx()` 静默，不报错。

### 3.2 事件映射

| 触发点 | kind | 声音 |
| --- | --- | --- |
| 任意按键/画布点击 | `click` | 440Hz square 40ms |
| 孵化开始 `beginHatch` | `hatch` | 300→620Hz triangle 220ms |
| 喂食 `confirmFeed` | `eat` | 520→700 triangle 90ms |
| 喂番茄 | `refuse` | 200Hz square 90ms |
| 摸头 `petHead` | `pet` | 780→980 triangle 80ms |
| 清洁成功 | `clean` | 620→300 triangle 100ms |
| 吃药 | `med` | 880 square 60ms |
| 抢救按键 | `rescue` | 300 square 50ms |
| 小游戏命中/失误 | `hit` / `miss` | 880 square / 220 square |
| 小游戏结算好/差 | `good` / `bad` | 660→880 / 330→220 triangle |
| 访客开口 | `taunt` | 360 triangle 70ms |
| 敲玻璃 | `knock` | 180 square 50ms |
| 新生病（`simulateStep` 状态迁移） | `sick` | 240 square 120ms |
| 死亡 `endPet('dead')` | `death` | 110 triangle 900ms（单声低音） |
| 毕业 `endPet('graduate')` | `graduate` | 660→440 triangle 200ms |
| 开关灯 | `light` | 500 square 50ms |

所有调用只在状态实际变化处触发，不新增循环音。

## 4. 接入（按用户要求不实装）

- `index.html` 不做任何修改；卡片保持 `hidden:true`。
- 子页继续 `sendReady()` 握手；收到 roster 后只读 `list/yard/tomato/muted/lowPower/lang`。
- 不做金币、番茄、图鉴、存档回写；`postMessage` 仍只发 `yueba-tamago-ready`。
- 语言优先级：`?lang=` → 父页 `lang` → 浏览器语言；`LANG` 变更后不重抽蛋、不动存档数值。

## 5. 验收

### 5.1 新增 `%TEMP%\tamago-m5-test.js`（CDP 端口 9351）

1. 默认 `zh`：LCD/气泡/提示中文与 M4 一致；`TAUNT_*` 仍为中文原文。
2. 通过 `window.postMessage({type:'yueba-tamago-roster',lang:'en'...})` 切换：标题、按键小字、状态页、气泡、主题名变为英文；`ja`/`ko` 同理。
3. 四语言气泡不溢出：`#bubble` 高 < 52px、宽在 320 视口内。
4. `lowPower:true`：`body.low` 存在；`shake` 类不产生动画；孵化无整屏反色帧；死亡 ≤300ms 进入黑屏；待机 tick 500ms。
5. `muted:true`：按键/喂食后 `audioLive===0`；`muted:false` 手势后 `audioLive<=2` 且有振荡器创建记录。
6. 父页集成：`tamago.html` 在 `index.html` iframe 内收到 roster，`lang` 生效；卡片仍 hidden（`gbRender()` 不出现 tamago）。

### 5.2 回归（全部 ALL PASS）

- `node %TEMP%\tamago-m3-test.js`（9341）
- `node %TEMP%\tamago-m4-test.js`（9342）
- `node %TEMP%\tamago-visitor-art-test.js`（9343）
- `node %TEMP%\tamago-parent-integration.js`（9345）
- `node %TEMP%\tamago-noflash-test.js`（9347）
- `node %TEMP%\tamago-art-pixel-test.js`（9350）

### 5.3 截图

- `shots/m5-zh.png`、`m5-en.png`、`m5-ja.png`、`m5-ko.png`、`m5-low.png`、`m5-veil.png`（黑屏/结束卡）。

## 6. 完成定义

- [ ] 四语言全覆盖，无内联中文残留（PIX/DOM 固定英文除外）
- [ ] `LOW` 下无抖动/反色闪/访客 Q 弹；死亡快速黑屏
- [ ] 音效只走 WebAudio，`MUTED` 全静音，并发 ≤2
- [ ] `index.html` 零改动，卡片仍 hidden，无任何写回
- [ ] M5 新测 + 6 项旧回归全绿
