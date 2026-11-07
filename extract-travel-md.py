# -*- coding: utf-8 -*-
"""组装旅行地图（特产+信件概括）资料表，给 AI 答客用。
信件只输出模糊概括（来自 _letter_summaries.txt），不输出正文。
用法: python extract-travel-md.py
输出: 月巴旅行地图资料-给AI答客用.md
"""
import io, re
import importlib.util
spec = importlib.util.spec_from_file_location('dexmod', 'extract-dex-md.py')
dexmod = importlib.util.module_from_spec(spec)
spec.loader.exec_module(dexmod)

TV_DESTS = dexmod.parse_literal(dexmod.find_const_block('TV_DESTS'))
TV_REGIONS = dexmod.parse_literal(dexmod.find_const_block('TV_REGIONS'))
TV_LETTERS = dexmod.parse_literal(dexmod.find_const_block('TV_LETTERS'))
SPECIAL_EMOJI = dexmod.parse_literal(dexmod.find_const_block('SPECIAL_EMOJI'))

# 读取概括
arc = {}
summ = {}
for line in io.open('_letter_summaries.txt', 'r', encoding='utf-8'):
    line = line.strip()
    if not line or '|' not in line:
        continue
    k, v = line.split('|', 1)
    k, v = k.strip(), v.strip()
    if k.startswith('ARC '):
        arc[k[4:].strip()] = v
    else:
        summ[k] = v

region_of = {}
for r in TV_REGIONS:
    for d in r['dests']:
        region_of[d] = r['n']

FOURTH = {r['dests'][3] for r in TV_REGIONS}

def esc(s):
    return str(s or '').replace('|', '\\|').replace('\n', ' ')

missing = []
out = [u"""# 旅行地图 · 特产与信件资料（AI 答客用）

> **给 AI 的回答原则**
> 1. **特产可以完整告诉玩家**：哪张地图有哪些特产，直接照表回答。
> 2. **信件内容不能剧透**：每封信只能说「概括」一栏的模糊说法；玩家追问细节时回答"信里写了什么，拆开的那一刻才知道哦～"。绝不引用或转述信件正文。
> 3. 信件编号（如 A1、U13）是游戏内旅行图鉴公开展示的编号，可以引用；蜡封 emoji 是信封外观。
> 4. 每个地区第 4 张为隐藏地图，需该区前三张图的信件收集到相当程度才解锁（具体数字不说）；雪地一行还需要豪华便当+护身符。
> 5. 重复特产会自动折算成番茄，越远的图折算越多；特产和信件都是地图皮肤的解锁条件。
> 6. 同一张图的信收到重复会累计"重复累计"条，攒满后下一趟在还有新信的图必出新信（机制细节见主答客表）。

"""]

for r in TV_REGIONS:
    out.append(u'## %s地区' % r['n'])
    out.append(u'')
    for idx, dv in enumerate([x for x in TV_DESTS if region_of[x['id']] == r['n']]):
        hidden = dv['id'] in FOURTH
        out.append(u'### %s（%s 第 %d 图%s）' % (
            dv['n'], r['n'], idx + 1, u' · 隐藏图' if hidden else u''))
        if dv.get('desc'):
            out.append(u'')
            out.append(u'> %s' % dv['desc'])
        specs = dv.get('specials') or []
        out.append(u'')
        out.append(u'**特产（%d 种，可完整告知玩家）**：%s' % (len(specs), u'、'.join(
            (SPECIAL_EMOJI.get(s, u'') + s) for s in specs)))
        cards = dv.get('cards') or []
        arc_line = arc.get(dv['n'])
        out.append(u'')
        out.append(u'**信件（%d 封）**%s' % (
            len(cards),
            (u'——主线概括：%s' % arc_line) if arc_line else u''))
        out.append(u'')
        out.append(u'| 编号 | 蜡封 | 概括（不剧透，仅此口径） |')
        out.append(u'|---|---|---|')
        for cid in cards:
            L = TV_LETTERS.get(cid) or {}
            s = summ.get(cid)
            if s is None:
                missing.append(cid)
                s = u'（待补充概括）'
            out.append(u'| %s | %s | %s |' % (cid, L.get('e', u''), esc(s)))
        out.append(u'')
    out.append(u'---')
    out.append(u'')

out.append(u'*本文件由 extract-travel-md.py 自动生成（概括文案在 _letter_summaries.txt，可人工润色后重新生成）；数据源 index.html。*')

io.open(u'月巴旅行地图资料-给AI答客用.md', 'w', encoding='utf-8').write(u'\n'.join(out))
n_specs = sum(len(d.get('specials') or []) for d in TV_DESTS)
n_cards = sum(len(d.get('cards') or []) for d in TV_DESTS)
print('done: %d maps, %d specialties, %d letters; missing summaries: %s' % (
    len(TV_DESTS), n_specs, n_cards, missing or '无'))
