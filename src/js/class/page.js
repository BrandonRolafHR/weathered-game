import { Actor, CollisionType, Vector, Keys} from 'excalibur';
import { Resources } from '../resources.js'
import { Engine } from 'excalibur';

export class Page extends Actor {
    constructor(page) {
        super({
            x: 640,
            y: 360,
            collisionType: CollisionType.Fixed,
        });
        this.scale = new Vector(0.35, 0.35);
        this.page = page;
        this.z = 10;
    }

    onInitialize(engine) {
        this.graphics.use(Resources[`page${this.page}`].toSprite());
    }

    onPostUpdate(engine, delta) {
        if (!this.scene.engine.showingPage) {
            this.kill();
        }
    }
}