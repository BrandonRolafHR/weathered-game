import { Resources } from '../resources.js';
import { DamageObject } from './DamageObject.js';

export class Branch extends DamageObject {
    constructor(x, y) {
        super(
            x,
            y,
            64,
            32,
            Resources.Branch.toSprite(),
            1
        );
    }
}