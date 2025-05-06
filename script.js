const audioCtx = new (window.AudioContext || window.webkitAudioContext)();
let currentInterval;
let bpm = 120;
let soundOn = true;
let flashOn = true;
let flashColor = '#A8E6CF';
let flashIntensity = 1;

const tempoSlider        = document.getElementById('tempo');
const tempoValue         = document.getElementById('tempoValue');
const toggleSoundBtn     = document.getElementById('toggleSound');
const toggleFlashBtn     = document.getElementById('toggleFlash');
const flashSettingsBtn   = document.getElementById('flashSettingsBtn');
const flashSettings      = document.getElementById('flashSettings');
const saveSettings       = document.getElementById('saveSettings');
const flashScreen        = document.getElementById('flashScreen');
const flashColorInput    = document.getElementById('flashColor');
const flashIntensityInput= document.getElementById('flashIntensity');

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
  setTimeout(() => {
    flashScreen.style.opacity = 0;
  }, 100);
}

function startMetronome() {
  clearInterval(currentInterval);
  const interval = (60 / bpm) * 1000;
  currentInterval = setInterval(() => {
    if (soundOn) playClick();
    if (flashOn) flashBeat();
  }, interval);
}

// Event listeners
tempoSlider.addEventListener('input', e => {
  bpm = e.target.value;
  tempoValue.textContent = bpm;
  startMetronome();
});

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

flashSettingsBtn.addEventListener('click', () => {
  flashSettings.classList.remove('hidden');
});

saveSettings.addEventListener('click', () => {
  flashColor = flashColorInput.value;
  flashIntensity = flashIntensityInput.value;
  flashSettings.classList.add('hidden');
});

// Initialize
startMetronome();
