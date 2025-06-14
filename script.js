const music = [
  { title: "Sample Song 1", artist: "Artist 1", src: "music/song1.mp3" },
  { title: "Sample Song 2", artist: "Artist 2", src: "music/song2.mp3" }
];
let currentTrack = 0;
const audio = document.getElementById('audio');
const title = document.getElementById('title');
const artist = document.getElementById('artist');
const playBtn = document.getElementById('play');
const prevBtn = document.getElementById('prev');
const nextBtn = document.getElementById('next');
const progress = document.getElementById('progress');
const progressContainer = document.getElementById('progress-container');
const current = document.getElementById('current');
const duration = document.getElementById('duration');

function loadTrack(track) {
  title.textContent = music[track].title;
  artist.textContent = music[track].artist;
  audio.src = music[track].src;
}

function playTrack() {
  audio.play();
  playBtn.textContent = '⏸️';
}

function pauseTrack() {
  audio.pause();
  playBtn.textContent = '▶️';
}

playBtn.addEventListener('click', () => {
  if (audio.paused) {
    playTrack();
  } else {
    pauseTrack();
  }
});

prevBtn.addEventListener('click', () => {
  currentTrack = (currentTrack - 1 + music.length) % music.length;
  loadTrack(currentTrack);
  playTrack();
});

nextBtn.addEventListener('click', () => {
  currentTrack = (currentTrack + 1) % music.length;
  loadTrack(currentTrack);
  playTrack();
});

audio.addEventListener('timeupdate', updateProgress);
audio.addEventListener('ended', () => {
  nextBtn.click();
});

progressContainer.addEventListener('click', (e) => {
  const width = progressContainer.clientWidth;
  const clickX = e.offsetX;
  audio.currentTime = (clickX / width) * audio.duration;
});

function updateProgress() {
  const { duration: dur, currentTime } = audio;
  const progressPercent = (currentTime / dur) * 100;
  progress.style.width = `${progressPercent}%`;

  current.textContent = formatTime(currentTime);
  duration.textContent = formatTime(dur);
}

function formatTime(time) {
  const mins = Math.floor(time / 60);
  const secs = Math.floor(time % 60).toString().padStart(2, '0');
  return `${mins}:${secs}`;
}

loadTrack(currentTrack);
