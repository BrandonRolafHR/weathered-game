import { Actor, Vector } from "excalibur";
import { Resources } from "../resources";

export class Water extends Actor {

    number = 0;
    yPos = 0

    constructor(order) {
        super({
            width: Resources.Water.width,
            height: Resources.Water.height - 100
        })
        this.number = order
    }

    onInitialize(engine) {
        this.on('exitviewport', (e) => this.newPos())

        console.log(this.number)

        this.graphics.use(Resources.Water.toSprite())
        this.vel = new Vector(100, 10)

        if(this.number === 1) {
            this.pos = new Vector(640, 850)
        } else if(this.number === 2) {
            this.pos = new Vector(-638, 850)
        }
    }

    newPos() {
        this.yPos = this.pos.y
        console.log(this.yPos)
        this.pos = new Vector(-638, this.yPos)
    }

    onPreUpdate() {
        if(this.pos.y >= 900) {
            this.vel.y = this.vel.y * -1
        } else if (this.pos.y <= 750) {
            this.vel.y = this.vel.y * -1
        }
    }
}