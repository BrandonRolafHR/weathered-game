import { ImageSource, Sound, Resource, Loader, ImageWrapping } from 'excalibur'
import { Branch } from './class/branch'
import { StartScene } from './startscene'
import { FirstScene } from './firstscene'
import { Lightning } from './class/lightning'
import { ThunderScene } from './thunderscene'
import { waterScene } from './waterscene'
import { HurricaneScene } from './hurricanescene'
import { DeathScene } from './deathscene'

const Resources = {
    //#region Images
    PlayerOne: new ImageSource('images/bassie.png'),
    Damaged: new ImageSource('images/bassiePijn.png'),
    Dead: new ImageSource('images/bassieDood.png'),
    Background: new ImageSource('images/standard-denver.png'),
    Ground: new ImageSource('images/standard-platform.png'),
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
    page5: new ImageSource('images/Page5.png'),
    //#endregion

    //#region Sounds
    StartScene: new Sound("/sounds/rain.mp3"),
    FirstScene: new Sound("/sounds/citybirds.mp3"),
    ThunderScene: new Sound("/sounds/thunderstorm.mp3"),
    LightningSound: new Sound("/sounds/thunderclap.mp3"),
    WaterScene: new Sound("/sounds/water.mp3"),
    HurricaneScene: new Sound ("/sounds/hurricane.mp3"),
    DeathScene: new Sound ("/sounds/losing.mp3")
    
    //#endregion
}

const ResourceLoader = new Loader()
for (let res of Object.values(Resources)) {
    ResourceLoader.addResource(res)
}

export { Resources, ResourceLoader }
