/* 정미경 회원님 홈페이지 데이터 — 이 파일만 고치면 페이지 내용이 바뀜 */
window.MEMBER = {
  name: "정미경",
  sex: "F",                       // M = 네이비, F = 핑크
  since: "2026. 11",
  goal: "벌크업 · 주 4회",
  journey: { start: "2026-09-15" },   // PT 시작일 (장동욱: 9월 → 15일로 둠)

  /* 공지 (최신이 위) */
  notices: [
    { date: "2026. 11. 6", title: "자세 복습지 3개가 올라왔어요",
      body: "펙덱 플라이 · 시티드 페이스풀 · 체스트 프레스 머신 복습지예요. 영상으로 자세 한 번 보고 운동하면 훨씬 잘 들어가요! 루틴 탭 종목에서 '▶ 자세 복습지 보기'를 눌러도 바로 열려요.",
      link: "forms" },
    { date: "2026. 11. 5", title: "PT 노트가 열렸어요",
      body: "이번 주 루틴(v3)이 올라와 있어요. 루틴 탭에서 요일을 누르면 그날 운동과 무게가 나와요. 토요일 엉덩이 운동은 저랑 PT 수업으로 같이 해요! 자세 복습지·식단도 앞으로 여기로 올려드릴게요." }
  ],
  /* 다음 수업 (없으면 null) */
  next_class: "매주 토요일 · 엉덩이 PT 수업",

  /* 자세 복습지 (최신이 위) */
  forms: [
    {
      id: "chest-press",
      dir: "media/form-chest-press/",
      date: "2026. 11. 5 (목)",
      exercise: "체스트 프레스 머신",
      exercise_en: "Chest Press Machine",
      part: "가슴",
      targets: ["대흉근 (가슴)", "전면 삼각근 · 삼두근"],
      benefit: "가슴 앞판을 탄탄하게 채우고, 미는 힘을 길러줘요",
      key_point: "등은 등받이에 붙이고, 가슴으로 밀어낸다!",
      good_points: [
        { title: "등을 등받이에 붙였어요", desc: "밀 때 몸이 앞으로 따라 나오지 않아서 가슴에 힘이 모였어요" },
        { title: "손잡이를 가슴 높이로 잡았어요", desc: "손이 어깨보다 높지 않아서 어깨가 아닌 가슴으로 밀었어요" },
        { title: "천천히 돌아왔어요", desc: "돌아올 때 무게를 버티며 내려와서 가슴이 쭉 늘어났어요" }
      ],
      primary_muscles: [{ name: "대흉근", where: "가슴 앞 전체" }],
      secondary_muscles: "전면 삼각근 · 삼두근",
      feel_good: "가슴 가운데와 겨드랑이 앞쪽이 뻐근해요",
      feel_stop: "어깨 앞이 찌릿하거나, 가슴은 그대로고 팔만 아파요",
      steps: [
        { title: "준비", desc: "등과 엉덩이를 등받이에 붙이고 날개뼈를 모아 가슴을 열어요. 손잡이는 가슴 높이로", chip: "숨 들이마시기", media: "step1.jpg" },
        { title: "밀기", desc: "가슴을 모은다는 느낌으로 앞으로 밀어요. 끝에서 팔꿈치는 살짝 굽힌 채 멈춰요", chip: "2초 · 후~ 내쉬며", media: "step2.webp", loop: true },
        { title: "돌아오기", desc: "무게를 버티면서 손잡이가 가슴 옆에 올 때까지 천천히 돌아와요", chip: "3초 · 들이마시며", media: "step3.webp", loop: true }
      ],
      do: ["등·엉덩이는 등받이에 붙인 채로", "손잡이는 가슴 높이로 잡기", "돌아올 때 천천히, 가슴이 늘어나게"],
      dont: ["밀 때 등을 등받이에서 떼기", "어깨를 귀 쪽으로 으쓱 올리기", "끝에서 팔꿈치를 쭉 펴서 잠그기"]
    },
    {
      id: "seated-face-pull",
      dir: "media/form-seated-face-pull/",
      date: "2026. 11. 5 (목)",
      exercise: "시티드 페이스풀",
      exercise_en: "Seated Face Pull",
      part: "어깨·등",
      targets: ["후면 삼각근", "중부 승모근 · 능형근"],
      benefit: "굽은 어깨를 펴주고 어깨 뒤쪽을 탄탄하게 만들어줘요",
      key_point: "팔꿈치를 높게, 로프를 얼굴 양옆으로 벌려 당긴다!",
      good_points: [
        { title: "상체를 세우고 버텼어요", desc: "몸이 뒤로 젖혀지지 않아서 반동 없이 어깨로만 당겼어요" },
        { title: "팔꿈치를 높게 들었어요", desc: "팔꿈치가 어깨 높이까지 올라가 어깨 뒤쪽에 자극이 갔어요" },
        { title: "같은 속도로 반복했어요", desc: "당길 때와 돌아갈 때 속도가 일정해서 자극이 끊기지 않았어요" }
      ],
      primary_muscles: [{ name: "후면 삼각근", where: "어깨 뒤쪽" }, { name: "중부 승모근 · 능형근", where: "날개뼈 사이" }],
      secondary_muscles: "회전근개(극하근 · 소원근) · 하부 승모근",
      feel_good: "어깨 뒤쪽과 날개뼈 사이가 뻐근해요",
      feel_stop: "목·승모근이 뻐근하게 올라오거나, 팔만 아파요",
      steps: [
        { title: "준비", desc: "의자에 앉아 가슴을 세우고, 로프를 손등이 위로 오게 잡아 팔을 앞으로 뻗어요", chip: "숨 들이마시기", media: "step1.jpg" },
        { title: "당기기", desc: "팔꿈치를 어깨 높이로 들고, 로프를 얼굴 양옆으로 벌리며 당겨요. 날개뼈를 모으고 1초!", chip: "2초 · 후~ 내쉬며", media: "step2.webp", loop: true },
        { title: "돌아가기", desc: "어깨가 앞으로 끌려가지 않게 버티면서 천천히 팔을 펴요", chip: "3초 · 들이마시며", media: "step3.webp", loop: true }
      ],
      do: ["가슴 세우고 상체는 고정", "팔꿈치는 손보다 높게", "당긴 끝에서 날개뼈 모으고 1초 멈춤"],
      dont: ["몸을 뒤로 젖혀 반동 쓰기", "어깨를 귀 쪽으로 으쓱 올리기", "로프를 턱·목 아래로 당기기"]
    },
    {
      id: "pec-deck-fly",
      dir: "media/form-pec-deck-fly/",
      date: "2026. 11. 5 (목)",
      exercise: "펙덱 플라이",
      exercise_en: "Pec Deck Fly",
      part: "가슴",
      targets: ["대흉근 (가슴 안쪽)", "전면 삼각근"],
      benefit: "가슴 가운데 라인을 또렷하게, 가슴을 모아주는 힘을 길러줘요",
      key_point: "팔이 아니라 가슴으로 큰 원을 그리며 모은다!",
      good_points: [
        { title: "등을 패드에 붙이고 앉았어요", desc: "상체가 흔들리지 않아서 가슴으로만 모을 수 있었어요" },
        { title: "가슴이 열릴 만큼 벌렸어요", desc: "팔을 어깨 라인까지 벌려서 가슴이 충분히 늘어났어요" },
        { title: "앞에서 끝까지 모았어요", desc: "손잡이를 가슴 앞까지 모아서 가슴 안쪽까지 힘이 들어갔어요" }
      ],
      primary_muscles: [{ name: "대흉근", where: "가슴 앞 · 가운데 안쪽" }],
      secondary_muscles: "전면 삼각근 · 이두근(팔 고정)",
      feel_good: "가슴 가운데가 꽉 모이고, 벌릴 때 가슴이 쭉 늘어나요",
      feel_stop: "어깨 앞이 찌릿하거나, 팔뚝만 힘들어요",
      steps: [
        { title: "준비", desc: "등을 패드에 붙이고 가슴을 펴요. 손잡이는 가슴 높이, 팔꿈치는 살짝 굽힌 채 고정", chip: "숨 들이마시기", media: "step1.jpg" },
        { title: "모으기", desc: "큰 나무를 안듯이 가슴 앞까지 모아요. 끝에서 가슴을 꽉 짜고 1초!", chip: "2초 · 후~ 내쉬며", media: "step2.webp", loop: true },
        { title: "돌아가기", desc: "가슴이 늘어나는 느낌을 느끼며 어깨 라인까지만 천천히 벌려요", chip: "3초 · 들이마시며", media: "step3.webp", loop: true }
      ],
      do: ["등은 패드에, 가슴은 활짝 편 채로", "팔꿈치 각도는 처음 그대로 고정", "모은 끝에서 가슴 꽉 1초"],
      dont: ["어깨 뒤로 넘어가게 너무 많이 벌리기", "어깨를 으쓱 올리고 팔로만 모으기", "반동으로 손잡이를 쾅 부딪치기"]
    }
  ],

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
        { name: "시티드 페이스풀", en: "Seated Face Pull", tag: "워밍업", tip: "날개뼈 모으며 얼굴 쪽으로", sets: [[20, 10], [15, 15]], form: "seated-face-pull" },
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
        { name: "펙덱 플라이", en: "Pec Deck Fly", tag: "워밍업", tip: "가슴 모은다는 느낌", sets: [[20, 15], [15, 15]], form: "pec-deck-fly" },
        { name: "체스트 프레스 머신", en: "Chest Press", icon: "chest_press", tag: "메인", tip: "가슴 펴고 밀기", sets: [[15, 20], [12, 20], [10, 25], [8, 25]], form: "chest-press" },
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
