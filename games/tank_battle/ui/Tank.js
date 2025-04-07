export class Tank extends Move {
  constructor(x, y, img) {
    super(x * BOX_SIZE, y * BOX_SIZE, TANK_SIZE, TANK_SIZE, img);
    this.x += (BOX_SIZE * 2 - TANK_SIZE) / 2;
    this.y += (BOX_SIZE * 2 - TANK_SIZE) / 2;
    this.destoryProps = {
      // img: imgs.destory,
      frames: [0, 1, 2, 3, 2, 1, 3, 1, 3, 1, 0],
      interval: 1,
      size: 66,
    };
    this.ObstacleArray = [];
    this.canBeDestoried = true;
    this.baseSpeed = 3;
    this.name = "tank";
  }
}
