import React from 'react';
import PropTypes from 'prop-types';
import Function from './Function';
import { Card, CardActions, CardHeader, CardText } from 'material-ui/Card';
import Divider from 'material-ui/Divider';
import {List} from 'material-ui/List';

const handleFunctionCall = (functionKey, onFunctionCall) => (inputValues) => {
  return onFunctionCall(functionKey, inputValues);
} 

const Functions = ({ abi = [], onFunctionCall = () => { }, onFunctionSend = () => { }}) => {
  const constants = abi.filter(elem => elem.constant === true);
  const nonConstants = abi.filter(elem => elem.constant === false);
  return abi.length > 0 && (
    <React.Fragment>
      <Card containerStyle={{ backgroundColor: 'white' }}>
        <CardHeader
          title="Constant functions and public variables"
          actAsExpander={true}
          showExpandableButton={true}
        />
        <CardText expandable={true}>
          <List>
            {
              constants.map(elem => (
                <React.Fragment>
                  <Function
                    name={elem.name}
                    inputs={elem.inputs}
                    onFunctionCall={handleFunctionCall(elem.name, onFunctionCall)}
                  />
                  <Divider inset />
                </React.Fragment>
              ))
            }
          </List>
        </CardText>
      </Card>
      <Card containerStyle={{ backgroundColor: 'white' }}>
        <CardHeader
          title="State changing functions"
          actAsExpander={true}
          showExpandableButton={true}
        />
        <CardText expandable={true}>
          <List>
            {
              nonConstants.map(elem => (
                <React.Fragment>
                  <Function
                    name={elem.name}
                    inputs={elem.inputs}
                    onFunctionCall={handleFunctionCall(elem.name, onFunctionSend)}
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