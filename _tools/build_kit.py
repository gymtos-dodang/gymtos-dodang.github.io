"""PT 노트 '뼈대 키트' 만들기 (2026-11-11 장동욱 "다른 선생님한테 그대로 공유 — 난 뼈대 같은 느낌")

지금 사이트에서 회원 정보·개인 자료(사진·자격·열쇠·창고 주소)를 전부 빼고,
가상의 샘플 회원 1명 + 다른 선생님의 Claude가 읽고 세팅할 설명서(CLAUDE.md·README.md)를 넣은 폴더를 만든다.

    python3 _tools/build_kit.py <출력 폴더>        → <출력 폴더>/pt-note-kit/  (+ pt-note-kit.zip)

사이트를 고친 뒤 다시 돌리면 최신 기능이 들어간 키트가 다시 만들어짐.
"""
import os, re, sys, json, shutil, subprocess, zipfile, glob

SRC = os.path.abspath(os.path.join(os.path.dirname(__file__), ".."))
OUT = os.path.abspath(sys.argv[1] if len(sys.argv) > 1 else os.path.join(SRC, "..", "kit-out"))
KIT = os.path.join(OUT, "pt-note-kit")
SAMPLE = "sample-k7d2qx"
COACH = "coach-sample"

# 키트에 절대 들어가면 안 되는 것 (회원 이름·주소·열쇠·창고 주소)
MEMBER_NAMES = ["최지훈", "서경진", "김지수", "김태영", "임애란", "최용민", "고은성", "정미경", "이지환", "박찬영",
                "이진영", "서인석", "우유정", "조혜영", "어순래", "유희숙", "민성"]
GIVEN = ["지훈", "경진", "지수", "태영", "애란", "용민", "은성", "미경", "지환", "찬영", "진영", "인석", "유정", "혜영", "순래", "희숙"]
SECRETS = ["AKfycbwtjTpk88xTWQcKXoaFX2qCYtKSzKoCOs-Us26k6QUbtKvewTaqJutJuA4RJjAmV-6bvA",
           "4756ec53d712de9927d43e17e7efda99bb0a8312a08e1b82be440c1f2cf5da25",
           "1r2_6XDT0aNK_H-hTDpQHkSNHsczGIKMX2wJ6G2JMC_IcbZL5F_6gfO1T",
           "QPmNobe3gEZXDgTPowKWcf", "13TuxA85YF1M3cn8gr_JIPFRCUTxD0UHx7685Qv-Z9dM"]
TEXT_EXT = (".html", ".js", ".css", ".md", ".py", ".gs", ".json", ".webmanifest", ".txt")


def rd(p): return open(p, encoding="utf-8").read()
def wr(p, s):
    os.makedirs(os.path.dirname(p), exist_ok=True)
    open(p, "w", encoding="utf-8").write(s)


def scrub(s):
    """회원 이름·회원 주소·개인 문구를 일반 말로"""
    slugs = [os.path.basename(d.rstrip("/")) for d in glob.glob(os.path.join(SRC, "m", "*/"))]
    for sl in slugs: s = s.replace(sl, SAMPLE)
    for n in MEMBER_NAMES: s = s.replace(n + " 회원님", "OO 회원님").replace(n + "님", "OO님").replace(n, "OO")
    for g in GIVEN: s = re.sub(g + r"님", "OO님", s)
    s = s.replace("장동욱 트레이너", "OOO 트레이너").replace("장동욱", "트레이너").replace("gymtos-dodang.github.io", "<내 아이디>.github.io")
    s = s.replace("coach-tqqnlh", COACH)
    s = s.replace("트레이너 트레이너", "트레이너")
    return s


def main():
    if os.path.exists(KIT): shutil.rmtree(KIT)
    os.makedirs(KIT)
    # 1) 그대로 복사할 것
    for f in ["index.html", "robots.txt", ".nojekyll"]:
        if os.path.exists(os.path.join(SRC, f)): shutil.copy(os.path.join(SRC, f), KIT)
    shutil.copytree(os.path.join(SRC, "assets"), os.path.join(KIT, "assets"))
    shutil.copytree(os.path.join(SRC, "_tools"), os.path.join(KIT, "_tools"),
                    ignore=shutil.ignore_patterns("__pycache__", "build_kit.py"))
    os.makedirs(os.path.join(KIT, COACH, "guide"))
    for f in ["index.html", "guide.html", "intro.html", "manifest.webmanifest"]:
        shutil.copy(os.path.join(SRC, "coach-tqqnlh", f), os.path.join(KIT, COACH, f))

    # 2) 텍스트 파일 전부 개인 정보 지우기
    for root, _, files in os.walk(KIT):
        for f in files:
            if f.endswith(TEXT_EXT):
                p = os.path.join(root, f)
                wr(p, scrub(rd(p)))

    # 3) site.js — 빈칸
    wr(os.path.join(KIT, "assets", "site.js"), """/* 이 사이트의 기본 정보 — 처음 세팅할 때 여기만 고치면 회원 노트·선생님 페이지 전체에 반영됨 */
window.SITE = {
  trainer: "OOO",                    /* 트레이너 이름 (화면에 "OOO 트레이너"로 나옴) */
  brand: "GYMTOS",                   /* 센터 이름 */
  branch: "도당점",                  /* 지점 이름 */
  site: "https://<내 아이디>.github.io",   /* 사이트 주소 (og 미리보기 그림 등) */
  att_api: ""                        /* 출석 창고(Apps Script 웹 앱) 주소 — 세팅 3단계에서 넣음. 비어 있으면 출석·인바디·루틴 고치기 저장이 안 됨 */
};
""")
    # app.js·선생님 페이지 기본값에 박힌 창고 주소·이름 지우기
    for p in [os.path.join(KIT, "assets", "app.js"), os.path.join(KIT, COACH, "index.html")]:
        s = rd(p)
        s = s.replace('"https://script.google.com/macros/s/' + SECRETS[0] + '/exec"', '""')
        s = s.replace('SITE.trainer || "트레이너"', 'SITE.trainer || "OOO"')
        s = s.replace('<h1 id="trn">트레이너 트레이너</h1>', '<h1 id="trn">OOO 트레이너</h1>')
        wr(p, s)

    # 4) 창고 코드 — 열쇠 지문 빈칸 + 열쇠 만들기 도구
    p = os.path.join(KIT, "_tools", "attendance_apps_script.gs")
    wr(p, rd(p).replace(SECRETS[1], "PUT_YOUR_KEY_HASH_HERE"))
    wr(os.path.join(KIT, "_tools", "make_key.py"), '''"""선생님 열쇠 만들기 — python3 _tools/make_key.py
열쇠(16자)와 지문(SHA-256)을 보여줌. 지문만 _tools/attendance_apps_script.gs 의 RT_KEY_HASH 에 넣고,
열쇠는 선생님께만 전달(저장소·채팅 기록에 남기지 말 것 — 공개 저장소). 선생님 폰: https://<사이트>/<coach 폴더>/#key=<열쇠> 를 한 번 열기."""
import secrets, string, hashlib
k = "".join(secrets.choice(string.ascii_lowercase + string.digits) for _ in range(16))
print("열쇠(선생님께만):", k)
print("RT_KEY_HASH(코드에):", hashlib.sha256(k.encode()).hexdigest())
''')

    # 5) PT 안내서 — 개인 사진·자격·경력은 빈칸, 사진은 자리 표시 그림
    ph = '''<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="900" viewBox="0 0 1200 900"><rect width="1200" height="900" fill="#E9ECF2"/><rect x="40" y="40" width="1120" height="820" rx="36" fill="none" stroke="#B7BFCE" stroke-width="6" stroke-dasharray="26 18"/><text x="600" y="430" font-family="sans-serif" font-size="64" font-weight="700" fill="#8A93A6" text-anchor="middle">사진 자리</text><text x="600" y="510" font-family="sans-serif" font-size="36" fill="#9AA3B5" text-anchor="middle">세팅할 때 내 사진으로 바꿔요</text></svg>'''
    wr(os.path.join(KIT, COACH, "guide", "placeholder.svg"), ph)
    for f in ["guide.html", "intro.html"]:
        p = os.path.join(KIT, COACH, f)
        s = rd(p)
        s = re.sub(r'guide/[A-Za-z0-9_-]+\.(jpg|png|webp)', "guide/placeholder.svg", s)
        s = re.sub(r"(<title>[^<]*?)트레이너</title>", r"\1OOO 트레이너</title>", s)
        s = re.sub(r"전\) 짐토스 답십리점 → 현\) 짐토스24 도당점 트레이너", "[경력 — 예: 전) OO점 → 현) 짐토스24 도당점 트레이너]", s)
        s = s.replace("FISAF 국제트레이너 2급", "[자격 1]").replace("케틀벨 트레이닝 교육과정 수료", "[자격 2]").replace("케틀벨 트레이닝 교육과정", "[자격 2]")
        s = s.replace("한국인재교육원 RTS 재활트레이닝전문가 LEVEL.1 · 2", "[재활 자격 1]").replace("RTS 재활트레이닝전문가 LEVEL.1·2(한국인재교육원)", "[재활 자격 1]")
        s = s.replace("RTS 재활트레이닝전문가 LEVEL.1 · 2", "[재활 자격 1]")
        s = s.replace("마인드바디 아카데미 red재활기능운동", "[재활 자격 2]").replace("red재활기능운동(마인드바디 아카데미)", "[재활 자격 2]")
        s = s.replace("디스크 케어 전문 과정", "[재활 자격 3]").replace("스포츠 테이핑", "[재활 자격 4]")
        s = s.replace("스포츠 영양학 · 스포츠 생리학 교육 이수", "[이론 교육]").replace("스포츠 영양학·생리학 교육이수", "[이론 교육]")
        wr(p, s)

    # 6) 샘플 회원 1명 (가상) — 루틴은 지금 쓰는 주 6회 루틴, 식단은 다이어트 식단 틀
    src_m = os.path.join(SRC, "m", "jihun-g9kgdo")
    dst_m = os.path.join(KIT, "m", SAMPLE)
    os.makedirs(dst_m)
    js = subprocess.run(["node", "-e", """
global.window={};require(%s);const A=window.MEMBER;
global.window={};require(%s);const B=window.MEMBER;
const d=B.diet; d.member=undefined;
const M={name:"홍길동",sex:"M",since:"2026. 11",goal:"근비대 · 주 6회 (샘플 회원)",journey:{start:"2026-09-15"},
 notices:[{date:"2026. 11. 11",title:"PT 노트가 열렸어요",body:"이건 샘플 회원 노트예요. 세팅이 끝나면 지워도 돼요."}],
 next_class:null,forms:[],routine:A.routine,diet:d};
(M.routine.days||[]).forEach(x=>(x.items||[]).forEach(it=>{delete it.form;}));
process.stdout.write(JSON.stringify(M,null,2));
""" % (json.dumps(os.path.join(src_m, "data.js")), json.dumps(os.path.join(SRC, "m", "yongmin-eunseong-1mwau5", "data.js")))],
        capture_output=True, text=True, check=True).stdout
    wr(os.path.join(dst_m, "data.js"), "/* 샘플 회원(가상) — 세팅이 끝나면 지워도 됨. 새 회원은 CLAUDE.md '새 회원 PT 노트 만들기' */\nwindow.MEMBER = " + scrub(js) + ";\n")
    s = rd(os.path.join(src_m, "index.html"))
    s = scrub(s).replace("OO 회원님", "홍길동 회원님").replace("OO", "홍길동")
    wr(os.path.join(dst_m, "index.html"), s)
    make_og(os.path.join(dst_m, "og.jpg"), "홍길동 회원님", "#1F3864")
    wr(os.path.join(KIT, COACH, "members.js"), '/* 선생님 페이지에 나오는 회원 목록 — 새 회원 PT 노트를 만들면 주소를 여기 추가 */\nwindow.COACH_MEMBERS = [\n  "%s"\n];\n' % SAMPLE)

    # 7) 설명서
    wr(os.path.join(KIT, "README.md"), README)
    wr(os.path.join(KIT, "CLAUDE.md"), kit_claude_md())

    # 8) 마지막 검사 — 비밀·회원 이름이 남았으면 멈춤
    bad = []
    for root, _, files in os.walk(KIT):
        for f in files:
            if not f.endswith(TEXT_EXT): continue
            p = os.path.join(root, f); s = rd(p)
            for x in SECRETS + MEMBER_NAMES + ["장동욱", "3rhkdi1pwrfts5q8"]:
                if x in s: bad.append((os.path.relpath(p, KIT), x))
    if bad:
        for b in bad[:30]: print("남은 것:", b)
        sys.exit("키트에 개인 정보가 남아 있어요")
    zp = os.path.join(OUT, "pt-note-kit.zip")
    if os.path.exists(zp): os.remove(zp)
    with zipfile.ZipFile(zp, "w", zipfile.ZIP_DEFLATED) as z:
        for root, _, files in os.walk(KIT):
            for f in files:
                p = os.path.join(root, f)
                z.write(p, os.path.relpath(p, OUT))
    print("키트:", KIT, "\nzip:", zp, round(os.path.getsize(zp) / 1e6, 1), "MB")


def make_og(path, name, color):
    from PIL import Image, ImageDraw, ImageFont
    W, H = 1200, 630
    im = Image.new("RGB", (W, H), color)
    d = ImageDraw.Draw(im)
    fp = None
    for c in ["/usr/share/fonts/opentype/noto/NotoSansCJK-Bold.ttc", "/usr/share/fonts/truetype/noto/NotoSansCJK-Bold.ttc",
              "/usr/share/fonts/noto-cjk/NotoSansCJK-Bold.ttc"]:
        if os.path.exists(c): fp = c; break
    f1 = ImageFont.truetype(fp, 40) if fp else ImageFont.load_default()
    f2 = ImageFont.truetype(fp, 96) if fp else ImageFont.load_default()
    f3 = ImageFont.truetype(fp, 32) if fp else ImageFont.load_default()
    try:
        logo = Image.open(os.path.join(SRC, "assets", "logo.png")).convert("RGBA")
        logo = logo.resize((300, int(logo.height * 300 / logo.width)))
        im.paste(logo, (80, 70), logo)
    except Exception:
        pass
    d.text((80, 220), "MY PT NOTE · 나만의 운동 노트", font=f1, fill="#C9D3E6")
    d.text((80, 290), name, font=f2, fill="white")
    d.rectangle([0, H - 90, W, H], fill="#0E1A33")
    d.text((80, H - 68), "GYMTOS 도당점 · 담당 OOO 트레이너", font=f3, fill="#C9D3E6")
    im.save(path, quality=88)


README = """# PT 노트 뼈대 키트

회원마다 개인 PT 노트(루틴·자세 복습지·식단·출석·인바디·배지)를 만들어 주고,
선생님 페이지(출석 현황·루틴 바로 고치기·전체 공지·출석왕)와 PT 안내서(상담용)까지 들어 있는 시스템이에요.
이 폴더는 **회원 정보를 전부 뺀 빈 틀**이에요. 선생님마다 자기 사이트·자기 구글 시트·자기 열쇠로 따로 써요.

## 선생님이 준비할 것
1. **GitHub 계정** (무료, github.com 가입) — 사이트가 여기에 올라가요. 아이디가 사이트 주소가 돼요 (`https://아이디.github.io`).
2. **구글 계정** — 출석·인바디·루틴 고친 기록이 내 구글 시트에 저장돼요.
3. **Claude** — Claude 데스크톱 앱 권장 (GitHub 연결 + 컴퓨터 연결이 되면 세팅을 거의 다 Claude가 해요).

## Claude에게 이렇게 말하세요
이 키트(zip 또는 저장소 주소)를 Claude 대화에 올리고:

> 이 PT 노트 키트로 내 사이트 만들어줘. CLAUDE.md의 '처음 세팅' 순서대로 해줘.
> 내 이름은 OOO, 지점은 짐토스 도당점, 테마 색은 (예: 블랙+골드)로 하고 싶어.

그 뒤로는 평소처럼:
- "OO 회원님 PT 노트 만들어줘 (남자, 10월 시작)"
- "OO 회원님 루틴 짜줘 / 자세 복습지 만들어줘 (영상 첨부) / 식단 만들어줘"
- 루틴은 선생님 페이지에서 폰으로 바로 고칠 수도 있어요.

## 주의
- 회원 사진·영상·인바디는 **회원 동의를 받은 것만** 올리세요. 사이트는 주소를 아는 사람만 들어올 수 있지만 공개 사이트예요.
- 선생님 페이지 주소(coach-로 시작하는 폴더)와 선생님 열쇠는 회원에게 보내지 마세요.
"""


def kit_claude_md():
    s = rd(os.path.join(SRC, "CLAUDE.md"))
    # 회원 목록 표 → 샘플만
    s = re.sub(r"## 회원 목록\n\|[^\n]*\n\|[^\n]*\n(\|[^\n]*\n)+",
               "## 회원 목록\n| 회원 | 주소 | 성별 |\n|---|---|---|\n| 홍길동 (샘플, 가상) | m/%s/ | M |\n" % SAMPLE, s)
    # 개인 링크·열쇠 관련 줄 정리
    s = re.sub(r"[^\n]*claude\.ai/artifact/[^\n]*\n", "", s)
    s = re.sub(r"- 자격\(2026-11-06 기준\)[^\n]*\n", "- 자격·경력: PT 안내서(guide.html·intro.html)의 [자격 n]·[경력] 빈칸을 처음 세팅 때 채움.\n", s)
    s = re.sub(r"- 순서: 내장 브라우저로 Apps Script 프로젝트 \"PT노트\" 편집기 열기 https://script\.google\.com/home/projects/[^\s]+ →",
               "- 순서: 내장 브라우저로 Apps Script 프로젝트 편집기 열기(script.google.com/home → 내 프로젝트) →", s)
    s = s.replace("배포 ID(AKfycbwtjTpk…)는 그대로라", "배포 ID는 그대로라")
    s = scrub(s)
    s = s.replace("작성자: gymtos-dodang <gymtos-dodang@users.noreply.github.com>", "작성자: 선생님 GitHub 계정(처음 세팅 때 정한 이름·이메일로)")
    s = s.replace("트레이너(짐토스 도당점)의 회원별 PT 노트 사이트", "트레이너의 회원별 PT 노트 사이트")
    head = """# PT 노트 (트레이너 개인 회원 노트 사이트) — 뼈대 키트

> 이 저장소는 다른 트레이너가 만든 PT 노트 시스템의 **뼈대**를 받은 것. 회원 정보는 없음(샘플 회원 1명만).
> 아래 '처음 세팅'이 끝나면 이 섹션의 체크를 채우고, 그다음부터는 아래 운영 설명을 따른다.
> 설명 속 '트레이너' = 이 사이트 주인 선생님. 'OO' = 회원 이름 자리. 날짜·요청 기록은 원래 사이트에서 정한 규칙의 출처.

## 처음 세팅 (Claude가 순서대로 — 선생님에게는 꼭 필요한 것만 물어볼 것)
1. **선생님 정보 받기**: 이름, 센터·지점, 연락처(PT 안내서 마지막 장), 자격·경력(안내서 1장), 가격표(안내서 7장 — 같은 지점이면 그대로 둬도 됨), 원하는 테마 색.
2. **GitHub 사이트**: 선생님 GitHub 계정에 저장소 `<아이디>.github.io` 만들고(공개) 이 폴더 내용 올리기 → Settings → Pages → main 브랜치 /(root) 로 켜기. 사이트 주소 = `https://<아이디>.github.io`.
   - `assets/site.js` 채우기(trainer·brand·branch·site). 전체에서 `<내 아이디>.github.io` 를 실제 주소로 바꾸기(회원 index.html og:image 등).
   - 선생님 페이지 폴더 `coach-sample/` 을 **추측 못 하는 이름** `coach-<랜덤 소문자·숫자 6자>/` 로 바꾸고, 전체에서 `coach-sample` 글자도 바꾸기. 이 주소는 선생님만 앎.
3. **출석 창고(구글 Apps Script)** — 선생님 구글 계정으로:
   - 구글 시트 새로 만들기(이름 "PT노트 출석") → 확장 프로그램 → Apps Script → `_tools/attendance_apps_script.gs` 내용 통째로 붙여넣기.
   - `python3 _tools/make_key.py` 로 선생님 열쇠·지문 만들기 → 지문을 코드의 `RT_KEY_HASH` 에(저장소의 .gs 파일에도) 넣기. **열쇠는 선생님에게만 대화로 전달, 파일에 저장 금지.**
   - (인바디 결과지 자동 읽기를 쓰려면) 편집기 왼쪽 '서비스 +' → Drive API 추가.
   - 배포 → 새 배포 → 유형 '웹 앱', 실행 = 나, 액세스 = 모든 사용자 → 권한 승인 → 웹 앱 URL을 `assets/site.js` 의 `att_api` 에.
   - Claude가 선생님 컴퓨터의 내장 브라우저를 쓸 수 있고 구글 로그인이 돼 있으면 Claude가 직접(아래 '창고 배포는 Claude가' 참고), 아니면 선생님께 단계별로 안내.
4. **선생님 폰 연결**: `https://<사이트>/<coach 폴더>/#key=<열쇠>` 를 선생님 폰(평소 쓰는 브라우저·홈 화면 앱)에서 한 번 열기 → 홈 화면에 추가.
5. **테마**(선생님이 원하면): 아래 '테마 바꾸는 곳' 순서대로.
6. **PT 안내서**: guide.html(폰)·intro.html(아이패드)의 `[자격 n]`·`[경력]`·`OOO` 빈칸 채우기, `guide/placeholder.svg` 자리에 선생님 사진·비포애프터(회원 동의받은 것만)·화면 그림 넣기. 화면 그림(2장 '보기' 칸)은 샘플/실제 회원 노트를 Playwright로 찍어서.
7. **샘플 회원** `m/%s/` 은 확인용 — 실제 회원이 생기면 지우고 members.js 에서도 빼기.
8. 끝나면 커밋·푸시, 사이트 열어서 확인, 이 '처음 세팅' 체크 표시.

## 테마 바꾸는 곳 (선생님마다 자기 색)
- `assets/style.css` 맨 위 `:root` 색 변수(남 테마)와 `:root[data-sex="F"]`(여 테마) — 화면 대부분은 여기 변수만 바꾸면 됨. 그 밖에 #1F3864·#C2185B·#17294B 를 직접 쓴 곳 grep.
- `assets/exicons.js` 움직이는 아이콘 색(사람·기구·자극 부위, M/F).
- `assets/icons/M|F/` PNG 아이콘: `python3 _tools/make_icons.py assets/icons/M "<남 색>"` / F (+ make_icons_smith.py).
- `assets/muscle/`, 식단 그림(`_tools/make_diet_web.py`), 회원 og.jpg(테마색 배경), 회원 index.html·선생님 페이지의 theme-color, coach `manifest.webmanifest`.
- 로고 `assets/logo.png`(같은 센터면 그대로). PT 안내서 guide.html·intro.html 의 색.
- 바꾼 뒤 Playwright로 남·녀 회원 화면·선생님 페이지(폰 390px·아이패드 1180px) 찍어서 확인.

---

""" % SAMPLE
    s = re.sub(r"^# GYMTOS 도당점 PT 노트 \(회원 개인 홈페이지\)\n", "", s)
    return head + s


if __name__ == "__main__":
    main()
