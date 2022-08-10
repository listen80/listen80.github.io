import { BOX_SIZE, BOX_WIDTH, BOX_HEIGHT } from "../config.js";

const canvas = document.createElement("canvas");
const ctx = canvas.getContext("2d");
const width = BOX_SIZE * BOX_WIDTH;
const height = BOX_SIZE * BOX_HEIGHT;


canvas.width = width;
canvas.height = height;
ctx.font = "bold 50px Arial";
ctx.textAlign = "center";
document.body.appendChild(canvas);

ctx.fillStyle = 'black';
ctx.fillRect(0, 0, canvas.width, canvas.height);

export const render = (node) => {

}

export default ctx;
