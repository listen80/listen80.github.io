export function createGameOverBtn({ restart: restart }) {
    var gameoverBtn = new PIXI.Sprite.fromImage("img/gameover.png");
    gameoverBtn.interactive = true;
    gameoverBtn.visible = false
    gameoverBtn.on("click", restart);
    return gameoverBtn
}
