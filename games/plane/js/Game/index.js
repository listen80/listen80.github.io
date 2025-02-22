
import { createSpriteImage, isCrash } from "../utils.js"

import { createBG } from "./bg.js";
import { createCloud } from "./yun.js";
import { createHP } from "./xue.js";
import { createScore } from "./score.js";
import { createGrade } from "./grade.js";
import { createPlane } from "./player.js"
import { createEnemy } from './enemy.js'
import { createItem } from './item.js'
import { createStartBtn } from "./startBtn.js";
import { createPauseBtn } from "./pauseBtn.js";

import { createGameOverBtn } from './gameoverBtn.js';

class Enemieslist extends PIXI.Container {
    constructor({ esbulletList, container }) {
        super()

        function createBullte(enemy) {
            var esbullet = createSpriteImage("img/img_bullet_17.png", enemy.x, enemy.y + 40);
            esbullet.anchor.set(0.5, 0.5)
            esbullet.onUpdate = function () {
                this.y += 5;
            }
            esbullet.onCrash = function () {
                esbullet.parent?.removeChild(esbullet)
            }
            // esbulletlist
            return esbullet;
        }
        let escount = 0;
        const enemieslist = this;

        this.onUpdate = () => {
            if (escount === 60) {
                escount = 0;
                const enemy = createEnemy({ container })
                enemieslist.addChild(enemy)

                const bullte = createBullte(enemy)
                // const esbullet = createBullte()
                esbulletList.addChild(bullte);
            } else {
                escount += 1;
            }
        }
    }
}


class ItemList extends PIXI.Container {
    constructor() {
        super()
        let propscount = 0;
        const propslist = this
        propslist.onUpdate = function calcItems() {
            //添加道具
            if (propscount === 122) {
                //将生成的道具都存储到数组中
                const props = createItem()
                // propslist.push(props);
                propslist.addChild(props);
                propscount = 0;
            } else {
                propscount += 1
            }

        }
    }

}

export default class Game extends PIXI.Container {
    constructor({ app, data }) {
        super()

        const self = this
        self.gameStatus = 0;

        function startBtnClick() {
            self.gameStatus = 1;
            startBtn.visible = false;
            pauseBtn.visible = true;
            plane.visible = true;
            plane.play();
        }

        setTimeout(startBtnClick, 200)

        function pause() {
            startBtn.visible = true;
            pauseBtn.visible = false;
            self.gameStatus = 0;
            plane.stop();
        }

        function onDie() {
            pauseBtn.visible = false;
            self.gameStatus = 0;
            plane.stop();
            gameoverBtn.visible = true;
        }

        function restart() {
            gameoverBtn.visible = false;
            app.start({ data: 222222222 })
            // window.location.reload()
        }

        const container = this;

        const { bg, bg01 } = createBG({ app, container })
        const { yun } = createCloud({ app, container })

        const { xue1, xue2, xue3 } = createHP({ app, container })
        const score = createScore({ app, container })
        const grade = createGrade({ app, container })

        const propslist = new ItemList()

        const esbulletList = new PIXI.Container()
        const enemieslist = new Enemieslist({ esbulletList, container })

        const bulletlist = new PIXI.Container();
        const plane = createPlane({ app, container: bulletlist, bg, grade, score, onDie: onDie, xue2 });

        const startBtn = createStartBtn({ app, container, startBtnClick })
        const pauseBtn = createPauseBtn({ onClick: pause, app, container })
        const gameoverBtn = createGameOverBtn({ restart: restart, app, container })

        container.addChild(bg, bg01, yun,);
        container.addChild(propslist, esbulletList, enemieslist, bulletlist, plane);

        container.addChild(startBtn, pauseBtn, gameoverBtn)
        container.addChild(xue1, xue2, xue3, score, grade)

        function crash(f1, f2) {
            const arr1 = [].concat(f1)
            const arr2 = [].concat(f2)
            for (let i = 0; i < arr1.length; i++) {
                const a = arr1[i]
                for (let j = 0; j < arr2.length; j++) {
                    const b = arr2[j]
                    if (isCrash(a, b)) {
                        a.onCrash?.(b)
                        b.onCrash?.(a)
                    }
                }
            }
        }

        this.onUpdate = (() => {
            // console.log(data)
            if (self.gameStatus !== 0) {
                crash(enemieslist.children, bulletlist.children,)
                crash(enemieslist.children, plane,)
                crash(esbulletList.children, plane,)
                crash(propslist.children, plane,)
            }
        });
    }
}