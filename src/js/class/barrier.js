import { Actor, Vector, CollisionType } from "excalibur"
import { Resources } from '../resources.js'

export class Barrier extends Actor {
    constructor(x, y) {
        super({
            x: x,
            y: y,
            width: 1280,
            height: 30,
        })
    
        this.pos = new Vector(640, 710)
        this.body.collisionType = CollisionType.Fixed
    }
}