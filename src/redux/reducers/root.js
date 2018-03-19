import { combineReducers } from 'redux';
import {reducer as formReducer} from 'redux-form';
import entities from './entities';
import web3 from './web3';

const rootReducer = combineReducers({
  form: formReducer,
  entities,
  web3
});

export default rootReducer;
