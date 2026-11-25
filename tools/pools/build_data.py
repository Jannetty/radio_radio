# Run from the repo root: python3 tools/pools/build_data.py  (needs ImageMagick 'convert')
import json,re,subprocess,os
fe=json.load(open('tools/pools/work/fccexam.json')); of=json.load(open('tools/pools/work/official.json')); gen=json.load(open('tools/pools/work/general.json'))
FIG={}
e3=['3B1','3B2','3B3','3C4','3C5','3D6','3D7','3D8','3D9','3D10','3D11','3E12','3E13','3E14','3F15','3F16','3H17']
e8=['8A1','8A2','8A3','8A4','8A5','8A6','8A7','8A8','8C9','8C10','8C11','8F12']
import glob
for pre,names in (('E3',e3),('E8',e8)):
    files=sorted(glob.glob(f'tools/pools/work/fig/{pre}_*'))
    for f,n in zip(files,names): FIG[n]=f
FIG['G7-1']='tools/pools/work/fig/G7-1.png'
for n,f in FIG.items():
    out=f'app/figs/{n}.png'
    w='900' if n=='G7-1' else '1000'
    subprocess.run(['convert',f,'-resize',f'{w}x>','-strip','-define','png:compression-level=9',out],check=True)
figre=re.compile(r'\bFig(?:ure|\.)?\s*(G7-1|3[A-Z]\d+|8[A-Z]\d+)',re.I)
def tidy(s):
    s=s.replace(' pi ',' π ').replace('2 pi','2π').replace('sqrt(L/C)','√(L/C)').replace('1/4 wave','¼-wave')
    return re.sub(r'\s+',' ',s).strip()
META={
 'E1':dict(code='Element 1',name='Marine Radio Operator Permit',desc='Basic radio law and operating practice',n=24,p=18,gl='Key topic',src='FCC Element 1 pool (approved June 25, 2009)'),
 'E3':dict(code='Element 3',name='General Radiotelephone',desc='Electronics fundamentals for the GROL',n=100,p=75,gl='Key topic',src='FCC Element 3 pool (approved June 25, 2009)'),
 'E7':dict(code='Element 7',name='GMDSS Radio Operator',desc='GMDSS radio operating practices',n=100,p=75,gl='Key topic',src='FCC Element 7 pool (approved Oct 6, 2021)'),
 'E8':dict(code='Element 8',name='Ship Radar Endorsement',desc='Ship radar techniques',n=50,p=38,gl='Key topic',src='FCC Element 8 pool (2009, updated Mar 6, 2024)'),
}
pools=[]
for e in ['E1','E3','E7','E8']:
    m=META[e]; subs=[list(x) for x in of[e]['subs']]; topics={k:list(v) for k,v in of[e]['topics'].items()}
    if e=='E8':
        subs.append(['F','Installation, Maintenance & Repair'])
        for k in range(44,51): topics[str(k)][0]='F'
    secs=[{'id':s,'t':t,'g':[]} for s,t in subs]; si={s['id']:s for s in secs}
    gmap={}
    for k,(s,t) in sorted(topics.items(),key=lambda x:int(x[0])):
        g={'id':k,'t':t,'q':[]}; si[s]['g'].append(g); gmap[k]=(g,s)
    qs=[]
    for q in fe[e]:
        mm=re.match(r'^(?:\d+-)?(\d+)([A-Z])(\d+)$',q['id']); topic,sub=mm.group(1),mm.group(2)
        g,s=gmap[topic]
        if s!=sub: print('SUBMISMATCH',e,q['id'],s)
        a='ABCD'.index(q['a']); text=tidy(q['q']); ch=[tidy(c) for c in q['choices']]
        fm=figre.search(text+' '+' '.join(ch)); fig=fm.group(1).upper() if fm else None
        if fig and fig not in FIG: print('MISSING FIG',e,q['id'],fig); fig=None
        qid=q['id'] if e!='E1' or '-' in q['id'] else q['id']
        g['q'].append(len(qs)); qs.append([qid,text,ch,a]+([fig] if fig else []))
    pools.append(dict(id=e.lower(),**m,sections=secs,q=qs))
# General
m=dict(code='Amateur General',name='General Class',desc='Amateur radio Element 3, 2023–2027 pool',n=35,p=26,gl='Group',src='NCVEC 2023–2027 General pool, 6th errata (Feb 4, 2026)')
secs=[];si={}
for s in gen['subs']:
    sec={'id':s['id'],'t':s['title'],'g':[]}; secs.append(sec); si[s['id']]=sec
gm={}
for g in gen['groups']:
    gg={'id':g['id'],'t':g['title'],'q':[]}; si[g['id'][:2]]['g'].append(gg); gm[g['id']]=gg
# order sections G1..G9, G0 as in pool
qs=[]
for q in gen['qs']:
    text=tidy(q['q']); ch=[tidy(c) for c in q['choices']]
    fm=figre.search(text); fig=fm.group(1).upper() if fm else None
    gm[q['id'][:3]]['q'].append(len(qs)); qs.append([q['id'],text,ch,'ABCD'.index(q['a'])]+([fig] if fig else []))
pools.append(dict(id='gen',**m,sections=secs,q=qs))
for p in pools:
    ng=sum(len(s['g']) for s in p['sections'])
    empty=[g['id'] for s in p['sections'] for g in s['g'] if not g['q']]
    print(p['id'],len(p['q']),'groups',ng,'exam n',p['n'],'empty',empty,'figs',sum(1 for q in p['q'] if len(q)>4))
json.dump({'pools':pools},open('app/data/pools.json','w'),ensure_ascii=False,separators=(',',':'))
print(os.path.getsize('app/data/pools.json'))
