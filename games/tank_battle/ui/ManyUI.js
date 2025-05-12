import { BOX_SIZE, TANK_SIZE } from "../js/size.js";
import { Base, Group, Text, Spirit } from "../lib/Base.js";

export class Grass extends Spirit {
  constructor(x, y, imgs) {
    super(x * BOX_SIZE, y * BOX_SIZE, BOX_SIZE, BOX_SIZE, imgs.grass);
  }
}

export class Water extends Spirit {
  constructor(x, y, imgs) {
    super(x * BOX_SIZE, y * BOX_SIZE, BOX_SIZE, BOX_SIZE, imgs.water);
  }
}

export class Wall extends Spirit {
  constructor(x, y, imgs) {
    super(x * BOX_SIZE, y * BOX_SIZE, BOX_SIZE, BOX_SIZE, imgs.wall);
    this.canBeDestoried = true;
    // this.fatherArray = WallArray;
  }
}

export class Steel extends Spirit {
  constructor(x, y, imgs) {
    super(x * BOX_SIZE, y * BOX_SIZE, BOX_SIZE, BOX_SIZE, imgs.steel);
  }
}

export class Home extends Spirit {
  constructor(x, y, imgs) {
    super(x * BOX_SIZE, y * BOX_SIZE, BOX_SIZE * 2, BOX_SIZE * 2, imgs.home);
  }
}

export class Move extends Spirit {
  constructor(x, y, w, h, img) {
    super(x, y, w, h, img);
  }
  left(target, x) {
    var line = target.x + target.w;
    if (
      this.x > target.x + target.w &&
      x <= target.x + target.w &&
      this.y + this.h >= target.y &&
      this.y <= target.y + target.h
    ) {
      return { next: line + 1 };
    }
  }
  right(target, x) {
    var line = target.x - this.w;
    if (
      this.x < line &&
      x >= line &&
      this.y + this.h >= target.y &&
      this.y <= target.y + target.h
    ) {
      return { next: line - 1 };
    }
  }
  up(target, y) {
    var line = target.y + target.h;
    if (
      this.y > line &&
      y <= line &&
      this.x + this.w >= target.x &&
      this.x <= target.x + target.w
    ) {
      return { next: line + 1 };
    }
  }
  down(target, y) {
    var line = target.y - this.h;
    if (
      this.y < line &&
      y >= line &&
      this.x + this.w >= target.x &&
      this.x <= target.x + target.w
    ) {
      return { next: line - 1 };
    }
  }
  handleObstacle(next, dir, i) {
    var self = this;
    this.ObstacleArray.forEach(function (arr) {
      this.arr.forEach(function (target, index) {
        if (
          self === target ||
          (self.hasDestoryAbility &&
            target.isMy === self.isMy &&
            (target.name === "tank" || target.hasDestoryAbility))
        ) {
          return;
        } else {
          var result = self[dir](target, next);
          if (result) {
            self.handlePengzhang(target, self, index, i);
            next = result.next;
          }
        }
      });
    });
    return next;
  }
  handlePengzhang(target, self, index, i) {
    if (self.hasDestoryAbility) {
      //   self.fatherArray.splice(i, 1);
      self.remove();
      BoomArray.push(new Boom(self));
      if (target.canBeDestoried) {
        target.remove();
        // target.fatherArray.splice(index, 1);
        target.destoryProps && BoomArray.push(new Boom(target));
      }
    }
  }
  move(keyMap) {
    var key = this.key;
    var keys = this.keys;
    var next;
    switch (key) {
      case keys.left:
        next = this.x - this.baseSpeed;
        this.x = this.handleObstacle(next, "left", i);
        break;
      case keys.right:
        next = this.x + this.baseSpeed;
        this.x = this.handleObstacle(next, "right", i);
        break;
      case keys.up:
        next = this.y - this.baseSpeed;
        this.y = this.handleObstacle(next, "up", i);
        break;
      case keys.down:
        next = this.y + this.baseSpeed;
        this.y = this.handleObstacle(next, "down", i);
        break;
    }
  }
  drawX(ctx) {
    ctx.save();
    ctx.translate(this.x + this.w / 2, this.y + this.h / 2);
    ctx.rotate(
      ([this.keys.up, this.keys.right, this.keys.down, this.keys.left].indexOf(
        this.face
      ) *
        Math.PI) /
        2
    );
    ctx.translate(-this.w / 2, -this.h / 2);
    ctx.drawImage(this.img, 0, 0, this.w, this.h);
    ctx.restore();
  }
}

export class Tank extends Move {
  constructor(x, y, img) {
    super(x * BOX_SIZE, y * BOX_SIZE, TANK_SIZE, TANK_SIZE, img);
    this.x += (BOX_SIZE * 2 - TANK_SIZE) / 2;
    this.y += (BOX_SIZE * 2 - TANK_SIZE) / 2;
    this.destoryProps = {
      // img: imgs.destory,
      frames: [0, 1, 2, 3, 2, 1, 3, 1, 3, 1, 0],
      interval: 1,
      size: 66,
    };
    this.ObstacleArray = [];
    this.canBeDestoried = true;
    this.baseSpeed = 3;
    this.name = "tank";
  }
}

export class Bullet extends Move {
  constructor(props) {
    super(props.x, props.y, BULLET_SIZE, BULLET_SIZE, imgs.bullet);
    this.baseSpeed = props.baseSpeed * 4;
    this.canBeDestoried = true;
    this.hasDestoryAbility = true;
    this.destoryProps = {
      img: imgs.blast,
      frames: [1, 2, 1, 0],
      interval: 1,
      size: 32,
    };
    // this.fatherArray = BulletArray;
    this.isMy = props.isMy;
    var face = (this.face = this.key = props.face);
    var keys = (this.keys = props.keys);
    var offset = TANK_SIZE - BULLET_SIZE;
    this.ObstacleArray = [];
    switch (face) {
      case keys.left:
        this.y += offset / 2;
        break;
      case keys.right:
        this.x += offset;
        this.y += offset / 2;
        break;
      case keys.up:
        this.x += offset / 2;
        break;
      case keys.down:
        this.x += offset / 2;
        this.y += offset;
        break;
    }
  }
  step(i) {
    this.move(i);
    // this.draw();
  }
}

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
    return
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

export class Boom extends Spirit {
  constructor(props) {
    var destoryProps = props.destoryProps;
    super(
      props.x,
      props.y,
      destoryProps.size,
      destoryProps.size,
      destoryProps.img
    );
    this.tick = 0;
    this.frame = 0;
    // this.fatherArray = BoomArray;
    this.frames = destoryProps.frames;
    this.interval = destoryProps.interval;
    this.x += (props.w - this.w) / 2;
    this.y += (props.h - this.h) / 2;
  }
  step(i) {
    this.tick++;
    if (this.tick % this.interval === 0) {
      this.frame++;
      if (this.frame === this.frames.length) {
        // this.fatherArray.splice(i, 1);
      }
    }
    ctx.drawImage(
      this.img,
      this.frames[this.frame] * this.w,
      0,
      this.w,
      this.h,
      this.x,
      this.y,
      this.w,
      this.h
    );
  }
}
