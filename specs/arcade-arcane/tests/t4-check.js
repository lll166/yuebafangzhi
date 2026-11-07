/* 月巴奥术 · T4（晋级判定 / 失败惩罚 / 杂念 / 弹层）验收
   运行：node specs/arcade-arcane/tests/t4-check.js
   覆盖：9 环按钮态 / 弹层明细与合计 / 成功链路 / 失败链路 /
         成功率一致性 / 失败后 <5 分钟可恢复 / 杂念 HUD / 无 NaN
   产物：.screenshots/arcane-tests/t4-break.png
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

  const edge = await launchEdge({ port: 9232 });
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
  const txt = sel => ev('(document.querySelector(' + JSON.stringify(sel) + ')||{textContent:"?"}).textContent.trim()');
  const shot = async name => {
    const { data } = await cdp.send('Page.captureScreenshot', { format: 'png' }, sessionId);
    fs.writeFileSync(path.join(OUT, name), Buffer.from(data, 'base64'));
    console.log('SHOT ' + name);
  };

  const done = cdp.waitEvent('Page.loadEventFired', 15000);
  await cdp.send('Page.navigate', { url: GAME_URL + '?debug=1' }, sessionId);
  await done;
  await sleep(800);

  /* 先清环境（学院/设施/装备中的法术），再按清洁状态算成本与需求 */
  await ev('(function(){var S=__cult.S;' +
           'S.r=0;S.circle=9;S.focus=100;S.disson=0;S.dissonEndAt=0;S.draughtArmed=false;' +
           'S.academy="s_verdant";S.acadData={s_verdant:{credit:0,rank:0}};' +
           'S.tower={c_manapool:0,c_mat:0,c_mirror:0,c_alembic:0,c_library:0,c_ward:0};' +
           'S.spells={};S.equip=["","",""];S.apprentices=[];' +
           'S.mana=__cult.econ.cost()*3;S.spell=__cult.econ.need();return 1})()');
  await sleep(400);

  const btnText = await txt('#btnMain');
  const btnDisabled = await ev('document.getElementById("btnMain").disabled');
  check('9 环按钮显示「晋级」且可用', btnText.indexOf('晋级') >= 0 && btnDisabled === false, { btnText, btnDisabled });

  const spellA = await ev('__cult.S.spell');
  await sleep(1200);
  const spellB = await ev('__cult.S.spell');
  check('9 环咒力封顶不再增加', Math.abs(spellB - spellA) < 1e-6, { spellA, spellB });

  await ev('document.getElementById("btnMain").click()');
  await sleep(350);
  const shown = await ev('document.getElementById("modal").classList.contains("show")');
  const rows = await ev('document.querySelectorAll("#modalBody .mrow").length');
  check('弹层打开且明细齐全', shown === true && rows >= 8, { shown, rows });

  const totalTxt = await txt('#modalBody .mrow.total .v');
  const rateNow = await ev('__cult.econ.rate()');
  check('合计与 rankUpRate() 一致',
    Math.abs(parseFloat(totalTxt) - rateNow * 100) < 0.15, { totalTxt, rateNow });

  const rowLabels = await ev('Array.from(document.querySelectorAll("#modalBody .mrow .k")).map(e=>e.textContent)');
  const need = ['基础', '设施', '法术', '学院', '晋阶药剂', '专注', '合计', '消耗魔力', '现有魔力'];
  check('明细六项 + 合计 + 消耗/现有', need.every(n => rowLabels.indexOf(n) >= 0), rowLabels);

  await shot('t4-break.png');

  const manaBefore = await ev('__cult.S.mana');
  const costNow = await ev('__cult.econ.cost()');
  await ev('window.__randSave = Math.random; Math.random = function(){ return 0; }');
  await ev('document.getElementById("modalOk").click()');
  await sleep(300);
  const afterR = await ev('__cult.S.r');
  const afterCircle = await ev('__cult.S.circle');
  const afterSpell = await ev('__cult.S.spell');
  const afterMana = await ev('__cult.S.mana');
  await ev('Math.random = window.__randSave');
  check('成功：阶位 +1', afterR === 1, { afterR });
  const need1 = await ev('__cult.econ.need()');
  check('成功：回到第 1 环且咒力接近清零', afterCircle === 1 && afterSpell < need1 * 0.05,
    { afterCircle, afterSpell, need1 });
  check('成功：消耗全额魔力', Math.abs((manaBefore - afterMana) - costNow) < Math.max(1, costNow * 0.01),
    { manaBefore, afterMana, costNow });

  await ev('(function(){var S=__cult.S;S.r=0;S.circle=9;S.focus=100;S.disson=0;S.dissonEndAt=0;' +
           'S.draughtArmed=false;S.mana=1e9;S.spell=__cult.econ.need();return 1})()');
  const needB = await ev('__cult.econ.need()');
  const costB = await ev('__cult.econ.cost()');
  const manaB = await ev('__cult.S.mana');
  await ev('window.__randSave = Math.random; Math.random = function(){ return 0.999999; }');
  const failRes = await ev('(function(){var r=__cult.brk.do();return {ok:r&&r.ok}})()');
  const fSpell = await ev('__cult.S.spell');
  const fFocus = await ev('__cult.S.focus');
  const fDisson = await ev('__cult.S.disson');
  const fMana = await ev('__cult.S.mana');
  await ev('Math.random = window.__randSave');
  check('失败判定生效', failRes && failRes.ok === false, failRes);
  check('失败：咒力回落到 35%', Math.abs(fSpell - needB * 0.35) < needB * 0.001, { fSpell, need: needB });
  check('失败：专注 −25', Math.abs(fFocus - 75) < 1e-6, { fFocus });
  check('失败：杂念 +1', fDisson === 1, { fDisson });
  check('失败：魔力只损失 50%', Math.abs((manaB - fMana) - costB * 0.5) < Math.max(1, costB * 0.01),
    { lost: manaB - fMana, expect: costB * 0.5 });

  await sleep(400);
  const dissonShown = await ev('!document.getElementById("hudDisson").hidden');
  check('杂念出现在 HUD', dissonShown === true);

  const recover = await ev('(__cult.econ.need()*(1-0.35))/__cult.econ.spell()');
  check('失败后 <300 秒可补满咒力', recover > 0 && recover < 300, { recover });

  const stat = await ev('(function(){var S=__cult.S;var n=0,N=2000;' +
    'for(var i=0;i<N;i++){S.r=0;S.circle=9;S.mana=1e15;S.focus=100;S.disson=0;S.draughtArmed=false;' +
    'S.spell=__cult.econ.need();' +
    'var r=__cult.brk.do();if(r&&r.ok)n++;}' +
    'S.r=0;S.circle=9;S.focus=100;S.disson=0;S.spell=__cult.econ.need();return n/N})()');
  const rate = await ev('__cult.econ.rate()');
  check('2000 次成功率与理论偏差 <3pp', Math.abs(stat - rate) < 0.03,
    { measured: (stat * 100).toFixed(1), theory: (rate * 100).toFixed(1) });

  const st = await ev('__cult.selftest().filter(function(s){return s.indexOf("FAIL")===0})');
  check('内置 selftest 全 PASS', Array.isArray(st) && st.length === 0, st);

  const dirty = await ev('(document.body.innerText||"").match(/NaN|undefined|Infinity/g)');
  check('UI 无 NaN/undefined/Infinity', !dirty, dirty);
  check('无 console/异常', errors.length === 0, errors.slice(0, 3));

  console.log('\n' + (fails === 0 ? '✅ ALL PASS' : '❌ ' + fails + ' FAIL'));
  await edge.close();
  process.exit(fails === 0 ? 0 : 1);
}

main().catch(e => { console.error('RUN-ERROR', e && e.stack || e); process.exit(1); });
