class Man {
  constructor(key) {
    this.key = key;
    this.pater = key.slice(0, 1);
    this.lowPater = this.pater.toLowerCase();
    this.my = this.pater === this.lowPater ? 1 : -1;
    this.text = args[this.pater];
    this.value = values[this.pater];
    this.bylaw = bylaw[this.lowPater];
  }
  bl(x, y, map) {
    return this.bylaw(x, y, this.my, map)
  }
}

class RenderMan extends Man {
  constructor(key, dom) {
    super(key);
    this.domInit(dom);
  }
  domInit(dom) {
    const div = document.createElement('div')
    div.textContent = this.text
    div.classList.add(this.my === 1 ? 'red' : 'black')
    this.div = div;
    this.dom = dom;
    this.dom.appendChild(div);
  }
  click(x, y) {
    if (this.div.classList.contains('selected')) {
      this.div.classList.remove('selected');
      this.ps = [];
      this.poi = null;
      this.psEL.map((div) => {
        div.remove();
      })
      this.psEL = [];
    } else {
      this.div.classList.add('selected');
      this.ps = this.bl(x, y, chess.map);
      this.psEL = this.ps.map(([x, y]) => {
        const div = document.createElement('div')
        div.classList.add('ps')
        div.style.transform = `translate(${skin.offset.x + x * skin.space.x}px, ${skin.offset.y + y * skin.space.y}px)`;
        this.dom.appendChild(div);
        return div;
      })
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
    this.div.style.transform = `translate(${skin.offset.x + x * skin.space.x}px, ${skin.offset.y + y * skin.space.y}px)`;
  }
}
