import {createSelector} from 'reselect';

const contractsSelector = (state) => state.contracts;

export const contractAddressSelector = createSelector(
  contractsSelector,
  (contracts) => {
    return contracts.contractAddress;
  }
);
