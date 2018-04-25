import React from 'react';
import { Field, reduxForm, FieldArray } from 'redux-form';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
import { Card, CardHeader, CardText } from 'material-ui/Card';
import styled from 'styled-components';
import FlatButton from 'material-ui/FlatButton';
import AnimatedLogo from '../visual/AnimatedLogo';

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
  hintText,
  floatingLabelText,
  fullWidth,
  multiLine,
  rows,
  meta: { touched, error },
  ...custom
}) =>
  <TextField
    hintText={hintText}
    fullWidth={fullWidth}
    rows={rows}
    multiLine={multiLine}
    floatingLabelText={floatingLabelText}
    errorText={touched && error}
    {...custom}
    {...input}
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

class SourceCodeForm extends React.Component {
  constructor (props) {
    super(props);
    this.state = {
      lastRegisteredCode: undefined
    }
  }

  componentWillReceiveProps (nextProps) {
    if (nextProps.code !== this.state.lastRegisteredCode && this.props.change) {
      this.props.change('contract_source_code', nextProps.code);
      this.setState({lastRegisteredCode: nextProps.code});
    }
  }

  render () {
    return (
      <form onSubmit={this.props.handleSubmit}>
        <Field
          name='contract_source_code'
          multiLine
          rows={10}
          fullWidth
          component={renderTextField}
          hintText='Insert contract source code'
          floatingLabelText='Contract Source Code'
          ref={(instance) => {this.field = instance}}
        />
        {
          this.props.submitting && (
            <ProgressWrapper>
              <AnimatedLogo spinning active />
            </ProgressWrapper>
          )
        }
        <Divider />
        <RaisedButton
          disabled={this.props.submitting || this.props.invalid}
          type='submit' label='Compile Contract'
          secondary={true} />

      </form>
    )
  }
}

export default reduxForm({
  form: 'SourceCodeForm',
  validate
})(SourceCodeForm);