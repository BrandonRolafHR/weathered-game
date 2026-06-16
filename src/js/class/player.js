import { Actor, Sprite, Vector, Keys, CollisionType, DegreeOfFreedom, SolverStrategy } from "excalibur"
import { Resources } from '../resources.js'

export class Player extends Actor {
    constructor(x, y) {
        super({
            x: x,
            y: y,
            width: 900,
            height: 750,
        })
    }


} 
