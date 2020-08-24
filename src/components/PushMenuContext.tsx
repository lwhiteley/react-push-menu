import React from 'react';

import { PropMap, Node, VisibleMenus } from '../types';
import { getNodeChildren } from '../lib/helpers';

const defaultPropMaps: PropMap = {
  displayName: 'name',
  linkClasses: 'classes',
  childPropName: 'children',
  expanderClasses: 'expClasses',
  url: 'url',
  id: 'id',
};

export interface MenuContextData {
  // state
  nodes: Record<string, any>;
  propMap: PropMap;
  visibleMenus: VisibleMenus;

  // actions
  addMenu: (node: Record<string, any>) => void;
  removeLastMenu: () => void;
  closeMenu: (node: Record<string, any>) => void;
  openMenu: () => void;
  openSubMenu: (node: Record<string, any>) => void;
  toggleMenu: (node: Record<string, any>) => void;
}

export interface Props {
  children: React.ReactNode;
  nodes: Record<string, any>;
  propMap: Partial<PropMap> | undefined;
}

const Context = React.createContext<MenuContextData>({
  nodes: {},
  propMap: defaultPropMaps,
  visibleMenus: [],
  addMenu: () => undefined,
  removeLastMenu: () => undefined,
  closeMenu: () => undefined,
  openMenu: () => undefined,
  openSubMenu: () => undefined,
  toggleMenu: () => undefined,
});
const { Provider } = Context;

const PushMenuProvider: React.FC<Props> = ({ children, propMap: suppliedPropMap, nodes }) => {
  const [visibleMenus, setVisibleMenus] = React.useState<VisibleMenus>([]);
  const propMap = Object.assign({}, defaultPropMaps, suppliedPropMap);

  const addMenu = (menu: Node) => {
    setVisibleMenus((prevMenus: VisibleMenus) => {
      return [...prevMenus, menu];
    });
  };

  const removeLastMenu = () => {
    setVisibleMenus((prevMenus: VisibleMenus) => {
      const clonedMenus = Array.from(prevMenus);
      clonedMenus.pop();
      return clonedMenus;
    });
  };

  const closeMenu = () => {
    setVisibleMenus([]);
  };

  const openSubMenu = (node: Node) => {
    const nodeChildren = getNodeChildren(node, propMap);
    if (nodeChildren.length < 1) {
      return null;
    }
    addMenu(node);
  };

  const openMenu = () => {
    const nodeChildren = getNodeChildren(nodes, propMap);
    if (visibleMenus.length > 0 || nodeChildren.length < 1) {
      return null;
    }
    setVisibleMenus([nodes]);
  };

  const toggleMenu = () => {
    if (visibleMenus.length > 0) setVisibleMenus([]);
    if (visibleMenus.length < 1) openMenu();
  };

  const commonProps = {
    propMap,
    nodes,
    visibleMenus,
    addMenu,
    removeLastMenu,
    closeMenu,
    openMenu,
    openSubMenu,
    toggleMenu,
  };

  return <Provider value={commonProps}>{children}</Provider>;
};

export const usePushMenu = () => React.useContext<MenuContextData>(Context);
export { PushMenuProvider, Context as PushMenuContext };
