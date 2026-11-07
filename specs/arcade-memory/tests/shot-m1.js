/* 月巴记忆 M1 截图验收
   运行：node specs/arcade-memory/tests/shot-m1.js
   产物：.screenshots/memory-tests/*.png
   覆盖：桌面布局 / 320px 窄屏 / nofetch 兜底色块 / 期末大考 6×4 盘面 */
const fs = require('fs');
const path = require('path');
const { launchEdge, sweepStaleProfiles } = require('../../arcade-tamago/tests/lib/edge-cdp.js');

const ROOT = path.resolve(__dirname, '../../..');
const OUT = path.join(ROOT, '.screenshots', 'memory-tests');
const GAME_URL = 'file:///' + encodeURI(path.join(ROOT, 'memory.html').replace(/\\/g, '/'));

const sleep = ms => new Promise(r => setTimeout(r, ms));

/* ---------- 极简 CDP 会话 ---------- */
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
  const edge = await launchEdge({ port: 9225 });
  const cdp = await attach(edge.port);
  try {
    const { targetId } = await cdp.send('Target.createTarget', { url: 'about:blank' });
    const { sessionId } = await cdp.send('Target.attachToTarget', { targetId, flatten: true });
    await cdp.send('Page.enable', {}, sessionId);

    /* 打开页面并清掉本游戏存档再刷新（固定 profile 会跨运行存 localStorage），保证默认状态一致 */
    async function freshPage(url, settle) {
      const loaded = cdp.waitEvent('Page.loadEventFired', 12000);
      await cdp.send('Page.navigate', { url }, sessionId);
      await loaded;
      const reloaded = cdp.waitEvent('Page.loadEventFired', 12000);
      await cdp.send('Runtime.evaluate', {
        /* 只留 introSeen:true：跳过 M2 开场白，其余保持默认（随堂小考+限步） */
        expression: 'try{localStorage.setItem("yueba-memory-v1",JSON.stringify({introSeen:true}))}catch(e){}; location.reload();',
      }, sessionId);
      await reloaded;
      await sleep(settle != null ? settle : 2500); /* 等外链立绘 */
    }

    async function shot(name, url, w, h, mobile, opts) {
      opts = opts || {};
      await cdp.send('Emulation.setDeviceMetricsOverride',
        { width: w, height: h, deviceScaleFactor: 1, mobile: !!mobile }, sessionId);
      await freshPage(url, opts.settle);
      if (opts.flip) {                        /* 翻开前 N 张（'all' 全翻）看卡面 */
        await cdp.send('Runtime.evaluate', {
          expression: 'document.querySelectorAll(".card").forEach(function(c,i){'
            + (opts.flip === 'all' ? '' : 'if(i>=' + opts.flip + ')return;')
            + 'c.classList.add("open");}); "ok"', returnByValue: true,
        }, sessionId);
        await sleep(900);
      }
      const { data } = await cdp.send('Page.captureScreenshot', { format: 'png' }, sessionId);
      fs.writeFileSync(path.join(OUT, name), Buffer.from(data, 'base64'));
      console.log('SHOT ' + name + '  @' + w + 'x' + h);
    }

    await shot('m1-desktop.png', GAME_URL, 900, 760, false);
    await shot('m1-320.png', GAME_URL, 320, 680, true, { flip: 3 });
    await shot('m1-nofetch-320.png', GAME_URL + '?nofetch=1', 320, 680, true, { settle: 600, flip: 'all' });

    /* 期末大考：回干净页面再切档，看 6×4 十二对盘面 */
    await freshPage(GAME_URL, 1200);
    await cdp.send('Runtime.evaluate', {
      expression: 'document.querySelectorAll("#segDiff .btn")[3].click(); "ok"', returnByValue: true,
    }, sessionId);
    await sleep(700);
    const { data } = await cdp.send('Page.captureScreenshot', { format: 'png' }, sessionId);
    fs.writeFileSync(path.join(OUT, 'm1-final-320.png'), Buffer.from(data, 'base64'));
    console.log('SHOT m1-final-320.png  @320x680  (期末大考)');

    console.log('DONE -> ' + OUT);
  } finally {
    await cdp.close();
    await edge.close();
  }
}

main().catch(e => { console.error(e); process.exit(1); });
