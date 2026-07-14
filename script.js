document.addEventListener('DOMContentLoaded', () => {
  const menuToggle = document.getElementById('menuToggle');
  const mobileMenu = document.getElementById('mobileMenu');
  const menuIcon = document.getElementById('menuIcon');
  const closeIcon = document.getElementById('closeIcon');
  const mobileLinks = document.querySelectorAll('.mobile-link, .mobile-cta');

  function toggleMenu() {
    const open = mobileMenu.classList.toggle('open');
    menuIcon.classList.toggle('hidden', open);
    closeIcon.classList.toggle('hidden', !open);
  }

  menuToggle.addEventListener('click', toggleMenu);
  mobileLinks.forEach(link => link.addEventListener('click', () => {
    if (mobileMenu.classList.contains('open')) toggleMenu();
  }));

  // Carousel
  const carousel = document.getElementById('carousel');
  const prevBtn = document.getElementById('prevBtn');
  const nextBtn = document.getElementById('nextBtn');

  function scrollCarousel(dir) {
    const amount = carousel.clientWidth * 0.8;
    carousel.scrollBy({ left: dir === 'left' ? -amount : amount, behavior: 'smooth' });
  }

  prevBtn.addEventListener('click', () => scrollCarousel('left'));
  nextBtn.addEventListener('click', () => scrollCarousel('right'));

  // Touch swipe support
  let startX = 0;
  let isDown = false;

  carousel.addEventListener('touchstart', (e) => {
    isDown = true;
    startX = e.touches[0].clientX;
  }, { passive: true });

  carousel.addEventListener('touchend', (e) => {
    if (!isDown) return;
    isDown = false;
    const endX = e.changedTouches[0].clientX;
    const diff = startX - endX;
    if (Math.abs(diff) > 50) {
      scrollCarousel(diff > 0 ? 'right' : 'left');
    }
  }, { passive: true });

  // Lightbox
  const lightbox = document.getElementById('lightbox');
  const lightboxImg = document.getElementById('lightboxImg');
  const lightboxClose = document.querySelector('.lightbox-close');
  const cards = document.querySelectorAll('.card');

  cards.forEach(card => {
    card.addEventListener('click', () => {
      const img = card.querySelector('img');
      lightboxImg.src = img.src;
      lightboxImg.alt = img.alt;
      lightbox.classList.add('open');
      document.body.style.overflow = 'hidden';
    });
  });

  function closeLightbox() {
    lightbox.classList.remove('open');
    document.body.style.overflow = '';
  }

  lightboxClose.addEventListener('click', closeLightbox);
  lightbox.addEventListener('click', (e) => {
    if (e.target === lightbox) closeLightbox();
  });
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && lightbox.classList.contains('open')) closeLightbox();
  });

  // Scroll reveal
  const revealElements = document.querySelectorAll('.section > .container, .hero-content, .card');
  revealElements.forEach(el => el.classList.add('reveal'));

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1, rootMargin: '-80px' });

  revealElements.forEach(el => observer.observe(el));
});
