import { Scene } from "excalibur";
import { Barrier } from "./class/barrier";
import { Background } from "./class/background";
import { PlayerOne } from "./class/playerone";
import { Ground } from "./class/ground";
import { Water } from "./class/water";

export class waterScene extends Scene {
    constructor() {
        super()
    }

    onInitialize() {

        this.add(new PlayerOne());
        
        const loadBarrier = new Barrier();
        this.add(loadBarrier);

        const loadBackground = new Background();
        this.add(loadBackground);
        
        const loadGround = new Ground();
        this.add(loadGround);

        const water1 = new Water(1)
        this.add(water1)

        const water2 = new Water(2)
        this.add(water2)
    }
}