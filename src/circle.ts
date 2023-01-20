

import * as PIXI from 'pixi.js';
import { gsap } from 'gsap';
import { PixiPlugin } from 'gsap/PixiPlugin';
import {Circle} from './Circles';



const app = new PIXI.Application({ width: 800, height: 600, backgroundColor: 0x999999 });
document.body.appendChild(app.view as HTMLCanvasElement);

//register pixi plugin
gsap.registerPlugin(PixiPlugin);
PixiPlugin.registerPIXI(PIXI);


// create circles
const circle  = new Circle(100, 100, 50);
const circle1 =  new Circle(100, 300, 50);
const circle2 =  new Circle(100, 500, 50);

//add animation for circles
circle.addAnimation(2, 1);
circle.scaleCircle(1.5, 1, 1);
circle.scaleCircle(1, 1, 2);


circle1.addAnimation(2, 1);
circle1.scaleCircle(1.5, 1, 1, 'elastic.out');
circle1.scaleCircle(1, 1, 2, 'elastic.in');



circle2.addAnimation(2, 1, 'sine.inOut');
circle2.scaleCircle(1.5, 1, 1, 'bounce.out');
circle2.scaleCircle(1, 1, 2, 'bounce.in');


// add circles to stage
app.stage.addChild(circle, circle1, circle2);