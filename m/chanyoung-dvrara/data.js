/* 박찬영 회원님 홈페이지 데이터 — 이 파일만 고치면 페이지 내용이 바뀜 */
window.MEMBER = {
  name: "박찬영",
  sex: "M",                       // M = 네이비, F = 핑크
  since: "2026. 11",
  goal: "근비대 · 주 5회 + 주말 로테이션",
  journey: { start: "2026-10-15" },   // PT 시작일 (10월 → 15일로 둠)

  /* 공지 (최신이 위) */
  notices: [
    {"date": "2026. 11. 13", "title": "자세 복습지 3개가 올라왔어요", "link": "forms", "body": "덤벨 숄더 프레스 · 시티드 레터럴 레이즈 · 시티드 페이스풀! 어제 어깨 수업 영상으로 만들었어요. 내 영상으로 자세 다시 보고, 운동 전에 KEY POINT 한 번씩 읽어봐요."},
    { date: "2026. 11. 6", title: "PT 노트가 열렸어요", link: "routine",
      body: "이번 주 루틴이 올라와 있어요. 루틴 탭에서 요일을 누르면 그날 운동과 무게가 나와요. 토요일은 이번 주에 아쉬웠던 부위 하나를 골라서 하는 날! 자세 복습지·식단도 앞으로 여기로 올려드릴게요." }
  ],
  /* 다음 수업 (없으면 null) */
  next_class: null,

  /* 자세 복습지 (최신이 위) */
  forms: [
    {"id": "db-shoulder-press", "dir": "media/form-db-shoulder-press/", "date": "2026. 11. 12 (목)", "exercise": "덤벨 숄더 프레스", "exercise_en": "DB Shoulder Press", "part": "어깨", "targets": ["삼각근 (앞·옆 어깨)", "삼두근 · 상부 승모근"], "benefit": "어깨 전체를 크고 둥글게 키워줘요. 근비대 때 상체 볼륨을 채우는 대표 운동이에요", "key_point": "덤벨은 귀 옆까지 내리고, 머리 위로 곧게 밀어 올린다!", "good_points": [{"title": "귀 높이까지 충분히 내렸어요", "desc": "팔꿈치가 90도 정도 될 때까지 내려서 어깨가 넓은 범위로 일했어요"}, {"title": "머리 위로 끝까지 밀었어요", "desc": "위에서 덤벨이 살짝 모일 때까지 밀어 올려 어깨를 끝까지 썼어요"}, {"title": "등받이에 기대 안정적이었어요", "desc": "허리를 등받이에 붙인 채 상체가 흔들리지 않고 반복했어요"}], "primary_muscles": [{"name": "삼각근 전면·측면", "where": "어깨 앞과 옆, 동그란 부분"}], "secondary_muscles": "삼두근 · 상부 승모근 · 윗가슴", "feel_good": "어깨 앞·옆이 터질 듯 뻐근해요", "feel_stop": "허리가 찌릿하거나, 목·승모근만 뻐근해요", "steps": [{"title": "준비", "desc": "등받이를 세우고 앉아 허리를 붙여요. 덤벨을 귀 옆에 두고 팔꿈치는 손목 바로 아래", "chip": "숨 들이마시기", "media": "step1.jpg"}, {"title": "밀어 올리기", "desc": "어깨로 밀어 머리 위로! 위에서 덤벨이 살짝 모이고 팔꿈치는 살짝 굽힌 채", "chip": "1~2초 · 후~ 내쉬며", "media": "step2.webp", "loop": true}, {"title": "내리기", "desc": "버티면서 귀 옆까지 천천히. 어깨가 쭉 늘어나는 걸 느껴요", "chip": "2~3초 · 들이마시며", "media": "step3.webp", "loop": true}], "do": ["허리는 등받이에 붙이기", "손목은 팔꿈치 바로 위에", "덤벨은 귀 옆까지 내리기"], "dont": ["허리를 뒤로 젖혀서 밀기", "어깨를 귀 쪽으로 으쓱하기", "반만 내리고 빨리 올리기"]},
    {"id": "seated-lateral-raise", "dir": "media/form-seated-lateral-raise/", "date": "2026. 11. 12 (목)", "exercise": "시티드 레터럴 레이즈", "exercise_en": "Seated Lateral Raise", "part": "어깨", "also": ["사이드 레터럴 레이즈"], "targets": ["측면 삼각근 (옆 어깨)", "전면 삼각근 · 상부 승모근"], "benefit": "옆 어깨를 키워 어깨 폭을 넓혀줘요. 앉아서 하니까 반동을 막고 옆 어깨만 집중해서 쓸 수 있어요", "key_point": "손이 아니라 팔꿈치로 옆으로 밀어 올리고, 어깨 높이에서 멈춘다!", "good_points": [{"title": "앉아서 반동 없이 들었어요", "desc": "벤치에 앉아 몸통을 고정해서 몸을 흔들지 않고 어깨 힘으로만 들었어요"}, {"title": "어깨 높이까지 딱 올렸어요", "desc": "팔이 바닥과 나란해질 때까지 올리고 그 이상은 안 올려서 옆 어깨에 정확히 들어갔어요"}, {"title": "팔꿈치를 살짝 굽혀 고정했어요", "desc": "팔꿈치 각도가 매 회 같아서 팔이 아니라 어깨로 들었어요"}], "primary_muscles": [{"name": "측면 삼각근", "where": "어깨 바깥쪽, 옆에서 볼 때 동그란 부분"}], "secondary_muscles": "전면 삼각근 · 상부 승모근 · 극상근", "feel_good": "어깨 옆쪽이 화끈하게 타는 느낌이에요", "feel_stop": "목·승모근만 뻐근하거나, 어깨 안쪽이 찌릿해요", "steps": [{"title": "준비", "desc": "벤치 끝에 앉아 허리를 세우고 배에 힘. 덤벨은 몸 옆에 두고 팔꿈치는 살짝 굽혀요", "chip": "숨 들이마시기", "media": "step1.jpg"}, {"title": "들어 올리기", "desc": "팔꿈치로 옆으로 밀듯이 어깨 높이까지! 새끼손가락 쪽이 살짝 높게", "chip": "1~2초 · 후~ 내쉬며", "media": "step2.webp", "loop": true}, {"title": "내리기", "desc": "버티면서 몸 옆까지 천천히. 툭 떨어뜨리지 않아요", "chip": "2~3초 · 들이마시며", "media": "step3.webp", "loop": true}], "do": ["허리 세우고 상체 고정", "팔꿈치 살짝 굽힌 채 고정", "어깨 높이까지만, 내릴 땐 천천히"], "dont": ["어깨를 귀 쪽으로 으쓱하기", "상체를 흔들어 반동으로 올리기", "어깨보다 높이 올리기"]},
    {"id": "seated-face-pull", "dir": "media/form-seated-face-pull/", "date": "2026. 11. 12 (목)", "exercise": "시티드 페이스풀", "exercise_en": "Seated Face Pull", "part": "어깨 · 등", "targets": ["후면 삼각근", "중부 승모근 · 능형근"], "benefit": "뒷어깨와 날개뼈 사이를 채워 어깨가 앞뒤로 두꺼워 보여요. 말린 어깨도 펴줘요", "key_point": "팔꿈치를 높게, 로프를 얼굴 양옆으로 벌려 당긴다!", "good_points": [{"title": "상체를 세우고 버텼어요", "desc": "몸이 뒤로 젖혀지지 않아서 반동 없이 어깨로만 당겼어요"}, {"title": "팔꿈치를 높게 들었어요", "desc": "팔꿈치가 어깨 높이까지 올라가 어깨 뒤쪽에 자극이 갔어요"}, {"title": "로프를 양옆으로 벌렸어요", "desc": "당긴 끝에서 손이 얼굴 양옆으로 벌어져 날개뼈까지 꽉 모였어요"}], "primary_muscles": [{"name": "후면 삼각근", "where": "어깨 뒤쪽"}, {"name": "중부 승모근 · 능형근", "where": "날개뼈 사이"}], "secondary_muscles": "회전근개(극하근 · 소원근) · 하부 승모근", "feel_good": "어깨 뒤쪽과 날개뼈 사이가 뻐근해요", "feel_stop": "목·승모근이 뻐근하게 올라오거나, 팔만 아파요", "steps": [{"title": "준비", "desc": "의자에 앉아 가슴을 세우고, 로프를 손등이 위로 오게 잡아 팔을 앞으로 뻗어요", "chip": "숨 들이마시기", "media": "step1.jpg"}, {"title": "당기기", "desc": "팔꿈치를 어깨 높이로 들고, 로프를 얼굴 양옆으로 벌리며 당겨요. 날개뼈 모으고 1초!", "chip": "2초 · 후~ 내쉬며", "media": "step2.webp", "loop": true}, {"title": "돌아가기", "desc": "어깨가 앞으로 끌려가지 않게 버티면서 천천히 팔을 펴요", "chip": "3초 · 들이마시며", "media": "step3.webp", "loop": true}], "do": ["가슴 세우고 상체는 고정", "팔꿈치는 손보다 높게", "당긴 끝에서 날개뼈 모으고 1초 멈춤"], "dont": ["몸을 뒤로 젖혀 반동 쓰기", "어깨를 귀 쪽으로 으쓱 올리기", "로프를 턱·목 아래로 당기기"]},],

  /* 주간 루틴 (루틴일지 v2.7 기준 · 벤치 1RM 75 · 랫풀다운 65kg 10개 기준) */
  routine: {
    version: "v1",
    updated: "2026. 11. 6",
    title: "주 5회 · 근비대",
    plan: ["가슴 · 하체 · 등 · 어깨 · 가슴팔 5분할", "토요일은 아쉬웠던 부위 하나 골라서", "일요일은 푹 쉬고 잘 먹기"],
    key_point: "마지막 1~2개가 겨우 될 무게로! 자세가 무너지면 STOP",
    note: "세트 사이 1분 30초~2분 쉬기 · 덤벨 무게는 한 손 기준 · 레그프레스·스미스는 원판 양쪽 합계예요",
    cardio: { minutes: 15, options: "경사 걷기 · 천국의 계단 · 사이클 중 택1" },
    days: [
      { day: "월", part: "가슴", en: "Chest", cardio: true, items: [
        { name: "펙덱 플라이", en: "Pec Deck Fly", tag: "워밍업", tip: "가볍게 가슴 풀기", sets: [[20, 25], [15, 30]] },
        { name: "벤치프레스", en: "Bench Press", tag: "메인", tip: "바는 가슴 중앙까지, 날개뼈 모으고", sets: [[15, 50], [12, 52.5], [10, 55], [8, 60]] },
        { name: "인클라인 덤벨 프레스", en: "Incline DB Press", tip: "윗가슴으로 밀기", sets: [[12, 20], [12, 20], [12, 20]] },
        { name: "체스트 프레스", en: "Chest Press", tip: "가슴 펴고 밀기", sets: [[12, 50], [12, 50], [12, 50]] },
        { name: "인클라인 프레스 머신", en: "Incline Machine Press", tip: "끝에서 가슴 꽉 조이기", sets: [[12, 40], [12, 40], [12, 40]] }
      ]},
      { day: "화", part: "하체", en: "Legs", cardio: false, items: [
        { name: "레그 익스텐션", en: "Leg Extension", tag: "워밍업", tip: "무릎 풀어주기", sets: [[20, 30], [15, 35]] },
        { name: "이너타이", en: "Inner Thigh", tag: "선행", tip: "안쪽 허벅지로 천천히 모으기", sets: [[20, 40], [15, 45], [12, 50]] },
        { name: "아웃타이 머신", en: "Outer Thigh", tag: "선행", tip: "엉덩이 옆으로 밀어내기", sets: [[20, 40], [15, 45], [12, 50]] },
        { name: "레그프레스", en: "Leg Press", tag: "메인", tip: "무릎은 발끝 방향으로, 끝까지 펴서 잠그지 않기", sets: [[15, 110], [12, 120], [10, 130], [8, 135]] },
        { name: "스미스 스쿼트", en: "Smith Squat", tip: "엉덩이 뒤로 앉고 허리 곧게", sets: [[12, 40], [12, 40], [12, 40]] },
        { name: "라잉 레그컬", en: "Lying Leg Curl", tip: "골반 패드에 붙이기", sets: [[12, 30], [12, 30], [12, 30]] }
      ]},
      { day: "수", part: "등", en: "Back", cardio: false, items: [
        { name: "스트레이트 암 풀다운", en: "Straight Arm Pulldown", tag: "워밍업", tip: "팔 펴고 광배로 누르기", sets: [[20, 15], [15, 20]] },
        { name: "랫풀다운", en: "Lat Pulldown", tag: "메인", tip: "팔꿈치로 옆구리까지 당기기", sets: [[15, 50], [12, 55], [10, 60], [8, 65]] },
        { name: "뉴텍 시티드 로우 머신", en: "Seated Row Machine", tip: "가슴 패드 붙이고 날개뼈 모으기", sets: [[12, 50], [12, 50], [12, 50]] },
        { name: "원암 덤벨 로우", en: "One Arm DB Row", tip: "팔꿈치를 골반 쪽으로", sets: [[12, 24], [12, 24], [12, 24]] },
        { name: "케이블 풀오버", en: "Cable Pullover", tip: "팔 펴고 골반까지", sets: [[15, 20], [15, 20], [15, 20]] }
      ]},
      { day: "목", part: "어깨", en: "Shoulder", cardio: true, items: [
        { name: "리버스 펙덱", en: "Reverse Pec Deck", tag: "워밍업", tip: "뒷어깨 가볍게 풀기", sets: [[20, 20], [15, 25]] },
        { name: "숄더 프레스 머신", en: "Shoulder Press", tag: "메인", tip: "허리 등받이에 붙이기", sets: [[15, 30], [12, 35], [10, 40], [8, 45]] },
        { name: "사이드 레터럴 레이즈", en: "Lateral Raise", tip: "어깨 으쓱 금지, 팔꿈치로 들기", sets: [[15, 8], [15, 8], [15, 8]] },
        { name: "사이드 레터럴 레이즈 머신", en: "Lateral Raise Machine", tip: "어깨 높이에서 1초 멈추기", sets: [[15, 20], [15, 20], [15, 20]] },
        { name: "덤벨 슈러그", en: "DB Shrug", tip: "위로 올리고 1초 멈추기", sets: [[15, 24], [15, 24], [15, 24]] }
      ]},
      { day: "금", part: "가슴 · 팔", en: "Chest & Arms", cardio: false, items: [
        { name: "펙덱 플라이", en: "Pec Deck Fly", tag: "워밍업", tip: "가볍게 가슴 풀기", sets: [[20, 25], [15, 30]] },
        { name: "스미스 인클라인 프레스", en: "Smith Incline Press", tag: "메인", tip: "윗가슴 쪽으로 내리기", sets: [[15, 30], [12, 35], [10, 40], [8, 45]] },
        { name: "체스트 프레스", en: "Chest Press", tip: "가슴 펴고 밀기", sets: [[12, 50], [12, 50], [12, 50]] },
        { name: "덤벨 컬", en: "DB Curl", tip: "팔꿈치 고정, 반동 금지", sets: [[12, 12], [12, 12], [12, 12]] },
        { name: "케이블 푸쉬다운", en: "Cable Pushdown", tip: "팔꿈치 옆구리에 고정", sets: [[12, 30], [12, 30], [12, 30]] },
        { name: "오버헤드 익스텐션", en: "Overhead Extension", tip: "팔꿈치 벌어지지 않게", sets: [[12, 20], [12, 20], [12, 20]] }
      ]},
      { day: "토", part: "로테이션", en: "Free Pick", cardio: false, pick: ["mon", "tue", "wed", "thu", "fri"], items: [],
        note: "이번 주에 아쉬웠던 부위 하나를 골라 그 요일 루틴 그대로 해요. 주마다 다른 부위로 돌려가며!" },
      { day: "일", part: "휴식", en: "Rest", rest: true, items: [] }
    ]
  },

  /* 식단표 (없으면 null) */
  diet: null
};
