const {
  paiGow: { getTile, houseWay },
} = require('../src/paigowlib/paigow');
const { printTwoHands } = require('./debuglib');
const isEqual = require('lodash.isequal');

// Checking whatever all variants of each combination give the same result.
const allTiles = [];
for (let i = 0; i < 16; i++) {
  allTiles.push(getTile(i));
  allTiles.push(getTile(i));
}

const combinationsPattern = [[0, 1, 2, 3], [0, 2, 1, 3], [0, 3, 1, 2]];
let toBreak = false;

for (let i = 0; i < 32; i++) {
  if (!toBreak) {
    for (let ii = i + 1; ii < 32; ii++) {
      if (!toBreak) {
        for (let iii = ii + 1; iii < 32; iii++) {
          if (!toBreak) {
            for (let iiii = iii + 1; iiii < 32; iiii++) {
              if (!toBreak) {
                const combination = [allTiles[i], allTiles[ii], allTiles[iii], allTiles[iiii]];
                const diffResults = combinationsPattern
                  .map(patt => patt.map(index => combination[index]))
                  .map(tiles => houseWay(tiles));
                if (
                  !(
                    isEqual(diffResults[0], diffResults[1]) &&
                    isEqual(diffResults[1], diffResults[2])
                  )
                ) {
                  toBreak = true;
                  console.log("Something's getting wrong");
                  console.log(printTwoHands(diffResults[0]));
                  console.log(printTwoHands(diffResults[1]));
                  console.log(printTwoHands(diffResults[2]));
                }
              }
            }
          }
        }
      }
    }
  }
}
