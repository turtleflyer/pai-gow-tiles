import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { paiGow } from '../../../paigow/paigow';
import TileCheck from '../TIleCheck/TileCheck';
import './TilesRow.css';

const { getTile } = paiGow;

export default class TilesRow extends PureComponent {
  static propTypes = {};

  render() {
    return (
      <div className="TileRow">
        {new Array(32)
          .fill(null)
          .map((_, i) => <TileCheck tile={getTile(Math.floor(i / 2))} second={i % 2 === 1} />)}
      </div>
    );
  }
}
