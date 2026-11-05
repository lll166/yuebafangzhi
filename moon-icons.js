/* ============================================================
   月巴图标库 moon-icons.js
   ------------------------------------------------------------
   16×16 手绘像素 SVG，配色与月巴小游戏浅色 UI 一致：
   墨色 #5b5343 / 米白 #fffdf5 / 浅青 #3e8e7e / 浅青亮 #6fb7a8
   浅木 #c9a06a / 金色 #c9983e / 砖红 #d9776b

   用法（经典 script，直接双击 html 也能用）：
     <script src="moon-icons.js"></script>

     // 静态骨架：给元素写 data-ico，启动后调一次 paintIcons()
     <span class="ico" data-ico="book"></span>
     MoonIcons.paintIcons();

     // 动态字符串：直接拼 SVG
     el.innerHTML = MoonIcons.icon('check') + '完成';

     // 图标自带基础样式（.ico / .ico.only），如需自己控制可先设：
     // window.MOON_ICONS_NO_STYLE = true;

   可用名字见 MoonIcons.names。
   ============================================================ */
(function(g){
  var INK='#5b5343', PANEL='#fffdf5', ACC='#3e8e7e', ACC2='#6fb7a8', WOOD='#c9a06a',
      GOLD='#c9983e', RED='#d9776b';
  function S(b){ return '<svg viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg">'+b+'</svg>'; }

  var ICONS={
    /* 语言：小地球 */
    globe:S('<circle cx="8" cy="8" r="5.4" fill="'+PANEL+'" stroke="'+INK+'" stroke-width="1.4"/>'+
      '<ellipse cx="8" cy="8" rx="2.5" ry="5.4" fill="none" stroke="'+ACC+'" stroke-width="1.1"/>'+
      '<rect x="2.6" y="7.4" width="10.8" height="1.2" fill="'+ACC+'"/>'),
    /* 图鉴：摊开的书 */
    book:S('<rect x="2" y="3.5" width="5.4" height="9" fill="'+PANEL+'" stroke="'+INK+'" stroke-width="1.1"/>'+
      '<rect x="8.6" y="3.5" width="5.4" height="9" fill="'+PANEL+'" stroke="'+INK+'" stroke-width="1.1"/>'+
      '<rect x="7.3" y="3" width="1.4" height="10" fill="'+ACC+'"/>'+
      '<rect x="3.4" y="5.6" width="2.6" height="1" fill="'+ACC2+'"/>'+
      '<rect x="3.4" y="8.1" width="2.6" height="1" fill="'+ACC2+'"/>'+
      '<rect x="10.2" y="5.6" width="2.6" height="1" fill="'+WOOD+'"/>'+
      '<rect x="10.2" y="8.1" width="2.6" height="1" fill="'+WOOD+'"/>'),
    /* 关闭 / 返回 */
    close:S('<path d="M4 4l8 8M12 4l-8 8" stroke="'+INK+'" stroke-width="1.8" stroke-linecap="square"/>'),
    back:S('<path d="M13 8H3.6M7.8 3.8L3.6 8l4.2 4.2" fill="none" stroke="'+INK+'" stroke-width="1.8" stroke-linecap="square"/>'),
    /* 商店：提袋 */
    bag:S('<path d="M3.8 6.4h8.4l-.7 7.3H4.5z" fill="'+WOOD+'" stroke="'+INK+'" stroke-width="1.1"/>'+
      '<path d="M5.2 6.4V5.1a2.8 2.8 0 0 1 5.6 0v1.3" fill="none" stroke="'+INK+'" stroke-width="1.3"/>'+
      '<rect x="3.5" y="5.4" width="9" height="1.4" fill="'+INK+'"/>'+
      '<rect x="6.4" y="8.4" width="3.2" height="1" fill="'+ACC+'"/>'+
      '<rect x="6.4" y="10.3" width="3.2" height="1" fill="'+ACC+'"/>'),
    /* 订单：写字板 */
    clip:S('<rect x="3.2" y="2.4" width="9.6" height="12" fill="'+PANEL+'" stroke="'+INK+'" stroke-width="1.1"/>'+
      '<rect x="5.8" y="1.2" width="4.4" height="2.6" fill="'+ACC2+'" stroke="'+INK+'" stroke-width="1"/>'+
      '<rect x="5" y="6" width="6" height="1" fill="'+ACC+'"/>'+
      '<rect x="5" y="8.5" width="6" height="1" fill="'+ACC+'"/>'+
      '<rect x="5" y="11" width="4" height="1" fill="'+ACC+'"/>'),
    /* 挑战：奖杯 */
    trophy:S('<path d="M4.2 2.4h7.6v3.2a3.8 3.8 0 0 1-7.6 0z" fill="'+GOLD+'" stroke="'+INK+'" stroke-width="1.1"/>'+
      '<path d="M4.2 4H2.3v1.6a2.2 2.2 0 0 0 2.2 2.2M11.8 4h1.9v1.6a2.2 2.2 0 0 1-2.2 2.2" fill="none" stroke="'+INK+'" stroke-width="1.1"/>'+
      '<rect x="6.9" y="9" width="2.2" height="3" fill="'+INK+'"/>'+
      '<rect x="4.6" y="11.9" width="6.8" height="1.6" fill="'+INK+'"/>'+
      '<rect x="6.6" y="3.6" width="1" height="4" fill="'+WOOD+'"/>'),
    /* 统计：柱状图 */
    chart:S('<rect x="2" y="12.6" width="12" height="1.4" fill="'+INK+'"/>'+
      '<rect x="3" y="8.4" width="2.6" height="4.2" fill="'+ACC2+'"/>'+
      '<rect x="6.7" y="5.6" width="2.6" height="7" fill="'+ACC+'"/>'+
      '<rect x="10.4" y="2.8" width="2.6" height="9.8" fill="'+WOOD+'"/>'),
    /* 排行 / 名次：奖牌 */
    medal:S('<rect x="4.4" y="1.2" width="2.6" height="4.4" fill="'+ACC2+'"/>'+
      '<rect x="9" y="1.2" width="2.6" height="4.4" fill="'+RED+'"/>'+
      '<circle cx="8" cy="10" r="4.2" fill="'+GOLD+'" stroke="'+INK+'" stroke-width="1.1"/>'+
      '<circle cx="8" cy="10" r="1.9" fill="'+PANEL+'"/>'),
    /* 鱼篓：竹编篮 */
    basket:S('<path d="M2.4 6.2h11.2l-1.5 7.4H3.9z" fill="'+WOOD+'" stroke="'+INK+'" stroke-width="1.1"/>'+
      '<rect x="2.4" y="5.2" width="11.2" height="1.6" fill="'+INK+'"/>'+
      '<path d="M5.6 5.2a2.4 2.4 0 0 1 4.8 0" fill="none" stroke="'+INK+'" stroke-width="1.2"/>'+
      '<rect x="5.4" y="7.6" width="1" height="5" fill="'+INK+'"/>'+
      '<rect x="9.6" y="7.6" width="1" height="5" fill="'+INK+'"/>'+
      '<rect x="3.4" y="9.6" width="9.2" height="1" fill="'+INK+'"/>'),
    /* 玩法：问号 */
    help:S('<path d="M6 5.6a2.2 2.2 0 1 1 3.4 1.9c-.8.5-1.4 1-1.4 2" fill="none" stroke="'+INK+'" stroke-width="1.7" stroke-linecap="square"/>'+
      '<rect x="6.9" y="11" width="2.2" height="2.2" fill="'+ACC+'"/>'),
    /* 立绘：调色盘 */
    palette:S('<ellipse cx="8" cy="8.6" rx="6" ry="5.2" fill="'+PANEL+'" stroke="'+INK+'" stroke-width="1.2"/>'+
      '<ellipse cx="10.9" cy="11" rx="1.5" ry="1.2" fill="'+WOOD+'" stroke="'+INK+'" stroke-width=".8"/>'+
      '<circle cx="4.6" cy="5.4" r="1.15" fill="'+RED+'"/>'+
      '<circle cx="8" cy="4.4" r="1.15" fill="'+ACC+'"/>'+
      '<circle cx="11.3" cy="6.1" r="1.15" fill="'+GOLD+'"/>'+
      '<circle cx="5" cy="9.2" r="1.15" fill="'+ACC2+'"/>'),
    /* 首次捕获：星 */
    star:S('<path d="M8 2.2l1.7 3.6 3.9.5-2.9 2.7.8 3.9L8 11.1l-3.5 1.8.8-3.9L2.4 6.3l3.9-.5z" fill="'+GOLD+'" stroke="'+INK+'" stroke-width="1"/>'),
    /* 信件 */
    mail:S('<rect x="2" y="4" width="12" height="8" fill="'+PANEL+'" stroke="'+INK+'" stroke-width="1.2"/>'+
      '<path d="M2.4 4.5L8 9l5.6-4.5" fill="none" stroke="'+ACC+'" stroke-width="1.2"/>'),
    /* 完成：对勾 */
    check:S('<path d="M3.2 8.4l3.4 3.4 6.2-7" fill="none" stroke="'+ACC+'" stroke-width="2" stroke-linecap="square"/>'),
    /* 满尺寸：小皇冠 */
    crown:S('<path d="M2.2 4.6l2.6 2.6L8 3.2l3.2 4 2.6-2.6v7h-11.6z" fill="'+GOLD+'" stroke="'+INK+'" stroke-width="1.1"/>'+
      '<rect x="2.2" y="11.2" width="11.6" height="1.8" fill="'+INK+'"/>'+
      '<rect x="7.2" y="6" width="1.6" height="1.6" fill="'+RED+'"/>'),
    /* 锁定 / 解锁 */
    lock:S('<rect x="3.2" y="7.2" width="9.6" height="6.6" fill="'+WOOD+'" stroke="'+INK+'" stroke-width="1.1"/>'+
      '<path d="M5.4 7.2V5.3a2.6 2.6 0 0 1 5.2 0v1.9" fill="none" stroke="'+INK+'" stroke-width="1.4"/>'+
      '<rect x="7.1" y="9.2" width="1.8" height="2.6" fill="'+INK+'"/>'),
    unlock:S('<rect x="3.2" y="7.2" width="9.6" height="6.6" fill="'+PANEL+'" stroke="'+INK+'" stroke-width="1.1"/>'+
      '<path d="M10.6 7.2V5.3a2.6 2.6 0 0 0-5.2 0" fill="none" stroke="'+INK+'" stroke-width="1.4"/>'+
      '<rect x="7.1" y="9.2" width="1.8" height="2.6" fill="'+ACC+'"/>'),
    /* 省电：月亮 / 闪电 */
    moon:S('<path d="M10.6 2.4a5.9 5.9 0 1 0 0 11.2 6.6 6.6 0 0 1 0-11.2z" fill="'+ACC2+'" stroke="'+INK+'" stroke-width="1.1"/>'),
    bolt:S('<path d="M9.4 1.8L4 9.2h3l-1.1 5 5.4-7.6h-3z" fill="'+GOLD+'" stroke="'+INK+'" stroke-width="1.1"/>'),
    /* 换心愿：循环箭头 */
    refresh:S('<path d="M12.4 8a4.4 4.4 0 1 1-1.5-3.3" fill="none" stroke="'+INK+'" stroke-width="1.6" stroke-linecap="square"/>'+
      '<path d="M12.8 2.4v3.2H9.6" fill="none" stroke="'+INK+'" stroke-width="1.6" stroke-linecap="square"/>'),
    /* 时段：清晨 / 白天 / 黄昏 */
    sunrise:S('<rect x="1.8" y="12.6" width="12.4" height="1.4" fill="'+INK+'"/>'+
      '<circle cx="8" cy="6.4" r="2.9" fill="'+GOLD+'" stroke="'+INK+'" stroke-width="1.1"/>'+
      '<rect x="7.1" y="1.1" width="1.8" height="2" fill="'+WOOD+'"/>'+
      '<rect x="3.1" y="5.5" width="1.8" height="1.8" fill="'+WOOD+'"/>'+
      '<rect x="11.1" y="5.5" width="1.8" height="1.8" fill="'+WOOD+'"/>'),
    sun:S('<circle cx="8" cy="8" r="3.2" fill="'+GOLD+'" stroke="'+INK+'" stroke-width="1.1"/>'+
      '<rect x="7.2" y="1.4" width="1.6" height="2.2" fill="'+WOOD+'"/>'+
      '<rect x="7.2" y="12.4" width="1.6" height="2.2" fill="'+WOOD+'"/>'+
      '<rect x="1.4" y="7.2" width="2.2" height="1.6" fill="'+WOOD+'"/>'+
      '<rect x="12.4" y="7.2" width="2.2" height="1.6" fill="'+WOOD+'"/>'),
    sunset:S('<rect x="1.8" y="6.2" width="12.4" height="1.4" fill="'+INK+'"/>'+
      '<path d="M4.4 6.2a3.6 3.6 0 0 0 7.2 0" fill="'+RED+'" stroke="'+INK+'" stroke-width="1.1"/>'+
      '<rect x="3.4" y="9.2" width="9.2" height="1" fill="'+ACC2+'"/>'+
      '<rect x="5.2" y="11.2" width="5.6" height="1" fill="'+ACC2+'"/>'+
      '<rect x="6.8" y="13.1" width="2.4" height="1" fill="'+ACC2+'"/>'),
    /* 云存档 */
    cloud:S('<path d="M4.6 12h6.9a2.4 2.4 0 0 0 .2-4.8 3.1 3.1 0 0 0-5.9-1A2.6 2.6 0 0 0 4.6 12z" fill="'+PANEL+'" stroke="'+INK+'" stroke-width="1.1"/>'+
      '<rect x="4.6" y="11" width="7.4" height="1" fill="'+ACC2+'"/>')
  };

  /* 生成 <i class="ico">…</i>；cls 传 'only' 时不带右侧间距 */
  function icon(name,cls){
    return '<i class="ico'+(cls?' '+cls:'')+'">'+(ICONS[name]||'')+'</i>';
  }
  /* 给静态骨架里的 [data-ico] 填图标：只换图形，不碰文字，切语言后仍保留 */
  function paintIcons(root){
    var nodes=(root||document).querySelectorAll('[data-ico]'), i, el, n;
    for(i=0;i<nodes.length;i++){
      el=nodes[i]; n=el.getAttribute('data-ico');
      if(ICONS[n]) el.innerHTML=ICONS[n];
    }
  }

  /* 基础尺寸样式：默认自动注入一次，页面可自行覆盖；不需要时先设 window.MOON_ICONS_NO_STYLE=true */
  var CSS='.ico{display:inline-block;width:1.15em;height:1.15em;flex:0 0 auto;vertical-align:-.22em;line-height:0;margin-right:.3em}'+
    '.ico svg{display:block;width:100%;height:100%}'+
    '.ico.only{margin-right:0}';
  function injectStyle(){
    if(g.MOON_ICONS_NO_STYLE) return;
    if(typeof document==='undefined' || !document.head) return;
    if(document.getElementById('moon-icons-style')) return;
    var s=document.createElement('style');
    s.id='moon-icons-style';
    s.textContent=CSS;
    document.head.appendChild(s);
  }
  injectStyle();

  var api={
    ICONS:ICONS,
    icon:icon,
    paintIcons:paintIcons,
    css:CSS,
    names:Object.keys(ICONS)
  };
  g.MoonIcons=api;
})(window);
