import React from 'react';
import MetamaskDownload from './MetamaskDownload';
import MetamaskLoader from './MetamaskLoader';

const MetamaskHandler = (props) => {
  if (props.web3 === false) {
    return (
      <MetamaskDownload />
    )
  } else {
    return (
      <MetamaskLoader />
    )
  }
};

export default MetamaskHandler;