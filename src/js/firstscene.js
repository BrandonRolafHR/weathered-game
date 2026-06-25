import '../css/style.css'
import { Actor, Engine, Scene, Vector, DisplayMode, randomInRange, CollisionType, DegreeOfFreedom, SolverStrategy, Label, FontUnit, Font, Color, Timer, BoundingBox, vec } from "excalibur"
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
import { HealthBar } from './class/HealthBar.js';
import { Platform } from './class/platfrom.js';

export class FirstScene extends Scene {

    onActivate() {
        this.clear();

        this.HealthBar = new HealthBar();
        this.add(this.HealthBar);
        
        this.startGame();
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

        //load backgrounds
        const loadBackground1 = new Background();
        loadBackground1.pos = new Vector(0, 0)
        this.add(loadBackground1);

        const loadBackground2 = new Background();
        loadBackground2.pos = new Vector(1280, 0)
        this.add(loadBackground2);

        const loadBackground3 = new Background();
        loadBackground3.pos = new Vector(2560, 0)
        this.add(loadBackground3);

        //load grounds
        const loadGround1 = new Ground();
        loadGround1.pos = new Vector(640, 670)
        this.add(loadGround1);

        const loadGround2 = new Ground();
        loadGround2.pos = new Vector(1920, 670)
        this.add(loadGround2);

        const loadGround3 = new Ground();
        loadGround3.pos = new Vector(3200, 670);
        this.add(loadGround3);

        const newspaper = new Newspaper(160, 135);
        this.add(newspaper);

        const newspaper2 = new Newspaper(2435, 600);
        this.add(newspaper2);

        const newspaper3 = new Newspaper(2410, 85);
        this.add(newspaper3);

        const newspaper4 = new Newspaper(3750, 210);
        this.add(newspaper4);

        const newspaper5 = new Newspaper(1220, 80);
        this.add(newspaper5);

        const platform0 = new Platform(150, 175);
        this.add(platform0);
        
        const platform1 = new Platform(500, 500);
        this.add(platform1);

        const platform2 = new Platform(750, 400);
        this.add(platform2);

        const platform3 = new Platform(550, 250);
        this.add(platform3);

        const platform4 = new Platform(1150, 400);
        this.add(platform4);

        const platform5 = new Platform(1550, 350);
        this.add(platform5)

        const platform6 = new Platform(800, 125);
        this.add(platform6);

        const platform7 = new Platform(1200, 120);
        this.add(platform7);

        const platform8 = new Platform(1980, 450);
        this.add(platform8);

        const platform9 = new Platform(1800, 500);
        this.add(platform9);

        const platform10 = new Platform(2200, 300);
        this.add(platform10);

        const platform11 = new Platform(1975, 150);
        this.add(platform11);

        const platform12 = new Platform(2400, 125);
        this.add(platform12);

        const platform13 = new Platform(2450, 450);
        this.add(platform13);

        const platform14 = new Platform(2750, 300);
        this.add(platform14);

        const platform15 = new Platform(3200, 300);
        this.add(platform15);

        const platform16 = new Platform(3450, 450);
        this.add(platform16);

        const platform17 = new Platform(3250, 500);
        this.add(platform17);

        const platform18 = new Platform(3500, 200);
        this.add(platform18);

        const platform19 = new Platform(3750, 250);
        this.add(platform19);
    }
}