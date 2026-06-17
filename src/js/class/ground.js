import { Actor, Vector } from "excalibur"
import { Resources } from '../resources.js'

export class Ground extends Actor {

    constructor(x, y) {
        super({
            x: x,
            y: y,
            width: 1280,
            height: 30,
        })
    }

    onInitialize(engine) {
        this.graphics.use(Resources.Ground.toSprite());
        this.pos = new Vector(640, 555)

    }
}