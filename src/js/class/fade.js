import { PlayerState } from './playerstate.js';

let isFading = false;

export async function fadeToScene(engine, sceneName) {
  if (isFading) return;

  isFading = true;
  PlayerState.isSwitchingScene = true;

  const fade = document.createElement('div');

  fade.style.position = 'fixed';
  fade.style.inset = '0';
  fade.style.background = 'black';
  fade.style.opacity = '0';
  fade.style.pointerEvents = 'none';
  fade.style.zIndex = '999999';

  document.body.appendChild(fade);

  await fade.animate(
    [
      { opacity: 0 },
      { opacity: 1 }
    ],
    {
      duration: 2000,
      easing: 'ease',
      fill: 'forwards'
    }
  ).finished;

  const player = engine.currentScene.actors.find(
    actor => actor.constructor.name === 'PlayerOne'
  );

  if (player) {
    PlayerState.x = player.pos.x;
    // PlayerState.y = player.pos.y;
    PlayerState.health = player.health;
  }

  engine.goToScene(sceneName);

  await new Promise(resolve => setTimeout(resolve, 200));

  await fade.animate(
    [
      { opacity: 1 },
      { opacity: 0 }
    ],
    {
      duration: 2000,
      easing: 'ease',
      fill: 'forwards'
    }
  ).finished;

  fade.remove();

  PlayerState.isSwitchingScene = false;
  isFading = false;
}