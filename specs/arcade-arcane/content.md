# 月巴奥术 · 文案表（content）

> 对应 `plan.md` v0.4 / `data.md` / `glossary.md` / `story.md` · 2026-11-02
> 本文件是**唯一的文案源**。所有键最终进 `TXT.zh`；`en/ja/ko` 本轮留空，回落中文。
> 键命名：`<id>_n`（名称）/ `<id>_d`（描述）。事件为 `q_xx_n`（标题）/ `q_xx_b`（正文）/ `q_xx_a`、`q_xx_c`（两个选项）。

---

## 0. 效果记号（事件/机缘统一用这套）

| 记号 | 含义 | 例 |
|---|---|---|
| `mana:±Nm` | 魔力，正数 = 赚 N 分钟产能 | `mana:+10m` |
| `spell:±Nm` | 咒力，正数 = 赚 N 分钟咒力产能 | `spell:-5m` |
| `focus:±N` | 专注增减 | `focus:+15` |
| `disson:±N` | 杂念层数增减 | `disson:+1` |
| `reagent:±N` | 材料 | `reagent:+5` |
| `page:±N` | 残页 | `page:+2` |
| `credit:±N` | 学分 | `credit:+30` |
| `potion:<id>` | 获得一瓶魔药 | `potion:p_mana` |

**三条硬规则**

1. 每个选项**至少一个正项、至少一个负项**。不写纯赚或纯亏的选项。
2. 负项所需资源不足时，该选项置灰并提示，**绝不允许资源变负**。
3. 幅度全部用「产能分钟数」计价，随进度自动缩放；不写固定百分比。

---

## 1. 命名表

### 1.1 阶位（10）

| key | 文案 |
|---|---|
| realm_0_n | 学徒 |
| realm_1_n | 见习 |
| realm_2_n | 初阶 |
| realm_3_n | 中阶 |
| realm_4_n | 高阶 |
| realm_5_n | 精英 |
| realm_6_n | 大师 |
| realm_7_n | 大法师 |
| realm_8_n | 贤者 |
| realm_9_n | 大魔法师 |

### 1.2 姿态（3）

| key | 文案 | 说明 |
|---|---|---|
| pon_zuo_n | 冥想 | 魔力 −15%，咒力 +60%，专注恢复 +50% |
| pon_tu_n | 咏唱 | 魔力 +60%，咒力 −15%，施法 +25% |
| pon_you_n | 游历 | 魔力 −30%，咒力 −30%，远征 −50%，事件 +50% |

### 1.3 学院（6）+ 院传法术（6）

| key | 文案 |
|---|---|
| s_verdant_n | 翠庭学院 |
| s_crimson_n | 赤炉结社 |
| s_deepwell_n | 深潭塔 |
| s_stonehold_n | 磐石堡 |
| s_starlight_n | 星辉塔 |
| s_bany_n | 月巴之塔 |
| s_verdant_zhen_n | 长青法典 |
| s_crimson_zhen_n | 赤焰法典 |
| s_deepwell_zhen_n | 静水法典 |
| s_stonehold_zhen_n | 不动法典 |
| s_starlight_zhen_n | 星轨法典 |
| s_bany_zhen_n | 自在法典 |

### 1.4 职称（4）

| key | 文案 |
|---|---|
| rank_0_n | 旁听生 |
| rank_1_n | 学员 |
| rank_2_n | 研究员 |
| rank_3_n | 首席 |

### 1.5 法师塔设施（6）

| key | 文案 | 说明 |
|---|---|---|
| c_manapool_n | 魔力池 | 魔力 +8%/级 |
| c_mat_n | 冥想垫 | 咒力 +8%/级 |
| c_mirror_n | 星镜 | 离线效率 +1.5%/级 |
| c_alembic_n | 炼金台 | 魔药效果与时长 +6%/级 |
| c_library_n | 书库 | 法术效果 +3%/级 |
| c_ward_n | 守护法阵 | 晋级 +0.75pp/级，杂念时长 −3%/级 |

### 1.6 法术品阶（4）

| key | 文案 |
|---|---|
| tq_white_n | 白阶 |
| tq_blue_n | 蓝阶 |
| tq_purple_n | 紫阶 |
| tq_gold_n | 金阶 |

### 1.7 法术（24）

| key | 文案 | 系 · 品阶 |
|---|---|---|
| t_mana_white_n | 微光引泉 | 魔力 · 白 |
| t_mana_blue_n | 曼陀罗汲取 | 魔力 · 蓝 |
| t_mana_purple_n | 星海引流 | 魔力 · 紫 |
| t_mana_gold_n | 万源归流 | 魔力 · 金 |
| t_spell_white_n | 初级咒式 | 咒力 · 白 |
| t_spell_blue_n | 三重刻印 | 咒力 · 蓝 |
| t_spell_purple_n | 大咒式·环 | 咒力 · 紫 |
| t_spell_gold_n | 万象咒典 | 咒力 · 金 |
| t_cast_white_n | 指尖火星 | 施法 · 白 |
| t_cast_blue_n | 疾咏法 | 施法 · 蓝 |
| t_cast_purple_n | 双声咏唱 | 施法 · 紫 |
| t_cast_gold_n | 一念成咒 | 施法 · 金 |
| t_rank_white_n | 稳步口诀 | 晋级 · 白 |
| t_rank_blue_n | 破壁术 | 晋级 · 蓝 |
| t_rank_purple_n | 九重叩门 | 晋级 · 紫 |
| t_rank_gold_n | 逆星之阶 | 晋级 · 金 |
| t_rest_white_n | 静置守则 | 离线 · 白 |
| t_rest_blue_n | 长眠咒 | 离线 · 蓝 |
| t_rest_purple_n | 梦中研习 | 离线 · 紫 |
| t_rest_gold_n | 千年一梦 | 离线 · 金 |
| t_exp_white_n | 轻装行囊 | 远征 · 白 |
| t_exp_blue_n | 寻路罗盘 | 远征 · 蓝 |
| t_exp_purple_n | 遗迹图谱 | 远征 · 紫 |
| t_exp_gold_n | 万界寻珍 | 远征 · 金 |

### 1.8 魔药（5）

| key | 文案 | 说明 |
|---|---|---|
| p_mana_n | 魔力药剂 | 魔力 +70%，20 分钟 |
| p_spell_n | 咒力药剂 | 咒力 +70%，20 分钟 |
| p_ascend_n | 晋阶药剂 | 下次晋级 +12pp |
| p_clarity_n | 清心药剂 | 专注 +40，清 1 层杂念 |
| p_echo_n | 回响药剂 | 立即获得 30 分钟咒力 |

### 1.9 遗迹（4）

| key | 文案 | 时长 · 门槛 |
|---|---|---|
| d_garden_n | 学院后园 | 10 分钟 · 学徒 1 环 |
| d_ravine_n | 霜雾峡谷 | 30 分钟 · 见习 1 环 |
| d_ruins_n | 旧纪元遗迹 | 2 小时 · 初阶 1 环 |
| d_skyfall_n | 浮空废墟 | 6 小时 · 中阶 1 环 |

### 1.10 学徒职务（4）+ 资质（4）

| key | 文案 |
|---|---|
| dr_scribe_n | 书房助手 |
| dr_peer_n | 同窗 |
| dr_forager_n | 采集员 |
| dr_warden_n | 护卫 |
| q_dull_n | 平庸 |
| q_bright_n | 聪慧 |
| q_gifted_n | 天才 |
| q_star_n | 星选 |

### 1.11 试炼（3）

| key | 文案 |
|---|---|
| tb_1_n | 银杯试炼 |
| tb_2_n | 星火试炼 |
| tb_3_n | 无光试炼 |

### 1.12 星图天赋（5）

| key | 文案 | 说明 |
|---|---|---|
| ins_flash_n | 灵光 | 全产出 +10%/级 |
| ins_poise_n | 定力 | 晋级 +5pp/级 |
| ins_starsense_n | 星感 | 离线效率 +5%/级 |
| ins_gift_n | 天赋 | 法术槽 +1 |
| ins_legacy_n | 传承 | 开局从学徒 5 环起 |

### 1.13 成就（30）

| key | 文案 |
|---|---|
| a_first_break_n | 初跃 |
| a_first_fail_n | 差之毫厘 |
| a_layer10_n | 十环 |
| a_layer90_n | 九秩 |
| a_tap1000_n | 千次咏唱 |
| a_tap10k_n | 万次咏唱 |
| a_combo50_n | 一气成咒 |
| a_sect3_n | 三院之客 |
| a_sect_all_n | 走遍五院 |
| a_rank_lord_n | 首席之位 |
| a_book10_n | 半库 |
| a_book24_n | 万象归典 |
| a_tian1_n | 金印初现 |
| a_tian4_n | 金印四壁 |
| a_book_lv10_n | 一咒通神 |
| a_pill5_n | 五药俱全 |
| a_pill100_n | 百炼成液 |
| a_disc1_n | 初次远征 |
| a_disc20_n | 远征常客 |
| a_disc_injury_n | 一身是伤 |
| a_qiyu30_n | 三十传闻 |
| a_jiban10_n | 天降十次 |
| a_daily_all_n | 今日满分 |
| a_disciple4_n | 门下四人 |
| a_disciple_xian_n | 星选入门 |
| a_xinmo5_n | 杂念缠身 |
| a_xinmo_clear_n | 云开月明 |
| a_trib1_n | 一雷过关 |
| a_trib3_n | 三炼皆渡 |
| a_ascend_n | 封圣 |

---

## 2. 叙事文案

### 2.1 开场（5 句，首启逐条淡入，仅一次）

```
intro_1  学院塔顶的雪化了又落，落了又化。
intro_2  你在书库最底层坐了三年，魔力才第一次在指尖亮起来。
intro_3  有人问你学这个做什么。
intro_4  你说，找一样东西。
intro_5  你没有说是什么。
```

> 第 4、5 句是全部剧情的枢轴，后文不得重复。暗线规则见 `story.md`。

### 2.2 晋级文案（9 次 + 回环）

| key | 文案 |
|---|---|
| brk_1_d | 指尖那点光稳住了。你抬头，先往塔下的方向看了一眼。 |
| brk_2_d | 魔力在掌心结成一枚小小的印。它的形状让你想起点什么，你没细想。 |
| brk_3_d | 印里坐着一个很小的你，闭着眼。它睁开眼的第一件事，是抬头往上看。 |
| brk_4_d | 那个小小的你看了你一眼，又闭上了。你记不清在塔里待了多久，但还记得一样东西的颜色。 |
| brk_5_d | 身体轻得像一张纸，风一过就要散。你怕散了就找不到了，于是又坐了回去。 |
| brk_6_d | 散出去的东西一片片回来，拼成你原来的样子。好像少了一小块。你没说什么。 |
| brk_7_d | 塔下的小镇已经小成一个点了。你不再往下看。 |
| brk_8_d | 天上不再落雨，只落雷。你站着，没有躲。 |
| brk_9_d | 最后一道雷过去，云散开一条缝。缝的那一边，很远。 |
| ascend_d | 你站起来，灰落了满肩。塔下有人在喊你的名字，你已经听不见了。你朝着那一点红，又坐了下去。 |

> `ascend_d` 是全篇唯一出现「红」的地方，也是回环机制存在的理由：它不是变强了才重来，它是没找到才重来。

### 2.3 学院描述（6 段，各 3~4 句）

**s_verdant_d｜翠庭学院**

> 整座学院长在活的林子里，走廊是从树上搭过去的。
> 这里不教快，只教慢——魔力比别人厚，专注也回得比别处快。
> 来的人多，说法也多。你在树下听过很多种说法，没有一种是你想听的。

**s_crimson_d｜赤炉结社**

> 半座塔都是炉子，白天冒烟，夜里见火。
> 这里升得最猛，炼金台也便宜，因为炸得多。
> 烧火的人话最多。他们说你这样升不上去。你听完，又往炉里添了一块炭。

**s_deepwell_d｜深潭塔**

> 塔基泡在寒潭里，水面上的星星比天多。
> 深潭的人不争朝夕，他们把魔药泡得久，把觉睡得长。
> 这里安静，安静到你能听见自己心里那点动静。你还是没听清。

**s_stonehold_d｜磐石堡**

> 一整座山被凿成了校舍，走一步响一步。
> 磐石的人不擅长升得快，但从不失手，杂念压得住，阶门也推得开。
> 他们不问你来做什么。他们只问你今天坐了几个钟头。

**s_starlight_d｜星辉塔**

> 塔在云上，人在塔顶，星在图里。
> 这里的人待不住，天天往遗迹里钻，回来时身上带着伤，也带着别处的消息。
> 你听了所有的消息。没有一条有用。

**s_bany_d｜月巴之塔**

> 没有院徽，没有门牌，只有一间朝南的旧屋和一只坐着的月巴。
> 这里什么都不加得特别多，但每一样都加一点。
> 你在这里坐得最久。也没有人问你为什么。

### 2.4 试炼（3 段）

| key | 文案 |
|---|---|
| tb_1_d | 云压下来，第一道雷在云里翻了个身。天不让上去，说得很明白。 |
| tb_2_d | 三道雷，一道比一道近。手要跟上眼睛。 |
| tb_3_d | 最后一道雷落下时，天是白的。你只有三次抬手的机会。 |

---

## 3. 事件（30）

### 3.1 通用（24）

| id | 标题 | 正文 | 选项 A | A 得失 | 选项 B | B 得失 |
|---|---|---|---|---|---|---|
| q_01 | 古橡低语 | 庭院里的老橡树，风过如诵读。 | 坐下听一会儿 | `focus:+15` `spell:+5m` `mana:-4m` | 折一枝当笔 | `reagent:+4` `focus:-5` |
| q_02 | 塔底旧室 | 塔基深处有一间锁着的旧室，桌上叠着一件旧袍。 | 收进柜里 | `credit:+30` `focus:+5` `mana:-5m` | 翻它的口袋 | `spell:+12m` `disson:+1` |
| q_03 | 温室浆果 | 温室角落的浆果半红，透着甜味。 | 摘一把 | `reagent:+3` `mana:+5m` `focus:-3` | 留给鸟 | `focus:+10` `spell:-4m` |
| q_04 | 雨夜长廊 | 雨打得长廊发亮，回宿舍还要走很远。 | 冒雨跑回去 | `spell:+10m` `focus:-8` | 在廊下等雨停 | `focus:+8` `mana:-5m` |
| q_05 | 缺页的古籍 | 借来的古籍中间少了几页，断口很整齐。 | 抄下剩下的 | `page:+2` `spell:-3m` | 拿去烧壁炉 | `mana:+10m` `focus:-3` |
| q_06 | 同窗的结晶 | 同窗塞给你一小块充好魔的结晶。 | 收下 | `mana:+10m` `credit:-15` | 推回去 | `credit:+25` `mana:-3m` |
| q_07 | 云梯商队 | 商队的浮空车停在校门口。 | 用材料换药 | `reagent:-5` `potion:p_mana` | 用魔力买 | `mana:-15m` `potion:p_mana` ×2 |
| q_08 | 月下许愿池 | 池水映着月亮，纹丝不动。 | 抛一枚硬币 | `focus:+12` `mana:+5m` `spell:-3m` | 蹲下看水底 | `spell:+8m` `focus:-5` |
| q_09 | 院长石像 | 院长石像的手指缺了一截。 | 替他补上 | `credit:+20` `focus:+6` `mana:-4m` | 学他的姿势站一会儿 | `spell:+12m` `disson:+1` |
| q_10 | 雷击的塔尖 | 塔尖被雷劈过，焦黑一片。 | 撬一块下来 | `reagent:+6` `focus:-10` | 绕开走 | `focus:+5` `spell:-5m` |
| q_11 | 没下完的棋 | 休息室里摆着一盘没下完的棋。 | 接着下完 | `spell:+10m` `mana:-10m` | 把子收进盒里 | `focus:+10` `credit:-10` |
| q_12 | 走廊上的孩子 | 一个孩子蹲在走廊上，用炭笔画了个圆，涂得很红。 | 教他一个咒式 | `credit:+35` `spell:-8m` | 蹲下来一起看 | `focus:+8` `spell:-5m` |
| q_13 | 雪夜阅览室 | 雪落无声，阅览室只亮着一盏灯。 | 借灯抄书 | `page:+1` `spell:-5m` | 往壁炉添柴 | `focus:+12` `mana:-6m` |
| q_14 | 温室的蜂巢 | 蜂巢挂在架子上，蜜味很重。 | 取蜜做药 | `reagent:+5` `focus:-6` | 绕开走 | `focus:+5` `spell:-4m` |
| q_15 | 旧法杖架 | 储藏室里立着几十根断掉的法杖。 | 抽一根试试 | `spell:+14m` `focus:-12` | 拂去灰 | `credit:+25` `mana:-5m` |
| q_16 | 雾里的脚步 | 雾里有脚步声，和你一个节奏。 | 并肩走 | `mana:+8m` `credit:+10` `spell:-6m` | 停下，让它先走 | `spell:+8m` `focus:-4` |
| q_17 | 无名的墓碑 | 学院后墙外有一座无名的碑。 | 放下一束花 | `focus:+15` `mana:-5m` | 拿走碑前的果 | `reagent:+4` `disson:+1` |
| q_18 | 池底的东西 | 池水很浅，底下有一枚圆的东西，颜色很眼熟。 | 弯腰去看 | `focus:+10` `spell:-4m` | 把手伸进去 | `mana:+14m` `focus:-6` |
| q_19 | 石碑残文 | 石碑上半篇字被青苔盖住了。 | 拓下来 | `page:+2` `mana:-8m` | 照着描一遍 | `spell:+10m` `disson:+1` |
| q_20 | 门口的流浪兽 | 一只小兽蹲在门口，伸着爪子。 | 分它点吃的 | `focus:+12` `reagent:-3` | 挥挥手赶走 | `mana:+8m` `disson:+1` |
| q_21 | 地脉温泉 | 地窖里涌出温热的地脉泉。 | 泡一会儿 | `focus:+20` `disson:-1` `spell:-6m` | 引一条渠进塔 | `reagent:+6` `focus:-5` |
| q_22 | 半夜的叩门 | 子夜有人敲你的门，开门却没有人。 | 出去看 | `credit:+30` `focus:-8` | 把门闩上 | `focus:+8` `credit:-15` |
| q_23 | 枯井的回声 | 枯井很深，回声传上来像有人在说话。 | 对着井说话 | `focus:+10` `spell:-5m` | 往里丢块魔力结晶 | `mana:-10m` `page:+2` |
| q_24 | 废弃礼拜堂 | 礼拜堂的供桌上摆着一样东西，用褪了色的布盖着。 | 掀开布看看 | `focus:+12` `mana:-4m` | 翻供桌的抽屉 | `potion:p_clarity` `disson:+1` |

### 3.2 学院专属（6，仅对应学院出现）

| id | 学院 | 标题 | 正文 | 选项 A | A 得失 | 选项 B | B 得失 |
|---|---|---|---|---|---|---|---|
| q_s_verdant | s_verdant | 林间新芽 | 一株新芽从砖缝里挤出来，魔力都往它身上流。 | 用魔力催它 | `reagent:+8` `mana:-10m` | 任它自己长 | `focus:+12` `spell:-5m` |
| q_s_crimson | s_crimson | 炉子炸响 | 隔壁的炉子炸了，火星溅到你脚边。 | 硬压下去 | `spell:+12m` `focus:-10` | 先灭火 | `focus:+8` `mana:-8m` |
| q_s_deepwell | s_deepwell | 寒潭倒影 | 潭水里映出的你，比你慢半拍。 | 潜进去 | `focus:+18` `spell:-8m` | 盯着影子看 | `spell:+10m` `disson:+1` |
| q_s_stonehold | s_stonehold | 城墙裂缝 | 城墙裂了一道，压住了半条走道。 | 用肩膀顶住 | `spell:+12m` `focus:-12` | 绕另一条路 | `credit:+20` `spell:-5m` |
| q_s_starlight | s_starlight | 观星台 | 观星台风大，星图在架上哗哗响。 | 通宵画完 | `spell:+12m` `mana:-10m` | 收起星图 | `focus:+12` `spell:-5m` |
| q_s_bany | s_bany | 月下同坐 | 月巴挪了挪，给你让出半个垫子。 | 坐下来 | `spell:+8m` `focus:+15` `disson:+1` | 帮它理毛 | `focus:+10` `mana:-6m` |

### 3.3 触发规则

- 通用 24 条在任何学院都可出现；学院专属 6 条**只在对应学院**出现。
- 同一周目内不重复抽到同一条，抽完则重置池子。
- 离线最多缓存 1 条；上线先结远征，再弹事件。
- 游历姿态下事件概率 +50%（缩短间隔，不改变池子）。

---

## 4. 天降机缘

| key | 文案 |
|---|---|
| jiban_t | 天降机缘 |
| jiban_b | 天边落下一缕红霞，正正落在你脚边。 |
| jiban_ok | 收下机缘 |
| jiban_gain | 获得 {n} 分钟产能与 30 学分 |
| jiban_wait | 机缘还在，去领吧 |

数值：3~5 分钟魔力产能 + 30 学分，不领取一直保留。

---

## 5. 每日任务（3 条）

| key | 文案 | 条件 |
|---|---|---|
| daily_tap_n | 施法 100 次 | `tapCount` 日增量 ≥ 100 |
| daily_tap_d | 手指比心快，咒才出得快。 | — |
| daily_dungeon_n | 完成 1 次远征 | `dungeonReturn` 日增量 ≥ 1 |
| daily_dungeon_d | 派一队出去，回来就好。 | — |
| daily_break_n | 晋级 1 次，或冥想累计 30 分钟 | `breakCount` ≥ 1 或 `sitSec` ≥ 1800 |
| daily_break_d | 坐着也是功课。 | — |

| key | 文案 |
|---|---|
| daily_title | 今日功课 |
| daily_item_reward | 单项完成：{n} 分钟魔力产能 |
| daily_all_reward | 全部完成：60 学分 + 1 瓶随机魔药 |
| daily_reset | 已过子时，功课重排 |
| daily_done | 今日圆满 |

---

## 6. 提示文案池

| key | 文案 | 触发 |
|---|---|---|
| tip_layer_full | 咒力已满，可铭环 | 环内咒力达需求 |
| tip_break_ready | 九环圆满，可叩阶门 | 9 环满 |
| tip_break_ok | 晋级成功 | 晋级成功 |
| tip_break_no | 晋级未成，心神不定 | 晋级失败 |
| tip_xinmo_up | 杂念加深 | 杂念 +1 |
| tip_xinmo_clear | 杂念已散 | 杂念归零 |
| tip_off_title | 久别归来 | 离线弹窗标题 |
| tip_off_none | 离开不久，无所得 | 离线 <60 秒 |
| tip_disc_back | 远征归来 | 远征完成 |
| tip_disc_hurt | 远征里受了轻伤，咒力暂缓 | 轻伤触发 |
| tip_disc_none | 带回来的东西都在这儿了。 | 远征归来约 20% 追加 |
| tip_book_dup | 已收录，化为残页 | 重复法术 |
| tip_book_pity | 金阶保底 | 第 80 抽 |
| tip_pill_max | 魔药已满 | 库存达上限 |
| tip_contrib_lack | 学分不足 | 学分不够 |
| tip_mana_lack | 魔力不足 | 魔力不够 |
| tip_reagent_lack | 材料不足 | 材料不够 |
| tip_trans_cd | 转院冷却中 | 冷却期点转院 |
| tip_trans_ok | 转院完成 | 转院成功 |
| tip_pon_switch | 已改作{name} | 切换姿态 |
| tip_trib_ready | 试炼将至 | 晋级前 |
| tip_tap_limit | 手速过快 | 每秒超 10 次 |
| tip_rank_up | 职称晋升：{name} | 学分达标 |
| tip_saved | 已保存 | 手动保存 |

---

## 7. UI 基础词表

### 7.1 页签与面板

| key | 文案 |
|---|---|
| ui_title | 月巴奥术 |
| tab_tower | 法师塔 |
| tab_spell | 法术 |
| tab_academy | 学院 |
| tab_exped | 远征 |
| tab_note | 手记 |
| tab_sub_tower_build | 设施 |
| tab_sub_tower_potion | 炼药 |
| tab_sub_tower_disciple | 学徒 |
| tab_sub_note_ach | 成就 |
| tab_sub_note_codex | 图鉴 |
| tab_sub_note_stat | 统计 |
| tab_sub_note_set | 设置 |
| tab_sub_academy_ins | 星图 |

### 7.2 资源

| key | 文案 |
|---|---|
| res_mana | 魔力 |
| res_spell | 咒力 |
| res_focus | 专注 |
| res_disson | 杂念 |
| res_credit | 学分 |
| res_reagent | 材料 |
| res_page | 残页 |
| res_star | 星辉 |
| res_academy | 学院 |

### 7.3 操作

| key | 文案 |
|---|---|
| btn_inscribe | 铭环 |
| btn_break | 晋级 |
| btn_cast | 施法 |
| btn_do_break | 叩阶 |
| btn_draw1 | 单抽 |
| btn_draw10 | 十连 |
| btn_equip | 装备 |
| btn_unequip | 卸下 |
| btn_upgrade | 升级 |
| btn_brew | 炼药 |
| btn_use | 使用 |
| btn_recruit | 招募 |
| btn_dispatch | 派遣 |
| btn_claim | 领取 |
| btn_switch | 转院 |
| btn_promote | 晋升 |
| btn_mute | 静音 |
| btn_lowpower | 省电 |
| btn_theme | 换配色 |
| btn_lang | 语言 |
| btn_ok | 确定 |
| btn_cancel | 取消 |
| btn_close | 关闭 |
| btn_back | 返回 |
| ui_wip | 这一页还在搭，先挂着。 |

### 7.4 数值模板

| key | 文案 | 说明 |
|---|---|---|
| st_rate | +{n}/秒 | 产能速率 |
| st_layer | {realm}·{n}环 | 阶位环数 |
| st_progress | {p}% | 咒力进度 |
| st_eta | {t} | 预计完成时间 |
| st_offline_for | 离开 {t} | 离线时长 |
| st_gain_mana | 魔力 +{n} | 离线结算 |
| st_gain_spell | 咒力 +{n} | 离线结算 |
| st_gain_layer | 环数 {a} → {b} | 离线结算 |
| st_rate_ok | {p}% | 晋级成功率 |
| st_combo | {n} 连 | 连击数 |
| st_max | 已满级 | 等级上限 |
| st_lock | {reason} | 未解锁原因 |
| st_need | 还需 {n} | 资源差额 |
| unit_wan | 万 | 数字单位 |
| unit_yi | 亿 | 数字单位 |

### 7.6 学院面板（T7）

| key | 文案 | 说明 |
|---|---|---|
| ui_acad_cur | 当前学院 | 面板第一段 |
| ui_acad_list | 学院志 | 面板第二段 |
| ui_acad_credit | 学分 | — |
| ui_acad_rank | 职称 | — |
| ui_acad_joined_now | 当前所在 | 当前学院卡片 |
| ui_acad_free | 免费转院 | 首次 |
| ui_acad_cost | 转院 {n} | 后续，显示魔力数 |
| ui_acad_cd | 冷却 {t} | 30 分钟内 |
| ui_acad_mana_lack | 魔力不足 | — |
| ui_acad_next | 距下一职称 {n} | 职称进度条下 |
| ui_acad_unlock_r | {rank} {n} 环后解锁 | 赤炉/深潭/磐石/星辉 |
| ui_acad_unlock_ascend | 首次封圣后解锁 | 月巴之塔 |
| ui_acad_confirm_t | 转院 | 确认弹层标题 |
| ui_acad_confirm_b | 转去{n}？旧的学院会保留你的学分与职称。 | — |
| ui_acad_off_credit | 学分所得 | 离线弹窗 |

### 7.7 法师塔面板（T9）

| key | 文案 | 说明 |
|---|---|---|
| ui_tower_lv | Lv.{n} / 20 | 卡片右上角 |
| ui_tower_per | 每级 | 「每级 魔力 +8%」 |
| ui_tower_cur | 当前 | 「当前 魔力 +24% → 魔力 +32%」 |
| ui_tower_rate | 产能 {a}/秒 → {b}/秒 | 仅魔力/咒力类设施 |
| ui_tower_up | 升级 · {n} | 按钮 |
| ui_tower_max | 已满级 | 20 级后按钮 |
| ui_tower_unlock | {rank} {n} 环后开放 | 未解锁 |
| ui_tower_lack | 魔力不足 · 还需 {n} | 按钮置灰 |
| lbl_mana / lbl_spell / lbl_off / lbl_rank / lbl_potionAll / lbl_spellEff | 魔力 / 咒力 / 离线效率 / 晋级 / 魔药效果与时长 / 法术效果 | 设施效果标签 |

### 7.8 法术面板（T10）

| key | 文案 | 说明 |
|---|---|---|
| ui_spell_pages | 残页 | 顶部统计 |
| ui_spell_pity | 金阶保底 | 显示 `n/80` |
| ui_spell_have | 已收录 | 显示 `n/24` |
| ui_spell_draw1 / ui_spell_draw10 | 单抽 / 十连 | 按钮，后缀当前价格 |
| ui_spell_slots | 装备槽 | 分区标题 |
| ui_spell_owned | 藏品 | 分区标题 |
| ui_spell_slot_empty | 空槽 | — |
| ui_spell_slot_lock | {rank} {n} 环开放 | 未开放的槽 |
| ui_spell_lv | Lv.{n} | 槽/卡片角标 |
| ui_spell_up | 升级 · {n} 残页 | 按钮 |
| ui_spell_up_lack | 残页不足 | 点击后提示 |
| ui_spell_max | 已满级 | 10 级 |
| ui_spell_full | 槽位已满，先卸下一个。 | 装备失败 |
| ui_spell_empty | 还没有法术，先抽一次。 | 空列表 |
| ui_spell_result | 抽取结果 | 弹层标题 |
| ui_spell_new / ui_spell_dup | 新 / 残页 +{n} | 结果行尾 |
| lbl_failCut | 失败惩罚 | 金阶晋级法术第二词条 |

### 7.9 炼药面板（T11）

| key | 文案 | 说明 |
|---|---|---|
| ui_potion_stock | 库存 {a}/{b} | 卡片角标 |
| ui_potion_recipe | {s} 秒产能 + {n} 材料 | 配方 |
| ui_potion_brew | 炼一炉 | 后缀当前价格 |
| ui_potion_use | 使用 | — |
| ui_potion_reagent | 材料 | 顶部统计 |
| ui_potion_lack_reagent / ui_potion_lack_mana | 材料不足 / 魔力不足 | 失败提示 |
| ui_potion_full / ui_potion_none | 库存已满 / 没有库存 | — |
| ui_potion_max_buff | 最多同时 3 种增益 | — |
| ui_echo_waste / ui_echo_full | 超出本环上限的部分已丢弃 / 本环已满，用不上 | 回响药剂 |
| ui_ascend_desc | 下一次晋级 +12pp | 晋阶药剂 |
| ui_clarity_desc | 专注 +40，清 1 层杂念 | 清心药剂 |
| ui_echo_desc | 立即获得 30 分钟咒力 | 回响药剂 |
| ui_potion_ok / ui_use_ok | 炼好了 / 已服用 | — |

> 增益条上显示「魔力 +84% · 19:58」，84 = 70% × 翠庭学院魔药效果 +20%。

### 7.10 学徒面板（T12）

| key | 文案 | 说明 |
|---|---|---|
| tab_sub_tower_disciple | 学徒 | 法师塔第三个子页 |
| ui_appr_inroster | 在册 | 显示 `n/4` |
| ui_appr_recruit | 招募学徒 | 空席按钮 |
| ui_appr_cost | {c} 学分 + {m} 魔力 | 招募成本 |
| ui_appr_need_rank | 需先成为学员 | 职称不足 |
| ui_appr_lv | Lv.{n} | 卡片角标 |
| ui_appr_up | 升级 · {n} | 按钮 |
| ui_appr_max | 已满级 | 10 级 |
| ui_appr_leave / ui_appr_leave_t / ui_appr_leave_b | 遣散 / 遣散学徒 / 让{name}离开？… | 二次确认 |
| ui_appr_joined | {name} 已入席 | 招募成功 |
| dr_scribe_d / dr_peer_d / dr_forager_d / dr_warden_d | 各职务一句话说明 | 招募弹层用 |

### 7.11 远征面板（T13）

| key | 文案 | 说明 |
|---|---|---|
| ui_exp_depart | 派遣 | 按钮 |
| ui_exp_active | 进行中 | 顶部状态 |
| ui_exp_left | 还剩 {t} | 倒计时 |
| ui_exp_busy | 已经有一队在路上了 | 同时只能 1 队 |
| ui_exp_locked | {rank} {n} 环后开放 | — |
| ui_exp_result | 远征归来 | 弹层标题 |
| ui_exp_injury | 受了轻伤：咒力产出 −20%，持续 10 分钟 | 10% 概率 |
| ui_exp_gold | 带回一份金阶法术 | 12% 概率 |
| ui_exp_gain_potion | 魔药 +{n} | — |

> 归来时约 20% 追加 `tip_disc_none`「带回来的东西都在这儿了。」——暗线要求，不解释少了什么。

### 7.13 事件 / 机缘 / 每日（T14）

| key | 文案 | 说明 |
|---|---|---|
| 事件 30 条 | `q_xx_n/_b/_a/_c` | 由 `content.md` §3 生成，脚本 `_gen_events.js` |
| jiban_t / jiban_b | 天降机缘 / 天边落下一缕红霞，正正落在你脚边。 | 状态栏红点 |
| jiban_gain | 获得 {n} 分钟产能与 30 学分 | 领取提示 |
| daily_title | 今日功课 | 手记面板 |
| daily_tap_n / _d | 施法 100 次 / 手指比心快，咒才出得快。 | — |
| daily_dungeon_n / _d | 完成 1 次远征 / 派一队出去，回来就好。 | — |
| daily_break_n / _d | 晋级 1 次，或冥想累计 30 分钟 / 坐着也是功课。 | — |
| daily_item_reward | 单项完成：{n} 分钟魔力产能 | — |
| daily_all_reward | 全部完成：60 学分 + 1 瓶随机魔药 | — |
| lbl_focus / lbl_disson / lbl_min / lbl_layer | 专注 / 杂念 / 分钟 / 层 | 事件效果标签 |
| lbl_credit / lbl_page / lbl_reagent | 学分 / 残页 / 材料 | 同上 |

> 事件的两条选项会显示「专注 +15 · 咒力 +5 分钟」这种得失摘要，资源不够的那条置灰。

### 7.15 试炼弹层（T15）

| key | 文案 | 说明 |
|---|---|---|
| tb_1_n / tb_2_n / tb_3_n | 银杯试炼 / 星火试炼 / 无光试炼 | 弹层标题 |
| tb_1_d / tb_2_d / tb_3_d | 三段试炼正文 | 见 §2.4 |
| ui_trial_now | 当前成功率 {p}% | 实时显示（含已点中的雷） |
| ui_trial_auto | {t} 后按当前成功率自动结算 | 倒计时 |
| ui_trial_pass | 你扛过去了 | 成功飘字 |

### 7.16 封圣 / 星图（T16）

| key | 文案 | 说明 |
|---|---|---|
| btn_ascend | 封圣 | 大魔法师 9 环时主按钮 |
| ui_asc_title | 封圣 | 确认弹层标题 |
| ui_asc_confirm | 你已走到大魔法师 9 环。回环会抹掉这一世的积累，只留下星图与图鉴。 | — |
| ui_star_name / ui_star_total | 星辉 / 星辉总数 | 结果弹层 |
| ascend_d | （见 §2.2） | 结果弹层正文，全篇唯一「一点红」 |
| ui_star_title | 星图 | 学院面板第二个页签 |
| ui_star_lv / ui_star_buy | {a}/{b} / 加点 · {n} | — |
| ui_star_max / ui_star_lack | 已满 / 星辉不足 | — |
| ui_rate_star | 星图 | 晋级弹层的定力行 |
| ins_*_n / ins_*_d | 五项天赋名与说明 | 见 `data.md` §11 |

> 首轮星辉 106 点，全树 120 点——**点不满是设计意图**，第二轮起才补满。

### 7.17 成就 / 图鉴（T17）

| key | 文案 | 说明 |
|---|---|---|
| ui_ach_title | 成就 | 手记第三段 |
| ui_ach_prog | {a} / {b} | 进度 |
| ui_ach_new | 达成 | 解锁 toast 前缀 |
| ui_codex_title | 图鉴 | 手记第四段 |
| ui_codex_locked | ??? | 未解锁条目 |
| cx_spell / cx_acad / cx_exped / cx_potion / cx_trial | 法术 / 学院 / 遗迹 / 魔药 / 试炼 | 五类分组 |

> 成就与图鉴都只是标签墙：**不参与任何倍率计算**（测试断言点满图鉴前后产能完全一致）。

### 7.18 晋级弹层
| key | 文案 | 说明 |
|---|---|---|
| ui_break_title | 晋级 | 弹层标题 |
| ui_rate_base | 基础 | 阶位基础成功率 |
| ui_rate_cave | 设施 | 守护法阵 |
| ui_rate_book | 法术 | 晋级系法术 |
| ui_rate_sect | 学院 | 磐石堡常驻 |
| ui_rate_pill | 晋阶药剂 | 装填后 +12pp |
| ui_rate_focus | 专注 | ±10pp |
| ui_rate_total | 合计 | 封顶 95% / 保底 20% |
| ui_break_cost | 消耗魔力 | — |
| ui_break_have | 现有魔力 | — |
| ui_break_lack | 魔力不足，暂时叩不开阶门。 | 魔力 < 消耗时 |
| ui_break_capped | 设施与法术的加成合计封顶 +15 点。 | 触顶时 |
| ui_break_hardcap | 已触及成功率上限 95%（或 20% 保底）。 | 明细之和超出 95 时 |
| ui_layer_up | 铭环 +1 | 环内推进飘字 |
| ui_disson | 杂念 | HUD 角标 |

---

## 8. 交叉校验

- [x] 30 条事件，24 通用 + 6 学院专属，标题无重复
- [x] 每个选项都至少一个正项、一个负项
- [x] 学院专属事件与学院机制对应（自然/火焰/水/土/星/月）
- [x] `data.md` 的全部 `_n` 键都有值
- [x] 提示文案 25 条
- [x] 全文不含 `glossary.md` §9 的修仙禁止词
- [ ] 四语：本轮仅中文，`en/ja/ko` 留空
