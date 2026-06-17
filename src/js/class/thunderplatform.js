import { Actor, Vector, CollisionType } from "excalibur"
import { Resources } from '../resources.js'

export class ThunderPlatform extends Actor {

    constructor(x, y) {
        super({
            x: x,
            y: y,
            width: 1280,
            height: 30,
        })
    }

    onInitialize(engine) {
        this.graphics.use(Resources.ThunderPlatform.toSprite());
        this.pos = new Vector(640, 600)
    }
}