const nonParseableTypes = ['string', 'address'];

/**
 * TODO Test all possible variable types (like bytes32)
 * @param {String} input The value returned by redux-form text field.
 * @param {String} inputType The input type, obtained from the contract ABI
 */
export const formInputParamIntoWeb3Param = (input, inputType) => {
  let currValue = input;
  if (inputType && input && nonParseableTypes.includes(inputType) === false) {
    try{
      currValue = JSON.parse(currValue);
    } catch (error) {
      // TODO: Handle exception
    }
  }
  return currValue;
}

export const web3ParamToPrintableString = (input) => {
  if (typeof input === 'string') return `"${input}"`;
  if (input instanceof Array) return `[${input}]`;
  return input;
}

export const functionParamsAsString = (inputs, { withType = false, withParentheses = true } = {}) => {
  const paramsText = inputs.reduce((prev, input, i) => {
    return `${prev}${i === 0 ? '' : ', '}${input.name}${withType ? (input.name ? ': ' : '') + input.type : ''}`
  }, '');
  return withParentheses ? `(${paramsText})` : paramsText;
}