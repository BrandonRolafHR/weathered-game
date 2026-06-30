import { Actor, CollisionType, Vector } from 'excalibur';
import { Resources } from '../resources.js'
import { Page } from './page.js'
import { PlayerState } from './playerstate.js';

export class Newspaper extends Actor {
  constructor(x, y) {
    super({
      x,
      y,
      collisionType: CollisionType.Fixed,
      radius: Resources.NewsPaper.width / 2
    });
    this.scale = new Vector(0.16, 0.16);
    this.graphics.use(Resources.NewsPaper.toSprite());
  }

  showPage(pageCount) {
    console.log(`Page ${pageCount} of the newspaper is shown.`);
    console.log("PlayerState.pageCount:", PlayerState.pageCount);

    this.scene.engine.showingPage = true;
    this.scene.engine.pausePage();
    this.scene.engine.body.classList.remove('paused');

    this.scene.add(new Page(pageCount));
    this.kill();
  }
}

