import { Actor, Color, ScreenElement, Vector } from 'excalibur';
import { PlayerState } from './playerstate.js';

export class HealthBar extends ScreenElement {
  constructor() {
    super();
    this.z = 1000; // bovenop andere actors
    this.pos = new Vector(10, 10); // linksboven in scherm
    this.targetScaleX = 1; // doel schaalwaarde voor animatie

    this.background = new Actor({
      x: 0,
      y: 0,
      width: 220,
      height: 28,
      color: Color.fromRGB(0, 0, 0, 0.6),
      anchor: Vector.Zero
    });

    this.bar = new Actor({
      x: 4,
      y: 4,
      width: 212,
      height: 20,
      color: Color.Green,
      anchor: Vector.Zero
    });
  }

  onPreUpdate(engine, delta) {
    // Soepele animatie naar de doelschaal
    if (Math.abs(this.bar.scale.x - this.targetScaleX) > 0.01) {
      const speed = 3; // snelheid van animatie
      this.bar.scale.x += (this.targetScaleX - this.bar.scale.x) * speed * (delta / 1000);
    } else {
      this.bar.scale.x = this.targetScaleX;
    }
  }

  onInitialize(engine) {
    this.addChild(this.background);
    this.addChild(this.bar);
    this.updateHealth();
  }

  updateHealth() {
    const ratio = Math.max(0, Math.min(1, PlayerState.health / PlayerState.maxHealth));
    console.log(ratio)
    
    // Doelschaal instellen
    this.targetScaleX = ratio;

    this.bar.color = ratio < 0.3 ? Color.Red : Color.Green;
  }

  setHealth(value) {
    PlayerState.health = Math.max(0, Math.min(PlayerState.maxHealth, value));
    this.updateHealth();
  }
}