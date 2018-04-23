import React from 'react';
import PropTypes from 'prop-types';
import { Route } from 'react-router-dom';
import { Card, CardHeader, CardText } from 'material-ui/Card';
import Contract from './contract/index';
import {H1} from '../../components/visual/Titles';
import ContractSearchBox from '../../components/contracts/contract-search-box/index';
import PaddedContainer from '../../components/visual/PaddedContainer';
import AnimatedLogo from '../../components/visual/AnimatedLogo';

class ContractUI extends React.Component {
  constructor (props) {
    super(props);
    this.state = {
      searchBoxFocused: false
    };
    this.handleContractAddressSubmit = this.handleContractAddressSubmit.bind(this);
  }
  handleContractAddressSubmit (address) {
    this.props.history.push(`/contracts/${address}`);
  };

  handleContractBoxFocus (value) {
    this.setState({searchBoxFocused: value})
  }

  render () {
    const { match: { params, url }, location } = this.props;
    const contractNotSelected = location.pathname === url;
    return (
      <PaddedContainer>
        <H1 style={{textAlign: 'center', marginBottom: '2em'}}>
          Insert a <b>contract address</b> to call its methods and read its state
        </H1>
        <AnimatedLogo faded={!contractNotSelected} active={this.state.searchBoxFocused}/>
        {
          contractNotSelected && (
            <Card containerStyle={{ backgroundColor: 'white', marginTop: '3em' }}>
              <CardText>
                <b>Ethereum Contract Address</b>
                <ContractSearchBox
                  onFocus={this.handleContractBoxFocus.bind(this, true)}
                  onBlur={this.handleContractBoxFocus.bind(this, false)}
                  setContractAddress={this.handleContractAddressSubmit}
                />
              </CardText>
            </Card>
          )
        }
        <Route path={`${url}/:address`} component={Contract} />
      </PaddedContainer>
    );
  }
}

ContractUI.propTypes = {
  children: PropTypes.node
};

export default ContractUI;