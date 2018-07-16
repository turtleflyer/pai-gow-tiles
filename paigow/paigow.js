class PGTile {
  constructor({
    value, altValue, name, rank,
  }) {
    Object.assign(this, {
      value,
      altValue,
      name,
      rank,
    });
  }
}

const setOfTiles = [
  {
    value: 3,
    altValue: 6,
    name: 'Gee Joon',
    rank: 0,
  },
  {
    value: 2,
    name: 'Teen',
    rank: 15,
  },
  {
    value: 2,
    name: 'Day',
    rank: 14,
  },
  {
    value: 8,
    name: 'Yun',
    rank: 13,
  },
  {
    value: 4,
    name: 'Gor',
    rank: 12,
  },
  {
    value: 0,
    name: 'Mooy',
    rank: 11,
  },
  {
    value: 6,
    name: 'Chong',
    rank: 10,
  },
  {
    value: 4,
    name: 'Bon',
    rank: 9,
  },
  {
    value: 1,
    name: 'Foo',
    rank: 8,
  },
  {
    value: 0,
    name: 'Ping',
    rank: 7,
  },
  {
    value: 7,
    name: 'Tit',
    rank: 6,
  },
  {
    value: 6,
    name: 'Look',
    rank: 5,
  },
  {
    value: 9,
    name: 'Chop Gow',
    rank: 4,
  },
  {
    value: 8,
    name: 'Chop Bot',
    rank: 3,
  },
  {
    value: 7,
    name: 'Chop Chit',
    rank: 2,
  },
  {
    value: 5,
    name: 'Chop Ng',
    rank: 1,
  },
].map(t => new PGTile(t));

function getTile(n) {
  return setOfTiles[n];
}

function getTileByRank(rank) {
  return setOfTiles.find(t => t.rank === rank);
}

class PGHand {
  constructor(tile1, tile2) {
    if (tile1 === tile2) {
      return {
        value: 12,
        rank: tile1.rank === 0 ? 16 : tile1.rank,
        highTile: tile1,
        lowTile: tile2,
      };
    }

    let sum = tile1.value + tile2.value;
    if (sum > 11 || !(tile1.value === 2 || tile2.value === 2)) {
      sum %= 10;
    }
    if (tile1.altValue) {
      const altSum = (tile1.altValue + tile2.value) % 10;
      sum = sum > altSum ? sum : altSum;
    }
    if (tile2.altValue) {
      const altSum = (tile1.value + tile2.altValue) % 10;
      sum = sum > altSum ? sum : altSum;
    }

    if (tile1.rank > tile2.rank) {
      Object.assign(this, {
        value: sum,
        rank: tile1.rank,
        highTile: tile1,
        lowTile: tile2,
      });
    } else {
      Object.assign(this, {
        value: sum,
        rank: tile2.rank,
        highTile: tile2,
        lowTile: tile1,
      });
    }
  }
}

function getHand(tile1, tile2) {
  return new PGHand(tile1, tile2);
}

function compareHands(hand1, hand2) {
  switch (true) {
    case hand1.value > hand2.value:
      return 1;

    case hand1.value < hand2.value:
      return -1;

    default:
      switch (true) {
        case hand1.rank > hand2.rank:
          return 1;

        case hand1.rank < hand2.rank:
          return -1;

        default:
          return 0;
      }
  }
}

class PGEntireHand {
  constructor(hand1, hand2) {
    const [lowHand, highHand] = [hand1, hand2].sort(compareHands);
    Object.assign(this, { lowHand, highHand });
  }
}

function getEntireHand(hand1, hand2) {
  return new PGEntireHand(hand1, hand2);
}

function compareEntireHands(bankerHand, otherHand) {
  switch (true) {
    case otherHand.lowHand.value === 0:
    case compareHands(bankerHand.lowHand, otherHand.lowHand) >= 0:
      // The comparison of the low hands ends up in favor of the banker
      switch (true) {
        case compareHands(bankerHand.highHand, otherHand.highHand) >= 0:
          return { win: true };

        default:
          return { tie: true };
      }

    default:
      // The comparison of the low hands does not end up in favor of the banker
      switch (true) {
        case compareHands(bankerHand.highHand, otherHand.highHand) >= 0:
          return { tie: true };

        default:
          return { lose: true };
      }
  }
}

function totalValue(entireHand) {
  return entireHand.lowHand.value + entireHand.highHand.value;
}

function isHigh(handOrTile) {
  return handOrTile.rank >= 10;
}

function probe(possibleSolutions, patt, any = false) {
  if (Array.isArray(patt)) {
    const [low, high] = patt.map((e) => {
      if (typeof e === 'function') {
        return e;
      }
      if (typeof e === 'number') {
        return toCheck => toCheck === e;
      }
      return () => true;
    });
    return possibleSolutions
      .slice(0, any ? 4 : 1)
      .findIndex(sol => low(sol.lowHand.value) && high(sol.highHand.value));
  }
  const pred = typeof patt === 'function' ? patt : toCheck => toCheck === patt;

  return possibleSolutions
    .slice(0, any ? 4 : 1)
    .findIndex(sol => pred(sol.lowHand.value) || pred(sol.highHand.value));
}

function checkMultiplePatt(possibleSolutions, patterns) {
  let index;
  for (const patt of patterns) {
    index = probe(possibleSolutions, patt, true);
    if (index >= 0) {
      break;
    }
  }
  return index;
}

const rules = {
  splitGeeJoon(possibleSolutions) {
    // console.log('Check to split Gee Joon');
    const index = probe(possibleSolutions, [c => c >= 7, 9], true);
    return possibleSolutions[index >= 0 ? index : 0];
  },

  splitTeenDay(possibleSolutions) {
    // console.log('Check to split Teens or Days');
    const index = checkMultiplePatt(possibleSolutions, [[v => v >= 6, v => v >= 8], [3, 11]]);
    return possibleSolutions[index >= 0 ? index : 0];
  },

  splitNines(possibleSolutions) {
    // console.log('Check to split Nines');
    const index = probe(possibleSolutions, [v => v >= 9, v => v >= 9], true);
    return possibleSolutions[index >= 0 ? index : 0];
  },

  splitEights(possibleSolutions) {
    // console.log('Check to split Eights');
    const index = checkMultiplePatt(possibleSolutions, [[v => v >= 8, v => v >= 8], [7, 9]]);
    return possibleSolutions[index >= 0 ? index : 0];
  },

  splitSevens(possibleSolutions) {
    // console.log('Check to split Sevens');
    const index = probe(possibleSolutions, [v => v >= 7, v => v >= 9], true);
    return possibleSolutions[index >= 0 ? index : 0];
  },

  twoTeensOrDays(possibleSolutions) {
    // console.log('Two Teens or Days');
    let index = probe(possibleSolutions, [4, v => v >= 4 && v <= 7], true);
    if (index < 0) {
      index = checkMultiplePatt(possibleSolutions, [[2, 3], [6, 7], [6, 8]]);
      if (index >= 0) {
        index = 1;
      } else {
        index = 0;
      }
    }
    return possibleSolutions[index];
  },

  gongWongNine(possibleSolutions) {
    // console.log('Check gong, wong, nine');
    const index7 = probe(possibleSolutions, ['*', 9], true);
    const index8 = probe(possibleSolutions, ['*', 10], true);
    const index9 = probe(possibleSolutions, ['*', 11], true);
    if (index7 >= 0) {
      const sol7LowHand = possibleSolutions[index7].lowHand;
      if (
        sol7LowHand.value > 3
        || (sol7LowHand.value === 3 && isHigh(sol7LowHand))
        || (index8 < 0 && index9 < 0)
      ) {
        return possibleSolutions[index7];
      }
    }
    return possibleSolutions[index8 >= 0 ? index8 : index9];
  },

  no88WithTeenOrDay(possibleSolutions) {
    if (
      probe(possibleSolutions, [7, 9]) === 0
      && (possibleSolutions[1].lowHand.rank === 1 && possibleSolutions[1].highHand.rank >= 14)
    ) {
      // console.log('No 8 - 8 with Teen or Day, Gee Joon, 5');
      return possibleSolutions[0];
    }
    return null;
  },

  geeJoonAnd45(possibleSolutions) {
    if (
      probe(possibleSolutions, [7, 9]) === 0
      && possibleSolutions[0].highHand.lowTile.rank === 1
      && possibleSolutions[0].lowHand.lowTile.rank === 0
    ) {
      // console.log('4, 5 and Gee Joon');
      return possibleSolutions[1];
    }
    return null;
  },

  high8and11and10(possibleSolutions) {
    if (
      probe(possibleSolutions, [8, 8]) === 0
      && possibleSolutions[0].highHand.rank === 13
      && possibleSolutions[0].lowHand.rank === 8
    ) {
      // console.log('High 8, 10, 11, 7');
      return possibleSolutions[1];
    }
    if (
      probe(possibleSolutions, [v => v === 6 || v === 7, 9]) === 0
      && possibleSolutions[0].highHand.rank === 13
      && possibleSolutions[0].lowHand.rank === 11
    ) {
      // console.log('High 8, high 10, 11, 6');
      return possibleSolutions[0];
    }
    return null;
  },

  twoSixesGeeJoon11(possibleSolutions) {
    if (
      probe(possibleSolutions, [7, 9]) === 0
      && possibleSolutions[0].highHand.rank === 10
      && possibleSolutions[0].lowHand.rank === 8
    ) {
      // console.log('Two 6, Gee Joon, 11');
      return possibleSolutions[0];
    }
    return null;
  },

  twoFours9and5(possibleSolutions) {
    if (
      probe(possibleSolutions, [3, 9]) === 0
      && possibleSolutions[0].highHand.rank === 12
      && possibleSolutions[0].lowHand.rank === 9
    ) {
      // console.log('Two 4, 9, 5');
      return possibleSolutions[1];
    }
    return null;
  },

  highThree(possibleSolutions) {
    // console.log('High Three');
    if (checkMultiplePatt(possibleSolutions, [[8, 9]]) >= 0) {
      // console.log('8 - 9 or better');
      return possibleSolutions.find(sol => sol.highHand.value === 9 && isHigh(sol.highHand));
    }
    const sortedByHigh = possibleSolutions.sort((sol1, sol2) => {
      switch (true) {
        case sol1.highHand.value < sol2.highHand.value:
          return -1;

        case sol1.highHand.value > sol2.highHand.value:
          return 1;

        default:
          switch (true) {
            case sol1.highHand.rank < sol2.highHand.rank:
              return -1;

            case sol1.highHand.rank > sol2.highHand.rank:
              return 1;

            default:
              return 0;
          }
      }
    });
    const first = sortedByHigh[0];
    const last = sortedByHigh[sortedByHigh.length - 1];
    return first.lowHand.value > 3
      || (first.lowHand.value === 3 && isHigh(first.lowHand))
      || last.highHand.value < 7
      ? first
      : last;
  },
};

function formSolutions(tiles) {
  let calculateSolutions = [[0, 1, 2, 3], [0, 2, 1, 3], [0, 3, 1, 2]].reduce((sol, order) => {
    const modSol = sol;
    modSol.push(
      getEntireHand(
        getHand(tiles[order[0]], tiles[order[1]]),
        getHand(tiles[order[2]], tiles[order[3]]),
      ),
    );
    return modSol;
  }, []);

  // console.log('calculateSolutions: \r\n', calculateSolutions);
  calculateSolutions = calculateSolutions.sort((sol1, sol2) => {
    switch (true) {
      case sol1.highHand.value === 12:
        return -1;

      case sol2.highHand.value === 12:
        return 1;

      default: {
        const totVal1 = totalValue(sol1);
        const totVal2 = totalValue(sol2);
        switch (true) {
          case totVal1 > totVal2:
            return -1;

          case totVal1 < totVal2:
            return 1;

          default: {
            const totRank1 = sol1.highHand.rank + sol1.lowHand.rank;
            const totRank2 = sol2.highHand.rank + sol2.lowHand.rank;
            switch (true) {
              case totRank1 > totRank2:
                return -1;

              case totRank1 < totRank2:
                return 1;

              default:
                switch (true) {
                  case sol1.highHand.value < sol2.highHand.value:
                    return -1;

                  case sol1.highHand.value > sol2.highHand.value:
                    return 1;

                  default:
                    switch (true) {
                      case sol1.highHand.rank > sol2.highHand.rank:
                        return -1;

                      case sol1.highHand.rank < sol2.highHand.rank:
                        return 1;

                      default:
                        switch (true) {
                          case sol1.highHand.lowTile.rank > sol2.highHand.lowTile.rank:
                            return -1;

                          case sol1.highHand.lowTile.rank < sol2.highHand.lowTile.rank:
                            return 1;

                          default:
                            return 0;
                        }
                    }
                }
            }
          }
        }
      }
    }
  });
  // console.log('Sorted solutions: \r\n', calculateSolutions);

  if (calculateSolutions[0].highHand.value === 12) {
    calculateSolutions.pop();
    return calculateSolutions;
  }
  const maxVol = totalValue(calculateSolutions[0]);
  return calculateSolutions.filter(sol => totalValue(sol) >= maxVol);
}

function houseWay(tiles) {
  const possibleSolutions = formSolutions(tiles);
  // console.log('possibleSolutions: \r\n', possibleSolutions);

  if (possibleSolutions.length === 1) {
    // console.log('Only one way');
    return possibleSolutions[0];
  }

  const first = possibleSolutions[0];
  switch (true) {
    case first.highHand.value === 12:
      // console.log('Bo');
      if (first.lowHand.value === 12) {
        // console.log('Bo + bo');
        return first;
      }

      switch (first.highHand.highTile.value) {
        case 3:
          return rules.splitGeeJoon(possibleSolutions);

        case 2:
          return rules.splitTeenDay(possibleSolutions);

        case 9:
          return rules.splitNines(possibleSolutions);

        case 8:
          return rules.splitEights(possibleSolutions);

        case 7:
          return rules.splitSevens(possibleSolutions);

        default:
          // console.log('Bo');
          return possibleSolutions[0];
      }

    case first.highHand.highTile.value === 2 || first.lowHand.highTile.value === 2:
      // console.log('Teen or Day');
      switch (true) {
        case tiles.filter(tile => tile.value === 2).length === 2:
          return rules.twoTeensOrDays(possibleSolutions);

        case tiles.some(tile => tile.value >= 7):
          return rules.gongWongNine(possibleSolutions);

        default:
      }
      break;

    default:
  }

  return (
    rules.no88WithTeenOrDay(possibleSolutions)
    || rules.geeJoonAnd45(possibleSolutions)
    || rules.high8and11and10(possibleSolutions)
    || rules.twoSixesGeeJoon11(possibleSolutions)
    || rules.twoFours9and5(possibleSolutions)
    || rules.highThree(possibleSolutions)
  );
}

module.exports.paiGow = {
  getTile,
  getTileByRank,
  getHand,
  compareHands,
  getEntireHand,
  compareEntireHands,
  houseWay,
};
module.exports.PGTile = PGTile;
module.exports.PGHand = PGHand;
module.exports.PGEntireHand = PGEntireHand;
