import * as PIXI from 'pixi.js';

export function createCircle(x: number, y: number, r: number) {


    const circle = new PIXI.Graphics();

    circle.beginFill(0x000000);
    circle.drawCircle(0, 0, r);
    circle.endFill();
    //circle.pivot.set(circle.width / 2, circle.height / 2 - 50);
    circle.position.set(x, y)

    return circle;
}


export function createBox(x: number, y: number, w: number, h: number) {


    const box = new PIXI.Graphics();

    box.beginFill(0x000000);
    box.drawRect(0, 0, w, h);
    box.position.set(x, y)
    box.endFill();
    box.pivot.set(50, 50);
    box.interactive = true;
    return box;

}