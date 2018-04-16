import { SubmissionError } from 'redux-form';
import {web3ParamToPrintableString} from '../../../components/contracts/functions/utils';

const etherToWei = (ether) => {
  return ether * 1000000000000000000;
}

/**
 * Contract call or send function generator.
 * @param {Object} web3 The web3 object loaded from Metamask
 * @param {Object} abi The contract abi in decoded JSON
 * @param {String} address The address of the contract that is going to be called.
 * @param {String} type If the contract method is going to be called with `call` or `send`.
 * @param {String} fromAddress The address from which the transaction is going to be sent.
 * @returns {Function} A function that, when invoked, will call or send a transaction to the specified contract.
 */
const generateContractCallOrSendFunction = (web3, abi, address, type, fromAddress, onCallResolve, onCallReject, onCallStart = () => {}) => {
  const contract = new web3.eth.Contract(abi, address);
  return (funcName, params, amountOfEtherToSend) => {
    if (['send', 'call'].includes(type) === false) return;
    let promise;
    try {
      const paramTypesAsString = params.map(param => param.type).join(',');
      const paramValuesArray = params.map(params => params.value);

      // Log to console so that end user can view what method is going to be called.
      console.log(`Calling:\ncontract.methods['${funcName}(${paramTypesAsString})'](${paramValuesArray.map(param => web3ParamToPrintableString(param)).join(',')}).${type}({from: ${fromAddress}, value: ${etherToWei(amountOfEtherToSend)})`);
      onCallStart({functionName: funcName});
      promise = contract.methods[`${funcName}(${paramTypesAsString})`].apply(this, paramValuesArray)[type]({
        from: fromAddress,
        value: etherToWei(amountOfEtherToSend)
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