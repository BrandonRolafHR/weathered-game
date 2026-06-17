import '../css/style.css'
import { Actor, Engine, Scene, Vector, DisplayMode, randomInRange, CollisionType, DegreeOfFreedom, SolverStrategy, Label, FontUnit, Font, Color, Timer } from "excalibur"
import { Resources, ResourceLoader } from './resources.js'
import { Player } from './class/player.js';
import { PlayerOne } from './class/playerone.js';
import { Barrier } from './class/barrier.js';
import { Background } from './class/background.js';
import { Ground } from './class/ground.js';
import { Branch } from './class/branch.js';

export class FirstScene extends Scene {

    onActivate() {
        this.startGame();
    }

    startGame() {
        // const loadPlayerOne = new PlayerOne();
        // this.add(loadPlayerOne);

        this.add(new PlayerOne());

        const loadBarrier = new Barrier();
        this.add(loadBarrier);

        const loadBackground = new Background();
        this.add(loadBackground);

        const loadGround = new Ground();
        this.add(loadGround);

        const branch = new Branch(500, 400);
        this.add(branch);
    }
}