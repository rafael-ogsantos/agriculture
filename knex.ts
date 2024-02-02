import Knex from 'knex';
import knexfile from './knexfile';

const environment = 'development';
const config = knexfile[environment];

const knex = Knex(config);

// Adicionando logs de erro de consulta
knex.on('query-error', (error, obj) => {
  console.log(error);
});

export default knex;