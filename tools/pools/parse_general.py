# Run from the repo root after: pandoc NCVEC-general.docx -t plain --wrap=none -o tools/pools/work/general.txt
import re,json
L=[l.strip() for l in open('tools/pools/work/general.txt',encoding='utf-8')]
# start at the pool body: second occurrence of SUBELEMENT G1
starts=[i for i,l in enumerate(L) if l.startswith('SUBELEMENT G1')]
L=L[starts[-1]:]
subs=[];groups=[];qs=[];cur=None;deleted=[]
for l in L:
    if not l: continue
    m=re.match(r'^SUBELEMENT (G\d) [–-] (.*?) \[(\d+) Exam Questions',l)
    if m: subs.append({'id':m.group(1),'title':m.group(2).title().replace("'S","'s").replace('’S','’s'),'n':int(m.group(3))}); continue
    m=re.match(r'^(G\d[A-Z]) [–-] (.*)$',l)
    if m: groups.append({'id':m.group(1),'title':m.group(2)}); cur=None; continue
    m=re.match(r'^(G\d[A-Z]\d\d)\s+Question Deleted',l,re.I)
    if m: deleted.append(m.group(1)); cur=None; continue
    m=re.match(r'^(G\d[A-Z]\d\d)\s*\(([A-D])\)\s*(.*)$',l)
    if m: cur={'id':m.group(1),'a':m.group(2),'ref':m.group(3).strip(),'q':'','choices':[]}; qs.append(cur); continue
    if l=='~~': cur=None; continue
    if cur is None:
        print('STRAY',l[:100]); continue
    m=re.match(r'^([A-D])\.\s*(.*)$',l)
    if m and len(cur['choices'])==ord(m.group(1))-65: cur['choices'].append(m.group(2)); continue
    if cur['choices']: cur['choices'][-1]+=' '+l
    else: cur['q']=(cur['q']+' '+l).strip()
bad=[q['id'] for q in qs if len(q['choices'])!=4 or not q['q']]
print(len(subs),len(groups),len(qs),'deleted',deleted,'bad',bad)
print(sum(s['n'] for s in subs))
from collections import Counter
c=Counter(q['id'][:3] for q in qs); print(sorted(c.items()))
json.dump({'subs':subs,'groups':groups,'qs':qs,'deleted':deleted},open('tools/pools/work/general.json','w'),indent=0)
