// const { PaiGow, PGTile } = require('../src/paigow');
const { printTiles, setOfTiles } = require('./debuglib');

let tiles = setOfTiles.map(tile => [tile, 1]).slice(0, 13);
console.log(printTiles(tiles));

tiles = setOfTiles.map(tile => [tile, 2]).slice(0, 13);
console.log(printTiles(tiles));

tiles = setOfTiles.map(tile => [tile, 2]).slice(12, 16);
console.log(printTiles(tiles, true));
