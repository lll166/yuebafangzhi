/* 月巴记忆 M3 验收
   运行：node specs/arcade-memory/tests/m3-check.js
   覆盖：连错×3「当堂重考」（洗牌+生气状态+平息）/ 随机小惩罚池（围观干扰+罚抄橡皮）/
         4 档考级 × 2 模式全通关 / 主存档仍只读
   产物：.screenshots/memory-tests/m3-angry-320.png、m3-crowd-320.png、m3-eraser-320.png */
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
check('static: 主存档只读', !/setItem\(\s*['"]idle-yueba-save-v2['"]/.test(game));
check('static: 当堂重考洗牌（reshuffleUnmatched）', /function reshuffleUnmatched\(/.test(game));
check('static: 惩罚池三件套（splat/crowdPenalty/eraserPenalty）',
  /function crowdPenalty\(/.test(game) && /function eraserPenalty\(/.test(game)
  && /\[splat,crowdPenalty,eraserPenalty\]/.test(game));
check('static: 生气状态台词与平息（angry / calm 台词池）',
  /line\('angry'\)/.test(game) && /line\('calm'\)/.test(game));
check('static: M3 限时基准 85/110/135',
  /time:85/.test(game) && /time:110/.test(game) && /time:135/.test(game));

/* ---------- CDP ---------- */
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
  const edge = await launchEdge({ port: 9227 });
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
  await cdp.send('Emulation.setDeviceMetricsOverride',
    { width: 320, height: 680, deviceScaleFactor: 1, mobile: true }, sessionId);
  const fresh = async url => {
    const loaded = cdp.waitEvent('Page.loadEventFired', 12000);
    await cdp.send('Page.navigate', { url }, sessionId);
    await loaded;
    const re = cdp.waitEvent('Page.loadEventFired', 12000);
    await ev("try{localStorage.setItem('yueba-memory-v1',JSON.stringify({introSeen:true}))}catch(e){}; location.reload();");
    await re;
    await sleep(900);
  };
  const cards = () => ev('Array.prototype.map.call(document.querySelectorAll(".card"),function(c){return{id:c.dataset.id,cls:c.className};})');
  const clickCard = i => ev('document.querySelectorAll(".card")[' + i + '].click(); "ok"');
  const doMismatch = async () => {
    const cs = await cards();
    const closed = cs.map((c, i) => ({ c, i })).filter(x => x.c.cls.indexOf('open') < 0 && x.c.cls.indexOf('done') < 0);
    const a = closed[0];
    const b = closed.find(x => x.i !== a.i && x.c.id !== a.c.id);
    if (!b) return false;
    await clickCard(a.i); await clickCard(b.i);
    return true;
  };
  const doMatch = async () => {
    const cs = await cards();
    const avail = {};
    cs.forEach(c => { if (c.cls.indexOf('done') < 0 && c.cls.indexOf('open') < 0) avail[c.id] = (avail[c.id] || 0) + 1; });
    const id = Object.keys(avail).find(k => avail[k] === 2);
    if (id == null) return false;
    const idxs = [];
    cs.forEach((c, i) => { if (c.id === id && c.cls.indexOf('done') < 0 && c.cls.indexOf('open') < 0) idxs.push(i); });
    if (idxs.length < 2) return false;
    await clickCard(idxs[0]); await clickCard(idxs[1]);
    return true;
  };
  /* 惩罚等待：锁 1s + 生动画余量；罚抄出现则点 5 下擦掉 */
  const settlePenalty = async () => {
    await sleep(1450);
    if (await q('.eraser')) {
      for (let t = 0; t < 5; t++) { await ev('var b=document.querySelector("#erBtn"); if(b) b.click(); "ok"'); await sleep(120); }
      await sleep(300);
      return 'eraser';
    }
    if (await q('.crowd')) {
      const n = await ev('document.querySelectorAll(".crowd span").length'); /* crowd 只活 1.6s，先数再等 */
      await sleep(400);
      return 'crowd@' + n;
    }
    return 'plain';
  };
  /* 完美配对打完整局（假设已选中目标考级/模式） */
  const playAllMatches = async pairs => {
    for (let k = 0; k < pairs + 2; k++) {
      if (await q('#settleOv.show')) return true;
      if (!(await doMatch())) return false;
      await sleep(680);
    }
    return !!(await q('#settleOv.show'));
  };

  try {
    await fresh(GAME_URL);
    const SENTINEL = '{"muted":false,"sentinel":"M3-readonly"}';
    await ev("localStorage.setItem('idle-yueba-save-v2'," + JSON.stringify(SENTINEL) + "); 'ok'");

    /* --- 1. 连错 ×3 → 当堂重考 + 生气 --- */
    await doMismatch(); await settlePenalty();
    await doMismatch(); await settlePenalty();
    const before = await cards();                          /* 第 3 次答错前未配对牌的位置快照 */
    await doMismatch();
    await settlePenalty();
    check('连错 ×3 出现生气状态', await q('#examiner.angry'));
    const after = await cards();
    const beforeIds = before.map(c => c.id).sort().join(',');
    const afterIds = after.map(c => c.id).sort().join(',');
    check('洗牌后 id 集合不变（未配对牌集合守恒）', beforeIds === afterIds);
    check('洗牌确实挪动了位置', before.some((c, i) => after[i].id !== c.id));
    const bubble = await txt('#exBubble');
    check('考官说生气台词', bubble === '三连错！当堂重考！全部盖回去重新洗！'
      || bubble === '番茄同学，请你站起来回答！' || bubble === '再错下去，罚你把图鉴抄一百遍！', bubble);
    check('洗牌后两张牌已盖回', (await cards()).every(c => c.cls.indexOf('open') < 0));
    await shot('m3-angry-320.png');

    /* --- 2. 配对成功 → 平息 --- */
    check('生气后仍能配对', await doMatch());
    await sleep(700);
    check('配对后生气状态平息', !(await q('#examiner.angry')));

    /* --- 3. 小惩罚池：围观干扰 + 罚抄橡皮都会出现 --- */
    await fresh(GAME_URL);
    await ev('document.querySelectorAll("#segDiff .btn")[3].click(); "ok"');   /* 期末大考：步数预算大 */
    await sleep(400);
    let seenCrowd = false, seenEraser = false, eraserTapsOk = false;
    for (let k = 0; k < 14 && !(seenCrowd && seenEraser); k++) {
      if (await q('#settleOv.show')) break;
      if (!(await doMismatch())) break;
      const kind = await settlePenalty();
      if (kind.indexOf('crowd@') === 0 && !seenCrowd) {
        seenCrowd = true;
        const n = parseInt(kind.split('@')[1], 10);
        check('围观干扰至少 5 只月巴列队', n >= 5, n);
        await shot('m3-crowd-320.png');
      }
      if (kind === 'eraser' && !seenEraser) {
        seenEraser = true;
        await shot('m3-eraser-320.png');
        for (let t = 0; t < 5; t++) { await ev('var b=document.querySelector("#erBtn"); if(b) b.click(); "ok"'); await sleep(110); }
        await sleep(250);
        eraserTapsOk = !(await q('.eraser'));
      }
    }
    check('随机池出现「围观干扰」', seenCrowd);
    check('随机池出现「罚抄橡皮」', seenEraser);
    check('罚抄点满 5 次立即消失', eraserTapsOk);

    /* --- 4. 四档 × 双模式全通关 --- */
    const DIFF_NAMES = ['随堂小考', '单元测验', '期中考试', '期末大考'];
    const PAIRS = [6, 8, 10, 12];
    for (let m = 0; m < 2; m++) {
      await ev('document.querySelectorAll("#segMode .btn")[' + m + '].click(); "ok"');
      await sleep(350);
      for (let d = 0; d < 4; d++) {
        await ev('document.querySelectorAll("#segDiff .btn")[' + d + '].click(); "ok"');
        await sleep(400);
        const okPlay = await playAllMatches(PAIRS[d]);
        check(DIFF_NAMES[d] + '（' + (m === 0 ? '限步' : '限时') + '）通关', okPlay);
        check(DIFF_NAMES[d] + '（' + (m === 0 ? '限步' : '限时') + '）判定合格', (await txt('#settleStamp')) === '合格');
        await ev('document.getElementById("btnAgain").click(); "ok"');
        await sleep(250);
      }
    }

    /* --- 5. 主存档哨兵 --- */
    const mainSave = await ev("localStorage.getItem('idle-yueba-save-v2')");
    check('主存档全程未被写入', mainSave === SENTINEL, mainSave);

    console.log(fails ? ('== M3 验收 FAIL（' + fails + ' 项）==') : '== M3 验收全绿 ==');
  } finally {
    await cdp.close();
    await edge.close();
  }
  process.exitCode = fails ? 1 : 0;
}

main().catch(e => { console.error(e); process.exit(1); });
