/* 月巴记忆 M2 玩法验收
   运行：node specs/arcade-memory/tests/m2-check.js
   覆盖：惩罚链（台词/✗章/代价/墨渍）/ 配对与连击 / 合格结算+新纪录 /
         步数耗尽不合格 / 限时倒计时与扣时 / 开场白跳过 / 主存档只读
   产物：.screenshots/memory-tests/m2-win-320.png、m2-lose-320.png */
const fs = require('fs');
const path = require('path');
const { launchEdge, sweepStaleProfiles } = require('../../arcade-tamago/tests/lib/edge-cdp.js');

const ROOT = path.resolve(__dirname, '../../..');
const OUT = path.join(ROOT, '.screenshots', 'memory-tests');
const GAME_URL = 'file:///' + encodeURI(path.join(ROOT, 'memory.html').replace(/\\/g, '/'));
const sleep = ms => new Promise(r => setTimeout(r, ms));

let fails = 0;
function check(name, ok, info) {
  console.log((ok ? 'PASS ' : 'FAIL ') + name + (info !== undefined ? ' :: ' + JSON.stringify(info) : ''));
  if (!ok) fails++;
}

/* ---------- 静态守卫 ---------- */
const game = fs.readFileSync(path.join(ROOT, 'memory.html'), 'utf8');
check('static: 主存档只读（无 setItem idle-yueba-save-v2）', !/setItem\(\s*['"]idle-yueba-save-v2['"]/.test(game));
check('static: 独立存档键 yueba-memory-v1', /SAVE_KEY='yueba-memory-v1'/.test(game));
check('static: 惩罚链四件套齐（penalty/ bstamp/ splat/ mock 台词池）',
  /function penalty\(/.test(game) && /function boardStamp\(/.test(game)
  && /function splat\(/.test(game) && /line\('mock'\)/.test(game));
check('static: 结算与开场白齐（showSettle/showIntro）',
  /function showSettle\(/.test(game) && /function showIntro\(/.test(game));

/* ---------- 极简 CDP 会话（同 shot-m1） ---------- */
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

async function main() {
  sweepStaleProfiles();
  fs.mkdirSync(OUT, { recursive: true });
  const edge = await launchEdge({ port: 9226 });
  const cdp = await attach(edge.port);
  const { targetId } = await cdp.send('Target.createTarget', { url: 'about:blank' });
  const { sessionId } = await cdp.send('Target.attachToTarget', { targetId, flatten: true });
  await cdp.send('Page.enable', {}, sessionId);

  const ev = async (expr) => {
    const r = await cdp.send('Runtime.evaluate', { expression: expr, returnByValue: true }, sessionId);
    if (r.exceptionDetails) {
      console.log('PAGE-ERROR ' + ((r.exceptionDetails.exception && r.exceptionDetails.exception.description) || r.exceptionDetails.text));
    }
    return r.result && r.result.value;
  };
  const q = sel => ev('!!document.querySelector(' + JSON.stringify(sel) + ')');
  const txt = sel => ev('(document.querySelector(' + JSON.stringify(sel) + ')||{textContent:"?"}).textContent.trim()');
  const shot = async name => {
    const { data } = await cdp.send('Page.captureScreenshot', { format: 'png' }, sessionId);
    fs.writeFileSync(path.join(OUT, name), Buffer.from(data, 'base64'));
    console.log('SHOT ' + name);
  };
  /* 打开页面并重置本游戏存档（introSeen:true 跳过开场白，其余默认） */
  const fresh = async url => {
    await cdp.send('Emulation.setDeviceMetricsOverride',
      { width: 320, height: 680, deviceScaleFactor: 1, mobile: true }, sessionId);
    const loaded = cdp.waitEvent('Page.loadEventFired', 12000);
    await cdp.send('Page.navigate', { url }, sessionId);
    await loaded;
    const re = cdp.waitEvent('Page.loadEventFired', 12000);
    await ev("try{localStorage.setItem('yueba-memory-v1',JSON.stringify({introSeen:true}))}catch(e){}; location.reload();");
    await re;
    await sleep(1000);
  };
  const cards = () => ev('Array.prototype.map.call(document.querySelectorAll(".card"),function(c){return{id:c.dataset.id,cls:c.className};})');
  const clickCard = i => ev('document.querySelectorAll(".card")[' + i + '].click(); "ok"');
  const closedIdx = async () => {
    const cs = await cards();
    return cs.map((c, i) => ({ c, i })).filter(x => x.c.cls.indexOf('open') < 0 && x.c.cls.indexOf('done') < 0);
  };
  /* 翻两张不同 id 的牌（答错） */
  const doMismatch = async () => {
    const closed = await closedIdx();
    const a = closed[0];
    const b = closed.find(x => x.i !== a.i && x.c.id !== a.c.id);
    if (!b) return false;
    await clickCard(a.i); await clickCard(b.i);
    return true;
  };
  /* 翻一对同 id 的牌（配对成功）——只在未配对的牌里找，别撞上已完成对 */
  const doMatch = async () => {
    const cs = await cards();
    const avail = {};
    cs.forEach(c => {
      if (c.cls.indexOf('done') < 0 && c.cls.indexOf('open') < 0) avail[c.id] = (avail[c.id] || 0) + 1;
    });
    const id = Object.keys(avail).find(k => avail[k] === 2);
    if (id == null) return false;
    const idxs = [];
    cs.forEach((c, i) => { if (c.id === id && c.cls.indexOf('done') < 0 && c.cls.indexOf('open') < 0) idxs.push(i); });
    if (idxs.length < 2) return false;
    await clickCard(idxs[0]); await clickCard(idxs[1]);
    return true;
  };

  try {
    /* 主存档哨兵：全程结束后必须一字不变 */
    await fresh(GAME_URL);
    const SENTINEL = '{"muted":false,"sentinel":"M2-readonly"}';
    await ev("localStorage.setItem('idle-yueba-save-v2'," + JSON.stringify(SENTINEL) + "); 'ok'");

    /* --- 1. 初始 HUD --- */
    check('初始 STEPS=15', await txt('#stRes') === '15', await txt('#stRes'));
    check('初始 PAIRS=0/6', /0\s*\/\s*6/.test(await txt('#stPairs')));
    check('无开场白（introSeen 已设）', !(await q('#introOv.show')));

    /* --- 2. 答错 → 惩罚链 --- */
    await doMismatch();
    await sleep(600);
    check('答错扣 2 步（翻牌 1 + 惩罚 1）：13', await txt('#stRes') === '13', await txt('#stRes'));
    check('✗ 批改章出现', await q('.bstamp'));
    check('随机小惩罚出现（墨渍/围观/罚抄任一）',
      (await q('.splat')) || (await q('.crowd')) || (await q('.eraser')));
    const bubble1 = await txt('#exBubble');
    check('考官台词换成嘲讽池语句', bubble1.length > 0 && bubble1 !== '开考！翻吧翻吧～', bubble1);
    await sleep(1100);
    check('惩罚结束后两张牌盖回', (await cards()).every(c => c.cls.indexOf('open') < 0));
    check('连击保持 ×0', await txt('#stCombo') === '×0');

    /* --- 3. 配对成功 → 连击与扣步 --- */
    check('能找到一对并配对', await doMatch());
    await sleep(700);
    check('PAIRS=1/6', /1\s*\/\s*6/.test(await txt('#stPairs')));
    check('连击 ×1', await txt('#stCombo') === '×1');
    check('再扣 1 步：12', await txt('#stRes') === '12', await txt('#stRes'));
    check('两张卡带 ✓（.done）', (await cards()).filter(c => c.cls.indexOf('done') >= 0).length === 2);

    /* --- 4. 再答错 → 连击清零 --- */
    await doMismatch();
    await sleep(600);
    await sleep(1100);
    check('连击清零 ×0', await txt('#stCombo') === '×0');
    check('扣 2 步：10', await txt('#stRes') === '10', await txt('#stRes'));

    /* --- 5. 配完剩余 4 对 → 合格结算 + 新纪录 --- */
    for (let k = 0; k < 6; k++) {
      if (await q('#settleOv.show')) break;
      if (!(await doMatch())) break;
      await sleep(700);
    }
    check('结算浮层出现', await q('#settleOv.show'));
    check('判定为合格', (await txt('#settleStamp')) === '合格');
    check('PAIRS=6/6', /6\s*\/\s*6/.test(await txt('#stPairs')));
    check('剩余步数=5（10 - 5 对）', /5\s*步/.test(await txt('#settleLines')), await txt('#settleLines'));
    check('BEST 已记录=5', await txt('#stBest') === '5', await txt('#stBest'));
    check('首胜即新纪录', await q('#settleRecord.show'));
    check('结算含本局月巴一览（6 只）', (await ev('document.querySelectorAll("#settleDex .mini").length')) === 6);
    await shot('m2-win-320.png');

    /* --- 6. 再考一次 → 全新局 --- */
    await ev('document.getElementById("btnAgain").click(); "ok"');
    await sleep(400);
    check('再考一次后 PAIRS 归零', /0\s*\/\s*6/.test(await txt('#stPairs')));
    check('再考一次后 STEPS=15', await txt('#stRes') === '15');

    /* --- 7. 连续答错耗尽步数 → 不合格 --- */
    await fresh(GAME_URL);
    for (let k = 0; k < 12; k++) {
      if (await q('#settleOv.show')) break;
      if (!(await doMismatch())) break;
      await sleep(1450);
    }
    check('步数耗尽出现结算', await q('#settleOv.show'));
    check('判定为不合格', (await txt('#settleStamp')) === '不合格');
    check('弹脑门番茄出场', await q('#tomatoFlick.show'));
    await shot('m2-lose-320.png');

    /* --- 8. 限时模式：倒计时 + 答错扣 3 秒 --- */
    await fresh(GAME_URL);
    await ev('document.querySelectorAll("#segMode .btn")[1].click(); "ok"');
    await sleep(400);
    check('限时模式初始 60s（随堂）', await txt('#stRes') === '60', await txt('#stRes'));
    const t1 = parseInt(await txt('#stRes'), 10);
    await sleep(2200);
    const t2 = parseInt(await txt('#stRes'), 10);
    check('倒计时在走（2.2s 内至少 -2）', t2 <= t1 - 2, { t1, t2 });
    const t3 = parseInt(await txt('#stRes'), 10);
    await doMismatch();
    await sleep(700);
    const t4 = parseInt(await txt('#stRes'), 10);
    check('答错额外 -3 秒（含 1s 自然流失）', t3 - t4 >= 3, { t3, t4 });

    /* --- 9. 开场白：首次进入可跳过 --- */
    await cdp.send('Emulation.setDeviceMetricsOverride',
      { width: 320, height: 680, deviceScaleFactor: 1, mobile: true }, sessionId);
    {
      const loaded = cdp.waitEvent('Page.loadEventFired', 12000);
      await cdp.send('Page.navigate', { url: GAME_URL }, sessionId);
      await loaded;
      const re = cdp.waitEvent('Page.loadEventFired', 12000);
      await ev("try{localStorage.removeItem('yueba-memory-v1')}catch(e){}; location.reload();");
      await re;
      await sleep(800);
    }
    check('无存档时开场白出现', await q('#introOv.show'));
    check('开场白第一句非空', (await txt('#introText')).length > 4);
    await ev('document.getElementById("btnIntroSkip").click(); "ok"');
    await sleep(300);
    check('跳过后开场白消失', !(await q('#introOv.show')));
    check('跳过后卡盘已发牌', (await ev('document.querySelectorAll(".card").length')) === 12);

    /* --- 10. 主存档哨兵比对 --- */
    const mainSave = await ev("localStorage.getItem('idle-yueba-save-v2')");
    check('主存档全程未被写入', mainSave === SENTINEL, mainSave);

    console.log(fails ? ('== M2 验收 FAIL（' + fails + ' 项）==') : '== M2 验收全绿 ==');
  } finally {
    await cdp.close();
    await edge.close();
  }
  process.exitCode = fails ? 1 : 0;
}

main().catch(e => { console.error(e); process.exit(1); });
