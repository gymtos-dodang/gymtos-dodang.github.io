/* 이진영 회원님 홈페이지 데이터 — 이 파일만 고치면 페이지 내용이 바뀜 */
window.MEMBER = {
  name: "이진영",
  sex: "F",                       // M = 네이비, F = 핑크
  since: "2026. 11",
  goal: "다이어트 · 근력 강화",
  journey: { start: "2026-06-15" },   // PT 시작일 (장동욱: 6월 → 15일로 둠)

  /* 공지 (최신이 위) */
  notices: [
    { date: "2026. 11. 8", title: "자세 복습지 3개가 올라왔어요",
      body: "뉴텍 체스트프레스 머신 · 인클라인 프레스 머신 · 덤벨 컬 복습지예요. 운동 전에 영상으로 자세 한 번 보고 들어가면 훨씬 잘 들어가요!",
      link: "forms" },
    { date: "2026. 11. 7", title: "PT 노트가 열렸어요",
      body: "이진영 회원님만의 운동 노트예요! 앞으로 주간 루틴·자세 복습지·식단을 여기로 올려드릴게요. 운동 오신 날은 홈에서 '오늘 출석'을 꼭 눌러주세요." }
  ],
  /* 다음 수업 (없으면 null) */
  next_class: null,

  /* 자세 복습지 (최신이 위) */
  forms: [
    {
      id: "newtech-chest-press",
      dir: "media/form-newtech-chest-press/",
      date: "2026. 11. 8 (일)",
      exercise: "뉴텍 체스트프레스 머신",
      exercise_en: "Newtech Chest Press",
      part: "가슴",
      targets: ["대흉근 (가슴)", "전면 삼각근 · 삼두근"],
      benefit: "가슴 앞판을 탄탄하게 채우고, 미는 힘을 길러줘요. 누워서 밀어 허리 부담이 적어요",
      key_point: "날개뼈는 모으고, 가슴으로 밀어 올린다!",
      good_points: [
        { title: "손잡이를 가슴까지 깊게 내렸어요", desc: "손잡이가 가슴 옆까지 내려와서 가슴이 쭉 늘어났다가 일했어요" },
        { title: "머리·등을 패드에 붙였어요", desc: "밀 때 몸이 들썩이지 않아서 힘이 가슴에 모였어요" },
        { title: "발로 바닥을 단단히 디뎠어요", desc: "하체가 받쳐줘서 몸통이 흔들리지 않고 안정적으로 밀었어요" }
      ],
      primary_muscles: [{ name: "대흉근", where: "가슴 앞 전체" }],
      secondary_muscles: "전면 삼각근 · 삼두근",
      feel_good: "가슴 가운데와 겨드랑이 앞쪽이 뻐근해요",
      feel_stop: "어깨 앞이 찌릿하거나, 가슴은 그대로고 팔만 아파요",
      steps: [
        { title: "준비", desc: "머리·등·엉덩이를 패드에 붙이고 발은 바닥에. 날개뼈를 모아 가슴을 열고, 손잡이는 가슴 옆에서 잡아요", chip: "숨 들이마시기", media: "step1.jpg" },
        { title: "밀기", desc: "가슴을 모은다는 느낌으로 위로 밀어요. 끝에서 팔꿈치는 살짝 굽힌 채 멈춰요", chip: "1~2초 · 후~ 내쉬며", media: "step2.webp", loop: true },
        { title: "돌아오기", desc: "무게를 버티면서 손잡이가 가슴 옆에 올 때까지 천천히 내려와요", chip: "3초 · 들이마시며", media: "step3.webp", loop: true }
      ],
      do: ["머리·등·엉덩이는 패드에 붙인 채로", "날개뼈 모으고 가슴 열기", "내려올 때 천천히, 가슴이 늘어나게"],
      dont: ["밀 때 엉덩이를 패드에서 띄우기", "어깨를 귀 쪽으로 으쓱 올리기", "끝에서 팔꿈치를 쭉 펴서 잠그기"]
    },
    {
      id: "incline-press-machine",
      dir: "media/form-incline-press-machine/",
      date: "2026. 11. 8 (일)",
      exercise: "인클라인 프레스 머신",
      exercise_en: "Incline Press Machine",
      part: "가슴",
      targets: ["윗가슴 (대흉근 상부)", "전면 삼각근 · 삼두근"],
      benefit: "윗가슴을 채워서 가슴 라인이 위까지 꽉 차 보이게 해줘요",
      key_point: "손잡이는 윗가슴 옆까지, 내릴 땐 천천히!",
      good_points: [
        { title: "윗가슴까지 깊게 내렸어요", desc: "손잡이가 어깨 옆까지 내려와서 윗가슴이 충분히 늘어났어요" },
        { title: "등을 등받이에 붙이고 밀었어요", desc: "몸이 앞으로 따라 나오지 않아서 각도가 그대로 유지됐어요" },
        { title: "끝까지 밀어 올렸어요", desc: "위에서 손잡이를 끝까지 밀어서 가슴이 꽉 모였어요" }
      ],
      primary_muscles: [{ name: "대흉근 상부", where: "쇄골 아래 윗가슴" }],
      secondary_muscles: "가슴 아래쪽 · 전면 삼각근 · 삼두근",
      feel_good: "쇄골 아래 윗가슴이 뻐근해요",
      feel_stop: "어깨 앞만 타거나, 손목이 꺾여서 아파요",
      steps: [
        { title: "준비", desc: "등과 엉덩이를 등받이에 붙이고 날개뼈를 모아요. 손잡이를 밀어 올린 자리에서 시작해요", chip: "숨 들이마시기", media: "step1.jpg" },
        { title: "내리기", desc: "팔꿈치를 몸통에서 45도 정도 벌리며 손잡이를 윗가슴 옆까지 천천히", chip: "3초 · 들이마시며", media: "step2.webp", loop: true },
        { title: "밀어 올리기", desc: "윗가슴으로 밀어 처음 자리까지! 맨 위에서 팔꿈치는 살짝 굽힌 채", chip: "1~2초 · 후~ 내쉬며", media: "step3.webp", loop: true }
      ],
      do: ["날개뼈 모으고 가슴을 위로 세우기", "손잡이는 윗가슴 옆까지 내리기", "손목은 팔꿈치 바로 위에 세우기"],
      dont: ["엉덩이를 들어 각도 없애기", "팔꿈치를 옆으로 너무 벌리기", "내리자마자 튕겨 올리기"]
    },
    {
      id: "db-curl",
      dir: "media/form-db-curl/",
      date: "2026. 11. 8 (일)",
      exercise: "덤벨 컬",
      exercise_en: "DB Curl",
      part: "팔",
      targets: ["이두근", "상완근 · 전완근"],
      benefit: "팔 앞쪽을 탄탄하게 잡아줘서 팔 라인이 정리돼요",
      key_point: "팔꿈치는 옆구리에 고정, 이두로만 말아 올린다!",
      good_points: [
        { title: "상체를 곧게 세웠어요", desc: "몸을 흔들지 않아서 반동 없이 팔로만 들어 올렸어요" },
        { title: "끝까지 펴고 시작했어요", desc: "내릴 때 팔을 쭉 펴서 이두가 길게 늘어났다가 일했어요" },
        { title: "양손 높이가 같았어요", desc: "두 팔이 같은 속도로 올라가 좌우가 고르게 일했어요" }
      ],
      primary_muscles: [{ name: "이두근", where: "팔 앞쪽" }],
      secondary_muscles: "상완근 · 전완근",
      feel_good: "팔 앞쪽이 빵빵하게 차올라요",
      feel_stop: "손목·팔꿈치 안쪽이 찌릿하거나, 어깨 앞이 먼저 아파요",
      steps: [
        { title: "준비", desc: "발은 골반 너비, 손바닥이 앞을 보게 덤벨을 잡고 팔꿈치를 옆구리에 붙여요", chip: "숨 들이마시기", media: "step1.jpg" },
        { title: "올리기", desc: "팔꿈치는 그대로 두고 덤벨을 어깨 쪽으로 말아 올려요. 위에서 1초 꽉!", chip: "2초 · 후~ 내쉬며", media: "step2.webp", loop: true },
        { title: "내리기", desc: "버티면서 천천히, 팔이 끝까지 펴질 때까지 내려요", chip: "3초 · 들이마시며", media: "step3.webp", loop: true }
      ],
      do: ["팔꿈치는 옆구리에 고정", "올린 끝에서 1초 쥐어짜기", "내릴 때 팔 끝까지 펴기"],
      dont: ["허리를 뒤로 젖혀 반동 쓰기", "팔꿈치를 앞으로 들어 올리기", "손목을 안쪽으로 꺾기"]
    }
  ],

  /* 주간 루틴 (없으면 null → "루틴이 아직 없어요") */
  routine: null,

  /* 식단 (null이면 "준비 중") */
  diet: null
};
