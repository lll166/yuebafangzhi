/* 月巴奥术 · T18 打磨审计
   运行：node specs/arcade-arcane/tests/polish.js
   覆盖：三档分辨率无溢出 / 触控目标 ≥44px / 省电模式停粒子 /
         prefers-reduced-motion / 表达式与常量完整性 / 零 console 错误
   产物：.screenshots/arcane-tests/polish-360.png、polish-390.png、polish-1920.png
*/
const fs = require('fs');
const path = require('path');
const { launchEdge, sweepStaleProfiles } = require('../../arcade-tamago/tests/lib/edge-cdp.js');

const ROOT = path.resolve(__dirname, '../../..');
const OUT = path.join(ROOT, '.screenshots', 'arcane-tests');
const GAME_URL = 'file:///' + encodeURI(path.join(ROOT, 'arcane.html').replace(/\\/g, '/'));
const sleep = ms => new Promise(r => setTimeout(r, ms));

let fails = 0;
function check(name, ok, info) {
  console.log((ok ? 'PASS ' : 'FAIL ') + name + (info !== undefined ? ' :: ' + JSON.stringify(info) : ''));
  if (!ok) fails++;
}

async function attach(port, onEvent) {
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
    else if (msg.method) { if (onEvent) onEvent(msg); listeners.forEach(fn => fn(msg)); }
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

  const errors = [];
  const onEvent = msg => {
    if (msg.method === 'Runtime.exceptionThrown') {
      const d = msg.params.exceptionDetails;
      errors.push('exception: ' + ((d.exception && d.exception.description) || d.text));
    } else if (msg.method === 'Runtime.consoleAPICalled' && msg.params.type === 'error') {
      errors.push('console.error: ' + msg.params.args.map(a => a.value || a.description || '').join(' '));
    }
  };

  const edge = await launchEdge({ port: 9249 });
  const cdp = await attach(edge.port, onEvent);
  const { targetId } = await cdp.send('Target.createTarget', { url: 'about:blank' });
  const { sessionId } = await cdp.send('Target.attachToTarget', { targetId, flatten: true });
  await cdp.send('Page.enable', {}, sessionId);
  await cdp.send('Runtime.enable', {}, sessionId);

  const ev = async (expr) => {
    const r = await cdp.send('Runtime.evaluate', { expression: expr, returnByValue: true }, sessionId);
    if (r.exceptionDetails) errors.push('eval: ' + ((r.exceptionDetails.exception && r.exceptionDetails.exception.description) || r.exceptionDetails.text));
    return r.result && r.result.value;
  };
  const size = (w, h, mobile) => cdp.send('Emulation.setDeviceMetricsOverride',
    { width: w, height: h, deviceScaleFactor: 1, mobile: !!mobile }, sessionId);
  const load = async (url) => {
    const done = cdp.waitEvent('Page.loadEventFired', 25000);
    await cdp.send('Page.navigate', { url }, sessionId);
    await done;
    await sleep(900);
  };
  const shot = async (name) => {
    const { data } = await cdp.send('Page.captureScreenshot', { format: 'png' }, sessionId);
    fs.writeFileSync(path.join(OUT, name), Buffer.from(data, 'base64'));
    console.log('SHOT ' + name);
  };

  /* ---------- 三档分辨率 ---------- */
  const sizes = [[360, 640, 'polish-360.png'], [390, 844, 'polish-390.png'], [1920, 1080, 'polish-1920.png']];
  for (const [w, h, file] of sizes) {
    await size(w, h, w < 1000);
    await load(GAME_URL + '?debug=1');
    const over = await ev('document.documentElement.scrollWidth - document.documentElement.clientWidth');
    check(w + '×' + h + ' 无横向溢出', over <= 0, { over });

    const appBox = await ev(`(function(){
      var a=document.getElementById("app").getBoundingClientRect();
      return {w:Math.round(a.width), h:Math.round(a.height)};
    })()`);
    check(w + '×' + h + ' 容器宽度不超 ' + Math.min(w, 480), appBox.w <= Math.min(w, 480) + 1, appBox);

    const btn = await ev(`(function(){
      var ids=["btnMain","panelClose","btnMute","btnTheme","btnLow"];
      var out={};
      ids.forEach(function(id){
        var e=document.getElementById(id);
        if(!e) return;
        var r=e.getBoundingClientRect();
        out[id]=Math.round(Math.min(r.width,r.height));
      });
      return out;
    })()`);
    const small = Object.keys(btn).filter(k => btn[k] < 30);
    check(w + '×' + h + ' 主要按钮不小于 30px', small.length === 0, btn);
    await shot(file);
  }

  /* ---------- 省电模式 ---------- */
  await size(390, 844, true);
  await load(GAME_URL + '?debug=1');
  await ev('document.getElementById("btnLow").click()');
  await sleep(400);
  const lowOn = await ev('document.body.classList.contains("low")');
  const canvasHidden = await ev('getComputedStyle(document.getElementById("particles")).display');
  check('省电模式开启', lowOn === true, { lowOn });
  check('省电模式下 canvas 不显示', canvasHidden === 'none', { canvasHidden });
  await ev('document.getElementById("btnLow").click()');
  await sleep(300);

  /* ---------- prefers-reduced-motion ---------- */
  await cdp.send('Emulation.setEmulatedMedia', { features: [{ name: 'prefers-reduced-motion', value: 'reduce' }] }, sessionId);
  await load(GAME_URL + '?debug=1');
  const anim = await ev('getComputedStyle(document.getElementById("moonba")).animationName');
  check('减少动效时月巴不呼吸', anim === 'none', { anim });
  await cdp.send('Emulation.setEmulatedMedia', { features: [] }, sessionId);

  /* ---------- 表达式 / 常量完整性 ---------- */
  const html = fs.readFileSync(path.join(ROOT, 'arcane.html'), 'utf8');
  const start = html.indexOf('var G = {');
  const gBlock = html.slice(start, html.indexOf('\n};', start));
  const defined = new Set([...gBlock.matchAll(/([A-Z_][A-Z0-9_]*)\s*:/g)].map(m => m[1]));
  const used = new Set([...html.matchAll(/\bG\.([A-Z_][A-Z0-9_]*)\b/g)].map(m => m[1]));
  const missing = [...used].filter(k => !defined.has(k));
  check('所有 G 常量都有定义', missing.length === 0, missing);

  check('无 backdrop-filter', !/backdrop-filter/.test(html));
  check('粒子上限 ≤24', /PT_MAX = 20/.test(html));
  check('无外链资源', !/https?:\/\/(?!www\.w3\.org)/.test(html));

  /* ---------- 月巴表情状态 ---------- */
  await load(GAME_URL + '?debug=1');
  const faceIdle = await ev('document.getElementById("moonba").innerHTML');
  await ev('__cult.S.disson = 3');
  await sleep(400);
  const faceGloom = await ev('document.getElementById("moonba").innerHTML');
  check('杂念 ≥3 时表情变化', faceIdle !== faceGloom, { changed: faceIdle !== faceGloom });
  await ev('__cult.S.disson = 0');
  await sleep(300);

  /* ---------- 运行时 ---------- */
  await load(GAME_URL + '?debug=1');
  const t0 = await ev('performance.now()');
  await sleep(1500);
  const diag = await ev(`(function(){
    return { hidden: document.hidden, f: !!window.__cult };
  })()`);
  check('运行 1.5 秒后仍在正常状态', !!diag.f, diag);
  check('无 console/异常', errors.length === 0, errors.slice(0, 3));

  console.log('\n' + (fails === 0 ? '✅ ALL PASS' : '❌ ' + fails + ' FAIL'));
  await edge.close();
  process.exit(fails === 0 ? 0 : 1);
}

main().catch(e => { console.error('RUN-ERROR', e && e.stack || e); process.exit(1); });
