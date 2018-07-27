/* eslint-env browser */
import React, { PureComponent } from 'react';
import TilesRow from '../TilesRow/TilesRow';
import { paiGow } from '../../../paigow/paigow';
import EntireHand from '../EntireHand/EntireHand';
import './HouseWay.css';

const { getTile, houseWay } = paiGow;

export default class HouseWay extends PureComponent {
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

  checkTile = (e) => {
    const tileN = Number(e.target.getAttribute('tile-n'));
    this.setState((prevState) => {
      const { setOfTiles, tilesToSet } = prevState;
      let renewedTilesToSet;
      let renewedSetOfTiles;
      const entry = setOfTiles[tileN];
      if (entry.isChecked || tilesToSet.length < 4) {
        renewedSetOfTiles = [...setOfTiles];
        if (entry.isChecked) {
          renewedTilesToSet = tilesToSet.filter(tile => tile.n !== tileN);
        } else {
          renewedTilesToSet = [...tilesToSet];
          renewedTilesToSet.push({ n: tileN, tile: entry.tile, second: tileN % 2 === 1 });
        }
        renewedSetOfTiles[tileN].isChecked = !renewedSetOfTiles[tileN].isChecked;
      } else {
        renewedTilesToSet = tilesToSet;
        renewedSetOfTiles = setOfTiles;
      }
      return Object.assign({}, prevState, {
        setOfTiles: renewedSetOfTiles,
        tilesToSet: renewedTilesToSet,
      });
    });
  };

  checkTileByKey = (e) => {
    const currTabIndex = Number(e.target.getAttribute('tile-n'));
    switch (e.key) {
      case ' ':
        this.checkTile(e);
        break;

      case 'ArrowRight':
        if (currTabIndex <= 30) {
          document.querySelector(`[tile-n="${currTabIndex + 1}"]`).focus();
        }
        break;

      case 'ArrowLeft':
        if (currTabIndex >= 1) {
          document.querySelector(`[tile-n="${currTabIndex - 1}"]`).focus();
        }
        break;

      default:
        break;
    }
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
