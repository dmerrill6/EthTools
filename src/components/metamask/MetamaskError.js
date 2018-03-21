import React from 'react';
import PropTypes from 'prop-types'
import Notice from '../visual/Notice';


const MetamaskError = ({errorMessage}) => (
  <Notice type='danger' active>
    <p>
      {errorMessage}
    </p>

  </Notice>
)

MetamaskError.propTypes = {
  errorMessage: PropTypes.string
}

export default MetamaskError;