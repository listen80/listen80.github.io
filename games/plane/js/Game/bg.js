import { createSpriteImage } from "../utils.js";

function createBG({ app, container }) {
    const bg = createSpriteImage("img/bg_01.png", 0, 0);
    const bg01 = createSpriteImage("img/bg_01.png", 0, -768);

    bg.onUpdate = function (e) {
        bg.y += 1
        if (bg.y == 768) {
            bg.y = 0
        }
        bg01.y = bg.y - 768
    }

    return { bg, bg01 };
}

export { createBG }