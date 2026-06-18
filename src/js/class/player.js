import { Actor, Sprite, Vector, Keys, CollisionType, DegreeOfFreedom, SolverStrategy } from "excalibur"
import { Resources } from '../resources.js'

export class Player extends Actor {

    videoOverlay = document.getElementById('video-overlay')
    videoPlayer = document.getElementById('video')

    constructor(x, y) {
        super({
            x: x,
            y: y,
            width: 900,
            height: 750,
        })
        this.health = 3;
    }

    onInitialize(engine) {
        this.playerone = Resources.PlayerOne.toSprite();

        this.graphics.use(this.playerone);

        this.pos = new Vector(150, 660);
        this.scale = new Vector(0.09, 0.09);
        this.body.useGravity = true;
        this.body.collisionType = CollisionType.Active;
        this.body.limitDegreeOfFreedom.push(DegreeOfFreedom.Rotation);
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
        //if bij de note oppakken
        if (this.videoOverlay) {
            this.videoOverlay.style.position = 'absolute';
            this.videoOverlay.style.top = '0';
            this.videoOverlay.style.left = '0';
            this.videoOverlay.style.width = '1280px';
            this.videoOverlay.style.height = '720px';
            this.videoOverlay.style.zIndex = '9999';
            this.videoOverlay.style.display = 'block';
            //this.videooverlay.classlist.add is beter en het moet allemaal in de css class.
        }
        //video afspelen
        // this.videoPlayer.src = './images/shutdown.mp4'
        // this.videoPlayer.load()
        // this.videoPlayer.play()
    }
    // takeDamage(amount) {
    //     this.health -= amount;
    //     console.log('Player health:', this.health);

    //     if (this.health <= 0) {
    //         console.log('Player dood');
    //         this.goToSCene
    //     }
    // }
    onCollisionEnd(event, other) {
        if (other.owner instanceof Barrier) {
            this.onTheGround = false;
        }
    }

} 
