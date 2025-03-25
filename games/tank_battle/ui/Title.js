import { Group, Text } from "../lib/Base.js";

export default class Title extends Group {
  constructor(cb) {
    super();
    this.add(new Text({ x: 330, y: 333 }, "开始游戏"));
    // document.onclick = cb;
    this.cb = cb;
  }
  step() {
    const key = $engine.controller.keyMap.confirm;
    if (key) {
      this.cb();
    }
  }
}
