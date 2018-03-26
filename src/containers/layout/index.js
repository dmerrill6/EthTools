import React from 'react';
import PropTypes from 'prop-types';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import AppBar from 'material-ui/AppBar';
import styled from 'styled-components';
import getTheme from './theme';
import AppBarContent from '../../components/app-bar-content';
import AccountReloader from '../metamask/account-reloader/index';
import MetamaskHandler from '../metamask/index';
import Footer from '../../components/visual/Footer';

const App = styled.div`
  display: flex;
  min-height: 100vh;
  flex-direction: column;
`
const Content = styled.div`
  flex: 1;
`

const Layout = (props) => (
  <MuiThemeProvider muiTheme={getTheme()}>
    <App>
      <AppBar
        title={<AppBarContent/>}
        iconElementLeft={<div/>}
        iconElementRight={<AccountReloader/>}
      />
      <MetamaskHandler/>
      <Content>
        {props.children}
      </Content>
      <Footer />
    </App>
  </MuiThemeProvider>
);

Layout.propTypes = {
  children: PropTypes.node
};

export default Layout;