import { LOAD_METAMASK, METAMASK_LOAD_FAILURE } from '../actions/web3';

const web3 = (state = null, action) => {
  const { web3js, type } = action;
  switch (type) {
    case LOAD_METAMASK:
      return web3js;
    case METAMASK_LOAD_FAILURE:
      return false;
    default:
      return state;
  }
};

export default web3;