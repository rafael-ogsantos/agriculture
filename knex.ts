import Knex from 'knex';
import knexfile from './knexfile';

const environment = process.env.NODE_ENV || 'development';
const config = knexfile[environment];

const knex = Knex(config);

// Adicionando logs de erro de consulta
knex.on('query-error', (error, obj) => {
  console.log(error);
});

export default knex;