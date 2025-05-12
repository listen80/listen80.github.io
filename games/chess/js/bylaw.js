export const bylaw = {
  rook: function (map, y, x, my) {
    var pace = [];
    //右
    for (var i = x + 1; i < 8; i++) {
      if (map[y][i]) {
        if (mans[map[y][i]].my !== my) {
          pace.push({
            x: i,
            y: y,
          });
        }
        break;
      } else {
        pace.push({
          x: i,
          y: y,
        });
      }
    }
    //左
    for (var i = x - 1; i >= 0; i--) {
      if (map[y][i]) {
        if (mans[map[y][i]].my !== my) {
          pace.push({
            x: i,
            y: y,
          });
        }
        break;
      } else {
        pace.push({
          x: i,
          y: y,
        });
      }
    }
    //上
    for (var i = y + 1; i < 8; i++) {
      if (map[i][x]) {
        if (mans[map[i][x]].my !== my) {
          pace.push({
            x: x,
            y: i,
          });
        }
        break;
      } else {
        pace.push({
          x: x,
          y: i,
        });
      }
    }
    //下
    for (var i = y - 1; i >= 0; i--) {
      if (map[i][x]) {
        if (mans[map[i][x]].my !== my) {
          pace.push({
            x: x,
            y: i,
          });
        }
        break;
      } else {
        pace.push({
          x: x,
          y: i,
        });
      }
    }
    return pace;
  },
  knight: function (map, y, x, my) {
    var pace = [];

    if (
      y - 2 >= 0 &&
      x + 1 <= 7 &&
      (!mans[map[y - 2][x + 1]] || mans[map[y - 2][x + 1]].my !== my)
    ) {
      pace.push({
        x: x + 1,
        y: y - 2,
      });
    }
    if (
      y - 1 >= 0 &&
      x + 2 <= 7 &&
      (!mans[map[y - 1][x + 2]] || mans[map[y - 1][x + 2]].my !== my)
    ) {
      pace.push({
        x: x + 2,
        y: y - 1,
      });
    }
    if (
      y + 1 <= 7 &&
      x + 2 <= 7 &&
      (!mans[map[y + 1][x + 2]] || mans[map[y + 1][x + 2]].my !== my)
    ) {
      pace.push({
        x: x + 2,
        y: y + 1,
      });
    }
    if (
      y + 2 <= 7 &&
      x + 1 <= 7 &&
      (!mans[map[y + 2][x + 1]] || mans[map[y + 2][x + 1]].my !== my)
    ) {
      pace.push({
        x: x + 1,
        y: y + 2,
      });
    }
    if (
      y + 2 <= 7 &&
      x - 1 >= 0 &&
      (!mans[map[y + 2][x - 1]] || mans[map[y + 2][x - 1]].my !== my)
    ) {
      pace.push({
        x: x - 1,
        y: y + 2,
      });
    }
    if (
      y + 1 <= 7 &&
      x - 2 >= 0 &&
      (!mans[map[y + 1][x - 2]] || mans[map[y + 1][x - 2]].my !== my)
    ) {
      pace.push({
        x: x - 2,
        y: y + 1,
      });
    }
    if (
      y - 1 >= 0 &&
      x - 2 >= 0 &&
      (!mans[map[y - 1][x - 2]] || mans[map[y - 1][x - 2]].my !== my)
    ) {
      pace.push({
        x: x - 2,
        y: y - 1,
      });
    }
    if (
      y - 2 >= 0 &&
      x - 1 >= 0 &&
      (!mans[map[y - 2][x - 1]] || mans[map[y - 2][x - 1]].my !== my)
    ) {
      pace.push({
        x: x - 1,
        y: y - 2,
      });
    }
    return pace;
  },
  bishop: function (map, y, x, my) {
    var pace = [];
    // 右下
    for (var i = x + 1, j = y + 1; i <= 7 && j <= 7; i++, j++) {
      if (map[j][i]) {
        if (mans[map[j][i]].my !== my) {
          pace.push({
            x: i,
            y: j,
          });
        }
        break;
      } else {
        pace.push({
          x: i,
          y: j,
        });
      }
    }
    // 左下
    for (var i = x - 1, j = y + 1; i >= 0 && j <= 7; i--, j++) {
      if (map[j][i]) {
        if (mans[map[j][i]].my !== my) {
          pace.push({
            x: i,
            y: j,
          });
        }
        break;
      } else {
        pace.push({
          x: i,
          y: j,
        });
      }
    }
    // 右上
    for (var i = x + 1, j = y - 1; i <= 7 && j >= 0; i++, j--) {
      if (map[j][i]) {
        if (mans[map[j][i]].my !== my) {
          pace.push({
            x: i,
            y: j,
          });
        }
        break;
      } else {
        pace.push({
          x: i,
          y: j,
        });
      }
    }
    // 左上
    for (var i = x - 1, j = y - 1; i >= 0 && j >= 0; i--, j--) {
      if (map[j][i]) {
        if (mans[map[j][i]].my !== my) {
          pace.push({
            x: i,
            y: j,
          });
        }
        break;
      } else {
        pace.push({
          x: i,
          y: j,
        });
      }
    }

    return pace;
  },
  queen: function (map, y, x, my) {
    var pace = [];
    //右
    for (var i = x + 1; i < 8; i++) {
      if (map[y][i]) {
        if (mans[map[y][i]].my !== my) {
          pace.push({
            x: i,
            y: y,
          });
        }
        break;
      } else {
        pace.push({
          x: i,
          y: y,
        });
      }
    }
    //左
    for (var i = x - 1; i >= 0; i--) {
      if (map[y][i]) {
        if (mans[map[y][i]].my !== my) {
          pace.push({
            x: i,
            y: y,
          });
        }
        break;
      } else {
        pace.push({
          x: i,
          y: y,
        });
      }
    }
    //上
    for (var i = y + 1; i < 8; i++) {
      if (map[i][x]) {
        if (mans[map[i][x]].my !== my) {
          pace.push({
            x: x,
            y: i,
          });
        }
        break;
      } else {
        pace.push({
          x: x,
          y: i,
        });
      }
    }
    //下
    for (var i = y - 1; i >= 0; i--) {
      if (map[i][x]) {
        if (mans[map[i][x]].my !== my) {
          pace.push({
            x: x,
            y: i,
          });
        }
        break;
      } else {
        pace.push({
          x: x,
          y: i,
        });
      }
    }

    // 右下
    for (var i = x + 1, j = y + 1; i <= 7 && j <= 7; i++, j++) {
      if (map[j][i]) {
        if (mans[map[j][i]].my !== my) {
          pace.push({
            x: i,
            y: j,
          });
        }
        break;
      } else {
        pace.push({
          x: i,
          y: j,
        });
      }
    }
    // 左下
    for (var i = x - 1, j = y + 1; i >= 0 && j <= 7; i--, j++) {
      if (map[j][i]) {
        if (mans[map[j][i]].my !== my) {
          pace.push({
            x: i,
            y: j,
          });
        }
        break;
      } else {
        pace.push({
          x: i,
          y: j,
        });
      }
    }
    // 右上
    for (var i = x + 1, j = y - 1; i <= 7 && j >= 0; i++, j--) {
      if (map[j][i]) {
        if (mans[map[j][i]].my !== my) {
          pace.push({
            x: i,
            y: j,
          });
        }
        break;
      } else {
        pace.push({
          x: i,
          y: j,
        });
      }
    }
    // 左上
    for (var i = x - 1, j = y - 1; i >= 0 && j >= 0; i--, j--) {
      if (map[j][i]) {
        if (mans[map[j][i]].my !== my) {
          pace.push({
            x: i,
            y: j,
          });
        }
        break;
      } else {
        pace.push({
          x: i,
          y: j,
        });
      }
    }
    return pace;
  },
  king: function (map, y, x, my) {
    var pace = [];
    // 右上
    if (
      y - 1 >= 0 &&
      x + 1 <= 7 &&
      (!mans[map[y - 1][x + 1]] || mans[map[y - 1][x + 1]].my !== my)
    ) {
      pace.push({
        x: x + 1,
        y: y - 1,
      });
    }
    // 右下
    if (
      y + 1 <= 7 &&
      x + 1 <= 7 &&
      (!mans[map[y + 1][x + 1]] || mans[map[y + 1][x + 1]].my !== my)
    ) {
      pace.push({
        x: x + 1,
        y: y + 1,
      });
    }
    // 左上
    if (
      y - 1 >= 0 &&
      x - 1 >= 0 &&
      (!mans[map[y - 1][x - 1]] || mans[map[y - 1][x - 1]].my !== my)
    ) {
      pace.push({
        x: x - 1,
        y: y - 1,
      });
    }
    // 左下
    if (
      y + 1 <= 7 &&
      x - 1 >= 0 &&
      (!mans[map[y + 1][x - 1]] || mans[map[y + 1][x - 1]].my !== my)
    ) {
      pace.push({
        x: x - 1,
        y: y + 1,
      });
    }
    // 右
    if (
      y >= 0 &&
      x + 1 <= 7 &&
      (!mans[map[y][x + 1]] || mans[map[y][x + 1]].my !== my)
    ) {
      pace.push({
        x: x + 1,
        y: y,
      });
    }
    // 左
    if (
      y <= 7 &&
      x - 1 >= 0 &&
      (!mans[map[y][x - 1]] || mans[map[y][x - 1]].my !== my)
    ) {
      pace.push({
        x: x - 1,
        y: y,
      });
    }
    // 上
    if (
      y - 1 >= 0 &&
      x >= 0 &&
      (!mans[map[y - 1][x]] || mans[map[y - 1][x]].my !== my)
    ) {
      pace.push({
        x: x,
        y: y - 1,
      });
    }
    // 下
    if (
      y + 1 <= 7 &&
      x >= 0 &&
      (!mans[map[y + 1][x]] || mans[map[y + 1][x]].my !== my)
    ) {
      pace.push({
        x: x,
        y: y + 1,
      });
    }
    return pace;
  },
  pawn: function (map, y, x, my) {
    var pace = [];
    if (my === true) {
      // 右上
      if (
        y - 1 >= 0 &&
        x + 1 <= 7 &&
        mans[map[y - 1][x + 1]] &&
        mans[map[y - 1][x + 1]].my !== my
      ) {
        pace.push({
          x: x + 1,
          y: y - 1,
        });
      }
      // 左上
      if (
        y - 1 >= 0 &&
        x - 1 >= 0 &&
        mans[map[y - 1][x - 1]] &&
        mans[map[y - 1][x - 1]].my !== my
      ) {
        pace.push({
          x: x - 1,
          y: y - 1,
        });
      }
      // 上
      if (y - 1 >= 0 && x >= 0 && !mans[map[y - 1][x]]) {
        pace.push({
          x: x,
          y: y - 1,
        });
      }
    } else {
      // 右下
      if (
        y + 1 <= 7 &&
        x + 1 <= 7 &&
        mans[map[y + 1][x + 1]] &&
        mans[map[y + 1][x + 1]].my !== my
      ) {
        pace.push({
          x: x + 1,
          y: y + 1,
        });
      }
      // 左下
      if (
        y + 1 <= 7 &&
        x - 1 <= 7 &&
        mans[map[y + 1][x - 1]] &&
        mans[map[y + 1][x - 1]].my !== my
      ) {
        pace.push({
          x: x - 1,
          y: y + 1,
        });
      }
      // 下
      if (y + 1 <= 7 && x >= 0 && !mans[map[y + 1][x]]) {
        pace.push({
          x: x,
          y: y + 1,
        });
      }
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
  },
};
