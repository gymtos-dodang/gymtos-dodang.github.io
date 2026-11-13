/* 서경진 회원님 홈페이지 데이터 — 이 파일만 고치면 페이지 내용이 바뀜 */
window.MEMBER = {
  name: "서경진",
  sex: "F",                       // M = 네이비, F = 핑크
  skin: "sheep",                  // 2026-11-14 양 몽글이 테마(기능 그대로, 글꼴·색·양 그림만)
  since: "2026. 11",
  goal: "라인 & 힙업 · 주 6회",
  journey: { start: "2026-05-15" },   // PT 시작일 (장동욱: 5월쯤 → 15일로 둠)

  /* 공지 (최신이 위) */
  notices: [
    {"date":"2026. 11. 13","title":"힙쓰러스트 머신 자세 복습지가 올라왔어요","link":"forms","body":"오늘 수업 영상으로 만들었어요! 수요일 힙 A · 토요일 힙 B 루틴 종목에서도 바로 열려요."},
    { date: "2026. 11. 13", title: "핵프레스 자세 복습지가 올라왔어요", link: "forms",
      body: "오늘 찍은 내 영상으로 핵프레스 자세를 다시 보세요! 등은 패드에 붙이고 발바닥 전체로 밀기 — 운동 전에 KEY POINT 한 번 읽어봐요." },
    { date: "2026. 11. 3", title: "PT 노트가 열렸어요",
      body: "이번 주 루틴(v6)이 올라와 있어요. 루틴 탭에서 요일을 누르면 그날 운동과 무게가 나와요. 자세 복습지·식단도 앞으로 여기로 올려드릴게요!" }
  ],
  /* 다음 수업 (없으면 null) */
  next_class: null,

  /* 자세 복습지 (최신이 위) */
  forms: [
    {"id":"hip-thrust","dir":"media/form-hip-thrust/","date":"2026. 11. 13 (금)","exercise":"힙쓰러스트 머신","exercise_en":"Hip Thrust Machine","part":"엉덩이","targets":["대둔근 (엉덩이)","햄스트링 · 중둔근"],"benefit":"엉덩이를 위로 동그랗게 끌어올리고, 힙 라인을 탄탄하게 만들어줘요","key_point":"턱은 당기고, 맨 위에서 엉덩이를 꽉 짠다!","good_points":[{"title":"손을 머리 뒤에 두고 몸통을 고정했어요","desc":"팔로 버티지 않고 상체를 단단히 고정해서 엉덩이로만 밀어 올렸어요"},{"title":"끝까지 밀어 올렸어요","desc":"무릎·골반·어깨가 일자가 될 때까지 올려서 엉덩이가 꽉 수축됐어요"},{"title":"위에서 멈췄다 내려왔어요","desc":"맨 위에서 버티고 천천히 내려와서 엉덩이에 힘이 끝까지 남았어요"}],"primary_muscles":[{"name":"대둔근","where":"엉덩이 가운데 · 아래쪽"}],"secondary_muscles":"햄스트링 · 중둔근 · 허벅지 앞(버티기)","feel_good":"엉덩이 아래쪽이 꽉 조이고 뜨거워져요","feel_stop":"허리가 뻐근하거나, 허벅지 앞만 터질 것 같아요","steps":[{"title":"준비","desc":"등받이에 날개뼈를 걸치고 패드를 골반에 대요. 발은 어깨너비, 손은 머리 뒤에 가볍게 두고 턱을 당겨요","chip":"숨 들이마시기","media":"step1.jpg"},{"title":"올리기","desc":"턱을 당긴 채 발뒤꿈치로 밀어 골반을 올려요. 무릎·골반·어깨가 일자가 되면 엉덩이 꽉 1초!","chip":"1~2초 · 후~ 내쉬며","media":"step2.webp","loop":true},{"title":"내리기","desc":"엉덩이 힘을 풀지 말고 천천히 내려요. 바닥에 닿기 직전에 다시 올려요","chip":"3초 · 들이마시며","media":"step3.webp","loop":true}],"do":["턱 당기고 시선은 무릎 쪽","발뒤꿈치로 밀어 올리기","맨 위에서 엉덩이 꽉 1초"],"dont":["고개 젖히고 허리를 꺾어 올리기","무릎이 안쪽으로 모이기","내릴 때 털썩 내려놓기"]},
    {
      id: "hack-press",
      dir: "media/form-hack-press/",
      date: "2026. 11. 13 (금)",
      exercise: "핵프레스",
      exercise_en: "Hack Press",
      part: "하체",
      targets: ["대퇴사두근 (앞허벅지)", "대둔근 · 내전근 · 햄스트링"],
      benefit: "앉아서 등을 기댄 채 발판을 밀어서 허리 부담 없이 허벅지와 엉덩이를 같이 써요. 탄탄한 하체 라인과 힙업의 바탕을 만들어줘요",
      key_point: "등은 패드에 붙이고, 발바닥 전체로 밀어낸다!",
      good_points: [
        { title: "등을 패드에 붙이고 했어요", desc: "밀 때도 돌아올 때도 상체가 들리지 않아서 허리가 편안했어요" },
        { title: "손잡이를 잡고 몸을 고정했어요", desc: "양옆 손잡이를 잡아 엉덩이가 의자에서 미끄러지지 않았어요" },
        { title: "천천히 돌아왔어요", desc: "미는 것보다 돌아오는 걸 천천히 해서 허벅지에 힘이 계속 실렸어요" }
      ],
      primary_muscles: [{ name: "대퇴사두근", where: "허벅지 앞쪽" }],
      secondary_muscles: "대둔근 · 내전근 · 햄스트링",
      feel_good: "허벅지 앞과 엉덩이 아래쪽이 뻐근해요",
      feel_stop: "허리·꼬리뼈가 아프거나, 무릎이 찌릿해요",
      steps: [
        { title: "준비", desc: "등과 엉덩이를 패드에 꼭 붙이고 발은 골반 너비로 발판 가운데. 양옆 손잡이를 잡아요", chip: "숨 들이마시기", media: "step1.jpg" },
        { title: "돌아오기", desc: "무릎을 발끝 방향으로 굽히며 천천히. 엉덩이가 들리기 직전까지만 와요", chip: "2~3초 · 들이마시며", media: "step2.webp", loop: true },
        { title: "밀기", desc: "발바닥 전체로 발판을 밀어내요! 끝에서 무릎은 완전히 펴서 잠그지 않아요", chip: "1~2초 · 후~ 내쉬며", media: "step3.webp", loop: true }
      ],
      do: ["등·엉덩이는 패드에 붙이기", "무릎은 발끝 방향으로", "발바닥 전체로 밀기"],
      dont: ["엉덩이가 들릴 만큼 깊게 오기", "무릎이 안으로 모이기", "끝에서 무릎 쾅 잠그기"]
    }
  ],

  /* 주간 루틴 */
  routine: {
    version: "v6",
    updated: "2026. 10. 20",
    title: "주 6회 · 라인 & 힙업",
    plan: ["가슴·어깨·등·하체·힙 2번", "금요일은 유산소만 40분", "일요일은 푹 쉬고 잘 먹기"],
    key_point: "엉덩이는 일주일에 2번! 무게보다 자극 먼저, 천천히 올려가요",
    note: "세트 사이 1분~1분 30초 쉬기 · 덤벨 무게는 한 손 기준이에요",
    cardio: { minutes: 25, options: "경사 걷기 · 천국의 계단 · 사이클 중 택1" },
    days: [
      { day: "월", part: "하체", en: "Leg Day", cardio: true, items: [
        { name: "레그 익스텐션", en: "Leg Extension", tag: "워밍업", tip: "가볍게 무릎 풀기", sets: [[20, 15], [15, 20]] },
        { name: "레그프레스", en: "Leg Press", tag: "메인", tip: "무릎은 발끝 방향으로", sets: [[15, 50], [12, 55], [10, 55], [8, 60]] },
        { name: "고블릿 스쿼트", en: "Goblet Squat", tip: "가슴 세우고 깊이 앉기", sets: [[12, 10], [12, 10], [12, 10]] },
        { name: "라잉 레그컬", en: "Lying Leg Curl", tip: "엉덩이 들리지 않게", sets: [[12, 15], [12, 15], [12, 15]] },
        { name: "이너타이", en: "Inner Thigh", tip: "천천히 모으고 버티기", sets: [[15, 15], [15, 15], [15, 15]] }
      ]},
      { day: "화", part: "가슴·어깨", en: "Chest · Shoulder", cardio: true, items: [
        { name: "펙덱 플라이", en: "Pec Deck Fly", tag: "워밍업", tip: "가슴 모은다는 느낌", sets: [[20, 15], [15, 15]] },
        { name: "스미스 인클라인 프레스", en: "Smith Incline Press", tag: "메인", tip: "윗가슴으로 밀기", sets: [[15, 20], [12, 20], [10, 25], [8, 25]] },
        { name: "체스트 프레스 머신", en: "Chest Press", icon: "chest_press", tip: "가슴 펴고 밀기", sets: [[12, 25], [12, 25], [12, 25]] },
        { name: "숄더 프레스 머신", en: "Shoulder Press", tip: "허리 등받이에 붙이기", sets: [[12, 15], [12, 15], [12, 15]] },
        { name: "사이드 레터럴 레이즈", en: "Lateral Raise", tip: "어깨 으쓱 금지", sets: [[15, 4], [15, 4], [15, 4]] }
      ]},
      { day: "수", part: "힙 A", en: "Glute A", cardio: true, items: [
        { name: "플레이트 아웃타이", en: "Booty Builder", icon: "outer_thigh_plate", tag: "워밍업", tip: "엉덩이 옆으로 밀기", sets: [[20, 20], [15, 20]] },
        { name: "힙쓰러스트 머신", en: "Hip Thrust", icon: "hip_thrust", tag: "메인", tip: "맨 위에서 엉덩이 꽉", sets: [[15, 35], [12, 35], [10, 40], [8, 40]] },
        { name: "레그프레스 (발 높게)", en: "Leg Press · High", tip: "뒤꿈치로 밀기", sets: [[15, 45], [15, 45], [15, 45]] },
        { name: "고블릿 스쿼트", en: "Goblet Squat", tip: "가슴 세우고 깊이 앉기", sets: [[12, 10], [12, 10], [12, 10]] },
        { name: "라잉 레그컬", en: "Lying Leg Curl", tip: "엉덩이 들리지 않게", sets: [[12, 15], [12, 15], [12, 15]] }
      ]},
      { day: "목", part: "등", en: "Back", cardio: true, items: [
        { name: "스트레이트 암 풀다운", en: "Straight Arm Pulldown", tag: "워밍업", tip: "팔 편 채 허벅지까지", sets: [[20, 10], [15, 10]] },
        { name: "랫풀다운", en: "Lat Pulldown", tag: "메인", tip: "팔꿈치로 당기기", sets: [[15, 25], [12, 25], [10, 30], [8, 30]] },
        { name: "뉴텍 시티드 로우 머신", en: "Seated Row Machine", tip: "가슴 패드 붙이고 당기기", sets: [[12, 25], [12, 25], [12, 25]] },
        { name: "언더그립 랫풀다운", en: "Underhand Pulldown", tip: "손바닥 위로, 팔꿈치 옆구리로", sets: [[12, 25], [12, 25], [12, 25]] },
        { name: "리버스 펙덱", en: "Reverse Pec Deck", tip: "날개뼈 모으며 옆으로", sets: [[15, 15], [15, 15], [15, 15]] }
      ]},
      { day: "금", part: "유산소", en: "Cardio", cardio_only: 40, note: "웨이트 없이 유산소만 40분! 숨이 살짝 찰 정도로", items: [] },
      { day: "토", part: "힙 B", en: "Glute B", cardio: true, items: [
        { name: "아웃타이 머신", en: "Outer Thigh", icon: "outer_thigh_pin", tag: "워밍업", tip: "엉덩이 옆으로 밀기", sets: [[20, 20], [15, 20]] },
        { name: "레그프레스 (발 높게)", en: "Leg Press · High", tag: "메인", tip: "뒤꿈치로 밀기", sets: [[15, 50], [12, 55], [10, 55], [8, 60]] },
        { name: "힙쓰러스트 머신", en: "Hip Thrust", icon: "hip_thrust", tip: "맨 위에서 엉덩이 꽉", sets: [[12, 35], [12, 35], [12, 35]] },
        { name: "이너타이", en: "Inner Thigh", tip: "천천히 모으고 버티기", sets: [[15, 15], [15, 15], [15, 15]] },
        { name: "라잉 레그컬", en: "Lying Leg Curl", tip: "엉덩이 들리지 않게", sets: [[12, 15], [12, 15], [12, 15]] }
      ]},
      { day: "일", part: "휴식", en: "Rest", rest: true, items: [] }
    ]
  },

  /* 식단표 (없으면 null) */
  diet: null
};
