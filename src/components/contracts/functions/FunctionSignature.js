import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import CircularProgress from 'material-ui/CircularProgress';
import {functionParamsAsString} from './utils';
import colors from '../../../utils/variables/colors';

const ReturnsContainer = styled.div`
  margin-top: 5px;
  color: #afafaf;
`

const NoParameterContainer = styled.span`
  color: #afafaf;
`

const CurrentValue = styled.span`
  color: ${colors.primary2ColorGray};
  margin-left: 1em;
`

const FunctionSignature = ({name, inputs, outputs, isFunction, result, isLoadingResult = false}) => {
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
        { (result || isLoadingResult) && (
          <CurrentValue> Current value:
            {
              isLoadingResult ? (
                <CircularProgress style={{marginLeft: '1em'}} size={20} thickness={3} />
              ) : (
                <span> {result}</span>
              )
            }
          </CurrentValue>
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
  outputs: PropTypes.array,
  result: PropTypes.string,
  isLoadingResult: PropTypes.bool
}

FunctionSignature.defaultPropTypes = {
  inputs: [],
  isFunction: () => {},
  name: '',
  outputs: []
}

export default FunctionSignature;