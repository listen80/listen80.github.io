import loader, { imgs } from "./engine/loader.js";
import ctx from "./engine/renderer.js";

import Map from "./role/Map.js"

function render() {
  const round = new Map(12);
  round.draw(ctx, 0, 0);
  requestAnimationFrame(render)
}

loader(render);
