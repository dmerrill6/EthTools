import React from 'react';
import PropTypes from 'prop-types';
import styled, { keyframes } from 'styled-components';
import logo from '../../assets/logo.svg';

const spinKeyFrames = keyframes`
  0% {
    transform:rotate(0deg);
  }
  100% {
    transform:rotate(360deg);
  }
`

const hoverKeyFrames = keyframes`
  50% {
    transform: translateY(-12px);
  }
`

const LogoContainer = styled.div`
  animation: ${props => (props.spin && !props.faded) ? spinKeyFrames : ''} infinite 1.3s ease;
  text-align: center;
  opacity: ${props => props.faded ? 0 : 1};
  height: ${props => props.faded ? 0 : '80px'};
  transition: opacity 0.7s ease-in, height 0.3s ease-in-out;
`
const HoverContainer = styled.div`
  animation: ${hoverKeyFrames} 1.4s ease-in-out infinite both;
  animation-play-state: ${props => (props.active && !props.spin) ? '' : 'paused'};
  transition: all 0.7s ease-in-out;
  filter: ${props => props.active ? '' : 'grayscale(100%)'};
`

const Logo = styled.img`
  height: 80px;
`

const AnimatedLogo = ({spinning = false, active = true, faded = false}) => (
  <LogoContainer spin={spinning} faded={faded}>
    <HoverContainer active={active} spin={spinning}>
      <Logo src={logo} alt='logo' />
    </HoverContainer>
  </LogoContainer>
)

AnimatedLogo.propTypes = {
  active: PropTypes.bool,
  faded: PropTypes.bool,
  spinning: PropTypes.bool
}

export default AnimatedLogo;