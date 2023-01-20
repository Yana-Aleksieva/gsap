import * as PIXI from 'pixi.js';
import { gsap } from 'gsap';
import { PixiPlugin } from 'gsap/PixiPlugin';
import { createBox } from './util';
import { Power2 } from 'gsap';


const app = new PIXI.Application({ width: 800, height: 600, backgroundColor: 0x000000 });
document.body.appendChild(app.view as HTMLCanvasElement);

//register pixi plugin
gsap.registerPlugin(PixiPlugin);
PixiPlugin.registerPIXI(PIXI);

// create graphics
const graphics = new PIXI.Graphics();
const rect = createBox(0, 0, 800, 600);
graphics.addChild(rect);
rect.interactive = true;

app.stage.addChild(graphics);
rect.on('pointertap', ({ globalX: x, globalY: y }) => {

    console.log(x, y)
    const color = ((Math.random() * 256 | 0) << 16) + ((Math.random() * 256 | 0) << 8) + (Math.random() * 256 | 0);
    graphics.addChild(fireworks(x, y, color));
    //app.stage.addChild(particle(0xffffff, ))
});







function particle(color: number, parent: PIXI.Container) {


    const box = createBox(300, 300, 4, 4);

    gsap.fromTo(box,
        { pixi: { scale: 0 } },
        { pixi: { x: 'random(-100, 100)', y: 'random(-100, 100)', rotation: 1440, scale: 2, blur: 1 }, duration: 2 });
    gsap.to(box, { pixi: { tint: color }, duration: 1 });
    gsap.to(box, { pixi: { tint: 0 }, duration: 1, delay: 1 });

    parent.addChild(box);

}


function fireworks(x: number, y: number, color: number) {

    const container = new PIXI.Container();
    container.position.set(x, y);

    for (let i = 0; i < 100; i++) {
        let f = particle(color, container);


    }
    gsap.to(container, { pixi: { y: '+=100' }, ease: Power2.easeIn, duration: 2, onComplete: () => container.destroy() });
    return container;
}

