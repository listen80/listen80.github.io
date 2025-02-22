import { createSpriteImage, random } from '../utils.js'
export function createEnemy({ container }) {

    var enemy = createSpriteImage(`img/enemy_0${random(1, 3)}.png`, Math.random() * 450, 0);
    enemy.anchor.set(0.5, 0.5);

    var esxue2 = new PIXI.Sprite.fromImage("img/xue2.png")
    esxue2.width = 100;
    esxue2.height = 20;
    esxue2.x = -50
    esxue2.y = -50
    enemy.addChild(esxue2);

    var esxue = new PIXI.Sprite.fromImage("img/xue1.png")
    esxue.width = 100;
    esxue.height = 20;
    esxue.x = -50
    esxue.y = -50
    enemy.addChild(esxue);

    enemy.name = 'enemy'
    enemy.hp = esxue;
    let hp = 100;
    enemy.onUpdate = () => {
        enemy.y += 3
    }

    function setHP(h) {
        hp += h
        if (hp < 0) {
            hp = 0;
        }
    }
    enemy.onCrash = () => {
        setHP(-33)
        esxue.width = hp;
        if (hp === 0) {
            guale(enemy)
            enemy.parent?.removeChild(enemy)
        }
    }

    function guale(e) {
        var baos = [];
        for (var i = 1; i < 8; i++) {
            baos.push("img/bao0" + i + ".png");
        }
        var as = new PIXI.extras.AnimatedSprite.fromImages(baos);
        as.x = e.x;
        as.y = e.y;
        as.anchor.set(0.5, 0.5);
        //设置播放器速度
        as.animationSpeed = 0.2;
        //不应该循环播放
        as.loop = 0;
        as.play();
        container.addChild(as)
        as.onComplete = removeAs;
        //删除爆炸效果
        function removeAs() {
            container.removeChild(as);
        }
    }
    return enemy
}