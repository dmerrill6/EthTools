import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import {functionParamsAsString} from './utils';

const ReturnsContainer = styled.div`
  margin-top: 5px;
  color: #afafaf;
`

const NoParameterContainer = styled.span`
  color: #afafaf;
`

const FunctionSignature = ({name, inputs, outputs, isFunction}) => {
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
        {isFunction === false && (
          <span>{returns}</span>
        )}
        <b>{name}</b>
        {noParams && isFunction ? (
          <NoParameterContainer>{params}</NoParameterContainer>
        ) : (
          <span>{params}</span>
        )}
      </div>
      <ReturnsContainer>
        {
          isFunction && returns !== '' && (
            <span>
              Returns: <i>{returns}</i>
            </span>
          )
        }
        { isFunction && returns === '' && (
          <span>Returns <i>void</i></span>
        )}
      </ReturnsContainer>
    </div>
  );
}

FunctionSignature.propTypes = {
  inputs: PropTypes.array,
  isFunction: PropTypes.bool,
  name: PropTypes.string,
  outputs: PropTypes.array
}

FunctionSignature.defaultPropTypes = {
  inputs: [],
  isFunction: () => {},
  name: '',
  outputs: []
}

export default FunctionSignature;