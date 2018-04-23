import React from 'react';
import PropTypes from 'prop-types';
import Dialog from 'material-ui/Dialog';
import EtherscanLink from '../etherscan/EtherscanLink';
import FlatButton from 'material-ui/FlatButton';
import AnimatedLogo from '../visual/AnimatedLogo';

const TransactionPendingDialog = ({
    transactionAddress,
    onClose,
    open,
    transactionError,
    etherscanLink,
    pendingMessage = 'Waiting for blockchain...',
    pendingTitle = 'Waiting for transaction to be mined',
    successTitle = 'Transaction mined!'
  }) => (
    <Dialog
      title={transactionAddress ? successTitle : pendingTitle}
      onRequestClose={onClose}
      actions={
        [
          <FlatButton primary onClick={onClose} label='Close' />
        ]
      }
      open={open}>
      <div style={{ textAlign: 'center' }}>
        {!transactionAddress && (
          <AnimatedLogo spinning active />
        )}
        <div />
        <h4>
          {!transactionAddress ? pendingMessage : (
            <EtherscanLink
              to={etherscanLink}
              target='_blank'>
              {`Transaction at ${transactionAddress}`}
            </EtherscanLink>
          )}
        </h4>
        {transactionError && (
          <p>{transactionError}</p>
        )}
      </div>
    </Dialog>
)

TransactionPendingDialog.propTypes = {
  transactionAddress: PropTypes.string,
  onClose: PropTypes.func,
  open: PropTypes.bool,
  transactionError: PropTypes.string,
  etherscanLink: PropTypes.string,
  pendingMessage: PropTypes.string,
  pendingTitle: PropTypes.string,
  successTitle: PropTypes.string
}

export default TransactionPendingDialog;