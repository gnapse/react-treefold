import React from 'react';
import Treefold from '../src';
import './styles.css';

const UnorderedList = props => (
  <ul className="unordered-list">
    <Treefold {...props}>
      {({
        node,
        isFolder,
        isExpanded,
        getToggleProps,
        hasChildNodes,
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
          {isExpanded && (
            <ul>
              {hasChildNodes ? (
                renderChildNodes()
              ) : (
                <li className="empty">Empty node</li>
              )}
            </ul>
          )}
        </li>
      )}
    </Treefold>
  </ul>
);

export default UnorderedList;
