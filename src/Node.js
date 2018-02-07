import React from 'react';
import PropTypes from 'prop-types';

const Node = props => {
  const {
    node,
    level,
    renderNode,
    renderEmptyFolder,
    getNodeId,
    getNodeChildren,
    isNodeExpanded,
    onToggleExpand,
    ...extraProps
  } = props;
  const childNodes = getNodeChildren(node);
  const isFolder = Array.isArray(childNodes);
  const hasChildNodes = isFolder && childNodes.length > 0;
  const isExpanded = isFolder && isNodeExpanded(node);
  return renderNode({
    ...extraProps,
    node,
    level,
    isFolder,
    isExpanded,
    hasChildNodes,
    getToggleProps: isFolder
      ? (props = {}) => ({
          tabIndex: '0',
          role: 'button',
          ...props,
          onClick(event) {
            event.preventDefault();
            event.stopPropagation();
            onToggleExpand(node);
          },
          onKeyPress(event) {
            if (event.charCode === 32 || event.charCode === 13) {
              event.preventDefault();
              event.stopPropagation();
              onToggleExpand(node);
            }
          },
        })
      : null,
    renderChildNodes: isFolder
      ? () =>
          isExpanded &&
          (hasChildNodes
            ? childNodes.map(childNode => (
                <Node
                  {...props}
                  key={getNodeId(childNode)}
                  node={childNode}
                  level={level + 1}
                />
              ))
            : renderEmptyFolder({ level: level + 1 }))
      : null,
  });
};

Node.propTypes = {
  node: PropTypes.object.isRequired,
  level: PropTypes.number,
  renderNode: PropTypes.func.isRequired,
  renderEmpty: PropTypes.func,
  getNodeId: PropTypes.func.isRequired,
  getNodeChildren: PropTypes.func.isRequired,
  isNodeExpanded: PropTypes.func.isRequired,
  onToggleExpand: PropTypes.func.isRequired,
};

Node.defaultProps = {
  level: 0,
  renderEmptyFolder: () => null,
};

export default Node;
