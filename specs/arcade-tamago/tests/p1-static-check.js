/* 月巴蛋 P1 源码级守卫（不启动浏览器，不执行动态代码）
   运行：node specs/arcade-tamago/tests/p1-static-check.js
   覆盖：氛围粒子 / 成体形态 / 过喂 / 命名性格阈值 / 详情统计 */
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

/* ---------- 1. 氛围粒子，而不是给月巴加表情 ---------- */
check('flower/star pixel maps exist',/flower:\[/.test(game)&&/star:\[/.test(game));
check('ambient system exists',/function ambientTick\(/.test(game)&&
  /function ambientBurst\(/.test(game)&&/function drawAmbient\(/.test(game));
check('pet screen draws ambient',/ambientTick\(nowAmb,chrome!==false\)/.test(game)&&
  /if\(chrome!==false\) drawAmbient\(nowAmb\)/.test(game));
const face=fnBody(game,'drawFace');
check('drawFace stays expression-free',face.length>0&&
  !/mood|hunger|clean|state\.pet|pet\./.test(face));
check('ambient bursts on pet/feed/play',/ambientBurst\('heart'/.test(game)&&
  /ambientBurst\('flower'/.test(game)&&/ambientBurst\('star'/.test(game));
check('low power disables ambient',/\|\|LOW\|\|/.test(fnBody(game,'ambientTick')));

/* ---------- 2. 性格与命名 ---------- */
check('three personas defined',/clingy:\{/.test(game)&&/steady:\{/.test(game)&&/proud:\{/.test(game));
check('persona thresholds differ',/clingy:\{id:'clingy',nickBond:40/.test(game)&&
  /steady:\{id:'steady',nickBond:50/.test(game)&&
  /proud:\{id:'proud',nickBond:60/.test(game));
check('persona is derived from species hash',/PERSONA_KEYS\[hashId\(id\|\|''\)%PERSONA_KEYS\.length\]/.test(game));
check('naming gated by bond',/return !!pet\.nickUnlocked\|\|num\(pet\.bond,0\)>=personaOf\(pet\)\.nickBond;/.test(game));
check('naming unlock is announced',/ui\.msg=t\('nameUnlock'\)/.test(game));
check('naming confirms to nickname',fnBody(game,'confirmName').length>0&&
  /pet\.nickname=nm;/.test(fnBody(game,'confirmName')));
check('stats page offers naming',/statsHintName/.test(game)&&/nameReady\(pet\)\?t\('statsHintName'\)/.test(game));
check('nickname used for display',/function petName\(pet\)/.test(game)&&
  /function recName\(r\)/.test(game)&&/petName\(pet\)/.test(fnBody(game,'updateText')));
check('name keys exist in 4 languages',count(game,"namePrompt:'")===4&&
  count(game,"persona_clingy:'")===4);

/* ---------- 3. 成体形态 ---------- */
check('form values plump/lean/stubborn',/form_plump:/.test(game)&&
  /form_lean:/.test(game)&&/form_stubborn:/.test(game));
check('computeForm exists',fnBody(game,'computeForm').length>0&&
  /return 'stubborn'/.test(fnBody(game,'computeForm'))&&
  /return 'plump'/.test(fnBody(game,'computeForm'))&&
  /return 'lean'/.test(fnBody(game,'computeForm')));
check('adult transition settles form',/ns==='adult'&&!pet\.form/.test(fnBody(game,'refreshStage')));
check('care quality accumulates',/pet\.q\.hunger\+=pet\.hunger\*mins/.test(game)&&
  /pet\.q\.n\+=mins/.test(game));
check('form changes silhouette/badge',/form==='plump'/.test(fnBody(game,'drawPetSprite'))&&
  /form==='lean'/.test(fnBody(game,'drawPetSprite'))&&
  /form==='stubborn'/.test(fnBody(game,'drawPetSprite')));
check('records keep form and nickname',/form:pet\.form\|\|''/.test(game)&&
  /nickname:pet\.nickname\|\|''/.test(game));

/* ---------- 4. 过喂 ---------- */
check('feed log exists',/pet\.feedLog/.test(game)&&/10\*MIN/.test(game));
check('overfeed halves gain and drops mood',/const over=pet\.feedLog\.length>=3;/.test(game)&&
  /Math\.ceil\(item\.hunger\/2\)/.test(game)&&/pet\.mood=clamp\(pet\.mood-3/.test(game));
check('overfeed message in 4 languages',count(game,"eatOver:'")===4);

/* ---------- 5. 详情统计 ---------- */
check('stats object has all counters',/stats:\{feed:0,play:0,clean:0,pet:0,med:0,rescue:0,visit:0,sick:0,maxBond:0\}/.test(game));
check('careTick records kind',/function careTick\(pet,kind\)/.test(game)&&
  /pet\.stats\[kind\]=clamp/.test(game));
check('visit and sick counters wired',/pet\.stats\.visit=clamp/.test(game)&&
  /pet\.stats\.sick=clamp/.test(game));
check('stats page has 5 data lines + hint',/statsLine1:'/.test(game)&&/statsLine5:'/.test(game)&&
  /statsHint:/.test(game)&&/statsHintName:/.test(game));
check('stats page uses compact text',/#lcdText\.compact\{/.test(game)&&
  /classList\.toggle\('compact',ui\.page==='stats'/.test(game));
check('stats navigation wired',/ui\.page='stats'/.test(fnBody(game,'onA'))&&
  /ui\.page='album'/.test(fnBody(game,'onA'))&&
  /nameReady\(state\.pet\)/.test(fnBody(game,'onB')));

console.log(fails.length?('\nFAILED: '+fails.join(' | ')):'\nALL PASS');
process.exit(fails.length?1:0);
