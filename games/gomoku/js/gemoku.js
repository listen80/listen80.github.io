// 基本常量
const lines = 15;
const rect = 50;
const width = (lines + 1) * rect;
const height = (lines + 1) * rect;

// 画布
const canvas = document.createElement('canvas');
document.body.appendChild(canvas);
const ctx = canvas.getContext('2d');
canvas.width = width, canvas.height = height;

// 游戏map
const CHESS_MAP = new Map;

const WINS_ALL = new Map;
const WINS_MAN = new Map;
const WINS_COM = new Map;

// 游戏数据
let count = 0; //赢法总数
let over = false;
let last = null;

function drawCanvas() {
    ctx.save();
    ctx.fillStyle = "#dec7a5";
    ctx.fillRect(0, 0, width, height);
    ctx.translate(rect, rect); // 留最左边

    // 画棋盘
    ctx.lineWidth = Math.ceil(rect / 50);
    for (let i = 0; i < lines; i++) {
        ctx.beginPath();
        ctx.moveTo(0, rect * i);
        ctx.lineTo(rect * (lines - 1), rect * i);
        ctx.stroke();

        ctx.moveTo(rect * i, 0);
        ctx.lineTo(rect * i, rect * (lines - 1));
        ctx.stroke();
        ctx.closePath();
    }

    // 画棋子
    for (let z in CHESS_MAP) {
        ctx.beginPath();
        let x = z % lines;
        let y = z / lines | 0;
        let isMy = CHESS_MAP[z] === 1;
        let grd = ctx.createRadialGradient(x * rect, y * rect, 0, x * rect, y * rect, 2 * rect / 5);
        grd.addColorStop(0, isMy ? '#666' : '#ccc');
        grd.addColorStop(1, isMy ? '#111' : '#fff');
        ctx.fillStyle = grd;
        ctx.arc(x * rect, y * rect, 2 * rect / 5, 0, Math.PI * 2);
        ctx.fill();
        ctx.closePath();
    }

    // 最后的棋子画圆环
    if (last) {
        ctx.beginPath();
        ctx.strokeStyle = "#19f";
        ctx.lineWidth = rect / 20;
        ctx.arc(last[0] * rect, last[1] * rect, 2 * rect / 5, 0, Math.PI * 2);
        ctx.stroke();
        ctx.closePath();
    }
    ctx.restore();
}

function nextStep(x, y, my) {
    CHESS_MAP[y * lines + x] = my;
    last = [x, y];
    drawCanvas();
}

function createKey(i, j) {
    return i + ',' + j;
}
    
function calculateWins() {
    for (let i = 0; i < lines; i++) {
        for (let j = 0; j < lines; j++) {
            WINS_ALL[createKey(i, j)] = {};
        }
    }

    for (let i = 0; i < lines; i++) {
        for (let j = 0; j < lines; j++) {
            //横线赢法
            if(j < 11) {
                for (let k = 0; k < 5; k++) {
                    WINS_ALL[createKey(i, j + k)][count] = 1;
                }
                count++;
            }

            //竖线赢法
            if(i < 11) {
                for (let k = 0; k < 5; k++) {
                    WINS_ALL[createKey(i + k, j)][count] = 1;
                }
                count++;
            }

            //正斜线赢法
            if(j < 11 && i < 11) {
                for (let k = 0; k < 5; k++) {
                    WINS_ALL[createKey(i + k, j + k)][count] = 1;
                }
                count++;
            }

            //反斜线赢法
            if(i < 11 && j > 3) {
                for (let k = 0; k < 5; k++) {
                    WINS_ALL[createKey(i + k, j - k)][count] = 1;
                }
                count++;
            }
        }
    }

    for (let i = 0; i < count; i++) {
        WINS_MAN[i] = 0;
        WINS_COM[i] = 0;
    }
}


function AI() {
    let max = 0 - (7) ** 2 - (7) ** 2, u = -1, v = -1;
    for (let i = 0; i < lines; i++) {
        for (let j = 0; j < lines; j++) {
            if (CHESS_MAP[i * lines + j] === undefined) {
                let score = 0 - (7 - i) ** 2 - (7 - j) ** 2;
                for (let k in WINS_ALL[createKey(i, j)]) {
                    // 已方有利的点，得分高
                    if (WINS_COM[k] === 1) {
                        score += 1e1;
                    } else if (WINS_COM[k] === 2) {
                        score += 1e2;
                    } else if (WINS_COM[k] === 3) {
                        score += 1e3;
                    } else if (WINS_COM[k] === 4) {
                        return {u: i, v: j};
                    }

                    // 危险的点，得分高
                    if (WINS_MAN[k] == 1) {
                        score += 1e1;
                    } else if (WINS_MAN[k] === 2) {
                        score += 1e2;
                    } else if (WINS_MAN[k] === 3) {
                        score += 1e3;
                    } else if (WINS_MAN[k] === 4) {
                        return {u: i, v: j};
                    }
                }
                if(score > max) {
                    max = score;
                    u = i;
                    v = j;
                }
            }
        }
    }
    if(u === -1) {
        throw 'chess full'
    }
    return {u, v};
}

canvas.addEventListener('click', function (e) {
    if (over) {
        return;
    }
    const x = e.offsetX / rect - 1 / 2 | 0;
    const y = e.offsetY / rect - 1 / 2 | 0;

    if (x >= 0 && x < lines && y >= 0 && y < lines && !CHESS_MAP[y * lines + x]) {
         // 落于棋盘内，且无子
        nextStep(x, y, 1)
        for(let k in WINS_ALL[createKey(y, x)]) {
            WINS_MAN[k]++;
            WINS_COM[k] = -1; //这个位置对方不可能赢了
            if (WINS_MAN[k] === 5) {
                over = true;
            }
        }
        if (over) {
            setTimeout(function () {
                alert('你赢了');
            }, 16)
        } else {
            setTimeout(function () {
                console.time("AI")
                const {u, v} = AI();
                console.timeEnd("AI")
                nextStep(v, u, -1)
                for (let k in WINS_ALL[createKey(u, v)]) {
                    WINS_COM[k]++;
                    WINS_MAN[k] = -1; //这个位置对方不可能赢了
                    if (WINS_COM[k] === 5) {
                        over = true;
                    }
                }
                if(over) {
                    setTimeout(function () {
                        alert('你输了');
                    }, 16)
                }
            }, 16)
        }
    }
})

calculateWins();

drawCanvas();
