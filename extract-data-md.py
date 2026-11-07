# -*- coding: utf-8 -*-
"""生成含数值（不含概率）的月巴放置数据资料表，给 AI/内部使用。
用法: python extract-data-md.py
输出: 月巴数据资料-给AI答客用.md
"""
import io, re
import importlib.util
spec = importlib.util.spec_from_file_location('dexmod', 'extract-dex-md.py')
dexmod = importlib.util.module_from_spec(spec)
spec.loader.exec_module(dexmod)

SRC = dexmod.SRC
def scalar(name, cast=float):
    # 支持连续声明（const A=1, B=2）与纯乘法表达式（12*3600*1000）
    m = re.search(r'\b%s\s*=\s*([\d.*]+)\s*[;,]' % name, SRC)
    if not m:
        return None
    v = 1.0
    for part in m.group(1).rstrip('.').split('*'):
        v *= float(part)
    return cast(v)

TYPES  = dexmod.parse_literal(dexmod.find_const_block('TYPES'))
TYPES2 = dexmod.parse_literal(dexmod.find_const_block('TYPES2'))
TYPES3 = dexmod.parse_literal(dexmod.find_const_block('TYPES3'))
RAR_NAME = dexmod.parse_literal(dexmod.find_const_block('RAR_NAME'))
ZONES  = dexmod.parse_literal(dexmod.find_const_block('ZONES'))
ITEMS  = dexmod.parse_literal(dexmod.find_const_block('ITEMS'))
TV_DESTS = dexmod.parse_literal(dexmod.find_const_block('TV_DESTS'))
TV_REGIONS = dexmod.parse_literal(dexmod.find_const_block('TV_REGIONS'))
TV_FOODS = dexmod.parse_literal(dexmod.find_const_block('TV_FOODS'))
TV_ITEMS = dexmod.parse_literal(dexmod.find_const_block('TV_ITEMS'))
R_H = dexmod.parse_literal(dexmod.find_const_block('R_H'))
R_W = dexmod.parse_literal(dexmod.find_const_block('R_W'))

BASE_SPEED = scalar('BASE_SPEED')
FAST_COST = scalar('FAST_COST')
WEATHER_COST = scalar('WEATHER_COST')
ACCEL_BASE = scalar('ACCEL_BASE')
ACCEL_MULT = scalar('ACCEL_MULT')
ACCEL_MAX = int(scalar('ACCEL_MAX'))
TAP_SECS = scalar('TAP_SECS')
OFFLINE_H = scalar('OFFLINE_CAP') / 3600000.0
DEX1_MIN = int(scalar('DEX1_MIN'))
GAMBLE_BASE_TOMATO = int(scalar('GAMBLE_BASE_TOMATO'))
GAMBLE_MAXROUND = int(scalar('GAMBLE_MAXROUND'))
DD_BET_MAX = int(scalar('DD_BET_MAX'))
GAMBLE_TIERS = dexmod.parse_literal(dexmod.find_const_block('GAMBLE_TIERS'))
DD_DIFFS = dexmod.parse_literal(dexmod.find_const_block('DD_DIFFS'))

FOURTH = {r['dests'][3] for r in TV_REGIONS}
region_of = {}
for r in TV_REGIONS:
    for d in r['dests']:
        region_of[d] = r['n']

def esc(s):
    return str(s or '').replace('|', '\\|').replace('\n', ' ')

def dur_str(t):
    s = t * (1000.0 / BASE_SPEED) / 1000.0  # 秒
    if s < 90:
        return u'%d 秒' % round(s)
    if s < 3600:
        return u'%d 分 %02d 秒' % (int(s // 60), int(round(s % 60)))
    return u'%d 小时 %02d 分' % (int(s // 3600), int(round(s % 3600 / 60)))

def coin(n):
    return format(int(n), ',')

# ---------- 月巴总表 ----------
def moonba_table(lst, start):
    md = [u'| 序 | 名称 | 稀有度 | 金币价值 | 生长时长 | 出现条件 |',
          u'|---|---|---|---|---|---|']
    for k, t in enumerate(lst):
        md.append(u'| %d | %s | %s | %s | %s | %s |' % (
            start + k, esc(t['name']), RAR_NAME.get(t['r'], t['r']),
            coin(t['v']), dur_str(t['t']), esc(dexmod.cond_text(t.get('cond')))))
    return u'\n'.join(md)

# ---------- 旅行地图表 ----------
def dest_table():
    md = [u'| 地区 | 地图 | 旅行时长 | 信件数 | 特产数 | 重复特产折算番茄 | 隐藏图解锁所需（前三图各） |',
          u'|---|---|---|---|---|---|---|']
    for dv in TV_DESTS:
        cards = dv.get('cards') or []
        need = u'—'
        if dv['id'] in FOURTH:
            need = u'≥%d 封' % -(-len(cards) * 3 // 4)  # ceil(总数×3/4) 按本图信件总数
        lo, hi = dv.get('dupTomato', [u'?', u'?'])
        md.append(u'| %s | %s%s | %d 分钟 | %d | %d | %d ~ %d 🍅 | %s |' % (
            region_of[dv['id']], dv['n'],
            u'（隐藏）' if dv['id'] in FOURTH else u'',
            dv['dur'], len(cards), len(dv.get('specials') or []), lo, hi, need))
    return u'\n'.join(md)

accel_rows = []
for lv in range(ACCEL_MAX):
    c = round(ACCEL_BASE * (ACCEL_MULT ** lv))
    accel_rows.append(u'Lv.%d→%d：买入价 %s 🪙（+%d%%）' % (lv, lv + 1, coin(c), (lv + 1) * 10))

OUT = u"""# 月巴放置 · 数据资料表（含数值，不含概率）

> **使用说明**
> 1. 本表收录**价格、时长、产出等确定数值**；**概率类（出现权重、胜率、触发率、出千率、掉落率、保底阈值等）一律未收录**，需要时查代码。
> 2. 本表为内部/AI 数据参考，若用于答客，注意与《玩家知识库》的对外口径衔接。
> 3. 由 extract-data-md.py 自动生成，数据源 index.html / minesweeper.html。

## 一、核心常量

| 项 | 数值 |
|---|---|
| 新种类首次收获金币 | 3 倍 |
| 点击加速 | 每点 +{tap} 秒生长进度 |
| 离线收益上限 | {off} 小时 |
| 第一图鉴解锁第二图鉴/旅行 | 集齐 {dex1} 种 |
| 生长速度基准 | 全部月巴共用 0.3 倍速（表中生长时长已按此换算为真实时长） |
| 天气瓶 | {wb} 🪙/瓶，自选天气生效 2 现实小时 |
| 快长肥 | 基础价 {fast} 🪙，实际价 = 基础 × (1 + 0.1×(总槽数-1)) × (1 + log10(1+金币)/6)，效果：所有生长中月巴剩余时间减半 |

### 常驻加速器（永久 +10%/级，满级 +{accmax0}%）
{accel}

## 二、场地解锁（8 个场地）

| 场地 | 解锁金币 | 栽培木价格基数 | 价格倍率 |
|---|---|---|---|
{zones}

## 三、稀有度身高/体重随机范围

| 稀有度 | 身高 cm | 体重 g |
|---|---|---|
{rhw}

## 四、主商店道具（一次性买断）

| 道具 | 价格 | 效果 |
|---|---|---|
{items}

## 五、旅行商店（番茄结算）

**便当**（rn 指向权重为概率类，未收录）：

| 便当 | 价格 |
|---|---|
{foods}

**道具**：

| 道具 | 价格 | 说明 |
|---|---|---|
{tvitems}

## 六、旅行地图数据（4 区 16 图）

{dests}

注：雪地全图需行囊同时装豪华便当+幸运护身符；隐藏图解锁条件按"前三图各集齐 ceil(本图信件总数×3/4) 封"计算（上表已折算）。

## 七、对赌 / 斗月巴数值（胜率、出千率等概率未收录）

| 项 | 数值 |
|---|---|
| 对赌下注档位 | {tiers}（按 12 小时金币收入的比例） |
| 对赌 100% 档首轮赢所得 | {gbase} 🍅（其余档位按比例） |
| 对赌连赌上限 | {gmax} 轮（第 2 轮起手上番茄每轮翻倍） |
| 对赌次数 | 每天 1 次 |
| 斗月巴押注次数 | 每天 {ddbet} 次（用完只能无押注对局） |
| 斗月巴难度赔率倍率 | {ddmult}（地主赢 ×2、农民赢 ×1，再乘难度倍率） |

## 八、小游戏数值速览（仅已上线游戏；以代码为准）

| 游戏 | 数值 |
|---|---|
| 月巴大扫除 | 棋盘：小 9×9/10 雷（标准 90 秒）、中 16×16/40 雷（210 秒）、大 16×30/99 雷（420 秒）；每日挑战 9×9/10 雷；每局 3 次提示；3 星=零提示且≤标准时间。**每日挑战首通金币 = 当前 24 小时挂机产出 ÷ 16（即 1.5 小时产出）** |
| 月巴追茄 | 3 命起步，每 10000 分补 1 命、上限 5 命；糖霜番茄 +300 分；通关得分 = 1000×当前夜数；月巴速度随夜数上涨（第 10 夜封顶）；第 3 夜起第 5 只月巴入场 |
| 俄罗斯巴块 | 消行计分 1/2/3/4 行 = 100/300/500/800 × 等级；每消 10 行升 1 级、上限 20 级；软降 +1/格、硬降 +2/格 |
| 黄金矿工 | 每关限时 60 秒；目标分前 4 关 400/600/800/1000，之后每关 ×1.15；达标金币 = 本关目标分 ÷ 2（回传主游戏）；达标另加 剩余秒数×3 分；**每日挑战当天首次达标送隧道通行证 1 张（每天限 1 张，仓库已有则不发）** |
| 番茄幸存者 | 无尽模式单局金币上限 3000（svCoins 专属钱包）；困难难度敌人生命 ×1.35/金币 ×1.5、噩梦 ×1.7/×2.0；装备共 20 件、同时生效上限 6 件，只增幅首页旅行 |
| 飞行小游戏 | 关卡目标柱数 8→100 根；自由模式每穿一根提速 2.2%（上限 ×2.6）；关卡内每穿一根 +0.9%（上限 ×1.9） |
| 月巴垂钓 | 数值与口径单列，见《月巴垂钓资料-给AI答客用.md》（16 钓点 / 572 种鱼 / 鱼竿 8 档 / 订单每日刷新 4 次） |

---

## 九、月巴全量数据表（{total} 只：金币价值 + 生长时长）

### 第一图鉴（{n1} 种）
{t1}
### 第二图鉴（{n2} 种）
{t2}
### 第三图鉴 · 特别篇（{n3} 种）
{t3}

---
*本文件由 extract-data-md.py 自动生成；月巴/商店/地图数据变动后重新运行即可更新。*
""".format(
    tap=int(TAP_SECS), off=int(OFFLINE_H), dex1=DEX1_MIN, wb=coin(WEATHER_COST),
    fast=coin(FAST_COST), accmax0=ACCEL_MAX * 10,
    accel=u'\n'.join(accel_rows),
    zones=u'\n'.join(u'| %s %s | %s | %s | ×%s |' % (z.get('icon', u''), esc(z['name']),
                     coin(z['cost']), coin(z.get('woodBase', 0)), z.get('woodMult', u'?')) for z in ZONES),
    rhw=u'\n'.join(u'| %s | %d ~ %d | %d ~ %d |' % (RAR_NAME[r], R_H[r][0], R_H[r][1], R_W[r][0], R_W[r][1])
                   for r in sorted(RAR_NAME)),
    items=u'\n'.join(u'| %s %s | %s 🪙 | %s |' % (it.get('icon', u''), esc(it['name']),
                     coin(it['cost']), esc(it.get('desc', u''))) for it in ITEMS),
    foods=u'\n'.join(u'| %s %s | %s 🍅 |' % (f.get('e', u''), esc(f['n']), f['p']) for f in TV_FOODS.values()),
    tvitems=u'\n'.join(u'| %s %s | %s 🍅 | %s |' % (i.get('e', u''), esc(i['n']), i['p'], esc(
        (u'耐久 %d 次' % i['durab']) if i.get('durab') else
        (u'隧道通行证：装行囊出发 %d 分钟保底 1 信、免便当' % i['dur']) if i.get('dur') else
        (u'永久（只买一次）' if i.get('perm') else u'一次性'))) for i in TV_ITEMS.values()),
    dests=dest_table(),
    tiers=u'、'.join(u'%d%%' % round(t * 100) for t in GAMBLE_TIERS),
    gbase=coin(GAMBLE_BASE_TOMATO), gmax=GAMBLE_MAXROUND, ddbet=DD_BET_MAX,
    ddmult=u'；'.join(u'%s（%s）×%s' % (v['name'], v['lv'], v['mult']) for v in DD_DIFFS.values()),
    t1=moonba_table(TYPES, 1), t2=moonba_table(TYPES2, len(TYPES) + 1),
    t3=moonba_table(TYPES3, len(TYPES) + len(TYPES2) + 1),
    total=len(TYPES) + len(TYPES2) + len(TYPES3),
    n1=len(TYPES), n2=len(TYPES2), n3=len(TYPES3),
)

io.open(u'月巴数据资料-给AI答客用.md', 'w', encoding='utf-8').write(OUT)
print('done: zones=%d dests=%d moonbas=%d accel_max_cost=%s' % (
    len(ZONES), len(TV_DESTS), len(TYPES) + len(TYPES2) + len(TYPES3),
    coin(round(ACCEL_BASE * (ACCEL_MULT ** (ACCEL_MAX - 1))))))
