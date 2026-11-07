/* 月巴蛋 P2 源码级守卫（不启动浏览器，不执行动态代码）
   运行：node specs/arcade-tamago/tests/p2-static-check.js
   覆盖：常客/礼物/偷番茄 / 分层离线 / 睡眠梦境 / 来访记录页 */
const fs=require('fs');
const path=require('path');

const ROOT=path.resolve(__dirname,'../../..');
const GAME=path.join(ROOT,'电子宠物游戏-tamago','tamago.html');
const game=fs.readFileSync(GAME,'utf8');

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

/* ---------- 1. 常客与访客事件 ---------- */
check('visitorSeen in fresh save',/visitorSeen:\{\}/.test(fnBody(game,'freshState')));
check('visitorSeen normalized on load',/state\.visitorSeen=\{\}/.test(fnBody(game,'loadState'))&&
  /seenOut\[id\]=\{count:clamp/.test(fnBody(game,'loadState')));
check('startVisit counts each visitor',/state\.visitorSeen\[who\.id\]=seen;/.test(fnBody(game,'startVisit'))&&
  /seen\.count=clamp\(num\(seen\.count,0\)\+1/.test(fnBody(game,'startVisit')));
check('visitCount helper',/function visitCount\(id\)/.test(game));
check('friendly/gift/steal in 4 languages',count(game,"friendly:[")===4&&
  count(game,"gift:'")===4&&count(game,"steal:'")===4);
const open=fnBody(game,'openVisit');
check('openVisit switches by visit count',/const count=visitCount/.test(open)&&
  /count>=10&&count%10===0/.test(open)&&/count>=5/.test(open));
check('gift gives mood/bond',/kind='gift'/.test(open)&&/pet\.mood=clamp\(num\(pet\.mood,70\)\+5/.test(open)&&
  /bondAdd\(pet,1\)/.test(open));
check('steal after three ignores',/ignoredCount,0\)>=3/.test(open)&&
  /kind='steal'/.test(open));
check('friendly does not count as taunt',/kind!=='friendly'&&kind!=='gift'/.test(open));
check('ignore increments ignoredCount',/pet\.ignoredCount=clamp\(num\(pet\.ignoredCount,0\)\+1/.test(fnBody(game,'ignoreVisit')));

/* ---------- 2. 分层离线 ---------- */
check('offlineMessage tiers',/function offlineMessage\(raw\)/.test(game)&&
  /offlineLong7/.test(fnBody(game,'offlineMessage'))&&
  /offlineLong3/.test(fnBody(game,'offlineMessage'))&&
  /offlineLong1/.test(fnBody(game,'offlineMessage')));
check('fmtGap supports days',/mins>=24\*60/.test(fnBody(game,'fmtGap'))&&
  /unit_day/.test(fnBody(game,'fmtGap')));
check('settleOffline uses raw gap',/const raw=Math\.max\(0,now-num\(pet\.lastSeen,now\)\)/.test(fnBody(game,'settleOffline'))&&
  /ui\.msg=offlineMessage\(raw\)/.test(fnBody(game,'settleOffline')));
check('offline long keys in 4 languages',count(game,"offlineLong1:'")===4);

/* ---------- 3. 睡眠梦境 ---------- */
const petScreen=fnBody(game,'drawPetScreen');
check('sleep draws rotating dream icon',/AMBIENT_KINDS\[ph\]/.test(petScreen)&&
  /drawMap\(PIX\[AMBIENT_MAP\[AMBIENT_KINDS\[ph\]\]\]/.test(petScreen));

/* ---------- 4. 来访记录页 ---------- */
check('visitorRecords helper',/function visitorRecords\(\)/.test(game)&&
  /out\.sort/.test(fnBody(game,'visitorRecords')));
check('fmtAgo helper',/function fmtAgo\(ms\)/.test(game)&&
  /agoJust/.test(fnBody(game,'fmtAgo'))&&/agoDay/.test(fnBody(game,'fmtAgo')));
check('visitors page renders list',/if\(ui\.page==='visitors'\)/.test(fnBody(game,'updateText'))&&
  /visitorRecords\(\)/.test(fnBody(game,'updateText'))&&
  /fmtAgo\(now-r\.lastAt\)/.test(fnBody(game,'updateText')));
check('visitors page uses compact text',/ui\.page==='stats'\|\|ui\.page==='visitors'/.test(game));
check('album B opens visitors',/ui\.page==='album'\)\{ ui\.page='visitors'/.test(fnBody(game,'onB')));
check('visitors B returns stats',/ui\.page==='visitors'\)\{ ui\.page='stats'/.test(fnBody(game,'onB')));
check('visitors A opens album',/ui\.page==='visitors'\)\{/.test(fnBody(game,'onA'))&&
  /ui\.page='album'/.test(fnBody(game,'onA')));
check('visitor page keys in 4 languages',count(game,"visitorTitle:'")===4&&
  count(game,"visitorBack:'")===4&&count(game,"visitorEmpty:'")===4);
check('album hint points to visitors',/albumBack:'B 访客/.test(game)&&
  /albumBack:'B visitors/.test(game));

console.log(fails.length?('\nFAILED: '+fails.join(' | ')):'\nALL PASS');
process.exit(fails.length?1:0);
