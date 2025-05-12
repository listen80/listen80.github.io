var chess = {}

chess.pic = function () {
  let map = chess.map;
  let log = "";
  for (let y = 0; y < 10; y++) {
    for (let x = 0; x < 9; x++) {
      log += (map[y][x].key || "  ") + " ";
    }
    log += "\n";
  }
  console.log(log);
}

chess.move = function (oldX, oldY, newX, newY, my) {
  const man = chess.map[oldY][oldX];
  chess.createMove(oldX, oldY, newX, newY);
  chess.pace.push("" + oldX + oldY + newX + newY);

  const clearMan = chess.map[newY][newX];

  chess.clearKey.push(clearMan);
  if (clearMan) {
    clearMan.hide();
  }
  chess.map[oldY][oldX] = null;
  chess.map[newY][newX] = man;
  man.move(newX, newY);
  // if (key == 'j0') {
  //   chess.lose();
  // } else if (key == 'J0') {
  //   chess.win();
  // }
  // if (chess.check(my)) {
  //   audio.check.play();
  // } else if (key) {
  //   audio.eat.play();
  // } else {
  //   audio.move.play();
  // }
}

chess.win = function () {
  chess.continuation = false;
  alert('win');
}

chess.lose = function () {
  chess.continuation = false;
  alert('lose')
}

chess.regret = function () {
  if (chess.selected) {
    chess.selected.click();
    chess.selected = null;
  }
  let lastpace = chess.pace.pop();
  if (!lastpace) return;
  let pace = lastpace.split('');
  let key = chess.map[pace[3]][pace[2]];
  let man = chess.mans[key];
  chess.map[pace[1]][pace[0]] = key;
  man.move(Number(pace[0]), Number(pace[1]));
  let clearKey = chess.clearKey.pop();
  chess.map[pace[3]][pace[2]] = clearKey;
  if (clearKey) {
    chess.mans[clearKey].show();
  }
  chess.continuation = true;
  chess.delMove();
}

chess.createMove = function (x, y, newX, newY, map) {
  const man = chess.map[y][x];
  let text = man.text;
  if (man.my === 1) {
    const mumTo = ["一", "二", "三", "四", "五", "六", "七", "八", "九"];
    newX = 8 - newX;
    text += mumTo[8 - x];
    if (newY > y) {
      text += "退";
      if (man.pater == "m" || man.pater == "s" || man.pater == "x") {
        text += mumTo[newX];
      } else {
        text += mumTo[newY - y - 1];
      }
    } else if (newY < y) {
      text += "进";
      if (man.pater == "m" || man.pater == "s" || man.pater == "x") {
        text += mumTo[newX];
      } else {
        text += mumTo[y - newY - 1];
      }
    } else {
      text += "平";
      text += mumTo[newX];
    }
  } else {
    const mumTo = ["１", "２", "３", "４", "５", "６", "７", "８", "９"];
    text += mumTo[x];
    if (newY > y) {
      text += "进";
      if (man.pater == "M" || man.pater == "S" || man.pater == "X") {
        text += mumTo[newX];
      } else {
        text += mumTo[newY - y - 1];
      }
    } else if (newY < y) {
      text += "退";
      if (man.pater == "M" || man.pater == "S" || man.pater == "X") {
        text += mumTo[newX];
      } else {
        text += mumTo[y - newY - 1];
      }
    } else {
      text += "平";
      text += mumTo[newX];
    }
  }
  let li = document.createElement('li');
  li.classList.add(chess.turn ? 'red' : 'black');
  li.appendChild(document.createTextNode(text));
  dom.moves.appendChild(li);
}

chess.delMove = function () {
  dom.moves.removeChild(dom.moves.lastChild);
}

chess.check = function (my) {
  return
  var map = chess.clone(chess.map);
  var moves = AI.getMoves(map, my);
  for (var i = 0; i < moves.length; i++) {
    var move = moves[i];
    var newX = move[2];
    var newY = move[3];
    var clearKey = map[newY][newX];
    if (clearKey == "j0" || clearKey == "J0") {
      return true;
    }
  }
  return false;
}

function createMans() {
  var map = chess.map;
  for (let y = 0; y < 10; y++) {
    for (let x = 0; x < 9; x++) {
      const key = map[y][x];
      if (key) {
        const man = new RenderMan(key, dom.chess);
        map[y][x] = man;
        man.move(x, y);
      }
    }
  }
}

function clone(obj) {
  return JSON.parse(JSON.stringify(obj));
}

chess.indexOfPs = function (ps, xy) {
  for (let i = 0; i < ps.length; i++) {
    if (ps[i][0] == xy[0] && ps[i][1] == xy[1]) return true;
  }
  return false;
}

chess.reset = function (map = initMap) {
  chess.selected = null;
  chess.turn = true;
  chess.continuation = true;
  chess.map = clone(map);
  chess.pace = [];
  chess.clearKey = [];
  createMans();
}

const AI = new Worker("js/AI.js");

let play = function (my, depth = 4) {

  const map = [];
  let count = 0;
  for (let y = 0; y < 10; y++) {
    const z = [];
    map.push(z);
    for (let x = 0; x < 9; x++) {
      const man = chess.map[y][x];
      if (man) {
        z.push(man.key);
        count++;
      } else {
        z.push(null);
      }
    }
  }
  if (count < 17) {
    depth = 6;
  }

  const log = true;
  AI.postMessage({ my, map, depth, log })
  AI.onmessage = function (e) {
    const p = e.data;
    if (!p) {
      if (my === -1) {
        chess.win();
      } else {
        chess.lose();
      }
    } else {
      const { x, y, distX, distY, value } = p
      // if (value <= -9999) {
      //   if (my === -1) {
      //     chess.win();
      //   } else {
      //     chess.lose();
      //   }
      //   return;
      // }
      chess.move(x, y, distX, distY, my);
      chess.turn = true;
    }
  }
}
