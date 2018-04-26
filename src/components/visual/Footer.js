import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import KeyboardArrowLeft from 'material-ui/svg-icons/hardware/keyboard-arrow-left';
import KeyboardArrowRight from 'material-ui/svg-icons/hardware/keyboard-arrow-right';
import colors from '../../utils/variables/colors';
import GitHubLogo from '../../assets/github-logo-gray.png';

const currYear = new Date().getFullYear();

const FooterWrapper = styled.div`
  background-color: ${colors.primary3Color};
  padding: 60px 30px;
  min-height: 60px;
  text-align: center;
  color: ${colors.whiteColor};
`

const GitHub = styled.img`
  height: 30px;
  margin-top: 2em;
`

const Small = styled.p`
  color: ${ colors.whiteColor };
  margin-top: 60px;
  font-size: 10pt;
`

const footerLinkStyle = {
  color: `${colors.whiteColor}`,
  margin: '0 20px',
  textDecoration: 'none'
}


const Footer = (props) => {
  return (
    <FooterWrapper>
      <div>
        <Link style={footerLinkStyle} to='/license'>
          Terms
        </Link>
        <Link style={footerLinkStyle} to='/about'>
          About
        </Link>
      </div>
      <Link style={footerLinkStyle} to='https://github.com/dmerrill6/EthTools' target='_blank'>
        <KeyboardArrowRight style={{ height: '30', width: '30' }} color='#a0a0a0'/>
      </Link>
      <Link style={footerLinkStyle} to='https://github.com/dmerrill6/EthTools' target='_blank'>
        <GitHub src={GitHubLogo} />
      </Link>
      <Link style={footerLinkStyle} to='https://github.com/dmerrill6/EthTools' target='_blank'>
        <KeyboardArrowLeft style={{ height: '30', width: '30' }} color='#a0a0a0' />
      </Link>
      <div>
      </div>
      <div>
        <Small>
          EthTools © {currYear}
        </Small>
      </div>
    </FooterWrapper>
  );
}

export default Footer;