"""JANG KAREDO PT노트로 브랜드 바꾸기 (2026-11-11 장동욱 "짐토스 로고 치우고 독자적인 피티 통합시스템")

- 색: 남 = 블랙·레드, 여 = 핑크레드 (네이비·핑크 hex/rgba를 표로 바꿈)
- 로고: assets/logo.png(빨강) · logo-white.png(흰색) — 원본 _tools/brand/jk_logo_src.png 에서 잡티 지우고 만듦
- 앱 아이콘: 블랙 바탕 + 빨강 로고 (회원 icon.png, 선생님 icon-coach-*.png)
- 아이콘 PNG(운동·식단 끼니·근육 지도) 색만 바꿈, 회원 og.jpg 다시 그림
- 'GYMTOS 도당점' 글자 전부 빼고 'JANG KAREDO' / 'JANG KAREDO PT노트'

    python3 _tools/rebrand_jk.py            (여러 번 돌려도 같은 결과 — 이미 바뀐 건 그대로)
"""
import os, re, glob, json, subprocess
import numpy as np
from PIL import Image, ImageDraw, ImageFont
from scipy import ndimage as nd

ROOT = os.path.abspath(os.path.join(os.path.dirname(__file__), ".."))
J = lambda *p: os.path.join(ROOT, *p)
RED = (215, 20, 26)          # 로고 빨강 #D7141A
M_PRI, M_KEY = "#1A1A1E", "#E1141E"
F_PRI = "#D6204F"

HEX = {  # 옛 색 → 새 색 (대소문자 무시)
    "#1F3864": "#1A1A1E", "#17294B": "#0E0E10", "#0F1B33": "#121214", "#0D1424": "#0A0A0B",
    "#DB4C8C": "#E1141E", "#F27BB0": "#FF4F57", "#E0508F": "#E1141E", "#B9C8E6": "#CDBFC0",
    "#4C6696": "#6E5D5E", "#D3DCEE": "#E2D6D7", "#EDF2FA": "#F6F1F1", "#DCE5F3": "#ECE2E2",
    "#D5DCE8": "#E3DADA", "#E6EAF1": "#ECE7E7", "#E6ECF7": "#F1EBEB", "#E8EDF7": "#F2ECEC",
    "#DCE3F0": "#E8E0E0", "#8796B5": "#A09192", "#F3F5F9": "#F5F3F3", "#C2185B": "#D6204F",
    "#A3134B": "#B0173F", "#A82E63": "#A50E14", "#F4B3CE": "#F5B4B7", "#F7B3D0": "#F7B6BA",
    "#ECEFF5": "#F1ECEC", "#8792A8": "#958A8B", "#C5CCDA": "#D2C8C9", "#C9D2E3": "#DDD2D3",
    "#A9B7D2": "#C2B3B4", "#7E92BA": "#9A8586",
}
RGB = {  # rgba( r, g, b → 새 r, g, b
    (31, 56, 100): (26, 26, 30), (219, 76, 140): (225, 20, 30), (194, 24, 91): (214, 32, 79),
    (23, 41, 75): (14, 14, 16), (15, 27, 51): (18, 18, 20), (242, 123, 176): (255, 79, 87),
}
TEXT = [  # 글자 바꾸기 (순서 중요)
    ("GYMTOS 도당점 · 담당", "JANG KAREDO PT노트 · 담당"),
    ("PT 노트 · GYMTOS 도당점", "JANG KAREDO PT노트"),
    ("PT 노트 선생님 · GYMTOS 도당점", "PT노트 선생님 · JANG KAREDO"),
    ("GYMTOS 도당점 회원 전용", "JANG KAREDO 회원 전용"),
    ("GYMTOS 도당점 PT 노트", "JANG KAREDO PT노트"),
    ("PERSONAL TRAINER · 짐토스24 도당점", "PERSONAL TRAINER · JANG KAREDO"),
    ("GYMTOS 도당점", "JANG KAREDO"),
    ('alt="GYMTOS 로고"', 'alt="JANG KAREDO 로고"'), ('alt="GYMTOS"', 'alt="JANG KAREDO"'),
    ('<div class="brand"><b>GYMTOS</b><span>도당점</span></div>', '<div class="brand"><b>JANG KAREDO</b><span>PT노트</span></div>'),
]


def hexmap(s):
    for a, b in HEX.items():
        s = re.sub(re.escape(a), b, s, flags=re.I)
    def rg(m):
        t = tuple(int(x) for x in m.group(2).split(","))
        if t in RGB: return m.group(1) + "(" + ", ".join(str(v) for v in RGB[t])
        return m.group(0)
    return re.sub(r"(rgba?)\((\s*\d+\s*,\s*\d+\s*,\s*\d+)(?=\s*[,)])", rg, s)


def text_files():
    fs = [J("index.html"), J("assets", "style.css"), J("assets", "app.js"), J("assets", "exicons.js"), J("assets", "site.js")]
    fs += glob.glob(J("coach-tqqnlh", "*.html")) + [J("coach-tqqnlh", "manifest.webmanifest")]
    fs += glob.glob(J("m", "*", "index.html"))
    return fs


def logos():
    src = J("_tools", "brand", "jk_logo_src.png")
    a = np.asarray(Image.open(src).convert("RGBA")).astype(int)
    red = (a[..., 3] > 90) & (a[..., 0] > 110)
    m = nd.binary_closing(red, structure=np.ones((5, 5)), iterations=2)
    lab, n = nd.label(m)
    sizes = nd.sum(m, lab, range(1, n + 1))
    m = np.isin(lab, 1 + np.where(sizes > 4000)[0])
    ys, xs = np.where(m)
    m = m[ys.min():ys.max() + 1, xs.min():xs.max() + 1]
    al = Image.fromarray((m * 255).astype(np.uint8)).filter(__import__("PIL.ImageFilter").ImageFilter.GaussianBlur(1.2))
    W = 900; H = round(al.height * W / al.width)
    al = al.resize((W, H), Image.LANCZOS)
    for name, col in [("logo.png", RED), ("logo-white.png", (255, 255, 255)), ("logo-black.png", (14, 14, 16))]:
        im = Image.new("RGBA", al.size, col + (0,)); im.putalpha(al)
        im.save(J("assets", name), optimize=True)
    return al


def app_icon(al, size, path, sub=None):
    im = Image.new("RGB", (size, size), (14, 14, 16))
    d = ImageDraw.Draw(im)
    # 바깥 빨강 테두리 살짝
    lw = max(2, size // 60)
    d.rounded_rectangle([lw, lw, size - lw - 1, size - lw - 1], radius=size // 6, outline=(120, 10, 14), width=lw)
    w = int(size * 0.86); h = round(al.height * w / al.width)
    lg = Image.new("RGBA", (w, h), RED + (0,)); lg.putalpha(al.resize((w, h), Image.LANCZOS))
    y = (size - h) // 2 - (size // 12 if sub else 0)
    im.paste(lg, ((size - w) // 2, y), lg)
    if sub:
        f = font(max(10, size // 9))
        tw = d.textlength(sub, font=f)
        d.text(((size - tw) / 2, y + h + size // 30), sub, font=f, fill=(240, 240, 240))
    im.save(path, optimize=True)


def font(px, bold=True):
    for c in ["/usr/share/fonts/opentype/noto/NotoSansCJK-Bold.ttc", "/usr/share/fonts/opentype/noto/NotoSansCJK-Black.ttc",
              "/usr/share/fonts/truetype/noto/NotoSansCJK-Bold.ttc", "/usr/share/fonts/opentype/noto/NotoSerifCJK-Bold.ttc"]:
        if os.path.exists(c): return ImageFont.truetype(c, px)
    return ImageFont.load_default()


def recolor(path, old, new):
    """old 색(그 색 계열 픽셀)을 new 색으로 — 밝기 비율 유지"""
    im = Image.open(path).convert("RGBA"); a = np.asarray(im).astype(float)
    rgb = a[..., :3]; o = np.array(old, float); nw = np.array(new, float)
    bg = np.array([255, 255, 255], float)
    # old↔흰색 사이 섞인 정도(t)로 보고, 같은 t로 new↔흰색 섞기 (테두리 안티앨리어스 유지)
    d = o - bg; t = ((rgb - bg) @ d) / (d @ d)
    proj = bg + np.clip(t, 0, 1.4)[..., None] * d
    near = np.linalg.norm(rgb - proj, axis=2) < 38
    t = np.clip(t, 0, 1.4)
    out = rgb.copy()
    newc = bg + t[..., None] * (nw - bg)
    sel = near & (t > 0.08)
    out[sel] = np.clip(newc[sel], 0, 255)
    a[..., :3] = out
    Image.fromarray(a.astype(np.uint8), "RGBA").save(path, optimize=True)


def recolor_tile(path, old_tile, new_tile):
    im = Image.open(path).convert("RGBA"); a = np.asarray(im).astype(int)
    m = (np.abs(a[..., :3] - np.array(old_tile)).sum(axis=2) < 10)
    a[m, 0], a[m, 1], a[m, 2] = new_tile
    Image.fromarray(a.astype(np.uint8), "RGBA").save(path, optimize=True)


def og_images(al):
    for d in sorted(glob.glob(J("m", "*", ""))):
        try:
            out = subprocess.run(["node", "-e", "global.window={};require(%s);const M=window.MEMBER;process.stdout.write(JSON.stringify({n:M.name,s:M.sex}))" % json.dumps(os.path.join(d, "data.js"))],
                                 capture_output=True, text=True, check=True).stdout
        except Exception:
            continue
        info = json.loads(out); name, sex = info["n"], info["s"]
        group = "·" in name
        W, H = 1200, 630
        bg = (214, 32, 79) if sex == "F" else (16, 16, 18)
        im = Image.new("RGB", (W, H), bg); dr = ImageDraw.Draw(im)
        if sex != "F":   # 블랙 바탕에 붉은 빛 살짝
            glow = Image.new("L", (W, H), 0); gd = ImageDraw.Draw(glow)
            gd.ellipse([700, -300, 1500, 500], fill=70)
            glow = glow.filter(__import__("PIL.ImageFilter").ImageFilter.GaussianBlur(120))
            im = Image.composite(Image.new("RGB", (W, H), (120, 8, 14)), im, glow); dr = ImageDraw.Draw(im)
        w = 470; h = round(al.height * w / al.width)
        col = (255, 255, 255) if sex == "F" else RED
        lg = Image.new("RGBA", (w, h), col + (0,)); lg.putalpha(al.resize((w, h), Image.LANCZOS))
        im.paste(lg, (72, 56), lg)
        dr.text((80, 56 + h + 28), "JANG KAREDO PT노트 · " + ("함께하는 그룹 PT 노트" if group else "나만의 운동 노트"), font=font(36), fill=(255, 225, 228) if sex == "F" else (210, 200, 201))
        nm = name.replace(" · ", "·") + " 회원님"
        fs = 96 if len(nm) <= 9 else 76
        dr.text((80, 56 + h + 84), nm, font=font(fs), fill=(255, 255, 255))
        dr.rectangle([0, H - 86, W, H], fill=(10, 10, 11) if sex != "F" else (150, 18, 52))
        dr.rectangle([0, H - 86, W, H - 80], fill=RED if sex != "F" else (255, 255, 255))
        dr.text((80, H - 64), "JANG KAREDO PT노트 · 담당 장동욱 트레이너", font=font(30), fill=(235, 235, 235))
        im.save(os.path.join(d, "og.jpg"), quality=88)


def main():
    # 1) 글자·색
    for p in text_files():
        if not os.path.exists(p): continue
        s0 = s = open(p, encoding="utf-8").read()
        for a, b in TEXT: s = s.replace(a, b)
        s = hexmap(s)
        if s != s0: open(p, "w", encoding="utf-8").write(s)
    # site.js
    p = J("assets", "site.js"); s = open(p, encoding="utf-8").read()
    s = re.sub(r'brand: "[^"]*"', 'brand: "JANG KAREDO"', s); s = re.sub(r'branch: "[^"]*"', 'branch: "PT노트"', s)
    open(p, "w", encoding="utf-8").write(s)
    # 2) 로고·앱 아이콘
    al = logos()
    app_icon(al, 180, J("assets", "icon.png"), "PT NOTE")
    for sz in (180, 192, 512): app_icon(al, sz, J("assets", "icon-coach-%d.png" % sz), "COACH")
    # 3) PNG 아이콘 색
    for f in glob.glob(J("assets", "icons", "M", "*.png")):
        recolor(f, (31, 56, 100), (26, 26, 30)); recolor_tile(f, (230, 233, 238), (241, 236, 236))
    for f in glob.glob(J("assets", "icons", "F", "*.png")):
        recolor(f, (194, 24, 91), (214, 32, 79))
    for f in glob.glob(J("assets", "food", "M", "*.png")): recolor(f, (31, 56, 100), (26, 26, 30))
    for f in glob.glob(J("assets", "food", "F", "*.png")): recolor(f, (194, 24, 91), (214, 32, 79))
    for sx in ("M", "F"):
        for f in glob.glob(J("assets", "muscle", sx, "*.png")):
            if not f.endswith("base.png"): recolor(f, (219, 76, 140), (225, 20, 30))
    # 4) og.jpg
    og_images(al)
    print("done")


if __name__ == "__main__":
    main()
