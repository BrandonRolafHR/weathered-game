import { ImageSource, Sound, Resource, Loader, ImageWrapping } from 'excalibur'
import { Branch } from './class/branch'
import { ThunderBackground } from './class/thunderbackground'
import { ThunderPlatform } from './class/thunderplatform'

const Resources = {
    PlayerOne: new ImageSource('images/bassie.png'),
    Background: new ImageSource('images/standard-denver.png'),
    Ground: new ImageSource('images/standard-platform.png'),
    Branch: new ImageSource('images/branch.png'),

    ThunderPlatform: new ImageSource('images/thunder-background.png'),
    ThunderBackground: new ImageSource('images/thunder-platform.png'),
    Lightning: new ImageSource('images/lightning.png'),
}

const ResourceLoader = new Loader()
    for (let res of Object.values(Resources)) {
        ResourceLoader.addResource(res)
}

export { Resources, ResourceLoader }
