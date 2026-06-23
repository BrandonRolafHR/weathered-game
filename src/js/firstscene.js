import '../css/style.css'
import { Actor, Engine, Scene, Vector, DisplayMode, randomInRange, CollisionType, DegreeOfFreedom, SolverStrategy, Label, FontUnit, Font, Color, Timer, BoundingBox } from "excalibur"
import { Resources, ResourceLoader } from './resources.js';
import { Game } from './game.js';
import { ThunderScene } from './thunderscene.js';
import { Player } from './class/player.js';
import { PlayerOne } from './class/playerone.js';
import { Barrier } from './class/barrier.js';
import { Background } from './class/background.js';
import { Ground } from './class/ground.js';
import { Branch } from './class/branch.js';
import { Newspaper } from './class/Newspaper.js';

export class FirstScene extends Scene {

    onActivate() {
        this.clear();
        this.startGame();

        const delay = randomInRange(10000, 15000);
    }
    

    startGame() {
        //add player
        const player = new PlayerOne()
        this.add(player)
        
        //lock camera to player
        this.camera.strategy.lockToActor(player)
        this.camera.strategy.limitCameraBounds(new BoundingBox(0, 0, 3840, 720))

        const loadBarrier = new Barrier();
        this.add(loadBarrier);

        const loadBackground = new Background();
        this.add(loadBackground);

        const loadGround = new Ground();
        this.add(loadGround);

        const branch = new Branch(500, 400);
        this.add(branch);

        const newspaper = new Newspaper(700, 600);
        this.add(newspaper);

        const newspaper2 = new Newspaper(900, 600);
        this.add(newspaper2);
    }
}