/* 月巴奥术 · T5（施法 / 连击 / 音效）验收
   运行：node specs/arcade-arcane/tests/t5-check.js
   覆盖：单次施法收益 = 1 秒产能 / 每秒上限 10 次 / 20 连 +100% /
         连击 3 秒断档归零 / 飘字与水波纹 / 静音持久化 / 无自动播放警告
   产物：.screenshots/arcane-tests/t5-cast.png
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

/* ---------- 静态守卫 ---------- */
const html = fs.readFileSync(path.join(ROOT, 'arcane.html'), 'utf8');
check('static: 每秒点化上限 10 次', /TAP_MAX_PER_SEC:10/.test(html));
check('static: 连击窗口 3 秒 / 满 20 连', /COMBO_MS:3000/.test(html) && /COMBO_FULL:20/.test(html));
check('static: 共享 AudioContext + 总限幅 + 并发钳制',
  /AudioContext/.test(html) && /master\.gain\.value/.test(html) && /MAX_LIVE = 6/.test(html));
check('static: 无外链音频', !/<audio|\.mp3|\.wav|\.ogg/i.test(html));

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
  const warns = [];
  const onEvent = msg => {
    if (msg.method === 'Runtime.exceptionThrown') {
      const d = msg.params.exceptionDetails;
      errors.push('exception: ' + ((d.exception && d.exception.description) || d.text));
    } else if (msg.method === 'Runtime.consoleAPICalled') {
      const txt = msg.params.args.map(a => a.value || a.description || '').join(' ');
      if (msg.params.type === 'error') errors.push('console.error: ' + txt);
      if (msg.params.type === 'warning') warns.push(txt);
    }
  };

  const edge = await launchEdge({ port: 9234 });
  const cdp = await attach(edge.port, onEvent);
  const { targetId } = await cdp.send('Target.createTarget', { url: 'about:blank' });
  const { sessionId } = await cdp.send('Target.attachToTarget', { targetId, flatten: true });
  await cdp.send('Page.enable', {}, sessionId);
  await cdp.send('Runtime.enable', {}, sessionId);
  await cdp.send('Emulation.setDeviceMetricsOverride',
    { width: 390, height: 844, deviceScaleFactor: 1, mobile: true }, sessionId);

  const ev = async (expr) => {
    const r = await cdp.send('Runtime.evaluate', { expression: expr, returnByValue: true }, sessionId);
    if (r.exceptionDetails) errors.push('eval: ' + ((r.exceptionDetails.exception && r.exceptionDetails.exception.description) || r.exceptionDetails.text));
    return r.result && r.result.value;
  };
  const shot = async name => {
    const { data } = await cdp.send('Page.captureScreenshot', { format: 'png' }, sessionId);
    fs.writeFileSync(path.join(OUT, name), Buffer.from(data, 'base64'));
    console.log('SHOT ' + name);
  };
  const load = async (url) => {
    const done = cdp.waitEvent('Page.loadEventFired', 15000);
    await cdp.send('Page.navigate', { url }, sessionId);
    await done;
    await sleep(750);
  };
  const tap = n => ev('(function(){var b=document.getElementById("moonba");for(var i=0;i<' + n +
    ';i++)b.dispatchEvent(new PointerEvent("pointerdown",{bubbles:true,cancelable:true,clientX:195,clientY:330}));return 1})()');

  await load(GAME_URL + '?debug=1');
  await ev('(function(){var S=__cult.S;S.mana=0;S.spell=0;S.stat.casts=0;S.focus=100;S.posture="pon_zuo";' +
           '__cult.cast.reset();return 1})()');
  await sleep(300);

  /* 基线：单次施法 = 1 秒产能（连击 1） */
  const baseGain = await ev('__cult.cast.gain()');
  const baseRate = await ev('__cult.econ.mana()');
  check('单次施法收益 = 1 秒魔力产能',
    Math.abs(baseGain - baseRate) < 1e-6, { baseGain, baseRate });

  /* 狂点 30 次：只计 10 次 */
  const mana0 = await ev('__cult.S.mana');
  await tap(30);
  await sleep(120);
  const casts1 = await ev('__cult.S.stat.casts');
  const mana1 = await ev('__cult.S.mana');
  const combo1 = await ev('__cult.cast.combo()');
  check('狂点 30 次只计 10 次', casts1 === 10, { casts1 });
  check('本秒有收益且不超过 10 次上限',
    mana1 > mana0 && (mana1 - mana0) <= baseGain * 10 * 1.5 + 1, { gain: mana1 - mana0 });
  check('连击计数为 10', combo1 === 10, { combo1 });

  /* 飘字与水波纹 */
  const fx = await ev('({f:document.querySelectorAll(".float").length,r:document.querySelectorAll(".ripple").length})');
  check('施法有飘字与水波纹', fx.f > 0 && fx.r > 0, fx);

  /* 再点 10 次 → 20 连，芯片变番茄色 */
  await sleep(1100);
  await tap(10);
  await sleep(200);
  const combo2 = await ev('__cult.cast.combo()');
  const hot = await ev('document.getElementById("combo").classList.contains("hot")');
  const chipTxt = await ev('document.getElementById("comboN").textContent');
  const shown = await ev('document.getElementById("combo").classList.contains("show")');
  check('累计 20 连', combo2 === 20, { combo2 });
  check('20 连芯片变番茄色', hot === true && shown === true, { hot, shown, chipTxt });

  const gainAt20 = await ev('__cult.cast.gain()');
  check('20 连时施法收益翻倍',
    Math.abs(gainAt20 - baseRate * 2) < baseRate * 0.02, { gainAt20, expect: baseRate * 2 });

  await shot('t5-cast.png');

  /* 3 秒不点 → 断连 */
  await sleep(3400);
  const combo3 = await ev('__cult.cast.combo()');
  const shown3 = await ev('document.getElementById("combo").classList.contains("show")');
  check('3 秒断档后连击归零', combo3 === 0 && shown3 === false, { combo3, shown3 });

  /* 静音持久化（先把存档里的静音清掉，避免上一轮残留导致取反） */
  await ev('__cult.S.muted = false; __cult.save();');
  await load(GAME_URL + '?debug=1');
  const mutedBefore = await ev('__cult.S.muted');
  await ev('document.getElementById("btnMute").click(); __cult.save();');
  const muted1 = await ev('__cult.S.muted');
  await load(GAME_URL + '?debug=1');
  const muted2 = await ev('__cult.S.muted');
  const icon = await ev('document.getElementById("btnMute").innerHTML');
  check('静音开关可切换', mutedBefore === false && muted1 === true, { mutedBefore, muted1 });
  check('静音写入存档', muted2 === true, { muted2 });
  check('静音图标同步', /M12\.4/.test(icon || ''), icon ? icon.slice(0, 40) : icon);

  /* 声音仍然按 S.muted 生效（静音时不建音源） */
  const liveAfterMute = await ev('(function(){var n=0,b=document.getElementById("moonba");for(var i=0;i<5;i++)b.dispatchEvent(new PointerEvent("pointerdown",{bubbles:true,cancelable:true,clientX:195,clientY:330}));return 1})()');
  check('静音下施法不报错', liveAfterMute === 1 && errors.length === 0, errors.slice(0, 2));

  const autoWarn = warns.filter(w => /AudioContext|autoplay|not allowed to start/i.test(w));
  check('无自动播放警告', autoWarn.length === 0, autoWarn.slice(0, 2));
  check('无 console/异常', errors.length === 0, errors.slice(0, 3));

  console.log('\n' + (fails === 0 ? '✅ ALL PASS' : '❌ ' + fails + ' FAIL'));
  await edge.close();
  process.exit(fails === 0 ? 0 : 1);
}

main().catch(e => { console.error('RUN-ERROR', e && e.stack || e); process.exit(1); });
