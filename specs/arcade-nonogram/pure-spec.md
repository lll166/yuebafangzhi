# 「月巴数织」无图数织（普通数织分支） · Spec

> 状态：**待实现**（需求已由用户确认，本文件为实现级规格，待批准后开工）
> 上游文档：[plan.md](file:///d:/小工具/月巴放置/specs/arcade-nonogram/plan.md)（原 110 题版本，已实现）
> 落点文件：[nonogram.html](file:///d:/小工具/月巴放置/nonogram.html)（206KB 单文件，零依赖）
> 生成工具：新增 `tools/nonogram/gen_pure.py`（复用 [gen.py](file:///d:/小工具/月巴放置/tools/nonogram/gen.py) 的解算器）

---

## 一、需求（以用户原话为准）

1. 给数织游戏再加一栏，**没有图片的版本**。
2. 页签顶部介绍：**「这里虽然没有被关押的月巴，但可以练习一下开锁技巧。」**
3. 里面是**不同难度的数织题目 100 道**；**不要「入门 / 简单」两档，从普通难度 10×10 开始**。
4. 这 100 道题放在「**普通数织**」这个**分支标签页**下（为将来的「超级数织」「彩色数织」预留结构）。
5. 100 道题**纯逻辑、不带月巴立绘**，无图模式不得加载任何图片资源。

## 二、结论先行

| 项 | 决定 |
|---|---|
| 页签 | `随机 \| 图鉴 \| 🔓 无图`（第三页签 `#tabPure`） |
| 分支页签 | 无图页签内再放一条二级页签栏 `#pureTabs`，当前**只有「普通数织」一个**按钮（静态，预留 `data-sub` 供后续「超级数织」「彩色数织」） |
| 题量 | **100 道**：10×10 × 40、12×12 × 30、15×15 × 30 |
| 数据结构 | `const NP2=[{id:'np2_001',sz:10,bits:'…'},…]`，只存答案位图；线索由现有 `buildClues()` 运行时算 |
| **去掉 `lv` 字段** | 已批准的 plan 里写的是 `{id,sz,bits,lv}`；由于 100 道全部属于「普通数织」，`lv` 恒为 1 属于死数据，改为仅靠 `sz` 分组 + 二级页签表达档位。（**本项是对原 plan 的简化，需批准**） |
| 唯一解 | 硬门槛：线推演可完全确定（`logic_solve` full ⇒ 唯一解），并用 `count_solutions==1` 交叉校验 |
| 无猜测 | 同上，线推演能被完全推完即「不需要猜」 |
| 填充率 | 30%~60% |
| 最长连段 | ≤5（避免出现「整行一整条」的报答案式题目） |
| ID 前缀 | `np2_`（与原 `NP` 的 110 题、`S.solved` 完全隔离） |
| 存档 | `S` 新增 `pure:{solved:{},plays:0,totalMs:0,lastId:''}`；续存独立键 `yueba-nonogram-live-pure-v1` |
| 成就 | **无图版不新增成就，也不触发原 7 项成就**（`unlockAchievements` 对纯逻辑题直接跳过） |
| 星级 | 沿用三条件（时间 / 零失误 / 零提示），时间阈值按尺寸：10×10 6:00、12×12 10:00、15×15 15:00 |
| 四语言 | 新增 7 个键，zh/en/ja/ko 全覆盖；题名 `No.001`–`No.100` 不翻译 |
| 不做 | 不加载任何图片、不复刻棋盘成新文件、不改 `crow-cage.html` 开场、不改原 110 题、不加百巴箱卡片、不发金币/番茄、不实现超级/彩色数织 |

---

## 三、题目生成（工具侧）

### 3.1 新增 `tools/nonogram/gen_pure.py`

复用 [gen.py](file:///d:/小工具/月巴放置/tools/nonogram/gen.py) 现有函数（该文件顶层仅 import + 常量，`main()` 由 `if __name__=='__main__'` 保护，`import gen` 无副作用）：

| 复用函数 | 行号 | 用途 |
|---|---|---|
| `fill_rate(m)` | L203 | 填充率闸门 |
| `clean_mask(m,min_comp=6)` | L121 | 去孤立格 / 小连通块 |
| `patterns(n,clue)` | L286 | 线候选排布 |
| `logic_solve(n,rows,cols)` | L326 | 返回 `(full, contra)`，`full=True` 即纯逻辑可解 |
| `count_solutions(n,rows,cols,cap=2)` | L371 | 唯一解交叉校验 |
| `split_runs(m,rnd,max_run=5)` | L432 | 挖洞压长段 |
| `line_metrics(m)` | L484 | 难度指标（`passes/det0/single/fill`，不可纯逻辑解时返回 `None`） |
| `row_clue(m)` | L270 | 行列线索 |
| `preview(pz)` | L811 | QC 缩略图（需 `pz['pal']/pz['col']`，纯逻辑题改为单色版本，见下） |

`gen_pure.py` 不使用网络、不读 `pool.json`、不读 `cache/`。

### 3.2 生成流程

```
SEED=20261027（固定，保证可复现）
SIZES=[(10,40),(12,30),(15,30)]
FILL_MIN=0.30  FILL_MAX=0.60  MAXRUN=5

for sz, want in SIZES:
    got = 0
    while got < want:
        m = candidate(sz, rnd)                       # 见 3.3
        m = clean_mask(m, min_comp=max(5, sz//2))    # 去噪
        if not (FILL_MIN <= fill_rate(m) <= FILL_MAX): continue
        m = split_runs(m, rnd, MAXRUN)               # 压长段（只删不加）
        if not (FILL_MIN <= fill_rate(m) <= FILL_MAX): continue
        lm = line_metrics(m)                          # None ⇒ 不可纯逻辑解，丢弃
        if lm is None: continue
        if max row/col run > MAXRUN: continue
        rows=[row_clue(m[r]) for r in …]; cols=[…]
        if count_solutions(sz, rows, cols, cap=2)[0] != 1: continue
        key = 线索指纹（rows+cols 的元组字符串）
        if key in seen: continue                      # 题面重复直接丢弃
        seen.add(key); got += 1; 记录 {id,sz,bits}
```

`bits` 生成：`''.join('1' if m[r][c] else '0' for r in range(sz) for c in range(sz))`（**行优先**，与现有 `buildClues()` 的 `r*n+c` 取值一致）。

### 3.3 候选形状（避免"废图"）

按顺序随机挑一种族：`blob`（随机密度 + 2~3 轮 4 邻域多数投票平滑）、`mirror_x(blob)`、`mirror_xy(blob)`、`ring(outline_mask(blob,'ring'))`、`core2(outline_mask(blob,'core2'))`。密度 `0.42~0.62`。
判废补充条件（任一命中即丢弃，重新生成）：
- 任意行列线索为空（整行/整列全空，题目太空）；
- 所有行线索完全相同、或所有列线索完全相同；
- 涂黑格聚成 ≤2 个大块且无明显内部结构（用 `len(set(map(tuple,rows)))` ≥3 之类做粗筛）。

### 3.4 输出

| 产物 | 路径 | 内容 |
|---|---|---|
| 题库 | `tools/nonogram/np2_data.js` | `const NP2=[…];`（`ensure_ascii=False, separators=(',',':')`，与 `np_data.js` 同风格） |
| QC 接触表 | `tools/nonogram/qc_pure.png` | 100 张缩略图 + 编号 + `sz/fill/passes` 标注，供人眼过一遍 |
| 单题图 | `tools/nonogram/qc_pure/NN_np2_00X.png` | 单题放大图 |
| 控制台报告 | — | 逐题打印 `id sz fill passes maxrun`，末行打印 `puzzles=100 uniq=100 logic=100` |

脚本自带断言：若最终 100 题中任一项闸门不达标，`sys.exit(1)` 并打印失败原因。

---

## 四、`nonogram.html` 改动（逐处）

> 行号为改动前的当前文件行号；每条都给出「定位 → 改法」。

### E1 CSS（`<style>` 内，插在 L588 `/* ---------- 低功耗 ---------- */` 之前）
```css
/* ---------- 无图数织 ---------- */
.tabs.sub{margin-bottom:10px}
.tabs.sub .tab{flex:none;padding:6px 14px;font-size:10px;letter-spacing:.14em}
.tabs.sub .tab.on{background:rgba(99,108,158,.14);color:var(--acc);
  border-color:rgba(99,108,158,.55);border-left-color:var(--acc);box-shadow:none}
.hero.pure{padding:12px 14px 11px}
.card .cart .lockhole{position:relative;width:30%;aspect-ratio:1/1;
  border:2px solid rgba(52,58,82,.3);border-radius:50%}
.card .cart .lockhole::after{content:"";position:absolute;left:50%;top:78%;
  width:26%;height:46%;transform:translateX(-50%);background:rgba(52,58,82,.3);
  clip-path:polygon(50% 0,100% 100%,0 100%)}
.card .cart .pnum{position:absolute;bottom:5px;right:6px;font-family:var(--mono);
  font-size:9px;font-weight:800;letter-spacing:.06em;color:rgba(52,58,82,.42)}
.card .cart .psz{position:absolute;top:5px;left:6px;font-family:var(--mono);
  font-size:8.5px;letter-spacing:.06em;color:rgba(52,58,82,.4)}
.card .cart .pmini{position:absolute;inset:16%;width:auto;height:auto;
  image-rendering:pixelated;padding:0}
.rvcap{position:absolute;left:0;right:0;bottom:9%;z-index:6;text-align:center;
  font-family:var(--mono);font-size:12px;font-weight:900;letter-spacing:.22em;
  color:var(--paper);text-shadow:0 0 10px rgba(255,255,255,.95);
  opacity:0;animation:rvcopin .5s ease-out .72s forwards}
@keyframes rvcopin{to{opacity:1}}
```
并在 L138 的 `#paneCodex.off,#paneRandom.off{display:none}` 追加 `,#panePure.off`；在低功耗段（L588-613）追加 `body.low-power .rvcap{animation-duration:.01s}`。

### E2 页签 HTML（L635-646）
```html
    <div class="tabs" id="tabs">
      <button class="tab on" data-tab="random" id="tabRandom">随机</button>
      <button class="tab" data-tab="codex" id="tabCodex">图鉴</button>
      <button class="tab" data-tab="pure" id="tabPure">🔓 无图</button>
    </div>
    <div id="paneRandom">
      <div class="hero" id="hero"></div>
    </div>
    <div id="paneCodex" class="off">
      <div class="notice"><span class="ni">✎</span><span id="noticeT"></span></div>
      <div class="chips" id="chips"></div>
      <div id="catalog"></div>
    </div>
    <div id="panePure" class="off">
      <div class="notice"><span class="ni">🔓</span><span id="pureIntroT"></span></div>
      <div class="tabs sub" id="pureTabs">
        <button class="tab on" data-sub="normal" id="subTabNormal">普通数织</button>
      </div>
      <div id="panePureNormal">
        <div class="hero pure" id="pureHero"></div>
        <div class="chips" id="pchips"></div>
        <div id="pcatalog"></div>
      </div>
    </div>
```
（介绍句挂在页签顶部；`#pureTabs` 本次只有一个按钮，不做交互逻辑）

### E3 题库数据块（L719 `</script>` 之后插入新 `<script>`）
```html
<!-- ===== 无图数织题库（由 tools/nonogram/gen_pure.py 生成） ===== -->
<script>
const NP2=[{"id":"np2_001","sz":10,"bits":"…"}, …];   /* 100 项 */
</script>
```

### E4 四语言新增键（`I18N` 四张表，L727-896，每个语言块内加 7 行）

| key | zh | en | ja | ko |
|---|---|---|---|---|
| `pureTab` | `🔓 无图` | `🔓 Plain` | `🔓 無地` | `🔓 무그림` |
| `pureIntro` | 这里虽然没有被关押的月巴，但可以练习一下开锁技巧。 | No caged Bannies here — but it's a fine place to practise your lockpicking. | ここに囚われたバニーはいませんが、鍵開けの練習にはちょうどいい。 | 여기 갇힌 버니는 없지만, 자물쇠 따기 연습을 하기엔 좋아요. |
| `pureBranch1` | 普通数织 | Standard | ノーマル | 일반 |
| `pureSolved` | 已开锁 | Unlocked | 解錠済み | 해제 완료 |
| `pureProgress` | 已开锁 {a}/{b} | Unlocked {a}/{b} | 解錠 {a}/{b} | 해제 {a}/{b} |
| `pureRand` | 🎲 随机一题 | 🎲 Random puzzle | 🎲 おまかせ1問 | 🎲 무작위 한 문제 |
| `pureMeta` | 无图数织 | Plain nonogram | 無地の数織 | 그림 없는 노노그램 |
| `pureWin` | 咔哒，锁开了 | Click — unlocked | カチッ、開いた | 딸깍, 잠금 해제 |

### E5 存档模型
- `defSave()`（L951）：返回值追加 `pure:{solved:{},plays:0,totalMs:0,lastId:''}`。
- `loadSave()`（L956-973）：追加 `S.pure` 的解析（缺字段回落默认值，坏数据不抛）。
- `saveGame()`（L974-980）：`out` 追加 `pure:S.pure`。

### E6 续存键与模式（L985 附近）
```js
const LIVE_KEY='yueba-nonogram-live-v1';
const LIVE_PURE_KEY='yueba-nonogram-live-pure-v1';
let MODE='classic';                       /* classic | pure */
function liveKey(){ return MODE==='pure'?LIVE_PURE_KEY:LIVE_KEY; }
function curPool(){ return MODE==='pure'?NP2:NP; }
function curSolved(){ return MODE==='pure'?S.pure.solved:S.solved; }
```
`saveLive()` L1005 / `clearLive()` L1012 里的 `LIVE_KEY` → `liveKey()`。

### E7 `restoreLive` 拆分（L1014-1037）
`restoreLive()` 改为依次尝试 `restoreLiveOf('classic')`、`restoreLiveOf('pure')`；`restoreLiveOf(m)` 内：读 `m==='pure'?LIVE_PURE_KEY:LIVE_KEY` → 从 `m==='pure'?NP2:NP` 找题 → 置 `MODE=m; tab=(m==='pure'?'pure':'random')` → `startPuzzle(p)` → 恢复 marks/seq/hintM/base/mistakes/hintsLeft/mode → `pauseGame()` + 原 toast。

### E8 `puzzleUnlocked`（L941）
函数开头加 `if(p.pure) return true;`（无图题全部开放，不看主存档收集）。

### E9 `starsFor`（L1239）
```js
const STD_PURE={10:360000,12:600000,15:900000};
function starsFor(p,ms,mist,hint){
  const lim=(p.pure?STD_PURE:STD)[p.sz]||STD[p.sz]||180000;
  const k=(ms<=lim?1:0)+(mist===0?1:0)+(hint===0?1:0);
  return Math.max(1,k);
}
```

### E10 `drawPixMono` + `pad3`（新增，放在 `drawPix` L1302 之后）
```js
function drawPixMono(cv,p,color){          /* 无图模式：单色像素缩略图 */
  const n=p.sz, ctx=cv.getContext('2d');
  ctx.clearRect(0,0,n,n);
  ctx.fillStyle=color||'#737ca6';
  for(let i=0;i<n*n;i++) if(p.bits.charCodeAt(i)===49) ctx.fillRect(i%n,Math.floor(i/n),1,1);
}
function pad3(n){ return (n<10?'00':(n<100?'0':''))+n; }
```

### E11 `renderStats`（L1265-1275）改为按 `MODE` 口径
`map=MODE==='pure'?S.pure.solved:S.solved`；`total=MODE==='pure'?NP2.length:NP.length`；星数、`stTime`（`S.pure.totalMs`/`S.totalMs`）同口径；`stL1` 文案 `MODE==='pure'?t('pureSolved'):t('solved')`；`topstat` 用同口径的 `progress`；`setDataV` 保持写死原 110 题口径（那是「温室」信息，不随页签变）。

### E12 无图目录三函数（新增，放在 `renderHero` L1436 之后）
- `renderPureChips()`：把 `FILTERS` 渲染进 `#pchips`（复用 `filter` 变量，与图鉴各自独立渲染）。
- `renderPureHero()`：`#pureHero` 内渲染 `herotag`=普通数织、`herometa`=`t('pureProgress',{a,b})` + 星数、`herobtn`（`data-rand="1"`，文案 `t('pureRand')`）。
- `renderPureCatalog()`：按 `PURE_SIZES=[10,12,15]` 分组，组头复用 `.rgroup/.rhead/.rdot`（标题 `10×10`，右侧 `普通数织`）；卡片 `.card`：
  - 未解 → `<span class="lockhole">`（纯 CSS 锁孔，**不含月巴、不含图片**）
  - 已解 → `<canvas class="pmini" width=sz height=sz data-np2="id">`，渲染后由 `drawPixMono` 画成单色缩略图
  - 角标 `.psz`（尺寸）、`.pnum`（三位编号）
  - 空列表时用 `t('none')` 占位（同图鉴）。

### E13 `setTab` / `refreshCatalog`（L1437-1446）
```js
function setTab(k){
  tab=k; MODE=(k==='pure')?'pure':'classic';
  $('tabRandom').classList.toggle('on',k==='random');
  $('tabCodex').classList.toggle('on',k==='codex');
  $('tabPure').classList.toggle('on',k==='pure');
  $('paneRandom').classList.toggle('off',k!=='random');
  $('paneCodex').classList.toggle('off',k!=='codex');
  $('panePure').classList.toggle('off',k!=='pure');
  refreshCatalog();
}
function refreshCatalog(){
  renderStats(); renderChips(); renderPureChips();
  if(MODE==='pure'){ renderPureCatalog(); renderPureHero(); }
  else{ renderCatalog(); renderHero(); }
}
```

### E14 `startPuzzle`（L1936-1963）
- 开头（`if(!p) return;` 之后）：`MODE=p.pure?'pure':'classic';`
- `S.lastId=p.id` → `if(p.pure) S.pure.lastId=p.id; else S.lastId=p.id;`
- `pTitle` 分流：`p.pure` → `<b>No.001</b> · 无图数织 · 10×10`；否则保持原样。
- `if(p.img)` 预加载已有判空，纯逻辑题无 `img`，天然跳过。

### E15 `revealPuzzle`（L1992-2042）
- 格子底色：`p.bits` 为 1 时，`p.pure ? '#737ca6' : lightInk(p.pal[B36.indexOf(p.col.charAt(i))])`。
- 结构分流：`p.pure` 时**不插入** `.rvart`（去掉 `.rvpix`/`.rvimg` 立绘层），改为追加 `<div class="rvcap">'+esc(t('pureWin'))+'</div>'`；`stage.classList.toggle('pure',!!p.pure)` 以便低功耗/动画微调。
- 保留 `.rvboard / .rvflash / .rvring` 与 `SFX.reveal()、particles()`、低功耗/减少动效下的时长分支不变。

### E16 `finish`（L2043-2094）
- `S.solved` 读写全部换成 `curSolved()`；`prev` 从 `curSolved()` 取。
- 计数分流：`p.pure` → `S.pure.plays++; S.pure.totalMs+=ms;` 否则原 `S.plays/S.totalMs`。
- `unlockAchievements(p,ms,m,h)` 加 `if(!p.pure)` 守卫（**无图版不碰成就**）。
- `renderStats()` 已是 MODE 口径，直接可用。

### E17 `showResult`（L2171-2246）
- `win && !p.pure` 才渲染 `.artframe > img`；`p.pure` 时渲染
  `<div class="artframe"><canvas class="rpix" width=sz height=sz data-np2="id"></canvas></div>`，并在末尾用 `drawPixMono` 画（复用现有 `canvas[data-pix]` 的绘制回调位置，用 `data-np2` 区分）。
- 名称：`p.pure ? 'No.'+pad3(idx) : nameOf(p)`。
- `.rmeta`：`p.pure` → `无图数织 · 10×10`；否则原 `R1 · 稀有度 · 尺寸 · 画作者`。
- `aliasLine` 天然为空（无图题无 `alias`）；`win` 标题用 `p.pure?t('pureWin'):t('win')`。
- `im` 回退逻辑已有判空，纯逻辑题走不到。

### E18 `goNextUnsolved`（L2247-2255）
改为按 `from.pure` 选 `NP2/NP` 与 `S.pure.solved/S.solved`；末尾 `backToCatalog()` + toast 不变。

### E19 `backToCatalog`（L2256-2267）
`G=null;` 之后把 `refreshCatalog()` 换成 `setTab(MODE==='pure'?'pure':(tab==='pure'?'random':tab))`，让页签 UI 与所在分支保持一致（`setTab` 内部会 `refreshCatalog`）。

### E20 事件绑定（`init()`，L2583-2615 区域）
- `#tabs` 的既有监听不用改（已按 `data-tab` 派发），`setTab` 内已含 `MODE` 切换与重绘。
- 新增：`$('pchips')` 点击 → 切 `filter` + `renderPureChips()` + `renderPureCatalog()`。
- 新增：`$('pcatalog')` 点击 → 取 `data-pid` 在 `NP2` 中查题 → 已解 `showResult({mode:'detail',p})`，未解 `startPuzzle(p)`（无锁态，不需要 `data-lock` 分支）。
- 新增：`$('pureHero')` 点击 → `data-rand` → 在 `NP2` 未解池随机一题（全解完则全池随机）→ `startPuzzle`。
- `#pureTabs` **不绑定事件**（单按钮，仅表达分支归属）。

### E21 `applyStaticText`（L2458-2492）
追加三行：`$('tabPure').textContent=t('pureTab'); $('pureIntroT').textContent=t('pureIntro'); $('subTabNormal').textContent=t('pureBranch1');`

### E22 `init()`（L2552-2629）
- `NP.forEach(buildClues);` 后加 `NP2.forEach(buildClues);`
- `window.__NP_TEST` 追加 `NP2:NP2, drawPixMono:drawPixMono, MODE:function(){return MODE;}`

### E23 `selftest`（L2513-2549）追加断言
```js
if(!NP2||NP2.length!==100) errs.push('NP2='+(NP2?NP2.length:'-'));
NP2.forEach(function(p){
  if(p.bits.length!==p.sz*p.sz) errs.push(p.id+' bits');
  if(!p._rows) buildClues(p);
  if(p._rows.some(function(c){ return patterns(p.sz,c).length===0; })) errs.push(p.id+' row clue');
  if(p._cols.some(function(c){ return patterns(p.sz,c).length===0; })) errs.push(p.id+' col clue');
});
/* 官方解满足 + 纯逻辑可推完（推完 ⇒ 唯一解 ⇒ 无需猜测） */
NP2.forEach(function(p){
  const n=p.sz, m=new Int8Array(n*n); m.fill(-1);
  for(let i=0;i<n*n;i++) if(p.bits.charCodeAt(i)===49) m[i]=1;
  for(let r=0;r<n;r++) if(!sameClue(clueOfStates(rowStates(p,m,r)),p._rows[r])) errs.push(p.id+' sol-r'+r);
  for(let c=0;c<n;c++) if(!sameClue(clueOfStates(colStates(p,m,c)),p._cols[c])) errs.push(p.id+' sol-c'+c);
  const s=new Int8Array(n*n); s.fill(-1);
  for(let loop=0;loop<n*n*2;loop++){
    let ch=false;
    for(let r=0;r<n;r++){
      const cd=lineCands(p,'r',r,s); if(!cd.length){ errs.push(p.id+' dead-r'+r); return; }
      let av=(1<<n)-1, ov=0; cd.forEach(function(x){ av&=x; ov|=x; });
      for(let c=0;c<n;c++){ const i=r*n+c;
        if(((av>>c)&1)&&s[i]===-1){ s[i]=1; ch=true; }
        else if(!((ov>>c)&1)&&s[i]===-1){ s[i]=0; ch=true; } }
    }
    for(let c=0;c<n;c++){
      const cd=lineCands(p,'c',c,s); if(!cd.length){ errs.push(p.id+' dead-c'+c); return; }
      let av=(1<<n)-1, ov=0; cd.forEach(function(x){ av&=x; ov|=x; });
      for(let r=0;r<n;r++){ const i=r*n+c;
        if(((av>>r)&1)&&s[i]===-1){ s[i]=1; ch=true; }
        else if(!((ov>>r)&1)&&s[i]===-1){ s[i]=0; ch=true; } }
    }
    if(!ch) break;
  }
  for(let i=0;i<n*n;i++) if(s[i]===-1) errs.push(p.id+' guess@'+i);
});
```
（既有 `NP.length!==110` / `aliasCount!==111` 断言保持不动。）

---

## 五、验收标准

**生成侧**
1. `python tools/nonogram/gen_pure.py` 退出码 0，末行输出 `puzzles=100 uniq=100 logic=100`。
2. 100 题逐题满足：bits 长度 = sz²、纯逻辑可完全推演、唯一解、填充率 30%~60%、最长连段 ≤5、题面无重复。
3. `tools/nonogram/qc_pure.png` 人眼过一遍：无空洞无结构的"废图"、无雷同题。

**页面侧**（本地 `http.server` + 浏览器）

| # | 场景 | 期望 |
|---|---|---|
| 1 | `nonogram.html?intro=0&selftest=1` | toast「自检通过」，Console 无 errs；原 110 题断言仍通过 |
| 2 | 页签 `🔓 无图` | 顶部出现介绍句；其下有「普通数织」分支页签；100 张卡片（10/12/15 三组）；**Network 面板无任何图片请求** |
| 3 | 完成一关 10×10 | 通关演出只有格子动画 + 「咔哒，锁开了」，无立绘；结算弹窗显示单色缩略图 + `No.00X` + 星级（阈值 6:00） |
| 4 | 结算「随机一题 / 下一题」 | 正确跳到 `NP2` 中未解的题；不会串到原 110 题 |
| 5 | 无图中途刷新 | 走 `yueba-nonogram-live-pure-v1` 原样恢复（暂停态 + 「已恢复上次进度」） |
| 6 | 无图通关后看 Top 统计 | `已开锁 n/100`、星数、累计用时按无图口径；切回「随机/图鉴」立刻回到 `n/110` 与 110 题数据 |
| 7 | 玩一关原 110 题 | 立绘揭晓、稀有度、成就照常；无回归 |
| 8 | 无图模式通关 | **不触发**任何 `np_*` 成就；`S.ach` 无新增 |
| 9 | `localStorage['yueba-nonogram-v1']` | 新增 `pure` 字段；`solved` 不含任何 `np2_*` 键 |
| 10 | 375px 移动端 | 卡片 3 列不溢出；棋盘 15×15 能完整放下并可滚动；二级页签不换行错位 |
| 11 | 低功耗 / prefers-reduced-motion | 无常驻动画；通关演出仍能走完并弹出结算 |
| 12 | `?lang=en/ja/ko` | 新增 7 个键全部有译文，无 `undefined`、无漏字；`No.001` 不翻译 |

---

## 六、风险与回滚

- **风险**：15×15 纯逻辑题生成成功率可能偏低（长段被 split 后容易变成需要猜）。对策：`split_runs` 后重新过 `line_metrics`，失败即丢弃重生成；必要时把 15×15 的 blob 密度上限从 0.62 降到 0.55（题面更"瘦"，长段更少）。生成器有 `while got<want` 上限保护（单尺寸最多 200000 次尝试），超限则报错退出，不产出半成品。
- **风险**：一次插入 ~20KB 的 `NP2` 单行数据，`nonogram.html` 从 206KB 涨到约 226KB，仍远低于现有量级。
- **回滚**：改动集中在 `nonogram.html` 与新增 `tools/nonogram/gen_pure.py`；`git checkout nonogram.html` + 删除生成脚本与产物即可完全回滚。存档新增字段对旧代码无影响（旧代码忽略 `pure`）。

## 七、本次明确不做

超级数织 / 彩色数织（只留分支页签结构）、无图模式的成就、金币/番茄奖励、原 110 题的任何改动、`crow-cage.html` 开场改动、百巴箱 `index.html` 入口改动、图片资源。