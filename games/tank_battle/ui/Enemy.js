export class Enemy extends Tank {
  constructor(x, y, imgs) {
    super(x, y, imgs.enemy);
    this.keys = {
      left: "left",
      right: "right",
      up: "up",
      down: "down",
    };
    this.face = this.key = this.keys.down;
    this.randomKey = Object.keys(this.keys);
    this.tick = 0;
    this.interval = (Math.random() * 30 + 30) | 0;
    // this.fatherArray = EnemyArray;
    this.isMy = false;
  }
  changeDirection() {
    this.face = this.key = this.randomKey[(Math.random() * 4) | 0];
  }
  step(i) {
    return;
    this.tick++;
    if (this.tick % this.interval === 0) {
      Math.random() > 0.5 && this.changeDirection();
      this.fire = 1;
    }
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
    // this.move(i);
    // this.draw();
  }
}
