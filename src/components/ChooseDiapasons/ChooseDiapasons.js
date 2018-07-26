import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import './ChooseDiapasons.css';
import InputDiapason from '../InputDiapason/InputDiapason';

export default class ChooseDiapasons extends PureComponent {
  static propTypes = {};

  render() {
    return (
      <div>
        <InputDiapason />
        <InputDiapason />
        <InputDiapason />
        <InputDiapason />
      </div>
    );
  }
}
