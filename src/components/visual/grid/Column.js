import React from 'react';
import styled from 'styled-components';

const COL_AMOUNT = 12;

const calculateWidthPercentage = (span) => {
  return 100/COL_AMOUNT*span;
}

/**
 * Constant sizes (in em)
 */
const XS_MIN = 30;
const SM_MIN = 48;
const MD_MIN = 64;
const LG_MIN = 75;

const StyledColumn = styled.div`
  flex: 0 0 auto;
  justify-content: flex-${props => props.align};
  text-align: ${props => props.align};
  @media only screen {
    max-width: ${props => calculateWidthPercentage(props.xs)}%;
    flex-basis: ${props => calculateWidthPercentage(props.xs)}%;
  }
  @media only screen and (min-width: ${SM_MIN}em) {
    max-width: ${props => calculateWidthPercentage(props.sm)}%;
    flex-basis: ${props => calculateWidthPercentage(props.sm)}%;
  }
  @media only screen and (min-width: ${MD_MIN}em) {
    max-width: ${props => calculateWidthPercentage(props.md)}%;
    flex-basis: ${props => calculateWidthPercentage(props.md)}%;
  }
  @media only screen and (min-width: ${LG_MIN}em) {
    max-width: ${props => calculateWidthPercentage(props.lg)}%;
    flex-basis: ${props => calculateWidthPercentage(props.lg)}%;
  }
`


const Column = (props) => {
  let { xs = COL_AMOUNT, sm = xs, md = sm, lg = md, align = 'start', children } = props;
  return (
    <StyledColumn xs={xs} sm={sm} md={md} lg={lg} align={align}>
      {children}
    </StyledColumn>
  )
}

export default Column;