/* 缺失工具①：管弦采样抓取 + 打包器
   从 midi-js-soundfonts（FluidR3 GM 转码版）下载管弦乐器的分音采样，
   只保留少量「锚点音」并按 base64 压成 audio/orch/pack.js，
   运行时由 rhythm.html 解码成 AudioBuffer 直接发声。

   用法（在「月巴节拍」目录下）：
     node tools/fetch-orchestra.js            # 缺什么补什么
     node tools/fetch-orchestra.js --refresh  # 重新下载源文件
     node tools/fetch-orchestra.js --list     # 只列出音色表

   依赖：Node 内置模块（https / fs / path / os），无需 npm 与 ffmpeg。
   音源：FluidR3 GM SoundFont（Frank Wen 制作，midi-js-soundfonts 转 mp3）。
*/
const https = require('https');
const fs = require('fs');
const os = require('os');
const path = require('path');

const ROOT = path.resolve(__dirname, '..');
const OUT_DIR = path.join(ROOT, 'audio', 'orch');
const OUT_FILE = path.join(OUT_DIR, 'pack.js');
const CACHE = path.join(os.tmpdir(), 'rb-orch-cache');
const BASE = 'https://raw.githubusercontent.com/gleitz/midi-js-soundfonts/gh-pages/FluidR3_GM/';

/* 锚点音：每个乐器取 2~5 个八度，其它音靠 playbackRate 升/降 12 个半音以内
   都能保持可用音质；再多取只会白增体积。loop 表示长音需要循环延音。 */
const INSTR = [
  { key: 'strings', src: 'string_ensemble_1', anchors: ['C2', 'C3', 'C4', 'C5', 'C6'], gain: 0.046, loop: true },
  { key: 'brass',   src: 'brass_section',     anchors: ['C2', 'C3', 'C4'],               gain: 0.050, loop: false },
  { key: 'timpani', src: 'timpani',           anchors: ['C2', 'C3'],                      gain: 0.085, loop: false },
  { key: 'wood',    src: 'flute',             anchors: ['C4', 'C5', 'C6'],               gain: 0.038, loop: true }
];

const argv = process.argv.slice(2);
const REFRESH = argv.includes('--refresh');
const LIST = argv.includes('--list');

/* 防御性校验：src 拼进缓存路径前确认只含安全字符（白名单见上方 INSTR 硬编码） */
INSTR.forEach(i => {
  if (!/^[A-Za-z0-9_-]+$/.test(i.src)) throw new Error('非法音色 src：' + i.src);
});

function noteMidi(n) {
  const m = /^([A-G])(s?)(\d)$/.exec(n);
  if (!m) return null;
  const semi = { C: 0, D: 2, E: 4, F: 5, G: 7, A: 9, B: 11 }[m[1]] + (m[2] ? 1 : 0);
  return (parseInt(m[3], 10) + 1) * 12 + semi;
}

function download(url, dest, hop = 0) {
  return new Promise((resolve, reject) => {
    if (hop > 4) return reject(new Error('重定向过多'));
    https.get(url, { headers: { 'User-Agent': 'rb-orchestra-fetch' } }, res => {
      if (res.statusCode >= 300 && res.statusCode < 400 && res.headers.location) {
        res.resume();
        return resolve(download(res.headers.location, dest, hop + 1));
      }
      if (res.statusCode !== 200) {
        res.resume();
        return reject(new Error('HTTP ' + res.statusCode + ' · ' + url));
      }
      fs.mkdirSync(path.dirname(dest), { recursive: true });
      const tmp = dest + '.part';
      const f = fs.createWriteStream(tmp);
      res.pipe(f);
      f.on('finish', () => { f.close(() => { fs.renameSync(tmp, dest); resolve(dest); }); });
      f.on('error', reject);
    }).on('error', reject);
  });
}

function parseSoundfontJS(txt) {
  const map = {};
  const re = /"([A-G]s?\d)"\s*:\s*"data:audio\/mp3;base64,([^"]*)"/g;
  let m;
  while ((m = re.exec(txt))) map[m[1]] = m[2];
  return map;
}

(async () => {
  if (LIST) {
    INSTR.forEach(i => console.log(i.key.padEnd(8) + '<-' + i.src.padEnd(20) + i.anchors.join(', ')));
    return;
  }
  fs.mkdirSync(OUT_DIR, { recursive: true });
  fs.mkdirSync(CACHE, { recursive: true });

  const pack = { v: 1, inst: {} };
  let total = 0;

  for (const spec of INSTR) {
    const cacheFile = path.join(CACHE, spec.src + '-mp3.js');
    /* 防路径穿越：解析后的缓存文件必须仍落在缓存目录内，否则拒绝继续 */
    if (!path.resolve(cacheFile).startsWith(CACHE + path.sep)) {
      throw new Error('非法音色 src（路径越界）：' + spec.src);
    }
    const ok = fs.existsSync(cacheFile) && fs.statSync(cacheFile).size > 100000;
    if (!ok || REFRESH) {
      process.stdout.write('  下载 ' + spec.src + ' … ');
      await download(BASE + spec.src + '-mp3.js', cacheFile);
      console.log((fs.statSync(cacheFile).size / 1024).toFixed(0) + 'KB');
    }
    const notes = parseSoundfontJS(fs.readFileSync(cacheFile, 'utf8'));
    const have = Object.keys(notes);
    if (!have.length) throw new Error(spec.src + ' 里没有采样数据');

    const picked = [];
    spec.anchors.forEach(n => {
      if (!notes[n]) return;
      picked.push({ m: noteMidi(n), b: notes[n] });
    });
    if (!picked.length) throw new Error(spec.src + ' 缺少锚点音（可用：' + have.slice(0, 6).join(',') + '…）');
    picked.sort((a, b) => a.m - b.m);

    const bytes = picked.reduce((s, n) => s + n.b.length, 0);
    total += bytes;
    console.log('  ✓ ' + spec.key.padEnd(8) + spec.src.padEnd(20) +
      picked.map(n => n.m).join('/').padEnd(22) + (bytes / 1024).toFixed(0) + 'KB(base64)');

    pack.inst[spec.key] = { gain: spec.gain, loop: !!spec.loop, src: spec.src, notes: picked };
  }

  const body =
    '/* 由 tools/fetch-orchestra.js 自动生成，请勿手改。\n' +
    '   音源：FluidR3 GM SoundFont（midi-js-soundfonts 转 mp3，逐音高采样）。\n' +
    '   运行时按最近的锚点音 + playbackRate 升降半音发声。 */\n' +
    'window.__rbOrch&&window.__rbOrch(' + JSON.stringify(pack) + ');\n';
  fs.writeFileSync(OUT_FILE, body, 'utf8');
  console.log('\n写出 ' + path.relative(ROOT, OUT_FILE) + ' · ' +
    (fs.statSync(OUT_FILE).size / 1024).toFixed(0) + 'KB');
})().catch(err => {
  console.error('\n失败：' + (err && err.message ? err.message : err));
  process.exit(1);
});
