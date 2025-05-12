export const bylaw = {
  c(x, y, my, map) {
    const d = [];
    for (let i = y - 1; i >= 0; i--) {
      if (map[i][x]) {
        if (map[i][x].my !== my) d.push([x, i])
        break
      } else {
        d.push([x, i])
      }
    }
    for (let i = y + 1; i <= 9; i++) {
      if (map[i][x]) {
        if (map[i][x].my !== my) d.push([x, i])
        break
      } else {
        d.push([x, i])
      }
    }
    for (let i = x - 1; i >= 0; i--) {
      if (map[y][i]) {
        if (map[y][i].my !== my) d.push([i, y])
        break
      } else {
        d.push([i, y])
      }
    }
    for (let i = x + 1; i <= 8; i++) {
      if (map[y][i]) {
        if (map[y][i].my !== my) d.push([i, y])
        break
      } else {
        d.push([i, y])
      }
    }
    return d
  },
  m(x, y, my, map) {
    const d = [];
    if (y - 2 >= 0 && x + 1 <= 8 && !map[y - 1][x] && (!map[y - 2][x + 1] || map[y - 2][x + 1].my !== my)) d.push([x + 1, y - 2])
    if (y - 1 >= 0 && x + 2 <= 8 && !map[y][x + 1] && (!map[y - 1][x + 2] || map[y - 1][x + 2].my !== my)) d.push([x + 2, y - 1])
    if (y + 1 <= 9 && x + 2 <= 8 && !map[y][x + 1] && (!map[y + 1][x + 2] || map[y + 1][x + 2].my !== my)) d.push([x + 2, y + 1])
    if (y + 2 <= 9 && x + 1 <= 8 && !map[y + 1][x] && (!map[y + 2][x + 1] || map[y + 2][x + 1].my !== my)) d.push([x + 1, y + 2])
    if (y + 2 <= 9 && x - 1 >= 0 && !map[y + 1][x] && (!map[y + 2][x - 1] || map[y + 2][x - 1].my !== my)) d.push([x - 1, y + 2])
    if (y + 1 <= 9 && x - 2 >= 0 && !map[y][x - 1] && (!map[y + 1][x - 2] || map[y + 1][x - 2].my !== my)) d.push([x - 2, y + 1])
    if (y - 1 >= 0 && x - 2 >= 0 && !map[y][x - 1] && (!map[y - 1][x - 2] || map[y - 1][x - 2].my !== my)) d.push([x - 2, y - 1])
    if (y - 2 >= 0 && x - 1 >= 0 && !map[y - 1][x] && (!map[y - 2][x - 1] || map[y - 2][x - 1].my !== my)) d.push([x - 1, y - 2])
    return d
  },
  x(x, y, my, map) {
    const d = [];
    if (my === 1) {
      if (y + 2 <= 9 && x + 2 <= 8 && !map[y + 1][x + 1] && (!map[y + 2][x + 2] || map[y + 2][x + 2].my !== my)) d.push([x + 2, y + 2])
      if (y + 2 <= 9 && x - 2 >= 0 && !map[y + 1][x - 1] && (!map[y + 2][x - 2] || map[y + 2][x - 2].my !== my)) d.push([x - 2, y + 2])
      if (y - 2 >= 5 && x + 2 <= 8 && !map[y - 1][x + 1] && (!map[y - 2][x + 2] || map[y - 2][x + 2].my !== my)) d.push([x + 2, y - 2])
      if (y - 2 >= 5 && x - 2 >= 0 && !map[y - 1][x - 1] && (!map[y - 2][x - 2] || map[y - 2][x - 2].my !== my)) d.push([x - 2, y - 2])
    } else {
      if (y + 2 <= 4 && x + 2 <= 8 && !map[y + 1][x + 1] && (!map[y + 2][x + 2] || map[y + 2][x + 2].my !== my)) d.push([x + 2, y + 2])
      if (y + 2 <= 4 && x - 2 >= 0 && !map[y + 1][x - 1] && (!map[y + 2][x - 2] || map[y + 2][x - 2].my !== my)) d.push([x - 2, y + 2])
      if (y - 2 >= 0 && x + 2 <= 8 && !map[y - 1][x + 1] && (!map[y - 2][x + 2] || map[y - 2][x + 2].my !== my)) d.push([x + 2, y - 2])
      if (y - 2 >= 0 && x - 2 >= 0 && !map[y - 1][x - 1] && (!map[y - 2][x - 2] || map[y - 2][x - 2].my !== my)) d.push([x - 2, y - 2])
    }
    return d
  },
  s(x, y, my, map) {
    const d = [];
    if (my === 1) {
      if (y + 1 <= 9 && x + 1 <= 5 && (!map[y + 1][x + 1] || map[y + 1][x + 1].my !== my)) d.push([x + 1, y + 1])
      if (y + 1 <= 9 && x - 1 >= 3 && (!map[y + 1][x - 1] || map[y + 1][x - 1].my !== my)) d.push([x - 1, y + 1])
      if (y - 1 >= 7 && x + 1 <= 5 && (!map[y - 1][x + 1] || map[y - 1][x + 1].my !== my)) d.push([x + 1, y - 1])
      if (y - 1 >= 7 && x - 1 >= 3 && (!map[y - 1][x - 1] || map[y - 1][x - 1].my !== my)) d.push([x - 1, y - 1])
    } else {
      if (y + 1 <= 2 && x + 1 <= 5 && (!map[y + 1][x + 1] || map[y + 1][x + 1].my !== my)) d.push([x + 1, y + 1])
      if (y + 1 <= 2 && x - 1 >= 3 && (!map[y + 1][x - 1] || map[y + 1][x - 1].my !== my)) d.push([x - 1, y + 1])
      if (y - 1 >= 0 && x + 1 <= 5 && (!map[y - 1][x + 1] || map[y - 1][x + 1].my !== my)) d.push([x + 1, y - 1])
      if (y - 1 >= 0 && x - 1 >= 3 && (!map[y - 1][x - 1] || map[y - 1][x - 1].my !== my)) d.push([x - 1, y - 1])
    }
    return d
  },
  j(x, y, my, map) {
    const d = [];
    if (my === 1) {
      if (y + 1 <= 9 && (!map[y + 1][x] || map[y + 1][x].my !== my)) d.push([x, y + 1])
      if (y - 1 >= 7 && (!map[y - 1][x] || map[y - 1][x].my !== my)) d.push([x, y - 1])
      for (let i = y - 1; i > 0; i--) {
        if (map[i][x]) {
          if (map[i][x].lowPater === 'j') {
            d.push([x, i])
          }
          break;
        }
      }
    } else {
      if (y + 1 <= 2 && (!map[y + 1][x] || map[y + 1][x].my !== my)) d.push([x, y + 1])
      if (y - 1 >= 0 && (!map[y - 1][x] || map[y - 1][x].my !== my)) d.push([x, y - 1])
      for (let i = y + 1; i <= 9; i++) {
        if (map[i][x]) {
          if (map[i][x].lowPater === 'j') {
            d.push([x, i])
          }
          break;
        }
      }
    }
    if (x + 1 <= 5 && (!map[y][x + 1] || map[y][x + 1].my !== my)) d.push([x + 1, y])
    if (x - 1 >= 3 && (!map[y][x - 1] || map[y][x - 1].my !== my)) d.push([x - 1, y])
    return d
  },
  p(x, y, my, map) {
    const d = [];
    let n;
    n = 0;
    for (let i = x - 1; i >= 0; i--) {
      if (map[y][i]) {
        if (n === 0) {
          n++;
          continue
        } else {
          if (map[y][i].my !== my) d.push([i, y])
          break
        }
      } else {
        if (n === 0) d.push([i, y])
      }
    }
    n = 0;
    for (let i = x + 1; i <= 8; i++) {
      if (map[y][i]) {
        if (n === 0) {
          n++;
          continue
        } else {
          if (map[y][i].my !== my) d.push([i, y])
          break
        }
      } else {
        if (n === 0) d.push([i, y])
      }
    }
    n = 0;
    for (let i = y - 1; i >= 0; i--) {
      if (map[i][x]) {
        if (n === 0) {
          n++;
          continue
        } else {
          if (map[i][x].my !== my) d.push([x, i])
          break
        }
      } else {
        if (n === 0) d.push([x, i])
      }
    }
    n = 0;
    for (let i = y + 1; i <= 9; i++) {
      if (map[i][x]) {
        if (n === 0) {
          n++;
          continue
        } else {
          if (map[i][x].my !== my) d.push([x, i])
          break
        }
      } else {
        if (n === 0) d.push([x, i])
      }
    }
    return d
  },
  z(x, y, my, map) {
    const d = [];
    if (my === 1) {
      if (y - 1 >= 0 && (!map[y - 1][x] || map[y - 1][x].my !== my)) d.push([x, y - 1])
      if (x + 1 <= 8 && y <= 4 && (!map[y][x + 1] || map[y][x + 1].my !== my)) d.push([x + 1, y])
      if (x - 1 >= 0 && y <= 4 && (!map[y][x - 1] || map[y][x - 1].my !== my)) d.push([x - 1, y])
    } else {
      if (y + 1 <= 9 && (!map[y + 1][x] || map[y + 1][x].my !== my)) d.push([x, y + 1])
      if (x + 1 <= 8 && y >= 6 && (!map[y][x + 1] || map[y][x + 1].my !== my)) d.push([x + 1, y])
      if (x - 1 >= 0 && y >= 6 && (!map[y][x - 1] || map[y][x - 1].my !== my)) d.push([x - 1, y])
    }
    return d
  }
}
