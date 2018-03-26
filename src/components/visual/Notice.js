import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import colors from '../../utils/variables/colors';

const backgroundColor = (type) => {
  switch(type){
    case 'danger':
      return colors.dangerColor;
    case 'success':
      return colors.successColor;
    case 'warning':
      return colors.warningColor;
    default:
      return colors.successColor;
  }
}

const textColor = (type) => {
  switch (type) {
    case 'danger':
      return colors.whiteColor;
    case 'success':
      return colors.whiteColor;
    case 'warning':
      return colors.blackColor;
    default:
      return colors.whiteColor;
  }
}

const NoticeDiv = styled.div`
  position: absolute;
  display: flex;
  justify-content: center;
  align-items: center;
  top: 64px;
  left: 0;
  background-color: ${props => backgroundColor(props.type)};
  color: ${props => textColor(props.type)};
  width: 100%;
  height: ${props => props.active ? '40px' : '0px'};
  transition: height ease-in-out 0.2s, padding ease-in-out 0.2s;
  padding: ${props => props.active ? '5px' : '0px'};
  overflow: hidden;
`;

const Notice = (props) => (
  <NoticeDiv type={props.type} active={props.active}>
    {props.children}
  </NoticeDiv>
);

Notice.propTypes = {
  active: PropTypes.bool,
  children: PropTypes.node,
  type: PropTypes.string
};

export default Notice;