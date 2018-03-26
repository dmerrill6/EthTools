import React from 'react';
import styled from 'styled-components';
import functionParamsAsString from './functionParamsAsString';

const ReturnsContainer = styled.div`
  margin-top: 5px;
  color: #afafaf;
`

const NoParameterContainer = styled.span`
  color: #afafaf;
`

const FunctionSignature = ({name, inputs, outputs}) => {
  const returns = functionParamsAsString(outputs, {withType: true, withParentheses: false});
  let params = ' 0 parameters';
  let noParams = true;
  if (inputs.length > 0) {
    params = functionParamsAsString(inputs, { withType: true });
    noParams = false;
  }
  return (
    <div>
      <div>
        <b>{name}</b>
        {noParams ? (
          <NoParameterContainer>{params}</NoParameterContainer>
        ) : (
          <span>{params}</span>
        )}
      </div>
      <ReturnsContainer>
        {
          returns !== '' ? (
            <span>Returns: <i>{returns}</i></span>
          ) : (
            <span>Returns <i>void</i></span>
          )
        }
      </ReturnsContainer>
    </div>
  );
}

export default FunctionSignature;