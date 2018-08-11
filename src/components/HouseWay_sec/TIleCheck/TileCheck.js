import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import Tile from '../../Tile/Tile';
import { PGTile } from '../../../../paigow/paigow';
import './TileCheck.css';
import checkMark from './check-shadow.png';

export default class TileCheck extends PureComponent {
  static propTypes = {
    tile: PropTypes.instanceOf(PGTile).isRequired,
    second: PropTypes.bool,
    isChecked: PropTypes.bool,
    onCheck: PropTypes.func.isRequired,
    onCheckByKey: PropTypes.func.isRequired,
  };

  static defaultProps = {
    second: false,
    isChecked: false,
  };

  render() {
    const {
      tile, isChecked, second, onCheck, onCheckByKey,
    } = this.props;
    return (
      <div
        ref={node => (this.node = node)}
        className={`TileCheck${isChecked ? ' TileCheck--checked' : ''}`}
        onClick={onCheck}
        role="button"
        tabIndex="0"
        onKeyDown={onCheckByKey}
      >
        <Tile tile={tile} second={second} />
        {isChecked ? <img className="TileCheck__check-mark" src={checkMark} alt="checked" /> : null}
      </div>
    );
  }
}
