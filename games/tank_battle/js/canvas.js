import {
  BOX_HEIGHT,
  BOX_WIDTH,
  BOX_SIZE,
  TANK_SIZE,
  BULLET_SIZE,
} from "./size.js";

var canvas = document.createElement("canvas");
document.body.appendChild(canvas);
var ctx = canvas.getContext("2d");

var width = BOX_SIZE * BOX_WIDTH;
var height = BOX_SIZE * BOX_HEIGHT;

canvas.width = width;
canvas.height = height;
ctx.font = "bold 50px Arial";
ctx.textAlign = "center";

export default canvas;
export { ctx };
