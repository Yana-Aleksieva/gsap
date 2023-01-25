import * as PIXI from 'pixi.js';
import { gsap } from 'gsap';
import { PixiPlugin } from 'gsap/PixiPlugin';
import { SteppedEase } from 'gsap/all';
import { Linear } from 'gsap';
import { createCircle } from './util';


const app = new PIXI.Application({ width: 1500, height: 600, backgroundColor: 0x999999 });
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
        minutes: 'assets/arrow.png',
        seconds: 'assets/seconds.png',

    });

    // load assets
    const assets = await PIXI.Assets.loadBundle('gears');

    //create gears
    const gear40 = spawnGear(assets.gear40, 600, 268, 360, 10);
    const gear12 = spawnGear(assets.gear12, 800, 330, -360, 2);
    const gear28 = spawnGear(assets.gear28, 400, 458, -360, 7);
    const gear24 = spawnGear(assets.gear24, 845, 188, -360, 6);
    const gear20 = spawnGear(assets.gear20, 400, 128, -360, 5);
    const gear16 = spawnGear(assets.gear16, 1000, 150, 360, 4);
    const seconds = spawnGear(assets.seconds, 300, 300, 360, 12);
    const minutes = spawnGear(assets.minutes, 300, 300, 360, 12);
    const hours = spawnGear(assets.minutes, 300, 300, 360, 12);


    // minutes.anchor.set(0.5);

    // set positions
    gsap.set(seconds, { pixi: { x: 600, y: 268, anchorX: 0.5, scale: 0.7 } });
    gsap.set(minutes, { pixi: { x: 600, y: 268, anchorX: 0.5, scaleX: 0.4 } });
    gsap.set(hours, { pixi: { x: 600, y: 268, anchorX: 0.5, scale: 0.7 } });

    //set animations
    let anims = gsap.to(seconds, { pixi: { rotation: '360', }, duration: 60, repeat: -1, ease: SteppedEase.config(60) });
    let animm = gsap.to(minutes, { pixi: { rotation: '360', }, duration: 3600, repeat: -1, ease: SteppedEase.config(60) });
    let animh = gsap.to(hours, { pixi: { rotation: '360', }, duration: 216000, repeat: -1, ease: SteppedEase.config(60) });


    // let a = [anims, animm, animh];
    // a.forEach(a => a.timeScale(120))



    //add gears to the stage

    app.stage.addChild(gear40, gear24, gear16, gear20, gear28, hours, minutes, seconds);
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
