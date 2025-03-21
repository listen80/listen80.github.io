import { audios, imgs } from "./resource.js";
import { ctx } from "./canvas.js";
import { maps } from "./maps.js";
import {
  BOX_HEIGHT,
  BOX_WIDTH,
  BOX_SIZE,
  TANK_SIZE,
  BULLET_SIZE,
} from "./size.js";

import {
  Grass,
  Group,
  Water,
  Steel,
  Home,
  Player,
  Enemy,
  Wall,
} from "./klass.js";

var width = BOX_SIZE * BOX_WIDTH;
var height = BOX_SIZE * BOX_HEIGHT;

var paused = false;
var tick = 0;
var round = 0;
var left = 0;

function render(ctx) {
  if (paused) {
    return;
  }

  if (EnemyArray.length === 0 && left === 0) {
    round++;
    startGame();
  }
  tick++;
  ctx.fillStyle = "black";
  ctx.fillRect(0, 0, ctx.canvas.width, ctx.canvas.height);
  if (EnemyArray.length < 5 && left && tick > 180) {
    var rand = Math.random();
    EnemyArray.push(
      rand < 0.3
        ? new Enemy(0, 0)
        : rand < 0.7
        ? new Enemy(12, 0)
        : new Enemy(24, 0)
    );
    left--;
  }
  all.step();
  all.draw(ctx);

  requestAnimationFrame(() => render(ctx));
}

var GrassArray,
  WaterArray,
  WallArray,
  PlayerArray,
  EnemyArray,
  BulletArray,
  BoomArray,
  SteelArray;
let BorderArray;

const all = new Group();
console.log(all);

function AddPlayer1() {
  !PlayerArray.filter(function (p) {
    return p.name === "1p";
  }).length &&
    PlayerArray.push(
      new Player(
        8,
        24,
        imgs.p1,
        {
          up: "w",
          right: "d",
          down: "s",
          left: "a",
          fire: " ",
        },
        "1p"
      )
    );
}

function AddPlayer2() {
  !PlayerArray.filter(function (p) {
    return p.name === "2p";
  }).length &&
    PlayerArray.push(
      new Player(
        16,
        24,
        imgs.p2,
        {
          up: "ArrowUp",
          right: "ArrowRight",
          down: "ArrowDown",
          left: "ArrowLeft",
          fire: "0",
        },
        "2p"
      )
    );
}

function AddEnemy() {
  EnemyArray.push(new Enemy(0, 0), new Enemy(12, 0), new Enemy(24, 0));
}

BorderArray = [
  // new Base(0, 0, width, 0),
  // new Base(0, 0, 0, height),
  // new Base(width, 0, 0, height),
  // new Base(0, height, width, 0),
];

function initGame() {
  document.onkeydown = function (e) {
    switch (e.key) {
      case "n":
        round++;
        startGame();
        break;
      case "b":
        round--;
        startGame();
        break;
      case "p":
        paused = !paused;
        if (paused) {
          audios.start.pause();
        } else {
          render();
        }
        break;
      case "q":
        AddPlayer1();
        break;
      case ".":
        AddPlayer2();
        break;
      case "+":
        AddEnemy();
        break;
      default:
        PlayerArray.forEach(function (tank) {
          tank.keydown(e);
        });
    }
  };
  document.onkeyup = function (e) {
    PlayerArray.forEach(function (tank) {
      tank.keyup(e);
    });
  };
}

// document.addEventListener("click", () => {
//   loadResource(initGame, audioList, imgList);
// });

class Map extends Group {
  constructor({ ctx, round, totalTankNum, imgs }) {
    super();
    this.imgs = imgs;
    this.grassArray = new Group();
    this.wallArray = new Group();
    this.waterArray = new Group();
    this.playerArray = new Group();
    this.enemyArray = new Group();
    this.boomArray = new Group();
    this.bulletArray = new Group();
    this.steelArray = new Group();
    this.add(
      this.grassArray,
      this.wallArray,
      this.waterArray,
      this.playerArray,
      this.enemyArray,
      this.boomArray,
      this.bulletArray,
      this.steelArray
    );
    const map = maps[round];
    this.createBoard(map);
  }
  createBoard(map) {
    for (var y = 0; y < map.length; y++) {
      for (var x = 0; x < map[y].length; x++) {
        switch (map[y][x]) {
          case 1:
            this.wallArray.add(new Wall(x, y, this.imgs));
            break;
          case 2:
            this.steelArray.add(new Steel(x, y, this.imgs));
            break;
          case 3:
            this.grassArray.add(new Grass(x, y, this.imgs));
            break;
          case 4:
            this.waterArray.add(new Water(x, y, this.imgs));
            break;
          case 5:
            this.grassArray.add(new Grass(x, y, this.imgs));
            break;
          case 9:
            this.wallArray.add(new Home(x, y, this.imgs));
            break;
          default:
            break;
        }
      }
    }
  }
}

class Game {
  constructor() {
    this.loadResource(() => {
      this.createCanvas();
      this.root = new Map({ round: 0, totalTankNum: 20, imgs: this.imgs });
      this.render();
      console.log(this.root);
    });
    this.controller = null;
  }
  clear(ctx) {
    ctx.fillStyle = "black";
    ctx.fillRect(0, 0, ctx.canvas.width, ctx.canvas.height);
  }
  render() {
    const render = () => {
      this.clear(this.ctx);
      this.root.step(this.controller);
      this.root.draw(this.ctx);
      requestAnimationFrame(render);
    };

    render();
  }

  startGame() {
    // function resetGame() {
    //   audios.start.pause();
    //   audios.start.currentTime = 0;
    //   if (round < 0) {
    //     round += maps.length;
    //   } else {
    //     round %= maps.length;
    //   }
    //   left = 0;
    //   tick = 0;
    //   GrassArray.reset();
    //   WallArray.reset();
    //   WaterArray.reset();
    //   BoomArray.reset();
    //   BulletArray.reset();
    //   EnemyArray.reset();
    //   SteelArray.reset();
    //   PlayerArray.reset();
    // }
    resetGame();
    AddPlayer1();
    AddPlayer2();
    AddEnemy();
    createBoard(round);
  }
  createCanvas() {
    var canvas = document.createElement("canvas");
    document.body.appendChild(canvas);
    var ctx = canvas.getContext("2d");
    this.ctx = ctx;
    var width = BOX_SIZE * BOX_WIDTH;
    var height = BOX_SIZE * BOX_HEIGHT;

    canvas.width = width;
    canvas.height = height;
    ctx.font = "bold 50px Arial";
    ctx.textAlign = "center";
    this.canvas = canvas;
  }
  loadResource(fn) {
    const audioList = ["attack", "boom", "start"];
    const imgList = [
      "p1",
      "p2",
      "enemy",
      "wall",
      "steel",
      "grass",
      "water",
      "home",
      "bullet",
      "blast",
      "destory",
    ];
    let downloaded = 0;
    this.loadImages(imgList, () => {
      downloaded++;
      if (downloaded === 2) {
        fn();
      }
    });
    this.loadAudio(audioList, () => {
      downloaded++;
      if (downloaded === 2) {
        fn();
      }
    });
  }

  loadAudio(audioList, fn) {
    const audios = {};
    for (var i = 0, audioLength = audioList.length; i < audioLength; i++) {
      var audio = document.createElement("audio");
      var key = audioList[i];
      audio.onloadstart = function () {
        i--;
        if (!i) {
          fn(audios);
        }
      };
      audio.src = "audio/" + key + ".mp3";
      audios[key] = audio;
    }
    this.audios = audios;
  }
  loadImages(imgList, fn) {
    const imgs = {};
    for (var j = 0, imgsLength = imgList.length; j < imgsLength; j++) {
      var img = new Image();
      var key = imgList[j];
      img.onload = function () {
        j--;
        if (!j) {
          fn(imgs);
        }
      };
      img.src = "images/" + key + ".gif";
      imgs[key] = img;
    }
    this.imgs = imgs;
  }
}

new Game();
