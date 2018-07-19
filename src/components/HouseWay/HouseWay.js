import React, { Component } from 'react';
import PropTypes from 'prop-types';
import TilesRow from '../TilesRow/TilesRow';
import { PGTile, paiGow } from '../../../paigow/paigow';
import EntireHand from '../EntireHand/EntireHand';

const { getTile, houseWay } = paiGow;

export default class HouseWay extends Component {
  static propTypes = {};

  constructor(props) {
    super(props);

    this.state = {
      setOfTiles: Array(32)
        .fill(null)
        .map((_, i) => ({ tile: getTile(Math.floor(i / 2)), isChecked: false })),
      tilesToSet: [],
    };
  }

  onCheck = (e) => {
    // console.log(e.target.id);
    // console.log(e.target);
    const tileN = e.target.id.match(/#(\d+)/)[1];
    // console.log('tileN: ', tileN);
    this.setState((prevState) => {
      // console.log('prevState: ', prevState);
      const { setOfTiles, tilesToSet } = prevState;
      // console.log('tilesToSet: ', tilesToSet);
      let newTilesToSet = tilesToSet;
      const entry = setOfTiles[tileN];
      if (!entry.isChecked && tilesToSet.length === 4) {
        // console.log('Nothing more to check');
      } else {
        if (entry.isChecked) {
          newTilesToSet = newTilesToSet.filter(tile => tile.n !== tileN);
        } else {
          newTilesToSet.push({ n: tileN, tile: entry.tile, second: tileN % 2 === 1 });
        }
        entry.isChecked = !entry.isChecked;
      }
      return { setOfTiles, tilesToSet: newTilesToSet };
    });
  };

  render() {
    const { setOfTiles, tilesToSet } = this.state;
    // console.log('setOfTiles: ', setOfTiles);
    // console.log('this.state: ', this.state);
    return (
      <div>
        <div>
          <TilesRow setOfTiles={setOfTiles} onCheck={this.onCheck} />
        </div>
        {tilesToSet.length === 4 ? (
          <div>
            <EntireHand
              tilesToSet={tilesToSet}
              entireHand={houseWay(tilesToSet.map(({ tile }) => tile))}
              size="6rem"
            />
          </div>
        ) : null}
      </div>
    );
  }
}
