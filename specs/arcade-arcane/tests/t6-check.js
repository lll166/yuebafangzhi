/* 月巴奥术 · T6（离线结算）验收
   运行：node specs/arcade-arcane/tests/t6-check.js
   覆盖：8 小时结算精度 / 12 小时封顶 / 时间回拨为 0 / 只结算一次 /
         离线自动铭环但不晋级 / 归来弹窗
   产物：.screenshots/arcane-tests/t6-offline.png
*/
const fs = require('fs');
const path = require('path');
const { launchEdge, sweepStaleProfiles } = require('../../arcade-tamago/tests/lib/edge-cdp.js');

const ROOT = path.resolve(__dirname, '../../..');
const OUT = path.join(ROOT, '.screenshots', 'arcane-tests');
const GAME_URL = 'file:///' + encodeURI(path.join(ROOT, 'arcane.html').replace(/\\/g, '/'));
const SAVE_KEY = 'yueba-arcane-v1';
const sleep = ms => new Promise(r => setTimeout(r, ms));

let fails = 0;
function check(name, ok, info) {
  console.log((ok ? 'PASS ' : 'FAIL ') + name + (info !== undefined ? ' :: ' + JSON.stringify(info) : ''));
  if (!ok) fails++;
}

/* ---------- 静态守卫 ---------- */
const html = fs.readFileSync(path.join(ROOT, 'arcane.html'), 'utf8');
check('static: 12 小时封顶常量', /OFFLINE_CAP_SEC:43200/.test(html));
check('static: 基础效率 60% / 上限 120%', /OFFLINE_BASE:0\.60/.test(html) && /OFFLINE_MAX:1\.20/.test(html));
check('static: 60 秒以下不弹窗', /OFFLINE_MIN_MS:60000/.test(html));
check('static: 离线段不调用晋级', /function simulateOffline/.test(html)
  && !/doRankUp\(\)/.test(html.slice(html.indexOf('function simulateOffline'), html.indexOf('function settleOffline'))));

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

  const edge = await launchEdge({ port: 9235 });
  const cdp = await attach(edge.port, onEvent);

  const openPage = async () => {
    const { targetId } = await cdp.send('Target.createTarget', { url: 'about:blank' });
    const { sessionId } = await cdp.send('Target.attachToTarget', { targetId, flatten: true });
    await cdp.send('Page.enable', {}, sessionId);
    await cdp.send('Runtime.enable', {}, sessionId);
    await cdp.send('Emulation.setDeviceMetricsOverride',
      { width: 390, height: 844, deviceScaleFactor: 1, mobile: true }, sessionId);
    const done = cdp.waitEvent('Page.loadEventFired', 15000);
    await cdp.send('Page.navigate', { url: GAME_URL + '?debug=1' }, sessionId);
    await done;
    await sleep(800);
    return sessionId;
  };
  const evOn = async (sid, expr) => {
    const r = await cdp.send('Runtime.evaluate', { expression: expr, returnByValue: true }, sid);
    if (r.exceptionDetails) errors.push('eval: ' + ((r.exceptionDetails.exception && r.exceptionDetails.exception.description) || r.exceptionDetails.text));
    return r.result && r.result.value;
  };

  const A = await openPage();
  const ev = expr => evOn(A, expr);

  /* 归零到一个已知状态：9 环、咒力满、魔力 0
     注意：离线效率会受学院与设施影响，测试必须把这两项也压回默认，
     否则上一个测试文件留下的学院（例如深潭塔 +15%）会改变基准。 */
  const reset = `(function(){var S=__cult.S;S.r=0;S.circle=9;S.spell=__cult.econ.need();S.mana=0;
    S.focus=100;S.disson=0;S.stat.circles=0;S.stat.offlineMax=0;
    S.academy='s_verdant';S.acadData={s_verdant:{credit:0,rank:0}};
    S.tower={c_manapool:0,c_mat:0,c_mirror:0,c_alembic:0,c_library:0,c_ward:0};
    S.star={}; S.starPts=0; S.ascendCount=0;
    S.spells={};S.equip=['','',''];S.apprentices=[];S.buffs=[];
    S.transCount=0;S.transAt=0;
    return 1})()`;
  await ev(reset);
  await sleep(150);

  /* 把「重置 → 回溯 → 结算」放进同一次求值：
     分两次调用时中间可能撞上 10 秒自动存档，persist() 会把 ts 改回现在。
     另外 Runtime.evaluate 不允许顶层 return，必须包成函数。 */
  const doSettle = (backSec, extra) =>
    ev('(function(){' + reset + ';' + (extra || '') +
       '__cult.off.backdate(' + backSec + '); return __cult.off.settle(); })()');

  /* ---------- A · 8 小时精确结算 ---------- */
  const rate9 = await ev('__cult.econ.mana()');
  const eff = await ev('__cult.off.eff()');
  check('离线效率为 60%（无设施加成时）', Math.abs(eff - 0.60) < 1e-9, { eff });

  const info8 = await doSettle(8 * 3600);
  if (!info8) { check('8 小时结算返回了结果', false, info8); }
  const expect8 = 8 * 3600 * 0.60 * rate9;
  const err8 = info8 ? Math.abs(info8.mana - expect8) / expect8 : 1;
  check('8 小时结算 = 时长 × 60% × 产能（误差 <2%）', !!info8 && err8 < 0.02,
    { got: info8 && Math.round(info8.mana), expect: Math.round(expect8), err: (err8 * 100).toFixed(2) + '%' });
  check('8 小时未触发封顶', !!info8 && Math.abs(info8.sec - 28800) < 2 && info8.capped === false,
    { sec: info8 && info8.sec, capped: info8 && info8.capped });
  check('9 环离线不晋级', !!info8 && info8.circleTo === 9 && info8.circleFrom === 9,
    info8 && info8.circleTo);

  /* ---------- B · 12 小时封顶 ---------- */
  const info20 = await doSettle(20 * 3600);
  const expect12 = 12 * 3600 * 0.60 * rate9;
  const err12 = info20 ? Math.abs(info20.mana - expect12) / expect12 : 1;
  check('20 小时按 12 小时封顶', !!info20 && info20.sec === 43200 && info20.capped === true,
    { sec: info20 && info20.sec, capped: info20 && info20.capped });
  check('封顶后收益 = 12 小时 × 60% × 产能（误差 <2%）', err12 < 0.02,
    { got: Math.round(info20.mana), expect: Math.round(expect12), err: (err12 * 100).toFixed(2) + '%' });

  /* ---------- C · 只结算一次 ---------- */
  const again = await ev('__cult.off.settle()');
  check('紧接着再结算不会重复发放', again === null, again);

  /* ---------- D · 系统时间回拨 ---------- */
  const back = await doSettle(-3600, '__cult.S.mana = 0;');
  const manaAfterBack = await ev('__cult.S.mana');
  check('时间回拨按 0 处理、不产生收益', back === null && manaAfterBack === 0, { back, manaAfterBack });

  /* ---------- E · 离线自动铭环 ---------- */
  const infoAdv = await ev(`(function(){
    var S = __cult.S; S.r = 0; S.circle = 1; S.spell = 0; S.mana = 0; S.stat.circles = 0;
    __cult.off.backdate(3600);
    return __cult.off.settle();
  })()`);
  const rate1 = await ev('__cult.econ.mana()');
  check('1 小时离线下会自动铭环', !!infoAdv && infoAdv.circleTo > infoAdv.circleFrom,
    { from: infoAdv && infoAdv.circleFrom, to: infoAdv && infoAdv.circleTo });
  check('自动铭环后魔力仍在增长', !!infoAdv && infoAdv.mana > rate1 * 3600 * 0.6 * 0.9,
    { mana: infoAdv && Math.round(infoAdv.mana) });

  /* ---------- F · 启动路径 + 归来弹窗 ---------- */
  /* 注意：页面 A 仍在跑 10 秒自动存档，会把手写的 ts 覆盖回「现在」。
     这里先在 A 里写一次回溯存档，再把 A 的 setItem 掐掉，保证 B 读到的是回溯值。 */
  await ev(`(function(){
    var S = __cult.S;
    S.r = 0; S.circle = 9; S.spell = __cult.econ.need(); S.mana = 0;
    S.focus = 100; S.disson = 0; S.stat.circles = 0; S.stat.offlineMax = 0;
    S.academy = 's_verdant'; S.acadData = {s_verdant:{credit:0,rank:0}};
    S.tower = {c_manapool:0,c_mat:0,c_mirror:0,c_alembic:0,c_library:0,c_ward:0};
    S.ts = Date.now() - 8*3600*1000;
    Storage.prototype.setItem.call(localStorage, '` + SAVE_KEY + `', JSON.stringify(S));
    Storage.prototype.setItem = function(){};
    return 1;
  })()`);
  const B = await openPage();
  const evB = expr => evOn(B, expr);

  const shownB = await evB('document.getElementById("modal").classList.contains("show")');
  const titleB = await evB('document.getElementById("modalTitle").textContent');
  const bodyB = await evB('document.getElementById("modalBody").innerText');
  const manaB = await evB('__cult.S.mana');
  check('启动时自动弹出归来窗', shownB === true && titleB === '久别归来', { shownB, titleB });
  check('弹窗列出离开时长与所得', /离开时长/.test(bodyB) && /8 小时/.test(bodyB) && /魔力所得/.test(bodyB),
    bodyB.replace(/\s+/g, ' ').slice(0, 80));
  check('启动路径确实发放了离线收益', manaB > expect8 * 0.9, { manaB: Math.round(manaB), expect: Math.round(expect8) });

  const cancelHidden = await evB('document.getElementById("modalCancel").hidden');
  check('归来窗只有一个领取按钮', cancelHidden === true, { cancelHidden });

  const { data } = await cdp.send('Page.captureScreenshot', { format: 'png' }, B);
  fs.writeFileSync(path.join(OUT, 't6-offline.png'), Buffer.from(data, 'base64'));
  console.log('SHOT t6-offline.png');

  await evB('document.getElementById("modalOk").click()');
  await sleep(300);
  const closed = await evB('document.getElementById("modal").classList.contains("show")');
  check('领取后关闭弹窗', closed === false);

  /* 再进一次：不该再弹「久别归来」（可能弹的是奇遇或远征，那些不算） */
  const C = await openPage();
  const titleC = await evOn(C, 'document.getElementById("modalTitle").textContent');
  const shownC = await evOn(C, 'document.getElementById("modal").classList.contains("show")');
  const isOffline = shownC === true && /久别归来/.test(titleC);
  check('再次进入不再重复弹离线窗', isOffline === false, { shownC, titleC });

  check('无 console/异常', errors.length === 0, errors.slice(0, 3));

  console.log('\n' + (fails === 0 ? '✅ ALL PASS' : '❌ ' + fails + ' FAIL'));
  await edge.close();
  process.exit(fails === 0 ? 0 : 1);
}

main().catch(e => { console.error('RUN-ERROR', e && e.stack || e); process.exit(1); });
