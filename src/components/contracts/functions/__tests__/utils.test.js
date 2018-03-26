import { formInputParamIntoWeb3Param } from '../utils';

describe('formInputParamIntoWeb3Param', () => {
  it('handles strings correctly', () => {
    expect(formInputParamIntoWeb3Param('a string', 'string')).toEqual('a string');
  });

  it('handles uint256 correctly', () => {
    expect(formInputParamIntoWeb3Param('1234', 'uint256')).toEqual(1234);
  });

  it('handles ints correctly', () => {
    expect(formInputParamIntoWeb3Param('-10', 'int8')).toEqual(-10);
  });

  it('handles arrays of integers correctly', () => {
    expect(formInputParamIntoWeb3Param('[1, 2, 3]', 'int[]')).toEqual([1,2,3]);
  })

  it('handles arrays of strings correctly', () => {
    expect(formInputParamIntoWeb3Param('["a", "b", "c"]', 'string[]')).toEqual(["a", "b", "c"]);
  })

  it('handles bools correctly', () => {
    expect(formInputParamIntoWeb3Param('true', 'bool')).toEqual(true);
  })
});