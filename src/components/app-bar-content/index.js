import React from 'react';
import FlatButton from 'material-ui/FlatButton';
import styled from 'styled-components';
import logo from '../../logo.svg';
import {Link} from 'react-router-dom';

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

const AppBarContent = (props) => (
  <div>
    <Link to='/'>
      <Title><Logo src={logo} alt="logo" />EthTools</Title>
    </Link>
    <Link to='/contracts'>
      <MenuButton label='Explore Contract' />
    </Link>
    <Link to='/deploy'>
      <MenuButton label='Deploy' />
    </Link>
    <Link to='/about'>
      <MenuButton label='About' />
    </Link>
  </div>
);

export default AppBarContent;
