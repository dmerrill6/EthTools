import React from 'react';
import PropTypes from 'prop-types';


class MetamaskDownload extends React.Component {
  constructor () {
    super();
    this.state = {
      hasWeb3: true
    };
  }

  componentDidMount () {
    if (!window.web3js) {
      this.setState({hasWeb3: false});
    }
  }

  render () {
    return !this.state.hasWeb3 && (
      <div>
        Download Metamask
      </div>
    );
  }
}

MetamaskDownload.propTypes = {
//   children: PropTypes.node
};

export default MetamaskDownload;