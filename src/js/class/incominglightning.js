import { Actor, Vector, CollisionType, DegreeOfFreedom } from "excalibur";
import { Resources } from '../resources.js';

export class IncomingLightning extends Actor {
    constructor(x, y) {
        super({
            x,
            y,
        });
    }

    onInitialize(engine) {
        const sprite = Resources.IncomingLightning.toSprite();

        this.graphics.use(sprite);

        this.scale = new Vector(0.35, 0.35);

        this.actions.delay(1000);
        this.actions.callMethod(() => {
            this.kill();
        });
    }

}