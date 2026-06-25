import { Actor, Sprite, Vector, Keys, CollisionType, DegreeOfFreedom, SolverStrategy } from "excalibur"
import { Resources } from '../resources.js'
import { Player } from './player.js'
import { Barrier } from "./barrier.js";
import { Newspaper } from "./Newspaper.js";
import { PlayerState } from './playerstate.js';
import { Lightning } from "./lightning.js";
import { Water } from "./water.js";
import { Platform } from "./platfrom.js";
import { LevelSwitcher } from "../levelswitcher.js";


export class PlayerOne extends Player {

    onInitialize(engine) {
        super.onInitialize(engine)

        this.playerone = Resources.PlayerOne.toSprite();

        this.graphics.use(this.playerone);

        // this.pos = new Vector(150, 600);
        this.pos = new Vector(PlayerState.x, PlayerState.y);
        this.scale = new Vector(0.09, 0.09);
        this.body.useGravity = true;
        this.body.collisionType = CollisionType.Active;
        this.body.limitDegreeOfFreedom.push(DegreeOfFreedom.Rotation);
    }

    onPreUpdate(engine, delta) {

        if (engine.input.keyboard.wasPressed(Keys.ArrowUp) && this.onTheGround || engine.input.keyboard.wasPressed(Keys.W) && this.onTheGround) {
            this.body.applyLinearImpulse(new Vector(0, -350 * delta));
        }

        if (engine.input.keyboard.isHeld(Keys.ArrowRight) || engine.input.keyboard.isHeld(Keys.D)) {
            this.vel = new Vector(200, this.vel.y)
        }
        else if (engine.input.keyboard.isHeld(Keys.ArrowLeft) || engine.input.keyboard.isHeld(Keys.A)) {
            this.vel = new Vector(-200, this.vel.y)
        }
        else {
            // this.vel = new Vector(0, this.vel.y)
            this.vel = new Vector(this.vel.x * 0.9, this.vel.y)
        }
    }

    onCollisionStart(event, other) {
        if (other.owner instanceof Barrier || other.owner instanceof Platform) {
            this.onTheGround = true;
        }

        if (other.owner instanceof Newspaper) {
            console.log('Player collided with the newspaper');
            PlayerState.pageCount++;
            other.owner.showPage(PlayerState.pageCount);
            this.scene.engine.levelSwitcher.stop()
            
        }

        if (other.owner instanceof Lightning || other.owner instanceof Water) {
            console.log('Ouch!');
            this.takeDamage();
        }
    }

    onCollisionEnd(event, other) {
        if (other.owner instanceof Barrier || other.owner instanceof Platform) {
            this.onTheGround = false;
        }
    }

}
