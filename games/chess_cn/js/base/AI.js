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

import { Man } from "../man/man.js";

// 使用箭头函数简化代码
self.onmessage = (e) => {
  const { map, my = -1, depth = 4, log = false } = e.data;
  const message = `getAlphaBeta depth:${depth}`;
  const start = performance.now();
  const base = createMansAndEvaluateValue(map, my);
  const best = getAlphaBeta(-9999, 9999, depth, map, my, base);
  const end = performance.now();
  if (log) {
    console.info(end - start, message, best);
  }
  postMessage(best);
};

/**
 * 根据棋盘初始布局生成棋子对象，并评估当前局面分数。
 *
 * @param {Array<Array<string|null>>} map - 棋盘二维数组，元素为棋子字符串或null。
 * @param {number} my - 当前行动方（1或-1）。
 * @returns {number} 返回当前局面的基础估值（正数对己方有利，负数对对方有利）。
 *
 * 说明：
 * - 遍历棋盘，将每个棋子字符串替换为Man对象。
 * - 计算己方与对方棋子的估值差，作为当前局面分数。
 */
const createMansAndEvaluateValue = (map, my) => {
  let value = 0;
  // 提前存储棋盘尺寸，避免每次循环都计算
  const rows = 10;
  const cols = 9;
  for (let y = 0; y < rows; y++) {
    for (let x = 0; x < cols; x++) {
      const key = map[y][x];
      if (key) {
        const man = new Man(key);
        map[y][x] = man;
        value += man.my === my ? man.value[y][x] : -man.value[y][x];
      }
    }
  }
  return value;
};

/**
 * Alpha-Beta剪枝算法实现中国象棋AI决策。
 *
 * @param {number} Alpha - Alpha值，当前最大可行分数（对己方）。
 * @param {number} Beta - Beta值，当前最小可行分数（对对方）。
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
const getAlphaBeta = (Alpha, Beta, depth, map, my, base) => {
  if (depth === 0) {
    // 递归终止，返回当前局面估值
    return { value: base };
  }
  let resolve = null;
  let value = Alpha;
  const rows = 10;
  const cols = 9;
  for (let y = 0; y < rows; y++) {
    for (let x = 0; x < cols; x++) {
      const man = map[y][x];
      if (man && man.my === my) {
        const moves = man.bl(x, y, map);
        // 提前存储移动步数长度，避免每次循环都计算
        const movesLength = moves.length;
        for (let i = 0; i < movesLength; i++) {
          const [distX, distY] = moves[i];
          const clearedMan = map[distY][distX];
          const clearedManValue = clearedMan ? clearedMan.value[distY][distX] : 0
          if (clearedManValue === 99999) {
            // 吃掉对方将/帅，直接胜利
            value = clearedManValue
            return { x, y, distX, distY, value };
          }
          // 执行走法
          map[distY][distX] = map[y][x];
          map[y][x] = null;

          // 计算局面变化分数
          const delta =
            man.value[distY][distX] -
            man.value[y][x] +
            clearedManValue;

          // 递归搜索对方应对
          const best = getAlphaBeta(
            -Beta,
            -Alpha,
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
            // 1. 对手无路可走(最开始层级)
            // 2. 没有超过 -Beta的招法(中间计算)
            // 己方胜利
            value = Beta;
            return { x, y, distX, distY, value };
          }
          if (value >= Beta) {
            // Beta剪枝，已找到比对方预期更优的走法，
            return { x, y, distX, distY, value };
          } else if (value > Alpha) {
            // 更新当前最佳分数与走法
            Alpha = value;
            resolve = { x, y, distX, distY, value };
          }
        }
      }
    }
  }
  return resolve;
};
// Alpha = 100 => -* - -100 // -50