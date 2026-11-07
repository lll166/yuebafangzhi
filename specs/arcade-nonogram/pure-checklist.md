# 「月巴数织」无图数织（普通数织分支） · Checklist

> 依据：[pure-spec.md](file:///d:/小工具/月巴放置/specs/arcade-nonogram/pure-spec.md) / [pure-tasks.md](file:///d:/小工具/月巴放置/specs/arcade-nonogram/pure-tasks.md)

## 生成侧
- [x] `tools/nonogram/gen_pure.py` 存在，`import gen` 复用解算器，无网络依赖
- [x] `python tools/nonogram/gen_pure.py` 退出码 0，末行 `puzzles=100 uniq=100 logic=100`
- [x] 100 题：bits 长度 = sz²、填充率 30%~60%、最长连段 ≤5、纯逻辑可解、唯一解
- [x] 题面无重复（线索指纹去重生效；node 复验 100 条位图互不相同）
- [x] `tools/nonogram/np2_data.js` 输出，`const NP2=[…]`，100 项（18584 B）
- [x] `tools/nonogram/qc_pure.png` 输出，人眼过一遍无废图（1800×2000，10×10 接触表）

## 页面侧
- [x] `nonogram.html` 新增 `<script>` 块注入 `NP2`（100 项，带生成注释）
- [x] 第三页签 `🔓 无图` 可切换，`#panePure` 显示/隐藏正确
- [x] 无图页顶部显示介绍句「这里虽然没有被关押的月巴，但可以练习一下开锁技巧。」
- [x] 无图页内有二级页签 `#pureTabs`，含「普通数织」按钮
- [x] 100 张卡片按 10×10 / 12×12 / 15×15 三组渲染；未解锁孔，已解单色缩略图
- [x] 无图模式无任何图片请求（`#pcatalog img` = 0；http.server 日志无图片 GET）
- [x] `S.pure` 存档字段落地，`solved` 不含 `np2_*` 污染主 `solved`
- [x] 续存键 `yueba-nonogram-live-pure-v1` 生效，通关后清除
- [x] 无图通关演出无立绘，文案「咔哒，锁开了」；结算显示单色缩略图 + `No.00X`
- [x] 无图通关不触发任何成就（实测 `ach` 为空对象）
- [x] 统计口径随 `MODE` 切换（无图 n/100，经典 n/110）
- [x] 四语言 8 键齐全，`?lang=en/ja/ko` 无 `undefined`、无中文残留
- [x] `?selftest=1` 通过（含 NP2 断言），Console `自检通过 []`，无 errs
- [x] 原 110 题无回归（图鉴 110 卡、可进棋盘、`#pTitle` = `解救 #1 · R1 · 10×10`、立绘/成就/结算/续存）
- [x] 低功耗 / prefers-reduced-motion 可用（实测结算仍出现、文案正确、无报错）
- [~] 375px 竖屏：**部分验证** —— 自动化工具无法改视口（始终 994px），994px 下 `#pcatalog` 无溢出；窄屏由既有 `.cards` 媒体查询（<560px 3 列、`1fr`）保证，二级页签只有 1 个按钮

## 实测中发现并修复的缺陷
- [x] `NP2` 题目对象缺 `pure:true` 标记 → `revealPuzzle` 抛 `TypeError: Cannot read properties of undefined (reading 'charAt')`，结算弹窗永不出现。已在 `init()` 的 `NP2.forEach` 中补 `p.pure=true;`，复验通过（代替方案：给每条数据加字段会污染 spec 约定的数据结构）