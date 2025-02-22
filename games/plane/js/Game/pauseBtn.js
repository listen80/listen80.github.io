
export function createPauseBtn({ onClick }) {
    //暂停
    var pauseBtn = new PIXI.Sprite.fromImage("img/zanting.png");
    pauseBtn.x = 460;
    pauseBtn.y = 10;
    pauseBtn.visible = false;
    pauseBtn.interactive = true;

    pauseBtn.on("click", onClick);
    return pauseBtn
}