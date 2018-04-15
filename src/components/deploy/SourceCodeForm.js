import React from 'react';
import { Field, reduxForm, FieldArray } from 'redux-form';
import TextField from 'material-ui/TextField';
import CircularProgress from 'material-ui/CircularProgress';
import RaisedButton from 'material-ui/RaisedButton';
import { Card, CardHeader, CardText } from 'material-ui/Card';
import styled from 'styled-components';
import FlatButton from 'material-ui/FlatButton';

const Divider = styled.div`
  height: 10px;
`

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
    'contract_source_code',
  ];
  requiredFields.forEach(field => {
    if (!values[field]) {
      errors[field] = 'Required'
    }
  });

  return errors;
}

const SourceCodeForm = (props) => (
  <form onSubmit={props.handleSubmit}>
    <Field
      name='contract_source_code'
      multiLine
      rows={10}
      fullWidth
      component={renderTextField}
      hintText='Insert contract source code'
      floatingLabelText='Contract Source Code'
    />
    {
      props.submitting && (
        <ProgressWrapper>
          <CircularProgress size={80} thickness={5} />
        </ProgressWrapper>
      )
    }
    <Divider/>
    <RaisedButton
      disabled={props.submitting || props.invalid}
      type='submit' label='Compile Contract'
      secondary={true} />

  </form>
)

export default reduxForm({
  form: 'SourceCodeForm',
  validate
})(SourceCodeForm);