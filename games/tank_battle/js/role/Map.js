import Node from "./Node.js"
import Obstacle from "./Obstacle.js"

class RoundGame extends Node {
  constructor(round) {
    super({ left: 0, top: 0, width: 26, height: 26 });
    this.map = window.maps[round];
    this.map.forEach((row, top) =>
      row.forEach((value, left) => {
        if (value) {
          const node = new Obstacle({ left, top }, value);
          this.children.push(node);
        }
      })
    );
    const p1 = new Node({
      left: 8,
      top: 24,
      width: 2,
      height: 2,
      image: "p1",
      text: "123",
      style: { fillStyle: "red" },
    });
    this.children.push(p1);
  }
}

export default RoundGame;
