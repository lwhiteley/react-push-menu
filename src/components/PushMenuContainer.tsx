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
`;

export interface Props {
  className?: string;
  nodes: Record<string, any>;
  propMap?: Partial<PropMap>;
  children: React.ReactNode;
  backIcon: React.ReactNode;
  linkComponent?: Function;
  expanderComponent: Function;
  backComponent?: Function;
  onNodeClick?: Function;
  onMenuExpand?: Function;
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
  onNodeClick = () => {},
  onMenuExpand = () => {},
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
