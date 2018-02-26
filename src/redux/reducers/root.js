import { combineReducers } from 'redux';
import {reducer as formReducer} from 'redux-form';
import contracts from './contracts';

const rootReducer = combineReducers({
  form: formReducer,
  contracts
});

export default rootReducer;
