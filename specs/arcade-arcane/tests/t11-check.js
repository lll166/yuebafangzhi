/* 月巴奥术 · T11（魔药 / 炼药 / 增益）验收
   运行：node specs/arcade-arcane/tests/t11-check.js
   覆盖：炼药扣魔力与材料 / 库存上限 / 增益叠加上限 3 种 /
         同种刷新不同种叠加 / 离线不消耗时长 / 炼金台放大 / 回响药剂不溢出
   产物：.screenshots/arcane-tests/t11-potion.png
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
check('static: 五种魔药齐备', ['p_mana','p_spell','p_ascend','p_clarity','p_echo']
  .every(id => new RegExp("id:'" + id + "'").test(html)));
check('static: 离线期间增益暂停（suppressBuffs）', /suppressBuffs = true/.test(html));

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

  const edge = await launchEdge({ port: 9242 });
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
    S.r=2; S.circle=5; S.spell=0; S.mana=1e9; S.focus=60; S.disson=2; S.dissonEndAt=Date.now()+9*60000;
    S.academy='s_verdant'; S.acadData={s_verdant:{credit:0,rank:0}};
    S.tower={c_manapool:0,c_mat:0,c_mirror:0,c_alembic:0,c_library:0,c_ward:0};
    S.star={}; S.starPts=0; S.ascendCount=0;
    S.spells={}; S.equip=['','','']; S.potions={}; S.buffs=[]; S.draughtArmed=false;
    S.reagent=20; S.pages=0;
    return 1})()`;
  await ev(reset);
  await sleep(200);

  /* ---------- 炼药扣资源 ---------- */
  const manaB = await ev('__cult.S.mana');
  const reagentB = await ev('__cult.S.reagent');
  const cost = await ev('__cult.potion.cost(__cult.potion.byId("p_mana"))');
  const okBrew = await ev('__cult.potion.brew("p_mana")');
  const manaA = await ev('__cult.S.mana');
  const reagentA = await ev('__cult.S.reagent');
  const stock = await ev('__cult.S.potions.p_mana');
  check('炼药成功并入库', okBrew === true && stock === 1, { okBrew, stock });
  check('扣除 30 秒魔力产能', Math.abs((manaB - manaA) - cost) < Math.max(1, cost * 0.001),
    { spent: Math.round(manaB - manaA), cost: Math.round(cost) });
  check('扣除 3 份材料', reagentB - reagentA === 3, { spent: reagentB - reagentA });

  /* 材料不足 */
  await ev('__cult.S.reagent = 1');
  const brewFail = await ev('__cult.potion.brew("p_spell")');
  check('材料不足时炼不了', brewFail === false, { brewFail });
  await ev('__cult.S.reagent = 20');

  /* ---------- 使用与增益 ----------
     翠庭学院有「魔药效果 +20%」，所以 70% 实际是 84% */
  const rateBefore = await ev('__cult.econ.mana()');
  const useRes = await ev('__cult.potion.use("p_mana")');
  const rateAfter = await ev('__cult.econ.mana()');
  const pctMana = await ev('__cult.potion.pct("mana")');
  check('服用后增益生效（70% × 翠庭 +20% = 84%）', useRes && useRes.ok === true && Math.abs(pctMana - 84) < 1e-6, { pctMana });
  check('产能按加算提升（翠庭 30% + 84% → 1.30/2.14 的比值）',
    Math.abs(rateAfter / rateBefore - (1 + 84 / 130)) < 1e-6,
    { ratio: (rateAfter / rateBefore).toFixed(4) });
  check('库存扣 1', (await ev('__cult.S.potions.p_mana')) === 0);

  const chip = await ev('(document.getElementById("buffBar").innerText||"").trim()');
  check('HUD 出现增益芯片', /魔力/.test(chip) && /\d+:\d\d/.test(chip), chip);

  /* 同种刷新：再喝一次，仍然只有一条 */
  await ev('__cult.S.potions.p_mana = 2');
  await ev('__cult.potion.use("p_mana")');
  const buffCount = await ev('__cult.S.buffs.length');
  check('同类增益刷新而不是叠加', buffCount === 1, { buffCount });

  /* ---------- 最多 3 种 ----------
     用 3 个不含 spell 的类别占位，再喝咒力药剂才会撞上限 */
  await ev(`(function(){var S=__cult.S;
    S.buffs=[{kind:'mana',pct:70,remainMs:600000},{kind:'off',pct:5,remainMs:600000},{kind:'cast',pct:50,remainMs:600000}];
    S.potions.p_spell=1; return 1})()`);
  const over = await ev('__cult.potion.use("p_spell")');
  check('第 4 种增益被拒绝', over && over.ok === false && over.why === 'maxBuff', over);
  const stillThree = await ev('__cult.S.buffs.length');
  const stockKept = await ev('__cult.S.potions.p_spell');
  check('仍然是 3 种，且药剂没被消耗', stillThree === 3 && stockKept === 1, { stillThree, stockKept });

  /* ---------- 离线不消耗时长 ---------- */
  await ev(`(function(){var S=__cult.S;
    S.buffs=[{kind:'mana',pct:70,remainMs:600000}];
    S.ts = Date.now() - 8*3600*1000;
    __cult.off.settle();
    return 1})()`);
  const remainAfterOffline = await ev('__cult.S.buffs.length ? __cult.S.buffs[0].remainMs : -1');
  check('离线 8 小时不消耗增益时长', Math.abs(remainAfterOffline - 600000) < 2000,
    { remainAfterOffline });

  /* 离线收益里不含增益（暂停生效） */
  await ev(reset);
  await ev('__cult.S.buffs=[{kind:"mana",pct:70,remainMs:600000}]');
  const ratePaused = await ev('__cult.econ.mana()');
  const info = await ev(`(function(){
    var S=__cult.S; S.circle=9; S.spell=__cult.econ.need(); S.mana=0;
    __cult.off.backdate(3600);
    var r = __cult.off.settle();
    return r ? {mana: r.mana} : null;
  })()`);
  const probe = await ev(`(function(){
    var S=__cult.S; var saved=S.buffs; S.buffs=[];
    var r = __cult.econ.mana(); S.buffs=saved; return r;
  })()`);
  check('离线结算期间增益不参与收益',
    info && Math.abs(info.mana / (3600 * 0.6) - probe) < probe * 0.02,
    { impliedRate: info ? (info.mana / (3600 * 0.6)).toFixed(3) : null, probe: probe.toFixed(3) });

  /* ---------- 炼金台放大 ---------- */
  const baseDur = await ev('__cult.potion.dur(__cult.potion.byId("p_mana"))');
  const baseEff = await ev('__cult.potion.effect(__cult.potion.byId("p_mana"))');
  await ev('__cult.S.tower.c_alembic = 10');
  const boostDur = await ev('__cult.potion.dur(__cult.potion.byId("p_mana"))');
  const boostEff = await ev('__cult.potion.effect(__cult.potion.byId("p_mana"))');
  check('炼金台 10 级：时长 +60%', Math.abs(boostDur / baseDur - 1.6) < 1e-6,
    { ratio: (boostDur / baseDur).toFixed(3) });
  check('炼金台 10 级：效果 +60%', Math.abs(boostEff / baseEff - 1.6) < 1e-6,
    { ratio: (boostEff / baseEff).toFixed(3) });
  await ev('__cult.S.tower.c_alembic = 0');

  /* ---------- 清心 / 晋阶 / 回响 ---------- */
  await ev(`(function(){var S=__cult.S; S.focus=40; S.disson=2; S.dissonEndAt=Date.now()+9*60000;
    S.potions.p_clarity=1; return 1})()`);
  await ev('__cult.potion.use("p_clarity")');
  const f2 = await ev('__cult.S.focus');
  const d2 = await ev('__cult.S.disson');
  check('清心药剂：专注 +40、清 1 层杂念', Math.abs(f2 - 80) < 1e-6 && d2 === 1, { f2, d2 });

  await ev('__cult.S.potions.p_ascend = 1');
  await ev('__cult.potion.use("p_ascend")');
  const armed = await ev('__cult.S.draughtArmed');
  const bd = await ev('__cult.mood.breakdown()');
  check('晋阶药剂：装填后成功率 +12pp', armed === true && Math.abs(bd.pill - 12) < 1e-6,
    { armed, pill: bd.pill });

  await ev(`(function(){var S=__cult.S; S.circle=9; S.spell=0; S.mana=1e9; S.buffs=[]; S.potions.p_echo=1; return 1})()`);
  const useEcho = await ev('__cult.potion.use("p_echo")');
  const echoSpell = await ev('__cult.S.spell');
  const needEcho = await ev('__cult.econ.need()');
  check('回响药剂：咒力不超本环上限', useEcho.ok === true && echoSpell <= needEcho + 1e-9,
    { echoSpell, needEcho, waste: useEcho.waste });
  check('超出的部分给出丢弃提示', useEcho.waste === true, useEcho);

  await ev('(function(){var S=__cult.S; S.circle=9; S.spell=__cult.econ.need(); S.potions.p_echo=1; return 1})()');
  const echoFull = await ev('__cult.potion.use("p_echo")');
  check('9 环已满时用不上', echoFull.ok === false && echoFull.why === 'full', echoFull);

  /* ---------- 面板 ---------- */
  await ev(reset);
  await ev(`(function(){var S=__cult.S; S.reagent=20; S.potions={p_mana:3,p_echo:1}; return 1})()`);
  await ev('document.querySelector(".tab[data-id=tower]").click()');
  await sleep(350);
  await ev('document.querySelector("#panelBody .segBtn[data-tt=potion]").click()');
  await sleep(350);
  const ptext = await ev('document.getElementById("panelBody").innerText');
  const cards = await ev('document.querySelectorAll("#panelBody .card").length');
  check('炼药页 5 张魔药卡', cards === 5, { cards });
  check('显示库存与配方', /库存/.test(ptext) && /材料/.test(ptext), ptext.replace(/\s+/g, ' ').slice(0, 90));

  await shot('t11-potion.png');

  check('无 console/异常', errors.length === 0, errors.slice(0, 3));

  console.log('\n' + (fails === 0 ? '✅ ALL PASS' : '❌ ' + fails + ' FAIL'));
  await edge.close();
  process.exit(fails === 0 ? 0 : 1);
}

main().catch(e => { console.error('RUN-ERROR', e && e.stack || e); process.exit(1); });
