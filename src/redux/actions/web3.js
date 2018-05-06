import { metamaskLoader } from '../../utils/metamask';

export const LOAD_METAMASK = 'LOAD_METAMASK';
export const SET_CURRENT_ACCOUNT = 'SET_CURRENT_ACCOUNT';
export const SET_CURRENT_NETWORK = 'SET_CURRENT_NETWORK';

export const loadMetamask = () => dispatch => {
  metamaskLoader((web3js) => {
    dispatch({
      type: LOAD_METAMASK,
      web3js
    });
  });
};

export const setCurrentAccount = (account) => {
  return {
    type: SET_CURRENT_ACCOUNT,
    account
  };
};

export const setCurrentNetwork = (network) => {
  return {
    type: SET_CURRENT_NETWORK,
    network
  };
};
