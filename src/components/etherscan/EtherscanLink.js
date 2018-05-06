import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

const EtherscanLink = ({network, to, children, ...props}) => {
  let link = '#';
  if (network === 'mainnet') {
    link = `https://etherscan.io${to}`;
  } else if (network === 'ropsten') {
    link = `https://${network}.etherscan.io${to}`;
  }
  return (
    <Link
      {...props}
      to={link}
    >
      {children}
    </Link>
  )
}


EtherscanLink.propTypes = {
  children: PropTypes.node,
  to: PropTypes.string,
  network: PropTypes.string
};

export default EtherscanLink;