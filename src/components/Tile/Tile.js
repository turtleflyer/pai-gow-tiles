import React from 'react';
import PropTypes from 'prop-types';

const tilesPaths = [];

function importAll(r) {
  r.keys().forEach(key => tilesPaths.push(r(key)));
}

importAll(require.context('./', false, /\.svg$/));

// const Tile = ({ n }) => (<img src={tilesPaths[n]} alt="tile" />);

class Tile extends React.PureComponent {
  static propTypes = {
    n: PropTypes.number.isRequired,
  };

  render() {
    return <img src={tilesPaths[this.props.n]} alt="tile" />;
  }

}

export default Tile;
