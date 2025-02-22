export function createSpriteImage(img, x, y, w, h) {
    //减少程序冗余度，快速添加图片及位置
    var a = new PIXI.Sprite.fromImage(img);
    a.x = x;
    a.y = y;
    if (w) {
        a.w = w;
    }
    if (h) {
        a.h = h;
    }
    a.interactive = true;//打开对变量的监听
    return a;
}

export function isCrash(a, b) {
    var xl = a.x - b.x;
    var yl = a.y - b.y;
    var pos = 98;
    if (Math.sqrt(xl * xl + yl * yl) <= pos) {
        return true
    }
}

export function random(a, b) {
    return Math.floor(a + Math.random() * (1 + b - a))
}

export function getCanvas() {
    const canvas = document.createElement('canvas');
    document.body.appendChild(canvas);
    return canvas
}