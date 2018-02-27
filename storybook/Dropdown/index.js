import React, { Component } from 'react';
import update from 'immutability-helper';
import { filterTree } from './filterTree';
import Dropdown from './Dropdown';

const bool = (val, ifUndefined) => (val !== undefined ? val : ifUndefined);

export default class DropdownController extends Component {
  state = {
    inputValue: '',
    expanded: {
      standard: {},
      filtered: {},
    },
  };

  onInputValueChange = inputValue => {
    this.setState(state =>
      update(state, {
        inputValue: { $set: inputValue },
        expanded: { filtered: { $set: {} } },
      })
    );
  };

  onChange = (selectedItem, stateAndHelpers) => {
    console.log('onChange', selectedItem, stateAndHelpers);
  };

  handlers = {
    standard: this.createHandlers('standard'),
    filtered: this.createHandlers('filtered'),
  };

  createHandlers(key) {
    const defaultExpanded = key === 'filtered';
    return {
      isNodeExpanded: ({ id }) =>
        bool(this.state.expanded[key][id], defaultExpanded),
      onToggleExpand: ({ id }) => {
        this.setState(state =>
          update(state, {
            expanded: {
              [key]: {
                [id]: val => !bool(val, defaultExpanded),
              },
            },
          })
        );
      },
    };
  }

  render() {
    const { inputValue } = this.state;
    const { nodes } = this.props;
    const items = filterTree(nodes, inputValue);
    const isFiltered = items !== nodes;
    const handlers = this.handlers[isFiltered ? 'filtered' : 'standard'];
    return (
      <Dropdown
        nodes={items}
        inputValue={inputValue}
        onChange={this.onChange}
        onInputValueChange={this.onInputValueChange}
        {...handlers}
      />
    );
  }
}
