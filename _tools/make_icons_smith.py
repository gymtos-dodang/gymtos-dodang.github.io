"""스미스 머신 아이콘 등 추가분 (2026-11-05, 최용민·고은성 그룹 PT): 스미스 벤치·로우·숄더, 스미스 슈러그, 밴드 푸쉬업
python3 make_icons_smith.py <폴더> "#1F3864" [이름,이름]  — make_icons.py와 같은 그림 규칙, 새 아이콘만 저장 (세 번째 칸에 이름을 주면 그것만)
2026-11-11 어시스트 친업(assisted_chin_up) · 2026-11-13 케이블 체스트 프레스(cable_chest_press) · 뉴텍 엠토처 시티드 로우(mtorture_row) · 핵프레스(hack_press) 추가 — 남 "#1A1A1E" / 여 "#D6204F"
"""
import sys, math
import make_icons as mi
from make_icons import Canvas, fk, side, draw_side, draw_front, floor, pill, dumbbell, FAR, GRAY, GRAYL, WHITE, LW, TH, SH, FT, UA, FA, NECKH, TORSO
from PIL import Image


def BODYC():
    return mi.BODY


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
    # 앞모습, 어깨를 귀 쪽으로 으쓱 (2026-11-05 다시 그림): 레일 2개 + 봉 + 원판, 팔은 쭉 편 채
    floor(c, 5, 6, 94)
    for x in (12, 88):
        c.stroke([(x, 5), (x, 99)], 3.0, GRAYL)
    head = (50, 85)
    Ls, Rs, Lh, Rh = (40.5, 74.5), (59.5, 74.5), (44, 47), (56, 47)
    arms = [((37.4, 59.5), (36.6, 45.2)), ((62.6, 59.5), (63.4, 45.2))]
    legs = [((43.5, 27.5), (43, 9.5), (37.8, 9)), ((56.5, 27.5), (57, 9.5), (62.2, 9))]
    c.stroke([(12, 44), (88, 44)], 3.0, GRAY)
    for x in (21, 79):
        c.rrect(x - 3.2, 33, x + 3.2, 55, 1.6, fill=GRAY)
    draw_front(c, head, Ls, Rs, Lh, Rh, arms, legs)
    c.arrow((28.5, 66), (28.5, 82))
    c.arrow((71.5, 66), (71.5, 82))


def incline_db_curl(c):
    # 인클라인 벤치에 등 기대고 앉아, 팔을 바닥 쪽으로 쭉 늘어뜨린 데서 감아 올리기 (2026-11-05)
    c.ox, c.oy = -2, 10
    p = side((54, 30), 132, 125, leg=(0, -90, 0))
    S = p["S"]
    floor(c, 6, 8, 88)
    hb, sb = fk(p["H"], 222, 6.6), fk(S, 222, 6.6)
    pill(c, fk(hb, 132, -3), fk(sb, 132, 6), 5.2)
    pill(c, (45, 23.4), (65, 23.4), 5.2)
    c.stroke([(54, 23), (54, 6)], 3, GRAY)
    E = fk(S, -90, UA)
    W = fk(E, -90, FA)
    p["arm"] = [E, W]
    draw_side(c, p)
    dumbbell(c, (W[0], W[1] - 0.8), 0, 12)
    c.arc_arrow(E, 19, -100, -8)


def band_push_up(c):
    # 스쿼트 랙 안전바에 밴드를 걸고, 밴드 끝을 양손에 쥔 채 바닥 푸쉬업 (2026-11-05 다시 그림 — 등에 거는 게 아님)
    c.oy = 6
    fy = 8.4
    W = (66, fy + 1.4)
    E = (66, W[1] + FA)
    S = (66, E[1] + UA)
    A = (12, fy + 4.6)
    ux, uy = A[0] - S[0], A[1] - S[1]
    L = math.hypot(ux, uy); ux, uy = ux / L, uy / L
    H = (S[0] + TORSO * ux, S[1] + TORSO * uy)
    K = (H[0] + TH * ux, H[1] + TH * uy)
    T = (16.5, fy + 0.2)
    floor(c, fy - 1.4, 4, 96)
    # 랙 기둥 + 낮게 건 안전바 (머리 앞쪽)
    c.stroke([(95, fy - 1.4), (95, 92)], 3.0, GRAYL)
    c.stroke([(84, fy - 1.4), (84, 92)], 3.0, GRAYL)
    bar = (89, fy + 17)
    c.stroke([(80, bar[1]), (98, bar[1])], 3.4, GRAY)
    # 밴드: 안전바에 감아서 두 가닥이 손으로
    c.stroke([(W[0] + 1.5, W[1] + 1), (bar[0] - 2.4, bar[1] - 1.6)], 2.4, mi.ARROW)
    c.stroke([(W[0] + 2.5, W[1] - 0.5), (bar[0] + 0.6, bar[1] - 2.4)], 2.4, mi.ARROW)
    c.circle(bar, 2.6, outline=mi.ARROW, w=1.8)
    p = {"H": H, "S": S, "head": fk(S, 17, NECKH), "arm": [E, W], "leg": [K, A, T]}
    draw_side(c, p)
    c.circle(W, 2.6, fill=mi.BODY)
    c.arrow((38, 42), (38, 57))


def assisted_chin_up(c):
    # 어시스트 친업 (2026-11-11 최지훈님): 앞모습 — 무릎 받침에 무릎 꿇고, 머리 위 손잡이를 잡고 몸을 끌어올림
    floor(c, 5, 6, 94)
    for x in (12, 88):
        c.stroke([(x, 5), (x, 96)], 3.0, GRAYL)
    c.stroke([(12, 94), (88, 94)], 3.0, GRAYL)
    for x0, x1 in ((12, 27), (88, 73)):
        c.stroke([(x0, 86), (x1, 86)], 3.0, GRAY)
    c.stroke([(50, 5), (50, 14)], 3.0, GRAY)
    pill(c, (33, 15.5), (67, 15.5), 4.6)
    head, Ls, Rs, Lh, Rh = (50, 74), (40.5, 62), (59.5, 62), (44, 38), (56, 38)
    arms = [((28, 71), (29, 85)), ((72, 71), (71, 85))]
    legs = [((42, 20.5), (41.5, 14), (37, 13.5)), ((58, 20.5), (58.5, 14), (63, 13.5))]
    draw_front(c, head, Ls, Rs, Lh, Rh, arms, legs)
    for x in (29, 71):
        c.rrect(x - 2.2, 81, x + 2.2, 91, 1.4, fill=GRAY)
    c.arrow((21, 40), (21, 56))
    c.arrow((79, 40), (79, 56))


def cable_chest_press(c):
    """2026-11-13 케이블 체스트 프레스: 케이블 기둥을 등지고 한 발 앞으로 서서, 가슴 높이로 앞으로 밀기"""
    p = side((42, 46), 96, 92, arm=(-4, 0), leg=(-74, -94, 0), far_leg=(-112, -100, 0))
    W = p["arm"][1]
    floor(c, 3.2, 6, 92)
    c.stroke([(12, 3.2), (12, 94)], 3.2, GRAY)
    c.stroke([(8, 3.2), (20, 3.2)], 3.4, GRAY)
    mi.pulley(c, (14.5, W[1]))
    c.stroke([(17.5, W[1]), (W[0], W[1])], 1.6, GRAY)
    draw_side(c, p)
    pill(c, (W[0] + 0.6, W[1] - 5.2), (W[0] + 0.6, W[1] + 5.2), 3.4)
    c.arrow((W[0] + 6, W[1] - 9), (W[0] + 20, W[1] - 9))


def mtorture_row(c):
    """2026-11-13 뉴텍 엠토처 시티드 로우: 가슴 패드 없이 앉아 발판에 발, 앞 바닥 축 지렛대 손잡이를 옆구리로 당김"""
    p = side((32, 36), 92, 92, arm=(-118, 8), leg=(18, -38, 62))
    W = p["arm"][1]
    floor(c, 4, 8, 94)
    c.stroke([(32, 31), (32, 4)], 3, GRAY)
    pill(c, (21, 30.5), (44, 30.5), 5.2)
    c.stroke([(67, 20), (75, 37)], 4.4, GRAY)
    c.stroke([(68, 21), (66, 4)], 2.8, GRAY)
    pv = (88, 8)
    c.stroke([pv, W], 3, GRAY)
    pc = (pv[0] + (W[0] - pv[0]) * 0.17, pv[1] + (W[1] - pv[1]) * 0.17)
    c.circle(pc, 6.4, fill=GRAY)
    c.circle(pc, 2.2, fill=WHITE)
    mi.pulley(c, pv, 3.0)
    draw_side(c, p)
    pill(c, (W[0] + 0.4, W[1] - 4.8), (W[0] + 0.4, W[1] + 4.8), 3.4)
    c.arrow((W[0] + 30, W[1] + 14), (W[0] + 14, W[1] + 14))


def hack_press(c):
    """2026-11-13 핵프레스: 원판식, 등받이 의자에 앉아 앞쪽 기울어진 발판을 밀면 의자가 레일 따라 뒤로 밀려남"""
    p = side((32, 32), 118, 112, arm=(-62, -10), leg=(38, -40, 70))
    K, A, T = p["leg"]
    floor(c, 4, 6, 94)
    c.stroke([(8, 13), (62, 13)], 3, GRAY)
    hb, sb = fk(p["H"], 208, 6.2), fk(p["S"], 208, 6.2)
    pill(c, hb, sb, 5.2)
    pill(c, (p["H"][0] - 9, p["H"][1] - 6.5), (p["H"][0] + 9, p["H"][1] - 6.5), 5)
    c.stroke([(p["H"][0], p["H"][1] - 7), (p["H"][0] + 2, 13)], 3, GRAY)
    pc = (p["H"][0] - 11, p["H"][1] - 9)
    c.circle(pc, 7.2, fill=GRAY)
    c.circle(pc, 2.4, fill=WHITE)
    mid = ((A[0] + T[0]) / 2, (A[1] + T[1]) / 2)
    pl = fk(mid, -20, 4.4)
    pill(c, fk(pl, 70, 13), fk(pl, -110, 9), 4.6)
    c.stroke([fk(pl, -110, 7), (pl[0] + 2, 4)], 3, GRAY)
    draw_side(c, p)
    c.arrow(fk(p["H"], 200, 14), fk(fk(p["H"], 200, 14), 200, 14))


NEW = {"smith_bench_press": smith_bench_press, "smith_row": smith_row, "smith_shoulder_press": smith_shoulder_press,
       "smith_shrug": smith_shrug, "band_push_up": band_push_up,
       "incline_db_curl": incline_db_curl, "assisted_chin_up": assisted_chin_up, "cable_chest_press": cable_chest_press, "mtorture_row": mtorture_row, "hack_press": hack_press}


if __name__ == "__main__":
    out = sys.argv[1]
    only = sys.argv[3].split(",") if len(sys.argv) > 3 else None   # 예: ... "#1A1A1E" assisted_chin_up  (그 아이콘만 다시 그림)
    for name, fn in NEW.items():
        if only and name not in only:
            continue
        c = Canvas()
        fn(c)
        path = f"{out}/{name}.png"
        c.save(path, tile=mi.TILE)
        Image.open(path).resize((192, 192), Image.LANCZOS).save(path, optimize=True)
