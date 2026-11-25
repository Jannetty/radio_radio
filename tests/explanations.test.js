import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync, existsSync } from 'node:fs';
import { pools } from './fixtures.js';

const read = p => JSON.parse(readFileSync(new URL(p, import.meta.url), 'utf8'));
const EXPLAINED = ['e1', 'e7', 'tech', 'gen'];

for (const id of EXPLAINED) {
  const file = `../app/data/explanations/${id}.json`;

  test(`${id} explanations: file exists and names its pool`, () => {
    assert.ok(existsSync(new URL(file, import.meta.url)));
    assert.equal(read(file).pool, id);
  });

  test(`${id} explanations: every entry points at a real question and cites a quoted source`, () => {
    const ex = read(file);
    const pool = pools.find(p => p.id === id);
    const ids = new Set(pool.q.map(q => q[0]));
    const n = Object.keys(ex.q).length;
    assert.ok(n > 0);
    for (const [qid, e] of Object.entries(ex.q)) {
      assert.ok(ids.has(qid), `unknown question ${qid}`);
      assert.ok(e.why && e.why.length > 20, `${qid} why`);
      assert.ok(Array.isArray(e.src), `${qid} src`);
      if (!['practice', 'theory'].includes(e.basis)) assert.ok(e.src.length > 0, `${qid} has no source`);
      for (const s of e.src) {
        assert.ok(s.cite, `${qid} cite`);
        assert.match(s.url, /^https:\/\//, `${qid} url`);
        assert.ok(s.quote && s.quote.length > 3, `${qid} quote`);
      }
      if (e.basis) assert.ok(['practice', 'theory'].includes(e.basis), qid);
    }
  });

  test(`${id} explanations: only reviewed entries are published`, () => {
    const ex = read(file);
    const src = read(`../tools/explanations/${id}/questions.json`);
    for (const qid of Object.keys(ex.q)) assert.equal(src[qid]?.status, 'verified', `${qid} not verified`);
    const tsrc = read(`../tools/explanations/${id}/topics.json`);
    for (const tid of Object.keys(ex.topics)) assert.equal(tsrc[tid]?.status, 'verified', `topic ${tid} not verified`);
  });

  test(`${id} explanations: topics match the pool's key topics`, () => {
    const ex = read(file);
    const pool = pools.find(p => p.id === id);
    const groups = new Set(pool.sections.flatMap(s => s.g.map(g => g.id)));
    for (const [tid, t] of Object.entries(ex.topics)) {
      assert.ok(groups.has(tid), `topic ${tid} not a key topic`);
      assert.ok(t.intro, `topic ${tid} intro`);
      for (const f of t.facts) { assert.ok(f.text); assert.match(f.url, /^https:\/\//); }
      for (const r of t.reading) assert.match(r.url, /^https:\/\//);
      const ids = (t.diagrams || []).flatMap(d => [...d.svg.matchAll(/\sid="([^"]+)"/g)].map(m => m[1]));
      assert.equal(new Set(ids).size, ids.length, `topic ${tid} diagram ids are unique`);
      for (const d of t.diagrams || []) {
        assert.match(d.svg, /^<svg[\s>]/, `topic ${tid} diagram`);
        assert.doesNotMatch(d.svg, /<script|\son\w+\s*=|javascript:|<foreignObject/i, `topic ${tid} diagram is inert`);
        assert.match(d.svg, /role="img"/, `topic ${tid} diagram role`);
        assert.match(d.svg, /<title[\s>]/, `topic ${tid} diagram title`);
        assert.ok(d.caption, `topic ${tid} diagram caption`);
      }
    }
  });
}
