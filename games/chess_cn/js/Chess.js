import { getDefaultMap } from "./base/map.js";
import { cache } from "./base/cache.js";
// 创建 AI Worker，用于处理 AI 逻辑
const AIWorker = new Worker("js/base/AI.js", { type: "module" });

const aimap = {
  ...cache,
  ...JSON.parse(localStorage.getItem("aimap") || "{}"),
};

if (Object.keys(aimap).length > 0) {
  console.log("cache数据已加载", Object.keys(cache).length);
  console.log("AI缓存数据已加载", Object.keys(aimap).length);
}

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
    this.createMove(oldX, oldY, newX, newY);
    this.pace.push(`${oldX}${oldY}${newX}${newY}`);

    const clearMan = this.map[newY][newX];
    this.clearKey.push(clearMan);
    if (clearMan) clearMan.hide();

    this.map[oldY][oldX] = null;
    this.map[newY][newX] = man;
    // man.move(newX, newY);
  }

  // 游戏胜利逻辑
  win() {
    this.continuation = false;
    setTimeout(() => {
      console.warn("win");
    }, 1000);
  }

  // 游戏失败逻辑
  lose() {
    this.continuation = false;
    setTimeout(() => {
      console.warn("lose");
    }, 1000);
  }

  // 悔棋逻辑
  regret() {
    if (this.selected) {
      this.selected.click();
      this.selected = null;
    }
    const lastPace = this.pace.pop();
    if (!lastPace) return false;

    const [oldX, oldY, newX, newY] = lastPace.split("").map(Number);
    const key = this.map[newY][newX];
    const man = this.mans[key];

    this.map[oldY][oldX] = key;
    // man.move(oldX, oldY);

    const clearKey = this.clearKey.pop();
    this.map[newY][newX] = clearKey;
    if (clearKey) this.mans[clearKey].show();

    this.continuation = true;
    this.delMove();
  }

  // 创建棋子的移动记录
  createMove(x, y, newX, newY) {
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
  check(my) {
    const map = clone(this.map);
    const moves = AIWorker.getMoves(map, my);
    for (const move of moves) {
      const [_, __, newX, newY] = move;
      const clearKey = map[newY][newX];
      if (clearKey === "j0" || clearKey === "J0") return true;
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
    this.selected = null; // 当前选中的棋子
    this.turn = true; // 当前回合，true 表示白棋
    this.continuation = true; // 游戏是否继续
    this.map = getDefaultMap(); // 初始化棋盘
    this.pace = []; // 步伐记录
    this.clearKey = []; // 清除的棋子记录
    this.createMans(cb); // 创建棋子
  }

  // AI 执行一步棋
  AIplay({ my = -1, depth = 4, cb } = {}) {
    const log = this.config.AIlog;
    const map = this.getMapKeys();
    console.log("当前棋盘", map + "");
    if (aimap[map]) {
      // 如果有缓存的走法，直接使用
      console.log("命中缓存", aimap[map]);
      const [x, y, distX, distY] = aimap[map].split("").map(Number);
      this.move(x, y, distX, distY, my);
      this.turn = true;
      cb?.({ x, y, distX, distY }, map);
      return;
    }
    console.log("没有命中缓存，开始计算");
    AIWorker.onmessage = (e) => {
      const p = e.data;

      if (!p) {
        my === -1 ? this.win() : this.lose();
      } else {
        const { x, y, distX, distY, value } = p;
        aimap[map] = `${x}${y}${distX}${distY}`;
        console.log("新的走法，开始写入缓存");
        localStorage.setItem("aimap", JSON.stringify(aimap));
        if (value <= -9999) {
          my === -1 ? this.win() : this.lose();
          return;
        }
        this.move(x, y, distX, distY, my);
        this.turn = true;
      }

      cb?.(p, map);
    };
    AIWorker.postMessage({ my, map, depth, log });
  }

  train(depth = 6) {
    // 训练 AI，深度为 6
    // const aimap = {};
    let count = 0;
    const train = (my) => {
      this.AIplay({
        my,
        depth,
        cb: (p) => {
          if (!p) {
            console.warn("没有走法了");
            return;
          }
          count++;
          if (count > 1000) {
            AIWorker.terminate();
            console.log("训练超过最大次数", count);
            console.log("缓存数据", aimap);
            return;
          }

          train(-my);
        },
      });
    };
    train(this.turn ? 1 : -1);
  }
}

export default Chess;
