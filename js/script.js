'use strict';
// No framework, remote font, analytics or CDN is required.
const $ = (selector, root = document) => root.querySelector(selector);
const $$ = (selector, root = document) => [...root.querySelectorAll(selector)];
const header = $('.site-header');
const nav = $('#site-nav');
const menu = $('.menu');
const backdrop = $('.nav-backdrop');
function setMenu(open, restoreFocus = true) {
  nav.classList.toggle('open', open);
  menu.setAttribute('aria-expanded', String(open));
  backdrop.hidden = !open;
  document.body.classList.toggle('nav-open', open);
  $('#main').inert = open;
  const footer = $('footer');
  if (footer) footer.inert = open;
  header.classList.remove('header-hidden');
  if (open) $('.nav-close').focus();
  else if (restoreFocus) menu.focus();
}
menu.addEventListener('click', () => setMenu(!nav.classList.contains('open')));
$('.nav-close').addEventListener('click', () => setMenu(false));
backdrop.addEventListener('click', () => setMenu(false));
nav.addEventListener('click', event => { if (event.target.closest('a')) setMenu(false, false); });
document.addEventListener('keydown', event => {
  if (event.key === 'Escape') setMenu(false, false);
  if (event.key !== 'Tab' || !nav.classList.contains('open')) return;
  const focusable = $$('button,a[href]', nav);
  const first = focusable[0], last = focusable[focusable.length - 1];
  if (event.shiftKey && document.activeElement === first) { event.preventDefault(); last.focus(); }
  else if (!event.shiftKey && document.activeElement === last) { event.preventDefault(); first.focus(); }
});
window.addEventListener('resize', () => { if (window.innerWidth > 760) setMenu(false, false); });

// Keep the original template's gently disappearing top layer without reflow.
let previousY = Math.max(0, window.scrollY || 0), travel = 0, direction = 0, pending = false;
function resetHeader() { previousY = Math.max(0, window.scrollY || 0); travel = 0; direction = 0; header.classList.remove('header-hidden'); }
function updateHeader() {
  pending = false;
  const maxY = Math.max(0, document.documentElement.scrollHeight - window.innerHeight);
  const y = Math.min(Math.max(0, window.scrollY), maxY);
  const delta = y - previousY;
  previousY = y;
  $('.back-top').hidden = y < 350;
  if (y < Math.max(320, window.innerHeight * .75, header.offsetHeight * 2) || document.body.classList.contains('nav-open') || $('dialog[open]')) {
    travel = 0; direction = 0; header.classList.remove('header-hidden'); return;
  }
  if (Math.abs(delta) < 1) return;
  const next = Math.sign(delta);
  if (next !== direction) { travel = 0; direction = next; }
  travel += Math.abs(delta);
  if (direction > 0 && travel >= 24) header.classList.add('header-hidden');
  else if (direction < 0 && travel >= 14) header.classList.remove('header-hidden');
}
window.addEventListener('scroll', () => {
  if (pending) return;
  pending = true;
  window.requestAnimationFrame(updateHeader);
}, { passive: true });
window.addEventListener('pageshow', resetHeader);
window.addEventListener('resize', resetHeader);
window.addEventListener('hashchange', resetHeader);
header.addEventListener('focusin', () => header.classList.remove('header-hidden'));
$('.back-top').addEventListener('click', () => {
  const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  window.scrollTo({ top: 0, behavior: reduced ? 'instant' : 'smooth' });
});

// All people and projects remain visible without JavaScript.
const imageDialog = $('.image-dialog');
$$('[data-image]').forEach(button => button.addEventListener('click', () => {
  const img = $('img', button);
  $('img', imageDialog).src = button.dataset.image;
  $('img', imageDialog).alt = img.alt;
  $('p', imageDialog).textContent = img.alt;
  imageDialog.showModal();
}));
$('.image-close').addEventListener('click', () => imageDialog.close());
imageDialog.addEventListener('click', event => {
  if (event.target !== imageDialog) return;
  const r = imageDialog.getBoundingClientRect();
  if (event.clientX < r.left || event.clientX > r.right || event.clientY < r.top || event.clientY > r.bottom) imageDialog.close();
});

// Reveal editorial sections only when observation is supported. Default is visible.
if ('IntersectionObserver' in window) {
  document.documentElement.classList.add('js');
  const observer = new IntersectionObserver(entries => entries.forEach(entry => {
    if (entry.isIntersecting) { entry.target.classList.add('is-visible'); observer.unobserve(entry.target); }
  }), { threshold: .08 });
  $$('.about-section,.geographic-section,.join-section,.future-grid,.people-group,.work,.opening,body[data-page=index] .home-overview>div:first-child,body[data-page=index] .lab-overview-lead,body[data-page=index] .lab-dimension,body[data-page=index] .news-section>.wrap,body[data-page=index] .lab-gallery,body[data-page=index] .home-join>.wrap').forEach(section => {
    section.dataset.reveal = '';
    observer.observe(section);
  });
}

// Replace the local placeholder images with real group photographs when available.
const carousel = $('.activity-carousel');
if (carousel) {
  const slides = $$('.activity-slide', carousel), dots = $$('[data-slide]', carousel);
  let index = 0, paused = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  let hovering = false, focused = false;
  const pauseButton = $('.activity-pause', carousel);
  function syncPause() { pauseButton.textContent = paused ? 'Play' : 'Pause'; pauseButton.setAttribute('aria-pressed', String(paused)); pauseButton.setAttribute('aria-label', paused ? 'Play slideshow' : 'Pause slideshow'); }
  function show(next, announce = false) {
    index = (next + slides.length) % slides.length;
    slides.forEach((slide, i) => { slide.hidden = i !== index; });
    dots.forEach((dot, i) => dot.setAttribute('aria-pressed', String(i === index)));
    if (announce) $('.activity-status', carousel).textContent = `Photograph ${index + 1} of ${slides.length}`;
  }
  $('.activity-prev', carousel).addEventListener('click', () => show(index - 1, true));
  $('.activity-next', carousel).addEventListener('click', () => show(index + 1, true));
  dots.forEach(dot => dot.addEventListener('click', () => show(Number(dot.dataset.slide), true)));
  pauseButton.addEventListener('click', () => { paused = !paused; syncPause(); });
  carousel.addEventListener('mouseenter', () => { hovering = true; });
  carousel.addEventListener('mouseleave', () => { hovering = false; });
  carousel.addEventListener('focusin', () => { focused = true; });
  carousel.addEventListener('focusout', event => { focused = carousel.contains(event.relatedTarget); });
  carousel.addEventListener('keydown', event => {
    if (event.key === 'ArrowLeft') { event.preventDefault(); show(index - 1, true); }
    if (event.key === 'ArrowRight') { event.preventDefault(); show(index + 1, true); }
  });
  let touchStart = null;
  carousel.addEventListener('touchstart', event => { touchStart = event.touches[0]?.clientX ?? null; }, { passive: true });
  carousel.addEventListener('touchend', event => {
    const end = event.changedTouches[0]?.clientX;
    if (touchStart !== null && end !== undefined && Math.abs(end - touchStart) > 50) show(index + (end < touchStart ? 1 : -1), true);
    touchStart = null;
  }, { passive: true });
  window.setInterval(() => { if (!paused && !hovering && !focused && !document.hidden) show(index + 1); }, 6000);
  syncPause();
}
