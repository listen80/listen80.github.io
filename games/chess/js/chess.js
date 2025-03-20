import value from "./values.js";

var bylaw = {
    rook: function(map, y, x, my) {
        var pace = [];
        //右
        for (var i = x + 1; i < 8; i++) {
            if (map[y][i]) {
                if (mans[map[y][i]].my !== my) {
                    pace.push({
                        x: i,
                        y: y
                    });
                }
                break;
            } else {
                pace.push({
                    x: i,
                    y: y
                });
            }
        }
        //左
        for (var i = x - 1; i >= 0; i--) {
            if (map[y][i]) {
                if (mans[map[y][i]].my !== my) {
                    pace.push({
                        x: i,
                        y: y
                    });
                }
                break;
            } else {
                pace.push({
                    x: i,
                    y: y
                });
            }
        }
        //上
        for (var i = y + 1; i < 8; i++) {
            if (map[i][x]) {
                if (mans[map[i][x]].my !== my) {
                    pace.push({
                        x: x,
                        y: i
                    });
                }
                break;
            } else {
                pace.push({
                    x: x,
                    y: i
                });
            }
        }
        //下
        for (var i = y - 1; i >= 0; i--) {
            if (map[i][x]) {
                if (mans[map[i][x]].my !== my) {
                    pace.push({
                        x: x,
                        y: i
                    });
                }
                break;
            } else {
                pace.push({
                    x: x,
                    y: i
                });
            }
        }
        return pace;
    },
    knight: function(map, y, x, my) {
        var pace = [];

        if (y - 2 >= 0 && x + 1 <= 7 && (!mans[map[y - 2][x + 1]] || mans[map[y - 2][x + 1]].my !== my)) {
            pace.push({
                x: x + 1,
                y: y - 2
            })
        };
        if (y - 1 >= 0 && x + 2 <= 7 && (!mans[map[y - 1][x + 2]] || mans[map[y - 1][x + 2]].my !== my)) {
            pace.push({
                x: x + 2,
                y: y - 1
            })
        };
        if (y + 1 <= 7 && x + 2 <= 7 && (!mans[map[y + 1][x + 2]] || mans[map[y + 1][x + 2]].my !== my)) {
            pace.push({
                x: x + 2,
                y: y + 1
            })
        };
        if (y + 2 <= 7 && x + 1 <= 7 && (!mans[map[y + 2][x + 1]] || mans[map[y + 2][x + 1]].my !== my)) {
            pace.push({
                x: x + 1,
                y: y + 2
            })
        };
        if (y + 2 <= 7 && x - 1 >= 0 && (!mans[map[y + 2][x - 1]] || mans[map[y + 2][x - 1]].my !== my)) {
            pace.push({
                x: x - 1,
                y: y + 2
            })
        };
        if (y + 1 <= 7 && x - 2 >= 0 && (!mans[map[y + 1][x - 2]] || mans[map[y + 1][x - 2]].my !== my)) {
            pace.push({
                x: x - 2,
                y: y + 1
            })
        };
        if (y - 1 >= 0 && x - 2 >= 0 && (!mans[map[y - 1][x - 2]] || mans[map[y - 1][x - 2]].my !== my)) {
            pace.push({
                x: x - 2,
                y: y - 1
            })
        };
        if (y - 2 >= 0 && x - 1 >= 0 && (!mans[map[y - 2][x - 1]] || mans[map[y - 2][x - 1]].my !== my)) {
            pace.push({
                x: x - 1,
                y: y - 2
            })
        };
        return pace;
    },
    bishop: function(map, y, x, my) {
        var pace = [];
        // 右下
        for (var i = x + 1, j = y + 1; i <= 7 && j <= 7; i++, j++) {
            if (map[j][i]) {
                if (mans[map[j][i]].my !== my) {
                    pace.push({
                        x: i,
                        y: j
                    });
                }
                break;
            } else {
                pace.push({
                    x: i,
                    y: j
                });
            }
        }
        // 左下
        for (var i = x - 1, j = y + 1; i >= 0 && j <= 7; i--, j++) {
            if (map[j][i]) {
                if (mans[map[j][i]].my !== my) {
                    pace.push({
                        x: i,
                        y: j
                    });
                }
                break;
            } else {
                pace.push({
                    x: i,
                    y: j
                });
            }
        }
        // 右上
        for (var i = x + 1, j = y - 1; i <= 7 && j >= 0; i++, j--) {
            if (map[j][i]) {
                if (mans[map[j][i]].my !== my) {
                    pace.push({
                        x: i,
                        y: j
                    });
                }
                break;
            } else {
                pace.push({
                    x: i,
                    y: j
                });
            }
        }
        // 左上
        for (var i = x - 1, j = y - 1; i >= 0 && j >= 0; i--, j--) {
            if (map[j][i]) {
                if (mans[map[j][i]].my !== my) {
                    pace.push({
                        x: i,
                        y: j
                    });
                }
                break;
            } else {
                pace.push({
                    x: i,
                    y: j
                });
            }
        }

        return pace;
    },
    queen: function(map, y, x, my) {
        var pace = [];
        //右
        for (var i = x + 1; i < 8; i++) {
            if (map[y][i]) {
                if (mans[map[y][i]].my !== my) {
                    pace.push({
                        x: i,
                        y: y
                    });
                }
                break;
            } else {
                pace.push({
                    x: i,
                    y: y
                });
            }
        }
        //左
        for (var i = x - 1; i >= 0; i--) {
            if (map[y][i]) {
                if (mans[map[y][i]].my !== my) {
                    pace.push({
                        x: i,
                        y: y
                    });
                }
                break;
            } else {
                pace.push({
                    x: i,
                    y: y
                });
            }
        }
        //上
        for (var i = y + 1; i < 8; i++) {
            if (map[i][x]) {
                if (mans[map[i][x]].my !== my) {
                    pace.push({
                        x: x,
                        y: i
                    });
                }
                break;
            } else {
                pace.push({
                    x: x,
                    y: i
                });
            }
        }
        //下
        for (var i = y - 1; i >= 0; i--) {
            if (map[i][x]) {
                if (mans[map[i][x]].my !== my) {
                    pace.push({
                        x: x,
                        y: i
                    });
                }
                break;
            } else {
                pace.push({
                    x: x,
                    y: i
                });
            }
        }

        // 右下
        for (var i = x + 1, j = y + 1; i <= 7 && j <= 7; i++, j++) {
            if (map[j][i]) {
                if (mans[map[j][i]].my !== my) {
                    pace.push({
                        x: i,
                        y: j
                    });
                }
                break;
            } else {
                pace.push({
                    x: i,
                    y: j
                });
            }
        }
        // 左下
        for (var i = x - 1, j = y + 1; i >= 0 && j <= 7; i--, j++) {
            if (map[j][i]) {
                if (mans[map[j][i]].my !== my) {
                    pace.push({
                        x: i,
                        y: j
                    });
                }
                break;
            } else {
                pace.push({
                    x: i,
                    y: j
                });
            }
        }
        // 右上
        for (var i = x + 1, j = y - 1; i <= 7 && j >= 0; i++, j--) {
            if (map[j][i]) {
                if (mans[map[j][i]].my !== my) {
                    pace.push({
                        x: i,
                        y: j
                    });
                }
                break;
            } else {
                pace.push({
                    x: i,
                    y: j
                });
            }
        }
        // 左上
        for (var i = x - 1, j = y - 1; i >= 0 && j >= 0; i--, j--) {
            if (map[j][i]) {
                if (mans[map[j][i]].my !== my) {
                    pace.push({
                        x: i,
                        y: j
                    });
                }
                break;
            } else {
                pace.push({
                    x: i,
                    y: j
                });
            }
        }
        return pace;
    },
    king: function(map, y, x, my) {
        var pace = [];
        // 右上
        if (y - 1 >= 0 && x + 1 <= 7 && (!mans[map[y - 1][x + 1]] || mans[map[y - 1][x + 1]].my !== my)) {
            pace.push({
                x: x + 1,
                y: y - 1
            })
        };
        // 右下
        if (y + 1 <= 7 && x + 1 <= 7 && (!mans[map[y + 1][x + 1]] || mans[map[y + 1][x + 1]].my !== my)) {
            pace.push({
                x: x + 1,
                y: y + 1
            })
        };
        // 左上
        if (y - 1 >= 0 && x - 1 >= 0 && (!mans[map[y - 1][x - 1]] || mans[map[y - 1][x - 1]].my !== my)) {
            pace.push({
                x: x - 1,
                y: y - 1
            })
        };
        // 左下
        if (y + 1 <= 7 && x - 1 >= 0 && (!mans[map[y + 1][x - 1]] || mans[map[y + 1][x - 1]].my !== my)) {
            pace.push({
                x: x - 1,
                y: y + 1
            })
        };
        // 右
        if (y >= 0 && x + 1 <= 7 && (!mans[map[y][x + 1]] || mans[map[y][x + 1]].my !== my)) {
            pace.push({
                x: x + 1,
                y: y
            })
        };
        // 左
        if (y <= 7 && x - 1 >= 0 && (!mans[map[y][x - 1]] || mans[map[y][x - 1]].my !== my)) {
            pace.push({
                x: x - 1,
                y: y
            })
        };
        // 上
        if (y - 1 >= 0 && x >= 0 && (!mans[map[y - 1][x]] || mans[map[y - 1][x]].my !== my)) {
            pace.push({
                x: x,
                y: y - 1
            })
        };
        // 下
        if (y + 1 <= 7 && x >= 0 && (!mans[map[y + 1][x]] || mans[map[y + 1][x]].my !== my)) {
            pace.push({
                x: x,
                y: y + 1
            })
        };
        return pace;
    },
    pawn: function(map, y, x, my) {
        var pace = [];
        if (my === true) {
            // 右上
            if (y - 1 >= 0 && x + 1 <= 7 && (mans[map[y - 1][x + 1]] && mans[map[y - 1][x + 1]].my !== my)) {
                pace.push({
                    x: x + 1,
                    y: y - 1
                })
            };
            // 左上
            if (y - 1 >= 0 && x - 1 >= 0 && (mans[map[y - 1][x - 1]] && mans[map[y - 1][x - 1]].my !== my)) {
                pace.push({
                    x: x - 1,
                    y: y - 1
                })
            };
            // 上
            if (y - 1 >= 0 && x >= 0 && (!mans[map[y - 1][x]])) {
                pace.push({
                    x: x,
                    y: y - 1
                })
            };
        } else {
            // 右下
            if (y + 1 <= 7 && x + 1 <= 7 && (mans[map[y + 1][x + 1]] && mans[map[y + 1][x + 1]].my !== my)) {
                pace.push({
                    x: x + 1,
                    y: y + 1
                })
            };
            // 左下
            if (y + 1 <= 7 && x - 1 <= 7 && (mans[map[y + 1][x - 1]] && mans[map[y + 1][x - 1]].my !== my)) {
                pace.push({
                    x: x - 1,
                    y: y + 1
                })
            };
            // 下
            if (y + 1 <= 7 && x >= 0 && (!mans[map[y + 1][x]])) {
                pace.push({
                    x: x,
                    y: y + 1
                })
            };
        }

        // // 右
        // if (y >= 0 && x + 1 <= 7 && (!mans[map[y][x + 1]] || mans[map[y][x + 1]].my !== my)) {
        // 	pace.push({
        // 		x: x + 1,
        // 		y: y
        // 	})
        // };
        // // 左
        // if (y <= 7 && x - 1 >= 0 && (!mans[map[y][x - 1]] || mans[map[y][x - 1]].my !== my)) {
        // 	pace.push({
        // 		x: x - 1,
        // 		y: y
        // 	})
        // };
        return pace;
    }
}

function getValue(my) {
    var val = 0;
    for (var y = 0; y < 8; y++) {
        for (var x = 0; x < 8; x++) {
            var z = map[y][x];
            if (z) {
                man = mans[z];
                var v = man.value[y][x];
                if (man.my === my) {
                    val += v;
                } else {
                    val -= v;
                }
            }
        }
    }
    return val;
}

function getMans(my) {
    var mymans = [];
    for (var y = 0; y < 8; y++) {
        for (var x = 0; x < 8; x++) {
            var z = map[y][x];
            if (z) {
                man = mans[z];
                if (man.my === my) {
                    mymans.push(man);
                }
            }
        }
    }
    return mymans;
}

var getAlphaBeta = function(A, B, depth, map, my) {
    var val;
    var bestpace;

    var mymans = getMans(my);
    for (var i in mymans) {
        var man = mymans[i];
        var paces = man.pace();
        for (var t in paces) {
            var pace = paces[t];
            var x = man.x;
            var y = man.y;
            var eat = man.goto(pace.y, pace.x);
            if (depth > 1) {
                var best = getAlphaBeta(-B, -A, depth - 1, map, !my);
                if (best) {
                    val = -best.val
                } else {
                    val = 9999;
                }
            } else {
                val = getValue(my);
            }

            man.goto(y, x);
            map[pace.y][pace.x] = eat;

            if (val >= B) {
                return {
                    key: man.key,
                    x: pace.y,
                    y: pace.x,
                    value: B
                }
            }
            if (val > A) {
                A = val;
                bestpace = {
                    key: man.key,
                    y: pace.y,
                    x: pace.x,
                    val: val
                }
            }
        }
    }
    return bestpace;
}

function clone2Arr(arr) {
    var a = [];
    for (var x in arr) {
        a.push(arr[x].slice())
    }
    return a;
}

function chessman(y, x) {
    this.checked = false;
    this.goto = function(y, x, fn) {
        delete map[this.y][this.x];
        var eat = map[y][x];
        map[y][x] = this.key;

        this.checked = false;
        this.y = y;
        this.x = x;
        fn && fn(eat);
        return eat;
    }
    this.check = function() {
        if (preman) {
            preman.checked = false;
        }
        pace = this.pace(this.y, this.x);
        this.paces = pace;
        preman = this;
        this.checked = true;
    }
    this.ablego = function(y, x) {
        var v;
        for (var i in this.paces) {
            v = this.paces[i];
            if (v.y === y && v.x === x) {
                return true;
            }
        }
        return false;
    }
}

function loadAudio(fn) {
    var arr = ['fail', 'check', 'eat', 'move'];
    var all = arr.length;
    var loaded = 0;
    for (var x in arr) {
        var t = document.createElement('audio');
        t.key = arr[x];
        t.onloadstart = function() {
            var _ = this;
            loaded++;
            audio[this.key] = function() {
                _.play();
            };
            if (loaded === all) {
                fn && fn()
            }
        }
        t.src = 'audio/' + t.key + '.ogg';
    }
}

function loadImage(fn) {
    var imgsList = [
        "black_rook", "black_knight", "black_bishop",
        "black_queen", "black_king", "black_pawn",
        "white_pawn", "white_rook", "white_knight",
        "white_bishop", "white_queen", "white_king"
    ];
    var len = imgsList.length;
    function onload() {
        len--;
        if (!len) {
            fn && fn()
        }
    }
    for (var x = 0; x < len; x++) {
        var img = document.createElement('img');
        var key = imgsList[x];
        imgs[key] = img;
        img.onload = onload;
        img.src = 'images/' + key + '_3.png';
    }
}

function initChess() {
    document.body.appendChild(canvas);
	canvas.onclick = function(event) {
	    var x = event.offsetX / 100 | 0;
	    var y = event.offsetY / 100 | 0;
	    var z = map[y][x];
	    if (myturn === true || pvp) {
	        if (preman) {
	            if (z) {
	                var man = mans[z];
	                if (preman !== man) {
	                    if (man.my === myturn) {
	                        man.check();
	                    } else {
	                        if (preman.ablego(y, x)) {
	                            var eat = preman.goto(y, x);
	                            aftergo(eat);
	                            draw();
	                            if (!pvp) {
	                                setTimeout(AIplay, 20)
	                            }
	                        } else {
	                            audio.fail();
	                        }
	                    }
	                }
	            } else {
	                if (preman.ablego(y, x)) {
	                    var eat = preman.goto(y, x);
	                    aftergo(eat);
	                    draw();
	                    if (!pvp) {
	                        setTimeout(AIplay, 20)
	                    }
	                } else {
	                    audio.fail();
	                }
	            }
	            draw();
	        } else {
	            if (z) {
	                var man = mans[z];
	                if (man.my === myturn) {
	                    man.check();
	                }
	            }
	            draw();
	        }
	    }
	}

    for (var y = 0; y < 8; y++) {
        for (var x = 0; x < 8; x++) {
            var z = init_map[y][x];
            if (z) {
                var info = z.split('_');
                var man = new chessman();
                man.x = x;
                man.y = y;
                man.img = imgs[info[0] + '_' + info[1]];
                man.my = info[0] === 'white';
                man.type = info[1];
                man.key = z;
                man.value = man.my ? value[man.type] : value[man.type].slice().reverse();
                man.val = function() {
                    return this.value[this.y][this.x];
                }
                man.pace = function() {
                    return bylaw[this.type](map, this.y, this.x, this.my);
                }
                mans[z] = man;
            }
        }
    }
    start();
}

function draw() {
    ctx.clearRect(0, 0, 800, 800);
    for (var y = 0; y < 8; y++) {
        for (var x = 0; x < 8; x++) {
            ctx.fillStyle = (y ^ x) % 2 ? "#222" : "#fff";
            ctx.fillRect(x * 100, y * 100, 100, 100);
            var z = map[y][x];
            if (z) {
                var man = mans[z];
                if (man.checked) {
                    ctx.beginPath();
                    ctx.lineWidth = 4;
                    ctx.strokeStyle = "lime";
                    ctx.arc(x * 100 + 50, y * 100 + 50, 40, 0, Math.PI * 2);
                    ctx.closePath();
                    ctx.stroke();
                }
                ctx.drawImage(man.img, x * 100 + 18, y * 100 + 18, 64, 64);
            }
        }
    }
    for (var x in pace) {
        var p = pace[x];
        ctx.beginPath();
        ctx.lineWidth = 4;
        ctx.fillStyle = "lime";
        ctx.arc(p.x * 100 + 50, p.y * 100 + 50, 8, 0, Math.PI * 2);
        ctx.closePath();
        ctx.stroke();
    }
}

function start(isPvp) {
    pvp = isPvp;
    map = clone2Arr(init_map);
    draw();
}

function aftergo(key) {
    myturn = !myturn;
    preman = null;
    pace = [];
    if (key) {
        audio.eat();
    } else {
        audio.move();
    }
}

var AI = (function() {

    if (location.protocol === 'file:') {
        return function(data, callback) {
            callback && callback(getAlphaBeta(-9999, 9999, data.depth, data.map, data.my));
        }
    } else {
        var worker = new Worker('js/worker.js');
        return function(data, callback) {
            worker.postMessage(data);
            worker.onmessage = function(event) {
                callback && callback.call(this, event.data);
            }
        }
    }

})();

function AIplay() {
    AI({ map: map, depth: 4, my: false }, function(bestpace) {
        var eat = mans[bestpace.key].goto(bestpace.y, bestpace.x);
        aftergo(eat);
        draw();
    })
}

var w = 800;
var h = 800;
var canvas = document.createElement('canvas');
var ctx = canvas.getContext('2d');
canvas.height = h;
canvas.width = w;
var audio = {};
var imgs = {};
var mans = {};
var map;
var preman;
var myturn = true;
var pvp = false;
var pace = [];

var init_map = [
    ['black_rook_1', 'black_knight_1', 'black_bishop_1', 'black_queen', 'black_king', 'black_bishop_2', 'black_knight_2', 'black_rook_2'],
    ['black_pawn_1', 'black_pawn_2', 'black_pawn_3', 'black_pawn_4', 'black_pawn_5', 'black_pawn_6', 'black_pawn_7', 'black_pawn_8'],
    [],
    [],
    [],
    [],
    ['white_pawn_1', 'white_pawn_2', 'white_pawn_3', 'white_pawn_4', 'white_pawn_5', 'white_pawn_6', 'white_pawn_7', 'white_pawn_8'],
    ['white_rook_1', 'white_knight_1', 'white_bishop_1', 'white_queen', 'white_king', 'white_bishop_2', 'white_knight_2', 'white_rook_2']
];

function init() {
    loadAudio(function() {
        loadImage(function() {
            initChess();
        })
    })
}

init();