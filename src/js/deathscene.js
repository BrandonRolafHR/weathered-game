import { Scene, Sound } from "excalibur";
import { DeathLabel } from "./class/deathlabel";
import { Resources } from "./resources";

export class DeathScene extends Scene {
    constructor() {
        super()
    }
    onActivate(){
        Resources.DeathScene.play();
    }
    onInitialize() {
        const deathLabel = new DeathLabel
        this.add(deathLabel)
    }
}