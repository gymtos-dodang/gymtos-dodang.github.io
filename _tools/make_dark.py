#!/usr/bin/env python3
"""다크모드 CSS 만들기 (2026-11-18 장동욱 "PT노트 다크모드(자동) + 설정에서 켜고 끄기")
- _tools/dark_src.css(손으로 쓴 다크 규칙, 앞머리 자리는 `D`)  +  style.css에서 흰/연한 바탕을 찾아 자동으로 만든 규칙
- 두 번 써서 style.css 맨 아래 /* DARK-BEGIN */ ~ /* DARK-END */ 사이를 갈아 끼움:
    1) @media (prefers-color-scheme: dark) { html:not([data-theme="light"]) … }   ← 자동(폰 설정)
    2) html[data-theme="dark"] …                                                ← 설정에서 '켜기'
- style.css를 고친 뒤엔 다시 돌릴 것:  python3 _tools/make_dark.py
"""
import re, os
ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
CSS = os.path.join(ROOT, "assets/style.css"); SRC = os.path.join(ROOT, "_tools/dark_src.css")
B, E = "/* DARK-BEGIN (make_dark.py가 만듦 — 직접 고치지 말 것) */", "/* DARK-END */"
s = open(CSS, encoding="utf-8").read()
if B in s: s = s[:s.index(B)].rstrip() + "\n"
base = s

def hexrgb(h):
    h = h.lstrip("#")
    if len(h) == 3: h = "".join(c * 2 for c in h)
    return tuple(int(h[i:i + 2], 16) for i in (0, 2, 4))
def lum(rgb): return sum(rgb) / 3

# 주석·@keyframes 빼고 규칙 하나씩
def rules(text, media=None):
    i = 0; out = []
    while i < len(text):
        j = text.find("{", i)
        if j < 0: break
        sel = text[i:j].strip(); depth = 1; k = j + 1
        while depth and k < len(text):
            if text[k] == "{": depth += 1
            elif text[k] == "}": depth -= 1
            k += 1
        body = text[j + 1:k - 1]
        if sel.startswith("@media"):
            if "prefers-reduced" not in sel and "print" not in sel and "transparency" not in sel:
                out += rules(body, sel)
        elif sel.startswith("@"): pass
        else: out.append((media, sel, body))
        i = k
    return out

SKIP = re.compile(r"(\.thero|\.th-go|\.hero-|::-webkit|\.bgx|\.bg-|\.bxp|badge|\.exi|\.icn|\.petfx|\.rp-home|:root|^html$|^body$|\.toggle|knob|\.sw\b|\.on\b.*::|seal|\.dot|\.tapwave|\.pump-fab|\.pump-face)", re.I)
def gen(css_text):
    """CSS 글에서 흰·연한 바탕 규칙을 찾아 다크용 자동 규칙을 만듦"""
    t = re.sub(r"/\*.*?\*/", "", css_text, flags=re.S)
    ALL = rules(t)
    # 같은 선택자에 나중 규칙이 바탕·글자색을 다시 정하면(예: .bar → var(--barbg)) 앞 규칙은 무시
    LAST = {}
    for idx, (media, sel, body) in enumerate(ALL):
        for prop in ("background", "color"):
            if re.search(r"(^|;|\s)%s(-color)?\s*:" % prop, body): LAST[(media, sel, prop)] = idx
    auto = []
    for idx, (media, sel, body) in enumerate(ALL):
        if SKIP.search(sel): continue
        decl = {}
        for m in re.finditer(r"(background(?:-color)?|color|border(?:-[a-z]+)?)\s*:\s*([^;]+)", body):
            decl.setdefault(m.group(1), m.group(2).strip())
        add = []
        bg = decl.get("background-color") or decl.get("background") or ""
        if LAST.get((media, sel, "background"), idx) != idx: bg = ""
        if LAST.get((media, sel, "color"), idx) != idx: decl.pop("color", None)
        hm = re.fullmatch(r"(#[0-9A-Fa-f]{3,6})(\s*!important)?", bg)
        wm = re.fullmatch(r"rgba?\(\s*255\s*,\s*255\s*,\s*255\s*(?:,\s*([\d.]+))?\s*\)", bg)
        light = False
        if hm:
            rgb = hexrgb(hm.group(1)); L = lum(rgb)
            if L > 236 and max(rgb) - min(rgb) < 12: add.append("background: var(--paper)"); light = True
            elif L > 214 and max(rgb) - min(rgb) < 14: add.append("background: var(--card2)"); light = True
            elif L > 205: add.append("background: color-mix(in srgb, %s 14%%, var(--paper))" % hm.group(1)); light = True
        elif bg == "white": add.append("background: var(--paper)"); light = True
        elif re.fullmatch(r"var\(--primary(,\s*#[0-9A-Fa-f]+)?\)(\s*!important)?", bg): add.append("background: var(--seal)")   # 다크에선 --primary가 밝은 글자색이라 바탕은 레드로
        elif wm and float(wm.group(1) or 1) >= .5: add.append("background: var(--paper)"); light = True
        elif bg.startswith("color-mix(") and re.search(r",\s*(#fff|#FFF|#ffffff|#FFFFFF|white)\s*\)$", bg):   # 레드를 살짝 섞은 흰 바탕 → 어두운 바탕에 섞기
            add.append("background: " + re.sub(r"(#fff|#FFF|#ffffff|#FFFFFF|white)\s*\)$", "var(--paper))", bg)); light = True
        elif "gradient(" in bg and "url(" not in bg:   # 연한 색끼리 그라데이션 → 같은 그라데이션을 어두운 색으로 (background-size·움직임은 그대로)
            hexes = re.findall(r"#[0-9A-Fa-f]{6}\b|#[0-9A-Fa-f]{3}\b", bg)
            rgbas = re.findall(r"rgba?\(([^)]*)\)", bg)
            okr = all((lambda v: len(v) >= 3 and sum(float(x) for x in v[:3]) / 3 > 200)(r.replace(" ", "").split(",")) for r in rgbas)
            if hexes and okr and all(lum(hexrgb(h)) > 200 for h in hexes) and not re.search(r"(padding|border|content)-box", bg):
                def dk(m):
                    h = m.group(0); rgb = hexrgb(h)
                    return "var(--paper)" if lum(rgb) > 236 and max(rgb) - min(rgb) < 12 else "color-mix(in srgb, %s 16%%, var(--paper))" % h
                v = re.sub(r"#[0-9A-Fa-f]{6}\b|#[0-9A-Fa-f]{3}\b", dk, bg)
                v = re.sub(r"rgba?\(\s*255\s*,\s*255\s*,\s*255\s*(,\s*[\d.]+)?\s*\)", "var(--paper)", v)
                add.append("background-image: " + re.sub(r"\s*!important", "", v)); light = True
        col = decl.get("color", "")
        cm = re.fullmatch(r"#[0-9A-Fa-f]{3,6}", col)
        if cm and lum(hexrgb(col)) < 70: add.append("color: var(--ink)")
        elif cm and 70 <= lum(hexrgb(col)) < 150 and max(hexrgb(col)) - min(hexrgb(col)) < 30: add.append("color: var(--sub)")
        for bk in ("border", "border-top", "border-bottom", "border-color"):
            bv = decl.get(bk, "")
            bm = re.search(r"#[0-9A-Fa-f]{6}|#[0-9A-Fa-f]{3}\b", bv)
            if bm and lum(hexrgb(bm.group(0))) > 200 and max(hexrgb(bm.group(0))) - min(hexrgb(bm.group(0))) < 30:
                add.append("%s-color: var(--line)" % ("border" if bk == "border-color" else bk))
        if add: auto.append((media, sel, add))
    return auto

AUTO = auto = gen(base)

def pre(sel, P):
    parts = [p.strip() for p in sel.split(",")]
    o = []
    for p in parts:
        p2 = re.sub(r"^(html|:root)(\[[^\]]+\])*", lambda m: P + m.group(0)[len(m.group(1)):], p) if re.match(r"^(html|:root)", p) else P + " " + p
        o.append(p2)
    return ", ".join(o)

def wpre(sel, P):   # 자동 규칙은 앞머리에 점수를 안 줌(:where) — .jb.cur 같은 더 자세한 원래 규칙을 이기지 않게
    inner = P[len("html"):]   # :not([data-theme="light"]) 또는 [data-theme="dark"]
    o = []
    for p in [x.strip() for x in sel.split(",")]:
        if re.match(r"^(html|:root)", p): o.append(re.sub(r"^(html|:root)", "html:where(%s)" % inner, p, count=1))
        else: o.append(":where(html%s) %s" % (inner, p))
    return ", ".join(o)

def block(P, auto=None, with_src=True):
    auto = AUTO if auto is None else auto
    out = []
    for media, sel, add in auto:
        r = "%s { %s; }" % (wpre(sel, P), "; ".join(add))
        out.append(("%s { %s }" % (media, r)) if media else r)
    if not with_src: return "\n".join(out)
    src = open(SRC, encoding="utf-8").read()
    src = re.sub(r"(?<![\w-])D(?=[\s\[.:,{#])", P, src)
    return "\n".join(out) + "\n/* 손으로 쓴 다크 규칙 (_tools/dark_src.css) */\n" + src

A = 'html:not([data-theme="light"])'; F = 'html[data-theme="dark"]'
blk = B + "\n@media (prefers-color-scheme: dark) {\n" + block(A) + "\n}\n" + block(F) + "\n" + E + "\n"
open(CSS, "w", encoding="utf-8").write(base + "\n" + blk)
print("auto rules:", len(auto))

# 선생님 페이지(PT통합노트)도 다크 (2026-11-19 "피티 통합노트 다크모드 수정") — 색 변수·손 규칙은 style.css 것을 같이 쓰고,
# 그 페이지 안 <style>의 흰·연한 칸만 자동 규칙으로 만들어 </style> 바로 앞 COACH-DARK 칸에 끼움. 손 규칙은 dark_coach.css(앞머리 D)
COACH = os.path.join(ROOT, "coach-tqqnlh/index.html"); CSRC = os.path.join(ROOT, "_tools/dark_coach.css")
CB, CE = "/* COACH-DARK-BEGIN (make_dark.py가 만듦 — 직접 고치지 말 것) */", "/* COACH-DARK-END */"
h = open(COACH, encoding="utf-8").read()
i0 = h.index("<style>") + 7; i1 = h.index("</style>", i0); css = h[i0:i1]
if CB in css: css = css[:css.index(CB)].rstrip() + "\n"
ca = gen(css)
def cblock(P):
    src = open(CSRC, encoding="utf-8").read() if os.path.exists(CSRC) else ""
    return block(P, ca, False) + "\n" + re.sub(r"(?<![\w-])D(?=[\s\[.:,{#])", P, src)
cblk = CB + "\n@media (prefers-color-scheme: dark) {\n" + cblock(A) + "\n}\n" + cblock(F) + "\n" + CE + "\n"
open(COACH, "w", encoding="utf-8").write(h[:i0] + css + cblk + h[i1:])
print("coach auto rules:", len(ca))
