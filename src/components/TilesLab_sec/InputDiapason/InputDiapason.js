import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import './InputDiapason.css';
import Dropdown from '../Dropdown/Dropdown';
import Tile from '../../Tile/Tile';

export default class InputDiapason extends PureComponent {
  static propTypes = {};

  state = {
    showDropdown: false,
  };

  render() {
    const { stateOfTiles, tileInSequence, checkTile } = this.props;
    const { showDropdown } = this.state;
    return (
      <div className="InputDiapason">
        <input className="InputDiapason__input-field" />
        <div
          className="InputDiapason__arrow-down"
          onClick={() => {
            console.log('fired');
            console.log(showDropdown);
            this.setState({ showDropdown: !showDropdown });
          }}
        />
        {'djsljsl'}
        {showDropdown ? (
          <Dropdown checkTile={i => checkTile(tileInSequence, i)}>
            {stateOfTiles[tileInSequence].map(({ tile, isChecked }, i) => {
              const ref = React.createRef();
              return (
                <div
                  ref={ref}
                  className={`Dropdown__list_entry${
                    isChecked ? ' Dropdown__list_entry--checked' : ''
                  }`}
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
        ) : null}
      </div>
    );
  }
}
