import { bylaw } from "./bylaw.js";
import { args } from "./args.js";
import { values } from "./values.js";

export class Man {
  constructor(key, chess) {
    this.key = key;
    this.chess = chess;
    this.pater = key.slice(0, 1);
    this.lowPater = this.pater.toLowerCase();
    this.my = this.pater === this.lowPater ? 1 : -1;
    this.text = args[this.pater];
    this.value = values[this.pater];
    this.bylaw = bylaw[this.lowPater];
  }
  bl(x, y, map) {
    return this.bylaw(x, y, this.my, map || this.chess.map);
  }
  // move(x, y) {
  //   this.x = x;
  //   this.y = y;
  //   const ateMan = this.chess.map[y][x];
  //   this.chess.map[y][x] = this.key;
  //   return ateMan
  // }
}
