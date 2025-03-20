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
  Base,
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
  if (tick > 60) {
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
    // all.forEach(() => {

    // })
    // each(WallArray, function (back) {
    //   back.draw();
    // });
    // each(WaterArray, function (water) {
    //   water.draw();
    // });
    // each(SteelArray, function (steel, i) {
    //   steel.draw();
    // });
    // each(BulletArray, function (bullet, i) {
    //   bullet.step(i);
    //   bullet.draw(i);
    // });
    // each(EnemyArray, function (enemy, i) {
    //   enemy.step(i);
    //   enemy.draw(i);
    // });
    // each(PlayerArray, function (player, i) {
    //   player.step(i);
    //   player.draw(i);
    // });
    // each(BoomArray, function (boom, i) {
    //   boom.step(i);
    //   boom.draw(i);
    // });
    // each(GrassArray, function (grass) {
    //   grass.draw();
    // });
  } else {
    ctx.fillStyle = "white";
    ctx.fillText("第" + (round + 1) + "关", width / 2, 200);
  }
  if (tick === 60) {
    audios.start.play();
  }
  requestAnimationFrame(() => render(ctx));
}

function createBoard(round) {
  var map = maps[round];
  for (var y = 0; y < map.length; y++) {
    for (var x = 0; x < map[y].length; x++) {
      switch (map[y][x]) {
        case 1:
          WallArray.push(new Wall(x, y));
          break;
        case 2:
          SteelArray.push(new Steel(x, y));
          break;
        case 3:
          GrassArray.push(new Grass(x, y));
          break;
        case 4:
          WaterArray.push(new Water(x, y));
          break;
        case 5:
          GrassArray.push(new Grass(x, y));
          break;
        case 9:
          WallArray.push(new Home(x, y));
          break;
        default:
          break;
      }
    }
  }
}

var GrassArray,
  WaterArray,
  WallArray,
  PlayerArray,
  EnemyArray,
  BulletArray,
  BoomArray,
  BorderArray,
  SteelArray;

GrassArray = new Group();
WallArray = new Group();
WaterArray = new Group();
PlayerArray = new Group();
EnemyArray = new Group();
BoomArray = new Group();
BulletArray = new Group();
SteelArray = new Group();

const all = new Group(
  GrassArray,
  WallArray,
  WaterArray,
  PlayerArray,
  EnemyArray,
  BoomArray,
  BulletArray,
  SteelArray
);
console.log(all);

function resetGame() {
  audios.start.pause();
  audios.start.currentTime = 0;
  if (round < 0) {
    round += maps.length;
  } else {
    round %= maps.length;
  }
  left = 0;
  tick = 0;
  GrassArray.reset();
  WallArray.reset();
  WaterArray.reset();
  BoomArray.reset();
  BulletArray.reset();
  EnemyArray.reset();
  SteelArray.reset();
  PlayerArray.reset();
}

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

function startGame() {
  resetGame();
  AddPlayer1();
  AddPlayer2();
  AddEnemy();
  createBoard(round);
}
BorderArray = [
  new Base(0, 0, width, 0),
  new Base(0, 0, 0, height),
  new Base(width, 0, 0, height),
  new Base(0, height, width, 0),
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

  startGame();
  render(ctx);
}

var audioList = ["attack", "boom", "start"];
var imgList = [
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

function loadResource(fn, audioList, imgList) {
  let downloaded = 0;
  loadImages(imgList, () => {
    downloaded++;
    if (downloaded === 2) {
      fn();
    }
  });
  loadAudio(audioList, () => {
    downloaded++;
    if (downloaded === 2) {
      fn();
    }
  });
}

function loadAudio(key, fn) {
  for (var i = 0, audioLength = audioList.length; i < audioLength; i++) {
    var audio = document.createElement("audio");
    var key = audioList[i];
    audio.onloadstart = function () {
      i--;
      if (!i) {
        fn();
      }
    };
    audio.src = "audio/" + key + ".mp3";
    audios[key] = audio;
  }
  return audios;
}

function loadImages(imgList, fn) {
  for (var j = 0, imgsLength = imgList.length; j < imgsLength; j++) {
    var img = new Image();
    var key = imgList[j];
    img.onload = function () {
      j--;
      if (!j) {
        fn();
      }
    };
    img.src = "images/" + key + ".gif";
    imgs[key] = img;
  }
  return imgs;
}

document.addEventListener("click", () => {
  loadResource(initGame, audioList, imgList);
});
class Game {}
