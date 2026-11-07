/* 月巴奥术 · T3（M1-A 骨架）验收
   运行：node specs/arcade-arcane/tests/m1a-check.js
   覆盖：零外部请求 / 零 console 错误 / HUD 初值 / 魔力与咒力增长 /
         铭环推进 / 刷新不丢档 / ?lang=en 回落 / 360×640 无横向滚动
   产物：.screenshots/arcane-tests/m1a-390.png、m1a-360.png
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
check('static: 存档键 yueba-arcane-v1', /SAVE_KEY\s*:\s*'yueba-arcane-v1'/.test(html));
check('static: 不写主存档 idle-yueba-save-v2',
  !/setItem\(\s*['"]idle-yueba-save-v2['"]/.test(html));
check('static: 无外链脚本/样式/字体',
  !/<script[^>]+src=/i.test(html) && !/<link[^>]+href=/i.test(html) && !/@import/i.test(html));
check('static: 无外链图片与 url(http)',
  !/<img[^>]+src\s*=\s*["']https?:/i.test(html) && !/url\(\s*['"]?https?:/i.test(html)
  && !/https?:\/\/origin\./i.test(html));
check('static: viewport 含 viewport-fit=cover 与 user-scalable=no',
  /viewport-fit=cover/.test(html) && /user-scalable=no/.test(html));
check('static: i18n 四语表存在（en/ja/ko 空表回落）',
  /LANGS\s*=\s*\['zh','en','ja','ko'\]/.test(html) && /en:\{\},\s*ja:\{\},\s*ko:\{\}/.test(html));
check('static: 机制常量与 data.md 一致',
  /SPELL_GROW:\s*7\.5/.test(html) && /MANA_GROW:\s*2\.6/.test(html)
  && /SPELL_RATE:\s*0\.6/.test(html) && /OFFLINE_BASE:\s*0\.60/.test(html)
  && /OFFLINE_MAX:\s*1\.20/.test(html));
check('static: 无修仙禁止词',
  !/修为|灵气|境界|宗门|洞府|功法|丹药|仙缘|飞升|转世|天劫|心魔|凝气|突破|弟子|秘境|长老|真传/.test(html));

/* 代码里用到但 G 里没定义的常量会让判断静默失效（已经踩过两次） */
{
  const start = html.indexOf('var G = {');
  const gBlock = html.slice(start, html.indexOf('\n};', start));
  const defined = new Set([...gBlock.matchAll(/([A-Z_][A-Z0-9_]*)\s*:/g)].map(m => m[1]));
  const used = new Set([...html.matchAll(/\bG\.([A-Z_][A-Z0-9_]*)\b/g)].map(m => m[1]));
  const missing = [...used].filter(k => !defined.has(k));
  check('static: 所有 G 常量都有定义', missing.length === 0, missing);
}

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
  const requests = [];
  const onEvent = msg => {
    if (msg.method === 'Runtime.exceptionThrown') {
      const d = msg.params.exceptionDetails;
      errors.push('exception: ' + ((d.exception && d.exception.description) || d.text));
    } else if (msg.method === 'Runtime.consoleAPICalled' && msg.params.type === 'error') {
      errors.push('console.error: ' + msg.params.args.map(a => a.value || a.description || '').join(' '));
    } else if (msg.method === 'Network.requestWillBeSent') {
      requests.push(msg.params.request.url);
    }
  };

  const edge = await launchEdge({ port: 9231 });
  const cdp = await attach(edge.port, onEvent);
  const { targetId } = await cdp.send('Target.createTarget', { url: 'about:blank' });
  const { sessionId } = await cdp.send('Target.attachToTarget', { targetId, flatten: true });
  await cdp.send('Page.enable', {}, sessionId);
  await cdp.send('Runtime.enable', {}, sessionId);
  await cdp.send('Network.enable', {}, sessionId);

  const ev = async (expr) => {
    const r = await cdp.send('Runtime.evaluate', { expression: expr, returnByValue: true }, sessionId);
    if (r.exceptionDetails) errors.push('eval: ' + ((r.exceptionDetails.exception && r.exceptionDetails.exception.description) || r.exceptionDetails.text));
    return r.result && r.result.value;
  };
  const txt = sel => ev('(document.querySelector(' + JSON.stringify(sel) + ')||{textContent:"?"}).textContent.trim()');
  const shot = async name => {
    const { data } = await cdp.send('Page.captureScreenshot', { format: 'png' }, sessionId);
    fs.writeFileSync(path.join(OUT, name), Buffer.from(data, 'base64'));
    console.log('SHOT ' + name);
  };
  const size = (w, h) => cdp.send('Emulation.setDeviceMetricsOverride',
    { width: w, height: h, deviceScaleFactor: 1, mobile: true }, sessionId);
  const load = async (url) => {
    const done = cdp.waitEvent('Page.loadEventFired', 15000);
    await cdp.send('Page.navigate', { url }, sessionId);
    await done;
    await sleep(750);
  };

  await size(390, 844);
  await load(GAME_URL + '?debug=1');
  await ev('(function(){var S=__cult.S;S.r=0;S.circle=1;S.spell=0;S.mana=0;S.focus=100;S.disson=0;' +
           'S.posture="pon_zuo";S.academy="s_verdant";S.acadData={s_verdant:{credit:0,rank:0}};' +
           'S.stat={casts:0,maxCombo:0,circles:0,breaks:0,fails:0,attempts:0,expeditions:0,potions:0,events:0,jiban:0,trials:0,offlineMax:0,academies:1};' +
           '__cult.save();return 1})()');
  await load(GAME_URL + '?debug=1');

  const rank0 = await txt('#hudRank');
  check('HUD 初始阶位为学徒·1环', /学徒/.test(rank0) && /1环/.test(rank0), rank0);

  const rate0 = await txt('#hudRate');
  check('HUD 显示产能速率', /\+[\d.]+\/秒/.test(rate0), rate0);

  const pct0 = await txt('#progPct');
  check('咒力条从 0 附近起步（≤15%）', parseFloat(pct0) <= 15, pct0);

  const hasDebug = await ev('typeof __cult === "object"');
  check('?debug=1 暴露 __cult', hasDebug === true);
  check('初始无 console 错误', errors.length === 0, errors.slice(0, 3));

  const manaA = await ev('__cult.S.mana');
  const spellA = await ev('__cult.S.spell');
  await sleep(2600);
  const manaB = await ev('__cult.S.mana');
  const spellB = await ev('__cult.S.spell');
  check('魔力随时间增长', manaB > manaA && manaB > 0, { manaA, manaB });
  check('咒力随时间增长', spellB > spellA && spellB > 0, { spellA, spellB });

  const circleBefore = await ev('__cult.S.circle');
  await ev('__cult.S.spell = __cult.econ.need()');
  await sleep(420);
  const ready = await ev('!document.getElementById("btnMain").disabled');
  check('咒力满后主按钮可用', ready === true, { ready });
  await ev('document.getElementById("btnMain").click()');
  await sleep(350);
  const circleAfter = await ev('__cult.S.circle');
  check('铭环后环数 +1', circleAfter === circleBefore + 1, { circleBefore, circleAfter });
  const rankAfter = await txt('#hudRank');
  check('HUD 环数同步', rankAfter.indexOf(String(circleAfter) + '环') >= 0, { rankAfter, circleAfter });

  const beforeMana = await ev('__cult.S.mana');
  const beforeCircle = await ev('__cult.S.circle');
  await ev('__cult.save()');
  await load(GAME_URL + '?debug=1');
  const afterMana = await ev('__cult.S.mana');
  const afterCircle = await ev('__cult.S.circle');
  check('刷新后魔力保留', afterMana >= beforeMana * 0.98, { beforeMana, afterMana });
  check('刷新后环数保留', afterCircle === beforeCircle, { beforeCircle, afterCircle });

  await shot('m1a-390.png');

  /* 夜间配色：先确保当前是日间（存档会记住上次选择，不能假设初值） */
  await ev('(function(){var b=document.getElementById("btnTheme");' +
           'if(document.body.classList.contains("dark"))b.click();return 1})()');
  await sleep(300);
  await ev('document.getElementById("btnTheme").click()');
  await sleep(450);
  const isDark = await ev('document.body.classList.contains("dark")');
  const acadDark = await ev('getComputedStyle(document.documentElement).getPropertyValue("--acad").trim()');
  check('可切到夜间配色', isDark === true, { isDark });
  check('夜间学院主色随之变亮', acadDark === '#6fd0a2', { acadDark });
  await shot('m1a-390-dark.png');
  await ev('document.getElementById("btnTheme").click()');
  await sleep(250);

  await size(360, 640);
  await load(GAME_URL + '?debug=1');
  const overflow = await ev('document.documentElement.scrollWidth - document.documentElement.clientWidth');
  check('360×640 无横向滚动', overflow <= 0, { overflow });
  const tabH = await ev('document.querySelector(".tab").getBoundingClientRect().height');
  check('页签高度 ≥44px', tabH >= 44, { tabH });
  await shot('m1a-360.png');

  const errBefore = errors.length;
  await load(GAME_URL + '?lang=en&debug=1');
  const rankEn = await txt('#hudRank');
  check('?lang=en 不报错且回落中文', errors.length === errBefore && /学徒/.test(rankEn), { rankEn });
  const docLang = await ev('document.documentElement.lang');
  check('html lang 切换为 en', docLang === 'en', { docLang });

  const external = requests.filter(u => !/^(file:|data:|about:)/.test(u));
  check('无外部网络请求', external.length === 0, external.slice(0, 5));

  console.log('\n' + (fails === 0 ? '✅ ALL PASS' : '❌ ' + fails + ' FAIL'));
  await edge.close();
  process.exit(fails === 0 ? 0 : 1);
}

main().catch(e => { console.error('RUN-ERROR', e && e.stack || e); process.exit(1); });
