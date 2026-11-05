// GYMTOS PT 노트 창고 (출석 + 인바디) — 이 코드를 Apps Script에 그대로 붙여넣고 "웹 앱"으로 배포하세요.
// 2026-11-06 인바디 추가: 시트 "인바디" 탭에 숫자, 구글 드라이브 "PT노트 인바디 사진" 폴더에 결과지 사진.
const SHEET = '출석';
const IB_SHEET = '인바디';
const IB_FOLDER = 'PT노트 인바디 사진';

function book_() {
  const act = SpreadsheetApp.getActiveSpreadsheet();
  if (act) return act;
  const p = PropertiesService.getScriptProperties();
  const id = p.getProperty('SS');
  if (id) { try { return SpreadsheetApp.openById(id); } catch (e) {} }
  const ss = SpreadsheetApp.create('PT노트 출석');
  p.setProperty('SS', ss.getId());
  return ss;
}

function sheet_() {
  const ss = book_();
  let s = ss.getSheetByName(SHEET);
  if (!s) {
    s = ss.insertSheet(SHEET);
    s.appendRow(['회원주소', '이름', '날짜', '시간', '기록시각']);
    s.setFrozenRows(1);
  }
  return s;
}

function txt_(v, f) {
  return v instanceof Date ? Utilities.formatDate(v, 'Asia/Seoul', f) : String(v);
}

function json_(o) {
  return ContentService.createTextOutput(JSON.stringify(o)).setMimeType(ContentService.MimeType.JSON);
}

/* ---------------- 인바디 */
function ibSheet_() {
  const ss = book_();
  let s = ss.getSheetByName(IB_SHEET);
  if (!s) {
    s = ss.insertSheet(IB_SHEET);
    s.appendRow(['회원주소', '이름', '측정일', '체중', '골격근량', '체지방량', '체지방률', '사진ID', '기록ID', '기록시각']);
    s.setFrozenRows(1);
  }
  return s;
}

function ibFolder_() {
  const p = PropertiesService.getScriptProperties();
  const id = p.getProperty('IBF');
  if (id) { try { return DriveApp.getFolderById(id); } catch (e) {} }
  const f = DriveApp.createFolder(IB_FOLDER);
  p.setProperty('IBF', f.getId());
  return f;
}

function ibList_(m) {
  const v = ibSheet_().getDataRange().getValues();
  const out = [];
  for (let i = 1; i < v.length; i++) {
    if (v[i][0] !== m) continue;
    out.push({ id: String(v[i][8]), d: txt_(v[i][2], 'yyyy-MM-dd'), w: Number(v[i][3]), smm: Number(v[i][4]),
               bfm: Number(v[i][5]), pbf: Number(v[i][6]), img: !!v[i][7] });
  }
  out.sort(function (a, b) { return a.d < b.d ? -1 : a.d > b.d ? 1 : 0; });
  return out;
}

function ibRow_(s, m, id) {
  const v = s.getDataRange().getValues();
  for (let i = 1; i < v.length; i++) if (v[i][0] === m && String(v[i][8]) === id) return { row: i + 1, photo: String(v[i][7] || '') };
  return null;
}

function num_(x, lo, hi) {
  const n = Number(x);
  return isFinite(n) && n >= lo && n <= hi ? Math.round(n * 10) / 10 : null;
}

function memberOk_(m) { return /^[a-z0-9-]{3,40}$/.test(m); }

/* ---------------- GET: 출석 + 인바디 보기·사진·삭제 */
function doGet(e) {
  const p = (e && e.parameter) || {};
  const m = String(p.m || '').trim();
  if (!memberOk_(m)) return json_({ ok: false, error: 'member' });

  if (p.a === 'inbody') return json_({ ok: true, inbody: ibList_(m) });
  if (p.a === 'inbody_img') {
    const r = ibRow_(ibSheet_(), m, String(p.id || ''));
    if (!r || !r.photo) return json_({ ok: false, error: 'photo' });
    const blob = DriveApp.getFileById(r.photo).getBlob();
    return json_({ ok: true, data: 'data:' + blob.getContentType() + ';base64,' + Utilities.base64Encode(blob.getBytes()) });
  }
  if (p.a === 'inbody_del') {
    const lock = LockService.getScriptLock();
    lock.waitLock(10000);
    try {
      const s = ibSheet_();
      const r = ibRow_(s, m, String(p.id || ''));
      if (r) {
        if (r.photo) { try { DriveApp.getFileById(r.photo).setTrashed(true); } catch (err) {} }
        s.deleteRow(r.row);
      }
      return json_({ ok: true, inbody: ibList_(m) });
    } finally {
      lock.releaseLock();
    }
  }

  const lock = LockService.getScriptLock();
  lock.waitLock(10000);
  try {
    const s = sheet_();
    if (p.a === 'check' || p.a === 'uncheck') {
      const d = String(p.d || '');
      if (!/^\d{4}-\d{2}-\d{2}$/.test(d)) return json_({ ok: false, error: 'date' });
      const v = s.getDataRange().getValues();
      let row = -1;
      for (let i = 1; i < v.length; i++) {
        if (v[i][0] === m && txt_(v[i][2], 'yyyy-MM-dd') === d) { row = i + 1; break; }
      }
      if (p.a === 'check' && row < 0) {
        s.appendRow([m, String(p.n || ''), "'" + d, "'" + String(p.t || ''), new Date()]);
      }
      if (p.a === 'uncheck' && row > 0) s.deleteRow(row);
    }
    const all = s.getDataRange().getValues();
    const days = {};
    for (let i = 1; i < all.length; i++) {
      if (all[i][0] === m) days[txt_(all[i][2], 'yyyy-MM-dd')] = txt_(all[i][3], 'HH:mm');
    }
    return json_({ ok: true, days: days });
  } finally {
    lock.releaseLock();
  }
}

/* ---------------- POST: 인바디 올리기 (본문 = JSON 글자) */
function doPost(e) {
  let b;
  try { b = JSON.parse((e && e.postData && e.postData.contents) || '{}'); } catch (err) { return json_({ ok: false, error: 'body' }); }
  const m = String(b.m || '').trim();
  if (!memberOk_(m)) return json_({ ok: false, error: 'member' });
  if (b.a !== 'inbody_add') return json_({ ok: false, error: 'action' });
  const d = String(b.d || '');
  if (!/^\d{4}-\d{2}-\d{2}$/.test(d)) return json_({ ok: false, error: 'date' });
  const w = num_(b.w, 20, 300), smm = num_(b.smm, 3, 90), pbf = num_(b.pbf, 1, 75);
  let bfm = num_(b.bfm, 0.5, 200);
  if (w === null || smm === null || pbf === null) return json_({ ok: false, error: 'number' });
  if (bfm === null) bfm = Math.round(w * pbf) / 100;

  const lock = LockService.getScriptLock();
  lock.waitLock(20000);
  try {
    let photo = '';
    if (b.img && String(b.img).length < 8000000) {
      const blob = Utilities.newBlob(Utilities.base64Decode(String(b.img)), 'image/jpeg', m + '_' + d + '_' + Date.now() + '.jpg');
      photo = ibFolder_().createFile(blob).getId();
    }
    const id = Utilities.getUuid().replace(/-/g, '').slice(0, 10);
    ibSheet_().appendRow([m, String(b.n || ''), "'" + d, w, smm, bfm, pbf, photo, id, new Date()]);
    return json_({ ok: true, inbody: ibList_(m) });
  } finally {
    lock.releaseLock();
  }
}
