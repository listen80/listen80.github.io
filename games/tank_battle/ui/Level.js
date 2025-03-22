import { Group, Text } from "../lib/klass.js";

export default class Level extends Group {
  constructor() {
    super();
    this.add(new Text({}, "这是第xx关"));
  }
}
