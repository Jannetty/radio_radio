import test from 'node:test';
import assert from 'node:assert/strict';
import { existsSync } from 'node:fs';
import { pools } from './fixtures.js';

const expected = {
  tech: { n: 35, p: 26, q: 409 },
  extra: { n: 50, p: 37, q: 599 },
  e1: { n: 24, p: 18, q: 144 },
  e3: { n: 100, p: 75, q: 600 },
  e7: { n: 100, p: 75, q: 600 },
  e8: { n: 50, p: 38, q: 300 },
  gen: { n: 35, p: 26, q: 423 },
};

for (const p of pools) {
  test(`${p.id}: size and exam format`, () => {
    assert.ok(expected[p.id], 'known pool');
    assert.equal(p.q.length, expected[p.id].q);
    assert.equal(p.n, expected[p.id].n);
    assert.equal(p.p, expected[p.id].p);
    const groups = p.sections.reduce((a, s) => a + s.g.length, 0);
    assert.equal(groups, p.n, 'one exam question per key topic / group');
  });

  test(`${p.id}: every question well formed and in exactly one group`, () => {
    const seen = new Array(p.q.length).fill(0);
    p.sections.forEach(s => s.g.forEach(g => { assert.ok(g.q.length > 0); g.q.forEach(i => seen[i]++); }));
    assert.ok(seen.every(c => c === 1));
    const ids = new Set();
    for (const q of p.q) {
      assert.equal(typeof q[0], 'string');
      assert.ok(!ids.has(q[0]), `duplicate id ${q[0]}`); ids.add(q[0]);
      assert.ok(q[1].length > 3, q[0]);
      assert.equal(q[2].length, 4, q[0]);
      q[2].forEach(c => assert.ok(c.length > 0, q[0]));
      assert.ok([0, 1, 2, 3].includes(q[3]), q[0]);
      if (q[4]) assert.ok(existsSync(new URL(`../app/figs/${q[4]}.png`, import.meta.url)), `figure ${q[4]}`);
    }
  });
}

test('spot checks against the official answer keys', () => {
  const ans = (pid, qid) => { const q = pools.find(p => p.id === pid).q.find(x => x[0] === qid); return 'ABCD'[q[3]]; };
  assert.equal(ans('e1', '1-1A1'), 'A');
  assert.equal(ans('e3', '3-10B1'), 'D');
  assert.equal(ans('e3', '3-13B1'), 'C');
  assert.equal(ans('e7', '62I3'), 'B');
  assert.equal(ans('e8', '8-24C6'), 'C');
  assert.equal(ans('gen', 'G1A01'), 'C');
  assert.equal(ans('tech', 'T1A01'), 'C');
  assert.equal(ans('tech', 'T1C01'), 'D');
  assert.equal(ans('extra', 'E1A01'), 'D');
});

test('withdrawn Extra questions are gone, and the Technician errata are applied', () => {
  const extra = pools.find(p => p.id === 'extra');
  for (const id of ['E2A13', 'E4D05', 'E6D07', 'E9E10']) assert.ok(!extra.q.some(q => q[0] === id), id);
  const tech = pools.find(p => p.id === 'tech');
  assert.match(tech.q.find(q => q[0] === 'T1C01')[1], /currently issue new licenses/);
});

test('every pool is amateur or commercial', () => {
  assert.deepEqual(pools.filter(p => p.cat === 'amateur').map(p => p.id), ['tech', 'gen', 'extra']);
  assert.deepEqual(pools.filter(p => p.cat === 'commercial').map(p => p.id), ['e1', 'e3', 'e7', 'e8']);
});

test('withdrawn General questions are gone', () => {
  const gen = pools.find(p => p.id === 'gen');
  for (const id of ['G1A04', 'G1C08', 'G1C09', 'G1C10', 'G1E09', 'G6B09', 'G8C01', 'G9C06', 'G9D13']) {
    assert.ok(!gen.q.some(q => q[0] === id), id);
  }
});
