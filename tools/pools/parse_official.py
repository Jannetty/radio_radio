# Run from the repo root. Inputs: pdftotext output of the official FCC PDFs in tools/pools/sources/fcc/E1.txt etc.
import re,json,sys,difflib
def norm(s): return re.sub(r'[^a-z0-9]','',s.lower().replace('’',"'"))
def parse(path,e):
    L=[l.strip() for l in open(path,encoding='utf-8')]
    subs=[];topics={};qs={};order=[];keys={};cur=None;curtopic=None;cursub=None
    junk=re.compile(r'^(\d{4} FCC Commercial|FCC Commercial Element|PAGE \d+|GMDSS-STCW|Page \d+|\d+$)')
    qid=re.compile(r'^((?:\d+-)?(\d+)([A-Z])(\d+))\s+(.*)$')
    inkey=False
    for l in L:
        if not l or junk.match(l): continue
        m=re.match(r'^Subelement\s+(?:3-?)?([A-Z])\s*[–-]\s*(.*?)[:–-]\s*\d+\s*Key',l)
        if m: cursub=m.group(1); subs.append((cursub,m.group(2).strip())); continue
        m=re.match(r'^Section-([A-Z]):\s*(.*?)[.:]\s*Key Topic #(\d+):\s*(.*?):?$',l)
        if m:
            if not subs or subs[-1][0]!=m.group(1): subs.append((m.group(1),m.group(2).strip()))
            topics[int(m.group(3))]=(m.group(1),m.group(4).strip().rstrip(':')); inkey=False; cur=None; continue
        m=re.match(r'^Key Topic\s+(\d+)\s*[:–-]\s*(.*)$',l)
        if m: topics[int(m.group(1))]=(cursub,m.group(2).strip()); inkey=False; cur=None; continue
        if l.startswith('Answer Key') or l.startswith('Answers'):
            inkey=True; cur=None
        if inkey or re.match(r'^((?:\d+-)?\d+[A-Z]\d+)\s*[:–-]\s*[A-D]\b',l):
            for m in re.finditer(r'((?:\d+-)?\d+[A-Z]\d+)\s*[:\-–]?\s*([A-D])\b',l): keys[m.group(1)]=m.group(2)
            if re.match(r'^((?:\d+-)?\d+[A-Z]\d+)\s*[:–-]?\s*[A-D]\s*$',l) or l.startswith('Answer'): continue
        m=re.match(r'^([A-D])\.\s*(.*)$',l)
        if m and cur: qs[cur]['choices'].append(m.group(2)); continue
        m=qid.match(l)
        if m and not re.match(r'^[A-D]$',m.group(5)):
            cur=m.group(1); inkey=False; qs[cur]={'id':cur,'topic':int(m.group(2)),'sub':m.group(3),'q':m.group(5),'choices':[]}; order.append(cur); continue
        if cur and not inkey:
            if qs[cur]['choices']: qs[cur]['choices'][-1]+=' '+l
            else: qs[cur]['q']+=' '+l
    return dict(subs=subs,topics=topics,qs=[dict(qs[i],a=keys.get(i)) for i in order],nkeys=len(keys))
if __name__=='__main__':
    fe=json.load(open('tools/pools/work/fccexam.json'))
    out={}
    for e in ['E1','E3','E7','E8']:
        r=parse(f'tools/pools/sources/fcc/{e}.txt',e); out[e]=r
        print(e,'subs',len(r['subs']),'topics',len(r['topics']),'qs',len(r['qs']),'keys',r['nkeys'])
        off={q['id']:q for q in r['qs']}
        fq={q['id']:q for q in fe[e]}
        print('  only official',[i for i in off if i not in fq][:8],' only fccexam',[i for i in fq if i not in off][:8])
        nd=0
        for i,q in fq.items():
            o=off.get(i)
            if not o: continue
            if o['a']!=q['a']: print('  KEYDIFF',i,'off',o['a'],'fcc',q['a'])
            a=norm(o['q']+'|'.join(o['choices'])); b=norm(q['q']+'|'.join(q['choices']))
            if a!=b:
                nd+=1
                if nd<=6: print('  TEXTDIFF',i,round(difflib.SequenceMatcher(None,a,b).ratio(),3), '\n    O:',(o['q']+' || '+' | '.join(o['choices']))[:300],'\n    F:',(q['q']+' || '+' | '.join(q['choices']))[:300])
        print('  textdiffs',nd)
    json.dump(out,open('tools/pools/work/official.json','w'),indent=0)
