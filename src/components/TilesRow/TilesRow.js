/* eslint-env browser */
import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { PGTile } from '../../../paigow/paigow';
import TileCheck from '../TIleCheck/TileCheck';
import './TilesRow.css';

export default class TilesRow extends PureComponent {
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
        {
          setOfTiles.reduce((blocks, { tile, isChecked }, i) => {
            function addToBlocks(d) {
              if (d > 1) {
                addToBlocks(d - 1);
              }
              if ((i + 1) % 2 ** d === 0) {
                blocks[5 - d].push(
                  <div key={`depth${5 - d}-i${blocks[5 - d].length - 1}`} className="TileRow__flex-block">
                    {blocks[6 - d]}
                  </div>,
                );
                blocks[6 - d] = [];
              }
            }

            blocks[5].push(
              <TileCheck
                tile={tile}
                second={i % 2 === 1}
                isChecked={isChecked}
                key={`${tile.name}${i % 2 ? '-second' : ''}`}
                tileN={i}
                onCheck={onCheck}
                onCheckByKey={onCheckByKey}
              />,
            );

            addToBlocks(5);
            return blocks;
          }, [...new Array(6)].map(() => []))[0]
        }
      </div>
    );
  }
}
