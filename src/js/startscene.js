import { Scene, Label, Vector, FontUnit, Keys } from "excalibur"
import { FirstScene } from './firstscene.js'

export class StartScene extends Scene {

    onInitialize(engine) {

        const title = new Label({
            text: "Weathered Game",
            pos: new Vector(400, 200),
            fontSize: 100,
            fontUnit: FontUnit.Px
        })

        const spaceToStart = new Label({
            text: "Press Space to Start",
            pos: new Vector(300, 300),
            fontSize: 100,
            fontUnit: FontUnit.Px
        })

        this.add(title)
        this.add(spaceToStart)
    }

    onPreUpdate(engine) {
        if (engine.input.keyboard.wasPressed(Keys.Space)) {
            engine.goToScene("firstscene")
        }
    }
}