/* eslint-env browser */
import React, { Component } from 'react';
import TilesRow from '../TilesRow/TilesRow';
import { paiGow } from '../../../paigow/paigow';
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
    const tileN = Number(e.target.getAttribute('tile-n'));
    this.setState((prevState) => {
      const { setOfTiles, tilesToSet } = prevState;
      let newTilesToSet = tilesToSet;
      const entry = setOfTiles[tileN];
      if (entry.isChecked || tilesToSet.length < 4) {
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

  onCheckByKey = (e) => {
    const currTabIndex = Number(e.target.getAttribute('tile-n'));
    switch (e.key) {
      case ' ':
        this.onCheck(e);
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
      <div>
        <div>
          <TilesRow
            setOfTiles={setOfTiles}
            onCheck={this.onCheck}
            onCheckByKey={this.onCheckByKey}
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
