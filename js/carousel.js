/**
 * NYX VOSS — Hero Video Carousel Controller
 * Seamlessly manages full-length cinematic video slides at the top of the site.
 */

(function () {
  'use strict';

  let currentSlide = 0;
  let autoAdvanceTimer = null;

  function initCarousel() {
    const slides = document.querySelectorAll('.carousel-slide');
    const prevBtn = document.getElementById('carouselPrevBtn');
    const nextBtn = document.getElementById('carouselNextBtn');
    const indicatorsContainer = document.getElementById('carouselIndicators');

    if (!slides.length) return;

    // Render indicators
    if (indicatorsContainer) {
      indicatorsContainer.innerHTML = '';
      slides.forEach((_, idx) => {
        const ind = document.createElement('button');
        ind.className = `carousel-indicator ${idx === 0 ? 'active' : ''}`;
        ind.setAttribute('aria-label', `Go to slide ${idx + 1}`);
        ind.addEventListener('click', () => goToSlide(idx));
        indicatorsContainer.appendChild(ind);
      });
    }

    function goToSlide(index) {
      slides[currentSlide].classList.remove('active');
      const prevVideo = slides[currentSlide].querySelector('video');
      if (prevVideo) prevVideo.pause();

      currentSlide = (index + slides.length) % slides.length;

      slides[currentSlide].classList.add('active');
      const activeVideo = slides[currentSlide].querySelector('video');
      if (activeVideo) {
        activeVideo.play().catch(() => {});
      }

      // Update indicators
      if (indicatorsContainer) {
        const dots = indicatorsContainer.querySelectorAll('.carousel-indicator');
        dots.forEach((d, i) => {
          if (i === currentSlide) d.classList.add('active');
          else d.classList.remove('active');
        });
      }

      resetTimer();
    }

    function nextSlide() {
      goToSlide(currentSlide + 1);
    }

    function prevSlide() {
      goToSlide(currentSlide - 1);
    }

    function resetTimer() {
      if (autoAdvanceTimer) clearInterval(autoAdvanceTimer);
      // Auto advance every 10s if not playing full modal
      autoAdvanceTimer = setInterval(nextSlide, 10000);
    }

    if (prevBtn) prevBtn.addEventListener('click', prevSlide);
    if (nextBtn) nextBtn.addEventListener('click', nextSlide);

    // Pause on hover
    const carouselSection = document.querySelector('.hero-carousel-section');
    if (carouselSection) {
      carouselSection.addEventListener('mouseenter', () => {
        if (autoAdvanceTimer) clearInterval(autoAdvanceTimer);
      });
      carouselSection.addEventListener('mouseleave', resetTimer);
    }

    resetTimer();
  }

  document.addEventListener('DOMContentLoaded', initCarousel);

  window.NyxCarousel = {
    next: function () {
      const slides = document.querySelectorAll('.carousel-slide');
      if (slides.length) goToSlide((currentSlide + 1) % slides.length);
    }
  };
})();
