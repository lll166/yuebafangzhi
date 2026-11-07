# 任务清单

- [x] T1 `fight.html`：`.pbtn` 加 `display:flex;align-items:center;justify-content:center;padding:0;`，图标居中。
- [x] T2 `fight.html`：`#scrEnd` 增加 `<button class="btn ghost big" id="btnChange">`。
- [x] T3 `fight.html`：新增 `changeAfterLoss()`（`finishRun(false)` → `startRun()`）。
- [x] T4 `fight.html`：`renderEnd()` 写入 `btnChange` 文案；绑定点击事件。
- [x] T5 `fight.html`：四种语言 i18n 增加 `changeBtn`。
- [x] T6 验证：无头 Edge 截图核对图标居中；注入战败态核对按钮；点击后断言 `state=select`、`stage=1`。
- [x] T7 回归：通关换组、续关、放弃流程不受影响。
