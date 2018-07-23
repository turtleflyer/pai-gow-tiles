import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import Tile from '../Tile/Tile';
import { PGTile } from '../../../paigow/paigow';
import './TileCheck.css';
import checkMark from './check-shadow.png';

export default class TileCheck extends PureComponent {
  static propTypes = {
    tile: PropTypes.instanceOf(PGTile).isRequired,
    second: PropTypes.bool,
    isChecked: PropTypes.bool,
    onCheck: PropTypes.func.isRequired,
    onCheckByKey: PropTypes.func.isRequired,
    tileN: PropTypes.number.isRequired,
  };

  static defaultProps = {
    second: false,
    isChecked: false,
  };

  render() {
    const {
      tile, isChecked, second, onCheck, onCheckByKey, tileN,
    } = this.props;
    return (
      <div
        className={`TileCheck${isChecked ? ' TileCheck--checked' : ''}`}
        onClick={onCheck}
        role="button"
        tabIndex="0"
        onKeyDown={onCheckByKey}
        tile-n={tileN}
      >
        <Tile tile={tile} second={second} tileN={tileN} />
        {isChecked ? <img className="TileCheck__check-mark" src={checkMark} alt="checked" /> : null}
      </div>
    );
  }
}
