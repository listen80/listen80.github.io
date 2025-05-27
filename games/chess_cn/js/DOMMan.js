// 导入 Man 类，该类作为 DOMMan 类的父类
import { Man } from "./man/man.js";

/**
 * DOMMan 类继承自 Man 类，主要用于管理棋子在 DOM 中的表现。
 * 它负责棋子的创建、销毁、点击处理、移动、显示和隐藏等操作。
 */
export class DOMMan extends Man {
  /**
   * 构造函数，初始化 DOMMan 实例。
   * @param {any} key - 棋子的唯一标识
   * @param {object} chess - 棋盘对象，包含棋盘的相关信息
   * @param {HTMLElement} dom - DOM 容器，用于存放棋子的 DOM 元素
   * @param {object} skin - 棋盘皮肤配置，包含偏移量和间距等信息
   */
  constructor(key, chess, dom, skin) {
    // 调用父类 Man 的构造函数
    super(key, chess); 
    // 保存棋盘对象
    this.chess = chess; 
    // 保存棋盘皮肤配置
    this.skin = skin; 
    // 保存 DOM 容器
    this.dom = dom; 
    // 初始化可移动位置数组
    this.ps = []; 
    // 调用 create 方法初始化棋子的 DOM 元素
    this.create(); 
  }

  /**
   * 初始化棋子的 DOM 表现，创建一个 div 元素作为棋子的 DOM 表示。
   */
  create() {
    // 创建一个 div 元素
    const div = document.createElement("div");
    // 设置 div 元素的文本内容为棋子的文本，如果没有则为空
    div.textContent = this.text || ""; 
    // 根据棋子的阵营添加相应的样式类，1 为红色阵营，其他为黑色阵营
    div.classList.add(this.my === 1 ? "red" : "black"); 
    // 将创建的 div 元素保存到实例属性中
    this.div = div; 
    // 将 div 元素添加到 DOM 容器中
    this.dom.appendChild(div); 
  }

  /**
   * 销毁棋子的 DOM 元素，将其从 DOM 容器中移除。
   * 注意：此处函数名可能拼写错误，正确应为 destroy
   */
  destory() {
    // 从 DOM 容器中移除棋子的 div 元素
    this.dom.removeChild(this.div); 
  }

  /**
   * 处理棋子的点击事件。
   * 如果棋子已经被选中，则取消选中状态；否则，确认选中该棋子。
   * @param {number} x - 棋子被点击时的 x 坐标
   * @param {number} y - 棋子被点击时的 y 坐标
   */
  click(x, y) {
    // 检查棋子的 div 元素是否包含 "selected" 类
    if (this.div.classList.contains("selected")) {
      // 如果已选中，调用 cancelClick 方法取消选中状态
      this.cancelClick(); 
    } else {
      // 如果未选中，调用 confirmClick 方法确认选中
      this.confirmClick(x, y);
    }
  }

  /**
   * 确认选中棋子，设置棋子为选中状态，并显示可移动位置的提示元素。
   * @param {number} x - 棋子当前的 x 坐标
   * @param {number} y - 棋子当前的 y 坐标
   */
  confirmClick(x, y) {
    // 为棋子的 div 元素添加 "selected" 类，表示已选中
    this.div.classList.add("selected");
    // 保存棋子的当前坐标
    this.poi = { x, y }; 
    // 调用 bl 方法获取棋子的可移动位置
    this.ps = this.bl(x, y, this.chess.map); 
    // 为每个可移动位置创建提示元素
    this.psElement = this.ps.map(([x, y]) => {
      // 创建一个 div 元素作为提示元素
      const div = document.createElement("div");
      // 为提示元素添加 "ps" 类
      div.classList.add("ps");
      // 移动棋子到指定位置
      this.move(x, y);
      // 将提示元素添加到 DOM 容器中
      this.dom.appendChild(div);
      return div;
    });
  }

  /**
   * 取消棋子的选中状态，移除选中样式和可移动位置的提示元素。
   */
  cancelClick() {
    // 从棋子的 div 元素中移除 "selected" 类
    this.div.classList.remove("selected");
    // 清空当前坐标
    this.poi = null; 
    // 清空可移动位置数组
    this.ps = []; 
    // 移除所有可移动位置的提示元素
    this.psElement.forEach((div) => div.remove()); 
    // 清空保存提示元素的数组
    this.psElement.splice(0, this.psElement.length);
  }

  /**
   * 隐藏棋子的 DOM 元素，将其从 DOM 容器中移除。
   */
  hide() {
    // 从 DOM 容器中移除棋子的 div 元素
    this.dom.removeChild(this.div);
  }

  /**
   * 显示棋子的 DOM 元素，将其添加到 DOM 容器中。
   */
  show() {
    // 将棋子的 div 元素添加到 DOM 容器中
    this.dom.appendChild(this.div);
  }

  /**
   * 根据规则显示棋子可操作状态，为棋子的 div 元素添加 "able" 类。
   */
  showAbleBylawer() {
    // 为棋子的 div 元素添加 "able" 类
    this.div.classList.add("able");
  }

  /**
   * 移动棋子到指定位置，通过设置元素的 transform 属性实现。
   * @param {number} x - 目标位置的 x 坐标
   * @param {number} y - 目标位置的 y 坐标
   */
  move(x, y) {
    // 从实例属性中获取棋盘皮肤配置
    const { skin } = this;
    // 计算棋子在 X 轴的偏移量
    const translateX = skin.offset.x + x * skin.space.x; 
    // 计算棋子在 Y 轴的偏移量
    const translateY = skin.offset.y + y * skin.space.y; 
    // 设置棋子的 div 元素的 transform 属性，实现位置移动
    this.div.style.transform = `translate(${translateX}px, ${translateY}px)`; 
  }
}
