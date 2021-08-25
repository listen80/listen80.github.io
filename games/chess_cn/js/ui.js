const dom = {
  chess: document.getElementById('chess'),
  regret: document.getElementById('regret'),
  restart: document.getElementById('restart'),
  moves: document.getElementById('moves'),
  loading: document.getElementById('loading'),
  sideBar: document.getElementById('sideBar'),

}

dom.regret.onclick = function () {
  chess.regret();
  if (chess.turn) {
    chess.regret();
  }
  chess.turn = true;
}

dom.restart.onclick = function () {
  dom.chess.innerHTML = '';
  dom.moves.innerHTML = '';
  chess.init();
}

dom.chess.onclick = function () {
  if (!chess.turn || !chess.continuation) return;
  let get = chess.getPosition();
  const my = 1;
  if (get) {
    const { x, y } = get;
    const man = chess.map[y][x];
    if (man && man.my == my) {
      chess.selected && chess.selected.click(x, y);
      chess.selected = man;
      chess.selected.click(x, y);
      // audio.move.play();
    } else if (chess.selected) {
      if (chess.indexOfPs(chess.selected.ps, [get.x, get.y])) {
        chess.move(chess.selected.poi.x, chess.selected.poi.y, x, y);
        chess.selected.click();
        chess.selected = null;
        chess.turn = false;
        if (chess.continuation)
          setTimeout(function () {
            play(-1);
          }, 111);
      } else {
        // audio.fail.play();
      }
    }
  }
}

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

chess.shadow = function () {
  for (let y = 0; y < 10; y++) {
    for (let x = 0; x < 9; x++) {
      let div = document.createElement('div');
      div.style.height = skin.size.y + 'px';
      div.style.width = skin.size.x + 'px';
      div.style.position = "absolute";
      div.style.left = skin.offset.x + skin.space.x * x + 'px';
      div.style.top = skin.offset.y + skin.space.y * y + 'px';
      div.style.backgroundColor = "rgba(222,22,222,.2)";
      dom.chess.appendChild(div);
    }
  }
}

chess.getPosition = function () {
  var arr = {};
  let x = window.event.offsetX
  let y = window.event.offsetY;
  if ((x - skin.offset.x) % skin.space.x < skin.size.x) {
    if ((y - skin.offset.y) % skin.space.y < skin.size.y) {
      return {
        x: (x - skin.offset.x) / skin.space.x | 0,
        y: (y - skin.offset.y) / skin.space.y | 0,
      }
    }
  }

}

document.onselectstart = function () {
  return false;
}

document.ondragstart = function () {
  return false;
}

document.oncontextmenu = (function () {
  let show = false;
  return function () {
    show = !show;
    if (show) {
      dom.sideBar.style.display = 'block';
    } else {
      dom.sideBar.style.display = 'none';
    }
    return false;
  }
})()

chess.clone = function (arr) {
  return JSON.parse(JSON.stringify(arr));
}

const skin = {
  space: {
    x: 80,
    y: 80
  },
  offset: {
    x: 0,
    y: 0
  },
  size: {
    x: 72,
    y: 72
  }
}

function createBoard() {
  const table = document.createElement('table');
  for (let y = 0; y < 10 - 1; y++) {
    const tr = document.createElement('tr');
    for (let x = 0; x < 9 - 1; x++) {
      const td = document.createElement('td');
      tr.appendChild(td);
    }
    table.appendChild(tr);
  }
  dom.chess.appendChild(table)
}

createBoard();

chess.reset();
