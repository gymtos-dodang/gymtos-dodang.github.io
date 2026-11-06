/* 박찬영 회원님 홈페이지 데이터 — 이 파일만 고치면 페이지 내용이 바뀜 */
window.MEMBER = {
  name: "박찬영",
  sex: "M",                       // M = 네이비, F = 핑크
  since: "2026. 11",
  goal: "근비대 · 주 5회 + 주말 로테이션",
  journey: { start: "2026-10-15" },   // PT 시작일 (10월 → 15일로 둠)

  /* 공지 (최신이 위) */
  notices: [
    { date: "2026. 11. 6", title: "PT 노트가 열렸어요", link: "routine",
      body: "이번 주 루틴이 올라와 있어요. 루틴 탭에서 요일을 누르면 그날 운동과 무게가 나와요. 토요일은 이번 주에 아쉬웠던 부위 하나를 골라서 하는 날! 자세 복습지·식단도 앞으로 여기로 올려드릴게요." }
  ],
  /* 다음 수업 (없으면 null) */
  next_class: null,

  /* 자세 복습지 (최신이 위) */
  forms: [],

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
        { name: "머신 인클라인 프레스", en: "Incline Machine Press", tip: "끝에서 가슴 꽉 조이기", sets: [[12, 40], [12, 40], [12, 40]] }
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
        { name: "시티드 로우 머신", en: "Seated Row Machine", tip: "가슴 패드 붙이고 날개뼈 모으기", sets: [[12, 50], [12, 50], [12, 50]] },
        { name: "원암 덤벨 로우", en: "One Arm DB Row", tip: "팔꿈치를 골반 쪽으로", sets: [[12, 24], [12, 24], [12, 24]] },
        { name: "케이블 풀오버", en: "Cable Pullover", tip: "팔 펴고 골반까지", sets: [[15, 20], [15, 20], [15, 20]] }
      ]},
      { day: "목", part: "어깨", en: "Shoulder", cardio: true, items: [
        { name: "리버스 펙덱", en: "Reverse Pec Deck", tag: "워밍업", tip: "뒷어깨 가볍게 풀기", sets: [[20, 20], [15, 25]] },
        { name: "숄더 프레스 머신", en: "Shoulder Press", tag: "메인", tip: "허리 등받이에 붙이기", sets: [[15, 30], [12, 35], [10, 40], [8, 45]] },
        { name: "사이드 레터럴 레이즈", en: "Lateral Raise", tip: "어깨 으쓱 금지, 팔꿈치로 들기", sets: [[15, 8], [15, 8], [15, 8]] },
        { name: "레터럴 레이즈 머신", en: "Lateral Raise Machine", tip: "어깨 높이에서 1초 멈추기", sets: [[15, 20], [15, 20], [15, 20]] },
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
