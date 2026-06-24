import { Actor, Vector } from "excalibur"
import { Resources } from '../resources.js'

export class Ground extends Actor {

    constructor() {
        super({})
        this.z = -1
    }

    onInitialize(engine) {
        this.graphics.use(Resources.Ground.toSprite());
    }
}