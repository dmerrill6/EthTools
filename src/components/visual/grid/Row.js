import React from 'react';
import styled from 'styled-components';

const StyledRow = styled.div`
  box-sizing: border-box;
  display: flex;
  flex: 0 1 auto;
  flex-direction: row;
  flex-wrap: wrap;
`

const Row = ({style, children}) => (
  <StyledRow style={style}>
    {children}
  </StyledRow>
);

export default Row;