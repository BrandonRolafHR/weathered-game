import { Actor, Sprite, Vector, Keys } from "excalibur"
import { Resources } from '../resources.js'

export class Cowboy extends Actor {
    constructor(x, y) {
        super({
            x: x,
            y: y,
            width: 1280,
            height: 720,
        })
    }

    onInitialize(engine) {
        this.graphics.use(Resources.Cowboy.toSprite())
        this.pos = new Vector(150, 650)
        this.scale = new Vector(0.1, 0.1)

        if (engine.input.keyboard.wasPressed(Keys.Space)) {
            this.scene.add(new Bullet(this.pos.x, this.pos.y))
        }
    }

}
