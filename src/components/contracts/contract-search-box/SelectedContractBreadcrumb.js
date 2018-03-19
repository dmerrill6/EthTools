import React from 'react';
import PropTypes from 'prop-types';
import {Link} from 'react-router-dom';

const SelectedContractBreadcrumb = ({ selectedContractAddress, resetAddress }) => (
  <div>
    <span><Link to='/contracts'>Contracts</Link>/{selectedContractAddress}</span>
  </div>
);

SelectedContractBreadcrumb.propTypes = {
  selectedContractAddress: PropTypes.string
};

export default SelectedContractBreadcrumb;