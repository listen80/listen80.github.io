import { imgs } from "../engine/loader.js";

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
    this.image = imgs[image];
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

export default Node;
