/* 임애란 회원님 홈페이지 데이터 — 이 파일만 고치면 페이지 내용이 바뀜 */
/* 교대근무라 쉬는 요일이 매주 다름 → routine.rotation: 요일 대신 DAY 1~6 순서대로 (2026-11-04) */
window.MEMBER = {
  "name": "임애란",
  "sex": "F",
  "since": "2026. 11",
  "goal": "다이어트 · 주 6회",
  "journey": {
    "start": "2026-10-01"
  },
  "notices": [
    {
      "date": "2026. 11. 11",
      "title": "가슴 날 자세 복습지 4개가 올라왔어요",
      "body": "펙덱 플라이 · 체스트 프레스 머신 · 뉴텍 인클라인 프레스 머신 · 케이블 푸쉬다운 (11/11 수업). DAY 3 가슴 하는 날 운동 전에 한 번씩 보고 시작해요!",
      "link": "forms"
    },
    {
      "date": "2026. 11. 11",
      "title": "등 자세 복습지 3개가 올라왔어요",
      "body": "시티드 페이스풀 · 랫풀다운 · 뉴텍 시티드 로우 머신 (11/10 수업). DAY 2 등 하는 날 운동 전에 한 번씩 보고 시작해요!",
      "link": "forms"
    },
    {
      "date": "2026. 11. 4",
      "title": "PT 노트가 열렸어요",
      "body": "근무가 바뀌어도 할 수 있게 요일 대신 DAY 1~6 순서대로 도는 루틴(v3)으로 바꿨어요. 운동 온 날 홈에서 '오늘 출석'을 누르면 다음 날 할 DAY를 알려드려요!",
      "link": "routine"
    }
  ],
  "next_class": null,
  "forms": [
    {
      "id": "pec-deck-fly",
      "dir": "media/form-pec-deck-fly/",
      "date": "2026. 11. 11 (수)",
      "exercise": "펙덱 플라이",
      "exercise_en": "Pec Deck Fly",
      "part": "가슴",
      "targets": [
        "대흉근 (가슴)",
        "전면 삼각근"
      ],
      "benefit": "가슴 안쪽까지 모아줘서 가슴 가운데 라인이 또렷해져요. 팔이 아닌 가슴만 쓰는 감각을 익히기 좋아요",
      "key_point": "팔로 당기지 말고, 가슴으로 껴안듯이 모은다!",
      "good_points": [
        {
          "title": "등을 등받이에 붙이고 했어요",
          "desc": "모을 때 상체가 앞으로 따라 나오지 않아서 가슴만 일했어요"
        },
        {
          "title": "모은 자리에서 잠깐 버텼어요",
          "desc": "손잡이를 가슴 앞에서 붙인 채 멈춰서 가슴 안쪽이 꽉 조였어요"
        },
        {
          "title": "천천히 넓게 벌렸어요",
          "desc": "무게에 끌려가지 않고 버티면서 벌려서 가슴이 충분히 늘어났어요"
        }
      ],
      "primary_muscles": [
        {
          "name": "대흉근",
          "where": "가슴 앞, 특히 가운데 안쪽"
        }
      ],
      "secondary_muscles": "전면 삼각근 · 이두근(짧은 쪽)",
      "feel_good": "가슴 가운데가 꽉 조이고, 벌릴 때 가슴이 쭉 늘어나요",
      "feel_stop": "어깨 앞이 찌릿하거나, 팔 안쪽만 아파요",
      "steps": [
        {
          "title": "준비",
          "desc": "손잡이가 가슴 높이에 오게 의자를 맞추고 등을 붙여요. 가슴을 열고 팔꿈치는 살짝 굽힌 채 손잡이를 잡아요",
          "chip": "숨 들이마시기",
          "media": "step1.jpg"
        },
        {
          "title": "모으기",
          "desc": "큰 나무를 껴안듯이 가슴 앞으로 모아요. 손잡이가 만나면 1초 꽉!",
          "chip": "2초 · 후~ 내쉬며",
          "media": "step2.webp",
          "loop": true
        },
        {
          "title": "천천히 벌리기",
          "desc": "무게를 버티면서 가슴이 늘어나는 느낌으로, 어깨 옆 선까지만 천천히 벌려요",
          "chip": "3초 · 들이마시며",
          "media": "step3.webp",
          "loop": true
        }
      ],
      "do": [
        "등과 머리는 등받이에 붙인 채로",
        "팔꿈치는 살짝 굽힌 모양 그대로",
        "모은 끝에서 1초 쥐어짜기"
      ],
      "dont": [
        "어깨를 귀 쪽으로 으쓱 올리기",
        "팔꿈치를 굽혔다 폈다 하며 팔로 밀기",
        "벌릴 때 어깨 뒤까지 너무 깊게 젖히기"
      ]
    },
    {
      "id": "chest-press-machine",
      "dir": "media/form-chest-press-machine/",
      "date": "2026. 11. 11 (수)",
      "exercise": "체스트 프레스 머신",
      "exercise_en": "Chest Press Machine",
      "part": "가슴",
      "targets": [
        "대흉근 (가슴)",
        "전면 삼각근 · 삼두근"
      ],
      "benefit": "가슴 앞판을 탄탄하게 채우고 미는 힘을 길러줘요. 손잡이 길이 정해져 있어 자세 잡기 쉬워요",
      "key_point": "날개뼈는 모으고, 가슴으로 밀어낸다!",
      "good_points": [
        {
          "title": "등을 등받이에 붙이고 밀었어요",
          "desc": "밀 때 몸이 앞으로 따라 나오지 않아서 힘이 가슴에 모였어요"
        },
        {
          "title": "앞으로 끝까지 밀어냈어요",
          "desc": "손잡이를 쭉 밀어서 가슴이 끝까지 모였어요"
        },
        {
          "title": "가슴 옆까지 천천히 돌아왔어요",
          "desc": "무게를 버티면서 손잡이가 가슴 옆까지 와서 가슴이 충분히 늘어났어요"
        }
      ],
      "primary_muscles": [
        {
          "name": "대흉근",
          "where": "가슴 앞 전체"
        }
      ],
      "secondary_muscles": "전면 삼각근 · 삼두근",
      "feel_good": "가슴 가운데와 겨드랑이 앞쪽이 뻐근해요",
      "feel_stop": "어깨 앞이 찌릿하거나, 가슴은 그대로고 팔만 아파요",
      "steps": [
        {
          "title": "준비",
          "desc": "손잡이가 가슴 중간 높이에 오게 의자를 맞추고 등을 붙여요. 날개뼈를 모아 가슴을 열고, 손잡이는 가슴 옆에서 잡아요",
          "chip": "숨 들이마시기",
          "media": "step1.jpg"
        },
        {
          "title": "밀기",
          "desc": "가슴을 모은다는 느낌으로 앞으로 밀어요. 끝에서 팔꿈치는 살짝 굽힌 채 멈춰요",
          "chip": "1~2초 · 후~ 내쉬며",
          "media": "step2.webp",
          "loop": true
        },
        {
          "title": "돌아오기",
          "desc": "무게를 버티면서 손잡이가 가슴 옆에 올 때까지 천천히 돌아와요",
          "chip": "3초 · 들이마시며",
          "media": "step3.webp",
          "loop": true
        }
      ],
      "do": [
        "등과 머리는 등받이에 붙이기",
        "날개뼈 모으고 가슴 열기",
        "돌아올 때 가슴 옆까지 천천히"
      ],
      "dont": [
        "어깨를 으쓱 올리며 밀기",
        "팔꿈치를 쫙 펴서 잠그기",
        "돌아오자마자 튕겨서 밀기"
      ]
    },
    {
      "id": "incline-press-machine",
      "dir": "media/form-incline-press-machine/",
      "date": "2026. 11. 11 (수)",
      "exercise": "뉴텍 인클라인 프레스 머신",
      "exercise_en": "Newtech Incline Press",
      "part": "가슴",
      "targets": [
        "윗가슴 (대흉근 상부)",
        "전면 삼각근 · 삼두근"
      ],
      "benefit": "윗가슴을 채워서 쇄골 아래 라인이 탄탄해지고 가슴이 위까지 꽉 차 보여요",
      "key_point": "등은 붙이고, 윗가슴으로 비스듬히 밀어 올린다!",
      "good_points": [
        {
          "title": "등을 등받이에 붙이고 밀었어요",
          "desc": "몸이 앞으로 따라 나오지 않아서 각도가 그대로 유지됐어요"
        },
        {
          "title": "끝까지 밀어 올렸어요",
          "desc": "위에서 손잡이를 쭉 밀어서 윗가슴이 꽉 모였어요"
        },
        {
          "title": "가슴 옆까지 깊게 내렸어요",
          "desc": "손잡이가 윗가슴 옆까지 내려와서 가슴이 충분히 늘어났어요"
        }
      ],
      "primary_muscles": [
        {
          "name": "대흉근 상부",
          "where": "쇄골 아래 윗가슴"
        }
      ],
      "secondary_muscles": "가슴 아래쪽 · 전면 삼각근 · 삼두근",
      "feel_good": "쇄골 아래 윗가슴이 뻐근해요",
      "feel_stop": "어깨 앞만 타거나, 손목이 꺾여서 아파요",
      "steps": [
        {
          "title": "준비",
          "desc": "등과 엉덩이를 등받이에 붙이고 날개뼈를 모아요. 손잡이를 윗가슴 옆에서 잡아요",
          "chip": "숨 들이마시기",
          "media": "step1.jpg"
        },
        {
          "title": "밀어 올리기",
          "desc": "윗가슴으로 비스듬히 위로 밀어요. 맨 위에서 팔꿈치는 살짝 굽힌 채 멈춰요",
          "chip": "1~2초 · 후~ 내쉬며",
          "media": "step2.webp",
          "loop": true
        },
        {
          "title": "내리기",
          "desc": "무게를 버티면서 손잡이가 윗가슴 옆에 올 때까지 천천히 내려요",
          "chip": "3초 · 들이마시며",
          "media": "step3.webp",
          "loop": true
        }
      ],
      "do": [
        "날개뼈 모으고 가슴을 위로 세우기",
        "손잡이는 윗가슴 옆까지 내리기",
        "손목은 팔꿈치 바로 위에 세우기"
      ],
      "dont": [
        "엉덩이를 들어 각도 없애기",
        "어깨를 으쓱 올리며 밀기",
        "내리자마자 튕겨 올리기"
      ]
    },
    {
      "id": "cable-pushdown",
      "dir": "media/form-cable-pushdown/",
      "date": "2026. 11. 11 (수)",
      "exercise": "케이블 푸쉬다운",
      "exercise_en": "Cable Pushdown",
      "part": "팔",
      "targets": [
        "삼두근 (팔 뒤쪽)",
        "전완근"
      ],
      "benefit": "팔 뒤쪽 흔들리는 살을 탄탄하게 잡아줘서 팔뚝 라인이 정리돼요",
      "key_point": "팔꿈치는 옆구리에 고정, 아래로 끝까지 편다!",
      "good_points": [
        {
          "title": "상체를 곧게 세우고 했어요",
          "desc": "몸을 숙이거나 흔들지 않아서 팔 뒤쪽으로만 밀었어요"
        },
        {
          "title": "팔꿈치를 옆구리에 붙였어요",
          "desc": "팔꿈치가 앞뒤로 움직이지 않아서 삼두에 자극이 모였어요"
        },
        {
          "title": "아래에서 끝까지 폈어요",
          "desc": "팔이 다 펴질 때까지 밀어서 팔 뒤쪽이 꽉 조였어요"
        }
      ],
      "primary_muscles": [
        {
          "name": "삼두근",
          "where": "팔 뒤쪽 (팔뚝 살 부분)"
        }
      ],
      "secondary_muscles": "전완근 · 복부(몸통 고정)",
      "feel_good": "팔 뒤쪽이 뻐근하고 꽉 차올라요",
      "feel_stop": "팔꿈치 안쪽이 찌릿하거나, 어깨·손목이 먼저 아파요",
      "steps": [
        {
          "title": "준비",
          "desc": "케이블 앞에 서서 손잡이를 잡고, 팔꿈치를 옆구리에 붙여요. 손은 가슴 아래 높이에서 시작해요",
          "chip": "숨 들이마시기",
          "media": "step1.jpg"
        },
        {
          "title": "밀어 내리기",
          "desc": "팔꿈치는 그대로 두고 손만 허벅지 앞까지 쭉! 다 펴진 자리에서 1초 꽉",
          "chip": "1~2초 · 후~ 내쉬며",
          "media": "step2.webp",
          "loop": true
        },
        {
          "title": "올리기",
          "desc": "무게를 버티면서 손이 가슴 아래 높이에 올 때까지 천천히 올려요",
          "chip": "2~3초 · 들이마시며",
          "media": "step3.webp",
          "loop": true
        }
      ],
      "do": [
        "팔꿈치는 옆구리에 고정",
        "아래에서 팔 끝까지 펴기",
        "상체는 곧게, 배에 힘 주기"
      ],
      "dont": [
        "몸을 숙여 체중으로 누르기",
        "팔꿈치가 앞뒤로 따라 움직이기",
        "올릴 때 손이 얼굴까지 올라오기"
      ]
    }
  ,
    {
      "id": "seated-face-pull",
      "dir": "media/form-seated-face-pull/",
      "date": "2026. 11. 10 (화)",
      "exercise": "시티드 페이스풀",
      "exercise_en": "Seated Face Pull",
      "part": "어깨 · 등",
      "targets": [
        "후면 삼각근 (뒷어깨)",
        "중부 승모근 · 능형근"
      ],
      "benefit": "굽은 어깨를 뒤로 펴주고, 어깨 뒤쪽 라인을 매끈하게 정리해줘요",
      "key_point": "팔꿈치를 높게, 로프를 귀 옆으로 벌려 당긴다!",
      "good_points": [
        {
          "title": "팔꿈치를 높게 들고 당겼어요",
          "desc": "팔꿈치가 손보다 위에 있어서 어깨 뒤쪽에 자극이 제대로 갔어요"
        },
        {
          "title": "로프를 얼굴 양옆까지 벌렸어요",
          "desc": "양손이 귀 옆까지 와서 날개뼈가 꽉 모였어요"
        },
        {
          "title": "앉은 자세가 흔들리지 않았어요",
          "desc": "상체를 세운 채 버텨서 반동 없이 어깨·등으로만 당겼어요"
        }
      ],
      "primary_muscles": [
        {
          "name": "후면 삼각근",
          "where": "어깨 뒤쪽"
        },
        {
          "name": "중부 승모근 · 능형근",
          "where": "날개뼈 사이"
        }
      ],
      "secondary_muscles": "회전근개(극하근 · 소원근) · 하부 승모근",
      "feel_good": "어깨 뒤쪽과 날개뼈 사이가 뻐근해요",
      "feel_stop": "목·승모근이 위로 뻐근하게 올라오거나, 팔만 아파요",
      "steps": [
        {
          "title": "준비",
          "desc": "의자에 앉아 가슴을 세우고, 로프를 양손으로 잡아 팔을 케이블 쪽으로 쭉 뻗어요",
          "chip": "숨 들이마시기",
          "media": "step1.jpg"
        },
        {
          "title": "당기기",
          "desc": "팔꿈치를 어깨 높이로 들고, 로프를 귀 옆으로 벌리며 당겨요. 날개뼈 모으고 1초!",
          "chip": "2초 · 후~ 내쉬며",
          "media": "step2.webp",
          "loop": true
        },
        {
          "title": "돌아가기",
          "desc": "어깨가 앞으로 끌려가지 않게 버티면서 천천히 팔을 펴요",
          "chip": "3초 · 들이마시며",
          "media": "step3.webp",
          "loop": true
        }
      ],
      "do": [
        "가슴 세우고 상체는 고정",
        "팔꿈치는 손보다 높게",
        "당긴 끝에서 날개뼈 모으고 1초"
      ],
      "dont": [
        "몸을 뒤로 젖혀 반동 쓰기",
        "어깨를 귀 쪽으로 으쓱 올리기",
        "로프를 턱·목 아래로 당기기"
      ]
    },
    {
      "id": "lat-pulldown",
      "dir": "media/form-lat-pulldown/",
      "date": "2026. 11. 10 (화)",
      "exercise": "랫풀다운",
      "exercise_en": "Lat Pulldown",
      "part": "등",
      "targets": [
        "광배근 (등 옆 날개)",
        "대원근 · 능형근"
      ],
      "benefit": "등을 넓게 펴서 허리가 잘록해 보이는 뒷태 라인을 만들어줘요",
      "key_point": "가슴은 바 쪽으로 세우고, 팔꿈치로 끌어내린다!",
      "good_points": [
        {
          "title": "바를 가슴 위쪽까지 당겼어요",
          "desc": "쇄골 아래까지 내려와서 등이 끝까지 조여졌어요"
        },
        {
          "title": "가슴을 세우고 당겼어요",
          "desc": "상체를 살짝만 기울이고 가슴을 열어서 팔이 아니라 등으로 당겼어요"
        },
        {
          "title": "팔을 끝까지 펴서 올렸어요",
          "desc": "위에서 팔이 다 펴질 때까지 올라가서 등이 쭉 늘어났어요"
        }
      ],
      "primary_muscles": [
        {
          "name": "광배근",
          "where": "겨드랑이 아래 · 등 옆 날개"
        }
      ],
      "secondary_muscles": "대원근 · 능형근 · 중부 승모근 · 이두근",
      "feel_good": "겨드랑이 아래와 등 옆이 뻐근해요",
      "feel_stop": "팔뚝만 아프거나, 목 뒤가 뻐근해요",
      "steps": [
        {
          "title": "준비",
          "desc": "허벅지 패드에 다리를 끼우고, 어깨보다 조금 넓게 바를 잡아요. 가슴을 세우고 팔을 쭉 펴요",
          "chip": "숨 들이마시기",
          "media": "step1.jpg"
        },
        {
          "title": "당기기",
          "desc": "어깨를 내리고 팔꿈치를 옆구리로 끌어내리며 바를 쇄골 아래까지! 등 꽉 1초",
          "chip": "2초 · 후~ 내쉬며",
          "media": "step2.webp",
          "loop": true
        },
        {
          "title": "올리기",
          "desc": "바를 버티면서 팔이 다 펴질 때까지 천천히 올려요",
          "chip": "3초 · 들이마시며",
          "media": "step3.webp",
          "loop": true
        }
      ],
      "do": [
        "가슴은 세우고 시선은 바 쪽",
        "팔꿈치를 옆구리로 끌어내리기",
        "올릴 때 팔 끝까지 펴기"
      ],
      "dont": [
        "몸을 뒤로 눕히며 반동 쓰기",
        "바를 목 뒤로 당기기",
        "어깨를 으쓱 올린 채 당기기"
      ]
    },
    {
      "id": "newtech-seated-row",
      "dir": "media/form-newtech-seated-row/",
      "date": "2026. 11. 10 (화)",
      "exercise": "뉴텍 시티드 로우 머신",
      "exercise_en": "Newtech Seated Row",
      "part": "등",
      "targets": [
        "광배근 · 능형근",
        "중부 승모근 (날개뼈 사이)"
      ],
      "benefit": "등 두께를 채워주고, 굽은 어깨와 자세를 바로 세워줘요",
      "key_point": "허리는 세운 채, 팔꿈치로 뒤를 찌르듯 당긴다!",
      "good_points": [
        {
          "title": "허리를 세우고 앉았어요",
          "desc": "당길 때 몸이 뒤로 눕지 않아서 등으로만 당겼어요"
        },
        {
          "title": "팔꿈치를 몸 옆까지 보냈어요",
          "desc": "손잡이를 몸통까지 당겨서 날개뼈 사이가 꽉 조여졌어요"
        },
        {
          "title": "발판을 단단히 디뎠어요",
          "desc": "하체가 받쳐줘서 펼 때 몸이 앞으로 끌려가지 않았어요"
        }
      ],
      "primary_muscles": [
        {
          "name": "광배근",
          "where": "겨드랑이 아래 등 날개"
        },
        {
          "name": "능형근 · 중부 승모근",
          "where": "날개뼈 사이"
        }
      ],
      "secondary_muscles": "대원근 · 후면 삼각근 · 이두근",
      "feel_good": "날개뼈 사이와 등 옆이 뻐근해요",
      "feel_stop": "허리가 찌릿하거나, 팔뚝만 아파요",
      "steps": [
        {
          "title": "준비",
          "desc": "의자에 앉아 발판에 발을 대고 손잡이를 잡아요. 허리를 세우고 팔을 앞으로 쭉 펴요",
          "chip": "숨 들이마시기",
          "media": "step1.jpg"
        },
        {
          "title": "당기기",
          "desc": "팔꿈치로 뒤를 찌르듯 손잡이를 몸 옆까지! 날개뼈를 꽉 모으고 1초",
          "chip": "1~2초 · 후~ 내쉬며",
          "media": "step2.webp",
          "loop": true
        },
        {
          "title": "펴주기",
          "desc": "버티면서 팔을 앞으로 쭉. 날개뼈가 벌어지며 등이 늘어나는 걸 느껴요",
          "chip": "2~3초 · 들이마시며",
          "media": "step3.webp",
          "loop": true
        }
      ],
      "do": [
        "허리 세우고 가슴은 앞으로",
        "팔꿈치는 몸통 옆으로 뒤까지",
        "끝에서 날개뼈 1초 모으기"
      ],
      "dont": [
        "상체를 뒤로 젖혀 당기기",
        "어깨를 으쓱하며 당기기",
        "펼 때 무게에 끌려가 허리 굽히기"
      ]
    }
  ],
  "routine": {
    "version": "v3",
    "updated": "2026. 11. 4",
    "rotation": true,
    "rotation_start": "2026-11-04",
    "title": "주 6회 · 다이어트 순환 루틴",
    "plan": [
      "DAY 1~6 순서대로 돌리기",
      "쉬는 날은 근무표 따라",
      "매일 마무리 유산소 20분"
    ],
    "key_point": "요일 말고 순서! 쉬고 나면 다음 DAY부터 이어서",
    "note": "세트 사이 1분 30초~2분 쉬기 · 덤벨 무게는 한 손 기준 · 야간 근무 다음 날은 무게 한 칸 낮춰도 괜찮아요",
    "cardio": {
      "minutes": 20,
      "options": "경사 걷기 · 천국의 계단 · 사이클 중 택1"
    },
    "days": [
      {
        "day": "DAY 1",
        "part": "하체",
        "en": "Lower Body",
        "cardio": true,
        "items": [
          {
            "name": "고블릿 스쿼트",
            "en": "Goblet Squat",
            "icon": "goblet_squat",
            "tag": "워밍업",
            "tip": "가슴 세우고 깊이 앉기",
            "sets": [
              [
                20,
                6
              ],
              [
                15,
                8
              ]
            ]
          },
          {
            "name": "이너타이",
            "en": "Inner Thigh",
            "icon": "inner_thigh",
            "tag": "선행",
            "tip": "천천히 모으고 버티기",
            "sets": [
              [
                20,
                15
              ],
              [
                15,
                20
              ],
              [
                12,
                25
              ]
            ]
          },
          {
            "name": "아웃타이 머신",
            "en": "Outer Thigh",
            "icon": "outer_thigh_pin",
            "tag": "선행",
            "tip": "엉덩이 옆으로 밀기",
            "sets": [
              [
                20,
                20
              ],
              [
                15,
                25
              ],
              [
                12,
                30
              ]
            ]
          },
          {
            "name": "레그프레스",
            "en": "Leg Press",
            "icon": "leg_press",
            "tag": "메인",
            "tip": "무릎 끝까지 펴지 않기",
            "sets": [
              [
                15,
                50
              ],
              [
                12,
                55
              ],
              [
                10,
                55
              ],
              [
                8,
                60
              ]
            ]
          }
        ]
      },
      {
        "day": "DAY 2",
        "part": "등",
        "en": "Back",
        "cardio": true,
        "items": [
          {
            "name": "시티드 페이스풀",
            "en": "Seated Face Pull",
            "icon": "face_pull",
            "tag": "워밍업",
            "tip": "날개뼈 모으며 얼굴 쪽으로",
            "sets": [
              [
                20,
                10
              ],
              [
                15,
                15
              ]
            ]
          },
          {
            "name": "랫풀다운",
            "en": "Lat Pulldown",
            "icon": "lat_pulldown",
            "tag": "메인",
            "tip": "팔꿈치로 당기기",
            "sets": [
              [
                15,
                25
              ],
              [
                12,
                25
              ],
              [
                10,
                30
              ],
              [
                8,
                30
              ]
            ]
          },
          {
            "name": "뉴텍 시티드 로우 머신",
            "en": "Seated Row",
            "icon": "seated_row_machine",
            "tip": "가슴 패드 붙이고 당기기",
            "sets": [
              [
                12,
                25
              ],
              [
                12,
                25
              ],
              [
                12,
                25
              ]
            ]
          }
        ]
      },
      {
        "day": "DAY 3",
        "part": "가슴",
        "en": "Chest",
        "cardio": true,
        "items": [
          {
            "name": "펙덱 플라이",
            "en": "Pec Deck Fly",
            "icon": "pec_deck",
            "tag": "워밍업",
            "tip": "가슴 모은다는 느낌",
            "sets": [
              [
                20,
                15
              ],
              [
                15,
                15
              ]
            ]
          },
          {
            "name": "체스트 프레스 머신",
            "en": "Chest Press",
            "icon": "chest_press",
            "tag": "메인",
            "tip": "가슴 펴고 밀기",
            "sets": [
              [
                15,
                20
              ],
              [
                12,
                20
              ],
              [
                10,
                25
              ],
              [
                8,
                25
              ]
            ]
          },
          {
            "name": "인클라인 덤벨 프레스",
            "en": "Incline DB Press",
            "icon": "incline_db_press",
            "tip": "윗가슴으로 밀기",
            "sets": [
              [
                12,
                6
              ],
              [
                12,
                6
              ],
              [
                12,
                6
              ]
            ]
          },
          {
            "name": "케이블 푸쉬다운",
            "en": "Cable Pushdown",
            "icon": "cable_pushdown",
            "tip": "팔꿈치 옆구리 고정",
            "sets": [
              [
                15,
                15
              ],
              [
                15,
                15
              ],
              [
                15,
                15
              ]
            ]
          }
        ]
      },
      {
        "day": "DAY 4",
        "part": "엉덩이",
        "en": "Glute",
        "cardio": true,
        "items": [
          {
            "name": "이너타이",
            "en": "Inner Thigh",
            "icon": "inner_thigh",
            "tag": "선행",
            "tip": "천천히 모으고 버티기",
            "sets": [
              [
                20,
                15
              ],
              [
                15,
                20
              ],
              [
                12,
                25
              ]
            ]
          },
          {
            "name": "플레이트 아웃타이",
            "en": "Outer Thigh · Plate",
            "icon": "outer_thigh_plate",
            "tag": "선행",
            "tip": "엉덩이 옆으로 밀기",
            "sets": [
              [
                20,
                15
              ],
              [
                15,
                20
              ],
              [
                12,
                25
              ]
            ]
          },
          {
            "name": "힙쓰러스트 머신",
            "en": "Hip Thrust",
            "icon": "hip_thrust",
            "tag": "메인",
            "tip": "맨 위에서 엉덩이 꽉",
            "sets": [
              [
                15,
                35
              ],
              [
                12,
                35
              ],
              [
                10,
                40
              ],
              [
                8,
                40
              ]
            ]
          },
          {
            "name": "레그프레스 (발 높게)",
            "en": "Leg Press · High",
            "icon": "leg_press",
            "tip": "발 높게, 뒤꿈치로 밀기",
            "sets": [
              [
                15,
                45
              ],
              [
                15,
                45
              ],
              [
                15,
                45
              ]
            ]
          }
        ]
      },
      {
        "day": "DAY 5",
        "part": "어깨",
        "en": "Shoulder",
        "cardio": true,
        "items": [
          {
            "name": "사이드 레터럴 레이즈 머신",
            "en": "Standing Machine",
            "icon": "lateral_raise_standing",
            "tag": "워밍업",
            "tip": "가볍게 어깨 풀기",
            "sets": [
              [
                20,
                5
              ],
              [
                15,
                10
              ]
            ]
          },
          {
            "name": "숄더 프레스 머신",
            "en": "Shoulder Press",
            "icon": "shoulder_press",
            "tag": "메인",
            "tip": "허리 등받이에 붙이기",
            "sets": [
              [
                15,
                15
              ],
              [
                12,
                20
              ],
              [
                10,
                20
              ],
              [
                8,
                20
              ]
            ]
          },
          {
            "name": "사이드 레터럴 레이즈",
            "en": "Lateral Raise",
            "icon": "lateral_raise",
            "tip": "어깨 으쓱 금지",
            "sets": [
              [
                15,
                4
              ],
              [
                15,
                4
              ],
              [
                15,
                4
              ]
            ]
          },
          {
            "name": "리버스 펙덱",
            "en": "Reverse Pec Deck",
            "icon": "reverse_pec_deck",
            "tip": "날개뼈 모으며 옆으로",
            "sets": [
              [
                15,
                15
              ],
              [
                15,
                15
              ],
              [
                15,
                15
              ]
            ]
          }
        ]
      },
      {
        "day": "DAY 6",
        "part": "등 · 팔",
        "en": "Back & Arms",
        "cardio": true,
        "items": [
          {
            "name": "랫풀다운",
            "en": "Lat Pulldown",
            "icon": "lat_pulldown",
            "tag": "워밍업",
            "tip": "가볍게 등 풀기",
            "sets": [
              [
                20,
                20
              ],
              [
                15,
                20
              ]
            ]
          },
          {
            "name": "케이블 시티드 로우",
            "en": "Cable Seated Row",
            "icon": "cable_seated_row",
            "tag": "메인",
            "tip": "허리 세우고 배꼽 쪽으로",
            "sets": [
              [
                15,
                25
              ],
              [
                12,
                25
              ],
              [
                10,
                30
              ],
              [
                8,
                30
              ]
            ]
          },
          {
            "name": "덤벨 컬",
            "en": "Dumbbell Curl",
            "icon": "db_curl",
            "tip": "팔꿈치 몸통에 붙이기",
            "sets": [
              [
                15,
                4
              ],
              [
                15,
                4
              ],
              [
                15,
                4
              ]
            ]
          },
          {
            "name": "오버헤드 익스텐션",
            "en": "Overhead Ext.",
            "icon": "overhead_ext",
            "tip": "팔꿈치 머리 옆 고정",
            "sets": [
              [
                15,
                10
              ],
              [
                15,
                10
              ],
              [
                15,
                10
              ]
            ]
          }
        ]
      }
    ]
  },
  "diet": null
};
