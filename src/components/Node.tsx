import React from 'react';
import styled from 'styled-components';

import { usePushMenu } from './PushMenuContext';
import { DefaultLinkComponent } from './DefaultLinkComponent';
import { Expander } from './Expander';

const Wrapper = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 0.7em 0;
  font-size: 1.4em;
`;

export interface Props {
  node: Record<string, any>;
  linkComponent?: Function;
  expanderComponent: Function;
  onNodeClick?: Function;
  onMenuExpand?: Function;
}

export const Node: React.FC<Props> = ({
  node: suppliedNode,
  linkComponent: LinkComponent = DefaultLinkComponent,
  expanderComponent,
  onNodeClick,
  onMenuExpand,
}) => {
  const menuContext = usePushMenu();

  const self = {
    renderNode: function renderNode(node: Record<string, any>) {
      const hasChildren = node.children && node.children.length > 0;

      return (
        <Wrapper className={`rpm-node-cntr`}>
          <LinkComponent onNodeClick={onNodeClick} data={{ node, ...menuContext }} />
          {hasChildren && (
            <Expander
              data={{ node, ...menuContext }}
              expanderComponent={expanderComponent}
              onMenuExpand={onMenuExpand}
            />
          )}
        </Wrapper>
      );
    },
  };

  return self.renderNode(suppliedNode);
};
