// 导入皮肤配置模块
import { skin } from "./skins.js";
// 导入 DOM 管理模块
import { DOMMan } from "./DOMMan.js";
// 导入象棋逻辑模块
import Chess from "./Chess.js";

// 创建一个象棋实例，并开启 AI 日志功能
const chess = new Chess({
  AIlog: true,
});

// 使用更简洁的语法创建一个空对象用于存储游戏相关信息
const game = {};

// 提取获取 DOM 元素的逻辑到一个函数中，提高代码复用性
const getDomElement = (id) => document.getElementById(id);
const dom = {
  container: getDomElement("container"), // 棋盘容器
  regret: getDomElement("undo"), // 悔棋按钮
  restart: getDomElement("restart"), // 重新开始按钮
  moves: getDomElement("moves"), // 记录走棋步骤的元素
  loading: getDomElement("loading"), // 加载提示元素
  sideBar: getDomElement("sideBar"), // 侧边栏元素
};

// 提取悔棋逻辑到一个函数中，提高代码可读性和可维护性
const handleRegret = () => {
  chess.regret();
  dom.moves.removeChild(dom.moves.lastChild);
  if (chess.isMyTurn) {
    chess.regret();
    if (dom.moves.lastChild) {
      dom.moves.removeChild(dom.moves.lastChild);
    }
  }
  chess.isMyTurn = true;
};
dom.regret.onclick = handleRegret;

// 提取重新开始逻辑到一个函数中，提高代码可读性和可维护性
const handleRestart = () => {
  dom.container.innerHTML = "";
  dom.moves.innerHTML = "";
  chess.init();
};
dom.restart.onclick = handleRestart;

// 优化获取棋盘位置的函数，合并嵌套的 if 语句
function getPosition(event) {
  const x = event.offsetX;
  const y = event.offsetY;
  const isXValid = (x - skin.offset.x) % skin.space.x < skin.size.x;
  const isYValid = (y - skin.offset.y) % skin.space.y < skin.size.y;
  if (isXValid && isYValid) {
    return {
      x: Math.floor((x - skin.offset.x) / skin.space.x), // 计算并返回格子的 x 坐标
      y: Math.floor((y - skin.offset.y) / skin.space.y), // 计算并返回格子的 y 坐标
    };
  }
  return null;
}

// 提取棋盘容器点击事件的逻辑到一个函数中，提高代码可读性和可维护性
const handleContainerClick = (e) => {
  if (!chess.isGaming) {
    alert("游戏结束");
    return;
  }
  if (!chess.isMyTurn) {
    alert("请等待对方走棋");
    return;
  }

  const position = getPosition(e);
  const my = 1;
  if (position) {
    const { x, y } = position;
    const man = chess.map[y][x];
    if (man && man.my === my) {
      if (game.selected) {
        game.selected.click(x, y);
      }
      game.selected = man;
      game.selected.click(x, y);
      // audio.move.play();
    } else if (game.selected) {
      if (chess.indexOfPs(game.selected.ps, [x, y])) {
        chess.move(game.selected.poi.x, game.selected.poi.y, x, y);
        game.selected.click();
        game.selected = null;
        chess.isMyTurn = false;
        if (chess.isGaming) {
          setTimeout(() => {
            chess.AIplay({
              cb: (p) => {
                console.log(p);
              },
            });
          }, 0);
        }
      } else {
        // audio.fail.play();
      }
    }
  }
};
dom.container.onclick = handleContainerClick;

// 提取添加阴影效果的逻辑到一个函数中，提高代码复用性
function shadow() {
  for (let y = 0; y < 10; y++) {
    for (let x = 0; x < 9; x++) {
      const div = document.createElement("div");
      div.style.cssText = `
        height: ${skin.size.y}px;
        width: ${skin.size.x}px;
        position: absolute;
        left: ${skin.offset.x + skin.space.x * x}px;
        top: ${skin.offset.y + skin.space.y * y}px;
        background-color: rgba(222,22,222,.2);
      `;
      dom.container.appendChild(div);
    }
  }
}

// 禁止页面文本选择和元素拖拽，使用箭头函数简化代码
document.onselectstart = () => false;
document.ondragstart = () => false;

// 优化右键菜单事件监听器，使用更简洁的逻辑控制侧边栏显示和隐藏
let isSideBarVisible = false;
document.oncontextmenu = (e) => {
  e.preventDefault();
  isSideBarVisible = !isSideBarVisible;
  dom.sideBar.style.display = isSideBarVisible ? "block" : "none";
};

// 渲染棋盘上的棋子信息
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

// 创建棋盘表格并添加到棋盘容器中
function createBoard() {
  const table = document.createElement("table");
  for (let y = 0; y < 9; y++) { // 修正循环次数，避免少一行一列
    const tr = document.createElement("tr");
    for (let x = 0; x < 8; x++) { // 修正循环次数，避免少一行一列
      const td = document.createElement("td");
      tr.appendChild(td);
    }
    table.appendChild(tr);
  }
  dom.container.appendChild(table);
}

// 调用创建棋盘函数
createBoard();

// 重置象棋游戏，并传入 DOM 管理模块的实例化函数
chess.reset((chess, key) => new DOMMan(key, chess, dom.container, skin));

// 确保训练按钮存在后再添加点击事件监听器
const train = getDomElement("train");
if (train) {
  train.onclick = () => chess.train();
}

// 将象棋实例挂载到 window 对象上，方便在控制台调试
window.chess = chess;
