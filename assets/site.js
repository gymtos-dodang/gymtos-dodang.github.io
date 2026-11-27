/* 이 사이트의 기본 정보 (2026-11-11) — 선생님 이름·지점·출석 창고 주소는 여기 한 곳만 고치면 회원 노트·선생님 페이지 전체에 반영됨 */
window.SITE = {
  trainer: "장동욱",                 /* 트레이너 이름 (화면에 "장동욱 트레이너"로 나옴) */
  brand: "JANG KAREDO",                   /* 센터 이름 */
  branch: "PT노트",                  /* 지점 이름 */
  site: "https://gymtos-dodang.github.io",   /* 사이트 주소 (og 미리보기 그림 등) */
  /* 2026-11-23 회원 홈 하단 "장동욱TR 운동 릴스" 줄 (시안 A) — 새 릴스를 올리면 맨 위에 한 줄 추가 (c: 커버 그림, 없으면 글자 카드) */
  wk2: true,                         /* 2026-11-27 운동 탭 리메이크(WK2)를 모든 회원에게 켬 — 예전 화면으로 돌리려면 false */
  pump: true,                        /* 2026-11-26 빼꼼 비서(오른쪽 아래 버튼)를 모든 회원 화면에 켬 — 끄려면 false */
  ig: "jangkaredo_970",
  reels: [
    { t: "사이드 레터럴", u: "https://www.instagram.com/reel/DgDIXFWDN1a/", c: "/assets/reels/DgDIXFWDN1a.jpg" },
    { t: "해머 로우로우", u: "https://www.instagram.com/reel/Df-Dd3gEkZl/", c: "/assets/reels/Df-Dd3gEkZl.jpg" },
    { t: "힙 쓰러스트", u: "https://www.instagram.com/reel/Df6GrrATWW1/", c: "/assets/reels/Df6GrrATWW1.jpg" },
    { t: "케이블 체스트프레스", u: "https://www.instagram.com/reel/DfnCmrVToCL/", c: "/assets/reels/DfnCmrVToCL.jpg" },
    { t: "아웃타이 윗엉덩이", u: "https://www.instagram.com/reel/DfVwU2iP4Gv/", c: "/assets/reels/DfVwU2iP4Gv.jpg" },
    { t: "아웃타이 굿모닝", u: "https://www.instagram.com/reel/DfBKgd4zptA/", c: "/assets/reels/DfBKgd4zptA.jpg" },
    { t: "회전발판 스쿼트", u: "https://www.instagram.com/reel/DevKrFfT9Gw/", c: "/assets/reels/DevKrFfT9Gw.jpg" },
    { t: "회전발판 와이드 스쿼트", u: "https://www.instagram.com/reel/DecEidzT5j7/", c: "/assets/reels/DecEidzT5j7.jpg" }
  ],
  att_api: "https://script.google.com/macros/s/AKfycbwtjTpk88xTWQcKXoaFX2qCYtKSzKoCOs-Us26k6QUbtKvewTaqJutJuA4RJjAmV-6bvA/exec"   /* 출석 창고(Apps Script 웹 앱) 주소 */
};
