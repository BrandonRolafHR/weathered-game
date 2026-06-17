import {
    Scene,
    Label,
    Vector,
    FontUnit,
    Font,
    Color,
    Actor
} from "excalibur"

export class StartScene extends Scene {

    onInitialize(engine) {

        engine.backgroundColor = Color.fromHex("#1a1f2b")

        this.engine = engine
        this.menuActors = []
        this.optionActors = []

        this.settings = {
            master: 100,
            music: 80,
            sfx: 80,
            ambient: 80,
            fps: 60
        }

        this.createMainMenu()
    }

    createMainMenu() {

        // TITLE PLACEHOLDER
        const titleBox = new Actor({
            pos: new Vector(400, 150),
            width: 500,
            height: 140,
            anchor: new Vector(0.5, 0.5)
        })

        titleBox.color = Color.fromHex("#2d3446")

        const title = new Label({
            text: "WEATHERED",
            pos: new Vector(265, 135),
            font: new Font({
                size: 50,
                unit: FontUnit.Px
            }),
            color: Color.White
        })

        const startButton = this.createButton(
            "Start",
            new Vector(400, 320),
            () => {
                this.engine.goToScene("firstscene")
            }
        )

        const optionsButton = this.createButton(
            "Options",
            new Vector(400, 410),
            () => {
                this.showOptions()
            }
        )

        const quitButton = this.createButton(
    "Quit",
    new Vector(400, 500),
    () => {

        this.engine.stop()

        if (this.engine.canvas) {
            this.engine.canvas.remove()
        }
    }
)

        this.menuActors.push(
            titleBox,
            title,
            startButton,
            optionsButton,
            quitButton
        )

        this.menuActors.forEach(actor => {
            this.add(actor)
        })
    }

    showOptions() {

        this.menuActors.forEach(actor => {
            actor.kill()
        })

        const title = new Label({
            text: "OPTIONS",
            pos: new Vector(300, 70),
            font: new Font({
                size: 50,
                unit: FontUnit.Px
            }),
            color: Color.White
        })

        this.optionActors.push(title)
        this.add(title)

        this.createSlider(
            "Master Volume",
            180,
            this.settings.master,
            this.optionActors
        )

        this.createSlider(
            "Music Volume",
            260,
            this.settings.music,
            this.optionActors
        )

        this.createSlider(
            "Sound Effects",
            340,
            this.settings.sfx,
            this.optionActors
        )

        this.createSlider(
            "Ambient Volume",
            420,
            this.settings.ambient,
            this.optionActors
        )

        const fpsButton = this.createButton(
            `FPS: ${this.settings.fps}`,
            new Vector(400, 520),
            () => {

                this.settings.fps =
                    this.settings.fps === 60
                        ? 30
                        : 60

                this.engine.targetFps =
                    this.settings.fps

                fpsText.text =
                    `FPS: ${this.settings.fps}`
            }
        )

        const fpsText = fpsButton.children[0]

        const backButton = this.createButton(
            "Back",
            new Vector(400, 620),
            () => {

                this.optionActors.forEach(actor => {
                    actor.kill()
                })

                this.optionActors = []
                this.createMainMenu()
            }
        )

        this.optionActors.push(
            fpsButton,
            backButton
        )

        this.add(fpsButton)
        this.add(backButton)
    }

    createSlider(
        labelText,
        y,
        defaultValue,
        storageArray
    ) {

        const label = new Label({
            text: `${labelText}: ${defaultValue}`,
            pos: new Vector(180, y),
            font: new Font({
                size: 28,
                unit: FontUnit.Px
            }),
            color: Color.White
        })

        const bar = new Actor({
            pos: new Vector(450, y + 10),
            width: 250,
            height: 10
        })

        bar.color = Color.Gray

        const knob = new Actor({
            pos: new Vector(
                325 + (defaultValue * 2.5),
                y + 10
            ),
            width: 20,
            height: 30
        })

        knob.color = Color.White

        knob.on("pointerdrag", (evt) => {

            knob.pos.x = Math.max(
                325,
                Math.min(575, evt.worldPos.x)
            )

            const value = Math.round(
                ((knob.pos.x - 325) / 250) * 100
            )

            label.text =
                `${labelText}: ${value}`

            if (labelText === "Master Volume") {
                this.settings.master = value
            }

            if (labelText === "Music Volume") {
                this.settings.music = value
            }

            if (labelText === "Sound Effects") {
                this.settings.sfx = value
            }

            if (labelText === "Ambient Volume") {
                this.settings.ambient = value
            }
        })

        storageArray.push(
            label,
            bar,
            knob
        )

        this.add(label)
        this.add(bar)
        this.add(knob)
    }

    createButton(text, position, onClick) {

        const button = new Actor({
            pos: position,
            width: 280,
            height: 70,
            anchor: new Vector(0.5, 0.5)
        })

        button.color =
            Color.fromHex("#3d4b66")

        const label = new Label({
            text,
            pos: new Vector(-55, -12),
            font: new Font({
                size: 30,
                unit: FontUnit.Px
            }),
            color: Color.White
        })

        button.addChild(label)

        button.on("pointerenter", () => {
            button.color =
                Color.fromHex("#55698f")
        })

        button.on("pointerleave", () => {
            button.color =
                Color.fromHex("#3d4b66")
        })

        button.on("pointerup", () => {
            onClick()
        })

        return button
    }
}