export default class Controller {
  constructor() {
    this.keys = [];
  }
  bind() {
    document.addEventListener("keydown", (e) => {
      this.keydown(e);
    });
  }
  keydown(e) {
    console.log(e.key);
    this.keys.push(e.key);
    const key = e.key;
    this.calcKey(key);
  }
  calcKey(key) {
    const x = {
      w: 'up',
      s: 'down',
      a: 'left',
      d: 'right',
      ' ': 'fire'
    }
    this.keyMap[x[key]] = true;
  }
  calc() {
    // this.keyMap = {};
    for (let key of this.keys) {
      this.keyMap[key] = true;
      if (key === " ") {
        this.keyMap.confirm = true;
      }
    }
    const _ = {
      up: "w",
      right: "d",
      down: "s",
      left: "a",
      fire: " ",
    }
  }
  reset() {
    this.keys = [];
    this.keyMap = {};
  }
}
