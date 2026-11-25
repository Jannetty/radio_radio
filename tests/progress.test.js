import test from 'node:test';
import assert from 'node:assert/strict';
import { tiny, seeded } from './fixtures.js';
import {
  blank, stat, record, isNew, isMastered, isMissed, summary, pickQuestions,
  buildExam, scoreExam, keepsOrder, reset, setSession,
} from '../app/src/core/progress.js';

test('record tracks right, wrong, streak, last and time', () => {
  const p = blank();
  record(p, 'Q1', true, 10);
  record(p, 'Q1', true, 20);
  assert.deepEqual(stat(p, 'Q1'), [2, 0, 2, 1, 20]);
  assert.ok(!isMastered(stat(p, 'Q1')), 'two in a row is not enough');
  record(p, 'Q1', true, 25);
  assert.ok(isMastered(stat(p, 'Q1')), 'three in a row is mastered');
  record(p, 'Q1', false, 30);
  assert.deepEqual(stat(p, 'Q1'), [3, 1, 0, 0, 30]);
  assert.ok(isMissed(stat(p, 'Q1')));
  assert.ok(isNew(stat(p, 'Q2')));
  assert.equal(p.u, 30);
});

test('summary counts mastered, seen and missed', () => {
  const p = blank();
  record(p, 'Q0', true); record(p, 'Q0', true); record(p, 'Q0', true);
  record(p, 'Q1', false);
  assert.deepEqual(summary(tiny, p), { mastered: 1, seen: 2, missed: 1, n: 7 });
});

test('in-order "continue" starts at the first unseen question and wraps', () => {
  const p = blank();
  record(p, 'Q0', true); record(p, 'Q1', true); record(p, 'Q2', false);
  const all = { order: 'cont', which: 'all', secs: [0, 1] };
  assert.deepEqual(pickQuestions(tiny, p, all), [3, 4, 5, 6, 0, 1, 2]);
  assert.deepEqual(pickQuestions(tiny, p, { ...all, order: 'start' }), [0, 1, 2, 3, 4, 5, 6]);
});

test('filters and sections', () => {
  const p = blank();
  record(p, 'Q2', false); record(p, 'Q5', false); record(p, 'Q0', true); record(p, 'Q0', true); record(p, 'Q0', true);
  assert.deepEqual(pickQuestions(tiny, p, { order: 'start', which: 'missed', secs: [0, 1] }), [2, 5]);
  assert.deepEqual(pickQuestions(tiny, p, { order: 'start', which: 'missed', secs: [1] }), [5]);
  assert.deepEqual(pickQuestions(tiny, p, { order: 'start', which: 'new', secs: [0] }), [1, 3]);
  assert.equal(pickQuestions(tiny, p, { order: 'start', which: 'notm', secs: [0, 1] }).length, 6);
  const r = pickQuestions(tiny, p, { order: 'rand', which: 'all', secs: [0, 1] }, seeded(3));
  assert.deepEqual([...r].sort(), [0, 1, 2, 3, 4, 5, 6]);
});

test('exam draws one question from every group, in order', () => {
  const qs = buildExam(tiny, seeded(7));
  assert.equal(qs.length, 3);
  assert.ok([0, 1].includes(qs[0]) && [2, 3].includes(qs[1]) && [4, 5, 6].includes(qs[2]));
});

test('exam scoring and pass mark', () => {
  const qs = [0, 2, 4]; // answers 0, 2, 0
  const r = scoreExam(tiny, qs, [0, 2, 1]);
  assert.equal(r.score, 2);
  assert.equal(r.pass, true);
  assert.deepEqual(r.by, { 0: [2, 2], 1: [0, 1] });
  assert.deepEqual(r.right, [true, true, false]);
  assert.equal(scoreExam(tiny, qs, [-1, -1, -1]).pass, false);
});

test('choices that refer to other choices keep their order', () => {
  assert.ok(keepsOrder(['G', 'q', ['x', 'y', 'z', 'All of these choices are correct'], 3]));
  assert.ok(keepsOrder(['G', 'q', ['x', 'y', 'Both A and B', 'None of the above'], 2]));
  assert.ok(!keepsOrder(['G', 'q', ['Ohm.', 'Watt.', 'Volt.', 'Ampere.'], 1]));
});

test('reset and sessions stamp times', () => {
  const r = reset(500);
  assert.equal(r.resetAt, 500);
  const p = blank();
  setSession(p, 'exam', { cur: 0 }, 99);
  assert.equal(p.examU, 99);
  assert.equal(p.learn, null);
});
