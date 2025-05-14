import { skin } from "./skins.js";
import { DOMMan } from "./DOMMan.js";
import Chess from "./Chess.js";

const chess = new Chess({
  AIlog: true,
});

const game = new Object();

const dom = {
  container: document.getElementById("container"),
  regret: document.getElementById("undo"),
  restart: document.getElementById("restart"),
  moves: document.getElementById("moves"),
  loading: document.getElementById("loading"),
  sideBar: document.getElementById("sideBar"),
};

dom.regret.onclick = function () {
  chess.regret();
  if (chess.turn) {
    chess.regret();
    dom.moves.removeChild(dom.moves.lastChild);
  }
  chess.turn = true;
};

dom.restart.onclick = function () {
  dom.container.innerHTML = "";
  dom.moves.innerHTML = "";
  chess.init();
};

function getPosition(event) {
  let x = event.offsetX;
  let y = event.offsetY;
  if ((x - skin.offset.x) % skin.space.x < skin.size.x) {
    if ((y - skin.offset.y) % skin.space.y < skin.size.y) {
      return {
        x: ((x - skin.offset.x) / skin.space.x) | 0,
        y: ((y - skin.offset.y) / skin.space.y) | 0,
      };
    }
  }
}

dom.container.onclick = function (e) {
  if (!chess.ableContinue) {
    alert("游戏结束");
    return;
  }
  if (!chess.turn) {
    alert("请等待对方走棋");
    return;
  }

  let get = getPosition(e);
  const my = 1;
  if (get) {
    const { x, y } = get;
    const man = chess.map[y][x];
    if (man && man.my == my) {
      game.selected && game.selected.click(x, y);
      game.selected = man;
      game.selected.click(x, y);
      // audio.move.play();
    } else if (game.selected) {
      if (chess.indexOfPs(game.selected.ps, [get.x, get.y])) {
        chess.move(game.selected.poi.x, game.selected.poi.y, x, y);
        game.selected.click();
        game.selected = null;
        chess.turn = false;
        if (chess.ableContinue)
          setTimeout(function () {
            chess.AIplay({
              cb: (p) => {
                console.log(p);
              },
            });
          });
      } else {
        // audio.fail.play();
      }
    }
  }
};

function shadow() {
  for (let y = 0; y < 10; y++) {
    for (let x = 0; x < 9; x++) {
      let div = document.createElement("div");
      div.style.height = skin.size.y + "px";
      div.style.width = skin.size.x + "px";
      div.style.position = "absolute";
      div.style.left = skin.offset.x + skin.space.x * x + "px";
      div.style.top = skin.offset.y + skin.space.y * y + "px";
      div.style.backgroundColor = "rgba(222,22,222,.2)";
      dom.container.appendChild(div);
    }
  }
}

document.onselectstart = function () {
  return false;
};

document.ondragstart = function () {
  return false;
};

document.oncontextmenu = (function () {
  let show = false;
  return function () {
    show = !show;
    if (show) {
      dom.sideBar.style.display = "block";
    } else {
      dom.sideBar.style.display = "none";
    }
    return false;
  };
})();

function render() {
  const { map } = chess;
  for (let y = 0; y < 10; y++) {
    for (let x = 0; x < 9; x++) {
      const key = map[y][x];
      if (key) {
        console.log(key);
      }
    }
  }
}

function createBoard() {
  const table = document.createElement("table");
  for (let y = 0; y < 10 - 1; y++) {
    const tr = document.createElement("tr");
    for (let x = 0; x < 9 - 1; x++) {
      const td = document.createElement("td");
      tr.appendChild(td);
    }
    table.appendChild(tr);
  }
  dom.container.appendChild(table);
}

createBoard();

chess.reset((chess, key) => new DOMMan(key, chess, dom.container, skin));

train.onclick = function () {
  chess.train();
};

window.chess = chess;
