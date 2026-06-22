import { Actor, Vector, CollisionType, DegreeOfFreedom } from "excalibur";
import { Resources } from '../resources.js';

export class Lightning extends Actor {
    constructor(x, y) {
        super({
            x,
            y,
            width: 120,
            height: 1100,
            collisionType: CollisionType.Active,
        });
    }

    onInitialize(engine) {

        const sprite = Resources.Lightning.toSprite();

        if (Math.random() < 0.5) {
            sprite.flipHorizontal = true;
        }

        this.graphics.use(sprite);

        this.scale = new Vector(0.6, 0.6);

        this.body.useGravity = false;
        this.body.collisionType = CollisionType.Active;
        this.body.limitDegreeOfFreedom.push(DegreeOfFreedom.Rotation);

        this.actions.delay(1000);
        this.actions.callMethod(() => {
            this.kill();
        });
    }

    startThunder() {
        
    }

    lightningStrike() {
        
    }

}