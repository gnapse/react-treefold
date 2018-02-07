import { Component } from 'react';
import PropTypes from 'prop-types';

const toggle = (set, id) => {
  const isOn = set[id] || false;
  return { ...set, [id]: !isOn };
};

export default class ToggleController extends Component {
  static propTypes = {
    getId: PropTypes.func,
    children: PropTypes.func.isRequired,
  };

  static defaultProps = {
    getId: item => item.id,
  };

  state = { set: {} };

  onToggle = item => {
    const id = this.props.getId(item);
    this.setState(({ set }) => ({ set: toggle(set, id) }));
  };

  isOn = item => {
    const id = this.props.getId(item);
    return this.state.set[id] === true;
  };

  render() {
    const { children, ...props } = this.props;
    const { onToggle, isOn } = this;
    return children({ onToggle, isOn, ...props });
  }
}
