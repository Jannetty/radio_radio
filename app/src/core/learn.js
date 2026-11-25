// The Learn session: rounds of questions; after each round, the misses come back in
// retry rounds until every one is answered right, then the next round is drawn.
// Sessions are plain JSON so they can be saved and resumed on another device.
// Questions are referred to by id (e.g. "T1A01"), never by position in the pool.
import { shuffle, keepsOrder } from './progress.js';

export function startLearn(list, { size = 20, shuf = false } = {}) {
  const s = {
    mode: 'learn', queue: list.slice(), qpos: 0,
    size: size === 'all' ? Math.max(list.length, 1) : Number(size),
    round: [], i: 0, miss: [], retry: 0, shuf: !!shuf, perm: {},
    pick: null, done: 0, first: [0, 0], phase: 'q',
  };
  nextRound(s);
  return s;
}

export function nextRound(s) {
  s.round = s.queue.slice(s.qpos, s.qpos + s.size);
  s.qpos += s.round.length;
  s.i = 0; s.miss = []; s.retry = 0; s.phase = 'q'; s.pick = null;
}

export const current = s => s.round[s.i];

/** Record a choice for the current question. Returns true if it was right. */
export function answer(s, choice, correct) {
  if (s.pick !== null || s.phase !== 'q') return null;
  const ok = choice === correct;
  s.pick = choice;
  s.done++;
  if (!s.retry) { s.first[1]++; if (ok) s.first[0]++; }
  if (!ok) s.miss.push(current(s));
  return ok;
}

export function advance(s) {
  if (s.pick === null) return;
  s.pick = null;
  s.i++;
  if (s.i >= s.round.length) s.phase = 'sum';
}

export function retryMissed(s, rand = Math.random) {
  s.round = shuffle(s.miss, rand);
  s.miss = []; s.i = 0; s.retry++; s.phase = 'q'; s.pick = null;
}

export const hasMore = s => s.qpos < s.queue.length;
export const finished = s => s.phase === 'sum' && !s.miss.length && !hasMore(s);

/** Display order of the four choices for a question (stable for the session). */
export function choiceOrder(s, id, q, rand = Math.random) {
  if (!s.shuf || keepsOrder(q)) return [0, 1, 2, 3];
  if (!s.perm[id]) s.perm[id] = shuffle([0, 1, 2, 3], rand);
  return s.perm[id];
}
