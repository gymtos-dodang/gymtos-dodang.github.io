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
assets/icons/M|F/     루틴일지 운동 아이콘 (네이비/핑크, 192px). 종목명→아이콘은 app.js의 ICON_BY_NAME
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

## 새 회원 PT 노트 만들기
0. **PT 시작일을 꼭 받기** (장동욱이 말해줌, "10월"처럼 달만 주면 그 달 15일로). 안 알려주면 물어볼 것. → data.js journey.start
1. 주소: `m/<이름 로마자>-<랜덤 소문자·숫자 6자>/` (예: jisu-k3x9qa). 추측하기 어렵게.
2. `m/jihun-g9kgdo/index.html` 복사 → 제목·og:title·헤더 문구의 이름, og:image 경로, theme-color(여 #C2185B) 바꾸기.
3. data.js 작성 (아래 형식). sex "F"면 핑크 테마·핑크 아이콘 자동.
4. og.jpg 생성 (1200×630, 테마색 배경 + 로고 + "MY PT NOTE · 나만의 운동 노트" + "OOO 회원님" + 아래 띠 "GYMTOS 도당점 · 담당 장동욱 트레이너").
5. 위 회원 목록 표에 추가하고, coach-tqqnlh/members.js에도 주소 추가.

## data.js 형식
- name, sex("M"/"F"), goal, journey{start:"YYYY-MM-DD"} (PT 시작일 — 있으면 홈에 '나의 PT 여정' 요약·목표 탭(#goal) 내용이 나옴, 없으면 숨김), notices[{date,title,body,link?}] (최신이 위), next_class(문자열 또는 null), diet(null이면 "준비 중", 문자열이면 그대로, 객체면 아래 식단 형식)
- forms[] (최신이 위): id, dir("media/form-<id>/"), date, exercise, exercise_en, part, targets[], benefit, key_point, good_points[3]{title,desc}, primary_muscles[{name,where}], secondary_muscles, feel_good, feel_stop, steps[3]{title,desc,chip,media,loop?}, do[3], dont[3]
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

## 그룹 PT (2026-11-05 장동욱 요청)
- 그룹 PT는 페이지 하나를 같이 씀: name "A · B", 주소 m/<이름1>-<이름2>-<랜덤6>/, 출석도 한 줄(같이 오니까).
- og.jpg 문구 "MY PT NOTE · 함께하는 그룹 PT 노트", 위 막대는 "A·B 그룹 PT 노트"로 짧게.
- 루틴 tip에 파트너 운동 느낌(번갈아 1세트씩, 쉬는 쪽이 보조·횟수 세기). routine.cardio: null이면 유산소 줄이 안 나옴. (최용민·고은성 v3부터 유산소 15분 — 무릎 때문에 천국의 계단 X)

## PT 여정 (2026-11-03 장동욱 요청)
- 회원과 1~12개월 함께 가는 느낌. 3단계: 1단계 기초(1~2개월: 머신 사용법·스트레칭·근육 이해) / 2단계 변화(2~7개월: 자신감·어느 순간 몸의 변화·머신 투어·반복 숙달) / 3단계 자립(7~12개월: 혼자서도·프리웨이트·다음 목표 또는 졸업).
- 홈에는 '나의 PT 여정' 요약(그래프+지금 단계), 자세한 건 '목표' 탭(#goal: 회원 goal 문구, 그래프, 3단계 카드).
- 단계 문구는 app.js의 STAGES. 그래프 선은 '몸의 변화·자신감' 개념 곡선(실측 아님, 회원마다 속도 다름 안내).
- 그래프 움직임 (2026-11-06 "시안D로 가자"): 화면 열 때마다 지금까지 선이 그려지고 → '지금 여기' 점이 톡 → 이름표 → 앞으로 갈 점선이 깃발 쪽으로 계속 흐름 + 깃발 펄럭 + 점에서 물결. style.css의 .jc-done·.jc-pop·.jc-lab·.jc-ahead·.jc-sonar·.jc-wave (바프 그래프는 아직 그대로).
- **바프 모드** (2026-11-05, 이지환님 — 바디프로필이 목표라 의지가 큰 회원만 특별하게): data.js `journey: { start, mode: "bodyprofile", shoot?: "YYYY-MM-DD" }`.
  - 단계는 app.js의 STAGES_BP: 1단계 기초(0~2개월) → 2단계 벌크·근육 꽉 채우기(2~8개월) → 3단계 컷팅·바프 완성(8~12개월, 16주 컷팅).
  - 그래프는 진한 네이비+금색 패널: 근육(금색 실선)·체지방(분홍 점선) 두 줄, 선이 갈라지는 곳 "몸이 선명해지는 순간", 끝에 카메라 D-DAY. 개념 그래프(실측 아님).
  - 홈 제목 "나의 바프 여정", 위에 BODY PROFILE 띠 — shoot(촬영일)을 넣으면 D-숫자 카운트다운, 없으면 "촬영 날짜는 선생님과 정해요".

## 출석 체크 (2026-11-04 장동욱 요청)
- 홈 제목 카드 오른쪽 "오늘 출석" 상자(안 눌렀을 때 LED처럼 은은하게 깜빡임). 누르면 출석, 한 번 더 누르면 취소.
- 목표 탭 맨 위: 01 출석률(게이지·이번 달·연속·누적) → 02 출석 달력(지난달 넘기기) → 03 12개월 그래프 → 04 단계별 목표. (몸 변화 기록은 2026-11-06 '몸변화' 탭으로 따로 뺌)
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

## 세일즈북 (2026-11-06 장동욱 요청)
- 워크인·OT 상담 때 선생님 폰으로 넘겨 보여주는 화면: https://gymtos-dodang.github.io/coach-tqqnlh/sales.html (선생님 페이지 맨 위 분홍 "세일즈북 열기" 카드). 디자인 시안은 Claude 디자인 캔버스 "PT 세일즈북 시안"(A 5장 + B 관리 현황).
- 6쪽 가로 넘기기: 1 표지(담당 회원·루틴 업데이트·자세 복습지 숫자) → 2 관리 방식 6가지 → 3 PT 노트 미리보기(예시 회원 김OO) → 4 12개월 여정 → 5 첫 달 흐름 + 등록 혜택·연락처 → 6 지금 관리 현황(자동).
- 숫자·기록은 members.js 회원들의 data.js에서 자동 계산: 담당 회원 = 이름 수(그룹은 2명), 루틴 업데이트 = 루틴 버전 숫자 합, 복습지 수, 맞춤 식단 수, 최근 관리 기록 = notices(“PT 노트가 열렸어요” 제외) 최신 8개, 회원별 현황 = 단계·개월차·주 n회·루틴 버전·복습지·식단.
- 상담 손님에게 보이는 화면이라 회원 이름은 가운데 글자를 O로 가림(공지 제목 속 이름도). 몸 변화(인바디) 전후 사례는 동의받은 회원만 — 아직 넣지 않음.
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
