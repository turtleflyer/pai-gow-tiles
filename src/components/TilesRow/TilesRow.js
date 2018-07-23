/* eslint-env browser */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { PGTile } from '../../../paigow/paigow';
import TileCheck from '../TIleCheck/TileCheck';
import './TilesRow.css';


export default class TilesRow extends Component {
  static propTypes = {
    setOfTiles: PropTypes.arrayOf(
      PropTypes.shape({
        tile: PropTypes.instanceOf(PGTile).isRequired,
        isChecked: PropTypes.bool.isRequired,
      }),
    ).isRequired,
    onCheck: PropTypes.func.isRequired,
    onCheckByKey: PropTypes.func.isRequired,
  };

  componentDidMount() {
    document.querySelector('[tile-n="0"]').focus();
  }

  render() {
    const { setOfTiles, onCheck, onCheckByKey } = this.props;
    return (
      <div className="TileRow">
        {setOfTiles.map(({ tile, isChecked }, i) => (
          <TileCheck
            tile={tile}
            second={i % 2 === 1}
            isChecked={isChecked}
            key={`${tile.name}${i % 2 ? '-second' : ''}`}
            tileN={i}
            onCheck={onCheck}
            onCheckByKey={onCheckByKey}
          />
        ))}
      </div>
    );
  }
}
