import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Node from './Node';
import ToggleController from './ToggleController';

class Treefold extends Component {
  static propTypes = {
    nodes: PropTypes.arrayOf(PropTypes.object.isRequired).isRequired,
    isNodeExpanded: PropTypes.func,
    onToggleExpand: PropTypes.func,
    getNodeId: PropTypes.func,
    getNodeChildren: PropTypes.func,
    renderNode: PropTypes.func.isRequired,
    renderEmptyFolder: PropTypes.func,
  };

  static defaultProps = {
    getNodeId: item => item.id,
    getNodeChildren: item => item.children,
    renderEmptyFolder: () => null,
  };

  internalRender = ({ isOn, onToggle }) => {
    const {
      nodes,
      getNodeId,
      getNodeChildren,
      renderNode,
      renderEmptyFolder,
    } = this.props;
    return nodes.map(node =>
      React.createElement(Node, {
        key: getNodeId(node),
        node,
        renderNode,
        renderEmptyFolder,
        getNodeId,
        getNodeChildren,
        isNodeExpanded: isOn,
        onToggleExpand: onToggle,
      })
    );
  };

  render() {
    const { isNodeExpanded, onToggleExpand, getNodeId } = this.props;
    const isControlled =
      typeof isNodeExpanded === 'function' &&
      typeof onToggleExpand === 'function';
    return isControlled ? (
      this.internalRender({ isOn: isNodeExpanded, onToggle: onToggleExpand })
    ) : (
      <ToggleController getId={getNodeId}>
        {this.internalRender}
      </ToggleController>
    );
  }
}

export default Treefold;
