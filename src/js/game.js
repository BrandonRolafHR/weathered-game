import '../css/style.css';

import { Engine, Vector, DisplayMode, SolverStrategy, Keys } from 'excalibur';
import { ResourceLoader } from './resources.js';
import { StartScene } from './startscene.js';
import { FirstScene } from './firstscene.js';
import { ThunderScene } from './thunderscene.js';

class Game extends Engine {
  isPaused = false;
  body = document.body;

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

    this.add('start', new StartScene());
    this.add('firstscene', new FirstScene());
    this.add('thunderscene', new ThunderScene());
  }

  async init() {
    await this.start(ResourceLoader);
    this.goToScene('start');
  }

  startFirstScene() {
    this.goToScene('firstscene');
  }

  pause() {
    this.isPaused = !this.isPaused;
    this.timescale = this.isPaused ? 0 : 1;

    if (this.isPaused) {
      this.body.classList.add('paused');
    } else {
      this.body.classList.remove('paused');
    }
  }

  onPreUpdate() {
    if (this.input.keyboard.wasPressed(Keys.Escape)) {
      this.pause();
    }
  }
}

const game = new Game();
game.init();

document.addEventListener('start-game', () => {
  console.log('Start knop ontvangen');
  game.startFirstScene();
});

document.addEventListener('toggle-sound', (event) => {
  game.volume = event.detail.soundOn ? 1 : 0;
});