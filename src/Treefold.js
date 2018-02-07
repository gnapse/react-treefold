import React from 'react';
import PropTypes from 'prop-types';
import Node from './Node';
import ToggleController from './ToggleController';

const Treefold = ({
  nodes,
  isNodeExpanded,
  onToggleExpand,
  getNodeId,
  getNodeChildren,
  renderNode,
  renderEmptyFolder,
}) => {
  const isControlled =
    typeof isNodeExpanded !== 'undefined' &&
    typeof onToggleExpand !== 'undefined';
  const render = toggle =>
    nodes.map(node =>
      React.createElement(Node, {
        key: getNodeId(node),
        node,
        renderNode,
        renderEmptyFolder,
        getNodeId,
        getNodeChildren,
        isNodeExpanded: toggle.isOn,
        onToggleExpand: toggle.onToggle,
      })
    );
  return isControlled ? (
    render({ isOn: isNodeExpanded, onToggle: onToggleExpand })
  ) : (
    <ToggleController getId={getNodeId}>{render}</ToggleController>
  );
};

Treefold.propTypes = {
  nodes: PropTypes.arrayOf(PropTypes.object.isRequired).isRequired,
  isNodeExpanded: PropTypes.func,
  onToggleExpand: PropTypes.func,
  getNodeId: PropTypes.func,
  getNodeChildren: PropTypes.func,
  renderNode: PropTypes.func.isRequired,
  renderEmptyFolder: PropTypes.func,
};

Treefold.defaultProps = {
  getNodeId: item => item.id,
  getNodeChildren: item => item.children,
  renderEmptyFolder: () => null,
};

export default Treefold;
