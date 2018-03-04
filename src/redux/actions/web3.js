import { metamaskLoader } from '../../utils/metamask';

export const LOAD_METAMASK = 'LOAD_METAMASK';
export const METAMASK_LOAD_FAILURE = 'METAMASK_LOAD_FAILURE';

export const loadMetamask = () => dispatch => {
  const web3js = metamaskLoader();
  if (web3js) {
    dispatch({
      type: LOAD_METAMASK,
      web3js
    });
  } else {
    dispatch({
      type: METAMASK_LOAD_FAILURE
    });
  }
};