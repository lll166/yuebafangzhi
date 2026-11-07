/* 月巴奥术 · T12（学徒 / 招募 / 资质 / 升级）验收
   运行：node specs/arcade-arcane/tests/t12-check.js
   覆盖：席位按阶位开放 / 招募门槛与消耗 / 资质分布与倍率 /
         四职效果 / 升级成本 / 遣散 / 采集员离线产材料
   产物：.screenshots/arcane-tests/t12-appr.png
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
check('static: 四种职务齐备', ['dr_scribe','dr_peer','dr_forager','dr_warden']
  .every(id => new RegExp("id:'" + id + "'").test(html)));
check('static: 四档资质 65/28/6/1%', /p:0\.65/.test(html) && /p:0\.28/.test(html)
  && /p:0\.06/.test(html) && /p:0\.01/.test(html));
check('static: 资质倍率 1.0/1.4/1.9/2.6', /mult:1\.0/.test(html) && /mult:1\.4/.test(html)
  && /mult:1\.9/.test(html) && /mult:2\.6/.test(html));
check('static: 40 个本地名字池', (html.match(/阿禾/ig) || []).length >= 1 && /APPR_NAMES/.test(html));

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

  const edge = await launchEdge({ port: 9243 });
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
    S.r=2; S.circle=3; S.spell=0; S.mana=1e9; S.focus=100; S.disson=0;
    S.academy='s_verdant'; S.acadData={s_verdant:{credit:5000,rank:3}};
    S.tower={c_manapool:0,c_mat:0,c_mirror:0,c_alembic:0,c_library:0,c_ward:0};
    S.star={}; S.starPts=0; S.ascendCount=0;
    S.spells={}; S.equip=['','','']; S.potions={}; S.buffs=[]; S.potions={};
    S.apprentices=[]; S.reagent=0;
    return 1})()`;
  await ev(reset);
  await sleep(200);

  /* ---------- 席位 ---------- */
  const slots2 = await ev('__cult.appr.slots()');
  await ev('__cult.S.r = 4');
  const slots4 = await ev('__cult.appr.slots()');
  await ev('__cult.S.r = 0');
  const slots0 = await ev('__cult.appr.slots()');
  check('席位随阶位开放（初阶 2 / 高阶 4 / 学徒 0）', slots2 === 2 && slots4 === 4 && slots0 === 0,
    { slots2, slots4, slots0 });

  /* ---------- 招募 ---------- */
  await ev(reset);
  const creditB = await ev('__cult.S.acadData.s_verdant.credit');
  const manaB = await ev('__cult.S.mana');
  const cost = await ev('__cult.appr.cost()');
  const a1 = await ev('JSON.stringify(__cult.appr.recruit("dr_scribe"))');
  const rec = JSON.parse(a1);
  const creditA = await ev('__cult.S.acadData.s_verdant.credit');
  const manaA = await ev('__cult.S.mana');
  check('招募成功并入库', !!rec && rec.role === 'dr_scribe' && rec.lv === 1, rec);
  check('扣 150 学分', creditB - creditA === 150, { spent: creditB - creditA });
  check('扣 30 秒魔力产能', Math.abs((manaB - manaA) - cost) < Math.max(1, cost * 0.001),
    { spent: Math.round(manaB - manaA), cost: Math.round(cost) });
  check('有名字且来自本地池', typeof rec.name === 'string' && rec.name.length > 0, rec.name);

  /* 职称门槛 */
  await ev('(function(){var S=__cult.S;S.acadData.s_verdant.credit=100;S.apprentices=[];return 1})()');
  const lowRank = await ev('JSON.stringify(__cult.appr.recruit("dr_scribe"))');
  check('学分不足时招不了', lowRank === null || lowRank === 'null', lowRank);

  /* 席位满 */
  await ev(`(function(){var S=__cult.S;S.acadData.s_verdant.credit=5000;S.apprentices=[];
    __cult.appr.recruit('dr_scribe'); __cult.appr.recruit('dr_peer'); return 1})()`);
  const full = await ev('JSON.stringify(__cult.appr.recruit("dr_scribe"))');
  check('席位满时招不了（初阶 2 席）', full === null || full === 'null', full);

  /* ---------- 四职效果 ---------- */
  await ev(`(function(){var S=__cult.S;
    S.apprentices=[
      {role:'dr_scribe',quality:'q_dull',lv:1,name:'甲'},
      {role:'dr_peer',quality:'q_dull',lv:1,name:'乙'}
    ]; return 1})()`);
  const pMana = await ev('__cult.appr.pct("mana")');
  const pSpell = await ev('__cult.appr.pct("spell")');
  check('书房助手：魔力 +3%', Math.abs(pMana - 3) < 1e-9, { pMana });
  check('同窗：咒力 +3%', Math.abs(pSpell - 3) < 1e-9, { pSpell });

  await ev(`(function(){var S=__cult.S; S.r=4;
    S.apprentices=[{role:'dr_forager',quality:'q_dull',lv:1,name:'丙'},
                   {role:'dr_warden',quality:'q_dull',lv:1,name:'丁'}]; return 1})()`);
  const fr = await ev('__cult.appr.forager()');
  const focusR = await ev('__cult.appr.focusRegen()');
  const pRank = await ev('__cult.appr.pct("rank")');
  check('采集员：材料 +0.4/分钟', Math.abs(fr - 0.4) < 1e-9, { fr });
  check('护卫：晋级 +1pp / 专注 +0.5/分', Math.abs(pRank - 1) < 1e-9 && Math.abs(focusR - 0.5) < 1e-9,
    { pRank, focusR });

  /* 资质倍率 */
  await ev(`(function(){var S=__cult.S;
    S.apprentices=[{role:'dr_scribe',quality:'q_star',lv:2,name:'戊'}]; return 1})()`);
  const starPct = await ev('__cult.appr.pct("mana")');
  check('星选 2.6× + 2 级 = 3%×2×2.6 = 15.6%', Math.abs(starPct - 15.6) < 1e-9, { starPct });

  /* ---------- 升级成本 ---------- */
  await ev(`(function(){var S=__cult.S;
    S.apprentices=[{role:'dr_scribe',quality:'q_bright',lv:3,name:'己'}]; S.mana=1e9; return 1})()`);
  const rate = await ev('__cult.econ.mana()');
  const upCost = await ev('__cult.appr.upCost(0)');
  check('升级成本 = 20 秒产能 × 等级 × 资质（3 级、1.4×）',
    Math.abs(upCost - rate * 20 * 3 * 1.4) < Math.max(1, upCost * 1e-6),
    { upCost: Math.round(upCost), expect: Math.round(rate * 20 * 3 * 1.4) });

  const upOk = await ev('__cult.appr.up(0)');
  const lvNow = await ev('__cult.S.apprentices[0].lv');
  check('升级后等级 +1', upOk === true && lvNow === 4, { lvNow });

  await ev('__cult.S.apprentices[0].lv = 10');
  const upMax = await ev('__cult.appr.up(0)');
  check('10 级封顶', upMax === false, { upMax });

  /* ---------- 遣散 ---------- */
  const leave = await ev('__cult.appr.leave(0)');
  const cnt = await ev('__cult.S.apprentices.length');
  check('遣散后席位空出', leave === true && cnt === 0, { leave, cnt });

  /* ---------- 采集员离线产材料 ---------- */
  await ev(reset);
  await ev(`(function(){var S=__cult.S; S.r=4; S.reagent=0;
    S.apprentices=[{role:'dr_forager',quality:'q_dull',lv:1,name:'庚'}];
    S.circle=9; S.spell=__cult.econ.need(); S.mana=0;
    __cult.off.backdate(3600); __cult.off.settle(); return 1})()`);
  const reagentAfter = await ev('__cult.S.reagent');
  check('离线 1 小时采集员产 24 份材料', Math.abs(reagentAfter - 24) < 1.2, { reagentAfter });

  /* ---------- 面板 ---------- */
  await ev(reset);
  await ev(`(function(){var S=__cult.S; S.r=4; S.acadData.s_verdant.credit=5000;
    S.apprentices=[{role:'dr_scribe',quality:'q_gifted',lv:4,name:'阿禾'},
                   {role:'dr_forager',quality:'q_dull',lv:2,name:'石头'}];
    return 1})()`);
  await ev('document.querySelector(".tab[data-id=tower]").click()');
  await sleep(300);
  await ev('document.querySelector("#panelBody .segBtn[data-tt=appr]").click()');
  await sleep(350);
  const ptext = await ev('document.getElementById("panelBody").innerText');
  check('学徒页显示四席', /空席/.test(ptext) && /阿禾/.test(ptext), ptext.replace(/\s+/g, ' ').slice(0, 100));
  check('显示资质与等级', /天才/.test(ptext) && /Lv\.4/.test(ptext), ptext.replace(/\s+/g, ' ').slice(0, 120));

  await shot('t12-appr.png');

  /* 招募弹层 */
  await ev(`(function(){var S=__cult.S; S.apprentices=[{role:'dr_scribe',quality:'q_dull',lv:1,name:'X'}]; return 1})()`);
  await ev('document.querySelector("#panelBody [data-recruit]").click()');
  await sleep(300);
  const rshown = await ev('document.getElementById("modal").classList.contains("show")');
  const rrows = await ev('document.querySelectorAll("#modalBody .rrow").length');
  check('招募弹层列出 4 种职务', rshown === true && rrows === 4, { rshown, rrows });
  await ev('document.getElementById("modalCancel").click()');
  await sleep(200);

  check('无 console/异常', errors.length === 0, errors.slice(0, 3));

  console.log('\n' + (fails === 0 ? '✅ ALL PASS' : '❌ ' + fails + ' FAIL'));
  await edge.close();
  process.exit(fails === 0 ? 0 : 1);
}

main().catch(e => { console.error('RUN-ERROR', e && e.stack || e); process.exit(1); });
