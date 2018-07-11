import React from 'react';
import Tile from './components/Tile/Tile';
// import './App.css';

const {
  paiGow: { getTile },
} = require('../paigow/paigow');

function App() {
  return (
    <div className="App">
      <div>
        {new Array(8).fill(null).reduce((tiles, _, i) => {
          tiles.push(<Tile tile={getTile(i)} second={false} key={(i * 2).toString()} />);
          tiles.push(<Tile tile={getTile(i)} second key={(i * 2 + 1).toString()} />);
          return tiles;
        }, [])}
      </div>
      <div>
        {new Array(8).fill(null).reduce((tiles, _, i) => {
          const shift = i + 8;
          tiles.push(<Tile tile={getTile(shift)} second={false} key={(shift * 2).toString()} />);
          tiles.push(<Tile tile={getTile(shift)} second key={(shift * 2 + 1).toString()} />);
          return tiles;
        }, [])}
      </div>
    </div>
  );
}

export default App;
