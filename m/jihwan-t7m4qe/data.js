/* 이지환 회원님 홈페이지 데이터 — 이 파일만 고치면 페이지 내용이 바뀜 */
window.MEMBER = {
  name: "이지환",
  sex: "M",                       // M = 네이비, F = 핑크
  since: "2026. 11",
  goal: "바디프로필 · 근비대 + 바른 등",
  journey: { start: "2026-10-15", mode: "bodyprofile" },   // PT 시작일 (10월 → 15일로 둠) · mode bodyprofile = 바프 전용 그래프(기초→벌크→컷팅). 촬영일 정해지면 shoot: "YYYY-MM-DD" 추가 → D-day

  /* 공지 (최신이 위) */
  notices: [
    { date: "2026. 11. 5", title: "바프 벌크업 식단이 올라왔어요", link: "diet",
      body: "식단 탭에서 하루 4끼를 확인하세요! '또는'은 둘 중 하나만 골라 먹으면 돼요. 3식(프로틴 + 카보린)은 운동 끝나고 바로 — 바프 근육은 먹은 만큼 만들어져요!" },
    { date: "2026. 11. 5", title: "PT 노트가 열렸어요",
      body: "바프까지 가는 노트예요! 목표 탭에서 기초 → 벌크 → 컷팅 3단계와 지금 위치를 볼 수 있어요. 이번 주 루틴(v10)은 루틴 탭에서 요일을 누르면 그날 운동과 무게가 나와요. 지금은 근육을 채우는 시기 — 등 2번 · 하체 2번 꼭 챙겨요!" }
  ],
  /* 다음 수업 (없으면 null) */
  next_class: null,

  /* 자세 복습지 (최신이 위) */
  forms: [],

  /* 주간 루틴 */
  routine: {
    version: "v10",
    updated: "2026. 10. 26",
    title: "주 6회 · 근비대 + 바른 등",
    plan: ["등 2번 · 하체 2번 집중", "가슴 · 어깨 · 팔 하루씩", "일요일은 푹 쉬고 잘 먹기"],
    key_point: "등은 손이 아니라 팔꿈치로 당겨요! 가슴 펴고, 매주 무게를 조금씩 올려봐요",
    note: "세트 사이 1분 30초~2분 쉬기 · 덤벨 무게는 한 손 기준 · 로우로우·핵스쿼트는 원판 양쪽 합계예요",
    cardio: { minutes: 15, options: "경사 걷기 · 천국의 계단 · 사이클 중 택1" },
    days: [
      { day: "월", part: "등 A", en: "Back A", cardio: true, items: [
        { name: "케이블 풀오버", en: "Cable Pullover", tag: "워밍업", tip: "팔 펴고 골반까지", sets: [[20, 15], [15, 15]] },
        { name: "시티드 로우 머신", en: "Seated Row Machine", tag: "메인", tip: "가슴 패드 붙이고 당기기", sets: [[15, 35], [12, 40], [10, 40], [8, 45]] },
        { name: "랫풀다운", en: "Lat Pulldown", tip: "팔꿈치로 당기기", sets: [[12, 40], [12, 40], [12, 40]] },
        { name: "해머스트렝스 로우로우", en: "Low Row", tip: "원판 양쪽 합계 무게", sets: [[12, 40], [12, 40], [12, 40]] },
        { name: "리버스 펙덱", en: "Reverse Pec Deck", tip: "날개뼈 모으며 옆으로", sets: [[15, 20], [15, 20], [15, 20]] }
      ]},
      { day: "화", part: "가슴", en: "Chest", cardio: true, items: [
        { name: "펙덱 플라이", en: "Pec Deck Fly", tag: "워밍업", tip: "가슴 모은다는 느낌", sets: [[20, 20], [15, 20]] },
        { name: "인클라인 덤벨 프레스", en: "Incline DB Press", tag: "메인", tip: "윗가슴으로 밀기", sets: [[15, 12], [12, 12], [10, 14], [8, 14]] },
        { name: "체스트 프레스", en: "Chest Press", tip: "가슴 펴고 밀기", sets: [[12, 35], [12, 35], [12, 35]] },
        { name: "머신 인클라인 프레스", en: "Incline Machine Press", tip: "세트마다 무게 ↑", sets: [[15, 25], [12, 30], [10, 35]] }
      ]},
      { day: "수", part: "하체 A", en: "Legs A", cardio: false, items: [
        { name: "이너타이", en: "Inner Thigh", tag: "선행", tip: "세트마다 무게 ↑", sets: [[20, 25], [15, 30], [12, 35]] },
        { name: "아웃타이 머신", en: "Outer Thigh", icon: "outer_thigh_pin", tag: "선행", tip: "세트마다 무게 ↑", sets: [[20, 25], [15, 30], [12, 35]] },
        { name: "고블릿 스쿼트", en: "Goblet Squat", tag: "워밍업", tip: "가슴 세우고 깊이 앉기", sets: [[20, 6], [15, 8]] },
        { name: "핵스쿼트", en: "Hack Squat", tag: "메인", tip: "등 패드에 붙이고 · 원판 양쪽 합계", sets: [[15, 20], [12, 20], [10, 25], [8, 25]] },
        { name: "레그프레스", en: "Leg Press", tip: "무릎은 발끝 방향으로", sets: [[12, 60], [12, 60], [12, 60]] }
      ]},
      { day: "목", part: "등 B", en: "Back B", cardio: true, items: [
        { name: "리버스 펙덱", en: "Reverse Pec Deck", tag: "워밍업", tip: "뒷어깨 가볍게 풀기", sets: [[20, 15], [15, 15]] },
        { name: "케이블 시티드 로우", en: "Cable Seated Row", tag: "메인", tip: "가슴 펴고 날개뼈 모으기", sets: [[15, 35], [12, 40], [10, 40], [8, 45]] },
        { name: "언더그립 시티드 로우", en: "Underhand Seated Row", tip: "일자바 · 손바닥 위로", sets: [[12, 35], [12, 35], [12, 35]] },
        { name: "랫풀다운", en: "Lat Pulldown", tip: "팔꿈치로 당기기", sets: [[12, 40], [12, 40], [12, 40]] },
        { name: "시티드 페이스풀", en: "Seated Face Pull", tip: "팔꿈치 높게 얼굴 쪽으로", sets: [[15, 15], [15, 15], [15, 15]] }
      ]},
      { day: "금", part: "어깨 · 팔", en: "Shoulder & Arms", cardio: false, items: [
        { name: "사이드 레터럴 레이즈", en: "Lateral Raise", tag: "워밍업", tip: "어깨 으쓱 금지", sets: [[20, 4], [15, 4]] },
        { name: "숄더 프레스 머신", en: "Shoulder Press", tag: "메인", tip: "허리 등받이에 붙이기", sets: [[15, 25], [12, 25], [10, 30], [8, 30]] },
        { name: "레터럴 레이즈 머신", en: "Standing Machine", tip: "팔꿈치로 들어 올리기", sets: [[15, 15], [15, 15], [15, 15]] },
        { name: "시티드 페이스풀", en: "Seated Face Pull", tip: "팔꿈치 높게 얼굴 쪽으로", sets: [[15, 15], [15, 15], [15, 15]] },
        { name: "덤벨 컬", en: "DB Curl", tip: "팔꿈치 고정, 반동 금지", sets: [[12, 10], [12, 10], [12, 10]] },
        { name: "해머 컬", en: "Hammer Curl", tip: "엄지가 위로", sets: [[12, 10], [12, 10], [12, 10]] }
      ]},
      { day: "토", part: "하체 B", en: "Legs B", cardio: false, items: [
        { name: "이너타이", en: "Inner Thigh", tag: "선행", tip: "세트마다 무게 ↑", sets: [[20, 25], [15, 30], [12, 35]] },
        { name: "아웃타이 머신", en: "Outer Thigh", icon: "outer_thigh_pin", tag: "선행", tip: "세트마다 무게 ↑", sets: [[20, 25], [15, 30], [12, 35]] },
        { name: "고블릿 스쿼트", en: "Goblet Squat", tag: "워밍업", tip: "가슴 세우고 깊이 앉기", sets: [[20, 6], [15, 8]] },
        { name: "핵스쿼트", en: "Hack Squat", tag: "메인", tip: "등 패드에 붙이고 · 원판 양쪽 합계", sets: [[15, 20], [12, 20], [10, 25], [8, 25]] },
        { name: "레그프레스 (발 높게)", en: "Leg Press · High", tip: "뒤꿈치로 밀기", sets: [[12, 55], [12, 55], [12, 55]] }
      ]},
      { day: "일", part: "휴식", en: "Rest", rest: true, items: [] }
    ]
  },

  /* 식단표 (없으면 null) — 끼니별로 정해진 벌크업 식단 (meals 형식) */
  diet: {
    updated: "2026. 11. 5",
    title: "바프 벌크업 식단",
    title_en: "Bulk-up Meal Plan · 하루 4끼",
    rules: ["하루 4끼 빠짐없이", "'또는'은 둘 중 하나만", "3식은 운동 끝나고 바로"],
    rules_note: "적힌 양은 꼭 채워 먹기 — 지금은 근육을 채우는 시기예요",
    key_point: "바프 근육은 먹은 만큼 만들어져요! 4끼 꽉 채우기",
    meals: [
      { no: "1식", options: [
        { label: "간장계란밥", foods: [{ icon: "rice_white", name: "쌀밥" }, { icon: "egg", name: "계란", amount: "6개" }] },
        { foods: [{ icon: "bagel", name: "베이글" }, { icon: "shaker", name: "프로틴 음료" }] }
      ]},
      { no: "2식", options: [
        { foods: [{ icon: "rice_white", name: "쌀밥", amount: "400g" }, { icon: "chicken", name: "닭가슴살", amount: "200g" }, { icon: "egg", name: "계란", amount: "5개" }] }
      ]},
      { no: "3식", tag: "운동 후", options: [
        { foods: [{ icon: "shaker", name: "프로틴", amount: "2스쿱" }, { icon: "carbo", name: "카보린" }] }
      ], note: "운동 끝나고 바로 섞어 마시기" },
      { no: "4식", options: [
        { foods: [{ icon: "rice_white", name: "쌀밥", amount: "200g" }, { icon: "chicken", name: "닭가슴살", amount: "200g" }] },
        { foods: [{ icon: "sweet_potato", name: "고구마", amount: "400g" }, { icon: "shaker", name: "프로틴", amount: "2스쿱" }] }
      ]}
    ]
  }
};
