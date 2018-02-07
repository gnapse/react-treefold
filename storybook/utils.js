import { Component } from 'react';

export const getStyle = level => ({ paddingLeft: `${level * 20}px` });

export const getIcon = isExpanded =>
  `fa fa-fw fa-${isExpanded ? 'caret-down' : 'caret-right'}`;

export const event = callback => e => {
  e.preventDefault();
  e.stopPropagation();
  callback && callback();
};

export class SingleSelection extends Component {
  state = { selectedId: null };

  isOn = item => this.state.selectedId === item.id;

  onToggle = item => {
    this.setState({ selectedId: item.id });
  };

  render() {
    const { isOn, onToggle } = this;
    return this.props.children({ isOn, onToggle, ...this.props });
  }
}
