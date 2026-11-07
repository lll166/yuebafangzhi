/* 月巴记忆 M4 验收：首页接入（卡片仍 hidden）
   运行：node specs/arcade-memory/tests/m4-check.js
   覆盖：GB_GAMES 卡存在且 hidden / 百巴箱不渲染 / t-mem 主题 / iframe 内名册桥
        （已解锁过滤 + muted + lowPower + lang）/ iframe 内可玩 / 关闭回箱 / 主存档零写入
   产物：.screenshots/memory-tests/m4-iframe.png */
const fs = require('fs');
const path = require('path');
const { launchEdge, sweepStaleProfiles } = require('../../arcade-tamago/tests/lib/edge-cdp.js');

const ROOT = path.resolve(__dirname, '../../..');
const OUT = path.join(ROOT, '.screenshots', 'memory-tests');
const INDEX_URL = 'file:///' + encodeURI(path.join(ROOT, 'index.html').replace(/\\/g, '/'));
const sleep = ms => new Promise(r => setTimeout(r, ms));

let fails = 0;
function check(name, ok, info) {
  console.log((ok ? 'PASS ' : 'FAIL ') + name + (info !== undefined ? ' :: ' + JSON.stringify(info) : ''));
  if (!ok) fails++;
}

/* ---------- 静态守卫 ---------- */
const idx = fs.readFileSync(path.join(ROOT, 'index.html'), 'utf8');
const game = fs.readFileSync(path.join(ROOT, 'memory.html'), 'utf8');
check('static: GB_GAMES 有 memory 卡（等接口，hidden:true）', /\{id:'memory',[^}]*hidden:true\}/.test(idx));
check('static: GB_FRAME_SEED 含 memory→mem', /GB_FRAME_SEED=\{[^}]*memory:'mem'/.test(idx));
check('static: GB_FRAME_THEMES 含 mem', /GB_FRAME_THEMES=\[[^\]]*'mem'/.test(idx));
check('static: t-mem 主题样式存在', /#gbGameOverlay\.t-mem\{/.test(idx));
check('static: 父页有 memory 名册桥（yueba-memory-roster）', /yueba-memory-ready/.test(idx) && /yueba-memory-roster/.test(idx));
check('static: 子页不写主存档', !/setItem\(\s*['"]idle-yueba-save-v2['"]/.test(game));

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
  const edge = await launchEdge({ port: 9228 });
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
  const shot = async name => {
    const { data } = await cdp.send('Page.captureScreenshot', { format: 'png' }, sessionId);
    fs.writeFileSync(path.join(OUT, name), Buffer.from(data, 'base64'));
    console.log('SHOT ' + name);
  };

  try {
    await cdp.send('Emulation.setDeviceMetricsOverride',
      { width: 960, height: 760, deviceScaleFactor: 1, mobile: false }, sessionId);
    const loaded = cdp.waitEvent('Page.loadEventFired', 15000);
    await cdp.send('Page.navigate', { url: INDEX_URL }, sessionId);
    await loaded;
    await sleep(2500);                                   /* 首页启动 */

    /* --- 1. 卡片配置：等接口隐藏中，百巴箱不渲染 --- */
    check('GB_GAMES 含 memory 且 hidden', await ev("GB_GAMES.some(function(g){return g.id==='memory'&&g.hidden===true;})"));
    await ev("gbBoxEntry(); 'ok'");                       /* 网格在开箱时渲染 */
    await sleep(600);
    check('百巴箱不显示月巴记忆卡',
      !(await ev("Array.prototype.some.call(document.querySelectorAll('#gbGrid .gbcard'),function(c){return c.textContent.indexOf('月巴记忆')>=0;})")));

    /* --- 2. 伪造图鉴解锁（7 只）+ muted + lowPower，走父页通道 --- */
    await ev("S.muted=true; S.lowPower=true;"
      + "S.collection={'mb_xiaoyue':{count:1},'mb_xin':{count:1},'mb_chi':{count:1},'mb_shui':{count:1},"
      + "'mb_wan':{count:1},'mb_pang':{count:1},'mb_gao':{count:1}}; S.collection2={}; S.collection3={}; 'ok'");
    /* 重置本游戏存档：固定 profile 会残留上一轮测试的考级/模式设置 */
    await ev("try{localStorage.setItem('yueba-memory-v1',JSON.stringify({introSeen:true}))}catch(e){}; 'ok'");
    await ev("gbFrameOpen(GB_GAMES.find(function(g){return g.id==='memory';}),'box'); 'ok'");
    await sleep(2200);                                   /* iframe 载入 + 名册往返 + 重发牌 */

    check('内嵌覆盖层弹出', await q('#gbGameOverlay.show'));
    check('覆盖层带 t-mem 主题', await q('#gbGameOverlay.t-mem.show'));
    const src = await ev("document.getElementById('gbGameFrame').src");
    check('iframe 指向 memory.html 且带 lang', /memory\.html\?lang=/.test(src), src);

    /* --- 3. 名册桥：已解锁过滤 + muted + lowPower + lang --- */
    const mem = await ev("document.getElementById('gbGameFrame').contentWindow.__MEM()");
    check('子页知道自己在内嵌', !!mem && mem.inFrame === true, mem);
    check('子页已切换到父页名册（rostered）', !!mem && mem.rostered === true);
    check('卡池只含已解锁 7 只（非 DEX_ART 全量）', !!mem && mem.pool === 7, mem && mem.pool);
    check('父页 muted 已下发', !!mem && mem.muted === true);
    check('父页 lowPower 已下发', !!mem && mem.lowPower === true);
    check('语言已下发', !!mem && !!mem.lang, mem && mem.lang);
    check('子页 body 带低功耗类', await ev("document.getElementById('gbGameFrame').contentWindow.document.body.classList.contains('lowpower')"));

    /* --- 4. iframe 内可玩：答错触发惩罚链（低功耗锁 0.45s） --- */
    const W = "document.getElementById('gbGameFrame').contentWindow";
    check('iframe 内盘面 12 张（随堂 6 对）', (await ev(W + ".document.querySelectorAll('.card').length")) === 12);
    await ev(W + ".document.querySelectorAll('.card')[0].click(); 'ok'");
    await ev(W + ".document.querySelectorAll('.card')[1].click(); 'ok'");
    await sleep(900);
    check('iframe 内答错扣 2 步（15→13）',
      (await ev(W + ".document.querySelector('#stRes').textContent")) === '13',
      await ev(W + ".document.querySelector('#stRes').textContent"));
    await shot('m4-iframe.png');

    /* --- 5. 关闭回箱 --- */
    await ev("gbFrameClose(); 'ok'");
    await sleep(400);
    check('关闭后覆盖层收起', !(await q('#gbGameOverlay.show')));
    check('关闭后 iframe 卸载', (await ev("document.getElementById('gbGameFrame').src")) === 'about:blank'
      || (await ev("document.getElementById('gbGameFrame').getAttribute('src')")) === null);

    console.log(fails ? ('== M4 验收 FAIL（' + fails + ' 项）==') : '== M4 验收全绿 ==');
  } finally {
    await cdp.close();
    await edge.close();
  }
  process.exitCode = fails ? 1 : 0;
}

main().catch(e => { console.error(e); process.exit(1); });
