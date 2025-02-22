//创建窗口
import '../lib/pixi.min.js';

import { getCanvas } from './utils.js';
import Title from './Title/index.js';
import Game from './Game/index.js';

class Engine extends PIXI.Application {
    constructor() {
        super(...arguments)
        this.current = null
        this.scenes = {
            Title,
            Game,
        }
        function update(parent) {
            // console.log('2123123')
            parent.onUpdate?.call(parent)
            parent.children.forEach((child) => update(child))
        }

        this.ticker.add(() => update(this.stage))
    }
    jump(data) {
        this.stage.removeChild(this.current)
        this.current = new Game({ app: this, data })
        this.stage.addChild(this.current)
    }
}

const app = new Engine({
    view: getCanvas(),
    width: 512,
    height: 700
});

app.jump({ data: 123123 })

console.log(app)