import { Scene } from "excalibur";
import { DeathLabel } from "./class/deathlabel";

export class DeathScene extends Scene {
    constructor() {
        super()
    }

    onInitialize() {
        const deathLabel = new DeathLabel
        this.add(deathLabel)
    }
}