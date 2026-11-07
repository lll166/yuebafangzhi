# 月巴蛋测试说明

## 仓库内可直接运行

```bash
node specs/arcade-tamago/tests/p0-static-check.js
```

源码级守卫，不启动浏览器，覆盖：

- 访客池：庭院非空时不得回退到全名册
- 存档：坏档写入 `yueba-tamago-v1-broken`，`v1 → v2` 迁移
- 照顾埋点：`careCount` 校验与至少 5 个调用点
- 番茄库存：四语言键 + 仅在访客停留时显示
- 主存档只读 + 卡片仍 `hidden:true`
- 上线路径告警：卡片写的是根目录 `tamago.html`，真实文件在子目录

## P1 守卫

```bash
node specs/arcade-tamago/tests/p1-static-check.js
```

覆盖：

- 氛围粒子：爱心/小花/星星，`drawFace` 不含表情状态
- 成体形态：圆润/精瘦/倔强由照顾质量结算
- 过喂：10 分钟第 4 次收益减半、心情 -3
- 命名：性格阈值 40/50/60，详情页入口，昵称全链路
- 详情页：5 行数据 + 提示 + 状态 → 详情 → 相册导航

P1 运行时已实测：高心情冒粒子、低心情与低功耗不冒；三种成体形态；过喂第 4 次 -3；命名 59 锁定/60 解锁；昵称确认；统计累加与页面导航全部通过。

## P2 守卫

```bash
node specs/arcade-tamago/tests/p2-static-check.js
```

覆盖：

- 常客：`visitorSeen` 累计、5 次换语气、10 次礼物
- 事件：连续无视 3 次偷番茄
- 离线：1/3/7 天分层 + `fmtGap` 天/小时
- 梦境：睡眠时爱心/小花/星星轮换
- 记录页：相册 B → 来访记录，前 4 位 + 相对时间

P2 运行时已实测：第 5 次常客、第 10 次礼物、3 次无视后偷番茄、来访记录页、三层离线台词、睡眠梦全部通过。

## P3 守卫

```bash
node specs/arcade-tamago/tests/p3-static-check.js
```

覆盖：

- 毕业回写：子页发 `yueba-tamago-graduate`，父页 `min(300,100+bond×2)` 金币
- 去重：`S.tamago.graduated` + 稳定 id
- 回执：父页回 `yueba-tamago-graduate-ack`，毕业卡显示「主游戏 +N 金币」
- 番茄钟：focus 开始/暂停/继续/停止/休息消息，子页心情不降、访客不打扰、roster 恢复

P3 运行时已实测：毕业 220 金币到账、重复消息不发第二次、毕业卡回执；专注开始/结束、访客阻止、1 小时心情不降、重开 iframe 恢复 focus。

## P4 守卫

```bash
node specs/arcade-tamago/tests/p4-static-check.js
```

覆盖：

- 新手提示：`tutorialDone`、首屏三行提示、孵化即收掉
- 触觉：敲玻璃/抢救/死亡
- 性能：`document.hidden` 时 idle/visit 停画
- 无障碍：`S` 状态页、按键/色板 focus-visible、canvas aria-label 跟随状态
- 独立打开：`M` 静音、导出/导入/重置（iframe 内隐藏）

P4 运行时已实测：首屏显示三行提示，长按孵化仍正常，提示在孵化开始后消失；喂食/摸头/重载持久化不受影响；独立打开时底部工具可见，iframe 内隐藏。

## 运行时回归（本地临时目录）

完整 M1–M5 运行时脚本仍从 `%TEMP%` 加载；共享 Edge/CDP 启动器在 `specs/arcade-tamago/tests/lib/edge-cdp.js`。运行前需要：

1. Windows + Edge（默认 `C:\Program Files (x86)\Microsoft\Edge\Application\msedge.exe`）
2. Node 22+（内置 `fetch` / `WebSocket`）
3. 把脚本里的 `TAMAGO` 指向真实文件：
   `file:///D:/.../电子宠物游戏-tamago/tamago.html`
4. 共享 profile 被其他测试占用时，改用一次性 profile：
   `launchEdge({port,fresh:true})`

已实测通过的套件：

| 脚本 | 端口 | 覆盖 |
| --- | --- | --- |
| `tamago-m1m2-smoke.js` | 9344 | 三蛋、孵化、喂食、摸头、存读档（P4 起首屏会先显示三行提示） |
| `tamago-m3-test.js` | 9341 | 成长、生病、抢救、死亡、毕业、相册（P1 起状态页 A 先进详情，测试需按两次 A 到相册） |
| `tamago-m4-test.js` | 9342 | 访客时序、敲玻璃、无视、番茄、访客池（P2 起相册 B 进来访记录） |
| `tamago-m5-test.js` | 9351 | 四语言、低功耗、音效、父页握手（父页 iframe 测试需同目录临时页，见下） |
| `tamago-visitor-art-test.js` | 9343 | 立绘 DOM、走/弹/跳、SVG 兜底 |
| `tamago-art-pixel-test.js` | 9350 | 立绘单色像素化 |
| `tamago-noflash-test.js` | 9347 | 按键不闪屏 |

### M4 断言修正

旧脚本里有一条 `supplement from roster`：当庭院 3 只都在最近记录里时，期望从全名册补一只。这与验收口径「访客只来自庭院当前 3 只」冲突，P0 已修正为「庭院内回放最久没来的那只」，运行时脚本需同步改成：

```js
check('yard replay when all recent',
  r.length===1&&['mb_a','mb_b','mb_c'].indexOf(r[0])>=0,r);
```

### 父页 iframe 测试（同目录）

M5 的父页 iframe 断言在 `file://` 下要求 `index.html` 与 `tamago.html` 同目录。仓库里 `tamago.html` 在子目录、卡片写的是根目录路径，直接跑会跨域或 404。

测试时在 `.screenshots/tamago-parent/` 建硬链接（同盘，不复制源码）：

```powershell
$dir='D:\小工具\月巴放置\.screenshots\tamago-parent'
New-Item -ItemType Directory -Force -Path $dir | Out-Null
New-Item -ItemType HardLink -Path "$dir\index.html" -Target 'D:\小工具\月巴放置\index.html'
New-Item -ItemType HardLink -Path "$dir\tamago.html" -Target 'D:\小工具\月巴放置\电子宠物游戏-tamago\tamago.html'
```

运行时把脚本的 `INDEX` 指向 `.../tamago-parent/index.html`。实测 M5 全部通过（含 4 条父页 iframe）。上线前仍需把 `tamago.html` 放到根目录或改卡片路径。
