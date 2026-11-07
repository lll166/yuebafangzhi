# -*- coding: utf-8 -*-
"""月巴数织 · 批量生成 V3 超级数织（第 3~40 题）

沿用 gen_mega2.py 的 V3 规则与求解器：
  1. 超级线索挂在相邻行对 (a,a+1) 的线索带上，大小 = 该两行并集里跨两行的连通块格数；
  2. 超级块占用的格子不计入所在行的行线索，列线索照常统计；
  3. 超级块必须与其它色块隔离，两侧各留一整列空档。

每道题都自检：线索与终盘一致、逻辑可解且唯一、去掉大数字后推不完（大数字必需）；
并且「只看界面上给出的线索」也必须只有一个解（见 count_visible）。

用法：python tools/nonogram/gen_mega_batch.py [count]
输出：._np3_batch.json（同目录），供注入脚本使用。
"""
import os, sys, json, random, time
from pathlib import Path

HERE = os.path.dirname(os.path.abspath(__file__))
sys.path.insert(0, HERE)
from gen_mega2 import (clue_mask, row_cands, band_cross, solve, full, match, N, commit_line, compat)
from gen import row_clue, patterns, safe_path

# (上行格数, 下行格数, 下行相对上行的水平偏移)；0 <= d <= k1-1 保证两行至少重叠 1 列
SHAPES = [
    (3, 2, 0), (3, 2, 1), (3, 2, 2), (2, 3, 0), (2, 3, 1),      # 5
    (4, 1, 0), (4, 1, 3), (1, 4, 0),                             # 5
    (3, 3, 0), (3, 3, 2), (2, 2, 0), (2, 2, 1),                  # 6 / 4
    (4, 2, 0), (4, 2, 2), (2, 4, 0), (2, 4, 1),                  # 6
    (4, 3, 1), (3, 4, 2), (5, 2, 0), (2, 5, 0),                  # 7 / 7
    (4, 4, 0), (4, 4, 3),                                        # 8
    (5, 4, 0), (5, 4, 4), (4, 5, 0), (4, 5, 1),                  # 9
]


def build(rnd, n, nb, fill_target):
    g = [[0] * n for _ in range(n)]
    g_mega = [[False] * n for _ in range(n)]
    mega = []

    def free(r, c):
        return 0 <= r < n and 0 <= c < n and g[r][c] == 0

    def place_mega(cells):
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

    # 超级带的起始行：互不相邻，避免同一条行线索跨两个带
    picks = []
    for _ in range(300):
        cand = rnd.sample(range(0, n - 1), nb)
        if all(abs(cand[i] - cand[j]) >= 2 for i in range(nb) for j in range(i + 1, nb)):
            picks = cand
            break
    if not picks:
        return None

    shapes = rnd.sample(SHAPES, nb)
    for a, (k1, k2, d) in zip(picks, shapes):
        ok = False
        for _ in range(160):
            x = rnd.randint(1, n - 1 - max(k1, d + k2))
            cells = [(a, x + i) for i in range(k1)] + [(a + 1, x + d + j) for j in range(k2)]
            if place_mega(cells):
                mega.append((a, cells))
                ok = True
                break
        if not ok:
            return None

    def add_runs(r, target):
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

    # 超级带上下两行各补一条普通长条，保证行线索非空
    super_rows = sorted(set([a for a, _ in mega] + [a + 1 for a, _ in mega]))
    rnd.shuffle(super_rows)
    for r in super_rows:
        add_runs(r, sum(1 for c in range(n) if g[r][c]) + rnd.choice([3, 4]))

    order = list(range(n))
    rnd.shuffle(order)
    for r in order:
        add_runs(r, fill_target + rnd.choice([-1, 0, 0, 1]))

    mega_cells = set()
    for a, cells in mega:
        mega_cells.update(cells)
    rows = []
    for r in range(n):
        b = [1 if (g[r][c] and (r, c) not in mega_cells) else 0 for c in range(n)]
        rows.append(row_clue(b))
    cols = [row_clue([g[r][c] for r in range(n)]) for c in range(n)]

    fill = sum(sum(r) for r in g) / float(n * n)
    if not (0.28 <= fill <= 0.62):
        return None
    if sum(1 for x in rows if not x) > 4 or sum(1 for x in cols if not x) > 3:
        return None

    sr = [[] for _ in range(n - 1)]
    for a, cells in mega:
        sr[a].append(len(cells))
    for a in range(n - 1):
        sr[a].sort()

    # 规则校验：超级块不贴左右边，且超级带两行另有普通色块
    for a, cells in mega:
        band_cols = [c for (r, c) in cells]
        lo, hi = min(band_cols), max(band_cols)
        if lo == 0 or hi == n - 1:
            return None
        sc_set = set(cells)
        if not any(g[r][c] and (r, c) not in sc_set for r in (a, a + 1) for c in range(n)):
            return None
        # 两端各留一整列空档（带内两行都要空）——后补的普通长条不能挤进这一列
        for c in (lo - 1, hi + 1):
            if 0 <= c < n and any(g[r][c] for r in (a, a + 1)):
                return None
    return g, rows, cols, sr


def solve_base(n, rows, cols, sr):
    """与页面自检一致的基础传播：只有超级带上下两行放宽（允许多一段超级块）、
    其它行与所有列正常，且不做跨行带检查。页面的自检要求「只用普通线索推不完」，
    必须用同一口径，否则会出现「大数字多余」的题目。"""
    st = [[-1] * n for _ in range(n)]
    allow = [(a < n - 1 and bool(sr[a])) or (a > 0 and bool(sr[a - 1])) for a in range(n)]
    for _ in range(300):
        changed = False
        for r in range(n):
            cands = row_cands(n, rows[r], st[r], True) if allow[r] else \
                [p for p in patterns(n, rows[r]) if compat(st[r], p, n)]
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
        if not changed:
            break
    return st


def count_visible(rows, cols, sr, limit=2):
    """只按界面可见线索穷举解数（最多数到 limit）。

    可见线索 = 行小线索（超级带两行先剔除大数字块）、列线索、大数字本身。
    刻意不算「没有大数字的相邻两行不得上下相接」这条没写进 V3 说明的隐藏规则，
    否则会出现玩家按界面线索能推出第二个解、却只有官方解能通关的情况。
    """
    n = N
    band_of = [-1] * n
    for a in range(n - 1):
        if sr[a]:
            band_of[a] = a
            band_of[a + 1] = a
    row_lists = []
    for r in range(n):
        row_lists.append(row_cands(n, rows[r], [-1] * n, band_of[r] >= 0))
    if any(not lst for lst in row_lists):
        return 0

    pair_ok = {}

    def pair_valid(a, pa, pb):
        key = (a, pa, pb)
        hit = pair_ok.get(key)
        if hit is not None:
            return hit
        want = sorted(sr[a])
        ok = True
        if want:
            comps, ca, cb = band_cross(n, pa, pb)
            ok = (comps == want
                  and clue_mask(n, pa & ~ca) == rows[a]
                  and clue_mask(n, pb & ~cb) == rows[a + 1])
        pair_ok[key] = ok
        return ok

    def step(K, i, l, bit):
        if bit:
            if l > 0:
                if l + 1 > K[i]:
                    return None
                return (i, l + 1)
            if i >= len(K):
                return None
            return (i, 1)
        if l > 0:
            if l != K[i]:
                return None
            return (i + 1, 0)
        return (i, 0)

    def end_ok(c, st):
        i, l = st
        K = cols[c]
        if l == 0:
            return i == len(K)
        return i == len(K) - 1 and l == K[i]

    found = [0]

    def dfs(r, prev, colst):
        if found[0] >= limit:
            return
        if r == n:
            if all(end_ok(c, colst[c]) for c in range(n)):
                found[0] += 1
            return
        for pm in row_lists[r]:
            ns = []
            ok = True
            for c in range(n):
                nx = step(cols[c], colst[c][0], colst[c][1], (pm >> c) & 1)
                if nx is None:
                    ok = False
                    break
                ns.append(nx)
            if not ok:
                continue
            if r > 0 and sr[r - 1] and not pair_valid(r - 1, prev, pm):
                continue
            if band_of[r] < 0 and clue_mask(n, pm) != rows[r]:
                continue
            dfs(r + 1, pm, ns)
            if found[0] >= limit:
                return

    dfs(0, 0, [(0, 0)] * n)
    return found[0]


def gen_one(seed, nb, fill_target, tries=6000):
    rnd = random.Random(seed)
    for t in range(1, tries + 1):
        r = build(rnd, N, nb, fill_target)
        if r is None:
            continue
        g, rows, cols, sr = r
        if not any(len(v) for v in sr):
            continue
        # 大数字必须是必需的：只用放宽后的普通线索应当推不完
        base = solve_base(N, rows, cols, sr)
        if base is not None and full(base):
            continue
        st = solve(N, rows, cols, sr, use_mega=True)
        if st is None or not full(st) or not match(st, g):
            continue
        # 线索与终盘一致
        rowmask = [sum(1 << c for c in range(N) if g[r][c]) for r in range(N)]
        ok = True
        for a in range(N - 1):
            comps, _, _ = band_cross(N, rowmask[a], rowmask[a + 1])
            if comps != sr[a]:
                ok = False
                break
        if not ok:
            continue
        colmask = [sum(1 << r for r in range(N) if g[r][c]) for c in range(N)]
        for c in range(N):
            if clue_mask(N, colmask[c]) != cols[c]:
                ok = False
                break
        if not ok:
            continue
        # 只看界面线索也必须唯一（防止隐藏的「相邻行不相接」规则成为唯一区分点）
        if count_visible(rows, cols, sr) != 1:
            continue
        return g, rows, cols, sr, t
    return None


def main():
    count = int(sys.argv[1]) if len(sys.argv) > 1 else 38
    out = []
    t0 = time.time()
    for i in range(count):
        # 难度曲线：单带（较易）与双带交替，填格密度 6~8 递增
        nb = 1 if i % 3 == 1 else 2
        fill_target = 6 if i < 12 else (7 if i < 26 else 8)
        seed = 20261100 + i * 37
        got = None
        for bump in range(6):
            got = gen_one(seed + bump * 101, nb, fill_target)
            if got:
                break
        if not got:
            print('FAIL at index %d (nb=%d)' % (i, nb))
            sys.exit(1)
        g, rows, cols, sr, t = got
        bits = ''.join('1' if g[r][c] else '0' for r in range(N) for c in range(N))
        obj = {
            'id': 'np3_%03d' % (i + 3), 'sz': N, 'v': 3, 'bits': bits,
            'rows': rows, 'cols': cols,
            'sr': sr, 'sc': [[] for _ in range(N - 1)],
        }
        out.append(obj)
        bands = ['%d:%s' % (a, sr[a]) for a in range(N - 1) if sr[a]]
        print('ok %s bands=%s tries=%d %.1fs' % (obj['id'], ' '.join(bands), t, time.time() - t0))
        sys.stdout.flush()

    path = Path(HERE) / '_np3_batch.json'
    path.write_text(json.dumps(out, ensure_ascii=False, separators=(',', ':')), encoding='utf-8')
    print('written %s (%d puzzles, %.1fs)' % (path, len(out), time.time() - t0))


if __name__ == '__main__':
    main()
