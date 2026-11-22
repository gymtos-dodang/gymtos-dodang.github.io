/* PT 안내서(guide.html·intro.html) — 앱(PT통합노트 '새 회원 추가')에서 만든 회원도 관리 현황에 넣기 (2026-11-22 장동욱 "앱에서 판 회원님들도 들어가야")
   공개 회원 목록(pub:m:roster-list:members) → 폴더 회원(members.js)에 없는 회원만 창고에서 노트(pub:m:<주소>:member)를 받고,
   m/dyn/forms.js의 복습지·공지를 이름으로 붙임(404.html과 같은 규칙). 실패하거나 6초 넘으면 그 회원은 목록 정보(이름·시작일)만. */
window.PTDyn = function (LIST) {
  var API = (window.SITE || {}).att_api || "https://script.google.com/macros/s/AKfycbwtjTpk88xTWQcKXoaFX2qCYtKSzKoCOs-Us26k6QUbtKvewTaqJutJuA4RJjAmV-6bvA/exec";
  function wait(p, ms, v) { return Promise.race([p, new Promise(function (ok) { setTimeout(function () { ok(v); }, ms); })]).catch(function () { return v; }); }
  function getJ(u) { return fetch(u, { cache: "no-store" }).then(function (r) { return r.json(); }); }
  function dyn() {
    return new Promise(function (ok) {
      if (window.DYN) return ok(window.DYN);
      var s = document.createElement("script");
      s.src = "/m/dyn/forms.js?t=" + Math.floor(Date.now() / 6e5);
      s.onload = function () { ok(window.DYN || {}); }; s.onerror = function () { ok({}); };
      document.head.appendChild(s);
    });
  }
  var nk = function (x) { return String(x || "").replace(/\s|님$/g, ""); };
  var roster = wait(getJ(API + "?m=roster-list").then(function (j) {
    var l = j && j.ok && j.kv && j.kv["pub:m:roster-list:members"]; return Array.isArray(l) ? l : [];
  }), 8000, []);
  return Promise.all([roster, dyn()]).then(function (r) {
    var DY = r[1];
    var list = r[0].filter(function (d) { return d && d.slug && d.name && (LIST || []).indexOf(d.slug) < 0; });
    return Promise.all(list.map(function (d) {
      var base = { name: d.name, sex: d.sex, goal: d.goal, journey: d.start ? { start: d.start } : null };
      return wait(getJ(API + "?m=" + d.slug).then(function (j) {
        var M = j && j.ok && j.kv ? j.kv["pub:m:" + d.slug + ":member"] : null;
        return M && M.name ? M : base;
      }), 6000, base).then(function (M) {
        if (!M.journey && d.start) M.journey = { start: d.start };
        var mn = nk(M.name), f = DY[M.name];
        if (!f) { var ks = Object.keys(DY).filter(function (k) { var kk = nk(k); return kk.length >= 2 && mn.length >= 2 && (kk === mn || kk.slice(-mn.length) === mn || mn.slice(-kk.length) === kk); }); if (ks.length === 1) f = DY[ks[0]]; }
        if (f) {
          var ids = (f.forms || []).map(function (x) { return x.id; });
          M.forms = (f.forms || []).concat((M.forms || []).filter(function (x) { return ids.indexOf(x.id) < 0; }));
          M.notices = (f.notices || []).concat(M.notices || []);
        }
        return M;
      });
    }));
  }).catch(function () { return []; });
};
