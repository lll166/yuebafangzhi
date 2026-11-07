# 月巴食堂 M3 · 验证清单

> 上游：[spec.md](file:///d:/小工具/月巴放置/specs/arcade-diner/spec.md) · [tasks.md](file:///d:/小工具/月巴放置/specs/arcade-diner/tasks.md)

- [x] `TABLES / SEATS` 为可变数组，`syncLayout()` 在 `init / clearSave / nextDay / 扩店` 均被调用
- [x] `drawStool(g,x,y)` 支持纵坐标，`buildBg()` 按 `TABLES/SEATS` 遍历绘制，Lv1 视觉不变
- [x] 准备页 `#vPrep` 已注册点击委托，`menuToggle / research / hire / train / expand / decor` 六类按钮均可用
- [x] 菜单操作遵守「至少保留 1 道、槽位未满、菜已解锁」三条约束
- [x] 模拟加成生效：暖灯 +2s 耐心、木招牌稀有客人 ×1.1、桌布 +2 满意、客单价 ×1.05（招牌 / 生活 Lv4 可叠乘）、常客小费 ×1.1
- [x] 上菜成功累加员工经验与 `BIZ.sales` 单品销量
- [x] `settleRun()` 按序处理：自动解锁（用当日开始星级）、净利、生活升级与场景刷新、每日目标发奖、装修口碑 +1、星级提示、成就
- [x] `nextDay()` 重置每日目标并重新 `syncLayout()`
- [x] `drawTomatoHome()` 五级壁龛随生活等级变化，且 `buildBg()` 不抛错
- [x] `mergeSave()` 按 `SHOP_LV` 校正容量，旧档/脏档可正常读入
- [x] 语法检查通过（1 个内联脚本，`new vm.Script` 无报错）
- [x] jsdom 冒烟：Lv1→Lv2/Lv3 扩店扣费与座位数正确；雇员 / 菜单重开后保持；研发与上架可用
- [x] 星级门槛 20/40/60/80/95 判定正确，未达门槛无法扩店/研发
- [x] 番茄生活 Lv5（累计 15000）场景绘制正常，加成生效
- [x] 完整一天可结算并进入下一天，控制台无报错；Lv1 与 Lv5 满座各跑 3200 步无异常

## M4 · 验证

- [x] 6 套主题均带解锁条件；锁定主题不可切换，`applyTheme()` 返回 `false` 并提示条件
- [x] 生活 Lv3/Lv4、单日连击 10、3★、5★ 达成后 `themeReqMet()` 为真；结算时首次解锁会播报
- [x] 光柱 / 尘埃 / 视差云 / 蒸汽仅在非低功耗绘制；低功耗下 `confetti()` 无输出、震屏关闭
- [x] 立绘像素化跨域失败时回退 `drawBanny()`，不抛错；主题切换清空立绘缓存
- [x] Web Audio 在无 `AudioContext` 环境（jsdom）调用全部音效不抛错；首次 `pointerdown` 解锁
- [x] 升星触发 `confetti(18)` 与升星音效
- [x] 首日引导卡三步可走完（选菜 → 找人 → 开门），可跳过；开门后引导完成并提示打气
- [x] 首日首名员工免费且不扣账本；`S.gift` 置位后第二人恢复收费
- [x] ≤430px 顶栏两行、触控目标 40px，引导卡不遮挡底部按钮
- [x] 键盘 Space / Esc 可暂停与继续；音效、低功耗按钮带 `aria-pressed`
- [x] 四语言 `I18N_RAW` 187 键 × 4 均非空，无缺键
- [x] 语法检查通过（1 个内联脚本 92220 字符）
- [x] jsdom M4 冒烟 31 项全通过；M3 冒烟与完整一天回归通过
