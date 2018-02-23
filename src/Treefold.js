import React, { Component } from 'react';
import PropTypes from 'prop-types';
import warning from 'warning';
import Node from './Node';
import ToggleController from './ToggleController';

class Treefold extends Component {
  static propTypes = {
    nodes: PropTypes.arrayOf(PropTypes.object.isRequired).isRequired,
    render: PropTypes.func.isRequired,
    isNodeExpanded: PropTypes.func,
    onToggleExpand: PropTypes.func,
    getNodeId: PropTypes.func,
    getNodeChildren: PropTypes.func,
  };

  static defaultProps = {
    getNodeId: item => item.id,
    getNodeChildren: item => item.children,
  };

  constructor(props) {
    super(props);
    checkProps(props);
  }

  componentDidUpdate() {
    checkProps(this.props);
  }

  internalRender = ({ isOn, onToggle }) => {
    const { nodes, render, getNodeId, getNodeChildren } = this.props;
    return nodes.map(node =>
      React.createElement(Node, {
        key: getNodeId(node),
        node,
        render,
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

function checkProps({ isNodeExpanded, onToggleExpand }) {
  warning(
    typeof isNodeExpanded === typeof onToggleExpand,
    'Treefold: You must pass both isNodeExpanded and onToggleExpand, or none.'
  );
}

export default Treefold;
