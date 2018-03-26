const functionParamsAsString = (inputs, { withType = false, withParentheses = true } = {}) => {
  const paramsText = inputs.reduce((prev, input, i) => {
    return `${prev}${i === 0 ? '' : ', '}${input.name}${withType ? (input.name ? ': ' : '') + input.type : ''}`
  }, '');
  return withParentheses ? `(${paramsText})` : paramsText;
}

export default functionParamsAsString;