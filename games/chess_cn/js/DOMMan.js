import { Man } from "./man/man.js";

// DOMMan 类继承自 Man，用于管理棋子在 DOM 中的表现
export class DOMMan extends Man {
  constructor(key, chess, dom, skin) {
    super(key, chess); // 调用父类构造函数
    this.chess = chess; // 棋盘对象
    this.skin = skin; // 棋盘皮肤配置
    this.dom = dom; // DOM 容器
    this.ps = []; // 可移动位置数组
    this.domInit(); // 初始化 DOM 元素
  }

  // 初始化棋子的 DOM 表现
  domInit() {
    this.div = this.add(this.my === 1 ? "red" : "black", this.text); // 根据阵营设置样式
  }

  // 创建棋子 DOM 元素并添加到容器中
  add(className, text) {
    const div = document.createElement("div");
    div.textContent = text || ""; // 设置棋子文本
    div.classList.add(className); // 添加样式类
    this.dom.appendChild(div); // 添加到 DOM 容器
    return div;
  }

  // 点击棋子时的逻辑
  click(x, y) {
    if (this.div.classList.contains("selected")) {
      this.cancelClick(); // 如果已选中，取消选中状态
    } else {
      this.confirmClick(x, y);
    }
  }

  // 隐藏棋子 DOM 元素
  hide() {
    this.dom.removeChild(this.div);
  }

  // 显示棋子 DOM 元素
  show() {
    this.dom.appendChild(this.div);
  }

  confirmClick(x, y) {
    // 如果未选中，设置为选中状态
    const { skin } = this;
    this.div.classList.add("selected");
    this.ps = this.bl(x, y, this.chess.map); // 获取可移动位置
    this.psElement = this.ps.map(([x, y]) => {
      // 为每个可移动位置创建提示元素
      const div = document.createElement("div");
      div.classList.add("ps");
      div.style.transform = `translate(${skin.offset.x + x * skin.space.x}px, ${
        skin.offset.y + y * skin.space.y
      }px)`;
      this.dom.appendChild(div);
      return div;
    });
    this.poi = { x, y }; // 设置当前坐标
  }

  cancelClick() {
    this.div.classList.remove("selected");
    this.ps = []; // 清空可移动位置
    this.poi = null; // 清空当前坐标
    this.psElement.map((div) => div.remove()); // 移除提示元素
    this.psElement = [];
  }

  showAbleBylawer() {
    this.div.classList.add("able");
  }

  // 移动棋子到指定位置
  move(x, y) {
    debugger
    const { skin } = this;
    this.div.style.transform = `translate(${
      skin.offset.x + x * skin.space.x
    }px, ${skin.offset.y + y * skin.space.y}px)`;
  }
  destory() {
    this.dom.removeChild(this.div); // 移除棋子 DOM 元素
  }
}
