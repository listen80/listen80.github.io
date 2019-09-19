var projects = 'Resume,Tank,Man,Xiangqi,Chess,Gemoku,Mines,Fnline,Error,Code,LT,Help'.split(',');
var html = '';
var entry = document.querySelector('.entry');
projects.forEach(function(v, i) {
  var shadow = "<div class='shadow' style='background-image:-webkit-linear-gradient(top, rgba(255, 255, 255, 0), rgba(255, 255, 255, .5))'><span>" + v + "</span></div>";
  var link = "<a href='javascript:;' target='_blank'>" + v + "</a>";
  html += "<div class='card'>" + link + shadow + "</div>";
})

entry.innerHTML = html;
var cards = entry.getElementsByClassName('card'),
  len = projects.length,
  deg = 360 / len,
  z = (300 / 2 + 40) / Math.tan((360 / len / 2) * Math.PI / 180),
  i = 0;

var shadows = entry.getElementsByClassName('shadow');
var random = Math.random() * 360 | 0;
while (i < len) {
  (function(i) {
    setTimeout(function() {
      shadows[i].style['opacity'] = '1';
      cards[i].style.transform = "rotateY(" + (i * deg) + "deg) translateZ(" + z + "px) scale(1,1)"
      cards[i].style.borderColor = 'hsla(' + (random + i * deg) + ', 100%, 50%, .5)'
    }, (len - i) * 88);
})(i++);
}

var timer

var rotateX = 4,
  rotateY = 0,
  perspective = 1300;

function setEntry() {
  entry.style.transform = ("perspective(" + perspective + "px) rotateX(" + rotateX + "deg) rotateY(" + rotateY + "deg)");
}

function startMove() {
  clearInterval(timer);
  timer = setInterval(function() {
    rotateX -= speedY;
    rotateY += speedX;

    speedY *= 0.92;
    speedX *= 0.92;
    setEntry();

    if (Math.abs(speedX) < 0.1 && Math.abs(speedY) < 0.1) {
      clearInterval(timer);
    };
  }, 30);
}

var startX, startY, lastX, lastY, down, moveX, moveY, speedY, speedX;
speedY = 0;
speedX = 0;

document.onmousedown = function(e) {
  down = 1;
  startX = rotateX;
  startY = rotateY;
  moveX = e.clientX;
  moveY = e.clientY;
  lastX = e.clientX;
  lastY = e.clientY;
  clearInterval(timer);
}

document.onmousemove = function(e) {
  if (down) {
    var x = e.screenX,
      y = e.screenY;
    rotateY = startY + (e.clientX - moveX) / 10;
    rotateX = startX - (e.clientY - moveY) / 10;
    speedX = (e.clientX - lastX) / 5;
    speedY = (e.clientY - lastY) / 5;
    lastX = e.clientX;
    lastY = e.clientY;
    setEntry();
  }
}
document.onmouseup = function() {
  down = 0;
  startMove();
}

document.onmousewheel = function(e) {
  if (e.wheelDelta ? e.wheelDelta < 0 : e.detail > 0) {
    if (perspective < 4000) {
      perspective += 100;
    };
  } else {
    if (perspective > 1000) {
      perspective -= 100;
    };
  };
  setEntry();
}

document.onselectstart = function() {
  return false;
}

document.ondragstart = function() {
  return false;
}
setEntry();