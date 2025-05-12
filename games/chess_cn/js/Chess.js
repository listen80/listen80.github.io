import { getDefaultMap } from "./base/map.js";

const AIWorker = new Worker("js/base/AI.js", { type: "module" });

class Chess {
  constructor(config = {}) {
    this.config = {
      AIlog: true,
    };
    Object.assign(this.config, config);
  }
  pic() {
    let map = this.map;
    let log = "";
    for (let y = 0; y < 10; y++) {
      for (let x = 0; x < 9; x++) {
        log += (map[y][x]?.key || "  ") + " ";
      }
      log += "\n";
    }
    console.log(log);
  }

  getMapKeys() {
    const map = [];
    let count = 0;
    for (let y = 0; y < 10; y++) {
      const z = [];
      map.push(z);
      for (let x = 0; x < 9; x++) {
        const man = this.map[y][x];
        if (man) {
          z.push(man.key);
          count++;
        } else {
          z.push(null);
        }
      }
    }
    return map;
  }

  move(oldX, oldY, newX, newY, my) {
    const man = this.map[oldY][oldX];
    this.createMove(oldX, oldY, newX, newY);
    this.pace.push("" + oldX + oldY + newX + newY);

    const clearMan = this.map[newY][newX];

    this.clearKey.push(clearMan);
    if (clearMan) {
      clearMan.hide();
    }
    this.map[oldY][oldX] = null;
    this.map[newY][newX] = man;
    man.move(newX, newY);
    // if (key == 'j0') {
    //   this.lose();
    // } else if (key == 'J0') {
    //   this.win();
    // }
    // if (this.check(my)) {
    //   audio.check.play();
    // } else if (key) {
    //   audio.eat.play();
    // } else {
    //   audio.move.play();
    // }
  }

  win() {
    this.continuation = false;
    alert("win");
  }

  lose() {
    this.continuation = false;
    alert("lose");
  }

  regret() {
    if (this.selected) {
      this.selected.click();
      this.selected = null;
    }
    let lastpace = this.pace.pop();
    if (!lastpace) return;
    let pace = lastpace.split("");
    let key = this.map[pace[3]][pace[2]];
    let man = this.mans[key];
    this.map[pace[1]][pace[0]] = key;
    man.move(Number(pace[0]), Number(pace[1]));
    let clearKey = this.clearKey.pop();
    this.map[pace[3]][pace[2]] = clearKey;
    if (clearKey) {
      this.mans[clearKey].show();
    }
    this.continuation = true;
    this.delMove();
  }

  createMove(x, y, newX, newY, map) {
    const man = this.map[y][x];
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
    // let li = document.createElement("li");
    // li.classList.add(this.turn ? "red" : "black");
    // li.appendChild(document.createTextNode(text));
    // dom.moves.appendChild(li);
  }

  check(my) {
    var map = clone(this.map);
    var moves = AIWorker.getMoves(map, my);
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

  indexOfPs(ps, xy) {
    for (let i = 0; i < ps.length; i++) {
      if (ps[i][0] == xy[0] && ps[i][1] == xy[1]) return true;
    }
    return false;
  }

  createMans(cb) {
    var map = this.map;
    for (let y = 0; y < 10; y++) {
      for (let x = 0; x < 9; x++) {
        const key = map[y][x];
        if (key) {
          const man = cb(this, key);
          map[y][x] = man;
          man.move(x, y);
        }
      }
    }
  }
  reset(cb) {
    this.selected = null;
    this.turn = true;
    this.continuation = true;
    this.map = getDefaultMap();
    this.pace = [];
    this.clearKey = [];
    this.createMans(cb);
  }

  AIplay(my, depth = 4) {
    const log = this.config.AIlog;
    const map = this.getMapKeys();
    AIWorker.postMessage({ my, map, depth, log });
    AIWorker.onmessage = (e) => {
      const p = e.data;
      if (!p) {
        if (my === -1) {
          this.win();
        } else {
          this.lose();
        }
      } else {
        const { x, y, distX, distY, value } = p;
        if (value <= -9999) {
          if (my === -1) {
            this.win();
          } else {
            this.lose();
          }
          return;
        }
        this.move(x, y, distX, distY, my);
        this.turn = true;
      }
    };
  }
}

export default Chess;
