/* 从首页 index.html 的 TYPES 里同步「有外链立绘」的月巴到 rhythm-intro.html。
   运行：node _intro_sync.js
   只做文本扫描，不执行被解析的源码。 */
const fs=require('fs');
const path=require('path');

const homePath=path.join(__dirname,'..','index.html');
const introPath=path.join(__dirname,'rhythm-intro.html');
const html=fs.readFileSync(homePath,'utf8');
const KEY='const TYPES=';
const at=html.indexOf(KEY);
if(at<0) throw new Error('index.html 缺少 TYPES');

function arraySlice(src,from){
  let depth=0,quote=null,esc=false,started=false;
  for(let i=from;i<src.length;i++){
    const c=src[i];
    if(quote){
      if(esc) esc=false;
      else if(c==='\\') esc=true;
      else if(c===quote) quote=null;
      continue;
    }
    if(c==="'"||c==='"'||c==='`'){ quote=c; continue; }
    if(c==='['){ depth++; started=true; }
    else if(c===']'){
      depth--;
      if(started&&depth===0) return src.slice(from,i+1);
    }
  }
  throw new Error('TYPES 数组未闭合');
}

function objectsOf(src){
  const out=[];
  let depth=0,start=-1,quote=null,esc=false;
  for(let i=0;i<src.length;i++){
    const c=src[i];
    if(quote){
      if(esc) esc=false;
      else if(c==='\\') esc=true;
      else if(c===quote) quote=null;
      continue;
    }
    if(c==="'"||c==='"'||c==='`'){ quote=c; continue; }
    if(c==='{'){ if(depth===0) start=i; depth++; }
    else if(c==='}'){
      depth--;
      if(depth===0&&start>=0){ out.push(src.slice(start,i+1)); start=-1; }
    }
  }
  return out;
}

const RE_ID=/\bid\s*:\s*(?:'([^']*)'|"([^"]*)")/;
const RE_NAME=/\bname\s*:\s*(?:'([^']*)'|"([^"]*)")/;
const RE_IMG=/\bimg\s*:\s*(?:'([^']*)'|"([^"]*)")/;
const RE_URL=/\burl\s*:\s*(?:'([^']*)'|"([^"]*)")/g;

function valueOf(m){
  return m?(m[1]!=null?m[1]:m[2]):'';
}

const pool=[];
for(const obj of objectsOf(arraySlice(html,at+KEY.length))){
  const id=valueOf(obj.match(RE_ID));
  const name=valueOf(obj.match(RE_NAME));
  if(!name) continue;
  const urls=[];
  const img=valueOf(obj.match(RE_IMG));
  if(img) urls.push(img);
  const found=obj.match(RE_URL)||[];
  for(const raw of found){
    const u=valueOf(raw.match(/(?:'([^']*)'|"([^"]*)")/));
    if(u&&!urls.includes(u)) urls.push(u);
  }
  if(urls.length) pool.push({id,name,urls});
}

const lines=pool.map(function(p){
  return '  {id:'+JSON.stringify(p.id)+',name:'+JSON.stringify(p.name)+',urls:'+JSON.stringify(p.urls)+'}';
});
const block='var DEX_POOL=[\n'+lines.join(',\n')+'\n];';

let intro=fs.readFileSync(introPath,'utf8');
const marker=/(\/\* ==== DEX POOL BEGIN ==== \*\/)[\s\S]*?(\/\* ==== DEX POOL END ==== \*\/)/;
if(!marker.test(intro)) throw new Error('rhythm-intro.html 缺少 DEX POOL 标记');
intro=intro.replace(marker,function(whole,a,b){
  return a+'\n'+block+'\n'+b;
});
fs.writeFileSync(introPath,intro);
console.log('已同步：'+pool.length+' 只月巴 / '+pool.reduce(function(a,p){return a+p.urls.length;},0)+' 张外链图');
