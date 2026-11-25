// Pure progress logic: no DOM, no storage. Everything here is covered by tests/.
//
// One progress record per question pool:
//   st      { [questionId]: [right, wrong, streak, last, t] }  last: 1 right, 0 wrong, -1 never; t: ms of last answer
//   learn   the unfinished study session, or null
//   exam    the unfinished practice exam, or null
//   learnU, examU  ms when that slot last changed (also set when it ends, so the ending wins a merge)
//   hist    finished practice exams, oldest first
//   opts    last study-session settings
//   resetAt ms of the last "reset progress"; anything older is ignored when merging
//   u       ms of the last change to anything
//   v       format version (2: sessions and history refer to questions by id, e.g. "G1A01")
//
// Sessions and history store question ids, never positions in pool.q, so a pool update that
// withdraws a question can't make them point at the wrong one. normalize() converts older
// records and drops ids that are no longer in the pool.

export const HISTORY_LIMIT = 40;
export const MASTERY_STREAK = 3;

export const SLOTS = ['learn', 'exam'];

export const VERSION = 2;

export const blank = () => ({ v: VERSION, u: 0, st: {}, learn: null, learnU: 0, exam: null, examU: 0, hist: [], opts: null, resetAt: 0 });

export const stat = (p, qid) => p.st[qid] || [0, 0, 0, -1, 0];
export const isNew = s => s[0] + s[1] === 0;
export const isMastered = s => s[2] >= MASTERY_STREAK;
export const isMissed = s => s[1] > 0 && s[2] < MASTERY_STREAK;

export function record(p, qid, ok, now = Date.now()) {
  const s = stat(p, qid).slice();
  if (ok) { s[0]++; s[2]++; } else { s[1]++; s[2] = 0; }
  s[3] = ok ? 1 : 0;
  s[4] = now;
  p.st[qid] = s;
  p.u = now;
}

/** slot: 'learn' or 'exam'. Pass null to end the session. */
export function setSession(p, slot, sess, now = Date.now()) {
  p[slot] = sess;
  p[slot + 'U'] = now;
  p.u = now;
}

export function reset(now = Date.now()) {
  return { ...blank(), resetAt: now, learnU: now, examU: now, u: now };
}

/** Map from question id to its position in pool.q. */
export function idIndex(pool) {
  if (!pool._idx) Object.defineProperty(pool, '_idx', { value: new Map(pool.q.map((q, i) => [q[0], i])) });
  return pool._idx;
}

/** Index of the section (subelement) that holds each question. */
export function sectionIndex(pool) {
  const map = new Array(pool.q.length);
  pool.sections.forEach((s, si) => s.g.forEach(g => g.q.forEach(i => { map[i] = si; })));
  return map;
}

export function summary(pool, p) {
  let mastered = 0, seen = 0, missed = 0;
  for (const q of pool.q) {
    const s = stat(p, q[0]);
    if (!isNew(s)) seen++;
    if (isMastered(s)) mastered++;
    if (isMissed(s)) missed++;
  }
  return { mastered, seen, missed, n: pool.q.length };
}

export function sectionSummary(pool, p) {
  return pool.sections.map(sec => {
    let n = 0, mastered = 0, seen = 0;
    sec.g.forEach(g => g.q.forEach(i => {
      n++;
      const s = stat(p, pool.q[i][0]);
      if (isMastered(s)) mastered++;
      if (!isNew(s)) seen++;
    }));
    return { n, mastered, seen, groups: sec.g.length };
  });
}

export function shuffle(a, rand = Math.random) {
  a = a.slice();
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(rand() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

export const FILTERS = {
  all: () => true,
  new: isNew,
  missed: isMissed,
  notm: s => !isMastered(s),
};

/**
 * Questions for a study session, as question ids.
 * opts: { order: 'cont' | 'start' | 'rand', which: keyof FILTERS, secs: number[] }
 * 'cont' starts at the first never-seen question and wraps around, so an in-order
 * first pass through the pool picks up where it stopped.
 */
export function pickQuestions(pool, p, opts, rand = Math.random) {
  const sec = sectionIndex(pool);
  const keep = FILTERS[opts.which] || FILTERS.all;
  let list = pool.q.map((q, i) => i)
    .filter(i => opts.secs.includes(sec[i]) && keep(stat(p, pool.q[i][0])));
  if (opts.order === 'rand') list = shuffle(list, rand);
  else if (opts.order === 'cont') {
    const k = list.findIndex(i => isNew(stat(p, pool.q[i][0])));
    if (k > 0) list = list.slice(k).concat(list.slice(0, k));
  }
  return list.map(i => pool.q[i][0]);
}

/** A practice exam in the real format: one random question id from every key topic / group, in pool order. */
export function buildExam(pool, rand = Math.random) {
  const qs = [];
  pool.sections.forEach(s => s.g.forEach(g => qs.push(pool.q[g.q[Math.floor(rand() * g.q.length)]][0])));
  return qs;
}

/** qs: question ids; ans: chosen choice index per exam position, -1 or undefined for unanswered. by: per section id. */
export function scoreExam(pool, qs, ans) {
  const sec = sectionIndex(pool), idx = idIndex(pool);
  const by = {};
  let score = 0;
  const right = qs.map((id, k) => {
    const i = idx.get(id);
    const ok = i !== undefined && ans[k] === pool.q[i][3];
    if (ok) score++;
    if (i === undefined) return ok;
    const sid = pool.sections[sec[i]].id;
    by[sid] = by[sid] || [0, 0];
    by[sid][1]++;
    if (ok) by[sid][0]++;
    return ok;
  });
  return { score, n: qs.length, pass: score >= pool.p, by, right };
}

/** Questions whose choices refer to each other ("all of these", "A and B") keep their printed order. */
export function keepsOrder(q) {
  return q[2].some(c => /\b(all|none|both) of (these|the above|the)\b|all these choices|\b[A-D] and [A-D]\b|\b[a-d]\) (and|or) [a-d]\)/i.test(c));
}

/**
 * Bring a progress record up to date with the current pool: convert version-1 records
 * (which stored positions in pool.q) to question ids, and drop questions that have been
 * withdrawn from the pool. Mutates and returns p.
 */
export function normalize(pool, p) {
  if (!p) return p;
  const idx = idIndex(pool);
  const old = (p.v || 1) < 2;
  const toId = x => (typeof x === 'number' ? pool.q[x]?.[0] ?? null : x);
  const known = id => idx.has(id);

  const L = p.learn;
  if (L) {
    if (old) {
      L.queue = L.queue.map(toId); L.round = L.round.map(toId); L.miss = L.miss.map(toId);
      L.perm = Object.fromEntries(Object.entries(L.perm || {}).map(([k, v]) => [toId(Number(k)), v]));
    }
    L.qpos = L.queue.slice(0, L.qpos).filter(known).length;
    L.queue = L.queue.filter(known);
    const curGone = L.round[L.i] !== undefined && !known(L.round[L.i]);
    L.i = L.round.slice(0, L.i).filter(known).length;
    L.round = L.round.filter(known);
    L.miss = L.miss.filter(known);
    if (curGone) L.pick = null;
    if (L.phase === 'q' && L.i >= L.round.length) { L.phase = 'sum'; L.pick = null; }
  }

  const E = p.exam;
  if (E) {
    if (old) E.qs = E.qs.map(toId);
    if (!E.qs.every(known)) {
      const keep = E.qs.map((id, k) => [id, k]).filter(([id]) => known(id));
      const ans = {}, flag = {};
      keep.forEach(([, k], j) => { if (E.ans[k] !== undefined) ans[j] = E.ans[k]; if (E.flag[k]) flag[j] = true; });
      E.cur = Math.min(keep.filter(([, k]) => k < E.cur).length, Math.max(keep.length - 1, 0));
      E.qs = keep.map(([id]) => id); E.ans = ans; E.flag = flag;
    }
  }

  for (const h of p.hist || []) {
    if (old) {
      h.qs = h.qs.map(toId);
      h.by = Object.fromEntries(Object.entries(h.by || {}).map(([si, v]) => [pool.sections[Number(si)]?.id ?? si, v]));
    }
    if (!h.qs.every(known)) {
      const keep = h.qs.map((id, k) => [id, h.ans[k]]).filter(([id]) => known(id));
      h.qs = keep.map(([id]) => id); h.ans = keep.map(([, a]) => a);
    }
  }

  p.v = VERSION;
  return p;
}
