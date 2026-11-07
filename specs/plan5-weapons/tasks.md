# Plan 5 任务清单

## 阶段 A：数据层

- [x] A1. `WEAPONS` 追加 10 把基础武器（`gun/grapes/flame/zap/javelin/melon/mine/bomb/beam/leaf`，`max:5, newW:12`）
- [x] A2. `WEAPONS` 追加 5 把联合武器（`ustorm/uflame/uroller/ufarm/ufort`，`max:1, union:true`）
- [x] A3. 新增 `UNIONS` 配方数组与 `unionDef / unionOf / canUnion / doUnion`
- [x] A4. `pickChoices()` 接入联合卡（权重 40）与新武器过滤规则
- [x] A5. `renderChoices()` / `chooseUpgrade()` 增加 `union` 分支
- [x] A6. `renderWeaponBar()` / `buildSummaryHTML()` 联合武器显示 `★`

## 阶段 B：状态与战斗

- [x] B1. `G` 增加 `zaps/melons/mines/pineapples/beams`，`resetRun()` 清空
- [x] B2. `newPlayer().wcd` 补 15 个键
- [x] B3. 新增共享工具：`nearestEnemyTo/aimAngle/spawnShot/segDist2/angDiff/aoeHit/coneHit`
- [x] B4. 实现 10 把基础武器战斗逻辑
- [x] B5. 实现 5 把联合武器战斗逻辑
- [x] B6. `drawBullet()` 支持 `b.col`

## 阶段 C：表现与文案

- [x] C1. `drawWeapons()` 增加闪电/光束/西瓜/地雷/菠萝/喷火/叶片绘制（含 `PERF.low` 降级）
- [x] C2. zh 文案 31 条
- [x] C3. en 文案 31 条
- [x] C4. ja 文案 31 条
- [x] C5. ko 文案 31 条

## 阶段 D：验证

- [x] D1. 抽取 `<script>` 后 `node --check` 通过
- [x] D2. `#debugall` 下 10 把武器各自升 Lv5 + `tick(6)` 无报错
- [x] D3. 5 组联合合成成功且 `slots().free` +1
- [x] D4. 合成后能继续拾取新武器并占用空槽
- [x] D5. 子弹数量 ≤240、无实体泄漏
- [x] D6. 四语言无缺失键
