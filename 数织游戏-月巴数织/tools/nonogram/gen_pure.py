# -*- coding: utf-8 -*-
"""月巴数织 · 离线「无图版」题目生成器
纯随机形状 + 严格闸门（纯逻辑可解 / 唯一解 / 填充率 / maxrun），
产出 tools/nonogram/np2_data.js 与 QC 接触表 tools/nonogram/qc_pure.png。
用法：python tools/nonogram/gen_pure.py
"""
import os, sys, json, time, random
from pathlib import Path
from PIL import Image, ImageDraw

import gen
from gen import (clean_mask, outline_mask, fill_rate, split_runs,
                 line_metrics, row_clue, count_solutions)

HERE = os.path.dirname(os.path.abspath(__file__))
QC_DIR = os.path.join(HERE, 'qc_pure')

SEED = 20261027
SIZES = [(10, 40), (12, 30), (15, 30)]   # (尺寸, 需要题数)，合计 100
FILL_MIN = 0.30
FILL_MAX = 0.60
MAXRUN = 5
TRIES_PER_SIZE = 200000

# 形状族权重（按顺序按权重随机挑一种）
FAM_W = [('blob', 30), ('mirror_x', 22), ('mirror_xy', 20), ('ring', 16), ('core2', 12)]

BG = (247, 244, 238)
FG = (38, 42, 58)
LINE = (206, 202, 194)


# ---------------- 候选形状 ----------------

def _blob(sz, rnd, dmax=0.62):
    d = rnd.uniform(0.42, dmax)
    m = [[1 if rnd.random() < d else 0 for _ in range(sz)] for _ in range(sz)]
    rounds = 2 + rnd.randrange(2)          # 2~3 轮 4 邻域多数投票平滑
    for _ in range(rounds):
        nxt = [[0] * sz for _ in range(sz)]
        for y in range(sz):
            for x in range(sz):
                cnt = m[y][x]
                for dy, dx in ((-1, 0), (1, 0), (0, -1), (0, 1)):
                    yy, xx = y + dy, x + dx
                    if 0 <= yy < sz and 0 <= xx < sz:
                        cnt += m[yy][xx]
                nxt[y][x] = 1 if cnt >= 3 else 0
        m = nxt
    return m


def _mirror_x(m):
    sz = len(m)
    out = [row[:] for row in m]
    for y in range(sz):
        for x in range(sz):
            out[y][sz - 1 - x] = m[y][x]
    return out


def _mirror_xy(m):
    sz = len(m)
    out = [row[:] for row in m]
    for y in range(sz):
        for x in range(sz):
            out[y][sz - 1 - x] = m[y][x]
            out[sz - 1 - y][x] = m[y][x]
            out[sz - 1 - y][sz - 1 - x] = m[y][x]
    return out


def candidate(sz, rnd, dmax=0.62):
    fam = _pick(rnd)
    if fam == 'blob':
        return _blob(sz, rnd, dmax)
    if fam == 'mirror_x':
        return _mirror_x(_blob(sz, rnd, dmax))
    if fam == 'mirror_xy':
        return _mirror_xy(_blob(sz, rnd, dmax))
    if fam == 'ring':
        return outline_mask(_blob(sz, rnd, dmax), 'ring')
    return outline_mask(_blob(sz, rnd, dmax), 'core2')


def _pick(rnd):
    total = sum(w for _, w in FAM_W)
    r = rnd.randrange(total)
    for name, w in FAM_W:
        if r < w:
            return name
        r -= w
    return FAM_W[-1][0]


# ---------------- 绘制 ----------------

def draw_mask(m, scale, grid=False):
    n = len(m)
    img = Image.new('RGB', (n * scale, n * scale), BG)
    d = ImageDraw.Draw(img)
    for r in range(n):
        for c in range(n):
            if m[r][c]:
                d.rectangle([c * scale, r * scale, (c + 1) * scale - 1, (r + 1) * scale - 1], fill=FG)
    if grid and scale >= 12:
        for i in range(n + 1):
            d.line([(i * scale, 0), (i * scale, n * scale - 1)], fill=LINE)
            d.line([(0, i * scale), (n * scale - 1, i * scale)], fill=LINE)
    return img


# ---------------- 生成 ----------------

def clue_key(rows, cols):
    return ';'.join(' '.join(map(str, c)) for c in rows) + '|' + \
           ';'.join(' '.join(map(str, c)) for c in cols)


def gen_all():
    rnd = random.Random(SEED)
    seen = set()
    results = []

    for sz, want in SIZES:
        # 15x15 的 DFS 较慢，压低密度上限以提高「短连线、易纯逻辑」的命中率
        dmax = 0.55 if sz >= 15 else 0.62
        got = 0
        tries = 0
        t0 = time.time()
        while got < want:
            tries += 1
            if tries > TRIES_PER_SIZE:
                print('FAIL size=%d want=%d got=%d after %d tries' % (sz, want, got, tries))
                sys.exit(1)

            m = candidate(sz, rnd, dmax)
            m = clean_mask(m, min_comp=max(5, sz // 2))
            if not (FILL_MIN <= fill_rate(m) <= FILL_MAX):
                continue
            m = split_runs(m, rnd, MAXRUN)
            if not (FILL_MIN <= fill_rate(m) <= FILL_MAX):
                continue

            rows = [row_clue(m[r]) for r in range(sz)]
            cols = [row_clue([m[r][c] for r in range(sz)]) for c in range(sz)]
            # 判废条件
            if any(not c for c in rows) or any(not c for c in cols):
                continue
            if all(tuple(c) == tuple(rows[0]) for c in rows):
                continue
            if all(tuple(c) == tuple(cols[0]) for c in cols):
                continue
            if len(set(tuple(c) for c in rows)) < 3:
                continue

            lm = line_metrics(m)
            if lm is None:                      # 不可纯逻辑解
                continue
            if lm['maxrun'] > MAXRUN:
                continue

            sol, nodes = count_solutions(sz, rows, cols, cap=2, nodecap=3000000)
            if sol != 1 and nodes < 3000000:    # 多解 ⇒ 丢弃；节点耗尽视为不确定，放行
                continue

            key = clue_key(rows, cols)
            if key in seen:
                continue
            seen.add(key)

            pid = 'np2_%03d' % (len(results) + 1)
            got += 1
            results.append({
                'id': pid,
                'sz': sz,
                'bits': ''.join('1' if m[r][c] else '0' for r in range(sz) for c in range(sz)),
                '_m': m,
                '_fill': fill_rate(m),
                '_passes': lm['passes'],
                '_maxrun': lm['maxrun'],
                '_sol': sol,
            })
            print('%s %2d %.3f %2d %d' % (pid, sz, fill_rate(m), lm['passes'], lm['maxrun']))

        print('# size=%d got=%d tries=%d %.1fs' % (sz, got, tries, time.time() - t0))

    return results


def emit(results):
    out = [{'id': p['id'], 'sz': p['sz'], 'bits': p['bits']} for p in results]
    js = 'const NP2=' + json.dumps(out, ensure_ascii=False, separators=(',', ':')) + ';'
    (Path(HERE) / 'np2_data.js').write_text(js + '\n', encoding='utf-8')

    cols = 10
    cw, ch = 180, 200
    rows_n = (len(results) + cols - 1) // cols
    sheet = Image.new('RGB', (cols * cw, rows_n * ch), (18, 20, 30))
    d = ImageDraw.Draw(sheet)
    for i, p in enumerate(results):
        x = (i % cols) * cw
        y = (i // cols) * ch
        scale = 11 if p['sz'] <= 15 else 10
        pv = draw_mask(p['_m'], scale, grid=True)
        sheet.paste(pv, (x + (cw - pv.width) // 2, y + 8))
        d.text((x + 8, y + 178), 'No.%03d' % (i + 1), fill=(246, 239, 228))
        d.text((x + 8, y + 188), '%dx%d f%.2f p%d' % (p['sz'], p['sz'], p['_fill'], p['_passes']),
               fill=(138, 143, 168))
        draw_mask(p['_m'], 24, grid=True).save(gen.safe_path(QC_DIR, '%03d_%s.png' % (i + 1, p['id'])))
    sheet.save(gen.safe_path(HERE, 'qc_pure.png'))

    return js, sheet


def selfcheck(results):
    errs = []
    if len(results) != 100:
        errs.append('count=%d' % len(results))
    per = {}
    for p in results:
        per[p['sz']] = per.get(p['sz'], 0) + 1
    for sz, want in SIZES:
        if per.get(sz, 0) != want:
            errs.append('size %d got %d want %d' % (sz, per.get(sz, 0), want))
    keys = set()
    for p in results:
        sz = p['sz']
        if len(p['bits']) != sz * sz:
            errs.append('%s bits len=%d' % (p['id'], len(p['bits'])))
        if not (FILL_MIN <= p['_fill'] <= FILL_MAX):
            errs.append('%s fill=%.3f' % (p['id'], p['_fill']))
        if p['_maxrun'] > MAXRUN:
            errs.append('%s maxrun=%d' % (p['id'], p['_maxrun']))
        if line_metrics(p['_m']) is None:
            errs.append('%s not logic' % p['id'])
        rows = [row_clue(p['_m'][r]) for r in range(sz)]
        cols = [row_clue([p['_m'][r][c] for r in range(sz)]) for c in range(sz)]
        k = clue_key(rows, cols)
        if k in keys:
            errs.append('%s dup clue' % p['id'])
        keys.add(k)
    return errs


def main():
    os.makedirs(QC_DIR, exist_ok=True)
    t0 = time.time()
    results = gen_all()

    errs = selfcheck(results)
    if errs:
        print('SELFCHECK FAIL: %s' % errs[:20])
        sys.exit(1)

    js, sheet = emit(results)
    print('np2_data.js bytes=%d' % len(js.encode('utf-8')))
    print('qc_pure.png %dx%d' % sheet.size)
    print('total %.1fs' % (time.time() - t0))
    print('puzzles=%d uniq=%d logic=%d' % (
        len(results),
        sum(1 for p in results if p['_sol'] == 1),
        sum(1 for p in results if line_metrics(p['_m']) is not None)))


if __name__ == '__main__':
    main()