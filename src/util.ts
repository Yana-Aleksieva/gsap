import * as PIXI from 'pixi.js';

export function createCircle(x: number, y: number, r: number) {


    const circle = new PIXI.Graphics();

    circle.beginFill(0xffffff);
    circle.drawCircle(0, 0, r);
    circle.endFill();
    circle.interactive = true;
    circle.position.set(x, y);

    return circle;
}


export function createBox(x: number, y: number, w: number, h: number, c: number) {


    const box = new PIXI.Graphics();

    box.beginFill(c);
    box.drawRect(0, 0, w, h);
    box.position.set(x, y)
    box.endFill();
    box.pivot.set(w / 2, h / 2);
    box.interactive = true;

    return box;

}

export function loadAssets() {


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
}


export function createZippThooth(x: number, y: number, w: number, h: number, c: number) {



    const box = new PIXI.Graphics();

    box.beginFill(c);
    box.drawRect(0, 0, w, h);
    box.position.set(x, y)
    box.endFill();
    box.pivot.set(w / 2, h / 2);
    box.interactive = true;

    const circle = new PIXI.Graphics();

    circle.beginFill(0xffffff);
    circle.drawCircle(0, 0, 10);
    circle.endFill();
    circle.interactive = true;
    circle.position.set(x, y);

    const sprite = new PIXI.Sprite();
   // sprite.tint = 0xffffff
    sprite.addChild(box, circle)
    return sprite

}