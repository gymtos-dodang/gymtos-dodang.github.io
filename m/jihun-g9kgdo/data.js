/* 최지훈 회원님 홈페이지 데이터 — 이 파일만 고치면 페이지 내용이 바뀜 */
window.MEMBER = {
  name: "최지훈",
  sex: "M",                       // M = 네이비, F = 핑크
  since: "2026. 11",
  goal: "근비대 · 주 6회",
  journey: { start: "2026-10-15" },   // PT 시작일 (장동욱: 10월쯤 → 15일로 둠)

  /* 공지 (최신이 위) */
  notices: [
    { date: "2026. 11. 11", title: "스미스 인클라인 프레스 자세 복습지가 올라왔어요",
      body: "월요일 수업 영상으로 만들었어요. 바가 레일을 따라 움직여서 윗가슴에만 집중하기 좋은 종목이에요. 하기 전에 한 번 보고 들어가세요!", link: "form-smith-incline-press" },
    { date: "2026. 11. 7", title: "팔 운동 자세 복습지 4개가 올라왔어요",
      body: "덤벨 컬 · 해머 컬 · 케이블 푸쉬다운 · 인클라인 벤치 이두컬. 오늘 수업 영상으로 만들었어요. 팔 하는 날 들어가기 전에 꼭 한 번 보세요!", link: "forms" },
    { date: "2026. 11. 5", title: "시티드 페이스풀 자세 복습지가 올라왔어요",
      body: "루틴에도 넣었어요(루틴 v4). 화요일 등·목요일 어깨·팔 하는 날 맨 앞 워밍업으로 해요. 운동 전에 한 번 보고 들어가세요!", link: "form-seated-face-pull" },
    { date: "2026. 11. 3", title: "인클라인 덤벨 프레스 자세 복습지가 올라왔어요",
      body: "월요일·금요일에 하는 인클라인 덤벨 프레스예요. 운동 전에 한 번 보고 들어가세요!", link: "form-incline-db-press" },
    { date: "2026. 11. 3", title: "루틴이 v3로 바뀌었어요",
      body: "금요일은 인클라인 덤벨 프레스 메인부터 시작해요(워밍업 줄 빠짐). 덤벨 컬·해머 컬은 6kg으로 낮췄어요." },
    { date: "2026. 11. 3", title: "플랫 덤벨프레스 자세 복습지가 올라왔어요",
      body: "어제 수업 영상으로 만든 복습지예요. 운동 전에 한 번씩 보고 들어가세요!", link: "form-flat-db-press" }
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
      benefit: "바가 레일을 따라 움직여서, 균형 잡을 걱정 없이 윗가슴에만 힘을 몰아줄 수 있어요",
      key_point: "바는 쇄골 아래 윗가슴으로, 날개뼈 모은 채 밀어 올린다!",
      good_points: [
        { title: "바를 윗가슴까지 깊게 내렸어요", desc: "쇄골 아래까지 내려서 윗가슴이 충분히 늘어났어요" },
        { title: "등과 엉덩이를 벤치에 붙였어요", desc: "밀 때 몸이 들리지 않아 각도가 끝까지 유지됐어요" },
        { title: "끝까지 같은 길로 밀었어요", desc: "올리고 내리는 속도가 일정해서 반동 없이 가슴으로 밀었어요" }
      ],
      primary_muscles: [{ name: "대흉근 상부", where: "쇄골 아래 윗가슴" }],
      secondary_muscles: "전면 삼각근 · 삼두근",
      feel_good: "쇄골 아래 윗가슴이 뻐근해요",
      feel_stop: "어깨 앞만 타거나, 손목·어깨가 찌릿해요",
      steps: [
        { title: "준비", desc: "벤치는 30~45도, 바가 윗가슴 위에 오게 자리 잡기. 손은 어깨보다 조금 넓게 잡고 날개뼈를 모은 채 바를 풀어요", chip: "숨 들이마시기", media: "step1.jpg" },
        { title: "내리기", desc: "팔꿈치를 몸통에서 45도 정도 벌리며 바를 쇄골 아래 윗가슴까지 천천히", chip: "3초 · 들이마시며", media: "step2.webp", loop: true },
        { title: "밀어 올리기", desc: "윗가슴을 모은다는 느낌으로 위로! 맨 위에서 팔꿈치는 살짝 굽힌 채 멈춰요", chip: "2초 · 후~ 내쉬며", media: "step3.webp", loop: true }
      ],
      do: ["날개뼈를 모으고 가슴을 위로 세우기", "손목은 팔꿈치 바로 위에 세우기", "바는 쇄골 아래 윗가슴으로 내리기"],
      dont: ["엉덩이를 들어 각도 없애기", "바를 가슴에 튕겨서 올리기", "팔꿈치를 옆으로 90도 활짝 벌리기"]
    },
    {
      id: "db-curl",
      dir: "media/form-db-curl/",
      date: "2026. 11. 7 (토)",
      exercise: "덤벨 컬",
      exercise_en: "DB Curl",
      part: "팔",
      targets: ["이두근", "상완근 · 전완근"],
      benefit: "팔 앞쪽 알통을 키워 팔 라인을 또렷하게 만들어줘요",
      key_point: "팔꿈치는 옆구리에 고정, 이두로만 말아 올린다!",
      good_points: [
        { title: "상체를 곧게 세웠어요", desc: "몸을 흔들지 않아서 반동 없이 팔로만 들어 올렸어요" },
        { title: "끝까지 펴고 시작했어요", desc: "내릴 때 팔을 쭉 펴서 이두가 길게 늘어났다가 일했어요" },
        { title: "양손 높이가 같았어요", desc: "두 팔이 같은 속도로 올라가 좌우가 고르게 일했어요" }
      ],
      primary_muscles: [{ name: "이두근", where: "팔 앞쪽 알통" }],
      secondary_muscles: "상완근 · 전완근",
      feel_good: "팔 앞쪽 알통이 빵빵하게 차올라요",
      feel_stop: "손목·팔꿈치 안쪽이 찌릿하거나, 어깨 앞이 먼저 아파요",
      steps: [
        { title: "준비", desc: "발은 골반 너비, 손바닥이 앞을 보게 덤벨을 잡고 팔꿈치를 옆구리에 붙여요", chip: "숨 들이마시기", media: "step1.jpg" },
        { title: "올리기", desc: "팔꿈치는 그대로 두고 덤벨을 어깨 쪽으로 말아 올려요. 위에서 1초 꽉!", chip: "2초 · 후~ 내쉬며", media: "step2.webp", loop: true },
        { title: "내리기", desc: "버티면서 천천히, 팔이 끝까지 펴질 때까지 내려요", chip: "3초 · 들이마시며", media: "step3.webp", loop: true }
      ],
      do: ["팔꿈치는 옆구리에 고정", "올린 끝에서 1초 쥐어짜기", "내릴 때 팔 끝까지 펴기"],
      dont: ["허리를 뒤로 젖혀 반동 쓰기", "팔꿈치를 앞으로 들어 올리기", "손목을 안쪽으로 꺾기"]
    },
    {
      id: "hammer-curl",
      dir: "media/form-hammer-curl/",
      date: "2026. 11. 7 (토)",
      exercise: "해머 컬",
      exercise_en: "Hammer Curl",
      part: "팔",
      targets: ["상완요골근 · 상완근", "이두근"],
      benefit: "팔뚝 바깥쪽과 팔 두께를 채워 팔이 굵어 보이게 해줘요",
      key_point: "엄지가 위로! 망치 들듯이 들어 올린다",
      good_points: [
        { title: "엄지가 위를 보게 잡았어요", desc: "손목을 돌리지 않아서 팔뚝 바깥까지 자극이 갔어요" },
        { title: "팔꿈치가 흔들리지 않았어요", desc: "팔꿈치가 옆구리에 붙어 있어서 팔만 움직였어요" },
        { title: "끝까지 내렸어요", desc: "매번 팔을 다 펴고 다시 들어 올렸어요" }
      ],
      primary_muscles: [{ name: "상완요골근", where: "팔뚝 위쪽 바깥" }, { name: "상완근", where: "이두근 아래 깊은 근육" }],
      secondary_muscles: "이두근 · 전완근",
      feel_good: "팔뚝 위쪽 바깥과 팔꿈치 위가 뻐근해요",
      feel_stop: "손목이 꺾여서 아프거나, 팔꿈치 바깥이 찌릿해요",
      steps: [
        { title: "준비", desc: "손바닥이 몸쪽(엄지가 위)을 보게 덤벨을 잡고 팔꿈치를 옆구리에 붙여요", chip: "숨 들이마시기", media: "step1.jpg" },
        { title: "올리기", desc: "손목 각도 그대로, 망치 들듯이 어깨 앞까지 들어 올려요", chip: "2초 · 후~ 내쉬며", media: "step2.webp", loop: true },
        { title: "내리기", desc: "천천히 버티면서 팔을 끝까지 펴요", chip: "3초 · 들이마시며", media: "step3.webp", loop: true }
      ],
      do: ["엄지는 끝까지 위로", "팔꿈치는 옆구리에 붙이기", "손목은 일자로 고정"],
      dont: ["몸통을 흔들어 반동 쓰기", "덤벨을 어깨 너머까지 올리기", "손목을 돌려 손바닥이 위로"]
    },
    {
      id: "cable-pushdown",
      dir: "media/form-cable-pushdown/",
      date: "2026. 11. 7 (토)",
      exercise: "케이블 푸쉬다운",
      exercise_en: "Cable Pushdown",
      part: "팔",
      targets: ["삼두근 (팔 뒤쪽)", "전완근 · 코어"],
      benefit: "팔 뒤쪽을 탄탄하게 채워 팔이 굵고 단단해 보이게 해줘요",
      key_point: "팔꿈치는 옆구리에 못 박고, 아래로 쭉 편다!",
      good_points: [
        { title: "팔꿈치를 옆구리에 붙였어요", desc: "팔꿈치가 앞뒤로 움직이지 않아 삼두에 힘이 모였어요" },
        { title: "끝까지 쭉 폈어요", desc: "아래에서 팔을 다 펴서 삼두가 꽉 조여졌어요" },
        { title: "천천히 돌아갔어요", desc: "손이 가슴 아래까지만 오도록 버티며 돌아갔어요" }
      ],
      primary_muscles: [{ name: "삼두근", where: "팔 뒤쪽 전체" }],
      secondary_muscles: "전완근 · 코어(몸 고정)",
      feel_good: "팔 뒤쪽이 단단하게 조여져요",
      feel_stop: "팔꿈치 안이 찌릿하거나, 어깨·가슴이 먼저 힘들어요",
      steps: [
        { title: "준비", desc: "케이블 앞에 서서 살짝 앞으로 기울이고, 팔꿈치를 옆구리에 붙여 손을 가슴 아래에 둬요", chip: "숨 들이마시기", media: "step1.jpg" },
        { title: "밀어 내리기", desc: "팔꿈치는 그대로, 손만 아래로 쭉 밀어 팔을 다 펴요. 아래서 1초!", chip: "2초 · 후~ 내쉬며", media: "step2.webp", loop: true },
        { title: "돌아가기", desc: "버티면서 손을 가슴 아래까지만 천천히 올려요", chip: "3초 · 들이마시며", media: "step3.webp", loop: true }
      ],
      do: ["팔꿈치는 옆구리에 고정", "아래에서 팔 끝까지 펴기", "어깨는 내리고 가슴은 펴기"],
      dont: ["몸을 숙여 체중으로 누르기", "팔꿈치가 앞으로 따라 올라가기", "손이 얼굴까지 올라오기"]
    },
    {
      id: "incline-bench-curl",
      dir: "media/form-incline-bench-curl/",
      date: "2026. 11. 7 (토)",
      exercise: "인클라인 벤치 이두컬",
      exercise_en: "Incline Bench Curl",
      part: "팔",
      targets: ["이두근 (장두)", "상완근"],
      benefit: "이두를 길게 늘였다가 수축해서 알통 높이를 키워줘요",
      key_point: "팔은 몸 뒤로 늘어뜨린 채, 팔꿈치는 움직이지 않는다!",
      good_points: [
        { title: "등을 벤치에 붙였어요", desc: "상체가 들리지 않아서 이두가 길게 늘어난 상태로 시작했어요" },
        { title: "팔을 끝까지 늘어뜨렸어요", desc: "아래에서 팔을 다 펴서 알통 위쪽까지 자극이 들어갔어요" },
        { title: "천천히 내렸어요", desc: "떨어뜨리지 않고 버티면서 내려왔어요" }
      ],
      primary_muscles: [{ name: "이두근 장두", where: "알통 바깥쪽 위" }],
      secondary_muscles: "상완근 · 전완근",
      feel_good: "알통 위쪽이 길게 당기다가 꽉 조여져요",
      feel_stop: "어깨 앞이 찌릿하거나, 팔꿈치 안쪽이 아파요",
      steps: [
        { title: "준비", desc: "등받이를 45~60도로 세워 등과 머리를 붙이고, 팔을 몸 옆·뒤로 쭉 늘어뜨려요", chip: "숨 들이마시기", media: "step1.jpg" },
        { title: "올리기", desc: "팔꿈치는 그대로 두고 덤벨을 어깨 쪽으로 말아 올려요", chip: "2초 · 후~ 내쉬며", media: "step2.webp", loop: true },
        { title: "내리기", desc: "이두가 늘어나는 걸 느끼며 천천히 끝까지 내려요", chip: "3초 · 들이마시며", media: "step3.webp", loop: true }
      ],
      do: ["등과 머리는 벤치에 붙이기", "팔꿈치는 몸 옆에서 고정", "아래에서 팔 끝까지 펴기"],
      dont: ["상체를 들어 반동 쓰기", "팔꿈치를 앞으로 들어 올리기", "무거운 무게로 어깨까지 쓰기"]
    },
    {
      id: "seated-face-pull",
      dir: "media/form-seated-face-pull/",
      date: "2026. 10. 29 (목)",
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
      id: "incline-db-press",
      dir: "media/form-incline-db-press/",
      date: "2026. 11. 2 (월)",
      exercise: "인클라인 덤벨 프레스",
      exercise_en: "Incline DB Press",
      part: "가슴",
      targets: ["윗가슴 (대흉근 상부)", "전면 삼각근 · 삼두근"],
      benefit: "윗가슴을 채워서 가슴 라인이 꽉 차 보이게 해줘요",
      key_point: "덤벨은 쇄골 위로, 윗가슴으로 밀어 올린다!",
      good_points: [
        { title: "발을 바닥에 단단히 고정했어요", desc: "몸이 벤치에서 밀리지 않아 끝까지 안정적이었어요" },
        { title: "윗가슴 옆까지 깊게 내렸어요", desc: "가슴이 충분히 늘어나서 자극이 제대로 들어갔어요" },
        { title: "양손 높이를 맞췄어요", desc: "좌우 덤벨이 같은 높이로 올라가 양쪽 가슴이 고르게 일했어요" }
      ],
      primary_muscles: [{ name: "대흉근 상부", where: "쇄골 아래 윗가슴" }],
      secondary_muscles: "전면 삼각근 · 삼두근",
      feel_good: "쇄골 아래 윗가슴이 뻐근해요",
      feel_stop: "어깨 앞만 타거나, 손목이 꺾여서 아파요",
      steps: [
        { title: "준비", desc: "등받이는 30도 정도. 등과 엉덩이를 붙이고 날개뼈를 모아 덤벨을 쇄골 위로", chip: "숨 들이마시기", media: "step1.jpg" },
        { title: "내리기", desc: "팔꿈치를 몸통에서 45도 정도 벌리며 덤벨을 윗가슴 옆까지 천천히", chip: "3초 · 들이마시며", media: "step2.webp", loop: true },
        { title: "밀어 올리기", desc: "윗가슴을 모은다는 느낌으로 쇄골 위로! 맨 위에서 팔꿈치는 살짝 굽힌 채", chip: "2초 · 후~ 내쉬며", media: "step3.webp", loop: true }
      ],
      do: ["날개뼈를 모으고 가슴을 위로 세우기", "덤벨은 쇄골 위 방향으로 밀기", "손목은 팔꿈치 바로 위에 세우기"],
      dont: ["등받이를 너무 세워 어깨로만 밀기", "엉덩이를 들어 각도 없애기", "덤벨을 배 쪽으로 내리기"]
    },
    {
      id: "flat-db-press",
      dir: "media/form-flat-db-press/",
      date: "2026. 11. 2 (월)",
      exercise: "플랫 덤벨프레스",
      exercise_en: "Flat DB Press",
      part: "가슴",
      targets: ["대흉근 (가슴)", "전면 삼각근 · 삼두근"],
      benefit: "가슴 두께와 탄탄한 앞판 라인을 만들어줘요",
      key_point: "날개뼈를 모은 채, 가슴으로 밀어 올린다!",
      good_points: [
        { title: "발을 바닥에 단단히 고정했어요", desc: "하체가 받쳐줘서 끝까지 몸이 흔들리지 않았어요" },
        { title: "충분히 깊게 내렸어요", desc: "덤벨이 가슴 옆까지 내려와서 가슴이 쭉 늘어났어요" },
        { title: "리듬이 일정했어요", desc: "반동 없이 매 회 같은 속도로 올리고 내렸어요" }
      ],
      primary_muscles: [{ name: "대흉근", where: "가슴 앞 전체" }],
      secondary_muscles: "전면 삼각근 · 삼두근",
      feel_good: "가슴 가운데와 겨드랑이 앞쪽이 뻐근해요",
      feel_stop: "어깨 앞이 찌릿하거나, 가슴은 그대로고 팔만 아파요",
      steps: [
        { title: "준비", desc: "벤치에 누워 발은 바닥에 단단히. 날개뼈를 모아 가슴을 열고 덤벨은 가슴 위로", chip: "숨 들이마시기", media: "step1.jpg" },
        { title: "내리기", desc: "팔꿈치를 몸통에서 45도 정도 벌리며 덤벨을 가슴 옆까지 천천히", chip: "3초 · 들이마시며", media: "step2.webp", loop: true },
        { title: "밀어 올리기", desc: "가슴을 모은다는 느낌으로 위로! 맨 위에서 팔꿈치는 살짝 굽힌 채 멈춰요", chip: "2초 · 후~ 내쉬며", media: "step3.webp", loop: true }
      ],
      do: ["날개뼈를 모으고 가슴을 연 채로", "손목은 팔꿈치 바로 위에 세우기", "발은 바닥에 단단히, 엉덩이는 벤치에"],
      dont: ["팔꿈치를 옆으로 90도 활짝 벌리기", "올릴 때 엉덩이를 벤치에서 들기", "맨 위에서 덤벨끼리 쾅 부딪치기"]
    }
  ],

  /* 주간 루틴 */
  routine: {
    version: "v4",
    updated: "2026. 11. 5",
    title: "주 6회 · 근비대",
    plan: ["가슴·등·하체 주 2번씩", "같은 종목, 무게만 조금씩 ↑", "일요일은 푹 쉬고 잘 먹기"],
    key_point: "지금 방향 맞아요! 루틴대로 하고 무게만 조금씩 올리기",
    note: "덤벨 무게는 한 손 기준이에요",
    cardio: { minutes: 15, options: "경사 걷기 · 천국의 계단 · 사이클 중 택1" },
    days: [
      { day: "월", part: "가슴", en: "Chest", cardio: true, items: [
        { name: "플랫 덤벨프레스", en: "Flat DB Press", tag: "메인", tip: "덤벨은 가슴 옆까지", sets: [[15, 8], [12, 8], [10, 10], [8, 10]], form: "flat-db-press" },
        { name: "인클라인 덤벨 프레스", en: "Incline DB Press", tip: "윗가슴으로 밀기", sets: [[12, 8], [12, 8], [12, 8]], form: "incline-db-press" },
        { name: "케이블 푸쉬다운", en: "Cable Pushdown", tip: "팔꿈치 옆구리 고정", sets: [[15, 15], [15, 15], [15, 15]], form: "cable-pushdown" }
      ]},
      { day: "화", part: "등", en: "Back", cardio: true, items: [
        { name: "시티드 페이스풀", en: "Seated Face Pull", tag: "워밍업", tip: "팔꿈치 높게 얼굴 쪽으로", sets: [[20, 10], [15, 15]], form: "seated-face-pull" },
        { name: "랫풀다운", en: "Lat Pulldown", tag: "메인", tip: "팔꿈치로 당기기", sets: [[15, 25], [12, 25], [10, 30], [8, 30]] },
        { name: "뉴텍 시티드 로우 머신", en: "Seated Row Machine", tip: "가슴 패드 붙이고 당기기", sets: [[12, 30], [12, 30], [12, 30]] },
        { name: "리버스 펙덱", en: "Reverse Pec Deck", tip: "날개뼈 모으며 옆으로", sets: [[15, 15], [15, 15], [15, 15]] }
      ]},
      { day: "수", part: "하체", en: "Legs A", cardio: false, items: [
        { name: "레그 익스텐션", en: "Leg Extension", tag: "워밍업", tip: "가볍게 무릎 풀기", sets: [[20, 15], [15, 20]] },
        { name: "이너타이", en: "Inner Thigh", tag: "선행", tip: "세트마다 무게 ↑", sets: [[20, 20], [15, 25], [12, 30]] },
        { name: "아웃타이 머신", en: "Outer Thigh", tag: "선행", tip: "세트마다 무게 ↑", sets: [[20, 20], [15, 25], [12, 30]] },
        { name: "고블릿 스쿼트", en: "Goblet Squat", tag: "선행", tip: "가슴 세우고 깊이 앉기", sets: [[20, 6], [15, 8], [12, 10]] },
        { name: "핵스쿼트", en: "Hack Squat", tag: "메인", tip: "등 패드에 붙이고", sets: [[15, 15], [12, 15], [10, 20], [8, 20]] }
      ]},
      { day: "목", part: "어깨·팔", en: "Shoulder · Arm", cardio: true, items: [
        { name: "시티드 페이스풀", en: "Seated Face Pull", tag: "워밍업", tip: "팔꿈치 높게 얼굴 쪽으로", sets: [[20, 10], [15, 15]], form: "seated-face-pull" },
        { name: "사이드 레터럴 레이즈", en: "Lateral Raise", tag: "워밍업", tip: "어깨 으쓱 금지", sets: [[20, 4], [15, 4]] },
        { name: "숄더 프레스 머신", en: "Shoulder Press", tag: "메인", tip: "허리 등받이에 붙이기", sets: [[15, 20], [12, 20], [10, 25], [8, 25]] },
        { name: "사이드 레터럴 레이즈 머신", en: "Standing Machine", tip: "팔꿈치로 들어 올리기", sets: [[15, 10], [15, 10], [15, 10]] },
        { name: "덤벨 컬", en: "DB Curl", tip: "팔꿈치 고정", sets: [[12, 6], [12, 6], [12, 6]], form: "db-curl" },
        { name: "해머 컬", en: "Hammer Curl", tip: "엄지가 위로", sets: [[12, 6], [12, 6], [12, 6]], form: "hammer-curl" }
      ]},
      { day: "금", part: "가슴·등", en: "Chest · Back", cardio: true, items: [
        { name: "인클라인 덤벨 프레스", en: "Incline DB Press", tag: "메인", tip: "윗가슴으로 밀기", sets: [[15, 6], [12, 6], [10, 8], [8, 8]], form: "incline-db-press" },
        { name: "플랫 덤벨프레스", en: "Flat DB Press", tip: "덤벨은 가슴 옆까지", sets: [[12, 8], [12, 8], [12, 8]], form: "flat-db-press" },
        { name: "랫풀다운", en: "Lat Pulldown", tip: "팔꿈치로 당기기", sets: [[12, 30], [12, 30], [12, 30]] },
        { name: "뉴텍 시티드 로우 머신", en: "Seated Row Machine", tip: "가슴 패드 붙이고 당기기", sets: [[12, 30], [12, 30], [12, 30]] }
      ]},
      { day: "토", part: "하체 B", en: "Legs B", cardio: false, items: [
        { name: "레그 익스텐션", en: "Leg Extension", tag: "워밍업", tip: "가볍게 무릎 풀기", sets: [[20, 15], [15, 20]] },
        { name: "이너타이", en: "Inner Thigh", tag: "선행", tip: "세트마다 무게 ↑", sets: [[20, 20], [15, 25], [12, 30]] },
        { name: "아웃타이 머신", en: "Outer Thigh", tag: "선행", tip: "세트마다 무게 ↑", sets: [[20, 20], [15, 25], [12, 30]] },
        { name: "고블릿 스쿼트", en: "Goblet Squat", tag: "선행", tip: "가슴 세우고 깊이 앉기", sets: [[20, 6], [15, 8], [12, 10]] },
        { name: "핵스쿼트", en: "Hack Squat", tag: "메인", tip: "등 패드에 붙이고", sets: [[15, 15], [12, 15], [10, 20], [8, 20]] },
        { name: "레그프레스 (발 높게)", en: "Leg Press · High", tip: "뒤꿈치로 밀기", sets: [[12, 40], [12, 40], [12, 40]] }
      ]},
      { day: "일", part: "휴식", en: "Rest", rest: true, items: [] }
    ]
  },

  /* 식단표 (없으면 null) */
  diet: null
};
