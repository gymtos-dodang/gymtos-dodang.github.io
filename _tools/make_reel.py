# JANG KAREDO 운동 릴스 (1440x2560, 60fps, 무음)
# 사용: python3 make_reel.py spec.json out.mp4 [--preview]
import json, subprocess, sys, os, numpy as np
from PIL import Image, ImageDraw, ImageFont, ImageFilter

SPEC = json.load(open(sys.argv[1]))
OUT = sys.argv[2]
PREVIEW = "--preview" in sys.argv
SRC = SPEC["video"]
ANAT = SPEC.get("anatomy_dir", "/home/claude/repo/_tools")
LOGO = SPEC.get("logo", "/home/claude/repo/assets/logo.png")
TMP = os.path.dirname(os.path.abspath(OUT))
W, H, FPS = 1440, 2560, 60

# ---------- source info ----------
pr = json.loads(subprocess.run(["ffprobe", "-v", "error", "-select_streams", "v:0", "-show_entries",
    "stream=color_transfer:format=duration", "-of", "json", SRC], capture_output=True, text=True).stdout)
SRC_DUR = float(pr["format"]["duration"])
# 릴스 길이 14~18초 (2026-11-21): 18초 넘으면 앞 18초만, 14초 안 되면 원본을 이어 붙여(반복) 14초로
LEN_MIN, LEN_MAX = SPEC.get("len_min", 14), SPEC.get("len_max", 18)
DUR = min(max(SRC_DUR, LEN_MIN), LEN_MAX)
LOOP = DUR > SRC_DUR + 0.01
HDR = pr["streams"][0].get("color_transfer") in ("arib-std-b67", "smpte2084")
N = int(DUR * FPS)

FD = "/usr/share/fonts/opentype/noto/"
def F(w, s): return ImageFont.truetype(FD + f"NotoSansCJK-{w}.ttc", s, index=1)
def SERIF(s): return ImageFont.truetype(FD + "NotoSerifCJK-Bold.ttc", s, index=1)

ROSE = (168, 36, 44)          # JANG KAREDO 딥 레드
INK = (26, 26, 30)
MUTE = (150, 144, 140)
MP, MS = "#C8434B", "#EDB7B9"  # 주동근 / 협력근 칠
MP_RGB = (200, 67, 75)

# 릴스 안전 영역: 세로로 긴 폰에서 양옆 ~130px 잘림 → 글자·영상·그림은 x 150~1290 안에, 배경·하단 패널만 화면 끝까지
SAFE_L, SAFE_R = 150, 1290
VX, VY, VW, VH, VR = SAFE_L, 470, 680, 1208, 36
DX0 = VX + VW + 16
PANEL_Y1 = 2400  # 패널 아래 끝 (위쪽 Y0은 내용 높이로 계산)
S = 1.0; SW, SH = W, H; OX, OY = 0, 0
FVX, FVY = OX + round(VX * S), OY + round(VY * S)
FVW, FVH = round(VW * S) // 2 * 2, round(VH * S) // 2 * 2

# ---------- stages ----------
# 인트로: 썸네일 화면(INTRO_HOLD초) → 영상이 줄어들며 카드 자리로 들어감(INTRO_TR초) → 본편
INTRO_HOLD, INTRO_TR = SPEC.get("intro_hold", 1.5), 0.75
T_MAIN = INTRO_HOLD + INTRO_TR
cut = SPEC.get("stage_times") or [T_MAIN + (DUR - T_MAIN) * f for f in (0, 0.24, 0.485, 0.735)]
BASE = [
    dict(key="자세", en="POSTURE", num="01", title="기본 자세", sub="BASIC STANCE", head="자세 포인트", head_en="SETUP", diag=1),
    dict(key="주동근", en="PRIME", num="02", title="주동근", sub="PRIME MOVER", head="주동근", head_en="PRIME MOVERS", diag=2),
    dict(key="협력근", en="SYNERGIST", num="03", title="협력근", sub="SYNERGIST", head="협력근", head_en="SYNERGISTS", diag=3),
    dict(key="수축·이완", en="CONTRACT", num="04", title="수축 · 이완", sub="CONTRACT & RELEASE", head="수축 · 이완", head_en="TEMPO", diag=3),
]
STAGES = []
for i, b in enumerate(BASE):
    STAGES.append(dict(b, t0=cut[i], rows=[tuple(r) for r in SPEC["rows"][i]]))

# ---------- bottom panel metrics (모든 단계 공통) ----------
_d = ImageDraw.Draw(Image.new("RGB", (8, 8)))
PL, PR = SAFE_L + 48, SAFE_R - 48
ALLROWS = [r for S_ in STAGES for r in S_["rows"]]
for SA in range(56, 36, -1):
    FA, FB, FSL = F("Black", SA), F("Regular", round(SA * 0.78)), F("Light", round(SA * 0.8))
    COL = PL + max(_d.textlength(a, font=FA) for a, _ in ALLROWS) + 30
    if COL + 34 + max(_d.textlength(b, font=FB) for _, b in ALLROWS) <= PR: break
STEP = round(SA * 1.8)
CAP = -FA.getbbox("가", anchor="ls")[1]
NMAX = max(len(S_["rows"]) for S_ in STAGES)
HEAD_H = 104 + 36                       # 패널 위 → 구분선
PAD = 64                                # 구분선 아래 여백 = 패널 아래 여백
PANEL_Y0 = PANEL_Y1 - (HEAD_H + PAD + (NMAX - 1) * STEP + CAP + PAD)
VH = (PANEL_Y0 - 44 - VY) // 2 * 2      # 영상 카드는 패널 바로 위까지 (영상은 카드 비율로 가운데 크롭)
FVH = VH

# ---------- anatomy (v4) ----------
sys.path.insert(0, ANAT)
import anatomy_v4 as A
import matplotlib.pyplot as plt
A.EDGE[MP] = "#8E2A31"; A.EDGE[MS] = "#C98A8D"
A.LAYER[MP] = A.LAYER[A.PRIMARY]; A.LAYER[MS] = A.LAYER[A.SECOND]
REGION = SPEC.get("region", "lower")
CROP = {"lower": ((-0.98, 0.98), (-0.12, 5.05)),
        "upper": ((-1.45, 1.45), (3.55, 8.05)),
        "full":  ((-1.45, 1.45), (-0.12, 8.05))}[REGION]
BOX_W, BOX_H = 206, 600
hl = SPEC["muscles"]
def hl_for(k, view):
    out = {}
    if k >= 3:
        for n in hl.get(view + "_second", []): out[n] = MS
    if k >= 2:
        for n in hl.get(view + "_primary", []): out[n] = MP
    return out
DIAG = {}
for k in (1, 2, 3):
    for view in ("front", "back"):
        (x0, x1), (y0, y1) = CROP
        fig = plt.figure(figsize=((x1 - x0) * 0.62, (y1 - y0) * 0.62), dpi=230)
        ax = fig.add_axes([0, 0, 1, 1])
        A._draw_view(ax, 0, "F" if view == "front" else "B", hl_for(k, view), SPEC.get("sex", "M"))
        ax.set_xlim(x0, x1); ax.set_ylim(y0, y1); ax.set_aspect("equal"); ax.axis("off")
        p = f"{TMP}/_diag_{k}_{view}.png"; fig.savefig(p, transparent=True); plt.close(fig)
        im = Image.open(p).convert("RGBA")
        sc = min(BOX_W / im.width, BOX_H / im.height)
        im = im.resize((int(im.width * sc), int(im.height * sc)), Image.LANCZOS)
        a = np.array(im).astype(np.float32)
        ramp = np.clip(np.arange(im.height) / 70.0, 0, 1) ** 1.5
        if REGION == "lower": a[..., 3] *= ramp[:, None]                 # 허리 위 페이드
        if REGION == "upper": a[..., 3] *= ramp[::-1][:, None]           # 허리 아래 페이드
        DIAG[(k, view)] = Image.fromarray(a.astype(np.uint8))
DH = max(im.height for im in DIAG.values())
C1 = DX0 + (SAFE_R - DX0) * 0.26; C2 = DX0 + (SAFE_R - DX0) * 0.76
DY = VY + (VH - (DH + 46 + 40 + 110 + 72 + 24)) // 2

def text_w(d, s, f, sp=0): return d.textlength(s, font=f) + sp * max(len(s) - 1, 0)
def spaced(d, xy, s, f, fill, sp):
    x, y = xy
    for ch in s:
        d.text((x, y), ch, font=f, fill=fill); x += d.textlength(ch, font=f) + sp
    return x

def background():
    # PT노트 종이색 흰 배경(#FFFFFF)
    return Image.new("RGBA", (W, H), (255, 255, 255, 255))

def rr_mask(w, h, r, s=4):
    m = Image.new("L", (w * s, h * s), 0)
    ImageDraw.Draw(m).rounded_rectangle((0, 0, w * s - 1, h * s - 1), r * s, fill=255)
    return m.resize((w, h), Image.LANCZOS)

def shadow(base, box, r, blur, alpha, off=(0, 18)):
    x0, y0, x1, y1 = box
    sh = Image.new("L", (W, H), 0)
    ImageDraw.Draw(sh).rounded_rectangle((x0 + off[0], y0 + off[1], x1 + off[0], y1 + off[1]), r, fill=alpha)
    dark = Image.new("RGBA", (W, H), (60, 50, 50, 0)); dark.putalpha(sh.filter(ImageFilter.GaussianBlur(blur)))
    base.alpha_composite(dark)

BG_FULL = background()
def place(Lr):
    out = BG_FULL.copy(); out.alpha_composite(Lr.resize((SW, SH), Image.LANCZOS), (OX, OY))
    return np.array(out.convert("RGB"), dtype=np.uint8)
LG = Image.open(LOGO).convert("RGBA"); LG = LG.resize((int(LG.width * 72 / LG.height), 72), Image.LANCZOS)

def stage_layer(si, blank=False):
    st = STAGES[si]; L = Image.new("RGBA", (W, H), (0, 0, 0, 0)); d = ImageDraw.Draw(L)
    # chips
    for sz in range(32, 20, -1):
        fc, fe = F("Bold", sz), F("Medium", round(sz * 0.56))
        ws = [66 + text_w(d, s["key"], fc) + 12 + text_w(d, s["en"], fe, 2) + 28 for s in STAGES]
        if sum(ws) + 36 <= SAFE_R - SAFE_L: break
    x = SAFE_L + (SAFE_R - SAFE_L - sum(ws) - 36) / 2; y0, y1 = 190, 256
    for i, s in enumerate(STAGES):
        w = ws[i]; act, done = i == si, i < si
        d.rounded_rectangle((x, y0, x + w, y1), 35, fill=(26, 26, 30, 255) if act else (140, 124, 124, 110))
        cx, cy = x + 34, (y0 + y1) / 2
        if act:
            d.ellipse((cx - 17, cy - 17, cx + 17, cy + 17), fill=ROSE + (255,))
            d.text((cx, cy - 1), str(i + 1), font=F("Bold", 22), fill="white", anchor="mm")
        else:
            d.ellipse((cx - 16, cy - 16, cx + 16, cy + 16), outline=(255, 255, 255, 200), width=3)
            if done: d.line([(cx - 8, cy), (cx - 2, cy + 6), (cx + 9, cy - 6)], fill="white", width=4, joint="curve")
            else: d.text((cx, cy - 1), str(i + 1), font=F("Bold", 21), fill=(255, 255, 255, 220), anchor="mm")
        tx = x + 60
        d.text((tx, cy), s["key"], font=fc, fill=(255, 255, 255, 255 if act else 225), anchor="lm")
        spaced(d, (tx + text_w(d, s["key"], fc) + 12, cy - fe.size * 0.6), s["en"], fe, (255, 255, 255, 170 if act else 140), 2)
        x += w + 12
    # header
    hy = 362
    num, title, sub = ("", "", "") if blank else (st["num"], st["title"], st["sub"])
    d.text((VX, hy), num, font=SERIF(88), fill=ROSE + (255,), anchor="ls")
    nx = VX + text_w(d, num, SERIF(88)) + 24
    d.text((nx, hy - 6), title, font=F("Black", 66), fill=INK + (255,), anchor="ls")
    sx = nx + text_w(d, title, F("Black", 66)) + 22
    ex = spaced(d, (sx, hy - 40), sub, F("Medium", 26), (120, 114, 112, 255), 7)
    if not blank: d.line([(ex + 24, hy - 26), (SAFE_R, hy - 26)], fill=(200, 150, 152, 255), width=3)
    d.text((VX, hy + 46), f"{SPEC['name_ko']}  ·  {SPEC['name_en']}", font=F("Medium", 30), fill=(128, 122, 118, 255))
    shadow(L, (VX, VY, VX + VW, VY + VH), VR, 30, 110)
    # diagrams + labels + legend
    k = st["diag"]
    for c, v in ((C1, "front"), (C2, "back")):
        im = DIAG[(k, v)]; L.alpha_composite(im, (int(c - im.width / 2), DY + (DH - im.height)))
    ly = DY + DH + 46
    for c, a, b in ((C1, "FRONT", "앞"), (C2, "BACK", "뒤")):
        f1, f2 = F("Bold", 26), F("Medium", 26)
        x0 = c - (text_w(d, a, f1, 6) + 14 + text_w(d, b, f2)) / 2
        e = spaced(d, (x0, ly), a, f1, (125, 118, 114, 255), 6)
        d.text((e + 14, ly), b, font=f2, fill=(125, 118, 114, 255))
    gy = ly + 110; lx = DX0 + 22
    for col, a, b, on in ((MP_RGB, "주동근", "PRIME", k >= 2), ((237, 183, 185), "협력근", "SYNERGIST", k >= 3)):
        al = 255 if on else 110
        d.rounded_rectangle((lx, gy - 12, lx + 48, gy + 12), 12, fill=col + (al,))
        d.text((lx + 66, gy), a, font=F("Bold", 34), fill=INK + (al,), anchor="lm")
        spaced(d, (lx + 66 + text_w(d, a, F("Bold", 34)) + 16, gy - 11), b, F("Medium", 20), MUTE + (al,), 4)
        gy += 72
    # bottom panel: 영상 카드와 같은 폭(SAFE_L~SAFE_R)의 둥근 카드
    shadow(L, (SAFE_L, PANEL_Y0, SAFE_R, PANEL_Y1), 40, 26, 90, off=(0, 14))
    pnl = Image.new("RGBA", (W, H), (0, 0, 0, 0))
    ImageDraw.Draw(pnl).rounded_rectangle((SAFE_L, PANEL_Y0, SAFE_R, PANEL_Y1), 40, fill=(26, 26, 30, 255))
    L.alpha_composite(pnl); d = ImageDraw.Draw(L)
    if blank: return place(L)
    hy = PANEL_Y0 + 104
    fh, fs_, fe = F("Black", 54), F("Light", 46), F("Bold", 34)
    cy = hy + fh.getbbox("주", anchor="ls")[1] / 2
    d.ellipse((PL, cy - 10, PL + 20, cy + 10), fill=ROSE + (255,))
    d.text((PL + 40, hy), st["head"], font=fh, fill=(224, 98, 106, 255), anchor="ls")
    x = PL + 40 + text_w(d, st["head"], fh) + 22
    d.text((x, hy), "/", font=fs_, fill=(150, 140, 140, 255), anchor="ls")
    x += text_w(d, "/", fs_) + 22
    for ch in st["head_en"]:
        d.text((x, hy), ch, font=fe, fill=(200, 186, 186, 255), anchor="ls"); x += d.textlength(ch, font=fe) + 9
    L.alpha_composite(LG, (PR - LG.width, int(cy - LG.height / 2)))
    dy_ = hy + 36
    d.line([(PL, dy_), (PR, dy_)], fill=(110, 44, 50, 255), width=2)
    fa, fb, fsl, col, step, cap = FA, FB, FSL, COL, STEP, CAP
    ry = dy_ + PAD + cap
    for a, b in st["rows"]:
        d.text((PL, ry), a, font=fa, fill=(255, 255, 255, 255), anchor="ls")
        d.text((col, ry), "/", font=fsl, fill=(130, 124, 124, 255), anchor="ls")
        d.text((col + 34, ry), b, font=fb, fill=(215, 210, 208, 255), anchor="ls")
        ry += step
    return place(L)

layers = [stage_layer(i) for i in range(4)]
blanks = [stage_layer(i, True) for i in range(4)]

# stage-4 glow on primary muscles (both views)
glow = np.zeros((H, W), np.float32)
for c, v in ((C1, "front"), (C2, "back")):
    im = DIAG[(3, v)]; a = np.array(im).astype(np.int16)
    m = (abs(a[..., 0] - 200) < 30) & (abs(a[..., 1] - 67) < 35) & (abs(a[..., 2] - 75) < 35) & (a[..., 3] > 200)
    g = np.array(Image.fromarray((m * 255).astype(np.uint8)).filter(ImageFilter.MaxFilter(9))
                 .filter(ImageFilter.GaussianBlur(16)), np.float32) / 255
    gx, gy = int(c - im.width / 2), DY + (DH - im.height)
    glow[gy:gy + im.height, gx:gx + im.width] = np.maximum(glow[gy:gy + im.height, gx:gx + im.width], g)
gim = Image.fromarray((glow * 255).astype(np.uint8)).resize((SW, SH), Image.LANCZOS)
glow = np.zeros((H, W), np.float32); glow[OY:OY + SH, OX:OX + SW] = np.array(gim, np.float32) / 255
ys, xs = np.nonzero(glow > 0.003)
GROI = (slice(ys.min(), ys.max() + 1), slice(xs.min(), xs.max() + 1)) if len(ys) else None
gl_roi = glow[GROI][..., None] if GROI else None

vmask = np.array(rr_mask(FVW, FVH, round(VR * S)), np.float32)[..., None] / 255
pill = Image.new("RGBA", (VW, VH), (0, 0, 0, 0)); pdr = ImageDraw.Draw(pill)
# 알약 폭은 글자 길이로 계산 (글자가 테두리에 닿지 않게 좌우 여백 동일 28)
_f1, _f2 = F("Bold", 24), F("Medium", 22)
_tx_end = 74 + text_w(pdr, "REAL SET", _f1, 4) + 14 + text_w(pdr, "실제 운동", _f2)
pdr.rounded_rectangle((26, 26, _tx_end + 28, 82), 28, fill=(30, 30, 32, 170))
pdr.ellipse((48, 48, 60, 60), fill=(255, 255, 255, 255))
_cy = 54
_x = 74
for ch in "REAL SET":
    pdr.text((_x, _cy), ch, font=_f1, fill=(255, 255, 255, 255), anchor="lm"); _x += pdr.textlength(ch, font=_f1) + 4
pdr.text((_x - 4 + 14, _cy), "실제 운동", font=_f2, fill=(230, 230, 230, 255), anchor="lm")
pa = np.array(pill.resize((FVW, FVH), Image.LANCZOS), np.float32); pill_rgb, pill_al = pa[..., :3], pa[..., 3:] / 255

def ease(t): return t * t * (3 - 2 * t)

# ---------- 썸네일(인트로 첫 화면 = 커버) ----------
LG_T = Image.open(LOGO).convert("RGBA"); LG_T = LG_T.resize((int(LG_T.width * 88 / LG_T.height), 88), Image.LANCZOS)
def fit_font(text, weight, start, maxw, sp=0):
    d = ImageDraw.Draw(Image.new("RGB", (8, 8)))
    for sz in range(start, 20, -2):
        f = F(weight, sz)
        if text_w(d, text, f, sp) <= maxw: return f
    return F(weight, 20)
def thumb_overlay():
    ov = Image.new("RGBA", (W, H), (0, 0, 0, 0))
    y = np.arange(H, dtype=np.float32)
    al = np.clip((300 - y) / 300, 0, 1) * 0.35 + np.clip((y - 1000) / 900, 0, 1) ** 1.2 * 0.9
    a = np.zeros((H, W, 4), np.uint8); a[..., 0], a[..., 1], a[..., 2] = 14, 10, 12
    a[..., 3] = (np.clip(al, 0, 0.92) * 255)[:, None]
    ov = Image.fromarray(a, "RGBA"); d = ImageDraw.Draw(ov)
    MW = SAFE_R - SAFE_L
    # 종목 영문 태그
    ft = F("Bold", 30); tag = SPEC["name_en"]
    tw = text_w(d, tag, ft, 6)
    d.rounded_rectangle((SAFE_L, 1268, SAFE_L + tw + 56, 1322), 27, fill=ROSE + (255,))
    xx = SAFE_L + 28
    for ch in tag:
        d.text((xx, 1295), ch, font=ft, fill=(255, 255, 255, 255), anchor="lm"); xx += d.textlength(ch, font=ft) + 6
    # 큰 제목 + 훅 두 줄 (폭에 맞게 자동 크기)
    title = SPEC.get("thumb_title", SPEC["name_ko"])
    fT = fit_font(title, "Black", 156, MW)
    d.text((SAFE_L, 1500), title, font=fT, fill=(255, 255, 255, 255), anchor="ls")
    hook = SPEC.get("hook", ["", ""])
    fh1 = fit_font(hook[0], "Bold", 70, MW); fh2 = fit_font(hook[1], "Black", 82, MW)
    d.text((SAFE_L, 1620), hook[0], font=fh1, fill=(255, 255, 255, 235), anchor="ls")
    d.text((SAFE_L, 1735), hook[1], font=fh2, fill=(232, 96, 104, 255), anchor="ls")
    d.line([(SAFE_L, 1808), (SAFE_R, 1808)], fill=(255, 255, 255, 90), width=2)
    # 본편 미리보기 목차
    fn, fk = F("Bold", 30), F("Medium", 30)
    items = [(s_["num"], s_["key"]) for s_ in STAGES]
    gapx = 34
    tot = sum(text_w(d, n, fn) + 10 + text_w(d, k, fk) for n, k in items) + gapx * 3
    if tot > MW: fn, fk = F("Bold", 26), F("Medium", 26)
    xx = SAFE_L
    for n, k in items:
        d.text((xx, 1880), n, font=fn, fill=(232, 96, 104, 255), anchor="ls"); xx += text_w(d, n, fn) + 10
        d.text((xx, 1880), k, font=fk, fill=(255, 255, 255, 210), anchor="ls"); xx += text_w(d, k, fk) + gapx
    # 맨 아래 서명 줄: 왼쪽 "장동욱TR", 오른쪽 레드 로고 (같은 줄 세로 가운데)
    fs_ = F("Bold", 36); sy = 1975
    d.text((SAFE_L, sy), "장동욱TR", font=fs_, fill=(255, 255, 255, 230), anchor="ls")
    scy = sy + fs_.getbbox("장", anchor="ls")[1] / 2
    ov.alpha_composite(LG_T, (SAFE_R - LG_T.width, int(scy - LG_T.height / 2)))
    return ov
THUMB = thumb_overlay()
TH_RGB = np.array(THUMB, np.float32)[..., :3]; TH_A = np.array(THUMB, np.float32)[..., 3:] / 255
WHITE = np.full((H, W, 3), 255, np.float32)

def cover_fit(full, w, h):
    """full(1440x2560) 가운데를 w:h 비율로 잘라 w×h로"""
    fh, fw = full.shape[:2]
    if fw / fh > w / h: cw, ch = int(fh * w / h), fh
    else: cw, ch = fw, int(fw * h / w)
    x0, y0 = (fw - cw) // 2, (fh - ch) // 2
    return np.array(Image.fromarray(full[y0:y0 + ch, x0:x0 + cw]).resize((w, h), Image.BILINEAR), np.float32)

def intro_frame(t, full):
    p = ease(min(max((t - INTRO_HOLD) / INTRO_TR, 0), 1))
    if p <= 0:
        img = full.astype(np.float32)
        return np.clip(img * (1 - TH_A) + TH_RGB * TH_A, 0, 255).astype(np.uint8)
    img = WHITE * (1 - p) + layers[0].astype(np.float32) * p
    x0, y0 = round(FVX * p), round(FVY * p)
    w, h = round(W + (FVW - W) * p), round(H + (FVH - H) * p)
    v = cover_fit(full, w, h)
    m = np.array(rr_mask(w, h, max(1, round(VR * p))), np.float32)[..., None] / 255
    reg = img[y0:y0 + h, x0:x0 + w]
    img[y0:y0 + h, x0:x0 + w] = reg * (1 - m) + v * m
    k = max(0.0, 1 - p * 1.8)                                       # 썸네일 글자는 먼저 사라짐
    if k > 0:
        sh = int(80 * p)
        ta = np.zeros_like(TH_A); tr_ = np.zeros_like(TH_RGB)
        ta[:H - sh], tr_[:H - sh] = TH_A[sh:], TH_RGB[sh:]
        ta *= k
        img = img * (1 - ta) + tr_ * ta
    return np.clip(img, 0, 255).astype(np.uint8)

def frame(i, full):
    t = i / FPS
    if t < T_MAIN: return intro_frame(t, full)
    vid = cover_fit(full, FVW, FVH)
    si = max(j for j, s in enumerate(STAGES) if t >= s["t0"])
    tr = (t - STAGES[si]["t0"]) / 0.45
    if si > 0 and tr < 1:
        if tr < 0.5: b = ease(tr * 2); img = layers[si - 1] * (1 - b) + blanks[si] * b
        else: b = ease(tr * 2 - 1); img = blanks[si] * (1 - b) + layers[si] * b
        img = img.astype(np.float32)
    else:
        img = layers[si].astype(np.float32)
    if si == 3 and GROI:
        p = 0.5 - 0.5 * np.cos(2 * np.pi * (t - STAGES[3]["t0"]) / 1.1)
        k = p * min((t - STAGES[3]["t0"]) / 0.35, 1) * 0.55
        img[GROI] = img[GROI] * (1 - gl_roi * k) + np.array([214, 52, 60], np.float32) * gl_roi * k
    pa_k = min((t - T_MAIN) / 0.3, 1)                                 # REAL SET 라벨은 카드 안착 후 페이드인
    v = vid * (1 - pill_al * pa_k) + pill_rgb * pill_al * pa_k
    m_, b0, b1 = round(40 * S), FVH - round(40 * S), FVH - round(32 * S)
    bw = int((FVW - 2 * m_) * min(i / max(N - 1, 1), 1))
    v[b0:b1, m_:FVW - m_] = v[b0:b1, m_:FVW - m_] * 0.5 + 64
    v[b0:b1, m_:m_ + bw] = 255
    reg = img[FVY:FVY + FVH, FVX:FVX + FVW]
    img[FVY:FVY + FVH, FVX:FVX + FVW] = reg * (1 - vmask) + v * vmask
    return np.clip(img, 0, 255).astype(np.uint8)

tone = ("zscale=t=linear:npl=203,format=gbrpf32le,zscale=p=bt709,tonemap=hable:desat=0,"
        "zscale=t=bt709:m=bt709:r=tv,format=yuv420p," if HDR else "")
# 세로 영상 기준: 9:16 비율로 가운데 크롭 후 카드 크기로
VF = (tone + f"fps={FPS},hqdn3d=1.5:1.2:6:5,crop='min(iw,ih*9/16)':'min(ih,iw*16/9)',scale={W}:{H}:flags=lanczos,"
      "eq=saturation=0.92:brightness=0.02,format=rgb24")
dec = subprocess.Popen(["ffmpeg", "-v", "error", *(["-stream_loop", "-1"] if LOOP else []), "-i", SRC, "-t", f"{DUR:.3f}",
                        "-vf", VF, "-f", "rawvideo", "-"], stdout=subprocess.PIPE)
FS = W * H * 3
# 커버 PNG (인트로 첫 화면과 같은 디자인, 정점 장면)
_ct = SPEC.get("cover_time", 0)
_cv = subprocess.run(["ffmpeg", "-v", "error", "-ss", str(_ct), "-i", SRC, "-vf", VF, "-frames:v", "1", "-f", "rawvideo", "-"],
                     capture_output=True).stdout
if len(_cv) >= FS:
    _f = np.frombuffer(_cv[:FS], np.uint8).reshape(H, W, 3).astype(np.float32)
    COVER = os.path.splitext(OUT)[0] + "_썸네일.png"
    Image.fromarray(np.clip(_f * (1 - TH_A) + TH_RGB * TH_A, 0, 255).astype(np.uint8)).save(COVER)
    print("cover ->", COVER)

if PREVIEW:
    want = {int(STAGES[s]["t0"] * FPS + 0.6 * FPS) for s in range(4)} | {int(x * FPS) for x in (0.2, INTRO_HOLD + INTRO_TR * 0.3, INTRO_HOLD + INTRO_TR * 0.7)}
    i = 0
    while True:
        raw = dec.stdout.read(FS)
        if len(raw) < FS: break
        if i in want:
            Image.fromarray(frame(i, np.frombuffer(raw, np.uint8).reshape(H, W, 3))).save(f"{TMP}/_prev_{i:04d}.png")
        i += 1
    sys.exit()

# 한 번의 원본 프레임에서 두 파일을 동시에 인코딩 (압축 1회씩): 2K 보관본 + 인스타 업로드용 1080p60
IG_OUT = os.path.splitext(OUT)[0] + "_IG1080p60.mp4"
COL = ["-color_primaries", "bt709", "-color_trc", "bt709", "-colorspace", "bt709", "-movflags", "+faststart"]
enc = subprocess.Popen(["ffmpeg", "-v", "error", "-y", "-f", "rawvideo", "-pix_fmt", "rgb24", "-s", f"{W}x{H}",
    "-r", str(FPS), "-i", "-", "-f", "lavfi", "-i", "anullsrc=r=48000:cl=stereo",
    "-filter_complex", "[0:v]split=2[a][b];[b]scale=1080:1920:flags=lanczos,unsharp=3:3:0.4[ig]",
    "-map", "[a]", "-an", "-c:v", "libx264", "-preset", "veryfast", "-crf", "16",
    "-pix_fmt", "yuv420p", "-profile:v", "high", "-level", "5.2", *COL, OUT,
    "-map", "[ig]", "-map", "1:a", "-shortest", "-c:v", "libx264", "-preset", "slow", "-profile:v", "high", "-level", "4.2",
    "-pix_fmt", "yuv420p", "-b:v", "20M", "-maxrate", "25M", "-bufsize", "40M", "-g", "120", "-bf", "2",
    "-c:a", "aac", "-b:a", "128k", *COL, IG_OUT], stdin=subprocess.PIPE)
i = 0
while True:
    raw = dec.stdout.read(FS)
    if len(raw) < FS: break
    enc.stdin.write(frame(i, np.frombuffer(raw, np.uint8).reshape(H, W, 3)).tobytes()); i += 1
enc.stdin.close(); enc.wait(); print("frames", i, "->", OUT, "+", IG_OUT)
