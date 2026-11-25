# Write docs/explanations/<pool>-review.md: every question, its keyed answer, the explanation and the
# quoted sources, for a human read-through. Run from the repo root: python3 tools/explanations/review.py e1
import json, os, re, sys
pool = sys.argv[1] if len(sys.argv) > 1 else 'e1'
P = next(p for p in json.load(open('app/data/pools.json'))['pools'] if p['id'] == pool)
EX = json.load(open(f'app/data/explanations/{pool}.json'))
L = 'ABCD'
grp = {}
for s in P['sections']:
    for g in s['g']:
        for i in g['q']:
            grp[i] = (s, g)

out = [f"# {P['name']} explanations, review copy", '',
       f"Generated from `app/data/explanations/{pool}.json` by `tools/explanations/review.py`. "
       f"{len(EX['q'])} of {len(P['q'])} questions have an explanation. Each quote below appears word for word "
       "in the linked source. \"Heads up\" notes mark places where the current rule differs from the exam's answer key; "
       "\"general practice\" marks answers with no rule to quote.", '']
missing = [q[0] for q in P['q'] if q[0] not in EX['q']]
if missing:
    out += ['Questions without an explanation: ' + ', '.join(missing), '']
cur = None
for i, q in enumerate(P['q']):
    s, g = grp[i]
    if g['id'] != cur:
        cur = g['id']
        out += [f"## Topic {g['id']}. {g['t']}", '']
        t = EX['topics'].get(g['id'])
        if t:
            out += [t['intro'], '']
            out += [f"- {f['text']} ([{f['cite']}]({f['url']}))" for f in t['facts']] + ['']
            out += [f"- Diagram: {d['caption']}" for d in t.get('diagrams', [])]
    e = EX['q'].get(q[0])
    out += [f"### {q[0]}", '', q[1], '']
    out += [f"{'**' if k == q[3] else ''}{L[k]}. {c}{'**' if k == q[3] else ''}" + '  ' for k, c in enumerate(q[2])] + ['']
    if not e:
        out += ['_No explanation published._', '']
        continue
    out += [e['why'], '']
    if e.get('note'): out += [f"> Heads up: {e['note']}", '']
    if e.get('basis') == 'practice': out += ['_General operating practice, not a quoted rule._', '']
    if e.get('basis') == 'theory': out += ['_Standard radio theory, not a quoted rule._', '']
    out += [f"- [{x['cite']}]({x['url']}): “{x['quote']}”" for x in e['src']] + ['']

os.makedirs('docs/explanations', exist_ok=True)
open(f'docs/explanations/{pool}-review.md', 'w').write('\n'.join(out))
print('wrote', f'docs/explanations/{pool}-review.md')
