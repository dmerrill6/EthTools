import React from 'react';
import FlatButton from 'material-ui/FlatButton';
import styled from 'styled-components';
import {Link} from 'react-router-dom';

const Title = styled.h1`
  font-size: 1em;
  line-height: 1.3em;
  display: inline-block;
  margin-right: 3em;
`;

const MenuButton = styled(FlatButton)`
  && {
    color: white !important;
  }
`;

const AppBarContent = (props) => (
  <div>
    <Title>EthTools</Title>
    <Link to='/contracts'>
      <MenuButton label='Contracts' />
    </Link>
    <Link to='/about'>
      <MenuButton label='About' />
    </Link>
  </div>
);

export default AppBarContent;
