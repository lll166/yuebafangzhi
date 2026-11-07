/* 构建阶段离线导出：把「经典」关卡的整轨伴奏渲染并编码成 AAC(ADTS)，
   写成 audio/<关卡id>.js（base64 自注册，file:// 也能加载）。

   用法（在「月巴节拍」目录下）：
     node tools/build-audio.js                       # 导出全部经典关（游戏内缓存）
     node tools/build-audio.js --only=cl1_1          # 只导出某几关
     node tools/build-audio.js --force               # 覆盖已存在的文件
     node tools/build-audio.js --bitrate=96000       # 改码率（默认 96kbps 单声道）
     node tools/build-audio.js --level=c2_8 --file --seed=123456
                                                     # 把任意关（含交响终章）渲染成
                                                     # export/c2_8.aac，可直接播放

   依赖：Node 内置模块 + 本机 Edge/Chrome，无需 ffmpeg。
*/
const { spawn } = require('child_process');
const fs = require('fs');
const os = require('os');
const path = require('path');
const { pathToFileURL } = require('url');

const ROOT = path.resolve(__dirname, '..');
const GAME = path.join(ROOT, 'rhythm.html');
const OUT = path.join(ROOT, 'audio');

const args = process.argv.slice(2);
const opt = {};
for (const a of args) {
  const m = /^--([^=]+)=?(.*)$/.exec(a);
  if (m) opt[m[1]] = m[2] === '' ? true : m[2];
}
const BITRATE = parseInt(opt.bitrate || '96000', 10);
const ONLY = opt.only ? String(opt.only).split(',').filter(Boolean) : null;
const LEVEL = opt.level ? String(opt.level).split(',').filter(Boolean) : null;
const SEED = opt.seed != null ? parseInt(opt.seed, 10) : null;
const RAW_FILE = !!opt.file;   /* true=写 export/<id>.aac；false=写 audio/<id>.js */
const FORCE = !!opt.force;

const BROWSERS = [
  'C:/Program Files (x86)/Microsoft/Edge/Application/msedge.exe',
  'C:/Program Files/Microsoft/Edge/Application/msedge.exe',
  'C:/Program Files/Google/Chrome/Application/chrome.exe',
  'C:/Program Files (x86)/Google/Chrome/Application/chrome.exe'
];
const BROWSER = BROWSERS.find(p => fs.existsSync(p));
if (!BROWSER) {
  console.error('找不到 Edge/Chrome，请手动修改 BROWSERS 路径');
  process.exit(1);
}
if (!fs.existsSync(GAME)) {
  console.error('找不到 rhythm.html：' + GAME);
  process.exit(1);
}
fs.mkdirSync(OUT, { recursive: true });

const PORT = 9000 + Math.floor(Math.random() * 800);
const UDD = path.join(os.tmpdir(), 'rb-build-' + Date.now());
const sleep = ms => new Promise(r => setTimeout(r, ms));

const child = spawn(BROWSER, [
  '--headless=new', '--disable-gpu', '--autoplay-policy=no-user-gesture-required',
  '--remote-debugging-port=' + PORT, '--user-data-dir=' + UDD,
  '--no-first-run', '--no-default-browser-check', '--mute-audio',
  pathToFileURL(GAME).href + '?debug=1&intro=0'
], { stdio: 'ignore' });

function killTree() {
  try { spawn('taskkill', ['/PID', String(child.pid), '/T', '/F'], { stdio: 'ignore' }); } catch (e) {}
}

(async () => {
  let target = null;
  for (let i = 0; i < 80 && !target; i++) {
    await sleep(200);
    try {
      const res = await fetch('http://127.0.0.1:' + PORT + '/json/list');
      const list = await res.json();
      target = list.find(t => t.type === 'page' && t.webSocketDebuggerUrl);
    } catch (e) {}
  }
  if (!target) throw new Error('浏览器启动失败（没有调试目标）');

  const ws = new WebSocket(target.webSocketDebuggerUrl);
  let id = 0;
  const pending = new Map();
  const logs = [];
  ws.onmessage = ev => {
    const m = JSON.parse(ev.data);
    if (m.id && pending.has(m.id)) { pending.get(m.id)(m); pending.delete(m.id); }
    else if (m.method === 'Runtime.exceptionThrown') {
      const d = m.params.exceptionDetails;
      logs.push('EXC ' + ((d.exception && d.exception.description) || d.text));
    } else if (m.method === 'Runtime.consoleAPICalled' && m.params.type === 'error') {
      logs.push('ERR ' + m.params.args.map(a => a.value || a.description || '').join(' '));
    }
  };
  await new Promise(r => (ws.onopen = r));
  const send = (method, params = {}) => new Promise(res => {
    const i = ++id; pending.set(i, res); ws.send(JSON.stringify({ id: i, method, params }));
  });
  await send('Runtime.enable');

  const evalJS = async expr => {
    const r = await send('Runtime.evaluate', { expression: expr, returnByValue: true, awaitPromise: true });
    if (r.result && r.result.exceptionDetails) {
      const d = r.result.exceptionDetails;
      throw new Error((d.exception && (d.exception.description || d.exception.value)) || d.text);
    }
    return r.result && r.result.result ? r.result.result.value : r.result;
  };

  let ready = false;
  for (let i = 0; i < 60 && !ready; i++) {
    await sleep(200);
    ready = await evalJS('!!window.__rb');
  }
  if (!ready) throw new Error('页面没有进入调试模式（__rb 不存在）');

  if (!(await evalJS("typeof AudioEncoder==='function'"))) {
    throw new Error('当前浏览器不支持 WebCodecs AudioEncoder，无法编码');
  }

  const levels = await evalJS('__rb.levels().map(function(L,i){return {i:i,id:L.id,classic:!!L.classic};})');
  let targets;
  if (LEVEL) {
    targets = levels.filter(L => LEVEL.indexOf(L.id) >= 0);
  } else {
    /* 困难关（h 开头）与经典关音乐完全相同，只导出经典关，运行时按 id 复用 */
    targets = levels.filter(L => L.classic && !/^h/.test(L.id));
    if (ONLY) targets = targets.filter(L => ONLY.indexOf(L.id) >= 0);
  }
  if (!targets.length) throw new Error('没有可导出的关卡' + (LEVEL || ONLY ? '（--level/--only 不匹配）' : ''));

  const DEST = RAW_FILE ? path.join(ROOT, 'export') : OUT;
  if (RAW_FILE) fs.mkdirSync(DEST, { recursive: true });

  /* 让页面初始化音频上下文 */
  await evalJS('__rb.start(' + targets[0].i + ')');
  for (let i = 0; i < 40; i++) {
    await sleep(200);
    if (await evalJS('!!__rb.audio()')) break;
  }
  if (!(await evalJS('!!__rb.audio()'))) throw new Error('音频上下文未就绪（页面可能被静音授权拦住）');

  /* 等管弦采样解码完，否则最后一关会用合成音色赝品渲染 */
  for (let i = 0; i < 30; i++) {
    const o = await evalJS('(function(){try{return __rb.orch?__rb.orch():null;}catch(e){return null;}})()');
    if (o && o.ready) { console.log('管弦采样已就绪：' + JSON.stringify(o.inst)); break; }
    await sleep(200);
  }
  await sleep(500);

  const ratio = await evalJS('__rb.audio().sampleRate');
  console.log('浏览器 ' + path.basename(BROWSER) + ' · 音频采样率 ' + ratio + 'Hz · 码率 ' + BITRATE + 'bps');
  console.log('待导出 ' + targets.length + ' 关 → ' + DEST);

  let totalBytes = 0, made = 0, skipped = 0;
  for (const L of targets) {
    const file = RAW_FILE ? path.join(DEST, L.id + '.aac') : path.join(OUT, L.id + '.js');
    if (!FORCE && fs.existsSync(file)) {
      skipped++;
      console.log('  · ' + L.id + ' 已存在，跳过（--force 可覆盖）');
      continue;
    }
    const t0 = Date.now();
    const call = '__rb.exportLevel(' + L.i + ',{bitrate:' + BITRATE + (SEED != null ? ',seed:' + SEED : '') + '})';
    const res = await evalJS(call);
    if (RAW_FILE) {
      fs.writeFileSync(file, Buffer.from(res.b64, 'base64'));
    } else {
      const body =
        '/* 由 tools/build-audio.js 自动生成，请勿手改。' + L.id + ' · ' + res.dur + 's · ' +
        res.bytes + 'B · ' + res.sr + 'Hz */\n' +
        'window.__rbTrack&&window.__rbTrack(' + JSON.stringify(L.id) + ',' + JSON.stringify(res.b64) + ');\n';
      fs.writeFileSync(file, body, 'utf8');
    }
    totalBytes += res.bytes;
    made++;
    console.log('  ✓ ' + L.id + '  ' + res.dur + 's  ' + (res.bytes / 1024).toFixed(0) + 'KB  峰值 ' +
      res.peak + '  (' + ((Date.now() - t0) / 1000).toFixed(1) + 's)');
  }

  console.log('\n完成：新增 ' + made + '，跳过 ' + skipped + '，音频合计 ' + (totalBytes / 1048576).toFixed(2) + 'MB');
  if (totalBytes > 0) {
    console.log('提示：audio/*.js 已含 base64，磁盘占用比音频体积大约 33%。');
  }
  if (logs.length) {
    console.log('\n页面告警：');
    logs.slice(0, 10).forEach(l => console.log('  ' + l));
  }
  ws.close();
  killTree();
  process.exit(0);
})().catch(err => {
  console.error('\n失败：' + (err && err.message ? err.message : err));
  killTree();
  process.exit(1);
});
