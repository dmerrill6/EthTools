import React from 'react';
import styled from 'styled-components';
import {Row, Column} from '../../components/visual/grid/index';

const currYear = new Date().getFullYear();
const P = styled.p`
  text-align: justify;
`

const License = (props) => (
  <Row style={{ paddingTop: '3em', paddingBottom: '3em' }}>
    <Column xs={10} xsOffset={1} sm={8} smOffset={2} md={6} mdOffset={3} >
      <h1>
        General Warning
      </h1>
      <P>
        The software is provided "as is". It <b>may contain bugs</b> or errors.
        The software is given freely to you and only you are responsible for
        the results of its usage. Always make sure to double check the destination
        of every transaction to avoid monetary loss.
      </P>
      <h2>
        MIT License
      </h2>
      <P>
        Copyright (c) 2018-{currYear} Daniel Merrill
      </P>
      <P>
        Permission is hereby granted, free of charge, to any person obtaining a copy
        of this software and associated documentation files (the "Software"), to deal
        in the Software without restriction, including without limitation the rights
        to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
        copies of the Software, and to permit persons to whom the Software is
        furnished to do so, subject to the following conditions:
      </P>
      <P>
        The above copyright notice and this permission notice shall be included in all
        copies or substantial portions of the Software.
      </P>
      <P>
        THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
        IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
        FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
        AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
        LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
        OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
        SOFTWARE.
      </P>
    </Column>
  </Row>
)

export default License;
