import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import styled from 'styled-components';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import generateContractCallOrSendFunction from './generateContractCallOrSendFunction';
import ContractABI from '../../../components/contracts/contract-abi/index';
import SelectedContractBreadcrumb from '../../../components/contracts/contract-search-box/SelectedContractBreadcrumb';
import Functions from '../../../components/contracts/functions/index';
import { updateContract } from '../../../redux/actions/contracts';
import { web3Selector, currentAccountSelector } from '../../../redux/selectors/web3';
import { contractsSelector } from '../../../redux/selectors/contracts';

const Divider = styled.div`
  margin: 1em 0;
`

class Contract extends Component {
  constructor() {
    super();
    this.state = {
      showCallResultModal: false,
      callResult: '',
      calledFunction: ''
    };
    this.handleContractCallResult = this.handleContractCallResult.bind(this);
    this.handleContractCallResultError = this.handleContractCallResultError.bind(this);
    this.handleCloseCallResultDialog = this.handleCloseCallResultDialog.bind(this);
  }

  handleSetContractABI (address, abi) {
    this.props.updateContract(address, {abi});
  }

  handleContractCallResult ({result, functionName}) {
    this.setState({callResult: JSON.stringify(result), calledFunction: functionName, showCallResultModal: true});
  }

  handleContractCallResultError({ error, functionName }) {
    this.setState({ callResult: `Error: ${JSON.stringify(error)}`, calledFunction: functionName, showCallResultModal: true });
  }

  handleCloseCallResultDialog() {
    this.setState({showCallResultModal: false});
  }

  render() {
    const { match: { params: {address} }, history, web3, contracts = {}, currentAccount} = this.props;
    const currContract = contracts[address];
    let abi = [];
    if (currContract && currContract.abi){
      abi = JSON.parse(currContract.abi);
    }
    let handleFunctionCall = () => { };
    let handleFunctionSend = () => { };
    if (currContract && abi.length > 0 && address) {
      handleFunctionCall = generateContractCallOrSendFunction(
        web3,
        abi,
        address,
        'call',
        currentAccount,
        this.handleContractCallResult,
        this.handleContractCallResultError
      );
      handleFunctionSend = generateContractCallOrSendFunction(
        web3,
        abi,
        address,
        'send',
        currentAccount,
        this.handleContractCallResult,
        this.handleContractCallResultError
      );
    }
    return (
      <React.Fragment>
        <SelectedContractBreadcrumb
          selectedContractAddress={address}
          resetAddress={() => {history.push('/contracts')}}
        />
        <Divider />
        <ContractABI
          web3={web3}
          onSetContractABI={this.handleSetContractABI.bind(this, address)}
          contractAddress={address}
          alreadySelected={currContract && currContract.abi}
        />
        <Divider />
        <Functions
          abi={abi}
          onFunctionCall={handleFunctionCall}
          onFunctionSend={handleFunctionSend}/>
        <Dialog
          title={`Contract call result for ${this.state.calledFunction}`}
          actions={[
            <FlatButton
              label="Close"
              primary={true}
              onClick={this.handleCloseCallResultDialog}
            />
          ]}
          modal={false}
          open={this.state.showCallResultModal}
          onRequestClose={this.handleCloseCallResultDialog}
        >
          {this.state.callResult}
        </Dialog>
      </React.Fragment>
    )
  }
}

Contract.propTypes = {
  contracts: PropTypes.object,
  currentAccount: PropTypes.string,
  updateContract: PropTypes.func,
  web3: PropTypes.object
}

const mapStateToProps = (state) => {
  return {
    web3: web3Selector(state),
    contracts: contractsSelector(state),
    currentAccount: currentAccountSelector(state)
  };
}

const mapDispatchToProps = (dispatch) => {
  return {
    updateContract: (address, attributes) => dispatch(updateContract(address, attributes))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Contract);