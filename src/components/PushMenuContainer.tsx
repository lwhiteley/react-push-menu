import React from 'react';
import clsx from 'clsx';
import styled from 'styled-components';

import { PushMenuProvider } from './PushMenuContext';
import { PushMenu } from './PushMenu';
import { PropMap, Callback } from '../types';

const Wrapper = styled.div`
  height: 100%;
  min-height: 640px;
  min-height: 100vh;
  position: relative;
  overflow: hidden;
`;

export interface Props {
  className?: string;
  nodes: Record<string, any>;
  propMap?: Partial<PropMap>;
  children: React.ReactNode;
  backIcon: React.ReactNode;
  linkComponent?: React.FC;
  expanderComponent: React.FC;
  backComponent?: React.FC;
  onNodeClick?: Callback;
  onMenuExpand?: Callback;
  openOnMount?: boolean;
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
  onNodeClick = () => undefined,
  onMenuExpand = () => undefined,
  openOnMount = false,
}) => {
  return (
    <PushMenuProvider propMap={propMap} nodes={nodes}>
      <Wrapper className={clsx('rpm-container', className)} id="rpm-container">
        <PushMenu
          linkComponent={linkComponent}
          expanderComponent={expanderComponent}
          backComponent={backComponent}
          backIcon={backIcon}
          onNodeClick={onNodeClick}
          onMenuExpand={onMenuExpand}
          openOnMount={openOnMount}
        >
          {children}
        </PushMenu>
      </Wrapper>
    </PushMenuProvider>
  );
};
