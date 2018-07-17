import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import Tile from '../Tile/Tile';
import { PGEntireHand } from '../../../paigow/paigow';
import './EntireHand.css';

export default class EntireHand extends PureComponent {
  static propTypes = {
    entireHand: PropTypes.instanceOf(PGEntireHand).isRequired,
    mirrored: PropTypes.bool,
    size: PropTypes.string.isRequired,
  };

  static defaultProps = {
    mirrored: false,
  };

  render() {
    const {
      entireHand: { lowHand, highHand },
      mirrored,
      size,
    } = this.props;
    const tiles = [lowHand.lowTile, lowHand.highTile, highHand.lowTile, highHand.highTile];
    const sizeUnit = size.match(/^\d+([a-z]+)/)[1];
    const sizeValue = Number(size.match(/^(\d+)[a-z]+/)[1]);
    const sizeOfPadding = sizeValue * 0.02;

    function stringifySize(n) {
      return `${n}${sizeUnit}`;
    }

    const sizeModel = {
      outerBoxH: stringifySize(sizeValue),
      outerBoxW: stringifySize(1.72 * sizeValue + sizeOfPadding * 2),
      straightBlockH: stringifySize(sizeValue),
      straightBlockW: stringifySize(0.72 * sizeValue + sizeOfPadding),
      straightBlockOffsetX: stringifySize(mirrored ? sizeValue + sizeOfPadding : 0),
      rotatedBlockH: stringifySize(sizeValue),
      rotatedBlockW: stringifySize(sizeValue),
      rotatedBlockOffsetX: stringifySize(mirrored ? 0 : 0.72 * sizeValue + 2 * sizeOfPadding),
      tileBlockStraightH: stringifySize(sizeValue),
      tileBlockStraightW: stringifySize(0.36 * sizeValue),
      tileBlockRotatedH: stringifySize(sizeValue),
      tileBlockRotatedW: stringifySize(sizeValue),
      tile2OffsetX: stringifySize(0.36 * sizeValue + sizeOfPadding),
      tile3OffsetY: stringifySize(0.14 * sizeValue - sizeOfPadding / 2),
      tile4OffsetY: stringifySize(0.5 * sizeValue + sizeOfPadding / 2),
    };
    return (
      <div
        className="EntireHand"
        style={{
          height: sizeModel.outerBoxH,
          width: sizeModel.outerBoxW,
        }}
      >
        <div
          style={{
            height: sizeModel.straightBlockH,
            width: sizeModel.straightBlockW,
            left: sizeModel.straightBlockOffsetX,
          }}
        >
          <div
            style={{
              height: sizeModel.tileBlockStraightH,
              width: sizeModel.tileBlockStraightW,
            }}
          >
            <Tile tile={tiles[0]} />
          </div>
          <div
            style={{
              height: sizeModel.tileBlockStraightH,
              width: sizeModel.tileBlockStraightW,
              left: sizeModel.tile2OffsetX,
            }}
          >
            <Tile tile={tiles[1]} second={tiles[1] === tiles[0]} shiftX="39px" />
          </div>
        </div>
        <div
          style={{
            height: sizeModel.rotatedBlockH,
            width: sizeModel.rotatedBlockW,
            left: sizeModel.rotatedBlockOffsetX,
          }}
        >
          <div
            className="EntireHand EntireHand--rotated-part"
            style={{
              height: sizeModel.tileBlockRotatedH,
              width: sizeModel.tileBlockRotatedW,
              top: sizeModel.tile3OffsetY,
            }}
          >
            <Tile
              tile={tiles[2]}
              second={tiles[2] === tiles[0] || tiles[2] === tiles[1]}
              rotated
              shiftY="11px"
            />
          </div>
          <div
            className="EntireHand EntireHand--rotated-part"
            style={{
              height: sizeModel.tileBlockRotatedH,
              width: sizeModel.tileBlockRotatedW,
              top: sizeModel.tile4OffsetY,
            }}
          >
            <Tile
              tile={tiles[3]}
              second={tiles[3] === tiles[0] || tiles[3] === tiles[1] || tiles[3] === tiles[2]}
              rotated
              shiftY="50px"
            />
          </div>
        </div>
      </div>
    );
  }
}
