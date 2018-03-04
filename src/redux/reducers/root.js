import { combineReducers } from 'redux';
import {reducer as formReducer} from 'redux-form';
import contracts from './contracts';
import web3 from './web3';

const rootReducer = combineReducers({
  form: formReducer,
  contracts,
  web3
});

export default rootReducer;
