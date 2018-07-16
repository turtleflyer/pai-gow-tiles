import React from 'react';
import EntireHand from './components/EntireHand/EntireHand';
// import './App.css';

const {
  paiGow: { getTile },
  paiGow: { getHand, getEntireHand, houseWay },
} = require('../paigow/paigow');

function App() {
  return (
    <div className="App">
      <EntireHand
        entireHand={houseWay([getTile(4), getTile(6), getTile(11), getTile(4)])}
        size="100px"
      />
      <EntireHand
        entireHand={houseWay([getTile(8), getTile(13), getTile(0), getTile(13)])}
        size="15rem"
        mirrored
      />
    </div>
  );
}

export default App;
