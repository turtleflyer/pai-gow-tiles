import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import './ChooseDiapasons.css';
import InputDiapason from './InputDiapason/InputDiapason';

export default class ChooseDiapasons extends PureComponent {
  static propTypes = {};

  render() {
    return (
      <div>
        <p>
          {'Diapason of first tile:'}
        </p>
        <InputDiapason />
        <p>
          {'Diapason of second tile:'}
        </p>
        <InputDiapason />
        <p>
          {'Diapason of third tile:'}
        </p>
        <InputDiapason />
        <p>
          {'Diapason of fourth tile:'}
        </p>
        <InputDiapason />
      </div>
    );
  }
}
