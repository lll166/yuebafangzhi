/* 月巴奥术 · 机器人试玩（不是验收，是测「能不能玩下去、要玩多久」）
   运行：node specs/arcade-arcane/tests/playtest.js
   做法：在真页面里用真实经济函数快进，机器人按「优先晋级、有余钱升塔、再有余钱抽法术」决策。
   产物：多档成长系数的时间线对比 + .screenshots/arcane-tests/play-end.png
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

const BOT = `
window.__play = function(maxHours){
  var S = __cult.S;
  S.r=0; S.circle=1; S.spell=0; S.mana=0; S.focus=100; S.disson=0; S.dissonEndAt=0;
  S.academy='s_verdant'; S.acadData={s_verdant:{credit:0,rank:0}};
  S.tower={c_manapool:0,c_mat:0,c_mirror:0,c_alembic:0,c_library:0,c_ward:0};
  S.spells={}; S.equip=['','','']; S.pages=0; S.pity=0; S.draws=0;
  S.posture='pon_zuo';
  S.stat={casts:0,maxCombo:0,circles:0,breaks:0,fails:0,attempts:0,expeditions:0,potions:0,
          events:0,jiban:0,trials:0,offlineMax:0,academies:1};

  var TIERS = ['white','blue','purple','gold'];
  var DIR_W = {mana:2, spell:2, cast:1, rank:1, rest:0, exp:0};

  function score(id){
    var sp = __cult.spell.byId(id);
    return TIERS.indexOf(sp.tier) * 10 + (DIR_W[sp.dir] || 0);
  }
  function equipBest(){
    var ids = Object.keys(S.spells);
    ids.sort(function(a,b){ return score(b) - score(a); });
    var slots = __cult.spell.slots();
    S.equip = ['','',''];
    for (var i = 0; i < slots && i < ids.length; i++) S.equip[i] = ids[i];
  }

  var milestones = [], t = 0, step = 60, lastR = -1;
  var maxT = maxHours * 3600;
  var upgrades = 0, draws = 0, towerMaxAt = 0, doneAt = 0;
  var apprHired = 0, apprUps = 0, brews = 0, trips = 0, tripEndSim = 0;

  while (t < maxT){
    __cult.step(step);
    t += step;

    var guard = 0;
    while (S.circle < 9 && S.spell >= __cult.econ.need() && guard++ < 20) __cult.inscribe();

    if (S.circle >= 9 && S.spell >= __cult.econ.need() && S.mana >= __cult.econ.cost()){
      __cult.brk.do();
    }

    if (S.r !== lastR){
      lastR = S.r;
      milestones.push({r:S.r, hours:+(t/3600).toFixed(2)});
    }

    /* 到达大魔法师 9 环：当前没有封圣，这就是终点 */
    if (S.r >= 9 && S.circle >= 9){ doneAt = +(t/3600).toFixed(2); break; }

    var reserve = __cult.econ.cost() * 2;
    var bought = true;
    while (bought){
      bought = false;
      var best = null, bestCost = Infinity;
      for (var k=0;k<__cult.TOWER.length;k++){
        var f = __cult.TOWER[k];
        if (!__cult.tower.unlocked(f)) continue;
        if (S.tower[f.id] >= 20) continue;
        var c = __cult.tower.cost(f.id);
        if (c < bestCost){ bestCost = c; best = f.id; }
      }
      if (best && S.mana - bestCost > reserve * 2){
        if (__cult.tower.up(best)) { upgrades++; bought = true; }
      }
    }
    if (!towerMaxAt && upgrades >= 120) towerMaxAt = +(t/3600).toFixed(2);

    /* 学徒：四个职位各招一个，有余钱就升级 */
    if (S.apprentices.length < __cult.appr.slots() &&
        Number(S.acadData[S.academy].credit) >= 150 && S.mana > reserve * 3){
      var ROLE_ORDER = ['dr_scribe','dr_peer','dr_forager','dr_warden'];
      var used = S.apprentices.map(function(a){ return a.role; });
      var pick = 'dr_scribe';
      for (var q=0;q<ROLE_ORDER.length;q++){ if (used.indexOf(ROLE_ORDER[q]) < 0){ pick = ROLE_ORDER[q]; break; } }
      if (__cult.appr.recruit(pick)) apprHired++;
    }
    for (var ai = 0; ai < S.apprentices.length; ai++){
      var ac = __cult.appr.upCost(ai);
      if (S.mana - ac > reserve * 3){ if (__cult.appr.up(ai)) apprUps++; }
    }

    /* 魔药：有材料就炼一瓶魔力药剂并喝掉 */
    if (S.reagent >= 3 && S.mana > reserve * 4 && !__cult.potion.pct('mana')){
      if (__cult.potion.brew('p_mana')){ __cult.potion.use('p_mana'); brews++; }
    }

    /* 远征：始终保持一队在跑（按模拟时间推进，不依赖真实时钟） */
    if (!S.trip){
      var bestD = null;
      for (var di = 0; di < __cult.trip.all.length; di++){
        var dd = __cult.trip.all[di];
        if (__cult.trip.unlocked(dd)) bestD = dd;
      }
      if (bestD && __cult.trip.depart(bestD.id)){
        tripEndSim = t + S.trip.durMs / 1000;
        trips++;
      }
    }
    if (S.trip && tripEndSim && t >= tripEndSim){
      S.trip.endAt = Date.now() - 1;
      __cult.trip.settle();
      tripEndSim = 0;
    }

    var c1 = __cult.spell.cost(1);
    if (S.mana - c1 > reserve * 5 && draws < 200){
      var res = __cult.spell.draw(1);
      if (res){ draws++; equipBest(); }
    }
  }

  return {
    hours: doneAt || +(t/3600).toFixed(2),
    reachedEnd: !!doneAt,
    growth: __cult.G.SPELL_GROW,
    milestones: milestones,
    upgrades: upgrades, towerMaxAt: towerMaxAt, draws: draws,
    apprHired: apprHired, apprUps: apprUps, brews: brews, trips: trips,
    spellCount: Object.keys(S.spells).length,
    credit: Math.round(S.acadData.s_verdant.credit),
    rank: __cult.acad.rankOf(S.acadData.s_verdant.credit),
    slots: __cult.spell.slots(),
    equipped: S.equip.slice()
  };
};
`;

async function main() {
  sweepStaleProfiles();
  fs.mkdirSync(OUT, { recursive: true });

  const edge = await launchEdge({ port: 9240 });
  const cdp = await attach(edge.port);
  const { targetId } = await cdp.send('Target.createTarget', { url: 'about:blank' });
  const { sessionId } = await cdp.send('Target.attachToTarget', { targetId, flatten: true });
  await cdp.send('Page.enable', {}, sessionId);
  await cdp.send('Runtime.enable', {}, sessionId);
  await cdp.send('Emulation.setDeviceMetricsOverride',
    { width: 390, height: 844, deviceScaleFactor: 1, mobile: true }, sessionId);

  const ev = async (expr) => {
    const r = await cdp.send('Runtime.evaluate', { expression: expr, returnByValue: true, timeout: 120000 }, sessionId);
    if (r.exceptionDetails) {
      console.log('PAGE-ERROR', (r.exceptionDetails.exception && r.exceptionDetails.exception.description) || r.exceptionDetails.text);
    }
    return r.result && r.result.value;
  };

  const done = cdp.waitEvent('Page.loadEventFired', 25000);
  await cdp.send('Page.navigate', { url: GAME_URL + '?debug=1' }, sessionId);
  await done;
  await sleep(800);

  await ev(BOT);

  /* 固定种子的伪随机，消除抽卡/晋级 RNG 带来的跑次差异 */
  await ev(`window.__seed = function(s){
    var x = s >>> 0;
    Math.random = function(){ x = (x * 1664525 + 1013904223) >>> 0; return x / 4294967296; };
  };`);

  const NAMES = ['学徒','见习','初阶','中阶','高阶','精英','大师','大法师','贤者','大魔法师'];
  const SEEDS = [11, 29, 47];

  console.log('每档用 3 个固定种子各跑一次，取均值（模拟小时）\n');

  for (const g of [7.5, 7.7, 7.9, 8.1]) {
    const runs = [];
    for (const seed of SEEDS) {
      await ev('__cult.setGrowth(' + g + '); __seed(' + seed + ');');
      runs.push(JSON.parse(await ev('JSON.stringify(__play(600))')));
    }
    const hours = runs.map(r => r.hours);
    const avg = hours.reduce((a, b) => a + b, 0) / hours.length;
    const days = (avg / 8.5).toFixed(1);
    console.log('SPELL_GROW = ' + g + '  →  ' + hours.map(h => h + 'h').join(' / ') +
                '   均值 ' + avg.toFixed(1) + 'h ≈ ' + days + ' 天');
    const m = runs[0].milestones.map(x => NAMES[x.r] + '@' + x.hours + 'h').join('  ');
    console.log('   （种子 ' + SEEDS[0] + ' 里程碑）' + m);
    console.log('   塔满级 ' + runs[0].towerMaxAt + 'h · 抽卡 ' + runs[0].draws +
                ' · 法术 ' + runs[0].spellCount + '/24 · 职称 ' + runs[0].rank + '/3\n');
  }

  /* 结束状态截图（7.0 档，停在终点） */
  await ev('__cult.setGrowth(7.0); __seed(11);');
  await ev('JSON.stringify(__play(600))');
  await ev('__cult.save()');
  await sleep(300);
  const { data: png } = await cdp.send('Page.captureScreenshot', { format: 'png' }, sessionId);
  fs.writeFileSync(path.join(OUT, 'play-end.png'), Buffer.from(png, 'base64'));
  console.log('SHOT play-end.png');

  await edge.close();
}

main().catch(e => { console.error('RUN-ERROR', e && e.stack || e); process.exit(1); });
