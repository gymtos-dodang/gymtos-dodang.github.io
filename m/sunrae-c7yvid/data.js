/* 어순래 회원님 홈페이지 데이터 — 이 파일만 고치면 페이지 내용이 바뀜 */
window.MEMBER = {
  name: "어순래",
  sex: "F",                       // M = 네이비, F = 핑크
  since: "2026. 11",
  goal: "아프지 않고 건강하게, 꾸준히 운동하는 몸 만들기",
  journey: { start: "2026-03-15" },   // PT 시작일 (장동욱: 올해 3월 → 15일로 둠)

  /* 공지 (최신이 위) */
  notices: [
    { date: "2026. 11. 10", title: "가슴·팔 운동 복습지 3개가 올라왔어요", link: "forms",
      body: "펙덱 플라이 · 뉴텍 체스트 프레스 머신 · 케이블 푸쉬다운 복습지예요. 수요일 가슴 운동 전에 영상으로 자세 한 번 보고 들어가세요!" },
    { date: "2026. 11. 10", title: "주 6회 건강 관리 루틴이 올라왔어요", link: "routine",
      body: "월 하체 · 화 등 · 수 가슴 · 목 엉덩이 · 금 어깨 · 토 등·팔, 일요일은 푹 쉬어요. 하체는 아프지 않게 가볍게! 운동 끝나면 유산소 15분까지 해주세요." },
    { date: "2026. 11. 10", title: "PT 노트가 열렸어요",
      body: "어순래 회원님만의 운동 노트예요! 앞으로 주간 루틴·자세 복습지·식단을 여기로 올려드릴게요. 운동 오신 날은 홈에서 '오늘 출석'을 꼭 눌러주세요." }
  ],
  /* 다음 수업 (없으면 null) */
  next_class: null,

  /* 자세 복습지 (최신이 위) */
  forms: [
    {
      id: "pec-deck-fly",
      dir: "media/form-pec-deck-fly/",
      date: "2026. 11. 4 (수)",
      exercise: "펙덱 플라이",
      exercise_en: "Pec Deck Fly",
      part: "가슴",
      targets: ["대흉근 (가슴)", "전면 삼각근"],
      benefit: "가슴 안쪽까지 모아줘서 가슴이 탄탄해지고, 굽은 어깨를 펴는 데도 도움이 돼요. 의자에 앉아서 해서 허리 부담이 적어요",
      key_point: "팔로 당기지 말고, 가슴으로 껴안듯이 모은다!",
      good_points: [
        { title: "허리를 세우고 앉았어요", desc: "등을 등받이에 붙인 채 상체가 따라 나오지 않아서 가슴만 일했어요" },
        { title: "팔 모양을 그대로 지켰어요", desc: "팔꿈치를 살짝 굽힌 모양이 끝까지 똑같아서 팔이 아닌 가슴으로 모았어요" },
        { title: "가슴 앞에서 꽉 모았어요", desc: "손잡이가 가슴 앞에서 만날 때까지 모아서 가슴 안쪽까지 조였어요" }
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
      date: "2026. 11. 4 (수)",
      exercise: "뉴텍 체스트 프레스 머신",
      exercise_en: "Lying Chest Press",
      part: "가슴",
      targets: ["대흉근 (가슴)", "전면 삼각근 · 삼두근"],
      benefit: "누워서 미는 머신이라 몸이 흔들리지 않고 허리도 편해요. 가슴 전체를 고르게 키워서 미는 힘이 붙어요",
      key_point: "등은 벤치에 붙이고, 가슴으로 하늘을 향해 민다!",
      good_points: [
        { title: "머리와 등을 벤치에 붙였어요", desc: "밀 때 몸이 들썩이지 않아서 무게가 가슴에 그대로 실렸어요" },
        { title: "손잡이를 가슴 옆까지 내렸어요", desc: "충분히 내려서 가슴이 늘어났다가 다시 일하는 구간을 다 썼어요" },
        { title: "끝까지 밀어 올렸어요", desc: "팔을 거의 다 펴서 가슴이 꽉 모이는 곳까지 밀었어요" }
      ],
      primary_muscles: [{ name: "대흉근", where: "가슴 앞 전체" }],
      secondary_muscles: "전면 삼각근 · 삼두근",
      feel_good: "가슴 앞이 뻐근하고, 밀어 올릴 때 가슴이 모여요",
      feel_stop: "어깨 앞이 찌릿하거나, 허리가 뜨면서 아파요",
      steps: [
        { title: "준비", desc: "벤치에 누워 머리·등·엉덩이를 붙여요. 날개뼈를 모아 가슴을 연 다음, 손잡이를 잡고 팔을 편 자리에서 시작해요", chip: "숨 들이마시기", media: "step1.jpg" },
        { title: "내리기", desc: "팔꿈치를 몸통에서 45도 정도 벌린 채, 손잡이를 가슴 옆까지 천천히 내려요", chip: "3초 · 들이마시며", media: "step2.webp", loop: true },
        { title: "밀어 올리기", desc: "가슴으로 밀어 처음 자리까지! 맨 위에서 팔꿈치는 살짝 굽힌 채 멈춰요", chip: "1~2초 · 후~ 내쉬며", media: "step3.webp", loop: true }
      ],
      do: ["머리·등·엉덩이는 벤치에 붙인 채로", "날개뼈 모으고 가슴 열기", "내릴 때 천천히, 가슴이 늘어나게"],
      dont: ["밀 때 엉덩이나 허리를 띄우기", "어깨를 귀 쪽으로 으쓱 올리기", "끝에서 팔꿈치를 쭉 펴서 잠그기"]
    },
    {
      id: "cable-pushdown",
      dir: "media/form-cable-pushdown/",
      date: "2026. 11. 4 (수)",
      exercise: "케이블 푸쉬다운",
      exercise_en: "Cable Pushdown",
      part: "팔",
      targets: ["삼두근 (팔 뒤쪽)"],
      benefit: "팔 뒤쪽 처지는 살을 탄탄하게 잡아줘요. 미는 운동(가슴·어깨)을 할 때 팔 힘도 같이 좋아져요",
      key_point: "팔꿈치는 옆구리에 딱! 팔 뒤쪽으로 쭉 편다",
      good_points: [
        { title: "팔꿈치를 옆구리에 붙였어요", desc: "팔꿈치가 앞뒤로 움직이지 않아서 팔 뒤쪽만 일했어요" },
        { title: "끝까지 쭉 폈어요", desc: "허벅지 앞까지 내려서 팔 뒤쪽이 꽉 조이는 곳까지 썼어요" },
        { title: "상체를 곧게 세웠어요", desc: "몸을 숙이거나 흔들지 않고 팔 힘으로만 내렸어요" }
      ],
      primary_muscles: [{ name: "삼두근", where: "팔 뒤쪽 (어깨~팔꿈치)" }],
      secondary_muscles: "팔뚝 (전완근)",
      feel_good: "팔 뒤쪽이 뜨겁고 꽉 조여요",
      feel_stop: "팔꿈치 안쪽이나 손목이 아파요",
      steps: [
        { title: "준비", desc: "케이블 앞에 똑바로 서서 줄을 잡아요. 팔꿈치를 옆구리에 붙이고, 손은 가슴 아래 높이에서 시작해요", chip: "숨 들이마시기", media: "step1.jpg" },
        { title: "밀어 내리기", desc: "팔꿈치는 그대로 두고 손만 아래로! 허벅지 앞까지 쭉 펴서 1초 꽉", chip: "1~2초 · 후~ 내쉬며", media: "step2.webp", loop: true },
        { title: "천천히 올리기", desc: "줄이 당기는 힘을 버티면서 처음 높이까지 천천히 올려요", chip: "2~3초 · 들이마시며", media: "step3.webp", loop: true }
      ],
      do: ["팔꿈치는 옆구리에 붙인 채로", "끝에서 팔 뒤쪽 1초 쥐어짜기", "어깨는 내리고 상체는 곧게"],
      dont: ["팔꿈치가 앞으로 따라 나오기", "몸을 숙여 체중으로 누르기", "올릴 때 줄을 놓듯이 빠르게 올리기"]
    }
  ],

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
        { name: "펙덱 플라이", en: "Pec Deck Fly", tag: "워밍업", tip: "가슴으로 껴안듯이 모으기", sets: [[20, 15], [15, 15]], form: "pec-deck-fly" },
        { name: "뉴텍 체스트 프레스 머신", en: "Lying Chest Press", tag: "메인", tip: "누워서 등 붙이고 가슴으로 밀기", sets: [[15, 20], [12, 20], [10, 25], [8, 25]], form: "chest-press-machine" },
        { name: "케이블 푸쉬다운", en: "Cable Pushdown", tip: "팔꿈치는 옆구리에 고정", sets: [[15, 15], [15, 15], [15, 15]], form: "cable-pushdown" }
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
        { name: "케이블 푸쉬다운", en: "Cable Pushdown", tip: "팔꿈치는 옆구리에 고정", sets: [[15, 15], [15, 15], [15, 15]], form: "cable-pushdown" }
      ]},
      { day: "일", part: "휴식", en: "Rest", rest: true, items: [] }
    ]
  },

  /* 식단 (null이면 "준비 중") */
  diet: null
};
