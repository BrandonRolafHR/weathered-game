import { Actor, CollisionType, Vector, Keys, Camera} from 'excalibur';
import { Resources } from '../resources.js'
import { Engine } from 'excalibur';

export class Page extends Actor {
    constructor(page) {
        super({
            x: 0,
            y: 0,
            collisionType: CollisionType.Fixed,
        });
        this.scale = new Vector(0.35, 0.35);
        this.page = page;
        this.z = 10;
        this.anchor = new Vector(0.5, 0.5);
    }

    onInitialize(engine) {
        this.graphics.use(Resources[`page${this.page}`].toSprite());
    }

    onPostUpdate(engine, delta) {
        const cam = this.scene.camera.pos;
        this.pos = new Vector(cam.x, cam.y);

        if (!this.scene.engine.showingPage) {
            this.kill();
        }
    }
}