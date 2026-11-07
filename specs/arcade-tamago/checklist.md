# 月巴蛋 M5 · 验收清单

> 对应 `spec.md` §5、§6；全部由 `%TEMP%\tamago-m5-test.js` 与既有回归脚本实测。

## 四语言

- [x] `I18N` zh/en/ja/ko 四份键表齐全，默认语言为 `zh`，中文与 M4 逐字一致
- [x] `TAUNTS` 四语言齐全，`TAUNT_OPEN…TAUNT_DEATH` 中文别名保留（M4 回归直接引用）
- [x] 标题 / hint / 按键小字 / aria / 主题名 / 状态页 / 相册 / 喂食菜单 / 访客气泡全部走 `t()`
- [x] 四语言最长台词气泡在 320 视口内不溢出、两行内（实测高度 30–41px，宽 253px）

## 低功耗

- [x] `body.low` 关闭抖屏、访客 Q 弹与过渡
- [x] 待机 tick 实测 500ms，`startAnim` 120ms，重症位移归零
- [x] 孵化低功耗不出现整屏反色帧；普通模式对照组仍会反色
- [x] 死亡 260ms 后全黑，实测首个全屏墨色帧 ≤300ms，且此前无黑帧
- [x] 启动 / roster / `visibilitychange` 均刷新低功耗状态

## 音效

- [x] WebAudio 合成，主增益 0.28，仅 `square/triangle`，并发 ≤2，`pagehide` close
- [x] `muted` 时零振荡器；首次手势解锁后正常发声（实测 1 个振荡器、并发 ≤2）
- [x] 按键/孵化/喂食/摸头/清洁/吃药/抢救/小游戏/访客/生病/死亡/毕业/开关灯均已接入

## 接入（不实装）

- [x] `index.html` 在 M5 期间未修改，`tamago` 卡片保持 `hidden:true`
- [x] iframe 自动追加 `?lang=`，roster 握手正常（父页 210 条名册到达子页）
- [x] 子页只发送 `yueba-tamago-ready`，无金币/番茄/图鉴/存档写回
- [x] 父页 `lang` / `muted` / `lowPower` 可实时下发到子页

## 验收

- [x] `node %TEMP%\tamago-m5-test.js`（端口 9351）ALL PASS
- [x] 回归 m3 / m4 / visitor-art / parent / noflash / art-pixel 全部 ALL PASS
- [x] 截图 `shots/m5-zh|en|ja|ko|low|veil.png` 已生成
