import React from 'react';
import styled from 'styled-components';
import QRCode from 'qrcode.react';
import { Helmet } from 'react-helmet';
import { Row, Column } from '../../components/visual/grid/index';

const P = styled.p`
  text-align: justify;
`

const About = () => {
  return (
    <Row style={{ paddingTop: '3em', paddingBottom: '3em' }}>
      <Helmet>
        <title>EthTools - About this site</title>
      </Helmet>
      <Column xs={10} xsOffset={1} sm={8} smOffset={2} md={6} mdOffset={3} >
        <h2>
          About EthTools
        </h2>
        <P>
          EthTools is developed using the React Framework to provide a fast
          and usable experience to the end user. The goal is to provide
          a good interface for rapid prototyping, easier interaction with
          smart contracts and an alternative for those moments where
          you don't have all the libraries installed or you are in an emergency
          and don't have the time to remember all the commands.
        </P>
        <h2>
          About the Author
        </h2>
        <P>
          My name is <a href='https://github.com/dmerrill6'
            rel="noopener noreferrer" target='_blank'>
            Daniel Merrill
          </a>,
          and I'm a Software Engineer from Chile. I love to create software,
          music and a bunch of other things. Feel free to contact me,
          specially if you are looking to collaborate on EthTools in any way.
        </P>
        <P>
          EthTools was developed in my free time. There are many features
          I'd love to implement but I haven't had the time yet.
          Please tell me if you have a great idea that we could introduce in
          EthTools, so that its not only my ideas that make it into production.
        </P>
        <h2>
          Donations
        </h2>
        <P>
          It costs money to keep the servers up. I'd be very grateful if you
          help me pay those bills.

          EthTools Ethereum address is:
        </P>
        <P>
          <b>0x7e9C83E620Ba7d5079797DF6C346cbcA910261AB</b>
          <div style={{textAlign: 'center', margin: '2em 0'}}>
            <QRCode value="0x7e9C83E620Ba7d5079797DF6C346cbcA910261AB" />
          </div>
        </P>
        <P>
          <small>
            Be careful with phishing! If donating, make sure that the destination
            transaction starts with <b>0x7e9C</b> and ends with <b>61AB</b>.
          </small>
        </P>
      </Column>
    </Row>
  );
};

export default About;
