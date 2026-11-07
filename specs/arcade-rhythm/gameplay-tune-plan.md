# 月巴节拍 1-5 关玩法调优计划

> 状态：已评审通过，按本文件实施。
> 约束：**不改动效/CSS/图片/音频**；只改关卡数据、段落调度、提示文字、解锁规则。普通页仍为 1 轨，困难页仍为 2 轨；经典关不动。

## 一、结论先行

本轮做 5 个核心改动 + 2 个低风险小修：

1. **L5 记忆回奏**：第 9-10 小节重复 A A 时不再试听，直接凭记忆敲；给 1.2 秒预备和“记忆挑战”提示。
2. **L2-L5 收尾句**：最后一个小节只放 4 个四分音符，并把最后一句延长到小节末。
3. **L3/L4 新节奏细胞**：L3 加“空半拍”的 C，L4 加“第二拍延后”的 C；L5 用同一套细胞重组并加入记忆段。
4. **L1/L2 加长换段留白**：试听→演奏约 0.8-0.9 秒，演奏→下一段试听约 0.9-1.0 秒。
5. **常规关解锁 70%→60%**：教学关卡片显示“教学完成”，不再留 D 0.0%。

小修：

6. tip 显示短句标签 `A / B / A'`，让变奏结构可见。
7. 修复 4-3-2-1 倒数数字不显示的旧 bug（`G.L.beat` → `G.chart.beat`）。

## 二、关卡改动表

| 关 | 名称 | BPM | 小节 | 短句 | 新结构 | 总音数 | 本轮变化 |
|---|---|---|---|---|---|---|---|
| e1 | 教学 · 听与敲 | 80 | 6 | 4 | A A B B A A | 24 | 不变；只加长换段留白 |
| e2 | 稳拍 | 92 | 8 | 5 | A A B C A A D E | 39 | 最后 1 小节改成 4 音收尾 |
| e3 | 连拍 | 100 | 10 | 6 | A A B C A A B' D C' E | 58 | C 换成“空半拍”型；最后 4 音收尾 |
| e4 | 切分变奏 | 108 | 12 | 7 | A A B C A A B' C' A A D E | 81 | C 换成“第二拍延后”型；最后 4 音收尾 |
| e5 | 月巴变奏 | 116 | 14 | 7 | A A B C A A B' C' A A B C' A E | 95 | 第 9-10 小节 A A 改为记忆回奏；最后 4 音收尾 |

- 短句数等于小节数：e2 8、e3 10、e4 12、e5 14；最后一个短句是 4 音收尾句。
- e4/e5 的 `phrase` 仍为 7，e3 为 6，e2 为 5；只有最后 1 小节允许少于 `phrase`。
- e5 记忆回奏：第 9-10 小节（0 基 short phrase 8、9）是 A A；玩家在第 1-2、5-6 小节已经听过两次 A。

## 三、谱面细胞与编排

```js
/* L1 不变 */
var P1A='x...x...x...x...', P1B='x...x...x.x.....';

/* L2：原 5 音细胞不变，加 4 音收尾 */
var P2A='x...x...x.x.x...', P2B='x...x.x...x...x.';
var P2C='x.x...x...x...x.', P2D='x...x...x...x.x.';
var P2E='x...x...x...x...';

/* L3：6 音；P3C 新“空半拍”，P3Cp 保留原 C 作为变奏 */
var P3A='x.x.x...x.x.x...', P3B='x.x.x.x.x.x.....';
var P3C='x...x.x...x.x.x.';             // 0,4,6,10,12,14
var P3Bp='x.x.x.x.x.....x.', P3D='x...x.x.x...x.x.';
var P3Cp='x.x.x.x...x.x...', P3E='x.x.x.x.x...x...';
var P3F='x...x...x...x...';

/* L4：7 音；P4C 新“第二拍延后”，P4Cp 保留原 C */
var P4A='x.x.x.x.x.x.x...', P4B='x.x.x.x...x.x.x.';
var P4C='x...x.x.x.x.x.x.';             // 0,4,6,8,10,12,14
var P4Bp='x.x.x...x.x.x.x.', P4Cp='x.x...x.x.x.x.x.';
var P4D='x.x.x.x.x.x...x.', P4F='x...x...x...x...';
```

编排：

```js
e2.tracks = [ P2A+P2A+P2B+P2C+P2A+P2A+P2D+P2E ];                             // 8 小节，39 音
e3.tracks = [ P3A+P3A+P3B+P3C+P3A+P3A+P3Bp+P3D+P3Cp+P3F ];                  // 10 小节，58 音
e4.tracks = [ P4A+P4A+P4B+P4C+P4A+P4A+P4Bp+P4Cp+P4A+P4A+P4D+P4F ];          // 12 小节，81 音
e5.tracks = [ P4A+P4A+P4B+P4C+P4A+P4A+P4Bp+P4Cp+P4A+P4A+P4B+P4Cp+P4A+P4F ]; // 14 小节，95 音
```

短句标签：

```js
e2.labels = ['A','A','B','C','A','A','D','E'];
e3.labels = ['A','A','B','C','A','A',"B'",'D',"C'",'E'];
e4.labels = ['A','A','B','C','A','A',"B'","C'",'A','A','D','E'];
e5.labels = ['A','A','B','C','A','A',"B'","C'",'A','A','B',"C'",'A','E'];
```

所有新细胞都从第 0 步起拍，保证短句 `t0` 落在小节起点，现有 `buildPhrases` 不重写。

## 四、引擎改动

### 4.1 最后一句延长到小节末

`buildPhrases` 生成后，在 `startLevel` 里把最后一句的 `t1` 向上取整到小节末：

```js
var barT=G.chart.stepDur*16;
var last=G.phrases[G.phrases.length-1];
last.t1=Math.min(G.chart.duration, Math.ceil((last.t1+0.0001)/barT)*barT);
```

最后 4 音收尾句演奏完后，走完该小节剩余留白再结算。对经典关也生效。

### 4.2 每关换段留白

新增 `L.seg`，`loop()` 的 `segLen` 和 `tailEnd` 改用当前关的留白：

```js
function segTail(mode){
  var s=G.L&&G.L.seg;
  if(mode==='demo') return s&&s.demoTail!=null?s.demoTail:SEG.demoTail;
  return s&&s.playTail!=null?s.playTail:SEG.playTail;
}
```

- e1：`seg:{demoTail:0.9, playTail:1.0}`
- e2：`seg:{demoTail:0.75, playTail:0.9}`
- e3-e5：不配，沿用全局 0.55/0.75。

### 4.3 L5 记忆回奏

- e5 增加 `recall:[8,9]`。
- `startSegment()` play 分支命中 recall：tip 改 `t('recall')`，第一个记忆句弹一次 `t('recallToast')`。
- `loop()` 的 play→下一段分支：下一句是 recall 时直接 `startSegment('play', nx, Math.max(1.2, lead))`，不播 demo。
- 记忆句仍走 play 判定/autoMiss/进度/结算；进度条会跳一小段，最后仍到 100%。

### 4.4 谱面自检

`validateLevels()` 对非经典关：

- 第 1..n-1 小节：音节数必须等于 `phrase`；
- 最后 1 小节：允许 `1..phrase` 个音节（本轮固定 4）；
- 仍然检查同刻双押、轨长、`phrase` 4–8。

### 4.5 解锁与教学卡

- `finishLevel`：`unlockOk=L.tutorial||acc>=60`。
- `help6` / `unlockNeed` 文案 70%→60%。
- 教学关不再写 `save.best.e1`；`rNew` 对教学关不显示。
- 选关卡：`L.tutorial` 且 `save.progress.normal>=2` 时 `lbest` 显示 `t('tutorialClear')`，否则“—”。
- 经典关、存档 schema、主存档不动。

### 4.6 短句标签与倒数数字

- `startSegment` 在 tip 里追加 `L.labels[pi]`：`试听 · 先听一遍  B'  7/12`；记忆句 `记忆 · 凭记忆敲这一段  A  9/14`。
- `loop()` 倒数数字 `G.L.beat` → `G.chart.beat`，恢复 4-3-2-1 数字显示。

## 五、代码落点

- 关卡数据：`月巴节拍/rhythm.html` 的 `P1A..P4F`、`TIERS/LEVELS`（约 643–694 行）。
- 段落调度：`SEG`（854）、`startLevel`（1128–1163）、`startSegment`（1165–1195）、`loop`（1727–1741）。
- 自检：`validateLevels`（730–768）。
- 结算/解锁：`finishLevel`（1272–1331）、`renderLevels`（1804–1828）。
- 文案：`TX` 四语言；新增 `recall`、`recallToast`、`tutorialClear`，更新 `help6`、`unlockNeed`。
- 不改：音频合成、判定窗口/权重、Canvas 绘制、bunny/ring/打击反馈、校准页、主存档读取、CSS 布局。

## 六、验收清单

- [ ] 谱面自检通过：e1–e5 音数 24/39/58/81/95；最后小节均为 4 音；短句数 6/8/10/12/14；无同刻双押；控制台无 `[rhythm]` 警告。
- [ ] e2–e5 最后一句是 4 音收尾，演奏完后走完该小节留白再结算。
- [ ] e5 第 9-10 小节不播试听、不冒演示月巴，tip 显示“记忆”，第一次记忆句有 toast；第 11 小节恢复正常试听；记忆句命中/漏掉正常计分。
- [ ] e1/e2 换段留白约 0.9/1.0、0.75/0.9 秒；教练提示和 tip 不被下一段提前盖掉。
- [ ] e2–e5 60% 解锁下一关；55% 仍锁定并提示 60%；e5 60% 完成提示“普通关卡 1-5 完成”。
- [ ] 教学关任意评级通关后 e2 解锁；选关卡显示“教学完成”，不再出现 D 0.0%；结果页仍显示本次评级。
- [ ] tip 的 A/B/A' 标签显示正常，手机 390×844 不溢出；记忆句 tip 不被截断。
- [ ] 4-3-2-1 倒数数字恢复显示；音频倒数不变。
- [ ] 四语言新增文案无缺失；`?lang=zh/en/ja/ko` 正常。
- [ ] 没有新增 CSS/粒子/动画；bunny、收缩圈、命中/漏掉反馈与现在一致。
- [ ] 旧存档、经典关成绩、困难页经典关不受影响；不写主存档。

## 七、风险与备选

| 风险 | 对策 |
|---|---|
| L5 记忆回奏偏难 | 删掉 `e5.recall` 即可回到普通听-敲 |
| 60% 解锁太松 | 改回 70% 只动 `finishLevel` 一个数字和两条文案 |
| 4 音收尾句让总音数变少、评级变松 | 收尾句仍计入总分；可改成 5-7 音收尾 |
| 最后一句延长到小节末影响经典关 | 若不想影响经典关，只在非 legacy 关执行 |
| 记忆句让进度条跳一段 | 本轮接受；以后可把 `totalSeg` 改成实际段落数 |
| 想要真正的首拍休止/弱起进入 | 需要把 `buildPhrases` 改成按小节切分；本轮不做 |
| A/B/A' 标签在小屏拥挤 | tip 已有省略号；真挤就只保留 A/B |

## 八、本轮不做

- 不改任何 CSS、粒子、扫描线、bunny/ring/打击动效。
- 不加长按、双押、滑键；普通页仍 1 轨。
- 不做“本句重听/重敲”、连续不重置时间轴、宽松判定开关、节拍器开关。
- 不写主存档、不改 `index.html`、不改图鉴/奖励。

## 九、实施顺序

1. 改 `rhythm.html`：新细胞/收尾句/`seg`/`recall`/`labels` + `validateLevels` + 最后一句 `t1` 延长。
2. 改 `loop`/`startSegment` 的留白与记忆回奏；改 `finishLevel`/`renderLevels` 的 60% 与教学卡。
3. 四语言文案 + 倒数数字小修。
4. 用 `?debug=1&nopause=1` 逐关验证：e5 记忆句、e2–e5 收尾、60%/55% 解锁、教学卡、手机 tip；确认没有新增动效。
5. 清理测试服务器/标签，不提交 git（除非另行要求）。
