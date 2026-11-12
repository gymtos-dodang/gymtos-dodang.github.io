/* 김지수 회원님 홈페이지 데이터 — 이 파일만 고치면 페이지 내용이 바뀜 */
window.MEMBER = {
  name: "김지수",
  sex: "F",                       // M = 네이비, F = 핑크
  since: "2026. 11",
  goal: "벌크업 · 주 4회",
  journey: { start: "2026-06-15" },   // PT 시작일 (장동욱: 6월쯤 → 15일로 둠)

  /* 공지 (최신이 위) */
  notices: [
    { date: "2026. 11. 13", title: "자세 복습지 3개가 올라왔어요", link: "forms",
      body: "펙덱 플라이 · 케이블 리버스 플라이 · 체스트 프레스 머신! 어제 수업 영상으로 만들었어요. 목요일 가슴 루틴 종목에서도 바로 열려요." },
    { date: "2026. 11. 11", title: "자세 복습지 2개가 올라왔어요", link: "forms",
      body: "리버스 펙덱 · 숄더 프레스 머신! 오늘 수업 영상으로 만들었어요. 리버스 펙덱은 루틴 월·수요일 종목에서도 바로 열려요." },
    { date: "2026. 11. 6", title: "루틴이 v7로 바뀌었어요", link: "routine-wed",
      body: "수요일 어깨 메인이 덤벨 숄더 프레스로 바뀌었어요. 사이드 레터럴 레이즈는 2kg로 시작해서 마지막 세트에 4kg로 올려요. 종목을 누르면 자세 복습지가 열려요!" },
    { date: "2026. 11. 6", title: "자세 복습지 3개가 올라왔어요",
      body: "덤벨 사이드 레터럴 레이즈 · 덤벨 숄더 프레스 · 케이블 푸쉬다운! 내 영상으로 자세를 다시 보고, 운동 전에 KEY POINT 한 번씩 읽어봐요. 루틴 탭 종목에서도 바로 열려요.", link: "forms" },
    { date: "2026. 11. 3", title: "PT 노트가 열렸어요",
      body: "이번 주 루틴(v6)이 올라와 있어요. 루틴 탭에서 요일을 누르면 그날 운동과 무게가 나와요. 자세 복습지·식단도 앞으로 여기로 올려드릴게요!" }
  ],
  /* 다음 수업 (없으면 null) */
  next_class: null,

  /* 자세 복습지 (최신이 위) */
  forms: [
    {
      id: "pec-deck-fly",
      dir: "media/form-pec-deck-fly/",
      date: "2026. 11. 12 (목)",
      exercise: "펙덱 플라이",
      exercise_en: "Pec Deck Fly",
      part: "가슴",
      targets: ["대흉근 (가슴)", "전면 삼각근"],
      benefit: "가슴 안쪽까지 모아줘서 가슴 가운데 라인이 살아나요. 메인 체스트 프레스 전에 가슴을 깨우는 워밍업이에요",
      key_point: "팔로 당기지 말고, 가슴으로 껴안듯이 모은다!",
      good_points: [
        { title: "등을 등받이에 붙이고 했어요", desc: "모을 때 상체가 앞으로 따라 나오지 않아서 가슴만 일했어요" },
        { title: "가슴이 늘어날 만큼 벌렸어요", desc: "어깨 옆 선까지 팔을 보내서 가슴이 쭉 늘어난 상태에서 다시 모았어요" },
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
      id: "cable-reverse-fly",
      dir: "media/form-cable-reverse-fly/",
      date: "2026. 11. 12 (목)",
      exercise: "케이블 리버스 플라이",
      exercise_en: "Cable Reverse Fly",
      part: "어깨 · 등",
      targets: ["후면 삼각근 (뒷어깨)", "능형근 · 중부 승모근"],
      benefit: "뒷어깨와 날개뼈 사이를 채워서 말린 어깨가 펴지고 뒤태 라인이 또렷해져요. 서서 해서 자세 버티는 힘도 같이 길러요",
      key_point: "손으로 당기지 말고, 팔꿈치로 옆으로 크게 벌린다! 어깨는 아래로",
      good_points: [
        { title: "어깨 높이에서 벌렸어요", desc: "손이 처지거나 올라가지 않고 어깨 높이 그대로 옆으로 벌려서 뒷어깨에 정확히 들어갔어요" },
        { title: "팔을 쭉 편 채 유지했어요", desc: "벌리고 모을 때 팔을 굽혔다 폈다 하지 않아서 팔이 아니라 어깨로 움직였어요" },
        { title: "몸통이 흔들리지 않았어요", desc: "서서 하는데도 상체를 뒤로 젖히지 않고 반동 없이 천천히 반복했어요" }
      ],
      primary_muscles: [{ name: "후면 삼각근", where: "어깨 뒤쪽" }],
      secondary_muscles: "능형근 · 중부 승모근 · 극하근 · 소원근",
      feel_good: "어깨 뒤쪽과 날개뼈 사이가 뻐근해요",
      feel_stop: "목·승모근만 뻐근하거나, 어깨 앞이 찌릿해요",
      steps: [
        { title: "준비", desc: "케이블을 어깨 높이에 맞추고 손잡이를 엇갈려 잡아요(오른손은 왼쪽 케이블). 다리는 어깨너비, 배에 힘, 어깨는 아래로", chip: "숨 들이마시기", media: "step1.jpg" },
        { title: "벌리기", desc: "팔꿈치로 큰 원을 그리듯 옆으로! 팔이 몸통과 일자가 될 때까지 벌리고 날개뼈를 살짝 모아요", chip: "1~2초 · 후~ 내쉬며", media: "step2.webp", loop: true },
        { title: "천천히 모으기", desc: "케이블에 끌려가지 말고 버티면서 가슴 앞으로 천천히 엇갈리게 모아요", chip: "2~3초 · 들이마시며", media: "step3.webp", loop: true }
      ],
      do: ["손은 어깨 높이 그대로", "팔꿈치 각도는 처음 그대로", "어깨는 아래로 내린 채"],
      dont: ["어깨를 귀 쪽으로 으쓱하기", "상체를 뒤로 젖혀 반동 쓰기", "모을 때 케이블에 휙 끌려가기"]
    },
    {
      id: "chest-press-machine",
      dir: "media/form-chest-press-machine/",
      date: "2026. 11. 12 (목)",
      exercise: "체스트 프레스 머신",
      exercise_en: "Chest Press Machine",
      part: "가슴",
      targets: ["대흉근 (가슴)", "전면 삼각근 · 삼두근"],
      benefit: "목요일 가슴 날의 메인! 가슴 앞판을 탄탄하게 채우고 미는 힘을 길러줘요. 손잡이 길이 정해져 있어 무게 올리기 좋아요",
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
    },
    {
      id: "reverse-pec-deck",
      dir: "media/form-reverse-pec-deck/",
      date: "2026. 11. 11 (수)",
      exercise: "리버스 펙덱",
      exercise_en: "Reverse Pec Deck",
      part: "어깨 · 등",
      targets: ["후면 삼각근 (뒷어깨)", "능형근 · 중부 승모근"],
      benefit: "뒷어깨와 날개뼈 사이를 채워서 말린 어깨가 펴지고, 뒤태 라인이 또렷해져요",
      key_point: "손이 아니라 팔꿈치로 옆으로 크게 벌리고, 어깨는 내린 채!",
      good_points: [
        { title: "몸통과 일자까지 벌렸어요", desc: "팔을 옆으로 쭉 벌려서 몸통과 한 줄이 될 때까지 보내 뒷어깨가 끝까지 일했어요" },
        { title: "팔꿈치 각도를 유지했어요", desc: "벌리고 모을 때 팔을 굽혔다 폈다 하지 않아서 팔이 아니라 어깨로 움직였어요" },
        { title: "가슴을 패드에 붙였어요", desc: "상체가 뒤로 빠지지 않고 앉은 자세 그대로라 반동 없이 반복했어요" }
      ],
      primary_muscles: [{ name: "후면 삼각근", where: "어깨 뒤쪽" }],
      secondary_muscles: "능형근 · 중부 승모근 · 극하근 · 소원근",
      feel_good: "어깨 뒤쪽과 날개뼈 사이가 뻐근해요",
      feel_stop: "목·승모근만 뻐근하거나, 어깨 앞이 찌릿해요",
      steps: [
        { title: "준비", desc: "가슴을 패드에 붙이고 손잡이를 어깨 높이로 잡아요. 팔꿈치는 살짝 굽히고 어깨는 아래로", chip: "숨 들이마시기", media: "step1.jpg" },
        { title: "벌리기", desc: "팔꿈치로 큰 원을 그리듯 옆으로! 팔이 몸통과 일자가 될 때까지 벌려요", chip: "1~2초 · 후~ 내쉬며", media: "step2.webp", loop: true },
        { title: "천천히 모으기", desc: "버티면서 앞으로 천천히. 손잡이가 부딪히기 전에 다시 벌려요", chip: "2~3초 · 들이마시며", media: "step3.webp", loop: true }
      ],
      do: ["가슴은 패드에 붙이기", "팔꿈치 각도는 처음 그대로", "어깨는 아래로 내린 채"],
      dont: ["어깨를 귀 쪽으로 으쓱하기", "몸을 뒤로 젖혀 반동 쓰기", "손잡이를 앞에서 쾅 부딪히기"]
    },
    {
      id: "shoulder-press-machine",
      dir: "media/form-shoulder-press-machine/",
      date: "2026. 11. 11 (수)",
      exercise: "숄더 프레스 머신",
      exercise_en: "Shoulder Press Machine",
      part: "어깨",
      targets: ["삼각근 (앞·옆 어깨)", "삼두근 · 상부 승모근"],
      benefit: "궤도가 정해져 있어서 어깨에만 집중하기 좋아요. 무게를 안전하게 올리며 어깨 볼륨을 채워줘요",
      key_point: "손잡이는 어깨 높이까지 내리고, 등은 등받이에 딱 붙인 채 밀어 올린다!",
      good_points: [
        { title: "어깨 높이까지 충분히 내렸어요", desc: "손잡이를 어깨 옆까지 내려서 어깨가 넓은 범위로 일했어요" },
        { title: "머리 위로 쭉 밀었어요", desc: "팔이 거의 펴질 때까지 밀어 올려서 한 번 한 번 끝까지 했어요" },
        { title: "등이 등받이에 붙어 있었어요", desc: "허리를 젖히지 않고 상체가 고정돼서 어깨 힘으로만 밀었어요" }
      ],
      primary_muscles: [{ name: "삼각근 전면·측면", where: "어깨 앞과 옆, 동그란 부분" }],
      secondary_muscles: "삼두근 · 상부 승모근 · 윗가슴",
      feel_good: "어깨 앞·옆이 터질 듯 뻐근해요",
      feel_stop: "허리가 찌릿하거나, 목·승모근만 뻐근해요",
      steps: [
        { title: "준비", desc: "손잡이가 어깨 높이에 오게 의자를 맞추고 앉아요. 등·허리는 등받이에 붙이고 가슴은 펴요", chip: "숨 들이마시기", media: "step1.jpg" },
        { title: "밀어 올리기", desc: "어깨로 밀어 머리 위로! 팔꿈치는 끝까지 잠그지 말고 살짝 남겨요", chip: "1~2초 · 후~ 내쉬며", media: "step2.webp", loop: true },
        { title: "내리기", desc: "버티면서 어깨 높이까지 천천히. 무게가 쿵 내려앉기 전에 다시 밀어요", chip: "2~3초 · 들이마시며", media: "step3.webp", loop: true }
      ],
      do: ["등·허리는 등받이에 붙이기", "손잡이는 어깨 높이까지 내리기", "위에서 팔꿈치는 살짝 남기기"],
      dont: ["허리를 젖히며 밀기", "어깨를 귀 쪽으로 으쓱하기", "무게를 쿵 내려놓고 쉬기"]
    },
    {
      id: "db-lateral-raise",
      dir: "media/form-db-lateral-raise/",
      date: "2026. 11. 6 (금)",
      exercise: "덤벨 사이드 레터럴 레이즈",
      exercise_en: "DB Lateral Raise",
      part: "어깨",
      targets: ["측면 삼각근 (옆 어깨)", "상부 승모근 · 전면 삼각근"],
      benefit: "옆 어깨를 동그랗게 채워줘요. 어깨선이 넓어지면 허리가 더 얇아 보이고 상체 라인이 예뻐져요",
      key_point: "손이 아니라 팔꿈치로 옆으로 밀어 올리고, 어깨 높이에서 멈춘다!",
      good_points: [
        { title: "어깨 높이까지 딱 올렸어요", desc: "팔이 바닥과 나란해질 때까지 올리고 그 이상은 안 올려서 옆 어깨에 정확히 들어갔어요" },
        { title: "팔꿈치를 살짝 굽혀 고정했어요", desc: "팔꿈치 각도가 매 회 같아서 팔이 아니라 어깨로 들었어요" },
        { title: "몸 반동 없이 들었어요", desc: "상체가 흔들리지 않고 서 있는 자세 그대로 반복했어요" }
      ],
      primary_muscles: [{ name: "측면 삼각근", where: "어깨 바깥쪽, 옆에서 볼 때 동그란 부분" }],
      secondary_muscles: "전면 삼각근 · 상부 승모근 · 극상근",
      feel_good: "어깨 옆쪽이 화끈하게 타는 느낌이에요",
      feel_stop: "목·승모근만 뻐근하거나, 어깨 안쪽이 찌릿해요",
      steps: [
        { title: "준비", desc: "발은 골반 너비, 배에 힘 주고 덤벨을 허벅지 옆에. 팔꿈치는 살짝 굽혀요", chip: "숨 들이마시기", media: "step1.jpg" },
        { title: "들어 올리기", desc: "팔꿈치로 옆으로 밀듯이 어깨 높이까지! 새끼손가락 쪽이 살짝 높게", chip: "1~2초 · 후~ 내쉬며", media: "step2.webp", loop: true },
        { title: "내리기", desc: "버티면서 허벅지 옆까지 천천히. 툭 떨어뜨리지 않아요", chip: "2~3초 · 들이마시며", media: "step3.webp", loop: true }
      ],
      do: ["팔꿈치 살짝 굽힌 채 고정", "어깨 높이까지만 올리기", "내릴 때 천천히 버티기"],
      dont: ["어깨를 귀 쪽으로 으쓱하기", "몸을 흔들어 반동으로 올리기", "어깨보다 높이 올리기"]
    },
    {
      id: "db-shoulder-press",
      dir: "media/form-db-shoulder-press/",
      date: "2026. 11. 6 (금)",
      exercise: "덤벨 숄더 프레스",
      exercise_en: "DB Shoulder Press",
      part: "어깨",
      targets: ["삼각근 (앞·옆 어깨)", "삼두근 · 상부 승모근"],
      benefit: "어깨 전체를 크고 둥글게 키워줘요. 벌크업 때 상체 볼륨을 채우는 대표 운동이에요",
      key_point: "덤벨은 귀 옆까지 내리고, 머리 위로 곧게 밀어 올린다!",
      good_points: [
        { title: "귀 높이까지 충분히 내렸어요", desc: "팔꿈치가 90도 정도 될 때까지 내려서 어깨가 넓은 범위로 일했어요" },
        { title: "손목이 팔꿈치 위에 있었어요", desc: "덤벨이 앞뒤로 쏠리지 않고 팔뚝이 세워져서 힘이 그대로 위로 갔어요" },
        { title: "등받이에 기대 안정적이었어요", desc: "허리를 등받이에 붙인 채 상체가 흔들리지 않고 반복했어요" }
      ],
      primary_muscles: [{ name: "삼각근 전면·측면", where: "어깨 앞과 옆, 동그란 부분" }],
      secondary_muscles: "삼두근 · 상부 승모근 · 윗가슴",
      feel_good: "어깨 앞·옆이 터질 듯 뻐근해요",
      feel_stop: "허리가 찌릿하거나, 목·승모근만 뻐근해요",
      steps: [
        { title: "준비", desc: "등받이를 세우고 앉아 허리를 붙여요. 덤벨을 귀 옆에 두고 팔꿈치는 손목 바로 아래", chip: "숨 들이마시기", media: "step1.jpg" },
        { title: "밀어 올리기", desc: "어깨로 밀어 머리 위로! 위에서 덤벨이 살짝 모이고 팔꿈치는 살짝 굽힌 채", chip: "1~2초 · 후~ 내쉬며", media: "step2.webp", loop: true },
        { title: "내리기", desc: "버티면서 귀 옆까지 천천히. 어깨가 쭉 늘어나는 걸 느껴요", chip: "2~3초 · 들이마시며", media: "step3.webp", loop: true }
      ],
      do: ["허리는 등받이에 붙이기", "손목은 팔꿈치 바로 위에", "덤벨은 귀 옆까지 내리기"],
      dont: ["허리를 뒤로 젖혀서 밀기", "어깨를 귀 쪽으로 으쓱하기", "반만 내리고 빨리 올리기"]
    },
    {
      id: "cable-pushdown",
      dir: "media/form-cable-pushdown/",
      date: "2026. 11. 6 (금)",
      exercise: "케이블 푸쉬다운",
      exercise_en: "Cable Pushdown",
      part: "팔 (삼두)",
      targets: ["삼두근 (팔 뒤쪽)", "전완근"],
      benefit: "팔 뒤쪽을 탄탄하게 잡아줘요. 팔뚝 뒤 출렁이는 부분이 단단해지고, 프레스 운동 힘도 같이 좋아져요",
      key_point: "팔꿈치는 옆구리에 딱 고정! 팔꿈치 아래만 움직여서 끝까지 편다",
      good_points: [
        { title: "팔꿈치가 옆구리에 붙어 있었어요", desc: "누르고 올라올 때 팔꿈치 위치가 거의 그대로라 삼두에만 힘이 들어갔어요" },
        { title: "끝까지 쭉 폈어요", desc: "매 회 팔을 다 펴서 팔 뒤쪽을 꽉 조이고 올라왔어요" },
        { title: "상체가 흔들리지 않았어요", desc: "몸으로 누르지 않고 선 자세 그대로 팔 힘으로만 반복했어요" }
      ],
      primary_muscles: [{ name: "삼두근", where: "팔 뒤쪽, 팔꿈치 위 말랑한 부분" }],
      secondary_muscles: "전완근 (손목·아래팔)",
      feel_good: "팔 뒤쪽이 꽉 조이면서 뜨거워요",
      feel_stop: "팔꿈치 관절이 찌릿하거나, 어깨 앞이 아파요",
      steps: [
        { title: "준비", desc: "케이블 앞에 서서 손잡이를 잡고 팔꿈치를 옆구리에 붙여요. 배에 힘, 상체는 살짝 앞으로", chip: "숨 들이마시기", media: "step1.jpg" },
        { title: "눌러 내리기", desc: "팔꿈치는 그대로! 손만 허벅지 쪽으로 쭉 밀어 팔을 끝까지 펴요", chip: "1~2초 · 후~ 내쉬며", media: "step2.webp", loop: true },
        { title: "올라오기", desc: "버티면서 천천히, 팔꿈치가 90도 될 때까지만 올라와요", chip: "2초 · 들이마시며", media: "step3.webp", loop: true }
      ],
      do: ["팔꿈치는 옆구리에 고정", "끝에서 팔 뒤쪽 꽉 조이기", "올라올 땐 천천히 버티기"],
      dont: ["팔꿈치가 앞뒤로 따라 움직이기", "상체를 숙여 몸무게로 누르기", "손이 얼굴까지 올라오기"]
    }
  ],

  /* 주간 루틴 */
  routine: {
    version: "v7",
    updated: "2026. 11. 6",
    title: "주 4회 · 벌크업",
    plan: ["등·엉덩이·어깨·가슴 4분할", "매주 무게 조금씩 올리기", "금~일은 푹 쉬고 잘 먹기"],
    key_point: "벌크업은 잘 먹고 잘 쉬는 것까지가 운동! 매주 무게를 조금씩 올려봐요",
    note: "세트 사이 1분 30초~2분 쉬기 · 덤벨 무게는 한 손 기준이에요",
    cardio: { minutes: 15, options: "경사 걷기 · 천국의 계단 · 사이클 중 택1" },
    days: [
      { day: "월", part: "등", en: "Back", cardio: false, items: [
        { name: "시티드 페이스풀", en: "Seated Face Pull", tag: "워밍업", tip: "날개뼈 모으며 얼굴 쪽으로", sets: [[20, 10], [15, 15]] },
        { name: "랫풀다운", en: "Lat Pulldown", tip: "팔꿈치로 당기기", sets: [[12, 25], [12, 25], [12, 25]] },
        { name: "뉴텍 시티드 로우 머신", en: "Seated Row Machine", tag: "메인", tip: "가슴 패드 붙이고 당기기", sets: [[15, 25], [12, 25], [10, 30], [8, 30]] },
        { name: "리버스 펙덱", en: "Reverse Pec Deck", tip: "날개뼈 모으며 옆으로", sets: [[15, 15], [15, 15], [15, 15]] }
      ]},
      { day: "화", part: "엉덩이", en: "Glute", cardio: false, items: [
        { name: "고블릿 스쿼트", en: "Goblet Squat", tag: "선행", tip: "가슴 세우고 깊이 앉기", sets: [[20, 6], [15, 8], [12, 10]] },
        { name: "이너타이", en: "Inner Thigh", tag: "선행", tip: "천천히 모으고 버티기", sets: [[15, 15], [12, 20], [10, 25]] },
        { name: "아웃타이 머신", en: "Outer Thigh", icon: "outer_thigh_pin", tag: "선행", tip: "엉덩이 옆으로 밀기", sets: [[20, 20], [15, 25], [12, 30]] },
        { name: "힙쓰러스트 머신", en: "Hip Thrust", icon: "hip_thrust", tag: "메인", tip: "맨 위에서 엉덩이 꽉", sets: [[15, 10], [12, 10], [10, 15], [8, 15]] }
      ]},
      { day: "수", part: "어깨", en: "Shoulder", cardio: true, items: [
        { name: "사이드 레터럴 레이즈 머신", en: "Standing Machine", tag: "워밍업", tip: "가볍게 어깨 풀기", sets: [[20, 5], [15, 10]] },
        { name: "덤벨 숄더 프레스", en: "DB Shoulder Press", form: "db-shoulder-press", tag: "메인", tip: "덤벨은 귀 옆까지 내리기", sets: [[15, 4], [12, 4], [10, 6], [8, 6]] },
        { name: "사이드 레터럴 레이즈 (덤벨)", en: "Lateral Raise", form: "db-lateral-raise", tip: "2kg로 시작 → 마지막 세트 4kg", sets: [[15, 2], [15, 2], [15, 4]] },
        { name: "리버스 펙덱", en: "Reverse Pec Deck", tip: "날개뼈 모으며 옆으로", sets: [[15, 15], [15, 15], [15, 15]] }
      ]},
      { day: "목", part: "가슴", en: "Chest", cardio: false, items: [
        { name: "펙덱 플라이", en: "Pec Deck Fly", tag: "워밍업", tip: "가슴 모은다는 느낌", sets: [[20, 15], [15, 15]] },
        { name: "체스트 프레스 머신", en: "Chest Press", icon: "chest_press", tag: "메인", tip: "가슴 펴고 밀기", sets: [[15, 20], [12, 20], [10, 25], [8, 25]] },
        { name: "인클라인 덤벨 프레스", en: "Incline DB Press", tip: "윗가슴으로 밀기", sets: [[12, 6], [12, 6], [12, 6]] },
        { name: "케이블 푸쉬다운", en: "Cable Pushdown", form: "cable-pushdown", tip: "팔꿈치 옆구리에 고정", sets: [[15, 15], [15, 15], [15, 15]] }
      ]},
      { day: "금", part: "휴식", en: "Rest", rest: true, items: [] },
      { day: "토", part: "휴식", en: "Rest", rest: true, items: [] },
      { day: "일", part: "휴식", en: "Rest", rest: true, items: [] }
    ]
  },

  /* 식단표 (없으면 null) */
  diet: null
};
