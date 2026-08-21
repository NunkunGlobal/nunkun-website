const menuBtn=document.querySelector('.menu-btn');
const mobileNav=document.querySelector('.mobile-nav');
const servicesTrigger=document.querySelector('.services-trigger');
const mega=document.querySelector('.mega-menu');

menuBtn?.addEventListener('click',()=>{
  const open=mobileNav.classList.toggle('open');
  menuBtn.setAttribute('aria-expanded',String(open));
  mobileNav.setAttribute('aria-hidden',String(!open));
});

document.querySelectorAll('.mobile-nav a').forEach(a=>a.addEventListener('click',()=>{
  mobileNav.classList.remove('open'); menuBtn?.setAttribute('aria-expanded','false'); mobileNav?.setAttribute('aria-hidden','true');
}));

servicesTrigger?.addEventListener('click',()=>{
  const open=mega.classList.toggle('open');
  servicesTrigger.setAttribute('aria-expanded',String(open));
  mega.setAttribute('aria-hidden',String(!open));
});

document.addEventListener('click',(e)=>{
  if(mega && !mega.contains(e.target) && !servicesTrigger?.contains(e.target)){
    mega.classList.remove('open'); servicesTrigger?.setAttribute('aria-expanded','false'); mega.setAttribute('aria-hidden','true');
  }
});

document.querySelectorAll('.mega-menu a').forEach(a=>a.addEventListener('click',()=>{
  mega.classList.remove('open'); servicesTrigger?.setAttribute('aria-expanded','false'); mega.setAttribute('aria-hidden','true');
}));

document.getElementById('year').textContent=new Date().getFullYear();
