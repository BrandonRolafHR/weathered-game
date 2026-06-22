import { Actor, Sprite, Vector, Keys, CollisionType, DegreeOfFreedom, SolverStrategy } from "excalibur"
import { Resources } from '../resources.js'
import { Player } from './player.js'
import { Barrier } from "./barrier.js";
import { Newspaper } from "./Newspaper.js";
import { PlayerState } from './playerstate.js';

export class PlayerOne extends Player {

    onInitialize(engine) {
        this.playerone = Resources.PlayerOne.toSprite();

        this.graphics.use(this.playerone);

        // this.pos = new Vector(150, 600);
        this.pos = new Vector(PlayerState.x, PlayerState.y);
        this.scale = new Vector(0.09, 0.09);
        this.body.useGravity = true;
        this.body.collisionType = CollisionType.Active;
        this.body.limitDegreeOfFreedom.push(DegreeOfFreedom.Rotation);
        this.pageCount = 0;
    }

    onPreUpdate(engine, delta) {

        if (engine.input.keyboard.wasPressed(Keys.ArrowUp) && this.onTheGround) {
            this.body.applyLinearImpulse(new Vector(0, -350 * delta));
        }

        if (engine.input.keyboard.isHeld(Keys.ArrowRight)) {
            this.vel = new Vector(200, this.vel.y)
        }
        else if (engine.input.keyboard.isHeld(Keys.ArrowLeft)) {
            this.vel = new Vector(-200, this.vel.y)
        }
        else {
            this.vel = new Vector(0, this.vel.y)
        }
    }

    onCollisionStart(event, other) {
        if (other.owner instanceof Barrier) {
            this.onTheGround = true;
        }
        if (other.owner instanceof Newspaper) {
            console.log('Player collided with the newspaper');
            this.pageCount++;
            other.owner.showPage(this.pageCount);
        }
    }

    onCollisionEnd(event, other) {
        if (other.owner instanceof Barrier) {
            this.onTheGround = false;
        }
    }

}
