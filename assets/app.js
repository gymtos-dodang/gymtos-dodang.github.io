/* JANG KAREDO 회원 홈페이지 — window.MEMBER(data.js)를 읽어 화면을 그림 */
(function () {
  "use strict";
  var M = window.MEMBER;
  if (!M) return;
  /* 2026-11-19 PT 안내서 "체험 폰"(?demo&try — 안내서 안 iframe): 상담 손님이 실제 화면을 눌러 봐도
     회원님 기록이 바뀌지 않게 — 이 기기 저장은 메모리에만, 창고에는 읽기만 (쓰기·올리기는 막고 ok로 대답) */
  var TRY = /[?&]demo\b/.test(location.search) && /[?&]try\b/.test(location.search);
  var localStorage = window.localStorage, fetch = function () { return window.fetch.apply(window, arguments); };
  if (TRY) {
    var trMem = { "ptnote:theme": "light", "ptnote:tour": "done" };
    localStorage = {
      getItem: function (k) { return Object.prototype.hasOwnProperty.call(trMem, k) ? trMem[k] : null; },
      setItem: function (k, v) { trMem[k] = String(v); },
      removeItem: function (k) { delete trMem[k]; },
      key: function (i) { return Object.keys(trMem)[i] || null; },
      clear: function () { trMem = {}; }
    };
    fetch = function (u, o) {
      var q = String(u), w = (o && o.method && o.method !== "GET") || (/[?&]a=/.test(q) && !/[?&]a=(inbody|inbody_img|meal|meal_img)(&|$)/.test(q));
      if (w) return Promise.resolve({ ok: true, json: function () { return Promise.resolve({ ok: true }); }, text: function () { return Promise.resolve("{}"); } });
      return window.fetch.apply(window, arguments);
    };
  }
  var SCRIPT = document.currentScript;
  var BASE = SCRIPT ? SCRIPT.src.replace(/app\.js(\?.*)?$/, "") : "../../assets/";
  var THEME = M.sex === "F" ? "F" : "M";
  /* 사이트 기본 정보 (assets/site.js — 없으면 아래 기본값) */
  var SITE = window.SITE || {};
  var TRN = SITE.trainer || "장동욱", BRAND = SITE.brand || "JANG KAREDO", BRANCH = SITE.branch || "PT노트", BRN = BRAND + (BRANCH ? " " + BRANCH : "");
  /* 루틴 고치기 (2026-11-10): 선생님이 폰에서 고친 루틴은 출석 창고(시트 "루틴")에 저장되고,
     회원 휴대폰에는 ptnote:<주소>:routine 으로 기억해 둠 → 열자마자 고친 루틴으로 보임.
     기준(base) = data.js 루틴의 version|updated. data.js 루틴이 새로 올라오면(기준이 달라지면) data.js가 이김 */
  var RT_SLUG = window.ATT_SLUG || (location.pathname.match(/\/m\/([^\/]+)\//) || [, M.name])[1];
  var RT_LS = "ptnote:" + RT_SLUG + ":routine";
  function rtBase(r) { return r ? String(r.version || "") + "|" + String(r.updated || "") : ""; }
  function clone(o) { return o == null ? o : JSON.parse(JSON.stringify(o)); }
  var RT_ORIG = clone(M.routine || null), RT_BASE = rtBase(M.routine), NT_ORIG = (M.notices || []).slice();
  var RT_REC = null;   /* 지금 쓰고 있는 '폰에서 고친 루틴' 기록 {base, routine, notice?, at} */
  /* 전체 공지 (2026-11-11): 선생님 페이지에서 쓴 공지 — 출석 창고 "전체공지" 탭 → 모든 회원 노트 공지에 같이 나옴. 휴대폰엔 ptnote:bn */
  var BN = [];
  try { BN = JSON.parse(localStorage.getItem("ptnote:bn") || "[]") || []; } catch (e) { BN = []; }
  /* 업데이트 소식 데이터 (2026-11-20 — 2026-11-20 "업데이트 소식이랑 공지 합치기": 공지 목록에도 '업데이트' 공지로 같이 들어감 nBuild, 쓰는 법은 스킬 pt-update-tour·아래 업데이트 소식 칸) */
  function wnMuForm() {   /* 2026-11-22 근육 위치 소식 — 회원님 복습지 중 자극 부위가 있는 첫 복습지 */
    var fs = (typeof M !== "undefined" && M && M.forms) || [];
    for (var i = 0; i < fs.length; i++) if (!fs[i].simple && fs[i].primary_muscles && fs[i].primary_muscles.length) return fs[i];
    return null;
  }
  function wnMuOpen() { return !!document.querySelector(".rtsheet .mu-map"); }
  function wnMuClose() { var b = document.querySelector(".rtsheet-bg .rts-x"); if (b && b.closest(".rtsheet-bg").querySelector(".mu-map")) b.click(); }
  var WN = [
    { id: "2026-11-22", t: "자세 복습지 업데이트",
      items: ["🫀 03 자극 부위가 해부도 그림으로 바뀌었어요", "👆 근육 이름을 누르면 몸 어디인지 보여 줘요", "🔍 그 근육만 깜빡이며 크게 확대돼요"],
      steps: [
        { get h() { var f = wnMuForm(); return f ? "#form-" + f.id : "#forms"; }, need: function () { return !!wnMuForm(); }, s: ".mu-big, .muscle > img", t: "🫀 자극 부위가 해부도로 바뀌었어요", b: "진한 분홍은 주동근(메인), 연한 분홍은 보조근이에요.\n근육 결까지 보이는 그림이에요." },
        { get h() { var f = wnMuForm(); return f ? "#form-" + f.id : "#forms"; }, need: function () { return !!wnMuForm(); }, s: ".mname .mbtn", t: "👆 밑줄 친 근육 이름을 눌러 보세요", b: "이름을 누르면 그 근육이 몸 어디인지 보여 줘요.\n제가 한번 눌러 볼게요!" },
        { get h() { var f = wnMuForm(); return f ? "#form-" + f.id : "#forms"; }, need: function () { return !!wnMuForm(); }, tap: ".mname .mbtn", skipIf: wnMuOpen, leave: wnMuClose, s: ".rtsheet .mu-map", t: "🔍 그 근육만 깜빡이며 확대돼요", b: "잘 보이는 쪽(앞·뒤)으로 저절로 크게 보여 주고\n이름표도 붙어요." },
        { get h() { var f = wnMuForm(); return f ? "#form-" + f.id : "#forms"; }, need: function () { return !!wnMuForm(); }, tap: ".rtsheet .mu-c:not(.on)", leave: wnMuClose, s: ".rtsheet .mu-chips", t: "🔁 다른 근육도 바로 볼 수 있어요", b: "창 위 버튼을 누르면\n이 복습지의 다른 근육으로 바뀌어요." },
        { get h() { var f = wnMuForm(); return f ? "#form-" + f.id : "#forms"; }, need: function () { return !!wnMuForm(); }, tap: ".rtsheet .mu-z [data-mz=all]", leave: wnMuClose, s: ".rtsheet .mu-z", t: "🧍 앞모습 · 뒷모습 · 전체 몸", b: "버튼으로 보는 쪽을 바꿀 수 있어요.\n아래엔 그 근육의 위치와 하는 일 설명이 있어요." }
      ] },
    { id: "2026-11-21", t: "인바디 · 식단 기록 소식",
      items: ["📊 인바디 결과지 읽기가 더 정확해졌어요 (제미나이 AI)", "📸 '먹은 기록'이 '식단 기록'으로 이름이 바뀌었어요", "🛠️ 식단 기록은 아직 시험판이에요 — 곧 다 완성돼요"],
      steps: [
        { h: "#body", need: function () { return IB_ON; }, s: ".ib-add", t: "📊 인바디 읽기가 정확해졌어요", b: "결과지 사진을 올리면 이제 제미나이 AI가 읽어요.\n체중·골격근량·체지방이 더 정확하게 들어가요." },
        { h: "#diet-log", need: function () { return ML_ON; }, s: ".ml-add", t: "📸 이제 '식단 기록'이에요", b: "'먹은 기록'이 '식단 기록'으로 바뀌었어요.\n아직 시험판이라 조금 어색할 수 있어요.\n조만간 다 완성해서 다시 알려 드릴게요!" }
      ] },
    { id: "2026-11-20", t: "식단 탭 · 배지 케이스 업데이트",
      items: ["📸 식단 기록 — 사진만 찍으면 탄단지·칼로리 분석", "📖 식단 가이드 — 탄단지·식이섬유·끼니 이야기", "💊 영양제 가이드 — 남녀별 추천 조합", "🏅 홈 배지 케이스 새 디자인"],
      steps: [
        { h: "#home", s: ".hbcase", t: "배지 케이스가 새로워졌어요", b: "가운데는 내 최고 배지가 자동으로,\n둘레 6칸은 내가 고른 배지를 넣어요.\n누르면 크게, 꾹 누르면 넣고 빼기!" },
        { h: "#diet", s: ".db-tabs", t: "식단 탭에 칸이 늘었어요", b: "위 전환 칸에서\n식단 기록 · 식단 가이드로 바로 넘어가요." },
        { h: "#diet-log", need: function () { return ML_ON; }, s: ".ml-add", t: "📸 식단 기록", b: "먹기 전에 사진 한 장 찍어 올리면\n음식·양·탄단지·칼로리를 읽어 줘요.\n선생님도 같이 보고 한마디 남겨요." },
        { h: "#diet-guide", s: ".dg-sub", t: "📖 식단 가이드 · 💊 영양제", b: "탄단지가 왜 중요한지, 식이섬유, 끼니 거르면 안 되는 이유.\n옆 '영양제' 칸엔 남녀별 추천 조합이 있어요." }
      ] }
  ];
  function wnDate(w) { var m = String(w.id).match(/^(\d{4})-(\d{2})-(\d{2})/); return m ? m[1] + ". " + +m[2] + ". " + +m[3] : ""; }
  function nYmd(n) { var m = String(n.date || "").match(/(\d{4})\D+(\d{1,2})\D+(\d{1,2})/); return m ? +m[1] * 10000 + +m[2] * 100 + +m[3] : 0; }
  function nBuild() {   /* data.js 공지 + 전체 공지 + 폰에서 고친 루틴 공지 → 날짜 최신순(같은 날은 원래 순서) */
    var extra = BN.map(function (b) { return { date: b.date, title: b.title, body: b.body, link: b.link || "", all: 1 }; });
    WN.forEach(function (w) { extra.push({ date: wnDate(w), title: w.t, body: (w.items || []).join("\n"), wn: w.id }); });   /* 업데이트 소식 = 공지 (2026-11-20) */
    var nt = RT_REC && RT_REC.notice;
    if (nt && nt.title) extra.push(nt);
    var list = NT_ORIG.slice();
    extra.forEach(function (x) {
      if (list.some(function (n) { return n.date === x.date && n.title === x.title; })) return;
      var at = 0; while (at < list.length && nYmd(list[at]) > nYmd(x)) at++;
      list.splice(at, 0, x);
    });
    M.notices = list;
  }
  function rtUse(rec) {
    RT_REC = rec && rec.routine && rec.base === RT_BASE ? rec : null;
    M.routine = RT_REC ? clone(RT_REC.routine) : clone(RT_ORIG);
    nBuild();
  }
  nBuild();
  try { var rtc = JSON.parse(localStorage.getItem(RT_LS) || "null"); if (rtc) rtUse(rtc); } catch (e) {}
  /* 종목 이름 → 루틴일지 아이콘 (data.js에서 icon을 따로 주면 그게 우선) */
  /* 2026-11-18 장동욱 "유산소도 종목 추가 형태로, 유산소 칸 만들어서 일반 종목처럼" — 유산소 종목(세트 = ["20분", null], 무게 칸엔 "맨몸" 대신 "유산소") */
  var RT_CARDIO = ["러닝머신", "경사 걷기", "사이클", "스텝밀", "천국의 계단", "마이마운틴", "일립티컬", "로잉머신", "인터벌 러닝"];
  function isCardio(n) { return RT_CARDIO.indexOf(String(n || "").replace(/\s*\(.*\)\s*$/, "")) >= 0; }
  var ICON_BY_NAME = {
    "러닝머신": "treadmill", "인터벌 러닝": "treadmill", "경사 걷기": "incline_walk", "스텝밀": "stair_mill", "천국의 계단": "stair_mill", "마이마운틴": "my_mountain", "사이클": "bike", "일립티컬": "elliptical", "로잉머신": "rower",
    "플랫 덤벨프레스": "db_bench_press", "덤벨 벤치프레스": "db_bench_press", "바벨 벤치프레스": "bench_press", "벤치프레스": "bench_press",
    "인클라인 덤벨 프레스": "incline_db_press", "스미스 인클라인 프레스": "smith_incline_press", "인클라인 프레스 머신": "incline_machine_press", "머신 인클라인 프레스": "incline_machine_press",
    "체스트 프레스": "chest_press", "뉴텍 체스트 프레스 머신": "lying_chest_press", "뉴텍 체스트프레스 머신": "lying_chest_press", "펙덱 플라이": "pec_deck", "펙덱": "pec_deck", "케이블 푸쉬다운": "cable_pushdown",
    "오버헤드 익스텐션": "overhead_ext", "랫풀다운": "lat_pulldown", "클로즈그립 랫풀다운": "close_grip_pulldown", "와이드 풀다운": "wide_pulldown", "언더그립 랫풀다운": "underhand_pulldown",
    "스트레이트 암 풀다운": "straight_arm_pulldown", "뉴텍 시티드 로우 머신": "seated_row_machine", "뉴텍 엠토처 시티드 로우": "mtorture_row", "엠토처 시티드 로우": "mtorture_row", "시티드 로우 머신": "seated_row_machine", "시티드 로우": "seated_row_machine",
    "케이블 시티드 로우": "cable_seated_row", "언더그립 시티드 로우": "underhand_seated_row", "원암 덤벨 로우": "one_arm_row",
    "해머스트렝스 로우로우": "low_row", "로우로우": "low_row", "하이 로우": "high_row", "뉴텍 버티컬 풀다운": "vertical_pulldown", "버티컬 풀다운 머신": "vertical_pulldown", "버티컬 풀다운": "vertical_pulldown",
    "케이블 풀오버": "cable_pullover", "시티드 페이스풀": "face_pull", "페이스풀": "standing_face_pull", "스탠딩 페이스풀": "standing_face_pull", "티바로우 머신": "tbar_row", "프론트 로우 머신": "front_row", "리버스 펙덱": "reverse_pec_deck", "리버스 펙덱 플라이": "reverse_pec_deck", "케이블 체스트 프레스": "cable_chest_press",
    "어시스트 친업": "assisted_chin_up", "어시스티드 친업": "assisted_chin_up", "어시스트 풀업": "assisted_chin_up", "해머 로우로우": "low_row",
    "레그 익스텐션": "leg_extension", "이너타이": "inner_thigh", "아웃타이 머신": "outer_thigh_pin", "플레이트 아웃타이": "outer_thigh_plate",
    "아웃타이": "outer_thigh", "고블릿 스쿼트": "goblet_squat", "핵스쿼트": "hack_squat", "스미스 스쿼트": "smith_squat",
    "레그프레스": "leg_press", "핵프레스": "hack_press", "라잉 레그컬": "lying_leg_curl", "힙쓰러스트": "hip_thrust", "덤벨 RDL": "db_rdl",
    "백 익스텐션": "back_extension", "사이드 레터럴 레이즈": "lateral_raise", "레터럴 레이즈": "lateral_raise",
    "사이드 레터럴 레이즈 머신": "lateral_raise_standing", "레터럴 레이즈 머신": "lateral_raise_standing", "머신 레터럴 레이즈": "lateral_raise_standing",
    "스탠딩 사이드 레터럴 레이즈 머신": "lateral_raise_standing", "시티드 레터럴 레이즈": "seated_lateral_raise", "시티드 사이드 레터럴 레이즈": "seated_lateral_raise", "숄더 프레스 머신": "shoulder_press", "숄더 프레스": "shoulder_press", "비하인드 넥프레스": "shoulder_press",
    "덤벨 컬": "db_curl", "해머 컬": "db_curl", "덤벨 슈러그": "shrug", "플랭크": "plank",
    "스미스 벤치프레스": "smith_bench_press", "스미스 클로즈그립 벤치프레스": "smith_bench_press",
    "스미스 벤트오버 로우": "smith_row", "스미스 숄더 프레스": "smith_shoulder_press", "덤벨 오버헤드 익스텐션": "overhead_ext",
    "스미스 슈러그": "smith_shrug", "인클라인 덤벨 컬": "incline_db_curl", "스파이더 컬": "spider_curl", "프리처 컬 머신": "preacher_curl_machine", "프리쳐컬 머신": "preacher_curl_machine", "덤벨 숄더 프레스": "shoulder_press", "랙 밴드 푸쉬업": "band_push_up",
    "체스트 프레스 머신": "chest_press", "힙쓰러스트 머신": "hip_thrust", "케이블 힙 킥백": "cable_kickback", "힙 익스텐션": "back_extension"
  };
  function iconSrc(key) { return BASE + "icons/" + THEME + "/" + key + ".png"; }
  function iconOf(it) {
    if (it.icon) return it.icon;
    var n = it.name || "";
    return ICON_BY_NAME[n] || ICON_BY_NAME[n.replace(/\s*\(.*\)\s*$/, "")] || "dumbbell";
  }
  function mainItem(d) {
    var its = d.items || [];
    for (var i = 0; i < its.length; i++) if (its[i].tag === "메인") return its[i];
    return its[0] || { name: "" };
  }
  function dayIcon(d) { return !d || d.rest ? "rest" : d.cardio_only ? "treadmill" : d.pick ? "dumbbell" : iconOf(mainItem(d)); }
  /* 운동 아이콘: assets/exicons.js(움직이는 SVG, 2026-11-10)에 있는 종목은 그걸로, 없으면 예전 PNG. still = 멈춘 그림(작은 칸용) */
  function img(key, cls, still) {
    if (window.EXI && EXI.has(key)) return EXI.svg(key, { sex: THEME, cls: cls || "icn", still: !!still });
    return '<img class="' + (cls || "icn") + '" src="' + iconSrc(key) + '" alt="" loading="lazy">';
  }
  document.documentElement.setAttribute("data-sex", M.sex === "F" ? "F" : "M");
  /* 2026-11-18 장동욱 "PT노트 다크모드(자동) + 설정에서 풀고 킬 수 있게": 자동(폰 설정 따라) · 켜기 · 끄기
     → html[data-theme] (없으면 자동). CSS는 style.css DARK 블록(_tools/make_dark.py로 만듦) */
  var THEME_KEY = "ptnote:theme";
  function themeGet() { try { var v = localStorage.getItem(THEME_KEY); return v === "dark" || v === "light" ? v : "auto"; } catch (e) { return "auto"; } }
  function themeIsDark() { var v = themeGet(); if (v !== "auto") return v === "dark"; try { return matchMedia("(prefers-color-scheme: dark)").matches; } catch (e) { return false; } }
  function themeApply() {
    var v = themeGet(), h = document.documentElement;
    if (v === "auto") h.removeAttribute("data-theme"); else h.setAttribute("data-theme", v);
    var d = themeIsDark();
    Array.prototype.forEach.call(document.querySelectorAll('meta[name="theme-color"]'), function (mt) {
      if (!mt.hasAttribute("data-light")) mt.setAttribute("data-light", mt.getAttribute("content") || "");
      mt.setAttribute("content", d ? (h.getAttribute("data-sex") === "F" ? "#120A0D" : "#0B0B0D") : mt.getAttribute("data-light"));
    });
  }
  themeApply();
  try { matchMedia("(prefers-color-scheme: dark)").addEventListener("change", themeApply); } catch (e) {}
  /* 2026-11-13 회원별 테마 스킨 (data.js skin: "bunny" — 김지수님 토롱이). 기능은 그대로, 글꼴·색·꾸밈 그림만 얹음 */
  var SKIN = String(M.skin || "");
  if (SKIN) {
    document.documentElement.setAttribute("data-skin", SKIN);
    if (!document.getElementById("skinFont")) {
      var sfl = document.createElement("link"); sfl.id = "skinFont"; sfl.rel = "stylesheet";
      sfl.href = "https://fonts.googleapis.com/css2?family=Jua&display=swap"; document.head.appendChild(sfl);
    }
  }
  /* 2026-11-16 돌아다니는 고양이 (data.js pet: "cat" — 우유정님 "귀여운 고양이 돌아다니게"). 아래 탭 바로 위를 걸어다니다 앉아서 쉼.
     오리지널 그림(크림색 고양이 + 분홍 리본), 화면 위에 따로 떠 있는 칸(.petwalk)이라 본문(.view)엔 효과 없음 · pointer-events none · 폭 안 넓어짐(overflow hidden) */
  /* 먹이주머니 상태(2026-11-20) — 아래 '먹이주머니 · 동물 레벨업' 참고 */
  var PETS = [], PF = null, PF_LS = "ptnote:" + RT_SLUG + ":pet", PF_T = 0, PF_ON = false, PF_SV = false, PF_LV = [120, 500];
  try { PF = JSON.parse(localStorage.getItem(PF_LS) || "null"); } catch (e) {}
  var PET_OFF_K = "ptnote:" + RT_SLUG + ":petoff";   /* 2026-11-20 "이 시스템이 싫은 사람은 펫 집어넣기 옵션" — 켜면 동물·주머니 탭이 안 보임(먹이는 계속 모임) */
  function petOff() { try { return localStorage.getItem(PET_OFF_K) === "1"; } catch (e) { return false; } }
  function petOffSet(on) {
    try { if (on) localStorage.setItem(PET_OFF_K, "1"); else localStorage.removeItem(PET_OFF_K); } catch (e) {}
    document.documentElement.classList.toggle("pet-off", !!on);
    if (on) pfClose(); else if (M.pet && !COACH_MODE) setTimeout(pvPop, 600);
  }
  if (petOff()) document.documentElement.classList.add("pet-off");
  var PF_VIS = !M.pet;   /* pet 없는 회원 = 찾아오는 동물(2026-11-20) 대상 */
  if (PF_VIS && PF && PF.vp) M.pet = PF.vp;
  function petNight() { var h = new Date().getHours(); return h < 6; }   /* 밤 12시~새벽 6시 = 자는 시간 (2026-11-18) */
  function petSpawn(PET, F) {   /* F = 토롱이 친구 설정(2026-11-18), 없으면 주인공 */
    if (!F && (!PX[PET] || PETS.some(function (q) { return q.id === "main"; }))) return;
    if (!F) document.documentElement.setAttribute("data-pet", PET);   /* bunny = 김지수님 토롱이가 깡충깡충(2026-11-16) — 테마 그림 base.svg 그대로, 탭 위 빼꼼 그림은 숨김 */
    var wrap = document.createElement("div"); wrap.className = "petwalk"; wrap.setAttribute("aria-hidden", "true");
    if (F) wrap.innerHTML = '<div class="pet' + (PET === "bunny" ? " hop" : "") + ' sit fr fr-' + F.id + '">' + frSvg(F) + '</div>';
    else if (PET === "bunny") wrap.innerHTML = '<div class="pet hop sit">' + pfDeco(BNY_SVG, "main_b") + '</div>';
    else wrap.innerHTML = '<div class="pet sit pv-' + PET + '">' + pfDeco(petSvgOf(PET), PX[PET].key) + '</div>';
    document.body.appendChild(wrap);
    var pet = wrap.firstChild, x = F ? 30 + Math.random() * 220 : 16, HMS = (F && F.hop) || 420, dir = 1, tm = 0, W = PET === "bunny" ? 48 : 52, HOP = PET === "bunny", FLIP = true;
    pet.insertAdjacentHTML("beforeend", '<span class="pzz" aria-hidden="true"><i>z</i><i>z</i><i>Z</i></span>');
    if (petNight()) { pet.classList.add("sleep"); }
    var still = window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    function place(ms) { pet.style.transitionDuration = ms + "ms"; pet.style.transform = "translateX(" + x + "px) scaleX(" + (FLIP ? dir : 1) + ")"; }
    pet.style.setProperty("--hop", HMS / 1000 + "s");
    place(0);
    function next() {
      if (petNight()) { if (!pet.classList.contains("sleep")) { pet.classList.remove("walk", "jump"); pet.classList.add("sit", "sleep"); dir = 1; place(0); } tm = setTimeout(next, 60000); return; }
      pet.classList.remove("sleep");
      if (still || document.hidden) { tm = setTimeout(next, 4000); return; }
      var max = Math.max(20, wrap.clientWidth - W - 8), to = 8 + Math.random() * (max - 8);
      if (Math.abs(to - x) < 60) to = x < max / 2 ? max - Math.random() * 30 : 8 + Math.random() * 30;
      dir = to > x ? 1 : -1; place(0);
      if (HOP) {   /* 토끼는 미끄러지듯 걷지 않고 한 번에 한 칸씩 폴짝폴짝(뜀 420ms + 착지 110ms) */
        var n = Math.max(2, Math.round(Math.abs(to - x) / 46)), step = (to - x) / n;
        pet.classList.remove("sit");
        (function hop() {
          if (n-- <= 0) { pet.classList.add("sit"); tm = setTimeout(next, ((F && F.rest) || 3000) + Math.random() * 5500); return; }
          x += step; pet.classList.remove("jump"); void pet.offsetWidth; pet.classList.add("jump"); place(HMS);
          tm = setTimeout(function () { pet.classList.remove("jump"); tm = setTimeout(hop, 110); }, HMS);
        })();
        return;
      }
      var ms = Math.abs(to - x) * ((F && F.spd) || 26); x = to;
      pet.classList.remove("sit"); pet.classList.add("walk");
      requestAnimationFrame(function () { requestAnimationFrame(function () { place(ms); }); });
      tm = setTimeout(function () { pet.classList.remove("walk"); pet.classList.add("sit"); tm = setTimeout(next, ((F && F.rest) || 3500) + Math.random() * 6000); }, ms + 80);
    }
    /* 2026-11-17 장동욱 "만지면 좋아하거나 밥을 먹는다던지" — 동물을 누르면 멈춰서 반응: 쓰담쓰담(하트·웃는 눈) → 밥 먹기(당근·생선 냠냠) → 한마디(말풍선) 순서로 돌아가며.
       반응 그림(.petfx)은 화면 위 따로 떠 있는 칸이라 본문엔 영향 없음, 동물 몸만 눌림(.pet pointer-events auto) */
    var tapN = 0, busy = 0;
    var X = PX[PET] || PX.bunny, FOOD = X.ico(), LINES = X.lines;
    function fx(cls, html, dx, dy, ms) {
      var r = pet.getBoundingClientRect(), e = document.createElement("div");
      e.className = "petfx " + cls; e.innerHTML = html;
      e.style.left = (r.left + r.width / 2 + (dx || 0)) + "px"; e.style.top = (r.top + (dy || 0)) + "px";
      document.body.appendChild(e); setTimeout(function () { e.remove(); }, ms || 1600); return e;
    }
    function bubble(t, ms) { fx("pbub", esc(t), 0, -12, ms || 1900); }
    function hearts(n) { for (var i = 0; i < n; i++) (function (i) { setTimeout(function () { fx("pheart", "♥", [-W / 2 - 4, W / 2 + 4, -W / 2 + 6][i % 3], 18 + (i % 3) * 4, 1300); }, i * 140); })(i); }
    function freeze() {
      clearTimeout(tm);
      try { var mt = new DOMMatrix(getComputedStyle(pet).transform); x = mt.m41; } catch (e) {}
      pet.classList.remove("walk", "jump"); pet.classList.add("sit"); place(0);
    }
    function react() {
      if (busy) { hearts(1); return; }
      busy = 1; freeze();
      var n = tapN++, R = F ? F.tap(n) : { k: n % 3 }, kind = R.k, end = 1800, cls = [];
      if (pet.classList.contains("sleep")) {   /* 자는 중(밤 12시~6시): 깨면 잠꼬대·"얼른 자요" 하고 다시 쿨쿨 */
        var SL = X.sl;
        pet.classList.add("wake"); bubble(SL[n % SL.length], 2000);
        setTimeout(function () { pet.classList.remove("wake"); busy = 0; }, 1600); return;
      }
      if (kind === 0) {   /* 쓰담쓰담 → 웃는 눈 + 하트 */
        cls = R.happy === false ? ["pat"] : ["happy", "pat"]; if (R.h !== 0) hearts(R.h || 3);
        bubble(R.say || X.pat);
      } else if (kind === 1) {   /* 밥 먹기 → 앞에 음식, 세 입에 냠냠 */
        end = 2600; cls = ["eat"];
        var f = fx("pfood", FOOD, (FLIP ? dir : 1) * 24, 20, 2400);
        bubble(R.say || X.eat, 2300);
        setTimeout(function () { f.classList.add("bite1"); }, 700); setTimeout(function () { f.classList.add("bite2"); }, 1300); setTimeout(function () { f.classList.add("gone"); }, 1900);
        setTimeout(function () { pet.classList.add("happy"); hearts(2); }, 2000);
      } else if (kind === 2) {   /* 한마디 → 폴짝 */
        cls = ["pethi"];  /* 2026-11-22 "hi"는 다크모드 .hi(홈 칸) 바탕이 붙어 박스가 생겨 이름 바꿈 */ bubble(R.say || LINES[Math.floor(Math.random() * LINES.length)], 2100);
      } else {   /* 도망(수줍이) → 반대쪽 끝으로 쪼르르 */
        cls = ["shy"]; end = 1500; bubble(R.say, 1400);
        setTimeout(function () { var mx = Math.max(20, wrap.clientWidth - W - 8); dir = x < mx / 2 ? 1 : -1; x = dir > 0 ? mx : 8; place(650); }, 300);
      }
      if (R.blush) cls.push("blush");
      cls.forEach(function (c) { pet.classList.add(c); });
      try { navigator.vibrate && navigator.vibrate(12); } catch (e) {}
      setTimeout(function () { pet.classList.remove("happy", "pat", "eat", "pethi", "shy", "blush"); busy = 0; tm = setTimeout(next, 1500 + Math.random() * 2500); }, end);
    }
    /* 꾹(0.6초) 누르면 친구 도감 */
    (function () { var lt = 0; pet.addEventListener("pointerdown", function () { lt = setTimeout(function () { lt = -1; frDex(); }, 600); });
      ["pointerup", "pointercancel", "pointerleave"].forEach(function (ev) { pet.addEventListener(ev, function () { if (lt > 0) clearTimeout(lt); }); });
      pet.addEventListener("click", function (e) { if (lt === -1) { lt = 0; e.stopImmediatePropagation(); e.preventDefault(); } }, true); })();
    pet.addEventListener("click", function (e) { e.preventDefault(); e.stopPropagation(); react(); });
    /* 먹이주머니(2026-11-20): 동물 목록에 올림 — 레벨 치장(dress)·먹이 보고 달려가 먹기(goEat) */
    var PI = PFI[F ? F.id : X.key] || PFI.main_b;
    pet.insertAdjacentHTML("beforeend", '<span class="plv" aria-hidden="true">' + PI.fx.map(function (c) { return '<i>' + c + '</i>'; }).join("") + '</span>');
    pet.style.setProperty("--pfc", PI.c);
    var Q = { id: F ? F.id : "main", name: F ? F.name : X.qn, el: pet, wrap: wrap,
      svg: function () { return F ? frSvg(F) : pfDeco(petSvgOf(PET), X.key); },
      busy: function () { return !!busy; },
      dress: function () { var lv = pfLv(Q.id); pet.classList.remove("lv2", "lv3"); if (lv > 1) pet.classList.add("lv" + lv); },
      goEat: function (gx, n, pile) {
        busy = 1; freeze(); pet.classList.remove("sleep", "wake", "happy", "pat", "pethi", "shy");
        var mx = Math.max(20, wrap.clientWidth - W - 8);
        dir = gx > x + W / 2 ? 1 : -1;
        var tx = Math.max(0, Math.min(mx, dir > 0 ? gx - W * .8 : gx - W * .2));
        bubble(X.go, 1000);
        function eat() {
          dir = gx > x + W / 2 ? 1 : -1; place(0);
          pet.classList.remove("walk", "jump", "run"); pet.classList.add("sit", "eat", "pfeat");
          var T = Math.min(5200, 1500 + n * 130), sp = pile.querySelectorAll("span"), lab = pile.querySelector("b"), left = n;
          var bite = setInterval(function () {
            left = Math.max(0, left - Math.max(1, Math.round(n / 8)));
            if (lab) lab.textContent = left > 1 ? "×" + left : "";
            var keep = Math.ceil(sp.length * left / n); for (var i = keep; i < sp.length; i++) sp[i].classList.add("gone");
          }, T / 8);
          tm = setTimeout(function () {
            clearInterval(bite); pile.classList.add("bye"); setTimeout(function () { pile.remove(); }, 400);
            pet.classList.remove("eat", "pfeat"); pet.classList.add("happy"); hearts(3);
            var old = pfLv(Q.id); PF.xp = PF.xp || {}; PF.xp[Q.id] = (PF.xp[Q.id] || 0) + n; pfSave(true);
            var lv = pfLv(Q.id), xp = PF.xp[Q.id];
            if (lv > old) { Q.dress(); fx("pflvfx", "LEVEL UP!", 0, -16, 1800); setTimeout(function () { pfLevelUp(Q, lv); }, 900); }
            else bubble(lv < 3 ? "냠냠! 레벨업까지 " + (PF_LV[lv - 1] - xp) + "개" : X.full, 2000);
            try { navigator.vibrate && navigator.vibrate(15); } catch (e) {}
            tm = setTimeout(function () { pet.classList.remove("happy"); pet.style.setProperty("--hop", HMS / 1000 + "s"); busy = 0; tm = setTimeout(next, 2500); }, 1800);
          }, T);
        }
        if (Math.abs(tx - x) < 4) { tm = setTimeout(eat, 200); return; }
        if (HOP) {   /* 토끼는 빠르게 폴짝폴짝 */
          var hn = Math.max(1, Math.round(Math.abs(tx - x) / 44)), st = (tx - x) / hn, HF = Math.min(HMS, 300);
          pet.style.setProperty("--hop", HF / 1000 + "s"); pet.classList.remove("sit");
          (function hop() {
            if (hn-- <= 0) { pet.classList.add("sit"); eat(); return; }
            x += st; pet.classList.remove("jump"); void pet.offsetWidth; pet.classList.add("jump"); place(HF);
            tm = setTimeout(function () { pet.classList.remove("jump"); tm = setTimeout(hop, 60); }, HF);
          })();
        } else {   /* 고양이는 우다다 */
          var ms = Math.abs(tx - x) * 9; x = tx;
          pet.classList.remove("sit"); pet.classList.add("walk", "run");
          requestAnimationFrame(function () { requestAnimationFrame(function () { place(ms); }); });
          tm = setTimeout(eat, ms + 60);
        }
      } };
    PETS.push(Q); Q.dress();
    wrap.removeAttribute("aria-hidden"); pet.setAttribute("role", "button"); pet.setAttribute("aria-label", (F ? F.name : X.lab) + " 쓰다듬기");
    tm = setTimeout(next, F ? 900 + Math.random() * 3000 : 2500);
    window.addEventListener("resize", function () { var max = Math.max(20, wrap.clientWidth - W - 8); if (x > max) { x = max; place(0); } });
  }
  /* ---- 토롱이 친구들 (2026-11-18 장동욱 "각자 고유의 성격을 가진 토롱이들, 랜덤으로 나오는 날도 안 나오는 날도" + "약간 까칠한 토롱이도")
     주인공 토롱이(pet:"bunny") 회원만. 날마다(날짜+회원 주소로 정해짐) 0~2마리, 하루 동안은 같은 친구. 처음 만나면 "새 친구 발견!" + 도감(꾹 누르기) */
  var BNY_SVG = '<svg class="b-all" viewBox="0 -6 64 68" width="48" height="51"><g class="b-body"><circle cx="11" cy="44" r="5.2" fill="#fff" stroke="#B8325A" stroke-width="1.5"/><ellipse class="b-foot" cx="20" cy="56" rx="9" ry="3.8" fill="#FFE8EE" stroke="#B8325A" stroke-width="1.5"/><ellipse cx="25" cy="45" rx="14.5" ry="11.5" fill="#FFE8EE" stroke="#B8325A" stroke-width="1.5"/><!--B0--><g class="lvx lv-bag"><path d="M21.4 38.6Q24.4 49.6 34.4 50.9" fill="none" stroke="#C98A12" stroke-width="1.9" stroke-linecap="round"/><g transform="rotate(-16 17 43)"><rect x="10.8" y="36.6" width="12.4" height="13" rx="4.6" fill="#FFD15C" stroke="#B8325A" stroke-width="1.3"/><path d="M11.2 41.4q5.8 2.6 11.6 0" fill="none" stroke="#B8325A" stroke-width="1"/><rect x="13.4" y="43.6" width="7.2" height="4.4" rx="1.8" fill="#FFE9A8" stroke="#B8325A" stroke-width=".9"/><path d="M17 45.1c-.7-.8-1.9-.2-1.3.7l1.3 1.1 1.3-1.1c.6-.9-.6-1.5-1.3-.7z" fill="#FF6F91"/><path d="M13.2 38.6q1.6-.8 3.2 0" stroke="#fff" stroke-width="1" stroke-linecap="round" opacity=".75"/></g></g><ellipse class="b-paw" cx="38" cy="56" rx="4.6" ry="3.4" fill="#FFE8EE" stroke="#B8325A" stroke-width="1.5"/><!--B--></g><g class="b-ears"><g transform="translate(11.2 1.2) scale(.48)"><ellipse cx="45" cy="17" rx="9" ry="20" transform="rotate(-12 45 17)" fill="#FFE8EE" stroke="#B8325A" stroke-width="3"/><ellipse cx="45" cy="19" rx="4" ry="13" transform="rotate(-12 45 19)" fill="#F7A9BC"/><path d="M68 36 C66 20 72 5 81 6 C90 7 106 16 104 27 C102 34 92 31 84 27 C81 31 79 35 77 37 Z" fill="#FFE8EE" stroke="#B8325A" stroke-width="3" stroke-linejoin="round"/><path d="M74 30 C73 20 77 12 82 12 C88 13 97 19 97 24 C93 25 87 22 82 20 C79 23 77 27 76 31 Z" fill="#F7A9BC"/></g></g><g class="b-head"><g transform="translate(11.2 1.2) scale(.48)"><ellipse cx="60" cy="60" rx="34" ry="30" fill="#FFE8EE" stroke="#B8325A" stroke-width="3"/><path d="M27 50 Q60 34 93 50 L92 58 Q60 43 28 58 Z" fill="#D6204F" stroke="#B8325A" stroke-width="2" stroke-linejoin="round"/><g class="b-eyes"><ellipse cx="47" cy="65" rx="5.4" ry="7" fill="#4A2030"/><circle cx="49" cy="62" r="2.1" fill="#fff"/><circle cx="45.4" cy="67.6" r="1" fill="#fff"/><ellipse cx="73" cy="65" rx="5.4" ry="7" fill="#4A2030"/><circle cx="75" cy="62" r="2.1" fill="#fff"/><circle cx="71.4" cy="67.6" r="1" fill="#fff"/></g><g class="b-sleep"><path d="M40 64.5q7 6 14 0M66 64.5q7 6 14 0" fill="none" stroke="#4A2030" stroke-width="3.2" stroke-linecap="round"/></g><g class="b-slit"><path d="M40 66.2q7 1.6 14 0M66 66.2q7 1.6 14 0" fill="none" stroke="#4A2030" stroke-width="3.6" stroke-linecap="round"/><path d="M38.5 62.5q8.5 -2 17 0M64.5 62.5q8.5 -2 17 0" fill="none" stroke="#4A2030" stroke-width="1.6" stroke-linecap="round" opacity=".55"/></g><g class="b-happy"><path d="M41 67q6-8 12 0M67 67q6-8 12 0" fill="none" stroke="#4A2030" stroke-width="3.4" stroke-linecap="round"/></g><ellipse cx="37" cy="76" rx="6.5" ry="4" fill="#FF8FA8" opacity=".8"/><ellipse cx="83" cy="76" rx="6.5" ry="4" fill="#FF8FA8" opacity=".8"/><path class="b-mouth" d="M56 73 Q58 76 60 73 Q62 76 64 73" fill="none" stroke="#B8325A" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"/></g><!--H--></g></svg>';
  var FR = [
    { id: "muscle", name: "근육이", desc: "덤벨을 놓지 않는 운동광. 쉬는 시간에도 한 세트 더!", fur: "#ECECF1", line: "#5A5A66", band: "#2B2B33",
      acc: '',
      tap: function (n) { return [{ k: 2, say: "한 세트 더!" }, { k: 0, say: "근육 만져 볼래요? 💪", h: 2 }, { k: 2, say: "근육은 배신 안 해!" }][n % 3]; } },
    { id: "sleepy", name: "졸졸이", desc: "언제나 5분만 더… 느릿느릿 꾸벅꾸벅 조는 잠꾸러기.", fur: "#E1EEFB", line: "#4C6E9A", band: "#7FA8E0", hop: 640, rest: 6500,
      acc: '<text class="zz" x="50" y="8" font-size="10" font-weight="900" fill="#4C6E9A">z</text><text class="zz z2" x="56" y="1" font-size="7" font-weight="900" fill="#4C6E9A">z</text>',
      tap: function (n) { return { k: 0, happy: false, h: 1, say: ["으음… 5분만…", "졸려요… zZ", "어? 벌써 운동 가요?"][n % 3] }; } },
    { id: "bolt", name: "번개", desc: "가만히 있질 못하는 스피드광. 유산소가 제일 좋아!", fur: "#FFF3C2", line: "#A9810C", band: "#FF8A00", hop: 290, rest: 700,
      acc: '<path class="acc" d="M24.5 37.5l-4.2 7.2h4.1l-2.9 7.1 8.2-9.3h-4.2l3.1-5z" fill="#FFB300" stroke="#A9810C" stroke-width=".8" stroke-linejoin="round"/>',
      tap: function (n) { return { k: 2, say: ["유산소 가자!", "더 빨리! 더 빨리!", "심박수 올려~!"][n % 3] }; } },
    { id: "foodie", name: "냠냠이", desc: "볼이 빵빵한 먹보. 단백질은 절대 안 거른다.", fur: "#FFE6CF", line: "#BF6129", band: "#FF7A45",
      acc: '<circle cx="28.6" cy="37.8" r="3.9" fill="#FF9F80" opacity=".8"/><circle cx="51.2" cy="37.8" r="3.9" fill="#FF9F80" opacity=".8"/>',
      tap: function (n) { return n % 2 ? { k: 2, say: "단백질 챙겼어요?" } : { k: 1, say: "단백질 냠냠!" }; } },
    { id: "shy", name: "수줍이", desc: "부끄럼쟁이. 누르면 화들짝 놀라 도망가요.", fur: "#F1E6FB", line: "#7D5BA6", band: "#C9A6F0",
      acc: '<circle cx="28.6" cy="37.8" r="3.6" fill="#FF8FB1" opacity=".85"/><circle cx="51.2" cy="37.8" r="3.6" fill="#FF8FB1" opacity=".85"/>',
      tap: function (n) { return { k: 3, say: ["부, 부끄러워…", "히익!", "…아, 안녕"][n % 3] }; } },
    { id: "grumpy", name: "까칠이", desc: "툴툴대는 츤데레. 자꾸 만지면… 사실 챙겨 줘요.", fur: "#D5DAF0", line: "#2E3A6B", band: "#2E3A6B",
      acc: '<path d="M29.4 27.6l7 2.6M50.6 27.6l-7 2.6" stroke="#2E3A6B" stroke-width="1.7" stroke-linecap="round"/><g class="gblush"><circle cx="28.6" cy="37.8" r="3.6" fill="#FF7A9A" opacity=".9"/><circle cx="51.2" cy="37.8" r="3.6" fill="#FF7A9A" opacity=".9"/></g>',
      tap: function (n) { return n % 5 < 3 ? { k: 2, say: ["…뭐.", "만지지 마.", "흥."][n % 5] } : { k: 0, happy: false, h: 1, blush: 1, say: n % 5 === 3 ? "…그래도 오늘 운동은 했지?" : "…잘했네. 흥." }; } }
  ];
  var CAT_SVG = '<svg viewBox="0 0 64 48" width="52" height="39"><g class="p-walk"><path class="p-tail" d="M12 30 C4 28 3 18 8 14" fill="none" stroke="#F3D9B8" stroke-width="4.5" stroke-linecap="round"/><g class="p-legs"><g class="lg a"><path d="M16 30c-.6 4-.4 7 .3 10.5h4.4c.7-3.5.9-6.5.3-10.5z" fill="#EBCBA4"/><ellipse cx="19.2" cy="42.3" rx="3.3" ry="2.3" fill="#fff"/></g><g class="lg b"><path d="M22 30c-.6 4-.4 7 .3 10.5h4.4c.7-3.5.9-6.5.3-10.5z" fill="#FFF3E2"/><ellipse cx="25.2" cy="42.3" rx="3.3" ry="2.3" fill="#fff"/></g><g class="lg b"><path d="M36 30c-.6 4-.4 7 .3 10.5h4.4c.7-3.5.9-6.5.3-10.5z" fill="#EBCBA4"/><ellipse cx="39.2" cy="42.3" rx="3.3" ry="2.3" fill="#fff"/></g><g class="lg a"><path d="M42 30c-.6 4-.4 7 .3 10.5h4.4c.7-3.5.9-6.5.3-10.5z" fill="#FFF3E2"/><ellipse cx="45.2" cy="42.3" rx="3.3" ry="2.3" fill="#fff"/></g></g><ellipse cx="30" cy="30" rx="18" ry="9.5" fill="#FFF3E2"/><path d="M20 22.5c5-2.5 13-2.5 18 0" fill="none" stroke="#F3D9B8" stroke-width="3" stroke-linecap="round"/><g class="lvx lv-bag"><path d="M23.4 24.6v7M31.4 24.6v7" stroke="#C98A12" stroke-width="1.3" stroke-linecap="round"/><rect x="20.6" y="15.4" width="13" height="9.6" rx="3.6" fill="#FFD15C" stroke="#C98A12" stroke-width="1.2"/><rect x="23" y="19.4" width="8.2" height="4.2" rx="1.8" fill="#FFE9A8" stroke="#C98A12" stroke-width=".9"/><path d="M27.1 20.8c-.8-.9-2.1-.2-1.5.8l1.5 1.3 1.5-1.3c.6-1-.7-1.7-1.5-.8z" fill="#FF6F91"/></g><!--W--></g><g class="p-sit"><path class="p-tail" d="M16 42 C6 42 4 34 9 30" fill="none" stroke="#F3D9B8" stroke-width="4.5" stroke-linecap="round"/><path d="M16 44c0-14 6-21 15-21s15 7 15 21z" fill="#FFF3E2"/><ellipse cx="36" cy="43.5" rx="4" ry="2.5" fill="#fff"/><ellipse cx="45" cy="43.5" rx="4" ry="2.5" fill="#fff"/><g class="lvx lv-bag"><rect x="13.6" y="29" width="11" height="11" rx="3.6" fill="#FFD15C" stroke="#C98A12" stroke-width="1.2"/><rect x="15.6" y="33.6" width="7" height="4.4" rx="1.8" fill="#FFE9A8" stroke="#C98A12" stroke-width=".9"/><path d="M19.1 35c-.8-.9-2.1-.2-1.5.8l1.5 1.3 1.5-1.3c.6-1-.7-1.7-1.5-.8z" fill="#FF6F91"/><path d="M24.4 31.4q4 1 6.4 4" fill="none" stroke="#C98A12" stroke-width="1.2" stroke-linecap="round"/></g><!--S--></g><g class="p-head"><path d="M35 11l2-9 7 5z" fill="#FFF3E2"/><path d="M50 7l7-5 1 9z" fill="#FFF3E2"/><path d="M37.5 8.5l1-4 3.2 2.3z" fill="#F7B6C6"/><path d="M52.5 6.8l3.2-2.3.5 4z" fill="#F7B6C6"/><ellipse cx="46.5" cy="17" rx="12.5" ry="10.5" fill="#FFF3E2"/><path d="M40 7.5c2 2 4 2.5 6.500 2.500" fill="none" stroke="#F3D9B8" stroke-width="2.4" stroke-linecap="round"/><g class="p-eyes"><ellipse cx="42" cy="16.500" rx="1.7" ry="2.2" fill="#3A2E2E"/><ellipse cx="51.500" cy="16.500" rx="1.7" ry="2.2" fill="#3A2E2E"/></g><g class="p-sleep"><path d="M40.1 16q1.9 2 3.8 0M49.6 16q1.9 2 3.8 0" fill="none" stroke="#3A2E2E" stroke-width="1.1" stroke-linecap="round"/></g><g class="p-slit"><path d="M40.1 16.9q1.9 .5 3.8 0M49.6 16.9q1.9 .5 3.8 0" fill="none" stroke="#3A2E2E" stroke-width="1.3" stroke-linecap="round"/></g><g class="p-happy"><path d="M40 17.4q2-2.6 4 0M49.5 17.4q2-2.6 4 0" fill="none" stroke="#3A2E2E" stroke-width="1.3" stroke-linecap="round"/></g><ellipse cx="38.800" cy="20.500" rx="2.4" ry="1.500" fill="#F9B9C8" opacity=".8"/><ellipse cx="54.800" cy="20.500" rx="2.4" ry="1.500" fill="#F9B9C8" opacity=".8"/><path d="M46 19.300l.9 1 .9-1z" fill="#E98AA2"/><path d="M44.800 21.600q1.050 1.100 2.100 0q1.050 1.100 2.100 0" fill="none" stroke="#3A2E2E" stroke-width=".9" stroke-linecap="round"/><path d="M40.500 26.200l-4-2.200v4.400zM42.500 26.200l4-2.200v4.400z" fill="#D6204F"/><circle cx="41.500" cy="26.200" r="1.500" fill="#B8173F"/><!--H--></g></svg>';
  /* 2026-11-20 찾아오는 동물(장동욱 "강아지·라쿤·곰·수달 추가, 랜덤 지급 — 바로 말고 어느 정도 출석하고 열심히 하면 '강아지가 찾아왔어요!'", 고양이·토끼는 유정·지수 전용이라 뺌).
     pet 없는 회원: 먹이주머니 기준선부터 활동 점수(배지 4·인바디 3·출석 2·종목 ✓ 2) PV_N점 + 출석 PV_A일이 쌓이면 4마리 중 하나가 랜덤으로 찾아옴 → PF.vp에 저장(창고 mw:<주소>:pet).
     그림은 고양이 뼈대(CAT_SVG)에 귀·얼굴·꼬리·색만 바꿔 씀(mkPetSvg) → 걷기·앉기·반응·치장(W·S·H 칸) 그대로 동작. */
  var PV_T = ["dog", "raccoon", "bear", "otter"], PV_N = 60, PV_A = 3;
  function pvIco(vb, r, d, w0) { return function (w) { w = w || w0; return '<svg viewBox="' + vb + '" width="' + w + '" height="' + Math.round(w * r) + '">' + d + '</svg>'; }; }
  var PX = {
    bunny: { qn: "토롱이", lab: "토롱이", food: "당근", pat: "헤헤 좋아요!", eat: "당근 냠냠!", go: "당근이다!", full: "배불러요! ♡", key: "main_b",
      lines: ["오늘도 운동 가자!", "깡충! 같이 뛰자!", "물 많이 마셔요!", "스트레칭 잊지 마요!", "최고예요! ♡", "근육아 자라라~"],
      sl: ["쿨쿨… zZ", "흐암… 지금 몇 시예요? 얼른 자요!", "음냐… 근육은 잘 때 자라요…", "쉿… 내일 운동하려면 자야 해요"],
      ico: pvIco("0 0 40 40", 1, '<path d="M14 13c-3-6-1-10 2-11 1 3 0 6-1 8M17 12c0-6 4-9 7-8-1 3-3 6-5 8M18 13c3-4 8-5 10-3-2 2-6 4-9 4" fill="#5DBB63" stroke="#3E8E45" stroke-width="1.2" stroke-linejoin="round"/><path d="M13 14c4-4 10-3 11 2L12 37c-2 2-5 0-4-3z" fill="#FF8A3D" stroke="#D9601E" stroke-width="1.6" stroke-linejoin="round"/><path d="M13 21l4 1M11 27l4 1M10 32l3 .8" stroke="#D9601E" stroke-width="1.4" stroke-linecap="round"/>', 26) },
    cat: { qn: "냥이", lab: "고양이", food: "생선", pat: "골골골~ 좋아냥", eat: "생선 냠냠!", go: "생선이다냥!", full: "배부르다냥 ♡", key: "main_c",
      lines: ["냥~ 오늘도 화이팅!", "쓰담쓰담 좋아냥", "물 마셨냥?", "운동 끝나면 꿀잠냥", "멋지다냥 ♡", "스트레칭도 하자냥"],
      sl: ["쿨쿨… zZ", "흐암… 지금 몇 시냥? 얼른 자라냥", "음냐… 생선… 냠…", "쉿… 내일 운동하려면 자야 한다냥"],
      ico: pvIco("0 0 44 30", .68, '<path d="M6 15c6-10 22-12 30 0-8 12-24 10-30 0z" fill="#8EC5E8" stroke="#4E8DB8" stroke-width="1.6"/><path d="M36 15l7-7v14z" fill="#8EC5E8" stroke="#4E8DB8" stroke-width="1.6" stroke-linejoin="round"/><circle cx="13" cy="13" r="1.8" fill="#24324A"/><path d="M20 9c2 4 2 8 0 12M25 9c2 4 2 8 0 12" fill="none" stroke="#4E8DB8" stroke-width="1.2" stroke-linecap="round"/>', 30) },
    dog: { qn: "뭉치", lab: "뭉치", kind: "강아지", food: "뼈다귀", pat: "헥헥 좋아멍!", eat: "뼈다귀 냠냠!", go: "뼈다귀다멍!", full: "배부르다멍 ♡", key: "main_dog",
      desc: "꼬리를 살랑살랑 흔드는 황금빛 강아지. 산책이랑 공놀이가 제일 좋아!",
      lines: ["오늘도 운동 가자멍!", "꼬리 살랑살랑~ 최고멍!", "물 많이 마셨멍?", "스트레칭 같이 하자멍!", "멋져요! ♡", "근육 쑥쑥 자라라멍~"],
      sl: ["쿨쿨… zZ", "흐암… 지금 몇 시멍? 얼른 자요!", "음냐… 뼈다귀… 냠…", "쉿… 내일 운동하려면 자야 한다멍"],
      ico: pvIco("0 0 44 26", .6, '<g fill="#B98A52"><rect x="8" y="9.4" width="28" height="7.2" rx="3.6"/><circle cx="8.6" cy="8.6" r="5.2"/><circle cx="8.6" cy="17.4" r="5.2"/><circle cx="35.4" cy="8.6" r="5.2"/><circle cx="35.4" cy="17.4" r="5.2"/></g><g fill="#FFF3DC"><rect x="8" y="10.6" width="28" height="4.8" rx="2.4"/><circle cx="8.6" cy="8.6" r="3.8"/><circle cx="8.6" cy="17.4" r="3.8"/><circle cx="35.4" cy="8.6" r="3.8"/><circle cx="35.4" cy="17.4" r="3.8"/></g>', 30) },
    raccoon: { qn: "너굴이", lab: "너굴이", kind: "라쿤", food: "사과", pat: "너굴너굴~ 좋아!", eat: "사과 냠냠!", go: "사과다! 씻어 먹어야지!", full: "배부르다 너굴 ♡", key: "main_rac",
      desc: "눈가에 까만 가면을 쓴 장난꾸러기 라쿤. 먹기 전엔 꼭 손을 씻어요.",
      lines: ["오늘 운동도 몰래몰래 해치우자!", "너굴너굴~ 기분 최고!", "물 마셨어요? 난 사과 씻는 중!", "스트레칭은 꼼꼼하게!", "오늘도 멋져요 ♡", "근육은 내가 지켜 줄게!"],
      sl: ["쿨쿨… zZ", "흐암… 밤엔 원래 내가 노는 시간인데… 얼른 자요!", "음냐… 사과… 씻어야지…", "쉿… 내일 운동하려면 자야 해요"],
      ico: pvIco("0 0 40 40", 1, '<path d="M20 12c-4-3-13-2-13 9 0 10 7 16 13 13 6 3 13-3 13-13 0-11-9-12-13-9z" fill="#FF5A5F" stroke="#C0303A" stroke-width="1.6"/><path d="M20 12c0-3 1-6 3-7" stroke="#7A4A22" stroke-width="1.8" fill="none" stroke-linecap="round"/><path d="M22.5 8.5c3-3.4 7.5-3.4 9.5-1.2-2.4 3-6.6 3.2-9.5 1.2z" fill="#5DBB63" stroke="#3E8E45" stroke-width="1"/><ellipse cx="13.5" cy="19" rx="2" ry="3.2" fill="#FFFFFF" opacity=".55"/>', 26) },
    bear: { qn: "곰곰이", lab: "곰곰이", kind: "곰", food: "꿀", pat: "포근포근 좋다곰!", eat: "꿀 냠냠!", go: "꿀이다곰!", full: "배부르다곰 ♡", key: "main_bear",
      desc: "힘세고 포근한 갈색 곰. 꿀 한 숟갈이면 기운이 펄펄!",
      lines: ["오늘도 힘내자곰!", "곰처럼 튼튼해지자!", "물 많이 마셨곰?", "스트레칭은 천천히곰~", "최고다곰 ♡", "근육 키워서 겨울잠 준비곰!"],
      sl: ["쿨쿨… zZ", "흐암… 겨울잠 자는 중이곰… 얼른 자요!", "음냐… 꿀… 달다…", "쉿… 내일 운동하려면 자야 한다곰"],
      ico: pvIco("0 0 40 40", 1, '<rect x="11" y="5" width="18" height="6.4" rx="2.2" fill="#B9773A" stroke="#7A4A22" stroke-width="1.4"/><path d="M9.6 14.4c0-2.2 1.8-3.4 4-3.4h12.8c2.2 0 4 1.2 4 3.4V30c0 4-3 6.4-6.4 6.4h-8c-3.4 0-6.4-2.4-6.4-6.4z" fill="#FFB52E" stroke="#C87A10" stroke-width="1.6"/><path d="M10.4 14.6h19.2v3c-1.6 0-1.8 4-3.6 4s-1.4-3-3-3-1.8 5-3.8 5-1.8-4.2-3.6-4.2-1.8 2-5.2 1.2z" fill="#FFE08A"/><ellipse cx="15" cy="27" rx="1.8" ry="3.4" fill="#FFFFFF" opacity=".45"/>', 26) },
    otter: { qn: "달달이", lab: "달달이", kind: "수달", food: "조개", pat: "꺄르르 좋아달!", eat: "조개 톡톡 냠냠!", go: "조개다달!", full: "배부르다달 ♡", key: "main_ott",
      desc: "물놀이를 좋아하는 수달. 배 위에 조개를 올리고 톡톡 깨 먹어요.",
      lines: ["오늘도 첨벙첨벙 운동 가자!", "헤엄치듯 가볍게~", "물 많이 마셨달?", "스트레칭 쭉쭉 하자달!", "멋져요 ♡", "조개 깨는 힘은 근력에서!"],
      sl: ["쿨쿨… zZ", "흐암… 물 위에 둥둥… 얼른 자요!", "음냐… 조개… 톡톡…", "쉿… 내일 운동하려면 자야 한다달"],
      ico: pvIco("0 0 40 36", .9, '<path d="M20 30L6 18C6 9 13 4 20 4s14 5 14 14z" fill="#FFB8C6" stroke="#D96A86" stroke-width="1.6" stroke-linejoin="round"/><path d="M20 30L13.5 6.5M20 30V4.4M20 30l6.5-23.5M20 30L8.4 12M20 30l11.6-18" stroke="#D96A86" stroke-width="1.1"/><path d="M15 29.6h10l-2 3.4h-6z" fill="#FFB8C6" stroke="#D96A86" stroke-width="1.3" stroke-linejoin="round"/>', 28) }
  };
  function petX() { return PX[M.pet] || PX.bunny; }
  function jo(w, a, b) { var c = (w || "").charCodeAt(w.length - 1); return w + ((c >= 0xAC00 && c <= 0xD7A3 && (c - 0xAC00) % 28) ? a : b); }
  /* 고양이 뼈대에서 바꿀 조각 */
  var PVS = {
    ears: '<path d="M35 11l2-9 7 5z" fill="#FFF3E2"/><path d="M50 7l7-5 1 9z" fill="#FFF3E2"/><path d="M37.5 8.5l1-4 3.2 2.3z" fill="#F7B6C6"/><path d="M52.5 6.8l3.2-2.3.5 4z" fill="#F7B6C6"/>',
    head: '<ellipse cx="46.5" cy="17" rx="12.5" ry="10.5" fill="#FFF3E2"/>',
    brow: '<path d="M40 7.5c2 2 4 2.5 6.500 2.500" fill="none" stroke="#F3D9B8" stroke-width="2.4" stroke-linecap="round"/>',
    nose: '<path d="M46 19.300l.9 1 .9-1z" fill="#E98AA2"/>',
    bow: '<path d="M40.500 26.200l-4-2.200v4.400zM42.500 26.200l4-2.200v4.400z" fill="#D6204F"/><circle cx="41.500" cy="26.200" r="1.500" fill="#B8173F"/>',
    tw: '<path class="p-tail" d="M12 30 C4 28 3 18 8 14" fill="none" stroke="#F3D9B8" stroke-width="4.5" stroke-linecap="round"/>',
    ts: '<path class="p-tail" d="M16 42 C6 42 4 34 9 30" fill="none" stroke="#F3D9B8" stroke-width="4.5" stroke-linecap="round"/>'
  };
  var NOSE = '<ellipse cx="46.9" cy="19.6" rx="1.9" ry="1.3" fill="#2E2426"/><ellipse cx="46.4" cy="19.2" rx=".6" ry=".35" fill="#FFFFFF" opacity=".7"/>';
  var PVD = {   /* fur 몸·stripe 등 무늬·leg 뒷다리·foot 발 · ears(머리 뒤)·post(머리 위)·brow·nose·bow·tw/ts 꼬리 */
    dog: { fur: "#F6DDB2", stripe: "#E0B074", leg: "#EBC892", foot: "#FFF8EC", ears: "",
      post: '<path d="M37 9.6c-4.4-.4-7.4 3.8-7 9.6.2 3.2 2.8 4.8 4.8 3 1.8-1.8 2.6-6.4 3.6-10.6z" fill="#B97F4A"/><path d="M56 9.6c4.4-.4 7.4 3.8 7 9.6-.2 3.2-2.8 4.8-4.8 3-1.8-1.8-2.6-6.4-3.6-10.6z" fill="#B97F4A"/><ellipse cx="46.6" cy="21.2" rx="5.4" ry="3.8" fill="#FFF8EC"/><ellipse cx="51.6" cy="14.6" rx="3.6" ry="3.2" fill="#E8B87C" opacity=".55"/>',
      brow: "", nose: NOSE, bow: '<g class="pv-collar"><path d="M36.6 25.4q9.9 4.6 19.8 0" fill="none" stroke="#E1141E" stroke-width="2.2" stroke-linecap="round"/><circle cx="46.5" cy="28.6" r="1.6" fill="#FFCF3F" stroke="#B8860B" stroke-width=".6"/></g>',
      tw: '<path class="p-tail" d="M12 28 C7 26 6.5 20 9.5 16" fill="none" stroke="#E0B074" stroke-width="4" stroke-linecap="round"/>',
      ts: '<path class="p-tail" d="M16 42 C9.5 41.5 8.5 36.5 11 32.5" fill="none" stroke="#E0B074" stroke-width="4" stroke-linecap="round"/>' },
    raccoon: { fur: "#BDB7B3", stripe: "#8E8784", leg: "#4E4749", foot: "#3E3839",
      ears: '<path d="M35.4 11.6c-.8-4.4 1.2-8 4.6-8.8 1.8 2.2 2.4 5 1.8 7.4z" fill="#BDB7B3" stroke="#4E4749" stroke-width=".9"/><path d="M57.6 11.6c.8-4.4-1.2-8-4.6-8.8-1.8 2.2-2.4 5-1.8 7.4z" fill="#BDB7B3" stroke="#4E4749" stroke-width=".9"/><path d="M37.2 10.2c-.2-2.6.8-4.6 2.4-5.4.8 1.4 1.1 2.8.9 4.2z" fill="#F4F0EC"/><path d="M55.8 10.2c.2-2.6-.8-4.6-2.4-5.4-.8 1.4-1.1 2.8-.9 4.2z" fill="#F4F0EC"/>',
      post: '<path d="M37.4 12.6q4.6-2.4 8.2.6 1-.6 1.8 0 3.6-3 8.2-.6" fill="none" stroke="#F4F0EC" stroke-width="1.6" stroke-linecap="round"/><path d="M36.6 15.6c0-2.4 2.8-3.6 5.4-3.2 2 .3 3.4 1.4 4.5 2.4 1.1-1 2.5-2.1 4.5-2.4 2.6-.4 5.4.8 5.4 3.2 0 2.6-2.6 4-5.2 3.6-2-.3-3.6-1.4-4.7-2.4-1.1 1-2.7 2.1-4.7 2.4-2.6.4-5.2-1-5.2-3.6z" fill="#5A5254"/><ellipse cx="46.6" cy="21.4" rx="5" ry="3.4" fill="#F4F0EC"/>',
      brow: '<path d="M46.5 7v4" stroke="#6E6668" stroke-width="2" stroke-linecap="round"/>', nose: NOSE, bow: "", eye: "#140F10", lid: "#FFFFFF",
      tw: '<g class="p-tail"><path d="M12 30 C4 28 2.4 19.5 6.4 14.6" fill="none" stroke="#BDB7B3" stroke-width="6" stroke-linecap="round"/><path d="M12 30 C4 28 2.4 19.5 6.4 14.6" fill="none" stroke="#4E4749" stroke-width="6.2" stroke-dasharray="3.2 3.4"/></g>',
      ts: '<g class="p-tail"><path d="M16 42 C6 42 3.6 33.6 8.4 29.4" fill="none" stroke="#BDB7B3" stroke-width="6" stroke-linecap="round"/><path d="M16 42 C6 42 3.6 33.6 8.4 29.4" fill="none" stroke="#4E4749" stroke-width="6.2" stroke-dasharray="3.2 3.4"/></g>' },
    bear: { fur: "#B5845A", stripe: "#9A6B44", leg: "#966A42", foot: "#E9CDA8",
      ears: '<circle cx="37.4" cy="8.8" r="4.8" fill="#B5845A"/><circle cx="55.6" cy="8.8" r="4.8" fill="#B5845A"/><circle cx="37.6" cy="9" r="2.5" fill="#E7B49A"/><circle cx="55.4" cy="9" r="2.5" fill="#E7B49A"/>',
      post: '<ellipse cx="46.6" cy="21.2" rx="5.6" ry="4" fill="#ECD3B0"/>', brow: "", nose: NOSE, bow: "", eye: "#241A1A",
      tw: '<path class="p-tail" d="M12.6 27.4 C10.4 27.6 9.6 25.2 11 23.6" fill="none" stroke="#B5845A" stroke-width="5" stroke-linecap="round"/>',
      ts: '<path class="p-tail" d="M16.6 42 C13.8 42.2 12.8 39.6 14.4 38" fill="none" stroke="#B5845A" stroke-width="5" stroke-linecap="round"/>' },
    otter: { fur: "#A0714F", stripe: "#86593A", leg: "#7E553A", foot: "#6A4630",
      ears: '<circle cx="36.4" cy="12" r="2.6" fill="#86593A"/><circle cx="56.6" cy="12" r="2.6" fill="#86593A"/>',
      post: '<path d="M35.2 19.6c1.4 5 6 7.8 11.3 7.8s9.9-2.8 11.3-7.8c-3.4 1-6.6-.4-11.3-.4s-7.9 1.4-11.3.4z" fill="#EBD6BC"/><ellipse cx="46.6" cy="21" rx="4.4" ry="2.8" fill="#F6E8D6"/><path d="M41.4 21.2l-4.4-.8M41.4 22.6l-4.2.6M51.8 21.2l4.4-.8M51.8 22.6l4.2.6" stroke="#6A4630" stroke-width=".55" stroke-linecap="round"/>',
      brow: "", nose: NOSE, bow: "",
      tw: '<path class="p-tail" d="M13 31 C7.5 32 3.6 33.6 1 36.6" fill="none" stroke="#86593A" stroke-width="5" stroke-linecap="round"/>',
      ts: '<path class="p-tail" d="M17 43 C11 44.4 6.6 44.2 3.6 42" fill="none" stroke="#86593A" stroke-width="5" stroke-linecap="round"/>' }
  };
  function mkPetSvg(t) {
    var D = PVD[t]; if (!D) return CAT_SVG;
    var s = CAT_SVG.replace("<svg ", '<svg class="pv-' + t + '" ')
      .replace(/#FFF3E2/g, "%FUR%").replace(/#F3D9B8/g, "%STR%").replace(/#EBCBA4/g, "%LEG%").replace(/fill="#fff"\/>/g, 'fill="%FOOT%"/>');
    function u(x) { return x.replace(/#FFF3E2/g, "%FUR%").replace(/#F3D9B8/g, "%STR%").replace(/#EBCBA4/g, "%LEG%"); }
    s = s.replace(u(PVS.ears), D.ears).replace(u(PVS.head), u(PVS.head) + D.post).replace(u(PVS.brow), D.brow).replace(PVS.nose, D.nose).replace(PVS.bow, D.bow)
      .replace(u(PVS.tw), D.tw).replace(u(PVS.ts), D.ts);
    if (D.eye) s = s.replace(/(<g class="p-eyes">.*?<\/g>)/, function (m) { return m.replace(/#3A2E2E/g, D.eye); });
    if (D.lid) s = s.replace(/(<g class="p-(sleep|slit|happy)">.*?<\/g>)/g, function (m) { return m.replace(/#3A2E2E/g, D.lid); });
    return s.replace(/%FUR%/g, D.fur).replace(/%STR%/g, D.stripe).replace(/%LEG%/g, D.leg).replace(/%FOOT%/g, D.foot);
  }
  function petSvgOf(t) { return t === "bunny" ? BNY_SVG : t === "cat" ? CAT_SVG : mkPetSvg(t); }
  /* 찾아왔어요! 창 */
  function pvPop() {
    var X = petX(); if (!PX[M.pet] || !X.kind || petOff()) return;
    try { if (localStorage.getItem("ptnote:" + RT_SLUG + ":pv") === M.pet) return; } catch (e) {}
    if (document.querySelector(".frpop-bg, .rtsheet-bg, .bgpop-wrap, .npop, .tour, .pfbag")) { setTimeout(pvPop, 1500); return; }
    try { localStorage.setItem("ptnote:" + RT_SLUG + ":pv", M.pet); } catch (e) {}
    var bg = document.createElement("div"); bg.className = "frpop-bg pvpop";
    bg.innerHTML = '<div class="frpop"><small>두근두근! 누가 왔어요</small><div class="frpop-pic">' + pfDeco(petSvgOf(M.pet), X.key) + '</div><b>' + esc(jo(X.kind, "이", "가")) + ' 찾아왔어요!</b>' +
      '<p>이름은 <strong>' + esc(X.qn) + '</strong>! ' + esc(X.desc) + '<br>열심히 운동한 선물이에요. 먹이주머니에 ' + esc(X.food) + ' 10개를 넣어 뒀어요 — 꾹 눌러 뿌려 주면 달려와서 먹어요!</p>' +
      '<div class="frpop-b"><button type="button" class="rtb fill" data-ok>반가워!</button></div></div>';
    document.body.appendChild(bg);
    bg.addEventListener("click", function (e) { if (e.target === bg || e.target.closest("[data-ok]")) bg.remove(); });
  }
  function pvArrive(t, fromServer) {   /* 동물이 찾아옴 — 화면에 등장 + 주머니 버튼 + 창 */
    if (!t || !PX[t] || PETS.some(function (q) { return q.id === "main"; })) return;
    M.pet = t; petSpawn(t, null); PETS.forEach(function (p) { p.dress(); }); pfBtn(); pfBtnDraw();
    if (!COACH_MODE) setTimeout(pvPop, fromServer ? 1500 : 2200);
  }
  function pvCheck() {   /* 기준선부터 점수·출석이 쌓였는지 */
    if (!PF_VIS || !PF || PF.vp || PF.b0 == null || COACH_MODE) return;
    if (pfEarned(PF) - PF.b0 < PV_N || (PF.am || 0) - (PF.a0 || 0) < PV_A) return;
    PF.vp = PV_T[Math.floor(Math.random() * PV_T.length)];
    PF.sp = Math.max(0, pfEarned(PF) - PF.b0 - 10);   /* 주머니엔 선물 10개부터 */
    pfSave(true); pvArrive(PF.vp);
  }
  /* 2026-11-18 유정님 고양이 친구들 (pet:"cat") — 고양이 그림(CAT_SVG)을 색만 바꿈: 털 fur·무늬 stripe·다리 leg·리본 band·눈 eye */
  FR.forEach(function (F) { F.pet = "bunny"; });
  FR.push(
    { pet: "cat", id: "c-cheese", name: "치즈", desc: "주황 줄무늬 먹보냥. 생선 냄새엔 못 참아.", fur: "#FFD9AE", stripe: "#EE9A4E", leg: "#EDB27A", band: "#2FA36B",
      tap: function (n) { return n % 2 ? { k: 2, say: "단백질은 생선이 최고냥!" } : { k: 1, say: "생선 냠냠냥!" }; } },
    { pet: "cat", id: "c-black", name: "까망이", desc: "시크한 검은 고양이. 툴툴대지만 사실 다정해.", fur: "#3B3B46", stripe: "#2B2B33", leg: "#30303A", band: "#C9A227", eye: "#FFD54A",
      tap: function (n) { return n % 5 < 3 ? { k: 2, say: ["…냥.", "귀찮다냥.", "만지지 마라냥."][n % 5] } : { k: 0, happy: false, h: 1, say: n % 5 === 3 ? "…오늘 운동은 했냥?" : "…쓰다듬어도 된다냥. 잠깐만." }; } },
    { pet: "cat", id: "c-gray", name: "회색이", desc: "늘 졸린 회색 고양이. 해바라기하며 꾸벅꾸벅.", fur: "#D3DBE6", stripe: "#AEBBCC", leg: "#B9C5D4", band: "#7FA8E0", spd: 46, rest: 7000,
      tap: function (n) { return { k: 0, happy: false, h: 1, say: ["으냥… 5분만…", "졸리다냥… zZ", "어? 벌써 운동이냥?"][n % 3] }; } },
    { pet: "cat", id: "c-calico", name: "삼색이", desc: "장난꾸러기 삼색 고양이. 우다다 달리기 선수!", fur: "#EFE6DA", stripe: "#F0A057", leg: "#4A4A52", band: "#FF5C8A", spd: 13, rest: 900,
      tap: function (n) { return { k: 2, say: ["우다다다! 놀자냥!", "유산소 가자냥!", "잡아 봐라냥~"][n % 3] }; } },
    { pet: "cat", id: "c-pink", name: "수줍냥", desc: "부끄럼 많은 분홍 고양이. 누르면 후다닥 숨어요.", fur: "#FBE3EC", stripe: "#F0B8CC", leg: "#EFC3D3", band: "#B98AE0",
      tap: function (n) { return { k: 3, say: ["냐, 냥…!", "히익냥!", "…아, 안녕냥"][n % 3] }; } }
  );
  /* 2026-11-18 "애들마다 컨셉 표정, 졸린 애들은 실눈" — 친구별 얼굴 소품(그림 위에 겹침) */
  var FACE = {
    muscle: '<path d="M29.8 27.6l6.6 -1.6M50.2 27.6l-6.6 -1.6" stroke="#2B2B33" stroke-width="1.9" stroke-linecap="round"/><path d="M42.6 36.2q1.6 1 3 -.6" fill="none" stroke="#2B2B33" stroke-width=".9" stroke-linecap="round"/>',
    bolt: '<path d="M24 22l1 2.4 2.4 1 -2.4 1 -1 2.4 -1 -2.4 -2.4 -1 2.4 -1z M56.5 20l.8 1.9 1.9.8 -1.9.8 -.8 1.9 -.8 -1.9 -1.9 -.8 1.9 -.8z" fill="#FFB300"/><path d="M37.6 36.4q2.4 3.6 4.8 0z" fill="#8A2E2E"/>',
    foodie: '<path d="M43.2 37.4q.9 2.6 0 3.4q-1 -.8 0 -3.4z" fill="#8FD3FF" stroke="#4E9BC8" stroke-width=".5"/>',
    shy: '<path d="M53.5 22.5q1.6 2.6 0 3.6q-1.6 -1 0 -3.6z" fill="#A8DDF7" stroke="#5FA9CF" stroke-width=".5"/><path d="M37.6 37.4q1.2 -.9 2.4 0q1.2 .9 2.4 0" fill="none" stroke="#7D5BA6" stroke-width=".9" stroke-linecap="round"/>',
    grumpy: '<path d="M37.4 38.2q2.6 -2 5.2 0" fill="none" stroke="#2E3A6B" stroke-width="1.2" stroke-linecap="round"/>',
    "c-black": '<path d="M39.6 12.8l3.8 1.4M53.8 12.8l-3.8 1.4" stroke="#B9B9C6" stroke-width="1" stroke-linecap="round"/>',
    "c-cheese": '<path d="M47.6 22.4q.7 2 0 2.7q-.8 -.6 0 -2.7z" fill="#8FD3FF" stroke="#4E9BC8" stroke-width=".4"/>',
    "c-calico": '<path d="M36 8l.7 1.6 1.6.7 -1.6.7 -.7 1.6 -.7 -1.6 -1.6 -.7 1.6 -.7z M58 9l.6 1.3 1.3.6 -1.3.6 -.6 1.3 -.6 -1.3 -1.3 -.6 1.3 -.6z" fill="#FFB300"/>',
    "c-pink": '<path d="M56.5 10q1.2 2 0 2.8q-1.2 -.8 0 -2.8z" fill="#A8DDF7" stroke="#5FA9CF" stroke-width=".4"/><ellipse cx="38.8" cy="20.5" rx="2.6" ry="1.6" fill="#FF8FB1"/><ellipse cx="54.8" cy="20.5" rx="2.6" ry="1.6" fill="#FF8FB1"/>'
  };
  FR.forEach(function (F) { F.acc = (F.acc || "") + (FACE[F.id] || ""); });
  var PFI = {"main_b": {"bag": null, "B0": [["lv2o", "<rect x=\"32.6\" y=\"55.1\" width=\"10.8\" height=\"1.9\" rx=\".95\" fill=\"#AEB4BE\"/><rect x=\"29.6\" y=\"52.4\" width=\"3.8\" height=\"7.4\" rx=\"1.4\" fill=\"#5B6170\" stroke=\"#B8325A\" stroke-width=\"1\"/><rect x=\"42.6\" y=\"52.4\" width=\"3.8\" height=\"7.4\" rx=\"1.4\" fill=\"#5B6170\" stroke=\"#B8325A\" stroke-width=\"1\"/><path d=\"M30.6 53.8v2.4M43.6 53.8v2.4\" stroke=\"#fff\" stroke-width=\".7\" stroke-linecap=\"round\" opacity=\".6\"/>"], ["lv3o", "<rect x=\"24\" y=\"54.6\" width=\"28\" height=\"2.6\" rx=\"1.3\" fill=\"#C9CED6\" stroke=\"#B8325A\" stroke-width=\".7\"/><rect x=\"19.4\" y=\"47.8\" width=\"5.2\" height=\"15.2\" rx=\"1.8\" fill=\"#2B2E37\" stroke=\"#C8921A\" stroke-width=\"1\"/><rect x=\"24.4\" y=\"50.2\" width=\"3.4\" height=\"10.4\" rx=\"1.3\" fill=\"#2B2E37\" stroke=\"#C8921A\" stroke-width=\".9\"/><rect x=\"48.2\" y=\"50.2\" width=\"3.4\" height=\"10.4\" rx=\"1.3\" fill=\"#2B2E37\" stroke=\"#C8921A\" stroke-width=\".9\"/><rect x=\"51.4\" y=\"47.8\" width=\"5.2\" height=\"15.2\" rx=\"1.8\" fill=\"#2B2E37\" stroke=\"#C8921A\" stroke-width=\"1\"/><path d=\"M20.8 49.6v4M52.8 49.6v4\" stroke=\"#FFE7A0\" stroke-width=\".8\" stroke-linecap=\"round\"/>"]], "H": [["lv3o", "<g transform=\"rotate(-8 40 14)\"><path d=\"M33.6 17.6l-1.2-7.2 4 3.3 3.6-5.2 3.6 5.2 4-3.3-1.2 7.2q-6.4-1.6-12.8 0z\" fill=\"#FFCF3F\" stroke=\"#C8921A\" stroke-width=\"1\" stroke-linejoin=\"round\"/><circle cx=\"40\" cy=\"15\" r=\"1.4\" fill=\"#FF5C8A\" stroke=\"#C8921A\" stroke-width=\".5\"/><circle cx=\"32.4\" cy=\"10.2\" r=\".9\" fill=\"#FFF2B0\"/><circle cx=\"40\" cy=\"8.2\" r=\".9\" fill=\"#FFF2B0\"/><circle cx=\"47.6\" cy=\"10.2\" r=\".9\" fill=\"#FFF2B0\"/><path d=\"M35.2 13.6l.6 2\" stroke=\"#FFF2B0\" stroke-width=\".8\" stroke-linecap=\"round\"/></g>"]], "fx": ["✦", "✦", "✧"], "c": "#FFCF3F", "t2": "귀여운 가방이랑 작은 덤벨이 생겼어요!", "t3": "큰 덤벨 · 반짝이 왕관! 최고 레벨이에요"}, "main_c": {"bag": ["#FF8FB1", "#C2185B", "#FFD3E1"], "W": [["lv2o", "<rect x=\"22\" y=\"13.4\" width=\"10.4\" height=\"1.5\" rx=\".75\" fill=\"#9AA0AA\"/><rect x=\"20.4\" y=\"11.4\" width=\"2.6\" height=\"5.4\" rx=\"1\" fill=\"#3B3F4A\"/><rect x=\"31.4\" y=\"11.4\" width=\"2.6\" height=\"5.4\" rx=\"1\" fill=\"#3B3F4A\"/>"], ["lv3o", "<rect x=\"15\" y=\"12.6\" width=\"24\" height=\"2.2\" rx=\"1.1\" fill=\"#B8BEC8\"/><rect x=\"10.6\" y=\"7\" width=\"4.6\" height=\"13.4\" rx=\"1.5\" fill=\"#2B2E37\" stroke=\"#FFCF3F\" stroke-width=\".8\"/><rect x=\"15.2\" y=\"8.8\" width=\"3\" height=\"9.8\" rx=\"1.1\" fill=\"#2B2E37\" stroke=\"#FFCF3F\" stroke-width=\".7\"/><rect x=\"35.8\" y=\"8.8\" width=\"3\" height=\"9.8\" rx=\"1.1\" fill=\"#2B2E37\" stroke=\"#FFCF3F\" stroke-width=\".7\"/><rect x=\"38.8\" y=\"7\" width=\"4.6\" height=\"13.4\" rx=\"1.5\" fill=\"#2B2E37\" stroke=\"#FFCF3F\" stroke-width=\".8\"/>"]], "S": [["lv2o", "<rect x=\"50\" y=\"42.4\" width=\"9.6\" height=\"1.5\" rx=\".75\" fill=\"#9AA0AA\"/><rect x=\"48.4\" y=\"40.2\" width=\"2.6\" height=\"5.8\" rx=\"1\" fill=\"#3B3F4A\"/><rect x=\"58.6\" y=\"40.2\" width=\"2.6\" height=\"5.8\" rx=\"1\" fill=\"#3B3F4A\"/>"], ["lv3o", "<rect x=\"47.4\" y=\"41.8\" width=\"15.6\" height=\"2.2\" rx=\"1.1\" fill=\"#B8BEC8\"/><rect x=\"43.8\" y=\"36.8\" width=\"4.2\" height=\"11.8\" rx=\"1.4\" fill=\"#2B2E37\" stroke=\"#FFCF3F\" stroke-width=\".8\"/><rect x=\"62.4\" y=\"36.8\" width=\"4.2\" height=\"11.8\" rx=\"1.4\" fill=\"#2B2E37\" stroke=\"#FFCF3F\" stroke-width=\".8\"/>"]], "H": [["lv3o", "<path d=\"M42.4 9.2l-.7-4.8 2.5 2 2.1-3.5 2.1 3.5 2.5-2-.7 4.8z\" fill=\"#FFCF3F\" stroke=\"#C8921A\" stroke-width=\".8\" stroke-linejoin=\"round\"/><circle cx=\"46.3\" cy=\"7.4\" r=\".9\" fill=\"#FF5C8A\"/>"]], "fx": ["✦", "✦", "✧"], "c": "#FFCF3F", "t2": "분홍 가방이랑 작은 덤벨이 생겼어요!", "t3": "큰 덤벨 · 반짝이 왕관! 최고 레벨이에요"}, "muscle": {"bag": ["#5A5A66", "#1F1F26", "#9A9AA6"], "fx": ["🔥", "💪", "🔥"], "c": "#FF7A1A", "t2": "리프팅 벨트를 찼어요! 한 세트 더!", "t3": "금빛 챔피언 벨트 + 불꽃! 근육은 배신 안 해!", "B0": [["all", "<rect x=\"31.4\" y=\"55\" width=\"13.2\" height=\"2.1\" rx=\"1\" fill=\"#8A8F99\" stroke=\"#B8325A\" stroke-width=\".6\"/><rect x=\"27.6\" y=\"51.4\" width=\"4.4\" height=\"9.4\" rx=\"1.5\" fill=\"#2B2B33\" stroke=\"#B8325A\" stroke-width=\"1\"/><rect x=\"44\" y=\"51.4\" width=\"4.4\" height=\"9.4\" rx=\"1.5\" fill=\"#2B2B33\" stroke=\"#B8325A\" stroke-width=\"1\"/><path d=\"M28.8 53v3M45.2 53v3\" stroke=\"#fff\" stroke-width=\".7\" stroke-linecap=\"round\" opacity=\".5\"/>"], ["lv2o", "<path d=\"M10.6 45.6Q25 52.6 39.4 45.6L39.6 50Q25 57.4 10.8 50z\" fill=\"#2B2B33\" stroke=\"#B8325A\" stroke-width=\"1\"/><rect x=\"28.6\" y=\"48\" width=\"5\" height=\"5.2\" rx=\"1\" fill=\"none\" stroke=\"#C0C4CC\" stroke-width=\"1.3\"/><path d=\"M14 48.6q11 4.2 22 0\" fill=\"none\" stroke=\"#55555F\" stroke-width=\".6\" stroke-dasharray=\"1.2 1\"/>"], ["lv3o", "<path d=\"M10.4 44.8Q25 52 39.6 44.8L39.8 50.6Q25 58.4 10.6 50.6z\" fill=\"#C62828\" stroke=\"#B8325A\" stroke-width=\"1\"/><path d=\"M12 48.6q13 5.6 26 0\" fill=\"none\" stroke=\"#FFCF3F\" stroke-width=\".7\" stroke-dasharray=\"1.4 1\"/><ellipse cx=\"30.4\" cy=\"50.4\" rx=\"6.2\" ry=\"4.8\" fill=\"#FFCF3F\" stroke=\"#C8921A\" stroke-width=\"1\"/><ellipse cx=\"30.4\" cy=\"50.4\" rx=\"4.2\" ry=\"3.1\" fill=\"none\" stroke=\"#C8921A\" stroke-width=\".6\"/><path d=\"M30.4 47.8l.8 1.7 1.8.2-1.3 1.2.4 1.8-1.7-.9-1.7.9.4-1.8-1.3-1.2 1.8-.2z\" fill=\"#E1141E\"/>"]]}, "sleepy": {"bag": ["#A9C8F2", "#4C6E9A", "#DCEBFF"], "H": [["lv2o", "<path d=\"M29.2 22.4Q40 14.4 50.8 22.4L50.2 25.4Q40 17.8 29.8 25.4z\" fill=\"#C9B8F5\" stroke=\"#B8325A\" stroke-width=\"1\"/><path d=\"M33.6 21.4q1.8 1.4 3.6 0M42.8 21.4q1.8 1.4 3.6 0\" fill=\"none\" stroke=\"#4A3A8A\" stroke-width=\".9\" stroke-linecap=\"round\"/>"], ["lv3o", "<path d=\"M26.4 22C27 10 37 4 47 5.6c8 1.2 13.6 6.4 14.6 14-3-3.2-6.6-4.2-9.2-3 1.2 1.8 1.6 3.4 1.6 5Q40 11.8 26.4 22z\" fill=\"#6F8FE0\" stroke=\"#B8325A\" stroke-width=\"1.2\" stroke-linejoin=\"round\"/><path d=\"M31.6 14.6q7-4.4 15.4-3.4M36.2 9.2q5.4-2.6 11.6-1.4\" fill=\"none\" stroke=\"#FFE066\" stroke-width=\"1.3\" stroke-linecap=\"round\"/><path d=\"M45 13.4l.6 1.3 1.4.2-1 1 .2 1.4-1.2-.7-1.2.7.2-1.4-1-1 1.4-.2z\" fill=\"#FFE066\"/><path d=\"M24.8 22.6Q40 11.4 55.2 22.6L54.4 25.6Q40 15 25.6 25.6z\" fill=\"#fff\" stroke=\"#B8325A\" stroke-width=\"1\"/><circle cx=\"61.6\" cy=\"20.8\" r=\"3\" fill=\"#fff\" stroke=\"#B8325A\" stroke-width=\"1\"/>"]], "fx": ["☾", "★", "z"], "c": "#8FA8FF", "t2": "수면 안대가 생겼어요… 5분만 더…", "t3": "별 달린 나이트캡! 꿀잠 챔피언이에요 zZ"}, "bolt": {"bag": ["#FF8A00", "#B35E00", "#FFD08A"], "H": [["lv2p", "<path d=\"M24.4 25Q40 15.6 55.6 25\" fill=\"none\" stroke=\"#2B2B33\" stroke-width=\"1.7\"/><circle cx=\"34.6\" cy=\"21.4\" r=\"3.7\" fill=\"#8FE3FF\" stroke=\"#B8325A\" stroke-width=\"1.1\"/><circle cx=\"45.4\" cy=\"21.4\" r=\"3.7\" fill=\"#8FE3FF\" stroke=\"#B8325A\" stroke-width=\"1.1\"/><path d=\"M38.3 21.2h3.4\" stroke=\"#B8325A\" stroke-width=\"1.1\"/><path d=\"M33 20.2l1.6-1.2M43.8 20.2l1.6-1.2\" stroke=\"#fff\" stroke-width=\"1\" stroke-linecap=\"round\"/>"]], "B": [["lv3o", "<path d=\"M34.6 41.6l5 7.8 5-7.8\" fill=\"none\" stroke=\"#2F6FE0\" stroke-width=\"2.2\" stroke-linejoin=\"round\"/><circle cx=\"39.6\" cy=\"51.4\" r=\"4\" fill=\"#FFCF3F\" stroke=\"#C8921A\" stroke-width=\"1\"/><path d=\"M39.6 49.2l.7 1.4 1.5.2-1.1 1 .3 1.5-1.4-.7-1.4.7.3-1.5-1.1-1 1.5-.2z\" fill=\"#C8921A\"/>"]], "fx": ["⚡", "✦", "⚡"], "c": "#FFD000", "t2": "스포츠 고글 장착! 더 빨리 뛰자!", "t3": "금메달 + 번개 효과! 스피드 1등!"}, "foodie": {"bag": ["#FF9A5C", "#BF6129", "#FFD9BF"], "H": [["lv3o", "<path d=\"M29.2 18.8C26.6 13.4 30 9.6 34 10.4c.6-5 7-6.4 9.6-2.8 3.4-3 9.8-.6 9 4.4 3 1.6 1.8 6-1.4 6.6Q40 14.2 29.2 18.8z\" fill=\"#fff\" stroke=\"#B8325A\" stroke-width=\"1\" stroke-linejoin=\"round\"/><path d=\"M36 12.4q.8 2.6 0 4.8M44.4 11.8q.8 2.6 0 4.6\" fill=\"none\" stroke=\"#E2E2EA\" stroke-width=\".9\" stroke-linecap=\"round\"/><path d=\"M28.6 18.6Q40 13.8 51.4 18.6L51 22.2Q40 17.6 29 22.2z\" fill=\"#fff\" stroke=\"#B8325A\" stroke-width=\"1\"/>"]], "fx": ["🍗", "♥", "🥚"], "c": "#FF9A5C", "t2": "프로틴 쉐이커가 생겼어요! 단백질 냠냠!", "t3": "셰프 모자! 단백질 요리왕이에요", "B0": [["lv2p", "<rect x=\"33.8\" y=\"45.6\" width=\"6.4\" height=\"10.6\" rx=\"1.8\" fill=\"#fff\" stroke=\"#B8325A\" stroke-width=\"1\"/><rect x=\"34.7\" y=\"49.6\" width=\"4.6\" height=\"5.6\" rx=\"1\" fill=\"#C89466\"/><rect x=\"33.2\" y=\"43.6\" width=\"7.6\" height=\"2.8\" rx=\"1.1\" fill=\"#FF7A45\" stroke=\"#B8325A\" stroke-width=\".9\"/><path d=\"M35 47.2v1.6\" stroke=\"#E6E6EE\" stroke-width=\".8\" stroke-linecap=\"round\"/>"]]}, "shy": {"bag": ["#C9A6F0", "#7D5BA6", "#EBDDFB"], "H": [["lv2p", "<circle cx=\"51.4\" cy=\"18.1\" r=\"1.6\" fill=\"#FF9EC4\" stroke=\"#B8325A\" stroke-width=\".45\"/><circle cx=\"53.6\" cy=\"19.7\" r=\"1.6\" fill=\"#FF9EC4\" stroke=\"#B8325A\" stroke-width=\".45\"/><circle cx=\"52.7\" cy=\"22.3\" r=\"1.6\" fill=\"#FF9EC4\" stroke=\"#B8325A\" stroke-width=\".45\"/><circle cx=\"50.1\" cy=\"22.3\" r=\"1.6\" fill=\"#FF9EC4\" stroke=\"#B8325A\" stroke-width=\".45\"/><circle cx=\"49.2\" cy=\"19.7\" r=\"1.6\" fill=\"#FF9EC4\" stroke=\"#B8325A\" stroke-width=\".45\"/><circle cx=\"51.4\" cy=\"20.4\" r=\"1.1\" fill=\"#FFE066\"/>"], ["lv3o", "<path d=\"M25.6 24.4Q40 12 54.6 22.8\" fill=\"none\" stroke=\"#6BBF6B\" stroke-width=\"1.6\" stroke-linecap=\"round\"/><path d=\"M31 17.6q-2.6-.6-3.2 1.6 2.4.6 3.2-1.6zM43.6 14.4q1.4-2.2 3.6-1.2-1.4 2.2-3.6 1.2z\" fill=\"#7FD07F\" stroke=\"#4E9B4E\" stroke-width=\".4\"/><circle cx=\"28.4\" cy=\"19.8\" r=\"1.4\" fill=\"#FFB3D1\" stroke=\"#B8325A\" stroke-width=\".45\"/><circle cx=\"30.3\" cy=\"21.2\" r=\"1.4\" fill=\"#FFB3D1\" stroke=\"#B8325A\" stroke-width=\".45\"/><circle cx=\"29.5\" cy=\"23.4\" r=\"1.4\" fill=\"#FFB3D1\" stroke=\"#B8325A\" stroke-width=\".45\"/><circle cx=\"27.3\" cy=\"23.4\" r=\"1.4\" fill=\"#FFB3D1\" stroke=\"#B8325A\" stroke-width=\".45\"/><circle cx=\"26.5\" cy=\"21.2\" r=\"1.4\" fill=\"#FFB3D1\" stroke=\"#B8325A\" stroke-width=\".45\"/><circle cx=\"28.4\" cy=\"21.8\" r=\"1.0\" fill=\"#FFE066\"/><circle cx=\"34.2\" cy=\"15.5\" r=\"1.5\" fill=\"#C9A6F0\" stroke=\"#B8325A\" stroke-width=\".45\"/><circle cx=\"36.2\" cy=\"16.9\" r=\"1.5\" fill=\"#C9A6F0\" stroke=\"#B8325A\" stroke-width=\".45\"/><circle cx=\"35.4\" cy=\"19.3\" r=\"1.5\" fill=\"#C9A6F0\" stroke=\"#B8325A\" stroke-width=\".45\"/><circle cx=\"33.0\" cy=\"19.3\" r=\"1.5\" fill=\"#C9A6F0\" stroke=\"#B8325A\" stroke-width=\".45\"/><circle cx=\"32.2\" cy=\"16.9\" r=\"1.5\" fill=\"#C9A6F0\" stroke=\"#B8325A\" stroke-width=\".45\"/><circle cx=\"34.2\" cy=\"17.6\" r=\"1.1\" fill=\"#FFE066\"/><circle cx=\"40.6\" cy=\"13.5\" r=\"1.5\" fill=\"#FF9EC4\" stroke=\"#B8325A\" stroke-width=\".45\"/><circle cx=\"42.6\" cy=\"14.9\" r=\"1.5\" fill=\"#FF9EC4\" stroke=\"#B8325A\" stroke-width=\".45\"/><circle cx=\"41.8\" cy=\"17.3\" r=\"1.5\" fill=\"#FF9EC4\" stroke=\"#B8325A\" stroke-width=\".45\"/><circle cx=\"39.4\" cy=\"17.3\" r=\"1.5\" fill=\"#FF9EC4\" stroke=\"#B8325A\" stroke-width=\".45\"/><circle cx=\"38.6\" cy=\"14.9\" r=\"1.5\" fill=\"#FF9EC4\" stroke=\"#B8325A\" stroke-width=\".45\"/><circle cx=\"40.6\" cy=\"15.6\" r=\"1.1\" fill=\"#FFE066\"/><circle cx=\"46.6\" cy=\"14.4\" r=\"1.4\" fill=\"#FFD1E3\" stroke=\"#B8325A\" stroke-width=\".45\"/><circle cx=\"48.5\" cy=\"15.8\" r=\"1.4\" fill=\"#FFD1E3\" stroke=\"#B8325A\" stroke-width=\".45\"/><circle cx=\"47.7\" cy=\"18.0\" r=\"1.4\" fill=\"#FFD1E3\" stroke=\"#B8325A\" stroke-width=\".45\"/><circle cx=\"45.5\" cy=\"18.0\" r=\"1.4\" fill=\"#FFD1E3\" stroke=\"#B8325A\" stroke-width=\".45\"/><circle cx=\"44.7\" cy=\"15.8\" r=\"1.4\" fill=\"#FFD1E3\" stroke=\"#B8325A\" stroke-width=\".45\"/><circle cx=\"46.6\" cy=\"16.4\" r=\"1.0\" fill=\"#FFE066\"/>"]], "fx": ["✿", "♥", "✿"], "c": "#FF9EC4", "t2": "꽃 머리핀… 어, 어울려요?", "t3": "꽃 화관을 썼어요! 꽃잎이 흩날려요"}, "grumpy": {"bag": ["#2E3A6B", "#151C3A", "#7C88B8"], "H": [["lv2p", "<path d=\"M24.4 31.4C22.6 17 32 12.6 40 12.6s17.4 4.4 15.6 18.8\" fill=\"none\" stroke=\"#3A3F55\" stroke-width=\"2.6\" stroke-linecap=\"round\"/><path d=\"M27 22.4q3.6-6.8 13-7.6\" fill=\"none\" stroke=\"#8C93AD\" stroke-width=\".8\" stroke-linecap=\"round\"/><ellipse cx=\"24.2\" cy=\"32.6\" rx=\"3.7\" ry=\"5.3\" fill=\"#D94A4A\" stroke=\"#B8325A\" stroke-width=\"1.1\"/><ellipse cx=\"55.8\" cy=\"32.6\" rx=\"3.7\" ry=\"5.3\" fill=\"#D94A4A\" stroke=\"#B8325A\" stroke-width=\"1.1\"/><ellipse cx=\"23.4\" cy=\"31\" rx=\"1\" ry=\"1.8\" fill=\"#fff\" opacity=\".55\"/><ellipse cx=\"55\" cy=\"31\" rx=\"1\" ry=\"1.8\" fill=\"#fff\" opacity=\".55\"/>"], ["lv3o", "<ellipse cx=\"24.2\" cy=\"32.6\" rx=\"3.7\" ry=\"5.3\" fill=\"#FFCF3F\" stroke=\"#C8921A\" stroke-width=\"1.1\"/><ellipse cx=\"55.8\" cy=\"32.6\" rx=\"3.7\" ry=\"5.3\" fill=\"#FFCF3F\" stroke=\"#C8921A\" stroke-width=\"1.1\"/><ellipse cx=\"23.4\" cy=\"31\" rx=\"1\" ry=\"1.8\" fill=\"#fff\" opacity=\".7\"/><ellipse cx=\"55\" cy=\"31\" rx=\"1\" ry=\"1.8\" fill=\"#fff\" opacity=\".7\"/>"]], "B": [["lv3o", "<path d=\"M31 43q9 9 18 0\" fill=\"none\" stroke=\"#FFCF3F\" stroke-width=\"1.9\" stroke-dasharray=\"1.7 .8\"/><circle cx=\"40\" cy=\"48.6\" r=\"2.8\" fill=\"#FFCF3F\" stroke=\"#C8921A\" stroke-width=\".9\"/><path d=\"M39 47.6h2l-2 2h2\" fill=\"none\" stroke=\"#C8921A\" stroke-width=\".7\"/>"]], "fx": ["✦", "✧", "✦"], "c": "#9C7BFF", "t2": "…헤드폰. 말 걸지 마. 흥.", "t3": "금빛 헤드폰에 금 체인까지. …칭찬해도 돼. 흥."}, "c-cheese": {"bag": ["#5BC08A", "#2F7D57", "#C9EEDA"], "H": [["lv2p", "<path d=\"M42.4 25.2q4.6-1 9.2 0 0 6-4.6 6.2-4.6-.2-4.6-6.2z\" fill=\"#fff\" stroke=\"#EE9A4E\" stroke-width=\".8\"/><path d=\"M44.6 28.2q1.6-1.6 3.4 0-1.8 1.6-3.4 0zM48 28.2l1.4-1v2z\" fill=\"#8EC5E8\"/>"], ["lv3o", "<path d=\"M39.6 9q-1-4.6 2.4-5.4Q43 -.6 47 .4q4-.8 4.6 3.4 3.4.8 1.8 5.2z\" fill=\"#fff\" stroke=\"#D98A3A\" stroke-width=\".8\" stroke-linejoin=\"round\"/><path d=\"M39.4 8.6q7-2 14 0V11q-7-2-14 0z\" fill=\"#fff\" stroke=\"#D98A3A\" stroke-width=\".8\"/>"]], "fx": ["🐟", "♥", "🐟"], "c": "#FFB15C", "t2": "생선 턱받이를 했다냥! 냠냠 준비 완료", "t3": "셰프 모자! 생선 요리왕이다냥"}, "c-black": {"bag": ["#C9A227", "#7A6114", "#F1E1A0"], "H": [["lv2p", "<path d=\"M38.6 14.6h6.8l-.5 3.2q-2.9 1.6-5.8 0zM48.1 14.6h6.8l-.5 3.2q-2.9 1.6-5.8 0z\" fill=\"#0B0D14\" stroke=\"#C0C4CC\" stroke-width=\".6\"/><path d=\"M45.4 15.2h2.7\" stroke=\"#C0C4CC\" stroke-width=\".8\"/>"], ["lv3o", "<path d=\"M38.8 8.6q7.7-2 15.4 0l-.4 1.4q-7.3-1.8-14.6 0z\" fill=\"#1B1E2B\" stroke=\"#C0C4CC\" stroke-width=\".6\"/><path d=\"M42.6 8.2V-1.4h8V8.2q-4-1-8 0z\" fill=\"#1B1E2B\" stroke=\"#C0C4CC\" stroke-width=\".6\"/><path d=\"M42.6 5.2q4-.8 8 0v1.6q-4-.8-8 0z\" fill=\"#C9A227\"/>"]], "fx": ["☾", "✧", "✦"], "c": "#DDE3EE", "t2": "…선글라스. 시크하다냥.", "t3": "실크햇까지. …멋있다고 해도 된다냥."}, "c-gray": {"bag": ["#7FA8E0", "#3F5F94", "#D4E3F7"], "H": [["lv2o", "<path d=\"M39.6 10.4q6.9-2.2 13.8 0l-.4 2.6q-6.5-2-13 0z\" fill=\"#B9A7F2\" stroke=\"#6F5BB5\" stroke-width=\".7\"/><path d=\"M42 11.6q1.2 1 2.4 0M48.6 11.6q1.2 1 2.4 0\" fill=\"none\" stroke=\"#4A3A8A\" stroke-width=\".7\" stroke-linecap=\"round\"/>"], ["lv3o", "<path d=\"M39.6 9.4C41 2 48-1.5 55 1c3.4 1.4 5.4 4 6 6.6-2.6-1.8-5.4-1.6-7.4-.2.4.8.4 1.4 0 2Q46.5 6.8 39.6 9.4z\" fill=\"#5C7FD6\" stroke=\"#2F4A99\" stroke-width=\".8\" stroke-linejoin=\"round\"/><path d=\"M44 5.2q4-2 9-1\" fill=\"none\" stroke=\"#FFE066\" stroke-width=\"1\" stroke-linecap=\"round\"/><path d=\"M38.6 9.6q7.9-3 15.8 0l-.4 2.2q-7.5-2.6-15 0z\" fill=\"#fff\" stroke=\"#2F4A99\" stroke-width=\".7\"/><circle cx=\"61\" cy=\"7.6\" r=\"2.2\" fill=\"#fff\" stroke=\"#2F4A99\" stroke-width=\".7\"/>"]], "fx": ["☾", "z", "★"], "c": "#8FA8FF", "t2": "수면 안대… 졸리다냥…", "t3": "나이트캡! 꿀잠 챔피언이다냥 zZ"}, "c-calico": {"bag": ["#FF5C8A", "#B3264F", "#FFC7D6"], "H": [["lv2p", "<path d=\"M35.2 10.6q11.3-4.8 22.6 0l-.4 2.8q-10.9-4.6-21.8 0z\" fill=\"#2F6FE0\" stroke=\"#1A4BA8\" stroke-width=\".6\"/><path d=\"M36.4 11.6q10.1-4 20.2 0\" fill=\"none\" stroke=\"#fff\" stroke-width=\".6\"/>"], ["lv3o", "<path d=\"M45 25.4l4 4.4 4-4.4\" fill=\"none\" stroke=\"#2F6FE0\" stroke-width=\"1.8\" stroke-linejoin=\"round\"/><circle cx=\"49\" cy=\"31.4\" r=\"2.9\" fill=\"#FFCF3F\" stroke=\"#C8921A\" stroke-width=\".8\"/><path d=\"M49 29.9l.5 1 1.1.2-.8.7.2 1.1-1-.5-1 .5.2-1.1-.8-.7 1.1-.2z\" fill=\"#C8921A\"/>"]], "fx": ["⚡", "✦", "⚡"], "c": "#FFD000", "t2": "땀밴드 장착! 우다다 달리자냥!", "t3": "금메달이다냥! 달리기 1등!"}, "c-pink": {"bag": ["#B98AE0", "#6E4A99", "#E6D6F5"], "H": [["lv2p", "<circle cx=\"56.8\" cy=\"9.2\" r=\"1.1\" fill=\"#FF9EC4\"/><circle cx=\"55.7\" cy=\"10.7\" r=\"1.1\" fill=\"#FF9EC4\"/><circle cx=\"53.9\" cy=\"10.2\" r=\"1.1\" fill=\"#FF9EC4\"/><circle cx=\"53.9\" cy=\"8.2\" r=\"1.1\" fill=\"#FF9EC4\"/><circle cx=\"55.7\" cy=\"7.7\" r=\"1.1\" fill=\"#FF9EC4\"/><circle cx=\"55.2\" cy=\"9.2\" r=\"0.8\" fill=\"#FFE066\"/>"], ["lv3o", "<path d=\"M36 11.2Q46.5 3.8 57 10.4\" fill=\"none\" stroke=\"#6BBF6B\" stroke-width=\"1.2\" stroke-linecap=\"round\"/><circle cx=\"39.9\" cy=\"9.6\" r=\"1.1\" fill=\"#FFB3D1\"/><circle cx=\"38.9\" cy=\"11.1\" r=\"1.1\" fill=\"#FFB3D1\"/><circle cx=\"37.2\" cy=\"10.5\" r=\"1.1\" fill=\"#FFB3D1\"/><circle cx=\"37.2\" cy=\"8.7\" r=\"1.1\" fill=\"#FFB3D1\"/><circle cx=\"38.9\" cy=\"8.1\" r=\"1.1\" fill=\"#FFB3D1\"/><circle cx=\"38.4\" cy=\"9.6\" r=\"0.7\" fill=\"#FFE066\"/><circle cx=\"44.4\" cy=\"7.0\" r=\"1.1\" fill=\"#C9A6F0\"/><circle cx=\"43.3\" cy=\"8.5\" r=\"1.1\" fill=\"#C9A6F0\"/><circle cx=\"41.5\" cy=\"8.0\" r=\"1.1\" fill=\"#C9A6F0\"/><circle cx=\"41.5\" cy=\"6.0\" r=\"1.1\" fill=\"#C9A6F0\"/><circle cx=\"43.3\" cy=\"5.5\" r=\"1.1\" fill=\"#C9A6F0\"/><circle cx=\"42.8\" cy=\"7.0\" r=\"0.8\" fill=\"#FFE066\"/><circle cx=\"49.2\" cy=\"5.8\" r=\"1.1\" fill=\"#FF9EC4\"/><circle cx=\"48.1\" cy=\"7.3\" r=\"1.1\" fill=\"#FF9EC4\"/><circle cx=\"46.3\" cy=\"6.8\" r=\"1.1\" fill=\"#FF9EC4\"/><circle cx=\"46.3\" cy=\"4.8\" r=\"1.1\" fill=\"#FF9EC4\"/><circle cx=\"48.1\" cy=\"4.3\" r=\"1.1\" fill=\"#FF9EC4\"/><circle cx=\"47.6\" cy=\"5.8\" r=\"0.8\" fill=\"#FFE066\"/><circle cx=\"53.4\" cy=\"6.6\" r=\"1.0\" fill=\"#FFD1E3\"/><circle cx=\"52.4\" cy=\"8.0\" r=\"1.0\" fill=\"#FFD1E3\"/><circle cx=\"50.8\" cy=\"7.4\" r=\"1.0\" fill=\"#FFD1E3\"/><circle cx=\"50.8\" cy=\"5.8\" r=\"1.0\" fill=\"#FFD1E3\"/><circle cx=\"52.4\" cy=\"5.2\" r=\"1.0\" fill=\"#FFD1E3\"/><circle cx=\"52.0\" cy=\"6.6\" r=\"0.7\" fill=\"#FFE066\"/>"]], "fx": ["✿", "♥", "✿"], "c": "#FF9EC4", "t2": "꽃핀… 어, 어울리냥?", "t3": "꽃 화관이다냥! 꽃잎이 흩날려요"}};
  /* 찾아오는 동물 치장(2026-11-20 2차 "장신구가 싼티나는데 센스있게") — 쨍한 원색·굵은 테두리 대신 차분한 색·얇은 선·금빛 포인트·하이라이트
     뭉치 버건디 체크 스카프→+트위드 헌팅캡 · 곰곰이 꿀색 니트 목도리→+금 왕관(살짝 기울임)+꿀벌 · 너굴이 차콜 니트 비니→네이비 베레모+금 외눈안경+벨벳 보타이 · 달달이 세일러 스카프→+마린 캡틴 모자 */
  PFI.main_dog = { bag: ["#C9A27A", "#7A5638", "#EEDDC6"], H: [
    ["lv2p", '<path d="M36.8 24.6c3 2.6 6.4 3.6 9.7 3.6s6.7-1 9.7-3.6l.6 2.2c-3.1 2.8-6.6 3.9-10.3 3.9s-7.2-1.1-10.3-3.9z" fill="#7A1F2B"/><path d="M39.6 26.6v2.4M43.2 27.8v2.4M47 28.2v2.4M50.6 27.8v2.4M54 26.4v2.4" stroke="#24304D" stroke-width=".55" opacity=".75"/><path d="M37.4 25.9c3 2.4 6.1 3.4 9.1 3.4s6.1-1 9.1-3.4" fill="none" stroke="#D9B26A" stroke-width=".35"/><path d="M51.9 29.6l-1.9 5.2 2.4-.5.4-4.6zM53.1 29.4l2 4.8-2.5.1-.3-4.6z" fill="#6A1A25"/><path d="M50.2 34.5l.3.6M51.2 34.3l.2.6M54.4 34l.2.6M55.2 33.8l.3.5" stroke="#D9B26A" stroke-width=".35" stroke-linecap="round"/><ellipse cx="52.6" cy="29.4" rx="1.5" ry="1.2" fill="#8E2734"/>'],
    ["lv3o", '<path d="M36.4 11.4c-.3-4.2 4.4-7 10.4-7 6.2 0 10.7 2.6 10.7 5.8 0 1-.5 1.8-1.4 2.2q-9.6-2.6-19.2.6c-.3-.5-.5-1-.5-1.6z" fill="#B8946A" stroke="#7A5C3C" stroke-width=".55"/><path d="M38.4 9.6q8-2.6 16.6-.6M39.4 7.4q7-2.2 14-.6" fill="none" stroke="#7A5C3C" stroke-width=".4" stroke-dasharray=".6 .9" opacity=".7"/><path d="M40 7.2q4-2.4 9-2.2" fill="none" stroke="#E6CFA8" stroke-width=".7" stroke-linecap="round" opacity=".8"/><path d="M55.4 11q3.9.3 5.8 2.2-.5.9-1.8.8-2.2-.9-4.8-1.3z" fill="#8E6E4A" stroke="#6A4F33" stroke-width=".45" stroke-linejoin="round"/><circle cx="46.8" cy="4.5" r=".7" fill="#7A5C3C"/>']],
    fx: ["✦", "·", "✧"], c: "#E7C58A", t2: "체크 스카프 둘렀어요. 산책 갈 준비 완료멍!", t3: "트위드 헌팅캡까지! 동네 산책왕이멍 ✦" };
  PFI.main_bear = { bag: ["#8DB27A", "#4E6B3E", "#DCE8D2"], H: [
    ["lv2p", '<path d="M36.2 23.8c3 2.9 6.6 4 10.3 4s7.3-1.1 10.3-4l.4 3.4c-3.1 2.8-6.8 4-10.7 4s-7.6-1.2-10.7-4z" fill="#C98F3E"/><path d="M36.5 25.6c3 2.7 6.6 3.8 10 3.8s7-1.1 10-3.8" fill="none" stroke="#F1DFB6" stroke-width=".7"/><path d="M38 25.4l.8 1.6M40.4 26.8l.6 1.7M43 27.7l.4 1.8M45.8 28.1v1.8M48.6 27.9l-.3 1.8M51.2 27.2l-.5 1.7M53.6 26l-.7 1.7M55.6 24.6l-.8 1.6" stroke="#A8732C" stroke-width=".45" stroke-linecap="round"/><path d="M39.4 27.4l-1.2 6.8h3.4l.7-6.4z" fill="#BF8536"/><path d="M38.7 30.9h3" stroke="#F1DFB6" stroke-width=".8"/><path d="M38.5 34.2v1M39.4 34.2v1M40.3 34.2v1M41.2 34.2v1" stroke="#BF8536" stroke-width=".5" stroke-linecap="round"/>'],
    ["lv3o", '<g transform="rotate(-10 46.3 7)"><path d="M42.2 8.4l-.6-4.4 2.2 1.9 2.5-3.3 2.5 3.3 2.2-1.9-.6 4.4z" fill="#F0C75A" stroke="#A87A12" stroke-width=".5" stroke-linejoin="round"/><path d="M42 8.2h8.6l-.3 1.4h-8z" fill="#D9A93A" stroke="#A87A12" stroke-width=".45"/><path d="M42.8 8.8h7" stroke="#FFF1B8" stroke-width=".35"/><circle cx="41.6" cy="4" r=".5" fill="#FFF6DC"/><circle cx="46.3" cy="2.6" r=".55" fill="#FFF6DC"/><circle cx="51" cy="4" r=".5" fill="#FFF6DC"/><circle cx="46.3" cy="8.9" r=".55" fill="#2E8B6A"/></g><g class="acc"><path d="M57.4 9q2-.4 2.8-2.2" fill="none" stroke="#C9A24A" stroke-width=".4" stroke-dasharray=".5 .7"/><ellipse cx="61" cy="3.9" rx="1.3" ry=".8" fill="#FFFFFF" opacity=".75" stroke="#B9C6D3" stroke-width=".3"/><ellipse cx="62.4" cy="3.8" rx="1.2" ry=".75" fill="#FFFFFF" opacity=".75" stroke="#B9C6D3" stroke-width=".3"/><ellipse cx="61.8" cy="5.6" rx="2.1" ry="1.5" fill="#F5C542"/><path d="M61.2 4.3q.5 1.3 0 2.6M62.4 4.3q.4 1.3 0 2.6" fill="none" stroke="#3A2E2E" stroke-width=".55"/><circle cx="63.4" cy="5.3" r=".3" fill="#3A2E2E"/></g>']],
    fx: ["✦", "✿", "✧"], c: "#F0C75A", t2: "포근한 꿀색 목도리! 겨울잠도 따뜻하곰~", t3: "작은 금 왕관에 꿀벌 친구까지. 숲속 왕이곰 ✦" };
  PFI.main_rac = { bag: ["#8C8FA6", "#4A4D63", "#E0E1EA"], H: [
    ["lv2o", '<path d="M37.6 10.8c-.6-2.2-.2-4.6 1.4-6.4 1.8-2 4.6-2.8 7.6-2.6 4.4.2 8 2.6 8.8 6.4l.2 2.4z" fill="#3C4250"/><path d="M40 6q3-2.6 7.6-2.8" fill="none" stroke="#596276" stroke-width=".8" stroke-linecap="round"/><path d="M36.8 10.4q9.8-2.2 19.4 0l-.2 2.6q-9.5-2.2-19 0z" fill="#2C313C"/><path d="M38.4 10.2v2.4M40.2 9.9v2.4M42 9.7v2.4M43.8 9.6v2.4M45.6 9.5v2.4M47.4 9.5v2.4M49.2 9.6v2.4M51 9.7v2.4M52.8 9.9v2.4M54.6 10.2v2.4" stroke="#465065" stroke-width=".4"/><rect x="50.6" y="10.5" width="2.8" height="1.7" rx=".35" fill="#C49A6C"/>'],
    ["lv3o", '<path d="M37 9.4c-.6-3.2 3.4-5.8 9.4-6 6.6-.2 11.4 2.2 11.2 5.2-.1 1.2-1.2 1.8-2.6 1.6-5.6-1-11.4-1-16.2.6-1 .3-1.6-.4-1.8-1.4z" fill="#1F2A44"/><path d="M37.6 9.9q9-2.2 18.2-.2" fill="none" stroke="#141C30" stroke-width=".8"/><path d="M40.4 6q4-2 9.6-1.8" fill="none" stroke="#34416A" stroke-width=".9" stroke-linecap="round"/><path d="M46.4 3.5l.2-1.4" stroke="#1F2A44" stroke-width="1.1" stroke-linecap="round"/><path d="M46.5 27.7l-4.1-2.2q-.8 2.2 0 4.4zM46.5 27.7l4.1-2.2q.8 2.2 0 4.4z" fill="#6E1424"/><path d="M43.4 26.6l1.8.9M43.4 28.8l1.8-.9M49.6 26.6l-1.8.9M49.6 28.8l-1.8-.9" stroke="#8E2A3C" stroke-width=".35"/><rect x="45.6" y="26.8" width="1.8" height="1.8" rx=".5" fill="#8E1D32"/>']],
    fx: ["✦", "♦", "✧"], c: "#D4AF37", t2: "차콜 니트 비니. 오늘도 몰래 운동하러 간다 너굴~", t3: "네이비 베레모에 벨벳 보타이. 신사 너굴이 등장 ✦" };
  PFI.main_ott = { bag: ["#7FA7C9", "#3A5D7E", "#DCE8F3"], H: [
    ["lv2p", '<path d="M37 24.8c3 2.4 6.2 3.4 9.5 3.4s6.5-1 9.5-3.4l-.8 2.6c-2.6 2-5.6 3-8.7 3s-6.1-1-8.7-3z" fill="#1E2F5C"/><path d="M37.6 25.9c2.8 2.1 5.8 3 8.9 3s6.1-.9 8.9-3" fill="none" stroke="#FFFFFF" stroke-width=".5"/><path d="M45.7 30.4l-1 3.4 1.8-.6zM47.3 30.4l1 3.4-1.8-.6z" fill="#B21E2C"/><ellipse cx="46.5" cy="29.8" rx="1.4" ry="1.1" fill="#C8202F"/>'],
    ["lv3o", '<path d="M36.6 10.6c.2-3.6 4.6-5.8 9.9-5.8s9.7 2.2 9.9 5.8z" fill="#F7F7F2" stroke="#C9CBD2" stroke-width=".5"/><path d="M39.2 7.6q3.6-1.8 7.6-1.6" fill="none" stroke="#FFFFFF" stroke-width=".8" stroke-linecap="round"/><path d="M36.4 10.2q10.1-1.2 20.2 0l-.1 2.4q-10-1.2-20 0z" fill="#1E2F5C"/><path d="M37.6 12q8.9-1 17.8 0" fill="none" stroke="#D4AF37" stroke-width=".45"/><path d="M48.6 12.4q5.4-.4 9.4 1.6-1.6 1.4-4.4 1.2-3-.4-5-2.8z" fill="#15171C"/><path d="M51 13q3-.2 5.4.8" fill="none" stroke="#5A6070" stroke-width=".4" stroke-linecap="round"/><ellipse cx="46.5" cy="11.1" rx="1.5" ry="1.05" fill="#D4AF37" stroke="#9C7A1E" stroke-width=".3"/><path d="M46.5 10.5v1.3M45.9 11.5q.6.6 1.2 0" fill="none" stroke="#1E2F5C" stroke-width=".3" stroke-linecap="round"/>']],
    fx: ["✦", "◦", "✧"], c: "#9CC9EA", t2: "세일러 스카프 매고 출항 준비 완료달~", t3: "캡틴 모자까지! 달달이 선장님 등장 ✦" };
  /* 레벨 치장 채우기 — 그림 안 빈칸(<!--B0--> 몸 앞 · <!--B--> 몸 위 · <!--H--> 머리 · <!--W--> 고양이 선 몸 · <!--S--> 고양이 앉은 몸)에 동물별 치장, 가방은 모양 같고 색만 다름
     lv2o = Lv.2에만 · lv2p = Lv.2부터 계속 · lv3o = Lv.3부터 (2026-11-20 "애들 컨셉에 맞게 치장, 가방은 동일(색만 다르게)") */
  function pfDeco(svg, id) {
    var P = PFI[id] || {};
    if (P.bag) svg = svg.replace(/#FFD15C/g, P.bag[0]).replace(/#C98A12/g, P.bag[1]).replace(/#FFE9A8/g, P.bag[2]);
    ["B0", "B", "H", "W", "S"].forEach(function (k) {
      svg = svg.replace("<!--" + k + "-->", (P[k] || []).map(function (x) { return x[0] === "all" ? '<g class="acc">' + x[1] + '</g>' : '<g class="lvx ' + x[0] + '">' + x[1] + '</g>'; }).join(""));
    });
    return svg;
  }
  function pfKey(id) { return id === "main" ? petX().key : id; }
  function frSvg(F) {   /* 토롱이 친구는 치장을 먼저 넣고 색을 바꿈 → 치장 테두리가 그 친구 선 색을 따라감(2026-11-20 "붙여넣은 느낌, 자연스럽게") */
    return F.pet === "cat" ? pfDeco(frSvg0(F), F.id) : frSvg0(F, pfDeco(BNY_SVG, F.id));
  }
  function frSvg0(F, BS) {
    if (F.pet === "cat") return CAT_SVG.replace("<svg ", '<svg class="frs-' + F.id + '" ').replace(/#FFF3E2/g, F.fur).replace(/#F3D9B8/g, F.stripe).replace(/#EBCBA4/g, F.leg)
      .replace(/#D6204F/g, F.band).replace(/#B8173F/g, F.band).replace(/#3A2E2E/g, F.eye || "#3A2E2E").replace("</svg>", (F.acc || "") + "</svg>");
    return (BS || BNY_SVG).replace('<svg class="b-all"', '<svg class="b-all frs-' + F.id + '"').replace(/#FFE8EE/g, F.fur).replace(/#B8325A/g, F.line).replace(/#D6204F/g, F.band).replace("</svg>", F.acc + "</svg>");
  }
  function frSeen() { try { return JSON.parse(localStorage.getItem("ptnote:" + RT_SLUG + ":fr") || "[]"); } catch (e) { return []; } }
  function frDex() {
    if (!FR.some(function (F) { return F.pet === M.pet; })) {   /* 찾아온 동물(친구 없음) — 내 동물 카드 */
      var X = petX(), q = PETS.filter(function (p) { return p.id === "main"; })[0], lv = pfLv("main");
      rtSheet(X.qn + " (" + X.kind + ")", '<div class="frdex pvdex"><div class="frd"><div class="frd-pic">' + (q ? q.svg() : "") + '</div><b>' + esc(X.qn) + (lv > 1 ? ' <em class="frd-lv">Lv.' + lv + '</em>' : '') + '</b><small>' + esc(X.desc) + '</small></div></div>' +
        '<p class="rts-note">좋아하는 먹이: ' + esc(X.food) + ' · 운동할수록 먹이주머니에 모여요</p>', function () {}, false);
      return;
    }
    var seen = frSeen(), L = FR.filter(function (F) { return F.pet === M.pet; }), got = L.filter(function (F) { return seen.indexOf(F.id) >= 0; }).length;
    var body = '<p class="rts-note">날마다 다른 친구가 놀러 와요 · 만난 친구 ' + got + '/' + L.length + '</p><div class="frdex">' + L.map(function (F) {
      var ok = seen.indexOf(F.id) >= 0;
      return '<div class="frd' + (ok ? '' : ' unk') + '"><div class="frd-pic">' + frSvg(F) + '</div><b>' + (ok ? esc(F.name) + (pfLv(F.id) > 1 ? ' <em class="frd-lv">Lv.' + pfLv(F.id) + '</em>' : '') : '???') + '</b><small>' + (ok ? esc(F.desc) : '아직 못 만났어요') + '</small></div>';
    }).join("") + '</div>';
    rtSheet(M.pet === "cat" ? "고양이 친구 도감" : "토롱이 친구 도감", body, function () {}, false);
  }
  function frFound(F) {
    var seen = frSeen(); if (seen.indexOf(F.id) >= 0) return;
    if (document.querySelector(".frpop-bg, .rtsheet-bg, .bgpop-wrap, .npop, .tour")) { setTimeout(function () { frFound(F); }, 1200); return; }   /* 다른 창이 떠 있으면 닫힌 뒤에 */
    seen.push(F.id); try { localStorage.setItem("ptnote:" + RT_SLUG + ":fr", JSON.stringify(seen)); } catch (e) {}
    var bg = document.createElement("div"); bg.className = "frpop-bg";
    bg.innerHTML = '<div class="frpop"><small>새 친구 발견!</small><div class="frpop-pic">' + frSvg(F) + '</div><b>' + esc(F.name) + '</b><p>' + esc(F.desc) + '</p>' +
      '<div class="frpop-b"><button type="button" class="rtb" data-dex>친구 도감</button><button type="button" class="rtb fill" data-ok>반가워!</button></div></div>';
    document.body.appendChild(bg);
    bg.addEventListener("click", function (e) { if (e.target === bg || e.target.closest("[data-ok]")) bg.remove(); else if (e.target.closest("[data-dex]")) { bg.remove(); frDex(); } });
  }
  petSpawn(M.pet, null);
  (function () {   /* 2026-11-21 "먹이창고 더 빠르게" — 주머니 탭도 펫과 같은 순간에(선생님 폰·체험 링크는 뒤에서 따로) */
    var co = false, dm = TRY || /[?&]demo\b/.test(location.search);
    try { co = !!(sessionStorage.getItem("ptcoach") || localStorage.getItem("ptcoach")); dm = dm || !!sessionStorage.getItem("ptdemo"); } catch (e) {}
    if (PX[M.pet] && !co && !dm && !(PF_VIS && !(PF && PF.vp))) pfBtn();
  })();
  if (M.pet === "bunny" || M.pet === "cat") (function () {
    var seed = 0, str = ymd(new Date()) + RT_SLUG;
    for (var i = 0; i < str.length; i++) seed = (seed * 31 + str.charCodeAt(i)) >>> 0;
    function rnd() { seed = (seed * 1103515245 + 12345) >>> 0; return (seed >>> 8) / 16777216; }
    var cnt = Math.floor(rnd() * 3), pool = FR.filter(function (F) { return F.pet === M.pet; }), today = [];
    while (today.length < cnt) today.push(pool.splice(Math.floor(rnd() * pool.length), 1)[0]);
    today.forEach(function (F, j) { setTimeout(function () { petSpawn(M.pet, F); setTimeout(function () { frFound(F); }, 2500); }, j * 200); });   /* 2026-11-21 "한번에 뜨게" — 기다리지 않고 바로 */
  })();
  /* ===== 먹이주머니 · 동물 레벨업 (2026-11-20 장동욱 "배지 얻으면 4개, 루틴 한 종목 체크·출석 2개, 인바디 3개 등 활동하면 당근·생선을 줌 →
     옆 작은 버튼 누르면 먹이주머니 → 꾹 누르면 모았던 당근이 나오고 지정 토끼한테 뿌리면 달려가서 먹음 → 많이 먹으면 레벨업, 치장이 달라짐(가방·덤벨·특수효과),
     레벨은 3까지 오래 걸리게, 고양이도 마찬가지")
     pet:"bunny"(당근)·"cat"(생선) 회원만. 번 개수 = 2×출석일 + 2×✓한 종목(날짜별 가장 많았던 수) + 4×받은 배지 + 3×인바디 기록 — 모두 '가장 많았던 값'으로만 셈(✓ 풀었다 다시 해도 안 늘어남)
     처음 켤 때 지금까지 한 건 기준선(b0)으로 잡고 선물 10개. 저장 localStorage + 창고 mw:<주소>:pet(폰 바꿔도 이어짐, 값마다 큰 쪽으로 합침). 선생님 폰·체험은 주머니 없음.
     레벨: 그 동물이 먹은 개수 PF_LV(120 → Lv.2 가방+작은 덤벨, 500 → Lv.3 큰 덤벨+왕관+반짝이) — 동물마다 따로(주인공 main, 친구는 친구 id) */
  function pfLv(id) { var n = (PF && PF.xp && PF.xp[id]) || 0; return n >= PF_LV[1] ? 3 : n >= PF_LV[0] ? 2 : 1; }
  function pfFood() { return petX().food; }
  function pfIcon(w) { return petX().ico(w); }
  function pfNow() {   /* 지금 기록으로 센 값 — 출석일 수·배지 수·인바디 수, ✓는 최근 14일 날짜별 개수 */
    var a = 0, b = 0, i = 0, d = {};
    try { a = attLoad().length; } catch (e) {}
    try { b = badgeList().filter(function (x) { return x.on; }).length; } catch (e) {}
    try { i = (ibData || []).length; } catch (e) {}
    var cut = new Date(); cut.setDate(cut.getDate() - 14); cut = ymd(cut);
    try { var o = (LG && LG.d) || {}; for (var k in o) if (k >= cut && Array.isArray(o[k])) d[k] = o[k].length; } catch (e) {}
    return { a: a, b: b, i: i, d: d, cut: cut };
  }
  function pfEarned(o) { var s = 0, k; for (k in (o.cd || {})) s += o.cd[k]; return 2 * (o.am || 0) + 2 * ((o.cb || 0) + s) + 4 * (o.bm || 0) + 3 * (o.im || 0); }
  function pfStock() { return PF ? Math.max(0, pfEarned(PF) - (PF.b0 || 0) - (PF.sp || 0)) : 0; }
  function pfSave(push) {
    if (!PF) return; PF.at = Date.now();
    try { localStorage.setItem(PF_LS, JSON.stringify(PF)); } catch (e) {}
    if (!push || DEMO || TRY || COACH_MODE || !ATT_API) return;
    clearTimeout(PF_T); PF_T = setTimeout(function () { rtPost({ a: "kv_set", k: "mw:" + SLUG + ":pet", v: PF }).catch(function () {}); }, 2000);
  }
  function pfScan(quiet) {   /* 새로 한 활동이 있으면 먹이 추가 (+n 떠오름) */
    if (!PF_ON || !PF) return;
    var n = pfNow(), before = pfStock(), ch = false, k;
    if (n.a > (PF.am || 0)) { PF.am = n.a; ch = true; }
    if (n.b > (PF.bm || 0)) { PF.bm = n.b; ch = true; }
    if (n.i > (PF.im || 0)) { PF.im = n.i; ch = true; }
    PF.cd = PF.cd || {};
    for (k in PF.cd) if (k < n.cut) { PF.cb = (PF.cb || 0) + PF.cd[k]; delete PF.cd[k]; ch = true; }   /* 14일 지난 날은 합계로 접음 */
    for (k in n.d) if (n.d[k] > (PF.cd[k] || 0)) { PF.cd[k] = n.d[k]; ch = true; }
    if (PF_VIS && !PF.vp) { if (ch) pfSave(true); pvCheck(); return; }
    if (!ch) return;
    pfSave(true);
    var got = pfStock() - before;
    if (got > 0 && !quiet) pfGain(got);
    pfBtnDraw();
  }
  function pfStart() {   /* 창고 기록을 받은 뒤 한 번 — 처음이면 지금까지 한 건 기준선, 선물 10개 */
    if (PF_ON || !(M.pet === "bunny" || M.pet === "cat" || PF_VIS) || DEMO || TRY || COACH_MODE) return;
    PF_ON = true;
    if (!PF || typeof PF !== "object" || PF.b0 == null) {
      var n = pfNow(); PF = { am: n.a, bm: n.b, im: n.i, cb: 0, cd: n.d, sp: 0, xp: (PF && PF.xp) || {}, at: 0 };
      if (PF_VIS) { PF.b0 = pfEarned(PF); PF.a0 = n.a; pfSave(true); }   /* 찾아오는 동물: 지금부터 쌓이는 활동으로 셈(선물은 찾아올 때) */
      else { PF.b0 = pfEarned(PF) - 10; pfSave(true);
        setTimeout(function () { pfGain(10, pfFood() + " 10개 선물! 운동하면 더 모여요"); }, 2500); }
    }
    if (PF_VIS && !PF.vp) { pfScan(true); setInterval(function () { if (!document.hidden) pfScan(!PF.vp); }, 4000); return; }   /* 아직 안 찾아옴 — 버튼 없이 조용히 셈 */
    PETS.forEach(function (p) { p.dress(); });
    pfBtn(); pfScan(true);
    setInterval(function () { if (!document.hidden) pfScan(); }, 4000);
  }
  function pfServer(kv) {
    if (!(M.pet === "bunny" || M.pet === "cat" || PF_VIS) || DEMO || TRY) return;
    var v = kv && kv["mw:" + SLUG + ":pet"];
    if (COACH_MODE) { if (v && v.b0 != null) { PF = v; PETS.forEach(function (p) { p.dress(); }); } if (PF_VIS) { if (PF && PF.vp) pvArrive(PF.vp, 1); return; } pfBtn(); pfBtnDraw(); return; }   /* 선생님 폰: 주머니는 보기만(2026-11-20 "보기만") — 회원님 먹이 개수·레벨, 저장·뿌리기 없음 */
    if (v && typeof v === "object" && v.b0 != null) {
      if (!PF || PF.b0 == null) PF = JSON.parse(JSON.stringify(v));
      else {   /* 두 폰 기록 합치기 — 값마다 큰 쪽 */
        var o = PF, k, more = false;
        ["am", "bm", "im", "cb", "sp"].forEach(function (f) { if ((v[f] || 0) > (o[f] || 0)) o[f] = v[f]; else if ((o[f] || 0) > (v[f] || 0)) more = true; });
        if ((v.b0 || 0) > (o.b0 || 0)) o.b0 = v.b0; else if (o.b0 > v.b0) more = true;
        o.cd = o.cd || {}; o.xp = o.xp || {};
        for (k in (v.cd || {})) if (v.cd[k] > (o.cd[k] || 0)) o.cd[k] = v.cd[k];
        for (k in o.cd) if (!(v.cd || {})[k] || o.cd[k] > v.cd[k]) more = true;
        for (k in (v.xp || {})) if (v.xp[k] > (o.xp[k] || 0)) o.xp[k] = v.xp[k];
        for (k in o.xp) if (!(v.xp || {})[k] || o.xp[k] > v.xp[k]) more = true;
        if (v.vp && !o.vp) { o.vp = v.vp; if (v.a0 != null) o.a0 = v.a0; } else if (o.vp && !v.vp) more = true;   /* 찾아온 동물은 먼저 온 쪽 */
        if (o.a0 == null && v.a0 != null) o.a0 = v.a0;
        pfSave(more);
      }
      try { localStorage.setItem(PF_LS, JSON.stringify(PF)); } catch (e) {}
      if (PF_VIS && PF.vp) pvArrive(PF.vp, 1);
      PETS.forEach(function (p) { p.dress(); });
      pfBtnDraw();
    }
    else if (PF && PF.b0 != null) pfSave(true);
    if (!PF_SV) { PF_SV = true; var w = 0; (function go() { if (ibReady === null && w++ < 8) { setTimeout(go, 1000); return; } pfStart(); })(); }
  }
  /* ---- 주머니 버튼 · 주머니 창 */
  function pfBtn() {
    if (document.querySelector(".pfbtn")) return;
    var b = document.createElement("button"); b.type = "button"; b.className = "pfbtn"; b.setAttribute("aria-label", "먹이주머니 열기");
    document.body.appendChild(b); pfBtnDraw();
    b.addEventListener("click", function (e) { e.preventDefault(); e.stopPropagation(); if (document.querySelector(".pfbag")) pfClose(); else pfOpen(); });
  }
  function pfBtnDraw() {
    var b = document.querySelector(".pfbtn"); if (!b) return;
    var n = pfStock();
    b.innerHTML = '<svg viewBox="0 0 40 40" width="17" height="17" aria-hidden="true"><path d="M13 12c2-3 12-3 14 0" fill="none" stroke="#7A4A22" stroke-width="2.4" stroke-linecap="round"/><path d="M12 13c-6 6-7 20 8 21 15-1 14-15 8-21z" fill="#E7B477" stroke="#7A4A22" stroke-width="2" stroke-linejoin="round"/><path d="M13.5 15.5c4 2 9 2 13 0" fill="none" stroke="#7A4A22" stroke-width="1.6" stroke-linecap="round"/><circle cx="20" cy="25" r="4.2" fill="#FFCF3F" stroke="#7A4A22" stroke-width="1.3"/></svg>' +
      '<b class="pfn' + (n ? '' : ' z') + '">' + (n > 999 ? "999+" : n) + '</b>';
  }
  function pfGain(n, msg) {
    var b = document.querySelector(".pfbtn"); if (!b) return;
    b.classList.remove("wig"); void b.offsetWidth; b.classList.add("wig");
    var r = b.getBoundingClientRect(), e = document.createElement("div");
    e.className = "pfplus"; e.innerHTML = (n ? pfIcon(18) + '<b>+' + n + '</b>' : '') + (msg ? '<small>' + esc(msg) + '</small>' : '');
    e.style.right = (window.innerWidth - r.right) + "px"; e.style.top = (r.top - 8) + "px";
    document.body.appendChild(e); setTimeout(function () { e.remove(); }, msg ? 3200 : 1700);
  }
  function pfClose() { var p = document.querySelector(".pfbag"); if (p) { p.classList.add("out"); setTimeout(function () { p.remove(); }, 130); } }
  function pfOpen() {   /* 2026-11-21 "먹이창고 더 빠르게" — 계산(pfScan: 배지·출석 다시 셈)은 창이 뜬 뒤에 */
    var p = document.createElement("div"); p.className = "pfbag";
    var n = pfStock(), F = pfFood(), list = PETS.map(function (q) {
      var lv = pfLv(q.id), xp = ((PF && PF.xp) || {})[q.id] || 0, lo = lv === 1 ? 0 : lv === 2 ? PF_LV[0] : PF_LV[1], hi = lv === 1 ? PF_LV[0] : PF_LV[1];
      return '<div class="pf-row"><b>' + esc(q.name) + '</b><span class="pf-lv l' + lv + '">Lv.' + lv + '</span>' +
        (lv < 3 ? '<i class="pf-bar"><i style="width:' + Math.min(100, Math.round((xp - lo) / (hi - lo) * 100)) + '%"></i></i><small>' + (hi - xp) + '개 더</small>' : '<small class="max">최고 레벨 ✨</small>') + '</div>';
    }).join("");
    p.innerHTML = '<div class="pf-top"><b>먹이주머니</b><button type="button" class="pf-x" aria-label="닫기">✕</button></div>' +
      '<div class="pf-food' + (n && !COACH_MODE ? '' : ' empty') + (COACH_MODE ? ' coach' : '') + '">' + pfIcon(44) + '<b>' + (COACH_MODE ? '회원님 ' : '') + F + ' ' + n + '개</b><small>' + (COACH_MODE ? (PF ? '선생님 폰은 보기만 돼요 · 먹이는 회원님 폰에서' : '회원님이 아직 주머니를 안 열었어요') : n ? '꾹 누른 채로 끌어서 ' + petX().lab + '한테 뿌려요' : '운동하면 ' + jo(F, '이', '가') + ' 모여요!') + '</small></div>' +
      '<div class="pf-how"><span>🏅 배지 +4</span><span>📊 인바디 +3</span><span>✅ 출석 +2</span><span>💪 종목 ✓ +2</span></div>' +
      (list ? '<div class="pf-pets">' + list + '</div>' : '') +
      '<p class="pf-note">많이 먹으면 레벨업! 친구마다 다른 치장이 생겨요</p>' +
      (COACH_MODE ? '' : '<button type="button" class="pf-hide">🏠 펫 집에 들여보내기 <small>⚙️ 설정에서 다시 꺼내요</small></button>');
    document.body.appendChild(p);
    p.querySelector(".pf-x").addEventListener("click", pfClose);
    var hb = p.querySelector(".pf-hide"); if (hb) hb.addEventListener("click", function () { petOffSet(true); });
    setTimeout(function () { document.addEventListener("pointerdown", function off(e) { if (!p.isConnected) { document.removeEventListener("pointerdown", off, true); return; } if (!e.target.closest(".pfbag, .pfbtn")) { pfClose(); document.removeEventListener("pointerdown", off, true); } }, true); }, 0);
    if (!COACH_MODE) pfHold(p.querySelector(".pf-food"), p);
    if (!COACH_MODE) setTimeout(function () { var b0 = pfStock(); pfScan(true); var n2 = pfStock();
      if (n2 !== b0 && p.isConnected) { var fb = p.querySelector(".pf-food > b"); if (fb) fb.textContent = F + " " + n2 + "개"; p.querySelector(".pf-food").classList.toggle("empty", !n2); pfBtnDraw(); } }, 260);
  }
  /* 꾹 누르면 주머니에서 먹이가 하나씩 천천히 쏟아져 손가락을 따라옴(최대 10개) → 놓은 자리에 떨어지고 가장 가까운 동물이 달려가서 먹음 */
  function pfHold(el, bag) {
    var hand = null, cnt = 0, tmr = 0, sx = 0, sy = 0, lx = 0, ly = 0, on = false;
    function draw() { if (hand) hand.innerHTML = pfIcon(34) + '<b>' + cnt + '</b>'; }
    function pos() { if (hand) { hand.style.left = lx + "px"; hand.style.top = ly + "px"; } }
    el.addEventListener("pointerdown", function (e) {
      var st = pfStock();
      if (!st) { el.classList.remove("no"); void el.offsetWidth; el.classList.add("no"); return; }
      if (!PETS.length) return;
      e.preventDefault(); on = true; try { el.setPointerCapture(e.pointerId); } catch (x) {}
      sx = lx = e.clientX; sy = ly = e.clientY; cnt = 1;
      hand = document.createElement("div"); hand.className = "pfhand"; document.body.appendChild(hand); draw(); pos();
      var max = Math.min(st, 10), step = 420;   /* 2026-11-22 "누르니까 먹이 한번에 주던데" → 천천히 일정하게(0.42초에 1개, 빨라지지 않음), 최대 10개 */
      (function pour() { tmr = setTimeout(function () { if (!on || cnt >= max) return; cnt++; draw(); hand.classList.remove("bump"); void hand.offsetWidth; hand.classList.add("bump"); try { navigator.vibrate && navigator.vibrate(6); } catch (x) {} pour(); }, step); })();
    });
    el.addEventListener("pointermove", function (e) {
      if (!on) return; lx = e.clientX; ly = e.clientY; pos();
      if (Math.abs(lx - sx) + Math.abs(ly - sy) > 24) bag.classList.add("drag");
    });
    function up(e) {
      if (!on) return; on = false; clearTimeout(tmr);
      if (e && e.type === "pointercancel") { if (hand) hand.remove(); hand = null; bag.classList.remove("drag"); return; }
      var h = hand; hand = null; if (h) h.remove();
      pfClose(); pfThrow(lx, ly, cnt);
    }
    el.addEventListener("pointerup", up); el.addEventListener("pointercancel", up);
  }
  function pfThrow(cx, cy, n) {
    if (!n || n > pfStock()) return;
    var best = null, bd = 1e9;
    PETS.forEach(function (q) { if (!q.wrap.isConnected || q.busy()) return; var r = q.el.getBoundingClientRect(), d = Math.abs(r.left + r.width / 2 - cx); if (d < bd) { bd = d; best = q; } });
    if (!best) { pfGain(0, "다들 먹는 중이에요! 조금 있다 줘요"); return; }
    PF.sp = (PF.sp || 0) + n; pfSave(true); pfBtnDraw();
    var wr = best.wrap.getBoundingClientRect(), gx = Math.max(wr.left + 14, Math.min(wr.right - 14, cx)), gy = wr.bottom - 4;
    var pile = document.createElement("div"); pile.className = "pfpile";
    var k = Math.min(n, 6), html = "";
    for (var i = 0; i < k; i++) html += '<span style="--dx:' + ((i - (k - 1) / 2) * 7) + 'px;--r:' + ((i * 47) % 70 - 35) + 'deg">' + pfIcon(18) + '</span>';
    pile.innerHTML = html + (n > 1 ? '<b>×' + n + '</b>' : '');
    pile.style.left = gx + "px"; pile.style.top = gy + "px"; pile.style.setProperty("--fy", Math.min(0, cy - gy) + "px");
    document.body.appendChild(pile);
    requestAnimationFrame(function () { requestAnimationFrame(function () { pile.classList.add("land"); }); });
    setTimeout(function () { best.goEat(gx - wr.left, n, pile); }, 420);
  }
  /* 레벨업 창 — 새 치장을 크게 보여 줌 */
  function pfLevelUp(q, lv) {
    var PI = PFI[pfKey(q.id)] || PFI.main_b, say = lv === 3 ? PI.t3 : PI.t2;
    var bg = document.createElement("div"); bg.className = "frpop-bg pflvup";
    bg.innerHTML = '<div class="frpop"><small>LEVEL UP! Lv.' + lv + '</small><div style="--pfc:' + PI.c + '" class="frpop-pic pet lv' + lv + (M.pet === "bunny" ? " hop sit" : " sit") + '">' + q.svg() + (lv === 3 ? '<span class="plv">' + PI.fx.map(function (c) { return '<i>' + c + '</i>'; }).join("") + '</span>' : '') + '</div><b>' + esc(q.name) + '</b><p>' + say + '</p>' +
      '<div class="frpop-b"><button type="button" class="rtb fill" data-ok>최고야!</button></div></div>';
    document.body.appendChild(bg);
    bg.addEventListener("click", function (e) { if (e.target === bg || e.target.closest("[data-ok]")) bg.remove(); });
  }
  setTimeout(function () { if (PX[M.pet] && !DEMO && !TRY && !COACH_MODE && !(PF_VIS && !(PF && PF.vp))) pfBtn(); }, 0);   /* 2026-11-21 "펫이랑 먹이창 너무 늦게 뜬다, 한번에" — 주머니 탭은 창고 응답 기다리지 않고 바로(DEMO·COACH_MODE가 정해진 뒤 · 개수는 이 폰 기록, 응답 오면 맞춰짐) */
  setTimeout(function () { if (M.pet === "bunny" || M.pet === "cat" || PF_VIS) { if (!ATT_API) pfServer(null); setTimeout(function () { if (!PF_SV) pfServer(null); }, 12000); } }, 0);
  function skinDeco() {   /* 토롱이 그림을 정해진 칸에 하나씩 (이미 있으면 그대로) — 누르기·글자에는 영향 없음(pointer-events none) */
    if (!SKIN) return;
    var T = BASE + "theme/" + SKIN + "/";
    function put(sel, cls, file) {
      Array.prototype.forEach.call(document.querySelectorAll(sel), function (el) {
        var f = typeof file === "function" ? file(el) : file, old = el.querySelector(":scope > .bny");
        if (old && old.getAttribute("data-f") === f) return;
        if (old) old.remove();
        var im = document.createElement("img"); im.className = "bny " + cls; im.src = T + f; im.alt = ""; im.setAttribute("aria-hidden", "true"); im.setAttribute("data-f", f);
        el.appendChild(im);
      });
    }
    put(".stamp", "bny-stamp", function (el) { return el.classList.contains("on") ? "cheer.svg" : "stamp.svg"; });
    put(".thero", "bny-lift", "lift.svg");
    put(".tabs", "bny-peek", "peek.svg");
    put(".hero", "bny-hero", "base.svg");
  }
  if (SKIN) {
    var skinT = 0;
    new MutationObserver(function () { if (!skinT) skinT = requestAnimationFrame(function () { skinT = 0; skinDeco(); }); })
      .observe(document.documentElement, { childList: true, subtree: true });
  }

  var DAY_KEYS = ["sun", "mon", "tue", "wed", "thu", "fri", "sat"];
  var DAY_KO = { mon: "월", tue: "화", wed: "수", thu: "목", fri: "금", sat: "토", sun: "일" };
  var KO_KEY = { "월": "mon", "화": "tue", "수": "wed", "목": "thu", "금": "fri", "토": "sat", "일": "sun" };
  /* "기억해요!" 문구 — 루틴일지 꼬리말(build_log.js FOOTER_MSGS) 23개와 똑같이 (2026-11-04 장동욱 요청)
     + PT 노트에만 있던 복습지용 3개(맨 아래) */
  var QUOTES = [
    "PT는 1시간, 변화는 나머지 시간에 만들어져요",
    "수업은 방향을, 개인운동은 결과를 만듭니다",
    "혼자 하는 1세트가 몸을 바꿉니다",
    "오늘 채운 한 줄이 다음 달 몸이 됩니다",
    "트레이너는 길을 알려주고, 걷는 건 회원님입니다",
    "꾸준함은 재능을 이깁니다. 오늘도 일지대로!",
    "결과는 수업 날이 아니라, 혼자 운동한 날 쌓여요",
    "주 2회 수업 + 개인운동 = 진짜 변화",
    "수업 없는 날도 회원님의 몸은 기다리고 있어요",
    "혼자 하는 운동까지가 PT입니다",
    "일지대로 한 하루하루가 모여 결과가 됩니다",
    "주에 두 번으론 택도 없다!",
    "헬스장이 무섭나요? 회원님의 몸 상태가 무섭나요?",
    "지난달이랑 똑같은 몸, 괜찮으세요?",
    "핑계는 근육이 안 붙어요",
    "일주일은 168시간, PT는 그중 2시간입니다",
    "잔소리 들을 바에 나와라!",
    "회원님의 최고의 동기부여는 회원님의 미래의 모습입니다",
    "변화를 원한다면 변화의 과정을 두려워하지 마세요",
    "체중계 숫자보다 거울 속 모습을 믿으세요",
    "굶는 다이어트는 끝나고, 습관은 남습니다",
    "주사는 살을 빼주지만, 습관은 만들어주지 않아요",
    "체중은 약으로 줄여도, 근육은 운동으로만 붙어요",
    // PT 노트 전용 (복습지)
    "무게보다 자세가 먼저예요",
    "복습한 자세만 내 것이 됩니다",
    "꾸준함은 재능을 이깁니다. 오늘도 복습한 대로!"
  ];

  function esc(s) {
    return String(s == null ? "" : s).replace(/[&<>"']/g, function (c) {
      return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c];
    });
  }
  var CHECK = '<span class="ic ok"><svg aria-hidden="true"><use href="#i-check"/></svg></span>';
  var XIC = '<span class="ic no"><svg aria-hidden="true"><use href="#i-x"/></svg></span>';
  var view = document.getElementById("view");
  /* 아래 탭 (회원 페이지 공통 — 여기서 그림) */
  /* 2026-11-11 앱 화면(시안 A "라이트 네이티브"): 아래 탭 5개 — 목표·몸변화·공지는 '나' 탭(위 칸 전환)과 오른쪽 위 종으로 */
  var TABS = [
    ["home", "홈", '<path d="M3.5 10.5 12 4l8.5 6.5V20a1 1 0 0 1-1 1H15v-6H9v6H4.5a1 1 0 0 1-1-1z" stroke-linejoin="round"/>'],
    ["routine", "운동", '<path d="M6.5 8v8M17.5 8v8M3.5 10v4M20.5 10v4M6.5 12h11" stroke-linecap="round"/>'],
    ["diet", "식단", '<circle cx="13" cy="13" r="6.5"/><path d="M4 4v6M6.5 4v6M4 7h2.5M5.2 10v10" stroke-linecap="round"/>'],
    ["log", "기록", '<rect x="5" y="4" width="14" height="17" rx="2.5"/><path d="M9 3.5h6v3H9z" stroke-linejoin="round"/><path d="m9 13 2 2 4-4.5" stroke-linecap="round" stroke-linejoin="round"/>'],
    ["me", "나", '<circle cx="12" cy="8" r="4"/><path d="M4 21c1-4 4-6 8-6s7 2 8 6" stroke-linecap="round"/>', "goal"]
  ];
  /* 2026-11-14 장동욱 "루틴이랑 복습지 합치고, 기록 탭" — 운동(루틴 | 자세 복습지 전환칸) · 기록(오늘 한 운동·첫날 vs 오늘·근육 지도·인바디) */
  function tabOf(t) { return t === "forms" ? "routine" : /^(body|log)$/.test(t) ? "log" : /^(goal|notice)$/.test(t) ? "me" : t; }
  /* 2026-11-06 몸변화 탭 (인바디) — 그룹 PT 페이지(이름에 ·)·inbody:false 회원은 탭 없음 */
  if (/·/.test(M.name || "") || M.inbody === false) TABS = TABS.filter(function (t) { return t[0] !== "body"; });
  var COACH_MODE = false;
  /* PT 안내서 "실제로 보기"로 들어왔으면 (2026-11-06, 상담 손님에게 선생님 폰으로 보여주는 중):
     이름은 가운데 글자를 O로 가리고, 위 막대에 "← PT 안내서" 버튼. 새 공지 팝업은 안 띄움 */
  var DEMO = null;
  try { DEMO = sessionStorage.getItem("ptdemo"); } catch (e) {}
  if (DEMO && !/^\/coach-[a-z0-9]+\/(guide|intro)\.html#p\d+$/.test(DEMO)) DEMO = null;
  /* 소개 슬라이드 링크(주소 끝 ?demo)로 열어도 이름을 가림 — 돌아가기 버튼은 없음 */
  var DEMO_BACK = DEMO;
  if (!DEMO && /[?&]demo\b/.test(location.search)) DEMO = "link";
  if (DEMO) {
    var REAL = String(M.name || "").split("·").map(function (p) { return p.trim(); }).filter(function (p) { return p.length > 1; });
    var maskName = function (p) { return p.length === 2 ? p.charAt(0) + "O" : p.charAt(0) + new Array(p.length - 1).join("O") + p.charAt(p.length - 1); };
    var hideReal = function (t) { REAL.forEach(function (n) { t = t.split(n).join(maskName(n)); }); return t; };
    M._real = M.name;
    M.name = hideReal(M.name);
    if (M.diet && typeof M.diet === "object" && M.diet.member) M.diet.member = hideReal(M.diet.member);
    document.title = hideReal(document.title);
    var barName = document.querySelector(".bar-in span");
    if (barName) barName.textContent = hideReal(barName.textContent);
    /* 공지 제목 같은 데 섞인 이름도 화면에 그려질 때마다 가림 */
    var viewEl = document.getElementById("view");
    if (viewEl && window.MutationObserver) {
      var scrub = function () {
        var w = document.createTreeWalker(viewEl, NodeFilter.SHOW_TEXT, null), n;
        while ((n = w.nextNode())) { var t = hideReal(n.nodeValue); if (t !== n.nodeValue) n.nodeValue = t; }
      };
      new MutationObserver(scrub).observe(viewEl, { childList: true, subtree: true, characterData: true });
    }
  }
  /* 선생님 페이지에서 들어왔으면 위 막대에 "← 회원 목록" 버튼 (선생님 휴대폰에만 보임) */
  try {
    var coachPath = sessionStorage.getItem("ptcoach") || localStorage.getItem("ptcoach");
    if (coachPath && !TRY) COACH_MODE = true;
    var barIn = document.querySelector(".bar-in");
    if (DEMO_BACK && barIn) {
      var gb = document.createElement("a");
      gb.href = DEMO_BACK; gb.className = "coachback"; gb.textContent = "← PT 안내서";
      barIn.insertBefore(gb, barIn.children[1] || null);
    } else if (coachPath && barIn && /^\/coach-[a-z0-9]+\/$/.test(coachPath) && window.self === window.top) {   /* 아이패드 선생님 페이지 오른쪽 칸(iframe) 안에선 안 붙임 */
      var cb = document.createElement("a");
      cb.href = coachPath; cb.className = "coachback"; cb.textContent = "← 회원 목록";
      cb.addEventListener("click", function () { try { sessionStorage.setItem("vtdir", "back"); } catch (e) {} });
      barIn.insertBefore(cb, barIn.children[1] || null);
    }
  } catch (e) {}
  var tabsIn = document.querySelector(".tabs-in");
  if (tabsIn) {
    tabsIn.innerHTML = TABS.map(function (t) {
      return '<a href="#' + (t[3] || t[0]) + '" data-tab="' + t[0] + '"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">' + t[2] + '</svg>' + t[1] + '</a>';
    }).join("");
    tabsIn.style.gridTemplateColumns = "repeat(" + TABS.length + ", 1fr)";
  }
  (function () {   /* 위 막대 오른쪽: 공지 종(새 공지면 빨간 점) + 내 이름 동그라미(→ 나 탭) */
    var bi = document.querySelector(".bar-in");
    if (!bi || bi.querySelector(".bar-r")) return;
    var nm = String(M.name || "").split("·")[0].trim(), ini = /·/.test(M.name || "") ? "함께" : (nm.length >= 3 ? nm.slice(1) : nm);
    var r = document.createElement("div"); r.className = "bar-r";
    r.innerHTML = '<a class="bell" href="#notice" aria-label="선생님 공지"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M6 9a6 6 0 1 1 12 0c0 6.5 2.5 8.5 2.5 8.5h-17S6 15.5 6 9"/><path d="M10 21h4"/></svg></a>' +
      '<button type="button" class="gear" id="gearBtn" aria-label="설정" aria-haspopup="menu"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.7 1.7 0 0 0 .3 1.8l.1.1a2 2 0 1 1-2.8 2.8l-.1-.1a1.7 1.7 0 0 0-1.8-.3 1.7 1.7 0 0 0-1 1.5V21a2 2 0 1 1-4 0v-.1a1.7 1.7 0 0 0-1.1-1.5 1.7 1.7 0 0 0-1.8.3l-.1.1a2 2 0 1 1-2.8-2.8l.1-.1a1.7 1.7 0 0 0 .3-1.8 1.7 1.7 0 0 0-1.5-1H3a2 2 0 1 1 0-4h.1a1.7 1.7 0 0 0 1.5-1.1 1.7 1.7 0 0 0-.3-1.8l-.1-.1a2 2 0 1 1 2.8-2.8l.1.1a1.7 1.7 0 0 0 1.8.3H9a1.7 1.7 0 0 0 1-1.5V3a2 2 0 1 1 4 0v.1a1.7 1.7 0 0 0 1 1.5 1.7 1.7 0 0 0 1.8-.3l.1-.1a2 2 0 1 1 2.8 2.8l-.1.1a1.7 1.7 0 0 0-.3 1.8V9a1.7 1.7 0 0 0 1.5 1H21a2 2 0 1 1 0 4h-.1a1.7 1.7 0 0 0-1.5 1z"/></svg></button>' +
      '<a class="ava" href="#goal" aria-label="나의 목표 · 출석">' + esc(ini) + '</a>';
    bi.appendChild(r);
  })();
  function wkSeg(cur) {   /* 2026-11-14 '운동' 탭 위 전환 칸: 루틴 / 자세 복습지 */
    var nNew = (M.forms || []).filter(function (f) { return formNew(f); }).length;
    return '<nav class="meseg wkseg" aria-label="운동">' +
      '<a href="#routine"' + (cur === "routine" ? ' aria-current="page"' : '') + '>루틴</a>' +
      '<a href="#forms"' + (cur === "forms" ? ' aria-current="page"' : '') + '>자세 복습지' + (nNew ? ' <i class="wk-new">NEW</i>' : (M.forms || []).length ? ' <small>' + M.forms.length + '</small>' : '') + '</a></nav>';
  }
  function meSeg(cur) {   /* '나' 탭 위 전환 칸: 목표·출석 / 몸변화 / 공지 */
    var L = [["goal", "목표 · 출석"], ["notice", "공지"]];   /* 몸변화는 2026-11-14 기록 탭으로 */
    return '<nav class="meseg" aria-label="나의 기록">' + L.map(function (x) {
      return '<a href="#' + x[0] + '"' + (x[0] === cur ? ' aria-current="page"' : '') + '>' + x[1] + '</a>';
    }).join("") + '</nav>';
  }


  /* 순환 루틴 (2026-11-04 임애란님, 교대근무라 쉬는 요일이 매주 다름): routine.rotation = true
     → 요일 대신 DAY 1~N 순서대로. 주소 #routine-d1 … / 오늘 할 차례 = 순환 시작일부터 출석 체크한 날 수 ÷ N 의 나머지 */
  var ROT = !!(M.routine && M.routine.rotation);
  function rotDays() { return (M.routine && M.routine.days) || []; }
  function rotKeys() { return rotDays().map(function (_, i) { return "d" + (i + 1); }); }
  function isRotKey(k) { return ROT && /^d\d+$/.test(k) && !!rotDays()[+k.slice(1) - 1]; }
  function dayName(k) { return isRotKey(k) ? "DAY " + k.slice(1) : DAY_KO[k] + "요일"; }
  function turnKey() {
    var n = rotDays().length; if (!n) return "d1";
    var since = (M.routine.rotation_start || "2000-01-01"), today = ymd(new Date());
    var done = attLoad().filter(function (k) { return k >= since && k < today; }).length;
    return "d" + (done % n + 1);
  }
  function todayKey() { return ROT ? turnKey() : DAY_KEYS[new Date().getDay()]; }
  /* 이번 주 요일 옮기기 (2026-11-14 장동욱 "그날 못 나오면 상단 루틴 꾹 눌러서 옮기기 — A안, 쉬는 날 갑자기 나와도 넣을 수 있게")
     창고 저장소 mw:<주소>:mv = { w: 이번 주 월요일, m: { 요일: 가져온 요일 | "-"(이번 주 쉼) }, at } — 다음 주 월요일이면 저절로 원래대로 */
  var MV_LS = null, MV = null;
  function mvGet() { if (MV_LS === null) { MV_LS = "ptnote:" + SLUG + ":mv"; try { MV = JSON.parse(localStorage.getItem(MV_LS) || "null"); } catch (e) {} } return MV; }
  function wkMon(d) { d = d || new Date(); return ymd(new Date(d.getFullYear(), d.getMonth(), d.getDate() - (d.getDay() + 6) % 7)); }
  function mvMap() { mvGet(); return (!ROT && MV && MV.w === wkMon() && MV.m) || {}; }
  function dayByKey(k) {
    var raw = dayByKeyRaw(k);
    if (ROT || RT_EDIT || isRotKey(k)) return raw;
    var src = mvMap()[k];
    if (!src) return raw;
    if (src === "-") return { day: DAY_KO[k], part: "이번 주 쉼", en: "", rest: true, mvSkip: 1 };
    var sd = dayByKeyRaw(src); if (!sd) return raw;
    var o = {}; for (var x in sd) o[x] = sd[x];
    o.day = DAY_KO[k]; o.mvFrom = src; return o;
  }
  function dayAt(dt) { var k = DAY_KEYS[dt.getDay()]; return wkMon(dt) === wkMon() ? dayByKey(k) : dayByKeyRaw(k); }
  function dayByKeyRaw(k) {
    if (isRotKey(k)) return rotDays()[+k.slice(1) - 1];
    var days = (M.routine && M.routine.days) || [];
    for (var i = 0; i < days.length; i++) if (KO_KEY[days[i].day] === k) return days[i];
    return null;
  }
  function findForm(id) {
    for (var i = 0; i < M.forms.length; i++) if (M.forms[i].id === id) return M.forms[i];
    /* 2026-11-24 복습지를 새 영상으로 최신화하면 예전 주소(#form-예전id)도 새 복습지로 — data.js old_ids */
    for (i = 0; i < M.forms.length; i++) if (M.forms[i].old_ids && M.forms[i].old_ids.indexOf(id) >= 0) return M.forms[i];
    return null;
  }
  /* 루틴 종목 → 자세 복습지 (2026-11-10): form을 정해 뒀으면 그것, 아니면 이름이 같은(띄어쓰기 무시) 가장 최근 복습지를 자동 연결.
     그래서 복습지를 새로 올리기만 해도 선생님이 폰에서 고친 루틴 카드에 "▶ 자세 복습지 보기"가 붙음. form:"-" = 연결 안 함 */
  function fnorm(s) { return String(s || "").replace(/[\s·()\-]/g, "").toLowerCase(); }
  function itemForm(it) {
    if (!it || it.form === "-") return null;
    var f = it.form && findForm(it.form);
    if (f) return f;
    var n = fnorm(it.name);
    for (var i = 0; n && i < (M.forms || []).length; i++) {   /* 복습지 also:[다른 이름] — 루틴 이름이 조금 달라도 연결 (예: 리버스 펙덱 플라이 ↔ 리버스 펙덱) */
      var fm = M.forms[i], nm = [fm.exercise].concat(fm.also || []);
      for (var j = 0; j < nm.length; j++) if (fnorm(nm[j]) === n) return fm;
    }
    return null;
  }
  function remember() {
    var q = QUOTES[Math.floor(Math.random() * QUOTES.length)];
    return '<div class="remember"><svg viewBox="0 0 34 34" aria-hidden="true"><circle cx="17" cy="17" r="17" fill="var(--primary)"/>' +
      '<rect x="7" y="13" width="4" height="8" rx="1.2" fill="#fff"/><rect x="23" y="13" width="4" height="8" rx="1.2" fill="#fff"/>' +
      '<rect x="11" y="15.5" width="12" height="3" rx="1" fill="#FF4F57"/></svg><div><small>기억해요!</small><p>' + esc(q) + '</p></div></div>' +
      '<footer class="foot"><span>' + esc(BRN) + '</span><span>PERSONAL TRAINING</span></footer>';
  }
  function head(num, title, sub, more) {
    return '<div class="head">' + (num ? '<span class="num">' + num + '</span>' : '') + '<h2>' + esc(title) + '</h2>' +
      (sub ? '<p>' + esc(sub) + '</p>' : '') + (more || '') + '</div>';
  }
  function tagChip(tag) {
    if (!tag) return "";
    var cls = tag === "메인" ? "main" : tag === "워밍업" ? "warm" : tag === "선행" ? "pre" : "";
    return '<span class="tagc ' + cls + '">' + esc(tag) + '</span>';
  }


  /* ---------------- PT 여정 (12개월 3단계) */
  var STAGES = [
    { no: 1, from: 0, to: 2, name: "기초 다지기", short: "기초", range: "1~2개월",
      focus: ["머신 사용법", "스트레칭 습관", "내 근육 이해하기"],
      msg: "무게보다 정확한 사용법이 먼저예요. 모르는 건 다 물어보세요!" },
    { no: 2, from: 2, to: 7, name: "변화가 시작되는 시기", short: "변화", range: "2~7개월",
      focus: ["자신감 UP", "어느 순간 오는 몸의 변화", "머신 투어", "반복 숙달"],
      msg: "어느 순간 몸이 달라져요. 이 시기의 꾸준함이 결과를 만들어요." },
    { no: 3, from: 7, to: 12, name: "혼자서도 하는 시기", short: "자립", range: "7~12개월",
      focus: ["혼자서 루틴 소화", "프리웨이트", "다음 목표 또는 졸업"],
      msg: "이제 혼자서도 할 수 있어요. 다음 목표를 함께 정해요." }
  ];
  /* 바디프로필 목표 회원 전용 여정 (data.js journey.mode: "bodyprofile", 2026-11-05 이지환님부터)
     기초 0~2개월 → 근육 채우기(벌크) 2~8개월 → 컷팅·촬영 8~12개월(16주 컷팅) */
  var STAGES_BP = [
    { no: 1, from: 0, to: 2, name: "바프 몸의 뼈대 세우기", short: "기초", range: "1~2개월",
      focus: ["정확한 자세 · 머신 사용법", "바른 등 만들기", "식사 기록 습관"],
      msg: "바프는 기초가 탄탄해야 끝까지 가요. 지금은 무게보다 자세가 먼저!" },
    { no: 2, from: 2, to: 8, name: "근육 꽉 채우기", short: "벌크", range: "2~8개월",
      focus: ["매주 조금씩 증량", "등 · 하체 볼륨 UP", "단백질 꽉 채우기", "인바디 · 눈바디 체크"],
      msg: "이 시기에 쌓은 근육이 바프 사진의 선이 돼요. 잘 먹고 무겁게!" },
    { no: 3, from: 8, to: 12, name: "컷팅 · 바프 완성", short: "컷팅", range: "8~12개월",
      focus: ["16주 컷팅 식단", "유산소 늘리기", "포징 연습", "촬영 D-DAY"],
      msg: "근육은 지키고 지방만 걷어내요. 마지막 한 달이 사진을 바꿔요." }
  ];
  var BP = !!(M.journey && M.journey.mode === "bodyprofile");
  var JST = BP ? STAGES_BP : STAGES;
  /* 바프 촬영일 맞춤 (2026-11-09, 우유정님 — 4월 말 촬영처럼 12개월보다 짧은 바프):
     journey.fit: true + shoot 이 있으면 시작일 → 촬영일 길이(JT개월)로 그래프·단계를 맞춤.
     3단계 컷팅 = 촬영 전 16주(짧으면 줄임), 1단계 기초 = 전체의 18%(0.75~2개월), 사이가 2단계 근육 채우기.
     곡선 모양은 12개월 그래프를 단계별로 늘이고 줄여서(jWarp) 그대로 씀. */
  function jDate(s) { var p = s.split("-"); return new Date(+p[0], +p[1] - 1, +p[2]); }
  var JT = 12, JFIT = null;
  if (BP && M.journey.fit && M.journey.start && M.journey.shoot) {
    var jst0 = jDate(M.journey.start), JTd = (jDate(M.journey.shoot) - jst0) / (86400000 * 30.44);
    if (JTd > 2) {
      JT = JTd;
      var jb = Math.max(0.75, Math.min(2, JT * 0.18)), jcw = Math.max(6, Math.min(16, Math.round((JT - jb - 0.75) * 4.35)));
      var jc = JT - jcw / 4.35;
      var jWhen = function (m) { var d = new Date(jst0.getTime() + m * 86400000 * 30.44), dd = d.getDate(); return (d.getMonth() + 1) + "월 " + (dd <= 10 ? "초" : dd <= 20 ? "중순" : "말"); };
      JFIT = { b: jb, c: jc, cw: jcw, when: jWhen, mon: function (m) { return (new Date(jst0.getTime() + m * 86400000 * 30.44).getMonth() + 1) + "월"; } };
      JST = STAGES_BP.map(function (s, i) {
        var f = [0, jb, jc][i], t = [jb, jc, JT][i], o = {};
        for (var k in s) o[k] = s[k];
        o.from = f; o.to = t; o.range = jWhen(f) + " ~ " + (i === 2 ? "촬영" : jWhen(t));
        if (i === 2) o.focus = s.focus.map(function (x) { return x.replace("16주", jcw + "주"); });
        return o;
      });
    }
  }
  var JTN = Math.round(JT);   /* 화면 문구용 "N개월" */
  function jWarp(m) {   /* 실제 개월 → 12개월 그래프 모양 위치 */
    if (!JFIT) return m;
    if (m <= JFIT.b) return m / JFIT.b * 2;
    if (m <= JFIT.c) return 2 + (m - JFIT.b) / (JFIT.c - JFIT.b) * 6;
    return 8 + (m - JFIT.c) / (JT - JFIT.c) * 4;
  }
  function journeyNow() {
    var J = M.journey;
    if (!J || !J.start) return null;
    var st = jDate(J.start);
    var el = (Date.now() - st.getTime()) / (86400000 * 30.44);
    var m = Math.max(0, Math.min(JT, el));
    var stage = m < JST[1].from ? JST[0] : m < JST[2].from ? JST[1] : JST[2];
    return { el: el, m: m, month: el < 0 ? 0 : Math.min(Math.ceil(JT), Math.floor(el) + 1), stage: stage, start: J.start };
  }
  function bpDday() {   /* 촬영일(journey.shoot)이 있으면 D-day */
    var s = M.journey && M.journey.shoot;
    if (!s) return null;
    var p = s.split("-"), d = new Date(+p[0], +p[1] - 1, +p[2]), t = new Date(); t.setHours(0, 0, 0, 0);
    return { n: Math.round((d - t) / 86400000), label: p[0] + ". " + (+p[1]) + ". " + (+p[2]) };
  }
  function ss(a, b, m) { var t = Math.max(0, Math.min(1, (m - a) / (b - a))); return t * t * (3 - 2 * t); }
  function bpMuscleU(m) { return 0.1 + 0.72 / (1 + Math.exp(-(m - 4) / 1.2)) - 0.03 * ss(8, 12, m); }
  function bpFatU(m) { return 0.5 + 0.08 * ss(0, 8, m) - 0.44 * ss(8, 11.6, m); }
  var bpGid = 0;
  function reduceMotion() { try { return window.matchMedia("(prefers-reduced-motion: reduce)").matches; } catch (e) { return false; } }
  function journeyChartBP(now) {
    var X = function (m) { return 26 + m * 300 / JT; }, Y = function (v) { return 168 - v * 124; };
    var bpMuscle = function (m) { return bpMuscleU(jWarp(m)); }, bpFat = function (m) { return bpFatU(jWarp(m)); };
    var bands = JST.map(function (s, i) {
      var cur = now && s === now.stage;
      return '<rect x="' + X(s.from) + '" y="34" width="' + (X(s.to) - X(s.from)) + '" height="134" fill="#fff" opacity="' + (cur ? 0.12 : 0.03 + i * 0.015) + '"/>' +
        (i ? '<line x1="' + X(s.from) + '" y1="34" x2="' + X(s.from) + '" y2="168" stroke="#fff" stroke-opacity=".14" stroke-dasharray="2 3"/>' : '') +
        '<text x="' + ((X(s.from) + X(s.to)) / 2) + '" y="26" text-anchor="middle" class="bp-st' + (cur ? ' cur' : '') + '">' + s.no + '단계 ' + s.short + '</text>';
    }).join("");
    var pts = function (f, a, b) {
      var out = [];
      for (var m = a; m <= b + 1e-9; m += JT / 120) out.push(X(m).toFixed(1) + "," + Y(f(m)).toFixed(1));
      return out.join(" ");
    };
    var cm = now ? now.m : 0;
    /* 움직이는 그라데이션 (2026-11-08): 근육 선에 금빛이 흐르고, 선 아래 금색 빛 + 반짝이는 띠가 지나감 */
    var gid = "bpg" + (++bpGid), still = reduceMotion();
    var anim = function (dist, dur) { return still ? "" : '<animateTransform attributeName="gradientTransform" type="translate" from="0 0" to="' + dist + ' 0" dur="' + dur + 's" repeatCount="indefinite"/>'; };
    var defs = '<defs>' +
      '<linearGradient id="' + gid + 'l" gradientUnits="userSpaceOnUse" x1="0" y1="0" x2="120" y2="0" spreadMethod="reflect">' +
      '<stop offset="0" stop-color="#C9962E"/><stop offset=".5" stop-color="#FFF3C4"/><stop offset="1" stop-color="#E8C25A"/>' + anim(240, 2.6) + '</linearGradient>' +
      '<linearGradient id="' + gid + 'a" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#E8C25A" stop-opacity=".42"/><stop offset="1" stop-color="#E8C25A" stop-opacity="0"/></linearGradient>' +
      '<linearGradient id="' + gid + 's" gradientUnits="userSpaceOnUse" x1="-90" y1="0" x2="-10" y2="0">' +
      '<stop offset="0" stop-color="#fff" stop-opacity="0"/><stop offset=".5" stop-color="#FFF3C4" stop-opacity=".38"/><stop offset="1" stop-color="#fff" stop-opacity="0"/>' + anim(440, 3.4) + '</linearGradient>' +
      '<linearGradient id="' + gid + 'f" gradientUnits="userSpaceOnUse" x1="0" y1="0" x2="100" y2="0" spreadMethod="reflect">' +
      '<stop offset="0" stop-color="var(--dot)"/><stop offset="1" stop-color="#FFD1E4"/>' + anim(200, 3.8) + '</linearGradient>' +
      '</defs>';
    /* 체지방(분홍 점선) 먼저, 근육(금색) 위에 */
    var path = '<polyline points="' + pts(bpFat, 0, JT) + '" fill="none" stroke="url(#' + gid + 'f)" stroke-width="2.5" stroke-dasharray="1 5" stroke-linecap="round" opacity=".9" class="bp-flow"/>' +
      '<polyline points="' + pts(bpMuscle, cm, JT) + '" fill="none" stroke="url(#' + gid + 'l)" stroke-width="2.5" stroke-dasharray="5 5" opacity=".6" class="bp-ahead"/>';
    /* 앞으로 갈 구간: 옅은 금빛 + 촬영 쪽으로 흐르는 반짝임 (선 아래 전체) */
    var areaAll = pts(bpMuscle, 0, JT) + " " + X(JT) + ",168 " + X(0) + ",168";
    path = '<polygon points="' + pts(bpMuscle, cm, JT) + " " + X(JT) + ",168 " + X(cm).toFixed(1) + ',168" fill="url(#' + gid + 'a)" opacity=".35"/>' +
      '<polygon points="' + areaAll + '" fill="url(#' + gid + 's)"/>' + path;
    if (cm > 0) {
      var area = pts(bpMuscle, 0, cm) + " " + X(cm).toFixed(1) + ",168 " + X(0) + ",168";
      path += '<polygon points="' + area + '" fill="url(#' + gid + 'a)" class="bp-area"/>' +
        '<polyline points="' + pts(bpMuscle, 0, cm) + '" fill="none" stroke="url(#' + gid + 'l)" stroke-width="4.5" stroke-linecap="round" pathLength="1" class="bp-done"/>';
    }
    /* 두 선이 만나는 곳 = 몸이 선명해지는 순간 */
    var cx = JFIT ? JFIT.c : 8;
    for (var m = cx; m <= JT; m += JT / 240) { if (bpMuscle(m) - bpFat(m) > 0.12) { cx = m; break; } }
    var sharp = '<g transform="translate(' + X(cx) + ',' + Y(bpMuscle(cx)) + ')"><path d="M0 -9 L2.2 -2.2 L9 0 L2.2 2.2 L0 9 L-2.2 2.2 L-9 0 L-2.2 -2.2 Z" fill="#fff" opacity=".9"/></g>' +
      '<text x="' + (X(cx) - 6) + '" y="' + (Y(bpMuscle(cx)) - 13) + '" text-anchor="end" class="bp-note">몸이 선명해지는 순간</text>';
    var ticks = (JFIT ? [0, JFIT.b, JFIT.c, JT] : [0, 2, 8, 12]).map(function (m, i) {
      return '<line x1="' + X(m) + '" y1="168" x2="' + X(m) + '" y2="173" stroke="#fff" stroke-opacity=".35"/>' +
        '<text x="' + X(m) + '" y="186" text-anchor="' + (i === 3 ? "end" : "middle") + '" class="bp-x">' + (i === 0 ? "시작" : i === 3 ? "촬영" : JFIT ? JFIT.mon(m) : m + "개월") + '</text>';
    }).join("");
    var mk = "";
    if (now) {
      var mx = X(cm), my = Y(bpMuscle(cm)), right = cm > JT * 0.62, LW = 108, ly = my - 18;
      mk = '<circle cx="' + mx + '" cy="' + my + '" r="7" fill="none" stroke="var(--gold-line)" stroke-width="2" class="bp-sonar"/>' +
        '<circle cx="' + mx + '" cy="' + my + '" r="12" fill="var(--gold-line)" opacity=".25"/><circle cx="' + mx + '" cy="' + my + '" r="6.5" fill="url(#' + gid + 'l)" stroke="#fff" stroke-width="2.5"/>' +
        '<g transform="translate(' + (right ? mx - 6 : mx + 6) + ',' + ly + ')"><rect x="' + (right ? -LW : 0) + '" y="-15" width="' + LW + '" height="22" rx="11" fill="var(--key)"/>' +
        '<text x="' + (right ? -LW / 2 : LW / 2) + '" y="0.5" text-anchor="middle" class="jc-mk">지금 여기 · ' + (now.month || 1) + '개월차</text></g>';
    }
    /* 끝: 금색 카메라 = 바프 촬영 D-DAY */
    var ex = X(JT), ey = Y(bpMuscle(JT));
    var cam = '<g transform="translate(' + ex + ',' + (ey - 22) + ')"><circle r="14" fill="var(--gold-line)" class="bp-glow"/><circle r="14" fill="url(#' + gid + 'l)"/>' +
      '<path d="M-7 -3.5 h3.5 l1.6 -2.4 h3.8 l1.6 2.4 h3.5 v9 h-14 Z" fill="none" stroke="var(--bp-ink, #0E0E10)" stroke-width="1.8" stroke-linejoin="round"/><circle cy="1" r="2.6" fill="none" stroke="var(--bp-ink, #0E0E10)" stroke-width="1.8"/></g>' +
      '<text x="' + (ex - 19) + '" y="' + (ey - 18) + '" text-anchor="end" class="bp-dd">D-DAY</text>';
    return '<div class="jchart bp-chart"><svg viewBox="0 0 340 194" role="img" aria-label="바디프로필 ' + JTN + '개월 여정 그래프: ' + JST.map(function (s) { return s.no + '단계 ' + s.short + '(' + s.range + ')'; }).join(", ") + (now ? ', 지금 ' + (now.month || 1) + '개월차' : '') + '">' +
      defs + bands + '<line x1="26" y1="168" x2="326" y2="168" stroke="#fff" stroke-opacity=".3" stroke-width="1.5"/>' + ticks + path + sharp + cam + mk + '</svg>' +
      '<div class="bp-legend"><span><i class="lg-m"></i>근육</span><span><i class="lg-f"></i>체지방</span></div>' +
      '<p class="bp-cap">2단계에 근육을 꽉 채우고, 3단계에 지방만 걷어내 촬영날 가장 선명한 몸을 만들어요. 선은 개념 그래프예요 (실측 아님).</p></div>';
  }
  function curveY(m) { return 0.06 + 0.86 / (1 + Math.exp(-(m - 4.3) / 1.15)); }
  function journeyChart(now) {
    if (BP) return journeyChartBP(now);
    var X = function (m) { return 26 + m * 25; }, Y = function (v) { return 156 - v * 118; };
    var bands = STAGES.map(function (s, i) {
      var cur = now && s === now.stage;
      return '<rect x="' + X(s.from) + '" y="22" width="' + (X(s.to) - X(s.from)) + '" height="134" fill="var(--primary)" opacity="' + (cur ? 0.13 : 0.05 + i * 0.02) + '"/>' +
        '<text x="' + ((X(s.from) + X(s.to)) / 2) + '" y="15" text-anchor="middle" class="jc-st' + (cur ? ' cur' : '') + '">' + s.no + '단계 ' + s.short + '</text>';
    }).join("");
    var pts = function (a, b) {
      var out = [];
      for (var m = a; m <= b + 1e-9; m += 0.1) out.push(X(m).toFixed(1) + "," + Y(curveY(m)).toFixed(1));
      return out.join(" ");
    };
    var cm = now ? now.m : 0;
    /* 2026-11-06 움직임 시안 D "목표까지 흐르는 길": 지금까지 선이 그려지고 → 점이 톡 → 앞으로 갈 점선이 깃발 쪽으로 계속 흐름,
       깃발 펄럭, 점에서 물결. 애니메이션은 style.css의 .jc-* (화면 다시 그릴 때마다 처음부터) */
    var path = '<polyline points="' + pts(0, 12) + '" fill="none" stroke="var(--primary)" stroke-width="2.5" stroke-dasharray="5 5" opacity="' + (cm > 0 ? '.12' : '.35') + '"/>';
    if (cm > 0 && cm < 12) path += '<polyline class="jc-ahead" points="' + pts(cm, 12) + '" fill="none" stroke="var(--primary)" stroke-width="2.5" stroke-dasharray="5 5"/>';
    if (cm > 0) path += '<polyline class="jc-done" pathLength="1" points="' + pts(0, cm) + '" fill="none" stroke="var(--primary)" stroke-width="4" stroke-linecap="round"/>';
    var ticks = [0, 2, 7, 12].map(function (m) {
      return '<line x1="' + X(m) + '" y1="156" x2="' + X(m) + '" y2="161" stroke="var(--faint)"/>' +
        '<text x="' + X(m) + '" y="174" text-anchor="middle" class="jc-x">' + (m === 0 ? "시작" : m + "개월") + '</text>';
    }).join("");
    var mk = "";
    if (now) {
      var mx = X(cm), my = Y(curveY(cm)), right = cm > 7.5, below = my < 64, LW = 108;
      var ly = below ? my + 26 : my - 18;
      mk = '<circle class="jc-sonar" cx="' + mx + '" cy="' + my + '" r="7" fill="none" stroke="var(--key)" stroke-width="2"/>' +
        '<g class="jc-pop"><circle cx="' + mx + '" cy="' + my + '" r="11" fill="var(--key)" opacity=".2"/><circle cx="' + mx + '" cy="' + my + '" r="6.5" fill="var(--key)" stroke="#fff" stroke-width="2.5"/></g>' +
        '<g transform="translate(' + (right ? mx - 6 : mx + 6) + ',' + ly + ')"><g class="jc-lab' + (right ? ' r' : '') + '"><rect x="' + (right ? -LW : 0) + '" y="-15" width="' + LW + '" height="22" rx="11" fill="var(--key)"/>' +
        '<text x="' + (right ? -LW / 2 : LW / 2) + '" y="0.5" text-anchor="middle" class="jc-mk">지금 여기 · ' + (now.month || 1) + '개월차</text></g></g>';
    }
    var flag = '<g transform="translate(' + X(12) + ',' + (Y(curveY(12)) - 2) + ')"><line x1="0" y1="0" x2="0" y2="-20" stroke="var(--gold)" stroke-width="2"/><path class="jc-wave" d="M0 -20 L13 -15.5 L0 -11 Z" fill="var(--gold)"/></g>';
    return '<div class="jchart"><svg viewBox="0 0 340 182" role="img" aria-label="12개월 PT 여정 그래프: 1단계 기초(1~2개월), 2단계 변화(2~7개월), 3단계 자립(7~12개월)' + (now ? ', 지금 ' + (now.month || 1) + '개월차' : '') + '">' +
      bands + '<line x1="26" y1="156" x2="326" y2="156" stroke="var(--rule)" stroke-width="1.5"/>' + ticks + path + flag + mk + '</svg>' +
      '<p class="jc-cap">선은 "몸의 변화 · 자신감"이에요. 처음엔 천천히, 어느 순간 확 올라가요. 회원님마다 속도는 달라요.</p></div>';
  }
  function stageCard(s, now, compact) {
    var state = !now ? "" : s.no < now.stage.no ? "done" : s === now.stage ? "cur" : "next";
    var badge = state === "done" ? '<span class="jb done">완료</span>' : state === "cur" ? '<span class="jb cur">지금 여기</span>' : '<span class="jb">' + s.range + '</span>';
    var prog = "";
    if (state === "cur") {
      var pct = Math.round((now.m - s.from) / (s.to - s.from) * 100);
      var left = Math.max(0, Math.round((s.to - now.m) * 4.35));
      prog = '<div class="jprog"><div style="width:' + Math.max(4, pct) + '%"></div></div><p class="jleft">' +
        (s.no === 3 && left === 0 ? (BP ? '바프 촬영 완주! 정말 멋져요' : '12개월 완주! 졸업 또는 다음 목표를 함께 정해요') : s.no + '단계 남은 기간 약 ' + (left >= 8 ? Math.round(left / 4.35) + '개월' : left + '주')) + '</p>';
    }
    return '<div class="jcard ' + state + '"><div class="jtop"><span class="jno">' + s.no + '</span><div><small>' + s.no + '단계 · ' + s.range + '</small><h3>' + esc(s.name) + '</h3></div>' + badge + '</div>' +
      '<ul class="jfocus">' + s.focus.map(function (f) { return '<li>' + esc(f) + '</li>'; }).join("") + '</ul>' +
      (compact && state !== "cur" ? '' : '<p class="jmsg">' + esc(s.msg) + '</p>') + prog + '</div>';
  }
  /* 목표 탭: 1·2·3단계 줄 — 지난 단계 ✓, 지금 단계 숨쉬는 점, 지나온 만큼 선이 채워짐. 누르면 아래 카드가 그 단계로 */
  function stageStepper(now) {
    var ci = JST.indexOf(now.stage), cs = now.stage;
    var f = Math.max(0, Math.min(1, (ci + Math.max(0, Math.min(1, (now.m - cs.from) / (cs.to - cs.from)))) / (JST.length - 1)));
    return '<p class="js-hint">단계를 눌러 목표를 확인해요</p><div class="jstep"><div class="js-track"><i style="width:' + (f * 100).toFixed(1) + '%"></i></div>' +
      JST.map(function (st) {
        var state = st.no < cs.no ? "done" : st === cs ? "cur" : "next";
        return '<button type="button" class="js-n ' + state + (st === cs ? ' on' : '') + '" data-st="' + st.no + '" aria-pressed="' + (st === cs) + '">' +
          '<i>' + (state === "done" ? '✓' : st.no) + '</i><b>' + esc(st.short) + '</b><small>' + (state === "cur" ? '지금 여기' : esc(st.range)) + '</small></button>';
      }).join("") + '</div>';
  }
  document.addEventListener("click", function (e) {
    var b = e.target.closest && e.target.closest(".js-n");
    if (!b) return;
    var now = journeyNow(), st = JST[+b.getAttribute("data-st") - 1], box = document.getElementById("jdet");
    if (!now || !st || !box || b.classList.contains("on")) return;
    [].forEach.call(document.querySelectorAll(".js-n"), function (x) { x.classList.toggle("on", x === b); x.setAttribute("aria-pressed", x === b); });
    var dir = +b.getAttribute("data-st") > +(box.getAttribute("data-st") || now.stage.no) ? "r" : "l";
    box.setAttribute("data-st", st.no);
    box.innerHTML = stageCard(st, now, false);
    box.classList.remove("in-r", "in-l"); void box.offsetWidth; box.classList.add("in-" + dir);
  });
  function bpStrip() {   /* 바프 회원: 그래프 위 금색 띠 (촬영일 있으면 D-day) */
    var d = bpDday();
    return '<div class="bp-strip"><span class="bp-tag">BODY PROFILE</span>' +
      (d ? '<b>' + (d.n > 0 ? 'D-' + d.n : d.n === 0 ? 'D-DAY' : '촬영 완료') + '</b><small>촬영 ' + esc(d.label) + '</small>'
         : '<b>목표는 바프 촬영!</b><small>촬영 날짜는 선생님과 정해요</small>') + '</div>';
  }
  function journeyHome() {
    var now = journeyNow();
    if (!now) return "";
    if (BP) return '<section>' + head("", "나의 바프 여정", "촬영날까지 함께 가는 " + JTN + "개월", '<a class="more" href="#goal">목표 자세히 →</a>') +
      '<div class="panel jpanel bp">' + bpStrip() + journeyChart(now) + stageCard(now.stage, now, true) + '</div></section>';
    return '<section>' + head("", "나의 PT 여정", "함께 가는 12개월", '<a class="more" href="#goal">목표 자세히 →</a>') +
      '<div class="panel jpanel">' + journeyChart(now) + stageCard(now.stage, now, true) + '</div></section>';
  }
  function renderGoal() {
    var now = journeyNow();
    var h = meSeg("goal") + '<div class="hero"><div class="hero-main"><div class="hero-l"><div class="eyebrow">MY GOAL <b>· 나의 목표</b></div>' +
      '<h1>' + esc(M.goal || "나의 목표") + '</h1><div class="en">' + esc(M.name) + ' 회원님 · ' + (BP ? '기초 → 벌크 → 컷팅, 바프 촬영까지 함께 가요' : '기초 → 변화 → 자립, 3단계로 함께 가요') + '</div>' +
      '<div class="who"><strong>' + (now ? (now.month ? now.month + '개월차' : '곧 시작해요') + ' · ' + now.stage.no + '단계 ' + esc(now.stage.short) : '') + '</strong><span>담당 ' + esc(TRN) + ' 트레이너</span></div></div></div>' +
      '<div class="keypoint"><small>KEY POINT</small><p>' + (BP ? '목표는 하나, 바프 촬영날! 그 의지라면 충분해요. 단계마다 함께 넘어가요!' : '혼자 가는 길이 아니에요. 단계마다 함께 넘어가요!') + '</p></div></div>';
    var n4 = "04";   /* 몸 변화 기록은 2026-11-06 '몸변화' 탭(#body)으로, 근육 지도는 2026-11-08 루틴 탭으로 이동 */
    var attSec = '<section id="att">' + head("01", "출석률 · 출석 달력", "얼마나 꾸준히 나왔는지 봐요") + '<div class="panel attcard">' + attGauge() + attCalendar() + '</div></section>';
    if (!now) {
      return h + attSec + rankSection("02") + badgeSection("03") + '<div class="panel empty"><h3>PT 여정 준비 중이에요</h3><p>선생님이 시작일을 넣으면 12개월 여정이 나와요</p></div>' + remember();
    }
    h += attSec + rankSection("02") + badgeSection("03");
    /* 2026-11-13 "한눈에 보는 12개월 그래프 + 단계별 목표 합치기" — 그래프 아래 1·2·3단계 줄(눌러서 바꾸기) + 고른 단계 목표 카드 */
    h += '<section id="goal-journey">' + head(n4, BP ? "바프까지 " + JTN + "개월 여정" : "나의 12개월 여정", "지금 어디쯤, 무엇을 할지 한눈에") + '<div class="panel jpanel jmerge' + (BP ? ' bp">' + bpStrip() : '">') + journeyChart(now) +
      '<div class="jsel">' + stageStepper(now) + '<div class="jdet" id="jdet">' + stageCard(now.stage, now, false) + '</div></div></div></section>';
    return h + remember();
  }


  /* ---------------- 출석 (오늘 출석 체크 · 출석 달력 · 출석률) */
  var SLUG = window.ATT_SLUG || (location.pathname.match(/\/m\/([^\/]+)\//) || [, M.name])[1];
  /* 출석 창고(구글 Apps Script 웹 앱) 주소 — 비어 있으면 휴대폰에만 저장 */
  var ATT_API = window.ATT_API || SITE.att_api || "https://script.google.com/macros/s/AKfycbwtjTpk88xTWQcKXoaFX2qCYtKSzKoCOs-Us26k6QUbtKvewTaqJutJuA4RJjAmV-6bvA/exec";
  var attTimes = {};
  try { attTimes = JSON.parse(localStorage.getItem(ATT_KEY_T()) || "{}") || {}; } catch (e) {}
  function ATT_KEY_T() { return "ptnote:" + SLUG + ":attT"; }
  var ATT_KEY = "ptnote:" + SLUG + ":att";
  function pad2(n) { return (n < 10 ? "0" : "") + n; }
  function ymd(d) { return d.getFullYear() + "-" + pad2(d.getMonth() + 1) + "-" + pad2(d.getDate()); }
  var attMem = null;
  function attLoad() {
    var a = null;
    try { var raw = localStorage.getItem(ATT_KEY); if (raw) a = JSON.parse(raw); } catch (e) {}
    if (!Array.isArray(a)) a = attMem || (window.ATT_DEMO ? window.ATT_DEMO.slice() : []);
    attMem = a;
    return a;
  }
  function attSave(a) { attMem = a; try { localStorage.setItem(ATT_KEY, JSON.stringify(a)); } catch (e) {} }
  function attHas(a, key) { return a.indexOf(key) >= 0; }
  function isWorkoutDay(d) {   /* 루틴에서 운동하는 요일인지 (순환 루틴은 어느 날이든 운동할 수 있음) */
    if (ROT) return true;
    var day = dayAt(d);
    return !!(day && !day.rest);
  }
  var ATT_SINCE = new Date(2026, 10, 4);   /* 출석 체크를 시작한 날 (이 전 날짜는 결석으로 세지 않음) */
  function startDate() {
    var st = null;
    if (M.journey && M.journey.start) { var p = M.journey.start.split("-"); st = new Date(+p[0], +p[1] - 1, +p[2]); }
    if (M.att_since) { var q = M.att_since.split("-"); var s2 = new Date(+q[0], +q[1] - 1, +q[2]); if (!st || s2 > st) st = s2; }
    if (!st || ATT_SINCE > st) st = ATT_SINCE;
    return st;
  }
  function attStats(a, from, to) {   /* from~to(오늘까지) 운동하는 날 중 출석한 날 */
    var st = startDate(), plan = 0, done = 0;
    var d = new Date(from.getFullYear(), from.getMonth(), from.getDate());
    if (st && d < st) d = new Date(st.getFullYear(), st.getMonth(), st.getDate());
    for (; d <= to; d.setDate(d.getDate() + 1)) {
      var k = ymd(d), w = isWorkoutDay(d), on = attHas(a, k);
      if (w) plan++;
      if (on) done++;
    }
    if (ROT) plan = Math.max(done ? 1 : 0, Math.round(plan * rotDays().length / 7));   /* 순환: 주 N회 기준으로 운동할 날 수 */
    return { plan: plan, done: done, rate: plan ? Math.min(100, Math.round(done / plan * 100)) : 0 };
  }
  function attStreak(a) {   /* 오늘(또는 어제)부터 거꾸로, 운동하는 날을 빠짐없이 나온 횟수 */
    var d = new Date(), n = 0, today = ymd(d), gap = 0;
    if (!attHas(a, today)) d.setDate(d.getDate() - 1);
    for (var i = 0; i < 400; i++) {
      var k = ymd(d);
      if (attHas(a, k)) { n++; gap = 0; }
      else if (ROT) { if (++gap > 2) break; }   /* 순환: 쉬는 날이 들쭉날쭉해서 3일 넘게 비면 끊김 */
      else if (isWorkoutDay(d)) break;
      d.setDate(d.getDate() - 1);
      var st = startDate(); if (st && d < st) break;
    }
    return n;
  }
  function rateWord(r) { return r >= 80 ? ["good", "아주 좋아요!"] : r >= 50 ? ["mid", "조금만 더!"] : ["low", "다시 시작해봐요"]; }

  /* 출석 도장 (2026-11-11 "A버전에 감성적으로 출석버튼"): 홈 맨 위 카드. 누르면 도장이 쾅 찍히고 점이 톡톡 튐 + 날마다 다른 한마디 */
  var ST_ON = ["오늘의 땀이 내일의 자신감이 돼요", "나와준 것만으로 이미 절반은 해냈어요", "어제의 나보다 한 걸음 더 왔어요",
    "꾸준함이 쌓이는 소리, 들리시죠?", "오늘도 나와의 약속을 지켰어요", "몸은 거짓말을 안 해요. 오늘도 잘 왔어요", "이 한 번이 모여서 달라진 몸이 돼요"];
  var ST_OFF = ["문을 열고 들어온 순간부터 운동이에요", "오늘의 나에게 도장 하나 꾹 찍어줘요", "가장 어려운 건 오는 것, 이미 반은 왔어요", "오늘 찍은 도장이 다음 달 몸이 돼요"];
  function attSeal(on, now, tm) {
    var md = pad2(now.getMonth() + 1) + "." + pad2(now.getDate());
    if (on) return '<svg viewBox="0 0 72 72" aria-hidden="true"><circle cx="36" cy="36" r="33" fill="var(--seal)"/>' +
      '<circle cx="36" cy="36" r="28.5" fill="none" stroke="#fff" stroke-width="1.4" opacity=".75"/>' +
      '<text x="36" y="23.5" text-anchor="middle" font-size="7.5" font-weight="900" fill="#fff" letter-spacing="1.5" opacity=".85">JK</text>' +
      '<text x="36" y="41" text-anchor="middle" font-size="17" font-weight="900" fill="#fff">출석</text>' +
      '<text x="36" y="53" text-anchor="middle" font-size="8.5" font-weight="700" fill="#fff" opacity=".9">' + md + '</text></svg>';
    return '<svg viewBox="0 0 72 72" aria-hidden="true"><circle cx="36" cy="36" r="33" fill="#fff" stroke="var(--seal)" stroke-width="2.4" stroke-dasharray="4.6 4.2"/>' +
      '<circle cx="36" cy="36" r="27" fill="var(--seal)" opacity=".09"/>' +
      '<text x="36" y="40.5" text-anchor="middle" font-size="15" font-weight="900" fill="var(--seal)">출석</text>' +
      '<text x="36" y="53" text-anchor="middle" font-size="8.5" font-weight="700" fill="var(--seal)" opacity=".75">' + md + '</text></svg>';
  }
  function attCheckStrip() {   /* 홈 맨 위 출석 도장 카드 (id attBtn — 출석이 바뀌면 attRefresh가 통째로 다시 그림) */
    var a = attLoad(), now = new Date(), key = ymd(now), on = attHas(a, key);
    var doy = Math.floor((now - new Date(now.getFullYear(), 0, 0)) / 86400000);
    var msg = on ? ST_ON[doy % ST_ON.length] : ST_OFF[doy % ST_OFF.length];
    var burst = ""; for (var i = 0; i < 10; i++) burst += '<i style="--a:' + (i * 36) + 'deg"></i>';
    return '<button type="button" class="stamp' + (on ? ' on' : '') + '" id="attBtn" aria-pressed="' + on + '" aria-label="' +
      (now.getMonth() + 1) + '월 ' + now.getDate() + '일 출석 ' + (on ? '완료, 다시 누르면 취소' : '도장 찍기') + '">' +
      '<span class="st-seal">' + attSeal(on, now) + '<span class="st-burst" aria-hidden="true">' + burst + '</span></span>' +
      '<span class="st-txt"><small>' + (on ? a.length + '번째 출석' + (attTimes[key] ? ' · ' + attTimes[key] : '') : '오늘 출석 도장') + '</small>' +
      '<b>' + (on ? '오늘도 와줘서 고마워요' : '눌러서 출석 도장 꾹') + '</b><em>' + esc(msg) + '</em></span>' +
      (on ? '<span class="st-undo" aria-hidden="true">다시 누르면 취소</span>' : '<span class="st-go" aria-hidden="true">›</span>') + '</button>';
  }
  function homeWidgets() {   /* 홈 작은 위젯 2칸: 이번 달 출석률 링 / 연속 출석 + 이번 주 7칸 */
    var a = attLoad(), now = new Date(), today = ymd(now);
    var m = attStats(a, new Date(now.getFullYear(), now.getMonth(), 1), now), s = attStreak(a);
    var R = 22, C = 2 * Math.PI * R, len = C * m.rate / 100;
    var mon = new Date(now); mon.setDate(now.getDate() - ((now.getDay() + 6) % 7));
    var wk = "";
    for (var i = 0; i < 7; i++) {
      var d = new Date(mon); d.setDate(mon.getDate() + i);
      var k = ymd(d), c = attHas(a, k) ? "on" : (!ROT && !isWorkoutDay(d)) ? "rest" : "";
      wk += '<span class="' + c + (k === today ? ' today' : '') + '"></span>';
    }
    /* 2026-11-18 출석률·연속 출석을 한 칸으로 합치고, 옆에 출석 순위 칸(rankHome) */
    return '<div class="hwid" id="hwid"><a class="hw col hi hatt" href="#goal" aria-label="이번 달 출석률 ' + m.rate + '%, 연속 출석 ' + s + '회"><span class="hi-top"><svg class="ring" viewBox="0 0 54 54" aria-hidden="true"><circle cx="27" cy="27" r="' + R + '" fill="none" stroke="var(--hw-track)" stroke-width="7"/>' +
      (m.rate > 0 ? '<circle cx="27" cy="27" r="' + R + '" fill="none" stroke="var(--seal)" stroke-width="7" stroke-linecap="round" stroke-dasharray="' + (m.rate >= 100 ? C.toFixed(1) + ' 0' : len.toFixed(1) + ' ' + C.toFixed(1)) + '" transform="rotate(-90 27 27)"/>' : '') +
      '<text x="27" y="31.5" text-anchor="middle" font-size="13" font-weight="900" fill="var(--ink)">' + m.rate + '%</text></svg><span class="hatt-st"><small>연속</small><b>' + s + '<i>회</i></b></span></span>' +
      '<small>이번 달 출석률 · 이번 주</small><span class="wk" aria-label="이번 주 출석">' + wk + '</span></a>' + rankHome() + '</div>';
  }
  function homeInfo() {   /* 홈 작은 위젯 2칸 (2026-11-12 "공지·최근 복습지도 출석률 칸처럼"): 선생님 공지 / 최근 자세 복습지 */
    var n = (M.notices || [])[0], f = M.forms[0], nNew = n && nUnseen().length > 0;
    var bell = '<span class="hi-ic bellc' + (nNew ? ' new' : '') + '" aria-hidden="true"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M6 9a6 6 0 1 1 12 0c0 6.5 2.5 8.5 2.5 8.5h-17S6 15.5 6 9"/><path d="M10 21h4"/></svg></span>';
    var h = '<div class="hwid hinfo">';
    h += '<a class="hw col hi" href="#notice"' + (n ? ' data-nk="' + esc(nKey(n)) + '"' : '') + '><span class="hi-top">' + bell + (nNew ? '<i class="hi-new">NEW</i>' : '<i class="hi-go">›</i>') + '</span>' +
      '<small>선생님 공지' + (n && /(\d{1,2})\D+(\d{1,2})\D*$/.test(n.date || "") ? ' · ' + String(n.date).replace(/^.*?(\d{1,2})\D+(\d{1,2})\D*$/, function (x, a, b) { return +a + "월 " + +b + "일"; }) : '') + '</small>' +
      '<b class="hi-t">' + (n ? esc(n.title) : '아직 공지가 없어요') + '</b></a>';
    if (f) {
      var ic = '<img class="hi-ph" src="' + esc(f.dir) + 'form.webp" alt="" loading="lazy" onerror="this.onerror=null;this.src=\'' + esc(f.dir) + 'poster.jpg\'">';   /* 2026-11-18 아이콘 대신 최신 영상 미리보기(움직이는 webp, 소리·재생 버튼 없음) */
      h += '<a class="hw col hi" href="#form-' + esc(f.id) + '"><span class="hi-top"><span class="hi-ic hi-vid" aria-hidden="true">' + ic + '</span>' + (formNew(f) ? '<i class="hi-new">NEW</i>' : '<i class="hi-go">›</i>') + '</span>' +
        '<small>최근 자세 복습지 · ' + M.forms.length + '개</small><b class="hi-t">' + esc(f.exercise) + '</b></a>';
    } else {
      h += '<a class="hw col hi" href="#forms"><span class="hi-top"><span class="hi-ic bellc" aria-hidden="true">' + img("dumbbell", "hi-ex", true) + '</span><i class="hi-go">›</i></span><small>최근 자세 복습지</small><b class="hi-t">수업에서 배운 자세가 여기에 쌓여요</b></a>';
    }
    return h + '</div>';
  }
  document.addEventListener("click", function (e) {   /* 홈 공지 칸 → 그 공지로 바로 (반짝 표시) */
    var a = e.target.closest && e.target.closest("a.hi[data-nk]");
    if (a) pendingNotice = a.getAttribute("data-nk");
  }, true);
  function attRefresh() {   /* 출석이 바뀌면 화면의 출석 부분만 다시 그림 */
    var b = document.getElementById("attBtn");
    if (b) { b.outerHTML = attCheckStrip(); setupAttCheck(); }
    var hw = document.getElementById("hwid"); if (hw) hw.outerHTML = homeWidgets();
    var g = document.querySelector(".attgauge"); if (g) g.outerHTML = attGauge();
    var c = document.querySelector(".cal"); if (c) { c.outerHTML = attCalendar(); setupCal(); }
    var bs = document.getElementById("badges"); if (bs) { bs.outerHTML = badgeSection(bs.getAttribute("data-num")); setupBadges(); setupFold(view.getAttribute("data-tab") || "goal"); }
    var mb = document.querySelector(".mm-body"); if (mb) mb.innerHTML = muscleBody();
    rkRefresh();
    alignText(document);
  }
  function attApply(days) {   /* 창고에서 받은 기록으로 바꿔 끼움 */
    attTimes = days || {};
    attSave(Object.keys(attTimes));
    try { localStorage.setItem(ATT_KEY_T(), JSON.stringify(attTimes)); } catch (e) {}
  }
  function attCall(q) {
    return fetch(ATT_API + "?m=" + encodeURIComponent(SLUG) + (q || ""), { cache: "no-store" })
      .then(function (r) { return r.json(); })
      .then(function (j) { if (!j || !j.ok) throw new Error("save"); mlFlag(j); attApply(j.days); if ("routine" in j) rtServer(j.routine); if ("bnotices" in j) bnServer(j.bnotices); if ("kv" in j) { grServer(j.kv); dbServer(j.kv); lgServer(j.kv); bgServer(j.kv); pfServer(j.kv); mvServer(j.kv); fvServer(j.kv); rkServer(j.kv); } return j; });
  }
  function attSync() {
    if (!ATT_API) return;
    attCall("").then(function () { attRefresh(); badgeCheck(); }).catch(function () {});
  }
  function attToast(msg) {
    var t = document.createElement("div"); t.className = "atttoast"; t.textContent = msg;
    document.body.appendChild(t); setTimeout(function () { t.remove(); }, 2600);
  }
  function setupAttCheck() {
    var b = document.getElementById("attBtn");
    if (!b) return;
    if (COACH_MODE) {   /* 선생님 휴대폰에서는 보기만 (실수로 눌러 회원 출석이 바뀌지 않게) */
      b.classList.add("ro");
      b.addEventListener("click", function () { attToast("선생님 보기에서는 출석을 바꿀 수 없어요"); });
      return;
    }
    b.addEventListener("click", function () {
      var a = attLoad().slice(), now = new Date(), key = ymd(now), i = a.indexOf(key), turnOn = i < 0;
      var tm = pad2(now.getHours()) + ":" + pad2(now.getMinutes()), prevTm = attTimes[key];
      if (turnOn) { a.push(key); attTimes[key] = tm; } else { a.splice(i, 1); delete attTimes[key]; }
      attSave(a);
      attRefresh();
      var nb = document.getElementById("attBtn");
      if (nb && turnOn) { nb.classList.add("pop"); try { navigator.vibrate && navigator.vibrate([18, 40, 26]); } catch (e) {} }
      if (!ATT_API || TRY) return;
      if (nb) nb.classList.add("saving");
      attCall("&a=" + (turnOn ? "check" : "uncheck") + "&d=" + key + "&t=" + encodeURIComponent(tm) + "&n=" + encodeURIComponent(M._real || M.name))
        .then(function () { attRefresh(); badgeCheck(); })
        .catch(function () {
          var cur = attLoad().slice(), k = cur.indexOf(key);
          if (turnOn) { if (k >= 0) cur.splice(k, 1); delete attTimes[key]; }
          else { if (k < 0) cur.push(key); if (prevTm) attTimes[key] = prevTm; }
          attSave(cur); attRefresh();
          attToast("인터넷 연결을 확인하고 다시 눌러주세요");
        });
    });
  }

  var calMonth = null;   /* 달력에 보이는 달 (1일) */
  function attCalendar() {
    var a = attLoad(), now = new Date(), today = ymd(now), st = startDate();
    if (!calMonth) calMonth = new Date(now.getFullYear(), now.getMonth(), 1);
    var y = calMonth.getFullYear(), mo = calMonth.getMonth();
    var first = new Date(y, mo, 1), last = new Date(y, mo + 1, 0);
    var to = last < now ? last : now;
    var ms = attStats(a, first, to);
    var cells = "", lead = first.getDay();
    for (var i = 0; i < lead; i++) cells += '<span class="cd blank" aria-hidden="true"></span>';
    for (var dd = 1; dd <= last.getDate(); dd++) {
      var d = new Date(y, mo, dd), k = ymd(d), on = attHas(a, k), w = isWorkoutDay(d);
      var past = k < today, before = st && d < st, cls = "cd";
      if (k === today) cls += " today";
      if (on) cls += " on";
      else if (before) cls += " pre";
      else if (ROT) cls += past ? " rest" : "";
      else if (past && w) cls += " miss";
      else if (!w) cls += " rest";
      else cls += " plan";
      cells += '<span class="' + cls + '"><b>' + dd + '</b></span>';
    }
    var canPrev = !st || new Date(y, mo, 0) >= new Date(st.getFullYear(), st.getMonth(), 1);
    var canNext = new Date(y, mo + 1, 1) <= now;
    return '<div class="panel cal"><div class="cal-head">' +
      '<button type="button" class="calnav" id="calPrev"' + (canPrev ? '' : ' disabled') + ' aria-label="이전 달">‹</button>' +
      '<div><b>' + y + '년 ' + (mo + 1) + '월</b><small>' + ms.done + '번 출석 · 출석률 ' + ms.rate + '%</small></div>' +
      '<button type="button" class="calnav" id="calNext"' + (canNext ? '' : ' disabled') + ' aria-label="다음 달">›</button></div>' +
      '<div class="cal-grid"><span class="dw sun">일</span><span class="dw">월</span><span class="dw">화</span><span class="dw">수</span><span class="dw">목</span><span class="dw">금</span><span class="dw sat">토</span>' + cells + '</div>' +
      (ROT ? '<div class="cal-legend"><span><i class="lg on"></i>출석</span><span><i class="lg rest"></i>쉰 날</span></div></div>'
        : '<div class="cal-legend"><span><i class="lg on"></i>출석</span><span><i class="lg miss"></i>운동날 결석</span><span><i class="lg plan"></i>운동하는 날</span><span><i class="lg rest"></i>쉬는 날</span></div></div>');
  }
  function attGauge() {
    var a = attLoad(), now = new Date();
    var m = attStats(a, new Date(now.getFullYear(), now.getMonth(), 1), now);
    var st = startDate(), all = attStats(a, st || new Date(now.getFullYear(), now.getMonth(), 1), now);
    var w = (m.plan === 0 || all.done === 0) ? ["none", "오늘부터 채워봐요!"] : rateWord(m.rate), R = 46, C = 2 * Math.PI * R, len = C * m.rate / 100;
    return '<div class="panel attgauge"><div class="gauge ' + w[0] + '"><svg viewBox="0 0 120 120" aria-hidden="true">' +
      '<defs><linearGradient id="gGrad" x1="0" y1="0" x2="1" y2="1"><stop offset="0" class="gs1"/><stop offset="1" class="gs2"/></linearGradient></defs>' +   /* 게이지 그라데이션 (2026-11-08) */
      '<circle cx="60" cy="60" r="' + R + '" fill="none" stroke="var(--tint)" stroke-width="11"/>' +
      (m.rate > 0 ? '<circle cx="60" cy="60" r="' + R + '" fill="none" stroke="url(#gGrad)" stroke-width="11" stroke-linecap="round" stroke-dasharray="' + (m.rate >= 100 ? C.toFixed(1) + ' 0' : len.toFixed(1) + ' ' + C.toFixed(1)) + '" transform="rotate(-90 60 60)"/>' : '') + '</svg>' +
      '<div class="gnum' + (m.rate >= 100 ? ' full' : '') + '"><b>' + m.rate + '<i>%</i></b><small>이번 달 출석률</small></div></div>' +
      '<div class="gside"><p class="gword ' + w[0] + '">' + w[1] + '</p>' +
      '<dl><div><dt>이번 달</dt><dd>' + m.done + ' / ' + m.plan + '회</dd></div>' +
      '<div><dt>연속 출석</dt><dd>' + attStreak(a) + '회째</dd></div>' +
      '<div><dt>누적 출석</dt><dd>' + all.done + '회 · ' + all.rate + '%</dd></div></dl></div></div>';
  }
  function setupCal() {
    var p = document.getElementById("calPrev"), n = document.getElementById("calNext");
    function go(dm) {
      calMonth = new Date(calMonth.getFullYear(), calMonth.getMonth() + dm, 1);
      var box = document.querySelector(".cal"); if (box) { box.outerHTML = attCalendar(); setupCal(); }
    }
    if (p) p.addEventListener("click", function () { go(-1); });
    if (n) n.addEventListener("click", function () { go(1); });
  }

  /* ---------------- 몸 변화 기록 (인바디) — 2026-11-06
     회원이 인바디 결과지 사진 + 숫자 4개(체중·골격근량·체지방량·체지방률)를 올리면
     지난달 마지막 기록 vs 이번 달 마지막 기록을 비교. 저장은 출석 창고(ATT_API)와 같은 Apps Script
     (시트 "인바디" 탭 + 드라이브 "PT노트 인바디 사진" 폴더). 그룹 PT 페이지(이름에 ·)는 숨김 */
  var IB_ON = !/·/.test(M.name || "") && M.inbody !== false;
  var IB_KEY = "ptib_" + SLUG, DB_IBDRAWN = 0;
  var ibData = null, ibErr = false, ibReady = null;
  try { ibData = JSON.parse(localStorage.getItem(IB_KEY) || "null"); } catch (e) {}
  var IB_ROWS = [
    { k: "w", name: "체중", unit: "kg", good: 0 },
    { k: "smm", name: "골격근량", unit: "kg", good: 1 },
    { k: "bfm", name: "체지방량", unit: "kg", good: -1 },
    { k: "pbf", name: "체지방률", unit: "%", good: -1 }
  ];
  /* 2026-11-20 "BMI·기초대사량도 추가, 있어 보이게 + 식단 짤 때 더 정확하게" — 값이 있는 기록만 줄이 생김 (BMI = 체중 ÷ 키², 키는 결과지에서 읽거나 BMI로 거꾸로 계산해 저장) */
  var IB_ROWS2 = [
    { k: "bmi", name: "BMI", unit: "", good: 0 },
    { k: "bmr", name: "기초대사량", unit: "kcal", good: 1, int: 1 }
  ];
  function ibBmi(r) { return r && +r.h >= 120 && +r.w > 0 ? Math.round(r.w / Math.pow(r.h / 100, 2) * 10) / 10 : null; }
  function ibV(r, k) { return !r ? null : k === "bmi" ? ibBmi(r) : r[k] == null || r[k] === "" ? null : +r[k]; }
  function ibRows(a, b) { return IB_ROWS.concat(IB_ROWS2.filter(function (x) { return ibV(b, x.k) !== null && (!a || ibV(a, x.k) !== null); })); }
  function ibFmt(n) { return (Math.round(n * 10) / 10).toFixed(1); }
  function ibF(r, v) { return r.int ? Math.round(v).toLocaleString() : ibFmt(v); }
  function ibDate(d) { var p = d.split("-"); return (+p[1]) + ". " + (+p[2]); }
  function ibPair() {   /* [이전, 이번] — 이번 = 가장 최근 기록, 이전 = 그보다 앞선 달의 마지막 기록 */
    var a = ibData || [];
    if (!a.length) return null;
    var cur = a[a.length - 1], prev = null;
    for (var i = a.length - 2; i >= 0; i--) { if (a[i].d.slice(0, 7) < cur.d.slice(0, 7)) { prev = a[i]; break; } }
    return { cur: cur, prev: prev };
  }
  function ibSummary(p) {
    var ds = p.cur.smm - p.prev.smm, df = p.cur.bfm - p.prev.bfm;
    if (ds > 0.05 && df < -0.05) return "근육은 늘고 지방은 줄었어요! 가장 좋은 변화예요";
    if (ds > 0.05) return "근육이 늘었어요! 지금처럼 꾸준히 가요";
    if (df < -0.05) return "체지방이 줄었어요! 근육 지키면서 계속 가요";
    if (Math.abs(ds) <= 0.05 && Math.abs(df) <= 0.05) return "몸이 잘 유지되고 있어요. 다음 달에 한 칸 더!";
    return "이번 달은 숨 고르기. 루틴·식단 같이 점검해요";
  }
  function ibPanel() {
    if (!IB_ON) return "";
    var p = ibPair();
    var btn = '<button class="btn fill ib-add" type="button">' + (p && p.cur.d.slice(0, 7) === ymd(new Date()).slice(0, 7) ? "인바디 다시 올리기" : "이번 달 인바디 올리기") + '</button>';
    if (ibReady === false) return '<div class="panel ibpanel ib-empty"><div class="ib-empty-ic" aria-hidden="true"><span>InBody</span></div><h3>곧 열려요</h3><p>인바디 결과지를 올려 지난달과 비교하는 기능을 준비 중이에요</p></div>';
    if (!ibData && !ibErr) return '<div class="panel ibpanel ib-loading"><p class="ib-empty-t">기록을 불러오는 중이에요…</p></div>';
    if (!p) {
      return '<div class="panel ibpanel ib-empty"><div class="ib-empty-ic" aria-hidden="true"><span>InBody</span></div>' +
        '<h3>인바디 결과지를 올려 보세요</h3><p>한 달에 한 번, 결과지 사진과 숫자 4개만 넣으면 지난달과 비교해 드려요</p>' + btn +
        (ibErr ? '<p class="ib-err">지금은 기록을 못 불러왔어요. 인터넷 연결을 확인해 주세요</p>' : '') + '</div>';
    }
    var head2, rows;
    if (p.prev) {
      head2 = '<div class="ib-when"><span><small>' + (+p.prev.d.slice(5, 7)) + '월</small>' + ibDate(p.prev.d) + '</span><b aria-hidden="true">→</b><span class="now"><small>' + (+p.cur.d.slice(5, 7)) + '월</small>' + ibDate(p.cur.d) + '</span></div>';
      rows = ibRows(p.prev, p.cur).map(function (r) {
        var a = ibV(p.prev, r.k), b = ibV(p.cur, r.k), dlt = Math.round((b - a) * 10) / 10;
        var cls = dlt === 0 || !r.good ? "same" : (dlt > 0) === (r.good > 0) ? "up" : "down";
        var sign = dlt > 0 ? "▲ +" : dlt < 0 ? "▼ −" : "";
        return '<div class="ib-row"><span class="ib-name">' + r.name + '</span><span class="ib-prev">' + ibF(r, a) + '</span>' +
          '<span class="ib-cur">' + ibF(r, b) + '<small>' + r.unit + '</small></span>' +
          '<span class="ib-d ' + cls + '">' + (dlt === 0 ? "그대로" : sign + ibF(r, Math.abs(dlt)) + r.unit) + '</span></div>';
      }).join("");
      rows = '<div class="ib-grid"><div class="ib-row ib-hd"><span></span><span>지난달</span><span>이번 달</span><span>변화</span></div>' + rows + '</div>' +
        '<p class="ib-sum">' + ibSummary(p) + '</p>';
    } else {
      head2 = '<div class="ib-when"><span class="now"><small>' + (+p.cur.d.slice(5, 7)) + '월 첫 기록</small>' + ibDate(p.cur.d) + '</span></div>';
      rows = '<div class="ib-first">' + ibRows(null, p.cur).map(function (r) {
        return '<div><small>' + r.name + '</small><b>' + ibF(r, ibV(p.cur, r.k)) + '<em>' + r.unit + '</em></b></div>';
      }).join("") + '</div><p class="ib-sum">첫 기록 완료! 다음 달에 올리면 지난달과 비교해 드려요</p>';
    }
    var hist = (ibData || []).slice().reverse().map(function (r) {
      return '<li><span class="ib-hd8">' + r.d.replace(/-/g, ". ") + '</span><span>' + ibFmt(r.w) + 'kg · 근육 ' + ibFmt(r.smm) + ' · 지방 ' + ibFmt(r.pbf) + '%' + (ibBmi(r) ? ' · BMI ' + ibFmt(ibBmi(r)) : '') + '</span>' +
        (r.img ? '<button type="button" class="ib-photo" data-id="' + esc(r.id) + '">결과지</button>' : '') +
        '<button type="button" class="ib-del" data-id="' + esc(r.id) + '">삭제</button></li>';
    }).join("");
    return '<div class="panel ibpanel">' + head2 + rows + btn +
      '<details class="ib-hist"><summary>지난 기록 ' + ibData.length + '개 보기</summary><ul>' + hist + '</ul></details></div>';
  }
  /* 홈 인바디·식단 2칸 (2026-11-19 장동욱 "인바디 아이콘도 상단 4개 아이콘처럼 리메이크, 식단과 연결"):
     예전 가로 띠(.ibstrip)를 공지·복습지 칸과 같은 정사각 위젯(.hwid.hinfo.hib) 두 칸으로 — 왼쪽 인바디(#body: 지난달 대비 골격근·체지방),
     오른쪽 내 식단(#diet: 최근 인바디로 계산한 하루 kcal + 탄단지 막대 dbCalc, 인바디가 없으면 "결과지 올리면 자동 계산"). 공지·복습지 칸 바로 아래 */
  var IB_SVG = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.1" stroke-linecap="round" stroke-linejoin="round"><rect x="4" y="3.5" width="16" height="17" rx="4"/><path d="M8.3 10a3.7 3.7 0 0 1 7.4 0"/><path d="M12 10l1.7-1.7"/><path d="M9 15.5h6"/></svg>';
  var DBI_SVG = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.1" stroke-linecap="round" stroke-linejoin="round"><path d="M3.5 11.5h17a8.5 8.5 0 0 1-17 0z"/><path d="M8.5 20.5h7"/><path d="M9 8c0-1.5 1.2-1.5 1.2-3M13.5 8c0-1.5 1.2-1.5 1.2-3"/></svg>';
  function ibHomeStrip() {
    if (!IB_ON || ibReady === false) return "";
    var p = ibData ? ibPair() : null, c = p && p.cur, pv = p && p.prev;
    function sg(n) { return (n >= 0 ? "+" : "−") + ibFmt(Math.abs(n)); }
    function dmd(s) { var m = String(s || "").match(/\d{4}-(\d{1,2})-(\d{1,2})/); return m ? (+m[1]) + "월 " + (+m[2]) + "일" : ""; }
    var t1 = !c ? "결과지 올리고 지난달과 비교해요" : !pv ? "체중 " + ibFmt(c.w) + "kg · 첫 기록 완료" :
      '골격근 <em class="' + (c.smm - pv.smm >= 0 ? "up" : "dn") + '">' + sg(c.smm - pv.smm) + 'kg</em><br>체지방 <em class="' + (c.bfm - pv.bfm <= 0 ? "up" : "dn") + '">' + sg(c.bfm - pv.bfm) + 'kg</em>';
    var h = '<div class="hwid hinfo hib">';
    h += '<a class="hw col hi" href="#body"><span class="hi-top"><span class="hi-ic bellc ibc" aria-hidden="true">' + IB_SVG + '</span><i class="hi-go">›</i></span>' +
      '<small>인바디' + (c ? ' · ' + dmd(c.d) : '') + '</small><b class="hi-t">' + t1 + '</b></a>';
    var R = null; try { R = dbCalc(); } catch (e) {}
    var dg = DB_GOAL[dbGet().g] || DB_GOAL.keep;
    if (R) {
      var tot = R.C * 4 + R.P * 4 + R.F * 9 || 1;
      h += '<a class="hw col hi" href="#diet"><span class="hi-top"><span class="hi-ic bellc dbc" aria-hidden="true">' + DBI_SVG + '</span><i class="hi-go">›</i></span>' +
        '<small>내 식단 · ' + esc(dg.n) + '</small><b class="hi-t">하루 ' + R.kcal.toLocaleString() + 'kcal</b>' +
        '<span class="hib-m" aria-label="탄수 ' + R.C + 'g 단백질 ' + R.P + 'g 지방 ' + R.F + 'g"><i class="c" style="flex:' + R.C * 4 / tot + '"></i><i class="p" style="flex:' + R.P * 4 / tot + '"></i><i class="f" style="flex:' + R.F * 9 / tot + '"></i></span>' +
        '<span class="hib-l"><span>탄 ' + R.C + 'g</span><span>단 ' + R.P + 'g</span><span>지 ' + R.F + 'g</span></span></a>';
    } else {
      h += '<a class="hw col hi" href="#diet"><span class="hi-top"><span class="hi-ic bellc dbc" aria-hidden="true">' + DBI_SVG + '</span><i class="hi-go">›</i></span>' +
        '<small>내 식단 · ' + esc(dg.n) + '</small><b class="hi-t">인바디 올리면 식단이 자동 계산돼요</b></a>';
    }
    return h + '</div>';
  }
  function ibRefresh() {
    var b = document.querySelector(".ibpanel"); if (b) { b.outerHTML = ibPanel(); setupIb(); }
    if (document.querySelector(".db-set") && dbIbSig() !== DB_IBDRAWN) { DB_IBDRAWN = dbIbSig(); rerender(); }   /* 식단 짜기: 인바디가 도착하면 한 번 다시 계산 */
    var tr = document.querySelector(".ibtrend"); if (tr) tr.outerHTML = ibTrend();
    var s = document.querySelector(".hib, .ibstrip-slot");
    if (s) { var h = ibHomeStrip(); s.outerHTML = h || '<span class="ibstrip-slot"></span>'; }
    alignText(document);
  }
  function ibSet(list) { ibData = list || []; ibErr = false; try { localStorage.setItem(IB_KEY, JSON.stringify(ibData)); } catch (e) {} }
  function ibSync() {
    if (!IB_ON || !ATT_API) return;
    fetch(ATT_API + "?m=" + encodeURIComponent(SLUG) + "&a=inbody", { cache: "no-store" })
      .then(function (r) { return r.json(); })
      .then(function (j) {
        if (!j || !j.ok) throw new Error("ib");
        if (!("inbody" in j)) { ibReady = false; ibRefresh(); return; }   /* 창고가 아직 옛 버전(인바디 없음) */
        ibReady = true; ibSet(j.inbody); ibRefresh();
        if (bgReady) badgeCheck();
      })
      .catch(function () { if (!ibData) { ibErr = true; ibRefresh(); } });
  }
  /* 결과지 글자(OCR, Apps Script가 구글 드라이브로 읽어 글자만 돌려줌) → 숫자 찾기. 규칙은 여기서 고치면 됨(창고 재배포 필요 없음) */
  function ibParse(text) {
    var t = String(text || "").replace(/[\u00a0\t]/g, " ").replace(/(\d),(\d)/g, "$1.$2");
    function grab(re, lo, hi, skipBefore) {
      var rx = new RegExp(re.source, "gi"), m;
      while ((m = rx.exec(t))) {
        if (skipBefore && skipBefore.test(t.slice(Math.max(0, m.index - 3), m.index))) continue;
        var st = m.index + m[0].length, rest = t.slice(st, st + 70), nr = /\d{1,3}\.\d/g, k;
        while ((k = nr.exec(rest))) {
          var before = rest.slice(Math.max(0, k.index - 2), k.index), after = rest.slice(k.index + k[0].length, k.index + k[0].length + 3);
          if (/[~～]/.test(before) || /^\s*[~～\-]\s*\d/.test(after)) continue;   /* 표준 범위(55.7~75.3)는 건너뜀 */
          var v = parseFloat(k[0]);
          if (v >= lo && v <= hi) return v;
        }
      }
      return null;
    }
    var r = {
      w: grab(/체\s*중(?!\s*(조절|관리))|weight/, 20, 300, /(적정|표준|목표)\s*$/),
      smm: grab(/골\s*격\s*근\s*량|skeletal\s*muscle\s*mass|SMM/, 3, 90),
      bfm: grab(/체\s*지\s*방\s*량|body\s*fat\s*mass/, 0.5, 200),
      pbf: grab(/체\s*지\s*방\s*률|percent\s*body\s*fat|PBF/, 1, 75),
      bmi: grab(/BMI|신\s*체\s*질\s*량\s*지\s*수|body\s*mass\s*index/, 12, 60)
    };
    if (r.smm !== null && r.w !== null && r.smm >= r.w) r.smm = null;
    if (r.w !== null && r.pbf !== null && r.bfm !== null && Math.abs(r.w * r.pbf / 100 - r.bfm) > Math.max(1.5, r.bfm * 0.15)) r.bfm = null;
    if (r.w !== null && r.bfm !== null && r.pbf === null) r.pbf = Math.round(r.bfm / r.w * 1000) / 10;
    var dm = t.match(/(20\d{2})\s*[.\-\/년]\s*(\d{1,2})\s*[.\-\/월]\s*(\d{1,2})/);
    if (dm) {
      var dd = new Date(+dm[1], +dm[2] - 1, +dm[3]), now = new Date();
      if (dd <= now && now - dd < 400 * 86400000) r.d = ymd(dd);
    }
    /* 2026-11-19 식단 계산용: 결과지에 찍힌 기초대사량(kcal)·키(cm)도 읽음 — 시트에는 안 넣고 식단 저장(mw:<주소>:diet)에만 */
    var raw = String(text || "").replace(/[\u00a0\t]/g, " "), bm = /기\s*초\s*대\s*사\s*량|basal\s*metabolic|BMR/gi, mm;
    r.bmr = null; r.h = null;
    while (r.bmr === null && (mm = bm.exec(raw))) {
      var seg = raw.slice(mm.index + mm[0].length, mm.index + mm[0].length + 80), nx = /(\d{1,2},\d{3}|\d{3,4})(?![\d.])/g, q;
      while ((q = nx.exec(seg))) {
        if (/[~～\-]\s*$/.test(seg.slice(Math.max(0, q.index - 3), q.index)) || /^\s*[~～\-]\s*\d/.test(seg.slice(q.index + q[0].length, q.index + q[0].length + 4))) continue;   /* 표준 범위는 건너뜀 */
        var bv = +q[0].replace(",", ""); if (bv >= 800 && bv <= 3500) { r.bmr = bv; break; }
      }
    }
    var hm = raw.match(/(?:신\s*장|키|height)[^\d]{0,12}(\d{3}(?:\.\d)?)\s*(?:cm|㎝)?/i) || raw.match(/(\d{3}(?:\.\d)?)\s*(?:cm|㎝)/i);
    if (hm && +hm[1] >= 120 && +hm[1] <= 220) r.h = +hm[1];
    return r;
  }
  function ibShrink(file, max) {   /* 사진을 긴 변 max(기본 1400)px JPEG로 줄여 base64 (글자만) */
    return new Promise(function (res, rej) {
      var fr = new FileReader();
      fr.onerror = rej;
      fr.onload = function () {
        var im = new Image();
        im.onerror = rej;
        im.onload = function () {
          var s = Math.min(1, (max || 1400) / Math.max(im.width, im.height)), c = document.createElement("canvas");
          c.width = Math.round(im.width * s); c.height = Math.round(im.height * s);
          c.getContext("2d").drawImage(im, 0, 0, c.width, c.height);
          res(c.toDataURL("image/jpeg", 0.82).split(",")[1]);
        };
        im.src = fr.result;
      };
      fr.readAsDataURL(file);
    });
  }
  function ibSheetOpen() {
    var wrap = document.createElement("div");
    wrap.className = "ibsheet";
    wrap.innerHTML = '<div class="ibs-back" data-close></div><form class="ibs-card" novalidate>' +
      '<div class="ibs-top"><h3>인바디 올리기</h3><button type="button" class="ibs-x" data-close aria-label="닫기">×</button></div>' +
      '<label class="ibs-file"><input type="file" id="ibFile" accept="image/*,application/pdf"><span class="ibs-ph"><b>결과지 사진 찍기 · 고르기</b><small>사진이나 PDF 파일을 올리면 숫자를 자동으로 읽어 채워요</small></span><img alt="" hidden></label>' +
      '<label class="ibs-f"><span>측정한 날</span><input type="date" id="ibDate" value="' + ymd(new Date()) + '" max="' + ymd(new Date()) + '"></label>' +
      '<p class="ibs-hint">결과지 <b>체성분분석 · 골격근·지방분석 · 비만분석 · 기초대사량</b> 칸의 숫자를 넣어요</p>' +
      '<div class="ibs-nums">' +
      '<label class="ibs-f"><span>체중 <em>kg</em></span><input id="ibW" inputmode="decimal" placeholder="예 72.4" autocomplete="off"></label>' +
      '<label class="ibs-f"><span>골격근량 <em>kg</em></span><input id="ibS" inputmode="decimal" placeholder="예 31.2" autocomplete="off"></label>' +
      '<label class="ibs-f"><span>체지방량 <em>kg</em></span><input id="ibB" inputmode="decimal" placeholder="비우면 자동" autocomplete="off"></label>' +
      '<label class="ibs-f"><span>체지방률 <em>%</em></span><input id="ibP" inputmode="decimal" placeholder="예 21.5" autocomplete="off"></label>' +
      '<label class="ibs-f"><span>BMI <em>kg/㎡</em></span><input id="ibI" inputmode="decimal" placeholder="예 23.4" autocomplete="off"></label>' +
      '<label class="ibs-f"><span>기초대사량 <em>kcal</em></span><input id="ibM" inputmode="numeric" placeholder="예 1520" autocomplete="off"></label>' +
      '</div><p class="ibs-hint ibs-hint2">BMI·기초대사량을 넣으면 식단 칼로리가 더 정확해져요</p><p class="ibs-msg" role="alert"></p>' +
      '<button class="btn fill ibs-save" type="submit">저장하기</button></form>';
    document.body.appendChild(wrap);
    document.documentElement.classList.add("ib-lock");
    var form = wrap.querySelector("form"), file = wrap.querySelector("#ibFile"), pv = wrap.querySelector(".ibs-file img"), msg = wrap.querySelector(".ibs-msg");
    var b64 = null, busy = false, ocrRun = 0;
    function close() { wrap.remove(); document.documentElement.classList.remove("ib-lock"); }
    Array.prototype.forEach.call(wrap.querySelectorAll("[data-close]"), function (x) { x.addEventListener("click", close); });
    file.addEventListener("change", function () {
      var f = file.files && file.files[0];
      if (!f) return;
      var pdf = f.type === "application/pdf" || /\.pdf$/i.test(f.name || "");   /* 2026-11-19 PDF 결과지도 — 숫자만 읽고 사진으로는 안 남김 */
      if (pdf && f.size > 5500000) { msg.textContent = "PDF가 너무 커요 (5MB까지) · 화면을 캡처해서 사진으로 올려 주세요"; return; }
      msg.textContent = pdf ? "파일 준비 중…" : "사진 준비 중…";
      (pdf ? new Promise(function (res, rej) { var fr = new FileReader(); fr.onload = function () { res(String(fr.result).split(",")[1] || ""); }; fr.onerror = rej; fr.readAsDataURL(f); }) : ibShrink(f, 1800)).then(function (d) {
        if (pdf) { b64 = null; pv.hidden = true; var ph = wrap.querySelector(".ibs-ph"); ph.hidden = false; ph.querySelector("b").textContent = "PDF · " + (f.name || "결과지"); ph.querySelector("small").textContent = "숫자만 읽어요 (사진으로는 저장되지 않아요)"; }
        else { b64 = d; pv.src = "data:image/jpeg;base64," + d; pv.hidden = false; wrap.querySelector(".ibs-ph").hidden = true; }
        msg.textContent = "";
        if (!ATT_API) return;
        var my = ++ocrRun;
        msg.className = "ibs-msg info"; msg.textContent = "결과지 숫자 읽는 중… (몇 초 걸려요)";
        fetch(ATT_API, { method: "POST", body: JSON.stringify({ a: "inbody_ocr", m: SLUG, img: d, mime: pdf ? "application/pdf" : "image/jpeg" }) })
          .then(function (r) { return r.json(); })
          .then(function (j) {
            if (my !== ocrRun || !wrap.isConnected) return;
            if (!j || !j.ok) throw new Error(j && j.error || "ocr");
            var r = ibParse(j.text || ""), got = 0, v = j.vals;   /* 2026-11-20 AI가 읽은 값(vals) 먼저, 빈 칸만 OCR 글자로 */
            if (v) ["w", "smm", "bfm", "pbf", "bmr", "h", "bmi", "d"].forEach(function (k) { if (v[k] !== null && v[k] !== undefined && v[k] !== "") r[k] = v[k]; });
            if (v && r.w !== null && r.bfm === null && r.pbf !== null) r.bfm = Math.round(r.w * r.pbf / 10) / 10; wrap._x = { bmr: r.bmr, h: r.h };
            if (r.bmi == null && r.w && r.h) r.bmi = ibBmi(r);
            [["#ibW", "w"], ["#ibS", "smm"], ["#ibB", "bfm"], ["#ibP", "pbf"], ["#ibI", "bmi"], ["#ibM", "bmr"]].forEach(function (x) {
              var inp = wrap.querySelector(x[0]);
              if (r[x[1]] !== null && r[x[1]] !== undefined && !inp.value) { inp.value = x[1] === "bmr" ? String(Math.round(r[x[1]])) : ibFmt(r[x[1]]); inp.classList.add("auto"); got++; }
            });
            if (r.d) { var di = wrap.querySelector("#ibDate"); di.value = r.d; di.classList.add("auto"); }
            msg.className = "ibs-msg " + (got ? "info" : "");
            msg.textContent = got ? "결과지에서 숫자 " + got + "개를 읽었어요. 분홍 칸이 결과지와 맞는지 꼭 확인해 주세요"
              : "숫자를 못 읽었어요. 직접 넣어 주세요 (결과지를 평평하게 놓고 위에서 정면으로 찍으면 더 잘 읽어요)";
          })
          .catch(function () {
            if (my !== ocrRun || !wrap.isConnected) return;
            msg.className = "ibs-msg"; msg.textContent = "자동 읽기가 안 됐어요. 숫자를 직접 넣어 주세요";
          });
      }).catch(function () { msg.className = "ibs-msg"; msg.textContent = "이 사진은 못 읽었어요. 다른 사진으로 해 주세요"; });
    });
    Array.prototype.forEach.call(wrap.querySelectorAll(".ibs-f input"), function (inp) {
      inp.addEventListener("input", function () { inp.classList.remove("auto"); });
    });
    function n(id) { var v = String(wrap.querySelector(id).value || "").replace(",", ".").trim(); return v === "" ? null : Number(v); }
    form.addEventListener("submit", function (ev) {
      ev.preventDefault();
      if (busy) return;
      msg.className = "ibs-msg";
      var w = n("#ibW"), s = n("#ibS"), bf = n("#ibB"), pf = n("#ibP"), d = wrap.querySelector("#ibDate").value;
      if (!d) { msg.textContent = "측정한 날을 골라 주세요"; return; }
      if (!(w >= 20 && w <= 300)) { msg.textContent = "체중을 확인해 주세요 (예 72.4)"; return; }
      if (!(s >= 3 && s <= 90)) { msg.textContent = "골격근량을 확인해 주세요 (예 31.2)"; return; }
      if (!(pf >= 1 && pf <= 75)) { msg.textContent = "체지방률을 확인해 주세요 (예 21.5)"; return; }
      /* 2026-11-20 "처음 올려도 업적이 잘 인식되게" — 잘못 읽힌 숫자가 저장되지 않게 한 번 더 확인 */
      if (d > ymd(new Date())) { msg.textContent = "측정한 날이 오늘보다 뒤예요. 날짜를 확인해 주세요"; return; }
      if (s >= w * 0.7) { msg.textContent = "골격근량이 체중에 비해 너무 커요. 체중·골격근량을 확인해 주세요"; return; }
      if (bf !== null && Math.abs(w * pf / 100 - bf) > Math.max(2, bf * 0.2)) { msg.textContent = "체중 × 체지방률과 체지방량이 안 맞아요. 세 숫자를 결과지와 다시 비교해 주세요"; return; }
      var ibPrev = (ibData || []).filter(function (r) { return r && r.d && r.d <= d && +r.w > 0; }).sort(function (x, y) { return x.d < y.d ? 1 : x.d > y.d ? -1 : 0; })[0];
      if (ibPrev && form.getAttribute("data-sure") !== d + "|" + w) {
        var gapD = Math.round((new Date(d) - new Date(ibPrev.d)) / 86400000), dw = Math.round((w - +ibPrev.w) * 10) / 10;
        if (gapD === 0) { form.setAttribute("data-sure", d + "|" + w); msg.textContent = "같은 날 기록이 이미 있어요 (" + (+ibPrev.w) + "kg). 이 숫자로 하나 더 저장하려면 한 번 더 눌러 주세요"; return; }
        if (Math.abs(dw) > 3 + gapD * 0.2) { form.setAttribute("data-sure", d + "|" + w); msg.textContent = "지난 기록(" + ibPrev.d.slice(5).replace("-", "/") + " " + (+ibPrev.w) + "kg)보다 " + (dw > 0 ? "+" : "") + dw + "kg 차이 나요. 체중이 맞으면 한 번 더 눌러 주세요"; return; }
      }
      if (bf !== null && !(bf > 0 && bf < w)) { msg.textContent = "체지방량을 확인해 주세요 (모르면 비워 두세요)"; return; }
      var bi = n("#ibI"), bmrIn = n("#ibM"), hh = wrap._x && wrap._x.h || null;
      if (bi !== null && !(bi >= 12 && bi <= 60)) { msg.textContent = "BMI를 확인해 주세요 (예 23.4 · 모르면 비워 두세요)"; return; }
      if (bmrIn !== null && !(bmrIn >= 800 && bmrIn <= 3500)) { msg.textContent = "기초대사량을 확인해 주세요 (예 1520 · 모르면 비워 두세요)"; return; }
      if (bi !== null) { var hb = Math.round(Math.sqrt(w / bi) * 1000) / 10; if (hb >= 120 && hb <= 220 && (!hh || Math.abs(hb - hh) > 3)) hh = hb; }   /* BMI로 키를 거꾸로 계산 (결과지 키와 크게 다르면 BMI를 믿음) */
      wrap._x = { bmr: bmrIn !== null ? Math.round(bmrIn) : null, h: hh };
      if (!ATT_API) { msg.textContent = "저장할 곳이 아직 준비 안 됐어요"; return; }
      busy = true; form.classList.add("saving"); msg.className = "ibs-msg info"; msg.textContent = "저장하는 중…";
      fetch(ATT_API, { method: "POST", body: JSON.stringify({ a: "inbody_add", m: SLUG, n: M._real || M.name, d: d, w: w, smm: s, bfm: bf, pbf: pf, img: b64 || "", bmr: (wrap._x && wrap._x.bmr) || null, h: (wrap._x && wrap._x.h) || null }) })
        .then(function (r) { return r.json(); })
        .then(function (j) {
          if (!j || !j.ok) throw new Error(j && j.error || "save");
          dbFromIb(d, wrap._x); ibSet(j.inbody); close(); ibRefresh(); attToast("인바디 기록을 저장했어요");
          setTimeout(badgeCheck, 2800);
        })
        .catch(function () { busy = false; form.classList.remove("saving"); msg.className = "ibs-msg"; msg.textContent = "저장 못 했어요. 인터넷 연결을 확인하고 다시 눌러 주세요"; });
    });
  }
  function ibPhotoOpen(id) {
    var wrap = document.createElement("div");
    wrap.className = "ibview";
    wrap.innerHTML = '<button type="button" class="ibs-x" aria-label="닫기">×</button><p>결과지 불러오는 중…</p>';
    document.body.appendChild(wrap);
    wrap.addEventListener("click", function () { wrap.remove(); });
    fetch(ATT_API + "?m=" + encodeURIComponent(SLUG) + "&a=inbody_img&id=" + encodeURIComponent(id), { cache: "no-store" })
      .then(function (r) { return r.json(); })
      .then(function (j) {
        if (!j || !j.ok) throw new Error("img");
        var p = wrap.querySelector("p"); var im = document.createElement("img"); im.alt = "인바디 결과지"; im.src = j.data; p.replaceWith(im);
      })
      .catch(function () { var p = wrap.querySelector("p"); if (p) p.textContent = "사진을 못 불러왔어요"; });
  }
  function setupIb() {
    var add = document.querySelector(".ib-add");
    if (add) add.addEventListener("click", ibSheetOpen);
    Array.prototype.forEach.call(document.querySelectorAll(".ib-photo"), function (b) {
      b.addEventListener("click", function () { ibPhotoOpen(b.getAttribute("data-id")); });
    });
    Array.prototype.forEach.call(document.querySelectorAll(".ib-del"), function (b) {
      b.addEventListener("click", function () {
        if (!b.classList.contains("arm")) {   /* 한 번 더 눌러야 삭제 */
          b.classList.add("arm"); b.textContent = "한 번 더 누르면 삭제";
          setTimeout(function () { if (b.isConnected) { b.classList.remove("arm"); b.textContent = "삭제"; } }, 3000);
          return;
        }
        b.disabled = true; b.textContent = "삭제 중…";
        fetch(ATT_API + "?m=" + encodeURIComponent(SLUG) + "&a=inbody_del&id=" + encodeURIComponent(b.getAttribute("data-id")), { cache: "no-store" })
          .then(function (r) { return r.json(); })
          .then(function (j) { if (!j || !j.ok) throw new Error("del"); ibSet(j.inbody); ibRefresh(); })
          .catch(function () { b.disabled = false; b.classList.remove("arm"); b.textContent = "삭제"; attToast("인터넷 연결을 확인하고 다시 눌러주세요"); });
      });
    });
  }

  /* 몸변화 탭 (#body) — 2026-11-06 목표 탭에서 따로 뺌 */
  function ibSpark(list, k, good) {
    var W = 230, H = 46, n = list.length, vs = list.map(function (r) { return r[k]; });
    var lo = Math.min.apply(null, vs), hi = Math.max.apply(null, vs), pad = Math.max(0.6, (hi - lo) * 0.25);
    lo -= pad; hi += pad;
    var X = function (i) { return n === 1 ? W / 2 : 8 + i * (W - 16) / (n - 1); }, Y = function (v) { return 6 + (hi - v) / (hi - lo) * (H - 12); };
    var pts = list.map(function (r, i) { return X(i).toFixed(1) + "," + Y(r[k]).toFixed(1); }).join(" ");
    var dots = list.map(function (r, i) {
      var last = i === n - 1;
      return '<circle cx="' + X(i).toFixed(1) + '" cy="' + Y(r[k]).toFixed(1) + '" r="' + (last ? 4.5 : 3) + '" fill="' + (last ? "var(--key)" : "var(--primary)") + '"' + (last ? ' stroke="#fff" stroke-width="2"' : '') + '/>';
    }).join("");
    var d = vs[n - 1] - vs[0], cls = Math.abs(d) < 0.05 || !good ? "same" : (d > 0) === (good > 0) ? "up" : "down";
    return { svg: '<svg viewBox="0 0 ' + W + ' ' + H + '" aria-hidden="true"><polyline points="' + pts + '" fill="none" stroke="var(--primary)" stroke-width="2.5" stroke-linejoin="round" stroke-linecap="round" opacity=".55"/>' + dots + '</svg>',
             d: d, cls: cls };
  }
  function ibTrend() {
    var a = (ibData || []).slice(-12);
    if (a.length < 2) return '<div class="ibtrend panel ib-trend-empty"><p>기록이 2개 이상 쌓이면 여기에 흐름 그래프가 나와요</p></div>';
    var rows = [["smm", "골격근량", "kg", 1], ["bfm", "체지방량", "kg", -1], ["pbf", "체지방률", "%", -1], ["w", "체중", "kg", 0]].map(function (r) {
      var sp = ibSpark(a, r[0], r[3]);
      return '<div class="ibt-row"><div class="ibt-l"><b>' + r[1] + '</b><small>' + ibFmt(a[a.length - 1][r[0]]) + r[2] + '</small></div>' + sp.svg +
        '<span class="ib-d ' + sp.cls + '">' + (Math.abs(sp.d) < 0.05 ? "그대로" : (sp.d > 0 ? "▲ +" : "▼ −") + ibFmt(Math.abs(sp.d)) + r[2]) + '</span></div>';
    }).join("");
    return '<div class="ibtrend panel"><p class="ibt-when">' + a[0].d.replace(/-/g, ". ") + ' → ' + a[a.length - 1].d.replace(/-/g, ". ") + ' · 기록 ' + a.length + '개</p>' + rows + '</div>';
  }
  function renderBody() {
    var h = '<a class="back" href="#log">← 기록</a><div class="hero"><div class="hero-main"><div class="hero-l"><div class="eyebrow">MY BODY <b>· 몸 변화 기록</b></div>' +
      '<h1>몸 변화 기록</h1><div class="en">' + esc(M.name) + ' 회원님 · 인바디로 지난달과 비교해요</div>' +
      '<div class="who"><strong>한 달에 한 번</strong><span>담당 ' + esc(TRN) + ' 트레이너</span></div></div></div>' +
      '<div class="keypoint"><small>KEY POINT</small><p>숫자는 한 달에 한 번! 같은 시간 · 같은 조건으로 재요</p></div></div>';
    h += '<section>' + head("01", "지난달 vs 이번 달", "결과지 찍어 올리면 비교해 드려요") + ibPanel() + '</section>';
    h += '<section>' + head("02", "한눈에 보는 흐름", "처음 기록부터 지금까지") + ibTrend() + '</section>';
    h += '<section>' + head("03", "정확하게 재는 법", "조건이 같아야 비교가 정확해요") + '<div class="panel ibtips"><ul>' +
      ['아침 공복, 화장실 다녀온 뒤에 재요', '운동 · 샤워 · 사우나 직후는 피해요', '양말 벗고, 시계 · 반지 같은 금속은 빼요', '매번 같은 시간대, 같은 기계로 재요', '결과지는 평평하게 놓고 위에서 정면으로 찍어요'].map(function (x) {
        return '<li>' + esc(x) + '</li>';
      }).join("") + '</ul></div></section>';
    return h + remember();
  }

  /* 로테이션 날 (2026-11-06, 박찬영님 — 주말에 한 번 부위를 골라서): day.pick = ["mon","tue",…] 고를 수 있는 요일들, items 없음 */
  function pickList(d) {
    return '<div class="ex-list">' + d.pick.map(function (pk) {
      var pd = dayByKey(pk); if (!pd || pd.rest || !pd.items || !pd.items.length) return '';
      var mi = mainItem(pd);
      return '<a class="ex pick" href="#routine-' + pk + '"><div class="ex-top"><span class="ex-ic">' + img(iconOf(mi)) + '</span><div>' +
        '<h3>' + esc(pd.part) + '</h3><div class="meta">' + DAY_KO[pk] + '요일 루틴 그대로 · ' + pd.items.length + '종목</div>' +
        '<div class="tip">메인 ' + esc(mi.name) + ' →</div></div></div></a>';
    }).join("") + '</div>';
  }
  /* ---------------- 출석 배지 · 이번 달 근육 지도 · 월간 리포트 (2026-11-08 장동욱 "이렇게 ㄱㄱ")
     - (2026-11-17 리메이크 → 아래 '배지 리메이크' 주석 참고) 옛 배지 12개(목표 탭 03): 출석 횟수 1·10·30·50·100 / 연속 출석 3·7·14 / 새벽 운동(7시 전) / 주말 전사(토·일 둘 다) /
       첫 인바디(인바디 없는 회원은 연속 30) / 루틴 레벨업(루틴 v2 이상). 등급 Lv.1 한 줄 → Lv.2 두 겹 → Lv.3 금빛 월계수 → Lv.4 금빛+리본.
       새로 받으면 팝업 한 번(휴대폰 localStorage ptnote:<주소>:badges). 선생님 보기·안내서 보기에서는 팝업 안 띄움.
     - 근육 지도(목표 탭 04): 출석한 날의 루틴(요일 / 순환은 DAY 순서) 종목 이름 → 부위 8개. 1~2회 · 3~4회 · 5회 이상 진하게.
       그림은 assets/muscle/M|F/base.png + 부위별 투명 그림(_tools/make_musclemap.py).
     - 월간 리포트(#report, #report-YYYY-MM): 1080×1350 카드, 이미지로 저장(html2canvas). 매달 1~7일 홈에 '지난달 리포트 도착'.
       선생님 한마디는 data.js reports: { "2026-11": "문구" } (없으면 자동 한 줄 요약) */
  (function () {   /* 숫자용 글꼴 */
    if (document.getElementById("oswald")) return;
    var l = document.createElement("link"); l.id = "oswald"; l.rel = "stylesheet";
    l.href = "https://fonts.googleapis.com/css2?family=Oswald:wght@600;700&display=swap";
    document.head.appendChild(l);
  })();
  /* ---------------- 배지 (2026-11-17 2차 장동욱 "바프 배지 없애고, 브론즈~레전드 없애고, 배지는 늘리되 퀄리티 있게, 한 페이지로")
     - 배지 45개 = 출석·기록·성장 15개씩(5칸×3줄) (badgeList). 등급 없음 — 전부 같은 디자인(금테 + 검정 에나멜 + 금색 그림, bgIcon 84×72 SVG). 못 받은 건 연회색.
     - 나 탭 배지 칸은 한 칸(.bgx): 전체 막대 + 다음 배지 한 줄 + 탭(출석·기록·성장, bgTab) + 그 탭 배지만. 바프 완료 특별 배지는 없앰(journey.bpDone 안 씀).
     - 받은 날·누적 기록은 창고 mw:<주소>:bg = { on:{배지id:날짜}, m:{"YYYY-MM":[기록한 날, ✓ 수]}, n:[✓한 종목 이름], at } (bgSync·bgServer, 재배포 X)
     - 팝업(showBadgePop): 금빛 빛줄기 + 메달이 돌며 떨어짐 + 모은 배지 막대가 차오름. 이미 본 배지 id는 폰 ptnote:<주소>:badges. */
  var BG_CAT = [["att", "출석"], ["log", "기록"], ["grow", "성장"], ["body", "몸 변화"]];   /* 몸 변화 = 인바디 배지 (2026-11-19, 인바디 쓰는 회원만 탭이 보임) */
  var BG_SEEN = "ptnote:" + SLUG + ":badges", bgTab = "att";
  var BG_IC = {
    check: '<path d="M5 12.5l4.5 4.5L19 7.5" stroke-width="2.8"/>',
    flame: '<path d="M12 3c1 3.5 5 5.5 5 10a5 5 0 0 1-10 0c0-2.4 1.3-4 2.6-5.2.3 1.6 1 2.6 2.1 3.2C11.3 8.6 11.2 5.6 12 3z"/>',
    sun: '<path d="M4 18h16"/><path d="M7 18a5 5 0 0 1 10 0"/><path d="M12 6v3"/><path d="M5.6 10.6l1.8 1.4"/><path d="M18.4 10.6l-1.8 1.4"/>',
    moon: '<path d="M19.5 14.2A7.8 7.8 0 0 1 9.8 4.5a7.8 7.8 0 1 0 9.7 9.7z"/>',
    cal: '<rect x="4" y="5" width="16" height="15" rx="2.5"/><path d="M4 10h16"/><path d="M8 3v4"/><path d="M16 3v4"/>',
    star: '<path d="M12 3.5l2.6 5.4 5.9.8-4.3 4.1 1 5.8L12 16.9 6.8 19.6l1-5.8-4.3-4.1 5.9-.8z"/>',
    pen: '<path d="M4.5 19.5l1-4.5L15.8 4.7a2.1 2.1 0 0 1 3 3L8.5 18z"/><path d="M13.8 6.7l3 3"/>',
    list: '<path d="M10 6.5h10M10 12h10M10 17.5h10"/><path d="M3.8 6.5l1.4 1.4 2.4-2.6M3.8 12l1.4 1.4 2.4-2.6M3.8 17.5l1.4 1.4 2.4-2.6"/>',
    layers: '<path d="M12 4l9 5-9 5-9-5z"/><path d="M3 13.5l9 5 9-5"/>',
    grid: '<rect x="4" y="4" width="6.5" height="6.5" rx="1.6"/><rect x="13.5" y="4" width="6.5" height="6.5" rx="1.6"/><rect x="4" y="13.5" width="6.5" height="6.5" rx="1.6"/><rect x="13.5" y="13.5" width="6.5" height="6.5" rx="1.6"/>',
    body: '<circle cx="12" cy="4.8" r="2.2"/><path d="M5 9.2h14"/><path d="M12 9.2v6"/><path d="M12 15.2l-3.6 5.3M12 15.2l3.6 5.3"/>',
    bell: '<path d="M2.5 9.5v5M5.5 7v10M18.5 7v10M21.5 9.5v5M5.5 12h13"/>',
    trend: '<path d="M4 17l5-5 4 3.2L20 7.5"/><path d="M15 7.5h5v5"/>',
    scale: '<rect x="4" y="4" width="16" height="16" rx="4"/><path d="M8.5 10a3.5 3.5 0 0 1 7 0"/><path d="M12 10l1.6-1.6"/>',
    up: '<path d="M12 19V6"/><path d="M6.5 11.5L12 6l5.5 5.5"/><path d="M5 20h14"/>',
    down: '<path d="M12 4v13"/><path d="M6.5 11.5L12 17l5.5-5.5"/><path d="M5 20.5h14"/>',
    trendd: '<path d="M4 7l5 5 4-3.2L20 16.5"/><path d="M15 16.5h5v-5"/>',
    scaled: '<rect x="4" y="4" width="16" height="16" rx="4"/><path d="M8.5 10a3.5 3.5 0 0 1 7 0"/><path d="M12 10l-1.6-1.6"/><path d="M9 15.5h6"/>',
    book: '<path d="M4 5.5C6.5 4.3 9.5 4.3 12 6c2.5-1.7 5.5-1.7 8-.5V19c-2.5-1.2-5.5-1.2-8 .5-2.5-1.7-5.5-1.7-8-.5z"/><path d="M12 6v13.5"/>',
    heart: '<path d="M12 20s-7.5-4.6-7.5-10.2A4.1 4.1 0 0 1 12 7.4a4.1 4.1 0 0 1 7.5 2.4C19.5 15.4 12 20 12 20z"/>'
  };
  (function (I) {   /* 2026-11-17 3차 "각자 다른 아이콘": 배지마다 그림이 다름 */
    I.flag = '<path d="M6 21V4"/><path d="M6 4.5h11l-2.5 4 2.5 4H6z"/>';
    I.stamp = '<circle cx="12" cy="12" r="8.8"/><path d="M12 7.6l1.4 2.9 3.2.4-2.3 2.2.6 3.1L12 14.7l-2.9 1.5.6-3.1-2.3-2.2 3.2-.4z"/>';
    I.medal = '<path d="M8.5 10.5L6 3h4l2 5"/><path d="M15.5 10.5L18 3h-4l-2 5"/><circle cx="12" cy="15" r="5.5"/>';
    I.trophy = '<path d="M7 4h10v5a5 5 0 0 1-10 0z"/><path d="M7 5.5H4a3 3 0 0 0 3 4"/><path d="M17 5.5h3a3 3 0 0 1-3 4"/><path d="M12 14v3.5M9.5 17.5h5M8 20.5h8"/>';
    I.crown = '<path d="M4 17.5L2.5 8l5 4L12 5l4.5 7 5-4L20 17.5z"/><path d="M4.5 21h15"/>';
    I.flame = '<path d="M12 2.5c1 3.5 5.5 6 5.5 11a5.5 5.5 0 0 1-11 0c0-2.6 1.4-4.3 2.8-5.6.3 1.7 1 2.8 2.2 3.4C11.2 8.6 11.2 5.4 12 2.5z"/>';
    I.flame2 = I.flame + '<path d="M12 19.5a2.4 2.4 0 0 0 2.4-2.4c0-1.5-1.3-2.2-2.4-3.8-1.1 1.6-2.4 2.3-2.4 3.8a2.4 2.4 0 0 0 2.4 2.4z"/>';
    I.bolt = '<path d="M13.5 2.5L5 13.5h6l-1 8 8.5-11h-6z"/>';
    I.rocket = '<path d="M12 2.5c3.2 2.4 4.5 6 4.5 9.5l-1.5 4H9l-1.5-4c0-3.5 1.3-7.1 4.5-9.5z"/><circle cx="12" cy="9.5" r="1.7"/><path d="M7.5 13l-3 3.5 3.5-.5M16.5 13l3 3.5-3.5-.5M10.5 18.5l1.5 3 1.5-3"/>';
    I.moon = '<path d="M18.5 14.7A7.6 7.6 0 0 1 9.3 5.5a7.6 7.6 0 1 0 9.2 9.2z"/><path d="M17 3.5v3.4M15.3 5.2h3.4"/>';
    I.calw = I.cal + '<circle cx="9" cy="15" r="1.3"/><circle cx="15" cy="15" r="1.3"/>';
    I.calc = I.cal + '<path d="M8.5 14.6l2.5 2.5 4.5-4.6"/>';
    I.clip = '<rect x="5" y="4.5" width="14" height="16" rx="2.5"/><path d="M9 3h6v3.5H9z"/><path d="M8.5 11.5h7M8.5 15.5h5"/>';
    I.bookmark = '<path d="M6.5 3.5h11v17l-5.5-4-5.5 4z"/>';
    I.shield = '<path d="M12 2.8l7.5 2.7v6c0 4.6-3 8-7.5 9.7-4.5-1.7-7.5-5.1-7.5-9.700v-6z"/><path d="M8.5 11.8l2.5 2.5 4.5-4.6"/>';
    I.ccheck = '<circle cx="12" cy="12" r="8.8"/><path d="M8 12.3l2.8 2.8L16 9.7"/>';
    I.dcheck = '<path d="M2.5 12.5l4 4 8-8.5"/><path d="M10.5 15.5l1.5 1.5 9.5-10"/>';
    I.target = '<circle cx="12" cy="12" r="9"/><circle cx="12" cy="12" r="5.2"/><circle cx="12" cy="12" r="1.5"/>';
    I.mount = '<path d="M2.5 19.5L9 7l4 7 2.5-3.5 6 9z"/><path d="M7.3 10.300l1.7 1.5 1.7-1.3"/>';
    I.compass = '<circle cx="12" cy="12" r="9"/><path d="M15.5 8.5l-2 5-5 2 2-5z"/>';
    var r8 = '<circle cx="12" cy="12" r="2.2"/>'; for (var i = 0; i < 8; i++) r8 += '<circle cx="' + (12 + 8 * Math.cos(i * Math.PI / 4)).toFixed(1) + '" cy="' + (12 + 8 * Math.sin(i * Math.PI / 4)).toFixed(1) + '" r="1.7"/>';
    I.ring8 = r8;
    I.kettle = '<path d="M8.8 9.5V7a3.2 3.2 0 0 1 6.4 0v2.5"/><circle cx="12" cy="14.7" r="6.3"/>';
    I.barbell = '<path d="M2 12h20M5.5 6.5v11M8.5 8.5v7M18.5 6.5v11M15.5 8.5v7"/>';
    I.plate = '<circle cx="12" cy="12" r="9"/><circle cx="12" cy="12" r="5.5"/><circle cx="12" cy="12" r="1.6"/>';
    I.chev2 = '<path d="M5 12.5l7-7 7 7"/><path d="M5 19.5l7-7 7 7"/>';
    I.stairs = '<path d="M3 20.5h4.5V16H12v-4.5h4.5V7H21"/>';
    I.cap = '<path d="M2 9.5L12 5l10 4.5-10 4.5z"/><path d="M6.5 12v4.5c1.5 1.6 3.4 2.3 5.5 2.300s4-.7 5.5-2.300V12M21.5 10v5"/>';
    I.award = '<circle cx="12" cy="9" r="5.5"/><path d="M8.5 13.5L7 21l5-2.5 5 2.5-1.5-7.5"/>';
    I.sprout = '<path d="M12 21v-9"/><path d="M12 13c0-4-2.5-6.5-7-6.5 0 4 2.5 6.5 7 6.5z"/><path d="M12 11c0-3.5 2-6 6.5-6 0 3.8-2 6-6.5 6z"/>';
    I.tree = '<path d="M12 21.5v-6"/><path d="M12 3l-5.5 7h3L5 15.5h14L14.5 10h3z"/>';
    I.gem = '<path d="M6.5 4h11l4 5.5L12 21 2.5 9.5z"/><path d="M2.5 9.5h19M9 4L7.5 9.5 12 21l4.5-11.5L15 4"/>';
  })(BG_IC);
  var BG_PAL = { R: ["#FF7A80", "#B00E17"], O: ["#FFB259", "#DD4A12"], Y: ["#FFD96E", "#D07F00"], G: ["#73E6A5", "#0C8A54"], T: ["#66E2D8", "#0A7785"], B: ["#74BCFF", "#1B48CC"],
    I: ["#9AA1FF", "#3729B4"], P: ["#C894FF", "#6520BF"], K: ["#FF97C7", "#C91867"], N: ["#5567D8", "#11164A"], S: ["#FFCB6E", "#EC4777"], D: ["#5C5C68", "#0C0C0F"] };
  var BG_ST = {   /* 배지 id: [색, 그림, 효과, 모양, 높은 단계(1~4 — 높을수록 그라데이션이 깊고 은은한 빛이 돎)] · 효과(shine 빛 지나감·pulse 빛 숨쉬기·spin 빛 링·rays 햇살·twinkle 별·flame 일렁·float 둥실·beat 두근)] */
    att1: ["R", "check", "shine", "circle", 1], att10: ["O", "flag", "pulse", "hex", 1], att30: ["K", "stamp", "shine", "scallop", 2], att50: ["P", "medal", "pulse shine", "oct", 2], att100: ["Y", "trophy", "rays shine", "shield", 3], att200: ["D", "crown", "spin twinkle", "star", 4],
    stk3: ["O", "flame", "flame", "diamond", 1], stk7: ["R", "flame2", "flame pulse", "scallop", 2], stk14: ["Y", "bolt", "beat pulse", "star", 3], stk30: ["I", "rocket", "float spin", "shield", 4],
    dawn: ["S", "sun", "rays", "oct", 2], night: ["N", "moon", "twinkle float", "circle", 2], wkend: ["T", "calw", "shine", "diamond", 2], mon20: ["G", "calc", "pulse", "hex", 3], perf: ["P", "star", "spin twinkle", "star", 4], king: ["Y", "crownk", "rays twinkle spin", "shield", 4],
    log1: ["B", "pen", "shine", "circle", 1], logd10: ["T", "clip", "pulse", "diamond", 1], logd30: ["I", "book", "shine", "hex", 2], logd50: ["P", "bookmark", "pulse shine", "oct", 3], logd100: ["D", "shield", "spin twinkle", "shield", 4],
    chk100: ["G", "ccheck", "shine", "scallop", 1], chk300: ["T", "dcheck", "pulse", "circle", 2], chk500: ["B", "list", "shine pulse", "pent", 3], chk1000: ["R", "target", "spin", "star", 4],
    day5: ["O", "layers", "float", "hex", 1], day7: ["G", "mount", "shine", "pent", 2], var15: ["K", "grid", "pulse", "diamond", 2], var30: ["N", "compass", "twinkle shine", "oct", 3], body6: ["G", "body", "beat", "shield", 3], body8: ["Y", "ring8", "rays twinkle", "scallop", 4],
    lf1: ["T", "kettle", "shine", "circle", 1], lf3: ["B", "bell", "beat", "pent", 2], lf5: ["I", "barbell", "pulse shine", "hex", 3], lf10: ["D", "plate", "spin", "oct", 4],
    pc30: ["G", "trend", "shine", "diamond", 3], pc50: ["Y", "chev2", "float pulse", "star", 4], pw1: ["P", "up", "float", "shield", 2], pw4: ["K", "stairs", "shine pulse", "scallop", 3],
    fv3: ["B", "book", "shine", "circle", 1], fv5: ["B", "cap", "shine", "pent", 2], fv10: ["P", "award", "twinkle pulse", "oct", 3], ib1: ["T", "scale", "pulse", "hex", 1],
    ibl1: ["G", "trendd", "shine", "circle", 1], ibl2: ["T", "trendd", "pulse", "hex", 2], ibl3: ["B", "trendd", "shine pulse", "oct", 2], ibl4: ["I", "trendd", "shine", "shield", 3], ibl5: ["R", "trendd", "rays twinkle", "scallop", 4],   /* 감량 배지 그림은 전부 내려가는 그래프로 통일 (2026-11-19) */
    day30: ["G", "sprout", "float", "circle", 1], day100: ["K", "heart", "beat pulse", "scallop", 2], day200: ["T", "tree", "shine", "pent", 3], day365: ["D", "gem", "spin twinkle rays", "star", 4]
  };
  BG_IC.crownk = '<path d="M4 18L2.5 9l5 3.6L12 6l4.5 6.6 5-3.6L20 18z"/><path d="M4.5 21h15"/><circle cx="12" cy="3" r="1.3"/><path d="M12 11.6l.9 1.8 2 .3-1.45 1.4.35 2-1.8-.95-1.8.95.35-2-1.45-1.4 2-.3z"/>';
  BG_IC.camera = '<path d="M3.5 8h3.3L8.5 5.5h7L17.2 8h3.3v11.5h-17z"/><circle cx="12" cy="13.3" r="3.7"/><path d="M12 11.8l.5 1 1.1.2-.8.8.2 1.1-1-.5-1 .5.2-1.1-.8-.8 1.1-.2z"/>';
  var BG_LAU = '<g transform="translate(16 55) rotate(45)"><ellipse rx="3" ry="6.5"/></g><g transform="translate(7.5 42) rotate(20)"><ellipse rx="3" ry="6.5"/></g>' +
    '<g transform="translate(5.5 27) rotate(-5)"><ellipse rx="3" ry="6.5"/></g><g transform="translate(10 13) rotate(-30)"><ellipse rx="3" ry="6"/></g>' +
    '<g transform="translate(68 55) rotate(-45)"><ellipse rx="3" ry="6.5"/></g><g transform="translate(76.5 42) rotate(-20)"><ellipse rx="3" ry="6.5"/></g>' +
    '<g transform="translate(78.5 27) rotate(5)"><ellipse rx="3" ry="6.5"/></g><g transform="translate(74 13) rotate(30)"><ellipse rx="3" ry="6"/></g>';
  function bgMix(a, b, t) { var o = "#"; for (var i = 1; i < 7; i += 2) { var x = Math.round(parseInt(a.slice(i, i + 2), 16) * (1 - t) + parseInt(b.slice(i, i + 2), 16) * t); o += (x < 16 ? "0" : "") + x.toString(16); } return o; }
  var BG_SPK = 'M7 0 L8.4 5.6 L14 7 L8.4 8.4 L7 14 L5.6 8.4 L0 7 L5.6 5.6 Z';
  function bgRgb(h) { return parseInt(h.slice(1, 3), 16) + "," + parseInt(h.slice(3, 5), 16) + "," + parseInt(h.slice(5, 7), 16); }
  function md(k) { var p = k.split("-"); return (+p[1]) + ". " + pad2(+p[2]); }
  function ymOf(d) { return d.getFullYear() + "-" + pad2(d.getMonth() + 1); }
  function ymDate(ym) { var p = ym.split("-"); return new Date(+p[0], +p[1] - 1, 1); }
  function ymAdd(ym, n) { var d = ymDate(ym); return ymOf(new Date(d.getFullYear(), d.getMonth() + n, 1)); }

  function attHistory() {   /* 날마다 연속 출석 수를 따라감 → 연속 n회가 처음 된 날, 달마다 최고 연속 */
    var a = attLoad(), st = startDate(), today = ymd(new Date());
    var res = { first: {}, monthBest: {}, best: 0 };
    if (!a.length || !st) return res;
    var on = {}; a.forEach(function (k) { on[k] = 1; });
    var d = new Date(st.getFullYear(), st.getMonth(), st.getDate()), run = 0, gap = 0;
    for (var i = 0; i < 1500 && ymd(d) <= today; i++, d.setDate(d.getDate() + 1)) {
      var k = ymd(d);
      if (on[k]) {
        run++; gap = 0;
        if (!res.first[run]) res.first[run] = k;
        var mo = k.slice(0, 7);
        if (run > (res.monthBest[mo] || 0)) res.monthBest[mo] = run;
        if (run > res.best) res.best = run;
      } else if (k === today) { /* 오늘은 아직 안 끝남 */ }
      else if (ROT) { if (++gap > 2) run = 0; }
      else if (isWorkoutDay(d)) run = 0;
    }
    return res;
  }
  /* ---- 누적 기록·받은 날 (창고 mw:<주소>:bg) */
  var BGS_LS = "ptnote:" + SLUG + ":bgs", BGS = null, BGS_T = 0;
  try { BGS = JSON.parse(localStorage.getItem(BGS_LS) || "null"); } catch (e) {}
  /* 2026-11-17 장동욱 "내가 루틴 고치면 업적이 완료돼 — 구조적으로 바꾸자": 배지는 회원님이 한 일로만 받음
     · 증량·무게% = 회원님이 ✓한 무게(x[종목]=[처음 ✓ kg, 가장 무거운 ✓ kg])끼리 비교 — 루틴 무게를 올려도 회원님이 그 무게로 ✓해야 받음
     · '루틴 레벨업'·'복습지 개수'(선생님이 올리면 생기던 것) 없앰 → '완벽한 한 주'(출석)·'복습지 열어 보기'(회원님이 연 것)
     · 선생님 폰(COACH_MODE)에선 창고에 절대 안 올림 · 선생님 '배지 초기화' = 창고 rs(초기화 시각) → 회원 폰이 받으면 받은 배지를 비우고 다시 계산 */
  function bgsObj() {
    if (!BGS || typeof BGS !== "object") BGS = { on: {}, m: {}, x: {}, at: 0 };
    BGS.on = BGS.on || {}; BGS.m = BGS.m || {}; BGS.x = BGS.x || {};
    if (BGS.n) { BGS.n.forEach(function (k) { if (!BGS.x[k]) BGS.x[k] = [0, 0]; }); delete BGS.n; }
    return BGS;
  }
  function bgsSave(push) {
    var o = bgsObj(); o.at = Date.now();
    try { localStorage.setItem(BGS_LS, JSON.stringify(o)); } catch (e) {}
    if (!push || DEMO || !ATT_API || COACH_MODE) return;
    clearTimeout(BGS_T);
    BGS_T = setTimeout(function () { rtPost({ a: "kv_set", k: "mw:" + SLUG + ":bg", v: BGS }).catch(function () {}); }, 1500);
  }
  function bgServer(kv) {
    var v = kv && kv["mw:" + SLUG + ":bg"];
    if (!v || typeof v !== "object") { if (BGS && Object.keys(BGS.on || {}).length) bgsSave(true); return; }
    var o = bgsObj(), ch = false, more = false, k;
    if ((v.rs || 0) > (o.rs || 0)) { o.on = {}; o.rs = v.rs; ch = true; }   /* 선생님이 배지 초기화 */
    if (Array.isArray(v.show) && (v.sst || 0) > (o.sst || 0)) { o.show = v.show; o.sst = v.sst; ch = true; }   /* 배지 케이스 둘레 칸 (2026-11-20) */
    else if ((o.sst || 0) > (v.sst || 0)) more = true;
    else if ((o.rs || 0) > (v.rs || 0)) more = true;
    for (k in (v.on || {})) if (!o.on[k] || v.on[k] < o.on[k]) { o.on[k] = v.on[k]; ch = true; }
    for (k in o.on) if (!(v.on || {})[k]) more = true;
    for (k in (v.m || {})) {
      var a = v.m[k] || [0, 0], b = o.m[k] || [0, 0];
      if (a[0] > b[0] || a[1] > b[1]) { o.m[k] = [Math.max(a[0], b[0]), Math.max(a[1], b[1])]; ch = true; }
    }
    (v.n || []).forEach(function (x) { if (!o.x[x] && Object.keys(o.x).length < 60) { o.x[x] = [0, 0]; ch = true; } });
    for (k in (v.x || {})) {
      var p = v.x[k] || [0, 0], q = o.x[k];
      if (!q) { if (Object.keys(o.x).length < 60) { o.x[k] = p.slice(); ch = true; } continue; }
      if ((p[0] > 0 && (!q[0] || p[0] < q[0])) || p[1] > q[1]) { o.x[k] = [p[0] > 0 && (!q[0] || p[0] < q[0]) ? p[0] : q[0], Math.max(p[1], q[1])]; ch = true; }
    }
    if (ch || more) bgsSave(more);
  }
  function bgSync() {   /* 운동 기록(LG) → 달마다 [기록한 날, ✓ 수]·종목 이름을 누적 (큰 값 유지) */
    var o = bgsObj(), L = (LG && LG.d) || {}, mm = {}, ch = false;
    Object.keys(L).forEach(function (k) {
      var t = L[k] || []; if (!t.length) return;
      var ym = k.slice(0, 7); mm[ym] = mm[ym] || [0, 0]; mm[ym][0]++; mm[ym][1] += t.length;
      t.forEach(function (x) {   /* 종목 이름·회원님이 ✓한 무게 */
        var nm = x[0], kg = +x[1] || 0; if (!nm) return;
        var q = o.x[nm];
        if (!q) { if (Object.keys(o.x).length >= 60) return; q = o.x[nm] = [0, 0]; ch = true; }
        var f0 = LG && LG.f && +LG.f[nm] > 0 ? +LG.f[nm] : kg;
        if (kg > 0 && !q[0]) { q[0] = Math.min(f0 || kg, kg); ch = true; }
        if (kg > q[1]) { q[1] = kg; ch = true; }
      });
    });
    for (var ym in mm) { var b = o.m[ym] || [0, 0]; if (mm[ym][0] > b[0] || mm[ym][1] > b[1]) { o.m[ym] = [Math.max(mm[ym][0], b[0]), Math.max(mm[ym][1], b[1])]; ch = true; } }
    var tot = { days: 0, chk: 0, names: Object.keys(o.x).length };
    for (ym in o.m) { tot.days += o.m[ym][0]; tot.chk += o.m[ym][1]; }
    return { tot: tot, ch: ch };
  }


  function badgeList() {
    var a = attLoad().slice().sort(), hs = attHistory(), cur = attStreak(attLoad()), L = [], today = ymd(new Date());
    var S = bgSync(), o = bgsObj(), T = S.tot, LGd = (LG && LG.d) || {}, lgKeys = Object.keys(LGd).filter(function (k) { return LGd[k] && LGd[k].length; }).sort();
    function add(cat, id, label, ic, sm, on, have, goal, how, desc, x) {
      var b = { id: id, cat: cat, label: label, ic: ic, sm: sm, on: on, have: have, goal: goal, how: how, desc: desc };
      if (x) for (var k in x) b[k] = x[k];
      L.push(b);
    }
    function q(ok) { return ok ? "?" : null; }
    /* 출석 16 */
    [1, 10, 30, 50, 100, 200].forEach(function (n) {
      add("att", "att" + n, n === 1 ? "첫 출석" : "출석 " + n + "회", n === 1 ? "check" : null, null, a[n - 1] || null, a.length, n, "출석 " + n + "번이면 받아요",
        n === 1 ? "PT 노트 첫 출석 체크! 시작이 반이에요." : "출석 " + n + "번 달성! 꾸준함이 몸을 바꿔요.", n === 1 ? null : { big: n });
    });
    [3, 7, 14, 30].forEach(function (n) {
      add("att", "stk" + n, "연속 " + n + "회", "flame", n, hs.first[n] || null, cur, n, "운동하는 날 " + n + "번 연속으로 오면 받아요", "운동하는 날 " + n + "번 연속으로 한 번도 안 빠졌어요.");
    });
    var dawn = null, night = null, wk = null, m20 = null, mc20 = {}, m20have = 0;
    a.forEach(function (k) {
      if (!dawn && attTimes[k] && attTimes[k] < "07:00") dawn = k;
      if (!night && attTimes[k] && attTimes[k] >= "22:00") night = k;
      var p = k.split("-"), d = new Date(+p[0], +p[1] - 1, +p[2]);
      if (!wk && d.getDay() === 0) { var s = new Date(d); s.setDate(s.getDate() - 1); if (attHas(a, ymd(s))) wk = k; }
      var ym = k.slice(0, 7); mc20[ym] = (mc20[ym] || 0) + 1;
      if (mc20[ym] > m20have) m20have = mc20[ym];
      if (!m20 && mc20[ym] === 20) m20 = k;
    });
    add("att", "dawn", "새벽 운동", "sun", null, dawn, dawn ? 1 : 0, 0, "아침 7시 전에 출석하면 받아요", "아침 7시 전에 출석했어요. 하루를 먼저 이긴 사람!", { hint: "7시 전 출석" });
    add("att", "night", "심야 운동", "moon", null, night, night ? 1 : 0, 0, "밤 10시 넘어 출석하면 받아요", "밤 10시가 넘어도 운동하러 왔어요. 이 정도면 진심!", { hint: "밤 10시 이후" });
    add("att", "wkend", "주말 전사", "cal", null, wk, wk ? 1 : 0, 0, "토요일·일요일 둘 다 오면 받아요", "토·일 둘 다 나왔어요. 주말에도 멈추지 않아요!", { hint: "토·일 둘 다" });
    add("att", "mon20", "한 달 20회", "cal", 20, m20, m20have, 20, "한 달에 20번 출석하면 받아요", "한 달에 20번 출석! 헬스장이 집 같아졌어요.");
    var perf = null, st0 = startDate();   /* 개근: 다 끝난 달 중 운동하는 날을 하나도 안 빠진 달 */
    if (st0 && a.length) {
      var ym = ymOf(st0), nowYm = ymOf(new Date());
      for (var g = 0; g < 40 && ym < nowYm; g++, ym = ymAdd(ym, 1)) {
        var d0 = ymDate(ym), d1 = new Date(d0.getFullYear(), d0.getMonth() + 1, 0), r = attStats(a, d0, d1);
        if (r.plan >= 4 && r.done >= r.plan) { var inM = a.filter(function (k) { return k.slice(0, 7) === ym; }); perf = inM[inM.length - 1] || ymd(d1); break; }
      }
    }
    add("att", "perf", "한 달 개근", "star", null, perf, perf ? 1 : 0, 0, "한 달 동안 운동하는 날을 하나도 안 빠지면 받아요", "한 달 출석률 100%! 이건 진짜 아무나 못 해요.", { hint: "한 달 100%" });
    var kw = rkWins();   /* 이달의 출석왕: 받은 날 = 처음 1등 한 달의 다음 달 1일, 여러 번이면 그림 아래 숫자 */
    add("att", "king", "이달의 출석왕", "crownk", kw.length > 1 ? kw.length : null, kw.length ? ymAdd(kw[0], 1) + "-01" : null, kw.length, 0, "한 달 동안 출석 순위 1등이면 받아요",
      kw.length ? kw.map(function (m) { return (+m.slice(5)) + "월"; }).join("·") + " 출석 순위 1등! 모두를 이긴 이달의 출석왕이에요." : "한 달 동안 출석 순위 1등! 모두를 이긴 이달의 출석왕이에요.", { hint: "한 달 출석 1등" });

    /* 기록 12 */
    function lgNth(n) { return lgKeys[n - 1] || q(T.days >= n); }
    function chkNth(n) { var c = 0; for (var i = 0; i < lgKeys.length; i++) { c += LGd[lgKeys[i]].length; if (c >= n) return lgKeys[i]; } return q(T.chk >= n); }
    function dayN(n) { var f = null; lgKeys.some(function (k) { if (LGd[k].length >= n) { f = k; return true; } return false; }); return f; }
    var dayMax = lgKeys.reduce(function (m, k) { return Math.max(m, LGd[k].length); }, 0);
    add("log", "log1", "첫 운동 기록", "pen", null, lgNth(1), T.days, 1, "운동 탭에서 끝낸 종목에 ✓하면 받아요", "첫 종목 ✓! 기록하는 사람이 결국 바뀌어요.");
    [[10, "운동 기록 10일째. 이제 습관이 되어가요!"], [30, "기록 30일! 한 달 치 운동이 다 남아 있어요."], [50, "기록 50일! 운동 일지가 두툼해졌어요."], [100, "기록 100일. 이 정도면 운동이 생활이에요."]].forEach(function (v) {
      add("log", "logd" + v[0], "기록 " + v[0] + "일", "pen", v[0], lgNth(v[0]), T.days, v[0], "✓한 날이 " + v[0] + "일이면 받아요", v[1]);
    });
    [[100, "종목 ✓ 100번! 벌써 이만큼 해냈어요."], [300, "종목 ✓ 300번! 쌓인 세트만큼 몸이 달라졌어요."], [500, "종목 ✓ 500번! 꾸준함이 숫자로 보여요."], [1000, "종목 ✓ 1000번. 말이 필요 없어요, 존경합니다."]].forEach(function (v) {
      add("log", "chk" + v[0], "종목 ✓ " + v[0], "list", v[0], chkNth(v[0]), T.chk, v[0], "종목 ✓를 모두 합쳐 " + v[0] + "번 하면 받아요", v[1]);
    });
    add("log", "day5", "하루 5종목", "layers", 5, dayN(5), dayMax, 5, "하루에 종목 5개를 ✓하면 받아요", "하루에 5종목 완주! 오늘 운동 제대로 했어요.");
    add("log", "day7", "하루 7종목", "layers", 7, dayN(7), dayMax, 7, "하루에 종목 7개를 ✓하면 받아요", "하루에 7종목! 오늘은 불태웠어요.");
    add("log", "var15", "종목 15가지", "grid", 15, q(T.names >= 15), T.names, 15, "서로 다른 종목 15가지를 ✓하면 받아요", "15가지 종목을 해봤어요. 몸 구석구석 다 써봤어요!");
    add("log", "var30", "종목 30가지", "grid", 30, q(T.names >= 30), T.names, 30, "서로 다른 종목 30가지를 ✓하면 받아요", "30가지 종목! 헬스장 기구는 거의 다 내 거예요.");
    var full = null, fullHave = 0;
    if (st0) {
      for (var ym2 = ymOf(st0), g2 = 0; g2 < 40 && ym2 <= ymOf(new Date()); g2++, ym2 = ymAdd(ym2, 1)) {
        var mc = muscleCounts(ym2).cnt, n6 = MG.filter(function (x) { return mc[x[0]] > 0; }).length;
        if (n6 > fullHave) fullHave = n6;
        if (n6 >= 6 && !full) full = ym2 === ymOf(new Date()) ? today : ymd(new Date(ymDate(ym2).getFullYear(), ymDate(ym2).getMonth() + 1, 0));
      }
    }
    add("log", "body6", "전신 정복", "body", null, full, fullHave, 6, "한 달 근육 지도에 부위 6곳 이상 불이 들어오면 받아요", "한 달에 6부위 이상! 근육 지도가 꽉 찼어요.");
    add("log", "body8", "올 클리어", "body", 8, q(fullHave >= 8), fullHave, 8, "한 달 근육 지도 8부위에 전부 불이 들어오면 받아요", "8부위 전부! 빠진 곳 없이 온몸을 다 썼어요.");

    /* 성장 12 */
    var up = 0, best = 0;   /* 회원님이 ✓한 무게끼리: 처음 ✓ kg → 가장 무거운 ✓ kg */
    Object.keys(o.x).forEach(function (k) { var p = o.x[k]; if (p[0] > 0 && p[1] > p[0]) { up++; best = Math.max(best, (p[1] - p[0]) / p[0]); } });
    add("grow", "lf1", "첫 증량", "bell", null, q(up >= 1), up, 1, "처음 ✓한 무게보다 무겁게 ✓한 종목이 생기면 받아요", "처음보다 무거운 무게를 들었어요. 몸이 답하기 시작했어요!");
    add("grow", "lf3", "증량 3종목", "bell", 3, q(up >= 3), up, 3, "처음보다 무겁게 ✓한 종목이 3개면 받아요", "3종목 증량! 힘이 붙는 게 느껴지죠?");
    add("grow", "lf5", "증량 5종목", "bell", 5, q(up >= 5), up, 5, "처음보다 무겁게 ✓한 종목이 5개면 받아요", "5종목이나 무게가 올랐어요. 전체적으로 힘이 붙었어요.");
    add("grow", "lf10", "증량 10종목", "bell", 10, q(up >= 10), up, 10, "처음보다 무겁게 ✓한 종목이 10개면 받아요", "10종목 증량! 온몸이 강해졌어요.");
    var bp = Math.round(best * 100);
    add("grow", "pc30", "무게 +30%", "trend", "30%", q(best >= 0.3), bp, 30, "한 종목이라도 처음 ✓한 무게보다 30% 무겁게 ✓하면 받아요", "처음보다 30% 무거워진 종목이 생겼어요. 완전 다른 사람!", { unit: "%" });
    add("grow", "pc50", "무게 +50%", "trend", "50%", q(best >= 0.5), bp, 50, "한 종목이라도 처음 ✓한 무게보다 50% 무겁게 ✓하면 받아요", "처음의 1.5배를 들어요. 이건 진짜 성장이에요!", { unit: "%" });
    var pw = [], pwN = 0;   /* 완벽한 한 주: 다 끝난 주(월~일) 중 운동하는 날을 다 출석한 주 */
    if (st0 && a.length) {
      var w0 = new Date(st0); w0.setDate(w0.getDate() - ((w0.getDay() + 6) % 7));
      var nowD = new Date(), wNow = new Date(nowD.getFullYear(), nowD.getMonth(), nowD.getDate()); wNow.setDate(wNow.getDate() - ((wNow.getDay() + 6) % 7));
      for (var g3 = 0; g3 < 120 && w0 < wNow; g3++) {
        var w1 = new Date(w0); w1.setDate(w1.getDate() + 6);
        var rw = attStats(a, w0, w1);
        if (rw.plan >= 2 && rw.done >= rw.plan) { pwN++; var inW = a.filter(function (k) { return k >= ymd(w0) && k <= ymd(w1); }); pw.push(inW[inW.length - 1] || ymd(w1)); }
        w0.setDate(w0.getDate() + 7);
      }
    }
    add("grow", "pw1", "완벽한 한 주", "up", null, pw[0] || null, pwN, 1, "한 주 동안 운동하는 날을 하나도 안 빠지면 받아요", "이번 주 계획을 100% 지켰어요. 이게 쌓이면 몸이 바뀌어요!");
    add("grow", "pw4", "완벽한 4주", "up", 4, pw[3] || null, pwN, 4, "운동하는 날을 다 지킨 주가 4번 쌓이면 받아요", "완벽한 주가 4번! 한 달을 꽉 채운 셈이에요.");
    var fids = (M.forms || []).map(function (f) { return f.id; }), fo = lsArr(FOPEN_KEY).filter(function (id) { return fids.indexOf(id) >= 0; }).length;
    if (!COACH_MODE) o.fo = Math.max(o.fo || 0, fo); fo = Math.max(fo, COACH_MODE ? 0 : (o.fo || 0));
    add("grow", "fv5", "자세 공부 5개", "book", 5, q(fo >= 5), fo, 5, "자세 복습지를 5개 열어 보면 받아요", "복습지 5개를 직접 봤어요. 배운 동작이 내 것이 되고 있어요.");
    add("grow", "fv10", "자세 공부 10개", "book", 10, q(fo >= 10), fo, 10, "자세 복습지를 10개 열어 보면 받아요", "복습지 10개! 이제 웬만한 동작은 다 알아요.");
    add("grow", "fv3", "자세 공부 3개", "book", 3, q(fo >= 3), fo, 3, "자세 복습지를 3개 열어 보면 받아요", "복습지 3개를 직접 봤어요. 차근차근 배워 가고 있어요.");
    if (IB_ON) {   /* 몸 변화 탭 (2026-11-19 장동욱 "인바디 전달·이번 달 비교해서 2키로 빠지면 2키로 감량 배지")
                      감량 n kg = 인바디 기록을 바로 앞 기록(지난번 측정)과 비교해 체중이 n kg 이상 빠진 적이 있으면 — 그 측정한 날이 받은 날 */
      /* 2026-11-20 장동욱 "찬영님 인바디 처음 올렸는데 업적 다 완료" — 잘못 읽힌 기록 하나로 감량 배지가 한꺼번에 받아지던 것 막기:
         ① 숫자가 서로 안 맞는 기록(체지방량 ≠ 체중×체지방률, 골격근 ≥ 체중)은 감량 계산에서 뺌 ② 같은 날 여러 번 올리면 마지막 것만
         ③ 바로 앞 기록과 날짜에 비해 너무 차이 나면(3kg + 하루 0.2kg 넘게) 앞 기록을 잘못 읽은 것으로 보고 뺌 ④ 아래 L.forEach에서 몸 변화 배지는 저장된 걸로 붙잡지 않고 지금 기록으로 다시 계산 */
      var ibr0 = (ibData || []).filter(function (r) {
        if (!r || !r.d || !(+r.w > 0)) return false;
        var w = +r.w, pf = +r.pbf, bf = +r.bfm, sm = +r.smm;
        if (sm && sm >= w * 0.7) return false;
        if (pf > 0 && bf > 0 && Math.abs(w * pf / 100 - bf) > Math.max(2, bf * 0.2)) return false;
        return true;
      }).sort(function (x, y) { return x.d < y.d ? -1 : x.d > y.d ? 1 : 0; });
      var ibr = [];
      ibr0.forEach(function (r) {
        var pv = ibr[ibr.length - 1];
        if (pv && pv.d === r.d) { ibr[ibr.length - 1] = r; return; }
        if (pv) { var gap = (new Date(r.d) - new Date(pv.d)) / 86400000; if (Math.abs(+pv.w - +r.w) > 3 + gap * 0.2) { ibr[ibr.length - 1] = r; return; } }   /* 날짜에 비해 말이 안 되게 차이 나면(30일에 9kg 넘게) 앞 기록을 잘못 읽은 걸로 보고 새 기록으로 바꿈 */
        ibr.push(r);
      });
      add("body", "ib1", "첫 인바디", "scale", null, ibr.length ? ibr[0].d : ((ibData || []).map(function (r) { return r.d; }).sort()[0] || null), (ibData || []).length, 1, "기록 탭에서 인바디를 올리면 받아요", "첫 인바디 기록 완료! 이제 변화를 숫자로 봐요.");
      var lossMax = 0, lossOn = {};
      for (var li = 1; li < ibr.length; li++) {
        var dr = Math.round((+ibr[li - 1].w - +ibr[li].w) * 10) / 10;
        if (dr > lossMax) lossMax = dr;
        for (var ln = 1; ln <= 5; ln++) if (dr >= ln && !lossOn[ln]) lossOn[ln] = ibr[li].d;
      }
      [[1, "지난 측정보다 1kg 빠졌어요. 변화가 숫자로 보이기 시작했어요!"], [2, "한 번에 2kg 감량! 식단과 운동이 제대로 맞물렸어요."], [3, "3kg이나 빠졌어요. 옷 입을 때부터 느껴지죠?"],
       [4, "4kg 감량! 이 정도면 주변에서 먼저 알아봐요."], [5, "지난 측정보다 5kg 감량. 정말 대단한 한 달이에요!"]].forEach(function (v) {
        add("body", "ibl" + v[0], v[0] + "kg 감량", "down", null, lossOn[v[0]] || null, Math.max(0, lossMax), v[0], "인바디를 지난 측정과 비교해 체중이 " + v[0] + "kg 빠지면 받아요", v[1], { unit: "kg", hint: "지난번보다 -1kg", art: "loss", artn: v[0] });
      });
      /* 최고급 누적 감량 10·15·20kg (2026-11-19 "10~20키로 감량 배지도, 최고급 배지처럼") — 첫 인바디 체중보다 n kg 이상 빠진 기록이 생긴 날
         sp(바프 완료처럼 금 월계수·금선) + 단계마다 다른 보석 색: 10kg 금 · 15kg 루비 · 20kg 블랙 다이아 */
      var cumMax = 0, cumOn = {};
      for (var lj = 1; lj < ibr.length; lj++) {
        var dc = Math.round((+ibr[0].w - +ibr[lj].w) * 10) / 10;
        if (dc > cumMax) cumMax = dc;
        [10, 15, 20].forEach(function (n) { if (dc >= n && !cumOn[n]) cumOn[n] = ibr[lj].d; });
      }
      [[10, "trendd", "circle", "SPG", "#F3C94F", "#FFF3D6", "첫 인바디보다 10kg 감량! 완전히 다른 몸이 됐어요. 아무나 못 받는 배지예요."],
       [15, "trendd", "shield", "SPR", "#FF4D66", "#FFF3D6", "15kg 감량. 몸도 생활도 다 바꿔 낸 사람만 받는 루비 배지예요."],
       [20, "trendd", "oct", "SPD", "#7FDFFF", "#FFF3D6", "20kg 감량, 전설 달성. 이 배지를 가진 사람은 정말 드물어요."]].forEach(function (v) {
        add("body", "iblc" + v[0], v[0] + "kg 감량", v[1], null, cumOn[v[0]] || null, Math.max(0, cumMax), v[0],
          "첫 인바디보다 체중이 모두 합쳐 " + v[0] + "kg 빠지면 받아요", v[6],
          { unit: "kg", art: "loss", artn: v[0], sp: true, sh: v[2], lv: 4, enk: v[3], spc: v[4], ink: v[5], col: [v[4], v[4]], fx: v[0] === 20 ? "rays spin twinkle shine pulse" : v[0] === 15 ? "rays spin twinkle shine" : "rays twinkle shine" });
      });
    }
    /* 2026-11-20 배지 점검: '함께 n일'은 PT 시작일(journey.start)부터 — startDate()는 출석 기록 시작(ATT_SINCE)으로 잘려서 3월에 시작한 회원도 11월부터 세던 것 고침 */
    var pt0 = null; if (M.journey && /^\d{4}-\d{2}-\d{2}$/.test(M.journey.start || "")) { var pj = M.journey.start.split("-"); pt0 = new Date(+pj[0], +pj[1] - 1, +pj[2]); }
    if (pt0) st0 = pt0;
    var days = st0 ? Math.floor((new Date(new Date().getFullYear(), new Date().getMonth(), new Date().getDate()) - st0) / 86400000) + 1 : 0;
    function dayOn(n) { if (!st0 || days < n) return null; var d = new Date(st0); d.setDate(d.getDate() + n - 1); return ymd(d); }
    add("grow", "day30", "함께 30일", "heart", 30, dayOn(30), Math.max(0, days), 30, "PT 시작하고 30일이 되면 받아요", "첫 한 달 완주! 제일 어려운 구간을 넘었어요.", { unit: "일" });
    add("grow", "day100", "함께 100일", "heart", 100, dayOn(100), Math.max(0, days), 100, "PT 시작하고 100일이 되면 받아요", "선생님과 함께한 지 100일! 여기까지 온 것만으로 대단해요.", { unit: "일" });
    var bpB = bpBadge();
    if (!bpB) add("grow", "day200", "함께 200일", "heart", 200, dayOn(200), Math.max(0, days), 200, "PT 시작하고 200일이 되면 받아요", "200일째 함께하고 있어요. 운동이 일상이 됐어요.", { unit: "일" });
    add("grow", "day365", "함께 1년", "heart", 365, dayOn(365), Math.max(0, days), 365, "PT 시작하고 1년이 되면 받아요", "1년 완주. 처음의 나와는 완전히 다른 사람이에요!", { unit: "일" });

    if (bpB) L.push(bpB);
    var ids = {}; L.forEach(function (b) { ids[b.id] = 1; });
    for (var ok in o.on) if (!ids[ok] && ok !== "bpdone") { delete o.on[ok]; S.ch = true; }   /* 없어진 배지(루틴 레벨업 등) 기록 지우기 */
    /* 바프 회원은 '함께 200일' 자리에 전설 배지 '바프 완료' (성장 칸 맨 끝) */
    /* 받은 날 정리: 기록된 날짜가 있으면 그게 우선(먼저 받은 날), 날짜를 모르면("?") 오늘 · 한 번 받은 건 계속 받은 상태 */
    var ch = S.ch;
    L.forEach(function (b) {
      var stl = BG_ST[b.id] || ["D", "star", "shine"];
      if (!b.sp) b.col = BG_PAL[stl[0]]; if (!b.sp) { b.ic = stl[1]; b.fx = stl[2]; b.sh = stl[3] || "circle"; b.lv = stl[4] || 1; }
      if (b.big) { b.sm = b.big; b.big = null; }
      var saved = o.on[b.id];
      if (b.cat === "body" && ibReady === true && !b.on && saved) { delete o.on[b.id]; saved = null; ch = true; try { localStorage.setItem(BG_SEEN, JSON.stringify(lsArr(BG_SEEN).filter(function (x) { return x !== b.id; }))); } catch (e9) {} }   /* 몸 변화(감량) 배지는 지금 인바디 기록으로만 — 잘못 받은 건 회수 (2026-11-20) */
      if (b.on === "?") b.on = saved || today;
      if (!b.on && saved) b.on = saved;
      if (b.on && b.on > today) b.on = today;
      if (b.on && (!saved || b.on < saved)) { o.on[b.id] = b.on; ch = true; }
      if (b.on && saved && saved < b.on) b.on = saved;
      if (b.on && b.goal) b.have = Math.max(b.have || 0, b.goal);
    });
    if (ch) bgsSave(!COACH_MODE);
    return L;
  }

  /* ---- 메달 그림: 금테 + 검정 에나멜 + 금색 그림 (전부 같은 디자인) */
  var bgUid = 0;
  /* 2026-11-17 4차 "3D 효과, 배지 모양도 다르게": 모양 8가지(원·육각·팔각·오각·마름모·방패·별·꽃 도장) + 두께(옆면)·빗면·광택 + 좌우로 살짝 도는 3D */
  function bgPts(n, r, rot, cy, r2) {
    var p = [], m = r2 ? n * 2 : n;
    for (var i = 0; i < m; i++) { var rr = r2 && i % 2 ? r2 : r, q = (rot + i * 360 / m) * Math.PI / 180; p.push((42 + rr * Math.cos(q)).toFixed(1) + "," + (cy + rr * Math.sin(q)).toFixed(1)); }
    return p.join(" ");
  }
  function bgSh(sh, r, cy, paint, extra) {   /* 모양 하나 그리기 (r = 원 기준 반지름) */
    var at = ' fill="' + paint + '"' + (extra || ""), rj = ' stroke="' + paint + '" stroke-width="2.4" stroke-linejoin="round"';
    if (paint === "none") rj = "";
    if (sh === "hex") return '<polygon points="' + bgPts(6, r * 1.02, -90, cy) + '"' + at + rj + '/>';
    if (sh === "oct") return '<polygon points="' + bgPts(8, r * 1.01, 22.5, cy) + '"' + at + rj + '/>';
    if (sh === "pent") return '<polygon points="' + bgPts(5, r * 1.04, -90, cy + r * 0.05) + '"' + at + rj + '/>';
    if (sh === "diamond") return '<polygon points="' + bgPts(4, r * 1.1, -90, cy) + '"' + at + rj + '/>';
    if (sh === "star") return '<polygon points="' + bgPts(8, r * 1.07, -90, cy, r * 0.87) + '"' + at + rj + '/>';
    if (sh === "scallop") { var p = []; for (var i = 0; i < 72; i++) { var q = i * Math.PI / 36, rr = r * (1.0 + 0.06 * Math.cos(10 * q)); p.push((42 + rr * Math.cos(q)).toFixed(1) + "," + (cy + rr * Math.sin(q)).toFixed(1)); }
      return '<polygon points="' + p.join(" ") + '"' + at + '/>'; }
    if (sh === "shield") { var x = function (k) { return (42 + k * r).toFixed(1); }, y = function (k) { return (cy + k * r).toFixed(1); };
      return '<path d="M' + x(0) + ' ' + y(-1.02) + 'L' + x(.92) + ' ' + y(-.74) + 'V' + y(.08) + 'C' + x(.92) + ' ' + y(.6) + ' ' + x(.45) + ' ' + y(.88) + ' ' + x(0) + ' ' + y(1.06) +
        'C' + x(-.45) + ' ' + y(.88) + ' ' + x(-.92) + ' ' + y(.6) + ' ' + x(-.92) + ' ' + y(.08) + 'V' + y(-.74) + 'Z"' + at + rj + '/>'; }
    return '<circle cx="42" cy="' + cy + '" r="' + r + '"' + at + '/>';
  }
  /* 2026-11-17 7차 장동욱 "에나멜 핀 느낌으로 리메이크": 금색 가는 선(금선)으로 나눈 칸마다 쨍한 단색을 채운 칠보·에나멜 핀 스타일
     · 색 3가지(BG_EN: 바탕·둘째·셋째) + 무늬 6가지(배지 id로 고름) · 높은 단계일수록 칸이 많아짐 · 그림은 금선 테두리 + 크림색 선 */
  var BG_EN = { R: ["#E8263C", "#FF8FA3", "#FFD53D"], O: ["#FF8A1F", "#FFD53D", "#E8263C"], Y: ["#FFD53D", "#FF8A1F", "#17245C"], G: ["#1FA85A", "#C8F03C", "#2EC8F0"],
    T: ["#14B8A6", "#C8F03C", "#17245C"], B: ["#2E7BF0", "#2EC8F0", "#C8F03C"], I: ["#3B2FC9", "#2EC8F0", "#FF3D7F"], P: ["#6A2BD9", "#FF3D7F", "#FFD53D"],
    K: ["#FF3D7F", "#FFB3D1", "#6A2BD9"], N: ["#17245C", "#2E7BF0", "#FFD53D"], S: ["#FF8A1F", "#FF3D7F", "#FFD53D"], D: ["#17171C", "#E8263C", "#FFD53D"], SP: ["#F6CF58", "#17171C", "#FFF3B0"],
    SPG: ["#17245C", "#F6CF58", "#FF8A1F"], SPR: ["#7A0A1E", "#E8263C", "#FF8FA3"], SPD: ["#101016", "#3B2FC9", "#7FDFFF"] };   /* 최고급 감량 배지(2026-11-19): SPR 루비+금, SPD 블랙 다이아+금 */
  var BG_OFF = ["#F4F2F2", "#E9E5E5", "#DEDADA"];
  function bgFields(pat, n, c, CY, R, wire) {   /* 금선으로 나눈 색 칸들 (배지 모양으로 잘라서 씀) */
    var W = ' stroke="' + wire + '" stroke-width="1.3"', X = 42, o = "";
    function ci(dx, dy, r, f) { return '<circle cx="' + (X + dx * R).toFixed(1) + '" cy="' + (CY + dy * R).toFixed(1) + '" r="' + (r * R).toFixed(1) + '" fill="' + f + '"' + W + '/>'; }
    function po(pts, f) { return '<polygon points="' + pts.map(function (q) { return (X + q[0] * R).toFixed(1) + "," + (CY + q[1] * R).toFixed(1); }).join(" ") + '" fill="' + f + '"' + W + '/>'; }
    if (pat === 0) { o += ci(0, 0, .68, c[1]); if (n >= 2) o += ci(0, 0, .4, c[2]); }
    else if (pat === 1) { o += po([[-1.4, 1.1], [1.1, -1.4], [1.5, 1.5]], c[1]); if (n >= 2) o += po([[-.5, 1.5], [1.5, -.5], [1.5, 1.5]], c[2]); if (n >= 3) o += po([[-1.5, -.45], [-.45, -1.5], [-1.5, -1.5]], c[2]); }
    else if (pat === 2) { o += ci(-.5, 1.15, .95, c[1]); if (n >= 2) o += ci(.7, 1.25, .85, c[2]); if (n >= 3) o += ci(.5, -.52, .2, c[2]); }
    else if (pat === 3) { o += ci(-.95, 0, .95, c[1]); if (n >= 2) o += ci(1, .2, .82, c[2]); }
    else if (pat === 4) { o += po([[-1.5, .28], [1.5, .28], [1.5, 1.5], [-1.5, 1.5]], c[1]); if (n >= 2) o += po([[-1.5, .66], [1.5, .66], [1.5, 1.5], [-1.5, 1.5]], c[2]); if (n >= 3) o += po([[-1.5, -1.5], [1.5, -1.5], [1.5, -.66], [-1.5, -.66]], c[2]); }
    else { o += ci(0, -.8, .72, c[1]); if (n >= 2) o += ci(-.75, .62, .62, c[2]); if (n >= 3) o += ci(.75, .62, .62, c[1]); }
    return o;
  }
  function bgIcon(b) {   /* 84×72 에나멜 핀 */
    var on = !!b.on, u = "bx" + (++bgUid), sh = b.sh || "circle", lv = b.lv || 1, sp = !!b.sp, fx = on ? " " + (b.fx || "") + " " : " ", CY = 30;
    function has(k) { return fx.indexOf(" " + k + " ") >= 0; }
    var key = "D"; if (!sp && b.col) for (var k in BG_PAL) if (BG_PAL[k] === b.col) key = k;
    var c = on ? (sp ? (BG_EN[b.enk] || BG_EN.SP) : BG_EN[key]) : BG_OFF, hsh = 0; for (var i = 0; i < b.id.length; i++) hsh = (hsh * 31 + b.id.charCodeAt(i)) % 997;
    var R = sh === "circle" || sh === "scallop" ? 29 : 27.6, RI = R * 0.925, wire = on ? "url(#" + u + "w)" : "#CBC6C6";
    var s = '<svg class="bdg-s" viewBox="0 0 84 72" width="84" height="72" aria-hidden="true"><defs>' +
      '<linearGradient id="' + u + 'w" x1=".1" y1="0" x2=".9" y2="1"><stop offset="0" stop-color="#FFF6C8"/><stop offset=".35" stop-color="#EFC452"/><stop offset=".6" stop-color="#B8860B"/><stop offset=".8" stop-color="#F7D774"/><stop offset="1" stop-color="#8A5A00"/></linearGradient>' +
      '<linearGradient id="' + u + 'g" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#fff" stop-opacity=".42"/><stop offset="1" stop-color="#fff" stop-opacity="0"/></linearGradient>' +
      (on && lv >= 3 ? '<linearGradient id="' + u + 'o" gradientUnits="userSpaceOnUse" x1="18" y1="6" x2="66" y2="54"><stop offset="0" stop-color="#fff" stop-opacity=".5"/><stop offset=".36" stop-color="#fff" stop-opacity="0"/>' +
        '<stop offset=".64" stop-color="#fff" stop-opacity="0"/><stop offset="1" stop-color="#fff" stop-opacity=".4"/>' +
        '<animateTransform attributeName="gradientTransform" type="rotate" from="0 42 30" to="360 42 30" dur="' + (lv === 4 ? 7 : 10) + 's" repeatCount="indefinite"/></linearGradient>' : '') +
      '<clipPath id="' + u + 'c">' + bgSh(sh, RI, CY, "#000") + '</clipPath></defs>';
    if (on) {
      if (has("rays")) s += bgRaysFine(u, sp ? (b.spc || "#F3C94F") : c[1], CY);
      else if (has("rays")) s += '<polygon class="bdx-rays" points="' + bgPts(14, 38, 0, CY, 30.5) + '" fill="' + (sp ? (b.spc || "#F3C94F") : c[1]) + '" opacity=".9"/>';
      if (sp) s += bgWreath(wire, CY);
      else if (sp) s += '<g fill="' + wire + '" transform="translate(0 -2)">' + BG_LAU + '</g>';
      s += '<ellipse cx="42" cy="66.5" rx="19" ry="2.8" fill="#000" opacity="' + (sp ? .3 : .16) + '"/>' +
        '<g transform="translate(0 3)">' + bgSh(sh, R, CY, "#7A4E00") + '</g>';
    } else s += '<g transform="translate(0 2.6)">' + bgSh(sh, R, CY, "#D2CCCC") + '</g>';
    s += bgSh(sh, R, CY, on ? wire : "#DAD5D5") + bgSh(sh, RI, CY, c[0]) +
      '<g clip-path="url(#' + u + 'c)">' + (b.art === "loss" ? bgLoss(b, c, wire, on, sp) : bgFields(hsh % 6, Math.min(3, lv), c, CY, R, wire)) +
      (on ? '<ellipse cx="34" cy="' + (CY - 21) + '" rx="30" ry="17" fill="url(#' + u + 'g)"/>' : '') + '</g>' +
      (lv >= 3 ? bgSh(sh, RI * 0.9, CY, "none", ' stroke="' + wire + '" stroke-width="1.1" stroke-linejoin="round"') : '') +
      (on && lv >= 3 ? bgSh(sh, RI, CY, "url(#" + u + "o)", ' opacity="' + (lv === 4 ? .8 : .5) + '"') : '');
    var sc = sh === "circle" || sh === "scallop" ? 1.2 : 1.08, cy = CY + (b.sm != null ? -2 : 0) + (sh === "shield" ? -1.5 : sh === "pent" ? 1 : 0), ik = has("flame") ? " bdx-flame" : has("float") ? " bdx-float" : has("beat") ? " bdx-beat" : "";
    var IC = BG_IC[b.ic] || BG_IC.star, ink = !on ? "#F7F5F5" : sp ? (b.ink || "#17171C") : key === "Y" ? "#17171C" : "#FFF8E7";
    if (b.art !== "loss") s += '<g transform="translate(' + (42 - 12 * sc).toFixed(2) + ' ' + (cy - 12 * sc).toFixed(2) + ') scale(' + sc + ')"><g class="bdx-i' + ik + '" stroke-linecap="round" stroke-linejoin="round">' +
      '<g fill="none" stroke="' + (on ? wire : "#C4BEBE") + '" stroke-width="4.3">' + IC + '</g>' +
      '<g fill="' + ink + '" fill-opacity="' + (on ? .5 : .6) + '" stroke="' + ink + '" stroke-width="2.1">' + IC + '</g></g></g>';
    if (has("shine")) s += '<g clip-path="url(#' + u + 'c)"><g transform="rotate(22 42 32)"><rect class="bdx-sh" x="-16" y="-20" width="11" height="110" fill="#fff" opacity=".5"/></g></g>';
    if (has("twinkle")) s += '<g transform="translate(63 -1) scale(.95)"><path class="bdg-spark" d="' + BG_SPK + '" fill="#FFE48A"/></g><g transform="translate(6 40) scale(.6)"><path class="bdg-spark s2" d="' + BG_SPK + '" fill="#fff"/></g>' +
      '<g transform="translate(14 2) scale(.45)"><path class="bdg-spark s3" d="' + BG_SPK + '" fill="#FFE48A"/></g>';
    s += '</svg>';
    var sm = b.sm != null ? '<span class="bdg-m' + (on ? '' : ' off') + '">' + b.sm + '</span>' : '';
    var ex = (has("pulse") ? '<span class="bdx-glow" aria-hidden="true"></span>' : '') + (has("spin") ? '<span class="bdx-ring" aria-hidden="true"></span>' : '');
    return '<span class="bdg bx' + ' bxl' + (on ? ' on' : '') + '" style="--bgc:' + bgRgb(on ? (sp ? (b.spc || "#F3C94F") : c[key === "D" || key === "N" ? 1 : 0]) : "#BBBBBB") + '">' + ex + s + sm + '</span>';
  }
  /* 감량 배지 그림 (2026-11-19 장동욱이 보내 준 에나멜 핀 참고 사진 느낌 — 작은 아이콘 대신 배지 가득 금선 그림):
     금선으로 나눈 내리막 언덕 두 칸 + 언덕을 따라 내려가는 굵은 금 화살표 + 금선 큰 숫자(kg). 명찰(bdg-m)은 안 씀 */
  function bgLoss(b, c, wire, on, sp) {
    var W = ' stroke="' + wire + '" stroke-width="1.5" stroke-linejoin="round"', n = String(b.artn), two = n.length > 1;
    var ink = !on ? "#F7F5F5" : sp ? (b.ink || "#FFF3D6") : "#FFF8E7";
    return '<path d="M8 15C24 15 30 31 44 36S66 42 78 43V70H8Z" fill="' + c[1] + '"' + W + '/>' +
      '<path d="M8 35C22 35 30 47 46 50S68 53 78 53V70H8Z" fill="' + c[2] + '"' + W + '/>' +
      '<text x="' + (two ? 53 : 55) + '" y="29" text-anchor="middle" font-family="Oswald, sans-serif" font-weight="700" font-size="' + (two ? 21 : 25) + '"' + (two ? ' letter-spacing="-.6"' : '') +
        ' fill="' + ink + '" stroke="' + wire + '" stroke-width="1.5" paint-order="stroke" stroke-linejoin="round">' + n + '</text>' +
      '<g class="bdx-i" fill="none" stroke-linecap="round" stroke-linejoin="round">' +
      '<g stroke="' + wire + '" stroke-width="5"><path d="M17 23C28 24 32 37 44 42L57 46"/><path d="M49.5 49.5L58.5 46.5L55 38"/></g>' +
      '<g stroke="' + ink + '" stroke-width="2"><path d="M17 23C28 24 32 37 44 42L57 46"/><path d="M49.5 49.5L58.5 46.5L55 38"/></g></g>';
  }
  /* 감량 배지 주변 효과 다듬기 (2026-11-19 "주변 효과들 좀 더 다듬을 수 없나"): 뾰족한 색 톱니 → 가늘고 길이가 번갈아 나오는 빛살(바깥으로 옅어짐),
     뭉툭한 잎 → 줄기가 있는 가는 월계관. 빛 번짐·빛 링은 style.css .bxl */
  function bgRaysFine(u, col, CY) {
    var o = '<defs><radialGradient id="' + u + 'r" gradientUnits="userSpaceOnUse" cx="42" cy="' + CY + '" r="41"><stop offset=".62" stop-color="' + col + '" stop-opacity=".95"/><stop offset=".82" stop-color="' + col + '" stop-opacity=".45"/>' +
      '<stop offset="1" stop-color="' + col + '" stop-opacity="0"/></radialGradient></defs><g class="bdx-rays" fill="url(#' + u + 'r)">';
    for (var i = 0; i < 24; i++) {
      var q = i * Math.PI / 12, L = i % 2 ? 35 : 41, w = i % 2 ? .045 : .06;
      o += '<polygon points="' + (42 + 24 * Math.cos(q - w * 1.6)).toFixed(1) + ',' + (CY + 24 * Math.sin(q - w * 1.6)).toFixed(1) + ' ' + (42 + L * Math.cos(q)).toFixed(1) + ',' + (CY + L * Math.sin(q)).toFixed(1) + ' ' +
        (42 + 24 * Math.cos(q + w * 1.6)).toFixed(1) + ',' + (CY + 24 * Math.sin(q + w * 1.6)).toFixed(1) + '"/>';
    }
    return o + '</g>';
  }
  function bgWreath(wire, CY) {
    var o = '<g fill="' + wire + '">', R = 34.5;
    [-1, 1].forEach(function (sd) {
      o += '<path d="M' + (42 + sd * R * Math.sin(.42)).toFixed(1) + ' ' + (CY + R * Math.cos(.42)).toFixed(1) + 'A' + R + ' ' + R + ' 0 0 ' + (sd < 0 ? 1 : 0) + ' ' + (42 + sd * R * Math.sin(2.5)).toFixed(1) + ' ' + (CY + R * Math.cos(2.5)).toFixed(1) +
        '" fill="none" stroke="' + wire + '" stroke-width=".9" stroke-linecap="round"/>';
      for (var i = 0; i < 8; i++) {
        var a = .5 + i * .27, x = 42 + sd * R * Math.sin(a), y = CY + R * Math.cos(a), out = i % 2 ? 1 : -1, sz = 1 - i * .035;
        var rot = (sd < 0 ? 1 : -1) * (a * 180 / Math.PI) + (sd < 0 ? 1 : -1) * out * 38 + 180;
        o += '<g transform="translate(' + (x + sd * out * 1.6 * Math.sin(a)).toFixed(1) + ' ' + (y + out * 1.6 * Math.cos(a)).toFixed(1) + ') rotate(' + rot.toFixed(0) + ')"><path d="M0 ' + (-4.6 * sz).toFixed(1) + 'C' + (2.3 * sz).toFixed(1) + ' -1.5 ' + (2 * sz).toFixed(1) + ' 2 0 ' + (4.2 * sz).toFixed(1) + 'C' + (-2 * sz).toFixed(1) + ' 2 ' + (-2.3 * sz).toFixed(1) + ' -1.5 0 ' + (-4.6 * sz).toFixed(1) + 'Z"/></g>';
      }
    });
    return o + '</g>';
  }
  function bpBadge() {   /* 전설 배지 "바프 완료": 바프 회원(journey.mode bodyprofile)만 보임. 선생님이 data.js journey.bpDone: "촬영 날짜" 넣으면 획득. 45개 수에는 안 셈 */
    var J = M.journey || {};
    if (!(BP || J.bpDone)) return null;
    var ok = function (x) { return typeof x === "string" && /^\d{4}-\d{2}-\d{2}$/.test(x); }, dn = J.bpDone, ds = ok(dn) ? dn : ok(J.shoot) ? J.shoot : null;
    var dd = !dn && ds ? Math.ceil((jDate(ds) - new Date(new Date().getFullYear(), new Date().getMonth(), new Date().getDate())) / 86400000) : -1;
    return { id: "bpdone", sp: true, cat: "grow", hint: dd >= 0 ? "D-" + dd : "촬영 완주", label: "바프 완료", ic: "camera", sh: "shield", lv: 4, col: ["#F6CF58", "#B97F06"], fx: "rays spin twinkle shine", sm: dn ? "완주" : null,
      on: dn ? (ds || ymd(new Date())) : null, shot: ds, how: "바디프로필 촬영을 마치면 선생님이 달아 드려요", desc: "바디프로필 촬영 완주. 끝까지 해낸 사람만 받는 전설 배지예요." };
  }
  function bpStrip() {
    var b = bpBadge(); if (!b) return "";
    var r = "아직", p;
    if (b.on) { p = b.on.split("-"); r = (+p[0]) + ". " + (+p[1]) + ". " + (+p[2]); }
    else if (b.shot) { var dd = Math.ceil((jDate(b.shot) - new Date(new Date().getFullYear(), new Date().getMonth(), new Date().getDate())) / 86400000); if (dd >= 0) r = "D-" + dd; }
    return '<button type="button" class="bgx-sp' + (b.on ? ' on' : '') + '"><span class="bgx-sp-ic">' + bgIcon(b) + '</span><div><small>전설 배지</small><b>바프 완료</b><p>' +
      (b.on ? "촬영 완주 · 끝까지 해낸 사람만" : "촬영을 마치면 선생님이 달아 드려요") + '</p></div><em>' + r + '</em></button>';
  }

  /* ---- 나 탭 배지 칸 (한 칸) */
  function bgPct(b) { return b.on ? 1 : b.goal ? Math.min(1, (b.have || 0) / b.goal) : 0; }
  function bgSub(b) {
    if (b.on) return '<small>' + md(b.on) + '</small>';
    if (b.goal > 1) return '<small class="pg">' + (b.pre || "") + Math.min(b.have || 0, b.goal) + ' / ' + (b.pre || "") + b.goal + (b.unit === "%" || b.unit === "kg" ? b.unit : "") + '</small>';
    return '<small>' + esc(b.hint || "아직") + '</small>';
  }
  function bgNext(L) {   /* 아직 못 받은 것 중 제일 가까운 배지 */
    var c = L.filter(function (b) { return !b.on && b.goal; }).sort(function (x, y) { return bgPct(y) - bgPct(x) || x.goal - y.goal; });
    return c[0] || null;
  }
  function badgeSection(num) {
    var L = badgeList(), got = L.filter(function (b) { return b.on; }).length, nx = bgNext(L), top;
    if (nx) {
      var left = Math.round((nx.goal - Math.min(nx.have || 0, nx.goal)) * 10) / 10;
      top = '<div class="bgx-next"><span class="bgx-ic">' + bgIcon(nx) + '</span><div><b>다음 배지 · ' + esc(nx.label) + '</b><p>' + esc(nx.how) + '</p></div>' +
        '<em>' + (nx.pre ? nx.pre + nx.goal + '까지' : left + (nx.unit || "") + ' 남음') + '</em></div>';
    } else top = '<div class="bgx-next done"><b>배지를 전부 모았어요! 정말 대단해요</b></div>';
    var tabs = "", grids = "";
    BG_CAT.forEach(function (c) {
      var cl = []; L.forEach(function (b, i) { if (b.cat === c[0]) cl.push(i); });
      if (!cl.length) return;   /* 몸 변화(인바디)를 안 쓰는 회원은 탭 없음 */
      var cg = cl.filter(function (i) { return L[i].on; }).length, on = bgTab === c[0];
      tabs += '<button type="button" class="bgx-tab' + (on ? ' on' : '') + '" data-c="' + c[0] + '" role="tab" aria-selected="' + on + '">' + c[1] + ' <i>' + cg + '/' + cl.length + '</i></button>';
      grids += '<div class="bggrid" data-c="' + c[0] + '"' + (on ? '' : ' hidden') + '>' + cl.map(function (i) {
        var b = L[i];
        return '<button type="button" class="bgc' + (b.on ? ' on' : '') + '" data-i="' + i + '" aria-label="' + esc(b.label) + (b.on ? ' 받음' : ' 아직') + '">' + bgIcon(b) + '<b>' + esc(b.label) + '</b>' + bgSub(b) + '</button>';
      }).join("") + '</div>';
    });
    return '<section id="badges" data-num="' + num + '">' + head(num, "나의 배지", "꾸준함이 쌓이는 곳", '<span class="more bg-cnt"><b>' + got + '</b> / ' + L.length + '</span>') +
      '<div class="panel bgx"><i class="bgx-bar" aria-label="모은 배지 ' + got + '개 / ' + L.length + '개"><em style="width:' + (got / L.length * 100).toFixed(1) + '%"></em></i>' + top +
      '<div class="bgx-tabs" role="tablist">' + tabs + '</div>' + grids +
      (COACH_MODE && !DEMO ? '<button type="button" class="bgx-reset">선생님만 보여요 · 이 회원님 배지 초기화</button>' : '') + '</div></section>';
  }
  function setupBadges() {
    var sec = document.getElementById("badges"); if (!sec) return;
    Array.prototype.forEach.call(sec.querySelectorAll(".bgc"), function (el) {
      el.addEventListener("click", function () {
        var b = badgeList()[+el.getAttribute("data-i")];
        if (!b) return;
        bgDetail(b);
      });
    });
    var rsb = sec.querySelector(".bgx-reset");
    if (rsb) rsb.addEventListener("click", function () {   /* 선생님: 배지 초기화 — 받은 배지를 비우고, 회원님 폰이 다음에 열 때 회원님이 한 일로 다시 계산 */
      if (!rsb.classList.contains("sure")) { rsb.classList.add("sure"); rsb.textContent = "한 번 더 누르면 받은 배지가 전부 지워져요"; setTimeout(function () { rsb.classList.remove("sure"); rsb.textContent = "선생님만 보여요 · 이 회원님 배지 초기화"; }, 3000); return; }
      var o = bgsObj(), t = Date.now();
      o.on = {}; o.rs = t; o.at = t;
      try { localStorage.setItem(BGS_LS, JSON.stringify(o)); } catch (e) {}
      rsb.disabled = true; rsb.textContent = "초기화하는 중…";
      rtPost({ a: "kv_set", k: "mw:" + SLUG + ":bg", v: { on: {}, m: o.m, x: o.x, fo: o.fo || 0, rs: t, at: t } }).then(function (j) {
        if (j && j.ok === false) throw new Error(j.error || "fail");
        attToast("배지를 초기화했어요 · 회원님이 한 일로 다시 계산돼요"); rerender();
      }).catch(function () { rsb.disabled = false; rsb.classList.remove("sure"); rsb.textContent = "실패했어요 · 다시 누르기"; });
    });
    var spb = sec.querySelector(".bgx-sp");
    if (spb) spb.addEventListener("click", function () {
      var b = bpBadge(), sv = spb.querySelector(".bdg-s"); if (!b) return;
      if (sv && b.on) { sv.classList.remove("flip"); void sv.getBoundingClientRect(); sv.classList.add("flip"); }
      attToast(b.on ? "바프 완료 — 정말 끝까지 해냈어요!" : b.how);
    });
    Array.prototype.forEach.call(sec.querySelectorAll(".bgx-tab"), function (el) {
      el.addEventListener("click", function () {
        bgTab = el.getAttribute("data-c");
        Array.prototype.forEach.call(sec.querySelectorAll(".bgx-tab"), function (t) { var on = t === el; t.classList.toggle("on", on); t.setAttribute("aria-selected", on); });
        Array.prototype.forEach.call(sec.querySelectorAll(".bggrid"), function (g) { g.hidden = g.getAttribute("data-c") !== bgTab; });
      });
    });
  }
  /* 2026-11-17 장동욱 "확대했을 때 빛 효과 더 고급스럽게, 배지마다 고유 효과": 굵은 줄무늬 빛줄기 대신
     부드러운 후광 + 가는 빛살 두 겹(서로 반대로 천천히) + 배지 효과(BG_ST 3번째 값)마다 다른 연출
     flame 불티가 올라감 · twinkle 금빛 별 · spin 궤도를 도는 빛 · pulse 퍼지는 물결 · shine 빛이 스침 · float 떠오르는 빛망울 · beat 두근 물결 · rays 햇살 */
  function bgAura(b) {
    var fx = " " + (b.fx || "") + " ", h = '<div class="bxa" aria-hidden="true"><i class="bxa-halo"></i><i class="bxa-fine"></i><i class="bxa-fine b"></i>', i, q;
    function has(k) { return fx.indexOf(" " + k + " ") >= 0; }
    function rnd(n) { var x = Math.sin((b.id.length * 7 + n) * 12.9898) * 43758.5453; return x - Math.floor(x); }
    if (has("rays")) h += '<i class="bxa-sun"></i>';
    if (has("pulse")) for (i = 0; i < 3; i++) h += '<i class="bxa-rip" style="animation-delay:' + (i * 1.1) + 's"></i>';
    if (has("beat")) h += '<i class="bxa-beat"></i><i class="bxa-beat" style="animation-delay:.22s"></i>';
    if (has("spin")) h += '<i class="bxa-orb"><b></b></i><i class="bxa-orb o2"><b></b></i><i class="bxa-orb o3"><b></b></i>';
    if (has("shine")) h += '<i class="bxa-beam"></i>';
    if (has("flame")) for (i = 0; i < 14; i++) h += '<i class="bxa-ember" style="left:' + Math.round(rnd(i) * 150 - 75) + 'px;--dx:' + Math.round(rnd(i + 30) * 60 - 30) + 'px;width:' + (3 + Math.round(rnd(i + 60) * 4)) + 'px;animation-delay:' + (rnd(i + 90) * 2.6).toFixed(2) + 's;animation-duration:' + (2.2 + rnd(i + 120) * 1.6).toFixed(2) + 's"></i>';
    if (has("float")) for (i = 0; i < 9; i++) h += '<i class="bxa-bok" style="left:' + Math.round(rnd(i) * 240 - 120) + 'px;width:' + (10 + Math.round(rnd(i + 20) * 22)) + 'px;animation-delay:' + (rnd(i + 40) * 4).toFixed(2) + 's;animation-duration:' + (4 + rnd(i + 70) * 3).toFixed(2) + 's"></i>';
    if (has("twinkle")) for (i = 0; i < 10; i++) { q = (i / 10 + rnd(i) * .08) * Math.PI * 2; var rr = 95 + rnd(i + 11) * 70, sz = 10 + Math.round(rnd(i + 22) * 12);
      h += '<svg class="bxa-star" viewBox="0 0 14 14" style="left:' + Math.round(Math.cos(q) * rr - sz / 2) + 'px;top:' + Math.round(Math.sin(q) * rr - sz / 2) + 'px;width:' + sz + 'px;height:' + sz + 'px;animation-delay:' + (rnd(i + 33) * 2.4).toFixed(2) + 's"><path d="' + BG_SPK + '"/></svg>'; }
    return h + '</div>';
  }
  function bgAuraPos(box) {   /* 후광을 메달 한가운데에 맞춤 */
    var a = box.querySelector(".bxa"), c = box.querySelector(".bxp-card"); if (!a || !c) return;
    a.style.left = (c.offsetLeft + c.offsetWidth / 2) + "px"; a.style.top = (c.offsetTop - 42) + "px";
  }
  function bgDetail(b) {   /* 배지를 누르면 크게 보여 주는 창: 받은 날 · 설명 · 받는 방법 · (아직이면) 진행 막대 */
    var old = document.querySelector(".bgpop-wrap.dt"); if (old && old.parentNode) old.parentNode.removeChild(old);
    var p = b.on ? b.on.split("-") : null, box = document.createElement("div"), pg = "";
    if (!b.on && b.goal > 1) { var hv = Math.min(b.have || 0, b.goal), u2 = b.unit || "";
      pg = '<div class="bxp-bar"><div><span>지금까지</span><b>' + (b.pre || "") + hv + u2 + ' / ' + (b.pre || "") + b.goal + u2 + '</b></div><i><em style="width:' + (hv / b.goal * 100).toFixed(1) + '%"></em></i></div>'; }
    box.className = "bgpop-wrap bxp dt" + (b.sp && b.on ? " sp" : "") + (b.on ? "" : " off");
    if (b.on && b.col && !b.sp && b.col !== BG_PAL.D) box.style.setProperty("--bgc", bgRgb(b.col[0]));
    box.innerHTML = (b.on ? bgAura(b) : '') +
      '<div class="bxp-card" role="dialog" aria-modal="true" aria-labelledby="bxdT"><div class="bxp-medal">' + bgIcon(b) + '</div>' +
      '<small class="bxp-k">' + (b.sp ? '전설 배지' : (BG_CAT.filter(function (c) { return c[0] === b.cat; })[0] || ["", "배지"])[1] + ' 배지') + '</small><h3 id="bxdT">' + esc(b.label) + '</h3>' +
      '<span class="bxd-when' + (b.on ? ' on' : '') + '">' + (p ? (+p[0]) + '년 ' + (+p[1]) + '월 ' + (+p[2]) + '일에 받았어요' : '아직 못 받았어요') + '</span>' +
      (b.on ? '<p>' + esc(b.desc) + '</p>' : '') +
      '<div class="bxd-how"><small>받는 방법</small><b>' + esc(b.how) + '</b></div>' + pg +
      '<button type="button" class="bxp-go">확인</button></div>';
    document.body.appendChild(box);
    requestAnimationFrame(function () { requestAnimationFrame(function () { box.classList.add("in"); }); });
    function close() { box.classList.remove("in"); setTimeout(function () { if (box.parentNode) box.parentNode.removeChild(box); }, 260); }
    box.querySelector(".bxp-go").addEventListener("click", close);
    box.addEventListener("click", function (e) { if (e.target === box) close(); });
    bgAuraPos(box);
  }
  function bgBest(n) {   /* 대표 배지: 받은 것 중 높은 순(전설 → 단계 높은 순 → 최근)으로 n개 — 홈 맨 위 */
    var L; try { L = badgeList().filter(function (b) { return b.on; }); } catch (e) { return []; }
    L.sort(function (x, y) { return (y.sp ? 1 : 0) - (x.sp ? 1 : 0) || (y.lv || 0) - (x.lv || 0) || (y.on > x.on ? 1 : y.on < x.on ? -1 : 0) || (y.goal || 0) - (x.goal || 0); });
    return L.slice(0, n || 1);
  }
  /* ===== 배지 케이스 (2026-11-20 장동욱 "홈 뱃지 3개 시스템 리메이크 — 작은 6각형 뱃지 케이스, 누르면 확대, 중앙은 무조건 제일 높은 등급, 나머지는 빼고 넣고")
     홈 맨 위 오른쪽 작은 6각형 케이스(.hbcase) = 가운데 1칸(bgBest 1등 고정) + 둘레 6칸(BGS.show, 회원님이 고름 — 정한 적 없으면 그다음 높은 배지로 채움)
     누르면 크게(bcOpen) → 둘레 칸 누르고 아래 받은 배지에서 골라 넣기 / "빼기". 저장 BGS.show·BGS.sst(바꾼 시각) → 창고 mw:<주소>:bg 같이 */
  function bcData() {
    var L; try { L = badgeList().filter(function (b) { return b.on; }); } catch (e) { L = []; }
    L.sort(function (x, y) { return (y.sp ? 1 : 0) - (x.sp ? 1 : 0) || (y.lv || 0) - (x.lv || 0) || (y.on > x.on ? 1 : y.on < x.on ? -1 : 0) || (y.goal || 0) - (x.goal || 0); });
    var c = L[0] || null, by = {}, o = bgsObj(), used = {}, slots = [];
    L.forEach(function (b) { by[b.id] = b; });
    var src = Array.isArray(o.show) ? o.show : L.slice(1, 7).map(function (b) { return b.id; });
    for (var i = 0; i < 6; i++) {
      var id = src[i], b = id && by[id];
      if (b && b !== c && !used[id]) { used[id] = 1; slots.push(b); } else slots.push(null);
    }
    return { c: c, s: slots, all: L };
  }
  function bcSave(slots) {
    var o = bgsObj(); o.show = slots.map(function (b) { return b ? b.id : null; }); o.sst = Date.now();
    bgsSave(!COACH_MODE);
  }
  var BC_POS = [[-.5, -1], [.5, -1], [1, 0], [.5, 1], [-.5, 1], [-1, 0]];   /* 둘레 6칸: 왼위·오위·오른쪽·오아래·왼아래·왼쪽 (세로 뾰족 육각형 벌집) */
  function bcHtml(d, W, big, sel) {
    var H = W * 1.1547, g = W * .06, Wd = W + g, Hd = H * .75 + g * .87, CW = W * 3.6, CH = W * 3.12, cx = CW / 2, cy = CH / 2, sc = (W * .98 / 84).toFixed(3);   /* 2026-11-20 3차: 정육각형 케이스(세로 = 가로×0.866, 너무 길다), 칸 사이 0.06칸, 배지 칸의 98% */
    function cell(b, k, dx, dy) {
      var tag = big ? "button" : "span", x = (cx + dx * Wd - W / 2).toFixed(1), y = (cy + dy * Hd - H / 2).toFixed(1);
      return '<' + tag + (big ? ' type="button" data-bc="' + k + '"' : '') + ' class="bc-cell' + (k === "c" ? " c" : "") + (b ? "" : " e") + (sel === k ? " sel" : "") + (b && b.sp ? " sp" : "") +
        '" style="left:' + x + 'px;top:' + y + 'px;width:' + W.toFixed(1) + 'px;height:' + H.toFixed(1) + 'px"' + (big && b ? ' aria-label="' + esc(b.label) + '"' : big ? ' aria-label="빈 칸 — 눌러서 배지 넣기"' : '') + '>' +
        (b ? '<span class="bc-ic" style="transform:scale(' + sc + ')">' + bgIcon(b) + '</span>' : (big ? '<i>+</i>' : '')) + '</' + tag + '>';
    }
    var h = '<div class="bcase' + (big ? ' big' : '') + '" style="width:' + CW.toFixed(1) + 'px;height:' + CH.toFixed(1) + 'px">';
    h += cell(d.c, "c", 0, 0);
    BC_POS.forEach(function (p, i) { h += cell(d.s[i], String(i), p[0], p[1]); });
    return h + '</div>';
  }
  function bgHomeChip() {   /* 홈 맨 위 오른쪽 작은 케이스 */
    var d = bcData();
    return '<button type="button" class="hbcase" data-bcopen aria-label="내 배지 케이스 열기' + (d.c ? ' — 대표 ' + esc(d.c.label) : '') + '">' + bcHtml(d, 22, false) + '</button>';
  }
  function bcOpen() {   /* 2026-11-20 2차: 한 번 누르면 그 배지 이름·받은 날, 꾹 눌러야 넣고 빼는 창(.bc-sheet) */
    if (document.querySelector(".bcwrap")) return;
    var box = document.createElement("div"), sel = null, info = null, lpT = 0, lpXY = null, lpDone = false;
    box.className = "bcwrap";
    function draw() {
      var d = bcData(), h = '<div class="bc-card" role="dialog" aria-modal="true" aria-label="내 배지 케이스">' +
        '<div class="bc-top"><div><small>JANG KAREDO · BADGE CASE</small><b>내 배지 케이스</b></div><button type="button" class="bc-x" data-bcx aria-label="닫기">×</button></div>' +
        '<div class="bc-stage">' + bcHtml(d, 72, true, sel) + '</div>';
      var ib = info === "c" ? d.c : info !== null ? d.s[+info] : null;
      if (ib) h += '<div class="bc-cname"><span>' + (info === "c" ? "👑 대표" : (+info + 1) + "번 칸") + '</span><b>' + esc(ib.label) + '</b>' + (ib.on && ib.on !== "?" ? '<i>' + ib.on.slice(2).replace(/-/g, ".") + ' 받음</i>' : '') + '</div>';
      else if (info !== null && info !== "c") h += '<div class="bc-cname"><span>' + (+info + 1) + '번 칸</span><b>비어 있어요</b></div>';
      else if (d.c) h += '<div class="bc-cname"><span>👑 대표</span><b>' + esc(d.c.label) + '</b></div>';
      h += '<ul class="bc-how"><li><b>👑 가운데</b>는 받은 배지 중 제일 높은 배지가 자동으로 들어가요</li>' +
        '<li><b>👆 한 번 누르면</b> 그 배지 이름을 볼 수 있어요</li><li><b>✋ 둘레 칸을 꾹 누르면</b> 배지를 넣고 뺄 수 있어요</li></ul>' +
        '<a class="bc-all" href="#goal-badges" data-bcx>배지 전체 보기 ›</a></div>';
      if (sel !== null) {
        var cur = d.s[+sel], pick = d.all.filter(function (b) { return b !== d.c; });
        h += '<div class="bc-sheet" role="dialog" aria-label="배지 바꾸기"><div class="bc-ph"><b>' + (+sel + 1) + '번 칸' + (cur ? ' · ' + esc(cur.label) : ' · 비어 있어요') + '</b>' +
          (cur ? '<button type="button" class="bc-out" data-bcout>빼기</button>' : '') + '<button type="button" class="bc-sx" data-bcsx aria-label="닫기">×</button></div>' +
          '<p class="bc-sub">넣고 싶은 배지를 눌러요 · 다른 칸에 있던 배지는 자리가 바뀌어요</p>';
        if (!pick.length) h += '<p class="bc-sub">넣을 수 있는 배지가 아직 없어요. 배지를 더 모아 봐요!</p>';
        else h += '<div class="bc-grid">' + pick.map(function (b) {
          var at = d.s.indexOf(b);
          return '<button type="button" class="bc-pb' + (b === cur ? ' on' : '') + '" data-bcput="' + b.id + '"><span class="bc-pi">' + bgIcon(b) + '</span><i>' + esc(b.label) + '</i>' +
            (at >= 0 && b !== cur ? '<em>' + (at + 1) + '번 칸</em>' : '') + '</button>';
        }).join("") + '</div>';
        h += '</div>';
      }
      box.innerHTML = h; box.classList.toggle("sheet", sel !== null);
    }
    function close() { box.classList.remove("in"); setTimeout(function () { if (box.parentNode) box.parentNode.removeChild(box); }, 220); if (/^#?(home)?$/.test(location.hash)) rerender(); }
    function lpClear() { clearTimeout(lpT); lpT = 0; }
    box.addEventListener("pointerdown", function (e) {
      var t = e.target.closest("[data-bc]"); if (!t || sel !== null) return;
      var k = t.getAttribute("data-bc"); lpDone = false; lpXY = [e.clientX, e.clientY]; lpClear();
      t.classList.add("press");
      lpT = setTimeout(function () {
        lpT = 0; t.classList.remove("press");
        if (k === "c") { info = "c"; lpDone = true; draw(); attToast("가운데는 제일 높은 배지 자리예요"); return; }
        lpDone = true; sel = k; info = k; try { navigator.vibrate && navigator.vibrate(15); } catch (e2) {} draw();
      }, 450);
    });
    box.addEventListener("pointermove", function (e) { if (lpT && lpXY && Math.abs(e.clientX - lpXY[0]) + Math.abs(e.clientY - lpXY[1]) > 10) { lpClear(); var p = box.querySelector(".bc-cell.press"); if (p) p.classList.remove("press"); } });
    ["pointerup", "pointercancel", "pointerleave"].forEach(function (ev) { box.addEventListener(ev, function () { lpClear(); var p = box.querySelector(".bc-cell.press"); if (p) p.classList.remove("press"); }); });
    box.addEventListener("contextmenu", function (e) { if (e.target.closest("[data-bc]")) e.preventDefault(); });
    box.addEventListener("click", function (e) {
      if (e.target === box) { if (sel !== null) { sel = null; draw(); } else close(); return; }
      if (e.target.closest("[data-bcx]")) { close(); return; }
      if (e.target.closest("[data-bcsx]")) { sel = null; draw(); return; }
      var d = bcData(), t;
      if ((t = e.target.closest("[data-bc]"))) {
        if (lpDone) { lpDone = false; return; }   /* 꾹 누른 뒤 손 뗄 때 click은 무시 */
        if (sel !== null) { sel = null; draw(); return; }
        var k = t.getAttribute("data-bc"); info = info === k ? null : k; draw();
        if (k !== "c" && !d.s[+k]) attToast("빈 칸이에요 · 꾹 누르면 배지를 넣을 수 있어요");
        return;
      }
      if (sel !== null && !e.target.closest(".bc-sheet")) { sel = null; draw(); return; }
      if (e.target.closest("[data-bcout]") && sel !== null) { d.s[+sel] = null; bcSave(d.s); sel = null; draw(); attToast("배지를 뺐어요"); return; }
      if ((t = e.target.closest("[data-bcput]")) && sel !== null) {
        var id = t.getAttribute("data-bcput"), b = d.all.filter(function (x) { return x.id === id; })[0]; if (!b) return;
        var at = d.s.indexOf(b), cur = d.s[+sel];
        if (at >= 0) d.s[at] = cur || null;   /* 다른 칸에 있던 배지면 자리 바꾸기 */
        d.s[+sel] = b; bcSave(d.s); info = sel; sel = null; draw(); attToast("배지를 넣었어요");
      }
    });
    draw(); document.body.appendChild(box);
    requestAnimationFrame(function () { requestAnimationFrame(function () { box.classList.add("in"); }); });
  }
  document.addEventListener("click", function (e) { var t = e.target.closest("[data-bcopen]"); if (!t) return; e.preventDefault(); bcOpen(); });
  var bgReady = false;
  function badgeCheck() {   /* 새로 받은 배지가 있으면 팝업 한 번 */
    bgReady = true;
    if (DEMO || COACH_MODE) return;
    if (TOUR_ON || TOUR_WANT || WN_WANT || document.querySelector(".npop-wrap, .bgpop-wrap, .ibsheet, .tour")) { setTimeout(badgeCheck, 6500); return; }
    var L = badgeList(), seen = lsArr(BG_SEEN);
    var fresh = L.filter(function (b) { return b.on && seen.indexOf(b.id) < 0; });
    if (!fresh.length) return;
    lsAdd(BG_SEEN, fresh.map(function (b) { return b.id; }));
    fresh.sort(function (x, y) { return (y.sp ? 1 : 0) - (x.sp ? 1 : 0) || (y.lv || 0) - (x.lv || 0) || (y.on > x.on ? 1 : y.on < x.on ? -1 : 0) || (y.goal || 0) - (x.goal || 0); });
    showBadgePop(fresh[0], fresh.length - 1, L);
  }
  function showBadgePop(b, extra, L) {
    var got = L.filter(function (x) { return x.on; }).length, prev = Math.max(0, got - 1 - extra), conf = "", pal = ["#FFE48A", "#E4B544", "#FFFFFF", "#E1141E", "#FFF4C2"];
    for (var i = 0; i < 22; i++) {
      conf += '<i style="left:' + (3 + (i * 37) % 94) + '%;background:' + pal[i % 5] + ';animation-delay:' + (0.9 + (i * 0.11) % 1.5).toFixed(2) + 's;animation-duration:' + (2.4 + (i % 4) * 0.4).toFixed(2) + 's' +
        (i % 3 === 0 ? ';border-radius:50%;width:7px;height:7px' : '') + '"></i>';
    }
    var nx = bgNext(L), box = document.createElement("div");
    box.className = "bgpop-wrap bxp" + (b.sp ? " sp" : "");
    if (b.col && b.col !== BG_PAL.D) box.style.setProperty("--bgc", bgRgb(b.col[1]));
    box.innerHTML = bgAura(b) + '<div class="bxp-flash" aria-hidden="true"></div><div class="bgpop-conf" aria-hidden="true">' + conf + '</div>' +
      '<div class="bxp-card" role="dialog" aria-modal="true" aria-labelledby="bxpT"><div class="bxp-medal">' + bgIcon(b) + '</div>' +
      '<small class="bxp-k">' + (b.sp ? '전설 배지 획득!' : '새 배지 획득!') + '</small><h3 id="bxpT">' + esc(b.label) + '</h3>' +
      '<p>' + esc(b.desc) + (extra > 0 ? '<br><em>외 ' + extra + '개도 함께 받았어요</em>' : '') + '</p>' +
      '<div class="bxp-bar"><div><span>모은 배지</span><b><span class="bxp-n">' + prev + '</span> / ' + L.length + '</b></div><i><em style="width:' + (prev / L.length * 100).toFixed(1) + '%" data-to="' + (got / L.length * 100).toFixed(1) + '"></em></i>' +
      (nx ? '<small>다음 목표 · <b>' + esc(nx.label) + '</b></small>' : '') + '</div>' +
      '<a class="bxp-go" href="#goal-badges">내 배지 보러 가기</a><button type="button" class="bxp-x">닫기</button></div>';
    document.body.appendChild(box);
    bgAuraPos(box);
    requestAnimationFrame(function () { requestAnimationFrame(function () { box.classList.add("in"); }); });
    var em = box.querySelector(".bxp-bar em"), nEl = box.querySelector(".bxp-n");
    setTimeout(function () {
      em.style.width = em.getAttribute("data-to") + "%";
      if (got <= prev) return;
      var n = prev, iv = setInterval(function () { n++; nEl.textContent = n; if (n >= got) clearInterval(iv); }, Math.max(40, 600 / (got - prev)));
    }, 1350);
    function close() { box.classList.remove("in"); setTimeout(function () { if (box.parentNode) box.parentNode.removeChild(box); }, 320); }
    box.querySelector(".bxp-x").addEventListener("click", close);
    box.querySelector(".bxp-go").addEventListener("click", function () { close(); });
    box.addEventListener("click", function (e) { if (e.target === box) close(); });
  }

  /* ---- 근육 지도 */
  var MG = [["chest", "가슴"], ["back", "등"], ["shoulder", "어깨"], ["arm", "팔"], ["core", "복근"], ["thigh", "허벅지"], ["glute", "엉덩이"], ["calf", "종아리"]];
  var MG_KO = {}; MG.forEach(function (g) { MG_KO[g[0]] = g[1]; });
  var MG_RULES = [   /* 종목 이름 → 부위 (위에서부터 처음 맞는 것) */
    [/레그\s?컬/, ["thigh"]],
    [/RDL|데드리프트|굿모닝/i, ["thigh", "glute"]],
    [/레그\s?익스텐션|시시\s?스쿼트/, ["thigh"]],
    [/카프|종아리/, ["calf"]],
    [/스쿼트|레그\s?프레스|핵\s?프레스|런지|스텝\s?업/, ["thigh", "glute"]],
    [/이너\s?타이|어덕/, ["thigh"]],
    [/아웃\s?타이|힙|글루트|브릿지|어브덕/, ["glute"]],
    [/페이스\s?풀|리버스\s?펙덱|리어\s?델트/, ["shoulder"]],
    [/레터럴|숄더|넥\s?프레스|밀리터리|프론트\s?레이즈|업라이트/, ["shoulder"]],
    [/슈러그|풀다운|로우|풀업|친업|턱걸이|풀오버|백\s?익스텐션/, ["back"]],
    [/푸[쉬시]\s?다운|익스텐션|딥스|킥백|컬/, ["arm"]],
    [/플랭크|크런치|복근|코어|레그\s?레이즈|싯업|AB/i, ["core"]],
    [/펙덱|플라이|체스트|벤치|프레스|푸[쉬시]\s?업/, ["chest"]]
  ];
  var MG_PART = [[/가슴/, ["chest"]], [/등/, ["back"]], [/어깨/, ["shoulder"]], [/팔|삼두|이두/, ["arm"]], [/하체/, ["thigh", "glute"]], [/엉덩이|힙/, ["glute"]], [/복근|코어/, ["core"]]];
  function dayGroups(d) {
    var out = {};
    if (!d || d.rest || d.pick || d.cardio_only) return [];
    (d.items || []).forEach(function (it) {
      var n = it.name || "";
      for (var i = 0; i < MG_RULES.length; i++) if (MG_RULES[i][0].test(n)) { MG_RULES[i][1].forEach(function (g) { out[g] = 1; }); break; }
    });
    if (!Object.keys(out).length) MG_PART.forEach(function (r) { if (r[0].test(d.part || "")) r[1].forEach(function (g) { out[g] = 1; }); });
    return Object.keys(out);
  }
  function dayOfDate(k, sorted) {   /* 그날 한 루틴 (요일 / 순환은 그 전까지 출석 수로 DAY 순서) */
    if (ROT) {
      var n = rotDays().length; if (!n) return null;
      var since = M.routine.rotation_start || "2000-01-01";
      var before = sorted.filter(function (x) { return x >= since && x < k; }).length;
      return rotDays()[before % n];
    }
    var p = k.split("-");
    return dayAt(new Date(+p[0], +p[1] - 1, +p[2]));
  }
  function muscleCounts(ym) {
    var a = attLoad().slice().sort(), cnt = {}, days = 0, L = (LG && LG.d) || {};
    MG.forEach(function (g) { cnt[g[0]] = 0; });
    var ks = a.slice(); Object.keys(L).forEach(function (k) { if (ks.indexOf(k) < 0) ks.push(k); });
    ks.forEach(function (k) {
      if (k.slice(0, 7) !== ym) return;
      days++;
      /* 2026-11-14: 그날 ✓한 종목이 있으면 그 종목들로, 없으면 그날 루틴 전체로 */
      var g0 = L[k] && L[k].length ? dayGroups({ items: L[k].map(function (x) { return { name: x[0] }; }) }) : dayGroups(dayOfDate(k, a));
      g0.forEach(function (g) { cnt[g]++; });
    });
    return { cnt: cnt, days: days };
  }
  function routineGroups() {
    var out = {};
    ((M.routine && M.routine.days) || []).forEach(function (d) { dayGroups(d).forEach(function (g) { out[g] = 1; }); });
    return out;
  }
  function mgLevel(n) { return n >= 5 ? 3 : n >= 3 ? 2 : n >= 1 ? 1 : 0; }
  function mmFigure(cnt, alt) {
    var sx = M.sex === "F" ? "F" : "M", src = BASE + "muscle/" + sx + "/";
    /* 2026-11-18 다크모드: 하얀 바탕 그림(base.png) + 다크용(base-dark.png, _tools/make_musclemap_dark.py) 둘 다 넣고 CSS가 하나만 보여 줌 */
    return '<div class="mm-fig"><img class="mm-lt" src="' + src + 'base.png" alt="' + esc(alt) + '"><img class="mm-dk" src="' + src + 'base-dark.png" alt="" loading="lazy">' +
      MG.map(function (g) {
        var lv = mgLevel(cnt[g[0]]);
        return lv ? '<img class="mm-l" src="' + src + g[0] + '.png" alt="" style="opacity:' + [0, 0.4, 0.72, 1][lv] + '">' : '';
      }).join("") + '</div>';
  }
  function mgTop(cnt) {
    return MG.filter(function (g) { return cnt[g[0]] > 0; })
      .sort(function (x, y) { return cnt[y[0]] - cnt[x[0]]; }).map(function (g) { return { k: g[0], name: g[1], n: cnt[g[0]] }; });
  }
  function mgWhite(cnt) {   /* 루틴엔 있는데 이번 달 아직 안 칠해진 부위 */
    var rg = routineGroups();
    return MG.filter(function (g) { return rg[g[0]] && !cnt[g[0]]; }).map(function (g) { return g[1]; });
  }
  var mmWhich = "cur";
  function muscleBody() {
    var now = new Date(), ym = mmWhich === "prev" ? ymAdd(ymOf(now), -1) : ymOf(now), mo = +ym.slice(5);
    var r = muscleCounts(ym), top = mgTop(r.cnt), white = mgWhite(r.cnt);
    var alt = mo + "월 근육 지도: " + (top.length ? top.map(function (t) { return t.name + " " + t.n + "회"; }).join(", ") : "아직 색칠된 곳 없음");
    var h = '<div class="mm-card">' + mmFigure(r.cnt, alt) + (r.days ? '' : '<p class="mm-empty">' + (mmWhich === "prev" ? '이 달엔 출석 기록이 없어요' : '출석하면 그날 루틴 부위가<br>하나씩 색칠돼요') + '</p>') +
      '<div class="mm-leg"><span><i class="l0"></i>안 함</span><span><i class="l1"></i>1~2회</span><span><i class="l2"></i>3~4회</span><span><i class="l3"></i>5회 이상</span></div></div>';
    if (top.length) {
      h += '<div class="mm-top"><b>' + (mmWhich === "prev" ? mo + '월에' : '이번 달') + ' 제일 많이 한 부위</b><div>' + top.slice(0, 3).map(function (t, i) {
        return '<span class="' + (i ? '' : 'first') + '"><small>' + (i + 1) + '위</small><b>' + t.name + '</b><em>' + t.n + '회</em></span>';
      }).join("") + '</div></div>';
    }
    if (r.days && white.length) h += '<div class="mm-tip"><span aria-hidden="true">!</span><div><b>아직 하얀 곳 · ' + white.slice(0, 2).join(" · ") + '</b><small>루틴에 있는 부위예요. 그 요일에 나와서 채워 봐요!</small></div></div>';
    else if (r.days) h += '<div class="mm-tip ok"><span aria-hidden="true">★</span><div><b>루틴 부위를 다 칠했어요!</b><small>이 기세 그대로 다음 달도 채워 봐요</small></div></div>';
    return h;
  }
  function muscleSection(num) {
    var now = new Date(), st = startDate(), prevYm = ymAdd(ymOf(now), -1);
    var canPrev = st && ymOf(st) <= prevYm;
    if (!canPrev) mmWhich = "cur";
    return '<section id="muscle" data-num="' + num + '">' + head(num, "이번 달 근육 지도", "✓한 종목 · 출석한 날 부위가 칠해져요", '<a class="more" href="#report">' + (now.getMonth() + 1) + '월 리포트</a>') +
      '<div class="panel mmap"><div class="mm-seg" role="group" aria-label="달 고르기">' +
      '<button type="button" data-m="cur" aria-pressed="' + (mmWhich === "cur") + '">이번 달 ' + (now.getMonth() + 1) + '월</button>' +
      '<button type="button" data-m="prev" aria-pressed="' + (mmWhich === "prev") + '"' + (canPrev ? '' : ' disabled') + '>지난달 ' + (+prevYm.slice(5)) + '월</button></div>' +
      '<div class="mm-body">' + muscleBody() + '</div></div></section>';
  }
  function setupMuscle() {
    Array.prototype.forEach.call(document.querySelectorAll(".mm-seg button"), function (b) {
      b.addEventListener("click", function () {
        mmWhich = b.getAttribute("data-m");
        Array.prototype.forEach.call(document.querySelectorAll(".mm-seg button"), function (x) { x.setAttribute("aria-pressed", String(x === b)); });
        var body = document.querySelector(".mm-body"); if (body) body.innerHTML = muscleBody();
      });
    });
  }

  /* ---- 월간 리포트 */
  function reportData(ym) {
    var a = attLoad(), now = new Date(), first = ymDate(ym), last = new Date(first.getFullYear(), first.getMonth() + 1, 0);
    var to = last < now ? last : now, s = attStats(a, first, to), hs = attHistory(), L = badgeList();
    var mc = muscleCounts(ym), ib = null;
    if (IB_ON && ibData && ibData.length) {
      var recs = ibData.slice().sort(function (x, y) { return x.d < y.d ? -1 : 1; });
      var cur = null, prev = null;
      recs.forEach(function (r) { if (r.d.slice(0, 7) === ym) cur = r; else if (r.d.slice(0, 7) < ym) prev = r; });
      if (cur) ib = { cur: cur, prev: prev };
    }
    return { ym: ym, mo: +ym.slice(5), y: +ym.slice(0, 4), done: s.done, rate: s.rate, best: hs.monthBest[ym] || 0,
      badges: L.filter(function (b) { return b.on && b.on.slice(0, 7) === ym; }), mc: mc, ib: ib,
      live: ym === ymOf(now), upto: md(ymd(to)) };
  }
  function reportCard(R) {
    var top = mgTop(R.mc.cnt), white = mgWhite(R.mc.cnt);
    var cm = M.reports && M.reports[R.ym], quote, qwho;
    if (cm) { quote = esc(cm).replace(/\n/g, "<br>"); qwho = TRN + " 트레이너의 한마디"; }
    else {
      qwho = R.mo + "월 한 줄 요약";
      quote = !R.done ? "이번 달은 쉬어 갔어요.<br>다음 달엔 하나씩 다시 채워 봐요!" :
        (top.length ? "이번 달 " + top[0].name + " 운동이 제일 성실했어요." : R.done + "번 출석, 잘 해냈어요.") +
        "<br>" + (white.length ? "다음 달엔 " + white[0] + "까지 채워 봐요!" : "다음 달도 이 기세 그대로 가요!");
    }
    var tile = function (lab, v, unit, cls) { return '<div class="rp-tile ' + (cls || '') + '"><span>' + lab + '</span><p><b>' + v + '</b><small>' + unit + '</small></p></div>'; };
    var right;
    if (R.ib) {
      var rows = R.ib.prev ? [["골격근량", "smm", 1], ["체지방량", "bfm", -1], ["체중", "w", 0]].map(function (r) {
        var dl = Math.round((R.ib.cur[r[1]] - R.ib.prev[r[1]]) * 10) / 10;
        var cls = !r[2] || !dl ? "" : (dl > 0) === (r[2] > 0) ? "up" : "down";
        return '<div class="rp-ibr"><span>' + r[0] + '</span><b class="' + cls + '">' + (dl > 0 ? "+" : dl < 0 ? "−" : "") + ibFmt(Math.abs(dl)) + '<small> kg</small></b></div>';
      }).join("") : [["골격근량", "smm", "kg"], ["체지방량", "bfm", "kg"], ["체중", "w", "kg"]].map(function (r) {
        return '<div class="rp-ibr"><span>' + r[0] + '</span><b>' + ibFmt(R.ib.cur[r[1]]) + '<small> ' + r[2] + '</small></b></div>';
      }).join("");
      right = '<div class="rp-box rp-ib"><h4>' + (R.ib.prev ? '인바디 · 지난번보다' : '인바디 · 첫 기록') + '</h4>' + rows + '</div>';
    } else if (IB_ON) {
      right = '<div class="rp-box rp-ib empty"><h4>인바디</h4><p>' + R.mo + '월 인바디 기록이 없어요.<br>몸변화 탭에 올리면<br>여기서 지난번과 비교돼요</p></div>';
    } else {
      right = '<div class="rp-box rp-ib"><h4>제일 많이 한 부위</h4>' + (top.length ? top.slice(0, 3).map(function (t, i) {
        return '<div class="rp-ibr"><span>' + (i + 1) + '위 · ' + t.name + '</span><b>' + t.n + '<small> 회</small></b></div>';
      }).join("") : '<p>출석하면 여기에 쌓여요</p>') + '</div>';
    }
    var bdgs = R.badges.slice(0, 4).map(function (b) { return bgIcon(b, "#0E0E10"); }).join("");
    return '<div class="rp" id="rp"><i class="rp-stripe"></i><i class="rp-c1"></i><i class="rp-c2"></i>' +
      '<div class="rp-top"><div class="rp-brand"><b>' + esc(BRAND) + '</b><span>' + esc(BRANCH) + '</span></div><span class="rp-k">MONTHLY REPORT · ' + R.y + '. ' + pad2(R.mo) + '</span></div>' +
      '<div class="rp-title"><span>' + esc(M.name) + ' 회원님의</span><h2>' + R.mo + '월 운동 리포트</h2>' + (R.live ? '<em>' + R.upto + ' 기준 · 진행 중</em>' : '') + '</div>' +
      '<div class="rp-tiles">' + tile("출석", R.done, "회", "pk") + tile("출석률", R.rate, "%") + tile("최고 연속", R.best, "회") + tile("새 배지", R.badges.length, "개", "gd") + '</div>' +
      '<div class="rp-mid"><div class="rp-map"><h4>' + R.mo + '월 근육 지도</h4>' + mmFigure(R.mc.cnt, R.mo + "월 근육 지도") +
      '<p>' + (top.length ? '가장 많이 한 부위 · ' + top.slice(0, 2).map(function (t) { return t.name; }).join(" · ") : '출석하면 부위가 색칠돼요') + '</p></div>' +
      '<div class="rp-side">' + right + '<div class="rp-box rp-bd"><h4>' + (R.badges.length ? '이번 달 받은 배지' : '이번 달 배지') + '</h4>' +
      (bdgs ? '<div class="rp-bds">' + bdgs + '</div>' : '<p>다음 달엔 배지 하나 받아 봐요!</p>') + '</div></div></div>' +
      '<div class="rp-quote"><span aria-hidden="true">“</span><div><p>' + quote + '</p><small>' + qwho + '</small></div></div>' +
      '<div class="rp-foot"><span><b>MY PT NOTE</b> · 나만의 운동 노트</span><span>' + esc(BRN) + ' · 담당 ' + esc(TRN) + ' 트레이너</span></div></div>';
  }
  function renderReport(ym) {
    var now = new Date(), curYm = ymOf(now), st = startDate(), firstYm = st ? ymOf(st) : curYm;
    if (!ym || ym > curYm) ym = curYm;
    if (ym < firstYm) ym = firstYm;
    var R = reportData(ym), pv = ymAdd(ym, -1), nx = ymAdd(ym, 1);
    return '<div class="rp-nav"><a href="#routine" class="rp-back">← 루틴</a><div class="rp-mo">' +
      (pv >= firstYm ? '<a href="#report-' + pv + '" aria-label="' + (+pv.slice(5)) + '월 리포트">‹</a>' : '<span class="off">‹</span>') +
      '<b>' + R.y + '년 ' + R.mo + '월</b>' +
      (nx <= curYm ? '<a href="#report-' + nx + '" aria-label="' + (+nx.slice(5)) + '월 리포트">›</a>' : '<span class="off">›</span>') + '</div></div>' +
      '<div class="rp-frame" id="rpFrame">' + reportCard(R) + '</div>' +
      '<button type="button" class="btn fill rp-save" id="rpSave"><svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M12 4v11"/><path d="m7 10 5 5 5-5"/><path d="M5 20h14"/></svg>이미지로 저장 · 공유</button>' +
      '<p class="rp-hint">' + (R.live ? '이번 달은 아직 진행 중이라 숫자가 계속 바뀌어요. ' : '') + '카톡·인스타에 올려 자랑해 보세요!</p>' + remember();
  }
  function rpFit() {
    var f = document.getElementById("rpFrame"), r = document.getElementById("rp");
    if (!f || !r) return;
    var s = f.clientWidth / 1080;
    r.style.transform = "scale(" + s + ")";
    f.style.height = Math.round(1350 * s) + "px";
  }
  window.addEventListener("resize", rpFit);
  function loadH2C() {
    if (window.html2canvas) return Promise.resolve(window.html2canvas);
    return new Promise(function (ok, no) {
      var s = document.createElement("script");
      s.src = "https://cdnjs.cloudflare.com/ajax/libs/html2canvas/1.4.1/html2canvas.min.js";
      s.onload = function () { ok(window.html2canvas); }; s.onerror = no;
      document.head.appendChild(s);
    });
  }
  function rpShow(url, name) {   /* 공유가 안 되는 브라우저(카톡 안 등): 그림을 띄워서 길게 눌러 저장 */
    var box = document.createElement("div");
    box.className = "rp-shot";
    box.innerHTML = '<div><img src="' + url + '" alt="월간 리포트 그림"><p>그림을 <b>길게 눌러</b> 사진에 저장하세요</p>' +
      '<a class="btn fill" href="' + url + '" download="' + name + '">파일로 받기</a><button type="button" class="btn">닫기</button></div>';
    document.body.appendChild(box);
    box.querySelector("button").addEventListener("click", function () { box.remove(); });
  }
  function setupReport() {
    rpFit();
    var imgs = document.querySelectorAll("#rp img");
    Array.prototype.forEach.call(imgs, function (im) { if (!im.complete) im.addEventListener("load", rpFit); });
    var b = document.getElementById("rpSave");
    if (!b) return;
    b.addEventListener("click", function () {
      var r = document.getElementById("rp"); if (!r || b.disabled) return;
      b.disabled = true; b.classList.add("saving");
      var name = /^#growth/.test(location.hash) ? "PT성장기록-" + ymd(new Date()) + ".png" : "PT리포트-" + (location.hash.match(/\d{4}-\d{2}/) || [ymOf(new Date())])[0] + ".png";
      var holder = document.createElement("div");
      holder.style.cssText = "position:fixed;left:-12000px;top:0;width:1080px;height:1350px;overflow:hidden";
      var c = r.cloneNode(true); c.removeAttribute("id"); c.style.transform = "none";
      Array.prototype.forEach.call(c.querySelectorAll(".bdg-fx, .bdg-ring"), function (x) { x.remove(); });   /* 움직이는 효과는 그림에선 빼고 */
      holder.appendChild(c); document.body.appendChild(holder);
      var fontsReady = document.fonts && document.fonts.ready ? document.fonts.ready : Promise.resolve();
      fontsReady.then(loadH2C).then(function (h2c) {
        return h2c(c, { scale: 1, width: 1080, height: 1350, backgroundColor: "#121214", useCORS: true, logging: false });
      }).then(function (cv) {
        holder.remove();
        cv.toBlob(function (blob) {
          b.disabled = false; b.classList.remove("saving");
          var url = cv.toDataURL("image/png");
          var file = null;
          try { file = new File([blob], name, { type: "image/png" }); } catch (e) {}
          if (file && navigator.canShare && navigator.canShare({ files: [file] })) {
            navigator.share({ files: [file], title: M.name + (/^#growth/.test(location.hash) ? " 회원님 성장 기록" : " 회원님 월간 리포트") }).catch(function (e) { if (!e || e.name !== "AbortError") rpShow(url, name); });
          } else rpShow(url, name);
        }, "image/png");
      }).catch(function () {
        holder.remove(); b.disabled = false; b.classList.remove("saving");
        attToast("그림을 못 만들었어요. 인터넷 연결을 확인해 주세요");
      });
    });
  }
  /* ---- 첫날 vs 오늘 · 성장 기록 카드 (2026-11-12 장동욱 "재등록 아이디어 1번 — 회원이 얼마나 변했는지 숫자로")
     #growth. 처음 무게 = data.js start_weights + 창고 pub:m:<주소>:growth {w:{종목:kg}, note, at} (선생님 폰에서 넣음, 루틴 저장할 때 새 종목은 그때 무게로 자동 기록)
     지금 무게 = 지금 루틴(폰에서 고친 것 포함) 종목별 가장 무거운 세트. 인바디 = 첫 기록 vs 최근 기록. */
  var GR_LS = "ptnote:" + SLUG + ":growth", GR = null;
  try { GR = JSON.parse(localStorage.getItem(GR_LS) || "null"); } catch (e) {}
  /* ---- 운동 기록 (2026-11-14 장동욱 "운동 탭에서 한 종목 끝날 때마다 체크 → 기록 탭에 저장, 첫날 vs 오늘도 기록에 연동")
     창고 저장소 mw:<주소>:log = { d: {"YYYY-MM-DD": [[종목, 가장 무거운 kg, 세트 수], …]}, f: {종목: 처음 ✓한 kg}, at }
     회원 폰도 쓸 수 있는 칸(mw:)이라 창고 재배포 필요 없음. 4천 자 넘으면 오래된 날부터 지움. 무게는 루틴에 적힌 무게 그대로(고치기 X) */
  var LG_LS = "ptnote:" + SLUG + ":log", LG = null, LG_PEND = false, LG_T = 0;
  try { LG = JSON.parse(localStorage.getItem(LG_LS) || "null"); LG_PEND = !!(LG && LG.pend); } catch (e) {}
  function lgObj() { if (!LG || typeof LG !== "object") LG = { d: {}, f: {}, at: 0 }; LG.d = LG.d || {}; LG.f = LG.f || {}; return LG; }
  /* 체크 칸 날짜 (2026-11-14 "오늘 하는 날만 체크 칸, 선생님은 전날·오늘 상관없이"):
     회원 = 오늘 요일(순환은 오늘 차례 DAY, 로테이션 날은 고를 수 있는 요일)만 → 오늘 날짜 / 선생님 = 이번 주 그 요일 날짜(앞으로 올 요일은 X, 순환은 오늘 날짜)
     요일 카드의 ✓는 '이번 주 그 날짜' 기록이라 새 주(월요일)가 되면 저절로 비어 있음. 기록은 기록 탭에 그대로 남음 */
  function chkDate(sel) {
    if (DEMO) return null;
    var now = new Date(), today = ymd(now), tk = todayKey(), coach = COACH_MODE;
    if (ROT) return coach || sel === tk ? today : null;
    var td = dayByKey(tk);
    if (sel === tk || (td && td.pick && td.pick.indexOf(sel) >= 0)) return today;
    if (!coach) return null;
    var off = ((DAY_KEYS.indexOf(sel) + 6) % 7) - ((now.getDay() + 6) % 7);
    if (off > 0) return null;
    return ymd(new Date(now.getFullYear(), now.getMonth(), now.getDate() + off));
  }
  function lgDone(name, k) { var t = LG && LG.d && LG.d[k || ymd(new Date())]; return !!t && t.some(function (x) { return x[0] === name; }); }
  function lgPush() {
    clearTimeout(LG_T);
    LG_T = setTimeout(function () {
      if (!ATT_API) return;
      var v = {}; for (var k in LG) if (k !== "pend") v[k] = LG[k];
      rtPost({ a: "kv_set", k: "mw:" + SLUG + ":log", v: v }).then(function (j) {
        if (j && j.ok) { LG_PEND = false; delete LG.pend; try { localStorage.setItem(LG_LS, JSON.stringify(LG)); } catch (e) {} }
      }).catch(function () {});
    }, 900);
  }
  function lgSave() {
    var o = lgObj(); o.at = Date.now(); o.pend = 1; LG_PEND = true;
    var ds = Object.keys(o.d).sort();
    while (ds.length > 1 && JSON.stringify({ d: o.d, f: o.f, at: o.at }).length > 3800) delete o.d[ds.shift()];
    try { localStorage.setItem(LG_LS, JSON.stringify(o)); } catch (e) {}
    lgPush();
  }
  function lgToggle(it, k) {
    k = k || ymd(new Date());
    var o = lgObj(), t = o.d[k] = o.d[k] || [];
    var i = -1; t.forEach(function (x, j) { if (x[0] === it.name) i = j; });
    var kg = 0; (it.sets || []).forEach(function (s) { if (s[1] != null && +s[1] > kg) kg = +s[1]; });
    if (i >= 0) { t.splice(i, 1); if (!t.length) delete o.d[k]; }
    else { t.push([it.name, kg || null, (it.sets || []).length]); if (kg > 0 && !(o.f[it.name] > 0)) o.f[it.name] = kg; }
    lgSave();
    return i < 0;
  }
  function lgServer(kv) {
    var v = kv && kv["mw:" + SLUG + ":log"] || null;
    if (LG_PEND && LG && (!v || (LG.at || 0) >= (v.at || 0))) { lgPush(); return; }   /* 폰에서 체크한 게 아직 안 올라갔으면 다시 보냄 */
    if (!v || (LG && JSON.stringify(v) === JSON.stringify({ d: LG.d, f: LG.f, at: LG.at }))) return;
    if (LG && (LG.at || 0) > (v.at || 0)) { lgPush(); return; }
    LG = v; LG_PEND = false;
    try { localStorage.setItem(LG_LS, JSON.stringify(v)); } catch (e) {}
    if (/^#(log|routine|muscle)/.test(location.hash)) rerender();
  }
  document.addEventListener("click", function (e) {
    var b = e.target.closest && e.target.closest(".exchk[data-chk]");
    if (!b) return;
    e.preventDefault(); e.stopPropagation();
    var d = dayByKey(view.getAttribute("data-day")), it = d && d.items && d.items[+b.getAttribute("data-chk")];
    if (!it) return;
    var dk = b.getAttribute("data-date") || ymd(new Date());
    var on = lgToggle(it, dk), card = b.closest(".ex");
    if (card) card.classList.toggle("done", on);
    b.setAttribute("aria-pressed", String(on));
    if (on) { b.classList.remove("pop"); void b.offsetWidth; b.classList.add("pop"); try { navigator.vibrate && navigator.vibrate(18); } catch (x) {} }
    var kg = 0; (it.sets || []).forEach(function (s) { if (s[1] != null && +s[1] > kg) kg = +s[1]; });
    var dl = dk === ymd(new Date()) ? "" : lgMd(dk) + " ", auto = on && attAuto(dk);
    attToast(on ? "✓ " + dl + it.name + (kg ? " " + kg + "kg" : "") + (auto ? " · 출석 도장도 같이 찍었어요" : " · 기록에 저장했어요") : dl + it.name + " 체크를 풀었어요");
  }, true);
  /* 종목 ✓하면 자동 출석 (2026-11-14 장동욱 "개인운동 나와도 출석을 안 하네") — 그날 출석이 없으면 같이 찍음. ✓를 풀어도 출석은 그대로 */
  function attAuto(dk) {
    if (DEMO) return false;
    var a = attLoad().slice(); if (attHas(a, dk)) return false;
    var now = new Date(), tm = dk === ymd(now) ? pad2(now.getHours()) + ":" + pad2(now.getMinutes()) : "운동기록";
    a.push(dk); attTimes[dk] = tm; attSave(a);
    try { localStorage.setItem(ATT_KEY_T(), JSON.stringify(attTimes)); } catch (e) {}
    if (!ATT_API) return true;
    var go = function () { return attCall("&a=check&d=" + dk + "&t=" + encodeURIComponent(tm) + "&n=" + encodeURIComponent(M._real || M.name)); };
    go().catch(function () { return new Promise(function (ok) { setTimeout(ok, 2500); }).then(go); })
      .then(function () { attRefresh(); badgeCheck(); rkRefresh(); })
      .catch(function () { attToast("출석은 인터넷이 연결되면 다시 찍어 주세요"); });
    return true;
  }
  /* ---- 이번 달 출석 순위 (2026-11-14 "회원끼리 출석 순위") — 선생님 페이지가 열릴 때 창고 pub:all:rank = {ym, at, list:[{s:주소, n:가린 이름, c:횟수}]} 저장
     회원 노트는 그걸 받아서 내 횟수만 지금 폰 기록으로 바꿔 순위를 다시 셈. 이름은 가운데 글자 O */
  var RK_LS = "ptnote:rank", RK = null;
  try { RK = JSON.parse(localStorage.getItem(RK_LS) || "null"); } catch (e) {}
  /* 이달의 출석왕 (2026-11-19 "한 달 동안 1등인 사람이 받는 배지"): 선생님 페이지가 끝난 달마다 1등(동점이면 모두)을 pub:all:rankwin = {at, w:{"YYYY-MM":[주소]}} 로 올림 → 배지 king */
  var RKW_LS = "ptnote:rankwin", RKW = null;
  try { RKW = JSON.parse(localStorage.getItem(RKW_LS) || "null"); } catch (e) {}
  function rkWins() { var w = (RKW && RKW.w) || {}; return Object.keys(w).filter(function (m) { return Array.isArray(w[m]) && w[m].indexOf(SLUG) >= 0; }).sort(); }
  function rkServer(kv) {
    var wv = kv && kv["pub:all:rankwin"];
    if (wv && wv.w && typeof wv.w === "object") { RKW = wv; try { localStorage.setItem(RKW_LS, JSON.stringify(wv)); } catch (e) {} }
    var v = kv && kv["pub:all:rank"] || null;
    if (!v || JSON.stringify(v) === JSON.stringify(RK)) return;
    RK = v; try { localStorage.setItem(RK_LS, JSON.stringify(v)); } catch (e) {}
    rkRefresh();
  }
  function rkRefresh() { var hr = document.getElementById("rkHome"); if (hr) hr.outerHTML = rankHome(); var r = document.getElementById("rank"); if (r) { r.outerHTML = rankSection(r.getAttribute("data-num")); setupFold(view.getAttribute("data-tab") || "goal"); } }
  function rkMask(n) {
    return String(n || "").split("·").map(function (p) { p = p.trim(); return p.length <= 1 ? p : p.length === 2 ? p.charAt(0) + "O" : p.charAt(0) + new Array(p.length - 1).join("O") + p.charAt(p.length - 1); }).join(" · ");
  }
  function rkCalc() {   /* 이번 달 순위표 {L, my, mine} — 나 탭 순위 칸·홈 순위 칸이 같이 씀 */
    var ym = ymd(new Date()).slice(0, 7), mine = attLoad().filter(function (k) { return k.slice(0, 7) === ym; }).length;
    var L = (RK && RK.ym === ym && Array.isArray(RK.list) ? RK.list : []).filter(function (x) { return x.s !== SLUG; }).map(function (x) { return { n: x.n, c: +x.c || 0 }; });
    L.push({ n: rkMask(M._real || M.name), c: mine, me: 1 });
    L = L.filter(function (x) { return x.c > 0 || x.me; }).sort(function (a, b) { return b.c - a.c || (b.me ? 1 : 0) - (a.me ? 1 : 0); });
    var rank = 0, prev = -1, my = 0;
    L.forEach(function (x, i) { if (x.c !== prev) { rank = i + 1; prev = x.c; } x.r = rank; if (x.me) my = rank; });
    return { L: L, my: my, mine: mine };
  }
  function rankHome() {   /* 홈 출석 순위 칸 (2026-11-18 "홈에도 작게 사각으로, 선생님 공지 칸 크기에 맞게") → 나 탭 순위 칸으로 */
    var R = rkCalc(), now = new Date(), solo = R.L.length < 2;
    var cup = '<span class="hi-ic bellc" aria-hidden="true"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M8 4h8v5a4 4 0 0 1-8 0z"/><path d="M8 6H5a3 3 0 0 0 3 4M16 6h3a3 3 0 0 1-3 4"/><path d="M12 13v4M8.5 20h7M10 17h4"/></svg></span>';
    /* 미니 가로 막대 (2026-11-18 "누군지 써줘야 라이벌 의식"): 위 3명 + 나, 가린 이름·막대·횟수, 내 줄만 색 */
    var L = R.L.filter(function (x, i) { return i < 3 || x.me; }).slice(0, 4), mx = Math.max(1, R.L[0].c);
    var bars = L.map(function (x) { return '<span class="' + (x.me ? 'me' : '') + '"><b>' + (x.me ? '나' : esc(String(x.n).split('·')[0].trim())) + '</b><i><u style="width:' + Math.max(6, Math.round(x.c / mx * 100)) + '%"></u></i><em>' + x.c + '</em></span>'; }).join("");
    var no = R.mine && !solo ? '<b class="rkh-no">' + R.my + '<i>등</i></b>' : '<i class="hi-go">›</i>';
    return '<a class="hw col hi rkh" id="rkHome" href="#goal-rank" aria-label="' + (now.getMonth() + 1) + '월 출석 순위' + (R.mine ? ' ' + R.my + '등, ' + R.mine + '회' : '') + '"><span class="hi-top">' + cup + no + '</span><small>' + (now.getMonth() + 1) + '월 출석 순위 · ' + R.mine + '회</small><span class="rkh-ch" aria-hidden="true">' + bars + '</span></a>';
  }
  function rankSection(num) {
    var now = new Date(), R = rkCalc(), L = R.L, my = R.my, mine = R.mine, max = Math.max(1, L[0].c);
    var show = L.filter(function (x, i) { return i < 5 || x.me; });
    var sub = mine ? (my === 1 ? "이번 달 1등이에요! 👑" : "지금 " + my + "등" + (function () { var up = L.filter(function (x) { return x.c > mine; }), t = up[up.length - 1]; return t ? " · " + (t.c - mine) + "번 더 오면 " + t.r + "등" : ""; })()) : "출석 도장을 찍으면 순위에 올라가요";
    var h = '<section id="rank" data-num="' + num + '">' + head(num, (now.getMonth() + 1) + "월 출석 순위", sub) + '<div class="panel rklist">';
    h += show.map(function (x) {
      return '<div class="rk' + (x.me ? ' me' : '') + (x.r <= 3 && x.c ? ' r' + x.r : '') + '"><span class="no">' + (x.r <= 3 && x.c ? ["", "🥇", "🥈", "🥉"][x.r] : x.r) + '</span>' +
        '<span class="nm"><b>' + esc(x.n) + (x.me ? ' <i>나</i>' : '') + '</b><span class="rk-bar"><i style="width:' + Math.round(x.c / max * 100) + '%"></i></span></span><span class="cnt">' + x.c + '회</span></div>';
    }).join("");
    if (L.length < 2) h += '<p class="rk-note">다른 회원님 순위는 곧 보여요</p>';
    else h += '<p class="rk-note">PT 노트 출석 도장 · 운동 ✓ 기준 · 이름은 가려서 보여요</p>';
    return h + '</div></section>';
  }
  function lgMd(k) { var p = k.split("-"), dt = new Date(+p[0], +p[1] - 1, +p[2]); return (+p[1]) + ". " + (+p[2]) + " (" + "일월화수목금토"[dt.getDay()] + ")"; }
  function renderLog() {
    var L = (LG && LG.d) || {}, now = new Date(), today = ymd(now), T = L[today] || [], att = attLoad();
    var mon = new Date(now.getFullYear(), now.getMonth(), now.getDate() - (now.getDay() + 6) % 7), wn = 0, wk = "";
    for (var i = 0; i < 7; i++) {
      var dt = new Date(mon.getFullYear(), mon.getMonth(), mon.getDate() + i), k = ymd(dt), on = !!(L[k] && L[k].length) || att.indexOf(k) >= 0;
      if (on) wn++;
      wk += '<span class="' + (on ? 'on' : '') + (k === today ? ' now' : '') + '"><i>' + (on ? '✓' : '') + '</i><small>' + "월화수목금토일"[i] + '</small></span>';
    }
    var ym = today.slice(0, 7), mo = 0; Object.keys(L).forEach(function (k) { if (k.slice(0, 7) === ym) mo += L[k].length; });
    var G = grData(), kp = G.lifts.length ? esc(G.lifts[0].name) + " 처음 " + grKg(G.lifts[0].a) + " → 지금 " + grKg(G.lifts[0].b) + "kg! 꾸준함이 무게가 됐어요" : "한 종목 끝날 때마다 ✓ 꾹 — 그게 다 기록이 돼요";
    var h = '<div class="hero"><div class="hero-main"><div class="hero-l"><div class="eyebrow">MY LOG <b>· 운동 기록</b></div>' +
      '<h1>이번 주 ' + wn + '일 운동했어요</h1><div class="en">' + esc(M.name) + ' 회원님 · 운동 탭에서 ✓한 종목이 여기 쌓여요</div>' +
      '<div class="who"><strong>이번 달 ' + mo + '종목 완료</strong><span>담당 ' + esc(TRN) + ' 트레이너</span></div>' +
      '<div class="lgweek">' + wk + '</div></div></div>' +
      '<div class="keypoint"><small>KEY POINT</small><p>' + kp + '</p></div></div>';
    var rows = T.map(function (x) {
      return '<li><span class="lg-ck" aria-hidden="true">✓</span><b>' + esc(x[0]) + '</b><small>' + (x[2] || "") + '세트</small><em>' + (x[1] ? x[1] + 'kg' : '맨몸') + '</em></li>';
    }).join("");
    var past = Object.keys(L).filter(function (k) { return k < today && L[k].length; }).sort().reverse().slice(0, 5).map(function (k) {
      var a = L[k], top = a.slice().sort(function (x, y) { return (y[1] || 0) - (x[1] || 0); })[0];
      return '<li><span>' + lgMd(k) + '</span><b>' + a.length + '종목</b><em>' + esc(top[0]) + (top[1] ? ' ' + top[1] + 'kg' : '') + '</em></li>';
    }).join("");
    h += '<section id="lgtoday">' + head("01", "오늘 한 운동", T.length ? T.length + "종목 완료" : "운동 탭에서 ✓하면 여기 쌓여요") +
      '<div class="panel lglist">' + (T.length ? '<ul class="lg-today">' + rows + '</ul>' :
        '<div class="lg-empty"><p>아직 오늘 ✓한 종목이 없어요</p><a class="btn fill" href="#routine-' + todayKey() + '">오늘 운동하러 가기 →</a></div>') +
      (past ? '<div class="lg-past"><h4>지난 기록</h4><ul>' + past + '</ul></div>' : '') + '</div></section>';
    var gl = G.lifts.length ? G.lifts : G.top;
    h += '<section id="lggrow">' + head("02", "첫날 vs 오늘", "✓한 무게로 자동으로 채워져요") + grLink() +
      (gl.length ? '<div class="panel lg-grow"><h4>' + (G.lifts.length ? '처음 무게 → 지금 무게' : '지금 나의 무게 · ✓할수록 처음 무게가 쌓여요') + '</h4>' + gl.map(function (l) {
        return '<div class="lg-g"><b>' + esc(l.name) + '</b>' + (l.a != null ? '<span><i>' + grKg(l.a) + '</i> → <em>' + grKg(l.b) + 'kg</em></span><u>+' + grKg(l.up) + '</u>' : '<span><em>' + grKg(l.b) + 'kg</em></span>') + '</div>';
      }).join("") + '</div>' : '') + '</section>';
    h += muscleSection("03");
    if (IB_ON) h += '<section id="inbody">' + head("04", "몸 변화 · 인바디", "지난달과 비교해요", '<a class="more" href="#body">흐름 보기</a>') + ibPanel() + '</section>';
    return h + remember();
  }
  function grServer(kv) {
    var v = kv && kv["pub:m:" + SLUG + ":growth"] || null;
    if (JSON.stringify(v) === JSON.stringify(GR)) return;
    GR = v;
    try { if (v) localStorage.setItem(GR_LS, JSON.stringify(v)); else localStorage.removeItem(GR_LS); } catch (e) {}
    if (/^#growth/.test(location.hash)) rerender();
  }
  function grNowW() {   /* 지금 루틴: 종목 → 가장 무거운 kg */
    var o = {};
    ((M.routine && M.routine.days) || []).forEach(function (d) {
      (d.items || []).forEach(function (it) {
        (it.sets || []).forEach(function (st) { var kg = +st[1]; if (st[1] != null && kg > 0 && (!o[it.name] || kg > o[it.name])) o[it.name] = kg; });
      });
    });
    return o;
  }
  function grBase() { var o = {}, k, a = M.start_weights || {}, b = (GR && GR.w) || {}, f = (LG && LG.f) || {}; for (k in f) if (+f[k] > 0) o[k] = +f[k]; for (k in a) o[k] = +a[k]; for (k in b) if (b[k] != null && b[k] !== "") o[k] = +b[k]; return o; }
  function grData() {
    var now = new Date(), st = M.journey && M.journey.start ? jDate(M.journey.start) : null, a = attLoad().slice().sort();
    if (!st && a.length) { var p = a[0].split("-"); st = new Date(+p[0], +p[1] - 1, +p[2]); }
    var days = st ? Math.max(1, Math.floor((new Date(now.getFullYear(), now.getMonth(), now.getDate()) - st) / 86400000) + 1) : 0;
    var nw = grNowW(), bw = grBase(), lifts = [], top = [];
    Object.keys(nw).forEach(function (k) {
      if (bw[k] > 0 && nw[k] > bw[k]) lifts.push({ name: k, a: bw[k], b: nw[k], up: nw[k] - bw[k], pct: (nw[k] - bw[k]) / bw[k] });
      top.push({ name: k, b: nw[k] });
    });
    lifts.sort(function (x, y) { return y.pct - x.pct || y.up - x.up; });
    top.sort(function (x, y) { return y.b - x.b; });
    var ib = null;
    if (IB_ON && ibData && ibData.length > 1) { var r = ibData.slice().sort(function (x, y) { return x.d < y.d ? -1 : 1; }); ib = { a: r[0], b: r[r.length - 1] }; }
    return { st: st, days: days, att: a.length, forms: (M.forms || []).length, badges: badgeList().filter(function (b) { return b.on; }).length,
      lifts: lifts.slice(0, 4), top: top.slice(0, 4), ib: ib, ver: M.routine && M.routine.version, now: journeyNow() };
  }
  function grKg(n) { return (Math.round(n * 10) / 10) + ""; }
  function grCard(G) {
    var tile = function (lab, v, unit, cls) { return '<div class="rp-tile ' + (cls || '') + '"><span>' + lab + '</span><p><b>' + v + '</b><small>' + unit + '</small></p></div>'; };
    var left;
    if (G.lifts.length) {
      left = '<div class="rp-box gr-lifts"><h4>처음 무게 → 지금 무게</h4>' + G.lifts.map(function (l) {
        return '<div class="gr-l"><span>' + esc(l.name) + '</span><p><i>' + grKg(l.a) + '</i><em>→</em><b>' + grKg(l.b) + '<small>kg</small></b><u>+' + grKg(l.up) + 'kg</u></p></div>';
      }).join("") + '</div>';
    } else {
      left = '<div class="rp-box gr-lifts"><h4>지금 나의 무게</h4>' + (G.top.length ? G.top.map(function (l) {
        return '<div class="gr-l"><span>' + esc(l.name) + '</span><p><b>' + grKg(l.b) + '<small>kg</small></b></p></div>';
      }).join("") : '<p>루틴이 올라오면 여기에 무게가 쌓여요</p>') + '</div>';
    }
    var right = '';
    if (G.ib) {
      right += '<div class="rp-box rp-ib"><h4>인바디 · 첫 기록 → 지금</h4>' + [["골격근량", "smm", 1], ["체지방량", "bfm", -1], ["체중", "w", 0]].map(function (r) {
        var dl = Math.round((G.ib.b[r[1]] - G.ib.a[r[1]]) * 10) / 10, cls = !r[2] || !dl ? "" : (dl > 0) === (r[2] > 0) ? "up" : "down";
        return '<div class="rp-ibr"><span>' + r[0] + '</span><b class="' + cls + '">' + (dl > 0 ? "+" : dl < 0 ? "−" : "") + ibFmt(Math.abs(dl)) + '<small> kg</small></b></div>';
      }).join("") + '</div>';
    }
    right += '<div class="rp-box gr-path"><h4>지금 나의 자리</h4>' +
      (G.now ? '<p><b>' + (G.now.month ? G.now.month + '개월차' : '시작') + '</b> · ' + G.now.stage.no + '단계 ' + esc(G.now.stage.short) + '</p>' : '') +
      (G.ver ? (parseInt(String(G.ver).replace(/\D/g, ""), 10) > 1 ? '<p>루틴을 <b>' + esc(G.ver) + '</b>까지 함께 바꿔 왔어요</p>' : '<p>나만의 루틴 <b>' + esc(G.ver) + '</b>로 운동 중</p>') : '') +
      '<p>배운 자세 <b>' + G.forms + '개</b> · 받은 배지 <b>' + G.badges + '개</b></p></div>';
    var quote, qwho;
    if (GR && GR.note) { quote = esc(GR.note).replace(/\n/g, "<br>"); qwho = TRN + " 트레이너의 한마디"; }
    else {
      qwho = "지금까지 한 줄 요약";
      quote = G.lifts.length ? "처음 " + esc(G.lifts[0].name) + " " + grKg(G.lifts[0].a) + "kg에서 지금 " + grKg(G.lifts[0].b) + "kg까지 왔어요.<br>다음 목표도 같이 만들어 가요!" :
        G.days > 1 ? G.days + "일 동안 함께 걸어왔어요.<br>이 꾸준함이 몸을 바꿔요!" : "오늘이 첫날이에요.<br>여기서부터 같이 쌓아 가요!";
    }
    var d = new Date();
    return '<div class="rp gr" id="rp"><i class="rp-stripe"></i><i class="rp-c1"></i><i class="rp-c2"></i>' +
      '<div class="rp-top"><div class="rp-brand"><b>' + esc(BRAND) + '</b><span>' + esc(BRANCH) + '</span></div><span class="rp-k">MY GROWTH · ' + d.getFullYear() + '. ' + pad2(d.getMonth() + 1) + '. ' + pad2(d.getDate()) + '</span></div>' +
      '<div class="rp-title"><span>' + esc(M.name) + ' 회원님의</span><h2>첫날 vs 오늘</h2>' +
      (G.st ? '<em>' + G.st.getFullYear() + '. ' + (G.st.getMonth() + 1) + '. ' + G.st.getDate() + ' 시작 · 함께한 지 ' + G.days + '일</em>' : '') + '</div>' +
      '<div class="rp-tiles">' + tile("함께한 날", G.days, "일", "pk") + tile("출석 도장", G.att, "회") + tile("배운 자세", G.forms, "개") + tile("받은 배지", G.badges, "개", "gd") + '</div>' +
      '<div class="rp-mid gr-mid">' + left + '<div class="rp-side">' + right + '</div></div>' +
      '<div class="rp-quote"><span aria-hidden="true">“</span><div><p>' + quote + '</p><small>' + qwho + '</small></div></div>' +
      '<div class="rp-foot"><span><b>MY PT NOTE</b> · 나만의 운동 노트</span><span>' + esc(BRN) + ' · 담당 ' + esc(TRN) + ' 트레이너</span></div></div>';
  }
  function renderGrowth() {
    var G = grData(), coach = COACH_MODE && !DEMO;
    return '<div class="rp-nav"><a href="#log" class="rp-back">← 기록</a><b class="gr-navt">성장 기록</b></div>' +
      '<div class="rp-frame" id="rpFrame">' + grCard(G) + '</div>' +
      '<button type="button" class="btn fill rp-save" id="rpSave"><svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M12 4v11"/><path d="m7 10 5 5 5-5"/><path d="M5 20h14"/></svg>이미지로 저장 · 공유</button>' +
      (coach ? '<button type="button" class="btn gr-edit" id="grEdit">✎ 처음 무게 · 선생님 한마디 넣기</button>' +
        '<p class="rp-hint">선생님 보기에만 보여요. 첫날 무게를 넣으면 "처음 → 지금"으로 비교돼요.' + (G.lifts.length ? '' : ' 지금은 처음 무게가 없어서 "지금 나의 무게"로 나와요.') + '</p>' :
        '<p class="rp-hint">처음 왔던 날과 비교해 봐요. 숫자는 출석·루틴·인바디로 자동으로 바뀌어요.</p>') + remember();
  }
  function grSheet() {
    var nw = grNowW(), bw = grBase(), names = Object.keys(nw);
    var rows = names.length ? names.map(function (k, i) {
      return '<div class="gr-row"><span>' + esc(k) + '<small>지금 ' + grKg(nw[k]) + 'kg</small></span><input id="gw' + i + '" data-n="' + esc(k) + '" type="number" inputmode="decimal" step="0.5" min="0" placeholder="처음 kg" value="' + (bw[k] > 0 ? grKg(bw[k]) : '') + '"></div>';
    }).join("") : '<p class="rts-note">루틴에 무게가 있는 종목이 없어요.</p>';
    var body = '<p class="rts-note">회원님이 처음 왔을 때 무게(kg)를 넣어 주세요. 비운 종목은 비교에서 빠져요.</p>' +
      (names.length ? '<button type="button" class="rtb gr-fill" id="grFill">빈 칸은 지금 무게로 채우기</button>' : '') +
      '<div class="gr-rows">' + rows + '</div>' +
      '<label>선생님 한마디 <small>(비우면 자동 요약)</small><textarea id="grNote" rows="3" placeholder="처음엔 랫풀다운 20kg도 버거웠는데…">' + esc(GR && GR.note || "") + '</textarea></label>' +
      '<label id="grKeyWrap"' + (rtKey() ? ' hidden' : '') + '>선생님 열쇠 <small>처음 한 번만</small><input id="grKey" type="password" autocomplete="off"></label>';
    var sh = rtSheet("첫날 vs 오늘 · 처음 기록", body, function (sh) {
      var key = fv(sh, "grKey") || rtKey();
      if (!key) { sh.querySelector("#grKeyWrap").hidden = false; return "선생님 열쇠를 넣어 주세요"; }
      var w = {};
      Array.prototype.forEach.call(sh.querySelectorAll(".gr-rows input"), function (x) { var v = parseFloat(x.value); if (v > 0) w[x.getAttribute("data-n")] = v; });
      var old = (GR && GR.w) || {}, k;
      for (k in old) if (!(k in nw) && !(k in w)) w[k] = old[k];   /* 지금 루틴에 없는 옛 종목 기록은 그대로 둠 */
      var v = { w: w, note: fv(sh, "grNote"), at: ymd(new Date()) };
      var ok = sh.querySelector("[data-ok]"); ok.disabled = true; ok.textContent = "저장 중…"; sh.msg("");
      rtPost({ a: "kv_set", key: key, k: "pub:m:" + SLUG + ":growth", v: v }).then(function (j) {
        if (!j || !j.ok) { ok.disabled = false; ok.textContent = "저장"; sh.msg(j && j.error === "key" ? "선생님 열쇠가 맞지 않아요" : rtNetMsg()); if (j && j.error === "key") sh.querySelector("#grKeyWrap").hidden = false; return; }
        try { localStorage.setItem("ptkey", key); localStorage.setItem(GR_LS, JSON.stringify(v)); } catch (x) {}
        GR = v; sh.close(); rerender(); attToast("성장 기록에 바로 반영됐어요");
      }).catch(function () { ok.disabled = false; ok.textContent = "저장"; sh.msg(rtNetMsg()); });
      return true;
    }, "저장");
    var fb = sh.querySelector("#grFill");
    if (fb) fb.addEventListener("click", function () {
      Array.prototype.forEach.call(sh.querySelectorAll(".gr-rows input"), function (x) { if (!x.value) x.value = grKg(nw[x.getAttribute("data-n")]); });
    });
  }
  function grSeed(key) {   /* 선생님이 루틴을 저장할 때: 처음 기록이 없는 종목은 그때 무게를 처음 무게로 */
    var nw = grNowW(), bw = grBase(), w = {}, add = 0, k;
    for (k in (GR && GR.w) || {}) w[k] = GR.w[k];
    for (k in nw) if (!(bw[k] > 0)) { w[k] = nw[k]; add++; }
    if (!add) return;
    var v = { w: w, note: GR && GR.note || "", at: GR && GR.at || ymd(new Date()) };
    rtPost({ a: "kv_set", key: key, k: "pub:m:" + SLUG + ":growth", v: v }).then(function (j) {
      if (j && j.ok) { GR = v; try { localStorage.setItem(GR_LS, JSON.stringify(v)); } catch (x) {} }
    }).catch(function () {});
  }
  function setupGrowth() {
    setupReport();
    var e = document.getElementById("grEdit"); if (e) e.addEventListener("click", grSheet);
  }
  function grLink() {
    return '<a class="rp-home gr-link" href="#growth"><span class="rh-ic" aria-hidden="true"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 17l6-6 4 4 8-8"/><path d="M15 7h6v6"/></svg></span>' +
      '<span class="rh-t"><small>MY GROWTH</small><b>첫날 vs 오늘 · 나의 성장 기록</b><em>처음 왔던 날과 지금을 숫자로 비교해요</em></span><span class="rh-go" aria-hidden="true">›</span></a>';
  }
  function reportHomeCard() {   /* 매달 1~7일: 지난달 리포트 도착 */
    var now = new Date();
    if (now.getDate() > 7) return "";
    var ym = ymAdd(ymOf(now), -1), st = startDate();
    if (!st || ymOf(st) > ym) return "";
    var R = reportData(ym);
    if (!R.done) return "";
    return '<a class="rp-home" href="#report-' + ym + '"><span class="rh-ic" aria-hidden="true"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="5" y="3" width="14" height="18" rx="2.5"/><path d="M9 8h6M9 12h6M9 16h3"/></svg></span>' +
      '<span class="rh-t"><small>MONTHLY REPORT</small><b>' + R.mo + '월 리포트가 도착했어요</b><em>출석 ' + R.done + '회 · 출석률 ' + R.rate + '%' + (R.badges.length ? ' · 새 배지 ' + R.badges.length + '개' : '') + '</em></span>' +
      '<span class="rh-go" aria-hidden="true">›</span></a>';
  }

  /* ---------------- 홈 */
  function exMini(d) {
    return '<ul class="mini">' + d.items.map(function (it, i) {
      return '<li><span class="mini-ic' + (it.tag === "메인" ? " main" : "") + '">' + img(iconOf(it), "", true) + '<span class="n">' + (i + 1) + '</span></span>' + esc(it.name) +
        (it.tag ? ' ' + tagChip(it.tag) : '') + '</li>';
    }).join("") + '</ul>';
  }
  function todayHero(k, d) {   /* 홈 오늘 운동 큰 카드 (남 블랙 / 여 핑크레드) */
    var go = function (t) { return '<a class="th-go" href="#routine-' + k + '">' + t + '</a>'; };
    var top = function (eye, title, sub) { return '<div><div class="th-eye">' + eye + '</div><h2>' + title + '</h2>' + (sub ? '<p class="th-sub">' + sub + '</p>' : '') + '</div>'; };
    var label = ROT ? dayName(k) : DAY_KO[k] + "요일";
    if (!d) return '<div class="thero">' + top("TODAY", "루틴이 아직 없어요", "선생님이 곧 올려드릴게요") + '</div>';
    if (d.rest) return '<div class="thero">' + top("TODAY · REST DAY", label + " 쉬는 날", "푹 쉬고 잘 먹는 것도 운동이에요") + '</div>';
    if (d.cardio_only) return '<div class="thero">' + top("TODAY · CARDIO", label + " 유산소만!", "유산소 " + d.cardio_only + "분" + (M.routine.cardio ? " · " + esc(M.routine.cardio.options) : "")) + go("오늘 운동 보기 →") + '</div>';
    if (d.pick) return '<div class="thero">' + top("TODAY · " + esc(d.en.toUpperCase()), "오늘은 골라서 하는 날!", esc(d.note || "이번 주에 아쉬웠던 부위 하나를 골라 그 요일 루틴 그대로 해요")) + go("부위 고르러 가기 →") + '</div>';
    var its = d.items || [], mi = mainItem(d);
    var tiles = its.map(function (it) {
      var main = it === mi && it.tag === "메인";
      return '<a class="th-tile' + (main ? ' main' : '') + '" href="#routine-' + k + '">' + (main ? '<em>메인</em>' : '') + img(iconOf(it), "icn", !main) + '<span>' + esc(it.name) + '</span></a>';
    }).join("");
    return '<div class="thero">' + top("TODAY · " + esc(String(d.en || "").toUpperCase()), label + " " + esc(d.part),
        its.length + "종목" + (d.cardio && M.routine.cardio ? " · 마무리 유산소 " + M.routine.cardio.minutes + "분" : "")) +
      '<div class="th-tiles">' + tiles + '</div>' + go("오늘 운동 시작하기 →") +
      (ROT ? '<p class="th-hint">출석 도장 찍은 날을 세서 다음 순서를 알려줘요. 순서가 다르면 루틴 탭에서 그날 DAY를 눌러요</p>' : '') + '</div>';
  }
  /* 회원 메모 (2026-11-12): 선생님 보기에서만 홈 맨 위 — assets/memo.js(PTMemo), 창고 coach:memo:<주소>(선생님 열쇠로만 읽힘) */
  /* 2026-11-12 "메모칸 간소화 — 상단에 작은 아이콘으로": 홈 칸 대신 위 막대 종 왼쪽 📝 동그라미(메모 개수 배지, 고정 메모 있으면 금색) → 누르면 메모 창 */
  function cmemoDraw(list) {
    var b = document.getElementById("memoBtn"); if (!b) return;
    var n = (list || []).length, pin = (list || []).some(function (x) { return x.pin; });
    b.classList.toggle("pin", pin);
    b.querySelector("i").textContent = n ? (n > 9 ? "9+" : n) : "";
    b.querySelector("i").hidden = !n;
    b.setAttribute("aria-label", "선생님 메모" + (n ? " " + n + "개" : "") + " (회원님께는 안 보여요)");
    b.title = n ? window.PTMemo.line(list) : "선생님 메모 — 회원님께는 안 보여요";
  }
  function cmemoFill() {
    if (!(COACH_MODE && !DEMO)) return;
    var r = document.querySelector(".bar-r"); if (!r || document.getElementById("memoBtn")) return;
    var b = document.createElement("button"); b.type = "button"; b.className = "memob"; b.id = "memoBtn";
    b.innerHTML = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M5 4h10l4 4v12H5z"/><path d="M14 4v5h5M8.5 13h7M8.5 16.5h5"/></svg><i hidden></i>';
    r.insertBefore(b, r.firstChild);
    b.addEventListener("click", function () { if (window.PTMemo) window.PTMemo.open(SLUG, M.name, cmemoDraw); });
    function go() { window.PTMemo.load(SLUG).then(function (o) { cmemoDraw(o ? o[SLUG] : []); }); }
    if (window.PTMemo) return go();
    var sc = document.createElement("script"); sc.src = BASE + "memo.js"; sc.onload = go; document.head.appendChild(sc);
  }
  function reelsHome() {   /* 2026-11-23 "A로 가볼까" — 홈 하단 장동욱TR 인스타 릴스 가로 줄 + 팔로우 (목록은 site.js reels) */
    var S = window.SITE || {}, L = (S.reels || []).slice(0, 8);
    if (!L.length || !S.ig) return "";
    var prof = "https://www.instagram.com/" + S.ig + "/";
    var h = '<section class="reels"><div class="rl-head"><b><i aria-hidden="true"></i>' + esc(S.trainer || "") + 'TR 운동 릴스</b><a href="' + prof + '" target="_blank" rel="noopener">전체보기 ›</a></div><div class="rl-row">';
    L.forEach(function (r) {
      h += '<a class="rl-it' + (r.c ? ' has-c' : '') + '" href="' + esc(r.u) + '" target="_blank" rel="noopener">' +
        (r.c ? '<img src="' + esc(r.c) + '" alt="" loading="lazy">' : '<span class="rl-tag">REEL</span><img class="rl-lg" src="/assets/logo.png" alt="">') +
        '<svg class="rl-pl" viewBox="0 0 24 24" aria-hidden="true"><path d="M8 5v14l11-7z" fill="currentColor"/></svg>' +
        (r.c ? '' : '<span class="rl-t">' + esc(r.t) + '</span>') + '</a>';
    });
    return h + '</div><a class="rl-fol" href="' + prof + '" target="_blank" rel="noopener"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><rect x="3" y="3" width="18" height="18" rx="5"/><circle cx="12" cy="12" r="4"/><circle cx="17.5" cy="6.5" r="1" fill="currentColor"/></svg>@' + esc(S.ig) + ' 팔로우</a></section>';
  }
  function renderHome() {
    var k = todayKey(), d = dayByKey(k), now = new Date();
    var h = '<div class="hlead hl-bdg">' + bgHomeChip() + '<p>' + esc(M.name) + ' 회원님 · ' + (now.getMonth() + 1) + '월 ' + now.getDate() + '일 ' + DAY_KO[DAY_KEYS[now.getDay()]] + '요일</p><h1>오늘</h1></div>';
    h += attCheckStrip();
    h += todayHero(k, d);
    h += homeWidgets();
    h += instHomeCard();
    h += reportHomeCard();
    h += homeInfo();   /* 2026-11-18 공지·복습지·출석 순위 칸을 PT 여정 위로 */
    if (IB_ON) h += ibHomeStrip() || '<span class="ibstrip-slot"></span>';   /* 2026-11-19 인바디·식단 2칸 — 공지·복습지 칸 바로 아래 */
    h += journeyHome();
    h += reelsHome();

    if (M.next_class) {
      h += '<div class="panel next"><svg width="40" height="40" viewBox="0 0 40 40" aria-hidden="true"><rect x="4" y="7" width="32" height="29" rx="6" fill="var(--primary)"/><rect x="4" y="7" width="32" height="9" rx="4" fill="var(--side)"/><rect x="11" y="3" width="4" height="9" rx="2" fill="var(--key)"/><rect x="25" y="3" width="4" height="9" rx="2" fill="var(--key)"/></svg>' +
        '<div><small style="font-size:12px;color:var(--faint);font-weight:700">다음 PT 수업</small><b>' + esc(M.next_class) + '</b></div></div>';
    }

    return h + remember();
  }

  /* ---------------- 공지 */
  function noticeCard(n) {
    return '<div class="panel notice" data-nkey="' + esc(nKey(n)) + '"><time>' + esc(n.date) + (n.all ? '<span class="nall">전체 공지</span>' : '') + (n.wn ? '<span class="nall nup">업데이트</span>' : '') + '</time><h3>' + esc(n.title) + '</h3><p' + (n.wn ? ' class="nup-p"' : '') + '>' + esc(n.body) + '</p>' +
      (n.wn ? '<a class="btn fill" href="#home" data-wn="' + esc(n.wn) + '">새 기능 둘러보기 →</a>' : '') +
      (n.link ? '<a class="btn" href="#' + esc(n.link) + '">바로 보기</a>' : '') + '</div>';
  }
  function renderNotice() {
    var h = meSeg("notice") + '<section>' + head("", "선생님 공지", "새 소식이 위에 있어요");
    h += (M.notices && M.notices.length) ? M.notices.map(noticeCard).join("") :
      '<div class="panel empty"><h3>아직 공지가 없어요</h3></div>';
    return h + '</section>' + remember();
  }

  /* ---------------- 새 공지 팝업 (2026-11-05 장동욱 요청)
     안 본 새 공지가 있으면 페이지를 열 때 위에서 내려왔다가 몇 초 뒤 올라가며 사라짐. 누르면 공지 탭의 그 공지로 이동(반짝 표시).
     - 공지 하나당 팝업은 한 번만(npop). 공지 탭을 열기 전까지 아래 '공지' 탭에 빨간 점(nseen).
     - 날짜가 NOTICE_DAYS일 넘은 공지는 새 공지로 치지 않음. 기록은 회원 휴대폰(localStorage)에만. */
  var NSEEN_KEY = "ptnote:" + SLUG + ":nseen", NPOP_KEY = "ptnote:" + SLUG + ":npop";
  var NOTICE_DAYS = 14, NPOP_MS = 5500, pendingNotice = null;
  function nKey(n) { return (n.date || "") + "|" + (n.title || ""); }
  function lsArr(k) { try { var a = JSON.parse(localStorage.getItem(k) || "[]"); return Array.isArray(a) ? a : []; } catch (e) { return []; } }
  function lsAdd(k, add) {
    var a = lsArr(k);
    add.forEach(function (x) { if (a.indexOf(x) < 0) a.push(x); });
    try { localStorage.setItem(k, JSON.stringify(a.slice(-80))); } catch (e) {}
  }
  function nDate(n) { var m = String(n.date || "").match(/(\d{4})\D+(\d{1,2})\D+(\d{1,2})/); return m ? new Date(+m[1], +m[2] - 1, +m[3]) : null; }
  function nUnseen() {
    var seen = lsArr(NSEEN_KEY), d0 = Date.now() - NOTICE_DAYS * 86400000;
    return (M.notices || []).filter(function (n) { var d = nDate(n); return (!d || d.getTime() >= d0) && seen.indexOf(nKey(n)) < 0; });
  }
  function nDot() {
    var a = document.querySelector('.bar .bell');
    if (a) a.classList.toggle("has-new", nUnseen().length > 0);
  }
  function nMarkSeen() { lsAdd(NSEEN_KEY, (M.notices || []).map(nKey)); lsAdd(NPOP_KEY, (M.notices || []).map(nKey)); nDot(); }
  function openNotice(key) {
    pendingNotice = key;
    if ((location.hash || "").replace(/^#/, "") === "notice") route(); else location.hash = "notice";
  }
  function showNoticePop() {
    if (TOUR_ON || WN_WANT || (TOUR_WANT && (!location.hash || location.hash === "#home"))) return;   /* 2026-11-22 "상단 팝업만 뜨고 튜토리얼로 안 넘어가" — 안 본 새 기능이 있으면 어느 화면이든 팝업 대신 튜토리얼(wnMaybe) */
    var popped = lsArr(NPOP_KEY);
    var wsn = COACH_MODE ? "" : wnSeen();
    var list = nUnseen().filter(function (n) { return popped.indexOf(nKey(n)) < 0 && !(n.wn && wsn && n.wn <= wsn); });   /* 이미 본 소식보다 예전 업데이트 공지는 다시 안 띄움 */
    if (!list.length) return;
    var n = list[0], extra = list.length - 1, d = nDate(n);
    if (n.wn && !COACH_MODE && !DEMO && !TRY && window.self === window.top && WN.some(function (w) { return w.id === n.wn; })) { lsAdd(NPOP_KEY, [nKey(n)]); wnStart(n.wn); return; }   /* 업데이트 공지는 팝업 말고 바로 튜토리얼 */
    lsAdd(NPOP_KEY, list.map(nKey));
    var box = document.createElement("div");
    box.className = "npop-wrap"; box.setAttribute("role", "status"); box.setAttribute("aria-live", "polite");
    box.innerHTML = '<button type="button" class="npop" style="--dur:' + NPOP_MS + 'ms" aria-label="새 공지: ' + esc(n.title) + '. 누르면 공지로 이동">' +
      '<span class="nic" aria-hidden="true"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2"><path d="M4 10v4h3l6 4V6L7 10z" stroke-linejoin="round"/><path d="M16.5 9.5a3.5 3.5 0 0 1 0 5M19 7a7 7 0 0 1 0 10" stroke-linecap="round"/></svg></span>' +
      '<span class="ntx"><small><i>NEW</i>선생님 공지' + (d ? ' · ' + (d.getMonth() + 1) + '월 ' + d.getDate() + '일' : '') + (extra ? ' · 외 ' + extra + '개' : '') + '</small>' +
      '<b>' + esc(n.title) + '</b>' + (n.body ? '<span class="nbody">' + esc(n.body) + '</span>' : '') + '</span>' +
      '<svg class="ngo" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" aria-hidden="true"><path d="m9 6 6 6-6 6" stroke-linecap="round" stroke-linejoin="round"/></svg>' +
      '<span class="nbar" aria-hidden="true"></span></button>';
    document.body.appendChild(box);
    var btn = box.firstChild, gone = false, sy = null, swiped = false, timer;
    function hide() {
      if (gone) return; gone = true; clearTimeout(timer);
      btn.classList.remove("in"); btn.classList.add("out");
      setTimeout(function () { if (box.parentNode) box.parentNode.removeChild(box); }, 500);
    }
    requestAnimationFrame(function () { requestAnimationFrame(function () { btn.classList.add("in"); }); });
    timer = setTimeout(hide, NPOP_MS + 450);
    btn.addEventListener("click", function () { if (swiped) return; hide(); if (n.wn && WN.some(function (w) { return w.id === n.wn; })) wnStart(n.wn); else openNotice(nKey(n)); });   /* 업데이트 공지 팝업(선생님 폰)은 누르면 바로 튜토리얼 */
    /* 위로 밀면 바로 닫힘 */
    btn.addEventListener("touchstart", function (e) { sy = e.touches[0].clientY; }, { passive: true });
    btn.addEventListener("touchmove", function (e) {
      if (sy != null && e.touches[0].clientY - sy < -24) { swiped = true; sy = null; hide(); }
    }, { passive: true });
  }

  /* ---------------- 복습지 목록 */
  /* 하단 탭 점등 (2026-11-11 "루틴이나 자세복습지 업데이트하면 하단 아이콘도 점등"):
     루틴(버전·업데이트 날짜·폰에서 고친 시각)·복습지(새 id)·식단(updated)이 14일 안에 바뀌었는데 아직 그 탭을 안 열었으면 아이콘에 LED.
     그 탭을 열면 꺼짐(이 휴대폰 localStorage ptnote:<주소>:lit). 복습지 목록 카드에는 아직 안 열어 본 새 복습지에 NEW (…:fopen) */
  var LIT_KEY = "ptnote:" + SLUG + ":lit", FOPEN_KEY = "ptnote:" + SLUG + ":fopen", LIT_DAYS = 14;
  function dRecent(s) {
    var m = String(s || "").match(/(\d{4})\D+(\d{1,2})\D+(\d{1,2})/);
    return !!m && Date.now() - new Date(+m[1], +m[2] - 1, +m[3]).getTime() <= LIT_DAYS * 86400000;
  }
  function litSigs() {
    var o = { routine: [], forms: [], diet: [] }, R = M.routine, D = M.diet, at = RT_REC && RT_REC.at;
    if (R && dRecent(at || R.updated)) o.routine.push("r|" + rtBase(R) + "|" + (at || ""));
    (M.forms || []).forEach(function (f) { if (dRecent(f.date)) o.forms.push("f|" + f.id); });
    if (D && typeof D === "object" && dRecent(D.updated)) o.diet.push("d|" + (D.updated || ""));
    return o;
  }
  function formNew(f) { return !DEMO && dRecent(f.date) && lsArr(FOPEN_KEY).indexOf(f.id) < 0; }
  /* 복습지 본 기록 (2026-11-19 장동욱 "회원님들이 복습지 보면 본 거 알 수 있게 표시"):
     회원 폰에서 #form-<id>를 열면 창고 mw:<주소>:fv = { v: { id: [처음 본 시각, 마지막 본 시각, 본 횟수] }, at } (ms, 0 = 이 기능 전에 본 것) — 재배포 X
     10분 안에 다시 열면 횟수 안 셈. 선생님 폰(COACH_MODE)·DEMO는 절대 안 올림. 처음엔 예전 열어 본 기록(…:fopen)을 [0,0,1]로 옮겨 담음
     회원 화면: 본 복습지 카드에 "✓ 봤어요" · 선생님 폰: 카드·상세에 "👀 11/18 · 3번" / "아직 안 봄" (fvTag·fvPaint) */
  var FV_LS = "ptnote:" + SLUG + ":fv", FV = null, FV_T = 0;
  if (!COACH_MODE) { try { FV = JSON.parse(localStorage.getItem(FV_LS) || "null"); } catch (e) {} }
  function fvObj() {
    if (!FV || typeof FV !== "object" || !FV.v || typeof FV.v !== "object") {
      FV = { v: {}, at: 0 };
      if (!COACH_MODE && !DEMO) lsArr(FOPEN_KEY).forEach(function (id) { FV.v[id] = [0, 0, 1]; });
    }
    return FV;
  }
  function fvSave(push) {
    if (COACH_MODE || DEMO) return;
    var o = fvObj(); o.at = Date.now();
    try { localStorage.setItem(FV_LS, JSON.stringify(o)); } catch (e) {}
    if (!push || !ATT_API) return;
    clearTimeout(FV_T);
    FV_T = setTimeout(function () { rtPost({ a: "kv_set", k: "mw:" + SLUG + ":fv", v: FV }).catch(function () {}); }, 1200);
  }
  function fvMark(id) {
    if (COACH_MODE || DEMO || !id) return;
    var o = fvObj(), t = Date.now(), r = o.v[id];
    if (r && r[1] && t - r[1] < 600000) return;
    o.v[id] = r ? [r[0] || t, t, (r[2] || 1) + 1] : [t, t, 1];
    fvSave(true);
  }
  function fvServer(kv) {
    var v = kv && kv["mw:" + SLUG + ":fv"];
    if (v && (typeof v !== "object" || !v.v || typeof v.v !== "object")) v = null;
    if (COACH_MODE) { FV = v || { v: {}, at: 0 }; fvPaint(); return; }
    if (DEMO) return;
    var o = fvObj(), sv = v ? v.v : {}, more = false, k;
    for (k in sv) {
      var a = sv[k], b = o.v[k];
      if (!Array.isArray(a)) continue;
      if (!b) { o.v[k] = a.slice(0, 3); continue; }
      var f0 = a[0] && b[0] ? Math.min(a[0], b[0]) : (a[0] || b[0]), l = Math.max(a[1] || 0, b[1] || 0), c = Math.max(a[2] || 1, b[2] || 1);
      if (f0 !== b[0] || l !== b[1] || c !== b[2]) o.v[k] = [f0, l, c];
      if (f0 !== a[0] || l !== a[1] || c !== a[2]) more = true;
    }
    for (k in o.v) if (!sv[k]) more = true;
    fvSave(more);
    fvPaint();
  }
  function fvWhen(t) { var d = new Date(t); return (d.getMonth() + 1) + "/" + d.getDate(); }
  function fvTag(id, long) {
    var r = FV && FV.v && FV.v[id];
    if (!COACH_MODE) return r ? '<span class="fvs ok">✓ 봤어요</span>' : '';
    if (!r) return '<span class="fvs no">' + (long ? '회원님이 아직 안 열어 봤어요' : '아직 안 봄') + '</span>';
    var d = new Date(r[1]), hm = (d.getHours() < 10 ? "0" : "") + d.getHours() + ":" + (d.getMinutes() < 10 ? "0" : "") + d.getMinutes();
    if (!r[1]) return '<span class="fvs ok">👀 ' + (long ? '회원님이 봤어요 (날짜 기록 전)' : '봄') + '</span>';
    return '<span class="fvs ok">👀 ' + (long ? '회원님 확인 · 마지막 ' + fvWhen(r[1]) + ' ' + hm + (r[0] && r[0] !== r[1] ? ' · 처음 ' + fvWhen(r[0]) : '') + ' · ' + (r[2] || 1) + '번'
      : fvWhen(r[1]) + ' · ' + (r[2] || 1) + '번') + '</span>';
  }
  function fvPaint() {
    Array.prototype.forEach.call(document.querySelectorAll("[data-fv]"), function (el) {
      el.innerHTML = fvTag(el.getAttribute("data-fv"), el.hasAttribute("data-fvl"));
    });
  }
  function litApply(curTab) {
    if (DEMO) return;
    var sg = litSigs();
    if (sg[curTab] && sg[curTab].length) lsAdd(LIT_KEY, sg[curTab]);
    var seen = lsArr(LIT_KEY), on = {};
    Object.keys(sg).forEach(function (t) { var e = tabOf(t); on[e] = on[e] || sg[t].some(function (k) { return seen.indexOf(k) < 0; }); });
    Object.keys(on).forEach(function (t) {
      var a = document.querySelector('.tabs a[data-tab="' + t + '"]');
      if (a) a.classList.toggle("lit", on[t]);
    });
  }

  /* 복습지 부위별 보기 (2026-11-12 장동욱 "복습지 영상들 부위별로 볼 수 있게 구분칸") — part 글자로 부위를 찾음("어깨·등"은 둘 다) */
  var FCATS = [["가슴", /가슴/], ["등", /등/], ["어깨", /어깨/], ["팔", /팔|삼두|이두/], ["하체", /하체|다리|허벅지/], ["엉덩이", /엉덩이|힙/], ["복근", /복근|코어/]];
  var FCAT_K = "ptnote:" + SLUG + ":fcat";
  function formCats(f) {
    var p = String(f.part || ""), out = FCATS.filter(function (c) { return c[1].test(p); }).map(function (c) { return c[0]; });
    return out.length ? out : ["기타"];
  }
  function formCard(f) {
    return '<a class="card-link" data-cat="' + esc(formCats(f).join(" ")) + '" href="#form-' + esc(f.id) + '"><div class="thumb"><img src="' + esc(f.dir) + 'poster.jpg" alt="" loading="lazy"></div>' +
      '<div><span class="tagc">' + esc(f.part) + '</span>' + (formNew(f) && !COACH_MODE ? '<span class="fnew">NEW</span>' : '') + '<span class="fvw" data-fv="' + esc(f.id) + '">' + (DEMO ? '' : fvTag(f.id)) + '</span><h3>' + esc(f.exercise) + '</h3><p>' + esc(f.exercise_en) + ' · ' + esc(f.date) + '</p></div></a>';
  }
  function renderForms() {
    var h = wkSeg("forms") + '<section>' + head("", "자세 복습지", "수업에서 배운 자세를 영상으로 다시 봐요");
    if (M.forms.length) {
      var cnt = {}; M.forms.forEach(function (f) { formCats(f).forEach(function (c) { cnt[c] = (cnt[c] || 0) + 1; }); });
      var cats = FCATS.map(function (c) { return c[0]; }).concat(["기타"]).filter(function (c) { return cnt[c]; });
      if (cats.length > 1) {
        h += '<div class="fcat" role="tablist" aria-label="부위별 보기"><button type="button" role="tab" data-fc="" aria-selected="true">전체 <b>' + M.forms.length + '</b></button>' +
          cats.map(function (c) { return '<button type="button" role="tab" data-fc="' + c + '" aria-selected="false">' + c + ' <b>' + cnt[c] + '</b></button>'; }).join("") + '</div>';
      }
      h += '<div class="flist">' + M.forms.map(formCard).join("") + '</div>';
    } else h += '<div class="panel empty"><h3>아직 복습지가 없어요</h3><p>수업에서 배운 자세가 여기에 쌓여요</p></div>';
    return h + '</section>' + remember();
  }
  function setupForms() {
    var bar = view.querySelector(".fcat"), list = view.querySelector(".flist");
    if (!bar || !list) return;
    function apply(c, save) {
      var ok = false;
      Array.prototype.forEach.call(bar.children, function (b) { var on = b.getAttribute("data-fc") === c; if (on) ok = true; b.setAttribute("aria-selected", on ? "true" : "false"); });
      if (!ok) { c = ""; bar.children[0].setAttribute("aria-selected", "true"); }
      Array.prototype.forEach.call(list.children, function (a) { a.hidden = !!c && (" " + a.getAttribute("data-cat") + " ").indexOf(" " + c + " ") < 0; });
      if (save) { try { localStorage.setItem(FCAT_K, c); } catch (e) {} }
    }
    bar.addEventListener("click", function (e) {
      var b = e.target.closest("button[data-fc]"); if (!b) return;
      apply(b.getAttribute("data-fc"), true);
      b.scrollIntoView({ block: "nearest", inline: "center", behavior: "smooth" });
    });
    var c0 = ""; try { c0 = localStorage.getItem(FCAT_K) || ""; } catch (e) {}
    apply(c0, false);
  }

  /* ---------------- 복습지 상세 */
  /* ---------------- 근육 위치 보기 (2026-11-22 장동욱 — 박현규 팀장님 사이트 기능을 내 기준으로 옮김: v4 지도·내 분홍색·다크모드)
     복습지 03 자극 부위의 근육 이름을 누르면 → 몸 지도(assets/mumap/map-M|F.svg, _tools/make_muscle_svg.py = 인체모형 v4 모양)에서 그 근육만 칠하고 위치·하는 일 설명.
     MU = [이름 찾는 규칙, 그림 칸 키(anatomy_v4 이름 — v3와 같음), 이름, 위치, 하는 일] — 위에서부터 먼저 맞는 것 */
  var MU = [
    [/윗가슴|가슴\s*위/, "pec_clav", "대흉근 위쪽", "가슴 위쪽, 쇄골 바로 아래", "팔을 앞·위로 밀어 올릴 때 (인클라인 프레스)"],
    [/가슴\s*아래/, "pec_stern", "대흉근 아래쪽", "가슴 아래쪽", "팔을 앞·아래로 밀고 모을 때"],
    [/승모근\s*가운데/, "trap_mid", "중부 승모근", "날개뼈 사이, 등 가운데", "날개뼈를 뒤로 모을 때"],
    [/이두근\s*(단두|짧은)/, "biceps_short", "이두근 짧은 머리", "팔 앞쪽 안쪽", "팔꿈치를 굽히고 손바닥을 위로 돌릴 때"],
    [/이두근\s*(장두|긴)/, "biceps_long", "이두근 긴 머리", "팔 앞쪽 바깥쪽", "팔꿈치를 굽혀 당길 때"],
    [/삼두근\s*(장두|긴)/, "triceps_long", "삼두근 긴 머리", "팔 뒤쪽 안쪽 (겨드랑이 쪽)", "팔꿈치를 펴고 팔을 뒤로 당길 때"],
    [/대흉근\s*중/, "pec_stern", "대흉근 가운데·아래쪽", "가슴 가운데부터 아래쪽", "팔을 앞·아래로 밀고 모을 때"],
    [/삼각근\s*전면\s*·\s*측면|전면\s*·\s*측면\s*삼각/, "delt_ant delt_lat", "삼각근 앞·옆", "어깨 앞쪽과 옆 바깥쪽", "팔을 앞·옆으로 들어 올릴 때"],
    [/삼각근\s*전면/, "delt_ant", "전면 삼각근", "어깨 앞쪽 동그란 부분", "팔을 앞으로 들어 올리고, 머리 위로 밀 때"],
    [/삼각근\s*측면/, "delt_lat", "측면 삼각근", "어깨 옆 바깥쪽", "팔을 옆으로 들 때 — 어깨가 넓어 보이게 해요"],
    [/삼각근\s*후면/, "delt_post", "후면 삼각근", "어깨 뒤쪽", "팔을 뒤로 당기고 벌릴 때 — 말린 어깨를 펴 줘요"],
    [/회전근개/, "supraspinatus infraspinatus teres_minor subscapularis", "회전근개", "날개뼈를 덮은 작은 어깨 근육 4개", "어깨 관절을 단단히 잡아 주고 팔을 돌릴 때"],
    [/극상근/, "supraspinatus", "극상근", "날개뼈 위쪽, 어깨 위", "팔을 옆으로 들기 시작할 때"],
    [/극하근/, "infraspinatus", "극하근", "날개뼈 뒤 가운데", "팔을 바깥으로 돌릴 때"],
    [/소원근/, "teres_minor", "소원근", "날개뼈 바깥 아래 (극하근 바로 아래)", "팔을 바깥으로 돌릴 때"],
    [/상완요골/, "brachioradialis", "상완요골근", "팔꿈치 바깥에서 아래팔 위쪽", "엄지를 위로 둔 채 팔꿈치를 굽힐 때 (해머컬)"],
    [/치골근/, "pectineus", "치골근", "허벅지 안쪽 맨 위 (사타구니)", "다리를 안으로 모으고 앞으로 들 때"],
    [/(^|\s)박근/, "gracilis", "박근", "허벅지 안쪽을 길게", "다리를 모으고 무릎을 굽힐 때"],
    [/대흉근\s*(위|상부)|쇄골/, "pec_clav", "대흉근 위쪽", "가슴 위쪽, 쇄골 바로 아래", "팔을 앞·위로 밀어 올릴 때 (인클라인 프레스)"],
    [/대흉근\s*(아래|하부)/, "pec_stern", "대흉근 아래쪽", "가슴 아래쪽", "팔을 앞·아래로 밀고 모을 때"],
    [/대흉근|가슴/, "pec_clav pec_stern", "대흉근", "가슴 전체 — 가장 큰 가슴 근육", "팔을 앞으로 밀고, 몸 쪽으로 모을 때"],
    [/전면\s*삼각|어깨\s*앞/, "delt_ant", "전면 삼각근", "어깨 앞쪽 동그란 부분", "팔을 앞으로 들어 올리고, 머리 위로 밀 때"],
    [/측면\s*삼각|어깨\s*옆/, "delt_lat", "측면 삼각근", "어깨 옆 바깥쪽", "팔을 옆으로 들 때 — 어깨가 넓어 보이게 해요"],
    [/후면\s*삼각|어깨\s*뒤/, "delt_post", "후면 삼각근", "어깨 뒤쪽", "팔을 뒤로 당기고 벌릴 때 — 말린 어깨를 펴 줘요"],
    [/삼각근|어깨/, "delt_ant delt_lat delt_post", "삼각근", "어깨를 감싸는 동그란 근육 (앞·옆·뒤)", "팔을 앞·옆·뒤 모든 방향으로 들어 올릴 때"],
    [/(상부\s*승모|승모근\s*상부|승모근\s*위)/, "trap_up", "상부 승모근", "목 옆에서 어깨 위까지", "어깨를 으쓱 올릴 때 — 너무 많이 쓰면 목이 뻐근해요"],
    [/(중부\s*승모|승모근\s*중부)/, "trap_mid", "중부 승모근", "날개뼈 사이, 등 가운데", "날개뼈를 뒤로 모을 때"],
    [/(하부\s*승모|승모근\s*하부)/, "trap_low", "하부 승모근", "날개뼈 아래 안쪽", "날개뼈를 아래로 내려 줄 때"],
    [/승모근/, "trap_up trap_mid trap_low", "승모근", "목 뒤부터 등 가운데까지 마름모 모양", "어깨를 올리고, 날개뼈를 모으고 내릴 때"],
    [/능형근/, "rhomboid", "능형근", "날개뼈 사이 깊은 곳", "날개뼈를 등뼈 쪽으로 모아 줘요 — 자세가 펴져요"],
    [/광배근/, "lat", "광배근", "겨드랑이부터 허리까지 등 옆 넓은 근육", "팔을 아래·뒤로 당길 때 — 등이 넓은 역삼각형이 돼요"],
    [/대원근/, "teres_major", "대원근", "겨드랑이 뒤, 날개뼈 아래 바깥", "광배근을 도와 팔을 아래·뒤로 당겨요"],
    [/척추\s*기립|허리/, "erector erector_thoracic", "척추기립근", "등뼈 양옆으로 길게 (허리 양옆)", "상체를 곧게 세우고 허리를 버텨 줘요"],
    [/이두근\s*짧은/, "biceps_short", "이두근 짧은 머리", "팔 앞쪽 안쪽", "팔꿈치를 굽히고 손바닥을 위로 돌릴 때"],
    [/상완근/, "brachialis", "상완근", "이두근 아래 깊은 곳 (팔꿈치 위)", "팔꿈치를 굽힐 때 이두근과 같이"],
    [/이두|팔\s*앞/, "biceps_long biceps_short", "이두근", "팔 앞쪽 (알통)", "팔꿈치를 굽혀 당길 때"],
    [/삼두|팔\s*뒤/, "triceps_long triceps_lat triceps_med", "삼두근", "팔 뒤쪽", "팔꿈치를 쭉 펼 때 — 팔뚝 뒤 탄력"],
    [/전완|아래팔|악력/, "forearm_flex forearm_ext brachioradialis", "전완근", "팔꿈치부터 손목까지 (아래팔)", "손잡이를 꽉 쥐고 버틸 때"],
    [/복사근|옆구리/, "oblique", "복사근", "옆구리", "몸통을 비틀고 옆으로 굽힐 때"],
    [/(^|[^비])복근|복직근|코어|복부/, "abs", "복직근", "배 앞쪽 (식스팩)", "몸통을 말고 버텨 줘요"],
    [/중둔|엉덩이\s*옆/, "glute_med", "중둔근", "엉덩이 옆 위쪽 (골반 옆)", "다리를 옆으로 벌리고, 한 발로 설 때 골반을 잡아 줘요"],
    [/대퇴근막장|골반\s*앞\s*바깥/, "tfl", "대퇴근막장근", "골반 앞 바깥쪽", "다리를 옆·앞으로 들 때 도와줘요"],
    [/이상근|엉덩이\s*속/, "piriformis", "이상근", "엉덩이 깊은 곳 (대둔근 아래)", "다리를 바깥으로 돌릴 때"],
    [/대둔|엉덩이/, "glute_max", "대둔근", "엉덩이 전체 — 몸에서 가장 큰 근육", "엉덩이를 앞으로 밀어 골반을 펼 때 (힙 업)"],
    [/대퇴\s*사두|허벅지\s*앞/, "rectus_fem vastus_lat vastus_med", "대퇴사두근", "허벅지 앞쪽", "무릎을 펼 때 — 앉았다 일어날 때"],
    [/햄스트링|허벅지\s*뒤/, "ham_bf ham_st", "햄스트링", "허벅지 뒤쪽", "무릎을 굽히고, 숙였다가 골반을 펼 때"],
    [/내전|허벅지\s*안/, "add_long add_mag gracilis pectineus", "내전근", "허벅지 안쪽", "다리를 안으로 모을 때"],
    [/종아리|비복|가자미/, "gastroc_med gastroc_lat soleus soleus_f", "종아리 (비복근·가자미근)", "무릎 아래 뒤쪽", "발끝으로 설 때, 걷고 뛸 때"],
    [/장요근|고관절\s*굴곡/, "iliopsoas", "장요근", "배 깊은 곳에서 허벅지 앞 위로", "다리를 앞으로 들어 올릴 때"],
    [/전거근/, "serratus", "전거근", "갈비뼈 옆 (겨드랑이 아래)", "날개뼈를 앞으로 밀어 줄 때"]
  ];
  function muSplit(t) {   /* "삼두근(팔 뒤) · 승모근" → 괄호 안 · 는 안 자름. 붙여 쓴 "전면·측면"·"중·하부"는 한 근육 (내 회원 글) */
    var out = [], cur = "", d = 0, s = String(t || "");
    s.split("").forEach(function (ch, i) {
      if (ch === "(") d++; else if (ch === ")") d = Math.max(0, d - 1);
      if ((ch === "," || (ch === "·" && (/\s/.test(s[i - 1] || " ") || /\s/.test(s[i + 1] || " ")))) && !d) { if (cur.trim()) out.push(cur.trim()); cur = ""; } else cur += ch;
    });
    if (cur.trim()) out.push(cur.trim());
    return out;
  }
  function muFind(name) {   /* "능형근 · 승모근 중부"처럼 두 개면 둘 다 */
    var parts = muSplit(name), hits = [];
    parts.forEach(function (p) {
      var bare = p.replace(/\(.*?\)?$/, "").trim() || p, q = null;
      for (var i = 0; i < MU.length; i++) if (MU[i][0].test(bare)) { q = MU[i]; break; }
      if (!q) for (var j = 0; j < MU.length; j++) if (MU[j][0].test(p)) { q = MU[j]; break; }
      if (q && hits.indexOf(q) < 0) hits.push(q);
    });
    return hits;
  }
  var MU_SVG = {};
  function muSheet(f, name, role) {
    var all = [];
    (f.primary_muscles || []).forEach(function (m) { all.push([m.name, "p", m.where || ""]); });
    muSplit(f.secondary_muscles).forEach(function (t) { if (!/^없음/.test(t)) all.push([t, "s", ""]); });
    var sh = rtSheet("근육 위치", '<div class="mu-chips">' + all.map(function (x) { return '<button type="button" class="mu-c ' + x[1] + '" data-mu="' + esc(x[0]) + '" data-mr="' + x[1] + '">' + esc(x[0].replace(/\(.*$/, "").trim()) + '</button>'; }).join("") + '</div>' +
      '<div class="mu-map"><p class="mu-load">몸 지도를 불러오는 중…</p></div>' +
      '<div class="mu-z"><button type="button" data-mz="F">앞모습</button><button type="button" data-mz="B">뒷모습</button><button type="button" data-mz="all">전체 몸</button></div><div class="mu-info"></div>', null, false);
    var cl = sh.querySelector(".rts-foot [data-close]"); if (cl) cl.textContent = "닫기";
    var sx = M.sex === "F" ? "F" : "M";
    function show(n, r) {
      Array.prototype.forEach.call(sh.querySelectorAll(".mu-c"), function (b) { b.classList.toggle("on", b.getAttribute("data-mu") === n); });
      var hits = muFind(n), keys = {};
      hits.forEach(function (q) { q[1].split(" ").forEach(function (k) { keys[k] = 1; }); });
      var svg = sh.querySelector(".mu-map svg");
      if (svg) {
        Array.prototype.forEach.call(svg.querySelectorAll(".m"), function (el) { var on = !!keys[el.getAttribute("data-k")]; el.classList.toggle("on", on); el.classList.toggle("s", on && r === "s"); });
        svg.classList.toggle("sel", hits.length > 0);
        curLab = hits.map(function (q) { return q[2]; }).join(" · ");
        muZoom("auto");
      }
      var w0 = (all.filter(function (x) { return x[0] === n; })[0] || [])[2];
      sh.querySelector(".mu-info").innerHTML = '<p class="mu-role ' + r + '">' + (r === "p" ? "주동근 · 여기가 메인!" : "보조근 · 같이 도와줘요") + '</p>' +
        (hits.length ? hits.map(function (q) { return '<div class="mu-one"><b>' + esc(q[2]) + '</b><p><i>위치</i>' + esc(q[3]) + '</p><p><i>하는 일</i>' + esc(q[4]) + '</p></div>'; }).join("")
          : '<div class="mu-one"><b>' + esc(n) + '</b>' + (w0 ? '<p><i>위치</i>' + esc(w0) + '</p>' : '') + '<p class="mu-none">그림에는 아직 표시하지 못하는 근육이에요</p></div>');
    }
    /* 확대: 칠한 근육이 있는 쪽(앞/뒤 중 더 넓게 칠해진 쪽)으로 viewBox를 부드럽게 당김 + 이름표 */
    var curLab = "", zAnim = 0;
    function muZoom(mode) {
      var svg = sh.querySelector(".mu-map svg"); if (!svg) return;
      var vb0 = svg.getAttribute("data-vb0") || svg.getAttribute("viewBox"); svg.setAttribute("data-vb0", vb0);
      var F = vb0.split(/\s+/).map(Number), box = { F: null, B: null }, area = { F: 0, B: 0 };
      Array.prototype.forEach.call(svg.querySelectorAll(".m.on"), function (el) {
        var v = el.getAttribute("data-v"), bb; try { bb = el.getBBox(); } catch (e2) { return; }
        if (!bb.width) return;
        area[v] += bb.width * bb.height;
        var o = box[v]; box[v] = o ? { x: Math.min(o.x, bb.x), y: Math.min(o.y, bb.y), x2: Math.max(o.x2, bb.x + bb.width), y2: Math.max(o.y2, bb.y + bb.height) } : { x: bb.x, y: bb.y, x2: bb.x + bb.width, y2: bb.y + bb.height };
      });
      if (mode === "auto") mode = !box.F && !box.B ? "all" : area.F >= area.B ? "F" : "B";
      Array.prototype.forEach.call(sh.querySelectorAll("[data-mz]"), function (b) { var z = b.getAttribute("data-mz"); b.hidden = z !== "all" && !box[z]; b.classList.toggle("on", z === mode); });
      var T = F.slice(), bx = mode !== "all" && box[mode];
      if (bx) {
        var w = Math.max(150, (bx.x2 - bx.x) * 1.9), h = Math.max(150, (bx.y2 - bx.y) * 1.6), ar = F[2] / F[3];
        if (w / h > ar) h = w / ar; else w = h * ar;
        var cx = (bx.x + bx.x2) / 2, cy = (bx.y + bx.y2) / 2;
        T = [Math.max(F[0], Math.min(F[0] + F[2] - w, cx - w / 2)), Math.max(F[1], Math.min(F[1] + F[3] - h, cy - h / 2 + h * 0.06)), w, h];
      }
      var lab = svg.querySelector(".mlab"); if (lab) lab.remove();
      var S0 = (svg.getAttribute("viewBox") || vb0).split(/\s+/).map(Number), t0 = performance.now(), me = ++zAnim;
      (function step(now) {
        if (me !== zAnim) return;
        var k = Math.min(1, (now - t0) / 380), e3 = 1 - Math.pow(1 - k, 3);
        svg.setAttribute("viewBox", S0.map(function (v, i) { return (v + (T[i] - v) * e3).toFixed(1); }).join(" "));
        if (k < 1) requestAnimationFrame(step);
        else if (bx && curLab) {
          var tx = document.createElementNS("http://www.w3.org/2000/svg", "text");
          tx.setAttribute("class", "mlab"); tx.setAttribute("x", ((bx.x + bx.x2) / 2).toFixed(1));
          tx.setAttribute("y", Math.max(T[1] + T[3] * 0.07, bx.y - T[3] * 0.03).toFixed(1));
          tx.setAttribute("font-size", (T[2] * 0.055).toFixed(1)); tx.setAttribute("stroke-width", (T[2] * 0.012).toFixed(1));
          tx.textContent = curLab; svg.appendChild(tx);
        }
      })(t0);
    }
    sh.addEventListener("click", function (e) {
      var z = e.target.closest("[data-mz]"); if (z) { muZoom(z.getAttribute("data-mz")); return; }
      var b = e.target.closest(".mu-c"); if (b) show(b.getAttribute("data-mu"), b.getAttribute("data-mr"));
    });
    function put(t) { var m = sh.querySelector(".mu-map"); if (m) { m.innerHTML = t; show(name, role); } }
    show(name, role);
    if (MU_SVG[sx]) put(MU_SVG[sx]);
    else fetch(BASE + "mumap/map-" + sx + ".svg").then(function (r) { return r.text(); }).then(function (t) { MU_SVG[sx] = t; put(t); })
      .catch(function () { var m = sh.querySelector(".mu-map"); if (m) m.innerHTML = '<p class="mu-load">몸 지도를 못 불러왔어요 — 인터넷 연결을 확인해 주세요</p>'; });
  }
  function muInline() {   /* 2026-11-21 팀장 "이다혜님 봐봐" — 03 자극 부위 큰 그림도 같은 해부도 스타일로(주동근 진한 분홍·보조근 연한 분홍 — 내 v4 색). 못 불러오면 예전 anatomy.png 그대로 */
    var im = view.querySelector(".muscle > img"), id = (location.hash || "").replace(/^#form-/, ""), f = findForm(id);
    if (!im || !f || f.simple) return;
    var sx = M.sex === "F" ? "F" : "M";
    function put(t) {
      if (!document.body.contains(im)) return;
      var on = {};
      muSplit(f.secondary_muscles).forEach(function (n) { muFind(n).forEach(function (q) { q[1].split(" ").forEach(function (k) { on[k] = "s"; }); }); });
      (f.primary_muscles || []).forEach(function (m) { muFind(m.name).forEach(function (q) { q[1].split(" ").forEach(function (k) { on[k] = "p"; }); }); });
      if (!Object.keys(on).length) return;
      var box = document.createElement("button"); box.type = "button"; box.className = "mu-big"; box.setAttribute("aria-label", "자극 부위 몸 그림 — 누르면 근육 위치 자세히");
      box.innerHTML = '<span class="mu-bt">오늘의 운동 자극 부위</span>' + t + '<span class="mu-lg"><i class="p"></i>주동근<i class="s"></i>보조근<em>눌러서 자세히 ›</em></span>';
      var svg = box.querySelector("svg"); svg.classList.add("sel");
      Array.prototype.forEach.call(svg.querySelectorAll(".m"), function (el) { var r = on[el.getAttribute("data-k")]; if (r) { el.classList.add("on"); if (r === "s") el.classList.add("s"); } });
      box.addEventListener("click", function () { var m0 = (f.primary_muscles || [])[0]; if (m0) muSheet(f, m0.name, "p"); });
      im.replaceWith(box);
    }
    if (MU_SVG[sx]) put(MU_SVG[sx]);
    else fetch(BASE + "mumap/map-" + sx + ".svg").then(function (r) { return r.text(); }).then(function (t) { MU_SVG[sx] = t; put(t); }).catch(function () {});
  }
  document.addEventListener("click", function (e) {
    var b = e.target.closest && e.target.closest(".mbtn"); if (!b) return;
    var id = (location.hash || "").replace(/^#form-/, ""), f = findForm(id);
    if (f) muSheet(f, b.getAttribute("data-mu"), b.getAttribute("data-mr"));
  });
  /* ---- 2026-11-24 지난 영상과 비교 (장동욱 "기존 랫풀다운 영상이랑 비교할 수 있는 기능" → 나란히 동시 재생)
     data.js 복습지에 compare:[{label:"11/11", date:"2026. 11. 11 (수)", dir:"media/form-<예전id>/", file:"form", view:"form"}]
     → 01 영상 아래 .cmp-open 버튼 → 전체 화면 창 .cmp-ov: 왼쪽 예전·오른쪽 지금 영상을 같이 재생(같이 멈춤·0.5배·처음부터 같이).
     view = 지금 복습지에서 같은 각도의 파일(views가 있으면 위에서 바꿀 수 있음). 예전 복습지 폴더는 지우지 말 것. */
  function cmpLbl(d) { var m = String(d || "").match(/(\d+)\.\s*(\d+)\.\s*(\d+)/); return m ? (+m[2]) + "/" + (+m[3]) : String(d || ""); }
  function cmpClose() {
    var o = document.querySelector(".cmp-ov"); if (!o) return;
    Array.prototype.forEach.call(o.querySelectorAll("video"), function (v) { try { v.pause(); v.removeAttribute("src"); v.load(); } catch (e) {} });
    o.remove(); document.documentElement.classList.remove("cmp-lock");
    var mv = document.getElementById("main"); if (mv && mv.dataset.cmpWas === "1") { delete mv.dataset.cmpWas; var p = mv.play(); if (p && p.catch) p.catch(function () {}); }
  }
  function cmpOpen(f, ci) {
    cmpClose(); ci = ci || 0;
    var c = f.compare[ci], vw = f.views && f.views.length > 1 ? f.views : null, cur = c.view || "form";
    var mv = document.getElementById("main"); if (mv && !mv.paused) { mv.dataset.cmpWas = "1"; mv.pause(); }
    var vtag = function (k) { return '<video class="cmp-v" data-k="' + k + '" muted loop playsinline webkit-playsinline disablepictureinpicture disableremoteplayback x-webkit-airplay="deny" preload="auto"></video>'; };
    var o = document.createElement("div"); o.className = "cmp-ov"; o.setAttribute("role", "dialog"); o.setAttribute("aria-label", "지난 영상과 비교");
    o.innerHTML = '<div class="cmp-top"><div><small>' + esc(f.exercise) + '</small><b>지난 영상과 비교</b></div><button type="button" class="cmp-x" aria-label="닫기">×</button></div>' +
      (f.compare.length > 1 ? '<div class="vw-seg cmp-seg">' + f.compare.map(function (x, i) { return '<button type="button" class="vw-b" data-ci="' + i + '" aria-pressed="' + (i === ci) + '">' + esc(x.label) + '</button>'; }).join("") + '</div>' : '') +
      '<div class="cmp-grid"><div class="cmp-col"><span class="cmp-tag old">이전 · ' + esc(c.label) + '</span>' + vtag("old") + '</div>' +
      '<div class="cmp-col"><span class="cmp-tag now">지금 · ' + esc(cmpLbl(f.date)) + '</span>' + vtag("now") + '</div></div>' +
      (vw ? '<div class="cmp-vw"><span>지금 영상 각도</span><div class="vw-seg">' + vw.map(function (w) { return '<button type="button" class="vw-b" data-vf="' + esc(w.file) + '" aria-pressed="' + (w.file === cur) + '">' + esc(w.label) + '</button>'; }).join("") + '</div></div>' : '') +
      '<div class="cmp-ctl"><button type="button" class="btn" data-c="play">⏸ 같이 멈춤</button><button type="button" class="btn" data-c="0.5" aria-pressed="false">0.5배</button><button type="button" class="btn" data-c="1" aria-pressed="true">1배</button><button type="button" class="btn" data-c="re">⟲ 처음부터</button></div>' +
      '<p class="cmp-hint">두 영상이 같이 시작해요. 영상을 누르면 둘 다 멈춰요</p>';
    document.body.appendChild(o); document.documentElement.classList.add("cmp-lock");
    var vo = o.querySelector('[data-k="old"]'), vn = o.querySelector('[data-k="now"]'), both = [vo, vn], rate = 1, playing = true;
    var pb = o.querySelector('[data-c="play"]');
    function poster(dir, fl) { return dir + (fl === "form" ? "poster" : fl + "-poster") + ".jpg"; }
    function setSrc(v, dir, fl) { v.setAttribute("poster", poster(dir, fl)); v.src = dir + fl + ".mp4"; v.playbackRate = rate; }
    function go() { both.forEach(function (v) { try { v.currentTime = 0; } catch (e) {} v.playbackRate = rate; var p = v.play(); if (p && p.catch) p.catch(function () {}); }); playing = true; pb.textContent = "⏸ 같이 멈춤"; }
    function tog() { playing = !playing; both.forEach(function (v) { if (playing) { var p = v.play(); if (p && p.catch) p.catch(function () {}); } else v.pause(); }); pb.textContent = playing ? "⏸ 같이 멈춤" : "▶ 같이 재생"; }
    var ready = 0; both.forEach(function (v) { v.addEventListener("loadeddata", function () { if (++ready === 2) go(); }, { once: true }); });
    setSrc(vo, c.dir, c.file || "form"); setSrc(vn, f.dir, cur);
    setTimeout(function () { if (ready < 2) go(); }, 2500);
    o.addEventListener("click", function (e) {
      var t = e.target;
      if (t.closest(".cmp-x")) return cmpClose();
      if (t.closest(".cmp-v")) return tog();
      var b = t.closest("[data-c]");
      if (b) { var k = b.getAttribute("data-c");
        if (k === "play") return tog(); if (k === "re") return go();
        rate = +k; both.forEach(function (v) { v.playbackRate = rate; });
        Array.prototype.forEach.call(o.querySelectorAll('[data-c="0.5"],[data-c="1"]'), function (x) { x.setAttribute("aria-pressed", String(x === b)); }); return; }
      var ib = t.closest("[data-ci]"); if (ib) { if (+ib.getAttribute("data-ci") !== ci) cmpOpen(f, +ib.getAttribute("data-ci")); return; }
      var vb = t.closest("[data-vf]"); if (vb && vb.getAttribute("aria-pressed") !== "true") {
        cur = vb.getAttribute("data-vf");
        Array.prototype.forEach.call(o.querySelectorAll(".cmp-vw .vw-b"), function (x) { x.setAttribute("aria-pressed", String(x === vb)); });
        ready = 1; vn.addEventListener("loadeddata", function () { go(); }, { once: true }); setSrc(vn, f.dir, cur);
      }
    });
  }
  document.addEventListener("click", function (e) {
    var b = e.target.closest && e.target.closest(".cmp-open"); if (!b) return;
    var f = findForm(b.getAttribute("data-cmp")); if (f && f.compare) cmpOpen(f);
  });
  window.addEventListener("hashchange", cmpClose);
  document.addEventListener("keydown", function (e) { if (e.key === "Escape") cmpClose(); });
  function renderForm(f) {
    var D = f.dir;
    var h = '<a class="back" href="#forms">← 자세 복습지</a>';
    if (COACH_MODE) h += '<div class="fvline" data-fv="' + esc(f.id) + '" data-fvl>' + fvTag(f.id, true) + '</div>';
    h += '<div class="hero"><div class="hero-main split"><div class="hero-l">' +
      '<div class="eyebrow">MY FORM NOTE <b>· 자세 복습지</b></div><h1>' + esc(f.exercise) + '</h1>' +
      '<div class="en">' + esc(f.exercise_en) + '</div>' +
      '<div class="who"><strong>' + esc(f.member || M.name) + ' 회원님</strong><span>' + esc(f.date) + '</span></div></div>' +
      '<div class="hero-r"><div class="eyebrow">오늘의 타깃</div><ul class="dots">' +
      f.targets.map(function (t) { return '<li>' + esc(t) + '</li>'; }).join("") + '</ul>' +
      '<div class="benefit">' + esc(f.benefit) + '</div></div></div>' +
      '<div class="keypoint"><small>KEY POINT</small><p>' + esc(f.key_point) + '</p></div></div>';

    h += '<section>' + head("01", "오늘 내 자세", "영상으로 확인해요") +
      /* 2026-11-19 "영상 측면 추가" — data.js 복습지에 views:[{label:"정면",file:"form"},{label:"측면",file:"side"}] 넣으면 영상 위에 바꾸기 버튼(.vw-seg). 파일은 <file>.mp4·<file>.webp·<file>-poster.jpg(form은 poster.jpg) */
      (f.views && f.views.length > 1 ? '<div class="vw-seg" role="group" aria-label="영상 방향">' + f.views.map(function (w, i) {
        return '<button type="button" class="vw-b" data-vf="' + esc(w.file) + '" aria-pressed="' + (i ? "false" : "true") + '">' + esc(w.label) + '</button>'; }).join("") + '</div>' : '') +
      '<div class="player"><video id="main" poster="' + esc(D) + 'poster.jpg" autoplay muted loop playsinline webkit-playsinline disablepictureinpicture disableremoteplayback x-webkit-airplay="deny" preload="auto" data-src="' + esc(D) + 'form.mp4" data-gif="' + esc(D) + 'form.webp"></video>' +
      '<img id="gifFallback" alt="오늘 수업 영상 (반복 재생)" hidden>' +
      '<span class="chip">▶ 오늘 수업 영상</span><button class="tapper" id="tap" type="button" aria-label="영상 재생 / 멈춤"></button>' +
      '<div class="paused-badge" id="pbadge" hidden></div></div>' +
      '<div class="controls" id="controls" role="group" aria-label="재생 속도"><button class="btn" id="playBtn" type="button">⏸ 멈춤</button>' +
      '<button class="btn" type="button" data-rate="0.5" aria-pressed="false">느리게 0.5배</button>' +
      '<button class="btn" type="button" data-rate="1" aria-pressed="true">보통 속도</button></div>' +
      '<p class="hint" id="hint">영상을 누르면 멈추고, 다시 누르면 재생돼요</p>' +
      (f.compare && f.compare.length ? '<button type="button" class="cmp-open" data-cmp="' + esc(f.id) + '"><span class="cmp-ic" aria-hidden="true">⇆</span><span><b>지난 영상과 비교</b><small>' +
        esc(f.compare.map(function (c) { return c.label; }).join(" · ")) + ' vs 지금 ' + esc(cmpLbl(f.date)) + ' · 나란히 같이 재생</small></span><i aria-hidden="true">›</i></button>' : '') +
      '</section>';

    h += '<section>' + head("02", "오늘 잘한 점", "이대로만 하면 돼요") + '<div class="cards3">' +
      f.good_points.map(function (g, i) {
        return '<div class="good"><div class="tag">' + CHECK + 'POINT ' + (i + 1) + '</div><h3>' + esc(g.title) + '</h3><p>' + esc(g.desc) + '</p></div>';
      }).join("") + '</div></section>';

    h += '<section>' + head("03", "자극 부위", "여기에 자극이 와야 정상이에요") + '<div class="muscle">' +
      '<img src="' + esc(D) + 'anatomy.png" alt="자극 부위 인체 그림: 진한 분홍은 주동근, 연한 분홍은 보조근" loading="lazy"><div class="mcol">' +
      '<div class="mgroup"><div class="mrow"><span class="mchip p">주동근</span>여기가 메인!</div>' +
      f.primary_muscles.map(function (m) { return '<p class="mname"><button type="button" class="mbtn" data-mu="' + esc(m.name) + '" data-mr="p" data-mw="' + esc(m.where || "") + '">' + esc(m.name) + '</button><span>' + esc(m.where) + '</span></p>'; }).join("") + '</div>' +
      '<div class="mgroup"><div class="mrow"><span class="mchip s">보조근</span>같이 도와줘요</div><p class="mname s2">' + muSplit(f.secondary_muscles).map(function (t) { return /^없음/.test(t) ? esc(t) : '<button type="button" class="mbtn s" data-mu="' + esc(t) + '" data-mr="s">' + esc(t) + '</button>'; }).join('<i class="mdot">·</i>') + '</p></div>' +
      '<p class="mhint">근육 이름을 누르면 몸 어디인지 보여 줘요</p>' +
      '<div class="feels"><div class="feel ok"><div class="tag">' + CHECK + '이 느낌이면 성공</div><p>' + esc(f.feel_good) + '</p></div>' +
      '<div class="feel no"><div class="tag">' + XIC + '이 느낌이면 STOP</div><p>' + esc(f.feel_stop) + '</p></div></div></div></div></section>';

    h += '<section>' + head("04", "동작 3단계", "이 순서대로 따라 하세요") + '<div class="steps">' +
      f.steps.map(function (s, i) {
        return '<article class="step"><div class="step-media"><img src="' + esc(D + s.media) + '" alt="' + esc(s.title) + ' 동작" loading="lazy">' +
          (s.loop ? '<span class="loop">반복 재생</span>' : '') + '</div><div class="step-body"><div class="step-no">STEP<b>0' + (i + 1) + '</b></div>' +
          '<h3>' + esc(s.title) + '</h3><p>' + esc(s.desc) + '</p><span class="breath">' + esc(s.chip) + '</span></div></article>';
      }).join("") + '</div></section>';

    h += '<section>' + head("05", "이렇게 O · 이렇게 X", "헷갈릴 땐 여기만 보세요") + '<div class="ox">' +
      '<div class="oxbox o"><h3><svg class="mark" viewBox="0 0 20 20" aria-hidden="true"><circle cx="10" cy="10" r="7.6" fill="none" stroke="currentColor" stroke-width="3.2"/></svg>이렇게 하세요</h3><ul>' +
      f.do.map(function (t) { return '<li>' + CHECK + esc(t) + '</li>'; }).join("") + '</ul></div>' +
      '<div class="oxbox x"><h3><svg class="mark" viewBox="0 0 20 20" aria-hidden="true"><path d="M3.5 3.5l13 13M16.5 3.5l-13 13" stroke="currentColor" stroke-width="3.4" stroke-linecap="round"/></svg>이건 피하세요</h3><ul>' +
      f.dont.map(function (t) { return '<li>' + XIC + esc(t) + '</li>'; }).join("") + '</ul></div></div></section>';
    return h + remember();
  }

  /* 앱을 나가거나 화면을 끌 때도 영상 멈춤 (아이폰이 재생 중인 영상을 PiP로 빼지 않게) */
  document.addEventListener("visibilitychange", function () {
    Array.prototype.forEach.call(document.querySelectorAll("#view video"), function (v) {
      try {
        if (document.hidden) { v.setAttribute("data-bg", v.paused ? "" : "1"); v.pause(); }
        else if (v.getAttribute("data-bg") === "1") { v.removeAttribute("data-bg"); var p = v.play(); if (p && p.catch) p.catch(function () {}); }
      } catch (e) {}
    });
  });
  function setupPlayer() {
    muInline();
    var v = document.getElementById("main");
    if (!v) return;
    var badge = document.getElementById("pbadge"), playBtn = document.getElementById("playBtn"), tap = document.getElementById("tap");
    var started = false, touched = false, swapped = false;
    function sync() { badge.hidden = !v.paused || swapped; playBtn.textContent = v.paused ? "▶ 재생" : "⏸ 멈춤"; }
    function tryPlay() { var p = v.play(); if (p && p.catch) p.catch(function () {}); }
    function toggle() { touched = true; if (v.paused) tryPlay(); else v.pause(); }
    tap.addEventListener("click", toggle);
    playBtn.addEventListener("click", toggle);
    v.addEventListener("play", sync);
    v.addEventListener("pause", sync);
    v.addEventListener("playing", function () { started = true; });
    var rateBtns = document.querySelectorAll("[data-rate]");
    Array.prototype.forEach.call(rateBtns, function (b) {
      b.addEventListener("click", function () {
        v.playbackRate = parseFloat(b.getAttribute("data-rate"));
        Array.prototype.forEach.call(rateBtns, function (o) { o.setAttribute("aria-pressed", String(o === b)); });
      });
    });
    // 카톡 등 앱 안 브라우저: 영상을 통째로 받아 재생, 4초 안에 안 나오면 움직이는 그림으로 바꿈
    function swapToGif() {
      if (swapped || started || !document.body.contains(v)) return;
      swapped = true;
      try { v.pause(); } catch (e) {}
      var g = document.getElementById("gifFallback");
      g.src = v.getAttribute("data-gif"); g.hidden = false; v.hidden = true; badge.hidden = true; tap.hidden = true;
      document.getElementById("controls").hidden = true;
      document.getElementById("hint").textContent = "영상이 계속 반복돼요";
    }
    v.addEventListener("error", function () { if (!started) swapToGif(); });
    /* 2026-11-19 정면/측면 바꾸기 */
    var vwB = document.querySelectorAll(".vw-b");
    Array.prototype.forEach.call(vwB, function (b) {
      b.addEventListener("click", function () {
        if (b.getAttribute("aria-pressed") === "true") return;
        var fl = b.getAttribute("data-vf"), base = v.getAttribute("data-src").replace(/[^\/]*$/, ""), rate = v.playbackRate || 1;
        Array.prototype.forEach.call(vwB, function (o) { o.setAttribute("aria-pressed", String(o === b)); });
        v.setAttribute("poster", base + (fl === "form" ? "poster" : fl + "-poster") + ".jpg");
        if (swapped) { var g = document.getElementById("gifFallback"); g.src = base + fl + ".webp"; return; }
        v.src = base + fl + ".mp4"; v.playbackRate = rate; tryPlay();
      });
    });
    var src = v.getAttribute("data-src");
    if (window.fetch && window.URL && URL.createObjectURL) {
      fetch(src).then(function (r) { if (!r.ok) throw new Error("load"); return r.blob(); })
        .then(function (b) { v.src = URL.createObjectURL(new Blob([b], { type: "video/mp4" })); tryPlay(); })
        .catch(function () { v.src = src; tryPlay(); });
    } else { v.src = src; tryPlay(); }
    setTimeout(function () { if (!started && !touched) swapToGif(); }, 4000);
    sync();
  }

  /* ---------------- 루틴 */
  /* ---- 요일 옮기기 창 (A안) */
  var KEYS7 = ["mon", "tue", "wed", "thu", "fri", "sat", "sun"];
  function mvIdx(k) { return KEYS7.indexOf(k); }
  function mvDate(k) { var t = new Date(), off = mvIdx(k) - (t.getDay() + 6) % 7; return ymd(new Date(t.getFullYear(), t.getMonth(), t.getDate() + off)); }
  function mvDid(k) { var dk = mvDate(k); return attLoad().indexOf(dk) >= 0 || !!(LG && LG.d && LG.d[dk] && LG.d[dk].length); }
  function mvMissed(k) {   /* 이번 주 지난 날 · 운동하는 날인데 출석도 ✓도 없고 아직 안 옮긴 날 */
    if (ROT || mvIdx(k) < 0 || mvIdx(k) >= mvIdx(todayKey())) return false;
    var d = dayByKey(k); return !!(d && !d.rest && !d.pick && !d.cardio_only && !mvMap()[k] && !mvDid(k));
  }
  function mvSave(m) {
    mvGet(); var clean = {}; for (var k in m) if (m[k]) clean[k] = m[k];
    MV = { w: wkMon(), m: clean, at: Date.now() };
    try { localStorage.setItem(MV_LS, JSON.stringify(MV)); } catch (e) {}
    if (ATT_API) rtPost({ a: "kv_set", k: "mw:" + SLUG + ":mv", v: MV }).catch(function () {});
    rerender();
  }
  function mvServer(kv) {
    mvGet(); var v = kv && kv["mw:" + SLUG + ":mv"] || null;
    if (!v || (MV && (MV.at || 0) >= (v.at || 0))) return;
    MV = v; try { localStorage.setItem(MV_LS, JSON.stringify(v)); } catch (e) {}
    if (/^#(routine|home)?$|^#routine/.test(location.hash || "#home")) rerender();
  }
  function mvName(k) { var d = dayByKeyRaw(k); return DAY_KO[k] + "요일 " + (d && !d.rest ? d.part : "휴식"); }
  /* 2026-11-16 장동욱 "요일 아이콘 꾹 눌러서 다음 날로 쉽게 옮기게, 옮기기가 안 되는 것 같아" — 오늘·앞으로 올 날도 꾹 → 하루 미루기 / 다음 날과 바꾸기 / 건너뛰기 */
  function mvEff(m, q) { var src = m[q] || q; if (src === "-") return "-"; var d = dayByKeyRaw(src); return (!d || d.rest || d.pick) ? "-" : src; }
  function mvClean(m) { for (var q in m) { var r = dayByKeyRaw(q); if (m[q] === q || (m[q] === "-" && (!r || r.rest))) delete m[q]; } return m; }
  function mvPush(m, k) {   /* k 운동을 다음 날로 — 뒤 운동도 첫 쉬는 날까지 한 칸씩. 일요일을 넘기면 넘친 운동 키를 돌려줌 */
    var carry = mvEff(m, k); m[k] = "-";
    for (var j = mvIdx(k) + 1; j < 7; j++) { var q = KEYS7[j], nx = mvEff(m, q); m[q] = carry; if (nx === "-") return null; carry = nx; }
    return carry;
  }
  function mvPart(src) { var d = dayByKeyRaw(src); return d ? d.part : ""; }
  function mvSheet(k) {   /* 2026-11-16 장동욱 "원하는 요일로 옮길 수 있게 자유도 높이자 — 월요일을 금요일로 등, 주마다 초기화, 간단한 안내말"
       운동 날 꾹 → 이번 주 남은 요일 칸 중 골라서 옮김(쉬는 날이면 그대로 들어가고, 운동 있는 날이면 서로 바꿈)
       쉬는 날(오늘·앞날) 꾹 → 이번 주 운동 중 하나를 그날로 가져옴. 옮긴 건 이번 주만, 월요일이면 원래 루틴 */
    if (ROT || RT_EDIT || DEMO || mvIdx(k) < 0) return;
    var T = todayKey(), it = mvIdx(T), ik = mvIdx(k), m = {}, cur = mvMap(), x;
    for (x in cur) m[x] = cur[x];
    var ek = mvEff(cur, k), raw = dayByKeyRaw(k), past = ik < it, who = k === T ? "오늘" : DAY_KO[k] + "요일";
    var grid = [], opts = [], title, sub, note;
    function dn(q) { return DAY_KO[q] + (q === T ? "(오늘)" : ""); }
    if (ek !== "-" && (!past || mvMissed(k))) {
      title = who + " " + mvPart(ek) + ", 어디로 옮길까요?";
      sub = "옮길 요일을 누르세요 · 쉬는 날이면 그대로 들어가고, 운동 있는 날이면 서로 바꿔요";
      KEYS7.forEach(function (q, iq) {
        if (iq < it || q === k) return;
        var eq = mvEff(cur, q), pk = (dayByKeyRaw(q) || {}).pick;
        grid.push({ d: dn(q), p: eq === "-" ? (pk ? "골라서 하는 날" : "쉬는 날") : mvPart(eq), act: eq === "-" ? "여기로" : (past ? "바꾸면 " + mvPart(eq) + " 건너뜀" : "서로 바꿈"), free: eq === "-",
          go: function () { m[q] = ek; m[k] = (eq === "-" || past) ? "-" : eq;
            return eq === "-" ? mvPart(ek) + " 운동을 " + DAY_KO[q] + "요일로 옮겼어요" : who + "과 " + DAY_KO[q] + "요일 운동을 바꿨어요"; } });
      });
      opts.push({ t: "이번 주는 건너뛰기", s: "다음 주 " + DAY_KO[k] + "요일에 다시 해요", go: function () { m[k] = "-"; return who + " " + mvPart(ek) + " 운동은 이번 주 건너뛰었어요"; } });
    } else if (ek === "-" && !past && !(raw && raw.pick && !cur[k])) {
      title = who + " 어떤 운동 할까요?"; sub = "이번 주 운동 중 하나를 " + (k === T ? "오늘" : DAY_KO[k] + "요일") + "로 가져와요";
      var list = KEYS7.filter(function (q) { return q !== k && mvEff(cur, q) !== "-"; });
      list.sort(function (a2, b2) { return (mvMissed(b2) ? 1 : 0) - (mvMissed(a2) ? 1 : 0); });
      list.forEach(function (q) {
        var eq = mvEff(cur, q), qp = mvIdx(q) < it, done = qp && mvDid(q), miss = mvMissed(q);
        grid.push({ d: dn(q), p: mvPart(eq), act: miss ? "못 한 날" : qp ? (done ? "한 번 더" : "지난 날") : "가져오기", free: miss,
          go: function () { m[k] = eq; if (!done) m[q] = "-"; return DAY_KO[q] + "요일 " + mvPart(eq) + " 운동을 " + (k === T ? "오늘" : DAY_KO[k] + "요일") + "로 가져왔어요"; } });
      });
      if (!grid.length) { attToast("이번 주에 가져올 운동이 없어요"); return; }
    } else if (Object.keys(cur).length) {
      title = "옮긴 운동 되돌리기"; sub = past ? "지난 날은 옮길 수 없어요 · 이번 주에 옮긴 걸 원래대로 돌릴 수 있어요" : "이번 주에 옮긴 요일을 원래 루틴으로 돌려요";
    } else { attToast(past ? "지난 날은 옮길 수 없어요" : "이 날은 옮길 운동이 없어요"); return; }
    if (Object.keys(cur).length) opts.push({ t: "이번 주 옮긴 것 모두 되돌리기", s: "원래 루틴으로 · 월요일이면 어차피 원래대로 돌아와요", go: function () { m = {}; return "원래 루틴으로 되돌렸어요"; } });
    var body = '<p class="rts-note">' + esc(sub) + '</p>' +
      (grid.length ? '<div class="mv-days">' + grid.map(function (g, i) {
        return '<button type="button" class="mv-day' + (g.free ? ' free' : '') + '" data-g="' + i + '"><b>' + esc(g.d) + '</b><span>' + esc(g.p) + '</span><small>' + esc(g.act) + '</small></button>';
      }).join("") + '</div>' : '') +
      (opts.length ? '<div class="mv-opts">' + opts.map(function (o, i) {
        return '<button type="button" class="mv-opt" data-i="' + i + '"><b>' + esc(o.t) + '</b><small>' + esc(o.s) + '</small></button>';
      }).join("") + '</div>' : '') + '<p class="rts-note">옮긴 건 이번 주에만 · 다음 주 월요일이면 원래 루틴으로 돌아와요</p>';
    var sh = rtSheet(title, body, function () {}, false);
    sh.addEventListener("click", function (e) {
      var g = e.target.closest(".mv-day"), b = e.target.closest(".mv-opt"); if (!g && !b) return;
      var msg = g ? grid[+g.getAttribute("data-g")].go() : opts[+b.getAttribute("data-i")].go();
      sh.close(); mvSave(mvClean(m)); attToast(msg);
    });
  }
  (function () {   /* 요일 칸 꾹 누르기 (0.55초) */
    var tm = 0, fired = 0, x0 = 0, y0 = 0, tile = null;
    function stop() { clearTimeout(tm); if (tile) tile.classList.remove("holding"); tile = null; }
    document.addEventListener("pointerdown", function (e) {
      var t = e.target.closest && e.target.closest(".wk-cmp a.day-tile");
      if (!t || ROT || RT_EDIT || DEMO) return;
      var k = (t.getAttribute("href") || "").replace("#routine-", "");
      x0 = e.clientX; y0 = e.clientY; tile = t; t.classList.add("holding");
      tm = setTimeout(function () { stop(); fired = Date.now(); try { navigator.vibrate && navigator.vibrate(15); } catch (x) {} mvSheet(k); }, 550);
    });
    document.addEventListener("pointermove", function (e) { if (tile && (Math.abs(e.clientX - x0) > 10 || Math.abs(e.clientY - y0) > 10)) stop(); });
    ["pointerup", "pointercancel"].forEach(function (ev) { document.addEventListener(ev, stop); });
    document.addEventListener("click", function (e) {
      if (Date.now() - fired < 900 && e.target.closest && e.target.closest(".wk-cmp a.day-tile")) { e.preventDefault(); e.stopPropagation(); }
      var g = e.target.closest && e.target.closest(".mv-go"); if (g) mvSheet(g.getAttribute("data-mvk"));
    }, true);
    document.addEventListener("contextmenu", function (e) { if (e.target.closest && e.target.closest(".wk-cmp a.day-tile")) e.preventDefault(); });
  })();
  function renderRoutine(sel) {
    var R = M.routine;
    if (!R) return (CAN_EDIT ? '<div class="rtbar"><div><b>선생님만 보여요</b><span>여기서 바로 루틴을 만들 수 있어요</span></div><div class="rtbar-b"><button type="button" class="rtb" data-rt="createcopy">다른 회원 루틴 복사</button><button type="button" class="rtb fill" data-rt="create">✎ 새 루틴 만들기</button></div></div>' : '') +
      '<section>' + head("", "주간 루틴", "") + '<div class="panel empty"><h3>루틴이 아직 없어요</h3><p>선생님이 곧 올려드릴게요</p></div></section>' + remember();
    var tk = todayKey(), ED = !!RT_EDIT;
    sel = sel || tk;
    view.setAttribute("data-day", sel);
    var h = wkSeg("routine") + rtTopBar() + '<div class="hero"><div class="hero-main split"><div class="hero-l">' +
      '<div class="eyebrow">' + (ROT ? 'ROTATION ROUTINE <b>· 순환 루틴 ' : 'WEEKLY ROUTINE <b>· 주간 루틴 ') + esc(R.version) + '</b></div><h1>' + esc(R.title) + '</h1>' +
      '<div class="who"><strong>' + esc(M.name) + ' 회원님</strong><span>' + esc(R.updated) + ' 업데이트</span></div></div>' +
      '<div class="hero-r"><div class="eyebrow">이번 주 계획</div><ul class="dots small">' +
      R.plan.map(function (p) { return '<li>' + esc(p) + '</li>'; }).join("") + '</ul></div></div>' +
      '<div class="keypoint"><small>KEY POINT</small><p>' + esc(R.key_point) + '</p></div></div>';

    /* 2026-11-14 장동욱 "1·2 항목 합치기, 종목은 스크롤 없이 한눈에": 일주일 줄을 그날 운동 칸 안 맨 위로, 종목 카드는 작게(.ex-list.cmp) */
    var d = dayByKey(sel);
    h += '<section id="day">' + head("01", dayName(sel) + " " + (d ? d.part : "휴식"), sel === tk ? (ROT ? "오늘 할 차례" : "오늘") : (d && !d.rest ? d.en : ""),
      ED && d && !d.rest ? '<button type="button" class="rtb sm" data-rt="day">✎ 이날 정보</button>' : '');
    h += '<div class="week wk-cmp" role="tablist">';
    if (ROT) {
      rotKeys().forEach(function (k) {
        var d = dayByKey(k);
        h += '<a class="day-tile' + (k === tk ? " today" : "") + (ED ? ' rtdk' : '') + '" data-dk="' + k + '" href="#routine-' + k + '" role="tab" aria-current="' + (k === sel) + '"><b class="rot"><small>DAY</small>' + k.slice(1) + '</b>' +
          img(dayIcon(d), "wk-ic", true) + '<span>' + esc(d.part) + '</span></a>';
      });
      if (rotKeys().length < 7) h += '<div class="day-tile rest"><b class="rot"><small>OFF</small>휴</b>' + img("rest", "wk-ic") + '<span>근무표 따라</span></div>';
    } else
    ["mon", "tue", "wed", "thu", "fri", "sat", "sun"].forEach(function (k) {
      var d = dayByKey(k), mvs = mvMap()[k];
      var cls = "day-tile" + (!d || d.rest ? " rest" : "") + (k === tk ? " today" : "") + (!ED && mvMissed(k) ? " missed" : "");
      h += '<a class="' + cls + (ED ? ' rtdk' : '') + '" data-dk="' + k + '" href="#routine-' + k + '" role="tab" aria-current="' + (k === sel) + '"><b>' + DAY_KO[k] + '</b>' +
        img(dayIcon(d), "wk-ic", true) + '<span>' +
        esc(d ? d.part : "휴식") + '</span>' + (ED || !mvs ? '' : '<em class="mv-tag' + (mvs === "-" ? ' off' : '') + '">' + (mvs === "-" ? '옮김' : DAY_KO[mvs] + '에서') + '</em>') + '</a>';
    });
    h += '</div>';
    if (!ROT && !ED && !DEMO) {
      var td0 = dayByKey(tk), anyMiss = ["mon", "tue", "wed", "thu", "fri", "sat"].some(mvMissed), anyMv = Object.keys(mvMap()).length;
      h += '<p class="mv-hint">' + (anyMiss ? '못 나온 날 칸을 <b>꾹</b> 누르면 이번 주 안에서 옮길 수 있어요' :
        (!td0 || td0.rest) ? '쉬는 날인데 나왔다면 <b>오늘 칸을 꾹</b> 눌러 운동을 골라요' : anyMv ? '이번 주에 옮긴 운동이 있어요 · 칸을 꾹 누르면 더 옮기거나 되돌려요' :
        '요일 칸을 <b>꾹</b> 누르면 원하는 요일로 옮길 수 있어요 · 매주 월요일 원래대로') + '</p>';
    }
    if (!d || d.rest) {
      h += '<div class="rest-card"><b>' + (d && d.mvSkip ? '이번 주는 옮겼어요' : '쉬는 날') + '</b>' + (d && d.mvSkip ? '다른 날로 옮긴 운동이에요' : '푹 쉬고 잘 먹기! 근육은 쉬는 동안 자라요') +
        (!ED && !ROT && !DEMO && sel === tk ? '<button type="button" class="btn fill mv-go" data-mvk="' + tk + '">오늘 나왔어요 · 운동 고르기</button>' : '') + '</div>';
      if (ED && !ROT) h += '<button type="button" class="rtadd" data-rt="work">+ 이날 운동 넣기</button>';
    } else if (d.cardio_only) {
      h += '<div class="ex-list"><div class="ex cardio"><div class="ex-top"><span class="ex-ic">' + img("treadmill") + '</span><div><h3>유산소만 ' + d.cardio_only + '분</h3>' +
        '<div class="tip">' + esc(R.cardio ? R.cardio.options : "") + '</div></div></div></div></div>' +
        '<p class="note">' + esc(d.note || "웨이트 없이 유산소만 하는 날이에요") + '</p>';
    } else if (d.pick) {
      h += '<p class="note" style="margin:0 0 12px">' + esc(d.note || "이번 주에 아쉬웠던 부위 하나를 골라 그 요일 루틴 그대로 해요") + '</p>' + pickList(d) +
        (d.cardio && R.cardio ? '<div class="ex-list" style="margin-top:12px"><div class="ex cardio"><div class="ex-top"><span class="ex-ic">' + img("treadmill") + '</span><div><h3>마무리 유산소 ' + R.cardio.minutes + '분</h3><div class="tip">' + esc(R.cardio.options) + '</div></div></div></div></div>' : '');
    } else {
      h += '<div class="flow1"><span><b>①</b> 스트레칭 10분</span><i>›</i><span><b>②</b> 웨이트 ' + d.items.length + '종목</span><i>›</i><span><b>③</b> 유산소 ' + (d.cardio && R.cardio ? R.cardio.minutes + '분' : '없음') + '</span></div>';
      var ckD = ED ? null : chkDate(sel);
      h += '<div class="ex-list cmp' + (ckD ? ' ck' : '') + '">' + d.items.map(function (it, i) {
        var main = it.tag === "메인";
        var sets = it.sets.map(function (s, j) {
          var reps = typeof s[0] === "string" ? esc(s[0]) : s[0] + '<i>회</i>';   /* "30초" 같은 글자도 됨 */
          var kg = s[1] == null ? (isCardio(it.name) ? '유산소' : '맨몸') : s[1] + 'kg';                              /* null = 맨몸 */
          return '<div class="set"><small>' + (j + 1) + '세트</small><b>' + reps + '</b><i>' + kg + '</i></div>';
        }).join("");
        var dn = !!ckD && lgDone(it.name, ckD);
        return '<div class="ex' + (main ? ' main' : '') + (it.tag === "워밍업" ? ' t-warm' : it.tag === "선행" ? ' t-pre' : '') + (dn ? ' done' : '') + (ED ? ' rtdr' : '') + '"' + (ED ? ' data-di="' + i + '"' : ' data-exi="' + i + '" role="button" tabindex="0" aria-label="' + esc(it.name) + ' 자세히 보기"') + '><div class="ex-top"><span class="ex-ic">' + img(iconOf(it)) + '<span class="ex-no">' + (i + 1) + '</span>' +
          (main ? '<span class="main-badge">메인</span>' : '') + '</span><div>' +
          '<h3>' + esc(it.name) + '</h3><div class="meta">' + esc(it.en) + ' ' + tagChip(it.tag) + '</div>' +
          '<div class="tip">' + esc(it.tip) + '</div><div class="sets">' + sets + '</div></div></div>' +
          (itemForm(it) ? '<a class="formlink" href="#form-' + esc(itemForm(it).id) + '">▶ 복습지</a>' : '') +
          (ED ? rtItemCtl(i, d.items.length) : !ckD ? '' : '<button type="button" class="exchk" data-chk="' + i + '" data-date="' + ckD + '" aria-pressed="' + dn + '" aria-label="' + esc(it.name) + ' 끝, 기록에 저장"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M5 12.5 10 17l9-10"/></svg></button>') + '</div>';
      }).join("");
      if (ED) h += '<button type="button" class="rtadd" data-rt="add">+ 종목 추가</button>';
      if (d.cardio && R.cardio) {
        h += '<div class="ex cardio"><div class="ex-top"><span class="ex-ic">' + img("treadmill") + '</span><div><h3>마무리 유산소 ' + R.cardio.minutes + '분</h3>' +
          '<div class="tip">' + esc(R.cardio.options) + '</div></div></div></div>';
      }
      h += '</div>' + (R.note ? '<p class="note">' + esc(R.note) + '</p>' : '');
    }
    h += '</section>';
    /* 근육 지도는 2026-11-14 기록 탭으로 옮김 */
    return h + remember();
  }

  /* ---- 종목 자세히 보기 (2026-11-14 장동욱 "종목을 누르면 더 정확하게 + 루틴이랑 복습지를 한번에 합쳐서 부드럽게")
     루틴 종목 카드를 누르면 아래에서 창이 올라옴: 큰 움직이는 아이콘·세트표·선생님 팁 + (연결된 복습지가 있으면) 영상·KEY POINT·O/X → "복습지 전체 보기" */
  function exSheet(it, no) {
    var f = itemForm(it), D = f ? f.dir : "";
    var sets = it.sets.map(function (s, j) {
      var reps = typeof s[0] === "string" ? esc(s[0]) : s[0] + '<small>회</small>';
      return '<div class="xs-set"><span>' + (j + 1) + '세트</span><b>' + reps + '</b><em>' + (s[1] == null ? (isCardio(it.name) ? '유산소' : '맨몸') : s[1] + '<small>kg</small>') + '</em></div>';
    }).join("");
    var h = '<div class="xs-grab" aria-hidden="true"></div><button type="button" class="xs-x" data-xclose aria-label="닫기">×</button>' +
      '<div class="xs-head"><span class="xs-ic' + (it.tag === "메인" ? ' main' : '') + '">' + img(iconOf(it)) + '</span><div>' +
      '<small>' + no + '번째 종목' + (it.tag ? ' · ' + esc(it.tag) : '') + '</small><h2>' + esc(it.name) + '</h2><div class="xs-en">' + esc(it.en || "") + '</div></div></div>' +
      '<div class="xs-sets' + (it.sets.length >= 5 ? ' many' : '') + '">' + sets + '</div>' +
      (it.tip ? '<div class="xs-tip"><b>선생님 팁</b>' + esc(it.tip) + '</div>' : '');
    if (f) {
      h += '<div class="xs-form"><div class="xs-fh"><b>자세 복습지</b><span>' + esc(f.date) + ' 수업</span></div>' +
        '<div class="xs-vid"><video poster="' + esc(D) + 'poster.jpg" src="' + esc(D) + 'form.mp4" autoplay muted loop playsinline webkit-playsinline disablepictureinpicture disableremoteplayback x-webkit-airplay="deny" preload="metadata"></video></div>' +
        '<div class="xs-kp"><small>KEY POINT</small>' + esc(f.key_point) + '</div>' +
        '<div class="xs-ox"><div class="o"><b>이렇게</b><ul>' + f.do.map(function (t) { return '<li>' + esc(t) + '</li>'; }).join("") + '</ul></div>' +
        '<div class="x"><b>이건 피하기</b><ul>' + f.dont.map(function (t) { return '<li>' + esc(t) + '</li>'; }).join("") + '</ul></div></div>' +
        '<a class="xs-go" href="#form-' + esc(f.id) + '" data-xgo>자극 부위 · 동작 3단계까지 전체 보기 →</a></div>';
    }
    var bg = document.createElement("div");
    bg.className = "xsheet-bg";
    bg.innerHTML = '<div class="xsheet" role="dialog" aria-modal="true" aria-label="' + esc(it.name) + '">' + h + '</div>';
    document.body.appendChild(bg);
    document.documentElement.classList.add("rts-open");
    var sh = bg.firstChild;
    requestAnimationFrame(function () { bg.classList.add("on"); });
    var v = sh.querySelector("video"); if (v) { try { var p = v.play(); if (p && p.catch) p.catch(function () {}); } catch (e) {} }
    function close(nav) {
      if (bg.classList.contains("off")) return;
      if (v) try { v.pause(); } catch (e) {}
      bg.classList.add("off"); bg.classList.remove("on");
      setTimeout(function () { bg.remove(); if (!document.querySelector(".rtsheet-bg, .xsheet-bg")) document.documentElement.classList.remove("rts-open"); }, nav ? 0 : 280);
    }
    bg.addEventListener("click", function (e) {
      if (e.target === bg || e.target.closest("[data-xclose]")) close();
      else if (e.target.closest("[data-xgo]")) close(true);
    });
    /* 위쪽(손잡이·제목)을 끌어내리면 닫힘 */
    var y0 = null, dy = 0;
    sh.addEventListener("touchstart", function (e) { if (sh.scrollTop > 0) { y0 = null; return; } y0 = e.touches[0].clientY; dy = 0; }, { passive: true });
    sh.addEventListener("touchmove", function (e) { if (y0 == null) return; dy = e.touches[0].clientY - y0; if (dy > 0) { sh.style.transition = "none"; sh.style.transform = "translateY(" + dy + "px)"; } }, { passive: true });
    sh.addEventListener("touchend", function () { if (y0 == null) return; y0 = null; sh.style.transition = ""; sh.style.transform = ""; if (dy > 90) close(); });
  }
  document.addEventListener("click", function (e) {
    var c = e.target.closest && e.target.closest(".ex-list.cmp .ex[data-exi]");
    if (!c || e.target.closest("a, button")) return;
    var d = dayByKey(view.getAttribute("data-day")), it = d && d.items && d.items[+c.getAttribute("data-exi")];
    if (it) exSheet(it, +c.getAttribute("data-exi") + 1);
  });
  document.addEventListener("keydown", function (e) {
    if ((e.key === "Enter" || e.key === " ") && e.target.matches && e.target.matches(".ex-list.cmp .ex[data-exi]")) { e.preventDefault(); e.target.click(); }
  });

  /* ---------------- 식단 */
  /* M.diet: null = 준비 중 / 문자열 = 그대로 / 객체 = 종이 다이어트 식단표(2026-10-21 표준 틀)와 같은 구성 (2026-11-05) */
  function foodImg(key, cls) {
    var src = /^ic_/.test(key) ? BASE + "food/" + THEME + "/" + key + ".png" : BASE + "food/" + key + ".png";
    return '<img class="' + (cls || "fd-img") + '" src="' + src + '" alt="" loading="lazy">';
  }
  /* ===== 내 식단 짜기 (2026-11-18 장동욱 "식단 항목 리메이크 — 인바디 올리면 계산해서 식단 항목을 골라 주고, 회원이 선택해서 자율적으로 짜게, 목적은 다이어트·벌크·유지로 칼로리 기준")
     몸 숫자 = 가장 최근 인바디(체중·체지방률, 없으면 직접 입력) → 기초대사량(370 + 21.6 × 제지방량) × 활동량 → 목적별 하루 칼로리(다이어트 −20%·기초대사량 밑으로는 안 내림 / 유지 / 벌크 +12%)
     → 단백질(제지방 1kg당 다 2.4·유 2.0·벌 2.2g)·지방 25%·나머지 탄수 → 끼니 수로 나눠 끼니마다 탄수 1 + 단백질 1을 고르면 양(g)을 계산. 저장 mw:<주소>:diet (+폰) */
  var DB_LS = "ptnote:" + SLUG + ":diet", DB = null, DB_TAB = null, DB_IBSYNC = 0;
  var DB_GOAL = { cut: { n: "다이어트", k: .8, p: 2.4, pw: 1.8, d: "하루 쓰는 열량보다 20% 적게" }, keep: { n: "유지", k: 1, p: 2.0, pw: 1.5, d: "쓰는 만큼 먹기" }, bulk: { n: "벌크업", k: 1.12, p: 2.2, pw: 1.7, d: "쓰는 열량보다 12% 많이" } };
  var DB_ACT = [[1.2, "거의 안 함"], [1.375, "주 1~3회"], [1.55, "주 4~5회"], [1.725, "주 6회 이상"]];
  /* 음식 100g당(탄 c·단 p·지 f·kcal k) — 고기·생선은 익히기 전 무게, 밥·고구마·감자는 익힌 무게. u = 한 개 무게(g)·단위·한 끼 최대 개수 */
  /* 2026-11-19 검산·추가: 식약처 식품성분표·제품 표시값 기준. h = [한 개(공기) 무게, 단위] 어림 표시, mx = 한 끼에 현실적인 최대(넘으면 "양이 많아요"), r = 반올림 단위(g) */
  var DB_C = [
    { id: "rice_white", n: "흰쌀밥", c: 33, p: 2.5, f: .3, k: 150, h: [210, "공기"] }, { id: "rice_brown", n: "현미밥", c: 32, p: 3, f: 1, k: 152, h: [210, "공기"] },
    { id: "rice_mixed", n: "잡곡밥", c: 32, p: 3, f: .8, k: 150, h: [210, "공기"] },
    { id: "sweet_potato", n: "고구마", c: 31, p: 1.5, f: .2, k: 130, mx: 450, h: [150, "개(주먹 크기)"] }, { id: "potato", n: "감자", c: 17, p: 2, f: .1, k: 77, mx: 450, h: [150, "개(주먹 크기)"] },
    { id: "pumpkin", n: "단호박", c: 15, p: 1.7, f: .3, k: 66, mx: 450, h: [400, "통(미니 단호박)"] },
    { id: "oatmeal", n: "오트밀", c: 66, p: 13, f: 7, k: 380, mx: 120, h: [60, "컵(종이컵)"] }, { id: "bagel", n: "베이글", c: 50, p: 10, f: 1.5, k: 260, u: [100, "개", 3, .5] },
    { id: "bread", n: "통밀식빵", c: 45, p: 10, f: 4, k: 250, u: [35, "장", 6, 1] }, { id: "banana", n: "바나나", c: 23, p: 1.1, f: .2, k: 93, u: [100, "개", 4, .5] },
    { id: "pasta", n: "파스타(삶은 면)", c: 30, p: 5.5, f: 1, k: 150, mx: 450, h: [220, "인분"] }, { id: "tteok", n: "떡(가래떡)", c: 50, p: 4, f: .5, k: 225, mx: 300, h: [120, "줄"] }
  ];
  var DB_P = [
    { id: "chicken", n: "닭가슴살", c: 0, p: 23, f: 1.5, k: 106, h: [100, "팩"] }, { id: "tender", n: "닭안심", c: 0, p: 23, f: 1, k: 105, h: [35, "쪽"] },
    { id: "thigh", n: "닭다리살(정육)", c: 0, p: 19.5, f: 4.5, k: 120, h: [110, "장"] }, { id: "beef", n: "소 우둔살·홍두깨살", c: 0, p: 21, f: 5, k: 130, h: [100, "장(손바닥 크기)"] }, { id: "beef_fan", img: "beef", n: "소 부채살", c: 0, p: 20, f: 11, k: 180, h: [100, "장(손바닥 크기)"] },
    { id: "pork", n: "돼지 안심", c: 0, p: 22, f: 4, k: 125, h: [100, "장(손바닥 크기)"] }, { id: "fish", n: "흰살생선", c: 0, p: 20, f: 1, k: 90, h: [100, "토막"] },
    { id: "salmon", n: "연어", c: 0, p: 20, f: 13, k: 200, h: [100, "토막"] }, { id: "mackerel", n: "고등어", c: 0, p: 20, f: 10, k: 180, h: [240, "마리"] },
    { id: "shrimp", n: "새우", c: 0, p: 20, f: 1, k: 90, h: [10, "마리(칵테일새우)"] }, { id: "squid", n: "오징어", c: 3, p: 16, f: 1.4, k: 90, h: [200, "마리"] },
    { id: "tofu", n: "두부", c: 2, p: 9, f: 5, k: 85, h: [300, "모"] },
    { id: "egg", n: "계란", c: 1, p: 12, f: 10, k: 140, u: [50, "개", 4, 1] }, { id: "egg_white", n: "계란 흰자", c: .7, p: 11, f: .2, k: 50, u: [33, "개", 10, 1] },
    { id: "shaker", n: "프로틴", c: 10, p: 80, f: 5, k: 400, u: [30, "스쿱", 2, .5] }
  ];
  var DB_F = [
    { id: "almond", n: "아몬드", c: 20, p: 21, f: 50, k: 580, r: 5, mx: 45, h: [1.2, "알"] }, { id: "walnut", n: "호두", c: 14, p: 15, f: 65, k: 655, r: 5, mx: 40, h: [4, "알(반쪽)"] },
    { id: "avocado", n: "아보카도", c: 9, p: 2, f: 15, k: 160, r: 10, mx: 150, h: [140, "개"] }, { id: "olive_oil", n: "올리브유·들기름", c: 0, p: 0, f: 100, k: 900, r: 1, mx: 20, h: [5, "작은술"] },
    { id: "peanut_butter", n: "땅콩버터(무가당)", c: 20, p: 25, f: 50, k: 590, r: 5, mx: 40, h: [16, "큰술"] }
  ];
  function dbHint(f, a) {   /* t "약 2팩" · b "1팩 = 100g"(회원이 알기 쉬운 단위, 2026-11-19) + 한 끼에 너무 많으면 much */
    var t = "", bs = "";
    if (f.h) { bs = "1" + f.h[1].replace(/\(.*\)/, "") + " = " + f.h[0] + "g"; if (a.g) { var n = a.g / f.h[0]; n = n >= 3 ? Math.round(n) : Math.round(n * 2) / 2; if (n >= .5) t = "약 " + n + f.h[1]; } }
    else if (f.u) bs = "1" + f.u[1] + " = " + f.u[0] + "g";
    return { t: t, b: bs, much: !!(f.mx && a.g > f.mx) };
  }
  function dbFind(L, id) { for (var i = 0; i < L.length; i++) if (L[i].id === id) return L[i]; return null; }
  function dbGet() {
    if (DB) return DB;
    try { DB = JSON.parse(localStorage.getItem(DB_LS) || "null"); } catch (e) {}
    if (!DB) { var wd = M.routine && M.routine.days ? M.routine.days.filter(function (d) { return !d.rest; }).length : 3;
      DB = { g: /다이어트|감량|바프|체지방/.test(M.goal || "") ? "cut" : /벌크|증량|근비대/.test(M.goal || "") ? "bulk" : "keep", a: wd >= 6 ? 3 : wd >= 4 ? 2 : wd >= 1 ? 1 : 0, n: 3, p: [], at: 0 }; }
    if (!DB.p) DB.p = [];
    return DB;
  }
  function dbSave() {
    DB.at = Date.now();
    try { localStorage.setItem(DB_LS, JSON.stringify(DB)); } catch (e) {}
    if (ATT_API && !DEMO) rtPost({ a: "kv_set", k: "mw:" + SLUG + ":diet", v: DB }).catch(function () {});
    rerender();
  }
  function dbServer(kv) {
    dbGet(); var v = kv && kv["mw:" + SLUG + ":diet"] || null;
    if (!v || (DB.at || 0) >= (v.at || 0)) return;
    DB = v; try { localStorage.setItem(DB_LS, JSON.stringify(v)); } catch (e) {}
    if (/^#diet/.test(location.hash)) rerender();
  }
  function dbIbSig() { return ibData && ibData.length ? JSON.stringify(ibData[ibData.length - 1]) : ""; }   /* 인바디가 새로 올라오거나 지워지면 식단도 다시 계산 */
  function dbFromIb(date, x) {   /* 인바디를 올릴 때 결과지에서 읽은 기초대사량·키를 식단 쪽에 적어 둠 */
    if (!x || (!x.bmr && !x.h)) return; var d = dbGet();
    if (x.h) d.h = x.h; if (x.bmr) d.ib = { d: date, bmr: x.bmr };
    d.at = Date.now(); try { localStorage.setItem(DB_LS, JSON.stringify(d)); } catch (e) {}
    if (ATT_API && !DEMO) rtPost({ a: "kv_set", k: "mw:" + SLUG + ":diet", v: d }).catch(function () {});
  }
  function dbBmr(b) { var d = dbGet(), k = b && b.src || "m"; return d.ib && d.ib.d === k && d.ib.bmr >= 800 && d.ib.bmr <= 3500 ? d.ib.bmr : (b && b.bmr) || null; }   /* 손으로 적은 값 → 없으면 인바디 기록(시트)에 저장된 값 */   /* 결과지(또는 직접 적은) 기초대사량 */
  function dbBody() {   /* 가장 최근 인바디 → 없으면 직접 넣은 값 */
    var d = dbGet(), p = IB_ON && !d.manual ? ibPair() : null, c = p && p.cur;
    if (c && c.w) return { w: c.w, pbf: c.pbf != null ? c.pbf : (c.bfm != null ? c.bfm / c.w * 100 : null), smm: c.smm, src: c.d, bmr: c.bmr || null, h: c.h || null };
    return d.w ? { w: d.w, pbf: d.pbf || null, src: null } : null;
  }
  function dbCalc() {
    var d = dbGet(), b = dbBody(); if (!b) return null;
    var G = DB_GOAL[d.g] || DB_GOAL.keep, lbm = b.pbf ? b.w * (1 - b.pbf / 100) : null;
    var real = dbBmr(b), bmr = real || (lbm ? 370 + 21.6 * lbm : b.w * (M.sex === "F" ? 22 : 24)), tdee = bmr * DB_ACT[d.a || 0][0];
    var kcal = Math.round(Math.max(bmr, tdee * G.k) / 10) * 10;
    var P = Math.round(lbm ? lbm * G.p : b.w * G.pw), F = Math.round(kcal * .25 / 9), C = Math.max(50, Math.round((kcal - P * 4 - F * 9) / 4));
    return { b: b, lbm: lbm, bmr: Math.round(bmr), real: !!real, tdee: Math.round(tdee), kcal: kcal, P: P, F: F, C: C, n: d.n || 3, G: G };
  }
  function dbAmt(f, need, key) {   /* 필요한 탄수(또는 단백질) g → 그 음식 양 */
    var g = Math.max(0, need) / f[key] * 100;
    if (f.u) { var cnt = Math.max(f.u[3], Math.min(f.u[2], Math.round(g / f.u[0] / f.u[3]) * f.u[3])); return { g: cnt * f.u[0], t: (cnt % 1 ? cnt.toFixed(1) : cnt) + f.u[1] }; }
    var r = f.r || 10; g = Math.max(f.r ? r : 20, Math.round(g / r) * r); return { g: g, t: g + "g" };
  }
  function dbIds(pk, idx) { var v = (pk || [])[idx]; return (Array.isArray(v) ? v : v ? [v] : []).slice(0, 2); }   /* 한 칸에 담은 음식 id들(예전 저장은 글자 하나) */
  function dbMeal(R, i) {   /* i번째 끼니에서 고른 음식과 양 — 한 칸에 두 가지를 담으면 필요한 양을 반반으로 나눔(2026-11-19 "한 끼에 탄수를 두 가지") */
    var pk = dbGet().p[i] || [], o = { c: 0, p: 0, f: 0, k: 0, cs: [], ps: [], fs: [] };
    function fill(L, idx, need, key, out) {
      var fs = dbIds(pk, idx).map(function (id) { return dbFind(L, id); }).filter(Boolean);
      fs.forEach(function (f) { var a = dbAmt(f, need / fs.length, key), m = a.g / 100; out.push({ f: f, a: a }); o.c += f.c * m; o.p += f.p * m; o.f += f.f * m; o.k += f.k * m; });
      return fs.length;
    }
    var nc = fill(DB_C, 0, R.C / R.n, "c", o.cs);
    o.pn = R.P / R.n - (nc ? o.p : R.C / R.n * .08);                 /* 탄수 음식에 든 단백질을 뺀 나머지 */
    var f0 = o.f, np = fill(DB_P, 1, o.pn, "p", o.ps);
    o.fn = R.F / R.n - (nc ? f0 : 1) - (np ? o.f - f0 : 5);          /* 탄수·단백질 음식에 든 지방을 뺀 나머지 */
    fill(DB_F, 2, o.fn, "f", o.fs);
    return o;
  }
  function dbIcon(id) { var f = dbFind(DB_P, id); return '<img src="' + BASE + 'food/' + (f && f.img || id) + '.png" alt="" loading="lazy">'; }
  function dbBuilder() {
    if (IB_ON && !ibData && !DB_IBSYNC) { DB_IBSYNC = 1; try { ibData = JSON.parse(localStorage.getItem(IB_KEY) || "null"); } catch (e) {} ibSync(); }
    DB_IBDRAWN = dbIbSig();
    var d = dbGet(), b = dbBody(); if (b && b.h && !d.h) d.h = b.h;   /* 키: 인바디 기록에 있으면 그걸로 */
    var R = dbCalc(), h = '<section class="db">' + head("", "내 식단 짜기", "목적을 고르면 내 몸에 맞는 양을 계산해 줘요");
    h += '<div class="panel db-set"><small class="db-l">목적</small><div class="db-seg">' + ["cut", "keep", "bulk"].map(function (g) {
      return '<button type="button" class="' + (d.g === g ? "on" : "") + '" data-db="g:' + g + '"><b>' + DB_GOAL[g].n + '</b><i>' + DB_GOAL[g].d + '</i></button>'; }).join("") + '</div>';
    h += '<small class="db-l db-lr">내 몸' + (b || d.h || d.w ? '<button type="button" class="db-reset" data-db="reset:1">내 몸 초기화</button>' : '') + '</small>';
    if (b && b.src) h += '<div class="db-body"><span class="db-chip">인바디 ' + esc(b.src.slice(5).replace("-", "/")) + ' 기준</span><label class="db-hl">키<input type="number" inputmode="decimal" class="db-in db-h" value="' + (d.h || "") + '" placeholder="cm"></label><b><small>체중</small> ' + b.w + '<i>kg</i></b>' + (b.pbf ? '<b><small>체지방</small> ' + (Math.round(b.pbf * 10) / 10) + '<i>%</i></b>' : '') +
      '<button type="button" class="db-link" data-db="manual:1">직접 입력</button></div>';
    else h += '<div class="db-body in"><label>키<input type="number" inputmode="decimal" class="db-in" data-k="h" value="' + (d.h || "") + '" placeholder="cm"></label><label>체중<input type="number" inputmode="decimal" class="db-in" data-k="w" value="' + (d.w || "") + '" placeholder="kg"></label><label>체지방률<input type="number" inputmode="decimal" class="db-in" data-k="pbf" value="' + (d.pbf || "") + '" placeholder="%"></label>' +
      '<button type="button" class="db-ok" data-db="body:1">계산</button></div><p class="db-tip">' + (IB_ON ? (d.manual ? '<button type="button" class="db-link" data-db="manual:0">인바디 기록으로 계산하기</button>' : '아래에서 인바디 결과지를 올리면 자동으로 채워져요') : '체지방률을 넣으면 더 정확해요') + '</p>';
    if (b && d.h) { var bmi = b.w / Math.pow(d.h / 100, 2), std = Math.pow(d.h / 100, 2) * (M.sex === "F" ? 21 : 22);
      h += '<div class="db-bmi"><span>키 <b>' + d.h + '</b>cm</span><span>체중 <b>' + b.w + '</b>kg</span><span>BMI <b>' + bmi.toFixed(1) + '</b></span><span>표준 체중 <b>' + std.toFixed(1) + '</b>kg</span></div>'; }
    /* 2026-11-19 장동욱 "기초대사량은 회원님이 안 적어도 되지 않나" → 입력 칸 없앰: 인바디 결과지 사진에서 자동으로 읽고(dbFromIb), 없으면 체중·체지방률로 계산. 결과 칸에 '기초대사량 n(결과지/계산)'만 보여 줌 */
    if (IB_ON && ibReady !== false) h += '<div class="db-ib"><button type="button" class="db-ibbtn" data-db="ib:1"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M4 8h3l1.5-2h7L17 8h3v11H4z" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linejoin="round"/><circle cx="12" cy="13" r="3.4" fill="none" stroke="currentColor" stroke-width="1.8"/></svg>' +
      (b && b.src ? '새 인바디 결과지 올리기' : '인바디 결과지 사진 올리기') + '</button><a class="db-link" href="#body">몸변화 기록 보기</a></div><p class="db-tip"><b>인바디 결과지로 계산하면 칼로리가 더 정확해요</b> — 체중만이 아니라 내 근육량·체지방량으로 계산하거든요</p><p class="db-tip">결과지 사진을 올리면 숫자를 읽어서 식단도 바로 다시 계산해요 · 기록 탭 인바디와 같은 기록이에요</p>';
    h += '<small class="db-l">운동 횟수</small><div class="db-chips">' + DB_ACT.map(function (a, i) { return '<button type="button" class="' + ((d.a || 0) === i ? "on" : "") + '" data-db="a:' + i + '">' + a[1] + '</button>'; }).join("") + '</div>';
    h += '<small class="db-l">하루 끼니</small><div class="db-chips">' + [2, 3, 4, 5].map(function (n) { return '<button type="button" class="' + ((d.n || 3) === n ? "on" : "") + '" data-db="n:' + n + '">' + n + '끼</button>'; }).join("") + '</div></div>';
    if (!R) return h + '<div class="panel empty"><h3>체중을 넣으면 계산해 드려요</h3><p>인바디 결과지를 올리거나 위에 체중을 적어 주세요</p></div></section>';
    var T = { c: 0, p: 0, f: 0, k: 0 }, meals = "";
    for (var i = 0; i < R.n; i++) {
      var m = dbMeal(R, i); T.c += m.c; T.p += m.p; T.f += m.f; T.k += m.k;
      meals += '<div class="db-meal"><div class="db-mh"><b>' + (i + 1) + '끼</b><span>' + (m.k ? Math.round(m.k) + ' kcal' : '탄수 ' + Math.round(R.C / R.n) + 'g · 단백질 ' + Math.round(R.P / R.n) + 'g · 지방 ' + Math.round(R.F / R.n) + 'g') + '</span></div><div class="db-slots s3">' +
        [["c", m.cs, "탄수화물"], ["p", m.ps, "단백질"], ["f", m.fs, "지방"]].map(function (x) {
          return '<button type="button" class="db-slot' + (x[1].length ? " on" : "") + (x[1].length > 1 ? " two" : "") + '" data-db="pick:' + i + ':' + x[0] + '">' + (x[1].length ? x[1].map(function (q) { return '<span class="db-it">' + dbIcon(q.f.id) + '<b>' + esc(q.f.n) + '</b><em>' + q.a.t + '</em>' + (dbHint(q.f, q.a).t ? '<small class="db-hint">' + dbHint(q.f, q.a).t.replace(/\(.*\)/, "") + '</small>' : '') + '</span>'; }).join("") +
            '<span class="db-x" role="button" aria-label="' + x[2] + ' 빼기" data-db="rm:' + i + ':' + x[0] + '">×</span>' : '<span class="db-plus">＋</span><b>' + x[2] + '</b><small>고르기</small>') + '</button>';
        }).join("") + '</div></div>';
    }
    function bar(l, v, t, u) { var pc = Math.min(100, Math.round(v / t * 100)); return '<div class="db-bar"><span>' + l + '</span><div class="db-track"><i style="width:' + pc + '%"' + (v > t * 1.08 ? ' class="over"' : '') + '></i></div><b>' + Math.round(v) + '<i>/' + t + u + '</i></b></div>'; }
    var leftF = Math.max(0, Math.round(R.F - T.f));
    h += '<div class="panel db-res"><div class="db-kcal"><small>' + R.G.n + ' · 하루 목표</small><b>' + R.kcal.toLocaleString() + '<i>kcal</i></b><p>기초대사량 ' + R.bmr.toLocaleString() + (R.real ? '(결과지)' : '(계산)') + ' · 하루 쓰는 열량 ' + R.tdee.toLocaleString() + ' kcal</p></div>' +
      '<div class="dt-stats db-mac"><div><small>탄수화물</small><b>' + R.C + '</b><i>g</i></div><div><small>단백질</small><b>' + R.P + '</b><i>g</i></div><div><small>지방</small><b>' + R.F + '</b><i>g</i></div></div></div>';
    h += head("", "끼니마다 골라 담기", "칸을 누르면 음식과 먹을 양이 나와요") + '<div class="db-meals">' + meals + '</div>';
    h += '<div class="panel db-sum"><h3>오늘 담은 식단</h3>' + bar("칼로리", T.k, R.kcal, "") + bar("탄수화물", T.c, R.C, "g") + bar("단백질", T.p, R.P, "g") + bar("지방", T.f, R.F, "g") +
      '<p class="db-tip">' + (T.k ? (leftF >= 8 ? '지방이 약 ' + leftF + 'g 남았어요 · 끼니의 지방 칸에서 견과류·아보카도·기름을 골라 채워요' : '지방도 거의 다 채웠어요') : '끼니 칸을 눌러 음식을 골라 보세요') + '</p>' +
      '<p class="db-tip">채소는 끼니마다 한 줌 이상 자유롭게 · 물은 하루 2L · 고기·생선·오트밀은 익히기 전, 밥·면·고구마·감자는 익힌 뒤 무게예요</p>' +
      (d.p.length ? '<button type="button" class="db-link" data-db="clear:1">담은 것 비우기</button>' : '') + '</div>';
    return h + '</section>';
  }
  function dbPick(i, kind) {   /* 음식 고르기 창 — 눌러서 담고, 다시 누르면 빠짐. 두 가지까지(반반) */
    var R = dbCalc(); if (!R) return; var d = dbGet(), idx = kind === "c" ? 0 : kind === "p" ? 1 : 2, L = [DB_C, DB_P, DB_F][idx], KN = ["탄수화물", "단백질", "지방"][idx];
    var sel = dbIds(d.p[i], idx), M0 = dbMeal(R, i), need = kind === "c" ? R.C / R.n : kind === "p" ? M0.pn : M0.fn, key = kind;
    function cards() {
      var much = 0, base = [], h = L.map(function (f) {
        var on = sel.indexOf(f.id) >= 0, a = dbAmt(f, need / (on ? sel.length : sel.length ? 2 : 1), key), hn = dbHint(f, a);
        if (hn.much) much = 1;
        var bt = (f.h ? "1" + f.h[1] + " " + f.h[0] + "g" : f.u ? "1" + f.u[1] + " " + f.u[0] + "g" : "").replace("(", " (");
        if (bt) { bt = esc(f.n.replace(/\(.*\)/, "")) + " " + bt; if (base.indexOf(bt) < 0) base.push(bt); }
        return '<button type="button" class="db-food' + (on ? " on" : "") + (hn.much ? " much" : "") + '" data-f="' + f.id + '">' + (on ? '<i class="db-ck">✓</i>' : '') + dbIcon(f.id) + '<b>' + esc(f.n) + '</b><em>' + a.t + '</em><small>' + Math.round(f.k * a.g / 100) + ' kcal' + (hn.t ? ' · <u>' + hn.t.replace(/\(.*\)/, "") + '</u>' : '') + '</small>' + (hn.much ? '<i class="db-much">많아요</i>' : '') + '</button>';
      }).join("");
      return '<div class="db-foods">' + h + '</div>' + (much ? '<p class="db-tip"><b class="db-mt">많아요</b> 표시는 한 끼에 다 먹기 힘든 양이에요 · 두 가지를 섞거나 끼니 수를 늘려 보세요</p>' : '') +
        (base.length ? '<details class="db-base"><summary>1공기·1팩은 몇 g? 어림 기준 보기</summary><p>' + base.join(" · ") + '</p></details>' : '');
    }
    function state() { return '<b>' + (sel.length ? sel.map(function (id) { return esc(dbFind(L, id).n); }).join(" + ") + (sel.length > 1 ? ' · 반반' : '') : '아직 안 담았어요') + '</b>' + (sel.length ? '<button type="button" class="db-out" data-out="1">전부 빼기</button>' : ''); }
    var body = '<p class="rts-note">' + (i + 1) + '끼 ' + KN + ' · 눌러서 담고, 다시 누르면 빠져요</p><p class="db-tip">두 가지까지 담을 수 있어요 · 두 가지면 양을 반반으로 나눠 계산해요</p>' +
      (kind === "f" ? '<p class="db-tip">' + (need < 3 ? '이 끼니는 고른 음식에 지방이 충분해요 · 안 담아도 돼요' : '탄수·단백질 음식에 든 지방을 빼고 남은 ' + Math.round(need) + 'g 기준이에요 · 먼저 탄수·단백질을 고르면 더 정확해요') + '</p>' : '') +
      '<div class="db-cards">' + cards() + '</div><div class="db-state">' + state() + '</div>' +
      (R.n > 1 ? '<label class="db-all"><input type="checkbox" class="db-allc"> 모든 끼니에 똑같이 담기</label>' : '');
    var sh = rtSheet((i + 1) + "끼 " + KN, body, function () {
      var all = sh.querySelector(".db-allc");
      for (var j = 0; j < R.n; j++) if (j === i || (all && all.checked)) { d.p[j] = d.p[j] || [null, null, null]; d.p[j][idx] = sel.length ? sel.slice() : null; }
      setTimeout(dbSave, 0);
    }, "담기");
    sh.addEventListener("click", function (e) {
      var o = e.target.closest("[data-out]"), t = e.target.closest("[data-f]"); if (!o && !t) return;
      if (o) sel = [];
      else { var id = t.getAttribute("data-f"), k = sel.indexOf(id);
        if (k >= 0) sel.splice(k, 1); else if (sel.length >= 2) { attToast("두 가지까지 담을 수 있어요 · 담은 음식을 눌러 먼저 빼 주세요"); return; } else sel.push(id); }
      var sc = sh.querySelector(".rts-body"), y = sc ? sc.scrollTop : 0;
      sh.querySelector(".db-cards").innerHTML = cards(); sh.querySelector(".db-state").innerHTML = state(); if (sc) sc.scrollTop = y;
    });
  }
  document.addEventListener("click", function (e) {
    var t = e.target.closest("[data-db]"); if (!t) return;
    var a = t.getAttribute("data-db").split(":"), d = dbGet();
    if (a[0] === "g") d.g = a[1]; else if (a[0] === "a") d.a = +a[1]; else if (a[0] === "n") d.n = +a[1];
    else if (a[0] === "manual") d.manual = a[1] === "1" ? 1 : 0;
    else if (a[0] === "clear") d.p = [];
    else if (a[0] === "body") { var box = t.closest(".db-body"), w = parseFloat(box.querySelector('[data-k="w"]').value), f = parseFloat(box.querySelector('[data-k="pbf"]').value);
      var hh = parseFloat(box.querySelector('[data-k="h"]').value);
      if (!(w >= 30 && w <= 250)) { attToast("체중을 kg으로 적어 주세요"); return; } d.w = w; d.h = hh >= 120 && hh <= 220 ? hh : null; d.pbf = f >= 3 && f <= 60 ? f : null; }
    else if (a[0] === "pick") { dbPick(+a[1], a[2]); return; }
    else if (a[0] === "rm") { if (d.p[+a[1]]) d.p[+a[1]][a[2] === "c" ? 0 : a[2] === "p" ? 1 : 2] = null; attToast("음식을 뺐어요"); }
    else if (a[0] === "reset") {   /* 한 번 더 눌러야 초기화 (2026-11-19) */
      if (!t.classList.contains("sure")) { t.classList.add("sure"); t.textContent = "한 번 더 누르면 초기화돼요"; setTimeout(function () { if (t.isConnected) { t.classList.remove("sure"); t.textContent = "내 몸 초기화"; } }, 4000); return; }
      d.w = d.h = d.pbf = null; d.manual = 1; attToast("내 몸 숫자를 지웠어요");
    }
    else if (a[0] === "ib") { d.manual = 0; try { localStorage.setItem(DB_LS, JSON.stringify(d)); } catch (e2) {} ibSheetOpen(); return; }
    else if (a[0] === "tab") { DB_TAB = a[1]; rerender(); if (t.classList.contains("dg-go")) window.scrollTo(0, 0); return; }
    else return;
    dbSave();
  });
  document.addEventListener("change", function (e) {   /* 인바디 기준일 때 키만 따로 적기 */
    if (e.target.classList && e.target.classList.contains("db-bmr")) { var bv = parseFloat(e.target.value), dd = dbGet(), bb = dbBody();
      if (e.target.value && !(bv >= 800 && bv <= 3500)) { attToast("기초대사량은 800~3500 사이로 적어 주세요"); return; }
      dd.ib = bv ? { d: bb && bb.src || "m", bmr: Math.round(bv) } : null; dbSave(); return; }
    if (!e.target.classList || !e.target.classList.contains("db-h")) return;
    var v = parseFloat(e.target.value), d = dbGet(); d.h = v >= 120 && v <= 220 ? v : null; dbSave();
  });
  /* ===== 먹은 기록 (2026-11-20 장동욱 "식단칸에 사진으로 찍어서 나도 회원님도 뭐 먹었는지 쓸 수 있게, 어떤 음식·양·순탄수·순단백·지방을 분석, 칼로리도, 따로 전환칸")
     식단 탭 전환 칸 '먹은 기록'(DB_TAB "log"). 창고 시트 "식단기록" + 드라이브 사진(작은 사진은 시트에) — a=meal(최근 14일)/meal&d=(그날)/meal_add/meal_del/meal_img/meal_ai.
     창고가 새 버전일 때만 칸이 보임(출석 응답 meal:1 → mlFlag). 그룹 PT 노트(이름에 ·)는 기록이 섞여서 안 씀. */
  var ML_OK = !/·/.test(M.name || ""), ML_ON = false, ML = null, ML_OLD = {}, ML_DAY = null, ML_BUSY = false, ML_ERR = false;
  try { ML_ON = ML_OK && localStorage.getItem("ptnote:mlon") === "1"; } catch (e) {}
  var ML_T = ["아침", "점심", "저녁", "간식"];
  var ML_CAM = '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M4 8h3l1.5-2h7L17 8h3v11H4z" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linejoin="round"/><circle cx="12" cy="13.2" r="3.4" fill="none" stroke="currentColor" stroke-width="1.8"/></svg>';
  var ML_SAMPLE = [{ n: "현미밥", g: 180, u: "1공기 조금 안 되게", c: 56, p: 5, f: 1.5, k: 265 }, { n: "닭가슴살 구이", g: 130, u: "손바닥 1장", c: 0, p: 31, f: 3, k: 155 }, { n: "계란 프라이", g: 50, u: "1개", c: 0.5, p: 6.5, f: 7, k: 92 }, { n: "김치", g: 40, u: "작은 접시", c: 1.5, p: 0.8, f: 0.2, k: 12 }];
  function mlFlag(j) {
    if (!ML_OK || ML_ON || !j || !j.meal) return;
    ML_ON = true; try { localStorage.setItem("ptnote:mlon", "1"); } catch (e) {}
    if (/^#diet/.test(location.hash)) rerender();
  }
  function mlDraw() { if (/^#diet/.test(location.hash) && DB_TAB === "log") rerender(); }
  function mlSync(d) {
    if (!ATT_API) return;
    fetch(ATT_API + "?m=" + encodeURIComponent(SLUG) + "&a=meal" + (d ? "&d=" + d : ""), { cache: "no-store" })
      .then(function (r) { return r.json(); })
      .then(function (j) {
        if (!j || !j.ok || !Array.isArray(j.meal)) throw new Error("meal");
        if (d) ML_OLD[d] = j.meal; else { ML = j.meal; ML_ERR = false; }
        mlDraw();
      })
      .catch(function () { if (d) ML_OLD[d] = []; else if (!ML) { if (DEMO) ML = []; else ML_ERR = true; } mlDraw(); });
  }
  function mlFrom() { return ymd(new Date(Date.now() - 13 * 864e5)); }
  function mlDayList(d) {
    var src = d >= mlFrom() ? ML : ML_OLD[d];
    if (!src) return null;
    return src.filter(function (r) { return r.d === d; }).sort(function (a, b) { return (ML_T.indexOf(a.t) - ML_T.indexOf(b.t)) || (a.at < b.at ? -1 : 1); });
  }
  function mlSum(list) {
    var T = { k: 0, c: 0, p: 0, f: 0 };
    (list || []).forEach(function (r) { (r.it || []).forEach(function (x) { T.k += x.k || 0; T.c += x.c || 0; T.p += x.p || 0; T.f += x.f || 0; }); });
    return T;
  }
  function mlBar(l, v, t) {
    v = Math.round(v);
    if (!t) return '<div class="db-bar"><span>' + l + '</span><div class="db-track"><i style="width:0"></i></div><b>' + v + '<i>g</i></b></div>';
    return '<div class="db-bar"><span>' + l + '</span><div class="db-track"><i style="width:' + Math.min(100, Math.round(v / t * 100)) + '%"' + (v > t * 1.08 ? ' class="over"' : '') + '></i></div><b>' + v + '<i> / ' + t + 'g</i></b></div>';
  }
  function mlCard(r) {
    var T = mlSum([r]), th = r.th && /^[A-Za-z0-9+\/=]+$/.test(r.th) ? r.th : "";
    var who = r.by === "c" ? "선생님" : (COACH_MODE ? "회원님" : "내가");
    return '<article class="ml-card" data-ml="edit:' + esc(r.id) + '">' +
      (th ? '<span class="ml-ph"><img src="data:image/jpeg;base64,' + th + '" alt="음식 사진"></span>' : '<span class="ml-ph none">' + ML_CAM + '</span>') +
      '<div class="ml-b"><div class="ml-h"><b>' + esc(r.t) + '</b><span class="ml-by' + (r.by === "c" ? " c" : "") + '">' + who + ' 기록</span>' +
      (r.it && r.it.length ? '<em>' + Math.round(T.k).toLocaleString() + '<i>kcal</i></em>' : '') + '</div>' +
      (r.it && r.it.length ? '<ul class="ml-it">' + r.it.map(function (x) { return '<li><span>' + esc(x.n) + '</span><i>' + (x.g ? Math.round(x.g) + 'g' : '') + (x.u ? (x.g ? ' · ' : '') + esc(x.u) : '') + '</i></li>'; }).join("") + '</ul>' +
        '<div class="ml-mac"><span>순탄수 <b>' + Math.round(T.c) + 'g</b></span><span>단백질 <b>' + Math.round(T.p) + 'g</b></span><span>지방 <b>' + Math.round(T.f) + 'g</b></span></div>'
        : '<p class="ml-wait">아직 음식을 안 적었어요 · 눌러서 적기</p>') +
      (r.memo ? '<p class="ml-memo">' + esc(r.memo) + '</p>' : '') +
      (r.cm ? '<p class="ml-cm"><b>선생님 한마디</b>' + esc(r.cm) + '</p>' : '') + '</div></article>';
  }
  function mlView() {
    var today = ymd(new Date()), d = ML_DAY || today, old = d < mlFrom();
    if (!old && ML === null && !ML_ERR && !ML_BUSY) { ML_BUSY = true; mlSync(); }
    if (old && !(d in ML_OLD)) { ML_OLD[d] = null; mlSync(d); }
    var list = mlDayList(d), R = dbCalc(), T = mlSum(list), dt = new Date(d + "T00:00:00");
    var h = '<section class="ml">' + head("", "식단 기록", "사진만 찍어 올리면 음식·양·탄단지·칼로리를 읽어 줘요");
    h += '<div class="ml-date"><button type="button" data-ml="day:-1" aria-label="전날">‹</button><b>' + (dt.getMonth() + 1) + '월 ' + dt.getDate() + '일 (' + "일월화수목금토".charAt(dt.getDay()) + ')' + (d === today ? '<i>오늘</i>' : '') + '</b>' +
      '<button type="button" data-ml="day:1" aria-label="다음 날"' + (d >= today ? ' disabled' : '') + '>›</button></div>';
    h += '<div class="panel ml-sum"><div class="ml-k"><small>' + (d === today ? '오늘' : '이날') + ' 먹은 칼로리</small><b>' + Math.round(T.k).toLocaleString() + (R ? '<i> / ' + R.kcal.toLocaleString() + ' kcal</i>' : '<i> kcal</i>') + '</b>' +
      (R ? '<div class="db-track"><i style="width:' + Math.min(100, Math.round(T.k / R.kcal * 100)) + '%"' + (T.k > R.kcal * 1.08 ? ' class="over"' : '') + '></i></div>' : '') + '</div>' +
      mlBar("순탄수", T.c, R && R.C) + mlBar("단백질", T.p, R && R.P) + mlBar("지방", T.f, R && R.F) +
      (R ? '' : '<p class="ml-tip">‘내 식단 짜기’에서 내 몸을 넣으면 하루 목표와 비교해 줘요</p>') + '</div>';
    h += '<button type="button" class="btn fill ml-add" data-ml="add">' + ML_CAM + '사진으로 기록하기</button>';
    if (list === null) h += '<p class="ml-empty">' + (ML_ERR ? '기록을 못 불러왔어요 · 인터넷 연결을 확인해 주세요' : '기록 불러오는 중…') + '</p>';
    else if (!list.length) h += '<p class="ml-empty">' + (d === today ? '오늘 먹은 걸 사진으로 남겨 보세요<br>선생님도 같이 보고 적어 드려요' : '이날은 기록이 없어요') + '</p>';
    else h += '<div class="ml-list">' + list.map(mlCard).join("") + '</div>';
    return h + '</section>';
  }
  function mlThumb(b64) {   /* 목록용 작은 정사각 사진(200px) — 시트에 같이 넣음 */
    return new Promise(function (res) {
      var im = new Image();
      im.onerror = function () { res(""); };
      im.onload = function () {
        var s = Math.min(im.width, im.height), c = document.createElement("canvas"); c.width = c.height = 200;
        c.getContext("2d").drawImage(im, (im.width - s) / 2, (im.height - s) / 2, s, s, 0, 0, 200, 200);
        res(c.toDataURL("image/jpeg", 0.62).split(",")[1]);
      };
      im.src = "data:image/jpeg;base64," + b64;
    });
  }
  function mlPhotoOpen(id) {
    var wrap = document.createElement("div");
    wrap.className = "ibview";
    wrap.innerHTML = '<button type="button" class="ibs-x" aria-label="닫기">×</button><p>사진 불러오는 중…</p>';
    document.body.appendChild(wrap);
    wrap.addEventListener("click", function () { wrap.remove(); });
    fetch(ATT_API + "?m=" + encodeURIComponent(SLUG) + "&a=meal_img&id=" + encodeURIComponent(id), { cache: "no-store" })
      .then(function (r) { return r.json(); })
      .then(function (j) { if (!j || !j.ok) throw new Error("img"); var p = wrap.querySelector("p"), im = document.createElement("img"); im.alt = "음식 사진"; im.src = j.data; p.replaceWith(im); })
      .catch(function () { var p = wrap.querySelector("p"); if (p) p.textContent = "사진을 못 불러왔어요"; });
  }
  function mlSheetOpen(rec) {
    var now = new Date(), hr = now.getHours() + now.getMinutes() / 60, t0 = rec ? rec.t : hr < 10.5 ? "아침" : hr < 15 ? "점심" : hr < 21 ? "저녁" : "간식";
    var wrap = document.createElement("div");
    wrap.className = "ibsheet mlsheet";
    wrap.innerHTML = '<div class="ibs-back" data-close></div><form class="ibs-card" novalidate>' +
      '<div class="ibs-top"><h3>' + (rec ? '식단 기록 고치기' : '식단 기록하기') + '</h3><button type="button" class="ibs-x" data-close aria-label="닫기">×</button></div>' +
      '<label class="ibs-file"><input type="file" id="mlFile" accept="image/*"><span class="ibs-ph"><b>음식 사진 찍기 · 고르기</b><small>사진을 올리면 음식·양·순탄수·단백질·지방·칼로리를 읽어 채워요</small></span><img alt="" hidden></label>' +
      (rec && rec.ph ? '<button type="button" class="ml-big">사진 크게 보기</button>' : '') +
      '<div class="ml-row2"><label class="ibs-f"><span>먹은 날</span><input type="date" id="mlDate" value="' + (rec ? rec.d : (ML_DAY || ymd(now))) + '" max="' + ymd(now) + '"></label>' +
      '<div class="ibs-f"><span>끼니</span><div class="ml-seg">' + ML_T.map(function (t) { return '<button type="button" data-t="' + t + '"' + (t === t0 ? ' class="on"' : '') + '>' + t + '</button>'; }).join("") + '</div></div></div>' +
      '<p class="ml-ai" hidden></p><div class="ml-items"></div>' +
      '<button type="button" class="ml-plus">+ 음식 직접 추가</button><div class="ml-tot"></div>' +
      '<label class="ibs-f"><span>메모 <em>(안 적어도 돼요)</em></span><input id="mlMemo" maxlength="200" placeholder="예: 밥은 반만 먹었어요" value="' + esc(rec && rec.memo || "") + '"></label>' +
      (COACH_MODE ? '<label class="ibs-f"><span>선생님 한마디</span><textarea id="mlCm" rows="2" maxlength="300" placeholder="예: 단백질 좋아요! 저녁엔 밥을 반 공기만">' + esc(rec && rec.cm || "") + '</textarea></label>' : '') +
      '<p class="ibs-msg" role="alert"></p><button class="btn fill ibs-save" type="submit">저장하기</button>' +
      (rec ? '<button type="button" class="ml-del">이 기록 지우기</button>' : '') + '</form>';
    document.body.appendChild(wrap);
    document.documentElement.classList.add("ib-lock");
    var form = wrap.querySelector("form"), file = wrap.querySelector("#mlFile"), pv = wrap.querySelector(".ibs-file img"), msg = wrap.querySelector(".ibs-msg"),
      box = wrap.querySelector(".ml-items"), ai = wrap.querySelector(".ml-ai"), tot = wrap.querySelector(".ml-tot");
    var b64 = null, th = null, busy = false, run = 0, tSel = t0;
    function close() { wrap.remove(); document.documentElement.classList.remove("ib-lock"); }
    Array.prototype.forEach.call(wrap.querySelectorAll("[data-close]"), function (x) { x.addEventListener("click", close); });
    if (rec && rec.th) { pv.src = "data:image/jpeg;base64," + rec.th; pv.hidden = false; wrap.querySelector(".ibs-ph").hidden = true; }
    var big = wrap.querySelector(".ml-big"); if (big) big.addEventListener("click", function () { mlPhotoOpen(rec.id); });
    function nv(x) { return x === null || x === undefined || x === "" ? "" : String(Math.round(x * 10) / 10); }
    function addRow(x) {
      x = x || {};
      var el = document.createElement("div"); el.className = "ml-i";
      el.innerHTML = '<div class="ml-i1"><input class="ml-n" placeholder="음식 이름 (예: 현미밥)" maxlength="40" value="' + esc(x.n || "") + '"><button type="button" class="ml-rm" aria-label="빼기">×</button></div>' +
        (x.u ? '<small class="ml-u">' + esc(x.u) + '</small>' : '') +
        '<div class="ml-i2">' + [["g", "양 g"], ["c", "순탄수"], ["p", "단백질"], ["f", "지방"], ["k", "kcal"]].map(function (a) {
          return '<label><span>' + a[1] + '</span><input data-k="' + a[0] + '" inputmode="decimal" autocomplete="off" value="' + nv(x[a[0]]) + '"></label>'; }).join("") + '</div>';
      el._u = x.u || ""; el._b = x.g ? { g: x.g, c: x.c || 0, p: x.p || 0, f: x.f || 0, k: x.k || 0 } : null;
      box.appendChild(el);
    }
    function val(el, k) { var v = parseFloat(el.querySelector('[data-k="' + k + '"]').value); return isFinite(v) && v >= 0 ? v : null; }
    function rows() {
      return Array.prototype.map.call(box.children, function (el) {
        return { n: el.querySelector(".ml-n").value.trim(), g: val(el, "g"), u: el._u, c: val(el, "c"), p: val(el, "p"), f: val(el, "f"), k: val(el, "k") };
      }).filter(function (x) { return x.n; });
    }
    function total() {
      var T = mlSum([{ it: rows() }]);
      tot.innerHTML = '<b>합계 ' + Math.round(T.k).toLocaleString() + ' kcal</b><span>순탄수 ' + Math.round(T.c) + 'g · 단백질 ' + Math.round(T.p) + 'g · 지방 ' + Math.round(T.f) + 'g</span>';
    }
    box.addEventListener("input", function (e) {
      var el = e.target.closest(".ml-i"), k = e.target.getAttribute("data-k");
      if (el && k === "g") {   /* 양을 고치면 탄단지·칼로리도 같은 비율로 */
        var g = val(el, "g"), b = el._b;
        if (b && b.g > 0 && g !== null) ["c", "p", "f", "k"].forEach(function (q) { el.querySelector('[data-k="' + q + '"]').value = nv(b[q] * g / b.g); });
        if (el._u) { el._u = ""; var u = el.querySelector(".ml-u"); if (u) u.remove(); }
      } else if (el && k) {
        if (k !== "k") { var c = val(el, "c") || 0, p = val(el, "p") || 0, f = val(el, "f") || 0; el.querySelector('[data-k="k"]').value = nv(Math.round(c * 4 + p * 4 + f * 9)); }
        var g2 = val(el, "g"); el._b = g2 ? { g: g2, c: val(el, "c") || 0, p: val(el, "p") || 0, f: val(el, "f") || 0, k: val(el, "k") || 0 } : null;
      }
      total();
    });
    box.addEventListener("click", function (e) { if (e.target.classList.contains("ml-rm")) { e.target.closest(".ml-i").remove(); total(); } });
    wrap.querySelector(".ml-plus").addEventListener("click", function () { addRow(); var n = box.lastChild.querySelector(".ml-n"); if (n) n.focus(); });
    wrap.querySelector(".ml-seg").addEventListener("click", function (e) {
      var b = e.target.closest("[data-t]"); if (!b) return; tSel = b.getAttribute("data-t");
      Array.prototype.forEach.call(this.children, function (x) { x.classList.toggle("on", x === b); });
    });
    (rec && rec.it || []).forEach(addRow); total();
    function aiSay(cls, txt) { ai.hidden = false; ai.className = "ml-ai " + cls; ai.textContent = txt; }
    function aiFill(a) {
      if (!a.items || !a.items.length) { aiSay("warn", (a.note || "음식을 못 알아봤어요") + " · 직접 적어 주세요"); if (!box.children.length) addRow(); return; }
      if (!rows().length) box.innerHTML = "";
      a.items.forEach(addRow); total();
      aiSay("ok", "사진을 읽어 채웠어요 · 양(g)이 다르면 고쳐 주세요 — 나머지는 같이 바뀌어요" + (a.note ? "  (" + a.note + ")" : ""));
    }
    file.addEventListener("change", function () {
      var f = file.files && file.files[0];
      if (!f) return;
      msg.textContent = ""; aiSay("wait", "사진 준비 중…");
      ibShrink(f, 1100).then(function (d) {
        b64 = d; pv.src = "data:image/jpeg;base64," + d; pv.hidden = false; wrap.querySelector(".ibs-ph").hidden = true;
        mlThumb(d).then(function (t) { th = t; });
        if (rows().length) { aiSay("ok", "사진을 바꿨어요 · 적어 둔 음식은 그대로예요"); return; }
        aiSay("wait", "사진 읽는 중… 음식과 양을 알아보고 있어요 (10초쯤)");
        var my = ++run;
        if (DEMO) { setTimeout(function () { if (my === run && wrap.isConnected) aiFill({ items: ML_SAMPLE, note: "단백질 넉넉한 한 끼" }); }, 900); return; }
        fetch(ATT_API, { method: "POST", body: JSON.stringify({ a: "meal_ai", m: SLUG, img: d, hint: wrap.querySelector("#mlMemo").value }) })
          .then(function (r) { return r.json(); })
          .then(function (j) {
            if (my !== run || !wrap.isConnected) return;
            if (j && j.ok && j.ai) { aiFill(j.ai); return; }
            aiSay("warn", j && j.error === "limit" ? "오늘은 자동 읽기를 많이 썼어요 · 음식과 양을 직접 적어 주세요" : j && j.error === "nokey" ? "사진은 같이 저장돼요 · 음식과 양은 직접 적거나 비워 두면 선생님이 적어 드려요" : "사진을 못 읽었어요 · 음식과 양을 직접 적어 주세요");
            if (!box.children.length) addRow();
          })
          .catch(function () { if (my !== run || !wrap.isConnected) return; aiSay("warn", "사진을 못 읽었어요 · 음식과 양을 직접 적어 주세요"); if (!box.children.length) addRow(); });
      }).catch(function () { aiSay("warn", "사진을 못 열었어요 · 다른 사진으로 해 보세요"); });
    });
    function done(d, list, local) {
      if (list) { ML = list; ML_ERR = false; } else if (local) { ML = (ML || []).filter(function (r) { return r.id !== local.id; }); if (!local.del) ML.push(local); }
      delete ML_OLD[d]; ML_DAY = d === ymd(new Date()) ? null : d;
      close(); rerender();
    }
    form.addEventListener("submit", function (e) {
      e.preventDefault(); if (busy) return;
      var it = rows(), d = wrap.querySelector("#mlDate").value, memo = wrap.querySelector("#mlMemo").value.trim(), cmEl = wrap.querySelector("#mlCm");
      if (!/^\d{4}-\d{2}-\d{2}$/.test(d)) { msg.textContent = "먹은 날을 골라 주세요"; return; }
      if (!it.length && !b64 && !(rec && rec.ph)) { msg.textContent = "사진을 올리거나 음식 이름을 하나 적어 주세요"; return; }
      busy = true; form.classList.add("saving"); msg.className = "ibs-msg"; msg.textContent = "저장 중…";
      var body = { a: "meal_add", d: d, t: tSel, it: it, memo: memo, img: b64 || "", th: b64 ? th || "" : "" };
      if (rec) body.id = rec.id;
      if (COACH_MODE) { body.key = rtKey(); if (cmEl) body.cm = cmEl.value.trim(); }
      rtPost(body).then(function (j) {
        if (!j || !j.ok) throw new Error(j && j.error || "save");
        var T = mlSum([{ it: it }]);
        done(d, Array.isArray(j.meal) ? j.meal : null, { id: rec ? rec.id : "t" + Date.now(), d: d, t: tSel, it: it, k: T.k, ph: b64 || (rec && rec.ph) ? 1 : 0, th: b64 ? th || "" : (rec && rec.th || ""), at: rec ? rec.at : pad2(now.getHours()) + ":" + pad2(now.getMinutes()), by: rec ? rec.by : (COACH_MODE ? "c" : "m"), memo: memo, cm: cmEl ? cmEl.value.trim() : (rec && rec.cm || "") });
      }).catch(function () { busy = false; form.classList.remove("saving"); msg.textContent = "저장 못 했어요. " + rtNetMsg(); });
    });
    var del = wrap.querySelector(".ml-del");
    if (del) del.addEventListener("click", function () {
      if (!del._sure) { del._sure = 1; del.textContent = "정말 지울까요? 한 번 더 누르면 지워져요"; return; }
      if (busy) return; busy = true; msg.textContent = "지우는 중…";
      fetch(ATT_API + "?m=" + encodeURIComponent(SLUG) + "&a=meal_del&id=" + encodeURIComponent(rec.id), { cache: "no-store" })
        .then(function (r) { return r.json(); })
        .then(function (j) { if (!j || !j.ok) throw new Error("del"); done(rec.d, Array.isArray(j.meal) ? j.meal : null, { id: rec.id, del: 1 }); })
        .catch(function () { busy = false; msg.textContent = "못 지웠어요. " + rtNetMsg(); });
    });
  }
  document.addEventListener("click", function (e) {
    var t = e.target.closest("[data-ml]"); if (!t) return;
    var a = t.getAttribute("data-ml").split(":");
    if (a[0] === "add") mlSheetOpen(null);
    else if (a[0] === "edit") { var d = ML_DAY || ymd(new Date()), r = (mlDayList(d) || []).filter(function (x) { return x.id === a[1]; })[0]; if (r) mlSheetOpen(r); }
    else if (a[0] === "day") {
      var cur = new Date((ML_DAY || ymd(new Date())) + "T00:00:00"); cur.setDate(cur.getDate() + (+a[1]));
      var nd = ymd(cur), td = ymd(new Date()); if (nd > td) return;
      ML_DAY = nd === td ? null : nd; rerender();
    }
  });
  /* ===== 식단 가이드 (2026-11-20 장동욱 "식단 항목에 탄단지 중요성·식이섬유 섭취 이유·끼니 거르면 안 되는 이유·식단의 중요성을 알기 쉽게, 전환칸 만들어서")
     식단 탭 전환 칸 '식단 가이드'(DB_TAB "guide") — 모든 회원에게 보임(data.js 필요 없음). CSS .dg-* */
  function dgView() {
    function li(a) { return a.map(function (x) { return '<li>' + x + '</li>'; }).join(""); }
    function hand(k) {   /* 손 어림 그림: fist 주먹 · palm 손바닥 · thumb 엄지 */
      var p = k === "fist" ? '<rect x="9" y="12" width="22" height="18" rx="7"/><path d="M14 12v-2a3 3 0 0 1 6 0v2M20 12v-3a3 3 0 0 1 6 0v3" />'
        : k === "palm" ? '<rect x="9" y="13" width="20" height="20" rx="6"/><path d="M12 13V6M17 13V4M22 13V5M27 14V8M29 22l4-5"/>'
        : '<rect x="14" y="6" width="11" height="26" rx="5.5"/><path d="M15 13h9"/>';
      return '<svg class="dg-hand" viewBox="0 0 40 40" aria-hidden="true" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round">' + p + '</svg>';
    }
    function mac(c, nm, en, role, does, low, good, bad, k, amt) {
      return '<div class="dg-mac ' + c + '"><div class="dg-mh"><span class="dg-dot"></span><b>' + nm + '</b><i>' + en + '</i><em>' + role + '</em></div>' +
        '<ul class="dg-ul">' + li(does) + '</ul>' +
        '<div class="dg-low"><small>부족하면</small><p>' + low + '</p></div>' +
        '<div class="dg-food"><span class="ok">추천</span>' + good + '</div>' +
        (bad ? '<div class="dg-food"><span class="no">줄이기</span>' + bad + '</div>' : '') +
        '<div class="dg-amt">' + hand(k) + '<div><small>한 끼 어림</small><b>' + amt + '</b></div></div></div>';
    }
    var h = '<div class="dg">' +
      '<div class="dg-hero"><small>MEAL GUIDE · 식단 가이드</small><h2>운동은 자극,<br>몸은 음식이 만들어요</h2>' +
      '<p>운동을 아무리 열심히 해도 먹는 게 그대로면 몸은 잘 안 바뀌어요. 꼭 알아둘 기본만 쉽게 모았어요.</p></div>';

    h += '<section>' + head("01", "식단이 왜 중요할까?", "") +
      '<div class="dg-why">' +
      '<div><span>🧱</span><b>근육은 재료가 있어야 자라요</b><p>운동은 근육에 작은 상처를 내는 일, 회복시키고 키우는 재료는 음식이에요.</p></div>' +
      '<div><span>⚖️</span><b>체중은 먹는 양이 정해요</b><p>운동 1시간에 약 300~500kcal. 빵 하나, 달달한 라떼 한 잔이면 금방 다시 채워져요.</p></div>' +
      '<div><span>🔋</span><b>컨디션·회복이 달라져요</b><p>잘 먹어야 다음 운동 때 힘이 나고, 피로·잠·기분까지 좋아져요.</p></div>' +
      '</div><div class="dg-ratio"><span class="a">운동 3</span><span class="b">식단 7 · 몸 만들기는 식단이 7할</span></div></section>';

    h += '<section>' + head("02", "탄·단·지, 셋 다 필요해요", "하나라도 빼면 몸이 티를 내요") +
      '<div class="dg-kcal"><span class="c">탄수화물 1g = 4kcal</span><span class="p">단백질 1g = 4kcal</span><span class="f">지방 1g = 9kcal</span></div><div class="dg-macs">' +
      mac("c", "탄수화물", "CARB", "몸의 연료", ["운동할 힘과 뇌가 쓰는 에너지", "운동 전·후에 먹으면 힘이 나고 회복이 빨라요"],
        "힘이 빠지고 집중이 안 돼요. 단 게 당겨서 폭식하기 쉽고, 몸이 근육을 연료로 쓰기도 해요.",
        "현미·잡곡밥, 고구마, 감자, 오트밀, 바나나", "과자, 빵, 떡, 단 음료", "fist", "주먹 1개 (밥 반 공기~2/3공기)") +
      mac("p", "단백질", "PROTEIN", "근육의 벽돌", ["운동으로 생긴 근육 상처를 고치고 키워요", "배가 오래 불러서 군것질이 줄어요"],
        "근육이 빠지고 회복이 느려요. 금방 배고프고 운동해도 몸이 잘 안 바뀌어요.",
        "닭가슴살, 계란, 두부, 생선, 소고기 살코기, 그릭요거트", "", "palm", "손바닥 1장 (두께까지) · 끼니마다 나눠서") +
      mac("f", "지방", "FAT", "몸 관리 담당", ["호르몬을 만들고 비타민(A·D·E·K) 흡수를 도와요", "적게 먹어도 칼로리가 커요 — 양 조절이 핵심"],
        "피부가 푸석해지고 호르몬 균형이 흔들려요. 여성은 생리 주기가 흐트러질 수 있어요.",
        "견과류, 올리브유, 아보카도, 연어·고등어, 계란 노른자", "튀김, 가공육(햄·소시지), 과자", "thumb", "엄지 1개 (견과류 한 줌 정도)") +
      '</div></section>';

    h += '<section>' + head("03", "식이섬유, 왜 챙겨야 할까?", "") +
      '<div class="dg-fib">' +
      '<div><span>😌</span><b>배가 오래 불러요</b><p>위에 오래 머물러서 덜 먹게 돼요.</p></div>' +
      '<div><span>📉</span><b>혈당이 천천히 올라요</b><p>탄수화물 흡수를 늦춰서 식후 졸림·단 게 당기는 게 줄어요.</p></div>' +
      '<div><span>🌿</span><b>장이 편해져요</b><p>장 속 좋은 균의 먹이가 되고 변비를 막아요. 단백질을 많이 먹을수록 더 중요해요.</p></div>' +
      '</div><div class="dg-tip"><b>이렇게 먹어요</b><ul class="dg-ul">' + li([
        "<b>채소 → 단백질 → 탄수화물</b> 순서로 먹기",
        "매 끼 채소 <b>두 주먹</b> (하루 식이섬유 약 25g)",
        "채소·버섯·해조류·현미·귀리·콩·사과(껍질째)",
        "물을 같이 충분히 — 섬유질은 물이 있어야 제 역할을 해요"]) + '</ul></div></section>';

    h += '<section>' + head("04", "끼니를 거르면 안 되는 이유", "") +
      '<p class="dg-lead">굶으면 빠질 것 같지만 오히려 반대예요</p><ol class="dg-skip">' + li([
        "<b>다음 끼니에 폭식해요</b><p>너무 배고프면 빨리, 많이, 단 것부터 먹게 돼요.</p>",
        "<b>근육이 빠져요</b><p>단백질이 오래 안 들어오면 몸이 근육을 에너지로 꺼내 써요.</p>",
        "<b>혈당이 롤러코스터를 타요</b><p>확 떨어졌다 확 올라가면 피곤하고 졸리고, 지방으로 쌓이기 쉬워요.</p>",
        "<b>운동할 힘이 없어요</b><p>어지럽고 무게가 안 올라가요. 운동 효과도 떨어져요.</p>",
        "<b>몸이 아끼는 모드가 돼요</b><p>적게 먹는 날이 이어지면 몸이 에너지를 덜 쓰려고 해요.</p>"]) + '</ol>' +
      '<div class="dg-tip"><b>바쁠 땐 간단하게라도</b><div class="dg-chips"><span>삶은 계란 2개 + 바나나</span><span>그릭요거트 + 견과류</span><span>단백질 쉐이크 + 고구마</span><span>편의점 닭가슴살 + 주먹밥</span></div></div></section>';

    /* 05 치팅 (2026-11-20 장동욱 "치팅 설명 추가" → "너무 길다, 압축 · 한 달에 1번 추천 · 치팅은 전략이다 강조" → "플랜카드 없애고 다른 항목처럼 이모티콘, 부연설명 약간 더") */
    h += '<section>' + head("05", "치팅은 전략이다", "한 달에 1번, 계획해서") +
      '<p class="dg-lead">참다 터지는 게 아니라, 미리 계획해서 먹는 한 끼예요</p>' +
      '<div class="dg-cv"><div class="ok"><small>추천</small><b>치팅밀</b><i>한 끼만</i><p>스트레스는 풀고, 식단은 그대로 이어가요.</p></div>' +
      '<div class="no"><small>비추천</small><b>치팅데이</b><i>하루 종일</i><p>하루 폭식이면 한 달 동안 아낀 칼로리가 다 채워져요.</p></div></div>' +
      '<div class="dg-why">' +
      '<div><span>🗓️</span><b>한 달에 1번, 날짜를 정해요</b><p>"이날은 먹는다"가 있으면 남은 날 식단이 훨씬 버티기 쉬워요. 갑자기 먹으면 치팅이 아니라 폭식이에요.</p></div>' +
      '<div><span>💪</span><b>운동한 날, 운동 끝나고</b><p>하체·등처럼 큰 운동 뒤에 먹으면 근육에 에너지가 다시 채워져서 다음 운동 때 힘이 나요.</p></div>' +
      '<div><span>🍖</span><b>단백질부터, 배부르면 멈춰요</b><p>고기 먼저 먹으면 덜 먹게 돼요. 배 터질 때까지가 아니라 맛있게 배부를 때까지만.</p></div>' +
      '<div><span>🍺</span><b>술은 피해요</b><p>술은 칼로리도 크고 안주까지 늘어나요. 근육 회복도 늦어져요.</p></div>' +
      '</div>' +
      '<div class="dg-scale"><span>⚖️</span><div><b>다음 날 +1~2kg은 대부분 물이에요</b><p>짠 음식·탄수화물이 몸에 물을 붙잡아서 그래요. 살(지방) 1kg이 찌려면 약 7,000kcal를 더 먹어야 해서 한 끼로는 어려워요. 굶지 말고 원래 식단 + 물 많이 → 2~3일이면 빠져요.</p></div></div></section>';

    h += '<section>' + head("06", "오늘부터 이것만", "다 못 해도 하나씩") +
      '<ul class="dg-check">' + li([
        "끼니마다 단백질 <b>손바닥 1장</b>", "채소는 매 끼 <b>두 주먹</b>, 먼저 먹기", "탄수화물은 <b>운동 전·후</b>에 챙기기",
        "물 하루 <b>1.5~2L</b>", "끼니 거르지 말고 <b>간단하게라도</b>", "치팅은 <b>한 달에 1번</b>, 미리 정해서", "한 끼 많이 먹었으면 <b>다음 끼니는 원래대로</b> — 굶어서 메우지 않기"]) + '</ul>' +
      '<button type="button" class="dg-go" data-db="tab:my">내 식단 짜러 가기 ›</button></section></div>';
    return h;
  }
  /* ===== 영양제 가이드 (2026-11-20 장동욱 "영양제 가이드도 — 먹어야 하는 이유·중요 영양제 설명 및 추천·남성 여성별 추천 조합, 알기 쉽게")
     '식단 가이드' 칸 안 작은 전환 칸 [식단 기본 | 영양제] (DG_SUB "supp", 바로 여는 주소 #diet-supp). 남녀 조합은 회원 성별로 먼저 열림(SP_SEX). CSS .sp-* */
  var DG_SUB = null, SP_SEX = null;
  function dgSubSeg() {
    var s = DG_SUB || "food";
    function b(id, l) { return '<button type="button" class="' + (s === id ? "on" : "") + '" data-dg="sub:' + id + '">' + l + '</button>'; }
    return '<div class="dg-sub">' + b("food", "🍚 식단 기본") + b("supp", "💊 영양제") + '</div>';
  }
  document.addEventListener("click", function (e) {
    var t = e.target.closest("[data-dg]"); if (!t) return;
    var a = t.getAttribute("data-dg").split(":");
    if (a[0] === "sub") { DG_SUB = a[1]; rerender(); window.scrollTo(0, 0); }
    else if (a[0] === "sex") { SP_SEX = a[1]; rerender(); }
  });
  function spView() {
    function li(a) { return a.map(function (x) { return '<li>' + x + '</li>'; }).join(""); }
    function card(ic, nm, tag, what, who, when, amt, warn) {
      return '<div class="sp-card"><div class="sp-h"><span class="sp-ic">' + ic + '</span><div><b>' + nm + '</b><em>' + tag + '</em></div></div>' +
        '<p class="sp-what">' + what + '</p><dl class="sp-dl">' +
        '<dt>이런 분</dt><dd>' + who + '</dd><dt>언제</dt><dd>' + when + '</dd><dt>하루 양</dt><dd>' + amt + '</dd></dl>' +
        (warn ? '<p class="sp-warn">⚠️ ' + warn + '</p>' : '') + '</div>';
    }
    var sx = SP_SEX || (M.sex === "F" ? "F" : "M");
    var h = '<div class="dg">' +
      '<div class="dg-hero sp-hero"><small>SUPPLEMENT GUIDE · 영양제 가이드</small><h2>영양제는 식단의<br>빈칸을 채우는 것</h2>' +
      '<p>밥 대신 먹는 게 아니라, 식단으로 채우기 힘든 부분만 보충해요. 꼭 필요한 것만 쉽게 정리했어요.</p></div>';

    h += '<section>' + head("01", "영양제, 왜 먹을까?", "") +
      '<div class="dg-why">' +
      '<div><span>☀️</span><b>햇빛을 잘 못 봐요</b><p>실내 생활이 많으면 비타민D가 거의 다 부족해요. 음식만으로는 채우기 어려워요.</p></div>' +
      '<div><span>🐟</span><b>생선을 자주 못 먹어요</b><p>오메가3는 등푸른 생선을 주 2~3번 먹어야 채워져요.</p></div>' +
      '<div><span>💦</span><b>운동하면 더 필요해요</b><p>땀으로 미네랄이 빠지고, 근육 회복에 쓰이는 영양소가 늘어나요.</p></div>' +
      '<div><span>🥗</span><b>다이어트 중엔 모자라요</b><p>먹는 양을 줄이면 비타민·미네랄도 같이 줄어요.</p></div>' +
      '</div><div class="sp-pyr"><small>순서가 중요해요</small>' +
      '<div class="l1">① 식단</div><div class="l2">② 잠</div><div class="l3">③ 운동</div><div class="l4">④ 영양제</div>' +
      '<p>밑이 튼튼해야 위가 효과 있어요. 영양제는 맨 마지막 한 칸!</p></div></section>';

    h += '<section>' + head("02", "꼭 알아둘 영양제", "기본 4 + 운동용 2") + '<div class="sp-cards">' +
      '<div class="sp-grp">기본 — 누구나</div>' +
      card("🌈", "종합비타민", "몸 전체 기본기", "여러 비타민·미네랄을 한 번에. 식단 빈칸을 넓게 메워요.",
        "식단이 들쭉날쭉하거나 다이어트 중인 분", "아침 식사 직후", "제품에 적힌 1회 양 (보통 1~2알)", "다른 영양제와 같은 성분이 겹치지 않는지 확인") +
      card("☀️", "비타민D", "뼈·근육·면역", "뼈를 튼튼하게 하고 근력과 면역에 도움. 한국인 대부분이 부족해요.",
        "실내 생활이 많은 분 거의 모두", "식사와 함께 (기름 있는 음식과 흡수 ↑)", "1,000~2,000IU", "많이 먹는다고 좋지 않아요 — 하루 4,000IU 넘기지 않기") +
      card("🐟", "오메가3", "혈관·염증 관리", "혈관 건강을 돕고 운동 후 뻐근함·염증 관리에 도움.",
        "생선을 주 2번 이상 못 먹는 분", "식사와 함께 (비린 트림이 줄어요)", "EPA+DHA 합쳐서 500~1,000mg", "피를 묽게 하는 약을 먹고 있다면 먼저 의사·약사와 상의") +
      card("🌙", "마그네슘", "근육 이완·잠", "근육 경련·쥐 나는 것을 줄이고 긴장을 풀어 잠에 도움.",
        "운동량 많은 분, 잠을 설치거나 눈 떨림이 있는 분", "자기 전", "200~350mg", "많이 먹으면 설사할 수 있어요") +
      '<div class="sp-grp">운동용 — 몸 만들 때</div>' +
      card("🥤", "단백질 보충제", "근육 재료", "끼니로 단백질이 모자랄 때 간편하게 채워요. 음식의 일종이에요.",
        "식사로 단백질을 다 못 채우는 분", "운동 후 또는 단백질이 부족한 끼니", "1스쿱 (단백질 약 20~25g)", "하루 단백질은 식사가 먼저, 보충제는 모자란 만큼만") +
      card("⚡", "크레아틴", "힘·근력 UP", "짧고 강한 힘을 내는 연료. 운동 영양제 중 효과가 가장 잘 알려진 편이에요.",
        "무게를 올리고 싶은 분 (남녀 모두)", "아무 때나 매일 (운동 후 단백질과 같이 편하게)", "3~5g", "물을 평소보다 더 마시기 · 신장 질환이 있으면 먹지 않기") +
      '<div class="sp-grp">필요할 때만</div>' +
      '<div class="sp-mini">' +
      '<div><b>🦠 유산균</b><p>변비·장이 예민할 때. 아침 공복 또는 제품 안내대로.</p></div>' +
      '<div><b>🩸 철분</b><p>여성 빈혈·생리 때 피로. <u>검사로 부족할 때만</u>, 칼슘과 떨어뜨려 먹기.</p></div>' +
      '<div><b>🦴 칼슘</b><p>우유·멸치를 잘 안 먹을 때. 비타민D와 같이, 철분과는 따로.</p></div>' +
      '<div><b>🍊 비타민C</b><p>과일·채소를 적게 먹을 때. 철분 흡수도 도와요.</p></div>' +
      '</div></div></section>';

    function combo(nm, desc, items) {
      return '<div class="sp-combo"><b>' + nm + '</b><p>' + desc + '</p><div class="sp-pills">' + items.map(function (x) { return '<span>' + x + '</span>'; }).join('<i>+</i>') + '</div></div>';
    }
    h += '<section>' + head("03", "남녀별 추천 조합", "") +
      '<div class="sp-sex"><button type="button" class="' + (sx === "M" ? "on" : "") + '" data-dg="sex:M">🙋‍♂️ 남성</button><button type="button" class="' + (sx === "F" ? "on" : "") + '" data-dg="sex:F">🙋‍♀️ 여성</button></div>' +
      '<div class="sp-combos">' + (sx === "M" ?
        combo("⭐ 기본 조합", "처음이라면 이것부터", ["종합비타민", "비타민D", "오메가3"]) +
        combo("💪 근육 키우기", "기본 조합에 더해서", ["단백질 보충제", "크레아틴"]) +
        combo("🔥 다이어트 중", "적게 먹는 동안 빈칸 채우기", ["종합비타민", "비타민D", "단백질 보충제"]) +
        combo("😴 피로·잠·근육 뭉침", "운동량이 많을 때", ["마그네슘", "오메가3"])
      :
        combo("⭐ 기본 조합", "처음이라면 이것부터", ["종합비타민", "비타민D", "오메가3"]) +
        combo("🍑 탄력·근력 키우기", "기본 조합에 더해서 — 크레아틴은 여성도 OK", ["단백질 보충제", "크레아틴"]) +
        combo("🔥 다이어트 중", "적게 먹는 동안 빈칸 채우기 + 장 관리", ["종합비타민", "유산균", "단백질 보충제"]) +
        combo("🩸 생리 때 피로·어지러움", "검사로 부족하다고 나왔을 때", ["철분", "비타민C"]) +
        combo("🦴 뼈 건강", "유제품을 잘 안 먹는다면", ["칼슘", "비타민D", "마그네슘"])
      ) + '</div></section>';

    h += '<section>' + head("04", "하루에 이렇게 먹어요", "") + '<div class="sp-time">' +
      '<div><span>🌅</span><b>아침 식사 후</b><p>종합비타민 · 비타민D · 오메가3' + (sx === "F" ? ' · (유산균은 공복)' : '') + '</p></div>' +
      '<div><span>🏋️</span><b>운동 후</b><p>단백질 보충제 + 크레아틴</p></div>' +
      '<div><span>🌙</span><b>자기 전</b><p>마그네슘' + (sx === "F" ? ' · 칼슘 (철분과는 시간 띄우기)' : '') + '</p></div>' +
      '</div><div class="dg-tip"><b>잘 맞는 짝 · 떨어뜨릴 짝</b><ul class="dg-ul">' + li([
        "비타민D·오메가3는 <b>밥과 함께</b> — 기름이 있어야 흡수돼요",
        "철분 + 비타민C는 <b>같이</b>, 철분 + 칼슘·커피·차는 <b>2시간 떨어뜨리기</b>",
        "잊지 않는 게 제일 중요 — <b>매일 같은 시간</b>에"]) + '</ul></div></section>';

    h += '<section>' + head("05", "꼭 지킬 것", "") + '<ul class="dg-check sp-check">' + li([
      "<b>많이 먹는다고 더 좋지 않아요</b> — 비타민 A·D·E·K는 몸에 쌓여요",
      "여러 제품을 먹을 땐 <b>같은 성분이 겹치는지</b> 라벨 확인",
      "<b>약을 먹는 중이거나 질환·임신·수유 중</b>이면 먼저 의사·약사와 상의",
      "철분은 <b>검사 후에</b> — 모자라지 않은데 먹으면 오히려 탈이 나요",
      "식약처 <b>'건강기능식품'</b> 마크 있는 제품 고르기",
      "영양제보다 <b>식단·잠·운동</b>이 먼저예요"]) + '</ul>' +
      '<p class="sp-note">이 내용은 일반적인 안내예요. 몸 상태에 맞는 정확한 양은 의사·약사와 상의하세요.</p></section></div>';
    return h;
  }
  function renderDiet() {
    var D = M.diet, has = D && typeof D === "object";
    var tab = DB_TAB || (has ? "coach" : "my");
    if ((tab === "log" && !ML_ON) || (tab === "coach" && !has)) tab = has ? "coach" : "my";
    function sb(id, l) { return '<button type="button" class="' + (tab === id ? "on" : "") + '" data-db="tab:' + id + '">' + l + '</button>'; }
    var nb = 2 + (has ? 1 : 0) + (ML_ON ? 1 : 0);
    var seg = '<div class="db-tabs' + (nb > 3 ? ' n4' : '') + '">' + (has ? sb("coach", nb > 3 ? "선생님 식단" : "선생님 식단표") : "") + sb("my", "내 식단 짜기") + (ML_ON ? sb("log", "식단 기록") : "") + sb("guide", "식단 가이드") + '</div>';
    return seg + (tab === "guide" ? dgSubSeg() + (DG_SUB === "supp" ? spView() : dgView()) + remember() : tab === "log" ? mlView() + remember() : tab === "my" ? dbBuilder() + remember() : renderDietCoach());
  }
  function renderDietCoach() {
    var D = M.diet;
    if (!D || typeof D === "string") {
      var h = '<section>' + head("", "식단표", "");
      if (!D) {
        h += '<div class="panel empty"><svg viewBox="0 0 54 54" aria-hidden="true"><circle cx="27" cy="27" r="25" fill="var(--tint)"/><circle cx="27" cy="29" r="12" fill="#fff" stroke="var(--primary)" stroke-width="3"/><path d="M12 14v12M15 14v12M12 20h3M41 14c-3 2-3 8 0 10v12" stroke="var(--primary)" stroke-width="2.6" fill="none" stroke-linecap="round"/></svg>' +
          '<h3>식단표 준비 중이에요</h3><p>선생님이 회원님 식단을 짜면 여기에 올려드릴게요</p></div>';
      } else h += D;
      return h + '</section>' + remember();
    }
    var who = D.member || M.name;
    var h = '<div class="hero"><div class="hero-main split"><div class="hero-l">' +
      '<div class="eyebrow">MY MEAL NOTE <b>· 식단</b></div><h1>' + esc(D.title) + '</h1><div class="en">' + esc(D.title_en || "") + '</div>' +
      '<div class="who"><strong>' + esc(who) + ' 회원님</strong>' + (D.updated ? '<span>' + esc(D.updated) + ' 업데이트</span>' : '') + '</div></div>' +
      '<div class="hero-r"><div class="eyebrow">식단 규칙</div><ul class="dots small">' +
      (D.rules || []).map(function (r) { return '<li>' + esc(r) + '</li>'; }).join("") + '</ul>' +
      (D.rules_note ? '<p class="benefit">' + esc(D.rules_note) + '</p>' : '') + '</div></div>' +
      '<div class="keypoint"><small>KEY POINT</small><p>' + esc(D.key_point) + '</p></div></div>';
    if (D.stats) h += '<div class="dt-stats">' + D.stats.map(function (s) {
      return '<div><small>' + esc(s.label) + '</small><b>' + esc(s.value) + '</b><i>' + esc(s.unit) + '</i></div>';
    }).join("") + '</div>';

    var n = 0;
    function no() { n++; return (n < 10 ? "0" : "") + n; }
    if (D.formula) {
      h += '<section>' + head(no(), "한 끼는 이렇게", "아침·저녁은 이 공식대로 차려요") + '<div class="dt-formula">' +
        D.formula.map(function (f, i) {
          return (i ? '<span class="op">+</span>' : '') + '<div class="fm">' + foodImg(f.icon, "fm-img") + '<div><b>' + esc(f.title) + '</b><i>' + esc(f.sub) + '</i></div></div>';
        }).join("") + '<span class="op eq">=</span><div class="fm res"><b>' + esc(D.formula_result.title) + '</b><i>' + esc(D.formula_result.sub) + '</i></div></div></section>';
    }
    function foods(list, gold) {
      return '<div class="food-grid">' + list.map(function (f) {
        return '<div class="food">' + foodImg(f.icon) + '<b>' + esc(f.name) + '</b><span class="pill">' + esc(f.amount) + '</span></div>';
      }).join("") + (gold ? '<div class="food gold"><span class="g1">1종</span><b>한 끼에 딱 1종만</b><i>끼니마다 바꿔도 OK</i></div>' : '') + '</div>';
    }
    /* 끼니별로 정해진 식단 (2026-11-05 이지환님): meals[{no, name?, tag?, note?, options[{label?, foods[{icon,name,amount?}]}]}] */
    if (D.meals) h += '<section>' + head(no(), D.meals_title || "하루 " + D.meals.length + "끼", D.meals_sub || "'또는'은 둘 중 하나만 골라요") + '<div class="mp-list">' +
      D.meals.map(function (ml) {
        return '<div class="mp' + (ml.tag ? ' hl' : '') + '"><div class="mp-h"><span class="mp-no">' + esc(ml.no) + '</span>' + (ml.name ? '<b>' + esc(ml.name) + '</b>' : '') +
          (ml.tag ? '<span class="mp-tag">' + esc(ml.tag) + '</span>' : '') + '</div>' +
          ml.options.map(function (op, i) {
            return (i ? '<div class="mp-or"><span>또는</span></div>' : '') + '<div class="mp-opt">' + (op.label ? '<small>' + esc(op.label) + '</small>' : '') +
              '<div class="mp-foods">' + op.foods.map(function (f) {
                return '<div class="mp-f">' + foodImg(f.icon, "mp-img") + '<b>' + esc(f.name) + '</b>' + (f.amount ? '<span class="pill">' + esc(f.amount) + '</span>' : '') + '</div>';
              }).join("") + '</div></div>';
          }).join("") + (ml.note ? '<p class="mp-note">' + esc(ml.note) + '</p>' : '') + '</div>';
      }).join("") + '</div></section>';
    if (D.carbs) h += '<section>' + head(no(), "탄수화물 고르기", "이 중 1종만, 적힌 양만큼") + foods(D.carbs) + '</section>';
    if (D.prots) h += '<section>' + head(no(), "단백질 고르기", "이 중 1종만, 적힌 양만큼") + foods(D.prots, true) + '</section>';
    if (D.day) h += '<section>' + head(no(), "하루는 이렇게", D.day_sub || "") + '<div class="meal-grid">' + D.day.map(function (d) {
      return '<div class="meal"><div class="meal-h">' + foodImg(d.icon, "meal-ic") + '<b>' + esc(d.name) + '</b></div><p>' + esc(d.line1) + '</p>' +
        '<i>' + esc(d.line2) + '</i>' + (d.line3 ? '<i>' + esc(d.line3) + '</i>' : '') + '</div>';
    }).join("") + '</div></section>';
    if (D.lunch_do) h += '<section>' + head(no(), "점심 일반식 가이드", "회사 밥·외식은 이렇게 골라요") + '<div class="ox">' +
      '<div class="oxbox o"><h3><svg class="mark" viewBox="0 0 20 20" aria-hidden="true"><circle cx="10" cy="10" r="7.6" fill="none" stroke="currentColor" stroke-width="3.2"/></svg>이렇게 고르세요</h3><ul>' +
      D.lunch_do.map(function (t) { return '<li>' + CHECK + esc(t) + '</li>'; }).join("") + '</ul></div>' +
      '<div class="oxbox x"><h3><svg class="mark" viewBox="0 0 20 20" aria-hidden="true"><path d="M3.5 3.5l13 13M16.5 3.5l-13 13" stroke="currentColor" stroke-width="3.4" stroke-linecap="round"/></svg>이건 피하세요</h3><ul>' +
      D.lunch_dont.map(function (t) { return '<li>' + XIC + esc(t) + '</li>'; }).join("") + '</ul></div></div></section>';
    if (D.extras) h += '<section>' + head(no(), "같이 먹어도 OK", "이건 더해도 괜찮아요") + '<div class="extra-list">' + D.extras.map(function (x) {
      return '<div class="extra">' + foodImg(x.icon, "ex-img") + '<div><div class="extra-h"><b>' + esc(x.name) + '</b><span class="pill">' + esc(x.tag) + '</span></div>' +
        x.lines.map(function (l) { return '<p>' + esc(l) + '</p>'; }).join("") + '</div></div>';
    }).join("") + '</div></section>';
    if (D.notes) h += '<section>' + head(no(), D.notes_title || "참고사항", D.notes_sub || "") + '<div class="dnotes">' + D.notes.map(function (s, i) {
      return (i ? '<span class="arr" aria-hidden="true">›</span>' : '') + '<div class="dnote"><div class="dn-h">' + foodImg(s.icon, "dn-ic") + '<small>STEP</small><b>0' + (i + 1) + '</b></div>' +
        '<h3>' + esc(s.title) + '</h3><span class="dchip">' + esc(s.chip) + '</span><p>' + esc(s.desc) + '</p></div>';
    }).join("") + '</div></section>';
    if (D.safety) h += '<div class="dsafety">' + XIC + '<b>잠깐!</b><span>' + esc(D.safety) + '</span></div>';
    return h + remember();
  }


  /* 배지·칩 글자 높낮이 자동 보정: 실제로 쓰인 글꼴의 글자 모양을 재서 상자 가운데로 옮김 */
  var ALIGN_SEL = ".jno, .ex-no, .mini .n, .today-ic > span, .today-day, .num, .tagc, .jb, .breath, .btn, .mchip, .jfocus li, .chip, .loop, .main-badge, .day-tile b, .tag, .oxbox h3";
  var mctx = null;
  function alignText(root) {
    try {
      mctx = mctx || document.createElement("canvas").getContext("2d");
      if (!mctx || !("actualBoundingBoxAscent" in mctx.measureText("1"))) return;
      Array.prototype.forEach.call((root || document).querySelectorAll(ALIGN_SEL), function (el) {
        var sp = null;
        for (var n = el.firstChild; n; n = n.nextSibling) {
          if (n.nodeType === 1 && n.classList.contains("tfix")) { sp = n; break; }
          if (n.nodeType === 3 && n.textContent.trim()) {
            sp = document.createElement("span"); sp.className = "tfix";
            el.insertBefore(sp, n); sp.appendChild(n); break;
          }
        }
        if (!sp) return;
        sp.style.top = "0px";
        var txt = sp.textContent.trim(), cs = getComputedStyle(sp);
        var probe = document.createElement("span");
        probe.style.cssText = "display:inline-block;width:0;height:0;vertical-align:baseline";
        sp.insertBefore(probe, sp.firstChild);
        var base = probe.getBoundingClientRect().top;
        sp.removeChild(probe);
        mctx.font = cs.fontWeight + " " + cs.fontSize + " " + cs.fontFamily;
        var m = mctx.measureText(txt);
        var ink = base + (m.actualBoundingBoxDescent - m.actualBoundingBoxAscent) / 2;
        var r = el.getBoundingClientRect();
        if (!r.height) return;
        var off = ink - (r.top + r.height / 2);
        if (Math.abs(off) > 0.3 && Math.abs(off) < 6) sp.style.top = (-Math.round(off * 2) / 2) + "px";
      });
    } catch (e) {}
  }

  /* ---------------- 루틴 고치기 (2026-11-10, 선생님 휴대폰에서만)
     선생님 보기(COACH_MODE)에서 루틴 탭 위 "✎ 루틴 고치기" → 종목·세트·팁·순서·부위 이름을 고치고
     "저장 · 바로 반영" → 출석 창고(POST routine_save, 선생님 열쇠 확인) → 회원님이 노트를 열면 바로 바뀜.
     열쇠는 선생님 페이지 주소 끝 #key=… 로 한 번 열면 그 휴대폰에 저장(localStorage ptkey). */
  var RT_EN = {"고블릿 스쿼트":"Goblet Squat","이너타이":"Inner Thigh","아웃타이 머신":"Outer Thigh","레그프레스":"Leg Press","시티드 페이스풀":"Seated Face Pull","랫풀다운":"Lat Pulldown","뉴텍 시티드 로우 머신":"Seated Row","펙덱 플라이":"Pec Deck Fly","체스트 프레스 머신":"Chest Press","인클라인 덤벨 프레스":"Incline DB Press","케이블 푸쉬다운":"Cable Pushdown","플레이트 아웃타이":"Outer Thigh · Plate","힙쓰러스트 머신":"Hip Thrust","레그프레스 (발 높게)":"Leg Press · High","사이드 레터럴 레이즈 머신":"Standing Machine","숄더 프레스 머신":"Shoulder Press","사이드 레터럴 레이즈":"Lateral Raise","리버스 펙덱":"Reverse Pec Deck","케이블 시티드 로우":"Cable Seated Row","덤벨 컬":"Dumbbell Curl","오버헤드 익스텐션":"Overhead Ext.","벤치프레스":"Bench Press","체스트 프레스":"Chest Press","인클라인 프레스 머신":"Incline Machine Press","레그 익스텐션":"Leg Extension","스미스 스쿼트":"Smith Squat","라잉 레그컬":"Lying Leg Curl","스트레이트 암 풀다운":"Straight Arm Pulldown","원암 덤벨 로우":"One Arm DB Row","케이블 풀오버":"Cable Pullover","덤벨 슈러그":"DB Shrug","스미스 인클라인 프레스":"Smith Incline Press","덤벨 RDL":"Dumbbell RDL","힙 익스텐션":"Hip Extension","케이블 힙 킥백":"Cable Kickback","플랫 덤벨프레스":"Flat DB Press","핵스쿼트":"Hack Squat","해머 컬":"Hammer Curl","해머스트렝스 로우로우":"Low Row","언더그립 시티드 로우":"Underhand Seated Row","덤벨 숄더 프레스":"DB Shoulder Press","사이드 레터럴 레이즈 (덤벨)":"Lateral Raise","언더그립 랫풀다운":"Underhand Pulldown","뉴텍 체스트 프레스 머신":"Lying Chest Press","시티드 로우":"Seated Row","숄더 프레스":"Shoulder Press","플랭크":"Plank","스미스 슈러그":"Smith Shrug","스미스 숄더 프레스":"Smith Shoulder Press","인클라인 덤벨 컬":"Incline DB Curl","덤벨 오버헤드 익스텐션":"DB Overhead Ext","스미스 벤치프레스":"Smith Bench Press","랙 밴드 푸쉬업":"Rack Band Push-up","어시스트 친업":"Assisted Chin-up","리버스 펙덱 플라이":"Reverse Pec Deck Fly","케이블 체스트 프레스":"Cable Chest Press","뉴텍 엠토처 시티드 로우":"Seated Row Machine","핵프레스":"Hack Press","스파이더 컬":"Spider Curl","클로즈그립 랫풀다운":"Close-grip Pulldown","티바로우 머신":"T-bar Row Machine","페이스풀":"Face Pull","스탠딩 페이스풀":"Standing Face Pull","와이드 풀다운":"Wide Pulldown","프론트 로우 머신":"Front Row Machine","프리처 컬 머신":"Preacher Curl Machine","비하인드 넥프레스":"Behind Neck Press"};
  var RT_PART_EN = {"하체":"Legs","등":"Back","가슴":"Chest","엉덩이":"Glute","어깨":"Shoulder","등 · 팔":"Back & Arms","가슴 · 팔":"Chest & Arms","로테이션":"Free Pick","휴식":"Rest","힙 A":"Glute A","가슴·어깨":"Chest · Shoulder","힙 B":"Glute B","힙 C":"Glute C","어깨·팔":"Shoulder · Arm","가슴·등":"Chest · Back","하체 B":"Legs B","등 A":"Back A","하체 A":"Legs A","등 B":"Back B","어깨 · 팔":"Shoulder & Arms","유산소":"Cardio","등·팔":"Back · Arms","팔":"Arm","가슴·삼두":"Chest · Triceps"};
  var CAN_EDIT = COACH_MODE && !DEMO;
  var RT_EDIT = null;   /* 고치는 중이면 { saved: 고치기 전 루틴, dirty: 고친 횟수 } */
  var RT_STALE = null;  /* data.js 루틴이 새로 올라와서 꺼진 '폰에서 고친 루틴' */
  function rtKey() { try { return localStorage.getItem("ptkey") || ""; } catch (e) { return ""; } }
  function rtToday() { var d = new Date(); return d.getFullYear() + ". " + (d.getMonth() + 1) + ". " + d.getDate(); }
  function vSig2() { try { return JSON.stringify([LG && LG.d, MV, RT_REC && RT_REC.at]); } catch (e) { return ""; } }   /* 탭으로 돌아올 때: 운동 ✓·요일 옮기기·루틴이 바뀌었으면 떼어 둔 화면을 버리고 새로 그림 */
  function vSig() { try { return attLoad().join(",") + JSON.stringify(attTimes); } catch (e) { return ""; } }
  function rerender() { VCACHE = {}; var y = window.scrollY; route(); window.scrollTo(0, y); }
  function rtServer(rec) {   /* 창고에서 받은 '폰에서 고친 루틴' (null = 없음) */
    var ok = rec && rec.routine && rec.base === RT_BASE ? rec : null;
    RT_STALE = rec && !ok ? rec : null;
    try { if (ok) localStorage.setItem(RT_LS, JSON.stringify(ok)); else localStorage.removeItem(RT_LS); } catch (e) {}
    if (JSON.stringify(ok) === JSON.stringify(RT_REC)) return;
    if (RT_EDIT) { var draft = M.routine; rtUse(ok); RT_EDIT.saved = M.routine; M.routine = draft; return; }
    rtUse(ok);
    if (view.getAttribute("data-tab") !== "body") rerender(); else litApply("body");
  }
  function bnServer(list) {   /* 창고에서 받은 전체 공지 */
    list = Array.isArray(list) ? list : [];
    if (JSON.stringify(list) === JSON.stringify(BN)) return;
    BN = list;
    try { localStorage.setItem("ptnote:bn", JSON.stringify(list)); } catch (e) {}
    nBuild(); nDot();
    var tb = view.getAttribute("data-tab");
    if (tb === "notice" || tb === "home") rerender();
    if (!DEMO && !document.querySelector(".npop-wrap")) showNoticePop();
  }
  function rtAt(rec) {   /* "11/10 14:32" */
    var m = String(rec && rec.at || "").match(/\d{4}-(\d{2})-(\d{2}) (\d{2}:\d{2})/);
    return m ? (+m[1]) + "/" + (+m[2]) + " " + m[3] : "";
  }
  function rtDirty() { if (RT_EDIT) RT_EDIT.dirty++; rerender(); }
  function rtVerUp(v) { var m = String(v || "v0").match(/^(\D*)(\d+)(.*)$/); return m ? m[1] + (+m[2] + 1) + m[3] : "v2"; }
  function rtNewRoutine() {
    return { version: "v1", updated: rtToday(), title: "주간 루틴", plan: [], key_point: "", note: "",
      cardio: { minutes: 20, options: "경사 걷기 · 천국의 계단 · 사이클 중 택1" },
      days: ["월", "화", "수", "목", "금", "토", "일"].map(function (k) { return { day: k, part: "휴식", en: "Rest", rest: true, items: [] }; }) };
  }

  /* 루틴 탭 위 선생님 띠 */
  function rtTopBar() {
    if (!CAN_EDIT) return "";
    if (RT_EDIT) {   /* 2026-11-17 "글자가 잘리고 간섭" → 두 줄: 위 한 줄 안내, 아래 아이콘 칸 */
      var tool = function (k, t) { return '<button type="button" class="rtt" data-rt="' + k + '"><svg viewBox="0 0 24 24" aria-hidden="true">' + RT_TIC[k] + '</svg><span>' + t + '</span></button>'; };
      return '<div class="rtbar2"><div class="rtb2-h"><b>✎ 고치는 중</b><span>카드를 꾹 눌러 끌면 순서·요일이 바뀌어요</span></div><div class="rtb2-t">' +
        tool("week", "요일 정리") + tool("info", "제목·계획") + tool("copy", "가져오기") + (RT_REC ? tool("reset", "처음으로") : '') + '</div></div>';
    }
    var st = RT_REC ? '폰에서 고친 루틴 · ' + rtAt(RT_REC) + ' 반영' : RT_STALE ? '새 루틴이 올라와서 예전에 폰에서 고친 것(' + rtAt(RT_STALE) + ')은 꺼졌어요' : '선생님 보기 · 고치면 회원님 노트에 바로 반영';
    return '<div class="rtbar"><div><b>선생님만 보여요</b><span>' + esc(st) + '</span></div>' +
      '<button type="button" class="rtb fill" data-rt="start">✎ 루틴 고치기</button></div>';
  }
  var RT_TIC = {"reset": "<path d=\"M4 12a8 8 0 1 0 2.4-5.7\"/><path d=\"M4 4v4.5h4.5\"/>", "week": "<rect x=\"3.5\" y=\"5\" width=\"17\" height=\"15\" rx=\"2.5\"/><path d=\"M3.5 10h17M8 3v4M16 3v4\"/><path d=\"M8.5 15h7M13 13l2.5 2-2.5 2\"/>", "copy": "<rect x=\"8\" y=\"8\" width=\"12\" height=\"12\" rx=\"2.5\"/><path d=\"M16 8V5.5A1.5 1.5 0 0 0 14.5 4h-9A1.5 1.5 0 0 0 4 5.5v9A1.5 1.5 0 0 0 5.5 16H8\"/>", "info": "<path d=\"M5 6h14M5 11h14M5 16h9\"/>"};
  function rtSaveBar() {
    if (!RT_EDIT) return "";
    return '<div class="rtsave"><div class="rtsave-in"><span>' + (RT_EDIT.dirty ? '고친 곳 <b>' + RT_EDIT.dirty + '</b>' : '아직 안 고침') + '</span>' +
      '<button type="button" class="rtb" data-rt="cancel">취소</button>' +
      '<button type="button" class="rtb fill" data-rt="save"' + (RT_EDIT.dirty ? '' : ' disabled') + '>저장 · 바로 반영</button></div></div>';
  }
  function rtItemCtl(i, n) {
    return '<span class="rtgrip" aria-hidden="true"><i></i><i></i><i></i></span><div class="rtctl"><button type="button" data-rt="item" data-i="' + i + '">✎ 고치기</button>' +
      '<button type="button" data-rt="more" data-i="' + i + '" aria-label="복제·다른 날로 옮기기">⋯ 더보기</button>' +
      '<button type="button" class="del" data-rt="del" data-i="' + i + '">삭제</button></div>';
  }

  /* 아래에서 올라오는 고치기 창 */
  function rtSheet(title, body, onOk, okText) {
    var bg = document.createElement("div");
    bg.className = "rtsheet-bg";
    bg.innerHTML = '<div class="rtsheet" role="dialog" aria-modal="true" aria-label="' + esc(title) + '"><div class="rts-h"><b>' + esc(title) + '</b>' +
      '<button type="button" class="rts-x" data-close aria-label="닫기">×</button></div><div class="rts-body">' + body + '</div>' +
      '<p class="rts-msg" role="status"></p><div class="rts-foot' + (okText === false ? ' one' : '') + '"><button type="button" class="rtb" data-close>취소</button>' +
      (okText === false ? '' : '<button type="button" class="rtb fill" data-ok>' + esc(okText || "완료") + '</button>') + '</div></div>';
    document.body.appendChild(bg);
    document.documentElement.classList.add("rts-open");
    var sh = bg.firstChild;
    function close() { bg.remove(); if (!document.querySelector(".rtsheet-bg")) document.documentElement.classList.remove("rts-open"); }
    bg.addEventListener("click", function (e) {
      if (e.target === bg || e.target.closest("[data-close]")) close();
      else if (e.target.closest("[data-ok]")) {
        var msg = onOk(sh);
        if (msg === true) return;            /* 알아서 닫음(저장 중) */
        if (msg) { sh.querySelector(".rts-msg").textContent = msg; return; }
        close();
      }
    });
    sh.close = close;
    sh.msg = function (t) { sh.querySelector(".rts-msg").textContent = t; };
    return sh;
  }
  function fv(sh, id) { var el = sh.querySelector("#" + id); return el ? el.value.trim() : ""; }

  /* 종목 고치기 */
  function rtNames() {
    var o = {};
    Object.keys(ICON_BY_NAME).forEach(function (n) { o[n] = 1; });
    Object.keys(RT_EN).forEach(function (n) { o[n] = 1; });
    (M.routine.days || []).forEach(function (d) { (d.items || []).forEach(function (it) { if (it.name) o[it.name] = 1; }); });
    return Object.keys(o).sort(function (a, b) { return a.localeCompare(b, "ko"); });
  }

  /* 아이콘 눌러서 종목 고르기 (2026-11-11 "아이콘을 눌러서 추가하는 방식") — 도당점 종목 이름 그대로 */
  var RT_CAT = [
    ["가슴", ["벤치프레스", "플랫 덤벨프레스", "인클라인 덤벨 프레스", "스미스 벤치프레스", "스미스 인클라인 프레스", "인클라인 프레스 머신", "체스트 프레스 머신", "뉴텍 체스트 프레스 머신", "펙덱 플라이", "케이블 체스트 프레스", "랙 밴드 푸쉬업"]],
    ["등", ["랫풀다운", "와이드 풀다운", "클로즈그립 랫풀다운", "언더그립 랫풀다운", "어시스트 친업", "뉴텍 버티컬 풀다운", "뉴텍 시티드 로우 머신", "뉴텍 엠토처 시티드 로우", "케이블 시티드 로우", "언더그립 시티드 로우", "해머스트렝스 로우로우", "프론트 로우 머신", "티바로우 머신", "원암 덤벨 로우", "스미스 벤트오버 로우", "스트레이트 암 풀다운", "케이블 풀오버", "덤벨 슈러그", "스미스 슈러그", "백 익스텐션"]],
    ["어깨", ["숄더 프레스 머신", "비하인드 넥프레스", "덤벨 숄더 프레스", "스미스 숄더 프레스", "사이드 레터럴 레이즈 머신", "사이드 레터럴 레이즈", "시티드 레터럴 레이즈", "시티드 페이스풀", "페이스풀", "스탠딩 페이스풀", "리버스 펙덱"]],
    ["팔", ["덤벨 컬", "해머 컬", "인클라인 덤벨 컬", "스파이더 컬", "프리처 컬 머신", "케이블 푸쉬다운", "오버헤드 익스텐션", "덤벨 오버헤드 익스텐션"]],
    ["하체", ["레그 익스텐션", "이너타이", "아웃타이 머신", "플레이트 아웃타이", "레그프레스", "핵프레스", "핵스쿼트", "스미스 스쿼트", "고블릿 스쿼트", "라잉 레그컬", "덤벨 RDL"]],
    ["엉덩이", ["힙쓰러스트 머신", "케이블 힙 킥백", "힙 익스텐션"]],
    ["복근", ["플랭크"]],
    ["유산소", RT_CARDIO]
  ];
  var RT_CAT_EN = { "러닝머신": "Treadmill", "경사 걷기": "Incline Walk", "사이클": "Cycle", "스텝밀": "Stair Climber", "천국의 계단": "Stairmaster", "마이마운틴": "My Mountain", "일립티컬": "Elliptical", "로잉머신": "Rowing Machine", "인터벌 러닝": "Interval Run", "스미스 벤트오버 로우": "Smith Bent-over Row", "뉴텍 버티컬 풀다운": "Vertical Pulldown", "시티드 레터럴 레이즈": "Seated Lateral Raise", "백 익스텐션": "Back Extension", "스미스 벤치프레스": "Smith Bench Press" };
  function rtEnOf(n) { return RT_EN[n] || RT_CAT_EN[n] || ""; }
  function rtMine() {   /* 이 회원님 루틴에 이미 있는 종목 (이름별 첫 번째) */
    var seen = {}, out = [];
    ((M.routine && M.routine.days) || []).forEach(function (d) { (d.items || []).forEach(function (it) { if (it.name && !seen[it.name]) { seen[it.name] = 1; out.push(it); } }); });
    return out;
  }
  function rtPicker(title, onPick, allowFree) {
    var mine = rtMine(), mineBy = {};
    mine.forEach(function (it) { mineBy[it.name] = it; });
    function tile(n) {
      return '<button type="button" class="rtp-t" data-n="' + esc(n) + '"><span class="rtp-ic">' + img(iconOf({ name: n }), "", true) + '</span><span class="rtp-n">' + esc(n) + '</span></button>';
    }
    var chips = [["", "전체"]].concat(mine.length ? [["mine", "이 회원님"]] : []).concat(RT_CAT.map(function (c) { return [c[0], c[0]]; }));
    var body = '<input class="rtp-q" type="search" placeholder="이름으로 찾기 (예: 로우, 레터럴)" aria-label="종목 이름으로 찾기">' +
      '<div class="rts-chips rtp-f">' + chips.map(function (c, i) { return '<button type="button" data-g="' + c[0] + '" aria-pressed="' + (i === 0) + '">' + c[1] + '</button>'; }).join("") + '</div>' +
      '<div class="rtp-list">' +
      (mine.length ? '<div class="rtp-sec" data-g="mine"><h4>이 회원님 루틴에 있는 종목</h4><div class="rtp-grid">' + mine.map(function (it) { return tile(it.name); }).join("") + '</div></div>' : '') +
      RT_CAT.map(function (c) { return '<div class="rtp-sec" data-g="' + c[0] + '"><h4>' + c[0] + '</h4><div class="rtp-grid">' + c[1].map(tile).join("") + '</div></div>'; }).join("") +
      '<p class="rtp-none" hidden>찾는 종목이 없어요. 아래 "직접 입력"으로 넣어 주세요</p></div>' +
      (allowFree ? '<button type="button" class="rtadd rtp-free">✎ 목록에 없는 종목 직접 입력</button>' : '');
    var sh = rtSheet(title, body, null, false);
    sh.classList.add("rtp");
    var q = sh.querySelector(".rtp-q"), g = "";
    function filt() {
      var k = fnorm(q.value), any = false;
      Array.prototype.forEach.call(sh.querySelectorAll(".rtp-sec"), function (sec) {
        var gs = sec.getAttribute("data-g"), vis = 0;
        var secOn = k ? gs !== "mine" : (!g || g === gs);
        Array.prototype.forEach.call(sec.querySelectorAll(".rtp-t"), function (t) {
          var on = secOn && (!k || fnorm(t.getAttribute("data-n")).indexOf(k) >= 0);
          t.hidden = !on; if (on) vis++;
        });
        sec.hidden = !vis; if (vis) any = true;
      });
      sh.querySelector(".rtp-none").hidden = any;
    }
    q.addEventListener("input", function () {   /* 찾을 땐 전체에서 */
      if (q.value && g) { g = ""; Array.prototype.forEach.call(sh.querySelectorAll(".rtp-f button"), function (o, j) { o.setAttribute("aria-pressed", String(!j)); }); }
      filt();
    });
    sh.querySelector(".rtp-f").addEventListener("click", function (e) {
      var b = e.target.closest("button"); if (!b) return;
      g = b.getAttribute("data-g"); q.value = "";
      Array.prototype.forEach.call(this.children, function (o) { o.setAttribute("aria-pressed", String(o === b)); });
      filt(); sh.querySelector(".rtp-list").scrollTop = 0;
    });
    sh.querySelector(".rtp-list").addEventListener("click", function (e) {
      var t = e.target.closest(".rtp-t"); if (!t) return;
      var n = t.getAttribute("data-n"), src = mineBy[n];
      sh.close();
      onPick({ name: n, en: (src && src.en) || rtEnOf(n), tip: src ? src.tip || "" : "", sets: src ? clone(src.sets) : null });
    });
    var fr = sh.querySelector(".rtp-free");
    if (fr) fr.addEventListener("click", function () { sh.close(); onPick(null); });
  }
  /* 세트 빠르게 넣기 (2026-11-11 "피라미드 3세트 4세트 5세트 다양하게") */
  var RT_PRESETS = {
    pyr: [
      { label: "3세트", reps: [12, 10, 8] },
      { label: "4세트", reps: [15, 12, 10, 8] },
      { label: "5세트", reps: [15, 12, 10, 8, 6] },
      { label: "5세트 고반복", reps: [20, 15, 12, 10, 8] }
    ],
    flat: [
      { label: "15회×3", reps: [15, 15, 15] },
      { label: "12회×3", reps: [12, 12, 12] },
      { label: "12회×4", reps: [12, 12, 12, 12] },
      { label: "10회×4", reps: [10, 10, 10, 10] },
      { label: "10회×5", reps: [10, 10, 10, 10, 10] },
      { label: "20회×3", reps: [20, 20, 20] }
    ]
  };
  function rtItemSheet(dk, i, pre) {
    var d = dayByKey(dk), isNew = i < 0;
    var it = isNew ? { name: pre ? pre.name : "", en: pre ? pre.en : "", tip: pre ? pre.tip : "", sets: pre && pre.sets && pre.sets.length ? pre.sets : pre && isCardio(pre.name) ? [["20분", null]] : [[15, null], [12, null], [10, null]] } : clone(d.items[i]);
    var sets = (it.sets || []).map(function (s) { return [s[0], s[1]]; });
    var body = '<div class="rts-name"><button type="button" class="rts-ic" id="fIc" aria-label="그림 눌러서 종목 바꾸기">' + img(iconOf(it), "", true) + '<i>바꾸기</i></button>' +
      '<label>종목 이름<input id="fName" list="rtNames" autocomplete="off" value="' + esc(it.name) + '" placeholder="예: 랫풀다운"></label></div>' +
      '<datalist id="rtNames">' + rtNames().map(function (n) { return '<option value="' + esc(n) + '">'; }).join("") + '</datalist>' +
      '<p class="rts-hint" id="fIcHint"></p>' +
      '<label>영어 이름 <small>제목 아래 작은 글자</small><input id="fEn" value="' + esc(it.en) + '"></label>' +
      '<div class="rts-l">구분</div><div class="rts-chips" id="fTag">' + [["", "없음"], ["워밍업", "워밍업"], ["선행", "선행"], ["메인", "메인 (금색)"]].map(function (t) {
        return '<button type="button" data-v="' + t[0] + '" aria-pressed="' + ((it.tag || "") === t[0]) + '">' + t[1] + '</button>';
      }).join("") + '</div>' +
      '<label>팁<textarea id="fTip" rows="3">' + esc(it.tip) + '</textarea></label>' +
      '<div class="rts-l">세트 <small>' + (isCardio(it.name) ? '유산소는 횟수 칸에 "20분"처럼 시간을 적고 무게는 비워요' : '횟수에 "30초"처럼 글자도 돼요 · 무게를 비우면 맨몸') + '</small></div><div class="rts-sets" id="fSets"></div>' +
      '<div class="rts-row"><button type="button" class="rtb" id="fAdd">+ 세트 추가</button></div>' +
      '<div class="rts-pre" id="fPre"><div class="rts-l">빠르게 넣기 <small>누르면 세트가 이 모양으로 바뀌어요</small></div>' +
      '<div class="rts-pg"><b>피라미드</b>' + RT_PRESETS.pyr.map(function (p, j) { return '<button type="button" data-p="pyr" data-j="' + j + '">' + p.label + '<small>' + p.reps.join("·") + '</small></button>'; }).join("") + '</div>' +
      '<div class="rts-pg"><b>같은 횟수</b>' + RT_PRESETS.flat.map(function (p, j) { return '<button type="button" data-p="flat" data-j="' + j + '">' + p.label + '<small>' + p.reps.length + '세트</small></button>'; }).join("") + '</div>' +
      '<div class="rts-pg"><b>무게</b><span class="rts-seg" id="fStep">' + [[0, "그대로"], [2, "+2kg씩"], [2.5, "+2.5kg씩"], [5, "+5kg씩"]].map(function (st, j) {
        return '<button type="button" data-s="' + st[0] + '" aria-pressed="' + (j === 0) + '">' + st[1] + '</button>'; }).join("") + '</span></div>' +
      '<p class="rts-hint2">무게는 1세트 칸 기준 — "+5kg씩"이면 세트마다 5kg 올라가요 (피라미드는 횟수가 줄 때 무게를 올리는 방식)</p></div>' +
      (M.forms && M.forms.length ? '<label>자세 복습지 연결 <small>자동 = 이름이 같은 복습지가 올라오면 알아서 붙음</small><select id="fForm"><option value="">자동</option><option value="-"' + (it.form === "-" ? ' selected' : '') + '>연결 안 함</option>' + M.forms.map(function (f) {
        return '<option value="' + esc(f.id) + '"' + (it.form === f.id ? ' selected' : '') + '>' + esc(f.exercise) + ' (' + esc(f.date) + ')</option>';
      }).join("") + '</select></label>' : '');
    var sh = rtSheet(isNew ? dayName(dk) + " · 새 종목 넣기" : "종목 고치기", body, function (sh) {
      readSets();
      var name = fv(sh, "fName");
      if (!name) return "종목 이름을 넣어 주세요";
      if (!sets.length) return "세트를 하나 이상 넣어 주세요";
      for (var k = 0; k < sets.length; k++) if (sets[k][0] === "" || sets[k][0] == null) return (k + 1) + "세트 횟수를 넣어 주세요";
      var out = { name: name, en: fv(sh, "fEn") };
      var tag = sh.querySelector('#fTag [aria-pressed="true"]'); tag = tag ? tag.getAttribute("data-v") : "";
      if (tag) out.tag = tag;
      out.tip = fv(sh, "fTip");
      out.sets = sets;
      var fm = fv(sh, "fForm"); if (fm) out.form = fm;
      if (it.icon && name === it.name) out.icon = it.icon;   /* data.js에서 따로 정한 그림은 이름이 그대로면 유지 */
      if (isNew) d.items.push(out); else d.items[i] = out;
      rtDirty();
    });
    var box = sh.querySelector("#fSets");
    function readSets() {
      sets = Array.prototype.map.call(box.querySelectorAll(".rts-set"), function (row) {
        var r = row.querySelector(".r").value.trim(), k = row.querySelector(".k").value.trim().replace(",", ".");
        return [/^\d+$/.test(r) ? +r : r, k === "" || isNaN(+k) ? null : +k];
      });
    }
    function drawSets() {
      box.innerHTML = sets.map(function (s, j) {
        return '<div class="rts-set"><small>' + (j + 1) + '세트</small><input class="r" inputmode="numeric" value="' + esc(s[0]) + '" aria-label="' + (j + 1) + '세트 횟수"><i>회</i>' +
          '<input class="k" inputmode="decimal" value="' + (s[1] == null ? "" : esc(s[1])) + '" placeholder="맨몸" aria-label="' + (j + 1) + '세트 무게"><i>kg</i>' +
          '<button type="button" class="x" data-j="' + j + '" aria-label="' + (j + 1) + '세트 빼기"' + (sets.length > 1 ? '' : ' disabled') + '>×</button></div>';
      }).join("");
    }
    drawSets();
    box.addEventListener("click", function (e) {
      var x = e.target.closest(".x"); if (!x) return;
      readSets(); sets.splice(+x.getAttribute("data-j"), 1); drawSets();
    });
    sh.querySelector("#fAdd").addEventListener("click", function () {
      readSets(); var last = sets[sets.length - 1] || [12, null]; sets.push([last[0], last[1]]); drawSets();
    });
    var step = 0;
    sh.querySelector("#fStep").addEventListener("click", function (e) {
      var b = e.target.closest("button"); if (!b) return;
      step = +b.getAttribute("data-s");
      Array.prototype.forEach.call(this.children, function (o) { o.setAttribute("aria-pressed", String(o === b)); });
    });
    sh.querySelector("#fPre").addEventListener("click", function (e) {
      var b = e.target.closest("button[data-p]"); if (!b) return;
      readSets();
      var reps = RT_PRESETS[b.getAttribute("data-p")][+b.getAttribute("data-j")].reps;
      var k0 = sets.length ? sets[0][1] : null;
      sets = reps.map(function (r, j) {
        var k = k0 == null ? null : step ? Math.round((k0 + step * j) * 10) / 10 : (sets[j] && sets[j][1] != null ? sets[j][1] : k0);
        return [r, k];
      });
      drawSets();
      Array.prototype.forEach.call(sh.querySelectorAll("#fPre button[data-p]"), function (o) { o.classList.toggle("on", o === b); });
    });
    sh.querySelector("#fTag").addEventListener("click", function (e) {
      var b = e.target.closest("button"); if (!b) return;
      Array.prototype.forEach.call(this.children, function (o) { o.setAttribute("aria-pressed", String(o === b)); });
    });
    var nm = sh.querySelector("#fName"), en = sh.querySelector("#fEn"), hint = sh.querySelector("#fIcHint");
    function onName() {
      var n = nm.value.trim(), k = iconOf({ name: n, icon: n === it.name ? it.icon : null });
      sh.querySelector("#fIc").innerHTML = img(k, "", true) + '<i>바꾸기</i>';
      hint.textContent = n && k === "dumbbell" ? "이 이름은 운동 그림이 없어서 덤벨 그림으로 나와요" : "";
      if (n && RT_EN[n] && (!en.value.trim() || en.getAttribute("data-auto"))) { en.value = RT_EN[n]; en.setAttribute("data-auto", "1"); }
    }
    nm.addEventListener("input", onName);
    en.addEventListener("input", function () { en.removeAttribute("data-auto"); });
    sh.querySelector("#fIc").addEventListener("click", function () {
      rtPicker("종목 바꾸기", function (e) {
        if (!e) { nm.focus(); return; }
        nm.value = e.name; en.value = e.en; en.setAttribute("data-auto", "1"); onName();
      }, false);
    });
    onName();
    if (isNew && !it.name) setTimeout(function () { nm.focus(); }, 50);
  }

  /* 이날 정보 (부위 이름 · 유산소 · 쉬는 날) */
  function rtDaySheet(dk) {
    var d = dayByKey(dk), R = M.routine, plain = !d.pick && !d.cardio_only;
    var body = '<label>부위 이름<input id="dPart" value="' + esc(d.part) + '" placeholder="예: 등 · 팔"></label>' +
      '<label>영어 <small>오른쪽 작은 글자</small><input id="dEn" value="' + esc(d.en) + '"></label>' +
      (plain ? '<label class="rts-ck"><input type="checkbox" id="dCardio"' + (d.cardio ? ' checked' : '') + '> 마무리 유산소' +
        (R.cardio ? ' ' + R.cardio.minutes + '분' : ' (유산소는 제목·계획 고치기에서 정해요)') + '</label>' : '') +
      (d.items && d.items.length ? '<div class="rts-pre"><span class="rts-l">이날 전체 한 번에 <small>누르면 바로 바뀌어요</small></span>' +
        '<div class="rts-seg" id="dBulk"><button type="button" data-kg="-5">−5kg</button><button type="button" data-kg="-2.5">−2.5kg</button><button type="button" data-kg="2.5">+2.5kg</button><button type="button" data-kg="5">+5kg</button>' +
        '<button type="button" data-set="-1">세트 −1</button><button type="button" data-set="1">세트 +1</button></div></div>' : '') +
      '<button type="button" class="rtb" id="dWeek" style="width:100%">다른 날과 바꾸기 · 복사</button>' +
      (!ROT && !d.rest ? '<button type="button" class="rtb warn" id="dRest">이날을 쉬는 날로 바꾸기</button>' : '');
    var sh = rtSheet(dayName(dk) + " 정보", body, function (sh) {
      var part = fv(sh, "dPart");
      if (!part) return "부위 이름을 넣어 주세요";
      d.part = part; d.en = fv(sh, "dEn");
      var c = sh.querySelector("#dCardio"); if (c) d.cardio = c.checked;
      rtDirty();
    });
    var bk = sh.querySelector("#dBulk");
    if (bk) bk.addEventListener("click", function (e) {
      var b = e.target.closest("button"); if (!b) return;
      var kg = parseFloat(b.getAttribute("data-kg")), st = parseInt(b.getAttribute("data-set"), 10), n = 0;
      d.items.forEach(function (it) {
        if (!it.sets || !it.sets.length) return;
        if (kg) it.sets.forEach(function (x) { var v = parseFloat(x[1]); if (isFinite(v) && v > 0) { x[1] = Math.max(0, Math.round((v + kg) * 2) / 2); n++; } });
        else if (st > 0 && it.sets.length < 8) { it.sets.push(it.sets[it.sets.length - 1].slice()); n++; }
        else if (st < 0 && it.sets.length > 1) { it.sets.pop(); n++; }
      });
      if (!n) { sh.msg("바꿀 수 있는 세트가 없어요"); return; }
      rtDirty();
      sh.msg(kg ? "무게가 적힌 세트 " + n + "개를 " + (kg > 0 ? "+" : "−") + Math.abs(kg) + "kg 했어요" : n + "종목을 세트 " + (st > 0 ? "+1" : "−1") + " 했어요");
    });
    sh.querySelector("#dWeek").addEventListener("click", function () { sh.close(); rtWeekSheet(d); });
    var rb = sh.querySelector("#dRest");
    if (rb) rb.addEventListener("click", function () {
      if (!rb.classList.contains("sure")) { rb.classList.add("sure"); rb.textContent = "한 번 더 누르면 쉬는 날이 돼요 (종목도 지워져요)"; return; }
      d.rest = true; d.items = []; d.part = "휴식"; d.en = "Rest"; delete d.pick; delete d.cardio_only; d.cardio = false;
      sh.close(); rtDirty();
    });
    var pe = sh.querySelector("#dPart"), ee = sh.querySelector("#dEn");
    pe.addEventListener("input", function () { var p = pe.value.trim(); if (RT_PART_EN[p] && (!ee.value.trim() || ee.getAttribute("data-auto"))) { ee.value = RT_PART_EN[p]; ee.setAttribute("data-auto", "1"); } });
    ee.addEventListener("input", function () { ee.removeAttribute("data-auto"); });
  }
  function rtMakeWorkDay(dk) {
    var d = dayByKey(dk);
    if (!d) {
      d = { day: DAY_KO[dk], part: "", en: "", cardio: true, items: [] };
      M.routine.days.push(d);
      var ord = ["월", "화", "수", "목", "금", "토", "일"];
      M.routine.days.sort(function (a, b) { return ord.indexOf(a.day) - ord.indexOf(b.day); });
    }
    d.rest = false; delete d.rest; d.part = d.part === "휴식" ? "" : d.part; d.en = d.en === "Rest" ? "" : d.en; d.items = d.items || [];
    if (d.cardio == null) d.cardio = true;
    rtDirty();
    rtDaySheet(dk);
  }

  /* ---- 2026-11-17 장동욱 "루틴 항목 바꾸는 옵션 다양화(월↔목 요일 바꾸기 등), 세팅하기 편하게"
     요일 정리 창(rtWeekSheet: 두 날 서로 바꾸기 / 한 날을 다른 날에 복사) · 종목 ⋯ 창(rtMoreSheet: 복제·맨 위/아래·다른 날로 옮기기/복사) · 이날 정보 창의 무게·세트 한 번에(#dBulk) */
  function rtDayList() {   /* [{label, d}] — 요일 루틴은 월~일 7칸(없는 날 d=null), 순환 루틴은 DAY 1~N */
    var D = M.routine.days || [];
    if (ROT) return D.map(function (d, i) { return { label: "DAY " + (i + 1), d: d }; });
    return ["월", "화", "수", "목", "금", "토", "일"].map(function (k) { return { label: k + "요일", ko: k, d: D.filter(function (x) { return x.day === k; })[0] || null }; });
  }
  function rtDayEnsure(x) {
    if (x.d) return x.d;
    var d = { day: x.ko, part: "휴식", en: "Rest", rest: true, items: [] }, ord = ["월", "화", "수", "목", "금", "토", "일"];
    M.routine.days.push(d); M.routine.days.sort(function (a, b) { return ord.indexOf(a.day) - ord.indexOf(b.day); });
    return (x.d = d);
  }
  function rtDayBody(d) { var o = {}; for (var k in d) if (k !== "day") o[k] = clone(d[k]); return o; }
  function rtDayPut(d, body) { var k; for (k in d) if (k !== "day") delete d[k]; for (k in body) d[k] = clone(body[k]); }
  function rtDayLine(d) { return !d || d.rest ? "쉬는 날" : (d.part || "이름 없음") + " · " + ((d.items || []).length) + "종목"; }
  function rtWeekSheet(pre) {
    var mode = "swap", sel = -1, sure = -1;
    var sh = rtSheet("요일 정리", '<div class="rts-seg" id="wMode"><button type="button" data-m="swap" aria-pressed="true">서로 바꾸기</button><button type="button" data-m="copy" aria-pressed="false">복사하기</button></div>' +
      '<p class="rtw-tip" id="wTip"></p><div class="rtw-list" id="wList"></div>', function () {}, false);
    sh.querySelector(".rts-foot [data-close]").textContent = "닫기";
    function draw() {
      var L = rtDayList();
      sh.querySelector("#wTip").textContent = mode === "swap" ? (sel < 0 ? "바꿀 두 날을 차례로 눌러 주세요" : L[sel].label + "과 바꿀 날을 눌러 주세요") : (sel < 0 ? "복사할 날을 먼저 눌러 주세요" : L[sel].label + " 운동을 붙여 넣을 날을 눌러 주세요 (그날 내용은 덮어써요)");
      sh.querySelector("#wList").innerHTML = L.map(function (x, i) {
        return '<button type="button" class="rtw' + (i === sel ? ' on' : '') + (i === sure ? ' sure' : '') + (!x.d || x.d.rest ? ' rest' : '') + '" data-i="' + i + '"><b>' + x.label + '</b><span>' + esc(i === sure ? "한 번 더 누르면 덮어써요" : rtDayLine(x.d)) + '</span>' +
          (i === sel ? '<em>' + (mode === "swap" ? "선택" : "복사할 날") + '</em>' : '') + '</button>';
      }).join("");
    }
    if (pre) rtDayList().forEach(function (x, i) { if (x.d === pre) sel = i; });
    draw();
    sh.querySelector("#wMode").addEventListener("click", function (e) {
      var b = e.target.closest("button"); if (!b) return;
      mode = b.getAttribute("data-m"); sure = -1;
      Array.prototype.forEach.call(sh.querySelectorAll("#wMode button"), function (x) { x.setAttribute("aria-pressed", x === b); });
      draw(); sh.msg("");
    });
    sh.querySelector("#wList").addEventListener("click", function (e) {
      var b = e.target.closest(".rtw"); if (!b) return;
      var i = +b.getAttribute("data-i"), L = rtDayList();
      if (sel < 0) { if (mode === "copy" && (!L[i].d || L[i].d.rest)) { sh.msg("쉬는 날은 복사할 게 없어요"); return; } sel = i; sure = -1; sh.msg(""); draw(); return; }
      if (i === sel) { sel = -1; sure = -1; draw(); return; }
      var A = L[sel], B = L[i];
      if (mode === "swap") {
        if ((!A.d || A.d.rest) && (!B.d || B.d.rest)) { sh.msg("둘 다 쉬는 날이에요"); sel = -1; draw(); return; }
        var a = rtDayEnsure(A), b2 = rtDayEnsure(B), t = rtDayBody(a);
        rtDayPut(a, rtDayBody(b2)); rtDayPut(b2, t);
        rtDirty(); sh.msg(A.label + " ↔ " + B.label + " 바꿨어요"); sel = -1; draw(); return;
      }
      if (B.d && !B.d.rest && (B.d.items || []).length && sure !== i) { sure = i; draw(); return; }
      rtDayPut(rtDayEnsure(B), rtDayBody(A.d));
      rtDirty(); sh.msg(A.label + " 운동을 " + B.label + "에 복사했어요"); sel = -1; sure = -1; draw();
    });
  }
  function rtMoreSheet(dk, i) {
    var d = dayByKey(dk), it = d.items[i], mode = "move";
    var L = rtDayList().filter(function (x) { return x.d !== d; });
    var sh = rtSheet(it.name, '<span class="rts-l">이날 안에서</span><div class="rts-seg" id="mIn"><button type="button" data-a="dup">복제</button>' +
      '<button type="button" data-a="top"' + (i ? '' : ' disabled') + '>맨 위로</button><button type="button" data-a="end"' + (i < d.items.length - 1 ? '' : ' disabled') + '>맨 아래로</button></div>' +
      '<span class="rts-l">다른 날로</span><div class="rts-seg" id="mMode"><button type="button" data-m="move" aria-pressed="true">옮기기</button><button type="button" data-m="copy" aria-pressed="false">복사하기</button></div>' +
      '<div class="rtw-list" id="mList">' + L.map(function (x, k) { return '<button type="button" class="rtw' + (!x.d || x.d.rest ? ' rest' : '') + '" data-i="' + k + '"><b>' + x.label + '</b><span>' + esc(rtDayLine(x.d)) + '</span></button>'; }).join("") + '</div>', function () {}, false);
    sh.querySelector(".rts-foot [data-close]").textContent = "닫기";
    sh.querySelector("#mIn").addEventListener("click", function (e) {
      var b = e.target.closest("button"); if (!b || b.disabled) return;
      var a = b.getAttribute("data-a");
      if (a === "dup") d.items.splice(i + 1, 0, clone(it));
      else { d.items.splice(i, 1); if (a === "top") d.items.unshift(it); else d.items.push(it); }
      sh.close(); rtDirty();
    });
    sh.querySelector("#mMode").addEventListener("click", function (e) {
      var b = e.target.closest("button"); if (!b) return;
      mode = b.getAttribute("data-m");
      Array.prototype.forEach.call(sh.querySelectorAll("#mMode button"), function (x) { x.setAttribute("aria-pressed", x === b); });
    });
    sh.querySelector("#mList").addEventListener("click", function (e) {
      var b = e.target.closest(".rtw"); if (!b) return;
      var x = L[+b.getAttribute("data-i")], t = rtDayEnsure(x);
      if (t.rest) { delete t.rest; t.part = d.part; t.en = d.en; t.items = []; if (t.cardio == null) t.cardio = true; }
      t.items = t.items || []; t.items.push(clone(it));
      if (mode === "move") d.items.splice(i, 1);
      sh.close(); rtDirty();
      attToast(it.name + " → " + x.label + (mode === "move" ? "로 옮겼어요" : "에 복사했어요"));
    });
  }

  /* ---- 꾹 눌러 끌기 (2026-11-17 장동욱 "종목을 꾹 누르면 끌고 와서 손을 떼면 버튼 안 눌러도 이동")
     종목 카드(.rtdr) 꾹 0.35초 → 떠오름 → 끌어서 순서 바꾸기 / 위 요일 칸에 놓으면 그날로 옮김
     요일 칸(.rtdk) 꾹 → 다른 요일 칸에 놓으면 두 날을 서로 바꿈. 떠다니는 복사본은 body에 붙임(.view엔 transform 안 씀) */
  var RT_DRAG = null, rtDragEnd = 0;
  function rtListByKey(k) { var L = rtDayList(); return L[ROT ? +k.slice(1) - 1 : ["mon", "tue", "wed", "thu", "fri", "sat", "sun"].indexOf(k)] || null; }
  function rtDragDown(e) {
    if (!RT_EDIT || RT_DRAG || (e.button && e.button !== 0) || e.target.closest("button, input, .rtsheet")) return;
    var el = e.target.closest(".ex.rtdr, .day-tile.rtdk"); if (!el) return;
    var x0 = e.clientX, y0 = e.clientY, tm, pid = e.pointerId;
    function off() { clearTimeout(tm); document.removeEventListener("pointermove", mv0); document.removeEventListener("pointerup", off); document.removeEventListener("pointercancel", off); }
    function mv0(ev) { if (ev.pointerId === pid && Math.abs(ev.clientX - x0) + Math.abs(ev.clientY - y0) > 10) off(); }
    document.addEventListener("pointermove", mv0); document.addEventListener("pointerup", off); document.addEventListener("pointercancel", off);
    el.classList.add("rt-press");
    tm = setTimeout(function () { off(); el.classList.remove("rt-press"); rtDragStart(el, x0, y0, pid); }, 350);
    setTimeout(function () { el.classList.remove("rt-press"); }, 360);
  }
  function rtDragStart(el, x, y, pid) {
    var r = el.getBoundingClientRect(), fly = el.cloneNode(true), item = el.classList.contains("ex");
    fly.className += " rt-fly"; fly.removeAttribute("href");
    fly.style.cssText = "width:" + r.width + "px;height:" + r.height + "px;left:" + r.left + "px;top:" + r.top + "px";
    document.body.appendChild(fly);
    el.classList.add("rt-hold");
    document.documentElement.classList.add("rt-dragging");
    try { navigator.vibrate && navigator.vibrate(12); } catch (er) {}
    fly.style.transformOrigin = (x - r.left) + "px " + (y - r.top) + "px";
    RT_DRAG = { el: el, fly: fly, item: item, dx: x - r.left, dy: y - r.top, x: x, y: y, over: null, raf: 0 };
    function move(ev) { if (ev.pointerId !== pid) return; RT_DRAG.x = ev.clientX; RT_DRAG.y = ev.clientY; rtDragMove(); }
    function up(ev) { if (ev.pointerId !== pid) return; document.removeEventListener("pointermove", move); document.removeEventListener("pointerup", up); document.removeEventListener("pointercancel", up); rtDragDrop(ev.type === "pointercancel"); }
    document.addEventListener("pointermove", move); document.addEventListener("pointerup", up); document.addEventListener("pointercancel", up);
    (function scroll() {   /* 화면 위·아래 끝에 가면 저절로 스크롤 */
      if (!RT_DRAG) return;
      var H = window.innerHeight, v = RT_DRAG.y < 110 ? -(110 - RT_DRAG.y) / 6 : RT_DRAG.y > H - 170 ? (RT_DRAG.y - (H - 170)) / 6 : 0;
      if (v) { window.scrollBy(0, v); rtDragMove(); }
      RT_DRAG.raf = requestAnimationFrame(scroll);
    })();
  }
  function rtDragMove() {
    var D = RT_DRAG; if (!D) return;
    D.fly.style.left = (D.x - D.dx) + "px"; D.fly.style.top = (D.y - D.dy) + "px";
    var hit = document.elementFromPoint(D.x, D.y), tile = hit && hit.closest(".day-tile.rtdk");
    if (tile === D.el || (tile && D.item && tile.getAttribute("data-dk") === view.getAttribute("data-day"))) tile = null;
    if (D.over !== tile) { if (D.over) D.over.classList.remove("rt-drop"); if (tile) tile.classList.add("rt-drop"); D.over = tile; }
    D.fly.classList.toggle("to-day", !!tile);
    if (!D.item || tile) return;
    var sibs = Array.prototype.filter.call(D.el.parentNode.children, function (c) { return c !== D.el && c.classList.contains("rtdr"); });
    if (!sibs.length) return;
    var before = null;
    for (var i = 0; i < sibs.length; i++) { var rr = sibs[i].getBoundingClientRect(); if (D.y < rr.top + rr.height / 2) { before = sibs[i]; break; } }
    if (before) { if (D.el.nextElementSibling !== before) D.el.parentNode.insertBefore(D.el, before); }
    else { var last = sibs[sibs.length - 1]; if (last.nextElementSibling !== D.el) last.parentNode.insertBefore(D.el, last.nextElementSibling); }
  }
  function rtDragDrop(cancel) {
    var D = RT_DRAG; if (!D) return;
    cancelAnimationFrame(D.raf); RT_DRAG = null; rtDragEnd = Date.now();
    D.fly.remove(); D.el.classList.remove("rt-hold"); document.documentElement.classList.remove("rt-dragging");
    if (D.over) D.over.classList.remove("rt-drop");
    if (cancel) { rerender(); return; }
    var sk = view.getAttribute("data-day"), src = rtListByKey(sk);
    if (D.item) {
      var i = +D.el.getAttribute("data-di"), sd = src && src.d; if (!sd) return;
      if (D.over) {   /* 다른 요일 칸에 놓음 → 그날로 옮기기 */
        var tx = rtListByKey(D.over.getAttribute("data-dk")); if (!tx) return;
        var t = rtDayEnsure(tx), it = sd.items[i];
        if (t.rest) { delete t.rest; t.part = sd.part; t.en = sd.en; t.items = []; if (t.cardio == null) t.cardio = true; }
        t.items = t.items || []; t.items.push(it); sd.items.splice(i, 1);
        rtDirty(); attToast(it.name + " → " + tx.label + "로 옮겼어요");
        return;
      }
      var ord = Array.prototype.map.call(D.el.parentNode.querySelectorAll(".rtdr"), function (c) { return +c.getAttribute("data-di"); });
      if (ord.every(function (v, k) { return v === k; })) return;
      var old = sd.items.slice(); sd.items = ord.map(function (k) { return old[k]; });
      rtDirty();
      return;
    }
    if (!D.over) return;   /* 요일 칸끼리 → 서로 바꾸기 */
    var A = rtListByKey(D.el.getAttribute("data-dk")), B = rtListByKey(D.over.getAttribute("data-dk"));
    if (!A || !B || ((!A.d || A.d.rest) && (!B.d || B.d.rest))) return;
    var a = rtDayEnsure(A), b = rtDayEnsure(B), tmp = rtDayBody(a);
    rtDayPut(a, rtDayBody(b)); rtDayPut(b, tmp);
    rtDirty(); attToast(A.label + " ↔ " + B.label + " 바꿨어요");
  }

  /* 제목·계획·KEY POINT·메모·유산소 */
  function rtInfoSheet() {
    var R = M.routine, C = R.cardio;
    var body = '<label>루틴 제목<input id="iTitle" value="' + esc(R.title) + '"></label>' +
      '<label>KEY POINT<textarea id="iKey" rows="2">' + esc(R.key_point) + '</textarea></label>' +
      '<label>이번 주 계획 <small>한 줄에 하나씩</small><textarea id="iPlan" rows="3">' + esc((R.plan || []).join("\n")) + '</textarea></label>' +
      '<label>종목 아래 메모 <small>비우면 안 보여요</small><textarea id="iNote" rows="2">' + esc(R.note) + '</textarea></label>' +
      '<div class="rts-l">마무리 유산소 <small>분을 비우면 유산소 줄이 안 나와요</small></div>' +
      '<div class="rts-two"><label>분<input id="iCm" inputmode="numeric" value="' + (C ? esc(C.minutes) : "") + '"></label>' +
      '<label>종류<input id="iCo" value="' + (C ? esc(C.options) : "") + '" placeholder="경사 걷기 · 사이클 중 택1"></label></div>';
    rtSheet("제목·계획 고치기", body, function (sh) {
      var t = fv(sh, "iTitle"); if (!t) return "루틴 제목을 넣어 주세요";
      R.title = t; R.key_point = fv(sh, "iKey");
      R.plan = fv(sh, "iPlan").split(/\n+/).map(function (s) { return s.trim(); }).filter(Boolean);
      R.note = fv(sh, "iNote");
      var cm = fv(sh, "iCm");
      if (cm && !/^\d+$/.test(cm)) return "유산소 분은 숫자로 넣어 주세요";
      R.cardio = cm ? { minutes: +cm, options: fv(sh, "iCo") } : null;
      rtDirty();
    });
  }


  /* 다른 회원 루틴 가져오기 (2026-11-11 "루틴 복사해서 시작") — 선생님 페이지 members.js 회원들의 data.js(+폰에서 고친 루틴)에서 골라 통째로 복사.
     복습지 연결(form)은 그 회원 것이라 빼고, 순환 루틴끼리 / 요일 루틴끼리만 */
  function rtDaySummary(R) {
    return (R.days || []).filter(function (d) { return !d.rest; }).map(function (d) { return (ROT ? d.day.replace("DAY ", "D") : d.day) + " " + d.part; }).join(" · ");
  }
  function rtLoadOthers() {
    var cp = ""; try { cp = localStorage.getItem("ptcoach") || ""; } catch (e) {}
    if (!/^\/coach-[a-z0-9]+\/$/.test(cp)) return Promise.reject(new Error("coach"));
    return fetch(cp + "members.js", { cache: "no-store" }).then(function (r) { return r.text(); }).then(function (t) {
      var w = {}; new Function("window", t)(w);
      var list = (w.COACH_MEMBERS || []).filter(function (sl) { return sl !== SLUG; });
      return Promise.all(list.map(function (sl) {
        return fetch("/m/" + sl + "/data.js", { cache: "no-store" }).then(function (r) { return r.text(); }).then(function (t2) {
          var w2 = {}; new Function("window", t2)(w2);
          var O = w2.MEMBER; if (!O || !O.routine) return null;
          var base = rtBase(O.routine);
          return (ATT_API ? fetch(ATT_API + "?m=" + encodeURIComponent(sl)).then(function (r) { return r.json(); }).catch(function () { return null; }) : Promise.resolve(null)).then(function (j) {
            var R = j && j.routine && j.routine.routine && j.routine.base === base ? j.routine.routine : O.routine;
            return { slug: sl, name: O.name, sex: O.sex, R: R, ed: R !== O.routine };
          });
        }).catch(function () { return null; });
      }));
    }).then(function (rows) {
      return rows.filter(function (x) { return x && !!x.R.rotation === ROT && (x.R.days || []).length; });
    });
  }
  function rtCopySheet() {
    var sh = rtSheet("다른 회원 루틴 가져오기", '<p class="rts-p">고른 회원님 루틴을 통째로 복사해 와요. 가져온 뒤 무게만 고치고 저장하면 돼요.</p><div class="rtcp-list"><p class="rts-p">회원님 루틴 불러오는 중…</p></div>', null, false);
    var box = sh.querySelector(".rtcp-list");
    rtLoadOthers().then(function (rows) {
      if (!rows.length) { box.innerHTML = '<p class="rts-p">가져올 수 있는 루틴이 없어요' + (ROT ? ' (순환 루틴 회원이 없어요)' : '') + '</p>'; return; }
      box.innerHTML = rows.map(function (x, i) {
        var nDays = (x.R.days || []).filter(function (d) { return !d.rest && !d.pick && !d.cardio_only; }).length;
        return '<button type="button" class="rtcp" data-i="' + i + '"><span class="av ' + (x.sex === "F" ? "F" : "M") + '">' + esc(String(x.name).charAt(0)) + '</span>' +
          '<span class="rtcp-t"><b>' + esc(x.name) + ' <small>' + esc(x.R.version || "") + (x.ed ? " ✎" : "") + ' · 주 ' + nDays + '회</small></b><small>' + esc(rtDaySummary(x.R)) + '</small></span><i aria-hidden="true">›</i></button>';
      }).join("");
      box.addEventListener("click", function (e) {
        var b = e.target.closest(".rtcp"); if (!b) return;
        var x = rows[+b.getAttribute("data-i")];
        sh.close();
        rtCopyConfirm(x);
      });
    }).catch(function () { box.innerHTML = '<p class="rts-p">불러오지 못했어요. 선생님 페이지를 한 번 열고 다시 해 주세요</p>'; });
  }
  function rtCopyConfirm(x) {
    var body = '<p class="rts-p"><b>' + esc(x.name) + '</b> 회원님 루틴(' + esc(x.R.version || "") + ')으로 지금 루틴을 바꿔요. 저장하기 전까진 회원님께 안 보여요.</p>' +
      '<div class="rtcp-pv">' + (x.R.days || []).map(function (d) {
        if (d.rest) return '<div class="rtcp-d rest"><b>' + esc(d.day) + '</b><span>쉬는 날</span></div>';
        return '<div class="rtcp-d"><b>' + esc(d.day) + '</b><span><em>' + esc(d.part) + '</em>' + esc((d.items || []).map(function (it) { return it.name; }).join(", ") || (d.pick ? "골라서 하는 날" : d.cardio_only ? "유산소만" : "")) + '</span></div>';
      }).join("") + '</div>';
    rtSheet("이 루틴으로 바꿀까요?", body, function () {
      var src = clone(x.R), cur = M.routine;
      (src.days || []).forEach(function (d) { (d.items || []).forEach(function (it) { delete it.form; }); });
      src.version = cur ? cur.version : "v1";
      src.updated = cur ? cur.updated : rtToday();
      M.routine = src;
      rtDirty();
      attToast(x.name + " 회원님 루틴을 가져왔어요 — 무게 고치고 저장하세요");
    }, "가져오기");
  }

  /* 저장 → 창고 */
  function rtCheck(R) {
    var days = R.days || [];
    for (var i = 0; i < days.length; i++) {
      var d = days[i], nm = ROT ? "DAY " + (i + 1) : d.day + "요일";
      if (d.rest || d.pick || d.cardio_only) continue;
      if (!d.part) return nm + " 부위 이름이 비어 있어요";
      if (!d.items || !d.items.length) return nm + "에 종목이 없어요 (쉬는 날이면 이날 정보 → 쉬는 날로 바꾸기)";
    }
    return "";
  }
  function rtPost(body) {
    if (!ATT_API) return Promise.reject(new Error("api"));
    body.m = SLUG; body.n = M._real || M.name;
    function once() { return fetch(ATT_API, { method: "POST", body: JSON.stringify(body) }).then(function (r) { return r.json(); }); }
    /* 창고가 다른 일로 바쁘면 한 번 실패할 수 있어서 2.5초 뒤 한 번 더 (같은 내용 덮어쓰기라 두 번 가도 괜찮음) */
    return once().catch(function () { return new Promise(function (ok) { setTimeout(ok, 2500); }).then(once); });
  }
  function rtNetMsg() { return navigator.onLine === false ? "인터넷 연결을 확인하고 다시 눌러 주세요" : "창고가 잠깐 바빠요. 몇 초 뒤 다시 눌러 주세요"; }
  function rtErr(j, sh) {
    var e = j && j.error;
    if (e === "key") { try { localStorage.removeItem("ptkey"); } catch (x) {} sh.msg("선생님 열쇠가 맞지 않아요. 다시 넣어 주세요"); var k = sh.querySelector("#sKeyWrap"); if (k) k.hidden = false; }
    else if (e === "action") sh.msg("창고(Apps Script)를 새 버전으로 다시 배포해야 저장돼요");
    else sh.msg("저장이 안 됐어요 (" + (e || "오류") + ") — 다시 눌러 주세요");
  }
  function rtSaveSheet() {
    var R = M.routine, bad = rtCheck(R);
    if (bad) { attToast(bad); return; }
    var nv = rtVerUp(R.version), hasKey = !!rtKey();
    var body = '<p class="rts-p">고친 곳 ' + RT_EDIT.dirty + '개 · 저장하면 회원님이 PT 노트를 열 때 바로 바뀌어요.</p>' +
      '<label class="rts-ck"><input type="checkbox" id="sVer"> 루틴 버전 올리기 <b>' + esc(R.version) + ' → ' + esc(nv) + '</b></label>' +
      '<label class="rts-ck"><input type="checkbox" id="sNt"> 회원님께 새 공지 띄우기 <small>(열 때 위에서 내려오는 알림)</small></label>' +
      '<div id="sNtBox" hidden><label>공지 제목<input id="sNtT" value=""></label><label>내용<textarea id="sNtB" rows="2"></textarea></label></div>' +
      '<label id="sKeyWrap"' + (hasKey ? ' hidden' : '') + '>선생님 열쇠 <small>처음 한 번만</small><input id="sKey" type="password" autocomplete="off"></label>';
    var sh = rtSheet("회원님께 반영할까요?", body, function (sh) {
      var key = fv(sh, "sKey") || rtKey();
      if (!key) { sh.querySelector("#sKeyWrap").hidden = false; return "선생님 열쇠를 넣어 주세요"; }
      var out = clone(R), up = sh.querySelector("#sVer").checked;
      if (up) out.version = nv;
      out.updated = rtToday();
      var nt = RT_REC && RT_REC.notice || null;
      if (sh.querySelector("#sNt").checked) {
        var t = fv(sh, "sNtT"); if (!t) return "공지 제목을 넣어 주세요";
        nt = { date: rtToday(), title: t, body: fv(sh, "sNtB"), link: "routine" };
      }
      var ok = sh.querySelector("[data-ok]"); ok.disabled = true; ok.textContent = "저장 중…"; sh.msg("");
      rtPost({ a: "routine_save", key: key, rec: { base: RT_BASE, routine: out, notice: nt } }).then(function (j) {
        if (!j || !j.ok || !j.routine) { ok.disabled = false; ok.textContent = "반영하기"; rtErr(j && j.ok ? { error: "action" } : j, sh); return; }
        try { localStorage.setItem("ptkey", key); localStorage.setItem(RT_LS, JSON.stringify(j.routine)); } catch (x) {}
        RT_EDIT = null; rtUse(j.routine); RT_STALE = null;
        grSeed(key);
        sh.close(); rerender();
        attToast("회원님 노트에 바로 반영됐어요");
      }).catch(function () { ok.disabled = false; ok.textContent = "반영하기"; sh.msg(rtNetMsg()); });
      return true;
    }, "반영하기");
    var ver = sh.querySelector("#sVer"), ntc = sh.querySelector("#sNt"), box = sh.querySelector("#sNtBox");
    function ntDefault() {
      var t = sh.querySelector("#sNtT"), b = sh.querySelector("#sNtB");
      if (t.getAttribute("data-user")) return;
      t.value = "루틴이 업데이트됐어요" + (ver.checked ? " (" + nv + ")" : "");
      b.value = "선생님이 루틴을 고쳤어요. 운동 전에 루틴 탭에서 한 번 확인해 주세요!";
    }
    sh.querySelector("#sNtT").addEventListener("input", function () { this.setAttribute("data-user", "1"); });
    ver.addEventListener("change", function () { if (ver.checked && !ntc.checked) { ntc.checked = true; box.hidden = false; } ntDefault(); });
    ntc.addEventListener("change", function () { box.hidden = !ntc.checked; ntDefault(); });
  }
  function rtResetSheet() {
    var hasKey = !!rtKey();
    var body = '<p class="rts-p">폰에서 고친 루틴(' + esc(rtAt(RT_REC)) + ')을 지우고, 처음 올린 루틴(' + esc(RT_ORIG ? RT_ORIG.version : "없음") + ')으로 돌아가요. 지운 내용은 시트 "루틴기록" 탭에 남아 있어요.</p>' +
      '<label id="sKeyWrap"' + (hasKey ? ' hidden' : '') + '>선생님 열쇠<input id="sKey" type="password" autocomplete="off"></label>';
    rtSheet("처음 루틴으로 되돌릴까요?", body, function (sh) {
      var key = fv(sh, "sKey") || rtKey();
      if (!key) { sh.querySelector("#sKeyWrap").hidden = false; return "선생님 열쇠를 넣어 주세요"; }
      var ok = sh.querySelector("[data-ok]"); ok.disabled = true; ok.textContent = "되돌리는 중…";
      rtPost({ a: "routine_reset", key: key }).then(function (j) {
        if (!j || !j.ok) { ok.disabled = false; ok.textContent = "되돌리기"; rtErr(j, sh); return; }
        try { localStorage.setItem("ptkey", key); localStorage.removeItem(RT_LS); } catch (x) {}
        RT_EDIT = null; rtUse(null);
        sh.close(); rerender();
        attToast("처음 루틴으로 돌아갔어요");
      }).catch(function () { ok.disabled = false; ok.textContent = "되돌리기"; sh.msg(rtNetMsg()); });
      return true;
    }, "되돌리기");
  }

  /* 버튼 */
  var rtDelTimer = null;
  function setupRtEdit() {
    if (!CAN_EDIT || view.getAttribute("data-rtbound")) return;
    view.setAttribute("data-rtbound", "1");
    document.addEventListener("click", function (e) {
      var b = e.target.closest("[data-rt]");
      if (!b || b.disabled || b.closest(".rtsheet")) return;
      var act = b.getAttribute("data-rt"), i = +b.getAttribute("data-i"), dk = view.getAttribute("data-day");
      var d = dk && dayByKey(dk);
      if (act === "start" || act === "create") {
        if (act === "create") M.routine = rtNewRoutine();
        RT_EDIT = { saved: act === "create" ? null : clone(M.routine), dirty: act === "create" ? 1 : 0 };
        if (act === "create") { location.hash = "#routine-mon"; }
        rerender(); return;
      }
      if (act === "cancel") {
        if (RT_EDIT.dirty && !b.classList.contains("sure")) {
          b.classList.add("sure"); b.textContent = "버릴까요?";
          clearTimeout(rtDelTimer); rtDelTimer = setTimeout(function () { b.classList.remove("sure"); b.textContent = "취소"; }, 2500);
          return;
        }
        M.routine = RT_EDIT.saved; RT_EDIT = null; rerender(); return;
      }
      if (act === "save") { rtSaveSheet(); return; }
      if (act === "copy") { rtCopySheet(); return; }
      if (act === "createcopy") { RT_EDIT = { saved: null, dirty: 0 }; M.routine = rtNewRoutine(); location.hash = ROT ? "#routine" : "#routine-mon"; rerender(); rtCopySheet(); return; }
      if (act === "reset") { rtResetSheet(); return; }
      if (act === "info") { rtInfoSheet(); return; }
      if (act === "week") { rtWeekSheet(); return; }
      if (!d) return;
      if (act === "day") { rtDaySheet(dk); return; }
      if (act === "work") { rtMakeWorkDay(dk); return; }
      if (act === "add") { rtPicker(dayName(dk) + " · 종목 고르기", function (e) { rtItemSheet(dk, -1, e); }, true); return; }
      if (act === "item") { rtItemSheet(dk, i); return; }
      if (act === "more") { rtMoreSheet(dk, i); return; }
      if (act === "up" || act === "down") {
        var j = act === "up" ? i - 1 : i + 1, t = d.items[i]; d.items[i] = d.items[j]; d.items[j] = t; rtDirty(); return;
      }
      if (act === "del") {
        if (!b.classList.contains("sure")) {
          b.classList.add("sure"); b.textContent = "한 번 더";
          clearTimeout(rtDelTimer); rtDelTimer = setTimeout(function () { b.classList.remove("sure"); b.textContent = "삭제"; }, 2500);
          return;
        }
        d.items.splice(i, 1); rtDirty();
      }
    });
    document.addEventListener("click", function (e) {   /* 고치는 중 카드 빈 곳을 누르면 고치기 창 */
      if (!RT_EDIT || rtDragEnd > Date.now() - 400) return;
      var c = e.target.closest(".ex.rtdr");
      if (!c || e.target.closest("button, a")) return;
      rtItemSheet(view.getAttribute("data-day"), +c.getAttribute("data-di"));
    });
    document.addEventListener("click", function (e) { if (rtDragEnd > Date.now() - 400 && e.target.closest(".rtdr, .rtdk")) { e.preventDefault(); e.stopPropagation(); } }, true);
    document.addEventListener("contextmenu", function (e) { if (RT_EDIT && e.target.closest(".rtdr, .rtdk")) e.preventDefault(); });
    document.addEventListener("dragstart", function (e) { if (RT_EDIT && e.target.closest && e.target.closest(".rtdr, .rtdk")) e.preventDefault(); });
    document.addEventListener("touchmove", function (e) { if (RT_DRAG) e.preventDefault(); }, { passive: false });
    document.addEventListener("pointerdown", rtDragDown);
    window.addEventListener("beforeunload", function (e) { if (RT_EDIT && RT_EDIT.dirty) { e.preventDefault(); e.returnValue = ""; } });
  }

  /* ---------------- 칸 접기·펼치기 (2026-11-11 "회원 PT노트도 숨기기 펼치기 — 목표 그래프만 빼고")
     제목 줄(.head)이 있는 칸마다 오른쪽 ⌄ 버튼(제목 눌러도 됨). 접은 상태는 그 폰에 기억(ptnote:<주소>:fold, 탭+칸 이름).
     여정 그래프(.jpanel)가 든 칸은 빼고, 주소로 바로 찾아온 칸(#muscle·#goal-badges·요일)은 접혀 있어도 그 순간엔 펼침 */
  var FOLD_LS = "ptnote:" + SLUG + ":fold";
  function foldGet() { try { return JSON.parse(localStorage.getItem(FOLD_LS) || "{}") || {}; } catch (e) { return {}; } }
  function foldAnim(sec, body, f) {   /* 2026-11-16 장동욱 "토글 열고 닫을 때 애니메이션" — 칸 높이가 스르륵 접히고 펼쳐짐(.fbody 높이·투명도만, .view엔 효과 없음) */
    if (body._fa) { try { body._fa.cancel(); } catch (e) {} body._fa = null; }
    body.style.overflow = ""; body.style.display = "";
    var was = sec.classList.contains("folded");
    var rm = window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (rm || !body.animate || was === f) { sec.classList.toggle("folded", f); return; }
    var h;
    if (f) { h = body.offsetHeight; sec.classList.add("folded"); body.style.display = "flex"; }
    else { sec.classList.remove("folded"); h = body.offsetHeight; }
    if (!h) { body.style.display = ""; return; }
    body.style.overflow = "hidden";
    var a = body.animate(f ? [{ height: h + "px", opacity: 1 }, { height: "0px", opacity: 0 }] : [{ height: "0px", opacity: 0 }, { height: h + "px", opacity: 1 }],
      { duration: Math.max(220, Math.min(380, 180 + h * 0.25)), easing: "cubic-bezier(.3,.7,.2,1)" });
    body._fa = a;
    a.onfinish = function () { if (body._fa === a) { body._fa = null; body.style.overflow = ""; body.style.display = ""; } };
  }
  function setupFold(tab, openId) {
    var F = foldGet();
    Array.prototype.forEach.call(view.querySelectorAll("section"), function (sec) {
      var head = sec.firstElementChild;
      if (!head || !head.classList.contains("head") || sec.querySelector(".jpanel") || head.querySelector(".fold-btn")) return;
      var h2 = head.querySelector("h2");
      var k = tab + ":" + (sec.id || (h2 ? h2.textContent : "")).replace(/\s+/g, " ").trim();
      var body = document.createElement("div");
      body.className = "fbody";
      while (head.nextSibling) body.appendChild(head.nextSibling);
      sec.appendChild(body);
      sec.setAttribute("data-fold", "");
      var btn = document.createElement("button");
      btn.type = "button"; btn.className = "fold-btn";
      btn.innerHTML = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.6" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="m6 9 6 6 6-6"/></svg>';
      head.appendChild(btn);
      function set(f, save) {
        if (save) foldAnim(sec, body, f); else sec.classList.toggle("folded", f);
        btn.setAttribute("aria-expanded", String(!f));
        btn.setAttribute("aria-label", (h2 ? h2.textContent : "칸") + (f ? " 펼치기" : " 접기"));
        if (save) { var G = foldGet(); if (f) G[k] = 1; else delete G[k]; try { localStorage.setItem(FOLD_LS, JSON.stringify(G)); } catch (e) {} }
      }
      set(!!F[k] && !(openId && sec.id === openId), false);
      function tg(e) { if (e.target.closest("a")) return; set(!sec.classList.contains("folded"), true); }
      btn.addEventListener("click", tg);
      if (h2) { h2.style.cursor = "pointer"; h2.addEventListener("click", tg); }
    });
  }

  /* ---------------- 라우터 */
  var TAB_OF = { home: "home", forms: "forms", form: "forms", routine: "routine", diet: "diet", notice: "notice" };
  /* 뒤로 가기 (2026-11-12 장동욱 "태블릿·PC에서 종목 보다가 자세 복습지 누르면 뒤로가기가 없어서 다시 루틴 들어가야 함")
     본문 속 링크(루틴 → 복습지, 홈 → 루틴 요일, 리포트·배지 등)로 넘어가면 화면 위에 "‹ 뒤로 · 루틴" 버튼이 붙어 다님.
     누르면 직전 화면 + 보던 위치(스크롤)로 돌아감. 아래 탭·위 막대·나 탭 전환 칸을 누르면 새 출발이라 기록을 비움. */
  var NAVS = [], NAV_BACK = null, ZOOM = null, SOFT = 0, LINKAT = 0, SCR = {}, VCACHE = {}, TABRET = null;
  /* 화면마다 보던 스크롤 위치 기억 — 뒤로 오면 그 자리 그대로.
     history.scrollRestoration = "manual"은 쓰지 않음: 아이폰에서 밀어서 뒤로 갈 때 이전 화면 그림 대신 백지가 보였음(2026-11-12) */
  window.addEventListener("scroll", function () { if (route.lastH && Date.now() - (route.at || 0) > 400) SCR[route.lastH] = window.scrollY; }, { passive: true });
  function zoomRun(view) {   /* 화면(view) 중 지금 보이는 부분을 누른 칸 크기·자리에서 시작해 화면 가득 커지게 */
    var z = ZOOM; ZOOM = null;
    /* 2026-11-12 원래 B안(줄였다 키우기)으로 복구 — 시작 칸이 화면 밖에 걸쳐 있으면(옆으로 넘기는 아이콘) 화면 안으로 당겨서 시작 */
    if (z) { var cw = document.documentElement.clientWidth; z = { l: Math.max(0, Math.min(z.l, cw - z.w)), t: z.t, w: Math.min(z.w, cw), h: z.h, at: z.at }; }
    if (!z || Date.now() - z.at > 1500 || !view.animate) return false;
    try { if (window.matchMedia && matchMedia("(prefers-reduced-motion: reduce)").matches) return false; } catch (e) {}
    var W = window.innerWidth, H = window.innerHeight, vr = view.getBoundingClientRect();
    var ox = -vr.left, oy = -vr.top;
    var clip0 = "inset(" + Math.max(0, oy) + "px " + Math.max(0, vr.width - (W - vr.left)) + "px " + Math.max(0, vr.height - (H - vr.top)) + "px " + Math.max(0, ox) + "px round ";
    view.style.transformOrigin = ox + "px " + oy + "px";
    var an = view.animate([
      { transform: "translate(" + z.l + "px," + z.t + "px) scale(" + (z.w / W).toFixed(4) + "," + (z.h / H).toFixed(4) + ")", clipPath: clip0 + "60px)", opacity: 0.35 },
      { opacity: 1, offset: 0.45 },
      { transform: "none", clipPath: clip0 + "0px)", opacity: 1 }
    ], { duration: 460, easing: "cubic-bezier(.2,.85,.25,1)" });
    an.onfinish = an.oncancel = function () { view.style.transformOrigin = ""; };
    /* 2026-11-13 "복습지 종목 들어갔다 나오면 또 짤림": 아이폰에서 이 움직임이 끝나지 않고 중간(작게 줄어든 상태)에 멈춰
       화면 본문만 왼쪽에 작게 남는 일이 있었음 → 0.6초 뒤엔 무조건 끝내기 */
    setTimeout(function () { try { if (an.playState !== "finished") an.cancel(); } catch (e) {} view.style.transformOrigin = ""; }, 620);
    return true;
  }
  /* ---- 앱으로 설치 안내 (#app, 2026-11-12 장동욱 "회원들이 아이폰·갤럭시에서 주소를 어플화할 수 있게 튜토리얼") ----
     기기·브라우저를 알아서 골라 그림으로 단계 안내. 카톡 안에서 열었으면 먼저 사파리/크롬으로 열기. 안드로이드 크롬은 '앱 설치' 버튼 한 번(beforeinstallprompt). */
  var INST_EVT = null, INST_X = "ptnote:" + SLUG + ":instx";
  window.addEventListener("beforeinstallprompt", function (e) {
    e.preventDefault(); INST_EVT = e;
    var b = document.getElementById("instGo"); if (b) b.hidden = false;
  });
  window.addEventListener("appinstalled", function () { INST_EVT = null; try { localStorage.setItem(INST_X, "1"); } catch (e) {} });
  function instEnv() {
    var ua = navigator.userAgent || "";
    var ios = /iPhone|iPad|iPod/.test(ua) || (navigator.platform === "MacIntel" && navigator.maxTouchPoints > 1);
    var and = /Android/i.test(ua);
    var kakao = /KAKAOTALK/i.test(ua);
    var inapp = kakao || /NAVER\(inapp|Instagram|FBAN|FBAV|Line\/|DaumApps|everytimeApp/i.test(ua);
    var sam = /SamsungBrowser/i.test(ua);
    var standalone = !!((window.matchMedia && matchMedia("(display-mode: standalone)").matches) || navigator.standalone === true);
    return { ios: ios, and: and, kakao: kakao, inapp: inapp, sam: sam, standalone: standalone, mobile: ios || and };
  }
  function instIcon() { return BASE + "icon-" + (THEME === "F" ? "f" : "m") + "-192.png"; }
  var IN_SV = {
    share: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 3v12"/><path d="m7 8 5-5 5 5"/><path d="M6 11H5a1 1 0 0 0-1 1v8a1 1 0 0 0 1 1h14a1 1 0 0 0 1-1v-8a1 1 0 0 0-1-1h-1"/></svg>',
    plus: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><rect x="3.5" y="3.5" width="17" height="17" rx="4"/><path d="M12 8v8M8 12h8"/></svg>',
    dots: '<svg viewBox="0 0 24 24" fill="currentColor"><circle cx="12" cy="5" r="2"/><circle cx="12" cy="12" r="2"/><circle cx="12" cy="19" r="2"/></svg>',
    hdots: '<svg viewBox="0 0 24 24" fill="currentColor"><circle cx="5" cy="12" r="2"/><circle cx="12" cy="12" r="2"/><circle cx="19" cy="12" r="2"/></svg>',
    menu: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round"><path d="M4 7h16M4 12h16M4 17h16"/></svg>',
    home: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 11 12 4l9 7"/><path d="M5 10v10h14V10"/></svg>',
    ext: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="9"/><path d="m15 9-2 4-4 2 2-4z"/></svg>'
  };
  /* 작은 폰 화면 그림: where = "bot"(아래 막대) / "top"(위 막대) / "sheet"(메뉴 목록) / "dlg"(확인 창) / "home"(홈 화면) */
  function instMock(kind, o) {
    var h = '<div class="imk k-' + kind + '" aria-hidden="true"><div class="imk-scr">';
    if (kind === "bot") h += '<div class="imk-page"><i></i><i></i><i class="s"></i></div><div class="imk-bar">' + o.items.map(function (x) { return '<span' + (x.on ? ' class="on"' : '') + '>' + x.ic + '</span>'; }).join("") + '</div>';
    else if (kind === "top") h += '<div class="imk-bar t"><span class="url">gymtos-dodang.github.io</span>' + o.items.map(function (x) { return '<span' + (x.on ? ' class="on"' : '') + '>' + x.ic + '</span>'; }).join("") + '</div><div class="imk-page"><i></i><i></i><i class="s"></i></div>';
    else if (kind === "sheet") h += '<div class="imk-page dim"><i></i><i></i></div><div class="imk-list' + (o.top ? ' t' : '') + '">' + o.rows.map(function (r) { return '<div' + (r.on ? ' class="on"' : '') + '><b>' + esc(r.t) + '</b>' + (r.ic || '') + '</div>'; }).join("") + '</div>';
    else if (kind === "dlg") h += '<div class="imk-page dim"><i></i><i></i></div><div class="imk-dlg"><div class="dt">' + esc(o.title) + '</div><div class="dr"><img src="' + instIcon() + '" alt=""><span>PT노트</span></div><div class="db">' + (o.cancel ? '<em>' + esc(o.cancel) + '</em>' : '') + '<em class="on">' + esc(o.ok) + '</em></div></div>';
    else if (kind === "home") h += '<div class="imk-home"><i></i><i></i><i></i><span class="on"><img src="' + instIcon() + '" alt=""><b>PT노트</b></span><i></i><i></i><i></i><i></i></div>';
    return h + '</div></div>';
  }
  function instStep(n, title, desc, mock) {
    return '<li class="ist"><div class="ist-t"><span class="ist-n">' + n + '</span><div><b>' + title + '</b><p>' + desc + '</p></div></div>' + mock + '</li>';
  }
  var INST_GUIDES = {
    ios: function () {
      return instStep(1, '아래 <u>공유 버튼</u> 누르기', '사파리 아래 막대의 네모에 화살표(' + '<i class="iic">' + IN_SV.share + '</i>) 버튼이에요. 안 보이면 <b>···</b> 를 먼저 누르면 나와요.',
          instMock("bot", { items: [{ ic: '‹' }, { ic: '›' }, { ic: IN_SV.share, on: 1 }, { ic: '□' }, { ic: IN_SV.hdots }] })) +
        instStep(2, '<u>홈 화면에 추가</u> 누르기', '메뉴를 위로 조금 올리면 있어요.',
          instMock("sheet", { rows: [{ t: "복사" }, { t: "즐겨찾기에 추가" }, { t: "홈 화면에 추가", ic: '<i class="iic">' + IN_SV.plus + '</i>', on: 1 }, { t: "페이지에서 찾기" }] })) +
        instStep(3, '오른쪽 위 <u>추가</u> 누르기', '"웹 앱으로 열기"가 보이면 켜 둔 그대로 두세요.',
          instMock("dlg", { title: "홈 화면에 추가", cancel: "취소", ok: "추가" })) +
        instStep(4, '홈 화면의 <u>PT노트</u> 아이콘으로 열기', '이제 주소창 없이 앱처럼 열려요. 출석 도장도 여기서 꾹!', instMock("home", {}));
    },
    chrome: function () {
      return instStep(1, '오른쪽 위 <u>⋮</u> 누르기', '크롬 주소창 오른쪽 점 세 개 버튼이에요.',
          instMock("top", { items: [{ ic: '⌂' }, { ic: IN_SV.dots, on: 1 }] })) +
        instStep(2, '<u>홈 화면에 추가</u> (또는 앱 설치) 누르기', '메뉴를 조금 내리면 있어요.',
          instMock("sheet", { top: 1, rows: [{ t: "새 탭" }, { t: "북마크" }, { t: "홈 화면에 추가", ic: '<i class="iic">' + IN_SV.home + '</i>', on: 1 }, { t: "설정" }] })) +
        instStep(3, '<u>설치</u> (또는 추가) 누르기', '', instMock("dlg", { title: "앱 설치", cancel: "취소", ok: "설치" })) +
        instStep(4, '홈 화면의 <u>PT노트</u> 아이콘으로 열기', '이제 주소창 없이 앱처럼 열려요. 출석 도장도 여기서 꾹!', instMock("home", {}));
    },
    samsung: function () {
      return instStep(1, '오른쪽 아래 <u>≡ 메뉴</u> 누르기', '삼성 인터넷 아래 막대 맨 오른쪽이에요.',
          instMock("bot", { items: [{ ic: '‹' }, { ic: '›' }, { ic: '⌂' }, { ic: '☆' }, { ic: IN_SV.menu, on: 1 }] })) +
        instStep(2, '<u>현재 페이지 추가</u> 누르기', '(버전에 따라 "페이지 추가"로 보여요)',
          instMock("sheet", { rows: [{ t: "북마크" }, { t: "현재 페이지 추가", ic: '<i class="iic">' + IN_SV.plus + '</i>', on: 1 }, { t: "방문 기록" }, { t: "설정" }] })) +
        instStep(3, '<u>홈 화면</u> 고르고 <u>추가</u>', '', instMock("dlg", { title: "홈 화면에 추가", cancel: "취소", ok: "추가" })) +
        instStep(4, '홈 화면의 <u>PT노트</u> 아이콘으로 열기', '이제 주소창 없이 앱처럼 열려요. 출석 도장도 여기서 꾹!', instMock("home", {}));
    }
  };
  function instUrl() { return location.origin + location.pathname; }
  function renderInstall() {
    var E = instEnv(), pick = E.ios ? "ios" : (E.sam ? "samsung" : "chrome");
    var h = '<div class="ins-hero"><img src="' + instIcon() + '" alt=""><div><small>PT노트 앱으로 쓰기</small><h1>홈 화면에 PT노트 만들기</h1><p>한 번만 해 두면 카톡에서 링크 찾을 필요 없이<br>아이콘 하나로 바로 열려요. 1분이면 돼요.</p></div></div>';
    if (E.standalone) {
      h += '<section><div class="ins-done"><b>✓ 이미 앱으로 쓰고 있어요</b><p>지금 홈 화면 PT노트 아이콘으로 열었어요. 이대로 쓰시면 돼요!</p></div></section>';
      return h + remember();
    }
    if (E.inapp) {
      var ext = E.kakao ? "kakaotalk://web/openExternal?url=" + encodeURIComponent(instUrl()) :
        (E.and ? "intent://" + location.host + location.pathname + "#Intent;scheme=https;package=com.android.chrome;end" : "");
      h += '<section class="ins-warn">' + head("", "먼저 " + (E.ios ? "사파리" : "크롬") + "로 열어 주세요", (E.kakao ? "카톡" : "앱") + " 안에서는 홈 화면에 추가가 안 돼요") +
        (ext ? '<a class="btn fill ins-ext" href="' + esc(ext) + '">' + IN_SV.ext + (E.ios ? '사파리로 열기' : '크롬으로 열기') + '</a>' : '') +
        '<p class="ins-alt">버튼이 안 되면: ' + (E.ios ? '오른쪽 아래 <b>···</b> 또는 공유 버튼 → <b>Safari로 열기</b>' : '오른쪽 위 <b>⋮</b> → <b>다른 브라우저로 열기</b>') + '</p>' +
        '<p class="ins-alt">그래도 안 되면 주소를 복사해서 ' + (E.ios ? '사파리' : '크롬') + ' 주소창에 붙여 넣어요.</p>' +
        '<button type="button" class="btn ins-copy" id="instCopy">주소 복사하기</button></section>';
    }
    h += '<section>' + head("", "따라 하기", "내 폰에 맞는 걸 골라요") +
      '<div class="ins-seg" role="tablist">' + [["ios", "아이폰"], ["chrome", "갤럭시 · 크롬"], ["samsung", "삼성 인터넷"]].map(function (t) {
        return '<button type="button" role="tab" data-g="' + t[0] + '" aria-selected="' + (t[0] === pick) + '">' + t[1] + '</button>';
      }).join("") + '</div>' +
      (E.and && !E.inapp ? '<button type="button" class="btn fill ins-go" id="instGo"' + (INST_EVT ? '' : ' hidden') + '>' + IN_SV.plus + '한 번에 앱 설치하기</button>' : '') +
      '<ol class="ins-steps" id="instSteps">' + INST_GUIDES[pick]() + '</ol>' +
      (E.ios ? '<p class="ins-alt">아이폰은 <b>사파리</b>에서 하는 게 제일 확실해요. 크롬에서도 공유 버튼 → 홈 화면에 추가가 돼요.</p>' : '') +
      '</section>';
    h += '<section>' + head("", "알아 두면 좋아요") + '<ul class="ins-tip">' +
      '<li>아이콘으로 열어도 <b>출석·루틴·복습지</b>는 그대로예요.</li>' +
      '<li>선생님이 루틴·복습지를 올리면 <b>열 때마다 자동으로 최신</b>이 돼요. 따로 업데이트할 필요 없어요.</li>' +
      '<li>아이콘을 지워도 기록은 안 사라져요. 다시 추가하면 돼요.</li></ul>' +
      '<button type="button" class="btn ins-copy" id="instCopy2">내 PT노트 주소 복사</button></section>';
    return h + remember();
  }
  function setupInstall() {
    var seg = view.querySelector(".ins-seg"), box = document.getElementById("instSteps");
    if (seg && box) seg.addEventListener("click", function (e) {
      var b = e.target.closest("button[data-g]"); if (!b) return;
      Array.prototype.forEach.call(seg.children, function (x) { x.setAttribute("aria-selected", x === b ? "true" : "false"); });
      box.innerHTML = INST_GUIDES[b.getAttribute("data-g")]();
    });
    var go = document.getElementById("instGo");
    if (go) go.addEventListener("click", function () {
      if (!INST_EVT) return;
      INST_EVT.prompt();
      (INST_EVT.userChoice || Promise.resolve({})).then(function (c) { if (c && c.outcome === "accepted") { go.hidden = true; attToast("PT노트 앱이 설치됐어요!"); } });
      INST_EVT = null;
    });
    ["instCopy", "instCopy2"].forEach(function (id) {
      var b = document.getElementById(id); if (!b) return;
      b.addEventListener("click", function () {
        var u = instUrl();
        function ok() { attToast("주소를 복사했어요"); }
        if (navigator.clipboard && navigator.clipboard.writeText) navigator.clipboard.writeText(u).then(ok, function () { window.prompt("주소를 길게 눌러 복사하세요", u); });
        else window.prompt("주소를 길게 눌러 복사하세요", u);
      });
    });
  }
  function instHomeCard() {   /* 홈: 아직 앱으로 안 쓰는 회원 폰에만 (닫으면 안 뜸) */
    var E = instEnv();
    if (E.standalone || !E.mobile || DEMO || COACH_MODE) return "";
    try { if (localStorage.getItem(INST_X)) return ""; } catch (e) {}
    return '<div class="ins-card"><a href="#app"><img src="' + instIcon() + '" alt=""><span><b>홈 화면에 PT노트 앱 만들기</b><em>아이콘 하나로 바로 열려요 · 1분</em></span><i aria-hidden="true">›</i></a>' +
      '<button type="button" class="ins-x" aria-label="닫기" onclick="try{localStorage.setItem(\'' + INST_X + '\',\'1\')}catch(e){};this.parentNode.remove()">×</button></div>';
  }
  function instLink() {   /* 나 탭 */
    if (instEnv().standalone || DEMO) return "";
    return '<a class="rp-home ins-link" href="#app"><span class="rh-ic" aria-hidden="true">' + IN_SV.plus + '</span><span class="rh-t"><small>APP</small><b>PT노트를 앱처럼 쓰기</b><em>홈 화면에 아이콘 추가하는 법</em></span><span class="rh-go" aria-hidden="true">›</span></a>';
  }
  function navName(h) {
    h = String(h || "").replace(/^#/, "") || "home";
    if (/^routine/.test(h)) return "루틴"; if (/^form-/.test(h)) return "자세 복습지"; if (h === "forms") return "복습지";
    if (h === "diet" || h === "diet-log" || h === "diet-guide" || h === "diet-supp") return "식단"; if (/^goal/.test(h)) return "목표"; if (h === "body") return "몸변화"; if (h === "notice") return "공지";
    if (/^report/.test(h)) return "리포트"; if (h === "growth") return "성장 기록"; if (h === "app") return "앱으로 쓰기"; if (h === "muscle") return "근육 지도"; return "홈";
  }
  document.addEventListener("touchstart", function () {}, { passive: true });   /* 아이폰에서 :active(살짝 눌림)가 먹게 */
  document.addEventListener("click", function (e) {
    var a = e.target.closest && e.target.closest('a[href^="#"]'); if (!a) return;
    LINKAT = Date.now();
    var to = a.getAttribute("href"), cur = location.hash || "#home";
    if (to === "#" || to === cur) return;
    if (a.closest(".tabs") || a.closest(".bar") || a.closest(".meseg")) {
      /* 2026-11-18 "홈으로 돌아갈 때 새로고침": 아래 탭으로 아까 본 화면(3분 안)에 가면 다시 그리지 않고 떼어 둔 화면을 그대로 붙임 */
      TABRET = a.closest(".tabs") && VCACHE[to] ? to : null;
      NAVS = []; return;
    }
    /* 루틴 안에서 요일 바꾸기(일주일 한눈에 칸·로테이션 고르기)는 뒤로 버튼·커지는 효과 없이 그날 칸만 은은하게 (2026-11-12 "요일별 눌러서 들어가는 칸은 별로 — 은은하게") */
    if (/^#routine/.test(cur) && /^#routine/.test(to)) { SOFT = Date.now(); return; }
    NAVS.push({ h: cur, y: window.scrollY });
    /* B안 (2026-11-12 "아이콘이 퍼지며 화면 들어가기 — B안으로"): 누른 칸 자리에서 다음 화면이 커지며 열림 → 그 칸 위치를 기억 */
    var zEl = a.closest(".th-tile, .card-link, .hw, .ex, .thero, .stamp, .ibstrip, .rp-home") || ((a.offsetHeight < 56) && a.closest(".panel, section")) || a;
    var zr = zEl.getBoundingClientRect();
    /* 커지며 열리기(B안) — 2026-11-12 다시 켬: transform 없이 clip-path만 써서 화면 폭에 영향 없음 */
    /* 2026-11-14 끔: 아이폰에서 다음 화면이 작게·왼쪽으로 쏠린 채 시작해 커지는 게 "화면 쏠림"으로 보임 → 다른 화면처럼 차례로 올라오기(D안)만 */
    tapWave(e.clientX || zr.left + zr.width / 2, e.clientY || zr.top + zr.height / 2);
    if (NAVS.length > 20) NAVS.shift();
  }, true);
  function tapWave(x, y) {   /* 2026-11-18 누른 자리에서 색 원이 퍼져 화면을 덮었다가 사라짐 — 본문(.view)은 건드리지 않고 body에 따로 붙인 막만 움직임(B안 쏠림·멈춤 사고 피함) */
    try { if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return; } catch (er) {}
    var W = window.innerWidth, H = window.innerHeight, R = Math.ceil(Math.sqrt(Math.pow(Math.max(x, W - x), 2) + Math.pow(Math.max(y, H - y), 2)));
    var w = document.createElement("div"); w.className = "tapwave"; w.setAttribute("aria-hidden", "true");
    w.innerHTML = '<i style="left:' + Math.round(x - R) + 'px;top:' + Math.round(y - R) + 'px;width:' + 2 * R + 'px;height:' + 2 * R + 'px"></i>';
    document.body.appendChild(w);
    setTimeout(function () { if (w.parentNode) w.parentNode.removeChild(w); }, 700);
  }
  function navBackDraw(view) {
    if (!NAVS.length) return;
    var top = NAVS[NAVS.length - 1], bar = document.querySelector(".bar");
    view.insertAdjacentHTML("afterbegin", '<button type="button" class="navback" id="navBack" aria-label="' + navName(top.h) + '(으)로 돌아가기"><span aria-hidden="true">‹</span> 뒤로 <b>· ' + navName(top.h) + '</b></button>');
    var nb = document.getElementById("navBack");
    if (bar) nb.style.top = (Math.round(bar.getBoundingClientRect().height) + 8) + "px";
    nb.addEventListener("click", function () {
      var want = NAVS[NAVS.length - 1].h, was = location.hash;
      history.back();
      setTimeout(function () { if (location.hash === was) location.hash = want; }, 350);
    });
  }
  function tabInd() {   /* 아래 탭 밑 빨간 막대 — 고른 탭으로 미끄러져 감 (D안) */
    var tin = document.querySelector(".tabs-in"); if (!tin) return;
    var bar = tin.querySelector(".tind"); if (!bar) { bar = document.createElement("i"); bar.className = "tind"; bar.setAttribute("aria-hidden", "true"); tin.appendChild(bar); }
    var a = tin.querySelector('a[aria-current="page"]');
    if (!a) { bar.style.opacity = "0"; return; }
    bar.style.opacity = "1"; bar.style.transform = "translateX(" + Math.round(a.offsetLeft + a.offsetWidth / 2 - 11) + "px)";
  }
  window.addEventListener("resize", function () { tabInd(); });
  /* ---------------- 처음 쓰는 회원 둘러보기(튜토리얼) (2026-11-13 장동욱 "처음 들어가면 튜토리얼, 다시 필요하면 옵션 칸에서")
     처음 연 폰에서 홈 화면일 때 한 번 — 실제 화면의 그 자리를 동그랗게 비춰 주며 차례로 설명. 끝나면 기억(ptnote:<주소>:tour).
     '나' 탭 맨 아래 "설정" 칸의 "앱 사용법 다시 보기"로 언제든 다시. 선생님 보기·안내서 데모·아이패드 칸 안에선 저절로 안 뜸. */
  var TOUR_K = "ptnote:" + SLUG + ":tour", TOUR_ON = false, TOUR_WANT = false;
  try { TOUR_WANT = !localStorage.getItem(TOUR_K) && !COACH_MODE && !DEMO && window.self === window.top; } catch (e) {}
  if (/[?&]tour\b/.test(location.search)) TOUR_WANT = true;
  function tourName() { var n = String(M.name || "").split("·")[0].trim(); return /·/.test(M.name || "") ? M.name.replace(/\s*·\s*/g, "·") : (n.length >= 3 ? n.slice(1) : n); }
  function tourSteps() {
    var E = typeof instEnv === "function" ? instEnv() : { standalone: true, mobile: false };
    var S = [
      { c: 1, t: tourName() + "님, 환영해요! 👋", b: (SITE.trainer || "장동욱") + " 선생님과 함께하는 나만의 PT노트예요.\n어디에 뭐가 있는지 30초만 둘러볼까요?", ok: "둘러보기" },
      { s: "#attBtn", t: "운동 온 날엔 출석 도장 꾹", b: "헬스장에 온 날 여기를 꾹 누르면 출석이 찍혀요.\n출석이 쌓이면 배지와 월간 리포트가 생겨요." },
      { s: ".thero", t: "오늘 할 운동", b: "요일마다 오늘 할 운동이 여기 떠요.\n누르면 세트·무게까지 자세히 볼 수 있어요." },
      { s: '.tabs a[data-tab="routine"]', t: "운동", b: "루틴과 자세 복습지가 한 곳에 있어요.\n한 종목이 끝나면 ✓를 눌러 기록해요." },
      { s: '.tabs a[data-tab="diet"]', t: "식단", b: M.diet ? "선생님이 짜 준 식단이 여기 있어요." : "식단을 받으면 여기서 볼 수 있어요." },
      { s: '.tabs a[data-tab="log"]', t: "기록", b: "✓한 운동 · 첫날 vs 오늘 · 근육 지도 · 인바디가\n여기 쌓여요." },
      { s: '.tabs a[data-tab="me"]', t: "나", b: "출석률 · 배지 · PT 여정을\n한눈에 볼 수 있어요." },
      { s: ".bell", t: "선생님 공지", b: "선생님 소식이 오면 빨간 점이 떠요." },
      { c: 1, t: "준비 끝! 💪", b: "새 루틴이나 복습지가 올라오면 아래 아이콘에 불이 켜져요.\n사용법은 오른쪽 위 ⚙️ 설정에서 언제든 다시 볼 수 있어요.", ok: "시작하기", app: E.mobile && !E.standalone }
    ];
    return S.filter(function (x) { if (!x.s) return true; var el = document.querySelector(x.s); return el && el.getBoundingClientRect().width > 0; });
  }
  function tourStart(S0, opt) {
    if (TOUR_ON || (!S0 && !document.querySelector(".stamp, .thero"))) return;
    TOUR_ON = true; if (!S0) TOUR_WANT = false; else WN_WANT = false;
    opt = opt || {};
    document.querySelectorAll(".npop-wrap").forEach(function (x) { x.remove(); });
    var S = (S0 || tourSteps()).filter(function (x) { return !x.need || x.need(); }), i = 0, dir = 1;   /* need: 이 회원에겐 없는 칸이면 미리 뺌 — 빈 화면을 들렀다 가는 끊김 없게 */
    var w = document.createElement("div"); w.className = "tour"; w.setAttribute("role", "dialog"); w.setAttribute("aria-modal", "true");
    w.innerHTML = '<div class="tour-hole"></div><div class="tour-card"><button type="button" class="tour-skip">건너뛰기</button><div class="tour-dots"></div><b class="tour-t"></b><p class="tour-b"></p><div class="tour-btns"></div></div>';
    document.body.appendChild(w);
    var hole = w.querySelector(".tour-hole"), card = w.querySelector(".tour-card");
    function end() {
      leaveTo(null);
      if (opt.done) opt.done(); else { try { localStorage.setItem(TOUR_K, "1"); } catch (e) {} wnSeenAll(); }   /* 처음 둘러보기를 본 회원은 지금까지의 업데이트 소식은 안 띄움 */
      w.classList.remove("on"); setTimeout(function () { w.remove(); }, 260);
      TOUR_ON = false; setTimeout(function () { if (!DEMO) showNoticePop(); }, 600);
    }
    /* 2026-11-20 "약간 느리고 부드럽지 않아": 구멍은 transform(translate3d)으로 움직여 GPU로 부드럽게, 카드·구멍 같은 시간·같은 곡선(.5s ease-out-quint).
       칸 자리는 '도착할 자리'로 한 번에 계산 — 화면이 차례로 올라오는 중(D안 vIn transform)·스크롤할 거리(dy)까지 빼서, 여러 번 고쳐 잡는 흔들림 없음 */
    function rectOf(el) {
      var r = el.getBoundingClientRect(), dx = 0, dy = 0, a = el;
      while (a && a !== document.body) {
        if (a.getAnimations && a.getAnimations().length) { var t = getComputedStyle(a).transform; if (t && t !== "none") { try { var m = new DOMMatrixReadOnly(t); dx += m.m41; dy += m.m42; } catch (e) {} } }
        a = a.parentElement;
      }
      return { left: r.left - dx, top: r.top - dy, width: r.width, height: r.height, bottom: r.bottom - dy };
    }
    function place(sy, sel) {
      var x = S[i], vw = window.innerWidth, vh = window.innerHeight; sy = sy || 0;
      if (x.c) { hole.style.cssText = "transform:translate3d(" + vw / 2 + "px," + vh / 2 + "px,0);width:0;height:0;border-radius:50%"; card.style.top = Math.max(80, vh / 2 - card.offsetHeight / 2) + "px"; card.classList.add("mid"); return; }
      var el = document.querySelector(sel || x.s); if (!el) return;
      var r = rectOf(el), pad = el.closest(".tabs") ? 4 : 8, rad = getComputedStyle(el).borderRadius, top = r.top - sy;
      hole.style.cssText = "transform:translate3d(" + (r.left - pad) + "px," + (top - pad) + "px,0);width:" + (r.width + pad * 2) + "px;height:" + (r.height + pad * 2) + "px;border-radius:" + (el.closest(".tabs") ? "18px" : (parseFloat(rad) ? (parseFloat(rad) + pad) + "px" : "18px"));
      card.classList.remove("mid");
      var ch = card.offsetHeight, below = top + r.height + pad + 14;
      card.style.top = (below + ch < vh - 12 ? below : Math.max(12, top - pad - 14 - ch)) + "px";
    }
    function goH(x) {   /* 업데이트 소식: 그 단계 화면(x.h)으로 먼저 이동 — x.pre는 전환 칸 고르기 등 */
      var cur = location.hash || "#home"; if (!x.h || (cur === x.h && !x.pre)) return false;
      if (x.pre) x.pre();
      LINKAT = Date.now(); NAVS = []; TABRET = null;
      if (cur === x.h) rerender(); else location.hash = x.h;
      window.scrollTo(0, 0); return true;
    }
    /* 넘어가기: 글자는 누르자마자 새 단계로(살짝 떠오르며 .fx), 다른 화면이면 그 칸이 생기는 즉시 구멍·카드가 도착 자리로 한 번에 미끄러짐 */
    function fill(x) {
      card.querySelector(".tour-dots").innerHTML = S.map(function (_, k) { return '<i' + (k === i ? ' class="on"' : '') + '></i>'; }).join("");
      card.querySelector(".tour-t").textContent = x.t;
      card.querySelector(".tour-b").textContent = x.b;
      var ul0 = card.querySelector(".tour-ul"); if (ul0) ul0.remove();
      if (x.l) { var ul = document.createElement("ul"); ul.className = "tour-ul"; x.l.forEach(function (t) { var li = document.createElement("li"); li.textContent = t; ul.appendChild(li); }); card.querySelector(".tour-b").after(ul); }
      card.querySelector(".tour-skip").hidden = i === S.length - 1;
      card.querySelector(".tour-skip").textContent = opt.skip || "건너뛰기";
      card.querySelector(".tour-btns").innerHTML = (x.app ? '<a class="tb-app" href="#app">📲 홈 화면에 앱으로 추가하기</a>' : '') +
        (i > 0 && !x.c ? '<button type="button" class="tb-prev">이전</button>' : '') +
        '<button type="button" class="tb-next">' + (x.ok || (i === S.length - 2 ? "마지막" : "다음") + ' <small>' + S.slice(0, i + 1).filter(function (q) { return !q.c; }).length + '/' + S.filter(function (q) { return !q.c; }).length + '</small>') + '</button>';
      if (card.classList.contains("on1")) { card.classList.remove("fx"); void card.offsetWidth; card.classList.add("fx"); }
      else { card.classList.add("on1"); card.classList.remove("in"); void card.offsetWidth; card.classList.add("in"); }
    }
    function settle(fn) {
      var t0 = Date.now(), x = S[i];
      (function poll() {
        var el = x.s && document.querySelector(x.s);
        if (!x.s || (el && el.getBoundingClientRect().width) || Date.now() - t0 > 1200) return fn();
        requestAnimationFrame(poll);
      })();
    }
    function position() {
      var x = S[i];
      if (x.s) {
        var el0 = document.querySelector(x.s);
        if (!el0 || !el0.getBoundingClientRect().width) { i += dir; if (i < 0) { i = 0; dir = 1; } if (i >= S.length) return end(); return show(); }
      }
      var sy = 0;
      if (x.s) {
        var el = document.querySelector(x.s);
        if (!el.closest(".tabs, .bar")) {
          var r = rectOf(el);
          if (r.top < 70 || r.bottom > window.innerHeight - 220) { sy = Math.round(Math.min(r.top - 110, document.documentElement.scrollHeight - window.innerHeight - window.scrollY)); window.scrollTo({ top: window.scrollY + sy, behavior: "smooth" }); }
        }
      }
      place(sy);
      var me = i; setTimeout(function () { if (me === i && w.isConnected) place(); }, 800);   /* 끝난 뒤 한 번만 확인(보통 그대로) */
    }
    /* 2026-11-22 장동욱 "클릭해서 새 기능 예시로 하는 법을 보여줘야지": 단계에 tap:"선택자"를 주면 손가락(👆)이 그 칸을 눌러 보여 준 뒤(진짜로 click)
       s 칸을 비춤 · skipIf: 함수 → 참이면 누르지 않음 · leave: 함수 → 그 단계를 떠날 때(다음 단계 leave가 다르면)·끝날 때 정리(열린 창 닫기 등) */
    var lastX = null;
    function leaveTo(x) { if (lastX && lastX.leave && (!x || lastX.leave !== x.leave)) { try { lastX.leave(); } catch (e) {} } lastX = x; }
    function tapDemo(x, cb) {
      var el = document.querySelector(x.tap); if (!el) return cb();
      var r0 = el.getBoundingClientRect();
      if (r0.top < 80 || r0.bottom > window.innerHeight - 240) window.scrollTo({ top: window.scrollY + r0.top - 140 });
      setTimeout(function () {
        if (!w.isConnected) return;
        var r = el.getBoundingClientRect(); place(0, x.tap);
        var f = document.createElement("div"); f.className = "tour-tap"; f.textContent = "👆";
        f.style.left = (r.left + r.width / 2) + "px"; f.style.top = (r.top + r.height / 2) + "px"; w.appendChild(f);
        requestAnimationFrame(function () { f.classList.add("on"); });
        setTimeout(function () { f.classList.add("press"); try { el.click(); } catch (e) {} }, 750);
        setTimeout(function () { f.remove(); cb(); }, 1150);
      }, 60);
    }
    function show() {
      var x = S[i];
      leaveTo(x);
      fill(x);
      function go() {
        if (x.tap && !(x.skipIf && x.skipIf())) { busy = true; tapDemo(x, function () { settle(function () { busy = false; position(); }); }); }
        else if (busy) settle(function () { busy = false; position(); });
        else position();
      }
      if (goH(x)) { busy = true; settle(go); return; }
      go();
    }
    var busy = false;
    w.addEventListener("click", function (e) {
      if (e.target.closest(".tour-skip")) return end();
      if (e.target.closest(".tb-app")) return end();
      if (busy) return;
      if (e.target.closest(".tb-prev")) { i = Math.max(0, i - 1); dir = -1; return show(); }
      if (e.target.closest(".tb-next") || e.target === hole || e.target === w) { if (i >= S.length - 1) return end(); i++; dir = 1; show(); }
    });
    window.addEventListener("resize", function rs() { if (!w.isConnected) return window.removeEventListener("resize", rs); place(); });
    requestAnimationFrame(function () { w.classList.add("on"); show(); });
  }
  function tourMaybe() {   /* route()가 홈을 그린 뒤 */
    if (!TOUR_WANT || TOUR_ON) return;
    var h = location.hash.replace("#", "");
    if (h && h !== "home") return;
    setTimeout(function () { if (TOUR_WANT && (!location.hash || location.hash === "#home")) tourStart(); }, document.body.classList.contains("ready") ? 450 : 1300);
  }
  /* ---------------- 업데이트 소식(새 기능 튜토리얼) (2026-11-20 장동욱 "대규모 업데이트 생기면 회원님들이 접속하면 튜토리얼처럼 새 기능 설명")
     WN 맨 위에 한 덩어리 추가 → 회원 폰이 홈을 열 때 아직 안 본 소식이면 한 번: 소개 카드(무엇이 생겼는지 목록) → 단계마다 그 화면으로 이동해 그 칸을 동그랗게 비춤 → 끝 카드 후 홈으로.
     본 기록은 이 폰 localStorage ptnote:<주소>:wn(마지막으로 본 id). 처음 둘러보기를 본 새 회원은 지금까지 소식은 본 걸로. WN_DAYS일 지난 소식은 저절로 안 뜸.
     ⚙️ 설정 "업데이트 소식 다시 보기"·주소 ?wn 으로 언제든(선생님 폰에서 미리보기도 이걸로). 선생님 폰·안내서 데모·iframe 안에선 저절로 안 뜸.
     단계: { h:"#화면", pre:함수(선택), s:"비출 칸 선택자", t:"제목", b:"설명(\n 줄바꿈)" } — 회원 화면에 그 칸이 없으면(그룹 PT 등) 그 단계는 저절로 건너뜀.
     새 소식 쓰는 법은 스킬 pt-update-tour. 새 탭·칸이면 처음 둘러보기(tourSteps)에도 한 줄 추가. */
  var WN_K = "ptnote:" + SLUG + ":wn", WN_DAYS = 21, WN_WANT = false;
  function wnSeen() { try { return localStorage.getItem(WN_K) || ""; } catch (e) { return ""; } }
  function wnSeenAll() { if (WN[0]) { try { localStorage.setItem(WN_K, WN[0].id); } catch (e) {} } }
  function wnFresh(w) { var d = new Date(String(w.id).slice(0, 10) + "T00:00:00"); return !isNaN(d) && (Date.now() - d) / 864e5 <= WN_DAYS; }
  function wnList() { var seen = wnSeen(); return WN.filter(function (w) { return w.id > seen && wnFresh(w); }).slice(0, 2); }
  try {
    if (!COACH_MODE && !DEMO && window.self === window.top) {
      if (TOUR_WANT) wnSeenAll();   /* 새 회원은 처음 둘러보기만 */
      else WN_WANT = wnList().length > 0;
    }
  } catch (e) {}
  if (/[?&]wn\b/.test(location.search)) WN_WANT = true;
  function wnSteps(L) {
    var items = [], steps = [];
    L.forEach(function (w) { items = items.concat(w.items || []); steps = steps.concat(w.steps || []); });
    return [{ c: 1, h: "#home", t: "새 기능이 생겼어요 🎉", b: tourName() + "님, PT노트가 업데이트됐어요!", l: items, ok: "보러 가기" }]   /* 2026-11-22 "뭐뭐 추가됐다부터 보여줘야지" — 소개 카드는 그대로 */
      .concat(steps)
      .concat([{ c: 1, h: "#home", t: "업데이트 둘러보기 끝! 💪", b: "다시 보고 싶으면 오른쪽 위 ⚙️ 설정이나\n🔔 공지에서 '새 기능 둘러보기'를 누르면 돼요.", ok: "확인" }]);
  }
  function wnStart(force) {   /* force: true = 최신 소식, "날짜 id" = 그 소식(공지의 '새 기능 둘러보기') */
    var L = force === true ? WN.slice(0, 1) : force ? WN.filter(function (w) { return w.id === force; }) : wnList(); if (!L.length || TOUR_ON) return;
    tourStart(wnSteps(L), { skip: "나중에 볼게요", done: function () {
      if (COACH_MODE || DEMO) return;
      if (!force) wnSeenAll(); else { var top = L.reduce(function (a, w) { return w.id > a ? w.id : a; }, wnSeen()); try { localStorage.setItem(WN_K, top); } catch (e) {} }
      WN_WANT = false;
      var ks = (M.notices || []).filter(function (n) { return n.wn && L.some(function (w) { return w.id === n.wn; }); }).map(nKey);
      lsAdd(NSEEN_KEY, ks); lsAdd(NPOP_KEY, ks); nDot();   /* 둘러본 소식은 공지 팝업·빨간 점에서도 뺌 */
    } });
  }
  function wnMaybe() {
    if (!WN_WANT || TOUR_ON || TOUR_WANT) return;
    setTimeout(function () { if (WN_WANT && !TOUR_ON) wnStart(/[?&]wn\b/.test(location.search)); }, document.body.classList.contains("ready") ? 600 : 1500);
  }
  /* 위 막대 ⚙️ 설정 (2026-11-13 "상단 지수 아이콘 옆에 설정 아이콘 — 앱 사용법·홈 화면 앱 추가, 기존 항목 없애고") */
  function gearMenu() {
    var old = document.getElementById("gearMenu"); if (old) { old.remove(); return; }
    var E = typeof instEnv === "function" ? instEnv() : { standalone: true }, g = document.getElementById("gearBtn");
    var m = document.createElement("div"); m.id = "gearMenu"; m.className = "gmenu"; m.setAttribute("role", "menu");
    m.innerHTML = '<a href="#home" role="menuitem" data-tour="1"><span>🧭</span><b>앱 사용법 다시 보기</b></a>' +
      (WN.length ? '<a href="#home" role="menuitem" data-wn="1"><span>🆕</span><b>새 기능 둘러보기</b></a>' : '') +   /* 2026-11-20 "상단 설정 아이콘에도 새 기능 둘러보기" — 최신 업데이트 소식 */
      ((M.pet || PF_VIS) && !DEMO && !TRY ? '<a href="#" role="menuitem" data-petoff="1"><span>' + (petOff() ? '🐾' : '🏠') + '</span><b>' + (petOff() ? '펫 다시 꺼내기' : '펫 집어넣기') + '</b></a>' : '') +   /* 2026-11-20 펫 집어넣기 옵션 */
      '<a href="#app" role="menuitem"><span>📲</span><b>' + (E.standalone ? '홈 화면 앱 설치 안내' : '홈 화면에 앱으로 추가하기') + '</b></a>' +
      '<div class="gm-theme" role="group" aria-label="다크 모드"><span>🌙</span><b>다크 모드</b><i>' +
      [["auto", "자동"], ["dark", "켜기"], ["light", "끄기"]].map(function (o) { return '<button type="button" data-th="' + o[0] + '"' + (themeGet() === o[0] ? ' aria-pressed="true"' : '') + '>' + o[1] + '</button>'; }).join("") + '</i></div>';   /* 2026-11-13 "앱아이콘 설치 옵션 왜 뺐냐" — 앱으로 열었어도 항상 보이게 */
    document.body.appendChild(m);
    var r = g.getBoundingClientRect();
    m.style.top = (r.bottom + 8) + "px"; m.style.right = Math.max(10, window.innerWidth - r.right - 40) + "px";
    requestAnimationFrame(function () { m.classList.add("on"); });
    setTimeout(function () {
      m.addEventListener("click", function (e) {   /* 다크 모드 자동·켜기·끄기 — 메뉴는 열어 둔 채 바로 바뀜 */
        var b = e.target.closest("[data-th]"); if (!b) return;
        try { if (b.getAttribute("data-th") === "auto") localStorage.removeItem(THEME_KEY); else localStorage.setItem(THEME_KEY, b.getAttribute("data-th")); } catch (er) {}
        themeApply();
        Array.prototype.forEach.call(m.querySelectorAll("[data-th]"), function (x) { if (x === b) x.setAttribute("aria-pressed", "true"); else x.removeAttribute("aria-pressed"); });
      });
      document.addEventListener("click", function cl(e) { if (e.target.closest("#gearMenu .gm-theme")) return;
        /* 2026-11-18 장동욱 "설정 아이콘 누르면 켜지고 한 번 더 누르면 꺼지는 토글": 열린 채로 ⚙️를 또 누르면 닫히기만(전엔 닫혔다 바로 다시 열렸음) */
        if (e.target.closest("#gearBtn")) { e.stopPropagation(); e.preventDefault(); m.remove(); document.removeEventListener("click", cl, true); return; }
        if (!e.target.closest("#gearMenu a")) { m.remove(); } else setTimeout(function () { m.remove(); }, 50); document.removeEventListener("click", cl, true); }, true);
    }, 0);
  }
  (function () { var g = document.getElementById("gearBtn"); if (g) g.addEventListener("click", function (e) { e.stopPropagation(); gearMenu(); }); })();
  document.addEventListener("click", function (e) {
    var po = e.target.closest("[data-petoff]");
    if (po) { e.preventDefault(); petOffSet(!petOff()); return; }
    var wa = e.target.closest("[data-wn]");
    if (wa) { e.preventDefault(); if (location.hash && location.hash !== "#home") { LINKAT = Date.now(); location.hash = "#home"; } window.scrollTo(0, 0); var wid = wa.getAttribute("data-wn"); setTimeout(function () { wnStart(wid === "1" ? true : wid); }, 500); return; }
    var a = e.target.closest("[data-tour]"); if (!a) return;
    TOUR_WANT = true;
    if (!location.hash || location.hash === "#home") { e.preventDefault(); window.scrollTo(0, 0); tourMaybe(); }
  });

  function zoomReset() {   /* 화면이 바뀔 때 남아 있는 확대·축소 움직임은 모두 지움 */
    var v = document.getElementById("view"); if (!v) return;
    try { if (v.getAnimations) v.getAnimations().forEach(function (a) { a.cancel(); }); } catch (e) {}
    v.style.transform = ""; v.style.transformOrigin = ""; v.style.clipPath = "";
  }
  document.addEventListener("visibilitychange", function () { if (!document.hidden) zoomReset(); });
  window.addEventListener("pageshow", zoomReset);
  /* 2026-11-24 펌핑이 — 운동 질문 AI. 오른쪽 아래 떠 있는 버튼 → 아래에서 올라오는 대화창.
     창고 POST a=pump {q, h(최근 대화 6개), ctx(회원 루틴 요약)} → {a, left}. 회원 한 명 하루 15개(창고에서 셈). 대화는 폰에 ptnote:<주소>:pump (최근 30개) */
  function pumpFace(mood) {   /* 2026-11-24 표정: base·think·cheer·worry·eat·no·dizzy·surprise·lift — 눈 깜빡임·꼬리 흔들기는 CSS(.pf-*) */
    mood = mood || "base";
    var K = "#1A1A1A", eyes, mouth = "", extra = "", face = "#E1141E";
    var dot = '<ellipse cx="-10" cy="-3" rx="3.5" ry="5" fill="' + K + '"/><ellipse cx="10" cy="-3" rx="3.5" ry="5" fill="' + K + '"/><circle cx="-8.7" cy="-5" r="1.3" fill="#fff"/><circle cx="11.3" cy="-5" r="1.3" fill="#fff"/>';
    var happy = '<path d="M-14 -2 Q-10 -8 -6 -2M6 -2 Q10 -8 14 -2" fill="none" stroke="' + K + '" stroke-width="2.5" stroke-linecap="round"/>';
    var smile = '<path d="M-8 9 Q0 16 8 9" fill="none" stroke="' + K + '" stroke-width="2.5" stroke-linecap="round"/><path d="M3 12 L5 16.5 L7 11" fill="#fff"/>';
    if (mood === "think") { eyes = '<ellipse cx="-7" cy="-6" rx="3" ry="4.5" fill="' + K + '"/><ellipse cx="13" cy="-6" rx="3" ry="4.5" fill="' + K + '"/>'; mouth = '<circle cx="3" cy="11" r="3.5" fill="' + K + '"/>';
      extra = '<g class="pf-dots"><circle cx="30" cy="-36" r="2.5" fill="#9A9A9A"/><circle cx="37" cy="-43" r="3.5" fill="#9A9A9A"/></g>'; }
    else if (mood === "cheer" || mood === "lift") { eyes = happy; mouth = '<path d="M-9 7 Q0 21 9 7 Z" fill="' + K + '"/><path d="M-3 7.5 L-1 11 L1 7.5 Z" fill="#fff"/>';
      extra = '<path class="pf-spark" d="M-40 -44 L-38 -38 L-32 -36 L-38 -34 L-40 -28 L-42 -34 L-48 -36 L-42 -38 Z M44 -48 L45.5 -43 L50 -41.5 L45.5 -40 L44 -35 L42.5 -40 L38 -41.5 L42.5 -43 Z" fill="#FFC531"/>'; }
    else if (mood === "worry") { eyes = dot + '<path d="M-15 -13 L-6 -10 M15 -13 L6 -10" stroke="' + K + '" stroke-width="2.2" stroke-linecap="round"/>'; mouth = '<path d="M-6 13 Q0 8 6 13" fill="none" stroke="' + K + '" stroke-width="2.5" stroke-linecap="round"/>';
      extra = '<path class="pf-sweat" d="M24 -18 Q20 -10 24 -7 Q28 -10 24 -18 Z" fill="#6EC6FF"/>'; }
    else if (mood === "eat") { eyes = happy; mouth = '<ellipse class="pf-chew" cx="0" cy="11" rx="5" ry="3.5" fill="' + K + '"/>'; }
    else if (mood === "no") { eyes = dot; mouth = '<path d="M-6 11 H6" stroke="' + K + '" stroke-width="2.5" stroke-linecap="round"/>'; }
    else if (mood === "dizzy") { face = "#B80D16"; eyes = '<path d="M-14 -7 L-6 1 M-6 -7 L-14 1 M6 -7 L14 1 M14 -7 L6 1" stroke="' + K + '" stroke-width="2.4" stroke-linecap="round"/>'; mouth = '<path d="M-8 12 Q-4 8 0 12 Q4 16 8 12" fill="none" stroke="' + K + '" stroke-width="2.3" stroke-linecap="round"/>'; }
    else if (mood === "surprise") { eyes = '<circle cx="-10" cy="-4" r="5.5" fill="#fff" stroke="' + K + '" stroke-width="2"/><circle cx="10" cy="-4" r="5.5" fill="#fff" stroke="' + K + '" stroke-width="2"/><circle cx="-10" cy="-4" r="2.4" fill="' + K + '"/><circle cx="10" cy="-4" r="2.4" fill="' + K + '"/>'; mouth = '<ellipse cx="0" cy="12" rx="4" ry="5" fill="' + K + '"/>'; }
    else if (mood === "wink") { eyes = '<ellipse cx="-10" cy="-3" rx="3.5" ry="5" fill="' + K + '"/><circle cx="-8.7" cy="-5" r="1.3" fill="#fff"/><path d="M6 -3 Q10 -7 14 -3" fill="none" stroke="' + K + '" stroke-width="2.5" stroke-linecap="round"/>'; mouth = smile;
      extra = '<path class="pf-spark" d="M30 -40 L31.5 -35 L36 -33.5 L31.5 -32 L30 -27 L28.5 -32 L24 -33.5 L28.5 -35 Z" fill="#FFC531"/>'; }
    else if (mood === "love") { eyes = '<path d="M-10 2 C-17 -4 -15 -10 -10 -7 C-5 -10 -3 -4 -10 2 Z M10 2 C3 -4 5 -10 10 -7 C15 -10 17 -4 10 2 Z" fill="' + K + '"/>'; mouth = '<path d="M-8 9 Q0 17 8 9" fill="none" stroke="' + K + '" stroke-width="2.5" stroke-linecap="round"/>';
      extra = '<path class="pf-heart" d="M34 -30 C27 -36 29 -43 34 -40 C39 -43 41 -36 34 -30 Z" fill="#FF6B8A"/>'; }
    else if (mood === "tongue") { eyes = happy; mouth = '<path d="M-8 8 Q0 14 8 8" fill="none" stroke="' + K + '" stroke-width="2.5" stroke-linecap="round"/><path class="pf-tongue" d="M-1 11 Q-1 20 4 20 Q8 20 7 11 Z" fill="#FF8FA8"/>'; }
    else if (mood === "sleepy") { eyes = '<path d="M-14 -3 H-6 M6 -3 H14" stroke="' + K + '" stroke-width="2.5" stroke-linecap="round"/>'; mouth = '<ellipse cx="0" cy="11" rx="3" ry="2.2" fill="' + K + '"/>';
      extra = '<text class="pf-zz" x="26" y="-30" font-size="14" font-weight="800" fill="#9A9A9A">z</text>'; }
    else { eyes = dot; mouth = smile; }
    return '<svg class="pf pf-' + mood + '" viewBox="-58 -54 116 104" aria-hidden="true"><g class="pf-body">' +
      '<g class="pf-tail"><path d="M8 26 Q20 46 34 42" fill="none" stroke="' + K + '" stroke-width="3" stroke-linecap="round"/><path d="M30 36 L42 40 L32 48 Z" fill="' + K + '"/></g>' +
      '<g class="pf-bell"><rect x="-44" y="-6" width="88" height="9" rx="3" fill="#555"/><rect x="-54" y="-30" width="16" height="56" rx="4" fill="' + K + '"/><rect x="38" y="-30" width="16" height="56" rx="4" fill="' + K + '"/>' +
      '<rect x="-54" y="-6" width="16" height="8" fill="#E1141E"/><rect x="38" y="-6" width="16" height="8" fill="#E1141E"/></g>' +
      '<path class="pf-horn" d="M-18 -20 Q-28 -36 -15 -44 Q-15 -31 -7 -25 Z M18 -20 Q28 -36 15 -44 Q15 -31 7 -25 Z" fill="' + K + '"/>' +
      '<circle r="28" fill="' + face + '"/><ellipse cx="-18" cy="6" rx="4.5" ry="2.5" fill="#F7A1A1"/><ellipse cx="18" cy="6" rx="4.5" ry="2.5" fill="#F7A1A1"/>' +
      '<g class="pf-eyes">' + eyes + '</g>' + mouth + extra + '</g></svg>';
  }
  var PUMP_MOODS = { "걱정": "worry", "냠냠": "eat", "덤벨": "lift", "응원": "cheer", "절레": "no", "기본": "base" };
  function pumpGuess(q) {   /* 창고가 표정을 안 보내 줄 때(예전 배포) 질문 글자로 짐작 */
    if (/아프|아파|통증|부상|저림|저려|찌릿|시큰|다쳤|삐끗|디스크/.test(q)) return "worry";
    if (/먹|식단|단백질|탄수|지방|칼로리|다이어트|음식|밥|간식|보충제/.test(q)) return "eat";
    if (/자세|루틴|무게|세트|횟수|스쿼트|데드|벤치|프레스|로우|풀다운|런지|운동/.test(q)) return "lift";
    return "cheer";
  }
  function pumpCtx() {
    var r = M.routine || {}, out = ["이름: " + String(M.name || "").slice(-2) + "님", "성별: " + (M.sex === "F" ? "여" : "남")];
    if (r.title) out.push("루틴: " + r.title);
    if (r.plan && r.plan.length) out.push("방향: " + r.plan.join(" / "));
    if (r.cardio) out.push("유산소: " + (r.cardio.minutes || "") + "분 " + (r.cardio.options || ""));
    (r.days || []).forEach(function (d) {
      out.push((d.day || "") + " " + (d.part || "") + ": " + (d.items || []).map(function (x) { return x.name + (x.tip ? "(" + x.tip + ")" : ""); }).join(", "));
    });
    var wd = "일월화수목금토".charAt(new Date().getDay());
    out.push("오늘: " + wd + "요일");
    return out.join("\n").slice(0, 1500);
  }
  function pumpInit() {
    if (DEMO || document.querySelector(".pump-fab")) return;
    if (!SITE.pump && !/[?&]pump=1/.test(location.search)) return;   /* 창고 배포 전까지 숨김 — 배포 후 site.js에 pump: true (2026-11-24) */
    var LS = "ptnote:" + SLUG + ":pump", log = [];
    try { log = JSON.parse(localStorage.getItem(LS) || "[]") || []; } catch (e) { log = []; }
    function save() { try { localStorage.setItem(LS, JSON.stringify(log.slice(-30))); } catch (e) {} }
    var fab = document.createElement("button");
    fab.className = "pump-fab"; fab.type = "button"; fab.setAttribute("aria-label", "펌핑이에게 운동 질문하기");
    fab.innerHTML = pumpFace();
    document.body.appendChild(fab);
    var wrap = null, busy = false, left = null;
    var EX = ["스쿼트 할 때 무릎이 아파요", "오늘 루틴 순서 알려줘", "단백질은 하루에 얼마나?", "근육통 있을 때 운동해도 돼?"];
    function bubble(r, t) {
      var b = document.createElement("div"); b.className = "pump-msg " + (r === "a" ? "is-a" : "is-q");
      b.textContent = t; return b;
    }
    function draw() {
      var box = wrap.querySelector(".pump-log"); box.innerHTML = "";
      box.appendChild(bubble("a", "안녕하세요 " + String(M.name || "").slice(-2) + "님! 펌핑이예요 💪\n운동 자세, 루틴, 식단 뭐든 물어봐요. 아픈 곳은 꼭 장동욱 쌤께 먼저 말씀해 주세요!"));
      log.forEach(function (x) { box.appendChild(bubble(x.r, x.t)); });
      if (!log.length) {
        var ex = document.createElement("div"); ex.className = "pump-ex";
        EX.forEach(function (q) { var c = document.createElement("button"); c.type = "button"; c.textContent = q; c.onclick = function () { ask(q); }; ex.appendChild(c); });
        box.appendChild(ex);
      }
      box.scrollTop = box.scrollHeight;
      wrap.querySelector(".pump-left").textContent = left == null ? "하루 15개까지" : "오늘 " + left + "개 남음";
    }
    function face(m) { wrap.querySelector(".pump-face").innerHTML = pumpFace(m); }
    function ask(q) {
      q = String(q || "").trim(); if (!q || busy) return;
      if (!ATT_API) return;
      busy = true; var hist = log.slice(-6);
      log.push({ r: "q", t: q }); draw(); face("think");
      var box = wrap.querySelector(".pump-log"), wait = bubble("a", "펌핑이가 생각 중이에요…"); wait.classList.add("is-wait"); box.appendChild(wait); box.scrollTop = box.scrollHeight;
      fetch(ATT_API, { method: "POST", body: JSON.stringify({ a: "pump", m: SLUG, q: q, h: hist, ctx: pumpCtx() }) })
        .then(function (r) { return r.json(); })
        .then(function (j) {
          if (j && j.ok) {
            var ans = String(j.a || ""), mt = /^\s*\[표정:\s*([^\]]+)\]\s*/.exec(ans), md = j.mood || (mt && PUMP_MOODS[mt[1].trim()]) || pumpGuess(q);
            if (mt) ans = ans.slice(mt[0].length);
            log.push({ r: "a", t: ans }); left = j.left; face(md); react(md, 0); setTimeout(function () { if (wrap) face(); }, 4000);
          }
          else {
            log.pop();
            var msg = j && j.error === "limit" ? "오늘 펌핑 끝! 질문은 하루 15개까지예요. 내일 또 물어봐요 🔥" : "앗, 펌핑이가 잠깐 쉬는 중이에요. 조금 뒤에 다시 물어봐 주세요!";
            if (j && j.error === "limit") left = 0;
            log.push({ r: "a", t: msg, sys: 1 }); face(j && j.error === "limit" ? "dizzy" : "worry");
          }
        })
        .catch(function () { log.pop(); log.push({ r: "a", t: "인터넷 연결을 확인하고 다시 물어봐 주세요!", sys: 1 }); face(); })
        .then(function () { log = log.filter(function (x, i) { return !x.sys || i === log.length - 1; }); save(); busy = false; draw(); });
    }
    function open() {
      if (wrap) return;
      wrap = document.createElement("div"); wrap.className = "pump-wrap";
      wrap.innerHTML = '<div class="pump-sheet" role="dialog" aria-label="펌핑이">' +
        '<div class="pump-top"><span class="pump-face"></span><b>펌핑이</b><span class="pump-left"></span><button type="button" class="pump-x" aria-label="닫기">✕</button></div>' +
        '<div class="pump-log"></div>' +
        '<form class="pump-in"><input type="text" maxlength="300" placeholder="운동 궁금한 거 물어봐요" enterkeyhint="send"><button type="submit">보내기</button></form>' +
        '<p class="pump-note">펌핑이는 AI라 틀릴 수 있어요. 아픈 곳·루틴 변경은 장동욱 쌤께!</p></div>';
      document.body.appendChild(wrap); document.documentElement.classList.add("pump-on");
      face(); draw();
      wrap.addEventListener("click", function (e) { if (e.target === wrap) close(); });
      wrap.querySelector(".pump-x").onclick = close;
      wrap.querySelector(".pump-in").onsubmit = function (e) { e.preventDefault(); var i = this.querySelector("input"); var v = i.value; i.value = ""; ask(v); };
      requestAnimationFrame(function () { wrap.classList.add("is-open"); });
    }
    function close() { if (!wrap) return; var w = wrap; wrap = null; w.classList.remove("is-open"); document.documentElement.classList.remove("pump-on"); setTimeout(function () { w.remove(); }, 250); }
    /* 터치 반응: 한 번 톡 = 깜짝 → 대화창, 연타 3번 = 어지러움, 꾹 = 알통 응원 */
    var tapN = 0, tapT = null, holdT = null, held = false, moodT = null, tipEl = null;
    function react(md, ms, say) {
      fab.innerHTML = pumpFace(md); fab.className = "pump-fab is-" + md;
      if (tipEl) { tipEl.remove(); tipEl = null; }
      if (say) { tipEl = document.createElement("div"); tipEl.className = "pump-tip"; tipEl.textContent = say; document.body.appendChild(tipEl); }
      clearTimeout(moodT);
      moodT = setTimeout(function () { fab.innerHTML = pumpFace(); fab.className = "pump-fab"; if (tipEl) { tipEl.remove(); tipEl = null; } }, ms || 1600);
    }
    fab.addEventListener("pointerdown", function () { held = false; clearTimeout(holdT); holdT = setTimeout(function () { held = true; tapN = 0; clearTimeout(tapT); react("lift", 2200, ["오늘도 펌핑! 💪", "한 세트 더 가요!", "할 수 있어요!"][Math.floor(Math.random() * 3)]); if (navigator.vibrate) navigator.vibrate(30); }, 550); });
    ["pointerup", "pointerleave", "pointercancel"].forEach(function (ev) { fab.addEventListener(ev, function () { clearTimeout(holdT); }); });
    fab.addEventListener("contextmenu", function (e) { e.preventDefault(); });
    fab.addEventListener("click", function () {
      if (held) { held = false; return; }
      tapN++; clearTimeout(tapT);
      if (tapN >= 3) { tapN = 0; react("dizzy", 2200, "그만~ 펌핑 과다예요! 😵"); return; }
      var TAPS = [["surprise", "앗! 깜짝이야"], ["wink", "궁금한 거 있죠? 😉"], ["love", "오늘도 와 줘서 고마워요!"], ["tongue", "메롱~ 질문 고고!"], ["cheer", "펌핑 준비 완료!"], ["sleepy", "졸았던 거 아니에요…"]];
      var pick = TAPS[Math.floor(Math.random() * TAPS.length)];
      if (tapN === 1) react(pick[0], 900, pick[1]);
      tapT = setTimeout(function () { var n = tapN; tapN = 0; if (n === 1) open(); }, 650);
    });
  }

  function route() {
    zoomReset();
    var hsh = (location.hash || "").replace(/^#/, "");
    var navTop = NAVS[NAVS.length - 1];
    if (navTop && navTop.h === (location.hash || "#home")) NAV_BACK = NAVS.pop();
    /* 뒤로 가기(뒤로 버튼·아이폰 밀어서 뒤로·브라우저 뒤로)는 새로고침처럼 보이지 않게 차례 등장 없이 그대로 (2026-11-12 "눌렀을 때 어쩔 땐 새로고침") */
    var tabRet = TABRET && TABRET === (location.hash || "#home"); TABRET = null;
    var goingBack = !!NAV_BACK || tabRet || (route.lastH !== undefined && Date.now() - LINKAT > 1000);
    /* 뒤로 갈 땐 다시 그리지 않고 아까 그 화면(DOM)을 그대로 다시 붙임 (2026-11-12 "특정 아이콘만 들어갔다 돌아오면 깜빡임")
       — 새로 그리면 아이폰이 그림·움직이는 아이콘을 처음부터 다시 칠하느라 한 순간 하얗게 비었음 */
    var curH0 = location.hash || "#home", prevH = route.lastH;
    if (prevH !== undefined && prevH !== curH0 && view.firstChild) {
      /* 2026-11-13 "복습지 종목 들어갔다 나오면 화면 짤림": 떼어 둔 화면의 영상이 계속 재생돼서 아이폰이 PiP(옆에 회색 손잡이)로 빼고 화면 배율이 꼬였음
         → 떼어 둘 땐 영상을 멈추고, 다시 붙일 때 이어서 재생 */
      Array.prototype.forEach.call(view.querySelectorAll("video"), function (v) { try { v.setAttribute("data-was", v.paused ? "" : "1"); v.pause(); } catch (e) {} });
      var fr = document.createDocumentFragment(); while (view.firstChild) fr.appendChild(view.firstChild);
      VCACHE[prevH] = { fr: fr, tab: view.getAttribute("data-tab"), day: view.getAttribute("data-day"), at: Date.now(), sig: vSig(), sig2: vSig2() };
      Object.keys(VCACHE).forEach(function (k) { if (Date.now() - VCACHE[k].at > 180000) delete VCACHE[k]; });
    }
    var hit = goingBack && prevH !== undefined && prevH !== curH0 && VCACHE[curH0];
    if (hit && tabRet && hit.sig2 !== vSig2()) { delete VCACHE[curH0]; hit = null; goingBack = false; }
    if (hit) {
      delete VCACHE[curH0];
      view.appendChild(hit.fr);
      Array.prototype.forEach.call(view.querySelectorAll('video[data-was="1"]'), function (v) { try { var p = v.play(); if (p && p.catch) p.catch(function () {}); } catch (e) {} });
      var ob = view.querySelector("#navBack"); if (ob) ob.remove();
      view.setAttribute("data-tab", hit.tab || "home");
      if (hit.day) view.setAttribute("data-day", hit.day); else view.removeAttribute("data-day");
      route.lastH = curH0; route.at = Date.now();
      view.classList.remove("enter"); view.classList.add("back");
      /* 2026-11-18 장동욱 "하단 탭 누르다 보면 전환효과 없어짐": 아래 탭으로 3분 안에 본 화면에 가면(TABRET) 떼어 둔 화면을 붙이느라 D안 차례 등장이 빠졌음
         → 아래 탭으로 돌아올 땐 붙인 화면에도 차례 등장을 다시 켬(그래프 그리기 같은 처음 움직임은 .back으로 계속 꺼 둠). 뒤로 버튼·밀어서 뒤로는 그대로 효과 없음 */
      if (tabRet) { void view.offsetWidth; view.classList.add("enter"); clearTimeout(route.enterT); route.enterT = setTimeout(function () { view.classList.remove("enter"); }, 900); }
      var t0 = tabOf(hit.tab);
      Array.prototype.forEach.call(document.querySelectorAll(".tabs a"), function (a) {
        if (a.getAttribute("data-tab") === t0) a.setAttribute("aria-current", "page"); else a.removeAttribute("aria-current");
      });
      tabInd(); litApply(hit.tab); navBackDraw(view);
      if (hit.sig !== vSig()) attRefresh();   /* 그사이 출석 기록이 바뀌었으면 그 부분만 새로 */
      var by0 = tabRet ? 0 : NAV_BACK ? NAV_BACK.y : SCR[curH0]; NAV_BACK = null; ZOOM = null;   /* 탭으로 돌아오면 맨 위부터 */
      if (by0 != null) window.scrollTo(0, by0);
      return;
    }
    var html, tab = "home", after = null, scrollDay = false, jumpTo = null;
    if (!hsh || hsh === "home") { html = renderHome(); }
    else if (hsh === "forms") { html = renderForms(); tab = "forms"; after = setupForms; }
    else if (hsh.indexOf("form-") === 0) {
      var f = findForm(hsh.slice(5));
      html = f ? renderForm(f) : renderForms(); tab = "forms"; if (f) after = setupPlayer;
    }
    else if (hsh === "routine") { html = renderRoutine(); tab = "routine"; }
    else if (hsh.indexOf("routine-") === 0 && (DAY_KO[hsh.slice(8)] || isRotKey(hsh.slice(8)))) { html = renderRoutine(hsh.slice(8)); tab = "routine"; scrollDay = true; }
    else if (hsh === "diet") { html = renderDiet(); tab = "diet"; }
    else if (hsh === "diet-log") { DB_TAB = ML_ON ? "log" : null; html = renderDiet(); tab = "diet"; }   /* 먹은 기록 바로 열기 (2026-11-20 업데이트 소식) */
    else if (hsh === "diet-guide") { DB_TAB = "guide"; DG_SUB = "food"; html = renderDiet(); tab = "diet"; }
    else if (hsh === "diet-supp") { DB_TAB = "guide"; DG_SUB = "supp"; html = renderDiet(); tab = "diet"; }   /* 영양제 가이드 바로 열기 */   /* 식단 가이드 바로 열기 (2026-11-20) */
    else if (hsh === "notice") { html = renderNotice(); tab = "notice"; }
    else if (hsh === "goal" || hsh === "journey") { html = renderGoal(); tab = "goal"; }
    else if (hsh === "goal-badges" || hsh === "badges") { html = renderGoal(); tab = "goal"; jumpTo = "badges"; }
    else if (hsh === "goal-rank") { html = renderGoal(); tab = "goal"; jumpTo = "rank"; }
    else if (hsh === "log") { html = renderLog(); tab = "log"; }
    else if (hsh === "muscle") { html = renderLog(); tab = "log"; jumpTo = "muscle"; }
    else if (hsh === "growth") { html = renderGrowth(); tab = "log"; after = setupGrowth; }
    else if (hsh === "app") { html = renderInstall(); tab = "home"; after = setupInstall; }
    else if (hsh === "report" || /^report-\d{4}-\d{2}$/.test(hsh)) { html = renderReport(hsh.slice(7)); tab = "log"; after = setupReport; }
    else if ((hsh === "body" || hsh === "inbody") && IB_ON) { html = renderBody(); tab = "body"; }
    else { html = renderHome(); }
    var wasRoutine = view.getAttribute("data-tab") === "routine";
    if (tab !== "routine") view.removeAttribute("data-day");
    view.innerHTML = html + rtSaveBar();
    view.setAttribute("data-tab", tab);
    /* 화면 넘어갈 때 효과 D안 (2026-11-12 "D안으로 가자"): 칸들이 위에서부터 차례로 톡톡 올라옴 — 주소가 바뀔 때만(같은 화면 다시 그리기는 X) */
    var curH = location.hash || "#home";
    var hashChanged = route.lastH !== undefined && route.lastH !== curH;
    var soft = SOFT && Date.now() - SOFT < 1500; SOFT = 0;
    if (route.lastH !== undefined && route.lastH !== curH && !soft && !goingBack && !(ZOOM && Date.now() - ZOOM.at < 1500)) {
      view.classList.remove("enter"); void view.offsetWidth; view.classList.add("enter");
      clearTimeout(route.enterT); route.enterT = setTimeout(function () { view.classList.remove("enter"); }, 900);
    }
    route.lastH = curH; route.at = Date.now();
    view.classList.toggle("back", !!(goingBack && hashChanged));
    Array.prototype.forEach.call(document.querySelectorAll(".tabs a"), function (a) {
      if (a.getAttribute("data-tab") === tabOf(tab)) a.setAttribute("aria-current", "page"); else a.removeAttribute("aria-current");
    });
    tabInd();
    alignText(document);
    if (/^form-/.test(hsh) && !DEMO) { if (findForm(hsh.slice(5))) fvMark(hsh.slice(5)); lsAdd(FOPEN_KEY, [hsh.slice(5)]); }
    litApply(tab);
    setupFold(tab, jumpTo || (scrollDay ? "day" : null));
    setupAttCheck(); setupCal(); setupIb(); setupBadges(); setupMuscle(); setupRtEdit();
    if (after) after();
    var flashEl = null;
    if (tab === "notice") {
      nMarkSeen();
      if (pendingNotice) {
        Array.prototype.forEach.call(document.querySelectorAll(".notice[data-nkey]"), function (el) {
          if (!flashEl && el.getAttribute("data-nkey") === pendingNotice) flashEl = el;
        });
        pendingNotice = null;
      }
    }
    navBackDraw(view);
    var jumpEl = jumpTo && document.getElementById(jumpTo);
    if (NAV_BACK || (goingBack && hashChanged && SCR[curH] != null)) {
      var by = NAV_BACK ? NAV_BACK.y : SCR[curH]; NAV_BACK = null;
      window.scrollTo(0, by); setTimeout(function () { window.scrollTo(0, by); }, 60);
    } else if (jumpEl) {
      jumpEl.scrollIntoView({ block: "start" });
    } else if (flashEl) {
      flashEl.scrollIntoView({ block: "center" });
      flashEl.classList.add("flash");
    } else if (scrollDay && wasRoutine) {
      var el = document.getElementById("day");
      if (el) el.scrollIntoView({ block: "start" });
    } else {
      window.scrollTo(0, 0);
    }
    if (ZOOM) { if (hashChanged) zoomRun(view); else ZOOM = null; }
    if (soft && hashChanged) {
      var dEl = document.getElementById("day");
      if (dEl && dEl.animate) { try { if (!matchMedia("(prefers-reduced-motion: reduce)").matches) dEl.animate([{ opacity: 0, transform: "translateY(6px)" }, { opacity: 1, transform: "none" }], { duration: 280, easing: "ease-out" }); } catch (e) {} }
    }
  }
  /* vpFix(뷰포트 다시 맞추기)는 2026-11-12 뺐음 — 아이폰에서 오히려 화면이 옆으로 점점 늘어났음. 뷰포트 meta를 코드로 건드리지 말 것 */
  /* 화면 잘림 진단 (2026-11-12) — 선생님 보기에서만: 페이지 폭이 폰 화면보다 넓어지면 위에 빨간 띠로 범인 칸을 알려 줌 + 맨 아래 버전 표시 */
  function ovDiag() {
    if (!COACH_MODE || DEMO) return;
    var sw = Math.min(screen.width, screen.height) <= 500 && window.matchMedia("(orientation: portrait)").matches ? screen.width : window.innerWidth;
    var cw = document.documentElement.clientWidth, bad = [];
    Array.prototype.forEach.call(document.querySelectorAll("body *"), function (e) {
      var r = e.getBoundingClientRect(); if (!r.width || r.right <= sw + 1) return;
      var p = e.parentElement, clipped = false;
      while (p && p !== document.body) { var cs = getComputedStyle(p); if (cs.overflowX !== "visible" && p.getBoundingClientRect().right <= sw + 1) { clipped = true; break; } p = p.parentElement; }
      if (!clipped) bad.push(e);
    });
    var box = document.getElementById("ovdiag");
    if (cw <= sw + 1 && !bad.length) { if (box) box.remove(); return; }
    if (!box) { box = document.createElement("div"); box.id = "ovdiag"; box.style.cssText = "position:fixed;left:8px;right:8px;top:calc(env(safe-area-inset-top,0px) + 6px);z-index:999;background:#E1141E;color:#fff;font:700 11px/1.4 sans-serif;padding:6px 9px;border-radius:10px;word-break:break-all"; document.body.appendChild(box); box.addEventListener("click", function () { box.remove(); }); }
    box.textContent = "[선생님만 보임] 화면 넘침: 페이지 " + cw + " / 폰 " + sw + " · " + bad.slice(0, 4).map(function (e) {
      var c = typeof e.className === "string" ? e.className : (e.className && e.className.baseVal) || "";
      return e.tagName.toLowerCase() + (c ? "." + c.split(" ").join(".") : "") + "(" + Math.round(e.getBoundingClientRect().right) + ")";
    }).join(", ") + " — 이 화면 캡처해서 보내 주세요";
  }
  window.addEventListener("hashchange", function () { setTimeout(ovDiag, 900); });
  [1500, 4000, 8000].forEach(function (t) { setTimeout(ovDiag, t); });
  if (COACH_MODE && !DEMO) {
    var vm = (SCRIPT && SCRIPT.src.match(/[?&]v=(\w+)/) || [])[1] || "?";
    var vt = document.createElement("div"); vt.style.cssText = "text-align:center;font-size:10px;color:#B4B4BE;padding:4px 0 110px;white-space:pre-line"; vt.textContent = "PT노트 버전 " + vm;
    document.body.appendChild(vt);
  }
  /* 2026-11-13 "또 짤림": 본문(view)이 화면 가운데 자리에서 벗어나 있으면(오른쪽만 비거나 넘침) 남은 움직임을 지우고 다시 그리게 함.
     선생님 폰엔 맨 아래 회색 글씨로 화면 숫자를 같이 보여 줌 → 또 생기면 그 줄을 캡처해서 원인 확인 */
  var HEAL = 0;
  function viewHeal(why) {
    var v = document.getElementById("view"); if (!v) return;
    var w = document.documentElement.clientWidth, r = v.getBoundingClientRect(), vv = window.visualViewport;
    var off = r.left < -1 || r.right > w + 1 || Math.abs((w - r.right) - r.left) > 8;
    if (off) {
      HEAL++;
      try { if (v.getAnimations) v.getAnimations().forEach(function (a) { a.cancel(); }); } catch (e) {}
      v.style.transform = ""; v.style.transformOrigin = ""; v.style.clipPath = "";
      void v.offsetWidth;   /* (2026-11-14) display none 껐다 켜기는 뺌 — 아이폰에서 본문 폭이 줄어든 채 남는 원인 후보 */
    }
    if (COACH_MODE && !DEMO && vt) {
      var r2 = v.getBoundingClientRect(), tb = document.querySelector(".tabs");
      vt.textContent = "PT노트 버전 " + vm + "\n화면 " + window.innerWidth + "/" + w + "/" + screen.width + (vv ? " · 배율 " + vv.scale.toFixed(2) + " " + Math.round(vv.width) : "") +
        " · 본문 " + Math.round(r2.left) + "~" + Math.round(r2.right) + " · 아래탭 " + (tb ? Math.round(tb.getBoundingClientRect().width) : "-") + " · 고침 " + HEAL + (off ? " (" + why + ": " + Math.round(r.left) + "~" + Math.round(r.right) + ")" : "");
    }
  }
  window.addEventListener("hashchange", function () { setTimeout(function () { viewHeal("주소"); }, 700); });
  window.addEventListener("pageshow", function () { setTimeout(function () { viewHeal("열기"); }, 300); });
  window.addEventListener("resize", function () { viewHeal("크기"); });
  document.addEventListener("visibilitychange", function () { if (!document.hidden) setTimeout(function () { viewHeal("돌아옴"); }, 300); });
  [800, 2500].forEach(function (t) { setTimeout(function () { viewHeal("처음"); }, t); });
  window.addEventListener("hashchange", function () { route(); tourMaybe(); wnMaybe(); });
  route(); tourMaybe(); wnMaybe();
  cmemoFill();
  (function () {   /* 로딩 화면 걷기 — 앱 아이콘으로 열었을 때 0.6초는 보이게, 그 밖(아이패드 칸 안·안내서 데모)은 바로 */
    var t0 = (window.performance && performance.timing && performance.timing.navigationStart) || Date.now();
    var wait = window.self !== window.top || DEMO ? 0 : Math.max(0, 1000 - (Date.now() - t0));
    setTimeout(function () { document.body.classList.add("ready"); }, wait);
  })();
  nDot();
  if (!DEMO) setTimeout(showNoticePop, 800);
  if (document.fonts && document.fonts.ready) document.fonts.ready.then(function () { alignText(document); });
  if (!window.EXI) {   /* 옛 껍데기(index.html에 exicons.js 줄이 없는 회원)도 움직이는 아이콘이 나오게 */
    var exs = document.createElement("script"); exs.src = BASE + "exicons.js"; exs.onload = function () { route(); }; document.head.appendChild(exs);
  }
  pumpInit();
  attSync(); ibSync();
  if (!ATT_API) setTimeout(badgeCheck, 1500);
  document.addEventListener("visibilitychange", function () { if (!document.hidden) { attSync(); ibSync(); } });
  window.addEventListener("load", function () { alignText(document); });
})();
