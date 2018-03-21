const generateContractCallOrSendFunction = (web3, abi, address, type, fromAddress) => {
  const contract = new web3.eth.Contract(abi, address);
  return (funcName, inputValues) => {
    debugger;
    let promise;
    if (type === 'call') {
      promise = contract.methods[funcName].apply(this, inputValues).call();
    } else if (type === 'send') {
      promise = contract.methods[funcName].apply(this, inputValues).send({
        from: fromAddress
      });
    }
  }
}

export default generateContractCallOrSendFunction;