import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import styled from 'styled-components';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import CircularProgress from 'material-ui/CircularProgress';
import { Card, CardHeader, CardText } from 'material-ui/Card';
import SourceCodeForm from '../deploy/SourceCodeForm';

const TerminalContainer = styled.div`
  padding: 1em;
  background-color: #404040;
  color: white;
  font-family: "SFMono-Regular",Consolas,"Liberation Mono",Menlo,Courier,monospace;
  font-size: 11pt;
  margin-bottom: 2em;
  max-height: 300px;
  overflow-x: scroll;
`

class Compiler extends React.Component {
  constructor (props) {
    super(props);
    this.state = {
      messages: [],
      showModal: false,
      loading: false
    }
    this.toggleModal = this.toggleModal.bind(this);
    this.handleContractCompile = this.handleContractCompile.bind(this);
    this._addMessage = this._addMessage.bind(this);
  }

  handleContractCompile (fields) {
    this.setState({ showModal: true, loading: true, messages: [] }, async () => {
      // Fetch compilerSources either from redux store or from remote.
      let compilerSources = this.props.compilerSources;
      if (!compilerSources) {
        this._addMessage("Fetching Solidity compiler versions.");
        compilerSources = (await this.props.fetchCompilerVersions()).jsonSources;
      }

      // Fetch compiler either from redux store or from remote.
      let compiler = this.props.compiler;

      if (!compiler) {
        this._addMessage("Choosing most recent compiler version.");
        const selectedVersion = compilerSources.filter(source => source.indexOf('nightly') === -1)[0];
        this._addMessage(`Version ${selectedVersion} selected. Fetching compiler code.`);
        compiler = await this.props.fetchCompiler(selectedVersion);
        this._addMessage("Compiler code fetched. Compiling code.");
      }

      const optimize = 1;
      const result = compiler.compile(fields.contract_source_code, optimize);
      const messages = [];
      messages.push(`Compiled ${Object.keys(result.contracts).length} contracts.`);
      console.log("Compiled contract: ", result);
      result.errors && result.errors.forEach(error => {
        messages.push(error);
      });
      Object.values(result.contracts).forEach(contract => {
        contract.errors && contract.errors.forEach(error => {
          messages.push(error);
        });
      });
      messages.push('View the logs if you want to check the compiled objects.');
      this.setState({ loading: false, messages: [...this.state.messages, ...messages] });
      this.props.onContractCompile(result);
    });
  }

  toggleModal () {
    this.setState({ showModal: !this.state.showModal });
  }

  _addMessage (message, callback = () => { console.log(this.state) }) {
    console.log(message);
    const messages = [...this.state.messages, message];
    this.setState({ messages }, callback);
  }

  render () {
    const {actions = [], code, editorTheme = 'dark', onThemeChange = () => {}} = this.props;
    return (
      <React.Fragment>
        <Card containerStyle={{ backgroundColor: 'white' }}>
          <CardHeader
            title="Paste the Contract Source Code"
          />
          <CardText>
            <SourceCodeForm
              code={code}
              theme={editorTheme}
              onThemeChange={onThemeChange}
              onSubmit={this.handleContractCompile} />

          </CardText>

        </Card>
        <Dialog
          title='Compiling contract'
          open={this.state.showModal}
          bodyStyle={{overflowY: 'scroll'}}
          actions={[
            <FlatButton label='Cancel' primary onClick={this.toggleModal} />
          ]}
        >
          {this.state.loading && (
            <div style={{ textAlign: 'center' }}>
              <CircularProgress size={20} thickness={3} />
            </div>
          )}
          <TerminalContainer>
            {this.state.messages.map((msg, idx) => (
              <p key={`compile_message_${idx}`}>{msg}</p>
            ))}
          </TerminalContainer>
          <div>
            {actions}
          </div>
        </Dialog>
      </React.Fragment>
    )
  }
}

Compiler.propTypes = {
  actions: PropTypes.array,
  compiler: PropTypes.object,
  compilerSources: PropTypes.array,
  darkTheme: PropTypes.bool,
  fetchCompiler: PropTypes.func,
  fetchCompilerVersions: PropTypes.func,
  onContractCompile: PropTypes.func,
}

export default Compiler;