import { schema } from 'normalizr';

const contract = new schema.Entity('contracts', {}, {
  idAttribute: 'address'
});

const schemas = {
  contract
}

export default schemas;