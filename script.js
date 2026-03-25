/* =====================================================
   Through the Lens — Photography Portfolio
   script.js
   ===================================================== */

(function () {
  'use strict';

  // ── DOM references ────────────────────────────────
  const overlay    = document.getElementById('viewfinder-overlay');
  const shutterBtn = document.getElementById('shutterBtn');
  const iris       = document.getElementById('iris');
  const mainContent = document.getElementById('mainContent');
  const vfHint     = document.getElementById('vfHint');
  const siteNav    = document.getElementById('siteNav');
  const hamburger  = document.getElementById('hamburger');
  const navLinks   = document.querySelector('.nav-links');

  // ── Shutter / open sequence ───────────────────────
  function openCamera () {
    // 1. Disable repeated clicks
    shutterBtn.style.pointerEvents = 'none';

    // 2. Shutter-click flash
    const flash = document.createElement('div');
    flash.className = 'shutter-flash';
    document.body.appendChild(flash);
    flash.addEventListener('animationend', () => flash.remove());

    // 3. Hide hint
    if (vfHint) vfHint.style.opacity = '0';

    // 4. Open iris blades after a short delay
    setTimeout(() => {
      iris.classList.add('iris-open');
    }, 200);

    // 5. Show main content under the iris while it opens
    setTimeout(() => {
      mainContent.classList.remove('hidden');
    }, 600);

    // 6. Fade out the overlay
    setTimeout(() => {
      overlay.classList.add('fade-out');
    }, 1200);

    // 7. Fully remove overlay from DOM flow after transition
    setTimeout(() => {
      overlay.style.display = 'none';
      // Trigger hero reveal animations
      triggerHeroReveal();
    }, 2100);
  }

  // Allow keyboard activation on shutter button
  shutterBtn.addEventListener('click', openCamera);
  shutterBtn.addEventListener('keydown', function (e) {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      openCamera();
    }
  });

  // ── Hero reveal ───────────────────────────────────
  function triggerHeroReveal () {
    const heroEls = document.querySelectorAll('.hero .reveal-up');
    heroEls.forEach(el => el.classList.add('in-view'));
  }

  // ── Navbar scroll behaviour ───────────────────────
  window.addEventListener('scroll', function () {
    if (window.scrollY > 60) {
      siteNav.classList.add('scrolled');
    } else {
      siteNav.classList.remove('scrolled');
    }
  }, { passive: true });

  // ── Mobile hamburger ──────────────────────────────
  hamburger.addEventListener('click', function () {
    navLinks.classList.toggle('nav-open');
  });

  // ── Scroll reveal (IntersectionObserver) ─────────
  const revealObserver = new IntersectionObserver(
    function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('in-view');
          revealObserver.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.12, rootMargin: '0px 0px -60px 0px' }
  );

  function observeRevealElements () {
    document.querySelectorAll('.reveal-up, .reveal-card').forEach(function (el) {
      revealObserver.observe(el);
    });
  }

  // Start observing after overlay is cleared so hero
  // elements are handled separately in triggerHeroReveal.
  setTimeout(observeRevealElements, 2200);

  // ── Nav mobile open styles (inject once) ─────────
  // (styles live in styles.css as .nav-links.nav-open)

})();
