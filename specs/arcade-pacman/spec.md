# 月巴追茄上线实装 Spec

## 1. 目标

把 `pacman.html`（月巴追茄小游戏）与 `pacman-intro.html`（开场导入页）正式接入主页面：

1. 百巴箱出现「🎃 月巴追茄」卡片，格式与其他小游戏一致。
2. 图鉴「万圣月巴」（`mb_wansheng`）出现入口，点击进入游戏。
3. 每次打开游戏先播放开场页，开场结束后淡出移除，进入标题页。

## 2. 现状确认

| 位置 | 现状 |
| --- | --- |
| `index.html` `GB_GAMES` | pacman 行带 `hidden:true` + 开发期注释，卡片不显示 |
| `index.html` `DEX_GAME` | 无 `mb_wansheng` 条目 |
| `index.html` `dexGameEntry()` | 无 `pacman` 分支，无 `dexPacmanEntry()` |
| `index.html` i18n | 已有 `'🎃 月巴追茄'`，缺 `'🎃 进入月巴追茄'` |
| `index.html` `pmBusy()` | 已按 `gbFrameId==='pacman'` 与 `__pmState()` 判断，开场期会误判为可刷新 |
| `pacman.html` | 无任何 `introWrap` / 开场协议；`__pmState()` 已存在；启动块在 4071–4084 |
| `pacman-intro.html` | 协议 `pacman-intro-ready/done/close` 已实现；语言只读主存档与自身键，不支持 `?lang=` |

## 3. 实现方案

### 3.1 `pacman.html`：内嵌开场页

**A. CSS（插入 `</style>` 之前，约 461 行前）**

沿用 `goldminer.html` 的 `#introWrap` 结构，配色改为 pacman 主题变量：

```css
#introWrap{position:fixed;inset:0;z-index:10000;background:var(--bg);opacity:1;transition:opacity .46s ease;}
#introWrap iframe{position:absolute;inset:0;display:block;width:100%;height:100%;border:0;background:var(--bg);opacity:0;transition:opacity .4s ease;}
#introWrap.ready iframe{opacity:1;}
#introWrap.out{opacity:0;pointer-events:none;}
#introFallback{position:absolute;right:calc(14px + env(safe-area-inset-right));bottom:calc(14px + env(safe-area-inset-bottom));z-index:2;display:none;padding:9px 14px;cursor:pointer;font-family:inherit;font-size:11px;font-weight:700;letter-spacing:.16em;color:var(--onAccent);background:linear-gradient(180deg,var(--accent2),var(--accent));border:1px solid var(--line2);border-radius:8px;box-shadow:0 4px 14px rgba(0,0,0,.55);}
#introFallback:active{transform:translateY(2px);}
#introWrap.slow #introFallback{display:block;}
```

**B. DOM（`<body>` 后第一行，463 行后）**

```html
<div id="introWrap">
  <iframe id="introFrame" title="月巴追茄 · 开场"></iframe>
  <button id="introFallback" type="button">直接进入 ›</button>
</div>
```

**C. 协议脚本（紧随 `introWrap` 之后）**

与 `goldminer.html` 同构，差异点：

- iframe 初始无 `src`，由 `window.__pmIntroStart(src)` 赋值（保证能带上当前语言）。
- 4.2s 兜底计时从 `__pmIntroStart` 起算，避免空 iframe 提前判定超时。
- 暴露 `window.__pmIntroActive()` 供主页面 `pmBusy()` 判断开场期。
- 关闭流程：先 `postMessage({type:'pacman-intro-close'})`，再 `.out` 淡出，470ms 后从 DOM 移除。

接收消息：`pacman-intro-ready`（`.ready`）、`pacman-intro-done`（关闭）。

**D. 启动块接入（4071–4084 区域，`showTitle()` 前后均可）**

```js
if(window.__pmIntroStart) window.__pmIntroStart('pacman-intro.html?lang=' + encodeURIComponent(lang));
```

放在 `showTitle()` 之后，保证标题页先铺好、开场淡出后直接可见。

### 3.2 `pacman-intro.html`：支持 `?lang=`

`readSavedLang()`（288–298 行）优先读 `URLSearchParams(location.search).get('lang')`，校验 `hasLang()` 后再回落到主存档、自身键、浏览器语言。

### 3.3 `index.html`：百巴箱入口

`GB_GAMES` 中删除开发期注释与 `hidden:true`：

```js
{id:'pacman', codex:'mb_wansheng', name:'🎃 月巴追茄', sub:true, html:'pacman.html'},
```

卡片沿用现有 `gbcard` / `gbico` / `gbsub` 样式，因 `sub:true` 自动显示「🐰 万圣月巴」副标题，与俄罗斯巴块、巴巴博弈等格式一致。

### 3.4 `index.html`：图鉴入口

1. `DEX_GAME` 追加：

```js
mb_wansheng:{icon:'🎃', label:'🎃 月巴追茄', enter:'🎃 进入月巴追茄', game:'pacman'},
```

2. `dexGameEntry()` 追加分支：

```js
if(g.game==='pacman'){ dexPacmanEntry(); return; }
```

3. 新增 `dexPacmanEntry()`（照 `dexGoldEntry` 模式）：

```js
function dexPacmanEntry(){
  const g=GB_GAMES.filter(function(x){ return x.id==='pacman'; })[0];
  if(!g) return;
  try{ save(); }catch(e){}
  sfx.click();
  gbFrameOpen(g,'dex');
}
```

### 3.5 `index.html`：i18n 与刷新保护

1. i18n 补 `'🎃 进入月巴追茄'` 四语言（en/ja/ko），与 `'⛏ 进入黄金矿工'` 同格式：

```js
'🎃 进入月巴追茄':{en:'🎃 Enter Banny Chase',ja:'🎃 バニーチェイスへ',ko:'🎃 버니 체이스 입장'},
```

2. `pmBusy()` 增加开场期拦截（紧跟 `w.__pmState` 判断之后）：

```js
if(typeof w.__pmIntroActive==='function' && w.__pmIntroActive()) return true;
```

## 4. 不做的事

- 不新增 `yueba-pacman-coins` 金币回传（首版不发，见 plan.md）。
- 不新增 `t-pac` 专属壳色（非必需，避免扩大改动面）。
- 不改动 `mb_pingguo` 入口（用户本次只要求万圣月巴）。

## 5. 验收标准

1. 百巴箱出现「🎃 月巴追茄」卡片，图标为图鉴月巴立绘，副标题「🐰 万圣月巴」；点击打开内嵌窗口。
2. 图鉴「万圣月巴」卡片点击可进入同一游戏；关闭后回到图鉴页而非百巴箱。
3. 两个入口打开后都先显示开场页，开场「开始月巴追茄」后淡出，进入标题页。
4. 开场页语言与主页面当前语言一致。
5. 开场期间首页自动刷新不打断游戏（`pmBusy()` 返回 true）。
6. 关闭游戏窗口后主页面计时恢复正常。
7. `node --check` 通过（脚本语法无误）。
