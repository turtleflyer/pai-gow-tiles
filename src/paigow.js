const setOfTiles = [
  {
    value: 3,
    altValue: 6,
    alias: 'Gee Joon',
    high: false,
    rank: 15,
  },
  {
    value: 2,
    alias: 'Teen',
    high: true,
    rank: 0,
  },
  {
    value: 2,
    alias: 'Day',
    high: true,
    rank: 1,
  },
  {
    value: 8,
    alias: 'Yun',
    high: true,
    rank: 2,
  },
  {
    value: 4,
    alias: 'Gor',
    high: true,
    rank: 3,
  },
  {
    value: 0,
    alias: 'Mooy',
    high: true,
    rank: 4,
  },
  {
    value: 6,
    alias: 'Chong',
    high: true,
    rank: 5,
  },
  {
    value: 4,
    alias: 'Bon',
    high: false,
    rank: 6,
  },
  {
    value: 1,
    alias: 'Foo',
    high: false,
    rank: 7,
  },
  {
    value: 0,
    alias: 'Ping',
    high: false,
    rank: 8,
  },
  {
    value: 7,
    alias: 'Tit',
    high: false,
    rank: 9,
  },
  {
    value: 6,
    alias: 'Look',
    high: false,
    rank: 10,
  },
  {
    value: 9,
    alias: 'Chop Gow',
    high: false,
    rank: 11,
  },
  {
    value: 8,
    alias: 'Chop Bot',
    high: false,
    rank: 12,
  },
  {
    value: 7,
    alias: 'Chop Chit',
    high: false,
    rank: 13,
  },
  {
    value: 5,
    alias: 'Chop Ng',
    high: false,
    rank: 14,
  },
];

class PaiGow {
  // constructor() {}
}

class PGTile {
  constructor(arg) {
    if (typeof arg === 'number') {
      Object.assign(this, setOfTiles);
    } else {
      Object.assign(this, arg);
    }
  }
}

PaiGow.setOfTiles = setOfTiles.map(t => new PGTile(t));

module.exports.PaiGow = PaiGow;
module.exports.PGTile = PGTile;
