import React, { Fragment } from 'react';
import Treefold from '../src/Treefold';
import { getStyle, getIcon } from './utils';
import './styles.css';

const lengthOf = list => (list && list.length > 0 ? list.length : '—');

const Table = props => (
  <table className="table">
    <thead>
      <tr>
        <th>Name</th>
        <th className="align-right">Name length</th>
        <th className="align-right">Number of child locations</th>
      </tr>
    </thead>
    <tbody>
      <Treefold
        {...props}
        renderNode={({
          node,
          level,
          isFolder,
          isExpanded,
          getToggleProps,
          renderChildNodes,
        }) => (
          <Fragment key={node.id}>
            <tr>
              <td style={getStyle(level + (isFolder ? 0 : 1))}>
                {isFolder && (
                  <span className="toggle-icon" {...getToggleProps()}>
                    <i className={getIcon(isExpanded)} aria-hidden="true" />
                  </span>
                )}
                {node.name}
              </td>
              <td className="align-right">{lengthOf(node.name)}</td>
              <td className="align-right">{lengthOf(node.children)}</td>
            </tr>
            {isFolder && renderChildNodes()}
          </Fragment>
        )}
        renderEmptyFolder={({ level }) => (
          <tr className="empty">
            <td colSpan={3} style={getStyle(level + 1)}>
              This folder is empty
            </td>
          </tr>
        )}
      />
    </tbody>
  </table>
);

export default Table;
