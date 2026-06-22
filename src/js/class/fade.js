import { PlayerState } from './playerstate.js';

export async function fadeToScene(engine, sceneName) {
  PlayerState.isSwitchingScene = true;

  const fade = document.createElement('div');

  fade.style.position = 'fixed';
  fade.style.inset = '0';
  fade.style.background = 'black';
  fade.style.opacity = '0';
  fade.style.pointerEvents = 'none';
  fade.style.transition = 'opacity 2s ease';
  fade.style.zIndex = '999999';

  document.body.appendChild(fade);

  await new Promise(resolve => requestAnimationFrame(resolve));

  fade.style.opacity = '1';

  await new Promise(resolve => setTimeout(resolve, 2000));

  const player = engine.currentScene.actors.find(
    actor => actor.constructor.name === 'PlayerOne'
  );

  if (player) {
    PlayerState.x = player.pos.x;
    PlayerState.y = player.pos.y;
    PlayerState.health = player.health;

    console.log(PlayerState)
  }

  engine.goToScene(sceneName);

  fade.style.opacity = '0';

  await new Promise(resolve => setTimeout(resolve, 2000));

  fade.remove();

  PlayerState.isSwitchingScene = false;
}