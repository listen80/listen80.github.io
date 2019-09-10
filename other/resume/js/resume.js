if (
  !/AppleWebKit|Firefox|MSIE 10.0|MSIE 11.0/.test(window.navigator.userAgent)
) {
  window.location.replace("./error.html");
}

var $ = function(id) {
  return document.getElementById(id);
};

document.addEventListener("DOMContentLoaded", function() {
  init_picture();
  init_contextmenu();
  init_music();
  init_scroll();
  init();
});

window.addEventListener("load", function() {
  $("loading").style.display = "none";
});

function init_picture() {
  var current = 0;
  var timer = 0;
  var piclist = $("thumb").getElementsByTagName("img");
  var piclen = piclist.length;
  var loaded = 0;
  for (var x = 0; x < piclen; x++) {
    piclist[x].onload = function() {
      loaded++;
      if (loaded == piclen) {
        start();
      }
    };
  }

  function start() {
    for (var x = 0; x < piclen; x++) {
      piclist[x].onmouseout = (function(x) {
        return function() {
          delay_time(x);
        };
      })(x);

      piclist[x].onmouseover = (function(x) {
        return function() {
          picture_on(x);
        };
      })(x);
    }
    picture_on(0);
    delay_time();
  }

  function picture_on(n) {
    current = n;
    $("main_pic").src = piclist[n].src;
    for (var x = 0; x < piclen; x++) {
      if (x == n) piclist[x].className = "on";
      else piclist[x].className = "";
    }
    clearTimeout(timer);
  }

  function delay_time() {
    timer = setTimeout(play_next, 1500);
  }

  function play_next() {
    if (current == 4) current = 0;
    else current++;
    picture_on(current);
    delay_time();
  }
}

function init_contextmenu() {
  var obj = $("contextMenu");
  document.addEventListener("click", function() {
    obj.style.display = "none";
  });

  document.addEventListener("contextmenu", function() {
    event.preventDefault();

    obj.style.display = "block";
    if (event.x + obj.offsetWidth > document.documentElement.clientWidth) {
      obj.style.left = event.x - obj.offsetWidth + "px";
    } else {
      obj.style.left = event.x + "px";
    }
    if (event.y + obj.offsetHeight > document.documentElement.clientHeight) {
      obj.style.top = event.y - obj.offsetHeight + "px";
    } else {
      obj.style.top = event.y + "px";
    }
  });

  $("context_reload").onclick = function() {
    window.location.reload();
  };
}

function smooth_scroll(el) {
  this.el = el;
  this.target = 0;
  this.position = 0;
  this.speed = 0.1;
  this.status = false;
  var timer = null;
  var that = this;
  this.move = function() {
    var delta = (this.target - this.position) * this.speed;
    if (delta === 0) {
      this.status = false;
    } else if (this.status) {
      delta = delta > 0 ? Math.ceil(delta) : Math.floor(delta);
      this.position += delta;
      this.draw();
    }
  };
  this.go = function(x) {
    if (
      typeof x == "number" &&
      x <= this.el.scrollHeight - document.documentElement.clientHeight &&
      x >= 0
    ) {
      this.status = true;
      this.target = x;
      this.position = this.el.scrollTop;
      this.move();
    }
  };
  this.draw = function() {
    this.el.scrollTop = this.position;
    timer = setTimeout(function() {
      that.move();
    }, 16);
  };
  this.el.addEventListener("mousewheel", function() {
    that.status = false;
    clearTimeout(timer);
  });
}

function init_scroll() {
  $("contact_me").onclick = function() {
    scroll.go(
      document.documentElement.scrollHeight -
        document.documentElement.clientHeight
    );
  };
  var obj = $("scrollTop");
  var scroll = new smooth_scroll(document.documentElement);
  obj.addEventListener("click", function() {
    scroll.go(0);
  });

  document.addEventListener("scroll", function() {
    var top = document.body.scrollTop;
    if (top > 200) {
      obj.className = "scrollTopOn";
    } else {
      obj.className = "scrollTop";
    }
  });
}

function init_music() {
  var now = 0;
  var songs = ["1.aac", "2.mp3", "3.mp3"];
  var audio = $("music_audio");
  var status = $("music_status");

  function play_pause_music() {
    if (!audio.src) audio.src = "./music/" + songs[now];
    if (audio.paused) {
      audio.play();
      status.innerText = "暂停音乐";
    } else {
      audio.pause();
      status.innerText = "播放音乐";
    }
  }

  function change_music() {
    now = ++now % songs.length;
    audio.src = "./music/" + songs[now];
    audio.play();
    status.innerText = "暂停音乐";
  }

  document.all.music_control.onclick = play_pause_music;
  document.all.music_next.onclick = change_music;
}

function init() {
  document.onselectstart = function() {
    event.preventDefault();
  };
  document.ondragstart = function() {
    return false;
  };
}
