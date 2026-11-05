/* 정미경 회원님 홈페이지 데이터 — 이 파일만 고치면 페이지 내용이 바뀜 */
window.MEMBER = {
  name: "정미경",
  sex: "F",                       // M = 네이비, F = 핑크
  since: "2026. 11",
  goal: "벌크업 · 주 4회",
  journey: { start: "2026-09-15" },   // PT 시작일 (장동욱: 9월 → 15일로 둠)

  /* 공지 (최신이 위) */
  notices: [
    { date: "2026. 11. 5", title: "PT 노트가 열렸어요",
      body: "이번 주 루틴(v3)이 올라와 있어요. 루틴 탭에서 요일을 누르면 그날 운동과 무게가 나와요. 토요일 엉덩이 운동은 저랑 PT 수업으로 같이 해요! 자세 복습지·식단도 앞으로 여기로 올려드릴게요." }
  ],
  /* 다음 수업 (없으면 null) */
  next_class: "매주 토요일 · 엉덩이 PT 수업",

  /* 자세 복습지 (최신이 위) */
  forms: [],

  /* 주간 루틴 */
  routine: {
    version: "v3",
    updated: "2026. 10. 22",
    title: "주 4회 · 벌크업",
    plan: ["등·어깨·가슴·엉덩이 4분할", "토요일 엉덩이는 PT 수업", "목 · 금 · 일은 푹 쉬고 잘 먹기"],
    key_point: "벌크업은 잘 먹고 잘 쉬는 것까지가 운동! 매주 무게를 조금씩 올려봐요",
    note: "세트 사이 1분 30초~2분 쉬기 · 덤벨 무게는 한 손 기준이에요",
    cardio: { minutes: 15, options: "경사 걷기 · 천국의 계단 · 사이클 중 택1" },
    days: [
      { day: "월", part: "등", en: "Back", cardio: false, items: [
        { name: "시티드 페이스풀", en: "Seated Face Pull", tag: "워밍업", tip: "날개뼈 모으며 얼굴 쪽으로", sets: [[20, 10], [15, 15]] },
        { name: "랫풀다운", en: "Lat Pulldown", tip: "팔꿈치로 당기기", sets: [[12, 25], [12, 25], [12, 25]] },
        { name: "시티드 로우 머신", en: "Seated Row Machine", tag: "메인", tip: "가슴 패드 붙이고 당기기", sets: [[15, 25], [12, 25], [10, 30], [8, 30]] },
        { name: "리버스 펙덱", en: "Reverse Pec Deck", tip: "날개뼈 모으며 옆으로", sets: [[15, 15], [15, 15], [15, 15]] }
      ]},
      { day: "화", part: "어깨", en: "Shoulder", cardio: true, items: [
        { name: "레터럴 레이즈 머신", en: "Standing Machine", tag: "워밍업", tip: "가볍게 어깨 풀기", sets: [[20, 5], [15, 10]] },
        { name: "숄더 프레스 머신", en: "Shoulder Press", tag: "메인", tip: "허리 등받이에 붙이기", sets: [[15, 15], [12, 20], [10, 20], [8, 20]] },
        { name: "사이드 레터럴 레이즈 (덤벨)", en: "Lateral Raise", tip: "어깨 으쓱 금지", sets: [[15, 4], [15, 4], [15, 4]] },
        { name: "리버스 펙덱", en: "Reverse Pec Deck", tip: "날개뼈 모으며 옆으로", sets: [[15, 15], [15, 15], [15, 15]] }
      ]},
      { day: "수", part: "가슴", en: "Chest", cardio: false, items: [
        { name: "펙덱 플라이", en: "Pec Deck Fly", tag: "워밍업", tip: "가슴 모은다는 느낌", sets: [[20, 15], [15, 15]] },
        { name: "체스트 프레스 머신", en: "Chest Press", icon: "chest_press", tag: "메인", tip: "가슴 펴고 밀기", sets: [[15, 20], [12, 20], [10, 25], [8, 25]] },
        { name: "인클라인 덤벨 프레스", en: "Incline DB Press", tip: "윗가슴으로 밀기", sets: [[12, 6], [12, 6], [12, 6]] },
        { name: "케이블 푸쉬다운", en: "Cable Pushdown", tip: "팔꿈치 옆구리에 고정", sets: [[15, 15], [15, 15], [15, 15]] }
      ]},
      { day: "목", part: "휴식", en: "Rest", rest: true, items: [] },
      { day: "금", part: "휴식", en: "Rest", rest: true, items: [] },
      { day: "토", part: "엉덩이", en: "Glute Day · 트레이너와 PT 수업", cardio: false, items: [
        { name: "고블릿 스쿼트", en: "Goblet Squat", tag: "선행", tip: "가슴 세우고 깊이 앉기", sets: [[20, 6], [15, 8], [12, 10]] },
        { name: "이너타이", en: "Inner Thigh", tag: "선행", tip: "천천히 모으고 버티기", sets: [[15, 15], [12, 20], [10, 25]] },
        { name: "아웃타이 머신", en: "Outer Thigh", icon: "outer_thigh_pin", tag: "선행", tip: "엉덩이 옆으로 밀기", sets: [[20, 20], [15, 25], [12, 30]] },
        { name: "힙쓰러스트 머신", en: "Hip Thrust", icon: "hip_thrust", tag: "메인", tip: "맨 위에서 엉덩이 꽉", sets: [[15, 10], [12, 10], [10, 15], [8, 15]] }
      ]},
      { day: "일", part: "휴식", en: "Rest", rest: true, items: [] }
    ]
  },

  /* 식단표 (없으면 null) */
  diet: null
};
