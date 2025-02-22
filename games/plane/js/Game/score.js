
export function createScore({ container }) {
    const score = new PIXI.Text("")
    score.y = 50
    score.x = 34
    score.style.fill = "#000080"
    score.setTextsetText = function (scores) {
        score.text = "得分:" + scores + "分"
    }
    return score;
}

export default createScore
