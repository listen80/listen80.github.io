import { Man } from "../man/man.js";

self.onmessage = function (e) {
  console.log('in')
  const { map, my = -1, depth = 2, log = false } = e.data;
  const message = `getAlphaBeta depth:${depth}`
  if (log) {
    console.time(message);
  }
  const best = getAlphaBeta(-6666, 6666, depth, map, my, createMansAndEvaluateValue(map, my));
  if (log) {
    console.timeEnd(message);
    console.info(best);
  }
  postMessage(best);
}

const createMansAndEvaluateValue = (map, my) => {
  let value = 0;
  for (let y = 0; y < 10; y++) {
    for (let x = 0; x < 9; x++) {
      let key = map[y][x];
      if (key) {
        const man = new Man(key)
        map[y][x] = man
        if (man.my === my) {
          value += man.value[y][x]
        } else {
          value -= man.value[y][x]
        }
      } else {
        map[y][x] = null;
      }
    }
  }
  return value;
}

const getAlphaBeta = (A, B, depth, map, my, base) => {
  if (depth === 0) { return { value: base } }
  let resolve = null;
  let value = A
  for (let y = 0; y < 10; y++) {
    for (let x = 0; x < 9; x++) {
      const man = map[y][x];
      if (man && man.my === my) {
        const moves = man.bl(x, y, map);
        for (let i = 0, len = moves.length; i < len; i++) {
          const move = moves[i];
          const [distX, distY] = move;
          const clear = map[distY][distX];
          if (clear && clear.lowPater === 'j') {
            return { x, y, distX, distY, value: 6666 };
          }
          map[distY][distX] = map[y][x], map[y][x] = null;
          const delta = man.value[distY][distX] - man.value[y][x] + (clear ? clear.value[distY][distX] : 0);
          const best = getAlphaBeta(-B, -A, depth - 1, map, -my, -(base + delta));
          map[y][x] = map[distY][distX], map[distY][distX] = clear;
          if (best) {
            value = -best.value
          } else {
            value = B; // 对手无路可走
            return { x, y, distX, distY, value };
          }
          if (value >= B) {
            // 减枝，超过已知最好预期
            return { x, y, distX, distY, value };
          } else if (value > A) {
            A = value;
            resolve = { x, y, distX, distY, value };
          }
        }
      }
    }
  }
  return resolve;
}
