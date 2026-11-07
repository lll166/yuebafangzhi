/* 月巴奥术 · T13（远征 / 归来结算）验收
   运行：node specs/arcade-arcane/tests/t13-check.js
   覆盖：四处遗迹与门槛 / 派遣与时间戳判定 / 刷新不丢 / 收益浮动 80%~130% /
         游历减半时长 / 轻伤与清心解除 / 归来弹窗
   产物：.screenshots/arcane-tests/t13-exped.png
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

const html = fs.readFileSync(path.join(ROOT, 'arcane.html'), 'utf8');
check('static: 四处遗迹齐备', ['d_garden','d_ravine','d_ruins','d_skyfall']
  .every(id => new RegExp("id:'" + id + "'").test(html)));
check('static: 收益浮动 80%~130%', /DUNGEON_RATIO_MIN:0\.80/.test(html) && /DUNGEON_RATIO_MAX:1\.30/.test(html));
check('static: 轻伤 10%', /DUNGEON_INJURY:0\.10/.test(html));
check('static: 用 endAt 判定而非 tick', /S\.trip\.endAt/.test(html) && /now\(\) >= S\.trip\.endAt/.test(html));

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

  const edge = await launchEdge({ port: 9244 });
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
  const shot = async (name) => {
    const { data } = await cdp.send('Page.captureScreenshot', { format: 'png' }, sessionId);
    fs.writeFileSync(path.join(OUT, name), Buffer.from(data, 'base64'));
    console.log('SHOT ' + name);
  };

  const done = cdp.waitEvent('Page.loadEventFired', 25000);
  await cdp.send('Page.navigate', { url: GAME_URL + '?debug=1' }, sessionId);
  await done;
  await sleep(800);

  const reset = `(function(){var S=__cult.S;
    S.r=3; S.circle=2; S.spell=0; S.mana=1e6; S.focus=100; S.disson=0;
    S.academy='s_verdant'; S.acadData={s_verdant:{credit:0,rank:0}};
    S.tower={c_manapool:0,c_mat:0,c_mirror:0,c_alembic:0,c_library:0,c_ward:0};
    S.star={}; S.starPts=0; S.ascendCount=0;
    S.spells={}; S.equip=['','','']; S.apprentices=[]; S.buffs=[];
    S.potions={}; S.reagent=0; S.pages=0; S.trip=null; S.injuryUntil=0;
    S.posture='pon_zuo';
    return 1})()`;
  await ev(reset);
  await sleep(200);

  /* ---------- 门槛 ---------- */
  await ev('__cult.S.r = 0');
  const locked = await ev('__cult.trip.unlocked(__cult.trip.byId("d_skyfall"))');
  await ev('__cult.S.r = 3');
  const open = await ev('__cult.trip.unlocked(__cult.trip.byId("d_skyfall"))');
  check('中阶前浮空废墟未开放', locked === false, { locked });
  check('中阶后开放', open === true, { open });

  /* ---------- 派遣与时间戳 ---------- */
  const okDep = await ev('__cult.trip.depart("d_garden")');
  const tripAfter = await ev('JSON.stringify(__cult.S.trip)');
  const tr = JSON.parse(tripAfter);
  check('派遣成功并写入结束时间戳', okDep === true && tr && tr.endAt > Date.now(), { id: tr && tr.id });
  check('学院后园 10 分钟', Math.abs(tr.endAt - tr.startAt - 600000) < 1500,
    { durMs: tr.endAt - tr.startAt });

  const second = await ev('__cult.trip.depart("d_ravine")');
  check('一次只能派一队', second === false, { second });

  /* 刷新不丢 */
  await ev('__cult.save()');
  const done2 = cdp.waitEvent('Page.loadEventFired', 25000);
  await cdp.send('Page.navigate', { url: GAME_URL + '?debug=1' }, sessionId);
  await done2;
  await sleep(800);
  const tripReload = await ev('JSON.stringify(__cult.S.trip)');
  const tr2 = JSON.parse(tripReload);
  check('刷新后远征仍在进行', !!tr2 && Math.abs(tr2.endAt - tr.endAt) < 2000, { id: tr2 && tr2.id });

  /* ---------- 结算 ---------- */
  const before = await ev(`(function(){var S=__cult.S;
    return {reagent:S.reagent, credit:S.acadData.s_verdant.credit, mana:S.mana}})()`);
  const settled = await ev(`(function(){
    var S=__cult.S; S.trip.endAt = Date.now() - 1000;
    return __cult.trip.settle();
  })()`);
  const after = await ev(`(function(){var S=__cult.S;
    return {reagent:S.reagent, credit:S.acadData.s_verdant.credit, mana:S.mana}})()`);
  check('到期后结算并清空远征', !!settled && (await ev('__cult.S.trip')) === null, { id: settled && settled.id });
  check('结算发放材料', after.reagent > before.reagent, { before: before.reagent, after: after.reagent });
  check('结算发放学分', after.credit > before.credit, { before: before.credit, after: after.credit });
  check('结算发放魔力', after.mana > before.mana, { before: Math.round(before.mana), after: Math.round(after.mana) });

  /* ---------- 收益浮动 ---------- */
  await ev(reset);
  const r3 = await ev('__cult.trip.ratio(__cult.trip.byId("d_garden"))');
  await ev('__cult.S.r = 0');
  const r0 = await ev('__cult.trip.ratio(__cult.trip.byId("d_garden"))');
  await ev('__cult.S.r = 9');
  const r9 = await ev('__cult.trip.ratio(__cult.trip.byId("d_garden"))');
  check('同阶 1.0 / 高 3 阶 1.3 / 低于门槛 0.8',
    Math.abs(r3 - 1.3) < 1e-9 && Math.abs(r0 - 1.0) < 1e-9 && Math.abs(r9 - 1.3) < 1e-9,
    { r3, r0, r9 });

  await ev('(function(){var S=__cult.S; S.r=1; S.trip=null; return 1})()');
  const lowRatio = await ev('__cult.trip.ratio(__cult.trip.byId("d_garden"))');
  check('高一阶 1.1', Math.abs(lowRatio - 1.1) < 1e-9, { lowRatio });

  /* ---------- 游历减半 ---------- */
  await ev('(function(){var S=__cult.S; S.r=3; S.posture="pon_zuo"; S.trip=null; return 1})()');
  const durNormal = await ev('__cult.trip.dur(__cult.trip.byId("d_ruins"))');
  await ev('__cult.S.posture = "pon_you"');
  const durWander = await ev('__cult.trip.dur(__cult.trip.byId("d_ruins"))');
  check('游历出发时长减半', Math.abs(durWander / durNormal - 0.5) < 1e-9,
    { durNormal, durWander });

  await ev('(function(){var S=__cult.S; S.trip=null; __cult.trip.depart("d_garden"); return 1})()');
  const durDepart = await ev('__cult.S.trip.endAt - __cult.S.trip.startAt');
  check('出发时写入减半后的结束时间', Math.abs(durDepart - 300000) < 1500, { durDepart });
  await ev('__cult.S.posture = "pon_zuo"; __cult.S.trip = null');

  /* ---------- 轻伤 ---------- */
  await ev('(function(){var S=__cult.S; S.r=3; S.injuryUntil=0; return 1})()');
  const rateBefore = await ev('__cult.econ.spell()');
  await ev('__cult.S.injuryUntil = Date.now() + 10*60000');
  const rateInjured = await ev('__cult.econ.spell()');
  check('轻伤期间咒力产出 −20%', Math.abs(rateInjured / rateBefore - 0.8) < 1e-6,
    { ratio: (rateInjured / rateBefore).toFixed(4) });

  await ev('(function(){var S=__cult.S; S.potions.p_clarity=1; return 1})()');
  await ev('__cult.potion.use("p_clarity")');
  const cleared = await ev('__cult.S.injuryUntil');
  check('清心药剂解除轻伤', cleared === 0, { cleared });

  /* ---------- 面板 ---------- */
  await ev(reset);
  await ev('document.querySelector(".tab[data-id=exped]").click()');
  await sleep(400);
  const cards = await ev('document.querySelectorAll("#panelBody .card").length');
  const ptext = await ev('document.getElementById("panelBody").innerText');
  check('远征面板 4 张卡', cards === 4, { cards });
  check('显示时长与产出', /10:00/.test(ptext) && /材料/.test(ptext), ptext.replace(/\s+/g, ' ').slice(0, 100));

  await shot('t13-exped.png');

  /* 派遣后显示进行中 */
  await ev('document.querySelector("#panelBody [data-dep]").click()');
  await sleep(350);
  const afterDep = await ev('document.getElementById("panelBody").innerText');
  check('派遣后显示进行中与剩余时间', /进行中/.test(afterDep) && /还剩/.test(afterDep),
    afterDep.replace(/\s+/g, ' ').slice(0, 80));

  check('无 console/异常', errors.length === 0, errors.slice(0, 3));

  console.log('\n' + (fails === 0 ? '✅ ALL PASS' : '❌ ' + fails + ' FAIL'));
  await edge.close();
  process.exit(fails === 0 ? 0 : 1);
}

main().catch(e => { console.error('RUN-ERROR', e && e.stack || e); process.exit(1); });
