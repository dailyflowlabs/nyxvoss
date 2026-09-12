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
      artwork: "images/nyx-closeup-intense.jpg",
      lyrics: `<strong>[Intro]</strong>
[Whispered]
Don't look soft.

<strong>[Verse 1]</strong>
[Whispered]
I wear the night like it owes me rent
Pretty face, bad intent
You want the girl in the light
I only come out when the room goes quiet

<strong>[Pre-Chorus]</strong>
Smile like a warning
Come closer
Then don't.

<strong>[Chorus]</strong>
[Belted]
Stay down
I don't do gentle
Stay down
I don't do friends
If you came here looking for soft
You walked into the wrong girl again

<strong>[Verse 2]</strong>
[Whispered]
Black mouth, sharp teeth, camera flash
I look expensive, I come with a catch
You can take a picture
You can't take me home

<strong>[Pre-Chorus]</strong>
Smile like a warning
Come closer
Then don't.

<strong>[Chorus]</strong>
[Belted]
Stay down
I don't do gentle
Stay down
I don't do friends
If you came here looking for soft
You walked into the wrong girl again

<strong>[Bridge]</strong>
[Spoken]
Say my name like it won't cut
Nyx.
Say it again.
Voss.

<strong>[Chorus]</strong>
[Belted]
Stay down
I don't do gentle
Stay down
I don't do friends
If you came here looking for soft
You walked into the wrong girl again

<strong>[Outro]</strong>
[Whispered]
Don't look soft.`
    },
    {
      id: 'you-like-me-better-mean',
      title: "You Like Me Better Mean",
      subtitle: 'Single',
      tag: 'Official Single',
      src: "music/you_like_me_better_mean.mp3",
      artwork: "images/nyx-stage-belting-unobstructed.jpg",
      lyrics: `<strong>[Intro]</strong>
[Whispered]
You already know.

<strong>[Verse 1]</strong>
[Whispered]
I can do the pretty
I can do the quiet
I can do the girl you take to dinner
Then I ruin it on purpose

<strong>[Pre-Chorus]</strong>
You keep asking for the soft one
She doesn't clock in

<strong>[Chorus]</strong>
[Belted]
You like me better mean
You like me better mean
Don't ask me to be sweet
You like me better mean
You like me better mean
You like me better mean
You like me better mean
You like me better mean
Say it
You like me better mean

<strong>[Verse 2]</strong>
[Whispered]
I smiled once
You got comfortable
That's on you
I told you what I am

<strong>[Pre-Chorus]</strong>
You keep looking for the soft one
She doesn't clock in

<strong>[Chorus]</strong>
[Belted]
You like me better mean
You like me better mean
Don't ask me to be sweet
You like me better mean
You like me better mean
You like me better mean
Say it
You like me better mean

<strong>[Bridge]</strong>
[Spoken]
Say it nicer.
No.

<strong>[Chorus]</strong>
[Belted]
You like me better mean
You like me better mean
Don't ask me to be sweet
You like me better mean

<strong>[Outro]</strong>
[Whispered]
You like me better mean.`
    },
    {
      id: 'angel-when-i-feel-like-it',
      title: "Angel When I Feel Like It",
      subtitle: 'Single',
      tag: 'Official Single',
      src: "music/angel_when_i_feel_like_it.mp3",
      artwork: "images/nyx-cathedral-seraph.jpg",
      lyrics: `<strong>[Intro]</strong>
[Breathy]
I can do the pretty voice
Watch.

<strong>[Verse 1]</strong>
[Breathy]
I know the version you wanted
Clean girl, church mouth, lights low
I can hold a note like glass
I just don't owe you that show

<strong>[Pre-Chorus]</strong>
[Soft belt]
Don't look surprised
I went to school for this

<strong>[Chorus]</strong>
[Belted]
I'm an angel when I feel like it
I'm an angel when I feel like it
I can make it sound like heaven
Then I take it back in a second
I'm an angel when I feel like it
Don't get used to it

<strong>[Verse 2]</strong>
[Breathy]
You heard the high note
Now you think I'm soft
Cute
That was a trick, not a change

<strong>[Pre-Chorus]</strong>
[Soft belt]
Don't look surprised
I went to school for this

<strong>[Chorus]</strong>
[Belted]
I'm an angel when I feel like it
I'm an angel when I feel like it
I can make it sound like heaven
Then I take it back in a second
I'm an angel when I feel like it
Don't get used to it

<strong>[Bridge]</strong>
[High head voice, held]
Ah—
[Hold]
[Distorted belt]
That's enough.

<strong>[Chorus]</strong>
[Belted]
I'm an angel when I feel like it
I'm an angel when I feel like it
I can make it sound like heaven
Then I take it back in a second

<strong>[Outro]</strong>
[Whispered]
Don't get used to it.`
    },
    {
      id: 'secondhand',
      title: "Secondhand",
      subtitle: 'Single',
      tag: 'New Release',
      src: "music/secondhand.mp3",
      artwork: "images/nyx-secondhand-artwork.jpg",
      lyrics: `<strong>[Intro]</strong>
[Harsh]
Don't send a stand-in.

<strong>[Verse 1]</strong>
[Spat]
You carved me up
In a room I wasn't in
Passed the knife
Wiped your hands
Called it conversation

<strong>[Pre-Chorus]</strong>
[Building yell]
I'm not a story you get to tell
I'm in the doorway

<strong>[Chorus]</strong>
[Screamed belt]
I DON'T DO SECONDHAND
Come cut me yourself
I DON'T DO SECONDHAND
Don't hide behind a mouth
If you want me ruined
Look at me while you do it
I DON'T DO SECONDHAND
COME CUT ME YOURSELF

<strong>[Verse 2]</strong>
[Spat]
You want the blood
You want the alibi
You want me quiet
And still in the blast

<strong>[Pre-Chorus]</strong>
[Building yell]
I'm not a story you get to tell
I'm in the doorway

<strong>[Chorus]</strong>
[Screamed belt]
I DON'T DO SECONDHAND
Come cut me yourself
I DON'T DO SECONDHAND
Don't hide behind a mouth
If you want me ruined
Look at me while you do it
I DON'T DO SECONDHAND
COME CUT ME YOURSELF
COME CUT ME YOURSELF

<strong>[Bridge]</strong>
[Close, vicious]
I will take the hit.
I will not take the cowardice.
[Close, vicious]
I will take the hit.
I will not take the cowardice.

<strong>[Final Chorus]</strong>
[Screamed belt]
I DON'T DO SECONDHAND
COME CUT ME YOURSELF
I DON'T DO SECONDHAND
LOOK AT ME

<strong>[Outro]</strong>
[Harsh whisper]
Come yourself.`
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
    updateLyricsModal();
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

  // Update Lyrics Modal with Current Track Content
  function updateLyricsModal() {
    const modalTitle = document.querySelector('#lyricsModal .lyrics-title');
    const modalText = document.querySelector('#lyricsModal .lyrics-text');
    const track = tracks[currentTrackIndex];
    if (modalTitle && track) {
      modalTitle.textContent = track.title;
    }
    if (modalText && track && track.lyrics) {
      modalText.innerHTML = track.lyrics;
    }
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
    },
    getCurrentTrack: function () {
      return tracks[currentTrackIndex];
    },
    updateLyricsModal: updateLyricsModal
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
