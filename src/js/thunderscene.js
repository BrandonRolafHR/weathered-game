import '../css/style.css'
import { Actor, Scene, BoundingBox, Sprite, Vector, Keys, CollisionType, DegreeOfFreedom, SolverStrategy, Timer } from "excalibur"
import { Resources } from './resources.js'
import { ThunderBackground } from "./class/thunderbackground.js";
import { ThunderPlatform } from "./class/thunderplatform.js";
import { Player } from './class/player.js';
import { PlayerOne } from './class/playerone.js';
import { Barrier } from './class/barrier.js';
import { IncomingLightning } from './class/incominglightning.js';
import { Lightning } from './class/lightning.js';

export class ThunderScene extends Scene {
    onActivate() {
        this.clear();
        this.startGame();

        this.HealthBar = new HealthBar();
        this.add(this.HealthBar);
    }

    startGame() {
        const loadThunderBackground = new ThunderBackground();
        this.add(loadThunderBackground);

        const loadThunderPlatform = new ThunderPlatform();
        this.add(loadThunderPlatform);

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