import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import styled from 'styled-components';
import FlatButton from 'material-ui/FlatButton';
import { Link } from 'react-router-dom';
import EtherscanLink from '../../../components/etherscan/EtherscanLink';
import { setCurrentAccount, setCurrentNetwork } from '../../../redux/actions/web3';
import { currentAccountSelector, web3Selector, currentNetworkSelector } from '../../../redux/selectors/web3';

const MenuButton = styled(FlatButton) `
  && {
    color: white !important;
  }
`

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  margin-top: -4px;
  height: 100%;
`

const networkLabel = (network) => {
  switch (network) {
    case 'mainnet':
      return 'Mainnet';
    case 'morden':
      return 'Morden';
    case 'ropsten':
      return 'Ropsten';
    default:
      return 'Custom Network';
  }
}
class AccountReloader extends React.Component {
  constructor () {
    super();
    this._tryToUpdateCurrentAccount = this._tryToUpdateCurrentAccount.bind(this);
    this._queryNetwork = this._queryNetwork.bind(this);
  }

  componentDidMount() {
    this._tryToUpdateCurrentAccount();
    this._queryNetwork();
    setInterval(this._tryToUpdateCurrentAccount, 500);
    setInterval(this._queryNetwork, 500);
  }

  _tryToUpdateCurrentAccount() {
    const { currentAccount = '', setCurrentAccount = () => { }, web3 } = this.props;
    if (!web3 || web3.hasOwnProperty('error')) return;
    web3.eth.getAccounts((err, accounts) => {
      // If we can get accounts from web3.eth and it is not currently set...
      if (!err && accounts.length > 0 && currentAccount !== accounts[0]) {
        // ...we set the current account
        setCurrentAccount(accounts[0]);
      }
    });
  }

  _queryNetwork() {
    if (typeof web3 === 'undefined') return;
    /*eslint no-undef: 0*/

    const { network, setCurrentNetwork } = this.props;
    web3.version.getNetwork((err, netId) => {
      switch (netId) {
        case "1":
          // Mainnet
          if (network !== 'mainnet') setCurrentNetwork('mainnet');
          break;
        case "2":
          // Morden
          if (network !== 'morden') setCurrentNetwork('morden');
          break;
        case "3":
          // Ropsten
          if (network !== 'ropsten') setCurrentNetwork('ropsten');
          break;
        default:
          if (network !== 'custom') setCurrentNetwork('custom');
          break;
      }
    });
  }

  render() {
    const { currentAccount = '', network } = this.props;
    const currentAccountSet = currentAccount !== '';
    let label = currentAccountSet ? currentAccount : 'Waiting for connection...';
    label = network ? `${networkLabel(network)} - ${label}` : label;
    return (
      <Wrapper>
        {currentAccountSet && (this.props.web3 && !this.props.web3.hasOwnProperty('error')) ? (
          <EtherscanLink
            target='_blank'
            network={network}
            to={`/address/${currentAccount}`}>
            <MenuButton label={label} />
          </EtherscanLink>
        ) : (
          <Link to='#' >
            <MenuButton label={label} />
          </Link>
        )}
      </Wrapper>
    )
  }
}

AccountReloader.propTypes = {
  currentAccount: PropTypes.string,
  setCurrentAccount: PropTypes.func,
  web3: PropTypes.object,
  network: PropTypes.string,
  setCurrentNetwork: PropTypes.func
}

const mapStateToProps = (state) => {
  return {
    currentAccount: currentAccountSelector(state),
    web3: web3Selector(state),
    network: currentNetworkSelector(state)
  };
}

const mapDispatchToProps = (dispatch) => {
  return {
    setCurrentAccount: (account) => dispatch(setCurrentAccount(account)),
    setCurrentNetwork: (network) => dispatch(setCurrentNetwork(network))
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(AccountReloader);