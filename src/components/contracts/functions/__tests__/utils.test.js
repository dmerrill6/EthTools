import { formInputParamIntoWeb3Param, web3ParamToPrintableString } from '../utils';

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

  it('handles bytes correctly', () => {
    expect(formInputParamIntoWeb3Param('0x10', 'bytes')).toEqual('0x10');
  })

  it('handles array of bytes correctly', () => {
    expect(formInputParamIntoWeb3Param(['0x10', '0x11'], 'bytes')).toEqual(['0x10', '0x11']);
  })

  it('handles fixed correctly', () => {
    expect(formInputParamIntoWeb3Param(2.125, 'fixed')).toEqual(2.125);
  })

  it('handles array of fixed correctly', () => {
    expect(formInputParamIntoWeb3Param([2.125, 8.432], 'fixed[]')).toEqual([2.125, 8.432]);
  })
});

describe('web3ParamToPrintableString', () => {
  it('converts strings correctly', () => {
    expect(web3ParamToPrintableString("test")).toEqual('"test"');
  })

  it('converts array of strings correctly', () => {
    expect(web3ParamToPrintableString(["test", "test2"])).toEqual('["test", "test2"]');
  })

  it('converts array of numbers correctly', () => {
    expect(web3ParamToPrintableString([1, 2])).toEqual('[1, 2]');
  })

  it('converts numbers correctly', () => {
    expect(web3ParamToPrintableString(1)).toEqual('1');
  })
})