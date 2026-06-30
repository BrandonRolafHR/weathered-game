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
import { PlayerState } from './class/playerstate.js';

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

  pausePage(){
    this.isPaused = !this.isPaused
    this.timescale = this.isPaused ? 0 : 1
  }

  pause() {
    //CODE VAN SIEBE & AANGEPAST DOOR BERTAN, ZODAT JE ECHT DE OPTIE PANEL ZIET.
    this.isPaused = !this.isPaused;
    this.timescale = this.isPaused ? 0 : 1;


    const gameContainer = document.getElementById('game-container');

    if (gameContainer) {
        this.isPaused
            ? gameContainer.classList.add('paused')
            : gameContainer.classList.remove('paused');
    }

    const optionsPanel = document.getElementById('options-panel');

    if (optionsPanel) {
        if (this.isPaused) {
            optionsPanel.classList.remove('hidden');
        } else {
            optionsPanel.classList.add('hidden');
        }
    }


    //CODE VAN SIEBE
    // this.isPaused = !this.isPaused
    // this.timescale = this.isPaused ? 0 : 1
    // this.isPaused ? this.body.classList.add('paused') : this.body.classList.remove('paused')

    // CODE VAN BERTAN
    // const optionsPanel = document.getElementById('options-panel');

    // if (optionsPanel) {
    //     if (this.isPaused) {
    //         optionsPanel.classList.remove('hidden');
    //     } else {
    //         optionsPanel.classList.add('hidden');
    //     }
    // }
  }


  onPreUpdate() {
    if (this.input.keyboard.wasPressed(Keys.Escape)) {
      this.pause()
    }

    if (this.showingPage && this.input.keyboard.wasPressed(Keys.Space)) {
      this.pause()
      this.showingPage = false;
      this.levelSwitcher.startTimer()

      const speler = game.currentScene.actors.find(Actor => Actor instanceof Player)
      if (PlayerState.pageCount >= 5) {
        speler.onFinnish()
      }
    }

    if (this.input.keyboard.wasPressed(Keys.F)) {
      this.goToScene('firstscene')
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
