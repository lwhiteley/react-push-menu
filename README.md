# react-push-menu

> Notice: There are breaking changes.
> Do not upgrade from v1.\* if you do not intend to adjust the interfaces seen below.
> The interface to manage the menu has changed.
> Please see the examples below

[![npm version](https://badge.fury.io/js/react-push-menu.svg)](https://badge.fury.io/js/react-push-menu)

## Prerequisites

Install peer dependencies

`npm install react react-dom styled-components --save`

## Install

`npm install --save react-push-menu`

## How to use

```js
import { PushMenu, usePushMenu } from 'react-push-menu';
import { FaChevronRight, FaChevronLeft } from 'react-icons/fa';

function Content() {
  const { toggleMenu } = usePushMenu();
  return (
    <div
      onClick={() => {
        toggleMenu();
      }}
    >
      trigger
    </div>
  );
}

/* ... */

function App() {
  return (
    <PushMenu
      backIcon={<FaChevronLeft />}
      expanderComponent={FaChevronRight}
      nodes={menuData}
      propMap={{ url: 'link' }}
    >
      <Content />
    </PushMenu>
  );
}
```

See [example](example/src/App.tsx) for more details

## Properties

**nodes** (Object)

This property accepts an object with the definition for the menu. see the [example](example/src/App.tsx) for a sample menu definition

**propMap** (Object)

APIs can define/give a different structure or property names for required fields.
This give the user the option to tell `react-push-menu` which property on the node/menu item to find the value it's looking for.

| Mapping             | Description                                                                                                                                                                                                                |
| ------------------- | :------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **id**              | the id property of the node                                                                                                                                                                                                |
| **displayName**     | This is the text that will appear in the menu option.                                                                                                                                                                      |
| **linkClasses**     | These are class names that will be added to the menu option.                                                                                                                                                               |
| **expanderClasses** | These are class names that will be added to the menu option's expander given it has defined children.                                                                                                                      |
| **url**             | This tells the library which prop the url for the menu item is located. will default to a hash (`#`) if none is found                                                                                                      |
| **childPropName**   | This is the property name that holds the children of each menu item node. We realize that data driven menu may differ and it is important to customize the properties that may hold the required data. default: `children` |

**eg.**

```js
<PushMenu
  propMap={{
    displayName: 'title',
    id: 'id',
    linkClasses: 'classes',
    expanderClasses: 'expClasses',
    childPropName: 'children',
    url: 'url',
  }}
></PushMenu>
```

**onNodeClick** (function)

This is an onClick callback fired when you click the link of a menu item.
Please note it won't be fired when you click the expand component for a menu item.

**eg.**

```js
<PushMenu
  onNodeClick={(e, context) => {
    /**
      {
        // state
        node: Record<string, any>; // the current node
        nodes: Record<string, any>; // full menu tree
        propMap: PropMap;
        visibleMenus: Array;

        // actions
        addMenu: (node) => {};
        removeLastMenu: Function;
        closeMenu: Function;
        openMenu: Function;
        openSubMenu: (node) => {};
        toggleMenu: Function;
      }
     **/
    console.log(context);

    // following line will close the menu completely
    context.closeMenu();
  }}
></PushMenu>
```

**onMenuExpand** (function)

This function triggered when a sub menu is expanded.

```js
<PushMenu
  onMenuExpand={(e, context) => {
    // do something
    // return false to prevent default behaviour
  }}
></PushMenu>
```

**linkComponent** (React.Component)

You can fully customize the link of the menu by passing in a React Component to this property.
It will be instantiated with the data object which contains the current node being interacted with. (`props.data`).
To see an example please see [LinkComponent.js](example/src/LinkComponent.js)

**backComponent** (React.Component)

You can fully customize the back link of the sub menus by passing in a React Component to this property.
It will be instantiated with the data object which contains the current node being interacted with. (`props.data`).

**backIcon** (ReactNode)

If you don't specify a `backComponent`, you can at least need specify an icon to use for the back component

```js
<FaChevronLeft />
```

**expanderComponent** (React.Component) (Required)

You can fully customize the expander link of the sub menus by passing in a React Component to this property. The expander is the `chevron-right` that appears when a menu item has children.
It will be instantiated with the data object which contains the current node being interacted with. (`props.data`).

## Notes/Todos

- add task to deploy to gh-pages
- add more event handlers

#### Pull requests are welcome

## Credits

- This is a wrapper for [tympanus.net](https://tympanus.net/Development/MultiLevelPushMenu) push menu
