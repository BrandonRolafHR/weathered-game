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
        //info for Actor
        this.graphics.use(Resources.Water.toSprite())
        this.vel = new Vector(100, 10)

        //pos for two diffirent
        if(this.number === 1) {
            this.pos = new Vector(640, 850)
        } else if(this.number === 2) {
            this.pos = new Vector(1920, 850)
        } else if (this.number === 3) {
            this.pos = new Vector(3200, 850)
        } else if (this.number === 4) {
            this.pos = new Vector(-640, 850)
        }
    }

    //function for the new pos whenout of bounds
    newPos() {
        this.yPos = this.pos.y
        this.pos = new Vector(-640, this.yPos)
    }

    //waves up and down
    onPreUpdate() {
        if(this.pos.y >= 900) {
            this.vel.y = this.vel.y * -1
        } else if (this.pos.y <= 750) {
            this.vel.y = this.vel.y * -1
        }

        if (this.pos.x >= 4480) {
            this.newPos()
        }
    }
}