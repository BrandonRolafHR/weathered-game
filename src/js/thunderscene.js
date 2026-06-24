import '../css/style.css'
import { Actor, Scene, BoundingBox, Sprite, Vector, Keys, CollisionType, DegreeOfFreedom, SolverStrategy, Timer, Axis } from "excalibur"
import { Resources } from './resources.js'
import { ThunderBackground } from "./class/thunderbackground.js";
import { ThunderPlatform } from "./class/thunderplatform.js";
import { Player } from './class/player.js';
import { PlayerOne } from './class/playerone.js';
import { Barrier } from './class/barrier.js';
import { IncomingLightning } from './class/incominglightning.js';
import { Lightning } from './class/lightning.js';
import { HealthBar } from './class/HealthBar.js';
import { Background } from './class/background.js';
import { Ground } from './class/ground.js';

export class ThunderScene extends Scene {
    onActivate() {
        this.clear();
        this.startGame();

        this.HealthBar = new HealthBar();
        this.add(this.HealthBar);
    }

    startGame() {
        //load backgrounds
        const loadBackground1 = new ThunderBackground();
        loadBackground1.pos = new Vector(0, 0)
        this.add(loadBackground1);

        const loadBackground2 = new ThunderBackground();
        loadBackground2.pos = new Vector(1280, 0)
        this.add(loadBackground2);

        const loadBackground3 = new ThunderBackground();
        loadBackground3.pos = new Vector(2560, 0)
        this.add(loadBackground3);

        //load grounds
        const loadGround1 = new ThunderPlatform();
        loadGround1.pos = new Vector(640, 670)
        this.add(loadGround1);

        const loadGround2 = new ThunderPlatform();
        loadGround2.pos = new Vector(1920, 670)
        this.add(loadGround2);

        const loadGround3 = new ThunderPlatform();
        loadGround3.pos = new Vector(3200, 670);
        this.add(loadGround3);

        const loadBarrier = new Barrier();
        this.add(loadBarrier);

        //add player
        const player = new PlayerOne()
        this.add(player)
        
        //lock camera to player
        this.camera.strategy.lockToActor(player)
        this.camera.strategy.limitCameraBounds(new BoundingBox(0, 0, 3840, 720))

        this.thunderWeather()
    }

    thunderWeather() {
        const nextStrike = Math.random() * 6000 + 1000;

        const timer = new Timer({
            interval: nextStrike,
            repeats: false,
            action: () => {

                this.thunderStrike();

                this.thunderWeather();
            }
        });

        this.add(timer);
        timer.start();
    }

    thunderStrike() {

        const randomX = Math.random() * this.engine.drawWidth;

        const incomingLightning = new IncomingLightning(
            randomX,
            500
        );

        this.add(incomingLightning);

        const timer = new Timer({
            interval: 1000,
            repeats: false,
            action: () => {

                const lightning = new Lightning(
                    randomX,
                    300
                );

                this.add(lightning);
            }
        });

        this.add(timer);
        timer.start();
    }
}