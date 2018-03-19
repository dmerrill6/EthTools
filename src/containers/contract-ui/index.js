import React from 'react';
import PropTypes from 'prop-types';
import Contract from './contract/index';
import ContractSearchBox from '../../components/contracts/contract-search-box/index';
import PaddedContainer from '../../components/visual/PaddedContainer';
import { Route } from 'react-router-dom';


class ContractUI extends React.Component {
  handleContractAddressSubmit (address) {
    this.props.history.push(`/contracts/${address}`);
  };

  render () {
    const { match: { params, url }, location } = this.props;
    const contractNotSelected = location.pathname === url;
    return (
      <PaddedContainer>
        {
          contractNotSelected && (
            <ContractSearchBox
              setContractAddress={this.handleContractAddressSubmit.bind(this)}
            />
          )
        }
        <Route path={`${url}/:address`} component={Contract} />
      </PaddedContainer>
    );
  }
}

ContractUI.propTypes = {
  children: PropTypes.node
};

export default ContractUI;