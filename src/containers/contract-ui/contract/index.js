import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import styled from 'styled-components';
import ContractABI from '../../../components/contracts/contract-abi/index';
import SelectedContractBreadcrumb from '../../../components/contracts/contract-search-box/SelectedContractBreadcrumb';
import Functions from '../../../components/contracts/functions/index';
import { updateContract } from '../../../redux/actions/contracts';
import { web3Selector } from '../../../redux/selectors/web3';
import { contractsSelector } from '../../../redux/selectors/contracts';

const Divider = styled.div`
  margin: 1em 0;
`

const generateContractCallOrSendFunction = (web3, abi, address, type) => {
  const contract = new web3.eth.Contract(abi, address);
  return (funcName, inputValues) => {
    let promise;
    if (type === 'call') {
      promise = contract.methods[funcName].apply(this, inputValues).call();
    } else if (type === 'send') {
      promise = contract.methods[funcName].apply(this, inputValues).send({
        from: web3.eth.accounts[0]
      });
    }

  }
}

class Contract extends Component {
  handleSetContractABI (address, abi) {
    this.props.updateContract(address, {abi});
  }

  render() {
    const { match: { params: {address} }, history, web3, contracts = {}} = this.props;
    const currContract = contracts[address];
    let abi = [];
    if (currContract && currContract.abi){
      abi = JSON.parse(currContract.abi);
    }
    let handleFunctionCall = () => { };
    let handleFunctionSend = () => { };
    if (currContract && abi.length > 0 && address) {
      handleFunctionCall = generateContractCallOrSendFunction(web3, abi, address, 'call');
      handleFunctionSend = generateContractCallOrSendFunction(web3, abi, address, 'send');
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
      </React.Fragment>
    )
  }
}

Contract.propTypes = {
  contracts: PropTypes.object,
  updateContract: PropTypes.func,
  web3: PropTypes.object
}

const mapStateToProps = (state) => {
  return {
    web3: web3Selector(state),
    contracts: contractsSelector(state)
  };
}

const mapDispatchToProps = (dispatch) => {
  return {
    updateContract: (address, attributes) => dispatch(updateContract(address, attributes))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Contract);