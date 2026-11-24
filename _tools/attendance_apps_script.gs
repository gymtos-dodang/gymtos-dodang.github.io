// GYMTOS PT 노트 창고 (출석 + 인바디) — 이 코드를 Apps Script에 그대로 붙여넣고 "웹 앱"으로 배포하세요.
// 2026-11-06 인바디 추가: 시트 "인바디" 탭에 숫자, 구글 드라이브 "PT노트 인바디 사진" 폴더에 결과지 사진.
// 2026-11-06 결과지 자동 읽기(OCR): 왼쪽 "서비스 +" 에서 "Drive API"를 추가해야 동작 (없으면 회원이 숫자를 직접 넣으면 됨).
// 2026-11-11 범용 저장소(시트 "저장소" 탭) — 앞으로 새 기능은 이걸 써서 창고를 다시 배포하지 않아도 되게:
//   이름이 pub: 로 시작 = 누구나 읽기·선생님만 쓰기 / mw: = 회원도 쓰기(작은 것만) / 그 밖 = 선생님만 읽기·쓰기.
//   출석 보기(GET) 응답에 kv = pub:all:* + pub:m:<회원>:* + mw:<회원>:* 를 같이 보냄.
// 2026-11-11 전체 공지: 선생님 페이지에서 쓴 공지를 시트 "전체공지" 탭에 저장 → 모든 회원 노트 공지에 같이 나옴(60일 지난 건 안 보냄).
// 2026-11-11 보기(GET)는 잠그지 않게 바꿈 — 여러 명을 한꺼번에 불러도 실패하지 않음.
// 2026-11-10 루틴 고치기: 선생님이 폰에서 고친 루틴을 시트 "루틴" 탭에 저장 → 회원 PT 노트가 열릴 때 바로 바뀜.
//            고칠 때마다 "루틴기록" 탭에 전체 내용이 한 줄씩 쌓임(되살리기용). 선생님 열쇠는 아래 RT_KEY_HASH(열쇠 자체는 여기 없음).
const SHEET = '출석';
const RT_SHEET = '루틴';
const RT_LOG = '루틴기록';
const BN_SHEET = '전체공지';
const KV_SHEET = '저장소';
const RT_KEY_HASH = '4756ec53d712de9927d43e17e7efda99bb0a8312a08e1b82be440c1f2cf5da25';
const IB_SHEET = '인바디';
const IB_FOLDER = 'PT노트 인바디 사진';
// 2026-11-20 먹은 기록(식단 사진): 시트 "식단기록" 탭 + 드라이브 "PT노트 식단 사진" 폴더.
//   사진 자동 분석(meal_ai)은 프로젝트 설정 → 스크립트 속성 AI_KEY가 있어야 동작. 열쇠는 코드에 넣지 말 것.
//   AI_KEY: mi:<키> = Mistral(무료, Pixtral Large) / gsk_… = Groq(무료) / cf:<계정ID>:<토큰> = Cloudflare(무료) / sk-ant… = Claude / AIza…·AQ.… = Gemini. 쉼표로 여러 개 넣으면 앞에서부터 쓰고, 막히면 다음 것으로 (2026-11-20).
const ML_SHEET = '식단기록';
const ML_FOLDER = 'PT노트 식단 사진';

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
  if (s.getLastColumn() < 12) s.getRange(1, 11, 1, 2).setValues([['기초대사량', '키']]);   // 2026-11-19 결과지의 기초대사량·키도 저장
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
               bfm: Number(v[i][5]), pbf: Number(v[i][6]), img: !!v[i][7],
               bmr: Number(v[i][10]) || null, h: Number(v[i][11]) || null });
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

/* ---------------- 먹은 기록 (2026-11-20) */
function mlSheet_() { return rtSheet_(ML_SHEET, ['회원주소', '이름', '날짜', '끼니', '음식(JSON)', 'kcal', '사진ID', '작은사진', '기록ID', '기록시각', '쓴사람', '메모', '선생님한마디']); }
function mlFolder_() {
  const p = PropertiesService.getScriptProperties();
  const id = p.getProperty('MLF');
  if (id) { try { return DriveApp.getFolderById(id); } catch (e) {} }
  const f = DriveApp.createFolder(ML_FOLDER);
  p.setProperty('MLF', f.getId());
  return f;
}
function mlList_(m, d) {   // d 있으면 그날만, 없으면 최근 14일
  const v = mlSheet_().getDataRange().getValues(), out = [];
  const from = Utilities.formatDate(new Date(Date.now() - 13 * 864e5), 'Asia/Seoul', 'yyyy-MM-dd');
  for (let i = 1; i < v.length; i++) {
    if (v[i][0] !== m) continue;
    const dd = txt_(v[i][2], 'yyyy-MM-dd').replace(/^'/, '');
    if (d ? dd !== d : dd < from) continue;
    let it = []; try { it = JSON.parse(v[i][4] || '[]'); } catch (e) {}
    out.push({ id: String(v[i][8]), d: dd, t: String(v[i][3]), it: it, k: Number(v[i][5]) || 0, ph: v[i][6] ? 1 : 0, th: String(v[i][7] || ''),
      at: txt_(v[i][9], 'HH:mm'), by: String(v[i][10] || 'm'), memo: String(v[i][11] || ''), cm: String(v[i][12] || '') });
  }
  return out;
}
function mlRow_(s, m, id) {
  const v = s.getDataRange().getValues();
  for (let i = 1; i < v.length; i++) if (v[i][0] === m && String(v[i][8]) === id) return { row: i + 1, photo: String(v[i][6] || ''), th: String(v[i][7] || ''), by: String(v[i][10] || 'm'), cm: String(v[i][12] || ''), at: v[i][9] };
  return null;
}
const ML_PROMPT = '이 사진은 한 끼 식사입니다. 보이는 음식을 하나씩 알아보고, 그릇·수저·손 크기를 참고해 먹는 양을 어림한 뒤 영양을 계산하세요. 한국 음식·한국 제품 기준. ' +
  '순탄수 = 탄수화물 - 식이섬유. 조리에 쓴 기름·양념도 넣으세요. 다른 말 없이 JSON만 답하세요: ' +
  '{"items":[{"n":"음식 이름","g":먹는 양(g 숫자),"u":"알기 쉬운 양(예: 1공기, 손바닥 1장)","c":순탄수 g,"p":단백질 g,"f":지방 g,"k":칼로리 kcal}],"note":"한 줄 평(30자 안)"} ' +
  '음식 사진이 아니면 {"items":[],"note":"음식이 안 보여요"}';
function mlOpenAi_(url, token, model, img, prompt) {   // Groq·Cloudflare (OpenAI 방식)
  const r = UrlFetchApp.fetch(url, {
    method: 'post', contentType: 'application/json', muteHttpExceptions: true, headers: { Authorization: 'Bearer ' + token },
    payload: JSON.stringify({ model: model, temperature: 0.2, max_tokens: 900,
      messages: [{ role: 'user', content: [{ type: 'text', text: prompt }, { type: 'image_url', image_url: { url: 'data:image/jpeg;base64,' + img } }] }] }) });
  const j = JSON.parse(r.getContentText());
  if (!j.choices) throw new Error('openai ' + r.getResponseCode());
  return String(j.choices[0].message.content || '');
}
function mealAiAll_(keys, model, img, hint) {   // 열쇠 여러 개면 차례로 (무료 한도가 막히면 다음 것)
  let last = null;
  for (let i = 0; i < keys.length; i++) {
    try { return mealAi_(keys[i], i === 0 ? model : '', img, hint); } catch (err) { last = err; }
  }
  throw last || new Error('nokey');
}
function mealAi_(key, model, img, hint) {
  const text = aiText_(key, model, img, ML_PROMPT + (hint ? ' 먹은 사람이 적은 메모: ' + hint.slice(0, 120) : ''));
  const a = text.indexOf('{'), z = text.lastIndexOf('}');
  const o = JSON.parse(text.slice(a, z + 1));
  return { items: mlItems_(o.items), note: String(o.note || '').slice(0, 60) };
}
/* 2026-11-20 인바디 결과지도 AI가 직접 보고 숫자를 읽음 (드라이브 OCR은 폰 사진에서 자주 실패 → 예비로만) */
const IB_PROMPT = '이 사진(또는 PDF)은 InBody(인바디) 체성분 결과지입니다. 사진이 기울었거나 빛이 반사돼도 결과지를 잘 보고 이 사람의 측정값을 읽으세요. ' +
  '표준범위(괄호 안 숫자)나 예시가 아니라 실제 측정값입니다. 다른 말 없이 JSON만 답하세요: ' +
  '{"w":체중 kg,"smm":골격근량 kg,"bfm":체지방량 kg,"pbf":체지방률 %,"bmi":BMI,"bmr":기초대사량 kcal,"h":키 cm,"d":"검사일시 YYYY-MM-DD"} ' +
  '안 보이는 값은 null. 인바디 결과지가 아니면 {"none":true}';
function inbodyAi_(keys, model, img, mime) {   // mime: PDF 결과지면 'application/pdf' (2026-11-21)
  let last = null;
  for (let i = 0; i < keys.length; i++) {
    try {
      const t = aiText_(keys[i], i === 0 ? model : '', img, IB_PROMPT, mime), a = t.indexOf('{'), z = t.lastIndexOf('}');
      const o = JSON.parse(t.slice(a, z + 1));
      if (o.none) return null;
      const d = /^20\d{2}-\d{2}-\d{2}$/.test(String(o.d || '')) ? String(o.d) : null;
      return { w: num_(o.w, 20, 300), smm: num_(o.smm, 3, 90), bfm: num_(o.bfm, 0.5, 200), pbf: num_(o.pbf, 1, 75), bmi: num_(o.bmi, 12, 60), bmr: num_(o.bmr, 800, 3500), h: num_(o.h, 120, 220), d: d };
    } catch (err) { last = err; }
  }
  throw last || new Error('nokey');
}
function aiText_(key, model, img, prompt, mime) {   // 사진(또는 PDF) + 질문 → AI 답 글자 (열쇠 종류에 따라 업체 자동)
  let text = '';
  const pdf = mime === 'application/pdf';   // PDF는 Gemini·Claude만 읽음 (2026-11-21)
  if (pdf && /^mi:|^gsk_|^cf:/.test(key)) throw new Error('pdf: 이 열쇠는 PDF 못 읽음');
  if (/^mi:/.test(key)) {
    text = mlOpenAi_('https://api.mistral.ai/v1/chat/completions', key.slice(3), model || 'pixtral-large-latest', img, prompt);
  } else if (/^gsk_/.test(key)) {
    text = mlOpenAi_('https://api.groq.com/openai/v1/chat/completions', key, model || 'meta-llama/llama-4-scout-17b-16e-instruct', img, prompt);
  } else if (/^cf:/.test(key)) {
    const c = key.split(':');
    text = mlOpenAi_('https://api.cloudflare.com/client/v4/accounts/' + c[1] + '/ai/v1/chat/completions', c.slice(2).join(':'), model || '@cf/meta/llama-4-scout-17b-16e-instruct', img, prompt);
  } else if (/^AIza|^AQ\./.test(key)) {   // Gemini (2026-11-21 새 열쇠는 AQ. 로 시작 — 열쇠는 헤더로)
    // 2026-11-21 옛 모델(2.5-flash)은 새 사용자에게 막힘 → 최신 별칭부터, 404면 오류가 알려 주는 모델로 한 번 더
    const tried = {}, list = [model || 'gemini-flash-latest', 'gemini-2.5-flash', 'gemini-flash-lite-latest'];   // 2026-11-21 503(사람 많음)이면 잠깐 쉬고 다음 모델
    let j = null, code = 0, noThink = false;   // 2026-11-22 503이면 쉬지 않고 바로 다음 모델(느림 고침)
    for (let k = 0; k < list.length && k < 5; k++) {
      const mdl = list[k];
      if (tried[mdl]) continue; tried[mdl] = 1;
      const r = UrlFetchApp.fetch('https://generativelanguage.googleapis.com/v1beta/models/' + mdl + ':generateContent', {
        method: 'post', contentType: 'application/json', muteHttpExceptions: true, headers: { 'x-goog-api-key': key },
        payload: JSON.stringify({ contents: [{ parts: [{ inline_data: { mime_type: pdf ? 'application/pdf' : 'image/jpeg', data: img } }, { text: prompt }] }], generationConfig: noThink ? { temperature: 0.1 } : { temperature: 0.1, thinkingConfig: { thinkingBudget: 0 } } }) });   // 2026-11-22 생각 끄기 = 훨씬 빠름
      code = r.getResponseCode(); j = JSON.parse(r.getContentText());
      if (j.candidates) break;
      if (code === 400 && !noThink) { noThink = true; delete tried[mdl]; k--; continue; }   // 생각 끄기를 못 받는 모델이면 그대로 다시 (2026-11-24: 오류 문구에 think가 없는 "invalid argument"로 와서 사진·PDF 모두 실패했음)
      const sug = /models\/(gemini[\w.\-]*)/.exec(String(j.error && j.error.message || '').replace('models/' + mdl, ''));
      if (code === 404 && sug) list.splice(k + 1, 0, sug[1]);
    }
    if (!j || !j.candidates) throw new Error('gemini ' + code + ' ' + String(j && j.error && j.error.message || '').slice(0, 160));
    text = j.candidates[0].content.parts.map(function (x) { return x.text || ''; }).join('');
  } else {
    const r = UrlFetchApp.fetch('https://api.anthropic.com/v1/messages', {
      method: 'post', contentType: 'application/json', muteHttpExceptions: true, headers: { 'x-api-key': key, 'anthropic-version': '2023-06-01' },
      payload: JSON.stringify({ model: model || 'claude-haiku-4-5', max_tokens: 900,
        messages: [{ role: 'user', content: [pdf ? { type: 'document', source: { type: 'base64', media_type: 'application/pdf', data: img } } : { type: 'image', source: { type: 'base64', media_type: 'image/jpeg', data: img } }, { type: 'text', text: prompt }] }] }) });
    const j = JSON.parse(r.getContentText());
    if (!j.content) throw new Error('claude ' + r.getResponseCode());
    text = j.content.map(function (x) { return x.text || ''; }).join('');
  }
  return text;
}
function mlItems_(arr) {
  return (Array.isArray(arr) ? arr : []).slice(0, 12).map(function (x) {
    x = x || {};
    return { n: String(x.n || '').slice(0, 40), g: num_(x.g, 0, 5000), u: String(x.u || '').slice(0, 20), c: num_(x.c, 0, 2000), p: num_(x.p, 0, 2000), f: num_(x.f, 0, 2000), k: num_(x.k, 0, 20000) };
  }).filter(function (x) { return x.n; });
}

/* 2026-11-24 펌핑이: 글자만 주고받는 AI (Gemini 우선, sk-ant… 열쇠면 Claude) */
const PUMP_SHEET = '펌핑이질문', PUMP_MAX = 15;
const PUMP_PROMPT = '너는 JANG KAREDO PT노트의 "펌핑이"야. 장동욱 쌤(짐토스 도당점 트레이너)의 PT 회원님 곁에 있는 귀여운 보조 캐릭터(악마 뿔 달린 덤벨)야. ' +
  '역할: 회원님의 귀여운 보조. 진짜 코치는 동욱쌤이고 너는 쌤을 돕는 조수야. 밝고 힘나는 말투, 반드시 존댓말(~요), 짧게(2~5문장, 필요하면 짧은 목록). 이모지는 많아야 1개. ' +
  '답하는 범위: 간단한 기본 운동 지식만 — 운동 이름·쓰는 근육, 기본 자세 요령, 세트·횟수·휴식 같은 기초, 유산소·스트레칭 기초, 단백질·물 같은 기본 식단 상식, 아래 회원님 루틴이 무슨 날인지 같은 것. ' +
  '심화로 가는 질문(루틴 새로 짜기·분할 바꾸기·무게 처방·정체기 해결·자세 교정 세부·다이어트/벌크 식단 설계·부상 관리·보충제 고르기 등)은 기본 방향만 한두 문장으로 알려 주고, ' +
  '"이건 동욱쌤이랑 꼭 이야기하고 지도받아야 해요! 다음 수업 때 여쭤봐요" 같은 말로 쌤에게 넘겨. 직접 계획표·식단표·무게를 만들어 주지 마. ' +
  '지킬 것: (1) 통증·부상·저림·질병·약·임신은 진단하거나 운동을 권하지 말고 "동욱쌤께 꼭 먼저 말씀해 주세요"라고 안내. 가슴 통증·숨참·어지러움이면 운동을 멈추고 병원에 가라고 해. ' +
  '(2) 루틴·무게를 마음대로 바꾸라고 하지 마. (3) 모르는 건 지어내지 말고 쌤께 물어보라고 해. (4) 운동·건강과 상관없는 질문은 귀엽게 거절하고 운동 얘기로 돌려. ' +
  '(5) 약물·극단적인 굶기·위험한 감량 방법은 알려 주지 마. (6) 다른 헬스장·트레이너 홍보 금지. (7) 세 번에 한 번쯤은 답 끝에 "자세는 수업 때 동욱쌤이랑 같이 확인해요!"처럼 쌤과 이어지는 한마디를 붙여. ' +
  '(8) 답 맨 앞에 표정 하나를 [표정:걱정] 처럼 붙여: 통증·부상·불안=걱정, 식단·음식=냠냠, 자세·루틴·무게=덤벨, 칭찬·출석·잘했어요=응원, 운동과 상관없는 질문=절레, 그 밖=기본.';
function pumpAi_(key, model, sys, hist, q) {
  if (/^AIza|^AQ\./.test(key)) {
    const contents = hist.map(function (x) { return { role: x.r === 'a' ? 'model' : 'user', parts: [{ text: x.t }] }; });
    contents.push({ role: 'user', parts: [{ text: q }] });
    const tried = {}, list = [model || 'gemini-flash-latest', 'gemini-2.5-flash', 'gemini-flash-lite-latest'];
    let j = null, code = 0, noThink = false;
    for (let k = 0; k < list.length && k < 5; k++) {
      const mdl = list[k];
      if (tried[mdl]) continue; tried[mdl] = 1;
      const r = UrlFetchApp.fetch('https://generativelanguage.googleapis.com/v1beta/models/' + mdl + ':generateContent', {
        method: 'post', contentType: 'application/json', muteHttpExceptions: true, headers: { 'x-goog-api-key': key },
        payload: JSON.stringify({ systemInstruction: { parts: [{ text: sys }] }, contents: contents, generationConfig: noThink ? { temperature: 0.5 } : { temperature: 0.5, thinkingConfig: { thinkingBudget: 0 } } }) });
      code = r.getResponseCode(); j = JSON.parse(r.getContentText());
      if (j.candidates && j.candidates[0] && j.candidates[0].content) break;
      if (code === 400 && !noThink) { noThink = true; delete tried[mdl]; k--; continue; }
      const sug = /models\/(gemini[\w.\-]*)/.exec(String(j.error && j.error.message || '').replace('models/' + mdl, ''));
      if (code === 404 && sug) list.splice(k + 1, 0, sug[1]);
    }
    if (!j || !j.candidates || !j.candidates[0].content) throw new Error('gemini ' + code + ' ' + String(j && j.error && j.error.message || '').slice(0, 160));
    return j.candidates[0].content.parts.map(function (x) { return x.text || ''; }).join('');
  }
  if (/^sk-ant/.test(key)) {
    const msgs = hist.map(function (x) { return { role: x.r === 'a' ? 'assistant' : 'user', content: x.t }; });
    while (msgs.length && msgs[0].role !== 'user') msgs.shift();
    msgs.push({ role: 'user', content: q });
    const r = UrlFetchApp.fetch('https://api.anthropic.com/v1/messages', {
      method: 'post', contentType: 'application/json', muteHttpExceptions: true, headers: { 'x-api-key': key, 'anthropic-version': '2023-06-01' },
      payload: JSON.stringify({ model: model || 'claude-haiku-4-5', max_tokens: 700, system: sys, messages: msgs }) });
    const j = JSON.parse(r.getContentText());
    if (!j.content) throw new Error('claude ' + r.getResponseCode());
    return j.content.map(function (x) { return x.text || ''; }).join('');
  }
  throw new Error('pump: 이 열쇠는 글 질문 미지원');
}

function memberOk_(m) { return /^[a-z0-9-]{3,40}$/.test(m); }

/* ---------------- 루틴 (선생님이 폰에서 고친 것) */
function rtSheet_(name, head) {
  const ss = book_();
  let s = ss.getSheetByName(name);
  if (!s) {
    s = ss.insertSheet(name);
    s.appendRow(head);
    s.setFrozenRows(1);
  }
  return s;
}
function rtMain_() { return rtSheet_(RT_SHEET, ['회원주소', '이름', '기준', '루틴(JSON)', '기록시각']); }
function rtLog_() { return rtSheet_(RT_LOG, ['회원주소', '이름', '기록시각', '할일', '루틴(JSON)']); }

function keyOk_(k) {
  if (!k) return false;
  const b = Utilities.computeDigest(Utilities.DigestAlgorithm.SHA_256, String(k), Utilities.Charset.UTF_8);
  const hex = b.map(function (x) { return ('0' + ((x + 256) % 256).toString(16)).slice(-2); }).join('');
  return hex === RT_KEY_HASH;
}

function rtGet_(m) {
  const v = rtMain_().getDataRange().getValues();
  for (let i = 1; i < v.length; i++) {
    if (v[i][0] !== m) continue;
    try { return JSON.parse(String(v[i][3])); } catch (e) { return null; }
  }
  return null;
}

function rtSet_(m, n, rec) {   // rec = null 이면 지움(원래 루틴으로)
  const s = rtMain_();
  const v = s.getDataRange().getValues();
  let row = -1;
  for (let i = 1; i < v.length; i++) if (v[i][0] === m) { row = i + 1; break; }
  const js = rec ? JSON.stringify(rec) : '';
  rtLog_().appendRow([m, n, new Date(), rec ? '저장' : '원래대로', js]);
  if (!rec) { if (row > 0) s.deleteRow(row); return; }
  const line = [m, n, String(rec.base || ''), js, new Date()];
  if (row > 0) s.getRange(row, 1, 1, line.length).setValues([line]);
  else s.appendRow(line);
}

/* ---------------- 전체 공지 (선생님 페이지에서 쓰는 공지 — 모든 회원에게) */
function bnSheet_() { return rtSheet_(BN_SHEET, ['번호', '날짜', '제목', '내용', '바로가기', '기록시각']); }
function bnList_() {
  const v = bnSheet_().getDataRange().getValues(), out = [], lim = Date.now() - 60 * 86400000;
  for (let i = v.length - 1; i >= 1; i--) {
    const at = v[i][5] instanceof Date ? v[i][5].getTime() : Date.now();
    if (at < lim) continue;
    out.push({ id: String(v[i][0]), date: String(v[i][1]), title: String(v[i][2]), body: String(v[i][3]), link: String(v[i][4] || '') });
    if (out.length >= 20) break;
  }
  return out;
}

/* ---------------- 범용 저장소 (이름 → JSON 값) */
function kvSheet_() { return rtSheet_(KV_SHEET, ['이름', '값(JSON)', '기록시각']); }
function kvAll_() {
  const v = kvSheet_().getDataRange().getValues(), o = {};
  for (let i = 1; i < v.length; i++) { try { o[String(v[i][0])] = JSON.parse(String(v[i][1])); } catch (e) {} }
  return o;
}
function kvFor_(m) {   // 회원 노트가 받는 것
  const all = kvAll_(), o = {};
  Object.keys(all).forEach(function (k) {
    if (k.indexOf('pub:all:') === 0 || k.indexOf('pub:m:' + m + ':') === 0 || k.indexOf('mw:' + m + ':') === 0) o[k] = all[k];
  });
  return o;
}
function kvSet_(k, val) {   // val === null 이면 지움
  const s = kvSheet_(), v = s.getDataRange().getValues();
  let row = -1;
  for (let i = 1; i < v.length; i++) if (String(v[i][0]) === k) { row = i + 1; break; }
  if (val === null) { if (row > 0) s.deleteRow(row); return; }
  const line = [k, JSON.stringify(val), new Date()];
  if (row > 0) s.getRange(row, 1, 1, 3).setValues([line]); else s.appendRow(line);
}

/* ---------------- GET: 출석 + 인바디 보기·사진·삭제 */
function doGet(e) {
  const p = (e && e.parameter) || {};
  const m = String(p.m || '').trim();
  if (!memberOk_(m)) return json_({ ok: false, error: 'member' });

  if (p.a === 'inbody') return json_({ ok: true, inbody: ibList_(m) });
  if (p.a === 'bn') return json_({ ok: true, bnotices: bnList_() });
  if (p.a === 'all') return json_({ ok: true, all: allFor_(String(p.ms || '')) });   // 2026-11-13 선생님 페이지: 회원 n명을 요청 1번으로
  if (p.a === 'meal') return json_({ ok: true, meal: mlList_(m, /^\d{4}-\d{2}-\d{2}$/.test(String(p.d || '')) ? String(p.d) : '') });
  if (p.a === 'meal_img') {
    const r = mlRow_(mlSheet_(), m, String(p.id || ''));
    if (!r || !r.photo) return json_({ ok: false, error: 'photo' });
    const blob = DriveApp.getFileById(r.photo).getBlob();
    return json_({ ok: true, data: 'data:' + blob.getContentType() + ';base64,' + Utilities.base64Encode(blob.getBytes()) });
  }
  if (p.a === 'meal_del') {
    const lock = LockService.getScriptLock();
    lock.waitLock(10000);
    try {
      const s = mlSheet_();
      const r = mlRow_(s, m, String(p.id || ''));
      if (r) {
        if (r.photo) { try { DriveApp.getFileById(r.photo).setTrashed(true); } catch (err) {} }
        s.deleteRow(r.row);
      }
      return json_({ ok: true, meal: mlList_(m, '') });
    } finally {
      lock.releaseLock();
    }
  }
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

  /* 2026-11-11: 잠금(lock)은 출석 쓰기(check/uncheck)할 때만. 보기만 할 땐 잠그지 않음
     → 선생님 페이지가 회원 여러 명을 한꺼번에 불러도 줄 서다 실패하지 않고, 루틴 저장도 안 막힘 */
  const s = sheet_();
  if (p.a === 'check' || p.a === 'uncheck') {
    const d = String(p.d || '');
    if (!/^\d{4}-\d{2}-\d{2}$/.test(d)) return json_({ ok: false, error: 'date' });
    const lock = LockService.getScriptLock();
    lock.waitLock(25000);
    try {
      const v = s.getDataRange().getValues();
      let row = -1;
      for (let i = 1; i < v.length; i++) {
        if (v[i][0] === m && txt_(v[i][2], 'yyyy-MM-dd') === d) { row = i + 1; break; }
      }
      if (p.a === 'check' && row < 0) {
        s.appendRow([m, String(p.n || ''), "'" + d, "'" + String(p.t || ''), new Date()]);
      }
      if (p.a === 'uncheck' && row > 0) s.deleteRow(row);
      SpreadsheetApp.flush();
    } finally {
      lock.releaseLock();
    }
  }
  const all = s.getDataRange().getValues();
  const days = {};
  for (let i = 1; i < all.length; i++) {
    if (all[i][0] === m) days[txt_(all[i][2], 'yyyy-MM-dd')] = txt_(all[i][3], 'HH:mm');
  }
  let routine = null, bnotices = [], kv = {};
  try { routine = rtGet_(m); } catch (err) {}
  try { bnotices = bnList_(); } catch (err) {}
  try { kv = kvFor_(m); } catch (err) {}
  return json_({ ok: true, days: days, routine: routine, bnotices: bnotices, kv: kv, meal: 1 });   // meal: 1 = 먹은 기록을 쓸 수 있는 창고
}

/* 선생님 페이지용: 회원 여러 명의 출석·폰 루틴·저장소를 시트 한 번씩만 읽어서 */
function allFor_(ms) {
  const list = ms.split(',').map(function (x) { return x.trim(); }).filter(memberOk_).slice(0, 80);
  const out = {}, want = {};
  list.forEach(function (m) { want[m] = 1; out[m] = { days: {}, routine: null, kv: {} }; });
  const a = sheet_().getDataRange().getValues();
  for (let i = 1; i < a.length; i++) { const m = a[i][0]; if (want[m]) out[m].days[txt_(a[i][2], 'yyyy-MM-dd')] = txt_(a[i][3], 'HH:mm'); }
  try {
    const r = rtMain_().getDataRange().getValues();
    for (let i = 1; i < r.length; i++) { const m = r[i][0]; if (want[m] && !out[m].routine) { try { out[m].routine = JSON.parse(String(r[i][3])); } catch (e) {} } }
  } catch (e) {}
  try {
    const all = kvAll_();
    Object.keys(all).forEach(function (k) {
      const mm = /^(?:pub:m|mw):([^:]+):/.exec(k);
      if (mm && want[mm[1]]) out[mm[1]].kv[k] = all[k];
    });
  } catch (e) {}
  return out;
}

/* 결과지 사진 → 글자 (구글 드라이브 OCR: 사진을 구글 문서로 바꿔 글자만 읽고 바로 휴지통) */
function ocr_(b64, pdf) {   // pdf = true면 PDF 결과지(2026-11-19)
  const blob = Utilities.newBlob(Utilities.base64Decode(b64), pdf ? 'application/pdf' : 'image/jpeg', pdf ? 'inbody_ocr.pdf' : 'inbody_ocr.jpg');
  let id = null;
  try {
    id = Drive.Files.create({ name: 'inbody_ocr_tmp', mimeType: 'application/vnd.google-apps.document' }, blob, { ocrLanguage: 'ko' }).id;   // Drive API v3
  } catch (e3) {
    if (typeof Drive.Files.insert !== 'function') throw new Error('drive v3: ' + e3);
    id = Drive.Files.insert({ title: 'inbody_ocr_tmp', mimeType: 'application/vnd.google-apps.document' }, blob, { ocr: true, ocrLanguage: 'ko' }).id;   // v2
  }
  try {
    try { return DocumentApp.openById(id).getBody().getText(); }
    catch (eD) {   // 2026-11-20 문서(Docs) 권한이 없을 때: 드라이브에서 글자로 내보내기
      return UrlFetchApp.fetch('https://www.googleapis.com/drive/v3/files/' + id + '/export?mimeType=text/plain', { headers: { Authorization: 'Bearer ' + ScriptApp.getOAuthToken() } }).getContentText();
    }
  } finally {
    try { DriveApp.getFileById(id).setTrashed(true); } catch (e) {}
  }
}

/* ---------------- POST: 인바디 올리기 · 결과지 읽기 (본문 = JSON 글자) */
function doPost(e) {
  let b;
  try { b = JSON.parse((e && e.postData && e.postData.contents) || '{}'); } catch (err) { return json_({ ok: false, error: 'body' }); }
  const m = String(b.m || '').trim();
  if (!memberOk_(m)) return json_({ ok: false, error: 'member' });
  if (b.a === 'inbody_ocr') {
    if (!b.img || String(b.img).length > 8000000) return json_({ ok: false, error: 'img' });
    const pdf = b.mime === 'application/pdf', P = PropertiesService.getScriptProperties(), key = P.getProperty('AI_KEY');
    let vals = null, aiErr = '';
    if (key) {   // 2026-11-21 PDF도 AI로 (전엔 PDF는 OCR만 → 숫자 엉망)
      try { vals = inbodyAi_(key.split(',').map(function (x) { return x.trim(); }).filter(String), P.getProperty('AI_MODEL'), String(b.img), pdf ? 'application/pdf' : 'image/jpeg'); }
      catch (err) { aiErr = String(err); }
    }
    const ai = !key ? 'nokey' : aiErr ? aiErr.slice(0, 200) : vals ? 'ok' : 'none';   // 2026-11-21 AI 읽기 상태(원인 확인용)
    if (vals && vals.w !== null) return json_({ ok: true, vals: vals, text: '', ai: ai });
    try { return json_({ ok: true, vals: vals, text: ocr_(String(b.img), pdf), ai: ai }); }
    catch (err) { return vals ? json_({ ok: true, vals: vals, text: '' }) : json_({ ok: false, error: 'ocr', msg: String(err) + ' / ' + aiErr }); }
  }
  if (b.a === 'meal_ai') {   // 식단 사진 → 음식·양·순탄수·단백질·지방·칼로리 (스크립트 속성 AI_KEY 필요)
    if (!b.img || String(b.img).length > 3000000) return json_({ ok: false, error: 'img' });
    const P = PropertiesService.getScriptProperties(), key = P.getProperty('AI_KEY');
    if (!key) return json_({ ok: false, error: 'nokey' });
    const c = CacheService.getScriptCache(), ck = 'mlai:' + m, n = Number(c.get(ck) || 0);
    if (n >= 20) return json_({ ok: false, error: 'limit' });   // 회원 한 명이 6시간에 20장까지
    c.put(ck, String(n + 1), 21600);
    try { return json_({ ok: true, ai: mealAiAll_(key.split(',').map(function (x) { return x.trim(); }).filter(String), P.getProperty('AI_MODEL'), String(b.img), String(b.hint || '')) }); }
    catch (err) { return json_({ ok: false, error: 'ai', msg: String(err) }); }
  }
  if (b.a === 'pump_log') {   // 2026-11-24 선생님: 회원별 펌핑이 질문 목록 (최근 30개, 새것 먼저)
    if (!keyOk_(b.key)) return json_({ ok: false, error: 'key' });
    const want = String(b.ms || ''), sh = book_().getSheetByName(PUMP_SHEET), out = [];
    if (sh && sh.getLastRow() > 1) {
      const n = Math.min(sh.getLastRow() - 1, 1500), rows = sh.getRange(sh.getLastRow() - n + 1, 1, n, 4).getValues();
      for (let i = rows.length - 1; i >= 0 && out.length < 30; i--) {
        if (want && String(rows[i][1]) !== want) continue;
        out.push({ t: rows[i][0] instanceof Date ? Utilities.formatDate(rows[i][0], 'Asia/Seoul', 'MM-dd HH:mm') : String(rows[i][0]), m: String(rows[i][1]), q: String(rows[i][2]), a: String(rows[i][3]) });
      }
    }
    return json_({ ok: true, log: out });
  }
  if (b.a === 'pump') {   // 2026-11-24 펌핑이(운동 질문 AI) — 회원 한 명 하루 15개, 질문·답은 시트 "펌핑이질문"에 쌓임
    const q = String(b.q || '').trim().slice(0, 300);
    if (!q) return json_({ ok: false, error: 'q' });
    const P = PropertiesService.getScriptProperties(), key = P.getProperty('AI_KEY');
    if (!key) return json_({ ok: false, error: 'nokey' });
    const today = Utilities.formatDate(new Date(), 'Asia/Seoul', 'yyyy-MM-dd'), pk = 'pq:' + m;
    const was = String(P.getProperty(pk) || '').split('|'), used = was[0] === today ? Number(was[1] || 0) : 0;
    if (used >= PUMP_MAX) return json_({ ok: false, error: 'limit', left: 0 });
    P.setProperty(pk, today + '|' + (used + 1));
    const hist = (Array.isArray(b.h) ? b.h : []).slice(-6).map(function (x) { return { r: x && x.r === 'a' ? 'a' : 'q', t: String(x && x.t || '').slice(0, 400) }; });
    try {
      const keys = key.split(',').map(function (x) { return x.trim(); }).filter(String);
      let ans = '', last = null;
      for (let i = 0; i < keys.length && !ans; i++) {
        try { ans = pumpAi_(keys[i], i === 0 ? P.getProperty('AI_MODEL') : '', PUMP_PROMPT + '\n\n[이 회원님 정보]\n' + String(b.ctx || '').slice(0, 1500), hist, q); } catch (err) { last = err; }
      }
      if (!ans) throw last || new Error('empty');
      ans = ans.trim();
      const MOODS = { '걱정': 'worry', '냠냠': 'eat', '덤벨': 'lift', '응원': 'cheer', '절레': 'no', '기본': 'base' }, mt = /^\s*\[표정:\s*([^\]]+)\]\s*/.exec(ans);
      const mood = mt ? (MOODS[mt[1].trim()] || 'base') : '';
      if (mt) ans = ans.slice(mt[0].length);
      ans = ans.slice(0, 1200);
      try { rtSheet_(PUMP_SHEET, ['기록시각', '회원주소', '질문', '답']).appendRow([new Date(), m, q, ans]); } catch (e) {}
      return json_({ ok: true, a: ans, mood: mood, left: PUMP_MAX - used - 1 });
    } catch (err) {
      P.setProperty(pk, today + '|' + used);   // 실패한 질문은 개수에서 빼 줌
      return json_({ ok: false, error: 'ai', msg: String(err).slice(0, 200) });
    }
  }
  if (b.a === 'meal_add') {   // 새 기록 또는 고치기(id) — 회원·선생님 모두. 선생님 열쇠가 맞으면 쓴사람 c, 한마디(cm)도 저장
    const d = String(b.d || '');
    if (!/^\d{4}-\d{2}-\d{2}$/.test(d)) return json_({ ok: false, error: 'date' });
    const t = ['아침', '점심', '저녁', '간식'].indexOf(String(b.t)) >= 0 ? String(b.t) : '간식';
    const it = mlItems_(b.it), memo = String(b.memo || '').slice(0, 200), coach = keyOk_(b.key);
    let k = 0; it.forEach(function (x) { k += x.k || 0; });
    const lock = LockService.getScriptLock();
    lock.waitLock(20000);
    try {
      const s = mlSheet_(), r = b.id ? mlRow_(s, m, String(b.id)) : null;
      let photo = r ? r.photo : '', th = r ? r.th : '';
      if (b.img && String(b.img).length < 8000000) {
        const blob = Utilities.newBlob(Utilities.base64Decode(String(b.img)), 'image/jpeg', m + '_' + d + '_' + Date.now() + '.jpg');
        if (photo) { try { DriveApp.getFileById(photo).setTrashed(true); } catch (err) {} }
        photo = mlFolder_().createFile(blob).getId();
        th = String(b.th || '').slice(0, 40000);
      }
      if (!it.length && !photo && !memo) return json_({ ok: false, error: 'empty' });
      const cm = coach && b.cm !== undefined ? String(b.cm || '').slice(0, 300) : (r ? r.cm : '');
      const row = [m, String(b.n || ''), "'" + d, t, JSON.stringify(it), Math.round(k), photo, th, r ? String(b.id) : Utilities.getUuid().replace(/-/g, '').slice(0, 10), r ? r.at : new Date(), r ? r.by : (coach ? 'c' : 'm'), memo, cm];
      if (r) s.getRange(r.row, 1, 1, row.length).setValues([row]); else s.appendRow(row);
      SpreadsheetApp.flush();
      return json_({ ok: true, meal: mlList_(m, '') });
    } finally {
      lock.releaseLock();
    }
  }
  if (b.a === 'kv_get') {   // 선생님: 이름 앞부분(prefix)으로 읽기
    if (!keyOk_(b.key)) return json_({ ok: false, error: 'key' });
    const all = kvAll_(), pre = String(b.prefix || ''), o = {};
    Object.keys(all).forEach(function (k) { if (k.indexOf(pre) === 0) o[k] = all[k]; });
    return json_({ ok: true, kv: o });
  }
  if (b.a === 'kv_set') {   // {k, v} 또는 {items:{k:v,…}} — v가 null이면 지움
    const items = b.items && typeof b.items === 'object' ? b.items : (function () { const o = {}; o[String(b.k || '')] = b.v === undefined ? null : b.v; return o; })();
    const ks = Object.keys(items);
    if (!ks.length || ks.length > 50) return json_({ ok: false, error: 'items' });
    const coach = keyOk_(b.key);
    for (let i = 0; i < ks.length; i++) {
      const k = ks[i];
      if (!/^[a-z0-9:_\-.]{3,120}$/i.test(k)) return json_({ ok: false, error: 'name' });
      if (JSON.stringify(items[k]).length > 40000) return json_({ ok: false, error: 'size' });
      const memberW = k.indexOf('mw:' + m + ':') === 0 && JSON.stringify(items[k]).length <= 4000;
      if (!coach && !memberW) return json_({ ok: false, error: 'key' });
    }
    const lock = LockService.getScriptLock();
    lock.waitLock(25000);
    try {
      ks.forEach(function (k) { kvSet_(k, items[k] === undefined ? null : items[k]); });
      SpreadsheetApp.flush();
      return json_({ ok: true });
    } finally {
      lock.releaseLock();
    }
  }
  if (b.a === 'bn_add' || b.a === 'bn_del') {
    if (!keyOk_(b.key)) return json_({ ok: false, error: 'key' });
    const lock = LockService.getScriptLock();
    lock.waitLock(25000);
    try {
      const s = bnSheet_();
      if (b.a === 'bn_add') {
        const t = String(b.title || '').trim().slice(0, 80), body = String(b.body || '').trim().slice(0, 600);
        if (!t) return json_({ ok: false, error: 'title' });
        const link = /^[a-z0-9-]{0,30}$/.test(String(b.link || '')) ? String(b.link || '') : '';
        const now = new Date();
        s.appendRow([Utilities.getUuid().slice(0, 8), Utilities.formatDate(now, 'Asia/Seoul', 'yyyy. M. d'), t, body, link, now]);
      } else {
        const v = s.getDataRange().getValues();
        for (let i = v.length - 1; i >= 1; i--) if (String(v[i][0]) === String(b.id || '')) { s.deleteRow(i + 1); break; }
      }
      SpreadsheetApp.flush();
      return json_({ ok: true, bnotices: bnList_() });
    } finally {
      lock.releaseLock();
    }
  }
  if (b.a === 'routine_key') return json_({ ok: keyOk_(b.key), error: keyOk_(b.key) ? '' : 'key' });
  if (b.a === 'routine_save' || b.a === 'routine_reset') {
    if (!keyOk_(b.key)) return json_({ ok: false, error: 'key' });
    let rec = null;
    if (b.a === 'routine_save') {
      rec = b.rec;
      if (!rec || typeof rec !== 'object' || !rec.routine || !Array.isArray(rec.routine.days)) return json_({ ok: false, error: 'routine' });
      if (JSON.stringify(rec).length > 45000) return json_({ ok: false, error: 'size' });
      rec.at = Utilities.formatDate(new Date(), 'Asia/Seoul', 'yyyy-MM-dd HH:mm');
    }
    const lock = LockService.getScriptLock();
    lock.waitLock(25000);
    try {
      rtSet_(m, String(b.n || ''), rec);
      SpreadsheetApp.flush();
      return json_({ ok: true, routine: rec });
    } finally {
      lock.releaseLock();
    }
  }
  if (b.a !== 'inbody_add') return json_({ ok: false, error: 'action' });
  const d = String(b.d || '');
  if (!/^\d{4}-\d{2}-\d{2}$/.test(d)) return json_({ ok: false, error: 'date' });
  const w = num_(b.w, 20, 300), smm = num_(b.smm, 3, 90), pbf = num_(b.pbf, 1, 75);
  let bfm = num_(b.bfm, 0.5, 200);
  if (w === null || smm === null || pbf === null) return json_({ ok: false, error: 'number' });
  if (bfm === null) bfm = Math.round(w * pbf) / 100;
  const bmr = num_(b.bmr, 800, 3500), hgt = num_(b.h, 120, 220);

  const lock = LockService.getScriptLock();
  lock.waitLock(20000);
  try {
    let photo = '';
    if (b.img && String(b.img).length < 8000000) {
      const blob = Utilities.newBlob(Utilities.base64Decode(String(b.img)), 'image/jpeg', m + '_' + d + '_' + Date.now() + '.jpg');
      photo = ibFolder_().createFile(blob).getId();
    }
    const id = Utilities.getUuid().replace(/-/g, '').slice(0, 10);
    ibSheet_().appendRow([m, String(b.n || ''), "'" + d, w, smm, bfm, pbf, photo, id, new Date(), bmr === null ? '' : bmr, hgt === null ? '' : hgt]);
    return json_({ ok: true, inbody: ibList_(m) });
  } finally {
    lock.releaseLock();
  }
}
