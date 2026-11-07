/* 月巴蛋 P4 源码级守卫（不启动浏览器，不执行动态代码）
   运行：node specs/arcade-tamago/tests/p4-static-check.js
   覆盖：新手提示 / 触觉 / 后台暂停 / 键盘无障碍 / 独立静音 */
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

/* ---------- 1. 新手提示 ---------- */
check('tutorialDone in fresh save',/tutorialDone:false/.test(fnBody(game,'freshState')));
check('tutorialDone normalized on load',/state\.tutorialDone=!!state\.tutorialDone/.test(fnBody(game,'loadState')));
check('first eggs set tutorial',/if\(!state\.tutorialDone&&!state\.pet\) ui\.tut=1;/.test(fnBody(game,'drawEggs')));
check('hatch clears tutorial',/if\(ui\.tut\)\{ ui\.tut=null; state\.tutorialDone=true; saveState\(\); \}/.test(fnBody(game,'beginHatch')));
check('tutorial text branch',/if\(ui\.tut\)\{ setText\(t\('tutTip'\)\); return; \}/.test(fnBody(game,'updateText')));
check('startup initializes tutorial',/function initTutorial\(\)/.test(game)&&/initTutorial\(\);/.test(game));
check('tutorial tip in 4 languages',count(game,"tutTip:'")===4);

/* ---------- 2. 触觉 ---------- */
check('haptic helper',/function haptic\(ms\)/.test(game)&&/navigator\.vibrate/.test(fnBody(game,'haptic')));
check('haptic on knock/rescue/death',/sfx\('knock'\);\s*haptic\(10\)/.test(game)&&
  /sfx\('rescue'\);\s*haptic\(8\)/.test(game)&&
  /if\(kind==='dead'\) haptic\(30\)/.test(game));

/* ---------- 3. 后台暂停 ---------- */
check('idle tick pauses when hidden',/if\(document\.hidden\) return;/.test(fnBody(game,'idleTick')));
check('visit tick pauses when hidden',/if\(document\.hidden\) return;/.test(fnBody(game,'visitTick')));

/* ---------- 4. 键盘无障碍与独立静音 ---------- */
check('S opens status',/if\(k==='s'\)/.test(game)&&/ui\.page='status'/.test(game));
check('M toggles standalone mute',/if\(k==='m'&&!inFrame\)/.test(game)&&/MUTED=!MUTED/.test(game));
check('mute keys in 4 languages',count(game,"muteOn:'")===4&&count(game,"muteOff:'")===4);
check('focus-visible styles',/\.key:focus-visible,.swatch:focus-visible/.test(game));
check('standalone tools exist',/id="btnExport"/.test(game)&&/id="btnImport"/.test(game)&&/id="btnReset"/.test(game));
check('export/import/reset handlers',/function exportSave\(\)/.test(game)&&/function bindTools\(\)/.test(game)&&/suppressSave=true/.test(game));
check('tools hidden in iframe',/toolsEl\.hidden=!!inFrame/.test(game));
check('canvas aria follows state',/function syncLcdAria\(\)/.test(game)&&/syncLcdAria\(\);/.test(fnBody(game,'updateText')));
check('tool keys in 4 languages',count(game,"toolExport:'")===4&&count(game,"ioResetConfirm:'")===4);

console.log(fails.length?('\nFAILED: '+fails.join(' | ')):'\nALL PASS');
process.exit(fails.length?1:0);
