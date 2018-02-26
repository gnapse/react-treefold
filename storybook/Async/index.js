import React, { Fragment } from 'react';
import AsyncTree from './AsyncTree';
import Controller from './Controller';
import { getId, getChildren, languages } from './data';

const Async = () => (
  <Controller>
    {({ reset, isNodeLoading, isNodeExpanded, onToggleExpand }) => (
      <Fragment>
        <div className="toolbar">
          <button type="button" onClick={reset}>
            Reset
          </button>
        </div>
        <AsyncTree
          nodes={languages}
          getNodeId={getId}
          getNodeChildren={getChildren}
          isNodeLoading={isNodeLoading}
          isNodeExpanded={isNodeExpanded}
          onToggleExpand={onToggleExpand}
        />
      </Fragment>
    )}
  </Controller>
);

export default Async;
