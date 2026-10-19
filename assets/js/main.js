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

// Press Room client filter: sticky row of chips; picking one shows only that client's coverage
(function() {
  'use strict';
  var root = document.querySelector('[data-client-filter]');
  if (!root) return;
  var bar = root.querySelector('.cf-bar');
  var track = root.querySelector('.cf-track');
  var chips = Array.prototype.slice.call(root.querySelectorAll('.cf-chip'));
  var prev = root.querySelector('.cf-prev');
  var next = root.querySelector('.cf-next');
  var status = root.querySelector('.cf-status');
  var sentinel = document.querySelector('.cf-sentinel');
  var header = document.querySelector('.top-header');
  var list = document.querySelector('.press-clients');
  var sections = Array.prototype.slice.call(document.querySelectorAll('.press-client[id]'));
  var allStatus = status ? status.textContent : '';
  var reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  function isClient(id) { return sections.some(function(s) { return s.id === id; }); }
  function headerH() { return header ? header.offsetHeight : 80; }

  // Edge fades + arrows only where there is more to scroll in that direction
  function updateEdges() {
    var max = track.scrollWidth - track.clientWidth;
    var canPrev = track.scrollLeft > 2;
    var canNext = track.scrollLeft < max - 2;
    bar.classList.toggle('can-prev', canPrev);
    bar.classList.toggle('can-next', canNext);
    if (prev) prev.disabled = !canPrev;
    if (next) next.disabled = !canNext;
  }

  function revealChip(chip, instant) {
    var t = track.getBoundingClientRect();
    var c = chip.getBoundingClientRect();
    var left = track.scrollLeft + (c.left - t.left) - (t.width - c.width) / 2;
    track.scrollTo({ left: Math.max(0, left), behavior: instant || reduceMotion ? 'instant' : 'smooth' });
  }

  // Put the top of the shown coverage right under the header + sticky bar
  function scrollToSection(id, instant) {
    var target = id === 'all' ? sections[0] : document.getElementById(id);
    if (!target) return;
    var offset = headerH() + root.offsetHeight + 16;
    var y = target.getBoundingClientRect().top + window.scrollY - offset;
    window.scrollTo({ top: Math.max(0, y), behavior: instant || reduceMotion ? 'instant' : 'smooth' });
  }

  function setActive(id, instant) {
    chips.forEach(function(c) {
      var on = c.dataset.client === id;
      c.classList.toggle('is-active', on);
      c.setAttribute('aria-pressed', on ? 'true' : 'false');
      // Chrome runs only one programmatic smooth scroll at a time, so the chip row moves instantly
      // whenever the page itself is scrolling
      if (on) revealChip(c, instant);
    });
  }

  function applyFilter(id) {
    sections.forEach(function(s) { s.hidden = id !== 'all' && s.id !== id; });
    if (status) {
      if (id === 'all') {
        status.textContent = allStatus;
      } else {
        var sec = document.getElementById(id);
        var count = sec.querySelectorAll('.press-card').length;
        var name = sec.querySelector('.press-client-name').textContent;
        status.textContent = 'Showing ' + count + (count === 1 ? ' clip' : ' clips') + ' for ' + name;
      }
    }
  }

  // Stagger the heading + cards of what is now visible (only the first screenful gets a delay)
  function animateIn() {
    if (!list) return;
    var n = 0;
    sections.forEach(function(s) {
      if (s.hidden) return;
      s.querySelectorAll('.press-client-head, .press-card').forEach(function(el) {
        el.style.setProperty('--stagger', Math.min(n++, 5));
      });
    });
    list.classList.remove('is-entering');
    void list.offsetWidth; // restart the animation on repeat clicks
    list.classList.add('is-entering');
    clearTimeout(animateIn.t);
    animateIn.t = setTimeout(function() { list.classList.remove('is-entering'); }, 1000);
  }

  var current = 'all';
  var swapTimer = null;
  function scrollToList(instant) {
    var offset = headerH() + root.offsetHeight + 16;
    var y = list.getBoundingClientRect().top + window.scrollY - offset;
    window.scrollTo({ top: Math.max(0, y), behavior: instant || reduceMotion ? 'instant' : 'smooth' });
  }

  function select(id, opts) {
    opts = opts || {};
    if (id !== 'all' && !isClient(id)) id = 'all';
    var animate = !opts.instant && !reduceMotion && list;
    setActive(id, opts.instant || opts.scroll);
    if (id === current && animate) {
      if (opts.scroll) scrollToList(false);
      return;
    }

    if (!animate) {
      clearTimeout(swapTimer);
      list && list.classList.remove('is-leaving');
      applyFilter(id);
      current = id;
      if (opts.scroll) scrollToSection(id, true);
      return;
    }

    // Whatever is selected ends up first in the list, so the scroll target (top of the list) is
    // known before the swap: fade out and scroll at the same time, then swap and animate in.
    current = id;
    clearTimeout(swapTimer);
    list.classList.remove('is-entering');
    list.classList.add('is-leaving');
    if (opts.scroll) scrollToList(false);
    swapTimer = setTimeout(function() {
      applyFilter(id);
      list.classList.remove('is-leaving');
      animateIn();
    }, 190);
  }

  chips.forEach(function(c) {
    c.addEventListener('click', function() {
      var id = c.dataset.client;
      history.replaceState(null, '', id === 'all' ? '#coverage' : '#' + id);
      select(id, { scroll: true });
    });
  });

  function page(dir) {
    track.scrollBy({ left: dir * track.clientWidth * 0.8, behavior: reduceMotion ? 'instant' : 'smooth' });
  }
  if (prev) prev.addEventListener('click', function() { page(-1); });
  if (next) next.addEventListener('click', function() { page(1); });
  track.addEventListener('scroll', updateEdges, { passive: true });
  window.addEventListener('resize', updateEdges);
  window.addEventListener('load', updateEdges);
  if (document.fonts && document.fonts.ready) document.fonts.ready.then(updateEdges);
  if ('ResizeObserver' in window) new ResizeObserver(updateEdges).observe(track);
  updateEdges();

  // Shadow under the bar once it is stuck below the header
  if (sentinel && 'IntersectionObserver' in window) {
    new IntersectionObserver(function(entries) {
      var e = entries[0];
      root.classList.toggle('is-stuck', !e.isIntersecting && e.boundingClientRect.top < headerH() + 1);
    }, { rootMargin: '-' + (headerH() + 1) + 'px 0px 0px 0px' }).observe(sentinel);
  }

  // Deep links such as #moli, plus in-page links to a client (e.g. "Sarah I. Bamford" in the about section)
  function fromHash(instant) {
    var id = decodeURIComponent(location.hash.slice(1));
    if (isClient(id)) select(id, { scroll: true, instant: instant });
  }
  window.addEventListener('hashchange', function() { fromHash(false); });
  if (isClient(decodeURIComponent(location.hash.slice(1)))) {
    if ('scrollRestoration' in history) history.scrollRestoration = 'manual';
    window.addEventListener('load', function() { fromHash(true); });
    fromHash(true);
  }
  document.addEventListener('click', function(e) {
    var a = e.target.closest && e.target.closest('a[href^="#"]');
    if (!a) return;
    var id = a.getAttribute('href').slice(1);
    if (isClient(id)) {
      e.preventDefault();
      history.replaceState(null, '', '#' + id);
      select(id, { scroll: true });
    }
  });
})();

// Fade clipping previews in once loaded (CSS hides them only when the .js class is present)
(function() {
  'use strict';
  document.querySelectorAll('.press-pdf img').forEach(function(img) {
    function done() { img.classList.add('is-loaded'); }
    if (img.complete && img.naturalWidth) done();
    else {
      img.addEventListener('load', done, { once: true });
      img.addEventListener('error', done, { once: true });
    }
  });
  // Safety net: never leave a preview hidden if its load event is missed or very slow
  window.addEventListener('load', function() {
    setTimeout(function() {
      document.querySelectorAll('.press-pdf img:not(.is-loaded)').forEach(function(img) { img.classList.add('is-loaded'); });
    }, 4000);
  });
})();
