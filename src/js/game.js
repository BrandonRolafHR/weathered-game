import '../css/style.css';

import { Engine, Vector, DisplayMode, SolverStrategy, Keys, BoundingBox } from 'excalibur';
import { ResourceLoader } from './resources.js';
import { StartScene } from './startscene.js';
import { FirstScene } from './firstscene.js';
import { ThunderScene } from './thunderscene.js';
import { waterScene } from './waterscene.js';
import { Player } from './class/player.js';

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
    this.isPaused = !this.isPaused
    this.timescale = this.isPaused ? 0 : 1
    this.isPaused ? this.body.classList.add("paused") : this.body.classList.remove("paused")
  }

  onPreUpdate() {
    if (this.input.keyboard.wasPressed(Keys.Escape)) {
      this.pause();
    }

    if (this.input.keyboard.wasPressed(Keys.F)) {
      this.add('waterscene', new waterScene)
      this.goToScene('waterscene')
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