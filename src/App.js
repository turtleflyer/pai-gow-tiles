/* eslint-env browser */
import React, { PureComponent } from 'react';
import HouseWay from './components/HouseWay_sec/HouseWay/HouseWay';
import NavButtons from './components/NavButtons/NavButtons';
import constants from './constants';
import TilesLab from './components/TilesLab_sec/TilesLab/TilesLab';
import './App.css';
import { UnderConstruction } from './UnderConstruction';

export default class App extends PureComponent {
  constructor() {
    super();
    this.state = {
      activeSection: constants.HOUSE_WAY_SEC,
    };
  }

  switchSection = (e) => {
    const section = e.target.getAttribute('section');
    this.setState(prevState => Object.assign({}, prevState, {
      activeSection: section,
    }));
  };

  render() {
    const { activeSection } = this.state;
    return (
      <div className="App">
        <NavButtons activeSection={activeSection} onCheck={this.switchSection} />
        {activeSection === constants.HOUSE_WAY_SEC ? <HouseWay /> : null}
        {activeSection === constants.PAI_GOW_LAB_SEC ? <UnderConstruction /> : null}
        {activeSection === constants.GAMEPLAY_SEC ? <UnderConstruction /> : null}
      </div>
    );
  }
}
