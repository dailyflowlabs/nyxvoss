/**
 * NYX VOSS — Main Interactive App Script
 */

(function () {
  'use strict';

  // Navigation scroll styling
  const nav = document.querySelector('.site-nav');
  const mobileToggle = document.querySelector('.mobile-menu-toggle');

  window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
      nav.classList.add('scrolled');
    } else {
      nav.classList.remove('scrolled');
    }
  });

  if (mobileToggle) {
    mobileToggle.addEventListener('click', () => {
      nav.classList.toggle('mobile-open');
    });
  }

  // Smooth scroll links
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      const targetId = this.getAttribute('href');
      if (targetId === '#') return;
      const targetEl = document.querySelector(targetId);
      if (targetEl) {
        e.preventDefault();
        nav.classList.remove('mobile-open');
        targetEl.scrollIntoView({
          behavior: 'smooth',
          block: 'start'
        });
      }
    });
  });

  // Copy booking email
  const copyBtn = document.getElementById('copyEmailBtn');
  if (copyBtn) {
    copyBtn.addEventListener('click', () => {
      const email = 'contact@nyxvoss.com';
      navigator.clipboard.writeText(email).then(() => {
        const originalText = copyBtn.innerHTML;
        copyBtn.innerHTML = `
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <polyline points="20 6 9 17 4 12"></polyline>
          </svg>
          Copied to clipboard
        `;
        copyBtn.style.color = 'var(--crimson-bright)';
        setTimeout(() => {
          copyBtn.innerHTML = originalText;
          copyBtn.style.color = '';
        }, 2500);
      });
    });
  }

  // Hero Quick Actions
  const heroListenBtn = document.getElementById('heroListenBtn');
  if (heroListenBtn) {
    heroListenBtn.addEventListener('click', (e) => {
      e.preventDefault();
      const tracksSection = document.getElementById('music');
      if (tracksSection) {
        tracksSection.scrollIntoView({ behavior: 'smooth' });
        setTimeout(() => {
          if (window.NyxAudio) {
            window.NyxAudio.playCurrent();
          }
        }, 600);
      }
    });
  }

  const heroWatchBtn = document.getElementById('heroWatchBtn');
  if (heroWatchBtn) {
    heroWatchBtn.addEventListener('click', (e) => {
      e.preventDefault();
      if (window.NyxVideoModal) {
        window.NyxVideoModal.open(
          'videos/nyx_voss_dont_look_soft_teaser_15s.mp4',
          "Don't Look Soft — Official Teaser Trailer",
          "NYX VOSS • Debut Gothic Single Visualizer",
          false
        );
      }
    });
  }
})();
