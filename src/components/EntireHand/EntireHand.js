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
    // mirrored: PropTypes.bool,
  };

  static defaultProps = {
    tilesToSet: null,
    // mirrored: false,
  };

  render() {
    const {
      tilesToSet,
      entireHand: { lowHand, highHand },
      // mirrored,
    } = this.props;
    const tiles = [lowHand.lowTile, lowHand.highTile, highHand.lowTile, highHand.highTile];
    let tilesFaces;
    if (tilesToSet) {
      tilesFaces = new Map(tilesToSet.map(({ tile, second }) => [tile, second]));
    }

    return tilesToSet ? (
      <div className="EntireHand EntireHand--medium-size">
        <div className="EntireHand__straight-part">
          <div className="EntireHand__tile0">
            <Tile tile={tiles[0]} second={tilesFaces.get(tiles[0])} />
          </div>
          <div className="EntireHand__tile1">
            <Tile tile={tiles[1]} second={tilesFaces.get(tiles[1])} />
          </div>
        </div>
        <div className="EntireHand__rotated-part">
          <div className="EntireHand__tile2">
            <Tile tile={tiles[2]} second={tilesFaces.get(tiles[2])} rotated />
          </div>
          <div className="EntireHand__tile3">
            <Tile tile={tiles[3]} second={tilesFaces.get(tiles[3])} rotated />
          </div>
        </div>
      </div>
    ) : (
      <div className="EntireHand EntireHand--medium-size">
        <div className="EntireHand__straight-part">
          <div className="EntireHand__tile0">
            <Tile tile={tiles[0]} />
          </div>
          <div className="EntireHand__tile1">
            <Tile tile={tiles[1]} second={tiles[1] === tiles[0]} />
          </div>
        </div>
        <div className="EntireHand__rotated-part">
          <div className="EntireHand__tile2">
            <Tile tile={tiles[2]} second={tiles[2] === tiles[0] || tiles[2] === tiles[1]} rotated />
          </div>
          <div className="EntireHand__tile3">
            <Tile
              tile={tiles[3]}
              second={tiles[3] === tiles[0] || tiles[3] === tiles[1] || tiles[3] === tiles[2]}
              rotated
            />
          </div>
        </div>
      </div>
    );
  }
}
