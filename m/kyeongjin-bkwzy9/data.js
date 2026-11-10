/* 서경진 회원님 홈페이지 데이터 — 이 파일만 고치면 페이지 내용이 바뀜 */
window.MEMBER = {
  name: "서경진",
  sex: "F",                       // M = 네이비, F = 핑크
  since: "2026. 11",
  goal: "라인 & 힙업 · 주 6회",
  journey: { start: "2026-05-15" },   // PT 시작일 (장동욱: 5월쯤 → 15일로 둠)

  /* 공지 (최신이 위) */
  notices: [
    { date: "2026. 11. 3", title: "PT 노트가 열렸어요",
      body: "이번 주 루틴(v6)이 올라와 있어요. 루틴 탭에서 요일을 누르면 그날 운동과 무게가 나와요. 자세 복습지·식단도 앞으로 여기로 올려드릴게요!" }
  ],
  /* 다음 수업 (없으면 null) */
  next_class: null,

  /* 자세 복습지 (최신이 위) */
  forms: [],

  /* 주간 루틴 */
  routine: {
    version: "v6",
    updated: "2026. 10. 20",
    title: "주 6회 · 라인 & 힙업",
    plan: ["가슴·어깨·등·하체·힙 2번", "금요일은 유산소만 40분", "일요일은 푹 쉬고 잘 먹기"],
    key_point: "엉덩이는 일주일에 2번! 무게보다 자극 먼저, 천천히 올려가요",
    note: "세트 사이 1분~1분 30초 쉬기 · 덤벨 무게는 한 손 기준이에요",
    cardio: { minutes: 25, options: "경사 걷기 · 천국의 계단 · 사이클 중 택1" },
    days: [
      { day: "월", part: "하체", en: "Leg Day", cardio: true, items: [
        { name: "레그 익스텐션", en: "Leg Extension", tag: "워밍업", tip: "가볍게 무릎 풀기", sets: [[20, 15], [15, 20]] },
        { name: "레그프레스", en: "Leg Press", tag: "메인", tip: "무릎은 발끝 방향으로", sets: [[15, 50], [12, 55], [10, 55], [8, 60]] },
        { name: "고블릿 스쿼트", en: "Goblet Squat", tip: "가슴 세우고 깊이 앉기", sets: [[12, 10], [12, 10], [12, 10]] },
        { name: "라잉 레그컬", en: "Lying Leg Curl", tip: "엉덩이 들리지 않게", sets: [[12, 15], [12, 15], [12, 15]] },
        { name: "이너타이", en: "Inner Thigh", tip: "천천히 모으고 버티기", sets: [[15, 15], [15, 15], [15, 15]] }
      ]},
      { day: "화", part: "가슴·어깨", en: "Chest · Shoulder", cardio: true, items: [
        { name: "펙덱 플라이", en: "Pec Deck Fly", tag: "워밍업", tip: "가슴 모은다는 느낌", sets: [[20, 15], [15, 15]] },
        { name: "스미스 인클라인 프레스", en: "Smith Incline Press", tag: "메인", tip: "윗가슴으로 밀기", sets: [[15, 20], [12, 20], [10, 25], [8, 25]] },
        { name: "체스트 프레스 머신", en: "Chest Press", icon: "chest_press", tip: "가슴 펴고 밀기", sets: [[12, 25], [12, 25], [12, 25]] },
        { name: "숄더 프레스 머신", en: "Shoulder Press", tip: "허리 등받이에 붙이기", sets: [[12, 15], [12, 15], [12, 15]] },
        { name: "사이드 레터럴 레이즈", en: "Lateral Raise", tip: "어깨 으쓱 금지", sets: [[15, 4], [15, 4], [15, 4]] }
      ]},
      { day: "수", part: "힙 A", en: "Glute A", cardio: true, items: [
        { name: "플레이트 아웃타이", en: "Booty Builder", icon: "outer_thigh_plate", tag: "워밍업", tip: "엉덩이 옆으로 밀기", sets: [[20, 20], [15, 20]] },
        { name: "힙쓰러스트 머신", en: "Hip Thrust", icon: "hip_thrust", tag: "메인", tip: "맨 위에서 엉덩이 꽉", sets: [[15, 35], [12, 35], [10, 40], [8, 40]] },
        { name: "레그프레스 (발 높게)", en: "Leg Press · High", tip: "뒤꿈치로 밀기", sets: [[15, 45], [15, 45], [15, 45]] },
        { name: "고블릿 스쿼트", en: "Goblet Squat", tip: "가슴 세우고 깊이 앉기", sets: [[12, 10], [12, 10], [12, 10]] },
        { name: "라잉 레그컬", en: "Lying Leg Curl", tip: "엉덩이 들리지 않게", sets: [[12, 15], [12, 15], [12, 15]] }
      ]},
      { day: "목", part: "등", en: "Back", cardio: true, items: [
        { name: "스트레이트 암 풀다운", en: "Straight Arm Pulldown", tag: "워밍업", tip: "팔 편 채 허벅지까지", sets: [[20, 10], [15, 10]] },
        { name: "랫풀다운", en: "Lat Pulldown", tag: "메인", tip: "팔꿈치로 당기기", sets: [[15, 25], [12, 25], [10, 30], [8, 30]] },
        { name: "뉴텍 시티드 로우 머신", en: "Seated Row Machine", tip: "가슴 패드 붙이고 당기기", sets: [[12, 25], [12, 25], [12, 25]] },
        { name: "언더그립 랫풀다운", en: "Underhand Pulldown", tip: "손바닥 위로, 팔꿈치 옆구리로", sets: [[12, 25], [12, 25], [12, 25]] },
        { name: "리버스 펙덱", en: "Reverse Pec Deck", tip: "날개뼈 모으며 옆으로", sets: [[15, 15], [15, 15], [15, 15]] }
      ]},
      { day: "금", part: "유산소", en: "Cardio", cardio_only: 40, note: "웨이트 없이 유산소만 40분! 숨이 살짝 찰 정도로", items: [] },
      { day: "토", part: "힙 B", en: "Glute B", cardio: true, items: [
        { name: "아웃타이 머신", en: "Outer Thigh", icon: "outer_thigh_pin", tag: "워밍업", tip: "엉덩이 옆으로 밀기", sets: [[20, 20], [15, 20]] },
        { name: "레그프레스 (발 높게)", en: "Leg Press · High", tag: "메인", tip: "뒤꿈치로 밀기", sets: [[15, 50], [12, 55], [10, 55], [8, 60]] },
        { name: "힙쓰러스트 머신", en: "Hip Thrust", icon: "hip_thrust", tip: "맨 위에서 엉덩이 꽉", sets: [[12, 35], [12, 35], [12, 35]] },
        { name: "이너타이", en: "Inner Thigh", tip: "천천히 모으고 버티기", sets: [[15, 15], [15, 15], [15, 15]] },
        { name: "라잉 레그컬", en: "Lying Leg Curl", tip: "엉덩이 들리지 않게", sets: [[12, 15], [12, 15], [12, 15]] }
      ]},
      { day: "일", part: "휴식", en: "Rest", rest: true, items: [] }
    ]
  },

  /* 식단표 (없으면 null) */
  diet: null
};
