document.addEventListener('DOMContentLoaded', () => {

  /* Fade-in sections on scroll */
  const sections = document.querySelectorAll('.section, .hero');
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.08 });

  sections.forEach(s => {
    s.classList.add('fade-section');
    observer.observe(s);
  });

  /* Lightbox for screen images */
  const overlay = document.createElement('div');
  overlay.id = 'lightbox';
  overlay.innerHTML = `
    <div id="lb-inner">
      <button id="lb-close">&#x2715;</button>
      <img id="lb-img" src="" alt="" />
      <p id="lb-caption"></p>
    </div>`;
  document.body.appendChild(overlay);

  const lbImg     = document.getElementById('lb-img');
  const lbCaption = document.getElementById('lb-caption');
  const lbClose   = document.getElementById('lb-close');

  document.querySelectorAll('.screen-img img, .screen-img-pair img').forEach(img => {
    img.style.cursor = 'zoom-in';
    img.addEventListener('click', () => {
      lbImg.src = img.src;
      lbImg.alt = img.alt;
      lbCaption.textContent = img.closest('.screen-step > div')
        ?.querySelector('.screen-caption')?.textContent || '';
      overlay.classList.add('open');
      document.body.style.overflow = 'hidden';
    });
  });

  const closeLb = () => {
    overlay.classList.remove('open');
    document.body.style.overflow = '';
  };
  lbClose.addEventListener('click', closeLb);
  overlay.addEventListener('click', e => { if (e.target === overlay) closeLb(); });
  document.addEventListener('keydown', e => { if (e.key === 'Escape') closeLb(); });

});