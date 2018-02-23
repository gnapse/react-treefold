# Treefold

[![styled with prettier](https://img.shields.io/badge/styled_with-prettier-ff69b4.svg)](https://github.com/prettier/prettier)

A renderless tree React component for your hierarchical views.

## The problem

You need to show hierarchical data in different ways. You know how you want to show the information for each individual data item. But you don't want to repeat over and over again the logic about how to traverse the data, how to assemble it all to make it look like a tree, how to expand/collapse nodes, etc.

## This solution

This is a component that abstracts away some of these repetitive details during a tree-rendering process. You just specify how you want to render each individual data item, and `Treefold` takes care of everything else.

The component itself is stateless and controlled by default, so you can control any aspects of it from the outside. The expand/collapse state of each individual node is normally also controlled, but if no props for controlling it are specified, the component auto-manages the state for this on its own.

You can see a live demo [here](http://treefold.netlify.com/).

## Installation

This module is distributed via [npm](https://www.npmjs.com/) which is bundled with [node](https://nodejs.org) and should be installed as one of your project's `dependencies`:

```
npm install --save react-treefold
```

or if you use [yarn](https://yarnpkg.com/):

```
yarn add react-treefold
```

> This package also depends on `react` and `prop-types`. Please make sure you have those installed as well.

## Usage

Use the `Treefold` component by passing to it the hierarchical data (`nodes` prop) and how to render each node in the tree (`render` prop):

```jsx
import React from 'react';
import Treefold from 'react-treefold';

const MyTreeView = ({ nodes }) => (
  <div className="treeview">
    <Treefold
      nodes={nodes}
      render={({
        node,
        level,
        isFolder,
        isExpanded,
        getToggleProps,
        hasChildNodes,
        renderChildNodes,
      }) => (
        <>
          <div className="item" style={{ paddingLeft: `${level * 20}px` }}>
            {isFolder && (
              <span className="toggle-icon" {...getToggleProps()}>
                <i
                  className={isExpanded ? 'caret-down' : 'caret-right'}
                  aria-hidden="true"
                />
              </span>
            )}
            {node.name}
          </div>
          {isExpanded &&
            (hasChildNodes ? (
              renderChildNodes()
            ) : (
              <div
                className="empty"
                style={{ paddingLeft: `${(level + 1) * 20}px` }}
              >
                This folder is empty
              </div>
            ))}
        </>
      )}
    />
  </div>
);
```

The `render` function receives the data for the node it needs to render, in addition to a set of extra props describing several different aspects of how the node needs to be rendered.

## Treefold props

### nodes

> `array<object>` | required

The list of root nodes in the tree. Each node in the list should be an object with a unique `id` attribute (string or numeric), and a `children` array attribute containing the child nodes of that node. If no `children` is specified, the node is assumed to be a leaf.

Note: the names of these node attributes is customizable. See [getNodeId](#getNodeId) and [getNodeChildren](#getNodeChildren).

### render

> `function({/* see below */}): element` | required

A function that renders a single node of the tree.

This is called with an object argument. Read more about the properties of this object in the section "[Rendering a single node](#rendering-a-single-node)".

### isNodeExpanded

> `function(node: object): boolean` | optional

A function that receives a node and returns `true` if that node should be expanded, or `false` otherwise.

It must be provided alongside [onToggleExpand](#onToggleExpand), in order to control the tree from the outside (i.e. to make it behave as a controlled component).

If these two props are not provided, the tree controls its expand/collapse state of nodes on its own (i.e. it behaves as an uncontrolled component).

### onToggleExpand

> `function(node: object)` | optional

A function that receives a node and toggles the state of that node being expanded or collapsed.

It must be provided alongside [isNodeExpanded](#isNodeExpanded), in order to control the tree from the outside. If these two props are not provided, the tree controls its expand/collapse state on its own.

### getNodeId

> `function(node: object): number | string` | optional, defaults to `node => node.id`

A function that receives a node in the tree and returns what to use as a unique id for that node.

### getNodeChildren

> `function(node: object): array?` | optional, defaults to `node => node.children`

A function that receives a node in the tree and returns the array of child nodes of that node, or nothing if the node is a leaf.

Note that there can be non-leaf nodes that have no child nodes. These are the ones with an empty array of child nodes. For a node to really be considered a leaf, the resultof this function must be `null` or `undefined`.

## Rendering a single node

The most important thing you have to tell to `Treefold` besides the actual tree data to render, is how to render it. You do so primarily by providing a prop called `render` which receives all the information necessary about that node, and returns the jsx element that represents it.

```jsx
<Treefold
  nodes={treeData}
  render={props => (
    /* you render the node here */
  )}
/>
```

> You can also pass it as the `children` prop if you prefer to do things that way `<Treefold>{/* right here*/}</Treefold>`

`Treefold` takes care of calling this function as it traverses the tree, and passes to it an object (`props` in the example just above) with the properties documented below:

### node

> `object` | required

The data for the node that is being rendered.

### level

> `number` | required

The level of depth of the node in the tree. Root nodes have level 0. Child nodes of a given node have the level of their parent node plus 1.

### isFolder

> `boolean` | required

Wether the node is a folder (meaning it has or may have child nodes under it) or not.

A node is considered to be a folder if it has a collection of child nodes, even if that collection is empty. See [getNodeChildren](#getNodeChildren) to see how `Treefold` determines what is the collection of child nodes for a given node.

### isExpanded

> `boolean` | required

Wether the node is to be rendered expanded, with its child nodes visible, or not.

This property will always be `false` for leaf nodes. It may be `true` for non-leaf nodes that have an empty list of child nodes.

### hasChildNodes

> `boolean` | required

Wether the node to be rendered has a non-empty list of child nodes or not.

This property will always be `false` for leaf nodes. It may also be `false` for non-leaf nodes that have an empty list of child nodes.

### getToggleProps

> function(props: object): object | required for folder nodes, `null` for leaf nodes

This is a [prop getter](prop-getters) that returns all the props that you need to apply to any expand/collapse toggle elements in your node. These are the elements that are meant to be activated by the user to toggle that folder node expand/collapse state.

By definition this function is provided only to non-leaf nodes, **even if the node has an empty list of child nodes**. For leaf nodes this prop is `null`.

### renderChildNodes

> `function(): element?` | required for folder nodes, `null` for leaf nodes

A function that **you need to call for non-leaf nodes** so that its child nodes are rendered.

#### Why do I need to take care of this?

You might think that this is something that `Treefold` should do itself. But if it did so, it would hinder your freedom in achieving different outcomes.

> TODO: Document this more in depth

## TO-DO

* Ability to load children asynchronously.
* Ability to control child nodes visibility via css instead of removing them from the DOM.
* Ability to animate the expand/collapse action of child nodes.
* Full WAI-ARIA compliance.
* Improve customization to expand the use cases where this can be applied.

Feature requests and suggestions are very welcome. This is a very young project not yet applied to a wide variety of situations, so I know it has a long road of changes and improvements ahead.

## LICENCE

MIT

[prop-getters]: https://blog.kentcdodds.com/how-to-give-rendering-control-to-users-with-prop-getters-549eaef76acf
