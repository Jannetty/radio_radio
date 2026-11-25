# Run from the repo root. usage: python3 tools/pools/parse_ncvec.py tools/pools/work/tech.txt tools/pools/work/tech.json
# Parse an NCVEC amateur pool (.docx converted with: pandoc pool.docx -t plain --wrap=none -o pool.txt)
# usage: python3 parse_ncvec.py pool.txt out.json
import re,json,sys
src,out=sys.argv[1],sys.argv[2]
L=[l.strip().replace('‑','-') for l in open(src,encoding='utf-8')]
starts=[i for i,l in enumerate(L) if re.match(r'^SUBELEMENT [TGE]1 ',l)]
L=L[starts[-1]:]
subs=[];groups=[];qs=[];cur=None;deleted=[]
for l in L:
    if not l: continue
    m=re.match(r'^SUBELEMENT ([TGE]\d)\s*[–-]\s*(.*?)\s*[–-]?\s*\[(\d+) Exam Questions?',l,re.I)
    if m:
        t=m.group(2).strip(' -–').title().replace("'S","'s").replace('’S','’s').replace(' And ',' and ')
        subs.append({'id':m.group(1),'title':t,'n':int(m.group(3))}); continue
    m=re.match(r'^([TGE]\d[A-Z])\s*[–-]?\s+(\D.*)$',l)
    if m: groups.append({'id':m.group(1),'title':m.group(2)}); cur=None; continue
    m=re.match(r'^([TGE]\d[A-Z]\d\d)\s+Question Deleted',l,re.I)
    if m: deleted.append(m.group(1)); cur=None; continue
    m=re.match(r'^([TGE]\d[A-Z]\d\d)\s*\(([A-D])\)\s*(.*)$',l)
    if m: cur={'id':m.group(1),'a':m.group(2),'ref':m.group(3).strip(),'q':'','choices':[]}; qs.append(cur); continue
    if l.startswith('~~'): cur=None; continue
    if cur is None:
        print('STRAY',l[:100]); continue
    m=re.match(r'^([A-D])\.\s*(.*)$',l)
    if m and len(cur['choices'])==ord(m.group(1))-65: cur['choices'].append(m.group(2)); continue
    if cur['choices']: cur['choices'][-1]+=' '+l
    else: cur['q']=(cur['q']+' '+l).strip()
bad=[q['id'] for q in qs if len(q['choices'])!=4 or not q['q']]
print(src,'subs',len(subs),'groups',len(groups),'qs',len(qs),'deleted',deleted,'bad',bad,'exam n',sum(s['n'] for s in subs))
json.dump({'subs':subs,'groups':groups,'qs':qs,'deleted':deleted},open(out,'w'),indent=0)
