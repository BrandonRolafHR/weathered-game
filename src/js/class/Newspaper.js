import { Actor, CollisionType, Vector } from 'excalibur';
import { Resources } from '../resources.js'

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
}