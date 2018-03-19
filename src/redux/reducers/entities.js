import { ADD_ENTITY, ADD_ENTITIES, REMOVE_ENTITY, UPDATE_ENTITY } from '../actions/entities';
import schemas from '../schemas/index';
import { normalize } from 'normalizr';

const entities = (state = {}, action) => {
  const { type, entity, entityId, entities, entitySchema, attributes } = action;
  const currSchema = schemas[entitySchema];
  const n = normalize;
  switch (type) {
    case ADD_ENTITY:
      return {
        ...state,
        ...normalize(entity, currSchema).entities
      };
    case ADD_ENTITIES:
      return {
        ...state,
        ...normalize(entities, [currSchema]).entities
      };
    case REMOVE_ENTITY:
      const newState = {...state};
      if (newState[currSchema._key]){
        delete newState[currSchema._key][entityId];
      }
      return newState;
    case UPDATE_ENTITY:
      let updatedEntity = {[currSchema._idAttribute]: entityId, ...attributes};
      if (state[currSchema._key] && state[currSchema._key][entityId]){
        updatedEntity = {...state[currSchema._key][entityId], ...attributes};
      }
      return {
        ...state,
        ...normalize(updatedEntity, currSchema).entities
      };
    default:
      break;
  }
  return state;
}

export default entities;