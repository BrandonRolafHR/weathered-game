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
import { PlayerState } from './class/playerstate.js';
import { Sound } from 'excalibur';

export class FirstScene extends Scene {
    player;
    pages = 0;

    onActivate(engine) {
        this.clear();

        this.HealthBar = new HealthBar();
        this.add(this.HealthBar);

        this.startGame();

        Resources.FirstScene.loop = true;
        Resources.FirstScene.play();
    }
    onDeactivate() {
        Resources.FirstScene.stop();
    }

    startGame() {
        //add player
        this.player = new PlayerOne()
        this.add(this.player)
        
        //lock camera to player
        this.camera.strategy.lockToActor(this.player)
        this.camera.strategy.limitCameraBounds(new BoundingBox(0, 0, 3840, 720))

        this.checkPages()

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

        //tests
        const branch = new Branch(500, 400);
        this.add(branch);

        if (this.pages === 0) {
            const newspaper = new Newspaper(700, 600);
            this.add(newspaper);
            const newspaper2 = new Newspaper(900, 600);
            this.add(newspaper2);
            const newspaper3 = new Newspaper(1100, 600);
            this.add(newspaper3);
            const newspaper4 = new Newspaper(500, 600);
            this.add(newspaper4);
            const newspaper5 = new Newspaper(900, 400);
            this.add(newspaper5);
        } else if (this.pages === 1) {
            const newspaper2 = new Newspaper(900, 600);
            this.add(newspaper2);
            const newspaper3 = new Newspaper(1100, 600);
            this.add(newspaper3);
            const newspaper4 = new Newspaper(500, 600);
            this.add(newspaper4);
            const newspaper5 = new Newspaper(900, 400);
            this.add(newspaper5);
        } else if (this.pages === 2) {
            const newspaper3 = new Newspaper(1100, 600);
            this.add(newspaper3);
            const newspaper4 = new Newspaper(500, 600);
            this.add(newspaper4);
            const newspaper5 = new Newspaper(900, 400);
            this.add(newspaper5);
        } else if (this.pages === 3) {
            const newspaper4 = new Newspaper(500, 600);
            this.add(newspaper4);
            const newspaper5 = new Newspaper(900, 400);
            this.add(newspaper5);
        } else if (this.pages === 4) {
            const newspaper5 = new Newspaper(900, 400);
            this.add(newspaper5);
        }

        

        

        

        
    }

    checkPages() {
    if (this.player) {
        // Sla de pageCount van de speler op in de scene-variabele 'pages'
        this.pages = PlayerState.pageCount
        
        // Log de variabele van de SCENE (this.pages) OF van de SPELER (this.player.pageCount)
        console.log("Pagina's in scene:", this.pages); 
        // OF: console.log("Pagina's van player:", this.player.pageCount);
    } else {
        console.log("Speler is nog niet aangemaakt!");
    }
}
}

