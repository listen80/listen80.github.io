export const initMap = [
  ["C0", "M0", "X0", "S0", "J", "S1", "X1", "M1", "C1"],
  [],
  [, "P0", , , , , , "P1"],
  ["Z0", , "Z1", , "Z2", , "Z3", , "Z4"],
  [],
  [],
  ["z0", , "z1", , "z2", , "z3", , "z4"],
  [, "p0", , , , , , "p1"],
  [],
  ["c0", "m0", "x0", "s0", "j", "s1", "x1", "m1", "c1"],
];

export const initMap2 = [
  ["Z2", "M0"],
  [""],
  [],
  ["Z0"],
  [],
  [],
  ["z0"],
  [, "p0"],
  [],
  [],
];

export const initMap3 = [
  [, , , , "J"],
  [""],
  [],
  ["Z0"],
  [],
  [],
  ["z0", , "c0", , "c1", , "z3", , "z4"],
  [],
  [],
  [, , , , "j", "s1", "x1", "m1", ],
];

export function clone(obj) {
  return JSON.parse(JSON.stringify(obj));
}

export const getDefaultMap = () => {
  return clone(initMap3);
};
