# 幸存者：后期不刷怪 · Spec

## 1. 现象

长局（尤其玩家持续走位 / 风筝）后，玩家附近的屏幕里不再出现新怪，但游戏仍在正常运行，其他系统（经验、宝箱、Boss）不受影响。

## 2. 根因（已通过代码确认）

| # | 事实 | 位置 |
|---|---|---|
| 1 | 刷怪节拍只在 `G.enemies.length < PERF.maxEnemies` 时才生成 | `survivor.html:7293` |
| 2 | `spawnEnemy()` 在满员时直接 `return null` | `survivor.html:4755-4758` |
| 3 | 敌人**只在死亡时**被移除，没有任何「离屏 / 超距」淘汰 | `survivor.html:7709-7712` |
| 4 | 玩家基础移速 210，绝大多数敌人移速 40-125；普通刷新半径 820 | `survivor.html:4762`、`ENEMY_DEF`、`spd` |
| 5 | 宝箱守卫以 `GUARD_LEASH = 320` 拴在宝箱旁，被放弃的宝箱守卫永久占位 | `survivor.html:4485`、`7371-7377` |
| 6 | 唯一的裁剪函数 `trimEnemiesTo()` 只在 `spawnEvent()` 里调用，且只裁到 `maxEnemies - 32`，并强制保留守卫 | `survivor.html:4802-4816`、`4841` |

结论：玩家速度高于多数敌人，风筝后大量敌人永久滞留在身后；被放弃的宝箱守卫也常驻。长局后 `G.enemies` 被这些「追不上、打不到」的敌人塞满 140（省电 100），刷怪条件永远不成立 → 屏幕内不再刷新怪。

`pickKind()` 与刷怪间隔公式均已排除（`Math.max(0.20, ...)` 不会为负，失败也不会返回非法 kind）。

## 3. 修复方案（最小改动，只动 `survivor.html`）

### M1 新增远距淘汰

在 `trimEnemiesTo()` 附近新增：

```js
const ENEMY_CULL_DIST = 1500;   // 视口半对角约 734px，1500 已完全在屏幕外
function cullFarEnemies(){
  const p = G.player;
  if(!p) return 0;
  const r2 = ENEMY_CULL_DIST * ENEMY_CULL_DIST;
  let n = 0;
  G.enemies = G.enemies.filter(function(e){
    if(e.dead || e.boss || e.guard) return true;      // Boss / 宝箱守卫不裁
    if(dist2(p.x, p.y, e.x, e.y) > r2){ n++; return false; }
    return true;
  });
  return n;
}
```

- 不裁守卫：守卫被移除会让 `alive` 判定失效，宝箱会被自动开启（见 `4814` 注释、`7332-7341`）。
- 不裁 Boss：无尽轮次依赖 `G.boss` 引用。

### M2 接入刷怪节拍

`survivor.html:7290-7299` 改为：达到上限时先尝试淘汰远处普通怪；淘汰后仍满员（全是守卫/Boss）才跳过，并把 `G.spawnT` 置 0.2，避免计时器无限负累积。

```js
G.spawnT -= dt;
if(G.spawnT <= 0){
  if(G.enemies.length >= PERF.maxEnemies) cullFarEnemies();
  if(G.enemies.length < PERF.maxEnemies){
    const bossCalm = (G.bossSpawned && !G.bossKilled) ? 1.6 : 1;
    const interval = Math.max(0.20, (1.00 - G.time * 0.0016) /
      (st.spawnMul * diffDef(G.diff).spawn * spawnRamp(G.time, paceDur(st), st) * bossCalm));
    G.spawnT = interval * rand(0.82, 1.18);
    spawnEnemy(pickKind());
  } else {
    G.spawnT = 0.20;
  }
}
```

### M3 明确不改

- 不改 `PERF.maxEnemies` 数值、刷怪间隔公式、`spawnEnemy` 的满员拦截。
- 不改敌人 AI、移速、宝箱规则、事件表；不新增存档字段。
- 不给守卫加额外上限（每局事件数量有限）。

## 4. 验收标准

1. **复现用例**：浏览器控制台注入 140 个远处普通怪后，`tick(3)` 前后 `counts().enemies` 应明显下降，且出现新的近处敌人；修复前保持 140 不变。
2. **节奏回归**：普通难度第 1 关 180s 内，击杀数 / 经验 / 刷怪间隔与改前一致（公式未变，只在满员时触发淘汰）。
3. **守卫安全**：远处宝箱守卫不被裁，宝箱不会自动开启。
4. **Boss 安全**：Boss 不被裁；Boss 战 `bossCalm = 1.6` 原样生效。
5. **省电模式**：`PERF.maxEnemies = 100` 时同样不再卡死。

## 5. 验证步骤

工作区根目录启动本地服务（浏览器工具不支持 `file://`）：

```powershell
python -m http.server 8000
```

打开 `http://localhost:8000/survivor.html`，等待进入游戏后执行：

```js
svDebug.restart();
const p = svDebug.pos();
for(let i = 0; i < 140; i++) svDebug.spawn('small', p.x + 2600 + i * 3, p.y);
svDebug.counts().enemies;   // 140
svDebug.tick(3);
svDebug.counts().enemies;   // 修复前：140；修复后：明显下降并重新开始刷近处怪
```

再验证守卫：`svDebug.event('chest')` 后把玩家 `tp` 到远处，`tick(10)`，确认 `svDebug.chests()` 中该宝箱仍为 `opened:false`。

## 6. 最终口径（用户确认，已实现）

- 「看不到」以右上角雷达为准：雷达圈半径 `MINI_RANGE = 560`，圈外普通怪**全部删除**。
- 删除后在 `0.86–0.98 × MINI_RANGE`（约 482–549px）处按原种类**重新生成**，保证玩家附近始终有怪。
- 每帧执行（原地压缩 `G.enemies`，无额外数组分配），不再只在满员时触发。
- Boss 与宝箱守卫不回收：Boss 不能被传送；守卫被移除会让宝箱直接判定开启。
- 原 M1/M2 的 1500px 阈值方案已被本节取代。
