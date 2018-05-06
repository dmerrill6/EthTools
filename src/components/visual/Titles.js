import styled from 'styled-components';

export const H1 = styled.h1`
  font-size: 18pt;
  line-height: 36px;
  text-align: ${props => props.center ? 'center' : 'inherit'};
  font-weight: ${props => props.bold ? 'bold' : 'normal'};
`

export const H2 = styled.h2`
  font-size: 16pt;
  line-height: 30px;
  text-align: ${props => props.center ? 'center' : 'inherit'};
  font-weight: ${props => props.bold ? 'bold' : 'normal'};
`

export const H3 = styled.h3`
  font-size: 14pt;
  line-height: 26px;
  text-align: ${props => props.center ? 'center' : 'inherit'};
  font-weight: ${props => props.bold ? 'bold' : 'normal'};
  width: 100%;
`