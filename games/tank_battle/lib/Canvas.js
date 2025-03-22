import { width, height } from "../js/size.js";

export default class Canvas {
  constructor() {
    var canvas = document.createElement("canvas");
    document.body.appendChild(canvas);
    var ctx = canvas.getContext("2d");
    this.ctx = ctx;

    canvas.width = width;
    canvas.height = height;
    ctx.font = "bold 50px Arial";
    ctx.textAlign = "center";
    this.canvas = canvas;
  }
  clear() {
    const { ctx } = this;
    ctx.fillStyle = "black";
    ctx.fillRect(0, 0, ctx.canvas.width, ctx.canvas.height);
  }
}
