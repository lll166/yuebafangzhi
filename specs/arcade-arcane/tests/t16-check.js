/* 月巴奥术 · T16（封圣 / 星图）验收
   运行：node specs/arcade-arcane/tests/t16-check.js
   覆盖：封圣条件与星辉公式 / 重置与保留清单 / 星图五项效果 /
         传承开局 5 环 / 二次封圣累加 / 月巴之塔永久解锁
   产物：.screenshots/arcane-tests/t16-ascend.png
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
check('static: 星辉公式 1.5 次方 / 8', /ASCEND_POW:1\.5/.test(html) && /ASCEND_DIV:8/.test(html));
check('static: 五项星图天赋', ['ins_flash','ins_poise','ins_starsense','ins_gift','ins_legacy']
  .every(id => new RegExp("id:'" + id + "'").test(html)));

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

  const edge = await launchEdge({ port: 9247 });
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

  /* ---------- 封圣条件与星辉 ---------- */
  const notReady = await ev('__cult.star.can()');
  check('未到大魔法师 9 环时不可封圣', notReady === false, { notReady });

  const pts = await ev(`(function(){var S=__cult.S;
    S.r=9; S.circle=9; return __cult.star.pts();})()`);
  check('满 90 环可得 106 点星辉', pts === 106, { pts });

  /* ---------- 重置与保留 ---------- */
  await ev(`(function(){var S=__cult.S;
    S.r=9; S.circle=9; S.spell=1e9; S.mana=1e9; S.pages=88; S.reagent=66;
    S.tower={c_manapool:12,c_mat:9,c_mirror:7,c_alembic:5,c_library:6,c_ward:4};
    S.spells={'t_mana_gold':{lv:7,n:3}}; S.equip=['t_mana_gold','',''];
    S.potions={p_mana:9}; S.buffs=[{kind:'mana',pct:70,remainMs:600000}];
    S.apprentices=[{role:'dr_scribe',quality:'q_dull',lv:5,name:'甲'}];
    S.ach=['a_first_break']; S.codex={'t_mana_gold':1};
    S.star={ins_flash:2}; S.starPts=3; S.ascendCount=0;
    S.acadData={s_verdant:{credit:2500,rank:2}};
    S.trip={id:'d_garden',startAt:Date.now(),endAt:Date.now()+1,durMs:1};
    return 1})()`);
  const before = await ev('({starPts:__cult.S.starPts, pts:__cult.star.pts()})');
  const res = await ev('JSON.stringify(__cult.star.ascend())');
  const a = JSON.parse(res);
  check('封圣发放星辉', !!a && a.pts === 106, a);

  const after = await ev(`(function(){var S=__cult.S;return {
    r:S.r, circle:S.circle, mana:S.mana, pages:S.pages, reagent:S.reagent,
    tower:S.tower.c_manapool, spellLv:S.spells.t_mana_gold.lv, equip:S.equip.join(''),
    potions:Object.keys(S.potions).length, buffs:S.buffs.length,
    appr:S.apprentices.length, credit:S.acadData.s_verdant.credit,
    rank:S.acadData.s_verdant.rank, trip:S.trip,
    ach:S.ach.length, codex:Object.keys(S.codex).length,
    star:S.star.ins_flash, starPts:S.starPts, ascend:S.ascendCount
  }})()`);
  check('境界回到学徒', after.r === 0, { r: after.r });
  check('环数回到 1（未点传承）', after.circle === 1, { circle: after.circle });
  check('洞府归零', after.tower === 0, { tower: after.tower });
  check('功法等级归零到 1 级', after.spellLv === 1, { spellLv: after.spellLv });
  check('丹药/材料/残页清空', after.potions === 0 && after.reagent === 0 && after.pages === 0, after);
  check('学徒清空', after.appr === 0, { appr: after.appr });
  check('学院学分与职称重置', after.credit === 0 && after.rank === 0, { credit: after.credit, rank: after.rank });
  check('远征清空', after.trip === null, { trip: after.trip });
  check('成就与图鉴保留', after.ach === 1 && after.codex === 1, { ach: after.ach, codex: after.codex });
  check('星图加点保留', after.star === 2, { star: after.star });
  check('星辉累加（3 + 106）', after.starPts === before.starPts + 106, { starPts: after.starPts });
  check('封圣次数 +1', after.ascend === 1, { ascend: after.ascend });

  /* ---------- 星图效果 ---------- */
  await ev('(function(){var S=__cult.S; S.star={ins_flash:0,ins_poise:0,ins_starsense:0,ins_gift:0,ins_legacy:0}; S.starPts=0; S.r=2; S.circle=3; return 1})()');
  const flashBefore = await ev('__cult.econ.mana()');
  await ev('__cult.S.starPts = 100; __cult.star.buy("ins_flash")');
  const flashAfter = await ev('__cult.econ.mana()');
  check('灵光 1 级：全产出 +10%',
    Math.abs(flashAfter / flashBefore - 1.1) < 1e-6, { ratio: (flashAfter / flashBefore).toFixed(4) });

  const poiseBefore = await ev('__cult.mood.breakdown().star');
  await ev('__cult.star.buy("ins_poise")');
  const poiseAfter = await ev('__cult.mood.breakdown().star');
  check('定力 1 级：晋级 +5pp', poiseAfter - poiseBefore === 5, { poiseBefore, poiseAfter });

  const offBefore = await ev('__cult.econ.off()');
  await ev('__cult.star.buy("ins_starsense")');
  const offAfter = await ev('__cult.econ.off()');
  check('星感 1 级：离线效率 +5%', Math.abs((offAfter - offBefore) - 0.05) < 1e-9,
    { offBefore, offAfter });

  const slotBefore = await ev('__cult.spell.slots()');
  await ev('__cult.S.starPts = 100; __cult.star.buy("ins_gift")');
  const slotAfter = await ev('__cult.spell.slots()');
  check('天赋：法术槽 +1', slotAfter === slotBefore + 1, { slotBefore, slotAfter });

  /* ---------- 传承 ---------- */
  await ev(`(function(){var S=__cult.S;
    S.starPts=100; __cult.star.buy('ins_legacy');
    S.r=9; S.circle=9;
    __cult.star.ascend();
    return 1})()`);
  const legacyCircle = await ev('__cult.S.circle');
  check('传承生效：新周目从学徒 5 环起', legacyCircle === 5, { legacyCircle });

  /* ---------- 月巴之塔永久解锁 ---------- */
  const bany = await ev('__cult.acad.unlocked("s_bany")');
  check('封圣后月巴之塔解锁', bany === true, { bany });

  /* ---------- 二次封圣累加 ---------- */
  const ptsBefore2 = await ev('__cult.S.starPts');
  const a2 = await ev(`(function(){var S=__cult.S; S.r=9; S.circle=9; S.ascendCount=1;
    var r = __cult.star.ascend(); return r ? {pts:r.pts, total:r.total, count:r.count} : null})()`);
  check('第二周目可再次封圣', !!a2 && a2.pts === 106, a2);
  check('星辉继续累加', a2.total === ptsBefore2 + 106, { before: ptsBefore2, after: a2.total });
  check('封圣次数为 2', a2.count === 2, { count: a2.count });

  /* ---------- 面板 ---------- */
  await ev('(function(){var S=__cult.S; S.ascendCount=2; S.starPts=50; return 1})()');
  await ev('document.querySelector(".tab[data-id=academy]").click()');
  await sleep(350);
  const segCount = await ev('document.querySelectorAll("#panelBody .segBtn").length');
  check('封圣后学院面板出现「星图」页签', segCount === 2, { segCount });

  await ev('(function(){var b=document.querySelectorAll("#panelBody .segBtn"); b[1].click(); return 1})()');
  await sleep(350);
  const starCards = await ev('document.querySelectorAll("#panelBody .card").length');
  const starText = await ev('document.getElementById("panelBody").innerText');
  check('星图 5 项天赋', starCards === 5, { starCards });
  check('显示星辉与加点成本', /星辉/.test(starText) && /加点|星辉不足|已满/.test(starText),
    starText.replace(/\s+/g, ' ').slice(0, 90));

  await shot('t16-ascend.png');

  check('无 console/异常', errors.length === 0, errors.slice(0, 3));

  console.log('\n' + (fails === 0 ? '✅ ALL PASS' : '❌ ' + fails + ' FAIL'));
  await edge.close();
  process.exit(fails === 0 ? 0 : 1);
}

main().catch(e => { console.error('RUN-ERROR', e && e.stack || e); process.exit(1); });
