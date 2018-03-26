import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import colors from '../../utils/variables/colors';

const FooterWrapper = styled.div`
  background-color: ${colors.primary3Color};
  padding: 60px 30px;
  min-height: 60px;
  text-align: center;
  color: ${colors.whiteColor};
`

const FooterLink = styled.span`
  color: ${colors.whiteColor};
  margin: 0 10px;
  text-decoration: none;
`

const Footer = (props) => {
  return (
    <FooterWrapper>
      <Link to='/license'>
        <FooterLink>
          Terms of Service
        </FooterLink>
      </Link>
      <Link to='/about'>
        <FooterLink>
          About
        </FooterLink>
      </Link>
    </FooterWrapper>
  );
}

export default Footer;