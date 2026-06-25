import { Actor, Sprite, Vector, Keys, CollisionType, DegreeOfFreedom, SolverStrategy, EngineEvents, Engine } from "excalibur"
import { Resources } from '../resources.js';
import { PlayerState } from './playerstate.js';
import { Water } from "./water.js";
import { DeathScene } from "../deathscene.js";
import { Barrier } from "./barrier.js";
import { Newspaper } from "./Newspaper.js";
import { LevelSwitcher } from "../levelswitcher.js";

export class Player extends Actor {

    videoOverlay = document.getElementById('video-overlay')
    videoPlayer = document.getElementById('video')
    pageCount = 0;

    constructor(x, y) {
        super({
            x: x,
            y: y,
            width: 900,
            height: 750,
        })
        this.health = PlayerState.health ?? 3;
    }

    onInitialize(engine) {
        this.playerone = Resources.PlayerOne.toSprite();

        this.graphics.use(this.playerone);

        this.pos = new Vector(150, 660);
        this.scale = new Vector(0.09, 0.09);
        this.body.useGravity = true;
        this.body.collisionType = CollisionType.Active;
        this.body.limitDegreeOfFreedom.push(DegreeOfFreedom.Rotation);
        this.pos = new Vector(PlayerState.x, PlayerState.y);
        this.health = PlayerState.health;
    }

    onActivate() {
        this.pageCount = PlayerState.pageCount
    }

    onPreUpdate(engine, delta) {

        if (engine.input.keyboard.wasPressed(Keys.ArrowUp) && this.onTheGround || engine.input.keyboard.wasPressed(Keys.W) && this.onTheGround) {
            this.body.applyLinearImpulse(new Vector(0, -3500));
        }

        if (engine.input.keyboard.isHeld(Keys.ArrowRight) || engine.input.keyboard.isHeld(Keys.D)) {
            this.vel = new Vector(200, this.vel.y)
        }
        else if (engine.input.keyboard.isHeld(Keys.ArrowLeft || engine.input.keyboard.isHeld(Keys.A))) {
            this.vel = new Vector(-200, this.vel.y)
        }
        else {
            this.vel = new Vector(0, this.vel.y)
        }

        //video afspelen
            if (this.pageCount === 5) {
                this.onFinnish()
            }
    }

    onCollisionStart(event, other, engine) {
        if (other.owner instanceof Barrier) {
            this.onTheGround = true;
        }
        if (other.owner instanceof Newspaper) {
            console.log('Player collided with the newspaper');
            this.pageCount++;
            other.owner.showPage(this.pageCount);

            

            
        }
        
    }

    takeDamage(engine) {
        if(PlayerState.isSwitchingScene) return;

        this.health--;

        PlayerState.health = this.health;

        const healthBar = this.scene.HealthBar;
        healthBar.setHealth(this.health);

        this.graphics.use(Resources.Damaged.toSprite());

        if(this.health > 0){
            setTimeout(() => {
                this.graphics.use(Resources.PlayerOne.toSprite());
            }, 300);
        }

        if (this.health <= 0) {
            this.graphics.use(Resources.Dead.toSprite());
            setTimeout(() => {
            this.kill()

            //naar de deathscreen
            this.scene.engine.levelSwitcher.stop()
            this.scene.clear()
            this.scene.engine.add('deathscene', new DeathScene)
            this.scene.engine.goToScene('deathscene')
        }, 3000);
        }
    }

    onCollisionEnd(event, other) {
        if (other.owner instanceof Barrier) {
            this.onTheGround = false;
        }
    }

    onFinnish() {
        if (this.videoOverlay) {
            this.videoOverlay.style.position = 'absolute';
            this.videoOverlay.style.top = '0';
            this.videoOverlay.style.left = '0';
            this.videoOverlay.style.width = '100vw';
            this.videoOverlay.style.height = '100vh';
            this.videoOverlay.style.zIndex = '9999';
            this.videoOverlay.style.display = 'block';
            // this.videoOverlay.classList.add('video-play')
            console.log(this.videoOverlay)
        }

        this.videoPlayer.src = './images/shutdown.mp4'
        this.videoPlayer.load()
        this.videoPlayer.play()

        setTimeout(() => {
            this.videoPlayer.pause()
            this.videoPlayer.currentTime = 0
            // this.videoOverlay.classList.remove('video-play')
            this.videoOverlay.style.display = 'none'
        }, 3000)
    }
}
