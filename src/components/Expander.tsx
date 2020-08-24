import React from 'react';
import styled from 'styled-components';

import { usePushMenu } from './PushMenuContext';
import { Callback } from '../types';

const Wrapper = styled.div`
  display: inline-block;
  font-size: 20px;
  cursor: pointer;
  padding: 0.7em 1em 0.7em 1em;
  color: white;

  i {
    top: 8px;
  }

  :hover {
    background: rgba(0, 0, 0, 0.2);
    box-shadow: inset 0 -1px rgba(0, 0, 0, 0);
  }
`;

export interface Props {
  data: Record<string, any>;
  expanderComponent: React.FC<{ data: Record<string, any> }>;
  onMenuExpand?: Callback;
}

export const Expander: React.FC<Props> = ({
  data,
  expanderComponent: ExpanderComponent,
  onMenuExpand = () => undefined,
}) => {
  const { node } = data;
  const { openSubMenu } = usePushMenu();

  return (
    <Wrapper
      className="rpm-node-exp"
      onClick={(e) => {
        const allowDefault: any = onMenuExpand(e, { node, ...data });
        if (typeof allowDefault === 'boolean' && !allowDefault) {
          return false;
        }
        openSubMenu(node);
      }}
    >
      <ExpanderComponent data={data} />
    </Wrapper>
  );
};
