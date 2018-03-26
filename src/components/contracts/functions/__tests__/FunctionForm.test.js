import React from 'react';
import { mount } from 'enzyme';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import FunctionForm from '../FunctionForm.js';
import { reducer as formReducer } from 'redux-form'
import { createStore, combineReducers } from 'redux'
import { Provider } from 'react-redux'

describe('FunctionForm component', () => {
  let store;
  let wrapper;
  let componentInstance;
  beforeEach(() => {
    store = createStore(combineReducers({ form: formReducer }));
    const props = {
      inputs: [{ name: 'firstParam', type: 'string' }, { name: 'secondParam', type: 'uint256' }],
      handleSubmit: () => { },
      outputs: [],
      form: 'ConstantForm_0',
      initiallyOpen: true,
      name: 'testFunction',
      isConstant: true
    };
    wrapper = mount(
      <Provider store={store}>
        <MuiThemeProvider>
          <FunctionForm ref={ref => componentInstance = ref} {...props} />
        </MuiThemeProvider>
      </Provider>
    );
  })

  it('renders the text inputs in the same order that the params array', () => {
    expect(wrapper.find('TextField').get(0).props.floatingLabelText).toEqual('firstParam');
    expect(wrapper.find('TextField').get(1).props.floatingLabelText).toEqual('secondParam');
  });

  it('sets the input names using the same convention that in index/generateOnCallHandler', () => {
    expect(wrapper.find('TextField').get(0).props.name).toEqual('input_0');
    expect(wrapper.find('TextField').get(1).props.name).toEqual('input_1');
  });

  it('renders the function signature correctly', () => {
    const id_0 = wrapper.find('TextField').get(0).props.name;
    const id_1 = wrapper.find('TextField').get(1).props.name;
    wrapper.find('input').at(0).simulate('change', { target: { value: 'first param value', id: id_0} });
    wrapper.find('input').at(1).simulate('change', { target: { value: '1234', id: id_1 } });
    expect(wrapper.text().includes('Call testFunction("first param value", 1234)')).toBe(true);
  })
});