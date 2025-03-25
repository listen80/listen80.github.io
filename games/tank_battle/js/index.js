// engine
import Controller from "../lib/Controller.js";
import Canvas from "../lib/Canvas.js";
import Loader from "../lib/Loader.js";
import { Group, Text } from "../lib/Base.js";

// scene
import Loading from "../ui/Loading.js";
import Map from "../ui/Map.js";
import Title from "../ui/Title.js";
import Level from "../ui/Level.js";

class Game extends Group {
  constructor() {
    super();
    this.loader = new Loader();
    this.loader.init(() => {
      this.initBase();
      this.initGame();
    });
  }

  gotoTitle(args) {
    this.setRoot(
      new Title(() => {
        this.gotoMap(args);
      })
    );
  }

  gotoLevel() {
    this.setRoot(
      new Level(() => {
        this.gotoMap();
      })
    );
  }

  gotoMap(args) {
    this.setRoot(new Map(args, this.loader));
  }

  initBase() {
    this.canvaser = new Canvas();
    this.controller = new Controller();
    this.controller.bind();
    window.$engine = this;
    this.setRoot(new Loading());
    this.render();
  }

  initGame() {
    this.loader.loadResource(() => this.gotoTitle());
  }

  setRoot(root) {
    this.root = root;
  }

  render() {
    const render = () => {
      // this.root.emit();
      this.controller.calc();
      this.root.step(this.controller);
      this.controller.reset();
      this.canvaser.clear();
      this.root.draw(this.canvaser.ctx);
      requestAnimationFrame(render);
    };

    render();
  }
}

new Game();
