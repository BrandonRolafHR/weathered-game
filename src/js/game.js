import '../css/style.css';

import { Engine, Vector, DisplayMode, SolverStrategy, Keys, BoundingBox, Actor } from 'excalibur';
import { ResourceLoader } from './resources.js';
import { StartScene } from './startscene.js';
import { FirstScene } from './firstscene.js';
import { ThunderScene } from './thunderscene.js';
import { waterScene } from './waterscene.js';
import { HurricaneScene } from './hurricanescene.js';
import { LevelSwitcher } from './levelswitcher.js';
import { fadeToScene } from './class/fade.js';
import { Player } from './class/player.js';

export class Game extends Engine {
  isPaused = false;
  body = document.body;
  showingPage = false;
  ui;

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
    this.add('waterscene', new waterScene())

    this.levelSwitcher = new LevelSwitcher(this, [
      'firstscene',
      'hurricanescene',
      'thunderscene',
      'waterscene'
    ]);
    
  }

  async init() {
    await this.start(ResourceLoader);
    this.goToScene('start');
  }

  startFirstScene() {
    this.goToScene('firstscene');
    // this.goToScene('firstscene');
    // this.goToScene('hurricanescene');
  }

  pause() {
    this.isPaused = !this.isPaused
    this.timescale = this.isPaused ? 0 : 1
    this.isPaused ? this.body.classList.add('paused') : this.body.classList.remove('paused')
  }


  onPreUpdate() {
    if (this.input.keyboard.wasPressed(Keys.Escape)) {
      this.pause()
    }

    if(this.showingPage && this.input.keyboard.wasPressed(Keys.Space)) {
      this.pause()
      this.showingPage = false;
      this.levelSwitcher.startTimer()
      
      const speler = game.currentScene.actors.find(Actor => Actor instanceof Player)
      if(speler.pageCount === 5) {
        speler.onFinnish()
        console.log("speel video af")
      }
    }

    if (this.input.keyboard.wasPressed(Keys.F)) {
      this.goToScene('waterscene')
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
