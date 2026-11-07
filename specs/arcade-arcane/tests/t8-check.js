/* 月巴奥术 · T8（专注 / 杂念 / 晋级成功率合成）验收
   运行：node specs/arcade-arcane/tests/t8-check.js
   覆盖：5 层杂念 −30% 产出 / 磐石堡抑制减半 / 专注正负修正 /
         设施加成封顶 15pp / 总成功率封顶 95% / 明细可加总 /
         杂念按到期时间逐层消退（含后台积压）/ 刷新保留剩余时间
   产物：.screenshots/arcane-tests/t8-cap.png
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
check('static: 设施+法术封顶 15pp', /CAVE_BREAK_CAP:0\.15/.test(html));
check('static: 学院封顶 8pp', /ACAD_BREAK_CAP:0\.08/.test(html));
check('static: 成功率上下限 95/20', /BREAK_RATE_CAP:0\.95/.test(html) && /BREAK_RATE_FLOOR:0\.20/.test(html));
check('static: 杂念每层 −6% / 10 分钟', /DISSON_PENALTY:6/.test(html) && /DISSON_MIN:10/.test(html));

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

  const edge = await launchEdge({ port: 9237 });
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
  const load = async (url) => {
    const done = cdp.waitEvent('Page.loadEventFired', 15000);
    await cdp.send('Page.navigate', { url }, sessionId);
    await done;
    await sleep(750);
  };

  const reset = `(function(){var S=__cult.S;S.r=0;S.circle=9;S.spell=__cult.econ.need();S.mana=1e9;
    S.focus=100;S.disson=0;S.dissonEndAt=0;S.draughtArmed=false;
    S.academy='s_verdant';S.acadData={s_verdant:{credit:0,rank:0}};
    S.tower={c_manapool:0,c_mat:0,c_mirror:0,c_alembic:0,c_library:0,c_ward:0};
    S.star={}; S.starPts=0; S.ascendCount=0;
    S.spells={};S.equip=['','',''];S.apprentices=[];S.buffs=[];
    return 1})()`;

  await load(GAME_URL + '?debug=1');
  await ev(reset);
  await sleep(200);

  /* ---------- 杂念惩罚 ---------- */
  const rate0 = await ev('__cult.econ.mana()');
  await ev('__cult.S.disson = 5; __cult.S.dissonEndAt = Date.now() + 10*60000;');
  const rate5 = await ev('__cult.econ.mana()');
  const mod5 = await ev('__cult.mood.dissonMod()');
  check('5 层杂念：产出系数 −30%', Math.abs(mod5 + 0.30) < 1e-9, { mod5 });
  check('5 层杂念：实际产能 ×0.70', Math.abs(rate5 / rate0 - 0.70) < 0.002,
    { rate5, rate0, ratio: (rate5 / rate0).toFixed(4) });

  /* 磐石堡（杂念 −50%） */
  await ev('__cult.S.academy = "s_stonehold"');
  const mod5b = await ev('__cult.mood.dissonMod()');
  check('磐石堡：杂念惩罚减半（−15%）', Math.abs(mod5b + 0.15) < 1e-9, { mod5b });

  /* ---------- 专注 ---------- */
  await ev('__cult.S.academy = "s_verdant"; __cult.S.disson = 0; __cult.S.dissonEndAt = 0;');
  const rateF100 = await ev('__cult.econ.mana()');
  await ev('__cult.S.focus = 0');
  const rateF0 = await ev('__cult.econ.mana()');
  /* 专注修正是 (专注-50)×0.2%，所以 100 → ×1.10，0 → ×0.90；两者之比是 0.90/1.10 */
  check('专注 100 → 0 时产能比例 = 0.90/1.10',
    Math.abs(rateF0 / rateF100 - 0.90 / 1.10) < 0.002,
    { ratio: (rateF0 / rateF100).toFixed(4), expect: (0.90 / 1.10).toFixed(4) });
  check('专注 50 是中性点', Math.abs((await ev('(function(){__cult.S.focus=50;return __cult.mood.focusMod()})()'))) < 1e-9);

  await ev('__cult.S.focus = 100');
  const rk100 = await ev('__cult.econ.rate()');
  await ev('__cult.S.focus = 0');
  const rk0 = await ev('__cult.econ.rate()');
  check('专注 0~100 对成功率影响 ±20pp', Math.abs((rk100 - rk0) - 0.20) < 1e-6,
    { rk100, rk0 });

  /* ---------- 设施加成封顶 ---------- */
  await ev('__cult.S.focus = 100; __cult.S.tower.c_ward = 20;');
  const bd = await ev('__cult.mood.breakdown()');
  check('守护法阵 20 级 = 15pp 且不超封顶', Math.abs(bd.cave - 15) < 1e-9, { cave: bd.cave });
  check('设施+法术合计不超过 15pp', bd.cave + bd.book <= 15 + 1e-9, { cave: bd.cave, book: bd.book });

  /* ---------- 总成功率封顶 ---------- */
  await ev('__cult.S.r = 0; __cult.S.academy = "s_stonehold"; __cult.S.draughtArmed = true; __cult.S.focus = 100;');
  const bdCap = await ev('__cult.mood.breakdown()');
  check('叠满后仍不超过 95%', bdCap.total <= 95 + 1e-9, { total: bdCap.total });
  check('触顶时给出硬上限标记', bdCap.hardCapped === true, { hardCapped: bdCap.hardCapped });
  /* 明细各项本身不做总封顶，所以它们之和是 127，而合计显示 95 */
  const sum = bdCap.base + bdCap.cave + bdCap.book + bdCap.sect + bdCap.pill + bdCap.focus;
  check('明细各项分别取值正确（82+15+0+8+12+10=127）',
    Math.abs(sum - 127) < 1e-6,
    { base: bdCap.base, cave: bdCap.cave, sect: bdCap.sect, pill: bdCap.pill, focus: bdCap.focus, sum });

  /* 弹层：合计与明细都在 */
  await ev('__cult.brk.open()');
  await sleep(350);
  const rows = await ev('document.querySelectorAll("#modalBody .mrow").length');
  const totalTxt = await ev('(document.querySelector("#modalBody .mrow.total .v")||{}).textContent');
  const noteTxt = await ev('(document.querySelector("#modalBody .mnote")||{}).textContent');
  check('弹层合计显示 95%', totalTxt === '95%', { totalTxt });
  check('弹层给出上限提示', /上限/.test(noteTxt || ''), { noteTxt, rows });

  const { data } = await cdp.send('Page.captureScreenshot', { format: 'png' }, sessionId);
  fs.writeFileSync(path.join(OUT, 't8-cap.png'), Buffer.from(data, 'base64'));
  console.log('SHOT t8-cap.png');

  await ev('__cult.brk.close()');
  await sleep(200);

  /* ---------- 杂念逐层消退 ----------
     链条：第一层 5 分钟前到期，之后每层 +10 分钟 → 到期点 -5、+5、+15
     所以此刻只会退掉 1 层。 */
  await ev(reset);
  await ev(`(function(){var S=__cult.S;S.disson=3;S.dissonEndAt=Date.now()-5*60000;return 1})()`);
  await ev('__cult.mood.tick()');
  const after5 = await ev('__cult.S.disson');
  const nextEnd = await ev('__cult.S.dissonEndAt - Date.now()');
  check('到期 5 分钟：只退 1 层，剩余按链条推进', after5 === 2 && nextEnd > 4.5 * 60000,
    { after5, nextMs: Math.round(nextEnd) });

  await ev(`(function(){var S=__cult.S;S.disson=3;S.dissonEndAt=Date.now()-25*60000;return 1})()`);
  await ev('__cult.mood.tick()');
  const after25 = await ev('__cult.S.disson');
  check('积压 25 分钟：三层全部退完', after25 === 0, { after25 });

  await ev(`(function(){var S=__cult.S;S.disson=3;S.dissonEndAt=Date.now()-31*60000;return 1})()`);
  await ev('__cult.mood.tick()');
  const after31 = await ev('__cult.S.disson');
  const endAt = await ev('__cult.S.dissonEndAt');
  check('积压 31 分钟：全部退完', after31 === 0 && endAt === 0, { after31, endAt });

  /* ---------- 刷新保留剩余时间 ---------- */
  await ev('(function(){var S=__cult.S;S.disson=2;S.dissonEndAt=Date.now()+5*60000;__cult.save();return 1})()');
  await load(GAME_URL + '?debug=1');
  const dissonReload = await ev('__cult.S.disson');
  const leftReload = await ev('__cult.S.dissonEndAt - Date.now()');
  check('刷新后杂念层数保留', dissonReload === 2, { dissonReload });
  check('刷新后剩余时间保留（≈5 分钟）', leftReload > 4.5 * 60000 && leftReload < 5.2 * 60000,
    { leftMs: Math.round(leftReload) });

  check('无 console/异常', errors.length === 0, errors.slice(0, 3));

  console.log('\n' + (fails === 0 ? '✅ ALL PASS' : '❌ ' + fails + ' FAIL'));
  await edge.close();
  process.exit(fails === 0 ? 0 : 1);
}

main().catch(e => { console.error('RUN-ERROR', e && e.stack || e); process.exit(1); });
