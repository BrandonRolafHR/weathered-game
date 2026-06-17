import '../css/style.css';

import { Engine, Vector, DisplayMode, SolverStrategy } from 'excalibur';
import { ResourceLoader } from './resources.js';
import { FirstScene } from './firstscene.js';

class Game extends Engine {
  constructor() {
    super({
      width: 1280,
      height: 720,
      maxFps: 60,
      displayMode: DisplayMode.FitScreen,
      physics: {
        solver: SolverStrategy.Arcade,
        gravity: new Vector(0, 1000)
      },
      suppressPlayButton: true
    });

    this.add('firstscene', new FirstScene());
  }

  async init() {
    await this.start(ResourceLoader);
    console.log('Game geladen, wacht op HTML Start knop');
  }

  startFirstScene() {
    this.goToScene('firstscene');
  }
}

const game = new Game();
game.init();

document.addEventListener('start-game', () => {
  console.log('Start knop ontvangen');

  const startScreen = document.getElementById('scene');
  const optionsPanel = document.getElementById('options-panel');

  if (startScreen) startScreen.style.display = 'none';
  if (optionsPanel) optionsPanel.classList.add('hidden');

  game.startFirstScene();
});

document.addEventListener('toggle-sound', (event) => {
  game.volume = event.detail.soundOn ? 1 : 0;
});