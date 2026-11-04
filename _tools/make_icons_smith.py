"""스미스 머신 아이콘 등 추가분 (2026-11-05, 최용민·고은성 그룹 PT): 스미스 벤치·로우·숄더, 스미스 슈러그, 밴드 푸쉬업
python3 make_icons_smith.py <폴더> "#1F3864"   — make_icons.py와 같은 그림 규칙, 새 아이콘만 저장"""
import sys, math
import make_icons as mi
from make_icons import Canvas, fk, side, draw_side, draw_front, floor, pill, GRAY, GRAYL, WHITE, LW, TH, SH, FT, UA, FA, NECKH, TORSO
from PIL import Image


def _bar(c, W):
    c.circle((W[0], W[1] + 1), 6.6, fill=GRAY)
    c.circle((W[0], W[1] + 1), 2.0, fill=WHITE)
    c.stroke([fk(W, 270, 1), fk(W, 90, 2)], LW, mi.BODY)


def smith_bench_press(c):
    S, H = (34, 39), (59, 39)
    K = fk(H, 10, TH)
    A = fk(K, -85, SH)
    floor(c, 21.5, 4, 96)
    c.rrect(10, 31, 66, 35.6, 2.2, fill=GRAY)
    c.stroke([(16, 31), (16, 21.5)], 2.6, GRAY)
    c.stroke([(60, 31), (60, 21.5)], 2.6, GRAY)
    E = fk(S, 92, UA)
    W = fk(E, 90, FA)
    c.stroke([(W[0] - 8, 21.5), (W[0] - 8, 96)], 2.6, GRAYL)
    p = {"H": H, "S": S, "head": fk(S, 180, NECKH), "arm": [E, W], "leg": [K, A, fk(A, 0, FT)]}
    draw_side(c, p)
    _bar(c, W)
    c.arrow((50, 58), (50, 74))


def smith_row(c):
    H = (58, 45)
    K = fk(H, -110, TH)
    A = fk(K, -78, SH)
    S = fk(H, 158, TORSO)
    E = fk(S, -95, UA)
    W = fk(E, -88, FA)
    floor(c, A[1] - 2.6, 8, 92)
    c.stroke([(W[0] + 9, A[1] - 2.6), (W[0] + 9, 96)], 2.6, GRAYL)
    p = {"H": H, "S": S, "head": fk(S, 165, NECKH), "arm": [E, W], "leg": [K, A, fk(A, 180, FT)]}
    draw_side(c, p)
    _bar(c, (W[0], W[1] - 1))
    c.arrow((W[0] - 12, W[1] + 2), (W[0] - 12, W[1] + 17))


def smith_shoulder_press(c):
    c.oy = -4
    H = (56, 30)
    S = fk(H, 90, TORSO)
    floor(c, 6, 14, 86)
    pill(c, (50, 25.4), (68, 25.4), 5.2)
    pill(c, (66, 28), (66, 64), 5.2)
    c.stroke([(60, 25), (60, 6)], 3, GRAY)
    K = fk(H, 180, TH)
    A = fk(K, -90, SH - 1)
    E = fk(S, 128, UA)
    W = fk(E, 78, FA)
    c.stroke([(W[0] - 9, 6), (W[0] - 9, 104)], 2.6, GRAYL)
    p = {"H": H, "S": S, "head": fk(S, 92, NECKH), "arm": [E, W], "leg": [K, A, fk(A, 180, FT)]}
    draw_side(c, p)
    _bar(c, W)
    c.arrow((W[0] - 18, W[1] - 16), (W[0] - 18, W[1] - 1))


def smith_shrug(c):
    head, Ls, Rs, Lh, Rh = (50, 84), (40.5, 72), (59.5, 72), (44, 46), (56, 46)
    floor(c, 5, 8, 92)
    c.stroke([(12, 5), (12, 98)], 2.6, GRAYL)
    c.stroke([(88, 5), (88, 98)], 2.6, GRAYL)
    arms = [((36.5, 57.5), (35.5, 44)), ((63.5, 57.5), (64.5, 44))]
    legs = [((43.5, 27.5), (43, 9.5), (37.8, 9)), ((56.5, 27.5), (57, 9.5), (62.2, 9))]
    c.stroke([(12, 42.5), (88, 42.5)], 3.2, GRAY)
    for x in (19, 81):
        c.rrect(x - 2.6, 33.5, x + 2.6, 51.5, 1.4, fill=GRAY)
    draw_front(c, head, Ls, Rs, Lh, Rh, arms, legs)
    c.arrow((24, 64), (24, 78))
    c.arrow((76, 64), (76, 78))


def band_push_up(c):
    c.oy = 18
    fy = 8.4
    W = (74, fy + 1.4)
    E = (74, W[1] + FA)
    S = (74, E[1] + UA)
    A = (14, fy + 4.6)
    ux, uy = A[0] - S[0], A[1] - S[1]
    L = math.hypot(ux, uy); ux, uy = ux / L, uy / L
    H = (S[0] + TORSO * ux, S[1] + TORSO * uy)
    K = (H[0] + TH * ux, H[1] + TH * uy)
    T = (18.5, fy + 0.2)
    pill(c, (6, fy - 1.4), (96, fy - 1.4), 3.0, GRAYL)
    p = {"H": H, "S": S, "head": fk(S, 17, NECKH), "arm": [E, W], "leg": [K, A, T]}
    band = [W, (79.5, 18), (79.5, 33), (74, S[1] + 6.2), (66, S[1] + 4.6), (59, S[1] + 1.6)]
    c.stroke(band, 2.2, mi.ARROW)
    draw_side(c, p)
    c.arrow((44, 37), (44, 52))


NEW = {"smith_bench_press": smith_bench_press, "smith_row": smith_row, "smith_shoulder_press": smith_shoulder_press,
       "smith_shrug": smith_shrug, "band_push_up": band_push_up}


if __name__ == "__main__":
    out = sys.argv[1]
    for name, fn in NEW.items():
        c = Canvas()
        fn(c)
        path = f"{out}/{name}.png"
        c.save(path, tile=mi.TILE)
        Image.open(path).resize((192, 192), Image.LANCZOS).save(path, optimize=True)
