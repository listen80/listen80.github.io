import { BOX_SIZE } from "../js/size.js";
import { Tank } from "./ManyUI.js";

export class Player extends Tank {
  constructor(x, y, img, name) {
    super(x, y, img);
    this.isMy = true;
    this.name = name;
    this.speed = BOX_SIZE;
  }
  canFire() {
    return false;
  }
  calcFire() {
    const { fire } = $engine.controller.keyMap;
    if (fire && this.calcFire) {
      this.map.createFire(this);
      console.log($engine.controller.keyMap);
    }
  }
  calcMove() {
    if (!this.canMove) {
      const { up, down, left, right } = $engine.controller.keyMap;
      if (up) {
        this.y -= this.speed;
      }
      if (down) {
        this.y += this.speed;
      }
      if (left) {
        this.x -= this.speed;
      }
      if (right) {
        this.x += this.speed;
      }
    }
  }
  step() {
    this.calcFire();
    this.calcMove();
  }
}
