import '../css/style.css';

import { Engine, Vector, DisplayMode, SolverStrategy, Keys } from 'excalibur';
import { ResourceLoader } from './resources.js';
import { StartScene } from './startscene.js';
import { FirstScene } from './firstscene.js';
import { ThunderScene } from './thunderscene.js';
import { HurricaneScene } from './hurricanescene.js';
import { LevelSwitcher } from './levelswitcher.js';
import { fadeToScene } from './class/fade.js';

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
    this.add('hurricanescene', new HurricaneScene());

    this.levelSwitcher = new LevelSwitcher(this, [
      'firstscene',
      'hurricanescene',
      'thunderscene'
    ]);
  }

  async init() {
    await this.start(ResourceLoader);
    this.goToScene('start');
  }

  startFirstScene() {
    // this.goToScene('firstscene');
    this.goToScene('hurricanescene');
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
  }
}

const game = new Game();
game.init();

document.addEventListener('start-game', async () => {
  await fadeToScene(game, 'firstscene');

  game.levelSwitcher.start('firstscene');
});

document.addEventListener('toggle-sound', (event) => {
  game.volume = event.detail.soundOn ? 1 : 0;
});