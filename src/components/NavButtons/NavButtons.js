/* eslint-env browser */
import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import constants from '../../constants';
import './NavButtons.css';

export default class NavButtons extends PureComponent {
  static propTypes = {
    activeSection: PropTypes.oneOf(Object.keys(constants).map(k => constants[k])).isRequired,
  };

  // componentDidMount() {
  //   const { activeSection } = this.props;

  //   [...document.querySelectorAll('.NavButtons__menu-button')].forEach((button) => {
  //     button.classList.remove('NavButtons__menu-button--active');
  //   });

  //   switch (activeSection) {
  //     case constants.HOUSE_WAY_SEC:
  //       document
  //         .querySelector(`[section=${constants.HOUSE_WAY_SEC}]`)
  //         .classList.add('NavButtons__menu-button--active');
  //       break;

  //     case constants.PAI_GOW_LAG_SEC:
  //       document
  //         .querySelector(`[section=${constants.PAI_GOW_LAG_SEC}]`)
  //         .classList.add('NavButtons__menu-button--active');
  //       break;

  //     case constants.GAMEPLAY_SEC:
  //       document
  //         .querySelector(`[section=${constants.GAMEPLAY_SEC}]`)
  //         .classList.add('NavButtons__menu-button--active');
  //       break;

  //     default:
  //       break;
  //   }
  // }

  render() {
    const { onCheck, activeSection } = this.props;
    return (
      <nav className="NavButtons__navigation">
        <button
          type="button"
          id="NavButtons__menu-button--HW"
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
          id="NavButtons__menu-button--PGL"
          className={`NavButtons__menu-button${
            activeSection === constants.PAI_GOW_LAG_SEC ? ' NavButtons__menu-button--active' : ''
          }`}
          tabIndex="0"
          section={constants.PAI_GOW_LAG_SEC}
          onClick={onCheck}
        >
          {'Pai Gow Lab'}
        </button>
        <button
          type="button"
          id="NavButtons__menu-button--play"
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
