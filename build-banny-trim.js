/* 月巴立绘批量裁剪工具：下载图鉴外链立绘 → 去透明边 → 存本地像素图
   用法：node build-banny-trim.js   （与 fishing.html 同目录运行）
   产出：月巴立绘裁剪/{id}.png（已去透明边的紧裁剪版，陪伴月巴用）
   说明：图床不支持 CORS，浏览器里无法读像素裁边，故在构建期完成。
   GIF 链接不裁剪，原样保存为 {id}.gif。
   安全：id 只接受 \w 字符（同时用于文件名），输出路径 resolve 后锁定在输出目录内。 */
'use strict';
var fs = require('fs');
var path = require('path');
var zlib = require('zlib');
var http = require('http');
var https = require('https');

var OUT_DIR = path.resolve(__dirname, '月巴立绘裁剪');
if (!fs.existsSync(OUT_DIR)) fs.mkdirSync(OUT_DIR);

/* ---------- 从 fishing.html 抽 DEX_ART 表（indexOf 解析，不用正则） ---------- */
var html = fs.readFileSync(path.join(__dirname, 'fishing.html'), 'utf8');
var tStart = html.indexOf('var DEX_ART');
if (tStart < 0) { console.error('fishing.html 里找不到 DEX_ART'); process.exit(1); }
tStart = html.indexOf('{', tStart);
var tEnd = html.indexOf('\n  };', tStart);
if (tEnd < 0) { console.error('DEX_ART 结尾解析失败'); process.exit(1); }
var body = html.slice(tStart, tEnd);

var list = [];
var pos = 0;
while (true) {
  var a = body.indexOf("'", pos); if (a < 0) break;
  var b = body.indexOf("'", a + 1); if (b < 0) break;
  var id = body.slice(a + 1, b);
  var c1 = body.indexOf("['", b); if (c1 < 0) break;
  var c2 = body.indexOf("']", c1); if (c2 < 0) break;
  var inner = body.slice(c1 + 2, c2);
  var parts = inner.split("','");
  if (parts.length >= 2 && /^[\w]+$/.test(id)) {
    list.push({ id: id, url: parts[0], color: parts[1], name: parts[2] || '' });
  }
  pos = c2 + 2;
}
console.log('DEX_ART 共 ' + list.length + ' 只月巴');

/* ---------- PNG 解码（8bit，colorType 0/2/3/4/6，非隔行） ---------- */
function decodePNG(buf) {
  if (buf.readUInt32BE(0) !== 0x89504e47) throw new Error('not png');
  var pos = 8, idat = [], palette = null, trns = null;
  var W = 0, H = 0, depth = 0, ct = 0, interlace = 0;
  while (pos < buf.length) {
    var len = buf.readUInt32BE(pos), type = buf.toString('ascii', pos + 4, pos + 8);
    var data = buf.slice(pos + 8, pos + 8 + len);
    if (type === 'IHDR') { W = data.readUInt32BE(0); H = data.readUInt32BE(4); depth = data[8]; ct = data[9]; interlace = data[12]; }
    else if (type === 'PLTE') palette = data;
    else if (type === 'tRNS') trns = data;
    else if (type === 'IDAT') idat.push(data);
    else if (type === 'IEND') break;
    pos += 12 + len;
  }
  if (depth !== 8 && depth !== 1 && depth !== 2 && depth !== 4) throw new Error('bitdepth ' + depth);
  if (depth !== 8 && ct !== 0 && ct !== 3) throw new Error('bitdepth ' + depth + ' colortype ' + ct);
  if (interlace) throw new Error('interlaced');
  var chMap = { 0: 1, 2: 3, 3: 1, 4: 2, 6: 4 };
  var ch = chMap[ct]; if (!ch) throw new Error('colortype ' + ct);
  var raw = zlib.inflateSync(Buffer.concat(idat));
  var bpp = (depth === 8) ? ch : 1;
  var stride = Math.max(1, Math.ceil(W * (depth === 8 ? ch : depth) / 8));
  var defilt = Buffer.alloc(stride * H);
  var p = 0;
  for (var y = 0; y < H; y++) {
    var f = raw[p++];
    var line = raw.slice(p, p + stride); p += stride;
    var cur = defilt.slice(y * stride, y * stride + stride);
    for (var x = 0; x < stride; x++) {
      var a = x >= bpp ? cur[x - bpp] : 0, b = (y > 0) ? defilt[(y - 1) * stride + x] : 0, c = (x >= bpp && y > 0) ? defilt[(y - 1) * stride + x - bpp] : 0;
      var v = line[x];
      if (f === 1) v = (v + a) & 255;
      else if (f === 2) v = (v + b) & 255;
      else if (f === 3) v = (v + ((a + b) >> 1)) & 255;
      else if (f === 4) {
        var pa = Math.abs(b - c), pb = Math.abs(a - c), pc = Math.abs(a + b - 2 * c);
        v = (v + (pa <= pb && pa <= pc ? a : (pb <= pc ? b : c))) & 255;
      }
      cur[x] = v;
    }
  }
  var out = Buffer.alloc(H * W * 4);
  var mask = (1 << depth) - 1;
  for (var i2 = 0; i2 < W * H; i2++) {
    var r, g, bl, al = 255;
    if (ct === 6) { r = defilt[i2 * 4]; g = defilt[i2 * 4 + 1]; bl = defilt[i2 * 4 + 2]; al = defilt[i2 * 4 + 3]; }
    else if (ct === 2) { r = defilt[i2 * 3]; g = defilt[i2 * 3 + 1]; bl = defilt[i2 * 3 + 2]; }
    else if (ct === 3) { var ix = (depth === 8) ? defilt[i2] : ((defilt[(i2 * depth) >> 3] >> (8 - depth - (i2 * depth & 7))) & mask); r = palette[ix * 3]; g = palette[ix * 3 + 1]; bl = palette[ix * 3 + 2]; if (trns && ix < trns.length) al = trns[ix]; }
    else if (ct === 0) { var v = (depth === 8) ? defilt[i2] : ((defilt[(i2 * depth) >> 3] >> (8 - depth - (i2 * depth & 7))) & mask); r = g = bl = v; }
    else { throw new Error('colortype ' + ct); }
    out[i2 * 4] = r; out[i2 * 4 + 1] = g; out[i2 * 4 + 2] = bl; out[i2 * 4 + 3] = al;
  }
  return { w: W, h: H, rgba: out };
}

/* ---------- PNG 编码（RGBA8，filter 0） ---------- */
var CRC_T = (function () { var t = []; for (var n = 0; n < 256; n++) { var c = n; for (var k = 0; k < 8; k++) c = (c & 1) ? (0xedb88320 ^ (c >>> 1)) : (c >>> 1); t[n] = c >>> 0; } return t; })();
function crc32(buf) {
  var c = 0xffffffff;
  for (var i = 0; i < buf.length; i++) c = CRC_T[(c ^ buf[i]) & 255] ^ (c >>> 8);
  return (c ^ 0xffffffff) >>> 0;
}
function chunk(type, data) {
  var len = Buffer.alloc(4); len.writeUInt32BE(data.length, 0);
  var t = Buffer.from(type, 'ascii');
  var cb = Buffer.alloc(4); cb.writeUInt32BE(crc32(Buffer.concat([t, data])), 0);
  return Buffer.concat([len, t, data, cb]);
}
function encodePNG(w, h, rgba) {
  var sig = Buffer.from([137, 80, 78, 71, 13, 10, 26, 10]);
  var ihdr = Buffer.alloc(13);
  ihdr.writeUInt32BE(w, 0); ihdr.writeUInt32BE(h, 4); ihdr[8] = 8; ihdr[9] = 6;
  var raw = Buffer.alloc((w * 4 + 1) * h);
  for (var y = 0; y < h; y++) {
    raw[y * (w * 4 + 1)] = 0;
    rgba.copy(raw, y * (w * 4 + 1) + 1, y * w * 4, (y + 1) * w * 4);
  }
  return Buffer.concat([sig, chunk('IHDR', ihdr), chunk('IDAT', zlib.deflateSync(raw, { level: 9 })), chunk('IEND', Buffer.alloc(0))]);
}

/* ---------- 不透明包围盒（阈值 64：剔除全透明与近不可见光晕） ---------- */
function alphaBounds(w, h, rgba) {
  var minX = w, minY = h, maxX = -1, maxY = -1;
  for (var y = 0; y < h; y++) for (var x = 0; x < w; x++) {
    if (rgba[(y * w + x) * 4 + 3] > 64) {
      if (x < minX) minX = x; if (x > maxX) maxX = x;
      if (y < minY) minY = y; if (y > maxY) maxY = y;
    }
  }
  return maxX < 0 ? null : { x: minX, y: minY, w: maxX - minX + 1, h: maxY - minY + 1 };
}
function cropRGBA(w, h, rgba, box) {
  var out = Buffer.alloc(box.w * box.h * 4);
  for (var y = 0; y < box.h; y++) for (var x = 0; x < box.w; x++) {
    var s = ((y + box.y) * w + (x + box.x)) * 4, d = (y * box.w + x) * 4;
    out[d] = rgba[s]; out[d + 1] = rgba[s + 1]; out[d + 2] = rgba[s + 2]; out[d + 3] = rgba[s + 3];
  }
  return out;
}

/* ---------- 下载（只跟 http/https 重定向，限 20 秒） ---------- */
function get(url) {
  return new Promise(function (res, rej) {
    var mod = url.indexOf('https:') === 0 ? https : http;
    if (url.indexOf('http:') !== 0 && url.indexOf('https:') !== 0) { rej(new Error('bad protocol')); return; }
    var req = mod.get(url, { timeout: 20000 }, function (r) {
      if (r.statusCode >= 300 && r.statusCode < 400 && r.headers.location) {
        var loc = r.headers.location;
        r.resume();
        if (loc.indexOf('http:') !== 0 && loc.indexOf('https:') !== 0) { rej(new Error('bad redirect')); return; }
        get(loc, res, rej); return;
      }
      if (r.statusCode !== 200) { r.resume(); rej(new Error('HTTP ' + r.statusCode)); return; }
      var parts = [];
      r.on('data', function (c) { parts.push(c); });
      r.on('end', function () { res(Buffer.concat(parts)); });
    });
    req.on('timeout', function () { req.destroy(new Error('timeout')); });
    req.on('error', rej);
  });
}
function delay(ms) { return new Promise(function (r) { setTimeout(r, ms); }); }

/* ---------- 主流程 ---------- */
(async function main() {
  var root = path.resolve(OUT_DIR);
  function safeOut(name) {                    /* 输出路径边界校验：越界一律拒绝 */
    var p = path.resolve(root, name);
    if (p !== root && p.indexOf(root + path.sep) !== 0) return null;
    return p;
  }
  var okN = 0, skipN = 0, failN = 0, gifN = 0, hadFail = false;
  for (var i = 0; i < list.length; i++) {
    var it = list[i];
    var sid = String(it.id);
    if (!/^[\w]+$/.test(sid)) { failN++; console.error('  非法 id 跳过: ' + sid); continue; }
    var outFile = safeOut(sid + '.png');
    if (!outFile) { failN++; continue; }
    if (fs.existsSync(outFile)) { okN++; continue; }      /* 已裁剪过：跳过 */
    try {
      var buf = await get(it.url);
      var isGif = buf.length > 3 && buf[0] === 0x47 && buf[1] === 0x49 && buf[2] === 0x46;
      if (isGif) {                                        /* GIF：不裁剪，原样保存 */
        var gifOut = safeOut(sid + '.gif');
        if (gifOut) fs.writeFileSync(gifOut, buf);
        gifN++; continue;
      }
      var png = decodePNG(buf);
      var box = alphaBounds(png.w, png.h, png.rgba);
      if (!box) { skipN++; continue; }                     /* 全透明 */
      var cropped = cropRGBA(png.w, png.h, png.rgba, box);
      fs.writeFileSync(outFile, encodePNG(box.w, box.h, cropped));
      okN++;
    } catch (e) {
      failN++; hadFail = true;
      console.error('  [' + sid + '] 失败: ' + e.message);
    }
    if (i % 20 === 19) console.log('  进度 ' + (i + 1) + '/' + list.length);
    await delay(60);                                       /* 温和限速 */
  }
  console.log('完成：裁剪 ' + okN + ' · GIF 原样 ' + gifN + ' · 跳过 ' + skipN + ' · 失败 ' + failN + (hadFail ? '（失败的可重跑补齐）' : ''));
  process.exit(0);
})().catch(function (e) { console.error(e); process.exit(1); });
