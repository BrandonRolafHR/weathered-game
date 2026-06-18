import { Actor, CollisionType } from 'excalibur';
import { Resources } from '../resources.js'

export class Branch extends Actor {
  constructor(x, y) {
    super({
      x,
      y,
      width: 64,
      height: 32,
      collisionType: CollisionType.Fixed
    });

    this.graphics.use(Resources.Branch.toSprite());
  }

  onInitialize(engine) {
    this.on('collisionstart', (event) => {
      const other = event.other.owner;

      if (other && other.takeDamage) {
        other.takeDamage(1);
      }
    });
  }
}