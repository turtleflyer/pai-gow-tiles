import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import './InputDiapason.css';
import Dropdown from '../Dropdown/Dropdown';

export default class InputDiapason extends PureComponent {
  static propTypes = {};

  render() {
    return (
      <div className="InputDiapason">
        <input className="InputDiapason__input-field" />
        <div className="InputDiapason__arrow-down" />
        <Dropdown />
      </div>
    );
  }
}
