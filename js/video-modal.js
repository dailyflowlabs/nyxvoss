/**
 * NYX VOSS — Custom Video Modal & Dialog Controller
 * Adheres strictly to custom accessible HTML5 modal standards (No standard JS alerts/confirms)
 */

(function () {
  'use strict';

  const modal = document.getElementById('videoModal');
  const modalVideo = document.getElementById('modalVideo');
  const modalTitle = document.getElementById('modalVideoTitle');
  const modalDesc = document.getElementById('modalVideoDesc');
  const modalCloseBtn = document.getElementById('modalCloseBtn');
  const modalContainer = document.getElementById('modalVideoContainer');

  const lyricsModal = document.getElementById('lyricsModal');
  const lyricsCloseBtn = document.getElementById('lyricsCloseBtn');

  function openVideo(videoSrc, title, desc, isVertical = false) {
    if (!modal || !modalVideo) return;

    modalVideo.src = videoSrc;
    if (modalTitle) modalTitle.textContent = title || 'NYX VOSS';
    if (modalDesc) modalDesc.textContent = desc || '';

    if (modalContainer) {
      if (isVertical) {
        modalContainer.classList.add('vertical-video');
      } else {
        modalContainer.classList.remove('vertical-video');
      }
    }

    modal.showModal();
    modalVideo.play().catch(e => console.log('Autoplay blocked:', e));
  }

  function closeVideo() {
    if (!modal) return;
    if (modalVideo) {
      modalVideo.pause();
      modalVideo.removeAttribute('src');
      modalVideo.load();
    }
    modal.close();
  }

  function openLyrics() {
    if (window.NyxAudio && typeof window.NyxAudio.updateLyricsModal === 'function') {
      window.NyxAudio.updateLyricsModal();
    }
    if (lyricsModal) {
      lyricsModal.showModal();
    }
  }

  function closeLyrics() {
    if (lyricsModal) {
      lyricsModal.close();
    }
  }

  // Event Listeners
  if (modalCloseBtn) {
    modalCloseBtn.addEventListener('click', closeVideo);
  }

  if (modal) {
    modal.addEventListener('click', (e) => {
      // Close when clicking outside modal-inner
      const rect = modal.getBoundingClientRect();
      const isInDialog = (
        rect.top <= e.clientY &&
        e.clientY <= rect.top + rect.height &&
        rect.left <= e.clientX &&
        e.clientX <= rect.left + rect.width
      );
      if (!isInDialog || e.target === modal) {
        closeVideo();
      }
    });

    modal.addEventListener('cancel', (e) => {
      e.preventDefault();
      closeVideo();
    });
  }

  if (lyricsCloseBtn) {
    lyricsCloseBtn.addEventListener('click', closeLyrics);
  }

  if (lyricsModal) {
    lyricsModal.addEventListener('click', (e) => {
      if (e.target === lyricsModal) {
        closeLyrics();
      }
    });
  }

  // Setup click triggers on cards with data-video attributes
  document.addEventListener('DOMContentLoaded', () => {
    // Video triggers
    const triggers = document.querySelectorAll('[data-video-src]');
    triggers.forEach(el => {
      el.addEventListener('click', () => {
        const src = el.getAttribute('data-video-src');
        const title = el.getAttribute('data-video-title');
        const desc = el.getAttribute('data-video-desc');
        const isVertical = el.getAttribute('data-vertical') === 'true';
        openVideo(src, title, desc, isVertical);
      });
    });

    // Lyrics triggers
    const lyricsTriggers = document.querySelectorAll('[data-action="open-lyrics"]');
    lyricsTriggers.forEach(el => {
      el.addEventListener('click', (e) => {
        e.preventDefault();
        openLyrics();
      });
    });
  });

  window.NyxVideoModal = {
    open: openVideo,
    close: closeVideo,
    openLyrics: openLyrics,
    closeLyrics: closeLyrics
  };
})();
