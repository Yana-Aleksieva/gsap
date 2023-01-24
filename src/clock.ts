import * as PIXI from 'pixi.js';
import { gsap } from 'gsap';
import { PixiPlugin } from 'gsap/PixiPlugin';
import { Boxes } from './Box';



const app = new PIXI.Application({ width:1500, height: 600, backgroundColor: 0x999999 });
document.body.appendChild(app.view as HTMLCanvasElement);


//register pixi plugin
gsap.registerPlugin(PixiPlugin);
PixiPlugin.registerPIXI(PIXI);

const animations: GSAPAnimation[] = [];

start()
async function start() {




    //load gears
    PIXI.Assets.addBundle('gears', {
        gear12: 'assets/gear12.png',
        gear16: 'assets/gear16.png',
        gear20: 'assets/gear20.png',
        gear24: 'assets/gear24.png',
        gear28: 'assets/gear28.png',
        gear40: 'assets/gear40.png',
        gearBox: 'assets/gearbox.png',
        speedFast: 'assets/speed-fast.png',
        speedFaster: 'assets/speed-faster.png',
        speedNormal: 'assets/speed-normal.png',
        paused: 'assets/speed-paused.png',
    });

    // load assets
    const assets = await PIXI.Assets.loadBundle('gears');

    //create gears
    const gear40 = spawnGear(assets.gear40, 170, 170, 360,20);
    const gear12 = spawnGear(assets.gear12,1030,400, -360, 3);
    const gear28 = spawnGear(assets.gear28,992, 243, 360, 7);
    const gear24 = spawnGear(assets.gear24, 850, 130, 360, 12);
    const gear20 = spawnGear(assets.gear20, 1030,140, -360, 10);
    const gear16 = spawnGear(assets.gear16, 390, 120, -360, 8);


    //add gears to the stage
    app.stage.addChild(gear12, gear28);
}


function spawnGear(asset: PIXI.Texture, x: number, y: number, value: number, dur: number) {

    const sprite = new PIXI.Sprite(asset);
    sprite.anchor.set(0.5, 0.5);
    sprite.position.set(x, y);

    //add animation
    let anim = gsap.to(sprite, { pixi: { rotation: value }, duration: dur, repeat: -1, ease: 'linear' });

    // push animations to array
    //animations.push(anim);

    return sprite;
}
