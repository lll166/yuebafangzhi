/* 月巴放置 · 云存档同步 Worker（Cloudflare Workers + D1）
 *
 * 接口只有两个，路径均为 /save：
 *   GET  /save?code=XXXX   → { ok, data, at, ver }
 *   POST /save?code=XXXX   ← 存档正文（文本，通常是 gzip 后的 base64）
 *
 * 规则：
 *   · 云端只存 sha256(pepper + 规范化后的码)，不存明文码
 *   · 每 IP 每分钟最多 3 次，超出返回 429
 *   · 单次正文超过 2MB 返回 413
 *   · 全部请求用 text/plain 收发，浏览器不会发 CORS 预检
 */

import ADMIN_HTML from './admin.html';

const CORS = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type',
  'Access-Control-Max-Age': '86400',
};
const MAX_BODY = 2 * 1024 * 1024;   // 单个存档上限 2MB
const RL_LIMIT = 3;                 // 每 IP 每分钟次数
const RL_WINDOW_MS = 60 * 1000;

function json(body, status = 200) {
  return new Response(JSON.stringify(body), {
    status,
    headers: { ...CORS, 'Content-Type': 'application/json; charset=utf-8', 'Cache-Control': 'no-store' },
  });
}

/* 与服务端保持一致：去分隔符、转大写。YUEBA-7K3M-9QX2 与 yueba7k3m9qx2 视为同一个码 */
function normCode(raw) {
  const s = String(raw || '').toUpperCase().replace(/[^A-Z0-9]/g, '');
  return s.length >= 8 && s.length <= 40 ? s : '';
}

async function hashId(code, pepper) {
  const buf = await crypto.subtle.digest('SHA-256', new TextEncoder().encode(pepper + '|' + code));
  return [...new Uint8Array(buf)].map((b) => b.toString(16).padStart(2, '0')).join('');
}

/* 北京时间日期串（Cloudflare 默认 UTC，统计要按玩家所在时区切天） */
function bjDay(ts) {
  return new Date(ts + 8 * 3600 * 1000).toISOString().slice(0, 10);
}

/* Cloudflare 免费额度参考值（看板的进度条按这些算占比） */
const QUOTA = {
  req: 100000,                       // Workers 请求 / 天
  write: 100000,                     // D1 写入行 / 天
  read: 5000000,                     // D1 读取行 / 天
  storage: 5 * 1024 * 1024 * 1024,   // D1 存储 5GB
};

/* ---------- 管理员看板：只读，凭 ADMIN_KEY 访问 ---------- */
function safeEqual(a, b) {
  a = String(a || ''); b = String(b || '');
  if (a.length !== b.length) return false;
  let d = 0;
  for (let i = 0; i < a.length; i++) d |= a.charCodeAt(i) ^ b.charCodeAt(i);
  return d === 0;
}
function checkAdmin(url, env) {
  const key = env.ADMIN_KEY || '';
  if (!key) return json({ error: 'admin_disabled' }, 503);
  if (!safeEqual(url.searchParams.get('key'), key)) return json({ error: 'forbidden' }, 403);
  return null;
}
async function adminData(url, env) {
  const now = Date.now();
  const day = bjDay(now);
  const days = Math.min(60, Math.max(7, parseInt(url.searchParams.get('days') || '14', 10) || 14));
  const since = now - days * 86400000;
  const page = Math.max(1, parseInt(url.searchParams.get('page') || '1', 10) || 1);
  const size = Math.min(100, Math.max(10, parseInt(url.searchParams.get('pageSize') || '50', 10) || 50));
  const q = String(url.searchParams.get('q') || '').toLowerCase().replace(/[^0-9a-z]/g, '');
  const sortKey = String(url.searchParams.get('sort') || 'at');
  const order = sortKey === 'bytes' ? 'bytes DESC' : sortKey === 'ver' ? 'ver DESC' : 'at DESC';

  const totals = await env.DB.prepare(
    `SELECT COUNT(*) AS codes, COALESCE(SUM(ver),0) AS uploads, COALESCE(SUM(length(data)),0) AS bytes,
            COALESCE(SUM(CASE WHEN at >= ? THEN 1 ELSE 0 END),0) AS active24,
            COALESCE(SUM(CASE WHEN at >= ? THEN 1 ELSE 0 END),0) AS active7d,
            COALESCE(SUM(CASE WHEN ver <= 1 THEN 1 ELSE 0 END),0) AS once
     FROM saves`
  ).bind(now - 86400000, now - 7 * 86400000).first();

  const today = await env.DB.prepare('SELECT req, up FROM usage WHERE day = ?').bind(day).first();

  const trend = await env.DB.prepare(
    `SELECT date(at/1000,'unixepoch','+8 hours') AS d, COUNT(*) AS n, COUNT(DISTINCT id) AS a
       FROM upload_log WHERE at >= ? GROUP BY d ORDER BY d`
  ).bind(since).all();

  const newCodes = await env.DB.prepare(
    `SELECT date(f/1000,'unixepoch','+8 hours') AS d, COUNT(*) AS n FROM (
       SELECT id, MIN(at) AS f FROM upload_log GROUP BY id
     ) WHERE f >= ? GROUP BY d ORDER BY d`
  ).bind(since).all();

  const buckets = await env.DB.prepare(
    `SELECT
       COALESCE(SUM(CASE WHEN length(data) < 10240 THEN 1 ELSE 0 END),0) AS b1,
       COALESCE(SUM(CASE WHEN length(data) >= 10240 AND length(data) < 51200 THEN 1 ELSE 0 END),0) AS b2,
       COALESCE(SUM(CASE WHEN length(data) >= 51200 AND length(data) < 102400 THEN 1 ELSE 0 END),0) AS b3,
       COALESCE(SUM(CASE WHEN length(data) >= 102400 AND length(data) < 512000 THEN 1 ELSE 0 END),0) AS b4,
       COALESCE(SUM(CASE WHEN length(data) >= 512000 THEN 1 ELSE 0 END),0) AS b5
     FROM saves`
  ).first();

  const where = q ? 'WHERE id LIKE ?' : '';
  const filterArgs = q ? [q + '%'] : [];
  const totalRow = await env.DB.prepare(`SELECT COUNT(*) AS n FROM saves ${where}`)
    .bind(...filterArgs).first();
  const rows = await env.DB.prepare(
    `SELECT id, ver, length(data) AS bytes, at FROM saves ${where} ORDER BY ${order} LIMIT ? OFFSET ?`
  ).bind(...filterArgs, size, (page - 1) * size).all();

  const logRows = await env.DB.prepare('SELECT COUNT(*) AS n FROM upload_log').first();

  return json({
    ok: true, now, day, page, pageSize: size, total: totalRow ? totalRow.n : 0,
    quota: QUOTA,
    today: { req: today ? today.req : 0, up: today ? today.up : 0 },
    totals, buckets,
    logRows: logRows ? logRows.n : 0,
    trend: trend.results || [],
    newCodes: newCodes.results || [],
    rows: rows.results || [],
  });
}

async function adminExport(env) {
  const rows = await env.DB.prepare(
    'SELECT id, ver, length(data) AS bytes, at FROM saves ORDER BY at DESC LIMIT 5000'
  ).all();
  const lines = ['hash_prefix,bytes,ver,last_upload_iso'];
  for (const r of rows.results || []) {
    lines.push([r.id.slice(0, 8), r.bytes, r.ver, new Date(r.at).toISOString()].join(','));
  }
  return new Response('\ufeff' + lines.join('\n'), {
    headers: {
      ...CORS,
      'Content-Type': 'text/csv; charset=utf-8',
      'Content-Disposition': 'attachment; filename="yueba-cloud-saves.csv"',
      'Cache-Control': 'no-store',
    },
  });
}
async function adminSave(url, env) {
  const id = String(url.searchParams.get('h') || '');
  if (!/^[0-9a-f]{64}$/i.test(id)) return json({ error: 'bad_id' }, 400);
  const row = await env.DB.prepare('SELECT data, at, ver FROM saves WHERE id = ?').bind(id).first();
  if (!row) return json({ error: 'not_found' }, 404);
  return json({ ok: true, data: row.data, at: row.at, ver: row.ver });
}

/* ---------- 月巴大扫除 · 排行榜 ----------
 *   GET  /board?day=all|yyyy-mm-dd&diff=easy  → { ok, rows:[{name,time,at}] }
 *   POST /board                               ← JSON 文本 { day, diff, uid, name, time }
 * 与 /save 不同：GET 不限流不计数（看榜高频），POST 用独立的宽松限流（20 次/分钟）。
 * 成绩无法防伪造，只做基本范围校验，尽力而为。 */
const BOARD_MIN_TIME = 3;          // 秒；低于视为异常
const BOARD_MAX_TIME = 86400;      // 秒；一天上限
const BOARD_RL_LIMIT = 20;         // 每 IP 每分钟提交次数

function boardNormDay(raw) {
  const s = String(raw || '');
  return s === 'all' ? 'all' : (/^\d{4}-\d{2}-\d{2}$/.test(s) ? s : '');
}
function boardNormDiff(raw) {
  const s = String(raw || '').toLowerCase();
  return /^[a-z0-9_-]{1,16}$/.test(s) ? s : '';
}
function boardNormName(raw) {
  const s = String(raw || '').replace(/[\u0000-\u001f\u007f]/g, '').trim();
  return [...s].length ? [...s].slice(0, 12).join('') : '';
}

async function boardGet(url, env) {
  const day = boardNormDay(url.searchParams.get('day') || 'all');
  const diff = boardNormDiff(url.searchParams.get('diff'));
  if (!day || !diff) return json({ error: 'bad_params' }, 400);
  const n = Math.min(100, Math.max(1, parseInt(url.searchParams.get('n') || '50', 10) || 50));
  const rows = await env.DB.prepare(
    'SELECT uid, name, time, at FROM board WHERE day = ? AND diff = ? ORDER BY time ASC, at ASC LIMIT ?'
  ).bind(day, diff, n).all();
  return json({ ok: true, rows: rows.results || [] });
}

async function boardPost(req, env, ip) {
  let j = {};
  try { j = JSON.parse(await req.text() || '{}'); } catch (e) {}
  const day = boardNormDay(j.day);
  const diff = boardNormDiff(j.diff);
  const uid = String(j.uid || '');
  const name = boardNormName(j.name);
  const time = Math.floor(Number(j.time));
  if (!day || !diff) return json({ error: 'bad_params' }, 400);
  if (!/^[A-Za-z0-9_-]{8,64}$/.test(uid)) return json({ error: 'bad_uid' }, 400);
  if (!name) return json({ error: 'bad_name' }, 400);
  if (!Number.isFinite(time) || time < BOARD_MIN_TIME || time > BOARD_MAX_TIME) {
    return json({ error: 'bad_time' }, 400);
  }

  /* 提交限流：与 /save 的 3 次/分钟分开，用前缀区分键 */
  const win = Math.floor(Date.now() / RL_WINDOW_MS);
  const hit = await env.DB.prepare(
    `INSERT INTO rl (ip, win, cnt) VALUES (?, ?, 1)
     ON CONFLICT(ip, win) DO UPDATE SET cnt = cnt + 1
     RETURNING cnt`
  ).bind('b:' + ip, win).first();
  if (hit && hit.cnt > BOARD_RL_LIMIT) return json({ error: 'rate_limited' }, 429);

  const now = Date.now();
  await env.DB.prepare(
    `INSERT INTO board (day, diff, uid, name, time, at) VALUES (?, ?, ?, ?, ?, ?)
     ON CONFLICT(day, diff, uid) DO UPDATE SET
       name = excluded.name, time = MIN(board.time, excluded.time), at = excluded.at`
  ).bind(day, diff, uid, name, time, now).run();

  const rankRow = await env.DB.prepare(
    'SELECT COUNT(*) + 1 AS r FROM board WHERE day = ? AND diff = ? AND time < ?'
  ).bind(day, diff, time).first();
  /* 排行榜提交也计入当日用量，便于看板估算免费额度 */
  await env.DB.prepare(
    `INSERT INTO usage (day, req, up) VALUES (?, 1, 0)
     ON CONFLICT(day) DO UPDATE SET req = req + 1`
  ).bind(bjDay(now)).run();

  return json({ ok: true, rank: rankRow ? rankRow.r : null });
}

export default {
  async fetch(req, env) {
    if (req.method === 'OPTIONS') return new Response(null, { headers: CORS });

    const url = new URL(req.url);

    if (url.pathname === '/admin') {
      return new Response(ADMIN_HTML, {
        headers: { 'Content-Type': 'text/html; charset=utf-8', 'Cache-Control': 'no-store' },
      });
    }
    if (url.pathname.indexOf('/admin/') === 0) {
      const denied = checkAdmin(url, env);
      if (denied) return denied;
      if (url.pathname === '/admin/data') return adminData(url, env);
      if (url.pathname === '/admin/export') return adminExport(env);
      if (url.pathname === '/admin/save') return adminSave(url, env);
      return json({ error: 'not_found' }, 404);
    }

    if (url.pathname === '/board') {
      const ip = req.headers.get('cf-connecting-ip') || req.headers.get('x-forwarded-for') || 'unknown';
      if (req.method === 'GET') return boardGet(url, env);
      if (req.method === 'POST') return boardPost(req, env, ip);
      return json({ error: 'method_not_allowed' }, 405);
    }

    if (url.pathname !== '/save') return json({ error: 'not_found' }, 404);

    /* 限流：按「IP + 分钟窗口」计数，窗口自动滚动 */
    const ip = req.headers.get('cf-connecting-ip') || req.headers.get('x-forwarded-for') || 'unknown';
    const win = Math.floor(Date.now() / RL_WINDOW_MS);
    const hit = await env.DB.prepare(
      `INSERT INTO rl (ip, win, cnt) VALUES (?, ?, 1)
       ON CONFLICT(ip, win) DO UPDATE SET cnt = cnt + 1
       RETURNING cnt`
    ).bind(ip, win).first();
    if (hit && hit.cnt > RL_LIMIT) return json({ error: 'rate_limited' }, 429);

    /* 每日用量计数：只统计通过限流的请求，供看板估算免费额度剩余 */
    const day = bjDay(Date.now());
    await env.DB.prepare(
      `INSERT INTO usage (day, req, up) VALUES (?, 1, 0)
       ON CONFLICT(day) DO UPDATE SET req = req + 1`
    ).bind(day).run();

    const code = normCode(url.searchParams.get('code'));
    if (!code) return json({ error: 'bad_code' }, 400);
    const id = await hashId(code, env.PEPPER || '');

    if (req.method === 'GET') {
      const row = await env.DB.prepare('SELECT data, at, ver FROM saves WHERE id = ?').bind(id).first();
      if (!row) return json({ error: 'not_found' }, 404);
      return json({ ok: true, data: row.data, at: row.at, ver: row.ver });
    }

    if (req.method !== 'POST') return json({ error: 'method_not_allowed' }, 405);

    const body = await req.text();
    if (!body) return json({ error: 'empty' }, 400);
    if (body.length > MAX_BODY) return json({ error: 'too_large', max: MAX_BODY }, 413);

    const now = Date.now();
    const saved = await env.DB.prepare(
      `INSERT INTO saves (id, data, at, ver) VALUES (?, ?, ?, 1)
       ON CONFLICT(id) DO UPDATE SET data = excluded.data, at = excluded.at, ver = saves.ver + 1
       RETURNING at, ver`
    ).bind(id, body, now).first();

    /* 上传流水：画趋势图用，只记元数据不记内容 */
    await env.DB.prepare('INSERT INTO upload_log (id, at, bytes, ver) VALUES (?, ?, ?, ?)')
      .bind(id, now, body.length, saved ? saved.ver : 1).run();
    await env.DB.prepare(
      `INSERT INTO usage (day, req, up) VALUES (?, 0, 1)
       ON CONFLICT(day) DO UPDATE SET up = up + 1`
    ).bind(day).run();

    /* 偶尔清理过期数据，避免表无限增长 */
    if (Math.random() < 0.02) {
      await env.DB.prepare('DELETE FROM rl WHERE win < ?').bind(win - 5).run();
      await env.DB.prepare('DELETE FROM upload_log WHERE at < ?').bind(now - 90 * 86400000).run();
      await env.DB.prepare('DELETE FROM usage WHERE day < ?').bind(bjDay(now - 400 * 86400000)).run();
    }

    return json({ ok: true, at: saved ? saved.at : now, ver: saved ? saved.ver : 1 });
  },
};
