# 새 회원 · data.js 형식 · 루틴/식단 규칙

> CLAUDE.md에서 옮겨 온 자세한 규칙(2026-11-16, 토큰 아끼기). 이 작업을 할 때 이 파일을 먼저 읽을 것.

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

## 루틴 규칙 (루틴일지 v2.7과 같음)
- 워밍업 → 메인(피라미드 15·12·10·8, 금색) → 나머지. 하체 날은 레그 익스텐션 워밍업 → 이너·아웃타이 선행 → 메인.
- 머신·케이블은 뉴텍 5kg 단위, 덤벨 2kg 단위(한 손 무게).

- **data.js로 루틴을 고치기 전에, 폰에서 고친 루틴이 있는지 장동욱에게 먼저 물어볼 것**(data.js 루틴의 version|updated가 바뀌면 폰에서 고친 것이 꺼짐).
- 순환 루틴(rotation)·로테이션 날(pick)·그룹 PT 루틴 형식은 위 data.js 형식 참고.
- "기억해요!" 문구(app.js QUOTES)는 종이 루틴일지 꼬리말(메모리 routine-log-code FOOTER_MSGS)과 똑같이 유지.

