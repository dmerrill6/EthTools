import { LOAD_METAMASK, SET_CURRENT_ACCOUNT, SET_CURRENT_NETWORK } from '../actions/web3';

const web3 = (state = {}, action) => {
  const { web3js, account, type, network } = action;
  switch (type) {
    case LOAD_METAMASK:
      return {...state, lib: web3js};
    case SET_CURRENT_ACCOUNT:
      return {...state, account}
    case SET_CURRENT_NETWORK:
      return {...state, network}
    default:
      return state;
  }
};

export default web3;