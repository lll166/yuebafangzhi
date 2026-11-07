# 月巴追茄上线实装 Tasks

对应 `spec.md`。按顺序执行，每步完成后立即校验。

## T1 pacman.html 内嵌开场页

- [x] T1.1 在 `</style>`（约 461 行）前插入 `#introWrap` 系列 CSS
- [x] T1.2 在 `<body>`（463 行）后插入 `introWrap` DOM（iframe + 兜底按钮）
- [x] T1.3 在 `introWrap` 后插入协议脚本
  - `window.__pmIntroStart(src)` 负责赋值 `frame.src` 并启动 4.2s 兜底计时
  - `window.__pmIntroActive()` 返回 `!closed`
  - 监听 `pacman-intro-ready` / `pacman-intro-done`
  - 关闭时 `postMessage('pacman-intro-close')` → `.out` → 470ms 后移除 DOM
- [x] T1.4 启动块在 `showTitle()` 后调用 `window.__pmIntroStart('pacman-intro.html?lang='+encodeURIComponent(lang))`

## T2 pacman-intro.html 支持 ?lang=

- [x] T2.1 `readSavedLang()` 最前面读取 `new URLSearchParams(location.search).get('lang')`，`hasLang()` 校验通过则直接返回

## T3 index.html 百巴箱开放

- [x] T3.1 删除 pacman 行上方开发期注释与 `hidden:true`，保留 `sub:true` 与 `html:'pacman.html'`

## T4 index.html 图鉴入口

- [x] T4.1 `DEX_GAME` 追加 `mb_wansheng` 条目
- [x] T4.2 `dexGameEntry()` 追加 `if(g.game==='pacman'){ dexPacmanEntry(); return; }`
- [x] T4.3 新增 `dexPacmanEntry()`，调用 `gbFrameOpen(g,'dex')`

## T5 index.html i18n 与刷新保护

- [x] T5.1 i18n 补 `'🎃 进入月巴追茄'` 四语言
- [x] T5.2 `pmBusy()` 增加 `__pmIntroActive()` 拦截

## T6 验证

- [x] T6.1 抽取 `pacman.html` / `pacman-intro.html` / `index.html` 脚本做 `node --check`，全部通过
- [x] T6.2 浏览器：百巴箱出现「🎃 月巴追茄 / 🐰 万圣月巴」卡片，点击打开游戏
- [x] T6.3 图鉴活动分类「🎃 月巴追茄」按钮打开游戏，关闭后「✕ 返回图鉴」回到图鉴
- [x] T6.4 两入口均先播开场页，出现「开始月巴追茄」；`introActive` 为 true，`src=pacman-intro.html?lang=zh`
- [x] T6.5 `pmBusy()` 开场期返回 true（静态检查 + 控制台无报错）
