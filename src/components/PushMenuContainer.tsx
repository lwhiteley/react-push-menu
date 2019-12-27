import React from 'react';
import clsx from 'clsx';
import styled from 'styled-components';

import { PushMenuProvider } from './PushMenuContext';
import { PushMenu } from './PushMenu';
import { PropMap } from '../types';

const Wrapper = styled.div`
  height: 100%;
  min-height: 640px;
  min-height: 100vh;
  position: relative;
  overflow: hidden;
  /*background: #34495e;*/
`;

export interface Props {
  className?: string;
  type?: string;
  nodes: Record<string, any>;
  propMap?: Partial<PropMap>;
  children: React.ReactNode;
  backIcon: React.ReactNode;
  linkComponent?: Function;
  expanderComponent: Function;
  backComponent?: Function;
  onNodeClick?: Function;
}

export const PushMenuContainer: React.FC<Props> = ({
  nodes,
  propMap,
  children,
  linkComponent,
  expanderComponent,
  backComponent,
  backIcon,
  className,
  type = 'cover',
  onNodeClick = () => {},
}) => {
  return (
    <PushMenuProvider propMap={propMap} nodes={nodes} type={type}>
      <Wrapper className={clsx('rpm-container', className)} id="rpm-container">
        <PushMenu
          linkComponent={linkComponent}
          expanderComponent={expanderComponent}
          backComponent={backComponent}
          backIcon={backIcon}
          onNodeClick={onNodeClick}
        >
          {children}
        </PushMenu>
      </Wrapper>
    </PushMenuProvider>
  );
};