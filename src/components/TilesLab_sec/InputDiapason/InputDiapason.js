import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import './InputDiapason.css';
import Dropdown from '../Dropdown/Dropdown';
import Tile from '../../Tile/Tile';
import { PGTile } from '../../../../paigow/paigow';

export default class InputDiapason extends PureComponent {
  static propTypes = {
    stateOfTiles: PropTypes.arrayOf(
      PropTypes.arrayOf(
        PropTypes.shape({
          tile: PropTypes.instanceOf(PGTile).isRequired,
          isChecked: PropTypes.bool.isRequired,
        }).isRequired,
      ).isRequired,
    ).isRequired,
    tileInSequence: PropTypes.oneOf([0, 1, 2, 3]).isRequired,
    checkTile: PropTypes.func.isRequired,
  };

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
            this.setState({ showDropdown: !showDropdown });
          }}
          onKeyDown={(e) => {
            e.preventDefault();
            this.setState({ showDropdown: !showDropdown });
          }}
          role="button"
          tabIndex="0"
        />
        {showDropdown ? (
          <div className="InputDiapason__dropbox">
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
                    aria-checked={isChecked}
                    aria-labelledby="choose tile"
                  >
                    <Tile tile={tile} tilesIndexAttribute={i} />
                    {' '}
                  </div>
                );
              })}
            </Dropdown>
          </div>
        ) : null}
      </div>
    );
  }
}
