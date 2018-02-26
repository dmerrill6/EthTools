import React from 'react';
import PropTypes from 'prop-types';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import AppBar from 'material-ui/AppBar';
import getTheme from './theme';
import AppBarContent from '../../components/app-bar-content';

const Layout = (props) => (
  <MuiThemeProvider muiTheme={getTheme()}>
    <div>
      <AppBar
        title={<AppBarContent/>}
      />
      {props.children}
    </div>
  </MuiThemeProvider>
);

Layout.propTypes = {
  children: PropTypes.node
};

export default Layout;