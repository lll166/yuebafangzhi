# -*- coding: utf-8 -*-
"""月巴数织 · 离线题目生成器
读取 tools/nonogram/pool.json，下载/缓存立绘，生成 88 道题的 bits / 配色 / 解数标记，
并输出 tools/nonogram/np_data.js 与 QC 接触表 tools/nonogram/qc.png。
用法：python tools/nonogram/gen.py
"""
import os, sys, json, hashlib, io, math, time, random
import urllib.request, urllib.parse, socket, ipaddress
from pathlib import Path
from PIL import Image, ImageDraw

HERE = os.path.dirname(os.path.abspath(__file__))
CACHE = os.path.join(HERE, 'cache')
QC = os.path.join(HERE, 'qc')
UA = 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0 Safari/537.36'
B36 = '0123456789abcdefghijklmnopqrstuvwxyz'
# 这几张立绘自带不透明画布背景（云雾/墨迹），直接按 alpha 取会糊成一团，
# 需要先按边缘主色剔掉背景再取轮廓。
BG_STRIP = {'mb_zhengdian', 'mb_chaos'}
# 这些立绘在网格下就是实心剪影（整行/整列只有一段），题目等于直接报答案。
# 对它们改成「描边 + 保留内部小细节」，把长条碎成多段，难度回到正常区间。
# 值为 (描边模式, 取图阈值)：ring=1 格内边界 / core2=描边+内芯(中间留 1 格空隙) / thick2=2 格厚描边。
# 模式与阈值都按唯一解 + 纯逻辑可解 + 实际推演轮数挑过（详见 OUTLINE 注释）。
OUTLINE = {
    'mb_senlin': ('core2', 96),
    'mb_bashan': ('core2', 96),
    'm2_chuqian': ('core2', 96),
    'mb_shui': ('ring', 96),
    'mb_caihong': ('thick2', 96),
    'mb_chi': ('core2', 96),
    'm2_tracker': ('ring', 112),
}
# 这几张原图取出来有 2 个解（不唯一），只要把取图阈值挪几档，
# 边界上 1~4 个半透明像素的取舍变了，就回到唯一解 + 纯逻辑可解，外形几乎不变。
TH = {
    'bazong': 92,
    'm2_fanqie': 88,
    'mb_qiu': 92,
    'mb_wuding': 124,
    'mb_kafei': 92,
    'mb_lian': 108,
    'mb_liti': 72,
    'mb_zhoumo': 84,
}
os.makedirs(CACHE, exist_ok=True)
os.makedirs(QC, exist_ok=True)

# ---------------- 安全校验（路径穿越 / SSRF） ----------------

# 本工具只允许从图床拉图，禁止任意主机，避免被带入内网或云元数据地址
IMG_HOSTS = ('origin.picgo.net',)


def safe_path(base, *parts):
    """拼接路径并确认结果仍在 base 目录内，拒绝 ../ 越界。"""
    root = os.path.abspath(base)
    p = os.path.abspath(os.path.join(root, *parts))
    if os.path.commonpath([root, p]) != root:
        raise ValueError('path escapes base dir: %s' % p)
    return p


def safe_url(url):
    """只放行 http/https + 白名单主机 + 公网 IP，阻止内网、回环与元数据地址。"""
    u = urllib.parse.urlsplit(url)
    if u.scheme not in ('http', 'https'):
        raise ValueError('blocked scheme: %r' % u.scheme)
    host = (u.hostname or '').lower()
    if host not in IMG_HOSTS:
        raise ValueError('blocked host: %r' % host)
    for info in socket.getaddrinfo(host, None, proto=socket.IPPROTO_TCP):
        ip = ipaddress.ip_address(info[4][0])
        if ip.is_private or ip.is_loopback or ip.is_link_local or ip.is_reserved or ip.is_multicast:
            raise ValueError('blocked address: %s' % ip)
    return url


# ---------------- 下载与取帧 ----------------

def fetch(url):
    url = safe_url(url)
    key = hashlib.sha256(url.encode('utf-8')).hexdigest()
    for ext in ('.png', '.gif', '.webp', '.jpg', '.img'):
        p = safe_path(CACHE, key + ext)
        if os.path.exists(p) and os.path.getsize(p) > 0:
            return p
    last = None
    for attempt in range(3):
        try:
            req = urllib.request.Request(url, headers={
                'User-Agent': UA,
                'Referer': 'https://origin.picgo.net/',
                'Accept': 'image/avif,image/webp,image/png,image/*,*/*;q=0.8',
            })
            data = urllib.request.urlopen(req, timeout=45).read()
            if not data:
                raise RuntimeError('empty body')
            fmt = Image.open(io.BytesIO(data)).format or 'PNG'
            ext = {'PNG': '.png', 'GIF': '.gif', 'WEBP': '.webp', 'JPEG': '.jpg'}.get(fmt, '.img')
            p = safe_path(CACHE, key + ext)
            Path(p).write_bytes(data)
            return p
        except Exception as e:
            last = e
            time.sleep(0.6 + attempt)
    raise RuntimeError('download failed: %s (%s)' % (url, last))


def load_best_frame(path):
    im = Image.open(path)
    n = getattr(im, 'n_frames', 1) or 1
    picks = [0]
    if n > 1:
        picks = sorted(set([0, n // 2, n - 1, max(0, n // 3)]))
    best = None
    for idx in picks:
        try:
            im.seek(idx)
            f = im.convert('RGBA')
            a = f.getchannel('A')
            bbox = a.point(lambda v: 255 if v > 16 else 0).getbbox()
            area = (bbox[2] - bbox[0]) * (bbox[3] - bbox[1]) if bbox else 0
            if best is None or area > best[0]:
                best = (area, f, bbox)
        except Exception:
            continue
    if not best or not best[2]:
        raise RuntimeError('no visible frame')
    return best[1], best[2]

# ---------------- 位图化 ----------------

def make_canvas(im, bbox, N):
    im = im.crop(bbox)
    w, h = im.size
    scale = min(N / w, N / h)
    nw = max(1, int(round(w * scale)))
    nh = max(1, int(round(h * scale)))
    rs = im.resize((nw, nh), Image.LANCZOS)
    canvas = Image.new('RGBA', (N, N), (0, 0, 0, 0))
    canvas.alpha_composite(rs, ((N - nw) // 2, (N - nh) // 2))
    return canvas


def mask_from_canvas(canvas, th):
    A = canvas.getchannel('A').load()
    N = canvas.size[0]
    m = [[1 if A[x, y] >= th else 0 for x in range(N)] for y in range(N)]
    return m


def clean_mask(m, min_comp=6, keep_small=False):
    N = len(m)
    # 去掉孤立格（8 邻域无任何涂黑）
    keep = [[0] * N for _ in range(N)]
    for y in range(N):
        for x in range(N):
            if not m[y][x]:
                continue
            nb = 0
            for dy in (-1, 0, 1):
                for dx in (-1, 0, 1):
                    if dx == 0 and dy == 0:
                        continue
                    yy, xx = y + dy, x + dx
                    if 0 <= yy < N and 0 <= xx < N and m[yy][xx]:
                        nb += 1
            if nb > 0:
                keep[y][x] = 1
    # 连通块小于阈值的删掉（keep_small 时保留 2 格以上的小细节）
    seen = [[0] * N for _ in range(N)]
    out = [[0] * N for _ in range(N)]
    for y in range(N):
        for x in range(N):
            if not keep[y][x] or seen[y][x]:
                continue
            stack = [(y, x)]
            seen[y][x] = 1
            comp = []
            while stack:
                cy, cx = stack.pop()
                comp.append((cy, cx))
                for dy in (-1, 0, 1):
                    for dx in (-1, 0, 1):
                        if dx == 0 and dy == 0:
                            continue
                        yy, xx = cy + dy, cx + dx
                        if 0 <= yy < N and 0 <= xx < N and keep[yy][xx] and not seen[yy][xx]:
                            seen[yy][xx] = 1
                            stack.append((yy, xx))
            if len(comp) >= min_comp or len(comp) == 1 or (keep_small and len(comp) >= 2):
                for cy, cx in comp:
                    out[cy][cx] = 1
    return out


def erode(m, k=1):
    """形态学腐蚀 k 次（4 邻域），用于取内外边界。"""
    N = len(m)
    cur = m
    for _ in range(k):
        nxt = [[0] * N for _ in range(N)]
        for y in range(N):
            for x in range(N):
                if not cur[y][x]:
                    continue
                ok = True
                for dy, dx in ((-1, 0), (1, 0), (0, -1), (0, 1)):
                    yy, xx = y + dy, x + dx
                    if not (0 <= yy < N and 0 <= xx < N) or not cur[yy][xx]:
                        ok = False
                        break
                nxt[y][x] = 1 if ok else 0
        cur = nxt
    return cur


def outline_mask(m, mode='ring'):
    """把实心剪影改成描边，让整行长条碎成多段。
    ring=1 格内边界；core2=描边 + 内芯（与描边隔 1 格空隙）；thick2=2 格厚描边。
    """
    N = len(m)
    r1 = erode(m, 1)
    ring = [[1 if (m[y][x] and not r1[y][x]) else 0 for x in range(N)] for y in range(N)]
    if mode == 'ring':
        return ring
    r2 = erode(m, 2)
    if mode == 'thick2':
        return [[1 if (m[y][x] and not r2[y][x]) else 0 for x in range(N)] for y in range(N)]
    # core2
    return [[1 if (ring[y][x] or r2[y][x]) else 0 for x in range(N)] for y in range(N)]


def fill_rate(m):
    N = len(m)
    return sum(sum(r) for r in m) / float(N * N)


def mask_minus_bg(canvas, dist=42):
    """按画布边缘的不透明主色推断背景色，剔掉接近背景色的格子。"""
    N = canvas.size[0]
    pxc = canvas.load()
    pts = []
    for i in range(N):
        for x, y in ((i, 0), (i, N - 1), (0, i), (N - 1, i)):
            if pxc[x, y][3] >= 96:
                pts.append(pxc[x, y][:3])
    if len(pts) < 12:
        return None
    bg = tuple(sum(c[j] for c in pts) // len(pts) for j in range(3))
    m = []
    for y in range(N):
        row = []
        for x in range(N):
            r, g, b, a = pxc[x, y]
            d = math.sqrt((r - bg[0]) ** 2 + (g - bg[1]) ** 2 + (b - bg[2]) ** 2)
            row.append(1 if (a >= 96 and d > dist) else 0)
        m.append(row)
    return m

# ---------------- 配色 ----------------

def kmeans(colors, k=6, iters=14):
    pts = list(set(colors))
    if len(pts) <= k:
        return sorted(pts)
    pts.sort(key=lambda c: c[0] * 0.299 + c[1] * 0.587 + c[2] * 0.114)
    m = len(pts)
    cent = [pts[int(round(i * (m - 1) / float(k - 1)))] for i in range(k)]
    for _ in range(iters):
        buckets = [[] for _ in range(k)]
        for c in pts:
            bi, bd = 0, 1 << 30
            for i, q in enumerate(cent):
                d = (c[0] - q[0]) ** 2 + (c[1] - q[1]) ** 2 + (c[2] - q[2]) ** 2
                if d < bd:
                    bd, bi = d, i
            buckets[bi].append(c)
        moved = False
        for i, b in enumerate(buckets):
            if not b:
                continue
            nr = sum(c[0] for c in b) / len(b)
            ng = sum(c[1] for c in b) / len(b)
            nb = sum(c[2] for c in b) / len(b)
            nq = (int(round(nr)), int(round(ng)), int(round(nb)))
            if nq != cent[i]:
                cent[i] = nq
                moved = True
        if not moved:
            break
    # 去重
    out = []
    for c in cent:
        if c not in out:
            out.append(c)
    return out

# ---------------- 线索与解算器 ----------------

def row_clue(m):
    out = []
    run = 0
    for v in m:
        if v:
            run += 1
        elif run:
            out.append(run)
            run = 0
    if run:
        out.append(run)
    return out


_PAT = {}

def patterns(n, clue):
    clue = tuple(c for c in clue if c > 0)
    key = (n, clue)
    if key in _PAT:
        return _PAT[key]
    L = len(clue)
    if L == 0:
        _PAT[key] = [0]
        return _PAT[key]
    if sum(clue) + L - 1 > n:
        _PAT[key] = []
        return _PAT[key]
    out = []

    def rec(i, pos, bits):
        if i == L:
            out.append(bits)
            return
        seg = clue[i]
        rem = sum(clue[i + 1:]) + max(0, L - i - 2)
        maxstart = n - rem - seg - (1 if i < L - 1 else 0)
        for st in range(pos, maxstart + 1):
            rec(i + 1, st + seg + 1, bits | (((1 << seg) - 1) << st))

    rec(0, 0, 0)
    _PAT[key] = out
    return out


def compat(state, pat, n):
    fill = 0
    cross = 0
    for i in range(n):
        if state[i] == 1:
            fill |= 1 << i
        elif state[i] == 0:
            cross |= 1 << i
    return (pat & cross) == 0 and (fill & ~pat) == 0


def logic_solve(n, rows, cols):
    """纯行/列线推演，返回 (是否完全确定, 是否出现矛盾)"""
    st = [[-1] * n for _ in range(n)]
    rowp = [patterns(n, c) for c in rows]
    colp = [patterns(n, c) for c in cols]
    changed = True
    while changed:
        changed = False
        for r in range(n):
            cands = [p for p in rowp[r] if compat(st[r], p, n)]
            if not cands:
                return False, True
            orv = 0
            andv = (1 << n) - 1
            for p in cands:
                orv |= p
                andv &= p
            forced1 = andv
            forced0 = ((1 << n) - 1) & ~orv
            for c in range(n):
                v = 1 if (forced1 >> c) & 1 else (0 if (forced0 >> c) & 1 else -1)
                if v != -1 and st[r][c] != v:
                    st[r][c] = v
                    changed = True
        for c in range(n):
            col = [st[r][c] for r in range(n)]
            cands = [p for p in colp[c] if compat(col, p, n)]
            if not cands:
                return False, True
            orv = 0
            andv = (1 << n) - 1
            for p in cands:
                orv |= p
                andv &= p
            forced1 = andv
            forced0 = ((1 << n) - 1) & ~orv
            for r in range(n):
                v = 1 if (forced1 >> r) & 1 else (0 if (forced0 >> r) & 1 else -1)
                if v != -1 and st[r][c] != v:
                    st[r][c] = v
                    changed = True
    full = all(st[r][c] != -1 for r in range(n) for c in range(n))
    return full, False


def count_solutions(n, rows, cols, cap=2, nodecap=600000):
    rowp = [patterns(n, c) for c in rows]
    colp = [patterns(n, c) for c in cols]
    lookups = []
    for p in colp:
        d = [dict() for _ in range(n)]
        for L in range(n):
            for pat in p:
                pref = pat & ((1 << L) - 1)
                bit = (pat >> L) & 1
                d[L][pref] = d[L].get(pref, 0) | (1 if bit else 2)
        lookups.append(d)
    prefixes = [0] * n
    nodes = [0]

    def dfs(r):
        nodes[0] += 1
        if nodes[0] > nodecap:
            return cap
        if r == n:
            return 1
        total = 0
        for pat in rowp[r]:
            ok = True
            for c in range(n):
                b = (pat >> c) & 1
                allowed = lookups[c][r].get(prefixes[c], 0)
                if not allowed or not (allowed & (1 if b else 2)):
                    ok = False
                    break
            if not ok:
                continue
            old = prefixes[:]
            for c in range(n):
                if (pat >> c) & 1:
                    prefixes[c] |= 1 << r
            total += dfs(r + 1)
            prefixes[:] = old
            if total >= cap:
                return total
        return total

    return dfs(0), nodes[0]

# ---------------- 长条拆分 / 难度平衡 ----------------

def runs_with_pos(vals):
    out = []
    st = None
    for i, v in enumerate(vals):
        if v:
            if st is None:
                st = i
        elif st is not None:
            out.append((st, i - st))
            st = None
    if st is not None:
        out.append((st, len(vals) - st))
    return out


def split_runs(m, rnd, max_run=5):
    """随机在长条中间挖洞，把每行/每列的长段压到 max_run 以内（只删不加）。"""
    n = len(m)
    m2 = [row[:] for row in m]

    def punch(vals, s0, L):
        k = int(math.ceil((L - max_run) / float(max_run + 1)))
        k = max(1, min(k, max(1, L // 2 - 1)))
        for _ in range(60):
            pos = sorted(rnd.sample(range(s0, s0 + L), k))
            if any(b - a < 2 for a, b in zip(pos, pos[1:])):
                continue
            pieces = []
            prev = s0
            for q in pos:
                pieces.append(q - prev)
                prev = q + 1
            pieces.append(s0 + L - prev)
            if max(pieces) > max_run:
                continue
            for q in pos:
                vals[q] = 0
            return
        # 随机取位失败时按等距兜底
        step = max(1, L // (k + 1))
        for j in range(1, k + 1):
            vals[min(s0 + L - 2, s0 + j * step)] = 0

    for _ in range(60):
        changed = False
        for r in range(n):
            for _ in range(60):
                longr = [x for x in runs_with_pos(m2[r]) if x[1] > max_run]
                if not longr:
                    break
                punch(m2[r], longr[0][0], longr[0][1])
                changed = True
        for c in range(n):
            col = [m2[r][c] for r in range(n)]
            for _ in range(60):
                longr = [x for x in runs_with_pos(col) if x[1] > max_run]
                if not longr:
                    break
                punch(col, longr[0][0], longr[0][1])
                changed = True
            for r in range(n):
                m2[r][c] = col[r]
        if not changed:
            break
    return m2


def line_metrics(m):
    """逻辑解 + 行列轮推演，返回难度指标；不可纯逻辑解时返回 None。"""
    n = len(m)
    rows = [row_clue(m[r]) for r in range(n)]
    cols = [row_clue([m[r][c] for r in range(n)]) for c in range(n)]
    full, contra = logic_solve(n, rows, cols)
    if not full or contra:
        return None
    st = [[-1] * n for _ in range(n)]
    rp = [patterns(n, c) for c in rows]
    cp = [patterns(n, c) for c in cols]
    passes = 0
    det0 = 0.0
    while passes < 40:
        ch = False
        for r in range(n):
            cs = [q for q in rp[r] if compat(st[r], q, n)]
            ov = 0
            av = (1 << n) - 1
            for q in cs:
                ov |= q
                av &= q
            for c in range(n):
                v = 1 if (av >> c) & 1 else (0 if ((~ov) >> c) & 1 else -1)
                if v != -1 and st[r][c] != v:
                    st[r][c] = v
                    ch = True
        for c in range(n):
            col = [st[r][c] for r in range(n)]
            cs = [q for q in cp[c] if compat(col, q, n)]
            ov = 0
            av = (1 << n) - 1
            for q in cs:
                ov |= q
                av &= q
            for r in range(n):
                v = 1 if (av >> r) & 1 else (0 if ((~ov) >> r) & 1 else -1)
                if v != -1 and st[r][c] != v:
                    st[r][c] = v
                    ch = True
        passes += 1
        if passes == 1:
            det0 = sum(1 for r in range(n) for c in range(n) if st[r][c] != -1) / float(n * n)
        if all(st[r][c] != -1 for r in range(n) for c in range(n)):
            break
        if not ch:
            break
    allr = rows + cols
    single = sum(1 for c in allr if len(c) <= 1) / float(2 * n)
    return {
        'passes': passes,
        'det0': det0,
        'single': single,
        'maxrun': max([max(c) if c else 0 for c in allr]),
        'fill': fill_rate(m),
    }


def retune_mask(m, pid, tries=50):
    """把 6/7/8/9 这类长数字随机挖洞拆开（只删不加），并平衡难度。
    硬约束：仍须纯逻辑可解（等价于唯一解）、推演轮数 <= 5、填充率 >= 0.15。
    原本就简单的题往目标难度靠；本来就偏难的题不允许明显更难（det0 不低于基线-0.10）。
    """
    bs = line_metrics(m)
    if bs is None or bs['maxrun'] <= 5:
        return m
    seed = int(hashlib.sha1(pid.encode('utf-8')).hexdigest()[:8], 16)
    easy = bs['det0'] >= 0.55
    target = 0.65
    best = None
    # 优先用尽可能小的 max_run：命中即停
    for mr in (5, 6, 7, 8, 9):
        level = []
        for i in range(tries if mr <= 6 else tries // 2):
            cand = split_runs(m, random.Random(seed ^ (mr << 16) ^ i), mr)
            st = line_metrics(cand)
            if not st or st['maxrun'] > mr:
                continue
            if st['passes'] > 5 or st['fill'] < 0.15:
                continue
            if easy:
                sc = (3 * abs(st['det0'] - target)
                      + 2 * max(0, st['single'] - 0.62)
                      + 2 * max(0, 0.25 - st['fill']))
            else:
                if st['det0'] < bs['det0'] - 0.10:
                    continue
                sc = 3 * abs(st['det0'] - bs['det0']) + 2 * max(0, st['single'] - 0.62)
            level.append((sc, cand))
        if level:
            cand = min(level, key=lambda x: x[0])
            if best is None or cand[0] < best[0]:
                best = cand
            break
    if best is None:
        # 兜底：任意可逻辑解、passes<=5 的候选，取 det0 最接近基线
        for mr in (5, 6, 7, 8, 9):
            for i in range(tries):
                cand = split_runs(m, random.Random(seed ^ (mr << 16) ^ i), mr)
                st = line_metrics(cand)
                if not st or st['maxrun'] > mr or st['passes'] > 5:
                    continue
                sc = 3 * abs(st['det0'] - bs['det0'])
                if best is None or sc < best[0]:
                    best = (sc, cand)
            if best:
                break
    return best[1] if best else m


def maxrun_of(m):
    n = len(m)
    allr = [row_clue(m[r]) for r in range(n)] + [row_clue([m[r][c] for r in range(n)]) for c in range(n)]
    return max([max(c) if c else 0 for c in allr])


def climb_target(m0, mr, target, iters, rnd):
    """只允许「贴着已有笔画」的单格增删，把首轮可确定率往 target 调。"""
    cur = [row[:] for row in m0]
    st = line_metrics(cur)
    if not st or st['maxrun'] > mr:
        return None
    n = len(cur)
    best = (cur, st)
    for _ in range(iters):
        r = rnd.randrange(n)
        c = rnd.randrange(n)
        if not any(0 <= rr < n and 0 <= cc < n and cur[rr][cc]
                   for rr, cc in ((r - 1, c), (r + 1, c), (r, c - 1), (r, c + 1))):
            continue
        cand = [row[:] for row in cur]
        cand[r][c] ^= 1
        fr = fill_rate(cand)
        if fr < 0.20 or fr > 0.62 or maxrun_of(cand) > mr:
            continue
        st2 = line_metrics(cand)
        if not st2 or st2['passes'] > 5:
            continue
        if abs(st2['det0'] - target) < abs(st['det0'] - target) - 1e-9:
            cur, st = cand, st2
            if abs(st['det0'] - target) < abs(best[1]['det0'] - target) - 1e-9:
                best = (cur, st)
    return best


def shape_stubborn(base, target=0.62, mr=5, n_seeds=3000, top=3, iters=3000):
    """个别题怎么拆都达不到 mr：先大量找可行拆法，再局部爬坡把难度拉回目标附近。
    只用固定种子，保证重跑结果一致。"""
    starts = []
    for i in range(n_seeds):
        cand = split_runs(base, random.Random(12345 ^ (mr << 16) ^ i), mr)
        st = line_metrics(cand)
        if st and st['maxrun'] <= mr and st['passes'] <= 5 and 0.20 <= st['fill'] <= 0.62:
            starts.append((st['det0'], cand))
    starts.sort(key=lambda x: -x[0])
    if not starts:
        return base
    best = None
    for k, (d0, cand) in enumerate(starts[:top]):
        got = climb_target(cand, mr, target, iters, random.Random(900 + k))
        if got and (best is None or abs(got[1]['det0'] - target) < abs(best[1]['det0'] - target)):
            best = got
    return best[0] if best else starts[0][1]


def fill_empty_lines(m, pid, sample=32, sweeps=5, floor=0.34, maxdrop=0.20):
    """空行/空列各补 1 格（线索从空白变成 1）。
    补完必须仍唯一解 + 纯逻辑可解、maxrun<=5、passes<=5；
    det0 不低于下限 floor，且相对原题跌幅不超过 maxdrop。
    补不了（或补了会破坏上面条件）的空线就保持空白。
    """
    n = len(m)
    b0 = line_metrics(m)
    if b0 is None:
        return m
    rnd = random.Random(int(hashlib.sha1((pid + '#empty').encode('utf-8')).hexdigest()[:8], 16))
    cur = [row[:] for row in m]
    for _ in range(sweeps):
        progressed = False
        rows = [row_clue(cur[r]) for r in range(n)]
        cols = [row_clue([cur[r][c] for r in range(n)]) for c in range(n)]
        targets = [('r', i) for i, v in enumerate(rows) if not v] + \
                  [('c', j) for j, v in enumerate(cols) if not v]
        rnd.shuffle(targets)
        for kind, idx in targets:
            rows = [row_clue(cur[r]) for r in range(n)]
            cols = [row_clue([cur[r][c] for r in range(n)]) for c in range(n)]
            if (kind == 'r' and rows[idx]) or (kind == 'c' and cols[idx]):
                continue
            spots = list(range(n))
            rnd.shuffle(spots)
            best = None
            for p in spots[:sample]:
                cand = [row[:] for row in cur]
                if kind == 'r':
                    cand[idx][p] = 1
                else:
                    cand[p][idx] = 1
                if fill_rate(cand) > 0.72 or maxrun_of(cand) > 5:
                    continue
                st = line_metrics(cand)
                if not st or st['passes'] > 5:
                    continue
                if st['det0'] < floor or st['det0'] < b0['det0'] - maxdrop:
                    continue
                if best is None or st['det0'] > best[1]['det0']:
                    best = (cand, st)
            if best:
                cur = best[0]
                progressed = True
        if not progressed:
            break
    return cur

# ---------------- 主流程 ----------------

def build_puzzle(item):
    N = 10 if item['r'] <= 2 else (15 if item['r'] >= 4 else 12)
    path = item['_path']
    im, bbox = load_best_frame(path)
    canvas = make_canvas(im, bbox, N)
    th = TH.get(item['id'], 96)
    m0 = mask_minus_bg(canvas) if item['id'] in BG_STRIP else None
    omode = OUTLINE.get(item['id'])
    if omode:
        mode, th = omode
        base = clean_mask(m0 if m0 else mask_from_canvas(canvas, th))
        m = clean_mask(outline_mask(base, mode), 4, True)
        fr = fill_rate(m)
    else:
        m = clean_mask(m0 if m0 else mask_from_canvas(canvas, th))
        fr = fill_rate(m)
        if fr < 0.07:
            for th2 in (72, 52, 34):
                m2 = clean_mask(mask_from_canvas(canvas, th2))
                f2 = fill_rate(m2)
                if f2 >= 0.07:
                    m, fr = m2, f2
                    break
        if fr > 0.68:
            for th2 in (128, 160, 190):
                m2 = clean_mask(mask_from_canvas(canvas, th2))
                f2 = fill_rate(m2)
                if 0.07 <= f2 <= 0.68:
                    m, fr = m2, f2
                    break

    # 长条拆分：6/7/8/9 这类长数字随机挖洞拆成短段（只删不加），并平衡难度
    base_m = m
    m = retune_mask(m, item['id'])
    if maxrun_of(m) > 5:
        # 第一次拆完还留着长条：再拆一次；仍不行就局部调整到 5
        again = retune_mask(m, item['id'] + '#2', tries=120)
        m = again if maxrun_of(again) <= 5 else shape_stubborn(base_m)
    # 空行/空列各补 1 格，让线索不留空白（补不动的保持空白）
    m = fill_empty_lines(m, item['id'])
    fr = fill_rate(m)

    # 颜色：取每格 RGBA（canvas 已是 N×N，一格一像素）
    pxc = canvas.load()
    cellcols = []
    for r in range(N):
        for c in range(N):
            if m[r][c]:
                cr, cg, cb, ca = pxc[c, r]
                if ca < 24:
                    cr = cg = cb = 120
                cellcols.append((cr, cg, cb))
    pal = kmeans(cellcols, 6)

    def nearest(c):
        bi, bd = 0, 1 << 30
        for i, q in enumerate(pal):
            d = (c[0] - q[0]) ** 2 + (c[1] - q[1]) ** 2 + (c[2] - q[2]) ** 2
            if d < bd:
                bd, bi = d, i
        return bi

    idxmap = []
    bits = []
    fi = 0
    for r in range(N):
        for c in range(N):
            if m[r][c]:
                idxmap.append(B36[nearest(cellcols[fi])])
                bits.append('1')
                fi += 1
            else:
                idxmap.append('0')
                bits.append('0')

    # 调色板略提亮深色，避免在深底上完全看不见
    pal2 = []
    for r, g, b in pal:
        mx = max(r, g, b)
        if mx < 46:
            k = (46 - mx) / 120.0
            r = int(round(r + (246 - r) * k))
            g = int(round(g + (239 - g) * k))
            b = int(round(b + (228 - b) * k))
        pal2.append('#%02x%02x%02x' % (r, g, b))

    rows = [row_clue(m[r]) for r in range(N)]
    cols = [row_clue([m[r][c] for r in range(N)]) for c in range(N)]
    logic, contra = logic_solve(N, rows, cols)
    cnt, nodes = count_solutions(N, rows, cols, nodecap=3000000)
    uniq = 1 if (cnt == 1 and not contra) else 0

    out = {
        'id': item['id'],
        'n': item['n'],
        'nm': item['nm'],
        'img': item['img'],
        'r': item['r'],
        'sz': N,
        'bits': ''.join(bits),
        'pal': pal2,
        'col': ''.join(idxmap),
        'uniq': uniq,
        'logic': 1 if logic else 0,
        'by': item.get('by') or '',
    }
    if item.get('alias'):
        out['alias'] = [{'id': a['id'], 'n': a['n'], 'nm': a['nm']} for a in item['alias']]
    return out, fr, cnt, nodes


def preview(pz, scale=12):
    N = pz['sz']
    img = Image.new('RGBA', (N * scale, N * scale), (24, 26, 38, 255))
    d = ImageDraw.Draw(img)
    for r in range(N):
        for c in range(N):
            i = r * N + c
            if pz['bits'][i] == '1':
                col = pz['pal'][B36.index(pz['col'][i])]
                rgb = tuple(int(col[j:j + 2], 16) for j in (1, 3, 5))
                d.rectangle([c * scale, r * scale, (c + 1) * scale - 1, (r + 1) * scale - 1], fill=rgb + (255,))
    return img


def main():
    with open(safe_path(HERE, 'pool.json'), encoding='utf-8') as f:
        pool = json.load(f)
    items = pool['items']
    # 下载
    fails = []
    for it in items:
        try:
            it['_path'] = fetch(it['img'])
        except Exception as e:
            fails.append((it['id'], str(e)))
            print('FAIL download', it['id'], e)
    good = [it for it in items if it.get('_path')]
    print('downloaded %d/%d' % (len(good), len(items)))

    results = []
    for it in good:
        try:
            pz, fr, cnt, nodes = build_puzzle(it)
            results.append(pz)
            print('%-14s r%d %2dx%-2d fill=%.2f uniq=%d logic=%d sol=%d nodes=%d' % (
                pz['id'], pz['r'], pz['sz'], pz['sz'], fr, pz['uniq'], pz['logic'], cnt, nodes))
        except Exception as e:
            fails.append((it['id'], 'build: %s' % e))
            print('FAIL build', it['id'], e)

    # 输出数据
    js = 'const NP=' + json.dumps(results, ensure_ascii=False, separators=(',', ':')) + ';'
    (Path(HERE) / 'np_data.js').write_text(js + '\n', encoding='utf-8')
    print('np_data.js bytes=%d puzzles=%d uniq=%d logic=%d' % (
        len(js.encode('utf-8')), len(results), sum(p['uniq'] for p in results), sum(p['logic'] for p in results)))

    # QC 接触表
    cols = 8
    cw, ch = 190, 210
    rows = (len(results) + cols - 1) // cols
    sheet = Image.new('RGB', (cols * cw, rows * ch), (18, 20, 30))
    d = ImageDraw.Draw(sheet)
    for i, pz in enumerate(results):
        x = (i % cols) * cw
        y = (i // cols) * ch
        pv = preview(pz, 11)
        sheet.paste(pv, (x + (cw - pv.width) // 2, y + 6))
        d.text((x + 8, y + 178), '%d %s' % (i + 1, pz['id']), fill=(246, 239, 228))
        d.text((x + 8, y + 190), 'r%d %dx%d u%d l%d' % (pz['r'], pz['sz'], pz['sz'], pz['uniq'], pz['logic']), fill=(138, 143, 168))
        preview(pz, 20).save(safe_path(QC, '%02d_%s.png' % (i + 1, pz['id'])))
    sheet.save(safe_path(HERE, 'qc.png'))
    print('qc.png %dx%d' % sheet.size)

    (Path(HERE) / 'report.json').write_text(
        json.dumps({'fails': fails, 'count': len(results)}, ensure_ascii=False, indent=1),
        encoding='utf-8')
    if fails:
        print('FAILS:', fails)


if __name__ == '__main__':
    main()
