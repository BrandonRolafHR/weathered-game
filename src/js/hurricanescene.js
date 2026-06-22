import {
  Scene,
  Actor,
  Vector,
  CollisionType,
  Color,
  Rectangle
} from 'excalibur';

import { Resources } from './resources.js';
import { PlayerOne } from './class/playerone.js';
import { Barrier } from './class/barrier.js';

class HurricaneBackground extends Actor {
  constructor() {
    super({
      x: 640,
      y: 360,
      width: 1280,
      height: 720
    });

    this.z = -10;
  }

  onInitialize() {
    this.graphics.use(Resources.HurricaneBackground.toSprite());
  }
}

class WindParticle extends Actor {
  constructor(x, y) {
    super({
      x,
      y,
      width: 260,
      height: 4,
      collisionType: CollisionType.PreventCollision
    });

    const length = 120 + Math.random() * 300;

    this.speed = 700 + Math.random() * 600;
    this.z = 100;
    this.rotation = -0.18;

    this.graphics.use(
      new Rectangle({
        width: length,
        height: 3,
        color: Color.fromRGB(220, 240, 255, 0.55)
      })
    );
  }

  onPreUpdate(engine, delta) {
    const seconds = delta / 1000;

    this.pos.x -= this.speed * seconds;
    this.pos.y += 80 * seconds;

    if (this.pos.x < -300) {
      this.pos.x = engine.drawWidth + 300;
      this.pos.y = Math.random() * engine.drawHeight;
    }

    if (this.pos.y > engine.drawHeight + 50) {
      this.pos.y = -50;
    }
  }
}

class FlyingDebris extends Actor {
  constructor(x, y) {
    super({
      x,
      y,
      width: 16,
      height: 8,
      collisionType: CollisionType.PreventCollision
    });

    this.speed = 300 + Math.random() * 500;
    this.rotationSpeed = -6 + Math.random() * 12;
    this.z = 120;

    this.graphics.use(
      new Rectangle({
        width: 10 + Math.random() * 14,
        height: 5,
        color: Color.fromHex('#5a3a18')
      })
    );
  }

  onPreUpdate(engine, delta) {
    const seconds = delta / 1000;

    this.pos.x -= this.speed * seconds;
    this.pos.y += Math.sin(this.pos.x * 0.02) * 3;
    this.rotation += this.rotationSpeed * seconds;

    if (this.pos.x < -80) {
      this.pos.x = engine.drawWidth + 100;
      this.pos.y = Math.random() * engine.drawHeight;
    }
  }
}

export class HurricaneScene extends Scene {
  onActivate() {
    this.clear();
    this.startGame();
  }

  startGame() {
    this.add(new HurricaneBackground());

    this.add(new Barrier());
    this.add(new PlayerOne());

    this.spawnWindParticles();
    this.spawnDebris();
  }

  onPreUpdate(engine, delta) {
    const player = this.actors.find(actor => actor instanceof PlayerOne);

    if (!player) return;

    // Gusting wind: strength goes up and down over time
    const time = Date.now() * 0.003;
    const windStrength = 8 + Math.sin(time) * 6;

    player.vel = new Vector(
      player.vel.x - windStrength,
      player.vel.y
    );
  }

  spawnWindParticles() {
    for (let i = 0; i < 120; i++) {
      this.add(
        new WindParticle(
          Math.random() * 1280,
          Math.random() * 720
        )
      );
    }
  }

  spawnDebris() {
    for (let i = 0; i < 30; i++) {
      this.add(
        new FlyingDebris(
          Math.random() * 1280,
          Math.random() * 720
        )
      );
    }
  }
}