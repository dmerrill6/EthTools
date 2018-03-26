import React, { Component } from 'react';
import PropTypes from 'prop-types';
import ContractABIForm from './ContractABIForm';
import { Card, CardActions, CardHeader, CardText } from 'material-ui/Card';
import Chip from 'material-ui/Chip';
import { SubmissionError } from 'redux-form';

class ContractABI extends Component {
  handleSubmit = (fields) => {
    const sleep = new Promise(resolve => setTimeout(resolve, 300)); // Delay a little bit to show loading animation
    return sleep.then(() => {
      try {
        // Try to set up contract. If it throws, an invalid ABI was supplied.
        const abi = JSON.parse(fields.contract_abi);
        new this.props.web3.eth.Contract(abi, this.props.contractAddress);
      } catch (error) {
        throw new SubmissionError({
          contract_abi: error.message,
          _error: 'Invalid Contract ABI'
        });
      }
      this.props.onSetContractABI(fields.contract_abi);
    });
  }

  render() {
    const component = this.props.alreadySelected ?  (
      <Chip onRequestDelete={this.props.onSetContractABI.bind(this, '')}>Contract ABI set</Chip>
    ) : (
        <Card containerStyle={{backgroundColor: 'white'}}>
          <CardHeader
            title="Paste the Contract ABI"
          />
          <CardText>
            <ContractABIForm onSubmit={this.handleSubmit.bind(this)} />
          </CardText>
        </Card>
    )
    return component;
  }
}

ContractABI.propTypes = {
  contractAddress: PropTypes.string,
  onSetContractABI: PropTypes.func,
  web3: PropTypes.object
};

export default (ContractABI);