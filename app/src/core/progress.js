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

export const HISTORY_LIMIT = 40;
export const MASTERY_STREAK = 3;

export const SLOTS = ['learn', 'exam'];

export const blank = () => ({ u: 0, st: {}, learn: null, learnU: 0, exam: null, examU: 0, hist: [], opts: null, resetAt: 0 });

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
 * Questions for a study session, as indexes into pool.q.
 * opts: { order: 'cont' | 'start' | 'rand', which: keyof FILTERS, secs: number[] }
 * 'cont' starts at the first never-seen question and wraps around, so an in-order
 * first pass through the pool picks up where it stopped.
 */
export function pickQuestions(pool, p, opts, rand = Math.random) {
  const sec = sectionIndex(pool);
  const keep = FILTERS[opts.which] || FILTERS.all;
  let list = pool.q.map((q, i) => i)
    .filter(i => opts.secs.includes(sec[i]) && keep(stat(p, pool.q[i][0])));
  if (opts.order === 'rand') return shuffle(list, rand);
  if (opts.order === 'cont') {
    const k = list.findIndex(i => isNew(stat(p, pool.q[i][0])));
    if (k > 0) list = list.slice(k).concat(list.slice(0, k));
  }
  return list;
}

/** A practice exam in the real format: one random question from every key topic / group, in pool order. */
export function buildExam(pool, rand = Math.random) {
  const qs = [];
  pool.sections.forEach(s => s.g.forEach(g => qs.push(g.q[Math.floor(rand() * g.q.length)])));
  return qs;
}

/** ans: chosen choice index per exam position, -1 or undefined for unanswered. */
export function scoreExam(pool, qs, ans) {
  const sec = sectionIndex(pool);
  const by = {};
  let score = 0;
  const right = qs.map((qi, k) => {
    const ok = ans[k] === pool.q[qi][3];
    if (ok) score++;
    const si = sec[qi];
    by[si] = by[si] || [0, 0];
    by[si][1]++;
    if (ok) by[si][0]++;
    return ok;
  });
  return { score, n: qs.length, pass: score >= pool.p, by, right };
}

/** Questions whose choices refer to each other ("all of these", "A and B") keep their printed order. */
export function keepsOrder(q) {
  return q[2].some(c => /\b(all|none|both) of (these|the above|the)\b|all these choices|\b[A-D] and [A-D]\b/i.test(c));
}
