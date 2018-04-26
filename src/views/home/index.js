import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import RaisedButton from 'material-ui/RaisedButton';
import BugReport from 'material-ui/svg-icons/action/bug-report';
import MoneyOff from 'material-ui/svg-icons/editor/money-off';
import LightbulbOutline from 'material-ui/svg-icons/action/lightbulb-outline';
import {H2, H3} from '../../components/visual/Titles';
import {Row, Column} from '../../components/visual/grid';
import colors from '../../utils/variables/colors';
import ContractUI from '../../containers/contract-ui/index';
import PaddedContainer from '../../components/visual/PaddedContainer';
import { Card, CardText } from 'material-ui/Card';
import MetamaskLogo from '../../assets/metamask.svg';
import GithubCat from '../../assets/github-cat.png';

const ContrastSection = styled.div`
  background: ${colors.primary2Color};
  background: linear-gradient(to bottom, ${colors.primary2Color} 0%, ${colors.primary3Color} 100%);
  color: white;
  padding: 3em;
`

const FeatureContainer = styled.div`
  padding: 2em;
`

const ContractSection = styled.div`
  padding: 6em 0;
`

const Anchor = styled.a`
  color: #e0e0ff;
  text-decoration: none;
`

const Divider = styled.div`
  margin: 5em 0 2em 0;
`

const FeatureLogo = styled.img`
  height: 100px;
`

const Home = (props) => {
  return (
    <React.Fragment>
      <ContractSection>
        <ContractUI {...props} showExamples={false}/>
        <div style={{textAlign: 'center'}}>
          <Link to='/contracts'>
            <RaisedButton primary label='View Examples'/>
          </Link>
        </div>
      </ContractSection>
      <ContrastSection>
        <Row>
          <Column sm={4} align='center'>
            <FeatureContainer>
              <FeatureLogo src={GithubCat} alt='GitHub' />
              <H3 bold>
                Open Source
              </H3>
              <p>The source code is available at <Anchor href='https://github.com/dmerrill6/ethtools' target='blank'> GitHub</Anchor>.</p><p>Collaborators are welcome.</p>
            </FeatureContainer>
          </Column>
          <Column sm={4} align='center'>
            <FeatureContainer>
              <FeatureLogo src={MetamaskLogo} alt='MetaMask' />
              <H3 bold>
                Secure
              </H3>
              <p>Every transaction goes through MetaMask.</p><p>Make sure to double-check the destination address in MetaMask and you are good to go.</p>
            </FeatureContainer>
          </Column>
          <Column sm={4} align='center'>
            <FeatureContainer>
              <MoneyOff style={{height: '100px', width: '100px'}} color='white' />
              <H3 bold>
                Free
              </H3>
              <p>Completely free to use, except for the Ethereum network fee if you make a transaction.</p>
            </FeatureContainer>
          </Column>
        </Row>
        <Divider/>
        <PaddedContainer>
          <H2 center>EthTools is in Alpha</H2>
          <Row>
            <Column sm={6} smOffset={3} align='center'>
              <p>This application will be in constant change before a stable version is released. Now is the perfect time to voice your opinion. Help us shape the future of EthTools.</p>
            </Column>
          </Row>
          <Row>
            <Column sm={5} md={4} lg={3} smOffset={1} mdOffset={2} lgOffset={3} align='center'>
              <Card style={{background: 'white', margin: '1em' }}>
                <CardText>
                  <H3 center>Want a new feature?</H3>
                  <Anchor target='_blank' href='https://github.com/dmerrill6/EthTools/issues/new?labels=enhancement&title=Feature%20Request%20-%20%20Insert%20name%20here'>
                    <RaisedButton label='Feature Request' secondary icon={<LightbulbOutline />} />
                  </Anchor>
                </CardText>
              </Card>
            </Column>
            <Column sm={5} md={4} lg={3} align='center'>
              <Card style={{background: 'white', margin: '1em' }}>
                <CardText>
                  <H3 center>Have an issue?</H3>
                  <Anchor target='_blank' href='https://github.com/dmerrill6/EthTools/issues/new?labels=bug&title=Issue%20Report%20-%20Insert%20title%20here'>
                    <RaisedButton label='Issue Report' secondary icon={<BugReport />} />
                  </Anchor>
                </CardText>
              </Card>
            </Column>
          </Row>
        </PaddedContainer>
      </ContrastSection>
    </React.Fragment>
  );
};

export default Home;
