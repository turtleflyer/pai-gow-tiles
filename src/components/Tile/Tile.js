import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import './Tile.css';

const {
  PGTile,
  paiGow: { getTile },
} = require('../../../paigow/paigow');

function importAll(r) {
  return r.keys().reduce((imp, key) => {
    imp.push(r(key));
    return imp;
  }, []);
}

const tilesPaths = importAll(require.context('./images', false, /\.svg$/));

const mapOfTiles = new Map(
  [
    ...new Array(2).fill(null).map((_, i) => (i % 2 === 0 ? i / 2 : -1)),
    ...new Array(11).fill(null).map((_, i) => i + 1),
    ...new Array(8).fill(null).map((_, i) => (i % 2 === 0 ? i / 2 + 12 : -1)),
  ].reduce(
    ({ map, last }, p, i) => {
      const added = last;
      if (p < 0) {
        added.second = tilesPaths[i];
        return { map, last: null };
      }
      if (added) {
        added.second = added.prime;
      }
      const toAdd = {};
      toAdd.prime = tilesPaths[i];
      map.push([getTile(p), toAdd]);
      return { map, last: toAdd };
    },
    { map: [], last: null },
  ).map,
);

function getTileImg(tile) {
  return mapOfTiles.get(tile);
}

export default class Tile extends PureComponent {
  static propTypes = {
    tile: PropTypes.instanceOf(PGTile).isRequired,
    second: PropTypes.bool,
    tileN: PropTypes.number,
  };

  static defaultProps = {
    second: false,
    tileN: null,
  };

  render() {
    const { tile, second, tileN } = this.props;
    return (
      <img
        tile-n={tileN}
        className="Tile"
        src={second ? getTileImg(tile).second : getTileImg(tile).prime}
        alt="tile"
      />
    );
  }
}
