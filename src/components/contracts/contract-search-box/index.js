import React, { Component } from 'react';
import PropTypes from 'prop-types';
import ContractSearchBoxForm from './ContractSearchBoxForm';


class ContractSearchBox extends Component {
  handleSubmit = (fields) => {
    this.props.setContractAddress(fields.address);
  }

  render() {
    return (
      <ContractSearchBoxForm onSubmit={this.handleSubmit.bind(this)}/>
    );
  }
}

ContractSearchBox.propTypes = {
  setContractAddress: PropTypes.func
};

export default (ContractSearchBox);