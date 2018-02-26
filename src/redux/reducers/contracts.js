import {SET_CONTRACT_ADDRESS} from '../actions/contracts';

const contracts = (state = {}, action) => {
  const {address, type} = action;
  switch (type) {
    case SET_CONTRACT_ADDRESS:
      return {contractAddress: address};
    default:
      return state;
  }
};

export default contracts;