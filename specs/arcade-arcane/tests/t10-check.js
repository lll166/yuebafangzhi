/* 月巴奥术 · T10（法术 / 抽取 / 保底 / 残页 / 装备）验收
   运行：node specs/arcade-arcane/tests/t10-check.js
   覆盖：24 个法术与四品阶 / 80 抽金阶保底 / 重复转残页 /
         抽卡成本随次数上升 / 装备与卸下影响产能 / 升级消耗残页 / 槽位按阶位开放
   产物：.screenshots/arcane-tests/t10-spell.png
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
check('static: 掉落率 60/28/10/2', /TIER_P:\[0\.60,0\.28,0\.10,0\.02\]/.test(html));
check('static: 金阶保底 80 抽', /PITY_GOLD:80/.test(html));
check('static: 残页 1/2/4/8', /TIER_PAGES:\[1,2,4,8\]/.test(html));
check('static: 抽卡成本递增 2%', /DRAW_INFLATE:0\.02/.test(html));
check('static: 升级倍率 0.18 / 上限 10 级', /BOOK_LV_GROW:0\.18/.test(html) && /BOOK_MAX_LV:10/.test(html));

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

  const edge = await launchEdge({ port: 9239 });
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

  const done = cdp.waitEvent('Page.loadEventFired', 25000);
  await cdp.send('Page.navigate', { url: GAME_URL + '?debug=1' }, sessionId);
  await done;
  await sleep(800);

  const reset = `(function(){var S=__cult.S;
    S.r=2; S.circle=1; S.mana=1e9; S.spell=0; S.focus=100; S.disson=0;
    S.academy='s_verdant'; S.acadData={s_verdant:{credit:0,rank:0}};
    S.tower={c_manapool:0,c_mat:0,c_mirror:0,c_alembic:0,c_library:0,c_ward:0};
    S.star={}; S.starPts=0; S.ascendCount=0;
    S.spells={}; S.equip=['','','']; S.pages=0; S.pity=0; S.draws=0;
    return 1})()`;
  await ev(reset);
  await sleep(150);

  /* ---------- 数据完整性 ---------- */
  const total = await ev('__cult.spell.all.length');
  const byTier = await ev(`(function(){var o={white:0,blue:0,purple:0,gold:0};
    __cult.spell.all.forEach(function(s){o[s.tier]++});return o})()`);
  check('24 个法术', total === 24, { total });
  check('四品阶各 6 个', byTier.white === 6 && byTier.blue === 6 && byTier.purple === 6 && byTier.gold === 6, byTier);

  /* ---------- 80 抽保底 ---------- */
  const goldRun = await ev(`(function(){
    var S=__cult.S; S.spells={}; S.pity=0; S.draws=0; S.pages=0;
    var firstGoldAt = 0;
    for (var i=0;i<80;i++){
      var r = __cult.spell.one();
      if (!firstGoldAt && r.tier==='gold') firstGoldAt = i+1;
    }
    return {firstGoldAt:firstGoldAt, pity:S.pity};
  })()`);
  check('80 抽内必出金阶', goldRun.firstGoldAt > 0 && goldRun.firstGoldAt <= 80, goldRun);

  /* ---------- 重复转残页 ---------- */
  const dupReal = await ev(`(function(){
    var S=__cult.S; S.spells={}; S.pages=0; S.pity=0; S.draws=0;
    __cult.spell.one();
    var dupCount = 0, pagesGain = 0;
    for (var i=0;i<300;i++){
      var r = __cult.spell.one();
      if (!r.isNew){ dupCount++; pagesGain += r.pages; }
    }
    return {dupCount:dupCount, pagesGain:pagesGain, pages:S.pages};
  })()`);
  check('重复法术按品阶转残页（1/2/4/8），合计与残页一致',
    dupReal.dupCount > 0 && dupReal.pagesGain === dupReal.pages,
    { dupCount: dupReal.dupCount, pagesGain: dupReal.pagesGain, pages: dupReal.pages });

  const pageTable = await ev('__cult.G.TIER_PAGES');
  check('残页表为 1/2/4/8', JSON.stringify(pageTable) === JSON.stringify([1, 2, 4, 8]), pageTable);

  /* ---------- 抽卡成本递增 ---------- */
  await ev(reset);
  const c0 = await ev('__cult.spell.cost(1)');
  const rate0 = await ev('__cult.econ.mana()');
  check('首次单抽 = 30 秒魔力产能', Math.abs(c0 - rate0 * 30) < 1e-6, { c0, rate0 });
  await ev('__cult.S.draws = 100');
  const c100 = await ev('__cult.spell.cost(1)');
  check('抽 100 次后单价 ×3（1+0.02×100）', Math.abs(c100 / c0 - 3) < 1e-6,
    { c0, c100, ratio: (c100 / c0).toFixed(3) });
  const c10 = await ev('__cult.spell.cost(10)');
  check('十连 = 270 秒产能 × 同系数', Math.abs(c10 / (rate0 * 270 * 3) - 1) < 1e-6,
    { c10, expect: rate0 * 270 * 3 });

  /* ---------- 装备影响产能 ---------- */
  await ev(reset);
  await ev(`(function(){var S=__cult.S; S.spells['t_mana_gold'] = {lv:1,n:1}; return 1})()`);
  const rateBefore = await ev('__cult.econ.mana()');
  const slots = await ev('__cult.spell.slots()');
  const eq = await ev('__cult.spell.equip("t_mana_gold")');
  const rateAfter = await ev('__cult.econ.mana()');
  const pctMana = await ev('__cult.spell.pct("mana")');
  check('初阶有 2 个装备槽', slots === 2, { slots });
  check('装备成功', eq === true, { eq });
  check('金阶「万源归流」提供 魔力 +50%', Math.abs(pctMana - 50) < 1e-6, { pctMana });
  check('装备后产能按加算提升（1.80/1.30）',
    Math.abs(rateAfter / rateBefore - (1.80 / 1.30)) < 1e-6,
    { ratio: (rateAfter / rateBefore).toFixed(4) });

  const uneq = await ev('__cult.spell.unequip(0)');
  const rateBack = await ev('__cult.econ.mana()');
  check('卸下后产能回落', uneq === true && Math.abs(rateBack - rateBefore) < 1e-9, { rateBack, rateBefore });

  /* ---------- 升级消耗残页 ---------- */
  await ev(`(function(){var S=__cult.S;S.equip=['','',''];S.spells={'t_mana_gold':{lv:1,n:1}};S.pages=0;return 1})()`);
  const upFail = await ev('__cult.spell.upgrade("t_mana_gold")');
  await ev('__cult.S.pages = 45');
  const upOk = await ev('__cult.spell.upgrade("t_mana_gold")');
  const lvNow = await ev('__cult.S.spells.t_mana_gold.lv');
  const pagesNow = await ev('__cult.S.pages');
  check('残页不足时不能升级', upFail === false, { upFail });
  check('1→2 级消耗 1 张残页', upOk === true && lvNow === 2 && pagesNow === 44, { lvNow, pagesNow });

  const full = await ev(`(function(){
    var S=__cult.S; S.pages=999; S.spells.t_mana_gold.lv=9;
    var r1=__cult.spell.upgrade('t_mana_gold');
    var r2=__cult.spell.upgrade('t_mana_gold');
    return {r1:r1, r2:r2, lv:S.spells.t_mana_gold.lv, pages:S.pages};
  })()`);
  check('升到 10 级后拒绝继续升级', full.r1 === true && full.lv === 10 && full.r2 === false,
    { lv: full.lv, r2: full.r2 });

  /* ---------- 面板 ---------- */
  await ev(`(function(){var S=__cult.S;S.mana=1e9;S.pages=6;S.pity=12;S.draws=4;
    S.spells={'t_mana_gold':{lv:3,n:1},'t_spell_purple':{lv:1,n:2}};
    S.equip=['t_mana_gold','',''];return 1})()`);
  await ev('document.querySelector(".tab[data-id=spell]").click()');
  await sleep(450);
  const panelCards = await ev('document.querySelectorAll("#panelBody .card").length');
  const panelText = await ev('document.getElementById("panelBody").innerText');
  check('面板含抽取区与装备槽', /单抽/.test(panelText) && /装备槽/.test(panelText) && /藏品/.test(panelText),
    panelText.replace(/\s+/g, ' ').slice(0, 80));
  check('面板卡片数 ≥ 4（3 槽 + 藏品）', panelCards >= 4, { panelCards });
  check('显示当前抽卡价格', /单抽 · \d/.test(panelText), panelText.replace(/\s+/g, ' ').slice(0, 60));

  const { data } = await cdp.send('Page.captureScreenshot', { format: 'png' }, sessionId);
  fs.writeFileSync(path.join(OUT, 't10-spell.png'), Buffer.from(data, 'base64'));
  console.log('SHOT t10-spell.png');

  /* ---------- 点抽卡：出结果弹层 ---------- */
  await ev('(function(){var b=document.querySelectorAll("#panelBody .spBtn");b[0].click();return 1})()');
  await sleep(400);
  const drawShown = await ev('document.getElementById("modal").classList.contains("show")');
  const drawRows = await ev('document.querySelectorAll("#modalBody .drow").length');
  check('抽卡后弹出结果', drawShown === true && drawRows >= 1, { drawShown, drawRows });
  await ev('document.getElementById("modalOk").click()');
  await sleep(250);
  const drawClosed = await ev('document.getElementById("modal").classList.contains("show")');
  check('结果弹层可关闭', drawClosed === false);

  check('无 console/异常', errors.length === 0, errors.slice(0, 3));

  console.log('\n' + (fails === 0 ? '✅ ALL PASS' : '❌ ' + fails + ' FAIL'));
  await edge.close();
  process.exit(fails === 0 ? 0 : 1);
}

main().catch(e => { console.error('RUN-ERROR', e && e.stack || e); process.exit(1); });
