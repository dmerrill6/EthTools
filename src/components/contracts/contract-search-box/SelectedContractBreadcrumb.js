import React from 'react';
import PropTypes from 'prop-types';
import Chip from 'material-ui/Chip';
import styled from 'styled-components';
import {Link} from 'react-router-dom';

const Wrapper = styled.div`
  display: flex;
  flexWrap: wrap;
`

const StyledLink = styled.span`
  line-height: 2em;
`

const Divisor = styled.span`
  margin: 0 0.6em;
`

const SelectedContractBreadcrumb = ({ selectedContractAddress, resetAddress }) => (
  <div>
    <Wrapper>
      <StyledLink>
        <Link to='/contracts'>Contracts</Link>
        <Divisor>/</Divisor>
      </StyledLink>
      <Chip onRequestDelete={resetAddress}>{selectedContractAddress}</Chip>
    </Wrapper>
  </div>
);

SelectedContractBreadcrumb.propTypes = {
  selectedContractAddress: PropTypes.string,
  resetAddress: PropTypes.func
};

export default SelectedContractBreadcrumb;