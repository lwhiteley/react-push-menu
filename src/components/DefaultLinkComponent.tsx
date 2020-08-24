import React from 'react';
import styled from 'styled-components';

import { usePushMenu } from './PushMenuContext';
import { Callback } from '../types';

const Link = styled.a`
  display: inline-block;
  width: 100%;
  cursor: pointer;
`;

export interface Props {
  data: Record<string, any>;
  onNodeClick?: Callback;
}

export const DefaultLinkComponent: React.FC<Props> = ({ data, onNodeClick = () => undefined }) => {
  const { propMap, ...otherContextProps } = usePushMenu();
  const { node } = data;
  const nodeTitle = node[propMap.displayName];
  return (
    <Link
      onClick={(e) => onNodeClick(e, { ...data, propMap, ...otherContextProps })}
      className={`rpm-node-link rpm-inline-block ${node[propMap.linkClasses] || ''}`}
    >
      {nodeTitle}
    </Link>
  );
};
