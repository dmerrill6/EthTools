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
   * 2. and an array of parameters (each with the shape {value, type}).
   * We must transform the result of the FunctionForm (object of values)
   * to the array of params expected by onFunctionCall.
   */
  const functionParams = functionInputs.map((input, index) => {
    const currValue = values[`input_${index}`];
    const web3Value = formInputParamIntoWeb3Param(currValue, input.type);
    return {type: input.type, value: web3Value};
  });
  return onFunctionCall(functionKey, functionParams, values.send_amount || 0);
}

class Functions extends React.Component {
  constructor(props) {
    super(props);
    this.handleConstantLoad = this.handleConstantLoad.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    const {abi = []} = this.props;
    const { onConstantLoad = () => { } } = nextProps;
    const nextAbi = nextProps.abi || [];
    if (nextAbi.length === abi.length) return;
    this.handleConstantLoad(nextAbi, onConstantLoad);
  }

  componentDidMount() {
    const { abi = [], onConstantLoad = () => {} } = this.props;
    if (abi.length === 0) return;
    this.handleConstantLoad(abi, onConstantLoad);
  }

  handleConstantLoad(abi, onConstantLoad) {
    // Call constant parameter-less functions
    const constants = abi.filter(elem => elem.constant === true);
    constants.forEach(constant => {
      if (constant.inputs && constant.inputs.length === 0) {
        onConstantLoad(constant.name, [], 0);
      }
    });
  }

  render() {
    const { abi = [], onFunctionCall = () => { }, onFunctionSend = () => { }, constantMap = {}, constantLoadStatus = {} } = this.props;
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
                      isFunction={elem.type==='function'}
                      showAmountToSend={false}
                      inputs={elem.inputs}
                      outputs={elem.outputs}
                      onFunctionCall={generateOnCallHandler(elem.name, elem.inputs, onFunctionCall)}
                      result={elem.inputs && elem.inputs.length === 0 && constantMap[elem.name] !== undefined && String(constantMap[elem.name])}
                      isLoadingResult={elem.inputs && elem.inputs.length === 0 && constantLoadStatus[elem.name]}
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
            subtitle="A transaction must be executed. It will be handled by MetaMask."
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
                      showAmountToSend
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
}


Functions.propTypes = {
  abi: PropTypes.array,
  onFunctionCall: PropTypes.func,
  onFunctionSend: PropTypes.func,
  onConstantLoad: PropTypes.func,
  constantMap: PropTypes.object,
  constantLoadStatus: PropTypes.object
};

export default Functions;