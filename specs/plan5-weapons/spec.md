# Plan 5：新增 10 把副武器 + 5 组联合进化

## 1. 目标

在 `d:\小工具\月巴放置\survivor.html`（单文件 HTML5 Canvas 幸存者）中：

1. 新增 **10 把基础副武器**，每把 `max:5`，可在升级卡池中获取并升级。
2. 新增 **5 组联合进化（Union）**：两把指定副武器都达到 Lv5 时，可在升级卡池中合成 1 把联合武器。
3. 联合进化会**删除两把基础武器、写入 1 把联合武器**，因此副武器占用数净减 1，**空出 1 个武器槽**，玩家可继续拾取新武器。
4. 不改变现有主武器、原有 8 把副武器、原有 8 个进化的行为与数值基线。

## 2. 现状确认（已读代码，非假设）

- 文件：`d:\小工具\月巴放置\survivor.html`（约 5845+ 行）。
- `const G = {...}`：L2023，实体容器已含 `spores/bees/blades/spikes`（L2032）。
- `newPlayer()`：L2039；`wcd` 为硬编码键（L2046），当前 8 个副武器键。
- `resetRun()`：L2075；清空实体容器（L2080、L2091）。
- `WEAPONS`：L2391–2401，现有 8 把副武器。
- `EVOLVES`：L2402–2412。
- `MAX_WEAPON_SLOTS = 5`：L2413（以文件实际值为准）。
- `weaponSlotsFree()`：L2419，统计 `p.weapons` 中 `>0` 的键数。
- `wpEvoId/evolvedWeapon/canEvolve/addWeapon/levelWeapon/evolveWeapon/renderWeaponBar`：L2424–2499。
- `pickChoices()`：L2502–2553；新武器权重使用 `(w.newW || 20)`。
- `renderChoices()`：L2580；`chooseUpgrade()`：L2611。
- `updateWeapons(dt)`：L3368–3742（上一轮 4 把武器代码到 L3741）。
- `explodePine()`：L3743。
- `drawWeapons()`：L3765–3964（末尾 `ctx.globalAlpha = 1;` 在 L3963）。
- 玩家子弹更新：L4379–4423；`drawBullet(b)`：L4810（仅用 `b.cannon` 区分颜色）。
- `buildSummaryHTML()`：L5172（泛型遍历 `WEAPONS`）。
- `svDebug`：L5788–5845。
- 工具函数：`clamp/rand/dist2` 在 L764–767。

**关键结论**：现有 `renderWeaponBar`、`buildSummaryHTML` 都直接遍历 `WEAPONS`，因此只要把联合武器加入 `WEAPONS`，UI 可自动兼容。

## 3. 数据设计

### 3.1 新增 10 把基础副武器（`WEAPONS` 追加）

统一 `max:5, newW:12`（降低新卡权重，避免稀释卡池）。

| id | 图标 | 名称（zh） | 冷却（Lv1→Lv5） | 行为 |
|---|---|---|---|---|
| `gun` | 🔫 | 番茄机枪 | 0.55→0.31s | 向最近敌人连发小籽，Lv3/Lv5 各 +1 发，Lv5 穿透 1 |
| `grapes` | 🍇 | 葡萄霰弹 | 1.8→1.28s | 扇形 3→5 发短程酸葡萄 |
| `flame` | 🌶 | 辣椒喷火 | 0.16s tick | 朝最近敌人持续喷火，锥形范围伤害；需 `p.flameA/flameVis/flameRange` 供绘制 |
| `zap` | 🍋 | 柠檬电击 | 2.0→1.36s | 最近 1→3 个敌人落雷，小 AoE；`G.zaps` 视觉 |
| `javelin` | 🥕 | 胡萝卜标枪 | 1.9→1.3s | 高速直线弹，高伤，穿透 2（Lv5 为 3） |
| `melon` | 🍉 | 西瓜滚轮 | 3.4→2.6s | 大滚动弹，反复判定并减速，撞墙反弹；`G.melons` |
| `mine` | 🥔 | 土豆地雷 | 2.4→1.6s | 脚下布雷，0.55s 后触发，接触爆炸；`G.mines` |
| `bomb` | 🍍 | 菠萝炸弹 | 2.8→2.0s | 抛向最近敌人，0.75s 后 AoE 爆炸；`G.pineapples` |
| `beam` | 🌻 | 向日葵光束 | 1.8→1.2s | 向最近敌人发射贯穿直线激光（线段距离判定）；`G.beams` |
| `leaf` | 🥬 | 生菜护盾 | 持续 | 2→4 片叶子绕身旋转，接触伤害 + 减速 |

### 3.2 联合武器（同时加入 `WEAPONS`，标记 `union:true, max:1`）

| id | 图标 | 名称（zh） | 配方（均需 Lv5） | 合成后效果 |
|---|---|---|---|---|
| `ustorm` | 🌀 | 番茄风暴 | `gun` + `grapes` | 0.22s 双发高速籽，每 6 轮打出一圈 10 发环形霰弹 |
| `uflame` | 🔥 | 麻辣风暴 | `flame` + `zap` | 持续强化火舌（范围 175）+ 每 0.9s 落雷 2 个目标 |
| `uroller` | 🎡 | 藤蔓巨轮 | `javelin` + `melon` | 每 2.4s 巨型藤轮（r30、高伤、强减速）+ 每 1.3s 藤枪 |
| `ufarm` | 💥 | 炸弹农场 | `mine` + `bomb` | 每 1.9s 同时布 2 颗雷 + 抛 1 颗菠萝 |
| `ufort` | 🛡 | 光合要塞 | `beam` + `leaf` | 5 片叶盾（r52）+ 每 1.5s 贯穿光束，命中回血 1（每次至多 3） |

### 3.3 联合配方与槽位规则

- `UNIONS = [{id:'ustorm', a:'gun', b:'grapes'}, ...]`。
- `canUnion(u)`：`wpLv(a)>=5 && wpLv(b)>=5 && !hasWeapon(u.id)`。
- `doUnion(u)`：`delete p.weapons[a]; delete p.weapons[b];` → `p.weapons[u.id]=1` → toast/粒子/音效/`renderWeaponBar()`。
- **槽位结果**：占用量 −1，`weaponSlotsFree()` 自然 +1，符合“空出一个槽位后可继续拾取”。
- 联合武器 `max:1`，`levelWeapon()` 自动拒绝升级；`wpEvoId('ustorm')` 返回 `''`，不参与原有 EVOLVES。
- 联合武器**不可作为“新武器”卡出现**；`w.union` 在 `pickChoices()` 中新武器分支直接跳过。
- 已拥有某联合武器时，其两个基础武器**不再出现在新武器卡池**（避免重复占槽）。

## 4. 代码改动点（精确到函数）

### 4.1 数据层（L2391–2499 区域）

1. `WEAPONS` 追加 10 把基础武器 + 5 把联合武器。
2. 新增 `const UNIONS = [...]`（置于 `EVOLVES` 之后）。
3. 新增：
   - `function unionDef(id)`
   - `function unionOf(wid)`（返回包含该基础武器的 union 或 null）
   - `function canUnion(u)`
   - `function doUnion(u)`
4. `pickChoices()`：
   - 新增 union 候选（权重 40，`key:'un:'+u.id`）。
   - 新武器分支：`if(w.union) continue;`；若 `unionOf(w.id)` 已拥有则跳过。
   - `wlv` 分支无需改动（`lv < max` 对 `max:1` 自动成立不了）。
5. `renderChoices()`：新增 `kind==='union'` 分支：`ic=c.union.ic; nm=wpName(c.union); ds=wpDesc(c.union); tag=t('cardUnion'); cls=' evo';`。
6. `chooseUpgrade()`：新增 `else if(c.kind === 'union') doUnion(c.union);`。
7. `renderWeaponBar()`：联合武器显示 `★` 而非 `Lv.1`，并加 `ev` 高亮类。
8. `buildSummaryHTML()`：联合武器显示 `★`（仅表现层，可选但建议）。

### 4.2 状态层

1. `G` 追加：`zaps:[], melons:[], mines:[], pineapples:[], beams:[]`。
2. `resetRun()` 清空上述 5 个容器。
3. `newPlayer().wcd` 追加 15 个键（10 基础 + 5 联合）。

### 4.3 战斗层（`updateWeapons` 内，追加在 L3741 地刺块之后）

新增共享工具（放在 `wDmg` 之后）：

```js
function nearestEnemyTo(x, y, maxR)
function aimAngle(p, maxR)
function spawnShot(p, ang, speed, dmg, r, life, pierce, col)
function segDist2(px, py, x1, y1, x2, y2)
function angDiff(a, b)
function aoeHit(x, y, rad, dmg, slowAmt, slowT)
function coneHit(p, ang, range, half, dmg, color)
```

- 10 个基础武器 block（`wpLv(id) > 0` 守卫）。
- 5 个联合 block（`hasWeapon(unionId)` 守卫）。
- 子弹上限 240：`spawnShot()` 内 `if(G.bullets.length >= 240) G.bullets.shift();`。
- 实体上限：`zaps 10-14 / melons 3 / mines 8-12 / pineapples 6-8 / beams 6`。
- 伤害全部经 `wDmg(base, p)`，保持现有伤害乘区与信物（含 `karma` 禁疗）一致。

### 4.4 绘制层（`drawWeapons()` 末尾之前，L3963 前）

新增：闪电、光束、西瓜、地雷、菠萝（含抛物线高度与地面阴影）、喷火锥形、叶片。
- `PERF.low` 下跳过渐变/阴影，退回纯色半透明填充。
- `drawBullet()` 支持 `b.col` 自定义颜色：`const col = b.col || (b.cannon ? '#46e6f2' : '#ff8a5c');`，内芯 `b.col ? 'rgba(255,255,255,.8)' : 原逻辑`。

### 4.5 文案（4 语言，必须齐全）

键：`wp_<10 基础>` / `wp_<10 基础>_d` / `wp_<5 联合>` / `wp_<5 联合>_d` / `cardUnion`。
- zh 块：L953–971 区域。
- en 块：L1075–1093 区域。
- ja 块：L1196–1213 区域。
- ko 块：L1317–1334 区域。
- `t()` 有 zh 回退，但四语言必须补齐以保持一致性。

### 4.6 调试 API（`svDebug`，L5788+）

新增：
- `union(id)`：强制对指定 union 执行 `doUnion`。
- `slots()`：返回 `{free:weaponSlotsFree(), max:MAX_WEAPON_SLOTS, weapons:{...}}`。
- `state()` 增加 `slots:weaponSlotsFree()`。

## 5. 平衡基线

- 新基础武器单卡权重 12（旧武器 20/14），联合卡权重 40（关键转折）。
- 所有基础武器 Lv1 单体 DPS 控制在 8–18 区间；Lv5 约 2–2.6 倍。
- 联合武器整体 DPS 约为两把 Lv5 合计的 1.25–1.5 倍，作为“省槽 + 强化”的回报。
- 不修改敌人血量、经验曲线、遗物数值。

## 6. 验证步骤（实现后必须全部通过）

1. **语法检查**
   ```powershell
   node -e "const fs=require('fs');const s=fs.readFileSync('d:/小工具/月巴放置/survivor.html','utf8');const m=s.match(/<script>([\s\S]*)<\/script>/);fs.writeFileSync(process.env.TEMP+'/sv_check.js',m[1]);"
   node --check %TEMP%/sv_check.js
   ```
2. **本地服务器**：`node _gbsim/serve.js`（http://127.0.0.1:8971/）。
3. **运行时冒烟**（`survivor.html#debugall`，浏览器控制台）：
   - 逐把 `svDebug.weapon(id)` 升到 Lv5，`svDebug.tick(6)`，确认无 `TypeError/ReferenceError/NaN`。
   - 5 组联合：两把各升 Lv5 → `svDebug.union(id)` → 检查 `svDebug.slots().free` 比合成前 +1。
   - 合成后再 `svDebug.weapon('其他武器')` 确认能占用空出的槽位。
   - `svDebug.tick(10)` 后检查 `counts()` 中 `bullets <= 240`、无实体泄漏。
4. **卡池检查**：多次 `svDebug.xp(200)` 触发升级，确认联合卡只在双方 Lv5 时出现；联合武器不出现在“新武器”卡。
5. **四语言检查**：切换语言后武器卡、武器栏、暂停构筑面板无 `undefined` 键名。

## 7. 明确不做

- 不新增遗物、不改主武器、不改原有 8 把武器/8 个进化。
- 不修改 `MAX_WEAPON_SLOTS`（保持 5）。
- 不引入新依赖、不拆分文件。

## 8. 需要你确认的决策

1. **联合进化是否需要额外遗物条件？** 本规格采用“双方 Lv5 即可”，不额外要求遗物（更贴近“联合进化”而非“遗物进化”）。
2. **联合武器是否可继续升级？** 本规格采用 `max:1`，不可升级，但效果按“两把 Lv5 合体”强度设定。
3. **武器图标**：`gun` 使用 🔫，`ufort` 使用 🛡；其余均为食物/植物 emoji。如需全部保持“食物拟人”，可替换图标，不影响机制。
