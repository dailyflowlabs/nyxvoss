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
    },
    {
      id: 'good-in-the-dark',
      title: "Good In The Dark",
      subtitle: 'Album Track 06',
      tag: 'Nothing Soft Survives',
      src: "music/good_in_the_dark.mp3",
      artwork: "images/nyx-good-in-the-dark-artwork.jpg",
      lyrics: `<strong>[Intro]</strong>
[Low]
Don't turn it on.

<strong>[Verse 1]</strong>
[Intimate]
You look different in this lighting
That's not a compliment
That's a warning
I get honest when the room goes black

<strong>[Pre-Chorus]</strong>
You can stay
You can't get comfortable

<strong>[Chorus]</strong>
[Belted]
I'm good in the dark
I'm good in the dark
Don't ask who I am in the morning
I'm good in the dark
Keep your hands
Keep your story
I'm good in the dark
That's the deal
I'm good in the dark
That's the deal

<strong>[Verse 2]</strong>
[Intimate]
You want the penthouse version
The glass, the skyline, the girl
You can have the hour
You can't have the keys

<strong>[Pre-Chorus]</strong>
You can stay
You can't get comfortable

<strong>[Chorus]</strong>
[Belted]
I'm good in the dark
I'm good in the dark
Don't ask who I am in the morning
I'm good in the dark
Keep your hands
Keep your story
I'm good in the dark
That's the deal

<strong>[Bridge]</strong>
[Spoken]
If you needed light
You picked the wrong floor.

<strong>[Chorus]</strong>
[Belted]
I'm good in the dark
I'm good in the dark
I'm good in the dark
Don't ask who I am in the morning

<strong>[Outro]</strong>
[Whispered]
Leave it off.`
    },
    {
      id: 'watch-your-mouth',
      title: "Watch Your Mouth",
      subtitle: 'Album Track 04',
      tag: 'Nothing Soft Survives',
      src: "music/watch_your_mouth.mp3",
      artwork: "images/nyx-leather-jacket-front.jpg",
      lyrics: `<strong>[Intro]</strong>
[Whispered / Spoken]
Careful.
That's not yours.

<strong>[Verse 1]</strong>
[Direct, sharp]
You say my name like you paid for the rights
Built the story as yours if you say it twice
You put my mouth in a sentence I didn't make
Then you pass it around like it isn't fake
Careful... that's not yours.

<strong>[Chorus]</strong>
[Aggressive belt]
Watch your mouth when you say my name
You don't get to keep the way that it tastes
Watch your mouth when you say my name
You might take it back—
I take it straight.
I take it straight.

<strong>[Verse 2]</strong>
[Cold, taunting]
You like me better quoted than alive
Be easier to hold when I'm not in the room
You want the version that fits in your throat?
Spit it out. I'm not food.
Careful... that's not yours.

<strong>[Chorus]</strong>
[Aggressive belt]
Watch your mouth when you say my name
You don't get to keep the way that it tastes
Watch your mouth when you say my name
I take it back—
I take it straight.

<strong>[Bridge]</strong>
[Close whisper into mic]
Say it wrong, and I'll hear.
Say it soft again... I'll end it.

<strong>[Chorus]</strong>
[Full screamed belt]
Watch your mouth when you say my name!
You don't get to keep the way that it tastes!
Watch your mouth when you say my name!
I take it back—
I take it straight.

<strong>[Outro]</strong>
[Dead cold]
I take it straight.`
    },
    {
      id: 'ruin-me-clean',
      title: "Ruin Me Clean",
      subtitle: 'Album Track 07',
      tag: 'Nothing Soft Survives',
      src: "music/ruin_me_clean.mp3",
      artwork: "images/nyx-wet-rain-seductive.jpg",
      lyrics: `<strong>[Intro]</strong>
[Low, steady]
Don't fold me up.

<strong>[Verse 1]</strong>
[Intense, deliberate]
Don't fold me up like something you can hide
I want the mark where everybody sees
If you're gonna take a piece, take it straight
I don't do kindness, I can't survive
Make it obvious.
Make it mine.

<strong>[Chorus]</strong>
[Screamed industrial belt]
Don't make it gentle, ruin me clean!
I want the damage, I can still be seen!
Don't make it gentle, leave it on the skin!
If it doesn't show, it didn't happen!
It didn't happen!

<strong>[Verse 2]</strong>
[Visceral sneer]
You keep offering water like that's the point
I didn't come here to get saved
I came here to walk, I look and I cut
To make you live with the shape.
Make it obvious.
Make it mine.

<strong>[Chorus]</strong>
[Screamed industrial belt]
Don't make it gentle, ruin me clean!
I want the damage, I can still be seen!
Don't make it gentle, leave it on the skin!
If it doesn't show, it didn't happen!

<strong>[Bridge]</strong>
[Spoken, vicious]
After the room I don't stay in...
Don't you dare call it love.
Call it what it is:
A clean cut. A good one.

<strong>[Chorus]</strong>
[Full distortion climax]
Don't make it gentle, ruin me clean!
I want the damage, I can still be seen!
Don't make it gentle, say it with your hands!
If it doesn't show...
It didn't happen.`
    },
    {
      id: 'if-i-apologize',
      title: "If I Apologize",
      subtitle: 'Album Track 08',
      tag: 'Nothing Soft Survives',
      src: "music/if_i_apologize.mp3",
      artwork: "images/nyx-side-profile.jpg",
      lyrics: `<strong>[Intro]</strong>
[Low, rhythmic]
I practiced it in the mirror.

<strong>[Verse 1]</strong>
[Whispered venom]
I practiced it in the mirror till it sounded kind
Soft enough to pass, sharp enough to hide
I put your favorite words in the order you like
Then I bite the inside of my mouth and smile.
You want the version that kneels on cue?
I can do that too.

<strong>[Chorus]</strong>
[Towering rock belt]
If I apologize, don't you dare believe it!
I only say I'm sorry when I need the room to bleed it!
If I apologize, it's a costume I can leave in!
I didn't come here gentle, I came here even!

<strong>[Verse 2]</strong>
[Cool, calculated]
I let the silence sit until you fill it in
You rate me better when you think you've won
I watch the little hope land in your face
Then I take it back and call it gracious.
You want the girl who learned her lines?
I know them fine.

<strong>[Chorus]</strong>
[Towering rock belt]
If I apologize, don't you dare believe it!
I only say I'm sorry when I need the room to bleed it!
If I apologize, it's a costume I can leave in!
I didn't come here gentle, I came here even!

<strong>[Bridge]</strong>
[Desperate, screaming guitar build]
Walk away while I'm still breathing.
I didn't come here gentle.
I came here even.

<strong>[Final Chorus]</strong>
[Maximum vocal peak]
If I apologize, don't you dare believe it!
I only say I'm sorry when I need the room to bleed it!
I didn't come here gentle!
I came here even!`
    },
    {
      id: 'leave-the-body',
      title: "Leave The Body",
      subtitle: 'Album Track 09',
      tag: 'Nothing Soft Survives',
      src: "music/leave_the_body.mp3",
      artwork: "images/nyx-crt-screens-glitch.jpg",
      lyrics: `<strong>[Intro]</strong>
[Hypnotic dark drone]
I'm not coming back as me.

<strong>[Chorus]</strong>
[Haunting gothic chant]
Leave the body in the hallway
I'll be whoever plays the light
Leave the body in the hallway
She can keep the quiet night
I only need the part that moves
The rest can rot in a borrowed room.

<strong>[Verse 1]</strong>
[Intimate, detached]
I'm talking copies I already sold
I wear the temperature off the room I'm in
If you touch the pulse, you're touching a trick
I'm two floors down...
I'm not in the skin. No way.

<strong>[Chorus]</strong>
[Haunting gothic chant]
Leave the body in the hallway
I'll be whoever plays the light
Leave the body in the hallway
She can keep the quiet night
I only need the part that moves
The rest can rot in a borrowed room.

<strong>[Bridge]</strong>
[Spoken over pulsing distortion]
Tell her I was good.
Tell her I was mean.
Tell her anything—she isn't listening.
Don't you follow.
Don't you try.

<strong>[Outro]</strong>
[Distant reverbed vocals into silence]
Leave the body in the hallway...
Leave the body in the hallway...
I'll be whoever plays the light...
She can keep the quiet night.`
    },
    {
      id: 'nothing-soft-survives',
      title: "Nothing Soft Survives",
      subtitle: 'Title Track • Track 10',
      tag: 'Title Track • LP Finale',
      src: "music/nothing_soft_survives.mp3",
      artwork: "images/nyx-nothing-soft-survives-artwork.jpg",
      lyrics: `<strong>[Intro]</strong>
[Ethereal drone, quiet piano chord]
I left the pretty parts where you could find them.

<strong>[Verse 1]</strong>
[Intimate, brooding]
I left the pretty parts where you could find them
Folded, labeled, easy to believe
If you wanted soft, you should have come in daylight
I only tell the truth after I leave.
Don't wait for the girl who held her breath
She didn't make it out of the first night.

<strong>[Chorus]</strong>
[Crushing distorted explosion]
NOTHING SOFT SURVIVES THE NIGHT I MEANT IT!
I burned the gentle so it couldn't follow me!
NOTHING SOFT SURVIVES THE NIGHT I MEANT IT!
If you still want her...
She isn't me.
She isn't me.

<strong>[Verse 2]</strong>
[Defiant rock swagger]
I wore the apology until it tore
I wore the angel till the wire showed
You can keep the footage, keep the quote
I already walked through it and closed the door.
Don't wait for the girl who held her breath
She didn't make it out of the first night.

<strong>[Chorus]</strong>
[Crushing distorted explosion]
NOTHING SOFT SURVIVES THE NIGHT I MEANT IT!
I burned the gentle so it couldn't follow me!
NOTHING SOFT SURVIVES THE NIGHT I MEANT IT!
If you still want her...
She isn't me.

<strong>[Bridge]</strong>
[Vocal scream over industrial wall of sound]
Mix in the static, mix in the cut!
Not a secret, just what's left!

<strong>[Outro]</strong>
[Decaying industrial hum, heavy breathing]
I left the pretty parts where you could find them...
Nothing soft survives.
Nothing soft survives the night I meant it.`
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

  // Mini Floating Player DOM Elements
  const nyxMiniThumb = document.getElementById('nyxMiniThumb');
  const nyxMiniTitle = document.getElementById('nyxMiniTitle');
  const nyxMiniSubtitle = document.getElementById('nyxMiniSubtitle');
  const nyxMiniPlayBtn = document.getElementById('nyxMiniPlayBtn');
  const floatingTrackInfo = document.getElementById('floatingPlayerTrackInfo');

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

    // Update Floating Mini Player Info
    if (nyxMiniTitle) nyxMiniTitle.textContent = track.title;
    if (nyxMiniSubtitle) nyxMiniSubtitle.textContent = `NYX VOSS • ${track.subtitle}`;
    if (nyxMiniThumb) {
      nyxMiniThumb.src = track.artwork;
      nyxMiniThumb.alt = `Artwork for ${track.title}`;
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
    if (playPauseBtn) {
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

    if (nyxMiniPlayBtn) {
      if (isPlaying) {
        nyxMiniPlayBtn.innerHTML = `
          <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
            <rect x="6" y="4" width="4" height="16" rx="1" />
            <rect x="14" y="4" width="4" height="16" rx="1" />
          </svg>
        `;
        nyxMiniPlayBtn.setAttribute('aria-label', 'Pause audio');
      } else {
        nyxMiniPlayBtn.innerHTML = `
          <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
            <polygon points="5,3 19,12 5,21" />
          </svg>
        `;
        nyxMiniPlayBtn.setAttribute('aria-label', 'Play audio');
      }
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

  if (nyxMiniPlayBtn) {
    nyxMiniPlayBtn.addEventListener('click', togglePlayPause);
  }

  if (floatingTrackInfo) {
    floatingTrackInfo.addEventListener('click', () => {
      const musicSec = document.getElementById('music');
      if (musicSec) musicSec.scrollIntoView({ behavior: 'smooth' });
    });
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
