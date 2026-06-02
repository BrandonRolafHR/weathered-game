import { ImageSource, Sound, Resource, Loader, ImageWrapping } from 'excalibur'

// voeg hier jouw eigen resources toe
const Resources = {
    Cowboy: new ImageSource('images/cowman1.png'),
    Cowboy2: new ImageSource('images/cowman2.png'),
    Cactus: new ImageSource('images/cactus.png'),
    Bullet: new ImageSource('images/bullet.png'),
    Bandit1: new ImageSource('images/bandit1.png'),
    Bandit2: new ImageSource('images/bandit2.png'),
    Background: new ImageSource('images/desert-background.png', { wrapping: ImageWrapping.Repeat}),
}

const ResourceLoader = new Loader()
    for (let res of Object.values(Resources)) {
        ResourceLoader.addResource(res)
}

export { Resources, ResourceLoader }