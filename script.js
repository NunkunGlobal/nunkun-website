const menuBtn=document.querySelector('.menu-btn');
const mobileMenu=document.querySelector('.mobile-menu');
const servicesTrigger=document.querySelector('.services-trigger');
const servicesMenu=document.querySelector('.services-menu');

function closeServices(){
  servicesMenu?.classList.remove('open');
  servicesTrigger?.setAttribute('aria-expanded','false');
  servicesMenu?.setAttribute('aria-hidden','true');
}

servicesTrigger?.addEventListener('click',()=>{
  const open=!servicesMenu.classList.contains('open');
  servicesMenu.classList.toggle('open',open);
  servicesTrigger.setAttribute('aria-expanded',String(open));
  servicesMenu.setAttribute('aria-hidden',String(!open));
});

document.addEventListener('click',(event)=>{
  if(servicesMenu && !servicesMenu.contains(event.target) && !servicesTrigger?.contains(event.target)) closeServices();
});

document.querySelectorAll('.services-menu a').forEach(link=>link.addEventListener('click',closeServices));

menuBtn?.addEventListener('click',()=>{
  const open=mobileMenu.classList.toggle('open');
  menuBtn.setAttribute('aria-expanded',String(open));
  mobileMenu.setAttribute('aria-hidden',String(!open));
  if(open) closeServices();
});

document.querySelectorAll('.mobile-menu a').forEach(link=>link.addEventListener('click',()=>{
  mobileMenu.classList.remove('open');
  menuBtn?.setAttribute('aria-expanded','false');
  mobileMenu?.setAttribute('aria-hidden','true');
}));

const observer=new IntersectionObserver((entries)=>{
  entries.forEach((entry)=>{
    if(entry.isIntersecting){
      entry.target.classList.add('visible');
      observer.unobserve(entry.target);
    }
  });
},{threshold:.12,rootMargin:'0px 0px -30px 0px'});
document.querySelectorAll('.reveal').forEach((el,index)=>{
  el.style.transitionDelay=`${Math.min(index%4,3)*70}ms`;
  observer.observe(el);
});

window.addEventListener('scroll',()=>{
  const y=window.scrollY;
  document.documentElement.style.setProperty('--scroll',`${y}px`);
},{passive:true});

document.getElementById('year').textContent=new Date().getFullYear();
