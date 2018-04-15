import React from 'react';
import PropTypes from 'prop-types';
import Chip from 'material-ui/Chip';
import RaisedButton from 'material-ui/RaisedButton';
import styled from 'styled-components';
import { Card, CardHeader, CardText } from 'material-ui/Card';
import Compiler from '../../../components/compiler/Compiler';

const Divider = styled.div`
  height: 10px;
`

class CompilerWrapper extends React.Component{
  constructor (props) {
    super(props);
    this.state = {
      contracts: {}
    }
    this.handleContractCompile = this.handleContractCompile.bind(this);
  }

  handleContractCompile (contracts) {
    this.setState({contracts: contracts.contracts});
  }

  render () {
    const { compilerSources, compiler, fetchCompilerVersions, fetchCompiler } = this.props;
    return (
      <Compiler
        onContractCompile={this.handleContractCompile}
        compilerSources={compilerSources}
        compiler={compiler}
        fetchCompilerVersions={fetchCompilerVersions}
        fetchCompiler={fetchCompiler}
        actions={
          Object.keys(this.state.contracts).map((contract, idx) => {
            const contractObj = this.state.contracts[contract];
            return (
              <div key={`select_contract_for_abi${idx}`}>
                <React.Fragment>
                  <RaisedButton
                    labelStyle={{ textTransform: 'none' }}
                    label={`Select ${contract}`}
                    onClick={this.props.onContractSelect.bind(this, contractObj)}
                  />
                  <Divider />
                </React.Fragment>
                </div>
            )
          })
        }
      />
    )
  }
}


CompilerWrapper.propTypes = {
  compiler: PropTypes.object,
  compilerSources: PropTypes.array,
  fetchCompiler: PropTypes.func,
  fetchCompilerVersions: PropTypes.func,
  onContractSelect: PropTypes.func
}

export default CompilerWrapper;