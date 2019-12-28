import React from 'react';
import styled from 'styled-components';
import { FaBars } from 'react-icons/fa';

import { usePushMenu } from './reactComponentLib';

const StyledDiv = styled.div`
  padding: 10px;
  background-color: blue;
  color: white;
`;

function Content() {
  const { toggleMenu, closeMenu } = usePushMenu();

  return (
    <div>
      <div role="presentation" onClick={() => toggleMenu()}>
        <FaBars />
      </div>
      <div role="presentation" onClick={() => closeMenu()}>
        <StyledDiv>Touch me also to close the menu</StyledDiv>
      </div>
    </div>
  );
}

export default Content;
