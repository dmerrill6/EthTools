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

const Error = styled.div`
  color: red;
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

const renderArguments = ({ fields, meta: { error, submitFailed } }) => (
  <Card containerStyle={{ backgroundColor: 'white' }}>
    <CardHeader
      title="Constructor Arguments"
      subtitle={`Currently, ${fields.length} arguments are going to be sent to the constructor.`}
      actAsExpander={true}
      showExpandableButton={true}
    />
    <CardText expandable={true}>
      <div>
        <RaisedButton label='Add Argument' onClick={() => fields.push(null)} />
        <Divider />
        {fields.map((argument, index) => (
          <div>
            <div style={{ display: 'inline-block', width: '80%' }}>
              <Field
                key={`deploy_argument_${index}`}
                label={`Argument #${index}`}
                name={`arguments[${index}]`}
                component={renderTextField}
                multiLine={false}
                fullWidth
              />
            </div>
            <div style={{ display: 'inline-block', width: '20%' }}>
              <FlatButton label='x' onClick={() => fields.remove(index)} />
            </div>
          </div>
        ))}
      </div>
    </CardText>
  </Card>

)

const validate = values => {
  const errors = {}
  const argumentArrayErrors = [];
  values.arguments && values.arguments.forEach((argument, index) => {
    if (!argument) argumentArrayErrors[index] = 'Required';
  });
  if (argumentArrayErrors.length > 0) {
    errors.arguments = argumentArrayErrors;
  }
  return errors;
}

const ConstructorArgumentsForm = (props) => {
  const { error } = props;
  return (
    <form onSubmit={props.handleSubmit}>
      <FieldArray name='arguments' component={renderArguments} />
      {
        props.submitting && (
          <ProgressWrapper>
            <CircularProgress size={80} thickness={5} />
          </ProgressWrapper>
        )
      }
      <Divider />
      <Error>{error && <strong>{error}</strong>}</Error>
      <RaisedButton
        disabled={props.submitting || props.invalid}
        type='submit' label='Deploy Contract'
        secondary={true} />

    </form>
  )
}

export default reduxForm({
  form: 'ConstructorArgumentsForm',
  validate
})(ConstructorArgumentsForm);