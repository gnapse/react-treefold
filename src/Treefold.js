import React, { Component } from 'react';
import PropTypes from 'prop-types';
import warning from 'warning';
import Node from './Node';
import ToggleController from './ToggleController';

class Treefold extends Component {
  static propTypes = {
    nodes: PropTypes.arrayOf(PropTypes.object.isRequired).isRequired,
    render: PropTypes.func,
    children: PropTypes.func,
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
    const { nodes, getNodeId, getNodeChildren } = this.props;
    const render = getRenderProp(this.props);
    return render
      ? nodes.map(node =>
          React.createElement(Node, {
            key: getNodeId(node),
            node,
            render,
            getNodeId,
            getNodeChildren,
            isNodeExpanded: isOn,
            onToggleExpand: onToggle,
          })
        )
      : null;
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

function getRenderProp({ render, children }) {
  return typeof render === 'function'
    ? render
    : typeof children === 'function' ? children : null;
}

function checkProps({ isNodeExpanded, onToggleExpand, render, children }) {
  warning(
    typeof isNodeExpanded === typeof onToggleExpand,
    'Treefold: You must pass both isNodeExpanded and onToggleExpand, or none.'
  );
  warning(
    !(typeof render === 'function' && typeof children === 'function'),
    'You should not use <Treefold render /> and <Treefold>{children}</Treefold> in the same Treefold component; `children` will be ignored'
  );
  warning(
    !(typeof render !== 'function' && typeof children !== 'function'),
    'You should specify one of <Treefold render /> or <Treefold>{children}</Treefold>; your component will render nothing unless you do so'
  );
}

export default Treefold;
