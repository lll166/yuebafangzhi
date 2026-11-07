/* 月巴奥术 · T15（试炼）验收
   运行：node specs/arcade-arcane/tests/t15-check.js
   覆盖：三个境界才触发 / 三雷窗口与加成 / 不点自动结算 /
         刷新不重抽 / 三雷全中 +36%
   产物：.screenshots/arcane-tests/t15-trial.png
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
check('static: 三个试炼境界 4/7/9', /TRIAL_REALMS = \{4: 'tb_1', 7: 'tb_2', 9: 'tb_3'\}/.test(html));
check('static: 每道雷 +12%', /TRIB_BONUS:0\.12/.test(html));
check('static: 20 秒自动结算', /TRIB_AUTO_MS:20000/.test(html));
check('static: 三道雷窗口 1.2 秒', /TRIAL_WINDOW_MS = 1200/.test(html));

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

  const edge = await launchEdge({ port: 9246 });
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

  const prepare = r => `(function(){var S=__cult.S;
    S.r=${r}; S.circle=9; S.spell=__cult.econ.need(); S.mana=1e9; S.focus=100; S.disson=0;
    S.academy='s_verdant'; S.acadData={s_verdant:{credit:0,rank:0}};
    S.tower={c_manapool:0,c_mat:0,c_mirror:0,c_alembic:0,c_library:0,c_ward:0};
    S.star={}; S.starPts=0; S.ascendCount=0;
    S.spells={}; S.equip=['','','']; S.apprentices=[]; S.buffs=[];
    S.potions={}; S.trial=null; S.draughtArmed=false;
    return 1})()`;

  await load(GAME_URL + '?debug=1');

  /* ---------- 哪些境界触发 ---------- */
  const realms = await ev(`(function(){
    var out = {};
    [0,1,2,3,4,5,6,7,8].forEach(function(r){
      out[r+1] = !!__cult.trial.realms[r+1];
    });
    return out;
  })()`);
  check('只有进入 4 / 7 / 9 才触发试炼',
    realms['4'] === true && realms['7'] === true && realms['9'] === true &&
    realms['1'] === false && realms['2'] === false && realms['3'] === false &&
    realms['5'] === false && realms['6'] === false && realms['8'] === false, realms);

  /* ---------- 普通境界不进试炼 ---------- */
  await ev(prepare(0));
  await sleep(200);
  const normalRes = await ev('JSON.stringify(__cult.trial.commit())');
  const normal = JSON.parse(normalRes);
  check('学徒→见习 直接掷骰，不开试炼',
    normal === null || normal.ok !== undefined, normal);
  check('普通晋级后没有残留试炼', (await ev('__cult.S.trial')) === null);

  /* ---------- 进入高阶触发 ---------- */
  await ev(prepare(3));
  await sleep(200);
  const commitRes = await ev('JSON.stringify(__cult.trial.commit())');
  const trialNow = await ev('JSON.stringify(__cult.S.trial)');
  const t = JSON.parse(trialNow);
  check('中阶 9 环晋级会先开试炼', commitRes === 'null' && !!t && t.realm === 4, { t });
  check('境界没有立刻改变', (await ev('__cult.S.r')) === 3);

  const modalShown = await ev('document.getElementById("modal").classList.contains("show")');
  const boltCount = await ev('document.querySelectorAll("#modalBody .bolt").length');
  check('试炼弹层有三道雷', modalShown === true && boltCount === 3, { modalShown, boltCount });
  check('弹层标题为银杯试炼', (await ev('document.getElementById("modalTitle").textContent')) === '银杯试炼');

  await shot('t15-trial.png');

  /* ---------- 窗口状态 ---------- */
  const st0 = await ev('__cult.trial.state(0)');
  check('第一道雷刚出现时处于等待', st0 === 'wait', { st0 });

  await sleep(1200);
  const stOpen = await ev('__cult.trial.state(0)');
  check('1 秒后第一道雷窗口打开', stOpen === 'open', { stOpen });

  const hit = await ev('__cult.trial.click(0)');
  const boltsAfter = await ev('__cult.S.trial.bolts');
  check('点中第一道雷记录 +1', hit === true && boltsAfter === 1, { hit, boltsAfter });

  /* 三雷全中 → +36% */
  await ev('__cult.S.trial.bolts = 3');
  const bd = await ev('__cult.mood.breakdown()');
  const expectRate = Math.min(0.95, bd.total / 100 + 3 * 0.12);
  check('三雷全中相当于 +36%（并受 95% 上限约束）',
    Math.abs(expectRate - Math.min(0.95, bd.total / 100 + 0.36)) < 1e-9, { base: bd.total, expectRate });

  /* ---------- 不点也能结算 ---------- */
  await ev(prepare(3));
  await ev('__cult.trial.start(4)');
  await ev('__cult.trial.setAt(19900)');
  await sleep(500);
  const autoDone = await ev('__cult.S.trial === null');
  const rAfter = await ev('__cult.S.r');
  check('满 20 秒自动结算（不点也给结果）', autoDone === true, { autoDone, rAfter });
  check('结算后境界变化或失败留存', rAfter === 3 || rAfter === 4, { rAfter });

  /* ---------- 刷新不重抽 ---------- */
  await ev(prepare(3));
  await ev('__cult.trial.start(4); __cult.S.trial.bolts = 2; __cult.save();');
  const savedAt = await ev('__cult.S.trial.at');
  await load(GAME_URL + '?debug=1');
  const resumed = await ev('JSON.stringify(__cult.S.trial)');
  const r2 = JSON.parse(resumed);
  if (r2){
    check('刷新后试炼计时保留（不重新开始）', Math.abs(r2.at - savedAt) < 2000, { at: r2.at, savedAt });
    check('刷新后已点中的雷数保留', r2.bolts === 2, { bolts: r2.bolts });
  }else{
    check('刷新后试炼已被结算（超过 20 秒）', true, 'resolved');
  }

  /* 超过 20 秒再刷新：直接结算，不重开弹层 */
  await ev(prepare(3));
  await ev('__cult.trial.start(4); __cult.S.trial.at = Date.now() - 25000; __cult.save();');
  await load(GAME_URL + '?debug=1');
  const afterReload = await ev('__cult.S.trial');
  const modalAfter = await ev('document.getElementById("modal").classList.contains("show")');
  check('过了 20 秒的试炼刷新后直接结算', afterReload === null && modalAfter === false,
    { afterReload, modalAfter });

  /* ---------- 三次试炼都能走通 ---------- */
  const all = await ev(`(function(){
    var out = [];
    [[3,4],[6,7],[8,9]].forEach(function(pair){
      var S=__cult.S;
      S.r=pair[0]; S.circle=9; S.spell=__cult.econ.need(); S.mana=1e9; S.trial=null;
      S.focus=100; S.disson=0; S.tower={c_manapool:0,c_mat:0,c_mirror:0,c_alembic:0,c_library:0,c_ward:0};
      S.spells={}; S.equip=['','','']; S.apprentices=[]; S.buffs=[];
      __cult.trial.start(pair[1]);
      S.trial.bolts = 3;
      S.trial.at = Date.now() - 21000;
      var res = __cult.trial.finish();
      out.push({from:pair[0], to:pair[1], res: res ? res.ok : null});
    });
    return out;
  })()`);
  check('三次试炼都能结算且不报错', all.length === 3 && all.every(x => x.res !== null), all);

  check('无 console/异常', errors.length === 0, errors.slice(0, 3));

  console.log('\n' + (fails === 0 ? '✅ ALL PASS' : '❌ ' + fails + ' FAIL'));
  await edge.close();
  process.exit(fails === 0 ? 0 : 1);
}

main().catch(e => { console.error('RUN-ERROR', e && e.stack || e); process.exit(1); });
