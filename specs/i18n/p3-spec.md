# i18n P3 专名表 —— 实施方案（待批准）

上级文档：`plan.md`（第三节 P3 条目）。本文件把 P3 细化到「可直接施工」的粒度。
目标文件：`index.html`（单文件，约 900KB）。

## 一、范围与真实条目数

计划里 P3 写的是「约 300」。实际盘点后**共 449 条专名**（计划把特产估成了 30，实为 126；月巴名计划 152，实为 197）：

| 分组 | 数据源 | 条数 | 是否有 id |
|---|---|---|---|
| 月巴名 | `TYPES`（line 3498）+ `TYPES2`（line 3610） | **197** | 有（`id`） |
| 旅行地图 | `TV_DESTS[].n`（line 7724） | 16 | 有（`id`） |
| 旅行区域 | `TV_REGIONS[].n`（line 8935） | 4 | 有（`id`，**与地图 id 重名**） |
| 特产 | `TV_DESTS[].specials[]`（散落 16 张图） | **126** | **无**（中文名即存档键） |
| 皮肤名 | `SKINS[].name`（line 3944） | 21 | 有（`id`） |
| 皮肤主题 | `SKINS[].theme`（仅 16 款地图皮肤有） | 16 | 同上 |
| 皮肤分组 | `SKIN_GROUPS[].n`（line 3936） | 4 | 有（`id`） |
| 成就名 | `ACHS[].n`（line 10035） | 40 | 有（`id`） |
| 便当 | `TV_FOODS[].n`（line 7722） | 4 | 有（键 food1..4） |
| 旅行道具 | `TV_ITEMS[].n`（line 7723） | 5 | 有（键 lamp…） |
| 商店道具名 | `ITEMS[].name`（line 3482） | 4 | 有（`id`） |
| 商店道具描述 | `ITEMS[].desc` | 4 | 同上 |
| 场地名 | `ZONES[].name`（line 3441） | 8 | 按下标 |
| **合计** | | **449 条 × 3 语 ≈ 1347 译句** | |

**明确不做（留给后续阶段）**：
- 月巴简介 152 → P4；作者署名、`condText()` 解锁条件描述 → P4
- 成就描述 `ACHS[].d` → P5
- `FG_LEVELS[].name`（飞行关卡）、`DD_DIFFS[].name`（斗月巴难度）、访客动物 `n` → P7
- 稀有度 R1~R6：照 `I18N_GLOSSARY` 原样不译

## 二、键名方案（单一表 `I18N_BANNY`，全部加前缀防冲突）

`TV_REGIONS.forest`（森林）与 `TV_DESTS.forest`（森林边缘）**同名不同义**，因此不能只用裸 id，统一加前缀：

| 分组 | 键格式 | 例 |
|---|---|---|
| 月巴名 | `<id>` 原样 | `mb_xiaoyue`、`m2_dou`、`huaba` |
| 旅行地图 | `dest_<id>` | `dest_forest` = 森林边缘 |
| 旅行区域 | `reg_<id>` | `reg_forest` = 森林 |
| 特产 | `sp_<中文名>` | `sp_野果` |
| 皮肤名 | `skin_<id>` | `skin_default` |
| 皮肤主题 | `skin_<id>_theme` | `skin_fairy_theme` |
| 皮肤分组 | `grp_<id>` | `grp_forest` |
| 成就名 | `ach_<id>` | `ach_h1` |
| 便当 | `food_<键>` | `food_food3` |
| 旅行道具 | `tvi_<键>` | `tvi_charm` |
| 商店道具名 | `shop_<id>` | `shop_coffee` |
| 商店道具描述 | `shop_<id>_desc` | `shop_coffee_desc` |
| 场地名 | `zone_<下标>` | `zone_0` = 初始庭院 |

表结构沿用现有口径：

```js
const I18N_BANNY={
  mb_xiaoyue:{n:{en:'Little Banny',ja:'ちびバニー',ko:'꼬마버니'}},
  dest_forest:{n:{en:'Forest Edge',ja:'森のほとり',ko:'숲의 가장자리'}},
  sp_野果:{n:{en:'Wild Berry',ja:'野いちご',ko:'야생 베리'}},
  shop_coffee_desc:{d:{en:'…',ja:'…',ko:'…'}},   // 描述用 d 字段
};
```

`$tn(table,id,field,fallback)` 已支持「字符串或 {en,ja,ko}」，无需改动取值函数。

## 三、施工方式（关键决策：就地本地化）

**问题**：专名渲染点约 50+ 处，直接读 `t.name` / `d.n` / `it.n` / `s.name` / `rg.n` / `zd.name`（见下表），逐处改 `$tn()` 既慢又必然漏。

**方案**：新增 `localizeData()`，**把译文写回数据对象自身的 `name` / `n` 字段**，渲染处零改动即自动生效。

```
function localizeData(){
  const L=curLang();
  const heal=(o,zh,tr)=>{ if(o._zhN==null) o._zhN=zh; o.name = $tn(I18N_BANNY, tr.k, 'n', o._zhN); };
  // TYPES/TYPES2：heal(t, t._zhN!=null?t._zhN:t.name, {k:t.id})
  // SKINS：name → skin_<id>；theme → skin_<id>_theme（用 d 字段）
  // TV_DESTS：d.n → dest_<id>
  // TV_REGIONS：rg.n → reg_<id>
  // ITEMS：name → shop_<id>；desc → shop_<id>_desc
  // TV_FOODS / TV_ITEMS：.n → food_/tvi_<key>
  // ZONES：name → zone_<下标>
  // ACHS：n → ach_<id>
}
```

调用点：`init()` 存档加载完成后 1 次 + `applyI18n()` 开头 1 次。
`$tn()` 在中文时直接返回 fallback（= 已存的原中文），所以中文档行为完全不变。

**自愈点**：`_zhN` 一旦记下即为稳定中文原串，来回切语言不会丢原文。

### 3.1 必须改的两处（就地本地化覆盖不了）

1. **`dexCat()`**（line 5990-5994）：按中文名做「春/夏/秋/冬 · 时段 · 天气」聚类排序。名字被译后 `name.indexOf('春')` 会失效 → 把入参改为稳定中文：调用处 `dexCat(a._zhN)`（line 6010-6012 三处）。
2. **特产**：特产用**中文字符串本身**当存档键（`t.specials.indexOf('野果')`）与访客动物 `like:[...]`，**不能就地改**。新增取值函数：

   ```
   function $sp(s){ return $tn(I18N_BANNY,'sp_'+s,'n',s); }
   ```

   替换所有直接输出特产中文串的渲染点（已知：`tvBookHTML` 特产页 line 8976；旅行行囊/仓库/结算/旅行商店中与 `spEmo(s)` 同排处，施工时以 `grep -n "specials\|spEmo("` 定位全量）。存档键与 `like` 数组保持中文不回改。

### 3.2 无需改动、自动生效的渲染点（抽样）

`bookRowsHTML` 5929 `t.name`｜`openFatDetail` 6044｜`openShop` 6072 `it.name` + 5792｜`skinBarHTML` 4113 `s.name`、4128 `g.n皮肤`、4110 `s.theme`｜`updateStatus` 5654 `t.name`｜`bannerName` 5297｜槽位 5706｜`openScene` 5354 / 5326｜旅行 `tvBookHTML` 8957/8961/8972/8975 `rg.n`/`d.n`｜`tvFatPick` 9177｜`tvOpenLetter` 8988 `tp.name`｜飞行 9602｜DD 11321……

## 四、翻译口径（照 `plan.md` 第四节）

- **造词对应**（不音译、不丢字根）：
  - en：`X月巴` → `X Banny`（`小月巴`→`Little Banny`、`尴尬月巴`→`Awkward Banny`）；单字 `X巴` → `Xbanny`（`花巴`→`Flowerbanny`、`心巴`→`Heartbanny`）；活动/主题 → `Christmas Banny`；专有梗保梗（`酒巴`→`Bar Banny`、`抛瓦月巴`→`Power Banny`、`史莱姆巴`→`Slimebanny`、`大巴车`→`Bus Banny`）。
  - ja：`Xバニー`（不留空格）；ko：`X버니`（不留空格）。
  - 皮肤名保留 emoji 前缀（`🌱 春`→`🌱 Spring`）。
- 数字/千分位保留阿拉伯数字；R1~R6 原样。
- 语气：本批全是名/短标签，不存在叙事句；UI 类日文敬体・韩文해요체不涉及（名称为名词短语）。

## 五、重绘钩子（`i18nRelabel()` 增补）

切语言后需刷新的常驻视图：

- 已打开图鉴弹窗 → `openBook()`；已打开商店 → `openShop()`（用 `_lastModalTitle` 判定，其余弹窗重开时自然刷新）。
- 旅行页可见 → `tvRenderAll()`（刷新庭院/室内月巴名）。
- 场地页 → 刷新 `#sceneName` 文本 + `updateSceneBar()`。

## 六、验证

1. **静态解析**：`node -e` 逐 `<script>` `new Function`，期望 `scripts 1 bad 0`（沿用既有校验方式）。
2. **重复键**：脚本统计 `I18N_BANNY` 键，重复 = 0。
3. **浏览器四语回归**（中/en/ja/ko）：图鉴两页 + 画廊、商店、旅行（庭院/室内/图鉴两页/行囊/结算/旅行商店）、场地工具条与场地名、状态栏「✨ 现在有机会」、成就列表、皮肤条（名/主题/分组）——确认专名随语言变化，日/韩无溢出/截断/豆腐块。
4. **存档兼容**：切语言后信件 `cards`、特产 `specials` 仍存中文键，进度不丢。

## 七、需批准事项

1. **条目数按实际 449 施工**（特产 126，而非计划里的 30；月巴名 197，而非 152）；其中「场地名 8」为计划未列、建议一并纳入。
2. **键名加前缀**（§二）——为解决 `reg_forest` / `dest_forest` 等重名。
3. **就地本地化**（§三）——写回数据对象 `name`/`n`，渲染处零改动；仅 `dexCat()` 与特产走例外通道。

产出清单：`index.html`（表 + `localizeData()` + `$sp()` + 3 处钩子）、`specs/i18n/p3-strings.md`（批注用）、`tasks.md`（P3 勾选）。
