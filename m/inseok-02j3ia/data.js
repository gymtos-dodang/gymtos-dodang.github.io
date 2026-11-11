/* 서인석 회원님 홈페이지 데이터 — 이 파일만 고치면 페이지 내용이 바뀜 */
window.MEMBER = {
  name: "서인석",
  sex: "M",                       // M = 네이비, F = 핑크
  since: "2026. 11",
  goal: "근력 · 근육량 키우기",
  journey: { start: "2026-07-15" },   // PT 시작일 (장동욱: 7월 → 15일로 둠)

  /* 공지 (최신이 위) */
  notices: [
    { date: "2026. 11. 12", title: "등 자세 복습지 2개가 올라왔어요", link: "forms",
      body: "랫풀다운 · 뉴텍 시티드 로우 머신 (11/10 촬영). 화요일 등 루틴 하기 전에 영상으로 한 번 보고 가세요!" },
    { date: "2026. 11. 8", title: "새 주 4회 루틴이 올라왔어요", link: "routine",
      body: "가슴 · 등 · 하체 · 어깨팔, 주 4회 루틴이에요. 수업 없는 날도 루틴대로 혼자 나와서 해보세요! 메인 종목은 금색이에요." },
    { date: "2026. 11. 8", title: "PT 노트가 열렸어요",
      body: "서인석 회원님만의 운동 노트예요! 앞으로 주간 루틴·자세 복습지·식단을 여기로 올려드릴게요. 운동 오신 날은 홈에서 '오늘 출석'을 꼭 눌러주세요." }
  ],
  /* 다음 수업 (없으면 null) */
  next_class: null,

  /* 자세 복습지 (최신이 위) */
  forms: [
    {
      id: "lat-pulldown",
      dir: "media/form-lat-pulldown/",
      date: "2026. 11. 10 (화)",
      exercise: "랫풀다운",
      exercise_en: "Lat Pulldown",
      part: "등",
      targets: ["광배근 (등 날개)", "대원근 · 이두근"],
      benefit: "등을 옆으로 넓혀서 어깨는 넓고 허리는 가늘어 보이는 V라인을 만들어줘요",
      key_point: "손이 아니라 팔꿈치로, 가슴 위쪽까지 끌어내린다!",
      good_points: [
        { title: "위에서 팔을 끝까지 폈어요", desc: "올라갈 때 등이 쭉 늘어나서 운동 범위를 넓게 썼어요" },
        { title: "가슴 위쪽까지 끌어내렸어요", desc: "손잡이가 얼굴 앞을 지나 쇄골 아래까지 와서 등을 끝까지 썼어요" },
        { title: "허벅지 패드로 몸을 고정했어요", desc: "무거운 무게에도 엉덩이가 뜨지 않아 등에만 힘이 들어갔어요" }
      ],
      primary_muscles: [{ name: "광배근", where: "겨드랑이 아래 옆구리 쪽 등" }],
      secondary_muscles: "대원근 · 능형근 · 이두근 · 후면 삼각근",
      feel_good: "겨드랑이 아래 옆구리 쪽 등이 뻐근해요",
      feel_stop: "팔(이두)만 터질 것 같거나, 목·어깨 위쪽이 뭉쳐요",
      steps: [
        { title: "준비", desc: "허벅지 패드를 딱 맞게 내리고, 손잡이를 잡아 팔을 쭉 편 채 가슴을 살짝 펴요", chip: "숨 들이마시기", media: "step1.jpg" },
        { title: "당기기", desc: "팔꿈치를 옆구리 쪽으로 끌어내리며 손잡이를 가슴 위쪽(쇄골 아래)까지", chip: "1~2초 · 후~ 내쉬며", media: "step2.webp", loop: true },
        { title: "올려 보내기", desc: "등이 늘어나는 느낌으로 천천히, 팔이 다 펴질 때까지 올려요", chip: "3초 · 들이마시며", media: "step3.webp", loop: true }
      ],
      do: ["가슴을 펴고 살짝 뒤로 기대기", "팔꿈치를 옆구리 쪽으로 끌어내리기", "올라갈 땐 천천히, 팔 끝까지 펴기"],
      dont: ["몸을 크게 뒤로 젖혀 반동 쓰기", "어깨를 귀 쪽으로 으쓱 올리기", "손잡이를 목 뒤로 당기기"]
    },
    {
      id: "nutek-seated-row",
      dir: "media/form-nutek-seated-row/",
      date: "2026. 11. 10 (화)",
      exercise: "뉴텍 시티드 로우 머신",
      also: ["시티드 로우 머신", "시티드 로우"],
      exercise_en: "Seated Row Machine",
      part: "등",
      targets: ["광배근 · 능형근", "승모근 중부 · 후면 삼각근"],
      benefit: "날개뼈를 모아 당겨서, 등 가운데를 두껍게 채우고 굽은 어깨를 펴줘요",
      key_point: "상체는 그대로! 팔꿈치를 뒤로 보내 날개뼈를 꽉 모은다",
      good_points: [
        { title: "상체를 곧게 세우고 당겼어요", desc: "몸을 뒤로 젖히지 않아서 반동 없이 등으로만 당겼어요" },
        { title: "팔꿈치를 몸 뒤까지 보냈어요", desc: "손잡이를 옆구리까지 끌어와 날개뼈 사이가 꽉 조여졌어요" },
        { title: "보낼 때 팔을 다 폈어요", desc: "상체는 그대로 두고 팔만 앞으로 펴서 등이 충분히 늘어났어요" }
      ],
      primary_muscles: [{ name: "광배근", where: "겨드랑이 아래 옆구리 쪽 등" }, { name: "능형근", where: "날개뼈 사이 등 가운데" }],
      secondary_muscles: "승모근 중부 · 대원근 · 후면 삼각근 · 이두근",
      feel_good: "날개뼈 사이와 옆구리 쪽 등이 뻐근해요",
      feel_stop: "허리가 아프거나, 팔뚝·어깨 앞쪽만 타요",
      steps: [
        { title: "준비", desc: "손잡이가 가슴 아래 높이에 오게 의자를 맞추고, 발판을 딛고 앉아 팔을 쭉 펴요", chip: "숨 들이마시기", media: "step1.jpg" },
        { title: "당기기", desc: "팔꿈치를 몸통 옆에 붙인 채 뒤로 끌어당기며 날개뼈를 모아요. 끝에서 1초", chip: "1~2초 · 후~ 내쉬며", media: "step2.webp", loop: true },
        { title: "보내기", desc: "등이 앞으로 늘어나는 느낌으로 천천히, 팔이 다 펴질 때까지", chip: "3초 · 들이마시며", media: "step3.webp", loop: true }
      ],
      do: ["가슴을 펴고 상체는 고정", "팔꿈치를 몸통 옆으로 붙여 뒤로", "당긴 끝에서 날개뼈 1초 꽉"],
      dont: ["상체를 뒤로 젖혀 당기기", "어깨를 귀 쪽으로 으쓱 올리기", "손목을 꺾어 손으로만 당기기"]
    }
  ],

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
