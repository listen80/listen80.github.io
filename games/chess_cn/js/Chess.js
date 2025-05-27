import { getDefaultMap } from "./base/map.js";
import { cache } from "./base/cache.js";
// 创建 AI Worker，用于处理 AI 逻辑
const AIWorker = new Worker("js/base/AI.js", { type: "module" });

const AIMapJSON = {
  // ...cache,
  // ...JSON.parse(localStorage.getItem("AIMapJSON") || "{}"),
};

// 如果缓存有数据，打印缓存信息
if (Object.keys(AIMapJSON).length > 0) {
  console.log("cache数据已加载", Object.keys(cache).length);
  console.log("AI缓存数据已加载", Object.keys(AIMapJSON).length);
}

// 棋类主类
class Chess {
  constructor(config = {}) {
    // 初始化配置，默认启用 AI 日志
    this.config = { AIlog: true };
    Object.assign(this.config, config);
  }

  // 打印当前棋盘状态到控制台
  to2ArrString() {
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

  // 获取当前棋盘的键值表示
  getMapKeys() {
    const map = [];
    for (let y = 0; y < 10; y++) {
      const row = [];
      map.push(row);
      for (let x = 0; x < 9; x++) {
        const man = this.map[y][x];
        row.push(man ? man.key : null);
      }
    }
    return map;
  }

  // 执行棋子移动逻辑
  move(oldX, oldY, newX, newY, my) {
    const man = this.map[oldY][oldX];
    this.createMoveText(oldX, oldY, newX, newY);
    this.paceArr.push(`${oldX}${oldY}${newX}${newY}`);

    const clearMan = this.map[newY][newX];
    this.clearedManKeyArr.push(clearMan);
    if (clearMan) clearMan.hide();

    this.map[oldY][oldX] = null;
    this.map[newY][newX] = man;
    man.move(newX, newY);
  }

  // 游戏胜利逻辑
  win() {
    this.isGaming = false;
    setTimeout(() => {
      console.warn("win");
    }, 1000);
  }

  // 游戏失败逻辑
  lose() {
    this.isGaming = false;
    setTimeout(() => {
      console.warn("lose");
    }, 1000);
  }

  // 悔棋逻辑
  /**
   * 撤销最近一步棋。
   *
   * 如果有选中的棋子，先取消选中。然后从步伐记录（paceArr）中移除最后一步，
   * 并将棋盘和被吃子的状态还原到上一步。如果没有可撤销的步伐，返回 false。
   *
   * @returns {boolean} 无步伐可撤销时返回 false，否则返回 true。
   */
  regret() {
    if (this.selectedMan) {
      this.selectedMan.click();
      this.selectedMan = null;
    }
    const lastPace = this.paceArr.pop();
    if (!lastPace) return false;

    const [oldX, oldY, newX, newY] = lastPace.split("").map(Number);
    const key = this.map[newY][newX];
    const man = this.mans[key];

    this.map[oldY][oldX] = key;
    // man.move(oldX, oldY);

    const clearedManKeyArr = this.clearedManKeyArr.pop();
    this.map[newY][newX] = clearedManKeyArr;
    if (clearedManKeyArr) this.mans[clearedManKeyArr].show();
    this.isGaming = true;

    this.delMove();
    return true;
  }

  // 创建棋子的移动记录（中文描述）
  createMoveText(x, y, newX, newY) {
    const man = this.map[y][x];
    let text = man.text;

    // 根据棋子阵营生成移动描述
    if (man.my === 1) {
      const mumTo = ["一", "二", "三", "四", "五", "六", "七", "八", "九"];
      newX = 8 - newX;
      text += mumTo[8 - x];
      if (newY > y) {
        text +=
          "退" +
          (man.pater === "m" || man.pater === "s" || man.pater === "x"
            ? mumTo[newX]
            : mumTo[newY - y - 1]);
      } else if (newY < y) {
        text +=
          "进" +
          (man.pater === "m" || man.pater === "s" || man.pater === "x"
            ? mumTo[newX]
            : mumTo[y - newY - 1]);
      } else {
        text += "平" + mumTo[newX];
      }
    } else {
      const mumTo = ["１", "２", "３", "４", "５", "６", "７", "８", "９"];
      text += mumTo[x];
      if (newY > y) {
        text +=
          "进" +
          (man.pater === "M" || man.pater === "S" || man.pater === "X"
            ? mumTo[newX]
            : mumTo[newY - y - 1]);
      } else if (newY < y) {
        text +=
          "退" +
          (man.pater === "M" || man.pater === "S" || man.pater === "X"
            ? mumTo[newX]
            : mumTo[y - newY - 1]);
      } else {
        text += "平" + mumTo[newX];
      }
    }
  }

  // 检查是否被将军
  isInCheck(my) {
    const map = clone(this.map);
    const moves = AIWorker.getMoves(map, my);
    for (const move of moves) {
      const [_, __, newX, newY] = move;
      const clearedManKeyArr = map[newY][newX];
      if (clearedManKeyArr === "j0" || clearedManKeyArr === "J0") return true;
    }
    return false;
  }

  // 检查坐标是否在给定的点集合中
  indexOfPs(ps, xy) {
    return ps.some(([px, py]) => px === xy[0] && py === xy[1]);
  }

  // 创建棋子并初始化棋盘
  createMans(cb) {
    const map = this.map;
    for (let y = 0; y < 10; y++) {
      for (let x = 0; x < 9; x++) {
        const key = map[y][x];
        if (key) {
          const man = cb(this, key);
          map[y][x] = man;
          // man.move(x, y);
        }
      }
    }
  }

  // 重置游戏状态
  reset(cb) {
    this.map = getDefaultMap(); // 初始化棋盘
    this.selectedMan = null; // 当前选中的棋子
    this.isMyTurn = true; // 当前回合，true 表示红棋
    this.isGaming = true; // 游戏是否继续 被将死 五路可走了
    this.paceArr = []; // 步伐记录
    this.clearedManKeyArr = []; // 清除的棋子记录
    this.createMans(cb); // 创建棋子
  }

  setGameOver(my) {}

  // AI 走棋后处理
  afterAI(p, my, map) {
    if (!p) {
      my === -1 ? this.win() : this.lose();
    } else {
      const { x, y, distX, distY, value } = p;
      AIMapJSON[map] = `${x}${y}${distX}${distY}`;
      console.log("新的走法，开始写入缓存");
      localStorage.setItem("AIMapJSON", JSON.stringify(AIMapJSON));
      if (value === 99999) {
        this.move(x, y, distX, distY, my);
        // 吃掉老将
        my === -1 ? this.lose() : this.win();
        return;
      }
      if (value <= -9999) {
        my === -1 ? this.win() : this.lose();
        return;
      }
      this.move(x, y, distX, distY, my);
      this.isMyTurn = true;
    }
  }

  // AI 执行一步棋
  AIplay({ my = -1, depth = 4, cb } = {}) {
    const log = this.config.AIlog;
    const map = this.getMapKeys();
    console.log("当前棋盘", map + "");
    if (AIMapJSON[map]) {
      // 如果有缓存的走法，直接使用
      console.log("命中缓存", AIMapJSON[map]);
      const [x, y, distX, distY] = AIMapJSON[map].split("").map(Number);
      this.move(x, y, distX, distY, my);
      this.isMyTurn = true;
      cb?.({ x, y, distX, distY }, map);
    } else {
      console.log("没有命中缓存，开始计算");
      AIWorker.onmessage = (e) => {
        const p = e.data;
        this.afterAI(p, my, map);
        cb?.(p, map);
      };
      AIWorker.postMessage({ my, map, depth, log });
    }
  }

  // 训练 AI，自动走棋并缓存
  train(depth = 6) {
    // 训练 AI，深度为 6
    // const AIMapJSON = {};
    let count = 0;
    const train = (my) => {
      this.AIplay({
        my,
        depth,
        cb: (p) => {
          if (!p) {
            console.warn("没有走法了");
            // 应该要认输，按规则来说
            return;
          }
          count++;
          if (count > 1000) {
            AIWorker.terminate();
            console.log("训练超过最大次数", count);
            console.log("缓存数据", AIMapJSON);
            return;
          }

          train(-my);
        },
      });
    };
    train(this.isMyTurn ? 1 : -1);
  }
}

export default Chess;
