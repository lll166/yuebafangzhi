# 后期不刷怪 · Tasks

## T1 新增远距淘汰函数（`survivor.html`）
- [x] 在 `trimEnemiesTo()` 之后新增 `ENEMY_CULL_DIST = 1500` 与 `cullFarEnemies()`
- [x] 保留非死亡、`boss`、`guard`；其余按 `dist2 > 1500²` 移除
- [x] 返回移除数量，便于调试

## T2 接入刷怪节拍（`survivor.html` 刷怪段）
- [x] 计时到点时先 `cullFarEnemies()`，再判断是否可刷
- [x] 仍满员时 `G.spawnT = 0.20`，避免计时器负值堆积
- [x] 刷怪间隔公式与 `spawnEnemy()` 满员拦截保持不变

## T3 本地验证
- [x] 注入 140 个远处普通怪 → tick 后总数 140 → 6，近处恢复刷怪
- [x] 确认修复前该用例会卡在 140（静态确认：原代码无任何超距移除）

## T4 回归
- [x] 宝箱守卫不被裁（4 个守卫距玩家 >1500 仍存活），宝箱保持未开启
- [x] Boss 不被裁，`bossCalm = 1.6` 逻辑未改
- [x] 省电模式（maxEnemies=100）：100 上限 → tick 后 25，近处恢复刷怪
- [x] 主脚本 Node 语法检查通过

## T5 改为雷达圈外回收（用户新口径）
- [x] 以 `MINI_RANGE = 560` 为界，圈外普通怪每帧删除
- [x] 删除后在 `0.86–0.98 × MINI_RANGE` 处按原种类重生
- [x] Boss / 宝箱守卫不回收；宝箱仍不会被自动开启
- [x] 原地压缩数组，避免每帧 filter 分配
- [x] 验证：140 个雷达外怪 → 全部回到雷达圈内

## T6 省电模式不影响怪的数量
- [x] `applyPowerMode()` 不再改写 `PERF.maxEnemies`（始终 140）
- [x] 省电模式仍只降 dprCap / shadows / maxParts / fps / step
- [x] 验证：普通与省电下均可刷到 140、第 141 只被拦截

## 范围
- 只改 `survivor.html`
- 不改数值上限、敌人 AI、宝箱规则、存档结构
