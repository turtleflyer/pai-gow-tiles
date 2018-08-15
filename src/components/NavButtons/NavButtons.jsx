import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import constants from '../../constants';
import './NavButtons.css';

export default class NavButtons extends PureComponent {
  static propTypes = {
    activeSection: PropTypes.oneOf(Object.keys(constants).map(k => constants[k])).isRequired,
    onCheck: PropTypes.func.isRequired,
  };

  render() {
    const { onCheck, activeSection } = this.props;
    return (
      <nav className="NavButtons">
        <button
          type="button"
          className={`NavButtons__menu-button${
            activeSection === constants.HOUSE_WAY_SEC ? ' NavButtons__menu-button--active' : ''
          }`}
          tabIndex="0"
          section={constants.HOUSE_WAY_SEC}
          onClick={onCheck}
        >
          {'House Way'}
        </button>
        <button
          type="button"
          className={`NavButtons__menu-button${
            activeSection === constants.PAI_GOW_LAB_SEC ? ' NavButtons__menu-button--active' : ''
          }`}
          tabIndex="0"
          section={constants.PAI_GOW_LAB_SEC}
          onClick={onCheck}
        >
          {'Pai Gow Lab'}
        </button>
        <button
          type="button"
          className={`NavButtons__menu-button${
            activeSection === constants.GAMEPLAY_SEC ? ' NavButtons__menu-button--active' : ''
          }`}
          tabIndex="0"
          section={constants.GAMEPLAY_SEC}
          onClick={onCheck}
        >
          {'Play Pai Gow'}
        </button>
      </nav>
    );
  }
}
