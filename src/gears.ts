

import * as PIXI from 'pixi.js';
import { gsap } from 'gsap';
import { PixiPlugin } from 'gsap/PixiPlugin'
import { createCircle } from './util';
import { Circle } from './Circles'
import { Assets } from 'pixi.js';



const app = new PIXI.Application({ width: 800, height: 600, backgroundColor: 0x999999 });
document.body.appendChild(app.view as HTMLCanvasElement);

//register pixi plugin
gsap.registerPlugin(PixiPlugin);
PixiPlugin.registerPIXI(PIXI);


const animations: GSAPAnimation[] = [];
const controls = [];

start();
async function start() {


    const assetss = [
        'assets/gear12.png', 'assets/gear16.png', 'assets/gear20.png',
        'assets/gear24.png', 'assets/gear28.png', 'assets/gear40.png',
        'assets/gearbox.png', 'assets/gears.png', 'assets/speed-fast.png', 'assets/speed-faster.png',
        'assets/speed-normal.png', 'assets/speed-paused.png'];

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

    const gear40 = spawnGear(assets.gear40, 400, 300, 'rotation', 360, 20);
    const gear12 = spawnGear(assets.gear12, 300, 117, 'rotattion', -360, 6);
    const gear28 = spawnGear(assets.gear28, 142, 130, 'rotation', 360, 14);
    const gear24 = spawnGear(assets.gear24, 676, 388, 'rotation', 360, 12);
    const gear20 = spawnGear(assets.gear20, 212, 441, 'rotation', -360, 10);
    const gear16 = spawnGear(assets.gear16, 542, 471, 'rotation', -360, 8);


    // create controls
    const control = createControls(assets.gearBox, assets.speedFast, assets.speedFaster, assets.speedNormal, assets.paused)

    //add gears to the stage
    app.stage.addChild(gear40, gear12, gear28, gear16, gear24, gear20, control)
}





function spawnGear(asset: PIXI.Texture, x: number, y: number, prop, value: number, dur: number) {

    const sprite = new PIXI.Sprite(asset);
    sprite.anchor.set(0.5, 0.5);
    sprite.position.set(x, y);

    //add animation
    let anim = gsap.to(sprite, { pixi: { rotation: value }, duration: dur, repeat: -1, ease: 'linear' });

    // push animations to array
    animations.push(anim);

    return sprite;
}


function createControls(box: PIXI.Texture, fast: PIXI.Texture, faster: PIXI.Texture, normal: PIXI.Texture, paused: PIXI.Texture) {

    const container = new PIXI.Container()
    const sprite = new PIXI.Sprite(box);
    sprite.anchor.set(0.5, 0.5);
    sprite.position.set(400, 300);


    const fastSprite = createSprite(fast, 345, 300);
    const fasterSprite = createSprite(faster, 380, 300);
    const normalSprite = createSprite(normal, 420, 300);
    const pausedSprite = createSprite(paused, 457, 300);
    container.addChild(fastSprite);

    controls.push(fastSprite, fasterSprite, normalSprite, pausedSprite)
    container.addChild(sprite, fastSprite, fasterSprite, normalSprite, pausedSprite);

    //add sprite animation
    addSpriteAnimation(fastSprite, 2);
    addSpriteAnimation(fasterSprite, 4);
    addSpriteAnimation(normalSprite, 1);
    addSpriteAnimation(pausedSprite);


    return container;

}


function createSprite(asset: PIXI.Texture, x: number, y: number) {


    const fastSprite = new PIXI.Sprite(asset);
    fastSprite.anchor.set(0.5, 0.5)
    fastSprite.position.set(x, y);
    return fastSprite;
}


function addSpriteAnimation(sprite: PIXI.Sprite, value?: number) {


    sprite.interactive = true;

    sprite.on('pointertap', () => {

        for (let anim of animations) {

            if (value) {
                anim.resume();
                anim.timeScale(value)
            } else {
                anim.pause();
            }


        }
    })
}