# react-push-menu

### Prerequisites

Install peer dependencies

`npm install --save react react-dom react-icons`

### Install

`npm install --save react-push-menu`

### How to use

See [example](example/index.js)

### Properties

**nodes** (Object)

This property accepts an object with the definition for the menu. see the example](/example/index.js) for a sample menu definition

**propMap** (Object)

APIs can define/give a different structure or property names for required fields.
This give the user the option to tell `react-push-menu` which property on the node/menu item to find the value it's looking for.
|Mapping| Description|
|displayName| This is the text that will appear in the menu option. |
|linkClasses| These are class names that will be added to the menu option. |
|expanderClasses| These are class names that will be added to the menu option's expander given it has defined children. |
|url| This tells the library which prop the url for the menu item is located. will default to a hash (`#`) if none is found |

eg.

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

### Notes/Todos
- Add on click handler to enable custom actions onclick
- Pull requests are welcome

### Credits
- This is a wrapper for [tympanus.net](https://tympanus.net/Development/MultiLevelPushMenu) push menu
