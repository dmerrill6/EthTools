import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Route } from 'react-router-dom';
import { Card, CardHeader, CardText } from 'material-ui/Card';
import Contract from './contract/index';
import examples from './examples/examples';
import Example from '../../components/contracts/example/index';
import {Row} from '../../components/visual/grid';
import {H1, H2, H3} from '../../components/visual/Titles';
import ContractSearchBox from '../../components/contracts/contract-search-box/index';
import PaddedContainer from '../../components/visual/PaddedContainer';
import AnimatedLogo from '../../components/visual/AnimatedLogo';
import { updateContract } from '../../redux/actions/contracts';
import {currentNetworkSelector} from '../../redux/selectors/web3';

class ContractUI extends React.Component {
  constructor (props) {
    super(props);
    this.state = {
      searchBoxFocused: false,
    };
    this.handleContractAddressSubmit = this.handleContractAddressSubmit.bind(this);
  }

  handleContractAddressSubmit (address) {
    this.props.history.push(`/contracts/${address}`);
  };
  handleContractExampleSubmit (address, abiOrCode, source) {
    this.props.history.push(`/contracts/${address}?tab=${abiOrCode}`);
    this.props.updateContract(address, { [abiOrCode]: source });
  }

  handleContractBoxFocus (value) {
    this.setState({searchBoxFocused: value})
  }

  render () {
    const { match: { params, url }, location, showExamples = true, currentNetwork } = this.props;
    const contractNotSelected = location.pathname === url;
    const currExamples = examples.filter(example => example.net.toLowerCase() === currentNetwork);
    return (
      <PaddedContainer>
        {
          contractNotSelected && (
            <H1 center style={{marginBottom: '2em'}}>
              Insert a <b>contract address</b> to call its methods or read its state
            </H1>
          )
        }
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
        {
          contractNotSelected && showExamples && (
            <React.Fragment>
              <H1 center style={{margin: '6em 0 1em 0'}}>Or</H1>
              <H2 center>Check one of the following examples</H2>
              <Row>
                {
                  currExamples.map((example, idx) => (
                    <Example key={`contract_example_${idx}`} name={example.name} abiOrCode={example.abiOrCode}
                      net={example.net} address={example.address} abi={example.abi} code={example.code}
                      onClick={this.handleContractExampleSubmit.bind(this, example.address, example.abiOrCode, example.abi || example.code)}
                      onCodeClick={this.handleContractExampleSubmit.bind(this, example.address, 'code', example.code)}
                    />
                  ))
                }
                {currExamples.length === 0 && (
                  <H3 center>No examples found for this network. Please try choosing another network or check your MetaMask connection.</H3>
                )}
              </Row>
            </React.Fragment>
          )
        }
        <Route path={`${url}/:address`} component={Contract} code={this.state.exampleCode} abi={this.state.exampleAbi} />
      </PaddedContainer>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    currentNetwork: currentNetworkSelector(state)
  }
}
const mapDispatchToProps = (dispatch) => {
  return {
    updateContract: (address, attributes) => dispatch(updateContract(address, attributes)),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ContractUI);