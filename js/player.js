/**
 * NYX VOSS — Custom Gothic Audio Engine
 * Pure HTML5 Audio + Web Audio API Visualizer
 */

(function () {
  'use strict';

  const tracks = [
    {
      id: 'dont-look-soft',
      title: "Don't Look Soft",
      subtitle: 'Single',
      tag: 'Official Single',
      src: "music/dont_look_soft.mp3",
      artwork: "images/nyx-closeup-intense.jpg"
    },
    {
      id: 'you-like-me-better-mean',
      title: "You Like Me Better Mean",
      subtitle: 'Single',
      tag: 'Official Single',
      src: "music/you_like_me_better_mean.mp3",
      artwork: "images/nyx-stage-belting-unobstructed.jpg"
    }
  ];

  let currentTrackIndex = 0;
  let isPlaying = false;
  let isLooping = false;
  let audio = new Audio();
  audio.preload = 'metadata';

  // DOM elements
  const playPauseBtn = document.getElementById('playPauseBtn');
  const prevBtn = document.getElementById('prevTrackBtn');
  const nextBtn = document.getElementById('nextTrackBtn');
  const loopBtn = document.getElementById('loopTrackBtn');
  const scrubberTrack = document.getElementById('scrubberTrack');
  const scrubberFill = document.getElementById('scrubberFill');
  const currentTimeEl = document.getElementById('currentTime');
  const totalDurationEl = document.getElementById('totalDuration');
  const volumeSlider = document.getElementById('volumeSlider');
  const trackTitleEl = document.getElementById('playerTrackTitle');
  const trackArtistEl = document.getElementById('playerTrackArtist');
  const playerArtImg = document.getElementById('playerArtImg');
  const playingBadge = document.getElementById('playingBadge');
  const playlistContainer = document.getElementById('playlistContainer');
  const visualizerCanvas = document.getElementById('visualizerCanvas');

  // Web Audio visualizer setup
  let audioCtx = null;
  let analyser = null;
  let sourceNode = null;
  let canvasCtx = null;
  let animationFrameId = null;

  function initAudioContext() {
    if (audioCtx) return;
    try {
      const AudioContext = window.AudioContext || window.webkitAudioContext;
      audioCtx = new AudioContext();
      analyser = audioCtx.createAnalyser();
      analyser.fftSize = 64;
      sourceNode = audioCtx.createMediaElementSource(audio);
      sourceNode.connect(analyser);
      analyser.connect(audioCtx.destination);
    } catch (e) {
      console.log('Web Audio visualizer fallback enabled:', e);
    }
  }

  function formatTime(seconds) {
    if (isNaN(seconds) || seconds < 0) return '0:00';
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
  }

  function renderPlaylist() {
    if (!playlistContainer) return;
    playlistContainer.innerHTML = '';

    tracks.forEach((track, index) => {
      const item = document.createElement('div');
      item.className = `playlist-item ${index === currentTrackIndex ? 'active' : ''}`;
      item.setAttribute('role', 'button');
      item.setAttribute('tabindex', '0');
      item.setAttribute('aria-label', `Play ${track.title} - ${track.subtitle}`);

      item.innerHTML = `
        <div class="playlist-item-left">
          <span class="track-index">${(index + 1).toString().padStart(2, '0')}</span>
          <div>
            <span class="track-item-title">${track.title}</span>
            <span class="track-item-tag">${track.tag}</span>
            <div style="font-size: 0.72rem; color: var(--text-dim);">${track.subtitle}</div>
          </div>
        </div>
        <span class="track-duration" id="duration-track-${index}">--:--</span>
      `;

      item.addEventListener('click', () => {
        loadTrack(index);
        playAudio();
      });

      item.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          loadTrack(index);
          playAudio();
        }
      });

      playlistContainer.appendChild(item);

      // Pre-probe duration
      const tempAudio = new Audio();
      tempAudio.src = track.src;
      tempAudio.addEventListener('loadedmetadata', () => {
        const durEl = document.getElementById(`duration-track-${index}`);
        if (durEl) durEl.textContent = formatTime(tempAudio.duration);
      });
    });
  }

  function updatePlaylistActiveState() {
    const items = playlistContainer ? playlistContainer.querySelectorAll('.playlist-item') : [];
    items.forEach((item, index) => {
      if (index === currentTrackIndex) {
        item.classList.add('active');
        item.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
      } else {
        item.classList.remove('active');
      }
    });
  }

  function loadTrack(index) {
    currentTrackIndex = (index + tracks.length) % tracks.length;
    const track = tracks[currentTrackIndex];

    audio.src = track.src;
    audio.load();

    if (trackTitleEl) trackTitleEl.textContent = track.title;
    if (trackArtistEl) trackArtistEl.textContent = `NYX VOSS • ${track.subtitle}`;
    if (playerArtImg) {
      playerArtImg.src = track.artwork;
      playerArtImg.alt = `Artwork for ${track.title}`;
    }

    if (scrubberFill) scrubberFill.style.width = '0%';
    if (currentTimeEl) currentTimeEl.textContent = '0:00';
    if (totalDurationEl) totalDurationEl.textContent = '--:--';

    updatePlaylistActiveState();
  }

  function playAudio() {
    initAudioContext();
    if (audioCtx && audioCtx.state === 'suspended') {
      audioCtx.resume();
    }

    audio.play().then(() => {
      isPlaying = true;
      updatePlayButtonUI();
      startVisualizer();
      if (playingBadge) playingBadge.style.opacity = '1';
    }).catch((err) => {
      console.warn('Playback prevented:', err);
    });
  }

  function pauseAudio() {
    audio.pause();
    isPlaying = false;
    updatePlayButtonUI();
    stopVisualizer();
    if (playingBadge) playingBadge.style.opacity = '0.5';
  }

  function togglePlayPause() {
    if (isPlaying) {
      pauseAudio();
    } else {
      playAudio();
    }
  }

  function updatePlayButtonUI() {
    if (!playPauseBtn) return;
    if (isPlaying) {
      playPauseBtn.innerHTML = `
        <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor">
          <rect x="6" y="4" width="4" height="16" rx="1" />
          <rect x="14" y="4" width="4" height="16" rx="1" />
        </svg>
      `;
      playPauseBtn.setAttribute('aria-label', 'Pause');
    } else {
      playPauseBtn.innerHTML = `
        <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor">
          <polygon points="5,3 19,12 5,21" />
        </svg>
      `;
      playPauseBtn.setAttribute('aria-label', 'Play');
    }
  }

  // Visualizer renderer
  function setupVisualizer() {
    if (!visualizerCanvas) return;
    canvasCtx = visualizerCanvas.getContext('2d');

    // Resize canvas
    visualizerCanvas.width = visualizerCanvas.offsetWidth * window.devicePixelRatio || 300;
    visualizerCanvas.height = visualizerCanvas.offsetHeight * window.devicePixelRatio || 48;
  }

  function drawVisualizer() {
    if (!canvasCtx || !visualizerCanvas) return;

    const width = visualizerCanvas.width;
    const height = visualizerCanvas.height;
    canvasCtx.clearRect(0, 0, width, height);

    const barCount = 32;
    const barWidth = width / barCount - 2;

    if (analyser && isPlaying) {
      const dataArray = new Uint8Array(analyser.frequencyBinCount);
      analyser.getByteFrequencyData(dataArray);

      for (let i = 0; i < barCount; i++) {
        const val = dataArray[i] || 0;
        const barHeight = (val / 255) * height * 0.9 + 2;
        const x = i * (barWidth + 2);
        const y = height - barHeight;

        // Gothic crimson gradient
        const gradient = canvasCtx.createLinearGradient(0, height, 0, 0);
        gradient.addColorStop(0, '#4c0519');
        gradient.addColorStop(0.6, '#e11d48');
        gradient.addColorStop(1, '#ff2d55');

        canvasCtx.fillStyle = gradient;
        canvasCtx.fillRect(x, y, barWidth, barHeight);
      }
    } else {
      // Idle pulse state
      const time = Date.now() * 0.003;
      for (let i = 0; i < barCount; i++) {
        const h = Math.sin(time + i * 0.3) * (height * 0.15) + (height * 0.2);
        const x = i * (barWidth + 2);
        const y = height - h;

        canvasCtx.fillStyle = 'rgba(225, 29, 72, 0.25)';
        canvasCtx.fillRect(x, y, barWidth, h);
      }
    }

    if (isPlaying) {
      animationFrameId = requestAnimationFrame(drawVisualizer);
    }
  }

  function startVisualizer() {
    if (animationFrameId) cancelAnimationFrame(animationFrameId);
    drawVisualizer();
  }

  function stopVisualizer() {
    if (animationFrameId) cancelAnimationFrame(animationFrameId);
    drawVisualizer();
  }

  // Event Listeners
  audio.addEventListener('timeupdate', () => {
    if (!isNaN(audio.duration) && audio.duration > 0) {
      const pct = (audio.currentTime / audio.duration) * 100;
      if (scrubberFill) scrubberFill.style.width = `${pct}%`;
      if (currentTimeEl) currentTimeEl.textContent = formatTime(audio.currentTime);
    }
  });

  audio.addEventListener('loadedmetadata', () => {
    if (totalDurationEl) totalDurationEl.textContent = formatTime(audio.duration);
  });

  audio.addEventListener('ended', () => {
    if (isLooping) {
      audio.currentTime = 0;
      playAudio();
    } else {
      loadTrack(currentTrackIndex + 1);
      playAudio();
    }
  });

  if (playPauseBtn) {
    playPauseBtn.addEventListener('click', togglePlayPause);
  }

  if (prevBtn) {
    prevBtn.addEventListener('click', () => {
      loadTrack(currentTrackIndex - 1);
      playAudio();
    });
  }

  if (nextBtn) {
    nextBtn.addEventListener('click', () => {
      loadTrack(currentTrackIndex + 1);
      playAudio();
    });
  }

  if (loopBtn) {
    loopBtn.addEventListener('click', () => {
      isLooping = !isLooping;
      loopBtn.style.color = isLooping ? 'var(--crimson-bright)' : 'var(--text-muted)';
      loopBtn.style.filter = isLooping ? 'drop-shadow(0 0 6px var(--crimson-glow))' : 'none';
    });
  }

  if (scrubberTrack) {
    scrubberTrack.addEventListener('click', (e) => {
      const rect = scrubberTrack.getBoundingClientRect();
      const clickX = e.clientX - rect.left;
      const ratio = Math.max(0, Math.min(1, clickX / rect.width));
      if (!isNaN(audio.duration)) {
        audio.currentTime = ratio * audio.duration;
      }
    });
  }

  if (volumeSlider) {
    volumeSlider.addEventListener('input', (e) => {
      audio.volume = parseFloat(e.target.value);
    });
  }

  // Global Quick Player Trigger (e.g. from Hero "Listen Now" CTA)
  window.NyxAudio = {
    playTrackById: function (trackId) {
      const idx = tracks.findIndex(t => t.id === trackId);
      if (idx !== -1) {
        loadTrack(idx);
        playAudio();
      }
    },
    playCurrent: function () {
      playAudio();
    }
  };

  // Initialization
  document.addEventListener('DOMContentLoaded', () => {
    renderPlaylist();
    loadTrack(0);
    setupVisualizer();
    drawVisualizer();

    window.addEventListener('resize', () => {
      setupVisualizer();
      drawVisualizer();
    });
  });
})();
