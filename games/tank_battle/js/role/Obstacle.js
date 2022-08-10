import Node from "./Node.js"

class Obstacle extends Node {
  constructor(props, value) {
    const extend = window.valueToConfig[value];
    super({
      ...props,
      ...extend,
    });
  }
}

export default Obstacle