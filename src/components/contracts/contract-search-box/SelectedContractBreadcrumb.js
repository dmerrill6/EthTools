import React from 'react';
import PropTypes from 'prop-types';
import Chip from 'material-ui/Chip';
import Blockies from 'react-blockies';
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

const IconContainer = styled.span`
  & *{
    border-radius: 12px;
    vertical-align: middle;
    margin-right: 5px;
  }
`

const SelectedContractBreadcrumb = ({ selectedContractAddress, resetAddress }) => (
  <div>
    <Wrapper>
      <StyledLink>
        <Link to='/contracts'>Contracts</Link>
        <Divisor>/</Divisor>
      </StyledLink>
      <Chip onRequestDelete={resetAddress}>
        <IconContainer>
          <Blockies
            seed={selectedContractAddress}
            size={8}
            scale={3}
          />
        </IconContainer>
        {selectedContractAddress}
      </Chip>
    </Wrapper>
  </div>
);

SelectedContractBreadcrumb.propTypes = {
  selectedContractAddress: PropTypes.string,
  resetAddress: PropTypes.func
};

export default SelectedContractBreadcrumb;