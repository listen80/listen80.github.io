class Tetris {
    constructor(config = {}) {
        const {el = document.body, side = 35, space = 4, width = 10, height = 14, speed = 300} = config
        this.side = side // 每个方块边长
        this.space = space
        const totalSide = side + space
        this.totalSide = totalSide

        this.width = width // 一行包含的方块数
        this.height = height // 一列包含的方块数
        this.center = (width - 1) / 2 | 0
        this.speed = speed // 方块下落移动速度
        this.ident = -1 // setInterval的标识
        this.over = false // 游戏是否结束
        this.score = 0

        const canvas = document.createElement('canvas')
        canvas.width = totalSide * (width + 6) + space
        canvas.height = totalSide * height + space
        el.appendChild(canvas)
        this.canvas = canvas
        this.paints = canvas.getContext('2d')

        this.initData()
        const keydown = (e) => {
            if (this.over)
                return
            switch (e.keyCode) {
                case 40: // 方向为下
                    this.calcBoxes(box => box.move(0, 1))
                    break
                case 32: // 空格换方向
                    if (this.downBox.downBoxType === 4) {
                        break
                    }
                    this.calcBoxes(box => box.rotate(this.downBox[0]))
                    break
                case 37: // 方向为左
                    this.calcBoxes([-1, 0])
                    break
                case 39: // 方向为右
                   this.calcBoxes([1, 0])
                    break
            }
            this.draw()
        }

        const dblclick = () => {
            if (this.over) {
                this.over = false
                this.initData()
                this.gameStart()
            } else {
                if (this.ident === -1) {
                    this.gameStart()
                } else {
                    this.gameStop()
                }
            }
        }
        document.addEventListener('keydown', keydown)
        document.addEventListener('dblclick', dblclick)
    }
    initData() {
        this.staticBox = []
        this.downBox = []
        this.createBlock()
        this.map = new Array(this.height).fill(0)
    }
    createBlock() {
        const color = createRandomHSL()
        const type = BLOCK_TYPE.length * Math.random() | 0
        this.showBox = []
        this.showBox.downBoxType = type
        BLOCK_TYPE[type].forEach((arg) => {
            this.showBox.push(new Box(this, color, this.width + 2 + arg[0], arg[1] + 1))
        })
    }
    clearRect() {
        this.paints.fillStyle = "#111"
        this.paints.fillRect(0, 0, this.canvas.width, this.canvas.height)
    }
    draw() {
        this.clearRect()

        this.paints.beginPath()
        this.downBox.forEach(box => {
            box.draw()
        })
        this.staticBox.forEach(box => {
            box.draw()
        })
        this.showBox.forEach(box => {
            box.draw()
        })
        this.drawScore(this.score, this.over ? "双击重开" : this.ident === -1 ? "暂停" : "")
        this.paints.closePath()
    }
    drawScore(score = 0, msg) {

        this.paints.beginPath();
        
        this.paints.moveTo(this.width * this.totalSide + this.space, 0);
        this.paints.lineTo(this.width * this.totalSide + this.space, this.canvas.height);
        this.paints.strokeStyle = '#0cc';
        this.paints.stroke();

        this.paints.font = ` ${this.side}px '微软雅黑','宋体'`; //设置字体
        this.paints.fillStyle = "red";
        this.paints.textBaseline = "top";
        this.paints.textAlign = "center";   
        this.paints.fillText("得分: " + score, (this.width + 3) * this.totalSide, (this.height - 3) * this.totalSide);
        if (msg) {
            this.paints.fillText(msg, (this.width + 3) * this.totalSide, (this.height - 5) * this.totalSide);
        }
    }
    gameStop() {
        clearInterval(this.ident)
        this.ident = -1
        this.over = true
        this.draw()
    }
    // 游戏开始
    gameStart() {
        this.calcBoxes()
        this.ident = setInterval(() => this.calcBoxes([0, 1]), this.speed)
    }

    calcBoxes(argu) {
        if (!argu) {
            return
        }
        if (this.downBox.length === 0) {
            this.downBox = this.showBox
            this.downBox.forEach(box => {
                box.x -= (2 + this.width - this.center)
                box.y -= 2
            })
            this.createBlock()
        } else {
            const distArr = []
            const length = this.downBox.length
            for (let i = 0; i < length; i++) {
                const box = this.downBox[i]
                let x = box.x
                let y = box.y
                if (typeof argu === 'function') {
                    const re = argu(box)
                    x = re.x, y = re.y
                } else if(argu){
                    const [deltaX, deltaY] = argu
                    x = box.x + deltaX, y = box.y + deltaY
                }

                let cannot = y >= this.height || x < 0 || x >= this.width || this.staticBox.some((box) => box.x === x && box.y === y)
                if (!cannot) {
                    distArr.push({x ,y})
                } else {
                    break
                }
            }
            if (distArr.length === length) {
                for (let i = 0; i < length; i++) {
                    const box = this.downBox[i]
                    box.x = distArr[i].x
                    box.y = distArr[i].y
                }
            } else if (argu[1]){
                this.staticBox.push(...this.downBox)
                if(this.downBox.some(box => box.y <= 0)) {
                    this.gameStop()
                }
                this.downBox.forEach(box => {
                    this.map[box.y]++
                })

                let line = 0
                for(let row = this.map.length - 1; row >= 0; row--) {
                    let n = this.map[row]
                    if (n === this.width) {
                        this.score += this.width * 100 * 2 ** line++
                        this.map.splice(row, 1)
                        this.map.unshift(0)
                        let i = this.staticBox.length
                        while(i) {
                            i--
                            if (this.staticBox[i].y === row) {
                                this.staticBox.splice(i, 1)
                            } else {
                                if (this.staticBox[i].y < row) {
                                    this.staticBox[i].y++
                                }
                            }
                        }
                        row++
                    } else if (n === 0) {
                        break
                    }
                }
                this.downBox.length = 0
            }
        }
        this.draw()
    }
}
