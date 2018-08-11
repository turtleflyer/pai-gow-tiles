import React, { PureComponent } from 'react';
import TilesRow from '../TilesRow/TilesRow';
import { paiGow } from '../../../../paigow/paigow';
import EntireHand from '../../EntireHand/EntireHand';
import './HouseWay.css';

const { getTile, houseWay } = paiGow;

export default class HouseWay extends PureComponent {
  state = {
    setOfTiles: [...Array(32)].map((_, i) => ({
      tile: getTile(Math.floor(i / 2)),
      isChecked: false,
    })),
    tilesToSet: [],
  };

  checkTile = (tileIndex) => {
    const { setOfTiles, tilesToSet } = this.state;
    let renewedTilesToSet;
    let renewedSetOfTiles;
    const entry = setOfTiles[tileIndex];
    if (entry.isChecked || tilesToSet.length < 4) {
      renewedSetOfTiles = [...setOfTiles];
      if (entry.isChecked) {
        renewedTilesToSet = tilesToSet.filter(tile => tile.n !== tileIndex);
      } else {
        renewedTilesToSet = [...tilesToSet];
        renewedTilesToSet.push({ n: tileIndex, tile: entry.tile, second: tileIndex % 2 === 1 });
      }
      renewedSetOfTiles[tileIndex].isChecked = !renewedSetOfTiles[tileIndex].isChecked;
    } else {
      renewedTilesToSet = tilesToSet;
      renewedSetOfTiles = setOfTiles;
    }
    this.setState({
      setOfTiles: renewedSetOfTiles,
      tilesToSet: renewedTilesToSet,
    });
  };

  render() {
    const { setOfTiles, tilesToSet } = this.state;
    return (
      <div className="HouseWay">
        <div>
          <TilesRow
            setOfTiles={setOfTiles}
            onCheck={this.checkTile}
            onCheckByKey={this.checkTileByKey}
            updateTileNodesList={this.updateTileNodesList}
          />
        </div>
        {tilesToSet.length === 4 ? (
          <div>
            <EntireHand
              tilesToSet={tilesToSet}
              entireHand={houseWay(tilesToSet.map(({ tile }) => tile))}
            />
          </div>
        ) : null}
      </div>
    );
  }
}
