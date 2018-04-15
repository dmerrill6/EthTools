import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

class EtherscanLink extends React.Component {
  constructor (props) {
    super(props);
    this.state = {
      network: ''
    }
    this._queryNetwork = this._queryNetwork.bind(this);
  }

  componentDidMount() {
    this._queryNetwork();
    setInterval(this._queryNetwork, 1000);
  }

  _queryNetwork () {
    if (typeof web3 === 'undefined') return;
    /*eslint no-undef: 0*/
    web3.version.getNetwork((err, netId) => {
      switch (netId) {
        case "1":
          // Mainnet
          if (this.state.network !== '') this.setState({network: ''})
          break;
        case "2":
          // Morden
          if (this.state.network !== 'morden') this.setState({network: 'morden'})
          break;
        case "3":
          // Ropsten
          if (this.state.network !== 'ropsten') this.setState({network: 'ropsten'})
          break;
        default:
          if (this.state.network !== '') this.setState({ network: '' })
          break;
      }
    })
  }

  render () {
    const link = `https://${this.state.network}.etherscan.io${this.props.to}`
    return (
      <Link
        {...this.props}
        to={link}
      >
        {this.props.children}
      </Link>
    )
  }
}

EtherscanLink.propTypes = {
  children: PropTypes.node,
  to: PropTypes.string
};

export default EtherscanLink;