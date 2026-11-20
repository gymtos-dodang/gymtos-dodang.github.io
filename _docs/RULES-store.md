# 창고(Apps Script) 저장소 · 배포

> CLAUDE.md에서 옮겨 온 자세한 규칙(2026-11-16, 토큰 아끼기). 이 작업을 할 때 이 파일을 먼저 읽을 것.

## 창고 범용 저장소 (2026-11-11 장동욱 "배포 귀찮다" → 앞으로 창고 재배포 줄이기)
- 시트 "저장소" 탭(이름·값(JSON)·기록시각). 새 기능의 저장은 되도록 이걸로 — Apps Script 코드를 안 바꾸면 재배포 필요 없음.
- 이름 규칙: `pub:all:…`(모든 회원 노트가 받음) · `pub:m:<회원주소>:…`(그 회원 노트가 받음) → 읽기 누구나, 쓰기 선생님 열쇠 / `mw:<회원주소>:…` = 회원 폰도 쓰기 가능(4KB 이하, 그 회원 주소로만) / 그 밖(`coach:…` 등) = 선생님 열쇠로만 읽기·쓰기(선생님 메모 같은 비공개).
- 회원 노트: 출석 GET 응답에 `kv`(pub:all:* + pub:m:<회원>:* + mw:<회원>:*). 선생님: POST kv_get {key, prefix} / kv_set {key?, k, v} 또는 {items:{k:v}} (v=null 지움, 한 번에 50개까지, 값 40KB까지).

## 창고 배포는 Claude가 (2026-11-11 장동욱 "배포 귀찮다, 권한 주면 너가 해")
- 장동욱 컴퓨터의 Claude 앱 내장 브라우저(built-in browser)에 구글 로그인돼 있음 → Claude가 직접 배포. 사용자에게 붙여넣기·배포를 시키지 말 것.
- 순서: 내장 브라우저로 Apps Script 프로젝트 "PT노트" 편집기 열기 https://script.google.com/home/projects/1r2_6XDT0aNK_H-hTDpQHkSNHsczGIKMX2wJ6G2JMC_IcbZL5F_6gfO1T/edit → javascript로 `monaco.editor.getModels()[0].pushEditOperations([], [{range: md.getFullModelRange(), text: CODE}], ()=>null)` (CODE = _tools/attendance_apps_script.gs 내용, JSON 문자열로) → 저장 아이콘 → 배포 ▾ → 배포 관리 → 연필 → 버전 "새 버전" → 배포. 배포 ID(AKfycbwtjTpk…)는 그대로라 사이트 주소 안 바꿔도 됨.
- 확인: github.io 탭에서 fetch(ATT_API+"?m=jihun-g9kgdo") 응답 키(ok·days·routine·bnotices·kv). 컴퓨터가 꺼져 있거나 로그인이 풀렸으면 그때만 장동욱에게 부탁.

- 창고 주소(ATT_API)는 assets/site.js·app.js·coach-tqqnlh/index.html에 있음 — 바꾸면 전부. 선생님 열쇠는 저장소에 넣지 말 것(RT_KEY_HASH 지문만).
- 지금 쓰는 저장소 키: `mw:<주소>:log`(운동 기록) · `mw:<주소>:mv`(요일 옮기기) · `mw:<주소>:diet`(내 식단 짜기) · `pub:m:<주소>:growth`(처음 무게) · `pub:m:<주소>:member`(폰에서 만든 회원) · `pub:m:roster-list:members`(공개 회원 목록) · `pub:all:rank`(출석 순위) · `coach:members` · `coach:memo:<주소>`.


- 먹은 기록(2026-11-20): 시트 "식단기록" 탭(회원주소·이름·날짜·끼니·음식 JSON·kcal·사진ID·작은사진·기록ID·기록시각·쓴사람·메모·선생님한마디) + 드라이브 "PT노트 식단 사진". 사진 자동 분석 meal_ai는 스크립트 속성 `AI_KEY`(mi:<키> = Mistral 무료·Pixtral Large · gsk_… = Groq 무료 · cf:<계정ID>:<토큰> = Cloudflare 무료 · sk-ant… = Claude · AIza… = Gemini, 쉼표로 여러 개 = 앞에서부터, 막히면 다음 것), `AI_MODEL`(선택)로 동작, 회원 한 명 6시간에 20장까지. 열쇠는 Apps Script 프로젝트 설정에만.
