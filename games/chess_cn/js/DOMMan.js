import { Man } from "./man/man.js";

export class DOMMan extends Man {
  constructor(key, chess, dom, skin) {
    super(key, chess);
    this.chess = chess;
    this.skin = skin;
    this.dom = dom;
    this.domInit();
  }
  domInit() {
    this.div = this.add(this.my === 1 ? "red" : "black", this.text);
  }
  add(className, text) {
    const div = document.createElement("div");
    div.textContent = text || '';
    div.classList.add(className);
    this.dom.appendChild(div);
    return div
  }
  click(x, y) {
    const { skin } = this;
    if (this.div.classList.contains("selected")) {
      this.div.classList.remove("selected");
      this.ps = [];
      this.poi = null;
      this.psEL.map((div) => div.remove());
      this.psEL = [];
    } else {
      this.div.classList.add("selected");
      this.ps = this.bl(x, y, this.chess.map);
      this.psEL = this.ps.map(([x, y]) => {
        const div = document.createElement("div");
        div.classList.add("ps");
        div.style.transform = `translate(${skin.offset.x + x * skin.space.x
          }px, ${skin.offset.y + y * skin.space.y}px)`;
        this.dom.appendChild(div);
        return div;
      });
      this.poi = { x, y };
    }
  }
  hide() {
    this.dom.removeChild(this.div);
  }
  show() {
    this.dom.appendChild(this.div);
  }
  move(x, y) {
    const { skin } = this;
    this.div.style.transform = `translate(${skin.offset.x + x * skin.space.x
      }px, ${skin.offset.y + y * skin.space.y}px)`;
  }
}
