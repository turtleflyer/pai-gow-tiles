import React from 'react';
import Tile from './components/Tile/Tile';
// import './App.css';


function App() {
  return (
    <div className="App">
      {new Array(21).fill(null).map((_, i) => <Tile n={i} />)}
    </div>
  );
}

export default App;
