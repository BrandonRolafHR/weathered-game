import { Actor } from "excalibur"
import { Resources } from '../resources.js'

export class Background extends Actor {
    constructor() {
        super({
            x: 640,
            y: 360,
            width: 1280,
            height: 720
        })
        this.z = -2
    }

    onInitialize(engine) {
        this.graphics.use(Resources.Background.toSprite())
    }
}