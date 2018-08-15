import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import Tile from '../Tile/Tile';
import { PGEntireHand, PGTile } from '../../../paigow/paigow';
import './EntireHand.css';

export default class EntireHand extends PureComponent {
  static propTypes = {
    tilesToSet: PropTypes.arrayOf(
      PropTypes.shape({
        n: PropTypes.number.isRequired,
        tile: PropTypes.instanceOf(PGTile).isRequired,
        second: PropTypes.bool.isRequired,
      }),
    ),
    entireHand: PropTypes.instanceOf(PGEntireHand).isRequired,
    mirrored: PropTypes.bool,
  };

  static defaultProps = {
    tilesToSet: null,
    mirrored: false,
  };

  render() {
    const {
      tilesToSet,
      entireHand: { lowHand, highHand },
      mirrored,
    } = this.props;
    const tiles = [lowHand.lowTile, lowHand.highTile, highHand.lowTile, highHand.highTile];
    let tilesFaces;
    if (tilesToSet) {
      tilesFaces = tilesToSet.reduce((resMap, { tile, second }) => {
        if (resMap.has(tile)) {
          resMap.set(tile, { both: true });
        } else {
          resMap.set(tile, { second });
        }
        return resMap;
      }, new Map());
    } else {
      tilesFaces = tiles.reduce((resMap, tile) => {
        if (resMap.has(tile)) {
          resMap.set(tile, { both: true });
        } else {
          resMap.set(tile, { second: false });
        }
        return resMap;
      }, new Map());
    }

    function getFace(i) {
      const faceDescription = tilesFaces.get(tiles[i]);
      if (faceDescription.both) {
        tilesFaces.set(tiles[i], { second: true });
        return false;
      }
      return faceDescription.second;
    }

    return (
      <div className="EntireHand EntireHand--medium-size">
        <div
          className={`EntireHand__straight-part${
            mirrored ? ' EntireHand__straight-part--mirrored' : ''
          }`}
        >
          <div className="EntireHand__tile0">
            <Tile tile={tiles[0]} second={getFace(0)} />
          </div>
          <div className="EntireHand__tile1">
            <Tile tile={tiles[1]} second={getFace(1)} />
          </div>
        </div>
        <div
          className={`EntireHand__rotated-part${
            mirrored ? ' EntireHand__rotated-part--mirrored' : ''
          }`}
        >
          <div className="EntireHand__tile2">
            <Tile tile={tiles[2]} second={getFace(2)} rotated />
          </div>
          <div className="EntireHand__tile3">
            <Tile tile={tiles[3]} second={getFace(3)} rotated />
          </div>
        </div>
      </div>
    );
  }
}
