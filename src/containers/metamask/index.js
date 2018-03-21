import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import MetamaskDownload from '../../components/metamask/MetamaskDownload';
import MetamaskLoader from '../../components/metamask/MetamaskLoader';
import MetamaskError from '../../components/metamask/MetamaskError';
import { web3Selector } from '../../redux/selectors/web3';

const MetamaskHandler = ({ web3 }) => {
  if (!web3 || (web3 && !web3.hasOwnProperty('error'))) {
    return (
      <MetamaskLoader />
    )
  } else if (web3.errorType === 'noMetamask') {
    return (
      <MetamaskDownload />
    )
  } else if (web3.hasOwnProperty('error')) {
    return (
      <MetamaskError errorMessage={web3.error} />
    )
  }
};

MetamaskHandler.propTypes = {
  web3: PropTypes.object
}

const mapStateToProps = (state) => {
  return {
    web3: web3Selector(state)
  };
};

export default connect(mapStateToProps)(MetamaskHandler);