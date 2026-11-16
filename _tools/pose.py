#!/usr/bin/env python3
"""관절 인식 (2026-11-16 장동욱 "기구 사진첩 + 관절 인식 세팅하자")

영상에서 사람 관절 17개(YOLO11n-pose, onnxruntime — torch 필요 없음)를 찾아
 1) 가장 많이 움직인 관절 각도로 반복 횟수·구간을 나누고
 2) 복습지용 T1(시작 자세)·T2(힘주는 구간 시작)·T3(돌아오는 구간 시작)을 자동으로 고름
 3) 뼈대를 그린 확인 시트 한 장(pose_sheet.jpg)과 결과 JSON을 냄

사용: python3 _tools/pose.py in.mov [--out 폴더] [--flip] [--fps 10]
  --flip  거꾸로 찍힌 영상(hflip,vflip)
  --start big|small  시작 자세가 관절이 펴진 쪽(big)/굽힌 쪽(small) — 기본은 오래 머무는 쪽으로 자동
  --joint 팔꿈치|어깨|골반|무릎|손목앞뒤|손목높이  기준(손목은 어깨에서 손까지 거리, 몸통=100) — 기본은 가장 크게 움직인 관절
  아이폰 HDR(arib-std-b67)은 자동으로 톤매핑.
결과(--out/pose.json): {"T1","T2","T3","reps","joint","rom","tempo":{"up","down"},"peaks":[...]}
  → pt-form-add 2단계의 T1·T2·T3에 그대로 씀. 시트를 한 번 보고 이상하면 손으로 고침.
모델은 처음 한 번 GitHub(ultralytics assets)에서 /tmp/pose_model/에 받음(12MB).
"""
import argparse, json, os, subprocess, sys, urllib.request
import numpy as np

MODEL_URL = "https://github.com/ultralytics/assets/releases/download/v8.3.0/yolo11n-pose.onnx"
MODEL = "/tmp/pose_model/yolo11n-pose.onnx"
HDR = "zscale=t=linear:npl=203,format=gbrpf32le,zscale=p=bt709,tonemap=tonemap=hable:desat=0,zscale=t=bt709:m=bt709:r=tv,format=yuv420p,"
# COCO 17: 0코 5,6어깨 7,8팔꿈치 9,10손목 11,12골반 13,14무릎 15,16발목
EDGES = [(5, 6), (5, 7), (7, 9), (6, 8), (8, 10), (5, 11), (6, 12), (11, 12), (11, 13), (13, 15), (12, 14), (14, 16), (0, 5), (0, 6)]
ANGLES = {  # 이름: (a, 꼭짓점, c) — 왼/오른 평균
    "팔꿈치": [(5, 7, 9), (6, 8, 10)],
    "어깨": [(11, 5, 7), (12, 6, 8)],
    "골반": [(5, 11, 13), (6, 12, 14)],
    "무릎": [(11, 13, 15), (12, 14, 16)],
}


def model():
    if not os.path.exists(MODEL):
        os.makedirs(os.path.dirname(MODEL), exist_ok=True)
        r = subprocess.run(["curl", "-sSLf", "-o", MODEL, MODEL_URL])
        if r.returncode:
            urllib.request.urlretrieve(MODEL_URL, MODEL)
    import onnxruntime as ort
    return ort.InferenceSession(MODEL, providers=["CPUExecutionProvider"])


def probe(path):
    out = subprocess.run(["ffprobe", "-v", "0", "-select_streams", "v:0", "-show_entries",
                          "stream=width,height,color_transfer:stream_side_data=rotation:format=duration",
                          "-of", "json", path], capture_output=True, text=True).stdout
    j = json.loads(out)
    st = j["streams"][0]
    return float(j["format"]["duration"]), "arib" in (st.get("color_transfer") or "")


def frames(path, fps, flip, hdr, W=480):
    vf = (HDR if hdr else "") + ("hflip,vflip," if flip else "") + f"fps={fps},scale={W}:-2"
    # 높이를 알려고 한 장 먼저
    p = subprocess.run(["ffmpeg", "-v", "0", "-i", path, "-vf", vf, "-frames:v", "1", "-f", "image2pipe", "-vcodec", "png", "-"],
                       capture_output=True)
    from PIL import Image
    import io
    h = Image.open(io.BytesIO(p.stdout)).height
    p = subprocess.run(["ffmpeg", "-v", "0", "-i", path, "-vf", vf, "-f", "rawvideo", "-pix_fmt", "rgb24", "-"], capture_output=True)
    a = np.frombuffer(p.stdout, np.uint8)
    n = a.size // (W * h * 3)
    return a[: n * W * h * 3].reshape(n, h, W, 3)


def detect(sess, img, prev=None):
    h, w = img.shape[:2]
    s = 640 / max(h, w)
    nh, nw = int(h * s), int(w * s)
    from PIL import Image
    r = np.asarray(Image.fromarray(img).resize((nw, nh)))
    canvas = np.full((640, 640, 3), 114, np.uint8)
    canvas[:nh, :nw] = r
    x = canvas.transpose(2, 0, 1)[None].astype(np.float32) / 255
    o = sess.run(None, {"images": x})[0][0].T  # 8400 x 56
    o = o[o[:, 4] > 0.35]
    if not len(o):
        return None
    # 사람 고르기: 이전 프레임과 가까운 사람 > 크고 가운데 있는 사람
    area = o[:, 2] * o[:, 3]
    cen = 1 - np.abs(o[:, 0] / s / w - 0.5)
    score = o[:, 4] * area * (0.5 + cen)
    if prev is not None:
        d = np.hypot(o[:, 0] / s - prev[0], o[:, 1] / s - prev[1]) / max(h, w)
        score = score * np.exp(-d * 6)
    b = o[np.argmax(score)]
    kp = b[5:].reshape(17, 3).copy()
    kp[:, :2] /= s
    return {"box": (b[:4] / s).tolist(), "kp": kp}


def angle(kp, a, b, c):
    if min(kp[a, 2], kp[b, 2], kp[c, 2]) < 0.4:
        return np.nan
    v1, v2 = kp[a, :2] - kp[b, :2], kp[c, :2] - kp[b, :2]
    cos = np.dot(v1, v2) / (np.linalg.norm(v1) * np.linalg.norm(v2) + 1e-6)
    return float(np.degrees(np.arccos(np.clip(cos, -1, 1))))


def smooth(y, k=5):
    y = np.array(y, float)
    idx = np.arange(len(y))
    ok = ~np.isnan(y)
    if ok.sum() < 3:
        return y
    y = np.interp(idx, idx[ok], y[ok])
    k = max(1, min(k, len(y) // 3))
    return np.convolve(np.pad(y, k, mode="edge"), np.ones(2 * k + 1) / (2 * k + 1), "valid")


def extremes(y, thr):
    """번갈아 나오는 최고·최저점(이력 thr도)."""
    ex = []
    lo_i = hi_i = 0
    mode = None
    for i in range(1, len(y)):
        if y[i] > y[hi_i]: hi_i = i
        if y[i] < y[lo_i]: lo_i = i
        if mode != "up" and y[i] - y[lo_i] > thr:
            if mode is not None or True: ex.append(("lo", lo_i))
            mode, hi_i = "up", i
        elif mode != "down" and y[hi_i] - y[i] > thr:
            ex.append(("hi", hi_i))
            mode, lo_i = "down", i
    ex.append(("hi" if mode == "up" else "lo", hi_i if mode == "up" else lo_i))
    # 같은 종류 연속 제거
    out = []
    for e in ex:
        if out and out[-1][0] == e[0]:
            continue
        out.append(e)
    return out


def main():
    ap = argparse.ArgumentParser()
    ap.add_argument("video")
    ap.add_argument("--out", default=".")
    ap.add_argument("--flip", action="store_true")
    ap.add_argument("--fps", type=float, default=10)
    ap.add_argument("--start", choices=["big", "small"], help="시작 자세의 관절 각도가 큰 쪽(펴짐)/작은 쪽(굽힘)")
    ap.add_argument("--joint", choices=list(ANGLES) + ["손목앞뒤", "손목높이"], help="기준 관절 직접 지정")
    a = ap.parse_args()
    os.makedirs(a.out, exist_ok=True)
    dur, hdr = probe(a.video)
    F = frames(a.video, a.fps, a.flip, hdr)
    sess = model()
    dets, prev = [], None
    for f in F:
        d = detect(sess, f, prev)
        dets.append(d)
        if d: prev = d["box"][:2]
    t = np.arange(len(F)) / a.fps

    series = {}
    for name, trip in ANGLES.items():
        vals = []
        for d in dets:
            if not d: vals.append(np.nan); continue
            v = [angle(d["kp"], *tr) for tr in trip]
            v = [x for x in v if not np.isnan(x)]
            vals.append(np.mean(v) if v else np.nan)
        vals = np.array(vals)
        if np.mean(~np.isnan(vals)) < 0.5:
            continue
        series[name] = smooth(vals, k=max(1, int(a.fps * 0.25)))
    if not series:
        sys.exit("사람 관절을 못 찾았어요 — 시트를 보고 손으로 고르세요")
    # 손 위치(몸통 길이 = 100): 펙덱·로우처럼 각도보다 손 이동이 큰 종목용
    for name, ax in (("손목앞뒤", 0), ("손목높이", 1)):
        vals = []
        for d in dets:
            if not d: vals.append(np.nan); continue
            kp = d["kp"]; v = []
            for sh, wr, hp in ((5, 9, 11), (6, 10, 12)):
                if min(kp[sh, 2], kp[wr, 2], kp[hp, 2]) > .4:
                    torso = np.hypot(*(kp[sh, :2] - kp[hp, :2])) + 1e-6
                    v.append(abs(kp[wr, ax] - kp[sh, ax]) / torso * 100 if ax == 0 else (kp[hp, 1] - kp[wr, 1]) / torso * 100)
            vals.append(np.mean(v) if v else np.nan)
        vals = np.array(vals)
        if np.mean(~np.isnan(vals)) >= 0.5:
            series[name] = smooth(vals, k=max(1, int(a.fps * 0.25)))
    # 가장 크게 움직인 것(각도°와 손 이동을 같은 눈금으로 비교)
    joint = a.joint if a.joint in series else max(series, key=lambda k: np.percentile(series[k], 95) - np.percentile(series[k], 5))
    y = series[joint]
    rom = float(np.percentile(y, 95) - np.percentile(y, 5))
    ex = extremes(y, max(8, rom * 0.4))
    # 시작 자세 = 오래 머무는 쪽 끝(반복 사이에 쉬는 자리). --start big/small로 직접 지정 가능
    lo_v, hi_v = np.percentile(y, 5), np.percentile(y, 95)
    band = (hi_v - lo_v) * 0.2
    dwell_hi, dwell_lo = int(np.sum(y > hi_v - band)), int(np.sum(y < lo_v + band))
    if a.start:
        start_kind = "hi" if a.start == "big" else "lo"
    else:
        start_kind = "hi" if dwell_hi >= dwell_lo else "lo"
    starts = [i for k, i in ex if k == start_kind]
    ends = [i for k, i in ex if k != start_kind]
    reps = []
    for s in starts:
        e = next((i for i in ends if i > s), None)
        if e is None: continue
        s2 = next((i for i in starts if i > e), None)
        if s2 is None: continue
        reps.append((s, e, s2))
    res = {"video": os.path.basename(a.video), "duration": round(dur, 2), "joint": joint, "rom": round(rom),
           "reps": len(reps), "start": "펴짐(각도 큼)" if start_kind == "hi" else "굽힘(각도 작음)", "angles": {k: [round(float(np.nanmin(v))), round(float(np.nanmax(v)))] for k, v in series.items()}}
    if reps:
        mid = reps[len(reps) // 2] if len(reps) > 2 else reps[0]
        s, e, s2 = mid
        # 힘주기 시작 = 시작 끝점에서 움직임이 10% 넘은 첫 프레임 직전
        lim = y[s] + (y[e] - y[s]) * 0.1
        i2 = next((i for i in range(s, e) if (y[i] - lim) * np.sign(y[e] - y[s]) > 0), s)
        i3 = e
        T1 = max(0, s - int(a.fps * 0.2))
        res.update({"T1": round(t[T1], 2), "T2": round(max(0, t[i2] - 0.15), 2), "T3": round(max(0, t[i3] - 0.1), 2),
                    "tempo": {"up": round(np.mean([(e - s) for s, e, _ in reps]) / a.fps, 1),
                              "down": round(np.mean([(s2 - e) for _, e, s2 in reps]) / a.fps, 1)},
                    "rep_times": [[round(t[s], 1), round(t[e], 1), round(t[s2], 1)] for s, e, s2 in reps]})
    else:
        res.update({"T1": 0, "T2": round(dur * .3, 2), "T3": round(dur * .5, 2), "note": "반복을 못 나눔 — 시트 보고 손으로"})
    json.dump(res, open(os.path.join(a.out, "pose.json"), "w"), ensure_ascii=False, indent=1)
    sheet(F, dets, t, y, joint, res, os.path.join(a.out, "pose_sheet.jpg"))
    print(json.dumps(res, ensure_ascii=False))


def sheet(F, dets, t, y, joint, res, path):
    from PIL import Image, ImageDraw, ImageFont
    font_path = subprocess.run(["fc-match", "-f", "%{file}", "Noto Sans CJK KR:bold"], capture_output=True, text=True).stdout.strip()
    ft = ImageFont.truetype(font_path, 16)
    n = 20
    idx = np.linspace(0, len(F) - 1, n).astype(int)
    marks = {}
    for k in ("T1", "T2", "T3"):
        if k in res:
            j = int(np.argmin(np.abs(t - res[k])))
            marks[j] = k
    idx = sorted(set(idx.tolist()) | set(marks))
    tw = 180
    th = int(F.shape[1] * tw / F.shape[2])
    cols = 8
    rows = (len(idx) + cols - 1) // cols
    gh = 150
    im = Image.new("RGB", (cols * tw, rows * th + gh), (20, 20, 24))
    dr = ImageDraw.Draw(im)
    sc = tw / F.shape[2]
    for c, i in enumerate(idx):
        x0, y0 = (c % cols) * tw, (c // cols) * th
        im.paste(Image.fromarray(F[i]).resize((tw, th)), (x0, y0))
        d = dets[i]
        if d:
            kp = d["kp"]
            for p, q in EDGES:
                if kp[p, 2] > .4 and kp[q, 2] > .4:
                    dr.line([(x0 + kp[p, 0] * sc, y0 + kp[p, 1] * sc), (x0 + kp[q, 0] * sc, y0 + kp[q, 1] * sc)], fill=(225, 20, 30), width=3)
            for k in range(5, 17):
                if kp[k, 2] > .4:
                    cx, cy = x0 + kp[k, 0] * sc, y0 + kp[k, 1] * sc
                    dr.ellipse([cx - 3, cy - 3, cx + 3, cy + 3], fill=(255, 255, 255))
        lab = f"{t[i]:.1f}s"
        if i in marks:
            lab = f"{marks[i]} {lab}"
            dr.rectangle([x0, y0, x0 + tw - 1, y0 + th - 1], outline=(255, 220, 0), width=4)
        dr.rectangle([x0, y0, x0 + 90, y0 + 22], fill=(0, 0, 0))
        dr.text((x0 + 4, y0 + 1), lab, font=ft, fill=(255, 255, 255))
    # 각도 그래프
    gy0 = rows * th
    W = cols * tw
    lo, hi = float(np.min(y)), float(np.max(y))
    pts = [(10 + (W - 20) * i / max(1, len(y) - 1), gy0 + gh - 20 - (gh - 50) * (v - lo) / max(1, hi - lo)) for i, v in enumerate(y)]
    dr.line(pts, fill=(225, 20, 30), width=2)
    for j, k in marks.items():
        x = pts[j][0]
        dr.line([(x, gy0 + 28), (x, gy0 + gh - 10)], fill=(255, 220, 0), width=2)
        dr.text((x + 3, gy0 + 28), k, font=ft, fill=(255, 220, 0))
    info = f"{joint} {lo:.0f}~{hi:.0f}{'°' if joint in ANGLES else ''} · 반복 {res['reps']}회"
    if "tempo" in res:
        info += f" · 힘주기 {res['tempo']['up']}초 / 돌아오기 {res['tempo']['down']}초"
    dr.text((10, gy0 + 4), info, font=ft, fill=(255, 255, 255))
    im.save(path, quality=75)


if __name__ == "__main__":
    main()
