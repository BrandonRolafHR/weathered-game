import { Actor, CollisionType, Sprite, Vector } from "excalibur"
import { Resources } from '../resources.js'

export class Bullet extends Actor {
    constructor() {
        super({
            width: Resources.Bullet.width,
            height: Resources.Bullet.height,
            collisionType : CollisionType.Active
        })
    }

    onInitialize(engine) {

        this.graphics.use(Resources.Bullet.toSprite())
        this.pos = new Vector(175, 618)
        this.vel = new Vector(1290, 680)
        this.scale = new Vector(0.03, 0.03)

        this.on("exitviewport", () => {
            this.kill()
        })
    }

    // onCollisionStart(self, other, side, contact) {
    //     if(other.owner instanceof Bandit) {
    //         other.owner.kill();
    //     }
    // }
    
}