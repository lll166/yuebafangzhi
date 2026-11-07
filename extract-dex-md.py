# -*- coding: utf-8 -*-
"""从 index.html 静态抽取全部月巴图鉴数据，生成给 AI 答客用的 Markdown。
只做文本解析，不执行任何代码。用法: python extract-dex-md.py
输出: 月巴图鉴资料-给AI答客用.md
"""
import io, re, sys

SRC = io.open('index.html', 'r', encoding='utf-8').read()

# ---------- 提取 const 块（括号配平，跳过字符串与注释） ----------
def find_const_block(name):
    m = re.search(r'(?m)^const\s+%s\s*=' % re.escape(name), SRC)
    if not m:
        raise SystemExit('not found: ' + name)
    i = m.end()
    while i < len(SRC) and SRC[i] not in '[{':
        i += 1
    open_ch = SRC[i]
    close_ch = ']' if open_ch == '[' else '}'
    depth = 0
    j = i
    n = len(SRC)
    in_s = None  # 当前字符串引号
    while j < n:
        c = SRC[j]
        if in_s:
            if c == '\\':
                j += 2
                continue
            if c == in_s:
                in_s = None
        else:
            if c in ('"', "'", '`'):
                in_s = c
            elif c == '/' and j + 1 < n and SRC[j + 1] == '*':
                k = SRC.find('*/', j + 2)
                j = k + 1 if k != -1 else n - 1
            elif c == '/' and j + 1 < n and SRC[j + 1] == '/':
                k = SRC.find('\n', j)
                j = k if k != -1 else n - 1
            elif c == open_ch:
                depth += 1
            elif c == close_ch:
                depth -= 1
                if depth == 0:
                    return SRC[i:j + 1]
        j += 1
    raise SystemExit('unbalanced block: ' + name)

# ---------- 极简 JS 字面量解析器（数组/对象/字符串/数字/布尔/null/注释） ----------
class P:
    def __init__(self, s):
        self.s = s
        self.i = 0
        self.n = len(s)

    def err(self, msg):
        line = self.s.count('\n', 0, self.i) + 1
        raise SystemExit('parse error line %d: %s' % (line, msg))

    def ws(self):
        s, n = self.s, self.n
        while self.i < n:
            c = s[self.i]
            if c in ' \t\r\n':
                self.i += 1
            elif c == '/' and self.i + 1 < n and s[self.i + 1] == '*':
                k = s.find('*/', self.i + 2)
                if k == -1:
                    self.err('unterminated comment')
                self.i = k + 2
            elif c == '/' and self.i + 1 < n and s[self.i + 1] == '/':
                k = s.find('\n', self.i)
                self.i = k if k != -1 else n
            else:
                return

    def parse(self):
        self.ws()
        v = self.value()
        self.ws()
        if self.i != self.n:
            self.err('trailing content')
        return v

    def value(self):
        self.ws()
        c = self.s[self.i]
        if c in '[{':
            return self.container()
        if c in '"\'':
            return self.string()
        if c == '`':
            self.err('template literal not supported')
        if self.s.startswith('true', self.i):
            self.i += 4
            return True
        if self.s.startswith('false', self.i):
            self.i += 5
            return False
        if self.s.startswith('null', self.i):
            self.i += 4
        elif self.s.startswith('undefined', self.i):
            self.i += 9
            return None
        else:
            return self.number()

    def container(self):
        open_ch = self.s[self.i]
        close_ch = ']' if open_ch == '[' else '}'
        self.i += 1
        arr = open_ch == '['
        out = [] if arr else {}
        while True:
            self.ws()
            if self.i >= self.n:
                self.err('unterminated container')
            if self.s[self.i] == close_ch:
                self.i += 1
                return out
            if not arr:
                # 对象键：标识符、数字或字符串
                if self.s[self.i].isdigit():
                    m = re.match(r'-?\d+(\.\d+)?', self.s[self.i:])
                    self.i += m.end()
                    key = m.group(0)
                    f = float(key)
                    key = int(f) if f == int(f) else f
                else:
                    m = re.match(r'[A-Za-z_$][\w$]*', self.s[self.i:])
                    if m:
                        key = m.group(0)
                        self.i += m.end()
                    else:
                        key = self.string()
                self.ws()
                if self.i >= self.n or self.s[self.i] != ':':
                    self.err('expected :')
                self.i += 1
            self.ws()
            out.append(self.value()) if arr else out.__setitem__(key, self.value())
            self.ws()
            if self.i >= self.n:
                self.err('unterminated container')
            c = self.s[self.i]
            if c == ',':
                self.i += 1
            elif c == close_ch:
                self.i += 1
                return out
            else:
                self.err('expected , or %s, got %r' % (close_ch, c))

    def string(self):
        q = self.s[self.i]
        if q not in '"\'':
            self.err('expected quote')
        self.i += 1
        buf = []
        s, n = self.s, self.n
        while self.i < n:
            c = s[self.i]
            if c == '\\':
                e = s[self.i + 1] if self.i + 1 < n else ''
                buf.append({'n': '\n', 't': '\t', 'r': '\r',
                            'b': '\b', 'f': '\f', 'v': '\v', '0': '\0',
                            "'": "'", '"': '"', '\\': '\\', '/': '/'}.get(e, e))
                self.i += 2
                continue
            if c == q:
                self.i += 1
                return ''.join(buf)
            buf.append(c)
            self.i += 1
        self.err('unterminated string')

    def number(self):
        m = re.match(r'-?(?:\d+\.?\d*|\.\d+)(?:[eE][+-]?\d+)?', self.s[self.i:])
        if not m:
            self.err('bad token: %r' % self.s[self.i:self.i + 20])
        self.i += m.end()
        t = m.group(0)
        f = float(t)
        return int(f) if f == int(f) else f


def parse_literal(block_text):
    return P(block_text).parse()


# ---------- 读取数据 ----------
TYPES  = parse_literal(find_const_block('TYPES'))
TYPES2 = parse_literal(find_const_block('TYPES2'))
TYPES3 = parse_literal(find_const_block('TYPES3'))
RAR_NAME = parse_literal(find_const_block('RAR_NAME'))
ZONES  = parse_literal(find_const_block('ZONES'))
ITEMS  = parse_literal(find_const_block('ITEMS'))
TV_DESTS = parse_literal(find_const_block('TV_DESTS'))
TV_REGIONS = parse_literal(find_const_block('TV_REGIONS'))
YB_PIC_AUTHOR = parse_literal(find_const_block('YB_PIC_AUTHOR'))
YB_TXT_AUTHOR = parse_literal(find_const_block('YB_TXT_AUTHOR'))
FAT_INTRO = parse_literal(find_const_block('FAT_INTRO'))
DEX_GAME = parse_literal(find_const_block('DEX_GAME'))
GB_GAMES = parse_literal(find_const_block('GB_GAMES'))

all_ = TYPES + TYPES2 + TYPES3
by_id = {t['id']: t for t in all_}
game_name = {g.get('id'): (g.get('name') or g.get('n') or g.get('id')) for g in GB_GAMES}
FOURTH = {r['dests'][3] for r in TV_REGIONS}

W = {'sunny': '晴天', 'cloudy': '多云', 'rain': '雨天', 'storm': '暴雨', 'snow': '下雪'}
SE = {'spring': '春季', 'summer': '夏季', 'autumn': '秋季', 'winter': '冬季'}

def cond_text(c):
    if not c:
        return '随时可长（无特殊条件）'
    t = c.get('t')
    if t == 'day':
        return '白天（6-18点）'
    if t == 'night':
        return '夜晚（18-6点）'
    if t == 'time':
        a, b = c['a'], c['b']
        return '%d:00-%d:00' % (a, b) if a <= b else '%d:00-次日%d:00' % (a, b)
    if t == 'weather':
        return W.get(c.get('w'), str(c))
    if t == 'rainbow':
        return '雨后天晴'
    if t == 'season':
        s = SE.get(c.get('s'), str(c.get('s')))
        if c.get('night'):
            s += '（夜晚）'
        if c.get('day'):
            s += '（白天）'
        return s
    if t == 'zone':
        z = ZONES[c['z'] - 1] if isinstance(c.get('z'), int) and 0 < c['z'] <= len(ZONES) else None
        return '需要在场地「%s」' % (z['name'] if z else str(c))
    if t == 'item':
        it = next((i for i in ITEMS if i['id'] == c.get('i')), None)
        return '需要道具「%s」' % (it['name'] if it else str(c))
    if t == 'harvest':
        return '累计收获 %s 次' % c['n']
    if t == 'count':
        tt = by_id.get(c['id'])
        return '收获过「%s」%s 次' % (tt['name'] if tt else c['id'], c['n'])
    if t == 'festival':
        return '节日限定（活动期间出现）'
    if t == 'dexfirst':
        return '解锁第一图鉴 %s 个不同的月巴后' % (c.get('n', 1))
    if t == 'travel':
        def pre(d):
            return ('需开启隐藏地图「%s」· ' % next(x['n'] for x in TV_DESTS if x['id'] == d)) if d in FOURTH else ''
        if c.get('d'):
            dv = next((x for x in TV_DESTS if x['id'] == c['d']), None)
            return pre(c['d']) + '旅行到达「%s」%s 次' % (dv['n'] if dv else c['d'], c.get('n', 1))
        if c.get('s'):
            dd = next((x for x in TV_DESTS if c['s'] in (x.get('specials') or [])), None)
            return pre(dd['id'] if dd else '') + '旅行收获特产「%s」' % c['s']
        if c.get('c'):
            dp = next((x for x in TV_DESTS if c['c'] in (x.get('cards') or [])), None)
            return pre(dp['id'] if dp else '') + '收到来自「%s」的信（%s）' % (dp['n'] if dp else c['c'], c['c'])
        return '旅行相关'
    return str(c)

def esc(s):
    return str(s or '').replace('|', '\\|').replace('\n', ' ')

def artist_of(t):
    out = []
    for im in (t.get('imgs') or []):
        if im and im.get('by'):
            out.append(im['by'])
    if not out and t['id'] in YB_PIC_AUTHOR:
        out.append(YB_PIC_AUTHOR[t['id']])
    return '、'.join(out)

def note_of(t):
    n = []
    imgs = t.get('imgs') or []
    if len(imgs) > 1:
        n.append('共 %d 套立绘可切换' % len(imgs))
    for im in imgs:
        if im and im.get('note'):
            n.append('立绘备注：%s' % im['note'])
    if t.get('r') == 6 and (not t.get('cond') or t.get('cond', {}).get('t') == 'festival'):
        n.append('限定月巴：仅在对应节日/活动期间出现，平时遇不到')
    entry = DEX_GAME.get(t['id'])
    if entry:
        label = entry.get('label') or entry.get('game') or ''
        # 去掉 label 开头的 emoji 图标
        label = re.sub(r'^[^\u4e00-\u9fa5A-Za-z]+', '', str(label))
        n.append('图鉴页可直达小游戏「%s」' % label)
    return '；'.join(n)

def table(lst, start):
    md = ['| 序 | 名称 | 稀有度 | 出现条件 | 简介 | 立绘画师 | 备注 |',
          '|---|---|---|---|---|---|---|']
    for k, t in enumerate(lst):
        intro = FAT_INTRO.get(t['id'], '')
        txt_by = ('（文案：%s）' % YB_TXT_AUTHOR[t['id']]) if t['id'] in YB_TXT_AUTHOR else ''
        md.append('| %d | %s | %s | %s | %s%s | %s | %s |' % (
            start + k, esc(t['name']), RAR_NAME.get(t['r'], t['r']),
            esc(cond_text(t.get('cond'))), esc(intro), esc(txt_by),
            esc(artist_of(t)), esc(note_of(t))))
    return '\n'.join(md)

def main():
  OUT = u"""# 月巴图鉴 · 全量资料（AI 答客用）

> **给 AI 的回答原则**
> 1. 「出现条件」「简介」均为游戏内图鉴对玩家公开展示的内容，可直接引用。
> 2. 除此之外的内部数值（金币价值、生长耗时、出现权重、身高体重范围等）一律**不透露**，被问到时回答"这是月巴们的小秘密"。
> 3. 稀有度从低到高：普通 → 常见 → 稀有 → 史诗 → 传说 → 活动（节日限定）。
> 4. 玩家问"某只月巴怎么获得"时，按「出现条件」回答；条件为"随时可长"的说明它没有特殊门槛，长得也更快更普通。稀有度越高越难遇到。
> 5. 身高/体重是每只月巴收获时随机决定的，图鉴记录个人极值（最高/最矮/最重/最轻，四项全破纪录显示金框）。

## 一、第一图鉴（{n1} 种）

集齐约八成以上即可解锁第二图鉴与旅行（游戏内会提示具体数字）。

{t1}
## 二、第二图鉴（{n2} 种）

解锁后并入掉落池，整体更稀有。个别原属第二图鉴的月巴后移入第三图鉴（见第三图鉴表中条目）。

{t2}
## 三、第三图鉴 · 特别篇（{n3} 种）

无解锁限制，从一开始就可能遇到。其中从第二图鉴移入的月巴存档沿用旧编号。

{t3}
---
*本文件由 extract-dex-md.py 自动生成，数据源 index.html；月巴数据变动后重新运行 `python extract-dex-md.py` 即可更新。*
  """.format(n1=len(TYPES), n2=len(TYPES2), n3=len(TYPES3),
             t1=table(TYPES, 1), t2=table(TYPES2, len(TYPES) + 1),
             t3=table(TYPES3, len(TYPES) + len(TYPES2) + 1))

  io.open(u'月巴图鉴资料-给AI答客用.md', 'w', encoding='utf-8').write(OUT)
  print('done: %d / %d / %d, total %d' % (len(TYPES), len(TYPES2), len(TYPES3), len(all_)))

if __name__ == '__main__':
  main()
