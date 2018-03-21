import React from 'react';
import PropTypes from 'prop-types';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import AppBar from 'material-ui/AppBar';
import getTheme from './theme';
import AppBarContent from '../../components/app-bar-content';
import AccountReloader from '../metamask/account-reloader/index';
import MetamaskHandler from '../metamask/index';

const Layout = (props) => (
  <MuiThemeProvider muiTheme={getTheme()}>
    <div>
      <AppBar
        title={<AppBarContent/>}
        iconElementRight={<AccountReloader/>}
      />
      <MetamaskHandler/>
      {props.children}
    </div>
  </MuiThemeProvider>
);

Layout.propTypes = {
  children: PropTypes.node
};

export default Layout;