// GYMTOS PT 노트 출석 창고 — 이 코드를 Apps Script에 그대로 붙여넣고 "웹 앱"으로 배포하세요.
const SHEET = '출석';

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

function doGet(e) {
  const p = (e && e.parameter) || {};
  const m = String(p.m || '').trim();
  if (!/^[a-z0-9-]{3,40}$/.test(m)) return json_({ ok: false, error: 'member' });
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
