"""인체모형을 바꾼 뒤 PT 노트의 그림을 한 번에 다시 그림 (2026-11-16)

    python3 _tools/regen_anatomy.py            → 가장 높은 버전(anatomy_v*.py)으로
    python3 _tools/regen_anatomy.py anatomy_v5 → 그 파일로

복습지 자극 부위 그림(m/**/anatomy.png)은 _tools/anatomy_hl.json의 강조 기록대로,
근육 지도(assets/muscle)는 make_musclemap.py로 다시 그린다. 부위 이름이 바뀌면 json도 같이 고칠 것.
"""
import glob, importlib, json, os, re, subprocess, sys
HERE = os.path.dirname(os.path.abspath(__file__)); ROOT = os.path.dirname(HERE)
sys.path.insert(0, HERE)
mod = sys.argv[1] if len(sys.argv) > 1 else max(
    (os.path.basename(f)[:-3] for f in glob.glob(os.path.join(HERE, "anatomy_v*.py"))),
    key=lambda n: [int(x) for x in re.findall(r"\d+", n)])
A = importlib.import_module(mod)
A._expand = lambda hl: dict(hl or {})          # json에는 별칭이 풀린 부위 이름이 적혀 있음
C = {"P": A.PRIMARY, "S": A.SECOND}
hl = json.load(open(os.path.join(HERE, "anatomy_hl.json"), encoding="utf-8"))
known = set()
for sex in "MF":
    for v in "FB":
        g = A._geo(v, sex); known |= {(v, n) for n in list(g["R"]) + list(g["DEEP"])}
n = 0
for rel, s in hl.items():
    p = os.path.join(ROOT, rel)
    if not os.path.isdir(os.path.dirname(p)):
        print("폴더 없음(건너뜀):", rel); continue
    bad = [k for k in s["front"] if ("F", k) not in known] + [k for k in s["back"] if ("B", k) not in known]
    if bad: sys.exit("모형에 없는 부위 이름: %s (%s)" % (bad, rel))
    A.build(p, {k: C[c] for k, c in s["front"].items()}, {k: C[c] for k, c in s["back"].items()}, sex=s["sex"])
    n += 1
missing = [os.path.relpath(f, ROOT) for f in glob.glob(os.path.join(ROOT, "m", "**", "anatomy.png"), recursive=True)
           if os.path.relpath(f, ROOT) not in hl]
print(mod, "복습지 그림", n, "장 /", "json에 없는 그림:", missing or "없음")
subprocess.check_call([sys.executable, os.path.join(HERE, "make_musclemap.py")], env=dict(os.environ, ANATOMY=mod))
