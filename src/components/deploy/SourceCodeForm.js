import React from 'react';
import { Field, reduxForm } from 'redux-form';
import RaisedButton from 'material-ui/RaisedButton';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';
import styled from 'styled-components';
import AceEditor from 'react-ace';
import AnimatedLogo from '../visual/AnimatedLogo';
import 'brace/mode/text';
import './mode-solidity';
import 'brace/theme/clouds';
import 'brace/theme/monokai';


const Divider = styled.div`
  height: 10px;
`

const ProgressWrapper = styled.div`
  text-align: center;
  position: absolute;
  width: 100%;
  top: 70px;
`

const ThemeSelectContainer = styled.div`
  text-align: right;
  & *{
    text-align: left;
  }
`

class CodeEditor extends React.Component {
 render() {
   const {
     input,
     theme,
     meta: { touched, error },
     ...custom
   } = this.props;
   return (<AceEditor
     mode="javascript"
     theme={theme === 'dark' ? 'monokai' : 'clouds'}
     width='100%'
     {...custom}
     {...input}
     onBlur={e => input.onBlur(undefined)}
   />)
 }
}

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
    this.handleThemeChange = this.handleThemeChange.bind(this);
  }

  handleThemeChange (event, index, value) {
    const {onThemeChange = () => {}} = this.props;
    onThemeChange(value);
  }

  componentWillReceiveProps (nextProps) {
    if (nextProps.code !== this.state.lastRegisteredCode && this.props.change) {
      this.props.change('contract_source_code', nextProps.code);
      this.setState({lastRegisteredCode: nextProps.code});
    }
  }

  render () {
    const {theme = 'dark'} = this.props;
    return (
      <form onSubmit={this.props.handleSubmit}>
        <Field
          name='contract_source_code'
          component={CodeEditor}
          theme={theme}
        />
        <ThemeSelectContainer>
          <SelectField
            floatingLabelText="Theme"
            value={theme}
            onChange={this.handleThemeChange}
          >
            <MenuItem value='dark' primaryText="Dark" />
            <MenuItem value='light' primaryText="Light" />
          </SelectField>
        </ThemeSelectContainer>
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