'use strict';
/* ============================================================
   同步各小游戏里的 DEX_ART 立绘表（多目标）
   ------------------------------------------------------------
   本脚本只读本地文件、写回本地文件，全程不执行任何系统命令。
   数据源：index.html 的 TYPES / TYPES2 / TYPES3 三张表
   规则：
     - 只登记「有外链立绘」的月巴（img 或 imgs[0].url）
     - 沿用目标文件里已有的条目顺序，新条目追加在末尾
     - URL / 颜色 / 名字若在 index.html 变了，就地更新
     - 目标文件里已有而 index.html 已删除的 id，从表里移除
   目标（白名单，固定根目录文件名）：
     - pacman.html  条目 'id':['url','color']        （2 字段）
     - memory.html  条目 'id':['url','color','name'] （3 字段，兜底色块用名字）
     - fishing.html 条目 'id':['url','color','name'] （3 字段，随行月巴选择器）
   用法：
     node sync-dex-art.js            直接改写目标文件
     node sync-dex-art.js --check    只报告差异，不做写入（有差异时退出码 1）
   ============================================================ */

const fs = require('fs');
const path = require('path');

const ROOT = __dirname;
const INDEX = path.join(ROOT, 'index.html');
/* 目标白名单：只允许这些固定根目录文件名，防止路径穿越 */
const TARGETS = [
  { file: 'pacman.html', fields: 2 },
  { file: 'memory.html', fields: 3 },
  { file: 'run.html', fields: 3 },
  { file: 'fishing.html', fields: 3 },
];
const CHECK_ONLY = process.argv.includes('--check');
const FALLBACK_COLOR = '#9e9e9e';

function read(p) {
  if (!fs.existsSync(p)) throw new Error('找不到文件：' + p);
  return fs.readFileSync(p, 'utf8');
}

/* ---------- 1. 从 index.html 抽取「有立绘」的 id → [url, color, name] ---------- */
function parseIndex(src) {
  const from = src.indexOf('const TYPES=[');
  const to = src.indexOf('const TYPES3=');
  if (from < 0 || to < 0) throw new Error('index.html 里找不到 TYPES / TYPES3');
  const end = src.indexOf('\n];', to);
  const seg = src.slice(from, end < 0 ? src.length : end);

  const starts = Array.from(seg.matchAll(/\{id:'([^']+)'/g))
    .map(function (m) { return { id: m[1], at: m.index }; });

  const out = [];
  for (let i = 0; i < starts.length; i++) {
    const chunk = seg.slice(starts[i].at, i + 1 < starts.length ? starts[i + 1].at : seg.length);

    const img = chunk.match(/img:\s*'([^']+)'/);
    const imgs = chunk.match(/imgs:\s*\[\s*\{[^}]*?url:\s*'([^']+)'/);
    const url = (img && img[1]) || (imgs && imgs[1]);
    if (!url) continue;                       /* 没外链立绘的月巴画不出来，跳过 */

    const color = chunk.match(/(?<![\w])color:\s*'([#\w]+)'/);
    const name = chunk.match(/(?<![\w])name:\s*'([^']*)'/);
    out.push({ id: starts[i].id, url: url, color: color ? color[1] : '', name: name ? name[1] : '' });
  }
  return out;
}

/* ---------- 2. 读出目标文件里现有的 DEX_ART ---------- */
function parseTarget(src, label) {
  const head = src.indexOf('var DEX_ART = {');
  if (head < 0) throw new Error(label + ' 里找不到 DEX_ART');
  const bodyStart = head + 'var DEX_ART = {'.length;
  const bodyEnd = src.indexOf('\n  };', bodyStart);
  if (bodyEnd < 0) throw new Error(label + ' 的 DEX_ART 结尾解析失败');

  const list = [];
  const re = /'([\w]+)':\s*\['([^']*)',\s*'([^']*)'(?:,\s*'([^']*)')?\]/g;
  const body = src.slice(bodyStart, bodyEnd);
  for (const m of body.matchAll(re)) list.push({ id: m[1], url: m[2], color: m[3], name: m[4] || '' });
  return { bodyStart: bodyStart, bodyEnd: bodyEnd, list: list };
}

/* ---------- 3. 合并：沿用目标文件旧顺序，新条目追加，已消失的移除 ---------- */
function merge(oldList, fresh) {
  const freshMap = new Map(fresh.map(function (e) { return [e.id, e]; }));
  const used = new Set();
  const result = [];

  oldList.forEach(function (o) {
    const f = freshMap.get(o.id);
    if (!f) return;                           /* index 里已删除 */
    used.add(o.id);
    result.push({
      id: o.id,
      url: f.url,
      color: f.color || o.color || FALLBACK_COLOR,
      name: f.name || o.name || ''
    });
  });
  fresh.forEach(function (f) {
    if (used.has(f.id)) return;
    result.push({ id: f.id, url: f.url, color: f.color || FALLBACK_COLOR, name: f.name || '' });
  });
  return result;
}

/* ---------- 4. 生成代码块（沿用文件原换行符与缩进；fields 决定写几个字段） ---------- */
function render(list, eol, indent, fields) {
  return list.map(function (e, i) {
    let cell = "'" + e.id + "':['" + e.url + "','" + e.color + "'";
    if (fields >= 3) cell += ",'" + (e.name || '') + "'";
    cell += ']';
    return indent + cell + (i + 1 < list.length ? ',' : '');
  }).join(eol);
}

function main() {
  const indexSrc = read(INDEX);
  const fresh = parseIndex(indexSrc);
  if (fresh.length < 50) throw new Error('抽取结果异常（仅 ' + fresh.length + ' DEX_ART 条），已中止以免误删');
  console.log('index.html 有立绘的月巴：' + fresh.length + ' 条');

  let exitCode = 0;
  for (const target of TARGETS) {
    /* 只接受白名单里的固定文件名（basename 校验，防路径穿越） */
    const base = path.basename(target.file);
    if (base !== target.file) throw new Error('目标必须是根目录文件名：' + target.file);
    const targetPath = path.join(ROOT, base);
    const targetSrc = read(targetPath);
    const t = parseTarget(targetSrc, target.file);

    /* 靠内容判断换行符，别被个别行带偏 */
    const eol = /\r\n/.test(targetSrc.slice(t.bodyStart, t.bodyEnd)) ? '\r\n' : '\n';
    const indent = '    ';

    const merged = merge(t.list, fresh);
    /* 比较与渲染都按目标字段数归一：2 字段目标忽略 name，否则每次都会误报差异 */
    const cut = function (e) {
      return { id: e.id, url: e.url, color: e.color, name: target.fields >= 3 ? (e.name || '') : '' };
    };
    const mergedCut = merged.map(cut);
    const before = t.list.map(cut);
    const changed = mergedCut.length !== before.length
      || mergedCut.some(function (e, i) { return !sameEntry(e, before[i]); });

    /* 差异明细 */
    const oldIds = new Set(before.map(function (e) { return e.id; }));
    const newIds = new Set(mergedCut.map(function (e) { return e.id; }));
    const added = mergedCut.filter(function (e) { return !oldIds.has(e.id); }).map(function (e) { return e.id; });
    const removed = before.filter(function (e) { return !newIds.has(e.id); }).map(function (e) { return e.id; });
    const updated = mergedCut.filter(function (e) {
      const b = before.find(function (x) { return x.id === e.id; });
      return b && (b.url !== e.url || b.color !== e.color || b.name !== e.name);
    }).map(function (e) { return e.id; });

    console.log('--- ' + target.file + '（' + target.fields + ' 字段）');
    console.log('DEX_ART：' + before.length + ' -> ' + mergedCut.length);
    console.log('新增：' + brief(added));
    console.log('移除：' + brief(removed));
    console.log('更新：' + brief(updated));

    if (!changed) {
      console.log('== 已是最新，无需改动 ==');
      continue;
    }
    if (CHECK_ONLY) {
      console.log('存在差异，--check 不写入');
      exitCode = 1;
      continue;
    }

    const next = targetSrc.slice(0, t.bodyStart)
      + eol + render(mergedCut, eol, indent, target.fields)
      + targetSrc.slice(t.bodyEnd);
    fs.writeFileSync(targetPath, next, 'utf8');
    console.log('== 已写入 ' + target.file + ' ==');
  }
  return exitCode;
}

/* 两条目是否完全一致（同序同字段） */
function sameEntry(e, b) {
  return !!b && b.id === e.id && b.url === e.url && b.color === e.color && b.name === e.name;
}

/* 差异清单太长时截短显示 */
function brief(ids) {
  if (!ids.length) return '无';
  return ids.length > 8 ? ids.slice(0, 8).join(', ') + ' 等 ' + ids.length + ' 条' : ids.join(', ');
}

module.exports = { parseIndex: parseIndex, parseTarget: parseTarget, merge: merge, render: render };
if (require.main === module) process.exitCode = main();
