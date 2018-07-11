const {
  paiGow: { getTile, compareHands },
} = require('../paigow/paigow');

const inputKeysSet = [
  '3',
  '12',
  '2',
  '8h',
  '4h',
  '10h',
  '6h',
  '4l',
  '11',
  '10l',
  '7m',
  '6l',
  '9',
  '8l',
  '7u',
  '5',
];

const inputMap = new Map(inputKeysSet.map((key, index) => [key, getTile(index)]));

function getTileByKey(key) {
  return inputMap.get(key);
}

const reverseInputMap = new Map(inputKeysSet.map((key, index) => [getTile(index), key]));

function getTilesComplected(list) {
  const alreadyIn = new Set();
  return list.map((tile) => {
    if (alreadyIn.has(tile)) {
      return { tile, second: true };
    }
    alreadyIn.add(tile);
    return { tile, second: false };
  });
}

module.exports = {
  getTileByKey,
  reverseInputMap,
  getTilesComplected,
};
