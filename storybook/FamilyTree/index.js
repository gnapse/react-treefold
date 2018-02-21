import React from 'react';
import Treefold from '../../src';
import './styles.css';
import { familyTree } from './data';

const renderPerson = ({ name, born, died }, gender) => (
  <span className={gender}>
    {name}
    <br />
    {born} - {died}
  </span>
);

const FamilyTree = () => (
  <div className="tree">
    <ul>
      <Treefold
        nodes={familyTree}
        renderNode={({
          node,
          isFolder,
          isExpanded,
          getToggleProps,
          renderChildNodes,
        }) => (
          <li>
            <div
              className={isFolder ? 'non-leaf' : 'leaf'}
              {...(isFolder ? getToggleProps() : {})}
            >
              {node.he && renderPerson(node.he, 'male')}
              {node.he && node.she && <span className="spacer" />}
              {node.she && renderPerson(node.she, 'female')}
            </div>
            {isExpanded && <ul>{renderChildNodes()}</ul>}
          </li>
        )}
      />
    </ul>
  </div>
);

export default FamilyTree;
