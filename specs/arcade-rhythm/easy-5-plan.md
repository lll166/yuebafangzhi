# 月巴节拍 · 普通页 1-5 关 + 标签页预留（修订版）

> 状态：已评审通过，按本文件实施。
> 修订点：保留现有「普通 / 困难」两关；新增 5 关全部放普通页（1 轨）；数据按「普通 1 轨 / 困难 2 轨」的标签页模型组织，预留 50 关容量。
> 文件：游戏代码只改 `月巴节拍/rhythm.html`。

## 一、定稿选择

- **保留**现有 `l1`（普通，1 轨）和 `l2`（困难，2 轨），不删除，改名为「经典 · 普通 / 经典 · 困难」，作为两组里的经典关，默认解锁。
- 新增 **5 关全部在普通页**，全部 1 轨；上一版 L3-L5 的双轨设计取消，改为同节奏的单轨变奏。双轨内容留给困难页（目前只有经典困难）。
- 未来标签页：普通页只放 1 轨关卡，困难页只放 2 轨关卡；本轮不做 tab 切换，只在选关页用「普通 / 困难」分组标题占位，下一轮把标题换成 tab bar 即可。
- 数据模型：`TIERS`（每个 tab 一个对象，含 `lanes` 和 `levels` 数组）+ 扁平 `LEVELS`（启动时由 TIERS 展开）。加新关 = 往对应 `tier.levels` 里加一个对象，菜单、解锁、校验、编号自动生效。
- 解锁：每个 tab 独立 `progress`；普通页从教学关开始顺序解锁，常规关准确度 ≥70% 解锁下一关；困难页从经典困难开始顺序解锁。经典关 `legacy:true` 默认解锁。
- 存档升级 `yueba-rhythm-v2`：迁移旧 `best.l1/l2`、`offset`、`seenIntro`；新增 `progress:{normal:1,hard:1}`。旧成绩保留，旧键不删。
- 教学关、教练提示、变奏、四语言、低功耗等，按上一版计划继续。

## 二、数据模型（50 关预留）

```js
var TIERS=[
  { id:'normal', lanes:1, name:{...}, levels:[ e1,e2,e3,e4,e5,l1 ] },
  { id:'hard',   lanes:2, name:{...}, levels:[ l2 ] }
];

var LEVELS=[];
for(var ti=0;ti<TIERS.length;ti++){
  var tier=TIERS[ti];
  for(var li=0;li<tier.levels.length;li++){
    var L=tier.levels[li];
    L.tier=tier.id;
    L.lanes=tier.lanes;   // 普通强制 1 轨，困难强制 2 轨
    LEVELS.push(L);
  }
}
```

- 标签页数据就是 `TIERS`：普通页渲染 `TIERS[0].levels`，困难页渲染 `TIERS[1].levels`；本轮用分组标题，下一轮直接换 tab。
- 关卡编号用组内序号（`li+1`），所以普通页显示 LEVEL 01–06，困难页显示 LEVEL 01；以后加到 50 关也不用改编号逻辑（`pad2` 支持到 99）。
- `save.progress` 按组存：

```js
progress:{ normal:1, hard:1 }   // 每组已解锁到第几关（1 基）
```

- 加新关只改 `TIERS[x].levels`，启动时重新展开 `LEVELS`；`best` 用关卡 id 记录，不受影响。

## 三、关卡表

### 新增普通页 1-5（全部 1 轨）

| 关 | id | 名称 | BPM | 小节 | 每小节音数=短句 | 总音数 | 谱面单遍 |
|---|---|---|---|---|---|---|---|
| 1 | e1 | 教学 · 听与敲 | 80 | 6 | 4 | 24 | 18.0s |
| 2 | e2 | 稳拍 | 92 | 8 | 5 | 40 | 20.9s |
| 3 | e3 | 连拍 | 100 | 10 | 6 | 60 | 24.0s |
| 4 | e4 | 切分变奏 | 108 | 12 | 7 | 84 | 26.7s |
| 5 | e5 | 月巴变奏 | 116 | 14 | 7 | 98 | 29.0s |

核心：每关每小节音数固定，等于该关 `phrase`，所以 `buildPhrases()` 每个短句正好一小节；短句长度 4→5→6→7→7，关卡 6→8→10→12→14 小节递增。所有音都是单击，同刻无双押；全部落在 16 步网格的偶数位上，最小间隔 2 步，不会出现十六分连打。

### 保留的经典关

| 组 | id | 名称 | BPM | 轨 | 小节 | 总音数 | 说明 |
|---|---|---|---|---|---|---|---|
| 普通 | l1 | 经典 · 普通 | 100 | 1 | 12 | 48 | 原普通关，原谱保留，默认解锁 |
| 困难 | l2 | 经典 · 困难 | 120 | 2 | 12 | 74 | 原困难关，原谱保留，默认解锁 |

- 经典关 `legacy:true`，不参与普通页 1-5 的顺序解锁，始终可玩；旧成绩 `best.l1/l2` 继续显示。
- 新 5 关全部在普通页，困难页本轮只有经典困难一关，后续按同样结构追加 2 轨关卡。

## 四、谱面代码

```js
/* ===== 普通页新增 5 关：全部 1 轨，每小节固定音数 = phrase ===== */
var P1A='x...x...x...x...', P1B='x...x...x.x.....';
var P2A='x...x...x.x.x...', P2B='x...x.x...x...x.', P2C='x.x...x...x...x.', P2D='x...x...x...x.x.';
var P3A='x.x.x...x.x.x...', P3B='x.x.x.x.x.x.....', P3C='x.x.x.x...x.x...';
var P3Bp='x.x.x.x.x.....x.', P3D='x...x.x.x...x.x.', P3E='x.x.x.x.x...x...';
var P4A='x.x.x.x.x.x.x...', P4B='x.x.x.x...x.x.x.', P4C='x.x...x.x.x.x.x.';
var P4Bp='x.x.x...x.x.x.x.', P4Cp='x...x.x.x.x.x.x.', P4D='x.x.x.x.x.x...x.';

var TIERS=[
  { id:'normal', lanes:1,
    name:{zh:'普通',en:'Normal',ja:'ノーマル',ko:'노멀'},
    levels:[
      { id:'e1', tutorial:true, bpm:80, bars:6, root:130.81, phrase:4,
        name:{zh:'教学 · 听与敲',en:'Tutorial',ja:'チュートリアル',ko:'튜토리얼'},
        tracks:[ rep(P1A,2)+rep(P1B,2)+rep(P1A,2) ] },
      { id:'e2', bpm:92, bars:8, root:146.83, phrase:5,
        name:{zh:'稳拍',en:'Steady',ja:'ステディ',ko:'스테디'},
        tracks:[ P2A+P2A+P2B+P2C+P2A+P2A+P2D+P2C ] },
      { id:'e3', bpm:100, bars:10, root:164.81, phrase:6,
        name:{zh:'连拍',en:'Offbeat',ja:'オフビート',ko:'오프비트'},
        tracks:[ P3A+P3A+P3B+P3C+P3A+P3A+P3Bp+P3D+P3C+P3E ] },
      { id:'e4', bpm:108, bars:12, root:174.61, phrase:7,
        name:{zh:'切分变奏',en:'Syncopation',ja:'シンコペーション',ko:'싱코페이션'},
        tracks:[ P4A+P4A+P4B+P4C+P4A+P4A+P4Bp+P4Cp+P4A+P4A+P4D+P4D ] },
      { id:'e5', bpm:116, bars:14, root:196.00, phrase:7,
        name:{zh:'月巴变奏',en:'Banny Variation',ja:'バニー変奏',ko:'버니 변주'},
        tracks:[ P4A+P4A+P4B+P4C+P4A+P4A+P4Bp+P4Cp+P4A+P4A+P4B+P4Cp+P4D+P4D ] },
      { id:'l1', legacy:true, bpm:100, bars:12, root:130.81, phrase:4,
        name:{zh:'经典 · 普通',en:'Classic · Normal',ja:'クラシック・ノーマル',ko:'클래식·노멀'},
        tracks:[ rep('x...x...x...x...',6)+rep('x...x...x.x.....',3)+rep('x...x...x...x...',3) ] }
    ] },
  { id:'hard', lanes:2,
    name:{zh:'困难',en:'Hard',ja:'ハード',ko:'하드'},
    levels:[
      { id:'l2', legacy:true, bpm:120, bars:12, root:146.83, phrase:6,
        name:{zh:'经典 · 困难',en:'Classic · Hard',ja:'クラシック・ハード',ko:'클래식·하드'},
        tracks:[
          rep('x...x...x...x...',6)+rep('x...x...x.x.....',3)+rep('x...x...x...x...',3),
          rep('..x.......x.....',4)+rep('......x...x.....',2)+rep('..x.......x.....',2)+rep('....x...x...x...',2)+rep('..x.....x.......',2)
        ] }
    ] }
];
```

### 变奏结构

- **L1**：`A A B B A A`；B 在第三拍拆出两个八分、第四拍留空，教八分音符。
- **L2**：`A A B C A A D C`；5 音/小节，B/C/D 是 A 的节奏变奏。
- **L3**：`A A B C A A B' D C E`；6 音/小节，B' 把 B 的结尾从第 10 步移到第 14 步。
- **L4**：`A A B C A A B' C' A A D D`；7 音/小节，B'/C' 移动最后一个音。
- **L5**：`A A B C A A B' C' A A B C' D D`；7 音/小节、更快、更长，第三次回到 B/C' 后收尾。

### 谱面校验

新增 `validateLevels()`，启动时检查：

- 每组 `tier.levels` 里的关卡 `tracks.length === tier.lanes`；
- 每轨长度 `=== bars*16`；
- 非经典关：每小节音节数 === `phrase`，同刻不能有双押，`phrase` 在 4–8；
- 经典关：只检查轨数/长度，不强制短句对齐（原困难关含双押，保持原样）。

控制台有问题时输出 `[rhythm] level eN ...`。

## 五、教学关（e1）

- 6 小节、80 BPM、1 轨、24 音；结构 `A A B B A A`。
- 前 2 小节四分音符；第 3–4 小节在第三拍拆出两个八分、第四拍留空；第 5–6 小节回正拍。
- 教练气泡 `#coach` 放在 Canvas 内两行洞口之间，`pointer-events:none`，不挡戳击；`startSegment()` 更新，`finishLevel()` / `quitToMenu()` 隐藏。
- 文案：

| 触发 | key | 中文 |
|---|---|---|
| demo 第 1 段 | `coachIntro` | 教学：先听上方，再敲下方。 |
| demo 第 3/4 段（pi=2/3） | `coachEighth` | 注意 · 这里有两个音贴得很近。 |
| play 第 3/4 段（pi=2/3） | `coachEighthTap` | 快速戳两下，别漏第二个。 |
| play 最后一段 | `coachLast` | 最后一遍，完成就通关！ |
| demo 其他段 | `coachListen` | 听 · 只看不敲，记住节奏。 |
| play 其他段 | `coachTap` | 敲 · 缩圈贴到洞口时戳月巴。 |

- 教学关 `tutorial:true`：结算无论评级都解锁 e2；结算 toast「下一关已解锁」。
- 不做分步弹窗；现有玩法面板保留，新增第 6 条解锁说明。

## 六、存档与解锁

`yueba-rhythm-v2`：

```js
{
  best:{ e1:{...}, l1:{...}, l2:{...} },
  progress:{ normal:1, hard:1 },
  offset:0,
  seenIntro:false
}
```

- 新键 v2；无 v2 时读 v1，迁移 `best`（保留 l1/l2）、`offset`、`seenIntro`；`progress` 默认 `{normal:1,hard:1}`。
- 旧 `unlocked` 不再使用；经典关 `legacy:true` 默认解锁，所以旧困难关仍然可玩。
- 每组 `progress` 在 `LEVELS` 展开后按组长度 clamp（`1..tier.levels.length`）。
- 解锁规则：
  - 教学关 e1：通关即 `progress.normal=2`；
  - 普通 e2–e5：≥70% 解锁下一关；
  - 困难组：从 l2 开始，后续 2 轨关卡同样 ≥70% 解锁；
  - 经典关始终解锁，不占进度。
- 结算「下一关」：取 `LEVELS[idx+1]`，只有该关已解锁才可点；e5 之后是经典普通 l1（默认解锁），所以可继续；e2–e4 失败时下一关锁定，按钮禁用并提示 `unlockNeed`。
- e5 成功额外 toast「普通关卡 1-5 完成」（`campaignClear`）。

## 七、选关页

- 本轮不做 tab 切换，在 `#levelGrid` 里按 TIERS 顺序渲染分组标题：
  - `普通 · 1 键` + e1–e5 + 经典普通 l1；
  - `困难 · 2 键` + 经典困难 l2。
- 卡片 `LEVEL` 编号用组内序号：普通 01–06，困难 01；以后 50 关也沿用。
- 卡片 meta 增加小节数：`BPM · 小节 · 轨数`。
- 经典关卡名带「经典」前缀；默认解锁，`lbest` 显示旧成绩或 `—`。
- CSS 新增 `.tierHead{grid-column:1/-1;...}`；下一轮把分组标题换成 tab bar，`TIERS` 数据不用动。
- HUD 的 `LV` 改为组内编号（普通页 01–06，困难页 01），避免和卡片编号不一致。

## 八、代码改动清单（`月巴节拍/rhythm.html`）

1. **CSS**（约 99–107 行 `#bigNum` 后）：`#coach` 气泡；`.tierHead` 分组标题。
2. **HTML**（约 278–283 行 `#cvWrap` 内）：加 `<div id="coach"><i></i><span id="coachTxt"></span></div>`。
3. **TX 字典**（约 399–507 行）：新增 `barUnit`、`coach*`、`unlockNeed`、`campaignClear`、`help6`；更新 `unlockHint` / `lockedTip`。
4. **存档**（约 518–528 行）：`SAVE_KEY='yueba-rhythm-v2'`，`LEGACY_KEY='yueba-rhythm-v1'`；`progress` 取代 `unlocked`；v1 迁移 `best/offset/seenIntro`；`persist` 写 `progress`。
5. **关卡数据**（约 563–574 行）：用 `TIERS` 嵌套结构替换 `LEVELS`；展开 `LEVELS`；clamp `save.progress`；调用 `validateLevels()`。
6. **`els`**（约 670–674 行）：加入 `coach`、`coachTxt`。
7. **教练逻辑**：`setCoach/hideCoach/coachFor`；`startSegment()` 更新；`startLevel()`/`finishLevel()`/`quitToMenu()` 隐藏。
8. **`startLevel`**（约 913–947 行）：HUD `LV` 用组内编号；`G.L.lanes` 已由 TIERS 注入。
9. **`finishLevel`**（约 1054–1102 行）：按 `tier.levels` 计算 progress；教学关必解锁；e5 完成 toast；`btnNext` 用 `LEVELS[idx+1] && isLevelUnlocked`。
10. **选关**（约 1573–1592 行）：按 TIERS 分组渲染；`data-idx` 仍用扁平索引；锁定状态用 `isLevelUnlocked`；meta 加小节数。
11. **点击处理**（约 1635–1643 行）：`isLevelUnlocked(L)` 替代 `idx>=save.unlocked`。
12. **`btnNext`**（约 1652–1655 行）：改为检查 `LEVELS[idx+1]` 的解锁状态。
13. **`applyLang`**（约 1593–1615 行）：help 循环 1..6；TIERS 名称、组内编号无需额外绑定。
14. **不改**：音频、判定窗口、`compileLevel`、`buildPhrases`、`draw`、输入映射、校准、暂停、主存档读取。

## 九、验收清单

- [ ] 选关页显示两组标题：`普通 · 1 键`、`困难 · 2 键`；普通组 6 张卡（5 新 + 经典普通），困难组 1 张（经典困难）。
- [ ] 新 5 关全部 1 轨；经典困难仍 2 轨；卡片 meta 的 BPM/小节/轨数正确。
- [ ] 普通组：e1 默认解锁，e2–e5 顺序解锁，经典普通默认解锁；困难组经典困难默认解锁。
- [ ] 教学关：教练气泡按段出现、24 音、最后一段提示通关；任意评级都解锁 e2。
- [ ] e2–e5：≥70% 解锁下一关；<70% 下一关按钮禁用并提示；e5 成功提示「普通关卡 1-5 完成」。
- [ ] 经典普通 l1、经典困难 l2 可立即游玩；旧 `best.l1/l2` 迁移后继续显示。
- [ ] 谱面校验通过：新 5 关每小节音节数=phrase、无同刻双押、轨长正确；经典关只查轨数/长度；控制台无 `[rhythm]` 警告。
- [ ] 1 轨输入：D / 1 / 空格 / 触摸；2 轨输入：F / J、1 / 2、左右半屏；击中/漏掉/扑空正常。
- [ ] HUD LV 与卡片编号一致（普通 01–06，困难 01）。
- [ ] 暂停/继续、重来、退出、重试、下一关、返回选关、跳过试听正常；教练气泡不残留。
- [ ] 四语言：`?lang=zh/en/ja/ko` 下关卡名、组名、教练文案、小节单位、解锁提示无缺失。
- [ ] 手机 390×844：气泡不挡洞口；分组标题和 7 张卡片正常换行/滚动。桌面 1280×800 不溢出。
- [ ] 低功耗：气泡仍显示但无过渡动画。
- [ ] 旧存档迁移：v1 有 `best.l1=90%`、`best.l2=80%`、`offset=37`、`seenIntro=true` 时，打开后这些值保留，`progress.normal=1`，e2 仍锁定。
- [ ] 50 关预留：临时往 `TIERS.normal.levels` 插入一个关卡，菜单编号、解锁、校验均正常；验收后移除。
- [ ] `?debug=1&level=1..7` 可逐关进入（1–6 普通组，7 经典困难），无页面报错；不写主存档。

## 十、风险与备选

| 风险 | 对策 |
|---|---|
| 新 5 关全部 1 轨，困难页本轮没有新增内容 | 按你的规则，普通页只放 1 轨；困难页保留经典困难，后续按 TIERS 结构追加 2 轨关卡即可 |
| L5 7 音/小节、116 BPM、14 小节偏难 | 先按此实装；试玩偏难就把 BPM 降到 108 或把 14 小节减到 12 |
| 50 关时选关页很长 | 本轮分组滚动已可用；下一轮换 tab 后每组单独滚动，数据结构不变 |
| 经典关默认解锁，和新关顺序解锁并存 | 经典关是旧内容，保留可玩性；卡片带「经典」前缀，和 1-5 顺序进度区分 |
| 旧存档 `unlocked` 不再使用 | 经典关默认解锁，旧困难不会丢失；新 5 关从教学关重新开始，旧 best 保留 |
| 分组标题只是 tab 的过渡形态 | 下一轮把 `.tierHead` 换成 tab bar，渲染 `TIERS[i].levels`，无需迁移数据 |

## 十一、实施顺序

1. 完成 `rhythm.html` 的 `TIERS` 数据、`LEVELS` 展开、`validateLevels()`、`save.progress` 与 v1 迁移。
2. 加 `#coach` HTML/CSS、四语言文案与教练逻辑。
3. 改选关分组、HUD 组内编号、解锁/结算/help 第 6 条。
4. 用 `?debug=1&level=1..7` 逐关试玩，检查四语言和 390×844 / 1280×800 截图。

不新增资源文件，不改 `index.html`，不提交 git（除非另行要求）。

> 调试截图：可在 URL 后加 `&nopause=1` 关闭后台自动暂停（仅在 `?debug=1` 调试时使用），方便在浏览器后台标签里看画面；正常游玩不要带这个参数。

## 十二、校准页调整（2026-10-30）

- 打开校准页不再自动开始；先显示「准备好后点『开始校准』」。
- 点「开始校准」后播放约 24 秒（40 拍 × 0.6s）的循环节拍；点满 8 下立即结束，不会因为反应慢被提前判失败。
- 节拍器首拍高音提示；每点一下更新「还差 N 下」；8 下后取中位数，显示「已校准：X ms」并同步滑块。
- 超时（约 24.8 秒）时不足 8 下提示「这次没点满 8 下，再试一次」，按钮变为「再试一次」。
- 修复原来「重新开始」按钮没有绑定点击事件的问题；现在该按钮在准备态是「开始校准」，运行中是「重新开始」，结束后是「再试一次」。
- 新增 `#calibStatus` 状态行与四语言文案；校准页仍可用滑块手动微调。
