import {
    Scene,
    Actor,
    Vector,
    CollisionType,
    Color,
    Rectangle,
    BoundingBox,
    Sound,
    Resource
} from 'excalibur';

import { Resources } from './resources.js';
import { PlayerOne } from './class/playerone.js';
import { Barrier } from './class/barrier.js';
import { HealthBar } from './class/HealthBar.js';
import { Newspaper } from "./class/Newspaper";
import { Platform } from "./class/platfrom";
import { BarrierWall } from './class/barrierwall.js';

class HurricaneBackground extends Actor {
    constructor() {
        super({});
        this.anchor = new Vector(0, 0)

        this.z = -10;
    }

    onInitialize() {
        this.graphics.use(Resources.HurricaneBackground.toSprite());
    }
}

class HurricanePlatform extends Actor {

    constructor() {
        super({})
    }

    //hurricane gebruikt dezelfde platform als thunder.
    onInitialize(engine) {
        this.graphics.use(Resources.ThunderPlatform.toSprite());
    }
}

class WindParticle extends Actor {
    constructor(x, y) {
        super({
            x,
            y,
            width: 260,
            height: 4,
            collisionType: CollisionType.PreventCollision
        });

        const length = 120 + Math.random() * 300;

        this.speed = 700 + Math.random() * 600;
        this.z = 100;
        this.rotation = -0.18;

        this.graphics.use(
            new Rectangle({
                width: length,
                height: 3,
                color: Color.fromRGB(220, 240, 255, 0.55)
            })
        );
    }

    onPreUpdate(engine, delta) {
        const seconds = delta / 1000;

        this.pos.x -= this.speed * seconds;
        this.pos.y += 80 * seconds;

        if (this.pos.x < -300) {
            this.pos.x = 3840 + 300;
            this.pos.y = Math.random() * engine.drawHeight;
        }

        if (this.pos.y > engine.drawHeight + 50) {
            this.pos.y = -50;
        }
    }
}

class FlyingDebris extends Actor {
    constructor(x, y) {
        super({
            x,
            y,
            width: 35,
            height: 35,
            collisionType: CollisionType.PreventCollision
        });

        this.speed = 300 + Math.random() * 500;
        this.rotationSpeed = -6 + Math.random() * 12;
        this.z = 120;

        this.graphics.use(
            new Rectangle({
                width: 10 + Math.random() * 14,
                height: 5,
                color: Color.fromHex('#5a3a18')
            })
        );
    }

    onPreUpdate(engine, delta) {
        const seconds = delta / 1000;

        this.pos.x -= this.speed * seconds;
        this.pos.y += Math.sin(this.pos.x * 0.02) * 3;
        this.rotation += this.rotationSpeed * seconds;

        if (this.pos.x < -80) {
            this.pos.x = engine.drawWidth + 100;
            this.pos.y = Math.random() * engine.drawHeight;
        }
    }
}

class FlyingDamageObject extends Actor {
    constructor(x, y, sprite, damage = 1, scale = 0.5) {
        super({
            x,
            y,
            width: 30,
            height: 30,
            collisionType: CollisionType.Active
        });

        this.damage = damage;
        this.speed = 350 + Math.random() * 450;
        this.rotationSpeed = -5 + Math.random() * 10;
        this.z = 130;

        this.body.useGravity = false;
        this.scale = new Vector(scale, scale);

        this.graphics.use(sprite);
    }

    onPreUpdate(engine, delta) {
        const seconds = delta / 1000;

        this.pos.x -= this.speed * seconds;
        this.pos.y += Math.sin(this.pos.x * 0.02) * 2;
        this.rotation += this.rotationSpeed * seconds;

        if (this.pos.x < -100) {
            this.kill();
        }
    }

    onCollisionStart(event, other) {
        const hitActor = other?.owner ?? event?.other?.owner ?? event?.other ?? other;

        if (hitActor && typeof hitActor.takeDamage === 'function') {
            hitActor.takeDamage(this.damage);
            this.kill();
        }
    }
}

export class HurricaneScene extends Scene {

    pages = 0;

    onActivate() {
        this.add(new BarrierWall());

        Resources.HurricaneScene.loop = true;
        Resources.HurricaneScene.play();

        this.clear();
        this.startGame();

        this.HealthBar = new HealthBar()
        this.add(this.HealthBar)
    }

    onDeactivate() {
        clearInterval(this.objectSpawnInterval);

        Resources.HurricaneScene.stop();
    }

    startGame() {
        // this.add(new HurricaneBackground());
        // this.add(new HurricanePlatform());

        const loadBackground1 = new HurricaneBackground();
        loadBackground1.pos = new Vector(0, 0)
        this.add(loadBackground1);

        const loadBackground2 = new HurricaneBackground();
        loadBackground2.pos = new Vector(1280, 0)
        this.add(loadBackground2);

        const loadBackground3 = new HurricaneBackground();
        loadBackground3.pos = new Vector(2560, 0)
        this.add(loadBackground3);

        //load grounds
        const loadGround1 = new HurricanePlatform();
        loadGround1.pos = new Vector(640, 670)
        this.add(loadGround1);

        const loadGround2 = new HurricanePlatform();
        loadGround2.pos = new Vector(1920, 670)
        this.add(loadGround2);

        const loadGround3 = new HurricanePlatform();
        loadGround3.pos = new Vector(3200, 670);
        this.add(loadGround3);

        this.add(new Barrier());

        //level lay-out
            
                    const platform0 = new Platform(150, 175);
                    this.add(platform0);
                    
                    const platform1 = new Platform(500, 500);
                    this.add(platform1);
            
                    const platform2 = new Platform(750, 400);
                    this.add(platform2);
            
                    const platform3 = new Platform(550, 250);
                    this.add(platform3);
            
                    const platform4 = new Platform(1150, 400);
                    this.add(platform4);
            
                    const platform5 = new Platform(1550, 350);
                    this.add(platform5)
            
                    const platform6 = new Platform(800, 125);
                    this.add(platform6);
            
                    const platform7 = new Platform(1200, 120);
                    this.add(platform7);
            
                    const platform8 = new Platform(1980, 450);
                    this.add(platform8);
            
                    const platform9 = new Platform(1800, 500);
                    this.add(platform9);
            
                    const platform10 = new Platform(2200, 300);
                    this.add(platform10);
            
                    const platform11 = new Platform(1975, 150);
                    this.add(platform11);
            
                    const platform12 = new Platform(2400, 125);
                    this.add(platform12);
            
                    const platform13 = new Platform(2450, 450);
                    this.add(platform13);
            
                    const platform14 = new Platform(2750, 300);
                    this.add(platform14);
            
                    const platform15 = new Platform(3200, 300);
                    this.add(platform15);
            
                    const platform16 = new Platform(3450, 450);
                    this.add(platform16);
            
                    const platform17 = new Platform(3250, 500);
                    this.add(platform17);
            
                    const platform18 = new Platform(3500, 200);
                    this.add(platform18);
            
                    const platform19 = new Platform(3750, 250);
                    this.add(platform19);

                    //add player
        const player = new PlayerOne()
        this.add(player)

        //lock camera to player
        this.camera.strategy.lockToActor(player)
        this.camera.strategy.limitCameraBounds(new BoundingBox(0, 0, 3840, 720))

        this.checkPages()

        if (this.pages === 0) {
            const newspaper = new Newspaper(160, 135);
            this.add(newspaper);
            const newspaper2 = new Newspaper(2435, 600);
            this.add(newspaper2);
            const newspaper3 = new Newspaper(2410, 85);
            this.add(newspaper3);
            const newspaper4 = new Newspaper(3750, 210);
            this.add(newspaper4);
            const newspaper5 = new Newspaper(1220, 80);
            this.add(newspaper5);
        } else if (this.pages === 1) {
            const newspaper2 = new Newspaper(2435, 600);
            this.add(newspaper2);
            const newspaper3 = new Newspaper(2410, 85);
            this.add(newspaper3);
            const newspaper4 = new Newspaper(3750, 210);
            this.add(newspaper4);
            const newspaper5 = new Newspaper(1220, 80);
            this.add(newspaper5);
        } else if (this.pages === 2) {
            const newspaper3 = new Newspaper(2410, 85);
            this.add(newspaper3);
            const newspaper4 = new Newspaper(3750, 210);
            this.add(newspaper4);
            const newspaper5 = new Newspaper(1220, 80);
            this.add(newspaper5);
        } else if (this.pages === 3) {
            const newspaper4 = new Newspaper(3750, 210);
            this.add(newspaper4);
            const newspaper5 = new Newspaper(1220, 80);
            this.add(newspaper5);
        } else if (this.pages === 4) {
            const newspaper5 = new Newspaper(1220, 80);
            this.add(newspaper5);
        }

        

        this.spawnWindParticles();
        this.spawnDebris();

        this.startObjectSpawner();
    }

    onPreUpdate(engine, delta) {
        const player = this.actors.find(actor => actor instanceof PlayerOne);

        if (!player) return;

        const time = Date.now() * 0.003;
        const windStrength = 8 + Math.sin(time) * 6;

        player.vel = new Vector(
            player.vel.x - windStrength,
            player.vel.y
        );
    }

    spawnWindParticles() {
        for (let i = 0; i < 120; i++) {
            this.add(
                new WindParticle(
                    Math.random() * 3840,
                    Math.random() * 720
                )
            );
        }
    }

    spawnDebris() {
        for (let i = 0; i < 30; i++) {
            this.add(
                new FlyingDebris(
                    Math.random() * 3840,
                    Math.random() * 720
                )
            );
        }
    }

    spawnFlyingObject() {
        const objects = [
            {
                sprite: Resources.Branch.toSprite(),
                damage: 1,
                scale: 1.5
            },
            {
                sprite: Resources.Box.toSprite(),
                damage: 1,
                scale: 1.5
            },
            {
                sprite: Resources.MetalSheet.toSprite(),
                damage: 2,
                scale: 0.08
            }
        ];

        const chosen = objects[Math.floor(Math.random() * objects.length)];

        const object = new FlyingDamageObject(
            3840,
            150 + Math.random() * 450,
            chosen.sprite,
            chosen.damage,
            chosen.scale
        );

        this.add(object);
    }

    startObjectSpawner() {
        this.objectSpawnInterval = setInterval(() => {
            this.spawnFlyingObject();
        }, 1200);
    }

    checkPages() {
        if (this.player) {
            // Sla de pageCount van de speler op in de scene-variabele 'pages'
            this.pages = PlayerState.pageCount
            
            // Log de variabele van de SCENE (this.pages) OF van de SPELER (this.player.pageCount)
            console.log("Pagina's in scene:", this.pages); 
            // OF: console.log("Pagina's van player:", this.player.pageCount);
        } else {
            console.log("Speler is nog niet aangemaakt!");
        }
    }
}
