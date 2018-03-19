import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import ContractABI from '../../../components/contracts/contract-abi/index';
import SelectedContractBreadcrumb from '../../../components/contracts/contract-search-box/SelectedContractBreadcrumb';
import { updateContract } from '../../../redux/actions/contracts';
import { web3Selector } from '../../../redux/selectors/web3';


class Contract extends Component {
  handleSetContractABI (address, abi) {
    this.props.updateContract(address, {abi});
  }

  render() {
    const { match: { params: {address} }, web3} = this.props;
    return (
      <React.Fragment>
        <SelectedContractBreadcrumb
          selectedContractAddress={address}
        />
        <ContractABI
          web3={web3}
          onSetContractABI={this.handleSetContractABI.bind(this, address)}
          contractAddress={address}
        />
      </React.Fragment>
    )
  }
}

Contract.propTypes = {
  updateContract: PropTypes.func,
  web3: PropTypes.object
}

const mapStateToProps = (state) => {
  return {
    web3: web3Selector(state)
  };
}

const mapDispatchToProps = (dispatch) => {
  return {
    updateContract: (address, attributes) => dispatch(updateContract(address, attributes))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Contract);