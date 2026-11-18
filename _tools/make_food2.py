"""PT 노트 '내 식단 짜기' 음식 그림 v2 (2026-11-19 장동욱 "음식 사진들 좀 더 자연스럽고 이쁘게")
python3 _tools/make_food2.py [미리보기.png]   → assets/food/<음식>.png (160px)
v1(make_food.py)의 굵은 남색 테두리를 없애고, 부드러운 그라데이션·그림자·윤기로 그림 — 밝은 화면·다크 둘 다 어울리게.
새 음식 = 아래에 함수 하나 추가 + FOODS에 이름 넣기 → 다시 실행."""
import os, sys
import numpy as np
from PIL import Image, ImageDraw, ImageFilter, ImageChops

W = 640
OUTDIR = os.path.join(os.path.dirname(os.path.abspath(__file__)), "..", "assets", "food")
SIZE = 160
YY, XX = np.mgrid[0:W, 0:W].astype(float)


def C(h):
    h = h.lstrip("#"); return np.array([int(h[i:i + 2], 16) for i in (0, 2, 4)], float)


def new(): return Image.new("RGBA", (W, W), (0, 0, 0, 0))
def M(): return Image.new("L", (W, W), 0)


def rot(m, deg, cx=.5, cy=.5):
    return m.rotate(deg, resample=Image.BICUBIC, center=(cx * W, cy * W)) if deg else m


def ell(cx, cy, rx, ry, r=0):
    m = M(); ImageDraw.Draw(m).ellipse([(cx - rx) * W, (cy - ry) * W, (cx + rx) * W, (cy + ry) * W], fill=255)
    return rot(m, r, cx, cy)


def poly(pts):
    m = M(); ImageDraw.Draw(m).polygon([(x * W, y * W) for x, y in pts], fill=255); return m


def rrect(x0, y0, x1, y1, r, deg=0):
    m = M(); ImageDraw.Draw(m).rounded_rectangle([x0 * W, y0 * W, x1 * W, y1 * W], radius=r * W, fill=255)
    return rot(m, deg, (x0 + x1) / 2, (y0 + y1) / 2)


def stroke(pts, w):
    m = M(); d = ImageDraw.Draw(m); p = [(x * W, y * W) for x, y in pts]; w *= W
    d.line(p, fill=255, width=int(w), joint="curve")
    for q in p: d.ellipse((q[0] - w / 2, q[1] - w / 2, q[0] + w / 2, q[1] + w / 2), fill=255)
    return m


def blob(cx, cy, rx, ry, wob=.05, k=3, seed=0, r=0, n=160):
    g = np.random.default_rng(seed); ph = g.uniform(0, 6.28, 2); pts = []
    for i in range(n):
        a = i / n * 2 * np.pi
        q = 1 + wob * (np.sin(k * a + ph[0]) * .6 + np.sin((k + 2) * a + ph[1]) * .4)
        pts.append((cx + np.cos(a) * rx * q, cy + np.sin(a) * ry * q))
    return rot(poly(pts), r, cx, cy)


def smooth(m, r=.02):
    return m.filter(ImageFilter.GaussianBlur(r * W)).point(lambda v: 255 if v > 127 else 0)


def shrink(m, r):
    return m.filter(ImageFilter.MinFilter(2 * max(1, int(r * W)) + 1))


AND, OR = ImageChops.darker, ImageChops.lighter
def SUB(a, b): return ImageChops.subtract(a, b)


def paint(img, m, light, dark, rim=.32, hl=.3, edge=.55, dv=(.35, 1), a=1.0):
    """모양 m을 light→dark 그라데이션으로 칠하고, 오른쪽 아래는 살짝 어둡게·왼쪽 위는 빛, 가장자리는 가는 짙은 선"""
    A = np.asarray(m, float) / 255
    if A.max() < .5: return
    light, dark = C(light), C(dark)
    ys, xs = np.nonzero(A > .5)
    pr = XX * dv[0] + YY * dv[1]; lo, hi = pr[ys, xs].min(), pr[ys, xs].max()
    t = np.clip((pr - lo) / max(1, hi - lo), 0, 1)[..., None]
    col = light * (1 - t) + dark * t
    o = int(W * .028); bl = np.asarray(m.filter(ImageFilter.GaussianBlur(W * .034)), float) / 255
    sh = np.roll(bl, (-o, -o), (0, 1)); col = col * (1 - rim * (1 - sh))[..., None]
    hv = np.roll(bl, (o, o), (0, 1)); col = col + (255 - col) * (hl * (1 - hv))[..., None]
    if edge:
        e = ((A - np.asarray(shrink(m, .006), float) / 255) * edge)[..., None]
        col = col * (1 - e) + dark * .62 * e
    lay = np.dstack([np.clip(col, 0, 255), A * 255 * a]).astype(np.uint8)
    img.alpha_composite(Image.fromarray(lay, "RGBA"))


def tint(img, m, color, a=.5, blur=0, clip=None):
    """부드러운 덧칠(윤기·그늘·무늬). clip 안쪽에만"""
    if blur: m = m.filter(ImageFilter.GaussianBlur(blur * W))
    if clip is not None: m = AND(m, clip)
    A = np.asarray(m, float) * a
    c = C(color); lay = np.dstack([np.full((W, W), c[0]), np.full((W, W), c[1]), np.full((W, W), c[2]), A]).astype(np.uint8)
    img.alpha_composite(Image.fromarray(lay, "RGBA"))


def gloss(img, cx, cy, rx, ry, r=0, a=.55, clip=None, blur=.012):
    tint(img, ell(cx, cy, rx, ry, r), "#ffffff", a, blur, clip)


def shadow(img, cx=.5, cy=.88, rx=.32, ry=.045, a=.22):
    tint(img, ell(cx, cy, rx, ry), "#141826", a, .02)


def dots(img, clip, n, colors, size=(.006, .012), seed=1, a=.9, box=(.1, .1, .9, .9), long=1.0):
    g = np.random.default_rng(seed)
    for _ in range(n):
        x, y = g.uniform(box[0], box[2]), g.uniform(box[1], box[3]); s = g.uniform(*size)
        tint(img, ell(x, y, s * long, s, g.uniform(0, 180)), colors[g.integers(len(colors))], a, .002, clip)


# ---------- 그릇
def bowl(img, body, inner, mound, grains=None, flat=False, seed=3):
    shadow(img, .5, .87, .30, .04)
    paint(img, rrect(.40, .80, .60, .86, .02), body[1], body[1])                      # 굽
    rim = ell(.5, .50, .37, .085)
    body_m = OR(AND(ell(.5, .50, .37, .345), poly([(0, .5), (1, .5), (1, 1), (0, 1)])), rim)
    paint(img, body_m, body[0], body[1], rim=.4)
    inn = ell(.5, .50, .335, .062)
    paint(img, inn, inner, inner, rim=0, hl=0, edge=0)
    my, mry = (.47, .10) if flat else (.42, .19)
    md = AND(ell(.5, my, .30, mry), OR(poly([(0, 0), (1, 0), (1, .5), (0, .5)]), inn))
    paint(img, md, mound[0], mound[1], rim=.22, hl=.35, edge=.3)
    if grains: grains(md)
    tint(img, SUB(rim, ell(.5, .508, .37, .085)), "#ffffff", .5, .004)                 # 그릇 테두리 빛
    gloss(img, .30, .66, .035, .09, 25, .35, body_m)
    return md


def rice_white(img):
    def g(md):
        dots(img, md, 46, ["#e3e6ee", "#d5d9e4"], (.007, .011), 2, .8, (.2, .22, .8, .55), 1.9)
        dots(img, md, 26, ["#ffffff"], (.007, .011), 5, .95, (.2, .22, .8, .5), 1.9)
    bowl(img, ("#5f7fc4", "#2f4a8c"), "#27407c", ("#ffffff", "#e6e9f1"), g)


def rice_brown(img):
    def g(md):
        dots(img, md, 60, ["#b98a52", "#a87840", "#d9b888"], (.007, .011), 2, .85, (.2, .22, .8, .55), 1.9)
    bowl(img, ("#b98a62", "#7a5334"), "#6b4629", ("#ecd3a8", "#cfa873"), g)


def rice_mixed(img):
    def g(md):
        dots(img, md, 44, ["#c9aecb", "#b79aba", "#efe3ee"], (.007, .011), 2, .85, (.2, .22, .8, .55), 1.9)
        dots(img, md, 9, ["#3a2b3f", "#4b2f3a"], (.013, .017), 7, .95, (.24, .26, .76, .5), 1.3)
        dots(img, md, 6, ["#b5562e", "#e2b53a"], (.011, .014), 11, .95, (.24, .26, .76, .5), 1.2)
    bowl(img, ("#f4f1ea", "#cfc9bc"), "#b9b2a4", ("#e9dbe8", "#c6aec8"), g)


def oatmeal(img):
    def g(md):
        dots(img, md, 50, ["#f3e3c0", "#c9a877", "#fff3d6"], (.012, .019), 4, .85, (.2, .36, .8, .56), 1.5)
    sp = stroke([(.60, .44), (.80, .20)], .034)
    paint(img, sp, "#e3e7ee", "#9aa3b2")
    md = bowl(img, ("#ffffff", "#d5dae4"), "#bcc3d0", ("#ecd9b0", "#d2b580"), g, flat=True)
    for x, y in [(.40, .44), (.47, .40), (.36, .49)]:
        paint(img, ell(x, y, .034, .032), "#5a6fc0", "#2d3a7c", hl=.5); gloss(img, x - .01, y - .012, .009, .007, 0, .7)
    tint(img, ell(.62, .47, .05, .02, -20), "#c98a2c", .55, .006, md)                  # 꿀


def sweet_potato(img):
    shadow(img, .5, .84, .36, .045)
    pts = []
    for i in range(121):
        t = i / 120; x = .12 + .76 * t; r = .155 * np.sin(np.pi * t) ** .62 * (1 + .08 * np.sin(5 * t))
        pts.append((x, .5 - r))
    for i in range(121):
        t = 1 - i / 120; x = .12 + .76 * t; r = .15 * np.sin(np.pi * t) ** .62 * (1 + .06 * np.cos(4 * t))
        pts.append((x, .5 + r))
    body = rot(smooth(poly(pts), .008), 22)
    paint(img, body, "#c2577a", "#7a2447", rim=.38, hl=.34)
    dots(img, body, 9, ["#6a1d3c"], (.004, .006), 3, .5, (.2, .3, .8, .7), 3.5)
    gloss(img, .38, .40, .12, .022, 22, .35, body)
    # 앞에 놓인 한 토막(노란 속살)
    side = ell(.66, .70, .15, .12, -12); paint(img, side, "#b54a6e", "#7a2447")
    face = ell(.63, .69, .125, .112, -12); paint(img, face, "#ffd978", "#f0a93a", rim=.18, hl=.25, edge=.25)
    tint(img, ell(.61, .67, .07, .06), "#fff0b8", .5, .03, face)


def potato(img):
    shadow(img, .5, .85, .36, .045)
    b2 = blob(.68, .40, .20, .17, .05, 3, 4, -15); paint(img, b2, "#dcb877", "#a97b3c")
    dots(img, b2, 5, ["#8a5f2a"], (.006, .009), 8, .55, (.55, .28, .85, .52), 1.4)
    b = blob(.42, .57, .30, .235, .045, 3, 1, 8); paint(img, b, "#ecca88", "#b88945", rim=.36, hl=.36)
    for x, y in [(.30, .52), (.50, .66), (.57, .50), (.38, .70), (.47, .46)]:
        tint(img, ell(x, y, .015, .009, 20), "#8a5f2a", .6, .003, b); tint(img, ell(x, y - .012, .014, .005, 20), "#fff1c9", .5, .003, b)
    dots(img, b, 24, ["#a67a3c"], (.003, .005), 5, .45, (.15, .36, .7, .78))
    gloss(img, .30, .44, .085, .03, -22, .4, b)


def bagel(img):
    shadow(img, .5, .82, .36, .05)
    out = ell(.5, .52, .37, .29); hole = ell(.5, .50, .105, .07)
    paint(img, SUB(out, hole), "#eebd72", "#b87430", rim=.42, hl=.3)
    top = SUB(ell(.5, .485, .32, .225), ell(.5, .50, .14, .10))
    tint(img, top, "#f7d596", .55, .03)
    tint(img, SUB(ell(.5, .50, .135, .095), hole), "#8a5220", .5, .012)                # 구멍 안쪽 그늘
    g = np.random.default_rng(3)
    for _ in range(34):
        a = g.uniform(0, 6.28); q = g.uniform(.5, .88); x, y = .5 + np.cos(a) * .33 * q, .50 + np.sin(a) * .23 * q
        tint(img, ell(x, y, .013, .006, g.uniform(0, 180)), "#fff6dc", .95, .001, SUB(out, ell(.5, .50, .13, .09)))
    gloss(img, .30, .36, .10, .028, -30, .4)


def banana(img):
    shadow(img, .5, .82, .34, .04)
    def ban(cy, th, sd, c1, c2):
        up, lo = [], []
        for i in range(61):
            t = i / 60; a = np.pi * (.08 + .84 * t); x = .5 - np.cos(a) * .40; y = cy + np.sin(a) * .26
            w = th * (np.sin(np.pi * t) ** .55) + .012
            up.append((x, y - w)); lo.append((x, y + w * .55))
        m = rot(smooth(poly(up + lo[::-1]), .006), sd)
        paint(img, m, c1, c2, rim=.34, hl=.3)
        return m
    ban(.36, .085, -10, "#f4d04c", "#d9a520")
    m = ban(.42, .095, 4, "#ffe368", "#eeb62c")
    tint(img, rot(stroke([(.5 - np.cos(np.pi * (.12 + .76 * i / 30)) * .385, .43 + np.sin(np.pi * (.12 + .76 * i / 30)) * .245) for i in range(31)], .007), 4), "#c98f16", .45, .003, m)
    paint(img, rrect(.075, .46, .12, .53, .012, 20), "#7a5a2a", "#4c3414")
    paint(img, ell(.905, .48, .022, .028), "#5c4320", "#3a2810")
    gloss(img, .40, .60, .13, .015, 12, .4, m)


def bread(img):
    shadow(img, .5, .86, .34, .04)
    def sl(dx, dy, deg, c):
        m = OR(OR(ell(.37 + dx, .34 + dy, .17, .15), ell(.63 + dx, .34 + dy, .17, .15)), rrect(.24 + dx, .34 + dy, .76 + dx, .80 + dy, .05))
        m = rot(smooth(m, .012), deg, .5 + dx, .55 + dy)
        paint(img, m, "#d9a55f", "#a26a2c", rim=.3)
        inn = shrink(m, .032); paint(img, inn, c[0], c[1], rim=.12, hl=.2, edge=.2)
        dots(img, inn, 60, ["#d9b782", "#fff4dc", "#c9a56c"], (.004, .009), 5, .55, (.15, .2, .9, .9))
        return inn
    sl(.09, -.06, 9, ("#f3deb4", "#e2c48e"))
    sl(-.05, .04, -7, ("#fbedcc", "#eed5a4"))


def pasta(img):
    shadow(img, .5, .84, .40, .05)
    paint(img, ell(.5, .58, .43, .27), "#ffffff", "#d3d8e2", rim=.3)
    paint(img, ell(.5, .565, .32, .185), "#eef0f5", "#dfe3ec", rim=0, hl=0, edge=.25)
    nest = ell(.5, .50, .27, .18)
    paint(img, nest, "#f6d98a", "#dba94a", rim=.3, edge=.3)
    g = np.random.default_rng(6)
    for i in range(26):
        a0 = g.uniform(0, 6.28); q = g.uniform(.35, 1.0); cx, cy = .5 + g.uniform(-.06, .06), .50 + g.uniform(-.04, .04)
        pts = [(cx + np.cos(a0 + j * .13) * .25 * q, cy + np.sin(a0 + j * .13) * .16 * q) for j in range(int(g.uniform(12, 28)))]
        tint(img, stroke(pts, .017), "#c98f32", .55, 0, nest); tint(img, stroke([(x - .003, y - .004) for x, y in pts], .011), "#ffe9a8", .95, 0, nest)
    sauce = blob(.5, .46, .12, .075, .12, 4, 2); paint(img, sauce, "#e2523a", "#b3301f", edge=.3)
    dots(img, sauce, 8, ["#f08a6a"], (.008, .012), 4, .7, (.4, .4, .6, .52))
    leaf = rot(AND(ell(.52, .40, .07, .05), ell(.52, .44, .07, .05)), -25, .52, .42)
    paint(img, leaf, "#6fbf5a", "#2f7d32"); tint(img, stroke([(.47, .43), (.57, .40)], .004), "#256428", .6)


def pumpkin(img):
    shadow(img, .5, .85, .38, .05)
    body = ell(.44, .52, .33, .27)
    paint(img, body, "#4f8a4a", "#1f4d2a", rim=.4)
    for dx, rx in [(-.2, .12), (-.07, .13), (.07, .13), (.2, .12)]:
        seg = AND(ell(.44 + dx, .52, rx, .265), body)
        tint(img, SUB(seg, shrink(seg, .008)), "#173d20", .55, .004, body)
        tint(img, ell(.44 + dx - .02, .42, rx * .35, .12), "#8fc27e", .28, .03, body)
    dots(img, body, 22, ["#b9d48a"], (.004, .009), 2, .5, (.15, .3, .75, .75))
    paint(img, rrect(.40, .20, .48, .30, .02, -8), "#b9a36a", "#7d6a3a")
    # 잘라 놓은 한 조각(주황 속)
    out = AND(ell(.70, .64, .22, .22), poly([(.48, .64), (.95, .64), (.95, .95), (.48, .95)]))
    out = rot(out, -18, .70, .64)
    paint(img, out, "#2f6b35", "#1f4d2a")
    inn = rot(AND(ell(.70, .64, .195, .195), poly([(.48, .64), (.95, .64), (.95, .95), (.48, .95)])), -18, .70, .64)
    paint(img, inn, "#ffc04a", "#ea8a1e", rim=.2, edge=.2)
    hol = rot(AND(ell(.70, .64, .10, .08), poly([(.48, .64), (.95, .64), (.95, .95), (.48, .95)])), -18, .70, .64)
    tint(img, hol, "#f7dc9a", .9, .006)


# ---------- 단백질
def grill(img, m, lines, col="#6b3a16", w=.02, a=.6):
    for p in lines: tint(img, stroke(p, w), col, a, .004, m)


def chicken(img):
    shadow(img, .5, .85, .38, .05)
    pts = [(.5 + np.cos(a) * (.36 + .05 * np.cos(a)) , .52 + np.sin(a) * (.22 + .07 * np.cos(a))) for a in np.linspace(0, 6.28, 140)]
    m = rot(smooth(poly(pts), .02), -14)
    paint(img, m, "#f6d7a0", "#d09a52", rim=.36, hl=.34)
    tint(img, ell(.5, .50, .26, .13, -14), "#e9a85a", .35, .05, m)
    grill(img, m, [[(.24 + i * .13, .30), (.12 + i * .13, .78)] for i in range(6)], "#7a4318", .022, .62)
    gloss(img, .38, .40, .15, .028, -14, .35, m)
    for x, y, r in [(.80, .74, 20), (.86, .66, -30)]:
        lf = rot(AND(ell(x, y - .02, .06, .045), ell(x, y + .02, .06, .045)), r, x, y); paint(img, lf, "#7cc260", "#2f7d32")


def thigh(img):
    shadow(img, .5, .85, .36, .045)
    bone = stroke([(.60, .62), (.80, .80)], .06); paint(img, bone, "#fffaf0", "#ded2bb")
    for x, y in [(.83, .78), (.79, .835)]: paint(img, ell(x, y, .05, .045), "#fffaf0", "#ded2bb", hl=.4)
    pts = [(.42 + np.cos(a) * (.27 + .05 * np.cos(a - .7)), .43 + np.sin(a) * (.24 + .05 * np.sin(a + .6))) for a in np.linspace(0, 6.28, 140)]
    m = smooth(OR(poly(pts), ell(.58, .60, .10, .09)), .02)
    paint(img, m, "#f0b561", "#b0611f", rim=.4, hl=.34)
    tint(img, ell(.36, .36, .15, .10, -25), "#ffd791", .5, .04, m)
    dots(img, m, 16, ["#8a4a16"], (.004, .008), 4, .45, (.2, .25, .65, .65))
    gloss(img, .31, .32, .09, .03, -32, .5, m)


def fish(img):
    shadow(img, .5, .85, .40, .05)
    pts = [(.10, .56), (.20, .40), (.46, .32), (.74, .34), (.90, .44), (.88, .60), (.66, .70), (.34, .72), (.14, .66)]
    m = rot(smooth(poly(pts), .03), -6)
    paint(img, m, "#ffffff", "#e2dccb", rim=.36, hl=.2, edge=.6)
    for i in range(6):
        x = .22 + i * .11
        tint(img, stroke([(x, .38), (x + .05, .52), (x, .68)], .006), "#cfc6ae", .7, .003, m)
    tint(img, ell(.5, .50, .30, .10, -6), "#fff6e0", .5, .04, m)
    lem = AND(ell(.74, .70, .17, .17), poly([(.5, .70), (1, .70), (1, 1), (.5, 1)])); lem = rot(lem, -25, .74, .70)
    paint(img, lem, "#ffe45c", "#e9b81e")
    li = rot(AND(ell(.74, .70, .14, .14), poly([(.5, .715), (1, .715), (1, 1), (.5, 1)])), -25, .74, .70); paint(img, li, "#fff6a8", "#ffe45c", edge=.15, rim=.1)
    for a in (-60, -25, 10, 45):
        tint(img, rot(stroke([(.74, .715), (.74 + np.sin(np.radians(a)) * .14, .715 + np.cos(np.radians(a)) * .14)], .006), -25, .74, .70), "#ffffff", .8, 0, li)
    for x, y, r in [(.24, .30, 30), (.31, .26, -20)]:
        lf = rot(AND(ell(x, y - .016, .05, .036), ell(x, y + .016, .05, .036)), r, x, y); paint(img, lf, "#7cc260", "#2f7d32")


def mackerel(img):
    shadow(img, .5, .82, .40, .04)
    tail = poly([(.80, .50), (.95, .34), (.91, .50), (.95, .66)]); paint(img, smooth(tail, .008), "#5a7896", "#2d4560")
    pts = []
    for i in range(101):
        t = i / 100; pts.append((.06 + .78 * t, .50 - .155 * np.sin(np.pi * t ** .8) ** .8))
    for i in range(101):
        t = 1 - i / 100; pts.append((.06 + .78 * t, .50 + .135 * np.sin(np.pi * t ** .8) ** .8))
    m = smooth(poly(pts), .008)
    paint(img, m, "#f4f6f8", "#c3ccd6", rim=.25, dv=(0, 1), edge=.6)
    back = AND(m, poly([(0, 0), (1, 0), (1, .47), (.5, .50), (0, .47)]))
    paint(img, back, "#3f7fa8", "#1f4f78", rim=.1, hl=.3, edge=.2, dv=(0, 1))
    for i in range(9):
        x = .22 + i * .065
        tint(img, stroke([(x, .36), (x + .025, .42), (x - .005, .46), (x + .02, .50)], .013), "#14304c", .75, .003, back)
    tint(img, ell(.45, .52, .34, .02), "#ffffff", .5, .012, m)
    paint(img, ell(.15, .47, .026, .026), "#ffffff", "#e6e6e6", edge=.4); paint(img, ell(.152, .472, .013, .013), "#1b2230", "#1b2230", hl=0)
    tint(img, stroke([(.23, .40), (.25, .50), (.23, .58)], .006), "#2d4560", .5, .003, m)
    paint(img, smooth(poly([(.40, .36), (.50, .29), (.56, .355)]), .006), "#3f7fa8", "#1f4f78")
    paint(img, smooth(poly([(.44, .63), (.52, .70), (.56, .62)]), .006), "#c3ccd6", "#8fa0b2")


def squid(img):
    shadow(img, .5, .87, .28, .04)
    for i, dx in enumerate([-.13, -.08, -.03, .03, .08, .13]):
        p = [(.5 + dx * .7, .58), (.5 + dx * 1.2 + .015 * np.sin(i), .72), (.5 + dx * 1.5, .84)]
        paint(img, stroke(p, .036), "#f6b6b0", "#d97f80", rim=.2)
    fin = smooth(poly([(.5, .08), (.24, .30), (.5, .36), (.76, .30)]), .02); paint(img, fin, "#f7b4b2", "#dc8085")
    body = smooth(poly([(.5, .10), (.36, .30), (.34, .58), (.5, .64), (.66, .58), (.64, .30)]), .04)
    paint(img, body, "#ffe2dc", "#f2a39f", rim=.36, hl=.3)
    dots(img, body, 26, ["#e78a8c"], (.004, .007), 4, .5, (.36, .14, .64, .5))
    gloss(img, .44, .30, .025, .12, 6, .5, body)
    for x in (.44, .56):
        paint(img, ell(x, .54, .028, .03), "#ffffff", "#eeeeee", edge=.3); paint(img, ell(x, .545, .014, .016), "#1b2230", "#1b2230", hl=0)


def shrimp(img):
    shadow(img, .5, .85, .32, .045)
    cx, cy, R = .52, .50, .235
    tail = [(.40, .70), (.24, .78), (.30, .66), (.20, .64), (.36, .62)]
    paint(img, smooth(poly(tail), .008), "#ff8f5c", "#e2582c")
    segs = []
    for i in range(7):
        a = np.radians(-150 + i * 42); r = .118 - i * .0085
        segs.append((cx + np.cos(a) * R, cy + np.sin(a) * R * .95, r, a))
    for x, y, r, a in reversed(segs):
        m = ell(x, y, r, r * .86, np.degrees(-a) + 90)
        paint(img, m, "#ffc2a0", "#f27a4c", rim=.34, hl=.3, edge=.4)
        tint(img, ell(x + np.cos(a) * r * .5, y + np.sin(a) * r * .5, r * .5, r * .45), "#ffe3d2", .5, .02, m)
    hx, hy = segs[0][0], segs[0][1]
    head = smooth(poly([(hx - .04, hy - .10), (hx - .22, hy + .06), (hx - .04, hy + .11), (hx + .08, hy + .02)]), .02)
    paint(img, head, "#ffb48e", "#ee6c3e", rim=.3)
    paint(img, ell(hx - .10, hy + .005, .017, .017), "#1b2230", "#1b2230", hl=0)
    for p in [[(hx - .16, hy + .02), (hx - .24, hy - .12), (hx - .12, hy - .24)], [(hx - .15, hy + .05), (hx - .28, hy - .02), (hx - .26, hy - .16)]]:
        tint(img, stroke(p, .008), "#ee6c3e", .9, .002)


def tofu(img):
    shadow(img, .5, .86, .36, .05)
    T = [(.5, .20), (.86, .36), (.5, .52), (.14, .36)]
    Lf = [(.14, .36), (.5, .52), (.5, .84), (.14, .66)]
    Rf = [(.5, .52), (.86, .36), (.86, .66), (.5, .84)]
    whole = smooth(poly([(.5, .20), (.86, .36), (.86, .66), (.5, .84), (.14, .66), (.14, .36)]), .022)
    paint(img, AND(whole, poly(Rf)), "#eee0bf", "#d3c098", rim=.15, hl=0, edge=.3)
    paint(img, AND(whole, poly(Lf)), "#fbf2dc", "#ead9b6", rim=.1, hl=.1, edge=.3)
    paint(img, AND(whole, poly(T)), "#ffffff", "#fbf3e0", rim=.05, hl=0, edge=.3)
    tint(img, stroke([(.5, .52), (.5, .82)], .006), "#ffffff", .6, .003, whole)
    for x, y in [(.44, .33), (.52, .38), (.58, .31), (.48, .28), (.40, .38)]:
        paint(img, ell(x, y, .022, .014), "#7cc260", "#3d8a3a", edge=.3); tint(img, ell(x, y, .009, .005), "#d6f0c0", .9)


def _half_egg(img, x, y, s, r, yolk=True):
    w = ell(x, y, s, s * 1.22, r); paint(img, w, "#ffffff", "#e4e7ee", rim=.3, hl=.1, edge=.6)
    if yolk:
        yk = ell(x, y + s * .12, s * .56, s * .56); paint(img, yk, "#ffd24a", "#f39a1e", rim=.25, hl=.3, edge=.25)
        gloss(img, x - s * .2, y - s * .08, s * .16, s * .1, -30, .6, yk)
    else:
        yk = ell(x, y + s * .12, s * .52, s * .52); paint(img, yk, "#d9dde6", "#f2f4f8", rim=0, hl=0, edge=.3, dv=(0, 1))


def egg(img):
    shadow(img, .5, .86, .36, .045)
    w = ell(.66, .44, .205, .265, 12); w = OR(w, ell(.655, .52, .225, .20, 12))
    paint(img, smooth(w, .01), "#f1c9a0", "#c98e5c", rim=.4, hl=.35)
    gloss(img, .58, .30, .05, .08, 30, .5)
    _half_egg(img, .34, .60, .185, -14)


def egg_white(img):
    shadow(img, .5, .86, .36, .045)
    _half_egg(img, .66, .46, .175, 14, False)
    _half_egg(img, .34, .60, .185, -14, False)


def shaker(img):
    shadow(img, .5, .89, .24, .04)
    body = smooth(poly([(.30, .30), (.70, .30), (.66, .88), (.34, .88)]), .025)
    paint(img, body, "#f4f6fa", "#cdd3df", rim=.25, edge=.6)
    liq = AND(shrink(body, .014), poly([(0, .50), (1, .50), (1, 1), (0, 1)])); paint(img, liq, "#b98a62", "#7d5334", rim=.2, hl=.15, edge=.2)
    tint(img, ell(.5, .50, .17, .02), "#e2c4a2", .9, .003, shrink(body, .014))
    for y in (.60, .68, .76): tint(img, stroke([(.60, y), (.645, y)], .008), "#ffffff", .8)
    paint(img, rrect(.27, .17, .73, .31, .035), "#f0444e", "#b81d2b")
    paint(img, rrect(.42, .09, .58, .18, .03), "#f0444e", "#b81d2b")
    gloss(img, .385, .58, .018, .22, 2, .55, body)


# ---------- 지방
def almond(img):
    shadow(img, .5, .84, .36, .045)
    for x, y, s, r, sd in [(.66, .36, .17, 35, 1), (.34, .42, .18, -30, 2), (.54, .64, .20, 8, 3)]:
        pts = [(x + np.cos(a) * s * (1 + .12 * np.cos(a)), y + np.sin(a) * s * .60 * (1 - .22 * np.cos(a))) for a in np.linspace(0, 6.28, 100)]
        m = rot(smooth(poly(pts), .008), r, x, y)
        paint(img, m, "#d39a62", "#8a4f24", rim=.4, hl=.3)
        for k in range(-3, 4):
            ln = rot(stroke([(x - s * .85, y + k * s * .05), (x, y + k * s * .14), (x + s * .95, y + k * s * .04)], .004), r, x, y)
            tint(img, ln, "#6e3a16", .4, .002, m)
        gloss(img, x - s * .2, y - s * .22, s * .4, s * .08, -r, .35, m)


def walnut(img):
    shadow(img, .5, .86, .34, .045)
    m = blob(.5, .52, .34, .30, .05, 6, 3); paint(img, m, "#e3b77a", "#9a6a34", rim=.42, hl=.3)
    g = np.random.default_rng(4)
    tint(img, stroke([(.5, .23), (.49, .40), (.51, .62), (.5, .81)], .016), "#7a4f22", .6, .004, m)
    for sx in (-1, 1):
        for cy0 in (.36, .52, .68):
            p = [(.5 + sx * (.06 + .05 * j + .02 * np.sin(j * 2.1 + cy0 * 9)), cy0 + .045 * np.sin(j * 1.9 + sx)) for j in range(5)]
            tint(img, stroke(p, .013), "#7a4f22", .5, .004, m)
            tint(img, stroke([(x - .008, y - .012) for x, y in p], .008), "#f7dcae", .5, .004, m)
    gloss(img, .34, .34, .08, .03, -35, .4, m)


def avocado(img):
    shadow(img, .5, .87, .30, .045)
    pts = [(.5 + np.cos(a) * (.27 - .07 * np.sin(a) * (np.sin(a) < 0)) * (1 + .0 * a), .52 + np.sin(a) * (.36 if np.sin(a) < 0 else .30)) for a in np.linspace(0, 6.28, 140)]
    pts = [(.5 + (x - .5) * (1 - .32 * max(0, (.52 - y) / .36)), y) for x, y in pts]
    m = rot(smooth(poly(pts), .02), 12)
    paint(img, m, "#3f6b34", "#1f3d1e", rim=.3)
    inn = shrink(m, .028); paint(img, inn, "#eef0a0", "#b9d466", rim=.25, hl=.2, edge=.2)
    tint(img, SUB(inn, shrink(inn, .03)), "#8fbf4a", .55, .012)
    pit = ell(.52, .62, .125, .13); tint(img, ell(.535, .635, .13, .135), "#6a7a2a", .4, .012, inn)
    paint(img, pit, "#b77a44", "#6e3f1c", rim=.42, hl=.36); gloss(img, .48, .57, .04, .028, -30, .55, pit)


def olive_oil(img):
    shadow(img, .46, .90, .22, .035)
    body = smooth(OR(rrect(.30, .40, .62, .90, .05), poly([(.40, .22), (.52, .22), (.60, .44), (.32, .44)])), .02)
    paint(img, body, "#d9d86a", "#8f9a24", rim=.34, hl=.3)
    tint(img, shrink(body, .03), "#f2e884", .35, .02)
    paint(img, rrect(.405, .12, .515, .24, .015), "#d6b07a", "#9a7340")
    lab = rrect(.33, .56, .59, .76, .02); paint(img, lab, "#fffdf2", "#ece6cf", rim=.1, edge=.3)
    paint(img, ell(.46, .66, .045, .058, 20), "#6f9a34", "#3f6418")
    gloss(img, .355, .62, .014, .2, 0, .55, body)
    for x, y in [(.76, .80), (.86, .74)]:
        o = ell(x, y, .062, .075, 25); paint(img, o, "#8fb04a", "#4a6a1c", hl=.4); gloss(img, x - .02, y - .03, .018, .014, 0, .6, o)
    lf = rot(AND(ell(.78, .64, .10, .05), ell(.78, .68, .10, .05)), 35, .78, .66); paint(img, lf, "#7cb85a", "#2f6d2a")


def peanut_butter(img):
    shadow(img, .46, .90, .28, .04)
    jar = rrect(.20, .30, .72, .90, .07); paint(img, jar, "#e9b878", "#b47a38", rim=.34, hl=.3)
    tint(img, shrink(jar, .02), "#f3cc92", .35, .03)
    lab = rrect(.20, .50, .72, .74, .0); lab = AND(lab, jar); paint(img, lab, "#fff8e6", "#f0e2c0", rim=.12, edge=.25)
    pn = OR(ell(.40, .62, .06, .055), ell(.52, .62, .065, .06)); paint(img, pn, "#e2b06a", "#a8742e")
    paint(img, rrect(.17, .17, .75, .32, .035), "#f0444e", "#b81d2b")
    for y in (.215, .265): tint(img, stroke([(.21, y), (.71, y)], .006), "#ffffff", .3)
    gloss(img, .255, .58, .014, .22, 0, .5, jar)
    kn = stroke([(.80, .44), (.86, .84)], .034); paint(img, kn, "#eef1f6", "#a9b2c1")
    paint(img, smooth(blob(.80, .40, .075, .085, .12, 3, 2), .01), "#d9a35c", "#a8742e")


# ---------- 2026-11-19 2차: 떡·돼지 안심·닭안심·연어·소고기 다시 그림 ("퀄리티 있게") — 두께(옆면)·도마·허브로 입체감
def slab(m, depth, steps=10):
    """모양 m을 아래로 depth만큼 늘린 옆면(두께) 모양"""
    out = m
    for i in range(1, steps + 1): out = OR(out, ImageChops.offset(m, 0, int(depth * W * i / steps)))
    return out


def board(img, deg=-8):
    shadow(img, .5, .88, .42, .04, .2)
    b = rrect(.06, .30, .94, .80, .07, deg)
    paint(img, slab(b, .035), "#a9743f", "#6f4520", rim=.2, hl=0)
    paint(img, b, "#e2b47a", "#c08a4c", rim=.12, hl=.18, edge=.3)
    for i in range(7):
        y = .36 + i * .062
        tint(img, rot(stroke([(.08, y), (.36, y + .008 * np.sin(i)), (.64, y - .006), (.92, y + .004)], .004), deg), "#9a6a34", .28, .003, b)
    return b


def sprig(img, x, y, deg, n=6, L=.2, col=("#7cc260", "#2f7d32")):
    st = rot(stroke([(x, y), (x + L, y)], .007), deg, x, y); paint(img, st, "#5a8a3a", "#2f5d22", edge=0)
    for i in range(n):
        t = x + L * (i + .6) / n
        for sg in (-1, 1):
            lf = rot(rot(ell(t + .022, y, .034, .011), sg * 38, t, y), deg, x, y)
            paint(img, lf, col[0], col[1], rim=.2, hl=.3, edge=.3)


def tteok(img):
    board(img)
    def log(x0, y0, x1, y1, w):
        m = stroke([(x0, y0), (x1, y1)], w)
        tint(img, ImageChops.offset(m, int(.012 * W), int(.02 * W)), "#3a2410", .28, .014)
        paint(img, m, "#ffffff", "#f1e9da", rim=.3, hl=.1, edge=.45, dv=(-.15, 1))
        gloss(img, (x0 + x1) / 2 - .01, (y0 + y1) / 2 - w * .26, abs(x1 - x0) * .36, w * .07, np.degrees(np.arctan2(y0 - y1, x1 - x0)), .9, m, .006)
        cap = ell(x1, y1, w * .30, w * .47, np.degrees(np.arctan2(y0 - y1, x1 - x0)))
        paint(img, cap, "#fffdf6", "#efe6d4", rim=.12, hl=0, edge=.35)
        tint(img, SUB(cap, shrink(cap, .012)), "#d8ccb4", .5, .004)
    log(.17, .60, .64, .52, .15); log(.33, .73, .80, .65, .15); log(.26, .47, .73, .39, .15)


def tender(img):
    board(img)
    def strip(cx, cy, L, wd, deg, sd):
        up, lo = [], []
        for i in range(81):
            t = i / 80; x = cx - L / 2 + L * t
            r = wd * (np.sin(np.pi * t ** .62) ** .55) * (1 + .06 * np.sin(7 * t + sd)) + .006
            up.append((x, cy - r)); lo.append((x, cy + r * .9))
        m = rot(smooth(poly(up + lo[::-1]), .01), deg, cx, cy)
        tint(img, ImageChops.offset(m, int(.012 * W), int(.022 * W)), "#3a2410", .3, .014)
        paint(img, slab(m, .022), "#e2b170", "#b07a3c", rim=.2, hl=0)
        paint(img, m, "#fde9c4", "#eab873", rim=.3, hl=.3, edge=.4)
        tint(img, rot(ell(cx - L * .05, cy, L * .34, wd * .55), deg, cx, cy), "#e9a24e", .42, .03, m)       # 노릇한 구움색
        for k in range(5):
            x = cx - L * .30 + k * L * .15
            tint(img, rot(stroke([(x + .03, cy - wd), (x - .03, cy + wd)], .014), deg, cx, cy), "#8a4e1c", .5, .004, m)
        tint(img, rot(stroke([(cx - L * .40, cy - wd * .25), (cx + L * .36, cy - wd * .12)], .005), deg, cx, cy), "#fff6e0", .6, .004, m)
        gloss(img, cx - L * .12, cy - wd * .5, L * .2, wd * .1, deg, .5, m)
        return m
    strip(.50, .40, .66, .085, 4, 1); strip(.47, .56, .70, .092, 11, 2); strip(.52, .72, .62, .08, 6, 3)
    dots(img, None, 10, ["#3d7a34", "#57a04a"], (.006, .010), 9, .95, (.24, .34, .76, .76), 1.6)
    paint(img, ell(.86, .30, .065, .05), "#fff39a", "#f2c62c", rim=.3); tint(img, ell(.86, .30, .045, .033), "#fffbd0", .7, .006)


def beef(img):
    board(img)
    pts = [(.5 + np.cos(a) * (.34 + .035 * np.cos(2 * a + .6) + .02 * np.sin(3 * a)), .50 + np.sin(a) * (.20 + .03 * np.sin(2 * a + 1.1))) for a in np.linspace(0, 6.28, 180)]
    m = rot(smooth(poly(pts), .02), -10)
    tint(img, ImageChops.offset(m, int(.014 * W), int(.05 * W)), "#3a2410", .35, .018)
    paint(img, slab(m, .05), "#b53443", "#7a1522", rim=.25, hl=0)                       # 두께
    paint(img, m, "#fff3e2", "#ecd3b0", rim=.1, hl=.1, edge=.3)                         # 지방 테두리
    red = smooth(AND(shrink(m, .012), ImageChops.offset(shrink(m, .012), int(.012 * W), int(.016 * W))), .012)
    paint(img, red, "#ef5f6c", "#b02634", rim=.3, hl=.22, edge=.25)
    tint(img, rot(ell(.46, .47, .22, .10), -10), "#ff8a8f", .4, .05, red)
    g = np.random.default_rng(11)                                                       # 고운 마블링
    for _ in range(26):
        x, y = g.uniform(.22, .78), g.uniform(.36, .64); a = g.uniform(-.6, .2); L = g.uniform(.03, .09)
        p = [(x + np.cos(a) * L * t + .008 * np.sin(t * 5 + x * 40), y + np.sin(a) * L * t + .008 * np.cos(t * 4 + y * 30)) for t in np.linspace(0, 1, 6)]
        tint(img, stroke(p, g.uniform(.004, .008)), "#ffe9e2", g.uniform(.45, .8), .003, red)
    tint(img, rot(stroke([(.24, .44), (.38, .40), (.52, .43)], .011), -10), "#fff1e6", .8, .004, red)   # 굵은 지방 결 하나
    gloss(img, .38, .40, .15, .02, -12, .32, red)
    sprig(img, .60, .80, -14, 6, .26)
    for x, y in [(.20, .76), (.26, .80), (.16, .70)]: paint(img, ell(x, y, .017, .017), "#5a4a42", "#2a201c", hl=.4)


def pork(img):
    board(img)
    # 통 안심(겉은 노릇하게 구운 색)
    lg = stroke([(.22, .40), (.60, .33)], .20)
    tint(img, ImageChops.offset(lg, int(.014 * W), int(.03 * W)), "#3a2410", .32, .016)
    paint(img, lg, "#d99a5c", "#8f5524", rim=.42, hl=.3, dv=(-.1, 1))
    tint(img, stroke([(.22, .36), (.58, .295)], .03), "#f2c088", .5, .02, lg)
    dots(img, lg, 18, ["#6e3d16"], (.004, .008), 6, .4, (.14, .26, .68, .5))
    dots(img, lg, 10, ["#3d7a34"], (.005, .008), 2, .8, (.14, .26, .68, .46), 1.6)
    # 썰어 놓은 조각(속은 연한 분홍)
    for i, (x, y) in enumerate([(.66, .40), (.55, .56), (.40, .70)]):
        f = ell(x, y, .125, .152, -22 + i * 3)
        tint(img, ImageChops.offset(f, int(.012 * W), int(.024 * W)), "#3a2410", .32, .014)
        paint(img, ImageChops.offset(f, int(.03 * W), int(.008 * W)), "#d99a5c", "#8f5524", rim=.3, hl=0)   # 두께(구운 겉면)
        paint(img, f, "#d99a5c", "#a66a30", rim=.1, hl=0, edge=.3)
        inn = shrink(f, .011); paint(img, inn, "#fff0e6", "#f7c9bc", rim=.14, hl=.2, edge=.15)
        tint(img, ell(x + .01, y + .01, .06, .075, -22), "#f9b9b0", .45, .035, inn)                        # 가운데 은은한 분홍
        for k in (-1, 0, 1):
            tint(img, rot(stroke([(x - .07, y + k * .05), (x, y + k * .05 + .012), (x + .07, y + k * .05)], .004), -22, x, y), "#ffffff", .5, .004, inn)
        gloss(img, x - .035, y - .06, .045, .018, -22, .45, inn)
    sprig(img, .12, .74, -30, 5, .2)


def salmon(img):
    board(img)
    q = [(.14, .52), (.22, .34), (.46, .26), (.74, .28), (.88, .40), (.84, .56), (.60, .62), (.30, .62)]
    m = rot(smooth(poly(q), .035), -6)
    side = slab(m, .085)
    tint(img, ImageChops.offset(side, int(.014 * W), int(.02 * W)), "#3a2410", .32, .016)
    paint(img, side, "#f58a5e", "#cf5530", rim=.25, hl=0)                               # 옆면(살 단면)
    for k in range(3):                                                                   # 단면의 층
        tint(img, SUB(ImageChops.offset(m, 0, int((.022 + k * .022) * W)), ImageChops.offset(m, 0, int((.016 + k * .022) * W))), "#ffd2bc", .5, .003, side)
    skin = SUB(side, ImageChops.offset(side, 0, -int(.014 * W)))
    paint(img, AND(skin, side), "#c9d0da", "#7d8696", rim=.1, hl=.2, edge=.2)           # 은빛 껍질
    paint(img, m, "#ffb08a", "#f4764c", rim=.26, hl=.3, edge=.3)
    tint(img, rot(ell(.48, .42, .24, .09), -6), "#ffc9a8", .45, .05, m)
    for i in range(7):                                                                   # 흰 지방 결
        x = .20 + i * .10
        ln = rot(stroke([(x + .05, .24), (x + .005, .36), (x + .02, .46), (x - .04, .64)], .012), -6)
        tint(img, ln, "#ffe9dc", .9, .003, m)
    gloss(img, .40, .34, .17, .018, -8, .4, m)
    # 레몬 한 조각 + 딜
    lem = ell(.80, .70, .105, .09, -15)
    tint(img, ImageChops.offset(lem, int(.01 * W), int(.018 * W)), "#3a2410", .3, .012)
    paint(img, lem, "#ffe45c", "#e9b81e", rim=.25)
    li = ell(.80, .70, .085, .072, -15); paint(img, li, "#fff8b8", "#ffe96e", rim=.08, hl=0, edge=.15)
    for a in range(0, 180, 30):
        tint(img, rot(stroke([(.80 - .085, .70), (.80 + .085, .70)], .005), a - 15, .80, .70), "#ffffff", .85, 0, li)
    paint(img, ell(.80, .70, .012, .010), "#fffbe0", "#fffbe0", hl=0, edge=0)
    sprig(img, .12, .76, -22, 7, .24, ("#8fd07a", "#3f8f3a"))


FOODS = [rice_white, rice_brown, rice_mixed, sweet_potato, potato, oatmeal, bagel, banana, bread, pasta, tteok, pumpkin,
         chicken, tender, thigh, beef, pork, fish, salmon, mackerel, squid, shrimp, tofu, egg, egg_white, shaker,
         almond, walnut, avocado, olive_oil, peanut_butter]

if __name__ == "__main__":
    only = [a for a in sys.argv[1:] if not a.endswith(".png")]
    prev = [a for a in sys.argv[1:] if a.endswith(".png")]
    done = []
    for f in FOODS:
        if only and f.__name__ not in only: continue
        img = new(); f(img)
        out = img.resize((SIZE, SIZE), Image.LANCZOS); out.save(os.path.join(OUTDIR, f.__name__ + ".png"), optimize=True); done.append((f.__name__, out))
    if prev:   # 밝은 바탕·어두운 바탕 미리보기
        n = len(done); cols = 8; rows = (n + cols - 1) // cols
        sh = Image.new("RGB", (cols * 170, rows * 340), "#ffffff")
        ImageDraw.Draw(sh).rectangle([0, rows * 170, cols * 170, rows * 340], fill="#1c1c22")
        for i, (nm, im) in enumerate(done):
            for k in (0, 1): sh.paste(im, (i % cols * 170 + 5, (i // cols + k * rows) * 170 + 5), im)
        sh.save(prev[0])
