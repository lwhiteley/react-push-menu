import React from 'react';
import styled from 'styled-components';
import { FaBars } from 'react-icons/fa';

import { usePushMenu, MenuContextData } from './reactComponentLib';

const StyledDiv = styled.div`
  padding: 10px;
  background-color: blue;
  color: white;
`;

function App() {
  const { toggleMenu } = usePushMenu() as MenuContextData;

  return (
    <>
      <div
        className="rpm-trigger"
        id="rpm-trigger"
        onClick={() => {
          toggleMenu();
        }}
      >
        <FaBars />
      </div>
      <div>
        <StyledDiv>Example App styled component</StyledDiv>
      </div>
    </>
  );
}

export default App;
