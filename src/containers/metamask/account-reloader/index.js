import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import styled from 'styled-components';
import FlatButton from 'material-ui/FlatButton';
import { Link } from 'react-router-dom';
import EtherscanLink from '../../../components/etherscan/EtherscanLink';
import { setCurrentAccount } from '../../../redux/actions/web3';
import { currentAccountSelector, web3Selector } from '../../../redux/selectors/web3';

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

class AccountReloader extends React.Component {
  constructor () {
    super();
    this._tryToUpdateCurrentAccount = this._tryToUpdateCurrentAccount.bind(this);
  }

  componentDidMount() {
    this._tryToUpdateCurrentAccount();
    setInterval(this._tryToUpdateCurrentAccount, 2000);
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

  render() {
    const { currentAccount = '' } = this.props;
    const currentAccountSet = currentAccount !== '';
    const label = currentAccountSet ? currentAccount : 'Waiting for connection...';
    return (
      <Wrapper>
        {currentAccountSet && (this.props.web3 && !this.props.web3.hasOwnProperty('error')) ? (
          <EtherscanLink
            target='_blank'
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
  web3: PropTypes.object
}

const mapStateToProps = (state) => {
  return {
    currentAccount: currentAccountSelector(state),
    web3: web3Selector(state)
  };
}

const mapDispatchToProps = (dispatch) => {
  return {
    setCurrentAccount: (account) => dispatch(setCurrentAccount(account))
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(AccountReloader);