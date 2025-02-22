import { createSpriteImage, } from '../utils.js'

export function createHP({ container }) {
    //血条1
    const xue1 = createSpriteImage("img/2_03.png", 55, 20, 250, 40);
    //血量2
    const xue2 = createSpriteImage("img/3_03.png", 88, 20, 250, 35);
    //血量3
    const xue3 = createSpriteImage("img/hp.png", 5, 20);

    xue2.setset = (v) => {
        xue2.width = v;
    }
    return { xue1, xue2, xue3 }
}
