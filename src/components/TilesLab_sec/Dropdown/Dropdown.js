import React, {
  PureComponent, Children, cloneElement, createRef,
} from 'react';
import PropTypes from 'prop-types';
import './Dropdown.css';
import { Scrollbars } from 'react-custom-scrollbars';

export default class Dropdown extends PureComponent {
  static propTypes = {};

  childNodes = [];

  componentDidMount = () => {
    const { children } = this.props;
    Children.forEach(children, (child) => {
      this.childNodes.push(child.ref.current);
    });
    this.childNodes[0].focus();
  };

  checkTileByKey = (index, eventObj) => {
    const { checkTile } = this.props;
    switch (eventObj.key) {
      case ' ':
        eventObj.preventDefault();
        checkTile(0, index);
        break;

      case 'ArrowDown':
        if (index < this.clonedChildren.length - 1) {
          this.clonedChildren[index + 1].ref.current.focus();
        }
        break;

      case 'ArrowUp':
        if (index > 0) {
          this.clonedChildren[index - 1].ref.current.focus();
        }
        break;

      default:
        break;
    }
  };

  render() {
    const { children, checkTile } = this.props;
    this.clonedChildren = Children.map(children, (child, i) => cloneElement(child, {
      onClick: () => checkTile(0, i),
      onKeyDown: e => this.checkTileByKey(i, e),
    }));

    return (
      <Scrollbars
        autoHide
        autoHideTimeout={1000}
        autoHideDuration={200}
        className="Dropdown"
        renderThumbVertical={props => (
          <div {...props} className="Dropdown__vertical-scroll-track" />
        )}
      >
        {this.clonedChildren}
      </Scrollbars>
    );
  }
}
