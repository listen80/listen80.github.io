export const imgs = {}
export const audios = {}

export default function loadResource(fn) {
  const audioList = ['attack', 'boom', 'start'];
  for (var i = 0, audioLength = audioList.length; i < audioLength; i++) {
    const audio = document.createElement('audio');
    const key = audioList[i];
    audio.onloadstart = function() {
      i--;
      if (!i && !j) {
        fn()
      }
    }
    audio.src = 'audio/' + key + '.mp3';
    audios[key] = audio;
  }

  const imgList = ['p1', 'p2', 'enemy', 'wall', 'steel', 'grass', 'water', 'home', 'bullet', 'blast', 'destory'];
  for (var j = 0, imgsLength = imgList.length; j < imgsLength; j++) {
    const img = new Image();
    const key = imgList[j];
    img.onload = function() {
      j--;
      if (!i && !j) {
        fn(imgs)
      }
    }
    img.src = 'images/' + key + '.gif';
    imgs[key] = img;
  }
}
