/* 최용민 · 고은성 회원님 그룹 PT 노트 데이터 — 이 파일만 고치면 페이지 내용이 바뀜 */
/* 그룹 PT라 두 분이 한 페이지를 같이 봄 (출석도 한 줄로 같이). 2026-11-05 */
/* 최용민님 무릎 부상으로 하체 없이 상체만 · 유산소 없음. 스미스·덤벨 위주, 파트너가 번갈아 1세트씩 */
window.MEMBER = {
  name: "최용민 · 고은성",
  sex: "M",                       // M = 네이비, F = 핑크
  since: "2026. 11",
  goal: "그룹 PT · 상체 근력 · 주 5회",
  journey: { start: "2026-10-15" },   // PT 시작일 (장동욱: 10월부터 → 15일로 둠)

  /* 공지 (최신이 위) */
  notices: [
    { date: "2026. 11. 5", title: "그룹 PT 노트가 열렸어요",
      body: "두 분이 같이 보는 PT 노트예요. 월~금 주 5회 상체 루틴(v1)이 올라왔어요. 둘이 번갈아 1세트씩, 쉬는 사람이 보조! 운동 온 날 홈에서 '오늘 출석'을 눌러주세요.", link: "routine" }
  ],
  /* 다음 수업 (없으면 null) */
  next_class: null,

  /* 자세 복습지 (최신이 위) */
  forms: [],

  routine: {
    version: "v1",
    updated: "2026. 11. 5",
    title: "주 5회 · 상체 파트너 루틴",
    plan: ["월~금 상체 5분할", "둘이 번갈아 1세트씩 · 쉬는 쪽이 보조", "토·일은 푹 쉬고 잘 먹기"],
    key_point: "파트너 세트가 내 휴식! 서로 횟수 세주고 자세 봐주기",
    note: "스미스 무게는 봉 빼고 원판만 더한 무게 · 덤벨은 한 손 무게 · 하체·유산소는 무릎 회복될 때까지 쉬어요",
    cardio: null,
    days: [
      { day: "월", part: "가슴·삼두", en: "Chest · Triceps", cardio: false, items: [
        { name: "펙덱 플라이", en: "Pec Deck Fly", tag: "워밍업", tip: "가볍게 가슴 풀기", sets: [[20, 25], [15, 30]] },
        { name: "스미스 벤치프레스", en: "Smith Bench Press", tag: "메인", tip: "파트너가 봉 옆에서 보조", sets: [[15, 30], [12, 30], [10, 35], [8, 40]] },
        { name: "인클라인 덤벨 프레스", en: "Incline DB Press", tip: "윗가슴으로 밀기", sets: [[12, 16], [12, 16], [12, 16]] },
        { name: "덤벨 오버헤드 익스텐션", en: "DB Overhead Ext", tip: "양손으로 덤벨 하나, 팔꿈치 고정", sets: [[12, 16], [12, 16], [12, 16]] }
      ]},
      { day: "화", part: "등", en: "Back", cardio: false, items: [
        { name: "스트레이트 암 풀다운", en: "Straight Arm Pulldown", tag: "워밍업", tip: "팔 펴고 광배로 누르기", sets: [[20, 20], [15, 25]] },
        { name: "스미스 벤트오버 로우", en: "Smith Bent-over Row", tag: "메인", tip: "가슴 펴고 배꼽 쪽으로 당기기", sets: [[15, 30], [12, 30], [10, 35], [8, 40]] },
        { name: "원암 덤벨 로우", en: "One Arm DB Row", tip: "파트너가 한쪽씩 횟수 세기", sets: [[12, 22], [12, 22], [12, 22]] },
        { name: "랫풀다운", en: "Lat Pulldown", tip: "팔꿈치로 당기기", sets: [[12, 45], [12, 45], [12, 45]] },
        { name: "덤벨 슈러그", en: "DB Shrug", tip: "어깨를 귀 쪽으로, 1초 멈춤", sets: [[15, 24], [15, 24], [15, 24]] }
      ]},
      { day: "수", part: "어깨", en: "Shoulder", cardio: false, items: [
        { name: "사이드 레터럴 레이즈", en: "Lateral Raise", tag: "워밍업", tip: "어깨 으쓱 금지", sets: [[20, 4], [15, 6]] },
        { name: "스미스 숄더 프레스", en: "Smith Shoulder Press", tag: "메인", tip: "앉아서, 봉은 턱 앞까지만", sets: [[15, 15], [12, 15], [10, 20], [8, 20]] },
        { name: "사이드 레터럴 레이즈", en: "Lateral Raise", tip: "팔꿈치로 들어 올리기", sets: [[15, 8], [15, 8], [15, 8]] },
        { name: "리버스 펙덱", en: "Reverse Pec Deck", tip: "날개뼈 모으며 옆으로", sets: [[15, 25], [15, 25], [15, 25]] }
      ]},
      { day: "목", part: "팔", en: "Arm", cardio: false, items: [
        { name: "케이블 푸쉬다운", en: "Cable Pushdown", tag: "워밍업", tip: "팔꿈치 옆구리 고정", sets: [[20, 15], [15, 20]] },
        { name: "스미스 클로즈그립 벤치프레스", en: "Smith Close-grip Bench", tag: "메인", tip: "어깨너비 그립, 팔꿈치 몸통에 붙여", sets: [[15, 20], [12, 20], [10, 25], [8, 30]] },
        { name: "덤벨 컬", en: "DB Curl", tip: "팔꿈치 고정", sets: [[12, 12], [12, 12], [12, 12]] },
        { name: "해머 컬", en: "Hammer Curl", tip: "엄지가 위로", sets: [[12, 12], [12, 12], [12, 12]] },
        { name: "덤벨 오버헤드 익스텐션", en: "DB Overhead Ext", tip: "팔꿈치 귀 옆에 고정", sets: [[12, 16], [12, 16], [12, 16]] }
      ]},
      { day: "금", part: "가슴·등", en: "Chest · Back", cardio: false, items: [
        { name: "스미스 인클라인 프레스", en: "Smith Incline Press", tag: "메인", tip: "쇄골 쪽으로 내리기, 파트너 보조", sets: [[15, 25], [12, 25], [10, 30], [8, 30]] },
        { name: "플랫 덤벨프레스", en: "Flat DB Press", tip: "덤벨은 가슴 옆까지", sets: [[12, 18], [12, 18], [12, 18]] },
        { name: "스미스 벤트오버 로우", en: "Smith Bent-over Row", tip: "가슴 펴고 배꼽 쪽으로 당기기", sets: [[12, 35], [12, 35], [12, 35]] },
        { name: "원암 덤벨 로우", en: "One Arm DB Row", tip: "파트너가 한쪽씩 횟수 세기", sets: [[12, 22], [12, 22], [12, 22]] },
        { name: "플랭크", en: "Plank", tip: "파트너가 시간 재주기", sets: [["40초", null], ["40초", null], ["40초", null]] }
      ]},
      { day: "토", part: "휴식", en: "Rest", rest: true, items: [] },
      { day: "일", part: "휴식", en: "Rest", rest: true, items: [] }
    ]
  },

  /* 식단표 (없으면 null) */
  diet: null
};
