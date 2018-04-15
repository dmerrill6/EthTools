import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import { SubmissionError } from 'redux-form'
import styled from 'styled-components';
import RaisedButton from 'material-ui/RaisedButton';
import Dialog from 'material-ui/Dialog';
import CircularProgress from 'material-ui/CircularProgress';
import PaddedContainer from '../../components/visual/PaddedContainer';
import EtherscanLink from '../../components/etherscan/EtherscanLink';
import Compiler from '../../components/compiler/Compiler';
import ConstructorArgumentsForm from '../../components/deploy/ConstructorArgumentsForm';
import { web3Selector, currentAccountSelector} from '../../redux/selectors/web3';
import { fetchCompilerVersions, fetchCompiler } from '../../redux/actions/compilers';
import {selectedCompilerSelector, compilerSourceVersionsSelector} from '../../redux/selectors/compilers';

const Divider = styled.div`
  height: 10px;
`

const Border = styled.div`
  height: 10px;
  border-bottom: solid 1px #c0c0c0;
`
class Deploy extends React.Component {
  constructor() {
    super();
    this.state = {
      contracts: {},
      showDeployingModal: false,
      deployedAddress: '',
      deployError: ''
    }
    this.handleContractCompile = this.handleContractCompile.bind(this);
    this.handleDeployModalClose = this.handleDeployModalClose.bind(this);
  }

  handleDeployModalClose() {
    this.setState({showDeployingModal: !this.state.showDeployingModal});
  }

  async handleContractCompile(contracts) {
    this.setState({contracts: contracts.contracts});
  }

  setCurrentDeploy (contractKey) {
    this.setState({currentActiveDeploy: contractKey});
  }

  deployContract (byteCode, jsonInterface, fromAddress, fields) {
    const web3 = this.props.web3;
    const contract = new web3.eth.Contract(JSON.parse(jsonInterface));
    this.setState({showDeployingModal: true});
    try {
      contract.deploy({
        data: '0x' + byteCode,
        arguments: fields.arguments
      }).send({
        from: fromAddress
      }).then(newContract => {
        console.log("Deployed contract: ", newContract);
        this.setState({deployedAddress: newContract._address})
      }).error(error => {
        this.setState({deployError: error.message});
      });
    } catch (error) {
      this.setState({showDeployingModal: false});
      throw new SubmissionError({
        _error: error.message
      })
    }
  }

  render() {
    const { currentAccount, compilerSources, compiler, fetchCompilerVersions, fetchCompiler } = this.props;
    return (
      <PaddedContainer>
        <Compiler
          compilerSources={compilerSources}
          compiler={compiler}
          fetchCompilerVersions={fetchCompilerVersions}
          fetchCompiler={fetchCompiler}
          onContractCompile={this.handleContractCompile}
          actions={
            Object.keys(this.state.contracts).map((contract, idx) => {
              const contractObj = this.state.contracts[contract];
              return (
                <div key={`deploy_contract_${idx}`}>
                  {contract !== this.state.currentActiveDeploy && (
                    <React.Fragment>
                      <RaisedButton
                        labelStyle={{ textTransform: 'none' }}
                        label={`Deploy ${contract}`}
                        onClick={this.setCurrentDeploy.bind(this, contract)}
                      />
                      <Divider />
                    </React.Fragment>
                  )}
                  {contract === this.state.currentActiveDeploy && (
                    <div key={`deploy_arguments_${idx}`}>
                      <Divider />
                      <Border />
                      <h4>Setting up arguments for {contract}</h4>
                      <ConstructorArgumentsForm
                        onSubmit={this.deployContract.bind(this, contractObj.bytecode, contractObj.interface, currentAccount)} />
                      <Divider />
                      <Border />
                      <Divider />
                    </div>
                  )}
                  <Divider />
                </div>
              )
            })
          }
        />
        <Dialog
          title={this.state.deployedAddress ? 'Contract Deployed!' : 'Waiting for deploy transaction to go live'}
          onRequestClose={this.handleDeployModalClose}
          open={this.state.showDeployingModal}>

          <div style={{textAlign: 'center'}}>
            { !this.state.deployedAddress && (
              <CircularProgress size={80} thickness={5} />
            )}
            <div/>
            <h4>
              {!this.state.deployedAddress ? 'Waiting for blockchain...' : (
                <EtherscanLink
                  to={`/address/${this.state.deployedAddress}`}
                  target='_blank'>
                  {`Deployed at ${this.state.deployedAddress}`}
                </EtherscanLink>
              )}
            </h4>
            {this.state.deployError && (
              <p>{this.state.deployError}</p>
            )}
          </div>
        </Dialog>
      </PaddedContainer>
    );
  }
}

Deploy.propTypes = {
  compiler: PropTypes.object,
  compilerSources: PropTypes.array,
  currentAccount: PropTypes.string,
  fetchCompiler: PropTypes.func,
  fetchCompilerVersions: PropTypes.func,
  web3: PropTypes.object
};

const mapStateToProps = (state) => {
  return {
    web3: web3Selector(state),
    currentAccount: currentAccountSelector(state),
    compilerSources: compilerSourceVersionsSelector(state),
    compiler: selectedCompilerSelector(state)
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    fetchCompilerVersions: () => dispatch(fetchCompilerVersions()),
    fetchCompiler: (compilerVersion) => dispatch(fetchCompiler(compilerVersion))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Deploy);