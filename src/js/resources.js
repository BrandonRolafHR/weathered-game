import { ImageSource, Sound, Resource, Loader, ImageWrapping } from 'excalibur'
import { Branch } from './class/branch'

const Resources = {
    PlayerOne: new ImageSource('images/bassie.png'),
    Background: new ImageSource('images/standard-denver.png'),
    Ground: new ImageSource('images/standard-platform.png'),
<<<<<<< Updated upstream
    Branch: new ImageSource('images/branch.png')
=======

    // Thunder Weather Conditions
    Lightning: new ImageSource('images/lightning.png'),
    ThunderBackground: new ImageSource('images/thunder-denver-bg.png'),
    ThunderPlatform: new ImageSource('images/thunder-platform.png')
>>>>>>> Stashed changes
}

const ResourceLoader = new Loader()
    for (let res of Object.values(Resources)) {
        ResourceLoader.addResource(res)
}

export { Resources, ResourceLoader }
