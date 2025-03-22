import { Group, Text } from "../lib/Base.js";

export default class Loading extends Group {
  constructor() {
    super();
    this.add(new Text({ x: 200, y: 200 }, "加载中"));
  }
}
