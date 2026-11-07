# 「月巴数织」无图数织（普通数织分支） · Tasks

> 依据：[pure-spec.md](file:///d:/小工具/月巴放置/specs/arcade-nonogram/pure-spec.md)
> 交付物：[nonogram.html](file:///d:/小工具/月巴放置/nonogram.html)（改）+ `tools/nonogram/gen_pure.py`、`tools/nonogram/np2_data.js`、`tools/nonogram/qc_pure.png`（新增）
> 状态：**已实现并验收**（仅 375px 真实视口因自动化工具限制未能直接验证，见 T11.3）

---

## T1 生成器 `tools/nonogram/gen_pure.py`（阻塞后续一切）
- [x] 1.1 `import gen`，复用 `fill_rate/clean_mask/patterns/logic_solve/count_solutions/split_runs/line_metrics/row_clue`
- [x] 1.2 实现 3.3 的五个候选形状族（blob / mirror_x / mirror_xy / ring / core2）+ 判废条件
- [x] 1.3 闸门流水线：`clean_mask → fill 30~60% → split_runs(5) → fill 复检 → line_metrics 非空 → maxrun≤5 → count_solutions==1 → 线索指纹去重`
- [x] 1.4 固定 `SEED=20261027`；每个尺寸尝试上限 200000，超限 `sys.exit(1)`
- [x] 1.5 输出 `np2_data.js`（`const NP2=[…];`）、`qc_pure.png`（100 格接触表）、`qc_pure/NN_np2_00X.png`、逐题控制台报告
- [x] 1.6 跑通 `python tools/nonogram/gen_pure.py`，退出码 0，末行 `puzzles=100 uniq=100 logic=100`
- [x] **验收**：控制台报告无 `FAIL`；100 题各闸门全过（实际 5.1s 跑完：10×10 40 题 798 次尝试 / 12×12 30 题 725 次 / 15×15 30 题 519 次；15×15 密度上限由 0.62 降至 0.55，闸门未放宽）

## T2 人眼 QC
- [x] 2.1 看 `tools/nonogram/qc_pure.png`：排除空洞/太糊/雷同/不像题面的图
- [x] 2.2 若有不满意题：调密度区间或形状族权重后重跑 T1.6，直至整张表过关（无需调整）
- [x] **验收**：100 张缩略图逐格过一遍，无"废图"

## T3 数据入库
- [x] 3.1 把 `np2_data.js` 内容作为新 `<script>` 块插到 [nonogram.html](file:///d:/小工具/月巴放置/nonogram.html) 原题库 `</script>` 之后（附「由 tools/nonogram/gen_pure.py 生成」注释）
- [x] **验收**：`NP2.length === 100`、`bits` 长度 100% 合法、100 条位图互不相同（node 实测）

## T4 页签骨架（E1 / E2 / E21）
- [x] 4.1 E1 CSS：`.tabs.sub`、`.hero.pure`、`.lockhole`、`.pnum`、`.psz`、`.pmini`、`.rvcap` + 低功耗豁免；`#panePure.off` 并入原选择器
- [x] 4.2 E2 HTML：`#tabPure` 页签 + `#panePure`（介绍句 / `#pureTabs` 分支页签 / `#pureHero` / `#pchips` / `#pcatalog`）
- [x] 4.3 E21 `applyStaticText` 追加 `tabPure`/`pureIntroT`/`subTabNormal` 三行
- [x] **验收**：三页签可切换；无图页显示介绍句与「普通数织」；无 JS 报错（浏览器实测通过）

## T5 四语文案（E4）
- [x] 5.1 zh/en/ja/ko 各补 8 个键：`pureTab/pureIntro/pureBranch1/pureSolved/pureProgress/pureRand/pureMeta/pureWin`
- [x] **验收**：`?lang=en|ja|ko` 无 `undefined`、无中文残留；切语言后介绍句与二级页签文案正确（浏览器实测：en → "No caged Bannies here…"/"Standard"；ja → "ここに囚われたバニー…"/"ノーマル"；ko → "여기 갇힌 버니는 없지만…"/"일반"）

## T6 存档与续存（E5 / E6 / E7）
- [x] 6.1 `defSave` 加 `pure:{solved:{},plays:0,totalMs:0,lastId:''}`
- [x] 6.2 `loadSave` 解析 `S.pure`（缺字段回落，坏数据不抛）
- [x] 6.3 `saveGame` 写出 `pure:S.pure`
- [x] 6.4 定义 `LIVE_PURE_KEY`、`MODE`、`liveKey()`、`curPool()`、`curSolved()`；`saveLive/clearLive` 改用 `liveKey()`
- [x] 6.5 `restoreLive` 拆为 `restoreLive()+restoreLiveOf(m)`，先经典后无图
- [x] **验收**：无图通关后 `yueba-nonogram-live-pure-v1` 被清除（实测 absent）；经典题续存不受影响

## T7 引擎模式化（E8 / E9 / E10 / E11 / E13 / E14）
- [x] 7.1 `puzzleUnlocked` 对 `p.pure` 直接放行
- [x] 7.2 `starsFor` 按 `p.pure` 用 `STD_PURE={10:6min,12:10min,15:15min}`
- [x] 7.3 新增 `drawPixMono()`、`pad3()`
- [x] 7.4 `renderStats` 按 `MODE` 切口径（`/100`、`已开锁`、`S.pure.totalMs`）
- [x] 7.5 `setTab` 内切 `MODE` 并 `refreshCatalog`；`refreshCatalog` 按 `MODE` 分派渲染
- [x] 7.6 `startPuzzle` 置 `MODE`、分流 `lastId`、分流 `pTitle`
- [x] **验收**：实测无图 `已解救 0/100`（后为 1/100）、经典 `已解救 1/110`，两套统计互不串；`?selftest=1` 通过

## T8 无图目录与交互（E12 / E20 / E22）
- [x] 8.1 `renderPureChips()` / `renderPureHero()` / `renderPureCatalog()`（按尺寸分组、未解锁孔、已解单色缩略图、角标编号与尺寸）
- [x] 8.2 `init()` 绑定 `#pchips`（筛选）、`#pcatalog`（进题/看成绩）、`#pureHero`（🎲 随机一题）
- [x] 8.3 `NP2.forEach(...)` + `p.pure=true`；`__NP_TEST` 暴露 `NP2/drawPixMono/MODE`
- [x] **验收**：实测 `#pcatalog` 100 张卡片（10×10 40 / 12×12 30 / 15×15 30 三组）；未解显示锁孔、通关后变缩略图；`#pcatalog img` 数量为 **0**（Network 无图片请求）

## T9 通关流程（E15 / E16 / E17 / E18 / E19）
- [x] 9.1 `revealPuzzle`：纯逻辑题不插 `.rvart`，改 `.rvcap` = `pureWin`，格子底色单色
- [x] 9.2 `finish`：读写 `curSolved()`，计数分流 `S.pure`，`if(!p.pure)` 才 `unlockAchievements`
- [x] 9.3 `showResult`：纯逻辑题 artframe 内用 `canvas[data-np2]` 缩略图；名称 `No.00X`；meta 用 `pureMeta`；标题用 `pureWin`
- [x] 9.4 `goNextUnsolved` 按 pool 分流
- [x] 9.5 `backToCatalog` 用 `setTab` 同步页签与分支
- [x] **验收**：实测通关演出 `#reveal img` = **0**、文案含「咔哒，锁开了」；结算 `#result img` = 0、`#result canvas` = 1、标题「咔哒，锁开了」、名称 `No.001`
- [x] **修复**：初次实测发现 `NP2` 缺 `pure:true` 标记导致 `revealPuzzle` 抛 `TypeError: ... reading 'charAt'`；已在 `init()` 的 `NP2.forEach` 中补 `p.pure=true`，复验通过

## T10 自检断言（E23）
- [x] 10.1 补 `NP2` 数量 / bits 长度 / 线索非空 / 官方解满足 / **纯逻辑可推完（无 guess）**
- [x] 10.2 保留原 `NP.length===110`、`aliasCount===111` 断言
- [x] **验收**：`?selftest=1` → Console `[nonogram selftest] 自检通过 []`，toast「自检通过」，无 errs

## T11 实机验收（对照 spec 第五节 12 条）
- [x] 11.1 起本地 `http.server`（127.0.0.1:8765），浏览器逐条跑场景
- [x] 11.2 重点：原 110 题无回归（解锁、立绘、成就、结算、续存）—— 实测图鉴 110 张卡、可进入经典题、`#pTitle` = `解救 #1 · R1 · 10×10`
- [~] 11.3 重点：375px 竖屏 —— **部分验证**：自动化工具无法改视口（`resizeTo` 无效，始终 994px）；在 994px 下 `#pcatalog` 无溢出。窄屏规则由既有 `.cards` 媒体查询保证（<560px 为 3 列、卡片宽度 `1fr`），二级页签只有 1 个按钮，风险低。低功耗 / `prefers-reduced-motion`：实测通过（结算仍出现、文案正确、无报错）；四语言：实测通过
- [x] **验收**：12 条中 11 条全绿，第 10 条（375px）为工具限制下的部分验证

---

## 验收实测汇总（浏览器 + node）

| 场景 | 结果 |
|---|---|
| `?selftest=1` | 通过，无 errs |
| 无图页签 / 介绍句 / 二级页签 / 100 张卡 | 通过 |
| 无图模式图片请求 | 0（`#pcatalog img` = 0） |
| 通关演出 / 结算（无立绘、单色缩略图、No.00X） | 通过 |
| 无图中途/事后续存键 | `live-pure` 通关后清除 |
| 统计口径隔离（/100 vs /110） | 通过 |
| 经典 110 题回归 | 通过 |
| 无图通关不触发成就 | 通过（`ach` 为空对象） |
| 存档隔离 | 通过（`solved` 无 `np2_*`） |
| 四语言 | 通过 |
| 低功耗 / 减少动效 | 通过 |
| 375px | 部分验证（工具无法改视口） |

## 依赖关系
```
T1 ─→ T2 ─→ T3 ─→ T4 ─→ T5 ─→ T6 ─→ T7 ─→ T8 ─→ T9 ─→ T10 ─→ T11
```
## 需要批准的两个决定（均已按批准执行）
1. **去掉 `lv` 字段**（100 题全属「普通数织」，档位由二级页签 + `sz` 分组表达）。
2. **无图模式不触发任何成就**（含原 7 项 `np_*`）。