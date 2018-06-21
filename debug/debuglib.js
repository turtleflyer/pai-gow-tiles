const { PaiGow, PGTile } = require('../src/paigow');

const { setOfTiles } = PaiGow;

const displaySet = [
  [' *             * *', '* ** *         * *'],
  '* ** ** ** ** ** *',
  '* *            * *',
  '* ** *      * ** *',
  ' *         * * *  ',
  '* * * * ** * * * *',
  ' *    * *       * ',
  '* *            * *',
  '* * * * ** ** ** *',
  '* ** *   * ** ** *',
  ' *       * ** ** *',
  ' *       * * * * *',
  ['* ** *   * * * * *', '  * * *  * ** ** *'],
  ['* *      * ** ** *', '  * * *  * * * * *'],
  ['* *      * * * * *', '* ** *     * * *  '],
  ['* ** *          * ', '* *        * * *  '],
];

const PaiGowDebugLib = {
  printTiles(list, separate) {
    const toDisplay = new Array(10).fill('');

    function addVerticalTiles(vertList) {
      return vertList.forEach((listEntry) => {
        function addVertToPrint(str) {
          toDisplay[0] += '┌─────────┐  ';
          for (let i = 0; i < 18; i += 3) {
            if (i === 9) {
              toDisplay[4] += '│         │  ';
            }
            toDisplay[i / 3 + (i > 6 ? 2 : 1)] += `│  ${str
              .slice(i, i + 3)
              .replace(/ |\*/g, '$& ')} │  `;
          }
          toDisplay[8] += '└─────────┘  ';
          toDisplay[9] += '             ';
        }
        const { display } = listEntry[0];
        if (Array.isArray(display)) {
          addVertToPrint(display[listEntry[1] - 1]);
        } else {
          addVertToPrint(display);
        }
      });
    }

    function addHorizTiles(horList) {
      for (let i = 0; i < 2; i++) {
        const base = i * 5;
        const { display } = horList[i][0];
        let strDisplay;
        if (Array.isArray(display)) {
          strDisplay = display[horList[i][1] - 1];
        } else {
          strDisplay = display;
        }
        const modStr = [...strDisplay].reduce((arr, char, index) => {
          const modArr = arr;
          modArr[2 - (index % 3)] += Math.floor(index / 3) === 3 ? ` ${char} ` : `${char} `;
          return modArr;
        }, new Array(3).fill(''));
        toDisplay[base] += '┌──────────────┐';
        for (let ii = 0; ii < 3; ii++) {
          toDisplay[base + ii + 1] += `│ ${modStr[ii]}│`;
        }
        toDisplay[base + 4] += '└──────────────┘  ';
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
  },

  setOfTiles: setOfTiles.map((tile, index) => {
    const modTile = new PGTile(index);
    modTile.display = displaySet[index];
    return modTile;
  }),
};

module.exports = PaiGowDebugLib;
