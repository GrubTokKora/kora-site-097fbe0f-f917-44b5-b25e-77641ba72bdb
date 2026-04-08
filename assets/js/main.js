// Hybrid Media - Top Header Navigation JavaScript
(function() {
  'use strict';

  // Mobile Menu Toggle
  const menuToggle = document.getElementById('menu-toggle');
  const headerNav = document.getElementById('header-nav');
  
  if (menuToggle && headerNav) {
    menuToggle.addEventListener('click', function() {
      this.classList.toggle('active');
      headerNav.classList.toggle('active');
    });
  }

  // Quote Carousel
  const slides = document.querySelectorAll('.quote-slide');
  const dots = document.querySelectorAll('.quote-dots button');
  const prevBtn = document.querySelector('.quote-nav-btn.prev');
  const nextBtn = document.querySelector('.quote-nav-btn.next');
  
  if (slides.length > 0) {
    let currentSlide = 0;
    let slideInterval;

    function showSlide(index) {
      slides.forEach((slide, i) => {
        slide.classList.toggle('active', i === index);
      });
      if (dots.length > 0) {
        dots.forEach((dot, i) => {
          dot.classList.toggle('active', i === index);
        });
      }
      currentSlide = index;
    }

    function nextSlide() {
      showSlide((currentSlide + 1) % slides.length);
    }

    function prevSlide() {
      showSlide((currentSlide - 1 + slides.length) % slides.length);
    }

    function startSlideshow() {
      slideInterval = setInterval(nextSlide, 6000);
    }

    function stopSlideshow() {
      clearInterval(slideInterval);
    }

    if (prevBtn) prevBtn.addEventListener('click', () => { prevSlide(); stopSlideshow(); startSlideshow(); });
    if (nextBtn) nextBtn.addEventListener('click', () => { nextSlide(); stopSlideshow(); startSlideshow(); });
    
    dots.forEach((dot, index) => {
      dot.addEventListener('click', () => {
        showSlide(index);
        stopSlideshow();
        startSlideshow();
      });
    });

    startSlideshow();
  }

  // Press Tabs
  const pressTabs = document.querySelectorAll('.press-tab');
  const pressPanels = document.querySelectorAll('.press-panel');

  pressTabs.forEach(tab => {
    tab.addEventListener('click', () => {
      const target = tab.dataset.pressTab;
      
      pressTabs.forEach(t => t.classList.remove('active'));
      tab.classList.add('active');
      
      pressPanels.forEach(panel => {
        if (panel.dataset.pressPanel === target) {
          panel.classList.add('active');
        } else {
          panel.classList.remove('active');
        }
      });
    });
  });

  // Lightbox
  const lightbox = document.getElementById('lightbox');
  const lightboxImg = lightbox ? lightbox.querySelector('img') : null;
  const lightboxClose = lightbox ? lightbox.querySelector('.lightbox-close') : null;
  const lightboxTriggers = document.querySelectorAll('[data-lightbox]');

  function openLightbox(src, alt) {
    if (!lightbox || !lightboxImg) return;
    lightboxImg.src = src;
    lightboxImg.alt = alt || '';
    lightbox.classList.add('active');
    document.body.style.overflow = 'hidden';
  }

  function closeLightboxFunc() {
    if (!lightbox) return;
    lightbox.classList.remove('active');
    document.body.style.overflow = '';
  }

  lightboxTriggers.forEach(trigger => {
    trigger.addEventListener('click', (e) => {
      e.preventDefault();
      const img = trigger.querySelector('img');
      openLightbox(trigger.getAttribute('href'), img ? img.alt : '');
    });
  });

  if (lightboxClose) {
    lightboxClose.addEventListener('click', closeLightboxFunc);
  }

  if (lightbox) {
    lightbox.addEventListener('click', (e) => {
      if (e.target === lightbox) closeLightboxFunc();
    });
  }

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') closeLightboxFunc();
  });

  // Form Handling
  const forms = document.querySelectorAll('form[data-demo-form]');
  const toast = document.getElementById('toast');

  function showToast(message) {
    if (!toast) return;
    toast.textContent = message;
    toast.classList.add('show');
    setTimeout(() => {
      toast.classList.remove('show');
    }, 4000);
  }

  forms.forEach(form => {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      showToast('Thank you — this is a static preview; connect a form backend to send messages.');
      form.reset();
    });
  });

  console.log('Hybrid Media - Top Header Theme Loaded');
})();
