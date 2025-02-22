import { createSpriteImage } from "../utils.js";

class Title extends PIXI.Container {
    constructor({ app }) {
        // const container = new PIXI.Container()
        super()
        const container = this;
        const bg = createSpriteImage("img/bg_01.png", 0, 0);
        container.addChild(bg);
        // container.addChild(bg)
        const logo = createSpriteImage("img/logo.webp", 0, 0)
        container.addChild(logo);

        const score = new PIXI.Text("请选择你的战机")
        score.scale.x = 1.3
        score.scale.y = 1.3
        score.y = 200
        score.x = 125
        score.style.fill = "#9fa6aa"
        container.addChild(score)

        const continueBtn = new PIXI.Sprite.fromImage("img/start.png");
        continueBtn.y = 100
        continueBtn.interactive = true;
        continueBtn.on("click", start)
        function start() {
            console.log(app.stage)
            // window.location.href = 'demo.html';
        }
        container.addChild(continueBtn);

        const t1 = new PIXI.Texture.fromImage("img/plane1.png");
        const t2 = new PIXI.Texture.fromImage("img/hero_live_1.png");
        const t3 = new PIXI.Texture.fromImage("img/planplay_2.png");


        //添加图片元素（飞机），默认纹理为t1
        const plane = new PIXI.Sprite(t1);
        plane.anchor.set(0.5, 0.5);
        plane.x = 250;
        plane.y = 325;
        container.addChild(plane);

        //添加飞机元素（使用纹理1）
        const p1 = new PIXI.Sprite(t1);
        p1.anchor.set(0.5, 0.5);
        p1.x = 100;
        p1.y = 600;
        container.addChild(p1);

        //添加飞机元素（使用纹理2）
        const p2 = new PIXI.Sprite(t2);
        p2.anchor.set(0.5, 0.5);
        p2.x = 250;
        p2.y = 600;
        container.addChild(p2);

        //添加飞机元素（使用纹理3）
        const p3 = new PIXI.Sprite(t3);
        p3.anchor.set(0.5, 0.5);
        p3.x = 400;
        p3.y = 600;
        container.addChild(p3);

        //当用户点击某架飞机时，被选中的飞机切换纹理，显示被选中的图片元素
        //监听元素
        p1.interactive = true;
        p1.on("click", chang1);
        function chang1() {
            plane.texture = t1;
        }

        p2.interactive = true;
        p2.on("click", chang2);
        function chang2() {
            plane.texture = t2;
        }

        p3.interactive = true;
        p3.on("click", chang3);
        function chang3() {
            plane.texture = t3;
        }

        console.log(this)
    }
}

export default Title