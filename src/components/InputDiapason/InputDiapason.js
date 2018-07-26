import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import './InputDiapason.css';
import ArrowDown from '../ArrowDown/ArrowDown';

export default class InputDiapason extends PureComponent {
  static propTypes = {};

  render() {
    return (
      <div>
        <p>
          {'Diapason of first tile:'}
        </p>
        <ArrowDown />
        <input />
      </div>
    );
  }
}
