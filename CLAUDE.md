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

## 작업별로 먼저 읽을 파일 (2026-11-16 토큰 아끼기 — 자세한 규칙은 여기로 옮김, 해당 작업 전에 꼭 Read)
| 작업 | 먼저 읽기 |
|---|---|
| 복습지 올리기(영상) | `_docs/RULES-form.md` (+ pt-form-add 스킬) |
| 새 회원 · 루틴 · 식단 · data.js 고치기 | `_docs/RULES-member-data.md` |
| 창고 저장·Apps Script 배포·저장소 키 | `_docs/RULES-store.md` |
| 사이트 기능 고치기 | 아래 '기능 지도' → `_docs/HISTORY.md` grep |

**꼭 지킬 것(요약)**: 복습지는 올리기 전에 "영상 순서·회원·종목" 표로 검수받기(ㅇㅋ 후 작업) · 루틴을 data.js로 고치기 전에 폰에서 고친 루틴이 있는지 먼저 묻기 · 새 회원은 PT 시작일 꼭 받기 · 창고 배포는 Claude가 내장 브라우저로(사용자에게 시키지 말 것).

## 구조
```
index.html / 404.html   첫 화면 / 폰에서 만든 회원(폴더 없음)을 창고에서 받아 띄움
assets/site.js          트레이너 이름·센터·사이트 주소·출석 창고 주소(att_api)
assets/app.js           data.js를 읽어 화면을 그림(해시 주소 #home #routine #forms #form-<id> #diet #log #goal #notice #body #growth #report #app)
assets/style.css        공통 디자인(data-sex M/F, data-skin) — 새 CSS는 맨 아래(DARK 블록 바로 위)에 블록으로
assets/exicons.js       움직이는 운동 아이콘(SVG) · assets/icons/M|F/ PNG 아이콘 · assets/memo.js 선생님 메모 창
m/<이름-랜덤6자>/        회원 노트: index.html(껍데기)·manifest.webmanifest·data.js(내용은 이 파일만)·og.jpg·media/form-<id>/
m/dyn/forms.js          폰에서 만든 회원의 복습지·공지(이름으로 붙임)
coach-tqqnlh/           선생님 페이지(index.html)·members.js(회원 주소 목록)·guide.html(PT 안내서 폰)·intro.html(아이패드)
_tools/                 anatomy_v4.py(해부도 — 2026-11-16 v4, 예전 v3 파일은 남겨 둠) · anatomy_hl.json(복습지별 강조 부위 기록) · regen_anatomy.py(모형을 바꾼 뒤 복습지 그림·근육 지도를 한 번에 다시 그림) · rebrand_jk.py(og.jpg·로고·아이콘) · bump_ver.py(?v= 올리기) · make_icons*.py · make_food.py·make_diet_web.py · make_member_icon.py · make_musclemap.py · make_sheep_skin.py · build_kit.py(다른 선생님용 키트 — _docs/HISTORY.md를 읽어 설명서를 만듦) · attendance_apps_script.gs(창고 코드) · exicons_sheet.html
_docs/HISTORY.md        자세한 기록(위 안내)
_docs/RULES-*.md        작업별 자세한 규칙(위 표)
```

## 회원 목록
| 회원 | 주소 | 성별 |
|---|---|---|
| 최지훈 | m/jihun-g9kgdo/ | M |
| 서경진 | m/kyeongjin-bkwzy9/ | F (복습지 1개 — 11-13 핵프레스) |
| 김지수 | m/jisu-480xne/ | F (토롱이 테마 + 돌아다니는 토끼 pet:"bunny" · 복습지 8개 — 11-12 촬영: 펙덱 플라이·케이블 체스트 프레스·체스트 프레스 머신) |
| 김태영 | m/taeyoung-k52qnx/ | M |
| 임애란 | m/aeran-bsq16i/ | F (순환 루틴) |
| 최용민 · 고은성 | m/yongmin-eunseong-1mwau5/ | M (그룹 PT — 두 분이 한 페이지·출석 공유) |
| 정미경 | m/mikyung-7rq2vd/ | F (토요일 엉덩이 = PT 수업 날) |
| 이지환 | m/jihwan-t7m4qe/ | M (바프 목표 — 여정 그래프 bodyprofile 모드) |
| 박찬영 | m/chanyoung-dvrara/ | M (토요일 = 로테이션, day.pick) |
| 이진영 | m/jinyoung-n73rzx/ | F (다이어트·근력 강화, 2026-06 시작 — 복습지 3개(11-08), 루틴·식단 아직 없음) |
| 서인석 | m/inseok-02j3ia/ | M (2026-07 시작, 주 4회 루틴 v2 — PT 주 3회지만 개인운동 안 나옴, 복습지 2개(11-10 촬영: 랫풀다운·뉴텍 시티드 로우 머신)) |
| 우유정 | m/yujeong-55pl5t/ | F (고양이 pet:"cat" · 바프 2027-04 말 촬영 — 이번 달 시작, 촬영일 맞춤 바프 그래프 fit · 루틴은 나중에 올림) |
| 조혜영 | m/hyeyoung-d74063/ | F (2026-07 시작 — 복습지 3개(11-10: 스미스 인클라인·펙덱·체스트프레스), 주 5회 힙업 루틴 v1(월·수·금 힙 A·B·C, 화 가슴·어깨, 목 등, 유산소 20분, 일반 여성 중량), 식단 아직 없음, goal은 임시 문구) |
| 어순래 | m/sunrae-c7yvid/ | F (2026-03 시작, 시니어, 주 6회 건강 관리 루틴 v1(2026-10-29 종이 루틴일지 그대로 — 월 하체·화 등·수 가슴·목 엉덩이·금 어깨·토 등·팔, 유산소 15분, 하체는 가볍게), 복습지 3개(11-10, 11-04 촬영: 펙덱 플라이·뉴텍 체스트 프레스 머신(라잉)·케이블 푸쉬다운), 식단 아직 없음, goal은 임시 문구) |
| 염승완 | m/n3mtw9sgw/ (폰에서 만든 회원) | M (2026-10 시작, 다이어트·운동 습관화 — 복습지는 m/dyn/forms.js, 11-14 고블릿 스쿼트) |
| 이준서 | m/nbpvstegb/ (폰에서 만든 회원) | M (2026-09 시작, 하체 강화·운동 취미) |
| 한동현 | (폰에서 만든 회원, 주소 모름) | M (복습지는 m/dyn/forms.js "한동현" — 404.html이 이름 끝이 같으면("동현") 붙임, 11-19 뉴텍 체스트 프레스·인클라인 프레스 머신) |

- **폰에서 만든 회원 찾기** (2026-11-16 장동욱 요청): 장동욱이 말한 이름이 위 표에 없으면, 내장 브라우저로 https://gymtos-dodang.github.io/ 탭을 열고 `fetch(ATT_API+"?m=roster-list")` → kv `pub:m:roster-list:members`([{slug,name,sex,goal,start}])에서 찾음. 찾으면 이 표에 "(폰에서 만든 회원)"으로 한 줄 추가해 둠(다음부터는 확인 없이 바로). 표에 있는 회원은 매번 확인하지 않음(토큰 아끼기). 컴퓨터가 꺼져 있으면 장동욱에게 물어봄.

## 기능 지도 (한 줄씩 — 자세한 건 HISTORY에서 그 이름으로 grep)
- 아래 탭 = 홈 · 운동(#routine·#forms 전환 칸 wkSeg) · 식단 · 기록(#log) · 나(#goal·#notice). app.js TABS·tabOf·route.
- 홈: 출석 도장(attCheckStrip·setupAttCheck) → 오늘 운동 카드(todayHero) → 출석 줄(homeWidgets: 출석률 링+연속 출석+이번 주를 한 칸 .hatt로 합치고 옆에 출석 순위 칸 rankHome — 2026-11-18) → 공지·최근 복습지 칸(homeInfo, 2026-11-18 PT 여정 위로 옮김, 순위 칸은 미니 가로 막대 .rkh-ch(위 3명+나 — 가린 이름·막대·횟수, 그룹 PT는 첫 이름만, 내 줄만 색) · #goal-rank로 · 계산은 rkCalc · 최근 복습지 칸은 아이콘 대신 최신 영상 미리보기 .hi-vid(form.webp, 없으면 poster.jpg)) → 인바디·식단 2칸(ibHomeStrip .hib, 2026-11-19 "인바디도 위 4개 칸처럼, 식단과 연결" — 왼쪽 인바디 #body 지난달 대비 골격근·체지방 kg, 오른쪽 내 식단 #diet 하루 kcal+탄단지 막대 dbCalc, 예전 가로 띠 .ibstrip은 안 씀) → PT 여정.
- 출석: 창고에 저장(attCall), 출석률·달력·게이지(attStats·attCalendar·attGauge). 종목 ✓하면 자동 출석(attAuto). 나 탭 02 출석 순위(rankSection, 선생님 페이지 rankPub가 pub:all:rank 저장, 이름 가운데 O).
- 운동 탭: 한눈에 루틴(#day, .ex-list.cmp) · 종목 ✓(.exchk → lgToggle, 회원은 오늘만·선생님은 이번 주 지난 날도 chkDate) · 종목 자세히 창(exSheet) · 요일 꾹 눌러 옮기기(mvSheet·mvMap, 이번 주만 — 꾹 → 원하는 요일 칸 고르기 .mv-days: 쉬는 날이면 그리로, 운동 날이면 서로 바꿈 · 쉬는 날 꾹은 운동 가져오기 · 매주 월요일 초기화) · 복습지 부위 칩(formCats).
- 식단 탭: 내 식단 짜기(dbBuilder, 2026-11-18 — 최근 인바디/직접 입력 → 목적 다이어트·유지·벌크·운동 횟수·끼니 수로 하루 칼로리·탄단지 계산 dbCalc → 끼니마다 탄수·단백질 음식을 고르면 양 계산 dbPick·DB_C·DB_P, 저장 mw:<주소>:diet) · 2026-11-19: 지방 칸 추가(끼니마다 3칸 .db-slots.s3, DB_F — 탄수·단백질 음식의 지방을 뺀 나머지 dbMeal fn) · 음식 31종(탄 12·단 14·지 5) · 양 어림 "약 2.5공기"·"한 끼엔 많아요"(dbHint, h·mx) · 음식 그림 v2 = `_tools/make_food2.py`(테두리 없는 부드러운 그림체 — 새 음식은 여기에 함수 추가, 예전 make_food.py는 종이 식단표용) · 한 칸에 음식 두 가지까지 반반(d.p[끼니][칸] = id 또는 [id, id], dbIds·dbMeal cs/ps/fs) · 고르기 창은 눌러 담고 다시 누르면 빠짐+"담기" 버튼·"전부 빼기", 끼니 칸 × 로 바로 빼기(rm) · "내 몸 초기화"(.db-reset, 두 번 눌러 확인 — 직접 넣은 키·체중·체지방만 지움, 인바디 기록은 그대로) · 목적 버튼 .db-seg는 플랜카드와 같은 그라데이션(--hero·--hero2·--hero3) · 음식마다 알기 쉬운 단위 h(약 2팩 · 1팩 = 100g, 손바닥 크기 1장 등 — 새 음식엔 h 꼭 넣기) · 소고기는 우둔살·홍두깨살(id beef)과 부채살(beef_fan, 그림은 img로 beef 같이 씀) · 기초대사량 입력 칸 없음(2026-11-19 "회원님이 안 적어도 되지 않나" — 결과지 사진에서 자동으로 읽고 없으면 계산, 결과 칸에만 표시, 다시 넣지 말 것) · 선생님이 짠 식단(data.js diet)이 있으면 탭 .db-tabs로 같이(renderDietCoach).
- 먹은 기록(2026-11-20 "식단칸에 사진으로 기록, 나도 회원님도, 음식·양·순탄수·단백질·지방·칼로리 분석, 따로 전환칸"): 식단 탭 전환 칸 세 번째 '먹은 기록'(DB_TAB "log", app.js mlView·mlCard·mlSheetOpen, CSS .ml-*). 창고 시트 "식단기록"+드라이브 "PT노트 식단 사진"(a=meal·meal_add·meal_del·meal_img·meal_ai). 창고가 새 버전(출석 응답 meal:1 → mlFlag)일 때만 칸이 보임 · 그룹 PT 노트는 안 씀 · 사진 자동 분석은 창고 스크립트 속성 AI_KEY가 있어야(없으면 직접 적기 · mi:키 Mistral 무료(Pixtral Large) / gsk_ Groq 무료 / cf:계정:토큰 Cloudflare 무료 / sk-ant Claude / AIza Gemini, 쉼표로 여러 개면 막힐 때 다음 것) — 열쇠는 저장소에 넣지 말 것 · 양(g)을 고치면 탄단지·kcal가 같은 비율로 바뀜 · 선생님 폰은 한마디(cm) 칸.
- 식단 가이드(2026-11-20 "탄단지 중요성·식이섬유·끼니 거르면 안 되는 이유·식단의 중요성, 전환칸"): 식단 탭 전환 칸 맨 끝 '식단 가이드'(DB_TAB "guide", app.js dgView, CSS .dg-*) — 모든 회원에게 보임, 바로 여는 주소 #diet-guide, 내용은 app.js에 고정(data.js 필요 없음) · 전환 칸이 4개면 .db-tabs.n4(글씨 작게, "선생님 식단").
- 기록 탭(renderLog): 오늘 한 운동 · 첫날 vs 오늘(grData·#growth 카드) · 근육 지도(muscleSection·MG_RULES) · 인바디(ibPanel·ibParse·#body) · 월간 리포트(#report).
- 복습지 본 기록(2026-11-19 "회원님들이 복습지 보면 본 거 알 수 있게"): 회원 폰이 #form-<id> 열면 창고 mw:<주소>:fv {v:{id:[처음,마지막,횟수]}} (app.js fvMark·fvServer·fvTag, 10분 안 재열기 안 셈, 선생님 폰·DEMO는 안 올림). 회원 카드 "✓ 봤어요" · 선생님 폰 카드 "👀 날짜·n번/아직 안 봄"(NEW 숨김)·상세 맨 위 .fvline · 선생님 페이지 회원 칸 "복습지 n개 · 봄 k"(fvCount).
- 이달의 출석왕 배지(2026-11-19 "한 달 동안 1등인 사람이 받는 배지", 출석 탭 16번째 king): 선생님 페이지 rankPub가 끝난 달마다 출석 1등(동점 모두)을 창고 pub:all:rankwin {w:{"YYYY-MM":[주소]}}로 올림(한 명이라도 출석 못 받아 오면 안 올림, _af) → app.js rkServer·rkWins·badgeList. 받은 날 = 다음 달 1일, 여러 번이면 숫자.
- 나 탭(renderGoal): 출석률·달력 → 출석 순위 → 배지 45개(2026-11-17: 그림체는 에나멜 핀(금선으로 나눈 칸에 쨍한 단색 — BG_EN 색 3가지·bgFields 무늬 6가지, 2026-11-17 7차) · 등급 없이 배지마다 모양(8가지 bgSh)·색 그라데이션·그림·효과가 다름(BG_ST 표·BG_PAL·BG_IC), 두께 있는 3D(좌우로 도는 건 뺌 — 다시 넣지 말 것)·누르면 한 바퀴(flip), 높은 단계(BG_ST 5번째 값 1~4)일수록 그라데이션이 깊고 은은한 빛이 돎, 숫자는 아래 작은 명찰, 출석·기록·성장 15개씩 5칸×3줄 + 몸 변화 9개(2026-11-19 — 인바디 쓰는 회원만 탭, 첫 인바디 ib1 + 감량 1~5kg ibl1~5: 인바디 기록을 바로 앞 측정과 비교해 체중이 n kg 이상 빠진 적이 있으면, 받은 날 = 그 측정일 · 최고급 누적 감량 10·15·20kg iblc10/15/20: 첫 인바디 대비, 감량 배지 그림은 bgLoss(b.art "loss" — 배지 가득 금선 내리막 언덕+금 화살표+큰 숫자, 명찰 없음)로 통일, sp(금 월계수)+보석 색 enk SP 금·SPR 루비·SPD 블랙 다이아(b.enk·b.spc·b.ink) · 성장 칸 ib1 자리는 자세 공부 3개 fv3), 한 칸에 탭 bgTab·.bgx, badgeList·bgIcon·showBadgePop, 누적은 창고 mw:<주소>:bg — 브론즈~레전드 등급은 없앰, 다시 넣지 말 것 · 전설 배지 "바프 완료"(bpBadge, 바프 회원만 성장 칸 맨 끝 — '함께 200일' 자리, 따로 띠로 빼지 말 것, data.js journey.bpDone:"촬영 날짜" 넣으면 획득) · **배지는 회원님이 한 일로만**(2026-11-17: 증량·무게%는 회원님이 ✓한 무게끼리 BGS.x, 루틴 레벨업·복습지 개수 배지 없앰 → 완벽한 한 주 pw·복습지 열어 보기 fv, 선생님 폰은 창고에 안 올림, 선생님 "배지 초기화" 버튼 .bgx-reset → 창고 rs — 선생님이 고쳐서 받아지는 배지는 만들지 말 것) · 배지 누르면 크게+받은 날·설명(bgDetail) · 주변 효과(2026-11-19 전체 다듬음: 가는 빛살 bgRaysFine·가는 월계관 bgWreath·부드러운 빛 번짐·가는 빛 링 .bxl — 예전 톱니 햇살·뭉툭한 잎으로 되돌리지 말 것) · 확대·획득 창 빛 효과 bgAura(후광+가는 빛살 두 겹+배지 효과별 연출: 불티·별·궤도·물결·빛 스침·빛망울·햇살 — 굵은 줄무늬 빛줄기 .bxp-rays는 안 씀) · 홈 맨 위 대표 배지 3개(글자 없이, 첫 번째만 조금 크게 — bgHomeChip·bgBest)) → 12개월 여정(journeyChart·STAGES / 바프 모드 STAGES_BP·journeyChartBP·fit).
- 선생님 폰에서(COACH_MODE): 루틴 고치기(rt… 함수들, 창고 routine_save — 2026-11-17 요일 정리 창 rtWeekSheet(두 날 서로 바꾸기·복사)·종목 ⋯ 창 rtMoreSheet(복제·맨 위/아래·다른 날로 옮기기/복사)·이날 무게/세트 한 번에 #dBulk · 꾹 눌러 끌기 rtDragDown~rtDragDrop: 종목 카드 끌어 순서·요일 칸에 놓으면 그날로, 요일 칸끼리 끌면 서로 바꿈 · 위 띠는 두 줄 아이콘 칸 .rtbar2) · 종목 고르기에 유산소 칸(RT_CARDIO·isCardio, 세트 ["20분", null] — 2026-11-18, 예전 마무리 유산소 체크도 그대로) · 2026-11-19: 유산소에 천국의 계단·마이마운틴 추가 · 종목 고르기 부위 칩 .rtp-f는 옆으로 밀지 않고 5칸 격자 두 줄(밀기 힘들다 — 다시 가로 스크롤로 되돌리지 말 것) · 다른 회원 루틴 가져오기 · 처음 무게 넣기(grSheet) · 회원 메모(memo.js, coach:memo:<주소>) · 출석 도장은 보기만.
- 알림: 새 공지 팝업(showNoticePop) · 전체 공지(bnotices) · 배지 팝업 · 아래 탭 점등(litApply) · 복습지 NEW.
- 화면 효과: 로딩 화면 · 화면 넘어갈 때 차례 등장(D안) + 누른 자리에서 색 원이 퍼졌다 사라짐(tapWave·.tapwave, 여 핑크레드·남 블랙, 2026-11-18 — body 위 막만 움직임, 본문 크기 바꾸는 B안은 여전히 금지) · 뒤로 갈 땐 아까 화면 그대로(VCACHE — 2026-11-18부터 아래 탭으로 3분 안에 본 화면에 갈 때도 그대로 붙이고 맨 위로, TABRET — 이때도 D안 차례 등장은 다시 켬(2026-11-18 "하단 탭 누르다 보면 전환효과 없어짐", 뒤로 버튼·밀어서 뒤로만 효과 없음) · 그사이 운동 ✓·요일 옮기기·루틴이 바뀌었으면(vSig2) 새로 그림) · 뒤로 버튼(navBackDraw) · 칸 접기(setupFold — 누르면 높이가 스르륵 접힘·펼쳐짐 foldAnim, 2026-11-16 · 선생님 페이지도 같음) · 플랜카드 통일(.hero·.rp-home) · 유리(블러) 효과 · 회원별 테마 스킨(skinDeco) · 돌아다니는 동물(data.js `pet: "cat"` 우유정님 고양이 / `pet: "bunny"` 김지수님 토롱이 깡충깡충, .petwalk — 2026-11-16 · 누르면 쓰담쓰담·밥 먹기·한마디 react/.petfx 2026-11-17 · 토롱이 친구 6마리·고양이 친구 5마리 날마다 랜덤 0~2마리·새 친구 팝업·꾹=도감 FR/petSpawn/frDex · 밤 0~6시 쿨쿨 petNight 2026-11-18).
- 다크모드(2026-11-18): 폰 설정 따라 자동 + ⚙️ 설정 "다크 모드 자동·켜기·끄기"(gearMenu .gm-theme → localStorage ptnote:theme → html[data-theme], themeApply). CSS는 style.css 맨 아래 DARK 블록 — **직접 고치지 말고** `_tools/dark_src.css`(손 규칙)를 고친 뒤 `python3 _tools/make_dark.py`(흰·연한 바탕을 자동으로 어둡게). **style.css에 새 칸을 넣으면 make_dark.py 다시 돌리기**(새 CSS는 DARK 블록 위에). 남자만 운동 아이콘 색 반전(.icn invert), 여자 아이콘은 그대로. 근육 지도는 다크용 바탕 그림 base-dark.png(_tools/make_musclemap_dark.py — base.png를 다시 만들면 이것도 다시)로 바꿔 보여 줌(.mm-lt/.mm-dk). 선생님 페이지(PT통합노트)도 다크(2026-11-19): 같은 make_dark.py가 coach-tqqnlh/index.html 안 <style> 끝 COACH-DARK 칸을 만듦(직접 고치지 말 것) — 손 규칙은 `_tools/dark_coach.css`, 선생님 페이지 CSS를 고치면 make_dark.py 다시 돌리기. 설정(ptnote:theme)도 같이 따름. ✓ 끝낸 종목 카드(.ex.done)·✓ 알림(.atttoast)은 원래 CSS가 !important·var(--ink) 바탕이라 dark_src.css에 손 규칙(2026-11-18 "종목 이름 하얀색").
- 안내: 처음 둘러보기(tourSteps — 새 탭·칸이 생기면 한 줄 추가) · ⚙️ 설정 메뉴(gearMenu — ⚙️ 한 번 누르면 열림·한 번 더 누르면 닫힘, 2026-11-18) · 앱으로 설치 안내(#app, renderInstall).
- 선생님 페이지(coach-tqqnlh/index.html, 회원에게 주소 보내지 말 것): 오늘 출석 카드 · 오늘 수업한 회원 · 회원 아이콘 목록(한 번 누르면 노트, 꾹 누르면 정보 창) · 출석왕(renderRank) · 전체 공지·새 회원 추가(창 .csh, nm… 함수들) · 아이패드 두 칸(body.pad) · 빨리 불러오기(snap·a=all). 회원 수는 사람 수(그룹 PT는 2명).
- PT 안내서(guide.html 폰 · intro.html 아이패드): 8장, 두 쪽 문구를 같게, 쪽마다 스크롤 없이 한 화면(390×844·375×667 확인), 숫자는 회원 data.js에서 자동, 회원 이름 가운데 O. 손님에게 보이는 곳에 '세일즈' 쓰지 말 것. · 2쪽 체험 폰(2026-11-19, coach-tqqnlh/guide/try.js PTTry — 폰 guide.html은 아이패드처럼 페이지 안에 inline(#tpInline: 기능 칩 6개 → 고민 말풍선·해결 제목 → 왼쪽 실제 폰·오른쪽 설명·단계 버튼, 2쪽이 보일 때 iframe 불러옴), 다른 쪽 .go 버튼은 아래에서 올라오는 창 sheet, 아이패드는 왼쪽 빨간 칸 .tprow 누르면 오른쪽 폰 mount): 실제 노트를 iframe `?demo&try`로 띄우고 설명+단계 버튼(누르면 iframe 안 그 칸으로 스크롤+빨간 테두리). app.js TRY = 눌러 봐도 이 기기 저장은 메모리, 창고는 읽기만(쓰기 fetch는 막고 ok) · COACH_MODE 끔.
- 움직이는 운동 아이콘 그림체(2026-11-18 리메이크, exicons.js shapes): 관절 구분선·이음새는 전부 뺌(직선·둥근 이음새·입체 빛줄 다 해 보고 뺌 — 다시 넣지 말 것) · 몸과 자극 부위는 위가 밝고 아래가 짙은 그라데이션(STY의 g, defs·stamp가 아이콘마다 다른 id로 넣음) · 자극 부위는 테두리 없이 진하게(opacity .8~1 — 테두리는 "옷 입은 것 같다"로 뺌) · 광배근은 등 가운데를 비우고 옆구리 쪽에 날개 두 장(latPolys — 가운데까지 덮으면 조끼처럼 보임, 안쪽 흰 결 선도 뺌, 다시 넣지 말 것) · 원판은 꽉 찬 원반+홈+허브(addEq: k "eq" 고리 r≥5.5는 자동으로 원판). · 유산소 움직이는 아이콘(2026-11-19 "기본 그림 말고 이름에 맞게"): treadmill(러닝머신·인터벌)·incline_walk(경사 걷기)·stair_mill(천국의 계단·스텝밀 — 계단이 돌아 내려옴)·my_mountain(마이마운틴 등산 머신, 작은 산)·bike·elliptical·rower — loop:1 + ex.at(t)(한 방향으로 계속 도는 움직임, gait·footAt·ik), 이름 연결은 app.js ICON_BY_NAME. 종이 루틴일지 PNG 아이콘은 그대로.
- 복습지 영상 정면/측면(2026-11-19 "영상 측면 추가"): data.js 복습지에 `views:[{label:"정면",file:"form"},{label:"측면",file:"side"}]` + 폴더에 side.mp4·side.webp·side-poster.jpg → 영상 위 .vw-seg 버튼. 폰 회원 복습지(m/dyn/forms.js)는 이름이 조금 달라도(성 빼기·"님") 한 명만 맞으면 붙음(404.html).
- 복습지 도구(2026-11-16): 기구 사진첩 `_tools/equip_album.py` → `_tools/equipment/sheet-<부위>.jpg`(기구 대조) · 관절 인식 `_tools/pose.py`(보조로만 — 2026-11-18부터 장면은 썸네일 시트 보고 직접, 벌리기·누운 종목엔 안 씀). 자세한 건 RULES-form.md.
- 뼈대 키트: `python3 _tools/build_kit.py <출력 폴더>` — 회원 정보·개인 자료·JANG KAREDO 브랜드를 뺀 키트. 새 개인 정보 종류가 생기면 SECRETS·MEMBER_NAMES에 추가.

## 하지 말 것 (전에 사고 난 것들 — 이유는 HISTORY '아이폰 캐시 · 화면 잘림 대비'·'앱 화면')
- 본문(.view)에 transform·filter·zoom 효과 금지(누른 칸에서 커지는 B안은 꺼 둠 — 다시 켜지 말 것). 블러는 backdrop-filter로만, 오늘 운동 카드(.thero) 안쪽 블러 금지.
- `history.scrollRestoration = "manual"` 금지. `html{overflow-x:hidden}`+`body{clip}`·뷰포트 meta를 코드로 바꾸는 방식 다시 넣지 말 것.
- 새 칸·제목줄·위 막대에 뭘 넣으면 **375px에서 페이지 폭이 안 넓어지는지** 확인(scrollWidth). `.wrap`·`.view` width:100% 규칙 지우지 말 것.
- 영상을 넣는 칸은 화면을 떠날 때 멈추고 disablepictureinpicture·disableremoteplayback.
- 남의 캐릭터(치이카와 등)를 닮은 그림 금지 — 스킨 마스코트는 오리지널(토롱이·몽글이).
- 회원끼리·상담 손님에게 보이는 화면은 이름 가운데 글자 O. 새 비포애프터 사진은 동의받은 회원만.
- 새 칸에 class `bar`·`bar-in` 이름 쓰지 말 것 — 위 막대(.bar = sticky top·z 20)라서 그 칸이 화면 위에 달라붙음(2026-11-17 출석 순위 막대가 위 막대를 뚫고 나온 사고 → .rk-bar로 바꿈, 선생님 페이지도).
- 파일 삭제·덮어쓰기 전에는 장동욱에게 먼저 확인.

## 고치고 올리기
- 필요한 부분만 grep·sed로 읽고, python 문자열 치환으로 고침. `node --check assets/app.js`.
- 확인: Playwright(iPhone 14)로 script.google.com을 목업해 오류·scrollWidth만, 화면은 바뀐 곳 1~2장. 실제 창고 저장은 목업이라 확인 못 함 → 답에 그렇게 말하기.
- **assets를 고쳤으면 커밋 전에 `python3 _tools/bump_ver.py`**(아이폰 홈 화면 앱 캐시).
- 커밋 작성자: gymtos-dodang <gymtos-dodang@users.noreply.github.com> → `git fetch origin main && git rebase origin/main && git push origin HEAD:main`. 반영까지 1~2분.
- 끝나면 회원에게 보낼 링크를 같이 답: `https://gymtos-dodang.github.io/m/<주소>/`(+ `#routine`·`#form-<id>` 등).
