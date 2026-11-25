import * as config from '../../config.js';
import {
  blank, stat, isNew, isMastered, isMissed, record, setSession, reset, sectionIndex,
  summary, sectionSummary, pickQuestions, buildExam, scoreExam, HISTORY_LIMIT, idIndex, normalize,
} from '../core/progress.js';
import * as learn from '../core/learn.js';
import { loadLocal, saveLocal } from '../storage/local.js';
import { createCloud } from '../storage/cloud.js';
import { FLAGS, flagSvg } from './flags.js';
import { EXPLAINED, warm, loaded, whyHtml, sourcesHtml } from './explain.js';

const $ = s => document.querySelector(s);
const $$ = s => [...document.querySelectorAll(s)];
const esc = s => String(s).replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
const L = 'ABCD';

let D = null;              // question pools
const P = {};              // progress per pool id
let view = { name: 'home' };
let cloud = null;
let acct = { configured: false, user: null, status: 'signed-out', message: '' };
let tick = null;
const secCache = {};

const pool = id => D.pools.find(p => p.id === id);
const secOf = p => (secCache[p.id] ||= sectionIndex(p));
/** The key topic / group each question belongs to: { sec, g } by position in pool.q. */
const grpCache = {};
const groupOf = (p, qi) => {
  if (!grpCache[p.id]) {
    grpCache[p.id] = [];
    p.sections.forEach(sec => sec.g.forEach(g => g.q.forEach(i => { grpCache[p.id][i] = { sec, g }; })));
  }
  return grpCache[p.id][qi];
};
const why = (p, qi, letter) => whyHtml(loaded(p.id), p.q[qi][0], letter, groupOf(p, qi).g, esc);
/** Position in pool.q of a question id. */
const ix = (p, id) => idIndex(p).get(id);

/* ---------- saving ---------- */
/** slot: 'learn' or 'exam' when that session changed. */
function save(id, slot) {
  const p = P[id];
  p.u = Date.now();
  if (slot) p[slot + 'U'] = p.u;
  saveLocal(id, p);
  cloud?.schedule(id);
}

const store = {
  get ids() { return D.pools.map(p => p.id); },
  get: id => P[id],
  normalize: (id, p) => normalize(pool(id), p),
  put(id, p, fromServer) {
    const slot = view.name === 'exam' ? 'exam' : 'learn';
    const before = JSON.stringify(P[id]?.[slot] ?? null);
    P[id] = p ? normalize(pool(id), { ...blank(), ...p, v: p.v || 1 }) : blank();
    saveLocal(id, P[id]);
    if (!fromServer) return;
    const mine = view.pool === id;
    // Another device changed the open session (finished it, or started a newer one): follow it.
    const sessionMoved = mine && ['learn', 'exam'].includes(view.name) && JSON.stringify(P[id][slot]) !== before;
    if (view.name === 'home' || (mine && ['pool', 'browse'].includes(view.name)) || sessionMoved) render();
  },
};

/* ---------- small pieces ---------- */
const meter = (a, b, n) => `<div class="meter" role="img" aria-label="${a} mastered, ${b} seen of ${n}"><i class="m1" style="width:${n ? a / n * 100 : 0}%"></i><i class="m2" style="width:${n ? (b - a) / n * 100 : 0}%"></i></div>`;
const figure = (f, lazy) => f ? `<button class="fig" data-fig="${esc(f)}" aria-label="Enlarge figure ${esc(f)}"><img ${lazy ? 'loading="lazy"' : ''} src="figs/${esc(f)}.png" alt="Figure ${esc(f)}"></button>` : '';
const when = t => `${new Date(t).toLocaleDateString(undefined, { month: 'short', day: 'numeric' })} ${new Date(t).toLocaleTimeString(undefined, { hour: 'numeric', minute: '2-digit' })}`;

function header(p) {
  $('#crumb').innerHTML = p ? `<div class="crumb"><button data-go="home">All exams</button></div>` : '';
  $('#hdr').innerHTML = p
    ? `<div class="row" style="gap:16px">${flagSvg(p.id)}<div><h1>${esc(p.name)}</h1><div class="sub">${esc(p.code)} · ${esc(p.desc)} · ${p.q.length} questions</div></div></div>`
    : `<h1>Radio Exam Study</h1><div class="sub">Study for the FCC radio exams. Learn every question, retry the ones you miss, and take practice exams built like the real ones.</div>`;
}

function acctButton() {
  if (!acct.configured) { $('#acct').innerHTML = ''; return; }
  $('#acct').innerHTML = acct.user
    ? `<button class="acct" data-act="account" title="Account and sync"><span class="dot ${acct.status}"></span>${esc(acct.user.email || 'Account')}</button>`
    : `<button class="acct" data-act="account">Sign in</button>`;
}

function foot() {
  const where = !acct.configured ? 'Progress is saved on this device.'
    : acct.user ? ({ synced: 'Progress is synced to your account.', syncing: 'Syncing…', offline: 'Offline. Progress is saved on this device and will sync when you reconnect.', error: `Sync problem: ${esc(acct.message)}` }[acct.status] || 'Progress is synced to your account.')
    : 'Progress is saved on this device. Sign in to save and access your progress across multiple devices.';
  $('#foot').innerHTML = `<p>${where}</p><p>Questions: ${D.pools.map(p => esc(`${p.code}, ${p.src}`)).join('; ')}. Answer keys are the official FCC and NCVEC keys. <button class="linkbtn" data-act="flags">About the flags</button></p>`;
}

/* ---------- home ---------- */
const GROUPS = [
  { cat: 'amateur', title: 'Amateur radio', note: 'Ham licenses, given by volunteer examiners. Each one builds on the one before.' },
  { cat: 'commercial', title: 'Commercial radio', note: 'FCC commercial operator licenses for marine and aviation radio work.' },
];

function poolCard(p) {
  const s = summary(p, P[p.id]), h = P[p.id].hist, last = h[h.length - 1];
  return `<button class="card pool" data-go="pool:${p.id}"><div class="top">${flagSvg(p.id)}<div><h3>${esc(p.name)}</h3><div class="k">${esc(p.code)}</div></div></div>
    ${meter(s.mastered, s.seen, s.n)}<div class="k">${s.mastered} of ${s.n} mastered · ${s.seen} seen${last ? ` · last exam ${last.score}/${last.n} ${last.pass ? 'pass' : 'fail'}` : ''}</div>
    ${P[p.id].learn || P[p.id].exam ? `<div class="k" style="color:var(--blue)">Unfinished ${[P[p.id].learn && 'study session', P[p.id].exam && 'practice exam'].filter(Boolean).join(' and ')}</div>` : ''}</button>`;
}

function home() {
  header(null);
  $('#app').innerHTML = GROUPS.map((g, i) => `<section class="${i ? 'sec' : ''}"><h2>${g.title}</h2><p class="note" style="margin:4px 0 14px">${g.note}</p>
  <div class="grid">${D.pools.filter(p => p.cat === g.cat).map(poolCard).join('')}</div></section>`).join('') + `
  <div class="legend" style="margin-top:14px"><span style="--c:var(--green)">Mastered (right three times in a row)</span><span style="--c:color-mix(in srgb,var(--blue) 55%,transparent)">Seen</span></div>`;
}

/* ---------- pool overview ---------- */
function poolView() {
  const p = pool(view.pool), st = P[p.id], s = summary(p, st);
  header(p);
  const secs = sectionSummary(p, st);
  const rows = p.sections.map((x, si) => `<tr><td><b>${esc(x.id)}</b> ${esc(x.t)}</td><td class="n">${secs[si].groups}</td><td style="width:34%">${meter(secs[si].mastered, secs[si].seen, secs[si].n)}</td><td class="n">${secs[si].mastered}/${secs[si].n}</td></tr>`).join('');
  const hist = st.hist.map((h, k) => [h, k]).reverse().slice(0, 12).map(([h, k]) => `<tr><td>${when(h.t)}</td><td class="n">${h.score}/${h.n}</td><td><span class="pill ${h.pass ? 'pass' : 'fail'}">${h.pass ? 'Pass' : 'Fail'}</span></td><td class="n">${Math.round(h.secs / 60)} min</td><td class="n"><button class="btn" data-review="${k}">Review</button></td></tr>`).join('');
  const banner = slot => {
    const ss = st[slot];
    if (!ss) return '';
    return `<div class="resume"><div><b>You have an unfinished ${slot === 'exam' ? 'practice exam' : 'study session'}.</b><div class="note">${slot === 'exam' ? `${Object.keys(ss.ans).length} of ${ss.qs.length} answered` : `${ss.done} questions answered so far`}</div></div><div class="row"><button class="btn pri" data-act="resume" data-slot="${slot}">Resume</button><button class="btn" data-act="discard" data-slot="${slot}">Discard</button></div></div>`;
  };
  $('#app').innerHTML = `
  ${banner('learn')}${banner('exam')}
  <div style="margin-top:8px">${meter(s.mastered, s.seen, s.n)}<div class="k" style="margin-top:6px">${s.mastered} mastered · ${s.seen} seen · ${s.missed} missed and not yet re-learned · ${s.n} total</div></div>
  <div class="actions">
    <button class="action" data-act="setup"><b>Learn</b><span>Go through the pool in order or at random. Missed questions come back until you get them right.</span></button>
    <button class="action" data-act="exam"><b>Practice exam</b><span>${p.n} questions, one from each ${p.gl.toLowerCase()}, like the real test. Pass with ${p.p} correct.</span></button>
    <button class="action" data-act="browse"><b>Read the pool</b><span>Every question with its correct answer, searchable. Hide answers to self-check.</span></button>
  </div>
  <section class="sec"><h2>By subelement</h2><div class="scroll"><table><thead><tr><th>Subelement</th><th class="n">Exam Qs</th><th>Progress</th><th class="n">Mastered</th></tr></thead><tbody>${rows}</tbody></table></div></section>
  ${guideHtml(p)}
  <section class="sec"><h2>Practice exams</h2>${hist ? `<div class="scroll"><table><thead><tr><th>Taken</th><th class="n">Score</th><th>Result</th><th class="n">Time</th><th></th></tr></thead><tbody>${hist}</tbody></table></div>` : `<p class="note">No practice exams yet. Passing takes ${p.p} of ${p.n} (${Math.round(p.p / p.n * 100)}%).</p>`}</section>
  <section class="sec"><button class="btn" data-act="reset">Reset progress for this exam</button></section>`;
}

function guideHtml(p) {
  const ex = loaded(p.id);
  if (!ex) return '';
  return `<section class="sec"><h2>Study guide</h2><p class="note" style="margin:0 0 12px">A short page for each key topic: the rules behind it, with links to the official text and further reading.</p>
  ${p.sections.filter(sec => sec.g.some(g => ex.topics[g.id])).map(sec => `<div class="guide"><div class="k"><b>${esc(sec.id)}</b> ${esc(sec.t)}</div><div class="row">${sec.g.filter(g => ex.topics[g.id]).map(g => `<button class="btn" data-topic="${esc(g.id)}">${esc(g.t)}</button>`).join('')}</div></div>`).join('')}
  ${p.sections.some(sec => sec.g.some(g => !ex.topics[g.id])) ? '<p class="note">Topics not listed here don\'t have reviewed explanations yet.</p>' : ''}</section>`;
}

function topicView() {
  const p = pool(view.pool), ex = loaded(p.id);
  header(p);
  const sec = p.sections.find(s => s.g.some(g => g.id === view.idx)), g = sec && sec.g.find(x => x.id === view.idx), t = ex && ex.topics[view.idx];
  if (!t) { $('#app').innerHTML = '<p class="note">Loading…</p>'; return; }
  $('#app').innerHTML = `<div class="row" style="margin-bottom:12px"><button class="btn" data-act="topicback">← Back</button></div>
  <article class="qcard topic"><div class="qmeta"><span class="qid">${esc(p.gl)} ${esc(g.id)}</span><span>${esc(sec.id)} · ${esc(sec.t)}</span></div>
  <h2>${esc(g.t)}</h2><p class="lede">${esc(t.intro)}</p>
  ${(t.diagrams || []).map(d => `<figure class="diagram"><div class="scroll" tabindex="0" role="group" aria-label="Diagram (scrolls sideways on small screens)">${d.svg}</div><figcaption>${esc(d.caption)}${d.cite ? ` <a href="${esc(d.url)}" target="_blank" rel="noopener" class="cite">${esc(d.cite)}</a>` : ''}</figcaption></figure>`).join('')}
  <h3>Key facts</h3><ul class="facts">${t.facts.map(f => `<li>${esc(f.text)} <a href="${esc(f.url)}" target="_blank" rel="noopener" class="cite">${esc(f.cite)}</a></li>`).join('')}</ul>
  ${t.rules.length ? `<h3>The rules behind this topic</h3>${sourcesHtml(t.rules, esc)}` : ''}
  ${t.reading.length ? `<h3>Further reading</h3><ul class="why-src">${t.reading.map(x => `<li><a href="${esc(x.url)}" target="_blank" rel="noopener">${esc(x.title)}</a></li>`).join('')}</ul>` : ''}
  <h3>Questions in this topic</h3><div class="list">${g.q.map(i => { const q = p.q[i]; return `<div class="item"><span class="qid">${esc(q[0])}</span><p>${esc(q[1])}</p><div class="ans r">${L[q[3]]}. ${esc(q[2][q[3]])}</div>${why(p, i, L[q[3]]) ? `<details class="whyd"><summary>Why ${L[q[3]]}?</summary>${why(p, i, L[q[3]])}</details>` : '<p class="note">No explanation yet.</p>'}</div>`; }).join('')}</div>
  <p class="note" style="margin-top:16px">Explanations quote the current official text. Where today's rule differs from the exam's answer key, a “Heads up” note says so; the exam still grades on its key.</p></article>`;
}

/* ---------- learn ---------- */
function setupView() {
  const p = pool(view.pool), st = P[p.id];
  header(p);
  const count = f => p.q.filter(q => f(stat(st, q[0]))).length;
  const o = st.opts || { order: 'cont', which: 'all', size: '20', shuf: false };
  const r = (name, val, label, extra = '') => `<label><input type="radio" name="${name}" value="${val}" ${o[name] === val ? 'checked' : ''}><span>${label}${extra}</span></label>`;
  $('#app').innerHTML = `<div class="card"><h2 style="margin-bottom:16px">Set up a study session</h2>
  <form id="setup">
  <fieldset><legend>Order</legend><div class="seg">${r('order', 'cont', 'In order, pick up where I left off')}${r('order', 'start', 'In order from the first question')}${r('order', 'rand', 'Random')}</div></fieldset>
  <fieldset><legend>Questions</legend><div class="seg">${r('which', 'all', 'All', `<small>${p.q.length}</small>`)}${r('which', 'new', 'Never seen', `<small>${count(isNew)}</small>`)}${r('which', 'missed', 'Missed before', `<small>${count(isMissed)}</small>`)}${r('which', 'notm', 'Not mastered', `<small>${count(s => !isMastered(s))}</small>`)}</div></fieldset>
  <fieldset><legend>Subelements</legend><div class="seg">${p.sections.map((s, i) => `<label><input type="checkbox" name="sec" value="${i}" ${!o.secs || o.secs.includes(i) ? 'checked' : ''}><span><b>${esc(s.id)}</b>&nbsp;${esc(s.t)}</span></label>`).join('')}</div>
   <div class="row" style="margin-top:8px"><button type="button" class="btn" data-act="secall">Select all</button><button type="button" class="btn" data-act="secnone">Clear</button></div></fieldset>
  <fieldset><legend>Questions per round</legend><div class="seg">${['10', '20', '40', 'all'].map(v => r('size', v, v === 'all' ? 'Everything at once' : v)).join('')}</div></fieldset>
  <fieldset><legend>Answer choices</legend><div class="seg"><label><input type="checkbox" name="shuf" ${o.shuf ? 'checked' : ''}><span>Shuffle A–D</span></label></div><p class="note">The real exam may list choices in a different order from the pool, so shuffling helps you learn the answer instead of the letter. Questions with “all of these” or “both a) and c)” choices stay in order.</p></fieldset>
  <p class="note" id="cnt"></p>
  <div class="row"><button class="btn pri big" type="submit">Start</button><button class="btn" type="button" data-go="pool:${p.id}">Cancel</button></div>
  </form></div>`;
  const f = $('#setup');
  const read = () => { const d = new FormData(f); return { order: d.get('order'), which: d.get('which'), size: d.get('size'), shuf: !!d.get('shuf'), secs: d.getAll('sec').map(Number) }; };
  const upd = () => { $('#cnt').textContent = `${pickQuestions(p, st, read()).length} questions match.`; };
  f.addEventListener('change', upd); upd();
  f.addEventListener('submit', e => {
    e.preventDefault();
    const opts = read(), list = pickQuestions(p, st, opts);
    if (!list.length) { $('#cnt').textContent = 'No questions match. Choose more subelements or a different set.'; return; }
    st.opts = opts;
    beginLearn(p, list, opts);
  });
}

function beginLearn(p, list, opts) {
  setSession(P[p.id], 'learn', learn.startLearn(list, opts));
  save(p.id, 'learn');
  go('learn', p.id);
}

function qBlock(p, qi) {
  const q = p.q[qi], sec = p.sections[secOf(p)[qi]];
  return `<div class="qmeta"><span class="qid">${esc(q[0])}</span><span>${esc(sec.id)} · ${esc(sec.t)}</span></div>
  <p class="qtext">${esc(q[1])}</p>${figure(q[4])}`;
}

function learnView() {
  const p = pool(view.pool), s = P[p.id].learn;
  header(p);
  if (!s) return go('pool', p.id);
  if (s.phase === 'sum') return learnSummary(p, s);
  const id = learn.current(s), qi = ix(p, id), q = p.q[qi], ord = learn.choiceOrder(s, id, q), answered = s.pick !== null;
  const tot = s.queue.length, pos = Math.min(s.qpos, tot);
  $('#app').innerHTML = `<div class="prog"><span>${s.retry ? `Retry round ${s.retry}` : `Round ${Math.ceil(pos / s.size) || 1}`} · ${s.i + 1} of ${s.round.length}</span><div class="meter"><i class="m1" style="width:${s.i / s.round.length * 100}%"></i></div><span>${pos} of ${tot} drawn</span></div>
  <div class="qcard">${qBlock(p, qi)}
  <div class="choices">${ord.map((o, k) => {
    let c = '';
    if (answered) { if (o === q[3]) c = 'right'; else if (o === s.pick) c = 'wrong'; }
    return `<button class="ch ${c}" data-pick="${o}" ${answered ? 'disabled' : ''}><span class="L">${L[k]}</span><span>${esc(q[2][o])}</span></button>`;
  }).join('')}</div>
  ${answered ? `<div class="fb ${s.pick === q[3] ? 'ok' : 'no'}"><span>${s.pick === q[3] ? 'Correct.' : `Not quite. The answer is ${L[ord.indexOf(q[3])]}.${s.retry ? '' : ' You’ll get it again in the retry round.'}`}</span><span class="row">${s.pick === q[3] && why(p, qi, L[ord.indexOf(q[3])]) && view.why !== id ? '<button class="btn" data-act="showwhy">Why?</button>' : ''}<button class="btn pri" data-act="next">Continue</button></span></div>
  ${s.pick !== q[3] || view.why === id ? why(p, qi, L[ord.indexOf(q[3])]) : ''}` : ''}
  </div>
  <div class="bar"><button class="btn" data-act="pauselearn">Save and exit</button><span class="kbd">Keys: 1–4 or A–D to answer, Enter to continue</span></div>`;
  if (answered) $('[data-act=next]').focus();
}

function learnSummary(p, s) {
  const more = learn.hasMore(s), n = s.round.length, miss = s.miss.length;
  $('#app').innerHTML = `<div class="qcard"><h2>${miss ? `${n - miss} of ${n} right` : s.retry ? 'All of them right now' : `All ${n} right`}</h2>
  <p class="note" style="margin-top:8px">${miss ? `Retry the ${miss} you missed until each one sticks.` : more ? `${s.queue.length - s.qpos} questions left in this session.` : `That's every question in this session. ${s.first[0]} of ${s.first[1]} were right on the first try.`}</p>
  ${miss ? `<div class="list">${s.miss.map(id => { const q = p.q[ix(p, id)]; return `<div class="item"><span class="qid">${esc(q[0])}</span><p>${esc(q[1])}</p><div class="ans r">${esc(q[2][q[3]])}</div></div>`; }).join('')}</div>` : ''}
  <div class="row" style="margin-top:18px">${miss ? `<button class="btn pri big" data-act="retry">Retry ${miss} missed</button>` : more ? `<button class="btn pri big" data-act="nextround">Next ${Math.min(s.size, s.queue.length - s.qpos)} questions</button>` : ''}
  <button class="btn" data-act="endlearn">${more || miss ? 'Stop for now' : 'Finish'}</button></div>
  ${more || miss ? '<p class="note" style="margin-top:12px">Stopping ends this session. Your answers are saved, and anything you missed is under “Missed before” next time.</p>' : ''}</div>`;
}

function pickLearn(o) {
  const p = pool(view.pool), st = P[p.id], s = st.learn;
  const id = learn.current(s);
  const ok = learn.answer(s, o, p.q[ix(p, id)][3]);
  if (ok === null) return;
  record(st, id, ok);
  save(p.id, 'learn');
  render();
}

function nextLearn() {
  view.why = null;
  const p = pool(view.pool), s = P[p.id].learn;
  learn.advance(s);
  save(p.id, 'learn');
  render();
}

/* ---------- practice exam ---------- */
function beginExam(p) {
  setSession(P[p.id], 'exam', { qs: buildExam(p), ans: {}, flag: {}, cur: 0, secs: 0 });
  save(p.id, 'exam');
  go('exam', p.id);
}

function examView() {
  const p = pool(view.pool), s = P[p.id].exam;
  header(p);
  if (!s) return go('pool', p.id);
  const qi = ix(p, s.qs[s.cur]), q = p.q[qi], a = s.ans[s.cur], n = Object.keys(s.ans).length, nf = Object.values(s.flag).filter(Boolean).length;
  $('#app').innerHTML = `<div class="prog"><span>Question ${s.cur + 1} of ${s.qs.length}</span><div class="meter"><i class="m2" style="width:${n / s.qs.length * 100}%"></i></div><span id="clock"></span></div>
  <div class="qcard">${qBlock(p, qi)}
  <div class="choices">${[0, 1, 2, 3].map(o => `<button class="ch ${a === o ? 'picked' : ''}" data-pick="${o}"><span class="L">${L[o]}</span><span>${esc(q[2][o])}</span></button>`).join('')}</div>
  <div class="bar"><div class="row"><button class="btn" data-act="prev" ${s.cur ? '' : 'disabled'}>Previous</button><button class="btn ${s.cur < s.qs.length - 1 ? 'pri' : ''}" data-act="nextq" ${s.cur < s.qs.length - 1 ? '' : 'disabled'}>Next</button></div>
  <div class="row"><button class="btn" data-act="flag">${s.flag[s.cur] ? 'Unflag' : 'Flag for review'}</button><button class="btn ${n === s.qs.length ? 'pri' : ''}" data-act="submit">Submit exam</button></div></div></div>
  <div class="nav" aria-label="Question navigator">${s.qs.map((x, k) => `<button data-jump="${k}" class="${s.ans[k] !== undefined ? 'done' : ''} ${k === s.cur ? 'cur' : ''} ${s.flag[k] ? 'fl' : ''}" aria-label="Question ${k + 1}">${k + 1}</button>`).join('')}</div>
  <p class="note" style="margin-top:12px">${n} of ${s.qs.length} answered${nf ? ` · ${nf} flagged` : ''}. No feedback until you submit. Needs ${p.p} correct to pass.</p>
  <div class="bar"><button class="btn" data-act="leave">Save and leave</button><span class="kbd">Keys: 1–4 or A–D to answer, ← → to move</span></div>`;
  startClock();
}

function startClock() {
  clearInterval(tick);
  const c = $('#clock'), s = P[view.pool].exam;
  if (!c || !s) return;
  const t0 = Date.now() - s.secs * 1000;
  const f = () => { const x = Math.floor((Date.now() - t0) / 1000); s.secs = x; c.textContent = `${Math.floor(x / 60)}:${String(x % 60).padStart(2, '0')} elapsed`; };
  f(); tick = setInterval(f, 1000);
}

function submitExam(force) {
  const p = pool(view.pool), st = P[p.id], s = st.exam, left = s.qs.length - Object.keys(s.ans).length;
  if (left && !force) {
    modal(`<h3>Submit with ${left} unanswered?</h3><p class="note">Unanswered questions count as wrong.</p><div class="row"><button class="btn pri" data-act="submit2">Submit</button><button class="btn" data-act="close">Keep going</button></div>`);
    return;
  }
  clearInterval(tick);
  const ans = s.qs.map((x, k) => s.ans[k] ?? -1);
  const r = scoreExam(p, s.qs, ans);
  const now = Date.now();
  s.qs.forEach((id, k) => record(st, id, r.right[k], now));
  st.hist.push({ t: now, score: r.score, n: r.n, pass: r.pass, secs: s.secs, qs: s.qs, ans, by: r.by });
  if (st.hist.length > HISTORY_LIMIT) st.hist.shift();
  setSession(st, 'exam', null, now);
  save(p.id, 'exam');
  go('result', p.id, st.hist.length - 1);
}

function resultView() {
  const p = pool(view.pool), h = P[p.id].hist[view.idx];
  header(p);
  if (!h) return go('pool', p.id);
  const miss = h.qs.map((id, k) => [ix(p, id), h.ans[k]]).filter(([qi, a]) => a !== p.q[qi][3]);
  $('#app').innerHTML = `<div class="qcard"><div class="score"><span class="big">${h.score}/${h.n}</span><div><span class="pill ${h.pass ? 'pass' : 'fail'}">${h.pass ? 'Pass' : 'Fail'}</span><div class="note" style="margin-top:6px">${Math.round(h.score / h.n * 100)}% · pass mark ${p.p} · ${Math.round(h.secs / 60)} min · ${new Date(h.t).toLocaleString()}</div></div></div>
  <div class="scroll"><table><thead><tr><th>Subelement</th><th class="n">Right</th></tr></thead><tbody>${p.sections.map(s => { const b = h.by[s.id]; return b ? `<tr><td><b>${esc(s.id)}</b> ${esc(s.t)}</td><td class="n" style="color:${b[0] < b[1] ? 'var(--red)' : 'inherit'}">${b[0]}/${b[1]}</td></tr>` : ''; }).join('')}</tbody></table></div>
  <div class="row" style="margin-top:18px">${miss.length ? `<button class="btn pri" data-act="learnmiss">Learn the ${miss.length} I missed</button>` : ''}<button class="btn" data-act="exam">New practice exam</button><button class="btn" data-go="pool:${p.id}">Back</button></div></div>
  <section class="sec"><h2>${miss.length ? 'Missed questions' : 'No misses'}</h2><div class="list">${miss.map(([qi, a]) => {
    const q = p.q[qi];
    return `<div class="item"><span class="qid">${esc(q[0])}</span><p>${esc(q[1])}</p>${figure(q[4], true)}${q[2].map((c, o) => `<div class="ans ${o === q[3] ? 'r' : o === a ? 'y' : ''}">${L[o]}. ${esc(c)}${o === a ? ' <span class="tag w">your answer</span>' : ''}</div>`).join('')}${a < 0 ? '<div class="note">Not answered</div>' : ''}${why(p, qi, L[q[3]])}</div>`;
  }).join('')}</div></section>`;
}

/* ---------- read the pool ---------- */
function browseView() {
  const p = pool(view.pool), st = P[p.id];
  header(p);
  const o = view.b || (view.b = { q: '', sec: 'all', hide: false, only: 'all' });
  $('#app').innerHTML = `<div class="filters"><input type="search" id="bq" placeholder="Search questions and answers" value="${esc(o.q)}" aria-label="Search">
  <select id="bs" aria-label="Subelement"><option value="all">All subelements</option>${p.sections.map((s, i) => `<option value="${i}" ${String(i) === o.sec ? 'selected' : ''}>${esc(s.id)} · ${esc(s.t)}</option>`).join('')}</select></div>
  <div class="row" style="justify-content:space-between"><div class="seg"><label><input type="checkbox" id="bh" ${o.hide ? 'checked' : ''}><span>Hide answers</span></label><label><input type="checkbox" id="bm" ${o.only === 'missed' ? 'checked' : ''}><span>Only ones I've missed</span></label></div><button class="btn" data-go="pool:${p.id}">Back</button></div>
  <p class="note" id="bn"></p><div class="list ${o.hide ? 'hidden-ans' : ''}" id="bl"></div>`;
  const draw = () => {
    const t = o.q.toLowerCase(), out = [];
    p.sections.forEach((s, si) => {
      if (o.sec !== 'all' && String(si) !== o.sec) return;
      s.g.forEach(g => {
        const qs = g.q.filter(i => {
          const q = p.q[i];
          if (o.only === 'missed' && !isMissed(stat(st, q[0]))) return false;
          return !t || `${q[0]} ${q[1]} ${q[2].join(' ')}`.toLowerCase().includes(t);
        });
        if (!qs.length) return;
        out.push(`<h3 style="margin-top:22px">${esc(s.id)} · ${esc(g.id)} ${esc(g.t)}</h3>` + qs.map(i => {
          const q = p.q[i], ss = stat(st, q[0]);
          return `<div class="item"><span class="qid">${esc(q[0])}</span>${isMastered(ss) ? '<span class="tag g">mastered</span>' : isMissed(ss) ? `<span class="tag w">missed ${ss[1]}×</span>` : ''}<p>${esc(q[1])}</p>${figure(q[4], true)}${q[2].map((c, k) => `<div class="ans ${k === q[3] ? 'r' : ''}" ${k === q[3] ? 'data-reveal' : ''}>${L[k]}. ${esc(c)}</div>`).join('')}${why(p, i, L[q[3]]) ? `<details class="whyd"><summary>Why ${L[q[3]]}?</summary>${why(p, i, L[q[3]])}</details>` : ''}</div>`;
        }).join(''));
      });
    });
    $('#bl').innerHTML = out.join('') || '<p class="note">Nothing matches.</p>';
    $('#bn').textContent = o.hide ? 'Answers hidden. Tap a question to reveal its answer.' : 'Correct answers are marked with a green bar.';
  };
  $('#bq').oninput = e => { o.q = e.target.value; draw(); };
  $('#bs').onchange = e => { o.sec = e.target.value; draw(); };
  $('#bh').onchange = e => { o.hide = e.target.checked; $('#bl').classList.toggle('hidden-ans', o.hide); draw(); };
  $('#bm').onchange = e => { o.only = e.target.checked ? 'missed' : 'all'; draw(); };
  draw();
}

/* ---------- account ---------- */
function accountModal(msg = '', kind = '') {
  const note = msg ? `<p class="msg ${kind}">${esc(msg)}</p>` : '';
  if (acct.user) {
    const status = { synced: 'Synced', syncing: 'Syncing…', offline: 'Offline — changes will sync when you reconnect', error: `Sync problem: ${acct.message}` }[acct.status] || '';
    modal(`<h3>Your account</h3><p class="note">Signed in as <b>${esc(acct.user.email)}</b>. ${esc(status)}</p>
    <div class="row" style="margin-top:12px"><button class="btn" data-act="syncnow">Sync now</button><button class="btn" data-act="signout">Sign out</button><button class="btn" data-act="close">Close</button></div>
    <form id="pwform"><label>New password<input type="password" name="pw" autocomplete="new-password" minlength="8" required></label><button class="btn" type="submit">Change password</button></form>${note}
    <p class="note" style="margin-top:10px">Signing out removes your progress from this device. It stays in your account.</p>`);
    $('#pwform').onsubmit = async e => {
      e.preventDefault();
      try { await cloud.setPassword(new FormData(e.target).get('pw')); accountModal('Password changed.', 'ok'); }
      catch (err) { accountModal(err.message, 'err'); }
    };
    return;
  }
  const mode = accountModal.mode || 'in';
  modal(`<h3>${mode === 'in' ? 'Sign in' : 'Create an account'}</h3>
  <p class="note">Sign in to save and access your progress across multiple devices. Progress you already have on this device is kept.</p>
  <form id="authform"><label>Email<input type="email" name="email" autocomplete="email" required value="${esc(accountModal.email || '')}"></label>
  <label>Password<input type="password" name="pw" autocomplete="${mode === 'in' ? 'current-password' : 'new-password'}" minlength="8" required></label>
  <button class="btn pri" type="submit">${mode === 'in' ? 'Sign in' : 'Create account'}</button>
  ${mode === 'in' ? '<button class="linkbtn" type="button" data-act="maglink">Forgot your password? Email me a sign-in link</button>' : ''}
  </form>${note}
  <div class="row" style="margin-top:12px"><button class="linkbtn" data-act="authswap">${mode === 'in' ? 'New here? Create an account' : 'Have an account? Sign in'}</button></div>`);
  $('#authform').onsubmit = async e => {
    e.preventDefault();
    const d = new FormData(e.target), email = d.get('email').trim(), pw = d.get('pw');
    accountModal.email = email;
    try {
      if (mode === 'in') { await cloud.signIn(email, pw); closeModal(); }
      else {
        const r = await cloud.signUp(email, pw);
        if (r.needsConfirm) accountModal('Check your email and click the link to finish creating your account.', 'ok');
        else closeModal();
      }
    } catch (err) { accountModal(err.message, 'err'); }
  };
}

/* ---------- routing, modal, events ---------- */
function go(name, id, idx) {
  const back = name === 'topic' ? (view.name === 'topic' ? view.back : { name: view.name, pool: view.pool, idx: view.idx, b: view.b }) : null;
  view = { name, pool: id, idx, back };
  if (name !== 'exam') clearInterval(tick);
  const want = name === 'home' ? '' : '#' + id;
  if (want !== location.hash && !/access_token|error_description/.test(location.hash)) history.replaceState(null, '', want || location.pathname + location.search);
  render();
  window.scrollTo(0, 0);
}

let warming = null;
function render() {
  acctButton();
  if (view.pool && EXPLAINED.includes(view.pool) && !loaded(view.pool) && warming !== view.pool) {
    warming = view.pool;
    warm(view.pool).then(v => { if (v && view.pool === warming) render(); });
  }
  ({ home, pool: poolView, setup: setupView, learn: learnView, exam: examView, result: resultView, browse: browseView, topic: topicView })[view.name]();
}

function modal(html) { $('#modal').innerHTML = `<div class="modal" data-act="bg"><div class="box" role="dialog" aria-modal="true">${html}</div></div>`; $('#modal input,#modal button')?.focus(); }
function closeModal() { $('#modal').innerHTML = ''; }

document.addEventListener('click', e => {
  const t = e.target.closest('[data-go],[data-act],[data-pick],[data-jump],[data-fig],[data-review],[data-topic],.hidden-ans .item');
  if (!t) return;
  const p = view.pool ? pool(view.pool) : null, st = p && P[p.id];
  const slot = t.dataset.slot || (view.name === 'exam' ? 'exam' : 'learn'), s = st && st[slot];
  if (t.dataset.go) { const [a, b] = t.dataset.go.split(':'); go(a, b); return; }
  if (t.dataset.fig) {
    modal(`<img src="figs/${esc(t.dataset.fig)}.png" alt="Figure ${esc(t.dataset.fig)}">`);
    $('#modal .box').style.cssText = 'background:none;padding:0;max-width:none;width:auto';
    return;
  }
  if (t.dataset.review) { go('result', p.id, +t.dataset.review); return; }
  if (t.dataset.topic) { go('topic', p.id, t.dataset.topic); return; }
  if (t.dataset.pick !== undefined) {
    const o = +t.dataset.pick;
    if (view.name === 'learn') pickLearn(o);
    else if (view.name === 'exam') { s.ans[s.cur] = o; if (s.cur < s.qs.length - 1) s.cur++; save(p.id, 'exam'); render(); }
    return;
  }
  if (t.dataset.jump !== undefined) { s.cur = +t.dataset.jump; save(p.id, 'exam'); render(); return; }
  if (t.classList.contains('item')) {
    t.classList.toggle('show');
    const r = t.querySelector('[data-reveal]');
    if (r) r.style.cssText = t.classList.contains('show') ? 'border-color:var(--green);color:var(--ink);font-weight:500' : '';
    return;
  }
  const actions = {
    setup: () => go('setup', p.id),
    browse: () => go('browse', p.id),
    exam: () => (st.exam ? go('exam', p.id) : beginExam(p)),
    resume: () => go(slot, p.id),
    discard: () => modal(`<h3>Discard the unfinished ${slot === 'exam' ? 'exam' : 'session'}?</h3><p class="note">Answers you already gave still count toward your progress.</p><div class="row"><button class="btn pri" data-act="discard2" data-slot="${slot}">Discard</button><button class="btn" data-act="close">Cancel</button></div>`),
    discard2: () => { setSession(st, slot, null); save(p.id, slot); closeModal(); render(); },
    reset: () => modal(`<h3>Reset all progress for ${esc(p.name)}?</h3><p class="note">This clears mastery, missed questions and exam history for this exam only${acct.user ? ', on every device' : ''}.</p><div class="row"><button class="btn pri" data-act="reset2">Reset</button><button class="btn" data-act="close">Cancel</button></div>`),
    reset2: () => { P[p.id] = reset(); save(p.id); closeModal(); render(); },
    close: closeModal,
    bg: () => { if (e.target === t) closeModal(); },
    secall: () => { $$('[name=sec]').forEach(c => { c.checked = true; }); $('#setup').dispatchEvent(new Event('change')); },
    secnone: () => { $$('[name=sec]').forEach(c => { c.checked = false; }); $('#setup').dispatchEvent(new Event('change')); },
    next: nextLearn,
    showwhy: () => { view.why = learn.current(s); render(); },
    topicback: () => { const b = view.back; if (b && b.name) { const keepB = b.b; go(b.name, b.pool, b.idx); if (keepB) { view.b = keepB; render(); } } else go('pool', p.id); },
    retry: () => { learn.retryMissed(s); save(p.id, 'learn'); render(); },
    nextround: () => { learn.nextRound(s); save(p.id, 'learn'); render(); },
    // From a round summary: the session is over. Mid-question: keep it to resume later.
    endlearn: () => { setSession(st, 'learn', null); save(p.id, 'learn'); go('pool', p.id); },
    pauselearn: () => { save(p.id, 'learn'); go('pool', p.id); },
    prev: () => { s.cur--; save(p.id, 'exam'); render(); },
    nextq: () => { s.cur++; save(p.id, 'exam'); render(); },
    flag: () => { s.flag[s.cur] = !s.flag[s.cur]; save(p.id, 'exam'); render(); },
    submit: () => submitExam(false),
    submit2: () => { closeModal(); submitExam(true); },
    leave: () => { save(p.id, 'exam'); go('pool', p.id); },
    learnmiss: () => { const h = st.hist[view.idx]; beginLearn(p, h.qs.filter((id, k) => h.ans[k] !== p.q[ix(p, id)][3]), { size: 'all', shuf: false }); },
    account: () => { accountModal.mode = 'in'; accountModal(); },
    authswap: () => { accountModal.mode = accountModal.mode === 'up' ? 'in' : 'up'; accountModal(); },
    maglink: async () => {
      const email = $('#authform [name=email]').value.trim();
      if (!email) { accountModal('Enter your email first.', 'err'); return; }
      accountModal.email = email;
      try { await cloud.sendLink(email); accountModal('Check your email for a sign-in link. After signing in you can set a new password here.', 'ok'); }
      catch (err) { accountModal(err.message, 'err'); }
    },
    syncnow: async () => { await cloud.syncAll(); accountModal(); },
    signout: async () => { await cloud.signOut(); closeModal(); go('home'); },
    flags: () => modal(`<h3>About the flags</h3><p class="note">Each exam flies a flag from the International Code of Signals, the flags ships use to send single-letter messages. They're decoration with a nod to each exam.</p>
      <div class="flags">${D.pools.map(p => `<div>${flagSvg(p.id)}<span><b>${FLAGS[p.id].letter} (${FLAGS[p.id].name})</b>, ${esc(p.name)}: ${esc(FLAGS[p.id].meaning)}</span></div>`).join('')}</div>
      <div class="row" style="margin-top:14px"><button class="btn" data-act="close">Close</button></div>`),
  };
  actions[t.dataset.act]?.();
});

document.addEventListener('keydown', e => {
  if (e.key === 'Escape' && $('#modal').innerHTML) { closeModal(); return; }
  if ($('#modal').innerHTML || e.target.matches('input,select,textarea') || e.metaKey || e.ctrlKey || e.altKey) return;
  const k = e.key.toLowerCase();
  const n = '1234'.includes(k) ? '1234'.indexOf(k) : 'abcd'.indexOf(k);
  if (view.name === 'learn') {
    const s = P[view.pool].learn;
    if (!s || s.phase !== 'q') return;
    if (s.pick === null && n >= 0) { e.preventDefault(); $$('.ch')[n]?.click(); }
    else if (s.pick !== null && (e.key === 'Enter' || e.key === ' ')) { e.preventDefault(); nextLearn(); }
  } else if (view.name === 'exam') {
    const s = P[view.pool].exam;
    if (!s) return;
    if (n >= 0) { e.preventDefault(); $$('.ch')[n]?.click(); }
    if (e.key === 'ArrowRight' && s.cur < s.qs.length - 1) { s.cur++; render(); }
    if (e.key === 'ArrowLeft' && s.cur > 0) { s.cur--; render(); }
  }
});

window.addEventListener('hashchange', () => {
  const h = location.hash.slice(1);
  if (D && D.pools.some(p => p.id === h) && view.pool !== h) go('pool', h);
  else if (!h && view.name !== 'home') go('home');
});

/* ---------- start ---------- */
fetch('data/pools.json').then(r => r.json()).then(async d => {
  D = d;
  D.pools.forEach(p => { P[p.id] = normalize(p, loadLocal(p.id)); });
  const h = location.hash.slice(1);
  if (D.pools.some(p => p.id === h)) go('pool', h); else go('home');
  foot();
  try {
    cloud = await createCloud(config, store, s => { acct = s; acctButton(); foot(); });
    if (cloud) { acct = cloud.state; acctButton(); foot(); }
  } catch (err) {
    console.error('Accounts unavailable', err);
  }
}).catch(() => { $('#app').innerHTML = '<p class="note">The question pools could not be loaded. Reload the page to try again.</p>'; });
