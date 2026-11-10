/* 이지환 회원님 홈페이지 데이터 — 이 파일만 고치면 페이지 내용이 바뀜 */
window.MEMBER = {
  name: "이지환",
  sex: "M",                       // M = 네이비, F = 핑크
  since: "2026. 11",
  goal: "바디프로필 · 근비대 + 바른 등",
  journey: { start: "2026-10-15", mode: "bodyprofile" },   // PT 시작일 (10월 → 15일로 둠) · mode bodyprofile = 바프 전용 그래프(기초→벌크→컷팅). 촬영일 정해지면 shoot: "YYYY-MM-DD" 추가 → D-day

  /* 공지 (최신이 위) */
  notices: [
    { date: "2026. 11. 9", title: "등 복습지 3개가 올라왔어요", link: "forms",
      body: "언더그립 시티드 로우 · 해머스트렝스 로우로우 · 리버스 펙덱! 넓은 등이 바프 V라인을 만들어요. 월·목 등 루틴 종목에서도 바로 열려요." },
    { date: "2026. 11. 6", title: "어깨 복습지 2개가 올라왔어요", link: "forms",
      body: "스탠딩 사이드 레터럴 레이즈 머신 · 바이킹 프레스! 넓은 어깨가 바프 V라인을 만들어요. 금요일 루틴의 레터럴 레이즈 머신에서도 바로 열려요." },
    { date: "2026. 11. 6", title: "자세 복습지 5개가 올라왔어요", link: "forms",
      body: "펙덱 플라이 · 인클라인 덤벨 프레스 · 플랫 덤벨 프레스 · 덤벨 숄더 프레스 · 케이블 풀오버! 내 영상으로 자세를 다시 보고, 운동 전에 KEY POINT 한 번씩 읽어봐요. 루틴 탭 종목에서도 바로 열려요." },
    { date: "2026. 11. 5", title: "바프 벌크업 식단이 올라왔어요", link: "diet",
      body: "식단 탭에서 하루 4끼를 확인하세요! '또는'은 둘 중 하나만 골라 먹으면 돼요. 3식(프로틴 + 카보린)은 운동 끝나고 바로 — 바프 근육은 먹은 만큼 만들어져요!" },
    { date: "2026. 11. 5", title: "PT 노트가 열렸어요",
      body: "바프까지 가는 노트예요! 목표 탭에서 기초 → 벌크 → 컷팅 3단계와 지금 위치를 볼 수 있어요. 이번 주 루틴(v10)은 루틴 탭에서 요일을 누르면 그날 운동과 무게가 나와요. 지금은 근육을 채우는 시기 — 등 2번 · 하체 2번 꼭 챙겨요!" }
  ],
  /* 다음 수업 (없으면 null) */
  next_class: null,

  /* 자세 복습지 (최신이 위) */
  forms: [
    {
      id: "underhand-seated-row",
      dir: "media/form-underhand-seated-row/",
      date: "2026. 11. 9 (월)",
      exercise: "언더그립 시티드 로우",
      exercise_en: "Underhand Seated Row",
      part: "등",
      targets: ["광배근 아래쪽 (등 날개)", "능형근 · 이두근"],
      benefit: "손바닥을 위로 잡으면 팔꿈치가 몸에 붙어서 등 날개 아래쪽까지 꽉 차요. 바프 사진에서 등이 V자로 넓어 보여요",
      key_point: "바는 배꼽 쪽으로, 팔꿈치는 몸에 붙여 뒤로 쭉!",
      good_points: [
        { title: "바를 배 쪽으로 당겼어요", desc: "가슴이 아니라 배꼽 쪽으로 당겨서 등 아래쪽 날개가 일했어요" },
        { title: "팔을 끝까지 펴서 늘렸어요", desc: "돌아갈 때 팔을 다 펴서 등이 충분히 늘어난 상태에서 다시 당겼어요" },
        { title: "발판을 단단히 밀고 앉았어요", desc: "하체가 고정돼서 당길 때 몸이 앞뒤로 끌려가지 않았어요" }
      ],
      primary_muscles: [{ name: "광배근", where: "겨드랑이 아래 ~ 허리 위 등 날개" }],
      secondary_muscles: "대원근 · 능형근 · 중부 승모근 · 이두근",
      feel_good: "등 아래쪽 날개가 꽉 조여요",
      feel_stop: "이두·팔뚝만 아프거나, 허리가 뻐근해요",
      steps: [
        { title: "준비", desc: "발판에 발을 대고 앉아 일자바를 손바닥이 위로 오게 어깨너비로 잡아요. 팔을 펴고 가슴을 세워요", chip: "숨 들이마시기", media: "step1.jpg" },
        { title: "당기기", desc: "팔꿈치를 몸 옆에 붙인 채 뒤로! 바가 배꼽에 닿을 때 날개뼈를 꽉 모아요", chip: "1~2초 · 후~ 내쉬며", media: "step2.webp", loop: true },
        { title: "펴주기", desc: "버티면서 팔을 끝까지 펴요. 등이 앞으로 쭉 늘어나는 걸 느껴요", chip: "2~3초 · 들이마시며", media: "step3.webp", loop: true }
      ],
      do: ["가슴을 세우고 허리는 곧게", "팔꿈치는 몸통에 붙여서 뒤로", "끝에서 날개뼈 1초 모으기"],
      dont: ["상체를 뒤로 크게 젖혀 당기기", "손목을 말아 팔로 당기기", "어깨를 귀 쪽으로 으쓱하기"]
    },
    {
      id: "low-row",
      dir: "media/form-low-row/",
      date: "2026. 11. 9 (월)",
      exercise: "해머스트렝스 로우로우",
      exercise_en: "Hammer Strength Low Row",
      part: "등",
      targets: ["광배근 (등 날개)", "능형근 · 중부 승모근 · 후면 삼각근"],
      benefit: "가슴 패드가 몸을 잡아줘서 무겁게 당겨도 허리 부담이 적어요. 등 두께와 넓이를 같이 키워줘요",
      key_point: "가슴은 패드에 붙이고, 팔꿈치로 뒤를 찌른다!",
      good_points: [
        { title: "가슴을 패드에 붙이고 했어요", desc: "당길 때 상체가 뒤로 젖혀지지 않아서 등으로만 당겼어요" },
        { title: "팔꿈치를 뒤까지 보냈어요", desc: "손잡이를 몸 옆까지 당겨서 등이 끝까지 수축됐어요" },
        { title: "일정한 속도로 반복했어요", desc: "무게가 무거워도 회마다 같은 리듬으로 움직였어요" }
      ],
      primary_muscles: [{ name: "광배근", where: "겨드랑이 아래 등 옆 날개" }],
      secondary_muscles: "능형근 · 중부 승모근 · 대원근 · 후면 삼각근 · 이두근",
      feel_good: "등 가운데와 날개가 뻐근해요",
      feel_stop: "허리가 찌릿하거나, 팔만 아파요",
      steps: [
        { title: "준비", desc: "의자 높이를 맞춰 가슴을 패드에 붙이고 손잡이를 잡아요. 팔을 앞으로 쭉 펴서 등을 늘려요", chip: "숨 들이마시기", media: "step1.jpg" },
        { title: "당기기", desc: "팔꿈치로 뒤를 찌르듯 손잡이를 몸 옆까지! 날개뼈를 꽉 모아요", chip: "1~2초 · 후~ 내쉬며", media: "step2.webp", loop: true },
        { title: "펴주기", desc: "버티면서 팔을 앞으로 쭉. 날개뼈가 벌어지며 등이 늘어나는 걸 느껴요", chip: "2~3초 · 들이마시며", media: "step3.webp", loop: true }
      ],
      do: ["가슴은 끝까지 패드에 붙이기", "팔꿈치로 뒤를 찌르듯 당기기", "무게는 원판 양쪽 합계로 보기"],
      dont: ["가슴을 패드에서 떼고 젖히기", "어깨를 으쓱하며 당기기", "펼 때 무게에 끌려가기"]
    },
    {
      id: "reverse-pec-deck",
      dir: "media/form-reverse-pec-deck/",
      date: "2026. 11. 9 (월)",
      exercise: "리버스 펙덱",
      exercise_en: "Reverse Pec Deck",
      part: "어깨 · 등",
      targets: ["후면 삼각근 (뒷어깨)", "능형근 · 중부 승모근"],
      benefit: "뒷어깨와 날개뼈 사이를 키워서 말린 어깨가 펴져요. 등 운동 전에 하면 날개뼈가 먼저 깨어나요",
      key_point: "손이 아니라 팔꿈치로 옆으로 크게 벌린다!",
      good_points: [
        { title: "팔을 뒤까지 크게 벌렸어요", desc: "손잡이를 몸통 옆까지 보내서 뒷어깨가 끝까지 일했어요" },
        { title: "팔꿈치 각도를 유지했어요", desc: "팔을 굽혔다 폈다 하지 않아서 팔이 아니라 어깨로 벌렸어요" },
        { title: "가슴을 패드에 붙였어요", desc: "상체가 뒤로 빠지지 않아서 반동 없이 움직였어요" }
      ],
      primary_muscles: [{ name: "후면 삼각근", where: "어깨 뒤쪽" }],
      secondary_muscles: "능형근 · 중부 승모근 · 극하근 · 소원근",
      feel_good: "어깨 뒤쪽과 날개뼈 사이가 뻐근해요",
      feel_stop: "목·승모근만 뻐근하거나, 어깨 앞이 찌릿해요",
      steps: [
        { title: "준비", desc: "가슴을 패드에 붙이고 손잡이를 어깨 높이로 잡아요. 팔꿈치는 살짝 굽히고 어깨는 내려요", chip: "숨 들이마시기", media: "step1.jpg" },
        { title: "벌리기", desc: "팔꿈치로 큰 원을 그리듯 옆으로! 팔이 몸통과 일자가 될 때까지 벌려요", chip: "1~2초 · 후~ 내쉬며", media: "step2.webp", loop: true },
        { title: "천천히 모으기", desc: "버티면서 앞으로 천천히. 손잡이가 부딪히기 전에 다시 벌려요", chip: "2~3초 · 들이마시며", media: "step3.webp", loop: true }
      ],
      do: ["가슴은 패드에 붙이기", "팔꿈치 각도는 처음 그대로", "어깨는 아래로 내린 채"],
      dont: ["어깨를 귀 쪽으로 으쓱하기", "몸을 뒤로 젖혀 반동 쓰기", "날개뼈만 모으고 팔은 덜 벌리기"]
    },
    {
      id: "lateral-raise-machine",
      dir: "media/form-lateral-raise-machine/",
      date: "2026. 11. 6 (금)",
      exercise: "스탠딩 사이드 레터럴 레이즈 머신",
      exercise_en: "Standing Lateral Raise Machine",
      part: "어깨",
      targets: ["측면 삼각근 (옆 어깨)", "전면 삼각근 · 상부 승모근"],
      benefit: "옆 어깨를 동그랗게 키워서 어깨가 넓어 보이게 해줘요. 바프 사진에서 V라인을 만드는 핵심 종목이에요",
      key_point: "손이 아니라 팔꿈치로 들고, 어깨 높이에서 멈춘다!",
      good_points: [
        { title: "위에서 잠깐 멈췄어요", desc: "어깨 높이에서 1초 가까이 버텨서 옆 어깨가 꽉 수축됐어요" },
        { title: "어깨 높이까지만 들었어요", desc: "팔을 너무 높이 올리지 않아서 승모근이 아니라 어깨에 자극이 갔어요" },
        { title: "몸통이 흔들리지 않았어요", desc: "서서 하는데도 반동 없이 팔만 움직여서 어깨로만 들었어요" }
      ],
      primary_muscles: [{ name: "측면 삼각근", where: "어깨 옆 동그란 부분" }],
      secondary_muscles: "전면 삼각근 · 상부 승모근",
      feel_good: "어깨 옆이 타는 듯 뻐근해요",
      feel_stop: "목·승모근만 뻐근하거나, 어깨 안쪽이 찌릿해요",
      steps: [
        { title: "준비", desc: "기구 옆에 바르게 서서 손잡이를 잡아요. 팔꿈치를 살짝 굽히고 어깨는 아래로 내려요", chip: "숨 들이마시기", media: "step1.jpg" },
        { title: "들어 올리기", desc: "팔꿈치로 옆으로 크게! 어깨 높이까지 들고 위에서 1초 멈춰요", chip: "1~2초 · 후~ 내쉬며", media: "step2.webp", loop: true },
        { title: "천천히 내리기", desc: "무게에 끌려가지 말고 버티면서 처음 자리까지", chip: "3초 · 들이마시며", media: "step3.webp", loop: true }
      ],
      do: ["어깨는 아래로 내린 채 시작", "팔꿈치가 손보다 먼저 올라가기", "어깨 높이에서 1초 멈추기"],
      dont: ["어깨를 귀 쪽으로 으쓱하기", "몸을 흔들어 반동 쓰기", "팔을 어깨보다 높이 들기"]
    },
    {
      id: "viking-press",
      dir: "media/form-viking-press/",
      date: "2026. 11. 6 (금)",
      exercise: "바이킹 프레스",
      exercise_en: "Viking Press",
      part: "어깨",
      targets: ["삼각근 (앞·옆 어깨)", "삼두근 · 상부 승모근"],
      benefit: "서서 머리 위로 미는 묵직한 어깨 운동이에요. 어깨 전체 크기를 키우고 몸통 버티는 힘까지 같이 길러줘요",
      key_point: "배에 힘 꽉! 귀 옆까지 내리고 머리 위로 곧게 민다",
      good_points: [
        { title: "머리 위로 끝까지 밀었어요", desc: "매 회 팔을 거의 다 펴서 어깨가 마지막까지 일했어요" },
        { title: "귀 옆까지 충분히 내렸어요", desc: "손잡이를 귀 높이까지 내려서 어깨를 넓은 범위로 썼어요" },
        { title: "상체를 곧게 세웠어요", desc: "허리를 젖히지 않고 서 있는 자세 그대로 밀었어요" }
      ],
      primary_muscles: [{ name: "삼각근 전면·측면", where: "어깨 앞과 옆" }],
      secondary_muscles: "삼두근 · 상부 승모근 · 전거근",
      feel_good: "어깨 앞·옆이 뻐근하고 꽉 차요",
      feel_stop: "허리가 찌릿하거나, 목만 뻐근해요",
      steps: [
        { title: "준비", desc: "발을 골반 너비로 서서 손잡이를 귀 옆에 잡아요. 배에 힘을 주고 갈비뼈를 내려요", chip: "숨 들이마시고 배에 힘", media: "step1.jpg" },
        { title: "밀어 올리기", desc: "어깨로 밀어 머리 위로 곧게! 맨 위에서 팔꿈치는 살짝 굽힌 채", chip: "1~2초 · 후~ 내쉬며", media: "step2.webp", loop: true },
        { title: "내리기", desc: "버티면서 귀 옆까지 천천히. 어깨가 늘어나는 걸 느껴요", chip: "2~3초 · 들이마시며", media: "step3.webp", loop: true }
      ],
      do: ["배에 힘 주고 갈비뼈 내리기", "손잡이는 귀 옆까지 내리기", "무릎은 살짝 풀고 서기"],
      dont: ["허리를 뒤로 젖혀서 밀기", "무릎 반동으로 밀어 올리기", "어깨를 귀 쪽으로 으쓱하기"]
    },
    {
      id: "pec-deck",
      dir: "media/form-pec-deck/",
      date: "2026. 11. 4 (수)",
      exercise: "펙덱 플라이",
      exercise_en: "Pec Deck Fly",
      part: "가슴",
      targets: ["대흉근 (가슴 전체)", "전면 삼각근 · 이두근"],
      benefit: "가슴 안쪽까지 꽉 모아줘서 가슴 가운데 라인을 선명하게 만들어줘요. 바프 사진에서 가슴 선이 살아나요",
      key_point: "손이 아니라 팔꿈치로 큰 원을 그리며, 가운데서 꽉 모은다!",
      good_points: [
        { title: "팔을 크게 벌려 가슴을 늘렸어요", desc: "돌아갈 때 손잡이를 몸 옆까지 보내서 매 회 가슴이 충분히 늘어났어요" },
        { title: "등을 등받이에 붙이고 했어요", desc: "상체가 앞으로 쏠리지 않아서 반동 없이 가슴으로만 모았어요" },
        { title: "발을 바닥에 단단히 고정했어요", desc: "하체가 흔들리지 않아서 같은 자세로 끝까지 반복했어요" }
      ],
      primary_muscles: [{ name: "대흉근", where: "가슴 전체, 특히 가운데 안쪽" }],
      secondary_muscles: "전면 삼각근 · 이두근 단두",
      feel_good: "가슴 가운데 안쪽이 꽉 조이고 뻐근해요",
      feel_stop: "어깨 앞이 찌릿하거나, 팔만 아파요",
      steps: [
        { title: "준비", desc: "손잡이가 가슴 높이에 오게 의자를 맞추고 등을 등받이에 붙여요. 팔꿈치를 살짝 굽혀 손잡이를 잡고 가슴을 펴요", chip: "숨 들이마시기", media: "step1.jpg" },
        { title: "모으기", desc: "팔꿈치로 큰 원을 그리듯 손잡이를 가슴 앞으로! 가운데서 1초 꽉 모아요", chip: "1~2초 · 후~ 내쉬며", media: "step2.webp", loop: true },
        { title: "천천히 벌리기", desc: "무게에 끌려가지 말고 버티면서 몸 옆까지. 가슴이 쭉 늘어나는 걸 느껴요", chip: "3초 · 들이마시며", media: "step3.webp", loop: true }
      ],
      do: ["등은 등받이에 붙이고 가슴 펴기", "팔꿈치 각도는 처음 그대로 유지", "가운데서 1초 꽉 모으기"],
      dont: ["어깨를 귀 쪽으로 으쓱하기", "상체를 앞으로 숙여 반동 쓰기", "팔꿈치를 폈다 굽혔다 하기"]
    },
    {
      id: "incline-db-press",
      dir: "media/form-incline-db-press/",
      date: "2026. 11. 4 (수)",
      exercise: "인클라인 덤벨 프레스",
      exercise_en: "Incline DB Press",
      part: "가슴",
      targets: ["윗가슴 (대흉근 상부)", "전면 삼각근 · 삼두근"],
      benefit: "윗가슴을 채워서 쇄골 아래가 꽉 차 보이게 해줘요. 바프 사진에서 가슴 두께가 확 달라져요",
      key_point: "덤벨은 윗가슴 옆으로 깊게, 밀 땐 윗가슴으로!",
      good_points: [
        { title: "덤벨을 가슴 옆까지 깊게 내렸어요", desc: "끝까지 내려서 윗가슴이 충분히 늘어난 상태에서 밀었어요" },
        { title: "양손을 같은 속도로 움직였어요", desc: "한쪽이 먼저 올라가지 않고 좌우가 균형 있게 움직였어요" },
        { title: "발을 바닥에 단단히 딛었어요", desc: "하체가 버텨줘서 무거운 무게에도 몸이 흔들리지 않았어요" }
      ],
      primary_muscles: [{ name: "대흉근 상부", where: "쇄골 아래 윗가슴" }],
      secondary_muscles: "대흉근 중·하부 · 전면 삼각근 · 삼두근",
      feel_good: "쇄골 아래 윗가슴이 뻐근해요",
      feel_stop: "어깨 앞만 타거나, 손목이 꺾여서 아파요",
      steps: [
        { title: "준비", desc: "등받이는 30도 정도. 덤벨을 어깨 위로 들고 날개뼈를 모아 가슴을 위로 세워요", chip: "숨 들이마시기", media: "step1.jpg" },
        { title: "내리기", desc: "팔꿈치를 몸통에서 45도 정도 벌리며 덤벨을 윗가슴 옆까지 천천히", chip: "3초 · 들이마시며", media: "step2.webp", loop: true },
        { title: "밀어 올리기", desc: "윗가슴으로 밀어 처음 자리까지! 맨 위에서 덤벨끼리 부딪히지 않게", chip: "1~2초 · 후~ 내쉬며", media: "step3.webp", loop: true }
      ],
      do: ["날개뼈 모으고 가슴을 위로 세우기", "손목은 팔꿈치 바로 위에 세우기", "내릴 땐 천천히 3초"],
      dont: ["엉덩이를 들어 각도 없애기", "팔꿈치를 옆으로 일자로 벌리기", "바닥에서 튕겨 올리기"]
    },
    {
      id: "flat-db-press",
      dir: "media/form-flat-db-press/",
      date: "2026. 11. 4 (수)",
      exercise: "플랫 덤벨 프레스",
      exercise_en: "Flat DB Press",
      part: "가슴",
      targets: ["대흉근 (가슴 전체)", "전면 삼각근 · 삼두근"],
      benefit: "가슴 전체 크기를 키워주는 기본 종목이에요. 덤벨이라 좌우 따로 써서 균형 잡힌 가슴을 만들어요",
      key_point: "날개뼈 모으고, 덤벨은 가슴 옆으로 깊게 내린다!",
      good_points: [
        { title: "가슴 옆까지 깊게 내렸어요", desc: "덤벨이 가슴 높이까지 내려와서 가슴이 끝까지 늘어났어요" },
        { title: "맨 위에서 덤벨이 어깨 위에 있었어요", desc: "덤벨이 얼굴이나 배 쪽으로 가지 않고 같은 길로 오르내렸어요" },
        { title: "무릎 굽혀 발을 단단히 딛었어요", desc: "하체로 버텨서 밀 때 몸이 흔들리지 않았어요" }
      ],
      primary_muscles: [{ name: "대흉근", where: "가슴 전체" }],
      secondary_muscles: "전면 삼각근 · 삼두근",
      feel_good: "가슴 가운데부터 옆까지 뻐근해요",
      feel_stop: "어깨 앞이 찌릿하거나, 팔만 아파요",
      steps: [
        { title: "준비", desc: "벤치에 누워 발을 바닥에 딛고 날개뼈를 모아요. 덤벨은 어깨 위로 팔을 쭉", chip: "숨 들이마시기", media: "step1.jpg" },
        { title: "내리기", desc: "팔꿈치를 45도로 벌리며 덤벨을 가슴 옆까지 천천히. 가슴이 늘어나는 걸 느껴요", chip: "3초 · 들이마시며", media: "step2.webp", loop: true },
        { title: "밀어 올리기", desc: "가슴으로 밀어 처음 자리까지! 위에서 가슴을 살짝 모아줘요", chip: "1~2초 · 후~ 내쉬며", media: "step3.webp", loop: true }
      ],
      do: ["날개뼈 모으고 가슴 내밀기", "덤벨은 어깨 위 → 가슴 옆 같은 길로", "발은 바닥에 단단히"],
      dont: ["엉덩이를 벤치에서 띄우기", "팔꿈치를 어깨 높이로 일자로 벌리기", "내리자마자 튕겨 올리기"]
    },
    {
      id: "db-shoulder-press",
      dir: "media/form-db-shoulder-press/",
      date: "2026. 11. 4 (수)",
      exercise: "덤벨 숄더 프레스",
      exercise_en: "DB Shoulder Press",
      part: "어깨",
      targets: ["삼각근 (앞·옆 어깨)", "삼두근 · 상부 승모근"],
      benefit: "어깨를 둥글고 넓게 키워줘요. 어깨가 넓어지면 허리가 더 얇아 보여서 바프 사진의 V라인이 살아나요",
      key_point: "덤벨은 귀 옆까지 내리고, 머리 위로 곧게 밀어 올린다!",
      good_points: [
        { title: "귀 높이까지 충분히 내렸어요", desc: "덤벨을 귀 옆까지 내려서 어깨가 넓은 범위로 일했어요" },
        { title: "머리 위로 끝까지 밀었어요", desc: "매 회 팔을 거의 다 펴서 마무리까지 확실하게 했어요" },
        { title: "일정한 리듬으로 반복했어요", desc: "올리고 내리는 속도가 회마다 비슷해서 자세가 무너지지 않았어요" }
      ],
      primary_muscles: [{ name: "삼각근 전면·측면", where: "어깨 앞과 옆, 동그란 부분" }],
      secondary_muscles: "삼두근 · 상부 승모근 · 후면 삼각근",
      feel_good: "어깨 앞·옆이 터질 듯 뻐근해요",
      feel_stop: "허리가 찌릿하거나, 목·승모근만 뻐근해요",
      steps: [
        { title: "준비", desc: "등받이를 세우고 앉아 허리를 붙여요. 덤벨을 귀 옆에 두고 팔꿈치는 손목 바로 아래", chip: "숨 들이마시기", media: "step1.jpg" },
        { title: "밀어 올리기", desc: "어깨로 밀어 머리 위로! 덤벨이 살짝 모이며 위에서 팔꿈치는 살짝 굽힌 채", chip: "1~2초 · 후~ 내쉬며", media: "step2.webp", loop: true },
        { title: "내리기", desc: "버티면서 귀 옆까지 천천히. 어깨가 쭉 늘어나는 걸 느껴요", chip: "3초 · 들이마시며", media: "step3.webp", loop: true }
      ],
      do: ["허리는 등받이에 붙이기", "손목은 팔꿈치 바로 위에", "덤벨은 귀 옆까지 내리기"],
      dont: ["허리를 뒤로 젖혀서 밀기", "어깨를 귀 쪽으로 으쓱하기", "반만 내리고 빨리 올리기"]
    },
    {
      id: "cable-pullover",
      dir: "media/form-cable-pullover/",
      date: "2026. 10. 21 (화)",
      exercise: "케이블 풀오버",
      exercise_en: "Cable Pullover",
      part: "등",
      targets: ["광배근 (등 날개)", "대원근 · 삼두근 장두 · 전거근"],
      benefit: "팔을 편 채로 등 날개만 쓰게 해줘요. 등 운동 전에 하면 광배근이 먼저 깨어나서 로우·풀다운이 더 잘 들어가요",
      key_point: "팔은 쭉 편 채로, 등 날개로 골반까지 끌어내린다!",
      good_points: [
        { title: "팔을 편 채로 끝까지 했어요", desc: "팔꿈치를 굽히지 않아서 팔이 아니라 등으로 당겼어요" },
        { title: "위에서 충분히 늘려줬어요", desc: "바를 머리 위까지 보내서 매 회 등 날개가 쭉 늘어났어요" },
        { title: "몸통이 흔들리지 않았어요", desc: "상체를 숙이거나 젖히지 않고 같은 자세로 반복했어요" }
      ],
      primary_muscles: [{ name: "광배근", where: "겨드랑이 아래 등 옆 날개" }],
      secondary_muscles: "대원근 · 삼두근 장두 · 후면 삼각근 · 전거근",
      feel_good: "겨드랑이 아래 등 옆쪽이 뻐근해요",
      feel_stop: "어깨 앞이 찌릿하거나, 팔꿈치·삼두만 아파요",
      steps: [
        { title: "준비", desc: "도르래를 머리 위로 올리고 이지바를 어깨너비로 잡아요. 한 걸음 물러나 팔을 위로 쭉 펴고 등을 늘려요", chip: "숨 들이마시기", media: "step1.jpg" },
        { title: "끌어내리기", desc: "팔은 편 채로 큰 원을 그리며 바를 골반 쪽까지! 맨 아래에서 겨드랑이를 꽉 조여요", chip: "2초 · 후~ 내쉬며", media: "step2.webp", loop: true },
        { title: "버티며 올리기", desc: "천천히 머리 위까지 올리며 등 날개가 늘어나는 걸 느껴요", chip: "3초 · 들이마시며", media: "step3.webp", loop: true }
      ],
      do: ["팔꿈치는 살짝만 굽힌 채 고정", "바는 골반 쪽까지 끌어내리기", "갈비뼈 내리고 배에 힘 주기"],
      dont: ["팔꿈치를 굽혀 삼두로 누르기", "허리를 젖혀 몸으로 당기기", "위에서 무게에 끌려가기"]
    }
  ],

  /* 주간 루틴 */
  routine: {
    version: "v10",
    updated: "2026. 10. 26",
    title: "주 6회 · 근비대 + 바른 등",
    plan: ["등 2번 · 하체 2번 집중", "가슴 · 어깨 · 팔 하루씩", "일요일은 푹 쉬고 잘 먹기"],
    key_point: "등은 손이 아니라 팔꿈치로 당겨요! 가슴 펴고, 매주 무게를 조금씩 올려봐요",
    note: "세트 사이 1분 30초~2분 쉬기 · 덤벨 무게는 한 손 기준 · 로우로우·핵스쿼트는 원판 양쪽 합계예요",
    cardio: { minutes: 15, options: "경사 걷기 · 천국의 계단 · 사이클 중 택1" },
    days: [
      { day: "월", part: "등 A", en: "Back A", cardio: true, items: [
        { name: "케이블 풀오버", en: "Cable Pullover", form: "cable-pullover", tag: "워밍업", tip: "팔 펴고 골반까지", sets: [[20, 15], [15, 15]] },
        { name: "뉴텍 시티드 로우 머신", en: "Seated Row Machine", tag: "메인", tip: "가슴 패드 붙이고 당기기", sets: [[15, 35], [12, 40], [10, 40], [8, 45]] },
        { name: "랫풀다운", en: "Lat Pulldown", tip: "팔꿈치로 당기기", sets: [[12, 40], [12, 40], [12, 40]] },
        { name: "해머스트렝스 로우로우", en: "Low Row", form: "low-row", tip: "원판 양쪽 합계 무게", sets: [[12, 40], [12, 40], [12, 40]] },
        { name: "리버스 펙덱", en: "Reverse Pec Deck", form: "reverse-pec-deck", tip: "날개뼈 모으며 옆으로", sets: [[15, 20], [15, 20], [15, 20]] }
      ]},
      { day: "화", part: "가슴", en: "Chest", cardio: true, items: [
        { name: "펙덱 플라이", en: "Pec Deck Fly", form: "pec-deck", tag: "워밍업", tip: "가슴 모은다는 느낌", sets: [[20, 20], [15, 20]] },
        { name: "인클라인 덤벨 프레스", en: "Incline DB Press", form: "incline-db-press", tag: "메인", tip: "윗가슴으로 밀기", sets: [[15, 12], [12, 12], [10, 14], [8, 14]] },
        { name: "체스트 프레스", en: "Chest Press", tip: "가슴 펴고 밀기", sets: [[12, 35], [12, 35], [12, 35]] },
        { name: "머신 인클라인 프레스", en: "Incline Machine Press", tip: "세트마다 무게 ↑", sets: [[15, 25], [12, 30], [10, 35]] }
      ]},
      { day: "수", part: "하체 A", en: "Legs A", cardio: false, items: [
        { name: "이너타이", en: "Inner Thigh", tag: "선행", tip: "세트마다 무게 ↑", sets: [[20, 25], [15, 30], [12, 35]] },
        { name: "아웃타이 머신", en: "Outer Thigh", icon: "outer_thigh_pin", tag: "선행", tip: "세트마다 무게 ↑", sets: [[20, 25], [15, 30], [12, 35]] },
        { name: "고블릿 스쿼트", en: "Goblet Squat", tag: "워밍업", tip: "가슴 세우고 깊이 앉기", sets: [[20, 6], [15, 8]] },
        { name: "핵스쿼트", en: "Hack Squat", tag: "메인", tip: "등 패드에 붙이고 · 원판 양쪽 합계", sets: [[15, 20], [12, 20], [10, 25], [8, 25]] },
        { name: "레그프레스", en: "Leg Press", tip: "무릎은 발끝 방향으로", sets: [[12, 60], [12, 60], [12, 60]] }
      ]},
      { day: "목", part: "등 B", en: "Back B", cardio: true, items: [
        { name: "리버스 펙덱", en: "Reverse Pec Deck", form: "reverse-pec-deck", tag: "워밍업", tip: "뒷어깨 가볍게 풀기", sets: [[20, 15], [15, 15]] },
        { name: "케이블 시티드 로우", en: "Cable Seated Row", tag: "메인", tip: "가슴 펴고 날개뼈 모으기", sets: [[15, 35], [12, 40], [10, 40], [8, 45]] },
        { name: "언더그립 시티드 로우", en: "Underhand Seated Row", form: "underhand-seated-row", tip: "일자바 · 손바닥 위로", sets: [[12, 35], [12, 35], [12, 35]] },
        { name: "랫풀다운", en: "Lat Pulldown", tip: "팔꿈치로 당기기", sets: [[12, 40], [12, 40], [12, 40]] },
        { name: "시티드 페이스풀", en: "Seated Face Pull", tip: "팔꿈치 높게 얼굴 쪽으로", sets: [[15, 15], [15, 15], [15, 15]] }
      ]},
      { day: "금", part: "어깨 · 팔", en: "Shoulder & Arms", cardio: false, items: [
        { name: "사이드 레터럴 레이즈", en: "Lateral Raise", tag: "워밍업", tip: "어깨 으쓱 금지", sets: [[20, 4], [15, 4]] },
        { name: "숄더 프레스 머신", en: "Shoulder Press", tag: "메인", tip: "허리 등받이에 붙이기", sets: [[15, 25], [12, 25], [10, 30], [8, 30]] },
        { name: "사이드 레터럴 레이즈 머신", en: "Standing Machine", form: "lateral-raise-machine", tip: "팔꿈치로 들어 올리기", sets: [[15, 15], [15, 15], [15, 15]] },
        { name: "시티드 페이스풀", en: "Seated Face Pull", tip: "팔꿈치 높게 얼굴 쪽으로", sets: [[15, 15], [15, 15], [15, 15]] },
        { name: "덤벨 컬", en: "DB Curl", tip: "팔꿈치 고정, 반동 금지", sets: [[12, 10], [12, 10], [12, 10]] },
        { name: "해머 컬", en: "Hammer Curl", tip: "엄지가 위로", sets: [[12, 10], [12, 10], [12, 10]] }
      ]},
      { day: "토", part: "하체 B", en: "Legs B", cardio: false, items: [
        { name: "이너타이", en: "Inner Thigh", tag: "선행", tip: "세트마다 무게 ↑", sets: [[20, 25], [15, 30], [12, 35]] },
        { name: "아웃타이 머신", en: "Outer Thigh", icon: "outer_thigh_pin", tag: "선행", tip: "세트마다 무게 ↑", sets: [[20, 25], [15, 30], [12, 35]] },
        { name: "고블릿 스쿼트", en: "Goblet Squat", tag: "워밍업", tip: "가슴 세우고 깊이 앉기", sets: [[20, 6], [15, 8]] },
        { name: "핵스쿼트", en: "Hack Squat", tag: "메인", tip: "등 패드에 붙이고 · 원판 양쪽 합계", sets: [[15, 20], [12, 20], [10, 25], [8, 25]] },
        { name: "레그프레스 (발 높게)", en: "Leg Press · High", tip: "뒤꿈치로 밀기", sets: [[12, 55], [12, 55], [12, 55]] }
      ]},
      { day: "일", part: "휴식", en: "Rest", rest: true, items: [] }
    ]
  },

  /* 식단표 (없으면 null) — 끼니별로 정해진 벌크업 식단 (meals 형식) */
  diet: {
    updated: "2026. 11. 5",
    title: "바프 벌크업 식단",
    title_en: "Bulk-up Meal Plan · 하루 4끼",
    rules: ["하루 4끼 빠짐없이", "'또는'은 둘 중 하나만", "3식은 운동 끝나고 바로"],
    rules_note: "적힌 양은 꼭 채워 먹기 — 지금은 근육을 채우는 시기예요",
    key_point: "바프 근육은 먹은 만큼 만들어져요! 4끼 꽉 채우기",
    meals: [
      { no: "1식", options: [
        { label: "간장계란밥", foods: [{ icon: "rice_white", name: "쌀밥", amount: "400g" }, { icon: "egg", name: "계란", amount: "6개" }] },
        { foods: [{ icon: "bagel", name: "베이글", amount: "2개" }, { icon: "shaker", name: "프로틴", amount: "2스쿱" }] }
      ]},
      { no: "2식", options: [
        { foods: [{ icon: "rice_white", name: "쌀밥", amount: "400g" }, { icon: "chicken", name: "닭가슴살", amount: "200g" }, { icon: "egg", name: "계란", amount: "5개" }] }
      ]},
      { no: "3식", tag: "운동 후", options: [
        { foods: [{ icon: "shaker", name: "프로틴", amount: "2스쿱" }, { icon: "carbo", name: "카보린" }] }
      ], note: "운동 끝나고 바로 섞어 마시기" },
      { no: "4식", options: [
        { foods: [{ icon: "rice_white", name: "쌀밥", amount: "200g" }, { icon: "chicken", name: "닭가슴살", amount: "200g" }] },
        { foods: [{ icon: "sweet_potato", name: "고구마", amount: "400g" }, { icon: "shaker", name: "프로틴", amount: "2스쿱" }] }
      ]}
    ]
  }
};
