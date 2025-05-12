import values from "./values.js";
import { init_map } from "./map.js";
import { bylaw } from "./bylaw.js";

function getValue(my) {
  var val = 0;
  for (var y = 0; y < 8; y++) {
    for (var x = 0; x < 8; x++) {
      var z = map[y][x];
      if (z) {
        man = mans[z];
        var v = man.value[y][x];
        if (man.my === my) {
          val += v;
        } else {
          val -= v;
        }
      }
    }
  }
  return val;
}

function getMans(my) {
  var mymans = [];
  for (var y = 0; y < 8; y++) {
    for (var x = 0; x < 8; x++) {
      var z = map[y][x];
      if (z) {
        man = mans[z];
        if (man.my === my) {
          mymans.push(man);
        }
      }
    }
  }
  return mymans;
}

var getAlphaBeta = function (A, B, depth, map, my) {
  var val;
  var bestpace;

  var mymans = getMans(my);
  for (var i in mymans) {
    var man = mymans[i];
    var paces = man.pace();
    for (var t in paces) {
      var pace = paces[t];
      var x = man.x;
      var y = man.y;
      var eat = man.goto(pace.y, pace.x);
      if (depth > 1) {
        var best = getAlphaBeta(-B, -A, depth - 1, map, !my);
        if (best) {
          val = -best.val;
        } else {
          val = 9999;
        }
      } else {
        val = getValue(my);
      }

      man.goto(y, x);
      map[pace.y][pace.x] = eat;

      if (val >= B) {
        return {
          key: man.key,
          x: pace.y,
          y: pace.x,
          value: B,
        };
      }
      if (val > A) {
        A = val;
        bestpace = {
          key: man.key,
          y: pace.y,
          x: pace.x,
          val: val,
        };
      }
    }
  }
  return bestpace;
};

function clone2Arr(arr) {
  var a = [];
  for (var x in arr) {
    a.push(arr[x].slice());
  }
  return a;
}

function Man({ y, x, my, type, img, key }) {
  this.x = x;
  this.y = y;
  this.my = my;
  this.type = type;
  this.img = img;
  this.key = key;
  this.checked = false;
  this.values = this.my ? values[this.type] : values[this.type].slice().reverse();

  this.val = function () {
    return this.values[this.y][this.x];
  };
  this.pace = function () {
    return bylaw[this.type](map, this.y, this.x, this.my);
  };
  this.goto = function (y, x, fn) {
    delete map[this.y][this.x];
    var eat = map[y][x];
    map[y][x] = this.key;

    this.checked = false;
    this.y = y;
    this.x = x;
    fn && fn(eat);
    return eat;
  };
  this.check = function () {
    if (preman) {
      preman.checked = false;
    }
    pace = this.pace(this.y, this.x);
    this.paces = pace;
    preman = this;
    this.checked = true;
  };
  this.ablego = function (y, x) {
    var v;
    for (var i in this.paces) {
      v = this.paces[i];
      if (v.y === y && v.x === x) {
        return true;
      }
    }
    return false;
  };
}

function loadAudio(fn) {
  var arr = ["fail", "check", "eat", "move"];
  var all = arr.length;
  var loaded = 0;
  for (var x in arr) {
    var t = document.createElement("audio");
    t.key = arr[x];
    t.onloadstart = function () {
      var _ = this;
      loaded++;
      audio[this.key] = function () {
        _.play();
      };
      if (loaded === all) {
        fn && fn();
      }
    };
    t.src = "audio/" + t.key + ".ogg";
  }
}

function loadImage(fn) {
  var imgsList = [
    "black_rook",
    "black_knight",
    "black_bishop",
    "black_queen",
    "black_king",
    "black_pawn",
    "white_pawn",
    "white_rook",
    "white_knight",
    "white_bishop",
    "white_queen",
    "white_king",
  ];
  var len = imgsList.length;
  function onload() {
    len--;
    if (!len) {
      fn && fn();
    }
  }
  for (var x = 0; x < len; x++) {
    var img = document.createElement("img");
    var key = imgsList[x];
    imgs[key] = img;
    img.onload = onload;
    img.src = "images/" + key + "_3.png";
  }
}

function initChess() {
  document.body.appendChild(canvas);
  canvas.onclick = function (event) {
    var x = (event.offsetX / 100) | 0;
    var y = (event.offsetY / 100) | 0;
    var z = map[y][x];
    if (myturn === true || pvp) {
      if (preman) {
        if (z) {
          var man = mans[z];
          if (preman !== man) {
            if (man.my === myturn) {
              man.check();
            } else {
              if (preman.ablego(y, x)) {
                var eat = preman.goto(y, x);
                aftergo(eat);
                draw();
                if (!pvp) {
                  setTimeout(AIplay, 20);
                }
              } else {
                audio.fail();
              }
            }
          }
        } else {
          if (preman.ablego(y, x)) {
            var eat = preman.goto(y, x);
            aftergo(eat);
            draw();
            if (!pvp) {
              setTimeout(AIplay, 20);
            }
          } else {
            audio.fail();
          }
        }
        draw();
      } else {
        if (z) {
          var man = mans[z];
          if (man.my === myturn) {
            man.check();
          }
        }
        draw();
      }
    }
  };

  for (var y = 0; y < 8; y++) {
    for (var x = 0; x < 8; x++) {
      var key = init_map[y][x];
      if (key) {
        var info = key.split("_");
        var man = new Man({
          x,
          y,
          my: info[0] === "white",
          type: info[1],
          img: imgs[info[0] + "_" + info[1]],
          key: key,
        });

        mans[z] = man;
      }
    }
  }
  start();
}

function draw() {
  ctx.clearRect(0, 0, 800, 800);
  for (var y = 0; y < 8; y++) {
    for (var x = 0; x < 8; x++) {
      ctx.fillStyle = (y ^ x) % 2 ? "#222" : "#fff";
      ctx.fillRect(x * 100, y * 100, 100, 100);
      var z = map[y][x];
      if (z) {
        var man = mans[z];
        if (man.checked) {
          ctx.beginPath();
          ctx.lineWidth = 4;
          ctx.strokeStyle = "lime";
          ctx.arc(x * 100 + 50, y * 100 + 50, 40, 0, Math.PI * 2);
          ctx.closePath();
          ctx.stroke();
        }
        ctx.drawImage(man.img, x * 100 + 18, y * 100 + 18, 64, 64);
      }
    }
  }
  for (var x in pace) {
    var p = pace[x];
    ctx.beginPath();
    ctx.lineWidth = 4;
    ctx.fillStyle = "lime";
    ctx.arc(p.x * 100 + 50, p.y * 100 + 50, 8, 0, Math.PI * 2);
    ctx.closePath();
    ctx.stroke();
  }
}

function start(isPvp) {
  pvp = isPvp;
  map = clone2Arr(init_map);
  draw();
}

function aftergo(key) {
  myturn = !myturn;
  preman = null;
  pace = [];
  if (key) {
    audio.eat();
  } else {
    audio.move();
  }
}

const AI = (function () {
  if (location.protocol === "file:") {
    return function (data, callback) {
      callback &&
        callback(getAlphaBeta(-9999, 9999, data.depth, data.map, data.my));
    };
  } else {
    var worker = new Worker("js/worker.js");
    return function (data, callback) {
      worker.onmessage = function (event) {
        callback && callback.call(this, event.data);
      };
      worker.postMessage(data);
    };
  }
})();

function AIplay() {
  AI({ map: map, depth: 4, my: false }, function (bestpace) {
    var eat = mans[bestpace.key].goto(bestpace.y, bestpace.x);
    aftergo(eat);
    draw();
  });
}

var w = 800;
var h = 800;
var canvas = document.createElement("canvas");
var ctx = canvas.getContext("2d");
canvas.height = h;
canvas.width = w;
var audio = {};
var imgs = {};
var mans = {};
var map;
var preman;
var myturn = true;
var pvp = false;
var pace = [];

function init() {
  loadAudio(function () {
    loadImage(function () {
      initChess();
    });
  });
}

init();
