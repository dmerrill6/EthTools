import { LOAD_METAMASK, SET_CURRENT_ACCOUNT } from '../actions/web3';

const web3 = (state = {}, action) => {
  const { web3js, account, type } = action;
  switch (type) {
    case LOAD_METAMASK:
      return {...state, lib: web3js};
    case SET_CURRENT_ACCOUNT:
      return {...state, account}
    default:
      return state;
  }
};

export default web3;