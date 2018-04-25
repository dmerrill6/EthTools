import React from 'react';
import styled from 'styled-components';
import {Card, CardText} from 'material-ui/Card';
import FlatButton from 'material-ui/FlatButton';
import EtherscanLink from '../../etherscan/EtherscanLink';
import colors from '../../../utils/variables/colors';
import {H3} from '../../visual/Titles';
import {Column} from '../../visual/grid';

const Abi = styled.div`
  color: ${colors.accent1Color};
`

const Code = styled.div`
  color: ${colors.primary2Color};
`

const Example = ({name, abiOrCode, net, abi, code, address, onClick = () => {}, onCodeClick = () => {}}) => (
  <Column sm={6} md={5} lg={4}>
    <Card style={{ background: 'white', margin: '1em' }}>
      <CardText>
        <H3 center>
          {name}
        </H3>
        <p>
          {abi && (<Abi>Abi available</Abi>)}
        </p>
        <p>
          {code && (<Code>Code available</Code>)}
        </p>
        <p>
          Available on: <b>{net}</b>
        </p>
        Address: <EtherscanLink target='_blank' to={`https://etherscan.io/address/${address}`}>{address}</EtherscanLink>
        <div style={{textAlign: 'center', marginTop: '1em' }}>
          <FlatButton secondary label='Select' onClick={onClick} />
          {
            code && (
              <FlatButton label='View Code' onClick={onCodeClick} />
            )
          }
        </div>
      </CardText>
    </Card>
  </Column>
)

export default Example;