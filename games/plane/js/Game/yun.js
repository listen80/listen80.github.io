

export function createCloud({ app, container }) {
    var yun = new PIXI.Sprite.fromImage("img/yun02.png");
    yun.x = 20;
    yun.y = 130;

    yun.onUpdate = function (e) {
        yun.y += 1.5;
        if (yun.y > 700) {
            yun.y = -400;
        }
    }
    return { yun }
}