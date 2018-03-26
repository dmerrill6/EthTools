import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { ListItem } from 'material-ui/List';
import { Field, reduxForm } from 'redux-form'
import Avatar from 'material-ui/Avatar';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';
import FunctionSignature from './FunctionSignature';
import functionParamsAsString from './functionParamsAsString';
import {formInputParamIntoWeb3Param, web3ParamToPrintableString} from './utils';

const SubmitError = styled.div`
  color: red;
  font-weight: bold;
`
const ParamsContainer = styled.div`
  padding: 8px 72px;
`

const renderField = ({
  input,
  label,
  type,
  paramType,
  fullWidth,
  meta: { touched, error, warning }
}) => (
    <div>
        <TextField {...input} fullWidth={fullWidth} floatingLabelText={label} floatingLabelFixed hintText={paramType} type={type} />
        {touched &&
          ((error && <span>{error}</span>) ||
            (warning && <span>{warning}</span>))}
    </div>
  )

class FunctionForm extends React.Component {
  constructor () {
    super();
    this.state = {
      inputValues: {}
    };
  }

  handleInputValueChange(inputType, {target: {value, id}}) {
    this.setState({inputValues: {...this.state.inputValues, [id]: {value, type: inputType}}});
  }

  render () {
    const { name = '', inputs, outputs, onFunctionCall, submitting, handleSubmit, error, isConstant } = this.props;

    const inputsAsArr = Object.values(this.state.inputValues);
    const inputValuesAsString = functionParamsAsString(inputsAsArr.map(input => {
      const parsedValue = web3ParamToPrintableString(formInputParamIntoWeb3Param(input.value, input.type));
      return { name: parsedValue };
    }));
    return (
      <form onSubmit={handleSubmit(onFunctionCall)}>
        <ListItem
          primaryText={<FunctionSignature name={name} inputs={inputs} outputs={outputs} />}
          primaryTogglesNestedList
          leftAvatar={<Avatar>{name[0]}</Avatar>}
          nestedItems={[...inputs.map((input, index) => (
            <ParamsContainer key={`function-${name}-${index}`}>
              <Field
                name={`input_${index}` /* We must use index for params without name and to preserve param order */}
                type='text'
                fullWidth
                component={renderField}
                label={input.name}
                paramType={input.type}
                onChange={this.handleInputValueChange.bind(this, input.type)}
              />
            </ParamsContainer>
          )), (
            <ParamsContainer key={`function-${name}-submit`}>
              {error && <SubmitError>{error}</SubmitError>}
              <RaisedButton
                labelStyle={{textTransform: 'none'}}
                type='submit'
                disabled={submitting}
                label={`${isConstant ? 'Call' : 'Execute'} ${name}${inputValuesAsString}`} />
            </ParamsContainer>
          )]}
        />
      </form>
    )
  }
}

FunctionForm.propTypes = {
  inputs: PropTypes.array,
  isConstant: PropTypes.bool,
  name: PropTypes.string,
  onFunctionCall: PropTypes.func,
  outputs: PropTypes.array
}

FunctionForm.defaultPropTypes = {
  inputs: [],
  outputs: [],
  isConstant: false,
  onFunctionCall: () => {}
}

export default reduxForm()(FunctionForm);