/* 김태영 회원님 홈페이지 데이터 — 이 파일만 고치면 페이지 내용이 바뀜 */
window.MEMBER = {
  name: "김태영",
  sex: "M",                       // M = 네이비, F = 핑크
  since: "2026. 11",
  goal: "근비대 · 주 5회",
  // journey: { start: "YYYY-MM-DD" },   // PT 시작일 — 장동욱에게 받으면 넣기 (넣으면 'PT 여정' 나옴)

  /* 공지 (최신이 위) */
  notices: [
    { date: "2026. 11. 4", title: "원암 덤벨 로우 자세 복습지가 올라왔어요",
      body: "화요일 등 운동에 하는 원암 덤벨 로우예요. 운동 전에 한 번 보고 들어가세요!", link: "form-one-arm-row" },
    { date: "2026. 11. 4", title: "프론트 로우 자세 복습지가 올라왔어요",
      body: "어제 수업 영상으로 만든 복습지예요. 운동 전에 한 번씩 보고 들어가세요!", link: "form-front-row" },
    { date: "2026. 11. 4", title: "PT 노트가 열렸어요",
      body: "이번 주 루틴이 올라와 있어요. 루틴 탭에서 요일을 누르면 그날 운동과 무게가 나와요. 자세 복습지·식단도 앞으로 여기로 올려드릴게요!" }
  ],
  /* 다음 수업 (없으면 null) */
  next_class: null,

  /* 자세 복습지 (최신이 위) */
  forms: [
    {
      id: "one-arm-row",
      dir: "media/form-one-arm-row/",
      date: "2026. 11. 3 (화)",
      exercise: "원암 덤벨 로우",
      exercise_en: "One Arm DB Row",
      part: "등",
      targets: ["광배근 (등 날개)", "능형근 · 후면 삼각근 · 이두근"],
      benefit: "한쪽씩 집중해서 등 두께와 좌우 균형을 잡아줘요",
      key_point: "덤벨은 골반 쪽으로, 팔꿈치로 뒤로 당긴다!",
      good_points: [
        { title: "반대 손으로 몸을 단단히 받쳤어요", desc: "패드를 짚고 버텨서 당길 때 몸이 흔들리지 않았어요" },
        { title: "숙인 각도를 끝까지 지켰어요", desc: "상체가 들리지 않아서 등에 자극이 계속 걸려 있었어요" },
        { title: "끝까지 내려서 등을 늘렸어요", desc: "팔을 쭉 펴서 내려 매 회 등이 충분히 늘어났어요" }
      ],
      primary_muscles: [{ name: "광배근", where: "겨드랑이 아래 등 옆 날개" }],
      secondary_muscles: "능형근 · 중부 승모근 · 대원근 · 후면 삼각근 · 이두근",
      feel_good: "당기는 쪽 겨드랑이 아래와 날개뼈 안쪽이 뻐근해요",
      feel_stop: "허리가 찌릿하거나, 등은 그대로고 팔만 아파요",
      steps: [
        { title: "준비", desc: "한 손은 패드에 짚고 엉덩이를 뒤로 빼며 상체를 숙여요. 등은 곧게, 덤벨 든 팔은 아래로 쭉", chip: "숨 들이마시기", media: "step1.jpg" },
        { title: "당기기", desc: "팔꿈치를 골반 쪽으로 끌어올리며 덤벨을 옆구리까지! 맨 위에서 날개뼈를 꽉 모아요", chip: "2초 · 후~ 내쉬며", media: "step2.webp", loop: true },
        { title: "내리기", desc: "무게에 끌려가지 말고 천천히 팔을 펴며 아래로. 등이 쭉 늘어날 때까지", chip: "3초 · 들이마시며", media: "step3.webp", loop: true }
      ],
      do: ["등은 곧게, 엉덩이는 뒤로 빼기", "팔꿈치는 몸에 붙여 골반 쪽으로", "내릴 때 끝까지 늘려주기"],
      dont: ["몸통을 돌려 반동으로 들기", "어깨를 귀 쪽으로 으쓱하기", "허리를 둥글게 말기"]
    },
    {
      id: "front-row",
      dir: "media/form-front-row/",
      date: "2026. 11. 3 (화)",
      exercise: "프론트 로우",
      exercise_en: "Front Row Machine",
      part: "등",
      targets: ["광배근 (등 날개)", "대원근 · 능형근 · 이두근"],
      benefit: "등 옆 날개를 넓혀서 상체 V라인을 만들어줘요",
      key_point: "손이 아니라 팔꿈치로, 옆구리 쪽으로 끌어내린다!",
      good_points: [
        { title: "다리를 패드에 단단히 고정했어요", desc: "엉덩이가 들리지 않아서 끝까지 등으로만 당겼어요" },
        { title: "위에서 팔을 끝까지 폈어요", desc: "매 회 등이 쭉 늘어나서 자극 범위가 넓었어요" },
        { title: "상체가 흔들리지 않았어요", desc: "허리를 젖히지 않고 같은 자세로 반복했어요" }
      ],
      primary_muscles: [{ name: "광배근", where: "겨드랑이 아래 등 옆 날개" }],
      secondary_muscles: "대원근 · 능형근 · 중부 승모근 · 후면 삼각근 · 이두근",
      feel_good: "겨드랑이 아래 등 옆쪽이 뻐근해요",
      feel_stop: "어깨 앞이 찌릿하거나, 등은 그대로고 팔만 아파요",
      steps: [
        { title: "준비", desc: "허벅지 패드에 다리를 고정하고 가슴을 세워 앉아요. 손잡이를 잡고 팔을 위로 쭉 펴서 등을 늘려요", chip: "숨 들이마시기", media: "step1.jpg" },
        { title: "당기기", desc: "팔꿈치를 옆구리 쪽으로 끌어내리며 손잡이를 어깨 높이까지! 날개뼈를 아래로 모아요", chip: "2초 · 후~ 내쉬며", media: "step2.webp", loop: true },
        { title: "버티며 올리기", desc: "무게에 끌려가지 말고 천천히 팔을 펴며 위로. 등이 쭉 늘어나는 걸 느껴요", chip: "3초 · 들이마시며", media: "step3.webp", loop: true }
      ],
      do: ["가슴을 세우고 날개뼈는 아래로", "팔꿈치가 손보다 먼저 내려오게", "올라갈 때 천천히 버티기"],
      dont: ["허리를 뒤로 젖혀 몸으로 당기기", "어깨를 귀 쪽으로 으쓱하기", "손목을 꺾어 손으로만 당기기"]
    }
  ],

  /* 주간 루틴 (루틴일지 v2.6 기준, 무게 배수 0.88) */
  routine: {
    version: "v2",
    updated: "2026. 10. 16",
    title: "주 5회 · 근비대",
    plan: ["가슴·등·하체·어깨·팔 5분할", "매주 무게 조금씩 올리기", "토 · 일은 푹 쉬고 잘 먹기"],
    key_point: "마지막 1~2개가 겨우 될 무게로! 자세가 무너지면 STOP",
    note: "세트 사이 1분 30초~2분 쉬기 · 덤벨 무게는 한 손 기준이에요",
    cardio: { minutes: 15, options: "경사 걷기 · 천국의 계단 · 사이클 중 택1" },
    days: [
      { day: "월", part: "가슴", en: "Chest", cardio: true, items: [
        { name: "펙덱 플라이", en: "Pec Deck Fly", tag: "워밍업", tip: "가볍게 가슴 풀기", sets: [[20, 20], [15, 20]] },
        { name: "벤치프레스", en: "Bench Press", tag: "메인", tip: "바는 가슴 중앙까지", sets: [[15, 27.5], [12, 30], [10, 32.5], [8, 35]] },
        { name: "인클라인 덤벨 프레스", en: "Incline DB Press", tip: "윗가슴으로 밀기", sets: [[12, 10], [12, 10], [12, 10]] },
        { name: "체스트 프레스", en: "Chest Press", tip: "가슴 펴고 밀기", sets: [[12, 35], [12, 35], [12, 35]] }
      ]},
      { day: "화", part: "등", en: "Back", cardio: true, items: [
        { name: "스트레이트 암 풀다운", en: "Straight Arm Pulldown", tag: "워밍업", tip: "팔 펴고 광배로 누르기", sets: [[20, 10], [15, 15]] },
        { name: "랫풀다운", en: "Lat Pulldown", tag: "메인", tip: "팔꿈치로 당기기", sets: [[15, 30], [12, 30], [10, 35], [8, 35]] },
        { name: "원암 덤벨 로우", en: "One Arm DB Row", tip: "팔꿈치를 골반 쪽으로", sets: [[12, 14], [12, 14], [12, 14]], form: "one-arm-row" },
        { name: "시티드 로우", en: "Seated Row", tip: "가슴 펴고 날개뼈 모으기", sets: [[12, 35], [12, 35], [12, 35]] }
      ]},
      { day: "수", part: "하체", en: "Legs", cardio: true, items: [
        { name: "레그 익스텐션", en: "Leg Extension", tag: "워밍업", tip: "무릎 풀어주기", sets: [[20, 20], [15, 20]] },
        { name: "레그프레스", en: "Leg Press", tag: "메인", tip: "무릎은 발끝 방향으로", sets: [[15, 80], [12, 85], [10, 90], [8, 100]] },
        { name: "덤벨 RDL", en: "DB Romanian Deadlift", tip: "엉덩이 뒤로, 허리 곧게", sets: [[12, 12], [12, 12], [12, 12]] },
        { name: "라잉 레그컬", en: "Lying Leg Curl", tip: "골반 패드에 붙이기", sets: [[12, 20], [12, 20], [12, 20]] }
      ]},
      { day: "목", part: "어깨", en: "Shoulder", cardio: true, items: [
        { name: "리버스 펙덱", en: "Reverse Pec Deck", tag: "워밍업", tip: "뒷어깨 가볍게 풀기", sets: [[20, 15], [15, 15]] },
        { name: "숄더 프레스", en: "Shoulder Press", tag: "메인", tip: "허리 등받이에 붙이기", sets: [[15, 20], [12, 25], [10, 25], [8, 25]] },
        { name: "사이드 레터럴 레이즈", en: "Lateral Raise", tip: "어깨 으쓱 금지", sets: [[15, 4], [15, 4], [15, 4]] },
        { name: "사이드 레터럴 레이즈 머신", en: "Machine Lateral Raise", tip: "팔꿈치로 옆으로 밀기", sets: [[15, 15], [15, 15], [15, 15]] },
        { name: "덤벨 슈러그", en: "DB Shrug", tip: "위로 올리고 1초 멈추기", sets: [[15, 14], [15, 14], [15, 14]] }
      ]},
      { day: "금", part: "팔", en: "Arms", cardio: true, items: [
        { name: "해머 컬", en: "Hammer Curl", tag: "워밍업", tip: "가볍게 팔 풀기", sets: [[20, 6], [15, 6]] },
        { name: "덤벨 컬", en: "DB Curl", tag: "메인", tip: "팔꿈치 고정, 반동 금지", sets: [[15, 8], [12, 8], [10, 8], [8, 8]] },
        { name: "케이블 푸쉬다운", en: "Cable Pushdown", tip: "팔꿈치 옆구리에 고정", sets: [[12, 20], [12, 20], [12, 20]] },
        { name: "오버헤드 익스텐션", en: "Overhead Extension", tip: "팔꿈치 벌어지지 않게", sets: [[12, 15], [12, 15], [12, 15]] },
        { name: "플랭크", en: "Plank", tip: "엉덩이 처지지 않게 버티기", sets: [["30초", null], ["30초", null], ["30초", null]] }
      ]},
      { day: "토", part: "휴식", en: "Rest", rest: true, items: [] },
      { day: "일", part: "휴식", en: "Rest", rest: true, items: [] }
    ]
  },

  /* 식단표 (없으면 null) */
  diet: null
};
