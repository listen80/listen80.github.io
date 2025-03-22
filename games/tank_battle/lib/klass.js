import { BOX_SIZE, TANK_SIZE } from "../js/size.js";
import { each } from "../js/utils.js";

export class Base {
  #parent = null;
  #root = null;
  constructor({ x = 0, y = 0, w = 0, h = 0 } = {}) {
    this.x = x;
    this.y = y;
    this.w = w;
    this.h = h;
  }
  setParent(p) {
    this.#parent = p;
    this.#root = this.#parent.#root;
  }
  remove() {
    this.#parent.removeChild(this);
  }
}

export class Group extends Base {
  #children = [];
  constructor(...rest) {
    super();
    rest.forEach((child) => {
      this.add(child);
    });
  }
  removeChild(child) {
    const index = this.#children.indexOf(child);
    const re = this.#children.splice(index, 1);
    if (re.length) {
      child.setParent(null);
    } else {
      console.error("?????");
    }
  }
  add(...childlren) {
    for (let child of childlren) {
      if (typeof child === "object" && child) {
        child.setParent(this);
        // child.#parent = this;
        this.#children.push(child);
      } else {
        //   console.error(child, this);
      }
    }
  }
  reset() {
    this.#children.splice(0, this.length);
    console.warn("reset");
  }
  step(controller) {
    this.#children.forEach((child, i) => {
      child.step?.(controller);
    });
  }
  draw(ctx) {
    this.#children.forEach((child, i) => {
      child.draw?.(ctx, i);
    });
  }
}

export class Spirit extends Base {
  constructor(x, y, w, h, img) {
    super({ x, y, w, h });
    this.x = x;
    this.y = y;
    this.w = w;
    this.h = h;
    this.img = img;
  }
  draw(ctx) {
    ctx.drawImage(this.img, this.x, this.y, this.w, this.h);
  }
}

export class Text extends Base {
  constructor(pos, text) {
    super(pos);
    this.text = text;
  }
  draw(ctx) {
    ctx.fillStyle = "red";
    ctx.fillText(this.text, this.x, this.y);
  }
}

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
    each(this.ObstacleArray, function (arr) {
      each(arr, function (target, index) {
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
  move(i) {
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
  draw(ctx) {
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
    this.ObstacleArray = [
      //   EnemyArray,
      //   PlayerArray,
      //   WallArray,
      //   BorderArray,
      //   SteelArray,
      //   WaterArray,
    ];
    this.canBeDestoried = true;
    this.baseSpeed = 3;
    this.name = "tank";
  }
}

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
  step(i) {
    if (this.fire) {
      this.fire = false;
      if (!this.cold) {
        this.cold = 1 * 30;
        // BulletArray.push(new Bullet(this));
        audios.attack.play();
      }
    }
    if (this.cold) {
      this.cold--;
    }
    this.move(i);
    // this.draw();
  }
}

export class Enemy extends Tank {
  constructor(x, y) {
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
        audios.attack.play();
      }
    }
    if (this.cold) {
      this.cold--;
    }
    this.move(i);
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
    this.ObstacleArray = [
      EnemyArray,
      PlayerArray,
      WallArray,
      BorderArray,
      SteelArray,
      BulletArray,
    ];
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
