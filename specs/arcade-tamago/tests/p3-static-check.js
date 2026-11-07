/* 月巴蛋 P3 源码级守卫（不启动浏览器，不执行动态代码）
   运行：node specs/arcade-tamago/tests/p3-static-check.js
   覆盖：毕业金币回写 / 去重 / 回执 / 番茄钟专注联动 */
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

/* ---------- 1. 毕业回写 ---------- */
const endPet=fnBody(game,'endPet');
check('graduation posts only for real graduate',/kind==='graduate'&&!rec\.sample&&inFrame/.test(endPet)&&
  /type:'yueba-tamago-graduate'/.test(endPet));
check('graduation id is stable',/id:'tg-'\+rec\.endedAt\+'-'\+rec\.species\+'-'\+rec\.bond/.test(endPet));
check('reward ack handled in child',/yueba-tamago-graduate-ack/.test(game)&&
  /ui\.endCard\.reward=n/.test(game));
check('reward card text exists in 4 languages',count(game,"endGradReward:'")===4);

/* ---------- 2. 父页金币与去重 ---------- */
check('parent reward store',/function tamagoRewardStore\(\)/.test(idx)&&
  /S\.tamago\.graduated/.test(fnBody(idx,'tamagoRewardStore')));
check('parent graduate handler',/type==='yueba-tamago-graduate'/.test(idx)&&
  /store\.graduated\.indexOf\(id\)>=0/.test(idx)&&
  /addCoins\(n\)/.test(idx));
check('parent caps reward and dedupes',/Math\.min\(300,100\+bond\*2\)/.test(idx)&&
  /store\.graduated\.push\(id\)/.test(idx));
check('parent sends ack',/yueba-tamago-graduate-ack/.test(idx));
check('parent graduation toast translated',/月巴蛋毕业 \+{n}/.test(idx));

/* ---------- 3. 番茄钟专注联动 ---------- */
check('parent tamagoFocus helper',/function tamagoFocus\(on,mins\)/.test(idx)&&
  /gbFrameId!=='tamago'/.test(fnBody(idx,'tamagoFocus')));
check('pomoStart notifies focus',/tamagoFocus\(true/.test(fnBody(idx,'pomoStart')));
check('pomoStop notifies focus off',/tamagoFocus\(false/.test(fnBody(idx,'pomoStop')));
check('pomoEnterBreak notifies focus off',/tamagoFocus\(false/.test(fnBody(idx,'pomoEnterBreak')));
check('pomoPause/Resume notify too',/tamagoFocus\(false/.test(fnBody(idx,'pomoPause'))&&
  /tamagoFocus\(true/.test(fnBody(idx,'pomoResume')));
check('roster carries focus state',/focus:focusOn/.test(idx)&&/focusMins:focusMins/.test(idx));
check('child handles focus message',/yueba-tamago-focus/.test(game)&&
  /FOCUS=!!d\.on/.test(game));
check('child stores focus state',/FOCUS=false, FOCUS_MINS=0/.test(game));
check('focus blocks visitors',/if\(FOCUS\) return;/.test(fnBody(game,'tickVisit')));
check('focus keeps mood',/if\(!FOCUS\) pet\.mood-=/.test(fnBody(game,'simulateStep')));
check('focus tag in pet stats',/FOCUS\?'\\n'\+t\('focusTag'\)/.test(fnBody(game,'updateText')));
check('focus keys in 4 languages',count(game,"focusStart:'")===4&&
  count(game,"focusEnd:'")===4&&count(game,"focusTag:'")===4);

console.log(fails.length?('\nFAILED: '+fails.join(' | ')):'\nALL PASS');
process.exit(fails.length?1:0);
