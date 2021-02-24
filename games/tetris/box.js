class Box {
    constructor(game, color, x = 0, y = 0) {
        this.game = game
        this.x = x
        this.y = y

        this.color = color
    }
    move(x, y) {
        return {
            x: this.x + x,
            y: this.y + y,
        }
    }
    rotate(origin) {
        return {
            x: -this.y + origin.y + origin.x,
            y:  this.x - origin.x + origin.y
        }
    }
    draw(paints) {
        const game = this.game
        const { side, totalSide, space } = game
        game.paints.fillStyle = this.color
        game.paints.fillRect(space + this.x * totalSide, space + this.y * totalSide, side, side)
    }
    
}
