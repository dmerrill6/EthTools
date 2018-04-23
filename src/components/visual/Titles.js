import styled from 'styled-components';

export const H1 = styled.h1`
  font-weight: normal;
  font-size: 18pt;
  line-height: 36px;
  text-align: ${props => props.center ? 'center' : 'inherit'}
`

export const H2 = styled.h2`
  font-weight: normal;
  font-size: 16pt;
  line-height: 30px;
  text-align: ${props => props.center ? 'center' : 'inherit'}
`

export const H3 = styled.h3`
  font-weight: normal;
  font-size: 15pt;
  line-height: 26px;
  text-align: ${props => props.center ? 'center' : 'inherit'}
`