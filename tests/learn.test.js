import test from 'node:test';
import assert from 'node:assert/strict';
import * as L from '../app/src/core/learn.js';
import { seeded } from './fixtures.js';

test('rounds, retrying misses, then the next round', () => {
  const s = L.startLearn([10, 11, 12, 13, 14], { size: 3 });
  assert.deepEqual(s.round, [10, 11, 12]);
  assert.equal(L.answer(s, 0, 0), true); L.advance(s);
  assert.equal(L.answer(s, 1, 0), false);
  assert.equal(L.answer(s, 2, 0), null, 'second answer to the same question is ignored');
  L.advance(s);
  L.answer(s, 0, 0); L.advance(s);
  assert.equal(s.phase, 'sum');
  assert.deepEqual(s.miss, [11]);
  assert.deepEqual(s.first, [2, 3]);

  L.retryMissed(s, seeded());
  assert.deepEqual(s.round, [11]);
  assert.equal(s.retry, 1);
  L.answer(s, 0, 0); L.advance(s);
  assert.equal(s.phase, 'sum');
  assert.deepEqual(s.first, [2, 3], 'retries do not count as first tries');
  assert.ok(L.hasMore(s) && !L.finished(s));

  L.nextRound(s);
  assert.deepEqual(s.round, [13, 14]);
  L.answer(s, 0, 0); L.advance(s); L.answer(s, 0, 0); L.advance(s);
  assert.ok(L.finished(s));
});

test('"all" puts everything in one round; sessions survive JSON round trips', () => {
  let s = L.startLearn([1, 2, 3], { size: 'all' });
  assert.deepEqual(s.round, [1, 2, 3]);
  s = JSON.parse(JSON.stringify(s));
  L.answer(s, 3, 3);
  assert.equal(s.done, 1);
});

test('shuffled choice order is stable per question and skipped for "all of these" questions', () => {
  const s = L.startLearn([0], { size: 1, shuf: true });
  const q = ['x', 'q', ['a', 'b', 'c', 'd'], 0];
  const o1 = L.choiceOrder(s, 0, q, seeded(5));
  assert.deepEqual([...o1].sort(), [0, 1, 2, 3]);
  assert.deepEqual(L.choiceOrder(s, 0, q), o1);
  assert.deepEqual(L.choiceOrder(s, 1, ['x', 'q', ['a', 'b', 'c', 'All of these choices are correct'], 3]), [0, 1, 2, 3]);
});
