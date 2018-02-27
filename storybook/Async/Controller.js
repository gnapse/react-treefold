import { Component } from 'react';

const NODE_UNLOADED = undefined;
const NODE_LOADING = 'loading';
const NODE_COLLAPSED = 'collapsed';
const NODE_EXPANDED = 'expanded';

const ASYNC_DELAY = 1000;

export default class AsyncController extends Component {
  static defaultProps = {
    getId: node => node.name,
  };

  state = { nodeStatus: {} };

  componentWillMount() {
    this.cancelCallback();
  }

  cancelCallback() {
    if (this.asyncCallback) {
      clearTimeout(this.asyncCallback);
      this.asyncCallback = undefined;
    }
  }

  reset = () => {
    this.cancelCallback();
    this.setState({ nodeStatus: {} });
  };

  setNodeStatus = (id, status) => {
    this.setState(({ nodeStatus }) => ({
      nodeStatus: { ...nodeStatus, [id]: status },
    }));
  };

  onToggleExpand = node => {
    const id = this.props.getId(node);
    const nodeStatus = this.state.nodeStatus[id];
    switch (nodeStatus) {
      case NODE_UNLOADED:
        this.asyncCallback = setTimeout(() => {
          this.asyncCallback = undefined;
          this.setNodeStatus(id, NODE_EXPANDED);
        }, ASYNC_DELAY);
        this.setNodeStatus(id, NODE_LOADING);
        return;
      case NODE_LOADING:
        return;
      case NODE_COLLAPSED:
        this.setNodeStatus(id, NODE_EXPANDED);
        return;
      case NODE_EXPANDED:
        this.setNodeStatus(id, NODE_COLLAPSED);
        return;
      default:
        throw new Error(`Invalid node status '${nodeStatus}'`);
    }
  };

  isNodeExpanded = node => {
    const id = this.props.getId(node);
    return this.state.nodeStatus[id] === NODE_EXPANDED;
  };

  isNodeLoading = node => {
    const id = this.props.getId(node);
    return this.state.nodeStatus[id] === NODE_LOADING;
  };

  render() {
    const { children, ...props } = this.props;
    const { reset, isNodeLoading, isNodeExpanded, onToggleExpand } = this;
    return children({
      reset,
      isNodeLoading,
      isNodeExpanded,
      onToggleExpand,
      ...props,
    });
  }
}
