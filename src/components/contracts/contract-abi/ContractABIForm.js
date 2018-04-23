import React from 'react';
import TextField from 'material-ui/TextField';
import styled from 'styled-components';
import RaisedButton from 'material-ui/RaisedButton';
import { Field, reduxForm } from 'redux-form';
import AnimatedLogo from '../../visual/AnimatedLogo';

const ProgressWrapper = styled.div`
  text-align: center;
  position: absolute;
  width: 100%;
  top: 70px;
`

const renderTextField = ({
  input,
  label,
  fullWidth,
  multiLine,
  rows,
  meta: { touched, error },
  ...custom
}) =>
  <TextField
    hintText={label}
    fullWidth={fullWidth}
    rows={rows}
    multiLine={multiLine}
    floatingLabelText={label}
    errorText={touched && error}
    {...input}
    {...custom}
  />

const validate = values => {
  const errors = {}
  const requiredFields = [
    'contract_abi',
  ];
  requiredFields.forEach(field => {
    if (!values[field]) {
      errors[field] = 'Required'
    }
  });
  return errors;
}

const ContractABIForm = (props) => (
  <form onSubmit={props.handleSubmit}>
    <Field
      name='contract_abi'
      multiLine
      rows={10}
      fullWidth
      component={renderTextField}
      hintText='Insert contract ABI'
      floatingLabelText='Contract ABI'
    >
      {
        props.submitting && (
          <ProgressWrapper>
            <AnimatedLogo spinning active />
          </ProgressWrapper>
        )
      }
    </Field>
    <RaisedButton disabled={props.submitting || props.invalid} type='submit' label="Submit" secondary={true} />

  </form>
)

export default reduxForm({
  form: 'ContractABIForm',
  validate
})(ContractABIForm);