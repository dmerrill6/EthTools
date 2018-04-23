import React from 'react';
import TextField from 'material-ui/TextField';
import styled from 'styled-components';
import RaisedButton from 'material-ui/RaisedButton';
import { Field, reduxForm } from 'redux-form';

const ContractSearchBoxContainer = styled.div`
  display: inline-block;
  width: 90%;
`


const renderTextField = ({
  input,
  label,
  placeholder,
  fullWidth,
  meta: { touched, error },
  ...custom
}) =>
  <TextField
    hintText={placeholder}
    fullWidth={fullWidth}
    floatingLabelText={label}
    {...input}
    {...custom}
  />

const validate = values => {
  const errors = {}
  const requiredFields = [
    'address',
  ];
  requiredFields.forEach(field => {
    if (!values[field]) {
      errors[field] = 'Required'
    }
  });
  return errors;
}

const ContractSearchBoxForm = (props) => (
  <form onSubmit={props.handleSubmit}>
    <ContractSearchBoxContainer>
      <Field
        name='address'
        component={renderTextField}
        label='E.g. 0xde0b295669a9fd93d5f28d9ec85e40f4cb697bae'
        placeholder='Type or paste the contract address'
        fullWidth
        onFocus={props.onFocus}
        onBlur={props.onBlur}
      />
    </ContractSearchBoxContainer>
    <RaisedButton disabled={props.submitting || props.invalid} type='submit' label="Search" secondary={true} />
  </form>
)

export default reduxForm({
  form: 'ContractSearchBoxForm',
  validate
})(ContractSearchBoxForm);