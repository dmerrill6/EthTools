import { combineReducers } from 'redux';
import {reducer as formReducer} from 'redux-form';
import entities from './entities';
import web3 from './web3';
import compilers from './compilers';

const rootReducer = combineReducers({
  form: formReducer,
  entities,
  web3,
  compilers
});

export default rootReducer;
