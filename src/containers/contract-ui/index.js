import React from 'react';
import PropTypes from 'prop-types';
import ContractSearchBox from '../../components/contracts/contract-search-box';
import PaddedContainer from '../../components/visual/PaddedContainer';

const ContractUI = (props) => (
  <PaddedContainer>
    <ContractSearchBox />
  </PaddedContainer>
);

ContractUI.propTypes = {
  children: PropTypes.node
};

export default ContractUI;