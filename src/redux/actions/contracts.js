export const SET_CONTRACT_ADDRESS = 'SET_CONTRACT_ADDRESS';

export const setContractAddress = (address) => {
  return {
    type: SET_CONTRACT_ADDRESS,
    address
  };
};
