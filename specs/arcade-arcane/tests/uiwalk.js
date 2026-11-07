/* 月巴奥术 · 界面走查：把每个面板打开、截图、扫描未替换的占位符与脏值
   运行：node specs/arcade-arcane/tests/uiwalk.js
   产物：.screenshots/arcane-tests/ui-*.png
*/
const fs = require('fs');
const path = require('path');
const { launchEdge, sweepStaleProfiles } = require('../../arcade-tamago/tests/lib/edge-cdp.js');

const ROOT = path.resolve(__dirname, '../../..');
const OUT = path.join(ROOT, '.screenshots', 'arcane-tests');
const GAME_URL = 'file:///' + encodeURI(path.join(ROOT, 'arcane.html').replace(/\\/g, '/'));
const sleep = ms => new Promise(r => setTimeout(r, ms));

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

let problems = [];
function note(msg) { problems.push(msg); console.log('  ⚠ ' + msg); }

async function main() {
  sweepStaleProfiles();
  fs.mkdirSync(OUT, { recursive: true });

  const edge = await launchEdge({ port: 9241 });
  const cdp = await attach(edge.port);
  const { targetId } = await cdp.send('Target.createTarget', { url: 'about:blank' });
  const { sessionId } = await cdp.send('Target.attachToTarget', { targetId, flatten: true });
  await cdp.send('Page.enable', {}, sessionId);
  await cdp.send('Runtime.enable', {}, sessionId);
  await cdp.send('Emulation.setDeviceMetricsOverride',
    { width: 390, height: 844, deviceScaleFactor: 1, mobile: true }, sessionId);

  const ev = async (expr) => {
    const r = await cdp.send('Runtime.evaluate', { expression: expr, returnByValue: true }, sessionId);
    if (r.exceptionDetails) console.log('PAGE-ERROR', (r.exceptionDetails.exception && r.exceptionDetails.exception.description) || r.exceptionDetails.text);
    return r.result && r.result.value;
  };
  const shot = async (name) => {
    const { data } = await cdp.send('Page.captureScreenshot', { format: 'png' }, sessionId);
    fs.writeFileSync(path.join(OUT, name), Buffer.from(data, 'base64'));
    console.log('SHOT ' + name);
  };

  const done = cdp.waitEvent('Page.loadEventFired', 25000);
  await cdp.send('Page.navigate', { url: GAME_URL + '?debug=1' }, sessionId);
  await done;
  await sleep(800);

  /* 摆一个中局状态：高阶 5 环、塔各有等级、几本法术、学分够研究员 */
  await ev(`(function(){var S=__cult.S;
    S.r=4; S.circle=5; S.spell=0; S.mana=2.5e6; S.focus=88; S.disson=2; S.dissonEndAt=Date.now()+6*60000;
    S.academy='s_verdant'; S.acadData={s_verdant:{credit:1450,rank:2}};
    S.tower={c_manapool:7,c_mat:5,c_mirror:3,c_alembic:2,c_library:4,c_ward:3};
    S.spells={'t_mana_gold':{lv:3,n:1},'t_spell_blue':{lv:2,n:3},'t_rank_purple':{lv:1,n:1}};
    S.equip=['t_mana_gold','t_spell_blue','t_rank_purple'];
    S.pages=14; S.pity=37; S.draws=42;
    return 1})()`);
  await sleep(300);

  const scan = async (label) => {
    const txt = await ev('document.getElementById("panelBody").innerText');
    const dirty = (txt.match(/\{[a-zA-Z]+\}|NaN|undefined|Infinity/g) || []);
    if (dirty.length) note(label + ' 出现脏值/未替换占位符: ' + JSON.stringify(dirty.slice(0, 4)));
    return txt;
  };

  console.log('=== 主界面 ===');
  const hud = await ev('document.getElementById("hud").innerText');
  console.log('  ' + hud.replace(/\s+/g, ' '));
  await shot('ui-main.png');

  for (const tab of ['tower', 'spell', 'academy', 'exped', 'note']) {
    console.log('=== ' + tab + ' ===');
    await ev('document.querySelector(".tab[data-id=' + tab + ']").click()');
    await sleep(320);
    const txt = await scan(tab);
    console.log('  ' + txt.replace(/\s+/g, ' ').slice(0, 150));
    await shot('ui-' + tab + '.png');
    await ev('document.getElementById("panelClose").click()');
    await sleep(200);
  }

  console.log('=== 晋级弹层 ===');
  await ev('(function(){var S=__cult.S;S.circle=9;S.spell=__cult.econ.need();return 1})()');
  await sleep(200);
  await shot('ui-main-high.png');
  await ev('__cult.brk.open()');
  await sleep(350);
  const mb = await ev('document.getElementById("modalBody").innerText');
  const mdirty = (mb.match(/\{[a-zA-Z]+\}|NaN|undefined/g) || []);
  if (mdirty.length) note('晋级弹层出现脏值: ' + JSON.stringify(mdirty));
  console.log('  ' + mb.replace(/\s+/g, ' '));
  await shot('ui-rankup.png');
  await ev('__cult.brk.close()');

  /* 夜间配色下的面板 */
  console.log('=== 夜间配色 ===');
  await ev('document.getElementById("btnTheme").click()');
  await sleep(300);
  await ev('document.querySelector(".tab[data-id=spell]").click()');
  await sleep(350);
  await shot('ui-spell-dark.png');
  const darkTxt = await scan('夜间法术面板');
  await ev('document.getElementById("panelClose").click()');

  console.log('\n=== 走查结论 ===');
  if (!problems.length) console.log('  未发现脏值/未替换占位符');
  else problems.forEach(p => console.log('  ⚠ ' + p));

  await edge.close();
}

main().catch(e => { console.error('RUN-ERROR', e && e.stack || e); process.exit(1); });
