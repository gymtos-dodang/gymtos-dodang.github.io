/* 어순래 회원님 홈페이지 데이터 — 이 파일만 고치면 페이지 내용이 바뀜 */
window.MEMBER = {
  name: "어순래",
  sex: "F",                       // M = 네이비, F = 핑크
  since: "2026. 11",
  goal: "아프지 않고 건강하게, 꾸준히 운동하는 몸 만들기",
  journey: { start: "2026-03-15" },   // PT 시작일 (장동욱: 올해 3월 → 15일로 둠)

  /* 공지 (최신이 위) */
  notices: [
    { date: "2026. 11. 10", title: "주 6회 건강 관리 루틴이 올라왔어요", link: "routine",
      body: "월 하체 · 화 등 · 수 가슴 · 목 엉덩이 · 금 어깨 · 토 등·팔, 일요일은 푹 쉬어요. 하체는 아프지 않게 가볍게! 운동 끝나면 유산소 15분까지 해주세요." },
    { date: "2026. 11. 10", title: "PT 노트가 열렸어요",
      body: "어순래 회원님만의 운동 노트예요! 앞으로 주간 루틴·자세 복습지·식단을 여기로 올려드릴게요. 운동 오신 날은 홈에서 '오늘 출석'을 꼭 눌러주세요." }
  ],
  /* 다음 수업 (없으면 null) */
  next_class: null,

  /* 자세 복습지 (최신이 위) */
  forms: [],

  /* 주간 루틴 (없으면 null → "루틴이 아직 없어요") */
  routine: {
    version: "v1",
    updated: "2026. 10. 29",
    title: "주 6회 · 건강 관리",
    plan: ["상체 4일 · 하체 2일", "하체는 아프지 않게 가볍게", "일요일은 푹 쉬기"],
    key_point: "무게보다 바른 자세! 아프면 바로 멈추고 선생님께 말해주세요",
    note: "세트 사이 1분 30초~2분 쉬기 · 덤벨 무게는 한 손 기준이에요",
    cardio: { minutes: 15, options: "경사 걷기 · 평지 걷기 · 사이클 중 택1" },
    days: [
      { day: "월", part: "하체", en: "Legs", cardio: true, items: [
        { name: "레그 익스텐션", en: "Leg Extension", tag: "워밍업", tip: "가볍게 무릎 풀기", sets: [[20, 10], [15, 15]] },
        { name: "이너타이", en: "Inner Thigh", tag: "선행", tip: "천천히 모으고 버티기", sets: [[20, 10], [15, 15], [12, 20]] },
        { name: "아웃타이 머신", en: "Outer Thigh", icon: "outer_thigh_pin", tag: "선행", tip: "엉덩이 옆으로 밀기", sets: [[20, 10], [15, 15], [12, 20]] },
        { name: "레그프레스", en: "Leg Press", tag: "메인", tip: "무릎 아프면 바로 멈추기, 발 전체로 밀기", sets: [[15, 35], [12, 35], [10, 40], [8, 40]] }
      ]},
      { day: "화", part: "등", en: "Back", cardio: true, items: [
        { name: "시티드 페이스풀", en: "Seated Face Pull", tag: "워밍업", tip: "줄을 얼굴 쪽으로, 날개뼈 모으기", sets: [[20, 10], [15, 10]] },
        { name: "랫풀다운", en: "Lat Pulldown", tag: "메인", tip: "팔꿈치로 당기기", sets: [[15, 25], [12, 25], [10, 30], [8, 30]] },
        { name: "뉴텍 시티드 로우 머신", en: "Seated Row Machine", tip: "가슴 패드 붙이고 당기기", sets: [[12, 25], [12, 25], [12, 25]] }
      ]},
      { day: "수", part: "가슴", en: "Chest", cardio: true, items: [
        { name: "펙덱 플라이", en: "Pec Deck Fly", tag: "워밍업", tip: "가슴으로 껴안듯이 모으기", sets: [[20, 15], [15, 15]] },
        { name: "체스트 프레스 머신", en: "Chest Press", icon: "chest_press", tag: "메인", tip: "날개뼈 모으고 가슴으로 밀기", sets: [[15, 20], [12, 20], [10, 25], [8, 25]] },
        { name: "케이블 푸쉬다운", en: "Cable Pushdown", tip: "팔꿈치는 옆구리에 고정", sets: [[15, 15], [15, 15], [15, 15]] }
      ]},
      { day: "목", part: "엉덩이", en: "Glute", cardio: true, items: [
        { name: "레그 익스텐션", en: "Leg Extension", tag: "워밍업", tip: "가볍게 무릎 풀기", sets: [[20, 10], [15, 15]] },
        { name: "이너타이", en: "Inner Thigh", tag: "선행", tip: "천천히 모으고 버티기", sets: [[20, 10], [15, 15], [12, 20]] },
        { name: "플레이트 아웃타이", en: "Booty Builder", icon: "outer_thigh_plate", tag: "선행", tip: "엉덩이 옆으로 밀기", sets: [[20, 10], [15, 15], [12, 20]] },
        { name: "힙쓰러스트 머신", en: "Hip Thrust", icon: "hip_thrust", tag: "메인", tip: "맨 위에서 엉덩이 꽉 1초", sets: [[15, 30], [12, 30], [10, 35], [8, 35]] }
      ]},
      { day: "금", part: "어깨", en: "Shoulder", cardio: true, items: [
        { name: "사이드 레터럴 레이즈 머신", en: "Lateral Raise Machine", tag: "워밍업", tip: "어깨 으쓱 금지, 팔꿈치로 들기", sets: [[20, 5], [15, 10]] },
        { name: "숄더 프레스 머신", en: "Shoulder Press", tag: "메인", tip: "허리 등받이에 붙이기", sets: [[15, 15], [12, 20], [10, 20], [8, 20]] },
        { name: "리버스 펙덱", en: "Reverse Pec Deck", tip: "날개뼈 모으며 옆으로", sets: [[15, 15], [15, 15], [15, 15]] }
      ]},
      { day: "토", part: "등·팔", en: "Back · Arms", cardio: true, items: [
        { name: "랫풀다운", en: "Lat Pulldown", tag: "워밍업", tip: "가볍게 등 깨우기", sets: [[20, 20], [15, 20]] },
        { name: "뉴텍 시티드 로우 머신", en: "Seated Row Machine", tag: "메인", tip: "가슴 패드 붙이고 당기기", sets: [[15, 25], [12, 25], [10, 30], [8, 30]] },
        { name: "덤벨 컬", en: "Dumbbell Curl", tip: "팔꿈치 고정, 천천히 내리기", sets: [[12, 4], [12, 4], [12, 4]] },
        { name: "케이블 푸쉬다운", en: "Cable Pushdown", tip: "팔꿈치는 옆구리에 고정", sets: [[15, 15], [15, 15], [15, 15]] }
      ]},
      { day: "일", part: "휴식", en: "Rest", rest: true, items: [] }
    ]
  },

  /* 식단 (null이면 "준비 중") */
  diet: null
};
