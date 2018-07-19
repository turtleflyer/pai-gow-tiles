import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { paiGow } from '../../../paigow/paigow';
import TileCheck from '../TIleCheck/TileCheck';
import './TilesRow.css';

const { getTile } = paiGow;

export default class TilesRow extends Component {
  // static propTypes = {};

  render() {
    const { setOfTiles, onCheck } = this.props;
    // console.log('setOfTiles: ', setOfTiles);
    return (
      <div className="TileRow">
        {setOfTiles.map(({ tile, isChecked }, i) => (
          <TileCheck
            tile={tile}
            second={i % 2 === 1}
            isChecked={isChecked}
            key={`${tile.name}${i % 2 ? '-second' : ''}`}
            id={`TileInRow#${i}`}
            onCheck={onCheck}
          />
        ))}
      </div>
    );
  }
}
