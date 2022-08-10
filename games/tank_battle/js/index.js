import loader from "./engine/loader.js";
import ctx from "./engine/renderer.js";

import Map from "./role/Map.js"

class Game {
  constructor() {
    function render() {
      const round = new Map(12);
      round.draw(ctx, 0, 0);
      requestAnimationFrame(render)
    }
    loader(render);
  }
}

new Game()
