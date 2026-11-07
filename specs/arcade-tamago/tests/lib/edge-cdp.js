/*
 * 共用的 Edge headless + CDP 启动器
 *
 * 以前每个测试脚本自己 spawn 一个带 `Date.now()` 的 --user-data-dir：
 *   - 每个新 profile 都会触发 Edge 首启初始化，重新解包 ~15 个内置组件扩展、
 *     重下 component_crx_cache 和 ProvenanceData 的 ONNX 模型，单个目录 ~1.1 GB
 *   - profile 从不删除，`proc.kill()` 在 Windows 上只杀直接子进程，
 *     渲染/GPU/crashpad 进程会被遗留成孤儿
 * 两者叠加曾把 %TEMP% 撑到 47 GB、留下 34 个常驻 headless 实例。
 *
 * 这里固定复用一个 profile（组件与模型只下一次），并提供保证关闭的 close()：
 * 先走 CDP Browser.close，再用 taskkill /T /F 收整棵树。
 */
const { spawn, execFileSync } = require('child_process');
const fs = require('fs');
const os = require('os');
const path = require('path');

// 可执行文件只认这两个固定安装位置，不接受外部输入
const EDGE_X86 = 'C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe';
const EDGE_X64 = 'C:\\Program Files\\Microsoft\\Edge\\Application\\msedge.exe';

// 固定 profile，组件扩展 / ONNX 模型只会在第一次运行时下载
const PROFILE = path.join(os.tmpdir(), 'yueba-cdp-profile');

const sleep = ms => new Promise(r => setTimeout(r, ms));

// 起得来时不联网拉组件；file:// 截图测试用不到
const BASE_ARGS = [
  '--headless=new',
  '--disable-gpu',
  '--no-first-run',
  '--no-default-browser-check',
  '--disable-component-update',
  '--disable-background-networking',
  '--disable-sync',
  '--mute-audio',
  '--allow-file-access-from-files',
];

/** 用字面量路径启动 Edge，参数走数组，不经过 shell */
function spawnEdge(args) {
  if (fs.existsSync(EDGE_X86)) {
    return spawn('C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe',
      args, { stdio: 'ignore' });
  }
  if (fs.existsSync(EDGE_X64)) {
    return spawn('C:\\Program Files\\Microsoft\\Edge\\Application\\msedge.exe',
      args, { stdio: 'ignore' });
  }
  throw new Error('msedge.exe not found in the standard install locations');
}

function taskkillTree(pid) {
  if (!Number.isInteger(pid) || pid <= 0) return false;
  try {
    execFileSync('taskkill.exe', ['/PID', String(pid), '/T', '/F'], { stdio: 'ignore' });
    return true;
  } catch (e) {
    return false;
  }
}

/**
 * 启动一个 headless Edge 并等到 devtools 就绪。
 * @param {object} o
 * @param {number} [o.port=9222]
 * @param {string[]} [o.args=[]]     追加到 BASE_ARGS 之后
 * @param {string} [o.profile]       默认复用 PROFILE；传 null 用一次性目录
 * @param {boolean} [o.fresh=false]  true 时每次新建一次性 profile，退出时删掉
 */
async function launchEdge(o = {}) {
  const port = o.port || 9222;
  const fresh = o.fresh || o.profile === null;
  const profile = o.profile || (fresh
    ? path.join(os.tmpdir(), 'yueba-cdp-' + process.pid + '-' + Date.now())
    : PROFILE);

  const args = BASE_ARGS.concat(o.args || [], [
    '--remote-debugging-port=' + port,
    '--user-data-dir=' + profile,
    'about:blank',
  ]);

  const proc = spawnEdge(args);
  let closed = false;

  const close = async () => {
    if (closed) return;
    closed = true;
    // 1) 优雅关闭整个浏览器（比 SIGTERM 可靠，Windows 上会连带子进程）
    let ws;
    try {
      const v = await (await fetch('http://127.0.0.1:' + port + '/json/version')).json();
      ws = new WebSocket(v.webSocketDebuggerUrl);
      await new Promise((res, rej) => {
        ws.addEventListener('open', res, { once: true });
        ws.addEventListener('error', rej, { once: true });
        setTimeout(() => rej(new Error('ws timeout')), 2000);
      });
      ws.send(JSON.stringify({ id: 1, method: 'Browser.close' }));
      await sleep(400);
    } catch (_) { /* devtools 已经不在了，走兜底 */ }
    try { if (ws) ws.close(); } catch (_) {}

    // 2) 兜底：进程还在就按进程树强杀（relaunch 过的实例可能已不是这个 pid，
    //    所以 Browser.close 才是主路径，这里只是收尾）
    if (proc.exitCode === null) taskkillTree(Number(proc.pid));
    await sleep(200);

    // 3) 一次性 profile 用完即删，别留在 %TEMP%
    if (fresh) {
      for (let i = 0; i < 3; i++) {
        try { fs.rmSync(profile, { recursive: true, force: true }); break; }
        catch (_) { await sleep(600); }
      }
    }
  };

  // 注意：Edge 可能做一次 compat-layer relaunch，spawn 出来的进程会先 exit 0，
  // 真正接管 profile 的是新进程。所以只以 devtools 是否起来为准。
  for (let i = 0; i < 80; i++) {
    try {
      const r = await fetch('http://127.0.0.1:' + port + '/json/list');
      if (r.ok) return { proc, port, profile, close };
    } catch (_) {}
    await sleep(250);
  }
  await close();
  throw new Error('devtools not up on port ' + port);
}

/**
 * 清理历史遗留的一次性 profile 和其他脚本留下的垃圾目录。
 * 启动前调用一次即可，避免测试量大了以后再堆出几十 GB。
 * @param {number} [maxAgeHours=12] 超过这个时间的才删
 */
function sweepStaleProfiles(maxAgeHours = 12) {
  const root = os.tmpdir();
  const patterns = [
    /^yueba-cdp-\d+-\d+$/,      // 本库的一次性 profile
    /^tamago-[a-z0-9]+-\d+(-\d+)?$/i,
    /^noflash-\d+$/,
    /^artpx-\d+$/,
    /^ud\d+$/,
    /^cdp-ud\d+$/,
    /^HeadlessEdge\d+$/,
    /^Importer_\d+_\d+( \(\d+\))?$/,
  ];
  const cutoff = Date.now() - maxAgeHours * 3600 * 1000;
  let removed = 0;
  let entries = [];
  try { entries = fs.readdirSync(root, { withFileTypes: true }); } catch (_) { return 0; }
  for (const e of entries) {
    if (!e.isDirectory()) continue;
    if (!patterns.some(re => re.test(e.name))) continue;
    const full = path.join(root, e.name);
    try {
      if (fs.statSync(full).mtimeMs > cutoff) continue;
      fs.rmSync(full, { recursive: true, force: true });
      removed++;
    } catch (_) {}
  }
  return removed;
}

module.exports = { PROFILE, BASE_ARGS, launchEdge, sweepStaleProfiles, taskkillTree };
