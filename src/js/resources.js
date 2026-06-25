import { ImageSource, Sound, Resource, Loader, ImageWrapping } from 'excalibur'
import { Branch } from './class/branch'
import { Platform } from './class/platfrom'

const Resources = {
    PlayerOne: new ImageSource('images/bassie.png'),
    Damaged: new ImageSource('images/bassiePijn.png'),
    Dead: new ImageSource('images/bassieDood.png'),
    Background: new ImageSource('images/standard-denver.png'),
    Ground: new ImageSource('images/standard-platform.png'),
    Platform: new ImageSource('images/small-platfrom.png'),
    Branch: new ImageSource('images/branch.png'),
    NewsPaper: new ImageSource('images/NewsPaper.png'),
    Branch: new ImageSource('images/branch.png'),
    Box: new ImageSource('images/box.png'),
    MetalSheet: new ImageSource('images/metalsheet.png'),

    ThunderBackground: new ImageSource('images/thunder-background.png'),
    ThunderPlatform: new ImageSource('images/thunder-platform.png'),
    Lightning: new ImageSource('images/lightning.png'),
    IncomingLightning: new ImageSource('images/incoming-lightning.png'),
    Water: new ImageSource('images/water.png'),

    HurricaneBackground: new ImageSource('images/hurricane-background.png'),

    page1: new ImageSource('images/Page1.png'),
    page2: new ImageSource('images/Page2.png'),
    page3: new ImageSource('images/Page3.png'),
    page4: new ImageSource('images/Page4.png'),
    page5: new ImageSource('images/Page5.png')
}

const ResourceLoader = new Loader()
for (let res of Object.values(Resources)) {
    ResourceLoader.addResource(res)
}

export { Resources, ResourceLoader }
