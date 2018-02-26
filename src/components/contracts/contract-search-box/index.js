import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import ContractSearchBoxForm from './ContractSearchBoxForm';
import ContractSelectionResetter from './ContractSelectionResetter';
import { setContractAddress } from '../../../redux/actions/contracts';
import { contractAddressSelector } from '../../../redux/selectors/contracts';


class ContractSearchBox extends Component {
  handleSubmit = (fields) => {
    this.props.setContractAddress(fields.address);
  }

  render() {
    const {selectedContractAddress} = this.props;
    return selectedContractAddress ? (
      <ContractSelectionResetter />
    ) : (
      <ContractSearchBoxForm onSubmit={this.handleSubmit.bind(this)}/>
    );
  }
}

ContractSearchBox.propTypes = {
  selectedContractAddress: PropTypes.string,
  setContractAddress: PropTypes.func
};

const mapStateToProps = (state) => {
  return {
    selectedContractAddress: contractAddressSelector(state)
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    setContractAddress: (address) => dispatch(setContractAddress(address))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ContractSearchBox);