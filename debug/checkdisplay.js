// const { paiGow, PGTile } = require('../src/paigow');
const { printTiles, setOfTiles, getTile, parseTilesPatt } = require('./debuglib');

let tiles = setOfTiles.map(tile => [tile, 1]).slice(0, 13);
console.log(printTiles(tiles, false));

tiles = setOfTiles.map(tile => [tile, 2]).slice(0, 13);
console.log(printTiles(tiles, false));

tiles = setOfTiles.map(tile => [tile, 2]).slice(12, 16);
console.log(printTiles(tiles));

tiles = [[getTile('3'), 1], [getTile('5'), 2], [getTile('12'), 1], [getTile('7u'), 1]];
console.log(printTiles(tiles));

tiles = parseTilesPatt('12 7u 12 7u');
console.log(printTiles(tiles));

console.log(printTiles(parseTilesPatt('2 5 3 6l')));

console.log(printTiles(parseTilesPatt('3 12 2 8h 4h 10h 6h 4l'), false));

console.log(printTiles(parseTilesPatt('11 10l 7m 6l 9 8l 7u 5'), false));

