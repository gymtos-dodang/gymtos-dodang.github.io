# 자세 복습지 올리기 · 미디어 만들기

> CLAUDE.md에서 옮겨 온 자세한 규칙(2026-11-16, 토큰 아끼기). 이 작업을 할 때 이 파일을 먼저 읽을 것.

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

