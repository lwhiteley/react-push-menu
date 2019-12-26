import React from 'react';
import styled from 'styled-components';

import { usePushMenu } from './PushMenuContext';
import { DefaultLinkComponent } from './DefaultLinkComponent';
import { Expander } from './Expander';
import slug from '../lib/slug';

const Wrapper = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 0.7em 0;
  font-size: 1.4em;
`;

export interface Props {
  index: number;
  node: Record<string, any>;
  linkComponent?: Function;
  expanderComponent: Function;
  onNodeClick?: Function;
}

export const Node: React.FC<Props> = ({
  node: suppliedNode,
  index,
  linkComponent: LinkComponent = DefaultLinkComponent,
  expanderComponent,
  onNodeClick,
}) => {
  const { propMap } = usePushMenu();

  const self = {
    renderNode: function renderNode(node: Record<string, any>) {
      const hasChildren = node.children && node.children.length > 0;
      const nodeTitle = node[propMap.displayName];

      return (
        <Wrapper className={`rpm-node-cntr`} key={`${slug(nodeTitle)}-${index}`}>
          <LinkComponent onNodeClick={onNodeClick} data={{ node, propMap }} />
          {hasChildren && <Expander node={node} expanderComponent={expanderComponent} />}
        </Wrapper>
      );
    },
  };

  return self.renderNode(suppliedNode);
};
