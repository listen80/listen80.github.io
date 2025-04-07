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
  getParent() {
    return this.#parent;
  }
  remove() {
    this.#parent.removeChild(this);
  }
  getRoot() {
    return this.#root;
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
