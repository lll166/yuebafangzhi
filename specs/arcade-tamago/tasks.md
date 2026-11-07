# 月巴蛋 M5 · 任务拆分

> 依据：`specs/arcade-tamago/spec.md`、`specs/arcade-tamago/plan.md`
> 范围：仅 `tamago.html`；`index.html` 零改动

## T1 · i18n 基础设施

- [x] T1.1 在 `SAMPLES` 后插入 `I18N`（zh/en/ja/ko 全键表，zh 逐字沿用 M4 文案）
- [x] T1.2 插入 `normLang()` / `t()` / `stageLabel()` / `sampleName()`，删除 `STAGE_LABEL`
- [x] T1.3 `LANG` 从 `?lang=` 初始化，`LOW` 默认取 `prefers-reduced-motion`
- [x] T1.4 新增 `localizeEggs()`，roster 消息里规范化 `LANG` 并刷新 DOM/色板/名字/idle

## T2 · 台词与 UI 替换

- [x] T2.1 新建 `TAUNTS`（open 10 / knock 3 / ignore 3 / leave 3 / tomato / sick / crit / death，四语言）
- [x] T2.2 保留 `TAUNT_OPEN…TAUNT_DEATH` 中文别名，保证 M4 测试可用
- [x] T2.3 访客流程改用 `tauntOne()/tauntList()`，宠物短回应改 `pet_*` 键
- [x] T2.4 `FEED` 去 `label`，显示改 `feed_*`；`THEMES.name` 显示改 `theme_*`
- [x] T2.5 替换成长/离线/行动/医疗/归档/死因/小游戏/状态页/相册/孵化/结束卡全部文案
- [x] T2.6 `fmtGap` / `fmtAge` 接 `unit_*`；`applyLangDom()` 处理 title/aria/按键小字/hint
- [x] T2.7 `applyTheme`、`buildSwatches` 使用当前语言主题名

## T3 · 低功耗

- [x] T3.1 `body.low` CSS：关抖屏、访客动画、过渡
- [x] T3.2 `applyLowPower()` 接入启动/roster/visibilitychange
- [x] T3.3 蛋选择框/汗滴停止闪烁；重症位移归零；孵化跳过反色闪
- [x] T3.4 死亡低功耗 260ms 直接黑屏；`startAnim` 间隔 120ms；`screenShake` 直接返回

## T4 · 音效

- [x] T4.1 实现 `audioReady()/note()/sfx()`，主增益 0.28，`square/triangle`，并发 ≤2，卸载 close
- [x] T4.2 首次手势解锁；`MUTED` 时静默
- [x] T4.3 按键/孵化/喂食/摸头/清洁/吃药/抢救/小游戏/访客/生病/死亡/毕业/开关灯接入

## T5 · 接入核对（不实装）

- [x] T5.1 确认 `index.html` 无改动、卡片仍 `hidden:true`
- [x] T5.2 确认 iframe `?lang=` 与 roster 握手在 M5 改动后仍工作
- [x] T5.3 确认子页无任何主存档写回

## T6 · 验收

- [x] T6.1 编写并运行 `%TEMP%\tamago-m5-test.js`（端口 9351）
- [x] T6.2 回归 m3(9341)/m4(9342)/visitor-art(9343)/parent(9345)/noflash(9347)/art-pixel(9350) 全 PASS
- [x] T6.3 截图 `shots/m5-*.png` 并汇报
