/* 月巴蛋 P0 源码级守卫（不启动浏览器，不执行动态代码）
   运行：node specs/arcade-tamago/tests/p0-static-check.js
   覆盖：访客池边界 / 存档坏档备份与迁移 / 照顾埋点 / 番茄库存提示 / 上线开关 */
const fs=require('fs');
const path=require('path');

const ROOT=path.resolve(__dirname,'../../..');
const GAME=path.join(ROOT,'电子宠物游戏-tamago','tamago.html');
const INDEX=path.join(ROOT,'index.html');
const game=fs.readFileSync(GAME,'utf8');
const idx=fs.readFileSync(INDEX,'utf8');

const fails=[];
function check(name,ok,info){
  console.log((ok?'PASS ':'FAIL ')+name+(info!==undefined?' :: '+JSON.stringify(info):''));
  if(!ok) fails.push(name);
}
function warn(name,info){
  console.log('WARN '+name+(info!==undefined?' :: '+JSON.stringify(info):''));
}
/* 取函数体：从 function name( 起做花括号配对，避免正则跨函数误判 */
function fnBody(src,name){
  const i=src.indexOf('function '+name+'(');
  if(i<0) return '';
  let start=src.indexOf('{',i), depth=0;
  for(let j=start;j<src.length;j++){
    if(src[j]==='{') depth++;
    else if(src[j]==='}'){
      depth--;
      if(!depth) return src.slice(i,j+1);
    }
  }
  return src.slice(i);
}
function count(src,needle){
  let n=0,i=0;
  while((i=src.indexOf(needle,i))>=0){ n++; i+=needle.length; }
  return n;
}

/* ---------- 1. 访客池：庭院非空时只能在庭院内回退 ---------- */
const pool=fnBody(game,'visitorPool');
check('visitorPool has yard replay branch',/yard\.length&&!out\.length/.test(pool));
check('visitorPool replays oldest yard member',/add\(best,true\)/.test(pool));
check('visitorPool roster fallback requires empty yard',/!yard\.length&&!out\.length&&ROSTER/.test(pool));
check('visitorPool no unconditional roster fallback',
  !/[^!]out\.length&&ROSTER&&ROSTER\.length/.test(pool.replace(/!yard\.length&&!out\.length&&ROSTER&&ROSTER\.length/,'')));

/* ---------- 2. 存档：坏档备份 + v2 迁移 ---------- */
check('save version is 2',/const SAVE_VER=2;/.test(game));
check('broken save key declared',/const SAVE_BROKEN_KEY=SAVE_KEY\+'-broken';/.test(game));
const load=fnBody(game,'loadState');
check('loadState backs up broken raw',/localStorage\.setItem\(SAVE_BROKEN_KEY,rawText\)/.test(load));
check('loadState parses before reset',/parsed=JSON\.parse\(rawText\)/.test(load));
const mig=fnBody(game,'migrateSave');
check('migrateSave bumps version',/state\.v=Math\.max\(v,SAVE_VER\)/.test(mig));
check('migrateSave handles v1 visitLog',/v<2/.test(mig)&&/state\.visitLog=\[\]/.test(mig));

/* ---------- 3. 照顾埋点 ---------- */
check('ensurePet clamps careCount',/p\.careCount=clamp\(num\(p\.careCount,0\),0,999999\)/.test(game));
check('careTick defined + at least 5 call sites',count(game,'careTick(')>=6,count(game,'careTick('));

/* ---------- 4. 番茄库存提示 ---------- */
check('tomatoStock key exists in 4 languages',count(game,"tomatoStock:'")===4,count(game,"tomatoStock:'"));
const txt=fnBody(game,'updateText');
check('tomato stock only on stay',/vis\.phase==='stay'&&TOMATO>0/.test(txt));
check('tomato stock goes through i18n',/t\('tomatoStock'/.test(txt));

/* ---------- 5. 主存档只读 + 上线开关 ---------- */
check('tamago does not write main save key',!/idle-yueba-save-v2/.test(game));
check('tamago card still hidden',/\{id:'tamago'[^}]*hidden:true/.test(idx));

/* ---------- 6. 上线路径提醒（用户要求暂不上线，只告警） ---------- */
const cardMatch=idx.match(/\{id:'tamago'[^}]*html:'([^']+)'/);
const cardHtml=cardMatch?cardMatch[1]:'';
const rootCopy=fs.existsSync(path.join(ROOT,cardHtml||'__missing__'));
if(cardHtml&&!rootCopy){
  warn('launch path mismatch: card points to '+cardHtml+
    ' but actual file is 电子宠物游戏-tamago/tamago.html; fix before removing hidden:true');
}

console.log(fails.length?('\nFAILED: '+fails.join(' | ')):'\nALL PASS');
process.exit(fails.length?1:0);
