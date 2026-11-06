/* 김지수 회원님 홈페이지 데이터 — 이 파일만 고치면 페이지 내용이 바뀜 */
window.MEMBER = {
  name: "김지수",
  sex: "F",                       // M = 네이비, F = 핑크
  since: "2026. 11",
  goal: "벌크업 · 주 4회",
  journey: { start: "2026-06-15" },   // PT 시작일 (장동욱: 6월쯤 → 15일로 둠)

  /* 공지 (최신이 위) */
  notices: [
    { date: "2026. 11. 6", title: "루틴이 v7로 바뀌었어요", link: "routine-wed",
      body: "수요일 어깨 메인이 덤벨 숄더 프레스로 바뀌었어요. 사이드 레터럴 레이즈는 2kg로 시작해서 마지막 세트에 4kg로 올려요. 종목을 누르면 자세 복습지가 열려요!" },
    { date: "2026. 11. 6", title: "자세 복습지 3개가 올라왔어요",
      body: "덤벨 사이드 레터럴 레이즈 · 덤벨 숄더 프레스 · 케이블 푸쉬다운! 내 영상으로 자세를 다시 보고, 운동 전에 KEY POINT 한 번씩 읽어봐요. 루틴 탭 종목에서도 바로 열려요.", link: "forms" },
    { date: "2026. 11. 3", title: "PT 노트가 열렸어요",
      body: "이번 주 루틴(v6)이 올라와 있어요. 루틴 탭에서 요일을 누르면 그날 운동과 무게가 나와요. 자세 복습지·식단도 앞으로 여기로 올려드릴게요!" }
  ],
  /* 다음 수업 (없으면 null) */
  next_class: null,

  /* 자세 복습지 (최신이 위) */
  forms: [
    {
      id: "db-lateral-raise",
      dir: "media/form-db-lateral-raise/",
      date: "2026. 11. 6 (금)",
      exercise: "덤벨 사이드 레터럴 레이즈",
      exercise_en: "DB Lateral Raise",
      part: "어깨",
      targets: ["측면 삼각근 (옆 어깨)", "상부 승모근 · 전면 삼각근"],
      benefit: "옆 어깨를 동그랗게 채워줘요. 어깨선이 넓어지면 허리가 더 얇아 보이고 상체 라인이 예뻐져요",
      key_point: "손이 아니라 팔꿈치로 옆으로 밀어 올리고, 어깨 높이에서 멈춘다!",
      good_points: [
        { title: "어깨 높이까지 딱 올렸어요", desc: "팔이 바닥과 나란해질 때까지 올리고 그 이상은 안 올려서 옆 어깨에 정확히 들어갔어요" },
        { title: "팔꿈치를 살짝 굽혀 고정했어요", desc: "팔꿈치 각도가 매 회 같아서 팔이 아니라 어깨로 들었어요" },
        { title: "몸 반동 없이 들었어요", desc: "상체가 흔들리지 않고 서 있는 자세 그대로 반복했어요" }
      ],
      primary_muscles: [{ name: "측면 삼각근", where: "어깨 바깥쪽, 옆에서 볼 때 동그란 부분" }],
      secondary_muscles: "전면 삼각근 · 상부 승모근 · 극상근",
      feel_good: "어깨 옆쪽이 화끈하게 타는 느낌이에요",
      feel_stop: "목·승모근만 뻐근하거나, 어깨 안쪽이 찌릿해요",
      steps: [
        { title: "준비", desc: "발은 골반 너비, 배에 힘 주고 덤벨을 허벅지 옆에. 팔꿈치는 살짝 굽혀요", chip: "숨 들이마시기", media: "step1.jpg" },
        { title: "들어 올리기", desc: "팔꿈치로 옆으로 밀듯이 어깨 높이까지! 새끼손가락 쪽이 살짝 높게", chip: "1~2초 · 후~ 내쉬며", media: "step2.webp", loop: true },
        { title: "내리기", desc: "버티면서 허벅지 옆까지 천천히. 툭 떨어뜨리지 않아요", chip: "2~3초 · 들이마시며", media: "step3.webp", loop: true }
      ],
      do: ["팔꿈치 살짝 굽힌 채 고정", "어깨 높이까지만 올리기", "내릴 때 천천히 버티기"],
      dont: ["어깨를 귀 쪽으로 으쓱하기", "몸을 흔들어 반동으로 올리기", "어깨보다 높이 올리기"]
    },
    {
      id: "db-shoulder-press",
      dir: "media/form-db-shoulder-press/",
      date: "2026. 11. 6 (금)",
      exercise: "덤벨 숄더 프레스",
      exercise_en: "DB Shoulder Press",
      part: "어깨",
      targets: ["삼각근 (앞·옆 어깨)", "삼두근 · 상부 승모근"],
      benefit: "어깨 전체를 크고 둥글게 키워줘요. 벌크업 때 상체 볼륨을 채우는 대표 운동이에요",
      key_point: "덤벨은 귀 옆까지 내리고, 머리 위로 곧게 밀어 올린다!",
      good_points: [
        { title: "귀 높이까지 충분히 내렸어요", desc: "팔꿈치가 90도 정도 될 때까지 내려서 어깨가 넓은 범위로 일했어요" },
        { title: "손목이 팔꿈치 위에 있었어요", desc: "덤벨이 앞뒤로 쏠리지 않고 팔뚝이 세워져서 힘이 그대로 위로 갔어요" },
        { title: "등받이에 기대 안정적이었어요", desc: "허리를 등받이에 붙인 채 상체가 흔들리지 않고 반복했어요" }
      ],
      primary_muscles: [{ name: "삼각근 전면·측면", where: "어깨 앞과 옆, 동그란 부분" }],
      secondary_muscles: "삼두근 · 상부 승모근 · 윗가슴",
      feel_good: "어깨 앞·옆이 터질 듯 뻐근해요",
      feel_stop: "허리가 찌릿하거나, 목·승모근만 뻐근해요",
      steps: [
        { title: "준비", desc: "등받이를 세우고 앉아 허리를 붙여요. 덤벨을 귀 옆에 두고 팔꿈치는 손목 바로 아래", chip: "숨 들이마시기", media: "step1.jpg" },
        { title: "밀어 올리기", desc: "어깨로 밀어 머리 위로! 위에서 덤벨이 살짝 모이고 팔꿈치는 살짝 굽힌 채", chip: "1~2초 · 후~ 내쉬며", media: "step2.webp", loop: true },
        { title: "내리기", desc: "버티면서 귀 옆까지 천천히. 어깨가 쭉 늘어나는 걸 느껴요", chip: "2~3초 · 들이마시며", media: "step3.webp", loop: true }
      ],
      do: ["허리는 등받이에 붙이기", "손목은 팔꿈치 바로 위에", "덤벨은 귀 옆까지 내리기"],
      dont: ["허리를 뒤로 젖혀서 밀기", "어깨를 귀 쪽으로 으쓱하기", "반만 내리고 빨리 올리기"]
    },
    {
      id: "cable-pushdown",
      dir: "media/form-cable-pushdown/",
      date: "2026. 11. 6 (금)",
      exercise: "케이블 푸쉬다운",
      exercise_en: "Cable Pushdown",
      part: "팔 (삼두)",
      targets: ["삼두근 (팔 뒤쪽)", "전완근"],
      benefit: "팔 뒤쪽을 탄탄하게 잡아줘요. 팔뚝 뒤 출렁이는 부분이 단단해지고, 프레스 운동 힘도 같이 좋아져요",
      key_point: "팔꿈치는 옆구리에 딱 고정! 팔꿈치 아래만 움직여서 끝까지 편다",
      good_points: [
        { title: "팔꿈치가 옆구리에 붙어 있었어요", desc: "누르고 올라올 때 팔꿈치 위치가 거의 그대로라 삼두에만 힘이 들어갔어요" },
        { title: "끝까지 쭉 폈어요", desc: "매 회 팔을 다 펴서 팔 뒤쪽을 꽉 조이고 올라왔어요" },
        { title: "상체가 흔들리지 않았어요", desc: "몸으로 누르지 않고 선 자세 그대로 팔 힘으로만 반복했어요" }
      ],
      primary_muscles: [{ name: "삼두근", where: "팔 뒤쪽, 팔꿈치 위 말랑한 부분" }],
      secondary_muscles: "전완근 (손목·아래팔)",
      feel_good: "팔 뒤쪽이 꽉 조이면서 뜨거워요",
      feel_stop: "팔꿈치 관절이 찌릿하거나, 어깨 앞이 아파요",
      steps: [
        { title: "준비", desc: "케이블 앞에 서서 손잡이를 잡고 팔꿈치를 옆구리에 붙여요. 배에 힘, 상체는 살짝 앞으로", chip: "숨 들이마시기", media: "step1.jpg" },
        { title: "눌러 내리기", desc: "팔꿈치는 그대로! 손만 허벅지 쪽으로 쭉 밀어 팔을 끝까지 펴요", chip: "1~2초 · 후~ 내쉬며", media: "step2.webp", loop: true },
        { title: "올라오기", desc: "버티면서 천천히, 팔꿈치가 90도 될 때까지만 올라와요", chip: "2초 · 들이마시며", media: "step3.webp", loop: true }
      ],
      do: ["팔꿈치는 옆구리에 고정", "끝에서 팔 뒤쪽 꽉 조이기", "올라올 땐 천천히 버티기"],
      dont: ["팔꿈치가 앞뒤로 따라 움직이기", "상체를 숙여 몸무게로 누르기", "손이 얼굴까지 올라오기"]
    }
  ],

  /* 주간 루틴 */
  routine: {
    version: "v7",
    updated: "2026. 11. 6",
    title: "주 4회 · 벌크업",
    plan: ["등·엉덩이·어깨·가슴 4분할", "매주 무게 조금씩 올리기", "금~일은 푹 쉬고 잘 먹기"],
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
      { day: "화", part: "엉덩이", en: "Glute", cardio: false, items: [
        { name: "고블릿 스쿼트", en: "Goblet Squat", tag: "선행", tip: "가슴 세우고 깊이 앉기", sets: [[20, 6], [15, 8], [12, 10]] },
        { name: "이너타이", en: "Inner Thigh", tag: "선행", tip: "천천히 모으고 버티기", sets: [[15, 15], [12, 20], [10, 25]] },
        { name: "아웃타이 머신", en: "Outer Thigh", icon: "outer_thigh_pin", tag: "선행", tip: "엉덩이 옆으로 밀기", sets: [[20, 20], [15, 25], [12, 30]] },
        { name: "힙쓰러스트 머신", en: "Hip Thrust", icon: "hip_thrust", tag: "메인", tip: "맨 위에서 엉덩이 꽉", sets: [[15, 10], [12, 10], [10, 15], [8, 15]] }
      ]},
      { day: "수", part: "어깨", en: "Shoulder", cardio: true, items: [
        { name: "레터럴 레이즈 머신", en: "Standing Machine", tag: "워밍업", tip: "가볍게 어깨 풀기", sets: [[20, 5], [15, 10]] },
        { name: "덤벨 숄더 프레스", en: "DB Shoulder Press", form: "db-shoulder-press", tag: "메인", tip: "덤벨은 귀 옆까지 내리기", sets: [[15, 4], [12, 4], [10, 6], [8, 6]] },
        { name: "사이드 레터럴 레이즈 (덤벨)", en: "Lateral Raise", form: "db-lateral-raise", tip: "2kg로 시작 → 마지막 세트 4kg", sets: [[15, 2], [15, 2], [15, 4]] },
        { name: "리버스 펙덱", en: "Reverse Pec Deck", tip: "날개뼈 모으며 옆으로", sets: [[15, 15], [15, 15], [15, 15]] }
      ]},
      { day: "목", part: "가슴", en: "Chest", cardio: false, items: [
        { name: "펙덱 플라이", en: "Pec Deck Fly", tag: "워밍업", tip: "가슴 모은다는 느낌", sets: [[20, 15], [15, 15]] },
        { name: "체스트 프레스 머신", en: "Chest Press", icon: "chest_press", tag: "메인", tip: "가슴 펴고 밀기", sets: [[15, 20], [12, 20], [10, 25], [8, 25]] },
        { name: "인클라인 덤벨 프레스", en: "Incline DB Press", tip: "윗가슴으로 밀기", sets: [[12, 6], [12, 6], [12, 6]] },
        { name: "케이블 푸쉬다운", en: "Cable Pushdown", form: "cable-pushdown", tip: "팔꿈치 옆구리에 고정", sets: [[15, 15], [15, 15], [15, 15]] }
      ]},
      { day: "금", part: "휴식", en: "Rest", rest: true, items: [] },
      { day: "토", part: "휴식", en: "Rest", rest: true, items: [] },
      { day: "일", part: "휴식", en: "Rest", rest: true, items: [] }
    ]
  },

  /* 식단표 (없으면 null) */
  diet: null
};
