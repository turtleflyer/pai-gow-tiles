const {
  paiGow: {
    getTile, getTileByRank, getHand, compareHands, getTotalHand, houseWay,
  },
} = require('../src/paigow');
const {
  getTileByKey, parseTilesPatt, getPatt, printTiles, printTwoHands,
} = require('./debuglib');

let tiles = new Array(13).fill().map((_, i) => getTile(i));
console.log(printTiles(tiles, false));

tiles = new Array(4).fill().map((_, i) => getTile(i + 12));
console.log(printTiles(tiles));

tiles = [getTileByKey('3'), getTileByKey('5'), getTileByKey('12'), getTileByKey('7u')];
console.log(printTiles(tiles));

tiles = parseTilesPatt('12 7u 12 7u');
console.log(printTiles(tiles));

console.log(printTiles(parseTilesPatt('2 5 3 6l')));

console.log(printTiles(parseTilesPatt('3 12 2 8h 4h 10h 3 4l'), false));

console.log(printTiles(parseTilesPatt('11 10l 7m 6l 5 8l 7u 5'), false));

tiles = [getHand(...parseTilesPatt('12 8l')), getHand(...parseTilesPatt('12 8h'))];
console.log(printTwoHands(...tiles));

console.log(printTwoHands(getHand(...parseTilesPatt('3 6h')), getHand(...parseTilesPatt('5 12'))));

console.log(printTwoHands(getTotalHand(getHand(...parseTilesPatt('7u 12')), getHand(...parseTilesPatt('10h 7u')))));
