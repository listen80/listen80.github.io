const reverseArr = (arr) => arr.map(([x, y]) => [-x, y])

// L
const a1 = [[0, 0],[-1, 0],[1, 0],[1, 1]]

// Z
const a2 = [[0, 0],[-1, 0],[0, 1],[1, 1]]

// ^ 土
const a3 = [[0, 0],[-1, 0],[1, 0],[0, 1]]

// ——
const a4 = [[0, 0],[-1, 0],[1, 0],[2, 0]]

// 田
const a5 = [[0, 0],[1, 0],[0, 1],[1, 1]]

// 方块Arr
const BLOCK_TYPE = [a1, a2, a3, a4, a5, reverseArr(a1), reverseArr(a2)]
// const BLOCK_TYPE = [a4]

const createRandomHSL = () => `hsl(${Math.random() * 360 | 0},${Math.random() * 5 + 85 | 0}%,${Math.random() * 10 + 50 | 0}%)`;
 