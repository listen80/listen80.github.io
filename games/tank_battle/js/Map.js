import {
  Grass,
  Group,
  Water,
  Steel,
  Home,
  Player,
  Enemy,
  Wall,
} from "./klass.js";
import { maps } from "./maps.js";

export default class Map extends Group {
  constructor({ round = 1, totalTankNum = 20 } = {}, imgs) {
    super();
    this.imgs = imgs;
    this.grassArray = new Group();
    this.wallArray = new Group();
    this.waterArray = new Group();
    this.playerArray = new Group();
    this.enemyArray = new Group();
    this.boomArray = new Group();
    this.bulletArray = new Group();
    this.steelArray = new Group();

    this.add(
      this.grassArray,
      this.wallArray,
      this.waterArray,
      this.playerArray,
      this.enemyArray,
      this.boomArray,
      this.bulletArray,
      this.steelArray
    );

    this.playerArray.add(
      new Player(
        8,
        24,
        imgs.p1,
        {
          up: "w",
          right: "d",
          down: "s",
          left: "a",
          fire: " ",
        },
        "1p"
      )
    );
    const map = maps[round];
    this.createBoard(map);
  }
  createBoard(map) {
    for (var y = 0; y < map.length; y++) {
      for (var x = 0; x < map[y].length; x++) {
        switch (map[y][x]) {
          case 1:
            this.wallArray.add(new Wall(x, y, this.imgs));
            break;
          case 2:
            this.steelArray.add(new Steel(x, y, this.imgs));
            break;
          case 3:
            this.grassArray.add(new Grass(x, y, this.imgs));
            break;
          case 4:
            this.waterArray.add(new Water(x, y, this.imgs));
            break;
          case 5:
            this.grassArray.add(new Grass(x, y, this.imgs));
            break;
          case 9:
            this.wallArray.add(new Home(x, y, this.imgs));
            break;
          default:
            break;
        }
      }
    }
  }
}
