import React from 'react';
import { shallow } from 'enzyme';
import Functions, {generateOnCallHandler} from '../index.js';

describe('Functions component', () => {
  const abi = [{
    'constant': true,
    'name': 'b'
  }, {
    'constant': true,
    'name': 'a'
  }, {
    'constant': false,
    'name': 'a'
  }, {
    'constant': false,
    'name': 'b'
  }]
  it('does not crash when rendering the component', () => {
    shallow(<Functions />);
  });
  it('renders the functions in alphabetical order', () => {
    const wrapper = shallow(<Functions abi={abi} />);
    expect(wrapper.find('ReduxForm').get(0).props.name).toEqual('a');
    expect(wrapper.find('ReduxForm').get(0).props.isConstant).toEqual(true);
    expect(wrapper.find('ReduxForm').get(1).props.name).toEqual('b');
    expect(wrapper.find('ReduxForm').get(1).props.isConstant).toEqual(true);
    expect(wrapper.find('ReduxForm').get(2).props.name).toEqual('a');
    expect(wrapper.find('ReduxForm').get(2).props.isConstant).toBe(undefined);
    expect(wrapper.find('ReduxForm').get(3).props.name).toEqual('b');
    expect(wrapper.find('ReduxForm').get(3).props.isConstant).toBe(undefined);
  });
});

describe('generateOnCallHandler', () => {
  it('generates the value array correctly', () => {
    const values = {
      'input_0': 'firstParamValue',
      'input_1': 'secondParamValue'
    };
    const onFunctionCall = (functionKey, params) => {
      expect(params).toEqual([{type: 'string', value: 'firstParamValue'}, {type: 'uint256', value: 'secondParamValue'}])
    }
    generateOnCallHandler(
      'functionName',
      [{name: 'firstParam', type: 'string'}, {name: 'secondParam', type: 'uint256'}],
      onFunctionCall
    )(values);
  });
});