import '../css/style.css'
import { Actor, Engine, Scene, Vector, DisplayMode, randomInRange, CollisionType, DegreeOfFreedom, SolverStrategy, Label, FontUnit, Font, Color, Timer } from "excalibur"
import { Resources, ResourceLoader } from './resources.js'
import { PlayerOne } from './class/playerone.js';

export class FirstScene extends Scene {

    onActivate() {
        this.startGame();
    }

    startGame() {
        const loadPlayerOne = new PlayerOne();
        this.add(loadPlayerOne);
    }
}