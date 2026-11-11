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
