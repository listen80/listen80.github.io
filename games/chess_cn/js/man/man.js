// man.js
// 棋子（Man）类定义，实现中国象棋棋子的属性与走法。
// 依赖：bylaw.js（走法规则）、args.js（棋子名称）、values.js（棋子估值）
//
// Man类属性：
// - key: 棋子标识（如“R”表示红车）
// - chess: 棋盘对象（可选）
// - pater: 棋子类型首字母
// - lowPater: 小写棋子类型
// - my: 所属方（1为红方，-1为黑方）
// - text: 棋子中文名
// - value: 棋子估值表
// - bylaw: 棋子走法规则
//
// 方法：
// - bl(x, y, map): 获取棋子在(x, y)位置的所有可走位置
//

import { bylaw } from "./bylaw.js";
import { args } from "./args.js";
import { values } from "./values.js";

export class Man {
  /**
   * Creates an instance of a chess piece.
   * @constructor
   * @param {string} key - The identifier for the chess piece.
   * @param {Object} chess - The chess board or game context this piece belongs to.
   * @property {string} pater - The first character of the key, representing the piece type.
   * @property {string} lowPater - The lowercase version of `pater`.
   * @property {number} my - Indicates the side: 1 for one player, -1 for the other.
   * @property {string} text - The display text for the piece, from the `args` mapping.
   * @property {number} value - The value of the piece, from the `values` mapping.
   * @property {Function} bylaw - The movement rules for the piece, from the `bylaw` mapping.
   */
  constructor(key, chess) {
    this.key = key;
    this.chess = chess;
    this.pater = key.slice(0, 1);
    this.lowPater = this.pater.toLowerCase();
    this.my = this.pater === this.lowPater ? 1 : -1;
    this.text = args[this.pater];
    this.value = values[this.lowPater];
    if (this.my === -1) {
      this.value = this.value.slice().reverse();
    }
    this.bylaw = bylaw[this.lowPater];
    // 棋子不要存储x,y
  }
  bl(x, y, map) {
    return this.bylaw(x, y, this.my, map || this.chess.map);
  }
  val(x, y) {
    return this.value[y][x];
  }
}
