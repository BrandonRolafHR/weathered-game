import { Actor, CollisionType, Color } from "excalibur";

export class BarrierWall extends Actor {
    constructor() {
        super({
            x: 0,
            y: 360,
            width: 2,
            height: 720,
            collisionType: CollisionType.Fixed
        });

        this.color = Color.Transparent;
    }
}