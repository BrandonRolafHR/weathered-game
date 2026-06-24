import { Actor, Vector, CollisionType } from "excalibur"
import { Resources } from '../resources.js'

export class Barrier extends Actor {
    constructor(x, y) {
        super({
            x: x,
            y: y,
            width: 3840,
            height: 30,
        })
    
        this.pos = new Vector(1920, 620)
        this.body.collisionType = CollisionType.Fixed
    }
}