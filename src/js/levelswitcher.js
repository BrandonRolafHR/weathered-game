import { fadeToScene } from './class/fade.js';
import { Player } from './class/player.js';

export class LevelSwitcher {
  constructor(engine, sceneNames, switchTime = 100000) {
    this.engine = engine;
    this.sceneNames = sceneNames;
    this.switchTime = switchTime;
    this.currentSceneName = null;
    this.timeoutId = null;
  }

  start(startSceneName) {
    this.currentSceneName = startSceneName;
    this.startTimer();
  }

  startTimer() {
    this.stop();

    this.timeoutId = setTimeout(async () => {
      const nextScene = this.getRandomNextScene();

      console.log('Switching to:', nextScene);

      this.currentSceneName = nextScene;

      await fadeToScene(this.engine, nextScene);

      this.startTimer();
    }, this.switchTime);
  }

  stop() {
    if (this.timeoutId !== null) {
      clearTimeout(this.timeoutId);
      this.timeoutId = null;
    }
  }

  getRandomNextScene() {
    const possibleScenes = this.sceneNames.filter(
      scene => scene !== this.currentSceneName
    );

    const randomIndex = Math.floor(Math.random() * possibleScenes.length);
    return possibleScenes[randomIndex];
  }
}