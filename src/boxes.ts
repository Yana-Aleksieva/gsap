import * as PIXI from 'pixi.js';
import { gsap } from 'gsap';
import { PixiPlugin } from 'gsap/PixiPlugin';
import { Boxes } from './Box';



const app = new PIXI.Application({ width: 800, height: 600, backgroundColor: 0x999999 });
document.body.appendChild(app.view as HTMLCanvasElement);

//register pixi plugin
gsap.registerPlugin(PixiPlugin);
PixiPlugin.registerPIXI(PIXI);



//create box
const box = new Boxes(100, 300, 100, 100);
const box1 = new Boxes(300, 300, 100, 100);
const box2 = new Boxes(500, 300, 100, 100);
const box3 = new Boxes(700, 300, 100, 100);

// add circles to stage
app.stage.addChild(box, box1, box2, box3);


//add animations
box.addAnimation('rotation', 360, 1 );
box1.addAnimation('blur', 10, 1);
box2.addAnimation('skewX', 50, 1);
box3.addAnimation('color', 0xff0000, 1 );




