# P4 执行清单（tasks.md）

> 对应规格：`spec.md`；主文件：`d:\小工具\月巴放置\diner.html`
> 每项完成后勾选，并在“验收”列写实际结果。

## T1 横向镜头骨架
- [x] T1.1 新增 `WORLD_W=960`、`VIEW_W=480`、`WORLD_H=270`、`camX/camTarget`
- [x] T1.2 `initCanvas()` 的 BGC 改为 960×270；`buildBg()` 左半屏保持不变、右翼补墙/地平线/地板
- [x] T1.3 `paint()` 改为裁切贴图 + `translate(-camX)`；`paintCast()` 同步平移
- [x] T1.4 缩放坐标换算：canvas 点击/拖动统一 `worldX = clientX*(480/rect.width)+camX`
- [x] T1.5 `startRun()`/`nextDay()` 归零镜头
- 验收：`WORLD_W===960`；Lv1 左半屏与旧图逐像素一致
  - 结果：`selftest` 增加 `WORLD_W===960&&VIEW_W===480` 断言通过；`BGC` 960×270；paint 以 `Math.round(camX)` 裁切。

## T2 拖动与边缘导航
- [x] T2.1 CSS `touch-action:pan-y`；`.stagebox` pointerdown/move/up 拖动
- [x] T2.2 6px 阈值 + 拖动后抑制一次 click
- [x] T2.3 `#camL/#camR` 边缘箭头（世界边缘隐藏），点击平滑移动 240px
- [x] T2.4 横向滚轮可选支持；`camX` 每帧缓动到 `camTarget`
- 验收：拖到 480 不越界；拖动不打气；单击仍打气
  - 结果：`dn_p4_cam`（puppeteer 真鼠标）拖到最右 camX=480、不回弹；拖动后 80ms 抑制 click 未触发打气；单击仍打气；箭头在两端正确隐藏。

## T3 右翼美术
- [x] T3.1 第二扇窗（668..772，中梃 720，窗台 664..776，对称陶盆）
- [x] T3.2 第二盏吊灯（灯轴 720.5，尺寸与左灯一致，光晕对齐）
- [x] T3.3 墙裙/踢脚/地板纹理横延至 960，接缝连续
- 验收：截图 Lv1 左屏不变；右屏窗/灯居中对称
  - 结果：`dn_p4_lv9_l.png` / `dn_p4_lv9_r.png` 目视通过；发现并修复吊灯压窗（右窗整体下移 14px，窗 40..104，灯罩落在窗框上方）；走道地毯补右段 560..846。

## T4 店 8/9 级
- [x] T4.1 `SHOP_LV` 追加 lv8（24/12/4/5/7/22000/★7）与 lv9（30/15/4/5/7/38000/★8）
- [x] T4.2 `SHOP_TABLES` 追加：lv8 = 9 张 + `{608,190}{704,190}{800,190}`；lv9 = 12 张 + `{608,222}{704,222}{800,222}`
- [x] T4.3 `shopName8/shopName9` 四语言；替换“7 级满级”等硬编码文案（4 语言）
- [x] T4.4 `layoutFor/syncLayout` 确认 2 座/桌无截断
- 验收：12/24、15/30；Lv1–9 clash 为空；升级扣款与星级校验正确
  - 结果：`dn_layout_check2` Lv1–9 输出 `clash:[]`、`no-page-error`；Lv8 12 桌/24 座、Lv9 15 桌/30 座。过程中修复 `SHOP_TABLES` Lv6/Lv7 共用条目导致的索引错位（已为 Lv7 复制独立 9 桌布局，数组 9 项）。

## T5 研发数据层（四槽自由组合）
- [x] T5.1 `INGS` 四槽素材：番茄 3 / 调料 6 / 配菜 6 / 烹饪 3，合计 375 种组合；调料与配菜用番茄 `cost` 购买，番茄品种与烹饪方式按 `star` 解锁
- [x] T5.2 `SETS` 24 组「招牌菜」四元组（id `r01..r24`），`price 16–46`、`fx` 含 price/sat/patience/cook/spawn/speed/tip
- [x] T5.3 `DEV_DISHES` 由 `SETS` 派生 24 道动态菜（id `x_rNN`），与 `DISHES` 同走 `dishById/dishLabel`
- [x] T5.4 `DEV_NAME_TPL` 四语言菜名模板：中文「盐蛋快炒圆番茄」拼装，错误组合按「配菜+调料+番茄+烹饪」加号直拼
- [x] T5.5 `defaultSave()` 增加 `sets/setDev/setFlat/setLast/ing/pick`
- [x] T5.6 `mergeSave()` 清洗：`sets` 仅收 `SETS` 合法 id、`ing` 仅收带 `cost` 的调料/配菜、`pick` 四槽校验、`setFlat` 强制重置 `{day,price:1.03,sat:2}`
- 验收：`selftest()` 组合校验全绿
  - 结果：`selftest` 校验 `SETS.length===24 && DEV_DISHES.length===24`、四元组 `[tom,sea,side,method]` 两两不重复、id 唯一；脏档注入非法 id 被丢弃、非法 `pick` 槽位回落 `round/salt/egg/stir`。

## T6 开发规则
- [x] T6.1 `actSetDev()`：每日一次（`S.setDev===S.day` 锁定）、四槽必须全部已解锁
- [x] T6.2 结果三分支：命中新配方 → 记入 `S.sets` 并自动补进菜单空位；命中已发现 → 仅回显；错误组合 → 当日 `setFlat={day,price:1.03,sat:2}`
- [x] T6.3 `setLast` 记录当日结果与四槽配料，开发页回显「招牌菜 / 普通菜品」
- [x] T6.4 确定性线索：`day+seed` 取模选未发现配方，`idx%2` 决定提示调料或配菜
- [x] T6.5 `actPickIng(slot,id)`：未解锁的调料/配菜点击后走 `spendLedger` 扣番茄解锁并选中；星级门槛只提示不扣钱
- 验收：daily 锁、购买解锁、星级门槛、三分支全部通过
  - 结果：`dn_p4_smoke` 覆盖每日锁/次日恢复/未备齐禁用/发现新配方（自动进菜单）/重复发现/错误组合当日平调/购买扣款与余额不足/星级门槛拒绝；错误组合只给 +3% 售价 / +2 满意度，无扣钱扣满意度。

## T7 效果接入
- [x] T7.1 `patienceFor` × patience
- [x] T7.2 `waiterSpeed` × speed
- [x] T7.3 `spawnInterval` × spawn
- [x] T7.4 出餐进度 × cook
- [x] T7.5 `serveGuest`：price/tip ×，sat +
- 验收：单测读取 `setFx()` 与结算数值一致
  - 结果：`setFx()` 只汇总「已发现且在菜单」的招牌菜与当日 `setFlat`；注入 2× 售价组合后 `doubled.pay/base.pay > 1.8`；`wait=18` 下满意度 +8（避开 100 上限）；出餐按 cook 倍率增长。

## T8 界面
- [x] T8.1 第 5 页签 `combo` + `paneCombo` + `showTab`/`renderPrep` 映射
- [x] T8.2 `paneCombo` 结构：四槽选择器（18 个素材按钮）→ 配方预览（菜名 + 招牌/普通 + 效果）→ 开发按钮 → 上次结果 → 生效中 → 线索 → 24 格图鉴
- [x] T8.3 `data-act="setDev"` / `data-act="pickIng"` 分发
- [x] T8.4 研发页与素材名 i18n 键（4 语言）
- [x] T8.5 服务员页卡片横向排开：`.bannies.staffgrid` 用 `auto-fit,minmax(248px,1fr)`，宽屏 2 列、窄屏自动落成 1 列
- 验收：四语言截图无缺字；每日锁与四槽未备齐时按钮禁用
  - 结果：研发页文案 + 18 个素材键 + 7 个效果词条四语言 `missing:[]`；页签无横向溢出；`dn_p4_combo_zh.png` 显示禁用态、预览菜名、上次结果、生效中与 3/24 图鉴；`dn_p4_staff_zh.png` 为 332px×2 列、4 卡 2 行。

## T9 测试
- [x] T9.1 新增 `dn_p4_smoke.js`（镜头/等级/组合/存档/界面/截图）
- [x] T9.2 `dn_p1_save.js` 满级断言 7→9
- [x] T9.3 `dn_layout_check2.js` 扩到 1..9
- [x] T9.4 回归 `dn_p1_save` `dn_p2_smoke` `dn_p3_smoke` `dn_m4_smoke` `dn_p1_queue` `dn_live_walk`
- [x] T9.5 截图：`dn_p4_lv9_l.png` `dn_p4_lv9_r.png` `dn_p4_combo_zh.png` `dn_p4_staff_zh.png` `dn_p4_decor_lv9_l.png` `dn_p4_decor_lv1_l.png` `dn_p4_decor_night.png`
- 验收：全部脚本 0 失败；人工拖动与触摸验收
  - 结果：`dn_p4_smoke` 87 条断言全 ok、0 fail；`selftest ok`；`dn_p1_save`、`dn_layout_check2`（Lv1–9 `clash:[]`）、`dn_p2_smoke`、`dn_p3_smoke`、`dn_m4_smoke`、`dn_p1_queue`、`dn_live_walk` 全部 exit 0。

## T10 文档
- [x] T10.1 回填 `p4-p6-plan.md` 的“当前状态”
- [x] T10.2 本清单勾选完成

## T11 P4-4 装修补画面
- [x] T11.1 盆栽：柜台左端 `x292..308`，盆沿落在柜台顶边 `y150`
- [x] T11.2 挂钟：空墙中部 `x200..220 / y96..116`，与窗、灶台、柜台均不重叠
- [x] T11.3 招财猫：柜台右端 `x378..396`，与店长立绘并列
- [x] T11.4 三件均为单件摆件、刻意不对称（与木招牌一致）
- 验收：Lv1/Lv9/夜主题截图目视
  - 结果：`dn_p4_decor_lv9_l.png` / `dn_p4_decor_lv1_l.png` / `dn_p4_decor_night.png` 目视通过。首版盆栽在左墙脚（`x8..22 / y158..174`），Lv6 起会被贴墙左列桌的凳子（`x13..31 / y160..172`）压住，已移到柜台左端；挂钟随之移到空墙中部。

## T12 菜谱扩容 14 → 30（P4-1）
- [x] T12.1 `DISHES` 追加 16 条：`stiregg/congee/soda/curry/coldnoodle/stew/grill/shake/pizza/beefstew/tartare/claypot/souffle/crab/wagyu/grand`
- [x] T12.2 `dish_*` 四语言名称 16 组，补齐汤羹/主食/甜品/饮品/大菜五类
- [x] T12.3 星级门槛铺到 ★0–★8；口碑上限 200 → 星级上限 ★8，两道终局菜（`wagyu/grand`）落在 ★8
- [x] T12.4 `selftest` 改为校验 `DISHES.length===30`、id 唯一、四语言齐全
- [x] T12.5 回归 `dn_p3_smoke` 的菜品数/图鉴/菜单列表断言 14 → 30，并新增 16 道在场、成本占比、★8 终局菜三条断言
- 验收：菜谱 30 道、图鉴 30 格、菜单最多 7 格取舍成立
  - 结果：`dn_p3_smoke`（新增 3 条断言）与 `dn_p4_smoke`、`dn_p1_save`、`dn_layout_check2`、`dn_p2_smoke`、`dn_m4_smoke`、`dn_p1_queue`、`dn_live_walk` 全部通过；`selftest ok`。

## T13 P4-4 装修追加 6 件（6 → 12）
- [x] T13.1 `DECORS` 追加 `tank 1600 / board 2200 / lantern 2600 / noren 2800 / mat 3600 / radio 4600`，`mergeSave` 白名单按 `DECORS` 遍历，自动兼容
- [x] T13.2 四语言 `decor*` / `decor*Fx` 六组文案；`decorall` 成就改为「12 件全买」自动成立
- [x] T13.3 `buildBg` 绘制：菜单板（窗与挂钟之间 `x158..194`）、收音机（柜台左端 `x310..327`）、暖帘（门框上沿，三片以门轴 439 对称）、地垫（门前 `x418..460`，走道上）、鱼缸（右翼最右端 `x862..918`，避开 800 号桌）、灯笼一对（以右翼窗轴 720 镜像，灯心 655/785）
- [x] T13.4 效果接入：鱼缸 `serveGuest` 满意度 +2；菜单板 `priceMul` ×1.02；暖帘 `patienceFor` +1.5s；地垫 `repGain` ×1.15；收音机 `spawnInterval` ×0.96；灯笼 `evMul()` 让街坊节加成幅度翻倍（1.06 → 1.12）
- [x] T13.5 `selftest` 增加 `DECORS.length===12` 与每件 `key/fx` 四语言齐全断言
- [x] T13.6 `dn_p3_smoke` 装修断言：总数 6 → 12、店面页 11 → 17 项；新增 10 条（六件在场、价格、鱼缸/菜单板/暖帘/地垫/收音机/灯笼效果、购买扣款、成就存档含 12 件）
- 验收：12 件都在场景可见，四语言文案齐全，12 件全买后 `decorall` 正常解锁
  - 结果：`dn_p3_smoke` 48 条断言全 ok；`dn_p4_smoke`（87 条）、`dn_p1_save`、`dn_layout_check2`（Lv1–9 `clash:[]`）、`dn_p2_smoke`、`dn_m4_smoke`、`dn_p1_queue`、`dn_live_walk` 全部通过；截图 `dn_p4_decor_lv9_l/r`、`dn_p4_decor_lv1_l`、`dn_p4_decor_night_l/r`、`dn_p4_decor_shop` 目视通过。

## T14 P4-3 世界 960 → 1440 + 店 10–12 级
- [x] T14.1 `WORLD_W=1440`；镜头夹取 `0..960`；BGC 改为 1440×270；点击换算 `worldX=clientX*(480/rect.width)+camX` 不变
- [x] T14.2 `SHOP_LV` 追加 Lv10（19 桌/38 座/62000/★8）、Lv11（19/38/98000/★8）、Lv12（21/42/150000/★8）
- [x] T14.3 `SHOP_TABLES` 追加第三屏三套：露台两列三排（桌心 `x=1080/1312`，`y=154/190/222`），Lv12 补前排两张
- [x] T14.4 `buildBg` 第三屏：Lv11 后厨窗口（`x976..1112 / y44..106`，双盘双蒸汽、对称调料罐）；Lv10 露台（石砖缝、`1150..1434` 条纹雨棚、串灯、木格栅 + 双绿植、立柱 `1150/1430`）
- [x] T14.5 效果：`spawnInterval` 中 Lv≥10 且雨天时客流惩罚 `1.22 → 1.10`；`kitchenTick` 中 Lv≥11 出餐进度 ×1.08
- [x] T14.6 `shopName10/11/12` 四语言；`selftest` 断言 `WORLD_W===1440 && SHOP_LV.length===12 && SHOP_TABLES.length===12`
- [x] T14.7 `dn_p4_smoke` 镜头/夹取/等级/雨棚/后厨窗口断言；`dn_layout_check2` 扩到 1..12 并新增座位/桌子越界校验；`dn_p1_save` 满级改 12 级
- 验收：三屏接缝连续、42 座不重叠、镜头夹取正确、两处新效果按倍率生效
  - 结果：`dn_p4_smoke`、`dn_p1_save`、`dn_layout_check2`（Lv1–12 `clash:[]`、无越界）、`dn_p3_smoke`、`dn_p2_smoke`、`dn_m4_smoke`、`dn_p1_queue`、`dn_live_walk` 全部 exit 0；截图 `dn_p4_3_lv12_l/m/r_{zh,en}`、`dn_p4_3_lv10_r_zh`、`dn_p4_3_lv11_r_zh`、`dn_p4_3_night_r_zh`、`dn_p4_3_shop_{zh,en}` 目视通过（条纹雨棚/串灯/木格栅/绿植/后厨窗口/扩店按钮）。

## T15 P4-2 招牌菜 24 → 48 + 图鉴分页
- [x] T15.1 `SETS` 追加 `r25..r48` 共 24 组四元组，价格 16–50，`fx` 键仅用 price/tip/patience/speed/cook/spawn/sat
- [x] T15.2 `DEV_DISHES` / `DEV_NAME_TPL` 自动派生 48 道；`selftest` 改为 `SETS.length===48 && DEV_DISHES.length===48`
- [x] T15.3 `paneComboHTML` 图鉴每页 24 格：`comboPage`（UI 状态，不写存档）+ `data-act="comboPage"` 前后翻页 + 页码文案
- [x] T15.4 四语言 `comboPage/comboPrev/comboNext`
- [x] T15.5 `dn_p4_smoke`：48 组/48 道/售价区间/四元组去重、图鉴分页（r24 在第 1 页、r25 在第 2 页、页码 2/2、两端按钮禁用）、文案键 26 个
- 验收：48 道招牌菜可发现、两页图鉴翻页正确、旧档不受影响
  - 结果：`dn_p4_smoke` 全绿（含新增 8 条分页断言）；`dn_p1_save`、`dn_p3_smoke`（48 条）、`dn_p2_smoke`、`dn_m4_smoke`、`dn_p1_queue` 全部通过；`selftest ok`。

## T16 P4-5 事件 6 → 12 + 四季节日
- [x] T16.1 `EVENTS` 6 → 12：追加 `blackout / influencer / poach / flood / street / market`，每条带 `ico` 与 `spawn/price/cost/patience` 乘区
- [x] T16.2 六个新事件的四语言 `key/fx` 文案（zh/en/ja/ko），`selftest` 校验 12 个 id 唯一且图标与双文案齐全
- [x] T16.3 `festivalSeason(day)`：第 7/14/21/28 天为节日，28 天一轮；`festivalName(day)` 返回春日祭/夏日祭/秋日祭/冬日祭；`evLabel(ev)` 节日当天显示季节名
- [x] T16.4 `eventFor(day,seed)` 节日强制 `festival`，普通池剔除 `festival` 后从 10 个事件里抽取；同日同种子结果稳定
- [x] T16.5 节日装修 8 折：`decorPrice(d)` 折后价（620 → 496），店面页购买扣款与按钮价格同步；节日页显示「四季节日限时：装修 8 折」
- [x] T16.6 小报节日专属行：`settleFestival · 春日祭 / 售价 +6% / 限定菜 +25% / 装修 8 折` 插在“今日营业额”之后
- [x] T16.7 准备页事件框与营业页事件标签显示 `ico + 今日事件 · 季节名/事件名`
- [x] T16.8 `dn_p5_smoke`：事件数量/图标四语言/六事件在场/数值/节日周期与强制/确定性/季节名/折扣价与扣款/折扣提示/小报行/事件图标/flood 客流
- [x] T16.9 节日限定菜单：`FEST_MENU` 四季各 3 道（春 汤羹/粥/挞；夏 冷面/汽水/奶昔；秋 咖喱/烧烤/炖菜；冬 火锅/炖牛肉/砂锅），`festDishOn(id)` 判定当日；`serveGuest` 售价 ×1.25、满意度 +4；菜单格与列表标「祭·限定」，节日菜单页显示提示
- [x] T16.10 `dn_p5_smoke` 追加 11 条限定菜单断言（四季结构/菜 id 合法/四语言/春夏归属/非节日无/售价/满意度/菜单标记与提示/非节日无提示）
- 验收：事件 12 种四语言齐全、节日每 7 天一次、装修 8 折真实扣款、限定菜加成真实生效、小报有专属行、四语言截图无缺字
  - 结果：`dn_p5_smoke` 41 条断言全 ok（42 个 ok 含 selftest）、`selftest ok`；截图 `dn_p5_event_{zh,en,ja,ko}.png`（事件框“🎏 今日事件 · 春日祭/Summer Fair/夏祭り/여름 축제”）、`dn_p5_shop_fest_zh.png`（8 折价 + 提示）、`dn_p5_settle_fest_zh.png`（节日加成行含“限定菜 +25%”）、`dn_p5_menu_fest_zh.png`（番茄浓汤/番茄粥标「祭·限定」+ 底部限定提示）目视通过；回归 `dn_p4_smoke`、`dn_p3_smoke`、`dn_p1_save` 全部 exit 0。

## T17 P4-6 成就 30 → 60
- [x] T17.1 `ACHS` 30 → 60，新增搭配收集（5/15/30/48）、店等级 10/12、节日 1/4/8、单日流水 300/600/1000、连胜 3/7/15、菜单 7 格、全菜售出、全员 5 级、口碑 180、100/150/365 天、累计 10 万、接待 1000、12 周、30 连击、95% 满意度、完美一天、20 常客、四道招牌上菜单
- [x] T17.2 `ACH_KEY` 补 30 条映射与四语言 `ach*` 文案
- [x] T17.3 `S.stat` 新增 `streak`（零流失连胜）与 `fest`（节日营业次数）；`defaultSave` 初始化、`mergeSave` 对旧档补 0
- [x] T17.4 `settleRun` 在 `BIZ.served>0` 时累计连胜（有流失清零）与节日次数，再调 `checkAch`
- [x] T17.5 `checkAch` 追加 30 条判定，全部条件可达（员工等级上限 5、口碑上限 200）
- [x] T17.6 `dn_p5_smoke`：60 项/id 唯一/四语言/默认仅 1 项/全条件解锁 60/长线判定/连胜 +1 与清零/节日计数/旧档补字段/成就网格 60
- [x] T17.7 `dn_p3_smoke` 全成就状态升级为 365 天/10 万流水/全 48 配方/全菜售出/20 常客/5×5 级员工，断言 60 项全解锁
- 验收：60 项可达成、旧存档兼容、名册页 60 格
  - 结果：`dn_p5_smoke` 30 条断言全 ok、`selftest ok`；`dn_p3_smoke` 60 项全解锁通过；`dn_p5_achievements_zh.png` 显示 60 格成就网格（30 已解锁 / 30 未解锁）；全量回归 `dn_p4_smoke`（107）、`dn_p1_save`、`dn_p2_smoke`、`dn_m4_smoke`、`dn_p1_queue`（queue 3 / bad 0）、`dn_layout_check2`（Lv1–12 `clash:[]`）全部 exit 0。
