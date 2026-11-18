#!/usr/bin/env python3
"""근육 지도 다크모드용 바탕 그림 (2026-11-18 장동욱 "근육지도도 다크모드 켰을 때 배경이 하얀색 — 다크에 맞춰줘")
assets/muscle/M|F/base.png → base-dark.png
- 그림 바깥 흰 바탕(가장자리와 이어진 흰색)은 투명으로
- 몸 안쪽은 색을 뒤집어서 몸통 = 짙은 회색, 선 = 밝은 회색 (부위 색칠 그림 <부위>.png는 그대로 위에 얹힘)
make_musclemap.py로 base.png를 다시 만들면 이것도 다시 돌릴 것:  python3 _tools/make_musclemap_dark.py
"""
import os
from PIL import Image, ImageDraw
ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
BODY = {"M": (40, 40, 46), "F": (48, 32, 39)}   # 몸통 색 (다크 카드 #17171B·#1F1418보다 살짝 밝게)
for sx in ("M", "F"):
    src = os.path.join(ROOT, "assets/muscle", sx, "base.png")
    im = Image.open(src).convert("RGBA"); W, H = im.size
    # 1) 가장자리에서 이어진 흰 바탕을 표시
    mask = im.convert("L").point(lambda v: 255 if v >= 250 else 0)
    flood = mask.copy()
    for xy in [(0, 0), (W - 1, 0), (0, H - 1), (W - 1, H - 1), (W // 2, 0), (W // 2, H - 1), (0, H // 2), (W - 1, H // 2)]:
        if flood.getpixel(xy) == 255: ImageDraw.floodfill(flood, xy, 128)
    px = im.load(); fl = flood.load(); br, bg, bb = BODY[sx]
    for y in range(H):
        for x in range(W):
            r, g, b, a = px[x, y]
            if fl[x, y] == 128: px[x, y] = (0, 0, 0, 0); continue
            k = (255 - (r + g + b) / 3) / 255   # 0 = 흰 몸통, 1 = 검은 선
            px[x, y] = (int(br + (225 - br) * k * 1.4 if k * 1.4 < 1 else 225), int(bg + (225 - bg) * min(1, k * 1.4)), int(bb + (225 - bb) * min(1, k * 1.4)), a)
    im.save(os.path.join(ROOT, "assets/muscle", sx, "base-dark.png"), optimize=True)
    print(sx, "ok")
