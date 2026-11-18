/* PT 안내서 "체험 폰" (2026-11-19 장동욱 "실제로 폰 앱 화면을 누를 수 있게 해서 설명하는 식으로")
   - 실제 회원 PT 노트를 iframe으로 띄움: /m/<주소>/?demo&try#탭  (이름 가림 + app.js TRY: 눌러 봐도 기록·창고는 안 바뀜)
   - 왼쪽(아이패드)·위(폰)에 짧은 설명 + "여기를 눌러 보세요" 단계 버튼 → 폰 화면 안 그 칸으로 스크롤 + 빨간 테두리 깜빡
   - guide.html(폰): PTTry.sheet(종류) 아래에서 올라오는 창 / intro.html(아이패드): PTTry.mount(칸, 종류)
   - 회원은 members.js에서 그 기능이 있는 회원 중 아무나 (돌아다니는 동물 pet 회원은 팝업이 떠서 뺌) */
(function () {
  "use strict";
  var F = {
    routine: { q: "뭘 해야 할지 모르겠어요", c: "루틴", t: "요일별 루틴일지", d: "요일마다 할 운동이 무게·세트까지 정리돼 있어요. 다 한 운동은 ✓ 체크하면 끝.", h: "routine",
      s: [{ t: "요일 칸", q: ".week" }, { t: "오늘 운동", q: ".ex.main, .ex-list .ex" }, { t: "다 하면 ✓", q: ".exchk" }] },
    form: { q: "자세가 맞는지 헷갈려요", c: "복습지", t: "수업 영상 자세 복습지", d: "수업 때 찍은 영상으로 잘한 점·자극 부위·동작 3단계를 정리해 드려요. 집에서도 다시 보며 복습.", h: "form",
      s: [{ t: "수업 영상", q: "video" }, { t: "잘한 점", q: ".good" }, { t: "자극 부위", q: ".mcol, img[src*=anatomy]" }, { t: "동작 3단계", q: ".step" }] },
    diet: { q: "뭘 먹어야 할지 모르겠어요", c: "식단", t: "회원님 맞춤 선택 식단", d: "목적과 몸 상태에 맞춰, 먹고 싶은 음식을 직접 고르면 양이 자동으로 계산돼요.", h: "diet",
      auto: '[data-db="tab:my"]',
      s: [{ t: "목적 고르기", q: ".db-seg", pre: '[data-db="tab:my"]' }, { t: "운동 횟수·끼니 수", q: ".db-chips", pre: '[data-db="tab:my"]' },
        { t: "음식 고르기", q: ".db-slots, .db-meal, .db .panel.empty", pre: '[data-db="tab:my"]' }, { t: "선생님 식단표도", q: ".hero, .mp", pre: '[data-db="tab:coach"]' }] },
    goal: { q: "혼자 하면 작심삼일이에요", c: "출석", t: "출석 도장 · 배지", d: "운동 온 날 도장을 꾹. 출석률·출석 순위·배지 45개로 매일 동기부여돼요.", h: "home",
      s: [{ t: "출석 도장 꾹", q: ".stamp" }, { t: "출석률", q: ".hatt, .hw" }, { t: "배지", q: ".bgx", hash: "goal" }] },
    body: { q: "변화가 안 보여요", c: "인바디", t: "인바디로 지난달과 비교", d: "인바디 결과지를 찍어 올리면 지난달과 이번 달 변화를 한눈에 비교해 드려요.", h: "body",
      s: [{ t: "지난달 vs 이번 달", q: ".ibpanel, #view .panel" }, { t: "재는 법", q: "#view section:last-of-type" }] },
    rehab: { q: "허리·무릎이 아파요", c: "재활", t: "재활 트레이닝", d: "아픈 곳부터 확인하고 안 아픈 동작으로 시작해요. 복습지에 자극 부위와 O·X 동작을 그림으로.", h: "form",
      s: [{ t: "자극 부위", q: ".mcol, img[src*=anatomy]" }, { t: "이렇게 O · 이렇게 X", q: ".ox" }] }
  };

  /* ---------- 회원 고르기 (members.js + data.js, 한 번만 받아 둠) */
  var poolP = null;
  function pool() {
    if (poolP) return poolP;
    poolP = Promise.all((window.COACH_MEMBERS || []).map(function (slug) {
      return fetch("/m/" + slug + "/data.js", { cache: "no-store" }).then(function (r) { return r.text(); })
        .then(function (t) { var w = {}; new Function("window", t)(w); return w.MEMBER ? { slug: slug, M: w.MEMBER } : null; })
        .catch(function () { return null; });
    })).then(function (a) { return a.filter(function (x) { return x && !x.M.pet; }); });
    return poolP;
  }
  function pick(kind) {
    return pool().then(function (all) {
      var ok = all.filter(function (x) {
        var M = x.M;
        if (kind === "routine") return M.routine && (M.routine.days || []).length;
        if (kind === "form" || kind === "rehab") return (M.forms || []).length;
        if (kind === "diet") return M.diet && typeof M.diet === "object";
        if (kind === "goal") return M.routine && M.journey && M.journey.start;
        if (kind === "body") return !/·/.test(M.name || "") && M.inbody !== false;
        return true;
      });
      if (!ok.length) ok = all;
      var x = ok[Math.floor(Math.random() * ok.length)];
      if (!x) return null;
      var h = F[kind].h === "form" ? "form-" + x.M.forms[0].id : F[kind].h;
      return { slug: x.slug, hash: h };
    });
  }

  /* ---------- 스타일 (한 번) */
  var css = [
    ".tp-ph{position:relative;flex:none;border-radius:34px;background:#121214;padding:7px;box-shadow:0 22px 48px rgba(18,18,20,.28)}",
    ".tp-ph .tp-scr{position:relative;width:100%;height:100%;border-radius:27px;overflow:hidden;background:#F2F2F4}",
    ".tp-ph iframe{position:absolute;left:0;top:0;width:390px;height:844px;border:0;transform-origin:0 0;background:#F2F2F4}",
    ".tp-ph .tp-wait{position:absolute;inset:0;display:flex;align-items:center;justify-content:center;color:#8A8F99;font:600 14px 'Noto Sans KR',sans-serif}",
    ".tp-steps{display:flex;flex-wrap:wrap;gap:8px}",
    ".tp-steps button{font:700 14px 'Noto Sans KR',sans-serif;color:#D6204F;background:#FFF0F3;border:1.5px solid #F5B8C6;border-radius:999px;padding:8px 13px;min-height:40px;cursor:pointer}",
    ".tp-steps button b{display:inline-block;min-width:18px;height:18px;line-height:18px;margin-right:5px;border-radius:50%;background:#D6204F;color:#fff;font-size:11px;text-align:center}",
    ".tp-steps button.on{background:#D6204F;color:#fff;border-color:#D6204F}.tp-steps button.on b{background:#fff;color:#D6204F}",
    ".tp-tap{display:inline-flex;align-items:center;gap:6px;font:600 13px 'Noto Sans KR',sans-serif;color:#6A7180}",
    ".tp-tap i{width:8px;height:8px;border-radius:50%;background:#D6204F;animation:tpdot 1.4s ease-in-out infinite}",
    "@keyframes tpdot{50%{opacity:.25}}",
    /* 폰 버전: 아래에서 올라오는 창 */
    ".tp-sheet{position:fixed;inset:0;z-index:80;background:rgba(18,18,20,.55);display:flex;align-items:flex-end;justify-content:center;animation:tpfade .2s ease}",
    ".tp-card{width:100%;max-width:520px;height:calc(100% - 10px);background:#F2F2F4;border-radius:24px 24px 0 0;display:flex;flex-direction:column;align-items:center;gap:10px;padding:14px 14px calc(10px + env(safe-area-inset-bottom));box-sizing:border-box;animation:tpup .28s cubic-bezier(.2,.8,.2,1)}",
    ".tp-top{width:100%;display:flex;flex-direction:column;gap:6px}",
    ".tp-row{display:flex;align-items:center;gap:10px}",
    ".tp-row h3{flex:1;margin:0;font:900 20px/1.25 'Noto Sans KR',sans-serif;color:#121214;letter-spacing:-.3px}",
    ".tp-x{flex:none;width:44px;height:44px;border-radius:50%;border:0;background:#fff;color:#121214;font-size:22px;box-shadow:0 2px 8px rgba(0,0,0,.08);cursor:pointer}",
    ".tp-top p{margin:0;font:500 14px/1.45 'Noto Sans KR',sans-serif;color:#4A505C}",
    ".tp-mid{flex:1;min-height:0;width:100%;display:flex;align-items:center;justify-content:center}",
    "@keyframes tpfade{from{opacity:0}}@keyframes tpup{from{transform:translateY(40px);opacity:0}}",
    "@media (prefers-reduced-motion:reduce){.tp-sheet,.tp-card,.tp-tap i{animation:none}}"
  ].join("\n");
  function addCss() { if (document.getElementById("tpcss")) return; var s = document.createElement("style"); s.id = "tpcss"; s.textContent = css; document.head.appendChild(s); }
  /* iframe(실제 노트) 안에 넣는 깜빡 테두리 — 본문(.view)엔 transform·filter 안 씀, outline만 */
  var inCss = ".tp-hl{outline:3px solid #D6204F!important;outline-offset:3px;border-radius:14px;animation:tphl .7s ease-in-out 4 alternate}" +
    "@keyframes tphl{from{outline-color:#D6204F}to{outline-color:rgba(214,32,79,.15)}}";

  /* ---------- 폰 틀 + iframe */
  function phone(w) {
    var k = (w - 14) / 390, el = document.createElement("div");
    el.className = "tp-ph";
    el.style.width = w + "px"; el.style.height = Math.round(844 * k + 14) + "px";
    el.innerHTML = '<div class="tp-scr"><p class="tp-wait">불러오는 중…</p><iframe title="실제 회원님 PT 노트 (이름은 가렸어요)" loading="eager" allow="autoplay"></iframe></div>';
    var fr = el.querySelector("iframe");
    fr.style.transform = "scale(" + k + ")";
    return { el: el, fr: fr };
  }
  function load(P, kind) {
    P.kind = kind; P.ready = false; P.go = null;
    var wait = P.el.querySelector(".tp-wait"); wait.style.display = "";
    return pick(kind).then(function (x) {
      if (!x || P.kind !== kind) return;
      P.slug = x.slug;
      P.fr.onload = function () {
        P.ready = true; wait.style.display = "none";
        try { var d = P.fr.contentDocument, st = d.createElement("style"); st.textContent = inCss; d.head.appendChild(st); } catch (e) {}
        if (F[kind].auto) find(P, F[kind].auto, function (el) { if (!el.classList.contains("on")) el.click(); });
        if (P.go) { var g = P.go; P.go = null; g(); }
      };
      P.fr.src = "/m/" + x.slug + "/?demo&try#" + x.hash;
    });
  }
  function find(P, q, cb, n) {
    var d = null; try { d = P.fr.contentDocument; } catch (e) {}
    var el = d && d.querySelector(q);
    if (el && el.getBoundingClientRect().height > 0) return cb(el, d);
    if ((n || 0) > 25) return;
    setTimeout(function () { find(P, q, cb, (n || 0) + 1); }, 150);
  }
  function show(P, kind, i) {
    var s = F[kind].s[i];
    function run() {
      var w = P.fr.contentWindow;
      if (s.hash && w.location.hash !== "#" + s.hash) w.location.hash = s.hash;
      else if (!s.hash && F[kind].s.some(function (z) { return z.hash; }) && w.location.hash !== "#" + F[kind].h && F[kind].h !== "form") w.location.hash = F[kind].h;
      if (s.pre) find(P, s.pre, function (el) { if (!el.classList.contains("on")) el.click(); setTimeout(look, 250); }); else look();
    }
    function look() {
      find(P, s.q, function (el, d) {
        Array.prototype.forEach.call(d.querySelectorAll(".tp-hl"), function (x) { x.classList.remove("tp-hl"); });
        if (s.click && !el.classList.contains("on")) el.click();
        var tgt = el, w = P.fr.contentWindow, rc = el.getBoundingClientRect();
        /* scrollIntoView는 바깥 안내서 페이지까지 움직여서 안 씀 — iframe 안만 스크롤 */
        w.scrollTo({ top: Math.max(0, rc.top + w.pageYOffset - Math.max(90, (844 - rc.height) / 2)), behavior: "smooth" });
        void tgt.offsetWidth; tgt.classList.add("tp-hl");
        setTimeout(function () { tgt.classList.remove("tp-hl"); }, 3200);
      });
    }
    if (P.ready) run(); else P.go = run;
  }
  function steps(P, kind, box) {
    box.innerHTML = F[kind].s.map(function (s, i) { return '<button type="button" data-i="' + i + '"><b>' + (i + 1) + "</b>" + s.t + "</button>"; }).join("");
    Array.prototype.forEach.call(box.querySelectorAll("button"), function (b) {
      b.addEventListener("click", function () {
        Array.prototype.forEach.call(box.querySelectorAll("button"), function (x) { x.classList.toggle("on", x === b); });
        show(P, kind, +b.getAttribute("data-i"));
      });
    });
  }

  /* ---------- 폰 버전: 아래에서 올라오는 창 */
  function sheet(kind) {
    if (!F[kind]) return;
    addCss();
    var w = document.createElement("div");
    w.className = "tp-sheet"; w.setAttribute("role", "dialog"); w.setAttribute("aria-modal", "true"); w.setAttribute("aria-label", F[kind].t + " 체험");
    w.innerHTML = '<div class="tp-card"><div class="tp-top"><div class="tp-row"><h3>' + F[kind].t + '</h3><button type="button" class="tp-x" aria-label="닫기">×</button></div>' +
      "<p>" + F[kind].d + '</p><div class="tp-steps"></div><span class="tp-tap"><i></i>아래 화면을 직접 눌러 보세요 · 이름은 가렸어요</span></div><div class="tp-mid"></div></div>';
    document.body.appendChild(w);
    var mid = w.querySelector(".tp-mid"), P = { kind: null };
    steps(P, kind, w.querySelector(".tp-steps"));   /* 단계 버튼을 먼저 넣고 남은 높이를 재야 폰이 글자를 안 덮음 */
    var hgt = mid.clientHeight, wid = Math.min(mid.clientWidth - 8, 340);
    var pw = Math.max(200, Math.min(wid, Math.floor((hgt - 14) * 390 / 844) + 14));
    var Q = phone(pw); P.el = Q.el; P.fr = Q.fr; mid.appendChild(P.el);
    load(P, kind);
    function close() { w.remove(); document.removeEventListener("keydown", esc); }
    function esc(e) { if (e.key === "Escape") close(); }
    document.addEventListener("keydown", esc);
    w.querySelector(".tp-x").addEventListener("click", close);
    w.addEventListener("click", function (e) { if (e.target === w) close(); });
    w.querySelector(".tp-x").focus();
  }

  /* ---------- 아이패드: 슬라이드 안에 폰 + 설명 칸 */
  function mount(box, phoneW) {
    addCss();
    box.innerHTML = '<div style="display:flex;gap:36px;align-items:center">' +
      '<div data-ph></div>' +
      '<div style="width:330px;display:flex;flex-direction:column;gap:16px">' +
      '<p data-t style="margin:0;font:900 36px/1.25 \'Noto Sans KR\',sans-serif;color:#121214;letter-spacing:-.5px"></p>' +
      '<p data-d style="margin:0;font:500 22px/1.5 \'Noto Sans KR\',sans-serif;color:#4A505C"></p>' +
      '<div class="tp-steps" data-s style="gap:10px"></div>' +
      '<span class="tp-tap" style="font-size:18px"><i></i>폰 화면을 직접 눌러 보세요</span>' +
      '<p style="margin:0;font:500 16px \'Noto Sans KR\',sans-serif;color:#8A8F99">실제 회원님 PT 노트 · 이름은 가렸어요</p></div></div>';
    var P = phone(phoneW || 340);
    box.querySelector("[data-ph]").appendChild(P.el);
    Array.prototype.forEach.call(box.querySelectorAll(".tp-steps"), function (s) { s.classList.add("big"); });
    var st = document.createElement("style");
    st.textContent = ".tp-steps.big button{font-size:20px;padding:10px 18px;min-height:52px}.tp-steps.big button b{width:24px;height:24px;line-height:24px;font-size:14px}";
    document.head.appendChild(st);
    return {
      set: function (kind) {
        if (!F[kind] || P.kind === kind) return;
        box.querySelector("[data-t]").textContent = F[kind].t;
        box.querySelector("[data-d]").textContent = F[kind].d;
        steps(P, kind, box.querySelector("[data-s]"));
        load(P, kind);
      }
    };
  }

  /* ---------- 폰 안내서(guide.html) 2쪽: 아이패드처럼 페이지 안에 폰 + 옆 설명 (2026-11-19 "폰버전 2페이지도 아이패드처럼")
     위: 기능 칩 6개(한 줄) → 고민 말풍선 + 해결 제목 → 아래: 왼쪽 실제 폰 · 오른쪽 설명·단계 버튼 */
  var css2 = [
    ".tpi{flex:1;min-height:0;display:flex;flex-direction:column;gap:8px}",
    ".tpi-chips{display:grid;grid-template-columns:repeat(6,minmax(0,1fr));gap:5px}",
    ".tpi-chips button{font:800 12.5px 'Noto Sans KR',sans-serif;color:#4A505C;background:#fff;border:0;border-radius:12px;min-height:40px;padding:0 2px;box-shadow:0 1px 3px rgba(18,18,20,.08);cursor:pointer;white-space:nowrap}",
    ".tpi-chips button.on{background:#D6204F;color:#fff;box-shadow:0 6px 14px rgba(214,32,79,.3)}",
    ".tpi-qa{display:flex;flex-direction:column;gap:4px}",
    ".tpi-qa q{quotes:none;align-self:flex-start;font:600 12.5px 'Noto Sans KR',sans-serif;color:#4A505C;background:#fff;border-radius:12px 12px 12px 3px;padding:5px 10px}",
    ".tpi-qa b{align-self:flex-end;font:900 16px/1.3 'Noto Sans KR',sans-serif;color:#fff;background:#D6204F;border-radius:14px 14px 3px 14px;padding:6px 12px}",
    ".tpi-row{flex:1;min-height:0;display:flex;gap:10px;align-items:flex-start}",
    ".tpi-ph{flex:none}",
    ".tpi-side{flex:1;min-width:0;display:flex;flex-direction:column;gap:8px}",
    ".tpi-side p{margin:0;font:500 12px/1.45 'Noto Sans KR',sans-serif;color:#4A505C;word-break:keep-all}",
    ".tpi-side .tp-steps{flex-direction:column;gap:6px}",
    ".tpi-side .tp-steps button{font-size:12.5px;padding:6px 9px;min-height:44px;border-radius:14px;text-align:left;line-height:1.3;word-break:keep-all}",
    ".tpi-side .tp-tap{font-size:11.5px;line-height:1.35;align-items:flex-start}.tpi-side .tp-tap i{flex:none;margin-top:4px}",
    ".tpi-side .tpi-cta{margin-top:auto;font:800 12px/1.4 'Noto Sans KR',sans-serif;color:#121214;word-break:keep-all}.tpi-side .tpi-cta em{font-style:normal;color:#D6204F}"
  ].join("\n");
  function inline(box, first) {
    addCss();
    if (!document.getElementById("tpcss2")) { var st = document.createElement("style"); st.id = "tpcss2"; st.textContent = css2; document.head.appendChild(st); }
    var K = ["routine", "form", "diet", "goal", "body", "rehab"];
    box.classList.add("tpi");
    box.innerHTML = '<div class="tpi-chips" role="tablist" aria-label="PT 노트 기능">' +
      K.map(function (k) { return '<button type="button" role="tab" data-k="' + k + '">' + F[k].c + "</button>"; }).join("") + "</div>" +
      '<div class="tpi-qa"><q></q><b></b></div>' +
      '<div class="tpi-row"><div class="tpi-ph"></div><div class="tpi-side"><p data-d></p><div class="tp-steps"></div>' +
      '<span class="tp-tap"><i></i>왼쪽 화면을 직접 눌러 보세요 · 이름은 가렸어요</span>' +
      '<span class="tpi-cta">이 모든 게 회원님 폰 하나에 <em>나만의 PT 노트</em> · 앱 설치 없이 카톡 링크 하나</span></div></div>';
    var row = box.querySelector(".tpi-row"), P = { kind: null }, cur = null, started = false;
    function fit() {
      var hgt = row.clientHeight, wmax = row.clientWidth - 10 - 104;
      var pw = Math.max(150, Math.min(wmax, Math.floor((hgt - 14) * 390 / 844) + 14));
      if (!P.el) { var Q = phone(pw); P.el = Q.el; P.fr = Q.fr; box.querySelector(".tpi-ph").appendChild(P.el); }
      var k = (pw - 14) / 390;
      P.el.style.width = pw + "px"; P.el.style.height = Math.round(844 * k + 14) + "px"; P.fr.style.transform = "scale(" + k + ")";
    }
    function set(kind) {
      cur = kind;
      Array.prototype.forEach.call(box.querySelectorAll(".tpi-chips button"), function (b) {
        var on = b.getAttribute("data-k") === kind; b.classList.toggle("on", on); b.setAttribute("aria-selected", on ? "true" : "false");
      });
      box.querySelector(".tpi-qa q").textContent = "“" + F[kind].q + "”";
      box.querySelector(".tpi-qa b").textContent = F[kind].t;
      box.querySelector("[data-d]").textContent = F[kind].d;
      fit();
      steps(P, kind, box.querySelector(".tp-steps"));
      if (started) load(P, kind);
    }
    Array.prototype.forEach.call(box.querySelectorAll(".tpi-chips button"), function (b) {
      b.addEventListener("click", function () { set(b.getAttribute("data-k")); });
    });
    set(first || "routine");
    window.addEventListener("resize", fit);
    /* 실제 노트(iframe)는 2쪽이 보일 때 처음 불러옴 — 안내서 첫 화면을 느리게 하지 않게 */
    function start() { if (started) return; started = true; fit(); load(P, cur); }
    if ("IntersectionObserver" in window) {
      var io = new IntersectionObserver(function (es) { es.forEach(function (e) { if (e.isIntersecting) { start(); io.disconnect(); } }); }, { threshold: 0.3 });
      io.observe(box);
    } else start();
    return { set: set, start: start };
  }

  window.PTTry = { sheet: sheet, mount: mount, inline: inline, F: F };
})();
