/* 月巴奥术 · T7（学院 / 学分 / 职称 / 转院）验收
   运行：node specs/arcade-arcane/tests/t7-check.js
   覆盖：按阶位解锁 / 学分被动累积 / 职称晋升与倍率 / 首次转院免费 /
         后续成本递增 / 冷却不可刷新绕过 / 转院保留旧院学分 / 月巴之塔封圣后解锁
   产物：.screenshots/arcane-tests/t7-academy.png
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

/* ---------- 静态守卫 ---------- */
const html = fs.readFileSync(path.join(ROOT, 'arcane.html'), 'utf8');
check('static: 六所学院齐备', ['s_verdant','s_crimson','s_deepwell','s_stonehold','s_starlight','s_bany']
  .every(id => new RegExp(id + ':').test(html)));
check('static: 职称四档学分 0/300/1000/3000',
  /credit:0,/.test(html) && /credit:300,/.test(html) && /credit:1000,/.test(html) && /credit:3000,/.test(html));
check('static: 转院冷却 30 分钟', /30 \* 60000/.test(html));
check('static: 转院成本 6000 × 3^(n-1)', /6000 \* Math\.pow\(3, S\.transCount - 1\)/.test(html));

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

  const edge = await launchEdge({ port: 9236 });
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
  const load = async (url) => {
    const done = cdp.waitEvent('Page.loadEventFired', 15000);
    await cdp.send('Page.navigate', { url }, sessionId);
    await done;
    await sleep(750);
  };

  await load(GAME_URL + '?debug=1');
  await ev(`(function(){var S=__cult.S;
    S.r=1; S.circle=2; S.mana=0; S.spell=0; S.transCount=0; S.transAt=0; S.ascendCount=0;
    S.academy='s_verdant';
    S.acadData={s_verdant:{credit:0,rank:0}};
    /* 测试共享 localStorage：必须清空装备法术与学徒，否则产能基准会被别的测试污染 */
    S.spells={}; S.equip=['','','']; S.pages=0; S.pity=0; S.draws=0;
    S.apprentices=[]; S.buffs=[];
    S.tower={c_manapool:0,c_mat:0,c_mirror:0,c_alembic:0,c_library:0,c_ward:0};
    S.star={}; S.starPts=0; S.ascendCount=0;
    return 1})()`);
  await sleep(200);

  /* ---------- 按阶位解锁 ---------- */
  const lockAt2 = await ev('__cult.acad.unlocked("s_crimson")');
  await ev('__cult.S.circle = 3');
  const openAt3 = await ev('__cult.acad.unlocked("s_crimson")');
  check('见习 2 环时赤炉未解锁', lockAt2 === false, { lockAt2 });
  check('见习 3 环时赤炉解锁', openAt3 === true, { openAt3 });

  const banyBefore = await ev('__cult.acad.unlocked("s_bany")');
  const banyText = await ev('__cult.acad.unlockText("s_bany")');
  await ev('__cult.S.ascendCount = 1');
  const banyAfter = await ev('__cult.acad.unlocked("s_bany")');
  check('月巴之塔封圣前未解锁', banyBefore === false && /封圣/.test(banyText), { banyBefore, banyText });
  check('封圣后月巴之塔解锁', banyAfter === true, { banyAfter });
  await ev('__cult.S.r = 1; __cult.S.circle = 3; __cult.S.ascendCount = 0');

  /* ---------- 学分与职称 ---------- */
  const mult0 = await ev('__cult.econ.mana()');
  await ev('__cult.acad.gain(60)');            /* +1 学分 → 299 → 300 会晋升 */
  await ev('__cult.S.acadData.s_verdant.credit = 299; __cult.acad.gain(60)');
  const credit1 = await ev('__cult.S.acadData.s_verdant.credit');
  const rank1 = await ev('__cult.acad.rankOf(__cult.S.acadData.s_verdant.credit)');
  const mult1 = await ev('__cult.econ.mana()');
  check('学分按分钟累积', credit1 >= 299.99 && credit1 < 301, { credit1 });
  check('学分达 300 晋升学员', rank1 === 1, { rank1 });
  /* 职称只放大「该学院自己的加成」：翠庭只有魔力 +30%，1.15× → +34.5%
     所以总产能比例是 (1+34.5%)/(1+30%)，不是 1.15 */
  const ratio = mult1 / mult0;
  const expectRatio = (1 + 30 * 1.15 / 100) / (1 + 30 * 1.00 / 100);
  check('职称倍率只放大本院加成（+30% → +34.5%）',
    Math.abs(ratio - expectRatio) < 1e-6, { ratio, expectRatio });

  /* ---------- 首次转院免费 ---------- */
  await ev('__cult.S.mana = 0; __cult.S.transCount = 0; __cult.S.transAt = 0;');
  const cost0 = await ev('__cult.acad.cost()');
  const lingBefore0 = await ev('__cult.S.mana');
  const ok0 = await ev('__cult.acad.transfer("s_crimson")');
  const lingAfter0 = await ev('__cult.S.mana');
  check('首次转院免费', cost0 === 0 && ok0 === true && lingAfter0 === lingBefore0, { cost0, ok0, lingAfter0 });
  check('转院后当前学院切换', (await ev('__cult.S.academy')) === 's_crimson');

  /* ---------- 冷却 ---------- */
  const cd = await ev('__cult.acad.cd()');
  const canNow = await ev('__cult.acad.can("s_deepwell")');
  check('转院后进入 30 分钟冷却', cd > 29 * 60000 && cd <= 30 * 60000, { cd });
  check('冷却期内不能再转院', canNow === false, { canNow });

  await ev('__cult.save()');
  await load(GAME_URL + '?debug=1');
  const cdAfterReload = await ev('__cult.acad.cd()');
  check('刷新绕不过冷却', cdAfterReload > 0, { cdAfterReload });

  /* ---------- 旧院学分保留 + 成本递增 ---------- */
  const verdantCredit = await ev('__cult.S.acadData.s_verdant.credit');
  check('转院后旧院学分保留', verdantCredit >= 300, { verdantCredit });

  await ev('__cult.S.transAt = 0; __cult.S.mana = 1e6; __cult.S.r = 2; __cult.S.circle = 1;');
  const cost1 = await ev('__cult.acad.cost()');
  const manaB = await ev('__cult.S.mana');
  const ok1 = await ev('__cult.acad.transfer("s_deepwell")');
  const manaA = await ev('__cult.S.mana');
  check('第二次转院成本 6000', cost1 === 6000, { cost1 });
  check('第二次转院扣魔力', ok1 === true && Math.abs((manaB - manaA) - 6000) < 1e-6, { manaB, manaA });

  const cost2 = await ev('__cult.acad.cost()');
  check('第三次转院成本 18000', cost2 === 18000, { cost2 });

  /* ---------- 面板 ---------- */
  await ev('__cult.S.transAt = 0; __cult.S.mana = 1e6;');
  await ev('document.querySelector(".tab[data-id=academy]").click()');
  await sleep(400);
  const cards = await ev('document.querySelectorAll("#panelBody .card").length');
  const hasKicker = await ev('document.querySelectorAll("#panelBody .kicker").length');
  const curName = await ev('(document.querySelector("#panelBody .anNm")||{}).textContent');
  const bodyText = await ev('document.getElementById("panelBody").innerText');
  check('学院面板有 6 张卡片', cards === 6, { cards });
  check('面板含「当前学院 / 学院志」两个标签', hasKicker >= 2, { hasKicker });
  check('当前学院显示为深潭塔', /深潭塔/.test(curName || ''), { curName });
  check('锁定的学院给出解锁条件', /环后解锁|封圣后解锁/.test(bodyText), bodyText.replace(/\s+/g, ' ').slice(0, 90));

  const { data } = await cdp.send('Page.captureScreenshot', { format: 'png' }, sessionId);
  fs.writeFileSync(path.join(OUT, 't7-academy.png'), Buffer.from(data, 'base64'));
  console.log('SHOT t7-academy.png');

  /* ---------- 通过面板转院（确认弹层） ---------- */
  await ev('document.querySelector(".tab[data-id=academy]").click()');
  await sleep(200);
  await ev('document.querySelector("#panelBody .card[data-acad=s_verdant]").click()');
  await sleep(300);
  const confirmShown = await ev('document.getElementById("modal").classList.contains("show")');
  check('点卡片弹出转院确认', confirmShown === true, { confirmShown });
  await ev('document.getElementById("modalCancel").click()');
  await sleep(200);
  const stillDeep = await ev('__cult.S.academy');
  check('取消后不转院', stillDeep === 's_deepwell', { stillDeep });

  check('无 console/异常', errors.length === 0, errors.slice(0, 3));

  console.log('\n' + (fails === 0 ? '✅ ALL PASS' : '❌ ' + fails + ' FAIL'));
  await edge.close();
  process.exit(fails === 0 ? 0 : 1);
}

main().catch(e => { console.error('RUN-ERROR', e && e.stack || e); process.exit(1); });
