/* 月巴记忆 M5 验收（上线清单）
   运行：node specs/arcade-memory/tests/m5-check.js
   覆盖：zh/en/ja/ko 四语渲染与键完整性 / 上线后百巴箱真实点入（卡片→t-mem 主题→名册→回箱）/
         断网兜底 / 中途重开 / 结算刷新 BEST
   产物：.screenshots/memory-tests/m5-box-memory.png、m5-en-320.png、m5-ja-320.png、m5-ko-320.png */
const fs = require('fs');
const path = require('path');
const { launchEdge, sweepStaleProfiles } = require('../../arcade-tamago/tests/lib/edge-cdp.js');

const ROOT = path.resolve(__dirname, '../../..');
const OUT = path.join(ROOT, '.screenshots', 'memory-tests');
const GAME_URL = 'file:///' + encodeURI(path.join(ROOT, 'memory.html').replace(/\\/g, '/'));
const INDEX_URL = 'file:///' + encodeURI(path.join(ROOT, 'index.html').replace(/\\/g, '/'));
const sleep = ms => new Promise(r => setTimeout(r, ms));

let fails = 0;
function check(name, ok, info) {
  console.log((ok ? 'PASS ' : 'FAIL ') + name + (info !== undefined ? ' :: ' + JSON.stringify(info) : ''));
  if (!ok) fails++;
}

/* ---------- 静态守卫 ---------- */
const game = fs.readFileSync(path.join(ROOT, 'memory.html'), 'utf8');
const idx = fs.readFileSync(path.join(ROOT, 'index.html'), 'utf8');
check('static: 主存档只读', !/setItem\(\s*['"]idle-yueba-save-v2['"]/.test(game));
check('static: memory 卡 hidden（等接口隐藏中）', /\{id:'memory',[^}]*hidden:true\}/.test(idx));
check('static: TXT 四语齐', ['zh:{','en:{','ja:{','ko:{'].every(s => game.indexOf(s) >= 0));

/* ---------- CDP ---------- */
async function attach(port) {
  const v = await (await fetch('http://127.0.0.1:' + port + '/json/version')).json();
  const ws = new WebSocket(v.webSocketDebuggerUrl);
  await new Promise((res, rej) => {
    ws.addEventListener('open', res, { once: true });
    ws.addEventListener('error', rej, { once: true });
    setTimeout(() => rej(new Error('ws timeout')), 3000);
  });
  let nextId = 0;
  const pending = new Map();
  const listeners = [];
  ws.addEventListener('message', ev => {
    const msg = JSON.parse(ev.data);
    if (msg.id && pending.has(msg.id)) { pending.get(msg.id)(msg); pending.delete(msg.id); }
    else if (msg.method) listeners.forEach(fn => fn(msg));
  });
  const send = (method, params, sessionId) => new Promise((res, rej) => {
    const id = ++nextId;
    pending.set(id, m => (m.error ? rej(new Error(method + ': ' + m.error.message)) : res(m.result)));
    ws.send(JSON.stringify(Object.assign({ id, method, params: params || {} }, sessionId ? { sessionId } : {})));
  });
  const waitEvent = (method, timeoutMs) => new Promise((res) => {
    const fn = msg => { if (msg.method === method) { done(); res(msg.params); } };
    const timer = setTimeout(done, timeoutMs || 8000);
    function done() { clearTimeout(timer); const i = listeners.indexOf(fn); if (i >= 0) listeners.splice(i, 1); }
    listeners.push(fn);
  });
  return { send, waitEvent, close: () => ws.close() };
}

async function main() {
  sweepStaleProfiles();
  fs.mkdirSync(OUT, { recursive: true });
  const edge = await launchEdge({ port: 9229 });
  const cdp = await attach(edge.port);
  const { targetId } = await cdp.send('Target.createTarget', { url: 'about:blank' });
  const { sessionId } = await cdp.send('Target.attachToTarget', { targetId, flatten: true });
  await cdp.send('Page.enable', {}, sessionId);

  const ev = async (expr) => {
    const r = await cdp.send('Runtime.evaluate', { expression: expr, returnByValue: true }, sessionId);
    if (r.exceptionDetails) {
      console.log('PAGE-ERROR ' + ((r.exceptionDetails.exception && r.exceptionDetails.exception.description) || r.exceptionDetails.text));
    }
    return r.result && r.result.value;
  };
  const q = sel => ev('!!document.querySelector(' + JSON.stringify(sel) + ')');
  const txt = sel => ev('(document.querySelector(' + JSON.stringify(sel) + ')||{textContent:"?"}).textContent.trim()');
  const shot = async name => {
    const { data } = await cdp.send('Page.captureScreenshot', { format: 'png' }, sessionId);
    fs.writeFileSync(path.join(OUT, name), Buffer.from(data, 'base64'));
    console.log('SHOT ' + name);
  };
  const setViewport = (w, h, mobile) => cdp.send('Emulation.setDeviceMetricsOverride',
    { width: w, height: h, deviceScaleFactor: 1, mobile: !!mobile }, sessionId);
  const openGame = async (url, clear) => {
    const loaded = cdp.waitEvent('Page.loadEventFired', 12000);
    await cdp.send('Page.navigate', { url }, sessionId);
    await loaded;
    const re = cdp.waitEvent('Page.loadEventFired', 12000);
    const expr = clear
      ? "try{localStorage.removeItem('yueba-memory-v1')}catch(e){}; location.reload();"
      : "try{localStorage.setItem('yueba-memory-v1',JSON.stringify({introSeen:true}))}catch(e){}; location.reload();";
    await ev(expr);
    await re;
    await sleep(900);
  };

  try {
    /* --- 1. 四语键完整性（运行时比对，缺键/缺台词即失败） --- */
    await setViewport(320, 680, true);
    await openGame(GAME_URL, false);
    check('TXT 四语', await ev("['zh','en','ja','ko'].every(function(l){return !!TXT[l];})"));
    check('四语键集合一致',
      await ev("var ks=Object.keys(TXT.zh).sort().join(',');"
        + "['en','ja','ko'].every(function(l){return Object.keys(TXT[l]).sort().join(',')===ks;})"));
    check('七组台词池四语条数一致',
      await ev("['intro','start','mock','win','lose','angry','calm'].every(function(k){"
        + "return TXT.en[k].length===TXT.zh[k].length&&TXT.ja[k].length===TXT.zh[k].length&&TXT.ko[k].length===TXT.zh[k].length;})"));

    /* --- 2. 各语言渲染（?lang= 通道）--- */
    const CASES = [
      ['en', 'Banny Memory', 'Pop Quiz', 'Steps'],
      ['ja', 'バニメモリ', '小テスト', '手数制'],
      ['ko', '바니 메모리', '쪽지시험', '횟수제'],
      ['zh', '月巴记忆', '随堂小考', '限步'],
    ];
    for (const [lang, title, d0, m0] of CASES) {
      await openGame(GAME_URL + '?lang=' + lang, false);
      check('[' + lang + '] 标题', (await ev('document.title')) === title, await ev('document.title'));
      check('[' + lang + '] 考级按钮一', (await txt('#segDiff .btn')) === d0, await txt('#segDiff .btn'));
      check('[' + lang + '] 模式按钮一', (await txt('#segMode .btn')) === m0, await txt('#segMode .btn'));
      check('[' + lang + '] 重开按钮', (await txt('#btnRestart')) === ({ en: '↻ Restart', ja: '↻ やり直し', ko: '↻ 다시', zh: '↻ 重开' })[lang]);
      check('[' + lang + '] 无占位符（无 undefined/裸键；innerText 排除脚本源码）',
        await ev("var bad=['undefined','d_quiz','m_step'].some(function(p){return document.body.innerText.indexOf(p)>=0;}); !bad"));
      check('[' + lang + '] 台词是当前语言',
        await ev("TXT." + lang + ".start.indexOf(document.querySelector('#exBubble').textContent)>=0"));
      if (lang === 'en') await shot('m5-en-320.png');
      if (lang === 'ja') await shot('m5-ja-320.png');
      if (lang === 'ko') await shot('m5-ko-320.png');
    }

    /* --- 3. 断网兜底（nofetch）：全员兜底块可玩 --- */
    await openGame(GAME_URL + '?nofetch=1', false);
    await ev('document.querySelectorAll(".card").forEach(function(c){c.classList.add("open");}); "ok"');
    await sleep(500);
    check('断网：12 张卡全部兜底块', (await ev('document.querySelectorAll(".cback .fb").length')) === 12);

    /* --- 4. 中途重开 / 结算刷新 BEST（zh 基准） --- */
    await openGame(GAME_URL, false);
    await ev('document.querySelectorAll(".card")[0].click(); "ok"');
    await ev('document.querySelectorAll(".card")[1].click(); "ok"');
    await sleep(600);
    await ev("document.getElementById('btnRestart').click(); 'ok'");
    await sleep(400);
    check('中途重开回到满步满牌', /0\s*\/\s*6/.test(await txt('#stPairs')) && (await txt('#stRes')) === '15');
    for (let k = 0; k < 8; k++) {
      if (await q('#settleOv.show')) break;
      const cs = await ev('Array.prototype.map.call(document.querySelectorAll(".card"),function(c){return{id:c.dataset.id,cls:c.className};})');
      const avail = {};
      cs.forEach(c => { if (c.cls.indexOf('done') < 0 && c.cls.indexOf('open') < 0) avail[c.id] = (avail[c.id] || 0) + 1; });
      const id = Object.keys(avail).find(k2 => avail[k2] === 2);
      if (id == null) break;
      const idxs = [];
      cs.forEach((c, i) => { if (c.id === id && c.cls.indexOf('done') < 0 && c.cls.indexOf('open') < 0) idxs.push(i); });
      await ev('document.querySelectorAll(".card")[' + idxs[0] + '].click(); "ok"');
      await ev('document.querySelectorAll(".card")[' + idxs[1] + '].click(); "ok"');
      await sleep(650);
    }
    check('通关出现结算', await q('#settleOv.show'));
    check('BEST 已刷新（非 --）', (await txt('#stBest')) !== '--', await txt('#stBest'));

    /* --- 5. 上线后：百巴箱真实点入 --- */
    await setViewport(960, 760, false);
    const loaded = cdp.waitEvent('Page.loadEventFired', 15000);
    await cdp.send('Page.navigate', { url: INDEX_URL }, sessionId);
    await loaded;
    await sleep(2500);
    /* 造一点解锁（空名册会按设计回退离线全量池，无法验证过滤通道；与 m4 同口径） */
    await ev("S.collection={'mb_xiaoyue':{count:1},'mb_xin':{count:1},'mb_chi':{count:1},'mb_shui':{count:1},"
      + "'mb_wan':{count:1},'mb_pang':{count:1},'mb_gao':{count:1}}; S.collection2={}; S.collection3={}; 'ok'");
    await ev("gbBoxEntry(); 'ok'");                       /* 打开百巴箱 */
    await sleep(600);
    check('百巴箱不显示月巴记忆卡（等接口隐藏中）',
      !(await ev("Array.prototype.some.call(document.querySelectorAll('#gbGrid .gbcard'),function(c){return c.textContent.indexOf('月巴记忆')>=0;})")));
    /* 入口隐藏期间：走 gbFrameOpen 直通验证内嵌链路 */
    await ev("gbFrameOpen(GB_GAMES.find(function(g){return g.id==='memory';}),'box'); 'ok'");
    await sleep(2200);
    check('点卡后进入内嵌', await q('#gbGameOverlay.show'));
    check('t-mem 主题生效', await q('#gbGameOverlay.t-mem.show'));
    const src = await ev("document.getElementById('gbGameFrame').src");
    check('iframe 指向 memory.html', /memory\.html\?lang=/.test(src), src);
    const mem = await ev("document.getElementById('gbGameFrame').contentWindow.__MEM()");
    check('名册桥生效（rostered，池≥6）', !!mem && mem.rostered === true && mem.pool >= 6, mem && mem.pool);
    await shot('m5-box-memory.png');
    await ev("gbFrameClose(); 'ok'");
    await sleep(500);
    check('关闭后回到百巴箱', await q('#gbBox.show'));

    console.log(fails ? ('== M5 验收 FAIL（' + fails + ' 项）==') : '== M5 验收全绿 ==');
  } finally {
    await cdp.close();
    await edge.close();
  }
  process.exitCode = fails ? 1 : 0;
}

main().catch(e => { console.error(e); process.exit(1); });
