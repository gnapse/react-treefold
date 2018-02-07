import React from 'react';
import Treefold from '../src';
import { event } from './utils';
import './styles.css';

const UnorderedList = props => (
  <ul className="unordered-list">
    <Treefold
      {...props}
      renderNode={({
        node,
        isFolder,
        isExpanded,
        getToggleProps,
        renderChildNodes,
      }) => (
        <li>
          {isFolder ? (
            <a href="#" {...getToggleProps()}>
              {node.name}
            </a>
          ) : (
            node.name
          )}
          {isExpanded && <ul>{renderChildNodes()}</ul>}
        </li>
      )}
      renderEmptyFolder={() => <li className="empty">Empty node</li>}
    />
  </ul>
);

export default UnorderedList;
