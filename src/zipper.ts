
import * as PIXI from 'pixi.js';
import { gsap } from 'gsap';
import { PixiPlugin } from 'gsap/PixiPlugin';
import { Boxes } from './Box';
import { createBox, createCircle } from './util';



const app = new PIXI.Application({ width: 800, height: 600, backgroundColor: 0x999999 });
document.body.appendChild(app.view as HTMLCanvasElement);

//register pixi plugin
gsap.registerPlugin(PixiPlugin);
PixiPlugin.registerPIXI(PIXI);


let theeth: PIXI.Graphics[] = [];
let anim1: GSAPAnimation;
let anim: GSAPAnimation[] = [];
let left = [];
let rigth = []

start();


async function start() {




    addZipper();

    const circle = createCircle(400, 580, 20);

    app.stage.addChild(circle);
    let isUp = true;

    circle.on('pointermove', ({ globalX: x, globalY: y }) => {




        anim1 = gsap.to(circle, { pixi: { x: 400, y: y } });


        if (y <= 20) {

            gsap.to(circle, { pixi: { x: 400, y: 20 }, reversed: false });
        }

        if (y >= 580) {

            gsap.to(circle, { pixi: { x: 400, y: 580 }, reversed: false });
        }

        //scale speed
        anim1.timeScale(10);

        //play animation
        theeth.forEach((t, i) => {


            if (t.position.y >= y - 20) {

                anim[i].play();
            } else {

                anim[i].reverse();

            }
        })

    });
}



//create zipper
function createZipp(x: number, y: number) {

    const pin = createBox(x, y, 30, 10, 0xfffff);

    return pin;


}

//add zipper to stage
function addZipper() {

    let y = 20;

    //creare left 
    for (let i = 250; i < 560; i += 5) {

        const pin = createZipp(i, y);
        theeth.push(pin);
        anim.push(gsap.to(pin, { pixi: { x: 380 }, duration: 0.5, paused: true, }));
        app.stage.addChild(pin);
        y += 20;

    }

    y = 10;

    // create rigth
    for (let i = 550; i >= 5; i -= 5) {

        const pin = createZipp(i, y);
        app.stage.addChild(pin);
        anim.push(gsap.to(pin, { pixi: { x: '400' }, duration: 0.5, paused: true, stagger:5 }));
        theeth.push(pin);
        y += 20;

    }
}


