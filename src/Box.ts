
import * as PIXI from 'pixi.js';
import { gsap } from 'gsap';
import { DisplayObject } from 'pixi.js';



export class Boxes extends PIXI.Graphics {


    private anim: GSAPAnimation

    constructor(

        x: number,
        y: number,
        w: number,
        h: number

    ) {
        super();

        this.createBox(this, x, y, w, h);
        //this.addChild(this.box)
    }

    createBox(box: PIXI.Graphics, x: number, y: number, w: number, h: number) {


        box.beginFill(0xffffff);
        box.drawRect(0, 0, w, h);
        box.endFill();

        this.setPivot();

        box.position.set(x, y);
        box.interactive = true;

        return box;
    }

    setPivot() {

        this.pivot.set(50, 50);
    }



    addAnimation(pe: 'rotation' | 'color' | 'skewX' | 'blur', value: number, dur: number) {

        let p: {};
        if (pe == 'color') {
            p = {
                [`${pe}`]: `${value}`,
                tint: value
            }
        } else {
            p = {
                [`${pe}`]: `${value}`,

            }
        }



        this.anim = gsap.to(this,
            {
                pixi: p,
                duration: dur,
                paused: true,

            });


        this.resumeAnimation()
    }

    resumeAnimation() {

        this.on('pointertap', () => {

            if (this.anim.paused() == false) {

                this.anim.reverse();
            } else {
                this.anim.resume();
            }

        })
    }


}