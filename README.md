# react-push-menu

[![npm version](https://badge.fury.io/js/react-push-menu.svg)](https://badge.fury.io/js/react-push-menu)


## Prerequisites

Install peer dependencies

`npm install --save react react-dom react-icons`

## Install

`npm install --save react-push-menu`

## How to use

```js
import 'react-push-menu/styles/component.css';
import PushMenu from 'react-push-menu';

/* ... */

render(){
  return(
    <PushMenu
      nodes={this.state.menu}
      type={'cover'}
      propMap={{url: 'link'}}>

      <div className="rpm-trigger" id="rpm-trigger">trigger</div>

    </PushMenu>
  );
}
```

### Demo

![demo](https://i.imgur.com/i7Knwu8.gif)

See [example](example/index.js) for more details

## Properties

**nodes** (Object)

This property accepts an object with the definition for the menu. see the [example](/example/index.js) for a sample menu definition

**propMap** (Object)

APIs can define/give a different structure or property names for required fields.
This give the user the option to tell `react-push-menu` which property on the node/menu item to find the value it's looking for.

|Mapping| Description|
|---|:---|
| **displayName** | This is the text that will appear in the menu option. |
| **linkClasses** | These are class names that will be added to the menu option. |
| **expanderClasses** | These are class names that will be added to the menu option's expander given it has defined children. |
| **url** | This tells the library which prop the url for the menu item is located. will default to a hash (`#`) if none is found |

**eg.**

```js
 <PushMenu propMap={{
   displayName: 'title',
   linkClasses: 'classes',
   expanderClasses: 'expClasses',
   url: 'url'}} >
 </PushMenu>
```

**type** (string)

This defines the behaviour of the push menu and how it stacks submenus on top of each other.
It can be one of the following values:
- `cover`
- `overlap`

**menuTrigger** (string)

This is the id of the element that will be used to toggle the push menu.
default: `rpm-trigger`

**isOpen** (boolean)

This option allows you to initialize the push menu as open on load.

Default: `false`

**onNodeClick** (function)

This is an onClick callback fired when you click the link of a menu item.
Please note it won't be fired when you click the expand component for a menu item.

**eg.**

```js
 <PushMenu
  onNodeClick={(e, data) => {
    console.log(data); // => {menu, node, propMap, rootNode}

    // following line will close the menu completely
    data.menu.tools.reset();
  }} >

 </PushMenu>
```

**linkComponent** (React.Component)

You can fully customize the link of the menu by passing in a React Component to this property.
It will be instantiated with the data object also passed in `onNodeClick` as a property (`this.props.data`).
To see an example please see [example/LinkComponent.js](example/LinkComponent.js)

**backComponent** (React.Component)

You can fully customize the back link of the sub menus by passing in a React Component to this property.
It will be instantiated with the data object also passed in `onNodeClick` as a property (`this.props.data`).

**expanderComponent** (React.Component)

You can fully customize the expander link of the sub menus by passing in a React Component to this property. The expander is the `chevron-right` that appears when a menu item has children.
It will be instantiated with the data object also passed in `onNodeClick` as a property (`this.props.data`).



## Notes/Todos
- add task to deploy to gh-pages
- allow override of node element and back button element
- add more event handlers


#### Pull requests are welcome

## Credits
- This is a wrapper for [tympanus.net](https://tympanus.net/Development/MultiLevelPushMenu) push menu
