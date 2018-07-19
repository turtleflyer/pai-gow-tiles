import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import Tile from '../Tile/Tile';
import { PGTile } from '../../../paigow/paigow';
import './TileCheck.css';
import checkMark from './check.svg';

export default class TileCheck extends PureComponent {
  static propTypes = {
    tile: PropTypes.instanceOf(PGTile).isRequired,
    second: PropTypes.bool,
    isChecked: PropTypes.bool,
    // onCheck: PropTypes.func.isRequired,
  };

  static defaultProps = {
    second: false,
    isChecked: false,
  };

  render() {
    const {
      tile, isChecked, second, onCheck, id
    } = this.props;
    return (
      <div className="TileCheck">
        <Tile tile={tile} second={second} id={id} onCheck={onCheck} />
        {isChecked ? (
          <div className="TileCheck TileCheck--check-mark">
            <img src={checkMark} alt="checked" />
          </div>
        ) : null}
      </div>
    );
  }
}
