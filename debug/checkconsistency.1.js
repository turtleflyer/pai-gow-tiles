const {
  paiGow: { getTile, houseWay },
} = require('../src/paigowlib/paigow');

// Cheking over all possible combination of tiles.
const allTiles = [];
for (let i = 0; i < 16; i++) {
  allTiles.push(getTile(i));
  allTiles.push(getTile(i));
}

for (let i = 0; i < 32; i++) {
  for (let ii = 0; ii < 32; ii++) {
    if (i !== ii) {
      for (let iii = 0; iii < 32; iii++) {
        if (iii !== ii && iii !== i) {
          for (let iiii = 0; iiii < 32; iiii++) {
            if (iiii !== iii && iiii !== ii && iiii !== i) {
              const combination = [allTiles[i], allTiles[ii], allTiles[iii], allTiles[iiii]];
              // console.log('combination: ', combination);
              houseWay(combination);
            }
          }
        }
      }
    }
  }
}
