/* 月巴奥术 · T14（事件 / 机缘 / 每日功课）验收
   运行：node specs/arcade-arcane/tests/t14-check.js
   覆盖：30 条事件全量走一遍 / 宗门专属只在对应学院 /
         离线最多缓存 1 条 / 机缘领取与刷新保留 / 每日三条与跨日重置
   产物：.screenshots/arcane-tests/t14-event.png
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
const eventCount = (html.match(/\{id:'q_(\d+|s_)/g) || []).length;
check('static: 30 条事件', eventCount === 30, { eventCount });
check('static: 6 条学院专属', (html.match(/acad:'s_/g) || []).length === 6,
  (html.match(/acad:'s_/g) || []).length);
check('static: 事件间隔 6~10 分钟 / 机缘 40~70', /QIYU_MIN:6/.test(html) && /QIYU_MAX:10/.test(html)
  && /JIBAN_MIN:40/.test(html) && /JIBAN_MAX:70/.test(html));

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

  const edge = await launchEdge({ port: 9245 });
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
    S.r=2; S.circle=5; S.spell=0; S.mana=1e6; S.focus=60; S.disson=0; S.dissonEndAt=0;
    S.academy='s_verdant'; S.acadData={s_verdant:{credit:0,rank:0}};
    S.tower={c_manapool:0,c_mat:0,c_mirror:0,c_alembic:0,c_library:0,c_ward:0};
    S.star={}; S.starPts=0; S.ascendCount=0;
    S.spells={}; S.equip=['','','']; S.apprentices=[]; S.buffs=[];
    S.potions={}; S.reagent=50; S.pages=50; S.trip=null; S.injuryUntil=0;
    S.eventSeen=[]; S.eventCache=null; S.eventAt=0;
    S.jibanAt=0; S.jibanGot=false;
    __cult.daily.reset();
    return 1})()`;
  await ev(reset);
  await sleep(200);

  /* ---------- 30 条事件全量走一遍 ---------- */
  const sweep = await ev(`(function(){
    var out = {bad: [], applied: 0};
    __cult.event.all.forEach(function(e){
      ['a','b'].forEach(function(k){
        var ef = e[k];
        var before = {mana:__cult.S.mana, focus:__cult.S.focus, reagent:__cult.S.reagent};
        try { __cult.event.apply(ef); } catch(err){ out.bad.push(e.id + k + ':' + err.message); return; }
        out.applied++;
        if (!isFinite(__cult.S.mana) || !isFinite(__cult.S.focus)) out.bad.push(e.id + k + ':NaN');
        if (__cult.S.reagent < 0) out.bad.push(e.id + k + ':负材料');
        // 复原关键资源，避免后一条被前一条影响
        __cult.S.mana = 1e6; __cult.S.focus = 60; __cult.S.reagent = 50;
        __cult.S.pages = 50; __cult.S.spell = 0; __cult.S.disson = 0;
      });
    });
    return out;
  })()`);
  check('30 条 × 2 个选项全部可结算且无 NaN', sweep.bad.length === 0 && sweep.applied === 60,
    { applied: sweep.applied, bad: sweep.bad.slice(0, 3) });

  /* 扣不起的选项要被判为不可选 */
  await ev('(function(){var S=__cult.S; S.reagent=0; return 1})()');
  const afford = await ev('__cult.event.canAfford([["reagent",-5]])');
  await ev('__cult.S.reagent = 50');
  const afford2 = await ev('__cult.event.canAfford([["reagent",-5]])');
  check('资源不足的选项不可选', afford === false && afford2 === true, { afford, afford2 });

  /* ---------- 宗门专属 ---------- */
  const sectPool = await ev(`(function(){
    var S=__cult.S; S.academy='s_crimson'; S.eventSeen=[];
    var ids = {};
    for (var i=0;i<200;i++){ var e = __cult.event.pick(); ids[e.id] = (ids[e.id]||0)+1; }
    return Object.keys(ids).filter(function(k){ return k.indexOf('q_s_')===0; });
  })()`);
  check('赤炉结社只出现自己的专属事件', sectPool.length === 1 && sectPool[0] === 'q_s_crimson', sectPool);

  await ev(reset);

  /* ---------- 离线缓存 1 条 ---------- */
  const cached = await ev(`(function(){
    var S=__cult.S; S.r=0; S.circle=9; S.spell=__cult.econ.need(); S.mana=0;
    S.eventCache=null;
    __cult.off.backdate(8*3600); __cult.off.settle();
    return {cache:S.eventCache};
  })()`);
  check('离线 8 小时缓存 1 条事件', typeof cached.cache === 'string' && cached.cache.indexOf('q_') === 0, cached);

  await ev('__cult.save()');
  const done2 = cdp.waitEvent('Page.loadEventFired', 25000);
  await cdp.send('Page.navigate', { url: GAME_URL + '?debug=1' }, sessionId);
  await done2;
  await sleep(900);
  const modalShown = await ev('document.getElementById("modal").classList.contains("show")');
  const modalTitle = await ev('document.getElementById("modalTitle").textContent');
  const optCount = await ev('document.querySelectorAll("#modalBody [data-opt]").length');
  check('回来弹出缓存的奇遇', modalShown === true && optCount === 2, { modalShown, optCount, modalTitle });
  await shot('t14-event.png');

  /* 选一个选项 */
  const beforeMana = await ev('__cult.S.mana');
  await ev('(function(){var b=document.querySelectorAll("#modalBody [data-opt]");' +
           'for(var i=0;i<b.length;i++){ if(!b[i].disabled){ b[i].click(); return 1; } } return 0})()');
  await sleep(300);
  const closed = await ev('document.getElementById("modal").classList.contains("show")');
  const afterMana = await ev('__cult.S.mana');
  check('选完关闭并结算', closed === false && afterMana !== beforeMana, { closed, beforeMana, afterMana });

  /* ---------- 机缘 ---------- */
  await ev(reset);
  await ev('__cult.jiban.at(0)');
  await sleep(400);
  const got = await ev('__cult.S.jibanGot');
  const dotShown = await ev('!document.getElementById("btnJiban").hidden');
  check('到点生成机缘并显示红点', got === true && dotShown === true, { got, dotShown });

  await ev('__cult.save()');
  const done3 = cdp.waitEvent('Page.loadEventFired', 25000);
  await cdp.send('Page.navigate', { url: GAME_URL + '?debug=1' }, sessionId);
  await done3;
  await sleep(800);
  const gotReload = await ev('__cult.S.jibanGot');
  check('刷新后机缘还在', gotReload === true, { gotReload });

  const claimB = await ev('({mana:__cult.S.mana, credit:__cult.S.acadData.s_verdant.credit})');
  await ev('document.getElementById("btnJiban").click()');
  await sleep(300);
  const claimA = await ev('({mana:__cult.S.mana, credit:__cult.S.acadData.s_verdant.credit, got:__cult.S.jibanGot})');
  check('领取机缘：魔力与学分到账',
    claimA.mana > claimB.mana && Math.abs((claimA.credit - claimB.credit) - 30) < 0.1,
    { manaGain: Math.round(claimA.mana - claimB.mana), creditGain: +(claimA.credit - claimB.credit).toFixed(2) });
  check('领取后红点消失', claimA.got === false);

  /* ---------- 每日功课 ---------- */
  await ev(reset);
  const d0 = await ev('__cult.daily.progress("daily_tap")');
  /* 每秒最多计 10 次，所以只验证「点了就计数」，不指望 120 下全算 */
  await ev('(function(){var b=document.getElementById("moonba");' +
           'for(var i=0;i<5;i++)b.dispatchEvent(new PointerEvent("pointerdown",{bubbles:true,cancelable:true,clientX:100,clientY:300}));return 1})()');
  await sleep(300);
  const d1 = await ev('__cult.daily.progress("daily_tap")');
  check('施法计入每日功课', d0 === 0 && d1 >= 1, { d0, d1 });

  await ev('__cult.S.daily.tap = 100');
  const tapDone = await ev('__cult.daily.done("daily_tap")');
  check('达到 100 次判定完成', tapDone === true, { tapDone });

  const manaBeforeClaim = await ev('__cult.S.mana');
  const claimOk = await ev('__cult.daily.claim("daily_tap")');
  const manaAfterClaim = await ev('__cult.S.mana');
  check('领取单项奖励发放魔力', claimOk === true && manaAfterClaim > manaBeforeClaim,
    { gain: Math.round(manaAfterClaim - manaBeforeClaim) });

  const twice = await ev('__cult.daily.claim("daily_tap")');
  check('同一项不能领两次', twice === false, { twice });

  /* 秘境与晋级计数 */
  await ev(`(function(){var S=__cult.S; S.trip={id:'d_garden', startAt:Date.now()-1000, endAt:Date.now()-500, durMs:1000};
    __cult.trip.settle(); return 1})()`);
  const dDun = await ev('__cult.daily.progress("daily_dungeon")');
  check('远征计入每日功课', dDun >= 1, { dDun });

  /* 跨日重置 */
  const beforeReset = await ev('__cult.S.daily.tap');
  await ev('__cult.S.daily.key = "2000-01-01"; __cult.daily.ensure();');
  const afterReset = await ev('__cult.S.daily.tap');
  const gotLen = await ev('__cult.S.daily.got.length');
  check('跨日重置计数与领取记录', beforeReset > 0 && afterReset === 0 && gotLen === 0,
    { beforeReset, afterReset, gotLen });

  /* ---------- 手记面板 ---------- */
  await ev(`(function(){var S=__cult.S; __cult.daily.reset(); S.daily.tap=100; S.daily.dungeon=1; S.daily.brk=1; return 1})()`);
  await ev('document.querySelector(".tab[data-id=note]").click()');
  await sleep(400);
  const noteText = await ev('document.getElementById("panelBody").innerText');
  check('手记显示三条功课', /施法 100 次/.test(noteText) && /完成 1 次远征/.test(noteText)
    && /晋级 1 次/.test(noteText), noteText.replace(/\s+/g, ' ').slice(0, 110));
  check('可领取项显示奖励', /5 分钟/.test(noteText), noteText.replace(/\s+/g, ' ').slice(0, 140));

  check('无 console/异常', errors.length === 0, errors.slice(0, 3));

  console.log('\n' + (fails === 0 ? '✅ ALL PASS' : '❌ ' + fails + ' FAIL'));
  await edge.close();
  process.exit(fails === 0 ? 0 : 1);
}

main().catch(e => { console.error('RUN-ERROR', e && e.stack || e); process.exit(1); });
