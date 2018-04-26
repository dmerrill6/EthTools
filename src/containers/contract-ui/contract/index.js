import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import styled from 'styled-components';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import Chip from 'material-ui/Chip';
import { Tabs, Tab } from 'material-ui/Tabs';
import ViewHeadline from 'material-ui/svg-icons/action/view-headline';
import Code from 'material-ui/svg-icons/action/code';
import qs from 'query-string';
import colors from '../../../utils/variables/colors';
import generateContractCallOrSendFunction from './generateContractCallOrSendFunction';
import ContractABI from '../../../components/contracts/contract-abi/index';
import TransactionPendingDialog from '../../../components/transaction-pending-dialog/index';
import CompilerWrapper from '../../../components/contracts/compiler-wrapper/index';
import SelectedContractBreadcrumb from '../../../components/contracts/contract-search-box/SelectedContractBreadcrumb';
import Functions from '../../../components/contracts/functions/index';
import { updateContract } from '../../../redux/actions/contracts';
import { web3Selector, currentAccountSelector } from '../../../redux/selectors/web3';
import { contractsSelector } from '../../../redux/selectors/contracts';
import {selectedCompilerSelector, compilerSourceVersionsSelector, selectedEditorThemeSelector} from '../../../redux/selectors/compilers';
import {fetchCompiler, fetchCompilerVersions, selectEditorTheme} from '../../../redux/actions/compilers';

const Divider = styled.div`
  margin: 1em 0;
`
const tabStyles = {
  defaultTab: {
    backgroundColor: colors.accent1ColorGray,
    fontWeight: 400
  },
  activeTab: {
    backgroundColor: colors.accent1Color
  },
  inkbarStyles: {
    backgroundColor: colors.primary1Color
  }
}
class Contract extends Component {
  constructor() {
    super();
    this.state = {
      showCallResultModal: false,
      callResult: '',
      calledFunction: '',
      showTransactionPendingModal: false,
      transactionError: '',
      transactionAddress: '',
      transactionFunction: ''
    };
    this.handleContractCallResult = this.handleContractCallResult.bind(this);
    this.handleContractCallResultError = this.handleContractCallResultError.bind(this);
    this.handleContractSendResult = this.handleContractSendResult.bind(this);
    this.handleContractSendResultError = this.handleContractSendResultError.bind(this);
    this.handleCloseCallResultDialog = this.handleCloseCallResultDialog.bind(this);
    this.handleTabChange = this.handleTabChange.bind(this);
    this.handleCompiledContractSelect = this.handleCompiledContractSelect.bind(this);
    this.handleCompiledContractCancel = this.handleCompiledContractCancel.bind(this);
    this.handleTransactionModalClose = this.handleTransactionModalClose.bind(this);
  }


  handleSetContractABI (address, abi) {
    this.props.updateContract(address, {abi});
  }

  handleContractCallResult ({result, functionName}) {
    this.setState({callResult: JSON.stringify(result), calledFunction: functionName, showCallResultModal: true});
  }

  handleContractCallResultError({ error, functionName }) {
    this.setState({ callResult: `Error: ${JSON.stringify(error)}`, calledFunction: functionName, showCallResultModal: true });
  }

  handleContractSendResult({ result }) {
    this.setState({ transactionAddress: result.transactionHash});
  }

  handleContractSendResultError({ error }) {
    this.setState({ transactionError: `Error: ${JSON.stringify(error)}` });
  }

  handleCloseCallResultDialog() {
    this.setState({showCallResultModal: false});
  }

  handleTabChange(value) {
    this.props.history.push(`?tab=${value}`);
  }

  handleCompiledContractSelect(address, contract) {
    this.props.updateContract(address, {abi: contract.interface});
  }

  handleCompiledContractCancel(address) {
    this.props.updateContract(address, {abi: ''})
  }

  handleTransactionModalClose() {
    this.setState({showTransactionPendingModal: false});
  }

  render() {
    const { match: { params: {address} }, history, web3, contracts = {}, currentAccount,
      compilerSources, compiler, fetchCompilerVersions, fetchCompiler, location,
      selectEditorTheme, editorTheme} = this.props;
    const currContract = contracts[address];
    const tab = qs.parse(location.search).tab || 'abi';
    let abi = [];
    if (currContract && currContract.abi){
      abi = JSON.parse(currContract.abi);
    }
    let handleFunctionCall = () => { };
    let handleFunctionSend = () => { };
    if (currContract && abi.length > 0 && address && web3) {
      handleFunctionCall = generateContractCallOrSendFunction(
        web3,
        abi,
        address,
        'call',
        currentAccount,
        this.handleContractCallResult,
        this.handleContractCallResultError
      );
      handleFunctionSend = generateContractCallOrSendFunction(
        web3,
        abi,
        address,
        'send',
        currentAccount,
        this.handleContractSendResult,
        this.handleContractSendResultError,
        ({functionName}) => {this.setState({showTransactionPendingModal: true, transactionFunction: functionName})}
      );
    }
    return (
      <React.Fragment>
        <SelectedContractBreadcrumb
          selectedContractAddress={address}
          resetAddress={() => {history.push('/contracts')}}
        />
        <Divider />
        { currContract && currContract.abi ? (
          <Chip onRequestDelete={this.handleSetContractABI.bind(this, '')}>Contract Set</Chip>
        ) : (
          <Tabs
            inkBarStyle={tabStyles.inkbarStyles}
            value={tab}
            onChange={this.handleTabChange}
            tabItemContainertyle={{display: 'none'}}
          >
            <Tab style={tab === 'abi' ? tabStyles.activeTab : tabStyles.defaultTab}
              label="From Contract ABI" value="abi" icon={<ViewHeadline />}>
              <ContractABI
                web3={web3}
                onSetContractABI={this.handleSetContractABI.bind(this, address)}
                contractAddress={address}
              />
            </Tab>
            <Tab style={tab === 'code' ? tabStyles.activeTab : tabStyles.defaultTab}
              label="From Contract Code" value="code" icon={<Code />}>
              <CompilerWrapper
                compilerSources={compilerSources}
                compiler={compiler}
                fetchCompilerVersions={fetchCompilerVersions}
                fetchCompiler={fetchCompiler}
                code={currContract && currContract.code}
                editorTheme={editorTheme}
                onThemeChange={selectEditorTheme}
                onContractSelect={this.handleCompiledContractSelect.bind(this, address)}
              />
            </Tab>
          </Tabs>
        ) }

        <Divider />
        <Functions
          abi={abi}
          onFunctionCall={handleFunctionCall}
          onFunctionSend={handleFunctionSend}/>
        <Dialog
          title={`Contract call result for ${this.state.calledFunction}`}
          actions={[
            <FlatButton
              label="Close"
              primary={true}
              onClick={this.handleCloseCallResultDialog}
            />
          ]}
          modal={false}
          open={this.state.showCallResultModal}
          onRequestClose={this.handleCloseCallResultDialog}
        >
          {this.state.callResult}
        </Dialog>
        <TransactionPendingDialog
          open={this.state.showTransactionPendingModal}
          transactionAddress={this.state.transactionAddress}
          onClose={this.handleTransactionModalClose}
          pendingTitle='Waiting for transaction to be approved and mined'
          pendingMessage={`Transaction sent for function ${this.state.transactionFunction}`}
          successMessage='Transaction mined!'
          etherscanLink={`/tx/${this.state.transactionAddress}`}
          transactionError={this.state.transactionError} />
      </React.Fragment>
    )
  }
}

Contract.propTypes = {
  contracts: PropTypes.object,
  compiler: PropTypes.object,
  compilerSources: PropTypes.array,
  currentAccount: PropTypes.string,
  editorTheme: PropTypes.string,
  fetchCompiler: PropTypes.func,
  fetchCompilerVersions: PropTypes.func,
  selectEditorTheme: PropTypes.func,
  updateContract: PropTypes.func,
  web3: PropTypes.object
}

const mapStateToProps = (state) => {
  return {
    web3: web3Selector(state),
    contracts: contractsSelector(state),
    currentAccount: currentAccountSelector(state),
    compilerSources: compilerSourceVersionsSelector(state),
    compiler: selectedCompilerSelector(state),
    editorTheme: selectedEditorThemeSelector(state)
  };
}

const mapDispatchToProps = (dispatch) => {
  return {
    updateContract: (address, attributes) => dispatch(updateContract(address, attributes)),
    fetchCompilerVersions: () => dispatch(fetchCompilerVersions()),
    fetchCompiler: (compilerVersion) => dispatch(fetchCompiler(compilerVersion)),
    selectEditorTheme: (editorTheme) => dispatch(selectEditorTheme(editorTheme))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Contract);