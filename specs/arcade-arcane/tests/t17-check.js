/* 月巴奥术 · T17（成就 / 图鉴）验收
   运行：node specs/arcade-arcane/tests/t17-check.js
   覆盖：30 条成就能逐条触发 / 不重复解锁 / 5 类图鉴随实际获得点亮 /
         封圣后成就与图鉴保留 / 图鉴不参与倍率
   产物：.screenshots/arcane-tests/t17-note.png
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
const achCount = (html.match(/\{id:'a_/g) || []).length;
check('static: 30 条成就', achCount === 30, { achCount });
check('static: 图鉴五类', /cx_spell.*cx_acad.*cx_exped.*cx_potion.*cx_trial/s.test(html));

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

  const edge = await launchEdge({ port: 9248 });
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
  const load = async (url) => {
    const done = cdp.waitEvent('Page.loadEventFired', 25000);
    await cdp.send('Page.navigate', { url }, sessionId);
    await done;
    await sleep(800);
  };

  await load(GAME_URL + '?debug=1');
  await ev(`(function(){var S=__cult.S;
    S.r=0; S.circle=1; S.spell=0; S.mana=0; S.focus=100; S.disson=0;
    S.academy='s_verdant'; S.acadData={s_verdant:{credit:0,rank:0}};
    S.tower={c_manapool:0,c_mat:0,c_mirror:0,c_alembic:0,c_library:0,c_ward:0};
    S.star={}; S.starPts=0; S.ascendCount=0;
    S.spells={}; S.equip=['','','']; S.apprentices=[]; S.buffs=[]; S.potions={};
    S.brews=undefined; S.brewKinds={}; S.ach=[]; S.codex={}; S.reagent=0; S.pages=0;
    S.stat={casts:0,maxCombo:0,circles:0,breaks:0,fails:0,attempts:0,expeditions:0,potions:0,
            events:0,jiban:0,trials:0,offlineMax:0,academies:1,
            brews:0,injuries:0,dailyAll:0,starAppr:0,dissonClear:0,trib:0};
    return 1})()`);
  await sleep(300);

  /* ---------- 30 条逐条触发 ---------- */
  const all = await ev(`(function(){
    var S=__cult.S;
    var results = [];
    __cult.ach.all.forEach(function(a){
      // 先把状态推到能触发这条的程度
      S.stat.casts = 20000; S.stat.maxCombo = 60;
      S.stat.circles = 20; S.stat.breaks = 1; S.stat.fails = 1;
      S.stat.expeditions = 25; S.stat.events = 35; S.stat.jiban = 12;
      S.stat.brews = 120; S.stat.injuries = 1; S.stat.dailyAll = 1;
      S.stat.starAppr = 1; S.stat.dissonClear = 1; S.stat.trib = 3;
      S.stat.academies = 5;
      S.r = 9; S.circle = 9;
      S.disson = 5;
      S.spells = {};
      for (var i = 0; i < 24; i++) S.spells[__cult.spell.all[i].id] = {lv: 10, n: 1};
      S.brewKinds = {p_mana:1,p_spell:1,p_ascend:1,p_clarity:1,p_echo:1};
      S.apprentices = [{role:'dr_scribe',quality:'q_star',lv:1,name:'a'},
                       {role:'dr_peer',quality:'q_star',lv:1,name:'b'},
                       {role:'dr_forager',quality:'q_star',lv:1,name:'c'},
                       {role:'dr_warden',quality:'q_star',lv:1,name:'d'}];
      S.acadData = {s_verdant:{credit:3000,rank:3},s_crimson:{credit:0,rank:0},
                    s_deepwell:{credit:0,rank:0},s_stonehold:{credit:0,rank:0},
                    s_starlight:{credit:0,rank:0}};
      S.ascendCount = 1;
      __cult.ach.check();
      results.push({id:a.id, got:__cult.ach.has(a.id)});
    });
    return results;
  })()`);
  const missing = all.filter(x => !x.got).map(x => x.id);
  check('30 条成就全部可触发', all.length === 30 && missing.length === 0, { total: all.length, missing });

  /* 不重复解锁 */
  const beforeLen = await ev('__cult.S.ach.length');
  const addedAgain = await ev('__cult.ach.check()');
  const afterLen = await ev('__cult.S.ach.length');
  check('已解锁的不会重复记录', addedAgain === 0 && afterLen === beforeLen, { beforeLen, afterLen, addedAgain });

  /* ---------- 图鉴 ---------- */
  const groups = await ev('__cult.ach.groups.map(function(g){return {key:g.key,n:g.ids.length}})');
  check('图鉴五类条目数 24/6/4/5/3',
    groups.length === 5 && groups[0].n === 24 && groups[1].n === 6 &&
    groups[2].n === 4 && groups[3].n === 5 && groups[4].n === 3, groups);

  /* 未获得的不点亮 */
  await ev('(function(){var S=__cult.S; S.codex={}; return 1})()');
  const emptyCodex = await ev(`(function(){
    var S=__cult.S; var n=0;
    __cult.ach.groups.forEach(function(g){ g.ids.forEach(function(id){ if (S.codex[id]) n++; }); });
    return n;
  })()`);
  check('清空后图鉴一项都不亮', emptyCodex === 0, { emptyCodex });

  /* 抽卡点亮法术图鉴 */
  await ev('(function(){var S=__cult.S; S.spells={}; S.codex={}; S.mana=1e9; S.pity=0; S.draws=0; return 1})()');
  await ev('__cult.spell.one()');
  const spellCodex = await ev('Object.keys(__cult.S.codex).length');
  check('抽到法术会点亮图鉴', spellCodex >= 1, { spellCodex });

  /* 炼药点亮魔药图鉴 */
  await ev('(function(){var S=__cult.S; S.reagent=99; S.mana=1e9; return 1})()');
  await ev('__cult.potion.brew("p_mana")');
  const potionCodex = await ev('!!__cult.S.codex.p_mana');
  check('炼出的魔药点亮图鉴', potionCodex === true, { potionCodex });

  /* 远征点亮遗迹图鉴 */
  await ev('(function(){var S=__cult.S; S.r=3; S.trip=null; return 1})()');
  await ev('__cult.trip.depart("d_garden")');
  const tripCodex = await ev('!!__cult.S.codex.d_garden');
  check('派出远征点亮遗迹图鉴', tripCodex === true, { tripCodex });

  /* ---------- 图鉴不参与倍率 ---------- */
  await ev('(function(){var S=__cult.S; S.r=1; S.circle=3; S.spells={}; S.equip=["","",""]; S.codex={}; S.tower={c_manapool:0,c_mat:0,c_mirror:0,c_alembic:0,c_library:0,c_ward:0}; return 1})()');
  const rateNoCodex = await ev('__cult.econ.mana()');
  await ev(`(function(){var S=__cult.S;
    __cult.ach.groups.forEach(function(g){ g.ids.forEach(function(id){ S.codex[id]=1; }); });
    return 1})()`);
  const rateFullCodex = await ev('__cult.econ.mana()');
  check('图鉴点满也不改变产能', Math.abs(rateFullCodex - rateNoCodex) < 1e-12,
    { rateNoCodex, rateFullCodex });

  /* ---------- 封圣后保留 ---------- */
  await ev(`(function(){var S=__cult.S; S.ach=['a_first_break','a_ascend']; S.codex={t_mana_gold:1,s_verdant:1};
    S.star={}; S.starPts=0; S.r=9; S.circle=9; __cult.star.ascend(); return 1})()`);
  const kept = await ev('({ach:__cult.S.ach.length, codex:Object.keys(__cult.S.codex).length})');
  check('封圣后成就与图鉴保留', kept.ach === 2 && kept.codex === 2, kept);

  /* ---------- 面板 ---------- */
  await ev(`(function(){var S=__cult.S;
    S.ach=['a_first_break','a_tap1000']; S.codex={t_mana_gold:1,s_verdant:1,d_garden:1,p_mana:1,tb_1:1};
    S.daily={key:__cult.daily.key(),tap:0,dungeon:0,brk:0,sit:0,got:[]};
    return 1})()`);
  await ev('document.querySelector(".tab[data-id=note]").click()');
  await sleep(450);
  /* 启动时可能弹了「久别归来」，先关掉再截图 */
  await ev('(function(){var m=document.getElementById("modal");' +
           'if(m.classList.contains("show")){document.getElementById("modalOk").click();}' +
           'return 1})()');
  await sleep(250);
  const noteText = await ev('document.getElementById("panelBody").innerText');
  const chips = await ev('document.querySelectorAll("#panelBody .chip").length');
  check('手记含成就与图鉴', /成就/.test(noteText) && /图鉴/.test(noteText), noteText.replace(/\s+/g, ' ').slice(0, 80));
  check('成就 30 + 图鉴 42 个标签', chips === 30 + 24 + 6 + 4 + 5 + 3, { chips });
  check('未解锁显示 ???', /\?\?\?/.test(noteText), noteText.replace(/\s+/g, ' ').slice(0, 120));
  check('已获得的显示名字', /万源归流/.test(noteText) && /翠庭学院/.test(noteText), 'ok');

  await shot('t17-note.png');

  check('无 console/异常', errors.length === 0, errors.slice(0, 3));

  console.log('\n' + (fails === 0 ? '✅ ALL PASS' : '❌ ' + fails + ' FAIL'));
  await edge.close();
  process.exit(fails === 0 ? 0 : 1);
}

main().catch(e => { console.error('RUN-ERROR', e && e.stack || e); process.exit(1); });
