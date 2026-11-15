# JANG KAREDO PT노트 (회원 개인 홈페이지)

장동욱 트레이너의 회원별 PT 노트 사이트(브랜드 **JANG KAREDO PT노트**, 수업은 짐토스 도당점). 깃허브 페이지: https://gymtos-dodang.github.io
답변은 항상 한국어로. 색 = 남 블랙·레드(#1A1A1E·#E1141E) / 여 핑크레드(#D6204F). 짐토스 로고·'GYMTOS 도당점' 글자는 쓰지 않음.

> **이 파일은 짧은 규칙집.** 기능마다 자세한 설명·정한 이유·사고 원인·시안 이야기는 `_docs/HISTORY.md`에 있음(자동으로 안 읽힘).
> 어떤 기능을 고치기 전에 `grep -n "<기능 이름·함수 이름>" _docs/HISTORY.md | cut -c1-300` 으로 그 부분만 읽을 것. 통째로 읽지 말 것.
> 새로 만든·바꾼 것은 **여기에 한 줄**(아래 '기능 지도'), **자세한 건 `_docs/HISTORY.md` 해당 칸에** 적음.

## 운영 원칙 (2026-11-03 장동욱 요청)
- "OO 회원님 자세 복습지 / 루틴 / 식단 만들어줘" → 이제 결과물은 **그 회원의 PT 노트에 최신화**하는 것.
- 그 회원 PT 노트가 없으면 **새로 만들고** 거기에 적용. 끝나면 회원 주소를 알려줌.
- 수정 후에는 커밋 → `git push` (main). 반영까지 1~2분.
- (2026-11-03 요청) PT 노트를 만들거나 고치면 **회원님께 보낼 링크를 항상 같이** 보냄: `https://gymtos-dodang.github.io/m/<주소>/` (특정 화면은 끝에 `#routine`, `#form-<id>` 등).

## 구조
```
index.html / 404.html   첫 화면 / 폰에서 만든 회원(폴더 없음)을 창고에서 받아 띄움
assets/site.js          트레이너 이름·센터·사이트 주소·출석 창고 주소(att_api)
assets/app.js           data.js를 읽어 화면을 그림(해시 주소 #home #routine #forms #form-<id> #diet #log #goal #notice #body #growth #report #app)
assets/style.css        공통 디자인(data-sex M/F, data-skin) — 새 CSS는 맨 아래에 블록으로
assets/exicons.js       움직이는 운동 아이콘(SVG) · assets/icons/M|F/ PNG 아이콘 · assets/memo.js 선생님 메모 창
m/<이름-랜덤6자>/        회원 노트: index.html(껍데기)·manifest.webmanifest·data.js(내용은 이 파일만)·og.jpg·media/form-<id>/
m/dyn/forms.js          폰에서 만든 회원의 복습지·공지(이름으로 붙임)
coach-tqqnlh/           선생님 페이지(index.html)·members.js(회원 주소 목록)·guide.html(PT 안내서 폰)·intro.html(아이패드)
_tools/                 anatomy_v3.py(해부도) · rebrand_jk.py(og.jpg·로고·아이콘) · bump_ver.py(?v= 올리기) · make_icons*.py · make_food.py·make_diet_web.py · make_member_icon.py · make_musclemap.py · make_sheep_skin.py · build_kit.py(다른 선생님용 키트 — _docs/HISTORY.md를 읽어 설명서를 만듦) · attendance_apps_script.gs(창고 코드) · exicons_sheet.html
_docs/HISTORY.md        자세한 기록(위 안내)
```

## 회원 목록
| 회원 | 주소 | 성별 |
|---|---|---|
| 최지훈 | m/jihun-g9kgdo/ | M |
| 서경진 | m/kyeongjin-bkwzy9/ | F (복습지 1개 — 11-13 핵프레스) |
| 김지수 | m/jisu-480xne/ | F (복습지 8개 — 11-12 촬영: 펙덱 플라이·케이블 체스트 프레스·체스트 프레스 머신) |
| 김태영 | m/taeyoung-k52qnx/ | M |
| 임애란 | m/aeran-bsq16i/ | F (순환 루틴) |
| 최용민 · 고은성 | m/yongmin-eunseong-1mwau5/ | M (그룹 PT — 두 분이 한 페이지·출석 공유) |
| 정미경 | m/mikyung-7rq2vd/ | F (토요일 엉덩이 = PT 수업 날) |
| 이지환 | m/jihwan-t7m4qe/ | M (바프 목표 — 여정 그래프 bodyprofile 모드) |
| 박찬영 | m/chanyoung-dvrara/ | M (토요일 = 로테이션, day.pick) |
| 이진영 | m/jinyoung-n73rzx/ | F (다이어트·근력 강화, 2026-06 시작 — 복습지 3개(11-08), 루틴·식단 아직 없음) |
| 서인석 | m/inseok-02j3ia/ | M (2026-07 시작, 주 4회 루틴 v2 — PT 주 3회지만 개인운동 안 나옴, 복습지 2개(11-10 촬영: 랫풀다운·뉴텍 시티드 로우 머신)) |
| 우유정 | m/yujeong-55pl5t/ | F (바프 2027-04 말 촬영 — 이번 달 시작, 촬영일 맞춤 바프 그래프 fit · 루틴은 나중에 올림) |
| 조혜영 | m/hyeyoung-d74063/ | F (2026-07 시작 — 복습지 3개(11-10: 스미스 인클라인·펙덱·체스트프레스), 주 5회 힙업 루틴 v1(월·수·금 힙 A·B·C, 화 가슴·어깨, 목 등, 유산소 20분, 일반 여성 중량), 식단 아직 없음, goal은 임시 문구) |
| 어순래 | m/sunrae-c7yvid/ | F (2026-03 시작, 시니어, 주 6회 건강 관리 루틴 v1(2026-10-29 종이 루틴일지 그대로 — 월 하체·화 등·수 가슴·목 엉덩이·금 어깨·토 등·팔, 유산소 15분, 하체는 가볍게), 복습지 3개(11-10, 11-04 촬영: 펙덱 플라이·뉴텍 체스트 프레스 머신(라잉)·케이블 푸쉬다운), 식단 아직 없음, goal은 임시 문구) |
| 염승완 | m/n3mtw9sgw/ (폰에서 만든 회원) | M (2026-10 시작, 다이어트·운동 습관화 — 복습지는 m/dyn/forms.js, 11-14 고블릿 스쿼트) |
| 이준서 | m/nbpvstegb/ (폰에서 만든 회원) | M (2026-09 시작, 하체 강화·운동 취미) |

- **폰에서 만든 회원 찾기** (2026-11-16 장동욱 요청): 장동욱이 말한 이름이 위 표에 없으면, 내장 브라우저로 https://gymtos-dodang.github.io/ 탭을 열고 `fetch(ATT_API+"?m=roster-list")` → kv `pub:m:roster-list:members`([{slug,name,sex,goal,start}])에서 찾음. 찾으면 이 표에 "(폰에서 만든 회원)"으로 한 줄 추가해 둠(다음부터는 확인 없이 바로). 표에 있는 회원은 매번 확인하지 않음(토큰 아끼기). 컴퓨터가 꺼져 있으면 장동욱에게 물어봄.

## 새 회원 PT 노트 만들기
0. **PT 시작일을 꼭 받기** (장동욱이 말해줌, "10월"처럼 달만 주면 그 달 15일로). 안 알려주면 물어볼 것. → data.js journey.start
1. 주소: `m/<이름 로마자>-<랜덤 소문자·숫자 6자>/` (예: jisu-k3x9qa). 추측하기 어렵게.
2. `m/jihun-g9kgdo/index.html`·`manifest.webmanifest` 복사(site.js·exicons.js·app.js 스크립트 태그 그대로) → 제목·og:title·헤더 문구의 이름, og:image 경로, theme-color(여 #D6204F) 바꾸기. **여 회원은 아이콘 icon-m-* → icon-f-*** (index.html 두 줄 + manifest 아이콘·색 #D6204F/#FBF3F5).
3. data.js 작성 (아래 형식). sex "F"면 핑크 테마·핑크 아이콘 자동.
4. og.jpg 생성: `python3 _tools/rebrand_jk.py` 가 모든 회원 og.jpg를 다시 그림(남 블랙+빨강 로고 / 여 핑크레드+흰 로고, "JANG KAREDO PT노트 · 나만의 운동 노트", "OOO 회원님", 아래 띠 "JANG KAREDO PT노트 · 담당 장동욱 트레이너") — 이미 바뀐 글자·색은 그대로라 여러 번 돌려도 됨. theme-color 남 #1A1A1E / 여 #D6204F.
5. 위 회원 목록 표에 추가하고, coach-tqqnlh/members.js에도 주소 추가.

- 폰(PT통합노트)에서 이미 만든 회원이면 새 주소를 만들지 말고 **그 주소(n…) 그대로** 폴더를 만들 것(출석·폰 루틴이 이어짐). 자세히: HISTORY '정식 노트로 옮기기'.
- 그룹 PT: name "A · B", 주소 m/<이름1>-<이름2>-<랜덤6>/, 한 페이지·출석 한 줄. inbody 없음.

## data.js 형식
- name, sex("M"/"F"), goal, journey{start:"YYYY-MM-DD"} (PT 시작일 — 있으면 홈에 '나의 PT 여정' 요약·목표 탭(#goal) 내용이 나옴, 없으면 숨김), notices[{date,title,body,link?}] (최신이 위), next_class(문자열 또는 null), diet(null이면 "준비 중", 문자열이면 그대로, 객체면 아래 식단 형식)
- forms[] (최신이 위): id, member?(그룹 PT에서 그 복습지 주인 — 히어로에 "OOO 회원님"), dir("media/form-<id>/"), date, exercise, exercise_en, part, targets[], benefit, key_point, good_points[3]{title,desc}, primary_muscles[{name,where}], secondary_muscles, feel_good, feel_stop, steps[3]{title,desc,chip,media,loop?}, do[3], dont[3]
- routine: version, updated, title, plan[3], key_point, note, cardio{minutes,options}, days[{day:"월"…"일", part, en, cardio:bool, rest?, cardio_only?(분, 유산소만 하는 날 · items:[] · note?), items[{name,en,tag?("메인"/"워밍업"/"선행"),tip,sets[[횟수,kg],…],form?,icon?}]}] — 횟수 자리에 "30초" 같은 글자, kg 자리에 null(=맨몸)도 됨
- diet 객체 (2026-11-05, 종이 다이어트 식단표 표준 틀과 같은 구성 — spec과 거의 같은 이름): member(그룹 PT면 식단 하는 사람), updated, title, title_en, rules[3], rules_note, key_point, stats[{label,value,unit}], formula[3]{icon,title,sub}, formula_result{title,sub}, carbs[]/prots[]{icon,name,amount} (단백질 칸 끝에 금색 "1종" 카드 자동), day_sub, day[]{icon,name,line1,line2,line3?}, lunch_do[], lunch_dont[], extras[]{icon,name,tag,lines[]}, notes_title, notes_sub, notes[]{icon,title,chip,desc}, safety
  - icon: 음식 이름(assets/food/<이름>.png: sweet_potato·rice_white·rice_brown·oatmeal·potato·chicken·beef·fish·egg·pork·tofu·shrimp·veg·salt·talk·clipboard) 또는 ic_끼니(ic_sun·ic_moon·ic_tray·ic_shaker·ic_water·ic_scale, 테마색). 새 음식은 make_food.py에 함수 추가 → make_diet_web.py 다시 실행
  - **끼니별로 정해진 식단** (2026-11-05, 이지환님 벌크업 식단처럼 메뉴가 정해진 경우): carbs/prots 대신 `meals[{no:"1식", name?, tag?("운동 후" → 금색 강조), note?, options[{label?, foods[{icon,name,amount?}]}]}]` — options가 2개 이상이면 사이에 '또는'. meals_title·meals_sub로 제목 변경 가능. carbs/prots·rules는 없어도 됨.
  - 음식 그림 추가(2026-11-05): bagel(베이글)·carbo(카보린 같은 탄수화물 보충제 파우치)
- 복습지·루틴·식단을 새로 올리면 notices 맨 위에 공지 한 줄 추가.
- **순환 루틴** (2026-11-04, 교대근무 등 쉬는 요일이 매주 다른 회원): routine.rotation: true, rotation_start:"YYYY-MM-DD", days[].day = "DAY 1"…"DAY N" (rest 날 없이 운동하는 날만).
  - 주소 #routine-d1 … dN. 루틴 탭 01 '순서 한눈에'(DAY 타일 + 7칸 채우는 '휴 · 근무표 따라' 타일).
  - 홈 '오늘 할 운동' = rotation_start부터 오늘 전까지 출석 체크한 날 수 ÷ N 의 나머지 + 1 → DAY 번호.
  - 출석률 = 출석 ÷ (지난 날 수 × N/7). 달력은 결석 표시 없이 출석 / 쉰 날만. 연속 출석은 3일 넘게 비면 끊김.
  - 종이 루틴일지도 같은 순서(DAY 1~N + 쉬는 날 타일, spec.rotation)로 만듦.
- **로테이션 날** (2026-11-06, 박찬영님 — 주말에 한 번 부위를 골라서): days[] 한 칸을 `{ day:"토", part:"로테이션", en:"Free Pick", pick:["mon",…], items:[], note? }` → 홈은 "오늘은 골라서 하는 날!", 루틴 탭은 고를 수 있는 요일 카드(누르면 그 요일 루틴). 출석률엔 운동하는 날로 셈, PT 안내서 '주 n회'에선 빠짐. 코드 app.js pickList.

- 그 밖의 data.js 키: `skin: "bunny"|"sheep"`(회원별 테마), `start_weights: {"종목": kg}`, `reports: {"YYYY-MM": "선생님 한마디"}`, `inbody: false`, `att_since`.

## 복습지 올리기 — "영상 + 이름 한 단어" (2026-11-13 장동욱 "쉽고 간편하게" → "ㅇㅋ")
- 장동욱은 영상 + 회원 이름 한 단어("지훈" / 여러 명이면 "지훈, 수지, 혜영" 영상 순서대로)만 보냄. 피드백 한마디가 붙을 수도 있음("지훈, 팔꿈치 고정 잘함" → 잘한 점·KEY POINT에 그대로 반영).
- **(2026-11-13 변경) 올리기 전에 검수 먼저**: 영상을 보고 "영상 순서 · 회원 이름 · 종목 이름" 표를 장동욱에게 먼저 보여 주고 확인("ㅇㅋ")받은 뒤에 미디어·data.js 작업 → 커밋·푸시. 도당점 종목 목록에 없는 기구·이름이면 특히 꼭 확인 (2026-11-13 케이블 체스트 프레스를 리버스 플라이로, 뉴텍 엠토처 시티드 로우를 다른 이름으로 잘못 올린 일 때문).
- **확인받은 뒤엔 끝까지**: 영상 프레임을 보고 종목을 직접 알아봄(도당점 종목 이름 = app.js RT_CAT·메모리 gym-equipment 기준) → 그 종목의 예전 복습지(모든 회원 data.js forms에서 같은 exercise)와 영상 자세로 문구 작성 → 아래 '미디어 만들기'대로 영상·그림·해부도 → data.js forms 맨 위 + part는 가슴/등/어깨/팔/하체/엉덩이/복근 글자 넣기 → notices 맨 위 공지 → 커밋·푸시 → 회원 링크(`…/m/<주소>/#form-<id>`)만 전달. 루틴은 건드리지 않아도 자동 연결(itemForm), 이름이 다르면 also로.
- (옛 규칙 "헷갈릴 때만 확인"은 위 검수 규칙으로 바뀜) 이름이 여러 회원과 겹치면(예: 같은 이름) 그것만 확인. 폰에서 만든 회원(n…주소)이면 '정식 노트로 옮기기' 먼저.

## 자세 복습지 미디어 만들기 (영상 1개 기준)
- 웹 영상(2026-11-15부터 720px·crf 24, 3MB 넘으면 crf 26): `ffmpeg -i in.mov -an -vf "scale=720:-2,fps=30" -c:v libx264 -preset veryfast -crf 24 -pix_fmt yuv420p -movflags +faststart form.mp4`
- 카톡 대비 움직이는 그림: `-vf "scale=324:-2,fps=10" -c:v libwebp_anim -loop 0 -quality 40 form.webp`
- 아이폰 영상이 HDR(HLG, 10bit)이면 먼저 SDR로 바꾸기: `-vf "zscale=t=linear:npl=203,format=gbrpf32le,zscale=p=bt709,tonemap=tonemap=hable:desat=0,zscale=t=bt709:m=bt709:r=tv,format=yuv420p"` (안 하면 색이 허옇게 뜸)
- poster.jpg (첫 장면 720px), step1.jpg (시작 자세 정지 화면), step2/3.webp (내리기·올리기 구간 1.8초, 288px, fps 12, quality 50)
- anatomy.png: 인체모형 v3 (`_tools/anatomy_v3.py`, 메모리 anatomy-v3-code 1·2와 같은 코드), 주동근 PRIMARY / 보조근 SECOND
  - 로우·풀다운 계열: 앞 {biceps, forearm: SECOND} / 뒤 {lat: PRIMARY, teres_major·rhomboid·trap_mid·delt_post·forearm: SECOND}
- 복습지 구성은 종이 복습지(2026-10 리메이크)와 같음: 히어로+KEY POINT → 01 영상 → 02 잘한 점 3개 → 03 자극 부위 → 04 동작 3단계 → 05 O·X. 트레이너 코멘트·숫자 타일·느낌 체크는 넣지 않음.

- 복습지 part에는 가슴/등/어깨/팔/하체/엉덩이/복근 글자를 넣을 것(부위별 보기 칩). 루틴은 건드리지 않아도 종목 이름이 같으면 자동 연결(itemForm), 다르면 복습지에 `also: ["루틴 쪽 이름"]`.
- 폰에서 만든 회원(폴더 없음)의 복습지는 `m/dyn/forms.js` window.DYN["<이름>"], 미디어 `m/dyn/<로마자>/media/form-<id>/`, dir은 / 로 시작.
- 새 종목 이름: app.js ICON_BY_NAME·RT_CAT·RT_EN·MG_RULES + exicons.js EX(비슷한 종목 복사, `_tools/exicons_sheet.html`로 확인). 도당점 종목 이름 규칙(뉴텍 시티드 로우 머신·사이드 레터럴 레이즈 머신·핵프레스 등)은 HISTORY '움직이는 운동 아이콘'.

## 루틴 규칙 (루틴일지 v2.7과 같음)
- 워밍업 → 메인(피라미드 15·12·10·8, 금색) → 나머지. 하체 날은 레그 익스텐션 워밍업 → 이너·아웃타이 선행 → 메인.
- 머신·케이블은 뉴텍 5kg 단위, 덤벨 2kg 단위(한 손 무게).

- **data.js로 루틴을 고치기 전에, 폰에서 고친 루틴이 있는지 장동욱에게 먼저 물어볼 것**(data.js 루틴의 version|updated가 바뀌면 폰에서 고친 것이 꺼짐).
- 순환 루틴(rotation)·로테이션 날(pick)·그룹 PT 루틴 형식은 위 data.js 형식 참고.
- "기억해요!" 문구(app.js QUOTES)는 종이 루틴일지 꼬리말(메모리 routine-log-code FOOTER_MSGS)과 똑같이 유지.

## 기능 지도 (한 줄씩 — 자세한 건 HISTORY에서 그 이름으로 grep)
- 아래 탭 = 홈 · 운동(#routine·#forms 전환 칸 wkSeg) · 식단 · 기록(#log) · 나(#goal·#notice). app.js TABS·tabOf·route.
- 홈: 출석 도장(attCheckStrip·setupAttCheck) → 오늘 운동 카드(todayHero) → 위젯(homeWidgets·homeInfo) → PT 여정 → 인바디 띠.
- 출석: 창고에 저장(attCall), 출석률·달력·게이지(attStats·attCalendar·attGauge). 종목 ✓하면 자동 출석(attAuto). 나 탭 02 출석 순위(rankSection, 선생님 페이지 rankPub가 pub:all:rank 저장, 이름 가운데 O).
- 운동 탭: 한눈에 루틴(#day, .ex-list.cmp) · 종목 ✓(.exchk → lgToggle, 회원은 오늘만·선생님은 이번 주 지난 날도 chkDate) · 종목 자세히 창(exSheet) · 요일 꾹 눌러 옮기기(mvSheet·mvMap, 이번 주만) · 복습지 부위 칩(formCats).
- 기록 탭(renderLog): 오늘 한 운동 · 첫날 vs 오늘(grData·#growth 카드) · 근육 지도(muscleSection·MG_RULES) · 인바디(ibPanel·ibParse·#body) · 월간 리포트(#report).
- 나 탭(renderGoal): 출석률·달력 → 출석 순위 → 배지 12개(badgeList·badgeCheck) → 12개월 여정(journeyChart·STAGES / 바프 모드 STAGES_BP·journeyChartBP·fit).
- 선생님 폰에서(COACH_MODE): 루틴 고치기(rt… 함수들, 창고 routine_save) · 다른 회원 루틴 가져오기 · 처음 무게 넣기(grSheet) · 회원 메모(memo.js, coach:memo:<주소>) · 출석 도장은 보기만.
- 알림: 새 공지 팝업(showNoticePop) · 전체 공지(bnotices) · 배지 팝업 · 아래 탭 점등(litApply) · 복습지 NEW.
- 화면 효과: 로딩 화면 · 화면 넘어갈 때 차례 등장(D안) · 뒤로 갈 땐 아까 화면 그대로(VCACHE) · 뒤로 버튼(navBackDraw) · 칸 접기(setupFold) · 플랜카드 통일(.hero·.rp-home) · 유리(블러) 효과 · 회원별 테마 스킨(skinDeco).
- 안내: 처음 둘러보기(tourSteps — 새 탭·칸이 생기면 한 줄 추가) · ⚙️ 설정 메뉴(gearMenu) · 앱으로 설치 안내(#app, renderInstall).
- 선생님 페이지(coach-tqqnlh/index.html, 회원에게 주소 보내지 말 것): 오늘 출석 카드 · 오늘 수업한 회원 · 회원 아이콘 목록(한 번 누르면 노트, 꾹 누르면 정보 창) · 출석왕(renderRank) · 전체 공지·새 회원 추가(창 .csh, nm… 함수들) · 아이패드 두 칸(body.pad) · 빨리 불러오기(snap·a=all). 회원 수는 사람 수(그룹 PT는 2명).
- PT 안내서(guide.html 폰 · intro.html 아이패드): 8장, 두 쪽 문구를 같게, 쪽마다 스크롤 없이 한 화면(390×844·375×667 확인), 숫자는 회원 data.js에서 자동, 회원 이름 가운데 O. 손님에게 보이는 곳에 '세일즈' 쓰지 말 것.
- 뼈대 키트: `python3 _tools/build_kit.py <출력 폴더>` — 회원 정보·개인 자료·JANG KAREDO 브랜드를 뺀 키트. 새 개인 정보 종류가 생기면 SECRETS·MEMBER_NAMES에 추가.

## 창고 범용 저장소 (2026-11-11 장동욱 "배포 귀찮다" → 앞으로 창고 재배포 줄이기)
- 시트 "저장소" 탭(이름·값(JSON)·기록시각). 새 기능의 저장은 되도록 이걸로 — Apps Script 코드를 안 바꾸면 재배포 필요 없음.
- 이름 규칙: `pub:all:…`(모든 회원 노트가 받음) · `pub:m:<회원주소>:…`(그 회원 노트가 받음) → 읽기 누구나, 쓰기 선생님 열쇠 / `mw:<회원주소>:…` = 회원 폰도 쓰기 가능(4KB 이하, 그 회원 주소로만) / 그 밖(`coach:…` 등) = 선생님 열쇠로만 읽기·쓰기(선생님 메모 같은 비공개).
- 회원 노트: 출석 GET 응답에 `kv`(pub:all:* + pub:m:<회원>:* + mw:<회원>:*). 선생님: POST kv_get {key, prefix} / kv_set {key?, k, v} 또는 {items:{k:v}} (v=null 지움, 한 번에 50개까지, 값 40KB까지).

## 창고 배포는 Claude가 (2026-11-11 장동욱 "배포 귀찮다, 권한 주면 너가 해")
- 장동욱 컴퓨터의 Claude 앱 내장 브라우저(built-in browser)에 구글 로그인돼 있음 → Claude가 직접 배포. 사용자에게 붙여넣기·배포를 시키지 말 것.
- 순서: 내장 브라우저로 Apps Script 프로젝트 "PT노트" 편집기 열기 https://script.google.com/home/projects/1r2_6XDT0aNK_H-hTDpQHkSNHsczGIKMX2wJ6G2JMC_IcbZL5F_6gfO1T/edit → javascript로 `monaco.editor.getModels()[0].pushEditOperations([], [{range: md.getFullModelRange(), text: CODE}], ()=>null)` (CODE = _tools/attendance_apps_script.gs 내용, JSON 문자열로) → 저장 아이콘 → 배포 ▾ → 배포 관리 → 연필 → 버전 "새 버전" → 배포. 배포 ID(AKfycbwtjTpk…)는 그대로라 사이트 주소 안 바꿔도 됨.
- 확인: github.io 탭에서 fetch(ATT_API+"?m=jihun-g9kgdo") 응답 키(ok·days·routine·bnotices·kv). 컴퓨터가 꺼져 있거나 로그인이 풀렸으면 그때만 장동욱에게 부탁.

- 창고 주소(ATT_API)는 assets/site.js·app.js·coach-tqqnlh/index.html에 있음 — 바꾸면 전부. 선생님 열쇠는 저장소에 넣지 말 것(RT_KEY_HASH 지문만).
- 지금 쓰는 저장소 키: `mw:<주소>:log`(운동 기록) · `mw:<주소>:mv`(요일 옮기기) · `pub:m:<주소>:growth`(처음 무게) · `pub:m:<주소>:member`(폰에서 만든 회원) · `pub:m:roster-list:members`(공개 회원 목록) · `pub:all:rank`(출석 순위) · `coach:members` · `coach:memo:<주소>`.

## 하지 말 것 (전에 사고 난 것들 — 이유는 HISTORY '아이폰 캐시 · 화면 잘림 대비'·'앱 화면')
- 본문(.view)에 transform·filter·zoom 효과 금지(누른 칸에서 커지는 B안은 꺼 둠 — 다시 켜지 말 것). 블러는 backdrop-filter로만, 오늘 운동 카드(.thero) 안쪽 블러 금지.
- `history.scrollRestoration = "manual"` 금지. `html{overflow-x:hidden}`+`body{clip}`·뷰포트 meta를 코드로 바꾸는 방식 다시 넣지 말 것.
- 새 칸·제목줄·위 막대에 뭘 넣으면 **375px에서 페이지 폭이 안 넓어지는지** 확인(scrollWidth). `.wrap`·`.view` width:100% 규칙 지우지 말 것.
- 영상을 넣는 칸은 화면을 떠날 때 멈추고 disablepictureinpicture·disableremoteplayback.
- 남의 캐릭터(치이카와 등)를 닮은 그림 금지 — 스킨 마스코트는 오리지널(토롱이·몽글이).
- 회원끼리·상담 손님에게 보이는 화면은 이름 가운데 글자 O. 새 비포애프터 사진은 동의받은 회원만.
- 파일 삭제·덮어쓰기 전에는 장동욱에게 먼저 확인.

## 고치고 올리기
- 필요한 부분만 grep·sed로 읽고, python 문자열 치환으로 고침. `node --check assets/app.js`.
- 확인: Playwright(iPhone 14)로 script.google.com을 목업해 오류·scrollWidth만, 화면은 바뀐 곳 1~2장. 실제 창고 저장은 목업이라 확인 못 함 → 답에 그렇게 말하기.
- **assets를 고쳤으면 커밋 전에 `python3 _tools/bump_ver.py`**(아이폰 홈 화면 앱 캐시).
- 커밋 작성자: gymtos-dodang <gymtos-dodang@users.noreply.github.com> → `git fetch origin main && git rebase origin/main && git push origin HEAD:main`. 반영까지 1~2분.
- 끝나면 회원에게 보낼 링크를 같이 답: `https://gymtos-dodang.github.io/m/<주소>/`(+ `#routine`·`#form-<id>` 등).
