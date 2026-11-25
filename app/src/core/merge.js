// Merge two copies of one pool's progress (this device and the server, or two devices).
// Each question keeps whichever copy was answered most recently, exam history is the union,
// and for each session slot (study, exam) the copy that changed last wins. A reset wipes everything older than it on both sides.
import { HISTORY_LIMIT, SLOTS, VERSION } from './progress.js';

// Both copies must already be in the current format (see normalize in progress.js).

export function merge(a, b) {
  if (!a) return clone(b);
  if (!b) return clone(a);
  const resetAt = Math.max(a.resetAt || 0, b.resetAt || 0);

  const st = {};
  for (const src of [a.st || {}, b.st || {}]) {
    for (const [qid, s] of Object.entries(src)) {
      if ((s[4] || 0) < resetAt) continue;
      const cur = st[qid];
      if (!cur || newer(s, cur)) st[qid] = s.slice();
    }
  }

  const seen = new Map();
  for (const h of [...(a.hist || []), ...(b.hist || [])]) {
    if (h.t >= resetAt && !seen.has(h.t)) seen.set(h.t, h);
  }
  const hist = [...seen.values()].sort((x, y) => x.t - y.t).slice(-HISTORY_LIMIT).map(clone);

  const slots = {};
  for (const k of SLOTS) {
    const aU = a[k + 'U'] || 0, bU = b[k + 'U'] || 0, t = Math.max(aU, bU);
    slots[k] = t >= resetAt ? clone((bU > aU ? b : a)[k] ?? null) : null;
    slots[k + 'U'] = t;
  }

  const opts = clone(((b.u || 0) > (a.u || 0) ? b.opts ?? a.opts : a.opts ?? b.opts) ?? null);

  return { v: VERSION, u: Math.max(a.u || 0, b.u || 0), st, ...slots, hist, opts, resetAt };
}

function newer(s, cur) {
  const ts = s[4] || 0, tc = cur[4] || 0;
  if (ts !== tc) return ts > tc;
  return s[0] + s[1] > cur[0] + cur[1];
}

/** True when merging `other` into `mine` would change nothing. */
export function same(x, y) {
  return JSON.stringify(normal(x)) === JSON.stringify(normal(y));
}

function normal(p) {
  if (!p) return null;
  const st = Object.keys(p.st || {}).sort().map(k => [k, p.st[k]]);
  return [st, p.hist || [], SLOTS.map(k => [p[k] ?? null, p[k + 'U'] || 0]), p.resetAt || 0];
}

const clone = v => (v === undefined ? undefined : JSON.parse(JSON.stringify(v)));
