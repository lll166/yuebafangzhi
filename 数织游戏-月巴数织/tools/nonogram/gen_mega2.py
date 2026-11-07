# -*- coding: utf-8 -*-
"""月巴数织 · 超级数织 V3 规则生成器（试做第 1 题）

V3 规则（与 V2 的差别 = 「大数字与小数字分开计数」）：
  1. 超级线索 N：挂在相邻行对 (a,a+1) 的线索带上。要求该 2 行并集里
     存在跨两行的连通分量，其大小多重集恰为 sr[a]。
     sr[a] 为空 => 这两行之间不允许出现任何上下相接的填充（垂直阻断的根）。
  2. 大数字是独立提示：超级块占用的格子 **不计入所在行的小线索**，
     行线索只描述「整块落在单行内」的色块；列线索照常统计全部填充格。
  3. 因此 S 是极大连通分量（自动隔离）：它不能与普通块边相邻连通。
  4. 超级块两侧至少各留一整列空白（两行一列空档）。

解算循环：
  A 行（放宽：允许比行线索多一段超级块）/ 列（正常）交集法
  B 每一对相邻行枚举两行排列对：跨行分量多重集恰等于 sr[a]；
    超级带还要求 clue(行 - 跨行格) 恰等于该行小线索；全部合法对取交集
  循环到不动点。所有推断可靠（sound），推满即唯一解、无猜测。

用法：python tools/nonogram/gen_mega2.py
"""
import os, sys, json, random
from gen import patterns, row_clue

HERE = os.path.dirname(os.path.abspath(__file__))
SEED = int(os.environ.get('MEGA_SEED', '20261028'))
N = 10
TRIES = 30000


# ---------------- 两行带的跨行连通分量 ----------------

_CACHE = {}
_CACHE_MAX = 3000000


def band_comps(n, pa, pb):
    """pa / pb 为行位掩码。返回「同时占据两行」的极大 4 连通块大小（升序元组）。"""
    key = (n, pa, pb)
    v = _CACHE.get(key)
    if v is not None:
        return v
    if len(_CACHE) > _CACHE_MAX:
        _CACHE.clear()
    if not (pa & pb):
        _CACHE[key] = ()
        return ()
    seen = [False] * (2 * n)
    out = []
    for sy in (0, 1):
        base = (pa if sy == 0 else pb)
        for sx in range(n):
            if not ((base >> sx) & 1) or seen[sy * n + sx]:
                continue
            stack = [(sy, sx)]
            seen[sy * n + sx] = True
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
                    if 0 <= ny < 2 and 0 <= nx < n:
                        if seen[ny * n + nx]:
                            continue
                        m = pa if ny == 0 else pb
                        if (m >> nx) & 1:
                            seen[ny * n + nx] = True
                            stack.append((ny, nx))
            if ta and tb:
                out.append(size)
    out.sort()
    v = tuple(out)
    _CACHE[key] = v
    return v


# ---------------- 构造终盘：符合「无超级线索处不许上下相连」的色块 ----------------

def try_build(rnd, n, fill_lo=0.28, fill_hi=0.62):
    g = [[0] * n for _ in range(n)]
    g_mega = [[False] * n for _ in range(n)]
    mega = []          # [(a, cells)]

    def free(r, c):
        return 0 <= r < n and 0 <= c < n and g[r][c] == 0

    def place_mega(cells):
        """超级块：四周邻接格必须全空 —— 既是「与其他色块不相连」也是「两侧整列空档」。"""
        cells = set(cells)
        for (r, c) in cells:
            if not free(r, c):
                return False
        for (r, c) in cells:
            for dr, dc in ((-1, 0), (1, 0), (0, -1), (0, 1)):
                nr, nc = r + dr, c + dc
                if 0 <= nr < n and 0 <= nc < n and (nr, nc) not in cells and g[nr][nc]:
                    return False
        for (r, c) in cells:
            g[r][c] = 1
            g_mega[r][c] = True
        return True

    def place_run(r, c0, ln):
        """普通长条：上下相邻格必须为空（无超级线索处不许上下相连）；
        与超级块左右不能相接（超级块必须隔离）；普通长条之间可以相接（自然并块）。"""
        if c0 < 0 or c0 + ln > n:
            return False
        for c in range(c0, c0 + ln):
            if not free(r, c):
                return False
            for rr in (r - 1, r + 1):
                if 0 <= rr < n and g[rr][c]:
                    return False
        if c0 > 0 and g_mega[r][c0 - 1]:
            return False
        if c0 + ln < n and g_mega[r][c0 + ln]:
            return False
        for c in range(c0, c0 + ln):
            g[r][c] = 1
        return True

    # 超级块：跨越相邻两行的一段连续点亮格子，x = k1+k2（奇数同样有效 => 可错位成 L 形）。
    # 形状 (k1, k2, d)：第 a 行占 x..x+k1-1，第 a+1 行占 x+d..x+d+k2-1；
    # 0 <= d <= k1-1 保证两行至少重叠 1 列 => 连通。
    odd_shapes = [(3, 2, 0), (3, 2, 1), (3, 2, 2), (2, 3, 0), (2, 3, 1), (4, 1, 0), (4, 1, 3)]
    even_shapes = [(3, 3, 0), (3, 3, 2), (2, 2, 0), (2, 2, 1), (4, 4, 0), (4, 4, 3)]
    shapes = [rnd.choice(odd_shapes), rnd.choice(even_shapes)]
    rnd.shuffle(shapes)
    picks = []
    for _ in range(200):
        cand = rnd.sample(range(0, n - 1), len(shapes))
        if all(abs(cand[i] - cand[j]) >= 2 for i in range(len(cand)) for j in range(i + 1, len(cand))):
            picks = cand
            break
    if not picks:
        return None
    for a, (k1, k2, d) in zip(picks, shapes):
        ok = False
        for _ in range(200):
            x = rnd.randint(1, n - 1 - max(k1, d + k2))
            cells = [(a, x + i) for i in range(k1)] + [(a + 1, x + d + j) for j in range(k2)]
            if place_mega(cells):
                mega.append((a, cells))
                ok = True
                break
        if not ok:
            return None

    def add_runs(r, target):
        """在该行按随机顺序找可放位置，尽量补到 target 格。"""
        have = sum(1 for c in range(n) if g[r][c])
        for _ in range(40):
            if have >= target:
                return
            ln = min(target - have, rnd.choice([2, 3, 4, 5]))
            if ln < 2:
                ln = 2
            placed = False
            for ln2 in ([ln, 3, 2] if ln > 2 else [ln]):
                spots = list(range(0, n - ln2 + 1))
                rnd.shuffle(spots)
                for c0 in spots:
                    if place_run(r, c0, ln2):
                        have += ln2
                        placed = True
                        break
                if placed:
                    break
            if not placed:
                return

    # 超级带的上下两行各自再放一条普通长条：让行线索仍有内容
    super_rows = sorted(set([a for a, _ in mega] + [a + 1 for a, _ in mega]))
    rnd.shuffle(super_rows)
    for r in super_rows:
        add_runs(r, sum(1 for c in range(n) if g[r][c]) + rnd.choice([3, 4]))

    # 其余行放普通长条
    order = list(range(n))
    rnd.shuffle(order)
    for r in order:
        add_runs(r, rnd.choice([5, 6, 6, 7, 7, 8]))

    # v3：大数字与小数字分开计数 —— 超级块占用的格子不计入所在行的小线索，
    # 行线索只描述「整块落在单行内」的色块；列线索照常统计全部填充格。
    mega_cells = set()
    for a, cells in mega:
        mega_cells.update(cells)
    rows = []
    for r in range(n):
        b = [1 if (g[r][c] and (r, c) not in mega_cells) else 0 for c in range(n)]
        rows.append(row_clue(b))
    cols = [row_clue([g[r][c] for r in range(n)]) for c in range(n)]
    fill = sum(sum(r) for r in g) / float(n * n)
    if not (fill_lo <= fill <= fill_hi):
        return None
    if sum(1 for x in rows if not x) > 4 or sum(1 for x in cols if not x) > 3:
        return None
    sr = [[] for _ in range(n - 1)]
    for a, cells in mega:
        sr[a].append(len(cells))
    for a in range(n - 1):
        sr[a].sort()

    # 规则校验：
    # 1) 超级块两端都留出「两行一列」的整列空档（不贴左右边，place 的隔离保证两侧各有一列全空）
    # 2) 超级带的上下两行还要另有普通色块，让行线索仍有内容、超级块与之互不粘连
    for a, cells in mega:
        band_cols = [c for (r, c) in cells]
        if min(band_cols) == 0 or max(band_cols) == n - 1:
            return None
        sc_set = set(cells)
        extra = False
        for r in (a, a + 1):
            if any(g[r][c] and (r, c) not in sc_set for c in range(n)):
                extra = True
        if not extra:
            return None
    return g, rows, cols, sr


# ---------------- 求解器 ----------------

def compat(states, pat, n):
    fill = cross = 0
    for i in range(n):
        if states[i] == 1:
            fill |= 1 << i
        elif states[i] == 0:
            cross |= 1 << i
    return (pat & cross) == 0 and (fill & ~pat) == 0


def commit_line(st, andm, orm, n):
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


# ---------------- v3：大数字与小数字分开计数 ----------------

def clue_mask(n, m):
    """位掩码 -> 行线索。"""
    out = []
    run = 0
    for i in range(n):
        if (m >> i) & 1:
            run += 1
        elif run:
            out.append(run)
            run = 0
    if run:
        out.append(run)
    return out


def minus_one(cl, target):
    """cl 去掉任意一段后是否恰等于 target（超级块那段被排除）。"""
    if len(cl) != len(target) + 1:
        return False
    for k in range(len(cl)):
        if cl[:k] + cl[k + 1:] == target:
            return True
    return False


_ROW_CANDS = {}


def row_cands(n, target, state, allow_extra):
    """该行所有兼容当前状态的「完整排列」；allow_extra 时允许比小线索多一段超级块。"""
    f = x = 0
    for i, v in enumerate(state):
        if v == 1:
            f |= 1 << i
        elif v == 0:
            x |= 1 << i
    key = (n, tuple(target), f, x, allow_extra)
    hit = _ROW_CANDS.get(key)
    if hit is not None:
        return hit
    out = []
    for m in range(1 << n):
        if (m & x) or (f & ~m):
            continue
        cl = clue_mask(n, m)
        if cl == target or (allow_extra and minus_one(cl, target)):
            out.append(m)
    if len(_ROW_CANDS) > 200000:
        _ROW_CANDS.clear()
    _ROW_CANDS[key] = out
    return out


def band_cross(n, pa, pb):
    """两行带里「跨两行」的极大连通块：返回 (大小列表, 上行格掩码, 下行格掩码)。"""
    ua, ub = pa, pb
    comps, ca, cb = [], 0, 0
    while ua or ub:
        fa = ua & -ua
        if fa:
            ua &= ~fa
            A, B = fa, 0
        else:
            fb = ub & -ub
            ub &= ~fb
            A, B = 0, fb
        while True:
            A2 = ((A | (A << 1) | (A >> 1)) & pa) | (B & pa)
            B2 = ((B | (B << 1) | (B >> 1)) & pb) | (A & pb)
            if A2 == A and B2 == B:
                break
            A, B = A2, B2
        ua &= ~A
        ub &= ~B
        if A and B:
            comps.append(bin(A).count('1') + bin(B).count('1'))
            ca |= A
            cb |= B
    comps.sort()
    return comps, ca, cb


def band_pairs(n, clA, clB, stA, stB, want, allowA, allowB, own):
    """枚举两行排列对：跨行分量恰等于 want；own 时还校验「行 - 跨行格」等于小线索。"""
    pa_list = row_cands(n, clA, stA, allowA)
    if not pa_list:
        return None
    pb_list = row_cands(n, clB, stB, allowB)
    if not pb_list:
        return None
    w = list(want)
    aa = oa = ab = ob = None
    for pa in pa_list:
        for pb in pb_list:
            comps, ca, cb = band_cross(n, pa, pb)
            if comps != w:
                continue
            if own:
                if clue_mask(n, pa & ~ca) != clA:
                    continue
                if clue_mask(n, pb & ~cb) != clB:
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


def solve(n, rows, cols, sr, use_mega=True):
    st = [[-1] * n for _ in range(n)]
    allow = [False] * n
    for a in range(n - 1):
        if sr[a]:
            allow[a] = True
            allow[a + 1] = True
    for _ in range(300):
        changed = False
        for r in range(n):
            if use_mega and allow[r]:
                cands = row_cands(n, rows[r], st[r], True)
            else:
                cands = [p for p in patterns(n, rows[r]) if compat(st[r], p, n)]
            if not cands:
                return None
            av = (1 << n) - 1
            ov = 0
            for p in cands:
                av &= p
                ov |= p
            if commit_line(st[r], av, ov, n):
                changed = True
        for c in range(n):
            col = [st[r][c] for r in range(n)]
            cands = [p for p in patterns(n, cols[c]) if compat(col, p, n)]
            if not cands:
                return None
            av = (1 << n) - 1
            ov = 0
            for p in cands:
                av &= p
                ov |= p
            col2 = col[:]
            if commit_line(col2, av, ov, n):
                changed = True
                for r in range(n):
                    st[r][c] = col2[r]
        if use_mega:
            for a in range(n - 1):
                res = band_pairs(n, rows[a], rows[a + 1], st[a], st[a + 1],
                                 tuple(sorted(sr[a])), allow[a], allow[a + 1], bool(sr[a]))
                if res is None:
                    return None
                if commit_line(st[a], res[0], res[1], n):
                    changed = True
                if commit_line(st[a + 1], res[2], res[3], n):
                    changed = True
        if not changed:
            break
    return st


def full(st):
    return all(v != -1 for row in st for v in row)


def match(st, g):
    n = len(g)
    return all(st[r][c] == g[r][c] for r in range(n) for c in range(n))


# ---------------- 主流程 ----------------

def main():
    rnd = random.Random(SEED)
    best = None
    for t in range(1, TRIES + 1):
        r = try_build(rnd, N)
        if r is None:
            continue
        g, rows, cols, sr = r
        if not sum(len(v) for v in sr):
            continue
        if not any(v % 2 for band in sr for v in band):
            continue
        base = solve(N, rows, cols, sr, use_mega=False)
        if base is not None and full(base):
            continue
        st = solve(N, rows, cols, sr, use_mega=True)
        if st is None or not full(st) or not match(st, g):
            continue
        best = (g, rows, cols, sr, t)
        break

    if best is None:
        print('FAIL no v3 puzzle in %d tries' % TRIES)
        sys.exit(1)

    g, rows, cols, sr, t = best
    bits = ''.join('1' if g[r][c] else '0' for r in range(N) for c in range(N))
    obj = {
        'id': 'np3_001', 'sz': N, 'v': 3, 'bits': bits,
        'rows': rows, 'cols': cols,
        'sr': sr, 'sc': [[] for _ in range(N - 1)],
    }
    print('tries=%d super=%d' % (t, sum(len(v) for v in sr)))
    print('JS=' + json.dumps(obj, ensure_ascii=False, separators=(',', ':')))
    st = solve(N, rows, cols, sr, use_mega=True)
    assert st is not None and full(st) and match(st, g)
    print('OK v3 logic-solvable & unique')
    for a in range(N - 1):
        if sr[a]:
            print('band %d super %s' % (a, sr[a]))
    for r in range(N):
        print(''.join('#' if g[r][c] else '.' for c in range(N)))


if __name__ == '__main__':
    main()
