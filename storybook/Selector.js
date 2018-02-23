import React, { Fragment } from 'react';
import Treefold from '../src';
import { getStyle, getIcon } from './utils';

const Selector = ({
  nodes,
  isOn: isNodeSelected,
  onToggle: onToggleSelected,
}) => (
  <div className="selector">
    <Treefold
      nodes={nodes}
      render={({
        node,
        level,
        isFolder,
        isExpanded,
        getToggleProps,
        hasChildNodes,
        renderChildNodes,
      }) => (
        <Fragment>
          <div
            onClick={() => onToggleSelected(node)}
            className={isNodeSelected(node) ? 'selected' : null}
            style={getStyle(level + (isFolder ? 0 : 1))}
            tabIndex="0"
            role="button"
          >
            {isFolder && (
              <span className="toggle-icon" {...getToggleProps()}>
                <i className={getIcon(isExpanded)} aria-hidden="true" />
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
      )}
    />
  </div>
);

export default Selector;
