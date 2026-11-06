/* 최용민 · 고은성 회원님 그룹 PT 노트 데이터 — 이 파일만 고치면 페이지 내용이 바뀜 */
/* 그룹 PT라 두 분이 한 페이지를 같이 봄 (출석도 한 줄로 같이). 2026-11-05 */
/* 최용민님 무릎 부상으로 하체 없이 상체만 · 유산소 없음. 스미스·덤벨 위주, 파트너가 번갈아 1세트씩 */
window.MEMBER = {
  name: "최용민 · 고은성",
  sex: "M",                       // M = 네이비, F = 핑크
  since: "2026. 11",
  goal: "그룹 PT · 상체 근력 · 주 5회",
  journey: { start: "2026-10-15" },   // PT 시작일 (장동욱: 10월부터 → 15일로 둠)

  /* 공지 (최신이 위) */
  notices: [
    { date: "2026. 11. 6", title: "아이소레터럴 로우 자세 복습지 2개가 올라왔어요",
      body: "어제(11/5) 수업 영상으로 만들었어요. 최용민님은 양팔 아이소레터럴 로우, 고은성님은 원암 아이소레터럴 로우! 복습지 탭에서 볼 수 있어요.", link: "forms" },
    { date: "2026. 11. 5", title: "루틴이 v3로 바뀌었어요",
      body: "월~금 운동 끝나고 마무리 유산소 15분이 추가됐어요. 경사 걷기나 사이클 중 하나! 최용민님은 무릎 편한 걸로 하고, 천국의 계단은 피해주세요.", link: "routine" },
    { date: "2026. 11. 5", title: "스미스 인클라인 프레스 자세 복습지가 올라왔어요",
      body: "어제 수업 영상으로 만든 복습지예요. 월요일 메인 종목이에요. 운동 전에 한 번 보고 들어가세요!", link: "form-smith-incline-press" },
    { date: "2026. 11. 5", title: "고은성님 식단표가 올라왔어요",
      body: "아래 '식단' 탭에서 언제든 볼 수 있어요. 아침·저녁은 탄수 1종 + 단백 1종, 점심은 일반식 그대로예요!", link: "diet" },
    { date: "2026. 11. 5", title: "루틴이 v2로 바뀌었어요",
      body: "월: 메인이 스미스 인클라인 프레스, 삼두는 케이블 푸쉬다운 / 화: 메인이 시티드 로우 머신, 스미스 슈러그 / 수: 리버스 펙덱 워밍업, 덤벨 숄더 프레스 추가 / 목: 인클라인 덤벨 컬 추가 / 금: 메인이 스미스 벤치프레스, 랫풀다운, 랙 밴드 푸쉬업", link: "routine" },
    { date: "2026. 11. 5", title: "그룹 PT 노트가 열렸어요",
      body: "두 분이 같이 보는 PT 노트예요. 월~금 주 5회 상체 루틴(v1)이 올라왔어요. 둘이 번갈아 1세트씩, 쉬는 사람이 보조! 운동 온 날 홈에서 '오늘 출석'을 눌러주세요.", link: "routine" }
  ],
  /* 다음 수업 (없으면 null) */
  next_class: null,

  /* 자세 복습지 (최신이 위) */
  forms: [
    {
      id: "iso-row",
      member: "최용민",
      dir: "media/form-iso-row/",
      date: "2026. 11. 5 (목)",
      exercise: "뉴텍 아이소레터럴 로우",
      exercise_en: "Newtech Iso-Lateral Row",
      part: "등",
      targets: ["광배근 (등 날개)", "등 가운데 · 후면 어깨"],
      benefit: "양손으로 묵직하게 당겨서 등 전체 두께를 만들어줘요. 앉아서 하니까 무릎·허리 부담 없이 등에만 집중할 수 있어요",
      key_point: "손이 아니라 팔꿈치로 당기기! 풀 때는 2초 천천히",
      good_points: [
        { title: "상체를 세우고 버텼어요", desc: "당길 때 몸을 뒤로 젖히지 않아서 반동 없이 등으로만 당겼어요" },
        { title: "팔꿈치를 끝까지 뒤로 보냈어요", desc: "손잡이가 옆구리까지 와서 날개뼈가 꽉 모였어요" },
        { title: "천천히 풀어줬어요", desc: "팔을 펼 때 툭 놓지 않고 버티면서 등이 끝까지 늘어났어요" }
      ],
      primary_muscles: [{ name: "광배근", where: "겨드랑이 아래 등 옆" }],
      secondary_muscles: "능형근 · 승모근 가운데 · 후면 삼각근 · 이두근",
      feel_good: "겨드랑이 아래와 날개뼈 사이가 뻐근해요",
      feel_stop: "팔(이두)만 터질 것 같거나, 허리가 아파요",
      steps: [
        { title: "준비", desc: "손잡이가 명치 높이에 오게 의자를 맞춰요. 허리 펴고 앉아 팔을 쭉 뻗어 손잡이를 잡아요", chip: "가슴 펴기", media: "step1.jpg" },
        { title: "당기기", desc: "팔꿈치를 뒤로 보내며 손잡이를 옆구리까지! 끝에서 날개뼈를 꽉 모아 1초 멈춰요", chip: "1초 · 후~ 내쉬며", media: "step2.webp", loop: true },
        { title: "풀기", desc: "등이 늘어나는 걸 느끼며 팔을 천천히 펴요. 어깨가 살짝 앞으로 나가도 OK", chip: "2초 · 들이마시며", media: "step3.webp", loop: true }
      ],
      do: ["가슴 펴고 허리 세워 앉기", "팔꿈치로 당겨 날개뼈 모으기", "풀 때 2초 버티며 천천히"],
      dont: ["몸을 뒤로 젖혀 반동 쓰기", "어깨를 귀 쪽으로 으쓱", "손목을 꺾어 손으로만 당기기"]
    },
    {
      id: "one-arm-iso-row",
      member: "고은성",
      dir: "media/form-one-arm-iso-row/",
      date: "2026. 11. 5 (목)",
      exercise: "뉴텍 원암 아이소레터럴 로우",
      exercise_en: "Newtech One Arm Iso-Lateral Row",
      part: "등",
      targets: ["광배근 (등 날개)", "등 가운데 · 후면 어깨"],
      benefit: "한쪽씩 당겨서 약한 쪽 등까지 똑같이 키워줘요. 양팔로 할 때보다 더 길게 당기고 늘릴 수 있어요",
      key_point: "몸통은 정면 고정! 팔꿈치를 뒷주머니 쪽으로",
      good_points: [
        { title: "한쪽에 집중했어요", desc: "쉬는 팔은 손잡이를 잡고 버텨서 당기는 쪽 등에만 힘이 들어갔어요" },
        { title: "팔꿈치를 몸에 붙여 당겼어요", desc: "팔꿈치가 옆구리를 스치듯 지나가서 광배근에 제대로 걸렸어요" },
        { title: "끝까지 펴줬어요", desc: "팔을 앞으로 쭉 뻗어서 등이 충분히 늘어났어요" }
      ],
      primary_muscles: [{ name: "광배근", where: "겨드랑이 아래 등 옆" }],
      secondary_muscles: "능형근 · 승모근 가운데 · 후면 삼각근 · 이두근",
      feel_good: "당기는 쪽 겨드랑이 아래가 뻐근해요",
      feel_stop: "몸이 돌아가면서 허리가 비틀리거나, 팔만 아파요",
      steps: [
        { title: "준비", desc: "의자를 맞추고 앉아 한 손은 손잡이를 잡고 버텨요. 당길 손은 팔을 쭉 뻗어 잡아요", chip: "가슴 펴기", media: "step1.jpg" },
        { title: "당기기", desc: "몸통은 정면 그대로, 팔꿈치를 뒷주머니 쪽으로 끌어오며 날개뼈를 모아요", chip: "1초 · 후~ 내쉬며", media: "step2.webp", loop: true },
        { title: "풀기", desc: "등이 늘어나는 걸 느끼며 팔을 천천히 앞으로 쭉! 한쪽 다 끝나면 반대쪽도 같은 횟수로", chip: "2초 · 들이마시며", media: "step3.webp", loop: true }
      ],
      do: ["몸통은 정면으로 고정", "팔꿈치를 옆구리 따라 뒤로", "양쪽 같은 횟수·같은 무게로"],
      dont: ["당길 때 몸통 돌려 당기기", "어깨를 귀 쪽으로 으쓱", "풀 때 툭 놓아버리기"]
    },
    {
      id: "smith-incline-press",
      dir: "media/form-smith-incline-press/",
      date: "2026. 11. 4 (수)",
      exercise: "스미스 인클라인 프레스",
      exercise_en: "Smith Incline Press",
      part: "가슴",
      targets: ["윗가슴 (대흉근 상부)", "전면 삼각근 · 삼두근"],
      benefit: "윗가슴을 채워서 가슴 라인이 꽉 차 보이게 해줘요. 봉이 레일을 따라 움직여 무게에 집중하기 좋아요",
      key_point: "봉은 쇄골 아래 윗가슴으로, 내릴 땐 천천히!",
      good_points: [
        { title: "천천히 내렸어요", desc: "내리는 데 2초 가까이 쓰면서 윗가슴이 끝까지 무게를 버텼어요" },
        { title: "윗가슴까지 깊게 내렸어요", desc: "봉이 쇄골 아래까지 내려와서 가슴이 충분히 늘어났어요" },
        { title: "등을 벤치에 붙이고 밀었어요", desc: "엉덩이가 뜨지 않아서 인클라인 각도가 그대로 유지됐어요" }
      ],
      primary_muscles: [{ name: "대흉근 상부", where: "쇄골 아래 윗가슴" }],
      secondary_muscles: "전면 삼각근 · 삼두근",
      feel_good: "쇄골 아래 윗가슴이 뻐근해요",
      feel_stop: "어깨 앞만 타거나, 손목이 꺾여서 아파요",
      steps: [
        { title: "준비", desc: "등받이는 30도 정도, 봉이 쇄골 위에 오게 벤치를 맞춰요. 어깨너비보다 조금 넓게 잡고 날개뼈를 모아 고리를 풀어요", chip: "숨 들이마시기", media: "step1.jpg" },
        { title: "내리기", desc: "팔꿈치를 몸통에서 45도 정도 벌리며 봉을 쇄골 아래 윗가슴까지 천천히", chip: "3초 · 들이마시며", media: "step2.webp", loop: true },
        { title: "밀어 올리기", desc: "윗가슴으로 밀어 처음 자리까지! 맨 위에서 팔꿈치는 살짝 굽힌 채", chip: "1~2초 · 후~ 내쉬며", media: "step3.webp", loop: true }
      ],
      do: ["날개뼈를 모으고 가슴을 위로 세우기", "봉은 쇄골 아래 윗가슴으로 내리기", "손목은 팔꿈치 바로 위에 세우기"],
      dont: ["엉덩이를 들어 각도 없애기", "봉을 명치 쪽으로 내리기", "가슴에 닿자마자 튕겨 올리기"]
    }
  ],

  routine: {
    version: "v3",
    updated: "2026. 11. 5",
    title: "주 5회 · 상체 파트너 루틴",
    plan: ["월~금 상체 5분할 + 유산소 15분", "둘이 번갈아 1세트씩 · 쉬는 쪽이 보조", "토·일은 푹 쉬고 잘 먹기"],
    key_point: "파트너 세트가 내 휴식! 서로 횟수 세주고 자세 봐주기",
    note: "스미스 무게는 봉 빼고 원판만 더한 무게 · 덤벨은 한 손 무게 · 하체는 무릎 회복될 때까지 쉬어요",
    cardio: { minutes: 15, options: "경사 걷기 · 사이클 중 택1 (최용민님은 무릎 편한 걸로, 천국의 계단은 X)" },
    days: [
      { day: "월", part: "가슴·삼두", en: "Chest · Triceps", cardio: true, items: [
        { name: "펙덱 플라이", en: "Pec Deck Fly", tag: "워밍업", tip: "가볍게 가슴 풀기", sets: [[20, 25], [15, 30]] },
        { name: "스미스 인클라인 프레스", en: "Smith Incline Press", tag: "메인", tip: "쇄골 쪽으로 내리기, 파트너 보조", sets: [[15, 25], [12, 25], [10, 30], [8, 30]], form: "smith-incline-press" },
        { name: "인클라인 덤벨 프레스", en: "Incline DB Press", tip: "윗가슴으로 밀기", sets: [[12, 16], [12, 16], [12, 16]] },
        { name: "케이블 푸쉬다운", en: "Cable Pushdown", tip: "팔꿈치 옆구리 고정", sets: [[15, 25], [15, 25], [15, 25]] }
      ]},
      { day: "화", part: "등", en: "Back", cardio: true, items: [
        { name: "스트레이트 암 풀다운", en: "Straight Arm Pulldown", tag: "워밍업", tip: "팔 펴고 광배로 누르기", sets: [[20, 20], [15, 25]] },
        { name: "시티드 로우 머신", en: "Seated Row Machine", tag: "메인", tip: "가슴 패드 붙이고 당기기", sets: [[15, 40], [12, 40], [10, 45], [8, 50]] },
        { name: "원암 덤벨 로우", en: "One Arm DB Row", tip: "파트너가 한쪽씩 횟수 세기", sets: [[12, 22], [12, 22], [12, 22]] },
        { name: "랫풀다운", en: "Lat Pulldown", tip: "팔꿈치로 당기기", sets: [[12, 45], [12, 45], [12, 45]] },
        { name: "스미스 슈러그", en: "Smith Shrug", tip: "어깨를 귀 쪽으로, 1초 멈춤", sets: [[15, 40], [15, 40], [15, 40]] }
      ]},
      { day: "수", part: "어깨", en: "Shoulder", cardio: true, items: [
        { name: "리버스 펙덱", en: "Reverse Pec Deck", tag: "워밍업", tip: "날개뼈 모으며 옆으로", sets: [[20, 15], [15, 20]] },
        { name: "스미스 숄더 프레스", en: "Smith Shoulder Press", tag: "메인", tip: "앉아서, 봉은 턱 앞까지만", sets: [[15, 15], [12, 15], [10, 20], [8, 20]] },
        { name: "덤벨 숄더 프레스", en: "DB Shoulder Press", tip: "허리 등받이에 붙이기", sets: [[12, 14], [12, 14], [12, 14]] },
        { name: "사이드 레터럴 레이즈", en: "Lateral Raise", tip: "어깨 으쓱 금지, 팔꿈치로 들기", sets: [[15, 8], [15, 8], [15, 8]] }
      ]},
      { day: "목", part: "팔", en: "Arm", cardio: true, items: [
        { name: "케이블 푸쉬다운", en: "Cable Pushdown", tag: "워밍업", tip: "팔꿈치 옆구리 고정", sets: [[20, 15], [15, 20]] },
        { name: "덤벨 컬", en: "DB Curl", tag: "메인", tip: "팔꿈치 고정", sets: [[15, 10], [12, 10], [10, 12], [8, 12]] },
        { name: "인클라인 덤벨 컬", en: "Incline DB Curl", tip: "등 붙이고 팔 늘어뜨린 채 감기", sets: [[12, 8], [12, 8], [12, 8]] },
        { name: "해머 컬", en: "Hammer Curl", tip: "엄지가 위로", sets: [[12, 12], [12, 12], [12, 12]] },
        { name: "덤벨 오버헤드 익스텐션", en: "DB Overhead Ext", tip: "팔꿈치 귀 옆에 고정", sets: [[12, 16], [12, 16], [12, 16]] }
      ]},
      { day: "금", part: "가슴·등", en: "Chest · Back", cardio: true, items: [
        { name: "스미스 벤치프레스", en: "Smith Bench Press", tag: "메인", tip: "파트너가 봉 옆에서 보조", sets: [[15, 30], [12, 30], [10, 35], [8, 40]] },
        { name: "플랫 덤벨프레스", en: "Flat DB Press", tip: "덤벨은 가슴 옆까지", sets: [[12, 18], [12, 18], [12, 18]] },
        { name: "랫풀다운", en: "Lat Pulldown", tip: "팔꿈치로 당기기", sets: [[12, 45], [12, 45], [12, 45]] },
        { name: "원암 덤벨 로우", en: "One Arm DB Row", tip: "파트너가 한쪽씩 횟수 세기", sets: [[12, 22], [12, 22], [12, 22]] },
        { name: "랙 밴드 푸쉬업", en: "Rack Band Push-up", tip: "안전바에 건 밴드 끝을 양손에 쥐고, 몸통 일자로", sets: [[15, null], [15, null], [15, null]] }
      ]},
      { day: "토", part: "휴식", en: "Rest", rest: true, items: [] },
      { day: "일", part: "휴식", en: "Rest", rest: true, items: [] }
    ]
  },

  /* 식단표 (없으면 null) — 고은성님만 식단 진행. 2026-10-21 종이 다이어트 식단표(80kg대 남성)와 같은 내용 */
  diet: {
    member: "고은성",
    updated: "2026. 11. 5",
    title: "다이어트 식단",
    title_en: "Diet Meal Plan · 골라 먹는 식단 · 80kg대 남성",
    rules: ["아침·저녁 탄수화물 1종", "아침·저녁 단백질 1종", "점심은 일반식, 밥 2/3공기"],
    rules_note: "양만 지키면 메뉴는 끼니마다 바꿔도 OK",
    key_point: "점심은 편하게, 아침·저녁은 정확하게!",
    stats: [
      { label: "하루 칼로리", value: "2,050", unit: "kcal" },
      { label: "하루 단백질", value: "160", unit: "g" },
      { label: "하루 식사", value: "3끼", unit: "+ 1잔" },
      { label: "하루 물", value: "2~3", unit: "L" }
    ],
    formula: [
      { icon: "rice_white", title: "탄수화물", sub: "1종" },
      { icon: "chicken", title: "단백질", sub: "1종" },
      { icon: "veg", title: "채소", sub: "듬뿍" }
    ],
    formula_result: { title: "한 끼 완성", sub: "아침 · 저녁 2번" },
    carbs: [
      { icon: "sweet_potato", name: "고구마", amount: "240g" },
      { icon: "rice_white", name: "쌀밥", amount: "200g (1공기)" },
      { icon: "rice_brown", name: "현미밥", amount: "200g (1공기)" },
      { icon: "potato", name: "감자", amount: "400g" },
      { icon: "oatmeal", name: "오트밀", amount: "80g" }
    ],
    prots: [
      { icon: "chicken", name: "닭가슴살", amount: "200g" },
      { icon: "beef", name: "우둔·홍두깨살", amount: "200g" },
      { icon: "fish", name: "흰살생선", amount: "240g" },
      { icon: "egg", name: "계란", amount: "전란 2개 + 흰자 8개" },
      { icon: "pork", name: "돼지 안심", amount: "200g" },
      { icon: "tofu", name: "두부", amount: "1모 (500g)" },
      { icon: "shrimp", name: "새우", amount: "240g" }
    ],
    day_sub: "3끼 + 프로틴 1잔",
    day: [
      { icon: "ic_sun", name: "아침", line1: "탄수 1종 + 단백 1종", line2: "+ 채소 듬뿍" },
      { icon: "ic_tray", name: "점심", line1: "일반식", line2: "밥은 2/3공기만" },
      { icon: "ic_moon", name: "저녁", line1: "탄수 1종 + 단백 1종", line2: "자기 3시간 전까지" },
      { icon: "ic_shaker", name: "프로틴", line1: "물에 1스쿱", line2: "운동 끝나고 바로 마셔요", line3: "쉬는 날엔 오후 간식 대신" }
    ],
    lunch_do: ["밥은 2/3공기만, 남겨도 괜찮아요", "제육·생선구이·불고기처럼 고기 반찬 메뉴", "채소 반찬부터 먼저 먹기", "국은 건더기 위주로 떠먹기"],
    lunch_dont: ["짜장·짬뽕·라면 같은 면 메뉴", "돈가스·튀김 정식", "공기밥 추가, 국에 밥 말기", "식후 믹스커피·단 음료"],
    extras: [
      { icon: "veg", name: "채소", tag: "매 끼 듬뿍", lines: ["양배추·브로콜리·상추 등", "김치도 OK (조금만)", "아침·저녁 한 접시씩"] },
      { icon: "ic_water", name: "음료", tag: "물 2~3L", lines: ["물·탄산수·블랙커피 OK", "주스·라떼·탄산음료 X"] },
      { icon: "salt", name: "염분 조절", tag: "조금은 OK", lines: ["소금·소스는 찍어 먹기", "김치·국물은 조금만"] }
    ],
    notes_title: "참고사항",
    notes_sub: "식단 양은 혼자 바꾸지 말고 트레이너와 함께 정해요",
    notes: [
      { icon: "ic_scale", title: "인바디 측정", chip: "한 달에 1번", desc: "매달 같은 시기, 아침 공복에 재요" },
      { icon: "talk", title: "트레이너와 상담", chip: "결과 같이 보기", desc: "체지방·근육량 변화를 함께 확인해요" },
      { icon: "clipboard", title: "식단 수정", chip: "새 식단표", desc: "결과에 맞춰 탄수·단백 양을 다시 정해요" }
    ],
    safety: "끼니를 굶지 마세요. 굶으면 저녁에 폭식해요. 어지럽거나 힘이 빠지면 바로 트레이너에게 알려 주세요"
  }
};
