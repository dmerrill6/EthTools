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

const footerLinkStyle = {
  color: `${colors.whiteColor}`,
  margin: '0 10px',
  textDecoration: 'none'
}

const Footer = (props) => {
  return (
    <FooterWrapper>
      <Link style={footerLinkStyle} to='/license'>
        Terms of Service
      </Link>
      <Link style={footerLinkStyle} to='/about'>
        About
      </Link>
    </FooterWrapper>
  );
}

export default Footer;