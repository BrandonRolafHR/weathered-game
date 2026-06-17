import '../css/style.css'
import { Actor, Engine, Vector, DisplayMode, SolverStrategy } from "excalibur"
import { Resources, ResourceLoader } from './resources.js'
import { StartScene } from './startscene.js'
import { FirstScene } from './firstscene.js'

export class Game extends Engine {
    
    constructor(){
        super({
            width: 1280,
            height: 720,
            maxFps: 60,
            displayMode: DisplayMode.FitScreen,
            physics: {
                solver: SolverStrategy.Arcade,
                gravity: new Vector(0, 1000)
            }
        })

        this.start(ResourceLoader).then(() => this.startGame())
    }

    startGame() {
        this.add('start', new StartScene())
        this.add('firstscene', new FirstScene())

        this.goToScene('start')
    }
}

new Game()