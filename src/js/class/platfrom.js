import { Actor, CollisionType } from "excalibur";
import { Resources } from "../resources.js";

export class Platform extends Actor {

    constructor(x, y, width = 200, height = 40) {
        super({
            x: x,
            y: y,
            width: width,
            height: height,
        });

        this.body.collisionType = CollisionType.Fixed;
    }

    onInitialize() {

        const sprite = Resources.Platform.toSprite();

        sprite.width = this.width;
        sprite.height = this.height;

        this.graphics.use(sprite);
    }
}