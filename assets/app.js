/* GYMTOS 도당점 회원 홈페이지 — window.MEMBER(data.js)를 읽어 화면을 그림 */
(function () {
  "use strict";
  var M = window.MEMBER;
  if (!M) return;
  document.documentElement.setAttribute("data-sex", M.sex === "F" ? "F" : "M");

  var DAY_KEYS = ["sun", "mon", "tue", "wed", "thu", "fri", "sat"];
  var DAY_KO = { mon: "월", tue: "화", wed: "수", thu: "목", fri: "금", sat: "토", sun: "일" };
  var KO_KEY = { "월": "mon", "화": "tue", "수": "wed", "목": "thu", "금": "fri", "토": "sat", "일": "sun" };
  var QUOTES = [
    "PT는 1시간, 변화는 나머지 시간에 만들어져요",
    "수업은 방향을, 개인운동은 결과를 만듭니다",
    "혼자 하는 1세트가 몸을 바꿉니다",
    "주에 두 번으론 택도 없다!",
    "핑계는 근육이 안 붙어요",
    "일주일은 168시간, PT는 그중 2시간입니다",
    "지난달이랑 똑같은 몸, 괜찮으세요?",
    "회원님의 최고의 동기부여는 회원님의 미래의 모습입니다",
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

  /* ---------------- 홈 */
  function exMini(d) {
    return '<ul class="mini">' + d.items.map(function (it, i) {
      return '<li><span class="n' + (it.tag === "메인" ? " main" : "") + '">' + (i + 1) + '</span>' + esc(it.name) +
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

    h += '<section>' + head("", "오늘의 운동", DAY_KO[k] + "요일", '<a class="more" href="#routine-' + k + '">자세히 →</a>');
    if (!d) {
      h += '<div class="panel empty"><h3>루틴이 아직 없어요</h3><p>선생님이 곧 올려드릴게요</p></div>';
    } else if (d.rest) {
      h += '<div class="panel today"><div class="today-top"><div class="today-day rest">' + d.day + '</div><div><small>REST DAY</small><h3>오늘은 쉬는 날!</h3></div></div>' +
        '<p style="margin:0;color:var(--sub);font-size:14px">푹 쉬고 잘 먹는 것도 운동이에요</p></div>';
    } else {
      h += '<div class="panel today"><div class="today-top"><div class="today-day">' + d.day + '</div><div><small>' + esc(d.en.toUpperCase()) + '</small><h3>' + esc(d.part) + ' 하는 날</h3></div></div>' +
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
      h += '<a class="' + cls + '" href="#routine-' + k + '" role="tab" aria-current="' + (k === sel) + '"><b>' + DAY_KO[k] + '</b><span>' +
        esc(d ? d.part : "휴식") + '</span></a>';
    });
    h += '</div></section>';

    var d = dayByKey(sel);
    h += '<section id="day">' + head("02", DAY_KO[sel] + "요일 " + (d ? d.part : "휴식"), sel === tk ? "오늘" : (d && !d.rest ? d.en : ""));
    if (!d || d.rest) {
      h += '<div class="rest-card"><b>쉬는 날</b>푹 쉬고 잘 먹기! 근육은 쉬는 동안 자라요</div>';
    } else {
      h += '<div class="flow"><div><small>STEP 01</small><b>스트레칭</b><i>폼롤러 10분</i></div><span>›</span>' +
        '<div><small>STEP 02</small><b>웨이트</b><i>' + d.items.length + '종목</i></div><span>›</span>' +
        '<div><small>STEP 03</small><b>유산소</b><i>' + (d.cardio && R.cardio ? R.cardio.minutes + '분' : '이날은 없음') + '</i></div></div>';
      h += '<div class="ex-list">' + d.items.map(function (it, i) {
        var main = it.tag === "메인";
        var sets = it.sets.map(function (s, j) {
          return '<div class="set"><small>' + (j + 1) + '세트</small><b>' + s[0] + '<i>회</i></b><i>' + s[1] + 'kg</i></div>';
        }).join("");
        return '<div class="ex' + (main ? ' main' : '') + '"><div class="ex-top"><span class="ex-no">' + (i + 1) + '</span><div>' +
          '<h3>' + esc(it.name) + '</h3><div class="meta">' + esc(it.en) + ' ' + tagChip(it.tag) + '</div>' +
          '<div class="tip">' + esc(it.tip) + '</div></div></div><div class="sets">' + sets + '</div>' +
          (it.form && findForm(it.form) ? '<a class="formlink" href="#form-' + esc(it.form) + '">▶ 자세 복습지 보기</a>' : '') + '</div>';
      }).join("");
      if (d.cardio && R.cardio) {
        h += '<div class="ex cardio"><div class="ex-top"><span class="ex-no">+</span><div><h3>마무리 유산소 ' + R.cardio.minutes + '분</h3>' +
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
    else { html = renderHome(); }
    var wasRoutine = view.getAttribute("data-tab") === "routine";
    view.innerHTML = html;
    view.setAttribute("data-tab", tab);
    Array.prototype.forEach.call(document.querySelectorAll(".tabs a"), function (a) {
      if (a.getAttribute("data-tab") === tab) a.setAttribute("aria-current", "page"); else a.removeAttribute("aria-current");
    });
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
})();
