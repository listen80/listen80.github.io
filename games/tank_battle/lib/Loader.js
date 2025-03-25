export default class Loader {
  constructor() {
    this.imgs = {};
    this.audios = {};
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
      const audio = document.createElement("audio");
      const key = audioList[i];
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
      const img = new Image();
      const key = imgList[j];
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
  init(fn) {
    fn();
  }
}
