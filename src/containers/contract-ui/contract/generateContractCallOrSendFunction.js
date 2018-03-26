import { SubmissionError } from 'redux-form';

/**
 * Contract call or send function generator.
 * @param {Object} web3 The web3 object loaded from Metamask
 * @param {Object} abi The contract abi in decoded JSON
 * @param {String} address The address of the contract that is going to be called.
 * @param {String} type If the contract method is going to be called with `call` or `send`.
 * @param {String} fromAddress The address from which the transaction is going to be sent.
 * @returns {Function} A function that, when invoked, will call or send a transaction to the specified contract.
 */
const generateContractCallOrSendFunction = (web3, abi, address, type, fromAddress, onCallResolve, onCallReject) => {
  const contract = new web3.eth.Contract(abi, address);
  return (funcName, inputValues) => {
    if (['send', 'call'].includes(type) === false) return;
    let promise;
    try {
      promise = contract.methods[funcName].apply(this, inputValues)[type]({
        from: fromAddress
      });
    } catch (error) {
      throw new SubmissionError({
        _error: error.message
      });
    }

    promise.then((result) => onCallResolve({functionName: funcName, result}))
           .error((error) => onCallReject({ functionName: funcName, error }));
  }
}

export default generateContractCallOrSendFunction;