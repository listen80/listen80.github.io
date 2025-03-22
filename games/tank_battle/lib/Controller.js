export default class Controller {
  constructor() {
    this.keys = [];
  }
  bind() {
    document.addEventListener("keydown", (e) => {
      this.keydown(e);
    });
  }
  keydown() {
    this.keys.push(e.key);
  }
  calc() {
    this.keyMap = {};
    for (let key of this.keys) {
      this.keyMap[key] = true;
    }
  }
  reset() {
    this.keys = [];
  }
}
