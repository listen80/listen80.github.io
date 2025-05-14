// AI.js
// 实现中国象棋AI的Alpha-Beta剪枝算法。
// 主要功能：
// 1. 接收主线程消息，计算最佳走法。
// 2. 通过createMansAndEvaluateValue函数初始化棋盘并评估局面。
// 3. getAlphaBeta函数递归搜索，返回最佳走法及其估值。
//
// 依赖：
// - Man类（../man/man.js）：棋子对象，包含走法生成与估值。
//
// 主要导出：无（作为Web Worker使用，通过postMessage返回结果）
//
// 作者：listen80
// 日期：2025-05-14
//

import { Man } from "../man/man.js";

self.onmessage = function (e) {
  const { map, my = -1, depth = 2, log = false } = e.data;
  const message = `getAlphaBeta depth:${depth}`;
  const start = performance.now();
  const best = getAlphaBeta(
    -99999,
    99999,
    depth,
    map,
    my,
    createMansAndEvaluateValue(map, my)
  );
  const end = performance.now();
  if (log) {
    console.info(end - start, message, best);
  }
  postMessage(best);
};

const createMansAndEvaluateValue = (map, my) => {
  let value = 0;
  for (let y = 0; y < 10; y++) {
    for (let x = 0; x < 9; x++) {
      let key = map[y][x];
      if (key) {
        const man = new Man(key);
        map[y][x] = man;
        if (man.my === my) {
          value += man.value[y][x];
        } else {
          value -= man.value[y][x];
        }
      } else {
        map[y][x] = null;
      }
    }
  }
  return value;
};

/**
 * Alpha-Beta剪枝算法实现中国象棋AI决策。
 *
 * @param {number} A - Alpha值，当前最大可行分数（对己方）。
 * @param {number} B - Beta值，当前最小可行分数（对对方）。
 * @param {number} depth - 搜索深度，递归终止条件。
 * @param {Array<Array<Object|null>>} map - 当前棋盘二维数组（棋子对象或null）。
 * @param {number} my - 当前行动方（1或-1）。
 * @param {number} base - 当前局面基础估值。
 * @returns {Object|null} 返回最佳走法及估值，格式：
 *   - {number} x - 起始x坐标
 *   - {number} y - 起始y坐标
 *   - {number} distX - 目标x坐标
 *   - {number} distY - 目标y坐标
 *   - {number} value - 该走法的估值
 *   若无可走步则返回null。
 */
const getAlphaBeta = (A, B, depth, map, my, base) => {
  if (depth === 0) {
    // 递归终止，返回当前局面估值
    return { value: base };
  }
  let resolve = null;
  let value = A;
  for (let y = 0; y < 10; y++) {
    for (let x = 0; x < 9; x++) {
      const man = map[y][x];
      if (man && man.my === my) {
        // 遍历己方所有棋子
        const moves = man.bl(x, y, map); // 生成所有可走步
        for (let i = 0, len = moves.length; i < len; i++) {
          const move = moves[i];
          const [distX, distY] = move;
          const clearedMan = map[distY][distX];
          if (clearedMan && clearedMan.lowPater === "j") {
            // 吃掉对方将/帅，直接胜利
            return { x, y, distX, distY, value: 99999 };
          }
          // 执行走法
          map[distY][distX] = map[y][x];
          map[y][x] = null;
          // 计算局面变化分数
          const delta =
            man.value[distY][distX] -
            man.value[y][x] +
            (clearedMan ? clearedMan.value[distY][distX] : 0);
          // 递归搜索对方应对
          const best = getAlphaBeta(
            -B,
            -A,
            depth - 1,
            map,
            -my,
            -(base + delta)
          );
          // 撤销走法
          map[y][x] = map[distY][distX];
          map[distY][distX] = clearedMan;
          if (best) {
            value = -best.value;
          } else {
            // 对手无路可走，己方胜利
            value = B;
            return { x, y, distX, distY, value };
          }
          if (value >= B) {
            // Beta剪枝，已找到比对方预期更优的走法
            return { x, y, distX, distY, value };
          } else if (value > A) {
            // 更新当前最佳分数与走法
            A = value;
            resolve = { x, y, distX, distY, value };
          }
        }
      }
    }
  }
  return resolve;
};
