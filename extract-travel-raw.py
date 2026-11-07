# -*- coding: utf-8 -*-
"""抽取旅行地图的特产与信件原始数据（含信件全文，仅供内部写概括用，不对外发布）。
只做文本解析，不执行代码。用法: python extract-travel-raw.py
输出: _travel_raw.md
"""
import io, re

# ---- 复用 extract-dex-md.py 的解析器（该脚本以 __main__ 保护主流程）----
import importlib.util
spec = importlib.util.spec_from_file_location('dexmod', 'extract-dex-md.py')
dexmod = importlib.util.module_from_spec(spec)
try:
    spec.loader.exec_module(dexmod)  # 有 __main__ 保护则安全
    parse_literal = dexmod.parse_literal
    find_const_block = dexmod.find_const_block
except AttributeError:
    raise SystemExit('extract-dex-md.py 需要先加上 __main__ 保护')

TV_DESTS = parse_literal(find_const_block('TV_DESTS'))
TV_REGIONS = parse_literal(find_const_block('TV_REGIONS'))
TV_LETTERS = parse_literal(find_const_block('TV_LETTERS'))
SPECIAL_EMOJI = parse_literal(find_const_block('SPECIAL_EMOJI'))

region_of = {}
for r in TV_REGIONS:
    for d in r['dests']:
        region_of[d] = r['n']

lines = [u'# 旅行地图原始数据（内部工作文件，信件全文勿直接给玩家）', u'']
for dv in TV_DESTS:
    lines.append(u'## %s（%s · %s）' % (dv['n'], region_of.get(dv['id'], '?'), dv['id']))
    if dv.get('desc'):
        lines.append(u'地图简介：%s' % dv['desc'])
    specs = dv.get('specials') or []
    lines.append(u'特产（%d 种）：%s' % (len(specs), u'、'.join(
        (SPECIAL_EMOJI.get(s, u'') + s) for s in specs)))
    cards = dv.get('cards') or []
    lines.append(u'信件（%d 封）编号：%s' % (len(cards), u' '.join(cards)))
    lines.append(u'')
    for cid in cards:
        L = TV_LETTERS.get(cid)
        if not L:
            lines.append(u'- %s：（未找到正文）' % cid)
            continue
        txt = (L.get('txt') or u'').replace(u'{name}', u'（月巴名）')
        lines.append(u'- %s %s：%s' % (cid, L.get('e', u''), txt))
    lines.append(u'')

io.open('_travel_raw.md', 'w', encoding='utf-8').write(u'\n'.join(lines))
n_letters = sum(len(d.get('cards') or []) for d in TV_DESTS)
print('done: %d maps, %d specialties, %d letters' % (
    len(TV_DESTS), sum(len(d.get('specials') or []) for d in TV_DESTS), n_letters))
