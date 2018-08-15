/* eslint-env browser */
import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { PGTile } from '../../../../paigow/paigow';
import TileCheck from './TIleCheck/TileCheck';
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
  };

  componentDidMount = () => {
    this.tilesAsNodes[0].focus();
  };

  onCheckByKey = (index, eventObj) => {
    const { onCheck } = this.props;
    switch (eventObj.key) {
      case ' ':
        onCheck(index);
        break;

      case 'ArrowRight':
        if (index < this.tilesAsNodes.length - 1) {
          this.tilesAsNodes[index + 1].focus();
        }
        break;

      case 'ArrowLeft':
        if (index > 0) {
          this.tilesAsNodes[index - 1].focus();
        }
        break;

      default:
        break;
    }
  };

  render() {
    const { setOfTiles, onCheck } = this.props;
    this.tilesAsNodes = [];
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
                  <div
                    key={`depth${5 - d}-i${blocks[5 - d].length}`}
                    className="TileRow__flex-block"
                  >
                    {blocks[6 - d]}
                  </div>,
                );
                // eslint-disable-next-line no-param-reassign
                blocks[6 - d] = [];
              }
            }

            blocks[5].push(
              <TileCheck
                ref={(ref) => {
                  if (ref) {
                    this.tilesAsNodes.push(ref.node);
                  }
                }}
                tile={tile}
                second={i % 2 === 1}
                isChecked={isChecked}
                key={`${tile.name}${i % 2 ? '-second' : ''}`}
                onCheck={() => onCheck(i)}
                onCheckByKey={e => this.onCheckByKey(i, e)}
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
