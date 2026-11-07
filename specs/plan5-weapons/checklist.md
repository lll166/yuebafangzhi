# Plan 5 验收清单

## 数据与规则

- [x] 10 把新基础副武器均已加入 `WEAPONS`，`max` 为 5，且不出现在“联合武器”分支
- [x] 5 把联合武器已加入 `WEAPONS`，`max:1`、`union:true`，不会进入新武器卡池，也不会出现升级卡
- [x] `UNIONS` 五组配方与规格一致：gun+grapes / flame+zap / javelin+melon / mine+bomb / beam+leaf
- [x] `canUnion` 仅在双方 Lv5 且尚未拥有联合武器时返回真
- [x] `doUnion` 删除两把基础武器、写入 1 把联合武器，槽位占用净减 1

## 卡池与 UI

- [x] 升级池包含联合卡（权重 40），仅在条件满足时出现
- [x] 已拥有某联合武器后，其两把基础武器不再作为新武器卡出现
- [x] 联合卡正确渲染名称、描述、图标与“联合进化”标签（无 `undefined`）
- [x] 武器栏中联合武器显示 `★` 并带 `ev` 高亮
- [x] 结算构筑面板中联合武器显示 `★`

## 战斗与表现

- [x] 10 把基础武器在 Lv5 下运行 6–8 秒无异常，且能产生伤害与实体
- [x] 5 把联合武器均能实战运行（tick 3 秒）且无异常
- [x] 喷火锥形、闪电、光束、西瓜、地雷、菠萝、叶片均有绘制路径
- [x] `drawBullet()` 支持 `b.col` 自定义颜色
- [x] `PERF.low` 时绘制退回简化样式

## 文案

- [x] zh / en / ja / ko 四语言均包含 15 把武器的名称、描述与 `cardUnion`
- [x] 四语言无缺失键（脚本静态检查为空）

## 运行时验证（headless Edge + `#debugall`）

- [x] `node --check` 语法检查通过
- [x] 5 组联合合成后 `slots().free` 均比合成前 +1（3 → 4）
- [x] 合成后调用 `weapon()` 能占用空出的槽位（free 4 → 3，新武器 Lv1）
- [x] 联合卡实际出现在升级界面（`#upCards` 含“联合进化”）
- [x] 混合运行 `ustorm + uflame` 后状态仍为 playing，无报错
- [x] `counts().bullets` 全程远低于 240，无实体泄漏
- [x] 页面 `window error` 与 CDP `exceptionThrown` 均为空
