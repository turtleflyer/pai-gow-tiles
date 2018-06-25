const {
  paiGow: {
    getTile, getTileByRank, getHand, compareHands, getTotalHand, houseWay,
  },
} = require('../src/paigow');

// const  = paiGow;

const displayPattSet = [
  '* ** ** ** ** ** *',
  ' *              * ',
  '* ** *      * ** *',
  ' *         * * *  ',
  '* * * * ** * * * *',
  ' *  * * *    *  * ',
  '* *            * *',
  '* * * * ** ** ** *',
  '* ** *   * ** ** *',
  ' *       * ** ** *',
  ' *       * * * * *',
  ['* ** *   * * * * *', '  * * *  * ** ** *'],
  ['* *      * ** ** *', '  * * *  * * * * *'],
  ['* *      * * * * *', '* ** *     * * *  '],
  ['* ** *          * ', '* *        * * *  '],
  [' *             * *', '* ** *         * *'],
];

const inputKeysSet = ['3', '12', '2', '8h', '4h', '10h', '6h', '4l', '11', '10l', '7m', '6l', '9', '8l', '7u', '5'];

const inputMap = new Map(inputKeysSet.map((key, index) => [key, getTile(index)]));

function getTileByKey(key) {
  return inputMap.get(key);
}

function parseTilesPatt(patt) {
  return patt.split(' ').map(key => getTileByKey(key));
}

const reverseInputMap = new Map(inputKeysSet.map((key, index) => [getTile(index), key]));

function getPatt(list) {
  let returnedStr = '';
  for (const tile of list) {
    returnedStr += `${reverseInputMap.get(tile)} `;
  }
  return returnedStr.slice(0, -1);
}

function printTiles(list, separate = true) {
  const toDisplay = new Array(10).fill('');
  const alreadyIn = new Set();

  function getDisplayPatt(tile) {
    const display = displayPattSet[15 - tile.rank];
    if (Array.isArray(display)) {
      if (alreadyIn.has(tile)) {
        return display[1];
      }
      alreadyIn.add(tile);
      return display[0];
    }
    return display;
  }

  function addVerticalTiles(vertList) {
    return vertList.forEach((tile) => {
      function addVertToPrint(str) {
        toDisplay[0] += '┌─────────┐  ';
        for (let i = 0; i < 18; i += 3) {
          if (i === 9) {
            toDisplay[4] += '│         │  ';
          }
          toDisplay[i / 3 + (i > 6 ? 2 : 1)] += `│  ${str.slice(i, i + 3).replace(/ |\*/g, '$& ')} │  `;
        }
        toDisplay[8] += '└─────────┘  ';
        toDisplay[9] += '             ';
      }
      addVertToPrint(getDisplayPatt(tile));
    });
  }

  function addHorizTiles(horList) {
    for (let i = 0; i < 2; i++) {
      const base = i * 5;
      const strDisplay = getDisplayPatt(horList[i]);
      const modStr = [...strDisplay].reduce((arr, char, index) => {
        const modArr = arr;
        modArr[2 - (index % 3)] += Math.floor(index / 3) === 3 ? ` ${char} ` : `${char} `;
        return modArr;
      }, new Array(3).fill(''));
      toDisplay[base] += '┌──────────────┐';
      for (let ii = 0; ii < 3; ii++) {
        toDisplay[base + ii + 1] += `│ ${modStr[ii]}│`;
      }
      toDisplay[base + 4] += '└──────────────┘';
    }
    return toDisplay;
  }

  if (separate) {
    addVerticalTiles(list.slice(0, 2));
    addHorizTiles(list.slice(2, 4));
  } else {
    addVerticalTiles(list);
  }
  return toDisplay.join('\r\n');
}

function printTwoHands(...hands) {
  if (hands[0].lowHand) {
    const {
      lowHand: { highTile: hand1, lowTile: hand2 },
      highHand: { highTile: hand3, lowTile: hand4 },
    } = hands[0];
    return printTiles([hand1, hand2, hand3, hand4]);
  }
  return printTiles(hands.sort(compareHands).reduce((list, hand) => list.concat([hand.highTile, hand.lowTile]), []));
}

module.exports = {
  getTileByKey,
  parseTilesPatt,
  getPatt,
  printTiles,
  printTwoHands,
};
