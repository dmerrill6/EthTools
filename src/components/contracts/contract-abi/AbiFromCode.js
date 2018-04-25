import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import RaisedButton from 'material-ui/RaisedButton';
import Compiler from '../../compiler/Compiler';
import { fetchCompilerVersions, fetchCompiler } from '../../../redux/actions/compilers';
import { selectedCompilerSelector, compilerSourceVersionsSelector } from '../../../redux/selectors/compilers';

const Divider = styled.div`
  height: 10px;
`

class AbiFromCode extends React.Component {
  constructor (props) {
    super(props);
    this.state = {
      contracts: {}
    }
    this.handleContractCompile = this.handleContractCompile.bind(this);
  }

  handleContractCompile (contracts) {
    this.setState({contracts: contracts.contracts})
  }

  render () {
    const {compilerSources, compiler, fetchCompilerVersions, fetchCompiler} = this.props;
    return (
      <Compiler
        compilerSources={compilerSources}
        compiler={compiler}
        fetchCompilerVersions={fetchCompilerVersions}
        fetchCompiler={fetchCompiler}
        onConractCompile={this.handleContractCompile}
        actions={
          Object.keys(this.state.contracts).map((contract, idx) => {
            const contractObj = this.state.contracts[contract];
            return (
              <div key={`extract_abi_contract_${idx}`}>
                <RaisedButton
                  label={`Deploy ${contract}`}
                  onClick={this.deployContract.bind(this, contractObj.bytecode, contractObj.interface, currentAccount)}
                />
                <Divider />
              </div>
            )
          })
        }
      />
    )
  }
};

AbiFromCode.propTypes = {
  compiler: PropTypes.object,
  compilerSources: PropTypes.array,
  fetchCompiler: PropTypes.func,
  fetchCompilerVersions: PropTypes.func
}

const mapStateToProps = (state) => {
  return {
    compilerSources: compilerSourceVersionsSelector(state),
    compiler: selectedCompilerSelector(state)
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    fetchCompilerVersions: () => dispatch(fetchCompilerVersions()),
    fetchCompiler: (compilerVersion) => dispatch(fetchCompiler(compilerVersion))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(AbiFromCode);