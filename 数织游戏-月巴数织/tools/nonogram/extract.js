/* 从 index.html 提取「带外链立绘的月巴」池，供 gen.py 生成数织题目。
   用法：node tools/nonogram/extract.js  ->  tools/nonogram/pool.json */
const fs = require('fs');
const path = require('path');

const root = path.resolve(__dirname, '..', '..');
const src = fs.readFileSync(path.join(root, 'index.html'), 'utf8');

function grabArray(name) {
  const start = src.indexOf('const ' + name + '=[');
  if (start < 0) throw new Error('missing array ' + name);
  const bodyStart = start + ('const ' + name + '=').length;
  const end = src.indexOf('\n];', bodyStart);
  if (end < 0) throw new Error('unterminated array ' + name);
  return (0, eval)('(' + src.slice(bodyStart, end + 2) + ')');
}
function grabObject(name) {
  const start = src.indexOf('const ' + name + '={');
  if (start < 0) throw new Error('missing object ' + name);
  const bodyStart = start + ('const ' + name + '=').length;
  const end = src.indexOf('\n};', bodyStart);
  if (end < 0) throw new Error('unterminated object ' + name);
  return (0, eval)('(' + src.slice(bodyStart, end + 2) + ')');
}

const TYPES = grabArray('TYPES');
const TYPES2 = grabArray('TYPES2');
const TYPES3 = grabArray('TYPES3');
const BANNY = grabObject('I18N_BANNY');
const AUTHOR = grabObject('YB_PIC_AUTHOR');

const all = [].concat(TYPES, TYPES2, TYPES3);
const seen = new Set();
const pool = [];
const byUrl = new Map();
let imgCount = 0;

for (const t of all) {
  if (!t || !t.id || seen.has(t.id)) continue;
  seen.add(t.id);
  if (typeof t.img !== 'string' || !/^https?:/i.test(t.img)) continue;
  imgCount++;
  const nm = (BANNY[t.id] && BANNY[t.id].n) || null;
  const by = AUTHOR[t.id] || (t.imgs && t.imgs[0] && t.imgs[0].by) || '';
  const item = {
    id: t.id,
    n: t.name,
    nm: nm ? { en: nm.en, ja: nm.ja, ko: nm.ko } : null,
    img: t.img,
    r: t.r || 3,
    by: by
  };
  if (byUrl.has(t.img)) {
    byUrl.get(t.img).alias.push(item);
  } else {
    byUrl.set(t.img, item);
    item.alias = [];
    pool.push(item);
  }
}

pool.sort((a, b) => a.r - b.r || (a.id < b.id ? -1 : a.id > b.id ? 1 : 0));

fs.writeFileSync(path.join(__dirname, 'pool.json'), JSON.stringify({
  generatedAt: new Date().toISOString(),
  totalTypes: all.length,
  withImgIds: imgCount,
  puzzles: pool.length,
  items: pool
}, null, 1));
console.log('puzzles=' + pool.length + ' ids=' + imgCount);
for (const p of pool) {
  if (p.alias.length) console.log('alias: ' + p.id + ' <- ' + p.alias.map(a => a.id).join(','));
}
