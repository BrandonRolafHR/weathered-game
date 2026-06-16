import { ImageSource, Sound, Resource, Loader, ImageWrapping } from 'excalibur'

const Resources = {
    PlayerOne: new ImageSource('images/bassie.png'),
}

const ResourceLoader = new Loader()
    for (let res of Object.values(Resources)) {
        ResourceLoader.addResource(res)
}

export { Resources, ResourceLoader }
