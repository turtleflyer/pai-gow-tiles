import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import './TilesLab.css';
import ChooseDiapasons from '../ChooseDiapasons/ChooseDiapasons';
import MultiHands from '../MultiHands/MultiHands';

export default class TilesLab extends PureComponent {
  static propTypes = {};

  render() {
    return (
      <div>
        <ChooseDiapasons />
        <MultiHands />
      </div>
    );
  }
}
