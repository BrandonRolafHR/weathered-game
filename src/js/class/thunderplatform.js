import { Actor, Vector, CollisionType } from "excalibur"
import { Resources } from '../resources.js'

export class ThunderPlatform extends Actor {

    constructor() {
        super({})
    }

    onInitialize(engine) {
        this.graphics.use(Resources.ThunderPlatform.toSprite());
    }
}