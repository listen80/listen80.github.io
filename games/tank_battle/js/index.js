// engine
import Controller from "./Controller.js";
import Canvas from "./canvas.js";
import Loader from "./Loader.js";
import { Group } from "../lib/klass.js";
// scene
import Loading from "./Loading.js";
import Map from "./Map.js";
import Title from "./Title.js";
import Level from "./Level.js";

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
