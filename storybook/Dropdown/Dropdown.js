import React, { Fragment } from 'react';
import './style.css';
import Downshift from 'downshift';
import { getStyle, getIcon } from '../utils';
import Treefold from '../../src';

const placeholder = 'Hint: type "san"';
const itemToString = node => (node ? node.name : '');

function getCounter() {
  let counter = 0;
  return () => counter++;
}

const Dropdown = ({
  nodes,
  inputValue,
  isNodeExpanded,
  onToggleExpand,
  onChange,
  onInputValueChange,
}) => {
  return (
    <Downshift
      itemToString={itemToString}
      inputValue={inputValue}
      onChange={onChange}
      onInputValueChange={onInputValueChange}
      render={({
        isOpen,
        highlightedIndex,
        getLabelProps,
        getInputProps,
        getButtonProps,
        getItemProps,
      }) => {
        const getIndex = getCounter();
        return (
          <div className="dropdown-form">
            <label {...getLabelProps()}>Location</label>
            <input autoFocus {...getInputProps({ placeholder })} />
            <button {...getButtonProps()}>open</button>
            <div
              className="dropdown"
              style={{ display: isOpen ? undefined : 'none' }}
            >
              <Treefold
                nodes={nodes}
                isNodeExpanded={isNodeExpanded}
                onToggleExpand={onToggleExpand}
                render={({
                  node,
                  level,
                  isFolder,
                  isExpanded,
                  getToggleProps,
                  hasChildNodes,
                  renderChildNodes,
                }) => {
                  const index = getIndex();
                  const className =
                    index === highlightedIndex ? 'highlighted item' : 'item';
                  return (
                    <Fragment>
                      <div
                        className={className}
                        style={getStyle(level + (isFolder ? 0 : 1))}
                        {...getItemProps({ item: node })}
                      >
                        {isFolder && (
                          <span {...getToggleProps()}>
                            <i
                              className={getIcon(isExpanded)}
                              aria-hidden="true"
                            />
                          </span>
                        )}
                        {node.name}
                      </div>
                      {isExpanded &&
                        (hasChildNodes ? (
                          renderChildNodes()
                        ) : (
                          <div className="empty" style={getStyle(level + 2)}>
                            This folder is empty
                          </div>
                        ))}
                    </Fragment>
                  );
                }}
              />
            </div>
          </div>
        );
      }}
    />
  );
};

export default Dropdown;
