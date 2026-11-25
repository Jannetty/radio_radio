import test from 'node:test';
import assert from 'node:assert/strict';
import { merge, same } from '../app/src/core/merge.js';
import { blank, record, setSession, reset } from '../app/src/core/progress.js';

test('each question keeps the most recent answer from either device', () => {
  const laptop = blank(), phone = blank();
  record(laptop, 'Q1', true, 100);
  record(phone, 'Q1', false, 200);
  record(laptop, 'Q2', true, 300);
  const m = merge(laptop, phone);
  assert.equal(m.st.Q1[3], 0);
  assert.equal(m.st.Q2[3], 1);
  assert.deepEqual(merge(phone, laptop).st, m.st);
});

test('exam history is the union, without duplicates', () => {
  const a = blank(), b = blank();
  a.hist = [{ t: 1, score: 10 }, { t: 3, score: 30 }];
  b.hist = [{ t: 2, score: 20 }, { t: 3, score: 30 }];
  assert.deepEqual(merge(a, b).hist.map(h => h.t), [1, 2, 3]);
});

test('per slot, the most recently changed session wins, including a finished (null) one', () => {
  const a = blank(), b = blank();
  setSession(a, 'exam', { cur: 4 }, 100);
  setSession(b, 'exam', null, 200);
  setSession(a, 'learn', { done: 7 }, 300);
  const m = merge(a, b);
  assert.equal(m.exam, null, 'exam finished on the other device');
  assert.equal(m.learn.done, 7, 'study session on this device is untouched');
  assert.equal(m.examU, 200);
  setSession(a, 'exam', { cur: 1 }, 400);
  assert.equal(merge(a, b).exam.cur, 1);
});

test('a reset on one device clears older progress from the other', () => {
  const old = blank();
  record(old, 'Q1', true, 100);
  old.hist = [{ t: 150 }];
  setSession(old, 'exam', { cur: 0 }, 160);
  const fresh = reset(200);
  record(fresh, 'Q2', true, 250);
  const m = merge(old, fresh);
  assert.deepEqual(Object.keys(m.st), ['Q2']);
  assert.deepEqual(m.hist, []);
  assert.equal(m.exam, null);
  assert.equal(m.resetAt, 200);
});

test('merging with nothing returns a copy, and same() detects no-ops', () => {
  const a = blank();
  record(a, 'Q1', true, 5);
  const m = merge(a, null);
  assert.ok(same(m, a));
  m.st.Q1[0] = 99;
  assert.equal(a.st.Q1[0], 1);
  assert.ok(same(merge(m, m), m));
  assert.ok(!same(a, null));
});
