import {createSelector} from 'reselect';
import {entitiesSelector} from './entities';

export const contractsSelector = createSelector(entitiesSelector, (entities) => entities.contracts);