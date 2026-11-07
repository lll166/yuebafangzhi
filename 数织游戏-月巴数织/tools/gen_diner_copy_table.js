const fs = require('fs');
const path = require('path');

const root = path.resolve(__dirname, '..');
const src = fs.readFileSync(path.join(root, 'diner.html'), 'utf8');

/* ---------- 安全解析 I18N_RAW（只读源码文本，不运行源码） ---------- */
function skipTrivia(s, i) {
  for (;;) {
    while (i < s.length && /\s/.test(s[i])) i++;
    if (s[i] === '/' && s[i + 1] === '*') {
      const e = s.indexOf('*/', i + 2);
      i = e < 0 ? s.length : e + 2;
      continue;
    }
    if (s[i] === '/' && s[i + 1] === '/') {
      const e = s.indexOf('\n', i + 2);
      i = e < 0 ? s.length : e + 1;
      continue;
    }
    return i;
  }
}

function parseI18N(s) {
  const marker = 'const I18N_RAW={';
  let i = s.indexOf(marker);
  if (i < 0) throw new Error('I18N_RAW not found');
  i = s.indexOf('{', i) + 1;
  const out = {};
  for (;;) {
    i = skipTrivia(s, i);
    if (i >= s.length) throw new Error('unexpected end of I18N_RAW');
    if (s[i] === '}') break;
    const m = s.slice(i).match(/^([A-Za-z0-9_]+)\s*:\s*\[/);
    if (!m) throw new Error('bad key at offset ' + i + ': ' + JSON.stringify(s.slice(i, i + 40)));
    const key = m[1];
    i += m[0].length;
    const vals = [];
    for (;;) {
      i = skipTrivia(s, i);
      if (s[i] === ']') { i++; break; }
      if (s[i] === ',') { i++; continue; }
      const q = s[i];
      if (q !== "'" && q !== '"') throw new Error('bad value at offset ' + i);
      i++;
      let v = '';
      for (;;) {
        if (i >= s.length) throw new Error('unterminated string in ' + key);
        const c = s[i];
        if (c === '\\') { v += s[i + 1]; i += 2; continue; }
        if (c === q) { i++; break; }
        v += c;
        i++;
      }
      vals.push(v);
    }
    out[key] = vals;
    i = skipTrivia(s, i);
    if (s[i] === ',') i++;
  }
  return out;
}

const I18N_RAW = parseI18N(src);
const order = Object.keys(I18N_RAW);

function idx(a, b) {
  return order.slice(a, b + 1);
}

const sections = [
  {
    title: '01 标题页与开场',
    desc: '标题页的店名、副标题、开场叙事与提示文案。',
    keys: idx(0, 3)
  },
  {
    title: '02 新手引导（对话式引导卡）',
    desc: '首次进入准备页时，底部引导卡按三步显示的对白式文案，含跳过/下一步按钮。',
    keys: idx(283, 292)
  },
  {
    title: '03 顶栏、底栏与标签导航',
    desc: '常驻 HUD 标签、底栏主按钮和七个功能页签。',
    keys: idx(4, 17).concat(['tabStreet', 'tabCity', 'tabCombo'])
  },
  {
    title: '04 菜单页与菜品',
    desc: '30 道基础菜的菜名，以及上架、下架、解锁与研发按钮。',
    keys: idx(18, 52).concat(idx(159, 166))
  },
  {
    title: '05 定价、套餐、节日与食材库存',
    desc: '菜单定价档、2/3 道套餐、四季节日限定菜，以及 6 类食材的订货与损耗。',
    keys: idx(521, 551)
  },
  {
    title: '06 每日目标与每周合约',
    desc: '准备页右上角的当日目标、周合约及完成提示。',
    keys: idx(139, 147).concat(idx(483, 487))
  },
  {
    title: '07 服务员、技能、觉醒与招募',
    desc: '员工属性、四职业 16 项技能、8 级觉醒、三档稀有度、人才市场刷新与保底、七组小队羁绊、排班与疲劳。',
    keys: idx(53, 60).concat(idx(148, 158)).concat(idx(387, 482))
  },
  {
    title: '08 店面、装修与番茄的生活',
    desc: '12 级店名与容量、12 件装修、8 级番茄生活。',
    keys: idx(61, 80).concat(idx(167, 210))
  },
  {
    title: '09 研发树',
    desc: '厨房、服务、经营三支研发树，每支 14 个节点，共 42 个节点名与效果。',
    keys: idx(293, 386)
  },
  {
    title: '10 菜品研发（四槽组合）',
    desc: '番茄、调料、配菜、烹饪四槽的素材名、开发按钮、图鉴与提示。',
    keys: idx(660, 704)
  },
  {
    title: '11 名册、常客、顾客与图鉴、收藏',
    desc: '名册、5 类顾客、常客档案、菜谱图鉴与四类收藏里程碑。',
    keys: idx(81, 84).concat(idx(272, 276)).concat(idx(552, 562)).concat(idx(596, 607))
  },
  {
    title: '12 营业中与随机事件',
    desc: '营业 HUD、连击播报（ms3/6/10/15）、顾客状态、14 类每日事件与四季节日名。',
    keys: idx(85, 108).concat(idx(488, 520))
  },
  {
    title: '13 打烊结算',
    desc: '打烊小报的收入、成本、工资、净利等条目。',
    keys: idx(109, 118)
  },
  {
    title: '14 成就',
    desc: '60 项成就名称与成就解锁提示。',
    keys: idx(211, 271).concat([order[277]])
  },
  {
    title: '15 街区与竞争对手',
    desc: '街区口碑榜、本周立场、5 家邻店名与周榜奖励。',
    keys: idx(564, 582)
  },
  {
    title: '16 存档位与分店周目',
    desc: '3 个存档位、开分店与周目继承说明。',
    keys: idx(583, 595)
  },
  {
    title: '17 声望、转生与城市连锁',
    desc: '声望转生、传承菜/搭配，以及 3 家连锁分店的经营文案。',
    keys: idx(608, 658).filter(k => k !== 'tabCity')
  },
  {
    title: '18 设置、主题与界面无障碍',
    desc: '设置弹窗、6 套主题、主题解锁条件与 aria 文案。',
    keys: idx(119, 138).concat(idx(278, 282))
  },
  {
    title: '19 数值词条与通用术语',
    desc: '七项加成在提示与研发结果中使用的统一名称。',
    keys: idx(705, 711)
  }
];

/* 覆盖检查：每个 i18n 键必须且只能出现一次 */
const seen = new Map();
sections.forEach(sec => {
  sec.keys.forEach(k => {
    if (!I18N_RAW[k]) throw new Error('unknown key: ' + k);
    if (seen.has(k)) throw new Error('duplicate key: ' + k + ' in ' + seen.get(k) + ' & ' + sec.title);
    seen.set(k, sec.title);
  });
});
const missing = order.filter(k => !seen.has(k));
if (missing.length) throw new Error('missing keys: ' + missing.join(', '));

const four = (k) => {
  const v = I18N_RAW[k];
  return [v[0] || '', v[1] || '', v[2] || '', v[3] || ''];
};
const cell = (s) => String(s == null ? '' : s).replace(/\|/g, '\\|').replace(/\r?\n/g, '<br>');
const csvCell = (s) => '"' + String(s == null ? '' : s).replace(/"/g, '""') + '"';

/* ---------- 生成 Markdown ---------- */
const md = [];
md.push('# 月巴食堂 · 全量文案表');
md.push('');
md.push('> 来源：`diner.html`（M1 骨架至 P7 全部系统）。共 **' + order.length + ' 条** i18n 文案，默认仅列中文与英文；日文、韩文见配套 CSV。');
md.push('> 表中 `{n}`、`{name}`、`{dish}` 等为运行时插值占位符，不是实际显示内容。');
md.push('');
md.push('## 分区总览');
md.push('');
md.push('| 分区 | 条数 | 内容 |');
md.push('| --- | ---: | --- |');
let total = 0;
sections.forEach(sec => {
  total += sec.keys.length;
  md.push('| ' + sec.title + ' | ' + sec.keys.length + ' | ' + cell(sec.desc) + ' |');
});
md.push('| **合计** | **' + total + '** | 另附角色名、招牌菜命名公式与界面硬编码文案 |');
md.push('');
md.push('---');
md.push('');

sections.forEach(sec => {
  md.push('## ' + sec.title);
  md.push('');
  md.push(sec.desc);
  md.push('');
  md.push('| 键名 | 中文文案 | 英文文案 |');
  md.push('| --- | --- | --- |');
  sec.keys.forEach(k => {
    const v = four(k);
    md.push('| `' + k + '` | ' + cell(v[0]) + ' | ' + cell(v[1]) + ' |');
  });
  md.push('');
});

/* ---------- 附录 A：角色与样机名册 ---------- */
md.push('---');
md.push('');
md.push('## 附录 A · 角色与样机名册（硬编码在数据表中）');
md.push('');
md.push('| 位置 | 键名 / 字段 | 中文 | 英文 | 日文 | 韩文 |');
md.push('| --- | --- | --- | --- | --- | --- |');
[
  ['样机名册', 'mb_xiaoyue', '小月巴', 'Little Banny', 'ちびバニー', '꼬마버니'],
  ['样机名册', 'mb_xian', '尴尬月巴', 'Awkward Banny', 'きまずバニー', '어색버니'],
  ['样机名册', 'mb_chi', '进食月巴', 'Munching Banny', 'もぐもぐバニー', '냠냠버니'],
  ['样机名册', 'mb_pang', '胖月巴', 'Chubby Banny', 'ぷくぷくバニー', '뚱뚱버니'],
  ['店长（柜台）', 'm3_badaba', '巴拉巴巴巴', 'Badabababa', 'バダバババ', '바다바바바']
].forEach(row => {
  md.push('| ' + row[0] + ' | `' + row[1] + '` | ' + cell(row[2]) + ' | ' + cell(row[3]) + ' | ' + cell(row[4]) + ' | ' + cell(row[5]) + ' |');
});
md.push('');
md.push('## 附录 B · 运行时拼接的菜品名');
md.push('');
md.push('招牌菜（正确四槽组合）按语序模板拼接，中文为 **调料 + 配菜 + 烹饪 + 番茄**；其他语言为各自语序。');
md.push('');
md.push('| 语言 | 模板 |');
md.push('| --- | --- |');
md.push('| 中文 | `调料 + 配菜 + 烹饪 + 番茄` |');
md.push('| English | `Method Tomato with Seasoning & Side` |');
md.push('| 日本語 | `調味料 + と + 付け合わせ + の + 調理法 + トマト` |');
md.push('| 한국어 | `조미료 + 곁들임 + 조리법 + 토마토` |');
md.push('');
md.push('错误组合（当日普通菜品）中文名为 **配菜 + 调料 + 番茄 + 烹饪**，例如「蛋+盐+圆番茄+快炒」。');
md.push('');

/* ---------- 安全解析 SETS ---------- */
function parseSets(s) {
  const start = s.indexOf('const SETS=[');
  const end = s.indexOf('\n];', start);
  if (start < 0 || end < 0) throw new Error('SETS not found');
  const block = s.slice(start, end);
  const re = /\{id:'([^']+)',\s*tom:'([^']+)',\s*sea:'([^']+)',\s*side:'([^']+)',\s*method:'([^']+)',\s*price:(\d+),[^}]*fx:\{([^}]*)\}\}/g;
  const out = [];
  for (const m of block.matchAll(re)) {
    const fx = {};
    for (const f of m[7].matchAll(/([A-Za-z]+):([\d.]+)/g)) fx[f[1]] = parseFloat(f[2]);
    out.push({ id: m[1], tom: m[2], sea: m[3], side: m[4], method: m[5], price: parseInt(m[6], 10), fx });
  }
  return out;
}
const SETS = parseSets(src);
if (SETS.length !== 48) throw new Error('expected 48 SETS, got ' + SETS.length);

const NAME_KEY = {
  tom: { round: 'tomRound', cherry: 'tomCherry', beef: 'tomBeef' },
  sea: { salt: 'seaSalt', soy: 'seaSoy', miso: 'seaMiso', basil: 'seaBasil', chili: 'seaChili', honey: 'seaHoney' },
  side: { egg: 'sideEgg', rice: 'sideRice', cheese: 'sideCheese', mush: 'sideMush', beef: 'sideBeef', shrimp: 'sideShrimp' },
  method: { stir: 'mStir', boil: 'mBoil', bake: 'mBake' }
};
const nm = (slot, id, lang) => I18N_RAW[NAME_KEY[slot][id]][lang];
const fxName = { price: '售价', sat: '满意度', patience: '耐心', speed: '移速', cook: '出餐', spawn: '客流', tip: '小费' };
function fxText(fx) {
  return Object.keys(fx).map(k => {
    const v = fx[k];
    if (k === 'sat') return '满意度 +' + v;
    if (k === 'spawn') return '客流 +' + Math.round((1 - v) * 100) + '%';
    return (fxName[k] || k) + ' +' + Math.round((v - 1) * 100) + '%';
  }).join(' · ');
}

md.push('### 48 道招牌菜的实际中文名');
md.push('');
md.push('| 编号 | 中文菜名 | 四槽组合 | 售价 | 基础效果 |');
md.push('| --- | --- | --- | ---: | --- |');
SETS.forEach((s, i) => {
  const name = nm('sea', s.sea, 0) + nm('side', s.side, 0) + nm('method', s.method, 0) + nm('tom', s.tom, 0);
  const combo = nm('sea', s.sea, 0) + ' + ' + nm('side', s.side, 0) + ' + ' + nm('method', s.method, 0) + ' + ' + nm('tom', s.tom, 0);
  md.push('| ' + (i + 1) + ' | ' + cell(name) + ' | ' + cell(combo) + ' | ' + s.price + ' | ' + cell(fxText(s.fx)) + ' |');
});
md.push('');

/* ---------- 附录 C：界面硬编码文案 ---------- */
md.push('## 附录 C · 界面硬编码文案');
md.push('');
md.push('以下文案直接写在 HTML/JS 中，不走 i18n（部分为 aria 标签与页面标题，仅中文）。');
md.push('');
md.push('| 位置 | 文案 | 说明 |');
md.push('| --- | --- | --- |');
[
  ['`<title>`', '月巴食堂', '浏览器标签页标题'],
  ['`#pcTitle` 初值', '月巴食堂店门口', '标题页场景标题的初始值'],
  ['`aria-label`', '设置', '顶栏设置按钮'],
  ['`aria-label`', '存档位', '标题页存档位分组'],
  ['`aria-label`', '暂停', '营业页暂停按钮'],
  ['`aria-label`', '向左看', '营业页左移镜头箭头'],
  ['`aria-label`', '向右看', '营业页右移镜头箭头'],
  ['`aria-label`', '关闭', '设置弹窗关闭按钮'],
  ['`#btnSound` 初值', '开', '音效按钮初始文案'],
  ['`#btnLow` 初值', '关', '低功耗按钮初始文案'],
  ['`#btnReset` 初值', '清空', '清空存档按钮初始文案'],
  ['`#btnLeft` 初值', '返回', '底栏左按钮初始文案'],
  ['`#btnRight` 初值', '开门准备', '底栏右按钮初始文案'],
  ['`thumbHTML()` 兜底', '月巴', '角色没有名字时缩略图显示的占位字']
].forEach(row => {
  md.push('| ' + row[0] + ' | ' + cell(row[1]) + ' | ' + cell(row[2]) + ' |');
});
md.push('');
md.push('> 说明：游戏中的顾客没有逐句台词；「对话」类文案由新手引导卡（分区 02）与顾客状态、事件提示承担。');
md.push('');

fs.writeFileSync(path.join(root, '月巴食堂_文案总表.md'), md.join('\n'), 'utf8');

/* ---------- 生成四语言 CSV ---------- */
const csv = [];
csv.push(['编号', '分区', '键名', '中文', 'English', '日本語', '한국어'].join(','));
let n = 0;
sections.forEach(sec => {
  sec.keys.forEach(k => {
    n++;
    csv.push([n, sec.title, k, ...four(k)].map(csvCell).join(','));
  });
});
fs.writeFileSync(path.join(root, '月巴食堂_文案总表_四语言.csv'), '\uFEFF' + csv.join('\r\n'), 'utf8');

console.log('i18n keys:', order.length, '| md rows:', total, '| sections:', sections.length, '| sets:', SETS.length);
console.log('files: 月巴食堂_文案总表.md / 月巴食堂_文案总表_四语言.csv');
