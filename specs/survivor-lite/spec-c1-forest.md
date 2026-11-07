# C-1 + 11 森林四图 · Spec

> 来源：`plan4.md` §3.4.1 / §3.4.2 已确认的 16 图方案。
> 本 Spec 只落地 **C-1 关卡数据模型** 与 **11.1–11.4 森林层**，其余 12–14 层按同一模板后续复制。
> 交付物：修改 `survivor.html` 与 `index.html`，不新增运行文件。

## 一、范围与决策

| 项 | 决策 |
|---|---|
| 内部编号 | `n = 11…14` 连续，`key = '11.1'…'11.4'`；`stageClear / stageUnlocked / nextPlayable` 全部复用 |
| 显示 | 选择列表与 HUD 显示 `11.1 森林边缘`；1–10 关保持原名 |
| 记录键 | `st.key || st.n`，旧档 `'1'…'10'` 无需迁移 |
| 层分组 | `renderStageList` 在 layer 变化处插入 `.stage-grp` 分组条 |
| 新机关 | `fog`（萤雾/灰烬）、`vine`（藤门/枯骨藤）；`meteor / beam` 换色复用 |
| 新敌人 | `squirrel / petal / statue / husk`，立绘复用现有 `ART_POOL` |
| Boss | 复用 `spawnEnemy('boss')`；每关独立名称 + 颜色；11.4 走四阶段 |
| 新武器 | `pinecone` 松果弹弓（独立投射物数组 `G.pines`，不动主武器子弹循环） |
| 新进化 | `senluo` 森罗万象 = pinecone Lv5 + 遗物 `firefly`（萤火灯） |
| 新遗物 | `firefly / vineRing / dragonScale / sprout`，`map:11` 限定 11 层后出现；4 件齐套 +10% 伤害 |
| 成就 | 补 `sv8` = 通关 11.1（`stageClear >= 11`），四语言文案 |

不做：信件入场/50%/95% 手记系统、12–14 层内容、Boss 独立 AI、套装存档字段（本局判定即可）。

---

## 二、C-1 数据模型（survivor.html）

### 2.1 `STAGES` 追加 4 关

在 `STAGES` 末尾（`n:10` 之后）追加：

| n | key | map | 名称 zh / en / ja / ko | dur | bossHp | hpMul | spdMul | spawnMul |
|---|---|---|---|---|---|---|---|---|
| 11 | 11.1 | forest | 森林边缘 / Forest Edge / 森のほとり / 숲의 가장자리 | 210 | 7200 | 2.80 | 1.36 | 2.80 |
| 12 | 11.2 | fairy | 世外桃源 / Fairy Hideaway / 桃源郷 / 무릉도원 | 240 | 8000 | 2.95 | 1.38 | 2.95 |
| 13 | 11.3 | ancient | 上古秘境 / Ancient Realm / 古の秘境 / 고대 비경 | 270 | 9000 | 3.10 | 1.40 | 3.10 |
| 14 | 11.4 | cursed | 枯寂幻境 / Withered Illusion / 枯寂の幻境 / 메마른 환영 | 360 | 10500 | 3.25 | 1.42 | 3.25 |

附加字段：

```js
layer:11, sub:1..4,
bg: ['#16302a','#0d1d1a','#050b09'], edge:'rgba(120,230,170,.24)',
bossName:{zh:'守林人·树影',en:'Warden of Shadows',ja:'守林人・樹影',ko:'숲지기·나무 그림자'},
bossColor:'#6fd8a0'
```

其余三关配色：
- 11.2 `bg:['#3a2440','#24162a','#0d0810'], edge:'rgba(255,180,220,.28)', bossName:独角兽之影, bossColor:'#f0b8e0'`
- 11.3 `bg:['#2c3226','#1a1f16','#080a06'], edge:'rgba(200,220,140,.26)', bossName:巨龙·记得者, bossColor:'#c8d87a'`
- 11.4 `bg:['#241715','#160d0b','#070303'], edge:'rgba(255,120,80,.24)', bossName:诅咒之心, bossColor:'#e07050'`

### 2.2 记录键

```js
function stageKeyOf(n){ const st = stageDef(n); return (st && st.key) || n; }
function bestKey(n, diff){ const k = stageKeyOf(n); return (diff === 'hard' || diff === 'nightmare') ? (k + ':' + diff) : '' + k; }
```

`stageBestOfIn` 回退项改为 `sv.stageBest[stageKeyOf(n)]`。
`stageName(st)`：`return st && st.key ? (st.key + ' ' + nm) : nm;`
`stageBestOf(n)` 已走 `bestKey`，无需再改。

### 2.3 选择列表分组

`renderStageList()`：
- `.no` 文本：`st.key ? st.key : 'STAGE ' + st.n`
- 遍历时若 `st.layer && st.layer !== lastLayer`，先 push：
  `<div class="stage-grp">` + `esc(t('layerTag', st.layer) + ' · ' + t('map_' + st.map))` + `</div>`
- CSS 追加（`.stages` 之后）：

```css
.stage-grp{grid-column:1/-1;display:flex;align-items:center;gap:8px;margin:6px 0 0;
  font-size:10px;font-weight:900;letter-spacing:2px;color:var(--dim);}
.stage-grp:before,.stage-grp:after{content:'';flex:1;height:1px;background:var(--line);}
```

`renderStartBest` 的进度分母自动变成 14（`playableCount()`）。

### 2.4 i18n 新增键（zh / en / ja / ko 各 5 条）

```js
layerTag:'第 {a} 层' / 'LAYER {a}' / '第 {a} 層' / '{a}층'
map_forest:'森林' / 'Forest' / '森' / '숲'
wp_pinecone:'松果弹弓' / 'Pinecone Sling' / '松ぼっくりパチンコ' / '솔방울 새총'
wp_pinecone_d:'向最近敌人抛出松果，落点爆炸' / 'Lob a pinecone at the nearest foe, exploding on impact' / '最寄りの敵へ松ぼっくりを投げ、着弾で爆発' / '가장 가까운 적에게 솔방울을 던져 착탄 시 폭발'
evo_senluo:'森罗万象' / 'All Things in the Forest' / '森羅万象' / '삼라만상'
evo_senluo_d:'爆炸留下 2.5s 萤火地带，持续灼烧并显形' / 'Explosions leave a 2.5s firefly zone that burns and reveals' / '爆発が 2.5 秒の蛍火地帯を残し、燃やし続ける' / '폭발이 2.5초 반딧불 지대를 남겨 계속 태운다'
```

---

## 三、11 森林四图内容

### 3.1 事件表 `STAGE_EVENTS`

```js
11:[{t:35,type:'rain',n:18},{t:75,type:'chest'},{t:110,type:'ring',n:24},{t:150,type:'shield'},
    {t:190,type:'chest'},{t:235,type:'split'},{t:280,type:'elite'}],
12:[{t:30,type:'line',n:12},{t:70,type:'chest'},{t:105,type:'rain',n:20},{t:145,type:'heal'},
    {t:185,type:'ring',n:26},{t:225,type:'chest'},{t:270,type:'elite'}],
13:[{t:30,type:'ring',n:26},{t:65,type:'chest'},{t:100,type:'split'},{t:140,type:'rain',n:22},
    {t:180,type:'shield'},{t:220,type:'chest'},{t:265,type:'elite'},{t:310,type:'rain',n:26}],
14:[{t:25,type:'rain',n:22},{t:60,type:'chest'},{t:95,type:'ring',n:30},{t:130,type:'heal'},
    {t:170,type:'split'},{t:210,type:'chest'},{t:250,type:'shield'},{t:295,type:'elite'},
    {t:335,type:'rain',n:28}]
```

### 3.2 机关（`initHazards` 按 `st.layer === 11` 分支）

| 关 | 配置 |
|---|---|
| 11.1 | `fog` ×3：`r:150, dmg:4, slow:0.35, warn:1.2, active:3.0, cycle:6.5` + `meteor` ×2：`r:40, dmg:12, warn:1.0, active:0.5, cycle:4.8`（松果雨，落点色 `#d8b070`） |
| 11.2 | `vine` ×4：`r:70, dmg:8, slow:0.65, warn:1.2, active:1.6, cycle:5.0` + `beam` ×1：`len:760, w:22, dmg:14, warn:1.2, active:1.6, cycle:5.4`（月光） |
| 11.3 | `sand`（复用 `vine` 字段，`type:'sand'`）×3：`r:95, dmg:6, slow:0.5, warn:1.5, active:2.0, cycle:5.6` + `meteor` ×3：`r:50, dmg:16`（落石） |
| 11.4 | `vine` ×3 + `fog` ×2（灰烬，`dmg:5`） |

`updateHazards` 新增：
- `fog`：`active` 期间每 0.4s 对圆内玩家造成 `dmg` 并施加 `slowT=0.6, slowAmt=h.slow`；进入 active 时震屏 + 灰绿粒子。
- `vine` / `sand`：`active` 期间圆内玩家 `p.x/p.y` 以 `h.slow` 比例减速（通过 `p.vineSlow` 临时乘区，离开即恢复），单次进入造成一次 `dmg`。
- 玩家减速实现：`updatePlayer` 读取 `p.rootT > 0` 时移动速度 ×0.45（新增字段 `rootT`），`updateHazards` 每帧置 `p.rootT = 0.12`。

`drawHazards` 新增：
- `fog`：径向渐变圆，`warn` 期虚线收缩，`active` 期 `rgba(180,230,200,.12)` 雾团 + 2 个漂移小圆。
- `vine` / `sand`：双环 + 3 段弧线，色 `#7fe0a8`（vine）/ `#e0c070`（sand），`warn` 期闪烁。

### 3.3 敌人

`ENEMY_DEF` 追加：

```js
squirrel:{r:10, hp:5,  spd:120, dmg:5,  xp:1, color:'#c8a86a', shape:'star'},
petal:   {r:9,  hp:4,  spd:102, dmg:4,  xp:1, color:'#f0a8d8', shape:'round'},
statue:  {r:24, hp:60, spd:38,  dmg:14, xp:5, color:'#b8bca0', shape:'tall'},
husk:    {r:22, hp:45, spd:50,  dmg:11, xp:4, color:'#8a7a68', shape:'tall'}
```

`ART_POOL`：`squirrel:['mb_xiaoma','niaoba']`、`petal:['mb_xian','mb_lan']`、`statue:['mb_liti','mb_chi']`、`husk:['mb_bashan','bukeming']`。

`pickKind()` 在 `G.stage >= 11 && G.stage <= 14` 时优先返回森林阵容：
- 11.1：`squirrel .40 / petal .25 / small .20 / tank .15`
- 11.2：`petal .35 / squirrel .25 / small .25 / tank .15`
- 11.3：`statue .25 / husk .25 / small .30 / tank .20`
- 11.4：`husk .35 / statue .20 / small .30 / fast .15`

### 3.4 Boss

- `spawnEnemy`：`if(st.bossColor) e.color = st.bossColor;`
- `updateHUD()` 的 boss 条：`$('bossName').textContent = bossTitle(stageDef(G.stage));`
- `bossTitle(st)`：`st.bossName` 取 `LANG` 回退 `zh`，否则 `t('bossName')`。
- 四阶段条件：`G.stage === 10` → `(G.stage === 10 || G.stage === 14)`。

---

## 四、森林武器与遗物

### 4.1 pinecone 松果弹弓

- `WEAPONS` 追加 `{id:'pinecone', ic:'🌰', max:5}`。
- `wpEvoId(id)` 统一映射 `aura→thorn / orbit→corona / chain→acid / pinecone→senluo`；`evolvedWeapon`、`renderWeaponBar`、`buildSummaryHTML` 改用它。
- `G` 新增 `pines:[], fireZones:[]`，`resetRun` 清空。
- `updateWeapons` 追加：
  - cd `1.7s`；目标 = 300px 内最近敌人，无目标不投。
  - 每级：爆炸半径 `42 + 4*(lv-1)`，伤害 `wDmg(14 + 3*(lv-1), p)`；Lv5 一次抛 2 颗（第二颗 `±0.18rad` 偏移）。
  - `G.pines.push({x,y,tx,ty,vx,vy,dmg,rad,t:0})`，速度 420px/s，抵达或 0.9s 后爆炸：
    - 圆内敌人 `e.hp -= dmg*(1-dr)`，粒子 + `tone(300,0.1,'triangle',.04,-90)`。
    - 若 `p.evo.senluo`：`G.fireZones.push({x,y,r:rad*1.25,t:2.5})`。
  - `G.fireZones` 每帧衰减，每 0.5s 对圈内敌人造成 `wDmg(6,p)` 并 `e.revealT = 1`（显形仅表现）。
- `drawWeapons` 追加：松果=棕色 6px 圆 + 拖尾；萤火带=青绿径向渐变 + 漂浮粒子。

### 4.2 4 件森林遗物（`RELICS` 追加）

| id | ic | rar | max | 名称 | 效果 |
|---|---|---|---|---|---|
| `firefly` | 🏮 | 2 | 1 | 萤火灯 | 拾取 +15%，每 20 秒回复 5 生命；森罗万象前置 |
| `vineRing` | 🌿 | 1 | 2 | 藤编环 | 链击目标 +1，链击伤害 +10% |
| `dragonScale` | 🐉 | 2 | 1 | 龙鳞 | 最大生命 +30，护盾冷却 −10% |
| `sprout` | 🌱 | 1 | 2 | 新生芽 | 击杀回复 +1 生命 |

- 四件均加 `map:11`；`rollRelic` 与 `pickChoices` 过滤 `r.map && stage < r.map`。
- `applyRelicEffect` 新增 4 个 case；`vineRing` 的伤害乘区用 `p.chainMul`（`updateWeapons` 链击伤害乘 `p.chainMul`），`dragonScale` 的护盾冷却用 `p.shieldCdMul`（`applyRelicEffect('shield')` 与 `damagePlayer` 重置处乘该值）。
- 套装：`grantRelic` 末尾调用 `checkForestSet()`；当 4 件均 `relLv>=1` 且 `!p.setForest`，`p.setForest=true; p.dmg*=1.1;` + toast `t('setForest')`。
- i18n 追加 `setForest` 四语言。

### 4.3 森罗万象

`EVOLVES` 追加 `{id:'senluo', w:'pinecone', lv:5, relic:'firefly', needRelic:1}`。`canEvolve` 通用分支已支持。

---

## 五、成就与文案

`index.html`：
- `ACHS` 在 `sv7` 与 `sv9` 之间插入：
  ```js
  {id:'sv8', ic:'🌲', n:'森林回响', d:'通关「番茄幸存者」11.1 森林边缘', c:()=>((S.survivor&&S.survivor.stageClear)||0)>=11, p:()=>[Math.min(11,((S.survivor&&S.survivor.stageClear)||0)),11]},
  ```
- `I18N` 追加 `ach_sv8` / `ach_sv8_desc`（en/ja/ko）：
  - en: `Echoes of the Forest` / `Clear stage 11.1 Forest Edge in Tomato Survivors`
  - ja: `森のこだま` / `「トマトサバイバー」の 11.1 森のほとりをクリアする`
  - ko: `숲의 메아리` / `토마토 서바이버의 11.1 숲의 가장자리를 클리어하기`

---

## 六、验收

1. 语法：抽取 `survivor.html` 内联 `<script>` 用 `node --check` 通过。
2. DOM 桩冒烟：
   - 旧档 `stageClear=10` 时 `stageUnlocked(11) === true`，`stageUnlocked(12) === false`。
   - `bestKey(11,'normal') === '11.1'`，`bestKey(11,'hard') === '11.1:hard'`。
   - `stageName(stageDef(11))` 含 `11.1`。
   - 通关 11.1 后 `stageClear===11` 且 `stageUnlocked(12)`。
   - `resetRun()` + `G.sel=11` 后 `G.hazards.length===5`（3 fog + 2 meteor）。
   - `grantRelic` 四件 → `p.setForest===true`。
   - `wpLv('pinecone')=5` + `firefly` 时 `canEvolve(senluo)===true`。
3. 浏览器手测：开始页出现 `第 11 层 · 森林` 分组；11.1 萤雾/松果雨可见；Boss 名称正确；11.4 Boss 四阶段；森罗万象爆炸留萤火带；成就 `sv8` 结算。

---

## 七、风险

| 风险 | 处理 |
|---|---|
| `G.pines` 走独立数组，可能绕过同屏上限 | 上限 40 颗，超出丢弃最早一颗 |
| 机关减速与 `p.speed` 乘区叠加 | 只用 `p.rootT` 临时减速，不改 `p.speed` |
| `playableCount()` 变 14 影响成就口径 | 本批不动成就分母，`sv7` 仍写死 `>=10` |
| 旧档普通难度记录回退 | `stageBestOfIn` 回退到 `stageKeyOf(n)`，旧键不受影响 |
