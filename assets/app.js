/* GYMTOS 도당점 회원 홈페이지 — window.MEMBER(data.js)를 읽어 화면을 그림 */
(function () {
  "use strict";
  var M = window.MEMBER;
  if (!M) return;
  var SCRIPT = document.currentScript;
  var BASE = SCRIPT ? SCRIPT.src.replace(/app\.js(\?.*)?$/, "") : "../../assets/";
  var THEME = M.sex === "F" ? "F" : "M";
  /* 종목 이름 → 루틴일지 아이콘 (data.js에서 icon을 따로 주면 그게 우선) */
  var ICON_BY_NAME = {
    "플랫 덤벨프레스": "db_bench_press", "덤벨 벤치프레스": "db_bench_press", "바벨 벤치프레스": "bench_press", "벤치프레스": "bench_press",
    "인클라인 덤벨 프레스": "incline_db_press", "스미스 인클라인 프레스": "smith_incline_press", "머신 인클라인 프레스": "incline_machine_press",
    "체스트 프레스": "chest_press", "펙덱 플라이": "pec_deck", "펙덱": "pec_deck", "케이블 푸쉬다운": "cable_pushdown",
    "오버헤드 익스텐션": "overhead_ext", "랫풀다운": "lat_pulldown", "언더그립 랫풀다운": "underhand_pulldown",
    "스트레이트 암 풀다운": "straight_arm_pulldown", "시티드 로우 머신": "seated_row_machine", "시티드 로우": "seated_row_machine",
    "케이블 시티드 로우": "cable_seated_row", "언더그립 시티드 로우": "underhand_seated_row", "원암 덤벨 로우": "one_arm_row",
    "해머스트렝스 로우로우": "low_row", "로우로우": "low_row", "하이 로우": "high_row", "뉴텍 버티컬 풀다운": "vertical_pulldown",
    "케이블 풀오버": "cable_pullover", "시티드 페이스풀": "face_pull", "페이스풀": "face_pull", "리버스 펙덱": "reverse_pec_deck",
    "레그 익스텐션": "leg_extension", "이너타이": "inner_thigh", "아웃타이 머신": "outer_thigh_pin", "플레이트 아웃타이": "outer_thigh_plate",
    "아웃타이": "outer_thigh", "고블릿 스쿼트": "goblet_squat", "핵스쿼트": "hack_squat", "스미스 스쿼트": "smith_squat",
    "레그프레스": "leg_press", "라잉 레그컬": "lying_leg_curl", "힙쓰러스트": "hip_thrust", "덤벨 RDL": "db_rdl",
    "백 익스텐션": "back_extension", "사이드 레터럴 레이즈": "lateral_raise", "레터럴 레이즈": "lateral_raise",
    "레터럴 레이즈 머신": "lateral_raise_standing", "숄더 프레스 머신": "shoulder_press", "숄더 프레스": "shoulder_press",
    "덤벨 컬": "db_curl", "해머 컬": "db_curl", "덤벨 슈러그": "shrug", "플랭크": "plank",
    "스미스 벤치프레스": "smith_bench_press", "스미스 클로즈그립 벤치프레스": "smith_bench_press",
    "스미스 벤트오버 로우": "smith_row", "스미스 숄더 프레스": "smith_shoulder_press", "덤벨 오버헤드 익스텐션": "overhead_ext",
    "스미스 슈러그": "smith_shrug", "인클라인 덤벨 컬": "incline_db_curl", "덤벨 숄더 프레스": "shoulder_press", "랙 밴드 푸쉬업": "band_push_up"
  };
  function iconSrc(key) { return BASE + "icons/" + THEME + "/" + key + ".png"; }
  function iconOf(it) {
    if (it.icon) return it.icon;
    var n = it.name || "";
    return ICON_BY_NAME[n] || ICON_BY_NAME[n.replace(/\s*\(.*\)\s*$/, "")] || "dumbbell";
  }
  function mainItem(d) {
    for (var i = 0; i < d.items.length; i++) if (d.items[i].tag === "메인") return d.items[i];
    return d.items[0];
  }
  function dayIcon(d) { return !d || d.rest ? "rest" : d.cardio_only ? "treadmill" : d.pick ? "dumbbell" : iconOf(mainItem(d)); }
  function img(key, cls) { return '<img class="' + (cls || "icn") + '" src="' + iconSrc(key) + '" alt="" loading="lazy">'; }
  document.documentElement.setAttribute("data-sex", M.sex === "F" ? "F" : "M");

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
  var TABS = [
    ["home", "홈", '<path d="M3.5 10.5 12 4l8.5 6.5V20a1 1 0 0 1-1 1H15v-6H9v6H4.5a1 1 0 0 1-1-1z" stroke-linejoin="round"/>'],
    ["goal", "목표", '<path d="M5 21V4" stroke-linecap="round"/><path d="M5 4.5h12.5l-2.5 4 2.5 4H5" stroke-linejoin="round"/>'],
    ["body", "몸변화", '<path d="M4 18l5-5.5 4 3L20 8" stroke-linecap="round" stroke-linejoin="round"/><path d="M15.5 8H20v4.5" stroke-linecap="round" stroke-linejoin="round"/>'],
    ["routine", "루틴", '<path d="M6.5 8v8M17.5 8v8M3.5 10v4M20.5 10v4M6.5 12h11" stroke-linecap="round"/>'],
    ["forms", "복습지", '<rect x="3" y="5" width="18" height="14" rx="3"/><path d="m10 9 5 3-5 3z" fill="currentColor"/>'],
    ["diet", "식단", '<circle cx="13" cy="13" r="6.5"/><path d="M4 4v6M6.5 4v6M4 7h2.5M5.2 10v10" stroke-linecap="round"/>'],
    ["notice", "공지", '<path d="M4 10v4h3l6 4V6L7 10z" stroke-linejoin="round"/><path d="M16.5 9.5a3.5 3.5 0 0 1 0 5M19 7a7 7 0 0 1 0 10" stroke-linecap="round"/>']
  ];
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
    if (coachPath) COACH_MODE = true;
    var barIn = document.querySelector(".bar-in");
    if (DEMO_BACK && barIn) {
      var gb = document.createElement("a");
      gb.href = DEMO_BACK; gb.className = "coachback"; gb.textContent = "← PT 안내서";
      barIn.insertBefore(gb, barIn.children[1] || null);
    } else if (coachPath && barIn && /^\/coach-[a-z0-9]+\/$/.test(coachPath)) {
      var cb = document.createElement("a");
      cb.href = coachPath; cb.className = "coachback"; cb.textContent = "← 회원 목록";
      barIn.insertBefore(cb, barIn.children[1] || null);
    }
  } catch (e) {}
  var tabsIn = document.querySelector(".tabs-in");
  if (tabsIn) {
    tabsIn.innerHTML = TABS.map(function (t) {
      return '<a href="#' + t[0] + '" data-tab="' + t[0] + '"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">' + t[2] + '</svg>' + t[1] + '</a>';
    }).join("");
    tabsIn.style.gridTemplateColumns = "repeat(" + TABS.length + ", 1fr)";
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
  function dayByKey(k) {
    if (isRotKey(k)) return rotDays()[+k.slice(1) - 1];
    var days = (M.routine && M.routine.days) || [];
    for (var i = 0; i < days.length; i++) if (KO_KEY[days[i].day] === k) return days[i];
    return null;
  }
  function findForm(id) {
    for (var i = 0; i < M.forms.length; i++) if (M.forms[i].id === id) return M.forms[i];
    return null;
  }
  function remember() {
    var q = QUOTES[Math.floor(Math.random() * QUOTES.length)];
    return '<div class="remember"><svg viewBox="0 0 34 34" aria-hidden="true"><circle cx="17" cy="17" r="17" fill="var(--primary)"/>' +
      '<rect x="7" y="13" width="4" height="8" rx="1.2" fill="#fff"/><rect x="23" y="13" width="4" height="8" rx="1.2" fill="#fff"/>' +
      '<rect x="11" y="15.5" width="12" height="3" rx="1" fill="#F27BB0"/></svg><div><small>기억해요!</small><p>' + esc(q) + '</p></div></div>' +
      '<footer class="foot"><span>GYMTOS 도당점</span><span>PERSONAL TRAINING</span></footer>';
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
  function journeyNow() {
    var J = M.journey;
    if (!J || !J.start) return null;
    var p = J.start.split("-"), st = new Date(+p[0], +p[1] - 1, +p[2]);
    var el = (Date.now() - st.getTime()) / (86400000 * 30.44);
    var m = Math.max(0, Math.min(12, el));
    var stage = m < JST[1].from ? JST[0] : m < JST[2].from ? JST[1] : JST[2];
    return { el: el, m: m, month: el < 0 ? 0 : Math.min(12, Math.floor(el) + 1), stage: stage, start: J.start };
  }
  function bpDday() {   /* 촬영일(journey.shoot)이 있으면 D-day */
    var s = M.journey && M.journey.shoot;
    if (!s) return null;
    var p = s.split("-"), d = new Date(+p[0], +p[1] - 1, +p[2]), t = new Date(); t.setHours(0, 0, 0, 0);
    return { n: Math.round((d - t) / 86400000), label: p[0] + ". " + (+p[1]) + ". " + (+p[2]) };
  }
  function ss(a, b, m) { var t = Math.max(0, Math.min(1, (m - a) / (b - a))); return t * t * (3 - 2 * t); }
  function bpMuscle(m) { return 0.1 + 0.72 / (1 + Math.exp(-(m - 4) / 1.2)) - 0.03 * ss(8, 12, m); }
  function bpFat(m) { return 0.5 + 0.08 * ss(0, 8, m) - 0.44 * ss(8, 11.6, m); }
  var bpGid = 0;
  function reduceMotion() { try { return window.matchMedia("(prefers-reduced-motion: reduce)").matches; } catch (e) { return false; } }
  function journeyChartBP(now) {
    var X = function (m) { return 26 + m * 25; }, Y = function (v) { return 168 - v * 124; };
    var bands = JST.map(function (s, i) {
      var cur = now && s === now.stage;
      return '<rect x="' + X(s.from) + '" y="34" width="' + (X(s.to) - X(s.from)) + '" height="134" fill="#fff" opacity="' + (cur ? 0.12 : 0.03 + i * 0.015) + '"/>' +
        (i ? '<line x1="' + X(s.from) + '" y1="34" x2="' + X(s.from) + '" y2="168" stroke="#fff" stroke-opacity=".14" stroke-dasharray="2 3"/>' : '') +
        '<text x="' + ((X(s.from) + X(s.to)) / 2) + '" y="26" text-anchor="middle" class="bp-st' + (cur ? ' cur' : '') + '">' + s.no + '단계 ' + s.short + '</text>';
    }).join("");
    var pts = function (f, a, b) {
      var out = [];
      for (var m = a; m <= b + 1e-9; m += 0.1) out.push(X(m).toFixed(1) + "," + Y(f(m)).toFixed(1));
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
    var path = '<polyline points="' + pts(bpFat, 0, 12) + '" fill="none" stroke="url(#' + gid + 'f)" stroke-width="2.5" stroke-dasharray="1 5" stroke-linecap="round" opacity=".9" class="bp-flow"/>' +
      '<polyline points="' + pts(bpMuscle, cm, 12) + '" fill="none" stroke="url(#' + gid + 'l)" stroke-width="2.5" stroke-dasharray="5 5" opacity=".6" class="bp-ahead"/>';
    /* 앞으로 갈 구간: 옅은 금빛 + 촬영 쪽으로 흐르는 반짝임 (선 아래 전체) */
    var areaAll = pts(bpMuscle, 0, 12) + " " + X(12) + ",168 " + X(0) + ",168";
    path = '<polygon points="' + pts(bpMuscle, cm, 12) + " " + X(12) + ",168 " + X(cm).toFixed(1) + ',168" fill="url(#' + gid + 'a)" opacity=".35"/>' +
      '<polygon points="' + areaAll + '" fill="url(#' + gid + 's)"/>' + path;
    if (cm > 0) {
      var area = pts(bpMuscle, 0, cm) + " " + X(cm).toFixed(1) + ",168 " + X(0) + ",168";
      path += '<polygon points="' + area + '" fill="url(#' + gid + 'a)" class="bp-area"/>' +
        '<polyline points="' + pts(bpMuscle, 0, cm) + '" fill="none" stroke="url(#' + gid + 'l)" stroke-width="4.5" stroke-linecap="round" pathLength="1" class="bp-done"/>';
    }
    /* 두 선이 만나는 곳 = 몸이 선명해지는 순간 */
    var cx = 8;
    for (var m = 8; m <= 12; m += 0.05) { if (bpMuscle(m) - bpFat(m) > 0.12) { cx = m; break; } }
    var sharp = '<g transform="translate(' + X(cx) + ',' + Y(bpMuscle(cx)) + ')"><path d="M0 -9 L2.2 -2.2 L9 0 L2.2 2.2 L0 9 L-2.2 2.2 L-9 0 L-2.2 -2.2 Z" fill="#fff" opacity=".9"/></g>' +
      '<text x="' + (X(cx) - 6) + '" y="' + (Y(bpMuscle(cx)) - 13) + '" text-anchor="end" class="bp-note">몸이 선명해지는 순간</text>';
    var ticks = [0, 2, 8, 12].map(function (m) {
      return '<line x1="' + X(m) + '" y1="168" x2="' + X(m) + '" y2="173" stroke="#fff" stroke-opacity=".35"/>' +
        '<text x="' + X(m) + '" y="186" text-anchor="' + (m === 12 ? "end" : "middle") + '" class="bp-x">' + (m === 0 ? "시작" : m === 12 ? "촬영" : m + "개월") + '</text>';
    }).join("");
    var mk = "";
    if (now) {
      var mx = X(cm), my = Y(bpMuscle(cm)), right = cm > 7.5, LW = 108, ly = my - 18;
      mk = '<circle cx="' + mx + '" cy="' + my + '" r="7" fill="none" stroke="var(--gold-line)" stroke-width="2" class="bp-sonar"/>' +
        '<circle cx="' + mx + '" cy="' + my + '" r="12" fill="var(--gold-line)" opacity=".25"/><circle cx="' + mx + '" cy="' + my + '" r="6.5" fill="url(#' + gid + 'l)" stroke="#fff" stroke-width="2.5"/>' +
        '<g transform="translate(' + (right ? mx - 6 : mx + 6) + ',' + ly + ')"><rect x="' + (right ? -LW : 0) + '" y="-15" width="' + LW + '" height="22" rx="11" fill="var(--key)"/>' +
        '<text x="' + (right ? -LW / 2 : LW / 2) + '" y="0.5" text-anchor="middle" class="jc-mk">지금 여기 · ' + (now.month || 1) + '개월차</text></g>';
    }
    /* 끝: 금색 카메라 = 바프 촬영 D-DAY */
    var ex = X(12), ey = Y(bpMuscle(12));
    var cam = '<g transform="translate(' + ex + ',' + (ey - 22) + ')"><circle r="14" fill="var(--gold-line)" class="bp-glow"/><circle r="14" fill="url(#' + gid + 'l)"/>' +
      '<path d="M-7 -3.5 h3.5 l1.6 -2.4 h3.8 l1.6 2.4 h3.5 v9 h-14 Z" fill="none" stroke="#17294B" stroke-width="1.8" stroke-linejoin="round"/><circle cy="1" r="2.6" fill="none" stroke="#17294B" stroke-width="1.8"/></g>' +
      '<text x="' + (ex - 19) + '" y="' + (ey - 18) + '" text-anchor="end" class="bp-dd">D-DAY</text>';
    return '<div class="jchart bp-chart"><svg viewBox="0 0 340 194" role="img" aria-label="바디프로필 12개월 여정 그래프: 1단계 기초(1~2개월), 2단계 근육 채우기(2~8개월), 3단계 컷팅과 촬영(8~12개월)' + (now ? ', 지금 ' + (now.month || 1) + '개월차' : '') + '">' +
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
  function bpStrip() {   /* 바프 회원: 그래프 위 금색 띠 (촬영일 있으면 D-day) */
    var d = bpDday();
    return '<div class="bp-strip"><span class="bp-tag">BODY PROFILE</span>' +
      (d ? '<b>' + (d.n > 0 ? 'D-' + d.n : d.n === 0 ? 'D-DAY' : '촬영 완료') + '</b><small>촬영 ' + esc(d.label) + '</small>'
         : '<b>목표는 바프 촬영!</b><small>촬영 날짜는 선생님과 정해요</small>') + '</div>';
  }
  function journeyHome() {
    var now = journeyNow();
    if (!now) return "";
    if (BP) return '<section>' + head("", "나의 바프 여정", "촬영날까지 함께 가는 12개월", '<a class="more" href="#goal">목표 자세히 →</a>') +
      '<div class="panel jpanel bp">' + bpStrip() + journeyChart(now) + stageCard(now.stage, now, true) + '</div></section>';
    return '<section>' + head("", "나의 PT 여정", "함께 가는 12개월", '<a class="more" href="#goal">목표 자세히 →</a>') +
      '<div class="panel jpanel">' + journeyChart(now) + stageCard(now.stage, now, true) + '</div></section>';
  }
  function renderGoal() {
    var now = journeyNow();
    var h = '<div class="hero"><div class="hero-main"><div class="hero-l"><div class="eyebrow">MY GOAL <b>· 나의 목표</b></div>' +
      '<h1>' + esc(M.goal || "나의 목표") + '</h1><div class="en">' + esc(M.name) + ' 회원님 · ' + (BP ? '기초 → 벌크 → 컷팅, 바프 촬영까지 함께 가요' : '기초 → 변화 → 자립, 3단계로 함께 가요') + '</div>' +
      '<div class="who"><strong>' + (now ? (now.month ? now.month + '개월차' : '곧 시작해요') + ' · ' + now.stage.no + '단계 ' + esc(now.stage.short) : '') + '</strong><span>담당 장동욱 트레이너</span></div></div></div>' +
      '<div class="keypoint"><small>KEY POINT</small><p>' + (BP ? '목표는 하나, 바프 촬영날! 그 의지라면 충분해요. 단계마다 함께 넘어가요!' : '혼자 가는 길이 아니에요. 단계마다 함께 넘어가요!') + '</p></div></div>';
    var n4 = "03", n5 = "04";   /* 몸 변화 기록은 2026-11-06 '몸변화' 탭(#body)으로, 근육 지도는 2026-11-08 루틴 탭으로 이동 */
    var attSec = '<section id="att">' + head("01", "출석률 · 출석 달력", "얼마나 꾸준히 나왔는지 봐요") + '<div class="panel attcard">' + attGauge() + attCalendar() + '</div></section>';
    if (!now) {
      return h + attSec + badgeSection("02") + '<div class="panel empty"><h3>PT 여정 준비 중이에요</h3><p>선생님이 시작일을 넣으면 12개월 여정이 나와요</p></div>' + remember();
    }
    h += attSec + badgeSection("02");
    h += '<section>' + head(n4, BP ? "바프까지 12개월" : "한눈에 보는 12개월", "지금 어디쯤인지 확인해요") + '<div class="panel jpanel' + (BP ? ' bp">' + bpStrip() : '">') + journeyChart(now) + '</div></section>';
    h += '<section>' + head(n5, "단계별 목표", BP ? "기초 → 벌크 → 컷팅" : "단계마다 하는 것이 달라요") + '<div class="jlist' + (BP ? ' bp' : '') + '">' +
      JST.map(function (st) { return stageCard(st, now, false); }).join("") + '</div></section>';
    return h + remember();
  }


  /* ---------------- 출석 (오늘 출석 체크 · 출석 달력 · 출석률) */
  var SLUG = window.ATT_SLUG || (location.pathname.match(/\/m\/([^\/]+)\//) || [, M.name])[1];
  /* 출석 창고(구글 Apps Script 웹 앱) 주소 — 비어 있으면 휴대폰에만 저장 */
  var ATT_API = window.ATT_API || "https://script.google.com/macros/s/AKfycbwtjTpk88xTWQcKXoaFX2qCYtKSzKoCOs-Us26k6QUbtKvewTaqJutJuA4RJjAmV-6bvA/exec";
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
    var day = dayByKey(DAY_KEYS[d.getDay()]);
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

  function attCheckStrip() {   /* 홈 제목 카드 오른쪽에 들어가는 오늘 출석 체크 */
    var a = attLoad(), now = new Date(), key = ymd(now), on = attHas(a, key);
    var m = attStats(a, new Date(now.getFullYear(), now.getMonth(), 1), now);
    return '<button type="button" class="attq' + (on ? ' on' : '') + '" id="attBtn" aria-pressed="' + on + '" aria-label="' +
      (now.getMonth() + 1) + '월 ' + now.getDate() + '일 출석 ' + (on ? '완료, 누르면 취소' : '체크하기') + '">' +
      '<span class="qbox" aria-hidden="true"><svg viewBox="0 0 24 24"><path d="M5.5 12.5l4.2 4.2 8.8-9.4" fill="none" stroke="currentColor" stroke-width="3.2" stroke-linecap="round" stroke-linejoin="round"/></svg></span>' +
      '<span class="qlab">' + (on ? '출석 완료' : '오늘 출석') + '</span>' +
      '<span class="qrate">' + (on && attTimes[key] ? attTimes[key] + ' 체크' : '이번 달 ' + m.rate + '%') + '</span></button>';
  }
  function attRefresh() {   /* 출석이 바뀌면 화면의 출석 부분만 다시 그림 */
    var b = document.getElementById("attBtn");
    if (b) { b.outerHTML = attCheckStrip(); setupAttCheck(); }
    var g = document.querySelector(".attgauge"); if (g) g.outerHTML = attGauge();
    var c = document.querySelector(".cal"); if (c) { c.outerHTML = attCalendar(); setupCal(); }
    var bs = document.getElementById("badges"); if (bs) { bs.outerHTML = badgeSection(bs.getAttribute("data-num")); setupBadges(); }
    var mb = document.querySelector(".mm-body"); if (mb) mb.innerHTML = muscleBody();
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
      .then(function (j) { if (!j || !j.ok) throw new Error("save"); attApply(j.days); return j; });
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
      b.classList.add("view");
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
      if (nb && turnOn) nb.classList.add("pop");
      if (!ATT_API) return;
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
  var IB_KEY = "ptib_" + SLUG;
  var ibData = null, ibErr = false, ibReady = null;
  try { ibData = JSON.parse(localStorage.getItem(IB_KEY) || "null"); } catch (e) {}
  var IB_ROWS = [
    { k: "w", name: "체중", unit: "kg", good: 0 },
    { k: "smm", name: "골격근량", unit: "kg", good: 1 },
    { k: "bfm", name: "체지방량", unit: "kg", good: -1 },
    { k: "pbf", name: "체지방률", unit: "%", good: -1 }
  ];
  function ibFmt(n) { return (Math.round(n * 10) / 10).toFixed(1); }
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
      rows = IB_ROWS.map(function (r) {
        var a = p.prev[r.k], b = p.cur[r.k], dlt = Math.round((b - a) * 10) / 10;
        var cls = dlt === 0 || !r.good ? "same" : (dlt > 0) === (r.good > 0) ? "up" : "down";
        var sign = dlt > 0 ? "▲ +" : dlt < 0 ? "▼ −" : "";
        return '<div class="ib-row"><span class="ib-name">' + r.name + '</span><span class="ib-prev">' + ibFmt(a) + '</span>' +
          '<span class="ib-cur">' + ibFmt(b) + '<small>' + r.unit + '</small></span>' +
          '<span class="ib-d ' + cls + '">' + (dlt === 0 ? "그대로" : sign + ibFmt(Math.abs(dlt)) + r.unit) + '</span></div>';
      }).join("");
      rows = '<div class="ib-grid"><div class="ib-row ib-hd"><span></span><span>지난달</span><span>이번 달</span><span>변화</span></div>' + rows + '</div>' +
        '<p class="ib-sum">' + ibSummary(p) + '</p>';
    } else {
      head2 = '<div class="ib-when"><span class="now"><small>' + (+p.cur.d.slice(5, 7)) + '월 첫 기록</small>' + ibDate(p.cur.d) + '</span></div>';
      rows = '<div class="ib-first">' + IB_ROWS.map(function (r) {
        return '<div><small>' + r.name + '</small><b>' + ibFmt(p.cur[r.k]) + '<em>' + r.unit + '</em></b></div>';
      }).join("") + '</div><p class="ib-sum">첫 기록 완료! 다음 달에 올리면 지난달과 비교해 드려요</p>';
    }
    var hist = (ibData || []).slice().reverse().map(function (r) {
      return '<li><span class="ib-hd8">' + r.d.replace(/-/g, ". ") + '</span><span>' + ibFmt(r.w) + 'kg · 근육 ' + ibFmt(r.smm) + ' · 지방 ' + ibFmt(r.pbf) + '%</span>' +
        (r.img ? '<button type="button" class="ib-photo" data-id="' + esc(r.id) + '">결과지</button>' : '') +
        '<button type="button" class="ib-del" data-id="' + esc(r.id) + '">삭제</button></li>';
    }).join("");
    return '<div class="panel ibpanel">' + head2 + rows + btn +
      '<details class="ib-hist"><summary>지난 기록 ' + ibData.length + '개 보기</summary><ul>' + hist + '</ul></details></div>';
  }
  function ibHomeStrip() {
    if (!IB_ON || !ibData || ibReady === false) return "";
    var p = ibPair();
    var txt = !p ? "인바디 결과지 올리고 지난달과 비교해 봐요" :
      !p.prev ? "첫 인바디 기록 완료! 다음 달에 비교해 드려요" :
      "지난달보다 골격근 " + (p.cur.smm - p.prev.smm >= 0 ? "+" : "−") + ibFmt(Math.abs(p.cur.smm - p.prev.smm)) + "kg · 체지방 " +
        (p.cur.bfm - p.prev.bfm >= 0 ? "+" : "−") + ibFmt(Math.abs(p.cur.bfm - p.prev.bfm)) + "kg";
    return '<a class="ibstrip" href="#body"><span class="ibs-tag">InBody</span><span class="ibs-t">' + txt + '</span><span class="ibs-go" aria-hidden="true">›</span></a>';
  }
  function ibRefresh() {
    var b = document.querySelector(".ibpanel"); if (b) { b.outerHTML = ibPanel(); setupIb(); }
    var tr = document.querySelector(".ibtrend"); if (tr) tr.outerHTML = ibTrend();
    var s = document.querySelector(".ibstrip, .ibstrip-slot");
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
      pbf: grab(/체\s*지\s*방\s*률|percent\s*body\s*fat|PBF/, 1, 75)
    };
    if (r.smm !== null && r.w !== null && r.smm >= r.w) r.smm = null;
    if (r.w !== null && r.pbf !== null && r.bfm !== null && Math.abs(r.w * r.pbf / 100 - r.bfm) > Math.max(1.5, r.bfm * 0.15)) r.bfm = null;
    if (r.w !== null && r.bfm !== null && r.pbf === null) r.pbf = Math.round(r.bfm / r.w * 1000) / 10;
    var dm = t.match(/(20\d{2})\s*[.\-\/년]\s*(\d{1,2})\s*[.\-\/월]\s*(\d{1,2})/);
    if (dm) {
      var dd = new Date(+dm[1], +dm[2] - 1, +dm[3]), now = new Date();
      if (dd <= now && now - dd < 400 * 86400000) r.d = ymd(dd);
    }
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
      '<label class="ibs-file"><input type="file" id="ibFile" accept="image/*"><span class="ibs-ph"><b>결과지 사진 찍기 · 고르기</b><small>사진을 올리면 숫자를 자동으로 읽어 채워요</small></span><img alt="" hidden></label>' +
      '<label class="ibs-f"><span>측정한 날</span><input type="date" id="ibDate" value="' + ymd(new Date()) + '" max="' + ymd(new Date()) + '"></label>' +
      '<p class="ibs-hint">결과지 맨 위 <b>체성분분석 · 골격근·지방분석</b> 칸의 숫자를 넣어요</p>' +
      '<div class="ibs-nums">' +
      '<label class="ibs-f"><span>체중 <em>kg</em></span><input id="ibW" inputmode="decimal" placeholder="예 72.4" autocomplete="off"></label>' +
      '<label class="ibs-f"><span>골격근량 <em>kg</em></span><input id="ibS" inputmode="decimal" placeholder="예 31.2" autocomplete="off"></label>' +
      '<label class="ibs-f"><span>체지방량 <em>kg</em></span><input id="ibB" inputmode="decimal" placeholder="비우면 자동" autocomplete="off"></label>' +
      '<label class="ibs-f"><span>체지방률 <em>%</em></span><input id="ibP" inputmode="decimal" placeholder="예 21.5" autocomplete="off"></label>' +
      '</div><p class="ibs-msg" role="alert"></p>' +
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
      msg.textContent = "사진 준비 중…";
      ibShrink(f, 1800).then(function (d) {
        b64 = d; pv.src = "data:image/jpeg;base64," + d; pv.hidden = false;
        wrap.querySelector(".ibs-ph").hidden = true; msg.textContent = "";
        if (!ATT_API) return;
        var my = ++ocrRun;
        msg.className = "ibs-msg info"; msg.textContent = "결과지 숫자 읽는 중… (몇 초 걸려요)";
        fetch(ATT_API, { method: "POST", body: JSON.stringify({ a: "inbody_ocr", m: SLUG, img: d }) })
          .then(function (r) { return r.json(); })
          .then(function (j) {
            if (my !== ocrRun || !wrap.isConnected) return;
            if (!j || !j.ok) throw new Error(j && j.error || "ocr");
            var r = ibParse(j.text), got = 0;
            [["#ibW", "w"], ["#ibS", "smm"], ["#ibB", "bfm"], ["#ibP", "pbf"]].forEach(function (x) {
              var inp = wrap.querySelector(x[0]);
              if (r[x[1]] !== null && r[x[1]] !== undefined && !inp.value) { inp.value = ibFmt(r[x[1]]); inp.classList.add("auto"); got++; }
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
      if (bf !== null && !(bf > 0 && bf < w)) { msg.textContent = "체지방량을 확인해 주세요 (모르면 비워 두세요)"; return; }
      if (!ATT_API) { msg.textContent = "저장할 곳이 아직 준비 안 됐어요"; return; }
      busy = true; form.classList.add("saving"); msg.className = "ibs-msg info"; msg.textContent = "저장하는 중…";
      fetch(ATT_API, { method: "POST", body: JSON.stringify({ a: "inbody_add", m: SLUG, n: M._real || M.name, d: d, w: w, smm: s, bfm: bf, pbf: pf, img: b64 || "" }) })
        .then(function (r) { return r.json(); })
        .then(function (j) {
          if (!j || !j.ok) throw new Error(j && j.error || "save");
          ibSet(j.inbody); close(); ibRefresh(); attToast("인바디 기록을 저장했어요");
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
    var h = '<div class="hero"><div class="hero-main"><div class="hero-l"><div class="eyebrow">MY BODY <b>· 몸 변화 기록</b></div>' +
      '<h1>몸 변화 기록</h1><div class="en">' + esc(M.name) + ' 회원님 · 인바디로 지난달과 비교해요</div>' +
      '<div class="who"><strong>한 달에 한 번</strong><span>담당 장동욱 트레이너</span></div></div></div>' +
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
     - 배지 12개(목표 탭 03): 출석 횟수 1·10·30·50·100 / 연속 출석 3·7·14 / 새벽 운동(7시 전) / 주말 전사(토·일 둘 다) /
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
  var BG_N = "#1F3864", BG_P = "#DB4C8C", BG_G = "#A87508", BG_GOLD = "#E3B341", BG_GREY = "#C9D0DC";
  var BG_TIER = ["", "한 줄 테두리", "두 겹 테두리", "금빛 월계수", "금빛 리본"];
  var BG_SEEN = "ptnote:" + SLUG + ":badges";
  var BG_IC = {
    check: '<path d="M5 12.5l4.5 4.5L19 7.5" stroke-width="2.6"/>',
    flame: '<path d="M12 3c1 3.5 5 5.5 5 10a5 5 0 0 1-10 0c0-2.4 1.3-4 2.6-5.2.3 1.6 1 2.6 2.1 3.2C11.3 8.6 11.2 5.6 12 3z"/>',
    sun: '<path d="M4 18h16"/><path d="M7 18a5 5 0 0 1 10 0"/><path d="M12 6v3"/><path d="M5.6 10.6l1.8 1.4"/><path d="M18.4 10.6l-1.8 1.4"/>',
    cal: '<rect x="4" y="5" width="16" height="15" rx="2.5"/><path d="M4 10h16"/><path d="M8 3v4"/><path d="M16 3v4"/>',
    scale: '<rect x="4" y="4" width="16" height="16" rx="4"/><path d="M8.5 10a3.5 3.5 0 0 1 7 0"/><path d="M12 10l1.6-1.6"/>',
    up: '<path d="M12 19V6"/><path d="M6.5 11.5L12 6l5.5 5.5"/><path d="M5 20h14"/>'
  };
  var LAUREL = '<g transform="translate(17 57) rotate(45)"><ellipse rx="3" ry="6.5"/></g><g transform="translate(8.5 44) rotate(20)"><ellipse rx="3" ry="6.5"/></g>' +
    '<g transform="translate(6.5 29) rotate(-5)"><ellipse rx="3" ry="6.5"/></g><g transform="translate(11 15) rotate(-30)"><ellipse rx="3" ry="6"/></g>' +
    '<g transform="translate(67 57) rotate(-45)"><ellipse rx="3" ry="6.5"/></g><g transform="translate(75.5 44) rotate(-20)"><ellipse rx="3" ry="6.5"/></g>' +
    '<g transform="translate(77.5 29) rotate(5)"><ellipse rx="3" ry="6.5"/></g><g transform="translate(73 15) rotate(30)"><ellipse rx="3" ry="6"/></g>';
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
  function badgeList() {
    var a = attLoad().slice().sort(), hs = attHistory(), cur = attStreak(attLoad()), L = [];
    function att(n, tier) {
      return { id: "att" + n, line: "att", label: n === 1 ? "첫 출석" : "출석 " + n + "회", tier: tier, kind: n === 1 ? "check" : "num", num: n, color: BG_N,
        on: a[n - 1] || null, have: a.length, goal: n,
        desc: n === 1 ? "PT 노트 첫 출석 체크! 시작이 반이에요." : "출석 " + n + "번 달성! 꾸준함이 몸을 바꿔요." };
    }
    function stk(n, tier) {
      return { id: "stk" + n, line: "stk", label: "연속 " + n + "회", tier: tier, kind: "flame", pill: n >= 7 ? n : null, color: BG_P,
        on: hs.first[n] || null, have: cur, goal: n,
        desc: "운동하는 날 " + n + "번 연속으로 한 번도 안 빠졌어요." };
    }
    var dawn = null, wk = null, ib = null, lv = null;
    a.forEach(function (k) {
      if (!dawn && attTimes[k] && attTimes[k] < "07:00") dawn = k;
      var p = k.split("-"), d = new Date(+p[0], +p[1] - 1, +p[2]);
      if (!wk && d.getDay() === 0) { var s = new Date(d); s.setDate(s.getDate() - 1); if (attHas(a, ymd(s))) wk = k; }
    });
    if (ibData && ibData.length) ib = ibData.map(function (r) { return r.d; }).sort()[0];
    var ver = M.routine && parseInt(String(M.routine.version || "").replace(/\D/g, ""), 10);
    if (ver >= 2) {
      var um = String(M.routine.updated || "").match(/(\d{4})\D+(\d{1,2})\D+(\d{1,2})/);
      lv = um ? um[1] + "-" + pad2(+um[2]) + "-" + pad2(+um[3]) : ymd(new Date());
    }
    L.push(att(1, 1), att(10, 1), att(30, 2), att(50, 3));
    L.push(stk(3, 1), stk(7, 2), stk(14, 3), att(100, 4));
    L.push({ id: "dawn", label: "새벽 운동", tier: 2, kind: "sun", color: BG_G, on: dawn, hint: "7시 전 출석", desc: "아침 7시 전에 출석했어요. 하루를 먼저 이긴 사람!" });
    L.push({ id: "wkend", label: "주말 전사", tier: 2, kind: "cal", color: BG_G, on: wk, hint: "토·일 둘 다", desc: "토·일 둘 다 나왔어요. 주말에도 멈추지 않아요!" });
    if (IB_ON) L.push({ id: "ib1", label: "첫 인바디", tier: 1, kind: "scale", color: BG_N, on: ib, hint: "인바디 올리기", desc: "첫 인바디 기록 완료! 이제 변화를 숫자로 봐요." });
    else L.push(stk(30, 4));
    L.push({ id: "lvup", label: "루틴 레벨업", tier: 2, kind: "up", color: BG_N, on: lv, hint: "새 루틴 받기", desc: "새 루틴을 받았어요. 한 단계 올라간 거예요!" });
    ["att", "stk"].forEach(function (ln) {   /* 줄마다 다음 목표 하나만 분홍 글씨 */
      for (var i = 0; i < L.length; i++) if (L[i].line === ln && !L[i].on) { L[i].next = true; break; }
    });
    return L;
  }
  function bgNextOf(b, L) {   /* 같은 줄의 다음 배지 */
    if (!b.line) return null;
    var c = L.filter(function (x) { return x.line === b.line && x.goal > b.goal; }).sort(function (x, y) { return x.goal - y.goal; });
    return c[0] || null;
  }
  function bgIcon(b, gap) {   /* 84×72 배지 그림 (동그라미 60) — 링은 SVG라서 이미지로 저장해도 그대로 */
    var on = !!b.on, t = b.tier, ring = on ? BG_GOLD : BG_GREY;
    var base = on ? (t === 4 ? BG_GOLD : b.color) : "#E6EAF1", ic = on ? (t === 4 ? BG_N : "#FFFFFF") : "#A3AABA";
    var s = '<svg class="bdg-s" viewBox="0 0 84 72" width="84" height="72" aria-hidden="true">';
    if (t >= 3) s += '<g fill="' + ring + '">' + LAUREL + '</g>';
    if (t === 4) s += '<polygon points="31,50 40,55 34,71 28,65" fill="' + (on ? BG_P : BG_GREY) + '"/><polygon points="53,50 44,55 50,71 56,65" fill="' + (on ? BG_N : BG_GREY) + '"/>';
    if (t >= 2) s += '<circle cx="42" cy="32" r="33.75" fill="' + (gap || "#fff") + '" stroke="' + ring + '" stroke-width="2.5"/>';
    s += '<circle cx="42" cy="32" r="30" fill="' + base + '"/>';
    s += t === 1 ? '<circle cx="42" cy="32" r="28.75" fill="none" stroke="' + ring + '" stroke-width="2.5"/>'
      : '<circle cx="42" cy="32" r="28.5" fill="none" stroke="' + (t === 4 ? (on ? "#F8E3A6" : "#F3F5F9") : ring) + '" stroke-width="3"/>';
    if (b.kind !== "num") s += '<g transform="translate(' + bgT(b) + ') scale(' + bgSc(b) + ')" fill="none" stroke="' + ic + '" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round">' + BG_IC[b.kind] + '</g>';
    if (t === 4 && on) s += '<g transform="translate(64 0)"><path class="bdg-spark" d="M7 0 L8.4 5.6 L14 7 L8.4 8.4 L7 14 L5.6 8.4 L0 7 L5.6 5.6 Z" fill="' + BG_GOLD + '"/></g>' +
      '<g transform="translate(2 50)"><path class="bdg-spark s2" d="M4 0 L4.8 3.2 L8 4 L4.8 4.8 L4 8 L3.2 4.8 L0 4 L3.2 3.2 Z" fill="' + BG_GOLD + '"/></g>';
    s += '</svg>';
    var num = b.kind === "num" ? '<span class="bdg-n' + (String(b.num).length > 2 ? ' sm' : '') + '" style="color:' + ic + '">' + b.num + '</span>' : '';
    var pill = b.pill ? '<span class="bdg-p" style="background:' + (on ? BG_GOLD : BG_GREY) + ';color:' + (on ? BG_N : "#fff") + ';border-color:' + (gap || "#fff") + '">' + b.pill + '</span>' : '';
    /* 받은 배지는 등급이 오를수록 LED처럼 빛남 (2026-11-08): Lv.2 은은한 금빛 숨쉬기 → Lv.3 + 반짝 빛 지나감 → Lv.4 + 금·분홍 그라데이션 링이 돌고 별이 반짝 */
    var fx = on && t >= 2 ? (t === 4 ? '<span class="bdg-ring" aria-hidden="true"></span>' : '') + '<span class="bdg-glow" aria-hidden="true"></span>' : '';
    var sw = on && t >= 3 ? '<span class="bdg-fx" aria-hidden="true"></span>' : '';
    return '<span class="bdg lv' + t + (on ? ' on' : '') + '">' + fx + s + sw + num + pill + '</span>';
  }
  function bgSc(b) { return b.kind === "sun" ? 1.1667 : 1.0833; }
  function bgT(b) { var o = 42 - 12 * bgSc(b), o2 = 32 - 12 * bgSc(b); return o.toFixed(2) + " " + o2.toFixed(2); }
  function bgSub(b) {
    if (b.on) return '<small>' + md(b.on) + '</small>';
    if (b.line) return '<small class="' + (b.next ? 'pg' : '') + '">' + Math.min(b.have, b.goal) + ' / ' + b.goal + '</small>';
    return '<small>' + esc(b.hint || "") + '</small>';
  }
  function badgeSection(num) {
    var L = badgeList(), got = L.filter(function (b) { return b.on; }).length;
    var cand = L.filter(function (b) { return b.next; }).sort(function (x, y) { return (x.goal - x.have) - (y.goal - y.have) || (x.line === "att" ? -1 : 1); });
    var nx = cand[0], card;
    if (nx) {
      var left = Math.max(1, nx.goal - nx.have), pct = Math.min(100, Math.round(nx.have / nx.goal * 1000) / 10);
      card = '<div class="panel bgnext"><span class="bgn-ic' + (nx.kind === "flame" ? ' fl' : '') + '" aria-hidden="true">' +
        (nx.kind === "flame" ? '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round">' + BG_IC.flame + '</svg>' : nx.goal) + '</span>' +
        '<div class="bgn-t"><div class="bgn-h"><b>다음 배지 · ' + esc(nx.label) + ' <small>Lv.' + nx.tier + '</small></b><span>' +
        (nx.line === "stk" ? '연속 ' + left + '번 더!' : left + '번 남았어요') + '</span></div>' +
        '<i class="bgn-bar"><em style="width:' + pct + '%"></em></i>' +
        '<p>' + (nx.line === "stk" ? '지금 연속 ' + nx.have + '회째' : '지금 ' + nx.have + '회') + ' · 받으면 ' + BG_TIER[nx.tier] + ' 배지예요</p></div></div>';
    } else {
      card = '<div class="panel bgnext done"><span class="bgn-ic" aria-hidden="true">★</span><div class="bgn-t"><div class="bgn-h"><b>출석 배지를 다 모았어요!</b></div><p>정말 대단해요. 선생님이 새 배지를 준비할게요</p></div></div>';
    }
    var grid = L.map(function (b, i) {
      return '<button type="button" class="bgc' + (b.on ? ' on' : '') + '" data-i="' + i + '" aria-label="' + esc(b.label) + (b.on ? ' 받음' : ' 아직') + '">' +
        bgIcon(b) + '<b>' + esc(b.label) + '</b>' + bgSub(b) + '</button>';
    }).join("");
    return '<section id="badges" data-num="' + num + '">' + head(num, "나의 배지", "많이 올수록 더 화려해져요", '<span class="more bg-cnt"><b>' + got + '</b> / ' + L.length + '</span>') +
      card + '<div class="panel bggrid">' + grid + '</div>' +
      '<p class="bg-tiers"><span>Lv.1 한 줄</span><span>Lv.2 두 겹</span><span>Lv.3 월계수</span><span class="g">Lv.4 금빛 리본</span></p></section>';
  }
  function setupBadges() {
    Array.prototype.forEach.call(document.querySelectorAll(".bgc"), function (el) {
      el.addEventListener("click", function () {
        var L = badgeList(), b = L[+el.getAttribute("data-i")];
        if (!b) return;
        var p = b.on ? b.on.split("-") : null;
        attToast(b.label + " · Lv." + b.tier + " — " + (p ? (+p[1]) + "월 " + (+p[2]) + "일에 받았어요" :
          b.line === "stk" ? "운동하는 날 " + b.goal + "번 연속으로 오면 받아요" : b.line ? (b.goal - b.have) + "번 더 오면 받아요" :
          b.id === "dawn" ? "아침 7시 전에 출석하면 받아요" : b.id === "wkend" ? "토요일·일요일 둘 다 오면 받아요" :
          b.id === "ib1" ? "몸변화 탭에서 인바디를 올리면 받아요" : "선생님이 새 루틴을 올려 주면 받아요"));
      });
    });
  }
  var bgReady = false;
  function badgeCheck() {   /* 새로 받은 배지가 있으면 팝업 한 번 */
    bgReady = true;
    if (DEMO || COACH_MODE) return;
    if (document.querySelector(".npop-wrap, .bgpop-wrap, .ibsheet")) { setTimeout(badgeCheck, 6500); return; }
    var L = badgeList(), seen = lsArr(BG_SEEN);
    var fresh = L.filter(function (b) { return b.on && seen.indexOf(b.id) < 0; });
    if (!fresh.length) return;
    lsAdd(BG_SEEN, fresh.map(function (b) { return b.id; }));
    fresh.sort(function (x, y) { return y.tier - x.tier || (y.on > x.on ? 1 : y.on < x.on ? -1 : 0); });
    showBadgePop(fresh[0], fresh.length - 1, L);
  }
  function showBadgePop(b, extra, L) {
    var got = L.filter(function (x) { return x.on; }).length, nx = bgNextOf(b, L);
    var hint = nx ? '다음은 <b>' + esc(nx.label) + '</b> · ' + BG_TIER[nx.tier] + ' 배지(Lv.' + nx.tier + ')예요!' : b.line ? '이 줄의 마지막 배지까지 받았어요!' : '';
    var conf = "", cols = ["#E3B341", "#F27BB0", "#5BD08A", "#FFFFFF", "#8FB1FF"];
    for (var i = 0; i < 22; i++) {
      conf += '<i style="left:' + (4 + (i * 41) % 92) + '%;background:' + cols[i % 5] + ';animation-delay:' + ((i * 0.13) % 1.4).toFixed(2) + 's;animation-duration:' + (2.4 + (i % 4) * 0.35).toFixed(2) + 's' +
        (i % 3 === 0 ? ';border-radius:50%;width:8px;height:8px' : '') + '"></i>';
    }
    var box = document.createElement("div");
    box.className = "bgpop-wrap";
    box.innerHTML = '<div class="bgpop-conf" aria-hidden="true">' + conf + '</div>' +
      '<div class="bgpop" role="dialog" aria-modal="true" aria-labelledby="bgpopT">' +
      '<div class="bgpop-medal">' + bgIcon(b) + '</div>' +
      '<small class="bgpop-k">NEW BADGE</small><h3 id="bgpopT">새 배지를 받았어요!</h3>' +
      '<span class="bgpop-chip">' + esc(b.label) + ' · Lv.' + b.tier + '</span>' +
      '<p>' + esc(b.desc) + (hint ? '<br>' + hint : '') + (extra > 0 ? '<br><em>외 ' + extra + '개도 함께 받았어요</em>' : '') + '</p>' +
      '<div class="bgpop-bar"><div><span>모은 배지</span><b>' + got + ' / ' + L.length + '</b></div><i><em style="width:' + Math.round(got / L.length * 100) + '%"></em></i></div>' +
      '<a class="bgpop-go" href="#goal-badges">내 배지 보러 가기</a><button type="button" class="bgpop-x">닫기</button></div>';
    document.body.appendChild(box);
    requestAnimationFrame(function () { requestAnimationFrame(function () { box.classList.add("in"); }); });
    function close() { box.classList.remove("in"); setTimeout(function () { if (box.parentNode) box.parentNode.removeChild(box); }, 300); }
    box.querySelector(".bgpop-x").addEventListener("click", close);
    box.querySelector(".bgpop-go").addEventListener("click", function () { close(); });
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
    [/스쿼트|레그\s?프레스|런지|스텝\s?업/, ["thigh", "glute"]],
    [/이너\s?타이|어덕/, ["thigh"]],
    [/아웃\s?타이|힙|글루트|브릿지|어브덕/, ["glute"]],
    [/페이스\s?풀|리버스\s?펙덱|리어\s?델트/, ["shoulder"]],
    [/레터럴|숄더|밀리터리|프론트\s?레이즈|업라이트/, ["shoulder"]],
    [/슈러그|풀다운|로우|풀업|턱걸이|풀오버|백\s?익스텐션/, ["back"]],
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
    return dayByKey(DAY_KEYS[new Date(+p[0], +p[1] - 1, +p[2]).getDay()]);
  }
  function muscleCounts(ym) {
    var a = attLoad().slice().sort(), cnt = {}, days = 0;
    MG.forEach(function (g) { cnt[g[0]] = 0; });
    a.forEach(function (k) {
      if (k.slice(0, 7) !== ym) return;
      days++;
      dayGroups(dayOfDate(k, a)).forEach(function (g) { cnt[g]++; });
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
    return '<div class="mm-fig"><img src="' + src + 'base.png" alt="' + esc(alt) + '">' +
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
    return '<section id="muscle" data-num="' + num + '">' + head(num, "이번 달 근육 지도", "출석한 날 루틴 부위가 하나씩 칠해져요", '<a class="more" href="#report">' + (now.getMonth() + 1) + '월 리포트 →</a>') +
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
    if (cm) { quote = esc(cm).replace(/\n/g, "<br>"); qwho = "장동욱 트레이너의 한마디"; }
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
    var bdgs = R.badges.slice(0, 4).map(function (b) { return bgIcon(b, "#17294B"); }).join("");
    return '<div class="rp" id="rp"><i class="rp-stripe"></i><i class="rp-c1"></i><i class="rp-c2"></i>' +
      '<div class="rp-top"><div class="rp-brand"><b>GYMTOS</b><span>도당점</span></div><span class="rp-k">MONTHLY REPORT · ' + R.y + '. ' + pad2(R.mo) + '</span></div>' +
      '<div class="rp-title"><span>' + esc(M.name) + ' 회원님의</span><h2>' + R.mo + '월 운동 리포트</h2>' + (R.live ? '<em>' + R.upto + ' 기준 · 진행 중</em>' : '') + '</div>' +
      '<div class="rp-tiles">' + tile("출석", R.done, "회", "pk") + tile("출석률", R.rate, "%") + tile("최고 연속", R.best, "회") + tile("새 배지", R.badges.length, "개", "gd") + '</div>' +
      '<div class="rp-mid"><div class="rp-map"><h4>' + R.mo + '월 근육 지도</h4>' + mmFigure(R.mc.cnt, R.mo + "월 근육 지도") +
      '<p>' + (top.length ? '가장 많이 한 부위 · ' + top.slice(0, 2).map(function (t) { return t.name; }).join(" · ") : '출석하면 부위가 색칠돼요') + '</p></div>' +
      '<div class="rp-side">' + right + '<div class="rp-box rp-bd"><h4>' + (R.badges.length ? '이번 달 받은 배지' : '이번 달 배지') + '</h4>' +
      (bdgs ? '<div class="rp-bds">' + bdgs + '</div>' : '<p>다음 달엔 배지 하나 받아 봐요!</p>') + '</div></div></div>' +
      '<div class="rp-quote"><span aria-hidden="true">“</span><div><p>' + quote + '</p><small>' + qwho + '</small></div></div>' +
      '<div class="rp-foot"><span><b>MY PT NOTE</b> · 나만의 운동 노트</span><span>GYMTOS 도당점 · 담당 장동욱 트레이너</span></div></div>';
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
      var name = "PT리포트-" + (location.hash.match(/\d{4}-\d{2}/) || [ymOf(new Date())])[0] + ".png";
      var holder = document.createElement("div");
      holder.style.cssText = "position:fixed;left:-12000px;top:0;width:1080px;height:1350px;overflow:hidden";
      var c = r.cloneNode(true); c.removeAttribute("id"); c.style.transform = "none";
      Array.prototype.forEach.call(c.querySelectorAll(".bdg-fx, .bdg-ring"), function (x) { x.remove(); });   /* 움직이는 효과는 그림에선 빼고 */
      holder.appendChild(c); document.body.appendChild(holder);
      var fontsReady = document.fonts && document.fonts.ready ? document.fonts.ready : Promise.resolve();
      fontsReady.then(loadH2C).then(function (h2c) {
        return h2c(c, { scale: 1, width: 1080, height: 1350, backgroundColor: "#0F1B33", useCORS: true, logging: false });
      }).then(function (cv) {
        holder.remove();
        cv.toBlob(function (blob) {
          b.disabled = false; b.classList.remove("saving");
          var url = cv.toDataURL("image/png");
          var file = null;
          try { file = new File([blob], name, { type: "image/png" }); } catch (e) {}
          if (file && navigator.canShare && navigator.canShare({ files: [file] })) {
            navigator.share({ files: [file], title: M.name + " 회원님 월간 리포트" }).catch(function (e) { if (!e || e.name !== "AbortError") rpShow(url, name); });
          } else rpShow(url, name);
        }, "image/png");
      }).catch(function () {
        holder.remove(); b.disabled = false; b.classList.remove("saving");
        attToast("그림을 못 만들었어요. 인터넷 연결을 확인해 주세요");
      });
    });
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
      return '<li><span class="mini-ic' + (it.tag === "메인" ? " main" : "") + '">' + img(iconOf(it)) + '<span class="n">' + (i + 1) + '</span></span>' + esc(it.name) +
        (it.tag ? ' ' + tagChip(it.tag) : '') + '</li>';
    }).join("") + '</ul>';
  }
  function renderHome() {
    var k = todayKey(), d = dayByKey(k);
    var h = '<div class="hero"><div class="hero-main"><div class="hero-l hero-home"><div class="hh-text">' +
      '<div class="eyebrow">MY PT NOTE <b>· 나만의 운동 노트</b></div>' +
      '<h1>' + esc(M.name) + ' 회원님</h1>' +
      '<div class="en">' + esc(M.goal || "") + '</div>' +
      '<div class="who"><span>GYMTOS 도당점 · 장동욱 트레이너</span></div>' +
      '</div>' + attCheckStrip() + '</div></div></div>';

    h += reportHomeCard();
    h += journeyHome();
    if (IB_ON) h += ibHomeStrip() || '<span class="ibstrip-slot"></span>';
    h += '<section>' + head("", ROT ? "오늘 할 운동" : "오늘의 운동", ROT ? dayName(k) + " 차례" : DAY_KO[k] + "요일", '<a class="more" href="#routine-' + k + '">자세히 →</a>');
    if (!d) {
      h += '<div class="panel empty"><h3>루틴이 아직 없어요</h3><p>선생님이 곧 올려드릴게요</p></div>';
    } else if (d.rest) {
      h += '<div class="panel today"><div class="today-top"><div class="today-ic">' + img("rest") + '<span>' + d.day + '</span></div><div><small>REST DAY</small><h3>오늘은 쉬는 날!</h3></div></div>' +
        '<p style="margin:0;color:var(--sub);font-size:14px">푹 쉬고 잘 먹는 것도 운동이에요</p></div>';
    } else if (d.cardio_only) {
      h += '<div class="panel today"><div class="today-top"><div class="today-ic">' + img("treadmill") + '<span>' + d.day + '</span></div><div><small>CARDIO DAY</small><h3>오늘은 유산소만!</h3></div></div>' +
        '<p style="margin:0;color:var(--sub);font-size:14px">유산소 ' + d.cardio_only + '분' + (M.routine.cardio ? ' · ' + esc(M.routine.cardio.options) : '') + '</p>' +
        '<a class="btn fill" href="#routine-' + k + '" style="align-self:flex-start">오늘 운동 보기</a></div>';
    } else if (d.pick) {
      h += '<div class="panel today"><div class="today-top"><div class="today-ic">' + img("dumbbell") + '<span>' + d.day + '</span></div><div><small>' + esc(d.en.toUpperCase()) + '</small><h3>오늘은 골라서 하는 날!</h3></div></div>' +
        '<p style="margin:0;color:var(--sub);font-size:14px">' + esc(d.note || "이번 주에 아쉬웠던 부위 하나를 골라 그 요일 루틴 그대로 해요") + '</p>' +
        '<a class="btn fill" href="#routine-' + k + '" style="align-self:flex-start">부위 고르러 가기</a></div>';
    } else {
      h += '<div class="panel today"><div class="today-top"><div class="today-ic">' + img(iconOf(mainItem(d))) + '<span>' + (ROT ? k.slice(1) : d.day) + '</span></div><div><small>' + esc(d.en.toUpperCase()) + '</small><h3>' + esc(d.part) + ' 하는 날</h3></div></div>' +
        exMini(d) + (d.cardio && M.routine.cardio ? '<p style="margin:0;font-size:13.5px;color:var(--sub)">+ 마무리 유산소 ' + M.routine.cardio.minutes + '분</p>' : '') +
        '<a class="btn fill" href="#routine-' + k + '" style="align-self:flex-start">오늘 운동 보기</a>' +
        (ROT ? '<p class="rot-hint">출석 체크한 날을 세서 다음 순서를 알려줘요. 순서가 다르면 루틴 탭에서 그날 DAY를 눌러요</p>' : '') + '</div>';
    }
    h += '</section>';

    if (M.next_class) {
      h += '<div class="panel next"><svg width="40" height="40" viewBox="0 0 40 40" aria-hidden="true"><rect x="4" y="7" width="32" height="29" rx="6" fill="var(--primary)"/><rect x="4" y="7" width="32" height="9" rx="4" fill="var(--side)"/><rect x="11" y="3" width="4" height="9" rx="2" fill="var(--key)"/><rect x="25" y="3" width="4" height="9" rx="2" fill="var(--key)"/></svg>' +
        '<div><small style="font-size:12px;color:var(--faint);font-weight:700">다음 PT 수업</small><b>' + esc(M.next_class) + '</b></div></div>';
    }

    if (M.notices && M.notices.length) {
      var n = M.notices[0];
      h += '<section>' + head("", "선생님 공지", "", '<a class="more" href="#notice">전체 →</a>') + noticeCard(n) + '</section>';
    }

    h += '<section>' + head("", "최근 자세 복습지", "", '<a class="more" href="#forms">전체 →</a>');
    h += M.forms.length ? '<div class="flist">' + M.forms.slice(0, 2).map(formCard).join("") + '</div>'
      : '<div class="panel empty"><h3>아직 복습지가 없어요</h3><p>수업에서 배운 자세가 여기에 쌓여요</p></div>';
    h += '</section>';
    return h + remember();
  }

  /* ---------------- 공지 */
  function noticeCard(n) {
    return '<div class="panel notice" data-nkey="' + esc(nKey(n)) + '"><time>' + esc(n.date) + '</time><h3>' + esc(n.title) + '</h3><p>' + esc(n.body) + '</p>' +
      (n.link ? '<a class="btn" href="#' + esc(n.link) + '">바로 보기</a>' : '') + '</div>';
  }
  function renderNotice() {
    var h = '<section>' + head("", "선생님 공지", "새 소식이 위에 있어요");
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
    var a = document.querySelector('.tabs a[data-tab="notice"]');
    if (a) a.classList.toggle("has-new", nUnseen().length > 0);
  }
  function nMarkSeen() { lsAdd(NSEEN_KEY, (M.notices || []).map(nKey)); lsAdd(NPOP_KEY, (M.notices || []).map(nKey)); nDot(); }
  function openNotice(key) {
    pendingNotice = key;
    if ((location.hash || "").replace(/^#/, "") === "notice") route(); else location.hash = "notice";
  }
  function showNoticePop() {
    var popped = lsArr(NPOP_KEY);
    var list = nUnseen().filter(function (n) { return popped.indexOf(nKey(n)) < 0; });
    if (!list.length) return;
    var n = list[0], extra = list.length - 1, d = nDate(n);
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
    btn.addEventListener("click", function () { if (swiped) return; hide(); openNotice(nKey(n)); });
    /* 위로 밀면 바로 닫힘 */
    btn.addEventListener("touchstart", function (e) { sy = e.touches[0].clientY; }, { passive: true });
    btn.addEventListener("touchmove", function (e) {
      if (sy != null && e.touches[0].clientY - sy < -24) { swiped = true; sy = null; hide(); }
    }, { passive: true });
  }

  /* ---------------- 복습지 목록 */
  function formCard(f) {
    return '<a class="card-link" href="#form-' + esc(f.id) + '"><div class="thumb"><img src="' + esc(f.dir) + 'poster.jpg" alt="" loading="lazy"></div>' +
      '<div><span class="tagc">' + esc(f.part) + '</span><h3>' + esc(f.exercise) + '</h3><p>' + esc(f.exercise_en) + ' · ' + esc(f.date) + '</p></div></a>';
  }
  function renderForms() {
    var h = '<section>' + head("", "자세 복습지", "수업에서 배운 자세를 영상으로 다시 봐요");
    h += M.forms.length ? '<div class="flist">' + M.forms.map(formCard).join("") + '</div>' :
      '<div class="panel empty"><h3>아직 복습지가 없어요</h3><p>수업에서 배운 자세가 여기에 쌓여요</p></div>';
    return h + '</section>' + remember();
  }

  /* ---------------- 복습지 상세 */
  function renderForm(f) {
    var D = f.dir;
    var h = '<a class="back" href="#forms">← 복습지 목록</a>';
    h += '<div class="hero"><div class="hero-main split"><div class="hero-l">' +
      '<div class="eyebrow">MY FORM NOTE <b>· 자세 복습지</b></div><h1>' + esc(f.exercise) + '</h1>' +
      '<div class="en">' + esc(f.exercise_en) + '</div>' +
      '<div class="who"><strong>' + esc(f.member || M.name) + ' 회원님</strong><span>' + esc(f.date) + '</span></div></div>' +
      '<div class="hero-r"><div class="eyebrow">오늘의 타깃</div><ul class="dots">' +
      f.targets.map(function (t) { return '<li>' + esc(t) + '</li>'; }).join("") + '</ul>' +
      '<div class="benefit">' + esc(f.benefit) + '</div></div></div>' +
      '<div class="keypoint"><small>KEY POINT</small><p>' + esc(f.key_point) + '</p></div></div>';

    h += '<section>' + head("01", "오늘 내 자세", "영상으로 확인해요") +
      '<div class="player"><video id="main" poster="' + esc(D) + 'poster.jpg" autoplay muted loop playsinline webkit-playsinline preload="auto" data-src="' + esc(D) + 'form.mp4" data-gif="' + esc(D) + 'form.webp"></video>' +
      '<img id="gifFallback" alt="오늘 수업 영상 (반복 재생)" hidden>' +
      '<span class="chip">▶ 오늘 수업 영상</span><button class="tapper" id="tap" type="button" aria-label="영상 재생 / 멈춤"></button>' +
      '<div class="paused-badge" id="pbadge" hidden></div></div>' +
      '<div class="controls" id="controls" role="group" aria-label="재생 속도"><button class="btn" id="playBtn" type="button">⏸ 멈춤</button>' +
      '<button class="btn" type="button" data-rate="0.5" aria-pressed="false">느리게 0.5배</button>' +
      '<button class="btn" type="button" data-rate="1" aria-pressed="true">보통 속도</button></div>' +
      '<p class="hint" id="hint">영상을 누르면 멈추고, 다시 누르면 재생돼요</p></section>';

    h += '<section>' + head("02", "오늘 잘한 점", "이대로만 하면 돼요") + '<div class="cards3">' +
      f.good_points.map(function (g, i) {
        return '<div class="good"><div class="tag">' + CHECK + 'POINT ' + (i + 1) + '</div><h3>' + esc(g.title) + '</h3><p>' + esc(g.desc) + '</p></div>';
      }).join("") + '</div></section>';

    h += '<section>' + head("03", "자극 부위", "여기에 자극이 와야 정상이에요") + '<div class="muscle">' +
      '<img src="' + esc(D) + 'anatomy.png" alt="자극 부위 인체 그림: 진한 분홍은 주동근, 연한 분홍은 보조근" loading="lazy"><div class="mcol">' +
      '<div class="mgroup"><div class="mrow"><span class="mchip p">주동근</span>여기가 메인!</div>' +
      f.primary_muscles.map(function (m) { return '<p class="mname">' + esc(m.name) + '<span>' + esc(m.where) + '</span></p>'; }).join("") + '</div>' +
      '<div class="mgroup"><div class="mrow"><span class="mchip s">보조근</span>같이 도와줘요</div><p class="mname s2">' + esc(f.secondary_muscles) + '</p></div>' +
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

  function setupPlayer() {
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
  function renderRoutine(sel) {
    var R = M.routine;
    if (!R) return '<section>' + head("", "주간 루틴", "") + '<div class="panel empty"><h3>루틴이 아직 없어요</h3><p>선생님이 곧 올려드릴게요</p></div></section>' + remember();
    var tk = todayKey();
    sel = sel || tk;
    var h = '<div class="hero"><div class="hero-main split"><div class="hero-l">' +
      '<div class="eyebrow">' + (ROT ? 'ROTATION ROUTINE <b>· 순환 루틴 ' : 'WEEKLY ROUTINE <b>· 주간 루틴 ') + esc(R.version) + '</b></div><h1>' + esc(R.title) + '</h1>' +
      '<div class="who"><strong>' + esc(M.name) + ' 회원님</strong><span>' + esc(R.updated) + ' 업데이트</span></div></div>' +
      '<div class="hero-r"><div class="eyebrow">이번 주 계획</div><ul class="dots small">' +
      R.plan.map(function (p) { return '<li>' + esc(p) + '</li>'; }).join("") + '</ul></div></div>' +
      '<div class="keypoint"><small>KEY POINT</small><p>' + esc(R.key_point) + '</p></div></div>';

    h += '<section>' + (ROT ? head("01", "순서 한눈에", "DAY 1부터 순서대로, 쉬고 오면 다음 DAY") : head("01", "일주일 한눈에", "요일을 누르면 그날 운동이 나와요")) + '<div class="week" role="tablist">';
    if (ROT) {
      rotKeys().forEach(function (k) {
        var d = dayByKey(k);
        h += '<a class="day-tile' + (k === tk ? " today" : "") + '" href="#routine-' + k + '" role="tab" aria-current="' + (k === sel) + '"><b class="rot"><small>DAY</small>' + k.slice(1) + '</b>' +
          img(dayIcon(d), "wk-ic") + '<span>' + esc(d.part) + '</span></a>';
      });
      if (rotKeys().length < 7) h += '<div class="day-tile rest"><b class="rot"><small>OFF</small>휴</b>' + img("rest", "wk-ic") + '<span>근무표 따라</span></div>';
    } else
    ["mon", "tue", "wed", "thu", "fri", "sat", "sun"].forEach(function (k) {
      var d = dayByKey(k);
      var cls = "day-tile" + (!d || d.rest ? " rest" : "") + (k === tk ? " today" : "");
      h += '<a class="' + cls + '" href="#routine-' + k + '" role="tab" aria-current="' + (k === sel) + '"><b>' + DAY_KO[k] + '</b>' +
        img(dayIcon(d), "wk-ic") + '<span>' +
        esc(d ? d.part : "휴식") + '</span></a>';
    });
    h += '</div></section>';

    var d = dayByKey(sel);
    h += '<section id="day">' + head("02", dayName(sel) + " " + (d ? d.part : "휴식"), sel === tk ? (ROT ? "오늘 할 차례" : "오늘") : (d && !d.rest ? d.en : ""));
    if (!d || d.rest) {
      h += '<div class="rest-card"><b>쉬는 날</b>푹 쉬고 잘 먹기! 근육은 쉬는 동안 자라요</div>';
    } else if (d.cardio_only) {
      h += '<div class="ex-list"><div class="ex cardio"><div class="ex-top"><span class="ex-ic">' + img("treadmill") + '</span><div><h3>유산소만 ' + d.cardio_only + '분</h3>' +
        '<div class="tip">' + esc(R.cardio ? R.cardio.options : "") + '</div></div></div></div></div>' +
        '<p class="note">' + esc(d.note || "웨이트 없이 유산소만 하는 날이에요") + '</p>';
    } else if (d.pick) {
      h += '<p class="note" style="margin:0 0 12px">' + esc(d.note || "이번 주에 아쉬웠던 부위 하나를 골라 그 요일 루틴 그대로 해요") + '</p>' + pickList(d) +
        (d.cardio && R.cardio ? '<div class="ex-list" style="margin-top:12px"><div class="ex cardio"><div class="ex-top"><span class="ex-ic">' + img("treadmill") + '</span><div><h3>마무리 유산소 ' + R.cardio.minutes + '분</h3><div class="tip">' + esc(R.cardio.options) + '</div></div></div></div></div>' : '');
    } else {
      h += '<div class="flow"><div>' + img("foam_roller", "fl-ic") + '<small>STEP 01</small><b>스트레칭</b><i>폼롤러 10분</i></div><span>›</span>' +
        '<div>' + img("dumbbell", "fl-ic") + '<small>STEP 02</small><b>웨이트</b><i>' + d.items.length + '종목</i></div><span>›</span>' +
        '<div>' + img("treadmill", "fl-ic") + '<small>STEP 03</small><b>유산소</b><i>' + (d.cardio && R.cardio ? R.cardio.minutes + '분' : '이날은 없음') + '</i></div></div>';
      h += '<div class="ex-list">' + d.items.map(function (it, i) {
        var main = it.tag === "메인";
        var sets = it.sets.map(function (s, j) {
          var reps = typeof s[0] === "string" ? esc(s[0]) : s[0] + '<i>회</i>';   /* "30초" 같은 글자도 됨 */
          var kg = s[1] == null ? '맨몸' : s[1] + 'kg';                              /* null = 맨몸 */
          return '<div class="set"><small>' + (j + 1) + '세트</small><b>' + reps + '</b><i>' + kg + '</i></div>';
        }).join("");
        return '<div class="ex' + (main ? ' main' : '') + '"><div class="ex-top"><span class="ex-ic">' + img(iconOf(it)) + '<span class="ex-no">' + (i + 1) + '</span>' +
          (main ? '<span class="main-badge">메인</span>' : '') + '</span><div>' +
          '<h3>' + esc(it.name) + '</h3><div class="meta">' + esc(it.en) + ' ' + tagChip(it.tag) + '</div>' +
          '<div class="tip">' + esc(it.tip) + '</div></div></div><div class="sets">' + sets + '</div>' +
          (it.form && findForm(it.form) ? '<a class="formlink" href="#form-' + esc(it.form) + '">▶ 자세 복습지 보기</a>' : '') + '</div>';
      }).join("");
      if (d.cardio && R.cardio) {
        h += '<div class="ex cardio"><div class="ex-top"><span class="ex-ic">' + img("treadmill") + '</span><div><h3>마무리 유산소 ' + R.cardio.minutes + '분</h3>' +
          '<div class="tip">' + esc(R.cardio.options) + '</div></div></div></div>';
      }
      h += '</div>' + (R.note ? '<p class="note">' + esc(R.note) + '</p>' : '');
    }
    h += '</section>';
    h += muscleSection("03");   /* 이번 달 근육 지도 (2026-11-08 "루틴 항목에 넣는 게 컨셉에 맞지") */
    return h + remember();
  }

  /* ---------------- 식단 */
  /* M.diet: null = 준비 중 / 문자열 = 그대로 / 객체 = 종이 다이어트 식단표(2026-10-21 표준 틀)와 같은 구성 (2026-11-05) */
  function foodImg(key, cls) {
    var src = /^ic_/.test(key) ? BASE + "food/" + THEME + "/" + key + ".png" : BASE + "food/" + key + ".png";
    return '<img class="' + (cls || "fd-img") + '" src="' + src + '" alt="" loading="lazy">';
  }
  function renderDiet() {
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

  /* ---------------- 라우터 */
  var TAB_OF = { home: "home", forms: "forms", form: "forms", routine: "routine", diet: "diet", notice: "notice" };
  function route() {
    var hsh = (location.hash || "").replace(/^#/, "");
    var html, tab = "home", after = null, scrollDay = false, jumpTo = null;
    if (!hsh || hsh === "home") { html = renderHome(); }
    else if (hsh === "forms") { html = renderForms(); tab = "forms"; }
    else if (hsh.indexOf("form-") === 0) {
      var f = findForm(hsh.slice(5));
      html = f ? renderForm(f) : renderForms(); tab = "forms"; if (f) after = setupPlayer;
    }
    else if (hsh === "routine") { html = renderRoutine(); tab = "routine"; }
    else if (hsh.indexOf("routine-") === 0 && (DAY_KO[hsh.slice(8)] || isRotKey(hsh.slice(8)))) { html = renderRoutine(hsh.slice(8)); tab = "routine"; scrollDay = true; }
    else if (hsh === "diet") { html = renderDiet(); tab = "diet"; }
    else if (hsh === "notice") { html = renderNotice(); tab = "notice"; }
    else if (hsh === "goal" || hsh === "journey") { html = renderGoal(); tab = "goal"; }
    else if (hsh === "goal-badges" || hsh === "badges") { html = renderGoal(); tab = "goal"; jumpTo = "badges"; }
    else if (hsh === "muscle") { html = renderRoutine(); tab = "routine"; jumpTo = "muscle"; }
    else if (hsh === "report" || /^report-\d{4}-\d{2}$/.test(hsh)) { html = renderReport(hsh.slice(7)); tab = "routine"; after = setupReport; }
    else if ((hsh === "body" || hsh === "inbody") && IB_ON) { html = renderBody(); tab = "body"; }
    else { html = renderHome(); }
    var wasRoutine = view.getAttribute("data-tab") === "routine";
    view.innerHTML = html;
    view.setAttribute("data-tab", tab);
    Array.prototype.forEach.call(document.querySelectorAll(".tabs a"), function (a) {
      if (a.getAttribute("data-tab") === tab) a.setAttribute("aria-current", "page"); else a.removeAttribute("aria-current");
    });
    alignText(document);
    setupAttCheck(); setupCal(); setupIb(); setupBadges(); setupMuscle();
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
    var jumpEl = jumpTo && document.getElementById(jumpTo);
    if (jumpEl) {
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
  }
  window.addEventListener("hashchange", route);
  route();
  nDot();
  if (!DEMO) setTimeout(showNoticePop, 800);
  if (document.fonts && document.fonts.ready) document.fonts.ready.then(function () { alignText(document); });
  attSync(); ibSync();
  if (!ATT_API) setTimeout(badgeCheck, 1500);
  document.addEventListener("visibilitychange", function () { if (!document.hidden) { attSync(); ibSync(); } });
  window.addEventListener("load", function () { alignText(document); });
})();
