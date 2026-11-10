# GYMTOS 도당점 PT 노트 (회원 개인 홈페이지)

장동욱 트레이너(짐토스 도당점)의 회원별 PT 노트 사이트. 깃허브 페이지로 공개: https://gymtos-dodang.github.io
답변은 항상 한국어로.

## 운영 원칙 (2026-11-03 장동욱 요청)
- "OO 회원님 자세 복습지 / 루틴 / 식단 만들어줘" → 이제 결과물은 **그 회원의 PT 노트에 최신화**하는 것.
- 그 회원 PT 노트가 없으면 **새로 만들고** 거기에 적용. 끝나면 회원 주소를 알려줌.
- 수정 후에는 커밋 → `git push` (main). 반영까지 1~2분.
- (2026-11-03 요청) PT 노트를 만들거나 고치면 **회원님께 보낼 링크를 항상 같이** 보냄: `https://gymtos-dodang.github.io/m/<주소>/` (특정 화면은 끝에 `#routine`, `#form-<id>` 등).

## 구조
```
index.html            짐토스 안내용 첫 화면 (회원 목록 없음)
robots.txt, .nojekyll 검색 차단 / Jekyll 끔
assets/style.css      공통 디자인 (남 네이비 / 여 핑크, data-sex 로 분기)
assets/app.js         data.js를 읽어 화면을 그림 (아래 탭도 app.js가 그림: 홈·목표·루틴·복습지·식단·공지, 해시 주소 #home #goal #body(몸변화) #forms #form-<id> #routine #routine-mon~sun #diet #notice)
assets/exicons.js     움직이는 운동 아이콘(SVG) — PT 노트 화면은 이걸 먼저 씀 (아래 '움직이는 운동 아이콘')
assets/icons/M|F/     루틴일지 운동 아이콘 PNG (네이비/핑크, 192px). 종목명→아이콘은 app.js의 ICON_BY_NAME — exicons.js에 없는 이름(rest·treadmill 등)과 종이 루틴일지는 이 PNG
assets/logo.png       GYMTOS 브러시드 메탈 로고 (무채색)
m/<이름-랜덤6자>/     회원 한 명의 PT 노트
  index.html          껍데기 (제목·og 태그에 회원 이름)
  data.js             회원 데이터 — 내용 수정은 이 파일만
  og.jpg              카톡 미리보기 그림 (얼굴 없음, 네이비/핑크 배경 + "OOO 회원님")
  media/form-<id>/    복습지 영상·그림
_tools/make_icons.py  아이콘 생성 (python3 make_icons.py assets/icons/M "#1F3864" / F "#C2185B")
_tools/make_icons_smith.py 추가 아이콘만 그림: smith_bench_press·smith_row·smith_shoulder_press·smith_shrug·band_push_up(랙 안전바에 건 밴드를 손으로 쥐고)·incline_db_curl (2026-11-05)
_tools/make_food.py   종이 식단표 음식 그림 코드 (메모리 diet-log-code-2와 같음)
_tools/make_diet_web.py PT 노트 식단 탭 그림 → assets/food/<음식>.png + assets/food/M|F/ic_<끼니>.png
_tools/make_logo.py   로고 생성
_tools/anatomy_v3.py  인체모형 v3 (자극 부위 그림). build(경로, 앞 강조, 뒤 강조, sex="M"/"F")
```

## 회원 목록
| 회원 | 주소 | 성별 |
|---|---|---|
| 최지훈 | m/jihun-g9kgdo/ | M |
| 서경진 | m/kyeongjin-bkwzy9/ | F |
| 김지수 | m/jisu-480xne/ | F |
| 김태영 | m/taeyoung-k52qnx/ | M |
| 임애란 | m/aeran-bsq16i/ | F (순환 루틴) |
| 최용민 · 고은성 | m/yongmin-eunseong-1mwau5/ | M (그룹 PT — 두 분이 한 페이지·출석 공유) |
| 정미경 | m/mikyung-7rq2vd/ | F (토요일 엉덩이 = PT 수업 날) |
| 이지환 | m/jihwan-t7m4qe/ | M (바프 목표 — 여정 그래프 bodyprofile 모드) |
| 박찬영 | m/chanyoung-dvrara/ | M (토요일 = 로테이션, day.pick) |
| 이진영 | m/jinyoung-n73rzx/ | F (다이어트·근력 강화, 2026-06 시작 — 복습지 3개(11-08), 루틴·식단 아직 없음) |
| 서인석 | m/inseok-02j3ia/ | M (2026-07 시작, 주 4회 루틴 v2 — PT 주 3회지만 개인운동 안 나옴) |
| 우유정 | m/yujeong-55pl5t/ | F (바프 2027-04 말 촬영 — 이번 달 시작, 촬영일 맞춤 바프 그래프 fit · 루틴은 나중에 올림) |
| 조혜영 | m/hyeyoung-d74063/ | F (2026-07 시작 — 복습지 3개(11-10: 스미스 인클라인·펙덱·체스트프레스), 주 5회 힙업 루틴 v1(월·수·금 힙 A·B·C, 화 가슴·어깨, 목 등, 유산소 20분, 일반 여성 중량), 식단 아직 없음, goal은 임시 문구) |

## 새 회원 PT 노트 만들기
0. **PT 시작일을 꼭 받기** (장동욱이 말해줌, "10월"처럼 달만 주면 그 달 15일로). 안 알려주면 물어볼 것. → data.js journey.start
1. 주소: `m/<이름 로마자>-<랜덤 소문자·숫자 6자>/` (예: jisu-k3x9qa). 추측하기 어렵게.
2. `m/jihun-g9kgdo/index.html` 복사 → 제목·og:title·헤더 문구의 이름, og:image 경로, theme-color(여 #C2185B) 바꾸기.
3. data.js 작성 (아래 형식). sex "F"면 핑크 테마·핑크 아이콘 자동.
4. og.jpg 생성 (1200×630, 테마색 배경 + 로고 + "MY PT NOTE · 나만의 운동 노트" + "OOO 회원님" + 아래 띠 "GYMTOS 도당점 · 담당 장동욱 트레이너").
5. 위 회원 목록 표에 추가하고, coach-tqqnlh/members.js에도 주소 추가.

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

## 그룹 PT (2026-11-05 장동욱 요청)
- 그룹 PT는 페이지 하나를 같이 씀: name "A · B", 주소 m/<이름1>-<이름2>-<랜덤6>/, 출석도 한 줄(같이 오니까).
- og.jpg 문구 "MY PT NOTE · 함께하는 그룹 PT 노트", 위 막대는 "A·B 그룹 PT 노트"로 짧게.
- 루틴 tip에 파트너 운동 느낌(번갈아 1세트씩, 쉬는 쪽이 보조·횟수 세기). routine.cardio: null이면 유산소 줄이 안 나옴. (최용민·고은성 v3부터 유산소 15분 — 무릎 때문에 천국의 계단 X)

## PT 여정 (2026-11-03 장동욱 요청)
- 회원과 1~12개월 함께 가는 느낌. 3단계: 1단계 기초(1~2개월: 머신 사용법·스트레칭·근육 이해) / 2단계 변화(2~7개월: 자신감·어느 순간 몸의 변화·머신 투어·반복 숙달) / 3단계 자립(7~12개월: 혼자서도·프리웨이트·다음 목표 또는 졸업).
- 홈에는 '나의 PT 여정' 요약(그래프+지금 단계), 자세한 건 '목표' 탭(#goal: 회원 goal 문구, 그래프, 3단계 카드).
- 단계 문구는 app.js의 STAGES. 그래프 선은 '몸의 변화·자신감' 개념 곡선(실측 아님, 회원마다 속도 다름 안내).
- 그래프 움직임 (2026-11-06 "시안D로 가자"): 화면 열 때마다 지금까지 선이 그려지고 → '지금 여기' 점이 톡 → 이름표 → 앞으로 갈 점선이 깃발 쪽으로 계속 흐름 + 깃발 펄럭 + 점에서 물결. style.css의 .jc-done·.jc-pop·.jc-lab·.jc-ahead·.jc-sonar·.jc-wave.
- **바프 모드** (2026-11-05, 이지환님 — 바디프로필이 목표라 의지가 큰 회원만 특별하게): data.js `journey: { start, mode: "bodyprofile", shoot?: "YYYY-MM-DD" }`.
  - 단계는 app.js의 STAGES_BP: 1단계 기초(0~2개월) → 2단계 벌크·근육 꽉 채우기(2~8개월) → 3단계 컷팅·바프 완성(8~12개월, 16주 컷팅).
  - **여성 회원은 핑크 골드** (2026-11-09 우유정님 "여성 회원인 핑크 골드 컨셉으로"): sex "F"면 패널이 진한 로즈·와인 그라데이션 + 금색 테두리·띠(style.css `:root[data-sex="F"] .jpanel.bp`), 카메라 선 색은 --bp-ink. 남성은 네이비 골드 그대로.
  - 그래프는 진한 네이비+금색 패널: 근육(금색 실선)·체지방(분홍 점선) 두 줄, 선이 갈라지는 곳 "몸이 선명해지는 순간", 끝에 카메라 D-DAY. 개념 그래프(실측 아님).
  - 움직이는 그라데이션 (2026-11-08 요청): 패널 배경 천천히 흐름(bpBg) · 근육 선 금빛이 흐르는 SVG 그라데이션(<animateTransform>) · 선 아래 금색 빛 + 반짝이는 띠가 촬영 쪽으로 쓸고 지나감 · 앞길 점선·체지방 점선 흐름 · 지금 점 물결 · 카메라 빛 · 띠 글자 반짝. app.js journeyChartBP(defs) + style.css .bp-done·.bp-area·.bp-ahead·.bp-flow·.bp-sonar·.bp-glow·bpShine. 움직임 줄이기 설정이면 전부 멈춤.
  - **촬영일 맞춤** (2026-11-09, 우유정님 — 4월 말 촬영처럼 12개월보다 짧을 때): `journey: { start, mode: "bodyprofile", shoot, fit: true }` → 그래프·단계가 시작일~촬영일 길이(N개월)에 맞춰짐. 3단계 컷팅 = 촬영 전 16주(짧으면 6주까지 줄임), 1단계 기초 = 전체의 18%(0.75~2개월), 사이가 2단계 벌크. 단계 기간은 "11월 초 ~ 12월 초"처럼 달로, 눈금은 시작·OO월·OO월·촬영. 곡선은 12개월 모양을 단계별로 늘이고 줄임(app.js jWarp·JFIT·JT). 선생님 페이지·PT 안내서(guide·intro)의 개월차·단계도 같은 규칙(jFit). fit 없으면 기존 12개월 그대로(이지환님).
  - 홈 제목 "나의 바프 여정", 위에 BODY PROFILE 띠 — shoot(촬영일)을 넣으면 D-숫자 카운트다운, 없으면 "촬영 날짜는 선생님과 정해요".

## 출석 체크 (2026-11-04 장동욱 요청)
- 홈 제목 카드 오른쪽 "오늘 출석" 상자(안 눌렀을 때 LED처럼 은은하게 깜빡임). 누르면 출석, 한 번 더 누르면 취소.
- 목표 탭: 01 출석률 · 출석 달력(2026-11-08 한 칸으로 합침 — 위 게이지·이번 달·연속·누적, 점선 아래 달력·지난달 넘기기, #att) → 02 나의 배지 → 03 12개월 그래프 → 04 단계별 목표. (몸 변화 기록은 '몸변화' 탭, 근육 지도는 '루틴' 탭)
- 출석률 게이지(2026-11-08): 링·숫자 모두 그라데이션(좋음 초록 / 조금만 더 주황 / 낮음 빨강 / 시작 전 테마색→분홍, style.css --g1·--g2), 100%면 숫자 작게(.gnum.full). 공용 .good 상자 모양이 게이지에 씌워지지 않게 막아 둠.
- 출석률 = 출석한 날 ÷ 루틴상 운동하는 날(쉬는 날 제외). 집계 시작 = PT 시작일·att_since·2026-11-04 중 가장 늦은 날.
- 기록 저장: 장동욱 구글 계정의 Apps Script 웹 앱(app.js의 ATT_API). 시트 "PT노트 출석" > "출석" 탭에 회원주소·이름·날짜·시간 한 줄씩. 코드는 _tools/attendance_apps_script.gs
  - 선생님은 회원 주소로 들어가면 회원이 누른 출석이 그대로 보임(선생님이 누르면 그 회원 출석으로 기록됨).
  - 창고에 못 닿으면 휴대폰에만 임시 저장 후 "인터넷 연결 확인" 안내.

## 몸 변화 기록 · 인바디 (2026-11-06 장동욱 요청)
- 아래 메뉴 '몸변화' 탭(#body, 목표 다음 — 2026-11-06 "목표항목에서 따로 빼볼까"): 01 지난달 vs 이번 달(비교표·올리기) → 02 한눈에 보는 흐름(최근 12개 기록 골격근량·체지방량·체지방률·체중 작은 선 그래프, 기록 2개부터) → 03 정확하게 재는 법(팁 5개).
- 회원이 '몸변화' 탭에서 "이번 달 인바디 올리기" → 결과지 사진(선택) + 측정일 + 체중·골격근량·체지방량(비우면 체중×체지방률 자동)·체지방률.
- 비교: 가장 최근 기록 vs 그보다 앞선 달의 마지막 기록. 골격근 ↑ 초록, 체지방 ↓ 초록, 반대는 빨강, 체중은 색 없음. 한 줄 요약 문구(ibSummary). 지난 기록 목록에서 결과지 사진 보기·삭제(두 번 눌러야 삭제).
- 홈 '나의 PT 여정' 아래 한 줄 띠(지난달보다 골격근 ±·체지방 ±) → 몸변화 탭으로.
- 저장: 출석과 같은 Apps Script(ATT_API) — 시트 "인바디" 탭(회원주소·이름·측정일·숫자 4개·사진ID·기록ID), 사진은 구글 드라이브 "PT노트 인바디 사진" 폴더. 업로드는 POST(본문 JSON), 보기 a=inbody, 사진 a=inbody_img, 삭제 a=inbody_del. 코드 _tools/attendance_apps_script.gs (doPost 추가) — **코드를 바꾸면 Apps Script에서 '배포 관리 → 수정 → 새 버전'으로 다시 배포해야 반영**.
- 창고가 옛 버전이면(응답에 inbody 없음) "곧 열려요"로 표시. 그룹 PT 페이지(이름에 ·)와 data.js inbody:false 인 회원은 숨김(몸변화 탭 자체가 없음).
- 선생님 보기에서도 올리기·삭제 가능(수업 때 대신 올려줄 수 있게).
- 결과지 자동 읽기(OCR, 2026-11-06): 사진을 고르면 창고에 POST a=inbody_ocr → Apps Script가 구글 드라이브 OCR(Drive API 고급 서비스 — 편집기 왼쪽 '서비스 +'에서 Drive API 추가 필요)로 글자만 돌려줌 → app.js ibParse가 체중·골격근량·체지방량·체지방률·검사일 찾아 빈 칸만 채움(분홍 테두리 = 자동, 회원이 확인 후 저장). 표준 범위(a~b)는 건너뛰고 체지방량은 체중×체지방률로 검산. 숫자 찾는 규칙은 ibParse만 고치면 됨(창고 재배포 불필요).

## 출석 배지 · 근육 지도 · 월간 리포트 (2026-11-08 장동욱 "이렇게 ㄱㄱ" — 디자인 캔버스 "PT 노트 재미 기능 시안")
- 코드는 app.js의 badgeList·bgIcon·badgeSection·badgeCheck / muscleCounts·mmFigure·muscleSection / reportData·reportCard·renderReport. 출석 기록(출석 창고)·인바디·루틴에서 자동 계산.
- **배지 12개** (목표 탭 02, 주소 #goal-badges): 첫 출석·출석 10(Lv.1)·30(Lv.2)·50(Lv.3)·100(Lv.4) / 연속 3(Lv.1)·7(Lv.2)·14(Lv.3) / 새벽 운동(7시 전 출석)·주말 전사(같은 주말 토·일 둘 다) / 첫 인바디(그룹 PT·inbody:false면 대신 연속 30, Lv.4) / 루틴 레벨업(루틴 v2 이상, 날짜 = routine.updated).
  - '연속'은 운동하는 날을 빠짐없이 나온 횟수(쉬는 날은 안 끊김, 순환 루틴은 3일 넘게 비면 끊김) — 그래서 "연속 7회"로 씀.
  - 등급 그림: Lv.1 한 줄 테두리 → Lv.2 두 겹 → Lv.3 금빛 월계수 → Lv.4 금빛 바탕+리본+반짝. 못 받은 배지는 같은 모양 회색. 링은 SVG(이미지 저장에도 그대로).
  - LED 효과(2026-11-08 "단계가 올라갈수록 LED, 움직이는 그라데이션"): 받은 배지만. Lv.1 없음 → Lv.2 금빛이 은은하게 숨쉬듯(.bdg-glow) → Lv.3 더 밝게 + 동그라미 위로 빛줄기가 지나감(.bdg-fx) → Lv.4 바깥 테두리가 금·분홍 그라데이션으로 돌고(.bdg-ring) 금빛↔분홍 빛 + 별 두 개 반짝(.bdg-spark). 움직임 줄이기 설정이면 멈춘 빛만. 리포트 이미지 저장 때는 .bdg-fx·.bdg-ring 빼고 찍음.
  - 새 배지 팝업: 출석 창고에서 기록을 받은 뒤·출석 누른 뒤·인바디 올린 뒤 확인, 배지마다 한 번(localStorage ptnote:<주소>:badges). 여러 개면 등급 높은 것 하나 + "외 n개". 선생님 보기·PT 안내서 보기에서는 안 뜸. 새 공지 팝업이 떠 있으면 기다렸다가.
- **근육 지도** (루틴 탭 맨 아래 03, #muscle — 2026-11-08 "루틴 항목에 넣는 게 컨셉에 맞지"로 목표 탭에서 옮김): 출석한 날의 루틴(주간 = 그 요일, 순환 = 그 전까지 출석 수로 DAY 순서, 로테이션·쉬는 날·유산소만 날은 셈 안 함) 종목 이름 → 부위 8개(가슴·등·어깨·팔·복근·허벅지·엉덩이·종아리) — 규칙은 MG_RULES(종목명), 못 찾으면 MG_PART(부위명). 1~2회 / 3~4회 / 5회 이상 진하게. 이번 달·지난달 바꾸기, TOP3, "아직 하얀 곳"(루틴엔 있는데 이번 달 안 한 부위).
  - 그림: assets/muscle/M|F/base.png + 부위별 투명 그림 8장 (`python3 _tools/make_musclemap.py`, 인체모형 v3). 새 부위를 넣으면 GROUPS·MG 둘 다.
- **월간 리포트** (#report = 이번 달 진행 중, #report-YYYY-MM — 근육 지도 오른쪽 위 "OO월 리포트 →", 아래 탭은 루틴): 1080×1350 카드(남녀 같은 네이비) — 출석·출석률·최고 연속·새 배지 / 근육 지도 / 인바디(그 달 마지막 기록 vs 그 전 기록, 그룹 PT는 제일 많이 한 부위) / 이번 달 받은 배지 / 한마디. "이미지로 저장 · 공유" = html2canvas(cdnjs 1.4.1) → 공유 시트, 안 되면(카톡 안) 그림을 띄워 길게 눌러 저장.
  - 선생님 한마디: data.js에 `reports: { "2026-11": "이번 달 등 운동이 제일 성실했어요.\n다음 달엔 종아리까지!" }` → "장동욱 트레이너의 한마디". 없으면 자동 한 줄 요약.
  - 매달 1~7일 홈 맨 위 "OO월 리포트가 도착했어요" 카드(지난달 출석이 있을 때만).

## 움직이는 운동 아이콘 (2026-11-10 장동욱 "시안D로 가자")
- assets/exicons.js: 종목마다 관절 좌표(0~100) 두 자세 p0(시작)·p1(끝)만 적으면 사람(테마색)·기구(회색)·**자극 부위(남 분홍 / 여 네이비)**를 SVG로 그리고 두 자세 사이를 계속 반복(SMIL animate, 2.8초: 멈춤 → 힘 줘서 빠르게 → 멈춤 → 천천히 돌아옴). 자극 부위는 힘 줄 때 진해짐.
- app.js img(key, cls, still): EXI.has(key)면 SVG, 아니면 예전 PNG. 루틴 탭 종목 카드·홈 '오늘 할 운동' 큰 아이콘은 움직이고, 작은 칸(일주일 한눈에·홈 종목 목록)은 멈춘 그림(still). 휴대폰 '동작 줄이기'면 전부 멈춘 그림.
- 회원 index.html에 `<script src="../../assets/exicons.js">`가 app.js 앞에 있음(없는 옛 껍데기는 app.js가 뒤늦게 불러와 다시 그림).
- 루틴에 쓰는 종목 전부 + 별칭. 아이콘 이름은 PNG와 같음(bench_press, lat_pulldown …).
- 2026-11-10 장동욱 수정 요청으로 정한 것:
  - **사이드 레터럴 레이즈 머신 = 스탠딩**(도당점엔 스탠딩만 있음): 종목 이름을 "사이드 레터럴 레이즈 머신" 하나로 통일(예전 "레터럴 레이즈 머신"·"머신 레터럴 레이즈"), 아이콘 lateral_raise_standing(뒤에 기둥 + 팔 패드). lateral_raise_machine은 같은 그림.
  - "시티드 레터럴 레이즈"(덤벨, 등받이 없는 벤치) = seated_lateral_raise (PNG 대비 그림도 assets/icons/M|F/에 있음).
  - "시티드 로우 머신" → **"뉴텍 시티드 로우 머신"**으로 이름 변경(회원 data.js 전부). 김태영님 "시티드 로우"만 그대로.
  - 펙덱 · 리버스 펙덱은 **위에서 본 모습**(화면 위가 앞): 펙덱 = 등받이가 뒤, 팔을 앞으로 모음, 가슴 강조 / 리버스 = 가슴 패드가 앞, 팔을 뒤로 벌림, 등·어깨 뒤 강조.
  - 케이블 풀오버 = 케이블을 **등지고 앞을 보고** 머리 위에서 앞·아래로 당김(스트레이트 암 풀다운은 케이블을 마주 보고).
  - 해머스트렝스 로우로우(low_row) = 가슴 패드 + 위에서 내려온 지렛대(원판)를 낮은 곳에서 골반 쪽으로. 뉴텍 버티컬 풀다운(vertical_pulldown) = 옆모습, 머리 위 손잡이를 당기면 뒤쪽 원판이 올라감.
  - "머신 인클라인 프레스" → **"인클라인 프레스 머신"**으로 이름 변경(회원 data.js), 아이콘 incline_machine_press는 등받이·상체 **45도**, 손잡이를 등받이와 직각으로 밀어 올림(팔이 몸통 앞을 지나서 자극 부위를 팔 아래에 그림 — bones 안 {hlHere:1}).
  - 앞모습 종목은 mir()로 좌우 대칭 — 기본 자세의 오른쪽 값이 안 따라가 랫풀다운·이너타이가 비뚤던 버그 고침.
- **새 종목 추가**: exicons.js의 EX에 한 칸 추가 — 비슷한 종목을 복사해 좌표만 고침(옆모습 SIDE: head·sh·hip·kn·ft·toe·el·ha / 앞모습 FRONT: …L만 적고 mir()로 좌우 대칭). arcs = 관절을 축으로 도는 부위(팔꿈치 축으로 도는 손 등), fx = 따라 움직이는 점 계산, hl = 자극 부위, back/front = 기구(몸 뒤/앞). 그다음 `_tools/exicons_sheet.html`(시작·끝·움직임 확인판, ?sex=F ?only=이름)을 열어 두 자세를 눈으로 확인하고 app.js ICON_BY_NAME에 종목 이름 연결.

## 새 공지 팝업 (2026-11-05 장동욱 요청)
- data.js notices 맨 위에 새 공지를 올리면, 회원이 PT 노트를 열 때 화면 위에서 팝업이 내려왔다가 약 5초 뒤 사라짐(위로 밀어도 닫힘). 누르면 공지 탭의 그 공지로 이동해 반짝 표시.
- 공지 하나당 팝업은 한 번만. 공지 탭을 열기 전까지 아래 '공지' 탭에 빨간 점. 14일 넘은 공지는 새 공지로 안 침.
- 공지 구분은 date + title. 기록은 회원 휴대폰(localStorage)에만 → 다른 폰·브라우저로 열면 다시 뜸. 코드는 app.js의 showNoticePop.

## 선생님 페이지 (2026-11-05 장동욱 요청)
- 주소: https://gymtos-dodang.github.io/coach-tqqnlh/ (선생님만 아는 주소, 회원에게 보내지 말 것). 홈 화면에 추가하면 앱 하나("PT노트 쌤")로 모든 회원 PT 노트에 들어감.
- 구성: 오늘 한눈에(오늘 출석·미출석·담당 회원 수) → 회원 카드(오늘 "출석"+초록 LED·시간 / "미출석"(빨강) / 쉬는 날, 이번 달 출석 횟수, 마지막 출석, 루틴 버전, 복습지 수, 바로가기 홈·출석·목표·루틴·복습지).
- 회원 목록 위 검색칸(스크롤해도 위에 붙음): 이름 일부·초성(ㅊㅈㅎ) 검색 + 전체/출석/미출석 거르기 칩(개수 표시).
- 회원 목록은 coach-tqqnlh/members.js — **새 회원 PT 노트를 만들면 여기에도 주소 추가**.
- 선생님 페이지를 한 번 연 휴대폰(localStorage ptcoach)에서는 회원 페이지 위에 "← 회원 목록" 버튼이 생기고, 출석 상자는 보기 전용(눌러도 안 바뀜).
- 출석 창고 주소(ATT_API)가 app.js와 coach-tqqnlh/index.html 두 곳에 있음 — 바꾸면 둘 다.

## PT 안내서 (2026-11-06 장동욱 요청, 처음 이름 "세일즈북" → "대놓고 세일즈한다 느낌"이라 PT 안내서로 바꿈 — 손님에게 보이는 곳에 '세일즈' 쓰지 말 것)
- 워크인·OT 상담 때 선생님 폰으로 넘겨 보여주는 화면: https://gymtos-dodang.github.io/coach-tqqnlh/guide.html (선생님 페이지 맨 위 분홍 "PT 안내서 열기" 카드, 옛 주소 sales.html은 guide.html로 넘겨줌). 디자인 시안은 Claude 디자인 캔버스 "PT 세일즈북 시안"(A 5장 + B 관리 현황).
- **폰·아이패드 둘 다 8장·같은 문구** (2026-11-07): 1 표지·트레이너 소개(자격 3갈래) → 2 이런 고민 → PT 노트로 해결(폰: 2×3 칸, 칸마다 잘리지 않는 2:1 실제 화면 그림 guide/t3-*.jpg(화면 부품을 통째로 찍은 것 — 잘린 조각 X) + 분홍 "보기 →", 누르면 아무 회원 실제 노트) → 3 12개월 계단(3단계 다음 목표 = 바디프로필·대회 도전·혼자 운동 졸업) + 첫 달 → 4 남성 비포애프터 + 인바디 → 5 여성 비포애프터 → **6 지금 관리 현황(자동, "다시 넣어줘")** — 담당 회원·루틴 업데이트·복습지·식단 숫자, 최근 관리 기록 4줄, 회원별 단계 칩 → 7 가격(10~100회 막대) → 8 상담 안내(연락처). ✎ = 담당 회원 수(비우면 자동) + 연락처, 기기마다 localStorage ptsales에 따로 저장(폰 버전·아이패드 버전 둘 다 ✎ 있음). **쪽마다 스크롤 없이 한 화면**(.in.fit, 760px 이하는 @media로 더 줄임, 작은 폰은 2쪽 아래 띠 숨김) — 내용 바꾸면 390×844·375×667에서 넘치는지 확인. 한쪽을 고치면 다른 쪽도 같은 문구로 맞출 것.
- "실제로 보기" 버튼(.go data-go=routine/form/diet/goal/body/home): 그 내용이 있는 회원 중 아무나 골라 /m/<주소>/#탭 으로 이동. 이동 전 sessionStorage "ptdemo"=안내서 주소#p쪽 → 회원 PT 노트(app.js DEMO)는 이름 가운데 글자 O로 가림(제목·위 막대·화면 글자 전부), 위 막대 "← PT 안내서"(그 쪽으로 돌아옴), 새 공지 팝업 안 띄움. 선생님 페이지·안내서를 열면 ptdemo 지움. 회원 주소 끝에 ?demo 를 붙여도(예 /m/jihun-g9kgdo/?demo#routine) 이름만 가림 — 가로형 소개 슬라이드 "보기 →" 링크가 이걸 씀.
- 사진은 coach-tqqnlh/guide/ (trainer·ba-m1·ba-m2·ba-w1·ba-w2·inbody·rv017~026). 옛 소개 PPT에서 뽑은 것.
- 자격(2026-11-06 기준): FISAF 국제트레이너 2급, 케틀벨 트레이닝 교육과정 / RTS 재활트레이닝전문가 LEVEL.1·2(한국인재교육원), red재활기능운동(마인드바디 아카데미), 디스크 케어 전문 과정, 스포츠 테이핑 / 스포츠 영양학·생리학 교육이수. 경력: 전) 짐토스 답십리점 → 현) 짐토스24 도당점.
- **폰 버전 / 아이패드 버전** (2026-11-07): guide.html = 폰(세로 8쪽), coach-tqqnlh/intro.html = 아이패드·컴퓨터(가로 8장, 1920×1080을 화면에 맞춰 줄임, 밀어서·화살표로 넘김, #p쪽).
  - guide.html은 가로로 넓은 화면(폭 900 이상 & 가로)이면 intro.html로 자동 이동. 위 "아이패드"/"폰 버전" 버튼으로 바꾸면 localStorage ptview(pad/phone)에 기억해서 그걸 따름.
  - intro.html 6장 "지금 관리 현황"은 사이트에만 있음(회원 data.js로 자동 계산, Claude 슬라이드에는 없음). 나머지 내용 = Claude 슬라이드 "장동욱 트레이너 소개"(claude.ai/artifact/QPmNobe3gEZXDgTPowKWcf)를 그대로 옮긴 것 — 슬라이드를 고치면 intro.html도 다시 옮길 것(슬라이드 파일을 읽어 /_blob 그림 → guide/ 파일, aside 빼고, [자리표시] 문구 정리). "보기 →"는 ptdemo로 실제 회원 노트(이름 가림) → "← PT 안내서"로 그 쪽에 돌아옴. 연락처는 폰 버전 ✎ 값(ptsales.contact).
- **포인트 그라데이션** (2026-11-08 시안 B "약간 움직이는 그라데이션 느낌으로"): 배경은 그대로, 볼 곳에만 — 제목 글자(네이비/흰색 사이로 분홍빛이 9초에 한 번 천천히 지나감), 분홍 칸(상담 띠·관리 현황 끝 띠·'오늘 시작' 등)·100회 막대에 빛이 6초 흐름, 계단 위→아래 진해짐, 금색 '다음 목표' 칩 반짝, 나머지 가격 막대·숫자 칸은 살짝 광. 폰 guide.html·아이패드 intro.html 둘 다(@keyframes gflow, intro는 인라인 색으로 골라 씀). 움직임 줄이기 설정이면 멈춤.
- 숫자·기록은 members.js 회원들의 data.js에서 자동 계산: 담당 회원 = 이름 수(그룹은 2명), 루틴 업데이트 = 루틴 버전 숫자 합, 복습지 수, 맞춤 식단 수, 최근 관리 기록 = notices(“PT 노트가 열렸어요” 제외) 최신 8개, 회원별 현황 = 단계·개월차·주 n회·루틴 버전·복습지·식단.
- 상담 손님에게 보이는 화면이라 회원 이름은 가운데 글자를 O로 가림(공지 제목 속 이름도). 비포애프터 사진은 옛 소개 PPT에 쓰던 것만(새 사진은 동의받은 회원만).
- "✎ 고치기": 담당 회원 수(비우면 자동), 등록 혜택, 연락처 — 그 휴대폰 localStorage(ptsales)에만 저장. 혜택·연락처가 비어 있으면 그 줄이 안 보임.

## 자세 복습지 미디어 만들기 (영상 1개 기준)
- 웹 영상: `ffmpeg -i in.mov -an -vf "scale=540:-2,fps=30" -c:v libx264 -preset veryfast -crf 27 -pix_fmt yuv420p -movflags +faststart form.mp4`
- 카톡 대비 움직이는 그림: `-vf "scale=324:-2,fps=10" -c:v libwebp_anim -loop 0 -quality 40 form.webp`
- 아이폰 영상이 HDR(HLG, 10bit)이면 먼저 SDR로 바꾸기: `-vf "zscale=t=linear:npl=203,format=gbrpf32le,zscale=p=bt709,tonemap=tonemap=hable:desat=0,zscale=t=bt709:m=bt709:r=tv,format=yuv420p"` (안 하면 색이 허옇게 뜸)
- poster.jpg (첫 장면 720px), step1.jpg (시작 자세 정지 화면), step2/3.webp (내리기·올리기 구간 1.8초, 288px, fps 12, quality 50)
- anatomy.png: 인체모형 v3 (`_tools/anatomy_v3.py`, 메모리 anatomy-v3-code 1·2와 같은 코드), 주동근 PRIMARY / 보조근 SECOND
  - 로우·풀다운 계열: 앞 {biceps, forearm: SECOND} / 뒤 {lat: PRIMARY, teres_major·rhomboid·trap_mid·delt_post·forearm: SECOND}
- 복습지 구성은 종이 복습지(2026-10 리메이크)와 같음: 히어로+KEY POINT → 01 영상 → 02 잘한 점 3개 → 03 자극 부위 → 04 동작 3단계 → 05 O·X. 트레이너 코멘트·숫자 타일·느낌 체크는 넣지 않음.

## 루틴 규칙 (루틴일지 v2.7과 같음)
- 워밍업 → 메인(피라미드 15·12·10·8, 금색) → 나머지. 하체 날은 레그 익스텐션 워밍업 → 이너·아웃타이 선행 → 메인.
- 머신·케이블은 뉴텍 5kg 단위, 덤벨 2kg 단위(한 손 무게).

## "기억해요!" 문구 (2026-11-04 장동욱 요청)
- 모든 화면 아래 "기억해요!" 띠 문구 = app.js의 QUOTES, 화면 열 때마다 랜덤.
- 루틴일지 꼬리말 문구(build_log.js FOOTER_MSGS, 메모리 routine-log-code)와 **똑같이 유지**. 루틴일지 문구를 추가·수정하면 여기 QUOTES도 같이 고칠 것.
- 맨 아래 3개(복습지용)는 PT 노트에만 있는 문구.

## 커밋
작성자: gymtos-dodang <gymtos-dodang@users.noreply.github.com>
