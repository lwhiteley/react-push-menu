import React from 'react';
import styled from 'styled-components';

import { usePushMenu } from './PushMenuContext';

const BackItem = styled.div`
  padding: 0 10px;

  span svg {
    font-size: 10px;
  }
`;

export interface Props {
  backIcon?: React.ReactNode;
}

export const DefaultBackButton: React.FC<Props> = ({ backIcon }) => {
  const { removeLastMenu } = usePushMenu();
  return (
    <a href="#" onClick={() => removeLastMenu()}>
      <BackItem className={'rpm-back-item'}>{backIcon}</BackItem>
      <BackItem className={'rpm-back-item'}>back</BackItem>
    </a>
  );
};
