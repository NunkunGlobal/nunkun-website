(function(){
  const year=document.getElementById('year'); if(year) year.textContent=new Date().getFullYear();
  const trigger=document.querySelector('.services-trigger');
  const menu=document.getElementById('services-menu');
  const mobileBtn=document.querySelector('.menu-btn');
  const mobileMenu=document.querySelector('.mobile-menu');
  function setServices(open){ if(!trigger||!menu) return; trigger.setAttribute('aria-expanded',String(open)); menu.classList.toggle('open',open); menu.setAttribute('aria-hidden',String(!open)); }
  trigger?.addEventListener('click',e=>{e.stopPropagation();setServices(trigger.getAttribute('aria-expanded')!=='true');});
  document.addEventListener('click',e=>{if(menu?.classList.contains('open')&&!menu.contains(e.target)&&!trigger.contains(e.target)) setServices(false);});
  mobileBtn?.addEventListener('click',()=>{const open=mobileBtn.getAttribute('aria-expanded')!=='true'; mobileBtn.setAttribute('aria-expanded',String(open)); mobileMenu.classList.toggle('open',open); mobileMenu.setAttribute('aria-hidden',String(!open));});
  mobileMenu?.querySelectorAll('a').forEach(a=>a.addEventListener('click',()=>{mobileBtn?.setAttribute('aria-expanded','false');mobileMenu.classList.remove('open');mobileMenu.setAttribute('aria-hidden','true');}));
  const observer=new IntersectionObserver(entries=>entries.forEach(entry=>{if(entry.isIntersecting) entry.target.classList.add('in')}),{threshold:.12});
  document.querySelectorAll('.reveal').forEach(el=>observer.observe(el));
  const items=[...document.querySelectorAll('.hero-panel .service-item')];
  items.forEach(item=>{item.addEventListener('mouseenter',()=>{items.forEach(i=>i.classList.remove('active'));item.classList.add('active')});});
  if(items[0]) items[0].classList.add('active');
  const slider=document.querySelector('[data-work-slider]');
  if(slider){
    const track=slider.querySelector('.work-track');
    const slides=[...slider.querySelectorAll('.work-slide')];
    const prev=slider.querySelector('.work-prev');
    const next=slider.querySelector('.work-next');
    const fill=slider.querySelector('.work-progress-fill');
    const count=slider.querySelector('.work-count b');
    let index=0;
    let startX=0, dragging=false;
    function render(){
      track.style.transform=`translate3d(-${index*100}%,0,0)`;
      slides.forEach((slide,i)=>slide.classList.toggle('is-active',i===index));
      if(fill) fill.style.transform=`scaleX(${1/(slides.length)*(index+1)})`;
      if(count) count.textContent=String(index+1).padStart(2,'0');
    }
    function go(nextIndex){index=(nextIndex+slides.length)%slides.length;render();}
    prev?.addEventListener('click',()=>go(index-1));
    next?.addEventListener('click',()=>go(index+1));
    slider.addEventListener('pointerdown',e=>{dragging=true;startX=e.clientX;slider.setPointerCapture?.(e.pointerId)});
    slider.addEventListener('pointerup',e=>{if(!dragging)return;dragging=false;const delta=e.clientX-startX;if(Math.abs(delta)>45) go(delta<0?index+1:index-1)});
    slider.addEventListener('pointercancel',()=>{dragging=false});
    slider.addEventListener('wheel',e=>{if(window.innerWidth<820)return;if(Math.abs(e.deltaY)>Math.abs(e.deltaX)){e.preventDefault();go(e.deltaY>0?index+1:index-1)}},{passive:false});
    render();
  }
})();
