/* ============================================================
   BODEGA BAR — FX ENGINE (Awwwards elevation pass)
   Zero dependencies. Desktop-enhanced, touch-safe, a11y-safe.
   ============================================================ */
(()=>{
const motionOK=!matchMedia('(prefers-reduced-motion: reduce)').matches;
const fine=matchMedia('(pointer:fine)').matches;

/* ---------- 1 ▸ ROLL-GATE LOADER (once per session) ---------- */
if(motionOK && !sessionStorage.getItem('bb-gate')){
  sessionStorage.setItem('bb-gate','1');
  const g=document.createElement('div');
  g.className='gate-loader';
  g.innerHTML='<div class="gl-inner"><span class="gl-mark">BODEGA BAR</span><span class="gl-sub">SYLVAN HILLS · ATLANTA</span></div>';
  document.body.appendChild(g);
  setTimeout(()=>{g.classList.add('up');setTimeout(()=>g.remove(),1100)},1000);
}

/* ---------- 2 ▸ INERTIA SCROLL + VELOCITY ---------- */
let vel=0;
if(motionOK && fine){
  let target=scrollY, cur=scrollY;
  const max=()=>document.documentElement.scrollHeight-innerHeight;
  addEventListener('wheel',e=>{
    if(e.ctrlKey)return;            // keep pinch-zoom native
    e.preventDefault();
    target=Math.max(0,Math.min(max(),target+e.deltaY));
  },{passive:false});
  // resync when scroll happens natively (anchors, keys, scrollbar)
  addEventListener('scroll',()=>{
    if(Math.abs(scrollY-cur)>2){cur=scrollY;target=scrollY}
  },{passive:true});
  (function glide(){
    const d=target-cur;
    vel=d;
    if(Math.abs(d)>.1){
      cur+=d*.09;
      scrollTo({top:cur,behavior:'instant'});
    }
    requestAnimationFrame(glide);
  })();
}

/* ---------- 2b ▸ SCRUBBED PARALLAX + VELOCITY REACTIONS ---------- */
if(motionOK){
  const plx=[];
  const stack=document.querySelector('.hero-stack');   if(stack)plx.push([stack,.07]);
  const story=document.querySelector('.story-stack');  if(story)plx.push([story,.055]);
  const wall=document.querySelector('.photowall');
  const rails=[...document.querySelectorAll('.rail')];
  (function fxloop(){
    // parallax (uses the standalone `translate` property — never fights transforms)
    plx.forEach(([el,f])=>{
      const r=el.getBoundingClientRect();
      const off=(r.top+r.height/2-innerHeight/2)*f;
      el.style.translate=`0 ${(-off).toFixed(1)}px`;
    });
    // the wall shears + rails accelerate with scroll velocity
    if(wall){
      const sk=Math.max(-3.2,Math.min(3.2,vel*.012));
      wall.style.transform=`skewY(${sk.toFixed(3)}deg)`;
    }
    rails.forEach(rail=>{
      rail.getAnimations().forEach(a=>{a.playbackRate=1+Math.min(Math.abs(vel)/70,3)});
    });
    vel*=.9;
    requestAnimationFrame(fxloop);
  })();
}

/* ---------- 3 ▸ KINETIC HERO TYPE (proximity weight) ---------- */
const heroH1=document.querySelector('header h1');
if(heroH1 && motionOK && fine){
  (function split(el){
    [...el.childNodes].forEach(n=>{
      if(n.nodeType===3){
        const frag=document.createDocumentFragment();
        [...n.textContent].forEach(c=>{
          if(c===' '||c==='\n'){frag.append(' ');return}
          const s=document.createElement('span');s.className='ch';s.textContent=c;frag.append(s);
        });
        n.replaceWith(frag);
      }else if(n.nodeType===1 && !n.classList.contains('ch')) split(n);
    });
  })(heroH1);
  const chars=[...heroH1.querySelectorAll('.ch')];
  let pending=null;
  heroH1.addEventListener('pointermove',e=>{
    pending={x:e.clientX,y:e.clientY};
  },{passive:true});
  heroH1.addEventListener('pointerleave',()=>{
    pending=null;
    chars.forEach(c=>{c.style.fontVariationSettings='';c.style.transform=''});
  });
  (function typewave(){
    if(pending){
      chars.forEach(c=>{
        const r=c.getBoundingClientRect();
        const d=Math.hypot(pending.x-(r.left+r.width/2),pending.y-(r.top+r.height/2));
        const t=Math.max(0,1-d/200);
        if(t>0.01){
          c.style.fontVariationSettings=`'SOFT' ${50+t*50},'WONK' 1,'opsz' 144,'wght' ${480+t*320}`;
          c.style.transform=`translateY(${(-t*5).toFixed(1)}px)`;
        }else{
          c.style.fontVariationSettings='';c.style.transform='';
        }
      });
    }
    requestAnimationFrame(typewave);
  })();
}

/* ---------- 4a ▸ CONTEXTUAL CURSOR ---------- */
if(fine && motionOK){
  document.documentElement.classList.add('fx-cursor');
  const dot=document.createElement('div');dot.className='fx-dot';
  const ring=document.createElement('div');ring.className='fx-ring';
  const lab=document.createElement('span');lab.className='fx-label';
  ring.appendChild(lab);
  document.body.append(dot,ring);

  // auto-tag contexts
  document.querySelectorAll('.photowall figure').forEach(el=>el.dataset.cur='VIEW');
  document.querySelectorAll('.buzzer').forEach(el=>el.dataset.cur='RING');
  document.querySelectorAll('.day .item[data-bg]').forEach(el=>el.dataset.cur='TASTE');
  document.querySelectorAll('.nite .item[data-img], .build-line[data-img]').forEach(el=>el.dataset.cur='SIP');
  document.querySelectorAll('.member').forEach(el=>el.dataset.cur='THE CREW');

  let mx=innerWidth/2,my=innerHeight/2,rx=mx,ry=my;
  addEventListener('pointermove',e=>{
    mx=e.clientX;my=e.clientY;
    dot.style.left=mx+'px';dot.style.top=my+'px';
    const ctx=e.target.closest('[data-cur]');
    const it=e.target.closest('a,button,input,textarea,select,.item,.chip,.pour,figure');
    if(ctx){lab.textContent=ctx.dataset.cur;ring.classList.add('label');ring.classList.remove('big')}
    else{ring.classList.remove('label');ring.classList.toggle('big',!!it)}
  },{passive:true});
  (function ringloop(){
    rx+=(mx-rx)*.16;ry+=(my-ry)*.16;
    ring.style.left=rx+'px';ring.style.top=ry+'px';
    requestAnimationFrame(ringloop);
  })();
}

/* ---------- 4b ▸ MAGNETIC CTAs ---------- */
if(fine && motionOK){
  document.querySelectorAll('.btn,.cta,.dbtn').forEach(b=>{
    b.addEventListener('mousemove',e=>{
      const r=b.getBoundingClientRect();
      b.style.translate=`${((e.clientX-r.left-r.width/2)*.22).toFixed(1)}px ${((e.clientY-r.top-r.height/2)*.3).toFixed(1)}px`;
    });
    b.addEventListener('mouseleave',()=>{b.style.translate='0px 0px'});
  });
}

/* ---------- 4c ▸ CLIP-MASK IMAGE REVEALS ---------- */
const maskSel='.piece .frame,.ad-media .ph,.story-stack .ph,.feature .fimg';
const masks=[...document.querySelectorAll(maskSel)];
masks.forEach(el=>el.classList.add('mask'));
const reveal=el=>{el.classList.add('in')};
// fire the moment any pixel approaches the viewport
const mio=new IntersectionObserver(es=>{
  es.forEach(e=>{if(e.isIntersecting){reveal(e.target);mio.unobserve(e.target)}});
},{threshold:0,rootMargin:'0px 0px 10% 0px'});
masks.forEach(el=>{
  const r=el.getBoundingClientRect();
  if(r.top<innerHeight&&r.bottom>0)reveal(el); // already on screen
  else mio.observe(el);
});
// belt-and-suspenders: nothing may ever stay hidden
const maskGuard=setInterval(()=>{
  let pending=false;
  masks.forEach(el=>{
    if(el.classList.contains('in'))return;
    pending=true;
    const r=el.getBoundingClientRect();
    if(r.top<innerHeight*1.05&&r.bottom>-40)reveal(el);
  });
  if(!pending)clearInterval(maskGuard);
},800);

/* ---------- 5 ▸ NEON FOOTER WORDMARK ---------- */
const footBottom=document.querySelector('footer .foot-bottom');
if(footBottom){
  const mark=document.createElement('div');
  mark.className='neonmark';mark.setAttribute('aria-hidden','true');
  'BODEGA BAR'.split('').forEach(c=>{
    if(c===' '){const s=document.createElement('span');s.className='sp';mark.appendChild(s);return}
    const s=document.createElement('span');s.className='nl';s.textContent=c;mark.appendChild(s);
  });
  footBottom.parentNode.insertBefore(mark,footBottom);
  const letters=[...mark.querySelectorAll('.nl')];
  // flicker-on sequence when footer enters view
  const nio=new IntersectionObserver(es=>{
    es.forEach(e=>{
      if(!e.isIntersecting)return;
      nio.disconnect();
      if(!motionOK){letters.forEach(l=>l.classList.add('lit'));return}
      const order=[...letters].sort(()=>Math.random()-.5);
      order.forEach((l,i)=>{
        setTimeout(()=>{
          l.classList.add('lit');
          if(Math.random()<.4){ // tube stutter
            setTimeout(()=>l.classList.remove('lit'),70);
            setTimeout(()=>l.classList.add('lit'),150);
          }
        },i*90+Math.random()*60);
      });
      // touch screens can't hover — the sign stays lit for them
      if(fine)setTimeout(()=>letters.forEach(l=>l.classList.remove('lit')),order.length*90+1400);
    });
  },{threshold:.3});
  nio.observe(mark);
  // hover lights individual tubes
  letters.forEach(l=>{
    l.addEventListener('mouseenter',()=>l.classList.add('lit'));
    l.addEventListener('mouseleave',()=>l.classList.remove('lit'));
  });
}
})();
