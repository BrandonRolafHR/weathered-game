import '../css/style.css';

import { Engine, Vector, DisplayMode, SolverStrategy, Keys } from 'excalibur';
import { ResourceLoader } from './resources.js';
import { FirstScene } from './firstscene.js';

class Game extends Engine {

  isPaused = false;
  body = document.body;
  showingPage = false;

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
    this.isPaused ? this.body.classList.add('paused') : this.body.classList.remove('paused')
  }


  onPreUpdate() {
    if (this.input.keyboard.wasPressed(Keys.Escape)) {
      this.pause()
    }

    if(this.showingPage && this.input.keyboard.wasPressed(Keys.Space)) {
      this.pause()
      this.showingPage = false;
    }
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