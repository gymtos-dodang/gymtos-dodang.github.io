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
      "date": "2026. 11. 4",
      "title": "PT 노트가 열렸어요",
      "body": "근무가 바뀌어도 할 수 있게 요일 대신 DAY 1~6 순서대로 도는 루틴(v3)으로 바꿨어요. 운동 온 날 홈에서 '오늘 출석'을 누르면 다음 날 할 DAY를 알려드려요!",
      "link": "routine"
    }
  ],
  "next_class": null,
  "forms": [],
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
