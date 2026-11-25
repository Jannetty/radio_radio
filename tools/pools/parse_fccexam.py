# Run from the repo root. Input: fccexam share/E*.txt copied to tools/pools/sources/fccexam/
import re,json,sys
def parse(path, elem):
    lines=[l.rstrip('\n').replace('\r','') for l in open(path,encoding='utf-8',errors='replace')]
    qs={};order=[];keys={};cur=None
    idre = re.compile(r'^((?:\d+-)?\d+[A-Z]\d+)\s+(.*)$')
    for l in lines:
        if not l.strip(): continue
        if l.startswith('Answer Key') or l.startswith('Answers:'):
            body=l.split(':',1)[1]
            for m in re.finditer(r'((?:\d+-)?\d+[A-Z]\d+)\s*[:\-\u2013]?\s*([A-D])\b',body):
                keys[m.group(1)]=m.group(2)
            cur=None; continue
        m=re.match(r'^([A-D])\.\s*(.*)$',l)
        if m and cur:
            qs[cur]['choices'].append(m.group(2)); continue
        m=idre.match(l)
        if m:
            cur=m.group(1); qs[cur]={'id':cur,'q':m.group(2),'choices':[]}; order.append(cur); continue
        if cur:
            if qs[cur]['choices']: qs[cur]['choices'][-1]+=' '+l.strip()
            else: qs[cur]['q']+=' '+l.strip()
        else: print('STRAY',elem,l[:80],file=sys.stderr)
    out=[]
    for i in order:
        q=qs[i]; q['a']=keys.get(i)
        out.append(q)
    return out
if __name__=='__main__':
    res={}
    for e in ['E1','E3','E7','E8']:
        r=parse(f'tools/pools/sources/fccexam/{e}.txt',e); res[e]=r
        bad=[q['id'] for q in r if len(q['choices'])!=4 or not q['a']]
        print(e,len(r),'bad',bad[:10])
    json.dump(res,open('tools/pools/work/fccexam.json','w'),indent=0)
