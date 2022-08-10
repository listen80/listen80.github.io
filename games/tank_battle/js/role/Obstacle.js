import Node from "./Node.js"

class Obstacle extends Node {
  constructor(props, value) {
    const config = {
      1: { image: "wall" },
      2: { image: "steel" },
      3: { image: "grass" },
      4: { image: "water" },
      5: { image: "grass" },
      9: { image: "home", height: 2, width: 2 },
    };
    const extend = config[value];
    super({
      ...props,
      ...extend,
    });
  }
}

export default Obstacle