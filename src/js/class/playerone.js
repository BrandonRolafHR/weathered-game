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

    facingRight = true;

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
        if (engine.input.keyboard.wasPressed(Keys.ArrowUp) || engine.input.keyboard.wasPressed(Keys.W) && this.onTheGround) {
            this.body.applyLinearImpulse(new Vector(0, -5000));
            this.onTheGround = false;
            Resources.JumpSound.play();
            if (this.jump) {
                const j = this.jump.clone();
                j.flipHorizontal = this.facingRight;
                this.graphics.use(j);
            }
        }

        if (engine.input.keyboard.isHeld(Keys.ArrowRight) || engine.input.keyboard.isHeld(Keys.D)) {
            this.vel = new Vector(200, this.vel.y)
            this.facingRight = true;
        }
        else if (engine.input.keyboard.isHeld(Keys.ArrowLeft) || engine.input.keyboard.isHeld(Keys.A)) {
            this.vel = new Vector(-200, this.vel.y)
            this.facingRight = false;
        }
        else {
            this.vel = new Vector(0, this.vel.y)
        }

        if (this.onTheGround) {
            if (this.vel.x !== 0) {
                if (this.sprint) {
                    // use the instance animation directly (was working previously)
                    this.sprint.flipHorizontal = !this.facingRight;
                    this.graphics.use(this.sprint);
                }
            } else if (this.playerone) {
                const p = this.playerone.clone();
                p.flipHorizontal = !this.facingRight;
                this.graphics.use(p);
            }
        } else if (this.jump) {
            const j2 = this.jump.clone();
            j2.flipHorizontal = this.facingRight;
            this.graphics.use(j2);
        }

        //video afspelen
        if (this.pageCount === 5) {
            this.onFinnish()
        }
    }

    onCollisionStart(event, other) {
        if (other.owner instanceof Barrier || other.owner instanceof Platform) {
            this.onTheGround = true;
            this.graphics.use(this.playerone);
        }

        if (other.owner instanceof Newspaper) {
            Resources.Pickup.play();
            
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
