import React from 'react';
import styled from 'styled-components';
import {H2, H3} from '../../components/visual/Titles';
import {Row, Column} from '../../components/visual/grid';
import colors from '../../utils/variables/colors';
import ContractUI from '../../containers/contract-ui/index';

const ContrastSection = styled.div`
  background-color: ${colors.primary2Color};
  color: white;
  padding: 3em;
`

const FeatureContainer = styled.div`
  padding: 2em;
`

const ContractSection = styled.div`
  padding: 6em 0;
`

const Home = (props) => {
  return (
    <React.Fragment>
      <ContractSection>
        <ContractUI {...props}/>
      </ContractSection>
      <ContrastSection>
        <H2 center>There is nothing to worry about</H2>
        <Row>
          <Column sm={4} align='center'>
            <FeatureContainer>
              <H3>
                Secure
              </H3>
              <p>Ut irure veniam ad duis ipsum.</p>
            </FeatureContainer>
          </Column>
          <Column sm={4} align='center'>
            <FeatureContainer>
              <H3>
                Open Source
              </H3>
              <p>Labore aliquip aliquip occaecat esse est aute est et aliqua culpa.</p>
            </FeatureContainer>
          </Column>
          <Column sm={4} align='center'>
            <FeatureContainer>
              <H3>
                Non-profit
              </H3>
              <p>Deserunt excepteur ut anim ipsum sint consequat dolore dolore dolore Lorem do.</p>
            </FeatureContainer>
          </Column>
        </Row>
      </ContrastSection>
    </React.Fragment>
  );
};

export default Home;
