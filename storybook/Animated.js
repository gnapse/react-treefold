import React, { Fragment } from 'react';
import { Collapse } from 'react-collapse';
import Treefold from '../src';
import { getStyle, getIcon } from './utils';

const hasNestedFolders = ({ children = [] }) =>
  !!children.find(n => n.children);

const Animated = ({ nodes }) => (
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
        <div style={getStyle(level + (isFolder ? 0 : 1))}>
          {isFolder && (
            <span {...getToggleProps()}>
              <i className={getIcon(isExpanded)} aria-hidden="true" />
            </span>
          )}
          {node.name}
        </div>
        {isFolder && (
          <Collapse
            forceInitialAnimation
            isOpened={isExpanded}
            hasNestedCollapse={hasNestedFolders(node)}
          >
            {hasChildNodes ? (
              renderChildNodes()
            ) : (
              <div style={getStyle(level + 2)}>This folder is empty</div>
            )}
          </Collapse>
        )}
      </Fragment>
    )}
  />
);

export default Animated;
