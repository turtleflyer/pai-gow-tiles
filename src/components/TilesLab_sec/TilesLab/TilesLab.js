import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import './TilesLab.css';
import ChooseDiapasons from '../ChooseDiapasons/ChooseDiapasons';
import MultiHands from '../MultiHands/MultiHands';
import Dropdown from '../Dropdown/Dropdown';
import { paiGow } from '../../../../paigow/paigow';
import Tile from '../../Tile/Tile';

const { getTile } = paiGow;

export default class TilesLab extends PureComponent {
  static propTypes = {};

  state = {
    stateOfTiles: [...Array(4)].map(() => [...Array(16)].map((_, i) => ({ tile: getTile(i), isChecked: false }))),
  };

  checkTile = (tileInSequence, index) => {
    const { stateOfTiles } = this.state;
    const renewedStateOfTiles = [...stateOfTiles];
    const currTile = renewedStateOfTiles[tileInSequence][index];
    currTile.isChecked = !currTile.isChecked;
    this.setState({ stateOfTiles: renewedStateOfTiles });
  };

  render() {
    const { stateOfTiles } = this.state;
    const tileInSequence = 0;
    return (
      <Dropdown checkTile={this.checkTile}>
        {stateOfTiles[tileInSequence].map(({ tile, isChecked }, i) => {
          const ref = React.createRef();
          return (
            <div
              ref={ref}
              className={`Dropdown__list_entry${isChecked ? ' Dropdown__list_entry--checked' : ''}`}
              key={tile.name}
              role="checkbox"
              tabIndex="0"
            >
              <Tile tile={tile} tilesIndexAttribute={i} />
              {' '}
            </div>
          );
        })}
      </Dropdown>
    );
  }
}
