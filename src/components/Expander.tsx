import React from 'react';
import styled from 'styled-components';

import { usePushMenu } from './PushMenuContext';

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
  node: Record<string, any>;
  expanderComponent: Function;
}

export const Expander: React.FC<Props> = ({ node, expanderComponent: ExpanderComponent }) => {
  const { openSubMenu } = usePushMenu();

  return (
    <Wrapper
      className="rpm-node-exp"
      onClick={() => {
        openSubMenu(node);
      }}
    >
      <ExpanderComponent data={{ node }} />
    </Wrapper>
  );
};
