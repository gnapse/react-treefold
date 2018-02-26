import React, { Fragment } from 'react';
import Treefold from '../../src';
import { getStyle } from '../utils';

export const getIcon = (isLoading, isExpanded) =>
  isLoading
    ? 'fa fa-fw fa-pulse fa-spinner'
    : `fa fa-fw fa-${isExpanded ? 'caret-down' : 'caret-right'}`;

const Async = ({ isNodeLoading, ...props }) => (
  <Treefold {...props}>
    {({
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
              <i
                className={getIcon(isNodeLoading(node), isExpanded)}
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
            <div style={getStyle(level + 2)}>This folder is empty</div>
          ))}
      </Fragment>
    )}
  </Treefold>
);

export default Async;
