import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const PaddedDiv = styled.div`
  padding: 4em;
`;

const PaddedContainer = (props) => (
  <PaddedDiv>
    {props.children}
  </PaddedDiv>
);

PaddedContainer.propTypes = {
  children: PropTypes.node
};

export default PaddedContainer;