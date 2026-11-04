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
assets/app.js         data.js를 읽어 화면을 그림 (아래 탭도 app.js가 그림: 홈·목표·루틴·복습지·식단·공지, 해시 주소 #home #goal #forms #form-<id> #routine #routine-mon~sun #diet #notice)
assets/icons/M|F/     루틴일지 운동 아이콘 (네이비/핑크, 192px). 종목명→아이콘은 app.js의 ICON_BY_NAME
assets/logo.png       GYMTOS 브러시드 메탈 로고 (무채색)
m/<이름-랜덤6자>/     회원 한 명의 PT 노트
  index.html          껍데기 (제목·og 태그에 회원 이름)
  data.js             회원 데이터 — 내용 수정은 이 파일만
  og.jpg              카톡 미리보기 그림 (얼굴 없음, 네이비/핑크 배경 + "OOO 회원님")
  media/form-<id>/    복습지 영상·그림
_tools/make_icons.py  아이콘 생성 (python3 make_icons.py assets/icons/M "#1F3864" / F "#C2185B")
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

## 새 회원 PT 노트 만들기
0. **PT 시작일을 꼭 받기** (장동욱이 말해줌, "10월"처럼 달만 주면 그 달 15일로). 안 알려주면 물어볼 것. → data.js journey.start
1. 주소: `m/<이름 로마자>-<랜덤 소문자·숫자 6자>/` (예: jisu-k3x9qa). 추측하기 어렵게.
2. `m/jihun-g9kgdo/index.html` 복사 → 제목·og:title·헤더 문구의 이름, og:image 경로, theme-color(여 #C2185B) 바꾸기.
3. data.js 작성 (아래 형식). sex "F"면 핑크 테마·핑크 아이콘 자동.
4. og.jpg 생성 (1200×630, 테마색 배경 + 로고 + "MY PT NOTE · 나만의 운동 노트" + "OOO 회원님" + 아래 띠 "GYMTOS 도당점 · 담당 장동욱 트레이너").
5. 위 회원 목록 표에 추가.

## data.js 형식
- name, sex("M"/"F"), goal, journey{start:"YYYY-MM-DD"} (PT 시작일 — 있으면 홈에 '나의 PT 여정' 요약·목표 탭(#goal) 내용이 나옴, 없으면 숨김), notices[{date,title,body,link?}] (최신이 위), next_class(문자열 또는 null), diet(null이면 "준비 중")
- forms[] (최신이 위): id, dir("media/form-<id>/"), date, exercise, exercise_en, part, targets[], benefit, key_point, good_points[3]{title,desc}, primary_muscles[{name,where}], secondary_muscles, feel_good, feel_stop, steps[3]{title,desc,chip,media,loop?}, do[3], dont[3]
- routine: version, updated, title, plan[3], key_point, note, cardio{minutes,options}, days[{day:"월"…"일", part, en, cardio:bool, rest?, cardio_only?(분, 유산소만 하는 날 · items:[] · note?), items[{name,en,tag?("메인"/"워밍업"/"선행"),tip,sets[[횟수,kg],…],form?,icon?}]}] — 횟수 자리에 "30초" 같은 글자, kg 자리에 null(=맨몸)도 됨
- 복습지·루틴을 새로 올리면 notices 맨 위에 공지 한 줄 추가.

## PT 여정 (2026-11-03 장동욱 요청)
- 회원과 1~12개월 함께 가는 느낌. 3단계: 1단계 기초(1~2개월: 머신 사용법·스트레칭·근육 이해) / 2단계 변화(2~7개월: 자신감·어느 순간 몸의 변화·머신 투어·반복 숙달) / 3단계 자립(7~12개월: 혼자서도·프리웨이트·다음 목표 또는 졸업).
- 홈에는 '나의 PT 여정' 요약(그래프+지금 단계), 자세한 건 '목표' 탭(#goal: 회원 goal 문구, 그래프, 3단계 카드).
- 단계 문구는 app.js의 STAGES. 그래프 선은 '몸의 변화·자신감' 개념 곡선(실측 아님, 회원마다 속도 다름 안내).

## 출석 체크 (2026-11-04 장동욱 요청)
- 홈 제목 카드 오른쪽 "오늘 출석" 상자(안 눌렀을 때 LED처럼 은은하게 깜빡임). 누르면 출석, 한 번 더 누르면 취소.
- 목표 탭 맨 위: 01 출석률(게이지·이번 달·연속·누적) → 02 출석 달력(지난달 넘기기) → 03 12개월 그래프 → 04 단계별 목표.
- 출석률 = 출석한 날 ÷ 루틴상 운동하는 날(쉬는 날 제외). 집계 시작 = PT 시작일·att_since·2026-11-04 중 가장 늦은 날.
- 기록 저장: 장동욱 구글 계정의 Apps Script 웹 앱(app.js의 ATT_API). 시트 "PT노트 출석" > "출석" 탭에 회원주소·이름·날짜·시간 한 줄씩. 코드는 _tools/attendance_apps_script.gs
  - 선생님은 회원 주소로 들어가면 회원이 누른 출석이 그대로 보임(선생님이 누르면 그 회원 출석으로 기록됨).
  - 창고에 못 닿으면 휴대폰에만 임시 저장 후 "인터넷 연결 확인" 안내.

## 자세 복습지 미디어 만들기 (영상 1개 기준)
- 웹 영상: `ffmpeg -i in.mov -an -vf "scale=540:-2,fps=30" -c:v libx264 -preset veryfast -crf 27 -pix_fmt yuv420p -movflags +faststart form.mp4`
- 카톡 대비 움직이는 그림: `-vf "scale=324:-2,fps=10" -c:v libwebp_anim -loop 0 -quality 40 form.webp`
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
