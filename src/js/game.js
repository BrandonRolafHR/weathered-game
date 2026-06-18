import '../css/style.css'
import { Actor, Engine, Vector, DisplayMode, SolverStrategy } from "excalibur"
import { Resources, ResourceLoader } from './resources.js'
import { StartScene } from './startscene.js'
import { FirstScene } from './firstscene.js'
import { ThunderScene } from './thunderscene.js'

import { Engine, Vector, DisplayMode, SolverStrategy, Keys } from 'excalibur';
import { ResourceLoader } from './resources.js';
import { FirstScene } from './firstscene.js';

class Game extends Engine {

  isPaused = false;
  body = document.body

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

  pause() {
    this.isPaused = !this.isPaused
    this.timescale = this.isPaused ? 0 : 1
    this.isPaused ? this.body.classList.add("paused") : this.body.classList.remove("paused")
  }

  onPreUpdate() {
    if (this.input.keyboard.wasPressed(Keys.Escape)) {
      this.pause()
    }
  }

    startGame() {
        this.add('start', new StartScene())
        this.add('firstscene', new FirstScene())
        
        this.add('thunderscene', new ThunderScene())

        this.goToScene('start')

        this.showDebug(true)
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