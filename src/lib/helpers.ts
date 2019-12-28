import { Node, PropMap } from '../types';

export const getNodeChildren = (node: Node, propMap: PropMap) => node?.[propMap?.childPropName] || [];
export const getNodeTitle = (node: Node, propMap: PropMap) => node?.[propMap?.displayName];
