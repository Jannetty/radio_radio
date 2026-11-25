import { readFileSync } from 'node:fs';
export const pools = JSON.parse(readFileSync(new URL('../app/data/pools.json', import.meta.url))).pools;

// A tiny pool: 2 sections, 3 groups, 7 questions.
export const tiny = {
  id: 't', n: 3, p: 2,
  sections: [
    { id: 'A', t: 'First', g: [{ id: '1', t: 'g1', q: [0, 1] }, { id: '2', t: 'g2', q: [2, 3] }] },
    { id: 'B', t: 'Second', g: [{ id: '3', t: 'g3', q: [4, 5, 6] }] },
  ],
  q: [0, 1, 2, 3, 4, 5, 6].map(i => [`Q${i}`, `question ${i}`, ['a', 'b', 'c', 'd'], i % 4]),
};

/** Deterministic random numbers for tests. */
export function seeded(seed = 1) {
  return () => ((seed = (seed * 16807) % 2147483647) - 1) / 2147483646;
}
