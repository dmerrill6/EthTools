import React from 'react';
import { Helmet } from 'react-helmet';
import ContractUI from '../../containers/contract-ui/index';

const ExploreContract = (props) => (
  <React.Fragment>
    <Helmet>
      <title>EthTools - Explore Contract</title>
    </Helmet>
    <ContractUI {...props} />
  </React.Fragment>
)

export default ExploreContract;