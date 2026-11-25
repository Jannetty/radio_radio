import test from 'node:test';
import assert from 'node:assert/strict';
import { tiny, seeded } from './fixtures.js';
import {
  blank, stat, record, isNew, isMastered, isMissed, summary, pickQuestions,
  buildExam, scoreExam, keepsOrder, reset, setSession, normalize,
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
  assert.deepEqual(pickQuestions(tiny, p, all), ['Q3', 'Q4', 'Q5', 'Q6', 'Q0', 'Q1', 'Q2']);
  assert.deepEqual(pickQuestions(tiny, p, { ...all, order: 'start' }), ['Q0', 'Q1', 'Q2', 'Q3', 'Q4', 'Q5', 'Q6']);
});

test('filters and sections', () => {
  const p = blank();
  record(p, 'Q2', false); record(p, 'Q5', false); record(p, 'Q0', true); record(p, 'Q0', true); record(p, 'Q0', true);
  assert.deepEqual(pickQuestions(tiny, p, { order: 'start', which: 'missed', secs: [0, 1] }), ['Q2', 'Q5']);
  assert.deepEqual(pickQuestions(tiny, p, { order: 'start', which: 'missed', secs: [1] }), ['Q5']);
  assert.deepEqual(pickQuestions(tiny, p, { order: 'start', which: 'new', secs: [0] }), ['Q1', 'Q3']);
  assert.equal(pickQuestions(tiny, p, { order: 'start', which: 'notm', secs: [0, 1] }).length, 6);
  const r = pickQuestions(tiny, p, { order: 'rand', which: 'all', secs: [0, 1] }, seeded(3));
  assert.deepEqual([...r].sort(), ['Q0', 'Q1', 'Q2', 'Q3', 'Q4', 'Q5', 'Q6']);
});

test('exam draws one question from every group, in order', () => {
  const qs = buildExam(tiny, seeded(7));
  assert.equal(qs.length, 3);
  assert.ok(['Q0', 'Q1'].includes(qs[0]) && ['Q2', 'Q3'].includes(qs[1]) && ['Q4', 'Q5', 'Q6'].includes(qs[2]));
});

test('exam scoring and pass mark', () => {
  const qs = ['Q0', 'Q2', 'Q4']; // answers 0, 2, 0
  const r = scoreExam(tiny, qs, [0, 2, 1]);
  assert.equal(r.score, 2);
  assert.equal(r.pass, true);
  assert.deepEqual(r.by, { A: [2, 2], B: [0, 1] });
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

test('normalize converts version-1 records (positions) to question ids', () => {
  const v1 = {
    u: 1, st: { Q1: [1, 0, 1, 1, 1] }, hist: [{ t: 5, qs: [0, 2, 4], ans: [0, 1, 0], by: { 0: [1, 2], 1: [1, 1] } }],
    learn: { mode: 'learn', queue: [3, 4, 5], qpos: 2, size: 2, round: [3, 4], i: 1, miss: [3], retry: 0, shuf: true, perm: { 4: [3, 2, 1, 0] }, pick: null, done: 1, first: [0, 1], phase: 'q' },
    exam: { qs: [1, 3, 6], ans: { 0: 1, 2: 2 }, flag: { 1: true }, cur: 1, secs: 9 },
  };
  const p = normalize(tiny, v1);
  assert.equal(p.v, 2);
  assert.deepEqual(p.learn.queue, ['Q3', 'Q4', 'Q5']);
  assert.deepEqual(p.learn.round, ['Q3', 'Q4']);
  assert.deepEqual(p.learn.miss, ['Q3']);
  assert.deepEqual(p.learn.perm, { Q4: [3, 2, 1, 0] });
  assert.deepEqual(p.exam.qs, ['Q1', 'Q3', 'Q6']);
  assert.deepEqual(p.hist[0].qs, ['Q0', 'Q2', 'Q4']);
  assert.deepEqual(p.hist[0].by, { A: [1, 2], B: [1, 1] });
  assert.deepEqual(normalize(tiny, JSON.parse(JSON.stringify(p))), p, 'normalizing twice changes nothing');
});

test('normalize drops questions withdrawn from the pool and keeps everything else lined up', () => {
  const withdrawn = { ...tiny, q: tiny.q.filter(q => q[0] !== 'Q2') }; // positions after Q2 shift down
  const p = {
    v: 2, st: {}, hist: [{ t: 5, qs: ['Q0', 'Q2', 'Q4'], ans: [0, 1, 0], by: {} }],
    learn: { queue: ['Q1', 'Q2', 'Q3', 'Q4'], qpos: 3, size: 3, round: ['Q1', 'Q2', 'Q3'], i: 2, miss: ['Q2'], retry: 0, shuf: false, perm: {}, pick: null, done: 2, first: [1, 2], phase: 'q' },
    exam: { qs: ['Q0', 'Q2', 'Q4'], ans: { 0: 1, 1: 3, 2: 2 }, flag: { 2: true }, cur: 2, secs: 0 },
  };
  normalize(withdrawn, p);
  assert.deepEqual(p.learn.queue, ['Q1', 'Q3', 'Q4']);
  assert.equal(p.learn.qpos, 2);
  assert.deepEqual(p.learn.round, ['Q1', 'Q3']);
  assert.equal(p.learn.round[p.learn.i], 'Q3', 'still on the same question');
  assert.deepEqual(p.learn.miss, []);
  assert.deepEqual(p.exam.qs, ['Q0', 'Q4']);
  assert.deepEqual(p.exam.ans, { 0: 1, 1: 2 }, 'answers stay with their questions');
  assert.deepEqual(p.exam.flag, { 1: true });
  assert.equal(p.exam.qs[p.exam.cur], 'Q4');
  assert.deepEqual(p.hist[0].qs, ['Q0', 'Q4']);
  assert.deepEqual(p.hist[0].ans, [0, 0]);
});
