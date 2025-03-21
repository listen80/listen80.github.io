// engine
import Controller from "./Controller.js";
import Canvas from "./canvas.js";
import Loader from "./Loader.js";
import { Group } from "./klass.js";
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
        this.gotoMap();
      })
    );
  }

  gotoLevel() {
    this.setRoot(new Level(args));
  }

  gotoMap(args) {
    this.setRoot(new Map(args, this.imgs));
  }

  initBase() {
    this.canvaser = new Canvas();
    this.controller = new Controller();

    this.setRoot(new Loading());
    this.render();
  }

  initGame() {
    this.loadResource(() => this.gotoTitle());
  }

  setRoot(root) {
    this.root = root;
  }

  render() {
    const render = () => {
      this.root.step(this.controller);
      this.canvaser.clear();
      this.root.draw(this.canvaser.ctx);
      requestAnimationFrame(render);
    };

    render();
  }

  loadResource(fn) {
    const audioList = ["attack", "boom", "start"];
    const imgList = [
      "p1",
      "p2",
      "enemy",
      "wall",
      "steel",
      "grass",
      "water",
      "home",
      "bullet",
      "blast",
      "destory",
    ];
    let downloaded = 0;
    this.loadImages(imgList, () => {
      downloaded++;
      if (downloaded === 2) {
        fn();
      }
    });
    this.loadAudio(audioList, () => {
      downloaded++;
      if (downloaded === 2) {
        fn();
      }
    });
  }

  loadAudio(audioList, fn) {
    const audios = {};
    for (var i = 0, audioLength = audioList.length; i < audioLength; i++) {
      var audio = document.createElement("audio");
      var key = audioList[i];
      audio.onloadstart = function () {
        i--;
        if (!i) {
          fn(audios);
        }
      };
      audio.src = "audio/" + key + ".mp3";
      audios[key] = audio;
    }
    this.audios = audios;
  }
  loadImages(imgList, fn) {
    const imgs = {};
    for (var j = 0, imgsLength = imgList.length; j < imgsLength; j++) {
      var img = new Image();
      var key = imgList[j];
      img.onload = function () {
        j--;
        if (!j) {
          fn(imgs);
        }
      };
      img.src = "images/" + key + ".gif";
      imgs[key] = img;
    }
    this.imgs = imgs;
  }
}

new Game();
