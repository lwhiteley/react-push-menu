export interface PropMap {
  displayName: string;
  linkClasses: string;
  childPropName: string;
  expanderClasses: string;
  url: string;
  id: string;
}

export type Node = Record<string, any>;
export type VisibleMenus = Array<Node>;
