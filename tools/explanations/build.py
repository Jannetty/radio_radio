# Build app/data/explanations/<pool>.json from the reviewed drafts in tools/explanations/<pool>/.
# Run from the repo root: python3 tools/explanations/build.py e1
# Only entries marked "status": "verified" (set after the independent review) are published.
import json, sys, re
pool = sys.argv[1] if len(sys.argv) > 1 else 'e1'
SRC = json.load(open('tools/explanations/sources.json'))
Q = json.load(open(f'tools/explanations/{pool}/questions.json'))
T = json.load(open(f'tools/explanations/{pool}/topics.json'))

def cite(s):
    if 'doc' in s:
        d = SRC['docs'][s['doc']]
        return {'cite': d['title'], 'url': d['url'], 'quote': s['quote']}
    sec = s['sec']
    title, num = ('33 CFR', sec[3:]) if sec.startswith('33:') else ('47 CFR', sec)
    return {'cite': f'{title} §{num}', 'url': SRC['sections'][sec]['url'], 'quote': s['quote']}

def head(sec):
    h = SRC['sections'][sec]['head']
    return re.sub(r'^§\s*[\d.]+\s*', '', h).rstrip('.')

out = {'pool': pool, 'q': {}, 'topics': {}}
topic_secs = {}
for qid, e in Q.items():
    if e.get('status') != 'verified':
        continue
    item = {'why': e['why'], 'src': [cite(s) for s in e['src']]}
    if e.get('note'): item['note'] = e['note']
    if e.get('basis') == 'practice': item['basis'] = 'practice'
    out['q'][qid] = item
    m = re.match(r'^([TGE]\d[A-Z])\d+$', qid) or re.match(r'^(?:\d+-)?(\d+)[A-Z]\d+$', qid)
    topic_secs.setdefault(m.group(1), []).extend(s['sec'] for s in e['src'] if 'sec' in s)

for tid, t in T.items():
    if t.get('status') != 'verified':
        continue
    facts = []
    for f in t['facts']:
        c = cite(f['src'])
        facts.append({'text': f['text'], 'cite': c['cite'] if 'doc' not in f['src'] else c['cite'].split(',')[0], 'url': c['url']})
    secs = list(dict.fromkeys(topic_secs.get(tid, []) + [f['src']['sec'] for f in t['facts'] if 'sec' in f['src']]))
    rules = [{'cite': cite({'sec': s, 'quote': ''})['cite'] + ' ' + head(s), 'url': SRC['sections'][s]['url'], 'quote': ''} for s in secs]
    out['topics'][tid] = {'intro': t['intro'], 'facts': facts, 'rules': rules, 'reading': t['reading']}

import os
os.makedirs('app/data/explanations', exist_ok=True)
json.dump(out, open(f'app/data/explanations/{pool}.json', 'w'), ensure_ascii=False, separators=(',', ':'))
print(pool, len(out['q']), 'explanations,', len(out['topics']), 'topics')
