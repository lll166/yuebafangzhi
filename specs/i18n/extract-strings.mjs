/* ============================================================================
 * i18n 文本盘点脚本（P0）
 * 用途：从 index.html 中抽出所有「含中日韩文字」的字符串与 HTML 文案，去重后
 *       输出待翻译清单 specs/i18n/strings.json，供 P1～P8 分批填充翻译时对照。
 * 用法：在项目根目录执行  node specs/i18n/extract-strings.mjs
 * 说明：只做静态扫描（正则），不改动 index.html，也不会误判模板变量；
 *       统计口径以「去重后的唯一字符串」为准。
 * ==========================================================================*/
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..', '..');
const SRC = path.join(ROOT, 'index.html');
const OUT = path.join(ROOT, 'specs', 'i18n', 'strings.json');

const html = fs.readFileSync(SRC, 'utf8');

// 行号索引（二分查找，避免逐字符扫描）
const lineStarts = [0];
for (let i = 0; i < html.length; i++) if (html.charCodeAt(i) === 10) lineStarts.push(i + 1);
function lineAt(idx) {
  let lo = 0, hi = lineStarts.length - 1;
  while (lo < hi) { const m = (lo + hi + 1) >> 1; if (lineStarts[m] <= idx) lo = m; else hi = m - 1; }
  return lo + 1;
}

// 需要抽取的文字范围：假名、谚文、汉字、中日韩标点与全角符号
const CJK = /[\u3000-\u303f\u3040-\u30ff\u3400-\u4dbf\u4e00-\u9fff\uac00-\ud7af\uf900-\ufaff\uff00-\uffef]/;
const hasCJK = (s) => CJK.test(s);

// 标记 script / style 区块，便于把「JS 字符串」「CSS」「HTML 文本」区分开
const regions = [];
for (const re of [/<script[^>]*>[\s\S]*?<\/script>/gi, /<style[^>]*>[\s\S]*?<\/style>/gi]) {
  let m;
  while ((m = re.exec(html))) regions.push([m.index, m.index + m[0].length, re.source.indexOf('script') >= 0 ? 'js' : 'css']);
}
const inRegion = (i, kind) => regions.some(([a, b, k]) => k === kind && i >= a && i < b);

const map = new Map(); // 文案 -> { s, kind, field, count, line }
function add(text, kind, field, at) {
  const s = text.trim();
  if (!s || !hasCJK(s)) return;
  const key = kind + '\u0000' + field + '\u0000' + s;
  const hit = map.get(key);
  if (hit) { hit.count++; return; }
  map.set(key, { s, kind, field, count: 1, line: lineAt(at) });
}

// 1) JS 字符串字面量：'…' / "…" / `…`
for (const re of [/'((?:[^'\\\n]|\\.)*)'/g, /"((?:[^"\\\n]|\\.)*)"/g, /`((?:[^`\\]|\\.)*)`/gs]) {
  let m;
  while ((m = re.exec(html))) {
    if (!inRegion(m.index, 'js')) continue;
    add(m[1], 'js', 'literal', m.index);
  }
}
// 2) HTML 文本节点
{
  const re = />([^<>]+)</g;
  let m;
  while ((m = re.exec(html))) {
    const at = m.index;
    if (inRegion(at, 'js') || inRegion(at, 'css')) continue;
    add(m[1], 'html', 'text', at);
  }
}
// 3) HTML 上会展示给玩家的属性：title / placeholder / aria-label / alt
{
  const re = /\b(title|placeholder|aria-label|alt)="([^"]*)"/g;
  let m;
  while ((m = re.exec(html))) {
    const at = m.index;
    if (inRegion(at, 'js') || inRegion(at, 'css')) continue;
    add(m[2], 'html', m[1], at);
  }
}

// 4) 从以上所有文案里切出「连续中日韩文字片段」——这才是真正的翻译单元
//    （整段 HTML 模板作为上下文保留在 items 里，片段表用于逐词对照与查漏）
const RUN = /[\u3000-\u303f\u3040-\u30ff\u3400-\u4dbf\u4e00-\u9fff\uac00-\ud7af\uf900-\ufaff\uff00-\uffef]{2,}/g;
const phraseMap = new Map();
for (const it of map.values()) {
  let m;
  RUN.lastIndex = 0;
  while ((m = RUN.exec(it.s))) {
    const p = m[0].trim();
    if (p.replace(/[\u3000-\u303f\uff00-\uffef]/g, '').length < 1) continue; // 纯标点丢弃
    phraseMap.set(p, (phraseMap.get(p) || 0) + it.count);
  }
}
const phrases = [...phraseMap.entries()]
  .map(([s, count]) => ({ s, count, len: s.length }))
  .sort((a, b) => b.len - a.len || b.count - a.count);

const items = [...map.values()].sort((a, b) => b.s.length - a.s.length || a.line - b.line);
// 分类口径：≤12 字视为界面短文案，其余视为内容长文本（供 P1/P2 与 P3~P7 分流）
items.forEach((it) => { it.tier = it.s.length <= 12 ? 'short' : 'long'; });

const stat = (pred) => items.filter(pred).length;
const summary = {
  source: 'index.html',
  scannedAt: new Date().toISOString().slice(0, 10),
  uniqueStrings: items.length,
  uniquePhrases: phrases.length,
  phraseOccurrences: phrases.reduce((n, p) => n + p.count, 0),
  byTier: { short: stat((i) => i.tier === 'short'), long: stat((i) => i.tier === 'long') },
  byKind: {
    jsLiteral: stat((i) => i.kind === 'js'),
    htmlText: stat((i) => i.kind === 'html' && i.field === 'text'),
    htmlAttr: stat((i) => i.kind === 'html' && i.field !== 'text'),
  },
  totalOccurrences: items.reduce((n, i) => n + i.count, 0),
};

fs.mkdirSync(path.dirname(OUT), { recursive: true });
fs.writeFileSync(OUT, JSON.stringify({ summary, phrases, items }, null, 1), 'utf8');

console.log('盘点完成 →', path.relative(ROOT, OUT));
console.log('唯一文案', summary.uniqueStrings, '条（出现', summary.totalOccurrences, '次）');
console.log('  界面短文案(≤12字)', summary.byTier.short, '条');
console.log('  内容长文本(>12字)', summary.byTier.long, '条');
console.log('  JS 字符串', summary.byKind.jsLiteral, '/ HTML 文本', summary.byKind.htmlText, '/ HTML 属性', summary.byKind.htmlAttr);
console.log('可翻译中文片段', summary.uniquePhrases, '个（出现', summary.phraseOccurrences, '次）');
console.log('最长的 5 个片段：');
phrases.slice(0, 5).forEach((p) => console.log('  ' + p.len + '字  ' + p.s.slice(0, 60) + '…'));
