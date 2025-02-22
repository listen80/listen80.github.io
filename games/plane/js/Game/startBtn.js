
//继续游戏

export function createStartBtn({ app, container, startBtnClick }) {
    var startBtn = new PIXI.Sprite.fromImage("img/start.png");
    startBtn.y = 30;
    startBtn.interactive = true;
    startBtn.on("click", startBtnClick);
    return startBtn;
}
