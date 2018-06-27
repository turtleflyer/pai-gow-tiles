const {
  paiGow: { houseWay },
} = require('../src/paigow');
const { parseTilesPatt, printTwoHands } = require('./debuglib');

console.log(printTwoHands(houseWay(parseTilesPatt('5 10h 5 10h'))));
console.log(printTwoHands(houseWay(parseTilesPatt('3 3 6h 4l'))));
console.log(printTwoHands(houseWay(parseTilesPatt('12 12 7u 5'))));
console.log(printTwoHands(houseWay(parseTilesPatt('9 9 10h 10l'))));
console.log(printTwoHands(houseWay(parseTilesPatt('8h 8h 2 11'))));
console.log(printTwoHands(houseWay(parseTilesPatt('7m 7m 12 10l'))));
console.log(printTwoHands(houseWay(parseTilesPatt('2 12 3 10l'))));
console.log(printTwoHands(houseWay(parseTilesPatt('2 12 4h 5'))));
console.log(printTwoHands(houseWay(parseTilesPatt('7m 12 8l 5'))));
console.log(printTwoHands(houseWay(parseTilesPatt('9 12 8l 4l'))));
console.log(printTwoHands(houseWay(parseTilesPatt('3 6l 5 12'))));
console.log(printTwoHands(houseWay(parseTilesPatt('4l 5 4h 3'))));
console.log(printTwoHands(houseWay(parseTilesPatt('8h 10l 11 7u'))));
console.log(printTwoHands(houseWay(parseTilesPatt('8h 10h 11 6l'))));
console.log(printTwoHands(houseWay(parseTilesPatt('6h 3 11 6l'))));
console.log(printTwoHands(houseWay(parseTilesPatt('4h 4l 9 5'))));
console.log(printTwoHands(houseWay(parseTilesPatt('3 6l 7m 8h'))));
console.log(printTwoHands(houseWay(parseTilesPatt('6h 6l 7m 8h'))));
console.log(printTwoHands(houseWay(parseTilesPatt('6l 7u 10h 4l'))));
