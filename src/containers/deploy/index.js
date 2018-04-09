import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import Dialog from 'material-ui/Dialog';
import RaisedButton from 'material-ui/RaisedButton';
import CircularProgress from 'material-ui/CircularProgress';
import { Card, CardHeader, CardText } from 'material-ui/Card';
import PaddedContainer from '../../components/visual/PaddedContainer';
import SourceCodeForm from '../../components/deploy/SourceCodeForm';
import { web3Selector, currentAccountSelector} from '../../redux/selectors/web3';
import styled from 'styled-components';
/*eslint no-unused-vars: 0*/ // solcBrowserWrapper is loaded into the window object when imported
import solcBrowserWrapper from 'browser-solc';
import FlatButton from 'material-ui/FlatButton';

const Divider = styled.div`
  height: 10px;
`

const DeployMessagesContainer = styled.div`
  padding: 1em;
  background-color: #404040;
  color: white;
  font-family: "SFMono-Regular",Consolas,"Liberation Mono",Menlo,Courier,monospace;
  font-size: 11pt;
  margin-bottom: 2em;
  max-height: 300px;
  overflow-x: scroll;
`

class Deploy extends React.Component {
  constructor() {
    super();
    this.state = {
      deployMessages: [],
      contracts: {},
      loading: false,
      showModal: false,
      arguments: []
    }
    this.handleByteCodeSubmit = this.handleByteCodeSubmit.bind(this);
    this._addDeployMessage = this._addDeployMessage.bind(this);
    this.deployContract = this.deployContract.bind(this);
    this.toggleModal = this.toggleModal.bind(this);
  }

  handleByteCodeSubmit(fields) {
    this.setState({showModal: true, loading: true, arguments: fields.arguments || [], deployMessages: []});
    this._addDeployMessage("Fetching Solidity compiler versions.");
    window.BrowserSolc.getVersions((jsonSources, jsonReleases) => {
      this._addDeployMessage("Choosing most recent compiler version.", () => {
        const selectedVersion = jsonSources.filter(source => source.indexOf('nightly') === -1)[0];
        this._addDeployMessage(`Version ${selectedVersion} selected. Fetching compiler code.`);
        window.BrowserSolc.loadVersion(selectedVersion, (compiler) => {
          this._addDeployMessage("Compiler code fetched. Compiling code.");
          const optimize = 1;
          const result = compiler.compile(fields.contract_source_code, optimize);
          this._addDeployMessage(`Compiled ${Object.keys(result.contracts).length} contracts.`);
          console.log("Compiled contract: ", result);
          result.errors.forEach(error => {
            this._addDeployMessage(error);
          });
          this._addDeployMessage('View the logs if you want to check the compiled objects.');
          this.setState({contracts: result.contracts, loading: false});
        });
      });
    });
  }

  toggleModal () {
    this.setState({showModal: !this.state.showModal});
  }

  deployContract (byteCode, jsonInterface, fromAddress) {
    const web3 = this.props.web3;
    const contract = new web3.eth.Contract(JSON.parse(jsonInterface));
    try {
      contract.deploy({
        data: '0x' + byteCode,
        arguments: this.state.arguments
      }).send({
        from: fromAddress
      }).then(newContract => {
        console.log("Deployed contract: ", newContract);
      });
    } catch (error) {
      this._addDeployMessage('error: ' + error.message);
    }
  }

  _addDeployMessage(message, callback = () => {}) {
    this.setState({ deployMessages: [...this.state.deployMessages, message] }, callback);
  }

  render() {
    const {currentAccount} = this.props;
    return (
      <PaddedContainer>
        <Card containerStyle={{ backgroundColor: 'white' }}>
          <CardHeader
            title="Paste the Contract Source Code"
          />
          <CardText>
            <SourceCodeForm onSubmit={this.handleByteCodeSubmit} />
          </CardText>

        </Card>
        <Dialog
          title='Compiling contract'
          modal
          open={this.state.showModal}
          actions={[
            <FlatButton label='Cancel' primary onClick={this.toggleModal} />
          ]}
        >
          {this.state.loading && (
            <div style={{textAlign: 'center'}}>
              <CircularProgress size={20} thickness={5} />
            </div>
          )}
          <DeployMessagesContainer>
            {this.state.deployMessages.map((msg, idx) => (
              <p key={`deploy_message_${idx}`}>{msg}</p>
            ))}
          </DeployMessagesContainer>
          <div>
            {Object.keys(this.state.contracts).map((contract, idx) => {
              const contractObj = this.state.contracts[contract];
              return (
                <div key={`deploy_contract_${idx}`}>
                  <RaisedButton
                    label={`Deploy ${contract}`}
                    onClick={this.deployContract.bind(this, contractObj.bytecode, contractObj.interface, currentAccount)}
                  />
                  <Divider/>
                </div>
              )
            })}
          </div>
        </Dialog>
      </PaddedContainer>
    );
  }
}

Deploy.propTypes = {
  web3: PropTypes.object,
  currentAccount: PropTypes.string
}

const mapStateToProps = (state) => {
  return {
    web3: web3Selector(state),
    currentAccount: currentAccountSelector(state)
  }
}

export default connect(mapStateToProps)(Deploy);