import { Group, Text } from "../lib/Base.js";

export default class Level extends Group {
  constructor() {
    super();
    this.add(new Text({}, "这是第xx关"));
  }
}
