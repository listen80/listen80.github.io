import { Group, Text } from "../lib/klass.js";

export default class Loading extends Group {
  constructor() {
    super();
    this.add(new Text({ x: 200, y: 200 }, "加载中"));
  }
}
