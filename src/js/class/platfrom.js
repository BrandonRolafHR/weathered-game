import { Actor, Vector, CollisionType } from "excalibur"
import { Resources } from '../resources.js'

export class Platform extends Actor {
    constructor(x, y, size) {
        super({
            x: x,
            y: y,
            width: Resources.Platform.width,
            height: Resources.Platform.height
        })

        this.body.collisionType = CollisionType.Fixed
    }

    onInitialize(){
        this.graphics.use(Resources.Platform.toSprite())
        
        this.scale = new Vector(0.5, 0.5)
    }
}