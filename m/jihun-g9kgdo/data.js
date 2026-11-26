/* 최지훈 회원님 홈페이지 데이터 — 이 파일만 고치면 페이지 내용이 바뀜 */
window.MEMBER = {
  name: "최지훈",
  sex: "M",                       // M = 네이비, F = 핑크
  since: "2026. 11",
  goal: "근비대 · 주 6회",
  journey: { start: "2026-10-15" },   // PT 시작일 (장동욱: 10월쯤 → 15일로 둠)

  /* 공지 (최신이 위) */
  notices: [
    {"date":"2026. 11. 26","title":"사이드 레터럴 레이즈 머신 복습지 최신화","link":"form-1126-lateral-raise-machine","body":"오늘 영상으로 바꿨어요(측면·뒷모습)! 11/13 영상과 나란히 비교해 볼 수 있어요."},
    {"date":"2026. 11. 24","title":"등 자세 복습지 2개가 올라왔어요","link":"form-1124-lat-pulldown","body":"랫풀다운 최신화 + 뉴텍 엠토처 시티드 로우! 랫풀다운은 11/11 영상과 나란히 비교해 볼 수 있어요."},
    {"date":"2026. 11. 23","title":"가슴 자세 복습지 2개가 올라왔어요","link":"forms","body":"스미스 벤치프레스 · 뉴텍 인클라인 프레스 머신! 측면·정면 두 각도로 볼 수 있어요."},
    {"date": "2026. 11. 19", "title": "어깨 자세 복습지 2개가 올라왔어요", "link": "forms", "body": "숄더 프레스 머신 · 스탠딩 페이스풀! 페이스풀은 정면·측면 영상 둘 다 볼 수 있어요."},
    {"date":"2026. 11. 18","title":"이너타이 · 아웃타이 복습지가 올라왔어요","link":"forms","body":"이너타이 · 아웃타이 머신! 루틴 하체 종목에서도 바로 열려요."},
    {"date":"2026. 11. 18","title":"하체 자세 복습지 2개가 올라왔어요","link":"forms","body":"라잉 레그컬 · 레그프레스! 오늘 수업 영상으로 만들었어요."},
    {"date":"2026. 11. 13","title":"어깨 자세 복습지 3개가 올라왔어요","link":"forms","body":"사이드 레터럴 레이즈 · 덤벨 숄더 프레스 · 사이드 레터럴 레이즈 머신! 오늘 어깨 수업 영상으로 만들었어요. 목요일 어깨 루틴 종목에서도 바로 열려요."},
    { date: "2026. 11. 11", title: "등 운동 자세 복습지 4개가 올라왔어요",
      body: "랫풀다운 · 어시스트 친업 · 해머스트렝스 로우로우 · 리버스 펙덱 플라이. 오늘 수업 영상으로 만들었어요. 등 하는 날 들어가기 전에 꼭 한 번 보세요!", link: "forms" },
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
    {"id":"1126-lateral-raise-machine","old_ids":["lateral-raise-machine"],"dir":"media/form-1126-lateral-raise-machine/","date":"2026. 11. 26 (목)","exercise":"사이드 레터럴 레이즈 머신","exercise_en":"Standing Lateral Raise Machine","part":"어깨","views":[{"label":"측면","file":"form"},{"label":"뒷모습","file":"back"}],"compare":[{"label":"11/13","date":"2026. 11. 13 (금)","dir":"media/form-lateral-raise-machine/","file":"form","view":"form"}],"targets":["측면 삼각근 (옆 어깨)","전면 삼각근 · 상부 승모근"],"benefit":"옆 어깨를 동그랗게 키워서 어깨가 넓어 보이게 해줘요. 기계가 길을 잡아줘서 끝까지 일정하게 자극이 들어가요","key_point":"손이 아니라 팔꿈치로 들고, 어깨 높이에서 멈춘다!","good_points":[{"title":"팔꿈치를 어깨 높이까지 올렸어요","desc":"팔꿈치가 손보다 먼저 올라가서 어깨 높이에서 딱 멈춰 옆 어깨가 꽉 수축됐어요"},{"title":"몸통이 꼿꼿했어요","desc":"서서 하는데도 상체가 앞뒤로 흔들리지 않아서 반동 없이 어깨로만 들었어요"},{"title":"양팔 높이가 똑같았어요","desc":"뒷모습에서 좌우 팔이 같은 높이로 올라가고 어깨도 으쓱 올라가지 않았어요"}],"primary_muscles":[{"name":"측면 삼각근","where":"어깨 옆 동그란 부분"}],"secondary_muscles":"전면 삼각근 · 상부 승모근","feel_good":"어깨 옆이 타는 듯 뻐근해요","feel_stop":"목·승모근만 뻐근하거나, 어깨 안쪽이 찌릿해요","steps":[{"title":"준비","desc":"기구 옆에 바르게 서서 손잡이를 잡아요. 팔꿈치를 살짝 굽히고 어깨는 아래로 내려요","chip":"숨 들이마시기","media":"step1.jpg"},{"title":"들어 올리기","desc":"팔꿈치로 옆으로 크게! 어깨 높이까지 들고 위에서 1초 멈춰요","chip":"1~2초 · 후~ 내쉬며","media":"step2.webp","loop":true},{"title":"천천히 내리기","desc":"무게에 끌려가지 말고 버티면서 처음 자리까지","chip":"3초 · 들이마시며","media":"step3.webp","loop":true}],"do":["어깨는 아래로 내린 채 시작","팔꿈치가 손보다 먼저 올라가기","어깨 높이에서 1초 멈추기"],"dont":["어깨를 귀 쪽으로 으쓱하기","몸을 흔들어 반동 쓰기","팔을 어깨보다 높이 들기"],"also":["스탠딩 사이드 레터럴 레이즈 머신","레터럴 레이즈 머신"]},
    {"id": "1124-lat-pulldown", "old_ids": ["lat-pulldown"], "dir": "media/form-1124-lat-pulldown/", "date": "2026. 11. 24 (화)", "exercise": "랫풀다운", "exercise_en": "Lat Pulldown", "part": "등", "targets": ["광배근 (등 날개)", "대원근 · 이두근"], "benefit": "등을 옆으로 넓혀서 어깨는 넓고 허리는 가늘어 보이는 V라인을 만들어줘요", "key_point": "손이 아니라 팔꿈치로, 가슴 위쪽까지 끌어내린다!", "views": [{"label": "측면", "file": "form"}, {"label": "뒷모습", "file": "back"}], "compare": [{"label": "11/11", "date": "2026. 11. 11 (수)", "dir": "media/form-lat-pulldown/", "file": "form", "view": "form"}], "good_points": [{"title": "위에서 팔을 끝까지 폈어요", "desc": "올라갈 때 팔이 다 펴질 때까지 보내서 등이 충분히 늘어났어요"}, {"title": "가슴 위쪽까지 끌어내렸어요", "desc": "손잡이를 쇄골 아래까지 가져와서 광배근을 끝까지 조였어요"}, {"title": "양쪽 팔꿈치가 똑같이 내려왔어요", "desc": "뒷모습에서 좌우가 기울지 않고 어깨도 으쓱 올라가지 않았어요"}], "primary_muscles": [{"name": "광배근", "where": "겨드랑이 아래 옆구리 쪽 등"}], "secondary_muscles": "대원근 · 능형근 · 이두근 · 후면 삼각근", "feel_good": "겨드랑이 아래 옆구리 쪽 등이 뻐근해요", "feel_stop": "팔(이두)만 터질 것 같거나, 목·어깨 위쪽이 뭉쳐요", "steps": [{"title": "준비", "desc": "허벅지 패드를 딱 맞게 내리고, 손잡이를 잡아 팔을 쭉 편 채 가슴을 살짝 펴요", "chip": "숨 들이마시기", "media": "step1.jpg"}, {"title": "당기기", "desc": "팔꿈치를 옆구리 쪽으로 끌어내리며 손잡이를 가슴 위쪽(쇄골 아래)까지", "chip": "2초 · 후~ 내쉬며", "media": "step2.webp", "loop": true}, {"title": "올려 보내기", "desc": "등이 늘어나는 느낌으로 천천히, 팔이 다 펴질 때까지 올려요", "chip": "3초 · 들이마시며", "media": "step3.webp", "loop": true}], "do": ["가슴을 펴고 살짝 뒤로 기대기", "팔꿈치를 옆구리 쪽으로 끌어내리기", "올라갈 땐 천천히, 팔 끝까지 펴기"], "dont": ["몸을 크게 뒤로 젖혀 반동 쓰기", "어깨를 귀 쪽으로 으쓱 올리기", "손잡이를 목 뒤로 당기기"]},
    {"id": "1124-mtorture-seated-row", "dir": "media/form-1124-mtorture-seated-row/", "date": "2026. 11. 24 (화)", "exercise": "뉴텍 엠토처 시티드 로우", "exercise_en": "Seated Row Machine", "part": "등", "targets": ["광배근 · 능형근", "중부 승모근 (날개뼈 사이)"], "benefit": "등 두께를 채워주고 굽은 어깨를 펴줘요. 가슴 패드 없이 앉아서 하니까 상체를 세우고 버티는 힘도 같이 길러요", "key_point": "상체는 세운 채 고정, 팔꿈치를 뒤로 보내며 옆구리 쪽으로 당긴다!", "good_points": [{"title": "팔을 앞으로 끝까지 폈어요", "desc": "돌아갈 때 팔을 쭉 뻗어서 등이 충분히 늘어난 상태에서 다시 당겼어요"}, {"title": "옆구리까지 끝까지 당겼어요", "desc": "손잡이를 몸 옆까지 가져와서 날개뼈 사이까지 꽉 조였어요"}, {"title": "상체를 세운 채 버텼어요", "desc": "당길 때 몸을 크게 젖히지 않아 반동 없이 등으로 당겼어요"}], "primary_muscles": [{"name": "광배근", "where": "등 옆 · 아래쪽"}, {"name": "능형근 · 중부 승모근", "where": "날개뼈 사이"}], "secondary_muscles": "대원근 · 후면 삼각근 · 이두근", "feel_good": "날개뼈 사이와 등 옆이 뻐근하게 조여요", "feel_stop": "허리가 뻐근하거나, 팔뚝만 아파요", "steps": [{"title": "준비", "desc": "발판에 발을 대고 의자에 앉아 허리를 곧게 세워요. 손잡이를 잡고 팔을 앞으로 쭉 펴요", "chip": "숨 들이마시기", "media": "step1.jpg"}, {"title": "당기기", "desc": "가슴을 펴고 팔꿈치를 뒤로 보내며 손잡이를 옆구리 쪽으로! 날개뼈 모으고 1초", "chip": "2초 · 후~ 내쉬며", "media": "step2.webp", "loop": true}, {"title": "돌아가기", "desc": "상체는 그대로, 등이 늘어나는 느낌으로 팔을 천천히 펴요", "chip": "3초 · 들이마시며", "media": "step3.webp", "loop": true}], "do": ["허리 곧게, 상체는 고정", "팔꿈치는 몸 옆으로 붙여 뒤로", "당긴 끝에서 날개뼈 모으고 1초"], "dont": ["몸을 뒤로 젖혀 반동 쓰기", "어깨를 으쓱 올리며 당기기", "돌아갈 때 허리가 둥글게 말리기"]},
    {"id":"1123-smith-bench-press","dir":"media/form-1123-smith-bench-press/","date":"2026. 11. 23 (월)","exercise":"스미스 벤치프레스","exercise_en":"Smith Bench Press","part":"가슴","targets":["가슴 (대흉근)","전면 삼각근 · 삼두근"],"benefit":"가슴 전체를 키워서 상체가 탄탄하고 볼륨 있게 보여요. 바가 레일을 따라 움직여 균형 걱정 없이 무겁게 밀 수 있어요","key_point":"바는 가슴 가운데(유두 라인)로 내리고, 날개뼈는 끝까지 모은다!","good_points":[{"title":"바를 가슴까지 내렸어요","desc":"매번 바가 가슴에 닿을 만큼 내려서 가슴 근육을 끝까지 늘렸어요"},{"title":"날개뼈를 모아 고정했어요","desc":"미는 동안 어깨가 앞으로 말리지 않고 등을 벤치에 단단히 붙였어요"},{"title":"천천히 내렸어요","desc":"내릴 때 툭 떨어뜨리지 않고 버티면서 내려서 가슴이 계속 힘을 받았어요"}],"primary_muscles":[{"name":"대흉근","where":"가슴 전체"}],"secondary_muscles":"전면 삼각근 · 삼두근","feel_good":"가슴 가운데가 뻐근하고 꽉 차요","feel_stop":"어깨 앞만 타거나, 손목이 뒤로 꺾여서 아파요","steps":[{"title":"준비","desc":"벤치를 평평하게 두고 바가 가슴 가운데 위에 오게 누워요. 날개뼈를 모아 가슴을 연 다음, 바를 풀고 팔을 편 자리에서 시작해요","chip":"숨 들이마시기","media":"step1.jpg"},{"title":"내리기","desc":"팔꿈치를 몸통에서 45도 정도 벌리며 바를 가슴 가운데까지 천천히 내려요","chip":"3초 · 들이마시며","media":"step2.webp","loop":true},{"title":"밀어 올리기","desc":"가슴으로 밀어 처음 자리까지! 맨 위에서 팔꿈치는 살짝 굽힌 채 멈춰요","chip":"1~2초 · 후~ 내쉬며","media":"step3.webp","loop":true}],"do":["날개뼈 모으고 가슴을 위로 세우기","바는 가슴 가운데(유두 라인)로 내리기","손목은 팔꿈치 바로 위에 세우기"],"dont":["엉덩이를 벤치에서 띄우기","바를 목 쪽으로 내리기","가슴에 튕겨서 올리기"],"views":[{"label":"측면","file":"form"},{"label":"정면","file":"front"}]},
    {"id":"1123-incline-press-machine","dir":"media/form-1123-incline-press-machine/","date":"2026. 11. 23 (월)","exercise":"뉴텍 인클라인 프레스 머신","exercise_en":"Incline Press Machine","part":"가슴","targets":["윗가슴 (대흉근 상부)","전면 삼각근 · 삼두근"],"benefit":"윗가슴을 채워서 가슴 위쪽 라인을 두툼하게 만들어줘요. 원판 기구라 길이 정해져 있어 무게를 늘리기 좋아요","key_point":"손잡이는 윗가슴 옆까지, 내릴 땐 천천히!","good_points":[{"title":"손잡이를 윗가슴까지 내렸어요","desc":"내릴 때 손이 윗가슴 옆까지 와서 가슴이 충분히 늘어났어요"},{"title":"등을 등받이에 붙였어요","desc":"밀 때 허리가 뜨지 않고 등을 기댄 채 가슴으로만 밀었어요"},{"title":"끝까지 밀어 올렸어요","desc":"팔이 거의 펴질 때까지 밀어 올려서 윗가슴이 꽉 조여졌어요"}],"primary_muscles":[{"name":"대흉근 상부","where":"쇄골 아래 윗가슴"}],"secondary_muscles":"가슴 아래쪽 · 전면 삼각근 · 삼두근","feel_good":"쇄골 아래 윗가슴이 뻐근해요","feel_stop":"어깨 앞만 타거나, 손목이 꺾여서 아파요","steps":[{"title":"준비","desc":"등과 엉덩이를 등받이에 붙이고 날개뼈를 모아요. 손잡이를 밀어 올린 자리에서 시작해요","chip":"숨 들이마시기","media":"step1.jpg"},{"title":"내리기","desc":"팔꿈치를 몸통에서 45도 정도 벌리며 손잡이를 윗가슴 옆까지 천천히","chip":"3초 · 들이마시며","media":"step2.webp","loop":true},{"title":"밀어 올리기","desc":"윗가슴으로 밀어 처음 자리까지! 맨 위에서 팔꿈치는 살짝 굽힌 채","chip":"1~2초 · 후~ 내쉬며","media":"step3.webp","loop":true}],"do":["날개뼈 모으고 가슴을 위로 세우기","손잡이는 윗가슴 옆까지 내리기","손목은 팔꿈치 바로 위에 세우기"],"dont":["엉덩이를 들어 각도 없애기","팔꿈치를 옆으로 너무 벌리기","내리자마자 튕겨 올리기"],"also":["인클라인 프레스 머신"],"views":[{"label":"측면","file":"form"},{"label":"정면","file":"front"}]},
    {"id": "shoulder-press-machine", "dir": "media/form-shoulder-press-machine/", "date": "2026. 11. 19 (목)", "exercise": "숄더 프레스 머신", "exercise_en": "Shoulder Press Machine", "part": "어깨", "targets": ["삼각근 (앞·옆 어깨)", "삼두근 · 상부 승모근"], "benefit": "궤도가 정해져 있어서 어깨에만 집중하기 좋아요. 무게를 안전하게 올리며 어깨 볼륨을 채워줘요", "key_point": "손잡이는 어깨 높이까지 내리고, 등은 등받이에 딱 붙인 채 밀어 올린다!", "good_points": [{"title": "손잡이를 어깨 높이까지 내렸어요", "desc": "충분히 내려서 어깨를 넓은 범위로 썼어요"}, {"title": "머리 위로 쭉 밀었어요", "desc": "팔이 거의 펴질 때까지 밀어서 어깨가 끝까지 일했어요"}, {"title": "등을 등받이에 붙였어요", "desc": "허리가 뜨지 않아서 반동 없이 어깨로만 밀었어요"}], "primary_muscles": [{"name": "삼각근 전면·측면", "where": "어깨 앞과 옆, 동그란 부분"}], "secondary_muscles": "삼두근 · 상부 승모근 · 윗가슴", "feel_good": "어깨 앞·옆이 터질 듯 뻐근해요", "feel_stop": "허리가 찌릿하거나, 목·승모근만 뻐근해요", "steps": [{"title": "준비", "desc": "손잡이가 어깨 높이에 오게 의자를 맞추고 앉아요. 등·허리는 등받이에 붙이고 가슴은 펴요", "chip": "숨 들이마시기", "media": "step1.jpg"}, {"title": "밀어 올리기", "desc": "어깨로 밀어 머리 위로! 팔꿈치는 끝까지 잠그지 말고 살짝 남겨요", "chip": "1~2초 · 후~ 내쉬며", "media": "step2.webp", "loop": true}, {"title": "내리기", "desc": "버티면서 어깨 높이까지 천천히. 무게가 쿵 내려앉기 전에 다시 밀어요", "chip": "2~3초 · 들이마시며", "media": "step3.webp", "loop": true}], "do": ["등·허리는 등받이에 붙이기", "손잡이는 어깨 높이까지 내리기", "위에서 팔꿈치는 살짝 남기기"], "dont": ["허리를 젖히며 밀기", "어깨를 귀 쪽으로 으쓱하기", "무게를 쿵 내려놓고 쉬기"]},
    {"id": "standing-face-pull", "dir": "media/form-standing-face-pull/", "date": "2026. 11. 19 (목)", "exercise": "스탠딩 페이스풀", "exercise_en": "Standing Face Pull", "part": "어깨·등", "targets": ["후면 삼각근", "중부 승모근 · 능형근"], "benefit": "굽은 어깨를 펴주고 어깨 뒤쪽을 탄탄하게 만들어줘요", "key_point": "팔꿈치를 높게, 로프를 얼굴 양옆으로 벌려 당긴다!", "good_points": [{"title": "팔꿈치를 높게 들었어요", "desc": "어깨 높이로 팔꿈치를 들고 당겨서 뒤 어깨가 제대로 일했어요"}, {"title": "얼굴 쪽으로 끝까지 당겼어요", "desc": "손이 얼굴 옆까지 와서 날개뼈가 꽉 모였어요"}, {"title": "몸을 곧게 세웠어요", "desc": "서서 할 때 허리를 젖히지 않고 상체를 고정했어요"}], "primary_muscles": [{"name": "후면 삼각근", "where": "어깨 뒤쪽"}, {"name": "중부 승모근 · 능형근", "where": "날개뼈 사이"}], "secondary_muscles": "회전근개(극하근 · 소원근) · 하부 승모근", "feel_good": "어깨 뒤쪽과 날개뼈 사이가 뻐근해요", "feel_stop": "목·승모근이 뻐근하게 올라오거나, 팔만 아파요", "steps": [{"title": "준비", "desc": "케이블을 머리 높이에 맞추고 로프를 잡은 채 한 걸음 물러서요. 다리는 어깨너비, 배에 힘, 팔은 앞으로 쭉", "chip": "숨 들이마시기", "media": "step1.jpg"}, {"title": "당기기", "desc": "팔꿈치를 어깨 높이로 들고, 로프를 얼굴 양옆으로 벌리며 당겨요. 날개뼈를 모으고 1초!", "chip": "2초 · 후~ 내쉬며", "media": "step2.webp", "loop": true}, {"title": "돌아가기", "desc": "어깨가 앞으로 끌려가지 않게 버티면서 천천히 팔을 펴요", "chip": "3초 · 들이마시며", "media": "step3.webp", "loop": true}], "do": ["가슴 세우고 상체는 고정", "팔꿈치는 손보다 높게", "당긴 끝에서 날개뼈 모으고 1초 멈춤"], "dont": ["몸을 뒤로 젖혀 반동 쓰기", "어깨를 귀 쪽으로 으쓱 올리기", "로프를 턱·목 아래로 당기기"], "also": ["페이스풀", "시티드 페이스풀"], "views": [{"label": "정면", "file": "form"}, {"label": "측면", "file": "side"}]},
    {"id": "inner-thigh", "dir": "media/form-inner-thigh/", "date": "2026. 11. 18 (수)", "exercise": "이너타이", "exercise_en": "Inner Thigh (Adduction)", "part": "하체", "targets": ["내전근 (허벅지 안쪽)", "치골근 · 박근"], "benefit": "허벅지 안쪽을 채워서 하체가 꽉 차 보이고, 스쿼트·레그프레스 때 무릎과 골반을 단단히 잡아줘요", "key_point": "허벅지 안쪽으로 꽉 모으고, 벌릴 땐 천천히!", "good_points": [{"title": "넓게 벌린 데서 시작했어요", "desc": "다리를 충분히 벌려서 허벅지 안쪽이 늘어난 상태로 시작했어요"}, {"title": "끝까지 모았어요", "desc": "패드가 맞닿을 때까지 모아서 안쪽 허벅지가 꽉 조여졌어요"}, {"title": "손잡이 잡고 상체를 고정했어요", "desc": "몸이 앞뒤로 흔들리지 않아서 다리 힘으로만 했어요"}], "primary_muscles": [{"name": "내전근", "where": "허벅지 안쪽"}], "secondary_muscles": "치골근 · 박근", "feel_good": "허벅지 안쪽이 꽉 조이고 뻐근해요", "feel_stop": "사타구니가 찌릿하거나, 무릎 안쪽이 아파요", "steps": [{"title": "준비", "desc": "등받이에 기대 앉아 무릎 안쪽에 패드를 대요. 아프지 않을 만큼만 벌리고 손잡이를 잡아요", "chip": "숨 들이마시기", "media": "step1.jpg"}, {"title": "모으기", "desc": "허벅지 안쪽 힘으로 패드를 가운데까지! 끝에서 1초 꽉 조여요", "chip": "1~2초 · 후~ 내쉬며", "media": "step2.webp", "loop": true}, {"title": "천천히 벌리기", "desc": "버티면서 처음 자리까지. 안쪽이 쭉 늘어나는 걸 느껴요", "chip": "2~3초 · 들이마시며", "media": "step3.webp", "loop": true}], "do": ["시작 각도는 아프지 않을 만큼만", "끝에서 1초 꽉 모으기", "벌릴 땐 3초 버티기"], "dont": ["처음부터 너무 넓게 벌리기", "상체를 숙여 반동 쓰기", "벌릴 때 무게에 끌려가기"]},
    {"id": "outer-thigh", "dir": "media/form-outer-thigh/", "date": "2026. 11. 18 (수)", "exercise": "아웃타이 머신", "exercise_en": "Outer Thigh (Abduction)", "part": "엉덩이", "targets": ["중둔근 (엉덩이 옆)", "대둔근 · 대퇴근막장근"], "benefit": "엉덩이 옆을 깨워서 무릎이 안으로 모이지 않게 잡아줘요. 하체 메인 전에 하면 스쿼트·레그프레스가 더 안정돼요", "key_point": "엉덩이 옆으로 밀어내고, 끝에서 1초 버틴다!", "good_points": [{"title": "다리를 끝까지 벌렸어요", "desc": "패드를 바깥으로 끝까지 밀어서 엉덩이 옆이 제대로 일했어요"}, {"title": "엉덩이를 의자에 붙였어요", "desc": "벌릴 때 엉덩이가 들썩이지 않고 의자에 붙어 있었어요"}, {"title": "손잡이를 잡고 몸을 고정했어요", "desc": "상체가 흔들리지 않아서 반동 없이 밀었어요"}], "primary_muscles": [{"name": "중둔근", "where": "엉덩이 옆 위쪽"}], "secondary_muscles": "대둔근 위쪽 · 대퇴근막장근", "feel_good": "엉덩이 옆이 타는 듯 뻐근해요", "feel_stop": "허리가 뻐근하거나, 허벅지 옆만 당겨요", "steps": [{"title": "준비", "desc": "등받이에 기대 앉아 무릎 바깥쪽에 패드를 대요. 손잡이를 잡고 배에 힘을 줘요", "chip": "숨 들이마시기", "media": "step1.jpg"}, {"title": "벌리기", "desc": "엉덩이 옆으로 밀어내듯 다리를 끝까지! 끝에서 1초 버텨요", "chip": "1~2초 · 후~ 내쉬며", "media": "step2.webp", "loop": true}, {"title": "천천히 모으기", "desc": "무게에 끌려가지 말고 버티면서 처음 자리까지. 패드가 부딪히기 전에 다시 벌려요", "chip": "2~3초 · 들이마시며", "media": "step3.webp", "loop": true}], "do": ["엉덩이는 의자 끝까지 붙이기", "끝에서 1초 멈추기", "모을 때도 천천히 버티기"], "dont": ["상체를 앞뒤로 흔들어 반동 쓰기", "반만 벌리고 빨리 모으기", "무게를 쾅 내려놓기"]},
    {"id": "lying-leg-curl", "dir": "media/form-lying-leg-curl/", "date": "2026. 11. 18 (수)", "exercise": "라잉 레그컬", "exercise_en": "Lying Leg Curl", "part": "하체", "targets": ["햄스트링 (뒤허벅지)", "종아리(비복근)"], "benefit": "엎드려서 뒤허벅지만 따로 써요. 앞·뒤 허벅지 힘이 균형을 맞추면 무릎이 안정되고 하체가 탄탄해져요", "key_point": "골반은 패드에 붙이고, 뒤꿈치를 엉덩이 쪽으로 끝까지 당겼다 천천히 내린다!", "good_points": [{"title": "끝까지 당겼어요", "desc": "패드가 엉덩이 가까이 올 때까지 접어서 뒤허벅지가 꽉 조여졌어요"}, {"title": "손잡이 잡고 상체를 고정했어요", "desc": "앞 손잡이를 잡고 상체가 들썩이지 않아서 다리 힘으로만 했어요"}, {"title": "다리를 거의 다 펴고 시작했어요", "desc": "내릴 때 다리를 충분히 펴서 매 회 넓은 범위로 움직였어요"}], "primary_muscles": [{"name": "햄스트링", "where": "허벅지 뒤쪽"}], "secondary_muscles": "비복근(종아리)", "feel_good": "허벅지 뒤쪽이 타는 것처럼 뻐근해요", "feel_stop": "허리가 아프거나, 무릎 뒤·종아리에 쥐가 나요", "steps": [{"title": "준비", "desc": "무릎이 의자 끝에 오게 엎드리고 패드는 발목 바로 위에. 골반은 의자에 붙이고 손잡이를 잡아요", "chip": "숨 들이마시기", "media": "step1.jpg"}, {"title": "당기기", "desc": "뒤꿈치를 엉덩이 쪽으로 끝까지! 골반이 들리지 않게 의자에 눌러요", "chip": "1~2초 · 후~ 내쉬며", "media": "step2.webp", "loop": true}, {"title": "내리기", "desc": "버티면서 천천히. 다리를 거의 다 펴되 무게가 쿵 내려앉지 않게 해요", "chip": "2~3초 · 들이마시며", "media": "step3.webp", "loop": true}], "do": ["골반은 의자에 붙이기", "뒤꿈치를 끝까지 당기기", "내릴 땐 천천히"], "dont": ["엉덩이를 들어 반동 쓰기", "허리를 젖히기", "무게를 쿵 떨어뜨리기"]},
    {"id": "leg-press", "dir": "media/form-leg-press/", "date": "2026. 11. 18 (수)", "exercise": "레그프레스", "exercise_en": "Leg Press", "part": "하체", "targets": ["대퇴사두근 (앞허벅지)", "대둔근 · 내전근 · 햄스트링"], "benefit": "등을 기대고 하니까 허리 부담 없이 하체를 무겁게 쓸 수 있어요. 허벅지와 엉덩이를 같이 키워서 하체 라인이 단단해져요", "key_point": "무릎은 발끝 방향으로, 발바닥 전체로 민다!", "good_points": [{"title": "깊게 내렸어요", "desc": "무릎이 가슴 쪽까지 오도록 내려서 허벅지를 넓은 범위로 썼어요"}, {"title": "등과 엉덩이를 붙이고 했어요", "desc": "내려올 때 엉덩이가 들리지 않아서 허리가 안전했어요"}, {"title": "손잡이 잡고 몸을 고정했어요", "desc": "옆 손잡이를 꽉 잡아서 밀 때 몸이 밀려 올라가지 않았어요"}], "primary_muscles": [{"name": "대퇴사두근", "where": "허벅지 앞쪽"}], "secondary_muscles": "대둔근 · 내전근 · 햄스트링", "feel_good": "허벅지 앞과 엉덩이가 뻐근해요", "feel_stop": "허리·꼬리뼈가 아프거나, 무릎 안쪽이 찌릿해요", "steps": [{"title": "준비", "desc": "등과 엉덩이를 등받이에 붙이고 발은 골반 너비로 발판 가운데. 다리를 펴고 안전 걸쇠를 풀어요", "chip": "숨 들이마시기", "media": "step1.jpg"}, {"title": "내리기", "desc": "무릎을 발끝 방향으로 굽히며 천천히. 엉덩이가 들리기 직전까지 내려요", "chip": "2~3초 · 들이마시며", "media": "step2.webp", "loop": true}, {"title": "밀기", "desc": "발바닥 전체로 밀어 처음 자리까지! 맨 위에서 무릎은 완전히 펴서 잠그지 않아요", "chip": "1~2초 · 후~ 내쉬며", "media": "step3.webp", "loop": true}], "do": ["등·엉덩이는 등받이에 붙이기", "무릎은 발끝 방향으로", "발바닥 전체로 밀기"], "dont": ["엉덩이가 들릴 만큼 깊게 내리기", "무릎이 안으로 모이기", "맨 위에서 무릎 쾅 잠그기"], "also": ["레그프레스 (발 높게)"]},
    {"id":"db-lateral-raise","dir":"media/form-db-lateral-raise/","date":"2026. 11. 13 (금)","exercise":"사이드 레터럴 레이즈","exercise_en":"DB Lateral Raise","part":"어깨","targets":["측면 삼각근 (옆 어깨)","상부 승모근 · 전면 삼각근"],"benefit":"옆 어깨를 키워서 어깨 폭이 넓어 보이게 해줘요. 덤벨로 서서 하니까 양쪽 어깨를 따로 정확하게 쓸 수 있어요","key_point":"손이 아니라 팔꿈치로 옆으로 밀어 올리고, 어깨 높이에서 멈춘다!","good_points":[{"title":"어깨 높이까지 딱 올렸어요","desc":"팔이 바닥과 나란해질 때까지 올리고 그 이상은 안 올려서 옆 어깨에 정확히 들어갔어요"},{"title":"팔꿈치를 살짝 굽혀 고정했어요","desc":"팔꿈치 각도가 매 회 같아서 팔이 아니라 어깨로 들었어요"},{"title":"몸 반동 없이 들었어요","desc":"상체가 흔들리지 않고 서 있는 자세 그대로 반복했어요"}],"primary_muscles":[{"name":"측면 삼각근","where":"어깨 바깥쪽, 옆에서 볼 때 동그란 부분"}],"secondary_muscles":"전면 삼각근 · 상부 승모근 · 극상근","feel_good":"어깨 옆쪽이 화끈하게 타는 느낌이에요","feel_stop":"목·승모근만 뻐근하거나, 어깨 안쪽이 찌릿해요","steps":[{"title":"준비","desc":"발은 골반 너비, 배에 힘 주고 덤벨을 허벅지 옆에. 팔꿈치는 살짝 굽혀요","chip":"숨 들이마시기","media":"step1.jpg"},{"title":"들어 올리기","desc":"팔꿈치로 옆으로 밀듯이 어깨 높이까지! 새끼손가락 쪽이 살짝 높게","chip":"1~2초 · 후~ 내쉬며","media":"step2.webp","loop":true},{"title":"내리기","desc":"버티면서 허벅지 옆까지 천천히. 툭 떨어뜨리지 않아요","chip":"2~3초 · 들이마시며","media":"step3.webp","loop":true}],"do":["팔꿈치 살짝 굽힌 채 고정","어깨 높이까지만 올리기","내릴 때 천천히 버티기"],"dont":["어깨를 귀 쪽으로 으쓱하기","몸을 흔들어 반동으로 올리기","어깨보다 높이 올리기"],"also":["덤벨 사이드 레터럴 레이즈"]},
    {"id":"db-shoulder-press","dir":"media/form-db-shoulder-press/","date":"2026. 11. 13 (금)","exercise":"덤벨 숄더 프레스","exercise_en":"DB Shoulder Press","part":"어깨","targets":["삼각근 (앞·옆 어깨)","삼두근 · 상부 승모근"],"benefit":"어깨 전체를 크고 둥글게 키워줘요. 근비대 때 상체 볼륨을 채우는 대표 운동이에요","key_point":"덤벨은 귀 옆까지 내리고, 머리 위로 곧게 밀어 올린다!","good_points":[{"title":"귀 높이까지 충분히 내렸어요","desc":"팔꿈치가 90도 정도 될 때까지 내려서 어깨가 넓은 범위로 일했어요"},{"title":"머리 위로 끝까지 밀었어요","desc":"위에서 덤벨이 살짝 모일 때까지 밀어 올려 어깨를 끝까지 썼어요"},{"title":"등받이에 기대 안정적이었어요","desc":"허리를 등받이에 붙인 채 상체가 흔들리지 않고 반복했어요"}],"primary_muscles":[{"name":"삼각근 전면·측면","where":"어깨 앞과 옆, 동그란 부분"}],"secondary_muscles":"삼두근 · 상부 승모근 · 윗가슴","feel_good":"어깨 앞·옆이 터질 듯 뻐근해요","feel_stop":"허리가 찌릿하거나, 목·승모근만 뻐근해요","steps":[{"title":"준비","desc":"등받이를 세우고 앉아 허리를 붙여요. 덤벨을 귀 옆에 두고 팔꿈치는 손목 바로 아래","chip":"숨 들이마시기","media":"step1.jpg"},{"title":"밀어 올리기","desc":"어깨로 밀어 머리 위로! 위에서 덤벨이 살짝 모이고 팔꿈치는 살짝 굽힌 채","chip":"1~2초 · 후~ 내쉬며","media":"step2.webp","loop":true},{"title":"내리기","desc":"버티면서 귀 옆까지 천천히. 어깨가 쭉 늘어나는 걸 느껴요","chip":"2~3초 · 들이마시며","media":"step3.webp","loop":true}],"do":["허리는 등받이에 붙이기","손목은 팔꿈치 바로 위에","덤벨은 귀 옆까지 내리기"],"dont":["허리를 뒤로 젖혀서 밀기","어깨를 귀 쪽으로 으쓱하기","반만 내리고 빨리 올리기"]},
    {
      id: "assisted-chin-up",
      dir: "media/form-assisted-chin-up/",
      date: "2026. 11. 11 (수)",
      exercise: "어시스트 친업",
      exercise_en: "Assisted Chin-up",
      part: "등",
      targets: ["광배근 (등 날개)", "이두근 · 능형근"],
      benefit: "받침이 몸무게를 덜어줘서, 혼자서는 어려운 턱걸이를 바른 자세로 연습할 수 있어요",
      key_point: "턱이 손잡이 위로! 내려올 땐 버티면서 천천히",
      good_points: [
        { title: "아래에서 팔을 끝까지 폈어요", desc: "매번 매달린 자세에서 시작해서 등이 충분히 늘어났어요" },
        { title: "턱이 손잡이 높이까지 올라갔어요", desc: "끝까지 당겨 올려서 등 근육을 다 썼어요" },
        { title: "몸이 흔들리지 않았어요", desc: "무릎을 받침에 붙이고 곧게 올라가서 반동 없이 당겼어요" }
      ],
      primary_muscles: [{ name: "광배근", where: "겨드랑이 아래 옆구리 쪽 등" }],
      secondary_muscles: "이두근 · 능형근 · 대원근 · 후면 삼각근",
      feel_good: "겨드랑이 아래 등과 날개뼈 사이가 뻐근해요",
      feel_stop: "팔(이두)만 타거나, 어깨 앞이 찌릿해요",
      steps: [
        { title: "준비", desc: "받침 무게를 정하고(무거울수록 쉬워요) 손잡이를 잡은 뒤, 무릎을 받침에 올려 팔을 쭉 펴고 매달려요", chip: "숨 들이마시기", media: "step1.jpg" },
        { title: "올라가기", desc: "가슴을 손잡이 쪽으로 내밀며 팔꿈치를 옆구리로 끌어내려, 턱이 손잡이 위로", chip: "2초 · 후~ 내쉬며", media: "step2.webp", loop: true },
        { title: "내려가기", desc: "버티면서 천천히, 팔이 다 펴질 때까지 내려와요", chip: "3초 · 들이마시며", media: "step3.webp", loop: true }
      ],
      do: ["어깨를 아래로 내리고 시작하기", "가슴을 손잡이 쪽으로 내밀기", "내려올 때 3초 버티기"],
      dont: ["다리로 받침을 밀어 반동 쓰기", "어깨를 귀 쪽으로 으쓱 올리기", "반만 내려왔다 다시 올라가기"]
    },
    {
      id: "hammer-low-row",
      dir: "media/form-hammer-low-row/",
      date: "2026. 11. 11 (수)",
      exercise: "해머스트렝스 로우로우",
      also: ["해머 로우로우", "로우로우"],
      exercise_en: "Hammer Strength Low Row",
      part: "등",
      targets: ["광배근 아래쪽", "능형근 · 승모근 중부"],
      benefit: "낮은 곳에서 골반 쪽으로 당겨서, 등 아래쪽까지 꽉 찬 두꺼운 등을 만들어줘요",
      key_point: "가슴은 패드에 붙이고, 팔꿈치를 골반 쪽 뒤로 보낸다!",
      good_points: [
        { title: "가슴을 패드에 붙였어요", desc: "상체가 앞뒤로 흔들리지 않고 등으로만 당겼어요" },
        { title: "팔꿈치를 몸 뒤까지 보냈어요", desc: "끝까지 당겨서 등 가운데가 꽉 조여졌어요" },
        { title: "보낼 때 팔을 다 폈어요", desc: "등이 늘어나는 구간까지 써서 운동 범위가 넓었어요" }
      ],
      primary_muscles: [{ name: "광배근", where: "겨드랑이 아래~허리 위 등" }],
      secondary_muscles: "능형근 · 승모근 중부 · 후면 삼각근 · 이두근",
      feel_good: "허리 위 등 아래쪽과 날개뼈 사이가 뻐근해요",
      feel_stop: "허리가 아프거나, 팔뚝만 타요",
      steps: [
        { title: "준비", desc: "의자 높이를 맞춰 가슴을 패드에 붙이고, 손잡이를 잡아 팔을 쭉 펴요", chip: "숨 들이마시기", media: "step1.jpg" },
        { title: "당기기", desc: "팔꿈치를 몸통 옆에 붙인 채 골반 쪽 뒤로 끌어당기며 날개뼈를 모아요", chip: "2초 · 후~ 내쉬며", media: "step2.webp", loop: true },
        { title: "보내기", desc: "등이 앞으로 늘어나는 느낌으로 천천히, 팔이 다 펴질 때까지", chip: "3초 · 들이마시며", media: "step3.webp", loop: true }
      ],
      do: ["가슴은 끝까지 패드에 붙이기", "팔꿈치는 몸통 옆으로 붙여 당기기", "당긴 끝에서 날개뼈 1초 꽉"],
      dont: ["상체를 뒤로 젖혀 당기기", "어깨를 귀 쪽으로 으쓱 올리기", "손목을 꺾어 손으로만 당기기"]
    },
    {
      id: "reverse-pec-deck",
      dir: "media/form-reverse-pec-deck/",
      date: "2026. 11. 11 (수)",
      exercise: "리버스 펙덱 플라이",
      also: ["리버스 펙덱"],
      exercise_en: "Reverse Pec Deck Fly",
      part: "어깨·등",
      targets: ["후면 삼각근 (어깨 뒤)", "능형근 · 승모근 중부"],
      benefit: "잘 안 쓰는 어깨 뒤를 채워서 어깨가 입체적으로 보이고, 굽은 어깨도 펴줘요",
      key_point: "팔은 길게 편 채, 크게 반원을 그리며 뒤로!",
      good_points: [
        { title: "가슴을 패드에 붙였어요", desc: "상체가 고정돼서 어깨 뒤에만 힘이 들어갔어요" },
        { title: "팔을 길게 편 채로 벌렸어요", desc: "팔꿈치가 크게 굽지 않아 어깨 뒤를 정확히 썼어요" },
        { title: "돌아올 때 천천히 버텼어요", desc: "손잡이가 쾅 붙지 않게 조절해서 힘이 계속 유지됐어요" }
      ],
      primary_muscles: [{ name: "후면 삼각근", where: "어깨 뒤쪽 동그란 부분" }],
      secondary_muscles: "능형근 · 승모근 중부",
      feel_good: "어깨 뒤쪽이 화끈거려요",
      feel_stop: "목·어깨 위쪽(승모)만 뭉치거나, 어깨 앞이 찌릿해요",
      steps: [
        { title: "준비", desc: "손잡이가 어깨 높이에 오게 의자를 맞추고, 가슴을 패드에 붙인 채 손잡이를 잡아 팔을 앞으로 쭉", chip: "숨 들이마시기", media: "step1.jpg" },
        { title: "벌리기", desc: "팔꿈치를 살짝 굽힌 그대로, 크게 반원을 그리며 몸 옆까지 뒤로", chip: "2초 · 후~ 내쉬며", media: "step2.webp", loop: true },
        { title: "돌아오기", desc: "버티면서 천천히 앞으로, 손잡이끼리 닿기 직전까지", chip: "3초 · 들이마시며", media: "step3.webp", loop: true }
      ],
      do: ["손잡이는 어깨 높이에 맞추기", "팔꿈치 각도는 고정한 채 벌리기", "어깨는 내리고 목은 길게"],
      dont: ["어깨를 으쓱 올려 승모로 당기기", "상체를 패드에서 떼고 젖히기", "반동으로 휙 벌리기"]
    },
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
