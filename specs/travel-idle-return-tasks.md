# 旅行的月巴放置不归来 — 执行任务

对应规格：`travel-idle-return-spec.md`。全部改动只涉及 `index.html`。

- [ ] T1 修改 `tvTripAdvance()`（L12643-L12661）：加入 `wall`、`syncAt` 未来钳制、`gap` 计算，并在页内路径用 `dt=Math.max(perfDt,gap)`；`_netCalibDone` 只约束首次/读档的 gap 分支。
- [ ] T2 确认 F2 已随 T1 生效：`syncAt` 为未来时间时重置为 `now()`，不新增其它字段。
- [ ] T3 修改 `offlineSettle()`（L14576）：函数体最前面调用 `travelSettleIf();`。
- [ ] T4 修改 `tvFresh()` 迁移条件（L12730）：`if(t.frog.status==='away'&&_netCalibDone)` → `if(t.frog.status==='away')`。
- [ ] T5 静态自检：搜索确认无残留 `if(!_offlineGapOK)gap=0;` 之外的旧逻辑冲突；`tvTripAdvance` 括号/分号平衡；页面加载无控制台报错。
- [ ] T6 按规格「七、验收步骤」逐条验证并记录结果（后台冻结、时钟回拨、旧档迁移、前拨 1 小时回归）。
