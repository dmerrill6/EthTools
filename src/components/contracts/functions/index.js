import React from 'react';
import PropTypes from 'prop-types';
import FunctionForm from './FunctionForm';
import { formInputParamIntoWeb3Param } from './utils';
import { Card, CardHeader, CardText } from 'material-ui/Card';
import Divider from 'material-ui/Divider';
import {List} from 'material-ui/List';

export const generateOnCallHandler = (functionKey, functionInputs, onFunctionCall) => (values) => {
  /**
   * onfunctionCall expects two arguments:
   * 1. The name of the function that was called,
   * 2. and an array of parameters.
   * We must transform the result of the FunctionForm (object of values)
   * to the array of params expected by onFunctionCall.
   */
  const valuesAsArray = functionInputs.map((input, index) => {
    const currValue = values[`input_${index}`];
    return formInputParamIntoWeb3Param(currValue, input.type);
  });
  return onFunctionCall(functionKey, valuesAsArray);
}

const Functions = ({ abi = [], onFunctionCall = () => { }, onFunctionSend = () => { }}) => {
  const constants = abi.filter(elem => elem.constant === true);
  const nonConstants = abi.filter(elem => elem.constant === false);
  return abi.length > 0 && (
    <React.Fragment>
      <Card containerStyle={{ backgroundColor: 'white' }}>
        <CardHeader
          title="Constant functions and public variables"
          subtitle="Can be called without making a transaction. Cannot change contract state."
          actAsExpander={true}
          showExpandableButton={true}
        />
        <CardText expandable={true}>
          <List>
            {
              constants.sort((a, b) => a.name.localeCompare(b.name)).map((elem, index) => (
                <React.Fragment key={`nonConstant-${index}`}>
                  <FunctionForm
                    form={`ConstantFunctionForm_${index}` /* We must use the index as the name may not be unique (function overloading) */}
                    name={elem.name}
                    isConstant
                    inputs={elem.inputs}
                    outputs={elem.outputs}
                    onFunctionCall={generateOnCallHandler(elem.name, elem.inputs, onFunctionCall)}
                  />
                  <Divider inset />
                </React.Fragment>
              ))
            }
          </List>
        </CardText>
      </Card>
      <Card containerStyle={{ backgroundColor: 'white', marginTop: '20px' }}>
        <CardHeader
          title="State changing functions"
          subtitle="A transaction must be executed. It will be handled through MetaMask."
          actAsExpander={true}
          showExpandableButton={true}
        />
        <CardText expandable={true}>
          <List>
            {
              nonConstants.sort((a, b) => a.name.localeCompare(b.name)).map((elem, index) => (
                <React.Fragment key={`nonConstant-${index}`}>
                  <FunctionForm
                    form={`NonConstantFunctionForm_${index}`}
                    name={elem.name}
                    inputs={elem.inputs}
                    outputs={elem.outputs}
                    onFunctionCall={generateOnCallHandler(elem.name, elem.inputs, onFunctionSend)}
                  />
                  <Divider inset />
                </React.Fragment>
              ))
            }
          </List>
        </CardText>
      </Card>
    </React.Fragment>
  )
}

Functions.propTypes = {
  abi: PropTypes.array,
  onFunctionCall: PropTypes.func,
  onFunctionSend: PropTypes.func
};

export default Functions;