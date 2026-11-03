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
    "덤벨 컬": "db_curl", "해머 컬": "db_curl", "덤벨 슈러그": "shrug", "플랭크": "plank"
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
  function dayIcon(d) { return !d || d.rest ? "rest" : d.cardio_only ? "treadmill" : iconOf(mainItem(d)); }
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
    ["routine", "루틴", '<path d="M6.5 8v8M17.5 8v8M3.5 10v4M20.5 10v4M6.5 12h11" stroke-linecap="round"/>'],
    ["forms", "복습지", '<rect x="3" y="5" width="18" height="14" rx="3"/><path d="m10 9 5 3-5 3z" fill="currentColor"/>'],
    ["diet", "식단", '<circle cx="13" cy="13" r="6.5"/><path d="M4 4v6M6.5 4v6M4 7h2.5M5.2 10v10" stroke-linecap="round"/>'],
    ["notice", "공지", '<path d="M4 10v4h3l6 4V6L7 10z" stroke-linejoin="round"/><path d="M16.5 9.5a3.5 3.5 0 0 1 0 5M19 7a7 7 0 0 1 0 10" stroke-linecap="round"/>']
  ];
  var tabsIn = document.querySelector(".tabs-in");
  if (tabsIn) {
    tabsIn.innerHTML = TABS.map(function (t) {
      return '<a href="#' + t[0] + '" data-tab="' + t[0] + '"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">' + t[2] + '</svg>' + t[1] + '</a>';
    }).join("");
    tabsIn.style.gridTemplateColumns = "repeat(" + TABS.length + ", 1fr)";
  }


  function todayKey() { return DAY_KEYS[new Date().getDay()]; }
  function dayByKey(k) {
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
  function journeyNow() {
    var J = M.journey;
    if (!J || !J.start) return null;
    var p = J.start.split("-"), st = new Date(+p[0], +p[1] - 1, +p[2]);
    var el = (Date.now() - st.getTime()) / (86400000 * 30.44);
    var m = Math.max(0, Math.min(12, el));
    var stage = m < 2 ? STAGES[0] : m < 7 ? STAGES[1] : STAGES[2];
    return { el: el, m: m, month: el < 0 ? 0 : Math.min(12, Math.floor(el) + 1), stage: stage, start: J.start };
  }
  function curveY(m) { return 0.06 + 0.86 / (1 + Math.exp(-(m - 4.3) / 1.15)); }
  function journeyChart(now) {
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
    var path = '<polyline points="' + pts(0, 12) + '" fill="none" stroke="var(--primary)" stroke-width="2.5" stroke-dasharray="5 5" opacity=".35"/>';
    if (cm > 0) path += '<polyline points="' + pts(0, cm) + '" fill="none" stroke="var(--primary)" stroke-width="4" stroke-linecap="round"/>';
    var ticks = [0, 2, 7, 12].map(function (m) {
      return '<line x1="' + X(m) + '" y1="156" x2="' + X(m) + '" y2="161" stroke="var(--faint)"/>' +
        '<text x="' + X(m) + '" y="174" text-anchor="middle" class="jc-x">' + (m === 0 ? "시작" : m + "개월") + '</text>';
    }).join("");
    var mk = "";
    if (now) {
      var mx = X(cm), my = Y(curveY(cm)), right = cm > 7.5, below = my < 64, LW = 108;
      var ly = below ? my + 26 : my - 18;
      mk = '<circle cx="' + mx + '" cy="' + my + '" r="11" fill="var(--key)" opacity=".2"/><circle cx="' + mx + '" cy="' + my + '" r="6.5" fill="var(--key)" stroke="#fff" stroke-width="2.5"/>' +
        '<g transform="translate(' + (right ? mx - 6 : mx + 6) + ',' + ly + ')"><rect x="' + (right ? -LW : 0) + '" y="-15" width="' + LW + '" height="22" rx="11" fill="var(--key)"/>' +
        '<text x="' + (right ? -LW / 2 : LW / 2) + '" y="0.5" text-anchor="middle" class="jc-mk">지금 여기 · ' + (now.month || 1) + '개월차</text></g>';
    }
    var flag = '<g transform="translate(' + X(12) + ',' + (Y(curveY(12)) - 2) + ')"><line x1="0" y1="0" x2="0" y2="-20" stroke="var(--gold)" stroke-width="2"/><path d="M0 -20 L13 -15.5 L0 -11 Z" fill="var(--gold)"/></g>';
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
        (s.no === 3 && left === 0 ? '12개월 완주! 졸업 또는 다음 목표를 함께 정해요' : s.no + '단계 남은 기간 약 ' + (left >= 8 ? Math.round(left / 4.35) + '개월' : left + '주')) + '</p>';
    }
    return '<div class="jcard ' + state + '"><div class="jtop"><span class="jno">' + s.no + '</span><div><small>' + s.no + '단계 · ' + s.range + '</small><h3>' + esc(s.name) + '</h3></div>' + badge + '</div>' +
      '<ul class="jfocus">' + s.focus.map(function (f) { return '<li>' + esc(f) + '</li>'; }).join("") + '</ul>' +
      (compact && state !== "cur" ? '' : '<p class="jmsg">' + esc(s.msg) + '</p>') + prog + '</div>';
  }
  function journeyHome() {
    var now = journeyNow();
    if (!now) return "";
    return '<section>' + head("", "나의 PT 여정", "함께 가는 12개월", '<a class="more" href="#goal">목표 자세히 →</a>') +
      '<div class="panel jpanel">' + journeyChart(now) + stageCard(now.stage, now, true) + '</div></section>';
  }
  function renderGoal() {
    var now = journeyNow();
    var h = '<div class="hero"><div class="hero-main"><div class="hero-l"><div class="eyebrow">MY GOAL <b>· 나의 목표</b></div>' +
      '<h1>' + esc(M.goal || "나의 목표") + '</h1><div class="en">' + esc(M.name) + ' 회원님 · 기초 → 변화 → 자립, 3단계로 함께 가요</div>' +
      '<div class="who"><strong>' + (now ? (now.month ? now.month + '개월차' : '곧 시작해요') + ' · ' + now.stage.no + '단계 ' + esc(now.stage.short) : '') + '</strong><span>담당 장동욱 트레이너</span></div></div></div>' +
      '<div class="keypoint"><small>KEY POINT</small><p>혼자 가는 길이 아니에요. 단계마다 함께 넘어가요!</p></div></div>';
    if (!now) {
      return h + '<div class="panel empty"><h3>PT 여정 준비 중이에요</h3><p>선생님이 시작일을 넣으면 12개월 여정이 나와요</p></div>' + remember();
    }
    h += '<section>' + head("01", "한눈에 보는 12개월", "지금 어디쯤인지 확인해요") + '<div class="panel jpanel">' + journeyChart(now) + '</div></section>';
    h += '<section>' + head("02", "단계별 목표", "단계마다 하는 것이 달라요") + '<div class="jlist">' +
      STAGES.map(function (st) { return stageCard(st, now, false); }).join("") + '</div></section>';
    return h + remember();
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
    var h = '<div class="hero"><div class="hero-main"><div class="hero-l">' +
      '<div class="eyebrow">MY PT NOTE <b>· 나만의 운동 노트</b></div>' +
      '<h1>' + esc(M.name) + ' 회원님</h1>' +
      '<div class="en">' + esc(M.goal || "") + '</div>' +
      '<div class="who"><span>GYMTOS 도당점 · 담당 장동욱 트레이너</span></div>' +
      '</div></div></div>';

    h += journeyHome();
    h += '<section>' + head("", "오늘의 운동", DAY_KO[k] + "요일", '<a class="more" href="#routine-' + k + '">자세히 →</a>');
    if (!d) {
      h += '<div class="panel empty"><h3>루틴이 아직 없어요</h3><p>선생님이 곧 올려드릴게요</p></div>';
    } else if (d.rest) {
      h += '<div class="panel today"><div class="today-top"><div class="today-ic">' + img("rest") + '<span>' + d.day + '</span></div><div><small>REST DAY</small><h3>오늘은 쉬는 날!</h3></div></div>' +
        '<p style="margin:0;color:var(--sub);font-size:14px">푹 쉬고 잘 먹는 것도 운동이에요</p></div>';
    } else if (d.cardio_only) {
      h += '<div class="panel today"><div class="today-top"><div class="today-ic">' + img("treadmill") + '<span>' + d.day + '</span></div><div><small>CARDIO DAY</small><h3>오늘은 유산소만!</h3></div></div>' +
        '<p style="margin:0;color:var(--sub);font-size:14px">유산소 ' + d.cardio_only + '분' + (M.routine.cardio ? ' · ' + esc(M.routine.cardio.options) : '') + '</p>' +
        '<a class="btn fill" href="#routine-' + k + '" style="align-self:flex-start">오늘 운동 보기</a></div>';
    } else {
      h += '<div class="panel today"><div class="today-top"><div class="today-ic">' + img(iconOf(mainItem(d))) + '<span>' + d.day + '</span></div><div><small>' + esc(d.en.toUpperCase()) + '</small><h3>' + esc(d.part) + ' 하는 날</h3></div></div>' +
        exMini(d) + (d.cardio && M.routine.cardio ? '<p style="margin:0;font-size:13.5px;color:var(--sub)">+ 마무리 유산소 ' + M.routine.cardio.minutes + '분</p>' : '') +
        '<a class="btn fill" href="#routine-' + k + '" style="align-self:flex-start">오늘 운동 보기</a></div>';
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
    return '<div class="panel notice"><time>' + esc(n.date) + '</time><h3>' + esc(n.title) + '</h3><p>' + esc(n.body) + '</p>' +
      (n.link ? '<a class="btn" href="#' + esc(n.link) + '">바로 보기</a>' : '') + '</div>';
  }
  function renderNotice() {
    var h = '<section>' + head("", "선생님 공지", "새 소식이 위에 있어요");
    h += (M.notices && M.notices.length) ? M.notices.map(noticeCard).join("") :
      '<div class="panel empty"><h3>아직 공지가 없어요</h3></div>';
    return h + '</section>' + remember();
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
      '<div class="who"><strong>' + esc(M.name) + ' 회원님</strong><span>' + esc(f.date) + '</span></div></div>' +
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
      '<div class="eyebrow">WEEKLY ROUTINE <b>· 주간 루틴 ' + esc(R.version) + '</b></div><h1>' + esc(R.title) + '</h1>' +
      '<div class="who"><strong>' + esc(M.name) + ' 회원님</strong><span>' + esc(R.updated) + ' 업데이트</span></div></div>' +
      '<div class="hero-r"><div class="eyebrow">이번 주 계획</div><ul class="dots small">' +
      R.plan.map(function (p) { return '<li>' + esc(p) + '</li>'; }).join("") + '</ul></div></div>' +
      '<div class="keypoint"><small>KEY POINT</small><p>' + esc(R.key_point) + '</p></div></div>';

    h += '<section>' + head("01", "일주일 한눈에", "요일을 누르면 그날 운동이 나와요") + '<div class="week" role="tablist">';
    ["mon", "tue", "wed", "thu", "fri", "sat", "sun"].forEach(function (k) {
      var d = dayByKey(k);
      var cls = "day-tile" + (!d || d.rest ? " rest" : "") + (k === tk ? " today" : "");
      h += '<a class="' + cls + '" href="#routine-' + k + '" role="tab" aria-current="' + (k === sel) + '"><b>' + DAY_KO[k] + '</b>' +
        img(dayIcon(d), "wk-ic") + '<span>' +
        esc(d ? d.part : "휴식") + '</span></a>';
    });
    h += '</div></section>';

    var d = dayByKey(sel);
    h += '<section id="day">' + head("02", DAY_KO[sel] + "요일 " + (d ? d.part : "휴식"), sel === tk ? "오늘" : (d && !d.rest ? d.en : ""));
    if (!d || d.rest) {
      h += '<div class="rest-card"><b>쉬는 날</b>푹 쉬고 잘 먹기! 근육은 쉬는 동안 자라요</div>';
    } else if (d.cardio_only) {
      h += '<div class="ex-list"><div class="ex cardio"><div class="ex-top"><span class="ex-ic">' + img("treadmill") + '</span><div><h3>유산소만 ' + d.cardio_only + '분</h3>' +
        '<div class="tip">' + esc(R.cardio ? R.cardio.options : "") + '</div></div></div></div></div>' +
        '<p class="note">' + esc(d.note || "웨이트 없이 유산소만 하는 날이에요") + '</p>';
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
    return h + remember();
  }

  /* ---------------- 식단 */
  function renderDiet() {
    var h = '<section>' + head("", "식단표", "");
    if (!M.diet) {
      h += '<div class="panel empty"><svg viewBox="0 0 54 54" aria-hidden="true"><circle cx="27" cy="27" r="25" fill="var(--tint)"/><circle cx="27" cy="29" r="12" fill="#fff" stroke="var(--primary)" stroke-width="3"/><path d="M12 14v12M15 14v12M12 20h3M41 14c-3 2-3 8 0 10v12" stroke="var(--primary)" stroke-width="2.6" fill="none" stroke-linecap="round"/></svg>' +
        '<h3>식단표 준비 중이에요</h3><p>선생님이 회원님 식단을 짜면 여기에 올려드릴게요</p></div>';
    } else {
      h += M.diet;
    }
    return h + '</section>' + remember();
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
    var html, tab = "home", after = null, scrollDay = false;
    if (!hsh || hsh === "home") { html = renderHome(); }
    else if (hsh === "forms") { html = renderForms(); tab = "forms"; }
    else if (hsh.indexOf("form-") === 0) {
      var f = findForm(hsh.slice(5));
      html = f ? renderForm(f) : renderForms(); tab = "forms"; if (f) after = setupPlayer;
    }
    else if (hsh === "routine") { html = renderRoutine(); tab = "routine"; }
    else if (hsh.indexOf("routine-") === 0 && DAY_KO[hsh.slice(8)]) { html = renderRoutine(hsh.slice(8)); tab = "routine"; scrollDay = true; }
    else if (hsh === "diet") { html = renderDiet(); tab = "diet"; }
    else if (hsh === "notice") { html = renderNotice(); tab = "notice"; }
    else if (hsh === "goal" || hsh === "journey") { html = renderGoal(); tab = "goal"; }
    else { html = renderHome(); }
    var wasRoutine = view.getAttribute("data-tab") === "routine";
    view.innerHTML = html;
    view.setAttribute("data-tab", tab);
    Array.prototype.forEach.call(document.querySelectorAll(".tabs a"), function (a) {
      if (a.getAttribute("data-tab") === tab) a.setAttribute("aria-current", "page"); else a.removeAttribute("aria-current");
    });
    alignText(document);
    if (after) after();
    if (scrollDay && wasRoutine) {
      var el = document.getElementById("day");
      if (el) el.scrollIntoView({ block: "start" });
    } else {
      window.scrollTo(0, 0);
    }
  }
  window.addEventListener("hashchange", route);
  route();
  if (document.fonts && document.fonts.ready) document.fonts.ready.then(function () { alignText(document); });
  window.addEventListener("load", function () { alignText(document); });
})();
