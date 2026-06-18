import { Actor, CollisionType } from 'excalibur';

export class DamageObject extends Actor {
    constructor(x, y, width, height, sprite, damage = 1) {
        super({
            x,
            y,
            width,
            height,
            collisionType: CollisionType.Fixed
        });

        this.damage = damage;
        this.graphics.use(sprite);
    }

    onInitialize() {
        this.on('collisionstart', (event) => {
            const other = event.other.owner;

            if (other && typeof other.takeDamage === 'function') {
                other.takeDamage(this.damage);
            }
        });
    }
}