/* ============================================================
   月巴图标库 moon-icons.js
   ------------------------------------------------------------
   16×16 手绘像素 SVG，配色与月巴小游戏浅色 UI 一致：
   墨色 #5b5343 / 米白 #fffdf5 / 浅青 #3e8e7e / 浅青亮 #6fb7a8
   浅木 #c9a06a / 金色 #c9983e / 砖红 #d9776b

   用法（经典 script，直接双击 html 也能用；该文件也可整段贴进内联脚本，
   但注释/字符串里请写 <\/script>，不要写裸的结束标签）：
     <script src="moon-icons.js"><\/script>

     // 静态骨架：给元素写 data-ico，启动后调一次 paintIcons()
     <span class="ico" data-ico="book"></span>
     MoonIcons.paintIcons();

     // 动态字符串：直接拼 SVG
     el.innerHTML = MoonIcons.icon('check') + '完成';

     // 月巴大扫除等暖棕 UI 使用第二套主题（墨褐 / 焦糖 / 番茄红 / 苔绿）：
     MoonIcons.icon('broom','only','warm');
     MoonIcons.paintIcons(root,'warm');
     MoonIcons.svg('tomato','warm');   // 只要裸 SVG 时用

     // 图标自带基础样式（.ico / .ico.only），如需自己控制可先设：
     // window.MOON_ICONS_NO_STYLE = true;

    // 月巴数织等冷调 UI 用第三套主题（靛蓝 / 冰蓝 / 薰衣草 / 赭金），线条随 currentColor 变色：
     MoonIcons.icon('star','only','cool');
     MoonIcons.paintIcons(root,'cool');
     MoonIcons.svg('sparkle','cool');

     // 月巴贪吃蛇等深空霓虹 UI 用第四套主题（单色线条，跟随 currentColor 电光青）：
     MoonIcons.icon('trophy','only','neon');
     MoonIcons.paintIcons(root,'neon');
     MoonIcons.svg('tomato','neon');

     // 俄罗斯巴块等深蓝紫调 UI 用第五套主题（同样单色，跟随 currentColor，深浅两种皮肤通用）：
     MoonIcons.icon('ladder','only','tetris');
     MoonIcons.paintIcons(root,'tetris');

     // 月巴首页用第六套主题（单色 currentColor，适配全部皮肤）：
     MoonIcons.icon('rabbit','only','index');
     MoonIcons.paintIcons(root,'index');
     MoonIcons.svg('pine','index');

     可用名字见 MoonIcons.names（浅色）、MoonIcons.warmNames（暖棕）、MoonIcons.coolNames（冷调）、
     MoonIcons.neonNames（霓虹）、MoonIcons.tetrisNames（俄罗斯巴块）与 MoonIcons.indexNames（首页）。
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

  /* ---------- 暖棕主题：月巴大扫除（墨褐 / 米白 / 焦糖 / 番茄红 / 苔绿） ---------- */
  var WINK='#3b2a1b', WPANEL='#fffaf2', WACC='#b9741f', WACC2='#8f5310',
      WWOOD='#c9a06a', WGOLD='#d9a441', WRED='#cf4430', WGREEN='#6c8b4f';
  var WSPK='<rect x="1.9" y="6.3" width="2.7" height="3.4" rx=".5" fill="'+WACC2+'" stroke="'+WINK+'" stroke-width=".8"/>'
    +'<path d="M4.6 6.3L8 3.5v9L4.6 9.7z" fill="'+WACC+'" stroke="'+WINK+'" stroke-width="1"/>';
  var WARM_ICONS={
    /* 扫把：大扫除主图标 / 翻格 */
    broom:S('<rect x="7.2" y="1.2" width="1.7" height="6.6" fill="'+WWOOD+'" stroke="'+WINK+'" stroke-width=".9"/>'+
      '<rect x="6.3" y="6.9" width="3.5" height="1.7" fill="'+WACC2+'"/>'+
      '<path d="M4.7 8.4h7.2l-1.2 6H5.9z" fill="'+WGOLD+'" stroke="'+WINK+'" stroke-width="1.1"/>'+
      '<rect x="6.7" y="9.4" width=".9" height="4.5" fill="'+WACC2+'"/>'+
      '<rect x="9" y="9.4" width=".9" height="4.5" fill="'+WACC2+'"/>'),
    /* 水桶：普通难度 */
    bucket:S('<path d="M3.9 5.7h8.2l-1 7.8H4.9z" fill="'+WWOOD+'" stroke="'+WINK+'" stroke-width="1.1"/>'+
      '<rect x="2.9" y="4.4" width="10.2" height="1.7" fill="'+WACC+'" stroke="'+WINK+'" stroke-width=".8"/>'+
      '<path d="M5.1 4.8a2.9 2.9 0 0 1 5.8 0" fill="none" stroke="'+WINK+'" stroke-width="1.2"/>'+
      '<rect x="5.8" y="7.6" width=".9" height="5" fill="'+WACC2+'" opacity=".5"/>'),
    /* 档案柜：困难难度 */
    cabinet:S('<rect x="2.8" y="2" width="10.4" height="12" fill="'+WPANEL+'" stroke="'+WINK+'" stroke-width="1.1"/>'+
      '<rect x="3.9" y="3.2" width="8.2" height="3" fill="'+WWOOD+'" stroke="'+WINK+'" stroke-width=".8"/>'+
      '<rect x="3.9" y="7" width="8.2" height="3" fill="'+WWOOD+'" stroke="'+WINK+'" stroke-width=".8"/>'+
      '<rect x="3.9" y="10.8" width="8.2" height="2.2" fill="'+WWOOD+'" stroke="'+WINK+'" stroke-width=".8"/>'+
      '<rect x="7.1" y="4.4" width="1.8" height=".8" fill="'+WINK+'"/>'+
      '<rect x="7.1" y="8.2" width="1.8" height=".8" fill="'+WINK+'"/>'+
      '<rect x="7.1" y="11.5" width="1.8" height=".8" fill="'+WINK+'"/>'),
    /* 番茄：每日大扫除 / 奖励 */
    tomato:S('<path d="M8 4.5c2.9 0 5 2 5 4.6 0 2.9-2.2 5-5 5s-5-2.1-5-5c0-2.6 2.1-4.6 5-4.6z" fill="'+WRED+'" stroke="'+WINK+'" stroke-width="1.1"/>'+
      '<path d="M8 4.6L5.3 2.9M8 4.6l2.7-1.7M8 4.6V2" fill="none" stroke="'+WGREEN+'" stroke-width="1.2" stroke-linecap="square"/>'+
      '<path d="M5.4 7.4c.5-.7 1.2-1.1 1.9-1.2" fill="none" stroke="'+WPANEL+'" stroke-width="1" opacity=".6"/>'),
    /* 胶带：封格 */
    tape:S('<path d="M2.9 10.1l7.2-7.2 3 3-7.2 7.2z" fill="'+WPANEL+'" stroke="'+WINK+'" stroke-width="1.1"/>'+
      '<rect x="6.2" y="6.2" width="3.6" height="3.6" transform="rotate(45 8 8)" fill="'+WWOOD+'" stroke="'+WINK+'" stroke-width=".7"/>'+
      '<circle cx="6.1" cy="9.9" r=".6" fill="'+WINK+'"/><circle cx="9.9" cy="6.1" r=".6" fill="'+WINK+'"/>'),
    /* 拳头：敲一敲 */
    fist:S('<rect x="4.2" y="6.4" width="7.6" height="6.2" rx="1.5" fill="'+WWOOD+'" stroke="'+WINK+'" stroke-width="1.1"/>'+
      '<rect x="4.9" y="5" width="1.6" height="2.4" rx=".6" fill="'+WWOOD+'" stroke="'+WINK+'" stroke-width=".8"/>'+
      '<rect x="7.2" y="4.5" width="1.6" height="2.9" rx=".6" fill="'+WWOOD+'" stroke="'+WINK+'" stroke-width=".8"/>'+
      '<rect x="9.5" y="5" width="1.6" height="2.4" rx=".6" fill="'+WWOOD+'" stroke="'+WINK+'" stroke-width=".8"/>'+
      '<rect x="3.4" y="11.3" width="9.2" height="1.9" fill="'+WACC2+'"/>'+
      '<rect x="5.2" y="8.2" width="5.6" height=".8" fill="'+WACC2+'" opacity=".45"/>'),
    /* 硬币：金币奖励 */
    coin:S('<circle cx="8" cy="8" r="5.7" fill="'+WGOLD+'" stroke="'+WINK+'" stroke-width="1.1"/>'+
      '<circle cx="8" cy="8" r="3.7" fill="none" stroke="'+WACC2+'" stroke-width=".9"/>'+
      '<rect x="7.2" y="5.3" width="1.6" height="5.4" fill="'+WACC2+'"/>'+
      '<circle cx="5.3" cy="5.7" r=".8" fill="'+WPANEL+'" opacity=".55"/>'),
    /* 纸箱：藏小偷 */
    box:S('<path d="M2.7 5.2L8 2.4l5.3 2.8v6.2L8 14.2l-5.3-3z" fill="'+WWOOD+'" stroke="'+WINK+'" stroke-width="1.1"/>'+
      '<path d="M2.7 5.2L8 8l5.3-2.8M8 8v6.2" fill="none" stroke="'+WINK+'" stroke-width="1"/>'+
      '<path d="M5.4 3.8l5.3 2.8" stroke="'+WACC2+'" stroke-width="1.2"/>'),
    /* 奖杯：成就通知 */
    trophy:S('<path d="M4.4 2.4h7.2v3.1a3.6 3.6 0 0 1-7.2 0z" fill="'+WGOLD+'" stroke="'+WINK+'" stroke-width="1.1"/>'+
      '<path d="M4.4 3.9H2.6v1.5a2.1 2.1 0 0 0 2.1 2.1M11.6 3.9h1.8v1.5a2.1 2.1 0 0 1-2.1 2.1" fill="none" stroke="'+WINK+'" stroke-width="1.1"/>'+
      '<rect x="6.9" y="8.8" width="2.2" height="3" fill="'+WACC2+'"/>'+
      '<rect x="4.7" y="11.8" width="6.6" height="1.6" fill="'+WINK+'"/>'+
      '<rect x="6.6" y="3.5" width="1" height="4" fill="'+WWOOD+'"/>'),
    /* 奖牌：排行榜 */
    medal:S('<rect x="4.4" y="1.2" width="2.5" height="4.2" fill="'+WACC+'"/>'+
      '<rect x="9.1" y="1.2" width="2.5" height="4.2" fill="'+WRED+'"/>'+
      '<circle cx="8" cy="10" r="4.4" fill="'+WGOLD+'" stroke="'+WINK+'" stroke-width="1.1"/>'+
      '<circle cx="8" cy="10" r="2" fill="'+WPANEL+'"/>'+
      '<circle cx="8" cy="10" r=".9" fill="'+WACC2+'"/>'),
    /* 喇叭 / 静音 */
    sound:S(WSPK+'<path d="M10 5.7a3.3 3.3 0 0 1 0 4.6M11.7 4.2a5.5 5.5 0 0 1 0 7.6" fill="none" stroke="'+WINK+'" stroke-width="1.1" stroke-linecap="round"/>'),
    mute:S(WSPK+'<path d="M10.3 6.3l3.4 3.4M13.7 6.3l-3.4 3.4" fill="none" stroke="'+WRED+'" stroke-width="1.4" stroke-linecap="square"/>'),
    /* 暂停 / 全屏 */
    pause:S('<rect x="4.2" y="3.2" width="2.9" height="9.6" rx=".6" fill="'+WACC2+'"/>'+
      '<rect x="8.9" y="3.2" width="2.9" height="9.6" rx=".6" fill="'+WACC2+'"/>'),
    expand:S('<path d="M2.6 6.2V2.6h3.6M10 2.6h3.4v3.6M13.4 9.8v3.6H10M6 13.4H2.6V9.8" fill="none" stroke="'+WINK+'" stroke-width="1.6" stroke-linecap="square"/>'),
    shrink:S('<path d="M6.2 2.6v3.6H2.6M13.4 6.2H9.8V2.6M9.8 13.4v-3.6h3.6M2.6 9.8h3.6v3.6" fill="none" stroke="'+WINK+'" stroke-width="1.6" stroke-linecap="square"/>'),
    /* 关闭 / 锁定 / 完成 */
    close:S('<path d="M4 4l8 8M12 4l-8 8" stroke="'+WINK+'" stroke-width="1.8" stroke-linecap="square"/>'),
    lock:S('<rect x="3.4" y="7.2" width="9.2" height="6.4" fill="'+WWOOD+'" stroke="'+WINK+'" stroke-width="1.1"/>'+
      '<path d="M5.5 7.2V5.4a2.5 2.5 0 0 1 5 0v1.8" fill="none" stroke="'+WINK+'" stroke-width="1.4"/>'+
      '<rect x="7.1" y="9.2" width="1.8" height="2.4" fill="'+WINK+'"/>'),
    check:S('<path d="M3.2 8.4l3.4 3.4 6.2-7" fill="none" stroke="'+WGREEN+'" stroke-width="2" stroke-linecap="square"/>')
  };

  /* ---------- 冷调主题：月巴数织（靛蓝 / 薰衣草 / 冰蓝 / 赭金） ----------
     这套线条图标统一用 currentColor 描边，颜色跟随所在元素
     （--ink / --acc / --ice / --pink / --gold），换模式自动变色。 */
  var COOL_ICONS={
    /* 四角星：成就 / 提示 */
    sparkle:S('<path d="M8 1.5l1.5 4.9 4.9 1.6-4.9 1.6-1.5 4.9-1.5-4.9-4.9-1.6 4.9-1.6z" fill="currentColor"/>'),
    /* 设置：三条滑杆 */
    gear:S('<rect x="2" y="3.4" width="2.2" height="1.3" fill="currentColor"/>'+
      '<rect x="8.2" y="3.4" width="5.8" height="1.3" fill="currentColor"/>'+
      '<rect x="2" y="7.35" width="7.4" height="1.3" fill="currentColor"/>'+
      '<rect x="13" y="7.35" width="1" height="1.3" fill="currentColor"/>'+
      '<rect x="2" y="11.3" width="4.2" height="1.3" fill="currentColor"/>'+
      '<rect x="10.4" y="11.3" width="3.6" height="1.3" fill="currentColor"/>'+
      '<circle cx="6.2" cy="4.05" r="1.8" fill="none" stroke="currentColor" stroke-width="1.4"/>'+
      '<circle cx="11.2" cy="8" r="1.8" fill="none" stroke="currentColor" stroke-width="1.4"/>'+
      '<circle cx="8.3" cy="11.95" r="1.8" fill="none" stroke="currentColor" stroke-width="1.4"/>'),
    /* 锁 / 开锁 */
    lock:S('<rect x="3.5" y="7" width="9" height="6.4" rx=".6" fill="none" stroke="currentColor" stroke-width="1.5"/>'+
      '<path d="M5.6 7V5.2a2.4 2.4 0 0 1 4.8 0V7" fill="none" stroke="currentColor" stroke-width="1.5"/>'+
      '<rect x="7.2" y="9.3" width="1.6" height="2.4" fill="currentColor"/>'),
    unlock:S('<rect x="3.5" y="7" width="9" height="6.4" rx=".6" fill="none" stroke="currentColor" stroke-width="1.5"/>'+
      '<path d="M10.4 7V5.2a2.4 2.4 0 0 0-4.8 0" fill="none" stroke="currentColor" stroke-width="1.5"/>'+
      '<rect x="7.2" y="9.3" width="1.6" height="2.4" fill="currentColor"/>'),
    /* 骰子：随机一题 */
    dice:S('<rect x="2.5" y="2.5" width="11" height="11" fill="none" stroke="currentColor" stroke-width="1.5"/>'+
      '<circle cx="5.4" cy="5.4" r="1.15" fill="currentColor"/>'+
      '<circle cx="10.6" cy="5.4" r="1.15" fill="currentColor"/>'+
      '<circle cx="8" cy="8" r="1.15" fill="currentColor"/>'+
      '<circle cx="5.4" cy="10.6" r="1.15" fill="currentColor"/>'+
      '<circle cx="10.6" cy="10.6" r="1.15" fill="currentColor"/>'),
    /* 暂停 */
    pause:S('<rect x="4.3" y="3.2" width="2.6" height="9.6" fill="currentColor"/>'+
      '<rect x="9.1" y="3.2" width="2.6" height="9.6" fill="currentColor"/>'),
    /* 铅笔：说明 / 备注 */
    pencil:S('<path d="M2.6 13.4l1.1-3.5 7.7-7.7 2.4 2.4-7.7 7.7z" fill="none" stroke="currentColor" stroke-width="1.4"/>'+
      '<path d="M9.6 3.9l1.1-1.1a1.1 1.1 0 0 1 1.6 1.6l-1.1 1.1" fill="none" stroke="currentColor" stroke-width="1.4"/>'+
      '<path d="M2.6 13.4l3.4-.9" stroke="currentColor" stroke-width="1.1" opacity=".65"/>'),
    /* 涂黑 / 打叉 / 待选 */
    fill:S('<rect x="3.2" y="3.2" width="9.6" height="9.6" fill="currentColor"/>'),
    cross:S('<path d="M3.4 3.4L12.6 12.6M12.6 3.4L3.4 12.6" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="square"/>'),
    tent:S('<path d="M2.8 2.8h10.4v10.4H2.8z" fill="none" stroke="currentColor" stroke-width="1.5"/>'+
      '<path d="M13.2 2.8v10H2.8z" fill="currentColor" opacity=".3"/>'),
    /* 撤销 / 清空 */
    undo:S('<path d="M4.4 4.5h5.4a3.5 3.5 0 0 1 0 7H6" fill="none" stroke="currentColor" stroke-width="1.5"/>'+
      '<path d="M6.9 2.1L4.3 4.5l2.6 2.4" fill="none" stroke="currentColor" stroke-width="1.5"/>'),
    erase:S('<path d="M5.4 3.2h7.8v9.6H5.4l-3.2-4.8z" fill="none" stroke="currentColor" stroke-width="1.5"/>'+
      '<path d="M8.2 6.2l3.4 3.4M11.6 6.2l-3.4 3.4" fill="none" stroke="currentColor" stroke-width="1.2"/>'),
    /* 星 / 降难度 */
    star:S('<path d="M8 1.8l1.9 3.8 4.3.6-3.1 3-1.3 4.3-3.8-2.1-3.8 2.1-1.3-4.3 3.1-3 4.3-.6z" fill="currentColor"/>'),
    down:S('<path d="M8 2.4v11" fill="none" stroke="currentColor" stroke-width="1.5"/>'+
      '<path d="M3.7 9.3L8 13.6l4.3-4.3" fill="none" stroke="currentColor" stroke-width="1.5"/>'),
    /* 关闭 / 返回 */
    close:S('<path d="M4 4l8 8M12 4l-8 8" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="square"/>'),
    back:S('<path d="M13 8H3.6M7.8 3.8L3.6 8l4.2 4.2" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="square"/>')
  };

  /* ---------- 霓虹主题：月巴贪吃蛇（深空底 / 电光青，单色线条跟随 currentColor） ---------- */
  var NEON_ICONS={
    /* 成就 / 解锁横幅：奖杯 */
    trophy:S('<path d="M4.6 2.2h6.8v3.4a3.4 3.4 0 0 1-6.8 0z" fill="none" stroke="currentColor" stroke-width="1.5"/>'+
      '<path d="M4.6 3.4H3v1.1a2.2 2.2 0 0 0 1.9 2.2M11.4 3.4H13v1.1a2.2 2.2 0 0 1-1.9 2.2" fill="none" stroke="currentColor" stroke-width="1.2"/>'+
      '<rect x="7.1" y="9.2" width="1.8" height="2.4" fill="currentColor"/>'+
      '<path d="M4.4 13.4h7.2M5.8 11.6h4.4" fill="none" stroke="currentColor" stroke-width="1.5"/>'),
    /* 暂停 */
    pause:S('<rect x="4.4" y="3.2" width="2.4" height="9.6" fill="currentColor"/>'+
      '<rect x="9.2" y="3.2" width="2.4" height="9.6" fill="currentColor"/>'),
    /* 关闭 */
    close:S('<path d="M4 4l8 8M12 4l-8 8" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="square"/>'),
    /* 方向键 */
    up:S('<path d="M8 3.4l4.9 6.6H3.1z" fill="currentColor"/>'),
    left:S('<path d="M3.4 8l6.6-4.9v9.8z" fill="currentColor"/>'),
    right:S('<path d="M12.6 8L6 12.9V3.1z" fill="currentColor"/>'),
    down:S('<path d="M8 12.6L3.1 6h9.8z" fill="currentColor"/>'),
    /* 番茄：吃一口变长 */
    tomato:S('<circle cx="8" cy="9.4" r="4.4" fill="none" stroke="currentColor" stroke-width="1.5"/>'+
      '<path d="M8 5V2.6M5.4 6.2L8 7.7M10.6 6.2L8 7.7" fill="none" stroke="currentColor" stroke-width="1.3"/>'),
    /* 蛇：初次上路 */
    snake:S('<path d="M12.8 11.8c-2.4 0-2.4-3.6-4.8-3.6s-2.4 3.6-4.8 3.6" fill="none" stroke="currentColor" stroke-width="1.5"/>'+
      '<circle cx="14.1" cy="11.8" r="1.4" fill="currentColor"/>'),
    /* 星：小有成就 */
    star:S('<path d="M8 1.8l1.9 3.9 4.3.6-3.1 3 1.3 4.3-3.8-2.1-3.8 2.1 1.3-4.3-3.1-3 4.3-.6z" fill="currentColor"/>'),
    /* 火：单局高分 */
    flame:S('<path d="M8 2.1c.4 2.6-2.9 3.4-2.9 6.4a3.3 3.3 0 0 0 6.6 0c0-1.7-.9-3-2-4.1-.2 1.2-.8 1.9-1.7 2.4.5-1.7.4-3.1 0-4.7z" fill="none" stroke="currentColor" stroke-width="1.5"/>'+
      '<path d="M8 9.2c.7.8 1.1 1.3 1.1 1.9a1.1 1.1 0 0 1-2.2 0c0-.6.3-1.1 1.1-1.9z" fill="currentColor"/>'),
    /* 旗：长蛇 */
    ribbon:S('<path d="M3.6 1.8v12.4" fill="none" stroke="currentColor" stroke-width="1.5"/>'+
      '<path d="M4.8 2.4h7.8l-2 2.6 2 2.6H4.8z" fill="currentColor" opacity=".9"/>'+
      '<path d="M4.8 9h5.8l-1.5 2 1.5 2H4.8z" fill="none" stroke="currentColor" stroke-width="1.2"/>'),
    /* 手套：贴墙漂移 */
    glove:S('<path d="M4.2 9.6V5.6a1.5 1.5 0 0 1 3 0v.8h.2V4.4a1.5 1.5 0 0 1 3 0v5.2a4.2 4.2 0 0 1-4.2 4.2h-.6a2.8 2.8 0 0 1-2.4-1.4" fill="none" stroke="currentColor" stroke-width="1.4"/>'+
      '<path d="M4.3 9.4L2.7 8.1" fill="none" stroke="currentColor" stroke-width="1.3"/>'),
    /* 靶心：毫厘之间 */
    target:S('<circle cx="8" cy="8" r="5.6" fill="none" stroke="currentColor" stroke-width="1.4"/>'+
      '<circle cx="8" cy="8" r="2.9" fill="none" stroke="currentColor" stroke-width="1.2"/>'+
      '<circle cx="8" cy="8" r="1.2" fill="currentColor"/>'),
    /* 静音：静默猎手 */
    hush:S('<path d="M2.8 6.2h2.4L8.4 3v10L5.2 9.8H2.8z" fill="none" stroke="currentColor" stroke-width="1.4"/>'+
      '<path d="M10.6 5.6l3.2 4.8M13.8 5.6l-3.2 4.8" fill="none" stroke="currentColor" stroke-width="1.5"/>'),
    /* 循环箭头：指尖微操 */
    swirl:S('<path d="M8 2.4a5.6 5.6 0 1 0 4.9 7.9" fill="none" stroke="currentColor" stroke-width="1.5"/>'+
      '<path d="M12.9 2.6v3.2H9.7" fill="none" stroke="currentColor" stroke-width="1.5"/>'),
    /* 筷子：自食其果 */
    chopsticks:S('<path d="M2.8 13.2L11.4 3.2M5.8 14L13.8 5" fill="none" stroke="currentColor" stroke-width="1.5"/>'+
      '<path d="M11.4 3.2l1.6-.2M13.8 5l1.2-.4" fill="none" stroke="currentColor" stroke-width="1"/>'),
    /* 满分：累计百口 */
    perfect:S('<circle cx="8" cy="8" r="4.8" fill="none" stroke="currentColor" stroke-width="1.4"/>'+
      '<path d="M5.6 8.2l1.8 1.9 3.1-3.6" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="square"/>'+
      '<path d="M8 .8v1.4M8 13.8v1.4M.8 8h1.4M13.8 8h1.4" stroke="currentColor" stroke-width="1.2"/>'),
    /* 日历：常客 */
    calendar:S('<rect x="2.4" y="3.4" width="11.2" height="10.2" fill="none" stroke="currentColor" stroke-width="1.4"/>'+
      '<path d="M2.4 6.8h11.2" stroke="currentColor" stroke-width="1.2"/>'+
      '<path d="M5.4 2v3M10.6 2v3" stroke="currentColor" stroke-width="1.4"/>'+
      '<rect x="4.8" y="8.6" width="1.9" height="1.9" fill="currentColor"/>'+
      '<rect x="9.2" y="8.6" width="1.9" height="1.9" fill="currentColor"/>'+
      '<rect x="4.8" y="11" width="1.9" height="1.9" fill="currentColor" opacity=".55"/>'+
      '<rect x="9.2" y="11" width="1.9" height="1.9" fill="currentColor" opacity=".55"/>'),
    /* 奖牌：老手 */
    medal:S('<path d="M4.6 1.6h2.2l1.2 4.2H4.8zM11.4 1.6h-2.2l-1.2 4.2h3.2z" fill="none" stroke="currentColor" stroke-width="1.2"/>'+
      '<circle cx="8" cy="10.2" r="3.8" fill="none" stroke="currentColor" stroke-width="1.4"/>'+
      '<circle cx="8" cy="10.2" r="1.6" fill="currentColor"/>'),
    /* 砖墙：满屏月巴 */
    brick:S('<rect x="2" y="3.2" width="12" height="9.6" fill="none" stroke="currentColor" stroke-width="1.4"/>'+
      '<path d="M2 6.4h12M2 9.6h12M5.8 3.2v3.2M10.2 3.2v3.2M4 6.4v3.2M8 6.4v3.2M12 6.4v3.2M5.8 9.6v3.2M10.2 9.6v3.2" fill="none" stroke="currentColor" stroke-width="1.1"/>'),
    /* 问号：隐藏成就 */
    help:S('<path d="M6.1 5.5a2 2 0 1 1 3.3 1.8c-.9.5-1.4 1.1-1.4 2.1" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="square"/>'+
      '<circle cx="8" cy="12.4" r="1.1" fill="currentColor"/>'),
    /* 锁：墨镜未解锁 */
    lock:S('<rect x="3.4" y="7" width="9.2" height="6.4" rx=".6" fill="none" stroke="currentColor" stroke-width="1.5"/>'+
      '<path d="M5.6 7V5.2a2.4 2.4 0 0 1 4.8 0V7" fill="none" stroke="currentColor" stroke-width="1.4"/>'+
      '<rect x="7.2" y="9.3" width="1.6" height="2.4" fill="currentColor"/>'),
    /* 对勾：已达成 */
    check:S('<path d="M3.2 8.4l3.4 3.4 6.2-7" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="square"/>')
  };

  /* ---------- 俄罗斯巴块主题：深蓝紫调，沿用霓虹单色线条并补方块专属图标 ---------- */
  var TETRIS_ICONS=Object.assign({},NEON_ICONS,{
    /* 叶子：第一次消行 */
    leaf:S('<path d="M4.2 12.2C4.6 8 7.6 4.2 13.2 2.8 12.4 7 9.4 10.6 4.2 12.2z" fill="none" stroke="currentColor" stroke-width="1.5"/>'+
      '<path d="M4.8 11.4C8 8.8 10.4 6.2 12.4 3.6" fill="none" stroke="currentColor" stroke-width="1.1"/>'),
    /* 麦穗：一次四消 */
    wheat:S('<path d="M8 14.4V4" fill="none" stroke="currentColor" stroke-width="1.2"/>'+
      '<ellipse cx="8" cy="3.2" rx="1.2" ry="1.8" fill="currentColor"/>'+
      '<ellipse cx="6.2" cy="5.9" rx="1.6" ry="1" transform="rotate(-32 6.2 5.9)" fill="currentColor"/>'+
      '<ellipse cx="9.8" cy="5.9" rx="1.6" ry="1" transform="rotate(32 9.8 5.9)" fill="currentColor"/>'+
      '<ellipse cx="6.2" cy="8.7" rx="1.6" ry="1" transform="rotate(-32 6.2 8.7)" fill="currentColor"/>'+
      '<ellipse cx="9.8" cy="8.7" rx="1.6" ry="1" transform="rotate(32 9.8 8.7)" fill="currentColor"/>'+
      '<ellipse cx="6.3" cy="11.5" rx="1.5" ry=".95" transform="rotate(-32 6.3 11.5)" fill="currentColor"/>'+
      '<ellipse cx="9.7" cy="11.5" rx="1.5" ry=".95" transform="rotate(32 9.7 11.5)" fill="currentColor"/>'),
    /* 闪光：完美消行 */
    sparkle:S('<path d="M7 2.2l1.3 3.5 3.5 1.3-3.5 1.3L7 11.8 5.7 8.3 2.2 7l3.5-1.3z" fill="currentColor"/>'+
      '<path d="M12.4 9.8l.6 1.6 1.6.6-1.6.6-.6 1.6-.6-1.6-1.6-.6 1.6-.6z" fill="currentColor" opacity=".75"/>'),
    /* 闪电：五连击 */
    bolt:S('<path d="M9.6 1.2L3.4 9h3.6L6 14.8l6.4-8.2h-3.7z" fill="currentColor"/>'),
    /* 阶梯：升到 5 级 */
    stairs:S('<path d="M2 14V10.6h3.2V8h3.2V5.4h3.2V2.6h2.4v11.4z" fill="none" stroke="currentColor" stroke-width="1.4"/>'),
    /* 旋转：缺口环形箭头 */
    rotate:S('<path d="M8 3.3A4.7 4.7 0 1 1 3.58 6.39" fill="none" stroke="currentColor" stroke-width="1.6"/>'+
      '<path d="M4.47 3.95L4.99 6.9 2.17 5.88z" fill="currentColor"/>'),
    /* 软降：向下箭头 */
    drop:S('<path d="M8 2.4v8.6M4.5 7.8L8 12.2l3.5-4.4" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="square"/>'),
    /* 硬降：箭头砸到底线 */
    harddrop:S('<path d="M8 1.6v7.6M4.8 5.4L8 9.4l3.2-4" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="square"/>'+
      '<path d="M2.4 12.6h11.2" stroke="currentColor" stroke-width="2"/>'),
    /* 王冠：15 级 */
    crown:S('<path d="M2.4 9.8V5.6l3.1 3.4L8 3.2l2.5 5.8 3.1-3.4v4.2z" fill="currentColor"/>'+
      '<rect x="1.8" y="11.2" width="12.4" height="1.6" fill="currentColor"/>'),
    /* 整排：累计百行 */
    rows:S('<rect x="2.4" y="3.2" width="11.2" height="2.4" fill="currentColor"/>'+
      '<rect x="2.4" y="6.8" width="11.2" height="2.4" fill="currentColor" opacity=".72"/>'+
      '<rect x="2.4" y="10.4" width="11.2" height="2.4" fill="currentColor" opacity=".5"/>'),
    /* 硬币：单局万点 */
    coin:S('<circle cx="8" cy="8" r="5.6" fill="none" stroke="currentColor" stroke-width="1.4"/>'+
      '<path d="M5.4 4.8L8 8.1l2.6-3.3" fill="none" stroke="currentColor" stroke-width="1.4" stroke-linecap="square"/>'+
      '<path d="M8 8.1v4.4" fill="none" stroke="currentColor" stroke-width="1.4"/>'+
      '<path d="M6.1 9.5h3.8M6.1 11.2h3.8" stroke="currentColor" stroke-width="1.2"/>'),
    /* 格子旗：单局百行 */
    flag:S('<path d="M4.2 14.4V2" fill="none" stroke="currentColor" stroke-width="1.5"/>'+
      '<path d="M4.2 2.4h9.2v5.4H4.2z" fill="none" stroke="currentColor" stroke-width="1.1"/>'+
      '<rect x="4.2" y="2.4" width="4.6" height="2.7" fill="currentColor"/>'+
      '<rect x="8.8" y="5.1" width="4.6" height="2.7" fill="currentColor"/>')
  });

  /* ---------- 首页主题：单色线条，跟随 currentColor，适配全部皮肤 ---------- */
  var INDEX_ICONS=Object.assign({},TETRIS_ICONS,{
    /* 月巴：长耳兔 */
    /* 兔子：沿用原版连笔轮廓，双耳尺寸左右镜像，脸上戴一副半框眼镜（上框 + 镜腿清晰，下缘只留一道细线） */
    rabbit:S('<path d="M5.1 1.9C4.2 2.6 4.1 4.6 4.6 6.1C3.2 6.9 2.7 8.9 3.5 10.8C4.1 12.3 5.9 13.6 8 13.6C10.1 13.6 11.9 12.3 12.5 10.8C13.3 8.9 12.8 6.9 11.4 6.1C11.9 4.6 11.8 2.6 10.9 1.9C10.4 1.5 9.8 1.6 9.3 2.2C8.6 3.1 8.5 4.8 9.1 6.2C8.7 6.35 7.3 6.35 6.9 6.2C7.5 4.8 7.4 3.1 6.7 2.2C6.2 1.6 5.6 1.5 5.1 1.9Z" fill="none" stroke="currentColor" stroke-width="1.3" stroke-linejoin="round"/>'+
      '<path d="M4.4 10.35V9c0-.35.25-.55.6-.55h1.55c.35 0 .6.2.6.55v1.35M11.6 10.35V9c0-.35-.25-.55-.6-.55H9.45c-.35 0-.6.2-.6.55v1.35M7.15 9.05c.4-.26 1.3-.26 1.7 0M4.4 9.15H3.65M11.6 9.15h.75" fill="none" stroke="currentColor" stroke-width="1.1" stroke-linecap="round" stroke-linejoin="round"/>'+
      '<path d="M4.4 10.35h2.75M8.85 10.35h2.75" fill="none" stroke="currentColor" stroke-width=".85" stroke-linecap="round"/>'),
    /* 熊玩偶：圆耳朵 + 圆头 + 口鼻 + 坐姿身体（商店「玩偶架」用） */
    teddy:S('<circle cx="5.55" cy="3.3" r="1.35" fill="none" stroke="currentColor" stroke-width="1.1"/>'+
      '<circle cx="10.45" cy="3.3" r="1.35" fill="none" stroke="currentColor" stroke-width="1.1"/>'+
      '<circle cx="5.55" cy="3.3" r=".42" fill="currentColor"/>'+
      '<circle cx="10.45" cy="3.3" r=".42" fill="currentColor"/>'+
      '<circle cx="8" cy="6.4" r="3.15" fill="none" stroke="currentColor" stroke-width="1.15"/>'+
      '<circle cx="6.7" cy="5.75" r=".55" fill="currentColor"/>'+
      '<circle cx="9.3" cy="5.75" r=".55" fill="currentColor"/>'+
      '<ellipse cx="8" cy="7.55" rx="1.35" ry=".95" fill="none" stroke="currentColor" stroke-width=".95"/>'+
      '<circle cx="8" cy="7.3" r=".45" fill="currentColor"/>'+
      '<path d="M8 9.4C6.4 9.4 5.2 10.7 5.2 12.4C5.2 13.6 5.8 14.3 6.6 14.3C7.2 14.3 7.5 13.9 8 13.9C8.5 13.9 8.8 14.3 9.4 14.3C10.2 14.3 10.8 13.6 10.8 12.4C10.8 10.7 9.6 9.4 8 9.4Z" fill="none" stroke="currentColor" stroke-width="1.15" stroke-linejoin="round"/>'),
    /* 番茄：圆润果实 + 三片萼 + 一道「捺」形刘海 */
    tomato:S('<path d="M8 5.15C9.7 4.75 11.3 5.6 12.2 7.2C13.3 9.1 12.7 11.9 10.8 13.5C9.7 14.4 6.3 14.4 5.2 13.5C3.3 11.9 2.7 9.1 3.8 7.2C4.7 5.6 6.3 4.75 8 5.15Z" fill="none" stroke="currentColor" stroke-width="1.35" stroke-linejoin="round"/>'+
      '<path d="M8 4.95C6.8 4.05 5.6 3.75 4.4 3.85M8 4.95C9.2 4.05 10.4 3.75 11.6 3.85M8 4.95V2.7" fill="none" stroke="currentColor" stroke-width="1.15" stroke-linecap="round"/>'+
      /* 刘海：起笔细、收笔粗，向右下弯的一捺 */
      '<path d="M4.9 6.6C5.9 6.05 7.2 6.35 8.9 7.15C8.55 7.7 7.95 7.75 7.3 7.3C6.4 6.95 5.6 6.75 4.9 6.6Z" fill="currentColor"/>'),
    /* 桃子：圆润果实 + 中间一道浅沟 + 斜插的叶子（与番茄区分：无三片萼、有果沟） */
    peach:S('<path d="M8 4.7C9.6 3.9 11.4 4.6 12.3 6.2C13.4 8.1 12.9 11 11 12.8C10 13.7 9 14.1 8 14.1C7 14.1 6 13.7 5 12.8C3.1 11 2.6 8.1 3.7 6.2C4.6 4.6 6.4 3.9 8 4.7Z" fill="none" stroke="currentColor" stroke-width="1.35" stroke-linejoin="round"/>'+
      '<path d="M8 5.3C7.6 7.2 7.6 10.6 8 13.4" fill="none" stroke="currentColor" stroke-width="1.05" stroke-linecap="round"/>'+
      '<path d="M8.2 4.6C9.2 3.2 10.6 2.6 12.1 2.9C11.9 4.3 10.9 5.3 9.4 5.6" fill="none" stroke="currentColor" stroke-width="1.15" stroke-linejoin="round"/>'),
    /* 樱桃：两颗果实 + 汇于一点的果梗 + 一片叶（与番茄区分：双果、梗细长） */
    cherry:S('<circle cx="5.3" cy="11" r="2.7" fill="none" stroke="currentColor" stroke-width="1.35"/>'+
      '<circle cx="11.2" cy="11.6" r="2.35" fill="none" stroke="currentColor" stroke-width="1.35"/>'+
      '<path d="M5.5 8.3C6.3 5.6 7.3 3.6 8.3 2.5M11.2 9.3C10.6 6.6 9.4 3.7 8.3 2.5" fill="none" stroke="currentColor" stroke-width="1.1" stroke-linecap="round"/>'+
      '<path d="M8.3 2.5C9.7 1.9 11.1 2.2 12 3.1C10.9 4 9.4 4 8.3 3.3Z" fill="none" stroke="currentColor" stroke-width="1.05" stroke-linejoin="round"/>'),
    /* 草莓：上宽下尖的果身 + 叶冠 + 三点果籽（与番茄区分：心形轮廓、带籽） */
    berry:S('<path d="M8 14C8 14 3.4 11 3.4 7.6C3.4 5.5 5.2 4.4 8 4.4C10.8 4.4 12.6 5.5 12.6 7.6C12.6 11 8 14 8 14Z" fill="none" stroke="currentColor" stroke-width="1.35" stroke-linejoin="round"/>'+
      '<path d="M6.2 4.8L4.9 3M8 4.5V2.3M9.8 4.8L11.1 3" fill="none" stroke="currentColor" stroke-width="1.1" stroke-linecap="round"/>'+
      '<circle cx="6.3" cy="8" r=".52" fill="currentColor"/>'+
      '<circle cx="9.7" cy="8" r=".52" fill="currentColor"/>'+
      '<circle cx="8" cy="10.4" r=".52" fill="currentColor"/>'),
    /* 苹果：顶部带凹口的果实 + 短梗 + 一片叶（与番茄区分：无三片萼、顶部下凹） */
    apple:S('<path d="M8 5.4C9.4 4.5 10.6 4.5 11.6 5.3C13 6.4 13.4 8.6 12.6 10.6C11.9 12.4 10.5 13.9 9.1 13.9C8.6 13.9 8.3 13.7 8 13.7C7.7 13.7 7.4 13.9 6.9 13.9C5.5 13.9 4.1 12.4 3.4 10.6C2.6 8.6 3 6.4 4.4 5.3C5.4 4.5 6.6 4.5 8 5.4Z" fill="none" stroke="currentColor" stroke-width="1.35" stroke-linejoin="round"/>'+
      '<path d="M8 5.2C8 4.2 8.2 3.2 8.8 2.4" fill="none" stroke="currentColor" stroke-width="1.15" stroke-linecap="round"/>'+
      '<path d="M8.8 2.6C9.7 1.7 11 1.6 12 2.1C11.6 3.3 10.4 3.9 9.2 3.6Z" fill="none" stroke="currentColor" stroke-width="1.05" stroke-linejoin="round"/>'),
    /* 番茄罐头：玻璃瓶身 + 瓶盖 + 瓶内两颗番茄 + 左侧玻璃高光（与碗区分：有瓶颈与瓶盖） */
    jar:S('<rect x="5.1" y="1.7" width="5.8" height="1.8" rx="0.5" fill="none" stroke="currentColor" stroke-width="1.2"/>'+
      '<path d="M4.5 5.4L5.55 3.5H10.45L11.5 5.4" fill="none" stroke="currentColor" stroke-width="1.25" stroke-linejoin="round" stroke-linecap="round"/>'+
      '<path d="M4.5 5.4h7v6.3c0 1.2-.95 2.1-2.1 2.1H6.6c-1.15 0-2.1-.9-2.1-2.1Z" fill="none" stroke="currentColor" stroke-width="1.3" stroke-linejoin="round"/>'+
      '<circle cx="6.55" cy="8.7" r="1.25" fill="none" stroke="currentColor" stroke-width="1.05"/>'+
      '<circle cx="9.45" cy="9.15" r="1.05" fill="none" stroke="currentColor" stroke-width="1.05"/>'+
      '<path d="M6.55 7.45v-.5M6.2 7.15l-.3-.28M6.9 7.15l.3-.28M9.45 8.1v-.45" fill="none" stroke="currentColor" stroke-width=".9" stroke-linecap="round"/>'+
      '<path d="M5.35 7.1v3.1" fill="none" stroke="currentColor" stroke-width=".85" stroke-linecap="round" opacity=".45"/>'),
    /* ===== 旅行特产：拆分重复映射用的独立图标（16×16 单色线条） ===== */
    /* 松果：竖向锥形果身 + 三道鳞片弧 */
    pinecone:S('<path d="M8 1.9c2.2 1.8 3.4 4.2 3.4 6.6 0 3.1-1.4 5.8-3.4 7.1-2-1.3-3.4-4-3.4-7.1 0-2.4 1.2-4.8 3.4-6.6Z" fill="none" stroke="currentColor" stroke-width="1.3" stroke-linejoin="round"/>'+
      '<path d="M5.5 5.9c1.7.6 3.3.6 5 0M5 8.4c2 .7 4 .7 6 0M5.4 10.9c1.7.5 3.4.5 5.1 0" fill="none" stroke="currentColor" stroke-width=".95" stroke-linecap="round"/>'),
    /* 雪松果：同锥形果身，改用雪点与顶部落雪线区分 */
    frostcone:S('<path d="M8 2.4c2.1 1.9 3.2 4.3 3.2 6.4 0 3-1.3 5.5-3.2 6.7-1.9-1.2-3.2-3.7-3.2-6.7 0-2.1 1.1-4.5 3.2-6.4Z" fill="none" stroke="currentColor" stroke-width="1.3" stroke-linejoin="round"/>'+
      '<path d="M5.4 5.2c1.7.8 3.5.8 5.2 0" fill="none" stroke="currentColor" stroke-width="1.1" stroke-linecap="round"/>'+
      '<circle cx="6.5" cy="8" r=".5" fill="currentColor"/><circle cx="9.3" cy="7.5" r=".5" fill="currentColor"/><circle cx="8" cy="10.3" r=".5" fill="currentColor"/>'),
    /* 幻梦露：水滴 + 内部四角星 */
    dreamdrop:S('<path d="M8 1.9c2.3 2.5 4.1 4.8 4.1 7.1A4.1 4.1 0 0 1 3.9 9C3.9 6.7 5.7 4.4 8 1.9Z" fill="none" stroke="currentColor" stroke-width="1.3" stroke-linejoin="round"/>'+
      '<path d="M7 5.2l.5 1.5 1.5.5-1.5.5L7 9.2l-.5-1.5L5 7.2l1.5-.5z" fill="currentColor" opacity=".6"/>'),
    /* 青苔团：三峰苔团 + 苔点 */
    moss:S('<path d="M2.8 11.9c0-1.4 1-2.4 2.2-2.4.2-1.4 1.3-2.4 2.8-2.4 1.6 0 2.8 1.1 3 2.6 1.2.1 2.2 1.1 2.2 2.4 0 .9-.7 1.5-1.6 1.5H4.4c-.9 0-1.6-.6-1.6-1.7Z" fill="none" stroke="currentColor" stroke-width="1.25" stroke-linejoin="round"/>'+
      '<circle cx="5.5" cy="11.6" r=".45" fill="currentColor"/><circle cx="8" cy="10.8" r=".45" fill="currentColor"/><circle cx="10.4" cy="11.7" r=".45" fill="currentColor"/>'),
    /* 月桂枝：斜向枝条 + 两侧叶片 */
    laurel:S('<path d="M4.4 13.4C4.2 9.9 6 6.2 9.6 3.2" fill="none" stroke="currentColor" stroke-width="1.15" stroke-linecap="round"/>'+
      '<path d="M5.3 10.9C3.9 10.7 3 9.9 2.6 8.7c1.4-.2 2.5.3 3.2 1.4Z" fill="none" stroke="currentColor" stroke-width="1.05" stroke-linejoin="round"/>'+
      '<path d="M6.1 8.6C5.4 7.4 5.4 6.3 6.1 5.2c1.2.6 1.8 1.6 1.6 2.9Z" fill="none" stroke="currentColor" stroke-width="1.05" stroke-linejoin="round"/>'+
      '<path d="M7.7 6.2C7.3 4.9 7.5 3.8 8.3 2.8c1 .8 1.4 1.9 1.1 3.1Z" fill="none" stroke="currentColor" stroke-width="1.05" stroke-linejoin="round"/>'+
      '<path d="M10.2 5.2c.7-1.1 1.7-1.6 3-1.5-.1 1.3-.9 2.2-2.3 2.5Z" fill="none" stroke="currentColor" stroke-width="1.05" stroke-linejoin="round"/>'+
      '<path d="M10.6 8.2c1-1 2.1-1.3 3.3-.9-.4 1.3-1.4 2-2.8 2Z" fill="none" stroke="currentColor" stroke-width="1.05" stroke-linejoin="round"/>'),
    /* 海藻：两条波浪藻叶 + 海底线 */
    seaweed:S('<path d="M5.6 13.8C4.6 11.7 4.8 9.6 6 7.5c.9-1.6.8-3.2 0-4.9" fill="none" stroke="currentColor" stroke-width="1.25" stroke-linecap="round"/>'+
      '<path d="M10 13.8c1-2.1.8-4.2-.4-6.3-.9-1.6-.8-3.2 0-4.9" fill="none" stroke="currentColor" stroke-width="1.25" stroke-linecap="round"/>'+
      '<path d="M5.9 10.3C4.6 10.2 3.7 9.6 3.1 8.5c1.2-.4 2.3 0 3.1 1M10 8.6c1.3-.2 2.3-.8 2.9-1.9-1.3-.3-2.4.2-3.1 1.2" fill="none" stroke="currentColor" stroke-width="1" stroke-linecap="round"/>'+
      '<path d="M3.8 14h8.4" fill="none" stroke="currentColor" stroke-width="1.1" stroke-linecap="round"/>'),
    /* 冰羽：菱形羽片 + 折断感羽枝 + 冰点 */
    icefeather:S('<path d="M12.2 2.6C12.9 7 10 11.4 5.3 12.6L3 12.1C4.1 7.4 7.7 3.7 12.2 2.6Z" fill="none" stroke="currentColor" stroke-width="1.25" stroke-linejoin="round"/>'+
      '<path d="M11.6 3.3L3.3 12.4" fill="none" stroke="currentColor" stroke-width="1.1" stroke-linecap="round"/>'+
      '<path d="M9.8 4.4L8.6 2.9M9.4 6.2L7.6 4.5M8.4 8L6.3 6.3M7 9.9L4.8 8.2" fill="none" stroke="currentColor" stroke-width=".9" stroke-linecap="round"/>'+
      '<circle cx="12.1" cy="5" r=".5" fill="currentColor" opacity=".7"/>'),
    /* 萤石：六棱宝石 + 外侧辉光 */
    glowgem:S('<path d="M8 2.6l4 2.4v6l-4 2.4-4-2.4v-6z" fill="none" stroke="currentColor" stroke-width="1.3" stroke-linejoin="round"/>'+
      '<path d="M8 2.6v10.8M4 5l4 2.6L12 5" fill="none" stroke="currentColor" stroke-width=".95" opacity=".7"/>'+
      '<path d="M8 1.1v1.1M1.3 8h1.1M13.6 8h1.1M3.1 3.1l.8.8M12.1 3.1l-.8.8" fill="none" stroke="currentColor" stroke-width=".85" stroke-linecap="round" opacity=".65"/>'),
    /* 深海珠：圆珠 + 水线 + 气泡 */
    deeporb:S('<circle cx="8" cy="8.4" r="4.7" fill="none" stroke="currentColor" stroke-width="1.3"/>'+
      '<path d="M4.6 10.5c1.8 1 4.2.9 6.4-.4" fill="none" stroke="currentColor" stroke-width="1" opacity=".6"/>'+
      '<circle cx="6.4" cy="6.6" r=".55" fill="currentColor"/>'+
      '<circle cx="10.4" cy="5.3" r=".95" fill="none" stroke="currentColor" stroke-width=".85"/>'+
      '<circle cx="11.6" cy="7.2" r=".45" fill="none" stroke="currentColor" stroke-width=".8"/>'),
    /* 湖心石：扁圆石 + 两圈水纹 */
    lakestone:S('<path d="M8 3.6c2.8 0 4.9 1.8 4.9 4.3 0 2.6-2.1 4.5-4.9 4.5S3.1 10.5 3.1 7.9c0-2.5 2.1-4.3 4.9-4.3Z" fill="none" stroke="currentColor" stroke-width="1.3"/>'+
      '<path d="M2 10.9c1.5 1.7 3.6 2.6 6 2.6s4.5-.9 6-2.6" fill="none" stroke="currentColor" stroke-width="1" stroke-linecap="round" opacity=".6"/>'+
      '<path d="M3.7 13.2c1.2.9 2.6 1.4 4.3 1.4s3.1-.5 4.3-1.4" fill="none" stroke="currentColor" stroke-width=".9" stroke-linecap="round" opacity=".35"/>'+
      '<path d="M6.3 7.7c1.1-.5 2.3-.5 3.4 0" fill="none" stroke="currentColor" stroke-width=".9" stroke-linecap="round" opacity=".7"/>'),
    /* 明信片：横版卡片 + 右上邮票 + 书写线 */
    postcard:S('<rect x="2.2" y="4.1" width="11.6" height="8.4" rx="1" fill="none" stroke="currentColor" stroke-width="1.3"/>'+
      '<rect x="9.9" y="5.5" width="2.6" height="2.6" rx=".3" fill="none" stroke="currentColor" stroke-width=".9"/>'+
      '<path d="M4.2 6.4h4.2M4.2 8.3h4.2M4.2 10.2h3" fill="none" stroke="currentColor" stroke-width=".95" stroke-linecap="round"/>'+
      '<path d="M10.1 5.7l2.2 2.2M12.3 5.7l-2.2 2.2" fill="none" stroke="currentColor" stroke-width=".6" opacity=".5"/>'),
    /* 星屑糖：星形糖块 + 糖屑 */
    starcandy:S('<path d="M8 2.3l1.7 3.6 3.9.5-2.9 2.7.8 3.9L8 11l-3.5 2 .8-3.9-2.9-2.7 3.9-.5z" fill="none" stroke="currentColor" stroke-width="1.25" stroke-linejoin="round"/>'+
      '<circle cx="8" cy="7.6" r=".55" fill="currentColor"/>'+
      '<circle cx="2.5" cy="11.4" r=".42" fill="currentColor"/><circle cx="13.5" cy="11.9" r=".42" fill="currentColor"/><circle cx="12.1" cy="2.4" r=".38" fill="currentColor"/>'),
    /* 糖果：椭圆糖体 + 两端拧结 */
    candy:S('<ellipse cx="8" cy="8" rx="2.9" ry="2.6" fill="none" stroke="currentColor" stroke-width="1.3"/>'+
      '<path d="M5.1 8L2.3 5.7v4.6L5.1 8Z" fill="none" stroke="currentColor" stroke-width="1.2" stroke-linejoin="round"/>'+
      '<path d="M10.9 8l2.8-2.3v4.6L10.9 8Z" fill="none" stroke="currentColor" stroke-width="1.2" stroke-linejoin="round"/>'+
      '<path d="M6.6 6.5c.9.45 1.9.45 2.8 0M6.6 9.5c.9-.45 1.9-.45 2.8 0" fill="none" stroke="currentColor" stroke-width=".9" stroke-linecap="round" opacity=".7"/>'),
    /* 手作糖：螺旋糖球 + 糖棍 */
    lollipop:S('<circle cx="6.9" cy="6.9" r="3.7" fill="none" stroke="currentColor" stroke-width="1.3"/>'+
      '<path d="M6.6 4.2a2.8 2.8 0 1 0 2.9 2.7 1.7 1.7 0 0 0-2.6-1.5" fill="none" stroke="currentColor" stroke-width="1" stroke-linecap="round"/>'+
      '<path d="M9.5 9.6l3.3 3.3" fill="none" stroke="currentColor" stroke-width="1.35" stroke-linecap="round"/>'),
    /* 龙鳞：单枚鳞片 + 三道鳞纹（与蛇区分：无蛇身） */
    scale:S('<path d="M8 2.3c2.7 1.4 4.3 3.6 4.3 6.1 0 2.6-1.8 4.8-4.3 5.9-2.5-1.1-4.3-3.3-4.3-5.9 0-2.5 1.6-4.7 4.3-6.1Z" fill="none" stroke="currentColor" stroke-width="1.3" stroke-linejoin="round"/>'+
      '<path d="M4.2 7.6c1.3.55 2.5.55 3.8 0s2.5-.55 3.8 0M4.5 10c1.2.45 2.3.45 3.5 0s2.3-.45 3.5 0" fill="none" stroke="currentColor" stroke-width=".95" stroke-linecap="round"/>'+
      '<path d="M8 2.6v11.4" fill="none" stroke="currentColor" stroke-width=".8" opacity=".4"/>'),
    /* 无月之尘：弯月 + 尘点 */
    moondust:S('<path d="M10.8 2.7a5.4 5.4 0 1 0 0 10.6 6 6 0 0 1 0-10.6Z" fill="none" stroke="currentColor" stroke-width="1.3" stroke-linejoin="round"/>'+
      '<circle cx="4.1" cy="4.6" r=".5" fill="currentColor"/><circle cx="2.8" cy="8.6" r=".42" fill="currentColor"/><circle cx="5.2" cy="12.3" r=".45" fill="currentColor"/>'+
      '<circle cx="9.6" cy="13" r=".4" fill="currentColor" opacity=".6"/>'),
    /* 极光尘：三条弧状极光带 + 尘点 */
    aurora:S('<path d="M2.1 9.8C4.2 5.9 7.2 3.7 10.8 3.2" fill="none" stroke="currentColor" stroke-width="1.35" stroke-linecap="round"/>'+
      '<path d="M3.3 12.4C5.4 8.7 8.2 6.5 11.7 6" fill="none" stroke="currentColor" stroke-width="1.1" stroke-linecap="round" opacity=".7"/>'+
      '<path d="M6.1 13.9c1.5-2.6 3.6-4.2 6.2-4.9" fill="none" stroke="currentColor" stroke-width=".95" stroke-linecap="round" opacity=".45"/>'+
      '<circle cx="4.6" cy="5.4" r=".4" fill="currentColor" opacity=".6"/><circle cx="8.1" cy="10.9" r=".4" fill="currentColor" opacity=".6"/>'),
    /* 潮汐沙：浪线 + 沙粒 */
    tidesand:S('<path d="M2 8.9c1.2-1 2.4-1 3.6 0s2.4 1 3.6 0 2.4-1 3.6 0" fill="none" stroke="currentColor" stroke-width="1.3" stroke-linecap="round"/>'+
      '<path d="M4.1 13.5h7.8" fill="none" stroke="currentColor" stroke-width="1.2" stroke-linecap="round"/>'+
      '<circle cx="6.3" cy="11.6" r=".45" fill="currentColor"/><circle cx="8.4" cy="10.8" r=".38" fill="currentColor"/><circle cx="10" cy="11.9" r=".42" fill="currentColor"/>'),
    /* 沙漏：上下框 + 双锥玻璃 + 落沙 */
    hourglass:S('<path d="M4.1 2.1h7.8M4.1 13.9h7.8" fill="none" stroke="currentColor" stroke-width="1.3" stroke-linecap="round"/>'+
      '<path d="M5 2.3c0 2.5 1.3 4.4 3 5.7-1.7 1.3-3 3.2-3 5.7M11 2.3c0 2.5-1.3 4.4-3 5.7 1.7 1.3 3 3.2 3 5.7" fill="none" stroke="currentColor" stroke-width="1.2" stroke-linecap="round"/>'+
      '<path d="M6.9 12.4c.8-.5 1.4-.5 2.2 0" fill="currentColor" stroke="none" opacity=".5"/>'),
    /* 阵眼碎片：带棱碎片 + 核心点 */
    shard:S('<path d="M8.7 2.1l4.2 4.7-3 7.1-4.8-1.5-1.6-5.7z" fill="none" stroke="currentColor" stroke-width="1.25" stroke-linejoin="round"/>'+
      '<path d="M8.7 2.1L7.5 7.9l4.6 6M7.5 7.9l-3.9.4" fill="none" stroke="currentColor" stroke-width=".95" stroke-linecap="round" opacity=".6"/>'+
      '<circle cx="7.5" cy="7.9" r=".65" fill="currentColor"/>'),
    /* 古神符：竖纸条 + 顶部缺口 + 符文 */
    talisman:S('<path d="M5.3 2.7h5.4v11.1l-2.7-1.7-2.7 1.7z" fill="none" stroke="currentColor" stroke-width="1.3" stroke-linejoin="round"/>'+
      '<path d="M6.8 2.7L8 1.5l1.2 1.2" fill="none" stroke="currentColor" stroke-width="1.1" stroke-linejoin="round"/>'+
      '<path d="M7 5.2h2M6.6 7h2.8M8 8.8v2.4M6.7 9.7h2.6" fill="none" stroke="currentColor" stroke-width=".9" stroke-linecap="round"/>'),
    /* 星图残卷：摊开的图纸 + 星座连线 */
    starmap:S('<path d="M3.6 2.9h8.8v10.2H3.6z" fill="none" stroke="currentColor" stroke-width="1.3" stroke-linejoin="round"/>'+
      '<path d="M5.4 5.4l1.2 2.6 2.5-1.2 2.7 2.6" fill="none" stroke="currentColor" stroke-width=".85" opacity=".55"/>'+
      '<circle cx="5.4" cy="5.4" r=".55" fill="currentColor"/><circle cx="6.6" cy="8" r=".5" fill="currentColor"/><circle cx="9.1" cy="6.8" r=".55" fill="currentColor"/><circle cx="11.8" cy="9.4" r=".5" fill="currentColor"/>'+
      '<path d="M3.6 4.1h-1M13.4 11.9h-1" fill="none" stroke="currentColor" stroke-width="1" stroke-linecap="round" opacity=".6"/>'),
    /* 诅咒石：裂纹石块 + 咒点 */
    cursedstone:S('<path d="M5.4 3.4l4.3-.8 3.1 3.6-.5 4.6-4.4 2.1-3.8-2.8-.6-4.3z" fill="none" stroke="currentColor" stroke-width="1.25" stroke-linejoin="round"/>'+
      '<path d="M7.9 4.8L6.9 7.4l1.9 1.1-1.2 2.5" fill="none" stroke="currentColor" stroke-width="1.05" stroke-linecap="round" stroke-linejoin="round"/>'+
      '<circle cx="6.4" cy="6.1" r=".4" fill="currentColor"/>'),
    /* 珊瑚碑：圆顶石碑 + 右上珊瑚枝 */
    coralstele:S('<path d="M5.3 13.5V6.1c0-1.8 1.1-3.1 2.6-3.1s2.6 1.3 2.6 3.1v7.4" fill="none" stroke="currentColor" stroke-width="1.3" stroke-linejoin="round"/>'+
      '<path d="M4.3 13.5h7.4" fill="none" stroke="currentColor" stroke-width="1.2" stroke-linecap="round"/>'+
      '<path d="M10.3 6.2c1.2-.5 1.9-1.4 2-2.7M10.3 8.2c1.3.1 2.3-.4 3-1.5M10.3 6.2c.4-.9.3-1.8-.2-2.6" fill="none" stroke="currentColor" stroke-width="1" stroke-linecap="round"/>'+
      '<path d="M6.8 8h2.4" fill="none" stroke="currentColor" stroke-width=".85" stroke-linecap="round" opacity=".45"/>'),
    /* 冰裂纹石：石块 + 贯通折线裂纹 */
    crackedstone:S('<path d="M3.3 10.7l1.1-4.5 3-1.9 4.6 1.3 1 4-2.5 2.9H5.9z" fill="none" stroke="currentColor" stroke-width="1.25" stroke-linejoin="round"/>'+
      '<path d="M8.4 4.5L7.1 7.5l2 1.4-1.2 3.1" fill="none" stroke="currentColor" stroke-width="1.05" stroke-linecap="round" stroke-linejoin="round"/>'+
      '<path d="M4.4 10.9c1.7.55 3.5.55 5.2 0" fill="none" stroke="currentColor" stroke-width=".8" opacity=".4"/>'),
    /* 灰烬：灰堆 + 两缕余烟 */
    ash:S('<path d="M3.1 12.9c.7-2 2.6-3.3 4.9-3.3s4.2 1.3 4.9 3.3z" fill="none" stroke="currentColor" stroke-width="1.3" stroke-linejoin="round"/>'+
      '<path d="M6.4 8.5c-1-1.2-.7-2.4.3-3.4M9.6 8.5c1-1.2.7-2.4-.3-3.4" fill="none" stroke="currentColor" stroke-width="1" stroke-linecap="round" opacity=".65"/>'+
      '<circle cx="6.6" cy="12" r=".35" fill="currentColor" opacity=".55"/><circle cx="9.4" cy="12.1" r=".35" fill="currentColor" opacity=".55"/>'),
    /* 清醒之种：斜置种子 + 顶端嫩芽 */
    seed:S('<ellipse cx="8" cy="8.6" rx="3" ry="4.1" transform="rotate(-20 8 8.6)" fill="none" stroke="currentColor" stroke-width="1.3"/>'+
      '<path d="M8.6 4.6C9.4 3.7 10.4 3.4 11.5 3.6c-.2 1.1-.8 1.8-1.9 2.1" fill="none" stroke="currentColor" stroke-width="1.05" stroke-linejoin="round"/>'+
      '<circle cx="7.1" cy="9.6" r=".5" fill="currentColor" opacity=".7"/>'),
    /* 海贝：扇形贝壳 + 放射肋 */
    seashell:S('<path d="M8 13.8C4.5 12.6 2.4 10 2.4 7.1 2.4 4.8 4.9 3 8 3s5.6 1.8 5.6 4.1c0 2.9-2.1 5.5-5.6 6.7Z" fill="none" stroke="currentColor" stroke-width="1.3" stroke-linejoin="round"/>'+
      '<path d="M8 13.4V4.2M5.6 12.5l1-8M10.4 12.5l-1-8M3.3 9.4l4-4.2M12.7 9.4l-4-4.2" fill="none" stroke="currentColor" stroke-width=".85" stroke-linecap="round" opacity=".6"/>'),
    /* 鲸歌螺：螺旋螺壳 + 螺尾 */
    conch:S('<path d="M12.9 8.6c0 2.6-2.2 4.8-4.9 4.8S3.1 11.2 3.1 8.6c0-2.2 1.8-4 4-4 1.8 0 3.2 1.4 3.2 3.1 0 1.4-1.1 2.5-2.5 2.5-1 0-1.8-.8-1.8-1.8 0-.7.5-1.2 1.2-1.4" fill="none" stroke="currentColor" stroke-width="1.25" stroke-linecap="round"/>'+
      '<path d="M12.9 8.6c.4-1.7 0-3.3-1.1-4.7" fill="none" stroke="currentColor" stroke-width="1" stroke-linecap="round" opacity=".6"/>'),
    /* 岛民陶偶：圆头人偶 + 裙身 + 双臂 */
    idol:S('<circle cx="8" cy="4.6" r="2.1" fill="none" stroke="currentColor" stroke-width="1.25"/>'+
      '<circle cx="7.2" cy="4.4" r=".32" fill="currentColor"/><circle cx="8.8" cy="4.4" r=".32" fill="currentColor"/>'+
      '<path d="M4.7 13.5c0-2.5 1.4-4.3 3.3-4.3s3.3 1.8 3.3 4.3z" fill="none" stroke="currentColor" stroke-width="1.25" stroke-linejoin="round"/>'+
      '<path d="M5.5 9.9L4 11.6M10.5 9.9L12 11.6" fill="none" stroke="currentColor" stroke-width="1.05" stroke-linecap="round"/>'),
    /* 无字诗碑：圆顶空白碑 + 底座 */
    stele:S('<path d="M5.2 13.5V6.4c0-2 1.2-3.5 2.8-3.5s2.8 1.5 2.8 3.5v7.1" fill="none" stroke="currentColor" stroke-width="1.3" stroke-linejoin="round"/>'+
      '<path d="M3.9 13.5h8.2" fill="none" stroke="currentColor" stroke-width="1.2" stroke-linecap="round"/>'+
      '<path d="M6.4 6.6c.9 1.1 2.3 1.1 3.2 0" fill="none" stroke="currentColor" stroke-width="1" stroke-linecap="round" opacity=".35"/>'),
    /* 海心灯：水波灯座 + 火焰 + 波光 */
    sealamp:S('<path d="M4.5 12.5h7l-1-3.3H5.5z" fill="none" stroke="currentColor" stroke-width="1.25" stroke-linejoin="round"/>'+
      '<path d="M8 9.1c1.3 0 2.3-1 2.3-2.2C10.3 5.4 8 4.6 8 2.9 8 4.6 5.7 5.4 5.7 6.9c0 1.2 1 2.2 2.3 2.2Z" fill="none" stroke="currentColor" stroke-width="1.2" stroke-linejoin="round"/>'+
      '<path d="M2.6 8.2c1.3 1.5 3.2 2.4 5.4 2.4s4.1-.9 5.4-2.4" fill="none" stroke="currentColor" stroke-width=".9" stroke-linecap="round" opacity=".5"/>'),
    /* 夜市灯：悬挂灯笼 + 提梁 + 流苏 */
    nightlantern:S('<path d="M8 1.3v1.1" fill="none" stroke="currentColor" stroke-width="1.1" stroke-linecap="round"/>'+
      '<path d="M5.9 2.4h4.2" fill="none" stroke="currentColor" stroke-width="1.2" stroke-linecap="round"/>'+
      '<path d="M5 4h6l.9 5.2H4.1z" fill="none" stroke="currentColor" stroke-width="1.25" stroke-linejoin="round"/>'+
      '<path d="M8 9.2v2.6M7.1 13.3h1.8" fill="none" stroke="currentColor" stroke-width="1.1" stroke-linecap="round"/>'+
      '<path d="M6.6 5.6v2.9M8 5.6v2.9M9.4 5.6v2.9" fill="none" stroke="currentColor" stroke-width=".7" opacity=".4"/>'),
    /* 王城钥：环形钥柄内嵌王冠 + 长齿钥杆 */
    royalkey:S('<circle cx="5.4" cy="8" r="2.7" fill="none" stroke="currentColor" stroke-width="1.3"/>'+
      '<path d="M4.2 8.3l.7-2 1.1 1.1 1.1-1.1.7 2z" fill="currentColor" opacity=".5"/>'+
      '<path d="M8.1 8h5.6M11.1 8v2M13.2 8v1.5" fill="none" stroke="currentColor" stroke-width="1.3" stroke-linecap="round"/>'),
    /* 熄灭的灯芯：短蜡烛 + 无焰灯芯 + 余烟 */
    deadwick:S('<path d="M5.5 13.4h5V8.6c0-.7-.5-1.2-1.1-1.2H6.6c-.6 0-1.1.5-1.1 1.2z" fill="none" stroke="currentColor" stroke-width="1.25" stroke-linejoin="round"/>'+
      '<path d="M8 7.4V5.8" fill="none" stroke="currentColor" stroke-width="1.2" stroke-linecap="round"/>'+
      '<path d="M8 5.5c-1.1-.8-.7-1.9.3-2.5M9.5 4.4c.8-.7.6-1.5.1-2.1" fill="none" stroke="currentColor" stroke-width=".9" stroke-linecap="round" opacity=".65"/>'),
    /* 蓝冰：冰块 + 水面线 + 内裂面 */
    blueice:S('<path d="M4 12.6l1-5.2 3-3 3.4 3.2.6 5z" fill="none" stroke="currentColor" stroke-width="1.3" stroke-linejoin="round"/>'+
      '<path d="M5 7.4l3.2 1.9 4.8-1.9M8.2 9.3v3.3M2.2 12.9h11.6" fill="none" stroke="currentColor" stroke-width=".95" stroke-linecap="round" opacity=".6"/>'+
      '<path d="M6.2 5.2l1.2 2.1" fill="none" stroke="currentColor" stroke-width=".8" stroke-linecap="round" opacity=".45"/>'),
    /* 野果：三颗浆果 + 双叶 */
    wildberry:S('<circle cx="5.8" cy="9.6" r="2.3" fill="none" stroke="currentColor" stroke-width="1.2"/>'+
      '<circle cx="10" cy="9.2" r="2" fill="none" stroke="currentColor" stroke-width="1.2"/>'+
      '<circle cx="8" cy="12" r="1.9" fill="none" stroke="currentColor" stroke-width="1.2"/>'+
      '<path d="M8 7.3V4.6M8 4.8C6.4 4.6 5.4 3.8 5.1 2.6c1.5-.1 2.6.6 3 2.2Zm0 0c1.6-.2 2.6-1 2.9-2.2-1.5-.1-2.6.6-3 2.2Z" fill="none" stroke="currentColor" stroke-width="1.05" stroke-linecap="round" stroke-linejoin="round"/>'),
    /* 海盐：盐罐 + 撒出的盐粒 */
    salt:S('<path d="M6.1 13.3V6.4c0-1.3 1-2.3 2.3-2.3h.4c1.3 0 2.3 1 2.3 2.3v6.9z" fill="none" stroke="currentColor" stroke-width="1.25" stroke-linejoin="round"/>'+
      '<path d="M6.1 6.5h5.1M6.1 9.4h5.1" fill="none" stroke="currentColor" stroke-width=".85" opacity=".5"/>'+
      '<path d="M8.6 4.2V2.9M7.2 3.6l-.7-.9M10 3.6l.7-.9" fill="none" stroke="currentColor" stroke-width=".95" stroke-linecap="round" opacity=".7"/>'+
      '<path d="M3.4 13.4h9.2" fill="none" stroke="currentColor" stroke-width="1.1" stroke-linecap="round"/>'),
    /* 人鱼泡沫：大小气泡 */
    foam:S('<circle cx="5.2" cy="9.2" r="2.5" fill="none" stroke="currentColor" stroke-width="1.2"/>'+
      '<circle cx="9.9" cy="7.4" r="1.9" fill="none" stroke="currentColor" stroke-width="1.15"/>'+
      '<circle cx="10.3" cy="11.4" r="1.4" fill="none" stroke="currentColor" stroke-width="1.1"/>'+
      '<path d="M3.6 4.8c.4-1.1 1.3-1.9 2.4-2.1" fill="none" stroke="currentColor" stroke-width=".9" stroke-linecap="round" opacity=".6"/>'),
    /* 蜂蜜：蜜罐 + 罐身蜜纹 */
    honey:S('<path d="M5.1 5.4h5.8l-.8 8H5.9z" fill="none" stroke="currentColor" stroke-width="1.25" stroke-linejoin="round"/>'+
      '<path d="M4.5 5.4h7" fill="none" stroke="currentColor" stroke-width="1.3" stroke-linecap="round"/>'+
      '<path d="M6.5 8.3c.9-.7 2.1-.7 3 0 .6.5.6 1.4 0 1.9-.9.7-2.1.7-3 0-.6-.5-.6-1.4 0-1.9Z" fill="currentColor" opacity=".4"/>'+
      '<path d="M8 3.3V2.1" fill="none" stroke="currentColor" stroke-width="1.05" stroke-linecap="round"/>'+
      '<circle cx="8" cy="1.8" r=".7" fill="currentColor"/>'),
    /* 星砂瓶：小瓶 + 星砂 */
    starbottle:S('<path d="M7.1 2.3h1.8v1.9l1.5 2v6.4c0 .6-.5 1.1-1.1 1.1H6.7c-.6 0-1.1-.5-1.1-1.1V6.2l1.5-2z" fill="none" stroke="currentColor" stroke-width="1.2" stroke-linejoin="round"/>'+
      '<path d="M7.1 2.3h1.8" fill="none" stroke="currentColor" stroke-width="1.3" stroke-linecap="round"/>'+
      '<path d="M7.1 11.7h3.9" fill="none" stroke="currentColor" stroke-width=".9" opacity=".5"/>'+
      '<path d="M8 7.4l.5 1.1 1.1.2-.8.8.2 1.1-1-.6-1 .6.2-1.1-.8-.8 1.1-.2z" fill="currentColor"/>'+
      '<circle cx="6.9" cy="10" r=".35" fill="currentColor" opacity=".6"/><circle cx="9.3" cy="10.4" r=".3" fill="currentColor" opacity=".6"/>'),
    /* 桂花糕：切块方糕 + 桂花点 */
    cake:S('<path d="M4.2 12.6l1.1-6.5h5.4l1.1 6.5z" fill="none" stroke="currentColor" stroke-width="1.25" stroke-linejoin="round"/>'+
      '<path d="M4.9 9.3h6.2" fill="none" stroke="currentColor" stroke-width="1" opacity=".55"/>'+
      '<circle cx="6.8" cy="7" r=".5" fill="currentColor"/><circle cx="9.2" cy="6.7" r=".45" fill="currentColor"/><circle cx="8" cy="8" r=".4" fill="currentColor"/>'+
      '<path d="M3.4 13.1h9.2" fill="none" stroke="currentColor" stroke-width="1.05" stroke-linecap="round" opacity=".55"/>'),
    /* 陶片：带裂纹的陶罐 */
    pottery:S('<path d="M5.3 4.2h5.4l-.5 7.5c-.1.8-.8 1.5-1.6 1.5H7.4c-.8 0-1.5-.7-1.6-1.5z" fill="none" stroke="currentColor" stroke-width="1.25" stroke-linejoin="round"/>'+
      '<path d="M4.7 4.2h6.6" fill="none" stroke="currentColor" stroke-width="1.3" stroke-linecap="round"/>'+
      '<path d="M8.1 4.5l-1 2 1.5 1.5-1.1 2.1 1.2 1.7" fill="none" stroke="currentColor" stroke-width=".9" stroke-linecap="round" opacity=".6"/>'),
    /* 橡子：果帽 + 果身 */
    acorn:S('<path d="M4.6 6.5C4.6 4.5 6.1 3 8 3s3.4 1.5 3.4 3.5z" fill="currentColor" opacity=".35"/>'+
      '<path d="M4.6 6.5C4.6 4.5 6.1 3 8 3s3.4 1.5 3.4 3.5" fill="none" stroke="currentColor" stroke-width="1.25" stroke-linejoin="round"/>'+
      '<path d="M8 3V1.9" fill="none" stroke="currentColor" stroke-width="1.1" stroke-linecap="round"/>'+
      '<path d="M5 7.1h6c0 3.2-1.2 5.4-3 6.7-1.8-1.3-3-3.5-3-6.7Z" fill="none" stroke="currentColor" stroke-width="1.25" stroke-linejoin="round"/>'+
      '<path d="M8 8.2v5" fill="none" stroke="currentColor" stroke-width=".75" opacity=".4"/>'),
    /* 幸运签：签纸 + 签文 */
    omikuji:S('<path d="M6.1 2.3h3.8v1.9l-1 .9v8c0 .4-.3.7-.7.7H7.8c-.4 0-.7-.3-.7-.7v-8l-1-.9z" fill="none" stroke="currentColor" stroke-width="1.2" stroke-linejoin="round"/>'+
      '<path d="M5.5 4.1h5" fill="none" stroke="currentColor" stroke-width="1" opacity=".55"/>'+
      '<path d="M7.4 7.1h1.2M7.4 9h1.2M7.4 10.9h1" fill="none" stroke="currentColor" stroke-width=".85" stroke-linecap="round" opacity=".6"/>'),
    /* 阴影碎片：半实心棱片 */
    shadowshard:S('<path d="M9.7 2.4l3.3 3.1-1.6 7.5-4.1 1.1-2.4-2.2 1.4-6.3z" fill="currentColor" opacity=".25"/>'+
      '<path d="M9.7 2.4l3.3 3.1-1.6 7.5-4.1 1.1-2.4-2.2 1.4-6.3z" fill="none" stroke="currentColor" stroke-width="1.2" stroke-linejoin="round"/>'+
      '<path d="M9.7 2.4L8.5 7.2l2.9.6M8.5 7.2l-1.1 4.4" fill="none" stroke="currentColor" stroke-width=".85" stroke-linecap="round" opacity=".6"/>'),
    /* 琥珀心：琥珀块 + 内嵌星芒 */
    amber:S('<path d="M8 2.1c1.9 0 3.6 1.2 4.3 3 .7 1.9.2 4-1.3 5.3L8 13.6l-3-3.2C3.5 9.1 3 7 3.7 5.1 4.4 3.3 6.1 2.1 8 2.1Z" fill="none" stroke="currentColor" stroke-width="1.25" stroke-linejoin="round"/>'+
      '<path d="M8 5.2l.9 1.8 1.8.3-1.3 1.3.3 1.8L8 9.5l-1.7.9.3-1.8-1.3-1.3 1.8-.3z" fill="currentColor" opacity=".5"/>'),
    /* 纽扣：圆扣 + 四孔 */
    button:S('<circle cx="8" cy="8" r="5.4" fill="none" stroke="currentColor" stroke-width="1.3"/>'+
      '<circle cx="8" cy="8" r="3" fill="none" stroke="currentColor" stroke-width=".8" opacity=".45"/>'+
      '<circle cx="6.8" cy="6.8" r=".6" fill="currentColor"/><circle cx="9.2" cy="6.8" r=".6" fill="currentColor"/>'+
      '<circle cx="6.8" cy="9.2" r=".6" fill="currentColor"/><circle cx="9.2" cy="9.2" r=".6" fill="currentColor"/>'),
    /* 风铃草：弯曲花茎 + 两朵钟形花 */
    bellflower:S('<path d="M3.4 2.8c3.1 0 6.3 1.6 7.5 4.4" fill="none" stroke="currentColor" stroke-width="1.1" stroke-linecap="round"/>'+
      '<path d="M5.3 6.3c-.9.5-1.3 1.5-1 2.6.3 1 1.2 1.6 2.2 1.4.9-.2 1.5-1 1.4-1.9-.1-.6-.3-1.2-.5-2z" fill="none" stroke="currentColor" stroke-width="1.2" stroke-linejoin="round"/>'+
      '<path d="M9.3 9.3c-.6.9-.6 1.9 0 2.7.6.8 1.7 1 2.5.4.7-.5.9-1.4.5-2.1-.2-.4-.4-.8-.5-1.3z" fill="none" stroke="currentColor" stroke-width="1.15" stroke-linejoin="round"/>'),
    /* 潮汐石：圆石 + 潮纹 */
    tideorb:S('<circle cx="8" cy="8.4" r="4.8" fill="none" stroke="currentColor" stroke-width="1.3"/>'+
      '<path d="M4.2 9.6c1.2-.9 2.4-.9 3.6 0s2.4.9 3.6 0" fill="none" stroke="currentColor" stroke-width="1" stroke-linecap="round" opacity=".7"/>'+
      '<path d="M5 7.1c1.1-.7 2.1-.7 3.2 0s2.1.7 3.2 0" fill="none" stroke="currentColor" stroke-width=".85" stroke-linecap="round" opacity=".45"/>'),
    /* 海蓝宝石：切面宝石 */
    gem:S('<path d="M6 2.6h4l3 3.5-5 7.3-5-7.3z" fill="none" stroke="currentColor" stroke-width="1.25" stroke-linejoin="round"/>'+
      '<path d="M3 6.1h10M6 2.6L5 6.1M10 2.6L11 6.1" fill="none" stroke="currentColor" stroke-width=".85" stroke-linecap="round" opacity=".55"/>'),
    /* 枯骨花：低垂花头 + 残枝 */
    wilted:S('<path d="M8.4 13.4c0-2.4-.7-4.1-2.1-5.3" fill="none" stroke="currentColor" stroke-width="1.15" stroke-linecap="round"/>'+
      '<path d="M6.3 8.1c-1.4-.1-2.4-.9-2.7-2.2 1.4-.3 2.5.3 2.9 1.6m-.2.6c.6-1.2 1.6-1.7 2.9-1.4-.2 1.3-1.1 2.1-2.4 2.2" fill="none" stroke="currentColor" stroke-width="1.1" stroke-linejoin="round"/>'+
      '<path d="M8.4 10.6c1.4.2 2.4 1 2.8 2.3-1.4.3-2.5-.3-2.9-1.6" fill="none" stroke="currentColor" stroke-width="1.05" stroke-linejoin="round" opacity=".7"/>'+
      '<path d="M4.6 13.4h7" fill="none" stroke="currentColor" stroke-width="1" stroke-linecap="round" opacity=".5"/>'),
    /* 雪莲：层叠花瓣 */
    lotus:S('<path d="M8 12.7c-2.5 0-4.3-1.2-4.8-3 1.2-.5 2.4-.2 3.3.8M8 12.7c2.5 0 4.3-1.2 4.8-3-1.2-.5-2.4-.2-3.3.8" fill="none" stroke="currentColor" stroke-width="1.15" stroke-linejoin="round"/>'+
      '<path d="M8 12.5c-1.6-1.2-2.1-2.7-1.4-4.3 1.4.9 1.9 2.3 1.4 4.3Zm0 0c1.6-1.2 2.1-2.7 1.4-4.3-1.4.9-1.9 2.3-1.4 4.3Z" fill="none" stroke="currentColor" stroke-width="1.15" stroke-linejoin="round"/>'+
      '<path d="M8 8.7c-.8-1.1-.8-2.2 0-3.4.8 1.2.8 2.3 0 3.4Z" fill="currentColor" opacity=".5"/>'),
    /* 玫瑰：螺旋花心 + 花萼 */
    rose:S('<path d="M8 3.2c2.3 0 4.1 1.7 4.1 3.9 0 2.6-2 4.8-4.1 5.4-2.1-.6-4.1-2.8-4.1-5.4 0-2.2 1.8-3.9 4.1-3.9Z" fill="none" stroke="currentColor" stroke-width="1.2" stroke-linejoin="round"/>'+
      '<path d="M8 5.5c1.2 0 2 .8 2 1.8 0 1.2-1 2.2-2 2.5-1-.3-2-1.3-2-2.5 0-1 .8-1.8 2-1.8Z" fill="none" stroke="currentColor" stroke-width=".9" opacity=".7"/>'+
      '<path d="M8 7.6c-.4 0-.7-.3-.7-.6 0-.4.4-.7.8-.7" fill="none" stroke="currentColor" stroke-width=".8" opacity=".6"/>'+
      '<path d="M8 12.6v1.1M6.1 13.1c.7-.4 1.3-.4 1.9 0M9.9 13.1c-.7-.4-1.3-.4-1.9 0" fill="none" stroke="currentColor" stroke-width=".95" stroke-linecap="round"/>'),
    /* 珊瑚：分叉珊瑚枝 */
    coral:S('<path d="M8 13.4V7.2M8 9.9c-1.4-.2-2.4-1-3-2.4M8 8.6c1.4-.2 2.4-1 3-2.4M8 7.2C7.4 5.8 7.5 4.6 8.1 3.5M8 7.2c.7-1.4.7-2.6.2-3.7" fill="none" stroke="currentColor" stroke-width="1.25" stroke-linecap="round"/>'+
      '<path d="M4.2 13.3h7.6" fill="none" stroke="currentColor" stroke-width="1" stroke-linecap="round" opacity=".5"/>'),
    /* 贝壳风铃：横杆 + 垂挂贝壳 */
    chime:S('<path d="M4.4 3.2h7.2M5.4 3.2v2.4M8 3.2v3.3M10.6 3.2v2.4" fill="none" stroke="currentColor" stroke-width="1.1" stroke-linecap="round"/>'+
      '<path d="M4.4 5.9c1 0 1.7.8 1.7 1.9 0 1.3-1.7 2.7-1.7 2.7s-1.7-1.4-1.7-2.7c0-1.1.7-1.9 1.7-1.9Z" fill="none" stroke="currentColor" stroke-width="1.05" stroke-linejoin="round"/>'+
      '<path d="M8 6.9c.9 0 1.6.8 1.6 1.8 0 1.4-1.6 2.8-1.6 2.8s-1.6-1.4-1.6-2.8c0-1 .7-1.8 1.6-1.8Z" fill="none" stroke="currentColor" stroke-width="1.05" stroke-linejoin="round"/>'+
      '<path d="M10.6 5.9v5.1" fill="none" stroke="currentColor" stroke-width=".95" stroke-linecap="round" opacity=".55"/>'),
    /* 竖琴：琴框 + 琴弦 */
    harp:S('<path d="M4.7 3.2c-.9 3.4-.9 6.5 0 9.5M4.7 3.2c3.6.2 6.5 3 6.9 6.6l-1.2 2.9" fill="none" stroke="currentColor" stroke-width="1.25" stroke-linecap="round" stroke-linejoin="round"/>'+
      '<path d="M6.4 4.4v8M8.2 5.3v7M10 6.6v5.4" fill="none" stroke="currentColor" stroke-width=".8" opacity=".65"/>'+
      '<path d="M4.7 12.7h6.9" fill="none" stroke="currentColor" stroke-width="1.1" stroke-linecap="round"/>'),
    /* 铜钱：圆钱 + 方孔 */
    coppercoin:S('<circle cx="8" cy="8" r="5.4" fill="none" stroke="currentColor" stroke-width="1.3"/>'+
      '<rect x="6.4" y="6.4" width="3.2" height="3.2" fill="none" stroke="currentColor" stroke-width="1.1"/>'+
      '<path d="M8 2.6v1.5M8 11.9v1.5M2.6 8h1.5M11.9 8h1.5" fill="none" stroke="currentColor" stroke-width=".75" stroke-linecap="round" opacity=".45"/>'),
    /* 断梦短刃：短刃 + 护手 */
    dagger:S('<path d="M8 2.2l1.9 2.6v5.1H6.1V4.8z" fill="none" stroke="currentColor" stroke-width="1.2" stroke-linejoin="round"/>'+
      '<path d="M5.2 9.9h5.6M8 9.9v3.9" fill="none" stroke="currentColor" stroke-width="1.25" stroke-linecap="round"/>'+
      '<path d="M8 3.4v6.3" fill="none" stroke="currentColor" stroke-width=".75" opacity=".45"/>'),
    /* 茶盏：杯 + 把手 + 托盘 + 热气 */
    teacup:S('<path d="M4.2 7h6.1v2.2c0 1.7-1.3 3-3 3s-3.1-1.3-3.1-3z" fill="none" stroke="currentColor" stroke-width="1.25" stroke-linejoin="round"/>'+
      '<path d="M10.3 7.7h.9c.7 0 1.3.6 1.3 1.3s-.6 1.3-1.3 1.3h-.9" fill="none" stroke="currentColor" stroke-width="1.05"/>'+
      '<path d="M3.2 13.2h9.6" fill="none" stroke="currentColor" stroke-width="1.1" stroke-linecap="round"/>'+
      '<path d="M6.5 5.6c-.5-.7-.5-1.4 0-2.1M8.6 5.6c-.5-.7-.5-1.4 0-2.1" fill="none" stroke="currentColor" stroke-width=".9" stroke-linecap="round" opacity=".6"/>'),
    /* 冻虾：弯身 + 长须 */
    shrimp:S('<path d="M10.9 3.5c-2.9-.7-5.6.5-6.7 2.9-1 2.3.2 4.9 2.5 5.8 1.7.7 3.6.3 4.8-1" fill="none" stroke="currentColor" stroke-width="1.25" stroke-linecap="round"/>'+
      '<path d="M11 3.5l2.1-1M11.1 3.6l2.3.5" fill="none" stroke="currentColor" stroke-width=".95" stroke-linecap="round"/>'+
      '<path d="M4.4 6.7c1.2-.6 2.4-.4 3.4.6M6.2 10c1.1.2 2.1-.1 2.9-.9M8.7 5.7c.2 1 .8 1.7 1.7 2.1" fill="none" stroke="currentColor" stroke-width=".8" stroke-linecap="round" opacity=".55"/>'),
    /* 印玺：印座 + 拱柄 */
    seal:S('<rect x="4.2" y="10.5" width="7.6" height="2.7" rx=".5" fill="none" stroke="currentColor" stroke-width="1.2"/>'+
      '<path d="M5.3 10.5V8.2c0-1.3 1-2.3 2.3-2.3h.8c1.3 0 2.3 1 2.3 2.3v2.3" fill="none" stroke="currentColor" stroke-width="1.2" stroke-linejoin="round"/>'+
      '<path d="M6.4 5.9c0-1.7.5-3 1.6-4 1.1 1 1.6 2.3 1.6 4" fill="none" stroke="currentColor" stroke-width="1.05"/>'+
      '<path d="M5.6 11.8h4.8" fill="none" stroke="currentColor" stroke-width=".85" opacity=".5"/>'),
    /* 收音机：机身 + 喇叭 + 天线 */
    radio:S('<rect x="2.6" y="6.1" width="10.8" height="7.3" rx="1" fill="none" stroke="currentColor" stroke-width="1.2"/>'+
      '<path d="M9.2 6.1l2.4-3.5" fill="none" stroke="currentColor" stroke-width="1.05" stroke-linecap="round"/>'+
      '<circle cx="5.8" cy="9.8" r="1.7" fill="none" stroke="currentColor" stroke-width="1"/>'+
      '<path d="M9.2 8.6h2.9M9.2 10.5h2.9" fill="none" stroke="currentColor" stroke-width=".95" stroke-linecap="round" opacity=".6"/>'+
      '<path d="M4.3 13.4v.8M11.7 13.4v.8" fill="none" stroke="currentColor" stroke-width="1.1" stroke-linecap="round"/>'),
    /* 号角：弯管 + 扩口 */
    horn:S('<path d="M3.6 5.2c2.6 0 4.9 1.4 6.1 3.6l1.2 2.2c.5.9-.1 2-1.2 2-3.1 0-5.8-2-6.7-5-.2-.7.1-1.4.7-1.8z" fill="none" stroke="currentColor" stroke-width="1.25" stroke-linejoin="round"/>'+
      '<path d="M9.7 8.9l2.9-1.2c.9-.4 1.9.1 2.2 1 .3 1-.2 2-1.2 2.3l-2.3.7" fill="none" stroke="currentColor" stroke-width="1.15" stroke-linejoin="round"/>'+
      '<path d="M4.7 7.2c1.3.4 2.3 1.3 2.9 2.5" fill="none" stroke="currentColor" stroke-width=".8" opacity=".5"/>'),
    /* 符文石：立石 + 刻纹 */
    runestone:S('<path d="M5.2 13.2l.6-8.2c.1-1.2 1-2.1 2.2-2.1s2.1.9 2.2 2.1l.6 8.2z" fill="none" stroke="currentColor" stroke-width="1.25" stroke-linejoin="round"/>'+
      '<path d="M8 5.6v4.4M6.6 7.2l2.8 1.4M9.4 7.2L6.6 8.6" fill="none" stroke="currentColor" stroke-width=".9" stroke-linecap="round" opacity=".7"/>'+
      '<path d="M4.4 13.3h7.2" fill="none" stroke="currentColor" stroke-width="1" stroke-linecap="round" opacity=".5"/>'),
    /* 椰壳灯：半壳灯座 + 火焰 */
    coconutlamp:S('<path d="M3.4 10.3c0-2.6 2.1-4.6 4.6-4.6s4.6 2 4.6 4.6c0 1.5-1.3 2.7-2.8 2.7H6.2c-1.5 0-2.8-1.2-2.8-2.7Z" fill="none" stroke="currentColor" stroke-width="1.25"/>'+
      '<path d="M8 5.9c-.9-.9-.8-2 .2-3 1.1.9 1.3 2 .5 3" fill="none" stroke="currentColor" stroke-width="1.1" stroke-linejoin="round"/>'+
      '<path d="M8 4c-.4-.5-.4-1 0-1.6.5.5.5 1 0 1.6Z" fill="currentColor"/>'+
      '<path d="M4.6 8.3c.9-.4 1.8-.4 2.7 0M8.7 8.3c.9-.4 1.8-.4 2.7 0" fill="none" stroke="currentColor" stroke-width=".8" stroke-linecap="round" opacity=".5"/>'),
    /* 藤编环：环形 + 编织纹 */
    wreath:S('<circle cx="8" cy="8" r="5" fill="none" stroke="currentColor" stroke-width="1.3"/>'+
      '<path d="M4.6 5.2c1.5.9 4.3 1.3 6.7.5M3.4 8.2c1.7 1 5.4 1.1 8.2.1M4.2 11.1c1.6.9 4.6 1.1 7.1.2" fill="none" stroke="currentColor" stroke-width=".85" stroke-linecap="round" opacity=".55"/>'+
      '<path d="M9.4 3.4c.9.4 1.6 1 2.1 1.7M4.6 12.6c.6.4 1.3.7 2 1" fill="none" stroke="currentColor" stroke-width=".8" stroke-linecap="round" opacity=".45"/>'),
    /* 浪花糖：糖块 + 浪纹 + 两侧糖纸 */
    wavecandy:S('<ellipse cx="8" cy="8" rx="4" ry="3" fill="none" stroke="currentColor" stroke-width="1.2"/>'+
      '<path d="M4.8 8.6c.9-.8 1.8-.8 2.7 0s1.8.8 2.7 0" fill="none" stroke="currentColor" stroke-width="1" stroke-linecap="round"/>'+
      '<path d="M4 6.4L2.2 5v6l1.8-1.4M12 6.4L13.8 5v6l-1.8-1.4" fill="none" stroke="currentColor" stroke-width="1.1" stroke-linejoin="round"/>'),
    /* 独角兽毛：根部束带 + 三缕垂落的鬃毛 */
    unicornhair:S('<path d="M5.9 2.2c1.3.8 2.6.8 3.9 0l1 1.9c-1.8 1.1-3.9 1.1-5.7 0z" fill="none" stroke="currentColor" stroke-width="1.1" stroke-linejoin="round"/>'+
      '<path d="M6 4.1c-.7 2.4-.5 4.7.7 6.8.9 1.5 1 2.5.6 3.5" fill="none" stroke="currentColor" stroke-width="1.05" stroke-linecap="round"/>'+
      '<path d="M7.8 4.4c-.5 2.3-.3 4.5.8 6.4.7 1.2.8 2.1.5 2.9" fill="none" stroke="currentColor" stroke-width="1.05" stroke-linecap="round"/>'+
      '<path d="M9.6 4.3c-.8 2-1 3.9-.2 5.8.5 1.1.6 1.8.4 2.5" fill="none" stroke="currentColor" stroke-width="1" stroke-linecap="round"/>'),
    /* 珍珠：圆珠 + 高光 + 星芒 */
    pearl:S('<circle cx="8" cy="8.4" r="4.4" fill="none" stroke="currentColor" stroke-width="1.2"/>'+
      '<path d="M5.6 7a3.4 3.4 0 0 1 2.2-1.6" fill="none" stroke="currentColor" stroke-width=".9" stroke-linecap="round"/>'+
      '<path d="M12.6 3.6v1.6M11.8 4.4h1.6" stroke="currentColor" stroke-width=".8" stroke-linecap="round"/>'),
    /* 漂流木：横置浮木 + 年轮断面 + 木纹 */
    driftwood:S('<path d="M3.2 9.8V7.4c0-.9.7-1.6 1.6-1.6h7.1c1.6 0 2.8 1.5 2.8 3.4 0 1.3-.9 2.2-2.2 2.2H4.4c-.7 0-1.2-.6-1.2-1.6z" fill="none" stroke="currentColor" stroke-width="1.15" stroke-linejoin="round"/>'+
      '<path d="M4.4 5.8c.7 0 1.2 1.1 1.2 2.5s-.5 2.5-1.2 2.5" fill="none" stroke="currentColor" stroke-width=".95"/>'+
      '<path d="M7.4 6.7h4.3M7.4 9.8h3.8" stroke="currentColor" stroke-width=".75" stroke-linecap="round" opacity=".55"/>'),
    /* 果子面包：圆顶面包 + 割口 */
    bread:S('<path d="M2.8 11.8V8.2C2.8 5.6 5.1 3.8 8 3.8s5.2 1.8 5.2 4.4v3.6z" fill="none" stroke="currentColor" stroke-width="1.2" stroke-linejoin="round"/>'+
      '<path d="M2.8 11.8h10.4" stroke="currentColor" stroke-width="1.2"/>'+
      '<path d="M5.6 6.2c.6-.8 1.4-1.2 2.4-1.2M5.6 8.6c.6-.8 1.4-1.2 2.4-1.2" fill="none" stroke="currentColor" stroke-width=".85" stroke-linecap="round" opacity=".7"/>'),
    /* 糖画：竹签 + 盘绕糖龙 + 龙头 */
    sugardragon:S('<path d="M8 14.2V9.4" stroke="currentColor" stroke-width="1.2" stroke-linecap="round"/>'+
      '<path d="M8 9.4a3.4 3.4 0 1 1 3.5-3.6 2.3 2.3 0 1 1-2.7-2" fill="none" stroke="currentColor" stroke-width="1.1" stroke-linecap="round"/>'+
      '<path d="M8.8 3.8l-.5-2.2 2.1 1" fill="none" stroke="currentColor" stroke-width=".9" stroke-linejoin="round"/>'+
      '<circle cx="9.1" cy="3.4" r=".5" fill="currentColor"/>'),
    /* 噩梦残片：锯齿碎片 + 外溢黑雾 */
    nightmareshard:S('<path d="M8.4 1.6l3.2 4.4-1.4 1.2 1.2 3-3.2 4.2-1-3.6-1.8-2.4z" fill="none" stroke="currentColor" stroke-width="1.1" stroke-linejoin="round"/>'+
      '<path d="M7.2 5.8c-1.6.6-2.4 2-2.2 3.6M9.8 7.2c.8 1 .8 2.4 0 3.4" fill="none" stroke="currentColor" stroke-width=".8" stroke-linecap="round" opacity=".55"/>'),
    /* 斗篷残片：连帽披风 + 撕裂下摆 */
    cloakscrap:S('<path d="M8 2.4c-1.4 0-2.5 1-2.7 2.2l-1.7 8.2 2-.9 1.4 1.1 1-1.2 1 1.2 1.4-1.1 2 .9-1.7-8.2C10.5 3.4 9.4 2.4 8 2.4z" fill="none" stroke="currentColor" stroke-width="1.15" stroke-linejoin="round"/>'+
      '<path d="M8 2.4c-.9 0-1.7.5-2.1 1.3.6.5 1.3.8 2.1.8s1.5-.3 2.1-.8c-.4-.8-1.2-1.3-2.1-1.3z" fill="none" stroke="currentColor" stroke-width=".85"/>'+
      '<path d="M6.9 6.6v3.2M9.1 6.6v3.2" stroke="currentColor" stroke-width=".7" stroke-linecap="round" opacity=".5"/>'),
    /* 雪绒花：六枚窄瓣 + 花心 + 茎叶 */
    edelweiss:S('<g fill="none" stroke="currentColor" stroke-width="1.05">'+
      '<ellipse cx="8" cy="4.6" rx="1.2" ry="2.3"/>'+
      '<ellipse cx="8" cy="4.6" rx="1.2" ry="2.3" transform="rotate(60 8 8)"/>'+
      '<ellipse cx="8" cy="4.6" rx="1.2" ry="2.3" transform="rotate(120 8 8)"/>'+
      '<ellipse cx="8" cy="4.6" rx="1.2" ry="2.3" transform="rotate(180 8 8)"/>'+
      '<ellipse cx="8" cy="4.6" rx="1.2" ry="2.3" transform="rotate(240 8 8)"/>'+
      '<ellipse cx="8" cy="4.6" rx="1.2" ry="2.3" transform="rotate(300 8 8)"/>'+
      '</g><circle cx="8" cy="8" r="1.2" fill="none" stroke="currentColor" stroke-width="1"/>'),
    /* 壁画拓片：纸页 + 卷角 + 浮雕纹 */
    rubbing:S('<path d="M3 2.6h8.2l1.8 1.8v9H3z" fill="none" stroke="currentColor" stroke-width="1.2" stroke-linejoin="round"/>'+
      '<path d="M11.2 2.6v1.8H13" fill="none" stroke="currentColor" stroke-width=".9"/>'+
      '<path d="M5.4 6.2c1.2-.8 2.4-.8 3.6 0M5.4 8.4c1.2-.8 2.4-.8 3.6 0M5.4 10.6c.9-.6 1.8-.6 2.7 0" fill="none" stroke="currentColor" stroke-width=".85" stroke-linecap="round" opacity=".75"/>'),
    /* 石像眼：方形石块 + 浮雕眼 */
    stoneeye:S('<path d="M2.6 4.2h10.8v7.6H2.6z" fill="none" stroke="currentColor" stroke-width="1.2" stroke-linejoin="round"/>'+
      '<path d="M4.6 8c1.6-2 5.2-2 6.8 0-1.6 2-5.2 2-6.8 0z" fill="none" stroke="currentColor" stroke-width="1.1"/>'+
      '<circle cx="8" cy="8" r=".9" fill="currentColor"/>'+
      '<path d="M3.4 5.2h1M11.8 10.8h1" stroke="currentColor" stroke-width=".7" opacity=".5"/>'),
    /* 寒铁：铁锭 + 冷光 */
    iron:S('<path d="M4.4 5.2h7.2l2 5.2H2.4z" fill="none" stroke="currentColor" stroke-width="1.2" stroke-linejoin="round"/>'+
      '<path d="M5.6 9.6l.8-1.6M9.2 9.6l.8-1.6" stroke="currentColor" stroke-width=".8" stroke-linecap="round" opacity=".65"/>'+
      '<path d="M6.4 3.6h3.2" stroke="currentColor" stroke-width=".8" stroke-linecap="round" opacity=".5"/>'),
    /* 海豚哨：哨身 + 吹孔 + 声波 */
    whistle:S('<path d="M2.6 6.2h6.2v4.2H5.4L2.6 12.4z" fill="none" stroke="currentColor" stroke-width="1.2" stroke-linejoin="round"/>'+
      '<circle cx="7" cy="8.4" r="1.1" fill="none" stroke="currentColor" stroke-width="1"/>'+
      '<path d="M11.8 4.8a4 4 0 0 1 0 6.4M13.4 3.2a6.2 6.2 0 0 1 0 9.6" fill="none" stroke="currentColor" stroke-width="1" stroke-linecap="round"/>'),
    /* 岛花：五瓣花 + 花心 */
    islandflower:S('<g fill="none" stroke="currentColor" stroke-width="1.1">'+
      '<ellipse cx="8" cy="5" rx="1.5" ry="2.6"/>'+
      '<ellipse cx="8" cy="5" rx="1.5" ry="2.6" transform="rotate(72 8 8)"/>'+
      '<ellipse cx="8" cy="5" rx="1.5" ry="2.6" transform="rotate(144 8 8)"/>'+
      '<ellipse cx="8" cy="5" rx="1.5" ry="2.6" transform="rotate(216 8 8)"/>'+
      '<ellipse cx="8" cy="5" rx="1.5" ry="2.6" transform="rotate(288 8 8)"/>'+
      '</g><circle cx="8" cy="8" r="1.1" fill="currentColor"/>'),
    /* 人鱼鳞：交错叠压的鳞片 */
    merscale:S('<path d="M2.4 12.4a2.6 2.6 0 0 1 5.2 0M8.4 12.4a2.6 2.6 0 0 1 5.2 0" fill="none" stroke="currentColor" stroke-width="1.05" stroke-linecap="round"/>'+
      '<path d="M5.4 9.6a2.6 2.6 0 0 1 5.2 0M2.4 9.6a2.6 2.6 0 0 1 5.2 0M8.4 9.6a2.6 2.6 0 0 1 5.2 0" fill="none" stroke="currentColor" stroke-width="1.05" stroke-linecap="round"/>'+
      '<path d="M5.4 6.8a2.6 2.6 0 0 1 5.2 0" fill="none" stroke="currentColor" stroke-width="1.05" stroke-linecap="round"/>'),
    /* 海雾纱：飘动纱幔 */
    seamist:S('<path d="M2.4 5.2c1.8 1 3.6-1 5.4 0s3.6 1 5.4 0M2.4 8.4c1.8 1 3.6-1 5.4 0s3.6 1 5.4 0M2.4 11.6c1.8 1 3.6-1 5.4 0s3.6 1 5.4 0" fill="none" stroke="currentColor" stroke-width="1.1" stroke-linecap="round"/>'+
      '<path d="M4 3.4c1.2.7 2.4-.7 3.6 0s2.4.7 3.6 0" fill="none" stroke="currentColor" stroke-width=".7" stroke-linecap="round" opacity=".5"/>'),
    /* 布丁：杯装焦糖布丁（玻璃杯 + 深色焦糖顶层 + 浅色奶冻 + 小勺） */
    pudding:S('<path d="M4.85 4.85h6.3l-.62 7.45c-.05.6-.55 1.05-1.15 1.05H6.62c-.6 0-1.1-.45-1.15-1.05z" fill="none" stroke="currentColor" stroke-width="1.2" stroke-linejoin="round"/>'+
      '<path d="M5.15 5.3h5.7l-.14 1.5c-.9.5-1.8-.4-2.71 0-.9.4-1.8.4-2.7 0z" fill="currentColor"/>'+
      '<path d="M5.3 7.15 5.42 12.1c.03.32.3.55.62.55h3.92c.32 0 .59-.23.62-.55l.12-4.95z" fill="currentColor" fill-opacity=".16"/>'+
      '<path d="M10.15 4.75 12.15 1.75" fill="none" stroke="currentColor" stroke-width="1" stroke-linecap="round"/>'+
      '<ellipse cx="12.6" cy="1.4" rx=".95" ry=".68" transform="rotate(-33 12.6 1.4)" fill="none" stroke="currentColor" stroke-width=".9"/>'),
    /* 快长肥：牛皮纸袋 + 露出袋口的番茄（沿用上面番茄的三片萼与一捺刘海） */
    tomatobag:S('<path d="M4.5 8.2C3.7 6.95 4 5.35 5.15 4.45C6.05 3.8 7 3.6 8 3.7C9 3.6 9.95 3.8 10.85 4.45C12 5.35 12.3 6.95 11.5 8.2Z" fill="none" stroke="currentColor" stroke-width="1.3" stroke-linejoin="round"/>'+
      '<path d="M8 3.75C6.95 3 5.9 2.75 4.9 2.85M8 3.75C9.05 3 10.1 2.75 11.1 2.85M8 3.75V2" fill="none" stroke="currentColor" stroke-width="1.05" stroke-linecap="round"/>'+
      '<path d="M5.75 5.95C6.6 5.45 7.55 5.65 8.7 6.35C8.4 6.8 7.9 6.85 7.4 6.5C6.85 6.25 6.25 6.1 5.75 5.95Z" fill="currentColor"/>'+
      /* 袋身 + 袋口卷边（比袋身略宽一点，读起来才像纸袋口而不是桶） */
      '<path d="M3.2 8.2h9.6l.75 6.15H2.45z" fill="none" stroke="currentColor" stroke-width="1.35" stroke-linejoin="round"/>'+
      '<path d="M2.95 8.2h10.1l.35 1.25H2.6z" fill="none" stroke="currentColor" stroke-width="1.1" stroke-linejoin="round"/>'),
    /* 饭团便当：三角形饭团 + 底部的紫菜 */
    onigiri:S('<path d="M8 2.4C8.8 2.4 9.6 3.2 10.4 4.7L13.2 9.6C13.9 10.9 13.2 12.3 11.7 12.4H4.3C2.8 12.3 2.1 10.9 2.8 9.6L5.6 4.7C6.4 3.2 7.2 2.4 8 2.4Z" fill="none" stroke="currentColor" stroke-width="1.3" stroke-linejoin="round"/>'+
      '<path d="M5.4 8.3h5.2v4.1H5.4z" fill="currentColor"/>'),
    /* 时蔬便当：便当盒 + 一片菜叶 */
    veggiebento:S('<rect x="2.6" y="3.4" width="10.8" height="9.8" rx="1.2" fill="none" stroke="currentColor" stroke-width="1.3"/>'+
      '<rect x="3.6" y="4.4" width="8.8" height="1.8" rx=".6" fill="currentColor" opacity=".55"/>'+
      '<path d="M6.5 7.6c1.5 0 2.4 1 2.4 2.7-1.5 0-2.4-1-2.4-2.7z" fill="currentColor"/>'+
      '<path d="M10.4 9.1c1.1 0 1.8.8 1.8 2.1-1.1 0-1.8-.8-1.8-2.1z" fill="currentColor"/>'),
    /* 豪华便当：带提手的外带餐盒 + 一颗星 */
    deluxebento:S('<path d="M5.4 6.6V4.9a2.6 2.6 0 0 1 5.2 0v1.7" fill="none" stroke="currentColor" stroke-width="1.2"/>'+
      '<path d="M3.3 6.6h9.4l-.8 6.4H4.1z" fill="none" stroke="currentColor" stroke-width="1.3" stroke-linejoin="round"/>'+
      '<path d="M3.9 8.7h8.2" stroke="currentColor" stroke-width="1.1"/>'+
      '<path d="M8 9.5l.6 1.2 1.3.2-.95.95.23 1.3L8 12.5l-1.18.65.23-1.3-.95-.95 1.3-.2z" fill="currentColor"/>'),
    /* 海味便当：便当盒 + 盒里一条小鱼 */
    seabento:S('<rect x="2.6" y="4.6" width="10.8" height="8.8" rx="1.2" fill="none" stroke="currentColor" stroke-width="1.3"/>'+
      '<path d="M2.8 7.2h10.4" stroke="currentColor" stroke-width="1"/>'+
      '<path d="M5.2 10.4c1-.9 2.2-1.3 3.6-1.3 1.1 0 1.9.4 2.3 1.3-.8.9-1.7 1.3-2.8 1.3-1.2 0-2.2-.4-3.1-1.3z" fill="currentColor"/>'+
      '<path d="M5.2 10.4L4 9.1v2.6z" fill="currentColor" opacity=".75"/>'),
    /* 四叶草：四片心形叶（叶尖朝中心，中间留小十字缝）+ 右下短茎 */
    clover:S('<path d="M8 6.75C7.15 6.15 5.4 5.3 5.4 3.75C5.4 2.65 6.2 1.95 7.05 1.95C7.6 1.95 7.9 2.3 8 2.65C8.1 2.3 8.4 1.95 8.95 1.95C9.8 1.95 10.6 2.65 10.6 3.75C10.6 5.3 8.85 6.15 8 6.75Z" fill="currentColor"/>'+
      '<path d="M8 6.75C7.15 6.15 5.4 5.3 5.4 3.75C5.4 2.65 6.2 1.95 7.05 1.95C7.6 1.95 7.9 2.3 8 2.65C8.1 2.3 8.4 1.95 8.95 1.95C9.8 1.95 10.6 2.65 10.6 3.75C10.6 5.3 8.85 6.15 8 6.75Z" fill="currentColor" transform="rotate(90 8 8)"/>'+
      '<path d="M8 6.75C7.15 6.15 5.4 5.3 5.4 3.75C5.4 2.65 6.2 1.95 7.05 1.95C7.6 1.95 7.9 2.3 8 2.65C8.1 2.3 8.4 1.95 8.95 1.95C9.8 1.95 10.6 2.65 10.6 3.75C10.6 5.3 8.85 6.15 8 6.75Z" fill="currentColor" transform="rotate(180 8 8)"/>'+
      '<path d="M8 6.75C7.15 6.15 5.4 5.3 5.4 3.75C5.4 2.65 6.2 1.95 7.05 1.95C7.6 1.95 7.9 2.3 8 2.65C8.1 2.3 8.4 1.95 8.95 1.95C9.8 1.95 10.6 2.65 10.6 3.75C10.6 5.3 8.85 6.15 8 6.75Z" fill="currentColor" transform="rotate(270 8 8)"/>'+
      '<path d="M10.8 10.9C11.4 11.9 11.9 12.9 12.2 13.9" fill="none" stroke="currentColor" stroke-width="1.3" stroke-linecap="round"/>'),
    /* 图鉴：摊开的书 */
    book:S('<path d="M8 4.2C6.7 3.1 4.6 2.8 2.6 3.2v9.2c2-.4 4.1-.1 5.4.9 1.3-1 3.4-1.3 5.4-.9V3.2c-2-.4-4.1-.1-5.4 1z" fill="none" stroke="currentColor" stroke-width="1.3"/>'+
      '<path d="M8 4.2v9.1" stroke="currentColor" stroke-width="1"/>'+
      '<path d="M4.4 5.6h2M4.4 8h2M9.6 5.6h2M9.6 8h2" stroke="currentColor" stroke-width=".9" opacity=".7"/>'),
    /* 统计：柱状图 */
    chart:S('<path d="M2.2 13.4h11.6" stroke="currentColor" stroke-width="1.3"/>'+
      '<rect x="3" y="8.4" width="2.4" height="3.6" fill="currentColor"/>'+
      '<rect x="6.8" y="5.8" width="2.4" height="6.2" fill="currentColor"/>'+
      '<rect x="10.6" y="3.4" width="2.4" height="8.6" fill="currentColor"/>'),
    /* 商店：购物车 */
    cart:S('<path d="M2 3.2h2.1l1.5 6.4h7.2" fill="none" stroke="currentColor" stroke-width="1.4"/>'+
      '<path d="M5.6 5.6h8.2l-1.1 3.4H6.5" fill="none" stroke="currentColor" stroke-width="1.2"/>'+
      '<circle cx="6.8" cy="12.2" r="1.1" fill="currentColor"/><circle cx="11.4" cy="12.2" r="1.1" fill="currentColor"/>'),
    /* 旅行：手提箱 */
    case:S('<rect x="2.2" y="5.4" width="11.6" height="8.2" rx=".8" fill="none" stroke="currentColor" stroke-width="1.4"/>'+
      '<path d="M5.6 5.4V4.2a1.4 1.4 0 0 1 1.4-1.4h2a1.4 1.4 0 0 1 1.4 1.4v1.2" fill="none" stroke="currentColor" stroke-width="1.2"/>'+
      '<path d="M2.2 9.2h11.6" stroke="currentColor" stroke-width="1"/>'+
      '<rect x="7.2" y="8.4" width="1.6" height="1.8" fill="currentColor"/>'),
    /* 百巴箱：礼盒 */
    gift:S('<rect x="2.4" y="6.4" width="11.2" height="7.2" fill="none" stroke="currentColor" stroke-width="1.3"/>'+
      '<rect x="1.8" y="4.2" width="12.4" height="2.4" fill="currentColor" opacity=".9"/>'+
      '<path d="M8 4.2v9.4" stroke="currentColor" stroke-width="1.4"/>'+
      '<path d="M8 4.2c-1.7 0-3-.8-3-1.9 0-.8.7-1.3 1.5-1.3 1.1 0 1.5 1.4 1.5 3.2zm0 0c1.7 0 3-.8 3-1.9 0-.8-.7-1.3-1.5-1.3-1.1 0-1.5 1.4-1.5 3.2z" fill="none" stroke="currentColor" stroke-width="1.1"/>'),
    /* 幸存者：交叉双剑 */
    swords:S('<path d="M2.6 2.6L10.4 10.4M13.4 2.6L5.6 10.4" fill="none" stroke="currentColor" stroke-width="1.5"/>'+
      '<path d="M2.2 6.8l4.6-4.6M13.8 6.8l-4.6-4.6" fill="none" stroke="currentColor" stroke-width="1.2"/>'),
    /* 提交 / 默认皮肤：调色盘 */
    palette:S('<path d="M8 2.2a5.8 5.8 0 1 0 0 11.6c.9 0 1.4-.6 1.4-1.4 0-.7-.5-1.1-.5-1.8 0-.8.7-1.4 1.6-1.4h1.3A2.4 2.4 0 0 0 14 7.1 6 6 0 0 0 8 2.2z" fill="none" stroke="currentColor" stroke-width="1.3"/>'+
      '<circle cx="5" cy="6" r="1" fill="currentColor"/><circle cx="8.6" cy="4.8" r="1" fill="currentColor"/><circle cx="11.4" cy="6.2" r="1" fill="currentColor"/>'),
    /* 语言：地球 */
    globe:S('<circle cx="8" cy="8" r="5.6" fill="none" stroke="currentColor" stroke-width="1.3"/>'+
      '<ellipse cx="8" cy="8" rx="2.6" ry="5.6" fill="none" stroke="currentColor" stroke-width="1"/>'+
      '<path d="M2.8 8h10.4M3.8 5.2h8.4M3.8 10.8h8.4" stroke="currentColor" stroke-width=".9"/>'),
    /* 声音：喇叭 + 声波 */
    sound:S('<path d="M2.6 6h2.2L8 3.2v9.6L4.8 10H2.6z" fill="none" stroke="currentColor" stroke-width="1.3"/>'+
      '<path d="M10.2 5.4a3.4 3.4 0 0 1 0 5.2M12 3.8a5.6 5.6 0 0 1 0 8.4" fill="none" stroke="currentColor" stroke-width="1.1"/>'),
    /* 离线 / 警告 */
    warn:S('<path d="M8 2.2L14 13.2H2z" fill="none" stroke="currentColor" stroke-width="1.4"/>'+
      '<path d="M8 6v3.6" stroke="currentColor" stroke-width="1.6"/><circle cx="8" cy="11.4" r=".9" fill="currentColor"/>'),
    /* 时间：时钟 */
    clock:S('<circle cx="8" cy="8" r="5.6" fill="none" stroke="currentColor" stroke-width="1.4"/>'+
      '<path d="M8 4.4v3.8l2.6 1.7" fill="none" stroke="currentColor" stroke-width="1.3"/>'),
    /* 铅笔：编辑 / 备注 */
    pencil:S('<path d="M2.6 13.4l1.1-3.5 7.7-7.7 2.4 2.4-7.7 7.7z" fill="none" stroke="currentColor" stroke-width="1.4"/>'+
      '<path d="M9.6 3.9l1.1-1.1a1.1 1.1 0 0 1 1.6 1.6l-1.1 1.1" fill="none" stroke="currentColor" stroke-width="1.4"/>'+
      '<path d="M2.6 13.4l3.4-.9" stroke="currentColor" stroke-width="1.1" opacity=".65"/>'),
    /* 晴 */
    sun:S('<circle cx="8" cy="8" r="3.1" fill="none" stroke="currentColor" stroke-width="1.4"/>'+
      '<path d="M8 .8v1.8M8 13.4v1.8M.8 8h1.8M13.4 8h1.8M3.1 3.1l1.3 1.3M11.6 11.6l1.3 1.3M12.9 3.1l-1.3 1.3M4.4 11.6L3.1 12.9" stroke="currentColor" stroke-width="1.1"/>'),
    /* 多云 */
    cloud:S('<path d="M4.4 12.2h7.2a2.6 2.6 0 0 0 .2-5.2 3.4 3.4 0 0 0-6.4-1A3 3 0 0 0 4.4 12.2z" fill="none" stroke="currentColor" stroke-width="1.3"/>'),
    /* 下雨 */
    rain:S('<path d="M4.6 9.6h7a2.4 2.4 0 0 0 .1-4.8 3.2 3.2 0 0 0-6-1A2.8 2.8 0 0 0 4.6 9.6z" fill="none" stroke="currentColor" stroke-width="1.2"/>'+
      '<path d="M5 12v2M8 11.6v2.4M11 12v2" stroke="currentColor" stroke-width="1.2"/>'),
    /* 雷雨 */
    storm:S('<path d="M4.6 8.8h7a2.4 2.4 0 0 0 .1-4.8 3.2 3.2 0 0 0-6-1A2.8 2.8 0 0 0 4.6 8.8z" fill="none" stroke="currentColor" stroke-width="1.2"/>'+
      '<path d="M8.8 8.6l-2.4 3.4h1.8l-.6 2 2.6-3.2h-1.8z" fill="currentColor"/>'),
    /* 雪：六角雪花，六根主枝等长、末端带对称分叉（同一根旋转 0/60/120 得到） */
    snow:S('<g fill="none" stroke="currentColor" stroke-width="1.15" stroke-linecap="round" stroke-linejoin="round">'+
      '<path d="M8 1.8V14.2M8 4.3L6.6 2.9M8 4.3l1.4-1.4M8 11.7l-1.4 1.4M8 11.7l1.4 1.4"/>'+
      '<path d="M8 1.8V14.2M8 4.3L6.6 2.9M8 4.3l1.4-1.4M8 11.7l-1.4 1.4M8 11.7l1.4 1.4" transform="rotate(60 8 8)"/>'+
      '<path d="M8 1.8V14.2M8 4.3L6.6 2.9M8 4.3l1.4-1.4M8 11.7l-1.4 1.4M8 11.7l1.4 1.4" transform="rotate(120 8 8)"/>'+
      '</g>'),
    /* 图钉 */
    pin:S('<path d="M8 14.4S3.6 9.8 3.6 7a4.4 4.4 0 0 1 8.8 0c0 2.8-4.4 7.4-4.4 7.4z" fill="none" stroke="currentColor" stroke-width="1.3"/>'+
      '<circle cx="8" cy="7" r="1.7" fill="currentColor"/>'),
    /* 万圣：南瓜 */
    pumpkin:S('<path d="M8 3.4c3 0 5.2 2 5.2 4.7S11 13 8 13s-5.2-2.2-5.2-4.9S5 3.4 8 3.4z" fill="none" stroke="currentColor" stroke-width="1.3"/>'+
      '<path d="M8 3.6c-1.3 1-2.1 2.6-2.1 4.5s.8 3.5 2.1 4.5M8 3.6c1.3 1 2.1 2.6 2.1 4.5s-.8 3.5-2.1 4.5" fill="none" stroke="currentColor" stroke-width=".9"/>'+
      '<path d="M8 3.4V1.9c0-.7.6-1 1.3-.8" fill="none" stroke="currentColor" stroke-width="1.1"/>'),
    /* 小屋 */
    home:S('<path d="M2.4 7.4L8 2.6l5.6 4.8" fill="none" stroke="currentColor" stroke-width="1.4"/>'+
      '<path d="M3.8 6.6v6.8h8.4V6.6" fill="none" stroke="currentColor" stroke-width="1.3"/>'+
      '<rect x="6.8" y="9.6" width="2.4" height="3.8" fill="currentColor"/>'),
    /* 家具：沙发 */
    sofa:S('<rect x="2.4" y="6.8" width="11.2" height="4.6" rx="1" fill="none" stroke="currentColor" stroke-width="1.3"/>'+
      '<path d="M2.4 9.2V6.2a1.2 1.2 0 0 1 2.4 0v.6h6.4v-.6a1.2 1.2 0 0 1 2.4 0v3" fill="none" stroke="currentColor" stroke-width="1.1"/>'+
      '<path d="M3.8 11.4v1.6M12.2 11.4v1.6" stroke="currentColor" stroke-width="1.2"/>'),
    /* 面包店：店面 + 遮阳篷 */
    shop:S('<path d="M3 6l1.2-3.4h7.6L13 6z" fill="currentColor" opacity=".85"/>'+
      '<path d="M2.8 6h10.4v7.4H2.8z" fill="none" stroke="currentColor" stroke-width="1.2"/>'+
      '<rect x="6.2" y="8.4" width="3.6" height="5" fill="none" stroke="currentColor" stroke-width="1.1"/>'),
    /* 背包 / 提袋 */
    bag:S('<path d="M3.4 5.6h9.2l-.8 8H4.2z" fill="none" stroke="currentColor" stroke-width="1.3"/>'+
      '<path d="M5.6 5.6V4.8a2.4 2.4 0 0 1 4.8 0v.8" fill="none" stroke="currentColor" stroke-width="1.1"/>'),
    /* 标签：吊牌 */
    tag:S('<path d="M2.4 2.4h5.4l6 6-5.4 5.4-6-6V2.4z" fill="none" stroke="currentColor" stroke-width="1.3"/>'+
      '<circle cx="5.4" cy="5.4" r="1.1" fill="currentColor"/>'),
    /* 存档槽：老虎机 */
    slot:S('<rect x="2" y="4.2" width="9.8" height="8.2" rx=".8" fill="none" stroke="currentColor" stroke-width="1.3"/>'+
      '<rect x="3.4" y="5.8" width="1.9" height="3" fill="currentColor" opacity=".8"/>'+
      '<rect x="5.9" y="5.8" width="1.9" height="3" fill="currentColor" opacity=".8"/>'+
      '<rect x="8.4" y="5.8" width="1.9" height="3" fill="currentColor" opacity=".8"/>'+
      '<path d="M13.2 3v7.2" stroke="currentColor" stroke-width="1.3"/><circle cx="13.2" cy="2.2" r="1" fill="currentColor"/>'),
    /* 信件 */
    mail:S('<rect x="2" y="3.8" width="12" height="8.4" fill="none" stroke="currentColor" stroke-width="1.3"/>'+
      '<path d="M2.4 4.4L8 8.6l5.6-4.2" fill="none" stroke="currentColor" stroke-width="1.1"/>'),
    /* 门 */
    door:S('<path d="M3.6 13.8V2.8h8.8v11" fill="none" stroke="currentColor" stroke-width="1.3"/>'+
      '<path d="M2.2 13.8h11.6" stroke="currentColor" stroke-width="1.4"/>'+
      '<circle cx="10.6" cy="8.4" r=".9" fill="currentColor"/>'),
    /* 地图 */
    map:S('<path d="M2.2 4.2l3.6-1.4 4.4 1.4 3.6-1.4v9l-3.6 1.4-4.4-1.4-3.6 1.4z" fill="none" stroke="currentColor" stroke-width="1.2"/>'+
      '<path d="M5.8 2.8v9.2M10.2 4.2v9.2" stroke="currentColor" stroke-width=".9"/>'+
      '<path d="M4 6.6c1.6.8 3.2-1 4.8-.2s2.4.4 3.2.2" fill="none" stroke="currentColor" stroke-width="1" opacity=".75"/>'),
    /* 旅行手记 */
    journal:S('<rect x="3" y="2.2" width="9.6" height="11.6" fill="none" stroke="currentColor" stroke-width="1.3"/>'+
      '<path d="M5.6 2.2v11.6" stroke="currentColor" stroke-width="1"/>'+
      '<path d="M7.4 5.4h3.2M7.4 8h3.2M7.4 10.6h2.2" stroke="currentColor" stroke-width=".9"/>'),
    /* 自由：飞鸟 */
    dove:S('<path d="M2.2 8.6c2.4 0 4-1.2 5-2.8 1-1.6 2.4-2.6 4.2-2.6 1.6 0 2.6.8 2.6 2.2 0 3.4-2.8 6-6.4 6-2.6 0-4.6-1.6-5.4-2.8z" fill="none" stroke="currentColor" stroke-width="1.3"/>'+
      '<path d="M6.4 6.2L2.6 4.4M9.6 9.2l.6 2.6" stroke="currentColor" stroke-width="1"/>'),
    /* 飞行：羽翼 */
    wing:S('<path d="M14 2.6C8.8 2.2 4.2 5 2 10.2c3.8-.2 7.6-2.4 9.8-5.8" fill="none" stroke="currentColor" stroke-width="1.4"/>'+
      '<path d="M5.2 8.6l4.4-1M4 10.8l3.6-.8" stroke="currentColor" stroke-width=".9"/>'),
    /* 爆炸 */
    boom:S('<path d="M8 1.4l1 3 2.8-1.4-1.4 2.8 3 1-3 1 1.4 2.8-2.8-1.4-1 3-1-3-2.8 1.4 1.4-2.8-3-1 3-1-1.4-2.8 2.8 1.4z" fill="currentColor"/>'),
    /* 翻牌：两张牌 */
    cards:S('<rect x="2.4" y="4.6" width="6" height="8.6" rx=".7" fill="none" stroke="currentColor" stroke-width="1.1" transform="rotate(-9 5.4 8.9)"/>'+
      '<rect x="7" y="2.8" width="6.4" height="9.2" rx=".7" fill="none" stroke="currentColor" stroke-width="1.4" transform="rotate(8 10.2 7.4)"/>'+
      '<path d="M10 6.2l1 1.6-1 1.6-1-1.6z" fill="currentColor"/>'),
    /* 卷轴 */
    scroll:S('<rect x="2.6" y="2.8" width="10.8" height="2.2" rx="1.1" fill="currentColor" opacity=".85"/>'+
      '<path d="M3.8 5v7.8h8.4V5" fill="none" stroke="currentColor" stroke-width="1.2"/>'+
      '<path d="M5.8 7.6h4.4M5.8 10h4.4" stroke="currentColor" stroke-width=".9"/>'),
    /* 对话 */
    chat:S('<path d="M2.4 3.6h11.2v7.6H8.4L5 13.8v-2.6H2.4z" fill="none" stroke="currentColor" stroke-width="1.3"/>'+
      '<path d="M5.2 6.4h5.6M5.2 8.6h3.6" stroke="currentColor" stroke-width=".9"/>'),
    /* 手柄 */
    gamepad:S('<path d="M3.2 6.2h9.6c1.2 0 2 1 1.8 2.2l-.9 3.4c-.2.9-1.3 1.2-2 .6l-1.4-1.2H5.7l-1.4 1.2c-.7.6-1.8.3-2-.6l-.9-3.4C1.2 7.2 2 6.2 3.2 6.2z" fill="none" stroke="currentColor" stroke-width="1.2"/>'+
      '<path d="M4 8v2M3 9h2" stroke="currentColor" stroke-width="1.4"/>'+
      '<circle cx="10.6" cy="8.6" r=".7" fill="currentColor"/><circle cx="12.2" cy="9.8" r=".7" fill="currentColor"/>'),
    /* 垃圾桶 */
    trash:S('<path d="M3.4 4.6h9.2M6 4.6V2.8h4v1.8M4.6 4.6l.6 9h5.6l.6-9" fill="none" stroke="currentColor" stroke-width="1.3"/>'+
      '<path d="M6.6 7v4M9.4 7v4" stroke="currentColor" stroke-width=".9"/>'),
    /* 齿轮 */
    gear:S('<circle cx="8" cy="8" r="2.4" fill="none" stroke="currentColor" stroke-width="1.3"/>'+
      '<path d="M8 1.4v2M8 12.6v2M1.4 8h2M12.6 8h2M3.3 3.3l1.4 1.4M11.3 11.3l1.4 1.4M12.7 3.3l-1.4 1.4M4.7 11.3L3.3 12.7" stroke="currentColor" stroke-width="1.3"/>'),
    /* 存档：软盘 */
    save:S('<path d="M2.8 2.6h8.2l2.2 2.2v8.6H2.8z" fill="none" stroke="currentColor" stroke-width="1.3"/>'+
      '<rect x="5" y="2.6" width="4.6" height="3" fill="currentColor"/>'+
      '<rect x="4.4" y="8.4" width="7.2" height="5" fill="none" stroke="currentColor" stroke-width="1.1"/>'),
    /* 复制：剪贴板 */
    clip:S('<rect x="3.4" y="2.8" width="9.2" height="11.2" rx=".8" fill="none" stroke="currentColor" stroke-width="1.3"/>'+
      '<rect x="5.8" y="1.4" width="4.4" height="2.4" rx=".5" fill="currentColor"/>'+
      '<path d="M5.6 6.4h4.8M5.6 8.8h4.8M5.6 11.2h3" stroke="currentColor" stroke-width=".9"/>'),
    /* 文件夹 */
    folder:S('<path d="M2.2 3.6h4.2l1.6 2h7.8v8.6H2.2z" fill="none" stroke="currentColor" stroke-width="1.3"/>'+
      '<path d="M2.2 6.6h12" stroke="currentColor" stroke-width="1"/>'),
    /* 包裹 */
    box:S('<rect x="2.2" y="5" width="11.6" height="8.4" fill="none" stroke="currentColor" stroke-width="1.3"/>'+
      '<path d="M2.2 5l2-2.4h7.6l1.8 2.4" fill="none" stroke="currentColor" stroke-width="1.2"/>'+
      '<rect x="6.6" y="5" width="2.8" height="8.4" fill="currentColor" opacity=".7"/>'),
    /* 手机 */
    phone:S('<rect x="4.6" y="1.3" width="6.8" height="13.4" rx="1.3" fill="none" stroke="currentColor" stroke-width="1.3"/>'+
      '<rect x="6.9" y="2.7" width="2.2" height=".9" rx=".45" fill="currentColor" opacity=".65"/>'+
      '<circle cx="8" cy="12.3" r=".8" fill="currentColor"/>'),
    /* 上传 / 下载 */
    upload:S('<path d="M3 9.8v4h10v-4" fill="none" stroke="currentColor" stroke-width="1.3"/>'+
      '<path d="M8 10.8V2.2M4.9 5.3L8 2.2l3.1 3.1" stroke="currentColor" stroke-width="1.4"/>'),
    download:S('<path d="M3 9.8v4h10v-4" fill="none" stroke="currentColor" stroke-width="1.3"/>'+
      '<path d="M8 2.2v8.6M4.9 7.7L8 10.8l3.1-3.1" stroke="currentColor" stroke-width="1.4"/>'),
    /* 百巴箱：钓竿 / 扫帚 / 骰子 / 地铁 */
    rod:S('<path d="M2.2 2.2l8.8 6.8" stroke="currentColor" stroke-width="2"/>'+
      '<path d="M11 9v2.2" stroke="currentColor" stroke-width="1.2"/>'+
      '<path d="M11 11.2a2.2 2.2 0 1 1-4.4 0" fill="none" stroke="currentColor" stroke-width="1.2"/>'+
      '<path d="M1.8 1.8l2 1.5" stroke="currentColor" stroke-width="1.6"/>'),
    broom:S('<path d="M11.2 1.6L7.6 6.9" stroke="currentColor" stroke-width="1.8"/>'+
      '<path d="M3 6.4h7.6l-1.2 3.6H4.2z" fill="currentColor" opacity=".9"/>'+
      '<path d="M4.4 10l-.9 3.6M6.2 10l-.6 3.8M8 10v3.8M9.8 10l.6 3.8" stroke="currentColor" stroke-width="1"/>'),
    dice:S('<rect x="2.4" y="2.4" width="11.2" height="11.2" rx="2.1" fill="none" stroke="currentColor" stroke-width="1.5"/>'+
      '<circle cx="5.1" cy="5.1" r="1.15" fill="currentColor"/><circle cx="8" cy="8" r="1.15" fill="currentColor"/>'+
      '<circle cx="10.9" cy="10.9" r="1.15" fill="currentColor"/>'),
    metro:S('<rect x="3.2" y="2.6" width="9.6" height="8.6" rx="2.2" fill="none" stroke="currentColor" stroke-width="1.3"/>'+
      '<rect x="4.8" y="4.3" width="2.5" height="2.2" rx=".5" fill="currentColor" opacity=".7"/>'+
      '<rect x="8.7" y="4.3" width="2.5" height="2.2" rx=".5" fill="currentColor" opacity=".7"/>'+
      '<path d="M4.4 13.4l1.6-2.4M11.6 13.4l-1.6-2.4" stroke="currentColor" stroke-width="1.1"/>'+
      '<path d="M3.6 11.2h8.8" stroke="currentColor" stroke-width="1.1"/>'),
    /* 春：幼苗 */
    sprout:S('<path d="M8 13.6V6.6" fill="none" stroke="currentColor" stroke-width="1.3"/>'+
      '<path d="M8 8.4c-2.6 0-4.4-1.6-4.6-4 2.8-.2 4.6 1.2 4.6 4z" fill="none" stroke="currentColor" stroke-width="1.2"/>'+
      '<path d="M8 7c2.4 0 4.2-1.4 4.4-3.8-2.6-.2-4.4 1.2-4.4 3.8z" fill="none" stroke="currentColor" stroke-width="1.2"/>'+
      '<path d="M5.6 13.6h4.8" stroke="currentColor" stroke-width="1.2"/>'),
    /* 秋：枫叶（OpenMoji 枫叶轮廓，实心填充，含叶柄） */
    leafFall:S('<svg viewBox="0 0 72 72" x="0" y="0" width="16" height="16">'+
      '<path fill="currentColor" stroke="currentColor" stroke-width=".9" stroke-linejoin="round" d="M36.0441,10.9064c3.6923,4.6154,5.5385,8.3077,6.4615,15.6923c0.4173,3.3383,0,5.5385-0.2838,7.9244 c0,0,11.32-9.7705,18.7047-7.0013c0,0-6.4615,6.4615-7.3846,9.2308c-0.9231,2.7692-2.7692,6.4615-6.4615,6.4615 c0,0,0,4.6154,10.1539,2.7692c0,0-6.4615,10.1539-17.5385,5.5385c0,0-1.8462,0.9231-1.8462,7.3846h-0.9231h-1.7648h-0.9231 c0-6.4615-1.8462-7.3846-1.8462-7.3846c-11.0769,4.6154-17.5385-5.5385-17.5385-5.5385 c10.1538,1.8462,10.1538-2.7692,10.1538-2.7692c-3.6923,0-5.5385-3.6923-6.4615-6.4615c-0.9231-2.7692-7.3846-9.2308-7.3846-9.2308 c7.3846-2.7692,18.7047,7.0013,18.7047,7.0013c-0.2838-2.3859-0.7011-4.5861-0.2838-7.9244 C30.5056,19.2141,32.3518,15.5218,36.0441,10.9064z"/></svg>'),
    /* 森林：松树 */
    pine:S('<path d="M8 1.6l3.4 4.2H9.2l3.2 4H10.2l2.8 4H3l2.8-4H3.6l3.2-4H4.6z" fill="currentColor" opacity=".9"/>'+
      '<rect x="7.2" y="13.2" width="1.6" height="1.2" fill="currentColor"/>'),
    /* 桃源：小木屋 */
    cottage:S('<path d="M2.6 7.6L8 3l5.4 4.6" fill="none" stroke="currentColor" stroke-width="1.3"/>'+
      '<path d="M3.8 7v6.4h8.4V7" fill="none" stroke="currentColor" stroke-width="1.2"/>'+
      '<rect x="6.8" y="9.6" width="2.4" height="3.8" fill="currentColor"/>'+
      '<path d="M10.6 3.6v-1.8h1.4v3" fill="none" stroke="currentColor" stroke-width="1"/>'),
    /* 秘境：水晶簇 */
    crystal:S('<path d="M8 1.4l3.1 5.2L8 14.6 4.9 6.6z" fill="none" stroke="currentColor" stroke-width="1.2"/>'+
      '<path d="M4.9 6.6h6.2M8 1.4v13.2M6.3 3.6L5 6.6M9.7 3.6l1.3 3" stroke="currentColor" stroke-width=".8"/>'+
      '<path d="M3.2 7.4l1.5 2.4-1.5 2.4-1.4-2.4z" fill="none" stroke="currentColor" stroke-width="1"/>'+
      '<path d="M12.8 8.6l1.4 2.2-1.4 2.2-1.3-2.2z" fill="none" stroke="currentColor" stroke-width="1"/>'),
    /* 枯寂：像素枯树 */
    pixel:S('<rect x="6.6" y="4.6" width="2.8" height="9" fill="currentColor"/>'+
      '<rect x="3.8" y="7.2" width="4.2" height="1.4" fill="currentColor"/>'+
      '<rect x="2.6" y="4.4" width="3" height="1.4" fill="currentColor"/>'+
      '<rect x="2.6" y="4.4" width="1.4" height="2.8" fill="currentColor"/>'+
      '<rect x="9.6" y="8.6" width="4" height="1.4" fill="currentColor"/>'+
      '<rect x="11.2" y="9.4" width="1.4" height="2.8" fill="currentColor"/>'+
      '<rect x="5" y="1.4" width="1.2" height="1.2" fill="currentColor" opacity=".45"/>'+
      '<rect x="10.2" y="2" width="1.2" height="1.2" fill="currentColor" opacity=".45"/>'+
      '<rect x="13.4" y="3.6" width="1.2" height="1.2" fill="currentColor" opacity=".3"/>'+
      '<rect x="1.6" y="9.2" width="1.2" height="1.2" fill="currentColor" opacity=".3"/>'+
      '<rect x="2.2" y="13.4" width="11.6" height="1.2" fill="currentColor"/>'),
    /* 小镇：连排房屋 */
    houses:S('<path d="M1.2 7.2h4.4L3.4 4.4z" fill="currentColor"/>'+
      '<path d="M1.8 7.2v6.2h3.2V7.2" fill="none" stroke="currentColor" stroke-width="1"/>'+
      '<rect x="2.9" y="10.8" width="1.2" height="2.6" fill="currentColor"/>'+
      '<path d="M4.8 5.4h5l-2.5-2.8z" fill="currentColor"/>'+
      '<path d="M5.4 5.4v8h3.8v-8" fill="none" stroke="currentColor" stroke-width="1.1"/>'+
      '<rect x="6.6" y="10.6" width="1.4" height="2.8" fill="currentColor"/>'+
      '<path d="M9.2 7.4h5l-2.5-2.6z" fill="currentColor"/>'+
      '<path d="M9.8 7.4v6h3.8v-6" fill="none" stroke="currentColor" stroke-width="1"/>'+
      '<rect x="10.5" y="9" width="1.4" height="1.4" fill="currentColor"/>'+
      '<path d="M.6 13.4h14.8" stroke="currentColor" stroke-width="1.2"/>'),
    /* 夜市：灯笼 */
    lantern:S('<path d="M8 1v2.4" stroke="currentColor" stroke-width="1.1"/>'+
      '<rect x="5.4" y="3.4" width="5.2" height="1.1" fill="currentColor"/>'+
      '<path d="M6.2 4.5h3.6c.9 1 1.3 2.2 1.3 3.7s-.4 2.7-1.3 3.7H6.2c-.9-1-1.3-2.2-1.3-3.7s.4-2.7 1.3-3.7z" fill="none" stroke="currentColor" stroke-width="1.3"/>'+
      '<path d="M6.8 5.4c-.6 1.5-.6 4.4 0 6M9.2 5.4c.6 1.5.6 4.4 0 6" fill="none" stroke="currentColor" stroke-width=".8" opacity=".7"/>'+
      '<rect x="6" y="11.9" width="4" height="1.1" fill="currentColor"/>'+
      '<path d="M8 13v1.4M7.2 14.4h1.6" stroke="currentColor" stroke-width=".9"/>'),
    /* 无月：新月 */
    newmoon:S('<circle cx="8" cy="8" r="5.6" fill="none" stroke="currentColor" stroke-width="1.2"/>'+
      '<path d="M10.4 2.7a5.6 5.6 0 1 0 0 10.6 6.8 6.8 0 0 1 0-10.6z" fill="currentColor"/>'),
    /* 海港：帆船 */
    sailboat:S('<path d="M8 1.8v8.2M8 2.6L12.4 8H8M5 4.4L8 8H5z" fill="none" stroke="currentColor" stroke-width="1.2"/>'+
      '<path d="M3 10.4h10l-1.8 2.4H4.8z" fill="currentColor" opacity=".85"/>'),
    /* 海岛：棕榈 */
    palm:S('<path d="M6.2 14c.6-2.8 1.4-4.8 2.5-6.2" fill="none" stroke="currentColor" stroke-width="2"/>'+
      '<path d="M8.7 5.4c-2.6-.9-4.8-.4-6.1 1 2.4.4 4.6.1 6.1-1z" fill="currentColor"/>'+
      '<path d="M8.7 5.4c-1.6-1.9-3.6-2.4-5.4-1.7 1.6 1.7 3.5 2.1 5.4 1.7z" fill="currentColor"/>'+
      '<path d="M8.7 5.4c.2-2.5-.7-4.3-2.3-5.1.3 2.3 1 4.1 2.3 5.1z" fill="currentColor"/>'+
      '<path d="M8.7 5.4c2.5-.8 4.6-.3 5.8 1.1-2.3.3-4.5-.1-5.8-1.1z" fill="currentColor"/>'+
      '<path d="M8.7 5.4c2.6.6 4.4 2 5 3.8-2.2-.5-4-1.7-5-3.8z" fill="currentColor"/>'+
      '<circle cx="7.8" cy="6.4" r=".75" fill="currentColor"/><circle cx="9" cy="6.9" r=".65" fill="currentColor"/>'+
      '<path d="M2.6 14h10.8" stroke="currentColor" stroke-width="1.2"/>'),
    /* 沉海：断柱 + 浪 */
    column:S('<path d="M5.6 12.6V6.6l1.2-.9 1.4 1 1.4-1 1.2.9v6z" fill="none" stroke="currentColor" stroke-width="1.25"/>'+
      '<path d="M6.8 7.6v4.6M8.2 7.2v5M9.6 7.6v4.6" stroke="currentColor" stroke-width=".7" opacity=".55"/>'+
      '<rect x="4.4" y="12.6" width="7.2" height="1.1" fill="currentColor"/>'+
      '<rect x="3.4" y="13.7" width="9.2" height="1.1" fill="currentColor"/>'+
      '<path d="M1.4 15.1c1-.8 2-.8 3 0M11.6 15.1c1-.8 2-.8 3 0" fill="none" stroke="currentColor" stroke-width=".9" opacity=".65"/>'),
    /* 人鱼：贝壳 + 珍珠 */
    mermaid:S('<path d="M8 14.2C4.6 12.4 2.4 9.4 2.4 6.6c0-.7.6-1.1 1.2-.9 1.2.4 2.2.5 3 .2.6-1.4 2.4-1.6 3.2 0 .8.3 1.8.2 3-.2.6-.2 1.2.2 1.2.9 0 2.8-2.2 5.8-6.6 7.6z" fill="none" stroke="currentColor" stroke-width="1.2"/>'+
      '<path d="M8 14L3.6 6.6M8 14L6 5M8 14V4.4M8 14l2-9M8 14l4.4-7.4" stroke="currentColor" stroke-width=".7" opacity=".55"/>'+
      '<circle cx="8" cy="4.4" r=".9" fill="currentColor" opacity=".85"/>'),
    /* 梦境：番茄 + 月牙 */
    tomatoDream:S('<circle cx="6.6" cy="9.6" r="4.2" fill="none" stroke="currentColor" stroke-width="1.3"/>'+
      '<path d="M6.6 5.4V3.6" stroke="currentColor" stroke-width="1.1"/>'+
      '<path d="M6.6 5.4c-1.5.2-2.6-.1-3.2-.9 1.4-.4 2.5 0 3.2.9z" fill="currentColor"/>'+
      '<path d="M6.6 5.4c1.5.2 2.6-.1 3.2-.9-1.4-.4-2.5 0-3.2.9z" fill="currentColor"/>'+
      '<path d="M13 2.2a2.4 2.4 0 1 0 0 4.8a3 3 0 0 1 0-4.8z" fill="currentColor" opacity=".8"/>'),
    /* 极光：星系 */
    galaxy:S('<path d="M8 2.4a5.6 5.6 0 1 0 5.4 6.8 6.6 6.6 0 0 1-5.4-6.8z" fill="none" stroke="currentColor" stroke-width="1.2"/>'+
      '<circle cx="8" cy="8" r="1.2" fill="currentColor"/>'+
      '<path d="M11.6 2.2l.5 1.2 1.2.5-1.2.5-.5 1.2-.5-1.2-1.2-.5 1.2-.5z" fill="currentColor" opacity=".8"/>'+
      '<circle cx="3.4" cy="12.2" r=".7" fill="currentColor" opacity=".6"/>'),
    /* 遗迹：破拱门 */
    ruins:S('<path d="M2.4 13.4V6.2c0-2 1.6-3.6 3.6-3.6 1.6 0 3 1 3.6 2.4" fill="none" stroke="currentColor" stroke-width="1.3"/>'+
      '<path d="M2.4 9.2h3.4M2.4 6.4h2" stroke="currentColor" stroke-width=".9"/>'+
      '<path d="M9.6 13.4V8.4c0-1.2.8-2 2-2s2 .8 2 2v5" fill="none" stroke="currentColor" stroke-width="1.2"/>'+
      '<path d="M1.6 13.4h12.8" stroke="currentColor" stroke-width="1.3"/>'),
    /* 冰湖：冰块 */
    ice:S('<path d="M8 1.6l5.6 3v7.2L8 14.4l-5.6-2.6V4.6z" fill="none" stroke="currentColor" stroke-width="1.2"/>'+
      '<path d="M2.4 4.6L8 7.4l5.6-2.8M8 7.4v7" stroke="currentColor" stroke-width="1"/>'+
      '<path d="M4.6 6.2l-.8 3.2" stroke="currentColor" stroke-width=".8" opacity=".7"/>'),
    /* 静音：喇叭 + 斜杠 */
    mute:S('<path d="M2.2 6.2h2.2L7 3.6v8.8L4.4 9.8H2.2z" fill="currentColor" opacity=".9"/>'+
      '<path d="M9.4 6.2l4 3.6M13.4 6.2l-4 3.6" stroke="currentColor" stroke-width="1.4"/>'),
    /* 大海：浪 */
    wave:S('<path d="M1.6 5.8c1.3-1.7 2.7-1.7 4 0 1.3 1.7 2.7 1.7 4 0 1.3-1.7 2.7-1.7 4 0" fill="none" stroke="currentColor" stroke-width="1.4"/>'+
      '<path d="M1.6 9c1.3-1.7 2.7-1.7 4 0 1.3 1.7 2.7 1.7 4 0 1.3-1.7 2.7-1.7 4 0" fill="none" stroke="currentColor" stroke-width="1.2"/>'+
      '<path d="M1.6 12.2c1.3-1.7 2.7-1.7 4 0 1.3 1.7 2.7 1.7 4 0 1.3-1.7 2.7-1.7 4 0" fill="none" stroke="currentColor" stroke-width="1"/>'),
    /* 天降事件：蜡烛 / 爱心 / 小花 / 茶杯 / 戒指 / 钥匙 / 彩虹 / 警帽 */
    candle:S('<path d="M8 1.1c1.5 1.6 2.2 2.7 2.2 3.7a2.2 2.2 0 0 1-4.4 0c0-1 .7-2.1 2.2-3.7z" fill="currentColor"/>'+
      '<path d="M8 5.2v1.6" stroke="currentColor" stroke-width="1"/>'+
      '<rect x="5.6" y="6.8" width="4.8" height="7" rx=".8" fill="currentColor" opacity=".92"/>'),
    heart:S('<path d="M8 13.2C4.6 10.6 2.4 8.4 2.4 5.9a3.2 3.2 0 0 1 5.6-2c.7-.9 1.6-1.4 2.5-1.4 1.8 0 3.2 1.4 3.2 3.3 0 2.5-2.2 4.7-5.7 7.4z" fill="none" stroke="currentColor" stroke-width="1.3"/>'),
    flower:S('<circle cx="8" cy="8" r="1.4" fill="currentColor"/>'+
      '<ellipse cx="8" cy="4.5" rx="1.4" ry="1.9" fill="none" stroke="currentColor" stroke-width="1"/>'+
      '<ellipse cx="8" cy="11.5" rx="1.4" ry="1.9" fill="none" stroke="currentColor" stroke-width="1"/>'+
      '<ellipse cx="4.5" cy="8" rx="1.9" ry="1.4" fill="none" stroke="currentColor" stroke-width="1"/>'+
      '<ellipse cx="11.5" cy="8" rx="1.9" ry="1.4" fill="none" stroke="currentColor" stroke-width="1"/>'),
    cup:S('<path d="M3.4 6.4h7.2v3.2a3.6 3.6 0 0 1-7.2 0z" fill="none" stroke="currentColor" stroke-width="1.3"/>'+
      '<path d="M10.6 7.2h1.2a1.6 1.6 0 0 1 0 3.2h-1.2" fill="none" stroke="currentColor" stroke-width="1.1"/>'+
      '<path d="M2.6 12.8h8" stroke="currentColor" stroke-width="1.3"/>'+
      '<path d="M5.2 4.6c-.5-.7 .5-1.5 0-2.2M8.6 4.6c-.5-.7 .5-1.5 0-2.2" fill="none" stroke="currentColor" stroke-width=".9" opacity=".6"/>'),
    ring:S('<circle cx="8" cy="9.9" r="3.5" fill="none" stroke="currentColor" stroke-width="1.4"/>'+
      '<path d="M8 2.2l1.9 2.3-1.9 2.2-1.9-2.2z" fill="currentColor"/>'),
    key:S('<circle cx="4.4" cy="8" r="2.5" fill="none" stroke="currentColor" stroke-width="1.4"/>'+
      '<path d="M6.9 8h7.2" stroke="currentColor" stroke-width="1.4"/>'+
      '<path d="M11.4 8v2.2M13.4 8v1.8" stroke="currentColor" stroke-width="1.2"/>'),
    rainbow:S('<path d="M1.9 13.2a6.1 6.1 0 0 1 12.2 0" fill="none" stroke="currentColor" stroke-width="1.7"/>'+
      '<path d="M4.5 13.2a3.5 3.5 0 0 1 7 0" fill="none" stroke="currentColor" stroke-width="1.2"/>'),
    police:S('<path d="M3.4 9.4c0-2.8 2-4.6 4.6-4.6s4.6 1.8 4.6 4.6" fill="none" stroke="currentColor" stroke-width="1.3"/>'+
      '<rect x="2.2" y="9.4" width="11.6" height="1.8" rx=".4" fill="currentColor" opacity=".9"/>'+
      '<path d="M8 2.4l.8 1.7 1.9.2-1.4 1.4.4 1.9-1.7-.9-1.7.9.4-1.9-1.4-1.4 1.9-.2z" fill="none" stroke="currentColor" stroke-width=".9"/>'),
    /* 旅行：纸飞机 / 车票 / 指南针 / 铃铛 / 石头 / 碗 / 解锁 / 放大镜 / 蘑菇 / 盾牌 */
    plane:S('<path d="M1.6 7.4L14.6 2.6 9.2 13l-1.8-4.2-3.8-1.2z" fill="none" stroke="currentColor" stroke-width="1.3"/>'+
      '<path d="M1.6 7.4l6 1.4 7-6.2" fill="none" stroke="currentColor" stroke-width="1.1" opacity=".65"/>'),
    ticket:S('<path d="M2 5.4h12v2.1a1.2 1.2 0 0 0 0 2.4v2.1H2v-2.1a1.2 1.2 0 0 0 0-2.4z" fill="none" stroke="currentColor" stroke-width="1.3"/>'+
      '<path d="M9.4 5.4v.8M9.4 8.2v.8M9.4 11v.8" stroke="currentColor" stroke-width="1" opacity=".75"/>'),
    compass:S('<circle cx="8" cy="8" r="6.2" fill="none" stroke="currentColor" stroke-width="1.4"/>'+
      '<path d="M10.6 5.4L9 9l-3.6 1.6L7 7z" fill="currentColor"/>'),
    bell:S('<path d="M4.4 10.6c0-3.6 1.2-4.5 1.2-6a2.4 2.4 0 0 1 4.8 0c0 1.5 1.2 2.4 1.2 6z" fill="none" stroke="currentColor" stroke-width="1.3"/>'+
      '<path d="M3.2 10.6h9.6" stroke="currentColor" stroke-width="1.4"/>'+
      '<circle cx="8" cy="12.4" r="1" fill="currentColor"/>'),
    stone:S('<path d="M2.6 10.4l1.4-5.4 4.2-2 4.4 2.6 1 4.6-3.2 3-4.9.8z" fill="none" stroke="currentColor" stroke-width="1.3"/>'+
      '<path d="M4 5l3 2.4 2.2-2.2M7 7.4l.4 5.4M11.6 5.6l-.8 6.7" fill="none" stroke="currentColor" stroke-width=".9" opacity=".55"/>'),
    bowl:S('<path d="M2.2 7.4h11.6a5.8 5.8 0 0 1-11.6 0z" fill="currentColor" opacity=".9"/>'+
      '<path d="M1.6 7.4h12.8" stroke="currentColor" stroke-width="1.2"/>'+
      '<path d="M5 5.6c-.6-.9.6-1.5 0-2.4M8 5.6c-.6-.9.6-1.5 0-2.4M11 5.6c-.6-.9.6-1.5 0-2.4" fill="none" stroke="currentColor" stroke-width=".85" opacity=".5"/>'),
    unlock:S('<rect x="3.2" y="7.2" width="9.6" height="6.6" rx=".4" fill="none" stroke="currentColor" stroke-width="1.3"/>'+
      '<path d="M10.8 7.2V5.3a2.6 2.6 0 0 0-5.2 0" fill="none" stroke="currentColor" stroke-width="1.4"/>'+
      '<rect x="7.1" y="9.2" width="1.8" height="2.6" fill="currentColor"/>'),
    search:S('<circle cx="6.8" cy="6.8" r="4.4" fill="none" stroke="currentColor" stroke-width="1.4"/>'+
      '<path d="M10.2 10.2l4 4" stroke="currentColor" stroke-width="1.5"/>'),
    mushroom:S('<path d="M2.2 7.4a5.8 4.6 0 0 1 11.6 0" fill="none" stroke="currentColor" stroke-width="1.4"/>'+
      '<path d="M2.2 7.4h11.6" stroke="currentColor" stroke-width="1.2"/>'+
      '<path d="M6.2 7.4c0 2.6-.4 4.4-.4 5.6h4.4c0-1.2-.4-3-.4-5.6" fill="none" stroke="currentColor" stroke-width="1.2"/>'+
      '<circle cx="5" cy="5" r=".9" fill="currentColor"/><circle cx="10.4" cy="4.6" r=".7" fill="currentColor"/>'),
    shield:S('<path d="M8 1.6l5.2 1.9v4.2c0 3-2.1 5.2-5.2 6.5-3.1-1.3-5.2-3.5-5.2-6.5V3.5z" fill="none" stroke="currentColor" stroke-width="1.4"/>'+
      '<path d="M8 4.4v6.6M5.6 7.2h4.8" stroke="currentColor" stroke-width="1.1" opacity=".6"/>'),
    /* 旅行：人 / 网 / 锚 / 伞 / 火箭 / 风筝 / 棋子 / 骨头 / 贝壳 / 气球 */
    user:S('<circle cx="8" cy="5.2" r="2.4" fill="none" stroke="currentColor" stroke-width="1.3"/>'+
      '<path d="M3.4 13.4c0-2.6 2-4.4 4.6-4.4s4.6 1.8 4.6 4.4" fill="none" stroke="currentColor" stroke-width="1.4"/>'),
    web:S('<circle cx="8" cy="8" r="1" fill="currentColor"/>'+
      '<path d="M8 1.8v12.4M1.8 8h12.4M3.6 3.6l8.8 8.8M12.4 3.6l-8.8 8.8" stroke="currentColor" stroke-width=".85" opacity=".75"/>'+
      '<circle cx="8" cy="8" r="3.2" fill="none" stroke="currentColor" stroke-width=".85"/><circle cx="8" cy="8" r="5.8" fill="none" stroke="currentColor" stroke-width=".85"/>'),
    anchor:S('<circle cx="8" cy="3" r="1.4" fill="none" stroke="currentColor" stroke-width="1.2"/>'+
      '<path d="M8 4.4v8.8M5.2 6h5.6" stroke="currentColor" stroke-width="1.2"/>'+
      '<path d="M2.8 9.2c.5 2.5 2.5 4.2 5.2 4.2s4.7-1.7 5.2-4.2" fill="none" stroke="currentColor" stroke-width="1.3"/>'+
      '<path d="M2.2 9.6l.6-1.6 1.6.4M13.8 9.6l-.6-1.6-1.6.4" fill="none" stroke="currentColor" stroke-width="1.1"/>'),
    umbrella:S('<path d="M1.8 8a6.2 6.2 0 0 1 12.4 0z" fill="currentColor" opacity=".9"/>'+
      '<path d="M8 8v4.4a1.8 1.8 0 0 0 3.6 0" fill="none" stroke="currentColor" stroke-width="1.3"/>'),
    rocket:S('<path d="M8 1.4c2 1.4 3 3.6 3 6.1v2.1H5v-2.1c0-2.5 1-4.7 3-6.1z" fill="none" stroke="currentColor" stroke-width="1.3"/>'+
      '<circle cx="8" cy="6.2" r="1.3" fill="currentColor"/>'+
      '<path d="M5 8.2L2.8 10v2.4l2.2-1.2M11 8.2L13.2 10v2.4l-2.2-1.2" fill="none" stroke="currentColor" stroke-width="1.1"/>'+
      '<path d="M6.8 12.2c0 1 .4 2 1.2 2.6.8-.6 1.2-1.6 1.2-2.6" fill="none" stroke="currentColor" stroke-width="1.1" opacity=".7"/>'),
    kite:S('<path d="M8 1.2l4.8 5.4-4.8 6.2-4.8-6.2z" fill="none" stroke="currentColor" stroke-width="1.3"/>'+
      '<path d="M8 1.2v11.6M3.2 6.6h9.6" stroke="currentColor" stroke-width=".9" opacity=".65"/>'+
      '<path d="M8 12.8c1 1.2-.8 2.2.4 3.2" fill="none" stroke="currentColor" stroke-width=".9" opacity=".6"/>'),
    /* 石纹象棋：国际象棋国王（十字 + 冠底台阶 + 窄腰 + 宽底座） */
    chess:S('<path d="M8 1.1V4.55M6.85 2.15h2.3" fill="none" stroke="currentColor" stroke-width="1" stroke-linecap="round"/>'+
      '<path d="M4.75 7.05C4.75 5.55 6.2 4.6 8 4.6s3.25.95 3.25 2.45L10.5 7.1v.85c-.55.8-.95 1.25-.95 1.8 0 .85.8 1.25 1.4 2.1H5.05c.6-.85 1.4-1.25 1.4-2.1 0-.55-.4-1-.95-1.8V7.1Z" fill="currentColor"/>'+
      '<rect x="3.7" y="11.95" width="8.6" height="1.35" rx=".35" fill="currentColor"/>'),
    /* 五子棋：棋盘网格 + 一颗棋子 */
    gomoku:S('<rect x="2.4" y="2.4" width="11.2" height="11.2" fill="none" stroke="currentColor" stroke-width="1.1" opacity=".55"/>'+
      '<path d="M6.1 2.4v11.2M9.9 2.4v11.2M2.4 6.1h11.2M2.4 9.9h11.2" stroke="currentColor" stroke-width=".8" opacity=".5"/>'+
      '<circle cx="9.9" cy="6.1" r="2" fill="currentColor"/>'),
    bone:S('<circle cx="3.2" cy="3.2" r="1.8" fill="currentColor"/><circle cx="3.2" cy="6" r="1.8" fill="currentColor"/>'+
      '<circle cx="12.8" cy="10" r="1.8" fill="currentColor"/><circle cx="12.8" cy="12.8" r="1.8" fill="currentColor"/>'+
      '<path d="M4.6 4.6l6.8 6.8" stroke="currentColor" stroke-width="1.8"/>'),
    shell:S('<path d="M8 13.2L2.6 6.6a6 6 0 0 1 10.8 0z" fill="none" stroke="currentColor" stroke-width="1.3"/>'+
      '<path d="M8 13.2V3.8M8 13.2l-4-6.2M8 13.2l4-6.2" stroke="currentColor" stroke-width=".85" opacity=".6"/>'),
    balloon:S('<ellipse cx="8" cy="5.8" rx="4" ry="4.4" fill="none" stroke="currentColor" stroke-width="1.3"/>'+
      '<path d="M8 10.2l-.7 1.2h1.4z" fill="currentColor"/>'+
      '<path d="M8 11.6c1 1.2-1 2 .2 3.2" fill="none" stroke="currentColor" stroke-width=".9" opacity=".7"/>'),
    /* 旅行：雪人 / 笑脸 / 爪印 / 鱼 / 小虫 / 圆点 */
    snowman:S('<circle cx="8" cy="9.8" r="3.4" fill="none" stroke="currentColor" stroke-width="1.2"/>'+
      '<circle cx="8" cy="4.8" r="2.4" fill="none" stroke="currentColor" stroke-width="1.2"/>'+
      '<path d="M6 2.6h4M6.6 1.4h2.8" stroke="currentColor" stroke-width="1.2"/>'+
      '<circle cx="7.2" cy="4.4" r=".5" fill="currentColor"/><circle cx="8.8" cy="4.4" r=".5" fill="currentColor"/>'+
      '<path d="M8 5.4v.8" stroke="currentColor" stroke-width=".8"/>'),
    smile:S('<circle cx="8" cy="8" r="6" fill="none" stroke="currentColor" stroke-width="1.3"/>'+
      '<circle cx="5.8" cy="6.6" r=".7" fill="currentColor"/><circle cx="10.2" cy="6.6" r=".7" fill="currentColor"/>'+
      '<path d="M5 9.4c1.8 2 4.2 2 6 0" fill="none" stroke="currentColor" stroke-width="1.1"/>'),
    sad:S('<circle cx="8" cy="8" r="6" fill="none" stroke="currentColor" stroke-width="1.3"/>'+
      '<circle cx="5.8" cy="6.6" r=".7" fill="currentColor"/><circle cx="10.2" cy="6.6" r=".7" fill="currentColor"/>'+
      '<path d="M5 11c1.8-2 4.2-2 6 0" fill="none" stroke="currentColor" stroke-width="1.1"/>'+
      '<path d="M6.2 7.9c.5.5 1.1.5 1.6 0" fill="none" stroke="currentColor" stroke-width=".7" opacity=".7"/>'),
    paw:S('<ellipse cx="8" cy="10.4" rx="3" ry="2.6" fill="currentColor" opacity=".9"/>'+
      '<circle cx="3.8" cy="6.4" r="1.3" fill="currentColor"/><circle cx="6.4" cy="4.6" r="1.3" fill="currentColor"/>'+
      '<circle cx="9.6" cy="4.6" r="1.3" fill="currentColor"/><circle cx="12.2" cy="6.4" r="1.3" fill="currentColor"/>'),
    fish:S('<path d="M2.2 8c2-2.6 4.4-3.8 7-3.8 2.2 0 3.8 1.2 4.6 3.8-1.8 2.6-4.4 3.8-7.4 3.8-1.8 0-3.2-1.3-4.2-3.8z" fill="none" stroke="currentColor" stroke-width="1.3"/>'+
      '<path d="M2.2 8L.8 5.4M2.2 8L.8 10.6" fill="none" stroke="currentColor" stroke-width="1.3"/>'+
      '<circle cx="10.6" cy="6.8" r=".8" fill="currentColor"/>'),
    bug:S('<ellipse cx="8" cy="9" rx="2.8" ry="4" fill="none" stroke="currentColor" stroke-width="1.3"/>'+
      '<circle cx="8" cy="4.2" r="1.6" fill="currentColor"/>'+
      '<path d="M5.2 6.4L2.8 4.8M5.2 9.4H2.4M5.4 12.2L3.2 13.8M10.8 6.4l2.4-1.6M10.8 9.4h2.8M10.6 12.2l2.2 1.6" stroke="currentColor" stroke-width=".9" opacity=".8"/>'+
      '<path d="M6.8 2.6L5.4 1.2M9.2 2.6l1.4-1.4" stroke="currentColor" stroke-width=".9"/>'),
    dot:S('<circle cx="8" cy="8" r="3.4" fill="currentColor"/>'),
    basket:S('<path d="M2.4 6.2h11.2l-1.5 7.4H3.9z" fill="none" stroke="currentColor" stroke-width="1.2"/>'+
      '<rect x="2.4" y="5.2" width="11.2" height="1.6" fill="currentColor"/>'+
      '<path d="M5.6 5.2a2.4 2.4 0 0 1 4.8 0" fill="none" stroke="currentColor" stroke-width="1.2"/>'+
      '<rect x="5.4" y="7.6" width="1" height="5" fill="currentColor"/><rect x="9.6" y="7.6" width="1" height="5" fill="currentColor"/><rect x="3.4" y="9.6" width="9.2" height="1" fill="currentColor"/>'),
    sunrise:S('<rect x="1.8" y="12.6" width="12.4" height="1.4" fill="currentColor"/>'+
      '<circle cx="8" cy="6.4" r="2.9" fill="none" stroke="currentColor" stroke-width="1.3"/>'+
      '<rect x="7.1" y="1.1" width="1.8" height="2" fill="currentColor"/><rect x="3.1" y="5.5" width="1.8" height="1.8" fill="currentColor"/><rect x="11.1" y="5.5" width="1.8" height="1.8" fill="currentColor"/>'),
    sunset:S('<rect x="1.8" y="6.2" width="12.4" height="1.4" fill="currentColor"/>'+
      '<path d="M4.4 6.2a3.6 3.6 0 0 0 7.2 0" fill="currentColor"/>'+
      '<rect x="3.4" y="9.2" width="9.2" height="1" fill="currentColor" opacity=".8"/><rect x="5.2" y="11.2" width="5.6" height="1" fill="currentColor" opacity=".8"/><rect x="6.8" y="13.1" width="2.4" height="1" fill="currentColor" opacity=".8"/>'),
    /* 多立绘：两张叠放的画片（后张露出右上角，前张带一枚星点），图鉴「共 n 张立绘」角标用 */
    arts:S('<path d="M4.9 5.3V3.4c0-.66.54-1.2 1.2-1.2h6.3c.66 0 1.2.54 1.2 1.2v6.3c0 .66-.54 1.2-1.2 1.2h-1.2" fill="none" stroke="currentColor" stroke-width="1.15" stroke-linecap="round" opacity=".55"/>'+
      '<rect x="2.4" y="6.1" width="8.3" height="7.6" rx="1.2" fill="none" stroke="currentColor" stroke-width="1.3"/>'+
      '<path d="M6.55 8l.5 1.4 1.4.5-1.4.5-.5 1.4-.5-1.4-1.4-.5 1.4-.5z" fill="currentColor"/>')
  });

  /* 生成 <i class="ico">…</i>；cls 传 'only' 时不带右侧间距；theme 传 'warm' / 'cool' / 'neon' / 'tetris' / 'index' 切换主题 */
  function icon(name,cls,theme){
    var set=themeOf(theme);
    return '<i class="ico'+(cls?' '+cls:'')+'">'+(set[name]||'')+'</i>';
  }
  /* 只要裸 SVG（用于容器内部直接塞图形） */
  function svg(name,theme){
    return themeOf(theme)[name]||'';
  }
  function themeOf(theme){
    if(theme==='warm') return WARM_ICONS;
    if(theme==='cool') return COOL_ICONS;
    if(theme==='neon') return NEON_ICONS;
    if(theme==='tetris') return TETRIS_ICONS;
    if(theme==='index') return INDEX_ICONS;
    return ICONS;
  }
  /* 给静态骨架里的 [data-ico] 填图标：只换图形，不碰文字，切语言后仍保留 */
  function paintIcons(root,theme){
    var set=themeOf(theme);
    var nodes=(root||document).querySelectorAll('[data-ico]'), i, el, n;
    for(i=0;i<nodes.length;i++){
      el=nodes[i]; n=el.getAttribute('data-ico');
      if(set[n]) el.innerHTML=set[n];
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
    warm:WARM_ICONS,
    cool:COOL_ICONS,
    neon:NEON_ICONS,
    tetris:TETRIS_ICONS,
    index:INDEX_ICONS,
    icon:icon,
    svg:svg,
    paintIcons:paintIcons,
    css:CSS,
    names:Object.keys(ICONS),
    warmNames:Object.keys(WARM_ICONS),
    coolNames:Object.keys(COOL_ICONS),
    neonNames:Object.keys(NEON_ICONS),
    tetrisNames:Object.keys(TETRIS_ICONS),
    indexNames:Object.keys(INDEX_ICONS)
  };
  g.MoonIcons=api;
})(window);
