# Tasks · C-1 + 11 森林四图

> 依据 `spec-c1-forest.md`。每完成一项即更新 TodoWrite；c6 验证不通过则回到对应任务修复。

## c1 · C-1 关卡数据模型

- [x] 1. `STAGES` 追加 n=11–14，字段 `key/layer/sub/map/bossName/bossColor/name/dur/bossHp/hpMul/spdMul/spawnMul/bg/edge`。
- [x] 2. 新增 `stageKeyOf(n)`；改写 `bestKey`、`stageBestOfIn`、`stageName`。
- [x] 3. `renderStageList` 使用 `st.key` 显示、插入 `.stage-grp` 分组；CSS 追加 `.stage-grp`。
- [x] 4. T 表四语言追加 `layerTag / map_forest`。

## c2 · 11 森林四图

- [x] 1. `STAGE_EVENTS` 追加 11–14。
- [x] 2. `initHazards` 增加 11 层分支（fog / vine / sand / meteor / beam）。
- [x] 3. `updateHazards` 增加 `fog / vine / sand` 分支；`p.rootT` 减速与 `updatePlayer` 读取。
- [x] 4. `drawHazards` 增加 `fog / vine / sand` 绘制；`meteor.pine`、`beam.moon` 换色。
- [x] 5. `ENEMY_DEF` + `ART_POOL` 追加 squirrel / petal / statue / husk；`pickKind` 增加 11–14 森林阵容。
- [x] 6. Boss：`e.color = st.bossColor`、HUD 名称、11.4 四阶段条件。

## c3 · 森林武器

- [x] 1. `WEAPONS` 追加 pinecone；`wpEvoId` 统一映射并替换 3 处硬编码。
- [x] 2. `G.pines / G.fireZones` 初始化与 `resetRun` 清空（松果上限 40、萤火带上限 16）。
- [x] 3. `updateWeapons` 追加投掷、爆炸、萤火带逻辑（`explodePine`）。
- [x] 4. `drawWeapons` 追加松果与萤火带绘制。
- [x] 5. T 表追加 `wp_pinecone / wp_pinecone_d`。

## c4 · 森林遗物

- [x] 1. `RELICS` 追加 4 件（`map:11`）。
- [x] 2. `applyRelicEffect` 追加 4 个 case；链击乘区 `p.chainMul`、护盾冷却 `p.shieldCdMul`、萤火灯 20s 回复接入。
- [x] 3. `rollRelic` / `pickChoices` 增加 `r.map && stage < r.map` 过滤。
- [x] 4. `checkForestSet` + `setForest` toast 与 i18n。

## c5 · 成就与进化文案

- [x] 1. `EVOLVES` 追加 `senluo`；T 表追加 `evo_senluo / evo_senluo_d`。
- [x] 2. `index.html` ACHS 插入 `sv8`；I18N 追加 `ach_sv8 / ach_sv8_desc`。

## c6 · 验证

- [x] 1. 抽取内联脚本 `node --check`：`survivor.html` 1 段、`index.html` 1 段，均 0 错误。
- [x] 2. DOM 桩冒烟：关卡键 / 解锁链 / 11.1–11.4 机关数量 / 森林敌人阵容 / Boss 颜色与名称 / 套装 / 森罗万象 / 松果投掷，全部 PASS。
- [x] 3. 输出浏览器手测清单（见最终回复）。
