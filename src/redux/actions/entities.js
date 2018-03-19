export const ADD_ENTITY = 'ADD_ENTITY';
export const REMOVE_ENTITY = 'REMOVE_ENTITY';
export const ADD_ENTITIES = 'ADD_ENTITIES';
export const UPDATE_ENTITY = 'UPDATE_ENTITY';

export const addEntity = (entitySchema, entity) => {
  return {
    type: ADD_ENTITY,
    entitySchema,
    entity
  };
};

export const addEntities = (entitySchema, entities) => {
  return {
    type: ADD_ENTITIES,
    entitySchema,
    entities
  };
};

export const removeEntity = (entitySchema, entityId) => {
  return {
    type: REMOVE_ENTITY,
    entitySchema,
    entityId
  };
};

export const updateEntity = (entitySchema, entityId, attributes) => {
  return {
    type: UPDATE_ENTITY,
    entitySchema,
    entityId,
    attributes
  };
};