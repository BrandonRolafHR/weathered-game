import { BoundingBox, Scene } from "excalibur";
import { Barrier } from "./class/barrier";
import { Background } from "./class/background";
import { PlayerOne } from "./class/playerone";
import { Ground } from "./class/ground";
import { Water } from "./class/water";
import { HealthBar } from "./class/HealthBar";

export class waterScene extends Scene {
    constructor() {
        super()
    }

    onInitialize() {

        this.HealthBar = new HealthBar()
        this.add(this.HealthBar)

        //add player
        const player = new PlayerOne()
        this.add(player)

        this.HealthBar = new HealthBar();
        this.add(this.HealthBar);

        //lock camera to player
        this.camera.strategy.lockToActor(player)
        this.camera.strategy.limitCameraBounds(new BoundingBox(0, 0, 3840, 720))
        
        //add basics
        const loadBarrier = new Barrier();
        this.add(loadBarrier);

        const loadBackground = new Background();
        this.add(loadBackground);
        
        const loadGround = new Ground();
        this.add(loadGround);

        //add waters
        const water1 = new Water(1)
        this.add(water1)

        const water2 = new Water(2)
        this.add(water2)
    }
}
