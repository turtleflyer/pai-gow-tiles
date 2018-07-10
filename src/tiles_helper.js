const { getTile } = require('../paigow/paigow');

const tilesImgs = [
  '12.svg',
  '2.svg',
  '8h.svg',
  '4h.svg',
  '10h.svg',
  '6h.svg',
  '4l.svg',
  '11.svg',
  '10l.svg',
  '7m.svg',
  '6l.svg',
  ['9(1).svg', '9(2).svg'],
  ['8l(1).svg', '8l(2).svg'],
  ['7u(1).svg', '7u(2).svg'],
  ['5(1).svg', '5(2).svg'],
  ['3(1).svg', '3(2).svg'],
];

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

export default {
  tilesImgs,
  getTileByKey,
};
