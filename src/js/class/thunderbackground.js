import { Actor, Vector } from "excalibur"
import { Resources } from '../resources.js'

export class ThunderBackground extends Actor {
    constructor() {
        super({})
        this.anchor = new Vector(0, 0)
        this.z = -2
    }

    onInitialize(engine) {
        this.graphics.use(Resources.ThunderBackground.toSprite())
    }
}