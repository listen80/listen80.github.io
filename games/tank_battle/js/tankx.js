import loader, { imgs } from "./loader.js";
import ctx from "./renderer.js";

class Node {
  constructor(props) {
    const {
      left = 0,
      top = 0,
      width = 1,
      height = 1,
      image = null,
      text = "",
      style = null,
      boxSize = 30,
      children = [],
    } = props;
    this.left = left;
    this.top = top;
    this.width = width;
    this.height = height;
    this.image = image;
    this.text = text;
    this.style = style;
    this.boxSize = boxSize;
    this.children = children;
  }
  get right() {
    return this.left + this.width;
  }
  get bottom() {
    return this.top + this.height;
  }
  add(child) {
    this.children.push(child);
  }
  remove(child) {
    this.children.splice(this.children.indexOf(child));
  }
  draw(ctx, offsetLeft, offsetTop) {
    const { left, top, width, height, boxSize, image, text, style } = this;
    ctx.save();
    Object.assign(ctx, style);
    if (image) {
      ctx.drawImage(
        image,
        left * boxSize,
        top * boxSize,
        width * boxSize,
        height * boxSize
      );
    }
    if (text) {
      ctx.fillText(text, left * boxSize, top * boxSize);
    }
    const nextOffsetLeft = left + offsetLeft;
    const nextOffsetTop = top + offsetTop;
    this.children.forEach((child) => {
      child.draw(ctx, nextOffsetLeft, nextOffsetTop);
    });
    ctx.restore();
  }
}

class ZhangAi extends Node {
  constructor(props, value) {
    const mapToObj = {
      1: "wall",
      2: "steel",
      3: "grass",
      4: "water",
      5: "grass",
      9: "home",
    };
    let size = 1;
    if (value === 9) {
      size = 2;
    }
    super({
      ...props,
      height: size,
      width: size,
    });
    this.image = imgs[mapToObj[value]];
  }
}

class RoundGame extends Node {
  constructor(round) {
    super({ left: 0, top: 0, width: 26, height: 26 });
    this.map = maps[round];
    this.map.forEach((row, top) =>
      row.forEach((value, left) => {
        if (value) {
          const node = new ZhangAi({ left, top }, value);
          this.children.push(node);
        }
      })
    );
    const p1 = new Node({
      left: 8,
      top: 24,
      width: 2,
      height: 2,
      image: imgs.p1,
      text: "123",
      style: { fillStyle: "red" },
    });

    this.children.push(p1);
  }
}

function initGame() {
  const round = new RoundGame(12);
  round.draw(ctx, 0, 0);
  console.log(round);
}

loader(initGame);
