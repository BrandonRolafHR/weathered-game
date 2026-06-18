import { Scene } from 'excalibur';
import { startMenuAnimation, stopMenuAnimation } from './startsceneCanvas.js';

export class StartScene extends Scene {
  onActivate() {
    document.getElementById('scene').style.display = 'block';
    startMenuAnimation();
  }

  onDeactivate() {
    stopMenuAnimation();
    document.getElementById('scene').style.display = 'none';
  }
}

let soundOn = true;

// Start the game
document.getElementById('btn-start').addEventListener('click', () => {
  document.dispatchEvent(new CustomEvent('start-game'));
});

// Open the options menu
document.getElementById('btn-options').addEventListener('click', () => {
  document.getElementById('options-panel').classList.remove('hidden');
});

// Close the options menu
document.getElementById('btn-back').addEventListener('click', () => {
  document.getElementById('options-panel').classList.add('hidden');
});

// Toggle fullscreen mode
document.getElementById('btn-fullscreen').addEventListener('click', async () => {
  if (!document.fullscreenElement) {
    await document.documentElement.requestFullscreen();
  } else {
    await document.exitFullscreen();
  }
});

// Toggle game sound on/off
document.getElementById('btn-sound').addEventListener('click', () => {
  soundOn = !soundOn;

  document.getElementById('btn-sound').textContent = soundOn
    ? 'Sound: ON'
    : 'Sound: OFF';

  document.dispatchEvent(new CustomEvent('toggle-sound', {
    detail: { soundOn }
  }));
});

// Close the game (browser restrictions may prevent this)
document.getElementById('btn-quit').addEventListener('click', () => {
  const confirmQuit = confirm('Weet je zeker dat je wilt stoppen?');

  if (confirmQuit) {
    window.close();

    document.getElementById('scene').style.display = 'none';
    alert('Je browser laat deze tab niet automatisch sluiten. Je kan de tab nu zelf sluiten.');
  }
});