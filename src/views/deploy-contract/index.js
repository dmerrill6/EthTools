import React from 'react';
import { Helmet } from 'react-helmet';
import Deploy from '../../containers/deploy/index';

const DeployContract = (props) => (
  <React.Fragment>
    <Helmet>
      <title>EthTools - Deploy Contract</title>
    </Helmet>
    <Deploy {...props}/>
  </React.Fragment>
)

export default DeployContract;