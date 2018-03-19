import {updateEntity, addEntity} from './entities';

export const updateContract = (contractAddress, attributes) => (dispatch) => {
  dispatch(updateEntity('contract', contractAddress, attributes));
};
