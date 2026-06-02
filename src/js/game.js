import '../css/style.css'
import { Actor, Engine, Vector, DisplayMode, randomInRange } from "excalibur"
import { Resources, ResourceLoader } from './resources.js'
import { Background } from './class/background.js'
import { Cowboy } from './class/cowboy.js'
import { Cactus } from './class/cactus.js'
import { Bullet } from './class/bullet.js'

export class Game extends Engine {

    constructor() {
        super({ 
            width: 1280,
            height: 720,
            maxFps: 60,
            displayMode: DisplayMode.FitScreen
         })
        this.start(ResourceLoader).then(() => this.startGame());
    }

    startGame() {
        const loadBackground = new Background();
        this.add(loadBackground);

        const loadCowboy = new Cowboy(); 
        this.add(loadCowboy);

        const loadBullet = new Bullet()
        this.add(loadBullet)
    }

    spawnCactus() {
        const loadCactus = new Cactus();
        this.add(loadCactus);
    }
}

new Game()
