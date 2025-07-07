// Grab elements
const tempoRange     = document.getElementById('tempoRange');
const tempoInput     = document.getElementById('tempoInput');
const startBtn       = document.getElementById('startBtn');
const stopBtn        = document.getElementById('stopBtn');
const toggleSoundBtn = document.getElementById('toggleSound');
const toggleFlashBtn = document.getElementById('toggleFlash');
const flashScreen    = document.getElementById('flashScreen');

// Audio context
const audioCtx = new (window.AudioContext || window.webkitAudioContext)();
let currentInterval = null;
let bpm = 120;
let soundOn = true;
let flashOn = true;
let flashColor = '#A8E6CF';
let flashIntensity = 1;

function playClick() {
  const osc = audioCtx.createOscillator();
  const gainNode = audioCtx.createGain();
  osc.frequency.value = 1000;
  gainNode.gain.value = 0.3;
  osc.connect(gainNode);
  gainNode.connect(audioCtx.destination);
  osc.start();
  osc.stop(audioCtx.currentTime + 0.05);
}

function flashBeat() {
  flashScreen.style.backgroundColor = flashColor;
  flashScreen.style.opacity = flashIntensity;
  setTimeout(() => flashScreen.style.opacity = 0, 100);
}

function startMetronome() {
  // Resume audio context on user gesture
  if (audioCtx.state === 'suspended') {
    audioCtx.resume();
  }

  clearInterval(currentInterval);
  const intervalMs = (60 / bpm) * 1000;
  currentInterval = setInterval(() => {
    if (soundOn) playClick();
    if (flashOn) flashBeat();
  }, intervalMs);
}

function stopMetronome() {
  clearInterval(currentInterval);
  currentInterval = null;
}

// Sync tempo controls
tempoRange.addEventListener('input', e => {
  bpm = Number(e.target.value);
  tempoInput.value = bpm;
  if (currentInterval) startMetronome();
});

tempoInput.addEventListener('input', e => {
  let val = Number(e.target.value);
  if (val < 40) val = 40;
  if (val > 240) val = 240;
  bpm = val;
  tempoRange.value = bpm;
  tempoInput.value = bpm;
  if (currentInterval) startMetronome();
});

// Button event listeners
toggleSoundBtn.addEventListener('click', () => {
  soundOn = !soundOn;
  toggleSoundBtn.textContent = soundOn ? 'Sound On' : 'Sound Off';
  toggleSoundBtn.classList.toggle('active');
});

toggleFlashBtn.addEventListener('click', () => {
  flashOn = !flashOn;
  toggleFlashBtn.textContent = flashOn ? 'Flash On' : 'Flash Off';
  toggleFlashBtn.classList.toggle('active');
});

startBtn.addEventListener('click', startMetronome);
stopBtn.addEventListener('click', stopMetronome);

toggleSoundBtn.textContent = soundOn ? 'Sound On' : 'Sound Off';
toggleFlashBtn.textContent = flashOn ? 'Flash On' : 'Flash Off';
