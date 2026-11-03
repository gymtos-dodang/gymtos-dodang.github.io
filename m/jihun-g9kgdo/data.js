/* 최지훈 회원님 홈페이지 데이터 — 이 파일만 고치면 페이지 내용이 바뀜 */
window.MEMBER = {
  name: "최지훈",
  sex: "M",                       // M = 네이비, F = 핑크
  since: "2026. 11",
  goal: "근비대 · 주 6회",

  /* 공지 (최신이 위) */
  notices: [
    { date: "2026. 11. 3", title: "인클라인 덤벨 프레스 자세 복습지가 올라왔어요",
      body: "월요일·금요일에 하는 인클라인 덤벨 프레스예요. 운동 전에 한 번 보고 들어가세요!", link: "form-incline-db-press" },
    { date: "2026. 11. 3", title: "루틴이 v3로 바뀌었어요",
      body: "금요일은 인클라인 덤벨 프레스 메인부터 시작해요(워밍업 줄 빠짐). 덤벨 컬·해머 컬은 6kg으로 낮췄어요." },
    { date: "2026. 11. 3", title: "플랫 덤벨프레스 자세 복습지가 올라왔어요",
      body: "어제 수업 영상으로 만든 복습지예요. 운동 전에 한 번씩 보고 들어가세요!", link: "form-flat-db-press" }
  ],
  /* 다음 수업 (없으면 null) */
  next_class: null,

  /* 자세 복습지 (최신이 위) */
  forms: [
    {
      id: "incline-db-press",
      dir: "media/form-incline-db-press/",
      date: "2026. 11. 2 (월)",
      exercise: "인클라인 덤벨 프레스",
      exercise_en: "Incline DB Press",
      part: "가슴",
      targets: ["윗가슴 (대흉근 상부)", "전면 삼각근 · 삼두근"],
      benefit: "윗가슴을 채워서 가슴 라인이 꽉 차 보이게 해줘요",
      key_point: "덤벨은 쇄골 위로, 윗가슴으로 밀어 올린다!",
      good_points: [
        { title: "발을 바닥에 단단히 고정했어요", desc: "몸이 벤치에서 밀리지 않아 끝까지 안정적이었어요" },
        { title: "윗가슴 옆까지 깊게 내렸어요", desc: "가슴이 충분히 늘어나서 자극이 제대로 들어갔어요" },
        { title: "양손 높이를 맞췄어요", desc: "좌우 덤벨이 같은 높이로 올라가 양쪽 가슴이 고르게 일했어요" }
      ],
      primary_muscles: [{ name: "대흉근 상부", where: "쇄골 아래 윗가슴" }],
      secondary_muscles: "전면 삼각근 · 삼두근",
      feel_good: "쇄골 아래 윗가슴이 뻐근해요",
      feel_stop: "어깨 앞만 타거나, 손목이 꺾여서 아파요",
      steps: [
        { title: "준비", desc: "등받이는 30도 정도. 등과 엉덩이를 붙이고 날개뼈를 모아 덤벨을 쇄골 위로", chip: "숨 들이마시기", media: "step1.jpg" },
        { title: "내리기", desc: "팔꿈치를 몸통에서 45도 정도 벌리며 덤벨을 윗가슴 옆까지 천천히", chip: "3초 · 들이마시며", media: "step2.webp", loop: true },
        { title: "밀어 올리기", desc: "윗가슴을 모은다는 느낌으로 쇄골 위로! 맨 위에서 팔꿈치는 살짝 굽힌 채", chip: "2초 · 후~ 내쉬며", media: "step3.webp", loop: true }
      ],
      do: ["날개뼈를 모으고 가슴을 위로 세우기", "덤벨은 쇄골 위 방향으로 밀기", "손목은 팔꿈치 바로 위에 세우기"],
      dont: ["등받이를 너무 세워 어깨로만 밀기", "엉덩이를 들어 각도 없애기", "덤벨을 배 쪽으로 내리기"]
    },
    {
      id: "flat-db-press",
      dir: "media/form-flat-db-press/",
      date: "2026. 11. 2 (월)",
      exercise: "플랫 덤벨프레스",
      exercise_en: "Flat DB Press",
      part: "가슴",
      targets: ["대흉근 (가슴)", "전면 삼각근 · 삼두근"],
      benefit: "가슴 두께와 탄탄한 앞판 라인을 만들어줘요",
      key_point: "날개뼈를 모은 채, 가슴으로 밀어 올린다!",
      good_points: [
        { title: "발을 바닥에 단단히 고정했어요", desc: "하체가 받쳐줘서 끝까지 몸이 흔들리지 않았어요" },
        { title: "충분히 깊게 내렸어요", desc: "덤벨이 가슴 옆까지 내려와서 가슴이 쭉 늘어났어요" },
        { title: "리듬이 일정했어요", desc: "반동 없이 매 회 같은 속도로 올리고 내렸어요" }
      ],
      primary_muscles: [{ name: "대흉근", where: "가슴 앞 전체" }],
      secondary_muscles: "전면 삼각근 · 삼두근",
      feel_good: "가슴 가운데와 겨드랑이 앞쪽이 뻐근해요",
      feel_stop: "어깨 앞이 찌릿하거나, 가슴은 그대로고 팔만 아파요",
      steps: [
        { title: "준비", desc: "벤치에 누워 발은 바닥에 단단히. 날개뼈를 모아 가슴을 열고 덤벨은 가슴 위로", chip: "숨 들이마시기", media: "step1.jpg" },
        { title: "내리기", desc: "팔꿈치를 몸통에서 45도 정도 벌리며 덤벨을 가슴 옆까지 천천히", chip: "3초 · 들이마시며", media: "step2.webp", loop: true },
        { title: "밀어 올리기", desc: "가슴을 모은다는 느낌으로 위로! 맨 위에서 팔꿈치는 살짝 굽힌 채 멈춰요", chip: "2초 · 후~ 내쉬며", media: "step3.webp", loop: true }
      ],
      do: ["날개뼈를 모으고 가슴을 연 채로", "손목은 팔꿈치 바로 위에 세우기", "발은 바닥에 단단히, 엉덩이는 벤치에"],
      dont: ["팔꿈치를 옆으로 90도 활짝 벌리기", "올릴 때 엉덩이를 벤치에서 들기", "맨 위에서 덤벨끼리 쾅 부딪치기"]
    }
  ],

  /* 주간 루틴 */
  routine: {
    version: "v3",
    updated: "2026. 11. 3",
    title: "주 6회 · 근비대",
    plan: ["가슴·등·하체 주 2번씩", "같은 종목, 무게만 조금씩 ↑", "일요일은 푹 쉬고 잘 먹기"],
    key_point: "지금 방향 맞아요! 루틴대로 하고 무게만 조금씩 올리기",
    note: "덤벨 무게는 한 손 기준이에요",
    cardio: { minutes: 15, options: "경사 걷기 · 천국의 계단 · 사이클 중 택1" },
    days: [
      { day: "월", part: "가슴", en: "Chest", cardio: true, items: [
        { name: "플랫 덤벨프레스", en: "Flat DB Press", tag: "메인", tip: "덤벨은 가슴 옆까지", sets: [[15, 8], [12, 8], [10, 10], [8, 10]], form: "flat-db-press" },
        { name: "인클라인 덤벨 프레스", en: "Incline DB Press", tip: "윗가슴으로 밀기", sets: [[12, 8], [12, 8], [12, 8]], form: "incline-db-press" },
        { name: "케이블 푸쉬다운", en: "Cable Pushdown", tip: "팔꿈치 옆구리 고정", sets: [[15, 15], [15, 15], [15, 15]] }
      ]},
      { day: "화", part: "등", en: "Back", cardio: true, items: [
        { name: "랫풀다운", en: "Lat Pulldown", tag: "메인", tip: "팔꿈치로 당기기", sets: [[15, 25], [12, 25], [10, 30], [8, 30]] },
        { name: "시티드 로우 머신", en: "Seated Row Machine", tip: "가슴 패드 붙이고 당기기", sets: [[12, 30], [12, 30], [12, 30]] },
        { name: "리버스 펙덱", en: "Reverse Pec Deck", tip: "날개뼈 모으며 옆으로", sets: [[15, 15], [15, 15], [15, 15]] }
      ]},
      { day: "수", part: "하체", en: "Legs A", cardio: false, items: [
        { name: "레그 익스텐션", en: "Leg Extension", tag: "워밍업", tip: "가볍게 무릎 풀기", sets: [[20, 15], [15, 20]] },
        { name: "이너타이", en: "Inner Thigh", tag: "선행", tip: "세트마다 무게 ↑", sets: [[20, 20], [15, 25], [12, 30]] },
        { name: "아웃타이 머신", en: "Outer Thigh", tag: "선행", tip: "세트마다 무게 ↑", sets: [[20, 20], [15, 25], [12, 30]] },
        { name: "고블릿 스쿼트", en: "Goblet Squat", tag: "선행", tip: "가슴 세우고 깊이 앉기", sets: [[20, 6], [15, 8], [12, 10]] },
        { name: "핵스쿼트", en: "Hack Squat", tag: "메인", tip: "등 패드에 붙이고", sets: [[15, 15], [12, 15], [10, 20], [8, 20]] }
      ]},
      { day: "목", part: "어깨·팔", en: "Shoulder · Arm", cardio: true, items: [
        { name: "사이드 레터럴 레이즈", en: "Lateral Raise", tag: "워밍업", tip: "어깨 으쓱 금지", sets: [[20, 4], [15, 4]] },
        { name: "숄더 프레스 머신", en: "Shoulder Press", tag: "메인", tip: "허리 등받이에 붙이기", sets: [[15, 20], [12, 20], [10, 25], [8, 25]] },
        { name: "레터럴 레이즈 머신", en: "Standing Machine", tip: "팔꿈치로 들어 올리기", sets: [[15, 10], [15, 10], [15, 10]] },
        { name: "덤벨 컬", en: "DB Curl", tip: "팔꿈치 고정", sets: [[12, 6], [12, 6], [12, 6]] },
        { name: "해머 컬", en: "Hammer Curl", tip: "엄지가 위로", sets: [[12, 6], [12, 6], [12, 6]] }
      ]},
      { day: "금", part: "가슴·등", en: "Chest · Back", cardio: true, items: [
        { name: "인클라인 덤벨 프레스", en: "Incline DB Press", tag: "메인", tip: "윗가슴으로 밀기", sets: [[15, 6], [12, 6], [10, 8], [8, 8]], form: "incline-db-press" },
        { name: "플랫 덤벨프레스", en: "Flat DB Press", tip: "덤벨은 가슴 옆까지", sets: [[12, 8], [12, 8], [12, 8]], form: "flat-db-press" },
        { name: "랫풀다운", en: "Lat Pulldown", tip: "팔꿈치로 당기기", sets: [[12, 30], [12, 30], [12, 30]] },
        { name: "시티드 로우 머신", en: "Seated Row Machine", tip: "가슴 패드 붙이고 당기기", sets: [[12, 30], [12, 30], [12, 30]] }
      ]},
      { day: "토", part: "하체 B", en: "Legs B", cardio: false, items: [
        { name: "레그 익스텐션", en: "Leg Extension", tag: "워밍업", tip: "가볍게 무릎 풀기", sets: [[20, 15], [15, 20]] },
        { name: "이너타이", en: "Inner Thigh", tag: "선행", tip: "세트마다 무게 ↑", sets: [[20, 20], [15, 25], [12, 30]] },
        { name: "아웃타이 머신", en: "Outer Thigh", tag: "선행", tip: "세트마다 무게 ↑", sets: [[20, 20], [15, 25], [12, 30]] },
        { name: "고블릿 스쿼트", en: "Goblet Squat", tag: "선행", tip: "가슴 세우고 깊이 앉기", sets: [[20, 6], [15, 8], [12, 10]] },
        { name: "핵스쿼트", en: "Hack Squat", tag: "메인", tip: "등 패드에 붙이고", sets: [[15, 15], [12, 15], [10, 20], [8, 20]] },
        { name: "레그프레스 (발 높게)", en: "Leg Press · High", tip: "뒤꿈치로 밀기", sets: [[12, 40], [12, 40], [12, 40]] }
      ]},
      { day: "일", part: "휴식", en: "Rest", rest: true, items: [] }
    ]
  },

  /* 식단표 (없으면 null) */
  diet: null
};
