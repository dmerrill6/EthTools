import React from 'react';
import FlatButton from 'material-ui/FlatButton';
import styled from 'styled-components';
import {NavLink} from 'react-router-dom';
import colors from '../../utils/variables/colors';
import logo from '../../assets/logo.svg';

const Title = styled.h1`
  font-size: 1em;
  line-height: 1.3em;
  display: inline-block;
  margin-right: 3em;
  color: white;
  text-decoration: none;
`;

const Logo = styled.img`
  height: 32px;
  margin-right: 10px;
  vertical-align: middle;
`

const MenuButton = styled(FlatButton)`
  && {
    color: white !important;
  }
`;

const activeStyle = {
  borderBottom: `solid 2px ${colors.accent1Color}`
}

const AppBarContent = (props) => (
  <div>
    <NavLink to='/'>
      <Title><Logo src={logo} alt="logo" />EthTools</Title>
    </NavLink>
    <NavLink to='/contracts' activeStyle={activeStyle}>
      <MenuButton label='Explore Contract' />
    </NavLink>
    <NavLink to='/deploy' activeStyle={activeStyle}>
      <MenuButton label='Deploy' />
    </NavLink>
    <NavLink to='/about' activeStyle={activeStyle}>
      <MenuButton label='About' />
    </NavLink>
  </div>
);

export default AppBarContent;
