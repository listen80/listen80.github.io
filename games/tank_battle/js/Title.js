import { Group, Text } from "./klass.js";

export default class Title extends Group {
  constructor(cb) {
    super();
    this.add(new Text({ x: 330, y: 333 }, "开始游戏"));
    document.onclick = cb;
  }
}
