import '../css/style.css'
import { Actor, Scene, Sprite, Vector, Keys, CollisionType, DegreeOfFreedom, SolverStrategy, Timer } from "excalibur"
import { Resources } from './resources.js'
import { ThunderBackground } from "./class/thunderbackground.js";
import { ThunderPlatform } from "./class/thunderplatform.js";
import { Player } from './class/player.js';
import { PlayerOne } from './class/playerone.js';
import { Barrier } from './class/barrier.js';
import { Lightning } from './class/lightning.js';

export class ThunderScene extends Scene {
    onActivate() {
        // this.clear();
        this.startGame();
    }

    startGame() {
        const loadThunderBackground = new ThunderBackground();
        this.add(loadThunderBackground);

        const loadThunderPlatform = new ThunderPlatform();
        this.add(loadThunderPlatform);

        const loadBarrier = new Barrier();
        this.add(loadBarrier);

        const loadPlayerOne = new PlayerOne();
        this.add(loadPlayerOne);

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

        const lightning = new Lightning(
            randomX,
            600
        );

        this.add(lightning);
    }
}