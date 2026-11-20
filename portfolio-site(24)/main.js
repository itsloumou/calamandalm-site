const b=document.querySelectorAll('.filters button'),list=document.getElementById('list'),p=[...list.children];
b.forEach(x=>x.onclick=()=>{b.forEach(y=>y.classList.remove('on'));x.classList.add('on');const f=x.dataset.f;
if(f==='all'){p.forEach(a=>{a.classList.remove('hide');list.appendChild(a)});return}
const w=a=>JSON.parse(a.dataset.w)[f];
[...p].sort((a,c)=>w(c)-w(a)||p.indexOf(a)-p.indexOf(c)).forEach(a=>{a.classList.toggle('hide',w(a)===0);list.appendChild(a)})});
const m=document.getElementById('mail');if(m)m.href='mailto:'+m.dataset.u+'@'+m.dataset.d;

/* ---- phone photo rows: counter, progress line, wide-photo stops, one-time nudge ---- */
const mq=window.matchMedia('(max-width:800px)');
document.querySelectorAll('.media').forEach(media=>{
  const g=media.querySelector('.gallery'),slides=[...g.children],cur=media.querySelector('.cur'),bar=media.querySelector('.bar i');
  const markWide=()=>{const w=g.clientWidth-40;slides.forEach(s=>s.classList.toggle('wide',mq.matches&&s.offsetWidth>w))};
  const update=()=>{
    const r=g.getBoundingClientRect(),mid=r.left+r.width/2;let idx=0;
    slides.forEach((s,i)=>{const b=s.getBoundingClientRect();if(b.left<=mid)idx=i});
    if(cur)cur.textContent=String(idx+1).padStart(2,'0');
    const max=g.scrollWidth-g.clientWidth;if(bar)bar.style.width=(max>0?Math.min(100,Math.max(0,g.scrollLeft/max*100)):0)+'%';
  };
  g.addEventListener('scroll',()=>{update();g.dataset.moved='1';g.classList.remove('nudge')},{passive:true});
  const prep=()=>{markWide();update()};
  window.addEventListener('resize',prep);window.addEventListener('load',prep);prep();
  if('IntersectionObserver' in window&&!matchMedia('(prefers-reduced-motion:reduce)').matches){
    const io=new IntersectionObserver(es=>{es.forEach(e=>{
      if(e.isIntersecting&&mq.matches&&!g.dataset.moved&&!g.dataset.nudged){g.dataset.nudged='1';g.classList.add('nudge');setTimeout(()=>g.classList.remove('nudge'),1300);io.disconnect()}})},{threshold:.7});
    io.observe(g);
  }
});