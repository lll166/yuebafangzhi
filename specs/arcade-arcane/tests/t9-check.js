/* 月巴奥术 · T9（法师塔 / 六项设施）验收
   运行：node specs/arcade-arcane/tests/t9-check.js
   覆盖：6 项设施与解锁门槛 / 成本 80×1.55^等级 / 磐石堡 −12% /
         升级后产能立刻变化且与预估一致 / 20 级封顶 / 魔力不足显差额
   产物：.screenshots/arcane-tests/t9-tower.png
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
check('static: 成本 80 / 成长 1.55 / 上限 20',
  /TOWER_COST:80/.test(html) && /TOWER_COST_GROW:1\.55/.test(html) && /TOWER_MAX:20/.test(html));
check('static: 六项设施齐备', ['c_manapool','c_mat','c_mirror','c_alembic','c_library','c_ward']
  .every(id => new RegExp("id:'" + id + "'").test(html)));
check('static: 解锁门槛按阶位', /unlock:\{r:1, c:3\}/.test(html) && /unlock:\{r:2, c:5\}/.test(html));

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

  const edge = await launchEdge({ port: 9238 });
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
  const shot = async name => {
    const { data } = await cdp.send('Page.captureScreenshot', { format: 'png' }, sessionId);
    fs.writeFileSync(path.join(OUT, name), Buffer.from(data, 'base64'));
    console.log('SHOT ' + name);
  };

  const done = cdp.waitEvent('Page.loadEventFired', 25000);
  await cdp.send('Page.navigate', { url: GAME_URL + '?debug=1' }, sessionId);
  await done;
  await sleep(800);

  await ev(`(function(){var S=__cult.S;
    S.r=0; S.circle=1; S.mana=1e9; S.spell=0; S.focus=100; S.disson=0;
    S.academy='s_verdant'; S.acadData={s_verdant:{credit:0,rank:0}};
    S.tower={c_manapool:0,c_mat:0,c_mirror:0,c_alembic:0,c_library:0,c_ward:0};
    S.star={}; S.starPts=0; S.ascendCount=0;
    /* 清空装备中的法术，避免其它测试留下的加成影响产能基准 */
    S.spells={}; S.equip=['','','']; S.pages=0; S.pity=0; S.draws=0;
    return 1})()`);
  await sleep(200);

  /* ---------- 成本公式 ---------- */
  const cost0 = await ev('__cult.tower.cost("c_manapool")');
  check('Lv.0 成本 = 80', Math.abs(cost0 - 80) < 1e-9, { cost0 });

  const rate0 = await ev('__cult.econ.mana()');

  /* ---------- 升级 ---------- */
  const manaB = await ev('__cult.S.mana');
  const okUp = await ev('__cult.tower.up("c_manapool")');
  const lv1 = await ev('__cult.S.tower.c_manapool');
  const manaA = await ev('__cult.S.mana');
  const rate1 = await ev('__cult.econ.mana()');
  check('升级成功且等级 +1', okUp === true && lv1 === 1, { okUp, lv1 });
  check('扣除 80 魔力', Math.abs((manaB - manaA) - 80) < 1e-9, { spent: manaB - manaA });

  /* 魔力池是加算：学院 +30% → 38%，所以比值是 1.38/1.30 */
  const expectRatio = (1 + 38 / 100) / (1 + 30 / 100);
  check('升级后产能立刻变化（1.38/1.30）',
    Math.abs(rate1 / rate0 - expectRatio) < 1e-6,
    { ratio: (rate1 / rate0).toFixed(4), expect: expectRatio.toFixed(4) });

  const predict = await ev('__cult.tower.rateWith("c_manapool", 1)');
  check('面板预估与实际产能一致', Math.abs(predict - rate1) < 1e-9, { predict, rate1 });

  const cost1 = await ev('__cult.tower.cost("c_manapool")');
  check('Lv.1 成本 = 80×1.55 = 124', Math.abs(cost1 - 124) < 1e-6, { cost1 });

  /* ---------- 磐石堡折扣 ---------- */
  await ev('__cult.S.academy = "s_stonehold"');
  const costDisc = await ev('__cult.tower.cost("c_manapool")');
  check('磐石堡：塔升级 −12%', Math.abs(costDisc - 124 * 0.88) < 1e-6, { costDisc });
  await ev('__cult.S.academy = "s_verdant"');

  /* ---------- 20 级封顶 ---------- */
  await ev('__cult.S.tower.c_manapool = 20');
  const maxed = await ev('__cult.tower.up("c_manapool")');
  check('20 级后拒绝继续升级', maxed === false && (await ev('__cult.S.tower.c_manapool')) === 20, { maxed });

  /* ---------- 解锁门槛 ---------- */
  await ev('__cult.S.tower.c_manapool = 0');
  const lockAt0 = await ev('__cult.tower.unlocked({unlock:{r:2,c:5}})');
  await ev('__cult.S.r = 2; __cult.S.circle = 5');
  const openAt25 = await ev('__cult.tower.unlocked({unlock:{r:2,c:5}})');
  check('初阶 5 环前守护法阵未开放', lockAt0 === false, { lockAt0 });
  check('初阶 5 环后开放', openAt25 === true, { openAt25 });

  /* ---------- 面板 ---------- */
  await ev('(function(){var S=__cult.S;S.r=0;S.circle=1;S.mana=1e9;S.tower.c_manapool=3;return 1})()');
  await ev('document.querySelector(".tab[data-id=tower]").click()');
  await sleep(400);
  const cards = await ev('document.querySelectorAll("#panelBody .card.fac").length');
  const bodyText = await ev('document.getElementById("panelBody").innerText');
  const btns = await ev('document.querySelectorAll("#panelBody .facBtn:not(:disabled)").length');
  check('法师塔面板 6 张设施卡', cards === 6, { cards });
  check('未解锁设施给出条件', /环后开放/.test(bodyText), bodyText.replace(/\s+/g, ' ').slice(0, 90));
  check('可升级项有按钮', btns >= 1, { btns });
  check('显示当前 → 下一级', /当前 .* → /.test(bodyText), bodyText.replace(/\s+/g, ' ').slice(0, 120));

  await shot('t9-tower.png');

  /* 魔力不足时按钮置灰 */
  await ev('__cult.S.mana = 0');
  await ev('document.querySelector(".tab[data-id=tower]").click(); document.querySelector(".tab[data-id=tower]").click()');
  await sleep(300);
  const disabledBtns = await ev('document.querySelectorAll("#panelBody .facBtn:disabled").length');
  const lackText = await ev('document.getElementById("panelBody").innerText');
  check('魔力不足时按钮置灰并显示差额', disabledBtns > 0 && /还需/.test(lackText),
    { disabledBtns, hasLack: /还需/.test(lackText) });

  check('无 console/异常', errors.length === 0, errors.slice(0, 3));

  console.log('\n' + (fails === 0 ? '✅ ALL PASS' : '❌ ' + fails + ' FAIL'));
  await edge.close();
  process.exit(fails === 0 ? 0 : 1);
}

main().catch(e => { console.error('RUN-ERROR', e && e.stack || e); process.exit(1); });
