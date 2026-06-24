import { Color, Font, FontUnit, Keys, Label, Vector } from "excalibur";
import { StartScene } from "../startscene";
import { FirstScene } from "../firstscene";
import { PlayerState } from "./playerstate";

export class DeathLabel extends Label {
    constructor() {
        super()
    }

    onInitialize(engine) {
        this.text = "Je bent dood gegaan, druk op spatie om opnieuw te beginnen"
        this.font = new Font({
            family: 'Arial',
            size: 30,
            unit: FontUnit.Px,
            color: Color.White
        })
        
        this.pos = new Vector(200, 360)
    }

    onPreUpdate(engine) {
        if(engine.input.keyboard.wasPressed(Keys.Space)) {
            this.scene.engine.levelSwitcher.startTimer()
            PlayerState.health = PlayerState.maxHealth
            this.scene.engine.goToScene('firstscene')
        }
    }
}