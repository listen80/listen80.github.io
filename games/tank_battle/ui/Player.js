import { Tank } from "./ManyUI.js";

export class Player extends Tank {
  constructor(x, y, img, keys, name) {
    super(x, y, img);

    this.keys = keys;
    this.face = this.keys.up;
    // this.fatherArray = PlayerArray;
    this.isMy = true;
    this.name = name;
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
  openfire() {
    if (this.fire) {
      this.fire = false;
      if (!this.cold) {
        this.cold = 1 * 30;
        // BulletArray.push(new Bullet(this));
        // audios.attack.play();
      }
    }
    if (this.cold) {
      this.cold--;
    }
  }
  step(i) {
    // console.log($engine.controller)
    this.openfire();
    this.move($engine.controller.keyMap);
    // this.draw();
  }
}
