#!/usr/bin/env python3
"""기구 사진첩 만들기 (2026-11-16 장동욱 "기구 사진첩 + 관절 인식 세팅하자")

모든 회원 복습지(m/*/data.js forms + m/dyn/forms.js)의 poster.jpg·step1.jpg를 종목 이름별로 모아
_tools/equipment/ 에 저장:
  album.json            {종목: {part, en, shots:[{member, id, img}]}}
  sheet-<부위>.jpg       부위별 한 장 (종목 이름이 적힌 사진 격자) — 새 영상의 기구를 맞힐 때 이 한 장만 Read
  sheet-all.jpg         전체 한 장(작게)
직접 찍은 기구 사진은 _tools/equipment/photos/<종목 이름>/*.jpg 에 넣으면 같이 들어감(사람 없는 기구 사진 환영).
사용: python3 _tools/equip_album.py        (복습지를 올린 뒤 다시 돌리면 최신화)
"""
import json, os, re, subprocess, glob, sys
from PIL import Image, ImageDraw, ImageFont

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
OUT = os.path.join(ROOT, "_tools", "equipment")
PARTS = ["가슴", "등", "어깨", "팔", "하체", "엉덩이", "복근"]
FONT = None
for f in ["/usr/share/fonts/opentype/noto/NotoSansCJK-Bold.ttc", "/usr/share/fonts/opentype/noto/NotoSansCJK-Regular.ttc"]:
    if os.path.exists(f):
        FONT = f; break
if not FONT:
    out = subprocess.run(["fc-match", "-f", "%{file}", "Noto Sans CJK KR:bold"], capture_output=True, text=True).stdout
    FONT = out.strip()

JS = r"""
const fs=require('fs'),path=require('path');const root=process.argv[1];const res=[];
function load(f){global.window={};try{require(f)}catch(e){return null}return global.window;}
for(const d of fs.readdirSync(path.join(root,'m'))){
  const f=path.join(root,'m',d,'data.js'); if(!fs.existsSync(f))continue;
  const w=load(f); const D=w&&(w.DATA||w.NOTE||Object.values(w).find(v=>v&&v.forms)); if(!D)continue;
  const nm=(D.member&&D.member.name)||D.name||d;
  for(const x of (D.forms||[])) res.push({member:nm,slug:d,id:x.id,ex:x.exercise,en:x.exercise_en||'',part:x.part||'',dir:path.join('m',d,x.dir||('media/form-'+x.id+'/'))});
}
const dy=path.join(root,'m','dyn','forms.js');
if(fs.existsSync(dy)){const w=load(dy);for(const [nm,v] of Object.entries(w.DYN||{}))for(const x of (v.forms||[]))
  res.push({member:nm,slug:'dyn',id:x.id,ex:x.exercise,en:x.exercise_en||'',part:x.part||'',dir:(x.dir||'').replace(/^\//,'')});}
console.log(JSON.stringify(res));
"""

def forms():
    r = subprocess.run(["node", "-e", JS, ROOT], capture_output=True, text=True, cwd=ROOT)
    if r.returncode:
        sys.exit(r.stderr)
    return json.loads(r.stdout)

def norm(s):  # "체스트 프레스 머신" = "체스트프레스 머신"
    return re.sub(r"\s+", "", s or "")

def part_of(p):
    for k in PARTS:
        if k in (p or ""):
            return k
    return "기타"

def main():
    album = {}
    keymap = {}
    for f in forms():
        k = norm(f["ex"])
        name = keymap.setdefault(k, f["ex"])
        a = album.setdefault(name, {"part": part_of(f["part"]), "en": f["en"], "shots": []})
        for img in ("step1.jpg", "poster.jpg"):
            p = os.path.join(f["dir"], img)
            if os.path.exists(os.path.join(ROOT, p)):
                a["shots"].append({"member": f["member"], "id": f["id"], "img": p}); break
    # 직접 찍은 기구 사진
    for d in sorted(glob.glob(os.path.join(OUT, "photos", "*"))):
        name = os.path.basename(d)
        name = keymap.get(norm(name), name)
        a = album.setdefault(name, {"part": "기타", "en": "", "shots": []})
        for p in sorted(glob.glob(os.path.join(d, "*"))):
            if p.lower().endswith((".jpg", ".jpeg", ".png", ".webp")):
                a["shots"].insert(0, {"member": "기구 사진", "id": "", "img": os.path.relpath(p, ROOT)})
    os.makedirs(OUT, exist_ok=True)
    with open(os.path.join(OUT, "album.json"), "w") as fp:
        json.dump(album, fp, ensure_ascii=False, indent=1)

    def sheet(names, path, cw, per=3):
        cols = 4
        th = int(cw * 1.25)
        cells = []
        for n in names:
            shots = album[n]["shots"][:per]
            for s in shots:
                cells.append((n, s))
        if not cells:
            return
        lab = max(18, cw // 11)
        font = ImageFont.truetype(FONT, lab)
        small = ImageFont.truetype(FONT, int(lab * .75))
        rows = (len(cells) + cols - 1) // cols
        W, H = cols * cw, rows * (th + lab * 2 + 8)
        im = Image.new("RGB", (W, H), (20, 20, 24))
        dr = ImageDraw.Draw(im)
        for i, (n, s) in enumerate(cells):
            x, y = (i % cols) * cw, (i // cols) * (th + lab * 2 + 8)
            try:
                ph = Image.open(os.path.join(ROOT, s["img"])).convert("RGB")
                ph.thumbnail((cw - 6, th))
                im.paste(ph, (x + (cw - ph.width) // 2, y + lab * 2 + 6))
            except Exception:
                pass
            f2 = font
            while dr.textlength(n, font=f2) > cw - 8 and f2.size > 10:
                f2 = ImageFont.truetype(FONT, f2.size - 1)
            dr.text((x + 4, y + 2), n, font=f2, fill=(255, 255, 255))
            dr.text((x + 4, y + lab + 6), f"{album[n]['part']} · {s['member']}", font=small, fill=(225, 20, 30))
        im.save(path, quality=72)

    names_all = sorted(album, key=lambda n: (PARTS + ["기타"]).index(album[n]["part"]))
    for p in PARTS + ["기타"]:
        ns = [n for n in names_all if album[n]["part"] == p]
        out = os.path.join(OUT, f"sheet-{p}.jpg")
        if ns:
            sheet(ns, out, 300, per=3)
        elif os.path.exists(out):
            os.remove(out)
    sheet(names_all, os.path.join(OUT, "sheet-all.jpg"), 200, per=1)
    print(f"종목 {len(album)}개 · 사진 {sum(len(a['shots']) for a in album.values())}장 → _tools/equipment/")
    for p in PARTS + ["기타"]:
        ns = [n for n in names_all if album[n]["part"] == p]
        if ns:
            print(f"  {p}: " + ", ".join(ns))

if __name__ == "__main__":
    main()
