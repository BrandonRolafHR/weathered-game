import { BoundingBox, Scene, Vector } from "excalibur";
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

        //add waters
        const water1 = new Water(1)
        this.add(water1)

        const water2 = new Water(2)
        this.add(water2)

        const water3 = new Water(3)
        this.add(water3)

        const water4 = new Water(4)
        this.add(water4)
    }
}
