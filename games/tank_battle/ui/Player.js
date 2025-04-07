import { BOX_SIZE } from "../js/size.js";
import { Tank } from "./ManyUI.js";

export class Player extends Tank {
  constructor(x, y, img, keys, name) {
    super(x, y, img);

    this.keys = keys;
    this.face = this.keys.up;
    // this.fatherArray = PlayerArray;
    this.isMy = true;
    this.name = name;
    this.speed = BOX_SIZE;
    console.log(this);
  }
  keydown(e) {
    var keys = this.keys;
    var key = e.key;
    switch (key) {
      case keys.left:
      case keys.right:
      case keys.up:
      case keys.down:
        this.key = key;
        this.face = key;
        break;
      case keys.fire:
        this.fire = true;
        break;
    }
  }
  keyup(e) {
    var keys = this.keys;
    var key = e.key;
    switch (key) {
      case keys.left:
      case keys.right:
      case keys.up:
      case keys.down:
        if (this.key === key) {
          this.key = null;
        }
    }
  }
  canFire() {
    return false;
  }
  calcFire() {
    if (this.calcFire) {
      this.map.createFire(this);
      console.log($engine.controller.keyMap);
    }
  }
  calcMove() {
    if (this.canMove) {
      const { up, down, left, right, fire } = $engine.controller.keyMap;
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
  step(i) {
    this.calcFire();
    this.calcMove();
  }
}
