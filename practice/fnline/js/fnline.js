var fnline = function() {

  var imgs, len, θ, delta, angle, content;

  function ease(pos) {
    this.pos = pos;
    this.mov = function() {
      var tmp = (this.des - this.pos) * .1;
      if (!tmp) return false;
      this.pos += ((tmp > 0) ? Math.ceil(tmp) : Math.floor(tmp));
    }
  }

  function random() {
    var tem = Math.floor((Math.random() * len));
    while (tem == static) {
      tem = Math.floor((Math.random() * len));
    }
    static = tem;
    return tem;
  }

  function resize() {
    content = {};
    content.height = document.documentElement.clientHeight;
    content.width = document.documentElement.clientWidth;
    content.y = Math.floor((content.height - w) / 2);
    content.x = Math.floor((content.width - w) / 2);
    content.xy = Math.min(content.x, content.y);
  }

  function calc() {
    for (var i = 0; i < len; i++) {
      data[i].x.mov();
      data[i].y.mov();
    }
  }

  function draw() {
    for (var i = 0; i < len; i++) {
      imgs[i].style.left = data[i].x.pos + "px";
      imgs[i].style.top = data[i].y.pos + "px";
    }
  }

  function run() {
    calc();
    draw();
    setTimeout(run, 16);
  }

  function init() {
    document.onclick = function() {
      document.getElementById('contextMenu').style.display = "none";
    }
    document.oncontextmenu = function() {
      document.getElementById('contextMenu').style.display = "block";
      return false;
    }
    var buttons = document.getElementById('contextMenu').getElementsByTagName('button');
    for (var i = 0, button_len = buttons.length; i < button_len; i++) {
      buttons[i].onclick = function(i) {
        return function() {
          fn['line' + i]();
        }
      }(i);
    }
    imgs = document.getElementById('ppt').getElementsByTagName("img");
    len = imgs.length;
    w = 100;
    angle = 2 * Math.PI / len;
    resize();
    window.onresize = resize;
    static = 0;
    data = [];
    for (var i = 0; i < len; i++) {
      data[i] = {
        x: new ease(content.x),
        y: new ease(content.y)
      };
      imgs[i].style.display = "block";
    }
    run();
    return this;
  }
  //随机
  function rand() {
    for (var i = 0; i < len; i++) {
      data[i].x.des = Math.round(Math.random() * (content.width - w));
      data[i].y.des = Math.round(Math.random() * (content.height - w));
    }
  }
  var fn = {
    //圆
    line0: function() {
      var ran = random();
      for (var i = 0; i < len; i++) {
        var r = (i + ran) % len;
        data[i].x.des = content.x + Math.round(content.xy * Math.cos(r * angle));
        data[i].y.des = content.y + Math.round(content.xy * Math.sin(r * angle));
      }
    },
    //抛物线
    line1: function() {
      var ran = random();
      var _x = (content.width - w) / (len - 1);
      var __y = (len - 1) / 2;
      var _y = content.y * 2 / Math.round(__y * __y);
      for (var i = 0; i < len; i++) {
        var r = (i + ran) % len;
        data[i].x.des = Math.floor(_x * r);
        data[i].y.des = Math.floor((r - __y) * (r - __y) * _y);
      }
    },
    //椭圆
    line2: function() {
      var ran = random();
      for (var i = 0; i < len; i++) {
        var r = (i + ran) % len;
        data[i].x.des = content.x + Math.round(content.x * Math.cos(r * angle));
        data[i].y.des = content.y + Math.round(content.y * Math.sin(r * angle));
      }
    },
    //三角函数
    line3: function() {
      var ran = random();
      var _x = (content.width - w) / (len - 1);
      var A = content.y;
      for (var i = 0; i < len; i++) {
        var r = (i + ran) % len;
        data[i].x.des = Math.round(_x * i);
        data[i].y.des = Math.round(A * (1 - Math.sin(r * angle)));
      }
    },
    //迪卡尔心形线
    line4: function() {
      var ran = random();
      for (var i = 0; i < len; i++) {
        var offset = (i + ran) % len;
        var r = 3 / 4 * content.xy * (1 + Math.sin(offset * angle));
        data[i].x.des = content.x + Math.round(r * Math.cos(offset * angle));
        data[i].y.des = Math.round(content.y / 2) + Math.round(r * Math.sin(offset * angle));
      }
    },
    //星形线
    line5: function() {
      var ran = random();
      for (var i = 0; i < len; i++) {
        var r = (i + ran) % len;
        data[i].x.des = content.x + Math.round(content.xy * Math.pow(Math.cos(r * angle), 3));
        data[i].y.des = content.y + Math.round(content.xy * Math.pow(Math.sin(r * angle), 3));
      }
    },
    //三叶玫瑰线
    line6: function() {
      var ran = random();
      for (var i = 0; i < len; i++) {
        var r = (i + ran) % len;
        var ρ = Math.sin(3 * r * angle) * content.xy;
        data[i].x.des = content.x + Math.round(Math.cos(r * angle) * ρ);
        data[i].y.des = content.y + Math.round(Math.sin(r * angle) * ρ);
      }
    },
    //四叶玫瑰线
    line7: function() {
      var ran = random();
      for (var i = 0; i < len; i++) {
        var r = (i + ran) % len;
        var ρ = content.xy * Math.sin(r * angle) * Math.cos(r * angle);
        data[i].x.des = content.x + Math.round(2.5 * ρ * Math.cos(r * angle));
        data[i].y.des = content.y + Math.round(2.5 * ρ * Math.sin(r * angle));
      }
    },
    //三次函数
    line8: function() {
      var ran = random();
      var _x = (content.width - w) / (len - 1);
      var __y = (len - 1) / 2;
      var _y = content.y / Math.round(__y * __y * __y);
      for (var i = 0; i < len; i++) {
        var r = (i + ran) % len;
        data[i].x.des = Math.floor(_x * r);
        data[i].y.des = content.y + Math.floor((r - __y) * (r - __y) * (r - __y) * _y);
      }
    }

  }

  return {
    init: init,
    rand: rand
  }
}();

window.onload = function() {
  document.getElementById('loading').style.display = "none";
  document.getElementById('ppt').style.display = "block";
  document.onselectstart = function() {
    return false;
  };
  document.ondragstart = function() {
    return false;
  };
  fnline.init().rand();
}