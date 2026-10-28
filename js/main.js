/**
 * National Mobile - Main Application Controller
 * Handles Intro Video, Scroll Spy, Mobile Navigation, and Interactive UX
 */
(function() {
  // 1. Introduction Video Controller
  function setupIntroVideo() {
    const overlay = document.getElementById('intro-overlay');
    const video = document.getElementById('intro-video');
    const skipBtn = document.getElementById('btn-skip-intro');
    const progressBar = document.getElementById('intro-progress-bar');
    const replayBtn = document.getElementById('btn-replay-intro');

    if (!overlay || !video) return;

    let dismissed = false;

    function dismissIntro() {
      if (dismissed) return;
      dismissed = true;
      overlay.classList.add('fade-out');
      video.pause();
      document.body.style.overflow = '';
      setTimeout(() => {
        overlay.style.display = 'none';
      }, 800);
    }

    function startIntro() {
      dismissed = false;
      overlay.style.display = 'flex';
      overlay.classList.remove('fade-out');
      document.body.style.overflow = 'hidden';
      video.currentTime = 0;
      
      const playPromise = video.play();
      if (playPromise !== undefined) {
        playPromise.catch(err => {
          console.warn('Autoplay prevented by browser policy:', err);
          // If browser strictly blocks autoplay, allow user to click or skip
        });
      }
    }

    // Video events
    video.addEventListener('timeupdate', () => {
      if (video.duration) {
        const percent = (video.currentTime / video.duration) * 100;
        if (progressBar) progressBar.style.width = `${percent}%`;
      }
    });

    video.addEventListener('ended', dismissIntro);

    if (skipBtn) {
      skipBtn.addEventListener('click', dismissIntro);
    }

    if (replayBtn) {
      replayBtn.addEventListener('click', (e) => {
        e.preventDefault();
        startIntro();
      });
    }

    // Auto dismiss safety fallback if video fails to load or stalls
    setTimeout(() => {
      if (!dismissed && video.paused && video.currentTime === 0) {
        // Still give user a moment, or auto dismiss after 6 seconds if completely stuck
      }
    }, 6000);

    // Start on page load
    startIntro();
  }

  // 2. Mobile Offcanvas Sheet Navigation
  function setupMobileMenu() {
    const hamburger = document.getElementById('hamburger-btn');
    const sheet = document.getElementById('mobile-sheet');
    const navLinks = document.querySelectorAll('.mobile-nav-link');

    if (!hamburger || !sheet) return;

    function toggleMenu() {
      const isOpen = sheet.classList.contains('open');
      if (isOpen) {
        sheet.classList.remove('open');
        hamburger.setAttribute('aria-expanded', 'false');
        document.body.style.overflow = '';
      } else {
        sheet.classList.add('open');
        hamburger.setAttribute('aria-expanded', 'true');
        document.body.style.overflow = 'hidden';
      }
    }

    hamburger.addEventListener('click', toggleMenu);

    navLinks.forEach(link => {
      link.addEventListener('click', () => {
        sheet.classList.remove('open');
        hamburger.setAttribute('aria-expanded', 'false');
        document.body.style.overflow = '';
      });
    });
  }

  // 3. Scroll Spy for Active Navigation Links
  function setupScrollSpy() {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-link');

    if (!sections.length || !navLinks.length) return;

    window.addEventListener('scroll', () => {
      let currentSection = '';
      const scrollPos = window.pageYOffset + 120;

      sections.forEach(section => {
        const top = section.offsetTop;
        const height = section.offsetHeight;
        if (scrollPos >= top && scrollPos < top + height) {
          currentSection = section.getAttribute('id');
        }
      });

      navLinks.forEach(link => {
        link.classList.remove('active');
        const href = link.getAttribute('href');
        if (href === `#${currentSection}`) {
          link.classList.add('active');
        }
      });
    }, { passive: true });
  }

  // 4. Smooth Anchor Link Handling with navbar offset
  function setupSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
      anchor.addEventListener('click', function(e) {
        const targetId = this.getAttribute('href');
        if (targetId === '#' || targetId === '') return;

        const targetEl = document.querySelector(targetId);
        if (targetEl) {
          e.preventDefault();
          const navHeader = document.getElementById('site-header');
          const navHeight = navHeader ? navHeader.offsetHeight : 72;
          const elementPosition = targetEl.getBoundingClientRect().top;
          const offsetPosition = elementPosition + window.pageYOffset - navHeight;

          window.scrollTo({
            top: offsetPosition,
            behavior: 'smooth'
          });
        }
      });
    });
  }

  window.addEventListener('DOMContentLoaded', () => {
    setupIntroVideo();
    setupMobileMenu();
    setupScrollSpy();
    setupSmoothScroll();
  });
})();
