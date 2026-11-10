/* 조혜영 회원님 홈페이지 데이터 — 이 파일만 고치면 페이지 내용이 바뀜 */
window.MEMBER = {
  name: "조혜영",
  sex: "F",                       // M = 네이비, F = 핑크
  since: "2026. 11",
  goal: "건강하고 탄탄한 몸 만들기",
  journey: { start: "2026-07-15" },   // PT 시작일 (장동욱: 7월 → 15일로 둠)

  /* 공지 (최신이 위) */
  notices: [
    { date: "2026. 11. 10", title: "주 5회 힙업 루틴이 올라왔어요", link: "routine",
      body: "월·수·금은 엉덩이, 화는 가슴·어깨, 목은 등이에요. 운동 끝나면 유산소 20분까지! 화요일 가슴 운동은 복습지 영상 한 번 보고 들어가세요." },
    { date: "2026. 11. 10", title: "가슴 운동 복습지 3개가 올라왔어요", link: "forms",
      body: "스미스 인클라인 프레스 · 펙덱 플라이 · 체스트프레스 머신 복습지예요. 운동 전에 영상으로 자세 한 번 보고 들어가면 가슴에 훨씬 잘 들어가요!" },
    { date: "2026. 11. 10", title: "PT 노트가 열렸어요",
      body: "조혜영 회원님만의 운동 노트예요! 앞으로 주간 루틴·자세 복습지·식단을 여기로 올려드릴게요. 운동 오신 날은 홈에서 '오늘 출석'을 꼭 눌러주세요." }
  ],
  /* 다음 수업 (없으면 null) */
  next_class: null,

  /* 자세 복습지 (최신이 위) */
  forms: [
    {
      id: "smith-incline-press",
      dir: "media/form-smith-incline-press/",
      date: "2026. 11. 9 (월)",
      exercise: "스미스 인클라인 프레스",
      exercise_en: "Smith Incline Press",
      part: "가슴",
      targets: ["윗가슴 (대흉근 상부)", "전면 삼각근 · 삼두근"],
      benefit: "윗가슴을 채워서 쇄골 아래 라인이 탄탄하게 살아나요. 바가 레일을 따라 움직여 균형 걱정 없이 밀 수 있어요",
      key_point: "바는 윗가슴으로 내리고, 날개뼈는 끝까지 모은다!",
      good_points: [
        { title: "바를 윗가슴까지 내렸어요", desc: "바가 쇄골 아래쪽으로 내려와서 윗가슴이 충분히 늘어났다가 일했어요" },
        { title: "등과 머리를 벤치에 붙였어요", desc: "밀 때 몸이 들썩이지 않아서 각도가 그대로 유지됐어요" },
        { title: "끝까지 밀어 올렸어요", desc: "위에서 팔을 거의 다 펴서 가슴이 꽉 모이는 구간까지 썼어요" }
      ],
      primary_muscles: [{ name: "대흉근 상부", where: "쇄골 아래 윗가슴" }],
      secondary_muscles: "가슴 아래쪽 · 전면 삼각근 · 삼두근",
      feel_good: "쇄골 아래 윗가슴이 뻐근해요",
      feel_stop: "어깨 앞만 타거나, 손목이 뒤로 꺾여서 아파요",
      steps: [
        { title: "준비", desc: "등받이를 30도 정도 세우고 머리·등·엉덩이를 붙여요. 날개뼈를 모아 가슴을 연 다음, 바를 풀고 팔을 편 자리에서 시작해요", chip: "숨 들이마시기", media: "step1.jpg" },
        { title: "내리기", desc: "팔꿈치를 몸통에서 45도 정도 벌리며 바를 윗가슴까지 천천히 내려요", chip: "3초 · 들이마시며", media: "step2.webp", loop: true },
        { title: "밀어 올리기", desc: "윗가슴으로 밀어 처음 자리까지! 맨 위에서 팔꿈치는 살짝 굽힌 채 멈춰요", chip: "1~2초 · 후~ 내쉬며", media: "step3.webp", loop: true }
      ],
      do: ["날개뼈 모으고 가슴을 위로 세우기", "바는 윗가슴(쇄골 아래)으로 내리기", "손목은 팔꿈치 바로 위에 세우기"],
      dont: ["엉덩이를 벤치에서 띄우기", "바를 목 쪽이나 명치로 내리기", "가슴에 튕겨서 올리기"]
    },
    {
      id: "pec-deck-fly",
      dir: "media/form-pec-deck-fly/",
      date: "2026. 11. 9 (월)",
      exercise: "펙덱 플라이",
      exercise_en: "Pec Deck Fly",
      part: "가슴",
      targets: ["대흉근 (가슴)", "전면 삼각근"],
      benefit: "가슴 안쪽까지 모아줘서 가슴 가운데 라인이 또렷해져요. 팔이 아닌 가슴만 쓰는 감각을 익히기 좋아요",
      key_point: "팔로 당기지 말고, 가슴으로 껴안듯이 모은다!",
      good_points: [
        { title: "등을 등받이에 붙이고 했어요", desc: "모을 때 상체가 앞으로 따라 나오지 않아서 가슴만 일했어요" },
        { title: "팔꿈치를 살짝 굽힌 채 유지했어요", desc: "팔 모양이 끝까지 그대로라 팔이 아닌 가슴으로 모았어요" },
        { title: "가슴 앞에서 손잡이를 모았어요", desc: "손잡이가 가슴 높이 앞에서 만나서 가슴 안쪽까지 꽉 조였어요" }
      ],
      primary_muscles: [{ name: "대흉근", where: "가슴 앞, 특히 가운데 안쪽" }],
      secondary_muscles: "전면 삼각근 · 이두근(짧은 쪽)",
      feel_good: "가슴 가운데가 꽉 조이고, 벌릴 때 가슴이 쭉 늘어나요",
      feel_stop: "어깨 앞이 찌릿하거나, 팔 안쪽만 아파요",
      steps: [
        { title: "준비", desc: "손잡이가 가슴 높이에 오게 의자를 맞추고 등을 붙여요. 가슴을 열고 팔꿈치는 살짝 굽힌 채 손잡이를 잡아요", chip: "숨 들이마시기", media: "step1.jpg" },
        { title: "모으기", desc: "큰 나무를 껴안듯이 가슴 앞으로 모아요. 손잡이가 만나면 1초 꽉!", chip: "2초 · 후~ 내쉬며", media: "step2.webp", loop: true },
        { title: "천천히 벌리기", desc: "무게를 버티면서 가슴이 늘어나는 느낌으로, 어깨 옆 선까지만 천천히 벌려요", chip: "3초 · 들이마시며", media: "step3.webp", loop: true }
      ],
      do: ["등과 머리는 등받이에 붙인 채로", "팔꿈치는 살짝 굽힌 모양 그대로", "모은 끝에서 1초 쥐어짜기"],
      dont: ["어깨를 귀 쪽으로 으쓱 올리기", "팔꿈치를 굽혔다 폈다 하며 팔로 밀기", "벌릴 때 어깨 뒤까지 너무 깊게 젖히기"]
    },
    {
      id: "chest-press-machine",
      dir: "media/form-chest-press-machine/",
      date: "2026. 11. 9 (월)",
      exercise: "체스트프레스 머신",
      exercise_en: "Chest Press Machine",
      part: "가슴",
      targets: ["대흉근 (가슴)", "전면 삼각근 · 삼두근"],
      benefit: "가슴 앞판을 탄탄하게 채우고 미는 힘을 길러줘요. 손잡이 길이 정해져 있어 자세 잡기 쉬워요",
      key_point: "날개뼈는 모으고, 가슴으로 밀어낸다!",
      good_points: [
        { title: "등을 등받이에 붙이고 밀었어요", desc: "밀 때 몸이 앞으로 따라 나오지 않아서 힘이 가슴에 모였어요" },
        { title: "손잡이를 가슴 옆까지 가져왔어요", desc: "돌아올 때 손잡이가 가슴 옆까지 와서 가슴이 충분히 늘어났어요" },
        { title: "발로 바닥을 디뎠어요", desc: "하체가 받쳐줘서 몸통이 흔들리지 않고 안정적으로 밀었어요" }
      ],
      primary_muscles: [{ name: "대흉근", where: "가슴 앞 전체" }],
      secondary_muscles: "전면 삼각근 · 삼두근",
      feel_good: "가슴 가운데와 겨드랑이 앞쪽이 뻐근해요",
      feel_stop: "어깨 앞이 찌릿하거나, 가슴은 그대로고 팔만 아파요",
      steps: [
        { title: "준비", desc: "손잡이가 가슴 중간 높이에 오게 의자를 맞추고 등을 붙여요. 날개뼈를 모아 가슴을 열고, 손잡이는 가슴 옆에서 잡아요", chip: "숨 들이마시기", media: "step1.jpg" },
        { title: "밀기", desc: "가슴을 모은다는 느낌으로 앞으로 밀어요. 끝에서 팔꿈치는 살짝 굽힌 채 멈춰요", chip: "1~2초 · 후~ 내쉬며", media: "step2.webp", loop: true },
        { title: "돌아오기", desc: "무게를 버티면서 손잡이가 가슴 옆에 올 때까지 천천히 돌아와요", chip: "3초 · 들이마시며", media: "step3.webp", loop: true }
      ],
      do: ["등은 등받이에 붙인 채로", "날개뼈 모으고 가슴 열기", "돌아올 때 천천히, 가슴이 늘어나게"],
      dont: ["밀 때 등을 등받이에서 떼기", "어깨를 귀 쪽으로 으쓱 올리기", "끝에서 팔꿈치를 쭉 펴서 잠그기"]
    }
  ],

  /* 주간 루틴 (없으면 null → "루틴이 아직 없어요") */
  routine: {
    version: "v1",
    updated: "2026. 11. 10",
    title: "주 5회 · 힙업 집중",
    plan: ["엉덩이 주 3번 (월 · 수 · 금)", "화 가슴·어깨 / 목 등", "토 · 일은 푹 쉬고 잘 먹기"],
    key_point: "엉덩이는 일주일에 3번! 무게보다 엉덩이 자극 먼저, 천천히 올려가요",
    note: "세트 사이 1분~1분 30초 쉬기 · 덤벨 무게는 한 손 기준이에요",
    cardio: { minutes: 20, options: "경사 걷기 · 천국의 계단 · 사이클 중 택1" },
    days: [
      { day: "월", part: "힙 A", en: "Glute A", cardio: true, items: [
        { name: "레그 익스텐션", en: "Leg Extension", tag: "워밍업", tip: "가볍게 무릎 풀기", sets: [[20, 10], [15, 15]] },
        { name: "아웃타이 머신", en: "Outer Thigh", icon: "outer_thigh_pin", tag: "선행", tip: "엉덩이 옆으로 밀기", sets: [[20, 15], [15, 20], [12, 20]] },
        { name: "힙쓰러스트 머신", en: "Hip Thrust", icon: "hip_thrust", tag: "메인", tip: "맨 위에서 엉덩이 꽉 1초", sets: [[15, 20], [12, 20], [10, 25], [8, 25]] },
        { name: "덤벨 RDL", en: "Dumbbell RDL", tip: "엉덩이 뒤로 빼며 허벅지 뒤 늘리기", sets: [[12, 6], [12, 6], [12, 6]] },
        { name: "라잉 레그컬", en: "Lying Leg Curl", tip: "엉덩이 들리지 않게", sets: [[12, 10], [12, 10], [12, 10]] }
      ]},
      { day: "화", part: "가슴·어깨", en: "Chest · Shoulder", cardio: true, items: [
        { name: "펙덱 플라이", en: "Pec Deck Fly", tag: "워밍업", tip: "가슴으로 껴안듯이 모으기", sets: [[20, 10], [15, 10]], form: "pec-deck-fly" },
        { name: "스미스 인클라인 프레스", en: "Smith Incline Press", tag: "메인", tip: "바는 윗가슴으로 내리기", sets: [[15, 15], [12, 15], [10, 20], [8, 20]], form: "smith-incline-press" },
        { name: "체스트 프레스 머신", en: "Chest Press", icon: "chest_press", tip: "날개뼈 모으고 가슴으로 밀기", sets: [[12, 20], [12, 20], [12, 20]], form: "chest-press-machine" },
        { name: "숄더 프레스 머신", en: "Shoulder Press", tip: "허리 등받이에 붙이기", sets: [[12, 10], [12, 10], [12, 10]] },
        { name: "사이드 레터럴 레이즈 머신", en: "Lateral Raise Machine", icon: "lateral_raise_machine", tip: "어깨 으쓱 금지, 팔꿈치로 들기", sets: [[15, 5], [15, 5], [15, 5]] }
      ]},
      { day: "수", part: "힙 B", en: "Glute B", cardio: true, items: [
        { name: "레그 익스텐션", en: "Leg Extension", tag: "워밍업", tip: "가볍게 무릎 풀기", sets: [[20, 10], [15, 15]] },
        { name: "이너타이", en: "Inner Thigh", tag: "선행", tip: "천천히 모으고 버티기", sets: [[15, 15], [12, 20], [12, 20]] },
        { name: "레그프레스 (발 높게)", en: "Leg Press · High", tag: "메인", tip: "발은 발판 위쪽, 뒤꿈치로 밀기", sets: [[15, 40], [12, 40], [10, 45], [8, 45]] },
        { name: "고블릿 스쿼트", en: "Goblet Squat", tip: "가슴 세우고 깊이 앉기", sets: [[12, 8], [12, 8], [12, 8]] },
        { name: "힙 익스텐션", en: "Hip Extension", icon: "back_extension", tip: "등 말지 말고 엉덩이로 올라오기", sets: [[15, null], [15, null], [15, null]] }
      ]},
      { day: "목", part: "등", en: "Back", cardio: true, items: [
        { name: "스트레이트 암 풀다운", en: "Straight Arm Pulldown", tag: "워밍업", tip: "팔 편 채 허벅지까지", sets: [[20, 10], [15, 10]] },
        { name: "랫풀다운", en: "Lat Pulldown", tag: "메인", tip: "팔꿈치로 당기기", sets: [[15, 20], [12, 20], [10, 25], [8, 25]] },
        { name: "시티드 로우 머신", en: "Seated Row Machine", tip: "가슴 패드 붙이고 당기기", sets: [[12, 20], [12, 20], [12, 20]] },
        { name: "리버스 펙덱", en: "Reverse Pec Deck", tip: "날개뼈 모으며 옆으로", sets: [[15, 10], [15, 10], [15, 10]] }
      ]},
      { day: "금", part: "힙 C", en: "Glute C", cardio: true, items: [
        { name: "레그 익스텐션", en: "Leg Extension", tag: "워밍업", tip: "가볍게 무릎 풀기", sets: [[20, 10], [15, 15]] },
        { name: "플레이트 아웃타이", en: "Booty Builder", icon: "outer_thigh_plate", tag: "선행", tip: "엉덩이 옆으로 밀기", sets: [[20, 15], [15, 20], [12, 20]] },
        { name: "스미스 스쿼트", en: "Smith Squat", tag: "메인", tip: "엉덩이 뒤로 빼며 깊이 앉기", sets: [[15, 10], [12, 10], [10, 15], [8, 15]] },
        { name: "힙쓰러스트 머신", en: "Hip Thrust", icon: "hip_thrust", tip: "맨 위에서 엉덩이 꽉 1초", sets: [[12, 20], [12, 20], [12, 20]] },
        { name: "케이블 힙 킥백", en: "Cable Kickback", icon: "cable_kickback", tip: "한 발씩 15회, 엉덩이로 뒤로 차기", sets: [[15, 5], [15, 5], [15, 5]] }
      ]},
      { day: "토", part: "휴식", en: "Rest", rest: true, items: [] },
      { day: "일", part: "휴식", en: "Rest", rest: true, items: [] }
    ]
  },

  /* 식단 (null이면 "준비 중") */
  diet: null
};
