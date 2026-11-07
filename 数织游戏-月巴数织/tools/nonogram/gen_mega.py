# -*- coding: utf-8 -*-
"""月巴数织 · 离线「超级数织（Mega Picross）」题目生成器

规则（标准超级数织）：
  普通线索：与标准数织一致，只约束自己所在的行 / 列。
  超级线索：跨越相邻两行 (a, a+1) 或相邻两列 (b, b+1)，数值 N 表示——
            在这两行（列）组成的 2×n 带状区域内，存在一个 4 邻接连通块，
            它同时占据这两行（列）中的每一行，且大小恰为 N。
            一对相邻行列可以挂多个超级线索（按升序），也可能一个都没有。

解算器（与生成器共用同一套规则）：
  1. 普通数织线推演：行、列各自用 patterns + 交集法。
  2. 超级线索传播：枚举双行（双列）中所有满足普通线索的 (pa, pb) 组合，
     只保留「对每条超级线索 N，带状内都存在一个跨两行、大小为 N 的连通块」的组合，
     再对全部合法组合取交集——全为 1 的格确定涂黑，全为 0 的格确定判空。
  交集法只做「上界收缩」，是**可靠**（sound）的：真解必在每个候选集内，
  因此「传播能把整盘推完」⇒ 解唯一，且不需要任何猜测。
  超级线索采用**存在性语义**（不是"列全所有块"），因此可以只挑真正需要的那些，
  题面上的超级数字保持稀疏、贴近真实超级数织的观感。

生成闸门：
  A. 只用普通行列线索推不完（否则超级线索是多余的、可删掉）；
  B. 普通行列 + 超级线索联合传播能完全推完，且结果 == 原解（唯一解、无猜测）；
  C. 至少存在 1 个超级线索，且每个超级线索都能由原解满足。
  生成时先把该盘所有可能的超级线索全部挂上，确认可推完；再按目标条数
  （SUPER_TARGET，随尺寸递增）随机裁掉多余的——删掉后仍能推完的才允许删，
  因此最终线索集一定仍然「推得出唯一解」，同时保留足够的超级数字供玩家推理。

产出 tools/nonogram/np3_data.js 与 QC 接触表 tools/nonogram/qc_mega.png。
用法：python tools/nonogram/gen_mega.py
"""
import os, sys, json, time, random
from pathlib import Path
from PIL import Image, ImageDraw

import gen
import gen_pure
from gen import clean_mask, fill_rate, split_runs, row_clue, patterns, compat

HERE = os.path.dirname(os.path.abspath(__file__))
QC_DIR = os.path.join(HERE, 'qc_mega')

SEED = 20261127
BATCHES = 2                              # 批次数，每批 20 题；第 0 批为初始题（种子 SEED）
SIZES = [(10, 8), (12, 6), (15, 6)]      # (尺寸, 每批需要题数)，每批合计 20
SUPER_TARGET = {10: 6, 12: 9, 15: 14}    # 每题希望保留的超级线索条数（上限）
FILL_MIN = 0.30
FILL_MAX = 0.60
MAXRUN = 5
TRIES_PER_SIZE = 400000

BG = (247, 244, 238)
FG = (38, 42, 58)
MG = (32, 36, 52)
LINE = (206, 202, 194)


# ---------------- 超级线索：带状连通块 ----------------

_BCACHE = {}
_BCACHE_MAX = 4000000


def band_components(n, ra, rb):
    """2×n 带状区域内的极大 4 邻接连通块；返回「同时占据两行」的块大小（升序）。"""
    grid = (ra, rb)
    seen = [[False] * n for _ in range(2)]
    out = []
    for sy in range(2):
        for sx in range(n):
            if not grid[sy][sx] or seen[sy][sx]:
                continue
            stack = [(sy, sx)]
            seen[sy][sx] = True
            size = 0
            ta = tb = False
            while stack:
                cy, cx = stack.pop()
                size += 1
                if cy == 0:
                    ta = True
                else:
                    tb = True
                for dy, dx in ((-1, 0), (1, 0), (0, -1), (0, 1)):
                    ny, nx = cy + dy, cx + dx
                    if 0 <= ny < 2 and 0 <= nx < n and grid[ny][nx] and not seen[ny][nx]:
                        seen[ny][nx] = True
                        stack.append((ny, nx))
            if ta and tb:
                out.append(size)
    out.sort()
    return out


def band_comps_mask(n, pa, pb):
    """位掩码版，带缓存。pa / pb 为 length-n 的行掩码。"""
    key = (n, pa, pb)
    v = _BCACHE.get(key)
    if v is not None:
        return v
    if len(_BCACHE) > _BCACHE_MAX:
        _BCACHE.clear()
    ra = [(pa >> c) & 1 for c in range(n)]
    rb = [(pb >> c) & 1 for c in range(n)]
    v = tuple(band_components(n, ra, rb))
    _BCACHE[key] = v
    return v


def derive_supers(n, m):
    """从解推导「全部可能的」超级线索（去重、升序）。返回 (sr, sc)，元素为 int 列表。"""
    sr = [sorted(set(band_components(n, m[a], m[a + 1]))) for a in range(n - 1)]
    sc = []
    for a in range(n - 1):
        ca = [m[r][a] for r in range(n)]
        cb = [m[r][a + 1] for r in range(n)]
        sc.append(sorted(set(band_components(n, ca, cb))))
    return sr, sc


# ---------------- 传播求解器 ----------------

def _deduce(n, clue, states):
    """单线交集法。states: -1/0/1 列表。返回 (and, or)，或 None 表示矛盾。"""
    cand = [p for p in patterns(n, clue) if compat(states, p, n)]
    if not cand:
        return None
    a = o = cand[0]
    for p in cand[1:]:
        a &= p
        o |= p
    return a, o


def _commit(st, andm, orm, n):
    """把 (and, or) 落到 st 上，返回是否有新确定格。"""
    ch = False
    for i in range(n):
        if (andm >> i) & 1:
            if st[i] != 1:
                st[i] = 1
                ch = True
        elif not ((orm >> i) & 1):
            if st[i] != 0:
                st[i] = 0
                ch = True
    return ch


def _mega_pairs(n, clueA, clueB, want, sa, sb):
    """枚举满足两行普通线索 + 超级线索（存在性语义）的全部 (pa,pb)。
    返回 (andA, orA, andB, orB) 或 None（无合法组合）。"""
    pa_list = [p for p in patterns(n, clueA) if compat(sa, p, n)]
    if not pa_list:
        return None
    pb_list = [p for p in patterns(n, clueB) if compat(sb, p, n)]
    if not pb_list:
        return None
    want = tuple(sorted(set(want)))
    aa = oa = ab = ob = None
    for pa in pa_list:
        for pb in pb_list:
            comps = band_comps_mask(n, pa, pb)
            ok = True
            for N in want:
                if N not in comps:
                    ok = False
                    break
            if not ok:
                continue
            if aa is None:
                aa = oa = pa
                ab = ob = pb
            else:
                aa &= pa
                oa |= pa
                ab &= pb
                ob |= pb
    if aa is None:
        return None
    return aa, oa, ab, ob


def propagate(n, rows, cols, sr, sc, use_supers=True):
    """线推演 + 超级线索传播。返回状态矩阵（-1/0/1），或 None（矛盾）。"""
    st = [[-1] * n for _ in range(n)]
    for _ in range(500):
        changed = False
        for r in range(n):
            d = _deduce(n, rows[r], st[r])
            if d is None:
                return None
            if _commit(st[r], d[0], d[1], n):
                changed = True
        for c in range(n):
            col = [st[r][c] for r in range(n)]
            d = _deduce(n, cols[c], col)
            if d is None:
                return None
            if _commit(col, d[0], d[1], n):
                for r in range(n):
                    st[r][c] = col[r]
                changed = True
        if use_supers:
            for a in range(n - 1):
                if not sr[a]:
                    continue
                res = _mega_pairs(n, rows[a], rows[a + 1], sr[a], st[a], st[a + 1])
                if res is None:
                    return None
                if _commit(st[a], res[0], res[1], n):
                    changed = True
                if _commit(st[a + 1], res[2], res[3], n):
                    changed = True
            for a in range(n - 1):
                if not sc[a]:
                    continue
                ca = [st[r][a] for r in range(n)]
                cb = [st[r][a + 1] for r in range(n)]
                res = _mega_pairs(n, cols[a], cols[a + 1], sc[a], ca, cb)
                if res is None:
                    return None
                chA = _commit(ca, res[0], res[1], n)
                chB = _commit(cb, res[2], res[3], n)
                if chA:
                    for r in range(n):
                        st[r][a] = ca[r]
                    changed = True
                if chB:
                    for r in range(n):
                        st[r][a + 1] = cb[r]
                    changed = True
        if not changed:
            break
    return st


def is_full(n, st):
    for r in range(n):
        for c in range(n):
            if st[r][c] == -1:
                return False
    return True


def matches(n, st, m):
    for r in range(n):
        for c in range(n):
            if st[r][c] != m[r][c]:
                return False
    return True


# ---------------- 生成 ----------------

def _nsup(cur):
    """当前 (sr, sc) 中超级线索总条数。"""
    return sum(len(v) for v in cur[0]) + sum(len(v) for v in cur[1])


def clue_key(rows, cols, sr, sc):
    return (';'.join(' '.join(map(str, c)) for c in rows) + '|' +
            ';'.join(' '.join(map(str, c)) for c in cols) + '|' +
            ';'.join(','.join(map(str, v)) for v in sr) + '|' +
            ';'.join(','.join(map(str, v)) for v in sc))


def gen_size(rnd, sz, want, seen, results):
    dmax = 0.55 if sz >= 15 else 0.62
    got = 0
    tries = 0
    t0 = time.time()
    while got < want:
        tries += 1
        if tries > TRIES_PER_SIZE:
            print('FAIL size=%d want=%d got=%d after %d tries' % (sz, want, got, tries))
            sys.exit(1)

        m = gen_pure.candidate(sz, rnd, dmax)
        m = clean_mask(m, min_comp=max(5, sz // 2))
        if not (FILL_MIN <= fill_rate(m) <= FILL_MAX):
            continue
        m = split_runs(m, rnd, MAXRUN)
        if not (FILL_MIN <= fill_rate(m) <= FILL_MAX):
            continue

        rows = [row_clue(m[r]) for r in range(sz)]
        cols = [row_clue([m[r][c] for r in range(sz)]) for c in range(sz)]
        if any(not c for c in rows) or any(not c for c in cols):
            continue
        if all(tuple(c) == tuple(rows[0]) for c in rows):
            continue
        if all(tuple(c) == tuple(cols[0]) for c in cols):
            continue
        if len(set(tuple(c) for c in rows)) < 3:
            continue
        if any(max(c) > MAXRUN for c in rows) or any(max(c) > MAXRUN for c in cols):
            continue

        sr, sc = derive_supers(sz, m)
        pool = [('r', a, v) for a in range(sz - 1) for v in sr[a]] + \
               [('c', a, v) for a in range(sz - 1) for v in sc[a]]
        if not pool:
            continue

        # 闸门 A：只用普通行列线索推不完
        base = propagate(sz, rows, cols, sr, sc, use_supers=False)
        if base is None or is_full(sz, base):
            continue

        # 先挂全部候选超级线索，确认可推完；再随机裁到目标条数（只裁「可裁」的）
        cur = [sorted(list(v)) for v in sr], [sorted(list(v)) for v in sc]
        st = propagate(sz, rows, cols, cur[0], cur[1], use_supers=True)
        if st is None or not is_full(sz, st) or not matches(sz, st, m):
            continue
        target = SUPER_TARGET[sz]
        order = list(pool)
        rnd.shuffle(order)
        for ax, a, v in order:
            if _nsup(cur) <= target:
                break
            arr = cur[0] if ax == 'r' else cur[1]
            if v not in arr[a]:
                continue
            arr[a] = [x for x in arr[a] if x != v]
            st2 = propagate(sz, rows, cols, cur[0], cur[1], use_supers=True)
            if st2 is None or not is_full(sz, st2) or not matches(sz, st2, m):
                arr[a] = sorted(arr[a] + [v])       # 删不得，放回去
        sr2, sc2 = cur[0], cur[1]
        nsup = _nsup(cur)
        if nsup == 0:
            continue

        key = clue_key(rows, cols, sr2, sc2)
        if key in seen:
            continue
        seen.add(key)

        pid = 'np3_%03d' % (len(results) + 1)
        got += 1
        results.append({
            'id': pid,
            'sz': sz,
            'bits': ''.join('1' if m[r][c] else '0' for r in range(sz) for c in range(sz)),
            'sr': sr2,
            'sc': sc2,
            '_m': m,
            '_fill': fill_rate(m),
            '_nsuper': nsup,
        })
        print('%s %2d f%.2f super=%d pool=%d' % (pid, sz, fill_rate(m), nsup, len(pool)))

    print('# size=%d got=%d tries=%d %.1fs' % (sz, got, tries, time.time() - t0))


def gen_all():
    seen = set()
    results = []
    for b in range(BATCHES):
        rnd = random.Random(SEED + b)
        print('== batch %d seed=%d' % (b, SEED + b))
        for sz, want in SIZES:
            gen_size(rnd, sz, want, seen, results)
    return results


# ---------------- 输出 ----------------

def draw_mask(m, scale, sr=None, sc=None, grid=True):
    n = len(m)
    pad_t = 26 if sc else 4
    pad_l = 34 if sr else 4
    img = Image.new('RGB', (n * scale + pad_l + 4, n * scale + pad_t + 4), BG)
    d = ImageDraw.Draw(img)
    ox, oy = pad_l, pad_t
    for r in range(n):
        for c in range(n):
            if m[r][c]:
                d.rectangle([ox + c * scale, oy + r * scale,
                             ox + (c + 1) * scale - 1, oy + (r + 1) * scale - 1], fill=FG)
    if grid:
        for i in range(n + 1):
            d.line([(ox + i * scale, oy), (ox + i * scale, oy + n * scale - 1)], fill=LINE)
            d.line([(ox, oy + i * scale), (ox + n * scale - 1, oy + i * scale)], fill=LINE)
    if sr:
        for a in range(n - 1):
            if not sr[a]:
                continue
            y = oy + (a + 1) * scale
            d.rectangle([0, y - 7, pad_l - 3, y + 7], fill=MG)
            d.text((pad_l // 2 - 4, y - 3), ','.join(map(str, sr[a])), fill=(246, 239, 228))
    if sc:
        for a in range(n - 1):
            if not sc[a]:
                continue
            x = ox + (a + 1) * scale
            d.rectangle([x - 7, 0, x + 7, pad_t - 3], fill=MG)
            d.text((x - 4, pad_t // 2 - 4), ','.join(map(str, sc[a])), fill=(246, 239, 228))
    return img


def emit(results):
    out = [{'id': p['id'], 'sz': p['sz'], 'bits': p['bits'], 'sr': p['sr'], 'sc': p['sc']}
           for p in results]
    js = 'const NP3=' + json.dumps(out, ensure_ascii=False, separators=(',', ':')) + ';'
    (Path(HERE) / 'np3_data.js').write_text(js + '\n', encoding='utf-8')

    cols = 5
    cw, ch = 320, 310
    rows_n = (len(results) + cols - 1) // cols
    sheet = Image.new('RGB', (cols * cw, rows_n * ch), (18, 20, 30))
    d = ImageDraw.Draw(sheet)
    for i, p in enumerate(results):
        x = (i % cols) * cw
        y = (i // cols) * ch
        scale = 15 if p['sz'] <= 12 else 12
        pv = draw_mask(p['_m'], scale, p['sr'], p['sc'], grid=True)
        sheet.paste(pv, (x + (cw - pv.width) // 2, y + 10))
        d.text((x + 8, y + ch - 34), 'No.%03d' % (i + 1), fill=(246, 239, 228))
        d.text((x + 8, y + ch - 22), '%dx%d f%.2f s%d' % (p['sz'], p['sz'], p['_fill'], p['_nsuper']),
               fill=(138, 143, 168))
        draw_mask(p['_m'], max(22, 270 // p['sz']), p['sr'], p['sc'], grid=True).save(
            gen.safe_path(QC_DIR, '%03d_%s.png' % (i + 1, p['id'])))
    sheet.save(gen.safe_path(HERE, 'qc_mega.png'))
    return js, sheet


def selfcheck(results):
    errs = []
    if len(results) != sum(w for _, w in SIZES) * BATCHES:
        errs.append('count=%d' % len(results))
    per = {}
    for p in results:
        per[p['sz']] = per.get(p['sz'], 0) + 1
    for sz, want in SIZES:
        if per.get(sz, 0) != want * BATCHES:
            errs.append('size %d got %d want %d' % (sz, per.get(sz, 0), want * BATCHES))
    keys = set()
    for p in results:
        sz = p['sz']
        if len(p['bits']) != sz * sz:
            errs.append('%s bits len=%d' % (p['id'], len(p['bits'])))
        if not (FILL_MIN <= p['_fill'] <= FILL_MAX):
            errs.append('%s fill=%.3f' % (p['id'], p['_fill']))
        if p['_nsuper'] == 0:
            errs.append('%s no super' % p['id'])
        m = [[1 if p['bits'][r * sz + c] == '1' else 0 for c in range(sz)] for r in range(sz)]
        allsr, allsc = derive_supers(sz, m)
        sr, sc = p['sr'], p['sc']
        for a in range(sz - 1):
            for v in sr[a]:
                if v not in allsr[a]:
                    errs.append('%s row super %d@%d not real' % (p['id'], v, a))
            for v in sc[a]:
                if v not in allsc[a]:
                    errs.append('%s col super %d@%d not real' % (p['id'], v, a))
        rows = [row_clue(m[r]) for r in range(sz)]
        cols = [row_clue([m[r][c] for r in range(sz)]) for c in range(sz)]
        if is_full(sz, propagate(sz, rows, cols, sr, sc, use_supers=False)):
            errs.append('%s super redundant' % p['id'])
        st = propagate(sz, rows, cols, sr, sc, use_supers=True)
        if st is None or not is_full(sz, st) or not matches(sz, st, m):
            errs.append('%s not logic-solvable' % p['id'])
        k = clue_key(rows, cols, sr, sc)
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
    print('np3_data.js bytes=%d' % len(js.encode('utf-8')))
    print('qc_mega.png %dx%d' % sheet.size)
    print('total %.1fs' % (time.time() - t0))
    print('puzzles=%d uniq=%d logic=%d super_required=%d' % (
        len(results), len(results), len(results), len(results)))


if __name__ == '__main__':
    main()