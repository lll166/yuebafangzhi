/* 月巴奥术 · 叙事验收（story.md §8）
   运行：node specs/arcade-arcane/tests/story-check.js
   覆盖：禁用词 0 次 / 「红」≤3 处 / 开场 5 句只出现一次 / 调试模式跳过 /
         回环文案兑现暗线 / 主线文案不含解释性词 / 无修仙残留词
   产物：.screenshots/arcane-tests/story-intro.png
*/
const fs = require('fs');
const path = require('path');
const { launchEdge, sweepStaleProfiles } = require('../../arcade-tamago/tests/lib/edge-cdp.js');

const ROOT = path.resolve(__dirname, '../../..');
const OUT = path.join(ROOT, '.screenshots', 'arcane-tests');
const BASE = 'file:///' + encodeURI(path.join(ROOT, 'arcane.html').replace(/\\/g, '/'));
const sleep = ms => new Promise(r => setTimeout(r, ms));

let fails = 0;
function check(name, ok, info) {
  console.log((ok ? 'PASS ' : 'FAIL ') + name + (info !== undefined ? ' :: ' + JSON.stringify(info) : ''));
  if (!ok) fails++;
}

/* ---------- 静态守卫 ---------- */
const html = fs.readFileSync(path.join(ROOT, 'arcane.html'), 'utf8');

check('static: 全文无「番茄」', (html.match(/番茄/g) || []).length === 0,
  (html.match(/番茄/g) || []).length);

const redCount = (html.match(/红/g) || []).length;
check('static: 「红」出现 ≤4 处（转世 / 机缘 / q_03 / q_12）', redCount <= 4, redCount);

/* 主线文案不得含解释性词（「原来的样子」这类实义用法不算） */
const narrLines = html.match(/brk_\d_d:'[^']*'/g) || [];
const badWords = ['因为', '其实', '后来才知道', '想念', '伤心', '执念', '想起那年'];
const badPatterns = [/原来(是|，|,|如此|这|那)/];
const hits = [];
narrLines.forEach(l => {
  badWords.forEach(w => { if (l.indexOf(w) >= 0) hits.push(w + ' in ' + l.slice(0, 24)); });
  badPatterns.forEach(re => { if (re.test(l)) hits.push(String(re) + ' in ' + l.slice(0, 24)); });
});
check('static: 九段晋级文案无解释性词', narrLines.length === 9 && hits.length === 0, hits);

check('static: 回环文案兑现「一点红」+「又坐了下去」',
  /ascend_d:'[^']*一点红[^']*又坐了下去/.test(html));

check('static: 开场 5 句齐备',
  [1, 2, 3, 4, 5].every(i => new RegExp('intro_' + i + ":").test(html)) &&
  /intro_5:'你没有说是什么。'/.test(html));

check('static: 全文无修仙禁止词',
  !/修为|灵气|境界|宗门|洞府|功法|丹药|仙缘|飞升|转世|天劫|心魔|凝气|突破|弟子|秘境|长老|真传/.test(html));

/* ---------- CDP ---------- */
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

  const edge = await launchEdge({ port: 9233 });
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
  const load = async (url) => {
    const done = cdp.waitEvent('Page.loadEventFired', 15000);
    await cdp.send('Page.navigate', { url }, sessionId);
    await done;
    await sleep(700);
  };

  await load(BASE + '?debug=1');
  const introInDebug = await ev('document.getElementById("intro").classList.contains("show")');
  check('调试模式跳过开场', introInDebug === false);

  await ev('__cult.S.seenIntro = false; __cult.save();');
  await sleep(200);
  await load(BASE);

  const introShown = await ev('document.getElementById("intro").classList.contains("show")');
  const lineCount = await ev('document.querySelectorAll("#introLines p").length');
  const firstLine = await ev('(document.querySelector("#introLines p")||{}).textContent');
  check('普通模式首次打开弹出开场', introShown === true && lineCount === 5, { introShown, lineCount });
  check('开场首句为塔顶的雪', /学院塔顶的雪/.test(firstLine || ''), firstLine);

  await sleep(4600);
  await shot('story-intro.png');

  await ev('document.getElementById("intro").click()');
  await sleep(700);
  const afterClick = await ev('document.getElementById("intro").classList.contains("show")');
  check('点击后开场关闭', afterClick === false);

  await load(BASE);
  const introAgain = await ev('document.getElementById("intro").classList.contains("show")');
  const stored = await ev('(function(){try{return JSON.parse(localStorage.getItem("yueba-arcane-v1")||"{}").seenIntro===true}catch(e){return false}})()');
  check('刷新后不再弹开场', introAgain === false);
  check('seenIntro 已持久化', stored === true);

  check('无 console/异常', errors.length === 0, errors.slice(0, 3));

  console.log('\n' + (fails === 0 ? '✅ ALL PASS' : '❌ ' + fails + ' FAIL'));
  await edge.close();
  process.exit(fails === 0 ? 0 : 1);
}

main().catch(e => { console.error('RUN-ERROR', e && e.stack || e); process.exit(1); });
