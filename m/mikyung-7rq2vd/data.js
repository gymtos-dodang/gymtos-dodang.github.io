/* 정미경 회원님 홈페이지 데이터 — 이 파일만 고치면 페이지 내용이 바뀜 */
window.MEMBER = {
  name: "정미경",
  sex: "F",                       // M = 네이비, F = 핑크
  since: "2026. 11",
  goal: "벌크업 · 주 4회",
  journey: { start: "2026-09-15" },   // PT 시작일 (장동욱: 9월 → 15일로 둠)

  /* 공지 (최신이 위) */
  notices: [
    {"date": "2026. 11. 13", "title": "자세 복습지 2개가 올라왔어요", "link": "forms", "body": "엠토처 시티드 로우 · 시티드 레터럴 레이즈! 어제 수업 영상으로 만들었어요. 레터럴 레이즈는 화요일 어깨 루틴 종목에서도 바로 열려요."},
    { date: "2026. 11. 9", title: "등 자세 복습지 3개가 올라왔어요",
      body: "오늘 한 케이블 시티드 로우 · 랫풀다운 · 버티컬 풀다운 복습지예요. 월요일 등 날 운동 전에 한 번 보고 들어가세요! 루틴 탭 월요일 랫풀다운에서도 바로 열려요.",
      link: "forms" },
    { date: "2026. 11. 7", title: "엉덩이 자세 복습지 2개가 올라왔어요",
      body: "오늘 수업한 굿모닝 아웃타이 · 힙쓰러스트 머신 복습지예요. 토요일 엉덩이 날 운동 전에 한 번 보고 들어가세요! 루틴 탭 토요일 종목에서도 바로 열려요.",
      link: "forms" },
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
    {"id": "mtorture-seated-row", "dir": "media/form-mtorture-seated-row/", "date": "2026. 11. 12 (목)", "exercise": "엠토처 시티드 로우", "exercise_en": "Seated Row Machine", "part": "등", "targets": ["광배근 · 능형근", "중부 승모근 (날개뼈 사이)"], "benefit": "등 두께를 채워주고 굽은 어깨를 펴줘요. 가슴 패드 없이 앉아서 하니까 상체를 세우고 버티는 힘도 같이 길러요", "key_point": "상체는 세운 채 고정, 팔꿈치를 뒤로 보내며 옆구리 쪽으로 당긴다!", "good_points": [{"title": "상체를 곧게 세웠어요", "desc": "당길 때 몸을 뒤로 젖히지 않고 허리를 세운 채라 반동 없이 등으로 당겼어요"}, {"title": "옆구리까지 끝까지 당겼어요", "desc": "손잡이를 몸 옆까지 가져와서 날개뼈 사이까지 꽉 조였어요"}, {"title": "팔을 끝까지 펴 줬어요", "desc": "돌아갈 때 팔을 쭉 펴서 등이 충분히 늘어난 상태에서 다시 당겼어요"}], "primary_muscles": [{"name": "광배근", "where": "등 옆 · 아래쪽"}, {"name": "능형근 · 중부 승모근", "where": "날개뼈 사이"}], "secondary_muscles": "대원근 · 후면 삼각근 · 이두근", "feel_good": "날개뼈 사이와 등 옆이 뻐근하게 조여요", "feel_stop": "허리가 뻐근하거나, 팔뚝만 아파요", "steps": [{"title": "준비", "desc": "발판에 발을 대고 의자에 앉아 허리를 곧게 세워요. 손잡이를 잡고 팔을 앞으로 쭉 펴요", "chip": "숨 들이마시기", "media": "step1.jpg"}, {"title": "당기기", "desc": "가슴을 펴고 팔꿈치를 뒤로 보내며 손잡이를 옆구리 쪽으로! 날개뼈 모으고 1초", "chip": "2초 · 후~ 내쉬며", "media": "step2.webp", "loop": true}, {"title": "돌아가기", "desc": "상체는 그대로, 등이 늘어나는 느낌으로 팔을 천천히 펴요", "chip": "3초 · 들이마시며", "media": "step3.webp", "loop": true}], "do": ["허리 곧게, 상체는 고정", "팔꿈치는 몸 옆으로 붙여 뒤로", "당긴 끝에서 날개뼈 모으고 1초"], "dont": ["몸을 뒤로 젖혀 반동 쓰기", "어깨를 으쓱 올리며 당기기", "돌아갈 때 허리가 둥글게 말리기"]},
    {"id": "seated-lateral-raise", "dir": "media/form-seated-lateral-raise/", "date": "2026. 11. 12 (목)", "exercise": "시티드 레터럴 레이즈", "exercise_en": "Seated Lateral Raise", "part": "어깨", "also": ["사이드 레터럴 레이즈 (덤벨)"], "targets": ["측면 삼각근 (옆 어깨)", "전면 삼각근 · 상부 승모근"], "benefit": "옆 어깨를 동그랗게 채워줘요. 어깨선이 넓어지면 허리가 더 얇아 보이고 상체 라인이 예뻐져요", "key_point": "손이 아니라 팔꿈치로 옆으로 밀어 올리고, 어깨 높이에서 멈춘다!", "good_points": [{"title": "앉아서 반동 없이 들었어요", "desc": "벤치에 앉아 몸통을 고정해서 몸을 흔들지 않고 어깨 힘으로만 들었어요"}, {"title": "어깨 높이까지 딱 올렸어요", "desc": "팔이 바닥과 나란해질 때까지 올리고 그 이상은 안 올려서 옆 어깨에 정확히 들어갔어요"}, {"title": "팔꿈치를 살짝 굽혀 고정했어요", "desc": "팔꿈치 각도가 매 회 같아서 팔이 아니라 어깨로 들었어요"}], "primary_muscles": [{"name": "측면 삼각근", "where": "어깨 바깥쪽, 옆에서 볼 때 동그란 부분"}], "secondary_muscles": "전면 삼각근 · 상부 승모근 · 극상근", "feel_good": "어깨 옆쪽이 화끈하게 타는 느낌이에요", "feel_stop": "목·승모근만 뻐근하거나, 어깨 안쪽이 찌릿해요", "steps": [{"title": "준비", "desc": "벤치 끝에 앉아 허리를 세우고 배에 힘. 덤벨은 몸 옆에 두고 팔꿈치는 살짝 굽혀요", "chip": "숨 들이마시기", "media": "step1.jpg"}, {"title": "들어 올리기", "desc": "팔꿈치로 옆으로 밀듯이 어깨 높이까지! 새끼손가락 쪽이 살짝 높게", "chip": "1~2초 · 후~ 내쉬며", "media": "step2.webp", "loop": true}, {"title": "내리기", "desc": "버티면서 몸 옆까지 천천히. 툭 떨어뜨리지 않아요", "chip": "2~3초 · 들이마시며", "media": "step3.webp", "loop": true}], "do": ["허리 세우고 상체 고정", "팔꿈치 살짝 굽힌 채 고정", "어깨 높이까지만, 내릴 땐 천천히"], "dont": ["어깨를 귀 쪽으로 으쓱하기", "상체를 흔들어 반동으로 올리기", "어깨보다 높이 올리기"]},
    {
      id: "vertical-pulldown",
      dir: "media/form-vertical-pulldown/",
      date: "2026. 11. 9 (월)",
      exercise: "버티컬 풀다운",
      exercise_en: "Vertical Pulldown",
      part: "등",
      targets: ["광배근 (등 옆 날개)", "대원근 · 능형근"],
      benefit: "손잡이가 따로 움직여서 양쪽 등을 고르게 쓰고, 등 넓이를 키워줘요",
      key_point: "손이 아니라 팔꿈치로, 옆구리 쪽으로 끌어내린다!",
      good_points: [
        { title: "가슴을 세우고 앉았어요", desc: "등이 굽지 않아서 당길 때 힘이 등으로 바로 갔어요" },
        { title: "팔꿈치를 아래로 끌어내렸어요", desc: "팔꿈치가 옆구리 쪽으로 내려와서 등 옆이 꽉 조여졌어요" },
        { title: "끝까지 올려서 늘렸어요", desc: "돌아갈 때 팔을 위로 쭉 펴서 등이 충분히 늘어났어요" }
      ],
      primary_muscles: [{ name: "광배근", where: "겨드랑이 아래 · 등 옆 날개" }],
      secondary_muscles: "대원근 · 능형근 · 중부 승모근 · 이두근",
      feel_good: "겨드랑이 아래 등 옆이 뻐근하게 조여요",
      feel_stop: "팔뚝만 아프거나, 목·어깨 위쪽이 뻐근해요",
      steps: [
        { title: "준비", desc: "허벅지 패드에 다리를 고정하고 가슴을 세워요. 손잡이를 잡고 팔을 위로 쭉 펴요", chip: "숨 들이마시기", media: "step1.jpg" },
        { title: "당기기", desc: "어깨를 먼저 내리고, 팔꿈치를 옆구리 쪽으로 끌어내려요. 손잡이가 어깨 높이에 오면 등 꽉 1초!", chip: "2초 · 후~ 내쉬며", media: "step2.webp", loop: true },
        { title: "올리기", desc: "등이 늘어나는 느낌으로 버티면서 팔을 천천히 위로 펴요", chip: "3초 · 들이마시며", media: "step3.webp", loop: true }
      ],
      do: ["가슴 세우고 엉덩이는 의자에", "어깨 먼저 내리고 팔꿈치로 당기기", "올릴 때 천천히, 등이 늘어나게"],
      dont: ["상체를 뒤로 크게 젖히기", "어깨를 귀 쪽으로 으쓱 올리기", "손목·팔뚝 힘으로만 당기기"]
    },
    {
      id: "lat-pulldown",
      dir: "media/form-lat-pulldown/",
      date: "2026. 11. 9 (월)",
      exercise: "랫풀다운",
      exercise_en: "Lat Pulldown",
      part: "등",
      targets: ["광배근 (등 옆 날개)", "대원근 · 능형근"],
      benefit: "등을 넓게 펴서 허리가 잘록해 보이는 V라인을 만들어줘요",
      key_point: "가슴을 바에 마중 나가듯 세우고, 팔꿈치로 당긴다!",
      good_points: [
        { title: "허벅지를 패드에 고정했어요", desc: "몸이 들리지 않아서 무게를 등으로 버틸 수 있었어요" },
        { title: "바를 가슴 위쪽까지 당겼어요", desc: "쇄골 아래까지 내려와서 등이 끝까지 수축됐어요" },
        { title: "팔을 끝까지 펴서 올렸어요", desc: "위에서 팔이 다 펴질 때까지 올라가서 등이 쭉 늘어났어요" }
      ],
      primary_muscles: [{ name: "광배근", where: "겨드랑이 아래 · 등 옆 날개" }],
      secondary_muscles: "대원근 · 능형근 · 중부 승모근 · 이두근",
      feel_good: "겨드랑이 아래와 등 옆이 뻐근해요",
      feel_stop: "팔뚝만 아프거나, 목 뒤가 뻐근해요",
      steps: [
        { title: "준비", desc: "허벅지 패드에 다리를 끼우고, 어깨보다 조금 넓게 바를 잡아요. 가슴을 세우고 팔을 쭉 펴요", chip: "숨 들이마시기", media: "step1.jpg" },
        { title: "당기기", desc: "어깨를 내리고 팔꿈치를 옆구리로 끌어내리며 바를 쇄골 아래까지 당겨요. 등 꽉 1초!", chip: "2초 · 후~ 내쉬며", media: "step2.webp", loop: true },
        { title: "올리기", desc: "바를 버티면서 팔이 다 펴질 때까지 천천히 올려요", chip: "3초 · 들이마시며", media: "step3.webp", loop: true }
      ],
      do: ["가슴은 세우고 시선은 바 쪽", "팔꿈치를 옆구리로 끌어내리기", "올릴 때 팔 끝까지 펴기"],
      dont: ["몸을 뒤로 눕히며 반동 쓰기", "바를 목 뒤로 당기기", "어깨를 으쓱 올린 채 당기기"]
    },
    {
      id: "seated-row",
      dir: "media/form-seated-row/",
      date: "2026. 11. 9 (월)",
      exercise: "케이블 시티드 로우",
      exercise_en: "Seated Cable Row",
      part: "등",
      targets: ["광배근 · 능형근", "중부 승모근 (날개뼈 사이)"],
      benefit: "등 두께를 채워주고, 굽은 어깨·자세를 바로 세워줘요",
      key_point: "상체는 고정, 날개뼈를 모으며 배꼽 쪽으로 당긴다!",
      good_points: [
        { title: "상체를 세우고 버텼어요", desc: "몸이 앞뒤로 흔들리지 않아서 반동 없이 등으로 당겼어요" },
        { title: "배꼽 쪽으로 당겼어요", desc: "손잡이가 배 쪽으로 와서 등 아래쪽까지 힘이 들어갔어요" },
        { title: "끝에서 날개뼈를 모았어요", desc: "당긴 끝에서 가슴을 펴고 날개뼈를 모아서 등 가운데가 꽉 조여졌어요" }
      ],
      primary_muscles: [{ name: "광배근", where: "등 옆 · 아래쪽" }, { name: "능형근 · 중부 승모근", where: "날개뼈 사이" }],
      secondary_muscles: "대원근 · 후면 삼각근 · 이두근",
      feel_good: "날개뼈 사이와 등 옆이 뻐근하게 조여요",
      feel_stop: "허리가 뻐근하거나, 팔뚝만 아파요",
      steps: [
        { title: "준비", desc: "발판에 발을 대고 무릎은 살짝 굽혀요. 손잡이를 잡고 허리를 곧게 세워 팔을 앞으로 펴요", chip: "숨 들이마시기", media: "step1.jpg" },
        { title: "당기기", desc: "가슴을 펴고 팔꿈치를 뒤로 보내며 손잡이를 배꼽 쪽으로 당겨요. 날개뼈 모으고 1초!", chip: "2초 · 후~ 내쉬며", media: "step2.webp", loop: true },
        { title: "돌아가기", desc: "상체는 그대로 두고, 등이 늘어나는 느낌으로 팔을 천천히 펴요", chip: "3초 · 들이마시며", media: "step3.webp", loop: true }
      ],
      do: ["허리 곧게, 상체는 고정", "팔꿈치를 몸 옆으로 붙여 뒤로", "당긴 끝에서 날개뼈 모으고 1초"],
      dont: ["몸을 뒤로 젖혀 반동 쓰기", "어깨를 으쓱 올리며 당기기", "돌아갈 때 허리가 둥글게 말리기"]
    },
    {
      id: "hip-thrust",
      dir: "media/form-hip-thrust/",
      date: "2026. 11. 7 (토)",
      exercise: "힙쓰러스트 머신",
      exercise_en: "Hip Thrust Machine",
      part: "엉덩이",
      targets: ["대둔근 (엉덩이)", "햄스트링 · 중둔근"],
      benefit: "엉덩이를 위로 동그랗게 끌어올리고, 힙 라인을 탄탄하게 만들어줘요",
      key_point: "턱은 당기고, 맨 위에서 엉덩이를 꽉 짠다!",
      good_points: [
        { title: "턱을 당기고 시선을 앞에 뒀어요", desc: "고개가 뒤로 젖혀지지 않아서 허리가 아닌 엉덩이로 올렸어요" },
        { title: "끝까지 밀어 올렸어요", desc: "무릎·골반·어깨가 일자가 될 때까지 올려서 엉덩이가 꽉 수축됐어요" },
        { title: "위에서 멈췄다 내려왔어요", desc: "맨 위에서 버티고 천천히 내려와서 엉덩이에 힘이 끝까지 남았어요" }
      ],
      primary_muscles: [{ name: "대둔근", where: "엉덩이 가운데 · 아래쪽" }],
      secondary_muscles: "햄스트링 · 중둔근 · 허벅지 앞(버티기)",
      feel_good: "엉덩이 아래쪽이 꽉 조이고 뜨거워져요",
      feel_stop: "허리가 뻐근하거나, 허벅지 앞만 터질 것 같아요",
      steps: [
        { title: "준비", desc: "등받이에 날개뼈를 걸치고 벨트를 골반에 걸어요. 발은 어깨너비, 무릎은 90도가 되게", chip: "숨 들이마시기", media: "step1.jpg" },
        { title: "올리기", desc: "턱을 당긴 채 발뒤꿈치로 밀어 골반을 올려요. 무릎·골반·어깨가 일자가 되면 엉덩이 꽉 1초!", chip: "2초 · 후~ 내쉬며", media: "step2.webp", loop: true },
        { title: "내리기", desc: "엉덩이 힘을 풀지 말고 천천히 내려요. 바닥에 닿기 직전에 다시 올려요", chip: "3초 · 들이마시며", media: "step3.webp", loop: true }
      ],
      do: ["턱 당기고 시선은 무릎 쪽", "발뒤꿈치로 밀어 올리기", "맨 위에서 엉덩이 꽉 1초"],
      dont: ["고개 젖히고 허리를 꺾어 올리기", "무릎이 안쪽으로 모이기", "내릴 때 털썩 내려놓기"]
    },
    {
      id: "goodmorning-outer-thigh",
      dir: "media/form-goodmorning-outer-thigh/",
      date: "2026. 11. 7 (토)",
      exercise: "굿모닝 아웃타이",
      exercise_en: "Good Morning Outer Thigh",
      part: "엉덩이",
      targets: ["중둔근 (엉덩이 옆)", "대둔근 (엉덩이 뒤)"],
      benefit: "엉덩이 옆과 뒤를 같이 채워서, 옆에서 봐도 동그란 힙을 만들어줘요",
      key_point: "등은 편 채로 상체를 숙이며, 엉덩이로 다리를 밀어낸다!",
      good_points: [
        { title: "등을 펴고 숙였어요", desc: "허리가 둥글게 말리지 않고 엉덩이를 뒤로 빼면서 숙여서 엉덩이에 힘이 잘 실렸어요" },
        { title: "숙이고 벌리는 타이밍이 맞았어요", desc: "상체를 숙이면서 다리를 벌려서 엉덩이 옆·뒤를 같이 썼어요" },
        { title: "천천히 세우며 돌아왔어요", desc: "패드가 쾅 닫히지 않게 버티면서 돌아와서 자극이 끊기지 않았어요" }
      ],
      primary_muscles: [{ name: "중둔근", where: "엉덩이 옆 · 골반 바로 아래" }, { name: "대둔근", where: "엉덩이 뒤 · 아래쪽" }],
      secondary_muscles: "대퇴근막장근(골반 옆 앞쪽) · 척추기립근(등 펴서 버티기)",
      feel_good: "엉덩이 옆과 뒤가 같이 뻐근하고 뜨거워져요",
      feel_stop: "허리가 뻐근하거나, 허벅지 바깥만 아파요",
      steps: [
        { title: "준비", desc: "엉덩이를 등받이 끝까지 붙여 앉고, 무릎 바깥에 패드를 대요. 손잡이를 잡고 등을 곧게 펴요", chip: "숨 들이마시기", media: "step1.jpg" },
        { title: "숙이며 벌리기", desc: "인사하듯 엉덩이를 뒤로 빼며 상체를 숙이고, 엉덩이 힘으로 무릎을 바깥으로 밀어요. 끝에서 1초!", chip: "2초 · 후~ 내쉬며", media: "step2.webp", loop: true },
        { title: "세우며 모으기", desc: "등을 편 채로 상체를 천천히 세우면서, 패드를 버티며 다리를 모아요", chip: "3초 · 들이마시며", media: "step3.webp", loop: true }
      ],
      do: ["숙일 때도 등은 곧게", "엉덩이를 뒤로 빼면서 숙이기", "벌린 끝에서 엉덩이 꽉 1초"],
      dont: ["허리를 둥글게 말아 숙이기", "반동으로 다리를 확 벌리기", "모을 때 패드를 쾅 닫기"]
    },
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
        { name: "랫풀다운", en: "Lat Pulldown", tip: "팔꿈치로 당기기", sets: [[12, 25], [12, 25], [12, 25]], form: "lat-pulldown" },
        { name: "뉴텍 시티드 로우 머신", en: "Seated Row Machine", tag: "메인", tip: "가슴 패드 붙이고 당기기", sets: [[15, 25], [12, 25], [10, 30], [8, 30]] },
        { name: "리버스 펙덱", en: "Reverse Pec Deck", tip: "날개뼈 모으며 옆으로", sets: [[15, 15], [15, 15], [15, 15]] }
      ]},
      { day: "화", part: "어깨", en: "Shoulder", cardio: true, items: [
        { name: "사이드 레터럴 레이즈 머신", en: "Standing Machine", tag: "워밍업", tip: "가볍게 어깨 풀기", sets: [[20, 5], [15, 10]] },
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
        { name: "아웃타이 머신", en: "Outer Thigh", icon: "outer_thigh_pin", tag: "선행", tip: "엉덩이 옆으로 밀기", sets: [[20, 20], [15, 25], [12, 30]], form: "goodmorning-outer-thigh" },
        { name: "힙쓰러스트 머신", en: "Hip Thrust", icon: "hip_thrust", tag: "메인", tip: "맨 위에서 엉덩이 꽉", sets: [[15, 10], [12, 10], [10, 15], [8, 15]], form: "hip-thrust" }
      ]},
      { day: "일", part: "휴식", en: "Rest", rest: true, items: [] }
    ]
  },

  /* 식단표 (없으면 null) */
  diet: null
};
