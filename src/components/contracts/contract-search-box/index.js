import React, { Component } from 'react';
import PropTypes from 'prop-types';
import ContractSearchBoxForm from './ContractSearchBoxForm';


class ContractSearchBox extends Component {
  handleSubmit = (fields) => {
    this.props.setContractAddress(fields.address);
  }

  render() {
    const {onFocus = () => {}, onBlur = () => {}} = this.props;
    return (
      <ContractSearchBoxForm onFocus={onFocus} onBlur={onBlur} onSubmit={this.handleSubmit.bind(this)}/>
    );
  }
}

ContractSearchBox.propTypes = {
  onBlur: PropTypes.func,
  onFocus: PropTypes.func,
  setContractAddress: PropTypes.func
};

export default (ContractSearchBox);