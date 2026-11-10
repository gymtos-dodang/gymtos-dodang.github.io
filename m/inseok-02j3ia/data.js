/* 서인석 회원님 홈페이지 데이터 — 이 파일만 고치면 페이지 내용이 바뀜 */
window.MEMBER = {
  name: "서인석",
  sex: "M",                       // M = 네이비, F = 핑크
  since: "2026. 11",
  goal: "근력 · 근육량 키우기",
  journey: { start: "2026-07-15" },   // PT 시작일 (장동욱: 7월 → 15일로 둠)

  /* 공지 (최신이 위) */
  notices: [
    { date: "2026. 11. 8", title: "새 주 4회 루틴이 올라왔어요", link: "routine",
      body: "가슴 · 등 · 하체 · 어깨팔, 주 4회 루틴이에요. 수업 없는 날도 루틴대로 혼자 나와서 해보세요! 메인 종목은 금색이에요." },
    { date: "2026. 11. 8", title: "PT 노트가 열렸어요",
      body: "서인석 회원님만의 운동 노트예요! 앞으로 주간 루틴·자세 복습지·식단을 여기로 올려드릴게요. 운동 오신 날은 홈에서 '오늘 출석'을 꼭 눌러주세요." }
  ],
  /* 다음 수업 (없으면 null) */
  next_class: null,

  /* 자세 복습지 (최신이 위) */
  forms: [],

  /* 주간 루틴 */
  routine: {
    version: "v2",
    updated: "2026. 11. 8",
    title: "주 4회 · 근력·근비대",
    plan: ["가슴·등·하체·어깨팔 주 4회", "메인은 피라미드로 무게 ↑", "수업 없는 날도 혼자 나오기!"],
    key_point: "수업 없는 날이 진짜 운동하는 날! 주 4회 꼭 채우기",
    note: "덤벨 무게는 한 손 기준이에요",
    cardio: { minutes: 15, options: "경사 걷기 · 천국의 계단 · 사이클 중 택1" },
    days: [
      { day: "월", part: "가슴", en: "Chest", cardio: true, items: [
        { name: "펙덱 플라이", en: "Pec Deck Fly", tag: "워밍업", tip: "가슴 가운데서 1초 꽉", sets: [[20, 20], [15, 25]] },
        { name: "플랫 덤벨프레스", en: "Flat DB Press", tag: "메인", tip: "덤벨은 가슴 옆까지", sets: [[15, 12], [12, 14], [10, 16], [8, 18]] },
        { name: "인클라인 덤벨 프레스", en: "Incline DB Press", tip: "윗가슴으로 밀기", sets: [[12, 12], [12, 12], [12, 12]] },
        { name: "체스트 프레스", en: "Chest Press", tip: "날개뼈 모으고 가슴으로", sets: [[12, 40], [12, 40], [12, 40]] },
        { name: "케이블 푸쉬다운", en: "Cable Pushdown", tip: "팔꿈치 옆구리 고정", sets: [[15, 20], [15, 20], [15, 20]] }
      ]},
      { day: "화", part: "등", en: "Back", cardio: true, items: [
        { name: "시티드 페이스풀", en: "Seated Face Pull", tag: "워밍업", tip: "팔꿈치 높게 얼굴 쪽으로", sets: [[20, 15], [15, 20]] },
        { name: "랫풀다운", en: "Lat Pulldown", tag: "메인", tip: "팔꿈치로 당기기", sets: [[15, 35], [12, 40], [10, 45], [8, 45]] },
        { name: "뉴텍 시티드 로우 머신", en: "Seated Row Machine", tip: "가슴 패드 붙이고 당기기", sets: [[12, 40], [12, 40], [12, 40]] },
        { name: "원암 덤벨 로우", en: "One Arm DB Row", tip: "팔꿈치를 골반 쪽으로", sets: [[12, 18], [12, 18], [12, 18]] },
        { name: "덤벨 컬", en: "DB Curl", tip: "팔꿈치 고정", sets: [[12, 10], [12, 10], [12, 10]] }
      ]},
      { day: "수", part: "휴식", en: "Rest", rest: true, items: [] },
      { day: "목", part: "하체", en: "Legs", cardio: false, items: [
        { name: "레그 익스텐션", en: "Leg Extension", tag: "워밍업", tip: "가볍게 무릎 풀기", sets: [[20, 20], [15, 25]] },
        { name: "이너타이", en: "Inner Thigh", tag: "선행", tip: "세트마다 무게 ↑", sets: [[20, 25], [15, 30], [12, 35]] },
        { name: "아웃타이 머신", en: "Outer Thigh", tag: "선행", tip: "세트마다 무게 ↑", sets: [[20, 25], [15, 30], [12, 35]] },
        { name: "핵스쿼트", en: "Hack Squat", tag: "메인", tip: "등 패드에 붙이고", sets: [[15, 20], [12, 25], [10, 30], [8, 30]] },
        { name: "레그프레스", en: "Leg Press", tip: "뒤꿈치로 밀기", sets: [[12, 60], [12, 60], [12, 60]] },
        { name: "라잉 레그컬", en: "Lying Leg Curl", tip: "골반 패드에 붙이기", sets: [[12, 25], [12, 25], [12, 25]] }
      ]},
      { day: "금", part: "어깨·팔", en: "Shoulder · Arm", cardio: true, items: [
        { name: "사이드 레터럴 레이즈", en: "Lateral Raise", tag: "워밍업", tip: "어깨 으쓱 금지", sets: [[20, 4], [15, 6]] },
        { name: "숄더 프레스 머신", en: "Shoulder Press", tag: "메인", tip: "허리 등받이에 붙이기", sets: [[15, 25], [12, 30], [10, 35], [8, 35]] },
        { name: "사이드 레터럴 레이즈 머신", en: "Standing Machine", tip: "팔꿈치로 들어 올리기", sets: [[15, 15], [15, 15], [15, 15]] },
        { name: "리버스 펙덱", en: "Reverse Pec Deck", tip: "날개뼈 모으며 옆으로", sets: [[15, 20], [15, 20], [15, 20]] },
        { name: "해머 컬", en: "Hammer Curl", tip: "엄지가 위로", sets: [[12, 10], [12, 10], [12, 10]] },
        { name: "오버헤드 익스텐션", en: "Overhead Extension", tip: "팔꿈치 앞으로 고정", sets: [[12, 15], [12, 15], [12, 15]] }
      ]},
      { day: "토", part: "휴식", en: "Rest", rest: true, items: [] },
      { day: "일", part: "휴식", en: "Rest", rest: true, items: [] }
    ]
  },

  /* 식단 (null이면 "준비 중") */
  diet: null
};
