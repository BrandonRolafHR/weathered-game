import { Actor, CollisionType, Vector} from 'excalibur';
import { Resources } from '../resources.js'
import { Page } from './page.js'

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
    this.scene.engine.showingPage = true;
    this.scene.engine.pause();

    this.scene.add(new Page(pageCount));
    this.kill();
  }

}

