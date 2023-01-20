

import * as PIXI from 'pixi.js';
import { gsap } from 'gsap';
import { DisplayObject } from 'pixi.js';

export class Circle extends PIXI.Container {


    public circle;

    constructor(

        x: number,
        y: number,
        r: number

    ) {
        super();
        this.circle = new PIXI.Graphics();
        this.createCircle(this.circle, x, y, r);
        this.addChild(this.circle)
    }

    createCircle(c: PIXI.Graphics, x: number, y: number, r: number) {




        c.beginFill(0x000000);
        c.drawCircle(0, 0, r);
        c.endFill();
        c.position.set(x, y)

        return c;
    }

    scaleCircle(scale: number, duration: number, delay: number, ease?: string) {

        gsap.to(this.circle, { pixi: { scale: scale }, duration: duration, delay: delay, ease: (ease ? `${ease}` : 'none.none') });
    }


    addAnimation(duration: number, delay: number, ease?: string) {

        gsap.to(this.circle, { pixi: { x: 700 }, duration: duration, delay: delay, ease: (ease ? `${ease}` : 'none.none') });


    }
}